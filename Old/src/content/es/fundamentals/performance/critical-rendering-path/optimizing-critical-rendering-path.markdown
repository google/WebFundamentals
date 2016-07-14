---
title: "Optimizar la ruta de renderización importante"
description: "Para acelerar todo lo posible la primera renderización, debemos optimizar tres variables: minimizar el número de recursos importantes, el número de bytes importantes y la longitud de la ruta importante."
updated_on: 2014-04-28
---
<p class="intro">
  
</p>

Para acelerar todo lo posible la primera renderización, debemos optimizar tres variables:

* **Minimizar el número de recursos importantes**
* **Minimizar el número de bytes importantes**
* **Minimizar la longitud de la ruta importante**

Un recurso importante es aquel que puede bloquear la renderización inicial de la página. Cuanto menos recursos haya en la página, menos trabajará el navegador para obtener el contenido en la pantalla y menos serán los requisitos de CPU y de los demás recursos.

Del mismo modo, cuanto menos bytes importantes deba descargar el navegador, más rápido procesará este el contenido y lo mostrará en la pantalla. Para reducir la cantidad de bytes, podemos disminuir el número de recursos (eliminarlos o asignarles un papel que no sea importante) y, además, asegurarnos de minimizar el tamaño de la transferencia comprimiendo y optimizando cada recurso.

Por último, la longitud de ruta de renderización importante es una función del gráfico de dependencia entre todos los recursos importantes que requiere la página y su tamaño de bytes: algunas descargas de recursos solo pueden iniciarse cuando se haya procesado el recurso anterior. Cuanto mayor sea el tamaño del recurso, más procesos necesitaremos para descargarlo.

Es decir, el número de recursos, su tamaño de bytes y la longitud de la ruta importante se relacionan entre sí, pero no son exactamente lo mismo. Por ejemplo, es posible que no puedas reducir el número de recursos importantes o de acortar la ruta importante, pero la reducción del número de bytes importantes sigue siendo una optimización importante, y viceversa.

**La secuencia general de pasos para optimizar la ruta importante es la siguiente:**

1. Analiza y caracteriza la ruta importante: el número de recursos, los bytes, la longitud.
2. Minimiza el número de recursos importantes: elimínalos, retrasa su descarga, márcalos como asíncronos, etc.
3. Optimiza el orden de carga de los recursos restantes: lo ideal es descargar todos los elementos importantes lo antes posible para acortar la ruta importante.
4. Optimiza el número de bytes importantes para reducir el tiempo de descarga (cantidad de procesos).



