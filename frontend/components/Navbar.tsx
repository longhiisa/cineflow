"use client";

import Link from "next/link";
import { useState } from "react";

const navigationLinks = [
  { href: "/#em-cartaz", label: "Em Cartaz" },
  { href: "/em-breve", label: "Em Breve" },
  { href: "/bomboniere", label: "Bomboniere" },
  { href: "/meus-ingressos", label: "Meus Ingressos" },
];

export function Navbar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:h-20 sm:px-6">
        {/* Logo */}
        <Link href="/" className="group flex min-w-0 shrink items-center gap-2">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-red-600 to-rose-700 text-sm font-black text-white shadow-lg shadow-red-600/30 transition-transform group-hover:scale-105 sm:h-10 sm:w-10 sm:text-base">
            CF
          </div>
          <span className="truncate text-lg font-extrabold tracking-tight text-white sm:text-2xl">
            CINE<span className="text-red-600">FLOW</span>
          </span>
        </Link>

        {/* Links centrais */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-zinc-300 lg:flex xl:gap-8">
          {navigationLinks.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`transition hover:text-red-500 ${index === 0 ? "text-white" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Ações à direita */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          {searchOpen ? (
            <input
              type="text"
              placeholder="Buscar filme..."
              autoFocus
              onBlur={() => setSearchOpen(false)}
              className="hidden w-32 rounded-full border border-red-600/50 bg-zinc-900 px-4 py-1.5 text-sm text-white placeholder-zinc-500 outline-none transition-all sm:block sm:w-36 lg:w-44"
            />
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Buscar"
              className="hidden rounded-full p-2 text-zinc-400 transition hover:bg-white/5 hover:text-white sm:block"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
              </svg>
            </button>
          )}

          <Link
            href="/login"
            className="rounded-full bg-red-600 px-3 py-2 text-xs font-semibold text-white shadow-lg shadow-red-600/25 transition hover:bg-red-500 active:scale-95 sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Entrar
          </Link>
          <button
            type="button"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-300 transition hover:bg-white/10 hover:text-white lg:hidden"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path strokeLinecap="round" d="m6 6 12 12M18 6 6 18" />
              ) : (
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {menuOpen ? (
        <nav
          id="mobile-navigation"
          className="border-t border-white/10 bg-zinc-950 px-4 py-3 lg:hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-col">
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
