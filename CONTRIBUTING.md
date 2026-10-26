# Contributing

Help someone choose and complete a useful learning step. A new link is valuable when it fills a gap, improves an existing step, or provides a better access option.

## Suggest a course or reading

Open an issue or pull request containing:

- Title, provider, and primary source URL.
- Type: course, courseware, tutorial, documentation, book, or discovery hub.
- Intended learner and goal: AI at work or developing AI; embedded, edge, or agentic where relevant.
- Prerequisites, language, selected study scope, and an explicitly labelled effort estimate.
- Access: readable materials, required account, paid labs/certificate, compute/hardware requirements, and any uncertainty.
- Which existing path step it improves and a concrete practice output.
- Review date and what was inspected: page, syllabus, sample exercise, or a completed personal learning experience.

Add a stable `C` or `R` ID and anchor in [CATALOG.md](docs/CATALOG.md); do not renumber existing IDs. Update the affected path and assessment mapping if necessary. Do not describe a product hub or article as a full course. Avoid affiliate/tracking links and unsupported quality claims.

## Correct or retire a resource

Report redirects, unavailable pages, changed course titles, paywalls, lab failures, or dated tooling. A 403, timeout, or JavaScript-only page is **unverified**, not proof the resource is gone. Prefer a canonical replacement; preserve the original URL and reason in the research record when it explains a migration. Historical material can remain useful if its edition is explicit.

The original COVID promotion code is intentionally not recommended. Do not restore time-limited access claims without checking current provider terms.

## Maintain the assessment

The goal routing, question bank, and resource mappings live in [scripts/assess.py](scripts/assess.py). Keep [ASSESSMENT.md](docs/ASSESSMENT.md) consistent with it. Test recommendations for complete beginners, knowledgeable learners without practical evidence, domain experts who do not code, low time budgets, and learners without paid tools/hardware.

Questions should diagnose a useful gap, allow “not sure,” and explain the answer. No sensitive personal data, job-performance rankings, or unvalidated claims of competence. A pilot should check whether a correct answer predicts success on the corresponding practice task.

Run from the repository root:

```sh
python3 -m unittest discover -s tests -v
python3 scripts/check_docs.py
python3 scripts/assess.py --demo
```

These checks validate recommendation behavior and local documentation references. They do not certify external course access. Recheck the primary provider pages when changing recommendations.

## Review cadence

Proposed maintenance cadence: review fast-changing agent/tool resources monthly and foundations every six months; also react to reports of broken access. From the 2026-10-26 curriculum review, the next suggested dates are **2026-11-26** for agent/tool material (including DeepLearning.AI's limited-time free access and R05 after the OpenAI Evals shutdown) and **2027-04-26** for foundations. Replace the C36 URL when the 2027 Helsinki edition opens. These are maintenance suggestions; no recurring job or reminder is configured.

Keep `RESEARCH.md` evidence current and change the catalogue date only after reviewing its entries. Use original summaries and local exercises; external course licences still govern copying. Do not add an overarching licence for third-party content. Share internal examples only in locations appropriate for that material.
