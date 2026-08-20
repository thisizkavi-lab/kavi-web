---
layout: post
title: "Why protein dynamics needs more than snapshots"
date: 2026-08-17 00:00:00 +0900
published: false
description: "A short note on the gap between static structures, simulation trajectories, and testable generative models."
tags: [biophysics, protein-dynamics, molecular-simulation]
categories: [research-notes]
---

A protein structure is a useful description, but it is not the whole mechanism. Function can depend on how a molecule moves between states, how long it dwells in each state, and which intermediate arrangements are accessible.

That observation is not, by itself, a new method. It is a question-setting device. A useful computational project must make the question narrower:

1. choose one benchmark system with known structural states;
2. separate training trajectories from held-out trajectories or conditions;
3. define what “better” means before looking at the result;
4. compare against simple baselines, not only a large model;
5. report failure modes as carefully as successes.

For generative models, “the structure looks plausible” is not enough. A credible evaluation should test ensemble statistics, contacts or collective variables, geometry, energetic sanity checks, and—only when time is explicitly modeled—transition behavior.

This notebook will document that process as it becomes real.
