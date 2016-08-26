project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Para optimizar el ingreso de información, use el tipo de entrada adecuado. A los usuarios les encantan los sitios web en los que se muestran automáticamente teclados numéricos para ingresar los números telefónicos o en los que se anticipan automáticamente las respuestas de los campos a medida que se los completa. Busque la manera de eliminar las pulsaciones innecesarias en sus formularios.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Elección del mejor tipo de entrada {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Para optimizar el ingreso de información, use el tipo de entrada adecuado. A los usuarios les encantan los sitios web en los que se muestran automáticamente teclados numéricos para ingresar los números telefónicos o en los que se anticipan automáticamente las respuestas de los campos a medida que se los completa. Busque la manera de eliminar las pulsaciones innecesarias en sus formularios.


## TL;DR {: .hide-from-toc }
- Elija el tipo de entrada más apropiado para sus datos a fin de simplificar la entrada.
- Ofrezca sugerencias a medida que el usuario escribe mediante el elemento <code>datalist</code>.


### Tipos de entrada HTML5

En HTML5, se introdujeron diferentes tipos de entradas nuevas. Mediante estos nuevos tipos de entrada, se le proporcionan sugerencias
al navegador sobre el tipo de diseño de teclado que se debe mostrar para los teclados
que se muestran en pantalla.  Para los usuarios, será más simple ingresar la información requerida sin tener que
cambiar el teclado y si solo ven las teclas adecuadas para ese tipo de
entrada.

<table class="table-2 inputtypes">
  <thead>
    <tr>
      <th data-th="Input type">Tipo de <code>entrada</code></th>
      <th data-th="Typical keyboard">Teclado típico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> Para ingresar una URL. Debe comenzar con un esquema URI (Identificador uniforme de recursos) válido;
 por ejemplo, <code>http://</code>, <code>ftp://</code> o <code>mailto:</code>.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>Para ingresar números telefónicos. Aquí <b>no</b>
        se exige el uso de una sintaxis en particular para la validación, por lo que, si desea garantizar el uso de
 un formato en especial, puede usar patrones.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>Para ingresar direcciones de correo electrónico y sugerencias de que
 el signo @ se debe mostrar en el teclado de forma predeterminada. Puede agregar el
 atributo múltiple si se proporcionará más de una dirección de correo electrónico.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>Un campo de ingreso de texto con un estilo que sea
 coherente con el campo de búsqueda de la plataforma.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>En el caso de las entradas numéricas, puede ser cualquier
 valor flotante o entero racional.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>Para entradas de números, pero a diferencia del tipo de entrada de número,
 el valor es menos importante. Se muestra al usuario como un
 control deslizante.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>Para ingresar un valor de fecha y hora,
 donde la zona horaria proporcionada es la local.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>Para ingresar una fecha (solamente), pero sin que se proporcione la zona
 horaria.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>Para ingresar una hora (solamente), pero sin que se proporcione la zona
 horaria.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>Para ingresar una semana (solamente), pero sin que se proporcione la zona
 horaria.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>Para ingresar un mes (solamente), pero sin que se proporcione la zona
 horaria.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>Para seleccionar un color.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

### Use datalist para ofrecer sugerencias durante la entrada

El elemento `datalist` no es un tipo de entrada, sino que es una lista de valores de entrada sugeridos
para asociar con un campo del formulario. De este modo, el navegador puede sugerir opciones de
compleción automática a medida que el usuario escribe. A diferencia de los elementos de selección en los que los usuarios deben desplazarse por largas
listas para encontrar el valor que buscan, y deben limitarse solo a esas
listas, el elemento`datalist` proporciona sugerencias a medida que el usuario escribe.

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="datalist" %}
</pre>

<!-- TODO: Verify note type! -->
Note: Los valores de <code>datalist</code> se proporcionan como sugerencias, y los usuarios no están limitados a las sugerencias ofrecidas.


