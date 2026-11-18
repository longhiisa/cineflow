import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cineflow | A Melhor Experiência de Cinema",
  description: "Compre ingressos, escolha suas poltronas VIP e aproveite os melhores lançamentos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="bg-zinc-950 text-white antialiased">{children}</body>
    </html>
  );
}
