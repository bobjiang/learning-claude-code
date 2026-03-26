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
