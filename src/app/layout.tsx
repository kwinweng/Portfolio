import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KWIN WENG / 阿欢",
    template: "%s | KWIN WENG",
  },
  description:
    "Personal site, digital garden, and lab. AI workflows, product thinking, knowledge systems.",
  openGraph: {
    title: "KWIN WENG / 阿欢",
    description:
      "Personal site, digital garden, and lab. AI workflows, product thinking, knowledge systems.",
    url: "https://kwinweng.com",
    siteName: "KWIN WENG",
    type: "website",
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
