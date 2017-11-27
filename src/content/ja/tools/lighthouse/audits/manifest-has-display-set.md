project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「マニフェストで display プロパティを指定する」のリファレンス ドキュメント。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

#  マニフェストで display プロパティを指定する {: .page-title }

##  監査が重要である理由 {: #why }

ホーム画面からアプリを起動すると、ウェブアプリ マニフェストの `display` プロパティに指定したモードでアプリが表示されます。


##  監査に合格する方法 {: #how }

ウェブアプリ マニフェストに `display` プロパティを追加し、`fullscreen`、`standalone`、`browser` のいずれかの値を指定します。


    {
      ...
      "display": "fullscreen",
      ...
    }

各値の詳細については、[MDN リファレンスの display プロパティ](https://developer.mozilla.org/en-US/docs/Web/Manifest#display)の内容をご覧ください。



アプリに "Add to Homescreen"
機能を適切に実装して、テストを実施する方法については、[マニフェストを使用する](manifest-exists#how)で紹介しているガイドをご覧ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse ではマニフェストを取得して、`display`
プロパティがあることと、その値が `fullscreen`、`standalone`、`browser` でのいずれかであることを検証します。

なお、Lighthouse で取得するマニフェストは、Chrome がページで使用するマニフェストとは別のファイルであるため、正確な結果が出ない場合があります。



{# wf_devsite_translation #}
