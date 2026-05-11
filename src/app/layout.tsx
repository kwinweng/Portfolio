import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kwinweng.com"),
  title: {
    default: "KWIN WENG / 阿欢",
    template: "%s | KWIN WENG",
  },
  description:
    "Personal site, digital garden, and lab. AI workflows, product thinking, knowledge systems.",
  keywords: ["KWIN WENG", "阿欢", "AI", "Quant", "Product", "Digital Garden"],
  authors: [{ name: "KWIN WENG" }],
  creator: "KWIN WENG",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "KWIN WENG / 阿欢",
    description:
      "Personal site, digital garden, and lab. AI workflows, product thinking, knowledge systems.",
    url: "https://kwinweng.com",
    siteName: "KWIN WENG",
    type: "website",
    locale: "zh_CN",
  },
  twitter: {
    card: "summary_large_image",
    title: "KWIN WENG / 阿欢",
    description:
      "Personal site, digital garden, and lab. AI workflows, product thinking, knowledge systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="bg-grid min-h-screen">{children}</body>
    </html>
  );
}
