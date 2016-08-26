project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Per aggiungere icone alla pagina cerca di utilizzare icone SVG o i caratteri unicode.

{# wf_review_required #}
{# wf_updated_on: 2014-06-09 #}
{# wf_published_on: 2000-01-01 #}

# Utilizzo di SVG per le icone {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Per aggiungere icone alla pagina cerca di utilizzare icone SVG o i caratteri unicode.




## TL;DR {: .hide-from-toc }
- Utilizza SVG o unicode per le icone al posto delle immagini raster.


## Sostituzione delle icone semplici con caratteri unicode

Numerosi caratteri contengono glifi unicode che è possibile utilizzare al posto delle immagini. A differenza delle immagini, è possibile scalare i caratteri unicode ottenendo una qualità ottimale in qualsiasi dimensione.

Oltre al normale insieme set di caratteri, l'unicode inlcude simboli per forme numeriche (&#8528;), frecce (&#8592;), operatori matematici (&#8730;), forme geometriche (&#9733;), immagini di controllo (&#9654;), schemi braille (&#10255;), note musicali (&#9836;), lettere greche (&#937;) e pezzi degli scacchi (&#9822;).

La procedura per l'inserimento dei caratteri unicode è identica a quella per le named entity, ovvero l'utilizzo del codice `&#XXXX`, in cui `XXXX` è il numero del carattere unicode. Ad esempio:


    Sei un super&#9733;
    

Sei un super&#9733;

## Sostituzione delle icone complesse con SVG
Per creare icone più complesse, SVG offre un risultato più leggero, intuitivo e personalizzabile con CSS. SVG offre diversi vantaggi rispetto alle immagini raster:

* Si tratta di elementi grafici vettoriali scalabili all'infinito.
* Effetti CSS come colori, ombreggiature, trasparenze e animazioni sono molto semplici da utilizzare.
* È possibile visualizzare immagini SVG inline nel documento.
* È un formato semantico.
* Offrono un'accessibilità ottimale con gli i corretti attributi.

&nbsp;

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/icon-svg.html" region_tag="iconsvg" lang=html %}
</pre>

## Utilizza i caratteri per icone con attenzione

I caratteri per icone sono diffusi e intuitivi, ma presentano alcuni svantaggi rispetto alle icone SVG.

* Si tratta di elementi grafici vettoriali scalabili all'infinito, ma un eventuale anti-aliasing potrebbe ridurne la nitidezza.
* Personalizzazione con CSS limitata.
* L'esatto posizionamento dei pixel potrebbe essere difficile, essendo basato su altezza delle linee, spaziatura delle lettere e così via.
* Non essendo elementi semantici, sono inadatti a lettori dello schermo o altre tecnologie di assistenza.
* Se non utilizzati al meglio possono creare file di grandi dimensioni anche con l'utilizzo di un gruppo ridotto di icone. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Esempio di pagina che utilizza FontAwesome come icone dei caratteri.">
{% endlink_sample %}
<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/media/images/_code/icon-font.html" region_tag="iconfont" lang=html %}
</pre>

Esistono diversi caratteri per icone gratuiti e a pagamento come [Font Awesome] (http://fortawesome.github.io/Font-Awesome/), [Pictos] (http://pictos.cc/) e [Glyphicons] (http://glyphicons.com/).

Equilibra il peso delle richieste HTTP aggiuntive e le dimensioni del file con le esigenze in termini di icone. Ad esempio, se occorrono poche icone è consigliabile l'utilizzo di un'immagine o di uno sprite di immagine.



