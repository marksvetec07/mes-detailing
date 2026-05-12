import type { Metadata, Viewport } from "next";
import { DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "./components";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bebas",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MES Detailing — Profesionalno čiščenje vozil",
  description:
    "Profesionalno zunanje, notranje in globinsko čiščenje vozil. Elegantno, natančno in brez nepotrebnega kompliciranja.",
  keywords: "car detailing, čiščenje avtomobila, detailing slovenija, pranje avta, globinsko čiščenje",
  robots: "index, follow",
  openGraph: {
    title: "MES Detailing — Profesionalno čiščenje vozil",
    description: "Profesionalno zunanje, notranje in globinsko čiščenje vozil.",
    type: "website",
    locale: "sl_SI",
  },
};

export const viewport: Viewport = {
  themeColor: "#2b2723",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sl" className={`${dmSans.variable} ${bebasNeue.variable}`}>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
