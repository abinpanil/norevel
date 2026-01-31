# NorevelJS CLI Architecture

This document defines the architecture and responsibilities of the **NorevelJS CLI**.

The CLI is a **thin orchestration layer** that wires together the application kernel and runtime adapters.  
It is intentionally minimal and opinionated.

This document is binding for all CLI-related changes.

---

## Purpose of the CLI

The NorevelJS CLI exists to:

- Bootstrap the application kernel
- Select and configure runtime adapters (HTTP, queue, scheduler, etc.)
- Trigger execution through the kernel lifecycle
- Provide a consistent developer interface

The CLI **does not** implement framework behavior.

---

## Core Principle

> **The CLI orchestrates execution. It never owns business logic.**

If logic belongs to `core`, `http`, `queue`, or any other package, it must **not** live in `cli`.

---

## Responsibilities

The CLI is responsible for:

1. Parsing command-line arguments
2. Resolving a command
3. Bootstrapping the application kernel
4. Selecting and wiring runtime adapters
5. Initiating execution via the kernel

The CLI is **replaceable**.  
All behavior must be achievable without it.

---

## What the CLI Must Not Do

The CLI must **never**:

- Implement framework features
- Handle HTTP requests directly
- Bypass the kernel lifecycle
- Contain business or application logic
- Own dependency injection logic
- Access private framework internals

Violations of these rules are grounds for rejection.

---

## High-Level Structure

```

packages/cli/
└─ src/
├─ cli.ts # Entry point (bin)
├─ command.ts # Command contract
├─ kernel.ts # Kernel bootstrap helper
├─ commands/
│ ├─ serve.ts # HTTP runtime command
│ ├─ build.ts # Build-related command
│ └─ help.ts # Help / usage
└─ index.ts

```

Each file has a **single responsibility**.

---

## Entry Point (`cli.ts`)

The CLI entry point is responsible for:

- Reading `process.argv`
- Resolving a command
- Executing the command
- Handling top-level errors

It must not import framework internals or runtime logic.

---

## Command Contract

All CLI commands must implement the same interface.

```ts

interface CliCommand {
  name: string;
  description: string;
  execute(): Promise<void>;
}

```

This ensures:

- Predictable behavior
- Easy testing
- Explicit command boundaries

---

## Command Resolution

Command resolution is explicit and static.

- Commands are registered manually
- No dynamic discovery
- No magic auto-loading

If a command exists, it must be imported and registered intentionally.

---

## Kernel Bootstrapping

The CLI never constructs or configures the kernel inline.

Kernel bootstrapping must be centralized:

- One helper
- One boot flow
- One lifecycle entry point

This ensures:

- Consistent lifecycle behavior
- Predictable execution order
- Runtime parity (CLI, HTTP, jobs)

---

## Runtime Selection

The CLI selects which runtime to execute, but does not implement it.

Examples:

- `serve` → HTTP runtime
- `queue:work` → Queue runtime
- `schedule:run` → Scheduler runtime

Each runtime:

- Receives a kernel instance
- Executes within the lifecycle
- Owns its transport logic

---

## Execution Flow

All CLI commands follow the same flow:

- Parse arguments
- Bootstrap kernel
- Configure runtime
- Trigger kernel execution
- Exit or await runtime

The lifecycle is never skipped.

---

## Error Handling

- The CLI handles only top-level errors
- Runtime-specific errors are handled by the runtime
- Framework errors propagate naturally

The CLI must not swallow or reinterpret framework errors.

---

## CLI Design Constraints

These constraints are intentional:

- No decorators
- No hidden command registration
- No implicit configuration
- No global mutable state
- No command-side dependency resolution

Boring is correct.

---

## Extensibility Rules

New CLI commands:

- Must implement the command contract
- Must be thin
- Must delegate logic to the appropriate package
- Must not introduce new architectural patterns

If a command requires complex logic, that logic belongs elsewhere.

---

## Testing Philosophy

CLI commands should be testable by:

- Calling execute() directly
- Mocking kernel bootstrap if needed
- Avoiding reliance on process.argv in logic

Testing the CLI must not require a running server.

---

## Testing Philosophy

CLI commands should be testable by:

- Calling execute() directly
- Mocking kernel bootstrap if needed
- Avoiding reliance on process.argv in logic

Testing the CLI must not require a running server.

---

## Final Rule

> If a CLI command cannot be explained as “wiring existing pieces together,” it does not belong in the CLI.

This rule protects the framework from long-term decay.

---