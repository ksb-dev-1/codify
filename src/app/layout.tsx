import type { Metadata } from "next";
import { Inter, Public_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

// components
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Public_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Codify",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        //className={inter.className}
        suppressHydrationWarning={true}
      >
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
