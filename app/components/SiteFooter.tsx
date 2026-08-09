import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="bg-blue-950 text-white pt-8 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">東岸町自治会</h4>
            <p className="text-slate-300">地域の安全と快適な生活のために</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">連絡先</h4>
            <p className="text-slate-300">
              メール: <a href="mailto:urawa.higashikishi@gmail.com" className="hover:text-white underline">urawa.higashikishi@gmail.com</a>
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">リンク</h4>
            <ul className="text-slate-300 space-y-1">
              <li><Link href="/privacy" className="hover:text-white">プライバシーポリシー</Link></li>
              <li><a href="https://www.city.saitama.lg.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white">さいたま市公式サイト</a></li>
              <li><a href="https://u-jichiren.ciao.jp/" target="_blank" rel="noopener noreferrer" className="hover:text-white">浦和区自治会連合会</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-slate-300">
          <p>&copy; 2026 東岸町自治会. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
