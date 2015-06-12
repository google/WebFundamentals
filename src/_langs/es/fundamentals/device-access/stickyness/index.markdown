---
layout: section
title: "Agregar en la pantalla de inicio"
description: "Prácticamente todos los principales proveedores de navegadores les permiten a los usuarios anclar o instalar sus aplicaciones web. La llamada “pemanencia” es un argumento común para las aplicaciones nativas, pero se puede lograr con solo algunos retoques en el marcado."
introduction: "Prácticamente todos los principales proveedores de navegadores les permiten a los usuarios anclar o instalar sus aplicaciones web. La llamada “pemanencia” es un argumento común para las aplicaciones nativas, pero se puede lograr con solo algunos retoques en el marcado."
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 1
id: stickyness
collection: device-access
authors:
  6
priority: 1
---
{% wrap content%}

Para el usuario, la funcionalidad “agregar a la pantalla de inicio” funciona de manera similar que un marcador 
supercargado: pero sin proporcionarle instrucciones al navegador sobre cómo 
se debe mostrar su aplicación, los navegadores móviles utilizarán el icono de favoritos o tomarán una captura de pantalla de su 
página para el marcador y mostrarán la IU predeterminada del navegador cuando el usuario ejecute
su aplicación web desde la pantalla de inicio. Analicemos de qué modo puede mejorar el comportamiento
incorporado.

Chrome y Safari son compatibles con una sintaxis muy similar, ya que utilizan las etiquetas `<meta>` y `<link>`
en el `<head>` de su página, y mantienen la función general relativamente
ligera.

En Internet Explorer 10, se introdujeron los "sitios anclados", un concepto a través del cual se ofrecen 
funcionalidades adicionales, como el cambio en la presentación de los iconos y 
las notificaciones y, aunque este navegador es compatible con el conocido estilo de la etiqueta `<meta>`, se recomienda el uso de archivos XML 
vinculados que se pueden utilizar para la configuración.

Nota: Las API de Firefox y las funciones exclusivas de Firefox OS no se tratan aquí. 
Consulte la [documentación oficial de Firefox OS](https://developer.mozilla.org/en-US/Apps/Quickstart).

{% include modules/nextarticle.liquid %}

{% endwrap %}
