project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O Android Pay oferece segurança e simplicidade para as compras on-line e elimina a necessidade de os usuários lembrarem e digitarem seus dados de pagamento. Integre o Android Pay para atingir milhões de usuários Android, aumentar as taxas de conversão e dar aos usuários a verdadeira experiência de compra com um toque.

{# wf_updated_on: 2016-12-06 #}
{# wf_published_on: 2016-09-07 #}

# Como integrar o Android Pay ao Payment Request {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/sieke.html" %}

O Android Pay oferece segurança e simplicidade para as compras on-line e evita
que os usuários precisem lembrar e digitar seus dados de pagamento.
Integre o Android Pay para atingir milhões de usuários Android, aumentar as
taxas de conversão e dar aos usuários a verdadeira experiência de compra com um toque.

**Simples:** aceitar o Android Pay é fácil e não exige mudança no processamento
dos pagamentos. Os principais
[gateways de pagamento](/android-pay/)
e plataformas de processamento também estão começando a oferecer suporte para facilitar ainda mais o uso
do Android Pay para os desenvolvedores.

**Seguro:** o Android Pay armazena com segurança um número de conta virtual
ligada à conta de pagamento de um usuário.  Isso permite ao usuário
comprar on-line sem precisar informar o número real do seu cartão de crédito ou débito.  O Android Pay
criptografa todas as transações, mantendo os dados do usuário seguros.

**Suporte:** o Android Pay funciona em cada vez mais países,
é compatível com a maioria dos principais bancos e operadoras de cartão de crédito e está disponível em todos os
Android Phones que têm a versão KitKat ou mais recente. Acesse essa
[página da central de ajuda](https://support.google.com/androidpay/answer/6314169) para
ver a documentação completa sobre a disponibilidade do Pay por país e tipo de cartão.

## Como funciona

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
    <figcaption>1. Clique em "Finalizar compra".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_2.png">
    <figcaption>2. Uma tela do Payment Request aparece.</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_3.png">
    <figcaption>3. Escolha o método de pagamento e outras preferências e clique em "Pagar".</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_4.png">
    <figcaption>4. Quando o aplicativo do Android Pay aparecer, clique para continuar (o usuário pode precisar desbloquear o celular ou autenticar com impressão digital)</figcaption>
  </figure>
  <figure>
    <img src="images/how_it_works_5.png">
    <figcaption>5. A compra foi concluída.</figcaption>
  </figure>
</div>

## Como se preparar

### Conhecimento necessário

* Como o Android Pay do Chrome usa a PaymentRequest API, é fundamental ler o [guia de integração](.) antes de continuar.
* Mesmo que você não seja um desenvolvedor Android, será útil se ambientar com as [Android Pay in-app APIs](/android-pay/android/tutorial). Como as respostas retornadas pelo Android Pay são iguais no Android e no Chrome, as informações sobre gerenciamento de respostas são úteis.
* Confira as [políticas de conteúdo](https://support.google.com/payments/merchant/answer/75724?payments_to_biz=&rd=1) detalhadas do Android Pay para ter certeza de que seus bens e serviços são compatíveis.

### Como configurar o ambiente

* É necessário ter o aplicativo do Android Pay instalado no dispositivo e estar em um dos países suportados para instalá-lo. Dê uma olhada em [android.com/pay](https://www.android.com/pay/){: .external } para ver se o seu país oferece suporte ao Pay.
* Para testar, você precisa [adicionar um cartão de crédito](https://support.google.com/androidpay/answer/6289372) ao Android Pay pelo seu dispositivo.
* Cadastro no Android Pay
    * Adicione o nome da sua empresa, a origem do site, um e-mail profissional etc. usando [este formulário](https://androidpay.developers.google.com/signup).
* Confirme que o [seu gateway/processador de pagamentos oferece suporte aos tokens do Android Pay](/android-pay/#processors).
* Adquira um par de chaves usado para criptografar a resposta do Android Pay se estiver usando [a abordagem de token na rede](#integration-using-network-token).
    * O Google recomenda entrar em contato com o seu processador de pagamentos para obter uma chave pública. Isso simplifica o processo, porque o processador poderá operar a descriptografia dos dados enviados pelo Android Pay. Acesse a documentação do seu processador de pagamentos para saber mais.
    * Se quiser lidar com a criptografia por conta própria, consulte [Criptografia de token de pagamento](/android-pay/integration/payment-token-cryptography) para gerar uma chave de criptografia de curvas elípticas integrada e codificada em base64.

## Como integrar o Android Pay ao Payment Request
Com o Android Pay for Payment Request API, você pode solicitar um dos dois tipos de token de pagamento: de gateway ou de rede. Se o seu gateway de pagamento for o Braintree, o Stripe ou o Vantiv, você pode solicitar um token de gateway pelo Android Pay. Se não, pode solicitar um pacote criptografado com o token de rede. Você ainda pode lidar com o token de rede por conta própria ou pedir o seu processador para operar o pacote do token.

### Abordagem do token de gateway
O Android Pay não processa pagamentos. O vendedor ainda precisaria invocar as APIs do gateway para carregar/processar o token de gateway retornado pelo Android Pay.

Deixe a Android Pay API retornar um token de gateway. Esse é o fluxograma recomendado se você estiver usando Braintree, Stripe ou Vantiv.

<a href="images/gateway_token.png" target="_blank"><img src="images/gateway_token.png"></a>

### Abordagem do token de rede
Deixe a Android Pay API retornar um pacote criptografado com o token de rede. Depois, você ainda pode descriptografar o token por conta própria ou usar as APIs do seu processador para operar a descriptografia e carregar o token.

<a href="images/network_token.png" target="_blank"><img src="images/network_token.png"></a>

## Integração usando token de gateway
O exemplo a seguir demonstra como solicitar um token diretamente pelo seu gateway de pagamento. Nesse exemplo, mostramos como solicitar um token do Stripe. Se você usa outro gateway de pagamento, como o Braintree ou o Vantiv, entre em contato com ele e peça que informem os parâmetros específicos dele.

Na solicitação de um token de gateway, o Android Pay chama o seu processador em seu nome e retorna um token de gateway carregável.

#### Parâmetros


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


Para usar o Android Pay com a abordagem de token de gateway, adicione um objeto JSON que contém os seguintes parâmetros, de acordo com o exemplo cima.

* `supportedMethods: [ 'https://android.com/pay' ]`: Indica que este é um método de pagamento que usa o Android Pay.
* `data`: valores específicos do Android Pay que ainda não foram padronizados.
    * `merchantId`: o ID de vendedor que você obteve ao [se cadastrar no Android Pay](https://androidpay.developers.google.com/signup).
    * `environment:'TEST'`: Adicione isto se estiver fazendo testes com o Android Pay. O token de gateway gerado não será válido.
    * `allowedCardNetworks`: fornece uma matriz de operadoras de cartão de crédito que constituem uma resposta válida do Android Pay. São aceitas "AMEX", "DISCOVER", "MASTERCARD" e "VISA".
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType`: 'GATEWAY_TOKEN': indica que você adotou a abordagem de token de gateway.
        * `parameters`: parâmetros específicos do gateway de pagamento. Consulte a documentação específica do seu gateway de pagamento.

#### Como gerenciar respostas do Android Pay
Depois de adicionar o objeto do Android Pay, o Chrome pode solicitar um token de gateway carregável.

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


A resposta do PaymentRequest conterá as informações de envio e de contato, como no exemplo do [guia de integração do PaymentRequest](.), mas agora com uma resposta adicional do Android Pay que contém:

* Informações do endereço de cobrança
* Dados de contato
* Informações do método de pagamento
* Detalhes do token de pagamento

A maneira com que você lida com um token de gateway enviado depende do gateway de pagamento. Consulte a documentação específica do gateway para saber mais.

#### Como tudo funciona em conjunto


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


### Integração usando token de rede
Para solicitar um token de rede, é preciso incluir duas informações no PaymentRequest.

1. O `merchantId`, obtido no ato do cadastro;
1. A `publicKey` passada como parte de `paymentMethodTokenizationParameters`.

#### Parâmetros


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


Para usar o Android Pay com a abordagem de token de gateway, adicione um objeto JSON que contenha os seguintes parâmetros, de acordo com o exemplo acima.

* `supportedMethods: [ 'https://android.com/pay' ]`: Indica que este é um método de pagamento que usa o Android Pay.
* `data`:
    * `merchantId`: o ID de vendedor que você obteve ao [se cadastrar no Android Pay](https://androidpay.developers.google.com/signup).
    * `environment:'TEST'`: Adicione isto se estiver fazendo testes com o Android Pay. O token gerado não será válido.  Para o ambiente de produção, remova essa linha.
    * `allowedCardNetworks`: fornece uma matriz de operadoras de cartão de crédito que constituem uma resposta válida do Android Pay.
    * `paymentMethodTokenizationParameters`:
        * `tokenizationType: 'NETWORK_TOKEN'`: indica que você adotou a abordagem de token de gateway.
        * `parameters`: chave pública necessária para receber um token de rede (leia [Como gerar chaves criptográficas](/android-pay/integration/gateway-processor-integration#retrieving-the-encrypted-payload)).

#### Como gerenciar respostas do Android Pay
Depois de adicionar o objeto do Android Pay, o Chrome pode solicitar um token de rede carregável.


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


A resposta criptografada do PaymentRequest conterá as informações de envio e de contato, como no exemplo do [guia de integração do PaymentRequest](.), mas agora com uma resposta adicional do Android Pay que contém:

* Dados de um cartão de crédito tokenizados
* Informações do endereço de cobrança
* Informações do método de pagamento
* Detalhes do token de pagamento

Se quiser uma integração mais simples de tokens de rede, recomendamos passar a carga criptografada diretamente para o gateway de pagamento e deixá-lo lidar com a descriptografia.  Descriptografar os dados por conta própria é mais complexo e envolve gerenciamento de chave privada.  Entre em contato com seu gateway de pagamento para ver se esse recurso é oferecido.

A maneira com que você lida com um token de rede enviado depende do gateway de pagamento. Consulte a documentação específica do gateway para saber mais.

Não oferecemos exemplo de código aqui porque a abordagem é a mesma aplicada para o token de gateway, exceto na criação do objeto PaymentRequest.


{# wf_devsite_translation #}
