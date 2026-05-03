'use client';

import React, { useState } from 'react';
import { Bell, Calendar, MapPin, ChevronDown, Download, Users, Shield, Heart } from 'lucide-react';

export default function Home() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
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
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur shadow-lg border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-5">
            <div className="flex items-center">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-600 shadow-sm">
                <Users className="h-6 w-6" />
              </div>
              <h1 className="ml-4 text-2xl font-bold text-slate-900">浦和東岸自治会</h1>
            </div>
            <nav className="hidden md:flex space-x-8 text-slate-600">
              <a href="#about" className="hover:text-orange-600 transition">自治会紹介</a>
              <a href="#benefits" className="hover:text-orange-600 transition">メリット</a>
              <a href="#news" className="hover:text-orange-600 transition">お知らせ</a>
              <a href="#events" className="hover:text-orange-600 transition">行事予定</a>
              <a href="#faq" className="hover:text-orange-600 transition">Q&A</a>
              <a href="#map" className="hover:text-orange-600 transition">アクセス</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-orange-200 bg-white shadow-[0_40px_120px_-40px_rgba(249,115,22,0.35)] p-14 text-center">
            <div className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-orange-100 opacity-80 blur-2xl"></div>
            <p className="relative inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 mb-6">地域のつながりを育む</p>
            <h2 className="relative text-5xl font-extrabold tracking-tight text-slate-900 mb-6">つながりを育む。安全で安心な地域づくり</h2>
            <p className="relative mx-auto max-w-2xl text-xl text-slate-600 mb-10">住民一人ひとりが支え合う、活気に満ちた浦和東岸の暮らしを創造します。</p>
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
                  浦和東岸自治会は、浦和東岸地区の住民が集まり、地域の安全と快適な生活を目的とした組織です。
                  防犯活動、環境美化、コミュニティイベントなどを通じて、みんなで地域を守っています。
                </p>
                <p>
                  会員数は約500世帯。地域の声を反映した活動を行っています。
                </p>
              </div>
              <div className="bg-amber-50 p-10 rounded-[2rem] shadow-lg border border-orange-100">
                <h4 className="text-xl font-semibold text-slate-900 mb-6">主な活動</h4>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Shield className="h-5 w-5" />
                    </span>
                    <span>防犯パトロール</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Heart className="h-5 w-5" />
                    </span>
                    <span>ゴミ拾い活動</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Calendar className="h-5 w-5" />
                    </span>
                    <span>季節のイベント</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Users className="h-5 w-5" />
                    </span>
                    <span>福祉活動</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メリット */}
      <section id="benefits" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-white shadow-lg border border-slate-200 p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500 mb-4">加入するメリット</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">自治会に入会するメリット</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-200 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-sm">
                  <Shield className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">安全・安心</h4>
                <p className="text-slate-600">防犯活動により、地域の安心を守ります。</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-200 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-sm">
                  <Heart className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">コミュニティ</h4>
                <p className="text-slate-600">住民同士のつながりを深め、助け合いを育みます。</p>
              </div>
              <div className="bg-white p-8 rounded-[2rem] shadow-lg border border-slate-200 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sky-100 text-sky-600 shadow-sm">
                  <Users className="h-7 w-7" />
                </div>
                <h4 className="text-xl font-semibold text-slate-900 mb-2">イベント参加</h4>
                <p className="text-slate-600">様々な行事に参加し、充実した時間を過ごせます。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ＆PDF */}
      <section id="news" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-[2.5rem] bg-white shadow-lg border border-slate-200 p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500 mb-4">自治会の最新情報</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">最新のお知らせ</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-50 p-10 rounded-[2rem] shadow-lg border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600 mr-3">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">お知らせ</h4>
                    <p className="text-slate-500">最新の地域情報をお届けします。</p>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-600">
                  <li>• 2023年秋祭りの開催日が決定しました。</li>
                  <li>• 新年度の入会受付を開始します。</li>
                  <li>• 防犯パトロールの参加者を募集しています。</li>
                </ul>
              </div>
              <div className="bg-slate-50 p-10 rounded-[2rem] shadow-lg border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-100 text-sky-600 mr-3">
                    <Download className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900">自治会便り</h4>
                    <p className="text-slate-500">PDFでいつでもご覧いただけます。</p>
                  </div>
                </div>
                <div className="mb-6 overflow-hidden rounded-[2rem] border border-slate-200">
                  <img src="/newsletter-thumb.jpg" alt="自治会便りプレビュー" className="w-full h-52 object-cover" />
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

      {/* 行事予定 */}
      <section id="events" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">行事予定</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-slate-900">秋祭り</h4>
                </div>
                <p className="text-slate-600">日時: 10月15日 10:00-16:00</p>
                <p className="text-slate-600">場所: 集会所前広場</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-slate-900">防犯パトロール</h4>
                </div>
                <p className="text-slate-600">日時: 毎週土曜日 9:00-11:00</p>
                <p className="text-slate-600">場所: 地区内</p>
              </div>
              <div className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex items-center mb-4">
                  <Calendar className="h-6 w-6 text-blue-600 mr-2" />
                  <h4 className="text-lg font-semibold text-slate-900">新年会</h4>
                </div>
                <p className="text-slate-600">日時: 1月10日 18:00-20:00</p>
                <p className="text-slate-600">場所: 集会所</p>
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
                        className={`h-5 w-5 text-slate-600 transform transition-transform ${
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
      <section id="map" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">アクセス</h3>
            <div className="flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-blue-600 mr-2" />
              <p className="text-slate-600">浦和東岸自治会集会所</p>
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
      <footer className="bg-slate-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">浦和東岸自治会</h4>
              <p className="text-slate-300">地域の安全と快適な生活のために</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">連絡先</h4>
              <p className="text-slate-300">電話: 048-123-4567</p>
              <p className="text-slate-300">メール: info@urawa-higashigishi.org</p>
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
            <p>&copy; 2023 浦和東岸自治会. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}