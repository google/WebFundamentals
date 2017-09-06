project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:Ligjthouse の監査項目「マニフェストで start_url を指定する」のリファレンス ドキュメント。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

#  マニフェストで開始 URL を指定する {: .page-title }

##  監査が重要である理由 {: #why }

ユーザーのホーム画面にウェブアプリが追加されたあと、ホーム画面からアプリが起動された際に最初に読み込まれるページは、ウェブアプリ マニフェストの `start_url`
プロパティによって決まります。


`start_url` プロパティを指定していない場合は、ユーザーがアプリをホーム画面に追加したときにアクティブだったページのいずれかが、ブラウザによってデフォルトのページとして設定されます。


##  監査に合格する方法 {: #how }

ウェブアプリ マニフェストに `start_url` プロパティを追加します。

    {
      ...
      "start_url": ".",
      ...
    }

アプリに "Add to Homescreen"
機能を適切に実装して、テストを実施する方法については、[マニフェストを使用する](manifest-exists#how)で紹介しているガイドをご覧ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse ではマニフェストを取得して、`start_url` プロパティがあるか検証します。
なお、Lighthouse で取得するマニフェストは、Chrome がページで使用するマニフェストとは別のファイルであるため、正確な結果が出ない場合があります。



{# wf_devsite_translation #}
