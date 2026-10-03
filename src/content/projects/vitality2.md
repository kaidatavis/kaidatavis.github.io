---
title: 'vitaLITy 2: Chat With Your Papers'
summary: 'A retrieval-augmented assistant for qualitative literature review, with the conversation grounded in your own reading.'
status: open
order: 2
date: 2024-08-29
stack:
  - React or Flutter
  - Vector database (Chroma)
  - RAG (e.g. RAGFlow)
  - LangChain / LangGraph
  - MCP
links:
  - label: Project page
    href: https://vitality-vis.github.io/
---

## Background

Much of academic work is qualitative: you read a corpus, you form a sense of what
it says, and you write about the themes you found. The tooling for this is
surprisingly weak. Keyword search assumes you already know the right words to use,
which is precisely what you do not know when you are new to a field.

{vitaLITy} 2 addresses this by indexing papers as text embeddings and answering
questions against them, so that a researcher can ask questions in natural language
and get answers grounded in the corpus they supplied.

## What you would build

You would extend the existing system with a genuinely useful capability — for example:

- comparing claims *across* papers rather than summarising one at a time,
- tracing where a theme first appears and how it shifts over time,
- supporting qualitative coding workflows such as thematic analysis.

The core corpus is 66,692 papers from 1970–2023, already searchable through
embeddings from three language models, so the interesting work is in the
interaction design and evaluation rather than in data collection.

## Background reading

- [vitaLITy 2 paper](https://arxiv.org/abs/2408.13450)
- [Generative AI for Everyone](https://www.deeplearning.ai/courses/generative-ai-for-everyone/) —
  a good primer if the LLM tooling is new to you