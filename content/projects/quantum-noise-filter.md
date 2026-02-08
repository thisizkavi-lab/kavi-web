---
id: "quantum-noise-filter"
type: "prototype"
group: "sandbox"
title: "Quantum Noise Filter"
category: "Physics / ML"
description: "Denoising superconducting qubit readouts using Recurrent Neural Networks."
fullDescription: "Quantum computers are noisy. Readout errors are one of the biggest bottlenecks in scaling. This project uses a custom LSTM architecture to filter raw signal data from the transmon qubits, distinguishing between the |0> and |1> states with higher fidelity than traditional thresholding methods."
stack: "Python, Qiskit, TensorFlow, NumPy"
repoUrl: "https://github.com/kabindrasony/quantum-noise"
metrics:
  - label: "Fidelity"
    value: 99.2
  - label: "Speed (ns)"
    value: 45
  - label: "Qubits"
    value: 8
---

# The Problem with Qubits

Superconducting qubits are extremely sensitive. A thermal fluctuation or a stray photon can cause a bit flip.

## The Solution
We treat the readout signal as a time-series problem. By training an LSTM on valid state preparations, we can "predict" the true state even in the presence of noise.

### Architecture

```python
model = Sequential()
model.add(LSTM(64, input_shape=(timesteps, features)))
model.add(Dense(1, activation='sigmoid'))
model.compile(loss='binary_crossentropy', optimizer='adam')
```

### Results
The model outperforms standard Kalman filters by **12%** in high-noise environments.
