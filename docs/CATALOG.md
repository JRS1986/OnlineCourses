# Course catalogue

[Start](../README.md) · [Assessment](ASSESSMENT.md) · [Learning paths](LEARNING_PATHS.md) · [Original courses](RESEARCH.md#original-link-audit)

Reviewed **2026-10-24**. Resource links are primary course or author sources. Selections are based on published materials; the courses were not completed, lab environments were not run, and account-specific entitlements were not tested. [Research notes](RESEARCH.md#verification-limits) identify blocked pages and index-only evidence.

## Reading the entries

- **Open:** publicly readable/watchable learning material; registration may be needed for progress or submission.
- **Video tier:** free videos advertised; labs, assessments, or certificates may require payment. Recheck before enrolling.
- **Platform:** listing available; full free access unconfirmed. A free sign-up or trial does not establish a free complete course.
- **Runtime extra:** model/API usage, hosted labs, cloud resources, or GPU compute can cost money even when teaching material is open.

Suggested scopes and hours are **our estimates for selected study blocks**, including some practice, not provider estimates for completing entire courses. All entries are English unless stated otherwise. `C` identifies courses; `R` identifies readings, books, or documentation.

## AI at work

Use AI within an existing profession. Coding-assistant resources are in the agentic coding section below.

| Resource | Starting knowledge | Suggested first block | Access and value |
|---|---|---|---|
| <a id="c31"></a>**C31 · [Introduction to Generative Design for Manufacturing](https://www.autodesk.com/learn/ondemand/course/fusion360-generative-design-intro-expert)** — Autodesk | Mechanical design; Fusion basics | Study setup, constraints, outcome comparison; 3–4 h selected | Public course materials. Software entitlement and cloud solves extra; historical cloud-credit wording appears in the course. Current [Fusion help](https://help.autodesk.com/view/fusion360/ENU/?contextId=GD-F360-GENERATIVE-DESIGN) describes tokens/extensions. |
| <a id="c32"></a>**C32 · [PCB Design Courses](https://education.altium.com/)** — Altium Education | Basic electronics | Schematics/libraries and layout review; 4–6 h selected | Free education courses advertised; enrolment/software eligibility untested. **Domain foundation, not an AI course**. Pairs with R10 so AI suggestions can be checked. |
| <a id="c33"></a>**C33 · [Draft, analyze, and present with Microsoft Copilot](https://learn.microsoft.com/en-us/training/paths/draft-analyze-present-microsoft-365-copilot/)** — Microsoft Learn | Everyday office work | Prompting and one relevant app module; 2–3 h | Public learning path. Workplace account, licence, and enabled features determine hands-on availability; no Festo entitlement assumed. |

## Embedded and edge AI

Develop inference close to the physical process; pair these with the data foundations below.

| Resource | Starting knowledge | Suggested first block | Access and value |
|---|---|---|---|
| <a id="c28"></a>**C28 · [Embedded Machine Learning Courseware](https://github.com/edgeimpulse/courseware-embedded-machine-learning)** — Edge Impulse | Python, algebra/statistics; C/C++ for device work | Modules on ML, deployment, anomaly detection; 8–12 h selected | Open courseware, not a single full-semester course. Studio accounts and target hardware are separate. Use simulations first if no board is available. |
| <a id="c29"></a>**C29 · [Jetson learning tutorials and DLI course entry](https://developer.nvidia.com/embedded/learn/tutorials)** — NVIDIA | Python, Linux, basic ML | Local inference and one vision example; 6–10 h | Tutorial hub linking courses, not one course. Open reading; hands-on work depends on compatible hardware/software. Check kit/JetPack requirements before purchasing anything. |

## Foundations

| Resource | Starting knowledge | Suggested first block | Access and value |
|---|---|---|---|
| <a id="c01"></a>**C01 · [Elements of AI](https://www.elementsofai.com/)** — Helsinki / MinnaLearn; [German](https://www.elementsofai.de/) | None | Concepts and limits; 2–4 h selected reading | Free course supported by [Helsinki's description](https://www.helsinki.fi/en/news/artificial-intelligence/elements-ai-has-introduced-one-million-people-basics-artificial-intelligence). Course front ends blocked automated inspection. Full course is substantially longer. |
| <a id="c02"></a>**C02 · [CS50's Introduction to Programming with Python](https://cs50.harvard.edu/python/)** — Harvard | None | Functions, exceptions, libraries, tests, file I/O; 16–24 h | Open. Learn to understand and check code before delegating changes. Credential rules are separate. |
| <a id="c03"></a>**C03 · [Python for Everybody](https://www.py4e.com/)** — Charles Severance | None | Variables, loops, functions, files; 12–20 h | Open; account for grading. Gentler alternative to C02 and an open route to the original Coursera subject. |
| <a id="c04"></a>**C04 · [The Missing Semester of Your CS Education](https://missing.csail.mit.edu/)** — MIT | Basic programming | Shell, version control, debugging; 4–8 h | Open; 2026 syllabus visible. Inspect diffs and reproduce commands. |
| <a id="c05"></a>**C05 · [Full Stack open](https://fullstackopen.com/en/)** — Helsinki | Programming, Git; JavaScript basics | Parts 0–2, then testing topics; 12–20 h | Open materials. Optional web branch replacing the unavailable React specialization. Observe source reuse terms for teaching. |

## Data science, ML, and mathematical depth

| Resource | Starting knowledge | Suggested first block | Access and value |
|---|---|---|---|
| <a id="c06"></a>**C06 · [Machine Learning Crash Course](https://developers.google.com/machine-learning/crash-course)** — Google | Python, algebra, basic statistics | Regression, classification, overfitting; 4–8 h | Open. Establish a baseline before adding complexity. |
| <a id="c07"></a>**C07 · [Machine Learning in Python with scikit-learn](https://inria.github.io/scikit-learn-mooc/)** — Inria / scikit-learn | Python functions; NumPy/pandas useful | Pipelines, cross-validation, model selection; 8–12 h | Open; MOOC registration for the full quiz experience. Strong fit for tabular engineering data. |
| <a id="c08"></a>**C08 · [Practical Deep Learning for Coders](https://course.fast.ai/)** — fast.ai | Coding experience | First model and error analysis; 6–10 h | Open; runtime extra where free compute is insufficient. Retained original. Part 1 is the 2022 edition; foundations, not current agent tooling. |
| <a id="c09"></a>**C09 · [LLM Course](https://huggingface.co/learn/llm-course/chapter1/1)** — Hugging Face | Python, introductory deep learning | Transformers, tokenizers, datasets; 6–10 h | Open; training compute extra. Understand components behind LLM applications. |
| <a id="c19"></a>**C19 · [CS336: Language Modeling from Scratch](https://cs336.stanford.edu/)** — Stanford | Strong Python, ML, linear algebra, systems | Syllabus and tokenizer assignment; 8–12 h orientation | Open materials, Spring 2026. Full assignments require substantial time and compute. Advanced optional branch. |
| <a id="c20"></a>**C20 · [Deep Learning, Spring 2021](https://atcold.github.io/NYU-DLSP21/)** — NYU, LeCun / Canziani | Python, calculus, linear algebra | Representation and optimization lectures; 6–10 h | Open historical edition. Working alternative to the old NYU URL. |
| <a id="c25"></a>**C25 · [Mathematics for Machine Learning](https://www.coursera.org/specializations/mathematics-machine-learning)** — Imperial College London | School mathematics; Python later | Linear algebra refresher; 6–10 h | Platform. Retained original; R08 is an open reading alternative. |
| <a id="c26"></a>**C26 · [Bayesian Statistics: From Concept to Data Analysis](https://www.coursera.org/learn/bayesian-statistics)** — UC Santa Cruz | Probability, statistics | Prior, likelihood, posterior; 4–6 h | Platform. Optional depth for uncertainty and sparse fault evidence. |
| <a id="c27"></a>**C27 · [A Crash Course in Causality](https://www.coursera.org/learn/crash-course-in-causality)** — Pennsylvania | Statistics, regression | Confounding and causal assumptions; 4–6 h | Platform. Useful before interpreting observational data as intervention evidence. |
| <a id="c30"></a>**C30 · [Machine Learning Onramp](https://matlabacademy.mathworks.com/details/machine-learning-onramp/machinelearning)** — MathWorks | Basic data concepts; MATLAB familiarity useful | Classification workflow, 2–4 h with reflection | Free Onramp with account; [provider FAQ](https://uk.mathworks.com/learn/training/online-courses-faq.html) distinguishes free Onramps from subscriptions. MATLAB-oriented alternative to C06. |

## Agentic coding, agents, and evaluation

| Resource | Starting knowledge | Suggested first block | Access and value |
|---|---|---|---|
| <a id="c10"></a>**C10 · [Agentic AI](https://www.deeplearning.ai/courses/agentic-ai)** — DeepLearning.AI, Andrew Ng | Python, basic LLM use | Decomposition, reflection, tools, evaluation; 6–10 h | Video tier; runtime extra. Patterns before frameworks. [Provider policy](https://www.deeplearning.ai/the-batch/introducing-deeplearning-ai-pro) advertises free videos and paid hands-on features; current entitlement untested. |
| <a id="c11"></a>**C11 · [AI Agents Course](https://huggingface.co/learn/agents-course/en/unit0/introduction)** — Hugging Face | Python, basic LLM concepts | Unit 1 and one implementation exercise; 6–10 h | Open/free course; account and runtime may be needed. Core route for tool-using agents. |
| <a id="c12"></a>**C12 · [Claude Code: A Highly Agentic Coding Assistant](https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant)** — DeepLearning.AI / Anthropic | Python, Git | Codebase understanding, features, testing/refactoring; 3–5 h | Video tier; coding-tool access extra. Transfer the same acceptance criteria to your permitted assistant. |
| <a id="c13"></a>**C13 · [CS146S: The Modern Software Developer](https://themodernsoftware.dev/)** — Stanford | Experienced software development | Selected readings/assignment discussion; 4–8 h | Public course site, Fall 2026 in progress. Do not assume all lectures, assignments, or tools are free. [Stanford entry](https://bulletin.stanford.edu/courses/2274401). |
| <a id="c14"></a>**C14 · [MCP Course](https://huggingface.co/learn/mcp-course/en/unit0/introduction)** — Hugging Face / Anthropic | Python, APIs, agent basics | Fundamentals and a local integration; 4–6 h | Open/free course; runtime extra. Add tool interfaces after a small working agent. |
| <a id="c15"></a>**C15 · [Introduction to LangGraph — Python](https://academy.langchain.com/courses/intro-to-langgraph)** — LangChain Academy | Python, agent basics | State, routing, human interaction; 4–6 h selected study | Free course advertised; account/model services may be needed. Optional framework depth after C11. |
| <a id="c16"></a>**C16 · [Evaluating AI Agents](https://www.deeplearning.ai/courses/evaluating-ai-agents)** — DeepLearning.AI / Arize AI | Python, a simple agent | Traces, component and trajectory evaluation; 3–5 h | Video tier; runtime/platform extra. Diagnose a failing step and measure a revision. |

## Delivery and domain context

| Resource | Starting knowledge | Suggested first block | Access and value |
|---|---|---|---|
| <a id="c17"></a>**C17 · [Full Stack LLM Bootcamp](https://fullstackdeeplearning.com/llm-bootcamp/)** — Full Stack Deep Learning | Development, LLM basics | Lifecycle and evaluation; 3–5 h | Open **April 2023 recordings**. Architecture discussion; check modern APIs separately. |
| <a id="c18"></a>**C18 · [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp)** — DataTalks.Club | Python, Docker, shell, ML experience | Tracking, deployment, monitoring; 8–12 h selected modules | Open self-study; cloud runtime extra. Repository states no live cohort planned for 2026; no live-cohort certificate for self-study. |
| <a id="c21"></a>**C21 · [Supply Chain Management](https://www.coursera.org/specializations/supply-chain-management)** — Rutgers | None for orientation | One relevant process module; 3–5 h | Platform. Retained for planning/logistics context. |
| <a id="c22"></a>**C22 · [Project Management Principles and Practices](https://www.coursera.org/specializations/project-management)** — UC Irvine | None for introductory study | Scope and planning; 3–5 h | Platform. Retained for defining a small pilot. |
| <a id="c23"></a>**C23 · [Effective Communication: Writing, Design, and Presentation](https://www.coursera.org/specializations/effective-business-communication)** — Colorado Boulder | None for introductory study | Explain a technical decision; 3–5 h | Platform. Retained for handovers and teaching. |
| <a id="c24"></a>**C24 · [Digital Transformation](https://www.coursera.org/learn/bcg-uva-darden-digital-transformation)** — BCG / Virginia | Process familiarity | Change and value discussion; 3–5 h | Platform. Retained optional context for team leads. |

## Readings and practical documentation

Public readings support the courses; they are not extra course-completion requirements. Allow 30–90 minutes for a selected article or section; books and implementation take longer.

| Resource | Use it for | Caveat |
|---|---|---|
| <a id="r01"></a>**R01 · [Building effective agents](https://www.anthropic.com/research/building-effective-agents)** | Choosing a fixed workflow, single agent, or orchestration | Provider perspective; compare with your baseline |
| <a id="r02"></a>**R02 · [Getting started with loops](https://claude.com/resources/articles/getting-started-with-loops)** | Turn, goal, time, and event-driven work | Vendor taxonomy; commands/availability can change |
| <a id="r03"></a>**R03 · [Building verification loops with skills](https://claude.com/resources/articles/building-verification-loops-in-claude-code-with-skills)** | Repeatable checks and feedback | Observable outputs still need independent review |
| <a id="r04"></a>**R04 · [Using Goals in Codex](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex)** | Outcomes, boundaries, verifiable completion | Execution needs a supporting version and permitted account |
| <a id="r05"></a>**R05 · [Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices)** | Task-specific datasets and calibrated evaluation | Methodology only here; page announces Evals platform retirement |
| <a id="r06"></a>**R06 · [OR-Tools](https://developers.google.com/optimization)** | Deterministic scheduling/assignment baselines | Tutorials, not a replacement university course |
| <a id="r07"></a>**R07 · [Forecasting: Principles and Practice](https://otexts.com/fpp3/)** — Hyndman / Athanasopoulos | Forecast baselines and time-aware evaluation | Open textbook using R; Python learners can read concepts or add R preparation |
| <a id="r08"></a>**R08 · [Mathematics for Machine Learning](https://mml-book.github.io/)** — Deisenroth / Faisal / Ong | Linear algebra, calculus, probability | Author-hosted free book PDF; distinct from C25 |
| <a id="r09"></a>**R09 · [OWASP LLM and Gen AI Top 10](https://genai.owasp.org/llm-top-10/)** | Prompt injection, excessive agency, uncontrolled consumption | Technical reference, not corporate policy |
| <a id="r10"></a>**R10 · [Getting Started with Flux](https://docs.flux.ai/tutorials/getting-started-copilot)** | AI assistance for components, datasheets, and design changes | Tutorial, not a structured AI/EDA course; account/plan and permitted project data must be checked |
| <a id="r11"></a>**R11 · [TensorFlow Lite for Microcontrollers](https://github.com/tensorflow/tflite-micro)** | Resource-constrained inference and hardware-specific profiling | Runtime documentation; firmware knowledge required for deployment |
| <a id="r12"></a>**R12 · [Writing prompts in Microsoft Copilot](https://support.microsoft.com/en-us/microsoft-365-copilot/get-started-writing-prompts-in-microsoft-365-copilot)** | Goals, context, source material, and expected output | Product behavior depends on account and licence |

## Choosing without overspending

C02/C03, C04, C06/C07, C11, and public readings provide an open route. The practice briefs also work manually or with simulated tool responses. Live agents require a permitted tool and a usage budget. Certificates, model usage, and corporate entitlements are separate decisions.

The [original-link audit](RESEARCH.md#original-link-audit) preserves business, HR, sales, marketing, leadership, Scala, cloud, statistics, and well-being electives. Their placement outside the default paths is a scope decision, not a negative course review.
