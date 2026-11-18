"use client";

import Link from "next/link";
import { FormEvent, useState, useSyncExternalStore } from "react";
import { PageLayout } from "@/components/PageLayout";
import { getMovieById, getScreeningById } from "@/data/cinema";
import {
  clearBookingDraft,
  CinemaTicket,
  getBookingSnapshot,
  parseBookingSnapshot,
  saveTicket,
  subscribeToBooking,
} from "@/lib/demo-storage";

function createTicketCode() {
  return `CF-${Date.now().toString(36).toUpperCase()}`;
}

export default function CheckoutPage() {
  const bookingSnapshot = useSyncExternalStore(
    subscribeToBooking,
    getBookingSnapshot,
    () => null
  );
  const draft = parseBookingSnapshot(bookingSnapshot);
  const [ticket, setTicket] = useState<CinemaTicket | null>(null);

  const movie = draft ? getMovieById(draft.movieId) : undefined;
  const screening = draft ? getScreeningById(draft.screeningId) : undefined;
  const total = screening && draft ? screening.price * draft.seatIds.length : 0;

  function confirmBooking(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!draft || !movie || !screening) return;

    const formData = new FormData(event.currentTarget);
    const newTicket: CinemaTicket = {
      code: createTicketCode(),
      movieId: movie.id,
      screeningId: screening.id,
      seatIds: draft.seatIds,
      customerName: String(formData.get("name")),
      customerEmail: String(formData.get("email")),
      total,
      createdAt: new Date().toISOString(),
    };

    saveTicket(newTicket);
    clearBookingDraft();
    setTicket(newTicket);
  }

  if (ticket) {
    return (
      <PageLayout>
        <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
          <span className="text-4xl" aria-hidden="true">✓</span>
          <h1 className="mt-4 text-3xl font-black">Ingresso demonstrativo criado</h1>
          <p className="mt-3 text-zinc-300">
            Código <strong className="text-white">{ticket.code}</strong> ·{" "}
            {ticket.seatIds.join(", ")}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Nenhum pagamento foi realizado. Este ingresso existe somente neste navegador.
          </p>
          <Link
            href="/meus-ingressos"
            className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-500"
          >
            Ver meus ingressos
          </Link>
        </section>
      </PageLayout>
    );
  }

  if (!draft || !movie || !screening) {
    return (
      <PageLayout>
        <section className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-zinc-900 p-8 text-center">
          <h1 className="text-2xl font-bold">Seu pedido está vazio</h1>
          <p className="mt-3 text-zinc-400">
            Escolha um filme, uma sessão e seus assentos antes de continuar.
          </p>
          <Link
            href="/#em-cartaz"
            className="mt-6 inline-flex rounded-full bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-500"
          >
            Ver filmes em cartaz
          </Link>
        </section>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="mx-auto max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
          Última etapa
        </span>
        <h1 className="mt-2 text-4xl font-black">Confirmar pedido</h1>
        <section className="mt-6 rounded-2xl border border-white/10 bg-zinc-900 p-5">
          <h2 className="text-xl font-bold">{movie.title}</h2>
          <p className="mt-2 text-sm text-zinc-400">
            {screening.dateLabel} · {screening.startTime} · {screening.roomName}
          </p>
          <p className="mt-2 text-sm text-zinc-400">
            Assentos: {draft.seatIds.join(", ")}
          </p>
          <p className="mt-4 border-t border-white/10 pt-4 text-xl font-bold">
            Total demonstrativo: R$ {total.toFixed(2)}
          </p>
        </section>

        <form
          onSubmit={confirmBooking}
          className="mt-6 space-y-5 rounded-2xl border border-white/10 bg-zinc-900 p-5"
        >
          <p className="text-sm text-amber-200">
            Protótipo: não coleta dados de cartão, não cobra e não emite ingresso real.
          </p>
          <label className="block text-sm font-medium text-zinc-300">
            Nome
            <input
              name="name"
              required
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-red-500"
            />
          </label>
          <label className="block text-sm font-medium text-zinc-300">
            E-mail
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-red-500"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-red-600 px-6 py-3.5 font-bold text-white transition hover:bg-red-500"
          >
            Criar ingresso demonstrativo
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
