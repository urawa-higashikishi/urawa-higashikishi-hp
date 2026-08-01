'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Bell, Calendar, MapPin, ChevronDown, ChevronLeft, ChevronRight, Download, Users, Shield, Heart, Menu, X, Sprout, Gift, PartyPopper, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// お知らせは下記スプレッドシートのA列（見出し行を除く）から取得します
// https://docs.google.com/spreadsheets/d/19_KtzUPtbjno4_GE-KQMezMKcWFgI3dkNJMRpaxgPxo/edit
const NEWS_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/19_KtzUPtbjno4_GE-KQMezMKcWFgI3dkNJMRpaxgPxo/export?format=csv&gid=0';

// デジタル回覧板は下記Googleドライブフォルダの中身（画像ファイル）を一覧表示します
// https://drive.google.com/drive/folders/1uZOSaX9REpjBdHkb0emEuU6xhjZnzy5f
const NEWSLETTER_FOLDER_ID = '1uZOSaX9REpjBdHkb0emEuU6xhjZnzy5f';
// 活動写真ギャラリーも同様に下記フォルダの中身（画像ファイル）を一覧表示します
// https://drive.google.com/drive/folders/1OjcGJ9RGWel0eAbcrb934jCQ2zL6LZJN
const GALLERY_FOLDER_ID = '1OjcGJ9RGWel0eAbcrb934jCQ2zL6LZJN';
// Google Cloud Consoleで発行したAPIキー（HTTPリファラーをこのサイトのURLに制限済み・Google Drive APIのみ許可）
const DRIVE_API_KEY = 'AIzaSyCq3qVMFzyXS3lqsbNqwSEWcuolQiphbSY';
const NEWSLETTER_FOLDER_URL = `https://drive.google.com/drive/folders/${NEWSLETTER_FOLDER_ID}`;

// スマホでは画面幅いっぱい・PCでは白背景の角丸カードになるセクション共通の外枠スタイル
const SECTION_CARD_LG = 'md:rounded-[2.5rem] bg-transparent md:bg-white md:shadow-lg border-0 md:border border-slate-200 px-6 py-12 md:p-12';
const SECTION_CARD_SM = 'md:rounded-3xl bg-transparent md:bg-white border-0 md:border md:shadow-sm border-slate-200 px-6 py-10 md:p-10';

const DEFAULT_ANNOUNCEMENTS = [
  '（仮）2026年夏祭りの開催日が決定しました。',
  '（仮）新年度の入会受付を開始します。',
  '（仮）防犯パトロールの参加者を募集しています。',
];

// 1行1セルのシンプルなCSV（ダブルクォート囲み・""エスケープのみ）を前提にした最小限のパーサー
function parseSingleColumnCsv(csv: string): string[] {
  return csv
    .split(/\r\n|\n/)
    .map((line) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
        return trimmed.slice(1, -1).replace(/""/g, '"');
      }
      return trimmed;
    })
    .slice(1) // 見出し行を除く
    .map((text) => text.replace(/^[•・\s]+/, '').trim())
    .filter((text) => text.length > 0);
}

type DriveImageFile = { id: string; name: string; mimeType: string; thumbnailLink?: string };

// 指定したGoogleドライブフォルダ内のファイル一覧を取得する（回覧板・活動写真ギャラリーで共用）
// mimeQueryで対象ファイルの種類を絞り込む（省略時は画像のみ）
function useDriveImageFolder(folderId: string, mimeQuery: string = "mimeType contains 'image/'") {
  const [files, setFiles] = useState<DriveImageFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const params = new URLSearchParams({
      q: `'${folderId}' in parents and trashed = false and (${mimeQuery})`,
      key: DRIVE_API_KEY,
      fields: 'files(id,name,mimeType,thumbnailLink)',
      orderBy: 'modifiedTime desc',
    });
    fetch(`https://www.googleapis.com/drive/v3/files?${params.toString()}`, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((data) => {
        if (!cancelled) {
          setFiles(data.files ?? []);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [folderId, mimeQuery]);

  return { files, loading, error };
}

export default function Home() {
    // スクロール位置を管理する状態
    const [showTop, setShowTop] = useState(false);

  const [announcements, setAnnouncements] = useState<string[]>([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    fetch(NEWS_SHEET_CSV_URL, { signal: controller.signal })
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(`HTTP ${res.status}`))))
      .then((csv) => {
        const parsed = parseSingleColumnCsv(csv);
        if (!cancelled) {
          setAnnouncements(parsed.length > 0 ? parsed : DEFAULT_ANNOUNCEMENTS);
          setAnnouncementsLoading(false);
        }
      })
      .catch(() => {
        // 取得に失敗した場合は既定のお知らせ（DEFAULT_ANNOUNCEMENTS）を表示する
        if (!cancelled) {
          setAnnouncements(DEFAULT_ANNOUNCEMENTS);
          setAnnouncementsLoading(false);
        }
      });
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const { files: newsletterFiles, loading: newsletterLoading, error: newsletterError } = useDriveImageFolder(
    NEWSLETTER_FOLDER_ID,
    "mimeType contains 'image/' or mimeType = 'application/pdf'"
  );
  const { files: galleryFiles, loading: galleryLoading, error: galleryError } = useDriveImageFolder(GALLERY_FOLDER_ID);
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const scrollGallery = (direction: number) => {
    galleryScrollRef.current?.scrollBy({ left: direction * 320, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // 400px以上スクロールしたらボタンを表示
      setShowTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
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
      answer: (
        <>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSebnKdQUw8PjZQhKV2C-TzwLQLfb7I5PoISq7BdWAXzJYseUg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-600 underline hover:text-orange-700"
          >
            「入会・お問い合わせフォーム」
          </a>
またはメールにてご連絡ください。入会手続きをご案内いたします。
        </>
      )
    },
    {
      question: '会費はどのくらいですか？',
      answer: '1ヶ月350円です。集金は各班により1ヶ月毎・半年毎・1年分一括の方法があります。'
    },
    {
      question: 'イベントの参加方法は？',
      answer: '自治会ホームページや掲示板で告知されます。参加希望の方は事務局までご連絡ください。'
    }
  ];

  const events = [
    {
      name: '餅つき大会・懇親会',
      time: '1月',
      place: '自治会館前',
      description: '子供たちと餅つき大会を開催。終了後、会員同士の親睦を目的とした懇親会を行います。'
    },
    {
      name: '自治会総会',
      time: '4月',
      description: '自治会の運営について話し合う総会を開催します。'
    },
    {
      name: '環境美化への取り組み',
      time: '5月・11月',
      place: '町内',
      description: 'プランターの花植え替えや、市・区主催のゴミゼロ運動に協力します。'
    },
    {
      name: '夏まつり',
      time: '8月',
      place: '自治会館前道路',
      description: '熱中症対策のため宵まつりとして開催。子供向けの模擬店や子供神輿の展示を行います。'
    },
    {
      name: '水遊び',
      time: '7月',
      place: '大谷場小学校 校庭',
      description: '校庭を借用し、水鉄砲を使った水遊びを開催します。'
    },
    {
      name: '長寿記念品贈呈',
      time: '自治会主催',
      description: '75歳以上の会員に長寿記念品を贈呈します。'
    },
    {
      name: '花小鉢贈呈',
      time: '12月',
      description: '一人暮らしの高齢者に花小鉢をお贈りします。'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="sticky top-0 z-30 shadow-lg w-full overflow-hidden h-24">
        {/* 背景画像レイヤー */}
        <div className="absolute inset-0 z-0">
            <Image 
            src="/header-bg.png"
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
              <div className="relative w-16 h-16 overflow-hidden rounded-lg shadow-sm border border-white/80">
                <Image 
                  src="/favicon.png"
                  alt="東岸町自治会 紋章" 
                  fill
                  className="object-cover"
                />
              </div>
              {/* 自治会名と地名のセット */}
              <div className="flex flex-col justify-between h-14 py-0.5 ml-3">
                {/* さいたま市浦和区（赤またはオレンジの長丸） */}
                <span className="w-full bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold tracking-wider shadow-sm text-center flex items-center justify-center">
                  さいたま市浦和区
                </span>
                {/* 自治会名 */}
                <h1 className="text-2xl font-bold text-slate-900 leading-none drop-shadow-sm whitespace-nowrap">
                  東岸町自治会
                </h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-6 text-slate-800 font-bold">
              <a href="#about" className="hover:text-orange-700 transition drop-shadow-sm">自治会紹介</a>
              <a href="#news" className="hover:text-orange-700 transition drop-shadow-sm">お知らせ</a>
              <a href="#events" className="hover:text-orange-700 transition drop-shadow-sm">行事予定</a>
              <a href="#gallery" className="hover:text-orange-700 transition drop-shadow-sm">活動の様子</a>
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
                      { name: "活動の様子", href: "#gallery" },
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
        <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
          <div className="relative overflow-hidden md:rounded-[2.5rem] border-0 md:border border-orange-100 bg-transparent md:bg-white md:shadow-xl p-6 py-12 md:p-14 text-center">
            <div className="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-orange-100 opacity-80 blur-2xl"></div>
            <p className="relative inline-flex items-center rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700 mb-6">地域のつながりを育む</p>
            <h2 className="relative text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6">つながりを育む。<br className="md:hidden" />安全で安心な<br className="md:hidden" />地域づくり</h2>
            <p className="relative mx-auto max-w-2xl text-xl text-slate-600 mb-10">住民一人ひとりが支え合う、活気に満ちた東岸町の暮らしを創造します。</p>
            <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSebnKdQUw8PjZQhKV2C-TzwLQLfb7I5PoISq7BdWAXzJYseUg/viewform?usp=publish-editor"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-orange-600 transition hover:scale-105">
              入会のお問い合わせ
            </a>
          </div>
        </div>
      </section>

      {/* 自治会紹介 */}
      <section id="about" className="py-16">
        <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
          <div className={SECTION_CARD_LG}>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500 mb-4">自治会の主な活動</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">自治会紹介</h3>
            <div className="mb-10 bg-orange-50 border-l-4 border-orange-400 rounded-r-2xl p-6 md:p-8">
              <h4 className="text-lg font-semibold text-slate-900 mb-3">会長からのご挨拶</h4>
              <p className="text-slate-700 leading-relaxed">
                この度、東岸町自治会区域内に転入居されましたことを、自治会を代表いたしまして歓迎申し上げます。
                貴殿が一日も早く地域に馴染み、近隣の方々との友好の輪が広がりますよう、当自治会への加入をお待ちしております。
                当自治会はJR浦和駅と南浦和駅の中間に位置し、東西に細長く展開しています。
              </p>
              <p className="text-right text-slate-900 font-semibold mt-4">東岸町自治会　会長　鈴木伸昭</p>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6 text-slate-600 leading-relaxed">
                <p>
                  東岸町自治会は、浦和区東岸町地区の住民が集まり、地域の安全と快適な生活を目的とした組織です。
                  防犯活動、環境美化、コミュニティイベントなどを通じて、みんなで地域を守っています。
                </p>
                <p>
                  会員数は790世帯。地域の声を反映した活動を行っています。
                </p>
              </div>
                <div className="-mx-6 md:mx-0 bg-white p-6 md:p-10 rounded-none md:rounded-[2rem] shadow-lg border-y border-x-0 md:border border-orange-100">
                <h4 className="text-xl font-semibold text-slate-900 mb-6">自治会活動</h4>
                <ul className="space-y-4 text-slate-600">
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <PartyPopper className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">餅つき大会・懇親会</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Sun className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">夏まつり・水遊び</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Gift className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">長寿記念品・花小鉢贈呈</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-600">
                      <Sprout className="h-5 w-5" />
                    </span>
                    <span className="font-medium text-slate-700">環境美化への取り組み</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* お知らせ＆PDF */}
      <section id="news" className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-0 md:px-6 lg:px-8">
          <div className="md:rounded-[2.5rem] bg-transparent md:bg-white md:shadow-lg border-0 md:border border-slate-200 p-0 md:p-12">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500 mb-4">自治会の最新情報</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">最新のお知らせ</h3>
            <div className="space-y-8">
              <div className="bg-slate-50 p-2 md:p-10 rounded-none md:rounded-[2rem] shadow-lg border-x-0 md:border border-slate-200">
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
                  {announcementsLoading ? (
                    <li className="text-slate-400">読み込み中…</li>
                  ) : (
                    announcements.map((text) => (
                      <li key={text}>• {text}</li>
                    ))
                  )}
                </ul>
              </div>
              <div className="bg-slate-50 p-0 md:p-10 rounded-none md:rounded-[2rem] shadow-lg border-x-0 md:border border-slate-200">
                <div className="flex items-center mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-600 mr-3">
                    {/* アイコンをカレンダーやダウンロードからフォルダ（回覧用）に変更 */}
                    <Download className="h-6 w-6" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xl font-semibold text-slate-900">デジタル回覧板・自治会便り</h4>
                    <p className="text-slate-500 text-sm">毎月自動で更新されます。読みたい資料を選んでください。</p>
                  </div>
                </div>

                {/* Googleドライブフォルダ内の画像を直接埋め込み表示。フォルダ内のファイルを追加・削除するとここに反映されます */}
                <div className="mb-6 max-w-full md:max-w-3xl">
                  {newsletterLoading ? (
                    <p className="text-slate-400 text-sm">読み込み中…</p>
                  ) : newsletterError ? (
                    <p className="text-slate-500 text-sm">
                      資料の読み込みに失敗しました。
                      <a href={NEWSLETTER_FOLDER_URL} target="_blank" rel="noopener noreferrer" className="text-orange-600 underline">
                        こちらのフォルダ
                      </a>
                      から直接ご覧ください。
                    </p>
                  ) : newsletterFiles.length === 0 ? (
                    <p className="text-slate-400 text-sm">現在表示できる資料はありません。</p>
                  ) : (
                    <div className="space-y-4">
                      {newsletterFiles.map((file) => {
                        const isPdf = file.mimeType === 'application/pdf';
                        const viewHref = isPdf
                          ? `https://drive.google.com/uc?export=download&id=${file.id}`
                          : `https://lh3.googleusercontent.com/d/${file.id}=w2400`;
                        const thumbSrc = isPdf
                          ? (file.thumbnailLink ?? '').replace(/=s\d+$/, '=s1600')
                          : `https://lh3.googleusercontent.com/d/${file.id}=w1200`;
                        return (
                          <a
                            key={file.id}
                            href={viewHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block overflow-hidden rounded-[1.5rem] border border-slate-200 shadow-lg bg-white"
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={thumbSrc}
                              alt={file.name}
                              loading="lazy"
                              className="w-full h-auto"
                            />
                            {isPdf && (
                              <p className="text-slate-500 text-xs text-center py-2 border-t border-slate-100">
                                PDF資料（タップでダウンロード）: {file.name}
                              </p>
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </div>

                <p className="text-slate-600 text-sm mb-2 text-left">
                  ※画像をタップ・クリックすると、拡大版が新しいタブで開きます。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* メリット */}
      <section id="benefits" className="py-16">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className={SECTION_CARD_LG}>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500 mb-4">加入するメリット</p>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">自治会に入会する<br className="sm:hidden" />メリット</h3>
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
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className={SECTION_CARD_SM}>
            <h3 className="text-3xl font-bold text-slate-900 mb-8 text-center">行事予定</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event, index) => (
                <div key={index} className="bg-slate-50 p-6 rounded-3xl shadow-sm border border-slate-200">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-6 w-6 text-orange-600 mr-2" />
                    <h4 className="text-lg font-semibold text-slate-900">{event.name}</h4>
                  </div>
                  <p className="text-slate-600">時期: {event.time}</p>
                  {event.place && <p className="text-slate-600">場所: {event.place}</p>}
                  <p className="text-slate-500 text-sm mt-2">{event.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 活動写真ギャラリー */}
      <section id="gallery" className="py-16">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className={SECTION_CARD_LG}>
            <h3 className="text-3xl font-bold text-slate-900 mb-10 text-center">活動の様子</h3>
            {galleryLoading ? (
              <p className="text-slate-400 text-sm text-center">読み込み中…</p>
            ) : galleryError ? (
              <p className="text-slate-500 text-sm text-center">
                写真の読み込みに失敗しました。
                <a
                  href={`https://drive.google.com/drive/folders/${GALLERY_FOLDER_ID}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-orange-600 underline"
                >
                  こちらのフォルダ
                </a>
                から直接ご覧ください。
              </p>
            ) : galleryFiles.length === 0 ? (
              <p className="text-slate-400 text-sm text-center">現在表示できる写真はありません。</p>
            ) : (
              <div className="relative">
                <div
                  ref={galleryScrollRef}
                  className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {galleryFiles.map((file) => (
                    <a
                      key={file.id}
                      href={`https://lh3.googleusercontent.com/d/${file.id}=w2400`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block shrink-0 snap-center w-[70%] sm:w-[45%] md:w-[30%] aspect-square overflow-hidden rounded-2xl border border-slate-200 shadow-sm bg-slate-50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://lh3.googleusercontent.com/d/${file.id}=w800`}
                        alt={file.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => scrollGallery(-1)}
                  aria-label="前の写真"
                  className="hidden md:flex absolute top-1/2 -left-4 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-orange-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={() => scrollGallery(1)}
                  aria-label="次の写真"
                  className="hidden md:flex absolute top-1/2 -right-4 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg border border-slate-200 text-slate-600 hover:text-orange-600"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Q&A */}
      <section id="faq" className="py-16">
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className={SECTION_CARD_SM}>
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
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8">
          <div className={SECTION_CARD_SM}>
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
              <h4 className="text-lg font-semibold mb-4">東岸町自治会</h4>
              <p className="text-slate-300">地域の安全と快適な生活のために</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">連絡先</h4>
              <p className="text-slate-300">メール: urawa-higashikishi@gmail.com</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">リンク</h4>
              <ul className="text-slate-300 space-y-1">
                <li><Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-300">
            <p>&copy; 2026 東岸町自治会. All rights reserved.</p>
          </div>
        </div>
      </footer>
      {/* スクロールトップボタン */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-sm border border-orange-200 p-3 rounded-2xl shadow-xl hover:bg-white hover:scale-110 transition-all animate-in fade-in slide-in-from-bottom-10 duration-500 group"
        >
          <div className="text-orange-500 mb-1 group-hover:-translate-y-1 transition-transform">
            <ChevronDown size={24} className="rotate-180" />
          </div>
          <span className="text-[10px] font-black text-orange-600 tracking-tighter">PAGE TOP</span>
        </button>
      )}
    </div>
  );
}