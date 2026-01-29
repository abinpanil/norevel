# NorevelJS Philosophy

This document defines the philosophy of **NorevelJS**.

It explains *why* the framework exists, *what* it values, and *how* decisions are made.
This philosophy is binding for maintainers and contributors.

---

## Why NorevelJS Exists

NorevelJS exists to solve a specific problem:

> Modern Node.js backend development is powerful, but fragmented.

Teams are forced to assemble backends from many independent libraries, each with its own
assumptions, configuration, and lifecycle.

This leads to:
- Inconsistent architectures
- Repeated boilerplate
- Hidden coupling
- High onboarding costs
- Fragile long-term systems

NorevelJS exists to provide **one coherent, predictable backend foundation**.

---

## The Meaning of “Boring”

In NorevelJS, *boring* is a compliment.

Boring means:
- Predictable behavior
- Clear conventions
- Familiar patterns
- Few surprises

Boring systems are easier to:
- Debug
- Maintain
- Onboard onto
- Trust in production

NorevelJS intentionally optimizes for boring reliability over novelty.

---

## Opinionated by Design

NorevelJS is opinionated by default.

Opinions exist to:
- Reduce decision fatigue
- Prevent architectural drift
- Encourage consistency across teams

There is usually **one recommended way** to solve a problem in NorevelJS.
Alternative approaches are allowed only when they provide clear, lasting value.

---

## Convention Over Configuration

NorevelJS favors conventions over configuration.

This means:
- File locations matter
- Naming conventions matter
- Structure matters

Configuration exists, but it does not replace conventions.
A predictable structure is considered a feature.

---

## Batteries Included, Not Bolted On

Core backend capabilities are built into the framework:

- Routing
- Dependency injection
- Data access
- Authentication
- Jobs and queues
- Scheduling
- CLI tooling

These are not plugins by default.
They are part of the core developer experience.

Optional extensions must integrate cleanly with the framework lifecycle.

---

## Async Work Is First-Class

NorevelJS does not treat background work as an afterthought.

Jobs, queues, schedulers, and event-driven execution are **core primitives**,
not secondary features.

HTTP requests are only one way to trigger execution.

---

## Explicit Over Magical

NorevelJS embraces clarity over cleverness.

- Magic exists, but it is discoverable
- Framework behavior should be explainable
- Hidden runtime behavior is avoided

If something happens automatically, there must be a clear reason and a clear place to learn about it.

---

## Escape Hatches Are Intentional

Advanced users need control.

NorevelJS provides escape hatches that:
- Are explicit
- Are documented
- Do not undermine the core architecture

Bypassing framework abstractions should be a conscious choice, not an accident.

---

## Stability Over Speed

NorevelJS prioritizes:
- Stable APIs
- Predictable behavior
- Long-term maintainability

Over:
- Trend-driven features
- Experimental abstractions
- Micro-optimizations

Performance matters, but correctness and clarity come first.

---

## Framework as Infrastructure

NorevelJS is infrastructure, not a toolkit.

Infrastructure:
- Changes slowly
- Requires discipline
- Values compatibility

Every change is evaluated for its long-term impact.

---

## Community Expectations

Contributors are expected to:
- Respect the architecture
- Follow established conventions
- Avoid scope creep
- Prefer discussion before large changes

Features that violate this philosophy will be rejected, even if they are technically impressive.

---

## Decision-Making Rule

When faced with a design decision, ask:

> Does this make backend development more predictable and boring?

If the answer is no, the feature does not belong in NorevelJS.

---

## Final Statement

NorevelJS is not trying to be everything.

It exists to be:
- Clear
- Consistent
- Predictable
- Boring in the best possible way

That is how reliable systems are built.

---

*This philosophy is intentionally conservative. It protects the framework and its users.*
