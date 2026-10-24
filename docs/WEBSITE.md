# Website and GitHub Pages

The [Industrial AI field guide](https://jrs1986.github.io/OnlineCourses/) runs in a modern browser. Learners need no Python, installation, account, API key, or subscription to use the guide. Individual learning providers can have their own access requirements.

## What learners can do

- Explore the three Industrial AI roles in an interactive, zoomable diagram.
- Browse 11 learning paths and search/filter 45 courses and references.
- Choose a goal, available time, practice access, and discussion language; answer relevant knowledge checks.
- Receive an explained learning sequence with prerequisites, resource suggestions, and exit checks.
- Download a Markdown plan or use the browser's Print / Save PDF option.
- Use the teaching kit, practice briefs, and learning record directly in the browser.

Motion follows the device's reduced-motion preference. The **Motion on/off** button provides an additional session-level override. Diagram zoom also works with buttons and a keyboard. The discussion-language choice affects the learning plan; it does not translate the interface or provider material.

## Privacy and persistence

The assessment runs in the browser. Answers and the current plan remain in memory in that tab; reloading or closing the tab clears them. Download the plan to keep it. The site contains no analytics, cookies, local storage, external font calls, account system, or assessment-upload endpoint. GitHub Pages still handles ordinary hosting requests; opening an external resource takes the learner to that provider.

This is a formative learning aid, not an examination or an employee assessment. Correct answers are included in the static site data so feedback can work without a server. The result is not a competency certificate.

## Maintain the content

The website is generated from the same sources as the repository guide:

| Content | Maintained source |
|---|---|
| Course and reading details | [Course catalogue](CATALOG.md) |
| Path sequences, hours, and exit checks | [Learning paths](LEARNING_PATHS.md) |
| Questions, path metadata, and prerequisite rules | [Assessment script](../scripts/assess.py) |
| Browser recommendation rules | [Browser assessment](../web/assessment.js) |
| Guides, practice briefs, and teaching material | Markdown files in this directory |
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
