# Research and original-link audit

[Start](../README.md) · [Catalogue](CATALOG.md) · [Reference-list comparison](RESOURCES.md)

**Review date: 2026-10-24 (Europe/Berlin).** Starting point: the repository's original README at commit `16af649`, containing **53 external links, 42 of them on Coursera**. Every original URL appears below with a disposition. Summaries are original editorial notes; source content was not imported as a competing course inventory.

## What changed and why

- Replaced the blanket “Free Online Courses” framing with explicit access labels. Listing availability, free sign-up, free videos, paid exercises, and runtime costs are different facts.
- Replaced the COVID promotion section. The old Oncampus code was not verified and is no longer presented as usable. The Ivy League article is broader discovery material, not a current promotion.
- Supplied a working historical NYU edition, an open Python route, and Full Stack open as a web-development alternative. The original Discrete Optimization URL returned a not-found result; OR-Tools offers practical optimization tutorials, not an equivalent replacement course.
- Retained useful mathematical/data/software/business electives with corrected titles where observed. Old topics outside the current focus remain in the audit.
- Added Industrial AI routes for embedded, edge, and agentic systems, and separate AI-at-work routes for knowledge work, CAD, electronics, and coding assistants.
- Added an initial assessment, bounded study blocks, original exercises, and a teaching kit. These are this repository's proposed curriculum, not provider-endorsed programmes.

## Verification limits

The review inspected public provider/university pages, author repositories through the connected GitHub reader, and search-indexed official pages where direct retrieval failed. It did **not** enroll in courses, test certificates, run course labs, benchmark tools, or inspect Festo systems/entitlements. A live page is not proof that its content is current or its labs still execute. The catalogue's hours are editorial planning estimates.

| Evidence limitation | Affected entries | How it is represented |
|---|---|---|
| Direct requests returned 403; official indexed pages supplied syllabus/access evidence | DeepLearning.AI homepage, C10/C12/C16 and its Pro announcement | Video-tier claims attributed to the provider; no blanket free-lab promise; recheck current access |
| Course front ends were blocked or unreadable; university descriptions available | C01 English/German Elements of AI | University-backed course description, unverified front-end access |
| Unexpected status on direct open; official indexed course page available | C32 Altium Education | Free education offering advertised; eligibility/software not tested |
| Reader rejected `text/markdown`; official indexed documentation readable | R10 Flux tutorial | Tutorial described from provider evidence; no subscription/entitlement claim |
| Public site with ongoing term | C13 Stanford CS146S | Fall 2026 in-progress course site; no claim all lectures or tools are public |
| Tutorial hub rather than one syllabus | C29 NVIDIA Jetson | Explicitly a hub; hardware/software compatibility remains learner-specific |
| Redirect/JavaScript-only destination | AWS Skill Builder | Canonical hub identified; contents and account access unverified |
| Timeout/unavailable URL | Tübingen 2020 and old Oncampus page | Manual follow-up needed; no claim of permanent deletion |

Course listings in the original audit were inspected for identity and broad topic, not reviewed lesson by lesson. Forty of the 42 original Coursera pages returned recognizable course/specialization listings; two returned not-found results. None of those observations establishes full free access.

## Evidence for the new direction

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Teach using AI separately from developing it | [Microsoft's work-oriented learning path](https://learn.microsoft.com/en-us/training/paths/draft-analyze-present-microsoft-365-copilot/), [Autodesk generative design course](https://www.autodesk.com/learn/ondemand/course/fusion360-generative-design-intro-expert), [Flux tutorial](https://docs.flux.ai/tutorials/getting-started-copilot) | Different prerequisites and outputs; no Python gate for office/CAD/ECAD paths |
| Add embedded/edge routes with deployment checks | [Edge Impulse courseware](https://github.com/edgeimpulse/courseware-embedded-machine-learning), [TFLite Micro](https://github.com/tensorflow/tflite-micro), [NVIDIA tutorials](https://developer.nvidia.com/embedded/learn/tutorials) | Include signal/data preparation, resource budgets, target measurements, and failure handling |
| Teach agents through implementation and evaluation | [Hugging Face Agents](https://huggingface.co/learn/agents-course/en/unit0/introduction), [MCP](https://huggingface.co/learn/mcp-course/en/unit0/introduction), [Evaluating AI Agents](https://www.deeplearning.ai/courses/evaluating-ai-agents) | Start small; inspect traces and evaluate on held-out cases |
| Make loops concrete | [Anthropic's loop guide](https://claude.com/resources/articles/getting-started-with-loops), [verification loops](https://claude.com/resources/articles/building-verification-loops-in-claude-code-with-skills), [Codex Goals](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex) | Separate triggers, completion checks, retries, budgets, and handover |
| Separate free videos from paid practice | [DeepLearning.AI Pro announcement](https://www.deeplearning.ai/the-batch/introducing-deeplearning-ai-pro) | Free video access does not establish free labs or certificates |
| Prefer transferable evaluation concepts | [OpenAI evaluation guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Page announces platform retirement: read-only on 2026-10-31 and shutdown on 2026-11-30. The paths use the methodology without depending on that service. |
| Label historical and self-study material accurately | [fast.ai](https://course.fast.ai/), [FSDL LLM Bootcamp](https://fullstackdeeplearning.com/llm-bootcamp/), [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) | Mark 2022/2023 teaching editions and the absence of a planned 2026 MLOps live cohort |

The brain analogy, path durations, assessment rules, exercise contracts, and suggested rubric are **our teaching design**. They are not validated research findings or biological claims. Compare the assessment's suggestions with learner outcomes in a pilot before treating them as reliable placement decisions.

## Original-link audit

All observations below are dated **2026-10-24**. **Listing** means a recognizable public landing page; **not found** means that the research reader returned 404, not proof of universal or permanent removal; **unverified** means access could not be established. Each original title links to the exact original URL. Coursera entries use the catalogue's **Platform** access classification unless otherwise stated.

### Covid-19 Special

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 01 | [Class Central](https://www.freecodecamp.org/news/ivy-league-free-online-courses-a0d7ae675869/) | Article available; updated to an 850+ course collection | Keep only as discovery reference; remove the old promotion framing. |
| 02 | [Oncampus](https://www.oncampus.de/weiterbildung/selbstlernkurse) | Unverified: original path inaccessible | Retire the unverified promotional claim/code. [Current provider homepage](https://oncampus.de/) is a different destination, not proof of the old offer. |

### AI

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 03 | [Deep Learning Course by Yann LeCun](https://atcold.github.io/pytorch-Deep-Learning/) | Not found: reader returned 404 | Use [C20, NYU Spring 2021](CATALOG.md#c20); explicitly historical. |
| 04 | [The Machine Learning Summer School](http://mlss.tuebingen.mpg.de/2020/schedule.html) | Unverified: timeout at the 2020 site | Historical summer-school reference; do not describe as this year or recommend as a default path. |
| 05 | [AwesomeAI](https://github.com/hades217/awesome-ai) | Repository README inspected | Retain as [broader discovery](RESOURCES.md); this is a collection, not one course. |
| 06 | [DeepLearning.AI](https://www.deeplearning.ai/) | Unverified direct homepage: 403; specific official course listings indexed | Replace vague homepage recommendation with specific C10/C12/C16 entries and access labels. |
| 07 | [Fast AI Course](https://course.fast.ai/) | Course page available; Part 1 identifies 2022 edition | Retain as [C08](CATALOG.md#c08) for foundations. |
| 08 | [Math for AI](https://www.coursera.org/specializations/mathematics-machine-learning) | Listing | Retain as [C25](CATALOG.md#c25); open reading alternative R08. |
| 09 | [Probabilistic Graphical Models](https://www.coursera.org/specializations/probabilistic-graphical-models) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 10 | [Recommender Systems](https://www.coursera.org/specializations/recommender-systems) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |

### AI / Tools

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 11 | [Introduction to TensorFlow for Artificial Intelligence, Machine Learning, and Deep Learning](https://www.coursera.org/learn/introduction-tensorflow) | Listing | Optional TensorFlow-specific elective; use C07/C08 for the default ML route. |
| 12 | [Deep Neural Networks with PyTorch](https://www.coursera.org/learn/deep-neural-networks-with-pytorch) | Listing now titled Introduction to Neural Networks and PyTorch | Preserve as framework elective under its current title. |
| 13 | [Practical Machine Learning on H2O](https://www.coursera.org/learn/machine-learning-h2o) | Listing | Optional H2O-specific elective; use C07 for the common tabular ML path. |

### Data Science and Statistics

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 14 | [Data Science Overview](https://www.coursera.org/specializations/jhu-data-science) | Listing titled Data Science Specialization | Retain JHU/R-oriented depth; default engineering route uses Python. |
| 15 | [Applied Data Science with Python](https://www.coursera.org/specializations/data-science-python) | Listing | Retain Python data-science depth; C07 is the open default for model validation. |
| 16 | [Statistics with R](https://www.coursera.org/specializations/statistics) | Listing now titled Data Analysis with R | Preserve R elective under the observed current title. |
| 17 | [Bayesian statistics](https://www.coursera.org/learn/bayesian-statistics) | Listing | Retain as [C26](CATALOG.md#c26). |
| 18 | [Bayesian Statistics: Techniques and Models](https://www.coursera.org/learn/mcmc-bayesian-statistics) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 19 | [Practical Time Series Analysis](https://www.coursera.org/learn/practical-time-series-analysis) | Listing | Retain optional time-series course; [R07](CATALOG.md#r07) is an open book alternative using R. |
| 20 | [A Crash Course in Causality: Inferring Causal Effects from Observational Data](https://www.coursera.org/learn/crash-course-in-causality) | Listing | Retain as [C27](CATALOG.md#c27). |

### Computer Science

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 21 | [Data structures and algorithms](https://www.coursera.org/specializations/data-structures-algorithms) | Listing | Retain for CS/data-model foundations; complement [Awesome Courses](RESOURCES.md). |
| 22 | [Computational thinking](https://www.coursera.org/learn/computational-thinking-problem-solving) | Listing | Retain optional reasoning foundation; P0 is the short AI orientation. |

### Optimization

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 23 | [Discrete Optimization](https://www.coursera.org/learn/discrete-optimization) | Not found: reader returned 404 | Use [R06 OR-Tools tutorials](CATALOG.md#r06) for practical optimization; not an equivalent university course. |

### Web Development

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 24 | [Full-Stack Web Development](https://www.coursera.org/specializations/full-stack-react) | Not found: reader returned 404 | Replace default web option with [C05 Full Stack open](CATALOG.md#c05). |

### Software Development

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 25 | [Python for Everybody](https://www.coursera.org/specializations/python) | Listing | Retain platform alternative; prefer author-hosted [C03](CATALOG.md#c03) for open materials. |
| 26 | [Functional Programming in Scala](https://www.coursera.org/specializations/scala) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 27 | [Blockchain](https://www.coursera.org/specializations/blockchain) | Listing | Retain as specialist elective; outside the Industrial AI default paths. |
| 28 | [Google IT Automation with Python](https://www.coursera.org/professional-certificates/google-it-automation) | Listing | Retain IT automation elective; certificate/full access unconfirmed. |

### Cloud

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 29 | [Cloud Computing](https://www.coursera.org/specializations/cloud-computing) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 30 | [AWS Online Trainings](https://www.aws.training/) | Redirect page points to AWS Skill Builder | Update hub to [AWS Skill Builder](https://skillbuilder.aws/); JavaScript/account access not checked. |
| 31 | [AWS Docs](https://docs.aws.amazon.com/) | Documentation available | Retain as reference, not a course. |
| 32 | [Azure Online Trainings](https://docs.microsoft.com/en-us/learn/) | Redirect to Microsoft Learn training | Use [canonical training hub](https://learn.microsoft.com/en-us/training/). |
| 33 | [Google Cloud Trainings](https://cloud.google.com/training) | Redirect to cloud.google.com/learn/training | Use [canonical Google Cloud hub](https://cloud.google.com/learn/training); course/lab access varies. |

### Business

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 34 | [Business Foundations](https://www.coursera.org/specializations/wharton-business-foundations) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 35 | [Project Management Principles and Practices](https://www.coursera.org/specializations/project-management) | Listing | Retain as [C22](CATALOG.md#c22). |
| 36 | [Supply Chain Management](https://www.coursera.org/specializations/supply-chain-management) | Listing | Retain as [C21](CATALOG.md#c21). |
| 37 | [Effective Communication: Writing, Design, and Presentation](https://www.coursera.org/specializations/effective-business-communication) | Listing | Retain as [C23](CATALOG.md#c23). |
| 38 | [Career Success](https://www.coursera.org/specializations/career-success) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 39 | [Six Sigma Green Belt](https://www.coursera.org/specializations/six-sigma-green-belt) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 40 | [Business Strategy](https://www.coursera.org/specializations/business-strategy) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |

### Business / Innovation

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 41 | [Strategic Management and Innovation](https://www.coursera.org/specializations/strategic-management) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 42 | [Innovation Management](https://www.coursera.org/learn/innovation-management) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 43 | [Strategic Innovation: Building and Sustaining Innovative Organizations](https://www.coursera.org/learn/strategic-innovation-building-and-sustaining-innovative-organizations) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 44 | [Strategic Innovation: Managing Innovation Initiatives](https://www.coursera.org/learn/strategic-innovation-innovation-at-the-frontier) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |

### Business / HR

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 45 | [Human Resource Management: HR for People Managers](https://www.coursera.org/specializations/human-resource-management) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |

### Business / Sales

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 46 | [Strategic Sales Management](https://www.coursera.org/specializations/sales-management-bridging-gap-strategy-sales) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 47 | [Pricing Strategy Optimization](https://www.coursera.org/specializations/uva-darden-bcg-pricing-strategy) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |

### Business / Marketing

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 48 | [Digital Marketing](https://www.coursera.org/specializations/digital-marketing) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 49 | [Search Engine Optimization (SEO)](https://www.coursera.org/specializations/seo) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 50 | [Social Media Marketing](https://www.coursera.org/specializations/social-media-marketing) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |

### Business / Leadership

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 51 | [Inspired Leadership](https://www.coursera.org/specializations/inspired-leadership) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |

### Business / Digital Transformation

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 52 | [Digital Transformation](https://www.coursera.org/learn/bcg-uva-darden-digital-transformation) | Listing | Retain as [C24](CATALOG.md#c24). |

### Various

| # | Original resource | Observation | Decision |
|---|---|---|---|
| 53 | [The Science of Well-Being](https://www.coursera.org/learn/the-science-of-well-being) | Listing | Retain optional well-being resource; outside technical paths. |

## Keeping the evidence useful

Recheck primary pages before a cohort starts, especially account access, paid labs, and hardware requirements. A future review should append its date and meaningful changes rather than implying this snapshot remains current indefinitely. Follow the [contribution guidance](../CONTRIBUTING.md). No automatic remote-link checks or scheduled reviews are claimed.
