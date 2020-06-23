project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Como revisar seu site para problemas de acessibilidade.

{# wf_updated_on: 2018-09-20 #} {# wf_published_on: 2017-03-12 #} {#
wf_blink_components: Blink>Accessibility #}

# Como Fazer Uma Revisão de Acessibilidade {: .page-title }

{% include "web/_shared/contributors/robdodson.html" %}

<div><div class="video-wrapper"> <iframe class="devsite-embedded-youtube-video"
data-video-id="cOmehxAU_4s" data-autohide="1" data-showinfo="0" frameborder="0"
allowfullscreen=""> </iframe> </div> Determinar se seu site ou aplicativo está
acessível pode parecer uma
tarefa cansativa. Se está é sua primeira introdução a acessibilidade, a
amplitude do tópico pode fazer você se questionar por onde começar - afinal,
trabalhar para fornecer uma gama diversa de habilidades significa que existe
correspondentemente uma game diversa de questões a serem consideradas.</div>

Neste post, vou explicar essas questões em um processo lógico, de como revisar a
acessibilidade de um site existente, passo a passo.




## Comece com o teclado


<img src="imgs/ic_keyboard_black_24px.svg" class="attempt-right" alt=""
width="120">

Para usuários que não podem ou não querem usar o mouse, a navegação com o
teclado é o meio principal de alcance de qualquer coisa na tela. Esse público
inclui usuários com deficiências motoras, como por exemplo Lesão por Esforço
Repetitivo (LER) ou paralisia, assim como usuários que fazem uso de leitores de
tela.  Para uma boa experiencia com o teclado tenha como objetivo uma boa ordem
lógica de tabulação e estilos de foco que são facilmente discerníveis.

### Pontos chave

- Comece navegando pelo seu site usando Tab. A ordem na qual os elementos são
focados deve seguir a ordem do DOM. Se você não tiver certeza de quais elementos
devem receber foco, consulte [Introdução a Foco
](/web/fundamentals/accessibility/focus/) para refrescar sua memória. A regra de
ouro é que qualquer controle que um usuário possa interagir ou fornecer
informações deve ser focalizável e exibir um indicador foco (por exemplo, um
contorno de foco). É uma prática comum desabilitar estilos de foco sem fornecer
uma alternativa usando o `outline: none` no CSS, mas isso é um anti-padrão. Se
usuários que navegam pelo teclado não conseguem ver o que está focado, eles não
tem como interagir com a página. Se em algum momento você precisar diferenciar
entre o foco do mouse e o  foco do teclado para estilização, considere adicionar
uma biblioteca como [what-input](https://github.com/ten1seven/what-input) .

- Controles interativos personalizados devem ser focáveis. Se você usa
JavaScript para transformar uma `<div>` em um menu dropdown bonitinho, ele não
será inserido automaticamente na ordem da tabulação. Para tornar um controle
personalizado focável, use  `tabindex=”0”` .

- Evite controles com um `tabindex` > 0. Esses controles vão pular na frente de
todo o resto na ordem do Tab, independentemente de sua posição no DOM. isso pode
ser confuso para usuários de leitores de tela, pois eles tendem a navegar no DOM
de forma linear.

- Conteúdo não interativo (por exemplo, títulos) devem evitar serem focáveis. Às
vezes, os desenvolvedores adicionam `tabindex` aos títulos porque pensam que os
títulos são importantes. isso também é um anti-padrão, pois faz com que os
usuários que navegam pelo teclado vejam a página de forma menos eficiente. Para
usuários de leitores de tela, o leitor de tela já pronuncia os títulos,
portanto, não há necessidade de torná-los focáveis.

- Se novo conteúdo for adicionado à página, tente garantir que o foco do usuário
seja direcionado a esse conteúdo para que ele possa fazer alguma ação. Veja [
Gerenciando o foco  a Nível de Página
](/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_at_the_page_level)
por exemplo.

- Tenha muito cuidado ao capturar completamente o foco em qualquer hora. Cuidado
com preenchimento automático, onde o foco do teclado pode ficar travado. O foco
pode ficar temporariamente preso em situações específicas, como a exibição de um
modal, quando você não deseja que o usuário interaja com o resto da página -
porem, você deve fornecer um método acessível via teclado para escapar do modal
também. Veja o guia em [ Modais e Armadilhas de
Teclado](/web/fundamentals/accessibility/focus/using-tabindex#modals_and_keyboard_traps)
Por exemplo.

### Só porque algo é focalizável não significa que é utilizável

Caso tenha criado uma forma personalizada de controle, tenha com alvo a
capacidade do usuário alcançar *toda* funcionalidade usando apenas o teclado.
Consulte [Gerenciamento do foco em
componentes](/web/fundamentals/accessibility/focus/using-tabindex#managing_focus_in_components)
para técnicas sobre como melhorar o acesso via teclado.

### Não esqueça do conteúdo fora da tela

Muitos sites têm conteúdo fora da tela presente no DOM porém de forma não
visível, por exemplo, links dentro de um drawer menu responsivo ou um botão
dentro de um modal que ainda não foi exibido. Deixar esses elementos no DOM pode
levar a uma experiência de teclado confusa, especialmente para leitores de tela
que irão proferir(ler para o usuário) o conteúdo fora da tela como se fosse
parte da página. Consulte [Gerenciamento de Conteúdo Fora da
tela](/web/fundamentals/accessibility/focus/dom-order-matters#offscreen_content)
para obter dicas sobre como lidar com esses elementos.

## Experimente com um leitor de tela


<img src="imgs/ic_speaker_notes_black_24px.svg" class="attempt-right" alt=""
width="100">

Melhorar o suporte geral do teclado estabelece algumas bases para a próxima
etapa, que é verificar se a página possui rotulação e semânticas adequadas e se
está livre de quaisquer obstruções na navegação com o leitor de tela. Se você
não estiver familiarizado com a forma que a rotulação semântica é interpretada
por tecnologias assistivas, consulte a [Introdução ao
Semântica](/web/fundamentals/accessibility/semantics-builtin/) para refrescar
sua memória.

### Pontos chave

- Verifique se todas as imagens tem texto adequado no atributo   `alt`. A
exceção a essa prática é quando imagens são principalmente para fins de
apresentação e não são peças essenciais do  conteúdo. Para significar que uma
imagem deve ser pulada por um leitor de tela, defina o valor do atributo `alt`
para uma string vazia, por exemplo, `alt=””` .

- Verifique se todos os controles possuem rótulo. Em controles personalizados
isso pode exigir o uso de `aria-label` ou `aria-labelledby` . Consulte
[Etiquetas ARIA e
Relacionamentos](/web/fundamentals/accessibility/semantics-aria/aria-labels-and-relationships)
por exemplo.

- Verifique se todos os controles personalizados possuem  uma `role` apropriada
e qualquer atributo ARIA necessário que correspondem a  seu estado. Por exemplo,
uma caixa de seleção personalizada precisará de um `role=”checkbox”` e
`aria-checked=”true|false”` para transmitir adequadamente seu estado. Veja
[Introdução a ÁRIA](/web/fundamentals/accessibility/semantics-aria/) para uma
visão geral de como o ARIA pode fornecer semânticas não presentes em controles
personalizados.

- O fluxo de informações deve fazer sentido. Como os leitores de tela navegam na
página na ordem do DOM, se você usou CSS para reposicionar visualmente os
elementos, eles podem ser anunciados em uma sequência sem sentido. Caso precise
que algo apareça antes na página, tente movê-lo fisicamente no DOM para uma
posição anterior.

- Procure dar suporte a navegação de um leitor de tela em todo o conteúdo da
página. Evite permitir que todas as seções do site sejam permanentemente ocultas
ou bloqueadas ao leitor de tela.

- Se o conteúdo *deve* ser oculto em um leitor de tela, por exemplo, se estiver
fora da tela ou apenas de apresentação, verifique se o conteúdo está definido
como `aria-hidden=”true”` . Dê uma olhada no guia sobre [Ocultando
conteúdo](/web/fundamentals/accessibility/semantics-aria/hiding-and-updating-content#aria-hidden)
para mais explicações.

### Familiaridade com um leitor de tela ajuda bastante

Embora possa parecer assustador aprender a usar um leitor de tela, eles são
realmente fáceis de aprender. Em geral, a maioria dos desenvolvedores pode se
dar bem com apenas alguns atalhos de teclado.

Se você estiver em um Mac, assista [esse vídeo usando
VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=6)
, o leitor de tela que vem com o Mac OS. Se você estiver em um PC, confira [esse
vídeo sobre o uso do
NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4)
, um leitor de tela de código aberto para windows, financiado por doações.

### `aria-hidden` não previne foco do teclado

É importante entender que o ARIA pode afetar apenas a *semântica* de um
elemento; não tem efeito no *comportamento* do elemento. Enquanto você pode
fazer um elemento oculto para os leitores de tela com `aria-hidden=”true”` , que
não altere o comportamento do foco para esse elemento. Para conteúdo interativo
fora da tela, muitas vezes você precisará combinar `aria-hidden=”true”` e
`tabindex=”-1”` para criar verifique se ele está realmente removido do fluxo do
teclado. O [inerte](https://github.com/WICG/inert) proposto [ O
atributo](https://github.com/WICG/inert) visa facilitar isso combinando o
comportamento de ambos os atributos.

## Elementos iterativos como links e botões devem indicar seus propósitos e estados

Fornecer dicas visuais sobre o que um controle fará ajuda as pessoas a operar e
navegar no seu site. Essas dicas são chamadas de affordances. O fornecimento de
affordances torna possível  que as pessoas usem seu site em uma ampla gama de
dispositivos.

### Pontos chave

- Elementos interativos, como links e botões, devem ser distinguíveis de
elementos não interativos. É difícil para os usuários navegar em um site ou
aplicativo quando não sabem se um elemento é clicável. Existem muitos métodos
válidos para atingir esse objetivo. Uma prática comum é sublinhar links para
diferenciá-los do texto ao redor.

- Semelhante ao requisito de foco, elementos interativos como links e botões
exigem um estado de foco para os usuários de mouse, para que eles saibam se
estão passando o mouse sobre algo clicável. No entanto, o elemento interativo
ainda deve ser distinguido por si só. Basear-se apenas no estado de hover para
indicar elementos clicáveis não ajuda a usabilidade em dispositivos touch.

## Aproveite os títulos e pontos de referência


<img src="imgs/ic_map_black_24px.svg" class="attempt-right" alt="" width="100">

Títulos e pontos de referência adicionam uma estrutura semântica a   sua página,
e aumentam significativamente a eficiência de navegação dos usuários de
tecnologia assistiva. Muitos dos usuários de leitores de tela relatam que,
quando chegam a uma página desconhecida, eles geralmente tentam [navegar por
títulos](http://www.heydonworks.com/article/responses-to-the-screen-reader-strategy-survey)
. De forma similar, os leitores de tela também oferecem a capacidade de ir para
pontos importantes da página como `<main>` e `<nav>` . Por esses motivos, é
importante considerar como o a estrutura da sua página pode ser usada para
orientar a experiência do usuário.

### Pontos chave

- Faça uso adequado da hierarquia de títulos `h1-h6` . Pense nos títulos como
ferramentas para criar um esboço para sua página. Não confie no estilo padrão
dos títulos; em vez disso, considere todos os cabeçalhos como se tivessem o
mesmo tamanho e use semanticamente o nível apropriado para o conteúdo primário,
secundário e terciário. e depois, use CSS para fazer com que os títulos
correspondam ao seu design.

- Use pontos de referência e funções para os usuários poderem ignorar o conteúdo
repetitivo. Muitas tecnologias assistivas fornecem atalhos para ir para partes
específicas da página, como os definidos pelos elementos `<main>` ou `<nav>` .
Esses elementos têm papéis de referência implícitos. Você também pode usar o
atributo ARIA `role`  para definir explicitamente as regiões da página, por
exemplo, `<div role=”search”>` . Veja [o guia sobre títulos e pontos de
referência](/web/fundamentals/accessibility/semantics-builtin/navigating-content)
para mais exemplos.

- Evite `role=”application”` a menos que você tenha trabalhado com isso
anteriormente. O ponto de referência `application` instruirá a tecnologia
assistiva a desativar seus atalhos e passar todas as teclas pressionadas para a
página. Isso significa que as teclas que os usuários de leitores de tela
normalmente usam para se mover pela página não funcionarão mais, e você
precisará implementar *todo* tratamento de teclado sozinho.

### Revise rapidamente títulos e pontos de referência com um leitor de tela

Leitores de tela como VoiceOver e NVDA fornecem um menu de contexto para ir para
regiões importantes da página. Se você estiver fazendo uma verificação de
acessibilidade, poderá use esses menus para obter uma visão geral rápida da
página e determinar se os níveis de cada titulo estão corretos e quais pontos de
referência estão em uso. Para saber mais, confira esses vídeos instrutivos sobre
os conceitos básicos de
[VoiceOver](https://www.youtube.com/watch?v=5R-6WvAihms&index=6&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g)
e
[NVDA](https://www.youtube.com/watch?v=Jao3s_CwdRU&list=PLNYkxOF6rcICWx0C9LVWWVqvHlYJyqw7g&index=4)
.

## Automatize o processo


<img src="imgs/ic_build_black_24px.svg" class="attempt-right" alt=""
width="100">

Testar manualmente um site quanto à acessibilidade pode ser entediante e
propenso a erros. Eventualmente, você desejará automatizar o processo o máximo
possível. Isso pode ser feito através do uso de extensões de navegador e suite
de testes de acessibilidade via linha de comando.

### Pontos chave

- A página passa em todos os testes das extensões de navegador
[aXe](https://chrome.google.com/webstore/detail/axe/lhdoppojpmngadmnindnejefpokejbdd)
ou
[WAVE](https://chrome.google.com/webstore/detail/wave-evaluation-tool/jbbplnpkjmmeebjpijfedlgcdilocofh)?
Essas extensões são apenas duas opções disponíveis e podem ser um adição útil a
qualquer processo de teste manual, pois elas podem detectar de forma rápida
problemas como relações de contraste problemáticas e atributos ARIA ausentes. Se
você prefere fazer coisas na linha de comando,
[axe-cli](https://github.com/dequelabs/axe-cli) fornece a mesma funcionalidade
que  a extensão de navegador aXe, porem pode ser facilmente usada do seu
terminal.

- Para evitar regressões, especialmente em um ambiente de integração contínua,
incorporar uma biblioteca como [ax-core](https://github.com/dequelabs/axe-core)
em seu conjunto de testes automatizado. ax-core é o mesmo motor que alimenta o
machado extensão chrome, mas em um utilitário de linha de comando fácil de
executar.

- Se você estiver usando um framework ou biblioteca, ela fornece suas próprias
ferramentas de acessibilidade? Alguns exemplos incluem
[protractor-accessibility-plugin](https://github.com/angular/protractor-accessibility-plugin/)
para Angular e
[a11ysuite](https://github.com/Polymer/web-component-tester#a11ysuite) para
Polymer e Web Components. Aproveite as ferramentas disponíveis sempre que
possível para evitar reinventar a roda.

### Se você estiver construindo um Progressive Web App, considere tentar o Lighthouse


<img src="imgs/lighthouse.png" class="attempt-right" alt="">

O Lighthouse é uma ferramenta para ajudar a medir o desempenho do seu PWA, mas
ele também usa a biblioteca axe-core para fornecer um conjunto de testes de
acessibilidade. Se você já está usando o Lighthouse, fique atento a falhas
testes de acessibilidade no seu relatório. Corrigir isso ajudará a melhorar o
desempenho geral experiência do usuário em seu site.

## Encerrando

Fazer revisões de acessibilidade algo regular no processo da sua equipe e fazer
essas verificações o mais cedo possível  e de forma frequente podem ajudar a
melhorar a experiência geral do uso seu site. Lembre-se de que uma boa
acessibilidade é uma boa UX!

### Recursos adicionais

- Acessibilidade na Web pelo Google
- Fundamentos da acessibilidade
- A11ycasts

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
