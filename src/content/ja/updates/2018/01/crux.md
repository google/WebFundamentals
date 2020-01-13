project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Announcing the release of a new country dimension in the Chrome User Experience Report.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-10-30 #}
{# wf_published_on: 2018-01-24 #}
{# wf_tags: ux #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Announcing the release of a new country dimension in the Chrome User Experience Report. #}

# Chromeユーザーエクスペリエンスレポート:新しい国の次元 {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) （CrUX）は、実際のユーザーパフォーマンスデータのパブリックデータセットです。我々はレポートを[announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html)いるので、最も多く要求されている追加機能の1つは、場所間のユーザーエクスペリエンスの違いをよりよく理解できることです。このフィードバックに基づいて、すべての地域でグローバルな視野を提供する既存のCrUXデータセットを拡張し、別個の国固有のデータセットを追加します。

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

たとえば、上のスクリーンショットでは、いくつかの国の4Gと3Gの有効接続タイプの集約密度を比較するクエリを紹介します。興味深いのは、日本で普及している4Gの速度がどのようになっているかを見ることです.3Gの速度はインドでも非常に一般的です。これらのような洞察は、新しい国の次元のおかげで可能になりました。

まず、BigQueryの[CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all)に[country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) 、 `country_ae` （アラブ首長国連邦）から`country_za` （南アフリカ）までの`country_za`によって整理されたデータセットのリストが表示されます。使い慣れた`all`データセットは、まだグローバルな集計パフォーマンスデータを取得するためのものです。各データセット内には、最新のレポート`201712`から始まる月ごとの表があります。開始方法に関する詳細なウォークスルーについては、更新された[CrUX documentation](/web/tools/chrome-user-experience-report/)を参照してください。

この新しいデータを皆様と共有して、ウェブ上でのユーザーエクスペリエンスを向上させる方法でご利用いただけることを嬉しく思います。助けを求めたり、質問をしたり、フィードバックを提供したり、自分の分析結果を共有したり、 [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report)に関するディスカッションに参加したり[CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report)ます。 BigQueryの無料層では、あなたの質問に熱意を[extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform)せることができない場合は、 [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform)を提供するプロモーションを実行しています。

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
