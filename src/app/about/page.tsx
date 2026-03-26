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
