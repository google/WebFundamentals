project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Demander un examen {: .page-title }

Pour que nous cessions d'indiquer aux internautes que votre site ou votre page sont 
dangereux ou potentiellement trompeurs, vous devez nous demander de les réexaminer.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Ce dont vous aurez besoin

* Une bonne connaissance des commandes du shell/du terminal

## Ce que vous allez devoir faire

### 1. Prérequis

Avant d'envoyer une demande d'examen, vérifiez que vous avez effectué les étapes ci-dessous :

* Valider la propriété de votre site dans la Search Console
* Réparer les dommages causés par le pirate informatique sur votre site
* Corriger la faille
* Remettre en ligne votre site nettoyé

### 2. Vérifiez à nouveau que vos pages sont disponibles et non infectées

Pour plus de sûreté, utilisez les commandes Wget ou cURL pour consulter les pages de votre site, telles que votre 
page d'accueil et une URL modifiée par le pirate informatique. Elles devraient à présent être saines. Si tel est le cas, 
et si vous êtes certain qu'il en est de même pour l'ensemble des pages de votre site, 
vous pouvez effectuer une demande d'examen.

Remarque : Vos pages doivent pouvoir être explorées par Googlebot pour vérifier 
qu'elles ne sont pas infectées. Assurez-vous qu'aucun robot ne bloque leur exploration 
et qu'aucune balise META ou directive `noindex` pour les robots n'empêche leur indexation.

### 3. Demandez un examen

Avant de demander un examen :

* **Assurez-vous que le problème a bien été résolu**. 
Dans le cas contraire, votre site sera signalé comme étant dangereux 
pendant plus longtemps encore.

* **Vérifiez à nouveau à quel endroit vous devriez demander un examen**. L'examen est effectué 
au sein d'un outil spécifique en fonction du problème auquel votre site est confronté.
Reportez-vous aux informations ci-dessous.


#### A. Site piraté

*Une notification de site piraté est affichée dans le 
[**rapport Actions manuelles**](https://www.google.com/webmasters/tools/manual-action)
 de la Search Console :*

1. Après avoir exécuté les différentes étapes du processus de nettoyage, 
vous pouvez revenir au rapport [Actions manuelles](https://www.google.com/webmasters/tools/manual-action)
 et rechercher le problème sous la forme d'une correspondance à l'échelle du site ou d'une correspondance
 partielle.
2. Sélectionnez **Request a review**.

    Pour que vous puissiez envoyer une demande d'examen, nous vous demandons de fournir des informations supplémentaires
 sur les mesures que vous avez prises pour nettoyer le site. Pour chaque catégorie de problème de sécurité, vous pouvez décrire en
 une phrase la manière dont le site a été nettoyé (par exemple : "Pour les URL piratées
 par injection de contenu, j'ai supprimé les éléments contenant du spam et corrigé la faille
 en mettant à jour un plug-in obsolète.").


#### B. Logiciels indésirables (y compris malveillants)

*Vous avez reçu une notification de logiciels malveillants ou indésirables dans le 
[**rapport Problèmes de sécurité**](https://www.google.com/webmasters/tools/security-issues)
 de la Search Console :*

1. Ouvrez à nouveau le 
[**rapport Problèmes de sécurité**](https://www.google.com/webmasters/tools/security-issues)
 dans la Search Console. Il affiche peut-être encore les avertissements et les exemples
 d'URL infectées que vous avez pu consulter précédemment.
2. Sélectionnez **Request a review**.

    Pour que vous puissiez envoyer une demande d'examen, nous vous demandons de fournir des informations supplémentaires
 sur les mesures que vous avez prises pour résoudre le cas de non-respect des règles sur votre site. Par exemple : 
"J'ai supprimé le code tiers qui diffusait des logiciels malveillants sur mon
 site Web et je l'ai remplacé par une version plus récente".


*Vous n'avez reçu aucune notification de logiciels malveillants ou indésirables dans le 
[**rapport Problèmes de sécurité**](https://www.google.com/webmasters/tools/security-issues)
de la Search Console, mais vous en avez reçu une dans votre compte AdWords :*

1. Envoyez une demande d'examen par le biais du 
[Centre d'assistance AdWords](https://support.google.com/adwords/contact/site_policy).


#### C. Hameçonnage ou ingénierie sociale

*Vous avez reçu une notification d'hameçonnage dans le 
[**rapport Problèmes de sécurité**](https://www.google.com/webmasters/tools/security-issues)
de la Search Console :*

1. Ouvrez à nouveau le
 [**rapport Problèmes de sécurité**](https://www.google.com/webmasters/tools/security-issues)
 dans la Search Console. Il affiche peut-être encore les avertissements et les exemples
 d'URL infectées que vous avez pu consulter précédemment.
2. Sélectionnez **Request a review**.

    Pour que vous puissiez envoyer une demande d'examen, nous vous demandons de fournir des informations supplémentaires
 sur les mesures que vous avez prises pour résoudre le cas de non-respect des règles sur votre site. Par exemple :
 "J'ai supprimé la page qui invitait les utilisateurs à saisir des informations personnelles".

3. Vous pouvez également faire une demande d'examen à l'adresse suivante : 
[google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Ce rapport permet de signaler les avertissements qui, selon les propriétaires du
 site, ne sont pas justifiés, mais aussi de déclencher un réexamen des pages
 d'hameçonnage qui ont été nettoyées afin de supprimer les avertissements.

### 4. Attendez la fin de l'examen

* **Durée de traitement des demandes de réexamen suite à un piratage de type spam :** le traitement des demandes de réexamen d'un site concerné par un piratage de type
 spam peut prendre plusieurs semaines, car ces demandes
 peuvent nécessiter une recherche manuelle ou un retraitement complet des
 pages piratées. Si le nouvel examen est concluant, les catégories de
 piratage et les exemples d'URL piratées ne s'afficheront plus dans la section "Problèmes de sécurité".
* **Durée de traitement des demandes de réexamen suite à un piratage de type logiciel malveillant :** le traitement des demandes de réexamen
 d'un site infecté par un logiciel malveillant prend quelques jours. Une fois le réexamen terminé, vous
 recevrez la réponse dans la section **Messages** de la Search Console.
* **Durée de traitement des demandes de réexamen suite à un problème d'hameçonnage :** le traitement des demandes de réexamen suite à un problème
 d'hameçonnage prend environ une journée. Si le nouvel examen est concluant, l'avertissement pour cause d'hameçonnage visible par les internautes
 sera supprimé, et il se peut que votre page s'affiche à nouveau dans les résultats de recherche.

Si nous constatons que votre site n'est plus infecté, les avertissements dans les navigateurs et les
 résultats de recherche seront supprimés dans les 72 heures.

Si nous estimons que vous n'avez pas résolu le problème, d'autres exemples
 d'URL infectées s'affichent généralement dans le rapport "Problèmes de sécurité" de la Search Console,
 afin de vous aider lors de votre prochaine recherche. Les avertissements pour cause de logiciels malveillants, d'hameçonnage ou de piratage de type
 spam continuent de s'afficher dans les résultats de recherche et/ou
 les navigateurs afin de protéger les internautes.

### Étapes finales

* **Si votre demande a été approuvée**, vérifiez que votre site fonctionne comme prévu,
  c'est-à-dire que les pages se chargent correctement et qu'il est possible de cliquer sur les liens. Pour que leur site reste sûr,
 nous recommandons à tous les propriétaires de mettre en œuvre le plan de maintenance et de sécurité
 établi à l'étape [Nettoyer votre site et en assurer la maintenance](clean_site).

    Pour en savoir plus, vous pouvez consulter les ressources suivantes sur
 [StopBadware](https://www.stopbadware.org) (en anglais) :

      * [Preventing badware: basics] (Les bases de la prévention contre les logiciels malveillants)(https://www.stopbadware.org/prevent-badware-basics)
      * [Additional resources: hacked sites] (Ressources supplémentaires : sites piratés)(https://www.stopbadware.org/hacked-sites-resources)
 
* **Si votre demande n'a pas été approuvée**, réexaminez votre site à la recherche de
 [logiciels malveillants](hacked_with_malware) ou de [spam](hacked_with_spam), et vérifiez que de nouvelles
 modifications ou de nouveaux fichiers n'ont pas été ajoutés par le pirate informatique. Vous pouvez également
 envisager de demander une aide supplémentaire aux
 [spécialistes de votre équipe d'assistance](support_team).
