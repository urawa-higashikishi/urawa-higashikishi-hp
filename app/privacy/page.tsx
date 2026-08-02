import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-amber-50 px-6 py-16">
      <div className="max-w-3xl mx-auto bg-white rounded-[2rem] shadow-lg border border-slate-200 p-8 md:p-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-8">プライバシーポリシー</h1>

        <div className="space-y-6 text-slate-600 leading-relaxed">
          <p>
            東岸町自治会（以下「当会」といいます）は、入会お申し込みフォーム等を通じてご提供いただく氏名・住所・電話番号などの個人情報を、以下の方針に基づき適切に取り扱います。
          </p>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">利用目的</h2>
            <p>
              お預かりした個人情報は、会員名簿の作成、行事のご案内、回覧板の配布など、自治会活動の運営に必要な範囲でのみ利用します。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">第三者提供</h2>
            <p>
              ご本人の同意がある場合や法令に基づく場合を除き、お預かりした個人情報を第三者に提供することはありません。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">管理</h2>
            <p>
              お預かりした個人情報は自治会事務局にて適切に管理し、利用目的の達成に必要な範囲を超えて保管いたしません。
              紙の名簿等は施錠可能な場所で保管し、電子データはパスワード設定等の安全管理措置を講じたうえで、漏えい・紛失の防止に努めます。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">開示請求等への対応</h2>
            <p>
              ご本人からご自身の個人情報について開示・訂正・削除等のご請求があった場合は、遅滞なく対応いたします。個人情報の取り扱いに関する苦情についても、下記の連絡先にて適切かつ迅速に対応いたします。
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-2">お問い合わせ</h2>
            <p>
              個人情報の取り扱いに関するお問い合わせは、下記までご連絡ください。
            </p>
            <p className="mt-2">
              東岸町自治会
              <br />
              メール: urawa-higashikishi@gmail.com
            </p>
          </div>
        </div>

        <Link href="/" className="inline-block mt-10 text-orange-600 underline hover:text-orange-700">
          トップページに戻る
        </Link>
      </div>
    </main>
  );
}
