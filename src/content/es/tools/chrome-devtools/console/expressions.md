project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Explora el estado de cualquier elemento en tu página desde la consola de DevTools.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Evaluar expresiones {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}
Explora el estado de cualquier elemento en tu página desde la consola de DevTools usando una de sus capacidades de evaluación.

La consola de DevTools te permite conocer el estado de los elementos
en tu página y de una forma ad hoc.
Evalúa cualquier expresión que puedes escribir mediante la combinación
de tus conocimientos de JavaScript y varias funciones compatibles con él.


### TL;DR {: .hide-from-toc }
- Evalúa una expresión con solo escribirla.
- Selecciona elementos mediante una de las combinaciones de teclas.
- Inspecciona elementos del DOM y objetos de montón de JavaScript usando <code>inspect()</code>.
- Accede a los elementos y objetos seleccionados recientemente usando $0 - 4.


## Navegar por las expresiones

La consola evalúa cada expresión de JavaScript que proporcionas
al presionar <kbd class="kbd">Enter</kbd>.
Mientras escribes una expresión,
aparecen sugerencias de nombre de propiedad;
la consola también proporciona autocompletado y completado de pestañas.

Si existen múltiples coincidencias,
<kbd class="kbd">↑</kbd> y <kbd class="kbd">↓</kbd> realizan ciclos a través de ellas. Al presionar <kbd class="kbd">→</kbd> se selecciona la sugerencia actual.
Si hay una sola sugerencia,
<kbd class="kbd">Tab</kbd> la selecciona.

![Expresiones simples en la consola.](images/evaluate-expressions.png)

## Seleccionar elementos

Usa las siguientes combinaciones de teclas para seleccionar elementos:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Combinación de teclas y descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Shortcut">$()</td>
      <td data-th="Description">Muestra el primer elemento que coincide con el selector de CSS especificado. Combinación de teclas para <code>document.querySelector()</code>.</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$$()</td>
      <td data-th="Description">Muestra un conjunto de todos los elementos que coinciden con el selector de CSS especificado. Alias para <code>document.querySelectorAll()</code>.</td>
    </tr>
    <tr>
      <td data-th="Shortcut">$x()</td>
      <td data-th="Description">Muestra un conjunto de elementos que coinciden con XPath especificada.</td>
    </tr>
  </tbody>
</table>

Ejemplos de selección de objetivo:

    $('code') // Returns the first code element in the document.
    $$('figure') // Returns an array of all figure elements in the document.
    $x('html/body/p') // Returns an array of all paragraphs in the document body.

## Inspeccionar elementos del DOM y objetos de montón de JavaScript

La función `inspect()` toma un elemento del DOM o referencia de JavaScript
como parámetro.
Si proporcionas un elemento del DOM,
DevTools va al panel Elements y muestra al elemento.
Si proporcionas una referencia de JavaScript,
va al panel Profile.

Cuando este código se ejecuta en tu consola en esta página,
captura esta figura y la muestra en el panel Elements.
Aprovecha la propiedad `$_` 
para obtener el resultado de la última expresión evaluada.

    $('[data-target="inspecting-dom-elements-example"]')
    inspect($_)

## Acceder a los elementos y objetos seleccionados recientemente

La consola almacena los últimos cinco elementos y objetos usados
en variables para lograr un acceso fácil.
Usa $0 - 4,
para acceder a estos elementos desde dentro de la consola.
Recuerda que las computadoras empiezan a contar desde 0;
es decir, que el último elemento es $0 y el más antiguo es $4.


{# wf_devsite_translation #}
