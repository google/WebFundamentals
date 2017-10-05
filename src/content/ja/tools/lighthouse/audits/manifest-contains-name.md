project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Ligjthouse の監査項目「マニフェストでアプリ名を定義する」のリファレンス ドキュメント。

{# wf_updated_on:2016-09-21 #}
{# wf_published_on:2016-09-21 #}

#  マニフェストでアプリ名を定義する {: .page-title }

##  監査が重要である理由 {: #why }

ウェブアプリ マニフェストの `name` プロパティの値は、ユーザーのモバイル端末に表示されます。よって、人が読める形式のアプリ名を指定する必要があります。


`short_name` が指定されていない場合、モバイル端末のホーム画面では、アプリアイコンの下に `name` の値がラベルとして表示されます。


##  監査に合格する方法 {: #how }

ウェブアプリ マニフェストに `name` プロパティを追加します。

    {
      ...
      "name": "Air Horner",
      ...
    }

Chrome における[最大文字数](https://developer.chrome.com/apps/manifest/name)は 45 文字です。


アプリに "Add to Homescreen"
機能を適切に実装して、テストを実施する方法については、[マニフェストを使用する](manifest-exists#how)で紹介しているガイドをご覧ください。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse ではマニフェストを取得して、`name` プロパティがあるか検証します。
なお、Lighthouse で取得するマニフェストは、Chrome がページで使用するマニフェストとは別のファイルであるため、正確な結果が出ない場合があります。



{# wf_devsite_translation #}
