project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「ページの読み込み時に自動的に通知パーミッションをリクエストしない」のリファレンス ドキュメント。

{# wf_updated_on:2016-12-05 #}
{# wf_published_on:2016-12-05 #}

#  ページの読み込み時に自動的に通知パーミッションをリクエストしない {: .page-title }

##  監査が重要である理由 {: #why }

[適切に通知する方法][good]で説明しているとおり、適切な通知とはタイムリーで、関連性があり、正確な通知です。
ページの読み込み時にプッシュ通知のパーミッションを要求している場合、その通知はユーザーにとって関連性がなく、ユーザのニーズに合うものはない可能性があることに注意してください。
ユーザー エクスペリエンスを改善するには、まずはユーザーに対して特定のタイプの通知を表示することを提案し、ユーザーがオプトインした後でパーミッションをリクエストするようにします。



[good]: /web/fundamentals/push-notifications/

##  監査に合格する方法 {: #how }

Lighthouse のレポートでは、通知送信のパーミッションをリクエストしているコードの行と列の番号が **URLs** の下に表示されます。
これらの呼び出しを削除して、ユーザー操作への応答としてリクエストを行うようにします。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse
で監査をする前に、すでに通知パーミッションが付与または拒否されている場合は、ページの読み込み時にプッシュ通知のパーミッションがリクエストされているかどうかを判別できません。
よって、パーミッションをリセットして、Lighthouse を再実行する必要があります。
詳細については、[ウェブサイトの権限を変更する][help]をご覧ください。

Lighthouse では、ページの読み込み時に実行された JavaScript の情報が収集されます。そのコードの中に `notification.requestPermission()`
への呼び出しが含まれており、通知パーミッションがまだ付与されていなかった場合は、通知パーミッションがリクエストされています。


[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
