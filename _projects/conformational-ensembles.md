---
layout: page
title: Physics-aware conformational ensembles
description: A scoped benchmark for testing whether a generative model adds useful information beyond interpolation and conventional simulation.
importance: 1
category: research
---

## Research question

Can a physics-constrained generative model recover the conformational-state distribution of one well-studied switching protein from limited simulation data and sparse structural restraints?

The key constraint is scope: one benchmark system, one data regime, one predeclared evaluation protocol.

## Proposed evaluation

- hold out complete trajectories or conditions rather than randomly splitting frames
- compare against endpoint interpolation, conventional simulation, and a simple generative baseline
- measure state populations, contact-map distributions, collective variables, geometry, clashes, and energy
- use independent experimental observables where available
- claim kinetics only if the model explicitly represents time and reproduces transition statistics

## Status

Research direction and reproducible pilot. No performance claim is made until the benchmark, baselines, and held-out metrics are published.
