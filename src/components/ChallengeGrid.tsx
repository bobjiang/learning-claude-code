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
