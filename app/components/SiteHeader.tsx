'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

// 他ページ（/privacyなど）からでもホームのセクションに移動できるよう、"/#about"形式にしている
const NAV_ITEMS = [
  { name: '自治会紹介', href: '/#about' },
  { name: 'お知らせ', href: '/#news' },
  { name: '行事予定', href: '/#events' },
  { name: '活動の様子', href: '/#gallery' },
  { name: '入会メリット', href: '/#benefits' },
  { name: 'よくある質問', href: '/#faq' },
  { name: 'アクセス', href: '/#map' },
];

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setMobileMenuOpen((v) => !v);

  return (
    <header className="sticky top-0 z-30 shadow-lg w-full overflow-hidden h-24">
      {/* 背景画像レイヤー */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/header-bg.png"
          alt=""
          fill
          className="object-cover object-center opacity-50"
          priority
        />
        {/* 白いもやをかけて文字を読みやすくする（backdrop-blurとの相性抜群） */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[1px]" />
      </div>
      {/* コンテンツレイヤー */}
      <div className="relative z-10 w-full h-full px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="flex justify-between items-center w-full">
          {/* 左側：ロゴとサイトタイトル */}
          <div className="flex items-center">
            <Link href="/" className="relative block w-16 h-16 overflow-hidden rounded-lg shadow-sm border border-white/80">
              <Image
                src="/favicon.png"
                alt="東岸町自治会 紋章"
                fill
                className="object-cover"
              />
            </Link>
            {/* 自治会名と地名のセット */}
            <div className="flex flex-col justify-between h-14 py-0.5 ml-3">
              <span className="w-full bg-blue-950 text-white text-xs px-2 py-0.5 rounded-full font-bold tracking-wider shadow-sm text-center flex items-center justify-center">
                さいたま市浦和区
              </span>
              <h1 className="text-2xl font-bold text-slate-900 leading-none drop-shadow-sm whitespace-nowrap">
                東岸町自治会
              </h1>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-slate-800 font-bold">
            {NAV_ITEMS.map((item) => (
              <a key={item.name} href={item.href} className="hover:text-orange-700 transition drop-shadow-sm">
                {item.name}
              </a>
            ))}
          </nav>
          {/* 右側：モバイル用メニューボタン */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMobileMenu} className="z-50 p-2">
              {mobileMenuOpen ? (
                <X size={28} className="text-orange-700" />
              ) : (
                <Menu size={28} className="text-orange-700" />
              )}
            </button>
            {mobileMenuOpen && (
              <div className="fixed inset-x-0 top-24 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-2xl z-40 animate-in fade-in slide-in-from-top-5 duration-300">
                <nav className="flex flex-col p-6 space-y-2">
                  {NAV_ITEMS.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)} // クリックしたら閉じる
                      className="text-lg font-bold text-slate-800 hover:text-orange-700 py-4 border-b border-slate-100 last:border-0"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
