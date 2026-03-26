import { notFound } from "next/navigation";
import Link from "next/link";
import { getChallengeBySlug, challenges } from "@/data/challenges";
import DifficultyBadge from "@/components/DifficultyBadge";

export function generateStaticParams() {
  return challenges.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = getChallengeBySlug(slug);
  if (!challenge) return { title: "Challenge Not Found" };
  return {
    title: `${challenge.title} — Learn Claude Code`,
    description: challenge.description,
  };
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
