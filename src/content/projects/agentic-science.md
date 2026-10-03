---
title: 'Human-Centred Agentic Science'
summary: 'AI takes the repetitive half of scientific discovery — literature research, first-pass coding — while researchers keep control of hypotheses and interpretation.'
status: open
phd: true
order: 1
date: 2026-03-01
stack:
  - LLM APIs
  - Embeddings and vector search
  - RAG
  - Agentic workflows
  - Interactive web UI
links:
  - label: Series overview (LinkedIn)
    href: https://www.linkedin.com/pulse/human-centred-agentic-science-kai-xu-inkce
  - label: Literature research (LinkedIn)
    href: https://www.linkedin.com/pulse/human-centred-agentic-science-2-literature-research-kai-xu-dpr2e
  - label: Qualitative analysis (LinkedIn)
    href: https://www.linkedin.com/pulse/human-centred-agentic-science-3-qualitative-analysis-kai-xu-finhe
  - label: AwesomeLit paper
    href: https://arxiv.org/abs/2603.22648
  - label: vitaLITy 2
    href: https://vitality-vis.github.io/
---

An ongoing research programme, written up as a
[three-part series on LinkedIn](https://www.linkedin.com/pulse/human-centred-agentic-science-kai-xu-inkce):
an overview, then a deep dive on literature research and on qualitative analysis.

## Why not full automation

AI already sits behind some of the most significant results in science. The 2024
Nobel Prize in Chemistry recognised machine learning work on protein structure
prediction — a problem that had been open for decades and remains fundamental
across biology and medicine.

It can also automate discovery end to end. Sakana AI's
[AI Scientist](https://sakana.ai/ai-scientist-first-publication/) takes an initial
input, generates ideas, writes the code, designs and runs the evaluation, and
writes the result up as a paper. One of its papers was accepted at an
[ICLR 2025 workshop](https://sites.google.com/view/icbinb-2025): the organisers
knew it was machine-generated, but the reviewers did not.

That is not where I want to aim. Current models are capable and improving
quickly, but they remain weak in the specific place scientific work is hard. They
can retrieve and summarise, yet I have not seen an assistant that grasps the
nuance of the technical solutions papers propose, or the relationships *between*
papers — which is how research has been done for centuries. Hypothesis generation
is the weakest link of all: the space of possible ideas is astronomical, so
choosing the right one needs judgement that humans are simply better at.

The target is therefore the middle: **the human keeps control, the AI does the
time-consuming half.** Quality of discovery stays human; speed comes from
automation.

## Why per-stage, not end-to-end

Breakthroughs like AlphaFold are extraordinary but narrow, and the approach will
not scale on its own: not every scientist can assemble a large team of AI
specialists to work on their particular question. There is real value in a
complementary approach that helps across a much wider range of problems, and
ideally across disciplines.

So the plan is to build support for each stage of discovery in turn and integrate
them afterwards. Each piece is useful in its own right before the integration ever
happens, and it complements ambitious end-to-end systems such as
[InternAgent](https://github.com/InternScience/InternAgent) and
[FARS](https://analemma.ai/fars/) rather than competing with them.

1. **Literature research** — finding, understanding and synthesising work, and
   identifying the gap.
2. **Hypothesis generation** — coming up with what is worth testing.
3. **Implementation** — writing and debugging the code.
4. **Evaluation** — designing and running experiments.
5. **Write-up** — turning results into an argument.

Each stage needs support that beats an off-the-shelf model or agent, and how much
specialisation it needs will differ: implementation probably needs more than
literature research. The pipeline itself will also have to differ by discipline —
a better machine learning model is a different job from a social science study.
Both are open questions, and I would like to hear ideas.

## Stage 1: literature research

It is tempting to call a chatbot's "deep research" mode a solved problem, and in
one narrow sense it is: give it a topic and it finds relevant papers and
summarises them sensibly. That is enough for a quick orientation, but not for
research. Three gaps recur:

- **Recency.** Training data has a cut-off, so without live web search it misses
  the newest work.
- **Coverage.** Much of the literature is paywalled. ArXiv and SSRN help, but
  relying on them alone gives incomplete results.
- **Depth.** I suspect most tools work from title and abstract only — either
  because they lack access to full text or because they cannot handle it.
  ChatGPT's 4000-token context window is a useful reminder of the latter.

The same limitations apply to tools built specifically for the job, such as
[Asta](https://asta.allen.ai/) and [Consensus](https://consensus.app/).

The goal I care about goes past search: understanding the work, synthesising the
knowledge, and identifying the research gap. AI may be able to do all three — but
how *humans* understand papers and see gaps is the interesting part, and cannot be
fully automated. AI can only help.

Organising this by user goal gives a useful split:

- **G1 — get an overview of a topic.** Largely solved, so not where I would work.
- **G2 — identify a research gap.** The sweet spot for current research.
- **G3 — generate new hypotheses.** Harder and more exciting, but a bridge too
  far for now.

Goals also vary with how familiar the user is with the field, though the two
correlate: someone new to a field is unlikely to be publishing in it.

### [vitaLITy 2](https://vitality-vis.github.io/): retrieval over a focused corpus

vitaLITy 2 targets G2. It builds on vitaLITy, which predates modern LLMs and was
mostly a manual literature research tool; the new version swaps BERT/SPECTER
embeddings for GPT embeddings, adds RAG so it can handle a large collection, and
adds a chat interface for natural-language questions.

The decision that matters is scope. Rather than all of computer science, the
corpus focuses on data visualisation, with related work from HCI and databases,
cutting the collection to roughly 70–80k papers — a size that can be handled
properly. A [recent Google study](https://research.google/blog/testing-llms-on-superconductivity-research-questions/)
found that expert-selected sources beat systems with full internet access, which is
exactly this bet. The next step is letting people bring their own collection, for
example from Zotero, so the analysis is hyper-personalised.

### AwesomeLit: agentic search steered by feedback

Retrieval alone is not enough, so [AwesomeLit](https://arxiv.org/abs/2603.22648)
iteratively refines the literature research based on user feedback. You start from
something broad like *data visualisation for explainable AI*, rate the sub-topics
and papers it proposes, and steer it towards the question you actually care about.
The exploration history is captured and visualised as a tree, which makes
reflection and planning easier. The paper and system will be online shortly.

## A second stage: qualitative analysis

Qualitative research works on unstructured data — interview transcripts,
open-ended responses, documents — across HCI, health, psychology, sociology, law
and business. Its analysis is mostly not numerical, and the interesting question
is not only what people said but why.

The bottleneck is labour. Coding transcripts against a code book means assigning
themes to passages, with sentiment themes like positive/negative/neutral and
reason themes that are more varied and often hierarchical. An hour of interview
can take several hours to code, and a study takes weeks or months. That cost
limits the science directly: more interviews mean patterns that are more general
and less likely to miss rare but important cases.

Machine learning has been used here for a long time — LDA, then Word2Vec and
GloVe — but LLMs change accessibility more than accuracy. You can instruct a model
in prose, with no code, which matters for researchers who do not program. It is
also contested: [a statement signed by many HCI
researchers](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5676462) argues
that generative AI should not be used for qualitative analysis at all.

The goal here is explicitly not automation. Models remain weaker than domain
experts, and qualitative analysis is subjective by nature — each researcher's
interpretation is legitimate, and that diversity is a feature of the method, not a
defect to be corrected. The aim is to let the model do the repetitive part and the
human do the creative part, cutting effort by perhaps half, a quarter, or even a
tenth. Open questions:

- Can a model produce a good rough first pass, given the code book, the
  transcript, and a few human-coded examples?
- Can iterative feedback teach it what *this* researcher wants to extract?
- Can it help reconcile disagreements between multiple coders?

### Co-Refine: consistency while coding

After talking to several qualitative researchers, the recurring problem turned out
to be consistency — applying a theme consistently across a long analysis. One
person drifts over months, and several coders reading the same theme differently is
worse.

Co-Refine is the tool being built for it. The code book and its themes sit on the
left, the transcript in the middle where themes are assigned, and an LLM panel on
the right. When the model thinks a theme has been applied inconsistently it raises
a notification with its reasoning, and the researcher checks it and decides
whether to accept the change. This runs *live*, alongside coding, but can also be
used afterwards as a consistency pass — which tends to suggest more changes. It is
still in development, and a demo will follow.

## What this could change

This is a question for the whole research community rather than one discipline,
and I think the question is when, not whether. When AI meaningfully changes how
discovery is done, it changes our idea of what research is — not just academic, but
social, political, economic and cultural.

There is also the question of AI improving itself. The capability to support
scientific discovery *is* the capability to improve AI, since generative AI
already grew out of research results. AI is already improving itself, just not yet
at the level of the next transformer. Once self-improvement breaks through the
incremental-improvement ceiling, AI could evolve without humans in the loop — and
what would it still need us for? That may matter more than AGI, and I do not have
an answer either.