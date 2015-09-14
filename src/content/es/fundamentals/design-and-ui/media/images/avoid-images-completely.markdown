---
title: "Evitar las imágenes por completo"
description: "A veces, la mejor imagen no es una imagen. Siempre que sea posible, usa la capacidad nativa del navegador para ofrecer las mismas funciones u otras similares."
updated_on: 2014-06-10
key-takeaways:
  avoid-images:
    - Evita las imágenes siempre que sea posible y, en su lugar, usa las funciones del navegador para aplicar sombras, gradientes, esquinas redondeadas, etc.
---

<p class="intro">
  A veces, la mejor imagen no es una imagen. Siempre que sea posible, usa la capacidad nativa del navegador para ofrecer las mismas funciones u otras similares.  Los navegadores generan elementos gráficos que antes hubieran requerido imágenes.   Esto significa que ya no es necesario que el navegador descargue diferentes archivos de imágenes y que las imágenes se escalen de forma incorrecta.  Los iconos pueden mostrarse con unicode o con fuentes de icono especiales.
</p>


{% include shared/toc.liquid %}


{% include shared/takeaway.liquid list=page.key-takeaways.avoid-images %}

## Colocar texto en el lenguaje de marcado, no en imágenes

Siempre hay que procurar que el texto sea texto auténtico y que no forme parte de la imagen, como al usar títulos o números de teléfono y direcciones directamente en las imágenes.  De este modo, la información se puede copiar y pegar, se adaptará a cualquier tamaño de pantalla y será accesible para los lectores de pantalla.  Coloca el texto en el lenguaje de marcado y, si fuera necesario, usa fuentes web para conseguir el estilo deseado.

## Usar CSS para sustituir imágenes

Los navegadores actuales pueden usar funciones de CSS para crear estilos que antes hubieran requerido imágenes.  Por ejemplo, se pueden crear gradientes complejos, sombras y esquinas redondeadas usando las propiedades <code>background</code>, <code>box-shadow</code> y <code>border-radius</code> respectivamente.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Recuerda que el uso de estas técnicas requiere ciclos de procesamiento, algo que puede afectar a los dispositivos móviles.  Si se usan excesivamente, puedes perder las ventajas que hubieras ganado, además de empeorar el rendimiento.



