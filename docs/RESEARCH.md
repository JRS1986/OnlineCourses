# Research and original-link audit

[Start](../README.md) · [Catalogue](CATALOG.md) · [Reference-list comparison](RESOURCES.md)

**Review dates: 2026-10-24 (initial audit), 2026-10-26 ([curriculum review](#curriculum-review-2026-10-26)), and 2026-10-27 ([AI security addition](#ai-security-addition-2026-10-27)), Europe/Berlin.** Starting point: the repository's original README at commit `16af649`, containing **53 external links, 42 of them on Coursera**. Every original URL appears below with a disposition. Summaries are original editorial notes; source content was not imported as a competing course inventory.

## What changed and why

- Replaced the blanket “Free Online Courses” framing with explicit access labels. Listing availability, free sign-up, free videos, paid exercises, and runtime costs are different facts.
- Replaced the COVID promotion section. The old Oncampus code was not verified and is no longer presented as usable. The Ivy League article is broader discovery material, not a current promotion.
- Supplied a working historical NYU edition, an open Python route, and Full Stack open as a web-development alternative. The original Discrete Optimization URL returned a not-found result; OR-Tools offers practical optimization tutorials, not an equivalent replacement course.
- Retained useful mathematical/data/software/business electives with corrected titles where observed. Old topics outside the current focus remain in the audit.
- Added Industrial AI routes for embedded, edge, and agentic systems, and separate AI-at-work routes for knowledge work, CAD, electronics, and coding assistants.
- Added an initial assessment, bounded study blocks, original exercises, and a teaching kit. These are this repository's proposed curriculum, not provider-endorsed programmes.

## Curriculum review, 2026-10-26

**Method.** Six parallel research reviews, one per path cluster (foundations P0/P1; AI at work W1–W3; agentic coding and agents W4/D3; embedded and edge D1/D2; data and ML D4; teaching T1 and the business electives), re-inspected every existing entry in scope and searched for stronger free resources. A separate check then re-fetched the new claims. Candidates were ranked by authority (universities, public programmes such as KI-Campus and Helsinki Open University, standards bodies, the primary tool vendor), then by checkable reception (provider or Class Central ratings with review counts, enrolment, GitHub adoption, syllabus use), then by genuinely free access to material and practice. Free certificates are recorded but were never a selection reason. Path totals and exit checks were kept; study blocks changed where a better resource or a sharper exercise was found. Nothing was enrolled in, completed, or run. Ratings and counts are snapshots from this date; the catalogue rounds them down.

**What changed.**

- **P0/P1.** Elements of AI's facts were corrected (readable front end, LLM section, free certificate, 2 ECTS). Two German KI-Campus options were added: C34, plus the optional AI Act course C35. P1 now makes test-writing compulsory through CS50P week 5 (pytest) and ends with a peer diff review against Google's review guide (R13). Maths no longer depends on Coursera, because C25 states it cannot be taken for free; the open route is C37, then R08.
- **W1–W3.** W1 is built on C38 AI Fluency, a free, vendor-neutral course co-developed with two universities. Microsoft Copilot (C33) is now an optional product layer. C31 points to Autodesk's current generative design course, and R15 (DTU TopOpt) adds a tool-neutral optimisation block. Altium's free curriculum is now limited to verified students, so open-source KiCad documentation (R16) is the default ECAD foundation, with a thermal datasheet module (C40) for B8.
- **W4/D3.** W4 starts with MIT's tool-neutral 2026 *Agentic Coding* lecture (C04), then one vendor block for the permitted assistant (C43 or C42), with AGENTS.md (R18) as the instruction file. D3 uses the Kaggle/Google agents course (C44) for tools and quality and a vendor-neutral evaluation FAQ (R17) in place of the retiring OpenAI Evals guide. Security (R09, C45) is an explicit step again. DeepLearning.AI courses whose free access is advertised as limited-time are optional.
- **D1/D2.** R11 is renamed LiteRT for Microcontrollers, with a host-side `hello_world` conversion check. The Harvard *Machine Learning Systems* text (R19) supports both device gates. D2 is laptop-first with ONNX Runtime (R20); Jetson (C29, repointed to the maintained Hello AI World) is a hardware branch. HarvardX TinyML (C46) and MIT 6.5940 (C47) are accredited options, not gates.
- **D4.** scikit-learn's leakage documentation (R21) precedes B3. A new step repeats the split protocol on public NASA run-to-failure data (R22), or on KI-Campus's German predictive-maintenance exercise (C51). Open defaults replace the Coursera depth courses: Statistical Rethinking 2026 (C52) for uncertainty and Brady Neal's course with Hernán/Robins's *What If* (C53) for causality. R07 now leads with the free Python edition. C17 (2023 recordings, unused) was retired.
- **T1 and electives.** T1 now has teaching resources: Carpentries Instructor Training (C54), *Teaching Tech Together* (R23), and the Commission's AI-literacy Q&A as context (R24). C21–C23 state they cannot be taken for free; open or free-track counterparts were added (C55 Google Technical Writing One, C56 OpenLearn project management, C57 MITx Supply Chain Fundamentals).

### Foundations and orientation (P0, P1)

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Keep Elements of AI as the P0 core; correct its access facts | [Course chapter list](https://course.elementsofai.com/), [ECTS FAQ](https://elementsofai.com/faq/how-can-i-get-ects-credits), [certificate FAQ](https://elementsofai.com/faq/i-have-passed-an-elements-of-ai-course-where-is-my-certificate-2), [Class Central](https://www.classcentral.com/course/independent-elements-of-ai-12469) (4.8 from 1,066 reviews), [IHK Hannover, 26 Mar 2026](https://www.ihk.de/hannover/hauptnavigation/innovation/innovation/technologien-trends/industrie-4-0-und-ki2/online-kurs-kostenfrei-basiswissen-zur-kuenstlichen-intelligenz-5376626) | Free certificate after peer review; 2 ECTS only for the Global/Finnish/Swedish versions; German edition licensed by DIHK-Bildungs-gGmbH; paid AI-literacy upsells are separate products |
| Add a German-original orientation option | [KI-Campus course page](https://ki-campus.org/lernangebote/kurse/einfuehrung-die-ki), [certificate rules](https://ki-campus.org/ki-zertifikate), [projects and funders](https://ki-campus.org/ueber-uns/projekte) | Free course and certificates; content behind a free login (not inspected); Stifterverband platform with federal project funding; eight ratings not used as quality evidence |
| Offer AI Act context as optional, not as a step | [Commission AI Act page, updated 19 Oct 2026](https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai), [AI-literacy FAQ](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers), [KI-Campus EU AI Act Essentials](https://ki-campus.org/lernangebote/kurse/eu-ai-act-essentials) | Article 4 has applied since 2 Feb 2025; no certificate required; the AI Omnibus moved high-risk dates to Dec 2027/Aug 2028, so course timelines need checking |
| Keep CS50P as the P1 core and make its testing week mandatory | [Course weeks](https://cs50.harvard.edu/python/), [week 5](https://cs50.harvard.edu/python/weeks/5/), [problem set 5](https://cs50.harvard.edu/python/psets/5/), [certificate](https://cs50.harvard.edu/python/certificate/), [honesty policy](https://cs50.harvard.edu/python/honesty/) | Free CS50 Certificate at ≥70 % on every problem and the final project; only CS50's AI tools allowed; tests are written for earlier programs, so weeks 0–3 then 5–6 is coherent |
| Retain Py4E as the gentle open alternative | [py4e.com](https://www.py4e.com/), [lessons](https://www.py4e.com/lessons), [Class Central](https://www.classcentral.com/course/coursera-python-4319) (4.9 from 50,854 reviews) | Coursera version listed as paid; link the CC BY site; no testing unit, so C02 week 5 is added |
| Add a credit-bearing Python alternative | [Python Programming MOOC 2026](https://programming-26.mooc.fi/), [grading](https://programming-26.mooc.fi/grading-and-exams), [FAQ](https://programming-26.mooc.fi/faq), [source](https://github.com/rage/programming-26) | 5 ECTS after an online exam; tests are provided, not taught; yearly URL needs a January update |
| Update Missing Semester to the 2026 edition | [Home](https://missing.csail.mit.edu/), [Version Control and Git](https://missing.csail.mit.edu/2026/version-control/), [Code Quality](https://missing.csail.mit.edu/2026/code-quality/), [Agentic Coding](https://missing.csail.mit.edu/2026/agentic-coding/) | Git, debugging, testing/CI, and agentic-coding lectures support P1 and W4; the German translation is of 2020 |
| Add explicit test-writing and review references for B1 | [pytest Get Started](https://docs.pytest.org/en/stable/getting-started.html), [Google code review guide](https://google.github.io/eng-practices/review/reviewer/), [eng-practices licence](https://google.github.io/eng-practices/) | P1 ends with reviewing a peer's diff against named criteria, not only passing tests |
| Remove Coursera dependence from the maths route | [C25 listing FAQ](https://www.coursera.org/specializations/mathematics-machine-learning), [3Blue1Brown linear algebra](https://www.3blue1brown.com/topics/linear-algebra), [MIT 18.06SC](https://ocw.mit.edu/courses/18-06sc-linear-algebra-fall-2011/), [MML book](https://mml-book.github.io/) | C25 optional (Platform); open route C37 → R08, with 18.06SC for accredited practice |
| Considered, not added | [CS50AI](https://cs50.harvard.edu/ai/) (prerequisite CS50x or a year of Python), [MIT 6.100L](https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/) (Fall 2022, no certificate), [openHPI Python for Beginners](https://open.hpi.de/courses/python2025) (English, ends at libraries) | CS50P already covers testing; no German-language Python course with tests was found |

### AI at work (W1–W3)

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Teach a vendor-neutral fluency framework before product training | [AI Fluency course page](https://academy.claude.com/courses/ai-fluency-framework-foundations), [HEA National Forum launch](https://www.teachingandlearning.ie/2025/06/19/launch-of-new-open-course-ai-fluency-framework-and-foundations/), [Coursera listing](https://www.coursera.org/learn/ai-fluency-framework-foundations) | C38 is the W1 core; C33 is an optional, licence-dependent product layer; the paper route needs no account |
| Keep well-rated Coursera prompting courses out of the default route | [Generative AI for Everyone](https://www.coursera.org/learn/generative-ai-for-everyone) (full materials and certificate require purchase), [Prompt Engineering for ChatGPT](https://www.coursera.org/learn/prompt-engineering) (Vanderbilt, 18–20 h, ChatGPT-specific) | Strong reception, but free full access is unconfirmed and scope exceeds 6 h |
| Point C31 to Autodesk's current generative design course | [Course via Autodesk regional mirror](https://www-pt.autodesk.com/learn/ondemand/course/generative-design) (January 2025 re-release, certificate at 75 %), [Fusion help](https://help.autodesk.com/view/fusion360/ENU/?contextId=GD-F360-GENERATIVE-DESIGN), [certification page](https://www-pt.autodesk.com/certification/all-certifications/generative-design-manufacturing-expert) (US$200 exam) | Watching is separate from solving; the certification exam is a separate paid decision |
| Add a tool-neutral topology-optimization block | [DTU TopOpt apps and software](https://www.topopt.mek.dtu.dk/apps-and-software), [88-line code paper](https://www.topopt.mek.dtu.dk/apps-and-software/efficient-topology-optimization-in-matlab), [Python code page](https://www.topopt.mek.dtu.dk/apps-and-software/topology-optimization-codes-written-in-python) | R15 shows that an optimizer represents only formulated loads and constraints; manufacturability needs separate checks |
| Replace the default ECAD foundation with open-source documentation | [Altium Student Lab](https://www.altium.com/education/students) (verified students; Windows), [redirect target of education.altium.com](https://www.altium.com/education/embedded-systems-program), [Getting Started in KiCad 10.0](https://docs.kicad.org/10.0/en/getting_started_in_kicad/getting_started_in_kicad.html) | R16 is the default; C32 is optional for students |
| Treat AI-ECAD products as optional examples | [Flux PCB design assistant](https://docs.flux.ai/reference/copilot) (redirect from former tutorial), [Flux pricing](https://www.flux.ai/pricing) (paid plan for AI after trial) | R10 is optional; B8 uses any permitted assistant or paper |
| Make thermal evidence explicit before AI comparison | [Toshiba LDO e-learning, chapter 4-2](https://toshiba.semicon-storage.com/eu/semiconductor/knowledge/e-learning/basics-of-low-dropout-ldo-regulators/chap4/chap4-2.html) (Tj = P × Rth(j-a) + Ta; ratings apply to specified boards) | C40 precedes B8; with a linear regulator, worst-case dissipation is 5 W |
| Keep W3 a review exercise, not schematic generation | [HWE-Bench, arXiv 2603.18102](https://arxiv.org/abs/2603.18102) (March 2026 preprint: top model passed 8.15 % of 300 board-level tasks) | Supports the "no unreviewed AI schematic" exit; preprint, not peer reviewed |

### Agentic coding and agents (W4, D3)

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Open W4 with a tool-neutral university lecture | [MIT Missing Semester 2026 *Agentic Coding*](https://missing.csail.mit.edu/2026/agentic-coding/): agent loop, AGENTS.md/skills/subagents, verification and TDD, permissions; CC BY-NC-SA | Concepts before vendor features |
| Offer one vendor block per permitted assistant | [Claude Code 101](https://academy.claude.com/courses/claude-code-101) (free, 12 lessons, 1.5 h; paid plan or API key for practice); [GitHub Copilot Fundamentals Part 2](https://learn.microsoft.com/en-us/training/paths/gh-copilot-2/) (updated 2026-10-21, German modules); [GitHub plans](https://docs.github.com/en/copilot/get-started/plans) (agent mode in Copilot Free) | W4 does not assume a specific assistant; a free course does not make execution free |
| Demote time-limited free courses to options | [C12](https://www.deeplearning.ai/courses/claude-code-a-highly-agentic-coding-assistant) and [C16](https://www.deeplearning.ai/courses/evaluating-ai-agents) state free access "for a limited time" during a platform beta; [C10](https://www.deeplearning.ai/courses/agentic-ai) needs PRO for quizzes, labs, and certificate | Each DeepLearning.AI step has an open alternative; recheck access each review |
| Make instruction files explicit but not sufficient | [AGENTS.md](https://agents.md/); [Linux Foundation AAIF announcement](https://www.linuxfoundation.org/press/linux-foundation-announces-the-formation-of-the-agentic-ai-foundation) (Dec 9, 2025; 60,000+ adopting projects) | One tool-neutral file for B1's rules; enforce protected tests and caps through permissions or CI |
| Use an open, widely taken course for agent tools and quality | [Kaggle 5-Day AI Agents guide](https://www.kaggle.com/learn-guide/5-day-agents) (Nov 10–14, 2025 edition); [Google recap](https://blog.google/innovation-and-ai/technology/developers-tools/ai-agents-intensive-recap/) (over 1.5 million learners) | Open whitepapers and codelabs for D3 steps 2–3; ADK/Gemini-specific code, transferable concepts |
| Replace the retiring OpenAI eval guide with vendor-neutral guidance | [OpenAI guide](https://developers.openai.com/api/docs/guides/evaluation-best-practices) (read-only 2026-10-31, shutdown 2026-11-30); [Husain/Shankar AI Evals FAQ](https://hamel.dev/blog/posts/evals-faq/) (updated September 2026) | R17 replaces R05 in D3 and the refreshers; R05 kept only as historical |
| Keep agent security in D3 with standards and university sources | [OWASP LLM Top 10 2025](https://genai.owasp.org/llm-top-10/); [OWASP Top 10 for Agentic Applications 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/); [Berkeley Agentic AI MOOC, Fall 2025](https://agenticai-learning.org/f25) | R09 becomes a D3 step; C45 is marked a historical edition with no current certificate |
| Considered, not added | [Microsoft AI Agents for Beginners](https://github.com/microsoft/ai-agents-for-beginners) (overlaps C11; samples need Azure), [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents), [UK AISI Inspect](https://inspect.aisi.org.uk/) (an eval harness, not learning material) | Candidates if a German-language agent course or a concrete eval runner is needed later |

### Embedded and edge AI (D1, D2)

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Rename R11 to LiteRT for Microcontrollers and keep host-side checks | [LiteRT for Microcontrollers overview](https://developers.google.com/edge/litert/microcontrollers/overview), [tflite-micro README](https://github.com/tensorflow/tflite-micro), [hello_world README](https://github.com/tensorflow/tflite-micro/blob/main/tensorflow/lite/micro/examples/hello_world/README.md), [memory management](https://github.com/tensorflow/tflite-micro/blob/main/tensorflow/lite/micro/docs/memory_management.md) | D1 conversion and output comparison need no board; host arena figures are labelled as measured elsewhere |
| Keep C28 as the D1 core, with evidence | [Courseware README](https://github.com/edgeimpulse/courseware-embedded-machine-learning), [Coursera listing](https://www.coursera.org/learn/introduction-to-embedded-machine-learning) (4.8 from 771 reviews; 56,725 enrolled), [Edge Impulse pricing](https://edgeimpulse.com/pricing) | Open videos and slides; Studio limits and the hosted-data caveat stated |
| Add HarvardX TinyML as an accredited alternative, not a gate | [Harvard: Fundamentals](https://pll.harvard.edu/course/fundamentals-tinyml), [Applications](https://pll.harvard.edu/course/applications-tinyml), [Deploying](https://pll.harvard.edu/course/deploying-tinyml); [tinyMLx/courseware](https://github.com/tinyMLx/courseware) | Video tier: audit free, $299 verified certificate per course; overlap with C28 noted |
| Add the Harvard *Machine Learning Systems* text for D1 and D2 | [mlsysbook.ai](https://mlsysbook.ai/), [repository](https://github.com/harvard-edge/cs249r_book), [licence](https://mlsysbook.ai/about/license.html), [Benchmarking](https://mlsysbook.ai/vol1/12_benchmarking/12_benchmarking.html), [Model Serving](https://mlsysbook.ai/vol1/13_model_serving/13_model_serving.html), [ML Operations](https://mlsysbook.ai/vol1/14_ml_ops/14_ml_ops.html) | One university text supports the D1 device gate and the D2 latency and rollback checks; cite chapter titles because numbering changes |
| Make D2 laptop-first and vendor-neutral | [ONNX Runtime docs](https://onnxruntime.ai/docs/), [profiling](https://onnxruntime.ai/docs/performance/tune-performance/profiling-tools.html), [quantization](https://onnxruntime.ai/docs/performance/model-optimizations/quantization.html) ("quantization overhead can make performance worse") | Replay on a laptop CPU; re-measure on each target and execution provider |
| Move Jetson to a hardware branch and repoint C29 | [NVIDIA tutorials page](https://developer.nvidia.com/embedded/learn/tutorials) (JetPack 4.x, 2020–2021 webinars), [jetson-inference](https://github.com/dusty-nv/jetson-inference) (JetPack 6 on Orin), [Jetson AI Lab](https://www.jetson-ai-lab.com/tutorials/) | D2 no longer implies a hardware purchase |
| Keep C18 to local units | [MLOps Zoomcamp README](https://github.com/DataTalksClub/mlops-zoomcamp) (no 2026 cohort), [module 4 units](https://github.com/DataTalksClub/mlops-zoomcamp/tree/main/04-deployment) (AWS streaming "can create AWS charges") | Registry and container units only; no cloud spend required |
| MIT efficient-ML course as optional depth | [6.5940 Fall 2024](https://hanlab.mit.edu/courses/2024-fall-65940) (recorded lectures, Colab labs), [Fall 2026](https://hanlab.mit.edu/courses/2026-fall-65940) | C47 sits outside the 24 h |
| Considered, not added | [ST Edge AI Developer Cloud](https://stm32ai.st.com/st-edge-ai-dc/) (free board-farm benchmarks; reference-board numbers), [openHPI Applied Edge AI](https://open.hpi.de/courses/edgeai2022) (2022), [OpenVINO Notebooks](https://github.com/openvinotoolkit/openvino_notebooks) (covered through R20's execution providers) | Reference-board or vendor benchmarks count as "measured elsewhere" in the D1 exit |

### Industrial data and ML (D4)

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Teach leakage and split choice from the library's own documentation | [scikit-learn common pitfalls](https://scikit-learn.org/stable/common_pitfalls.html), [cross-validation guide](https://scikit-learn.org/stable/modules/cross_validation.html) | R21 precedes B3; grouped and time-series splitters replace random splits of overlapping windows |
| Add a public run-to-failure transfer step | [NASA PCoE Data Set Repository](https://www.nasa.gov/intelligent-systems-division/discovery-and-systems-health/pcoe/pcoe-data-set-repository/), [PHM Society mirror](https://data.phmsociety.org/) | Public or simulated data shows method transfer, not Festo asset performance |
| Add a German, university-built predictive-maintenance exercise | [IFF/Fraunhofer IPA press release, Dec 2022](https://www.iff.uni-stuttgart.de/dokumente/PM-KI_Kurs_Marco-Huber_KIR_MRH.pdf), [exercise repository](https://github.com/KI-Campus/KI-und-Industrie-4.0) (CC BY-SA 4.0) | C51 links the public exercise repository as the German alternative for D4 step 4; the KI-Campus course page was not accessible |
| Prefer the open scikit-learn MOOC as the validation core | [Inria course site](https://inria.github.io/scikit-learn-mooc/), [FUN MOOC page](https://www.fun-mooc.fr/en/courses/machine-learning-python-scikit-learn/) (free, self-paced, Open Badge at ≥60 %) | C07 keeps 7 h of D4 |
| Offer a Stanford statistics-first route | [ISLP book site](https://www.statlearning.com/), [ISLP labs](https://github.com/intro-stat-learning/ISLP_labs) | C50 is open through the book, labs, and videos; the Stanford Online course itself is paid after a free trial |
| Replace Coursera optional depth with open defaults | [C26 page](https://www.coursera.org/learn/bayesian-statistics), [C27 page](https://www.coursera.org/learn/crash-course-in-causality) (FAQ: materials require the paid Certificate experience), [Statistical Rethinking 2026](https://github.com/rmcelreath/stat_rethinking_2026), [Neal causal course](https://www.bradyneal.com/causal-inference-course), [What If](https://miguelhernan.org/whatifbook) | C52/C53 become the defaults; C26/C27 remain Platform alternatives |
| Use the Python forecasting edition | [FPP, the Pythonic Way](https://otexts.com/fpppy/) (free online, 2026), [FPP3](https://otexts.com/fpp3/) | R07 leads with Python and keeps the R original |
| Retire the 2023 LLM bootcamp | [FSDL LLM Bootcamp](https://fullstackdeeplearning.com/llm-bootcamp/) (April 2023 recordings; page warns tools have changed) | C17 removed; D3 resources cover lifecycle and evaluation |
| Considered, not added | [Machine Learning Specialization](https://www.coursera.org/specializations/machine-learning-introduction) (graded work paid), [nn-zero-to-hero](https://github.com/karpathy/nn-zero-to-hero) (LLM-focused), [d2l.ai](https://d2l.ai/), [MIT 6.S191 2026](https://introtodeeplearning.com/) | Each duplicates C06/C07/C50 or adds deep-learning depth outside D4's bottleneck; MIT 6.S191 is the best candidate if a current deep-learning course is wanted later |

### Teaching and electives (T1, C21–C24)

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Teach facilitators with an open, evidence-based instructor curriculum | [Carpentries Instructor Training](https://carpentries.github.io/instructor-training/), [licence](https://carpentries.github.io/instructor-training/LICENSE.html), [teaching-practice episode](https://carpentries.github.io/instructor-training/11-practice-teaching.html), [community figures](https://carpentries.org/) | Selected episodes support T1 rehearsal and feedback; CC BY 4.0 permits adaptation with attribution |
| Design sessions backward from evidence | [Teaching Tech Together](https://teachtogether.tech/en/index.html) | Lesson-design steps, teaching rubric, and event checklists; CC BY-NC 4.0, so link rather than copy |
| Frame internal sessions as AI-literacy context, not compliance | [Commission AI Literacy Q&A](https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers), [living repository](https://digital-strategy.ec.europa.eu/en/library/living-repository-foster-learning-and-exchange-ai-literacy) | Tailor to role, risk, and context; an internal record suffices and no certificate is required |
| Coursera business electives are not free | FAQs of [C21](https://www.coursera.org/specializations/supply-chain-management), [C22](https://www.coursera.org/specializations/project-management), [C23](https://www.coursera.org/specializations/effective-business-communication); [C24](https://www.coursera.org/learn/bcg-uva-darden-digital-transformation) | C21–C23 state they cannot be taken for free; C24 free access unconfirmed; all stay optional |
| Offer open or free-track routes for business context | [Technical Writing One](https://developers.google.com/tech-writing/one), [facilitator guide](https://developers.google.com/tech-writing/for-instructors/one/instructors-guide), [OpenLearn project management](https://www.open.edu/openlearn/money-business/leadership-management/project-management-the-start-the-project-journey), [MITx SC1x](https://learn.mit.edu/courses/course-v1:MITxT+CTL.SC1x), [MIT SCM programme](https://micromasters.mit.edu/scm/) | C55 and C56 open; C57 free materials with paid graded work; C56 is a 2016 edition; no open digital-transformation equivalent verified |
| Considered, not added | [UNESCO teacher framework](https://www.unesco.org/en/articles/ai-competency-framework-teachers), [Generative AI for Educators](https://grow.google/ai-for-educators/), [Learning How to Learn](https://www.coursera.org/learn/learning-how-to-learn), [DigComp 2.2](https://publications.jrc.ec.europa.eu/repository/handle/JRC128415), [PMI KICKOFF](https://www.pmi.org/kickoff) (403) | School or policy focus, learner rather than facilitator focus, or free access unconfirmed |

## AI security addition, 2026-10-27

**Method.** A learner suggested AI security after following TryHackMe's AI Security path. One research pass checked candidate resources on primary provider pages; key claims (PortSwigger access, Microsoft Learn contents, NIST status, the OWASP 2026 edition, BSI publications, TryHackMe structure) were then re-fetched. Nothing was enrolled in, completed, or run, and no lab was attempted. The same ranking applies: authority, checkable reception, and genuinely free material and practice.

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Add D5 AI security with PortSwigger as the hands-on core | [Web LLM attacks learning path](https://portswigger.net/web-security/learning-paths/llm-attacks), [Web Security Academy](https://portswigger.net/web-security) ("100% free") | Seven free labs covering excessive agency, LLM API flaws, indirect injection, and agent exfiltration; no ratings published |
| Include TryHackMe as the paid alternative, not the core | [AI Security path](https://tryhackme.com/path/outline/aisecurity), individual room pages, [pricing](https://tryhackme.com/pricing) | 5 modules, 25 rooms, 19 h 15 min; core prompt-injection and RAG rooms marked Premium/Max on 2026-10-27; introductory rooms open |
| Use Microsoft Learn for concepts and red-teaming method | [AI security fundamentals](https://learn.microsoft.com/en-us/training/paths/ai-security-fundamentals/), [AI Red Teaming 101](https://learn.microsoft.com/en-us/security/ai-red-team/training), [Playground Labs](https://github.com/microsoft/AI-Red-Teaming-Playground-Labs), [PyRIT](https://github.com/microsoft/PyRIT) | Free modules and videos; the labs and PyRIT need a model API key, so they are optional runtime extras |
| Add a browser game as a first attack exercise | [Gandalf](https://gandalf.lakera.ai/) (redirects to play.lakera.ai) | Free; page content and login requirements not rendered; reception figures only in press reports |
| Cover attacks on predictive models and attacker behaviour | [NIST AI 100-2 E2025](https://csrc.nist.gov/pubs/ai/100/2/e2025/final), [MITRE ATLAS](https://atlas.mitre.org/) | NIST final March 2025 with errata note, no newer draft; ATLAS site needs JavaScript and was not rendered |
| Update R09 for the 2026 OWASP edition | [OWASP LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/), [landing page](https://genai.owasp.org/llm-top-10/) | 2026 v1.0 published August 2026; the landing page still lists 2025 numbering, so paths cite risks by name |
| Add a German official source | [BSI AI page](https://www.bsi.bund.de/DE/Themen/Unternehmen-und-Organisationen/Informationen-und-Empfehlungen/Kuenstliche-Intelligenz/KI.html) | Basisschutz gegen Indirect Prompt Injection (2026) plus LLM hardening guidance; no German AI-security course found, KI-Campus included |

**Not catalogued.** DeepLearning.AI *Red Teaming LLM Applications* (free only during a limited-time beta; quiz and certificate need PRO), Dreadnode Crucible (former address redirects to a login without visible Crucible content), HackAPrompt / Learn Prompting (free tier not confirmed on the primary page), and university ML-security courses without public recordings. Recheck at the next agent/tool review.

## Verification limits

The reviews inspected public provider/university pages, author repositories through the connected GitHub reader, and search-indexed official pages where direct retrieval failed. It did **not** enroll in courses, test certificates, run course labs, benchmark tools, or inspect Festo systems/entitlements. A live page is not proof that its content is current or its labs still execute. The catalogue's hours are editorial planning estimates.

| Evidence limitation | Affected entries | How it is represented |
|---|---|---|
| Direct requests returned 403 on 2026-10-24; the course pages were directly readable on 2026-10-26 | DeepLearning.AI C10/C12/C16 and its Pro announcement | Durations, update dates, and PRO boundaries from the course pages; free access advertised as limited-time, so recheck each review |
| Class Central returns 403 to scripted requests | Rating evidence for C01, C02, C03 | Read in a rendered browser on 2026-10-26; figures are Class Central's aggregated reviews |
| JavaScript-only pages read in a rendered browser | C13 syllabus tab, C43 Claude Academy, C44 Kaggle guide, C45 lecture links | Content observed directly; certificates and badges not tested |
| `www.autodesk.com` returned 403 to scripted requests; the page loaded in a rendered browser | C31 | 2 h 15 min course; modules require sign-in; certificate at ≥75 % on the final test |
| Course content behind a free login | C34, C35 (KI-Campus) | Public course pages and certificate rules inspected; course content not opened |
| KI-Campus course page shows "access denied" even in a rendered browser; press release and GitHub repository readable | C51 | Linked to the public exercise repository (CC BY-SA 4.0); the course itself is not claimed to be available |
| Stanford Online lists the course as paid after a free trial | C50 | Linked to the author-hosted book; open via the book, labs, and lecture playlist |
| edX program pages render no text without JavaScript; edX support returned 403 | C46 | Terms taken from Harvard's own catalogue pages; exact audit duration unverified |
| Former URL redirects (301) to a university programme | C32 Altium Education | Free for verified students; non-student access not stated; optional |
| Former tutorial URL redirects (301) to the product overview | R10 Flux | Optional vendor example; paid plan needed for AI after trial |
| App and code licences not stated; Android listing returned 404 | R15 DTU TopOpt | Described as free university teaching tools with dated builds; no licence claim |
| Yearly edition URL | C36 | 2026 edition open until the end of 2026; replace the URL when the 2027 edition appears |
| Course run dates rather than a self-paced listing | C57 MITx SC1x | Instructor-paced; recheck the enrolment window before recommending |
| Public site with ongoing term | C13 Stanford CS146S | Fall 2026 in-progress course site; no claim all lectures or tools are public |
| NVIDIA DLI course page under maintenance; Jetson certification URL redirects to a generic training page | C29 (former hub), NVIDIA DLI Jetson Nano course | C29 repointed to Hello AI World; no claim about the DLI course or its certificate |
| Redirect/JavaScript-only destination | AWS Skill Builder | Canonical hub identified; contents and account access unverified |
| Direct request returned 403 | PMI KICKOFF, UNESCO framework PDFs | Not catalogued |
| Timeout/unavailable URL | Tübingen 2020 and old Oncampus page | Manual follow-up needed; no claim of permanent deletion |

Course listings in the original audit were inspected for identity and broad topic, not reviewed lesson by lesson. Forty of the 42 original Coursera pages returned recognizable course/specialization listings; two returned not-found results. None of those observations establishes full free access.

## Evidence for the new direction

| Decision | Primary evidence inspected | Editorial implication |
|---|---|---|
| Teach using AI separately from developing it | [Microsoft's work-oriented learning path](https://learn.microsoft.com/en-us/training/paths/draft-analyze-present-microsoft-365-copilot/), [Autodesk generative design course](https://www.autodesk.com/learn/ondemand/course/generative-design), [Flux PCB design assistant](https://docs.flux.ai/reference/copilot) | Different prerequisites and outputs; no Python gate for office/CAD/ECAD paths |
| Add embedded/edge routes with deployment checks | [Edge Impulse courseware](https://github.com/edgeimpulse/courseware-embedded-machine-learning), [LiteRT for Microcontrollers](https://github.com/tensorflow/tflite-micro), [NVIDIA tutorials](https://developer.nvidia.com/embedded/learn/tutorials) | Include signal/data preparation, resource budgets, target measurements, and failure handling |
| Teach agents through implementation and evaluation | [Hugging Face Agents](https://huggingface.co/learn/agents-course/en/unit0/introduction), [MCP](https://huggingface.co/learn/mcp-course/en/unit0/introduction), [Evaluating AI Agents](https://www.deeplearning.ai/courses/evaluating-ai-agents) | Start small; inspect traces and evaluate on held-out cases |
| Make loops concrete | [Anthropic's loop guide](https://claude.com/resources/articles/getting-started-with-loops), [verification loops](https://claude.com/resources/articles/building-verification-loops-in-claude-code-with-skills), [Codex Goals](https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex) | Separate triggers, completion checks, retries, budgets, and handover |
| Separate free videos from paid practice | [DeepLearning.AI Pro announcement](https://www.deeplearning.ai/the-batch/introducing-deeplearning-ai-pro) | Free video access does not establish free labs or certificates |
| Prefer transferable evaluation concepts | [OpenAI evaluation guidance](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Page announces platform retirement: read-only on 2026-10-31 and shutdown on 2026-11-30. Since 2026-10-26 the paths use the vendor-neutral R17 instead. |
| Label historical and self-study material accurately | [fast.ai](https://course.fast.ai/), [MLOps Zoomcamp](https://github.com/DataTalksClub/mlops-zoomcamp) | Mark the 2022 teaching edition and the absence of a planned 2026 MLOps live cohort. The FSDL LLM Bootcamp (2023 recordings) was retired on 2026-10-26 |

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
| 08 | [Math for AI](https://www.coursera.org/specializations/mathematics-machine-learning) | Listing | Retain as optional [C25](CATALOG.md#c25). 2026-10-26: FAQ states it cannot be taken for free; open route [C37](CATALOG.md#c37), then R08. |
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
| 17 | [Bayesian statistics](https://www.coursera.org/learn/bayesian-statistics) | Listing | Retain as optional [C26](CATALOG.md#c26); open default [C52](CATALOG.md#c52) since 2026-10-26. |
| 18 | [Bayesian Statistics: Techniques and Models](https://www.coursera.org/learn/mcmc-bayesian-statistics) | Listing | Retain as optional subject-depth elective; full free access not confirmed. |
| 19 | [Practical Time Series Analysis](https://www.coursera.org/learn/practical-time-series-analysis) | Listing | Retain optional time-series course; [R07](CATALOG.md#r07) is an open book alternative, now led by its free Python edition with the R original linked. |
| 20 | [A Crash Course in Causality: Inferring Causal Effects from Observational Data](https://www.coursera.org/learn/crash-course-in-causality) | Listing | Retain as optional [C27](CATALOG.md#c27); open default [C53](CATALOG.md#c53) since 2026-10-26. |

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
| 35 | [Project Management Principles and Practices](https://www.coursera.org/specializations/project-management) | Listing | Retain as optional [C22](CATALOG.md#c22). 2026-10-26: FAQ states it cannot be taken for free; open alternative [C56](CATALOG.md#c56). |
| 36 | [Supply Chain Management](https://www.coursera.org/specializations/supply-chain-management) | Listing | Retain as optional [C21](CATALOG.md#c21). 2026-10-26: FAQ states it cannot be taken for free; free-track alternative [C57](CATALOG.md#c57). |
| 37 | [Effective Communication: Writing, Design, and Presentation](https://www.coursera.org/specializations/effective-business-communication) | Listing | Retain as optional [C23](CATALOG.md#c23). 2026-10-26: FAQ states it cannot be taken for free; open alternative [C55](CATALOG.md#c55). |
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
