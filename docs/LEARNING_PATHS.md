# Learning paths

[Start](../README.md) · [Assessment](ASSESSMENT.md) · [Industrial AI map](INDUSTRIAL_AI.md) · [Catalogue](CATALOG.md)

Pick **one destination**. Hours below are proposed allocations for selected sections and our exercises, not the complete provider courses. Prerequisites are additional. An exit check, rather than elapsed time, determines readiness. Resource IDs link to access information; tools and hardware are examples, not purchasing recommendations. Each path relies on two to four core resources; alternatives are named in the same step so you study one, not all.

For AI at work, use an assistant already permitted in your environment. For developing AI, start with a small local example and a simple baseline. Every route has a reading or simulation option; distinguish it from a measured deployment.

## P0 AI orientation

**For:** anyone choosing where AI belongs in their work. **Prerequisites:** none; no coding. **Allocation:** 4 h. German speakers can use C01's German edition or [C34](CATALOG.md#c34).

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C01](CATALOG.md#c01): chapter 1 (What is AI?), the large-language-model part of chapter 5, and chapter 6 (Implications); note three things AI cannot reliably do. German alternative: the opening units of [C34](CATALOG.md#c34) | 2 |
| 2 | The [brain analogy](INDUSTRIAL_AI.md#the-brain-analogy) and the "What are agents?" and "When (and when not) to use agents" sections of [R01](CATALOG.md#r01); place one example from your own work in each role | 1 |
| 3 | Write a one-page use-case brief: input, output, non-AI baseline, owner, acceptance check, and whether you would use or build the AI | 1 |

**Exit:** explain the distinction between using and building AI; place one example in each brain role; identify a task better served by a normal script or lookup. Choose W1–W4 for daily work or D1–D5 for development.

Optional, outside the four hours: finish C01 for its free certificate (2 ECTS are available for the English, Finnish, or Swedish edition); [C35](CATALOG.md#c35) for the EU AI Act's roles and risk classes; business context in [C56](CATALOG.md#c56) for scoping a pilot, [C55](CATALOG.md#c55) for technical handovers, and [C57](CATALOG.md#c57) for supply-chain context, with [C21–C24](CATALOG.md#c21) as platform alternatives. None of these replaces an organisation's own AI-literacy or compliance measures.

## P1 Programming foundations

**For:** learners who need to read, write, and test small programs. **Prerequisites:** none. **Allocation:** 24 h; a complete beginner may need much longer.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C02](CATALOG.md#c02) weeks 0–3: functions, conditionals, loops, exceptions, with their problem sets. Gentler start: [C03](CATALOG.md#c03) through files and lists; for university credit: [C36](CATALOG.md#c36) parts 1–6 | 10 |
| 2 | [C02](CATALOG.md#c02) weeks 5–6: write your own pytest tests in the week 5 problem set, then file I/O; keep [R14](CATALOG.md#r14) open for `pytest.raises` | 6 |
| 3 | [C04](CATALOG.md#c04): shell, Version Control and Git, Debugging and Profiling; keep your exercise work in a Git repository with small commits | 4 |
| 4 | [B1 sensor-data contract](PRACTICE.md#b1-sensor-data-contract): contract tests first, manual implementation, then exchange diffs with a peer and review them with [R13](CATALOG.md#r13) | 4 |

**Exit:** independently explain an input error, reproduce a test failure, fix it, and review a small diff. Step 2 applies whichever course you chose in step 1, because C03 and C36 do not teach a test framework. Experienced programmers can demonstrate this directly and skip the introductory study.

Completing all of C02 for its free CS50 Certificate is optional and outside the 24 h. Continue with W4 to use coding assistants, or D3/D4 to build; [C05](CATALOG.md#c05) is an optional web-development branch.

## W1 Knowledge work and copilots

**For:** project teams, technical specialists, managers, and office users. **Prerequisites:** ability to judge the subject matter; no coding. **Allocation:** 6 h.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C38](CATALOG.md#c38): delegation, description, discernment, diligence; the description–discernment loop | 2 |
| 2 | [R12](CATALOG.md#r12): write one reusable request with goal, context, source, and expectations; with a workplace licence, add the first module of [C33](CATALOG.md#c33) | 1 |
| 3 | [B6 source-grounded knowledge work](PRACTICE.md#b6-source-grounded-knowledge-work) | 2 |
| 4 | Peer-check facts and compare time including rework | 1 |

**Exit:** produce a useful brief with traceable claims and explicit unknowns; check arithmetic independently; state what you delegated and what you verified yourself. No licence: study C38 and R12 without an AI account, use the fictional documents, and critique the flawed B6 draft on paper. Do not treat a tool's ability to retrieve a document as permission to share it. Optional, outside the six hours: [C35](CATALOG.md#c35) for EU AI Act roles and risk classes.

## W2 CAD and mechanical design

**For:** mechanical engineers and CAD users applying AI to design work. **Prerequisites:** loads, constraints, materials, and basic CAD. **Allocation:** 8 h; mechanical fundamentals are additional.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C31](CATALOG.md#c31): study setup, preserve/obstacle geometry, manufacturing methods, outcome comparison | 2 |
| 2 | [R15](CATALOG.md#r15): vary loads, supports, volume fraction, and passive regions; list which B7 requirements an optimizer can and cannot represent | 1 |
| 3 | [B7 fictional bracket](PRACTICE.md#b7-cad-design-review): define requirements and baseline geometry | 2 |
| 4 | Compare alternatives against the same assumptions; inspect manufacturability | 2 |
| 5 | Explain why a candidate should be accepted, rejected, or investigated | 1 |

**Exit:** a constraint sheet, alternatives table, and verification plan. Distinguish generative or topology optimization, a solver working only on the loads and constraints you formulate, from an LLM producing a CAD script or design advice. Without CAD/cloud-solve access, watch C31 without solving, use R15's free apps or paper, and use the supplied hypothetical outcomes; label the exercise a design review, not a validated part. A qualified reviewer is needed if the learner lacks domain foundations.

## W3 Electronics and PCB design

**For:** electronics/ECAD users applying AI to existing engineering tasks. **Prerequisites:** circuit fundamentals and datasheet reading. **Allocation:** 8 h; introductory electronics is additional.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [R16](CATALOG.md#r16): schematic, ERC, footprint assignment, and DRC sections; experienced ECAD users review briefly; students may use [C32](CATALOG.md#c32) instead | 2 |
| 2 | [C40](CATALOG.md#c40): datasheet terms, power dissipation, junction temperature; estimate B8's worst-case dissipation | 1 |
| 3 | [B8 component review](PRACTICE.md#b8-electronics-component-review): ask a permitted assistant for a comparison with explicit unknowns, then check units, pinout, and thermal evidence yourself; [R10](CATALOG.md#r10) is an optional tool example | 3 |
| 4 | Peer review; explain what ERC/DRC and simulation can and cannot establish | 2 |

**Exit:** a checked comparison and unresolved-questions list, not an unreviewed schematic generated by AI. No tool account: use the fictional component sheets and compare on paper; R16 and C40 need no licence. AI does not replace the domain foundation; R16, C40, and C32 are tool and component foundations, not AI courses.

## W4 Agentic coding

**For:** developers using coding assistants in daily work. **Prerequisites:** P1 exit check or equivalent; basic Git. **Allocation:** 16 h.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C04](CATALOG.md#c04) 2026 lecture *Agentic Coding*: agent loop, context files, verification, permissions and sandboxing; tool-neutral | 2 |
| 2 | Training for the assistant you are permitted to use: [C43](CATALOG.md#c43) for Claude Code or the agent-mode and code-review modules of [C42](CATALOG.md#c42) for GitHub Copilot; [C12](CATALOG.md#c12) is an optional video alternative | 2 |
| 3 | [R18](CATALOG.md#r18) with [R03](CATALOG.md#r03) or [R04](CATALOG.md#r04): write the B1 instruction file, completion check, editable paths, and attempt cap | 2 |
| 4 | [B1](PRACTICE.md#b1-sensor-data-contract): manual baseline, agent-assisted revision, held-back cases | 7 |
| 5 | Independent diff review, log analysis, and a five-minute handover | 3 |

**Exit:** requirements-linked tests, a reviewable diff, a record of failed attempts, and an honest time/cost comparison. Set an attempt cap and keep acceptance tests outside the agent's edit scope through tool permissions, a read-only location, or CI. An instruction file states the rule but does not enforce it. Stop a looping agent when it cannot make progress. No assistant: pair one learner as implementer and one as reviewer; this teaches the workflow but does not measure model performance.

Already comfortable? Use the [C13](CATALOG.md#c13) weeks on repository customization, agentic code review, and security for a deeper software-engineering discussion. Building the agent itself is the [D3](#d3-agentic-ai-and-loops) route, not a prerequisite for using one.

## D1 Embedded AI

**Brain role:** reflex. **For:** developers embedding inference in a constrained device. **Prerequisites:** Python, introductory ML, signal sampling, and C/C++ buffers/firmware tools for real deployment. Refresh with P1 and [C06](CATALOG.md#c06) as needed. **Allocation:** 24 h after prerequisites. **Start without a board:** steps 1–4 run in a browser, Colab, or on a development computer.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C28](CATALOG.md#c28): modules 1 and 3–5 (edge ML, workflow, quantization/deployment, anomaly detection); test with a smartphone instead of a board. If you prefer Colab and TFLM to a hosted studio, take the same topics in [C46](CATALOG.md#c46) | 7 |
| 2 | [R11](CATALOG.md#r11): run the `hello_world` test on your computer, compare TFLite and TFLM outputs, produce an int8 model, and record tensor-arena use | 4 |
| 3 | [R19](CATALOG.md#r19): *Model Compression* and *Benchmarking* chapters; write the resource budget and measurement protocol for your intended target | 3 |
| 4 | [B4 embedded classifier](PRACTICE.md#b4-embedded-reflex): threshold baseline, small model, conversion, comparison on identical held-out windows, target or emulator | 7 |
| 5 | Device gate: accuracy change, flash, peak RAM including buffers, latency distribution, energy statement, and failure cases | 3 |

**Exit:** reproducible signal processing and a deployment report that labels every value as measured on the target, measured elsewhere (host, emulator, phone, vendor board), estimated (for example a tool's on-device estimate or file size), or not measured. A simulation passes the conceptual milestone only. Target readiness requires measurements on the actual device with its firmware, including runtime memory and representative timing; classifier speed does not establish hard real-time or safety suitability.

Optional depth, outside the 24 h: [C47](CATALOG.md#c47) quantization and MCUNet lectures for memory-constrained model design. Certificates (C46, Coursera) are optional and not needed for this exit check.

## D2 Edge AI

**Brain role:** local perception and coordination. **For:** developers deploying inference near a machine/cell. **Prerequisites:** Python, basic ML, Linux, and packaging/container basics for deployment. **Allocation:** 24 h after prerequisites. **Start without an edge device:** every step runs on a laptop with recorded inputs.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [R19](CATALOG.md#r19): *Model Serving* (latency budget, stage-by-stage breakdown, tail latency, cold start) and the end-to-end latency sections of *Benchmarking*; draw your pipeline with a budget per stage | 3 |
| 2 | [R20](CATALOG.md#r20): export a small image classifier to ONNX, run it on CPU with profiling, try static quantization, and compare outputs and timings | 5 |
| 3 | [C18](CATALOG.md#c18): model registry (units 2.4–2.5) and a Flask service in Docker loading a registered model (units 4.2–4.3); skip the AWS streaming unit | 4 |
| 4 | [B5 local inspection pipeline](PRACTICE.md#b5-edge-perception-pipeline): replay, bounded queue, infer, log, versioned model and configuration | 8 |
| 5 | Exercise network loss, restart, stale inputs, duplicate suppression, and model rollback; compare with the release strategies in [R19](CATALOG.md#r19) *ML Operations* | 4 |

**Exit:** an end-to-end latency report with percentiles per stage and a repeatable failure/recovery demonstration. No Jetson or industrial PC is required for the replay exercise, but laptop timing is not target timing: quantization or a different execution provider can make the target faster or slower, so re-measure on the device before claiming performance.

**Hardware branch:** with a Jetson, spend part of step 2 on [C29](CATALOG.md#c29), replay the same recorded set with TensorRT, and report both environments side by side; other targets use the matching [R20](CATALOG.md#r20) execution provider. Add a local agent only when adaptive decisions add value and evaluate it separately.

## D3 Agentic AI and loops

**Brain role:** planning and tool use. **For:** developers building agent applications. **Prerequisites:** Python, APIs, testing; P1 exit check or equivalent. **Allocation:** 24 h.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C11](CATALOG.md#c11): Unit 1 (agent loop, messages, tools) and its first-agent exercise; [C10](CATALOG.md#c10) is an optional video alternative | 5 |
| 2 | [C44](CATALOG.md#c44) Day 2: tool design, MCP risks, human approval before actions; draft the B2 tool descriptions and schemas. [C14](CATALOG.md#c14) Unit 1 is the open alternative for a dedicated MCP build | 3 |
| 3 | [C44](CATALOG.md#c44) Day 4 or [C16](CATALOG.md#c16): traces and trajectory evaluation; [R17](CATALOG.md#r17): error analysis, pass/fail checks, judge validation. Write four development cases and ask a peer for four held-back variations | 4 |
| 4 | [R09](CATALOG.md#r09) and the [C45](CATALOG.md#c45) *Agentic AI Safety & Security* lecture: threat-model M4, each tool, and the budget; [D5](#d5-ai-security) goes further | 2 |
| 5 | [B2 bounded maintenance assistant](PRACTICE.md#b2-bounded-maintenance-assistant): compare fixed workflow to agent | 8 |
| 6 | Review stop conditions, tool failures, repeated-run variation, and held-out results | 2 |

**Exit:** a source-grounded answer, a trace of tool use, budget enforcement, and evidence on both answerable and unanswerable cases. Separate changes suggested by an agent from the decision to execute them. Live model performance must be measured; simulated traces demonstrate control flow only. C44 codelabs need a Kaggle account and a model API key; without permitted accounts, read the whitepapers and simulate tool responses.

Read [R02](CATALOG.md#r02) during the exercise. Distinguish a model's tool-use loop, a code-repair loop, a dataset/evaluation improvement cycle, and a scheduled trigger. Scheduling does not improve a bad stopping rule. Start with a single agent; consider [C15](CATALOG.md#c15) or multiple agents only when traces expose a specific need. The evaluation method is tool-neutral; no step depends on the OpenAI Evals platform, which shuts down on 2026-11-30.

## D4 Industrial data and ML

**For:** analysts and developers evaluating engineering data. **Prerequisites:** Python and basic statistics. **Allocation:** 24 h.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C06](CATALOG.md#c06): classification, metrics, generalization and overfitting; MATLAB users can begin with [C30](CATALOG.md#c30); statistics-first learners can use [C50](CATALOG.md#c50) chapters 4–5 instead | 4 |
| 2 | [C07](CATALOG.md#c07): pipelines, model selection, and the module on evaluating model performance (baselines, cross-validation choices, metrics) | 7 |
| 3 | [R21](CATALOG.md#r21), then the [B3 condition-monitoring study](PRACTICE.md#b3-industrial-data-baseline): split before fitting, compare constant, threshold, and classifier, and run the deliberate leaky split | 8 |
| 4 | Public-data check with [R22](CATALOG.md#r22): repeat the B3 split protocol on one run-to-failure set, splitting by bearing test or engine rather than by window; German-speaking learners can use the [C51](CATALOG.md#c51) predictive-maintenance exercise, which uses the same bearing data | 3 |
| 5 | Error analysis: false alarms versus missed faults, detection lead time, where the result does not generalize; short presentation | 2 |

**Exit:** compare a constant predictor, a threshold, and a model on a split justified by the deployment question (new assets, future observations, or both); report rare-fault recall and false alarms from a confusion matrix; show how far the leaky split inflated the score; and state where neither the synthetic nor the public result generalizes. C30 substitutes introductory material only; C07 uses Python. A public dataset shows that the method transfers, not how it performs on Festo assets, and a handful of run-to-failure units gives only a weak estimate.

Optional depth, outside the 24 h: [C50](CATALOG.md#c50) for statistical-learning depth, [R07](CATALOG.md#r07) for forecasting baselines and time-series cross-validation, [C52](CATALOG.md#c52) for uncertainty ([C26](CATALOG.md#c26) is the Coursera alternative), [C53](CATALOG.md#c53) before reading observational data as evidence that an intervention worked ([C27](CATALOG.md#c27) is the Coursera alternative), and [C08](CATALOG.md#c08) for vision. Take D1/D2 when deployment becomes the goal, and D5 before exposing a model to untrusted input.

## D5 AI security

**For:** developers and security practitioners who build, deploy, or test AI applications and agents. **Prerequisites:** Python and HTTP basics; P1 exit check or equivalent. Building an agent in [D3](#d3-agentic-ai-and-loops) helps but is not required: B9 can attack a simulated B2 assistant. **Allocation:** 24 h. **Authorization:** practise only on the labs' own targets and on systems you own or are explicitly permitted to test.

| Order | Study or practice | Hours |
|---|---|---:|
| 1 | [C60](CATALOG.md#c60): all three modules; read the [R09](CATALOG.md#r09) entries on prompt injection, improper output handling, excessive agency, and unbounded consumption. German speakers add [R27](CATALOG.md#r27) | 3 |
| 2 | [C62](CATALOG.md#c62): play until a level stops you; for each level, write down the defence it added and why your bypass worked | 1 |
| 3 | [C58](CATALOG.md#c58): every section and its seven labs, from excessive agency through indirect injection to agent exfiltration and defences. With a subscription, the Prompt Security and Data Poisoning modules of [C61](CATALOG.md#c61) are the paid alternative | 7 |
| 4 | [C59](CATALOG.md#c59) episodes 3–7: indirect, single-turn, and multi-turn attacks and spotlighting; note which defences are deterministic and which are probabilistic | 3 |
| 5 | [R25](CATALOG.md#r25) predictive-AI attack classes (evasion, poisoning, privacy) applied to one D1/D4-style model, then map the B9 threats to [R26](CATALOG.md#r26) techniques | 2 |
| 6 | [B9 AI security review](PRACTICE.md#b9-ai-security-review): threat model, attack log, host-enforced hardening, retest on peer-written attacks | 7 |
| 7 | Peer review of the attack log and a residual-risk handover to a named owner | 1 |

**Exit:** a threat model with trust boundaries; a reproducible attack log; at least one control the host enforces (tool permission, argument schema, output sanitisation, or approval) with before/after results on held-out attacks; benign B2 cases that still pass; and a list of risks that remain. Prompt wording and classifiers can reduce attack success but do not count as the only control. "No successful attack observed" is not proof of security. No permitted model account: C58 and C62 run in the browser and B9 works with simulated traces; label those results as simulation.

Optional, outside the 24 h: the [C59](CATALOG.md#c59) PyRIT episodes and Playground Labs for automated red teaming (own API key); the [OWASP Top 10 for Agentic Applications](CATALOG.md#r09) for multi-agent systems; and BSI's LLM hardening checklist linked from [R27](CATALOG.md#r27). This path teaches testing methods; it is not a penetration-test qualification or a substitute for an organisation's security review.

## T1 Teaching and facilitation

**For:** team learning organizers and lecturers. **Prerequisites:** ability to explain the selected example; complete its relevant path or pair with a domain expert before teaching a technical lab. **Allocation:** 6 h preparation, excluding your own prerequisite learning.

| Order | Preparation | Hours |
|---|---|---:|
| 1 | Review learners' voluntary [assessment](ASSESSMENT.md) needs, choose a track, and note role-specific needs; [R24](CATALOG.md#r24) for workplace AI-literacy context | 1 |
| 2 | [C54](CATALOG.md#c54): practice and memory episodes; write one diagnostic multiple-choice question for the chosen brief | 1 |
| 3 | Rehearse [B6 source-grounded knowledge work](PRACTICE.md#b6-source-grounded-knowledge-work) and the [B2 bounded maintenance assistant](PRACTICE.md#b2-bounded-maintenance-assistant) traces, including a failure and the paper fallback; a colleague gives content and delivery feedback using C54's teaching-practice method | 2 |
| 4 | Adapt the [90-minute session or lecture sequence](TEACHING.md) and rubric, starting from the expected evidence ([R23](CATALOG.md#r23) lesson design) | 1 |
| 5 | Check links, access labels, and licences; run R23's event checklist and plan minute cards for the debrief | 1 |

**Exit:** a worked example, a learner exercise with one diagnostic question, expected evidence, and a debrief plan; rehearsal feedback recorded with one change made. Grade understanding and verification, not subscription access or prompt fluency. Respect third-party course licences: C54 is CC BY 4.0 and can be adapted with attribution; R23 is CC BY-NC 4.0, so link to it rather than copying it into company material. Use original local exercises for the internal workshop.

An internal session can be one of an organisation's AI-literacy measures, but R24 requires no specific training or certificate, and this guide is not a compliance programme or legal advice. Optional: [C55](CATALOG.md#c55) when learners hand over written results; its facilitator guide is a model for a pre-class plus peer-review format. Carpentries certification is a separate live route via a partner or paid seat.
