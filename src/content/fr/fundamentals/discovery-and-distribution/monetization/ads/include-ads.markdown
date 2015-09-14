---
title: "Insérer des annonces Google AdSense sur votre site"
description: "Suivez les étapes de ce guide pour découvrir comment insérer des annonces dans votre site. Créez un compte Google AdSense, créez des blocs d'annonces, placez ces blocs sur votre site, configurez les paramètres de paiement, puis recevez votre paiement."
updated_on: 2014-07-31
key-takeaways:
  tldr: 
    - "Pour créer un compte Google AdSense, vous devez être âgé de 18 ans, posséder un compte Google, ainsi qu'une adresse."
    - "Votre site Web doit être en ligne avant l'envoi de votre demande et son contenu doit respecter le règlement Google AdSense."
    - "Créez des blocs d'annonces adaptatives pour vous assurer que votre annonce s'affiche correctement, quel que soit l'appareil utilisé par l'internaute."
    - "Validez les paramètres de paiement, puis attendez que l'argent commence à arriver."
notes:
  crawler:
    - "Assurez-vous que le robot d'exploration Google AdSense est autorisé à accéder à votre site (consultez cet <a href='https://support.google.com/adsense/answer/10532'>article du centre d'aide</a>). "
  body:
    - "Collez tout le code de l'annonce dans la balise `body`, sinon les annonces ne s'afficheront pas."
  smarttag:
    - "Les codes <code>data-ad-client</code> et <code>data-ad-slot</code> sont uniques à chaque annonce que vous générez."
    - "La balise <code>data-ad-format=auto</code> du code de l'annonce générée active le dimensionnement intelligent dans le bloc d'annonces adaptatives."
---

<p class="intro">
  Suivez les étapes de ce guide pour découvrir comment insérer des annonces dans votre site. Créez un compte Google AdSense, créez des blocs d'annonces, placez ces blocs sur votre site, configurez les paramètres de paiement, puis recevez votre paiement.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Construire une page d'exemple contenant des annonces

Dans ce cours, vous allez construire une page simple qui contient des annonces adaptatives, à l'aide de Google AdSense et du Web Starter Kit :

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="Exemple de site Web contenant des annonces pour les ordinateurs et pour les mobiles">

Si vous n'avez jamais utilisé le Web Starter Kit, consultez la page [Configurer le Web Starter Kit]({{site.fundamentals}}/tools/setup/setup_kit.html).

Afin d'insérer des annonces sur votre site et de recevoir des paiements, vous devez suivre les simples étapes suivantes :

1. Créez un compte Google AdSense.
2. Créez des blocs d'annonces.
3. Placez ces blocs sur une page.
4. Configurez les paramètres de paiement.

## Créer un compte Google AdSense
Pour pouvoir diffuser des annonces sur votre site, vous devez posséder un compte Google AdSense actif. Si vous n'avez pas encore fait, vous devez [créer un compte](https://www.google.com/adsense/) et accepter les conditions d'utilisation du service Google AdSense. Lors de la création du compte, vous devrez valider les conditions suivantes :

* Vous avez au moins 18 ans et vous possédez un compte Google validé.
* Vous êtes propriétaire d'un site Web ou d'un autre contenu en ligne respectant
le [règlement du programme Google AdSense](https://support.google.com/adsense/answer/48182). Les annonces sont hébergées sur le site en question.
* Vous disposez d'une adresse postale et d'une adresse électronique associées à votre compte bancaire, pour pouvoir recevoir des paiements.

## Créer des blocs d'annonces

Un bloc d'annonces est un ensemble d'annonces qui s'affichent sur votre page, grâce à un code JavaScript que vous insérez dans votre page. Les trois options suivantes vous permettent de dimensionner la taille des blocs d'annonces :

* **[Adaptative (recommandé)](https://support.google.com/adsense/answer/3213689)**. 
* [Prédéfinie](https://support.google.com/adsense/answer/6002621).
* [Personnalisée](https://support.google.com/adsense/answer/3289364).

Vous construisez un site adaptatif. Utilisez des blocs d'annonces adaptatives.
Les annonces adaptatives sont automatiquement redimensionnées en fonction de la taille de l'appareil et de la largeur du conteneur parent.
Elles fonctionnent en ligne avec la présentation adaptative de votre site, lui garantissant ainsi un affichage optimal sur tous les types d'appareils.

Si vous n'utilisez pas de blocs d'annonces adaptatives, vous devrez écrire une quantité de code supplémentaire bien plus importante pour contrôler l'apparence des annonces en fonction de l'appareil utilisé par l'internaute. Même si vous devez spécifier la taille exacte des blocs d'annonces, utilisez les blocs d'annonces adaptatives en [mode avancé]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough).

Afin de simplifier le code et de vous faciliter la tâche, le code d'annonce adaptative ajuste automatiquement la taille du blocs d'annonces à la présentation de votre page. 
Le code calcule la taille requise de manière dynamique, selon la largeur du conteneur parent du bloc d'annonces, puis sélectionne la taille d'annonce la plus performante pour ce conteneur.
Par exemple, un site optimisé pour les mobiles d'une largeur de 360 pixels peut afficher un blocs d'annonces d'une taille de 320 x 50 pixels.

Pour connaître le [classement des tailles d'annonces les plus performantes](https://support.google.com/adsense/answer/6002621#top) actuel, consultez le [Guide des tailles d'annonces](https://support.google.com/adsense/answer/6002621#top) de Google AdSense.

### Pour créer un bloc d'annonces adaptatives

1. Accédez à l'onglet [Mes annonces](https://www.google.com/adsense/app#myads-springboard).
2. Cliquez sur <strong>+ Nouveau bloc d'annonces</strong>.
3. Donnez un nom unique à votre bloc d'annonces. Il est affiché dans le code de l'annonce collé sur le site, veillez à ce qu'il soit explicite.
4. Sélectionnez <strong>Adaptative</strong> dans la liste déroulante 'Taille de l'annonce'.
5. Sélectionnez <strong>annonces textuelles et graphiques</strong> dans la liste déroulante 'Type d'annonce'.
6. Cliquez sur <strong>enregistrer et obtenir le code</strong>.
7. Dans la fenêtre <strong>Code de l'annonce</strong> qui s'affiche, sélectionnez l'option <strong>Dimensionnement intelligent (recommandé)</strong> dans la liste déroulante `Mode`. 
Il s'agit du mode recommandé, grâce auquel vous n'avez aucune modification à effectuer dans le code de l'annonce.

Après la création du bloc d'annonces, un code à insérer sur votre site s'affiche dans Google AdSense. Ce code a l'apparence suivante :

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Insérer des blocs d'annonce sur votre site

Pour insérer l'annonce sur la page, vous devez coller le code fourni par Google AdSense dans notre balisage. Si vous souhaitez insérer plusieurs annonces, vous pouvez réutiliser le même bloc d'annonces ou en créer plusieurs.

1. Ouvrez le fichier `index.html` dans le dossier `Applications`.
2. Collez le code fourni dans la balise `main`.
3. Enregistrez le fichier, puis essayez de l'afficher dans le navigateur. Essayez ensuite de l'ouvrir sur un appareil mobile ou avec l'émulateur de Chrome.

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="Exemple de site Web contenant des annonces pour les ordinateurs et pour les mobiles">
    <br>
    Faites un essai
  </a>
</div>

## Configurer les paramètres de paiement

Vous vous demandez quand votre paiement sera versé ? Vous aimeriez savoir si votre paiement sera versé ce mois-ci ou le mois prochain ? Assurez-vous d'avoir suivi toutes les étapes de la procédure indiquée ci-dessous :

1. Vérifiez que vous avez fourni toutes les informations fiscales obligatoires dans le [profil du bénéficiaire](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE). 
2. Confirmez que le nom et l'adresse du bénéficiaire sont corrects.
3. Sélectionnez un mode de paiement sur la page des [Paramètres de paiement](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Saisissez votre [code secret](https://support.google.com/adsense/answer/157667). Ce code secret permet de valider l'exactitude des informations relatives à votre compte.
5. Vérifiez que le solde de votre compte atteint le [seuil de paiement](https://support.google.com/adsense/answer/1709871). 

Pour toute autre question, consultez la page de [Présentation des paiements Google AdSense](https://support.google.com/adsense/answer/1709858).


