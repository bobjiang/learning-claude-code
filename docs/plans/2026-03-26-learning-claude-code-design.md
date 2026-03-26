# Learning Claude Code — Website Design

## Overview

An informational website with interactive challenges for learning Claude Code through practice. Built with Next.js (App Router) and Tailwind CSS. No auth, no database — all content is static.

## Pages

1. **Home (`/`)** — Hero section, then Starter Path (5 sequential challenges), then Open Catalog (card grid of additional challenges tagged by difficulty/topic).
2. **Challenge Detail (`/challenges/[slug]`)** — Three sections: The Challenge (task description), Ideal Solution (collapsed by default), Explanation (why it works, features used, tips).
3. **About (`/about`)** — Project explanation, usage guide, link to Claude Code docs.

## Challenge Data Model

```ts
{
  slug: string
  title: string
  description: string        // one-line summary for cards
  difficulty: "beginner" | "intermediate" | "advanced"
  topic: string              // e.g. "editing", "debugging", "refactoring"
  starterPath: number | null // 1-5 if in starter path, null if catalog-only
  challenge: string          // markdown — the task description
  solution: string           // markdown — ideal approach/output
  explanation: string        // markdown — why it works, features used, tips
}
```

All challenge data lives as static JSON/TS files in the project.

## Content — Starter Path (5 challenges)

1. **Your First Edit** (beginner) — Fix a typo in a file
2. **Generate a Function** (beginner) — Write a utility function from a description
3. **Multi-file Refactor** (intermediate) — Rename a variable across 3 files
4. **Debug a Failing Test** (intermediate) — Find and fix a bug from a test failure
5. **Build a Feature** (advanced) — Add a complete small feature end-to-end

## Content — Open Catalog (5 challenges)

1. **Explain This Code** (beginner) — Ask Claude Code to explain an unfamiliar codebase
2. **Write Tests** (intermediate) — Generate unit tests for an existing function
3. **Git Workflow** (intermediate) — Create a branch, commit, and PR with Claude Code
4. **API Integration** (advanced) — Add an external API call with error handling
5. **Performance Fix** (advanced) — Identify and fix a performance bottleneck

## Components

- **Header** — Logo/site name + nav (Home, About). Sticky top.
- **Hero** — Headline, subtitle, "Start Learning" scroll button.
- **StarterPath** — Vertical numbered list (1-5). Each item: title, difficulty badge, description. Links to detail page.
- **ChallengeGrid** — 2-3 column card grid (1 on mobile). Each card: title, difficulty badge, topic tag, description.
- **DifficultyBadge** — Color-coded pill (green/yellow/red).
- **ChallengePage** — Title + badges, three content sections, solution collapsed via `<details>`/`<summary>`.
- **Footer** — Links to Claude Code docs and GitHub repo.

## Visual Style

- Clean, minimal, dark-mode friendly (Tailwind `slate` palette)
- Monospace font for code blocks
- Generous whitespace, clear hierarchy
- Mobile-first responsive
- No external UI libraries — Tailwind utilities + native HTML only
