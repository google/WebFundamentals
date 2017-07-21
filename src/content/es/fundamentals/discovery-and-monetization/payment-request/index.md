project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La Payment Request API es para pagos rápidos y fáciles en la web.

{# wf_published_on: 2016-07-25 #}
{# wf_updated_on: 2017-07-12 #}

# Payment Request API: una guía de integración {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/zkoch.html" %}

Prueba interna: `PaymentRequest` está aún en desarrollo. Mientras creemos que es lo suficientemente estable
para implementarse, puede seguir cambiando. Mantendremos esta página actualizada para que
siempre muestre el estado actual de la API ([cambios M56](https://docs.google.com/document/d/1I8ha1ySrPWhx80EB4CVPmThkD4ILFM017AfOA5gEFg4/edit#)).
Mientras tanto, te protegemos de los cambios de la API que puedan ser
incompatibles con versiones anteriores, ofrecemos [una corrección de compatibilidad](https://storage.googleapis.com/prshim/v1/payment-shim.js)
que se puede integrar a tu sitio. La corrección de compatibilidad oculta cualquier diferencia de la API
de dos versiones principales de Chrome.


Comprar productos en línea es una experiencia conveniente, pero a menudo puede ser frustrante, en especial desde dispositivos móviles. Si bien el tráfico móvil continúa en aumento, las conversiones móviles representan solo un tercio de todas las compras realizadas. En otras palabras, los usuarios abandonan las compras desde dispositivos móviles con el doble de frecuencia en comparación con las compras desde equipos de escritorio. ¿Por qué?

![](images/1_why_users_abandon.png)

*Por qué los usuarios abandonan los formularios de compra desde dispositivos móviles*

Los formularios de compra en línea requieren una amplia intervención por parte del usuario, son difíciles de usar, se cargan y actualizan con lentitud, y requieren varios pasos para completar la compra. Esto se debe a que dos componentes principales de los pagos en línea, seguridad y conveniencia, a menudo trabajan con diferentes propósitos; por lo general, más de uno significa menos del otro.

La mayoría de los problemas que llevan al abandono se pueden asociar directamente con los formularios de compra. Cada app o sitio tiene su propio proceso de entrada de datos y validación, y los usuarios a menudo descubren que tienen que ingresar la misma información en cada punto de compra de la app. Asimismo, los desarrolladores de apps se esfuerzan por crear flujos de compra que admitan varios métodos de compra exclusivos; incluso las diferencias más pequeñas en los requisitos de los métodos de pago pueden complicar el proceso de llenado y envío de formularios.

Cualquier sistema que mejore o resuelva uno o más de esos problemas es un cambio bienvenido. Ya hemos comenzado a solucionar el problema con [Autocompletar](/web/updates/2015/06/checkout-faster-with-autofill), pero ahora quisiéramos hablar sobre una solución más integral.

## Introducción de la Payment Request API {: #introducing }

La Payment Request API es un sistema que tiene que *eliminar los formularios de salida*. Mejora notablemente el flujo de trabajo del usuario durante el proceso de compra, lo cual proporciona una experiencia del usuario más uniforme y permite a los comerciantes web usar con facilidad diferentes métodos de pago. La Payment Request API no es un nuevo método de pago ni se integra directamente con procesadores de pago; es una capa de proceso concebida con los siguientes objetivos:

* Permitir que el navegador actúe como intermediario entre comerciantes, usuarios y métodos de pago.
* Estandarizar el flujo de comunicación de pago tanto como sea posible.
* Admitir a la perfección diferentes métodos de pago seguros.
* Funcionar en cualquier navegador, dispositivo, móvil de plataforma o de otra manera.

La Payment Request API es un estándar abierto compatible con varios navegadores que reemplaza los flujos tradicionales de finalización de compra al permitir a los comerciantes solicitar y aceptar cualquier método de pago en una sola llamada a la API. La Payment Request API permite que la página web intercambie información con el usuario-agente mientras este último proporciona entradas, antes de aprobar o rechazar una solicitud de pago.

Lo mejor de todo, con el navegador como intermediario, toda la información necesaria para que la finalización de la compra sea rápida se puede guardar en el navegador, de modo que los usuarios solo deban confirmar y pagar con un solo clic.

### Proceso de transacción de pago {: #transaction-process }
Con la Payment Request API, el proceso de transacción es lo más fluido posible para usuarios y comerciantes.

![](images/4_the_payment_transaction_process.png)

*Proceso de transacción de pago*

El proceso comienza cuando el sitio del comerciante crea una nueva `PaymentRequest` y transmite al navegador toda la información necesaria para realizar la compra: el monto que se cobrará, la moneda en la que se espera el pago y los métodos de pago que acepta el sitio. El navegador determina la compatibilidad entre los métodos de pago aceptados para el sitio y los métodos que el usuario tiene instalados en el dispositivo de destino.

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>


Luego presenta las IU de pago al usuario, quien selecciona un método de pago y autoriza la transacción. Un método de pago puede ser sencillo como una tarjeta de crédito que el navegador haya guardado, o complicado como una aplicación de terceros creada específicamente para proporcionar pagos al sitio (esta funcionalidad se anunciará próximamente). Una vez de que el usuario autoriza la transacción, todos los detalles de pago necesarios se envían directamente al sitio. Por ejemplo, para un pago con tarjeta de crédito, el sitio recibirá un número de tarjeta, un nombre de titular de la tarjeta, una fecha de vencimiento y un CVC.

La Payment Request también se puede extender para mostrar información adicional, como direcciones y opciones de envío, correo electrónico y teléfono del ordenante. Esto te permite obtener toda la información que necesitas para finalizar un pago sin siquiera mostrar al usuario un formulario de finalización de compra.


La belleza de este proceso nuevo se debe a tres aspectos: desde la perspectiva del usuario, toda la interacción previamente tediosa (solicitud, autorización, pago y resultado) ahora se produce en un solo paso; desde la perspectiva del sitio web, solo exige una única llamada de JavaScript API, desde la perspectiva del método de pago, no existe cambio de proceso.

<div style="clear:both;"></div>

## Uso de la PaymentRequest API {: #using }

### Cargar la corrección de compatibilidad de la Payment Request API

Para reducir las molestias de actualizar esta API estándar en vivo, te
recomendamos agregar esta corrección de compatibilidad en la sección `<head>` de tu código. Esta corrección de compatibilidad
se actualiza como cambios de API y hace lo mejor para que tu código continúe funcionando
al menos 2 lanzamientos principales de Chrome.


    <script src="https://storage.googleapis.com/prshim/v1/payment-shim.js">


### Crear una PaymentRequest {: #create-paymentrequest }

El primer paso es crear un objeto [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-interface) llamando al constructor de la [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-constructor). Este paso generalmente (aunque no siempre) está asociado a una acción iniciada por el usuario que indica su intención de realizar una compra. El objeto se construye con parámetros que contienen los datos necesarios.

    var request = new PaymentRequest(
      methodData, // required payment method data
      details,    // required information about transaction
      options     // optional parameter for things like shipping, etc.
    );


*Constructor de PaymentRequest*

#### El parámetro methodData {: #methoddata-parameter }

El parámetro `methodData` contiene una lista de métodos de pagos y, si fuese relevante, información adicional sobre el método de pago. Esta secuencia contiene diccionarios `PaymentMethodData` que incluyen identificadores estándares asociados con los métodos de pago que la app pretende aceptar y con los datos específicos del método de pago. Consulta [Arquitectura de la PaymentRequest API](https://w3c.github.io/browser-payment-api/specs/architecture.html) para obtener más información.

En este momento, `PaymentRequest` en Chrome solo admite las siguientes tarjetas de crédito estándares: '`amex`', '`diners`', '`discover`', '`jcb`', '`maestro`', '`mastercard`', '`unionpay`' y '`visa`'.


    var methodData = [
      {
        supportedMethods: ["visa", "mastercard"]
      }
    ]


*Métodos y datos de pagos*

#### El parámetro de detalles {: #details-parameter }

El parámetro `details` contiene información sobre la transacción. Hay dos componentes principales: un total, que refleja el monto total y la moneda que se cobrará, y un conjunto opcional de `displayItems` que indica la forma en que se calculó el monto final. Este parámetro no está pensado para ser una lista de artículos individuales, sino un resumen de los principales componentes del pedido: subtotal, descuentos, impuestos, costos de envío, etc.

<div class="attempt-right">
  <figure>
    <img src="images/6_order_summary.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>

Es importante observar que la PaymentRequest API no realiza operaciones aritméticas. Es decir, no garantiza ni puede garantizar que los componentes en pantalla sumen correctamente el monto total adeudado. Estos cálculos son responsabilidad del desarrollador. Por ello, siempre debes asegurarte de que los artículos sumen el mismo monto en el total. Asimismo, `PaymentRequest` no admite reembolsos, por lo cual los montos deben ser siempre positivos (aunque los artículos pueden ser negativos, como en el caso de descuentos).

El navegador mostrará las etiquetas a medida que las definas, y presentará automáticamente el formato de moneda correcto según la configuración regional del usuario. Ten en cuenta que las etiquetas deben mostrarse en el mismo idioma que tu contenido.

<div style="clear:both;"></div>

    var details = {
      displayItems: [
        {
          label: "Original donation amount",
          amount: { currency: "USD", value : "65.00" }, // US$65.00
        },
        {
          label: "Friends and family discount",
          amount: { currency: "USD", value : "-10.00" }, // -US$10.00
          pending: true // The price is not determined yet
        }
      ],
      total:  {
        label: "Total",
        amount: { currency: "USD", value : "55.00" }, // US$55.00
      }
    }


*Detalles de la transacción*

`pending` se usa comúnmente para mostrar los elementos como el envío o los importes del impuesto que dependen de la dirección u opción de envío. Chrome indica los campos pendientes en la IU para la solicitud de pago.

Los valores repetidos o calculados que se usan en `details` se pueden especificar como literales de string o variables de string individuales.


    var currency = "USD";
    var amount = "65.00";
    var discount = "-10.00";
    var total = "55.00";


*Variables de PaymentRequest*

### Muestra PaymentRequest {: #display-paymentrequest }

<div class="attempt-left">
  <figure>
    <img src="images/7_display_payment_request.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>

Activa la interfaz `PaymentRequest` llamando a su método [`show()`](https://www.w3.org/TR/payment-request/#show). Este método invoca una IU nativa que permite al usuario examinar los detalles de la compra, agregar o cambiar información y, por último, pagar. Cuando el usuario acepte o rechace la solicitud de pago, se mostrará una [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (indicada por su método `then()` y función de callback) que se resuelve.

<div style="clear:both;"></div>

    request.show().then(function(paymentResponse) {
      // Process paymentResponse here
      paymentResponse.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


*Método show de PaymentRequest*

### Anular una Payment Request {: #abort-paymentrequest }
Puedes anular de modo intencional una `PaymentRequest` llamando a su método [`abort()`](https://www.w3.org/TR/payment-request/#abort). Esto es particularmente útil cuando se acaba el tiempo de la sesión de compras o se agota un elemento en el carrito durante la transacción.

Usa este método si la app tiene que cancelar la solicitud de pago después de llamar al método `show()` pero antes de que se haya resuelto la promesa. Por ejemplo, si un elemento ya no está disponible, o si el usuario falla en la confirmación de la compra dentro de cantidad de tiempo asignado.

So abortas una solicitud, deberás crear una nueva instancia de `PaymentRequest` antes de volver a llamar a `show()`.


    var paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort().then(function() {
        console.log('Payment timed out after 20 minutes.');
      }).catch(function() {
        console.log('Unable to abort.');
      });
    }, 20 * 60 * 1000);  /* 20 minutes */


*Método abort de PaymentRequest*

### Procesar la PaymentResponse {: # process-paymentresponse}
Una vez que un usuario aprueba una solicitud de pago, la promesa del método [`show()`](https://www.w3.org/TR/payment-request/#show) se resuelve y da como resultado un objeto `PaymentResponse`.

<table class="properties responsive">
<tr>
  <th colspan="2"><code>PaymentResponse</code> tiene los siguientes campos:</th>
</tr>
<tr>
  <td><code>methodName</code></td>
  <td>Cadena que indica el método de pago seleccionado (p. ej., visa)</td>
</tr>
<tr>
  <td><code>details</code></td>
  <td>Un diccionario que contiene información para <code>methodName</code></td>
</tr>
<tr>
  <td><code>shippingAddress</code></td>
  <td>La dirección de envío del usuario, si así se solicita</td>
</tr>
<tr>
  <td><code>shippingOption</code></td>
  <td>El ID de la opción de envío seleccionada, si así se lo solicita</td>
</tr>
<tr>
  <td><code>payerEmail</code></td>
  <td>La dirección de correo electrónico del ordenante, si así se lo solicita</td>
</tr>
<tr>
  <td><code>payerPhone</code></td>
  <td>El número de teléfono del ordenante, si así se lo solicita</td>
</tr>
<tr>
  <td><code>payerName</code></td>
  <td>El nombre del ordenante, si así se lo solicita</td>
</tr>
</table>


Para pagos con tarjeta de crédito, la respuesta es estandarizada. Para pagos que no se realicen con tarjeta de crédito (p. ej., Android Pay), el proveedor documentará la respuesta. Una respuesta para tarjeta de crédito contiene el siguiente diccionario:

`cardholderName`
`cardNumber`
`expiryMonth`
`expiryYear`
`cardSecurityCode`
`billingAddress`

Después de recibir la información de pago, la app debe enviar la información de pago a tu procesador de pagos para que este la procese. La IU mostrará un indicador de carga mientras se realiza la solicitud. Cuando se obtiene una respuesta, la app debe llamar a `complete()` para cerrar la IU.


    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string, e.g. “visa”
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details
      };
      return fetch('/pay', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paymentData)
      }).then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw 'Payment Error';
        }
      }).then(res => {
        paymentResponse.complete("success");
      }, err => {
        paymentResponse.complete("fail");
      });
    }).catch(err => {
      console.error("Uh oh, something bad happened", err.message);
    });


<div class="attempt-left">
  <figure>
    <img src="images/8_card_verified.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>

El método [`complete()`](https://www.w3.org/TR/payment-request/#complete) indica al usuario-agente que ha finalizado la interacción del usuario y permite que la app notifique al usuario el resultado y aborde la disposición de los elementos restantes de la IU.

<div style="clear:both;"></div>

    paymentResponse.complete('success').then(() => {
      // Success UI
    }

    paymentResponse.complete('fail').then(() => {
      // Error UI
    };


*Método complete de PaymentRequest*

## Recolectar una dirección de envío {: #shipping-address }

<div class="attempt-left">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>

Si eres un comerciante que vende bienes físicos, tal vez quieras obtener la dirección de envío del usuario usando la Payment Request API. Esto se logra agregando `requestShipping: true` al parámetro `options`. Con este parámetro configurado, se agregará “Shipping” a la IU y los usuarios podrán seleccionar entre una lista de direcciones guardadas o agregar una nueva dirección de envío.

Como alternativa, puedes usar "entrega" o "recolección" en lugar de "envío" en la IU especificando `shippingType`. Esto es exclusivo para propósitos de visualización.

<div style="clear:both;"></div>

Note: <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> tiene que ser <code>undefined</code> o un conjunto vacío tras la inicialización para recibir el evento <code>shippingaddresschange</code>. De lo contrario, el evento no se ejecutará.


    var options = {
      requestShipping: true,
      shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
    };

    var request = new PaymentRequest(methodData, details, options);


*Opciones de transacción*

<div class="attempt-right">
  <figure>
    <img src="images/9.5_address_rejected.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>

Las opciones de envío se pueden calcular de forma dinámica cada vez que un usuario seleccione o agregue una nueva dirección de envío. Puedes agregar un receptor de eventos para el evento `shippingaddresschange`, que activa la selección de una dirección de envío por parte del usuario. Luego puedes validar la capacidad de realizar envíos a esa dirección, calcular las opciones de envío y actualizar tu [`details`](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary)`.shippingOptions` con las opciones de envío y los datos de pago nuevos. Puedes ofrecer una opción de envío predeterminada fijando `selected` en `true` para una opción.

Para rechazar una dirección por encontrarse, por ejemplo, en una zona no admitida, pasa una matriz vacía a `details.shippingOptions`. La IU indicará al usuario que no se realizan envíos a la dirección seleccionada.

<div style="clear:both;"></div>

Note: Resolver el evento <code>shippingaddresschange</code> y dejar <code>details.shippingOptions</code> como un conjunto vacío también significa el rechazo de una dirección (en otras palabras no puedes realizar envíos a esa ubicación). Asegúrate siempre de que las opciones de envío estén actualizadas y coincidan con la dirección proporcionada por el usuario.


    request.addEventListener('shippingaddresschange', e => {
      e.updateWith(((details, addr) => {
        if (addr.country === 'US') {
          var shippingOption = {
            id: '',
            label: '',
            amount: {currency: 'USD', value: '0.00'},
            selected: true
          };
          if (addr.region === 'US') {
            shippingOption.id = 'us';
            shippingOption.label = 'Standard shipping in US';
            shippingOption.amount.value = '0.00';
            details.total.amount.value = '55.00';
          } else {
            shippingOption.id = 'others';
            shippingOption.label = 'International shipping';
            shippingOption.amount.value = '10.00';
            details.total.amount.value = '65.00';
          }
          if (details.displayItems.length === 2) {
            details.displayItems.splice(1, 0, shippingOption);
          } else {
            details.displayItems.splice(1, 1, shippingOption);
          }
          details.shippingOptions = [shippingOption];
        } else {
          details.shippingOptions = [];
        }
        return Promise.resolve(details);
      })(details, request.shippingAddress));
    });



<div class="attempt-right">
  <figure>
    <img src="images/10_shipping_address.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>

Una vez que el usuario apruebe una solicitud de pago, se resolverá la promesa del método [`show()`](https://www.w3.org/TR/payment-request/#show). La app puede usar la propiedad `.shippingAddress` del objeto [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) para informar al procesador de pagos la dirección de envío, junto con otras propiedades.

<div style="clear:both;"></div>


    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON()
      };
      // Send information to the server
    });



## Adición de opciones de envío {: #shipping-options}
Si tu servicio permite a los usuarios seleccionar opciones de envío, como “free”, “standard” o “express”, puedes hacer lo mismo a través de la IU de PaymentRequest. Para ofrecer esas opciones, agrega la propiedad  [`shippingOptions`](https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary) y sus opciones al objeto `details`. Al configurar una opción para `selected: true`, la IU la representará como preseleccionada (lo cual significa que el monto total debe reflejar el precio para la opción de envío en cuestión).


    var details = {
      total: {label: 'Donation', amount: {currency: 'USD', value: '55.00'}},
      displayItems: [
        {
          label: 'Original donation amount',
          amount: {currency: 'USD', value: '65.00'}
        },
        {
          label: 'Friends and family discount',
          amount: {currency: 'USD', value: '-10.00'}
        }
      ],
      shippingOptions: [
        {
          id: 'standard',
          label: 'Standard shipping',
          amount: {currency: 'USD', value: '0.00'},
          selected: true
        },
        {
          id: 'express',
          label: 'Express shipping',
          amount: {currency: 'USD', value: '12.00'}
        }
      ]
    };
    var request = new PaymentRequest(methodData, details, options);


Note: Como indicamos antes, <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> debe ser <code>undefined</code> o una matriz vacía luego de la inicialización para recibir el evento <code>shippingaddresschange</code>. Establece este valor en la inicialización solo cuando las opciones de envío no cambien en función de la dirección (como el envío internacional gratuito).

La modificación de las opciones de envío puede implicar precios diferentes. Para agregar el costo de envío y modificar el precio total, puedes agregar un receptor de eventos para el evento `shippingoptionchange`, que activa la selección de una opción por parte del usuario, de modo que puedas ejecutar un examen programático de los datos de la opción. También puedes cambiar el costo de envío según la dirección de envío.


    request.addEventListener('shippingoptionchange', e => {
      e.updateWith(((details, shippingOption) => {
        var selectedShippingOption;
        var otherShippingOption;
        if (shippingOption === 'standard') {
          selectedShippingOption = details.shippingOptions[0];
          otherShippingOption = details.shippingOptions[1];
          details.total.amount.value = '55.00';
        } else {
          selectedShippingOption = details.shippingOptions[1];
          otherShippingOption = details.shippingOptions[0];
          details.total.amount.value = '67.00';
        }
        if (details.displayItems.length === 2) {
          details.displayItems.splice(1, 0, selectedShippingOption);
        } else {
          details.displayItems.splice(1, 1, selectedShippingOption);
        }
        selectedShippingOption.selected = true;
        otherShippingOption.selected = false;
        return Promise.resolve(details);
      })(details, request.shippingOption));
    });


<div class="attempt-right">
  <figure>
    <img src="images/11_shipping_options.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>

Una vez que el usuario apruebe una solicitud de pago, se resolverá la promesa del método [`show()`](https://www.w3.org/TR/payment-request/#show). La app puede usar la propiedad `.shippingOption` del objeto [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) para informar al procesador de pagos la opción de envío, junto con otras propiedades.

<div style="clear:both;"></div>

    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON(),
        // shipping option
        shippingOption: paymentResponse.shippingOption
      };
      // Send information to the server
    });



## Agregar información opcional de contacto {: #contact-information}
También puedes obtener la dirección de correo electrónico, el número de teléfono o el nombre de un usuario al configurar el objeto `options`.


    var options = {
      requestPayerPhone: true,  // Request user's phone number
      requestPayerEmail: true,  // Request user's email address
      requestPayerName:  true   // Request user's name
    };

    var request = new PaymentRequest(methodData, details, options);


<div class="attempt-right">
  <figure>
    <img src="images/12_contact_details.png" >
    <figcaption>Interfaz de Payment Request</figcaption>
  </figure>
</div>

Una vez que el usuario apruebe una solicitud de pago, se resolverá la promesa del método [`show()`](https://www.w3.org/TR/payment-request/#show). La app puede usar las propiedades `.payerPhone`, `.payerEmail` y `.payerName` del objeto [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) para informarle al procesador de pagos de la opción del usuario, junto con otras propiedades.

<div style="clear:both;"></div>

    request.show().then(paymentResponse => {
      var paymentData = {
        // payment method string
        method: paymentResponse.methodName,
        // payment details as you requested
        details: paymentResponse.details.toJSON(),
        // shipping address information
        address: paymentResponse.shippingAddress.toJSON(),
        // shipping option string
        shippingOption: paymentResponse.shippingOption,
        // payer's phone number string
        phone: paymentResponse.payerPhone,
        // payer's email address string
        email: paymentResponse.payerEmail,
        // payer's name string
        name: paymentResponse.payerName
      };
      // Send information to the server
    });



## Hacer de Payment Request una mejora progresiva {: #request-progressive}
Como la Payment Request API es una función emergente, muchos navegadores no la admiten. Para determinar si la función está disponible, consulta `window.PaymentRequest`.


    if (window.PaymentRequest) {
      // PaymentRequest supported
      // Continue with PaymentRequest API
    } else {
      // PaymentRequest NOT supported
      // Continue with existing form based solution
    }

Note: Es mejor tener un vínculo normal con el proceso regular de finalización de pago. Luego usa JavaScript para evitar la navegación si PaymentRequest es compatible.

## Todo junto {: #putting-them-together}


    function onBuyClicked(event) {
      if (!window.PaymentRequest) {
        return;
      }
      // Payment Request API is available.
      // Stop the default anchor redirect.
      event.preventDefault();

      var supportedInstruments = [{
        supportedMethods: [
          'visa', 'mastercard', 'amex', 'discover', 'maestro',
          'diners', 'jcb', 'unionpay', 'bitcoin'
        ]
      }];

      var details = {
        displayItems: [{
          label: 'Original donation amount',
          amount: { currency: 'USD', value: '65.00' }
        }, {
          label: 'Friends and family discount',
          amount: { currency: 'USD', value: '-10.00' }
        }],
        total: {
          label: 'Total due',
          amount: { currency: 'USD', value : '55.00' }
        }
      };

      var options = {
        requestShipping: true,
        requestPayerEmail: true,
        requestPayerPhone: true,
        requestPayerName: true
      };

      // Initialization
      var request = new PaymentRequest(supportedInstruments, details, options);

      // When user selects a shipping address
      request.addEventListener('shippingaddresschange', e => {
        e.updateWith(((details, addr) => {
          var shippingOption = {
            id: '',
            label: '',
            amount: { currency: 'USD', value: '0.00' },
            selected: true
          };
          // Shipping to US is supported
          if (addr.country === 'US') {
            shippingOption.id = 'us';
            shippingOption.label = 'Standard shipping in US';
            shippingOption.amount.value = '0.00';
            details.total.amount.value = '55.00';
          // Shipping to JP is supported
          } else if (addr.country === 'JP') {
            shippingOption.id = 'jp';
            shippingOption.label = 'International shipping';
            shippingOption.amount.value = '10.00';
            details.total.amount.value = '65.00';
          // Shipping to elsewhere is unsupported
          } else {
            // Empty array indicates rejection of the address
            details.shippingOptions = [];
            return Promise.resolve(details);
          }
          // Hardcode for simplicity
          if (details.displayItems.length === 2) {
            details.displayItems[2] = shippingOption;
          } else {
            details.displayItems.push(shippingOption);
          }
          details.shippingOptions = [shippingOption];

          return Promise.resolve(details);
        })(details, request.shippingAddress));
      });

      // When user selects a shipping option
      request.addEventListener('shippingoptionchange', e => {
        e.updateWith(((details) => {
          // There should be only one option. Do nothing.
          return Promise.resolve(details);
        })(details));
      });

      // Show UI then continue with user payment info
      request.show().then(result => {
        // POST the result to the server
        return fetch('/pay', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(result.toJSON())
        }).then(res => {
          // Only if successful
          if (res.status === 200) {
            return res.json();
          } else {
            throw 'Failure';
          }
        }).then(response => {
          // You should have received a JSON object
          if (response.success == true) {
            return result.complete('success');
          } else {
            return result.complete('fail');
          }
        }).then(() => {
          console.log('Thank you!',
              result.shippingAddress.toJSON(),
              result.methodName,
              result.details.toJSON());
        }).catch(() => {
          return result.complete('fail');
        });
      }).catch(function(err) {
        console.error('Uh oh, something bad happened: ' + err.message);
      });
    }

    // Assuming an anchor is the target for the event listener.
    document.querySelector('#start').addEventListener('click', onBuyClicked);



{# wf_devsite_translation #}
