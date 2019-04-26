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

# Rapport sur l&#39;expérience utilisateur Chrome: nouvelle dimension de pays {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) (CrUX) est un ensemble de données public contenant des données de performances utilisateur réelles. Depuis que nous avons [announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) le rapport [announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) , l’un des ajouts les plus demandés a été la capacité de mieux comprendre les différences d’expérience utilisateur entre les sites. Sur la base de ces informations, nous développons l&#39;ensemble de données CrUX existant - qui fournit une vue globale de toutes les régions géographiques - afin d&#39;inclure également une collection d&#39;ensembles de données distincts spécifiques à chaque pays!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

Par exemple, dans la capture d&#39;écran ci-dessus, une requête compare les densités agrégées des types de connexion effectifs 4G et 3G dans quelques pays. Ce qui est intéressant, c’est de voir à quel point les vitesses 4G sont répandues au Japon, alors que les vitesses 3G sont encore très répandues en Inde. De telles connaissances sont rendues possibles grâce à la nouvelle dimension nationale.

Pour commencer, rendez-vous sur [CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) sur BigQuery et une liste de jeux de données organisée par [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) de `country_ae` (Émirats arabes unis) à `country_za` (Afrique du Sud). Le jeu de données `all` bien `all` est toujours là pour capturer les données de performances globales globales. Dans chaque jeu de données, il y a des tableaux mensuels commençant par le rapport le plus récent, `201712` . Pour une présentation détaillée de la procédure de démarrage, veuillez vous reporter à notre version mise à jour de [CrUX documentation](/web/tools/chrome-user-experience-report/) .

Nous sommes ravis de partager ces nouvelles données avec vous et espérons que vous les utiliserez de manière à améliorer l&#39;expérience utilisateur sur le Web. Pour obtenir de l&#39;aide, poser des questions, formuler des commentaires ou partager les résultats de votre propre analyse, rejoignez la discussion sur [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) . Et si le niveau gratuit de BigQuery ne suffit pas à contenir votre enthousiasme pour les requêtes, nous proposons toujours une promotion pour vous donner un [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) , alors allez chercher vos crédits jusqu&#39;à [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) stocks!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}