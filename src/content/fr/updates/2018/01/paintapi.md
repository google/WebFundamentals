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

## Nouvelles possibilités dans Chrome 65 L'API CSS Paint (également connue sous le nom de «Peinture personnalisée CSS» ou «Worklet Houdini») est sur le point d'être activée par défaut dans Chrome Stable. Qu'Est-ce que c'est? Que pouvez-vous en faire? Et comment ça marche? Eh bien, lisez la suite, allez-vous…


CSS Paint API vous permet de générer par programme une image chaque fois qu'une propriété CSS attend une image. Des propriétés telles que `background-image` ou `border-image` sont généralement utilisées avec `url()` pour charger un fichier image ou avec des fonctions CSS intégrées telles que `linear-gradient()` . Au lieu de les utiliser, vous pouvez maintenant utiliser `paint(myPainter)` pour référencer un _paint worklet_.

### Ecrire un worklet de peinture

Pour définir un worklet de peinture appelé `myPainter` , nous devons charger un fichier de worklet de peinture CSS à l'aide de `CSS.paintWorklet.addModule('my-paint-worklet.js')` . Dans ce fichier, nous pouvons utiliser la fonction `registerPaint` pour enregistrer une classe de worklet de peinture:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

Dans le callback `paint()` , nous pouvons utiliser `ctx` de la même manière que nous utiliserions un `CanvasRenderingContext2D` tel que nous le connaissons depuis `<canvas>` . Si vous savez comment dessiner un `<canvas>` , vous pouvez dessiner un worklet de peinture! `geometry` nous indique la largeur et la hauteur de la toile à notre disposition. `properties` , je l'expliquerai plus tard dans cet article.

Note: Le contexte d’un worklet de peinture n’est pas identique à celui d’un contexte `<canvas>` . À l'heure actuelle, les méthodes de rendu du texte sont manquantes et pour des raisons de sécurité, vous ne pouvez pas lire les pixels du canevas.

En guise d’introduction, écrivons un worklet de peinture en damier et l’utilisons comme image de fond d’un `<textarea>` . (J'utilise une zone de texte car elle est redimensionnable par défaut.):

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

Si vous avez déjà utilisé `<canvas>` , ce code devrait vous paraître familier. Voir le live [démo](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/) ici.

Note: Comme avec presque toutes les nouvelles API, CSS Paint API est uniquement disponible via HTTPS (ou `localhost` ).

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="Textarea avec un motif en damier comme image de fond.">

La différence par rapport à l'utilisation d'une image d'arrière-plan commune ici est que le motif est redessiné à la demande, chaque fois que l'utilisateur redimensionne la zone de texte. Cela signifie que l'image d'arrière-plan est toujours exactement aussi grande que nécessaire, y compris la compensation pour les écrans haute densité.

C’est plutôt cool, mais c’est aussi assez statique. Voulons-nous écrire un nouveau worklet chaque fois que nous voulions le même motif mais avec des carrés de tailles différentes? La réponse est non!

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

Nous pouvons maintenant utiliser le même code pour tous les types de damiers. Mais mieux encore, nous pouvons maintenant aller dans DevTools et [modifier les valeurs](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/) jusqu'à ce que nous trouvions le bon look.

<div style="display: flex; justify-content: center">  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: Ce serait bien de paramétrer les couleurs aussi, non? La spécification permet à la fonction `paint()` de prendre une liste d'arguments. Cette fonctionnalité n’est pas encore implémentée dans Chrome, car elle fait largement appel à l’API Propriétés et valeurs de Houdini, qui nécessite encore du travail avant de pouvoir être expédiée.

## Navigateurs qui ne prennent pas en charge le worklet de peinture Au moment de la rédaction de cet article, seul le worklet de peinture de Chrome était implémenté. Bien que tous les autres fournisseurs de navigateurs émettent des signaux positifs, il n’ya pas eu beaucoup de progrès. Pour vous tenir au courant, vérifiez régulièrement [Houdini est-il prêt?](https://ishoudinireadyyet.com). En attendant, veillez à utiliser l’amélioration progressive pour que votre code continue de fonctionner même s’il n’ya pas de support pour le worklet de peinture. Pour vous assurer que tout fonctionne comme prévu, vous devez ajuster votre code à deux endroits: le CSS et le JS.

La détection de la prise en charge des travaux de peinture dans JS peut être effectuée en vérifiant l'objet `CSS` :

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

Pour le côté CSS, vous avez deux options. Vous pouvez utiliser `@supports` :

    @supports (background: paint(id)) {
      /* ... */
    }

Une astuce plus compacte consiste à utiliser le fait que CSS invalide et par la suite ignore une déclaration de propriété entière si elle contient une fonction inconnue. Si vous spécifiez une propriété deux fois - d'abord sans worklet de peinture, puis avec le worklet de peinture - vous obtenez une amélioration progressive:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

Dans les navigateurs _with_ support for paint worklet, la deuxième déclaration de `background-image` écrasera la première. Dans les navigateurs _sans_ le support des travaux de peinture, la deuxième déclaration est invalide et sera supprimée, laissant la première déclaration en vigueur.

### CSS Paint Polyfill

Pour de nombreuses utilisations, il est également possible d'utiliser [CSS Paint Polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill), qui ajoute la prise en charge de CSS Custom Paint et Paint Worklets aux navigateurs modernes.

## Cas d'utilisation Il existe de nombreux cas d'utilisation de worklets de peinture, certains plus évidents que d'autres. L’une des plus évidentes consiste à utiliser un worklet de peinture pour réduire la taille de votre DOM. Souvent, des éléments sont ajoutés uniquement pour créer des embellissements à l'aide de CSS. Par exemple, dans [Material Design Lite](https://getmdl.io), le bouton avec l’effet d’ondulation contient 2 éléments `<span>` supplémentaires permettant d’implémenter l’ondulation elle-même. Si vous avez beaucoup de boutons, cela peut donner lieu à de nombreux éléments DOM et à une dégradation des performances sur mobile. Si vous [implémentez l'effet d'entraînement à l'aide de paint worklet](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/) à la place, vous vous retrouvez avec 0 élément supplémentaire et un seul worklet de peinture. De plus, vous avez quelque chose de beaucoup plus facile à personnaliser et à paramétrer.

L’utilisation de paint worklet présente un autre avantage: dans la plupart des scénarios, une solution utilisant un worklet de peinture est réduite en octets. Bien sûr, il existe un compromis: votre code de peinture s’exécutera chaque fois que la taille de la toile ou l’un des paramètres changent. Donc, si votre code est complexe et prend beaucoup de temps, cela pourrait introduire Jank. Chrome travaille à déplacer les worklets de peinture du thread principal afin que même les worklets de peinture de longue durée n'affectent pas la réactivité du thread principal.

Pour moi, la perspective la plus excitante est que Paint Worklet permet de polyfiler efficacement les fonctionnalités CSS qu’un navigateur n’a pas encore. Un exemple serait polyfill [gradients coniques](https://lab.iamvdo.me/houdini/conic-gradient) jusqu'à l'atterrissage natif dans Chrome. Autre exemple: lors d'une réunion CSS, il a été décidé que vous pouvez maintenant avoir plusieurs couleurs de bordure. Pendant que cette réunion se poursuivait, mon collègue Ian Kilpatrick [a écrit un polyfill](https://twitter.com/malyw/status/934737334494429184) pour ce nouveau comportement CSS utilisant un worklet de peinture.

## Penser en dehors de la «boîte» La plupart des gens commencent à penser aux images d’arrière-plan et aux images de bordures lorsqu’ils découvrent les travaux de peinture. `mask-image` est un cas d'utilisation moins intuitif de paint worklet, qui permet aux éléments DOM de présenter des formes arbitraires. Par exemple un [diamant](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/):

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="Un élément DOM en forme de diamant.">

`mask-image` prend une image ayant la taille de l'élément. Zones où l'image du masque est transparente, l'élément est transparent. Zones où l'image du masque est opaque, l'élément opaque.

## Maintenant en Chrome

Le worklet Paint est dans Chrome Canary depuis un moment. Avec Chrome 65, il est activé par défaut. Allez-y et essayez les nouvelles possibilités qui s'ouvrent à la peinture et montrez-nous ce que vous avez construit! Pour plus d’inspiration, jetez un coup d’œil à [Collection de Vincent De Oliveira](https://lab.iamvdo.me/houdini/).

Note: Les points d'arrêt ne sont actuellement pas pris en charge dans CSS Paint API, mais seront activés dans une version ultérieure de Chrome.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}