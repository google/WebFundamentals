project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Announcing the release of a new country dimension in the Chrome User Experience Report.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-24 #}
{# wf_tags: ux #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Announcing the release of a new country dimension in the Chrome User Experience Report. #}

# Chromeユーザーエクスペリエンスレポート:新しい国の寸 {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chromeユーザーエクスペリエンスレポート](/web/tools/chrome-user-experience-report/)（CrUX）は、実際のユーザーのパフォーマンスデータの公開データセットです。私たちは（1）レポートを発表して以来、最も要求の高い追加機能の1つは、場所間のユーザーエクスペリエンスの違いをよりよく理解できる機能でした。このフィードバックに基づいて、すべての地域でグローバルな視野を提供する既存のCrUXデータセットを拡張し、別個の国固有のデータセットを追加します。

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

たとえば、上のスクリーンショットでは、いくつかの国の4Gと3Gの有効接続タイプの集約密度を比較するクエリを紹介します。興味深いのは、日本で普及している4Gの速度がどのようになっているかを見ることです.3Gの速度はインドでも非常に一般的です。これらのような洞察は、新しい国の次元のおかげで可能になりました。

開始するには、BigQueryの[CrUXプロジェクト](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all)に移動し、`country_ae` （アラブ首長国連邦）から`country_za` （南アフリカ）まで[国コード](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)で整理されたデータセットのリストが表示されます。使い慣れた`all` データセットは、まだ全体的な集計パフォーマンスデータを取得するためのものです。各データセット内には、最新のレポート`201712` から始まる月ごとのテーブルがあります。始める方法の詳細なウォークスルーについては、更新された[CrUX documentation](/web/tools/chrome-user-experience-report/)を参照してください。

この新しいデータを皆様と共有して、ウェブ上でのユーザーエクスペリエンスを向上させる方法でご利用いただけることを嬉しく思います。ヘルプを入手したり、質問をしたり、フィードバックを提供したり、自分の分析結果を共有したりするには、[CrUXフォーラム](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report)のディスカッションに参加してください。 BigQueryの無料層では、あなたの質問に熱意を抱かせることができない場合は、[10 TB無料](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform)を提供するプロモーションが実行されています。

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}