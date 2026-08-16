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
- `assets/img/profile.svg` — profile illustration

## Deployment

The workflow in `.github/workflows/deploy.yml` builds the site once. On `main`, it publishes the same `_site` directory to GitHub Pages and (when configured) Vercel.

For the Vercel step, add these repository Actions secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

The existing Vercel project and team must be accessible to the account that creates those values. No secret belongs in the repository.

The original Vite site remains available on the `main` branch while this migration is reviewed.
