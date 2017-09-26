project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Os usuários esperam que as páginas sejam interativas e suaves. Cada etapa no pipeline de pixels representa uma oportunidade para introduzir instabilidade. Conheça ferramentas e estratégias para identificar e consertar problemas comuns que prejudicam o desempenho em tempo de execução.

{# wf_updated_on: 2016-03-15 #}
{# wf_published_on: 2015-04-13 #}

# Analisar o desempenho em tempo de execução {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Os usuários esperam que as páginas sejam interativas e suaves. Cada etapa no 
funil de pixels representa uma oportunidade para introduzir instabilidade. Conheça 
ferramentas e estratégias para identificar e consertar problemas comuns que prejudicam 
o desempenho em tempo de execução.


### TL;DR {: .hide-from-toc }
- Não escreva JavaScript que force o navegador a recalcular o layout. Separe funções de leitura e de gravação e realize as leituras primeiro.
- Não complique o CSS além do necessário. Use menos CSS e mantenha os seletores de CSS simples.
- Evite o layout o quanto puder. Escolha CSS que não acione nenhum layout.
- A pintura pode levar mais tempo do que qualquer outra atividade de renderização. Cuidado com os gargalos de pintura.


## JavaScript 

Cálculos de JavaScript, especialmente os que acionam grandes mudanças visuais,
podem paralisar a execução do aplicativo. Não deixe que JavaScript grande ou 
em momento inoportuno interfira nas interações do usuário.

### Ferramentas

Faça uma [gravação][recording] na **Timeline** e busque eventos 
**Evaluate Script** anormalmente longos. Se encontrar um desses eventos, você poderá ativar o 
[Criador de perfis JS][profiler] e refazer a gravação para obter informações 
mais detalhadas sobre exatamente quais funções do JS foram chamadas e quanto demorou cada 
chamada.

Se você notar muita instabilidade no JavaScript, poderá ser necessária 
uma análise mais detalhada com a coleta de um perfil de CPU do JavaScript.
Os perfis de CPU mostram onde o tempo de execução é gasto nas funções da página.
Saiba como criar perfis de CPU em [Acelerar a execução do JavaScript][cpu].

[profiler]: ../evaluate-performance/timeline-tool#profile-js
[cpu]: js-execution

### Problemas

A tabela a seguir descreve alguns problemas comuns de JavaScript e possíveis soluções:

<table>
  <thead>
      <th>Problema</th>
      <th>Exemplo</th>
      <th>Solução</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Gerenciadores de entrada pesados afetando resposta ou animação.</td>
      <td data-th="Example">Toque, rolagem com paralaxe.</td>
      <td data-th="Solution">Deixe o navegador processar toques e rolagens ou vincule o detector o mais tarde possível (consulte <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Gerenciadores de entrada pesados na lista de verificação de desempenho em tempo de execução de Paul Lewis</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">JavaScript em momento inoportuno afetando resposta, animação e carregamento.</td>
      <td data-th="Example">Rolagens do usuário logo após carregamento da página, setTimeout/setInterval.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Otimize a execução do JavaScript</a>: use  <code>requestAnimationFrame</code>, distribua a manipulação de DOM pelos quadros e use web workers.</td>
    </tr>
    <tr>
      <td data-th="Problem">JavaScript grande afetando a resposta.</td>
      <td data-th="Example">O <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">evento DOMContentLoaded</a> para quando é sobrecarregado com trabalho do JS.</td>
      <td data-th="Solution">Mova o trabalho computacional puro para os <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">web workers</a>. Se precisar de acesso ao DOM, use <code>requestAnimationFrame</code> (consulte também <a href="/web/fundamentals/performance/rendering/optimize-javascript-execution">Otimizar a execução do JavaScript</a>).</td>
    </tr>
    <tr>
      <td data-th="Problem">Scripts candidatos a lixo afetando resposta ou animação.</td>
      <td data-th="Example">A coleta de lixo pode acontecer em qualquer local.</td>
      <td data-th="Solution">Escreva menos scripts candidatos a lixo (consulte <a href="http://calendar.perfplanet.com/2013/the-runtime-performance-checklist/">Coleta de lixo em animação na lista de verificação de desempenho em tempo de execução de Paul Lewis</a>).</td>
    </tr>
  </tbody>
</table>

## Estilo 

As mudanças de estilo são pesadas, especialmente se afetarem mais de um 
elemento do DOM. Sempre que estilos são aplicados a um elemento, o navegador precisa 
descobrir o impacto em todos os elementos relacionados, recalcular o layout e 
pintar novamente.

Guias relacionados:

* [Reduzir o escopo e a complexidade dos cálculos de
  estilo](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

### Ferramentas

Faça uma [gravação][recording] de **Timeline**. Verifique a existência de grandes eventos
**Recalculate Style** (exibidos em roxo) na gravação.

Clique em um evento **Recalculate Style** para ver mais informações sobre ele no 
painel **Details**. Se das mudanças de estilo demorarem muito, trata-se de um 
problema de desempenho. Se os cálculos de estilo estiverem afetando muitos 
elementos, essa é outra área que pode ser melhorada.

![Recálculo de estilo demorado](imgs/recalculate-style.png)

Para reduzir o impacto de eventos **Recalculate Style**:

* Use os [Acionadores de CSS](https://csstriggers.com) para saber que propriedades CSS
  acionam layout, cor e composição. Essas propriedades produzem o pior impacto
  no desempenho de renderização.
* Alterne para propriedades que geram menos impacto. Consulte [Usar somente 
  propriedades do compositor e gerenciar o número de camadas][compositor] para obter mais orientação.

[compositor]: /web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count

### Problemas

A tabela a seguir descreve alguns problemas comuns de estilo e possíveis 
soluções:

<table>
  <thead>
      <th>Problema</th>
      <th>Exemplo</th>
      <th>Solução</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Cálculos de estilo pesados afetando resposta ou animação.</td>
      <td data-th="Example">Qualquer propriedade CSS que altera a geometria de um elemento, como largura, altura ou posição, força o navegador a verificar todos os outros elementos e refazer o layout.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Evite CSS que aciona layouts.</a></td>
    </tr>
    <tr>
      <td data-th="Problem">Seletores complexos afetando resposta ou animação.</td>
      <td data-th="Example">Os seletores aninhados forçam o navegador a saber tudo sobre todos os outros elementos, incluindo pais e filhos.</td>
      <td data-th="Solution"><a href="/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations">Referencie um elemento no CSS com apenas uma classe.</a></td>
    </tr>
  </tbody>
</table>

Guias relacionados:

* [Reduzir o escopo e a complexidade dos cálculos de
  estilo](/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)

## Layout 

Layout (ou reflow, no Firefox) é o processo pelo qual o navegador calcula 
a posição e o tamanho de todos os elementos de uma página. O modelo de layout da web 
indica que um elemento pode afetar outros. Por exemplo, a largura do 
elemento `<body>` normalmente afeta o comprimento de seus inferiores, e assim por diante,
em toda a extensão da árvore. Esse processo pode ser bastante pesado para o 
navegador.

Como regra geral, se solicitar o retorno de um valor geométrico pelo 
DOM antes da conclusão de um quadro, você enfrentará 
"layouts síncronos forçados", que poderão ser um grande gargalo de desempenho quando 
repetidos com frequência ou executados para uma árvore do DOM grande. 

Guias relacionados:

* [Evite a troca
  frequente de layouts](/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [Diagnosticar layouts síncronos
  forçados](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)


### Ferramentas

A **Timeline** do Chrome DevTools identifica quando uma página gera layouts
síncronos forçados. Esses eventos de **Layout** são marcados com barras vermelhas. 

![layout síncrono forçado](imgs/forced-synchronous-layout.png)

A "troca frequente de layouts" é uma repetição das condições de layout síncrono forçado.
Isto ocorre quando JavaScript grava e lê do DOM repetidamente, o que
força o navegador a recalcular o layout diversas vezes. Para identificar
a troca frequente de layouts, busque um padrão de vários avisos de layout síncrono
forçado (como na captura de tela acima).

### Problemas

A tabela a seguir descreve alguns problemas comuns de layout e possíveis 
soluções:

<table>
  <thead>
      <th>Problema</th>
      <th>Exemplo</th>
      <th>Solução</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Layout síncrono forçado afetando resposta ou animação.</td>
      <td data-th="Example">Forçar o navegador a executar o layout mais cedo no pipeline de pixels, resultando em etapas repetidas no processo de renderização.</td>
      <td data-th="Solution">Agrupe as leituras de estilo primeiro e depois execute as gravações (consulte também <a href="/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Evite layouts grandes e complexos e a troca frequente de layouts</a>).</td>
    </tr>
  </tbody>
    <tr>
      <td data-th="Problem">Troca frequente de layouts afetando resposta ou animação.</td>
      <td data-th="Example">Um loop que coloca o navegador em um ciclo de leitura-gravação-leitura-gravação, forçando o recálculo do layout pelo navegador repetidas vezes.</td>
      <td data-th="Solution">Agrupe automaticamente operações de leitura-gravação usando a <a href="https://github.com/wilsonpage/fastdom">biblioteca FastDom</a>.</td>
    </tr>
  </tbody>
</table>

## Pintar e compor 

A pintura é o processo de preencher os pixels. É, muitas vezes, a parte mais pesada do 
processo de renderização. Se você notou que uma página apresenta alguma forma de 
instabilidade, é provável que haja problemas de pintura.

A composição é o agrupamento das partes pintadas da página para 
exibição na tela. Na maior parte das vezes, se usar apenas propriedades 
do compositor e evitar totalmente a pintura, você perceberá provavelmente uma grande melhoria 
de desempenho. No entanto, é preciso ter cuidado com o número excessivo de camadas (consulte 
também [Usar somente propriedades do compositor e gerenciar o número de camadas](/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count)).

### Ferramentas

Você quer saber qual o tempo necessário para a pintura, ou com que frequência ela ocorre? Ative o 
[Criador de perfil de pintura][paint] no painel **Timeline** e [faça uma 
gravação][recording]. Se a maior parte do tempo de renderização for dedicado à pintura, você 
está com problemas de pintura. 

![Pinturas demoradas na gravação da timeline](imgs/long-paint.png)

Confira o menu de [**configurações de renderização**][rendering settings] para configurações 
adicionais que podem ajudar a diagnosticar problemas de pintura. 

### Problemas

A tabela a seguir descreve alguns problemas comuns de pintura e composição e possíveis soluções:

<table>
  <thead>
      <th>Problema</th>
      <th>Exemplo</th>
      <th>Solução</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Problem">Repetições de pintura afetando resposta ou animação.</td>
      <td data-th="Example">Grandes áreas de pintura ou pinturas pesadas afetando resposta ou animação.</td>
      <td data-th="Solution">Evite a pintura, promova elementos que se movem para uma camada própria e use transformações e opacidade (consulte <a href="/web/fundamentals/performance/rendering/simplify-paint-complexity-and-reduce-paint-areas">Simplificar a complexidade da pintura e reduzir as áreas de pintura</a>).</td>
    </tr>
        <tr>
      <td data-th="Problem">Explosões de camada afetando animações.</td>
      <td data-th="Example">Promoção excessiva de elementos demais com translateZ(0) gera grande impacto no desempenho da animação.
</td>
      <td data-th="Solution">Promova para camadas com moderação e somente quando souber que isso produzirá melhorias tangíveis (consulte <a href="/web/fundamentals/performance/rendering/stick-to-compositor-only-properties-and-manage-layer-count">Usar somente propriedades do compositor e gerenciar o número de camadas</a>).</td>
    </tr>
  </tbody>
</table>


[recording]: ../evaluate-performance/timeline-tool#make-a-recording
[paint]: ../evaluate-performance/timeline-tool#profile-painting
[rendering settings]: ../evaluate-performance/timeline-tool#rendering-settings


{# wf_devsite_translation #}
