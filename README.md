# Industrial AI Learning Paths

**Choose a goal. Check your starting point. Build something you can explain and verify.**

A curated learning guide for colleagues at Festo, engineering teams, and university learners. Start with **AI at work** to improve daily engineering and knowledge work, or **Developing AI** to build intelligence into products and industrial systems. This is a personal collection for sharing, not an official Festo curriculum or an approved-tool list.

**Curriculum review: 26 October 2026.** Resources are chosen for authority (universities, public programmes such as KI-Campus, the primary tool vendor), checkable positive reception, and genuinely free access; every path has an open route. Paid labs, certificates, compute, and uncertain access are labelled separately. See the [course catalogue](docs/CATALOG.md) and [research and original-link audit](docs/RESEARCH.md).

## Start here

1. Open the **[interactive Industrial AI field guide](https://jrs1986.github.io/OnlineCourses/)** and choose **Find my path**. The assessment runs in your browser—no Python, installation, or account required.
2. Browse the learning paths and course library, or follow your recommended sequence, including prerequisite gaps.
3. Complete one [practice brief](docs/PRACTICE.md) and share a [learning record](templates/LEARNING_RECORD.md) with a peer. Mark courses and study blocks complete, then use **Continue learning** to open the next unfinished step. Earn completion badges and attach certificates or screenshots to your courses and paths. Download a **full backup** to move progress, badges, and certificate files to another browser or computer, or print your learning plan to PDF whenever you want.

Assessment answers, learning plans, completion marks, and resume links are saved locally in this browser. They are never uploaded by the guide. You can export, restore, or clear them under **My progress**; there is no automatic sync between browsers or devices. Attached PDFs and images stay in browser file storage. **My progress → Download full backup** includes all learning data and attachments in one `.iai-backup` file; use **Restore full backup** on the destination device and review the replacement preview. The smaller progress-only JSON option excludes files. Backups are not encrypted; keep them private. The recommendation is a transparent study suggestion, not a validated exam or a personnel assessment.

The **[written interview](docs/ASSESSMENT.md)** and optional offline questionnaire remain available:

```sh
python3 scripts/assess.py
```

The optional CLI needs Python 3.9+ and no packages or network. See [website maintenance and publishing](docs/WEBSITE.md) for the static build, tests, accessibility controls, and GitHub Pages workflow.

## A brain analogy for Industrial AI

**Embedded AI is the reflex; Edge AI provides local perception and coordination; Agentic AI plans and uses tools.** These are complementary roles. Embedded and edge describe deployment constraints, while agentic describes behavior: an agent can run at the edge. The analogy is a teaching aid, not a claim about biological equivalence or industrial safety.

Read the [Industrial AI map](docs/INDUSTRIAL_AI.md) for examples, boundaries, and how the roles work together.

## AI at work — use AI in your profession

You do not need to become an ML engineer to use these paths. Existing domain knowledge matters: a designer validates a design, an electronics engineer checks a circuit, and a developer reviews code.

| Your goal | Start with | Planned effort* | Evidence of learning |
|---|---|---:|---|
| Understand AI and choose a use case | [P0 — AI orientation](docs/LEARNING_PATHS.md#p0-ai-orientation) | 4 h | A use-case brief and success criteria |
| Use copilots for knowledge work | [W1 — Knowledge work and copilots](docs/LEARNING_PATHS.md#w1-knowledge-work-and-copilots) | 6 h | A source-checked brief and reusable prompt |
| Use AI in mechanical/CAD design | [W2 — CAD and mechanical design](docs/LEARNING_PATHS.md#w2-cad-and-mechanical-design) | 8 h | A constraint sheet and reviewed design alternatives |
| Use AI in electronics engineering | [W3 — Electronics and PCB design](docs/LEARNING_PATHS.md#w3-electronics-and-pcb-design) | 8 h | A checked component comparison and design review |
| Use coding agents in software work | [W4 — Agentic coding](docs/LEARNING_PATHS.md#w4-agentic-coding) | 16 h | A reviewed change, tests, and iteration log |

## Developing AI — build industrial capabilities

| Your goal | Start with | Planned effort* | Evidence of learning |
|---|---|---:|---|
| Learn to write and test Python | [P1 — Programming foundations](docs/LEARNING_PATHS.md#p1-programming-foundations) | 24 h | A tested sensor-data utility |
| Build the **reflex** on a constrained device | [D1 — Embedded AI](docs/LEARNING_PATHS.md#d1-embedded-ai) | 24 h | A small model plus memory/latency evidence |
| Build **local perception and coordination** | [D2 — Edge AI](docs/LEARNING_PATHS.md#d2-edge-ai) | 24 h | A local inference pipeline and outage/restart checks |
| Build **planning and tool use** | [D3 — Agentic AI and loops](docs/LEARNING_PATHS.md#d3-agentic-ai-and-loops) | 24 h | An evaluated assistant with bounded tool access |
| Build a trustworthy data/ML baseline | [D4 — Industrial data and ML](docs/LEARNING_PATHS.md#d4-industrial-data-and-ml) | 24 h | A leakage-aware baseline and error analysis |
| Teach the map and a practical example | [T1 — Teaching and facilitation](docs/LEARNING_PATHS.md#t1-teaching-and-facilitation) | 6 h preparation | A worked example, exercise, and rubric |

*Repository planning estimates for selected material and practice, not full-course durations or completion promises. Prerequisite study is additional. Beginners may need substantially longer; use the milestone checks to decide when to move on.*

## What makes this collection useful

- **A starting point for each learner.** Knowledge checks and goals determine prerequisites, suggested skips, and the first study block.
- **Engineering practice.** Examples use synthetic sensor records, fictional maintenance manuals, and small software changes that can be reviewed in a team.
- **Evidence of progress.** Each path ends with a tangible output and a completion check, including a comparison against a simpler baseline.
- **A teaching format.** Reuse the 90-minute workshop or three-session lecture sequence, with an option that needs no model subscription.
- **Traceable curation.** Course pages, access limitations, review dates, and the disposition of all 53 original links are documented.

Use the broader lists to explore, and this repository to decide what to do next:

| Collection | How it complements this guide |
|---|---|
| [Awesome Courses](https://github.com/prakhar1989/awesome-courses) | University CS courses with lectures, assignments, and theory |
| [Awesome AI Tools](https://github.com/mahseema/awesome-ai-tools) | Discovery of AI products and tool categories |
| [Awesome Artificial Intelligence](https://github.com/owainlewis/awesome-artificial-intelligence) | Technical AI resources, including production systems and coding agents |

The last collection already emphasizes practical AI engineering. Our intended distinction is the learner assessment, industrial practice briefs, limited study blocks, and facilitator material. See the [comparison and curation strategy](docs/RESOURCES.md) for the reasoning.

## Explore and share

| Resource | Use it for |
|---|---|
| [Industrial AI map](docs/INDUSTRIAL_AI.md) | Brain analogy, using versus building, and combined architectures |
| [Course catalogue](docs/CATALOG.md) | Courses, prerequisites, access, and selected study scope |
| [Initial assessment](docs/ASSESSMENT.md) | Interview, knowledge checks, and routing rules |
| [Learning paths](docs/LEARNING_PATHS.md) | Ordered study blocks and exit criteria |
| [Practice briefs](docs/PRACTICE.md) | Agentic coding, loops, retrieval, and engineering data |
| [Teaching kit](docs/TEACHING.md) | Workshops, lecture sessions, and marking rubric |
| [Reference collections](docs/RESOURCES.md) | The three requested lists, cloud hubs, and positioning |
| [Original courses and research](docs/RESEARCH.md) | Existing subject coverage, link repairs, and evidence limitations |
| [Contributing](CONTRIBUTING.md) | Suggest a resource, report access changes, or share a learning result |

For a first team pilot, take the assessment individually, run the 90-minute workshop in pairs, then choose one path per person. Discuss the resulting work after two weeks. English is the default for shared technical material; discussions and learner records can be in German. A German introduction is linked in the catalogue.

Use public or synthetic examples and tools permitted for your actual work environment. Internal licences, policies, and course entitlements have not been checked here. Keep company-specific project details in your team's approved space.
