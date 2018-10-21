project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Nouveautés de DevTools (Chrome 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Les nouvelles fonctionnalités de DevTools dans Chrome 65 incluent:

* [**Local Overrides**](#overrides)
* [New accessibility tools](#a11y)
* [The **Changes** tab](#changes)
* [New SEO and performance audits](#audits)
* [Multiple recordings in the **Performance** panel](#recordings)
* [Reliable code stepping with workers and asynchronous code](#stepping)

Lisez la suite ou regardez la version vidéo de ces notes de publication ci-dessous.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: vérifiez la version de Chrome que vous utilisez sur `chrome://version` . Si vous utilisez une version antérieure, ces fonctionnalités n&#39;existeront pas. Si vous utilisez une version ultérieure, ces fonctionnalités peuvent avoir changé. Chrome met à jour automatiquement une nouvelle version majeure toutes les 6 semaines environ.

## local remplace {: #overrides }

** Les remplacements locaux ** vous permettent d&#39;apporter des modifications à DevTools et de les conserver tout au long du chargement des pages. Auparavant, toute modification apportée dans DevTools était perdue lorsque vous rechargiez la page.
** Les substitutions locales ** fonctionnent pour la plupart des types de fichiers, à quelques exceptions près. Voir [Limitations](#overrides-limitations) .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</figure>

Comment ça marche:

* Vous spécifiez un répertoire dans lequel DevTools doit enregistrer les modifications.
* Lorsque vous apportez des modifications dans DevTools, DevTools enregistre une copie du fichier modifié dans votre répertoire.
* Lorsque vous rechargez la page, DevTools sert le fichier modifié local plutôt que la ressource réseau.

Pour configurer les ** dérogations locales **:

1. Ouvrez le panneau ** Sources **. 1. Ouvrez l&#39;onglet ** Remplacements **.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Cliquez sur ** Setup Overrides **. 1. Sélectionnez le répertoire dans lequel vous souhaitez enregistrer vos modifications. 1. En haut de la fenêtre, cliquez sur ** Autoriser ** pour donner à DevTools un accès en lecture et en écriture au répertoire. 1. Faites vos changements.

### Limitations {: #overrides-limitations }

* DevTools n&#39;enregistre pas les modifications apportées dans l&#39;arborescence ** DOM ** du panneau ** Elements **. Modifiez le code HTML dans le panneau ** Sources ** à la place.
* Si vous modifiez CSS dans le volet ** Styles ** et que la source de ce CSS est un fichier HTML, DevTools n&#39;enregistrera pas le changement. Modifiez le fichier HTML dans le panneau ** Sources ** à la place.

### Fonctions associées {: #overrides-related }

* [Workspaces][WS] . DevTools mappe automatiquement les ressources réseau sur un référentiel local. Chaque fois que vous apportez une modification à DevTools, cette modification est également enregistrée dans votre référentiel local.

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## L&#39;onglet Modifications {: #changes }

Suivez les modifications que vous apportez localement dans DevTools via le nouvel onglet ** Modifications **.

<figure>
  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</figure>

## Nouveaux outils d&#39;accessibilité {: #a11y }

Utilisez le nouveau volet ** Accessibilité ** pour examiner les propriétés d&#39;accessibilité d&#39;un élément, ainsi que le rapport de contraste des éléments de texte du ** Sélecteur de couleurs ** pour vous assurer qu&#39;ils sont accessibles aux utilisateurs malvoyants ou aux couleurs dégradées. déficiences de la vision.

### Volet d&#39;accessibilité {: #a11y-pane }

Utilisez le volet ** Accessibilité ** du panneau ** Eléments ** pour examiner les propriétés d&#39;accessibilité de l&#39;élément actuellement sélectionné.

<figure>
  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</figure>

Consultez l&#39;étiquette A11ycast de Rob Dodson sur l&#39;étiquetage ci-dessous pour voir le volet ** Accessibility ** en action.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</div>

### Rapport de contraste dans le sélecteur de couleurs {: #contrast }

Le [Color Picker][CP] vous montre maintenant le rapport de contraste des éléments de texte. L&#39;augmentation du rapport de contraste des éléments de texte rend votre site plus accessible aux utilisateurs malvoyants ou souffrant de troubles de la vision des couleurs. Voir [Color and contrast][contrast] pour en savoir plus sur l&#39; [Color and contrast][contrast] du rapport de contraste sur l&#39;accessibilité.

L&#39;amélioration du contraste des couleurs de vos éléments de texte rend votre site plus utilisable par <i>tous les</i> utilisateurs. En d&#39;autres termes, si votre texte est gris avec un arrière-plan blanc, il est difficile à lire pour quiconque.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</figure>

Dans ** Figure 5 **, les deux cases à cocher à côté de ** 4.61 ** signifient que cet élément est conforme à [enhanced recommended contrast ratio (AAA)][enhanced]{:.external} . S&#39;il n&#39;y avait qu&#39;une coche, cela signifierait qu&#39;il a rencontré le [minimum recommended contrast ratio (AA)][minimum]{:.external} .

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

Cliquez sur ** Afficher plus **! [Show More][SM]{:.cdt-inl} pour développer la section ** Contrast Ratio **. La ligne blanche dans la zone ** Color Spectrum ** (Spectre de couleurs **) représente la limite entre les couleurs conformes au rapport de contraste recommandé et celles qui ne le sont pas. Par exemple, depuis la couleur grise dans
** La figure 6 ** correspond aux recommandations. Cela signifie que toutes les couleurs situées au-dessous de la ligne blanche sont également conformes aux recommandations.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</figure>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### Fonctions associées {: #contrast-related }

Le panneau ** Audits ** dispose d’un audit d’accessibilité automatisé pour garantir que
* chaque * élément de texte d&#39;une page a un rapport de contraste suffisant.

Voir [Run Lighthouse in Chrome DevTools][audit] , ou regardez le A11ycast ci-dessous, pour apprendre à utiliser le panneau ** Audits ** pour tester l&#39;accessibilité.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</div>

[audit]: /web/tools/lighthouse/#devtools

## Nouveaux audits {: #audits }

Chrome 65 est livré avec une toute nouvelle catégorie d&#39;audits de référencement et de nombreux nouveaux audits de performance.

Note: le panneau ** Audits ** est alimenté par [Lighthouse][LH] . Chrome 64 exécute la version 2.5 de phare. Chrome 65 exécute la version 2.8 de phare. Cette section est donc simplement un résumé des mises à jour de Lighthouse de 2.6, 2.7 et 2.8.

### Nouveaux audits de référencement {: #seo }

En vous assurant que vos pages réussissent chacune des vérifications de la nouvelle catégorie ** SEO **, vous pourrez améliorer votre classement dans les moteurs de recherche.

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</figure>

### Nouveaux audits de performance {: #performance }

Chrome 65 est également livré avec de nombreux nouveaux audits de performance:

* Le temps de démarrage de JavaScript est élevé
* Utilise une politique de cache inefficace sur les actifs statiques
* Évite les redirections de page
* Le document utilise des plugins
* Minify CSS
* Minify JavaScript

<aside class="key-point">
  <b>Perf matters!</b> After Mynet improved their page load speed by 4X, users spent 43% more time
  on the site, viewed 34% more pages, bounce rates dropped 24%, and revenue increased 25% per
  article pageview. <a href="/web/showcase/2017/mynet">Learn more</a>.
</aside>

<aside class="success">
  <b>Tip!</b> If you want to improve the load performance of your pages, but don't know where
  to start, try the <b>Audits</b> panel. You give it a URL, and it gives you a detailed report
  on many different ways you can improve that page. <a href="/web/tools/lighthouse/#devtools">Get
  started</a>.
</aside>

### Autres mises à jour {: #audits-other }

* [New, manual accessibility audits](/web/updates/2018/01/lighthouse#a11y)
* [Updates to the WebP audit][webp] pour le rendre plus inclusif des autres formats d&#39;image de nouvelle génération
* [A rehaul of the accessibility score][a11yscore]
* Si un audit d&#39;accessibilité n&#39;est pas applicable pour une page, cet audit ne compte plus dans le score d&#39;accessibilité.
* La performance est désormais la partie la plus importante des rapports

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## Code pas à pas fiable avec les opérateurs et code asynchrone {: #stepping }

Chrome 65 apporte les mises à jour du ** Step Into **! [Step Into][into]{:.cdt-inl} bouton [Step Into][into]{:.cdt-inl} lors de l’application du code qui transmet des messages entre les threads et du code asynchrone. Si vous voulez le comportement de pas précédent, vous pouvez utiliser le nouveau ** Step **! [Step][step]{:.cdt-inl} , à la place.

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### dans le code qui transmet les messages entre les threads {: #workers }

Lorsque vous entrez dans le code qui transmet les messages entre les threads, DevTools vous montre maintenant ce qui se passe dans chaque thread.

Par exemple, l’application de la Figure 8 ** transmet un message entre le fil principal et le fil de travail. Après être intervenu dans l&#39;appel `postMessage()` sur le thread principal, DevTools s&#39;interrompt dans le gestionnaire `onmessage` du thread de travail. Le gestionnaire `onmessage` lui-même poste un message dans le thread principal. Entrer dans * cet * appel met en pause DevTools dans le thread principal.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</figure>

Lorsque vous êtes entré dans un code comme celui-ci dans les versions précédentes de Chrome, Chrome ne vous montrait que le côté thread principal du code, comme vous pouvez le voir sur la ** figure 9 **.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</figure>

### au code asynchrone {: #async }

Lorsque vous entrez dans le code asynchrone, DevTools suppose maintenant que vous souhaitez suspendre le code asynchrone qui s&#39;exécute.

Par exemple, dans la ** figure 10 **, après avoir `setTimeout()` à `setTimeout()` , DevTools exécute tout le code menant jusque-là à l&#39;arrière-plan, puis met en pause la fonction transmise à `setTimeout()` .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</figure>

Lorsque vous êtes entré dans un code comme celui-ci dans Chrome 63, DevTools a interrompu la lecture du code chronologiquement, comme vous pouvez le voir sur la ** figure 11 **.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</figure>

## Plusieurs enregistrements dans le panneau Performances {: #recordings }

Le panneau ** Performance ** vous permet maintenant de sauvegarder temporairement jusqu&#39;à 5 enregistrements. Les enregistrements sont supprimés lorsque vous fermez la fenêtre de DevTools. Voir [Get Started with Analyzing Runtime Performance][runtime] pour vous familiariser avec le panneau ** Performance **.

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>
  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</figure>

Bonus ## : automatiser les actions de DevTools avec Puppeteer 1.0 {: #puppeteer }

Note: cette section n&#39;est pas liée à Chrome 65.

La version 1.0 de Puppeteer, un outil d&#39;automatisation de navigation géré par l&#39;équipe de Chrome DevTools, est maintenant disponible. Vous pouvez utiliser Puppeteer pour automatiser de nombreuses tâches auparavant uniquement disponibles via DevTools, telles que la capture de captures d&#39;écran:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

Il dispose également d’API pour de nombreuses tâches d’automatisation généralement utiles, telles que la génération de PDF:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

Voir [Quick Start][quickstart] pour en savoir plus.

[quickstart]: /web/tools/puppeteer/get-started

Vous pouvez également utiliser Puppeteer pour exposer les fonctionnalités de DevTools lors de la navigation sans jamais ouvrir explicitement DevTools. Voir [Using DevTools Features Without Opening DevTools][without] pour un exemple.

[without]: /web/updates/2018/01/devtools-without-devtools

## Une demande de l&#39;équipe de DevTools: considérez Canary {: #canary }

Si vous utilisez un ordinateur Mac ou Windows, envisagez d&#39;utiliser [Chrome Canary][canary] comme navigateur de développement par défaut. Si vous signalez un bogue ou une modification que vous n&#39;aimez pas tant qu&#39;il est encore dans Canary, l&#39;équipe de DevTools peut traiter vos commentaires beaucoup plus rapidement.

Note: Canary est la version avancée de Chrome. Il est publié dès sa construction, sans test. Cela signifie que Canary effectue des pauses de temps en temps, environ une fois par mois, et que cela se règle habituellement en un jour. Vous pouvez revenir à l&#39;utilisation de Chrome Stable en cas de rupture de Canary.

[canary]: https://www.google.com/chrome/browser/canary.html

## Commentaires {: #feedback }

Le meilleur endroit pour discuter des fonctionnalités ou des modifications que vous voyez ici est le [google-chrome-developer-tools@googlegroups.com mailing list][ML] . Vous pouvez également nous [@ChromeDevTools](https://twitter.com/chromedevtools) si le temps vous manque. Si vous êtes sûr d’avoir rencontré un bogue dans DevTools, veuillez [open an issue](https://crbug.com/new) .

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Notes de publication précédentes {: #links }

Voir la balise [devtools-whatsnew][tag] pour des liens vers toutes les notes de publication précédentes de DevTools.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}