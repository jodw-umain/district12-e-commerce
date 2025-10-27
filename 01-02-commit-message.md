---
eisource_article_id: 584675
eisource_article_title: Commit Message
eisource_article_description: Achieve clear communication by concise, descriptive commit messages.
---

# 2. Commit Message

**Achieve clear communication by concise, descriptive commit messages.**

Consistent messages create a shared understanding of project history showcasing professionalism.

## Minimum Requirement

- Write your commit summary in the imperative mood, as if you're giving a command:
  - _"add", "fix", "update"_ instead of _"added", "fixed", "updated"_
- Always type in lowercase
- Describe the change in the context of the codebase

#### ✅ Do

- "fix crash in login flow when token is nil"
- "define design system colors"
- "remove extra padding from action button"

#### ❌ Don't

- "updated checkout"
- "fixed PR feedback"
- "add authentication"

## Recommended

Use the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) standard.

Conventional Commits is a simple convention for writing commit messages that follow a structured format.
It improves readability in commit history, enables automated tooling (like changelogs), and enforces consistency across teams.

### Format

```sh
<type>(<scope>): <short description>
```

- `type` – the kind of change (e.g., `feat`, `fix`, `refactor`, etc.)
- `scope` – (optional) what area or component was changed
- `description` – a short, clear summary in present tense

### Example

```sh
fix(auth): prevent token expiration crash
```

### Common types

### Conventional Commit Types

| Type      | Description                                                         |
|-----------|---------------------------------------------------------------------|
| `feat`    | A new feature                                                       |
| `fix`     | A bug fix                                                           |
| `docs`    | Documentation-only changes                                          |
| `style`   | Changes that do not affect the meaning of the code (e.g., formatting) |
| `refactor`| A code change that neither fixes a bug nor adds a feature          |
| `perf`    | A code change that improves performance                            |
| `test`    | Adding or correcting tests                                          |
| `build`   | Changes that affect the build system or external dependencies      |
| `ci`      | Changes to CI configuration files and scripts                      |
| `chore`   | Other changes that don’t modify source or test files               |
| `revert`  | Reverts a previous commit                                           |

Stick to this format when possible. It helps others quickly understand what changed and why, without digging into the diff.
