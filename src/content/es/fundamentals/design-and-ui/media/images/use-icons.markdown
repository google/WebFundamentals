---
title: "Usar SVG para iconos"
description: "Cuando añadas iconos a tu página web, usa iconos SVG en la medida de lo posible o, en algunos casos, caracteres unicode."
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - Usa SVG o caracteres unicode para los iconos en lugar de imágenes de mapa de bits.
---

<p class="intro">
  Cuando añadas iconos a tu página web, usa iconos SVG en la medida de lo posible o, en algunos casos, caracteres unicode.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Sustituir iconos simples por unicode

Muchas fuentes admiten los miles de glifos unicode, que pueden usarse en sustitución de las imágenes.  A diferencia de las imágenes, las fuentes unicode se escalan correctamente y quedan bien independientemente de lo pequeñas o grandes que se muestren en la pantalla.

Además del conjunto de caracteres normal, los caracteres unicode pueden incluir símbolos para formas numéricas (&#8528;), flechas (&#8592;), operadores matemáticos (&#8730;), formas geométricas (&#9733;), imágenes de control (&#9654;), patrones braille (&#10255;), anotaciones musicales (&#9836;), letras griegas (&#937;) e incluso fichas de ajedrez (&#9822;).

Los caracteres unicode se usan del mismo modo que las entidades nombradas: en `&#XXXX`, `XXXX` representa el número del carácter unicode.  Por ejemplo:

{% highlight html %}
Eres una auténtica &#9733;
{% endhighlight %}

Eres una auténtica &#9733;

## Sustituir iconos complejos con SVG
Cuando los requisitos de iconos son más complejos, se recomienda usar iconos SVG, que suelen ser más ligeros y fáciles de usar, y se les pueden aplicar estilos con CSS. Las imágenes SVG tienen una serie de ventajas sobre las imágenes de mapa de bits:

* Son gráficos vectoriales que pueden escalarse de manera infinita.
* Es fácil usar efectos de CSS para aplicar color, sombras, transparencias y animaciones.
* Las imágenes SVG pueden incluirse directamente en el documento.
* Son semánticas.
* Permiten una mayor accesibilidad con los atributos adecuados.

&nbsp;

{% include_code src=_code/icon-svg.html snippet=iconsvg lang=html %}

## Usar fuentes de iconos con precaución

Las fuentes de icono son populares y pueden usarse fácilmente, pero tienen algunos inconvenientes en comparación con los iconos SVG.

* Son gráficos vectoriales que pueden escalarse de manera infinita, pero pueden aparecer con los bordes suavizados, por lo que los iconos no quedarían tan nítidos como cabría esperar.
* Tienen estilos limitados en CSS.
* Puede ser difícil colocar perfectamente los píxeles, en función de la altura de la línea, del espacio entre letras, etc.
* No son semánticas y pueden ser difíciles de usar con lectores de pantalla o con otras tecnologías de apoyo.
* Salvo que se delimiten de forma adecuada, pueden resultar en un archivo muy grande para solo usar un pequeño subconjunto de los iconos disponibles. 


{% link_sample _code/icon-font.html %}
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Ejemplo de página que usa FontAwesome para sus iconos de fuente.">
{% endlink_sample %}
{% include_code src=_code/icon-font.html snippet=iconfont lang=html %}

Hay cientos de fuentes de icono gratis y de pago, incluidas [Font Awesome](http://fortawesome.github.io/Font-Awesome/), [Pictos](http://pictos.cc/) y [Glyphicons](http://glyphicons.com/).

Asegúrate de que el peso de la solicitud HTTP adicional y el tamaño del archivo estén equilibrados con la necesidad de iconos.  Por ejemplo, si solo necesita unos cuantos iconos, puede ser mejor usar una imagen o un sprite de imagen.



