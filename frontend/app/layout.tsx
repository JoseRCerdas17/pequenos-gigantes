import type { Metadata } from "next";
import { Nunito, Lora } from "next/font/google";
import "./globals.css";
import WhatsAppButton from "./components/ui/WhatsAppButton";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-sans",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "Pequeños Gigantes | Guardería Infantil",
  description: "Guardería infantil en Liberia, Guanacaste. Un lugar seguro, cálido y estimulante donde tu hijo crece feliz.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32" },
      { url: "/favicon-16x16.png", sizes: "16x16" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} ${lora.variable} ${nunito.className} bg-surface text-text antialiased`}>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
