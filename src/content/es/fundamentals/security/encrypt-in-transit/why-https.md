project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Siempre debes proteger todos tus sitios web con HTTPS, aunque en ellos no se controlan comunicaciones confidenciales. HTTPS proporciona seguridad crítica e integridad de datos para tus sitios web y las personas que confían a tus sitios web su información personal.

{# wf_updated_on: 2016-08-22 #}
{# wf_published_on: 2015-11-23 #}

# Por qué HTTPS es importante {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iP75a1Y9saY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Siempre debes proteger todos tus sitios web con HTTPS, aunque en ellos no se
controlen comunicaciones confidenciales. Además de proporcionar seguridad crítica e integridad
de datos para tus sitios web y para la información personal de tus usuarios, HTTPS es
un requisito para varias funciones del navegador nuevo, en especial las que se requieren para
[progressive web apps](/web/progressive-web-apps/).

### TL;DR {: .hide-from-toc }

* Los intrusos, ofensivos e inofensivos, explotan todos los recursos desprotegidos que circulan entre tus sitios web y los usuarios.
* Muchos intrusos observan comportamientos globales para identificar tus usuarios. 
* HTTPS no bloquea simplemente el uso incorrecto de tu sitio web. También es un requisito para varias funciones de última generación y una tecnología instrumental para capacidades similares a las de la app como procesos de trabajo. 

## HTTPS protege la integridad de tu sitio web 

HTTPS ayuda a evitar que intrusos interfieran en las comunicaciones 
entre tus sitios web y los navegadores de los usuarios. Por intrusos, nos referimos a 
atacantes con intenciones maliciosas y a empresas legítimas, pero entrometidas, 
como los ISP o los hoteles que disponen anuncios en páginas.

Los intrusos explotan las comunicaciones desprotegidas para engañar a los usuarios y lograr que 
proporcionen información confidencial o instalen software malicioso, o para colocar sus propios 
anuncios en tus recursos. Por ejemplo, algunas terceras partes insertan 
anuncios en sitios web que potencialmente tienen la capacidad de echar a perder la experiencia del usuario y 
crear vulnerabilidades de seguridad.

Los intrusos explotan todos los recursos desprotegidos que circulan entre 
tus sitios web y los usuarios. Imágenes, cookies, secuencias de comandos, HTML... todos se pueden 
explotar. Las intrusiones pueden producirse en cualquier punto de la red, como 
una máquina de un usuario, una hotspot Wi-Fi y un ISP comprometido, por nombrar algunos. 

## HTTPS protege la privacidad y seguridad de los usuarios

HTTPS evita que los intrusos puedan escuchar pasivamente las
comunicaciones entre tus sitios web y los usuarios.

Un concepto erróneo común sobre HTTPS es creer que los únicos sitios web 
que necesitan HTTPS son aquellos en los que se controlan comunicaciones delicadas. Toda 
solicitud desprotegida de HTTP puede revelar información sobre los 
comportamientos y las identidades de los usuarios. Si bien una visita a uno de 
tus sitios web desprotegidos podría parecer inofensiva, algunos intrusos observan 
el total de las actividades de navegación de los usuarios para deducir sus 
comportamientos e intenciones y para 
[eliminar la anonimidad](https://en.wikipedia.org/wiki/De-anonymization){: .external}
de sus identidades. Por ejemplo, es posible que 
empleados divulguen, sin darse cuenta, información confidencial sobre condiciones de salud a los 
empleadores con solo leer artículos médicos desprotegidos.

## HTTPS es el futuro de la web

Para la ejecución de nuevas y potentes funciones de las plataformas web, como la toma de fotografías o grabación de
audio con `getUserMedia()`, o la habilitación de experiencias de apps sin conexión con procesos de trabajo
de servicio, se requieren permisos explícitos de los
usuarios. Además, muchas otras API más antiguas se están actualizando para exigir permiso
de ejecución; por ejemplo, la
API de
[ubicación geográfica](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation){: .external}. HTTPS es un componente clave de los flujos de trabajo de permisos, tanto para estas
funciones nuevas como para las API actualizadas.








{# wf_devsite_translation #}
