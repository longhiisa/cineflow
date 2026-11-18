"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { MovieCard } from "@/components/MovieCard";
import { Movie } from "@/types/cinema";

const MOCK_MOVIES: Movie[] = [
  {
    id: "1",
    title: "Horizonte Carmesim",
    synopsis:
      "Em uma metrópole futurista mergulhada em sombras, um piloto renegado descobre uma conspiração capaz de apagar a memória de toda a humanidade.",
    durationMinutes: 148,
    genre: "Ficção Científica • Ação",
    rating: "14",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "O Último Ato em Veneza",
    synopsis:
      "Durante o festival de máscaras mais exclusivo da Europa, um detetive aposentado precisa desvendar um crime perfeito antes da meia-noite.",
    durationMinutes: 126,
    genre: "Suspense • Mistério",
    rating: "16",
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Velocidade Noturna",
    synopsis:
      "Nas estradas clandestinas de Tóquio, dois rivais históricos colocam tudo em jogo em uma corrida sem regras sob tempestade.",
    durationMinutes: 134,
    genre: "Ação • Corrida",
    rating: "12",
    posterUrl: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Ecos do Abismo",
    synopsis:
      "Uma expedição científica nas fossas oceânicas encontra uma estrutura milenar que nunca deveria ter sido despertada.",
    durationMinutes: 118,
    genre: "Terror • Ficção",
    rating: "16",
    posterUrl: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=800&auto=format&fit=crop",
  },
];

const GENRES = ["Todos", "Ação", "Ficção Científica", "Suspense", "Terror"];

export default function HomePage() {
  const [selectedGenre, setSelectedGenre] = useState("Todos");
  const [selectedDay, setSelectedDay] = useState("Hoje, 18 Nov");

  const featuredMovie = MOCK_MOVIES[0];

  const filteredMovies =
    selectedGenre === "Todos"
      ? MOCK_MOVIES
      : MOCK_MOVIES.filter((movie) =>
          movie.genre.toLowerCase().includes(selectedGenre.toLowerCase())
        );

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-red-600 selection:text-white">
      <Navbar />

      {/* HERO BANNER EM DESTAQUE */}
      <section className="relative flex min-h-[85vh] items-end pt-20 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop"
          alt="Sala de Cinema Cineflow"
          fill
          priority
          className="object-cover object-center opacity-45"
        />
        {/* Gradientes cinematográficos preto e vermelho */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/75 to-transparent" />
        <div className="absolute -left-32 bottom-10 h-96 w-96 rounded-full bg-red-600/20 blur-[130px]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-600/15 px-3.5 py-1 text-xs font-bold uppercase tracking-widest text-red-400">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              Estreia Exclusiva IMAX
            </div>

            <h1 className="text-5xl font-black tracking-tight text-white sm:text-7xl">
              {featuredMovie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-300">
              <span className="rounded bg-orange-600 px-2 py-0.5 text-xs font-extrabold text-white">
                {featuredMovie.rating}
              </span>
              <span>{featuredMovie.genre}</span>
              <span>•</span>
              <span>{featuredMovie.durationMinutes} min</span>
              <span>•</span>
              <span className="text-red-400 font-semibold">Dolby Atmos</span>
            </div>

            <p className="mt-5 text-base leading-relaxed text-zinc-300 sm:text-lg">
              {featuredMovie.synopsis}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/filme/${featuredMovie.id}`}
                className="flex items-center gap-2.5 rounded-full bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-red-600/30 transition hover:bg-red-500 hover:scale-105 active:scale-95"
              >
                Garantir Ingresso
              </Link>
              <button className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-7 py-4 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-md transition hover:border-red-500/50 hover:bg-white/10">
                Assistir Trailer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SEÇÃO EM CARTAZ + FILTROS INTERATIVOS */}
      <main id="em-cartaz" className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-red-500">
              Programação
            </span>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Filmes em Cartaz
            </h2>
          </div>

          {/* Seletor de Data */}
          <div className="flex flex-wrap gap-2">
            {["Hoje, 18 Nov", "Qui, 19 Nov", "Sex, 20 Nov", "Sáb, 21 Nov"].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`rounded-xl px-4 py-2 text-xs font-bold transition ${
                  selectedDay === day
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                    : "border border-white/10 bg-zinc-900 text-zinc-400 hover:border-white/25 hover:text-white"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por Gênero */}
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
                selectedGenre === genre
                  ? "bg-white text-zinc-950"
                  : "bg-zinc-900/80 text-zinc-400 border border-white/5 hover:border-red-500/40 hover:text-white"
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Grade de Filmes */}
        <div className="mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-4">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* BANNER VIP / EXPERIÊNCIA CINEFLOW */}
        <section className="relative mt-24 overflow-hidden rounded-3xl border border-red-600/30 bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/40 p-8 sm:p-12">
          <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <span className="rounded-md bg-red-600/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-red-400">
                Cineflow Black VIP
              </span>
              <h3 className="mt-3 text-2xl font-extrabold text-white sm:text-3xl">
                Poltronas reclináveis e combo entregue no seu assento.
              </h3>
              <p className="mt-2 text-sm text-zinc-400 sm:text-base">
                Escolha sua poltrona no mapa interativo, adicione pipoca gourmet e entre direto na sala com seu QR Code.
              </p>
            </div>
            <Link
              href="/filme/1"
              className="shrink-0 rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-600/30 transition hover:bg-red-500"
            >
              Explorar Salas VIP
            </Link>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="mt-20 border-t border-white/10 bg-black py-12">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-zinc-500 sm:flex-row">
          <div className="font-bold text-white">
            CINE<span className="text-red-600">FLOW</span>
          </div>
          <p>© 2026 Cineflow Cinemas. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
