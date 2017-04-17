project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Cómo ocultar contenido de la tecnología asistencial


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Cómo ocultar y actualizar contenido {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

## aria-hidden

Otra técnica importante para afinar la experiencia de los usuarios de tecnología
asistencial involucra garantizar que solo las partes relevantes de la página queden
expuestas a la tecnología asistencial. Existen varias formas de garantizar que una sección
del DOM no quede expuesta a APIs de accesibilidad.

En primer lugar, lo que sea que quede explícitamente oculto del DOM tampoco se incluirá
en el árbol de accesibilidad. Entonces, todo lo que tenga estilo de CSS de atributo `visibility:
hidden` o `display: none` o utiliza el atributo HTML5 `hidden` también estará
oculto para los usuarios de tecnología asistencial.

Sin embargo, un elemento que no está representado visualmente ni explícitamente oculto sigue
estando incluido en el árbol de accesibilidad. Una técnica común es incluir
"texto solo para lector de pantalla" en un elemento que quede ubicado absolutamente fuera de la pantalla.


    .sr-only {
      position: absolute;
      left: -10000px;
      width: 1px;
      height: 1px;
      overflow: hidden;
    }
    

Además, como hemos visto, se le puede brindar texto solo para lector de pantalla a través de un atributo
`aria-label`, `aria-labelledby` o `aria-describedby` que haga referencia a un
elemento que esté de otra manera oculto.

Consulta este artículo de WebAIM sobre [Técnicas para ocultar
texto](http://webaim.org/techniques/css/invisiblecontent/#techniques){: .external }
para obtener más información sobre la creación de texto "solo para lector de pantalla".

Finalmente, ARIA brinda un mecanismo para excluir el contenido de la tecnología
asistencial que no quede visualmente oculto, usando el atributo `aria-hidden`.
La app de este atributo a un elemento lo elimina en forma efectiva *y también elimina a todos sus
descendientes* del árbol de accesibilidad. Las únicas excepciones son elementos
a los que se refiere a través de un atributo `aria-labelledby` o `aria-describedby`.

    <div class="deck">
      <div class="slide" aria-hidden="true">
        Sales Targets
      </div>
      <div class="slide">
        Quarterly Sales
      </div>
      <div class="slide" aria-hidden="true">
        Action Items
      </div>
    </div>

Por ejemplo, puedes usar `aria-hidden` si creas una IU modal que
bloquee el acceso a la página principal. En este caso, un usuario vidente puede ver una especie
de capa superior semitransparente que indique que la mayor parte de la página no se puede
usar por el momento, pero un usuario lector de pantalla puede seguir explorando las tras partes
de la página. En este caso, además de crear una captura de teclado [explicada
anteriormente](/web/fundamentals/accessibility/focus/using-tabindex#modals-and-keyboard-traps),
tienes que asegurarte de que las partes de la página que actualmente están fuera de alcance
también estén `aria-hidden`.

Ahora que comprendes las funciones básicas de ARIA, cómo funciona con la semántica de
HTML nativa y cómo se puede usar para realizar cambios importantes en el
árbol de accesibilidad, como también para modificar la semántica de un único elemento,
veamos cómo lo podemos usar para transmitir información con limitación temporal.

## aria-live

`aria-live` les permite a los programadores marcar una parte de la página como "live" en el sentido de que
las actualizaciones deberían comunicarse a los usuarios inmediatamente, sin importar la posición
en la página, en lugar de que se enteren solo si exploran esa parte de la página. Cuando
un elemento tiene un atributo `aria-live`, la parte de la página que lo contiene y
sus descendientes se llaman *región live*.

![ARIA live establece una región live](imgs/aria-live.jpg)

Por ejemplo, una región live debe ser un mensaje de estado que aparece como resultado de
una acción de usuario. Si el mensaje es lo suficientemente importante como para acaparar la atención de un
usuario vidente, es lo suficientemente importante como para dirigir hacia este mensaje la atención de un
usuario con tecnología asistencial a través de la configuración de su atributo `aria-live`. Compara este `div` común


    <div class="status">Your message has been sent.</div>
    

con su opuesto "live".


    <div class="status" aria-live="polite">Your message has been sent.</div>
    

`aria-live` tiene tres valores permisibles: `polite`, `assertive` y `off`.

 - `aria-live="polite"` le dice a la tecnología asistencial que alerte al usuario
   sobre este cambio cuando termina lo que esté haciendo. Es muy bueno usarlo
   si hay algo importante, pero no urgente, y sirve para casi todos los usos de
   `aria-live`.
 - `aria-live="assertive"` le dice a la tecnología asistencial que interrumpa lo que está
   haciendo y alerte al usuario sobre este cambio de inmediato. Esto es solo para
   actualizaciones importantes y urgentes, como un mensaje de estado como "Sucedió un
   error del servidor y tus cambios no se guardaron; actualiza la página", o
   actualizaciones de un campo de entrada como resultado directo de la acción de un usuario, como
   botones en un widget escalonado.
 - `aria-live="off"` le dice a la tecnología asistencial que suspenda temporalmente
   `aria-live` las interrupciones.

Existen algunos trucos para garantizar que tus regiones live funciones correctamente.

En primer lugar, tu región `aria-live` debería estar configurada en la carga de página inicial.
Esto no es una regla infalible, pero si tienes dificultades con una región
`aria-live`, este puede ser el problema.

En segundo lugar, distintos lectores de pantalla reaccionan de distintas formas a distintos tipos de
cambios. Por ejemplo, se puede disparar una alerta para algunos lectores de pantalla
alternando el estilo `hidden` de un elemento descendiente de verdadero a falso.

Otros atributos que trabajan con `aria-live` te ayudan a afinar lo que se le
comunica al usuario cuando cambia la región live.

`aria-atomic` indica si toda la región se debería considerar una
totalidad cuando se comunican actualizaciones. Por ejemplo, si un widget de fecha que consiste en un
día, mes y año tiene `aria-live=true` y `aria-atomic=true`, y el usuario
usa un control escalonado para modificar el valor del mes, todo el contenido
del widget de fecha se volverá a leer. El valor de `aria-atomic` puede ser `true`
o `false` (predeterminado).

`aria-relevant` indica qué tipos de cambios se le deberían presentar al usuario.
Existen algunas opciones que se pueden usar por separado o como lista token.

 - *additions* significa que cualquier elemento que se le agrega a la región live es
   importante. Por ejemplo, anexar un tramo a un registro existente de mensajes de
   estado significaría que el tramo se le anunciaría al usuario (asumiendo
   que `aria-atomic` fuese `false`).
 - *text* significa que el contenido de texto que se agrega a cualquier nodo descendiente es
   relevante. Por ejemplo, la modificación de la propiedad `textContent` de un campo de texto personalizado
   le leería el texto modificado al usuario.
 - *removals* significa que la eliminación de texto o nodos descendientes se debería
   transmitir al usuario.
 - *all* significa que todos los cambios son relevantes. Sin embardo, el valor predeterminado de
   `aria-relevant` es `additions text`, lo cual significa que si no especificas
   `aria-relevant` actualizará al usuario en caso de cualquier agregado al elemento,
   que es lo que probablemente desees.

Finalmente, `aria-busy` te permite notificar a la tecnología asistencial de que debe
ignorar temporalmente los cambios a un elemento, como cuando se están realizando cargas. Una vez que
todo está en su lugar, `aria-busy` debe estar configurado como false para normalizar la
operación del lector.
 


{# wf_devsite_translation #}
