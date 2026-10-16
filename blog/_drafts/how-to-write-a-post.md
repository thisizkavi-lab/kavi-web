---
title: How to write a post on this site
date: 2026-10-03
math: true
---

This is a draft. It lives in `blog/_drafts/`, so it only appears when you preview with `--drafts`, and it is never published. Use it as a cheat-sheet.

## Publishing

1. Create a file in `blog/_posts/` (or `thoughts/_posts/`) named `YYYY-MM-DD-short-title.md`.
2. Start it with front matter:

   ```yaml
   ---
   title: Why structure isn't enough
   ---
   ```

3. Write in Markdown. Commit and push. GitHub builds the site in about a minute.

## Math

Add `math: true` to the front matter. Inline math uses double dollars, like $$E = k_B T \ln Z$$, and display math goes on its own lines:

$$
p(x) = \frac{1}{Z} \exp\!\left(-\frac{U(x)}{k_B T}\right)
$$

## Code

```python
import numpy as np

def rmsd(a, b):
    """Root-mean-square deviation between two conformations."""
    return np.sqrt(((a - b) ** 2).sum(axis=1).mean())
```

## Footnotes and quotes

Proteins are not static objects.[^1]

> Everything that living things do can be understood in terms of the jigglings and wigglings of atoms.
>
> — Richard Feynman

## Images

Put images in `assets/img/` and reference them as {% raw %}`![Alt text]({{ '/assets/img/name.jpg' | relative_url }})`{% endraw %}.

[^1]: Footnotes collect at the bottom of the post automatically.
