import { ChevronLeft } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function TermsOfServicePage() {
  const sections = [
    { id: "application", title: "第1条（適用）" },
    { id: "registration", title: "第2条（利用登録）" },
    { id: "account", title: "第3条（ユーザーIDおよびパスワードの管理）" },
    { id: "prohibited", title: "第4条（禁止事項）" },
    { id: "suspension", title: "第5条（本サービスの提供の停止等）" },
    { id: "restriction", title: "第6条（利用制限および登録抹消）" },
    { id: "withdrawal", title: "第7条（退会）" },
    { id: "disclaimer", title: "第8条（保証の否認および免責事項）" },
    { id: "changes", title: "第9条（サービス内容の変更等）" },
    { id: "termsChanges", title: "第10条（利用規約の変更）" },
    { id: "privacy", title: "第11条（個人情報の取扱い）" },
    { id: "jurisdiction", title: "第12条（準拠法・裁判管轄）" },
  ]

  return (
    <main className="container mx-auto px-4 py-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <Link href="/" className="flex items-center text-blue-600 hover:text-blue-800 mb-2">
            <ChevronLeft className="w-4 h-4 mr-1" />
            TOPに戻る
          </Link>
          <CardTitle className="text-3xl font-bold">利用規約</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6">
            本利用規約（以下「本規約」と言います。）には、本サービスの提供条件及びサイト運営者（以下「当方」と言います）とユーザーの皆様との間の権利義務関係が定められています。本サービスの利用に際しては、本規約の全文をお読みいただいたうえで、本規約に同意いただく必要があります。
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

          <section id="application" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[0].title}</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>本規約は，ユーザーと当方との間の本サービスの利用に関わる一切の関係に適用されるものとします。</li>
              <li>
                当方は本サービスに関し，本規約のほか，ご利用にあたってのルール等，各種の定め（以下，「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず，本規約の一部を構成するものとします。
              </li>
              <li>
                本規約の規定が前条の個別規定の規定と矛盾する場合には，個別規定において特段の定めなき限り，個別規定の規定が優先されるものとします。
              </li>
            </ol>
          </section>

          <section id="registration" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[1].title}</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                本サービスにおいては，登録希望者が本規約に同意の上，当方の定める方法によって利用登録を申請し，当方がこれを承認することによって，利用登録が完了するものとします。
              </li>
              <li>
                以下の場合、当方は利用登録を承認しないことがあります。
                <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                  <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                  <li>本規約に違反したことがある者からの申請である場合</li>
                  <li>その他，当方が利用登録を相当でないと判断した場合</li>
                </ul>
              </li>
            </ol>
          </section>

          <section id="account" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[2].title}</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>
                ユーザーは，自己の責任において，本サービスのユーザーIDおよびパスワードを適切に管理するものとします。
              </li>
              <li>
                当方は，ユーザーIDおよびパスワードが第三者によって使用されたことによる損害について，当方に故意または重大な過失がある場合を除き，一切の責任を負いません。
              </li>
            </ol>
          </section>

          <section id="prohibited" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[3].title}</h2>
            <p className="mb-2">ユーザーは，本サービスの利用にあたり，以下の行為をしてはなりません。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>本サービスに含まれる著作権，商標権ほか知的財産権を侵害する行為</li>
              <li>当方や他のユーザーのサーバーやネットワーク機能を妨害する行為</li>
              <li>本サービスの運営を妨害する行為</li>
              <li>その他，当方が不適切と判断する行為</li>
            </ul>
          </section>

          <section id="suspension" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[4].title}</h2>
            <p className="mb-2">当方は，以下の場合において，本サービスの提供を停止または中断することがあります。</p>
            <ul className="list-disc list-inside space-y-1">
              <li>システムの保守点検または更新を行う場合</li>
              <li>天災等の不可抗力により本サービスの提供が困難となった場合</li>
              <li>その他，当方が提供困難と判断した場合</li>
            </ul>
          </section>

          <section id="restriction" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[5].title}</h2>
            <p>
              当方は，ユーザーが本規約に違反した場合などに，本サービスの利用を制限または登録を抹消することができます。
            </p>
          </section>

          <section id="withdrawal" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[6].title}</h2>
            <p>ユーザーは，当方の定める手続により本サービスから退会できます。</p>
          </section>

          <section id="disclaimer" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[7].title}</h2>
            <p>当方は，本サービスに事実上または法律上の瑕疵がないことを保証しておりません。</p>
          </section>

          <section id="changes" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[8].title}</h2>
            <p>当方は，ユーザーへの事前の告知をもって，本サービスの内容を変更することができます。</p>
          </section>

          <section id="termsChanges" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[9].title}</h2>
            <p>当方は，本規約を変更する場合には，事前にユーザーに通知し，合理的な範囲で変更を行います。</p>
          </section>

          <section id="privacy" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[10].title}</h2>
            <p>
              当方は，本サービスの利用によって取得する個人情報について，当方のプライバシーポリシーに従い適切に取り扱います。
            </p>
          </section>

          <section id="jurisdiction" className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">{sections[11].title}</h2>
            <ol className="list-decimal list-inside space-y-2">
              <li>本規約の解釈には日本法を準拠法とします。</li>
              <li>紛争が生じた場合，本店所在地を管轄する裁判所を専属管轄とします。</li>
            </ol>
          </section>
        </CardContent>
      </Card>
    </main>
  )
}

