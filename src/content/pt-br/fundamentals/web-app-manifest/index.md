project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O manifesto de um aplicativo web é um arquivo JSON que permite controlar como o aplicativo web ou site é exibido para o usuário em áreas que normalmente se espera ver aplicativos nativos (por exemplo, a tela inicial de um dispositivo), como definir o que o usuário pode inicializar e o visual durante a inicialização.

{# wf_updated_on: 2016-08-19 #}
{# wf_published_on: 2016-02-11 #}

# O manifesto do aplicativo web {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

O [manifesto dos aplicativos web](https://developer.mozilla.org/en-US/docs/Web/Manifest) é um arquivo JSON que permite controlar como o aplicativo web ou site é exibido para o usuário em áreas que normalmente se espera ver aplicativos nativos (por exemplo, a tela inicial de um dispositivo), como definir o que o usuário pode inicializar e o visual durante a inicialização.

Manifestos de app da Web fornecem a capacidade de salvar um site marcado como favorito na tela inicial de um dispositivo. Quando um site é iniciado dessa maneira: 

* Ele tem um ícone e um nome exclusivos para que os usuários possam distingui-los de outros sites.
* Mostra algo ao usuário enquanto os recursos são baixados ou restaurados do cache.
* Fornece características de exibição padrão ao navegador para evitar transição muito brusca quando os recursos do site ficam disponíveis. 

Ele faz tudo isso com um mecanismo simples de metadados em um arquivo de texto. Esse é o manifesto de app da Web.

Observação: apesar de ser possível usar um manifesto de app da Web em qualquer site, ele é obrigatório para [Progressive Web Apps](/web/progressive-web-apps/).

### TL;DR {: .hide-from-toc }
- Criar um manifesto e vinculá-lo à sua página são processos bem simples.
- Controlar o que o usuário vê ao inicializar a partir da tela inicial.
- Isso envolve coisas como uma tela de apresentação, cores do tema e até o URL que foi aberto. 

## Crie o manifesto

Antes de abordarmos os detalhes do manifesto de um aplicativo web, vamos criar um
manifesto básico e vincular uma página da web a ele.

Você pode chamar o manifesto como quiser. A maioria das pessoas usa o nome `manifest.json`. Veja um exemplo:


    {
      "short_name": "AirHorner",
      "name": "Kinlan's AirHorner of Infamy",
      "icons": [
        {
          "src": "launcher-icon-1x.png",
          "type": "image/png",
          "sizes": "48x48"
        },
        {
          "src": "launcher-icon-2x.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "launcher-icon-4x.png",
          "type": "image/png",
          "sizes": "192x192"
        }
      ],
      "start_url": "index.html?launcher=true"
    }
    

Não deixe de incluir o seguinte: 

* Um `short_name` para usar como o texto na tela inicial para os usuários.  
* Um `name` para usar no banner de instalação de aplicativo web.  
  

## Informe o navegador da presença do seu manifesto

Quando criar o manifesto e ele estiver no seu site, adicione
uma tag `link` a todas as páginas que envolve o seu aplicativo web da seguinte forma:


    <link rel="manifest" href="/manifest.json">
  
## Defina um URL inicial

Se você não fornecer um `start_url`, a página atual será usada, o que
provavelmente não é o que seus usuários querem. Mas esse não é o único motivo para
incluir esse elemento. Como agora você pode definir como o seu aplicativo é inicializado, adicione um
parâmetro de string de consulta ao `start_url` que indique como ele foi inicializado. 

    "start_url": "/?utm_source=homescreen"

Isso pode funcionar como você quiser. O valor que estamos usando tem a vantagem de ser relevante para o Google Analytics.
 

## Personalize os ícones

<figure class="attempt-right">
  <img src="images/homescreen-icon.png" alt="Ícone de adicionar à tela inicial">
  <figcaption>Ícone de adicionar à tela inicial</figcaption>
</figure>

 Quando um usuário adiciona seu site à tela inicial dele, você pode definir um conjunto de ícones para o navegador usar. Você pode definir um tipo e um tamanho a eles da seguinte forma:

<div style="clear:both;"></div>

    "icons": [{
        "src": "images/touch/icon-128x128.png",
        "type": "image/png",
        "sizes": "128x128"
      }, {
        "src": "images/touch/apple-touch-icon.png",
        "type": "image/png",
        "sizes": "152x152"
      }, {
        "src": "images/touch/ms-touch-icon-144x144-precomposed.png",
        "type": "image/png",
        "sizes": "144x144"
      }, {
        "src": "images/touch/chrome-touch-icon-192x192.png",
        "type": "image/png",
        "sizes": "192x192"
      }],
    

Observação: ao salvar um ícone na tela inicial, o Chrome primeiro procura ícones que correspondam à densidade da tela e que sejam dimensionados de acordo com a densidade de 48 dp. Se não encontrar nenhum, ele procura o ícone que mais se aproxima das características do dispositivo. Se, por qualquer motivo, você quiser escolher um ícone específico para uma determinada densidade de pixels, pode usar o membro <code>density</code> opcional, que assume um número. Se você não declara a densidade, assume-se o padrão 1,0. Isso significa: "use esse ícone para densidades de tela de 1,0 ou mais", o que, em geral, é o que se deseja.

## Adicione uma tela de apresentação

<figure class="attempt-right">
  <img src="images/background-color.gif" alt="cor do fundo">
  <figcaption>Cor de fundo para a tela de inicialização</figcaption>
</figure>

Quando seu app da Web é iniciado pela tela inicial, acontecem diversas coisas
nos bastidores:

1. O Chrome é iniciado.
2. O renderizador que exibe a página é iniciado.
3. Seu site é carregado pela rede (ou pelo cache, se tiver um service worker).

Enquanto isso acontece, a tela fica branca e parece estar paralisada.
Isso fica muito aparente quando se carrega a página da web pela rede, em que 
se leva mais de um ou dois segundos para que as páginas fiquem visíveis na página inicial.

Para oferecer uma experiência melhor ao usuário, substitua a tela branca por um título, cores e imagens. 

### Defina uma imagem e um título

Se você acompanhou tudo desde o início, já deve ter definido uma imagem e um título. O Chrome infere a imagem e o título de membros específicos do manifesto. O que importa é saber os detalhes específicos. 

A imagem de uma tela de apresentação é delineada a partir da matriz `icons`. O Chrome escolhe a imagem mais próxima de 128 dp para o dispositivo. O título é simplesmente retirado do membro `name`.

### Defina a cor do fundo 

Especifique a cor do fundo usando a propriedade `background_color`
, cujo nome é bastante apropriado. O Chrome usa essa cor no exato momento em que o aplicativo web é inicializado,
e a cor permanece na tela até a primeira renderização do aplicativo.

Para definir a cor do fundo, aplique o seguinte ao seu manifesto:


    "background_color": "#2196F3",
    

Agora, não aparecerá uma tela branca enquanto seu aplicativo é inicializado a partir da tela inicial.

Uma boa sugestão de valor para essa propriedade é a cor de fundo da página de carregamento.  Usar as mesmas cores da página de carregamento proporciona uma transição suave da
tela de apresentação para a página inicial.

### Defina uma cor de tema

Especifique uma cor de tema usando a prioridade `theme_color`. Essa propriedade
define a cor da barra de ferramentas. Para esse elemento, também sugerimos duplicar uma cor
existente, especificamente, a `theme-color` `<meta>`.


## Defina o estilo da inicialização

<figure class="attempt-right">
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Opções de exibição do manifesto</figcaption>
</figure>

Use o manifesto de app da Web para controlar o tipo de exibição e a orientação da página.

### Personalize o tipo de exibição

Você pode fazer seu aplicativo web esconder a interface do navegador definindo o tipo `display` como `standalone`.


    "display": "standalone"
    

Se acha que os usuários prefeririam ver a página como um site normal no navegador, basta definir o tipo `display` como `browser`:


    "display": "browser"
    
<div style="clear:both;"></div>

### Especifique a orientação inicial da página

<figure class="attempt-right">
  <img src="images/manifest-orientation-options.png" alt="Opções de orientação do manifesto de app da Web">
  <figcaption>Opções de orientação do manifesto de app da Web</figcaption>
</figure>

Você pode impor uma orientação específica, o que é vantajoso para aplicativos 
que funcionam em apenas uma orientação, como jogos, por exemplo. Use essa opção 
de forma seletiva. Os usuários preferem selecionar a orientação


    "orientation": "landscape"

<div style="clear:both;"></div>
    

## Forneça uma cor de tema para todo o site

<figure class="attempt-right">
  <img src="images/theme-color.png" alt="cor do fundo">
  <figcaption>Cor do tema</figcaption>
</figure>

O Chrome introduziu o conceito de uma cor de tema para seu site em 2014. A cor de tema
é uma dica da sua página da Web que informa o navegador qual cor usar para os
[elementos da IU, como a barra de endereços](/web/fundamentals/design-and-ux/browser-customization/).  

Sem um manifesto, você precisará definir a cor de tema em cada página e, se 
tiver um site grande ou legado, não é viável fazer muitas alterações que englobem todo o site.

<div style="clear:both;"></div>

Adicione um atributo `theme_color` ao seu manifesto e, quando o site for iniciado
pela tela inicial, todas as páginas do domínio terão a mesma cor de tema automaticamente.



    "theme_color": "#2196F3"
    

<figure>
  <img src="images/manifest-display-options.png" alt="cor do fundo">
  <figcaption>Cor de tema de todo o site</figcaption>
</figure>

## Teste o manifesto {: #test }

Se quiser verificar manualmente se o manifesto do seu aplicativo web está configurado corretamente,
acesse a guia **Manifest** no painel **Application** do Chrome DevTools.

![A guia "Manifest" do Chrome DevTools](images/devtools-manifest.png)

Essa guia oferece uma versão legível por humanos de muitas das propriedades
do manifesto. Acesse [Manifesto
do aplicativo web](/web/tools/chrome-devtools/progressive-web-apps#manifest) nos
documentos do Chrome DevTools para saber mais sobre essa guia. Você ainda
pode simular eventos de adicionar à tela inicial daqui. Leia [Como testar o banner
de instalação de aplicativos](/web/fundamentals/engage-and-retain/app-install-banners/#testing-the-app-install-banner)
para ver mais detalhes sobre esse assunto.

Se quiser adotar uma abordagem automática para validar o manifesto do seu aplicativo web,
dê uma olhada em [Lighthouse](/web/tools/lighthouse/). O Lighthouse é uma ferramenta de
auditoria de aplicativos web que pode ser executada como uma extensão do Chrome ou como um módulo do NPM. Ao fornecer um URL ao
Lighthouse, ele executa um conjunto de auditorias nessa página e mostra os
resultados em um relatório. As auditorias do Lighthouse relacionadas a manifestos de aplicativos web
incluem verificar se:

* O aplicativo pode ser adicionado à tela inicial.
* Depois de ser adicionado, o aplicativo inicializa com uma tela de apresentação personalizada.
* A cor da barra de endereço do navegador foi personalizada.
* O aplicativo está em HTTPS (pré-requisito para adicionar à tela inicial).

## Mais informações

Este artigo deu uma rápida introdução aos manifestos dos aplicativos web, mas
isso é só o começo.

* Se estiver usando um manifesto de aplicativo web, também seria interessante configurar um
[banner de instalação de aplicativo](/web/fundamentals/engage-and-retain/app-install-banners/). 

* Veja [um guia completo](https://developer.mozilla.org/en-US/docs/Web/Manifest)
sobre os manifestos de aplicativos web na Mozilla Developer Network.

* Se quiser a descrição dos recursos fornecidas pelos engenheiros que criaram os manifestos
dos aplicativos web, leia a [especificação W3C](http://www.w3.org/TR/appmanifest/){: .external }.

Observação: se atualizar o arquivo `manifest.json` no futuro, essas alterações não
serão automaticamente aplicadas ao usuário a menos que ele adicione o seu aplicativo
à tela inicial novamente.





{# wf_devsite_translation #}
