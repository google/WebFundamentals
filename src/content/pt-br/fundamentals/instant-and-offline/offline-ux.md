project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Um guia para projetar experiências Web para redes lentas e off-line.

{# wf_updated_on: 2016-11-10 #}
{# wf_published_on: 2016-11-10 #}

# Considerações sobre a experiência do usuário off-line {: .page-title }

{% include "web/_shared/contributors/mustafa.html" %}

Este artigo examinará as várias considerações de projeto necessárias para criar
uma ótima experiência em redes lentas e off-line.

A qualidade de uma conexão de rede pode ser afetada por diversos fatores,
como:

* Cobertura deficiente de um provedor. 
* Condições meteorológicas extremas.
* Interrupções no fornecimento de energia elétrica.
* Usuários que passam por "zonas mortas", como edifícios, que bloqueiam
  conexões de rede. 
* Viajar de trem e passar por um túnel.
* Conexão com a internet gerenciada por terceiros e com tempo de atividade/inatividade
  controlado, com em um aeroporto ou hotel.
* Práticas culturais que exigem acesso limitado ou proíbem o acesso em horários
  ou dias específicos.

O seu objetivo e oferecer uma boa experiência que reduza o impacto das mudanças
de conectividade. 

## O que mostrar aos usuários que tem uma conexão de rede ruim?

A primeira pergunta a fazer é: qual é a aparência de uma conexão de rede
bem-sucedida ou com falhas? Uma conexão bem-sucedida é a experiência
on-line normal do aplicativo. No entanto, a falha de uma conexão pode ser o estado off-line
do aplicativo e o comportamento do aplicativo em uma rede lenta.

Ao pensar sobre o sucesso ou falha de uma conexão de rede, você precisa se perguntar
estar questões importantes sobre a experiência do usuário:

* Quando tempo você espera para determinar o sucesso ou a falha de uma conexão? 
* O que você pode fazer durante a determinação de sucesso ou falha? 
* O que você deve fazer em caso de falha?
* Como você informa o usuário sobre as questões acima?

### Informar os usuários sobre o estado atual e a mudança de estado

Informe ao usuário as ações que ainda podem tomar em caso de falha
de rede e o estado atual do aplicativo. Por exemplo, uma possível notificação
seria:

> "Parece que a sua conexão de rede não está boa. [Não se preocupe!] As mensagens serão
enviadas quando a rede voltar ao normal."

<figure class="attempt-left">
  <img src="images/emojoy-toast-message.png" alt="Emojoy, o aplicativo de mensagens de emoticons, informando ao usuário quando ocorre uma alteração de estado.">
  <figcaption>
    Informe claramente e o mais cedo possível ao usuário quando ocorre uma mudança de estado.
  </figcaption>
</figure>
<figure class="attempt-right">
  <img src="images/io-toast-message.png" alt="O aplicativo I/O 2016 informando ao usuário quando ocorre uma mudança de estado.">
  <figcaption>
    O aplicativo Google I/O usou um "toast" de material design para informar ao usuário quando ficou off-line.
  </figcaption>
</figure>

<div class="clearfix"></div>

### A conexão de rede melhora ou é restaurada

<figure class="attempt-right">
  <img src="images/weather-app.png" alt="Um exemplo de um aplicativo meteorológico.">
  <figcaption>
    Alguns aplicativos, como esse aplicativo meteorológico, precisam de atualizações automáticas, pois dados desatualizados não são úteis para o usuário.
  </figcaption>
</figure>

A forma como você informa o usuário quando a conexão de rede melhorou
dependerá principalmente do aplicativo. Para aplicativos que priorizam a
exibição de informações atualizadas, como um aplicativo do mercado de ações, a atualização e a notificação
automáticas, efetuadas o mais cedo possível, são cruciais.

<div class="clearfix"></div>

Você também pode mostrar sempre, em um espaço destacado, a última vez que o aplicativo foi
atualizado. Isso também seria útil para um aplicativo conversor de moeda, por exemplo.

<figure>
  <img class="attempt-left" src="images/material-money-rates-out-of-date.png" alt="Aplicativo Material Money desatualizado">
  <img class="attempt-right" src="images/material-money-rates-updated.png" alt="Aplicativo Material Money foi atualizado">
  <figcaption class="clearfix">
    O Material Money mostra o valor da moeda mais recente quando possível e notifica o
    usuário quando o aplicativo não foi atualizado.
  </figcaption>
</figure>

Outros aplicativos, como um aplicativo de notícias, podem mostrar uma notificação simples informando
ao usuário que há conteúdo mais recente e disponibilizando uma função do tipo tocar-para-atualizar. O motivo
para isso é que, se o usuário está lendo um artigo, uma atualização automática atualizaria
a página e o usuário perderia o local da última leitura.


<figure>
  <img class="attempt-left" src="images/tailpiece-normal.png" alt="Exemplo de aplicativo de notícias, Tailpiece no estado normal">
  <img class="attempt-right" src="images/tailpiece-tap-to-update.png" alt="Exemplo de aplicativo de notícias, Tailpice pronto para ser atualizado">
  <figcaption class="clearfix">
    O Tailpiece, um jornal on-line, baixa automaticamente as notícias mais recentes, mas
    permite que os usuários façam a atualização manualmente para não perder a posição de leitura no artigo.
  </figcaption>
</figure>

### Estados contextuais e modo de navegação

Cada parte da IU pode ter seus próprios contexto e funcionalidades, que serão alterados
dependendo da necessidade de uma conexão bem-sucedida. Um exemplo seria um
site de comércio eletrônico que pode ser navegado off-line, embora com o botão Comprar
e os preços desativados até que a conexão seja recuperada.

Outras formas de estados contextuais podem incluir dados. Por exemplo, o aplicativo
financeiro Robinhood permite que os usuários comprem ações e usar cores e gráficos para
notificar o usuário quando o mercado abre. Toda a interface fica branca e
então esmaece quando o mercado fecha. Quando o valor da ação aumenta ou
diminui, cada widget individual de ação fica verde ou vermelho, dependendo do seu
estado.

### Educar o usuário para que entenda o que é o modelo off-line

O off-line é um novo modelo mental para todos. Você precisa educar os usuários sobre
quais mudanças ocorrerão quando não tiverem uma conexão. Informe onde
dados volumosos são salvos e ofereça configurações para alterar o comportamento padrão. Não
deixe de usar vários componentes de design de IU, como linguagem informativa, ícones,
notificações, cores e imagens para transmitir essas ideias coletivamente, em vez de
confiar em apenas um elemento de design, como um ícone específico, para contar toda
a história.

## Fornecer uma experiência off-line por padrão 

Se o aplicativo não exigir muitos dados, armazene esses dados em cache por padrão. Os usuários
podem se frustrar cada vez mais se somente puderem acessar os dados com uma
conexão de rede. Tente oferecer uma experiência com a máxima estabilidade possível. Uma
conexão instável pode fazer o seu aplicativo parecer não confiável. Por outro lado, um aplicativo que
reduz o impacto de uma falha de rede parecerá mágico para o usuário.

Sites de notícias podem se beneficiar baixando e salvando automaticamente o conteúdo de
notícias mais recente do dia, permitindo que o usuário leia as notícias diárias sem uma conexão, possivelmente
baixando somente o texto, sem as imagens do artigo. Além disso, adapte-se ao
comportamento do usuário. Se ele normalmente acessa a seção de esportes,
talvez você possa priorizar o download desses dados.

<figure>
  <img class="attempt-left" src="images/tailpiece-offline.png" alt="O Tailpiece informa ao usuário que está off-line com vários widgets de design">
  <img class="attempt-right" src="images/tailpiece-offline-sidebar.png" alt="O Tailpiece tem uma gaveta de navegação que mostra quais seções estão prontas para uso off-line.">
  <figcaption class="clearfix">
    Se o dispositivo estiver off-line, o Tailpiece notificará o usuário com uma mensagem
    de status, informando que ele pode continuar a usar o aplicativo.
  </figcaption>
</figure>

## Informar ao usuário quando o aplicativo está pronto para consumo off-line 

Quando um app da Web é carregado pela primeira vez, é preciso indicar ao usuário se ele está preparado
para uso off-line. Faça isso com um
[widget que oferece um feedback resumido](https://material.google.com/components/snackbars-toasts.html "widget that provides brief feedback")
sobre uma operação por meio de uma mensagem na parte inferior da tela. 
Por exemplo, quando uma seção foi sincronizada ou um arquivo de dados foi baixado.

Novamente, considere a linguagem utilizada para garantir sua adequação ao
público. Verifique se a mensagem é a mesma em todas as instâncias
em que é usada. Normalmente, o termo off-line não é compreendido corretamente pelo público não técnico. Portanto,
use uma linguagem baseada em ações que o público possa entender.


<figure>
  <img class="attempt-left" src="images/io-offline-ready.png" alt="Aplicativo I/O off-line">
  <img class="attempt-right" src="images/chome-offline.png" alt="Site Chrome Status está off-line">
  <figcaption class="clearfix">
    O aplicativo Google I/O 2016 e o site Chrome Status notificam o usuário quando
    o aplicativo está pronto para uso off-line.
  </figcaption>
</figure>

### Destaque "salvar para off-line" na interface de aplicativos com uso intensivo de dados

Se um aplicativo usar grandes quantidades de dados, assegure a disponibilidade de uma chave
ou pino para uso off-line em vez de baixar os dados automaticamente, a menos que o
usuário tenha solicitado especificamente esse comportamento em um menu de configuração. Verifique
se a IU do pino ou do download não é sobreposta por outros elementos de IU e que o recurso
está óbvio para o usuário.


Um exemplo seria um reprodutor de música que exige grandes arquivos de dados. O usuário está
ciente do custo de dados associado, mas também sabe que pode querer usar o
reprodutor quando estiver off-line. Baixar música para uso posterior exige que o
usuário planeje. Portanto, pode ser necessário educá-lo durante a
ativação.

### Explicar o que pode ser acessado off-line 

Seja claro sobre a opção oferecida. Pode ser necessário exibir uma guia ou
configuração que mostre uma "biblioteca off-line" para que o usuário
perceba facilmente o que está armazenado no telefone e o que precisa ser salvo. Verifique se as configurações
estão concisas e seja claro sobre o local onde os dados serão armazenados e sobre quem terá acesso a eles.

### Mostre o custo real de uma ação

Muitos usuários acham que o recurso off-line significa poder fazer downloads. Usuários em países
em que conexões de rede regularmente falham ou não estão disponíveis costumam compartilhar
conteúdo com outros usuários ou salvam conteúdo para uso off-line quando têm conectividade.

Usuários de planos de dados podem evitar baixar arquivos grandes devido ao custo. Portanto, você pode
exibir o custo associado para que os usuários possam fazer uma comparação
ativa para um arquivo ou tarefa específico.  Por exemplo, o aplicativo musical acima
pode detectar se o usuário está em um plano de dados e mostrar o tamanho de arquivo para que os
usuários percebam o custo real de um arquivo.

### Ajude a evitar experiências improvisadas 

Muitas vezes, os usuários improvisam experiências sem perceber. Por exemplo,
antes dos aplicativos de compartilhamento na nuvem como o Google Drive, era comum que os usuários salvassem arquivos
grandes e os anexassem a e-mails para poder continuar a edição em um dispositivo
diferente. É importante não se envolver nessa experiência improvisada, mas examinar
o que o usuário está tentando conseguir. Em outras palavras, em vez de pensar sobre
como você pode facilitar a anexação de um arquivo grande, resolva o
problema compartilhando arquivos grandes em diversos dispositivos.

## Experiência transferível de um dispositivo para outro

Ao disponibilizar uma experiência em uma conexão de rede pouco confiável, procure sincronizá-la
corretamente quando a conexão melhorar para que a experiência possa ser transferida.
Por exemplo, imagine um aplicativo de viagens que perde a conexão de rede no meio de uma
reserva. Quando a conexão é restabelecida, o aplicativo sincroniza com a conta
do usuário e ele pode continuar com a reserva no dispositivo de desktop. A incapacidade
de transferir experiências é incrivelmente perturbadora para os usuários.

Informe ao usuário o estado atual dos dados. Por exemplo, se o aplicativo conseguiu ou não
fazer a sincronia. Sempre que possível, eduque os usuários, mas não os sobrecarregue
com mensagens.

## Criar experiências de design inclusivas 

Durante o design, procure ser inclusivo oferecendo dispositivos de design significativos,
linguagem simples, iconografia padrão e imagens significativas que orientem
o usuário a concluir a ação ou tarefa, em vez de atrapalhar a atividade.

### Usar linguagem concisa e simples como guia

Uma boa experiência de usuário não se limita a uma interface bem projetada. Ela inclui o fluxo percorrido
pelo usuário, bem como a linguagem usada no aplicativo. Evite usar jargão técnico
para explicar o estado do aplicativo ou componentes individuais da IU. Considere que a
frase "aplicativo off-line" pode não transmitir o estado atual do aplicativo para o usuário.

<div class="attempt-left">
  <figure>
    <img src="images/download.png" alt="O exemplo de download de ícone é um bom exemplo">
    <figcaption class="success">
      <b>CERTO</b>: Use linguagem e imagens que descrevem a ação.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/service-worker-ready.png" alt="O exemplo do ícone de service worker é um mau exemplo.">
    <figcaption class="warning">
      <b>ERRADO</b>: Evite termos abstratos que podem não ser compreendidos facilmente. 
     </figcaption>
  </figure>
</div>
<div class="clearfix"></div>


### Usar vários dispositivos de design para criar experiências de usuário acessíveis

Use linguagem, cores e componentes visuais para demonstrar uma mudança de estado ou
o status atual. O uso exclusivo de cor para demonstrar o estado pode não ser percebido pelo
usuário, e pode ser inacessível para usuários com deficiências visuais.
Além disso, o instinto dos designers é usar uma IU esmaecida para representar o off-line,
mas essa representação pode ter outros significados na Web. A IU esmaecida também é usada para indicar
que um elemento está desativado, como elementos de entrada em um formulário. Isso pode causar
confusão se você usar SOMENTE a cor para demonstrar o estado.

Para evitar mal-entendidos, exprima estados diferentes para o usuário de diversas
formas. Por exemplo, com cores, rótulos e componentes de IU.

<div class="attempt-left">
  <figure>
    <img src="images/accessibility_color7_do.png" alt="Bom exemplo, que usa cor e texto para mostrar um erro.">
    <figcaption class="success">
      <b>CERTO</b>: Use uma combinação de elementos de design para comunicar um significado
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/accessibility_color8_dont.png" alt="Mau exemplo, usando apenas cor.">
    <figcaption class="warning">
      <b>ERRADO</b>: Use apenas cor para descrever o que acontece.
     </figcaption>
  </figure>
</div>

<div class="clearfix"></div>

### Usar ícones que comunicam significado 

Verifique se as informações são comunicadas corretamente com rótulos de texto significativos e
ícones. Isoladamente, os ícones podem ser problemáticos, pois o conceito de off-line
na Web é relativamente novo. Os usuários podem não entender os ícones usados isoladamente. Por
exemplo, o uso de um disquete para salvar faz sentido para gerações mais velhas, mas
para usuários jovens, que nunca viram um disquete, podem ficar confusos com a metáfora.
Da mesma forma, o ícone de menu "hambúrguer" pode confundir os usuários quando
apresentado sem um rótulo.


Ao apresentar um ícone para off-line, tente manter a consistência com o visual padrão
do setor (se existir) e forneça um rótulo de texto e uma
descrição. Por exemplo, salvar para off-line pode ser um ícone típico de download ou
talvez, se a ação envolver uma sincronização, pode ser um ícone de sincronização. Algumas ações
podem ser interpretadas como salvar para off-line em vez de demonstrar um status
da rede. Pense na ação que você está tentando comunicar em vez de apresentar ao
usuário um conceito abstrato. Por exemplo, salvar ou baixar dados são baseados em
ação.

<img src="images/download-icons-exampels.png" alt="Vários exemplos de ícone que comunicam off-line">

O off-line pode significar diversas coisas, dependendo do contexto, como download, 
exportar, fixar etc. Para obter mais inspirações, confira o
[conjunto de ícones de material design](https://material.io/icons/ "material design icon set")

### Usar layouts básicos com outro mecanismo de feedback 

Um layout básico é essencialmente uma visão delineada do aplicativo, exibida
durante a carga do conteúdo. Isso ajuda a demonstrar ao usuário que o conteúdo
logo será carregado. Considere também usar uma IU de pré-carregamento,
com um rótulo de texto informando ao usuário que o aplicativo está carregando. Um exemplo seria
pulsar o conteúdo delineado, transmitindo a sensação de que o aplicativo está vivo e
carregando. Isso tranquiliza o usuário e mostra que algo está acontecendo, ajudando a evitar
novos envios ou atualizações do aplicativo.

<figure>
  <img class="attempt-left" src="images/tailpiece-skel-article.png" alt="Exemplo de layout delineado">
  <img class="attempt-right" src="images/tailpiece-normal.png" alt="exemplo de artigo carregado">
  <figcaption class="clearfix">
    Antes e depois de um layout delineado.
  </figcaption>
</figure>

### Não bloqueie conteúdo

Em alguns aplicativos, um usuário pode iniciar uma ação, como a criação de um novo
documento. Alguns aplicativos tentam se conectar a um servidor para sincronizar o novo
documento e, para demonstrar isso, eles exibem uma caixa de diálogo modal intrusiva
que cobre toda a tela. Isso pode funcionar bem se o usuário tiver uma
conexão de rede estável. Mas, se a rede for instável, ele não conseguirá escapar
dessa ação e a IU impedirá que ele faça qualquer outra coisa.
Solicitações de rede que bloqueiam conteúdo também devem ser evitadas. Permita que o usuário
continue a navegar pelo aplicativo e enfileire tarefas que serão executadas e sincronizadas
quando a conexão melhorar.

Demonstre o estado de uma ação fornecendo feedback aos usuários. Por
exemplo, se um usuário está editando um documento, considere alterar o design do feedback para que seja
visivelmente diferente do design on-line, sem deixar de mostrar que o arquivo
foi "salvo" e será sincronizado quando houver uma conexão de rede. Isso educará
o usuário sobre os diferentes estados disponíveis e garantirá a ele que a tarefa ou ação
foi armazenada. Outro benefício é que o usuário ficará mais
confiante ao usar o aplicativo.

## Design para o próximo bilhão

Em muitas regiões, dispositivos básicos são comuns, a comunicação é pouco confiável
e muitos usuários não conseguem arcar com o custo dos dados. Você precisará conquistar a confiança desses usuários
sendo transparente e frugal com dados. Pense sobre as formas de ajudar usuários com conexões
não confiáveis e simplifique a interface para ajudar a acelerar as tarefas. Tente sempre consultar
os usuários antes de baixar conteúdo com grandes volumes de dados.

Ofereça opções para baixa largura de banda aos usuários com conexões lentas. Portanto, se a conexão de
rede for lenta, forneça ativos pequenos. Ofereça uma opção para escolher ativos de
alta ou baixa qualidade.

## Conclusão

A educação é essencial para isso, pois os usuários não estão familiarizados com esses conceitos. Tente
criar associações com coisas familiares como, por exemplo, baixar para uso posterior
é o mesmo que salvar dados para off-line.


Nos projetos para conexões de rede instáveis, considere: 

* Pense no design para uma conexão de rede bem-sucedida, instável
  e com falha.
* Os dados podem ser caros, portanto, respeite o usuário.
* Para a maioria dos usuários globais, o ambiente técnico é quase que exclusivamente móvel.
* Dispositivos básicos são comuns, com armazenamento, memória e capacidade de 
  processamento limitados, telas pequenas e baixa qualidade de tela sensível ao toque. Garanta que o desempenho 
  faça parte do processo de design. 
* Permita que os usuários naveguem pelo aplicativo quando estão off-line.
* Informe aos usuários o estado atual e as mudanças de estado.
* Tente oferece off-line por padrão, caso o aplicativo não exija muitos dados.
* Se o aplicativo faz uso intensivo de dados, eduque os usuários sobre como é possível baixá-los para
  uso off-line.
* Torne as experiências transferíveis entre dispositivos.
* Use linguagem, ícones, imagens, tipografia e cores para exprimir ideias ao 
  usuário de forma coletiva.
* Tranquilize o usuário e forneça feedback para ajudá-lo.


{# wf_devsite_translation #}
