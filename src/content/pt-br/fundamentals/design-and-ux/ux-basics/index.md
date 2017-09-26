project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Um guia passo a passo sobre os conceitos básicos do design de UX.

{# wf_updated_on: 2016-10-01 #}
{# wf_published_on: 2016-10-01 #}

# Conceitos básicos da UX {: .page-title }

{% include "web/_shared/contributors/mustafa.html" %}

Este artigo introduz um fluxo de trabalho que podem ajudar equipes, produtos, startups e
empresas a criar um processo robusto e significativo para desenvolver uma experiência
de usuário melhor para seus clientes. Você pode usar diferentes partes do processo
separadamente, mas, idealmente, elas funcionam melhor como uma série de etapas.

Este guia é baseado na metodologia Design Sprint que diversas
equipes do Google usam para solucionar problemas e desafios como o
[carro sem motorista](https://www.google.com/selfdrivingcar/ "Self Driving Car"){:target="_blank" .external}
e o [projeto Loon](https://www.solveforx.com/loon/ "Project Loon"){:target="_blank" .external}.

### Diamante duplo

Esse fluxo de trabalho é baseado em algo que a área de UX chamada de diamante duplo, popularizado
pelo [British Design Council](https://www.designcouncil.org.uk/ "British Design Council"){:target="_blank" .external},
no qual sua equipe se separa para fazer pesquisas com o objetivo de entender uma ideia e, em seguida,
se reúne para definir o desafio, se separa para esboçá-lo individualmente, compartilha as
ideias e decide a melhor maneira de avançar, testar e validar o projeto.

<figure>
  <img src="images/double-diamond.png" alt="As fases de um projeto incluem: Entender, Definir, Separar, Decidir, Prototipar e Validar">
  <figcaption>O modelo de processo de design do “diamante duplo” foi criado pelo British Design Council e suas etapas envolvem as seguintes fases de um projeto: <em>Entender</em>, <em>Definir</em>, <em>Separar</em>, <em>Decidir</em>, <em>Prototipar</em> e <em>Validar</em>.</figcaption>
</figure>

## Preparar o terreno

O primeiro passo para iniciar o desafio em questão e escrevê-lo como
se fosse uma proposta é se perguntar “qual é o problema que estou tentando
solucionar?”.  A afirmação do desafio é resumo que você cria para o projeto,
que inclui seu objetivo.

Esse desafio pode ser um recurso de um produto existente que precisa ser aprimorado
ou um produto totalmente novo. Independentemente de qual seja sua tarefa, basta ajustar
sua linguagem de acordo com o objetivo que você está tentando alcançar. Uma afirmação deve estar
associada aos objetivos da sua equipe, focada no seu público-alvo e ser inspiradora e concisa.

Apresentamos a seguir alguns exemplos reais de produtos nos quais eu já
trabalhei.

* Criar um sistema para gerenciar o tratamento e o acompanhamento de pacientes com
  os pés tortos.

* Criar um aplicativo que simplifique sistemas financeiros complexos e os reduza aos
  elementos essenciais.

* Criar um aplicativo para dispositivos móveis consistente em diferentes plataformas sem sacrificar
  a marca.

### Atualizar sua afirmação de desafio

Após escrever diversas variações do seu objetivo, apresente-os à equipe para
chegar a um consenso. É recomendável incluir um prazo para ajudar a equipe
a se concentrar no problema. Dessa forma, após adicionar alguns ajustes, a lista acima poderia
ficar assim:

* Criar um sistema para gerenciar o tratamento e o acompanhamento de crianças de
  até 2 anos que sofram de pés tortos para lançamento no primeiro trimestre deste ano.
* Criar um aplicativo financeiro simples que permita que você compre e venda ações com o toque de
  um botão sem conhecimento financeiro prévio, com lançamento inicial em
  julho de 2017.
* Produzir um guia de design que seja flexível em diversas plataformas e posicione
  a marca da empresa de forma eficaz em cada plataforma até o final deste ano.

Quando a afirmação do desfio estiver pronta, deixe-a exibida em um local de destaque
para que você possa vê-la enquanto trabalha. Será preciso consultá-la com
frequência e talvez atualizá-la ou modificá-la ao longo do projeto.

## Validar o problema

A próxima etapa é pesquisar o desafio e obter mais informações sobre o problema. O que você
precisa descobrir é se o entendimento de sua equipe do problema é válido.
Com frequência, nós examinamos um problema através do nosso próprio ponto de vista, o que é algo arriscado,
pois grande parte das pessoas que fazem parte da área de tecnologia são usuários avançados, ou seja, um grupo
minoritário. Nós somos uma minoria com participação ativa e isso pode nos fazer pensar que algo
é um problema quando isso não é verdade.

Existem várias formas de coletar dados para validar o desafio. Cada uma delas
depende da sua equipe e do seu acesso a usuários. O objetivo é compreender
melhor o problema em questão.

### Entrevistas internas com partes interessadas

<figure>
  <img src="images/stakeholder-interviews.jpg" class="attempt-right" alt="Entrevistas com partes interessadas podem ser informativas na coleta de dados de uma empresa ou equipe.">
  <figcaption>Entrevistas com partes interessadas podem ser informativas na coleta de dados de uma empresa ou equipe.</figcaption>
</figure>

O processo de entrevista envolve todos os membros da sua equipe e os interessados
em sua empresa, desde o departamento de marketing até o departamento de contas. Isso ajudará você a descobrir o que essas pessoas
consideram como verdadeiros desafios e o que elas acham que poderia solucioná-los.
Nesse caso, a solução não seria técnica, mas apenas
qual seria o melhor cenário e o objetivo final para a empresa ou o produto.
Por exemplo, usando os desafios acima, “ter nosso software para pés chatos em 80% das
instalações médicas até o final do ano” seria um ótimo objetivo.

Há uma ressalva. Esse método de validação é o menos utilizado, pois ele
impede discussões e colaboração entre a equipe, potencialmente criando uma atmosfera
de isolamento em uma organização. Mesmo assim, ela pode gerar boas informações
sobre os clientes e o desafio de design que poderiam passar despercebidas.

### Palestras relâmpago

<figure>
  <img src="images/lightning-talks.jpg" alt="Uma palestra relâmpago é uma apresentação curta de apenas alguns minutos.">
  <figcaption>Uma palestra relâmpago é uma apresentação curta de apenas alguns minutos.</figcaption>
</figure>

Ela é semelhante às entrevistas internas, mas, dessa vez, você reúne todos os
interessados em uma só sala. Em seguida, você escolhe cinco ou seis desses indivíduos
(departamentos de marketing, vendas, design, contas, pesquisa etc.) para fazer uma palestra, cada um
se concentrando no desafio a partir de sua própria perspectiva, por até 10 minutos.
Os tópicos abordados nas apresentações devem ser:

* Objetivos da empresa
* Desafios do projeto em seus pontos de vista (técnico,
  coleta de dados para pesquisa, criação do design etc.)
* Pesquisas de usuários disponíveis no momento

Reserve 5 minutos ao final para perguntas, com um indivíduo fazendo anotações
durante todo o processo. Quando terminar, é recomendável atualizar o desafio para refletir
as informações obtidas. O objetivo é coletar uma lista de tópicos a partir dos quais você possa criar um
recurso ou fluxo que o ajude a alcançar os objetivos do produto.

### Entrevistas com usuários
<figure>
  <img src="images/user-interviews.jpg" class="attempt-right" alt="Entrevistas com usuários são uma forma excelente de descobrir as dificuldades de cada pessoa em relação a qualquer tarefa.">
  <figcaption>Entrevistas com usuários são uma forma excelente de descobrir as dificuldades de cada pessoa em relação a qualquer tarefa.</figcaption>
</figure>

Essa, talvez, seja a melhor forma de saber mais sobre a jornada, as dificuldades
e o fluxo dos usuários. Organize pelo menos cinco entrevistas com usuários, ou mais caso tenha acesso
a eles. Exemplos de perguntas que devem ser feitas:

- Como o usuário realiza uma tarefa existente? Por exemplo, digamos que você queija solucionar
  o desafio do aplicativo financeiro acima, você poderia perguntar “como você compra ações
  no momento?”
- O que o usuário acha desse fluxo?
- Quais são os pontos negativos do fluxo?
- Quais produtos semelhantes o usuário utiliza atualmente?
    *  Quais são os pontos positivos?
    *  Quais são os pontos negativos?
- Se o usuário tivesse uma varinha mágica e pudesse mudar um elemento desse processo, o que
  ele mudaria?

O objetivo da entrevista é fazer com que o usuário fale sobre os desafios que ele
enfrenta. Esse não é um ponto de discussão para você, portanto, permaneça
em silêncio. Isso deve ser feito mesmo que o usuário pare de falar. Sempre aguarde um
momento, pois ele pode estar refletindo. Você se surpreenderia em saber quanto
alguém continua a falar após parar por alguns momentos.

Faça anotações durante todo o processo e, se possível, grave a conversa para capturar
qualquer coisa que tenha passado despercebida. O objetivo é comparar o desafio
com as informações fornecidas pelo usuário. Eles se alinham? Você descobriu qualquer coisa que
o ajude a atualizar a afirmação do desafio?

### Pesquisa de campo etnográfica

<figure>
  <img src="images/field-interviews.jpg" class="attempt-right" alt="Examinar os usuários em seu ambiente natural é uma ótima maneira de entender como eles solucionam seus próprios desafios.">
  <figcaption>Examinar os usuários em seu ambiente natural é uma ótima maneira de entender como eles solucionam seus próprios desafios.</figcaption>
</figure>

Nessa etapa, você deve observar o usuário em campo, no contexto em questão enquanto ele realiza
uma tarefa, como fazer compras, viajar,
enviar mensagens SMS etc. O motivo disso é que, às vezes, as pessoas falam
o que elas acham que você quer ouvir. No entanto, assistir aos usuários realizando ações e
tarefas por conta própria pode ser muito informativo. Basicamente, você deve observar sem
interferir, identificando o que o usuário acha fácil ou difícil e o que ele possa
ter esquecido de mencionar. O objetivo é se imergir no ambiente do usuário para
compreender melhor suas dificuldades.

Essa técnica geralmente envolve algum trabalho realizado em um período mais extenso
e exige que um pesquisador lidere essa parte do projeto. Ela é, no entanto, talvez
a técnica mais informativa, pois você tem a oportunidade de examinar um grupo das pessoas que você está estudando
em seus ambientes naturais.

### Reunir todos os dados

Após concluir a fase de aprendizado do seu projeto, você deve examinar
seu desafio uma última vez. Você está no caminho certo? Precisa ajustar
alguma coisa? Anote tudo o que você aprendeu e organize as informações em
categorias. Elas podem se tornar a base de um recurso ou fluxo, dependendo do
problema a ser solucionado. Elas também podem ser usadas para atualizar e revisar o
desafio.

Quando tiver feedback e informações suficientes, é hora de aplicar esse conhecimento para
criar um mapa do projeto.

## Mapa do projeto

O problema que você está tentando resolver geralmente engloba diferentes tipos de
pessoas (ou partes interessadas), cada um com um interesse no fluxo do projeto Com base no que
você aprendeu, você deve listar os possíveis interessados do projeto. Pode ser um tipo de usuário ou
ou um interessado, por exemplo, “um médico que trata pés tortos”, “um paciente que tem
pés tortos”, “um cuidador que atende o paciente” etc. Anote cada interessado
no lado esquerdo de uma folha de papel ou, se tiver acesso a um, em um
quadro branco. No lado direito, anote os objetivos de cada interessado.

Por fim, anote para cada interessado o número de etapas necessárias para
que eles alcancem seus objetivos. Por exemplo, para “um médico que trata pés tortos”, o objetivo pode
ser “curar um paciente com pés tortos”, portanto, as etapas podem ser “registrar o paciente
no sistema”, “iniciar um plano de tratamento para o paciente”, “criar um ciclo de acompanhamento da
saúde do paciente” e “realizar procedimentos médicos”.

<figure>
  <img src="images/project-map.jpg" alt="O mapa do projeto detalha as etapas principais para cada usuário ou interessado em um fluxo">
  <figcaption>O mapa do projeto detalha as etapas principais para cada usuário ou interessado em um fluxo</figcaption>
</figure>

O resultado é um mapa de projeto com as principais etapas do processo. É como se fosse
uma visão geral do projeto, sem muitos detalhes. Isso também permite que os membros da equipe
avaliem se o mapa corresponde à afirmação de desafio. Mais tarde, quando você detalhar
cada etapa, ele conterá mais informações. Mas, por enquanto, um mapa do projeto apresenta
uma visão geral das etapas que um usuário precisará realizar para alcançar seu objetivo final.

## Estruturação e storyboarding

### Oito maluco

Para isso, recomendo um método chamado oito maluco, que envolve dobrar um pedaço de papel
duas vezes para que ele oito painéis. Em seguida, você desenha em cada painel uma ideia
baseada no que você aprendeu até o momento. Reserve dez minutos para
pensar em ideias para preencher todos os painéis. Se tiver mais de 20
minutos, você poderá começar a procrastinar, ir fazer um café, conferir seu e-mail,
conversar com a equipe sobre outros assuntos e evitar a tarefa a ser feita. É
preciso criar uma sensação de urgência nessa etapa, pois isso força você a trabalhar com mais rapidez
e eficácia.

Se estiver trabalhando com uma equipe, peça que cada um faça seus oito painéis. Esse
processo coloca sua cabeça para funcionar e faz você começar a pensar no desafio.
Geralmente, o esboço será a estrutura de design da interface.

Depois, você e cada membro da sua equipe deve apresentar suas ideias ao grupo.
Cada um deve explicar as oito ideias em detalhes e por que tomaram
determinada decisão. Lembre a equipe de usar as informações já obtidas para
justificar suas ideias. Quando todos terminarem suas apresentações, é hora de votar
nas ideias. Cada pessoa tem dois votos, podendo escolher entre todas as apresentadas. Vocês podem dar
ambos os votos para a mesma ideia se gostarem muito dela.


<!-- <figure>
  <img src="images/voting-ideas.jpg"   alt="Você pode fazer anotações em notas adesivas e votar em conceitos ou nos esboços em si">
  <figcaption>Você pode fazer anotações em notas adesivas e votar em conceitos ou nos esboços em si</figcaption>
</figure> -->


<figure  class="attempt-left">
  <img src="images/crazy-8s.jpg" alt="O oito maluco é uma maneira excelente de colocar todas as suas ideias no papel".>
  <figcaption>O oito maluco é uma maneira excelente de colocar todas as suas ideias no papel.</figcaption>
</figure>

<figure class="attempt-right">
  <img src="images/detailed-wireframe.jpg"   alt="Agora, você deve criar um design detalhado com base no que aprendeu até agora.">
  <figcaption>Agora, você deve criar um design detalhado com base no que aprendeu até agora.</figcaption>
</figure>

<div class="clearfix"></div>

### Refinar seu design

Após a votação, separe a ideia com mais votos e esboce uma ideia final.
Você também pode pegar conceitos de outras ideias apresentadas por seus colegas.
Reserve mais dez minutos para realizar essa tarefa. Quando terminar,
apresente novamente as ideias para a equipe e faça outra votação.

### Criar um storyboard para a ideia


<figure>
  <img src="images/storyboard.jpg" class="attempt-right" alt="O storyboard envolve a combinação dos seus esboços e ideias em um fluxo detalhado.">
  <figcaption>O storyboard envolve a combinação dos seus esboços e ideias em um fluxo detalhado.</figcaption>
</figure>

Com o design pronto, é hora de criar o storyboard de sua interação com o usuário.
Nesse momento, você já deve ter considerado as diferentes etapas a serem realizadas
pelo usuário. É muito comum incorporar os designs dos seus colegas
no fluxo também. É importante ter um processo passo a passo claro, com alguns
pontos de divergência entre os usuários. Consulte o mapa do projeto para validar
o design de acordo com o objetivo.

<div class="clearfix"></div>

## Criar um protótipo

O objetivo do protótipo não é criar o código perfeito para
produzir algo verdadeiro quando usado por alguém. As ferramentas usadas na criação
de protótipos variam de pessoa para pessoa. Alguns gostam do Keynote ou do Powerpoint, pois eles forçam
você a pensar no fluxo, não nos detalhes do design. Pode ser interessante investir
algum tempo para estudar ferramentas como o Balsamiq, o Marvel ou o Framer, que oferecem mais
controles comportamentais. Independentemente da ferramenta usada, ela deve fazer
você se concentrar no fluxo e parecer real. Você precisa testar o protótipo com pessoas de verdade,
logo, ele deve ser o mais real possível, mas, ao mesmo tempo, não deve levar
semanas de trabalho para ser criado.

<figure>
  <img src="images/prototyping.jpg"  alt="Os protótipos devem parecer reais o bastante para que os usuários acreditem">
  <figcaption>Os protótipos devem parecer reais o bastante para que os usuários acreditem</figcaption>
</figure>

A criação de um protótipo é um equilíbrio entre tempo e veracidade, portanto, tenha cuidado para não
pender demais para nenhum dos extremos. De qualquer maneira, seria uma perda de tempo.

## Testar a usabilidade dos seus designs

É ótimo ter um laboratório de testes. Caso você não tenha, não é difícil criar um
desde que você crie um ambiente que seja confortável para os usuários,
mas que não os distraia. Os testes geralmente envolvem o usuário e dois membros da sua
equipe, um para fazer anotações e outro para fazer perguntas. Uma boa estratégia é
usar um aplicativo como Hangouts e gravar as ações dos usuários. Isso também é útil se você
quiser que o restante da equipe observe o processo de outro local. Isso pode ser bastante
intimidador para nós, desenvolvedores de aplicativos, pois estaremos vendo nossos designs em condições de uso real.
Pode ser uma experiência igualmente interessante e séria.

<figure>
  <img src="images/usability-testing.jpg"  alt="O storyboard envolve reunir todos os seus esboços e ideias em um fluxo detalhado.">
  <figcaption>O storyboard envolve reunir todos os seus esboços e ideias em um fluxo detalhado.</figcaption>
</figure>

### Perguntas a serem feitas

Ao testar o design, peça que o usuário realize tarefas no seu aplicativo e verbalize
o que estiver fazendo e por quê. Isso pode ser estranho,
mas é útil saber o que o usuário está pensando. Tente não interromper ou dizer
o que o usuário deve fazer quando ele estiver na dúvida. Simplesmente peça que ele examine um
determinado fluxo após ele ser concluído (ou NÃO concluído).

O que você deve descobrir:

- Quais são os pontos positivos do protótipo?
- Quais são os pontos negativos do protótipo?
- Quais são as áreas de dificuldade?
      * Por que um fluxo funcionou?
      * Por que um fluxo não funcionou?
- O que o usuário gostaria de melhorar?
- O design/fluxo geral atende às suas necessidades?

## Retomar os designs e mais uma fase de testes

Você tem um protótipo operacional e feedback. Agora é o momento de revisar seus
designs e analisar o que funcionou e o que não funcionou. Não tenha medo de criar
uma estrutura de storyboard totalmente nova e produzir um novo protótipo. Um recomeço pode
criar um fluxo melhor do que simplesmente tentar modificar os elementos do protótipo anterior. Tente
não se apegar muito, pois ele é apenas um protótipo.

Quando estiver satisfeito com seus design, teste-o novamente para refiná-lo ainda
mais. Em casos nos quais o protótipo não funcionou, você pode achar
que o projeto falhou. Isso não é verdade. É provável que você tenha passado menos
tempo desenvolvendo do que se tivesse realmente produzido o design e, agora, você sabe mais
sobre o que os usuários realmente gostam. Com design sprints, temos uma filosofia na qual
você vence ou aprende, então não fique muito decepcionado se uma ideia
não funcionar como o planejado.

## Hora de produzir!

Você já testou suas ideias. Os usuários gostam delas. As partes interessadas estão investidas
porque se envolveram no processo desde o início. Agora, é hora de produzir
sua criação. Nessa etapa, você já deve ter uma ideia clara do que precisa ser feito e quais são
as prioridades da experiência. Em cada marco do projeto, é recomendável
introduzir testes de usabilidade para ajudar a validar seu trabalho e manter você no caminho
certo.

É extremamente importante coletar o máximo de informações possíveis antes
de dedicar uma grande quantidade de trabalho, tempo e energia em algo que pode não ser a
solução certa.

Após ler este artigo, você agora deve ter um entendimento básico da UX e sua importância. A UX
não é algo que deva ser considerado uma função de um designer ou de um
pesquisador. Na verdade, ela é responsabilidade de todos os envolvidos em um projeto,
portanto, recomendo o envolvimento de todos em todas as oportunidades.


{# wf_devsite_translation #}
