---
title: "Elección del mejor tipo de entrada"
description: "Para optimizar el ingreso de información, use el tipo de entrada adecuado. A los usuarios les encantan los sitios web en los que se muestran automáticamente teclados numéricos para ingresar los números telefónicos o en los que se anticipan automáticamente las respuestas de los campos a medida que se los completa. Busque la manera de eliminar las pulsaciones innecesarias en sus formularios."
updated_on: 2014-10-21
translation_priority: 0
key-takeaways:
  choose-best-input-type:
    - Elija el tipo de entrada más apropiado para sus datos a fin de simplificar la entrada.
    - Ofrezca sugerencias a medida que el usuario escribe mediante el elemento <code>datalist</code>.
notes:
  use-placeholders:
    - "Los marcadores de posición desaparecen tan pronto como el enfoque se centra en un elemento, por lo que no reemplazan a las etiquetas.  Se deben utilizar como ayuda para guiar a los usuarios sobre el formato y el contenido requeridos."
  recommend-input:
    - "La compleción automática solo funciona cuando el método del formulario es la publicación."
  use-datalist:
    - "Los valores de <code>datalist</code> se proporcionan como sugerencias, y los usuarios no están limitados a las sugerencias ofrecidas."
  provide-real-time-validation:
    - "Incluso si se posee la validación de entrada de parte del cliente, siempre es importante validar los datos en el servidor para garantizar la coherencia y la seguridad de sus datos."
  show-all-errors:
    - "Debe mostrarle al usuario todos los campos del formulario de una sola vez, en lugar de mostrárselos uno por uno."
  request-auto-complete-flow:
    - "Si solicita algún tipo de información personal o datos de tarjetas de crédito, asegúrese de que el servicio de la página se ofrezca a través de SSL.  De lo contrario, en el cuadro de diálogo se le advertirá al usuario que su información puede no estar segura."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple14
  - g.co/mobilesiteprinciple15
---

<p class="intro">
  Para optimizar el ingreso de información, use el tipo de entrada adecuado. A los usuarios les encantan los sitios web en los que se muestran automáticamente teclados numéricos para ingresar los números telefónicos o en los que se anticipan automáticamente las respuestas de los campos a medida que se los completa. Busque la manera de eliminar las pulsaciones innecesarias en sus formularios.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.choose-best-input-type %}

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

{% include_code src=_code/order.html snippet=datalist %}

{% include shared/remember.liquid title="Remember" list=page.notes.use-datalist %}


