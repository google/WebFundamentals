project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「マニフェストの short_name が切れずにホーム画面上に表示される」のリファレンス ドキュメント。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

# マニフェストに定義したアプリの省略名が切れずにホーム画面上に表示される {: .page-title }

##  監査が重要である理由 {: #why }

ユーザーがホーム画面にウェブアプリを追加すると、アプリ アイコンの下に `short_name` プロパティがラベルとして表示されます。
`short_name` が 12 文字を超えると、ホーム画面上で途中までしか表示されません。


Chrome の場合は、`short_name` が定義されておらず、`name` プロパティの値が十分に短ければ、name プロパティの値が代用されます。


##  監査に合格する方法 {: #how }

ウェブアプリ マニフェストの `short_name` プロパティを 12 文字以下にします。

    {
      ...
      "short_name": "Air Horner",
      ...
    }

または、マニフェストで `short_name` プロパティを指定しない場合は、`name`
プロパティを 12 文字以下にします。

アプリに "Add to Homescreen"
機能を適切に実装して、テストを実施する方法については、[マニフェストを使用する](manifest-exists#how)で紹介しているガイドをご覧ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse はマニフェストを取得して、`short_name` プロパティが 12 文字以下であることを検証します。
`name` プロパティは `short_name` の代わりに使用されることがあるため、Lighthouse では short_name プロパティも代替値としてテストする点に注意してください。
つまり、マニフェストに `short_name` がない場合でも、`name` が 12 文字以下であれば監査には合格します。
なお、Lighthouse
で取得するマニフェストは、Chrome がページで使用するマニフェストとは別のファイルであるため、正確な結果が出ない場合があります。



{# wf_devsite_translation #}
