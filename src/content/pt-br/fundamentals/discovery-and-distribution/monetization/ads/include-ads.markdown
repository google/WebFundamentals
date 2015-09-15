---
title: "Como incluir os anúncios do Google AdSense em seu site"
description: "Siga as etapas para saber como incluir anúncios em seu site. Crie uma conta do Google AdSense, crie blocos de anúncios, veicule os blocos em seu site, configure as definições de pagamento e receba seus pagamentos."
updated_on: 2014-07-31
key-takeaways:
  tldr: 
    - "Para criar uma conta do Google AdSense, é preciso ter 18 anos, ter uma Conta do Google e fornecer seu endereço."
    - "Seu site deve estar ativo antes do envio da inscrição e o conteúdo do site deve estar em conformidade com as políticas do Google AdSense."
    - "Crie blocos de anúncios responsivos para garantir que o anúncio esteja adequado para qualquer dispositivo utilizado pelo usuário."
    - "Verifique as configurações de pagamento e espere o dinheiro começar a entrar."
notes:
  crawler:
    - "Certifique-se de que o rastreador do Google AdSense consegue acessar seu site (consulte <a href='https://support.google.com/adsense/answer/10532'>este tópico de ajuda</a>)."
  body:
    - "Cole todo o código do anúncio na tag de corpo, caso contrário, os anúncios não serão exibidos."
  smarttag:
    - "<code>data-ad-client</code> e <code>data-ad-slot</code> serão exclusivas para cada anúncio gerado."
    - "A tag <code>data-ad-format=auto</code> no código de anúncio gerado ativa o comportamento de dimensão inteligente para o bloco de anúncios responsivo."
---

<p class="intro">
  Siga as etapas para saber como incluir anúncios em seu site. Crie uma conta do Google AdSense, crie blocos de anúncios, veicule os blocos em seu site, configure as definições de pagamento e receba seus pagamentos.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Como criar página de exemplo com os anúncios

Neste passo a passo, você criará uma página simples com anúncios responsivos por meio do Google AdSense e do Web Starter Kit:

<img src="images/ad-ss-600.png" sizes="100vw" 
  srcset="images/ad-ss-1200.png 1200w, 
          images/ad-ss-900.png 900w,
          images/ad-ss-600.png 600w, 
          images/ad-ss-300.png 300w" 
  alt="Site de exemplo com anúncios para computador e celular">

Se você ainda não conhece o Web Start Kit, consulte a documentação [Configurar o Web Starter Kit]({{site.fundamentals}}/tools/setup/setup_kit.html), em inglês.

Para incluir anúncios em seu site e receber pagamentos, você precisa seguir estas etapas simples:

1. Criar uma conta do Google AdSense.
2. Criar blocos de anúncios.
3. Veicular blocos de anúncios em uma página.
4. Configurar definições de pagamento.

## Criar uma conta do Google AdSense
Para veicular anúncios em seu site, você precisará de uma conta ativa do Google AdSense. Se você ainda não tem uma conta do Google AdSense, será preciso [criá-la](https://www.google.com/adsense/) e concordar com os termos de serviço do Google AdSense.  Ao criar a conta, você precisa verificar:

* Que tem pelo menos 18 anos e possui uma Conta do Google verificada.
* Que possui um site ativo ou outro conteúdo on-line em conformidade com
[políticas do programa Google AdSense](https://support.google.com/adsense/answer/48182). Há anúncios hospedados neste site.
* Você tem um endereço postal e um endereço de e-mail associado à sua conta bancária, para poder receber os pagamentos.

## Criar blocos de anúncios

Um bloco de anúncios é um conjunto de anúncios exibidos em sua página em razão do JavaScript que você adiciona à sua página.  Você tem três opções de dimensionamento para os blocos de anúncios:

* **[Responsivo (Recomendado)](https://support.google.com/adsense/answer/3213689)**. 
* [Predefinido](https://support.google.com/adsense/answer/6002621).
* [Dimensão personalizada](https://support.google.com/adsense/answer/3289364).

Você está criando um site responsivo, use blocos de anúncios responsivos.
Os anúncios responsivos se redimensionam automaticamente com base no tamanho do dispositivo e na largura do contêiner pai.
Os anúncios responsivos atuam in-line com seu layout responsivo, garantindo que o site ficará bonito em qualquer dispositivo.

Se você não usar blocos de anúncios responsivos, será preciso escrever muito mais códigos para controlar como os anúncios são exibidos com base no dispositivo de um usuário. Mesmo se você especificar o tamanho exato de seus blocos de anúncios, utilize os blocos responsivos no [modo avançado]({{site.fundamentals}}/monetization/ads/customize-ads.html#what-if-responsive-sizing-isnt-enough).

Para simplificar o código e poupar tempo e esforço, o código do anúncio responsivo adapta automaticamente o tamanho do bloco de anúncios ao layout de sua página. 
O código calcula o tamanho necessário dinamicamente, com base na largura do contêiner pai do bloco de anúncios, e depois escolhe o tamanho de anúncio com o melhor desempenho que se encaixa no contêiner.
Por exemplo, um site otimizado para dispositivos móveis com largura de 360 px pode exibir um bloco de 320 x 50.

Rastreie os [tamanhos de anúncios com o melhor desempenho](https://support.google.com/adsense/answer/6002621#top) no [Guia de tamanhos de anúncios] do Google AdSense (https://support.google.com/adsense/answer/6002621#top).

### Para criar um bloco de anúncios responsivo

1. Acesse a [guia `Meus anúncios`](https://www.google.com/adsense/app#myads-springboard).
2. Clique em <strong>+Novo bloco de anúncios</strong>.
3. Forneça a seu bloco de anúncios um nome exclusivo. Esse nome é exibido no código de anúncio que é colado em seu site, então faça uma descrição.
4. Selecione <strong>Responsivo</strong> no menu suspenso `Tamanho do anúncio`.
5. Selecione <strong>Inserir anúncios gráficos e de texto</strong> no menu suspenso `Tipo de anúncio`.
6. Clique em <strong>Salvar e gerar código</strong>.
7. Na caixa <strong>Código de anúncio</strong> exibida, selecione a opção <strong>Dimensionamento inteligente (recomendado)</strong> no menu suspenso `Modo`. 
Esse é o modo recomendado e que não exige alterações em seu código de anúncio.

Depois de criar o bloco de anúncios, o Google AdSense fornece um snippet de código a ser incluído em seu site, semelhante ao código abaixo:

{% highlight html %}
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<!-- Top ad in web starter kit sample -->
<ins class="adsbygoogle"
  style="display:block"
  data-ad-client="XX-XXX-XXXXXXXXXXXXXXXX"
  data-ad-slot="XXXXXXXXXX"
  data-ad-format="auto"></ins>
<script>
  (adsbygoogle = window.adsbygoogle || []).push({});
</script>
{% endhighlight %}

{% include shared/remember.liquid title="Note" list=page.notes.smarttag %}

## Incluir blocos de anúncios em seu site

Para incluir o anúncio na página, precisamos colar o snippet fornecido pelo Google AdSense em sua marcação.  Se você deseja incluir vários anúncios, pode reutilizar o mesmo bloco de anúncios ou criar vários blocos de anúncios.

1. Abra o `index.html` na pasta `app`.
2. Cole o snippet fornecido na tag `main`.
3. Salve o arquivo e tente visualizá-lo no navegador, depois tente abri-lo em um dispositivo móvel ou pelo emulador do Google Chrome.

{% include shared/remember.liquid title="Remember" list=page.notes.body %}

<div>
  <a href="/web/fundamentals/resources/samples/monetization/ads/">
    <img src="images/ad-ss-600.png" sizes="100vw" 
      srcset="images/ad-ss-1200.png 1200w, 
              images/ad-ss-900.png 900w,
              images/ad-ss-600.png 600w, 
              images/ad-ss-300.png 300w" 
      alt="Site de exemplo com anúncios para computador e celular">
    <br>
    Tente
  </a>
</div>

## Configurar definições de pagamento

Está imaginando quando seu pagamento do Google AdSense será feito? Tentando descobrir se você será pago neste mês ou no próximo? Não deixe de concluir as etapas abaixo:

1. Verifique se você forneceu quaisquer informações fiscais necessárias no [perfil de recebedor](https://www.google.com/adsense/app#payments3/h=BILLING_PROFILE). 
2. Confirme se o nome e o endereço do recebedor estão corretos.
3. Selecione a forma de pagamento na [página `Configurações de pagamento`](https://www.google.com/adsense/app#payments3/h=ACCOUNT_SETTINGS).
4. Insira seu [número pessoal de identificação (PIN, na sigla em inglês)](https://support.google.com/adsense/answer/157667). Esse PIN confirma a exatidão de suas informações de conta.
5. Verifique se seu saldo atinge o [limite de pagamento](https://support.google.com/adsense/answer/1709871). 

Consulte a [Introdução aos pagamentos do Google AdSense](https://support.google.com/adsense/answer/1709858) caso tenha dúvidas adicionais.


