---
title: "Crear el modelo de objetos"
description: "Antes de que el navegador pueda publicar contenido en pantalla, tiene que crear los árboles DOM y CSSOM. Por eso, tenemos que asegurarnos de proporcionar tanto el archivo HTML como el CSS al navegador lo antes posible."
updated_on: 2014-09-12
key-takeaways:
  crear-modelo-objetos:
    - "Bytes → caracteres → tokens → nodos → modelo de objetos."
    - "El marcado HTML se transforma en un Modelo de objetos de documento (DOM), el marcado CSS se transforma en un Modelo de objetos CSS (CSSOM)."
    - "DOM y CSSOM son estructuras de datos independientes."
    - "La cronología de Chrome DevTools nos permite capturar e inspeccionar los costes de creación y procesamiento de DOM y CSSOM."
notes:
  devtools:
    - "Supondremos que estás familiarizado con los conceptos básicos de Chrome DevTools. Es decir, sabes cómo capturar una cascada de red o registrar una cronología. Si necesitas refrescar rápidamente los conceptos, consulta la <a href='https://developer.chrome.com/devtools'>documentación de Chrome DevTools</a> o, si no conoces DevTools, te recomendamos que participes en el curso sobre cómo <a href='http://discover-devtools.codeschool.com/'>descubrir DevTools</a> ofrecido por Codeschool."
---
<p class="intro">
  Antes de que el navegador pueda publicar la página, tiene que crear los árboles DOM y CSSOM. Por eso, tenemos que asegurarnos de proporcionar tanto el archivo HTML como el CSS al navegador lo antes posible.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.construct-object-model %}

## Modelo de objetos de documento (DOM)

{% include fundamentals/udacity_player.liquid title="Learn about DOM construction" link="" videos="%5B%7B%22id%22%3A%20%22qjEyIpm6D_Q%22%7D%2C%20%7B%22id%22%3A%22jw4tVn7CRcI%22%7D%2C%20%7B%22id%22%3A%20%22oJQf6OGzVWs%22%2C%20%22autoPause%22%3A%20true%7D%2C%20%7B%22id%22%3A%22tJvAsE6UwoQ%22%2C%20%22autoPause%22%3A%20true%7D%5D" %}

{% include_code src=_code/basic_dom.html snippet=full %}

Vamos a empezar con el caso más sencillo posible: una página HTML sencilla con algo de texto y una sola imagen. ¿Qué tiene que hacer el navegador para procesar esta sencilla página?

<img src="images/full-process.png" alt="Proceso de creación de DOM">

1. **Conversión**: el navegador lee los bytes sin procesar del HTML en el disco o la red y los traduce en caracteres individuales en función de la codificación especificada del archivo (por ejemplo, UTF-8).
1. **Creación de tokens**: el navegador convierte las cadenas de caracteres en tokens diferenciados que la [norma HTML5 de W3C](http://www.w3.org/TR/html5/) especifica; por ejemplo, `<html>`, `<body>` y otras cadenas dentro de corchetes angulares. Cada token tiene un significado especial y un conjunto de reglas.
1. **Análisis léxico**: los tokens emitidos se convierten en `objetos` que definen sus propiedades y reglas.
1. **Creación de DOM**: por último, como el marcado HTML define la relación entre diferentes etiquetas (algunas etiquetas están incluidas dentro de otras), los objetos creados se enlazan con una estructura de datos en árbol que también captura las relaciones entre elementos principales y secundarios definidas en el marcado original: el objeto _HTML_ es un elemento superior del objeto _body_, _body_ es un elemento superior del objeto _paragraph_, etc.

<img src="images/dom-tree.png" class="center" alt="Árbol DOM">

**El resultado final de todo este proceso es el Modelo de objetos de documento (o DOM) de nuestra sencilla página, que el navegador utiliza para el procesamiento posterior de la página.**

Cada vez que el navegador tiene que procesar el marcado HTML, tiene que pasar por todos los pasos anteriores: convertir los bytes en caracteres, identificar los tokens, convertir los tokens en nodos y crear el árbol DOM. Todo este proceso puede tardar, sobre todo si tenemos gran cantidad de HTML que procesar.

<img src="images/dom-timeline.png" class="center" alt="Hacer el seguimiento de la creación de DOM en DevTools">

{% include shared/remember.liquid title="Note" list=page.notes.devtools %}

Si abres Chrome DevTools y registras una cronología mientras se carga la página, puedes ver el tiempo real que se tarda en realizar este paso (en el ejemplo anterior nos ha costado unos 5 ms convertir un conjunto de bytes HTML en un árbol DOM). Por supuesto, si la página fuera más grande (como la mayoría), puede que este proceso se alargara considerablemente. En futuras secciones sobre cómo crear animaciones uniformes verás que es muy fácil que este proceso se convierta en tu embudo si el navegador tiene que procesar grandes cantidades de HTML.

Cuando ya tenemos preparado el árbol DOM, ¿tenemos bastante información para mostrar la página en pantalla? Aún no. El árbol DOM captura las propiedades y las relaciones del marcado del documento, pero no nos indica el aspecto que debe tener el elemento al publicarlo. Esa responsabilidad recae sobre CSSOM, que vamos a analizar a continuación.

## Modelo de objetos CSS (CSSOM)

Cuando el navegador estaba creando el DOM en nuestra sencilla página, se ha topado con una etiqueta de enlace en la sección de encabezamiento del documento que hacía referencia a una hoja de estilo CSS externa: style.css. Como entiende que va a necesitar este recurso para publicar la página, envía de inmediato una solicitud para este recurso, que se devuelve con el siguiente contenido:

{% include_code src=_code/style.css snippet=full lang=css %}

Por supuesto que podríamos haber declarado nuestros estilos directamente dentro del marcado HTML (integrado), pero mantener el CSS independiente del HTML nos permite tratar el contenido y el diseño como cuestiones separadas: los diseñadores pueden trabajar en el CSS, los desarrolladores se centran en el HTML, etc.

Igual que con el HTML, tenemos que convertir las reglas de CSS recibidas en lenguaje que el navegador pueda entender y utilizar en sus tareas. Por eso, una vez más, repetimos un proceso muy parecido al que utilizamos con el HTML:

<img src="images/cssom-construction.png" class="center" alt="Pasos de creación de CSSOM">

Los bytes CSS se convierten en caracteres, después los tokens en nodos y, por último, se enlazan en una estructura de árbol conocida como el Modelo de objetos CSS o CSSOM, para ser más breves:

<img src="images/cssom-tree.png" class="center" alt="Árbol CSSOM">

¿Por qué el CSSOM tiene una estructura de árbol? Al configurar el conjunto final de estilos de un objeto de la página, el navegador empieza por la regla más general aplicable a ese nodo (por ejemplo, si es un elemento secundario del elemento `body`, se aplican todos los estilos de `body`) y después, de forma recurrente, aplica reglas más específicas a los estilos configurados para definirlos mejor; por ejemplo, las reglas que van `cascada abajo`.

Para concretar, vamos a tomar como ejemplo el árbol CSSOM anterior. Cualquier texto incluido en la etiqueta _span_ que se sitúe dentro del elemento `body` tendrá un tamaño de fuente de 16 píxeles y el texto estará en rojo. La directiva de tamaño de fuente se desplaza cascada abajo de `body` a `span`. Sin embargo, si una etiqueta `span` es el elemento secundario de una etiqueta de párrafo (`p`), no se muestra su contenido.

Además, ten en cuenta que el árbol anterior no es el árbol CSSOM completo y que en él solo se muestran los estilos que hemos decidido anular en nuestra hoja de estilo. Cada navegador proporciona un conjunto predeterminado de estilos también denominados `estilos de usuario agente` (lo que vemos cuando no proporcionamos un estilo propio), y nuestros estilos anulan estos valores predeterminados (por ejemplo, los [estilos predeterminados de IE](http://www.iecss.com/)). Si alguna vez has inspeccionado tus `estilos configurados` en Chrome DevTools y te has preguntado de dónde vienen todos los estilos, ahora ya lo sabes.

¿Tienes curiosidad por saber cuánto tiempo ha supuesto el procesamiento de CSS? Registra una cronología en DevTools y busca el evento `Recalculate Style`. A diferencia del análisis de DOM, en la cronología no se muestra una entrada independiente para `Parse CSS`, sino que se captura el análisis y la creación del árbol CSSOM, además del cálculo repetido de estilos configurados incluidos en este evento.

<img src="images/cssom-timeline.png" class="center" alt="Hacer el seguimiento de la creación de CSSOM en DevTools">

El procesamiento de nuestra insignificante hoja de estilo tarda unos 0,6 ms y afecta a ocho elementos de la página; no son muchos, pero, una vez más, no es gratuito. Sin embargo, ¿de dónde han salido los ocho elementos? El CSSOM y el DOM son estructuras de datos independientes. Resulta que el navegador oculta un paso importante. A continuación, vamos a hablar del árbol de publicación que vincula el DOM y el CSSOM.



