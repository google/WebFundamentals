project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Caso seu site tenha uma grande quantidade de imagens e vídeos, mas você não queira reduzir esse volume, o carregamento lento pode ajudar você a melhorar o tempo de carregamento da página inicial e diminuir o payload por página.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2018-04-04 #}
{# wf_blink_components: Blink>Image,Blink>HTML,Blink>JavaScript #}

# Carregamento lento de imagens e vídeos {: .page-title }

{% include "web/_shared/contributors/jeremywagner.html" %}

A parcela de
[imagens](http://beta.httparchive.org/reports/state-of-images?start=earliest&end=latest)
e [vídeos](http://beta.httparchive.org/reports/page-weight#bytesVideo) no
payload normal de um site pode ser significativo. Os responsáveis pelo
projeto podem não estar dispostos a cortar recursos de mídia dos seus aplicativos
atuais. Esse tipo de impasse é frustrante, em especial quando todas as partes
envolvidas querem melhorar o desempenho do site, mas não conseguem chegar a um consenso sobre como fazer isso.
Felizmente, o carregamento lento é uma solução que diminui o payload da página inicial _e_
o tempo de carregamento, mas sem restringir o conteúdo.

## O que é carregamento lento?

É uma técnica que adia recursos não críticos no
tempo de carregamento da página. Em vez disso, esses recursos são carregados apenas no momento em que são
necessários. Com relação a imagens, “não crítico" é frequentemente sinônimo de
“fora da tela". Se tiver usado o Lighthouse e identificado oportunidades de
melhoria, talvez você tenha visto orientação sobre isso na forma de
[auditorias
de Offscreen Images](/web/tools/lighthouse/audits/offscreen-images):

<figure>
  <img srcset="images/offscreen-audit-2x.png 2x, images/offscreen-audit-1x.png 1x"
src="images/offscreen-audit-1x.png" alt="Captura de tela da auditoria de
Offscreen Images no Lighthouse.">
  <figcaption><b>Imagem 1</b>. Uma das auditorias de desempenho do Lighthouse é
identificar imagens fora da tela, candidatas ao carregamento lento.</figcaption>
</figure>

Provavelmente você já viu o carregamento lento em ação. É semelhante a este cenário
:

- Você chega a uma página e começa a rolá-la enquanto lê o conteúdo.
- Você rola até uma imagem que serve de marcador na janela de visualização.
- Esse marcador é repentinamente substituído pela imagem final.

Um exemplo de carregamento lento pode ser encontrado na famosa plataforma de publicação
[Medium](https://medium.com/), que carrega marcadores de imagem leves durante o
carregamento da página e os substitui por imagens carregadas lentamente conforme elas vão surgindo na
janela de visualização.

<figure>
  <img srcset="images/lazy-loading-example-2x.jpg 2x,
images/lazy-loading-example-1x.jpg 1x"
src="images/lazy-loading-example-1x.jpg" alt="Captura de tela do site
Medium no navegador. Demonstração do carregamento lento em ação. O marcador
desfocado está à esquerda, e o recurso carregado está à direita.">
  <figcaption><b>Imagem 2</b>. Exemplo de imagem de carregamento lento em ação. Uma
imagem que serve de marcador durante o carregamento da página (à esquerda) e, ao aparecer na
janela de visualização, a imagem final é carregada conforme necessário.</figcaption>
</figure>

Caso não tenha familiaridade com o carregamento lento, você pode estar se perguntando a respeito da utilidade
e dos benefícios dessa técnica. Continue lendo e descubra!

## Por que fazer o carregamento lento de imagens ao invés de simplesmente _carregá-las_?

Porque existe a possibilidade de você estar carregando material que o usuário não visualizará. Esse é um
problema por dois motivos:

- É um desperdício de dados. Em conexões ilimitadas, isso não é o pior que pode
acontecer (embora você pudesse estar usando essa preciosa largura de banda para fazer o download de
outros recursos que serão de fato visualizados pelo usuário). No entanto, em
planos de dados limitados, o carregamento de material que não é visualizado pode de fato ser um desperdício
de dinheiro do usuário.
- É um desperdício de tempo de processamento, bateria e outros recursos do sistema. Depois que é feito o download de um
recurso de mídia, o navegador precisa decodificá-lo e renderizar seu conteúdo na
janela de visualização.

Quando fazemos o carregamento lento de imagens e vídeos, reduzimos o tempo de carregamento da página inicial,
seu peso e a utilização de recursos do sistema. Tudo isso tem um impacto positivo no
desempenho. Neste guia, descobriremos algumas técnicas e forneceremos orientações a respeito do
carregamento lento de imagens e vídeos, assim como [uma pequena lista de algumas
bibliotecas comumente usadas](/web/fundamentals/performance/lazy-loading-guidance/images-and-video/#lazy_loading_libraries).

## Carregamento lento de imagens

Os mecanismos do carregamento lento de imagens são simples na teoria, mas os detalhes, na verdade,
requerem cuidado especial. Além disso, existem alguns casos distintos de uso que também podem
se beneficiar do carregamento lento. Vamos começar com o carregamento lento de imagens inline em
HTML.

### Imagens inline

As candidatas mais comuns para o carregamento lento são imagens como as usadas em elementos `<img>`.
Quando fazemos o carregamento lento de elementos `<img>`, usamos o JavaScript para verificar se eles estão na
janela de visualização. Se estiverem, seus atributos `src` (e às vezes `srcset`) serão
preenchidos com URLs do conteúdo da imagem desejada.

#### Uso do intersection observer

Se você já escreveu código de carregamento lento, deve ter usado
gerenciadores de eventos como o `scroll` ou o `resize`. Essa abordagem é a
mais compatível com navegadores. Porém, os navegadores modernos oferecem melhor desempenho e
uma maneira eficiente de verificar a visibilidade de elementos por meio [da
intersection observer API](/web/updates/2016/04/intersectionobserver).

Note: o intersection observer não é compatível com todos os navegadores. Se a compatibilidade
entre navegadores for crucial, leia [a próxima
seção](#using_event_handlers_the_most_compatible_way), que mostra como
fazer o carregamento lento de imagens usando gerenciadores de evento de rolagem e redimensionamento com desempenho inferior
(porém, compatível com mais navegadores).

O intersection observer é mais fácil de usar e ler do que códigos que dependem de vários
gerenciadores de evento, porque os desenvolvedores só precisam registrar um observer para visualizar os
elementos, em vez de escrever tediosos códigos de detecção de visibilidade de elemento. O
desenvolvedor só precisa decidir o que fazer quando um elemento está
visível. Vamos supor esse padrão básico de marcação para nossos `<img>`
elementos de carregamento lento:

```html
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load-1x.jpg" data-srcset="image-to-lazy-load-2x.jpg 2x, image-to-lazy-load-1x.jpg 1x" alt="Sou uma imagem!">
```

Há três partes importantes dessa marcação nas quais devemos nos concentrar:

1. O atributo `class`, que usaremos para selecionar o elemento no
JavaScript.
2. O atributo `src`, que faz referência à imagem de marcador que aparecerá assim que
a página carregar.
3. Os atributos `data-src` e `data-srcset`, que são atributos de
marcador que contêm o URL da imagem que carregaremos quando o elemento estiver na janela de visualização.

Agora veremos como o intersection observer pode ser usado no JavaScript para fazer o carregamento lento de
imagens usando esse padrão de marcação:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));

  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.srcset = lazyImage.dataset.srcset;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });

    lazyImages.forEach(function(lazyImage) {
      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Possibly fall back to a more compatible method here
  }
});
```

No evento `DOMContentLoaded` do documento, esse script consulta o DOM de todos os elementos
`<img>` com a classificação `lazy`. Se o intersection observer estiver disponível,
criamos um novo observer que executa um callback quando os elementos `img.lazy` entram na
janela de visualização. Veja [o exemplo no
CodePen](https://codepen.io/malchata/pen/YeMyrQ) para ver esse código em ação.

Note: esse código usa um método de intersection observer chamado
`isIntersecting`, que está indisponível na implementação do intersection observer do
Edge 15. Dessa forma, o código de carregamento lento acima (e outros códigos
de snippet similares) falharão. Consulte [esse problema do
GitHub](https://github.com/w3c/IntersectionObserver/issues/211) para orientações sobre um
recurso mais completo de detecção condicional.

No entanto, a desvantagem do intersection observer é que embora [seja
compatível com navegadores](https://caniuse.com/#feat=intersectionobserver), ele
não é universal. [Você precisará do
polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill)
para navegadores que não são compatíveis ou, como sugerido no código acima, detectar se métodos antigos e mais compatíveis estão
disponíveis e voltar a usá-los.

#### Uso de gerenciadores de eventos (o modo mais compatível)

Embora você _deva_ usar o intersection observer para carregamento lento, seu aplicativo pode ter muitos
requisitos, o que faz com que a compatibilidade do navegador seja crucial. [Você _pode_usar o
suporte do polyfill no intersection observer
](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) (e
esse seria o meio mais fácil), mas você também pode voltar ao código usando
[`scroll`](https://developer.mozilla.org/en-US/docs/Web/Events/scroll),
[`resize`](https://developer.mozilla.org/en-US/docs/Web/Events/resize) e
possivelmente
[`orientationchange`](https://developer.mozilla.org/en-US/docs/Web/Events/orientationchange)
gerenciadores de eventos juntamente com
[`getBoundingClientRect`](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
para determinar se um elemento está na janela de visualização.

Presumindo-se o mesmo padrão de marcação anterior, o seguinte JavaScript fornece
a funcionalidade do carregamento lento.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  let lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
  let active = false;

  const lazyLoad = function() {
    if (active === false) {
      active = true;

      setTimeout(function() {
        lazyImages.forEach(function(lazyImage) {
          if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && getComputedStyle(lazyImage).display !== "none") {
            lazyImage.src = lazyImage.dataset.src;
            lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");

            lazyImages = lazyImages.filter(function(image) {
              return image !== lazyImage;
            });

            if (lazyImages.length === 0) {
              document.removeEventListener("scroll", lazyLoad);
              window.removeEventListener("resize", lazyLoad);
              window.removeEventListener("orientationchange", lazyLoad);
            }
          }
        });

        active = false;
      }, 200);
    }
  };

  document.addEventListener("scroll", lazyLoad);
  window.addEventListener("resize", lazyLoad);
  window.addEventListener("orientationchange", lazyLoad);
});
```

Esse código usa o `getBoundingClientRect` em um gerenciador de eventos `scroll` para verificar se
algum dos elementos `img.lazy` está na janela de visualização. Uma chamada `setTimeout` é usada para
o processamento de atraso e uma variável `active` contém o estado de processamento que
é usado para limitar chamadas de função. As imagens são carregadas lentamente. Assim, elas são removidas
da matriz de elementos. Quando a matriz de elementos atinge um `length` de `0`, a
rolagem do código do gerenciador de eventos é removida. Veja esse código em ação [nesse exemplo
CodePen](https://codepen.io/malchata/pen/mXoZGx).

Embora esse código funcione em qualquer navegador, ele pode ter problemas de
desempenho nas chamadas `setTimeout` repetitivas que podem causar desperdício, mesmo que o código
dentro delas seja limitado. Nesse exemplo, uma marcação está sendo executada a cada 200
milissegundos na rolagem de documentos ou no redimensionamento de janelas, independentemente se há
ou não imagens na janela de visualização. Além disso, o tedioso trabalho de rastrear quantos
elementos são deixados para o carregamento lento e a desassociação de rolagem do gerenciador de eventos fica
por conta do desenvolvedor.

Basicamente: use o intersection observer sempre que possível e volte aos gerenciadores
de evento caso a maior compatibilidade possível seja um requisito crítico do
aplicativo.

### Imagens em CSS

Embora as tags `<img>` sejam a maneira mais comum de usar imagens em páginas da Web, isso também
pode ser feito pela property
[`background-image`](https://developer.mozilla.org/en-US/docs/Web/CSS/background-image)
CSS (entre outras). Diferente dos elementos `<img>` que são carregados independentemente
da visibilidade, o comportamento no CSS com relação ao carregamento de imagens é feito com mais
especulação. Quando [o documento e os modelos de objeto
CSS](/web/fundamentals/performance/critical-rendering-path/constructing-the-object-model)
e [a árvore de
renderização](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)
são criados, os navegador examina como o CSS está aplicado ao documento antes de
solicitar recursos externos. Se o navegador tiver determinado que uma regra CSS
que envolve um recurso externo não se aplica ao documento que está sendo
criado, ele não faz a solicitação.

Esse comportamento especulativo pode ser usado para adiar o carregamento de imagens em CSS
usando JavaScript para determinar quando um elemento está dentro da janela de visualização.
Posteriormente, é aplicada uma classe a esse elemento com o estilo que invoque
uma imagem de plano de fundo. Isso faz com que o download da imagem seja feito conforme o necessário e
não no carregamento inicial. Por exemplo, vamos pegar um elemento que contenha a
imagem de plano de fundo de um grande herói:

```html
<div class="lazy-background">
  <h1>Here's a hero heading to get your attention!</h1>
  <p>Here's hero copy to convince you to buy a thing!</p>
  <a href="/buy-a-thing">Buy a thing!</a>
</div>
```

O elemento `div.lazy-background` normalmente teria a imagem de plano de fundo
do herói, conforme invocado pelo CSS. No entanto, nesse exemplo de carregamento lento, podemos isolar
a property `background-image` do elemento `div.lazy-background` por meio de uma classe `visible`
que será adicionada ao elemento quando ele estiver na janela de visualização.

```css
.lazy-background {
  background-image: url("hero-placeholder.jpg"); /* Placeholder image */
}

.lazy-background.visible {
  background-image: url("hero.jpg"); /* The final image */
}
```

A partir de agora, usaremos o JavaScript para verificar se o elemento está na janela de visualização (com o
intersection observer). Em seguida, adicionaremos a classe `visible` ao elemento
`div.lazy-background`, que carrega a imagem:

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyBackgrounds = [].slice.call(document.querySelectorAll(".lazy-background"));

  if ("IntersectionObserver" in window) {
    let lazyBackgroundObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          lazyBackgroundObserver.unobserve(entry.target);
        }
      });
    });

    lazyBackgrounds.forEach(function(lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground);
    });
  }
});
```

Como indicado antes, verifique se forneceu um fallback ou um
polyfill para o intersection observer, já que nem todos os navegadores são compatíveis atualmente.
Confira [a demonstração do CodePen](https://codepen.io/malchata/pen/wyLMpR) para ver
esse código em ação.

## Carregamento lento de vídeo

Assim como em elementos de imagem, também podemos fazer o carregamento lento de vídeos. Ao carregarmos um vídeo em
circunstâncias normais, usamos o elemento `<video>` (embora [um
método alternativo de uso
`<img>`](https://calendar.perfplanet.com/2017/animated-gif-without-the-gif/) tenha
surgido com implementação limitada). No entanto, a _forma_que fazemos o carregamento lento de `<video>` depende
do uso. Vamos analisar alguns cenários que requerem
soluções diferentes.

### Para vídeos que não começam automaticamente

Para vídeos que têm reprodução iniciada pelo usuário (vídeos que _não_
começam automaticamente, por exemplo), a especificação do [atributo`preload`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-preload)
no vídeo `<video>` pode ser a melhor opção:

```html
<video controls preload="none" poster="one-does-not-simply-placeholder.jpg">
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Aqui, usamos um atributo `preload` com o valor `none` para evitar que os navegadores
façam o carregamento prévio _de_dados de vídeo. Para ocupar o espaço, usamos o atributo `poster`
para dar um marcador para o elemento `<video>`. A razão para isso é
que o comportamento padrão para o carregamento de vídeo pode variar de acordo com o navegador:

- No Chrome, o padrão para o `preload` costumava ser o `auto`, mas a partir do Chrome 64, tornou-se
o `metadata`. Mesmo assim, na versão para desktop do Chrome, parte do
vídeo pode ter pré-carregado com o uso do cabeçalho `Content-Range`. O Firefox, o Edge e o
Internet Explorer 11 têm comportamentos semelhantes.
- Assim como no Chrome para desktop, a versão 11.0 do Safari para desktop faz o carregamento prévio de parte
do vídeo. Na versão 11.2 (atualmente a versão Tech Preview do Safari), apenas
os metadados do vídeo têm carregamento prévio. [No Safari para iOS, os vídeos nunca são
pré-carregados](https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html#//apple_ref/doc/uid/TP40009523-CH2-SW9).
- Quando o [modo Economia de dados](https://support.google.com/chrome/answer/2392284) está
ativado, o `preload` define o padrão `none`.

O comportamento padrão dos navegadores com relação ao `preload` não é definitivo,
por isso, a melhor opção é ser o mais específico possível. Nesses casos em que o usuário inicia a
reprodução usando o `preload="none"`, o mais fácil é adiar o carregamento de vídeos em
todas as plataformas. O atributo `preload` não é a única forma de adiar o carregamento
de conteúdo em vídeo. [_A reprodução rápida com carregamento
prévio de vídeo_](/web/fundamentals/media/fast-playback-with-video-preload) pode oferecer
insights sobre o trabalho com reprodução de vídeo no JavaScript.

Ela não é útil quando queremos usar vídeo no lugar de
GIFs animados, que trataremos a seguir.

### Para vídeos usados como substitutos de GIFs animados

Os GIFs animados são amplamente usados, mas são inferiores aos seus equivalentes em vídeo de
várias formas. Em especial com relação ao tamanho de saída do arquivo. Os GIFs animados podem ter
vários megabytes de dados. Os vídeos de qualidade visual similar tendem a
ser muito menores.

O uso de elementos `<video>` como substitutos de GIFs animados não é algo tão
simples como no caso de elementos `<img>`. Estes são os três comportamentos característicos dos
GIFs animados:

1. Eles são reproduzidos automaticamente quando carregados.
2. Eles se repetem continuamente ([embora esse não seja sempre o
caso](https://davidwalsh.name/prevent-gif-loop)).
3. Eles não têm faixa de áudio.

Conseguir isso com o elemento `<video>` fica semelhante a:

```html
<video autoplay muted loop playsinline>
  <source src="one-does-not-simply.webm" type="video/webm">
  <source src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Os atributos `autoplay`, `muted` e `loop` são autoexplicativos.
[O `playsinline` é necessário para que a reprodução automática ocorra no
iOS](https://webkit.org/blog/6784/new-video-policies-for-ios/). Agora temos um
vídeo que serve como substituto do GIF e funciona em diferentes plataformas. Mas como fazer
o carregamento lento? [O Chrome fará isso para
você](https://www.google.com/url?q=https://developers.google.com/web/updates/2017/03/chrome-58-media-updates%23offscreen&sa=D&ust=1521096956530000&usg=AFQjCNHPv7wM_yxmkOWKA0sZ-MXYKUdUXg),
mas não espere que todos os navegadores forneçam esse comportamento otimizado.
Dependendo do seu audience e dos requisitos do aplicativo, talvez você precise tomar
as rédeas da situação. Para começar, modifique sua marcação `<video>` de maneira apropriada:

```html
<video autoplay muted loop playsinline width="610" height="254" poster="one-does-not-simply.jpg">
  <source data-src="one-does-not-simply.webm" type="video/webm">
  <source data-src="one-does-not-simply.mp4" type="video/mp4">
</video>
```

Você perceberá a inclusão do [atributo `poster`
](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video#attr-poster),
que permite a você especificar um marcador para ocupar o espaço do elemento `<video>`
até que o vídeo tenha sido carregado lentamente. Assim como nos nossos exemplos de carregamento lento de `<img>`
anteriores, implementamos o URL do vídeo no atributo `data-src` de cada elemento`<source>`
. A partir daí, usaremos algum JavaScript semelhante ao exemplo anterior de
carregamento lento de imagem, baseado no intersection observer.

```javascript
document.addEventListener("DOMContentLoaded", function() {
  var lazyVideos = [].slice.call(document.querySelectorAll("video.lazy"));

  if ("IntersectionObserver" in window) {
    var lazyVideoObserver = new IntersectionObserver(function(entries, observer) {
      entries.forEach(function(video) {
        if (video.isIntersecting) {
          for (var source in video.target.children) {
            var videoSource = video.target.children[source];
            if (typeof videoSource.tagName === "string" && videoSource.tagName === "SOURCE") {
              videoSource.src = videoSource.dataset.src;
            }
          }

          video.target.load();
          video.target.classList.remove("lazy");
          lazyVideoObserver.unobserve(video.target);
        }
      });
    });

    lazyVideos.forEach(function(lazyVideo) {
      lazyVideoObserver.observe(lazyVideo);
    });
  }
});
```

Ao fazer o carregamento lento de um elemento `<video>`, É preciso repetir todos os elementos
`<source>` filhos e alterar seus atributos `data-src` para `src`. Depois de fazer
isso, é preciso acionar o carregamento do vídeo chamando o método
`load` do elemento. Depois disso, a mídia será reproduzida automaticamente
pelo atributo `autoplay`.

Ao usar esse método, temos uma solução em vídeo que emula o comportamento de GIFs animados,
mas não resulta no mesmo uso intensivo de dados. Assim, conseguimos
carregar esse conteúdo lentamente.

## Bibliotecas de carregamento lento

Se você não estiver muito preocupado com a _forma_ que o carregamento lento ocorre nos bastidores e só
quiser escolher uma biblioteca e começar (o que não é um problema), existem muitas
opções. Diversas bibliotecas usam um padrão de marcação semelhante aos
demonstrados neste guia. Estas bibliotecas de carregamento lento podem ser
úteis:

- [lazysizes](https://github.com/aFarkas/lazysizes) é uma biblioteca
de carregamento lento de recursos completos para imagens e iframes. O padrão usado é
semelhante aos exemplos de código mostrados aqui na medida em que se liga automaticamente a uma classe
`lazyload` em elementos `<img>` e requer que você especifique URLs de imagens nos atributos
`data-src` e/ou `data-srcset`, cujo conteúdo é trocado
por atributos `src` e/ou `srcset`, respectivamente. Ela usa o
intersection observer (que você pode usar com polyfill) e pode ser estendida com [vários
plug-ins](https://github.com/aFarkas/lazysizes#available-plugins-in-this-repo) para
fazer coisas como o carregamento lento de vídeos.
- [lozad.js](https://github.com/ApoorvSaxena/lozad.js) é uma opção
leve que usa somente o intersection observer. Sendo assim, é de alto desempenho
mas você precisará do polyfill antes de usar em navegadores mais antigos.
- [blazy](https://github.com/dinbror/blazy) é outra opção
leve para o carregamento lento (tem 1.4 KB). Assim como a lazysizes,
ela não precisa de outros utilitários para carregar e funciona com o IE7+.
Mas ela não usa o intersection observer.
- [yall.js](https://github.com/malchata/yall.js) é uma biblioteca que criei que usa
intersection observer e volta para gerenciadores de eventos. Ela é compatível com o IE11
e outros dos principais navegadores.
- Caso esteja procurando uma biblioteca de carregamento lento específica para React, considere a
[react-lazyload](https://github.com/jasonslyvia/react-lazyload). Embora
não use o intersection observer, ela _eficientemente_ fornece um método habitual de carregamento
lento de imagens para aqueles que estão acostumados a desenvolver aplicativos com o React.

Cada uma dessas bibliotecas de carregamento lento é bem documentada e tem vários padrões
de marcação para diversas aplicações de carregamento lento. Caso busque uma solução rápida,
escolha uma biblioteca e comece. Levará o mínimo de esforço.

## O que pode dar errado

Embora o carregamento lento de imagens e vídeos tenha benefícios positivos e mensuráveis para o desempenho,
essa não é uma tarefa simples. Se você fizer algo errado, pode haver
consequências indesejadas. Assim, é importante lembrar do
seguinte:

### Lembre-se da dobra

Pode ser tentador fazer o carregamento lento de todos os recursos de mídia da página com
JavaScript, mas você precisa resistir à tentação. Os itens acima da
dobra não devem ser carregados lentamente. Esses recursos devem ser considerados recursos
críticos e portanto devem ser carregados normalmente.

O principal argumento para carregar recursos críticos de mídia da maneira usual
é que o carregamento lento atrasa esses recursos até que
o DOM seja interativo quando os scripts terminarem de carregar e começarem a
execução. Para imagens abaixo da dobra tudo bem, mas seria mais rápido
carregar recursos críticos acima da dobra com um elemento `<img>` padrão.

Obviamente o local exato da dobra não fica muito claro hoje em dia porque os sites são
visualizados em várias telas de tamanhos diversos. O que está acima da dobra em um laptop
pode muito bem estar _abaixo_ dela em dispositivos móveis. Não há uma fórmula mágica para
todas as situações. Você precisará fazer um
inventário dos recursos críticos da sua página e carregar essas imagens da maneira
clássica.

Além disso, talvez você não queira ser tão rigoroso com a linha da dobra em relação ao
limite para ativar o carregamento lento. Pode ser mais conveniente aos seus objetivos
estabelecer uma zona de buffer um pouco abaixo da dobra. Assim, a imagem pode começar a
carregar bem antes do usuário rolar a página até a janela de visualização. Por exemplo, a
intersection observer API permite que você especifique uma property `rootMargin` em um
objeto opcional quando você cria uma nova instância `IntersectionObserver`. Isso
efetivamente fornece um buffer aos elementos, que aciona o comportamento de carregamento lento antes que
o elemento esteja na janela de visualização.

```javascript
let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
  // Lazy loading image code goes here
}, {
  rootMargin: "0px 0px 256px 0px"
});
```

Se o valor para `rootMargin` for semelhante ao que você especificaria para uma property CSS
`margin`, é porque ele de fato é. Nesse caso estamos ampliando a
margem inferior do elemento de observação (por padrão, a janela de visualização do navegador.
Porém, essa informação pode ser alterada para um elemento específico usando a property `root`) em 256
pixels. Isso significa que a função de callback será executada quando um elemento de imagem estiver dentro de
256 pixels da janela de visualização. Assim, a imagem começará a carregar
antes do usuário de fato vê-la.

Para alcançar esse mesmo efeito usando o código de gerenciamento de eventos de rolagem, basta ajustar sua marcação
`getBoundingClientRect` para incluir um buffer. Assim, você terá o mesmo
efeito em navegadores que não são compatíveis com o intersection observer.

### Mudança de layout e marcadores

O carregamento lento de mídia pode causar alteração no layout caso marcadores não sejam usados.
Essas alterações podem ser desorientadoras para os usuários e acionam dispendiosas operações de layout DOM
que consomem os recursos do sistema e contribuem para travamentos. Considere,
no mínimo, usar um marcador colorido que ocupe as mesmas dimensões da
imagem de destino, ou técnicas como
[LQIP](http://www.guypo.com/introducing-lqip-low-quality-image-placeholders/) ou
[SQIP](https://github.com/technopagan/sqip) que sugerem o conteúdo de um item de
mídia antes que ele carregue.

Para tags `<img>`, o `src` deve inicializar no ponto do marcador até que o
atributo seja atualizado com o URL da imagem final. Use o atributo `poster` em um elemento
`<video>` para inserir uma imagem de marcador. Além disso, use os atributos `width` e
`height` tanto na tag `<img>` quanto na `<video>`. Isso garante que
a transição entre os marcadores e as imagens finais não mudarão o tamanho renderizado
do elemento enquanto a mídia carrega.

### Atrasos na decodificação de imagem

Carregar imagens grandes em JavaScript e soltá-las no DOM pode amarrar o
thread principal, fazendo com que a interface do usuário pare de responder por um curto período de
tempo durante a decodificação. [Decodificar de forma assíncrona as imagens usando o
método `decode`](https://medium.com/dailyjs/image-loading-with-image-decode-b03652e7d2d2)
antes de inseri-las no DOM pode reduzir esse tipo de travamento. Mas
cuidado: Ele ainda não está disponível em todos os locais e deixa a lógica do
carregamento lento mais complexa. Se você quiser usá-lo, será precisar verificar isso. Veja abaixo uma demonstração de
como você pode usar o `Image.decode()` com um fallback:

```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

if ("decode" in newImage) {
  // Fancy decoding logic
  newImage.decode().then(function() {
    imageContainer.appendChild(newImage);
  });
} else {
  // Regular image load
  imageContainer.appendChild(newImage);
}
```

Confira [este link do CodePen](https://codepen.io/malchata/pen/WzeZGW) para ver
um código similar a esse exemplo em ação. Se a maioria das suas imagens forem relativamente pequenas
isso poderá não servir muito para você. No entanto, isso certamente ajudará a reduzir o travamento ao
fazer o carregamento lento de imagens grandes e inseri-las no DOM.

### Quando o carregamento falha

Às vezes os recursos de mídia não carregam ou outros erros
ocorrem. Quando isso pode acontecer? Depende, mas veja este cenário
hipotético: Você tem uma política de armazenamento em cache HTML por um curto período de tempo (cinco
minutos, por exemplo), e o usuário visita o site _ou_ deixa uma guia aberta por
um longo período de tempo (por exemplo, várias horas) e volta para ler seu conteúdo.
Em algum momento desse processo, ocorre uma redistribuição. Durante essa implantação, o nome de
um recurso de imagem é alterado devido ao controle de versão baseado em hash ou é completamente
removido. Quando o usuário faz o carregamento lento da imagem, o recurso fica
indisponível, e é assim que ocorre a falha.

Embora essas sejam ocorrências relativamente raras, é importante que você tenha um
plano de backup caso o carregamento lento falhe. Para imagens, essa solução aparece
assim:

```javascript
var newImage = new Image();
newImage.src = "my-awesome-image.jpg";

newImage.onerror = function(){
  // Decide what to do on error
};
newImage.onload = function(){
  // Load the image
};
```

O que você decide fazer na ocorrência de um erro depende do seu aplicativo. Você
pode, por exemplo, substituir a área do marcador de imagem com um botão que permita
ao usuário tentar carregar a imagem novamente ou simplesmente mostrar uma mensagem de erro
na área do marcador.

Outros cenários também podem ocorrer. O que quer que você faça, é sempre uma boa ideia
informar ao usuário sobre a ocorrência do erro e possivelmente sugerir uma ação
caso algo dê errado.

### Disponibilidade do JavaScript

Não pense que o JavaScript está sempre disponível. Se você fizer o
carregamento lento de imagens, considere oferecer a marcação `<noscript>` que exibirá imagens
no caso do JavaScript estar indisponível. O exemplo de fallback mais simples envolve
o uso de elementos `<noscript>` para fornecer imagens se o JavaScript estiver desativado:

```html
<!-- An image that eventually gets lazy loaded by JavaScript -->
<img class="lazy" src="placeholder-image.jpg" data-src="image-to-lazy-load.jpg" alt="Sou uma imagem!">
<!-- An image that is shown if JavaScript is turned off -->
<noscript>
  <img src="image-to-lazy-load.jpg" alt="Sou uma imagem!">
</noscript>
```

Se o JavaScript estiver desativado, os usuários verão _tanto_ o marcador de imagem quanto a
imagem contida com os elementos `<noscript>`. Para contornar isso, podemos colocar
uma classe de `no-js` na tag `<html>`:

```html
<html class="no-js">
```

Colocamos então um script inline no `<head>` antes que folhas de estilos
sejam solicitadas pelas tags `<link>`, o que remove a classe `no-js` do elemento `<html>`
se o JavaScript estiver ativo:

```html
<script>document.documentElement.classList.remove("no-js");</script>
```

Finalmente, podemos usar CSS para simplesmente esconder elementos com uma classe de lentidão quando o
JavaScript estiver indisponível. Assim:

```css
.no-js .lazy {
  display: none;
}
```

Isso não impede os marcadores de imagem de carregar, mas o resultado é mais
desejável. As pessoas que estiverem com o JavaScript desativado recebem algo além de imagens de
marcador, o que é melhor que do que marcadores e conteúdo de imagem sem sentido
algum.

## Conclusão

Se usado com cuidado, o carregamento lento de imagens e vídeos pode diminuir significativamente o carregamento
inicial e os payloads do seu site. Os usuários não terão atividades de rede
desnecessárias nem custos de processamento de recursos de mídia que talvez nunca vejam,
mas eles ainda poderão ver esses recursos se quiserem.

No que diz respeito às técnicas de melhoria de desempenho, o carregamento lento é razoavelmente
incontroverso. Se você tiver muitas imagens inline no seu site, essa é uma
ótima maneira de reduzir os downloads desnecessários. Os usuários do seu site e os
responsáveis por melhorias agradecem!

_Agradecimentos especiais a [François
Beaufort](/web/resources/contributors/beaufortfrancois), Dean Hume, [Ilya
Grigork](/web/resources/contributors/ilyagrigorik), [Paul
Irish](/web/resources/contributors/paulirish), [Addy
Osmani](/web/resources/contributors/addyosmani), [Jeff
Posnick](/web/resources/contributors/jeffposnick) e Martin Schierle por seu
feedback valioso que melhorou de maneira significativa a qualidade deste artigo._
