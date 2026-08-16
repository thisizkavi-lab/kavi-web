# Kabindra Sony — research portfolio

This site is a personal research portfolio and notebook for computational biophysics, protein conformational dynamics, molecular simulation, and machine learning.

It is built with [al-folio](https://github.com/alshedivat/al-folio), a Jekyll-based academic website theme.

## Local development

```bash
bundle install
bundle exec jekyll serve --livereload
```

Then open http://localhost:4000/kavi-web/.

## Content map

- `_pages/about.md` — homepage biography and research focus
- `_projects/` — project pages shown in the portfolio
- `_posts/` — dated research notes
- `_data/socials.yml` — public contact links
- `assets/img/profile.jpg` — profile photograph

## Deployment

The workflow in `.github/workflows/deploy.yml` builds equivalent outputs from the same source:

- GitHub Pages uses the `/kavi-web/` base path.
- Vercel uses root-relative links for its `/` domain.

On `main`, GitHub Pages is published automatically. The Vercel output is published when the repository has these Actions secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The repository's `vercel.json` intentionally disables Vercel's duplicate Git-triggered build; GitHub Actions owns the build and deploys the finished static output. The existing Vercel project and team must be accessible to the account that creates those values. No secret belongs in the repository.

The original Vite site remains available on the `main` branch while this migration is reviewed.
