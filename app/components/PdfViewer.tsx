'use client';

import { useEffect, useRef, useState } from 'react';

// Googleドライブの画面を経由せず、PDFの全ページをその場に描画するビューア
export default function PdfViewer({ url }: { url: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const pdfjsLib = await import('pdfjs-dist');
        pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

        const pdf = await pdfjsLib.getDocument({ url }).promise;
        if (cancelled || !containerRef.current) return;
        containerRef.current.innerHTML = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 1.5 });

          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          canvas.className = 'w-full h-auto rounded-lg shadow border border-slate-200';

          await page.render({ canvas, viewport }).promise;
          if (cancelled || !containerRef.current) return;
          containerRef.current.appendChild(canvas);
        }

        if (!cancelled) setLoading(false);
      } catch {
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url]);

  if (error) {
    return <p className="text-slate-500 text-sm">PDFの表示に失敗しました。</p>;
  }

  return (
    <div>
      {loading && <p className="text-slate-400 text-sm">読み込み中…</p>}
      <div ref={containerRef} className="space-y-4" />
    </div>
  );
}
