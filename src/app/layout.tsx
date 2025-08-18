import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Providers from "./Providers";

// components
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Codify",
  description: "Your go to platform to learn javascript",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={figtree.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <Navbar />
          {children}
          <Footer />
          <SpeedInsights />
        </Providers>
      </body>
    </html>
  );
}
