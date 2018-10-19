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

# Rapport d'expérience utilisateur Chrome: nouvelle dimension de pays {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

Le [Chrome User Experience Report](/web/tools/chrome-user-experience-report/) (CrUX) est un jeu de données public contenant des données de performances utilisateur réelles. Depuis que nous avons [annoncé](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) le rapport, l'un des ajouts les plus demandés a été la capacité de mieux comprendre les différences d'expérience utilisateur entre les sites. Sur la base de ces informations, nous développons l'ensemble de données CrUX existant - qui fournit une vue globale de toutes les régions géographiques - afin d'inclure également une collection d'ensembles de données distincts spécifiques à chaque pays!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

Par exemple, dans la capture d'écran ci-dessus, une requête compare les densités agrégées des types de connexion effectifs 4G et 3G dans quelques pays. Ce qui est intéressant, c’est de voir à quel point les vitesses 4G sont répandues au Japon, alors que les vitesses 3G sont encore très répandues en Inde. De telles connaissances sont rendues possibles grâce à la nouvelle dimension nationale.

Pour commencer, rendez-vous dans le [projet CrUX](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) sur BigQuery. Une liste de jeux de données organisée par [code de pays](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) de `country_ae` (Émirats arabes unis) à `country_za` (Afrique du Sud). Le jeu de données `all` bien connu est toujours là pour capturer les données de performances globales globales. Dans chaque jeu de données, il y a des tables mensuelles commençant par le rapport le plus récent, `201712` . Pour une présentation détaillée de la procédure de démarrage, veuillez vous reporter à notre [Documentation CrUX] mise à jour (2).

Nous sommes ravis de partager ces nouvelles données avec vous et espérons que vous les utiliserez de manière à améliorer l'expérience utilisateur sur le Web. Pour obtenir de l'aide, poser des questions, formuler des commentaires ou partager les résultats de votre propre analyse, rejoignez la discussion sur le [forum CrUX](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report). Et si le niveau gratuit de BigQuery ne suffit pas à contenir votre enthousiasme pour les requêtes, nous continuons à organiser une promotion pour vous donner un [10 TB gratuits supplémentaires](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform), alors profitez de vos crédits jusqu'à épuisement des stocks!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}