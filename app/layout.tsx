import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 自治会名に変更し、検索エンジンに載らないように設定
export const metadata: Metadata = {
  title: "浦和東岸自治会",
  description: "浦和東岸自治会の公式ホームページです。地域の皆様へのお知らせを発信しています。",
  robots: "noindex, nofollow", // これでGoogle等の検索結果に出なくなります（関係者限定公開用）
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ja" // 英語(en)から日本語(ja)に変更
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
