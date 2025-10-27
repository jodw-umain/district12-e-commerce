---
eisource_article_id: 584676
eisource_article_title: Branch Convention
eisource_article_description: Keep branches small, short-lived, and clearly named to represent focused work.
---

# 1. Branch Convention

**Keep branches small, short-lived, and clearly named to represent focused work.**

Manageable branches with consistent naming create shared understanding and enable efficient collaboration across growing teams.

## Minimum Requirement

- Use a common naming convention for your project
- Always use lowercase with hyphens
- Keep branches small and short-lived

## Recommended

Use the [Conventional Branch](https://conventional-branch.github.io/) specification to enable purpose-driven naming that improves team collaboration and CI/CD integration.

### Format

```sh
<type>/<ticket-number>-<description>
```

- `type` – the kind of work (e.g., `feature`, `bugfix`, `hotfix`, etc.)
- `ticket-number` – project management reference (e.g., UMA-123)
- `description` – short, clear summary with hyphens

### Example

```sh
feature/uma-123-user-authentication
```

### Branch types

- `feature/` – new functionality or enhancement
- `bugfix/` – non-urgent bug fixes
- `hotfix/` – urgent production fixes
- `release/` – release preparation branches
- `chore/` – maintenance, dependencies, or documentation

### Key benefits

- **Clear communication**: Branch name alone conveys its purpose
- **Team collaboration**: Explicit purpose reduces misunderstandings and eases task switching
- **CI/CD integration**: Enables automated workflows based on branch type
- **Scalability**: Works efficiently with large teams and multiple concurrent tasks

### Best practices

- Use only lowercase letters, numbers, and single hyphens
- No consecutive hyphens (`--`) or trailing hyphens
- Keep names descriptive yet concise
- Include ticket numbers when available for easier tracking

This structured approach transforms branch names into clear communication tools that scale with team growth.
