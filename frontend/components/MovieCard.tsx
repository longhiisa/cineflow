"use client";

import Image from "next/image";
import Link from "next/link";
import { Movie } from "@/types/cinema";

interface MovieCardProps {
  movie: Movie;
  isComingSoon?: boolean;
}

export function MovieCard({ movie, isComingSoon = false }: MovieCardProps) {
  const getRatingColor = (rating: string) => {
    if (rating === "L") return "bg-emerald-600";
    if (rating === "12") return "bg-amber-500 text-black";
    if (rating === "14") return "bg-orange-600";
    if (rating === "16") return "bg-red-600";
    return "bg-zinc-900 border border-white/20";
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 transition-all duration-300 hover:-translate-y-2 hover:border-red-600/60 hover:shadow-2xl hover:shadow-red-600/15">
      {/* Pôster */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
        <Image
          src={movie.posterUrl}
          alt={movie.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-95" />

        {/* Classificação Indicativa */}
        <span
          className={`absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-md text-xs font-extrabold shadow-md ${getRatingColor(
            movie.rating
          )}`}
        >
          {movie.rating}
        </span>

        {/* Tag de Tecnologia */}
        <span className="absolute top-3 left-3 rounded-md border border-white/15 bg-black/70 px-2.5 py-1 text-[11px] font-semibold tracking-wider text-zinc-200 backdrop-blur-sm">
          IMAX • 4K
        </span>

        {/* Botão que desliza ao passar o mouse */}
        <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Link
            href={`/filme/${movie.id}`}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-sm font-bold text-white shadow-lg shadow-red-600/40 transition hover:bg-red-500"
          >
            {isComingSoon ? "Ver Detalhes" : "Comprar Ingresso"}
          </Link>
        </div>
      </div>

      {/* Informações abaixo do pôster */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-red-500">
            {movie.genre}
          </p>
          <h3 className="mt-1 line-clamp-1 text-lg font-bold text-white group-hover:text-red-400 transition-colors">
            {movie.title}
          </h3>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3 text-xs text-zinc-400">
          <span>{movie.durationMinutes} min</span>
          <span className="text-zinc-300 font-medium">Dublado / Legendado</span>
        </div>
      </div>
    </div>
  );
}
