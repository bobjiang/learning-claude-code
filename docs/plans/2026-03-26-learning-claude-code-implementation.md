# Learning Claude Code — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a static Next.js website with 10 Claude Code learning challenges — a 5-step starter path and a 5-challenge open catalog.

**Architecture:** Next.js App Router with static rendering. All challenge content lives in a single TypeScript data file. Shared layout with Header/Footer. Three routes: home, dynamic challenge detail, about.

**Tech Stack:** Next.js 15, Tailwind CSS v4, TypeScript

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`, `postcss.config.mjs`

**Step 1: Initialize Next.js project**

Run:
```bash
cd /Users/bobjiang1/Documents/codes/learning-claude-code
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --turbopack
```

When prompted, accept defaults. This scaffolds into the existing directory.

**Step 2: Verify it runs**

Run: `npm run dev` (check localhost:3000 loads), then `npm run build`
Expected: Build succeeds with no errors.

**Step 3: Clean boilerplate**

Replace `src/app/page.tsx` with a minimal placeholder:

```tsx
export default function Home() {
  return <main><h1>Learning Claude Code</h1></main>;
}
```

Remove any boilerplate SVGs or images from `public/` that were added by create-next-app (keep `public/` directory).

**Step 4: Set up global styles**

Replace `src/app/globals.css` with Tailwind base + a dark slate theme:

```css
@import "tailwindcss";

:root {
  --font-mono: "Fira Code", "Cascadia Code", "JetBrains Mono", ui-monospace, monospace;
}

body {
  @apply bg-slate-950 text-slate-100 antialiased;
}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: PASS, no errors.

**Step 6: Commit**

```bash
git add .
git commit -m "chore: scaffold Next.js project with Tailwind"
```

---

### Task 2: Challenge Data

**Files:**
- Create: `src/data/challenges.ts`

**Step 1: Create the challenge type and data file**

```ts
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Challenge {
  slug: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  topic: string;
  starterPath: number | null;
  challenge: string;
  solution: string;
  explanation: string;
}

export const challenges: Challenge[] = [
  // --- Starter Path ---
  {
    slug: "your-first-edit",
    title: "Your First Edit",
    description: "Use Claude Code to fix a typo in a file",
    difficulty: "beginner",
    topic: "editing",
    starterPath: 1,
    challenge: `You have a file called \`greeting.js\` with a bug:\n\n\`\`\`js\nfunction greet(name) {\n  return "Helo, " + name + "!";\n}\n\`\`\`\n\nUse Claude Code to fix the typo in "Helo" → "Hello".`,
    solution: `Open your terminal in the project directory and run:\n\n\`\`\`\nclaude "Fix the typo in greeting.js — Helo should be Hello"\n\`\`\`\n\nClaude Code will read the file, identify the typo, and apply the fix using its Edit tool.`,
    explanation: `This exercises Claude Code's most basic capability: reading a file, understanding a simple instruction, and making a targeted edit. Claude Code uses the Read tool to view the file, then the Edit tool to replace the exact string. This is the foundation — every more complex task builds on this read-then-edit loop.`,
  },
  {
    slug: "generate-a-function",
    title: "Generate a Function",
    description: "Ask Claude Code to write a utility function from a description",
    difficulty: "beginner",
    topic: "code generation",
    starterPath: 2,
    challenge: `Create a new file \`utils/slugify.ts\` that exports a \`slugify\` function. It should:\n\n- Convert a string to lowercase\n- Replace spaces with hyphens\n- Remove non-alphanumeric characters (except hyphens)\n- Trim leading/trailing hyphens\n\nUse Claude Code to generate this function from scratch.`,
    solution: `\`\`\`\nclaude "Create a new file utils/slugify.ts with a slugify function that converts strings to URL-friendly slugs: lowercase, spaces to hyphens, strip non-alphanumeric chars except hyphens, trim leading/trailing hyphens. Export it as a named export."\n\`\`\`\n\nClaude Code will use the Write tool to create the file with the complete implementation.`,
    explanation: `This shows Claude Code's ability to generate code from a natural-language spec. Notice how you described *what* the function should do, not *how* to implement it. Claude Code picks reasonable implementation details (regex patterns, method chaining) on its own. The Write tool creates files that don't exist yet — distinct from Edit which modifies existing files.`,
  },
  {
    slug: "multi-file-refactor",
    title: "Multi-file Refactor",
    description: "Rename a variable across multiple files using Claude Code",
    difficulty: "intermediate",
    topic: "refactoring",
    starterPath: 3,
    challenge: `You have three files that all reference a variable called \`userData\`. You want to rename it to \`userProfile\` everywhere — in the type definition, the API call, and the component that renders it.\n\nFiles involved:\n- \`types/user.ts\` — defines the \`userData\` type\n- \`api/getUser.ts\` — returns \`userData\`\n- \`components/Profile.tsx\` — consumes \`userData\`\n\nUse Claude Code to rename the variable across all three files in one go.`,
    solution: `\`\`\`\nclaude "Rename the variable userData to userProfile across types/user.ts, api/getUser.ts, and components/Profile.tsx. Update all references including the type name, function return values, and component props."\n\`\`\`\n\nClaude Code will use Grep to find all occurrences, then apply Edit to each file sequentially.`,
    explanation: `Multi-file refactoring is where Claude Code shines over manual find-and-replace. It understands the *semantic* meaning of the rename — it won't just do a blind text replace, it'll update type names, destructured variables, and import references appropriately. Claude Code uses Grep to locate all occurrences, then Edit on each file. This is the first challenge where Claude Code's ability to coordinate across files becomes essential.`,
  },
  {
    slug: "debug-a-failing-test",
    title: "Debug a Failing Test",
    description: "Use Claude Code to find and fix a bug from a test failure",
    difficulty: "intermediate",
    topic: "debugging",
    starterPath: 4,
    challenge: `You run your test suite and get this failure:\n\n\`\`\`\nFAIL src/utils/formatDate.test.ts\n  ● formatDate › should format ISO date to readable string\n    Expected: "March 15, 2024"\n    Received: "3/15/2024"\n\`\`\`\n\nUse Claude Code to find the bug in \`formatDate.ts\` and fix it so the test passes.`,
    solution: `\`\`\`\nclaude "The test in src/utils/formatDate.test.ts is failing. It expects 'March 15, 2024' but gets '3/15/2024'. Read the test and the formatDate function, find the bug, and fix it."\n\`\`\`\n\nClaude Code will read both files, identify that the date formatting options are wrong (missing \`{ month: 'long' }\`), and fix the implementation.`,
    explanation: `This is the debugging workflow: give Claude Code the error output and let it trace from the failing assertion back to the root cause. Claude Code reads the test to understand the expected behavior, reads the implementation to find the mismatch, then applies the fix. Pasting the actual error output (not just "tests are failing") gives Claude Code the context it needs to work efficiently.`,
  },
  {
    slug: "build-a-feature",
    title: "Build a Feature",
    description: "Add a complete small feature using Claude Code end-to-end",
    difficulty: "advanced",
    topic: "feature development",
    starterPath: 5,
    challenge: `Add a "dark mode toggle" to an existing Next.js site:\n\n- A button in the header that switches between light and dark themes\n- Persist the preference in localStorage\n- Apply the theme using Tailwind's \`dark:\` variant\n- Default to the user's system preference\n\nUse Claude Code to plan and implement this feature from start to finish.`,
    solution: `\`\`\`\nclaude "Add a dark mode toggle to this Next.js site. Requirements: button in the header, persist preference in localStorage, use Tailwind dark: variant, default to system preference. Plan the approach first, then implement it."\n\`\`\`\n\nClaude Code will:\n1. Read the existing layout and header to understand the structure\n2. Create a ThemeProvider or use a simple script approach\n3. Add the toggle button to the header\n4. Wire up localStorage persistence\n5. Configure Tailwind for class-based dark mode`,
    explanation: `This is the full end-to-end workflow: Claude Code reads the existing codebase to understand the architecture, plans a multi-step implementation, then executes it across multiple files. The key phrase is "plan the approach first" — this prompts Claude Code to think before acting, which produces better results for complex features. Notice how multiple tools are used: Read (understand codebase), Write (new files), Edit (modify existing files).`,
  },
  // --- Open Catalog ---
  {
    slug: "explain-this-code",
    title: "Explain This Code",
    description: "Ask Claude Code to explain an unfamiliar codebase",
    difficulty: "beginner",
    topic: "exploration",
    starterPath: null,
    challenge: `You've just cloned an open-source repo and need to understand how it works. Pick any repo you're curious about (or use your current project) and ask Claude Code to explain:\n\n- What the project does\n- How the code is structured\n- How the key pieces fit together`,
    solution: `\`\`\`\nclaude "Explain this codebase to me. What does it do, how is it structured, and how do the main pieces fit together?"\n\`\`\`\n\nClaude Code will use Glob to discover the file structure, Read key files (README, entry points, config), and synthesize an explanation.`,
    explanation: `Codebase exploration is one of Claude Code's strongest use cases. It uses Glob to map the file tree, reads entry points and config files to understand the architecture, and can follow import chains to trace how data flows. This is often the best first step when joining a new project — before writing any code, let Claude Code give you the lay of the land.`,
  },
  {
    slug: "write-tests",
    title: "Write Tests",
    description: "Generate unit tests for an existing function",
    difficulty: "intermediate",
    topic: "testing",
    starterPath: null,
    challenge: `You have a utility function with no tests. Pick a function in your project (or create a simple one like \`parseQueryString(url: string): Record<string, string>\`) and ask Claude Code to generate comprehensive unit tests for it.`,
    solution: `\`\`\`\nclaude "Read src/utils/parseQueryString.ts and write comprehensive unit tests for it. Cover edge cases: empty string, no params, duplicate keys, encoded characters, hash fragments."\n\`\`\`\n\nClaude Code will read the function, understand its behavior, and generate a test file with multiple test cases.`,
    explanation: `Claude Code generates better tests when you specify edge cases to cover. It reads the implementation to understand the actual behavior (not just the happy path) and generates tests that match. Naming specific edge cases in your prompt ("duplicate keys, encoded characters") produces much more thorough test suites than just "write tests for this function."`,
  },
  {
    slug: "git-workflow",
    title: "Git Workflow",
    description: "Create a branch, commit, and PR with Claude Code",
    difficulty: "intermediate",
    topic: "git",
    starterPath: null,
    challenge: `Use Claude Code to handle the full git workflow:\n\n1. Create a new feature branch\n2. Make a small change (e.g., add a comment to a file)\n3. Stage and commit with a meaningful message\n4. Push and create a pull request\n\nDo the entire flow through Claude Code prompts.`,
    solution: `\`\`\`\nclaude "Create a new branch called 'feat/add-readme-section', add a '## Contributing' section to README.md with basic contribution guidelines, commit it with a descriptive message, push it, and create a pull request."\n\`\`\`\n\nClaude Code will use Bash for git commands and Edit to modify the file.`,
    explanation: `Claude Code can run git commands via the Bash tool. It understands git workflows and will create conventional commit messages, set upstream tracking, and use \`gh\` CLI for pull requests. This is a productivity multiplier for repetitive git operations — describe the intent and let Claude Code handle the ceremony.`,
  },
  {
    slug: "api-integration",
    title: "API Integration",
    description: "Add an external API call with error handling",
    difficulty: "advanced",
    topic: "integration",
    starterPath: null,
    challenge: `Add a feature that fetches data from a public API. For example:\n\n- Fetch a random quote from an API and display it\n- Add proper error handling (network errors, non-200 responses)\n- Add a loading state\n- Add TypeScript types for the API response\n\nUse Claude Code to implement the full integration.`,
    solution: `\`\`\`\nclaude "Add a random quote feature: create a server action that fetches from https://api.quotable.io/random, type the response, handle errors (network failures, non-200). Create a QuoteCard component that shows the quote with a loading state and a 'New Quote' button."\n\`\`\`\n\nClaude Code will create the types, server action, and component with proper error boundaries.`,
    explanation: `API integrations involve multiple concerns: types, data fetching, error handling, and UI states. Describing all the requirements upfront helps Claude Code produce a complete implementation rather than needing multiple follow-ups. The key is being specific about error scenarios you care about — Claude Code will implement exactly what you ask for.`,
  },
  {
    slug: "performance-fix",
    title: "Performance Fix",
    description: "Identify and fix a performance bottleneck",
    difficulty: "advanced",
    topic: "performance",
    starterPath: null,
    challenge: `You have a React component that re-renders too often:\n\n\`\`\`tsx\nfunction SearchResults({ query }: { query: string }) {\n  const results = expensiveSearch(allItems, query);\n  const sorted = results.sort((a, b) => b.score - a.score);\n  \n  return (\n    <ul>\n      {sorted.map(item => (\n        <ResultCard key={item.id} item={item} onClick={() => handleClick(item)} />\n      ))}\n    </ul>\n  );\n}\n\`\`\`\n\nUse Claude Code to identify the performance issues and fix them.`,
    solution: `\`\`\`\nclaude "This SearchResults component has performance issues — it runs expensiveSearch on every render, creates new sort arrays each time, and creates new onClick handlers for each item. Fix the performance issues using useMemo and useCallback."\n\`\`\`\n\nClaude Code will add memoization for the search and sort, and stabilize the callback references.`,
    explanation: `For performance work, describing *what's slow and why* gets better results than just "make this faster." Claude Code can identify performance anti-patterns (missing memoization, inline callbacks in lists, unnecessary re-computations) when you point it at the code. The fix typically involves React's memoization hooks — but Claude Code will choose the right tool based on the actual problem.`,
  },
];

export function getChallengeBySlug(slug: string): Challenge | undefined {
  return challenges.find((c) => c.slug === slug);
}

export function getStarterPathChallenges(): Challenge[] {
  return challenges
    .filter((c) => c.starterPath !== null)
    .sort((a, b) => a.starterPath! - b.starterPath!);
}

export function getCatalogChallenges(): Challenge[] {
  return challenges.filter((c) => c.starterPath === null);
}
```

**Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: No errors.

**Step 3: Commit**

```bash
git add src/data/challenges.ts
git commit -m "feat: add challenge data with 10 challenges"
```

---

### Task 3: Shared Components — DifficultyBadge, Header, Footer

**Files:**
- Create: `src/components/DifficultyBadge.tsx`
- Create: `src/components/Header.tsx`
- Create: `src/components/Footer.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create DifficultyBadge**

```tsx
import { Difficulty } from "@/data/challenges";

const styles: Record<Difficulty, string> = {
  beginner: "bg-green-500/20 text-green-400 border-green-500/30",
  intermediate: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  advanced: "bg-red-500/20 text-red-400 border-red-500/30",
};

export default function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium ${styles[difficulty]}`}>
      {difficulty}
    </span>
  );
}
```

**Step 2: Create Header**

```tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-bold text-slate-100">
          Learn Claude Code
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="/" className="text-slate-400 hover:text-slate-100 transition-colors">
            Home
          </Link>
          <Link href="/about" className="text-slate-400 hover:text-slate-100 transition-colors">
            About
          </Link>
        </div>
      </nav>
    </header>
  );
}
```

**Step 3: Create Footer**

```tsx
export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8">
      <div className="mx-auto max-w-4xl px-6 text-center text-sm text-slate-500">
        <div className="flex justify-center gap-6">
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors"
          >
            Claude Code Docs
          </a>
          <a
            href="https://github.com/anthropics/claude-code"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
```

**Step 4: Update layout.tsx to use Header and Footer**

```tsx
import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Learn Claude Code",
  description: "Learn Claude Code through hands-on practice challenges",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geistMono.variable}>
      <body className="flex min-h-screen flex-col font-[family-name:var(--font-mono)]">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: PASS.

**Step 6: Commit**

```bash
git add src/components/ src/app/layout.tsx
git commit -m "feat: add Header, Footer, DifficultyBadge components and layout"
```

---

### Task 4: Home Page — Hero, StarterPath, ChallengeGrid

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/StarterPath.tsx`
- Create: `src/components/ChallengeGrid.tsx`
- Modify: `src/app/page.tsx`

**Step 1: Create Hero**

```tsx
export default function Hero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-slate-100 sm:text-5xl">
        Learn Claude Code
      </h1>
      <p className="mx-auto mt-4 max-w-xl text-lg text-slate-400">
        Hands-on challenges to master Claude Code — from your first edit to full feature development.
      </p>
      <a
        href="#starter-path"
        className="mt-8 inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
      >
        Start Learning
      </a>
    </section>
  );
}
```

**Step 2: Create StarterPath**

```tsx
import Link from "next/link";
import { getStarterPathChallenges } from "@/data/challenges";
import DifficultyBadge from "./DifficultyBadge";

export default function StarterPath() {
  const challenges = getStarterPathChallenges();

  return (
    <section id="starter-path" className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-2xl font-bold text-slate-100">Starter Path</h2>
      <p className="mt-2 text-sm text-slate-400">
        5 challenges that build your Claude Code fundamentals, step by step.
      </p>
      <ol className="mt-8 space-y-4">
        {challenges.map((challenge) => (
          <li key={challenge.slug}>
            <Link
              href={`/challenges/${challenge.slug}`}
              className="flex items-start gap-4 rounded-lg border border-slate-800 p-4 hover:border-slate-700 hover:bg-slate-900/50 transition-colors"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-600/20 text-sm font-bold text-indigo-400">
                {challenge.starterPath}
              </span>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-100">{challenge.title}</span>
                  <DifficultyBadge difficulty={challenge.difficulty} />
                </div>
                <p className="mt-1 text-sm text-slate-400">{challenge.description}</p>
              </div>
            </Link>
          </li>
        ))}
      </ol>
    </section>
  );
}
```

**Step 3: Create ChallengeGrid**

```tsx
import Link from "next/link";
import { getCatalogChallenges } from "@/data/challenges";
import DifficultyBadge from "./DifficultyBadge";

export default function ChallengeGrid() {
  const challenges = getCatalogChallenges();

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h2 className="text-2xl font-bold text-slate-100">Open Catalog</h2>
      <p className="mt-2 text-sm text-slate-400">
        Pick any challenge that interests you — no prerequisites.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Link
            key={challenge.slug}
            href={`/challenges/${challenge.slug}`}
            className="rounded-lg border border-slate-800 p-4 hover:border-slate-700 hover:bg-slate-900/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <DifficultyBadge difficulty={challenge.difficulty} />
              <span className="rounded-full bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                {challenge.topic}
              </span>
            </div>
            <h3 className="mt-3 font-medium text-slate-100">{challenge.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{challenge.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
```

**Step 4: Wire up Home page**

```tsx
import Hero from "@/components/Hero";
import StarterPath from "@/components/StarterPath";
import ChallengeGrid from "@/components/ChallengeGrid";

export default function Home() {
  return (
    <>
      <Hero />
      <StarterPath />
      <ChallengeGrid />
    </>
  );
}
```

**Step 5: Verify build**

Run: `npm run build`
Expected: PASS.

**Step 6: Commit**

```bash
git add src/components/Hero.tsx src/components/StarterPath.tsx src/components/ChallengeGrid.tsx src/app/page.tsx
git commit -m "feat: add home page with Hero, StarterPath, and ChallengeGrid"
```

---

### Task 5: Challenge Detail Page

**Files:**
- Create: `src/app/challenges/[slug]/page.tsx`

**Step 1: Create the dynamic challenge page**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getChallengeBySlug, challenges } from "@/data/challenges";
import DifficultyBadge from "@/components/DifficultyBadge";

export function generateStaticParams() {
  return challenges.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Note: generateMetadata receives params as a Promise in Next.js 15
  // But generateStaticParams provides them synchronously for static generation
  return params.then(({ slug }) => {
    const challenge = getChallengeBySlug(slug);
    if (!challenge) return { title: "Challenge Not Found" };
    return {
      title: `${challenge.title} — Learn Claude Code`,
      description: challenge.description,
    };
  });
}

export default async function ChallengePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);

  if (!challenge) notFound();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
        ← Back to challenges
      </Link>

      <div className="mt-6 flex items-center gap-3">
        <h1 className="text-3xl font-bold text-slate-100">{challenge.title}</h1>
        <DifficultyBadge difficulty={challenge.difficulty} />
      </div>

      <p className="mt-2 text-slate-400">{challenge.description}</p>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-100">The Challenge</h2>
        <div className="mt-4 whitespace-pre-line rounded-lg border border-slate-800 bg-slate-900/50 p-6 text-sm leading-relaxed text-slate-300">
          {challenge.challenge}
        </div>
      </section>

      <section className="mt-10">
        <details className="group">
          <summary className="cursor-pointer text-xl font-semibold text-slate-100 hover:text-indigo-400 transition-colors">
            Ideal Solution
            <span className="ml-2 text-sm text-slate-500 group-open:hidden">
              (click to reveal)
            </span>
          </summary>
          <div className="mt-4 whitespace-pre-line rounded-lg border border-slate-800 bg-slate-900/50 p-6 text-sm leading-relaxed text-slate-300">
            {challenge.solution}
          </div>
        </details>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-slate-100">Explanation</h2>
        <div className="mt-4 whitespace-pre-line rounded-lg border border-slate-800 bg-slate-900/50 p-6 text-sm leading-relaxed text-slate-300">
          {challenge.explanation}
        </div>
      </section>

      {challenge.starterPath !== null && challenge.starterPath < 5 && (
        <div className="mt-12 text-center">
          <Link
            href={`/challenges/${challenges.find((c) => c.starterPath === challenge.starterPath! + 1)?.slug}`}
            className="inline-block rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500 transition-colors"
          >
            Next Challenge →
          </Link>
        </div>
      )}
    </article>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: PASS — all 10 challenge pages statically generated.

**Step 3: Commit**

```bash
git add src/app/challenges/
git commit -m "feat: add dynamic challenge detail page with solution reveal"
```

---

### Task 6: About Page

**Files:**
- Create: `src/app/about/page.tsx`

**Step 1: Create the About page**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Learn Claude Code",
  description: "About the Learn Claude Code practice site",
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-100">About</h1>

      <div className="mt-6 space-y-4 text-slate-300 leading-relaxed">
        <p>
          This site is a collection of hands-on challenges for learning{" "}
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Claude Code
          </a>
          , Anthropic&apos;s CLI tool for AI-assisted software development.
        </p>

        <p>
          Start with the <strong className="text-slate-100">Starter Path</strong> — five
          challenges that build your fundamentals from simple edits to full feature development.
          Then explore the <strong className="text-slate-100">Open Catalog</strong> to practice
          specific skills like testing, debugging, and git workflows.
        </p>

        <h2 className="pt-4 text-xl font-semibold text-slate-100">How to Use</h2>
        <ol className="list-decimal space-y-2 pl-5">
          <li>Read the challenge description</li>
          <li>Open your terminal and try it with Claude Code</li>
          <li>Compare your approach with the ideal solution</li>
          <li>Read the explanation to understand the concepts</li>
        </ol>

        <h2 className="pt-4 text-xl font-semibold text-slate-100">Prerequisites</h2>
        <p>
          You need{" "}
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/getting-started"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-400 hover:text-indigo-300 underline"
          >
            Claude Code installed
          </a>
          {" "}and a basic familiarity with the terminal. No prior Claude Code experience required.
        </p>
      </div>
    </article>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: PASS.

**Step 3: Commit**

```bash
git add src/app/about/
git commit -m "feat: add About page"
```

---

### Task 7: Final Verification & Lint

**Step 1: Run lint**

Run: `npm run lint`
Expected: No errors.

**Step 2: Run production build**

Run: `npm run build`
Expected: All pages statically generated, no warnings.

**Step 3: Visual check**

Run: `npm run dev`
Verify:
- Home page: Hero renders, starter path shows 5 numbered items, catalog shows 5 cards
- Click a starter path challenge → detail page loads with all 3 sections
- Solution section is collapsed, click to expand
- "Next Challenge" button appears on starter path challenges 1-4
- About page renders correctly
- Header nav works between pages
- Mobile responsive (resize browser)

**Step 4: Commit any fixes, then final commit**

```bash
git add .
git commit -m "chore: final polish and lint fixes"
```
