---
id: "pytorch-transformer"
type: "research"
group: "implementation"
title: "PyTorch Transformer Implementation"
category: "Deep Learning / NLP"
description: "A clean, annotated implementation of the Transformer model from 'Attention Is All You Need' using PyTorch."
stack: "Python, PyTorch, NumPy"
metrics:
  - label: "Parameters"
    value: 65
    unit: "M"
  - label: "Layers"
    value: 6
  - label: "d_model"
    value: 512
repoUrl: "https://www.k-a.in/pyt-transformer.html"
---

# The Transformer

This is a complete, annotated implementation of the Transformer architecture from the paper *Attention Is All You Need*. Code adapted from the [Annotated Transformer](https://nlp.seas.harvard.edu/2018/04/03/attention.html) and [Arjun Kocher's Guide](https://www.k-a.in/pyt-transformer.html).

## 1. Embeddings & Positional Encoding

Since transformers have no recurrence, we must inject position information.

```python
import torch
import torch.nn as nn
import math

class Embeddings(nn.Module):
    def __init__(self, d_model: int, vocab: int):
        super(Embeddings, self).__init__()
        self.lut = nn.Embedding(vocab, d_model)
        self.d_model = d_model

    def forward(self, x):
        return self.lut(x) * math.sqrt(self.d_model)

class PositionalEncoding(nn.Module):
    def __init__(self, d_model: int, dropout: float = 0.1, max_len: int = 5000):
        super(PositionalEncoding, self).__init__()
        self.dropout = nn.Dropout(p=dropout)
        
        # Compute the positional encodings once in log space.
        pe = torch.zeros(max_len, d_model)
        position = torch.arange(0, max_len).unsqueeze(1).float()
        div_term = torch.exp(torch.arange(0, d_model, 2).float() *
                             -(math.log(10000.0) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        pe = pe.unsqueeze(0)
        self.register_buffer('pe', pe)

    def forward(self, x):
        x = x + self.pe[:, :x.size(1)]
        return self.dropout(x)
```

## 2. The Transformer Layer

The core unit consisting of Multi-Head Attention and Feed-Forward networks, wrapped in residual connections and layer normalization.

```python
class TransformerLayer(nn.Module):
    def __init__(self, size, self_attn, src_attn, feed_forward, dropout):
        super(TransformerLayer, self).__init__()
        self.self_attn = self_attn
        self.src_attn = src_attn
        self.feed_forward = feed_forward
        self.sublayer = clone_module_list(SublayerConnection(size, dropout), 3)
        self.size = size

    def forward(self, x, mask, src_mask):
        m = mask
        x = self.sublayer[0](x, lambda x: self.self_attn(x, x, x, m))
        x = self.sublayer[1](x, lambda x: self.src_attn(x, x, x, m))
        return self.sublayer[2](x, self.feed_forward)
```

## 3. High-Level Architecture

The Encoder and Decoder stacks.

```python
class Encoder(nn.Module):
    def __init__(self, layer, N):
        super(Encoder, self).__init__()
        self.layers = clone_module_list(layer, N)
        self.norm = LayerNorm(layer.size)

    def forward(self, x, mask):
        for layer in self.layers:
            x = layer(x, mask)
        return self.norm(x)
```

This implementation allows for training translation models from scratch using standard PyTorch loops.
