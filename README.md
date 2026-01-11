# KAVINDRA / SONY

> A cyber-minimalist portfolio and digital garden.
> **Live Demo**: [Comming Soon]

## 🧠 Philosophy
This is not just a portfolio; it is a digital extension of the mind.
- **No Database**: Content works on a "files-as-database" principle using Markdown.
- **No Backend**: Pure static generation via Vite.
- **Terminal First**: A functional command-line interface for navigation and secrets.

## ✨ Features

### 1. Markdown CMS
Content is managed via the file system.
- **Blogs**: `/content/blogs/*.md` (Supports LaTeX $E=mc^2$ & Code Highlighting)
- **Projects**: `/content/projects/*.md` (Custom metrics & rich links)

### 2. Interactive Terminal
The terminal isn't just a gimmick.
- `ls`, `cd`, `clear`: Standard navigation.
- `open blogs`, `open projects`: Switch views.
- `send <msg>`: Anonymous message transmission (simulated/webhook).
- **Easter Eggs**: Try `sudo`, `hack`, `42`, `joke`, `cat`...

### 3. Cyber-Aesthetics
- Pure CSS styling.
- Monochrome palette.
- Responsive design.

## 🛠️ Tech Stack
- **Framework**: React + Vite (TypeScript)
- **Styling**: TailwindCSS
- **Markdown**: `react-markdown`, `remark-math`, `rehype-katex`
- **Animations**: CSS Keyframes + Framer Motion concepts

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
```

## 📦 Deployment

This project is optimized for **Vercel** or **Netlify**.
1. Push to GitHub.
2. Import project in Vercel.
3. Build command: `npm run build`.
4. Output directory: `dist`.

## 📝 Adding Content

**To add a blog:**
Create `content/blogs/my-post.md`:
```markdown
---
id: "my-post"
title: "Title"
date: "2024-01-01"
excerpt: "Description..."
---
# Content
```

**To add a project:**
Create `content/projects/my-project.md`:
```markdown
---
id: "my-project"
title: "Project Name"
category: "ML / Web"
description: "Short desc"
stack: "Python, React"
metrics:
  - label: "Accuracy"
    value: 99.9
---
```
