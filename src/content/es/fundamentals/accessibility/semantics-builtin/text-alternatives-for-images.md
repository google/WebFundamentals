project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Uso del atributo alt para brindar alternativas de texto para imágenes


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Alternativas de texto para imágenes {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Las imágenes son un componente importante de la mayoría de las páginas web y son, por supuesto, un
punto conflictivo para los usuarios de baja visión. Tenemos que tener en cuenta el rol que tiene una
imagen en una página para descubrir qué tipo de alternativa de texto debería tener.
Observa esta imagen.

    <article>
      <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
      <img src="imgs/160204193356-01-cat-500.jpg">
    </article>

<article>
  <h2>Study shows 9 out of 10 cats quietly judging their owners as they sleep</h2>
  <img src="imgs/160204193356-01-cat-500.jpg">
</article>

En la página tenemos una foto de un gato, que ilustra un artículo sobre un comportamiento
prejuicioso muy conocido de los gatos. Un lector de pantalla anunciará esta imagen usando
su nombre literal, `"/160204193356-01-cat-500.jpg"`. Es preciso, pero para
nada útil.

Puedes usar el atributo de `alt` para brindarle una alternativa de texto útil a esta
imagen: por ejemplo, "Un gato mirando en forma amenazante al espacio".

    <img src="/160204193356-01-cat-500.jpg" alt="A cat staring menacingly off into space">

Entonces, el lector de pantalla puede anunciar una descripción concisa de la imagen (
que se ve en la barra VoiceOver negra) y el usuario puede elegir si avanzar al
artículo.

![una imagen con texto de alt mejorado](imgs/funioncat2.png)

Algunos comentarios sobre `alt`:

 - `alt` te permite especificar una simple cadena para usar en cualquier momento en que la imagen
   no esté disponible, como cuando la imagen no se carga o si accede a ella un robot
   web de rastreo, o la encuentra un lector de pantalla.
 - `alt` es distinto de `title` o cualquier tipo de subtítulo, en el sentido de que *solo* se usa
   si la imagen no está disponible.

Escribir texto de alt útil es como un arte. Para que una cadena sea una alternativa de texto
utilizable, tiene que transmitir el mismo concepto que la imagen, en el mismo
contexto.

Considera una imagen de logotipo con vínculo en el membrete de una página como las que se muestran arriba.
Podemos describir la imagen en forma bastante precisa como "El logotipo de Funion".

    <img class="logo" src="logo.jpg" alt="The Funion logo">

Puede resultar tentador dar una alternativa de texto más sencilla de "inicio" o "página
principal", pero eso es un perjuicio para los usuarios de baja visión y aquellos que ven.

Pero imagina a un usuario de lector de pantalla que quiere ubicar el logotipo del membrete en la
página. Brindarle un valor de alt de "inicio" crea una experiencia
más confusa. Y un usuario que ve enfrenta el mismo reto (descubrir
qué genera hacer clic en el logotipo del sitio) como usuario de lector de pantalla.

Por otro lado, no siempre es útil describir una imagen. Por ejemplo,
considera una imagen de una lupa dentro de un botón de búsqueda que tiene el texto
"Buscar". Si el texto estuviese allí, definitivamente, le darías a esa imagen un valor
de alt de "buscar". Pero, como tenemos el texto visible, el lector de pantalla
recoge y lee la palabra "buscar". De esta forma, un valor de `alt` idéntico en la
imagen es redundante.

Sin embargo, sabemos que si dejamos el texto de `alt` afuera, probablemente, escucharemos el
nombre del archivo de imagen, lo cual es inútil y puede resultar confuso. En
este caso, puedes usar un atributo `alt` vacío y el lector de pantalla
omitirá la imagen por completo.

    <img src="magnifying-glass.jpg" alt="">

En resumen, todas las imágenes deberían tener un atributo `alt`, pero no es necesario que todas
tengan texto. Las imágenes importantes deberían tener texto de alt descriptivo que describa
en forma concisa qué es una imagen, mientras que las imágenes decorativas deberían tener atributos
de alt vacíos, es decir, `alt=""`.


{# wf_devsite_translation #}
