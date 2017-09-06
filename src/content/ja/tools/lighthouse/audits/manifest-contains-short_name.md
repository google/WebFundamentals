project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Ligjthouse の監査項目「マニフェストでアプリの省略名を定義する」のリファレンス ドキュメント。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

#  マニフェストでアプリの省略名を定義する {: .page-title }

##  監査が重要である理由 {: #why }

ユーザーがアプリをホーム画面に追加すると、ホーム画面上でアプリ アイコンの下に `short_name` のテキストが表示されます。
一般的に、アプリの正式名称を表示するにはスペースが足りない場合に、省略名が使用されます。


##  監査に合格する方法 {: #how }

ウェブアプリ マニフェストに `short_name` プロパティを追加します。

    {
      ...
      "short_name": "Air Horner",
      ...
    }

Chrome
で[推奨される最大文字数](https://developer.chrome.com/apps/manifest/name#short_name)は 12
文字です。

アプリに "Add to Homescreen"
機能を適切に実装して、テストを実施する方法については、[マニフェストを使用する](manifest-exists#how)で紹介しているガイドをご覧ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

マニフェストに `short_name` か `name` プロパティのいずれかが含まれていれば、監査に合格します。
なお、Lighthouse で取得するマニフェストは、Chrome がページで使用するマニフェストとは別のファイルであるため、正確な結果が出ない場合があります。



{# wf_devsite_translation #}
