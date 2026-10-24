# Initial assessment and quick-start interview

**Browser version:** [Find my learning path](https://jrs1986.github.io/OnlineCourses/#assessment). No installation or Python required. Answers and the plan save locally in this browser; use **My progress** to resume, export, or clear them.

[Start](../README.md) · [Industrial AI map](INDUSTRIAL_AI.md) · [Paths](LEARNING_PATHS.md) · [Catalogue](CATALOG.md)

Use 10–15 minutes to choose a starting point. This is a formative learning aid, not a validated diagnostic, certification, or employee ranking. Two questions per topic only reveal possible gaps; they cannot establish professional competence. Keep results with the learner and share only the learning needs they choose to discuss.

## Three ways to start

1. **Individually, offline:** run `python3 scripts/assess.py` from the repository root. Python 3.9+; no dependencies, accounts, network, or saved answers. `python3 scripts/assess.py --demo` shows a fictional result.
2. **With a colleague:** use the interview and relevant question groups below. Ask for an explanation and a recent example, not just a letter answer.
3. **With an approved AI assistant:** provide this document, the catalogue, and learning paths, then paste the prompt below. Use fictional examples rather than confidential work.

## Interview

Ask these in order, then use only the knowledge groups relevant to the goal:

1. What would you like to do in the next few weeks: use AI at work, develop AI, learn foundations, or teach? Name one concrete output.
2. Choose a destination from the table. Where relevant, use the brain analogy to locate the desired capability.
3. How many hours per week and how many weeks are available for the first study window?
4. Have you recently completed relevant work that you can explain and show a peer? What evidence supports that?
5. Are the necessary tools, accounts, and hardware available and permitted? If uncertain, start with readings and simulations.
6. Would you prefer English or German discussion? Most technical course material is English.

| Goal | Path | Knowledge groups |
|---|---|---|
| Understand where AI helps | P0 | use |
| Learn programming | P1 | use, python, engineering |
| Knowledge work / office copilots | W1 | use |
| CAD / mechanical design | W2 | use, cad |
| Electronics / ECAD | W3 | use, electronics |
| Use coding agents | W4 | use, python, engineering, loops |
| Develop embedded AI: reflexes | D1 | use, python, data, embedded |
| Develop edge AI: local perception/coordination | D2 | use, python, data, edge |
| Develop agentic AI: planning/tools | D3 | use, python, engineering, loops, evaluation |
| Develop an industrial ML baseline | D4 | use, python, data |
| Teach or facilitate | T1 | use, loops |

The CLI asks a fixed subset for your goal and applies explicit rules. It does not use an LLM or infer your skill from a job title. A human interview can explore explanations more deeply.

## Scoring and recommendations

Each correct answer earns one point in its topic; incorrect or “not sure” earns zero. Each topic has two questions: **0 = refresh**, **1 = practise the gap**, **2 = confirm with a worked example**. Do not combine these into a cross-person ranking.

Apply the following rules in order; the [implementation](../scripts/assess.py) uses the same rules:

1. Keep the learner's selected destination. **W1/W2/W3 do not acquire a Python prerequisite.** For CAD/electronics, a learner who cannot validate domain assumptions needs foundational study or a qualified peer before progressing beyond an educational review.
2. Before W4 or any D path, a Python score below 2 adds P1's selected 24-hour foundation block. P1 itself does not add itself twice.
3. Before W4/D3, if Python is 2 but engineering is below 2, add 4 hours of C04 practice.
4. Before D1/D2, a data score below 2 adds a 4-hour C06 baseline/validation refresher. This can follow P1.
5. For W4 or any D path, a Python score of 2 without recent evidence adds a 2-hour B1 practice check. If it exposes a gap, return to P1; do not treat the quiz as clearance.
6. Topic gaps determine which catalogue resources to emphasize within the destination. A score of 2 plus recent evidence makes introductory review a **candidate skip**. Keep the path's project and peer review. Skipping does not automatically reduce the planning estimate.
7. Add the block hours and compare them to hours/week × weeks. If they do not fit, complete an initial portion and carry the rest forward. Never remove prerequisites to fit a deadline.
8. Without permitted tools/hardware, use paper/local exercises and mark live-model or target-device performance **not measured**. D1 also needs firmware/C/C++ readiness; D2 needs Linux/packaging readiness. The short quiz does not establish either.

**Recommendation format:** destination; reasons; ordered prerequisite blocks; 1–3 starting resources with scope; first study session; estimated total and what fits now; exit check; optional skips; tool/access limitations; date to revisit after a practice milestone.

**Examples:** a CAD engineer can go directly to W2 with design checks, without programming study. A Python newcomer aiming for D3 starts with P1. A capable developer missing loop/evaluation knowledge goes to D3 and emphasizes C11/C16. An embedded developer with weak data-validation answers refreshes C06 before deployment. A lecturer rehearses the selected demo before using T1's teaching kit.

## Prompt for a guided interview

```text
Act as a learning partner using this repository's ASSESSMENT.md, CATALOG.md,
INDUSTRIAL_AI.md, and LEARNING_PATHS.md. Ask one short question at a time.
First clarify a concrete goal: using AI at work versus developing AI, or teaching.
Use Embedded = reflexes, Edge = local perception/coordination, Agentic = planning/tools.
These are overlapping roles, not mutually exclusive technologies.
Ask about available study time, recent evidence, tools/hardware, and language.
Use the relevant knowledge groups; invite "not sure" and an explanation.
Do not reveal the answer before the learner responds. Treat self-confidence as
context, not proof. Apply the documented routing rules and explain uncertainty.
Recommend only resources from the supplied catalogue; do not invent access or
corporate approval. Include any missing prerequisites, suggested skips, a small
first study block, and a practical exit check. Respect the time window without
pretending a full course fits it. Offer a paper/simulation route if needed.
Do not request confidential projects, personnel details, or proprietary data.
Finish with a learner-owned plan, not a score for an employer.
```

## Knowledge checks

The question bank below is shared with the offline questionnaire. Choose “not sure” when appropriate. Answers are folded beneath each item so this document also works for self-study.

### use1 — use

An AI summary cites a manual. What establishes support?

1. The wording is confident
2. Check that the cited passage supports the claim
3. A second model agrees
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**2.** Inspect the actual source and its scope; agreement alone is not evidence.

</details>

### use2 — use

You want to compare AI and manual work on a fictional task. What should you measure?

1. Time including checking/rework, and correctness
2. Generated word count
3. Only time until the first response
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**1.** Useful productivity includes verification and rework, at a comparable quality level.

</details>

### python1 — python

What does float('bad') do in Python?

1. Returns 0
2. Returns None
3. Raises ValueError
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**3.** Invalid numeric text raises ValueError; handle it explicitly when parsing sensor records.

</details>

### python2 — python

A function uses a mutable list as a default argument. What can happen?

1. Every call necessarily gets a new list
2. Changes can persist across calls
3. Python refuses to define the function
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**2.** Default objects are created at definition time; use a fresh list inside the function when needed.

</details>

### engineering1 — engineering

An agent says a bug is fixed. Which evidence is strongest?

1. A relevant test fails before and passes after, and the diff is reviewed
2. The agent's explanation
3. More lines of code
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**1.** A reproducer and a reviewed change connect the fix to the requirement.

</details>

### engineering2 — engineering

A small request produces unrelated edits. What should you do?

1. Accept all edits if formatting passes
2. Delete the tests
3. Inspect the diff and separate or remove unrelated changes
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**3.** Keep scope reviewable and verify the intended behavior, not just formatting.

</details>

### data1 — data

Overlapping windows from one machine recording are split randomly. What is the concern?

1. Nothing if accuracy is high
2. Related observations can leak across train and test
3. A larger model always fixes it
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**2.** Split by recording, asset, or time according to the deployment question before fitting preprocessing.

</details>

### data2 — data

Only 1% of records are faults. A model always predicts normal and is 99% accurate. What next?

1. Declare success
2. Remove the fault rows
3. Inspect fault recall, false alarms, and an appropriate baseline
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**3.** Aggregate accuracy hides missed rare faults; evaluate the costs and error types that matter.

</details>

### loops1 — loops

A repair loop keeps failing the same test. What should its contract require?

1. Explicit attempt/time/cost limits and a blocked handover
2. Retry forever
3. Let the agent redefine success
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**1.** Bound retries and report the unresolved evidence; the completion criterion must remain meaningful.

</details>

### loops2 — loops

All steps in a transformation are known and deterministic. What is a sensible baseline?

1. A team of agents
2. A normal script or fixed workflow
3. A new foundation model
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**2.** Use an agent when adaptive decisions add measured value, not just because a loop is possible.

</details>

### evaluation1 — evaluation

You tuned prompts repeatedly on the same questions. How should you judge generalization?

1. Rerun only those questions
2. Ask the model if it improved
3. Use held-out cases and compare to the baseline
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**3.** Development cases inform changes; untouched evaluation cases test whether improvements transfer.

</details>

### evaluation2 — evaluation

An LLM judge prefers verbose answers. What helps?

1. Calibrate a clear rubric against human labels and check bias
2. Trust the larger score
3. Make every answer longer
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**1.** Automated judgment needs calibration; use deterministic checks where appropriate.

</details>

### embedded1 — embedded

A model file fits in flash. Does that prove it fits the device?

1. Yes
2. No: also measure runtime RAM, buffers, and latency
3. Only the training accuracy matters
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**2.** Weights are only part of a deployment's resource use; profile the actual target.

</details>

### embedded2 — embedded

A desktop model is quantized for a microcontroller. What must be checked?

1. Only whether the file got smaller
2. Only whether compilation succeeds
3. Output quality and resource use on representative data and target
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**3.** Conversion can change numerical behavior and performance; validate both.

</details>

### edge1 — edge

Local inference works, but the network disconnects. What should the design specify?

1. Buffer/drop policy, local behavior, and recovery
2. Assume the cloud will reply
3. Restart continuously
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**1.** Edge behavior includes failure handling and data flow beyond the model call.

</details>

### edge2 — edge

An edge pipeline reports 5 ms inference. Is its end-to-end latency known?

1. Yes
2. No: include acquisition, preprocessing, queues, and output
3. Multiply by the number of GPUs
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**2.** A model benchmark is only one part of the complete processing path.

</details>

### cad1 — cad

Generative design produces a lighter bracket. What comes before acceptance?

1. Pick the most attractive image
2. Trust the optimizer score
3. Verify loads, constraints, material, manufacture, and analysis assumptions
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**3.** A candidate is meaningful only under the correct engineering constraints.

</details>

### cad2 — cad

Is generative CAD optimization necessarily an LLM agent?

1. No; constraint-based optimization and tool-using agents are different mechanisms
2. Yes, all generated geometry uses an LLM
3. Yes, if it runs in the cloud
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**1.** Distinguish the design method from where it runs and how it is orchestrated.

</details>

### electronics1 — electronics

AI proposes a substitute component. What do you check?

1. The part number looks similar
2. Datasheet ratings, pinout, package/footprint, operating conditions
3. Only the price
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**2.** A plausible part is not necessarily electrically or mechanically compatible.

</details>

### electronics2 — electronics

A schematic passes ERC. Is the AI-designed circuit proven correct?

1. Yes
2. Yes if a second assistant agrees
3. No: check requirements, analysis/simulation, and physical assumptions
4. Not sure / not yet

<details>
<summary>Answer and explanation</summary>

**3.** ERC/DRC test particular rule sets; they do not establish complete circuit behavior.

</details>
