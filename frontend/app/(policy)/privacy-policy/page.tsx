import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function PrivacyPolicyPage() {
  const sections = [
    { id: "collection", title: "第1条（収集する利用者情報及び収集情報）" },
    { id: "purpose", title: "第2条（利用目的）" },
    { id: "analytics", title: "第3条（アクセス解析ツール）" },
    { id: "thirdParty", title: "第4条（第三者提供）" },
    { id: "changes", title: "第5条（プライバシーポリシーの変更手続）" },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            TOPに戻る
          </Link>
          <CardTitle className="text-3xl font-bold">プライバシーポリシー</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            サイト運営者（以下「当方」と言います）は、当方の提供するサービス（以下「当サービス」と言います）における、ユーザーについての個人情報を含む利用者情報の取扱いについて、以下の通りプライバシーポリシー（以下「ポリシー」と言います）を定めます。
          </p>

          <nav className="mb-8">
            <h2 className="text-xl font-semibold mb-2">目次</h2>
            <ul className="list-disc list-inside space-y-1">
              {sections.map((section) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="text-blue-600 hover:underline">
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <section id="collection" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[0].title}</h2>
            <p className="mb-4">
              本ポリシーにおいて、「利用者情報」とは、ユーザーの識別に係る情報、通信サービス上の行動履歴、その他ユーザーまたはユーザーの端末に関連して生成または蓄積された情報であって、本ポリシーに基づき当方が収集するものを意味するものとします。
            </p>
            <p className="mb-4">
              本サービスにおいて当方が収集する利用者情報は、その収集方法に応じて、以下のようなものとなります。
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>リファラ</li>
              <li>IPアドレス</li>
              <li>サーバーアクセスログに関する情報</li>
              <li>Cookie</li>
              <li>本サービスが提供する各種ツールの入力情報</li>
            </ul>
          </section>

          <section id="purpose" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[1].title}</h2>
            <p className="mb-4">本サービスのサービス提供にかかわる利用者情報の具体的な利用目的は以下です。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>ユーザーのトラフィック測定及び行動測定のため</li>
              <li>広告の配信、表示及び効果測定のため</li>
              <li>本サービスが提供する各種ツールの品質向上のため</li>
            </ul>
          </section>

          <section id="analytics" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[2].title}</h2>
            <p className="mb-4">
              当サービスでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。このGoogleアナリティクスはデータの収集のためにCookieを使用しています。
            </p>
            <p>
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関しての詳細はGoogleアナリティクスサービス利用規約やGoogleポリシーと規約をご覧ください。
            </p>
          </section>

          <section id="thirdParty" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[3].title}</h2>
            <p className="mb-4">
              当方は、利用者情報のうち、個人情報については、あらかじめユーザーの同意を得ないで、第三者（日本国外にある者を含みます）に提供しません。
              但し、次に掲げる必要があり第三者（日本国外にある者を含みます。）に提供する場合はこの限りではありません。
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>当方が利用目的の達成に必要な範囲内において個人情報の取り扱いの全部または一部を委託する場合</li>
              <li>事業の継承に伴って個人情報が提供される場合</li>
              <li>第3項の定めに従って、提携先または情報収集モジュール提供者へ個人情報が提供される場合</li>
              <li>
                国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、
                ユーザーの同意を得ることによって当該事務の遂行に支障を及ぼすおそれがある場合
              </li>
              <li>
                その他、個人情報の保護に関する法律（以下「個人情報保護法」と言います ）その他の法令で認められる場合
              </li>
            </ul>
          </section>

          <section id="changes" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[4].title}</h2>
            <p className="mb-4">
              当方は、必要に応じて、本ポリシーを変更します。但し、法令上ユーザーの同意が必要となるような本ポリシーの変更を行う場合、変更後の本ポリシーは、当方所定の方法で変更に同意したユーザーに対してのみ適用されるものとします。
            </p>
            <p>
              なお、当方は、本ポリシーを変更する場合には、変更後の本ポリシーの施行時期及び内容を当ウェブサイト上での表示その他適切な方法により周知し、またはユーザーに通知します。
            </p>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}

