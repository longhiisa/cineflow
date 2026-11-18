"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-700 font-black text-white shadow-lg shadow-red-600/30 transition-transform group-hover:scale-105">
            CF
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-white">
            CINE<span className="text-red-600">FLOW</span>
          </span>
        </Link>

        {/* Links centrais */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
          <Link href="#em-cartaz" className="text-white transition hover:text-red-500">
            Em Cartaz
          </Link>
          <Link href="#em-breve" className="transition hover:text-red-500">
            Em Breve
          </Link>
          <Link href="#bomboniere" className="transition hover:text-red-500">
            Bomboniere
          </Link>
          <Link href="/meus-ingressos" className="transition hover:text-red-500">
            Meus Ingressos
          </Link>
        </nav>

        {/* Ações à direita */}
        <div className="flex items-center gap-4">
          {searchOpen ? (
            <input
              type="text"
              placeholder="Buscar filme..."
              autoFocus
              onBlur={() => setSearchOpen(false)}
              className="w-44 rounded-full border border-red-600/50 bg-zinc-900 px-4 py-1.5 text-sm text-white placeholder-zinc-500 outline-none transition-all"
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="rounded-full p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
            </button>
          )}

          <Link
            href="/login"
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 active:scale-95"
          >
            Entrar
          </Link>
        </div>
      </div>
    </header>
  );
}
