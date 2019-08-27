project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: Introdução à propriedade CSS overscroll-behavior.

{# wf_updated_on: 2019-08-26 #} {# wf_published_on: 2017-11-14 #}

{# wf_tags: chrome63,css,overscroll,scroll #} {# wf_blink_components: Blink>CSS
#} {# wf_featured_image:/web/updates/images/2017/11/overscroll-behavior/card.png
#} {# wf_featured_snippet: The CSS overscroll-behavior property allows
developers to override the browser's overflow scroll effects when reaching the
top/bottom of content. It can be used to customize or prevent the mobile
pull-to-refresh action. #}

# Assuma o controle de seu pergaminho: personalizando os efeitos pull-to-refresh e overflow {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %} {% include
"web/_shared/contributors/majidvp.html" %} {% include
"web/_shared/contributors/sunyunjia.html" %}

<style>
figure {
  text-align: center;
}
figcaption {
  font-size: 14px;
  font-style: italic;
}
.border {
  border: 1px solid #ccc;
}
.centered {
  display: flex;
  justify-content: center;
}
</style>

### TL; DR {: #tldr .hide-from-toc}

A propriedade [CSS
`overscroll-behavior`](https://wicg.github.io/overscroll-behavior/) permite que
os desenvolvedores substituam o comportamento de rolagem de estouro padrão do
navegador ao atingir a parte superior / inferior do conteúdo. Os casos de uso
incluem desativar o recurso de puxar para atualizar no celular, remover os
efeitos de brilho excessivo e faixas de borracha e impedir que o conteúdo da
página role enquanto estiver sob uma sobreposição / modal.

`overscroll-behavior` requer o Chrome 63 ou superior. Está em desenvolvimento ou
sendo considerado por outros navegadores. Consulte
[chromestatus.com](https://www.chromestatus.com/feature/5734614437986304) para
mais informações. {: .caution }

## fundo

### Limites e encadeamento de rolagem {: #scrollchaining }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-scroll.mp4" autoplay
loop muted alt="Drawer demo" height="300"></video>
  </a>
  <figcaption>Encadeamento de rolagem no Chrome Android.</figcaption>
</figure>

A rolagem é uma das maneiras mais fundamentais de interagir com uma página, mas
é possível lidar com certos padrões de UX devido aos comportamentos padrão
peculiares do navegador. Como exemplo, use uma gaveta de aplicativos com um
grande número de itens pelos quais o usuário talvez precise rolar. Quando
atingem a parte inferior, o contêiner de estouro para de rolar porque não há
mais conteúdo para consumir. Em outras palavras, o usuário atinge um "limite de
rolagem". Mas observe o que acontece se o usuário continuar a rolar. **O
conteúdo *atrás* da gaveta começa a rolar** ! A rolagem é assumida pelo
contêiner pai; a página principal em si no exemplo.

Acontece que esse comportamento é chamado de **encadeamento de rolagem** ; o
comportamento padrão do navegador ao rolar o conteúdo. Muitas vezes, o padrão é
muito bom, mas às vezes não é desejável ou mesmo inesperado. Certos aplicativos
podem oferecer uma experiência diferente para o usuário quando ele atinge um
limite de rolagem.

### O efeito de puxar para atualizar {: #p2r }

O Pull-to-refresh é um gesto intuitivo popularizado por aplicativos móveis como
o Facebook e o Twitter. Puxar para baixo em um feed social e liberar cria um
novo espaço para o carregamento de postagens mais recentes. De fato, esse UX em
particular se tornou *tão popular* que navegadores móveis como o Chrome no
Android adotaram o mesmo efeito. Passar o dedo para baixo na parte superior da
página atualiza a página inteira:

<div class="clearfix centered">
  <figure class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/twitter.mp4"
autoplay muted loop height="350" class="border"></video>
    </a>
<figcaption>Pull-to-refresh personalizado do Twitter <br> ao atualizar um
feed em seu PWA.</figcaption>
  </figure>
  <figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/mobilep2r.mp4" autoplay
muted loop height="350" class="border"></video>
    </a>
<figcaption>Ação pull-to-refresh nativa do Chrome Android <br> atualiza a
página inteira.</figcaption>
  </figure>
</div>

Para situações como o [PWA](/web/progressive-web-apps/) do Twitter, pode fazer
sentido desativar a ação pull-to-refresh nativa. Por quê? Neste aplicativo, você
provavelmente não deseja que o usuário atualize a página acidentalmente. Há
também o potencial de ver uma animação de atualização dupla! Como alternativa,
pode ser melhor personalizar a ação do navegador, alinhando-a mais à marca do
site. A parte infeliz é que esse tipo de personalização foi difícil de realizar.
Os desenvolvedores acabam escrevendo JavaScript desnecessário, adicionam
ouvintes de toque [não
passivos](/web/tools/lighthouse/audits/passive-event-listeners) (que bloqueiam a
rolagem) ou colam a página inteira em 100vw / vh `<div>` (para impedir que a
página transborde). Essas soluções alternativas têm efeitos negativos [bem
documentados](https://wicg.github.io/overscroll-behavior/#intro) no desempenho
da rolagem.

Nós podemos fazer melhor!

## Introdução `overscroll-behavior` {: #intro }

A [propriedade](https://wicg.github.io/overscroll-behavior/)
`overscroll-behavior` é um novo recurso CSS que controla o comportamento do que
acontece quando você rola um container em excesso (incluindo a própria página).
Você pode usá-lo para cancelar o encadeamento de rolagem, desativar /
personalizar a ação de puxar para atualizar, desativar os efeitos de
`overscroll-behavior` no iOS (quando o Safari implementa o `overscroll-behavior`
) e muito mais. A melhor parte é que o <strong
data-md-type="double_emphasis">uso `overscroll-behavior` não afeta adversamente
o desempenho da página,</strong> como os hacks mencionados na introdução!

A propriedade assume três valores possíveis:

1. **auto** - Padrão. Os pergaminhos originados no elemento podem se propagar
para elementos ancestrais.

- **conter** - impede o encadeamento de rolagem. Os pergaminhos não se propagam
para ancestrais, mas os efeitos locais dentro do nó são mostrados. Por exemplo,
o efeito de brilho excessivo no Android ou o efeito de bandas de borracha no iOS
que notifica o usuário quando ele atinge um limite de rolagem. **Nota** : usar
`overscroll-behavior: contain` no elemento `html` impede ações de navegação de
overscroll.
- **nenhum** - o mesmo que `contain` mas também evita efeitos de ultrapassagem
dentro do próprio nó (por exemplo, brilho de ultrapassagem no Android ou
elástico no iOS).

Nota: `overscroll-behavior` também suporta atalhos para `overscroll-behavior-x`
e `overscroll-behavior-y` se você deseja apenas definir comportamentos para um
determinado eixo.

Vamos mergulhar em alguns exemplos para ver como usar o `overscroll-behavior` .

## Impedir que os pergaminhos escapem de um elemento de posição fixa {: #fixedpos }

### O cenário da caixa de bate-papo {: #chat }

<figure class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-chaining.mp4"
autoplay muted loop alt="Chatbox demo" height="350" class="border"></video>
  </a>
<figcaption>O conteúdo abaixo da janela de bate-papo também rola
:(</figcaption>
</figure>

Considere uma caixa de bate-papo com posição fixa que fica na parte inferior da
página. A intenção é que a caixa de bate-papo seja um componente independente e
que role separadamente do conteúdo por trás dela. No entanto, devido ao
encadeamento de rolagem, o documento começa a rolar assim que o usuário atinge a
última mensagem no histórico de bate-papo.

Para este aplicativo, é mais apropriado manter os pergaminhos originados na
caixa de bate-papo. Podemos fazer isso acontecendo adicionando
`overscroll-behavior: contain` ao elemento que contém as mensagens de bate-papo:

```css
#chat .msgs {
  overflow: auto;
  overscroll-behavior: contain;
  height: 300px;
}
```

Essencialmente, estamos criando uma separação lógica entre o contexto de rolagem
da caixa de bate-papo e a página principal. O resultado final é que a página
principal permanece colocada quando o usuário atinge a parte superior / inferior
do histórico de bate-papo. Os pergaminhos iniciados na caixa de bate-papo não se
propagam.

### O cenário de sobreposição de página {: #overlay }

Outra variação do cenário "underscroll" é quando você vê o conteúdo rolando
atrás de uma **sobreposição de posição fixa** . Um `overscroll-behavior` sorteio
morto está em ordem! O navegador está tentando ser útil, mas acaba deixando o
site com erros.

**Exemplo** - modal com e sem `overscroll-behavior: contain` :

<figure class="clearfix centered">
  <div class="attempt-left">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-off.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Antes</b> : o conteúdo da página rola abaixo da
sobreposição.</figcaption>
  </div>
  <div class="attempt-right">
<a href="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
target="_blank">
<video src="/web/updates/images/2017/11/overscroll-behavior/modal-on.mp4"
autoplay muted loop height="290"></video>
    </a>
<figcaption><b>Depois</b> : o conteúdo da página não rola abaixo da
sobreposição.</figcaption>
  </div>
</figure>

## Desativando o pull-to-refresh {: #disablp2r }

**Desativar a ação de puxar para atualizar é uma única linha de CSS** . Apenas
evite o encadeamento de rolagem em todo o elemento de definição da porta de
visualização. Na maioria dos casos, isso é `<html>` ou `<body>` :

```css
body {
  /* Disables pull-to-refresh but allows overscroll glow effects. */
  overscroll-behavior-y: contain;
}
```

Com esta simples adição, corrigimos as animações de puxar para atualizar na
[demo da](https://ebidel.github.io/demos/chatbox.html) caixa de
[bate](https://ebidel.github.io/demos/chatbox.html) -
[papo](https://ebidel.github.io/demos/chatbox.html) e, em vez disso, podemos
implementar um efeito personalizado que usa uma animação de carregamento mais
limpa. A caixa de entrada inteira também fica embaçada quando a caixa de entrada
é atualizada:

<figure class="clearfix centered">
  <div class="attempt-left">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Antes</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-double-refresh-fix.mp4"
autoplay muted loop height="225"></video>
    <figcaption>Depois de</figcaption>
  </div>
</figure>

Aqui está um trecho do [código
completo](https://github.com/ebidel/demos/blob/master/chatbox.html) :

```html
<style>
  body.refreshing #inbox {
    filter: blur(1px);
    touch-action: none; /* prevent scrolling */
  }
  body.refreshing .refresher {
    transform: translate3d(0,150%,0) scale(1);
    z-index: 1;
  }
  .refresher {
    --refresh-width: 55px;
    pointer-events: none;
    width: var(--refresh-width);
    height: var(--refresh-width);
    border-radius: 50%; 
    position: absolute;
    transition: all 300ms cubic-bezier(0,0,0.2,1);
    will-change: transform, opacity;
    ...
  }
</style>

<div class="refresher">
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
  <div class="loading-bar"></div>
</div>

<section id="inbox"><!-- msgs --></section>

<script>
  let _startY;
  const inbox = document.querySelector('#inbox');

  inbox.addEventListener('touchstart', e => {
    _startY = e.touches[0].pageY;
  }, {passive: true});

  inbox.addEventListener('touchmove', e => {
    const y = e.touches[0].pageY;
    // Activate custom pull-to-refresh effects when at the top of the container
    // and user is scrolling up.
    if (document.scrollingElement.scrollTop === 0 && y > _startY &&
        !document.body.classList.contains('refreshing')) {
      // refresh inbox.
    }
  }, {passive: true});
</script>
```

## Desativando efeitos de brilho excessivo e faixas de borracha {: #disableglow }

Para desativar o efeito de rejeição ao atingir um limite de rolagem, use
`overscroll-behavior-y: none` :

```css
body {
  /* Disables pull-to-refresh and overscroll glow effect.
     Still keeps swipe navigations. */
  overscroll-behavior-y: none;
}
```

<figure class="clearfix centered">
  <div class="attempt-left">
<video src="/web/updates/images/2017/11/overscroll-behavior/drawer-glow.mp4"
autoplay muted loop height="300" class="border"></video>
<figcaption><b>Antes</b> : bater no limite da rolagem mostra um
brilho.</figcaption>
  </div>
  <div class="attempt-right">
<video
src="/web/updates/images/2017/11/overscroll-behavior/drawer-noglow.mp4" autoplay
muted loop height="300" class="border"></video>
    <figcaption><b>Depois</b> : brilho desativado.</figcaption>
  </div>
</figure>

Nota: Isso ainda preservará as navegações de deslize para a esquerda / direita.
Para impedir navegações, você pode usar o `overscroll-behavior-x: none` . No
entanto, isso [ainda](https://crbug.com/762023) está [sendo
implementado](https://crbug.com/762023) no Chrome.

## Demonstração completa {: #demo }

Juntando tudo, a [demonstração](https://ebidel.github.io/demos/chatbox.html)
completa da `overscroll-behavior` usa o `overscroll-behavior` para criar uma
animação personalizada de puxar para atualizar e impedir que os pergaminhos
escapem do widget da `overscroll-behavior` . Isso fornece uma experiência ideal
para o usuário, que seria difícil de obter sem o `overscroll-behavior` CSS.

<figure>
  <a href="https://ebidel.github.io/demos/chatbox.html" target="_blank">
<video
src="/web/updates/images/2017/11/overscroll-behavior/chatbox-fixed.mp4" autoplay
muted loop alt="Chatbox demo" height="600"></video>
  </a>
<figcaption><a href="https://ebidel.github.io/demos/chatbox.html"
target="_blank">Ver demonstração</a> | <a
href="https://github.com/ebidel/demos/blob/master/chatbox.html"
target="_blank">Fonte</a></figcaption>
</figure>

<br>
