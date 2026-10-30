import type { Metadata } from "next";
import { Public_Sans } from "next/font/google";
import { copy } from "@/src/copy.it";
import "./globals.css";

// next/font/google downloads the font at build time and serves it from the build:
// no request to Google at runtime.
const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-public-sans", display: "swap" });

export const metadata: Metadata = {
  title: copy.meta.title,
  description: copy.meta.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={publicSans.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
