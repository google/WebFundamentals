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

# Отчет об опыте работы с Chrome: новый размер страны {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) (CrUX) является общедоступным набором данных реальных данных о производительности пользователя. Поскольку мы [announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) отчет, одним из наиболее востребованных дополнений была способность лучше понимать различия в пользовательский интерфейс в разных местах. Основываясь на этой обратной связи, мы расширяем существующий набор данных CrUX - который обеспечивает глобальный обзор во всех географических регионах - также включает сборник отдельных наборов данных по конкретным странам!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

Например, на скриншоте выше мы видим запрос, который сравнивает совокупные плотности для эффективных типов соединений 4G и 3G в нескольких странах. Интересно посмотреть, как распространены 4G скорости в Японии, в то время как скорости 3G все еще очень распространены в Индии. Подобное понимание стало возможным благодаря новому размеру страны.

Чтобы начать работу, [CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) в BigQuery, и вы увидите список наборов данных, организованных [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) от `country_ae` (Объединенные Арабские Эмираты) `country_za` (Южная Африка). `all` набор данных «все» все еще существует для сбора глобальных данных о совокупной производительности. В каждом наборе данных есть ежемесячные таблицы, начинающиеся с самого последнего отчета `201712` . Подробное руководство по [CrUX documentation](/web/tools/chrome-user-experience-report/) см. В нашей обновленной [CrUX documentation](/web/tools/chrome-user-experience-report/) .

Мы рады поделиться с вами этими новыми данными и надеемся, что вы их используете, чтобы улучшить работу пользователей в Интернете. Чтобы получить помощь, задать вопросы, предложить отзывы или поделиться результатами своего собственного анализа, присоединиться к обсуждению на [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) . И если свободного уровня на BigQuery недостаточно, чтобы сдержать энтузиазм запросов, мы все еще проводим рекламную кампанию, чтобы дать вам [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) , так что пойдите, получите свои кредиты, пока запасы [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) !

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}