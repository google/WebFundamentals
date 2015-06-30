---
layout: article
title: "Add a WebApp Manifest"
description: "O aplicativo Manifest for Web é um arquivo JSON simples que proporciona a você, desenvolvedor, a capacidade de controlar a aparência do seu aplicativo para o usuário nas áreas onde podem ver aplicativos (por exemplo, na tela inicial móvel), direcionar o que esses usuários podem acessar e, mais importante, como podem acessar. No futuro, o manifesto irá proporcionar ainda mais controle sobre seu aplicativo, mas no momento estamos apenas nos concentrando em como o seu aplicativo pode ser iniciado."
introduction: "O aplicativo Manifest for Web é um arquivo JSON simples que proporciona a você, desenvolvedor, a capacidade de controlar a aparência do seu aplicativo para o usuário nas áreas onde podem ver aplicativos (por exemplo, na tela inicial móvel), direcionar o que esses usuários podem acessar e, mais importante, como podem acessar. No futuro, o manifesto irá proporcionar ainda mais controle sobre seu aplicativo, mas no momento estamos apenas nos concentrando em como o seu aplicativo pode ser iniciado."
article:
  written_on: 2014-12-17
  updated_on: 2014-12-17
  order: 1
id: wapp-app-manifest
collection: stickyness
authors:
  - mattgaunt
  - paulkinlan
collection: stickyness
priority: 1
key-takeaways:
  manifest:
    - Defina uma variedade de ícones para que eles funcionem entre todos os fatores de formulário do dispositivo
    - Escolha um bom `short_name`, pois é ele que os usuários verão
    - Adicione uma URL de inicialização e um parâmetro Querystring para rastrear quantos usuários iniciam seu aplicativo
---

{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.manifest %}

Adicionar um manifesto WebApp é realmente fácil. Você cria um arquivo manifest.json
que contenha as configurações e os recursos para seu WebApp e
adiciona um *link* a ele a partir de suas páginas html.

## Criando o manifesto

Você pode chamar o manifesto como quiser. A maioria das pessoas prefere usar apenas manifest.json. Aqui está um exemplo.

{% highlight json %}
{
  "short_name": "Kinlan's Amaze App",
  "name": "Kinlan's Amazing Application ++",
  "icons": [
    {
      "src": "launcher-icon-0-75x.png",
      "sizes": "36x36"
    },
    {
      "src": "launcher-icon-1x.png",
      "sizes": "48x48"
    },
    {
      "src": "launcher-icon-1-5x.png",
      "sizes": "72x72"
    },
    {
      "src": "launcher-icon-2x.png",
      "sizes": "96x96"
    },
    {
      "src": "launcher-icon-3x.png",
      "sizes": "144x144"
    },
    {
      "src": "launcher-icon-4x.png",
      "sizes": "192x192"
    }
  ],
  "start_url": "index.html",
  "display": "standalone"
}
{% endhighlight %}

Você deve incluir um *nome_abreviado*, pois ele será usado para o texto de inicialização.

Se você não fornecer uma *url_de_início*, a página atual será usada, o que seus usuários provavelmente não querem.

## Diga ao navegador sobre o seu manifesto

Depois que o manifesto for criado e estiver no seu site, basta adicionar uma tag de link em todas as páginas que englobem seu aplicativo da Web, como a seguir.

{% highlight html %}
<link rel="manifest" href="/manifest.json">
{% endhighlight %}

## Crie ótimos ícones de aplicativo para o dispositivo

Quando um usuário adiciona seu site à tela inicial dele, você pode definir um conjunto de ícones para o navegador usar.

Os ícones para seu aplicativo Web podem ser definidos como indicado acima, com um tipo, tamanho e densidade, mas você não precisa definir todos eles, pode apenas definir tamanhos e o src da imagem.

{% highlight json %}
"icons": [{
    "src": "images/touch/icon-128x128.png",
    "sizes": "128x128"
  }, {
    "src": "images/touch/apple-touch-icon.png",
    "sizes": "152x152"
  }, {
    "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
    "sizes": "144x144"
  }, {
    "src": "images/touch/chrome-touch-icon-192x192.png",
    "sizes": "192x192"
  }],
{% endhighlight %}

<div class="clear g-wide--full">
    <figure>
        <img src="images/homescreen-icon.png" alt="Adicionar ao ícone da tela inicial">

        <figcaption>Adicionar ao ícone da tela inicial</figcaption>
    </figure>
</div>

<div class="clear"></div>

## Configure como seu site é iniciado

Você pode fazer com que seu WebApp oculte a interface de usuário dos navegadores definindo o tipo *display* para *standalone*.

{% highlight json %}
"display": "standalone"
{% endhighlight %}

Não se preocupe, se você acha que os usuários preferem exibir sua página como um site normal em um navegador, é possível usar o tipo de exibição do navegador.

{% highlight json %}
"display": "browser"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-display-options.png" alt="web-app-capable">

        <figcaption>Opções de exibição do manifesto</figcaption>
    </figure>
</div>

<div class="clear"></div>

## Definir a orientação inicial da página

Você pode forçar uma orientação específica, que é realmente útil para alguns casos como jogos, que podem funcionar apenas em paisagem. No entanto, isso deve ser usado com cuidado. Os usuários preferem ter a opção de visualizar aplicativos em ambas as orientações.

{% highlight json %}
"orientation": "landscape"
{% endhighlight %}

<div class="clear g-wide--full">
    <figure class="fluid">
        <img src="images/manifest-orientation-options.png" alt="Opções de orientação do manifesto WebApp">

        <figcaption>Opções de orientação do manifesto WebApp</figcaption>
    </figure>
</div>

<div class="clear"></div>

## Seguro para ser usado hoje. Também conhecido como Suporte de Navegador

Sim.  Este é um recurso progressivo que, se você suportar, os usuários dos navegadores que podem lidar com esse recurso terão
uma melhor experiência.  Se o navegador não suportar o manifesto, os usuários não serão impedidos de usar o
site.

Desde novembro de 2014, o Chrome implementou o manifesto. O Mozilla está implementando e o [IE está explorando a área](https://status.modern.ie/webapplicationmanifest?term=manifest).

{% include modules/nextarticle.liquid %}

{% endwrap %}
