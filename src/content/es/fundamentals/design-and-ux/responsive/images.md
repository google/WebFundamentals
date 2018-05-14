project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Una imagen vale más que mil palabras y las imágenes son parte integral de las páginas. Sin embargo, a menudo también cuentan para la mayoría de los bytes descargados.  Con el diseño web adaptable, no solo nuestros diseños pueden cambiar según las características del dispositivo: también lo pueden hacer las imágenes.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-29 #}

# Imágenes {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


El diseño web adaptable significa que no solo nuestros diseños pueden cambiar según las características
del dispositivo: también lo puede hacer el contenido.  Por ejemplo, en pantallas de alta resolución (2x), los
gráficos de alta resolución garantizan nitidez. Una imagen
con un ancho del 50% puede funcionar bien cuando el navegador tiene 800 px de ancho, pero
en un teléfono más angosto, ocupará mucho espacio en pantalla y requerirá
el mismo ancho de banda cuando se reduzca para entrar en una pantalla más pequeña.

## Dirección artística

<img src="img/art-direction.png" alt="Ejemplo de dirección artística"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

En otros casos, es posible que se tenga que modificar la imagen con mayor agresividad: cambiar las
proporciones, recortarla y hasta reemplazarla por completo.  En este caso,
generalmente el cambio de imagen se denomina “dirección artística”.  Consulta
[responsiveimages.org/demos/](https://responsiveimages.org/demos/){: .external } para ver otros
ejemplos.

{% include "web/_shared/udacity/ud882.html" %}

## Imágenes en lenguaje de marcado

<style>
  .side-by-side {
    display: inline-block;
    margin: 0 20px 0 0;
    width: 45%;
  }

  span#data_uri {
    background: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2016.0.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%22396.74px%22%20height%3D%22560px%22%20viewBox%3D%22281.63%200%20396.74%20560%22%20enable-background%3D%22new%20281.63%200%20396.74%20560%22%20xml%3Aspace%3D%22preserve%22%0D%0A%09%3E%0D%0A%3Cg%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cg%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23E44D26%22%20points%3D%22409.737%2C242.502%20414.276%2C293.362%20479.828%2C293.362%20480%2C293.362%20480%2C242.502%20479.828%2C242.502%20%09%09%09%0D%0A%09%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23E44D26%22%20d%3D%22M281.63%2C110.053l36.106%2C404.968L479.757%2C560l162.47-45.042l36.144-404.905H281.63z%20M611.283%2C489.176%0D%0A%09%09%09%09L480%2C525.572V474.03l-0.229%2C0.063L378.031%2C445.85l-6.958-77.985h22.98h26.879l3.536%2C39.612l55.315%2C14.937l0.046-0.013v-0.004%0D%0A%09%09%09%09L480%2C422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283%2C489.176z%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22480%2C192.833%20604.247%2C192.833%20603.059%2C206.159%20600.796%2C231.338%20599.8%2C242.502%20599.64%2C242.502%20%0D%0A%09%09%09%09480%2C242.502%20480%2C293.362%20581.896%2C293.362%20595.28%2C293.362%20594.068%2C306.699%20582.396%2C437.458%20581.649%2C445.85%20480%2C474.021%20%0D%0A%09%09%09%09480%2C474.03%20480%2C525.572%20611.283%2C489.176%20642.17%2C143.166%20480%2C143.166%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22540.988%2C343.029%20480%2C343.029%20480%2C422.35%20535.224%2C407.445%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22414.276%2C293.362%20409.737%2C242.502%20479.828%2C242.502%20479.828%2C242.38%20479.828%2C223.682%20%0D%0A%09%09%09%09479.828%2C192.833%20355.457%2C192.833%20356.646%2C206.159%20368.853%2C343.029%20479.828%2C343.029%20479.828%2C293.362%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22479.828%2C474.069%20479.828%2C422.4%20479.782%2C422.413%20424.467%2C407.477%20420.931%2C367.864%20%0D%0A%09%09%09%09394.052%2C367.864%20371.072%2C367.864%20378.031%2C445.85%20479.771%2C474.094%20480%2C474.03%20480%2C474.021%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22343.784%2C50.229%20366.874%2C50.229%20366.874%2C75.517%20392.114%2C75.517%20392.114%2C0%20366.873%2C0%20366.873%2C24.938%20%0D%0A%09%09%09%09343.783%2C24.938%20343.783%2C0%20318.544%2C0%20318.544%2C75.517%20343.784%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22425.307%2C25.042%20425.307%2C75.517%20450.549%2C75.517%20450.549%2C25.042%20472.779%2C25.042%20472.779%2C0%20403.085%2C0%20%0D%0A%09%09%09%09403.085%2C25.042%20425.306%2C25.042%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22508.537%2C38.086%20525.914%2C64.937%20526.349%2C64.937%20543.714%2C38.086%20543.714%2C75.517%20568.851%2C75.517%20568.851%2C0%20%0D%0A%09%09%09%09542.522%2C0%20526.349%2C26.534%20510.159%2C0%20483.84%2C0%20483.84%2C75.517%20508.537%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22642.156%2C50.555%20606.66%2C50.555%20606.66%2C0%20581.412%2C0%20581.412%2C75.517%20642.156%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22480%2C474.021%20581.649%2C445.85%20582.396%2C437.458%20594.068%2C306.699%20595.28%2C293.362%20581.896%2C293.362%20%0D%0A%09%09%09%09480%2C293.362%20479.828%2C293.362%20479.828%2C343.029%20480%2C343.029%20540.988%2C343.029%20535.224%2C407.445%20480%2C422.35%20479.828%2C422.396%20%0D%0A%09%09%09%09479.828%2C422.4%20479.828%2C474.069%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22479.828%2C242.38%20479.828%2C242.502%20480%2C242.502%20599.64%2C242.502%20599.8%2C242.502%20600.796%2C231.338%20%0D%0A%09%09%09%09603.059%2C206.159%20604.247%2C192.833%20480%2C192.833%20479.828%2C192.833%20479.828%2C223.682%20%09%09%09%22%2F%3E%0D%0A%09%09%3C%2Fg%3E%0D%0A%09%3C%2Fg%3E%0D%0A%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E%0D%0A) no-repeat;
    background-size: cover;
    height: 484px;
  }

  span#svg {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' width='50%' height='560px' viewBox='281.63 0 396.74 560' enable-background='new 281.63 0 396.74 560' xml:space='preserve'><g><g><g><polygon fill='#E44D26' points='409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5'/><path fill='#E44D26' d='M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z'/><polygon fill='#F16529' points='480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2'/><polygon fill='#F16529' points='541,343 480,343 480,422.4 535.2,407.4'/><polygon fill='#EBEBEB' points='414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4'/><polygon fill='#EBEBEB' points='479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474'/><polygon points='343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5'/><polygon points='425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25'/><polygon points='508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5'/><polygon points='642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5'/><polygon fill='#FFFFFF' points='480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1'/><polygon fill='#FFFFFF' points='479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7'/></g></g></g></svg>") no-repeat;
    background-size: cover;
    height: 484px;
  }
</style>

El elemento `img` es poderoso: descarga, decodifica y representa contenido. Los navegadores modernos admiten una amplia gama de formatos de imagen.  Incluir imágenes que
sirvan en varios dispositivos es igual que en el escritorio y solo se requieren unos
pequeños ajustes para que la experiencia sea óptima.


### TL;DR {: .hide-from-toc }

- Utiliza tamaños relativos de imagen para evitar que sobrepasen el contenedor accidentalmente.
- Usa el elemento `picture` cuando quieras especificar distintas imágenes según las características del dispositivo (también conocido como dirección artística).
- Usa `srcset` y el descriptor `x` en el elemento `img` para proporcionarle indicios al navegador sobre cuál es la mejor imagen cuando se deba elegir entre distintas densidades.
- Si tu página solo tiene una o dos imágenes, y no se utilizan en ninguna otra parte del sitio, es buena idea usar imágenes incluidas por referencia para disminuir las solicitudes de archivo.


### Usa tamaños relativos para imágenes

Recuerda usar unidades relativas cuando se especifican los anchos de las imágenes a fin de evitar que
accidentalmente excedan la ventana de visualización.  Por ejemplo, con `width: 50%;`,
el ancho de la imagen será el 50% del elemento contenedor (no el 50% de la ventana de visualización o
el 50% del tamaño de píxeles real).

Dado que CSS permite que el contenido sobrepase el contenedor, es posible que debas usar
max-width: 100% para evitar que las imágenes y otros contenidos excedan la capacidad.  Por
ejemplo:


    img, embed, object, video {
      max-width: 100%;
    }
    

Asegúrate de usar descriptores útiles en el atributo `alt` de los elementos `img`:
brindan contexto a los
lectores de pantalla y a otras tecnologías de asistencia para que tu sitio sea más accesible.


### Mejora `img` con `srcset` en dispositivos de muchos PPP

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

El atributo `srcset` mejora el comportamiento del elemento
`img` y permite que sea más fácil proporcionar varios archivos de imagen
en distintas características de dispositivos. Similar a la
[función de CSS](#use-image-set-to-provide-high-res-images)
`image-set` nativa a CSS, `srcset` permite que el navegador elija la mejor imagen según
las características del dispositivo; por ejemplo, el uso de una imagen de 2x en una pantalla de 2x,
o una imagen de 1x en un dispositivo de 2x (en un futuro) en una red con
ancho de banda limitado.


<div style="clear:both;"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

En navegadores que no son compatibles con `srcset`, el navegador simplemente usa el archivo de imagen predeterminado
especificado por el atributo `src`.  Por esta razón, siempre es importante
incluir una imagen de 1x que se pueda mostrar en cualquier dispositivo, independientemente de las
capacidades.  Cuando se admite `srcset`, la lista de
imágenes o condiciones separadas por comas se analiza antes de realizar cualquier solicitud, y solo se descarga y se muestra la imagen más
apropiada.

Si bien las condiciones pueden incluir desde densidad de los píxeles hasta longitud y
altura, solo la densidad de los píxeles cuenta con una buena compatibilidad hoy en día.  Para equilibrar el comportamiento
actual con funciones futuras, continúa proporcionando simplemente la imagen de 2x en
el atributo.

### Dirección artística en imágenes receptivas con `picture`

<img class="attempt-right" src="img/art-direction.png" alt="Ejemplo de dirección artística"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

Para cambiar las imágenes según las características del dispositivo, también llamado dirección
artística, usa el elemento `picture`.  El elemento
`picture` define una solución declarativa para
proporcionar varias versiones de una imagen según distintas
características, como el tamaño del dispositivo, su resolución, la orientación
y otras.

<div style="clear:both;"></div>

Prueba interna: El elemento `picture` está llegando a los navegadores. Aunque todavía no se encuentra disponible en todos los navegadores, recomendamos usarlo debido a la sólida compatibilidad con versiones anteriores y al potencial uso del [polyfill Picturefill](http://picturefill.responsiveimages.org/){: .external }. Consulta el sitio [ResponsiveImages.org](http://responsiveimages.org/#implementation) para obtener más información.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Usa el elemento <code>picture</code> cuando el origen de una imagen
exista en varias densidades o cuando un diseño adaptable indique que se
debe usar una imagen un tanto diferente en ciertos tipos de pantallas.  Similar al elemento
<code>video</code>, se pueden incluir varios elementos <code>source</code>. De
esta forma, es posible especificar distintos archivos de imagen
a partir de consultas de medios o formatos de imagen.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media.html){: target="_blank" .external }

En el ejemplo anterior, si la longitud del navegador es 800 px, o más, se utiliza
`head.jpg` o `head-2x.jpg` según la resolución del dispositivo.
Si el navegador es entre 450 px y 800 px, se utiliza `head-small.jpg` o
`head-small-2x.jpg`, también según la resolución del dispositivo.
Para pantallas con una longitud menor que 450 px y para compatibilidad con versiones anteriores donde no se admite el elemento
`picture`, el navegador representa el elemento `img` en
su lugar y siempre hay que incluirlo.

#### Imagen de tamaño relativo

Cuando no se conoce el tamaño final de la imagen, puede resultar difícil especificar
un descriptor de densidad para las fuentes de imágenes.  Esto es particularmente cierto para
imágenes que abarcan un ancho proporcional al navegador y son fluidas, según
el tamaño del navegador.

En lugar de proporcionar tamaños y densidades de imagen que sean fijos, puedes especificar el tamaño de cada
imagen provista. Para hacerlo, agrega un descriptor de longitud junto al
tamaño del elemento de imagen, y permite que el navegador calcule automáticamente
la densidad adecuada de los píxeles y elija la mejor imagen que se deba descargar.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/sizes.html){: target="_blank" .external }


En el ejemplo anterior, se representa una imagen que es la mitad de la longitud de la ventana de visualización
(`sizes="50vw"`). Dependiendo del ancho del navegador y la relación de píxeles
del dispositivo, se le permite al navegador elegir la imagen correcta independientemente de la
longitud de la ventana del navegador. Por ejemplo, en la tabla siguiente se muestra la
imagen que seleccionaría el navegador:

<table class="">
  <thead>
    <tr>
      <th data-th="Browser width">Ancho del navegador</th>
      <th data-th="Device pixel ratio">Relación de píxeles del dispositivo</th>
      <th data-th="Image used">Imagen utilizada</th>
      <th data-th="Effective resolution">Resolución adecuada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400 px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400 px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320 px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2.5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600 px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2.67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640 px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3.125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100 px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1.27x</td>
    </tr>
  </tbody>
</table>


#### Considera los puntos de interrupción en imágenes receptivas

Muchas veces, el tamaño de la imagen puede variar según los puntos de interrupción
del diseño del sitio.  Por ejemplo, en una pantalla pequeña probablemente te convenga que la imagen
abarque el ancho completo de la ventana de visualización, mientras que en pantallas más grandes solo
debe tomar una proporción pequeña.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/breakpoints.html){: target="_blank" .external }

En el ejemplo anterior, el atributo `sizes` usa varias consultas de medios para
especificar el tamaño de la imagen. Cuando el ancho del navegador es mayor
que 600 px, la imagen es el 25% de la longitud de la ventana de visualización; cuando es entre 500 px
y 600 px, la imagen es el 50% de la longitud de la ventana de visualización; y cuando es menor que 500 px, es
el 100% de la longitud.


### Haz que las imágenes de producto sean expandibles

<figure class="attempt-right">
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="Sitio web de J. Crews con imágenes expandibles del producto">
  <figcaption class="success">
    Sitio web de J. Crews con imágenes expandibles del producto.
  </figcaption>
</figure>

Los clientes desean ver lo que comprarán.  En sitios minoristas, los usuarios esperan poder
ver primeros planos en alta resolución de los productos para poder observar mejor los
detalles. [Quienes participaron del estudio](/web/fundamentals/getting-started/principles/#make-product-images-expandable) mostraron frustración cuando no pudieron hacerlo.

El sitio web de J. Crews es un buen ejemplo de imágenes expandibles y con capacidad táctil.
Una superposición que desaparece indica que una imagen tiene capacidad táctil. Esto hace posible una imagen
ampliada con buen nivel de detalle a la vista.

<div style="clear:both;"></div>

### Otras técnicas de imagen

#### Imágenes de compresión

La [técnica de imágenes de compresión](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)
proporciona una imagen 2x muy comprimida a todos los dispositivos, independientemente de las
capacidades reales del dispositivo.  Según el tipo de imagen y el nivel de
compresión, la calidad de la imagen no parecerá cambiar y el tamaño del archivo se reducirá
de manera considerable.

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html){: target="_blank" .external }

Warning: Ten precaución con la técnica de compresión, ya que requiere más memoria y capacidad de decodificación. Cambiar el tamaño de imágenes grandes en pantallas más pequeñas consume muchos recursos y puede resultar especialmente tedioso en dispositivos de gama baja, donde la memoria y la capacidad de procesamiento son limitadas.

#### Reemplazo de imágenes de JavaScript

El reemplazo de imágenes de JavaScript verifica las capacidades del dispositivo y “toma la decisión
correcta”. Puedes determinar la relación de píxeles del dispositivo a través de
`window.devicePixelRatio`, obtener el ancho y el alto de la pantalla e incluso posiblemente examinar
conexiones de red a través de `navigator.connection` o emitiendo una solicitud
falsa. Cuando hayas recolectado toda esta información, puedes decidir qué
imagen cargar.

Una gran desventaja de este enfoque: el uso de JavaScript implica que
retardarás la carga de imágenes al menos hasta que el analizador de lectura previa haya terminado. Esto
significa que incluso las imágenes no comenzarán a descargarse hasta después de que el evento `pageload` 
se active. Además, el navegador seguramente descargará
imágenes de 1x y 2x, lo cual aumentará el volumen de la página.


#### Inserción de imágenes: de trama y vectoriales

Hay dos formas fundamentalmente diferentes de crear y almacenar imágenes; esto influirá en la manera de implementar imágenes adaptables.

Las **imágenes de trama**, como fotografías y otras imágenes, se representan como una cuadrícula de puntos de color individuales. Las imágenes de trama pueden provenir de una cámara o un escáner, o se pueden haber creado con el elemento canvas de HTMML. Para almacenar imágenes de trama, se usan formatos como PNG, JPEG, y WebP.

Las **imágenes vectoriales**, como logotipos y arte lineal, se definen como un conjunto de curvas, líneas, formas, colores de relleno y degradados. Las imágenes vectoriales pueden crearse con programas como Adobe Illustrator o Inkscape, o de manera manual en código con un formato vectorial como SVG.

##### SVG

SVG permite incluir gráficos vectoriales adaptables en una página web. La ventaja de los formatos de archivo vectoriales respecto de los formatos de archivo de trama es que el navegador puede representar una imagen vectorial en cualquier tamaño. Los formatos vectoriales describen la geometría de la imagen: cómo se construye a partir de líneas, curvas, colores, etc. Los formatos de trama, en cambio, solo tienen información sobre puntos individuales de color. Por lo tanto, el navegador debe calcular la forma de completar los espacios en blanco al realizar el ajuste.

A continuación, se muestran dos versiones de la misma imagen: una imagen PNG a la izquierda y un archivo SVG a la derecha. El archivo SVG se ve muy bien en cualquier tamaño, mientras que la imagen PNG junto a este comienza a verse borrosa en pantallas más grandes.

<img class="side-by-side" src="img/html5.png" alt="Logotipo de HTML5, formato PNG" />
<img class="side-by-side" src="img/html5.svg" alt="Logotipo de HTML5, formato SVG" />

Si deseas reducir el número de solicitudes de archivo que realiza tu página, puedes codificar imágenes en línea con el formato SVG o de URI de datos. Si consultas el código fuente de esta página, verás que los siguientes logotipos se declaran incluidos por referencia: un URI de datos y un SVG.

<img class="side-by-side" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
      BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW
      9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RUR
      CBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2
      ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8
      vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OT
      kveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzk2Ljc0cHgiIGhlaWdodD0iNTYwc
      HgiIHZpZXdCb3g9IjI4MS42MyAwIDM5Ni43NCA1NjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcg
      MjgxLjYzIDAgMzk2Ljc0IDU2MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSINCgk+DQo8Zz4NCgk8Zz4
      NCgkJPGc+DQoJCQk8cG9seWdvbiBmaWxsPSIjRTQ0RDI2IiBwb2ludHM9IjQwOS43MzcsMjQyLj
      UwMiA0MTQuMjc2LDI5My4zNjIgNDc5LjgyOCwyOTMuMzYyIDQ4MCwyOTMuMzYyIDQ4MCwyNDIuN
      TAyIDQ3OS44MjgsMjQyLjUwMiAJCQkNCgkJCQkiLz4NCgkJCTxwYXRoIGZpbGw9IiNFNDREMjYi
      IGQ9Ik0yODEuNjMsMTEwLjA1M2wzNi4xMDYsNDA0Ljk2OEw0NzkuNzU3LDU2MGwxNjIuNDctNDU
    uMDQybDM2LjE0NC00MDQuOTA1SDI4MS42M3ogTTYxMS4yODMsNDg5LjE3Ng0KCQkJCUw0ODAsNT
    I1LjU3MlY0NzQuMDNsLTAuMjI5LDAuMDYzTDM3OC4wMzEsNDQ1Ljg1bC02Ljk1OC03Ny45ODVoM
    jIuOThoMjYuODc5bDMuNTM2LDM5LjYxMmw1NS4zMTUsMTQuOTM3bDAuMDQ2LTAuMDEzdi0wLjAw
    NA0KCQkJCUw0ODAsNDIyLjM1di03OS4zMmgtMC4xNzJIMzY4Ljg1M2wtMTIuMjA3LTEzNi44NzF
    sLTEuMTg5LTEzLjMyNWgxMjQuMzcxSDQ4MHYtNDkuNjY4aDE2Mi4xN0w2MTEuMjgzLDQ4OS4xNz
    Z6Ii8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjQ4MCwxOTIuODMzIDYwN
    C4yNDcsMTkyLjgzMyA2MDMuMDU5LDIwNi4xNTkgNjAwLjc5NiwyMzEuMzM4IDU5OS44LDI0Mi41
    MDIgNTk5LjY0LDI0Mi41MDIgDQoJCQkJNDgwLDI0Mi41MDIgNDgwLDI5My4zNjIgNTgxLjg5Niw
    yOTMuMzYyIDU5NS4yOCwyOTMuMzYyIDU5NC4wNjgsMzA2LjY5OSA1ODIuMzk2LDQzNy40NTggNT
    gxLjY0OSw0NDUuODUgNDgwLDQ3NC4wMjEgDQoJCQkJNDgwLDQ3NC4wMyA0ODAsNTI1LjU3MiA2M
    TEuMjgzLDQ4OS4xNzYgNjQyLjE3LDE0My4xNjYgNDgwLDE0My4xNjYgCQkJIi8+DQoJCQk8cG9s
    eWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjU0MC45ODgsMzQzLjAyOSA0ODAsMzQzLjAyOSA
    0ODAsNDIyLjM1IDUzNS4yMjQsNDA3LjQ0NSAJCQkiLz4NCgkJCTxwb2x5Z29uIGZpbGw9IiNFQk
    VCRUIiIHBvaW50cz0iNDE0LjI3NiwyOTMuMzYyIDQwOS43MzcsMjQyLjUwMiA0NzkuODI4LDI0M
    i41MDIgNDc5LjgyOCwyNDIuMzggNDc5LjgyOCwyMjMuNjgyIA0KCQkJCTQ3OS44MjgsMTkyLjgz
    MyAzNTUuNDU3LDE5Mi44MzMgMzU2LjY0NiwyMDYuMTU5IDM2OC44NTMsMzQzLjAyOSA0NzkuODI
    4LDM0My4wMjkgNDc5LjgyOCwyOTMuMzYyIAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0VCRU
    JFQiIgcG9pbnRzPSI0NzkuODI4LDQ3NC4wNjkgNDc5LjgyOCw0MjIuNCA0NzkuNzgyLDQyMi40M
    TMgNDI0LjQ2Nyw0MDcuNDc3IDQyMC45MzEsMzY3Ljg2NCANCgkJCQkzOTQuMDUyLDM2Ny44NjQg
    MzcxLjA3MiwzNjcuODY0IDM3OC4wMzEsNDQ1Ljg1IDQ3OS43NzEsNDc0LjA5NCA0ODAsNDc0LjA
    zIDQ4MCw0NzQuMDIxIAkJCSIvPg0KCQkJPHBvbHlnb24gcG9pbnRzPSIzNDMuNzg0LDUwLjIyOS
    AzNjYuODc0LDUwLjIyOSAzNjYuODc0LDc1LjUxNyAzOTIuMTE0LDc1LjUxNyAzOTIuMTE0LDAgM
    zY2Ljg3MywwIDM2Ni44NzMsMjQuOTM4IA0KCQkJCTM0My43ODMsMjQuOTM4IDM0My43ODMsMCAz
    MTguNTQ0LDAgMzE4LjU0NCw3NS41MTcgMzQzLjc4NCw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWd
    vbiBwb2ludHM9IjQyNS4zMDcsMjUuMDQyIDQyNS4zMDcsNzUuNTE3IDQ1MC41NDksNzUuNTE3ID
    Q1MC41NDksMjUuMDQyIDQ3Mi43NzksMjUuMDQyIDQ3Mi43NzksMCA0MDMuMDg1LDAgDQoJCQkJN
    DAzLjA4NSwyNS4wNDIgNDI1LjMwNiwyNS4wNDIgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9
    IjUwOC41MzcsMzguMDg2IDUyNS45MTQsNjQuOTM3IDUyNi4zNDksNjQuOTM3IDU0My43MTQsMzg
    uMDg2IDU0My43MTQsNzUuNTE3IDU2OC44NTEsNzUuNTE3IDU2OC44NTEsMCANCgkJCQk1NDIuNT
    IyLDAgNTI2LjM0OSwyNi41MzQgNTEwLjE1OSwwIDQ4My44NCwwIDQ4My44NCw3NS41MTcgNTA4L
    jUzNyw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9IjY0Mi4xNTYsNTAuNTU1IDYw
    Ni42Niw1MC41NTUgNjA2LjY2LDAgNTgxLjQxMiwwIDU4MS40MTIsNzUuNTE3IDY0Mi4xNTYsNzU
    uNTE3IAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI0ODAsNDc0Lj
    AyMSA1ODEuNjQ5LDQ0NS44NSA1ODIuMzk2LDQzNy40NTggNTk0LjA2OCwzMDYuNjk5IDU5NS4yO
    CwyOTMuMzYyIDU4MS44OTYsMjkzLjM2MiANCgkJCQk0ODAsMjkzLjM2MiA0NzkuODI4LDI5My4z
    NjIgNDc5LjgyOCwzNDMuMDI5IDQ4MCwzNDMuMDI5IDU0MC45ODgsMzQzLjAyOSA1MzUuMjI0LDQ
    wNy40NDUgNDgwLDQyMi4zNSA0NzkuODI4LDQyMi4zOTYgDQoJCQkJNDc5LjgyOCw0MjIuNCA0Nz
    kuODI4LDQ3NC4wNjkgCQkJIi8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9I
    jQ3OS44MjgsMjQyLjM4IDQ3OS44MjgsMjQyLjUwMiA0ODAsMjQyLjUwMiA1OTkuNjQsMjQyLjUw
    MiA1OTkuOCwyNDIuNTAyIDYwMC43OTYsMjMxLjMzOCANCgkJCQk2MDMuMDU5LDIwNi4xNTkgNjA
    0LjI0NywxOTIuODMzIDQ4MCwxOTIuODMzIDQ3OS44MjgsMTkyLjgzMyA0NzkuODI4LDIyMy42OD
    IgCQkJIi8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==">
<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg>

El archivo SVG ofrece [gran compatibilidad](http://caniuse.com/svg-html5) en dispositivos móviles y equipos de escritorio, y las [herramientas de optimización](https://sarasoueidan.com/blog/svgo-tools/) pueden reducir de manera considerable el tamaño del archivo SVG. Los dos logotipos SVG siguientes en línea parecen idénticos, pero uno tiene un tamaño aproximado de 3 KB y el otro solo ocupa 2 KB:

<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg><svg class="side-by-side" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50%" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5"/><path fill="#E44D26" d="M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z"/><polygon fill="#F16529" points="480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2"/><polygon fill="#F16529" points="541,343 480,343 480,422.4 535.2,407.4"/><polygon fill="#EBEBEB" points="414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4"/><polygon fill="#EBEBEB" points="479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474"/><polygon points="343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5"/><polygon points="425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25"/><polygon points="508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5"/><polygon points="642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5"/><polygon fill="#FFFFFF" points="480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1"/><polygon fill="#FFFFFF" points="479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7"/></g></g></g></svg>

##### URI de datos

Los URI de datos proporcionan una manera de incluir un archivo, como una imagen, en línea configurando el scr de un elemento <code>img</code> como una cadena codificada Base64 con el siguiente formato:


    <img src="data:image/svg+xml;base64,[data]">
    

El comienzo del código para el logotipo HTML5 presentado arriba tiene el siguiente aspecto:


    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
    BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW ...">
    

(La versión completa tiene más de 5000 caracteres de extensión).

Se encuentran disponibles herramientas de arrastrar y soltar, como [jpillora.com/base64-encoder](https://jpillora.com/base64-encoder), para convertir archivos ejecutables como imágenes para los URI de datos. Al igual que los archivos SVG, los URI de datos son [muy compatibles](http://caniuse.com/datauri) con dispositivos móviles y navegadores de escritorio.

##### Alineación en CSS

Los URI de datos y los SVG también se pueden incluir por referencia en CSS (tanto en dispositivos móviles como de escritorio). A continuación, se muestran dos imágenes idénticas que se implementaron como imágenes de fondo en CSS (un URI de datos y un SVG):

<span class="side-by-side" id="data_uri"></span>
<span class="side-by-side" id="svg"></span>

##### Ventajas y desventajas de la inclusión por referencia

Si el código para incluir imágenes por referencia puede ser verboso, sobre todo en los URI de datos, ¿por qué lo usamos? ¡Para reducir solicitudes HTTP! Los archivos SVG y los URI de datos pueden permitir la recuperación de todos los elementos de una página web, como las imágenes y el lenguaje CSS y JavaScript, con una sola solicitud.

La desventaja:

* En dispositivos móviles, los URI de datos pueden tardar un tiempo [considerablemente mayor](https://www.mobify.com/blog/data-uris-are-slow-on-mobile/) en aparecer en dispositivos móviles cuando se comparan con imágenes de un <code>src</code> externo.
* Los URI de datos pueden aumentar considerablemente el tamaño de una solicitud HTML.
* Agregan complejidad a tu lenguaje de marcado y a tu flujo de trabajo.
* El formato de los URI de datos es considerablemente más grande que el ejecutable (hasta un 30%). Por lo tanto, no reduce el tamaño total de descarga.
* Los URI de datos no pueden almacenarse en caché. Por ello, deben descargarse para cada página en la que se usen.
* No son compatibles con IE 6 y 7 y la compatibilidad con IE 8 no es completa.
* Con HTTP/2, la reducción del número de solicitudes de recursos dejará de ser una prioridad.

Como todo lo que sea adaptable, es necesario probar cuál es la mejor opción. Usa herramientas del programador para medir el tamaño de la imagen descargada, la cantidad de solicitudes y la latencia total. A veces, los URI de datos pueden ser útiles para imágenes de trama. Por ejemplo, pueden ser útiles en una página principal que tenga una o dos fotografías que no se usen en otro lugar. Si debes insertar imágenes vectoriales, SVG es una opción mucho mejor.



## Imágenes en CSS

La propiedad `background` de CSS es una herramienta potente para agregar imágenes complejas
a elementos, facilitar la incorporación de varias imágenes, repetirlas y
más.  Cuando se la combina con consultas de medios, esta propiedad adquiere aún
más poder: permite cargar imágenes de forma condicional según la resolución
de la pantalla, el tamaño de la ventana de visualización y más.


### TL;DR {: .hide-from-toc }
- Usa la imagen que mejor se adapte a las características de la pantalla. Ten en cuenta el tamaño de la pantalla, la resolución del dispositivo y el diseño de la página.
- Cambia la propiedad `background-image` de CSS en pantallas de muchos PPP a través de consultas de medios con `min-resolution` y `-webkit-min-device-pixel-ratio`.
- Usa srcset para proporcionar imágenes de alta resolución además de la imagen 1x en lenguaje de marcado.
- Ten en cuenta los costos de rendimiento cuando uses técnicas de reemplazo de imágenes en JavaScript o cuando proporciones imágenes de alta resolución muy comprimidas a dispositivos de baja resolución.


### Usar solicitudes de medios para la carga condicional de imágenes o la dirección artística

Las consultas de medios no solo influyen en el diseño de la página: puedes usarlas para
cargar imágenes de forma condicional o para proporcionar dirección artística según la longitud de la
ventana de visualización.

Por ejemplo, en el siguiente código, solo se descarga y aplica `small.png`
al `div` de contenido en pantallas pequeñas, mientras que
en pantallas más grandes, `background-image: url(body.png)` se aplica al cuerpo y `background-image:
url(large.png)` se aplica al `div` de contenido.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/conditional-mq.html){: target="_blank" .external }

### Usa image-set para proporcionar imágenes de alta resolución

La función `image-set()` en CSS mejora el comportamiento de la propiedad `background`,
lo cual permite proporcionar de manera sencilla archivos de imágenes múltiples para dispositivos de
diferentes características.  Esto permite que el navegador elija la mejor imagen según
las características del dispositivo; por ejemplo, el uso de una imagen de 2x en una pantalla de 2x,
o una imagen de 1x en un dispositivo de 2x en una red con un ancho de banda limitado.


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

Además de cargar la imagen correcta, el navegador le cambia el tamaño
de manera acorde. Es decir, el navegador presupone que las imágenes 2x tienen el doble de tamaño
que las imágenes 1x. Por lo tanto, reduce el tamaño de la imagen 2x en un factor de dos para que
parezca que la imagen tiene el mismo tamaño en la página.

El soporte para `image-set()` aún es nuevo, y solo es compatible con Chrome y
Safari con el prefijo de proveedor `-webkit`.  No olvides incluir una
imagen de respaldo para cuando no se admita `image-set()`. Por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-set.html){: target="_blank" .external }

El código anterior cargará el recurso correspondiente en navegadores compatibles con image-set;
de lo contrario, regresará al recurso 1x. La razón obvia es que pocos navegadores admiten
`image-set()`, pero la mayoría sí es capaz de utilizar el recurso 1x.

### Usar consultas de medios para proporcionar imágenes de alta resolución o dirección artística

Las consultas de medios pueden crear reglas según la 
[relación de píxeles del dispositivo](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg). De
esta forma, se pueden especificar distintas imágenes para pantallas 2x en comparación con pantallas 1x.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox y Opera admiten `(min-resolution: 2dppx)` estándar,
mientras que Safari y Android requieren la sintaxis con prefijo del proveedor
sin la unidad `dppx`.  Recuerda que estos estilos solo se cargan si el dispositivo
se adecua a la solicitud de medios y que debes especificar los estilos para el caso básico.  Esto
también añade el beneficio de garantizar la representación de un elemento si el navegador
no admite consultas de medios sobre resolución.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media-query-dppx.html){: target="_blank" .external }

También puedes usar la sintaxis de ancho mínimo para mostrar imágenes alternativas que dependan del
tamaño de la ventana de visualización.  La ventaja de esta técnica es que la imagen no se
descarga si la consulta de medios no coincide.  Por ejemplo, `bg.png` solo se
descarga y se aplica en el `body` si el ancho del navegador es de 500 px o superior:


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    


## Usa SVG para íconos 

Cuando agregues íconos a tu página, usa íconos SVG cuando sea posible o, en
algunos casos, caracteres unicode.


### TL;DR {: .hide-from-toc }
- Usa íconos SVG o unicode en lugar de imágenes de trama.


### Reemplaza íconos simples por unicode

Muchas fuentes incluyen compatibilidad con los numerosos glifos unicode, que se pueden usar
en lugar de imágenes. A diferencia de las imágenes, las fuentes unicode cambian su tamaño y lucen bien
independientemente de cómo aparezcan en pantalla (grandes o chicas).

Además del grupo de caracteres convencionales, unicode puede incluir símbolos de 
flechas (&#8592;), operadores matemáticos (&#8730;), formas geométricas
(&#9733;), imágenes de control (&#9654;), notas musicales (&#9836;),
letras griegas (&#937;) y hasta piezas de ajedrez (&#9822;).

Un carácter unicode se incluye del mismo modo que las entidades nombradas:
`&#XXXX`, donde `XXXX` representa el número de carácter unicode. Por ejemplo:


    You're a super &#9733;
    

You're a super &#9733;

### Reemplazar íconos complejos por SVG

Si necesitas íconos más complejos, los íconos SVG son, por lo general, livianos y 
fáciles de usar, y su estilo se puede definir con CSS. SVG tiene varias ventajas sobre
las imágenes de trama:

* Son gráficos vectoriales que se pueden ajustar a escala de manera infinita.
* CSS modifica el color, las sombras y la transparencia, y las animaciones son 
  simples.
* Las imágenes SVG se pueden incluir por referencia directamente en el documento.
* Son semánticos.
* Proporcionan una mejor accesibilidad con los atributos adecuados.



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-svg.html){: target="_blank" .external }

### Usa fuentes de íconos con precaución

<figure class="attempt-right">
  <img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x" alt="Ejemplo de una página que emplea FontAwesome para sus íconos de fuente.">
  <figcaption>
    <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html" target="_blank" class="external">
      Ejemplo de una página que emplea FontAwesome para sus íconos de fuente.
    </a>
  </figcaption>
</figure>

Las fuentes de íconos se usan mucho y pueden ser fáciles de usar, pero demuestran ciertas desventajas 
en comparación con los íconos SVG.

* Son gráficos vectoriales que se pueden ajustar a escala de manera infinita, pero se pueden 
  suavizar. Esto hace que los íconos no sean tan definidos como se espera.
* Ajuste de estilos limitados con CSS.
* Lograr un posicionamiento de píxeles ideal puede resultar difícil, según la altura de línea 
  y el espaciado de letras, entre otros aspectos.
* No son semánticas y pueden ser difícil de usar en lectores de pantalla u otras 
  tecnologías de asistencia.
* Si su ámbito no se establece correctamente, pueden terminar en archivos de gran tamaño en los que solo se usará un 
  pequeño conjunto de los íconos disponibles. 

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html){: target="_blank" .external }

Hay cientos de fuentes de íconos disponibles de forma gratuita y no gratuita: [Font
Awesome](https://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/){: .external } y [Glyphicons](https://glyphicons.com/) son algunos de ellos.

Asegúrate de equilibrar el peso de la solicitud HTTP adicional y el tamaño del archivo con la
necesidad de íconos. Por ejemplo, si solo necesitas algunos íconos, tal vez sea
mejor usar una imagen o un sprite de imagen.


## Optimiza las imágenes para mejorar el rendimiento

A menudo, las imágenes representan la mayor parte de los bytes descargados y ocupan
una considerable proporción del espacio visual de la página. En consecuencia, la optimización
de imágenes puede ser uno de los más eficaces medios de ahorro de bytes y
de mejora de rendimiento para tu sitio web. Cuantos menos bytes deba descargar el navegador,
menor será la exigencia del ancho de banda del cliente, y mayor la velocidad
a la que el navegador podrá descargar y mostrar todo el contenido.


### TL;DR {: .hide-from-toc }
- No debes elegir un formato de imagen de forma aleatoria: debes conocer los distintos formatos disponibles y usar el más adecuado.
- Para reducir el tamaño de los archivos, incluye herramientas de optimización y compresión de imágenes en tu flujo de trabajo.
- Para disminuir la cantidad de solicitudes HTTP, reemplaza las imágenes usadas frecuentemente con image sprites.
- Para mejorar el tiempo de carga inicial de la página y disminuir su peso inicial, una buena opción es cargar las imágenes cuando aparezcan en pantalla.


### Elige el formato correcto

Se deben elegir entre dos tipos de imágenes: [imágenes vectoriales](https://en.wikipedia.org/wiki/Vector_graphics)
e [imágenes de trama](https://en.wikipedia.org/wiki/Raster_graphics).
En las imágenes de trama, también debes elegir el formato de compresión adecuado
(por ejemplo, `GIF`, `PNG` o `JPG`).

Las **imágenes de trama**, como fotografías y otras imágenes, se representan como una
cuadrícula de puntos o píxeles individuales. Las imágenes de trama por lo general provienen de cámaras o
escáneres, o pueden crearse en el navegador con el elemento `canvas`.  A medida que
aumenta el tamaño de la imagen, también aumentará el tamaño del archivo.  Cuando su tamaño supera
el tamaño original, las imágenes de trama se ven borrosas porque el navegador necesita adivinar
cómo rellenar los píxeles faltantes.

Las **imágenes vectoriales**, como logotipos y arte lineal, se definen como un conjunto de curvas,
líneas, formas y colores de relleno. Las imágenes vectoriales se crean con programas como
Adobe Illustrator o Inkscape y se guardan en un formato de vectores como
[`SVG`](https://css-tricks.com/using-svg/).  Como las imágenes vectoriales se construyen a partir de
primitivas simples, se pueden cambiar de tamaño sin perder calidad y sin
realizar cambios en el tamaño del archivo.

Cuando elijas el formato adecuado, es importante tener en cuenta tanto el origen
de la imagen (trama o vector) como el contenido (colores, animaciones, texto, etc.).
No hay un formato que se adecue a todos los tipos de imagen; todos tienen sus ventajas
y desventajas.

Para elegir el formato adecuado, comienza con estas pautas:

* Usa `JPG` para imágenes fotográficas.
* Usa `SVG` para arte vectorial y gráficos de colores sólidos, como los de logotipos y arte lineal.
  Si arte vectorial no está disponible, intenta con `WebP` o `PNG`.
* Usa `PNG` en lugar de `GIF`, ya que permite más colores y ofrece mejores relaciones de
  compresión.
* Para animaciones de mayor duración, es buena idea usar `<video>`, que proporciona una mejor calidad
  de imagen y le permite al usuario controlar la reproducción.

### Reducir el tamaño del archivo

Puedes disminuir considerablemente el tamaño del archivo de imagen si realizas un “procesamiento posterior” de las imágenes después de
guardarlas. Existen varias herramientas de compresión de imagen: con pérdida y sin pérdida,
en línea, GUI y línea de comandos.  Cuando sea posible, será mejor intentar automatizar la optimización
de la imagen de modo que ocupe un lugar prioritario en tu flujo de trabajo.

Se encuentran disponibles varias herramientas que realizan mejores compresiones y sin pérdida en archivos `JPG`
y `PNG`, y que no modifican la calidad de la imagen. Para `JPG`, prueba
[jpegtran](http://jpegclub.org/){: .external } o
[jpegoptim](http://freshmeat.net/projects/jpegoptim/){: .external } (disponible solamente en Linux;
ejecuta con la opción --strip-all). Para `PNG`, prueba
[OptiPNG](http://optipng.sourceforge.net/){: .external } o
[PNGOUT](http://www.advsys.net/ken/util/pngout.htm).

### Usa image sprites

<img src="img/sprite-sheet.png" class="attempt-right" alt="Hoja de sprites de imagen usada en un ejemplo">

Sprites con CSS es la técnica mediante la cual se combinan varias imágenes en una sola
imagen de “hoja de sprites”. A continuación, puedes usar imágenes individuales si especificas la
imagen de fondo de un elemento (u hoja de sprites) además de un desplazamiento para mostrar la
parte adecuada.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media//image-sprite.html){: target="_blank" .external }

El uso de sprites de imágenes tiene la ventaja de reducir el número de descargas necesarias para obtener
varias imágenes y, al mismo tiempo, permitir el almacenamiento en caché.

### Considera la carga diferida

La carga diferida puede acelerar significativamente las cargas en páginas extensas que
incluyan varias imágenes en la parte de la página que todavía no se mostró. Este método carga las imágenes según sea necesario, o cuando el
contenido principal ya se ha cargado y representado.  Además de mejoras en el rendimiento
, el uso de la carga diferida puede generar experiencias de desplazamiento infinito.

Ten cuidado al crear páginas con desplazamiento infinito: dado que el contenido se carga a medida que se muestra,
es posible que los motores de búsqueda nunca vean dicho contenido.  Además,
es posible que los usuarios que busquen información de pie de página nunca 
la encuentren porque se carga contenido nuevo continuamente.



## No utilices imágenes

A menudo, la mejor imagen no es una imagen. Cuando sea posible,
usa las capacidades nativas del navegador para proporcionar la misma funcionalidad o una
similar.  Los navegadores generan elementos visuales que antes hubiesen
requerido imágenes.   Es decir, los navegadores ya no necesitan descargar
archivos de imagen separados; de esta forma, se evita que aparezcan imágenes con tamaños extraños.  Puedes usar unicode o fuentes especiales de íconos para representar íconos.

### Coloca texto en lenguaje de marcado y no en imágenes

Cuando sea posible, inserta texto en formato de texto y no en imágenes. Por
ejemplo, si usas imágenes para los encabezados o colocas información de contacto (como números telefónicos
o direcciones) directamente en imágenes, los usuarios no podrán 
copiar ni pegar la información, los lectores de pantalla no podrán acceder a los datos y la información no será
adaptable.  Como alternativa, ubica el texto en tu lenguaje de marcado y, si es necesario, usa
fuentes web para alcanzar el estilo que necesitas.

### Usa CSS para reemplazar imágenes

Los navegadores modernos pueden usar características de CSS para crear estilos que antes hubiesen requerido
imágenes.  Por ejemplo, se pueden crear degradados complejos con la propiedad
`background`, se pueden colocar sombras con `box-shadow` y se pueden agregar esquinas
redondeadas con la propiedad `border-radius`.

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }

  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Ten en cuenta que para usar estas técnicas se necesitan ciclos de representación, requisito
que puede ser considerable para los dispositivos móviles.  Si los utilizas demasiado, perderás los beneficios
obtenidos y es posible que disminuya el rendimiento.


{# wf_devsite_translation #}
