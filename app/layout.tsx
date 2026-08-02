import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const GA_MEASUREMENT_ID = "G-E6DEGPSZ4M";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://higashikishi.com/"),
  title: {
    default: "東岸町自治会 公式サイト",
    template: "%s | 東岸町自治会"
  },
  description: "さいたま市浦和区・東岸自治会の公式ホームページです。地域の行事、ゴミ収集日、防災情報など、住民の皆様に役立つ情報を発信しています。",
  keywords: ["東岸町自治会", "自治会", "東岸町", "浦和区", "さいたま市", "防災", "地域活動"],

  // LINEやSNSでシェアした時の見栄え（OGP設定）
  openGraph: {
    title: "東岸町自治会 公式サイト",
    description: "地域の「安心・安全」をつなぐ、東岸町自治会の公式ページです。",
    url: "https://higashikishi.com/",
    siteName: "東岸町自治会",
    locale: "ja_JP",
    type: "website",
    images: [
      {
        url: "https://higashikishi.com/favicon.png", // 自治会便りの画像をプレビューに流用
        width: 1200,
        height: 630,
        alt: "東岸町自治会",
      },
    ],
  },
  icons: {
    icon: [{ url: "/favicon-icon.png", sizes: "192x192", type: "image/png" }],
  },
};

// AIやAI検索エンジンがサイトの主体を正しく識別できるようにする構造化データ
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "東岸町自治会",
  alternateName: "ひがしきしちょうじちかい",
  url: "https://higashikishi.com/",
  logo: "https://higashikishi.com/favicon.png",
  description:
    "さいたま市浦和区東岸町の住民組織。防犯・環境美化・コミュニティイベントなど地域の安全と快適な生活を目的とした自治会です。",
  email: "urawa-higashikishi@gmail.com",
  areaServed: {
    "@type": "AdministrativeArea",
    name: "さいたま市浦和区東岸町",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </html>
  );
}
