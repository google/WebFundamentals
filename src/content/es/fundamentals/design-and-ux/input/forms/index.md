project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Es complicado completar formularios desde el celular. Los mejores formularios son aquellos que poseen menos entradas.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-30 #}

# Crea formularios asombrosos {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Es complicado completar formularios desde el celular. Los mejores formularios son aquellos que poseen menos entradas. En los buenos formularios se proporcionan tipos de entradas semánticas. Las claves deben cambiar para que coincidan con los tipos de entradas de los usuarios; estos últimos eligen una fecha en un calendario. Mantén a tu usuario informado. Las herramientas de validación deben informar al usuario lo que debe hacer antes de enviar el formulario.


## Diseña formularios eficaces


Para diseñar formularios eficaces, evita las acciones repetidas, solicita solo la información necesaria y orienta a los usuarios mostrándoles el punto en que se encuentren en los formularios de muchas partes.


### TL;DR {: .hide-from-toc }
- Usa los datos existentes para completar previamente los campos y asegúrate de habilitar la función de autocompletar.
- Utilice barras de progreso claramente etiquetadas para ayudar a los usuarios a avanzar en los formularios que tienen varias partes.
- Proporciona un calendario visual para que los usuarios no deban abandonar tu sitio y consultar la app de calendario en sus smartphones.


### Minimiza las acciones y los campos repetidos

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Muestra el progreso en los formularios que tienen varias partes">
  <figcaption>
    En el sitio web Progressive.com, a los usuarios se les solicita primero su código postal, el cual se completa automáticamente en la próxima parte del formulario.
  </figcaption>
</figure>

Asegúrate de que sus formularios no contengan acciones repetidas; solo incluye tantos campos como sea 
necesario y aprovecha la función 
[autocompletar](/web/fundamentals/design-and-ux/input/forms/#use-metadata-to-enable-auto-complete),
de modo que los usuarios puedan completar fácilmente los formularios con los datos completados previamente.

Completa previamente la información que ya conozcas, o que se pueda 
anticipar, para que el usuario no tenga que ingresarla.  Por ejemplo, 
completa previamente la dirección de envío con la última dirección de envío proporcionada por el 
usuario.

<div style="clear:both;"></div>

### Muestra a los usuarios el punto en el que se encuentran

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="Muestra el progreso en los formularios que tienen varias partes">
  <figcaption>
    Usa barras de progreso claramente etiquetadas para ayudar a los usuarios a avanzar en los formularios que tienen varias partes.
  </figcaption>
</figure>

En las barras de progreso y los menús, se debe indicar precisamente el progreso general de 
los formularios y procesos de varios pasos.

Si colocas un formulario de complejidad desproporcionada en uno de los primeros pasos, es más probable 
que los usuarios abandonen el sitio antes de completar el proceso. 

<div style="clear:both;"></div>

### Ofrece calendarios visuales para seleccionar fechas

<figure class="attempt-right">
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="Sitio web de un hotel con un calendario fácil de usar">
  <figcaption>
    Sitio web de reservas de un hotel con un widget de calendario fácil de usar para seleccionar las fechas.
  </figcaption>
</figure>

A menudo, los usuarios necesitan más contexto cuando deben programar citas y fechas de viajes. 
Para facilitar esta tarea y evitar que abandonen tu sitio y consulten sus apps 
de calendario, proporciona un calendario visual con etiquetas claras para que puedan seleccionar las fechas de 
inicio y finalización. 

<div style="clear:both;"></div>

## Elige el mejor tipo de entrada

Optimiza el ingreso de información usando el tipo de entrada adecuado. A los usuarios les gustan
los sitios web en los que se muestran automáticamente teclados numéricos para ingresar los números de teléfono, o en los que
se anticipan automáticamente las respuestas de los campos a medida que se completan. Busca la manera de
eliminar las pulsaciones innecesarias de tus formularios.


### TL;DR {: .hide-from-toc }
- Elije el tipo de entrada más apropiado para tus datos a fin de simplificar la entrada.
- Ofrece sugerencias a medida que el usuario escriba con el elemento <code>datalist</code>.


### Tipos de entrada HTML5

En HTML5, se introdujeron diferentes tipos de entradas nuevas. Estos nuevos tipos de entrada, se proporcionan sugerencias
al navegador sobre el tipo de diseño de teclado que se debe mostrar para los teclados
en pantalla.  Para los usuarios, será más simple ingresar la información requerida sin tener que
cambiar su teclado y solo ver las teclas adecuadas para ese tipo de
entrada.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Entrada <code>type</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> Para ingresar una URL. Debe comenzar con un esquema de URI válido;
        por ejemplo, <code>http://</code>, <code>ftp://</code> o <code>mailto:</code>.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>Para ingresar números telefónicos. Aquí <b>no</b>
        se exige el uso de una sintaxis en particular para la validación, por lo que, si deseas garantizar el uso de
        un formato en especial, puedes usar patrones.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>Para ingresar direcciones de correo electrónico y sugerencias de que
        el signo @ se debe mostrar en el teclado de forma predeterminada. Puedes agregar el
        atributo múltiple si se proporciona más de una dirección de correo electrónico.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>Campo de ingreso de texto con estilo
        coherente con el campo de búsqueda de la plataforma.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>En el caso de las entradas numéricas, puede ser cualquier número racional
        o entero, o valor de flotación.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>Para entradas de números. Sin embargo, a diferencia del tipo de entrada de número,
        el valor es menos importante. Se muestra al usuario como un
        control deslizante.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>Para ingresar un valor de fecha y hora.
        La zona horaria proporcionada es la local.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>Para ingresar una fecha (solamente), aunque sin la zona
        horaria.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>Para ingresar una hora (solamente), aunque sin la zona
        horaria.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>Para ingresar una semana (solamente), aunque sin la zona
        horaria.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>Para ingresar un mes (solamente), aunque sin la zona
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

Warning: Recuerda tener en cuenta la localización al momento de elegir un tipo de entrada,
ya que algunas configuraciones regionales usan un punto (.) como separador en vez de una coma (,)

### Usa datalist para ofrecer sugerencias durante la entrada

El elemento `datalist` no es un tipo de entrada, sino más bien una lista de valores de entrada sugeridos
para asociar con un campo del formulario. De este modo, el navegador puede sugerir opciones de
autocompletar a medida que el usuario escribe. A diferencia de los elementos de selección, en cuyo caso los usuarios deben recorrer largas
listas para encontrar el valor que buscan y limitarse solo a
estas, el elemento `datalist` proporciona sugerencias a medida que el usuario escribe.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

Note: Los valores de  <code>datalist</code> se proporcionan como sugerencias, y los usuarios no se ven limitados a las sugerencias ofrecidas.

## Etiqueta y nombra las entradas correctamente

Es complicado completar formularios desde el celular. Los mejores formularios son aquellos que poseen menos entradas. En los buenos formularios se proporcionan tipos de entradas semánticas. Las claves deben cambiar para que coincidan con los tipos de entradas de los usuarios; estos últimos eligen una fecha en un calendario. Mantén a tu usuario informado. Las herramientas de validación deben informar al usuario lo que debe hacer antes de enviar el formulario.


### TL;DR {: .hide-from-toc }
- Usa siempre las  <code>label</code> en las entradas de los formularios y asegúrate de que sean visibles cuando el campo esté en foco.
- Usa los  <code>placeholder</code> para proporcionar orientación sobre lo que esperas.
- Con el fin de ayudar a que el navegador complete el formulario automáticamente, usa los atributos  <code>name</code> establecidos para los elementos e incluye el atributo  <code>autocomplete</code>.


### La importancia de las etiquetas

A través del elemento `label`, se proporcionan instrucciones al usuario sobre la
información que se necesita en el elemento de un formulario.  Cada `label` se asocia con un
elemento de entrada mediante su colocación dentro del elemento `label` o el uso del atributo “`for`”
.  Si se aplican etiquetas a los elementos del formulario, también es posible mejorar el tamaño
del objetivo táctil: el usuario puede tocar tanto la etiqueta como la entrada para
enfocar el elemento de entrada.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Ajuste del tamaño y disposición y de las etiquetas

Las etiquetas y las entradas deben ser suficientemente grandes como para que puedan seleccionarse fácilmente.  En las ventanas de visualización
verticales, las etiquetas de los campos se deben colocar sobre los elementos de entrada, y junto a ellos en las ventanas de visualización
horizontales.  Asegúrate de que las etiquetas de los campos y los cuadros de entrada correspondientes sean visibles
al mismo tiempo.  Ten precaución con los controladores de desplazamiento personalizados que pueden desplazar los elementos
de entrada hacia la parte superior de la página y ocultar la etiqueta, o las etiquetas que se colocan debajo de los elementos
de entrada que podrían estar cubiertas con el teclado virtual.

### Uso de marcadores de posición

A través del atributo de marcadores de posición, se proporcionan sugerencias al usuario sobre la información que debe introducir en
la entrada, generalmente mostrando el valor como texto de color claro hasta que el usuario
comienza a escribir en el elemento.

<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


Warning: Los marcadores de posición desaparecen tan pronto como el usuario comienza a escribir en un elemento. Por ello, no reemplazan a las etiquetas.  Se deben utilizar como ayuda para guiar a los usuarios sobre el formato y el contenido requeridos.

### Uso de metadatos para habilitar la función de autocompletar

A los usuarios les encanta que los sitios web les ahorren tiempo mediante la compleción automática de campos
comunes, como nombres, direcciones de correo electrónico y otros de uso frecuente. Además, de este modo
 es posible reducir los posibles errores de entrada, especialmente en teclados virtuales y
dispositivos pequeños.

En los navegadores se usa mucho la heurística para determinar los campos que se pueden
[completar de forma automática](https://support.google.com/chrome/answer/142893)
[teniendo en cuenta los datos especificados anteriormente por el usuario](https://support.google.com/chrome/answer/142893),
y puedes proporcionar sugerencias al navegador brindando los atributos `name`
y `autocomplete` en cada elemento de entrada.

Note: Chrome necesita que los elementos `input` se encuentren dentro de una etiqueta `<form>` para habilitar
la opción de completar automáticamente. Si no se encuentran dentro de la etiqueta `form`, Chrome ofrecerá
sugerencias, pero **no** completará el formulario.

Por ejemplo, para indicar al navegador que debe completar automáticamente el formulario con
los nombres, las direcciones de correo electrónico y el número telefónico de los usuarios, debes usar lo siguiente:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }



### Valores de los atributos `name` y `autocomplete` de entrada recomendados

Los valores del atributo `autocomplete` son una parte del [HTML estándar de WHATWG](https://html.spec.whatwg.org/multipage/forms.html#autofill) actual. A continuación, se muestran los atributos `autocomplete` de uso más común.

Los atributos `autocomplete` pueden ir acompañados por el nombre de una sección, como **`shipping `**`given-name` o **`billing `**`street-address`. En el navegador, las diferentes secciones se completarán automáticamente por separado, y no de forma continua.

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
      <td data-th="Content type">Correo electrónico</td>
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
    <tr>
      <td data-th="Content type">Nombres de usuario</td>
      <td data-th="name attribute">
        <code>username</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>username</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">Contraseña</td>
      <td data-th="name attribute">
        <code>password</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>current-password</code> (para formularios de inicio de sesión)</li>
          <li><code>new-password</code> (para formularios de inicio de sesión y cambio de contraseña)</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


Note: Usa únicamente  <code>street-address</code> o bien  <code>address-line1</code> y  <code>address-line2</code>.  <code>address-level1</code> y  <code>address-level2</code> son solo necesarios si se deben usar en el formato de tu dirección.


### El atributo `autofocus`

En algunos formularios (como la página de inicio de Google), en los cuales lo único que deseas es que
el usuario complete un campo específico, puedes agregar el atributo
 `autofocus`.  Cuando se configuran, los navegadores de escritorio centran inmediatamente la atención en el campo
de entrada. Esto hace que para los usuarios resulte más fácil comenzar a usar el formulario rápidamente.  Los navegadores
móviles ignoran el atributo `autofocus`, a fin de evitar que el teclado aparezca
de forma aleatoria.

Ten precaución al usar el atributo autofocus, ya que quitará el foco del teclado
y probablemente evite uso del carácter de retroceso para la
navegación.


    <input type="text" autofocus ...>
    


## Proporciona validación en tiempo real

La validación de datos en tiempo real no solo te permite mantener tus datos limpios, sino que también lo ayuda a mejorar la experiencia del usuario.  Los navegadores modernos poseen varias herramientas incorporadas que permiten realizar la validación de datos en tiempo real y pueden evitar que el usuario envíe un formulario no válido.  Se deben utilizar indicaciones visuales para mostrar si un formulario se completó correctamente.


### TL;DR {: .hide-from-toc }
- Aprovecha los atributos de validación incorporados del navegador, como <code>pattern</code>, <code>required</code>, <code>min</code>, <code>max</code>, etc.
- Usa JavaScript y la Constraints Validation API para los requisitos de validación más complejos.
- Muestra los errores de validación en tiempo real y, si el usuario intenta enviar un formulario no válido, indícale todos los campos que debe corregir.


### Uso de atributos para validar la entrada

#### El atributo `pattern`

El atributo `pattern`, especifica una [expresión regular](https://en.wikipedia.org/wiki/Regular_expression)
que se usa para validar un campo de entrada. Por ejemplo, para validar un código postal de EE. UU.
(5 dígitos, a veces seguidos por un guion y 4 dígitos adicionales), se debe
configurar el `pattern` de la siguiente manera:


    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

##### Patrones de expresión regulares comunes

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Expresión regular</th>
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
      <td data-th="Description">Número de identificación personal</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Número telefónico de América del Norte</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

#### El atributo `required`

Si el atributo `required` está presente, el campo debe contener un valor antes
de que se pueda enviar el formulario. Por ejemplo, para crear el código postal requerido,
simplemente agregamos el atributo requerido:


    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

#### Los atributos `min`, `max` y `step`

En el caso de los tipos de entradas numéricas, como números o rangos, así como también las entradas de fecha y hora, puedes
especificar los valores mínimos y máximos, así como también la cantidad que debe
aumentar o reducirse cada valor cuando se ajusta mediante el control deslizante o el control de número.  Por ejemplo, una
entrada de tamaño de calzado establecería un tamaño mínimo de 1 y un tamaño máximo de 13, con un valor intermedio de
0,5.


    <input type="number" min="1" max="13" step="0.5" ...>
    

#### El atributo `maxlength`

El atributo `maxlength` se puede usar para especificar la extensión máxima de una entrada o un
cuadro de texto, y resulta útil cuando deseas limitar la extensión de la información que puede proporcionar
el usuario. Por ejemplo, si deseas limitar el nombre de un archivo a 12 caracteres,
puedes usar lo siguiente.


    <input type="text" id="83filename" maxlength="12" ...>
    

#### El atributo `minlength`

El atributo `minlength` se puede usar para especificar la extensión mínima de una entrada o un
cuadro de texto, y resulta útil cuando deseas especificar la longitud mínima que debe proporcionar
el usuario. Por ejemplo, si deseas especificar que el nombre de un archivo debe tener
8 caracteres como mínimo, puedes usar lo siguiente.


    <input type="text" id="83filename" minlength="8" ...>
    

#### El atributo `novalidate`

En algunos casos, puedes permitirle al usuario que presente el formulario, incluso si
contiene una entrada no válida. Para hacerlo, agregue el atributo `novalidate` al elemento del
formulario, o bien campos de entrada individuales. En este caso, a través de las seudoclases y
las JavaScript API también podrás verificar si el formulario se valida.


    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>
    


Success: Aun con la validación de entrada del lado del cliente, siempre es importante validar los datos en el servidor para garantizar la uniformidad y la seguridad de tus datos.

### Uso de JavaScript para validación más compleja en tiempo real

Cuando la validación integrada y las expresiones regulares no son suficientes, puedes usar la
[API de validación de restricciones](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
una herramienta eficiente para ejecutar la validación personalizada.  La API le permite llevar a cabo acciones como
configurar un error personalizado, verificar si un elemento es válido y determinar el
motivo por el que un elemento no es válido:

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Validación de restricciones</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">Configura un mensaje de validación personalizado y la propiedad <code>customError</code> del objeto <code>ValidityState</code> para <code>true</code>.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">Se proporciona una cadena con el motivo por el cual la entrada no aprobó la prueba de validación.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">Se obtiene la respuesta <code>true</code> si el elemento cumple con todas sus restricciones y <code>false</code> si sucede lo contrario. La decisión sobre la manera en que la página responde si en la verificación se obtiene la respuesta <code>false</code> depende del desarrollador.</td>
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



### Configuración de mensajes de validación personalizados

Si un campo no se valida, usa `setCustomValidity()` para marcar el campo como no válido
y explica el motivo por el cual no se validó.  Por ejemplo, en un formulario de registro se puede
solicitar al usuario que confirme la dirección de correo electrónico ingresándola dos veces.  Usa el evento de
desenfoque en la segunda entrada para validar las dos entradas y configurar la respuesta
correspondiente.  Por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Evita el envío de formularios no válidos

Debido a que no se evitará en todos los navegadores que el usuario envíe el formulario si existen
datos no válidos, debes filtrar el evento de envío y usar `checkValidity()`
en el elemento del formulario para determinar si este último es válido.  Por ejemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### Muestra comentarios en tiempo real

Resulta útil proporcionar una indicación visual en cada campo para mostrar si
el usuario completó el formulario correctamente antes de enviarlo.
En HTML5 también se presenta una serie de seudoclases que se pueden usar para dar estilo a las
entradas según su valor o sus atributos.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Comentarios en tiempo real</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">Se configura, explícitamente, el estilo de una entrada para que se use cuando el valor cumpla con todos los requisitos de validación.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">Configura explícitamente el estilo de una entrada para que se use cuando el valor no cumpla con todos los requisitos de validación.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">Configura explícitamente el estilo del elemento de una entrada que tiene configurado el atributo requerido.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">Configura explícitamente el estilo de un elemento de entrada que no tiene configurado el atributo obligatorio establecido.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">Configura explícitamente el estilo del elemento de una entrada numérica cuando el valor se encuentra dentro del rango.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">Configura explícitamente el estilo del elemento de una entrada numérica cuando el valor se encuentra fuera del rango.</td>
    </tr>
  </tbody>
</table>

La validación se realiza inmediatamente. Esto significa que, cuando la página se carga, los campos
pueden estar marcados como no válidos, incluso si el usuario aún no haya tenido la oportunidad de
completarlos.  Esto también significa que probablemente el usuario vea
el estilo no válido mientras escribe. Para evitar esto, puedes combinar la CSS con
JavaScript para mostrar solo los estilos no válidos cuando el usuario haya visitado el campo.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }


Success: Debes mostrar al usuario todos los problemas con el formulario de una sola vez, en lugar de mostrárselos uno por uno.




{# wf_devsite_translation #}
