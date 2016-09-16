project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Es complicado completar formularios desde el celular. Los mejores formularios son aquellos que poseen menos entradas.

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-30 #}

# Creación de formularios asombrosos {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Es complicado completar formularios desde el celular. Los mejores formularios son aquellos que poseen menos entradas. En los buenos formularios, se proporcionan tipos de entradas semánticas. Las claves deben cambiar para que coincidan con los tipos de entradas de los usuarios; los usuarios eligen una fecha en un calendario. Mantenga a su usuario informado. En las herramientas de validación, se le debe informar al usuario lo que debe hacer antes de enviar el formulario.

Para obtener una descripción general de estas guías sobre cómo crear formularios asombrosos, consulte el siguiente video.

<div class="clearfix"></div>


## Diseño de formularios eficientes 


Para diseñar formularios eficientes, evite las acciones repetidas, solicite solo la información necesaria y oriente a los usuarios al mostrarles en qué instancia se encuentran en los formularios que tienen muchas partes.


### TL;DR {: .hide-from-toc }
- Utilice los datos existentes para completar previamente los campos, y asegúrese de habilitar la compleción automática.
- Utilice barras de progreso claramente etiquetadas para ayudar a los usuarios a avanzar en los formularios que tienen varias partes.
- Proporcione un calendario visual para que los usuarios no tengan que abandonar su sitio para visitar la aplicación de calendario en sus teléfonos inteligentes.


### Minimice las acciones y los campos repetidos

Asegúrese de que sus formularios no contengan acciones repetidas; solo incluya tantos campos como sea
necesario y aproveche la función 
[compleción automática](/web/fundamentals/input/form/label-and-name-inputs.html#use-metadata-to-enable-auto-complete),
de modo que los usuarios puedan completar fácilmente los formularios con los datos completados previamente.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Show progression in multi-part forms">
  <figcaption>
    En el sitio web Progressive.com, a los usuarios se les solicita primero su código postal, el cual se completa automáticamente en la próxima parte del formulario.
  </figcaption>
</figure>

Siempre que pueda, complete previamente la información que ya sabe o que se puede 
anticipar para que el usuario no tenga que ingresarla.  Por ejemplo, 
complete previamente la dirección de envío con la última dirección de envío proporcionada por el 
usuario.

### Muestre a los usuarios la instancia en la que se encuentran

En las barras de progreso y los menús, se debe indicar precisamente el progreso general de 
los formularios y procesos de varios pasos.

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Show progression in multi-part forms">
  <figcaption>
    Utilice barras de progreso claramente etiquetadas para ayudar a los usuarios a avanzar en los formularios que tienen varias partes.
  </figcaption>
</figure>

Si coloca un formulario desproporcionadamente complejo en uno de los primeros pasos, aumentan las probabilidades de 
que los usuarios abandonen el sitio antes de completar todo el proceso. 


### Ofrezca calendarios visuales para seleccionar fechas

A menudo, los usuarios necesitan más contexto cuando deben programar citas y fechas de viajes. 
Para facilitar esta tarea y evitar que abandonen el sitio para consultar la 
aplicación del calendario, muéstreles un calendario visual con etiquetas claras para que puedan seleccionar las fechas de 
inicio y finalización. 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="Hotel website with easy to use calendar">
  <figcaption>
    Sitio web de reserva de un hotel con un widget de calendario fácil de utilizar para seleccionar las fechas.
  </figcaption>
</figure>




## Elección del mejor tipo de entrada 




Para optimizar el ingreso de información, use el tipo de entrada adecuado. A los usuarios les encantan los sitios web en los que se muestran automáticamente teclados numéricos para ingresar los números telefónicos o en los que se anticipan automáticamente las respuestas de los campos a medida que se los completa. Busque la manera de eliminar las pulsaciones innecesarias en sus formularios.


### TL;DR {: .hide-from-toc }
- Elija el tipo de entrada más apropiado para sus datos a fin de simplificar la entrada.
- Ofrezca sugerencias a medida que el usuario escribe mediante el elemento <code>datalist</code>.


#### Tipos de entrada HTML5

En HTML5, se introdujeron diferentes tipos de entradas nuevas. Mediante estos nuevos tipos de entrada, se le proporcionan sugerencias
al navegador sobre el tipo de diseño de teclado que se debe mostrar para los teclados
que se muestran en pantalla.  Para los usuarios, será más simple ingresar la información requerida sin tener que
cambiar el teclado y si solo ven las teclas adecuadas para ese tipo de
entrada.

<table>
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

#### Use datalist para ofrecer sugerencias durante la entrada

El elemento `datalist` no es un tipo de entrada, sino que es una lista de valores de entrada sugeridos
para asociar con un campo del formulario. De este modo, el navegador puede sugerir opciones de
compleción automática a medida que el usuario escribe. A diferencia de los elementos de selección en los que los usuarios deben desplazarse por largas
listas para encontrar el valor que buscan, y deben limitarse solo a esas
listas, el elemento`datalist` proporciona sugerencias a medida que el usuario escribe.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

Note: Los valores de <code>datalist</code> se proporcionan como sugerencias, y los usuarios no están limitados a las sugerencias ofrecidas.


## Etiquete y nombre las entradas correctamente

Es complicado completar formularios desde el celular. Los mejores formularios son aquellos que poseen menos entradas. En los buenos formularios, se proporcionan tipos de entradas semánticas. Las claves deben cambiar para que coincidan con los tipos de entradas de los usuarios; los usuarios eligen una fecha en un calendario. Mantenga a su usuario informado. En las herramientas de validación, se le debe informar al usuario lo que debe hacer antes de enviar el formulario.

### La importancia de las etiquetas

A través del elemento `label`, se le proporcionan instrucciones al usuario sobre la
información que se necesita en el elemento de un formulario.  Cada `label` se asocia con un
elemento de entrada al colocarla adentro del elemento `label` o al utilizar el atributo "`for`"
.  Si se aplican etiquetas a los elementos del formulario, también es posible mejorar el tamaño
del objetivo táctil: el usuario puede tocar tanto la etiqueta como la entrada para
enfocarse en el elemento de entrada.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

#### Colocación y ajuste del tamaño de las etiquetas

Las etiquetas y las entradas deben ser lo suficientemente grandes como para que se puedan presionar fácilmente.  En las ventanillas
verticales, las etiquetas de los campos se deben colocar sobre los elementos de entrada, y junto a ellos en las ventanillas
horizontales.  Asegúrese de que las etiquetas de los campos y los cuadros de entrada correspondientes estén visibles
al mismo tiempo.  Tenga precaución con los controladores de desplazamiento personalizados que podrían desplazar los elementos
de entrada hacia la parte superior de la página y ocultar la etiqueta, o las etiquetas que se colocan debajo de los elementos
de entrada que podrían estar cubiertas con el teclado virtual.

#### Uso de marcadores de posición

A través del atributo de marcadores de posición se le proporcionan sugerencias al usuario sobre la información que debe introducir en
la entrada, generalmente, mostrando el valor como texto de color claro hasta que el usuario
comienza a escribir en el elemento.

<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


#### Uso de metadatos para habilitar la compleción automática

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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

#### Valores de los atributos `name` y `autocomplete` de entrada recomendados


Los valores del atributo `autocomplete` son una parte del [HTML estándar de WHATWG] actual(https://html.spec.whatwg.org/multipage/forms.html#autofill). A continuación, se muestran los atributos `autocomplete` utilizados más comúnmente.

Los atributos `autocomplete` pueden ir acompañados del nombre de una sección, como **`shipping `**`given-name` o **`billing `**`street-address`. En el navegador, las diferentes secciones se completarán automáticamente por separado, y no de forma continua.

<table>
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


#### El atributo `autofocus`

En algunos formularios, por ejemplo en la página de inicio de Google, en los que lo único que desea es que
el usuario complete un campo específico, puede agregar el atributo `autofocus`
.  Cuando se los configura, los navegadores de escritorio concentran inmediatamente la atención en el campo
de entrada y, de este modo, es más fácil para los usuarios comenzar a utilizar el formulario rápidamente.  Los navegadores
móviles ignoran el atributo `autofocus`, con el fin de evitar que el teclado aparezca
de forma aleatoria.

Tenga precaución al utilizar el atributo autofocus porque el teclado dejará de ser el foco
y, posiblemente, el carácter de retroceso no se podrá utilizar para la
navegación.


    <input type="text" autofocus ...>




## Entrega de validación en tiempo real 




La validación de datos en tiempo real no solo le permite mantener sus datos limpios, sino que también lo ayuda a mejorar la experiencia del usuario.  Los navegadores modernos poseen varias herramientas incorporadas que permiten realizar la validación de datos en tiempo real y que pueden evitar que el usuario envíe un formulario no válido.  Se deben utilizar indicaciones visuales para mostrar si un formulario se completó correctamente.


### TL;DR {: .hide-from-toc }
- Aproveche los atributos de validación incorporados de los navegadores, como <code>pattern</code>, <code>required</code>, <code>min</code>, <code>max</code>, etc.
- Utilice JavaScript y la API de validación de restricciones para los requisitos de validación más complejos.
- Esto le permitirá mostrar los errores de validación en tiempo real y, si el usuario intenta enviar un formulario no válido, podrá mostrarle todos los campos que debe corregir.


#### Uso de atributos para validar la entrada

##### El atributo `pattern`

En el atributo `pattern`, se especifica una [expresión
regular](http://en.wikipedia.org/wiki/Regular_expression) que se utiliza para validar un
campo de entrada. Por ejemplo, para validar un código postal de los EE. UU. (5 dígitos, a veces
seguidos por un guión y 4 dígitos adicionales), debemos configurar el atributo `pattern` de la siguiente
manera:


    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

###### Patrones de expresión regulares comunes

<table>
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

##### El atributo `required`

Si el atributo `required` está presente, entonces el campo debe contener un valor antes
de que se pueda enviar el formulario. Por ejemplo, para crear el código postal requerido,
simplemente agregamos el atributo requerido:


    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

##### Los atributos `min`, `max` y `step`

En el caso de los tipos de entradas numéricas, como números o rangos, así como también las entradas de fecha y hora, puede
especificar los valores mínimos y máximos, así como también la cantidad que se debe
aumentar o reducir cada valor cuando se ajusta mediante el control deslizante o el control de número.  Por ejemplo, una
entrada de números de calzados se configuraría con un tamaño mínimo de 1 y un tamaño máximo de 13, con un valor intermedio de
0,5


    <input type="number" min="1" max="13" step="0.5" ...>
    

##### El atributo `maxlength`

El atributo `maxlength` se puede utilizar para especificar la longitud máxima de una entrada o un
cuadro de texto, y resulta útil cuando desea limitar la longitud de la información que puede proporcionar
el usuario. Por ejemplo, si desea limitar el nombre de un archivo a 12 caracteres,
puede utilizar lo siguiente.


    <input type="text" id="83filename" maxlength="12" ...>
    

##### El atributo `minlength`

El atributo `minlength` se puede utilizar para especificar la longitud mínima de una entrada o un
cuadro de texto, y resulta útil cuando desea especificar la longitud mínima que debe proporcionar
el usuario. Por ejemplo, si desea especificar que el nombre de un archivo debe tener
8 caracteres como mínimo, puede utilizar lo siguiente.


    <input type="text" id="83filename" minlength="8" ...>
    

##### El atributo `novalidate`

En algunos casos, puede permitirle al usuario que presente el formulario, incluso si
contiene una entrada no válida. Para hacerlo, agregue el atributo `novalidate` al elemento del
formulario, o bien campos de entrada individuales. En este caso, a través de las seudoclases y
las API de JavaScript también podrá verificar si el formulario es válido.


    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>
    

Note: Incluso si se posee la validación de entrada de parte del cliente, siempre es importante validar los datos en el servidor para garantizar la coherencia y la seguridad de sus datos.

#### Uso de JavaScript para validación más compleja en tiempo real

Cuando la validación incorporada y las expresiones regulares no son suficientes, puede utilizar la
 [API de validación de restricciones](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
una herramienta eficiente para ejecutar la validación personalizada.  La API le permite llevar a cabo acciones como
configurar un error personalizado, verificar si un elemento es válido y determinar el
motivo por el que un elemento no es válido:

<table>
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

##### Configuración de mensajes de validación personalizados

Si un campo no aprueba la validación, utilice `setCustomValidity()` para marcar el campo como no válido
y explique por qué no realizó la validación.  Por ejemplo, en un formulario de registro se le puede
solicitar al usuario que confirme la dirección de correo electrónico al ingresarla dos veces.  Utilice el evento de desenfoque
en la segunda entrada para validar las dos entradas y configurar la respuesta
apropiada.  Por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

##### Evite el envío de formularios que no son válidos

Como no en todos los navegadores se evitará que el usuario envíe el formulario si se ingresaron
datos no válidos, debe filtrar el evento de envío y utilizar `checkValidity()`
en el elemento del formulario para determinar si el formulario es válido.  Por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto"  %}
</pre>

#### Muestra de comentarios en tiempo real

Resulta útil proporcionar una indicación visual en cada campo para mostrar si
el usuario completó el formulario correctamente antes de enviarlo.
En HTML5, también se introducen una serie de seudoclases que se pueden utilizar para darle estilo a las
entradas sobre la base de su valor o atributos.

<table>
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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

Note: Debe mostrarle al usuario todos los problemas del formulario de una sola vez, en lugar de mostrárselos uno por uno.




## Simplificación de la finalización del pago con la API requestAutocomplete 




Aunque `requestAutocomplete` se diseñó para ayudar a los usuarios a completar cualquier formulario, actualmente, su uso más común es el comercio electrónico, donde el abandono de los carritos de compra en la web móvil <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>puede ser de hasta el 97 %</a>. Imagínese que el 97 % de las personas en un supermercado con el carrito lleno de artículos que desean voltearan el carrito y se fueran.


### TL;DR {: .hide-from-toc }
- <code>requestAutocomplete</code>puede simplificar en gran medida el proceso de finalización del pago y mejorar la experiencia del usuario.
- Si <code>requestAutocomplete</code> está disponible, oculte el formulario de finalización de pago y dirija a los usuarios directamente a la página de confirmación.
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


