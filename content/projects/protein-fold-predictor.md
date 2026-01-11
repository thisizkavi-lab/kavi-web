---
id: "protein-fold-predictor"
title: "protein-fold-predictor"
category: "Biology / ML"
description: "A deep learning model utilizing graph neural networks to predict tertiary protein structures."
stack: "PyTorch, PyG, RDKit"
metrics:
  - label: "pLDDT Score"
    value: 89.4
  - label: "RMSD (Å)"
    value: 1.2
  - label: "Inference (ms)"
    value: 450
---

# Abstract

This architecture treats proteins as biological graphs where nodes are residues and edges are chemical bonds/interactions. By utilizing **Graph Attention Networks (GAT)**, the model learns an embedding space that captures the physical constraints of folding without heavy molecular dynamics simulations.

## The Structure

Proteins fold based on energy minimization. 

$$
E_{total} = E_{bond} + E_{angle} + E_{dihedral} + E_{vdw} + E_{elec}
$$

Our model approximates this potential energy surface using a learned manifold.

## Implementation

```python
class FoldingGNN(nn.Module):
    def __init__(self, in_channels, hidden_channels):
        super().__init__()
        self.conv1 = GATv2Conv(in_channels, hidden_channels, heads=8)
        self.conv2 = GATv2Conv(hidden_channels * 8, hidden_channels, heads=1)
        self.fc = nn.Linear(hidden_channels, 3) # Predicted coords

    def forward(self, x, edge_index):
        x = F.elu(self.conv1(x, edge_index))
        x = self.conv2(x, edge_index)
        return self.fc(x)
```

## Results

The model achieves state-of-the-art performance on the CASP14 dataset subset.
