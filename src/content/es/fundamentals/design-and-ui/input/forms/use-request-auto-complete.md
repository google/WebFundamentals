project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aunque <code>requestAutocomplete</code> se diseñó para ayudar a los usuarios a completar cualquier formulario, actualmente, su uso más común es el comercio electrónico, donde el abandono de los carritos de compra en la web móvil <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>puede ser de hasta el 97 %</a>.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Simplificación de la finalización del pago con la API requestAutocomplete {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Aunque `requestAutocomplete` se diseñó para ayudar a los usuarios a completar cualquier formulario, actualmente, su uso más común es el comercio electrónico, donde el abandono de los carritos de compra en la web móvil <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>puede ser de hasta el 97 %</a>. Imagínese que el 97 % de las personas en un supermercado con el carrito lleno de artículos que desean voltearan el carrito y se fueran.


## TL;DR {: .hide-from-toc }
- <code>requestAutocomplete</code>puede simplificar en gran medida el proceso de finalización del pago y mejorar la experiencia del usuario.
- 'Si <code>requestAutocomplete</code> está disponible, oculte el formulario de finalización de pago y dirija a los usuarios directamente a la página de confirmación.'
- Asegúrese de que en los campos de entrada se incluya el atributo adecuado de compleción automática.


En lugar de que el sitio dependa de un proveedor de pagos en particular,
`requestAutocomplete` solicita los detalles de pago (como nombre, dirección e información de la
tarjeta de crédito) desde el navegador, el cual los almacenan opcionalmente
 de manera similar a otros campos de autocompleción.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ljYeHwGgzQk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

### Flujo de `requestAutocomplete`

En la experiencia ideal, se mostrará el cuadro de diálogo`requestAutocomplete` en lugar de cargar la
página en la que se muestra el formulario de finalización de pago. Si todo funciona correctamente, el usuario no debería ver
el formulario.  Puede agregar fácilmente `requestAutocomplete` a los formularios existentes
sin tener que cambiar los nombres de los campos.  Simplemente, agregue el atributo `autocomplete`
a cada elemento del formulario que posea el valor adecuado y agregue la función
`requestAutocomplete()` en el elemento del formulario. El navegador se encargará
del resto.

<img src="imgs/rac_flow.png" class="center" alt="Request autocomplete flow">

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="rac" lang=javascript %}
</pre>

La función `requestAutocomplete` que aparece en el elemento del `form` le indica al
navegador que debe completar el formulario.  Como característica de seguridad, la función
se debe activar a través de un gesto del usuario, como un toque o un clic con el mouse. Luego, se muestra un cuadro de diálogo
en el que se solicita el permiso del usuario para completar los campos y para saber qué detalles
desea incluir en el formulario.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/input/forms/_code/rac.html" region_tag="handlerac" lang=javascript %}
</pre>

Cuando `requestAutocomplete` finalice, la función ejecutará el evento
`autocomplete` si se completó de forma exitosa, o bien `autocompleteerror` si no
pudo completar el formulario.  Si se completó exitosamente y el formulario
valida sus necesidades, simplemente envíelo y pase a la confirmación
final.

<!-- TODO: Verify note type! -->
Note: Si solicita algún tipo de información personal o datos de tarjetas de crédito, asegúrese de que el servicio de la página se ofrezca a través de SSL.  De lo contrario, en el cuadro de diálogo se le advertirá al usuario que su información puede no estar segura.


