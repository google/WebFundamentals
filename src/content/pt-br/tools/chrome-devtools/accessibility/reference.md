project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Uma referência abrangente dos recursos de acessibilidade no Chrome DevTools.

{# wf_blink_components: Platform>DevTools #} {# wf_updated_on: 2019-03-08 #} {#
wf_published_on: 2018-07-13 #}

# Acessibilidade Referência {: .page-title}

{% include "web/_shared/contributors/kaycebasques.html" %}

Esta página é uma referência abrangente de recursos de acessibilidade no Chrome
DevTools. Destina-se a desenvolvedores web que:

- Tenham uma compreensão básica do DevTools, como abri-lo, por exemplo.
- São familiarizados com [princípios de acessibilidade e melhores
práticas](/web/fundamentals/accessibility/).

O objetivo dessa referência é ajudá-lo a descobrir todas as ferramentas
disponíveis no DevTools que podem ajudá-lo a examinar a acessibilidade de uma
página.

Consulte [Navegação no Chrome DevTools com tecnologia
assistiva](/web/tools/chrome-devtools/accessibility/navigation) se estiver em
busca de ajuda sobre DevTools de navegação com tecnologia assistiva, como
leitura de tela.

## Visão geral dos recursos de acessibilidade no Chrome DevTools {: #overview}

Esta seção explica como o DevTools se encaixa no seu kit de ferramentas de
acessibilidade geral.

Ao determinar se uma página tem acessibilidade, você precisa ter duas questões
básicas em mente:

1. Posso navegar na página com um teclado ou [leitor de
tela](/web/fundamentals/accessibility/semantics-builtin/#screen_readers)?
2. Os elementos da página estão devidamente marcados para leitores de tela?

Em geral, o DevTools pode ajudá-lo a corrigir erros relacionados à pergunta nº
2, porque esses erros são fáceis de detectar de maneira automatizada. A questão
nº 1 é igualmente importante, mas infelizmente o DevTools não pode ajudá-lo. A
única maneira de encontrar erros relacionados à pergunta nº 1 é tentar usar uma
página com um teclado ou leitor de tela por conta própria. Veja [Como fazer uma
revisão de acessibilidade](/web/fundamentals/accessibility/how-to-review) para
mais informações.

## Auditar a acessibilidade de uma página {: #audits}

Em geral, use o painel de auditar para determinar se:

- Uma página está devidamente marcada para leitores de tela.
- Os elementos de texto em uma página têm taxas de contraste suficientes.
Consulte também [Exibir a taxa de contraste de um elemento de texto no Seletor
de cores](#contrast).

Para auditar uma página:

1. Vá até a URL que você deseja auditar.

2. No DevTools, clique na aba **Audits**. O DevTools mostra várias opções de
configuração.

      <figure>
        <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/config.png?raw=true"
alt="Configuring audits.">
        <figcaption>       <b>Figura 1</b>. Configurando auditorias</figcaption>
      </figure>


      <aside class="note">     <b>Observação</b>: As capturas de tela desta
seção foram obtidas com a versão 69 do Chrome. Você pode conferir qual versão
está executando em <code>chrome://version</code>. O UI do painel Audits é
levemente diferente em versões anteriores do Chrome, mas o fluxo de trabalho
geral é o mesmo.</aside>
    

3. Em **Device**, selecione **Mobile** se você quiser simular um dispositivo
móvel. Esta opção altera a string do seu agente de usuário e redimensiona a
viewport. Se a versão móvel da página for exibida de maneira diferente da versão
clássica, essa opção poderá ter um efeito significativo nos resultados de sua
auditoria.

4. Na seção **Audits**, verifique se **Accessibility** está habilitado.
Desabilite as outras categorias se quiser excluí-las de seu relatório. Deixe-as
habilitadas se você quiser descobrir outras maneiras de melhorar a qualidade da
sua página.

5. A seção **Throttling** permite controlar a rede e o CPU, o que é útil ao
analisar o desempenho da carga. Essa opção deve ser irrelevante para sua
pontuação de acessibilidade, então você pode usar o que preferir.

6. O parâmetro **Clear Storage** permite limpar todo o armazenamento, antes de
carregar a página ou preservar o armazenamento entre os carregamentos de página.
Esta opção também, provavelmente é irrelevante para a sua pontuação de
acessibilidade, então você pode usar o que preferir.

7. Clique em **Run Audits**. Após 10 a 30 segundos, o DevTools fornece um
relatório. Seu relatório fornece várias dicas sobre como melhorar a
acessibilidade da página.

      <figure>
        <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/report.png?raw=true"
alt="A report.">
        <figcaption>       <b>Figura 2</b>. Um relatório</figcaption>
      </figure>
    

8. Clique na auditoria para entender melhor.

      <figure>
        <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/attributes.png?raw=true"
alt="More information about an audit.">
        <figcaption>       <b>Figura 3</b>. Mais informações sobre uma
auditoria</figcaption>
      </figure>
    

9. Clique em **Learn More** para ver a documentação da auditoria.

      <figure>
        <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/documentation.png?raw=true"
alt="Viewing an audit's documentation.">
        <figcaption>       <b>Figura 4</b>. Visualização da documentação de uma
auditoria</figcaption>
      </figure>
    

### Veja também: Extensão aXe {: #axe }

Você pode preferir usar a [extensão
aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd){:.external}
em vez do painel Audits. Eles geralmente fornecem as mesmas informações, já que
aXe é o mecanismo subjacente que alimenta o Painel Audits. A extensão aXe tem
uma UI diferente e descreve as auditorias de uma forma ligeiramente diferente.
Uma vantagem que a extensão aXe tem sobre o painel de Audits é que ele permite
inspecionar e destacar falhas node.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/aXe.png?raw=true"
alt="The aXe extension.">
  <figcaption>     <b>Figura 5</b>. A extensão aXe</figcaption>
</figure>

## O painel Accessibility {: #pane }

O painel Accessibility é onde você pode visualizar a árvore de acessibilidade,
os atributos ARIA e propriedades de acessibilidade computadas de nodes DOM.

Para abrir o painel Accessibility:

1. Clique na aba **Elements**.
2. Na **árvore DOM**, selecione o elemento que você deseja inspecionar.
3. Clique na aba **Accessibility**. Esta aba pode estar escondida atrás do botão
![More
Tabs](https://github.com/google/WebFundamentals/blob/master/web/tools/chrome-devtools/images/shared/more-tabs.png?raw=true){:
.inline-icon } **More Tabs**.

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/a11y-pane.png?raw=true"
alt="Inspecting the h1 element of the DevTools homepage in the Accessibility
pane.">
  <figcaption>     <b>Figura 6</b>. Inspeção do elemento <code>h1</code> da
homepage DevTools, no painel Accessibility</figcaption>
</figure>

### Visualizar a posição de um elemento em accessibility tree {: #tree }

[Accessibility
tree](/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree)
é um subconjunto da árvore DOM. Contém apenas elementos relevantes da árvore
DOM, útil para exibir o conteúdo da página em um leitor de tela.

Inspecione a posição de um elemento em accessibility tree no [painel
Accessibility](#pane).

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/a11y-tree.png?raw=true"
alt="The Accessibility Tree section">
  <figcaption>     <b>Figura 7</b>. A seção Accessibility Tree</figcaption>
</figure>

### Visualizar um elemento em ARIA attributes {: #aria }

ARIA attributes garante que os leitores de tela tenham todas as informações
necessárias para representar adequadamente o conteúdo de uma página.

Visualize os atributos ARIA de um elemento no [painel Accessibility](#pane).

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/aria.png?raw=true"
alt="The ARIA Attributes section">
  <figcaption>     <b>Figura 8</b>. A seção ARIA Attributes</figcaption>
</figure>

### Visualizar elemento calculado em Computed Properties {: #computed }

Nota: Se você está procurando por propriedades CSS calculadas, veja [Aba
Calculada](/web/tools/chrome-devtools/css/reference#computed).

Algumas propriedades de acessibilidade são calculadas dinamicamente pelo
navegador. Essas propriedades podem ser visualizadas na seção **Computed
Properties** no painel **Accessibility**.

Visualize as propriedades de acessibilidade calculadas de um elemento [no painel
Accessibility](#pane).

<figure>
  <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/computed-a11y.png?raw=true"
alt="The Computed (Accessibility) Properties section.">
  <figcaption>     <b>Figura 9</b>. A seção Computed (Accessibility)
Properties</figcaption>
</figure>

## Visualizar o contrast ratio de um elemento de texto no seletor de cores {: #contrast }

Algumas pessoas com baixa visão não veem áreas com muito brilho ou muito escuro.
Tudo tende a aparecer com o mesmo brilho, o que dificulta a distinção entre
contornos e bordas. Contrast ratio(taxa de contraste) mede a diferença de brilho
entre texto e plano de fundo. Se seu texto tiver um baixo contrast ratio, então
esses usuários de baixa visão podem literalmente experimentar seu site como uma
tela em branco.

O seletor de cores pode ajudá-lo a garantir que o texto atenda à contrast ratio
recomendada em etapas:

1. Clique na aba **Elements**.

2. Na **árvore DOM**, selecione o elemento com o texto que você deseja
inspecionar.

      <figure>
        <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/inspect.png?raw=true"
alt="Inspecting a paragraph in the DOM Tree.">
        <figcaption>       <b>Figura 10</b>. Inspeção de um parágrafo no DOM
Tree</figcaption>
      </figure>
    

3. No painel **Styles**, clique no quadrado com a cor do elemento, depois no
valor da `cor` do elemento.

      <figure>
        <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/color.png?raw=true"
alt="The color property of the element.">
        <figcaption>       <b>Figura 11</b>. A propriedade <code>color</code> do
elemento</figcaption>
      </figure>
    

4. Verifique a seção **Contrast Ratio** no seletor de cores. Um sinal de
aprovação significa que o elemento tem o [mínimo
recomendado](https://www.w3.org/WAI/WCAG21/quickref/#contrast-minimum){:.external}.
Ter dois sinais de aprovação significa que está dentro do [melhor
recomendado](https://www.w3.org/WAI/WCAG21/quickref/#contrast-enhanced){:.external}.

      <figure>
        <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/color-picker.png?raw=true"
alt="The Contrast Ratio section of the Color Picker shows 2 checkmarks and a
                  value of 16.10.">
        <figcaption>       <b>Figura 12</b>. A seção Contrast Ratio do Seletor
de cor (Color Picker) exibe 2 marcas de seleção e um valor de
<code>16.10</code></figcaption>
      </figure>
    

5. Clique na seção **Contrast Ratio** para ver mais informações. Uma linha
aparece no seletor visual(visual picker) no topo do seletor de cores. Se a cor
atual atende às recomendações, qualquer coisa que estiver no mesmo lado da linha
atenderá às recomendações. Se a cor atual não não atende às recomendações, então
qualquer coisa no mesmo lado também não atenderá às recomendações.

      <figure>
        <img
src="https://github.com/google/WebFundamentals/blob/master/src/content/en/tools/chrome-devtools/accessibility/imgs/contrast-ratio-line.png?raw=true"
alt="The Contrast Ratio Line in the visual picker.">
        <figcaption>       <b>Figura 13</b>. A Contrast Ratio Line no seletor
visual</figcaption>
      </figure>
    

## Comentários {: #feedback}

{% include "web/_shared/helpful.html" %}
