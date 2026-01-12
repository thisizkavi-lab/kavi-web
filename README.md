# Kavi

This is my personal portfolio website.

![Website Demo](assets/demo.png)

## Tech Stack
- React + Vite
- Tailwind CSS
- Markdown Content Management

---

# 🛠️ Maintenance Manual (For Kavi)

Since this repo is private, here is your personal guide to updating the site.

## 1. How to Add a New Blog Post

### Step 1: Create the File
Go to `content/blogs/` and create a new file ending in `.md`.
*Example:* `content/blogs/my-new-post.md`

### Step 2: Add Metadata (Frontmatter)
At the very top of the file, you **must** include this block:

```yaml
---
id: "my-new-post"
title: "The Title of My Post"
date: "2024-07-15"
excerpt: "A short sentence describing what this is about."
---
```

### Step 3: Write Content (Visual Appeal Guide)
Here is how to make it look great:

**Headers:**
Use `#` for big titles, `##` for sections.
```markdown
# Big Title
## Smaller Section
```

**Images:**
1. Put your image file in `public/images/` (e.g., `photo.jpg`).
2. Link it like this:
```markdown
![Discription of image](/images/photo.jpg)
```

**Math Equations:**
Use `$` signs for LaTeX math.
```latex
The energy is $E=mc^2$.
Or a block:
$$
\sum_{i=0}^n i^2 = \frac{(n^2+n)(2n+1)}{6}
$$
```

**Code Blocks:**
Use three backticks and the language name.
 \`\`\`python
 print("Hello World")
 \`\`\`

### Step 4: Publish
Once you save the file, you need to push it to GitHub for the changes to go live.
Run these 3 commands in your terminal:

```bash
git add .
git commit -m "added new blog post"
git push
```

*That's it! GitHub/Vercel will detect the change and update your site automatically.*

---

## 2. How to Add a Project

### Step 1: Create the File
Go to `content/projects/` and create a new file (e.g., `robot-arm.md`).

### Step 2: Metadata
Projects need slightly different data:

```yaml
---
id: "robot-arm"
title: "Robotic Arm Control"
category: "Robotics / C++"
description: "Controlling a 6-DOF arm."
stack: "C++, ROS, Python"
metrics:
  - label: "Latency"
    value: 12
  - label: "DoF"
    value: 6
---
```

### Step 3: Write & Publish
Write the description below the metadata, then run the same git commands as above to publish.
