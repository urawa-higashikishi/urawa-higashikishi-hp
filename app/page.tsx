"use client";

import { AlertTriangle, Bell, CalendarDays, CheckCircle2, Globe2, Home, Mail, ShieldCheck, Users } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-3 text-lg font-semibold text-slate-900">
            <Home className="h-6 w-6 text-amber-600" />
            <span>浦和東岸自治会</span>
          </div>
          <nav className="hidden items-center gap-8 md:flex text-sm font-medium text-slate-700">
            <a href="#hero" className="hover:text-slate-900">ホーム</a>
            <a href="#about" className="hover:text-slate-900">自治会紹介</a>
            <a href="#benefits" className="hover:text-slate-900">メリット</a>
            <a href="#events" className="hover:text-slate-900">行事予定</a>
            <a href="#contact" className="hover:text-slate-900">お問い合わせ</a>
          </nav>
        </div>
      </header>

      <main>
        <section id="hero" className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-4 inline-flex rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-700">
                浦和東岸自治会へようこそ
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                つながりを育む、安全で安心な地域づくり
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">
                地域の防災・防犯・親睦活動を通じて、住民同士の信頼と安心を深める浦和東岸自治会の公式トップページです。
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <a
                  href="#about"
                  className="inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-700"
                >
                  自治会紹介を見る
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-full border border-stone-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-stone-100"
                >
                  お問い合わせ
                </a>
              </div>
            </div>
            <div className="rounded-3xl bg-white p-10 shadow-xl shadow-stone-200/50">
              <div className="flex items-center gap-4 rounded-3xl bg-amber-50 p-6">
                <ShieldCheck className="h-10 w-10 text-amber-600" />
                <div>
                  <p className="text-sm font-semibold text-amber-900">会長挨拶</p>
                  <p className="mt-2 text-base leading-7 text-slate-700">
                    「地域の安全と絆を第一に、誰もが安心して暮らせる浦和東岸を目指します。皆さまのご参加をお待ちしております。」
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-stone-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">自治会の紹介</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">私たちの活動</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                浦和東岸自治会は、防災・防犯・親睦を柱に、地域の安心とつながりを支えます。
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              <article className="rounded-3xl border border-stone-200 bg-stone-50 p-8 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <AlertTriangle className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">防災</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  避難訓練や防災マップ作成、備蓄品の共有を通じて、災害に備えた地域づくりを進めています。
                </p>
              </article>
              <article className="rounded-3xl border border-stone-200 bg-stone-50 p-8 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Globe2 className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">防犯</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  地域パトロールや情報共有ネットワークを強化し、安心して暮らせる街をつくります。
                </p>
              </article>
              <article className="rounded-3xl border border-stone-200 bg-stone-50 p-8 shadow-sm">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Users className="h-7 w-7" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-slate-900">親睦</h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  イベントや交流会を開催し、住民同士のつながりを深める活動を行っています。
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="news" className="mx-auto max-w-7xl px-6 py-16">
          <div className="overflow-hidden rounded-[2rem] border border-sky-200 bg-sky-50 p-8 shadow-lg shadow-slate-200/40">
            <div className="grid gap-10 lg:grid-cols-[2fr_1fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">最新情報・自治会便り</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">最新のお知らせ</h2>
                <div className="mt-8 space-y-4">
                  {[
                    { date: "2024/05/20", text: "避難訓練のお知らせ" },
                    { date: "2024/05/15", text: "清掃活動の中止" },
                    { date: "2024/05/10", text: "夏祭りボランティア募集" },
                  ].map((item) => (
                    <div key={item.date} className="flex items-start gap-4 rounded-3xl bg-white px-5 py-4 shadow-sm">
                      <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                        <Bell className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.date}</p>
                        <p className="mt-1 text-sm text-slate-600">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">今月の自治会便り</p>
                <h3 className="mt-3 text-xl font-bold text-slate-900">自治会だより PDF</h3>
                <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                  <img src="/newsletter-thumb.jpg" alt="自治会便り" className="h-auto w-full object-cover" />
                </div>
                <a
                  href="/newsletter.pdf"
                  className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                >
                  PDFを開く
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="benefits" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">入会するメリット</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">自治会に参加する理由</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                住民同士が助け合い、安全で快適な暮らしを実現するために、自治会活動には多数のメリットがあります。
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <CheckCircle2 className="h-8 w-8 text-amber-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">安心な暮らしの実現</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">地域の安全活動で、不安を減らし安心して生活できます。</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <CalendarDays className="h-8 w-8 text-amber-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">充実したイベント</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">年間を通じた行事で交流を深め、地域の絆が強まります。</p>
                </div>
              </div>
              <div className="flex gap-4 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <Globe2 className="h-8 w-8 text-amber-600" />
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">情報共有の強化</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">防災・防犯情報をスムーズに共有し、地域力を向上させます。</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="events" className="border-t border-stone-200 bg-white py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">年間行事予定</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">1年を通じた行事カレンダー</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                毎月の主な活動内容をご確認ください。自治会の活動にぜひご参加ください。
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { month: "1月", event: "新年挨拶・防災点検" },
                { month: "2月", event: "自主防災会議" },
                { month: "3月", event: "春の防犯パトロール" },
                { month: "4月", event: "花見交流会" },
                { month: "5月", event: "避難訓練" },
                { month: "6月", event: "清掃活動" },
                { month: "7月", event: "夏祭り準備" },
                { month: "8月", event: "夏祭り・夜間見回り" },
                { month: "9月", event: "敬老会・防災講習" },
                { month: "10月", event: "秋の交流会" },
                { month: "11月", event: "防犯キャンペーン" },
                { month: "12月", event: "忘年会・年末防災点検" },
              ].map((item) => (
                <div key={item.month} className="rounded-3xl border border-stone-200 bg-stone-50 p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">{item.month}</p>
                  <p className="mt-3 text-base font-semibold text-slate-900">{item.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">よくある質問</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900">疑問にお答えします</h2>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                入会や活動内容について、よくいただくご質問をまとめました。
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="font-semibold text-slate-900">Q: 入会手続きはどのように行いますか？</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">A: まずお問い合わせフォームよりご連絡ください。入会案内をお送りします。</p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="font-semibold text-slate-900">Q: 活動への参加は初心者でも大丈夫ですか？</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">A: はい。初めての方も歓迎です。地域の活動に気軽にご参加ください。</p>
              </div>
              <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
                <p className="font-semibold text-slate-900">Q: 会費はどのくらいですか？</p>
                <p className="mt-3 text-sm leading-7 text-slate-600">A: 年会費や詳細はお問い合わせ時にご案内いたします。地域に応じた運営を行っています。</p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="border-t border-stone-200 bg-amber-50 py-16">
          <div className="mx-auto max-w-7xl px-6">
            <div className="rounded-3xl bg-white p-10 shadow-xl shadow-stone-200/70">
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-600">加入案内とお問い合わせ</p>
                  <h2 className="mt-3 text-3xl font-bold text-slate-900">まずはお気軽にお問い合わせください</h2>
                  <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                    加入手続きや活動内容について、Googleフォームから簡単にお問い合わせいただけます。
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfExample/formResponse"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-4 text-sm font-semibold text-white shadow-sm hover:bg-slate-800"
                  >
                    Googleフォームでお問い合わせ
                  </a>
                  <div className="rounded-3xl border border-stone-200 bg-stone-50 p-6">
                    <p className="font-semibold text-slate-900">お問い合わせ先</p>
                    <p className="mt-3 flex items-center gap-2 text-sm text-slate-700">
                      <Mail className="h-4 w-4 text-amber-600" />
                      info@urawahigashigishi.org
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-stone-200 bg-white py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© 2026 浦和東岸自治会. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#hero" className="hover:text-slate-900">トップ</Link>
            <Link href="#about" className="hover:text-slate-900">自治会紹介</Link>
            <Link href="#contact" className="hover:text-slate-900">お問い合わせ</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
