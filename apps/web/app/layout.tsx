import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted font files (app/fonts): no third-party font requests at runtime.
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pre-screening ambito NIS2 (in sviluppo)",
  description: "Strumento informativo open source di pre-screening dell'ambito NIS2 italiano. Non è consulenza.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
