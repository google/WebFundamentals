project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: É importante entender como é usar o seu aplicativo ou site quando a conectividade é ruim ou pouco confiável e considerar isso quando for programar. Há diversas ferramentas que podem ajudar.

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2016-05-09 #}

# Compreender baixa largura de banda e alta latência {: .page-title }

{% include "web/_shared/contributors/samdutton.html" %}

É importante entender como é usar o seu aplicativo ou site quando a conectividade é ruim ou pouco confiável e considerar isso quando for programar. Há diversas ferramentas que podem ajudar.

## Testar com baixa largura de banda e alta latência {: #testing }

Uma <a href="http://adwords.blogspot.co.uk/2015/05/building-for-next-moment.html">proporção crescente</a> de pessoas usa a Web em dispositivos móveis. Mesmo em casa, <a href="https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/">muitas pessoas estão mudando da banda larga fixa para os dispositivos móveis</a>.

Nesse contexto, é importante entender como o aplicativo ou site se comporta quando a conectividade é insuficiente ou pouco confiável. Uma variedade de ferramentas de software pode ajudar a [emular e simular](https://stackoverflow.com/questions/1584617/simulator-or-emulator-what-is-the-difference) banda larga baixa e [latência](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/) alta.

### Emule limitações de rede

Ao criar ou atualizar um site, você deve verificar o desempenho para que seja adequado em diversas condições de conectividade. Várias ferramentas podem ajudar.

#### Ferramentas de navegador

O [Chrome DevTools](/web/tools/chrome-devtools/network-performance/network-conditions) permite testar o site com diversas velocidades de upload/download e [tempos de ida e volta](https://www.igvita.com/2012/07/19/latency-the-new-web-performance-bottleneck/) usando configurações predefinidas ou personalizadas no painel Network do Chrome DevTools:

![Limitações no Chrome DevTools](images/chrome-devtools-throttling.png)

#### Ferramentas de sistema

O Network Link Conditioner é um painel de preferências disponível no Mac quando você instala o [Hardware IO Tools](https://developer.apple.com/downloads/?q=Hardware%20IO%20Tools) para Xcode:

![Painel de controle do Mac Network Link Conditioner](images/network-link-conditioner-control-panel.png)

![Configurações do Mac Network Link Conditioner settings](images/network-link-conditioner-settings.png)

![Configurações personalizadas do Mac Network Link Conditioner](images/network-link-conditioner-custom.png)

#### Emulação de dispositivos

O [Android Emulator](http://developer.android.com/tools/devices/emulator.html#netspeed) permite simular várias condições de rede durante a execução de aplicativos (incluindo navegadores da Web e apps da Web híbridos) no Android:

![Android Emulator](images/android-emulator.png)

![Configurações do Android Emulator](images/android-emulator-settings.png)

No iPhone, o Network Link Conditioner pode ser usado para simular condições de rede desfavoráveis (veja acima).

### Teste em locais e redes diferentes

Os problemas de desempenho dependem da localização do servidor e do tipo de rede.

[WebPagetest](https://webpagetest.org) é um serviço on-line que permite a execução de diversos teste de desempenho em seu site, usando várias redes e localizações de host. Por exemplo, você pode experimentar nosso site a partir de um servidor na Índia em uma rede 2G ou usando cabo em uma cidade dos EUA.

![Configurações do WebPagetest](images/webpagetest.png)

Selecione uma localização e, nas configurações avançadas, selecione um tipo de conexão. Você pode até automatizar os testes usando [scripts](https://sites.google.com/a/webpagetest.org/docs/using-webpagetest/scripting) (por exemplo, para fazer login em um site) ou usando suas [APIs RESTful](https://sites.google.com/a/webpagetest.org/docs/advanced-features/webpagetest-restful-apis). Isso ajuda a incluir testes de conectividade nos processos de compilação ou no registro de desempenho.

[Fiddler](http://www.telerik.com/fiddler) é compatível com o uso de proxy global por meio do [GeoEdge](http://www.geoedge.com/faq) e suas regras personalizadas podem ser usadas para simular velocidades de modem:

![Proxy Fiddler](images/fiddler.png)

### Teste em redes desfavoráveis

Os proxies de software e hardware permitem que você emule condições de redes móveis problemáticas, como limitação de largura de banda, atraso de pacotes e perda aleatória de pacotes. Um proxy ou rede desfavorável compartilhado pode permitir que uma equipe de desenvolvedores incorpore testes de rede do mundo real em seu fluxo de trabalho.

O [Augmented Traffic Control](http://facebook.github.io/augmented-traffic-control/) (ATC) do Facebook é um conjunto de aplicativos licenciados do BSD que pode ser usado para modelar tráfego e simular condições desfavoráveis de rede:

![Augmented Traffic Control do Facebook](images/augmented-traffic-control.png)

> O Facebook instituiu as [terças-feiras 2G](https://code.facebook.com/posts/1556407321275493/building-for-emerging-markets-the-story-behind-2g-tuesdays/) para ajudar a entender como as pessoas usam seu produto com 2G. Nas terças-feiras, um pop-up notifica os funcionários sobre a opção de simular uma conexão 2G.

O proxy HTTP/HTTPS [Charles](https://www.charlesproxy.com/){: .external } HTTP/HTTPS pode ser usado para [ajustar largura de banda e latência](http://www.charlesproxy.com/documentation/proxying/throttling/). O Charles é um software comercial, mas há uma versão de avaliação gratuita.

![Configurações de largura de banda e latência de proxy do Charles](images/charles.png)

Você pode obter mais informações sobre o Charles em [codewithchris.com](http://codewithchris.com/tutorial-using-charles-proxy-with-your-ios-development-and-http-debugging/).

## Considere conectividade pouco confiável e "lie-fi" {: #lie-fi }

### O que é lie-fi?

O termo <a href="http://www.urbandictionary.com/define.php?term=lie-fi">lie-fi</a> foi criado em 2008 (quando os telefones tinham <a href="https://www.mobilegazette.com/2008-phones-wallchart.htm" title="Images of phones from 2008">esta</a> aparência) e significa uma conectividade que não é o que parece ser. O navegador se comporta como se tivesse conectividade quando, por algum motivo, não tem.

A interpretação incorreta da conectividade pode resultar em uma experiência ineficiente, pois o navegador (ou o JavaScript) persiste na tentativa de recuperar resultados em vez de desistir e optar por um fallback razoável. Na verdade, o lie-fi pode ser pior que o off-line. Se o dispositivo estiver definitivamente off-line, o JavaScript poderá pelo menos executar ações adequadas para contornar a situação.

É provável que o lie-fi se torne um problema maior conforme as pessoas mudam da banda larga fixa para os dispositivos móveis. [Dados recentes do censo americano](https://www.ntia.doc.gov/blog/2016/evolving-technologies-change-nature-internet-use) mostram um [abandono da banda larga fixa](https://www.washingtonpost.com/news/the-switch/wp/2016/04/18/new-data-americans-are-abandoning-wired-home-internet/). O gráfico a seguir mostra o uso doméstico da Internet móvel em 2015 com o de 2013:

<img src="images/home-broadband.png" class="center" alt="Gráfico de dados do censo americano, mostrando a mudança da banda larga fixa para os dispositivos móveis, particularmente em lares de baixa renda">

### Use tempos limite para lidar com conectividade intermitente

Anteriormente, [métodos de hacker usando XHR](http://stackoverflow.com/questions/189430/detect-that-the-internet-connection-is-offline) eram utilizados para testar a presença de conectividade intermitente. No entanto, o Service Worker oferece métodos mais confiáveis para definir tempos limite de rede. Jeff Posnick explica como fazer isso usando tempos limite do [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox) em sua palestra [Carga instantânea com Service Workers](https://youtu.be/jCKZDTtUA2A?t=19m58s):


    toolbox.router.get(
      '/path/to/image',
      toolbox.networkFirst,
      {networkTimeoutSeconds: 3}
    );
    

Uma [opção de tempo limite](https://github.com/whatwg/fetch/issues/20) também está planejada para a [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch), e a [Streams API](https://www.w3.org/TR/streams-api/) pode ajudar otimizando a entrega de conteúdo e evitando solicitações monolíticas. Jake Archibald dá mais detalhes sobre como lidar com o lie-fi em [Otimização de carga de páginas](https://youtu.be/d5_6yHixpsQ?t=6m42s).


{# wf_devsite_translation #}
