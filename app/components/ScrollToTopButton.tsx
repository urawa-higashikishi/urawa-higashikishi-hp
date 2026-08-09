'use client';

import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollToTopButton() {
  // スクロール位置を管理する状態
  const [showTop, setShowTop] = useState(false);

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

  if (!showTop) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="ページ上部へ戻る"
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex h-11 w-11 md:h-auto md:w-auto flex-col items-center justify-center bg-white/90 backdrop-blur-sm border border-orange-200 md:p-3 rounded-full md:rounded-2xl shadow-lg md:shadow-xl hover:bg-white transition-all group"
    >
      <div className="text-orange-500 md:mb-1 group-hover:-translate-y-1 transition-transform">
        <ChevronDown size={20} className="rotate-180" />
      </div>
      <span className="hidden md:block text-[10px] font-black text-orange-600 tracking-tighter">PAGE TOP</span>
    </button>
  );
}
