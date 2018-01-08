project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Navegadores modernos facilitam a personalização de determinados componentes, como ícones, a cor da barra de endereço e até mesmo elementos como blocos personalizados. Esses simples ajustes podem aumentar o engajamento e fazer com que os usuários voltem ao seu site.


{# wf_updated_on: 2015-09-21 #}
{# wf_published_on: 2015-09-21 #}

# Cores de ícones e navegador {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Navegadores modernos facilitam a personalização de determinados componentes, como ícones, a cor da barra de endereço e até mesmo elementos como blocos personalizados. Esses simples ajustes podem aumentar o engajamento e fazer com que os usuários voltem ao seu site.


## Forneça ícones e blocos excelentes 

Quando um usuário acessa sua página, o navegador tenta recuperar um ícone do HTML. Ele pode ser exibido em muitos locais, incluindo a guia do navegador, o botão de aplicativos recentes ou a guia de páginas novas (ou acessadas recentemente), entre outros.

Fornecer uma imagem de alta qualidade tornará seu site mais reconhecível, permitindo
que os usuários o encontrem com facilidade. 

Para oferecer suporte total a todos os navegadores, será preciso adicionar algumas tags ao elemento `<head>`
de cada página.


    <!-- icon in the highest resolution we need it for -->
    <link rel="icon" sizes="192x192" href="icon.png">
    
    <!-- reuse same icon for Safari -->
    <link rel="apple-touch-icon" href="ios-icon.png">
    
    <!-- multiple icons for IE -->
    <meta name="msapplication-square310x310logo" content="icon_largetile.png">
    

### Chrome e Opera

O Chrome e o Opera usam `icon.png`, que é dimensionado para o tamanho necessário pelo 
dispositivo. Para impedir o dimensionamento automático, você também pode fornecer tamanhos 
adicionais especificando o atributo `sizes`.


Observação: Tamanhos de ícones devem ser múltiplos de 48 pixels, por exemplo, 48, 96, 144 e 192 pixels

### Safari

O Safari também usa a tag `<link>` com o atributo `rel`: `apple-touch-icon`.

Você pode especificar [tamanhos exatos](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27)
fornecendo uma tag de link separada para cada ícone, evitando que o SO 
precise redimensionar o ícone:


    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    

### Internet Explorer e Windows Phone

A nova experiência de tela inicial do Windows 8 oferece suporte a quatro layouts diferentes para 
sites fixos e requer quatro ícones. Você pode deixar as meta 
tags relevantes de fora se não desejar oferecer suporte a um tamanho específico.


    <meta name="msapplication-square70x70logo" content="icon_smalltile.png">
    <meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
    <meta name="msapplication-wide310x150logo" content="icon_widetile.png">
    

### Blocos no Internet Explorer

Os "Sites Fixos" e "Blocos Dinâmicos" giratórios da Microsoft vão muito além de outras
implementações e estão fora do escopo deste guia. Saiba mais
no artigo sobre
[como criar blocos dinâmicos](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx) da MSDN.


## Defina cores para elementos do navegador

Usando diferentes elementos `meta`, você pode personalizar o navegador e 
até mesmo elementos da plataforma. Lembre-se de que algumas personalizações podem funcionar apenas em certas
plataformas ou navegadores, mas elas podem aprimorar a experiência de forma significativa. 

O Chrome, o Firefox OS, o Safari, o Internet Explorer e o Opera Coast permitem definir 
cores para elementos do navegador e até para a plataforma usando meta tags.

### Cor de tema meta para Chrome e Opera

Para especificar a cor do tema para o Chrome no Android, use a cor de tema meta.

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#4285f4">
    

<img src="imgs/theme-color.png" alt="Cores de tema estilizando a barra de endereço no Chrome">

### Estilo específico do Safari

O Safari permite que você personalize a barra de status e especifique uma imagem de inicialização.

#### Especifique uma imagem de inicialização

Por padrão, o Safari mostra uma tela vazia durante o tempo de carregamento e, depois de vários
carregamentos, uma captura de tela de um estado anterior do aplicativo. Você pode evitar isso
dizendo ao Safari para mostrar uma imagem de inicialização explícita, adicionando uma tag de link, com
`rel=apple-touch-startup-image`. Por exemplo:


    <link rel="apple-touch-startup-image" href="icon.png">
    

A imagem deve estar no tamanho específico da tela do dispositivo de destino ou
não será usada. Consulte as
[Diretrizes de Conteúdo da Web do Safari](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
para obter mais detalhes.

Embora a documentação da Apple sobre esse assunto seja escassa, a comunidade de desenvolvedores
descobriu uma forma de direcionar todos os dispositivos usando consultas de mídia avançadas para
selecionar o dispositivo adequado e especificar a imagem correta. Esta é uma
solução que funciona, cortesia de [tfausak’s gist](//gist.github.com/tfausak/2222823):

#### Altere a aparência da barra de status

Você pode alterar a aparência da barra de status padrão para `black` ou
`black-translucent`. Com o `black-translucent`, a barra de status flutua no topo
do conteúdo da tela cheia, em vez de empurrá-la para baixo. O layout torna-se mais alto
, mas o topo fica obstruído.  O código necessário é o seguinte:


    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
<div class="attempt-left">
  <figure>
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption>Captura de tela usando  <code>black-translucent</code></figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption>Captura de tela usando  <code>black</code></figcaption>
  </figure>
</div>

<div style="clear:both;"></div>




{# wf_devsite_translation #}
