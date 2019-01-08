project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# API de peinture CSS {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

## Nouvelles possibilités dans Chrome 65 L&#39;API CSS Paint (également connue sous le nom de «Peinture personnalisée CSS» ou «Le worklet de peinture de Houdini») est sur le point d&#39;être activée par défaut dans Chrome Stable. Qu&#39;Est-ce que c&#39;est? Que pouvez-vous en faire? Et comment ça marche? Eh bien, lisez la suite, ça va…


CSS Paint API vous permet de générer par programme une image chaque fois qu&#39;une propriété CSS attend une image. Des propriétés telles que `background-image` ou `border-image` sont généralement utilisées avec `url()` pour charger un fichier image ou avec des fonctions CSS intégrées telles que `linear-gradient()` . Au lieu de les utiliser, vous pouvez maintenant utiliser `paint(myPainter)` pour référencer un _paint worklet_.

### Ecriture d&#39;un worklet de peinture

Pour définir un worklet de peinture appelé `myPainter` , nous devons charger un fichier de worklet de peinture CSS à l&#39;aide de `CSS.paintWorklet.addModule('my-paint-worklet.js')` . Dans ce fichier, nous pouvons utiliser la fonction `registerPaint` pour enregistrer une classe de worklet de peinture:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

Dans le rappel `paint()` , nous pouvons utiliser `ctx` la même manière que nous aurions un `CanvasRenderingContext2D` tel que nous le connaissons dans `<canvas>` . Si vous savez dessiner un `<canvas>` , vous pouvez dessiner un worklet de peinture! `geometry` nous indique la largeur et la hauteur de la toile mise à notre disposition. `properties` je l&#39;expliquerai plus tard dans cet article.

Note: le contexte d&#39;un worklet de peinture n&#39;est pas identique à 100% à un contexte `<canvas>` . À l&#39;heure actuelle, les méthodes de rendu du texte sont manquantes et pour des raisons de sécurité, vous ne pouvez pas lire les pixels du canevas.

Comme exemple d&#39;introduction, écrivons un worklet de peinture en damier et utilisons-le comme image d&#39;arrière-plan d&#39;un `<textarea>` . (J&#39;utilise une zone de texte parce qu&#39;elle est redimensionnable par défaut.):

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

Si vous avez utilisé `<canvas>` par le passé, ce code devrait vous paraître familier. Voir le live [demo](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/) ici.

Note: Comme avec presque toutes les nouvelles API, CSS Paint API est uniquement disponible via HTTPS (ou `localhost` ).

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="
  Textarea with a checkerboard pattern as a background image.">

La différence par rapport à l&#39;utilisation d&#39;une image d&#39;arrière-plan commune ici est que le motif est redessiné à la demande, chaque fois que l&#39;utilisateur redimensionne la zone de texte. Cela signifie que l&#39;image d&#39;arrière-plan est toujours exactement aussi grande que nécessaire, y compris la compensation pour les écrans haute densité.

C&#39;est plutôt cool, mais c&#39;est aussi assez statique. Voulons-nous écrire un nouveau worklet chaque fois que nous voulions le même motif mais avec des carrés de tailles différentes? La réponse est non!

### Paramétrage de votre worklet

Heureusement, le worklet de peinture peut accéder à d’autres propriétés CSS. C’est là que le paramètre supplémentaire `properties` entre en jeu. En attribuant à la classe un attribut `inputProperties` statique, vous pouvez souscrire aux modifications apportées à toute propriété CSS, y compris les propriétés personnalisées. Les valeurs vous seront données via le paramètre `properties` .

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

Nous pouvons maintenant utiliser le même code pour tous les types de damiers. Mais mieux encore, nous pouvons maintenant accéder à DevTools et à [fiddle with the values](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/) jusqu&#39;à ce que nous trouvions le bon look.

<div style="display: flex; justify-content: center">
  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: il serait bon de paramétrer les couleurs aussi, n&#39;est-ce pas? La spécification permet à la fonction `paint()` de prendre une liste d&#39;arguments. Cette fonctionnalité n&#39;est pas encore implémentée dans Chrome, car elle s&#39;appuie fortement sur l&#39;API Propriétés et valeurs de Houdini, qui nécessite encore du travail avant d&#39;être livrée.

## Navigateurs qui ne prennent pas en charge le worklet Paint Au moment de la rédaction, seul le worklet Paint de Chrome était implémenté. Bien qu&#39;il y ait des signaux positifs de tous les autres fournisseurs de navigateurs, il n&#39;y a pas beaucoup de progrès. Pour vous tenir au courant, vérifiez régulièrement [Is Houdini Ready Yet?](https://ishoudinireadyyet.com) . En attendant, veillez à utiliser l&#39;amélioration progressive pour que votre code reste actif même s&#39;il n&#39;y a pas de support pour le worklet de peinture. Pour vous assurer que tout fonctionne comme prévu, vous devez ajuster votre code à deux endroits: le CSS et le JS.

La détection du support pour un worklet de peinture dans JS peut être effectuée en vérifiant l&#39;objet `CSS` :

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

Pour le côté CSS, vous avez deux options. Vous pouvez utiliser `@supports` :

    @supports (background: paint(id)) {
      /* ... */
    }

Une astuce plus compacte consiste à utiliser le fait que CSS invalide et par la suite ignore une déclaration de propriété entière si elle contient une fonction inconnue. Si vous spécifiez une propriété deux fois - d&#39;abord sans worklet de peinture, puis avec le worklet de peinture - vous obtenez une amélioration progressive:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

Dans les navigateurs _with_ support for paint worklet, la deuxième déclaration de `background-image` écrasera la première. Dans les navigateurs _sans_ le support des travaux de peinture, la deuxième déclaration est invalide et sera supprimée, laissant la première déclaration en vigueur.

### CSS Paint Polyfill

Pour de nombreuses utilisations, il est également possible d’utiliser [CSS Paint Polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill) , qui ajoute la prise en charge de CSS Custom Paint et Paint Worklets aux navigateurs modernes.

## Cas d&#39;utilisation Il existe de nombreux cas d&#39;utilisation de worklets de peinture, certains plus évidents que d&#39;autres. L’une des plus évidentes consiste à utiliser un worklet de peinture pour réduire la taille de votre DOM. Souvent, des éléments sont ajoutés uniquement pour créer des embellissements à l&#39;aide de CSS. Par exemple, dans [Material Design Lite](https://getmdl.io) le bouton avec l’effet d’ondulation contient 2 éléments `<span>` supplémentaires pour implémenter l’ondulation elle-même. Si vous avez beaucoup de boutons, cela peut donner lieu à de nombreux éléments DOM et à une dégradation des performances sur mobile. Si vous [implement the ripple effect using paint worklet](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/) place, vous vous retrouvez avec 0 éléments supplémentaires et un seul worklet de peinture. De plus, vous avez quelque chose de beaucoup plus facile à personnaliser et à paramétrer.

L’utilisation de paint worklet présente un autre avantage: dans la plupart des scénarios, une solution utilisant un worklet de peinture est réduite en octets. Bien sûr, il y a un compromis: votre code de peinture s&#39;exécutera chaque fois que la taille de la toile ou l&#39;un des paramètres changent. Donc, si votre code est complexe et prend beaucoup de temps, cela pourrait introduire Jank. Chrome travaille à déplacer les worklets de peinture du thread principal afin que même les worklets de peinture de longue durée n&#39;affectent pas la réactivité du thread principal.

Pour moi, la perspective la plus excitante est que Paint Worklet permet de polyfiller efficacement les fonctionnalités CSS qu’un navigateur n’a pas encore. Un exemple serait polyfill [conic gradients](https://lab.iamvdo.me/houdini/conic-gradient) jusqu&#39;à l&#39;atterrissage natif dans Chrome. Autre exemple: lors d&#39;une réunion CSS, il a été décidé que vous pouvez maintenant avoir plusieurs couleurs de bordure. Pendant que cette réunion se poursuivait, mon collègue, Ian Kilpatrick, [wrote a polyfill](https://twitter.com/malyw/status/934737334494429184) ce nouveau comportement CSS à l’aide de paint worklet.

## Penser en dehors de la «boîte» La plupart des gens commencent à penser aux images d&#39;arrière-plan et aux images de bordure lorsqu&#39;ils se familiarisent avec le worklet de peinture. WORDS2 est un cas d’utilisation moins intuitif pour paint worklet: il `mask-image` aux éléments DOM de présenter des formes arbitraires. Par exemple un [diamond](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/) :

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="
  A DOM element in the shape of a diamond.">

`mask-image` prend une image qui correspond à la taille de l&#39;élément. Zones où l&#39;image du masque est transparente, l&#39;élément est transparent. Zones où l&#39;image du masque est opaque, l&#39;élément opaque.

## maintenant dans Chrome

Le worklet Paint est dans Chrome Canary depuis un moment. Avec Chrome 65, il est activé par défaut. Allez-y et essayez les nouvelles possibilités qui s&#39;ouvrent à la peinture et montrez-nous ce que vous avez construit! Pour plus d&#39;inspiration, jetez un coup d&#39;œil à [Vincent De Oliveira’s collection](https://lab.iamvdo.me/houdini/) .

Note: points d&#39;arrêt ne sont actuellement pas pris en charge dans l&#39;API CSS Paint, mais seront activés dans une version ultérieure de Chrome.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}