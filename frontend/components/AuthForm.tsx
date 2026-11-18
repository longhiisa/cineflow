"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

interface AuthFormProps {
  mode: "login" | "register";
}

export function AuthForm({ mode }: AuthFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const registering = mode === "register";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="mx-auto max-w-lg rounded-3xl border border-white/10 bg-zinc-900/70 p-6 sm:p-9">
      <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-500">
        Cineflow
      </span>
      <h1 className="mt-2 text-3xl font-black">
        {registering ? "Criar conta" : "Bem-vindo de volta"}
      </h1>
      <p className="mt-3 text-sm text-zinc-400">
        {registering
          ? "Cadastre-se para acompanhar seus pedidos."
          : "Entre para acompanhar seus pedidos e ingressos."}
      </p>

      {submitted ? (
        <p
          role="status"
          className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-100"
        >
          Esta tela é demonstrativa. A autenticação ainda não está conectada a um servidor e nenhum dado foi salvo.
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {registering ? (
          <label className="block text-sm font-medium text-zinc-300">
            Nome
            <input
              name="name"
              required
              autoComplete="name"
              className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-red-500"
            />
          </label>
        ) : null}
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
        <label className="block text-sm font-medium text-zinc-300">
          Senha
          <input
            name="password"
            type="password"
            required
            minLength={8}
            autoComplete={registering ? "new-password" : "current-password"}
            className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-950 px-4 py-3 text-white outline-none focus:border-red-500"
          />
          {registering ? (
            <span className="mt-1 block text-xs text-zinc-500">
              Mínimo de 8 caracteres.
            </span>
          ) : null}
        </label>
        <button
          type="submit"
          className="w-full rounded-full bg-red-600 px-6 py-3.5 font-bold text-white transition hover:bg-red-500"
        >
          {registering ? "Criar conta demonstrativa" : "Entrar"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-400">
        {registering ? "Já tem conta?" : "Ainda não tem conta?"}{" "}
        <Link
          href={registering ? "/login" : "/cadastro"}
          className="font-semibold text-red-400 hover:text-red-300"
        >
          {registering ? "Entrar" : "Cadastre-se"}
        </Link>
      </p>
      <p className="mt-4 text-center text-sm">
        <Link href="/meus-ingressos" className="text-zinc-400 hover:text-white">
          Acessar ingressos deste navegador
        </Link>
      </p>
    </section>
  );
}
