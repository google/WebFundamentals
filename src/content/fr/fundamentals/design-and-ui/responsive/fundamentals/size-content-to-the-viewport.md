project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La majeure partie du Web n'est pas optimisée pour un affichage sur plusieurs appareils. Découvrez les principes fondamentaux pour rendre votre site compatible avec un appareil mobile, un ordinateur de bureau ou, plus généralement, tout dispositif équipé d'un écran.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Adapter le contenu à la taille de la fenêtre d'affichage {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Le défilement est devenu un geste naturel pour l'utilisateur, que ce soit sur l'écran d'un ordinateur de bureau ou d'un appareil mobile. Aussi, l'obliger à faire défiler la page horizontalement ou à effectuer un zoom arrière pour afficher toute la page dégrade sérieusement son confort d'utilisation.


## TL;DR {: .hide-from-toc }
- N'utilisez pas d'éléments de largeur fixe de grande taille.
- Ne liez pas le rendu correct du contenu à une largeur de fenêtre d'affichage spécifique.
- Utilisez des requêtes média CSS pour appliquer des styles différents aux grands et aux petits écrans.


Lorsque vous développez un site pour mobile avec une balise `meta viewport`, il est facile de créer accidentellement du contenu qui n'est pas parfaitement adapté à la fenêtre d'affichage spécifiée. Par exemple, si une image est affichée avec une largeur supérieure à celle de la fenêtre d'affichage, il se peut que cette dernière défile horizontalement. Vous devez ajuster ce contenu à la largeur de la fenêtre d'affichage, de sorte que l'utilisateur ne doive pas faire défiler la page horizontalement.

Dans la mesure où les dimensions et la largeur de l'écran, exprimées en pixels CSS, varient sensiblement d'un appareil à un autre (que ce soit entre des smartphones et des tablettes, voire entre différents smartphones), la largeur de la fenêtre d'affichage ne doit pas constituer le critère de rendu.

Si vous définissez une largeur CSS absolue élevée pour des éléments de page (comme dans l'exemple ci-dessous), la valeur `div` sera trop large pour la fenêtre d'affichage sur un appareil plus étroit (c'est le cas, par exemple, d'un appareil ayant une largeur de 320 pixels CSS, comme un iPhone). Optez plutôt pour des valeurs de largeur relatives, comme `width: 100%`. Prenez également garde aux valeurs de positionnement absolues élevées, susceptibles de rejeter l'élément hors de la fenêtre d'affichage sur des écrans de petite taille.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-iph.png" srcset="imgs/vp-fixed-iph.png 1x, imgs/vp-fixed-iph-2x.png 2x"  alt="Page avec un élément de largeur fixe de 344 pixels sur un iPhone.">
      Voir l'exemple
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6--col">
    {% link_sample _code/vp-fixed.html %}
      <img src="imgs/vp-fixed-n5.png" srcset="imgs/vp-fixed-n5.png 1x, imgs/vp-fixed-n5-2x.png 2x"  alt="Page avec un élément de largeur fixe de 344 pixels sur un Nexus 5.">
      Voir l'exemple
    {% endlink_sample %}
  </div>
</div>



