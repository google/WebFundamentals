project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Melhorando a acessibilidade para páginas da Web


{# wf_updated_on: 2016-06-26 #}
{# wf_published_on: 2016-06-26 #}

#  Acessibilidade {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}
{% include "web/_shared/contributors/robdodson.html" %}


Este conjunto de documentos é uma versão baseada em texto de parte do conteúdo abordado no
[Curso da Udacity sobre
Acessibilidade](https://www.udacity.com/course/web-accessibility--ud891){: .external }.
Em vez de uma transcrição direta do vídeo curso, ele pretende ser um 
tratamento mais conciso de princípios e práticas de acessibilidade, utilizando o
conteúdo do curso original como base.

### TL;DR {: .hide-from-toc }
- Aprenda o que acessibilidade significa e como ela se aplica ao desenvolvimento de Web.
- Aprenda a fazer sites da Web acessíveis e utilizáveis para todos.
- Aprenda a incluir a acessibilidade básica com impacto mínimo no desenvolvimento.
- Aprenda que recursos de HTML estão disponíveis e como usá-los para
  melhorar acessibilidade.
- Aprenda sobre técnicas avançadas de acessibilidade para criar experiências
refinadas de acessibilidade.


Entender a acessibilidade, seu escopo, e seu impacto pode fazer de você um
desenvolvedor de Web melhor. Este guia destina-se a ajudá-lo a entender como você pode tornar
seus websites acessível e utilizável para todos.

"Acessibilidade" pode ser difícil de soletrar, mas não tem que ser difícil
de realizar. Neste guia, você verá como obter algumas vitórias fáceis para
ajudar a melhorar a acessibilidade com o mínimo esforço, como pode usar o que
é integrado no HTML para criar interfaces mais acessíveis e robustas, e como
aproveitar algumas técnicas avançadas para a criação de experiências acessíveis refinadas.

Também vai descobrir que muitas dessas técnicas ajudarão a criar interfaces
que são mais agradáveis e fácil de usar para *todos* os usuários, não apenas
 para pessoas com deficiência.

Naturalmente, muitos desenvolvedores têm apenas uma compreensão obscura do que
acessibilidade significa &mdash; algo a ver com contratos com o governo, listas
de verificação e leitores de tela, certo? &mdash; e há muitos equívocos acerca disso.
Por exemplo, muitos desenvolvedores sentem que abordar a acessibilidade os obrigará
 a escolher entre criar uma experiência agradável e atraente, e uma que seja
desajeitada e feia, mas acessível.

Obviamente, este não é o caso, então vamos esclarecer isso antes de
começar qualquer outra coisa. O que queremos dizer com acessibilidade e estamos aqui para
aprender o quê?

## O que é acessibilidade?
Em termos gerais, quando dizemos que um site é acessível, queremos dizer que o
conteúdo do site está disponível, e sua funcionalidade pode ser operada, literalmente,
por *qualquer pessoa*. Como desenvolvedores, é fácil supor que todos os usuários podem enxergar
e usar um teclado, mouse ou tela sensível ao toque, e conseguem interagir com
o conteúdo da página da mesma maneira que nós. Isso pode levar a uma experiência que funciona bem para algumas pessoas,
mas cria problemas que vão desde aborrecimentos simples a obstáculos
intransponíveis para outras.

Acessibilidade, então, refere-se à experiência de usuários que possam estar fora
da estreita faixa do usuário "típico", que pode acessar ou interagir com as coisas
de maneira diferente do que se espera. Especificamente, refere-se a usuários que experimentam
algum tipo de deficiência ou incapacidade &mdash; e tenha em mente que
a experiência pode ser não-física ou temporária.

Por exemplo, embora a tendência seja centrar o debate sobre acessibilidade em usuários
com deficiências físicas, todos nós podemos nos identificar com a experiência
de usar uma interface que não é acessível a nós por outras razões. Você já teve um
problema para usar um site para desktop em um telefone celular, ou viu a
mensagem "Este conteúdo não está disponível na sua região", ou não conseguiu
encontrar um menu familiar em um tablet? Todas estas são questões de acessibilidade.

Ao aprender mais, você vai descobrir que abordar as questões de acessibilidade
neste sentido mais amplo e mais geral quase sempre melhora a experiência
do usuário para todos. Vejamos um exemplo:

![um formulário com acessibilidade ruim](imgs/pooraccess.jpg)

Este formulário tem vários problemas de acessibilidade.

 - O texto está em baixo contraste, que é difícil para usuários com pouca visão lerem.
 - Ter rótulos à esquerda e os campos à direita dificulta sua associação para
muitas pessoas, e quase a impossibilita para alguém que precisa aumentar o zoom
para usar a página; imagine olhar isso em um telefone e ter que deslocar
a tela para descobrir o que se refere a quê.
 - O rótulo "Lembrar das informações?" não está associado com a caixa de seleção,
então você tem que tocar ou clicar apenas no pequeno quadrado, em vez de simplesmente
clicar no rótulo; além disso, alguém que usa um leitor de tela
 teria dificuldade para entender a associação.

Agora, vamos usar nossa varinha acessibilidade e ver o formulário com esses problemas
corrigidos. Vamos escurecer o texto, modificar o design para que os rótulos fiquem
próximos das coisas a que se referem, e corrigir o rótulo a ser associado com a
caixa de seleção para seja possível alterná-la, também clicando no rótulo.

![um formulário com acessibilidade melhorada](imgs/betteraccess.jpg)

Qual você prefere usar? Se disse "a versão acessível", você está a caminho de
compreender uma das principais premissas deste guia. Muitas vezes, algo que bloqueia totalmente
alguns usuários também é uma área de dificuldade para muitos outros, por isso,
ao corrigir o problema de acessibilidade, você melhora a experiência para todos.

## Diretrizes de Acessibilidade para Conteúdo de Web

Neste guia faremos referência às [Web Content Accessibility Guidelines
(WCAG) 2.0](https://www.w3.org/TR/WCAG20/){: .external }, um conjunto de
diretrizes e melhores práticas reunidas por especialistas em acessibilidade
para abordar o que "acessibilidade" significa de forma metódica. Vários países realmente exigem
o uso dessas diretrizes em seus requisitos legais de acessibilidade na Web.

As WCAG são organizadas em torno de quatro princípios frequentemente referidos pela sigla *POUR*:

 - **Perceptível**: Os usuários conseguem perceber o conteúdo? Isso nos ajuda a ter em mente
   que só porque algo é perceptível com um sentido, como a visão, isso
   não significa que todos os usuários podem percebê-lo.

 - **Operável**: Os usuários conseguem usar componentes da IU e navegar pelo conteúdo? Por
   exemplo, algo que requer uma interação de passar cursor não pode ser operado por
   alguém que não consegue usar um mouse ou tela sensível ao toque.

 - **Understandable**(compreensível): Os usuários conseguem entender o conteúdo? Os usuários conseguem entender a
   interface e ela é consistente o suficiente para evitar a confusão?

 - **Robusto**: O conteúdo pode ser consumido por uma grande variedade de agentes
   de usuário (navegadores)? Ele funciona com a tecnologia assistiva?

Embora as WCAG forneçam uma visão abrangente do que significa o conteúdo ser
acessível, elas também pode ser um pouco impressionantes. Para ajudar a atenuar isso, o grupo
[WebAIM](http://webaim.org/){: .external } (Web Accessibility in Mind) simplificou
as diretrizes WCAG em uma lista de verificação fácil de seguir, destinada
especificamente ao conteúdo da Web.

A [lista de verificação WebAIM](http://webaim.org/standards/wcag/checklist){: .external }
 pode fornecer um breve resumo de alto nível do que você precisa
implementar, enquanto também faz link com a especificação WCAG subjacente 
caso precise de uma definição expandida.

Com esta ferramenta em mãos, você pode traçar um rumo para seu trabalho de
acessibilidade e ter certeza de que, contanto que seu projeto cumpra os critérios
descritos, seus usuários devem ter uma experiência positiva ao acessar seu conteúdo.

## Entendendo a diversidade dos usuários

Ao aprender sobre acessibilidade, é útil ter uma compreensão da
diversificada gama de usuários no mundo e os tipos de tópicos de acessibilidade
que os afetam. Para explicar melhor, eis uma pergunta sessão informativa de perguntas e respostas
com Victor Tsaran, Gerente de Programa Técnico do Google, que é totalmente cego.

<figure class="attempt-right">
  <img src="imgs/victor_tsaran.jpg" alt="Victor Tsaran">	
  <figcaption>Victor Tsaran</figcaption>
</figure>

<hr>

> *Com que você trabalha no Google?*

Aqui no Google meu trabalho é ajudar a garantir que os nossos produtos funcionem
para todos os nossos diversos usuários, independentemente de deficiência ou habilidade.

> *Que tipos de deficiências os usuários têm?*

Quando pensamos sobre os tipos de deficiências que dificultam o acesso de
alguém ao nosso conteúdo, muitas pessoas imediatamente imaginam um
usuário cego como eu. E é verdade, esta deficiência realmente pode tornar frustrante ou mesmo
impossível usar muitos websites.

Muitas das técnicas modernas da Web têm o efeito colateral de criar sites
que não funcionam bem com as ferramentas usadas por usuários
cegos para acessar a Web. Porém, na verdade, a acessibilidade é muito mais que isso. Achamos útil
pensar em deficiências classificadas em quatro grupos abrangentes:
visual, motora, auditiva e cognitiva.

> *Vamos analisar uma categoria por vez. Você pode dar alguns exemplos de deficiências
visuais?*

As deficiências visuais podem ser divididas em algumas categorias: Usuários sem nenhuma visão,
como eu, podem usar um leitor de tela, braile, ou a combinação dos dois.

<figure class="attempt-right">
  <img src="imgs/braille-reader.png" alt="Um leitor de braile">	
  <figcaption>Um leitor de braile</figcaption>
</figure>

Porém, é realmente muito raro alguém não ter literalmente nenhuma visão,
mas ainda assim, há uma boa chance que você conheça ou tenha conhecido
pelo menos uma pessoa que não consegue enxergar nada. No entanto, também há um número muito maior do que chamamos usuários
com baixa visão.

Esta é uma faixa ampla, de alguém como minha esposa, que não tem córneas
&mdash; por isso, embora basicamente consiga enxergar as coisas, ela tem dificuldade em ler textos
e é considerada legalmente cega &mdash; a alguém que pode apenas ter
visão ruim e precisar usar óculos muito fortes.

Há uma variedade enorme, então, naturalmente, existe uma grande variedade de acomodações
que as pessoas nesta categoria usam: algumas utilizam um leitor de tela ou
uma tela em Braille (já ouvi até falar de uma mulher que lê Braille exibido na tela
porque é mais fácil de enxergar que o texto comum), ou elas podem usar tecnologia de
texto para voz sem a funcionalidade completa de leitor de tela, ou podem usar
um ampliador de tela, que amplia parte da tela, ou podem apenas usar o zoom
do navegador para aumentar todas as fontes. Também podem usar opções
de alto contraste, como um modo de alto contraste do sistema operacional,
uma extensão de alto contraste do navegador ou um tema de alto contraste para um site.

<figure class="attempt-right">
  <img src="imgs/high-contrast.png" alt="Modo de alto contraste">	
  <figcaption>Modo de alto contraste</figcaption>
</figure>

Muitos usuários usam até mesmo uma combinação destas coisas, como minha amiga Laura, que
usa uma combinação de modo de alto contraste, zoom do navegador e texto para voz.

Baixa visão é algo com que muitas pessoas podem se identificar. Para começar, todos temos uma
piora da visão à com a idade, por isso, mesmo que você ainda não tenha
experimentado isso, há uma boa chance de ter ouvido seus pais reclamarem. Porém, muitas pessoas
experimentam a frustração de levar o laptop para uma janela ensolarada só para
descobrir que de repente não conseguem ler nada! Ou qualquer um que tenha feito
cirurgia a laser ou talvez apenas precisou ler algo do outro lado da sala pode ter
usado uma dessas acomodações que mencionei. Portanto, acho bastante fácil os
desenvolvedores terem alguma empatia por usuários de baixa visão.

Ah, e não devo esquecer de mencionar as pessoas com visão ruim das cores &mdash;
 cerca de 9% dos homens têm algum tipo de deficiência de visão de cores! Além de cerca de 1% das
mulheres. Eles podem ter dificuldade em distinguir vermelho de verde, ou amarelo de azul.
Pense nisso da próxima vez que projetar validação de formulário.

> *E quanto a deficiências motoras?*

Sim, deficiências motoras ou deficiências de destreza. Este grupo varia muito, desde
pessoas que preferem não usar um mouse, pois talvez tenham tido alguma LER ou
algo assim, e acham doloroso, até alguém que possa estar fisicamente paralisado e
ter uma faixa limitada de movimento em certas partes do corpo.

<figure class="attempt-right">
  <img src="imgs/eye-tracking.png" alt="Uma pessoa usando um dispositivo de rastreamento ocular">	
  <figcaption>Um dispositivo de rastreamento ocular</figcaption>
</figure>

Usuários com deficiência motora podem usar teclado, dispositivo de switch, controle de voz,
ou mesmo um dispositivo de rastreamento ocular para interagir com o computador.

Assim como as deficiências visuais, a mobilidade também pode ser um problema
temporário ou situacional: Talvez você tenha quebrado o pulso da mão que usa para manipular o mouse. Talvez o trackpad de seu laptop
esteja quebrado, ou você simplesmente esteja viajando um trem instável. Pode haver uma série
de situações em que a mobilidade de um usuário é limitada, e certificar-se
de atendê-los, melhora a experiência geral, tanto para pessoas com deficiência
permanente, quanto para aquelas que temporariamente não podem
usar uma IU baseada no ponteiro.

> *Ótimo, vamos falar sobre deficiências auditivas.*

Este grupo pode ir de pessoas totalmente surdas até aquelas com dificuldade de audição. E,
assim como a visão, a audição tende a piorar com a idade. Muitas pessoas usam affordances comuns,
como aparelhos auditivos.

<figure class="attempt-right">
  <img src="imgs/screen-captions.png" alt="Um televisor com legendas na parte inferior">	
  <figcaption>Legendas na tela</figcaption>
</figure>

Para usuários com deficiência auditiva, precisamos ter certeza de que não estamos
dependendo de som; portanto, certificar-se de usar coisas como legendas e
transcrições de vídeo, e fornecer algum tipo de alternativa, se o som for parte da interface.

E, como vimos nas deficiências visual e motora, é realmente fácil imaginar
uma situação onde alguém com audição excelente também pode se
beneficiar destas acomodações. Muitos de meus amigos dizem que adoram quando os vídeos têm
legendas e transcrições, porque isso significa que, se estiverem em um escritório sem
divisórias e não tiverem seus fones de ouvido consigo, eles ainda podem ver o vídeo!

> *Tudo bem, você pode nos falar um pouco sobre deficiências cognitivas?*

Há uma série de condições cognitivas como TDA, Dislexia e Autismo,
que pode significar que as pessoas desejam ou precisam acessar as coisas de forma diferente. As
acomodações para estes grupos são naturalmente extremamente diversificadas,
mas certamente encontramos alguma sobreposição com outras áreas, como usar a
funcionalidade de zoom para facilitar a leitura ou concentração. Além disso, esses usuários podem achar que
um design realmente minimalista funciona melhor, porque minimiza a distração e carga cognitiva.

Acho que todos podem se identificar com o estresse da sobrecarga cognitiva,
por isso, é óbvio que, se criarmos algo que funciona bem para uma pessoa
com uma deficiência cognitiva, estaremos criando algo que será uma experiência
agradável para todos.

> *Então, como você resumiria o que pensa sobre acessibilidade?*

Ao se analisar a ampla gama de habilidades e deficiências que as pessoas
podem ter, você pode ver que o design e construção de produtos somente
para pessoas que têm visão, audição, destreza e cognição perfeitas parece
incrivelmente limitado. Isso é quase autodestrutivo porque estamos criando
uma experiência mais estressante e menos utilizável para todos e, para alguns
usuários, criando uma experiência que, na verdade, os exclui completamente.

<hr>

Nesta entrevista, Victor identificou uma série de deficiências e as classificou
em quatro grandes categorias: *visual*, *motora*, *auditiva* e *cognitiva*. Ele
também apontou que cada tipo de deficiência pode ser *situacional*,
*temporária* ou *permanente*.

Vejamos alguns exemplos reais de deficiências de acesso e ver onde elas
se encaixam dentro dessas categorias e tipos. Observe que algumas deficiências podem se encaixar em
mais de uma categoria ou tipo.

<table>
  <tr>
    <th></th>
    <th>Situacional</th>
    <th>Temporária</th>
    <th>Permanente</th>
  </tr>
  <tr>
    <th>Visual</th>
    <td></td>
    <td>concussão</td>
    <td>cegueira</td>
  </tr>
  <tr>
    <th>Motora</th>
    <td>segurando um bebê</td>
    <td>braço quebrado, LER*</td>
    <td>LER*</td>
  </tr>
  <tr>
    <th>Auditiva</th>
    <td>escritório barulhento</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <th>Cognitiva</th>
    <td></td>
    <td>concussão</td>
    <td></td>
  </tr>
</table>

*Lesões por Esforços Repetitivos: por exemplo, síndrome do túnel do carpo,
cotovelo de tenista, dedo em gatilho

## Próximas etapas

Já avançamos bem no assunto. Você leu sobre

 - o que é acessibilidade e porque é importante para todos
 - as WCAG e a lista de verificação de acessibilidade do WebAIM
 - diferentes tipos de deficiências a considerar

No resto do guia, vamos mergulhar nos aspectos práticos da
criação de sites da Web acessíveis. Organizaremos este esforço em três assuntos
principais:

 - [**Foco**](/web/fundamentals/accessibility/focus): Veremos como construir
coisas que podem ser operadas com um teclado em vez do mouse. Isto é
importante para usuários com deficiências motoras, é claro, mas também
garante que sua IU esteja em boa forma para todos os usuários.

 - [**Semântica**](/web/fundamentals/accessibility/semantics-builtin): Certificaremos
a expressão de nossa interface do usuário de forma robusta, que funciona com
uma variedade de tecnologias assistivas.

 - [**Estilo**](/web/fundamentals/accessibility/accessible-styles): Consideraremos o design
visual e analisaremos algumas técnicas para tornar os elementos visuais da
interface tão flexíveis e úteis quanto possível.

Cada um desses assuntos poderia preencher um curso inteiro, portanto não vamos cobrir todos os aspectos
de criação de sites da Web acessíveis. No entanto, forneceremos informações
suficientes para a começar, e apontaremos alguns bons lugares onde você pode aprender mais
sobre cada tópico.



{# wf_devsite_translation #}
