'use client';

import { useEffect, useState } from 'react';
import { Type, Contrast } from 'lucide-react';

// アクセシビリティ設定（文字サイズ・高コントラスト）。ローカルストレージに保存し次回訪問時も維持する
export default function AccessibilityBar() {
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    // ローカルストレージ（クライアント専用）から読み込むため、SSR/静的書き出し時とのハイドレーション不一致を避けるべく
    // マウント後にここで一度だけ反映する
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLargeText(localStorage.getItem('a11y-large-text') === 'true');
    setHighContrast(localStorage.getItem('a11y-high-contrast') === 'true');
  }, []);

  useEffect(() => {
    document.documentElement.style.fontSize = largeText ? '118%' : '';
    localStorage.setItem('a11y-large-text', String(largeText));
  }, [largeText]);

  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', highContrast);
    localStorage.setItem('a11y-high-contrast', String(highContrast));
  }, [highContrast]);

  return (
    <div className="bg-slate-800 text-white text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-end gap-2 sm:gap-4">
        <span className="hidden sm:inline text-slate-400">表示設定:</span>
        <button
          type="button"
          onClick={() => setLargeText((v) => !v)}
          aria-pressed={largeText}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-700 transition"
        >
          <Type className="h-4 w-4" />
          文字サイズ{largeText ? '標準' : '拡大'}
        </button>
        <button
          type="button"
          onClick={() => setHighContrast((v) => !v)}
          aria-pressed={highContrast}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-700 transition"
        >
          <Contrast className="h-4 w-4" />
          {highContrast ? '通常表示' : '高コントラスト'}
        </button>
      </div>
    </div>
  );
}
