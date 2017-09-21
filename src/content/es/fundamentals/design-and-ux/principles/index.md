project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Google y AnswerLab se sometieron a un estudio que evaluó cómo los usuarios interactúan con un diverso conjunto de sitios móviles. El objetivo fue responder la pregunta "¿Qué hace que un sitio móvil sea bueno?"

{# wf_published_on: 2014-08-08 #}
{# wf_updated_on: 2017-07-12 #}

# ¿Qué hace que un sitio para dispositivo móvil sea bueno? {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Google y AnswerLab realizaron un [estudio de investigación](https://www.google.com/think/multiscreen/whitepaper-sitedesign.html?utm_source=web-fundamentals&utm_term=chrome&utm_content=ux-landing&utm_campaign=web-fundamentals) para responder esta pregunta. 

> Los usuarios de dispositivos móviles están orientados al objetivo. Esperan poder obtener lo que
> necesitan, inmediatamente, y bajo sus propias condiciones. 

El estudio se llevó a cabo durante sesiones de usabilidad en persona de 119 horas, con
participantes en los EE. UU. Se les pidió a los participantes que realicen tareas claves en un
conjunto diverso de sitios móviles. Se incluyeron usuarios de iOS y Android, y los usuarios
probaron los sitios en sus propios teléfonos. Para cada sitio, se les pidió a los participantes
que expresen sus pensamientos en voz alta mientras completaban tareas enfocadas en la conversión, como
hacer una compra o una reserva.

El estudio develó 25 principios de diseño de sitios móviles, agrupados en cinco
categorías.

## Navegación por el sitio y página principal

Success: Centra la página principal de tu dispositivo móvil en conectar a los usuarios con el contenido que están buscando.

### Mantén las llamadas en acción en el centro y frente

Pon a disponibilidad tareas secundarias [menús](/web/fundamentals/design-and-ux/responsive/)
o “debajo de la tapa” (la parte de la página web que no se ve sin desplazarse hacia abajo).

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-cta-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: hacer que las tareas más comunes de tus usuarios estén fácilmente disponibles.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-cta-bad.png">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: desperdiciar valioso espacio encima de la tapa con vagas llamadas de atención como “aprende más”.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Haz menús cortos y dulces

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-menus-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: hacer menús cortos y dulces.
     </figcaption>
  </figure>
</div>

Los usuarios de dispositivos móviles no tienen paciencia para desplazarse por una larga lista de opciones
para encontrar qué quieren. Reconoce tu menú para usar la menor cantidad de elementos posible,
sin sacrificar la usabilidad.

<div style="clear:both;"></div>

### Haz que volver a la página principal sea sencillo

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-hp-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: hacer que volver a la página principal sea sencillo.
     </figcaption>
  </figure>
</div>

Los usuarios esperan volver a la página principal cuando presionan el logo de la esquina superior izquierda
de una página móvil, y se frustran si no están disponible o no funciona.

<div style="clear:both;"></div>

### No permitas que las promociones se lleven el protagonismo

Los grandes insterticiales de instalación de app (p. ej., promociones que ocupan toda la página y ocultan el contenido
y llevan a los usuarios a instalar una app) les molestan a los usuarios y dificultan
realizar tareas. Aparte de los usuarios molestos, los sitios que usan intersticiales de instalación de app
no pasan la
[Prueba de compatibilidad con dispositivos móviles de Google](https://search.google.com/test/mobile-friendly),
lo que puede afectar negativamente los rankings de búsqueda.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/hpnav-promo-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Las promociones deberían ser fáciles de descartar y no deberían distraer de la experiencia.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/hpnav-promo-bad.png">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: Los intersticiales (a veces llamados "door slams") suelen molestarles a los usuarios y hacen que el uso del sitio sea una molestia.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

## Búsqueda en sitio

Success: Ayuda a los usuarios móviles a encontrar lo que buscan si deben hacerlo rápido.

### Haz que la búsqueda en sitio sea visible

Los usuarios que buscan información suelen inclinarse a la búsqueda, por eso el campo de búsqueda
debería ser una de las primeras cosas que vean en sus páginas. No ocultes el cuadro
de búsqueda en un menú.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-search-good.jpg">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Haz que la búsqueda sea visible
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-search-bad.jpg">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: Oculta la búsqueda en menús ampliados
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Asegúrate de que los resultados de búsqueda del sitio sean relevantes

Los usuarios no buscan en varias páginas de resultados hasta encontrar lo que
buscan. Simplifícales la vida a los usuarios completando dudas automáticamente, corrigiendo
errores de deletreo o sugiriendo dudas relacionadas. En lugar de reinventar la
rueda, piensa en productos sólidos como [Búsqueda personalizada de Google](https://cse.google.com/cse/){: .external }.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-relevant-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Macy's solo muestra artículos de niños.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-relevant-bad.png">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: mostrar resultados de nada que contenga la palabra "niño".
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


### Implementa filtros para resultados acotados

Los participantes del estudio confían en los [filtros](/custom-search/docs/structured_search)
para encontrar lo que buscan y abandonan los sitios que no tienen filtros
efectivos. Coloca los filtros encima de los resultados de la búsqueda y ayuda a los usuarios mostrando cuántos
resultados aparecerán cuando se aplique un filtro específico.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/ss-filters-good.jpg">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: hacer que sea sencillo aplicar filtros.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-filters-bad.jpg">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: ocultar la funcionalidad de los filtros.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### Guía a los usuarios a mejores resultados de la búsqueda del sitio

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/ss-guide-good.png" alt="Zappos guía a los usuarios preguntándoles qué buscan.">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Ayuda a los usuarios a encontrar lo que buscan guiándolos en la dirección correcta.
     </figcaption>
  </figure>
</div>

Para sitios con diversos segmentos de clientes, haz algunas preguntas antes de presentar
el cuadro de búsqueda y usa las respuestas del cliente como filtros de consulta de búsqueda para
asegurarte de que los usuarios obtengan los resultados del segmento más relevante.

<div style="clear:both;"></div>

## Comercio y conversión

Success: Comprende los viajes de tu cliente y permíteles a los usuarios convertir bajo sus propias condiciones. 

### Permíteles a los usuarios explorar antes de que se comprometan

Los participantes del estudio estaban frustrados por los sitios que requieren registro por adelantado
para poder verlo, especialmente cuando la marca no era conocida. A pesar de que la información
del cliente puede ser integral para tu empresa, pedirla demasiado pronto puede
resultar en menos registros.

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/cc-gates-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: permitirles a los usuarios explorar el sitio sin necesidad de que inicien sesión.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-gates-bad.png">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: colocar inicio de sesión o registro demasiado pronto en un sitio.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


### Permíteles a los usuarios hacer compras como invitados

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-purchase-guest-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: permitirles a los usuarios hacer compras con una cuenta de invitado.
     </figcaption>
  </figure>
</div>

A los participantes del estudio les resultaron "cómodos", "simples", "sencillos"
y "rápidos" los pagos de invitados. A los usuarios les molestan los sitios que los obligan a registrar una
cuenta para hacer una compra, especialmente cuando el beneficio de una cuenta no queda
claro.

<div style="clear:both;"></div>

### Usa información existente para maximizar la comodidad

Recuerda y
[completa por adelantado las preferencias](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly)
para los usuarios registrados. Ofrece servicios de finalización de compras conocidos y de terceros para los usuarios nuevos.

### Usa botones "clic para llamar" para tareas complejas

En dispositivos con capacidad de llamada, los
[vínculos "clic para llamada"](/web/fundamentals/native-hardware/click-to-call/) les permiten a los
usuarios hacer una llamada telefónica presionando un vínculo. En la mayoría de los dispositivos móviles, el
usuario recibe una confirmación antes de que se marque el número, o aparece un menú
que le pregunta al usuario cómo se debería manejar el número.

### Haz que sea sencillo finalizar en otro dispositivo

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/cc-other-device-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: brindar formas fáciles para que los usuarios continúen navegando o haciendo compras desde otro dispositivo.
     </figcaption>
  </figure>
</div>

A menudo, los usuarios desean finalizar tareas en otros dispositivos. Por ejemplo, los usuarios
pueden querer ver un artículo en una pantalla más grande. O pueden ocuparse y tener
que finalizar más tarde. Brinda soporte a estos viajes del cliente permitiéndoles a los usuarios
[compartir artículos en redes sociales](/web/fundamentals/discovery-and-monetization/social-discovery/)
o permitiéndoles a los usuarios enviarse vínculos a sí mismos por correo electrónico desde el sitio.

<div style="clear:both;"></div>

## Ingreso de formulario

Success: Proporciona una experiencia de conversión fluida y sin fricción con formas útiles.


### Optimiza el ingreso de información

Configura el avance automático a los campos que siguen cuando un usuario presione Entrar. En general,
mientras menos veces el usuario tenga que presionar la pantalla, mejor.

### Escoge la entrada más sencilla

Usa el [tipo de entrada más apropiado](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type)
para cada situación. Usa elementos como
[`datalist`](/web/fundamentals/design-and-ux/input/forms/choose-the-best-input-type#offer-suggestions-during-input-with-datalist)
para brindar valores sugeridos para un campo.

### Brinda un calendario visual para la selección de fecha

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-calendar-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: usar widgets de calendario cuando sea posible.
     </figcaption>
  </figure>
</div>

Etiqueta de modo claro las fechas de inicio y finalización. Los usuarios no tendrían que estar obligados a abandonar un sitio para
revisar una app de calendario tan solo para programar una fecha.

<div style="clear:both;"></div>

### Minimiza los errores de formulario con etiquetas y validación en tiempo real

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/forms-multipart-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: completar por adelantado el contenido cuando sea posible.
     </figcaption>
  </figure>
</div>

Etiqueta las entradas de forma apropiada y valídalas en tiempo real.

<div style="clear:both;"></div>

### Diseña formularios eficientes

Aprovecha la función [autocompletar](/web/fundamentals/design-and-ux/input/forms/#label-and-name-inputs-properly#use-metadata-to-enable-auto-complete)
para que los usuarios puedan completar fácilmente formularios con datos ingresados por adelantado. Completa por adelantado
campos con información que ya conoces. Por ejemplo, cuando recuperes las direcciones de envío
y facturación, intenta usar
[`requestAutocomplete`](/web/fundamentals/design-and-ux/input/forms/use-request-auto-complete)
o habilita a los usuarios para que copien su dirección de envío a su dirección de facturación (o viceversa). 

## Usabilidad y factor de formulario

Success: Complace a tus usuarios de dispositivos móviles con pequeños aspectos que mejoren sus experiencias.

### Optimiza todo tu sitio para apps móviles

Usa un [diseño adaptable](/web/fundamentals/design-and-ux/responsive/) que
cambie según el tamaño y las capacidades del dispositivo del usuario. A los participantes
del estudio les resultaron los sitios con una mezcla de páginas optimizadas para dispositivo móvil y de escritorio hasta
más difíciles de usar que los sitios que son solo de escritorio.

### No hagas que los usuarios tengan que acercar los dedos para aplicar zoom

Los usuarios se sienten cómodos al desplazarse por los sitios en sentido vertical y no horizontal.
Evita elementos grandes con un ancho fijo. Usa
[Consultas de medios de CSS](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)
para aplicar distintos estilos para distintas pantallas. No crees contenido que
solo se vea bien en un
[ancho de ventana de visualización](/web/fundamentals/design-and-ux/responsive/#set-the-viewport) en particular.
Los sitios que obligan a los usuarios a desplazarse en forma horizontal no aprueban la
[Prueba de compatibilidad con dispositivos móviles de Google](https://search.google.com/test/mobile-friendly),
lo cual puede impactar en forma negativa en sus rankings de búsqueda.

### Haz que las imágenes de producto sean expandibles

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-make-images-expandable-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Haz que las imágenes de los productos se puedan expandir y sean sencillas de ver en detalle.
     </figcaption>
  </figure>
</div>

Los clientes minoristas esperan que los sitios les permitan
[ver acercamientos en alta resolución](/web/fundamentals/design-and-ux/media/images#make-product-images-expandable)
de los productos. Los participantes del estudio se frustraron cuando no pudieron ver
qué estaban comprando.

<div style="clear:both;"></div>

### Dile a los usuarios qué orientación funciona mejor

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/us-orientation.jpg">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Dile al usuario qué orientación funciona mejor.
     </figcaption>
  </figure>
</div>

Los participantes del estudio tendieron a permanecer en la misma orientación de pantalla hasta que
algo les indicó que cambien de orientación. Diseña para modo horizontal y vertical,
o alienta a los usuarios a que pasen a la orientación óptima. Asegúrate de que tus
llamadas de atención importantes se puedan completar incluso si los usuarios ignoran las
sugerencias de cambio de orientación.

<div style="clear:both;"></div>

### Mantén a tu usuario en una ventana de navegador único

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-single-browser-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: Macy's mantiene a sus usuarios en su sitio brindándoles allí cupones.
     </figcaption>
  </figure>
</div>

A los usuarios les puede costar cambiar entre ventanas y puede suceder que no puedan encontrar
cómo volver al sitio. Evita las llamadas de atención que lanzan ventanas nuevas.
Identifica los viajes que pueden hacer que el usuario salga de tu sitio y
bríndale funciones para mantenerlo en tu sitio. Por ejemplo, si aceptas cupones,
ofrécelos directamente en el sitio, en lugar que hacer que los usuarios busquen otros
sitios para conocer detalles.

<div style="clear:both;"></div>

### Evita la etiqueta "sitio completo"

Cuando los participantes del estudio vieron la opción "sitio completo" (es decir, sitio de escritorio)
y "sitio móvil", creyeron que el sitio móvil carecería de contenido y eligieron
la versión "completa", llegando al sitio de escritorio.


### Sé claro acerca de por qué necesitas la ubicación de un usuario

Los usuarios siempre deben comprender por qué les pides su
[ubicación](/web/fundamentals/native-hardware/user-location/). Los participantes
del estudio que intentaron reservar un hotel en otra ciudad se sintieron confundidos cuando un
sitio de viajes detectó su ubicación y les ofreció hoteles en su ciudad
actual. Deja los campos de ubicación vacíos como configuración predeterminada y permíteles a los usuarios elegir para
mostrarles una clara llamada de atención como "Encontrar cerca de donde estoy".

<div class="attempt-left">
  <figure id="fig1">
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>LO QUE DEBES HACER</b>: siempre solicita acceso a una ubicación mediante un gesto del usuario.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>LO QUE NO DEBES HACER</b>: si la solicitas de inmediato en la página principal mientras se cargue el sitio, afectarás negativamente la experiencia del usuario.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


{# wf_devsite_translation #}
