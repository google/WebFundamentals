---
title: "Conversión de las URL dentro del sitio en relativas"
description: "Ahora que su sitio se ofrece tanto en HTTP como en HTTPS, debe funcionar de la forma más eficiente posible, independientemente del protocolo."
updated_on: 2015-03-27
translation_priority: 0
key-takeaways:
  - "Asegúrese de que las URL dentro del sitio y las URL externas sean independientes del protocolo; es decir, asegúrese de utilizar rutas relativas o de omitir el protocolo como //example.com/something.js"
---

<p class="intro">
  Ahora que su sitio se ofrece tanto en HTTP como en HTTPS, debe funcionar de la forma más eficiente posible, independientemente del protocolo.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

Sin embargo, el problema surge cuando muestra una página 
que incluye recursos de HTTP a través de HTTPS: [contenido
mixto](http://www.w3.org/TR/mixed-content/), en cuyo caso los navegadores le advertirán al usuario que se perdió la fuerza total de
HTTPS.

De hecho, en el caso del contenido mixto activo (scripts, complementos, CSS [Hojas de estilo en cascada], IFrame),
a menudo, los navegadores simplemente no cargan ni ejecutan el contenido, lo que da como resultado una
página rota.

**NOTE:** Es perfectamente correcto incluir recursos de HTTPS en una página HTTP.

Lo que es más, cuando incluye vínculos a otras páginas en su sitio, los usuarios podrían
sufrir una degradación de HTTPS a HTTP.

Estos problemas se presentan cuando en sus páginas se incluyen URL dentro del sitio totalmente calificadas
, en las que se usa el esquema *http://*. El contenido como el que se muestra a continuación:

		<h1>Bienvenido a Example.com</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>Lea esta agradable <a href="http://example.com/2014/12/24/">publicación
		nueva sobre gatos.</a></p>
		<p>Visite este <a href="http://foo.com/">sitio
		genial.</a></p>

Se debe cambiar por lo siguiente:

		<h1>Bienvenido a Example.com</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Lea esta agradable <a href="//example.com/2014/12/24/">publicación
		nueva sobre gatos.</a></p>
		<p>Visite este <a href="http://foo.com/">sitio
		genial.</a></p>

O bien, por lo siguiente:

		<h1>Bienvenido a Example.com</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Lea esta agradable<a href="/2014/12/24/">publicación
		nueva sobre gatos.</a></p>
		<p>Visite este <a href="http://foo.com/">sitio
		genial.</a></p>

Es decir, lograr que las URL dentro del sitio sean lo más relativas posibles, ya sean relativas de protocolo
(no poseen un protocolo, sino que comienzan con //example.com) o relativas de host (comienzan
solo con la ruta, como /jquery.js).

**NOTA:** Use un script para hacer esto; no lo haga de forma manual. Si el contenido de su sitio se encuentra en una
base de datos, deberá probar su script en una copia de desarrollo de su
base de datos. Si el contenido se encuentra en archivos simples, pruebe su script en una
copia de desarrollo de los archivos. Solo aplique los cambios a producción luego de que 
estos aprueben el QA (control de calidad), como siempre. Puede utilizar el [script de Bram van Damme
](https://github.com/bramus/mixed-content-scan), o algo similar, para
detectar contenido mixto en su sitio.

**NOTA:** Cuando realice vinculaciones a otros sitios (que es diferente de incluir recursos de
otros sitios), no cambie el protocolo, ya que no puede controlar el modo en el que operan esos
sitios.

**NOTA:** Le recomiendo utilizar URL relativas de protocolo para que la migración de sitios grandes se realice
sin problemas. Si no está seguro de si ya puede implementar HTTPS totalmente, el hecho de forzar
a su sitio para que utilice HTTPS para todos los subrecursos podría tener consecuencias negativas. Es posible que
durante algún tiempo el sitio HTTPS le resulte nuevo y raro, y el sitio HTTP, de todos modos,
debe funcionar tan bien como siempre. Con el paso del tiempo, completará la migración y podrá
utilizar HTTPS definitivamente (consulte las dos secciones siguientes).

Si su sitio depende de un script, una imagen u otros recursos ofrecidos por un tercero
, tales como CDN, jquery.com o algo similar, tiene dos opciones:

* Utilizar URL relativas de protocolo también para estos recursos. Si el tercero no
 ofrece HTTPS, pídale que lo haga. La mayoría ya lo ofrecen, incluido jquery.com.
* Ofrecer los recursos desde un servidor que pueda controlar y en el que se ofrezca tanto HTTP como
 HTTPS. De todos modos, esta sigue siendo una buena idea, ya que luego puede tener mejor control
 sobre la apariencia, el rendimiento y la seguridad de su sitio, y no tiene que
 confiar en un tercero (algo que siempre es mejor).

Tenga en cuenta también que deberá cambiar las URL dentro del sitio en sus
hojas de estilo, JavaScript, reglas de redirección, &lt;vínculos,&gt;  etiquetas y en las declaraciones del CSP (Proveedor de servicios de cifrado)
, no solo en las páginas HTML.

