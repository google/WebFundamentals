---
title: "Adição de interatividade com JavaScript"
description: "JavaScript possibilita alterar praticamente todos os aspectos da página: conteúdo, estilo e seu comportamento, mediante interações do usuário. No entanto, JavaScript também pode bloquear a criação e o atraso de DOM quando a página é renderizada. Transforme seu JavaScript em assíncrono e elimine qualquer JavaScript desnecessário do caminho de processamento essencial para atingir um desempenho otimizado."
updated_on: 2014-09-18
key-takeaways:
  adding-interactivity:
    - JavaScript pode consultar e modificar DOM e CSSOM.
    - Blocos de execução de JavaScript no CSSOM.
    - JavaScript bloqueia a criação de DOM, a menos que isso seja explicitamente declarado como assíncrono.
---
<p class="intro">
  JavaScript possibilita alterar praticamente todos os aspectos da página: conteúdo, estilo e seu comportamento, mediante interações do usuário. No entanto, JavaScript também pode bloquear a criação e o atraso de DOM quando a página é renderizada. Transforme seu JavaScript em assíncrono e elimine qualquer JavaScript desnecessário do caminho de processamento essencial para atingir um desempenho otimizado.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.adding-interactivity %}

JavaScript é uma linguagem dinâmica executada no navegador e que permite alterar praticamente todos os aspectos do comportamento da página: é possível modificar o conteúdo na página adicionando ou removendo elementos da árvore DOM, modificar as propriedades de CSSOM de cada elemento, manipular a entrada do usuário e muito mais. Para ilustrar isso em uma ação, vamos incrementar o exemplo anterior `Olá, mundo` com um script in-line:

{% include_code src=_code/script.html snippet=full %}

* JavaScript possibilita chegar ao DOM e extrair a referência ao nó de dimensão oculto. O nó pode não estar visível na árvore de renderização, mas ainda está no DOM. Assim, depois de coletar a referência, é possível alterar o texto (via .textContent) e até substituir a propriedade de estilo de exibição calculada de `none` para `inline`. Depois de concluído, a página exibirá `**Olá, estudantes interativos.**`.

* JavaScript também possibilita criar, estilizar e anexar e remover novos elementos ao DOM. De fato, toda a página poderia ser um grande arquivo de JavaScript que cria e estiliza os elementos individualmente. Isso funcionaria, mas, na prática, trabalhar com HTML e CSS é muito mais fácil. Na segunda parte de nossa função JavaScript, nós criamos um novo elemento div, definimos o conteúdo de texto, estilizamos esse conteúdo e o anexamos ao corpo.

<img src="images/device-js-small.png" class="center" alt="visualização da página">

Com isso, modificamos o conteúdo e o estilo de CSS de um nó DOM existente e adicionamos um novo nó ao documento. Nossa página não receberá um prêmio por seu design, mas isso foi para ilustrar o alcance e a flexibilidade que o JavaScript fornece.

No entanto, há uma grande limitação de desempenho à espreita. JavaScript fornece muito alcance, mas também cria muitas limitações adicionais para o momento e a forma como a página é renderizada.

Primeiro, perceba que, no exemplo acima, nosso script in-line está próximo à parte inferior da página. Por quê? Se movermos o script para cima do elemento _span_ element, o script apresentará falha e indicará que não é possível encontrar referência a quaisquer elementos _span_ no documento, ou seja, _getElementsByTagName('span')_ retornará _null_. Isso demonstra uma propriedade importante: nosso script é executado no ponto exato onde ele está inserido no documento. Quando o analisador de HTML encontra uma tag de script, ele interrompe seu processo de criação do DOM e fornece o controle para o mecanismo de JavaScript. Quando o mecanismo de JavaScript termina de ser executado, o navegador continua de onde parou e retoma a criação do DOM.

Em outras palavras, nosso bloqueio de script não conseguirá encontrar elementos posteriormente na página porque eles ainda não terão sido processados. Ou, dito de outra forma: **executar o script in-line bloqueia a criação de DOM, o que também atrasará a renderização inicial.**

Outra propriedade sutil ao introduzir scripts na página é a capacidade que os scripts têm de ler e modificar não apenas o DOM, mas as propriedades de CSSOM. De fato, isso é exatamente o que estamos fazendo no exemplo ao alterar a propriedade de exibição do elemento de dimensão de none para inline. O resultado final? Agora temos uma condição de corrida.

E se o navegador não tiver terminado de fazer o download e a criação do CSSOM quando quisermos executar o script? A resposta é simples e não muito boa para o desempenho: **o navegador atrasará a execução do script até que tenha concluído o download e a criação do CSSOM e, enquanto esperamos, a criação do DOM também fica bloqueada.**

Resumindo, o JavaScript introduz novas subordinações entre a execução de DOM, CSSOM e JavaScript e pode levar a atrasos significativos no processamento e na renderização da página na tela, feita pelo navegador:

1. A localização do script no documento é significativa.
2. A criação do DOM é interrompida quando uma tag de script é encontrada e até que a execução do script seja concluída.
3. O JavaScript pode consultar e modificar o DOM e o CSSOM.
4. A execução de JavaScript é atrasada até que o CSSOM esteja pronto.

Quando falamos em `otimizar o caminho de processamento essencial`, em grande medida estamos falando sobre entender e otimizar o gráfico de dependência entre HTML, CSS e JavaScript.


## Bloqueio de analisador vs. JavaScript assíncrono

Por padrão, a execução de JavaScript bloqueia o analisador: quando o navegador encontra um script no documento, ele deve interromper a criação do DOM, passar o controle para o tempo de execução do JavaScript e deixar o script ser executado antes de prosseguir na criação do DOM. Já vimos isso em um script in-line no exemplo anterior. De fato, scripts in-line sempre bloqueiam o analisador, a menos que você adote medidas especiais e escreva um código adicional para deferir a execução.

E quanto aos scripts incluídos por meio de uma tag de script? Vamos tomar o exemplo anterior e extrair o código em um arquivo separado:

{% include_code src=_code/split_script.html snippet=full %}

**app.js**

{% include_code src=_code/app.js snippet=full lang=javascript %}

Você esperaria que a ordem de execução fosse diferente ao usar uma tag `<script>` em vez de um snippet JavaScript in-line? Logicamente, a resposta é `não`, pois eles são idênticos e devem se comportar da mesma forma. Em ambos os casos, o navegador precisa ser interrompido e executar o script antes de poder processar o restante do documento. No entanto, **no caso de um arquivo JavaScript externo, o navegador também terá de parar e esperar o script ser buscado a partir do disco, cache ou de um servidor remoto, o que pode adicionar um atraso de dezenas a milhares de milésimos de segundos ao caminho de processamento essencial.**

Dito isso, boas notícias: há, sim, uma saída. Por padrão, todo JavaScript bloqueia o analisador, e como o navegador não sabe o que o script está tentando fazer na página, precisa supor a pior situação possível e bloquear o analisador. E se pudéssemos sinalizar isso ao navegador e informá-lo que o script não precisa ser executado no mesmo ponto em que ele é referenciado no documento? Fazer isso habilitaria o navegador a continuar a criar o DOM e permitiria a execução do script assim que ele estivesse pronto, por exemplo, depois de o arquivo ser buscado a partir do cache ou de um servidor remoto.

Então, como conseguimos isso? É bem simples, podemos marcar o script como _async_:

{% include_code src=_code/split_script_async.html snippet=full %}

Adicionar a palavra-chave assíncrona à tag do script informa ao navegador que ele não deve bloquear a criação do DOM enquanto espera pela disponibilização do script. Essa é uma grande vitória em termos de desempenho.



