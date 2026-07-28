import type { Metadata } from "next";
import CurrencyProvider from "@/app/components/CurrencyProvider";
import "./globals.css";
export const dynamic = "force-static";

export const metadata: Metadata = {
  metadataBase: new URL("https://brickoria-store.wallobn04.chatgpt.site"),
  title: "Brickoria — Costruisci la tua prossima storia",
  description: "Set LEGO originali per bambini, famiglie, appassionati e collezionisti. Consulenza regalo e assistenza WhatsApp 24/7.",
  icons: { icon: "/og.png" },
  openGraph: {
    title: "Brickoria — Costruisci la tua prossima storia",
    description: "Set originali, idee regalo e assistenza personale per ogni tipo di costruttore.",
    type: "website",
    url: "https://brickoria-store.wallobn04.chatgpt.site",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Brickoria — Costruisci la tua prossima storia" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Brickoria — Costruisci la tua prossima storia",
    description: "Set originali per bambini, famiglie e collezionisti.",
    images: ["/og.png"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body><CurrencyProvider>{children}</CurrencyProvider></body>
    </html>
  );
}
