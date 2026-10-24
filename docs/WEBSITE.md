# Website and GitHub Pages

The [Industrial AI field guide](https://jrs1986.github.io/OnlineCourses/) runs in a modern browser. Learners need no Python, installation, account, API key, or subscription to use the guide. Individual learning providers can have their own access requirements.

## What learners can do

- Explore the three Industrial AI roles in an interactive, zoomable diagram.
- Browse 11 learning paths and search/filter 45 courses and references.
- Choose a goal, available time, practice access, and discussion language; answer relevant knowledge checks.
- Receive an explained learning sequence with prerequisites, resource suggestions, and exit checks.
- Use **Continue learning** on the home, plan, progress, or path page to jump to the next unfinished study block.
- Resume an assessment after closing the tab, mark resources and study blocks complete, and manage them under **My progress**.
- Earn resource badges, milestones at 1/5/10 completed resources, and path badges after confirming the exit check.
- Attach certificates or completion evidence as PDFs, PNGs, JPEGs, or WebP images; preview images and download or remove files.
- Move assessment answers, the saved plan, progress, badges, and all attachments between devices with a full `.iai-backup` export and reviewed restore.
- Export or restore a smaller progress-only JSON backup, or clear this site’s local learning data.
- Download a Markdown plan or use the browser's Print / Save PDF option.
- Use the teaching kit, practice briefs, and learning record directly in the browser.

Motion follows the device's reduced-motion preference. The **Motion on/off** button provides an additional session-level override. Diagram zoom also works with buttons and a keyboard. The discussion-language choice affects the learning plan; it does not translate the interface or provider material.

## Privacy and persistence

The assessment runs in the browser. Answers, the current question, study preferences, the most recent completed plan, resource completion, study-block completion, path exit-check confirmations, and resume links are saved automatically in local storage. Opening the site without a destination returns to the last page; explicit shared links still open their requested destination. A path-specific assessment link resumes an existing draft for that goal. Retaking an assessment keeps course and study-block progress, and the previous plan remains available until a new plan is completed.

**My progress** provides a full backup export with attachments, a smaller progress-only JSON option, restore previews with confirmation, and separate progress/file clearing controls. Progress JSON backups contain the learner's assessment answers and badge eligibility, but not attachment files. A restore replaces this browser's learning data. Clearing assessment and progress resets this guide's learning data, leaving attachments and other sites' data alone. A completed-restore marker may remain to prevent replaying an interrupted recovery. Attachments have separate removal controls. Course marks represent the material the learner intended to study; path blocks and exit checks remain separate.

Local data belongs to this browser profile and device. Other people using that profile can see it. Private browsing, clearing site data, browser policies, or a device change can remove or separate saved progress; backups can be transferred manually. There is no account or automatic cloud sync. If storage is blocked or full, a persistent notice explains that changes are only available for the current visit and can be exported.

The site contains no analytics, cookies, external font calls, account system, or assessment-upload endpoint. GitHub Pages still handles ordinary hosting requests; opening an external resource takes the learner to that provider.

Stored data and imported backups are versioned and validated. Unknown resource IDs and outdated study-block marks are discarded. If the assessment questions change, old drafts and plan snapshots are reset while resource and unchanged block completions are retained. Saved plans are recomputed from the answer snapshot, rather than trusting stored scores. Unreadable or unsupported saved records are left untouched; use the clear control to start fresh. Tabs on the same site synchronize through browser storage events.

This is a formative learning aid, not an examination or an employee assessment. Correct answers are included in the static site data so feedback can work without a server. The result is not a competency certificate.

## Continue learning

On **My progress**, the home page, and the saved plan, **Continue learning** follows the recommended sequence in order: prerequisite paths, individual prerequisite courses, any practice check, and then the destination path. Within a path it opens and highlights the first unchecked study block, including an earlier gap if later blocks were completed out of order. Completing or undoing a block updates the target immediately. Direct step links work after a reload.

A path page's button stays within that path. Without a saved plan, the general button uses the most recently visited path, then a started path or the draft assessment's chosen goal. With no selected path it invites the learner to choose one. When all study blocks are checked off, it offers the path's exit check rather than restarting. Confirming that check finishes the path and earns its badge; this remains a personal learning record rather than a certification. In a saved plan, prerequisite exit checks are included before continuing to the next course or path.

Course marks do not automatically complete a path's exercises. A stand-alone prerequisite course can be marked complete on its resource page. If the plan asks for a Python practice check, the linked B1 brief has a separate completion control that saves locally and can be undone. Old progress backups remain compatible; missing new fields start empty.

## Badges and completion evidence

Resource badges and the 1/5/10-resource milestones follow current completion marks. A path badge requires every study block plus an explicit **Confirm exit check & finish path** action. Undoing a required block or reopening a path removes its badge; changed curriculum or exit criteria also invalidate stale path confirmations. Restoring a progress backup recalculates badges. Loading a page or synchronizing another tab does not trigger a celebration.

Completion celebrations last a few seconds, do not steal focus, and can be dismissed. Confetti and entrance animation follow both the device's reduced-motion preference and the site's motion control; with motion disabled, a static completion message remains.

The evidence section on each course, path, and **My progress** stores attachments in a namespaced **IndexedDB** database on this browser and device. The accepted formats are PDF, PNG, JPEG, and WebP, detected from their signatures. Limits are 10 MB per file, 50 files, and 100 MB total; the browser may impose a smaller available quota. Files are not sent to a server, analysed, or used to verify an achievement. Attaching a file does not automatically complete anything.

Images can be previewed. All files can be downloaded in their original bytes or removed, with a separate control for removing all attachments. PDFs are downloaded rather than embedded in the page. Keep a backup or the original files: **progress-only JSON exports and restores exclude attachments**, and an imported progress backup leaves existing files untouched. Use a full backup when moving devices, or download attachments individually. Clearing browser site data can erase both progress and files; the in-app progress reset keeps files and the attachment-removal controls keep progress.

If browser file storage is blocked or full, the attachment area reports the failure and never claims that a file was saved. Ordinary course and assessment progress continues to work independently. The file list refreshes across tabs where the browser supports BroadcastChannel.

## Full backups and moving devices

1. Open **My progress → Download full backup** on the source device.
2. Transfer the resulting `industrial-ai-full-YYYY-MM-DD.iai-backup` file to the destination device.
3. Open this guide there, choose **My progress → Restore full backup**, and select the file.
4. Review the counts, export date, included certificate filenames, and replacement notice. Choose **Restore everything from this backup** to apply it, or **Cancel** to leave the current data untouched.

A full backup contains assessment answers and preferences, the saved learning plan, resume links, course and study-block completion, path exit-check confirmations, earned badge IDs, and original attachment bytes with their names, dates, and course/path associations. Badges are recalculated from validated progress on restore; a claimed badge ID cannot grant an achievement. As with older progress backups, changed questions or curriculum can reset stale answers, blocks, and path confirmations.

Restoring replaces the destination's learning data and **all** attachments; it does not merge. Download the destination's own full backup first if you want to keep that data. Validation and the preview do not write anything. Corrupt, truncated, unsupported, oversized, or unrelated files are rejected before restoration. The same 50-file, 10 MB-per-file, 100 MB-total limits apply, plus up to 1 MB of metadata. Older JSON backups still work through **Progress-only JSON backup** and leave files untouched.

The versioned `.iai-backup` container keeps raw file bytes without base64 expansion. It includes a bounded JSON manifest and SHA-256 checksums for every attachment. This detects damaged files; it is not a signature or credential verification. It is not encrypted: the file contains assessment answers and certificate documents, so keep it private. Export and import run entirely in the browser with no account or server transfer.

Attachment replacement and a progress-recovery journal are written in one IndexedDB transaction. A failed transaction preserves the previous attachments and progress. Once committed, the progress snapshot is copied to local storage; if the tab closes in between, the next visit finishes the restore. A persisted restore ID prevents a leftover journal from overwriting newer work. If progress storage is blocked, the staged snapshot remains in IndexedDB; enable storage and reload to finish. Browser data can still be cleared or evicted, so keep the downloaded backup separately.

## Maintain the content

The website is generated from the same sources as the repository guide:

| Content | Maintained source |
|---|---|
| Course and reading details | [Course catalogue](CATALOG.md) |
| Path sequences, hours, and exit checks | [Learning paths](LEARNING_PATHS.md) |
| Questions, path metadata, and prerequisite rules | [Assessment script](../scripts/assess.py) |
| Browser recommendation rules | [Browser assessment](../web/assessment.js) |
| Guides, practice briefs, and teaching material | Markdown files in this directory |
| Badges and path-completion rules | [Achievements](../web/achievements.js) |
| Certificate and screenshot storage | [Evidence storage](../web/evidence.js) |
| Full backup format and recovery | [Full backup](../web/backup.js) |
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

The build script recreates `_site/`, which is generated output and ignored by Git. Published modules, styles, and curriculum data use filenames containing the build version so returning browsers do not mix cached assets from different releases. Hash routes and relative asset URLs support repository subpaths and direct links such as `https://jrs1986.github.io/OnlineCourses/#paths/D3` without server rewrites.

## Publish updates

The [Pages workflow](../.github/workflows/pages.yml) tests pull requests and builds/deploys changes pushed to `master`. GitHub Pages must use **GitHub Actions** as its publishing source under the repository's **Settings → Pages**. The workflow can also be run manually on `master` from Actions.

The deployment contains only the generated static site. Source scripts and tests are available in the public repository but are not copied into the Pages artifact. Deployment uses the workflow's scoped GitHub token; no custom secrets are required.

If a release fails, inspect the **Publish learning guide** workflow. A failed build never reaches the deployment job. Revert the relevant source change and push to `master` to deploy the previous content again.

Implementation references: [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages) and [publishing-source configuration](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).
