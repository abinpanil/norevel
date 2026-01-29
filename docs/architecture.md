# NorevelJS Architecture

This document describes the high-level architecture of **NorevelJS** and the principles that guide its internal design.

It is intended for:
- Framework maintainers
- Core contributors
- Advanced users who want to understand how NorevelJS works internally

This is **not** a usage guide.

---

## Architectural Goals

NorevelJS is designed around the following goals:

1. **Predictability**
   - Every application behaves the same way
   - Conventions are enforced, not optional

2. **Separation of concerns**
   - Business logic is isolated from infrastructure
   - HTTP is not the center of the system

3. **First-class async workflows**
   - Jobs, queues, and schedulers are core primitives
   - Background execution is equal to request handling

4. **Explicit over implicit**
   - Magic exists, but it is discoverable
   - Escape hatches are intentional and visible

5. **Long-term maintainability**
   - Favor boring, proven patterns
   - Avoid framework-level cleverness

---

## High-Level Overview

At a high level, NorevelJS is composed of:

- A **core application kernel**
- A **service container**
- A set of **runtime adapters** (HTTP, queue, scheduler)
- A **CLI-first developer interface**

The framework is **event- and lifecycle-driven**, not request-driven.

---

## Core Components

### 1. Application Kernel

The application kernel is the heart of NorevelJS.

Responsibilities:
- Bootstrapping the application
- Loading configuration
- Registering modules
- Managing lifecycle hooks
- Coordinating startup and shutdown

The kernel is **runtime-agnostic**.  
It does not depend on HTTP, queues, or schedulers.

This allows the same application to be executed via:
- HTTP requests
- Background jobs
- Scheduled tasks
- Event listeners

---

### 2. Service Container (Dependency Injection)

The service container manages all dependencies in the application.

Key characteristics:
- Explicit bindings
- Automatic resolution
- Singleton and transient lifetimes
- No decorators
- No reflection-based magic

All core framework services are registered through the container.

User code should **never instantiate services directly**.

---

### 3. Modules

Modules are the primary organizational unit in NorevelJS.

A module:
- Registers services
- Registers routes
- Registers jobs and listeners
- Is loaded by the application kernel

Modules allow large applications to remain structured and scalable.

---

## Runtime Adapters

NorevelJS separates **what the application does** from **how it is triggered**.

### HTTP Runtime

The HTTP runtime is responsible for:
- Listening for HTTP requests
- Routing requests to controllers
- Executing middleware
- Producing responses

HTTP is treated as **one possible entry point**, not the default one.

---

### Queue Runtime

The queue runtime:
- Pulls jobs from queues
- Executes job handlers
- Handles retries and failures
- Integrates with the application kernel

Jobs are executed inside the same dependency container as HTTP requests.

---

### Scheduler Runtime

The scheduler runtime:
- Triggers tasks based on time
- Executes scheduled jobs
- Shares the same execution model as queues

Schedulers do not bypass the framework lifecycle.

---

## Execution Lifecycle

Every execution path in NorevelJS follows the same lifecycle:

1. Application boot
2. Configuration load
3. Module registration
4. Dependency resolution
5. Execution (request, job, task)
6. Cleanup and shutdown hooks

This ensures consistent behavior regardless of how code is triggered.

---

## CLI-Centric Design

The CLI (`norevel`) is the **primary interface** to the framework.

The CLI is responsible for:
- Project scaffolding
- Code generation
- Running servers and workers
- Inspecting application state
- Managing migrations and jobs

There is no “hidden” functionality outside the CLI.

---

## Package Architecture (Monorepo)

NorevelJS uses a monorepo structure.

```
packages/
core/ → application kernel and lifecycle
http/ → HTTP runtime
cli/ → CLI tooling
orm/ → data layer
queue/ → jobs and workers
auth/ → authentication and policies
```


Each package:
- Has a single responsibility
- Exposes a clear public API
- Depends on `core`, not on other runtimes

---

## Error Handling Philosophy

Errors in NorevelJS are:
- Explicit
- Typed where possible
- Propagated through the execution lifecycle

The framework avoids swallowing errors or converting them into silent failures.

---

## Configuration Philosophy

Configuration is:
- Environment-aware
- Explicit
- Immutable at runtime

There is one configuration loading phase during application boot.

---

## What the Architecture Avoids

NorevelJS intentionally avoids:

- Global mutable state
- Decorator-heavy APIs
- Implicit runtime behavior
- Request-only mental models
- Plugin sprawl without ownership

---

## Stability Guarantees

Before `v1.0.0`:
- Internal APIs may change
- Architecture may evolve

After `v1.0.0`:
- Public APIs are stable
- Architectural changes require major versions
- Backward compatibility is prioritized

---

## Final Principle

> **If a feature cannot fit cleanly into this architecture, it does not belong in the framework.**

This rule protects NorevelJS from long-term decay.

---

*This document evolves with the framework. Changes must be intentional and reviewed.*

