project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Se puede acceder a la web desde una gran variedad de dispositivos, desde teléfonos de pantalla pequeña hasta televisiones de pantalla grande. Cada dispositivo tiene sus limitaciones y beneficios propios. Como programador web, se espera que soportes una gran variedad de dispositivos.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2013-12-31 #}

# Tu primer sitio multidispositivo {: .page-title }

Warning: Este artículo no se ha actualizado durante un largo tiempo y puede ser que no refleje la realidad. En cambio, consulta el curso gratuito [Diseño web adaptable](https://www.udacity.com/course/responsive-web-design-fundamentals--ud893) en Udacity.

{% include "web/_shared/contributors/paulkinlan.html" %}

<img src="images/finaloutput-2x.jpg" alt="muchos dispositivos que muestran el proyecto final" class="attempt-right">

La creación de experiencias multidispositivos no es tan difícil como podría parecer.
En esta guía, crearemos una página de destino de producto para el 
[Curso de desarrollo web móvil CS256](https://www.udacity.com/course/mobile-web-development--cs256)
que funcione bien en distintos tipos de dispositivos.

Compilar para múltiples dispositivos con diferentes características, tamaños de pantalla
y métodos de interacción muy diversos puede parecer intimidante, si no imposible
para dar los primeros pasos.

No es tan difícil crear sitios completamente adaptables, y para demostrártelo,
esta guía te orientará en los pasos para comenzar.
Lo hemos dividido en dos simples pasos:

1.  Definir la arquitectura de la información (comúnmente denominada AI) y la estructura de la página.
2.  Agregar elementos de diseño para hacerla receptiva y asegurarte de que se vea bien en todos los dispositivos.


## Crea tu contenido y estructura

El contenido es el aspecto más importante de cualquier sitio. Así que, diseñemos para el
contenido y no permitamos que el diseño dicte el contenido. En esta guía, identificaremos
el contenido que necesitamos primer, crearemos una estructura de página basada en este contenido y
luego presentaremos la página en un simple diseño lineal que funcione bien en ventanas de visualización estrechas
y anchas.


### Crea la estructura de la página

Hemos identificado que necesitamos lo siguiente:

1. Un área en la que se describa de forma detallada nuestro producto “CS256: Desarrollo de Web móvil”.
2.  Un formulario para recopilar información de los usuarios interesados en nuestro producto.
3.  Una descripción detallada y un video.
4.  Imágenes del producto en acción.
5.  Una tabla de datos con información para respaldar las afirmaciones.

#### TL;DR {: .hide-from-toc }
- Primero, identifica el contenido que necesitas.
- Delimita la arquitectura de la información (AI) para ventanas de visualización estrechas y anchas.
- Crea una vista preliminar de la página con contenido, pero sin estilo.

También hemos creado una arquitectura de la información y un diseño preliminares para las
ventanas de visualización ancha y estrecha.

<div class="attempt-left">
  <figure>
    <img src="images/narrowviewport.png" alt="AI para la ventana de visualización estrecha">
    <figcaption>
      AI para la ventana de visualización estrecha
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/wideviewport.png" alt="AI para la ventana de visualización ancha">
    <figcaption>
      AI para la ventana de visualización ancha
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Esto se puede convertir fácilmente en las secciones generales de una página preliminar que
usaremos durante el resto de este proyecto.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addstructure.html){: target="_blank" .external }

### Agrega contenido a la página

La estructura básica del sitio está completa. Tenemos conocimiento de las secciones que necesitamos, del
contenido que queremos mostrar en esas secciones y de dónde ubicarlo en la arquitectura
de la información general. Ahora podemos comenzar a compilar el sitio.

Note: Más adelante agregaremos el estilo

### Crea el título y el formulario

El título y el formulario de notificación de solicitud son los componentes fundamentales de
nuestra página y se le deben presentar al usuario de inmediato.

En el título, ingresa texto sencillo para describir el curso:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addheadline.html){: target="_blank" .external }

También debemos llenar el formulario.
Será sencillo y en él se registrarán el nombre, la dirección de correo electrónico
y el número de teléfono de los usuarios.

Todos los formularios deben tener etiquetas y marcadores de posición para que los usuarios
puedan, con mayor facilidad, enfocar los elementos, comprender qué deben contener y contribuir a que las
herramientas de accesibilidad identifiquen la estructura del formulario.  El atributo name
no solo envía el valor del formulario al servidor, sino también se usa para dar
pautas importantes al navegador sobre cómo completar el formulario de forma automática para el usuario.

Agregaremos tipos semánticos para que los usuarios puedan ingresar contenido en un
dispositivo móvil de forma rápida y simple.  Por ejemplo, al ingresar un número de
teléfono, el usuario solo debe ver un teclado de marcado.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addform.html){: target="_blank" .external }

#### Crea la sección de video e información

La sección de contenido de video e información es un poco más compleja.
Tendrá una lista de viñetas con las características de nuestros productos y un
marcador de posición de video que mostrará al usuario el producto en funcionamiento.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

Los videos generalmente se usan para describir contenido de forma más interactiva y, con
frecuencia, para ofrecer una demostración de un producto o concepto.

Si sigues las prácticas recomendadas, podrás integrar fácilmente video a tu sitio:

*  Agrega un atributo `controls` para permitir que las personas puedan reproducir el video de forma sencilla.
*  Agrega una imagen `poster` para proporcionar una vista previa del contenido.
*  Agrega varios elementos `<source>` según los formatos de video compatibles.
*  Agrega texto de referencia para que las personas descarguen el video si no pueden reproducirlo en la ventana.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html){: target="_blank" .external }

#### Crea la sección de imágenes

Los sitios sin imágenes pueden ser un poco aburridos. Hay dos tipos de imágenes:

*  Imágenes de contenido: imágenes alineadas en el documento que se usan
   para proporcionar información adicional sobre el contenido.
*  Imágenes estilísticas: imágenes que se usan para mejorar la apariencia del
   sitio; generalmente son imágenes de fondo, patrones y gradientes.  Cubriremos
   esto en la [siguiente sección](#make-it-responsive).

La sección de imágenes de nuestra página es una colección de imágenes de contenido.

Las imágenes de contenido son fundamentales para transmitir el sentido de la página. Piensa en
ellas como las imágenes que se usan en los artículos periodísticos.  Las imágenes que usamos son
imágenes de los tutores del proyecto:  Chris Wilson, Peter Lubbers y Sean
Bennet.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addimages.html){: target="_blank" .external }

Las imágenes están configuradas para que puedan agrandarse hasta ocupar el 100% del ancho de la pantalla. Esto funciona
bien en dispositivos con una ventana de visualización estrecha, aunque no tan bien en los que tienen una
ventana de visualización ancha (como una computadora de escritorio).  Abordaremos esto en la sección de
diseño adaptable.

Muchas personas no pueden ver imágenes y, a menudo, usan una tecnología
de asistencia, como un lector de pantalla que analizará los datos de la página y se los
transmitirá al usuario verbalmente.  Debes asegurarte de que todas tus imágenes de
contenido tengan una etiqueta descriptiva `alt` que el lector de pantalla pueda reproducir
para el usuario.

Al agregar etiquetas `alt`, asegúrate de que el texto alt sea lo más conciso
posible para describir la imagen por completo.  Por ejemplo, en nuestra demostración, simplemente
aplicamos formato al atributo para que sea “Name: Role”; esto presenta suficiente información
al usuario para que comprenda que esta sección es sobre los autores y
su trabajo.

#### Agrega la sección de datos tabulados

La última sección es una tabla sencilla que se usa para mostrar las estadísticas específicas
para un producto.

Las tablas solo deben usarse para datos tabulares; es decir, matrices de información.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addtable.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addtable.html){: target="_blank" .external }

#### Agrega un pie de página

La mayoría de los sitios necesitan un pie de página para mostrar contenido como Términos y condiciones,
exenciones de responsabilidad y otro contenido que no se haya previsto para el área de navegación principal
o el área de contenido principal de la página.

En nuestro sitio, solo crearemos un pie de página con un marcador de posición sencillo.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/addcontent.html){: target="_blank" .external }

### Resumen

Creamos el boceto del sitio e identificado todos los elementos
estructurales más importantes.  También nos aseguramos de tener preparado todo el contenido
correspondiente para satisfacer nuestras necesidades comerciales.

<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="Contenido">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html">Contenido y estructura</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="Sitio diseñado" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html">Sitio final</a>
    </figcaption>
  </figure>
</div>

Notarás que el aspecto de la página es muy malo en este momento; esto es intencional.
El contenido es el aspecto más importante de cualquier sitio, y necesitábamos asegurarnos de tener
una arquitectura y densidad de información buenas y sólidas. Esta guía nos proporcionó una
excelente base sobre la que seguiremos aprendiendo. En la próxima guía, aplicaremos estilo a nuestro contenido.



## Que sea adaptable {: #make-it-responsive }

Se puede acceder a la web desde una gran variedad de dispositivos, desde teléfonos de pantalla pequeña
hasta televisiones de pantalla enorme. Cada dispositivo presenta sus propios
beneficios y restricciones únicos. Como programador web, se espera que
soportes todas las variedades de dispositivos.


Estamos compilando un sitio que funcione en diferentes pantallas y tipos de
dispositivos. Hemos creado la arquitectura de la información de la página y creado una 
estructura básica. En esta sección, tomaremos nuestra estructura básica con
contenido y la convertiremos en una hermosa página que sea receptiva en una gran 
cantidad de tamaños de pantalla.

Siguiendo los principios de desarrollo web con prioridad en los dispositivos móviles, comenzamos con una 
ventana de visualización estrecha &mdash; similar a la de un teléfono móvil &mdash; y desarrollaremos 
primero para ese tipo de experiencia. Luego ascendemos a clases de dispositivos más grandes. Podemos hacerlo
generando una ventana de visualización más ancha y tomando una decisión sobre si el
diseño luce bien.

Anteriormente, creamos un par de diseños diferentes de alto nivel para establecer cómo se debe
mostrar nuestro contenido. Ahora necesitamos adaptar nuestra página a esos diferentes diseños.
Para esto, debemos decidir dónde ubicar los puntos de interrupción (un punto
donde el diseño y los estilos cambian) en función de cómo se adapta el contenido al
tamaño de la pantalla.

### TL;DR {: .hide-from-toc }
- Usa siempre una ventana de visualización.
- Comienza siempre con una ventana de visualización estrecha y luego agrándala.
- Basa tus puntos de interrupción cuando necesites adaptar contenido.
- Crea una vista de alto nivel de tu diseño en los principales puntos de interrupción.


### Agregar una ventana de visualización

Incluso para una página básica, siempre **tienes** que incluir la metaetiqueta de una ventana de visualización.
La ventana de visualización es el componente más crítico que necesitas para compilar experiencias
multidispositivo. Sin ella, tu sitio no funcionará bien en un dispositivo móvil.

La ventana de visualización indica al navegador que se debe modificar el tamaño de la página para que quepa
en la pantalla. Existen muchas configuraciones diferentes que puedes especificar para
tu ventana de visualización a fin de controlar la visualización de la página.  Como opción predeterminada, te recomendamos la siguiente:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/viewport.html){: target="_blank" .external }

La ventana de visualización se encuentra en el encabezado del documento y solo se debe declarar una vez.

### Aplica un estilo sencillo

Nuestro producto y nuestra empresa ya tienen pautas de marca y fuente que se proporcionan
en una guía de estilo.

#### Guía de estilo

Una guía de estilo es una manera útil de comprender en detalle la representación visual
de la página y te ayuda a asegurarte de mantener la uniformidad en todo el diseño.

#### Colores

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Agrega imágenes estilísticas

<img  src="images/narrowsite.png" alt="Sitio diseñado"  class="attempt-right" />

En la guía anterior, agregamos imágenes llamadas “imágenes de contenido”.  Estas eran
imágenes importantes para la narrativa de nuestro producto.  Las imágenes estilísticas
son imágenes que no se necesitan como parte del contenido principal, pero agregan un toque visual
o ayudan a atraer la atención del usuario hacia un elemento de contenido específico.

Un buen ejemplo de esto es una imagen de título para el contenido de la “mitad superior de la página”.  Generalmente,
se usa para incentivar al usuario a leer más acerca del producto.

Incluirlas puede ser muy sencillo. En nuestro caso, será el fondo del
encabezado y lo aplicaremos mediante CSS sencilla.

<div style="clear:both;"></div>

    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Escogimos una imagen de fondo simple que se ve borrosa de modo que no se quite
del contenido, y la configuramos para que `cover` todo el elemento; de ese modo, cuando
se estira mantiene la relación de aspecto correcta.


### Configura el primer punto de interrupción

El diseño comienza a verse mal a los 600 píxeles de ancho aproximadamente.  En nuestro caso, la extensión de
la línea supera las 10 palabras (extensión de lectura óptima), y ahí
es donde deseamos cambiarla.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Lo sentimos, tu navegador no admite video.
     <a href="videos/firstbreakpoint.mov">Descargar el video</a>.
  </p>
</video>

600 px parece ser un buen lugar para crear nuestro primer punto de interrupción, ya que 
nos brindará alcance para volver a ubicar los elementos para que entren mejor en la pantalla.
Podemos hacerlo usando una tecnología llamada [Consultas de medios](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries).

    @media (min-width: 600px) {
    
    }
    
Una pantalla más grande ofrece más espacio; por lo tanto, existe más flexibilidad con respecto a cómo
puede mostrarse el contenido.

Note: No necesitas mover todos los elementos a la vez; puedes realizar ajustes más pequeños, si fuera necesario.

En el contexto de la página para nuestro producto, al parecer deberemos hacer
lo siguiente:

*  restringir el ancho máximo del diseño;
*  modificar el relleno de los elementos y reducir el tamaño del texto;
*  mover el formulario para que flote en línea con el contenido del encabezado;
*  hacer que el video flote alrededor del contenido;
*  reducir el tamaño de las imágenes y hacer que aparezcan en una cuadrícula más atractiva.


### Restringir el ancho máximo del diseño

Decidimos tener solo dos diseños principales: una ventana de visualización estrecha y una
ancha, lo cual simplifica notablemente nuestro proceso de compilación.

También decidimos crear secciones sin borde en la ventana de visualización estrecha que
continuarán sin bordes en la ventana de visualización ancha.  Esto significa que debemos limitar el
ancho máximo de la pantalla de modo que el texto y los párrafos no se extiendan en una
sola línea larga en las pantallas ultraanchas.  Decidimos que este punto será de
aproximadamente 800 píxeles.

Para lograr esto, debemos limitar el ancho y centrar los elementos.  Debemos
crear un contenedor alrededor de cada sección principal y aplicar un `margin:
auto`.  Esto permitirá que se agrande la pantalla, pero el contenido se mantendrá centrado
y en un tamaño máximo de 800 píxeles.

El contenedor será un `div` simple con la siguiente forma:

    <div class="container">...</div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="containerhtml" adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/constrainwidth.html" region_tag="container" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/constrainwidth.html){: target="_blank" .external }

### Modificar el relleno y reducir el tamaño del texto

En la ventana de visualización estrecha, no tenemos mucho espacio para mostrar contenido, por lo que
el tamaño y el peso de la tipografía a menudo se reducen drásticamente para ajustarse a la
pantalla.

Con una ventana de visualización más grande, debemos tener en cuenta que es más probable que el usuario use
una pantalla más grande a mayor distancia.  Para facilitar la lectura del
contenido, podemos aumentar el tamaño y el volumen de la tipografía, y también podemos
modificar el relleno para lograr que se destaquen más determinadas áreas.

En nuestra página de productos, aumentaremos el relleno de los elementos de la sección
configurándola para que conserve un 5% del ancho.  También aumentaremos el tamaño de
los encabezados para cada una de las secciones.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/alterpadding.html" region_tag="padding" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/alterpadding.html){: target="_blank" .external }

### Adaptar elementos a la ventana de visualización ancha

Nuestra ventana de visualización estrecha era una visualización lineal apilada.  Cada sección principal y el contenido
dentro de ellas se exhibían en orden de arriba abajo.

Una ventana de visualización ancha nos da más espacio destinado a mostrar el contenido de forma óptima
para esa pantalla.  Para nuestra página de productos, esto significa que de acuerdo con nuestra AI podemos:

*  mover el formulario alrededor de la información del encabezado;
*  ubicar el video a la derecha de los puntos claves;
*  disponer las imágenes en mosaico;
*  expandir la tabla.

#### Hacer flotar el elemento de formulario

La ventana de visualización estrecha implica que contamos con mucho menos espacio horizontal disponible para
ubicar elementos en la pantalla de forma cómoda.

Para usar el espacio horizontal de la pantalla de forma más eficaz, debemos separar el
flujo lineal del encabezado y mover el formulario y la lista de modo que
queden a la par.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floattheform.html" region_tag="formfloat" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floattheform.html){: target="_blank" .external }

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Lo sentimos, tu navegador no admite video.
     <a href="videos/floatingform.mov">Descargar el video</a>.
  </p>
</video>

#### Hacer flotar el elemento de video

El video de la interfaz de la ventana de visualización estrecha está diseñado para ocupar el ancho total de
la pantalla y ubicarlo después de la lista de funciones claves. En una ventana de visualización ancha,
el video se agrandará demasiado y no se verá bien cuando se disponga junto
a nuestra lista de funciones.

El elemento de video debe desplazarse del flujo vertical de la ventana de visualización
estrecha y mostrarse junto a la lista de viñetas de contenido en una ventana de visualización ancha.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/floatthevideo.html" region_tag="floatvideo" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/floatthevideo.html){: target="_blank" .external }

#### Disponer las imágenes en mosaico

<img src="images/imageswide.png" class="attempt-right">

Las imágenes de la interfaz de la ventana de visualización estrecha (mayormente en dispositivos móviles) están configuradas
para ocupar el ancho total de la pantalla y se apilan verticalmente.  Esto no se ajusta bien a escala
en una ventana de visualización ancha.

Para lograr que las imágenes se vean correctamente en una ventana de visualización ancha, se ajustan al 30%
del ancho del contenedor y se exhiben horizontalmente (en lugar de verticalmente
en la vista estrecha). También agregaremos radio de borde y sombra de cuadro para que
las imágenes se vean más atractivas.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/tiletheimages.html" region_tag="tileimages" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/tiletheimages.html){: target="_blank" .external }

#### Hacer que las imágenes sean sensibles a los PPP

Cuando uses imágenes, ten en cuenta el tamaño de la ventana de visualización y la densidad de la
pantalla.

La Web fue creada para pantallas de 96 ppp.  Con la introducción de los dispositivos móviles,
observamos un aumento enorme en la densidad de píxeles de las pantallas, por no mencionar las
pantallas de clase Retina de las laptops.  Las imágenes codificadas para 96 ppp
generalmente tienen un muy mal aspecto en dispositivos con valores altos de ppp.

Tenemos una solución que aún no se ha adoptado ampliamente. En navegadores que la
soportan, puedes mostrar una imagen de alta densidad en una pantalla de alta densidad.


    <img src="photo.png" srcset="photo@2x.png 2x">
    

#### Tablas

Es muy difícil reproducir tablas correctamente en dispositivos con ventana de visualización estrecha, por lo que se les debe dar
consideración especial.

Te recomendamos que en una ventana de visualización estrecha transformes tu tabla convirtiendo
cada fila en un bloque de pares de clave/valor (donde la clave sea lo que era
anteriormente el encabezado de la columna y el valor aún sea el valor de la celda).
Por suerte, no es tan difícil. Primero, anota cada elemento `td` con
el encabezado correspondiente como un atributo de datos. (Esto no podrá
visualizarse hasta que agregues más CSS).

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/updatingtablehtml.html" region_tag="table-tbody" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/updatingtablehtml.html){: target="_blank" .external }

Ahora solo necesitamos agregar la CSS para ocultar el `thead` original y, en su lugar, mostrar
las etiquetas `data-th` usando un seudoelemento `:before`. Como resultado, se obtendrá la
experiencia para diferentes dispositivos que verás en el siguiente video.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Lo sentimos, tu navegador no admite video.
     <a href="videos/responsivetable.mov">Descargar el video</a>.
  </p>
</video>

En nuestro sitio, tuvimos que crear un punto de interrupción adicional solo para el contenido de la tabla.
Cuando compilas primero para un dispositivo móvil, es más difícil deshacer los estilos aplicados,
así que tenemos que separar el CSS de la tabla de la ventana de visualización estrecha del css de la ventana de visualización ancha.
Esto nos brinda una clara y consistente interrupción.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html){: target="_blank" .external }

## Resumen

Success: Para cuando leas esto, habrás creado tu
primera página de destino de producto simple que funciona en una gran variedad de dispositivos,
factores de forma y tamaños de pantalla.

Si sigues estas pautas, empezarás con el pie derecho:

1.  Crea una AI básica y comprende tu contenido antes de codificar.
2.  Siempre establece una ventana de visualización.
3.  Crea tu experiencia base sobre un acercamiento que priorice los dispositivos móviles.
4.  Una vez que tengas tu experiencia móvil, aumenta el ancho de la pantalla hasta que no se vea bien y establece allí tu punto de interrupción.
5.  Continúa iterando.


{# wf_devsite_translation #}
