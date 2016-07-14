---
title: "Patrones de diseños web receptivos"
description: "Los patrones de diseño web receptivos evolucionan rápidamente, pero existen unos pocos patrones establecidos que funcionan de forma eficiente en los diferentes escritorios y dispositivos móviles."
updated_on: 2014-10-21
translation_priority: 1
---

<p class="intro">
  Los patrones de diseño web receptivos evolucionan rápidamente, pero existen unos pocos patrones establecidos que funcionan de forma eficiente en los diferentes escritorios y dispositivos móviles.
</p>

La mayoría de los diseños que se utilizan en las páginas web receptivas se
pueden categorizar dentro de uno de cinco patrones: Mostly fluid, Column drop,
Layout shifter, Tiny tweaks y Off canvas. En algunos casos, en una página, se
puede utilizar una combinación de patrones; por ejemplo, Column drop
y Off canvas.  Estos patrones, originalmente identificados por [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514), son un punto de partida sólido
para cualquier página receptiva.

## Los patrones

Para crear muestras simples y fáciles de comprender, cada una de las muestras
que se presentan a continuación se crearon con marcas reales a través de 
[`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes),
generalmente con tres `div` de contenido dentro de un `div` de contenedor principal.
 Cada muestra se escribió primero a partir de la vista más pequeña y, luego,
se agregaron puntos de interrupción donde era necesario.  El [modo de diseño Flexbox es muy
compatible](http://caniuse.com/#search=flexbox) con los navegadores modernos; sin embargo, es posible que el
proveedor deba realizar ajustes previos para lograr una compatibilidad óptima.


