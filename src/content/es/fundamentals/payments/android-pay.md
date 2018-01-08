project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Android Pay permite compras en línea sencillas y seguras, y elimina la necesidad de que los usuarios recuerden e ingresen su información de pago en forma manual. Integra Android Pay para llegar a millones de usuarios de Android, impulsar más conversión y brindarles a los usuarios una verdadera experiencia de finalización de compra con un toque.

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-09-07 #}

# Integración de Android Pay en Payment Request {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

Android Pay permite sencillas y seguras compras en línea y elimina la
necesidad de que los usuarios recuerden e ingresen en forma manual su información de pago.
Integra Android Pay para llegar a millones de usuarios de Android, impulsar más
conversión y brindarles a los usuarios una verdadera experiencia de finalización de compra con un toque.

**Simple:** Aceptar Android Pay es sencillo y no requiere cambios en tu
procesamiento de pago. Las
[puertas de enlace de pago](/android-pay/) y
plataformas de procesamiento líderes también están agregando soporte para que sea más fácil para los
programadores habilitar Android Pay.

**Seguro:** Android Pay funciona almacenando en forma segura un número de cuenta virtual
que aplica asignaciones a la cuenta de pago de un usuario.  Esto permite compras en línea sin
que el usuario tenga que enviar su número real de tarjeta de crédito o débito.  Android Pay
encripta todas las transacciones de pago, manteniendo a salvo tus datos de usuario.

**Soporte:** Android Pay funciona en una creciente cantidad de países y con
una mayoría de importantes bancos y redes de tarjetas de crédito, y está disponible en todos los
teléfonos Android con KitKat o superior. Consulta esta
[página del centro de ayuda](https://support.google.com/androidpay/answer/6314169) para
consultar la documentación completa sobre disponibilidad según país y tipo de tarjeta.

## Cómo funciona

<style>
.figures {
  display: flex;
  flex-wrap: wrap;
}
figure {
  flex-basis: 240px;
  margin: 10px 5px;
  text-align: center;
  float: left;
}
</style>

<div class="figures">
  <figure>
    <img src="images/how_it_works_1.png">
    <figcaption>1. Presiona "Checkout".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_2.png">
    <figcaption>2. Aparece la IU de Payment Request.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.png">
    <figcaption>3. Elige el método de pago, etc., y presiona "Pay".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.png">
    <figcaption>4. Cuando aparezca la app Android Pay, haz clic para continuar (puede ser que el usuario tenga que desbloquear el teléfono/autenticar con huella digital)</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.png">
    <figcaption>5. Se ha completado la finalización de la compra.</figcaption>
  </figure>
</div>

## Preparación

### Conocimiento obligatorio

* Debido a que Android Pay en Chrome usa la API Payment Request, es fundamental que te familiarices con la [guía de integración](.) antes de continuar.
* Incluso si no eres programador de Android, será útil que conozcas las [API integradas de Android Pay](/android-pay/android/tutorial). Ya que las respuestas de Android Pay son las mismas en Android y en Chrome, la información sobre el manejo de respuestas es útil.
* Revisa las [políticas de contenido](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1) detalladas de Android Pay para asegurarte de que tus bienes o servicios específicos sean compatibles.

### Configuración del entorno

* Asegúrate de tener la app Android Pay instalada en tu dispositivo. Tienes que estar en uno de los países compatibles para instalarla. Consulta en [android.com/pay](https://www.android.com/pay/){: .external } para saber si tu país es compatible.
* Para pruebas, tienes que [agregar una tarjeta de crédito](https://support.google.com/androidpay/answer/6289372) a Android Pay en tu dispositivo.
* Regístrate en Android Pay
    * Agrega tu empresa, lugar de origen, un correo electrónico de tu empresa, etc. a través de [este formulario.](https://androidpay.developers.google.com/signup)
* Asegúrate de que [tu procesador/puerta de enlace de pago sea compatible con los tokens de Android Pay](/android-pay/#processors).
* Adquiere un par de claves que se usan para encriptar la respuesta de Android Pay si usas [el enfoque de token de red](#integration-using-network-token).
    * Google recomienda que trabajes con tu procesador de pago para obtener un clave pública. Esto simplifica el proceso, ya que tu procesador podrá controlar la desencriptación de la carga de Android Pay. Encuentra más información en la documentación de tu procesador de pago.
    * Si deseas encargarte de manejar la encriptación, consulta [Criptografía de token de pago](/android-pay/integration/payment-token-cryptography) para generar una clave Elliptic Curve Integrated Encryption codificada en base64.

## Integración de Android Pay en Payment Request
Con Android Pay para la Payment Request API, puedes solicitar uno de dos tipos de token de pago: puerta de enlace o red. Si usas Braintree, Stripe o Vantiv como puerta de enlace de pago, puedes solicitar un token de puerta de enlace de Android Pay. Si no, puedes solicitar un paquete de tokens de red encriptado. Puedes encargarte de controlar el token de red o puedes trabajar con tu procesador para manejar la desencriptación del paquete de tokens.

### Enfoque de token de puerta de enlace
Android Pay no procesa el pago. El comerciante igualmente tendría que invocar las API de puerta de enlace para cargar/procesar el token de puerta de enlace devuelto de Android Pay.

Deja que la API de Android Pay devuelva un token de puerta de enlace. Este es el flujo recomendado si usas Braintree, Stripe o Vantiv.

<a href="images/gateway_token.png" target="_blank"><img src="images/gateway_token.png"></a>

### Enfoque de token de red
Deja que la API de Android Pay devuelva un paquete de tokens de red encriptado. Puedes encargarte de desencriptar los tokens o puedes usar APIs de tu procesador para controlar la desencriptación y cargar el token.

<a href="images/network_token.png" target="_blank"><img src="images/network_token.png"></a>

## Integración del uso de token de puerta de enlace
El siguiente ejemplo detalla cómo solicitar un token directamente de tu puerta de enlace de pago. En este ejemplo, detallamos cómo solicitar un token de Stripe. Si usas otras puertas de enlace de pago como Braintree o Vantiv comunícate con tu procesador para conocer los parámetros específicos de puerta de enlace de pago.

Para solicitar un token de puerta de enlace, Android Pay llama al procesador en tu nombre y devuelve un token de puerta de enlace cargable.

#### Parámetros


    var supportedInstruments = [
      {
        supportedMethods: ['amex', 'discover','mastercard','visa']
      },
      {
        supportedMethods: ['https://android.com/pay'],
        data: {
          //merchant ID obtained from Google that maps to your origin
          merchantId: '02510116604241796260',
          environment: 'TEST',
          // Credit Cards allowed via Android Pay
          allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER'],
          paymentMethodTokenizationParameters: {
            tokenizationType: 'GATEWAY_TOKEN',
            parameters: {
              'gateway': 'stripe',
              // Place your own Stripe publishable key here.
              'stripe:publishableKey': 'pk_live_fD7ggZCtrB0vJNApRX5TyJ9T',
              'stripe:version': '2016-07-06'
            }
          }
        }
      }
    ];


Para usar Android Pay con el enfoque de token de puerta de enlace, agrega un objeto JSON que contenga los siguientes parámetros según el ejemplo anterior.

* `supportedMethods: [ 'https://android.com/pay' ]`: Indica que este es un método de pago usando Android Pay.
* `data`: Estos son valores específicos de Android Pay que aún no están estandarizados.
    * `merchantId`: El ID de comerciante de Android Pay que obtuviste al [registrarte en Android Pay](https://androidpay.developers.google.com/signup).
    * `environment:'TEST'`: Agrega esto si estás haciendo pruebas con Android Pay. El token de puerta de enlace generado no será válido.
    * `allowedCardNetworks`: Brinda una variedad de redes de tarjetas de crédito que constituyan una respuesta válida de Android Pay. Acepta "AMEX", "DISCOVER", "MASTERCARD" y "VISA".
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType`: 'GATEWAY_TOKEN': Indica que estás tomando el enfoque de token de puerta de enlace.
        * `parameters`: Parámetros específicos de la puerta de enlace de pago. Consulta la documentación específica de la puerta de enlace de pago.

#### Manejo de la respuesta de Android Pay
Después de que agregas el objeto de Android Pay, Chrome puede solicitar un token de puerta de enlace cargable.

    var payment = new PaymentRequest(
      supportedInstruments, // required payment method data
      details,              // required information about transaction
      options               // optional parameter for things like shipping, etc.
    );

    payment.show().then(function(response) {
      // Process response
      response.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


La respuesta de PaymentRequest contendrá la información de contacto y de envío como en los ejemplos detallados en la [guía de integración de PaymentRequest](.), pero ahora incluye una respuesta adicional de Android Pay que contiene

* Información de dirección de facturación
* Información de contacto
* Información del instrumento de pago
* Detalles del token de pago

Cómo controlar un token de puerta de enlace enviado depende de la puerta de enlace de pago. Consulta la documentación específica de la puerta de enlace para obtener más información.

#### Revisión general


    function onBuyClicked() {
      const ANDROID_PAY = 'https://android.com/pay';

      if (!window.PaymentRequest) {
        // PaymentRequest API is not available. Forwarding to
        // legacy form based experience.
        location.href = '/checkout';
        return;
      }

      var supportedInstruments = [
        {
          supportedMethods: [
            'visa', 'mastercard', 'amex', 'discover', 'maestro',
            'diners', 'jcb', 'unionpay', 'bitcoin'
          ]
        },
        {
          supportedMethods: [ ANDROID_PAY ],
          data: {
            merchantId: '02510116604241796260',
            environment: 'TEST',
            allowedCardNetwork: [ 'AMEX', 'MASTERCARD', 'VISA', 'DISCOVER' ],
            paymentMethodTokenizationParameters: {
              tokenizationType: 'GATEWAY_TOKEN',
              parameters: {
                'gateway': 'stripe',
                'stripe:publishableKey': 'pk_live_fD7ggZCtrB0vJNApRX5TyJ9T',
                'stripe:version': '2016-07-06'
              }
            }
          }
        }
      ];

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

    document.querySelector('#start').addEventListener('click', onBuyClicked);


### Integración a través del uso de token de red
La solicitud de un token de red requiere que se incluyan dos datos en la PaymentRequest.

1. `merchantId` obtenido durante el registro
1. `publicKey` pasado como parte de los `paymentMethodTokenizationParameters`

#### Parámetros


    var supportedInstruments = [
      {
        supportedMethods: ['amex', 'discover','mastercard','visa']
      },
      {
        supportedMethods: ['https://android.com/pay'],
        data: {
          //merchant ID obtained from Google that maps to your origin
          merchantId: '02510116604241796260',
          environment: 'TEST',
          allowedCardNetworks: ['AMEX', 'MASTERCARD', 'VISA', 'DISCOVER'],
          paymentMethodTokenizationParameters: {
            tokenizationType: 'NETWORK_TOKEN',
            parameters: {
              //public key to encrypt response from Android Pay
              'publicKey': 'BC9u7amr4kFD8qsdxnEfWV7RPDR9v4gLLkx3jfyaGOvxBoEuLZKE0Tt5O/2jMMxJ9axHpAZD2Jhi4E74nqxr944='
            }
          }
        }
      }
    ];


Para usar Android Pay con el enfoque de token de red, agrega un objeto JSON que contenga los siguientes parámetros según el ejemplo anterior.

* `supportedMethods: [ 'https://android.com/pay' ]`: Indica que este es un método de pago usando Android Pay.
* `data`:
    * `merchantId`: El ID de comerciante de Android Pay que obtuviste al [registrarte en Android Pay](https://androidpay.developers.google.com/signup).
    * `environment:'TEST'`: Agrega esto si estás haciendo pruebas con Android Pay. El token generado no será válido.  Para entorno de producción, quita esta línea.
    * `allowedCardNetworks`: Brinda una variedad de redes de tarjetas de crédito que constituyan una respuesta válida de Android Pay.
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType: 'NETWORK_TOKEN'`: Indica que estás tomando el enfoque de token de red.
        * `parameters`: Se solicita clave pública para recibir un token de red. (Consulta [Cómo generar claves de encriptación](/android-pay/integration/gateway-processor-integration#retrieving-the-encrypted-payload).)

#### Manejo de la respuesta de Android Pay
Después de que agregas el objeto de Android Pay, Chrome puede solicitar un token de red cargable.


    var payment = new PaymentRequest(
      supportedInstruments, // required payment method data
      details,              // required information about transaction
      options               // optional parameter for things like shipping, etc.
    );

    payment.show().then(function(response) {
      // Process response
      response.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


La respuesta encriptada de PaymentRequest contendrá la información de contacto y de envío como en los ejemplos detallados en la [guía de integración de PaymentRequest](.), pero ahora incluye una respuesta adicional de Android Pay que contiene

* Información de tarjeta de crédito en token
* Información de dirección de facturación
* Información del instrumento de pago
* Detalles del token de pago

Para una integración mas sencilla de tokens de red, recomendamos pasarle la carga encriptada directamente a tu puerta de enlace de pago y permitirle manejar la desencriptación.  Es más complejo que tú te encargues de la desencriptación de la carga e involucra manejo de claves privadas.  Comunícate con tu puerta de enlace de pago para ver si esta funcionalidad está disponible.

Cómo controlar un token de red enviado depende de la puerta de enlace de pago. Consulta la documentación específica de la puerta de enlace para obtener más información.

Aquí se omite un ejemplo de código, ya que no hay diferencia con el enfoque de token de puerta de enlace, excepto en la construcción del objeto de PaymentRequest.


{# wf_devsite_translation #}
