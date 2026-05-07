import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "./components";

export const metadata: Metadata = {
  title: "MES Detailing — Profesionalno čiščenje vozil",
  description:
    "Profesionalno zunanje, notranje in globinsko čiščenje vozil. Elegantno, natančno in brez nepotrebnega kompliciranja.",
  keywords: "car detailing, čiščenje avtomobila, detailing slovenija, pranje avta, globinsko čiščenje",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
