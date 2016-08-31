project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Se puede acceder a la Web desde una amplia gama de dispositivos, desde teléfonos de pantalla pequeña a televisores de pantalla gigante. Aprende a crear un sitio que funcione bien en todos los dispositivos.

{# wf_review_required #}
{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# Tu primer sitio multidispositivo {: .page-title }

{% include "_shared/contributors/paulkinlan.html" %}



Crear experiencias multipantalla es más fácil de lo que parece. En esta guía, aprenderemos a crear una página de destino de ejemplo para nuestro <a href='https://www.udacity.com/course/cs256'>curso `CS256: Desarrollo web para móviles`</a> que funcione bien en dispositivos de todo tipo.

<img src="images/finaloutput-2x.jpg" alt="varios dispositivos mostrando la versión final del proyecto">

Parece difícil, cuando no imposible, empezar a crear sitios para varios dispositivos con distintas capacidades, con tamaños de pantalla y métodos de interacción muy diferentes.

Crear sitios totalmente adaptables es más fácil de lo que parece. Para demostrártelo, empezaremos siguiendo los pasos de esta guía.  Los hemos dividido en dos pasos sencillos:

1.  Definir la arquitectura de información (normalmente denominada AI) y la estructura de la página, 
2.  Añadir los elementos de diseño necesarios para que la página sea adaptable y tenga buen aspecto.




## Crear el contenido y la estructura 




El contenido es lo más importante de cualquier sitio. Por eso, vamos a diseñar pensando en el contenido sin dejar que este dependa del diseño. En esta guía decidiremos en primer lugar el contenido que necesitamos, crearemos una estructura de página basada en este contenido y, a continuación, presentaremos la página en un diseño simple y lineal que funcione bien en ventanas gráficas estrechas y anchas.


### Crear la estructura de la página

Ya sabemos lo que necesitamos:

1.  Una sección que describa de forma general nuestro producto, el curso `CS256: Desarrollo web para móviles`
2.  Un formulario para recopilar información de los usuarios interesados en nuestro producto
3.  Una descripción y un vídeo en los que se explique el producto detalladamente
4.  Imágenes del producto en acción
5.  Una tabla de datos con información que refleje lo que ofrece el producto

### TL;DR {: .hide-from-toc }
- Piensa primero en el contenido que necesitas.
- Esboza la arquitectura de información (AI) para ventanas gráficas estrechas y anchas.
- Crea una versión básica de la página sin aplicar estilos al contenido.


Además, ya hemos pensando en una arquitectura de información y en un diseño generales tanto para las ventanas gráficas estrechas como para las anchas.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="AI para ventanas gráficas estrechas">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="AI para ventanas gráficas anchas">
</div>

Esta podría ser perfectamente la estructura básica de la página que usaremos durante el proyecto.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" %}
</pre>

### Añadir contenido a la página

Ya hemos acabado con la estructura básica del sitio. Ya sabemos qué secciones necesitamos, qué contenido se mostrará en estas secciones y en qué lugar de la arquitectura de información general colocarlo. Ha llegado el momento de crear el sitio.

<!-- TODO: Verify note type! -->
Note: Estilo vendrá después

#### Crear el título y el formulario

El título y el formulario de notificación de solicitudes son componentes esenciales de nuestra página. El usuario debería verlos de forma inmediata.

En el título, basta con añadir un texto que describa el curso:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" %}
</pre>

También debemos rellenar el formulario.
Se trata de un formulario simple que recopila los nombres de los usuarios, sus números de teléfono y la hora ideal para llamarlos.

Todos los formularios deberían contener etiquetas y marcadores de posición para facilitar que los usuarios se centren en determinados elementos, para que sepan lo que deben escribir en ellos y para que las herramientas de accesibilidad interpreten la estructura del formulario.  El atributo de nombre no solo envía el valor del formulario al servidor, sino que también se usa para dar indicaciones importantes al navegador sobre cómo rellenar automáticamente el formulario para el usuario.

Añadiremos tipos semánticos para que los usuarios puedan introducir contenido en un dispositivo móvil de forma rápida y sencilla.  Por ejemplo, al introducir un número de teléfono, el usuario debería ver un panel con números.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addform.html" region_tag="form" %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

#### Crear una sección con vídeos e información

La sección de contenido con vídeos e información debe contener más detalles.
Tendrá una lista de viñetas con las características de nuestros productos, además de un marcador de posición en formato de vídeo que muestre cómo se usa nuestro producto.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" %}
</pre>

Los vídeos suelen usarse para describir contenido de manera más interactiva y presentar un producto o un concepto.

Es posible integrar vídeo en tu sitio siguiendo las recomendaciones siguientes:

*  Añade un atributo `controls` para facilitar a los usuarios la reproducción del vídeo.
*  Añade una imagen `poster` para ofrecer una vista previa del contenido.
*  Añade varios elementos <source> basados en formatos de vídeo compatibles.
*  Añade texto de respaldo para que los usuarios puedan descargar el vídeo si no pudieran reproducirlo en la ventana.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addvideo.html" region_tag="video" lang=html %}
</pre>

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

#### Crear la sección de imágenes

Los sitios sin imágenes pueden resultar aburridos. Hay dos tipos de imágenes:

*  Imágenes de contenido: imágenes que se muestran junto al contenido del documento para presentar información adicional relacionada con el contenido.
*  Imágenes con fines estéticos: imágenes que se usan para mejorar el aspecto del sitio; suelen ser imágenes de fondo, patrones y gradientes.  Trataremos este tema en el [artículo siguiente]({{page.nextPage.relative_url}}).

La sección de imágenes de nuestra página es una colección de imágenes de contenido.

Estas imágenes son importantes para darle significado a la página; son como las imágenes de los artículos de un periódico. Las imágenes que usamos son imágenes de los tutores del proyecto: Chris Wilson, Peter Lubbers y Sean Bennet.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addimages.html" region_tag="images" lang=html %}
</pre>

Las imágenes están configuradas para ajustar su tamaño al 100% del ancho de la pantalla. Esto es ideal en dispositivos con una ventana gráfica estrecha, y no tanto en aquellos con ventana gráfica ancha (como un ordenador).  Veremos este tema en la sección de diseño adaptable.

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

Hay muchos usuarios que no pueden ver imágenes y usan tecnologías de apoyo como lectores de pantalla que procesan los datos de la página y leérselos al usuario.  Deberías asegurarte de que todas las imágenes de contenido tengan una etiqueta `alt` descriptiva para que el lector de pantalla pueda leer el texto de la etiqueta al usuario.

Cuando añadas etiquetas `alt`, procura que el texto describa la imagen de la forma más concisa y completa posible.  Por ejemplo, en nuestra demostración, solo damos el siguiente formato al atributo: `Nombre: Rol`. De este modo, incluimos suficiente información para dejar claro que esta sección incluye información sobre los autores y su trabajo.

#### Añadir la sección de datos tabulados

La última sección no es más que una tabla que refleja estadísticas específicas del producto.

Las tablas solo deben usarse para incluir datos tabulados, como matrices de información.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" %}
</pre>

#### Añadir un pie de página

En la mayoría de los sitios es necesario un pie de página para incluir los términos y condiciones del servicio, texto legal y otro contenido que no deba estar en el área de navegación principal ni en el área de contenido principal de la página.

En nuestro sitio, solo enlazaremos a los términos y condiciones, a una página de contacto y a nuestros perfiles en los medios sociales.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" %}
</pre>

### Resumen

Hemos creado un borrador del sitio y hemos identificado los elementos principales de su estructura.  Además, nos hemos asegurado de redactar todo el contenido relevante y de colocarlo en el lugar que más se adecúe a nuestros objetivos comerciales.

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="Contenido">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

Verás que la página ahora mismo tiene un aspecto horrible. Lo hemos hecho a propósito. 
El contenido es el aspecto más importante de cualquier sitio, y debíamos asegurarnos de contar con una arquitectura de información completa y abundante. Esta guía nos ha proporcionado los cimientos necesarios para crear nuestro sitio. Aplicaremos estilos a nuestro contenido en la siguiente guía.





## Ser adaptable 




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

### TL;DR {: .hide-from-toc }
- Utiliza siempre una ventana gráfica.
- Empieza siempre con una ventana gráfica estrecha y después aumenta el tamaño.
- Basa los puntos de interrupción en los momentos en los que es necesario adaptar el contenido.
- Crea una visión de nivel alto de tu diseño con los puntos de interrupción principales.


### Añadir una ventana gráfica

Aunque la página sea básica, siempre **tienes** que incluir una metaetiqueta de ventana gráfica.
La ventana gráfica es el componente más importante que necesitas para crear experiencias multidispositivo.
Sin ella, el sitio no funcionará bien en un dispositivo móvil.

La ventana gráfica indica al navegador que el tamaño de la página se tiene que adaptar a la pantalla.  Puede que haya muchas configuraciones diferentes que puedes especificar para que la ventana gráfica controle la visualización de la página.  De forma predeterminada, recomendamos esta configuración:

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" %}
</pre>

La ventana gráfica reside en el encabezamiento del documento y solo se tiene que declarar una vez.

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

### Aplicar un estilo sencillo 

Nuestro producto y nuestra empresa ya tienen unas directrices de marca y de fuente muy específicas indicadas en una guía de estilo.

#### Guía de estilo 

Una guía de estilo es una forma práctica de obtener una explicación de nivel alto de la representación visual de la página y, además, ayuda a garantizar la homogeneidad del diseño.

##### Color

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### Añadir imágenes estilísticas

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

### Establezca su primer punto de interrupción

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

### Restringir el ancho máximo del diseño

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

### Modificar el espaciado interno y reducir el tamaño de texto

En la ventana gráfica estrecha no tenemos mucho espacio para mostrar contenido, por lo que el tamaño y el peso de la tipografía se suelen reducir de forma drástica para que se ajusten a la pantalla.

Si la ventana gráfica es más ancha, tenemos que tener en cuenta que es más probable que el usuario se encuentre ante una pantalla más grande pero más alejado.  Para incrementar la facilidad de lectura del contenido, podemos aumentar el tamaño y el peso de la tipografía, además de modificar el espaciado interno para resaltar ciertas áreas.

En nuestra página de producto, para aumentar el espaciado interno de los elementos de la sección, estableceremos que el ancho del contenido siga estando a un 5%.  También aumentaremos el tamaño de los encabezados de cada sección.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding" lang=css %}
</pre>

### Adaptar elementos a una ventana gráfica ancha

Nuestra ventana gráfica estrecha era una pantalla lineal apilada.  Cada sección importante y el contenido incluido se mostraban en orden de arriba abajo.

Las ventanas gráficas anchas nos proporcionan espacio adicional que podemos utilizar para mostrar el contenido de forma óptima para la pantalla en cuestión.  Para nuestra página de producto, esto quiere decir que, de acuerdo con nuestra arquitectura de información, podemos:

*  mover el formulario alrededor de la información del encabezado,
*  colocar el vídeo a la derecha de los puntos clave,
*  titular las imágenes,
*  ampliar la tabla.

#### Hacer flotar el elemento de formulario

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

#### Hacer flotar el elemento de vídeo

El vídeo de la interfaz de ventana gráfica estrecha está diseñado para que ocupe el ancho total de la pantalla y se sitúe después de la lista de funciones clave. En una ventana gráfica ancha, el vídeo se amplía demasiado y parece incorrecto cuando se sitúa junto a nuestra lista de funciones.

El elemento de vídeo se tiene que sacar del flujo vertical de la ventana gráfica estrecha y se tiene que mostrar en paralelo a la lista con viñetas de contenido de una ventana gráfica ancha.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo" lang=css %}
</pre>

#### Titular las imágenes

Las imágenes de la interfaz de ventana gráfica estrecha (sobre todo en dispositivos móviles) están configuradas para que ocupen el ancho total de la pantalla y se apilen en vertical.  Este diseño no se amplía bien en una ventana gráfica ancha.

Para que el aspecto de las imágenes sea correcto, se amplían un 30% del ancho del contenedor y se colocan en horizontal (en vez de en vertical en la ventana gráfica ancha). También vamos a añadir algunos radios de borde y sombra del cuadro para que las imágenes sean más atractivas.

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/getting-started/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages" lang=css %}
</pre>

#### Definir que las imágenes se adapten a los puntos por pulgada

Si usas imágenes, ten en cuenta el tamaño de la ventana gráfica y la densidad de la pantalla.

La Web está creada para pantallas de 96 ppp.  Con la introducción de los dispositivos móviles, hemos visto cómo aumentaba en gran medida la densidad de píxeles de las pantallas, por no hablar las pantallas de clase Retina de los portátiles.  Por eso, las imágenes codificadas para 96 ppp suelen mostrarse mal en los dispositivos con ppp alto.

Tenemos una solución que aún no se ha extendido.
En el caso de los navegadores compatibles, puedes mostrar una imagen de alta densidad en una pantalla de alta densidad,


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{% include shared/related_guides.liquid list=page.related-guides.images %}

#### Tablas

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

### Conclusión

**ENHORABUENA.** Para cuando leas esto, habrás creado tu primera página de destino sencilla para el producto que funcione en una amplia gama de dispositivos, factores de formulario y tamaños de pantalla.

Si sigues estas directrices, empezarás con buen pie:

1.  Crea una arquitectura de información básica y entiende el contenido antes de crear código.
2.  Configura siempre una ventana gráfica.
3.  Crea tu experiencia básica a partir del método de `dispositivo móvil primero`.
4.  Cuando ya tengas la experiencia para dispositivos móviles, incrementa el ancho de la pantalla hasta que no se vea bien y establece ahí el punto de interrupción.
5.  Repite los pasos.



