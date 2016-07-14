---
title: "Análise de desempenho do caminho de processamento essencial"
description: "Identificar e resolver afunilamentos de desempenho do caminho de processamento essencial requer um bom conhecimento das ciladas comuns. Façamos um tour prático para extrair padrões comuns de desempenho que ajudarão a otimizar suas páginas."
updated_on: 2014-04-28
---
<p class="intro">
  Identificar e resolver afunilamentos de desempenho do caminho de processamento essencial requer um bom conhecimento das ciladas comuns. Façamos um tour prático para extrair padrões comuns de desempenho que ajudarão a otimizar suas páginas.
</p>


{% include shared/toc.liquid %}

A meta ao otimizar o caminho de processamento essencial é permitir que o navegador componha a página o mais rápido possível: páginas mais rápidas se traduzem em um engajamento e número de páginas visualizadas maior, além de [conversões melhores](http://www.google.com/think/multiscreen/success.html). Como resultado, queremos minimizar o tempo de visualização da tela preta que o visitante precisa enfrentar. Isso é feito otimizando os recursos a serem carregados e a ordem do carregamento.

Para ajudar a ilustrar esse processo, começaremos com o caso mais simples possível e criaremos a página aos poucos, incluindo recursos, estilos e lógica de aplicativo adicionais. No processo, também veremos onde estão os erros e como otimizar cada um desses casos.

Uma última coisa antes de começarmos... Até agora, nos focamos exclusivamente no que acontece no navegador quando o recurso (arquivo CSS, JS ou HTML) está disponível para processamento e ignoramos o momento em que esse recurso precisa ser buscado no cache ou na rede. Abordaremos em detalhes como otimizar os aspectos da rede de nosso aplicativo na próxima lição. Nesse meio-tempo (para tornar o processo mais real), suporemos o seguinte:

* Uma ida e volta da rede (latência de propagação) ao servidor levará 100 ms
* O tempo de resposta do servidor será de 100 ms para o documento HTML e de 10 ms para todos os outros arquivos

## A experiência `Olá, mundo`

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

Começamos com uma marcação HTML básica e uma única imagem, sem CSS ou JavaScript, a estrutura mais simples possível. Agora, abrimos a linha do tempo da rede no Chrome DevTools e inspecionamos a cascata de recursos resultante:

<img src="images/waterfall-dom.png" alt="" class="center" alt="CRP">

Como esperado, o arquivo HTML levou aproximadamente 200 ms para ter o download concluído. A parte transparente da linha azul indica o tempo que o navegador está aguardando pela rede, ou seja, nenhum byte de resposta foi recebido ainda, enquanto a parte opaca mostra o tempo necessário para a conclusão do download depois que os primeiros bytes de resposta forem recebidos. No exemplo acima, o download de HTML é pequeno (< 4 KB), então tudo o que precisamos é de uma única ida e volta para buscar o arquivo completo. Como resultado, a busca do documento HTML leva aproximadamente 200 ms para ser realizada, sendo que metade desse tempo foi gasto aguardando a rede, e a outra metade foi gasta aguardando a resposta do servidor.

Quando o conteúdo HTML é disponibilizado, o navegador tem de analisar os bytes, convertê-los em tokens e criar a árvore DOM. O DevTools convenientemente informa o tempo do evento DOMContentLoaded na parte inferior (216 ms), o que também corresponde à linha azul vertical. A lacuna entre o fim do download do HTML e a linha azul vertical (DOMContentLoaded) representa o tempo gasto pelo navegador para criar a árvore DOM, nesse caso, apenas alguns milésimos de segundos.

Por último, perceba algo interessante: nossa `foto incrível` não bloqueou o evento domContentLoaded. Acontece que podemos criar a árvore de renderização e até compor a página sem ter de esperar por cada recurso na página: **nem todos os recursos são essenciais para compor a primeira composição rápida**. De fato, como veremos, ao falar sobre o caminho de processamento essencial, normalmente estamos falando sobre a marcação de HTML, CSS e JavaScript. As imagens não bloqueiam a renderização inicial da página. Contudo, também precisamos fazer com que as imagens sejam compostas o mais rápido possível.

Dito isso, o evento `load` (também conhecido comumente como `onload`), é bloqueado na imagem: o DevTools informa o evento onload aos 335 ms. Lembre-se de que o evento onload marca o ponto em que **todos os recursos** exigidos pela página foram transferidos e processados. Esse é o ponto em que o controle giratório de carregamento pode parar de girar no navegador, e ele é marcado pela linha vertical vermelha na cascata.


## Como adicionar JavaScript e CSS à combinação

Nossa página `experiência Olá, mundo` pode parecer simples por fora, mas há mil coisas acontecendo nos bastidores para que ela esteja ativa. Na prática, também precisaremos de algo mais além do HTML: provavelmente teremos uma folha de estilos CSS e um ou mais scripts para adicionar interatividade à página. Vamos adicionar ambos à combinação e ver o que acontece:

{% include_code src=_code/measure_crp_timing.html snippet=full %}

_Antes de adicionar JavaScript e CSS:_

<img src="images/waterfall-dom.png" alt="CRP de DOM" class="center">

_Com JavaScript e CSS:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

Ao adicionar arquivos CSS e JavaScript externos, adicionamos duas outras solicitações à cascata, as quais foram enviadas mais ou menos no mesmo momento pelo navegador. Por enquanto, tudo certo. No entanto, **perceba que agora há uma diferença de tempo bem menor entre os eventos domContentLoaded e onload. O que aconteceu?**

* Diferentemente de nosso exemplo em HTML sem formatação, agora precisamos buscar e analisar o arquivo CSS para criar o CSSOM e sabemos que precisamos tanto do DOM quanto do CSSOM para criar a árvore de renderização.
* Como também temos um analisador bloqueando o arquivo JavaScript na página, o evento domContentLoaded é bloqueado até que o arquivo CSS seja transferido e analisado: o JavaScript pode consultar o CSSOM, por isso, é preciso bloquear e aguardar o CSS antes de executar o JavaScript.

**E se substituíssemos o script externo por um script in-line?** Uma dúvida aparentemente trivial, mas que é bastante complicada. Mesmo que o script seja colocado diretamente in-line na página, a única forma confiável de o navegador saber o que o script pretende fazer é executando-o, como já sabemos, e isso não pode ser feito até que o CSSOM seja criado.  Resumindo, o JavaScript in-line também bloqueia o analisador.

Dito isso, apesar de bloqueá-lo no CSS, colocar o script in-line faz com que a página seja renderizada mais rápido? Se o último cenário foi complicado, este é mais complicado ainda. Vamos tentar e ver o que acontece...

_JavaScript externo:_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_JavaScript in-line:_

<img src="images/waterfall-dom-css-js-inline.png" alt="DOM, CSSOM e JS in-line" class="center">

Estamos fazendo uma solicitação a menos, mas nossos tempos de onload e domContentLoaded são efetivamente os mesmos, por quê? Sabemos que não importa se o JavaScript é in-line ou externo, pois, assim que o navegador alcançar a tag de script, ele fará o bloqueio e aguardará até que o CSSOM seja criado. Além disso, no primeiro exemplo, CSS e JavaScript estão sendo transferidos em paralelo pelo navegador, e o download de ambos será concluído praticamente ao mesmo tempo. Como resultado, nesse exemplo em especial, colocar o código JavaScript in-line não é de grande ajuda. Então, estamos presos aqui sem ter o que fazer para renderizar a página mais rápido? Na realidade, temos várias estratégias diferentes.

Primeiro, lembre-se de que todos os scripts in-line bloqueiam o analisador, mas, para os scripts externos, podemos adicionar a palavra-chave `async` para desbloquear o analisador. Vamos desfazer a colocação in-line e tentar isso:

{% include_code src=_code/measure_crp_async.html snippet=full %}

_JavaScript bloqueador do analisador (externo):_

<img src="images/waterfall-dom-css-js.png" alt="DOM, CSSOM, JS" class="center">

_JavaScript assíncrono (externo):_

<img src="images/waterfall-dom-css-js-async.png" alt="DOM, CSSOM, JS assíncrono" class="center">

Muito melhor. O evento domContentLoaded é acionado logo depois da análise do HTML: o navegador sabe que não deve bloquear o JavaScript e, como não há outro analisador bloqueando os scripts, a criação do CSSOM também pode prosseguir em paralelo.

Como alternativa, podíamos ter tentado uma abordagem diferente e colocado CSS e JavaScript in-line:

{% include_code src=_code/measure_crp_inlined.html snippet=full %}

<img src="images/waterfall-dom-css-inline-js-inline.png" alt="DOM, CSS in-line, JS in-line" class="center">

O tempo _domContentLoaded_ é efetivamente o mesmo do exemplo anterior: em vez de marcar nosso JavaScript como assíncrono, colocamos o CSS e o JS in-line na própria página. Isso aumentou muito a página HTML, mas a parte boa é que o navegador não precisa esperar para buscar recursos externos: tudo está ali, na própria página.

Como você pode ver, mesmo em uma página muito simples, otimizar o caminho de processamento essencial não é um exercício trivial: precisamos entender o gráfico de dependência entre recursos diferentes, identificar quais recursos são `essenciais` e escolher entre diferentes estratégias de inclusão desses recursos na página. Não há solução única para o problema: cada página é diferente, e você terá de seguir um processo semelhante para descobrir a melhor estratégia.

Vejamos se é possível voltar algumas etapas e identificar alguns padrões gerais de desempenho...


## Padrões de desempenho

A página mais simples conta apenas com a marcação de HTML: não contém CSS, JavaScript nem outros tipos de recursos. Para renderizar essa página, o navegador precisa iniciar a solicitação, aguardar a chegada do documento HTML, analisá-lo, criar o DOM e, por último, renderizá-lo na tela:

{% include_code src=_code/basic_dom_nostyle.html snippet=full %}

<img src="images/analysis-dom.png" alt="CRP Olá, mundo" class="center">

**O tempo entre  T<sub>0</sub> e T<sub>1</sub> captura os tempos de processamento de rede e servidor.** Na melhor das hipóteses (se o arquivo HTML for pequeno), tudo de que precisaremos será uma única ida e volta da rede para buscar todo o documento. Devido à forma como os protocolos de transportes TCP funcionam, arquivos maiores podem exigir mais idas e voltas, mas isso é um assunto que abordaremos em outra lição. **Como resultado, podemos dizer que a página acima, na melhor das hipóteses, tem um caminho de processamento essencial de uma ida e volta (mínimo).**

Agora, consideremos a mesma página, mas como um arquivo CSS externo:

{% include_code src=_code/analysis_with_css.html snippet=full %}

<img src="images/analysis-dom-css.png" alt="DOM + CRP CSSOM" class="center">

Novamente, chamaremos uma ida e volta de rede para buscar o documento HTML, e depois a marcação recuperada informará que também é necessário ter um arquivo CSS: isso significa que o navegador precisa voltar ao servidor e coletar a CSS antes que a página seja renderizada na tela. **Como resultado, essa página chamará no mínimo duas idas e voltas antes da exibição da página** - novamente, o arquivo CSS pode exigir várias idas e voltas, por isso a ênfase em `mínimo`.

Vamos definir o vocabulário que usaremos para descrever o caminho de processamento essencial:

* **Recurso essencial:** recurso que pode bloquear a renderização inicial da página.
* **Duração do caminho essencial:** número de idas e voltas ou o número total necessário para buscar todos os recursos essenciais.
* **Bytes essenciais:** número total de bytes necessários para gerar a primeira renderização da página, que é a soma dos tamanhos de arquivo de transferência de todos os recursos essenciais.
Nosso primeiro exemplo, uma única página HTML, continha um único recurso essencial (o documento HTML), a duração do caminho essencial também se igualava a uma ida e volta da rede (supondo que o arquivo fosse pequeno), e o total de bytes essenciais era apenas o tamanho de transferência do próprio documento HTML.

Comparemos isso às características do caminho essencial do exemplo de HTML + CSS acima:

<img src="images/analysis-dom-css.png" alt="DOM + CRP CSSOM" class="center">

* **2** recursos essenciais
* **2** ou mais idas e voltas para a duração mínima do caminho essencial
* **9** KB de bytes essenciais

Precisamos do HTML e do CSS para criar a árvore de renderização e, como resultado, tanto HTML quanto CSS são recursos essenciais: a CSS é buscada somente depois que o navegador coleta o documento HTML e por isso a duração do caminho essencial é de, no mínimo, duas idas e voltas. Ambos os recursos somam um total de 9 KB de bytes essenciais.

OK, vamos adicionar um arquivo JavaScript extra à combinação

{% include_code src=_code/analysis_with_css_js.html snippet=full %}

Adicionamos app.js, que é um recurso JavaScript externo na página e, como já sabemos, é um recurso de bloqueio do analisador (ou seja, essencial). Para poder executar o arquivo JavaScript, também teremos de fazer o bloqueio e aguardar o CSSOM: lembre-se de que o JavaScript pode consultar o CSSOM e, por isso, o navegador será interrompido até que `style.css` seja transferido e o CSSOM seja criado.

<img src="images/analysis-dom-css-js.png" alt="CRP de DOM, CSSOM, JavaScript" class="center">

Na prática, se observarmos a "cascata da rede" desta página, você notará que as solicitações de CSS e JavaScript serão iniciadas quase ao mesmo tempo: o navegador coleta o HTML, detecta ambos os recursos e inicia ambas as solicitações. Como resultado, a página acima tem as seguintes características de caminho essencial:

* **3** recursos essenciais
* **2** ou mais idas e voltas para a duração mínima do caminho essencial
* **11** KB de bytes essenciais

Agora, temos três recursos essenciais que somam até 11 KB de bytes essenciais, mas a duração de nosso caminho essencial é de duas idas e voltas, pois podemos transferir o CSS e o JavaScript em paralelo. **Adaptar as características de seu caminho de processamento essencial significa poder identificar quais são os recursos essenciais e também entender como o navegador programa as buscas desses recursos.** Continuemos com nosso exemplo.

Depois de conversar com nossos desenvolvedores de sites, percebemos que o JavaScript que incluímos na página não precisa ser do tipo bloqueador: temos algumas análises e outros códigos que não precisam bloquear a renderização da página. Sabendo isso, é possível adicionar o atributo `async` à tag de script para desbloquear o analisador:

{% include_code src=_code/analysis_with_css_js_async.html snippet=full %}

<img src="images/analysis-dom-css-js-async.png" alt="CRP de DOM, CSSOM e JavaScript assíncrono" class="center">

Transformar o script em assíncrono traz diversas vantagens:

* O script não mais bloqueia o analisador e não faz parte do caminho de processamento essencial
* Como não há outros scripts essenciais, a CSS também não precisa bloquear o evento domContentLoaded
* Quanto mais cedo o evento domContentLoaded for acionado, mais cedo outra lógica de aplicativo poderá ser executada

Como resultado, nossa página otimizada volta a dois recursos essenciais (HTML e CSS), com uma duração mínima de caminho essencial de duas idas e voltas e um total de 9 KB de bytes essenciais.

Por último, digamos que a folha de estilos de CSS foi necessária apenas para impressão. Como isso seria?

{% include_code src=_code/analysis_with_css_nb_js_async.html snippet=full %}

<img src="images/analysis-dom-css-nb-js-async.png" alt="DOM, CSS sem bloqueio e CRP de JavaScript assíncrono" class="center">

Como o recurso style.css é usado apenas para impressão, o navegador não precisa bloqueá-lo para renderizar a página. Por isso, assim que a criação do DOM estiver completa, o navegador terá informações suficientes para renderizar a página. Como resultado, esta página tem apenas um recurso essencial (o documento HTML), e a duração mínima do caminho de processamento essencial é de uma ida e volta.



