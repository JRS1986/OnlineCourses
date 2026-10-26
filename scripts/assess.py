#!/usr/bin/env python3
"""Offline, rule-based study interview. No network, dependencies, or persistence."""

import argparse
import math
import sys
from dataclasses import dataclass


@dataclass(frozen=True)
class Question:
    id: str
    domain: str
    prompt: str
    options: tuple
    correct: int
    explanation: str


# Answers are zero-based. Unknown answers receive zero without a penalty.
QUESTIONS = (
    Question("use1", "use", "An AI summary cites a manual. What establishes support?",
             ("The wording is confident", "Check that the cited passage supports the claim", "A second model agrees"), 1,
             "Inspect the actual source and its scope; agreement alone is not evidence."),
    Question("use2", "use", "You want to compare AI and manual work on a fictional task. What should you measure?",
             ("Time including checking/rework, and correctness", "Generated word count", "Only time until the first response"), 0,
             "Useful productivity includes verification and rework, at a comparable quality level."),
    Question("python1", "python", "What does float('bad') do in Python?",
             ("Returns 0", "Returns None", "Raises ValueError"), 2,
             "Invalid numeric text raises ValueError; handle it explicitly when parsing sensor records."),
    Question("python2", "python", "A function uses a mutable list as a default argument. What can happen?",
             ("Every call necessarily gets a new list", "Changes can persist across calls", "Python refuses to define the function"), 1,
             "Default objects are created at definition time; use a fresh list inside the function when needed."),
    Question("engineering1", "engineering", "An agent says a bug is fixed. Which evidence is strongest?",
             ("A relevant test fails before and passes after, and the diff is reviewed", "The agent's explanation", "More lines of code"), 0,
             "A reproducer and a reviewed change connect the fix to the requirement."),
    Question("engineering2", "engineering", "A small request produces unrelated edits. What should you do?",
             ("Accept all edits if formatting passes", "Delete the tests", "Inspect the diff and separate or remove unrelated changes"), 2,
             "Keep scope reviewable and verify the intended behavior, not just formatting."),
    Question("data1", "data", "Overlapping windows from one machine recording are split randomly. What is the concern?",
             ("Nothing if accuracy is high", "Related observations can leak across train and test", "A larger model always fixes it"), 1,
             "Split by recording, asset, or time according to the deployment question before fitting preprocessing."),
    Question("data2", "data", "Only 1% of records are faults. A model always predicts normal and is 99% accurate. What next?",
             ("Declare success", "Remove the fault rows", "Inspect fault recall, false alarms, and an appropriate baseline"), 2,
             "Aggregate accuracy hides missed rare faults; evaluate the costs and error types that matter."),
    Question("loops1", "loops", "A repair loop keeps failing the same test. What should its contract require?",
             ("Explicit attempt/time/cost limits and a blocked handover", "Retry forever", "Let the agent redefine success"), 0,
             "Bound retries and report the unresolved evidence; the completion criterion must remain meaningful."),
    Question("loops2", "loops", "All steps in a transformation are known and deterministic. What is a sensible baseline?",
             ("A team of agents", "A normal script or fixed workflow", "A new foundation model"), 1,
             "Use an agent when adaptive decisions add measured value, not just because a loop is possible."),
    Question("evaluation1", "evaluation", "You tuned prompts repeatedly on the same questions. How should you judge generalization?",
             ("Rerun only those questions", "Ask the model if it improved", "Use held-out cases and compare to the baseline"), 2,
             "Development cases inform changes; untouched evaluation cases test whether improvements transfer."),
    Question("evaluation2", "evaluation", "An LLM judge prefers verbose answers. What helps?",
             ("Calibrate a clear rubric against human labels and check bias", "Trust the larger score", "Make every answer longer"), 0,
             "Automated judgment needs calibration; use deterministic checks where appropriate."),
    Question("embedded1", "embedded", "A model file fits in flash. Does that prove it fits the device?",
             ("Yes", "No: also measure runtime RAM, buffers, and latency", "Only the training accuracy matters"), 1,
             "Weights are only part of a deployment's resource use; profile the actual target."),
    Question("embedded2", "embedded", "A desktop model is quantized for a microcontroller. What must be checked?",
             ("Only whether the file got smaller", "Only whether compilation succeeds", "Output quality and resource use on representative data and target"), 2,
             "Conversion can change numerical behavior and performance; validate both."),
    Question("edge1", "edge", "Local inference works, but the network disconnects. What should the design specify?",
             ("Buffer/drop policy, local behavior, and recovery", "Assume the cloud will reply", "Restart continuously"), 0,
             "Edge behavior includes failure handling and data flow beyond the model call."),
    Question("edge2", "edge", "An edge pipeline reports 5 ms inference. Is its end-to-end latency known?",
             ("Yes", "No: include acquisition, preprocessing, queues, and output", "Multiply by the number of GPUs"), 1,
             "A model benchmark is only one part of the complete processing path."),
    Question("cad1", "cad", "Generative design produces a lighter bracket. What comes before acceptance?",
             ("Pick the most attractive image", "Trust the optimizer score", "Verify loads, constraints, material, manufacture, and analysis assumptions"), 2,
             "A candidate is meaningful only under the correct engineering constraints."),
    Question("cad2", "cad", "Is generative CAD optimization necessarily an LLM agent?",
             ("No; constraint-based optimization and tool-using agents are different mechanisms", "Yes, all generated geometry uses an LLM", "Yes, if it runs in the cloud"), 0,
             "Distinguish the design method from where it runs and how it is orchestrated."),
    Question("electronics1", "electronics", "AI proposes a substitute component. What do you check?",
             ("The part number looks similar", "Datasheet ratings, pinout, package/footprint, operating conditions", "Only the price"), 1,
             "A plausible part is not necessarily electrically or mechanically compatible."),
    Question("electronics2", "electronics", "A schematic passes ERC. Is the AI-designed circuit proven correct?",
             ("Yes", "Yes if a second assistant agrees", "No: check requirements, analysis/simulation, and physical assumptions"), 2,
             "ERC/DRC test particular rule sets; they do not establish complete circuit behavior."),
)


@dataclass(frozen=True)
class Path:
    title: str
    anchor: str
    hours: int
    domains: tuple
    resources: tuple
    first_step: str


PATHS = {
    "P0": Path("AI orientation", "p0-ai-orientation", 4, ("use",), ("C01", "R01"), "Define one task and a non-AI baseline."),
    "P1": Path("Programming foundations", "p1-programming-foundations", 24, ("use", "python", "engineering"), ("C02", "C04", "R13"), "Start C02 week 0; write B1's input/output contract and one failing test before any implementation."),
    "W1": Path("Knowledge work and copilots", "w1-knowledge-work-and-copilots", 6, ("use",), ("C38", "R12"), "Summarize a public technical source and verify every claim."),
    "W2": Path("CAD and mechanical design", "w2-cad-and-mechanical-design", 8, ("use", "cad"), ("C31", "R15"), "Write the loads, constraints, and verification criteria for a fictional bracket."),
    "W3": Path("Electronics and PCB design", "w3-electronics-and-pcb-design", 8, ("use", "electronics"), ("R16", "C40"), "Write B8's requirements table and estimate worst-case regulator dissipation before asking an assistant."),
    "W4": Path("Agentic coding", "w4-agentic-coding", 16, ("use", "python", "engineering", "loops"), ("C04", "C43", "C42", "R18"), "Choose a small bug, reproduce it, define acceptance tests, and list the files the assistant may edit."),
    "D1": Path("Embedded AI", "d1-embedded-ai", 24, ("use", "python", "data", "embedded"), ("C28", "R11", "R19"), "Specify signal windows, a split by recording, and a RAM/flash/latency budget; run the TFLM hello_world test on your computer."),
    "D2": Path("Edge AI", "d2-edge-ai", 24, ("use", "python", "data", "edge"), ("R19", "R20", "C18"), "Draw acquisition-to-output flow with a latency budget per stage and define disconnected behavior."),
    "D3": Path("Agentic AI and loops", "d3-agentic-ai-and-loops", 24, ("use", "python", "engineering", "loops", "evaluation"), ("C11", "C44", "R17", "R09"), "Define a fixed-workflow baseline and a bounded tool contract."),
    "D4": Path("Industrial data and ML", "d4-industrial-data-and-ml", 24, ("use", "python", "data"), ("C06", "C07", "R21", "R22"), "Decide whether the model must generalize to new assets or future time, define that split, and set a constant and threshold baseline."),
    "T1": Path("Teaching and facilitation", "t1-teaching-and-facilitation", 6, ("use", "loops"), ("C54", "R23"), "Choose one audience, rehearse B6 on paper, and write one diagnostic question."),
}

REFRESHERS = {
    "use": ("C38", "R12"), "python": ("C02", "C03"),
    "engineering": ("C04", "R13"), "data": ("C07", "R21"),
    "loops": ("R01", "R02"), "evaluation": ("R17", "C44"),
    "embedded": ("C28", "R11"), "edge": ("R19", "R20"),
    "cad": ("C31", "R15"), "electronics": ("R16", "C40"),
}


def questions_for(goal):
    return [q for q in QUESTIONS if q.domain in PATHS[goal].domains]


def score_answers(goal, answers):
    scores = {domain: 0 for domain in PATHS[goal].domains}
    for q in questions_for(goal):
        answer = answers.get(q.id)
        if answer is not None and (type(answer) is not int or not 0 <= answer < len(q.options)):
            raise ValueError("Invalid answer for " + q.id)
        if answer == q.correct:
            scores[q.domain] += 1
    return scores


def recommend(goal, scores, evidence=False):
    """Return ordered study blocks; prerequisites are never added to user-only paths."""
    expected = set(PATHS[goal].domains)
    if set(scores) != expected or any(type(n) is not int or n < 0 or n > 2 for n in scores.values()):
        raise ValueError("Expected a 0–2 score for every assessed domain")
    blocks = []
    if goal not in {"P0", "P1", "W1", "W2", "W3", "T1"}:
        if scores["python"] < 2:
            blocks.append(("P1", 24, "Python prerequisite gap: complete the selected foundations and their practice check."))
        elif goal in {"W4", "D3"} and scores["engineering"] < 2:
            blocks.append(("C04", 4, "Engineering gap: practise Git/diffs and reproducible verification first."))
        if goal in {"D1", "D2"} and scores["data"] < 2:
            blocks.append(("C06", 4, "ML gap: practise baselines and train/test separation before deployment."))
        if scores["python"] == 2 and not evidence:
            blocks.append(("practice", 2, "Confirm quiz results by writing and explaining a small tested utility; knowledge alone is insufficient."))
    blocks.append((goal, PATHS[goal].hours, "Your chosen destination; focus introductory work on the gaps below."))
    return blocks


def ask_choice(prompt, choices):
    print("\n" + prompt)
    for i, choice in enumerate(choices, 1):
        print(f"  {i}. {choice}")
    while True:
        value = input("> ").strip()
        if value.isdigit() and 1 <= int(value) <= len(choices):
            return int(value) - 1
        print(f"Enter a number from 1 to {len(choices)}.")


def ask_number(prompt, minimum, maximum, integer=False):
    while True:
        raw = input(f"\n{prompt} ({minimum}–{maximum}): ").strip()
        try:
            value = float(raw)
            if math.isfinite(value) and minimum <= value <= maximum and (not integer or value.is_integer()):
                return int(value) if integer else value
        except ValueError:
            pass
        print("Enter a number within the range" + (" (whole number)." if integer else "."))


def resource_links(ids):
    return ", ".join(f"{ref}: docs/CATALOG.md#{ref.lower()}" for ref in ids)


def render_plan(goal, scores, evidence, hours, weeks, live=False, language="English"):
    if not math.isfinite(hours) or not 0.5 <= hours <= 40 or type(weeks) is not int or not 1 <= weeks <= 52:
        raise ValueError("Invalid study capacity")
    path = PATHS[goal]
    blocks = recommend(goal, scores, evidence)
    total = sum(block[1] for block in blocks)
    capacity = hours * weeks
    lines = [f"\nYour destination: {goal} — {path.title}",
             f"Path: docs/LEARNING_PATHS.md#{path.anchor}",
             f"Study capacity: {hours:g} h/week × {weeks} weeks = {capacity:g} h.",
             f"Planned sequence: {total} h including listed prerequisite blocks (~{math.ceil(total / hours)} weeks).",
             "Estimates cover selected material and practice, not entire courses. Extend study until the exit checks pass.",
             "\nSequence and reasons:"]
    for key, effort, reason in blocks:
        target = (f"docs/LEARNING_PATHS.md#{PATHS[key].anchor}" if key in PATHS else
                  "docs/PRACTICE.md#b1-sensor-data-contract" if key == "practice" else
                  f"docs/CATALOG.md#{key.lower()}")
        lines.append(f"- {key} ({effort} h): {reason} {target}")
    lines.append("\nKnowledge checks (0–2 per topic, not a certification):")
    for domain, score in scores.items():
        meaning = "refresh" if score == 0 else "practise the gap" if score == 1 else "confirm with a worked example"
        lines.append(f"- {domain}: {score}/2 — {meaning}. " + resource_links(REFRESHERS[domain]))
    if evidence:
        ready = [d for d, n in scores.items() if n == 2]
        if ready:
            lines.append("Candidate skips: introductory review in " + ", ".join(ready) + ". Skip only after you can explain and reproduce the relevant example. Keep the capstone and review.")
    else:
        lines.append("No skips based on the quiz alone. Reassess after a small completed example.")
    lines.append("\nDestination resources: " + resource_links(path.resources))
    if capacity < total:
        lines.append(f"This sequence does not fit your {weeks}-week window. Complete at most {capacity:g} h from the beginning; carry the rest forward.")
    first_key, first_hours, _ = blocks[0]
    lines.append(f"First study session: {min(hours, first_hours):g} h on {first_key}; " +
                 (path.first_step if first_key == goal else "start with the prerequisite block above."))
    lines.append("Milestone: use the path's exit check and templates/LEARNING_RECORD.md, then reassess the remaining gaps.")
    if live:
        lines.append("Practice mode: live tools/hardware where available and permitted; agree a usage budget. Course material being free does not make execution free.")
    else:
        lines.append("Practice mode: public readings and paper/local simulation. Use docs/PRACTICE.md; record hardware latency and live-model performance as NOT MEASURED.")
    if goal in {"W2", "W3"}:
        lines.append("Domain gate: AI is not a substitute for mechanical/electronics fundamentals. If you cannot validate the design assumptions, work with a qualified peer before progressing beyond the exercise.")
    if goal == "D1":
        lines.append("Device gate: C/C++ buffers, firmware tools, and target access are additional prerequisites for deployment. C28 lists them; a Python quiz cannot establish device readiness.")
    if goal == "D2":
        lines.append("Edge gate: Linux, packaging/container basics, and target access are required for deployment. Rehearse locally first; desktop timing is not target timing.")
    if language == "German":
        lines.append("Language: discuss/write reflections in German; C01 has a German edition and C34 is a German-original alternative. Most technical materials here are English; allow translation time.")
    lines.append("No answers were saved or sent. This is a learning aid, not an employee rating.")
    return "\n".join(lines)


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--demo", action="store_true", help="print a fictional example recommendation without asking questions")
    args = parser.parse_args(argv)
    if args.demo:
        scores = {"use": 2, "python": 2, "engineering": 2, "loops": 0, "evaluation": 1}
        print(render_plan("D3", scores, True, 3, 4))
        return 0
    print("Industrial AI quick-start interview — offline; no answers are stored.\nChoose one goal. 'Not sure' is a useful answer; there is no pass/fail ranking.")
    try:
        goals = list(PATHS)
        goal = goals[ask_choice("What would you like to do?", [f"{key} — {PATHS[key].title}" for key in goals])]
        hours = ask_number("Hours available per week", 0.5, 40)
        weeks = ask_number("Weeks in your first study window", 1, 52, integer=True)
        evidence = ask_choice("Have you recently completed relevant work that you can explain and show a peer?", ("Yes", "Not yet / not sure")) == 0
        live = ask_choice("Do you have the permitted tools, accounts, and (if needed) hardware for this goal?", ("Not yet — use readings/simulation", "Yes — live practice is possible")) == 1
        language = ("English", "German")[ask_choice("Preferred discussion language?", ("English", "German (most technical sources are English)"))]
        answers = {}
        for q in questions_for(goal):
            answer = ask_choice(q.prompt, q.options + ("Not sure / not yet",))
            answers[q.id] = answer if answer < len(q.options) else None
        scores = score_answers(goal, answers)
        print(render_plan(goal, scores, evidence, hours, weeks, live, language))
        print("\nFeedback on gaps:")
        for q in questions_for(goal):
            if answers[q.id] != q.correct:
                print(f"- {q.id}: {q.explanation}")
        return 0
    except (EOFError, KeyboardInterrupt):
        print("\nInterview stopped. No answers saved and no complete recommendation produced.")
        return 130 if sys.exc_info()[0] is KeyboardInterrupt else 2


if __name__ == "__main__":
    raise SystemExit(main())
