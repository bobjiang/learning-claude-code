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
