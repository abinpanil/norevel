# NorevelJS Governance

This document defines how **NorevelJS** is governed.

It exists to ensure:
- Predictable decision-making
- Long-term stability
- Clear contributor expectations
- Protection against scope creep and architectural drift

Governance is as important as code in a framework project.

---

## Purpose of Governance

NorevelJS is infrastructure software.

Infrastructure must:
- Change deliberately
- Favor stability over experimentation
- Protect users from unexpected breakage

This governance model ensures that decisions are made consistently and transparently.

---

## Roles and Responsibilities

### Maintainers

Maintainers are responsible for:
- Defining and enforcing the project vision
- Reviewing and approving changes
- Protecting architectural integrity
- Managing releases and versioning
- Enforcing contribution standards

Maintainers have final decision-making authority.

---

### Contributors

Contributors may:
- Open issues
- Propose changes
- Submit pull requests
- Participate in design discussions

Contributors are expected to:
- Follow documented conventions
- Respect architectural boundaries
- Accept feedback and revision requests

Contribution does not imply decision authority.

---

## Decision-Making Process

### General Rule

> **Clarity and stability take precedence over novelty and flexibility.**

All decisions are evaluated against:
- Project philosophy
- Architectural consistency
- Long-term maintenance cost

---

### Minor Changes

Examples:
- Bug fixes
- Documentation improvements
- Internal refactors without API changes

Process:
- Pull request
- Maintainer review
- Merge after approval

---

### Significant Changes

Examples:
- New framework features
- New core abstractions
- Behavior changes
- Public API additions

Process:
1. Open an issue describing the proposal
2. Label with `needs-design`
3. Discuss implications and alternatives
4. Maintainer approval required before implementation

---

### Breaking Changes

Breaking changes are taken seriously.

Rules:
- Must be explicitly labeled `breaking-change`
- Must be discussed before implementation
- Must be documented clearly
- Must be aligned with a version milestone

Breaking changes are **never merged casually**.

---

## Versioning Policy

NorevelJS follows **Semantic Versioning**.

### Before v1.0.0
- Breaking changes are allowed
- APIs are experimental
- Stability is not guaranteed

### After v1.0.0
- Breaking changes require major versions
- Backward compatibility is prioritized
- Deprecations are documented before removal

---

## Branching and Releases

### Branches

- `develop` — active development
- `main` — stable, releasable code only

Direct commits to `main` are not allowed.

---

### Releases

Releases:
- Are tied to milestones
- Are created via pull requests
- Are tagged explicitly (`vX.Y.Z`)
- Include matching documentation

---

## Issue and Pull Request Standards

### Issues

Every issue must:
- Be scoped to a milestone
- Include appropriate labels
- Describe the problem clearly

Issues without clear purpose may be closed.

---

### Pull Requests

Every pull request must:
- Target the `develop` branch
- Reference an existing issue
- Follow project conventions
- Pass CI checks

Pull requests may be rejected if they:
- Violate architecture or philosophy
- Introduce unnecessary complexity
- Expand scope beyond the milestone

---

## Scope Control

NorevelJS intentionally limits its scope.

Features may be rejected if they:
- Add flexibility at the cost of predictability
- Duplicate existing functionality
- Increase maintenance burden
- Do not align with the project mission

Rejection is not personal — it is protective.

---

## Conflict Resolution

If disagreement arises:
1. Discuss respectfully in the issue or PR
2. Refer to philosophy and architecture documents
3. Maintainer decision is final

Maintainers are expected to explain decisions clearly.

---

## Governance Changes

Changes to this governance document:
- Require maintainer approval
- Must be discussed openly
- Are versioned like code changes

Governance changes are rare and deliberate.

---

## Final Principle

> **NorevelJS values trust, stability, and clarity above all else.**

This governance model exists to protect those values — for users and contributors alike.

---

*This document is binding for all contributors and maintainers.*
