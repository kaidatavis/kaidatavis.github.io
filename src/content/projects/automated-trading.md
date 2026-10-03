---
title: 'Machine Learning for Automated Trading'
summary: 'Explore how far machine learning can go in systematic trading, and where the interesting failure modes are.'
status: open
order: 3
date: 2024-09-15
stack:
  - React or Flutter
  - Time-series relational database
  - Deep learning
  - Anomaly detection
  - MLflow
  - LangChain / LangGraph
links:
  - label: Front-end source
    href: https://github.com/kaidatavis/student-projects
---

## Background

Trading is an appealing domain for a student project: the data is plentiful, the
objective is unambiguous, and the results are easy to see. It is also a domain
where the naive approach fails instructively.

The aim is not to build a money-printing bot. It is to understand what actually
limits learning in this setting — data leakage, regime change, overfitting to
backtest noise, and the gap between a good backtest and a deployable system.

## What you would build

You would work through the full pipeline rather than one stage:

- acquiring and cleaning market data into a time-series store,
- building and tuning models with proper experiment tracking,
- analysing anomalies and failure cases rather than just headline metrics,
- presenting results so that a human can actually interrogate them.

Visualisation is doing real work here, not decoration: the hard question is how to
show a strategy's behaviour over time in a way a person can reason about.

## Background reading

Start by reading about look-ahead bias and overfitting in financial ML before
building anything. Most of the interesting findings in this project come from
encountering those problems directly.