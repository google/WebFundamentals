project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Sigue esta guía interactiva para aprender a usar DevTools a fin de diagnosticar diseños sincrónicos forzados.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-04-13 #}

# Diagnosticar diseños sincrónicos forzados {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Obtén más información sobre cómo usar DevTools para diagnosticar diseños sincrónicos 
forzados.

En esta guía, aprenderás a depurar [diseños sincrónicos forzados][fsl] 
identificando y solucionando problemas en una demostración en tiempo real.  En la demostración se animan imágenes 
con [`requestAnimationFrame()`][raf], el enfoque recomendado para 
la animación basada en fotogramas. Sin embargo, se produce una cantidad considerable de bloqueos en la 
animación. Tu objetivo es identificar la causa de los bloqueos y solucionar el problema para 
que la demostración se ejecute fluidamente a 60 FPS. 

[fsl]: /web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts

[raf]: /web/fundamentals/performance/rendering/optimize-javascript-execution#use-requestanimationframe-for-visual-changes


## Recopilar datos

Primero debes obtener datos para comprender con exactitud lo que sucede
cuando se ejecuta la página. 

1. Abre la [demostración](https://googlesamples.github.io/web-fundamentals/tools/chrome-devtools/rendering-tools/forcedsync.html).
1. Abre el panel **Timeline** de DevTools.
1. Habilita la opción **JS Profile**. Cuando analices el gráfico de llamas posteriormente, esta
   opción te permitirá ver exactamente las funciones que recibieron llamadas.
1. Haz clic en **Start** en la página para iniciar la animación.
1. Haz clic en el botón **Record** del panel Timeline para iniciar la grabación de la línea del
   tiempo.
1. Espera dos segundos.
1. Haz clic en el botón **Record** de nuevo para detener la grabación. 

Cuando termines la grabación, verás algo como lo siguiente
en el panel Timeline. 

![Grabación de Timeline de una demostración con bloqueos](imgs/demo-recording.png)

## Identificar el problema

Ahora que tienes los datos, es el momento de interpretarlos. 

De un vistazo, podrás ver en el subpanel **Summary** de la grabación en Timeline 
que en el navegador se dedicó la mayor parte del tiempo a la representación. En términos generales, si puedes
[optimizar las operaciones de diseño de la página][layout], es posible que puedas reducir
el tiempo dedicado a la representación. 

![Summary, en Timeline](imgs/summary.png)

A continuación, presta atención a las barras rosas que están justo debajo del subpanel **Overview**.
Estas representan fotogramas. Desplázate sobre ellas para ver más información sobre los
fotogramas.

![Fotograma largo](imgs/long-frame.png)

Los fotogramas tardan mucho tiempo en completarse. Para que las animaciones sean fluidas, tu
objetivo debe ser un valor de 60 FPS. 

Llegó el momento de hacer un diagnóstico preciso de lo que no funciona bien. Con el mouse, 
[acerca][zoom] una pila de llamadas. 

![Grabación en Timeline ampliada](imgs/zoom.png)

El elemento de la parte superior de la pila es un evento `Animation Frame Fired`. La función que
pasaste a `requestAnimationFrame()` recibe llamadas cada vez que este evento se activa.
Debajo de `Animation Frame Fired` verás `Function Call` y, debajo de este, 
`update`. Puedes inferir que el método denominado `update()` es el callback de
`requestAnimationFrame()`. 

Note: En este punto, resultará útil la opción **JS Profile** que habilitaste 
antes. Si estuviera inhabilitada, solo verías el evento `Function Call`, seguido
de todos los pequeños eventos morados (se tratarán a continuación), sin detalles precisos de las funciones
llamadas.

Centra tu atención en los pequeños eventos morados que están debajo del evento `update`.
 La parte superior de muchos de estos eventos es roja. Es una señal de advertencia.
Desplázate sobre estos eventos. DevTools te advertirá que la 
página puede verse afectada por un reprocesamiento forzado. “Reprocesamiento forzado” es simplemente otra denominación para los 
diseños sincrónicos forzados. 

![Desplazamiento sobre un evento de diseño](imgs/layout-hover.png)

Es hora de analizar la función que genera todos los 
diseños sincrónicos forzados. Haz clic en uno de los eventos de diseño para seleccionarlo
En el subpanel Summary, verás los detalles de este evento. Haz clic en el
vínculo que se halla debajo de **Layout Forced** (`update @ forcedsync.html:457`) para ir a
la definición de la función.

![Ir a la definición de la función](imgs/jump.png)

Verás la definición en el panel **Sources**. 

![Definición de la función en el panel Sources](imgs/definition.png)

La función `update()` es el controlador de callbacks de 
`requestAnimationCallback()`. El controlador computa la propiedad `left` de cada imagen
según su valor `offsetTop`. Esto fuerza el navegador a realizar
un diseño nuevo de inmediato para garantizar que proporcione el valor correcto.
La realización forzosa de diseños en cada fotograma de la animación es la causa del bloqueo de las animaciones
en la página. 

Ahora que has identificado el problema, puedes intentar solucionarlo
en DevTools.

[Diseño]: /web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime#layout
[Zoom]: /web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool#zoom

## Aplicar una solución con DevTools

Esta secuencia de comandos está incorporada en HTML, por lo que no puedes editarla en el panel **Sources**
(sin embargo, las secuencias de comandos en `*.js` se pueden editar en este panel). 

No obstante, para probar los cambios, puedes redefinir la función en la consola.
Copia la definición de la función del archivo HTML y pégala en la consola de
DevTools. Borra la instrucción que usa `offsetTop` y elimina el comentario en la instrucción que está 
debajo de ella. Presiona `Enter` cuando finalices. 

![Redefinir la función problemática](imgs/redefinition.png)

Reinicia la animación. Podrás verificar visualmente que ahora es mucho más fluida. 

## Realizar verificaciones con otra grabación

Se recomienda realizar otra grabación y verificar que la 
animación sea realmente más rápida y tenga un mejor rendimiento que antes. 

![Grabación en Timeline después de la optimización](imgs/after.png)

Mucho mejor.


{# wf_devsite_translation #}
