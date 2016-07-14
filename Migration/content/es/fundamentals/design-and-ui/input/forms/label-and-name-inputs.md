---
title: "Etiquete y nombre las entradas correctamente"
description: "Es complicado completar formularios desde el celular. Los mejores formularios son aquellos que poseen menos entradas."
updated_on: 2015-03-27
translation_priority: 0
key-takeaways:
  label-and-name:
    - "Siempre utilice <code>label</code> en las entradas de los formularios y asegúrese de que sean visibles cuando el campo esté en foco."
    - "Utilice <code>placeholder</code> para proporcionar orientación sobre lo que espera."
    - "Con el fin de asistir al navegador en la compleción automática, utilice los atributos <code>name</code> establecidos para los elementos e incluya el atributo <code>autocomplete</code>."
notes:
  use-placeholders:
    - "Los marcadores de posición desaparecen tan pronto como el usuario comienza a escribir en un elemento, por lo que no reemplazan a las etiquetas.  Se deben utilizar como ayuda para guiar a los usuarios sobre el formato y el contenido requeridos."
  recommend-input:
    - "Utilice únicamente <code>street-address</code> o tanto <code>address-line1</code> como <code>address-line2</code>."
    - "<code>address-level1</code> y <code>address-level2</code> son solo necesarios si se deben utilizar en el formato de su dirección."
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
  - g.co/mobilesiteprinciple17a
---
<p class="intro">
  Es complicado completar formularios desde el celular. Los mejores formularios son aquellos que poseen menos entradas. En los buenos formularios, se proporcionan tipos de entradas semánticas. Las claves deben cambiar para que coincidan con los tipos de entradas de los usuarios; los usuarios eligen una fecha en un calendario. Mantenga a su usuario informado. En las herramientas de validación, se le debe informar al usuario lo que debe hacer antes de enviar el formulario.
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.label-and-name %}

### La importancia de las etiquetas

A través del elemento `label`, se le proporcionan instrucciones al usuario sobre la
información que se necesita en el elemento de un formulario.  Cada `label` se asocia con un
elemento de entrada al colocarla adentro del elemento `label` o al utilizar el atributo "`for`"
.  Si se aplican etiquetas a los elementos del formulario, también es posible mejorar el tamaño
del objetivo táctil: el usuario puede tocar tanto la etiqueta como la entrada para
enfocarse en el elemento de entrada.

{% include_code src=_code/order.html snippet=labels %}

### Colocación y ajuste del tamaño de las etiquetas

Las etiquetas y las entradas deben ser lo suficientemente grandes como para que se puedan presionar fácilmente.  En las ventanillas
verticales, las etiquetas de los campos se deben colocar sobre los elementos de entrada, y junto a ellos en las ventanillas
horizontales.  Asegúrese de que las etiquetas de los campos y los cuadros de entrada correspondientes estén visibles
al mismo tiempo.  Tenga precaución con los controladores de desplazamiento personalizados que podrían desplazar los elementos
de entrada hacia la parte superior de la página y ocultar la etiqueta, o las etiquetas que se colocan debajo de los elementos
de entrada que podrían estar cubiertas con el teclado virtual.

### Uso de marcadores de posición

A través del atributo de marcadores de posición se le proporcionan sugerencias al usuario sobre la información que debe introducir en
la entrada, generalmente, mostrando el valor como texto de color claro hasta que el usuario
comienza a escribir en el elemento.

<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

### Uso de metadatos para habilitar la compleción automática

A los usuarios les encanta que los sitios web les ahorren tiempo mediante la compleción automática de los campos
comunes, como nombres, direcciones de correo electrónico y otros campos frecuentes. Además, de este modo
, es posible reducir los posibles errores de entrada, especialmente en los teclados virtuales y
los dispositivos pequeños.

Los navegadores utilizan muchos algoritmos heurísticos para determinar los campos que se pueden
[completar automáticamente](https://support.google.com/chrome/answer/142893) [teniendo en cuenta
los datos especificados anteriormente por el
usuario](https://support.google.com/chrome/answer/142893), y usted puede proporcionarle sugerencias
al navegador al colocar el atributo name y el atributo
autocomplete en cada elemento de entrada.

Por ejemplo, para indicarle al navegador que debe completar automáticamente el formulario con
los nombres, las direcciones de correo electrónico y el número telefónico de los usuarios, debe utilizar lo siguiente:

{% include_code src=_code/order.html snippet=autocomplete %}


### Valores de los atributos `name` y `autocomplete` de entrada recomendados


Los valores del atributo `autocomplete` son una parte del [HTML estándar de WHATWG] actual(https://html.spec.whatwg.org/multipage/forms.html#autofill). A continuación, se muestran los atributos `autocomplete` utilizados más comúnmente.

Los atributos `autocomplete` pueden ir acompañados del nombre de una sección, como **`shipping `**`given-name` o **`billing `**`street-address`. En el navegador, las diferentes secciones se completarán automáticamente por separado, y no de forma continua.

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="Content type">Tipo de contenido</th>
      Atributo <th data-th="name attribute"><code>name</code></th>
      Atributo <th data-th="autocomplete attribute"><code>autocomplete</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">Nombre</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>fname</code>
        <code>mname</code>
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code> (nombre completo)</li>
          <li><code>given-name</code> (nombre)</li>
          <li><code>additional-name</code> (segundo nombre)</li>
          <li><code>family-name</code> (apellido)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Dirección de correo electrónico</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Dirección</td>
      <td data-th="name attribute">
        <code>address</code>
        <code>city</code>
        <code>region</code>
        <code>province</code>
        <code>state</code>
        <code>zip</code>
        <code>zip2</code>
        <code>postal</code>
        <code>country</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li>Para una entrada de una dirección:
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>Para entradas de dos direcciones:
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code> (estado o provincia)</li>
          <li><code>address-level2</code> (ciudad)</li>
          <li><code>postal-code</code> (código postal)</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Teléfono</td>
      <td data-th="name attribute">
        <code>phone</code>
        <code>mobile</code>
        <code>country-code</code>
        <code>area-code</code>
        <code>exchange</code>
        <code>suffix</code>
        <code>ext</code>
      </td>
      <td data-th="autocomplete attribute"><code>tel</code></td>
    </tr>
    <tr>
      <td data-th="Content type">Tarjeta de crédito</td>
      <td data-th="name attribute">
        <code>ccname</code>
        <code>cardnumber</code>
        <code>cvc</code>
        <code>ccmonth</code>
        <code>ccyear</code>
        <code>exp-date</code>
        <code>card-type</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>cc-name</code></li>
          <li><code>cc-number</code></li>
          <li><code>cc-csc</code></li>
          <li><code>cc-exp-month</code></li>
          <li><code>cc-exp-year</code></li>
          <li><code>cc-exp</code></li>
          <li><code>cc-type</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

{% include shared/remember.liquid list=page.remember.recommend-input %}

### El atributo `autofocus`

En algunos formularios, por ejemplo en la página de inicio de Google, en los que lo único que desea es que
el usuario complete un campo específico, puede agregar el atributo `autofocus`
.  Cuando se los configura, los navegadores de escritorio concentran inmediatamente la atención en el campo
de entrada y, de este modo, es más fácil para los usuarios comenzar a utilizar el formulario rápidamente.  Los navegadores
móviles ignoran el atributo `autofocus`, con el fin de evitar que el teclado aparezca
de forma aleatoria.

Tenga precaución al utilizar el atributo autofocus porque el teclado dejará de ser el foco
y, posiblemente, el carácter de retroceso no se podrá utilizar para la
navegación.

{% highlight html %}
<input type="text" autofocus ...>
{% endhighlight %}


