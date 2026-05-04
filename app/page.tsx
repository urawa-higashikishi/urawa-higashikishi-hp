'use client';

import React, { useState } from 'react';
import { Bell, Calendar, MapPin, ChevronDown, Download, Users, Shield, Heart, Menu, X } from 'lucide-react';
import Image from 'next/image'; 

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const faqs = [
    {
      question: '自治会に入会するにはどうすればいいですか？',
      answer: '自治会事務局までお問い合わせください。入会手続きをご案内いたします。'
    },
    {
      question: '会費はどのくらいですか？',
      answer: '年間会費は5,000円です。'
    },
    {
      question: 'イベントの参加方法は？',
      answer: '自治会ホームページや掲示板で告知されます。参加希望の方は事務局までご連絡ください。'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-30 shadow-lg w-full overflow-hidden h-24">
        {/* 背景画像レイヤー */}
        <div className="absolute inset-0 z-0">
            <Image 
            src="/urawa-higashikishi-hp/header-bg.png" 
            alt="背景" 
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
              {/* 作成したロゴを表示 */}
              <div className="relative w-12 h-12 overflow-hidden rounded-lg shadow-sm border border-slate-200">
                <Image 
                  src="/urawa-higashikishi-hp/favicon.png" 
                  alt="浦和区東岸町自治会 紋章" 
                  fill
                  className="object-cover"
                />
              </div>
              <h1 className="ml-4 md:text-2xl font-bold text-slate-900 drop-shadow-sm">浦和東岸町自治会</h1>
            </div>
            <nav className="hidden md:flex space-x-6 text-slate-800 font-bold">
              <a href="#about" className="hover:text-orange-700 transition drop-shadow-sm">自治会紹介</a>
              <a href="#news" className="hover:text-orange-700 transition drop-shadow-sm">お知らせ</a>
              <a href="#events" className="hover:text-orange-700 transition drop-shadow-sm">行事予定</a>
              <a href="#benefits" className="hover:text-orange-700 transition drop-shadow-sm">入会メリット</a>
              <a href="#faq" className="hover:text-orange-700 transition drop-shadow-sm">よくある質問</a>
              <a href="#map" className="hover:text-orange-700 transition drop-shadow-sm">アクセス</a>
            </nav>
            {/* 右側：モバイル用メニューボタン */}
            <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu} className="z-50 p-2">
              {/* ボタンのアイコン切り替え */}
                  {mobileMenuOpen ? (
                   <X size={28} className="text-orange-700" />
                   ) : (
                      <Menu size={28} className="text-orange-700" />
                   )}
              </button>
              {mobileMenuOpen && (
                <div className="fixed inset-x-0 top-24 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-2xl z-40 animate-in fade-in slide-in-from-top-5 duration-300">
                  <nav className="flex flex-col p-6 space-y-2">
                    {[
                      { name: "自治会紹介", href: "#about" },
                      { name: "お知らせ", href: "#news" },
                      { name: "行事予定", href: "#events" },
                      { name: "入会メリット", href: "#benefits" },
                      { name: "よくある質問", href: "#faq" },
                      { name: "アクセス", href: "#map" },
                    ].map((item) => (
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

      {/* Hero Section */}
      {/* <section className="py-24"> */}
      <section className="relative py-24">
        {/* コンテンツ */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-orange-100 bg-white shadow-xl p-14 text-center">
            <div className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-orange-100 opacity-80 blur-2xl"></div>
            <p className="relative inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 mb-6">地域のつながりを育む</p>
            <h2 className="relative text-5xl font-extrabold tracking-tight text-slate-900 mb-6">つながりを育む。安全で安心な地域づくり</h2>
            <p className="relative mx-auto max-w-2xl text-xl text-slate-600 mb-10">住民一人ひとりが支え合う、活気に満ちた浦和東岸町の暮らしを創造します。</p>
            <button className="relative inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 transition">
              入会のお問い合わせ
            </button>
          </div>
        </div>
      </section>

      {/* 自治会紹介 */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-white shadow-lg border border-slate-200 p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500 mb-4">自治会の主な活動</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">自治会紹介</h3>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  浦和東岸町自治会は、浦和東岸町地区の住民が集まり、地域の安全と快適な生活を目的とした組織です。
                  防犯活動、環境美化、コミュニティイベントなどを通じて、みんなで地域を守っています。
                </p>
                <p>
                  会員数は約500世帯。地域の声を反映した活動を行っています。
                </p>
              </div>
              <div className="bg-amber-50 p-10 rounded-[2rem] shadow-lg border border-orange-100">
                <h4 className="text-xl font-semibold text-slate-900 mb-6">主な活動</h4>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Shield className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">防犯パトロール</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Heart className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">ゴミ拾い活動</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">季節のイベント</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Users className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">福祉活動</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ＆PDF */}
      <section id="news" className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-white shadow-lg border border-slate-200 p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500 mb-4">自治会の最新情報</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">最新のお知らせ</h3>
            <div className="space-y-8">
              <div className="bg-slate-50 p-10 rounded-[2rem] shadow-lg border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 mr-3">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">お知らせリスト</h4>
                    <p className="text-slate-500">最新の地域情報を縦にご紹介します。</p>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-600">
                  <li>• （仮）2026年夏祭りの開催日が決定しました。</li>
                  <li>• （仮）新年度の入会受付を開始します。</li>
                  <li>• （仮）防犯パトロールの参加者を募集しています。</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-10 rounded-[2rem] shadow-lg border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 mr-3">
                    <Download className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">最新の自治会便り</h4>
                    <p className="text-slate-500">PDFプレビューをご確認ください。</p>
                  </div>
                </div>
                <div className="mb-6 overflow-hidden rounded-[2rem] border border-slate-200 shadow-2xl mx-auto max-w-4xl">
                  <img src="/urawa-higashikishi-hp/newsletter.jpg" alt="自治会便りプレビュー" className="w-full h-auto object-cover" />
                </div>
                <p className="text-slate-600 mb-6">最新号の自治会便りをダウンロードして、活動情報をチェックしましょう。</p>
                <button className="inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-white font-semibold shadow-lg hover:bg-orange-600 transition">
                  PDFダウンロード
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メリット */}
      <section id="benefits" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-white shadow-lg border border-slate-200 p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500 mb-4">加入するメリット</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">自治会に入会するメリット</h3>
            <div className="space-y-8">
              <div className="bg-slate-50 p-8 rounded-[2rem] shadow-lg border border-slate-200 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 shadow-sm">
                  <Shield className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">安全・安心</h4>
                <p className="text-slate-600">防犯活動により、地域の安心を守ります。</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2rem] shadow-lg border border-slate-200 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 shadow-sm">
                  <Heart className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">コミュニティ</h4>
                <p className="text-slate-600">住民同士のつながりを深め、助け合いを育みます。</p>
              </div>
              <div className="bg-slate-50 p-8 rounded-[2rem] shadow-lg border border-slate-200 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600 shadow-sm">
                  <Users className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">イベント参加</h4>
                <p className="text-slate-600">様々な行事に参加し、充実した時間を過ごせます。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 行事予定 */}
      <section id="events" className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">行事予定</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-orange-600 mr-2" />
                  <h4 className="text-lg font-semibold text-slate-900">夏祭り</h4>
                </div>
                <p className="text-slate-600">日時: XX月XX日 10:00-16:00</p>
                <p className="text-slate-600">場所: 自治会館前</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-orange-600 mr-2" />
                  <h4 className="text-lg font-semibold text-slate-900">防犯パトロール</h4>
                </div>
                <p className="text-slate-600">日時: 毎週土曜日 9:00-11:00</p>
                <p className="text-slate-600">場所: 地区内</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-orange-600 mr-2" />
                  <h4 className="text-lg font-semibold text-slate-900">新年会</h4>
                </div>
                <p className="text-slate-600">日時: 1月10日 18:00-20:00</p>
                <p className="text-slate-600">場所: 自治会館</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Q&A */}
      <section id="faq" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">よくある質問</h3>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-slate-50 rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full text-left p-6 focus:outline-none"
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold text-slate-900">{faq.question}</h4>
                      <ChevronDown
                        className={`h-5 w-5 text-orange-500 transform transition-transform ${
                          openFAQ === index ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-6">
                      <p className="text-slate-600">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 地図 */}
      <section id="map" className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">アクセス</h3>
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-orange-600 mr-2" />
              <p className="text-slate-600">東岸町自治会</p>
            </div>
            <div className="overflow-hidden rounded-3xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3233.7070591003076!2d139.66134449999998!3d35.85618600000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018ea9ac6828feb%3A0x5b94fd0e08fe1a6c!2z5p2x5bK455S66Ieq5rK75Lya!5e0!3m2!1sja!2sjp!4v1777809319029!5m2!1sja!2sjp"
                width="100%"
                height="420"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-orange-950 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">浦和東岸町自治会</h4>
              <p className="text-slate-300">地域の安全と快適な生活のために</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">連絡先</h4>
              <p className="text-slate-300">電話: 048-123-XXXX</p>
              <p className="text-slate-300">メール: urawa-higashikishi@gmail.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">リンク</h4>
              <ul className="text-slate-300 space-y-1">
                <li><a href="#" className="hover:text-white">プライバシーポリシー</a></li>
                <li><a href="#" className="hover:text-white">利用規約</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-300">
            <p>&copy; 2026 浦和東岸町自治会. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}