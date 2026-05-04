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

export const metadata: Metadata = {
  title: {
    default: "東岸町自治会 公式サイト",
    template: "%s | 東岸町自治会"
  },
  description: "さいたま市浦和区・東岸自治会の公式ホームページです。地域の行事、ゴミ収集日、防災情報など、住民の皆様に役立つ情報を発信しています。",
  keywords: ["東岸町自治会", "自治会", "東岸町", "浦和区", "さいたま市", "防災", "地域活動"],
  robots: "noindex, nofollow", // これでGoogle等の検索結果に出なくなります（関係者限定公開用）

  // LINEやSNSでシェアした時の見栄え（OGP設定）
  openGraph: {
    title: "東岸町自治会 公式サイト",
    description: "地域の「安心・安全」をつなぐ、東岸町自治会の公式ページです。",
    url: "https://urawa-higashikishi.github.io/urawa-higashikishi-hp/",
    siteName: "東岸町自治会",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://urawa-higashikishi.github.io/urawa-higashikishi-hp/header-bg.png", // 自治会便りの画像をプレビューに流用
        width: 1200,
        height: 630,
        alt: "東岸町自治会",
      },
    ],
  },
    icons: {
    icon: "/urawa-higashikishi-hp/favicon.png", // または .ico
  },
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
