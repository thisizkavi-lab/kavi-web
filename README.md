# kavi-web

Personal site of Kabindra Sony (Kavi). Plain Jekyll, built by GitHub Pages: no theme, no JavaScript, one stylesheet.

```
index.md                 ← home / about text (edit this)
_config.yml              ← name, links, sections
blog/_posts/             ← published blog posts
thoughts/_posts/         ← published thoughts
*/_drafts/               ← unpublished drafts (preview only)
assets/css/style.css     ← the entire design
assets/img/              ← photo, favicon, post images
_layouts/                ← page templates (rarely touched)
```

## Write a post

1. Create `blog/_posts/2026-10-03-short-title.md` (or `thoughts/_posts/...`):

   ```markdown
   ---
   title: Why structure isn't enough
   math: true        # optional — only if the post has equations
   ---

   Your text in Markdown…
   ```

2. `git add . && git commit -m "New post" && git push`. It goes live in about a minute.

- A section shows up in the menu only once it has its first post.
- The file name sets the date and URL: `/blog/short-title/`.
- Inline math is `$$x$$`; display math is `$$ … $$` on its own lines.
- Not ready yet? Put the file in `blog/_drafts/` (no date in the name needed).

## Preview locally

```sh
export PATH="$HOME/.gem/ruby/2.6.0/bin:$PATH"   # once per terminal
jekyll serve --drafts --livereload
```

Open <http://localhost:4000/kavi-web/>. Drop `--drafts` to see exactly what will be published.

## Add lectures later

1. In `_config.yml`, uncomment the `lectures` section.
2. Create `lectures/index.html`:

   ```
   ---
   layout: section
   section: lectures
   title: Lectures
   ---
   ```

3. Add posts to `lectures/_posts/`. To embed a recording, paste the YouTube iframe into the post.

## Deploy

Automatic. Every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which builds the site and publishes it to the `gh-pages` branch (what GitHub Pages serves). Check progress under the repo's **Actions** tab.

The old al-folio site is preserved in history at commit `8e165fb` (`git checkout 8e165fb`).

If you move to a custom domain, add a `CNAME` file containing the domain and set `baseurl: ""` in `_config.yml`.
