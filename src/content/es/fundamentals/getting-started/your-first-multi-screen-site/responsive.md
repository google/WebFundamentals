project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Se puede acceder a la Web desde una amplia gama de dispositivos, desde teléfonos de pantalla pequeña a televisores de grandes dimensiones. Obtén más información sobre cómo crear un sitio que funcione bien en todos estos dispositivos.

{# wf_review_required #}
{# wf_updated_on: 2014-04-22 #}
{# wf_published_on: 2000-01-01 #}

# Ser adaptable {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Se puede acceder a la Web desde una amplia gama de dispositivos, desde teléfonos de pantalla pequeña a televisiones de grandes dimensiones. Cada dispositivo presenta ciertas ventajas propias, pero también limitaciones. Como desarrollador web, el público espera que crees sitios compatibles con todas las gamas de dispositivos.


Vamos a crear un sitio que funciona en varios tamaños de pantalla y tipos de dispositivo. En el [artículo anterior]({{page.previousPage.relative_url}}), creamos la arquitectura de información de la página y creamos una estructura básica.
En esta guía, vamos a utilizar esa estructura básica con contenido y la vamos a convertir en una atractiva página que se adapte a un gran número de tamaños de pantalla.

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="Contenido">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html"> Contenido y estructura </a> </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption><a href="https://googlesamples.github.io/web-fundamentals/samples/../fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html"> Sitio finalizado </a> </figcaption>
  </figure>
</div>

Siguiendo los principios del desarrollo web Mobile First, vamos a empezar con una ventana gráfica estrecha (parecida a un dispositivo móvil) y vamos a desarrollar primero para esa experiencia.
Después ampliaremos el tamaño para dispositivos más grandes.
Para ello, ampliaremos el ancho de la ventana gráfica y decidimos si el diseño nos satisface.

Antes hemos creado un par de diseños diferentes de alto nivel que definen la visualización del contenido. Ahora tenemos que definir que la página se adapte a esos diferentes diseños.
La forma de definirlo es decidir dónde queremos colocar los puntos de interrupción (un punto en el que el diseño y el estilo cambian) en función del modo en el que el contenido se adapta al tamaño de pantalla.

## TL;DR {: .hide-from-toc }
- Utiliza siempre una ventana gráfica.
- Empieza siempre con una ventana gráfica estrecha y después aumenta el tamaño.
- Basa los puntos de interrupción en los momentos en los que es necesario adaptar el contenido.
- Crea una visión de nivel alto de tu diseño con los puntos de interrupción principales.


## Añadir una ventana gráfica

Aunque la página sea básica, siempre **tienes** que incluir una metaetiqueta de ventana gráfica.
La ventana gráfica es el componente más importante que necesitas para crear experiencias multidispositivo.
Sin ella, el sitio no funcionará bien en un dispositivo móvil.

La ventana gráfica indica al navegador que el tamaño de la página se tiene que adaptar a la pantalla.  Puede que haya muchas configuraciones diferentes que puedes especificar para que la ventana gráfica controle la visualización de la página.  De forma predeterminada, recomendamos esta configuración:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" %}
</pre>

La ventana gráfica reside en el encabezamiento del documento y solo se tiene que declarar una vez.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## Aplicar un estilo sencillo 

Nuestro producto y nuestra empresa ya tienen unas directrices de marca y de fuente muy específicas indicadas en una guía de estilo.

### Guía de estilo 

Una guía de estilo es una forma práctica de obtener una explicación de nivel alto de la representación visual de la página y, además, ayuda a garantizar la homogeneidad del diseño.

#### Color

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### Añadir imágenes estilísticas

En la guía anterior, hemos añadido imágenes llamadas `imágenes de contenido`.  Eran imágenes importantes para la narrativa de nuestro producto.  Las imágenes estilísticas son imágenes que no forman parte del contenido central pero que añaden un toque visual o ayudan a guiar la atención del usuario a una parte específica del contenido.

Un buen ejemplo sería una imagen de título para el contenido situado en la mitad superior de la página. A menudo se utiliza para atraer al usuario para que obtenga más información del producto.

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="Sitio diseñado">
</div>

Incluirlas puede ser muy sencillo. En nuestro caso, va a hacer de fondo del encabezado y la vamos a aplicar con un CSS sencillo.


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

Hemos elegido una imagen de fondo sencilla que está difuminada para que no interfiera con el contenido. Además, hemos establecido que ocupe todo el elemento, así se amplía sin modificar la relación de aspecto.

<br style="clear: both;">

## Establezca su primer punto de interrupción

El diseño empieza a perder calidad a los 600 px de ancho.  En nuestro caso, la longitud de la línea va a ser superior a diez palabras (la longitud de lectura óptima) y conviene cambiarla llegada esa cifra.

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>Lo sentimos, pero tu navegador no permite reproducir vídeo.
     <a href="videos/firstbreakpoint.mov">Descarga el vídeo</a>.
  </p>
</video>

Parece que los 600 px es un buen sitio para crear el primer punto de interrupción, ya que nos proporcionará el punto de mira para recolocar elementos y que así se ajusten mejor a la pantalla.  Para crearlo, podemos utilizar una tecnología llamada [consultas multimedia]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness).


    @media (min-width: 600px) {
    
    }
    

En las pantallas de mayor tamaño hay más espacio, así que también hay más flexibilidad en cuanto a la forma de mostrar contenido.

<!-- TODO: Verify note type! -->
Note: No tienes que mover todos los elementos a la vez, sino que, si es necesario, puedes hacer ajustes menores.

En el contexto de nuestra página de producto, parece necesario:

*  restringir el ancho máximo del diseño,
*  modificar el espaciado interno de elementos y disminuir el tamaño del texto,
*  mover el formulario para que esté alineado con el contenido de encabezado,
*  establecer que el vídeo flote alrededor del contenido,
*  reducir el tamaño de las imágenes y definir que aparezcan según una cuadrícula más atractiva.

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## Restringir el ancho máximo del diseño

Hemos decidido utilizar solo dos diseños principales: una ventana gráfica estrecha y una ventana gráfica ancha, de modo que nuestro proceso de creación se simplifica en gran medida.

También hemos decidido crear secciones de sangrado completo en la ventana gráfica estrecha que sigan siendo de sangrado completo en la ventana gráfica ancha.  Esto quiere decir que debemos restringir el ancho máximo de la pantalla para que el texto y los párrafos no se prolonguen en una sola línea larga en las pantallas de anchura extrema.  Hemos decidido que ese punto sean los 800 px aproximadamente.

Para lograrlo, tenemos que restringir el ancho y centrar los elementos.  Tenemos que crear un contenedor alrededor de cada sección principal y aplicar un atributo `margin: auto`. Así la pantalla podrá crecer pero el contenido seguirá centrado y a un tamaño máximo de 800 px.

El contenedor será un atributo `div` sencillo con la forma siguiente:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml" lang=html %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container" lang=css %}
</pre>

## Modificar el espaciado interno y reducir el tamaño de texto

En la ventana gráfica estrecha no tenemos mucho espacio para mostrar contenido, por lo que el tamaño y el peso de la tipografía se suelen reducir de forma drástica para que se ajusten a la pantalla.

Si la ventana gráfica es más ancha, tenemos que tener en cuenta que es más probable que el usuario se encuentre ante una pantalla más grande pero más alejado.  Para incrementar la facilidad de lectura del contenido, podemos aumentar el tamaño y el peso de la tipografía, además de modificar el espaciado interno para resaltar ciertas áreas.

En nuestra página de producto, para aumentar el espaciado interno de los elementos de la sección, estableceremos que el ancho del contenido siga estando a un 5%.  También aumentaremos el tamaño de los encabezados de cada sección.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

## Adaptar elementos a una ventana gráfica ancha

Nuestra ventana gráfica estrecha era una pantalla lineal apilada.  Cada sección importante y el contenido incluido se mostraban en orden de arriba abajo.

Las ventanas gráficas anchas nos proporcionan espacio adicional que podemos utilizar para mostrar el contenido de forma óptima para la pantalla en cuestión.  Para nuestra página de producto, esto quiere decir que, de acuerdo con nuestra arquitectura de información, podemos:

*  mover el formulario alrededor de la información del encabezado,
*  colocar el vídeo a la derecha de los puntos clave,
*  titular las imágenes,
*  ampliar la tabla.

### Hacer flotar el elemento de formulario

Al tener una ventana gráfica estrecha, tenemos disponible mucho menos espacio horizontal para colocar con comodidad los elementos de la pantalla.

Para utilizar el espacio horizontal de la pantalla de forma más eficiente, tenemos que romper el flujo lineal del encabezado y mover el formulario y la lista para que estén uno al lado del otro.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat" lang=css %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>Lo sentimos, pero tu navegador no permite reproducir vídeo.
     <a href="videos/floatingform.mov">Descarga el vídeo</a>.
  </p>
</video>

### Hacer flotar el elemento de vídeo

El vídeo de la interfaz de ventana gráfica estrecha está diseñado para que ocupe el ancho total de la pantalla y se sitúe después de la lista de funciones clave. En una ventana gráfica ancha, el vídeo se amplía demasiado y parece incorrecto cuando se sitúa junto a nuestra lista de funciones.

El elemento de vídeo se tiene que sacar del flujo vertical de la ventana gráfica estrecha y se tiene que mostrar en paralelo a la lista con viñetas de contenido de una ventana gráfica ancha.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo" lang=css %}
</pre>

### Titular las imágenes

Las imágenes de la interfaz de ventana gráfica estrecha (sobre todo en dispositivos móviles) están configuradas para que ocupen el ancho total de la pantalla y se apilen en vertical.  Este diseño no se amplía bien en una ventana gráfica ancha.

Para que el aspecto de las imágenes sea correcto, se amplían un 30% del ancho del contenedor y se colocan en horizontal (en vez de en vertical en la ventana gráfica ancha). También vamos a añadir algunos radios de borde y sombra del cuadro para que las imágenes sean más atractivas.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages" lang=css %}
</pre>

### Definir que las imágenes se adapten a los puntos por pulgada

Si usas imágenes, ten en cuenta el tamaño de la ventana gráfica y la densidad de la pantalla.

La Web está creada para pantallas de 96 ppp.  Con la introducción de los dispositivos móviles, hemos visto cómo aumentaba en gran medida la densidad de píxeles de las pantallas, por no hablar las pantallas de clase Retina de los portátiles.  Por eso, las imágenes codificadas para 96 ppp suelen mostrarse mal en los dispositivos con ppp alto.

Tenemos una solución que aún no se ha extendido.
En el caso de los navegadores compatibles, puedes mostrar una imagen de alta densidad en una pantalla de alta densidad,


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{% include shared/related_guides.liquid list=page.related-guides.images %}

### Tablas

Es muy difícil mostrar bien las tablas en los dispositivos que tienen una ventana gráfica estrecha y, por eso, necesitan una consideración especial.

Te recomendamos que, en una ventana gráfica estrecha, dividas la tabla en dos filas y pases el encabezado y las celdas a una fila para crear el columnado.

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>Lo sentimos, pero tu navegador no permite reproducir vídeo.
     <a href="videos/responsivetable.mov">Descarga el vídeo</a>.
  </p>
</video>

En nuestro sitio, hemos tenido que crear un punto de interrupción adicional para el contenido de la tabla.
Como al crear primero para un dispositivo móvil es más difícil deshacer los estilos aplicados, tenemos que seccionar el CSS de tablas de la ventana gráfica estrecha a partir del CSS de la ventana gráfica ancha.
Así obtenemos una interrupción clara y constante.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css" lang=css %}
</pre>

## Conclusión

**ENHORABUENA.** Para cuando leas esto, habrás creado tu primera página de destino sencilla para el producto que funcione en una amplia gama de dispositivos, factores de formulario y tamaños de pantalla.

Si sigues estas directrices, empezarás con buen pie:

1.  Crea una arquitectura de información básica y entiende el contenido antes de crear código.
2.  Configura siempre una ventana gráfica.
3.  Crea tu experiencia básica a partir del método de `dispositivo móvil primero`.
4.  Cuando ya tengas la experiencia para dispositivos móviles, incrementa el ancho de la pantalla hasta que no se vea bien y establece ahí el punto de interrupción.
5.  Repite los pasos.



