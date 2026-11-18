"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PageLayout } from "@/components/PageLayout";
import { BookingDraft, saveBookingDraft } from "@/lib/demo-storage";

const ROWS = ["A", "B", "C", "D", "E", "F"];
const SEATS_PER_ROW = 8;
const RESERVED_SEATS = new Set(["A4", "B5", "C6", "D3", "E7", "F4"]);

interface SeatSelectionProps {
  movieId: string;
  movieTitle: string;
  screeningId: string;
  screeningLabel: string;
  roomName: string;
  price: number;
}

export function SeatSelection({
  movieId,
  movieTitle,
  screeningId,
  screeningLabel,
  roomName,
  price,
}: SeatSelectionProps) {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [message, setMessage] = useState("");

  function toggleSeat(seatId: string) {
    setMessage("");
    setSelectedSeats((current) => {
      if (current.includes(seatId)) {
        return current.filter((seat) => seat !== seatId);
      }
      if (current.length >= 6) {
        setMessage("Você pode selecionar até 6 assentos por compra.");
        return current;
      }
      return [...current, seatId];
    });
  }

  function continueToCheckout() {
    if (!selectedSeats.length) {
      setMessage("Selecione pelo menos um assento para continuar.");
      return;
    }

    const draft: BookingDraft = { movieId, screeningId, seatIds: selectedSeats };
    saveBookingDraft(draft);
    router.push("/checkout");
  }

  return (
    <PageLayout>
      <div className="mb-8">
        <p className="text-sm text-zinc-400">{movieTitle}</p>
        <h1 className="mt-1 text-3xl font-black sm:text-4xl">
          Escolha seus assentos
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          {screeningLabel} · {roomName} · R$ {price.toFixed(2)} por ingresso
        </p>
      </div>

      <section className="rounded-3xl border border-white/10 bg-zinc-900/60 p-3 sm:p-8">
        <div className="mx-auto mb-10 max-w-2xl sm:mb-12">
          <div className="h-2 rounded-[50%] bg-gradient-to-r from-transparent via-red-400 to-transparent shadow-[0_12px_30px_-8px_rgba(248,113,113,0.65)]" />
          <p className="mt-4 text-center text-xs font-bold uppercase tracking-[0.3em] text-zinc-500">
            Tela
          </p>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="mx-auto w-fit space-y-3">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center gap-px sm:gap-3">
              <span className="w-3.5 text-center text-[10px] font-bold text-zinc-500 sm:w-5 sm:text-xs">
                {row}
              </span>
              {Array.from({ length: SEATS_PER_ROW }, (_, index) => {
                const seatId = `${row}${index + 1}`;
                const reserved = RESERVED_SEATS.has(seatId);
                const selected = selectedSeats.includes(seatId);

                return (
                  <button
                    key={seatId}
                    type="button"
                    disabled={reserved}
                    aria-label={`Assento ${seatId}${reserved ? ", ocupado" : selected ? ", selecionado" : ""}`}
                    aria-pressed={selected}
                    onClick={() => toggleSeat(seatId)}
                    className={`h-8 w-[26px] rounded-t-lg rounded-b-md text-[10px] font-bold transition sm:h-10 sm:w-10 sm:text-xs ${
                      reserved
                        ? "cursor-not-allowed bg-zinc-700 text-zinc-500"
                        : selected
                          ? "bg-red-500 text-white ring-2 ring-red-300"
                          : "bg-emerald-700/80 text-emerald-100 hover:bg-emerald-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
              <span className="hidden w-5 text-center text-xs font-bold text-zinc-500 sm:block">
                {row}
              </span>
            </div>
          ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-zinc-400 sm:gap-5">
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-sm bg-emerald-700" /> Disponível
          </span>
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-sm bg-red-500" /> Selecionado
          </span>
          <span className="flex items-center gap-2">
            <i className="h-3 w-3 rounded-sm bg-zinc-700" /> Ocupado
          </span>
        </div>
      </section>

      <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            {selectedSeats.length
              ? `Assentos: ${selectedSeats.join(", ")}`
              : "Nenhum assento selecionado"}
          </p>
          <p className="mt-1 text-xl font-bold">
            Total: R$ {(selectedSeats.length * price).toFixed(2)}
          </p>
          {message ? (
            <p role="alert" className="mt-2 text-sm text-red-300">
              {message}
            </p>
          ) : null}
        </div>
        <button
          type="button"
          onClick={continueToCheckout}
          className="rounded-full bg-red-600 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-red-500"
        >
          Continuar
        </button>
      </div>
    </PageLayout>
  );
}
