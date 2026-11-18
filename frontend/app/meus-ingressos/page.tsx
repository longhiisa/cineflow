"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { PageLayout } from "@/components/PageLayout";
import { getMovieById, getScreeningById } from "@/data/cinema";
import {
  getTicketsSnapshot,
  parseTicketsSnapshot,
  subscribeToTickets,
} from "@/lib/demo-storage";

export default function MyTicketsPage() {
  const ticketsSnapshot = useSyncExternalStore(
    subscribeToTickets,
    getTicketsSnapshot,
    () => null
  );
  const tickets = parseTicketsSnapshot(ticketsSnapshot);

  return (
    <PageLayout>
      <div className="mb-8">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
          Sua conta
        </span>
        <h1 className="mt-2 text-4xl font-black">Meus ingressos</h1>
        <p className="mt-3 text-zinc-400">
          Ingressos demonstrativos salvos neste navegador.
        </p>
      </div>

      {tickets.length ? (
        <div className="space-y-4">
          {tickets.map((ticket) => {
            const movie = getMovieById(ticket.movieId);
            const screening = getScreeningById(ticket.screeningId);

            return (
              <article
                key={ticket.code}
                className="grid gap-4 rounded-2xl border border-white/10 bg-zinc-900/70 p-5 sm:grid-cols-[1fr_auto] sm:items-center"
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-red-400">
                    {ticket.code}
                  </p>
                  <h2 className="mt-2 text-xl font-bold">
                    {movie?.title ?? "Filme indisponível"}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {screening
                      ? `${screening.dateLabel} · ${screening.startTime} · ${screening.roomName}`
                      : "Sessão indisponível"}
                  </p>
                  <p className="mt-1 text-sm text-zinc-300">
                    Assentos: {ticket.seatIds.join(", ")}
                  </p>
                </div>
                <div className="sm:text-right">
                  <p className="font-bold">R$ {ticket.total.toFixed(2)}</p>
                  <p className="mt-1 text-xs text-amber-300">Demonstração · não pago</p>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <section className="rounded-3xl border border-white/10 bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-bold">Você ainda não tem ingressos</h2>
          <p className="mt-3 text-zinc-400">
            Escolha um filme e conclua o fluxo demonstrativo para ver seus pedidos aqui.
          </p>
          <Link
            href="/#em-cartaz"
            className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-500"
          >
            Explorar filmes
          </Link>
        </section>
      )}
    </PageLayout>
  );
}
