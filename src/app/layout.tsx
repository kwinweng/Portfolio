import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Kwin Weng — Investor & Product Builder",
    template: "%s | Kwin Weng",
  },
  description:
    "Building AI systems for investing, finance, knowledge, and intelligence workflows.",
  openGraph: {
    title: "Kwin Weng — Investor & Product Builder",
    description:
      "Building AI systems for investing, finance, knowledge, and intelligence workflows.",
    url: "https://kwinweng.com",
    siteName: "Kwin Weng",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="min-h-screen flex flex-col antialiased">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
