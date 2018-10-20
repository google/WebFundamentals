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

{: .page-title }ユーザーエクスペリエンスレポート:新しい国の次 {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) （CrUX）は、実際のユーザーパフォーマンスデータの公開データセットです。私たちは[announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html)報告書を[announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html)以来、最も求められていた追加点の1つは、場所間のユーザーエクスペリエンスこのフィードバックに基づいて、すべての地域でグローバルな視野を提供する既存のCrUXデータセットを拡張し、別個の国固有のデータセットを追加します。

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

たとえば、上のスクリーンショットでは、いくつかの国の4Gと3Gの有効接続タイプの集約密度を比較するクエリを紹介します。興味深いのは、日本で普及している4Gの速度がどのようになっているかを見ることです.3Gの速度はインドでも非常に一般的です。これらのような洞察は、新しい国の次元のおかげで可能になりました。

開始するには、BigQueryの[CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all)し[CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all)によって整理されたデータセットのリストが表示され[country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) （南アフリカ[country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)から`country_ae` （アラブ首長国連邦）までの`country_za` [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)を[country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) 。使い慣れた`all`データセットは、まだ全体的な集計パフォーマンスデータを取得するためのものです。各データセット内には、最新のレポート`201712`から始まる月ごとのテーブルがあります。開始方法の詳細については、更新された[CrUX documentation](/web/tools/chrome-user-experience-report/)を参照してください。

この新しいデータを皆様と共有して、ウェブ上でのユーザーエクスペリエンスを向上させる方法でご利用いただけることを嬉しく思います。ヘルプを表示したり、質問をしたり、フィードバックを提供したり、自分の分析結果を共有したりするには、 [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report)ディスカッションに参加して[CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report)ます。 BigQueryの無料層では、あなたの質問に熱意を抱かせることができない場合は、引き続き[extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform)宣伝しています[extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform)ので、消耗品は最後にクレジットを取得してください！

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}