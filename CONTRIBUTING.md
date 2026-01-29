# Contributing to NorevelJS

- Fork the repo
- Create feature branches from `develop`
- Write tests where applicable
- Follow existing conventions
- Open PRs against `develop`

Breaking changes require discussion.

## Issue Labels

NorevelJS uses a structured labeling system to keep issues and pull requests clear and predictable.

Every issue and pull request **must** include:
- One **type** label
- One **area** label

Additional labels may be applied as needed.

## Issue Labels

### Type Labels (required)

These describe the nature of the work.

- `feat` – New functionality or capability
- `fix` – Bug fixes
- `docs` – Documentation changes
- `chore` – Maintenance, tooling, repo setup
- `refactor` – Internal code improvements without behavior change

---

### Area Labels (required)

These indicate which part of the framework is affected.

- `core` – Application kernel and lifecycle
- `cli` – Norevel CLI
- `http` – HTTP server, routing, middleware
- `orm` – Data layer, models, migrations
- `queue` – Jobs, queues, workers
- `auth` – Authentication and authorization
- `docs-site` – Documentation and guides

---

### Status Labels (optional)

These describe the current state of the work.

- `blocked` – Cannot proceed due to dependency or decision
- `needs-design` – Requires architectural discussion
- `needs-review` – Ready for maintainer review
- `breaking-change` – Introduces API-breaking changes

---

### Priority Labels (optional)

Used sparingly to signal urgency.

- `priority:high`
- `priority:medium`
- `priority:low`

---

### Version Labels (optional)

Used as helpers alongside milestones.

- `v0.1`
- `v0.2`
- `v1.0`

Issues or pull requests that do not follow this labeling system may be relabeled or closed.
