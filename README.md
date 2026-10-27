# Kartik Mangal: Portfolio

Personal portfolio and resume, built with [Astro](https://astro.build) and Three.js. One set of data files drives both the website and the PDF resume.

## Run locally

```bash
npm install
npm run dev        # http://localhost:4321
```

## Where things live

| What | File |
|---|---|
| Name, contact, bio, summary, education | `src/data/profile.ts` |
| Jobs (newest first) | `src/data/experience.ts` |
| Skills | `src/data/skills.ts` |
| "2026 quest log" (main quest, side quests, skill unlocks) | `src/data/quests.ts` (`show: true` to publish a quest) |
| Projects (one Markdown file each) | `src/content/projects/*.md` |
| Project screenshots | `src/assets/projects/<slug>/` |
| 3D hero scene | `src/scripts/hero-scene.ts` |

### Add or publish a project
1. Copy any file in `src/content/projects/` and edit the frontmatter. `category` is `professional`, `personal` or `learning`. For employer work, set `org` to match `experience.ts` so the bullets show under that job on the resume.
2. Draft projects (`draft: true`) are hidden everywhere. Set `draft: false` to publish. To preview drafts locally, run `SHOW_DRAFTS=1 npm run dev`.
3. `featured: true` together with a `cover` image puts the project in the large top row.

Drafts waiting for review: `watermark`, `ai-design-pipeline`, `fluxus`, `paisa-lab`.

## Resume PDF

```bash
npm run pdf                # -> public/Kartik_Mangal_Resume_2026.pdf (published, no phone number)
npm run pdf -- --private   # -> research/Kartik_Mangal_Resume_2026_private.pdf (local only, includes phone)
```

The script prints `/resume` with headless Edge or Chrome. Re-run it after editing any data file, then commit the public PDF.

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `main`. The base path is worked out from the repo name: `kartik0330.github.io` gives `/`, and any other repo name gives `/<repo>`. In the repo, go to Settings → Pages → Source and choose **GitHub Actions**.

`research/` (the 2026 inventory and the private resume) is git-ignored and never published.
