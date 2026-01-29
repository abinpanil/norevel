# NorevelJS

> **A Laravel-inspired Node.js framework for teams who want structure, batteries, and boring reliability—without stitching 15 libraries together.**

NorevelJS is an opinionated, batteries-included backend framework for Node.js.  
It provides one coherent way to build APIs, background jobs, workflows, and services — with predictable conventions and first-class tooling.

If you’re tired of assembling your backend from routers, ORMs, queue libraries, auth plugins, and glue code, NorevelJS is designed to make backend development *boring again*.

---

## Why NorevelJS?

Modern Node.js backends often look like this:

- Express or Fastify for HTTP
- Prisma, TypeORM, or Sequelize for data
- BullMQ or RabbitMQ for queues
- Zod or Joi for validation
- Passport or custom auth logic
- Hand-rolled CLI scripts
- A custom folder structure per team

Every team rebuilds the same foundation — slightly differently, every time.

**NorevelJS exists to standardize that foundation.**

---

## Core Principles

NorevelJS is built on a few strict principles:

### 1. Convention over configuration
There is one recommended way to structure an application.  
Fewer decisions. Fewer debates. Fewer mistakes.

### 2. Batteries are first-class
Routing, ORM, migrations, auth, jobs, queues, scheduler, validation, and CLI tooling are built in — not bolted on.

### 3. Async work is not secondary
Background jobs, queues, scheduled tasks, and workflows are core primitives — equal to HTTP requests.

### 4. Escape hatches are explicit
You can bypass framework abstractions when needed — intentionally and visibly.

### 5. Boring over clever
Predictability, stability, and clarity are valued more than novelty or micro-optimizations.

---

## What NorevelJS Is (and Is Not)

### NorevelJS is:
- A full backend application framework
- Opinionated and structured
- Designed for teams and production systems
- Focused on long-term maintainability

### NorevelJS is not:
- A minimal framework
- A replacement for the entire Node ecosystem
- A playground for experimental patterns
- A frontend or SSR framework

---

## Features (v1 Scope)

Planned features for the initial stable release:

- HTTP server and routing
- Service container (dependency injection)
- First-class CLI tooling
- ORM with migrations and seeders
- Authentication and authorization
- Background jobs and queues
- Scheduler (cron-like tasks)
- Structured logging
- Testing utilities

Features outside this scope will be considered after v1 stability.

---

## CLI Overview

NorevelJS ships with a first-class CLI called `norevel`.

```bash
norevel new my-app
cd my-app
norevel serve
```
Common commands:

```bash
norevel make:controller UserController
norevel make:model User --migration
norevel migrate
norevel queue:work
norevel test
```
The CLI is the primary interface to the framework.

## Project Structure

A typical NorevelJS application looks like this:

```
app/
  Controllers/
  Services/
  Models/
  Jobs/
  Policies/
  Modules/
routes/
  api.ts
config/
database/
  migrations/
  seeders/
storage/
tests/
```

This structure is not optional.
Consistency is a feature.

## Status
### Early development:

NorevelJS is currently in the design and prototyping phase.
APIs may change until the first stable release.

## Philosophy
NorevelJS is inspired by Laravel, but it is Node-native in its design and execution.

It is not a clone.
It does not aim to replicate Laravel feature-by-feature.
It aims to bring the clarity, cohesion, and productivity Laravel provides — adapted to modern Node.js backends.

## Contributing
Contributions, design discussions, and feedback are welcome — once the core architecture is stabilized.

### For now, the focus is on:
- Defining clear abstractions
- Avoiding premature extensibility
- Getting the fundamentals right

## License

### MIT

---
