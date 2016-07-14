---
title: "Mise en cache HTTP"
description: "Récupérer quelque chose sur le réseau coûte du temps et de l'argent : les réponses volumineuses peuvent nécessiter de nombreux allers-retours entre le client et le serveur, ce qui retarde leur mise à disposition et leur traitement par le navigateur. Cela a également un coût en termes de données pour le visiteur. En conséquence, la capacité à mettre en cache et à réutiliser des ressources récupérées précédemment est un aspect essentiel de l'optimisation des performances."
updated_on: 2014-01-05
key-takeaways:
  validate-etags:
    - "Le jeton de validation est communiqué par le serveur via l'en-tête HTTP ETag"
    - "Le jeton de validation permet de contrôler la mise à jour des ressources de façon efficace : aucun transfert de données n'est effectué si la ressource n'a pas changé."
  cache-control:
    - "Chaque ressource peut définir ses règles de mises en cache via l'en-tête HTTP Cache-Control"
    - "Les directives Cache-Control contrôlent qui peut mettre en cache la réponse, à quelles conditions et pour combien de temps"
  invalidate-cache:
    - "Les réponses mises en cache de façon locale sont utilisées jusqu'à `expiration` de la ressource"
    - "L'intégration d'une empreinte digitale de contenu de fichier dans l'URL nous permet de forcer le client à mettre à jour la réponse avec une nouvelle version"
    - "Chaque application doit définir sa propre hiérarchie de mise en cache pour des performances optimales"
notes:
  webview-cache:
    - "Si vous utilisez un affichage Web pour récupérer et afficher du contenu en ligne dans votre application, vous aurez peut-être besoin de fournir des indicateurs de configuration supplémentaires pour vous assurer que le cache HTTP est activé, que sa taille est adaptée à votre situation et que le cache est conservé. Consultez la documentation de la plate-forme et confirmez vos paramètres !"
  boilerplate-configs:
    - "Conseil : le projet HTML5 Boilerplate contient des <a href='https://github.com/h5bp/server-configs'>exemples de fichiers de configuration</a> pour tous les serveurs les plus populaires, ainsi que des commentaires détaillés pour chaque indicateur et paramètre de configuration : recherchez votre serveur de prédilection dans la liste, recherchez les paramètres concernés, et copiez les paramètres recommandés ou vérifiez qu'ils sont configurés pour votre serveur."
  cache-control:
    - "L'en-tête Cache-Control a été défini dans le cadre de la spécification HTTP/1.1 et remplace les en-têtes précédents (par exemple Expires) utilisés pour définir les règles de mise en cache de la réponse. Tous les navigateurs modernes sont compatibles avec Cache-Control. Nous n'avons donc besoin de rien d'autre."
---

<p class="intro">
  Récupérer quelque chose sur le réseau coûte du temps et de l'argent : les réponses volumineuses peuvent nécessiter de nombreux allers-retours entre le client et le serveur, ce qui retarde leur mise à disposition et leur traitement par le navigateur. Cela a également un coût en termes de données pour le visiteur. En conséquence, la capacité à mettre en cache et à réutiliser des ressources récupérées précédemment est un aspect essentiel de l'optimisation des performances.
</p>


{% include shared/toc.liquid %}

Excellente nouvelle : chaque navigateur est fourni avec une mise en œuvre d'un cache HTTP ! Il nous suffit donc de nous assurer que la réponse de chaque serveur fournit des directives d'en-tête HTTP correctes pour indiquer au navigateur quand et pendant combien de temps il peut mettre la réponse en cache.

{% include shared/remember.liquid character="{" position="left" title="" list=page.notes.webview-cache %}

<img src="images/http-request.png" class="center" alt="Requête HTTP">

Chaque fois que le serveur renvoie une réponse, il émet également une collection d'en-têtes HTTP décrivant son type de contenu, sa longueur, ses directives de mises en cache, son jeton de validation, etc. Par exemple, dans l'échange ci-dessus le serveur renvoie une réponse à 1 024 octets, demande au client de la mettre en cache pendant 120 secondes, et fournit un jeton de validation ('x234dff') qui peut être utilisé une fois que la réponse a expiré pour vérifier si la ressource a été modifiée.


## Valider les réponses mises en cache avec ETags

{% include shared/takeaway.liquid list=page.key-takeaways.validate-etags %}

Supposons que 120 secondes se sont écoulées depuis notre récupération initiale, et que le navigateur a lancé une nouvelle requête pour la même ressource. Tout d'abord, le navigateur contrôle le cache local et y trouve la réponse précédente. Il ne peut malheureusement pas l'utiliser, car celle-ci a 'expiré'. À ce stade, il pourrait simplement envoyer une nouvelle requête et récupérer la nouvelle réponse complète, mais cette méthode est inefficace, car si la ressource n'a pas changé, il n'y a pas de raison de télécharger exactement les mêmes octets que ceux qui se trouvent déjà dans le cache !

Les jetons de validation tels qu'ils sont définis dans l'en-tête ETag sont conçus pour résoudre ce problème : le serveur génère et renvoie un jeton arbitraire, généralement un hachage ou une autre empreinte digitale du contenu du fichier. Le client n'a pas besoin de savoir comment l'empreinte digitale est générée. Il lui suffit de l'envoyer au serveur à la requête suivante : si l'empreinte digitale est toujours la même, alors la ressource n'a pas changé et il est inutile d'effectuer le téléchargement.

<img src="images/http-cache-control.png" class="center" alt="Exemple de Cache-Control HTTP">

Dans l'exemple ci-dessus, le client fournit automatiquement le jeton ETag dans l'en-tête de requête HTTP `If-None-Match`, le serveur compare le jeton à la ressource actuelle, et s'il n'a pas changé, renvoie une réponse `304 Not Modified` qui indique au navigateur que la réponse qui se trouve dans le cache n'a pas changé et peut être renouvelée pour 120 secondes supplémentaires. Notez qu'il n'est pas nécessaire de télécharger à nouveau la réponse, ce qui permet d'économiser du temps et de la bande passante.

En tant que développeur Web, comment tirez-vous profit de cette nouvelle validation efficace ? Le navigateur fait tout le travail pour vous : il détecte automatiquement si un jeton de validation a déjà été spécifié, l'ajoute à une requête envoyée, et met à jour les horodatages du cache si nécessaire en fonction de la réponse du serveur. **Il ne nous reste plus qu'à nous assurer que le serveur fournit bien les jetons ETag nécessaires : consultez la documentation de votre serveur pour connaître les indicateurs de configuration nécessaires.**

{% include shared/remember.liquid list=page.notes.boilerplate-configs %}


## Cache-Control

{% include shared/takeaway.liquid list=page.key-takeaways.cache-control %}

La meilleure requête est une requête qui n'a pas besoin de communiquer avec le serveur : une copie locale de la réponse nous permet d'éliminer toute latence sur le réseau et d'éviter les frais de données pour le transfert de données. Pour y parvenir, la spécification HTTP autorise le serveur à renvoyer [plusieurs directives Cache-Control différentes](http://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html#sec14.9) qui contrôlent comment et pendant combien de temps la réponse individuelle peut être mise en cache par le navigateur et autres caches intermédiaires.

{% include shared/remember.liquid list=page.notes.cache-control %}

<img src="images/http-cache-control-highlight.png" class="center" alt="Exemple de Cache-Control HTTP">

### `no-cache` et `no-store`

'no-cache' indique que la réponse renvoyée ne peut pas être utilisée pour satisfaire une requête ultérieure à la même URL sans avoir au préalable vérifié auprès du serveur si la réponse a changé. En conséquence, si un jeton de validation adapté (ETag) est présent, l'élément `no-cache` induit un aller-retour pour valider la réponse mise en cache, mais peut éliminer le téléchargement si la ressource n'a pas changé.

En revanche, l'élément `no-store` est beaucoup plus simple, puisqu'il interdit au navigateur et à tout cache intermédiaire de stocker toute version de la réponse renvoyée. C'est la cas par exemple des réponses qui contiennent des données confidentielles, personnelles ou bancaires. Chaque fois que l'utilisateur demande cet élément, une requête est envoyée au serveur et une réponse complète est téléchargée.

### `public` ou `private`

Si la réponse est marquée comme étant publique, elle peut être mise en cache, même si elle est associée à une authentification HTTP, et même si le code d'état de la réponse ne peut normalement pas être mis en cache. La plupart du temps l'élément `public` n'est pas nécessaire, car les informations de mises en cache explicites, telles que `max-age`, indiquent
que la réponse peut quand même être mise en cache.

En revanche, les réponses portant l'élément `private` peuvent être mises en cache par le navigateur, mais concernent généralement un seul utilisateur, et ne peuvent donc pas être mises en cache par un cache intermédiaire. Par exemple, une page HTML contenant des informations confidentielles sur l'utilisateur peut être mise en cache par le navigateur de cet utilisateur, mais pas par un CDN.

### `max-age`

Cette directive indique la durée maximale en secondes pendant laquelle la réponse récupérée peut être réutilisée, à partir de l'envoi de la requête. Par exemple, `max-age=60` indique que la réponse peut être mise en cache et réutilisée pendant les 60 secondes qui suivent.

## Définir des règles optimales pour Cache-Control

<img src="images/http-cache-decision-tree.png" class="center" alt="Arborescence de décision du cache">

Suivez l'arborescence de décision ci-dessus pour déterminer les règles de mise en cache optimales pour une ressource particulière ou un ensemble de ressources utilisés par votre application. Idéalement, vous devez essayer de mettre en cache autant de réponses que possible sur le client, le plus longtemps possible, et de fournir des jetons de validation pour chaque réponse, afin de permettre une revalidation efficace.

<table class="mdl-data-table mdl-js-data-table">
<thead>
  <tr>
    <th width="30%">Directives Cache-Control</th>
    <th>Explication</th>
  </tr>
</thead>
<tr>
  <td data-th="cache-control">max-age=86400</td>
  <td data-th="explication">La réponse peut être mise en cache par le navigateur et tout cache intermédiaire (elle est donc 'publique') pendant un maximum de 1 jour (60 secondes x 60 minutes x 24 heures)</td>
</tr>
<tr>
  <td data-th="cache-control">private, max-age=600</td>
  <td data-th="explication">La réponse ne peut être mise en cache que par le navigateur du client pendant un maximum de 10 minutes (60 secondes x 10 minutes)</td>
</tr>
<tr>
  <td data-th="cache-control">no-store</td>
  <td data-th="explication">La réponse n'est pas autorisée à être mise en cache et doit être récupérée en intégralité à chaque requête.</td>
</tr>
</table>

Selon HTTP Archive, parmi les 300 000 premiers sites (classement Alexa rank), [près de la moitié de l'ensemble des réponses téléchargées peut être mise en cache](http://httparchive.org/trends.php#maxage0) par le navigateur, ce qui représente une économie colossale pour les affichages de pages et visites répétées ! Bien sûr, cela ne signifie pas que pour votre application spécifique 50 % des ressources pourront être mises en cache. Certains sites peuvent mettre en cache plus de 90 % de leurs ressources, alors que d'autres contiennent un grand nombre de données confidentielles ou temporaires qui ne peuvent absolument pas être mises en cache.

**Auditez vos pages pour identifier quelles ressources peuvent être mises en cache, et assurez-vous qu'elles renvoient des en-têtes Cache-Control et ETag adaptés.**


## Invalider et mettre à jour les réponses mises en cache

{% include shared/takeaway.liquid list=page.key-takeaways.invalidate-cache %}

Toutes les requêtes HTTP envoyées par le navigateur sont d'abord acheminées vers le cache du navigateur pour vérifier si une réponse valide mise en cache peut être utilisée pour répondre à la requête. En cas de correspondance, la réponse est lue depuis le cache, et nous éliminons à la fois la latence du réseau et les coûts encourus par le transfert des données. **Cependant, que se passe-t-il si nous souhaitons mettre à jour ou invalider une réponse mise en cache ?**

Imaginons par exemple que nous avons demandé à nos visiteurs de mettre en cache une feuille de style CSS pour une durée maximale de 24 heures (max-age=86400), mais que notre concepteur vient de valider une mise à jour que nous souhaitons rendre disponible pour tous nos utilisateurs. Comment pouvons-nous informer tous les visiteurs, avec ce qui est maintenant une copie mise en cache 'obsolète' de notre code CSS, qu'ils doivent mettre à jour leur cache ? C'est une question piège : c'est impossible, du moins pas sans modifier l'URL de la ressource.

Une fois la réponse mise en cache par le navigateur, la version mise en cache est utilisée jusqu'à ce qu'elle ne soit plus valable, selon ce qui est défini par l'élément `max-age` ou `expires`, ou jusqu'à ce qu'elle soit supprimée du cache pour une autre raison, par exemple lorsque l'utilisateur nettoie le cache de son navigateur. En conséquence, différents utilisateurs pourront utiliser des versions différentes du fichier lorsque la page est créée : les utilisateurs qui viennent de récupérer la ressource utiliseront la nouvelle version, alors que ceux qui ont mis en cache une copie antérieure (mais toujours valide) utiliseront une version plus ancienne de sa réponse.

**Alors, comment faire pour concilier le meilleur des deux mondes : la mise en cache côté client et des mises à jour rapides ?** Simplement en modifiant l'URL de la ressource et en forçant l'utilisateur à télécharger la nouvelle réponse à chaque fois que son contenu change. Pour ce faire, on intègre généralement une empreinte digitale du fichier ou un numéro de version dans le nom du fichier en question. Par exemple : style.**x234dff**.css.

<img src="images/http-cache-hierarchy.png" class="center" alt="Hiérarchie du cache">

La capacité à définir des règles de mise en cache en fonction des ressources nous permet de définir des 'hiérarchies de cache', afin de contrôler non seulement la durée de mise en cache pour chaque ressource, mais également au bout de combien de temps les nouvelles versions sont visibles par les visiteurs. Analysons l'exemple ci-dessus :

* Le code HTML est associé à l'attribut `no-cache`, ce qui signifie que le navigateur valide toujours le document à chaque requête et récupère la dernière version si son contenu change. De plus, nous intégrons dans le balisage HTML des empreintes digitales dans les URL pour les éléments CSS et JavaScript : si le contenu de ces fichiers change, alors le code HTML de la page change également et une nouvelle copie de la réponse HTML est téléchargée.
* Les navigateurs et caches intermédiaires (un CDN, par exemple) sont autorisés à mettre le code CSS en cache, et celui-ci expire au bout d'un an. Notez que nous pouvons utiliser sans risque l'élément `far future expires` de un an, car nous intégrons l'empreinte digitale du fichier dans le nom de celui-ci : si le code CSS est mis à jour, l'URL sera également modifiée.
* Le code JavaScript est également défini pour expirer au bout d'un an, mais il est marqué comme étant privé, peut-être parce qu'il contient des données utilisateur confidentielles que le CDN ne doit pas mettre en cache.
* L'image est mise en cache sans empreinte digitale de version ou unique, et est définie pour expirer au bout d'un jour.

La combinaison d'en-têtes ETag et Cache-Control, et d'URL uniques nous permet d'offrir le meilleur des deux mondes : des délais d'expiration longs, un contrôle sur l'emplacement de la mise en cache de la réponse et des mises à jour sur demande.

## Mettre en cache la liste de contrôle

Il n'existe pas de règles de mise en cache meilleures que les autres. Selon vos schémas de trafic, le type de données affiché et les conditions requises spécifiques à l'application pour la fraîcheur des données, vous devez définir et configurer les paramètres adaptés à chaque ressource, ainsi que la 'hiérarchie de cache' globale.

Voici quelques conseils et techniques à garder à l'esprit lorsque vous travaillez sur la stratégie de cache :

1. **Utilisez des URL cohérentes** : si vous affichez le même contenu sur des URL différentes, ce contenu sera récupéré et stocké plusieurs fois. Conseil : Notez que les [URL sont sensibles à la casse](http://www.w3.org/TR/WD-html40-970708/htmlweb.html) !
2. **Assurez-vous que le serveur fournit un jeton de validation (ETag)** : les jetons de validation éliminent la nécessité de transférer les mêmes octets lorsqu'une ressource n'a pas changé sur le serveur.
3. **Identifiez quelles ressources peuvent être mises en cache par des intermédiaires** : celles dont les réponses sont identiques pour tous les utilisateurs sont d'excellentes candidates pour la mise en cache par un CDN et d'autres intermédiaires.
4. **Déterminez la durée de mise en cache optimale pour chaque ressource** : différentes ressources peuvent avoir différentes exigences en matière d'actualisation. Auditez et déterminez l'élément `max-age` adapté à chacune.
5. **Déterminez la meilleure hiérarchie de cache pour votre site** : la combinaison d'URL de ressources et d'empreintes digitales de contenu, ainsi que de durées de vie courtes ou `no-cache` pour les document HTML vous permet de contrôler à quel point les mises à jour sont récupérées rapidement par le client.
6. **Minimisez le brassage** : certaines ressources sont mises à jour plus fréquemment que d'autres. Si une partie spécifique d'une ressource, telle qu'une fonction JavaScript ou un ensemble de styles CSS, est mise à jour fréquemment, pensez à livrer ce code dans un fichier distinct. Ainsi, le reste du contenu (par exemple du code de bibliothèque qui n'est modifié que rarement) peut être récupéré dans le cache, et la quantité de contenu téléchargé est réduite à chaque fois qu'une mise à jour est récupérée.




