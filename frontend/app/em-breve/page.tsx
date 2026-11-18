import { MovieCard } from "@/components/MovieCard";
import { PageLayout } from "@/components/PageLayout";
import { COMING_SOON_MOVIES } from "@/data/cinema";

export default function ComingSoonPage() {
  return (
    <PageLayout>
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
          Prepare a pipoca
        </span>
        <h1 className="mt-2 text-4xl font-black sm:text-5xl">Em breve</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Confira os próximos filmes que chegam às salas Cineflow.
        </p>
      </div>
      <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        {COMING_SOON_MOVIES.map((movie) => (
          <MovieCard key={movie.id} movie={movie} isComingSoon />
        ))}
      </div>
    </PageLayout>
  );
}
