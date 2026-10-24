# Website and GitHub Pages

The [Industrial AI field guide](https://jrs1986.github.io/OnlineCourses/) runs in a modern browser. Learners need no Python, installation, account, API key, or subscription to use the guide. Individual learning providers can have their own access requirements.

## What learners can do

- Explore the three Industrial AI roles in an interactive, zoomable diagram.
- Browse 11 learning paths and search/filter 45 courses and references.
- Choose a goal, available time, practice access, and discussion language; answer relevant knowledge checks.
- Receive an explained learning sequence with prerequisites, resource suggestions, and exit checks.
- Use **Continue learning** on the home, plan, progress, or path page to jump to the next unfinished study block.
- Resume an assessment after closing the tab, mark resources and study blocks complete, and manage them under **My progress**.
- Export or restore a JSON progress backup, or clear this site’s local learning data.
- Download a Markdown plan or use the browser's Print / Save PDF option.
- Use the teaching kit, practice briefs, and learning record directly in the browser.

Motion follows the device's reduced-motion preference. The **Motion on/off** button provides an additional session-level override. Diagram zoom also works with buttons and a keyboard. The discussion-language choice affects the learning plan; it does not translate the interface or provider material.

## Privacy and persistence

The assessment runs in the browser. Answers, the current question, study preferences, the most recent completed plan, resource completion, study-block completion, and resume links are saved automatically in local storage. Opening the site without a destination returns to the last page; explicit shared links still open their requested destination. A path-specific assessment link resumes an existing draft for that goal. Retaking an assessment keeps course and study-block progress, and the previous plan remains available until a new plan is completed.

**My progress** provides a JSON backup export, a file-based restore preview with confirmation, and a clear-data control. Backups contain the learner's assessment answers. A restore replaces this browser's learning data. Clearing removes only this guide's namespaced record, leaving other sites' data alone. Course marks represent the material the learner intended to study; path blocks and exit checks remain separate.

Local data belongs to this browser profile and device. Other people using that profile can see it. Private browsing, clearing site data, browser policies, or a device change can remove or separate saved progress; backups can be transferred manually. There is no account or automatic cloud sync. If storage is blocked or full, a persistent notice explains that changes are only available for the current visit and can be exported.

The site contains no analytics, cookies, external font calls, account system, or assessment-upload endpoint. GitHub Pages still handles ordinary hosting requests; opening an external resource takes the learner to that provider.

Stored data and imported backups are versioned and validated. Unknown resource IDs and outdated study-block marks are discarded. If the assessment questions change, old drafts and plan snapshots are reset while resource and unchanged block completions are retained. Saved plans are recomputed from the answer snapshot, rather than trusting stored scores. Unreadable or unsupported saved records are left untouched; use the clear control to start fresh. Tabs on the same site synchronize through browser storage events.

This is a formative learning aid, not an examination or an employee assessment. Correct answers are included in the static site data so feedback can work without a server. The result is not a competency certificate.

## Continue learning

On **My progress**, the home page, and the saved plan, **Continue learning** follows the recommended sequence in order: prerequisite paths, individual prerequisite courses, any practice check, and then the destination path. Within a path it opens and highlights the first unchecked study block, including an earlier gap if later blocks were completed out of order. Completing or undoing a block updates the target immediately. Direct step links work after a reload.

A path page's button stays within that path. Without a saved plan, the general button uses the most recently visited path, then a started path or the draft assessment's chosen goal. With no selected path it invites the learner to choose one. When all study blocks are checked off, it offers the path's exit check rather than restarting or claiming certification.

Course marks do not automatically complete a path's exercises. A stand-alone prerequisite course can be marked complete on its resource page. If the plan asks for a Python practice check, the linked B1 brief has a separate completion control that saves locally and can be undone. Old progress backups remain compatible; missing new fields start empty.

## Maintain the content

The website is generated from the same sources as the repository guide:

| Content | Maintained source |
|---|---|
| Course and reading details | [Course catalogue](CATALOG.md) |
| Path sequences, hours, and exit checks | [Learning paths](LEARNING_PATHS.md) |
| Questions, path metadata, and prerequisite rules | [Assessment script](../scripts/assess.py) |
| Browser recommendation rules | [Browser assessment](../web/assessment.js) |
| Guides, practice briefs, and teaching material | Markdown files in this directory |
| Local saving, validation, and recovery | [Progress storage](../web/progress.js) |
| Visual design and browser interactions | Files in `web/` |

When changing assessment rules, update both implementations and the [interview guide](ASSESSMENT.md). Automated tests compare the browser and Python recommendations for every combination of topic scores and relevant-work evidence. Generated content and internal section links are checked as well.

## Preview and test locally

Maintainers need Python 3.9+ and Node.js 22+. There are no package dependencies to install. Learners do not need either runtime.

```sh
npm test
npm run preview
```

Open `http://127.0.0.1:4173/`. The preview serves the generated `_site/` folder; run `npm run build` after source changes. `npm test` builds it automatically. Opening `web/index.html` directly from disk will not work because the browser must fetch the generated curriculum data over HTTP.

The build script recreates `_site/`, which is generated output and ignored by Git. Hash routes and relative asset URLs support repository subpaths and direct links such as `https://jrs1986.github.io/OnlineCourses/#paths/D3` without server rewrites.

## Publish updates

The [Pages workflow](../.github/workflows/pages.yml) tests pull requests and builds/deploys changes pushed to `master`. GitHub Pages must use **GitHub Actions** as its publishing source under the repository's **Settings → Pages**. The workflow can also be run manually on `master` from Actions.

The deployment contains only the generated static site. Source scripts and tests are available in the public repository but are not copied into the Pages artifact. Deployment uses the workflow's scoped GitHub token; no custom secrets are required.

If a release fails, inspect the **Publish learning guide** workflow. A failed build never reaches the deployment job. Revert the relevant source change and push to `master` to deploy the previous content again.

Implementation references: [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [publishing-source configuration](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
