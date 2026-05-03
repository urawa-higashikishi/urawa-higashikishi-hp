import { Bell, Calendar, ExternalLink, Users, ShieldCheck, CheckCircle, MessageCircle } from 'lucide-react';

export default function Page() {
  return (
    <div className="min-h-screen bg-stone-50 text-gray-900">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">浦和東岸自治会</h1>
          <nav className="space-x-4">
            <a href="#news" className="hover:underline">お知らせ</a>
            <a href="#events" className="hover:underline">行事予定</a>
            <a href="#join" className="hover:underline">加入案内</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-600 mb-4">安心・安全で住みよい街づくり</h2>
          <p className="text-lg">浦和東岸自治会は、地域の皆様と共に、より良いコミュニティを築くことを目指しています。皆様のご協力をお願いいたします。</p>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-16">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 flex items-center"><Bell className="mr-2" /> お知らせ</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-bold">自治会総会のお知らせ</h4>
              <p>5月15日に自治会総会を開催します。詳細は後日お知らせいたします。</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-bold">防犯パトロールの実施</h4>
              <p>毎週土曜日に防犯パトロールを実施中です。参加をお待ちしております。</p>
            </div>
            <div className="bg-gray-100 p-6 rounded-lg">
              <h4 className="font-bold">ゴミ収集日の変更</h4>
              <p>5月よりゴミ収集日が変更となります。詳細は自治会掲示板をご確認ください。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="py-16 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-8 flex items-center"><Calendar className="mr-2" /> 行事予定</h3>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-100">
                <th className="border border-gray-300 p-2">日付</th>
                <th className="border border-gray-300 p-2">行事</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">5月15日</td>
                <td className="border border-gray-300 p-2">自治会総会</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">5月25日</td>
                <td className="border border-gray-300 p-2">防犯パトロール</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">6月10日</td>
                <td className="border border-gray-300 p-2">夏祭り準備会</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">6月20日</td>
                <td className="border border-gray-300 p-2">地域清掃活動</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer with External Links */}
      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto">
          <h3 className="text-xl font-bold mb-4">外部リンク</h3>
          <div className="flex flex-wrap gap-4">
            <a href="#" className="flex items-center hover:underline"><ExternalLink className="mr-1" /> さいたま市</a>
            <a href="#" className="flex items-center hover:underline"><ExternalLink className="mr-1" /> 浦和区役所</a>
            <a href="#" className="flex items-center hover:underline"><ExternalLink className="mr-1" /> 近隣小学校</a>
          </div>
        </div>
      </footer>
    </div>
  );
}