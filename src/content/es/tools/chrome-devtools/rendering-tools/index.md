project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Los usuarios esperan que las páginas sean interactivas y fluidas. Cada etapa en la canalización de píxeles representa una oportunidad para introducir bloqueos. Conoce herramientas y estrategias para identificar y solucionar problemas comunes que lentifican el rendimiento del tiempo de ejecución.

{# wf_updated_on: 2016-03-15 #}
{# wf_published_on: 2015-04-13 #}

# Analiza el rendimiento del tiempo de ejecución {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Los usuarios esperan que las páginas sean interactivas y fluidas. Cada etapa 
en la canalización de píxeles representa una oportunidad para introducir bloqueos. Conoce 
herramientas y estrategias para identificar y solucionar problemas comunes que lentifican el 
rendimiento del tiempo de ejecución.


### TL;DR {: .hide-from-toc }
- No escribas JavaScript que fuerce al navegador a calcular de nuevo el diseño. Separa las funciones de lectura y escritura, y realiza las lecturas primero.
- No compliques demasiado tu CSS. Usa menos CSS y procura que tus selectores de CSS sean simples.
- Evita el diseño tanto como te sea posible. Elige una CSS que no active el diseño en ninguna circunstancia.
- La pintura puede llevar más tiempo que cualquier otra actividad de la representación. Busca cuellos de botella de pintura.


## JavaScript 

Los cálculos de JavaScript, en especial aquellos que activan cambios visuales abarcadores,
pueden bloquear el rendimiento de la aplicación. No permitas que 
JavaScript con una sincronización incorrecta o de ejecución prolongada interfiera en las interacciones del usuario.

### Herramientas

Realiza una [grabación][recording] de **Timeline** y busca eventos 
**Evaluate Script** de extensión sospechosa. Si encuentras alguno, puedes habilitar 
[JS Profiler][profiler] y volver a realizar la grabación para obtener información 
más detallada sobre cuáles fueron exactamente las funciones de JS llamadas y el tiempo que 
demoró cada una.

Si observas bloqueos en tu código JavaScript, es posible que debas
llevar al análisis al próximo nivel y recopilar un perfil de CPU de JavaScript.
Los perfiles de CPU muestran los aspectos a los que se destina el tiempo de ejecución en las funciones de la página.
Aprende a crear perfiles de CPU con el artículo sobre [cómo acelerar la ejecución de JavaScript][cpu].

[profiler]: ../evaluate-performance/timeline-tool#profile-js
[cpu]: js-execution

### Problemas

En la siguiente tabla, se describen algunos problemas comunes de JavaScript y posibles soluciones:

<table>
  <thead>
      <th>Problema</th>
      <th>Ejemplo</th>
      <th>Solución</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Controladores de entrada costosos que afectan la respuesta o la animación.</td>
      <td data-th="Example">Toque y desplazamiento parallax.</td>
      <td data-th="Solution">Deja que el navegador gestione los toques y los desplazamientos, o vincula el receptor tan cerca del fin como sea posible (consulta <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Controladores de entrada costosos en la lista de comprobación de rendimiento del tiempo de ejecución de Paul Lewis</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">JavaScript con sincronización incorrecta que afecta la respuesta, la animación o la carga.</td>
      <td data-th="Example">El usuario realiza un desplazamiento después de la carga de la página, setTimeout/setInterval.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Optimiza la ejecución de JavaScript</a>: usa <code>requestAnimationFrame</code>, amplía la manipulación del DOM hasta los fotogramas y usa Web Workers.</td>
    </tr>
    <tr>
      <td data-th="Problem">JavaScript de ejecución prolongada que afecta la respuesta.</td>
      <td data-th="Example">El evento <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">DOMContentLoaded</a> se bloquea cuando se sobrecarga con trabajo de JS.</td>
      <td data-th="Solution">Traslada el trabajo exclusivo de cálculo a los <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Web Workers</a>. Si necesitas acceso al DOM, usa  <code>requestAnimationFrame</code> (consulta también <a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Optimiza la ejecución de JavaScript</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">Secuencias de comandos desechables que afectan la respuesta o la animación.</td>
      <td data-th="Example">La recolección de elementos no usados puede realizarse en cualquier lugar.</td>
      <td data-th="Solution">Escribe menos secuencias de comandos desechables (consulta <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Recolección de elementos no usados en la lista de comprobación de rendimiento del tiempo de ejecución de Paul Lewis</a>).</td>
    </tr>
  </tbody>
</table>

## Estilo 

Los cambios de estilo son pesados, en especial si afectan a más de un 
elemento en el DOM. Cada vez que aplicas estilos a un elemento, el navegador debe 
identificar el efecto en todos los elementos relacionados, volver a calcular el diseño y 
aplicar pintura nuevamente.

Guías relacionadas:

* [Reduce el alcance y la complejidad de 
  los cálculos de estilo](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

### Herramientas

Realiza una [grabación][recording] en **Timeline**. Busca en la grabación eventos
**Recalculate Style** de volumen importante (se muestran en morado).

Haz clic en un evento **Recalculate Style** para ver más información sobre él en el 
subpanel **Details**. Si los cambios de estilo tardan mucho en aplicarse, este será un 
punto de rendimiento que deberá mejorarse. Si los cálculos de estilo afectan una gran cantidad de 
elementos, habrá otro aspecto para mejorar.

![Estilo de recálculo prolongado](imgs/recalculate-style.png)

Para reducir el efecto de los eventos **Recalculate Style**, realiza lo siguiente:

* Usa los [desencadenantes de CSS](https://csstriggers.com) para conocer las propiedades de CSS
  que activan diseño, pintura y composición. Estas propiedades tienen el efecto más negativo
  en el rendimiento de la representación.
* Realiza un cambio a propiedades cuyo impacto sea menor. Consulta [Limítate solo a 
  propiedades del compositor y administra el recuento de capas][compositor] para obtener más información.

[compositor]: /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count

### Problemas

En la siguiente tabla, se describen algunos problemas comunes de estilo y posibles 
soluciones:

<table>
  <thead>
      <th>Problema</th>
      <th>Ejemplo</th>
      <th>Solución</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Cálculos de estilo pesados que afectan la respuesta o la animación.</td>
      <td data-th="Example">Cualquier propiedad de CSS que cambie la geometría de un elemento, como su longitud, altura o posición; el navegador debe comprobar el resto de los elementos y rehacer el diseño.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Evita la CSS que desencadena diseños.</a></td>
    </tr>
    <tr>
      <td data-th="Problem">Selectores complejos que afectan la respuesta o la animación.</td>
      <td data-th="Example">Los selectores anidados obligan al navegador a tener información completa sobre el resto de los elementos, incluidos los primarios y los secundarios.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">Referencia a un elemento de la CSS con una sola clase</a></td>
    </tr>
  </tbody>
</table>

Guías relacionadas:

* [Reduce el alcance y la complejidad de 
  los cálculos de estilo](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

## Diseño 

El diseño (o reflow en Firefox) es el proceso mediante el cual el navegador calcula 
la posición y el tamaño de todos los elementos de la página. El modelo de diseño de la Web 
implica que un elemento puede afectar a otros; por ejemplo, el ancho del elemento 
`<body>` normalmente afecta el ancho de sus campos secundarios, y así sucesivamente,
hacia arriba y hacia abajo en el árbol. El proceso puede involucrar bastante al 
navegador.

Como regla general, si solicitas un valor geométrico al 
DOM antes de que se complete un fotograma, como resultado obtendrás 
“diseños sincrónicos forzados”, lo cual puede representar un gran cuello de botella de rendimiento si 
se repite con frecuencia o tiene lugar en un árbol de DOM grande. 

Guías relacionadas:

* [Evita la paginación excesiva de
 diseños](/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [Diagnostica diseños sincrónicos
 forzados](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)


### Herramientas

La **Timeline** de Chrome DevTools identifica los casos en que una página genera
diseños sincrónicos forzados. Estos eventos **Layout** están marcados con barras rojas. 

![diseño sincrónico forzado](imgs/forced-synchronous-layout.png)

La “paginación excesiva de diseños” es una repetición de condiciones de diseño sincrónico forzado.
Esto sucede cuando JavaScript escribe en el DOM y lee desde este reiteradamente, lo que
fuerza al navegador a calcular de nuevo el diseño una y otra vez. Para identificar
la paginación excesiva de diseños, busca un patrón de varias advertencias de diseño
sincrónico forzado (como se muestra en la captura de pantalla anterior).

### Problemas

En la siguiente tabla, se describen algunos problemas comunes de diseño y posibles
soluciones:

<table>
  <thead>
      <th>Problema</th>
      <th>Ejemplo</th>
      <th>Solución</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Diseño sincrónico forzado que afecta la respuesta o la animación.</td>
      <td data-th="Example">Obligar al navegador a realizar el diseño antes en la canalización de píxeles. Como resultado, se repiten pasos en el proceso de representación.</td>
      <td data-th="Solution">Primero agrupa las lecturas de estilo y luego realiza las escrituras necesarias (consulta también <a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Evita los diseños grandes y complejos, y la paginación excesiva de diseños</a>).</td>
    </tr>
  </tbody>
    <tr>
      <td data-th="Problem">Paginación excesiva de diseños que afecta la respuesta o la animación.</td>
      <td data-th="Example">Un bucle que coloca al navegador en un ciclo de lectura-escritura-lectura-escritura. Esto obliga al navegador a calcular de nuevo el diseño una y otra vez.
      <td data-th="Solution">Agrupa automáticamente operaciones de lectura y escritura por lotes con la <a href="https://github.com/wilsonpage/fastdom">biblioteca FastDom</a>.</td>
    </tr>
  </tbody>
</table>

## Pintura y composición 

La pintura es el proceso por el cual se colocan píxeles. Suele ser la parte más cargada del 
proceso de representación. Si has observado que la página se bloquea de alguna 
manera, es posible que estés ante problemas de pintura.

Composición hace referencia al proceso en el que las partes pintadas de la página se unen para 
mostrarlas en la pantalla. Por lo general, si te limitas a las propiedades que son solo del 
compositor y evitas la pintura completamente, observarás una mejora importante en el 
rendimiento, pero debes estar atento a los recuentos excesivos de capas (consulta 
también [Limítate solo a propiedades del compositor y administra el recuento de capas](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)).

### Herramientas

¿Deseas saber el tiempo que lleva la pintura o la frecuencia con que se aplica? Habilita el 
[generador de perfiles de pintura][paint] en el panel **Timeline** y luego [realiza una
grabación][recording]. Si la mayor parte del tiempo de representación se usa para la pintura, 
estarás ante problemas de pintura. 

![Tiempos de pintura prolongados en la grabación de Timeline](imgs/long-paint.png)

Revisa el menú [**Rendering settings**][rendering settings] para conocer más 
configuraciones que pueden ayudar a diagnosticar problemas de pintura. 

### Problemas

En la siguiente tabla, se describen algunos problemas comunes de pintura y composición y posibles soluciones:

<table>
  <thead>
      <th>Problema</th>
      <th>Ejemplo</th>
      <th>Solución</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Excesos de pintura que afectan la respuesta o la animación.</td>
      <td data-th="Example">Amplias áreas de pintura o pinturas pesadas que afectan la respuesta o la animación.</td>
      <td data-th="Solution">Evita la pintura, promueve elementos que se muevan a sus propias capas y usa los parámetros transforms y opacity (consulta <a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">Simplifica la complejidad de la pintura y reduce las áreas de pintura</a>).</td>
    </tr>
        <tr>
      <td data-th="Problem"> Explosiones de capas que afectan las animaciones.</td>
      <td data-th="Example">La promoción excesiva de grandes cantidades de elementos con translateZ(0) afecta enormemente el rendimiento de la animación.
</td>
      <td data-th="Solution">Realiza la promoción a capas con moderación y solo cuando sepas que proporcionará mejoras notables (consulta <a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">Limítate solo a las propiedades del compositor y administra el recuento de capas</a>).</td>
    </tr>
  </tbody>
</table>


[recording]: ../evaluate-performance/timeline-tool#make-a-recording
[paint]: ../evaluate-performance/timeline-tool#profile-painting
[rendering settings]: ../evaluate-performance/timeline-tool#rendering-settings


{# wf_devsite_translation #}
