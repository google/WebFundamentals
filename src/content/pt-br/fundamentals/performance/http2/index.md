project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O HTTP/2 (ou h2) é um protocolo binário que traz envio push, fluxos multiplexados e controle de quadros à web.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-09-29 #}

# Introdução ao HTTP/2 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}
{% include "web/_shared/contributors/surma.html" %}

Observação: O conteúdo a seguir é um excerto de [Redes de navegador
de alto desempenho](http://shop.oreilly.com/product/0636920028048.do) (O'Reilly, Ilya
Grigorik). Para ver a versão completa e conteúdo relacionado, acesse
[hpbn.co](https://hpbn.co/){: .external }.

O HTTP/2 deixará seu aplicativo mais rápido, simples e robusto — uma combinação
rara — se você permitir que nós desfaçamos muitos das soluções paliativas do HTTP/1.1 adotadas
antes dentro dos aplicativos e resolvamos esses problemas dentro da própria camada
de transporte. Melhor ainda: ele abre um mundo novo de
possibilidades de otimização dos aplicativos e melhora do desempenho!

Os principais objetivos do HTTP/2 são a redução da latência com a multiplexação completa de solicitação e
resposta, a minimização da carga do protocolo com a compressão eficiente dos
campos do cabeçalho HTTP e a adição de suporte a priorização de solicitações e envio push de servidor.
Para implementar esses recursos, temos um outro grande elenco de apoio das
outras melhorias do protocolo, como novos mecanismos de controle de fluxo, tratamento de erros
e atualização, mas esses são os recursos fundamentais que todo desenvolvedor web
deve entender e usar nos aplicativos.

O HTTP/2 não modifica a semântica HTTP do aplicativo de nenhuma forma. Todos os
conceitos-chave, como métodos HTTP, códigos de status, URIs e campos de cabeçalho,
continuam da mesma forma. Na verdade, o HTTP/2 modifica a forma com que os dados são formatados (enquadrados) e
transportados entre o cliente e o servidor, os quais gerenciam todo
o processo, e esconde toda a complexidade dos aplicativos dentro da nova
camada de enquadramento. Assim, todos os aplicativos podem ser fornecidos sem
modificação.

*Por que não usar o HTTP/1.2?*

Para atingir os objetivos de desempenho definidos pelo Grupo de Trabalho HTTP, o HTTP/2
introduz uma nova camada de enquadramento binário que não é retrocompatível com
servidores e clientes HTTP/1.x — por isso o grande aumento na versão do protocolo
para HTTP/2.

Com isso posto, a menos que você esteja implementando um servidor web (ou um cliente personalizado) trabalhando
com soquetes TCP brutos, você não verá nenhuma diferença: todo o novo
e simples enquadramento é realizado pelo cliente e pelo servidor. As únicas
diferenças observáveis serão o melhor desempenho e a disponibilidade de novos
recursos, como a priorização de solicitações, o controle de fluxo e o envio push de servidor.

## Um resumo da história do SDPY e do HTTP/2

O SPDY era um protocolo experimental, desenvolvido pelo Google e anunciado no
meio de 2009. Seu principal objetivo era tentar reduzir a latência no carregamento das páginas web
eliminando ou atenuando algumas das limitações de desempenho bem conhecidas do HTTP/1.1.
Mais especificamente, os objetivos determinados para o projeto eram os seguinte:

* Redução de 50% do tempo de carregamento das páginas (PLT).
* Evitar a necessidade de mudança de conteúdo pelos criadores de sites.
* Minimizar a complexidade da implementação e evitar mudanças na infraestrutura de rede.
* Desenvolver este novo protocolo em parceria com a comunidade de código aberto.
* Coletar dados de desempenho reais para (in)validar o protocolo experimental.

Observação: Para atingir a meta de 50% de melhoria no PLT, o SPDY visava a fazer uso mais eficiente
da conexão TCP em questão por meio da introdução de uma nova camada de enquadramento binário para
permitir a multiplexação de solicitação e resposta, a priorização e a compressão
de cabeçalho. Acesse
[Latência como gargalo de desempenho](https://hpbn.co/primer-on-web-performance/#latency-as-a-performance-bottleneck){: .external}.

Não muito tempo depois do anúncio inicial, Mike Belshe e Roberto Peon, ambos engenheiros
de software do Google, mostraram seus primeiros resultados, documentação e
código-fonte para a implementação experimental do novo protocolo SPDY:

> Até agora, testamos o SDPY somente em simulações de laboratório. Os resultados iniciais foram
> muito animadores: quando baixamos os 25 principais sites por conexões casa
> rede simuladas, vimos uma melhoria considerável no desempenho — as páginas
> carregavam até 55% mais rápido. 
> [*(Blog do Chromium)*](https://blog.chromium.org/2009/11/2x-faster-web.html)

Pulando agora para 2012, o novo protocolo experimental era compatível com Chrome,
Firefox e Opera, e cada vez mais sites, tanto grandes (por exemplo,
Google, Twitter e Facebook) e pequenos estavam implementando o SDPY na sua
infraestrutura. Com isso, o SDPY estava a caminho de se tornar um padrão global
por causa da ampla adoção do setor.

Observando essa tendência, o Grupo de Trabalho HTTP (HTTP-WG) deu início a uma nova
iniciativa para coletar o conhecimento que se obteve com o SDPY, compilá-lo e melhorá-lo e,
por fim, oferecer um padrão "HTTP/2" oficial. Um novo protocolo foi elaborado, uma nova onda de
propostas ao HTTP/s foi feita e, depois de muita discussão com o grupo
de trabalho, a especificação SPDY foi adotada como ponto de partida para o novo protocolo
HTTP/2.

Nos anos seguintes, SPDY e HTTP/2 continuaram coevoluindo em paralelo,
com o SPDY atuando como um braço experimental usado para testar novos recursos
e propostas para o padrão HTTP/2. O que parece bom no papel pode não funcionar
na prática, e vice-versa, então o SPDY ofereceu um método para testar e avaliar cada
proposta antes de sua inclusão no padrão HTTP/2. No fim das contas, esse processo
durou três anos e gerou mais de uma dúzia de esboços intermediários:

* Março de 2012: Onda de propostas ao HTTP/2
* Novembro de 2012: Primeiro esboço do HTTP/2 (baseado no SPDY)
* Agosto de 2014: Publicados esboço 17 do HTTP/2 e esboço 12 do HPACK
* Agosto de 2014: Último processo seletivo do Grupo de Trabalho para o HTTP/2
* Fevereiro de 2015: IESG aprova esboços do HTTP/2 e do HPACK
* Maio de 2015: Publicados RFC 7540 (HTTP/2) e RFC 7541 (HPACK)

No início de 2015, o IESG revisou e aprovou o novo padrão HTTP/2 para
publicação. Pouco tempo depois, a equipe do Google Chrome anunciou a data
de suspensão da extensão SPDY e NPN para TLS:

> As principais alterações do HTTP/2 em relação ao HTTP/1.1 ocorreram na parte de desempenho. Alguns recursos
> fundamentais, como multiplexação, compressão de cabeçalho, priorização e negociação
> de protocolo evoluíram do trabalho feito em um protocolo inicialmente aberto, mas não padronizado
> chamado SPDY. O Chrome ofereceu suporte ao SPDY até o Chrome 6, mas já que
> a maioria dos benefícios estão presentes no HTTP/2, é hora de seguirmos em frente. Planejamos
> remover o suporte ao SPDY no início de 2016 e remover o suporte à extensão
> TLS chamada NPN para passarmos a usar o ALPN no Chrome ao mesmo tempo. Recomendamos que os desenvolvedores
> de servidor mudem para HTTP/2 e ALPN.
>
> Estamos felizes por contribuir com o processo de criação de padrões abertos que levaram ao
> HTTP/2 e esperamos ver uma adoção geral, dado o amplo envolvimento do setor com a
> padronização e a implementação. [*(Blog
> do Chromium)*](https://blog.chromium.org/2015/02/hello-http2-goodbye-spdy.html)

A evolução conjunta do SPDY e do HTTP/2 permitiu que desenvolvedores de servidor, navegador e site
ganhassem experiência prática com o novo protocolo à medida que ele ia se desenvolvendo.
Por isso, o padrão HTTP/2 é um dos melhores e mais testados
padrões desde a sua concepção. Quando o HTTP/2 foi aprovado pelo IESG,
havia dezenas de implementações de servidor e cliente prontas para produção e testadas em inúmeros
aspectos. Na verdade, apenas algumas semanas após a aprovação do protocolo final, muitos
usuários já estavam aproveitando seus benefícios, com diversos navegadores populares (e muitos
sites) implementando suporte integral ao HTTP/2.

## Design e objetivos técnicos

As versões anteriores do protocolo HTTP foram projetadas intencionalmente voltadas para a simplicidade
da implementação: O HTTP/0.9 era um protocolo de uma linha para inicializar a World Wide
Web; o HTTP/1.0 documentava extensões populares do HTTP/0.9 em um padrão
informacional; o HTTP/1.1 introduziu um padrão IETF oficial (leia
[Breve história do HTTP](https://hpbn.co/brief-history-of-http/){: .external}.
Sendo assim, o HTTP/0.9–1.x atingia exatamente o seu objetivo: O HTTP é um dos
protocolos de aplicativo mais adotados da Internet.

Infelizmente, a simplicidade de implementação acontece às custas do desempenho
do aplicativo: Os clientes HTTP/1.x precisam usar diversas conexões para obter
simultaneidade e reduzir a latência; o HTTP/1.x não comprime cabeçalhos de solicitação
e resposta, gerando tráfego desnecessário na rede; o HTTP/1.x não permite priorização
eficaz de recursos, gerando mau uso da conexão TCP em questão,
e assim por diante.

Essas limitações não eram fatais, mas à medida que os aplicativos web continuavam crescendo
em âmbito, complexidade e importância no cotidiano das pessoas, elas impunham um
fardo cada vez mais sobre os desenvolvedores e os usuários da web, e essa é exatamente
a falha que o HTTP/2 veio para resolver:

> O HTTP/2 possibilita uso mais eficiente dos recursos da rede e uma percepção
> reduzida da latência por meio da introdução de compressão de campos de cabeçalho e por permitir
> diversas trocas simultâneas na mesma conexão... Especificamente, ele permite
> intercalar mensagens de solicitação e resposta na mesma conexão e usa
> uma codificação eficiente para os campos do cabeçalho HTTP. Além disso, ele oferece priorização de
> solicitações, permitindo que as mais importantes sejam concluídas com mais velocidade, melhorando
> ainda mais o desempenho.
>
> O protocolo resultante lida de forma mais fácil com a rede, porque pode-se usar poucas conexões
> TCP em relação ao HTTP/1.x. Isso significa menos concorrência
> com outros fluxos e conexões ativas por mais tempo, o que, como consequência, leva à melhor
> utilização da capacidade de rede disponível. Por fim, o HTTP/2 também oferece processamento
> de mensagens mais eficiente pelo uso do enquadramento binário de mensagens.
> [*(Versão 2 do Protocolo de Transferência de Hipertexto, esboço
> 17)*](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17)


É importante ressaltar que o HTTP/2 está ampliando, não substituindo os padrões
HTTP antigos. A semântica HTTP do aplicativo é a mesma, e não houve
nenhuma mudança na funcionalidade proporcionada nem nos conceitos básicos, como métodos HTTP,
códigos de status, URIs e campos de cabeçalho. Essas alterações ficaram explicitamente fora do âmbito
da iniciativa HTTP/2. Com isso, embora a API de nível superior permaneça a mesma, é
importante entender como as alterações acessórias eliminam as limitações
de desempenho dos protocolos anteriores. Vamos dar uma olhada geral rápida na camada
de enquadramento binário e em seus recursos.

## Camada de enquadramento binário

No centro de todas as melhorias de desempenho do HTTP/2 está a nova camada
de enquadramento binário, que determina como as mensagens HTTP são encapsuladas e transferidas
entre cliente e servidor.

![Camada de enquadramento binário do HTTP/2](images/binary_framing_layer01.svg)

A "camada" se refere a uma escolha de projeto usada para introduzir um novo mecanismo
de codificação otimizado entre a interface do soquete e a HTTP API mais importante exposta aos
aplicativos: a semântica HTTP, como verbos, métodos e cabeçalhos, não
mudaram, mas a forma com que são codificadas durante o trânsito, sim.
Diferentemente do protocolo HTTP/1.x de texto simples delimitado por linha nova, toda a comunicação
do HTTP/2 é dividida em mensagens e quadros menores, e cada um deles
é codificado em formato binário.

Como resultado, o cliente e o servidor devem usar o novo mecanismo de codificação binária
para se entender: um cliente HTTP/1.x não consegue entender um servidor exclusivamente
HTTP/2, e vice-versa. Por sorte, nossos aplicativos continuam operando felizes e sem saber
de todas essas alterações, já que o cliente e o servidor realizam todo o trabalho
de enquadramento necessário para nós.

## Fluxos, mensagens e quadros

A introdução do novo mecanismo de enquadramento binário mudou a forma com que os dados são
trocados entre cliente e servidor. Para descrever esse processo, vamos
conhecer melhor a terminologia do HTTP/2:

* *Fluxo*: um fluxo bidirecional de bytes dentro de uma conexão estabelecida,
   que pode conter uma ou mais mensagens.
* *Mensagem*: uma sequência completa de quadros vinculada a uma mensagem de solicitação ou resposta lógica.
* *Quadro*: a menor unidade de comunicação do HTTP/2, com cada uma contendo um cabeçalho de quadro, que,
   minimamente, identifica o fluxo a que o quadro pertence.

A relação desses termos pode ser resumida da seguinte forma:

* Toda comunicação é realizada por uma única conexão TCP que pode quantos 
  de fluxos bidirecionais forem necessários.
* Cada fluxo tem um identificador exclusivo e informações de prioridade opcionais que são usadas para carregar
  mensagens bidirecionais.
* Cada mensagem é uma mensagem HTTP lógica, como uma solicitação ou uma resposta, composta de 
  um ou mais quadros.
* O quadro é a menor unidade de comunicação que carrega um tipo específico de dado — por exemplo,
  cabeçalhos HTTP, conteúdo da mensagem e outros. É possível intercalar quadros de diferentes fluxos
  e, em seguida, reagrupá-los usando o identificador de fluxo embutido no cabeçalho de cada quadro.

![Fluxos, mensagens e quadros do HTTP/2](images/streams_messages_frames01.svg)

Resumindo, o HTTP/2 separa a comunicação do protocolo HTTP em uma troca de
quadros de codificação binária, que, em seguida, são mapeados em mensagens que pertencem a
determinado fluxo, e tudo isso é multiplexados dentro de uma única conexão
TCP. Essa é a base que permite que todos os outros recursos e
otimizações de desempenho fornecidas pelo protocolo HTTP/2.

## Multiplexação de solicitação e resposta

Com HTTP/1.x, se o cliente quiser fazer diversas solicitações paralelas para melhorar
o desempenho, deve usar várias conexões TCP (consulte
[Como usar diversas conexões TCP](https://hpbn.co/http1x/#using-multiple-tcp-connections)
). Esse comportamento é consequência direta do modelo de fornecimento do HTTP/1.x, que
garante que somente uma resposta possa ser entregue por vez (enfileiramento de respostas) por
conexão. E ainda pior: isso gera bloqueio no início da fila e uso
ineficaz da conexão TCP em questão.

A nova camada de enquadramento binário do HTTP/2 elimina essas limitações e permite
multiplexação completa de solicitações e respostas, já que permite que cliente e servidor
dividam uma mensagem HTTP em quadros independentes, intercalem-nos e, em seguida,
reagrupem-nos na outra ponta.

![Multiplexação de solicitações e respostas HTTP/2 em uma conexão compartilhada](images/multiplexing01.svg)

A imagem mostra a captura de diversos fluxos durante o trânsito dentro da mesma conexão. O
cliente está transmitindo um quadro `DATA` (fluxo 5) ao servidor, enquanto que o servidor
está transmitindo uma sequência intercalada de quadros ao cliente para os fluxos 1
e 3. Sendo assim, há três fluxos paralelos em trânsito.

A capacidade de dividir uma mensagem HTTP em quadros independentes, intercalá-los
e, em seguida, reagrupá-los na outra ponta é simplesmente a
melhoria mais importante do HTTP/2. Na verdade, ela produz um efeito cascata de inúmeros
benefícios de desempenho por todo o grupo de tecnologias web, permitindo que
nós:

* Intercalemos diversas solicitações em paralelo sem bloquear nenhuma delas.
* Intercalemos diversas respostas em paralelo sem bloquear nenhuma delas.
* Usemos uma única conexão para entregar diversas solicitações e respostas em paralelo.
* Removamos soluções paliativas desnecessárias do HTTP/1.x (ver
  [Otimização do HTTP/1.x](https://hpbn.co/optimizing-application-delivery/#optimizing-for-http1x),
  como arquivos concatenados, image sprites e fragmentação de domínio.
* Forneçamos tempos de carregamento de página mais curtos por meio da eliminação de latência desnecessária e melhoria
  da utilização da capacidade de rede disponível.
* *E muito mais...*

A nova camada de enquadramento binário do HTTP/2 resolve o problema do bloqueio
no início da fila e elimina a necessidade de diversas conexões
para possibilitar processamento paralelo e envio de solicitações e respostas. Como resultado,
nossos aplicativos ficam mais rápidos, mais simples e mais baratos de implementar.

## Priorização de fluxo

Quando uma mensagem HTTP pode ser dividida em diversos quadros e permitimos que
quadros de vários fluxos sejam multiplexados, a ordem de intercalação
e envio dos quadros tanto pelo cliente quanto pelo servidor se torna um
fator crítico do desempenho. Para facilitar, o padrão HTTP/2 permite que
cada fluxo tenha um peso e uma dependência associados:

* Cada fluxo pode ter um peso em número inteiro que varia de 1 a 256.
* Cada fluxo pode ter uma dependência explícita em outro fluxo.

A combinação de dependências e pesos do fluxo permite que o cliente
crie e informe uma "árvore de priorização" que expressa como ele prefere
receber respostas. Em contrapartida, o servidor pode usar essa informação para
priorizar o processamento de fluxos controlando a alocação de CPU, de memória e
outros recursos e, quando os dados de resposta estiverem disponíveis, alocar
largura de banda para garantir a entrega ideal das respostas de alta prioridade ao cliente.

![Dependências e pesos de fluxo do HTTP/2](images/stream_prioritization01.svg)

Para declarar a dependência de fluxo dentro do HTTP/2, é necessário referenciar o identificador
exclusivo de outro fluxo como seu primário: se o identificador for omitido, o
fluxo será considerado como dependente do "fluxo raiz". Declarar uma dependência
de fluxo indica que, se possível, o fluxo primário deve receber a alocação de
recursos antes de seus dependentes. Em outras palavras, "Por favor, processe e envie a
resposta D antes da C".

Os fluxos que têm o mesmo primário (ou seja, fluxos irmãos) devem receber alocação
de recursos proporcional ao seu peso. Por exemplo, se o fluxo A tem peso
de 12 e seu único irmão, B, tem fluxo de 4, para se determinar a proporção
dos recursos que cada um dos fluxos deve receber:

1. Some todos os pesos: `4 + 12 = 16`
2. Divida o peso de cada fluxo pelo peso total: `A = 12/16, B = 4/16`

Sendo assim, o fluxo A deve receber 3/4 e o fluxo B, 1/4
dos recursos disponíveis. O fluxo B deve receber 1/3 dos
recursos alocados ao fluxo A. Veja mais alguns exemplos
práticos na imagem acima. Da esquerda para a direita:

1. Nem o fluxo A nem B especificam uma dependência primária e são considerados dependentes
   do "fluxo raiz’ implícito. A tem peso de 12 e B, 4. 
    Portanto, com base na proporção de pesos: o fluxo B deve receber 1/3 dos 
   recursos alocados ao fluxo A.
2. O fluxo D é dependente do fluxo raiz e C é dependente de D. Portanto, D deve
  receber a alocação de todos os recursos antes de C. Os pesos não têm importância,
   porque a dependência de C informa uma preferência maior.
3. O fluxo D deve receber a alocação de todos os recursos antes de C, C deve receber
   a alocação de todos os recursos antes de A e B, o fluxo B deve receber 1/3 dos 
   recursos alocados ao fluxo A.
4. O fluxo D deve receber a alocação de todos os recursos antes de E e C. E e C, por sua vez,
   devem receber alocação igual antes de A e B e, por fim, A e B devem receber alocação 
   proporcional com base no peso.

Como o exemplo acima ilustra, a combinação de dependências e
pesos do fluxo dá uma linguagem expressiva à priorização de recursos, que é um
recurso fundamental para melhorar o desempenho de navegação, onde temos inúmeros tipos
de recurso com diferentes dependências e pesos. Melhor ainda: o protocolo HTTP/2
também permite que o cliente atualize essas preferências a qualquer momento, o que permite
otimizar ainda mais o navegador. Isso quer dizer que podemos mudar dependências
e redistribuir pesos em resposta à interação do usuário e outros indicadores.

Observação: dependências e pesos de fluxo expressam uma preferência de transporte, não um
requisito e, por isso, não garantem processamento específico nem
ordem de transmissão dos dados. Ou seja, o cliente não pode forçar o servidor a processar o
fluxo em determinada ordem usando a priorização de fluxos. Embora isso possa parecer
o contrário do que se espera, esse é realmente o comportamento desejado. Não queremos impedir
o servidor de progredir em um recurso de baixa prioridade se um recurso
de alta prioridade estiver bloqueado.

## Uma conexão por origem

Com o novo mecanismo de enquadramento binário, o HTTP/2 não precisa mais de
diversas conexões TCP para multiplexar fluxos em paralelo. Cada fluxo é dividido em vários
quadros, que podem ser intercalados e priorizados. Isso faz com que todas as conexões
HTTP/2 sejam persistentes e somente se exija uma conexão por origem,
o que oferece inúmeros benefícios de desempenho.

> Tanto para o SPDY quanto para o HTTP/2, o recurso do eliminador é multiplexação arbitrária em um
> único canal de congestionamento bem controlado. É impressionante a importância disso
> e quão bem funciona. Uma ótima métrica desse recurso que gosto de usar é a
> fração de conexões criadas que carregam apenas uma única operação HTTP (e,
> portanto, fazendo com que essa operação carregue toda a sobrecarga). Para HTTP/1, 74% das nossas
> conexões ativas carregam apenas uma única operação — conexões persistentes não
> são tão úteis quando todos nós gostaríamos que fossem. Mas, no HTTP/2, esse número despenca para 25%.
> Essa é uma grande vitória para a redução de sobrecarga. [*(HTTP/2 já funciona no Firefox, Patrick
> McManus)*](http://bitsup.blogspot.co.uk/2015/02/http2-is-live-in-firefox.html)

A maioria das transferências HTTP são curtas e súbitas, enquanto que o TCP é otimizado para transferências
de dados em lote e de longa duração. Ao reutilizar a conexão, o HTTP/2 pode
fazer uso mais eficiente de cada conexão TCP, além de reduzir
significativamente a sobrecarga geral do protocolo. Além disso, o uso de menos conexões
reduz a área de ocupação da memória e de processamento ao longo de todo o caminho da conexão
(ou seja, cliente, intermediários e servidores de origem). Isso reduz o custo
operacional geral e aumenta a utilização e a capacidade da rede. Com isso,
a mudança para HTTP/2 não deve apenas reduzir latência de rede, mas também ajudar a
aumentar a produtividade e diminuir os custos operacionais.

Observação: Um número baixo de conexões é um recurso especialmente importante para
melhorar o desempenho de implementações HTTP: gera menos
handshakes TLS pesados, melhor reutilização de sessão e uma redução geral nos recursos
exigidos do cliente e do servidor.

## Controle de fluxo

O controle de fluxo é um mecanismo para impedir que o remetente sobrecarregue o destinatário
com dados que ele pode não querer ou ser incapaz de processar: o destinatário pode estar ocupado, lidando com
carga pesada ou simplesmente disposto a alocar uma quantidade fixa de recursos para
determinado fluxo. Por exemplo, o cliente pode ter solicitado um grande fluxo
de vídeo com alta prioridade, mas o usuário pausou o vídeo e o cliente agora
quer pausar ou desacelerar o envio do servidor para evitar obter e
carregar dados desnecessários. Ou ainda, um servidor proxy pode ter
conexões com fluxo rápido para o cliente e lento para o servidor e queira regular a
velocidade com que o fluxo para o cliente fornece dados para equiparar à velocidade do fluxo para o servidor e controlar
seu uso de recursos.

Os requisitos acima fazem você lembrar do controle de fluxo do TCP? Se não, deveriam, já que o
problema é exatamente o mesmo (leia 
[Controle de fluxo](https://hpbn.co/building-blocks-of-tcp/#flow-control)). No entanto,
como os fluxos do HTTP/2 são multiplexados em uma única conexão TCP, o controle
de fluxo TCP não é granular o suficiente e não fornece as APIs
voltadas para o aplicativo necessárias para regular o fornecimento de fluxos individuais. Para
resolver isso, o HTTP/2 fornece um conjunto de blocos de compilação simples que permitem que o
cliente e o servidor implementem o próprio controle de fluxo da conexão ou do
fluxo:

* O controle de fluxo é direcional. Cada destinatário pode escolher definir o tamanho que quiser para 
  a janela de cada fluxo e configurar toda a conexão.
* O controle de fluxo é baseado em crédito. Cada destinatário anuncia sua conexão inicial
  e a janela de controle do fluxo (em bytes), que é reduzida sempre que 
  o remetente emite um quadro `DATA` e aumentada por um quadro `WINDOW_UPDATE` enviado 
  pelo destinatário.
* O controle de fluxo não pode ser desativado. Quando se estabelece a conexão HTTP/2, o 
  cliente e o servidor trocam quadros `SETTINGS`, que definem o tamanho da janela 
  de controle de fluxo para as duas direções. O valor padrão da janela de controle de fluxo é definido 
  como 65.535 bytes, mas o destinatário pode definir um tamanho maior máximo para a janela 
  (`2^31-1` bytes) e mantê-lo enviando o quadro `WINDOW_UPDATE` sempre que receber 
  algum dado.
* O controle de fluxo funciona de salto em salto, não de ponta a ponta. Ou seja, um intermediário pode usá-lo 
  para controlar o uso de recursos e implementar mecanismos de alocação de recursos com base nos 
  próprios critérios e heurística.

O HTTP/2 não especifica nenhum algoritmo em especial para implementar o controle de fluxo.
Em vez disso, ele fornece os blocos de compilação simples e adia a passa o trabalho da implementação
para o cliente e o servidor, que podem usá-lo para implementar estratégias personalizadas de
regulação do uso e da alocação de recursos, além de implementar novas possibilidades
de envio que podem ajudar a melhorar tanto o desempenho real quanto o percebido (consulte
[Velocidade, desempenho e percepção humana](https://hpbn.co/primer-on-web-performance/#speed-performance-and-human-perception))
dos nossos aplicativos web.

Por exemplo, o controle de fluxo do nível do aplicativo permite que o navegador busque somente uma
parte de determinado recurso, coloque a busca em espera reduzindo a janela de controle
do fluxo a zero e retomando-a depois. Em outras palavras, ele permite
que o navegador busque uma prévia ou uma primeira verificação de uma imagem e exiba-a, além de
permitir que outras buscas de alta prioridade continuem e retomar a busca quando os recursos
mais importantes terminarem de carregar.

## Envio push do servidor

Outro novo recurso muito poderoso do HTTP/2 é a capacidade do servidor de enviar
diversas respostas a uma única solicitação do cliente. Ou seja, além da
resposta à solicitação original, o servidor pode enviar outros recursos ao
cliente (Figura 12-5) sem o cliente precisar solicitá-los
explícita e individualmente.

![Servidor inicia novos fluxos (promessas) para envio push de recursos
](images/push01.svg)

Observação: O HTTP/2 rompe com a semântica rígida de solicitação e resposta e oferece
fluxos de trabalho de envio push "de um para muitos" iniciados pelo servidor que abre um mundo de novas
possibilidades de interação dentro e fora do navegador. Esse é um
recurso capacitante que terá importantes consequências no longo prazo para como
vemos o protocolo e onde e como ele é usado.

Por que precisaríamos desse mecanismo em um navegador? Um aplicativo web normal
é composto de dezenas de recursos, e todos eles são descobertos pelo cliente,
que avalia o documento fornecido pelo servidor. Considerando isso, por que não eliminar
a latência adicional e deixar o servidor enviar os recursos associados com
antecedência? O servidor já sabe que recursos o cliente pedirá: esse é o
envio push do servidor.

Na verdade, se você já embutiu CSS, JavaScript ou algum outro ativo por meio de um
URI de dados (leia [Como embutir recursos](https://hpbn.co/http1x/#resource-inlining)),
já teve uma experiência prática com o envio push do servidor. Ao embutir manualmente
o recurso no documento, estamos, na prática, enviando esse recurso ao
cliente sem esperar o cliente solicitá-lo. Com o HTTP/2, podemos obter
os mesmos resultados, mas com mais benefícios de desempenho. Os recursos enviados por push podem ser:

* Armazenados em cache pelo cliente
* Reutilizados em diferentes páginas
* Multiplexados junto com outros recursos
* Priorizados pelo servidor
* Recusados pelo cliente

### INTRODUÇÃO AO `PUSH_PROMISE`

Todo fluxo de push do servidor é iniciado por quadros `PUSH_PROMISE`, que sinalizam a
intenção do servidor de enviar os recursos descritos por push ao cliente e a necessidade
de enviá-los antes dos dados da resposta que solicita os recursos enviados. Essa
ordem de envio é fundamental: o cliente precisa saber que recursos o servidor
pretende enviar por push para evitar criar solicitações duplicadas para
eles. A estratégia mais simples para satisfazer essa exigência é enviar todos
os quadros `PUSH_PROMISE`, que contêm somente os cabeçalhos HTTP dos recursos
prometidos, antes da resposta do primário (ou seja, quadros `DATA`).

Quando o cliente receber um quadro `PUSH_PROMISE`, poderá recusar o
fluxo (pelo quadro `RST_STREAM`), se quiser (isso pode ocorrer, por exemplo,
porque o recurso já está armazenado em cache). Essa é uma evolução importante em relação ao
HTTP/1.x. Por outro lado, o uso da incorporação de recursos, que é uma "otimização"
popular do HTTP/1.x, é equivalente a um "push forçado": o cliente não pode
recusar, cancelar nem processar o recurso embutido individualmente.

Com o HTTP/2, o cliente detém todo o controle sobre como o envio push do servidor é usado. O
cliente pode limitar o número de fluxos enviados por push simultaneamente, ajustar a janela
de controle de fluxo inicial para controlar a quantidade de dados que é enviada por push quando o fluxo é aberto
pela primeira vez ou desativar totalmente o envio push do servidor. Essas preferências são comunicadas pelos
quadros `SETTINGS` no início da conexão HTTP/2 e podem ser atualizadas
a qualquer momento.

Cada recurso enviado por push é um fluxo que, ao contrário de um recurso embutido, permite
multiplexação, priorização e processamento individual por parte do cliente. A única
restrição de segurança, conforme exigido pelo navegador, é que os recursos enviados por push devem
obedecer à política de mesma origem: o servidor deve ter autoritário com o conteúdo
fornecido.

## Compressão de cabeçalho

Toda transferência HTTP carrega um conjunto de cabeçalhos que descrevem o recurso
transferido e suas propriedades. No HTTP/1.x, esses metadados sempre são enviados como texto
simples e agregam algo em torno de 500 a 800 bytes de carga por transferência —
às vezes kilobytes a mais se cookies HTTP forem usados (acesse 
[Medição e controle de sobrecarga de protocolo](https://hpbn.co/http1x/#measuring-and-controlling-protocol-overhead)
). Para reduzir essa carga e melhorar o desempenho, O HTTP/2 comprime os metadados
de cabeçalho da solicitação e da resposta usando o formato de compressão HPACK, que trabalha com
duas técnicas simples, mas poderosas:

1. Permite que os campos do cabeçalho transmitido sejam codificados por um código Huffman 
   estático, que reduz o tamanho de cada transferência.
2. Exige que o cliente e o servidor mantenham e atualizem uma lista 
   indexada e campos de cabeçalho vistos anteriormente (ou seja, estabelece um contexto
   de compressão compartilhado), que, em seguida, é usado como referência para codificar com eficiência
   os valores transmitidos anteriormente.

A codificação Huffman permite que os valores individuais sejam comprimidos quando transferidos,
e a lista indexada de valores transferidos anteriormente possibilita codificar
valores duplicados por meio da transferências dos valores do índice, que podem ser usados para realizar buscar eficientes e
reconstruir as chaves e os valores de todo o cabeçalho.

![HPACK: compressão de cabeçalho para HTTP/2](images/header_compression01.svg)

Como uma otimização adicional, o contexto de compressão HPACK consiste em uma
tabela dinâmica e outra estática: a estática é definida na especificação e
fornece uma lista de campos de cabeçalho HTTP comuns que todas as conexões provavelmente devem
usar (por exemplo, nomes de cabeçalho válidos). Já a dinâmica fica inicialmente vazia e é
atualizada de acordo com os valores alterados dentro de uma conexão. Com isso,
o tamanho de cada solicitação é reduzido com o uso de codificação Huffman estática para valores
que ainda não foram vistos e com a substituição de índices por valores já
presentes nas tabelas estática e dinâmica de cada lado.

Observação: As definições dos campos de cabeçalho da solicitação e da resposta no HTTP/2 continuam
as mesmas, com algumas pequenas exceções: os nomes de campo de cabeçalho só contêm letras minúsculas
e a linha da solicitação agora é dividida nos campos individuais `:method`, `:scheme`, `:authority`
e `:path`, que não são genuinamente do cabeçalho.

### Segurança e desempenho do HPACK

Versões anteriores do HTTP/2 e do SPDY usavam zlib, com um dicionário exclusivo, para
comprimir todos os cabeçalhos HTTP. Isso gerava uma redução de 85% a 88% do tamanho
dos dados de cabeçalho transferidos, além de uma melhoria significativa na latência
do tempo de carregamento das páginas:

> Na conexão DSL de baixa largura de banda, em que a conexão de upload só tem 375 Kbps,
> a compressão de cabeçalho de solicitações, em especial, levava a melhorias consideráveis no
> tempo de carregamento das páginas de determinados sites (em outras palavras, aqueles que emitiam muitas
> solicitações de recurso). Identificamos uma redução de 45 a 1.142 ms no tempo de carregamento das páginas
> simplesmente por conta da compressão do cabeçalho. [*(Artigo do SPDY,
> chromium.org)*](https://www.chromium.org/spdy/spdy-whitepaper)

No entanto, no verão de 2012, houve ataque de segurança "CRIMINOSO" contra os
algoritmos de compressão do TLS e do SPDY que poderia gerar sequestro da sessão. Depois
disso, o algoritmo de compressão zlib foi substituído pelo HPACK, que foi
projetado especificamente para: resolver os problemas de segurança identificados, ser eficiente
e simples de implementar da forma correta e, é claro, oferecer boa compressão dos
metadados de cabeçalho HTTP.

Para saber todos os detalhes sobre o algoritmo de compressão do HPACK, acesse
<https://tools.ietf.org/html/draft-ietf-httpbis-header-compression>.

## Leituras adicionais:

* ["HTTP/2"](https://hpbn.co/http2/){: .external } 
    – O artigo completo de Ilya Grigorik
* ["Como configurar o HTTP/2"](https://surma.link/things/h2setup/){: .external } 
    – Como configurar o HTTP/2 em diferentes back-ends, de Surma
* ["HTTP/2 chegou, vamos otimizar!"](https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/edit#slide=id.p19) 
    – Apresentação de Ilya Grigorik na Velocity 2015
* ["Regras gerais para envio push do HTTP/2"](https://docs.google.com/document/d/1K0NykTXBbbbTlv60t5MyJvXjqKGsCVNYHyLEXIxYMv0/edit) 
    – Uma análise de Tom Bergan, Simon Pelchat e Michael Buettner sobre quando e como usar o envio push.


{# wf_devsite_translation #}
