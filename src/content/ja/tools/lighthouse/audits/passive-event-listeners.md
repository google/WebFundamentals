project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「Passive Event Listener を使用してサイトでのスクロール パフォーマンスを向上させる」のリファレンス ドキュメント。

{# wf_updated_on:2016-11-30 #}
{# wf_published_on:2016-11-30 #}

#  Passive Event Listener を使用してサイトでのスクロール パフォーマンスを向上させる {: .page-title }

##  監査が重要である理由 {: #why }

タップやホイールのイベントリスナに `passive` オプションを指定すると、スクロールのパフォーマンスを向上させることができます。


概要については、[Passive Event Listener を使用してスクロールのパフォーマンスを改善する][blog]をご覧ください。


技術的な詳細については、Passive Event Listener の仕様の [Explainer][explainer] をご確認ください。


[blog]: https://developers.google.com/web/updates/2016/06/passive-event-listeners
[explainer]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md

##  監査に合格する方法 {: #how }

Lighthouse で特定されたすべてのイベントリスナに `passive` フラグを追加します。
一般的に、`preventDefault()`
を呼び出さない `wheel`、`mousewheel`、`touchstart`、`touchmove` のイベントリスナには、すべて `passive` フラグを追加してください。


Passive Event Listener に対応したブラウザでは、フラグを設定するように、簡単にリスナを `passive` として指定できます。


    document.addEventListener('touchstart', onTouchStart, {passive: true});

ただし、Passive Event Listener に対応していないブラウザの場合は、3 つ目のパラメータはイベントを伝搬または捕捉するかを示すブール値になります。
上記の構文を使用すると、意図しない結果が生じる場合があります。

Passive Event Listener を適切に実装する方法については、[Feature Detection][polyfill] でポリフィルをご確認ください。


[polyfill]: https://github.com/WICG/EventListenerOptions/blob/gh-pages/explainer.md#feature-detection

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse では以下のアルゴリズムに基づいて、Passive Event Listener を使用すべきリスナを報告します。


1. ページ上のイベントリスナをすべて検出する。
1. タップまたはホイール以外のリスナを除外する。
1. `preventDefault()` を呼び出すリスナを除外する。
1. ページとホストが異なるリスナを除外する。


Lighthouse では、別のホスト上のスクリプトは制御不可能とみなされるため、ホストが異なるリスナは除外されます。
そのため、Lighthouse の監査では、全体的なページ スクロールのパフォーマンスを評価しているわけではない点に注意してください。
サードパーティーのスクリプトがページ スクロールのパフォーマンスに悪影響を及ぼしていたとしても、それらのスクリプトは Lighthouse
のレポートには表示されません。



{# wf_devsite_translation #}
