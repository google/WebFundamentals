project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Mantenha o código do lado do cliente legível e depurável mesmo depois de combinar, minificar ou compilar.

{# wf_updated_on: 2015-04-21 #}
{# wf_published_on: 2015-04-13 #}

# Mapear código pré-processado no código-fonte {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

Mantenha o código do lado do cliente legível e depurável mesmo depois de combinar, minificar ou compilar. Use mapas de origem para mapear seu código-fonte no código compilado.


### TL;DR {: .hide-from-toc }
- Use o Source Maps para mapear código minificado no código-fonte. Você pode ler e depurar código compilado na fonte original.
- Use somente <a href=''/web/tools/setup/setup-preprocessors?#supported-preprocessors''>pré-processadores capazes de produzir Source Maps</a>.
- Verifique se o servidor Web pode fornecer Source Maps.


## Começar com pré-processadores

Este artigo explica como interagir com o JavaScript Source Maps no painel Sources do DevTools. Para ver mais detalhes sobre o que são pré-processadores, como eles podem ajudar e como o Source Maps funciona, acesse [Configurar pré-processadores JS e CSS](/web/tools/setup/setup-preprocessors?#debugging-and-editing-preprocessed-content).

## Usar um pré-processador compatível

Você precisa usar um minificador capaz de criar mapas de origem. Para as opções mais populares, [veja nossa seção de compatibilidade do pré-processador](/web/tools/setup/setup-preprocessors?#supported-preprocessors). Caso queira mais informações, veja a página wiki [Mapas de origem: linguagens, ferramentas e outras informações](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info).

Os tipos de pré-processadores a seguir são comumente usados junto com o Source Maps:

* Transcompiladores ([Babel](https://babeljs.io/){: .external }, [Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started))
* Compiladores ([Closure Compiler](https://github.com/google/closure-compiler), [TypeScript](http://www.typescriptlang.org/){: .external }, [CoffeeScript](http://coffeescript.org), [Dart](https://www.dartlang.org))
* Minimizadores ([UglifyJS](https://github.com/mishoo/UglifyJS))

## Source Maps no painel Sources do DevTools

Mapas de origem de pré-processadores fazem o DevTools carregar seus arquivos originais, além dos minificados. Depois, você usa os originais para definir pontos de interrupção e percorrer o código. Enquanto isso, o Chrome está executando o código minificado. Isso dá a ilusão de execução em um site de desenvolvimento em produção.

Ao executar o Source Maps no DevTools, você perceberá que o JavaScript não está compilado e que pode ver todos os arquivos JavaScript que ele referencia individualmente. Isso é usar mapeamento de origem mas, por trás dos bastidores, o código compilado é realmente executado. Todo erro, registro e ponto de interrupção será mapeado no código de desenvolvimento para criar depuração incrível! Então, na prática, ele cria a ilusão de que você está executando um em ambiente de desenvolvimento em produção.

### Ativar mapas de origem nas configurações

Os mapas de origem estão ativados por padrão (a partir do Chrome 39), mas, se você quiser verificar ou ativá-lo, abra o DevTools e clique na engrenagem de configuração ![engrenagem](imgs/gear.png){:.inline}. Em **Sources**, marque **Enable JavaScript Source Maps**. Você também pode marcar **Enable CSS Source Maps**.

![Ativar mapas de origem](imgs/source-maps.jpg)

### Depurar com mapas de origem

Ao [depurar seu código](/web/tools/chrome-devtools/debug/breakpoints/step-code) e com o Source Maps ativado, o Source Maps aparecerá em dois lugares:

1. No console (o link para a origem deve ser o arquivo original, não o gerado)
2. Ao percorrer o código (os links na pilha de chamadas devem abrir o arquivo-fonte original)

## @sourceURL e displayName

Embora não faça parte das especificações do Source Map, o `@sourceURL` facilita muito o desenvolvimento ao trabalhar com evals (avaliações). Este auxiliar é muito parecido com a propriedade `//# sourceMappingURL` e, na verdade, é mencionado nas especificações do Source Map V3.

Ao incluir o comentário especial a seguir no código, que será avaliado, você pode chamar evals e scripts e estilos embutidos para que apareçam como nomes mais lógicos no DevTools.

`//# sourceURL=source.coffee`

Navegue para esta
**[demonstração](http://www.thecssninja.com/demo/source_mapping/compile.html)** e, em seguida:

* Abra o DevTools para acessar o painel **Sources**.
* Insira um nome de arquivo no campo de entrada _Name your code:_.
* Clique no botão **compile**.
* Um alerta aparecerá com a soma avaliada pelo código do CoffeeScript.

Se você expandir o subpainel _Sources_, verá um novo arquivo com o nome personalizado que inseriu anteriormente. Ao clicar duas vezes para visualizar esse arquivo, ele conterá o JavaScript compilado da fonte original. Na última linha, no entanto, haverá um comentário de `// @sourceURL` indicando qual era o arquivo-fonte original. Isso pode ser de grande ajuda na depuração quando se trabalha com abstrações de linguagem

![Trabalhar com sourceURL](imgs/coffeescript.jpg)




{# wf_devsite_translation #}
