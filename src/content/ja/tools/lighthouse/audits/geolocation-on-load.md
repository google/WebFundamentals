project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「ページの読み込み時に自動的に位置情報をリクエストしない」のリファレンス ドキュメント。

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

#  ページの読み込み時に自動的に位置情報をリクエストしない {: .page-title }

##  監査が重要である理由 {: #why }

ページの読み込み時に位置情報が自動的にリクエストされると、ユーザーは不信感を抱いたり、混乱したりします。
よって、ページの読み込み時ではなく、ユーザー操作（[近くの店舗を検索]ボタンをタップするなど）に応じてユーザーの位置情報をリクエストするようにしてください。また、そのユーザー操作によって位置情報が必要になることが自明であるかを確認する必要があります。


##  監査に合格する方法 {: #how }

Lighthouse のレポートでは、ユーザーの位置情報をリクエストしているコードの行と列の番号が **URLs** の下に表示されます。
これらの呼び出しを削除して、ユーザー操作への応答としてリクエストを行うようにします。
 

ユーザーの位置情報をリクエストする際のベスト プラクティスについては、[ユーザーの操作時に位置情報へのアクセスをリクエストする][ask]の内容をご覧ください。


[ask]: /web/fundamentals/native-hardware/user-location/#ask_permission_responsibly

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse で監査をする前に、すでに位置情報へのアクセス権が付与されている場合は、ページの読み込み時にユーザーの位置情報がリクエストされているかどうかを判別できません。
よって、パーミッションをリセットして、Lighthouse を再実行する必要があります。詳細については、[ウェブサイトの権限を変更する][help]をご覧ください。


Lighthouse では、ページの読み込み時に実行された JavaScript の情報が収集されます。そのコードの中に `geolocation.getCurrentPosition()`
または
`geolocation.watchPosition()` への呼び出しが含まれており、位置情報へのアクセス権がまだ付与されていなかった場合は、ユーザーの位置情報がリクエストされています。


[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
