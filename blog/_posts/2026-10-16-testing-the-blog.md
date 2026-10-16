---
title: "Testing the blog setup"
date: 2026-10-16
math: true
---

This is a placeholder post to test the layout, typography, math rendering, and code blocks while setting up the website.

## Equations

Inline math works with double dollar signs, such as the Boltzmann factor $$\exp(-U(x) / k_B T)$$, and display equations sit on their own lines:

$$
p(x) = \frac{1}{Z} \exp\!\left(-\frac{U(x)}{k_B T}\right)
$$

## Code blocks

```python
import numpy as np

def rmsd(a, b):
    """Root-mean-square deviation between two coordinate arrays."""
    return np.sqrt(((a - b) ** 2).sum(axis=-1).mean())
```

Once real notes are ready, this test post can be deleted or replaced in `blog/_posts/`.
