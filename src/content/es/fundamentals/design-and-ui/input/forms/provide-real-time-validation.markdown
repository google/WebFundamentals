---
title: "Entrega de validación en tiempo real"
description: "La validación de datos en tiempo real no solo le permite mantener sus datos limpios, sino que también lo ayuda a mejorar la experiencia del usuario.  Los navegadores modernos poseen varias herramientas incorporadas que permiten realizar la validación de datos en tiempo real y que pueden evitar que el usuario envíe un formulario no válido.  Se deben utilizar indicaciones visuales para mostrar si un formulario se completó correctamente."
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  provide-real-time-validation:
    - "Aproveche los atributos de validación incorporados de los navegadores, como <code>pattern</code>, <code>required</code>, <code>min</code>, <code>max</code>, etc."
    - "Utilice JavaScript y la API de validación de restricciones para los requisitos de validación más complejos."
    - "Esto le permitirá mostrar los errores de validación en tiempo real y, si el usuario intenta enviar un formulario no válido, podrá mostrarle todos los campos que debe corregir."
notes:
  use-placeholders:
    - "Los marcadores de posición desaparecen tan pronto como el enfoque se centra en un elemento, por lo que no reemplazan a las etiquetas.  Se deben utilizar como ayuda para guiar a los usuarios sobre el formato y el contenido requeridos."
  recommend-input:
    - "La compleción automática solo funciona cuando el método del formulario es la publicación."
  use-datalist:
    - "Los valores de <code>datalist</code> se proporcionan como sugerencias, y los usuarios no están limitados a las sugerencias proporcionadas."
  provide-real-time-validation:
    - "Incluso si se posee la validación de entrada de parte del cliente, siempre es importante validar los datos en el servidor para garantizar la coherencia y la seguridad de sus datos."
  show-all-errors:
    - "Debe mostrarle al usuario todos los problemas del formulario de una sola vez, en lugar de mostrárselos uno por uno."
  request-auto-complete-flow:
    - "Si solicita algún tipo de información personal o datos de tarjetas de crédito, asegúrese de que el servicio de la página se ofrezca a través de SSL.  De lo contrario, en el cuadro de diálogo se le advertirá al usuario que su información puede no estar segura."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple17b
---

<p class="intro">
  La validación de datos en tiempo real no solo le permite mantener sus datos limpios, sino que también lo ayuda a mejorar la experiencia del usuario.  Los navegadores modernos poseen varias herramientas incorporadas que permiten realizar la validación de datos en tiempo real y que pueden evitar que el usuario envíe un formulario no válido.  Se deben utilizar indicaciones visuales para mostrar si un formulario se completó correctamente.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.provide-real-time-validation %}

### Uso de atributos para validar la entrada

#### El atributo `pattern`

En el atributo `pattern`, se especifica una [expresión
regular](http://en.wikipedia.org/wiki/Regular_expression) que se utiliza para validar un
campo de entrada. Por ejemplo, para validar un código postal de los EE. UU. (5 dígitos, a veces
seguidos por un guión y 4 dígitos adicionales), debemos configurar el atributo `pattern` de la siguiente
manera:

{% highlight html %}
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

##### Patrones de expresión regulares comunes

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Description">Descripción</th>
      <th data-th="Regular expression">Expresión regular</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">Dirección postal</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">Código postal (EE. UU.)</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Dirección IP (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Dirección IP (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Dirección IP (ambas)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Número de tarjeta de crédito</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Número del Seguro Social</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Número telefónico de América del Norte</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

#### El atributo `required`

Si el atributo `required` está presente, entonces el campo debe contener un valor antes
de que se pueda enviar el formulario. Por ejemplo, para crear el código postal requerido,
simplemente agregamos el atributo requerido:

{% highlight html %}
<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

#### Los atributos `min`, `max` y `step`

En el caso de los tipos de entradas numéricas, como números o rangos, así como también las entradas de fecha y hora, puede
especificar los valores mínimos y máximos, así como también la cantidad que se debe
aumentar o reducir cada valor cuando se ajusta mediante el control deslizante o el control de número.  Por ejemplo, una
entrada de números de calzados se configuraría con un tamaño mínimo de 1 y un tamaño máximo de 13, con un valor intermedio de
0,5

{% highlight html %}
<input type="number" min="1" max="13" step="0.5" ...>
{% endhighlight %}

#### El atributo `maxlength`

El atributo `maxlength` se puede utilizar para especificar la longitud máxima de una entrada o un
cuadro de texto, y resulta útil cuando desea limitar la longitud de la información que puede proporcionar
el usuario. Por ejemplo, si desea limitar el nombre de un archivo a 12 caracteres,
puede utilizar lo siguiente.

{% highlight html %}
<input type="text" id="83filename" maxlength="12" ...>
{% endhighlight %}

#### El atributo `minlength`

El atributo `minlength` se puede utilizar para especificar la longitud mínima de una entrada o un
cuadro de texto, y resulta útil cuando desea especificar la longitud mínima que debe proporcionar
el usuario. Por ejemplo, si desea especificar que el nombre de un archivo debe tener
8 caracteres como mínimo, puede utilizar lo siguiente.

{% highlight html %}
<input type="text" id="83filename" minlength="8" ...>
{% endhighlight %}

#### El atributo `novalidate`

En algunos casos, puede permitirle al usuario que presente el formulario, incluso si
contiene una entrada no válida. Para hacerlo, agregue el atributo `novalidate` al elemento del
formulario, o bien campos de entrada individuales. En este caso, a través de las seudoclases y
las API de JavaScript también podrá verificar si el formulario es válido.

{% highlight html %}
<form role="form" novalidate>
  <label for="inpEmail">Email address</label>
  <input type="email" ...>
</form>
{% endhighlight %}

{% include shared/remember.liquid title="Remember" list=page.notes.provide-real-time-validation %}

### Uso de JavaScript para validación más compleja en tiempo real

Cuando la validación incorporada y las expresiones regulares no son suficientes, puede utilizar la
 [API de validación de restricciones](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
una herramienta eficiente para ejecutar la validación personalizada.  La API le permite llevar a cabo acciones como
configurar un error personalizado, verificar si un elemento es válido y determinar el
motivo por el que un elemento no es válido:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="API">API</th>
      <th data-th="Description">Descripción</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">Configura un mensaje de validación personalizado y la propiedad <code>customError</code> del objeto <code>ValidityState</code> para <code>true</code>.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">Se proporciona una cadena con el motivo por el que la entrada no aprobó la prueba de validación.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">Se obtiene la respuesta <code>true</code> si el elemento cumple con todas sus restricciones y <code>false</code> si sucede lo contrario. La decisión sobre qué sucede en la página si en la verificación se obtiene la respuesta <code>false</code> depende del desarrollador.</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">Se obtiene la respuesta <code>true</code> si el elemento cumple con todas sus restricciones y <code>false</code> si sucede lo contrario. Cuando en la página se obtiene la respuesta <code>false</code>, los problemas de restricciones se informan al usuario.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">Se proporciona un objeto <code>ValidityState</code> que representa los estados de validación del elemento.</td>
    </tr>
  </tbody>
</table>

#### Configuración de mensajes de validación personalizados

Si un campo no aprueba la validación, utilice `setCustomValidity()` para marcar el campo como no válido
y explique por qué no realizó la validación.  Por ejemplo, en un formulario de registro se le puede
solicitar al usuario que confirme la dirección de correo electrónico al ingresarla dos veces.  Utilice el evento de desenfoque
en la segunda entrada para validar las dos entradas y configurar la respuesta
apropiada.  Por ejemplo:

{% include_code src=_code/order.html snippet=customvalidation lang=javascript %}

#### Evite el envío de formularios que no son válidos

Como no en todos los navegadores se evitará que el usuario envíe el formulario si se ingresaron
datos no válidos, debe filtrar el evento de envío y utilizar `checkValidity()`
en el elemento del formulario para determinar si el formulario es válido.  Por ejemplo:

{% include_code src=_code/order.html snippet=preventsubmission lang=javascript %}

### Muestra de comentarios en tiempo real

Resulta útil proporcionar una indicación visual en cada campo para mostrar si
el usuario completó el formulario correctamente antes de enviarlo.
En HTML5, también se introducen una serie de seudoclases que se pueden utilizar para darle estilo a las
entradas sobre la base de su valor o atributos.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Pseudo-class">Seudoclase</th>
      <th data-th="Use">Uso</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">Se configura, explícitamente, el estilo de una entrada para que se utilice cuando el valor cumpla con todos los requisitos de validación.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">Se configura, explícitamente, el estilo de una entrada para que se utilice cuando el valor no cumpla con todos los requisitos de validación.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">Se configura, explícitamente, el estilo del elemento de una entrada en la que se configuró el atributo.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">Se configura, explícitamente, el estilo de un elemento de entrada que no tiene configurado el atributo obligatorio establecido.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">Se configura, explícitamente, el estilo del elemento de una entrada numérica cuando el valor se encuentra dentro del rango.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">Se configura, explícitamente, el estilo del elemento de una entrada numérica cuando el valor se encuentra fuera del rango.</td>
    </tr>
  </tbody>
</table>

La validación se lleva a cabo inmediatamente, lo que significa que, cuando la página se carga, los campos
pueden estar marcados como no válidos, incluso si el usuario aún no tuvo la oportunidad de
completarlos.  Esto también significa que pueden estarlo mientras el usuario escribe, y es posible que vea
el estilo no válido mientras escribe. Para evitar esto, puede combinar la CSS (Hoja de estilos en cascada) con
JavaScript para mostrar solo los estilos no válidos cuando el usuario ya visitó el campo.

{% include_code src=_code/order.html snippet=invalidstyle lang=css %}
{% include_code src=_code/order.html snippet=initinputs lang=javascript %}

{% include shared/remember.liquid title="Important" list=page.notes.show-all-errors %}


