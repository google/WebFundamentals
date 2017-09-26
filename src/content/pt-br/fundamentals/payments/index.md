project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A Payment Request API oferece pagamentos rápidos e fáceis na web.

{# wf_published_on: 2016-07-25 #}
{# wf_updated_on: 2016-12-06 #}

# Guia de integração da Payment Request API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/zkoch.html" %}

Dofgood: o `PaymentRequest` ainda está em desenvolvimento. Embora acreditemos que ele é estável
o suficiente para implementação, ainda pode continuar mudando. Vamos manter esta página atualizada para
sempre refletir a situação atual da API([alterações no M56](https://docs.google.com/document/d/1I8ha1ySrPWhx80EB4CVPmThkD4ILFM017AfOA5gEFg4/edit#)).
Enquanto isso, para se proteger contra as alterações da API que podem não ser retrocompatíveis,
estamos oferecendo [um paliativo](https://storage.googleapis.com/prshim/v1/payment-shim.js)
que pode ser incorporado ao seu site. O paliativo resolverá temporariamente todas as diferenças
de API entre as duas principais versões do Chrome.


A compra de mercadorias on-line é uma experiência conveniente, mas, muitas vezes, frustrante, particularmente em dispositivos móveis. Embora o tráfego de dispositivos móveis continue a crescer, as conversões móveis respondem apenas por cerca de um terço de todas as compras concluídas. Em outras palavras, os usuários abandonam as compras móveis duas vezes mais que nas compras em desktops. Por quê?

![](images/1_why_users_abandon.png)

*Por que os usuários abandonam formulários de compras móveis*

Os formulários de compras on-line exigem muita interação do usuário, são difíceis de usar, lentos para carregar e atualizar e exigem muitas etapas até a conclusão. Isso acontece porque dois componentes essenciais dos pagamentos on-line &mdash; segurança e conveniência &mdash; muitas vezes têm objetivos contrários. Normalmente, mais de um deles significa menos do outro.

A maioria dos problemas que leva ao abandono podem ser atribuídos diretamente aos formulários de compra. Cada aplicativo ou site tem seu próprio processo de entrada e validação de dados. Muitas vezes, os usuários descobrem que têm de inserir as mesmas informações em todos os pontos de compra dos aplicativos. Além disso, os desenvolvedores de aplicativos têm dificuldade para criar fluxos de compra que permitam vários métodos de pagamento únicos. Até mesmo pequenas diferenças nos requisitos de métodos de pagamento podem complicar o processo de preenchimento e envio do formulário.

Qualquer sistema que aprimore ou resolva um ou mais desses problemas será um mudança bem-vinda. Já começamos a resolver o problema com o [preenchimento automático](/web/updates/2015/06/checkout-faster-with-autofill). Mas agora queremos falar sobre uma solução mais abrangente.

## Introdução à Payment Request API {: #introducing }

A Payment Request API é um sistema que pretende *eliminar os formulários das compras*. Esse sistema melhora consideravelmente o fluxo de trabalho do usuário durante o processo de compra, oferecendo uma experiência do usuário mais consistente e permitindo que os comerciantes da Web usem facilmente métodos de pagamento heterogêneos. A Payment Request API não é um novo método de pagamento nem se integra diretamente a processadores de pagamento. Em vez disso, é uma camada de processo cujos objetivos são:

* Permitir que o navegador atue como um intermediário entre comerciantes, usuários e métodos de pagamento
* Padronizar ao máximo possível o fluxo de comunicações de pagamento
* Permitir métodos de pagamento seguros diferentes de forma integrada
* Funcionar em qualquer navegador, dispositivo ou plataforma &mdash; móvel ou não

A Payment Request API é um padrão aberto para todos os navegadores da Web que substitui fluxos de conclusão de compra tradicionais, permitindo que os comerciantes solicitem e aceitem qualquer pagamento em uma única chamada de API. A Payment Request API permite que a página da web troque informações com o user-agent enquanto o usuário fornece informações, ou seja, antes da aprovação ou recusa de uma solicitação de pagamento.

O melhor de tudo é que, com o navegador atuando como intermediário, todas as informações necessárias para concluir rapidamente a compra podem ser armazenadas no navegador, permitindo que os usuários confirmem e paguem com um único clique.

### Processo da transação de pagamento {: #transaction-process }
Com a Payment Request API, o processo da transação é o mais transparente possível para usuários e comerciantes.

![](images/4_the_payment_transaction_process.png)

*O processo de transação de pagamento*

O processo começa quando o site do comerciante cria um novo `PaymentRequest` e passa ao navegador todas as informações necessárias para fazer a compra: o valor a ser cobrado, a moeda esperada para o pagamento e os métodos de pagamento aceitos pelo site. O navegador determina a compatibilidade entre os métodos de pagamento aceitos pelo site e os métodos instalados pelo usuário no dispositivo de destino.

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>


Em seguida, o navegador apresenta a IU de pagamentos ao usuário, que seleciona um método de pagamento e autoriza a transação. Um método de pagamento pode ser simples como um cartão de crédito já armazenado no navegador ou complexo como um aplicativo de terceiros criado especificamente para fazer os pagamentos nesse site (essa funcionalidade estará disponível em breve). Depois que o usuário autorizar a transação, todos os detalhes de pagamento necessários serão enviados diretamente ao site. Por exemplo, para um pagamento com cartão de crédito, o site receberá um número de cartão, o nome do titular, uma data de validade e um CVC.

O Payment Request também pode ser estendido para retornar outras informações, como endereços, opções de envio, e-mail e telefone do pagador. Isso permite que você obtenha todas as informações necessárias para finalizar um pagamento sem mostrar um formulário de conclusão de compra ao usuário.


O novo processo apresenta três vantagens: do ponto de vista do usuário, todas as aquelas interações tediosas &mdash; como solicitação, autorização, pagamento e resultado &mdash; passam a ocorrer em uma única etapa. Do ponto de vista do site, só é preciso fazer uma única chamada à JavaScript API. E do ponto de vista do método de pagamento, não há nenhuma mudança no processo.

<div style="clear:both;"></div>

## Usar a Payment Request API {: #using }

### Carregar paliativo da Payment Request API

Para reduzir a dificuldade de acompanhar essa API padrão que muda constantemente, recomendamos
adicionar esse paliativo na seção `<head>` do código. Esse paliativo
será atualizado à medida que a API sofrer alterações e fará o possível para manter o seu código funcionando
em pelo menos 2 grandes versões do Chrome.


    <script src="https://storage.googleapis.com/prshim/v1/payment-shim.js">


### Criar uma PaymentRequest {: #create-paymentrequest }

A primeira etapa é criar um objeto [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-interface) chamando o construtor [`PaymentRequest`](https://www.w3.org/TR/payment-request/#paymentrequest-constructor). Normalmente (mas nem sempre), essa etapa é associada a uma ação iniciada pelo usuário, indicando sua intenção de fazer uma compra. O objeto é construído usando parâmetros que contém os dados necessários.

    var request = new PaymentRequest(
      methodData, // required payment method data
      details,    // required information about transaction
      options     // optional parameter for things like shipping, etc.
    );


*Construtor PaymentRequest*

#### O parâmetro "methodData" {: #methoddata-parameter }

O parâmetro `methodData` contém uma lista de métodos de pagamento compatíveis e, conforme a relevância, outras informações sobre o método de pagamento. Essa sequência contém dicionários de `PaymentMethodData`, incluindo identificadores padrão associados aos métodos de pagamento que o aplicativo pretende aceitar, e eventuais dados específicos dos métodos de pagamento. Consulte [Arquitetura da Payment Request API](https://w3c.github.io/browser-payment-api/specs/architecture.html) para obter mais detalhes.

Neste momento, o `PaymentRequest` no Chrome permite apenas estes cartões de crédito padrão: '`amex`', '`diners`', '`discover`', '`jcb`', '`maestro`', '`mastercard`', '`unionpay`', e '`visa`'.


    var methodData = [
      {
        supportedMethods: ["visa", "mastercard"]
      }
    ]


*Dados e métodos de pagamento*

#### O parâmetro "details" {: #details-parameter }

O parâmetro `details` contém informações sobre a transação. Há dois componentes principais: um total, que reflete o valor total e a moeda da cobrança, e um conjunto opcional de `displayItems` que indica como o valor final foi calculado. Esse parâmetro não pretende ser uma lista de itens de linha, mas sim um resumo dos principais componentes do pedido: subtotal, descontos, impostos, custos de envio, etc.

<div class="attempt-right">
  <figure>
    <img src="images/6_order_summary.png" >
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>

É importante observar que a Payment Request API não tem funcionalidades aritméticas. Ou seja, ele não garante que os componentes de exibição somam corretamente o valor total devido. O desenvolvedor é responsável por esses cálculos. Portanto, você deve sempre garantir que a soma dos itens de lista corresponde ao valor no total. Além disso, o `PaymentRequest` não permite reembolsos, ou seja, os valores devem sempre ser positivos (mas itens de lista individuais podem ser negativos, como descontos).

O navegador renderiza os rótulos à medida que você os define e renderiza automaticamente a formatação de moeda correta de acordo com a localidade do usuário. Observe que os rótulos devem ser renderizados no mesmo idioma que o conteúdo.

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


*Detalhes da transação*

Normalmente se usa `pending` para exibir itens que dependem da seleção do endereço e do método de envio, como valor dos impostos e custo do frete. O Chrome indica os campos pendentes na IU para a solicitação de pagamento.

Os valores repetidos ou calculados usados em `details` podem ser especificados como literais de string ou como variáveis de string individuais.


    var currency = "USD";
    var amount = "65.00";
    var discount = "-10.00";
    var total = "55.00";


*Variáveis do PaymentRequest*

### Exibir o PaymentRequest {: #display-paymentrequest }

<div class="attempt-left">
  <figure>
    <img src="images/7_display_payment_request.png" >
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>

Ative a interface `PaymentRequest` chamando seu método [`show()`](https://www.w3.org/TR/payment-request/#show). Esse método invoca uma IU nativa que permite que o usuário examine os detalhes da compra, adicione ou altere informações e, finalmente, pague. Uma [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (indicada por seu método `then()` e função de retorno de chamada) que resolve será retornada quando o usuário aceitar ou rejeitar a solicitação de pagamento.

<div style="clear:both;"></div>

    request.show().then(function(paymentResponse) {
      // Process paymentResponse here
      paymentResponse.complete("success");
    }).catch(function(err) {
      console.error("Uh oh, something bad happened", err.message);
    });


*Método show de PaymentRequest*

### Cancelar uma Payment Request {: #abort-paymentrequest }
Você pode cancelar uma `PaymentRequest` intencionalmente chamando o método [`abort()`](https://www.w3.org/TR/payment-request/#abort). Isso é muito útil quando a sessão de compra expira ou um item do carrinho acaba no estoque durante a transação.

Use esse método se o aplicativo precisar cancelar a solicitação de pagamento após a chamada do método `show()`, mas antes de a promessa ser resolvida &mdash; por exemplo, se um item não estiver mais disponível, ou se o usuário não confirmar a compra dentro do período permitido.

Se você cancelar uma solicitação, precisará criar uma nova instância de `PaymentRequest` antes de chamar `show()` novamente.


    var paymentTimeout = window.setTimeout(function() {
      window.clearTimeout(paymentTimeout);
      request.abort().then(function() {
        console.log('Payment timed out after 20 minutes.');
      }).catch(function() {
        console.log('Unable to abort.');
      });
    }, 20 * 60 * 1000);  /* 20 minutes */


*Método abort de PaymentRequest*

### Processar a PaymentResponse {: # process-paymentresponse}
Depois que o usuário aprovar uma solicitação de pagamento, a promessa do método [`show()`](https://www.w3.org/TR/payment-request/#show) é atendida, gerando um objeto `PaymentResponse`.

<table class="properties responsive">
<tr>
  <th colspan="2"><code>PaymentResponse</code> tem os seguintes campos:</th>
</tr>
<tr>
  <td><code>methodName</code></td>
  <td>Uma string que indica o método de pagamento escolhido (por exemplo, Visa)</td>
</tr>
<tr>
  <td><code>details</code></td>
  <td>Um dicionário que contém informações para <code>methodName</code></td>
</tr>
<tr>
  <td><code>shippingAddress</code></td>
  <td>O endereço de envio do usuário, se solicitado</td>
</tr>
<tr>
  <td><code>shippingOption</code></td>
  <td>O ID da opção de envio selecionada, se solicitado</td>
</tr>
<tr>
  <td><code>payerEmail</code></td>
  <td>O endereço de e-mail do pagador, se solicitado</td>
</tr>
<tr>
  <td><code>payerPhone</code></td>
  <td>O telefone do pagador, se solicitado</td>
</tr>
<tr>
  <td><code>payerName</code></td>
  <td>O nome do pagador, se solicitado</td>
</tr>
</table>


Para pagamentos com cartão de crédito, a resposta é padronizada. Para pagamentos sem cartão de crédito (por exemplo, Android Pay), a resposta é documentada pelo provedor. Uma resposta de cartão de crédito contém o seguinte dicionário:

`cardholderName`
`cardNumber`
`expiryMonth`
`expiryYear`
`cardSecurityCode`
`billingAddress`

Após receber as informações de pagamento, o aplicativo deve enviar as informações de pagamento para processamento pelo processador de pagamentos. A IU mostra um controle giratório enquanto a solicitação é efetuada. Quando a resposta chegar, o aplicativo deverá chamar `complete()` para fechar a IU.


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
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>

O método [`complete()`](https://www.w3.org/TR/payment-request/#complete) informa ao user-agent que a interação do usuário foi concluída e permite que o aplicativo notifique o usuário do resultado e determine a disposição dos elementos de IU restantes.

<div style="clear:both;"></div>

    paymentResponse.complete('success').then(() => {
      // Success UI
    }

    paymentResponse.complete('fail').then(() => {
      // Error UI
    };


*Método complete de PaymentRequest*

## Como obter um endereço de envio {: #shipping-address }

<div class="attempt-left">
  <figure>
    <img src="images/5_9_payment_request_ui.png" >
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>

Se você é um vendedor de produtos físicos, pode precisar obter o endereço de envio do usuário usando a Payment Request API. Isso é feito adicionando `requestShipping: true` ao parâmetro `options`. Com esse parâmetro definido, "Shipping" é adicionado à IU e os usuários podem selecionar em uma lista de endereços armazenados ou adicionar um novo endereço de envio.

Uma alternativa é usar "Delivery" ou "Pickup" em vez de "Shipping" na IU especificando `shippingType`. Isso funciona exclusivamente para fins de visualização.

<div style="clear:both;"></div>

Observação: <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> precisa ser <code>undefined</code> ou uma matriz vazia após inicialização para receber o evento <code>shippingaddresschange</code>. Caso contrário, o evento não será acionado.


    var options = {
      requestShipping: true,
      shippingType: "shipping" // "shipping"(default), "delivery" or "pickup"
    };

    var request = new PaymentRequest(methodData, details, options);


*Opções da transação*

<div class="attempt-right">
  <figure>
    <img src="images/9.5_address_rejected.png" >
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>

As opções de envio poderão ser calculadas dinamicamente sempre que um usuário selecionar ou adicionar um novo endereço de envio. Você pode adicionar um ouvinte de eventos ao evento `shippingaddresschange`, acionado quando o usuário seleciona um endereço de envio. Em seguida, você pode verificar a capacidade de enviar para esse endereço, calcular opções de envio e atualizar os [`details`](https://www.w3.org/TR/payment-request/#paymentdetails-dictionary)`.shippingOptions` com as novas opções de envio e informações de preço. Você pode oferecer uma opção padrão de envio definindo `selected` como `true` em uma opção.

Para rejeitar um endereço por motivos como uma região não permitida, passe uma matriz vazia para `details.shippingOptions`. A IU informará ao usuário que o endereço selecionado não está disponível para envio.

<div style="clear:both;"></div>

Observação: Resolver o evento <code>shippingaddresschange</code> e deixar <code>details.shippingOptions</code> como uma matriz vazia também significa rejeitar o endereço (ou seja, não é possível enviar para esse local). Verifique sempre se as opções de envio estão atualizadas e correspondem ao endereço fornecido pelo usuário.


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
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>

Após a aprovação da solicitação de pagamento pelo usuário, a promessa do método [`show()`](https://www.w3.org/TR/payment-request/#show) é resolvida. O aplicativo pode usar a propriedade `.shippingAddress` do objeto [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) para informar ao processador de pagamento o endereço de envio, juntamente com outras propriedades.

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



## Adicionar opções de envio {: #shipping-options}
Se o seu serviço permitir que os usuários selecionem opções de envio como "gratuito", "padrão" ou "expresso", você também poderá fazer isso por meio da IU do Payment Request. Para oferecer essas possibilidades, adicione a propriedade [`shippingOptions`](https://www.w3.org/TR/payment-request/#paymentshippingoption-dictionary) e suas opções ao objeto `details`. Se uma escolha for definida como `selected: true`, a IU a renderizará como pré-selecionada (o que significa que o valor total deverá refletir o preço dessa opção de envio).


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


Observação: Como observado anteriormente, <code><a href="https://www.w3.org/TR/payment-request/#paymentdetails-dictionary" target="_blank">details</a>.shippingOptions</code> precisa estar <code>undefined</code> ou ser uma matriz vazia na inicialização para receber eventos <code>shippingaddresschange</code>. Defina esse valor na inicialização apenas quando as opções de envio não serão alteradas com base no endereço (como no envio global gratuito).

A alteração das opções de envio pode ter preços diferentes. Para adicionar a taxa de envio e alterar o preço total, você pode adicionar um ouvinte de eventos ao evento `shippingoptionchange`, que é acionado quando o usuário seleciona uma opção de envio, permitindo a execução de um exame programático dos dados da opção. Você também pode alterar a taxa de envio dependendo do endereço de envio.


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
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>

Após a aprovação da solicitação de pagamento pelo usuário, a promessa do método [`show()`](https://www.w3.org/TR/payment-request/#show) é resolvida. O aplicativo pode usar a propriedade `.shippingOption` do objeto [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) para informar ao processador de pagamento a opção de envio, juntamente com outras propriedades.

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



## Adicionar informações de contato opcionais {: #contact-information}
Você pode obter o endereço de e-mail, número de telefone ou nome de um usuário configurando o objeto `options`.


    var options = {
      requestPayerPhone: true,  // Request user's phone number
      requestPayerEmail: true,  // Request user's email address
      requestPayerName:  true   // Request user's name
    };

    var request = new PaymentRequest(methodData, details, options);


<div class="attempt-right">
  <figure>
    <img src="images/12_contact_details.png" >
    <figcaption>Interface do Payment Request</figcaption>
  </figure>
</div>

Após a aprovação da solicitação de pagamento pelo usuário, a promessa do método [`show()`](https://www.w3.org/TR/payment-request/#show) é resolvida. O aplicativo pode usar as propriedades `.payerPhone`, `.payerEmail` e/ou `.payerName` do objeto [`PaymentResponse`](https://www.w3.org/TR/payment-request/#paymentresponse-interface) para informar ao processador do pagamento a escolha do usuário, além de outras propriedades.

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



## Fazer o PaymentRequest melhorar continuamente {: #request-progressive}
Como a Payment Request API é um recurso em ascensão, muitos navegadores ainda não oferecem suporte a ele. Para determinar se o recurso está disponível, consulte `window.PaymentRequest`.


    if (window.PaymentRequest) {
      // PaymentRequest supported
      // Continue with PaymentRequest API
    } else {
      // PaymentRequest NOT supported
      // Continue with existing form based solution
    }

Observação: é melhor ter um link normal para o processo de compra regular. Em seguida, use JavaScript para impedir a navegação se houver suporte ao PaymentRequest.

## Resumo de tudo isso {: #putting-them-together}


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
