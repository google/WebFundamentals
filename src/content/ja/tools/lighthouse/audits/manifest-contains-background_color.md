project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Ligjthouse の監査項目「マニフェストで background_color を指定する」のリファレンス ドキュメント。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

#  マニフェストで背景色を指定する {: .page-title }

##  監査が重要である理由 {: #why }

ユーザーのホーム画面からウェブアプリを起動する場合、アプリの読み込み中に、ブラウザは
`background_color` プロパティを使用してブラウザの背景に色を付けます。
この処理によって、アプリを起動してからアプリのコンテンツが読み込まれるまでの画面遷移がスムーズに見えます。


##  監査に合格する方法 {: #how }

ウェブアプリ マニフェストに `background_color` プロパティを追加します。値には、有効な CSS 色を指定できます。


    {
      ...
      "background_color": "cornflowerblue",
      ...
    }

アプリに "Add to Homescreen"
機能を適切に実装して、テストを実施する方法については、[マニフェストを使用する](manifest-exists#how)で紹介しているガイドをご覧ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

マニフェストに `background_color` プロパティが含まれていれば、監査に合格します。
なお、Lighthouse で取得するマニフェストは、Chrome がページで使用するマニフェストとは別のファイルであるため、正確な結果が出ない場合があります。
また、Lighthouse では、値が有効な CSS 色であることは確認しません。



{# wf_devsite_translation #}
