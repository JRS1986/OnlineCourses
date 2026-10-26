# Team workshops and lecture use

[Start](../README.md) · [Assessment](ASSESSMENT.md) · [Practice briefs](PRACTICE.md)

Use the **Industrial AI map** as the shared introduction, then separate people who want to use AI in their jobs from those developing AI systems. Group by learning goal, not seniority. A mixed team can share a debrief while working on different briefs.

## A 90-minute team session

**Beforehand:** learners choose a goal and complete the voluntary assessment. Facilitator rehearses B6 and one specialist brief. Prepare the fictional inputs and the worked failure examples from [PRACTICE.md](PRACTICE.md). Confirm which tools participants can use; keep the paper version ready. No learner account is required for the shared exercise.

| Time | Activity | Evidence |
|---|---|---|
| 0–10 min | Brain analogy; using AI versus developing AI | Each pair places one industrial example on the map |
| 10–25 min | B6: critique the deliberately wrong brief, then rewrite it | Claim-to-source table |
| 25–35 min | Demonstrate B2's successful and abstaining traces | Identify what causes each trace to stop |
| 35–60 min | Pairs choose B7 CAD, B8 electronics, B1 coding, or a B4/B5 architecture worksheet | Requirements and a concrete verification check |
| 60–75 min | Swap outputs with another pair; introduce one missing/contradictory input | A documented failure or revised assumption |
| 75–85 min | Debrief: what improved, what remained uncertain, what cost checking time? | Honest comparison with the manual baseline |
| 85–90 min | Select one learning path and a next milestone | Learner-owned plan |

Keep code implementation short: in this workshop, B1 can be a contract/test design exercise. Full model training, firmware deployment, or completing a course is outside 90 minutes.

## Three 90-minute lecture sessions

| Session | Learning objective | Preparation | Classroom exercise | Follow-up |
|---|---|---|---|---|
| 1 — Industrial AI roles | Distinguish AI at work, embedded, edge, and agentic systems | Selected C01 and the Industrial AI map | B6 plus B7/B8; discuss unsupported conclusions | Use-case brief and justified route choice |
| 2 — Evidence and deployment | Explain validation, resource constraints, and deployment boundaries | C06/C07 selections; C28 or C29 for the specialist track | Design B3 split and B4/B5 measurement plan; compare to a simple baseline | Reproducible small experiment or clearly labelled simulation |
| 3 — Agentic coding and loops | Define tools, evaluation, and stop conditions | C11 selections and R02/R03 | B2 fixed workflow versus agent trace; optionally review a B1 code diff | Project report, evidence, and a peer review |

Reading and follow-up work are additional to contact time. Reduce scope for beginners. For an existing “Advanced data models” lecture, connect B3's split design and B2's state/tool schemas to data modelling; use C25/C26/C27 as optional theory. This is a suggested integration, not a claim about a particular syllabus.

## Shared assessment rubric

Score each dimension 0, 1, or 2. This rubric assesses submitted learning work; it is distinct from the initial knowledge checks.

| Dimension | 0 — missing | 1 — partial | 2 — convincing evidence |
|---|---|---|---|
| Problem and baseline | Unclear target | Goal stated, weak comparison | Explicit contract and meaningful simpler baseline |
| Correctness and evidence | Unsupported conclusions | Some checks | Requirements-linked checks, sources, and failure cases |
| Industrial constraints | Ignores context | Lists constraints | Tests relevant units, boundaries, resources, or domain assumptions |
| Reproducibility | Cannot reproduce | Main steps only | Inputs, versions, methods, actual outputs, and limitations recorded |
| Judgment and explanation | Cannot explain output | Explains happy path | Explains failure, tradeoff, and when to stop or seek review |

**Suggested learning milestone:** at least 8/10 with no zero in correctness or industrial constraints, followed by a brief explanation to a peer. This is a local teaching suggestion, not a certification. Accept a rigorous simulation report in a simulation assignment; do not award measured-deployment credit for estimated performance. Do not grade access to paid tools.

## Share within a team

Start with a small voluntary pilot. Ask each learner for their chosen path, whether the access labels were accurate, actual study time, and one useful/unhelpful resource. After two weeks, review an artifact rather than course-watch counts. Keep personally identifying assessment answers out of the repository.

Use original local exercises and links to external course pages. Full Stack open, the Edge Impulse courseware, and Teaching Tech Together carry noncommercial or share-alike terms; free access does not automatically grant unrestricted corporate redistribution. The Carpentries Instructor Training (CC BY 4.0) and Google Technical Writing One (CC BY 4.0) can be adapted with attribution. Consult the source terms before copying teaching material. This guide does not reproduce their course content.
