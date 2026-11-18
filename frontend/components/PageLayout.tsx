import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="mx-auto min-h-[calc(100vh-12rem)] max-w-7xl px-6 pb-16 pt-28">
        {children}
      </main>
      <footer className="border-t border-white/10 bg-black px-6 py-10 text-center text-sm text-zinc-500">
        <p className="font-bold text-white">
          CINE<span className="text-red-600">FLOW</span>
        </p>
        <p className="mt-2">© 2026 Cineflow Cinemas. Todos os direitos reservados.</p>
      </footer>
    </>
  );
}
