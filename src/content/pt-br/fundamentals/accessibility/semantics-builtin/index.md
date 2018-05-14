project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Introdução à semântica e à tecnologia assistiva


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# Introdução à semântica {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



Você já viu como tornar um site acessível para usuários que não podem usar um mouse ou
dispositivo de ponteiro &mdash; seja por uma deficiência física, uma questão tecnológica
ou preferência pessoa &mdash; abordando o uso com apenas o teclado. Embora
cautela e reflexão sejam necessárias, isso não é muito trabalhoso se você planejar
desde o início. Quando o trabalho básico estiver concluído, você terá trilhado grande parte da
jornada para um site aprimorado e totalmente acessível.

Nesta lição, desenvolveremos esse trabalho e faremos você considerar outros
fatores de acessibilidade, por exemplo, como criar sites que ofereçam suporte para [usuários como
Victor Tsaran](/web/fundamentals/accessibility/#understanding-users-diversity),
que não conseguem enxergar a tela.

Primeiro, vamos estabelecer o pano de fundo da *tecnologia assistiva*, que é um termo genérico para
ferramentas como leitores de tela, que ajudam usuários com deficiências que podem impedi-los de
acessar informações.

Em seguida, examinaremos alguns conceitos gerais da experiência do usuário, e desenvolveremos esses conceitos para
nos aprofundarmos mais sobre a experiência dos usuários da tecnologia assistiva.

Por fim, veremos como usar o HTML de maneira eficaz para criar uma boa experiência para
esses usuários, e como grande parte dessas técnicas já foram abordadas quando falamos de foco
anteriormente.

## Tecnologia assistiva

*Tecnologia assistiva* é um termo genérico para dispositivos, software e ferramentas que
ajudam pessoas com deficiências a realizar uma tarefa. No sentido mais amplo,
pode ser algo não tecnológico como uma muleta para auxiliar a pessoa a andar ou uma lupa para
leitura, ou algo tecnológico como um braço robótico ou um software de reconhecimento de imagens
em um smartphone.

![exemplos de tecnologia assistiva, incluindo muletas, lupas e próteses
robóticas](imgs/assistive-tech1.png)

A tecnologia assistiva pode incluir algo genérico como o recurso de zoom de um navegador
ou específico como um controle de jogos personalizado. Pode ser um dispositivo físico separado
como um terminal braille ou ser implementado totalmente em software como
o recurso de controle de voz. Pode ser incorporado ao sistema operacional como alguns leitores
de tela ou um complemento como uma extensão do Chrome.

![mais exemplos de tecnologia assistiva, incluindo terminal braille e recurso de
controle de voz](imgs/assistive-tech2.png)

A linha entre a tecnologia auxiliar e a tecnologia em geral é tênue, afinal,
toda tecnologia tem como objetivo auxiliar as pessoas a realizar alguma tarefa. Além disso,
tecnologias podem entrar e sair da categoria "auxiliar" com frequência.

Por exemplo, um dos primeiros produtos comerciais de síntese de fala foi uma
calculadora falante para deficientes visuais. Agora, a síntese de fala está muito difundida,
de instruções de GPS para motoristas a assistentes virtuais. Por outro lado, tecnologias que anteriormente
eram genéricas frequentemente encontram um uso auxiliar. Por exemplo, pessoas
com visão reduzida podem usar o recurso de zoom da câmera de um smartphone para enxergar melhor
algo pequeno no mundo real.

No contexto de desenvolvimento Web, devemos considerar uma grande variedade de
tecnologias. As pessoas podem interagir com seu site usando um leitor de tela ou
um terminal braille, com um ampliador de tela, controle de voz, dispositivo de
switch ou outra forma de tecnologia assistiva que adapte a interface padrão
da página para criar uma interface mais específica que elas possam usar.

Muitas dessas tecnologias assistivas dependem de uma *semântica programaticamente
expressa* para criar uma experiência de usuário acessível, que é o objetivo principal
desta lição. Mas, antes de explicarmos a semântica programaticamente expressa,
precisamos falar um pouco sobre *affordances*.

## Affordances

Quando usamos uma ferramenta ou um dispositivo feito pelo homem, geralmente observamos sua forma e seu design
para ter uma ideia do que ele faz e como funciona. Uma *affordance* é qualquer
objeto que proporcione (“afford”, em inglês) ao usuário a oportunidade de realizar uma ação.
Quanto melhor for o design da affordance, mais óbvio e intuitivo é seu uso.

Um exemplo clássico é a chaleira. É fácil de reconhecer que você
deve segurá-la pela alça, não pelo bico, mesmo que você nunca tenha
visto uma chaleira antes.

![uma chaleira com alça e bico](imgs/teapot.png)

Isso ocorre porque a affordance é semelhante ao que você já viu em muitos outros
objetos, como regadores, jarros, xícaras e assim por diante. É
provavelmente possível segurar a chaleira pelo bico, mas sua experiência com
affordances semelhantes indica que a opção melhor é usar a alça.

Em interfaces de usuário gráficas, affordances representam ações que podemos realizar, mas
elas podem ser ambíguas por não haver um objeto físico com o qual interagir. Portanto, affordances
de GUI são especificamente projetadas para não serem ambíguas: botões, caixas de
seleção e barras de rolagem devem transmitir seu modo de uso sem precisar
de treinamento.

Por exemplo, você pode parafrasear o uso de alguns elementos de forma comuns
(affordances) da seguinte maneira:

 - Botões de opção &mdash; “Posso escolher uma destas opções.”
 - Caixa de seleção &mdash; “Posso escolher ‘sim’ ou ‘não’ para esta opção.”
 - Campo de texto &mdash; “Posso digitar algo nesta área.”
 - Lista suspensa &mdash; “Posso abrir este elemento para exibir minhas opções.”

Você pode tirar conclusões sobre esses elementos *somente porque pode
vê-los*. Naturalmente, alguém que não consegue enxergar as indicações visuais fornecidas por um elemento
não pode compreender seu significado ou entender intuitivamente o valor da affordance.
Portanto, devemos garantir que as informações sejam expressas de forma flexível o bastante para
serem acessadas por tecnologias assistivas que podem criar uma interface alternativa para
atender às necessidades do usuário.

Essa exposição não visual do uso de uma affordance é chamada de *semântica*.

## Leitores de tela

Um tipo popular de tecnologia assistiva é o *leitor de tela*, um programa que
permite que pessoas com deficiências visuais usem computadores ao ler o texto da tela
com uma voz gerada eletronicamente. O usuário pode controlar o que é lido movendo o cursor
para uma área relevante usando o teclado.

Pedimos que [Victor
Tsaran](/web/fundamentals/accessibility/#understanding-users-diversity)
explicasse como ele acessa a Web, como deficiente visual, usando o leitor de tela
incorporado ao OS X, que é chamado de VoiceOver. Confira [este
vídeo](https://www.youtube.com/watch?v=QW_dUs9D1oQ) do Victor usando o VoiceOver.

Agora, é sua vez de tentar usar um leitor de tela. Aqui está uma página com o *ChromeVox
Lite*, um leitor de tela mínimo, mas funcional, programado em JavaScript. A tela
é propositalmente desfocada para simular uma experiência de baixa visão e forçar o usuário a
realizar a tarefa com um leitor de tela. Naturalmente, você precisará usar
o navegador Chrome para esse exercício.

[Página de demonstração do ChromeVox Lite](http://udacity.github.io/ud891/lesson3-semantics-built-in/02-chromevox-lite/)

Você pode usar o painel de controle na parte inferior da tela para controlar o leitor de
tela. As funcionalidades desse leitor de tela são mínimas, mas você pode explorar
o conteúdo usando os botões `Previous` e `Next` e clicar em elementos
usando o botão `Click`.

Experimente usar essa página com o ChromeVox Lite ativado para ter uma ideia do uso
de um leitor de tela. Considere o fato de que um leitor de tela (ou outra tecnologia assistiva)
cria uma experiência de usuário totalmente alternativa com base na
semântica programaticamente expressa. Em vez de uma interface visual, o leitor
de tela oferece uma interface auditiva.

Observe como o leitor de tela fornece informações sobre cada elemento
da interface. Deve-se esperar que um leitor bem projetado forneça todas, ou pelo menos
a maior parte, das seguintes informações sobre os elementos encontrados.

 - A *função* ou o tipo de elemento, se especificado (deve ser).
 - O *nome* do elemento, se ele tiver um (deve ter).
 - O *valor* do elemento, se ele tiver um (pode ter ou não).
 - O *estado* do elemento, por exemplo, se ele está ativado ou desativado (se
 aplicável).

O leitor de tela pode criar essa interface alternativa porque os elementos
nativos contêm metadados de acessibilidade incorporados. Da mesma forma que o mecanismo de renderização
usa o código nativo para criar uma interface visual, o leitor de tela usa os
metadados nos nós do DOM para criar uma versão acessível, semelhante à apresentada
a seguir.

![um leitor de tela usa o DOM para criar
nós acessíveis](imgs/nativecodetoacc.png)


{# wf_devsite_translation #}
