project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Announcing the release of a new country dimension in the Chrome User Experience Report.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-10-23 #}
{# wf_published_on: 2018-01-24 #}
{# wf_tags: ux #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Announcing the release of a new country dimension in the Chrome User Experience Report. #}

# Отчет о работе с пользователями Chrome: новый размер страны {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) (CrUX) является общедоступным набором данных реальных данных о производительности пользователя. Поскольку в нашем [announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) одним из наиболее востребованных дополнений была способность лучше понимать различия в пользовательском опыте в разных местах. Основываясь на этой обратной связи, мы расширяем существующий набор данных CrUX - который обеспечивает глобальный обзор во всех географических регионах - также включает сборник отдельных наборов данных по конкретным странам!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

Например, на скриншоте выше мы видим запрос, который сравнивает совокупные плотности для эффективных типов соединений 4G и 3G в нескольких странах. Интересно посмотреть, как распространены 4G скорости в Японии, в то время как скорости 3G все еще очень распространены в Индии. Подобное понимание стало возможным благодаря новому размеру страны.

Чтобы начать работу, [CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) к [CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) на BigQuery, и вы увидите список наборов данных, организованных [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) от `country_ae` (Объединенные Арабские Эмираты) до `country_za` (Южная Африка). `all` набор данных `all` по-прежнему существует для сбора глобальных данных о совокупной производительности. В каждом наборе данных есть ежемесячные таблицы, начиная с самого последнего отчета, `201712` . Подробное руководство по [CrUX documentation](/web/tools/chrome-user-experience-report/) см. В нашем обновленном документе [CrUX documentation](/web/tools/chrome-user-experience-report/) .

Мы рады поделиться с вами этими новыми данными и надеемся, что вы их используете, чтобы улучшить работу пользователей в Интернете. Чтобы получить помощь, задавайте вопросы, предлагайте отзывы или делитесь результатами своего собственного анализа, присоединяйтесь к обсуждению в [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) . И если свободного уровня на BigQuery недостаточно для того, чтобы сдержать энтузиазм запросов, мы все еще [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) , чтобы дать вам [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) , так что идите, чтобы получить ваши кредиты, пока [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) последним!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
