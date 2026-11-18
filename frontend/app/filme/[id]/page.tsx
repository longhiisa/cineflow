import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { getMovieById, SCREENINGS } from "@/data/cinema";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const movie = getMovieById(id);

  if (!movie) notFound();

  const showings = SCREENINGS.filter((screening) => screening.movieId === id);

  return (
    <PageLayout>
      <Link href="/" className="text-sm text-zinc-400 transition hover:text-white">
        ← Voltar para a programação
      </Link>

      <section className="mt-6 grid gap-8 rounded-3xl border border-white/10 bg-zinc-900/60 p-5 sm:p-8 lg:grid-cols-[280px_1fr]">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-zinc-950">
          <Image
            src={movie.posterUrl}
            alt={`Pôster de ${movie.title}`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 280px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
            {showings.length ? "Em cartaz" : "Em breve"}
          </span>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
            {movie.title}
          </h1>
          <div className="mt-5 flex flex-wrap gap-3 text-sm text-zinc-300">
            <span className="rounded bg-orange-600 px-2 py-1 font-bold text-white">
              {movie.rating}
            </span>
            <span>{movie.genre}</span>
            <span>•</span>
            <span>{movie.durationMinutes} min</span>
          </div>
          <p className="mt-6 max-w-2xl leading-7 text-zinc-300">
            {movie.synopsis}
          </p>

          <div className="mt-8">
            {showings.length ? (
              <>
                <h2 className="text-xl font-bold">Escolha uma sessão</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {showings.map((screening) => (
                    <Link
                      key={screening.id}
                      href={`/ingressos/assentos/${screening.id}`}
                      className="rounded-2xl border border-white/10 bg-zinc-950 p-4 transition hover:border-red-500/60 hover:bg-zinc-900"
                    >
                      <span className="text-xs font-semibold text-red-400">
                        {screening.dateLabel}
                      </span>
                      <span className="mt-1 flex items-center justify-between">
                        <strong className="text-xl">{screening.startTime}</strong>
                        <span className="text-sm text-zinc-400">
                          {screening.format} · {screening.audio}
                        </span>
                      </span>
                      <span className="mt-2 flex justify-between text-xs text-zinc-500">
                        <span>{screening.roomName}</span>
                        <span>R$ {screening.price.toFixed(2)}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <p className="rounded-xl border border-white/10 bg-zinc-950 p-4 text-zinc-300">
                As sessões deste filme serão divulgadas em breve.
              </p>
            )}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
