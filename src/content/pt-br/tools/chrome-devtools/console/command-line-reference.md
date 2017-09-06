project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2015-08-02 #}
{# wf_published_on: 2015-04-13 #}

# Referência da API Command Line {: .page-title }

{% include "web/_shared/contributors/andismith.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

A API Command Line contém um conjunto de funções convenientes para realizar tarefas comuns: selecionar e inspecionar elementos de DOM, exibir dados em formato legível, parar e iniciar o criador de perfil e monitorar eventos de DOM.

Observação: Essa API só está disponível dentro do próprio console. Não é possível acessar a API Command Line a partir de scripts da página.


## $_

`$_` retorna o valor da última expressão avaliada.

No exemplo a seguir,
uma expressão simples (`2 + 2`) é avaliada.
A propriedade `$_` então é avaliada,
que contém o mesmo valor:

![$_ é a última expressão avaliada](images/recently-evaluated-expression-1.png)

No próximo exemplo,
a expressão avaliada inicialmente contém uma matriz de nomes.
Avaliando `$_.length` para descobrir o comprimento da matriz,
o valor armazenado em `$_` muda
para se tornar a expressão avaliada mais recentemente,  4:

![$_ muda quando novos comandos são avaliados](images/recently-evaluated-expression-2.png)

## $0 - $4

Os comandos `$0`, `$1`, `$2`, `$3` e `$4` funcionam como referência histórica para os últimos cinco elementos de DOM inspecionados no painel Elements
ou os últimos cinco objetos de pilha JavaScript selecionados no painel Profiles
`$0` retorna o elemento ou o objeto JavaScript selecionado mais recentemente,
`$1` retorna o segundo selecionado mais recentemente, e assim por diante.

No seguinte exemplo,
um elemento com a classe `medium` é selecionado no painel Elements.
Na gaveta Console, `$0` foi avaliado
e exibe o mesmo elemento:

![Exemplo de $0](images/element-0.png)

A imagem abaixo mostra um elemento diferente selecionado na mesma página.
O `$0` agora está ligado ao elemento recentemente selecionado,
enquanto `$1` retorna o anteriormente selecionado:

![Exemplo de $1](images/element-1.png)

## $(selector)

`$(selector)` retorna a referência ao primeiro elemento de DOM
com o seletor de CSS especificado.
Esta função é um alias para a função
[document.querySelector()](https://docs.webplatform.org/wiki/css/selectors_api/querySelector).

O exemplo a seguir retorna uma referência
ao primeiro elemento `<img>` do documento:

![Exemplo de $('img')](images/selector-img.png)

Clique com o botão direito no resultado retornado e
selecione “Reveal in Elements Panel” para encontrá-lo no DOM
ou "Scroll in to View" para exibi-lo na página.

O exemplo a seguir retorna uma referência ao elemento atualmente selecionado e exibe sua propriedade src:

![Exemplo de $('img').src](images/selector-img-src.png)

Observação: Se você estiver usando uma biblioteca como a jQuery que use  <code>$</code>, essa funcionalidade será substituída e  <code>$</code> corresponderá à implementação dessa biblioteca.

## $$(selector)

`$$(selector)` retorna uma matriz de elementos
que correspondem ao seletor de CSS em questão.
Este comando é equivalente a chamar
[document.querySelectorAll()](https://docs.webplatform.org/wiki/css/selectors_api/querySelectorAll).

O exemplo a seguir usa `$$()` para criar uma matriz
de todos os elementos `<img>` no documento atual e
exibe o valor da propriedade `src` de cada elemento:

		var images = $$('img');
		for (each in images) {
			console.log(images[each].src);
		}

![Exemplo de uso de $$() para selecionar todas as imagens do documento e exibir suas fontes.](images/all-selector.png)

Observação: Pressione <kbd class='kbd'>Shift</kbd> + <kbd class='kbd'>Enter</kbd> no console para iniciar uma nova linha sem executar o script.

## $x(path)

`$x(path)` retorna uma matriz de elementos de DOM
que corresponde à expressão XPath em questão.

Por exemplo,
o seguinte retorna todos os elementos `<p>` da página:

		$x("//p")

![Exemplo de uso de um seletor XPath](images/xpath-p-example.png)

O exemplo a seguir retorna todos os elementos `<p>` 
que contêm elementos `<a>`:

		$x("//p[a]")

![Exemplo de uso de um seletor XPath mais complicado](images/xpath-p-a-example.png)

## clear()

`clear()` apaga o console do histórico.

		clear();

## copy(object)

`copy(object)` copia uma representação de string do objeto especificado
para a área de transferência.

		copy($0);

## debug(function)

Quando a função especificada é chamada,
o depurador é invocado e interrompe dentro da função
no painel Sources, permitindo percorrer o código de depurá-lo.

		debug(getData);

![Como interromper dentro de uma função com debug()](images/debug.png)

Use `undebug(fn)` para parar a interrupção na função
ou use a IU para desativar todos os pontos de interrupção.

Para saber mais sobre pontos de interrupção,
consulte [Depurar com pontos de interrupção](/web/tools/chrome-devtools/javascript/add-breakpoints).

## dir(object)

`dir(object)` exibe uma lista de object-style
de todas as propriedades do objeto especificado.
Este método é um alias para o método `console.dir()` da Console API.

O exemplo a seguir mostra a diferença entre
avaliar `document.body` diretamente na linha de comando
e usar `dir()` para exibir o mesmo elemento:

		document.body;
		dir(document.body);

![Registrar document.body com e sem função dir()](images/dir.png)

Para saber mais,
consulte a entrada de [`console.dir()`](/web/tools/chrome-devtools/debug/console/console-reference#console.dir(object)) na Console API.

## dirxml(object)

`dirxml(object)` gera uma representação de XML do objeto especificado,
conforme visto na aba Elements.
Este método é equivalente ao método [console.dirxml()](https://developer.mozilla.org/en-US/docs/Web/API/Console).

## inspect(object/function) {:#inspect}

`inspect(object/function)` abre e seleciona o elemento ou objeto 
especificado no painel adequado: o painel Elements para elementos de DOM ou o painel Profiles para objetos de pilha JavaScript.

O exemplo a seguir abre o `document.body` no painel Elements:

		inspect(document.body);

![Inspecionar um elemento com inspect()](images/inspect.png)

Ao passar uma função para inspeção,
a função abre o documento
no painel Sources para você inspecionar.

## getEventListeners(object)

`getEventListeners(object)` retorna os detectores de evento registrados
no objeto especificado.
O valor de retorno é um objeto que contém uma matriz
para cada tipo de evento registrado ("click" ou "keydown", por exemplo).
Os membros de cada matriz são objetos
que descrevem o detector registrado para cada tipo.
Por exemplo,
o objeto a seguir lista todos os detectores
de evento registrados no objeto document:

		getEventListeners(document);

![Resultado por usar getEventListeners()](images/get-event-listeners.png)

Se mais de uma escuta estiver registrado no objeto especificado,
a matriz contém um membro para cada detector.
No exemplo a seguir,
há duas escutas de evento registrados no elemento #scrollingList
para o evento "mousedown":

![Várias escutas](images/scrolling-list.png)

Você pode expandir cada um desses objetos para explorar suas propriedades:

![Vista expandida de objeto de detector](images/scrolling-list-expanded.png)

## keys(object)

`keys(object)` retorna uma matriz que contém o nome
das propriedades que pertencem ao objeto especificado.
Para obter valores os associados das mesmas propriedades,
use `values()`.

Por exemplo,
suponha que seu aplicativo definiu o seguinte objeto:

		var player1 = { "name": "Ted", "level": 42 }

Presumindo que `player1` foi definido no namespace global (pela simplicidade), digitar `keys(player1)` e `values(player1)` no console gera
o seguinte:

![Exemplo dos métodos keys() e values()](images/keys-values.png)

## monitor(function)

Quando a função especificada é chamada,
uma mensagem é registrada no console para indicar o nome da função
junto com os argumentos que foram passados
à função quando ela foi chamada.

		function sum(x, y) {
			return x + y;
		}
		monitor(sum);

![Exemplo de método monitor()](images/monitor.png)

Use `unmonitor(function)` para interromper o monitoramento.

## monitorEvents(object[, events])

Quando um dos eventos especificados ocorre no objeto em questão,
o objeto Event é registrado no console.
É possível especificar um único evento para monitorar,
uma matriz de eventos ou um dos "tipos" de evento genéricos mapeados
para um conjunto predefinido de eventos. Veja os exemplos abaixo.

O seguinte monitora todos os eventos resize no objeto de janela.

		monitorEvents(window, "resize");

![Monitorar eventos resize de janela](images/monitor-events.png)

O exposto a seguir define uma matriz para monitorar eventos "resize" e "scroll" no objeto de janela:

		monitorEvents(window, ["resize", "scroll"])

Você também pode especificar um dos "tipos" de evento disponíveis,
sequências de caracteres que mapeiam os conjuntos predefinidos de eventos.
A tabela abaixo lista os tipos de evento disponíveis e
seus mapeamentos associados:

<table class="responsive">
	<thead>
		<tr>
			<th colspan="2">Tipo de evento &amp; Eventos mapeados correspondentes</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>mouse</td>
			<td>"mousedown", "mouseup", "click", "dblclick", "mousemove", "mouseover", "mouseout", "mousewheel"</td>
		</tr>
		<tr>
			<td>tecla</td>
			<td>"keydown", "keyup", "keypress", "textInput"</td>
		</tr>
		<tr>
			<td>toque</td>
			<td>"touchstart", "touchmove", "touchend", "touchcancel"</td>
		</tr>
		<tr>
			<td>controle</td>
			<td>"resize", "scroll", "zoom", "focus", "blur", "select", "change", "submit", "reset"</td>
		</tr>
	</tbody>
</table>

Por exemplo,
o exposto a seguir usa um evento de tipo "seta" e todos os eventos de seta correspondentes
em um campo de inserção de texto atualmente selecionado no painel Elements.

		monitorEvents($0, "key");

Abaixo, um resultado exemplo após digitar caracteres no campo de texto:

![Monitorar eventos-chave](images/monitor-key.png)

## profile([name]) e profileEnd([name])

`profile()` inicia uma sessão de criação de perfil do CPU JavaScript
com um nome opcional.
`profileEnd()` conclui o perfil e exibe os resultados
no painel Profile
(consulte também [Acelerar a execução do JavaScript](/web/tools/chrome-devtools/rendering-tools/js-execution)).

Para começar a criação de perfil:

		profile("My profile")

Para parar a criação de perfil e exibir os resultados no painel Profiles:

		profileEnd("My profile")

Os perfis também podem ser aninhados. Por exemplo, isto funcionará em qualquer ordem:

		profile('A');
		profile('B');
		profileEnd('A');
		profileEnd('B');

Resultado no painel de perfis:

![Perfis agrupados](images/grouped-profiles.png)


Observação: Vários perfis de CPU podem ser operados simultaneamente e não é necessário fechá-los na ordem de criação.

## table(data[, columns])

Registre os dados do objeto com a formatação da tabela passando um objeto data
com títulos de coluna opcionais.
Por exemplo,
para exibir uma lista de nomes usando uma tabela no console,
você deve fazer o seguinte:

		var names = {
			0: { firstName: "John", lastName: "Smith" },
			1: { firstName: "Jane", lastName: "Doe" }
		};
		table(names);

![Exemplo de método table()](images/table.png)

## undebug(function)

`undebug(function)` para a depuração da função em questão
para que, quando a função for chamada,
o depurador não seja mais invocado.

		undebug(getData);

## unmonitor(function)

`unmonitor(function)` para o monitoramento da função especificada.
Isto é usado junto com `monitor(fn)`.

		unmonitor(getData);

## unmonitorEvents(object[, events])

`unmonitorEvents(object[, events])` para eventos de monitoramento
para o objeto e os eventos especificados.
O exemplo abaixo
para todos os monitoramentos de evento no objeto window:

		unmonitorEvents(window);

Além disso, você pode para seletivamente o monitoramento de eventos específicos de um objeto.
Por exemplo,
o código a seguir começa a monitorar todos os eventos de mouse
no elemento atualmente selecionado
e, em seguida, para o monitoramento dos eventos "mousemove" (talvez para reduzir o ruído na saída do console):

		monitorEvents($0, "mouse");
		unmonitorEvents($0, "mousemove");

## values(object)

`values(object)` retorna uma matriz que contém os valores
de todas as propriedades que pertencem ao objeto especificado.

		values(object);




{# wf_devsite_translation #}
