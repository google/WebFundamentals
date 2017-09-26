project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「マニフェストを使用する」のリファレンス ドキュメント。

{# wf_updated_on:2016-09-20 #}
{# wf_published_on:2016-09-20 #}

#  マニフェストを使用する {: .page-title }

##  監査が重要である理由 {: #why }

ウェブアプリ マニフェストは、ユーザーのホーム画面にウェブアプリを追加可能にするためのウェブ テクノロジーです。
この機能は、一般的に「Add to Homescreen (A2HS)」と呼ばれます。


##  監査に合格する方法 {: #how }

既存のアプリに A2HS 機能を追加する方法については、実践形式のコードラボ、[ユーザーのホーム画面にウェブアプリを追加する](https://codelabs.developers.google.com/codelabs/add-to-home-screen)
で順を追って説明しています。


ウェブアプリ マニフェストに関するより詳細な情報については、[ウェブアプリ マニフェストを使用してユーザー エクスペリエンスを改善する](/web/fundamentals/engage-and-retain/web-app-manifest)ためのガイドをご覧ください。



これらのガイドで学習した内容をもとに、自身のウェブアプリに A2HS 機能を追加してください。


Chrome DevTools では A2HS イベントをエミュレートし、テストすることができます。さらに詳しい情報については、[ウェブアプリ マニフェスト](/web/tools/chrome-devtools/debug/progressive-web-apps/#manifest)をご覧ください。



{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse ではマニフェストを取得して、データがあるか検証します。なお、Lighthouse
で取得するマニフェストは、Chrome がページで使用するマニフェストとは別のファイルであるため、正確な結果が出ない場合があります。



{# wf_devsite_translation #}
