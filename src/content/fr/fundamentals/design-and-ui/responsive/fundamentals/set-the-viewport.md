project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La majeure partie du Web n'est pas optimisée pour un affichage sur plusieurs appareils. Découvrez les principes fondamentaux pour rendre votre site compatible avec un appareil mobile, un ordinateur de bureau ou, plus généralement, tout dispositif équipé d'un écran.

{# wf_review_required #}
{# wf_updated_on: 2014-09-11 #}
{# wf_published_on: 2000-01-01 #}

# Définir la fenêtre d'affichage {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Dans le cas des pages optimisées pour un large éventail d'appareils, l'en-tête du document doit contenir un élément Meta Viewport. La balise Meta Viewport indique au navigateur comment contrôler les dimensions et la mise à l'échelle de la page.




## TL;DR {: .hide-from-toc }
- Utilisez la balise Meta `viewport` pour contrôler la largeur et le dimensionnement de la fenêtre d'affichage du navigateur.
- Insérez le code <code>width=device-width</code> pour établir une correspondance avec la largeur de l'écran en pixels indépendants de l'appareil.
- 'Insérez le code <code>initial-scale=1</code> pour établir une relation de type 1:1 entre les pixels CSS et les pixels indépendants de l''appareil.'
- Assurez-vous que l'accès à votre page est possible sans désactiver le redimensionnement utilisateur.


Pour offrir aux internautes une expérience optimale, les navigateurs mobiles affichent la page avec la largeur d'écran d'un ordinateur de bureau (soit généralement 980 pixels, mais cela varie en fonction des appareils). Ils essaient ensuite d'améliorer la qualité visuelle en augmentant la taille des polices et en dimensionnant le contenu pour qu'il s'adapte à la taille de l'écran. Pour l'utilisateur, cela se traduit par un affichage irrégulier de la taille des polices et la nécessité de devoir appuyer deux fois ou pincer pour zoomer pour afficher le contenu et interagir avec celui-ci.


    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    


La valeur Meta `width=device-width` de fenêtre d'affichage indique à la page d'établir une correspondance avec la largeur de l'écran en pixels indépendants de l'appareil. Cela permet à la page d'ajuster le contenu selon différentes tailles d'écran, qu'il soit affiché sur un petit smartphone ou sur un grand écran d'ordinateur.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Page sans fenêtre d'affichage">
      Voir l'exemple
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Page sur laquelle une fenêtre d'affichage est définie">
      Voir l'exemple
    {% endlink_sample %}
  </div>
</div>

Certains navigateurs conservent une largeur de page constante lors de la rotation du contenu en mode paysage et préfèrent le zoom à l'ajustement de la mise en page pour occuper tout l'écran. L'ajout de l'attribut `initial-scale=1` indique au navigateur d'établir une relation de type 1:1 entre les pixels CSS et les pixels indépendants de l'appareil, quelle que soit l'orientation de ce dernier, et permet à la page de tirer parti de toute la largeur de l'écran en mode paysage.

<!-- TODO: Verify note type! -->
Note: Séparez les attributs à l'aide d'une virgule, afin de permettre une analyse correcte par les navigateurs plus anciens.

## Garantir l'accessibilité de la fenêtre d'affichage

Outre l'attribut `initial-scale`, vous pouvez définir les attributs suivants sur la fenêtre d'affichage :

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

Une fois ces attributs définis, il se peut que l'utilisateur ne soit plus en mesure de zoomer sur la fenêtre d'affichage, ce qui peut entraîner des problèmes d'accessibilité.



