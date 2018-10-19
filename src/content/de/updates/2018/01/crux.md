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

# Chrome User Experience Report: Neue Länderdimension {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

Der [Chrome User Experience-Bericht](/web/tools/chrome-user-experience-report/) (CrUX) ist ein öffentlicher Datensatz realer Benutzerleistungsdaten. Seit wir (1) den Bericht angekündigt haben, war eine der am häufigsten nachgefragten Ergänzungen die Fähigkeit, Unterschiede in der Benutzererfahrung über Standorte hinweg besser zu verstehen. Basierend auf diesem Feedback erweitern wir den bestehenden CrUX-Datensatz, der eine globale Sicht über alle geografischen Regionen hinweg bietet, um auch eine Sammlung von separaten länderspezifischen Datensätzen einzubeziehen!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

Im obigen Screenshot sehen wir beispielsweise eine Abfrage, die die Aggregatdichten für effektive 4G- und 3G-Verbindungstypen in einigen Ländern vergleicht. Interessant ist, wie verbreitet 4G-Geschwindigkeiten in Japan sind, während 3G-Geschwindigkeiten in Indien immer noch sehr verbreitet sind. Erkenntnisse wie diese werden dank der neuen Länderdimension ermöglicht.

Um loszulegen, gehen Sie zum [CrUX-Projekt](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) auf BigQuery und Sie sehen eine Liste von Datensätzen geordnet nach [Ländercode](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) von `country_ae` (Vereinigte Arabische Emirate) nach `country_za` (Südafrika). Der bekannte `all` -Datensatz ist immer noch vorhanden, um die globalen Gesamtleistungsdaten zu erfassen. Innerhalb jedes Datensatzes gibt es monatliche Tabellen beginnend mit dem letzten Bericht, `201712` . Eine detaillierte Anleitung zum Einstieg finden Sie in unserer aktualisierten [CRUX-Dokumentation](/web/tools/chrome-user-experience-report/).

Wir freuen uns, diese neuen Daten mit Ihnen teilen zu können und hoffen, dass Sie sie nutzen, um die Nutzererfahrung im Web zu verbessern. Um Hilfe zu bekommen, Fragen zu stellen, Feedback zu geben oder Ergebnisse aus Ihrer eigenen Analyse zu teilen, nehmen Sie an der Diskussion im [CRUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) teil. Und wenn die kostenlose Stufe auf BigQuery nicht ausreicht, um Ihre anfragende Begeisterung einzudämmen, führen wir immer noch eine Aktion durch, um Ihnen [zusätzliche 10 TB frei](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) zu geben, also erhalten Sie Ihre Kredite, solange der Vorrat reicht!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}