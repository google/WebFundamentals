project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O JavaScript nos permite modificar quase todos os aspectos da página: conteúdo, estilo e sua resposta à interação do usuário. No entanto, o JavaScript também pode bloquear a construção do DOM e retardar a renderização da página. Para proporcionar um desempenho ótimo, faça seu JavaScript assíncrono e elimine qualquer JavaScript desnecessário do caminho crítico de renderização.

{# wf_updated_on: 2014-09-17 #}
{# wf_published_on: 2013-12-31 #}

# Acrescentando Interatividade com JavaScript {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

O JavaScript nos permite modificar quase todos os aspectos da página: conteúdo,
estilo e sua resposta à interação do usuário. No entanto, o JavaScript também pode
 bloquear a construção do DOM e retardar a renderização da página. Para proporcionar um
desempenho ótimo, faça seu JavaScript assíncrono e elimine qualquer JavaScript desnecessário
do caminho crítico de renderização.

### TL;DR {: .hide-from-toc }
- O JavaScript pode consultar e modificar o DOM e o CSSOM.
- A execução do JavaScript bloqueia o CSSOM.
- O JavaScript bloqueia a construção do DOM a menos que declarado explicitamente como assíncrono.


O JavaScript é uma linguagem dinâmica executada em um navegador que permite alterar praticamente todos os aspectos do comportamento da página. Podemos modificar o conteúdo adicionando e removendo elementos da árvore do DOM; podemos modificar as propriedades do CSSOM de cada elemento; podemos lidar com as interações do usuário; entre muitas outras funções. Para demonstrar isso, vamos aumentar o nosso exemplo anterior "Hello World" com um script em linha simples:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/script.html){: target="_blank" .external }

* O JavaScript permite acessar o DOM e obter a referência ao nó de span oculto. O nó pode não estar visível na árvore de renderização, mas está presente no DOM. Quando obtemos a referência, podemos alterar seu texto (usando .textContent) e até modificar a propriedade calculada de estilo de exibição de "none" para "inline". Agora nossa página exibe "**Hello interactive students!**".

* O JavaScript também permite criar, aplicar estilos e anexar e remover novos elementos no DOM. Tecnicamente, a nossa página inteira poderia ser apenas um grande arquivo de JavaScript que cria e aplica estilos aos elementos, um por um. Embora isso funcione, na prática, usar HTML e CSS é muito mais fácil. Na segunda parte da nossa função JavaScript, criamos um novo elemento div, definimos seu conteúdo de texto, aplicamos um estilo e o anexamos ao corpo.

<img src="images/device-js-small.png"  alt="visualização da página">

Com isso, modificamos o conteúdo e o estilo CSS de um nó DOM existente e adicionamos um nó totalmente novo ao documento. Nossa página não ganhará nenhum prêmio de design, mas mostra o poder e a flexibilidade proporcionados pelo JavaScript.

Porém, embora o JavaScript nos dê muito poder, ele cria muitas limitações adicionais sobre como e quando a página é renderizada.

Primeiro, observe no exemplo acima que o script em linha está perto do final da página. Por quê? Bem, você dever tentar fazer isso, mas se mudarmos o script para acima do elemento _span_, ele falha e informa que não consegue encontrar uma referência para qualquer elemento _span_ no documento; ou seja, _getElementsByTagName(‘span')_ retorna _null_. Isso demonstra uma propriedade importante: o nosso script é executado no ponto exato em que é inserido no documento. Quando o analisador HTML encontra uma tag script, interrompe seu processo de construção do DOM e passa o controle ao mecanismo do JavaScript. Depois que o JavaScript conclui a execução, o navegador reinicia do ponto de interrupção e retoma a construção do DOM.

Em outras palavras, nosso bloco de script não consegue encontrar elementos definidos posteriormente na página porque ainda não foram processados. Ou, de forma ligeiramente diferente, **a execução do nosso script em linha bloqueia a construção do DOM, o que, por sua vez, também retarda a renderização inicial.**

Outra propriedade sutil da inclusão de scripts em nossa página é que, além de ler e modificar o DOM, eles também podem fazer o mesmo nas propriedades do CSSOM. Na verdade, é exatamente isso que fazemos em nosso exemplo quando mudamos a propriedade de exibição do elemento span de none para inline. O resultado final? Criamos uma condição de corrida.

E se o navegador não tiver concluído o download e a criação do CSSOM no momento da execução do script? A resposta é simples, embora não muito boa para o desempenho: **o navegador interrompe a execução do script até concluir o download e a construção do CSSOM.**

Em suma, o JavaScript introduz uma série de novas dependências entre o DOM, o CSSOM e a execução de JavaScript. Isto pode causar atrasos significativos no navegador ao processar e renderizar a página na tela:

* O local do script no documento é significativo.
* Quando o navegador encontra uma tag de script, a construção do DOM faz uma pausa até que a execução do script termine.
* O JavaScript pode consultar e modificar o DOM e o CSSOM.
* A execução do JavaScript faz uma pausa até que o CSSOM esteja pronto.

Em grande medida, quando mencionamos "otimizar o caminho crítico de renderização", estamos falando essencialmente sobre compreender e otimizar o gráfico de dependência entre HTML, CSS e JavaScript.

## Bloqueio de analisador versus JavaScript assíncrono

Por padrão, a execução do JavaScript bloqueia o analisador. Quando o navegador encontra um script em um documento, deve suspender a construção do DOM, passar o controle ao tempo de execução do JavaScript e deixar que o script seja executado antes de continuar com a construção do DOM. Vimos como isso funciona com um script em linha no exemplo anterior. Na verdade, scripts em linha sempre bloqueiam o analisador, a menos que você crie código adicional para adiar a execução dos scripts.

E os scripts incluídos com uma tag script? No exemplo anterior, vamos extrair o código para um arquivo separado:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script.html" region_tag="full" adjust_indentation="auto" %}
</pre>

**app.js**

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/app.js" region_tag="full" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script.html){: target="_blank" .external }

Quer usemos uma tag de &lt;script&gt; ou um snippet de JavaScript em linha, 
espera-se que ambos se comportem da mesma maneira. Em ambos os casos, o navegador faz uma pausa e
executa o script antes que ele possa processar o restante do documento.
No entanto, **no caso de arquivos JavaScript externos, o navegador também terá que suspender o processamento para
aguardar que o script em disco, cache ou servidor remoto seja recuperado,
o que pode acrescentar milhares de milissegundos de demora ao caminho crítico de
renderização.**

Por padrão, todo JavaScript bloqueia o analisador. Como o navegador não sabe o que o script está planejando fazer na página, ele assume o pior cenário e bloqueia o analisador. Um sinal para o navegador de que o script não precisa ser executado no ponto exato onde é referenciado permite que o navegador continue construindo o DOM e deixe o script ser executado quando estiver pronto; por exemplo, depois que o arquivo é recuperado a partir do cache ou de um servidor remoto.  

Para conseguir isso, marcamos o nosso script como _async_:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/performance/critical-rendering-path/_code/split_script_async.html" region_tag="full" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/performance/critical-rendering-path/split_script_async.html){: target="_blank" .external }

Adicionar a palavra-chave async à tag do script informa ao navegador para não bloquear a construção do DOM enquanto aguarda que o script seja disponibilizado, o que pode melhorar significativamente o desempenho.

<a href="measure-crp" class="gc-analytics-event" data-category="CRP"
    data-label="Next / Measuring CRP">
  <button>A seguir: Medição do caminho crítico de renderização</button>
</a>


{# wf_devsite_translation #}
