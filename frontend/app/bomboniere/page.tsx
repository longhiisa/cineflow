"use client";

import { useState } from "react";
import { PageLayout } from "@/components/PageLayout";
import { SNACKS } from "@/data/cinema";

export default function ConcessionsPage() {
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [orderSent, setOrderSent] = useState(false);

  const itemCount = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0
  );
  const total = SNACKS.reduce(
    (sum, snack) => sum + snack.price * (quantities[snack.id] ?? 0),
    0
  );

  function updateQuantity(id: string, change: number) {
    setOrderSent(false);
    setQuantities((current) => ({
      ...current,
      [id]: Math.max(0, (current[id] ?? 0) + change),
    }));
  }

  return (
    <PageLayout>
      <div className="mb-10">
        <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
          Seu filme merece
        </span>
        <h1 className="mt-2 text-4xl font-black sm:text-5xl">Bomboniere</h1>
        <p className="mt-3 max-w-2xl text-zinc-400">
          Monte seu pedido demonstrativo e retire no balcão antes da sessão.
        </p>
      </div>

      {orderSent ? (
        <div className="mb-8 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-emerald-200">
          Pedido demonstrativo registrado. O pagamento e a retirada não são
          processados por este protótipo.
        </div>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        {SNACKS.map((snack) => (
          <article
            key={snack.id}
            className="flex flex-wrap items-center gap-3 rounded-2xl border border-white/10 bg-zinc-900/60 p-3 sm:flex-nowrap sm:gap-4 sm:p-5"
          >
            <span
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-zinc-950 text-2xl sm:h-16 sm:w-16 sm:text-3xl"
            >
              {snack.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold">{snack.name}</h2>
              <p className="mt-1 text-sm text-zinc-400">{snack.description}</p>
              <p className="mt-2 font-semibold text-red-400">
                R$ {snack.price.toFixed(2)}
              </p>
            </div>
            <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                aria-label={`Remover ${snack.name}`}
                onClick={() => updateQuantity(snack.id, -1)}
                disabled={!quantities[snack.id]}
                className="h-8 w-8 rounded-full border border-white/15 text-lg disabled:opacity-40 sm:h-9 sm:w-9"
              >
                −
              </button>
              <span className="w-4 text-center sm:w-5" aria-live="polite">
                {quantities[snack.id] ?? 0}
              </span>
              <button
                type="button"
                aria-label={`Adicionar ${snack.name}`}
                onClick={() => updateQuantity(snack.id, 1)}
                className="h-8 w-8 rounded-full bg-red-600 text-lg sm:h-9 sm:w-9"
              >
                +
              </button>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-zinc-900 p-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-zinc-300">
          {itemCount} {itemCount === 1 ? "item" : "itens"} ·{" "}
          <strong className="text-white">R$ {total.toFixed(2)}</strong>
        </p>
        <button
          type="button"
          disabled={!itemCount}
          onClick={() => setOrderSent(true)}
          className="rounded-full bg-red-600 px-6 py-3 text-sm font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Confirmar pedido demonstrativo
        </button>
      </div>
    </PageLayout>
  );
}
