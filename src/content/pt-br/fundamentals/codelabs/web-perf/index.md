project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Esse codelab ensinará você a identificar e eliminar afunilamento de desempenho de Aplicativos Web.

{# wf_auto_generated #}
{# wf_updated_on: 2016-10-20T18:16:09Z #}
{# wf_published_on: 2016-01-01 #}


# Detectar e Consertar Problemas de Desempenho de Aplicativos Web {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}




##  Introdução




Este codelab é uma versão em texto de parte do conteúdo discutido em um curso da Udacity sobre desempenho de aplicativos/Web ([ud860](https://www.udacity.com/course/browser-rendering-optimization--ud860)). Em vez de simplesmente transcrever o curso em vídeo, o propósito deste codelab é tratar de forma enxuta e concisa a identificação e a correção das instabilidades, usando o projeto final prático original do curso.


Visão geral do ## 




Todos já vimos aplicativos com telas que costumam ser exibidas irregularmente durante animações, rolagem ou outras interações do usuário. Essa inconsistência visível é um problema de desempenho conhecido geralmente como *instabilidade* (jank) ou *trepidação* (judder), e é uma perturbação irritante para os usuários; ela interrompe seu fluxo de pensamento durante o uso do aplicativo, fazendo com que o mesmo pareça menos refinado e profissional.

Se o navegador demorar demais para criar e exibir um quadro, ele será ignorado e não será exibido. Em vez dele, você verá o próximo (ou o seguinte após o próximo) e o objeto se deslocará irregularmente na tela, em vez de deslizar suavemente.

O fenômeno da instabilidade pode ser evitado garantindo que o aplicativo execute com uma taxa consistente de sessenta quadros por segundo (60 fps). Muitos fatores influenciam a taxa de quadros de um aplicativo. Há várias formas de codificar JavaScript e CSS para reduzir ou eliminar a instabilidade e alcançar a taxa desejada.

Este codelab trata da alteração da abordagem dos problemas de desempenho, ajudando você a encontrar e corrigir os gargalos de exibição de quadros que causam a instabilidade.

### O que você precisa saber antes de começar

*  *Caminho crítico de renderização:*  Você deve compreender o pipeline de renderização e como é afetado pelo JavaScript e pelo CSS. Saiba mais aqui: [https://developers.google.com/web/fundamentals/performance/critical-rendering-path/](/web/fundamentals/performance/critical-rendering-path/) e aqui: Curso da Udacity [Otimização de desempenho de websites: O caminho crítico de renderização](https://www.udacity.com/course/website-performance-optimization--ud884)__.__
*  *Quadros e taxa de quadros:*  Você deve saber como o navegador cria quadros e porque a taxa de 60 fps é importante para uma exibição suave. Saiba mais aqui:  [https://developers.google.com/web/fundamentals/performance/rendering/](/web/fundamentals/performance/rendering/) e aqui: Curso da Udacity [Otimização de renderização em navegador: Criação de apps da Web com 60 fps](https://www.udacity.com/course/browser-rendering-optimization--ud860).
*  *Ciclo de vida do aplicativo:*  Você deve entender as partes de resposta, Animação, Ocioso e Carregamento de um aplicativo em execução e reconhecer as janelas de oportunidade que cada parte apresenta. Saiba mais aqui:  [O modelo de desempenho RAIL](/web/fundamentals/performance/rail)
*  *Chrome DevTools:*  Você deve conhecer os conceitos básicos do DevTools e saber como usá-lo para analisar um app da Web, particularmente a ferramenta Timeline. Saiba mais aqui: [Analisar desempenho em tempo de execução](/web/tools/chrome-devtools/rendering-tools/).

### O que você aprenderá neste codelab

* Como identificar código de aplicativos que causa gargalos de desempenho na exibição
* Como analisar e modificar o código para reduzir ou eliminar os gargalos

### O que você precisará em seu espaço de trabalho de desenvolvimento

* Navegador Google Chrome, DevTools
* O exemplo de código do projeto prático (veja abaixo)

### Instabilidade/trepidação

Vamos nos familiarizar com a instabilidade jogando o jogo "Jank Invaders", de Jake Archibald. Ele foi criado para demonstrar problemas com taxas de quadros e desempenho. Veja a seguir uma captura de tela do jogo.

![4a4d206daaf5693a.png](img/4a4d206daaf5693a.png)

No jogo, espaçonaves se movem pela tela. Os heróis se movem suavemente e os vilões ("naves espiãs") se movem de forma instável. Sua tarefa: identificar e detonar as dez naves espiãs instáveis entre os heróis (não instáveis) clicando nelas o mais rápido possível. [Clique aqui para acessar o jogo](http://jakearchibald.github.io/jank-invaders/). Experimente, divirta-se e volte depois de concluir o jogo.

É óbvio que os usuários notam a instabilidade e quase sempre escolhem os aplicativos com melhor desempenho. Na Web, ocorre o mesmo: o mau desempenho acaba com bons sites. Este codelab ajuda você a pensar sobre o desempenho do seu projeto e a identificar as formas de identificar e corrigir problemas comuns. Você procurará as causas de rolagem irregular, atualizações com telas intermitentes e animações com trepidação para conseguir uma taxa de quadros suave e sem interrupções de 60 fps.


## O aplicativo do projeto




Vamos começar examinando o aplicativo que você depurará neste codelab. Veja abaixo a aparência do aplicativo.

![36d93b5f28eb60c5.png](img/36d93b5f28eb60c5.png)

Este site usa a __Hacker News API__ para mostrar matérias recentes e suas pontuações. No momento, o desempenho do aplicativo é muito insatisfatório, particularmente em dispositivos móveis. No entanto, não há motivo para que não possa alcançar 60 fps. Ao final deste codelab, você terá as habilidades, as técnicas e, o mais importante, a atitude necessária para transformar esse aplicativo instável em uma experiência atraente e eficiente de 60 fps.

### Obtenha o código do projeto

Antes de mais nada, obtenha o código do aplicativo, em suas duas versões: "antes" e "depois". Você pode clonar os repositórios ou baixar os arquivos .zip.

* Este é o aplicativo original com gargalos de desempenho em um [repositório do GitHub](http://github.com/udacity/news-aggregator). E este é o [site de produção](http://udacity.github.io/news-aggregator/), caso queira examiná-lo. Você trabalhará com essa versão.
* Este é o aplicativo concluído, sem gargalos de desempenho, em um [repositório do GitHub](https://github.com/udacity/news-aggregator/tree/solution). Use essa versão corrigida como referência.

### Execute o aplicativo original

Primeiro, execute a versão instável original. No Chrome, abra __index.html__ na pasta de alto nível (por exemplo, news-aggregator-master). Experimente usar o aplicativo. Você notará rapidamente alguns problemas de desempenho de alto nível nas duas principais interações do usuário: a rolagem da tela principal e o deslizar das matérias. Veremos esses problemas principais para descobrir como melhorar o desempenho instável do aplicativo.


## Exercício 1: Rolagem de lista




Durante a rolagem na tela principal, você notará trepidações na lista de matérias. Além disso, você verá que indicadores de pontos das matérias individuais (os números em círculos) mudam de valor e de cor. Este exercício identificará esses problemas e escolherá a sua abordagem.

Vamos ver no Timeline o que realmente acontece quando rolamos a tela principal. Certifique-se de que a caixa de seleção __JS Profile__ esteja ativada antes de começar sua gravação. Inicie uma gravação, role a lista para baixo um pouco e interrompa a gravação. 

No topo da gravação, você verá um indicador de FPS em verde. Você deve ver uma barra verde com alguns picos ocasionais, como na imagem abaixo. O fato de que a barra verde está tão baixa indica que a tela não estava alcançando 60 FPS.

![2e40b3134f26b0fa.png](img/2e40b3134f26b0fa.png)

Aumente o zoom de sua gravação e você verá que, após o evento de rolagem, há uma chamada de função, seguida de muitos eventos separados de layout, cada um com um triângulo vermelho de aviso. Os eventos de layout são os eventos roxo muito finos na parte inferior do gráfico na imagem abaixo. Este é um sinal claro de que *layouts síncronos forçados* estão ocorrendo.

![d6fb17faaa99e6f.png](img/d6fb17faaa99e6f.png)

Passe o cursor para identificar um evento de layout e, em seguida, clique nele para ver seus detalhes. 

![fce56d36285bc1fc.png](img/fce56d36285bc1fc.png)

Examine os detalhes de um evento de layout. Você verá que o aviso de layout síncrono forçado é gerado pela função `colorizeAndScaleStories` em app.js.

![f58a21a56040ce6a.png](img/f58a21a56040ce6a.png)

Vamos examinar essa função.

```
function colorizeAndScaleStories() {

  var storyElements = document.querySelectorAll('.story');

  // It does seem awfully broad to change all the
  // colors every time!
  for (var s = 0; s < storyElements.length; s++) {

    var story = storyElements[s];
    var score = story.querySelector('.story__score');
    var title = story.querySelector('.story__title');

    // Base the scale on the y position of the score.
    var height = main.offsetHeight;
    var mainPosition = main.getBoundingClientRect();
    var scoreLocation = score.getBoundingClientRect().top -
        document.body.getBoundingClientRect().top;
    var scale = Math.min(1, 1 - (0.05 * ((scoreLocation - 170) / height)));
    var opacity = Math.min(1, 1 - (0.5 * ((scoreLocation - 170) / height)));

    score.style.width = (scale * 40) + 'px';
    score.style.height = (scale * 40) + 'px';
    score.style.lineHeight = (scale * 40) + 'px';

    // Now figure out how wide it is and use that to saturate it.
    scoreLocation = score.getBoundingClientRect();
    var saturation = (100 * ((scoreLocation.width - 38) / 2));

    score.style.backgroundColor = 'hsl(42, ' + saturation + '%, 50%)';
    title.style.opacity = opacity;
  }
}
```

Observe que `height`, `width` e `line-height` são acessados, o que causa uma execução do layout. Além disso, a opacidade é definida. Embora uma alteração de opacidade não acione o layout, essa linha de código aplica um novo estilo, que acionao recálculo e, novamente o layout. Essas duas técnicas usadas no loop principal da função causam o problema de layout síncrono forçado. 

Em seguida, considere o efeito visual dos indicadores de pontos da matéria, que não adicionam nenhuma informação valiosa. Podemos conseguir esse efeito com propriedades do CSS em vez de JavaScript. Mas a melhor saída pode ser eliminar o efeito completamente. Conclusão: algumas vezes, a melhor correção de código é eliminar o código.

Vamos remover as chamadas para a função `colorizeAndScaleStories`. Recomende a remoção das linhas 88, 89 e 305 em app.js, assim como toda a própria função, linhas 255-286. Não exclua as linhas, porque os números das linhas a que fazemos referência mais adiante neste codelab não corresponderão ao seu aplicativo. Agora, os pontos da matéria têm a mesma aparência o tempo todo.

Execute o aplicativo novamente, grave alguma atividade de rolagem no Timeline e aumente o zoom em um evento de rolagem. Desta vez, você verá que há apenas um recálculo estilo após a rolagem, e que a barra de FPS é muito maior.   

![5e9d66cb007f9076.png](img/5e9d66cb007f9076.png)

Os layouts extras e os respectivos avisos de layout síncrono forçado desapareceram e a taxa de quadros é excelente. Um problema de instabilidade a menos.


## Exercício 2: Concatenação de matérias




Outro problema que afeta a lisura do aplicativo é a rolagem instável quando matérias são adicionadas à lista. Observe a chamada para `loadStoryBatch` no código `scroll` do ouvinte de evento.

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    loadStoryBatch();
});
```

Esta função faz alterações visíveis à página através da inserção de novas matérias na página à medida que é carregada, especificamente, anexando nós do DOM usando `appendChild`. Não há nada de intrinsecamente errado na função, nem na abordagem de design que a utiliza, mas considere como ela está sendo chamada.

A função `loadStoryBatch` é catch-as-catch-can; ela é executada sempre que necessário, com base no teste `loadThreshold`, sem levar em conta o que mais está acontecendo na página ou onde o navegador está no processo de construção de quadros. Isso ocorre porque o motor de JavaScript não presta atenção ao pipeline de renderização durante a execução de scripts. Esse imediatismo causará um problema de desempenho, especialmente à medida que mais matérias são adicionadas à lista. Podemos resolver este problema usando *requestAnimationFrame*.

Idealmente, qualquer coisa que faz uma mudança visível na página deve acontecer dentro de uma chamada requestAnimationFrame. Vamos fazer essa modificação no código `scroll` do ouvinte de evento.

```
main.addEventListener('scroll', function() {

  ...

  // Check if we need to load the next batch of stories.
  var loadThreshold = (main.scrollHeight - main.offsetHeight -
      LAZY_LOAD_THRESHOLD);
  if (main.scrollTop > loadThreshold)
    requestAnimationFrame(loadStoryBatch);
});
```

Essa alteração simples garante que nosso script relacionado à animação seja executado no início do processo de pipeline, e fornece um pequeno, mas significativo, aumento de desempenho.


## Exercício 3: Deslizamento das matérias (parte 1)




Outra área problemática do nosso aplicativo agregador de notícias é a ação básica de deslizar matérias para dentro e para fora da tela. Além da rolagem, esse é o recurso de interação do usuário mais usado do aplicativo.

Como sempre, comece fazendo uma gravação no Timeline de uma matéria deslizando para dentro e fora e examinando a taxa de quadros. O deslizamento pode variar de ligeiramente instável até totalmente imprestável em diversos dispositivos. Não deixe de acessar o [site de produção](http://udacity.github.io/news-aggregator/) em um dispositivo móvel, mas ele é problemático em todas as plataformas.

![59865afca1e508ef.png](img/59865afca1e508ef.png)

Em geral, sempre que vir um evento roxo com um triângulo vermelho sobre ele, você deve investigar passando o cursor sobre ele e clicando para ver seus detalhes. Agora, você está interessado no layout síncrono forçado que ocorreu depois que um temporizador foi acionado. 

![1bd8f7700f55a6c4.png](img/1bd8f7700f55a6c4.png)

A animação deslizante está acionando um temporizador e um layout síncrono forçado está ocorrendo. Os detalhes apontam para a linha 180 no arquivo app.js, que é uma função denominada `animate`. Vamos examinar essa função.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        setTimeout(animate, 4);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Uma das primeiras coisas a observar é que o `setTimeout`, que define a próxima chamada para `animate`. Como você aprendeu no exercício anterior, o trabalho visível executado na página deve normalmente ser feito dentro de uma chamada de `requestAnimationFrame`. Mas esse `setTimeout` específico é um problema.

A correção óbvia e fácil aqui é forçar o agendamento de cada chamada a `animate` no início de sua sequência de quadros, colocando-a dentro de um `requestAnimationFrame`.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Se você fizer outra gravação no Timeline, verá um aumento de desempenho moderado a considerável, dependendo do dispositivo.

Pergunta extra: pense sobre o que ocorre no deslizamento das matérias. Estamos apenas fazendo com que uma matéria apareça e desapareça na página, revelando e ocultando conteúdo. Isso parece ser um processo de transição simples. Precisamos mesmo de JavaScript para fazer isso, ou poderíamos fazer o mesmo só com CSS? Voltaremos a esse cenário no Exercício 5.


## Exercício 4: Desperdício de memória




As animações instáveis não são o único motivo do desempenho insuficiente em aplicativos e páginas da Web. Outro fator importante é o uso ineficiente de memória. E o nosso agregador de notícias também é afetado por esse problema.

Quando uma manchete de matéria é clicada na lista principal, o aplicativo cria o conteúdo da matéria, adiciona-o à página e desliza a página para visualização. A parte que precisa ser examinada é a adição à página. A função que trata o clique em uma matéria é convenientemente denominada `onStoryClick`. Vamos examiná-la.

```
function onStoryClick(details) {

  var storyDetails = $('sd-' + details.id);

  // Wait a little time then show the story details.
  setTimeout(showStory.bind(this, details.id), 60);

  // Create and append the story. A visual change...
  // perhaps that should be in a requestAnimationFrame?
  // And maybe, since they're all the same, I don't
  // need to make a new element every single time? I mean,
  // it inflates the DOM and I can only see one at once.
  if (!storyDetails) {

    if (details.url)
      details.urlobj = new URL(details.url);

    var comment;
    var commentsElement;
    var storyHeader;
    var storyContent;

    var storyDetailsHtml = storyDetailsTemplate(details);
    var kids = details.kids;
    var commentHtml = storyDetailsCommentTemplate({
      by: '', text: 'Loading comment...'
    });

    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);

    commentsElement = storyDetails.querySelector('.js-comments');
    storyHeader = storyDetails.querySelector('.js-header');
    storyContent = storyDetails.querySelector('.js-content');

    var closeButton = storyDetails.querySelector('.js-close');
    closeButton.addEventListener('click', hideStory.bind(this, details.id));

    var headerHeight = storyHeader.getBoundingClientRect().height;
    storyContent.style.paddingTop = headerHeight + 'px';

    if (typeof kids === 'undefined')
      return;

    for (var k = 0; k < kids.length; k++) {

      comment = document.createElement('aside');
      comment.setAttribute('id', 'sdc-' + kids[k]);
      comment.classList.add('story-details__comment');
      comment.innerHTML = commentHtml;
      commentsElement.appendChild(comment);

      // Update the comment with the live data.
      APP.Data.getStoryComment(kids[k], function(commentDetails) {

        commentDetails.time *= 1000;

        var comment = commentsElement.querySelector(
            '#sdc-' + commentDetails.id);
        comment.innerHTML = storyDetailsCommentTemplate(
            commentDetails,
            localeData);
      });
    }
  }
}
```

Após o primeiro grupo de declarações de variáveis, observe as quatro linhas que criam a variável `storyDetails`, definindo tipo, atributos e conteúdo de seu elemento. Logo após, observe que `storyDetails` é adicionada ao DOM como um novo nó usando o método `appendChild`.

A princípio, isso não é necessariamente um problema, mas é um desperdício que cresce com o uso do aplicativo. Naturalmente, o usuário vê apenas uma matéria por vez, mas os novos nós criados para cada matéria visualizada nunca são descartados. Depois de alguns cliques, o DOM estará repleto de nós abandonados que consomem memória e retardam o aplicativo. Quanto mais o aplicativo for usado, pior será o seu desempenho.

Uma forma melhor de obter esse recurso é criar apenas um nó `storyDetails` permanente mais cedo no script para conter a matéria atual e depois usar a confiável propriedade `innerHTML` para redefinir o conteúdo do nó a cada nova matéria, em vez de criar um novo nó. Em outras palavras, você simplesmente este código: 

```
    storyDetails = document.createElement('section');
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.classList.add('story-details');
    storyDetails.innerHTML = storyDetailsHtml;

    document.body.appendChild(storyDetails);
```

Por este:

```
    storyDetails.setAttribute('id', 'sd-' + details.id);
    storyDetails.innerHTML = storyDetailsHtml;
```

Sem dúvida, essa mudança melhorará o desempenho no longo prazo, mas não fará nada no curto prazo. 

Ainda precisamos resolver o problema do deslizamento das matérias.


## Exercício 5: Deslizamento das matérias (parte 2)




Até agora, além de melhorarmos o desempenho geral do aplicativo, também resolvemos alguns problemas específicos de desempenho, como a rolagem da lista. No entanto, ao executar o aplicativo melhorado, ainda podemos observar alguma instabilidade na outra interação do usuário importante, o deslizamento das matérias.

Vamos examinar esse processo. No Timeline, ative o gerador de perfis do JavaScript e faça uma gravação do Timeline incluindo o clique na manchete de uma matéria para deslizá-la para dentro da tela e o clique no botão X da matéria para deslizá-la para fora. Como vimos no Exercício 3, a função `onStoryClick` (ainda) causa um layout síncrono forçado.

![33ba193a24cb7303.png](img/33ba193a24cb7303.png)

Naquele exercício, colocamos chamadas de função `animate` em um `requestAnimationFrame`; o que certamente ajudou, mas não eliminou totalmente o problema. 

Você se lembra que, em nossa discussão anterior (e em sua pesquisa em [Acionadores CSS](http://csstriggers.com/)), vimos que o uso de propriedades específicas causa a execução de determinadas partes do pipeline de renderização. Vamos examinar `animate` novamente.

```
function animate () {

  // Find out where it currently is.
  var storyDetailsPosition = storyDetails.getBoundingClientRect();

  // Set the left value if we don't have one already.
  if (left === null)
        left = storyDetailsPosition.left;

  // Now figure out where it needs to go.
  left += (0 - storyDetailsPosition.left) * 0.1;

  // Set up the next bit of the animation if there is more to do.
  if (Math.abs(left) > 0.5)
        requestAnimationFrame(animate);
  else
        left = 0;

  // And update the styles. Wait, is this a read-write cycle?
  // I hope I don't trigger a forced synchronous layout!
  storyDetails.style.left = left + 'px';
}
```

Perto do fim da função, a propriedade `left` é definida. Isso faz com que o navegador execute o layout. Logo depois, a propriedade `style` é definida. Isso faz com que o navegador execute o recálculo de estilos. Como sabemos, se isso ocorrer mais de uma vez em um quadro, causará um layout síncrono forçado. E isso acontece várias vezes nessa função. 

A função `animate` está dentro da função `showStory` e de sua função irmã, `hideStory`. Ambas atualizam as mesmas propriedades e causam um problema de layout síncrono forçado.

Como vimos anteriormente neste codelab, algumas vezes a melhor correção de código é remover o código. Sim, as funções `showStory` e `hideStory` funcionam, mas são muito complexas para o que deveria ser um efeito simples. Portanto, vamos deixá-las de lado por enquanto e examinar a possibilidade de executar esse efeito com o CSS. Considere este código de CSS.

```
.story-details {
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  top: 0;
  left: 100%;
  width: 100%;
  height: 100%;
  background: white;
  z-index: 2;
  box-shadow:
      0px 2px 7px 0px rgba(0, 0, 0, 0.10);

  overflow: hidden;
  transition: transform 0.3s;
  will-change: transform;
}

.story-details.visible {
  transform: translateX(-100vw);
}

.story-details.hidden {
  transform: translateX(0);
}
```

A primeira coisa a observar na classe `.story-details` é que definimos a propriedade `left` a 100%. Qualquer que seja a largura da tela, essa configuração empurrará o elemento da matéria para a direta, completamente fora da página visível, o que na realidade significa que o elemento ficará oculto. 

Em seguida, nas classes `.story-details.visible` e `.story-details.hidden`, definimos um `transform` em cada uma delas para forçar a posição X (horizontal) para -100vw (*largura da janela de visualização*) e 0, respectivamente. Ao serem aplicadas, essas classes deslocarão o conteúdo da matéria para visualização ou de volta à sua posição original, fora da tela.

Em seguida, para garantir que a matéria surja realmente como uma animação e não surja e desapareça subitamente, definimos uma `transition` no `transform` para permitir que ela demore 0,3 s (33 ms) para se posicionar. Isso garante um efeito visual suave de deslizamento para dentro e para fora.

Finalmente, usamos a propriedade `will-change` para notificar o navegador sobre prováveis alterações de `transform`.

Voltando às funções `showStory` e `hideStory`, agora podemos simplificá-las consideravelmente para apenas adicionar ou remover as novas classes `visible` e `hidden`, alcançando a alteração visual desejada sem scripts complexos.

```
function showStory(id) {
  if (!storyDetails)
    return;

  storyDetails.classList.add('visible');
  storyDetails.classList.remove('hidden');
}

function hideStory(id) {
  storyDetails.classList.add('hidden');
  storyDetails.classList.remove('visible');
}
```

Tudo isso deve gerar benefícios consideráveis no desempenho de deslizamento do aplicativo. No entanto, a única forma de termos certeza é testando o aplicativo. Faça outra gravação no Timeline incluindo o deslizamento de uma matéria para dentro e para fora e examine os resultados.

![5543cf34c10a914b.png](img/5543cf34c10a914b.png)

A execução do aplicativo deve estar muito melhor. Todos os quadros estão agora bem abaixo da linha de 60 fps e os avisos de layout síncrono forçado desapareceram. O melhor de tudo é que não precisamos mais usar o JavaScript para executar a animação de deslizamento. 

O nosso trabalho de aprimoramento básico de desempenho está concluído.


## Parabéns!




Se você acompanhou as descrições e as explicações e fez a mudanças recomendadas no código do projeto original, deve ter agora um aplicativo que executa sem problemas a 60 fps sem qualquer instabilidade nas animações.

### O que foi discutido?

Neste codelab, discutimos:

* Conhecimentos necessários: caminho crítico de renderização, quadros e taxa de quadros, ciclo de vida do aplicativo e Chrome DevTools
* Uma visão geral da instabilidade: o que é, por que ocorre e como identificá-la visualmente
* O aplicativo do projeto: qual seu objetivo, por que não consegue fazer animações sem problemas e como encontrar e corrigir os problemas

### Quais as conclusões?

As conclusões mais importantes deste codelab são:

* Uma animação instável na tela pode ser resultado de problemas no código e no projeto.
* A percepção da instabilidade (ou a não percepção) é um fator importante na decisão do usuário sobre usar ou não um aplicativo.
* Até mesmo pequenos ajustes de velocidade podem melhorar substancialmente o desempenho de um aplicativo ao longo do tempo.

### O que vem por aí?

Recomendamos que você examine o código do projeto concluído, disponível nesse [repositório do GitHub](https://github.com/udacity/news-aggregator/tree/solution). Você notará que esse código é melhor que o que pudemos fazer neste codelab. Compare as versões "antes" e "depois" do aplicativo e verifique as diferenças de código para ver o que mais foi alterado pelos autores para melhorar o desempenho do aplicativo.

### Obrigado!

Agradecemos o seu trabalho neste codelab. Estamos sempre procurando melhorar. Se você encontrou um erro ou um problema, ou se tiver quaisquer sugestões ou comentários, entre em contato conosco usando o link de feedback abaixo. Boa codificação!




{# wf_devsite_translation #}
