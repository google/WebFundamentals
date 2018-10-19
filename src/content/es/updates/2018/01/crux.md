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

# Informe de experiencia de usuario de Chrome: Nueva dimensión de país {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

El [Informe de experiencia de usuario de Chrome](/web/tools/chrome-user-experience-report/) (CrUX) es un conjunto de datos público de datos de rendimiento de usuarios reales. Desde que [anunciamos](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) el informe, una de las adiciones más solicitadas ha sido la capacidad de comprender mejor las diferencias en la experiencia del usuario en todas las ubicaciones. Basándonos en estos comentarios, estamos ampliando el conjunto de datos CrUX existente, que proporciona una visión global de todas las regiones geográficas, ¡para incluir también una colección de conjuntos de datos separados específicos de cada país!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

Por ejemplo, en la captura de pantalla anterior vemos una consulta que compara las densidades agregadas para los tipos de conexión efectiva 4G y 3G en unos pocos países. Lo interesante es ver cómo prevalecen las velocidades de 4G en Japón, mientras que las velocidades de 3G son todavía muy comunes en la India. Ideas como estas son posibles gracias a la nueva dimensión del país.

Para comenzar, diríjase al [proyecto CrUX](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) en BigQuery y verá una lista de conjuntos de datos organizados por [código de país](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) desde `country_ae` (Emiratos Árabes Unidos) hasta `country_za` (Sudáfrica). El familiar conjunto de datos `all` todavía está allí para capturar los datos globales de rendimiento agregado. Dentro de cada conjunto de datos, hay tablas mensuales que comienzan con el informe más reciente, `201712` . Para obtener una guía detallada sobre cómo comenzar, consulte nuestra [documentación de CrUX] actualizada (2).

Estamos encantados de compartir esta nueva información con usted y esperamos ver que la use para mejorar la experiencia del usuario en la web. Para obtener ayuda, hacer preguntas, ofrecer comentarios o compartir los resultados de su propio análisis, únase a la discusión en el [foro de CrUX](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report). Y si el nivel gratuito en BigQuery no es suficiente para contener su entusiasmo por las consultas, todavía estamos realizando una promoción para darle un [10 extra TB gratis](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform), así que ¡obtenga sus créditos hasta agotar existencias!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}