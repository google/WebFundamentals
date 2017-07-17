project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: A Política de segurança de conteúdo pode reduzir bastante o risco e o impacto de ataques de XSS em navegadores modernos.

{# wf_published_on: 2012-06-15 #}
{# wf_updated_on: 2017-07-17 #}

# Política de segurança de conteúdo {: .page-title }

{% include "web/_shared/contributors/mikewest.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}

O modelo de segurança da web se baseia na
[_política de mesma origem_](//en.wikipedia.org/wiki/Same-origin_policy){: .external}. O código
de `https://mybank.com` só deve ter acesso aos dados de `https://mybank.com`,
e `https://evil.example.com` certamente nunca deve ter acesso permitido.
Cada origem é isolada do resto da web, dando aos desenvolvedores uma
área segura em que podem criar e experimentar. Na teoria, isso é simplesmente brilhante. Na
prática, os invasores encontraram maneiras inteligentes de burlar o sistema.

Os ataques de [cross-site scripting (XSS)](//en.wikipedia.org/wiki/Cross-site_scripting){: .external},
por exemplo, fogem da mesma política de origem fazendo um site
enviar código malicioso junto com o conteúdo pretendido. Esse é um grande
problema, pois os navegadores confiam que todo o código mostrado em uma página é uma
parte legítima da origem de segurança da página. O
[guia de consulta rápida de XSS](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet){: .external} é um detalhamento antigo, mas representativo, dos métodos que podem ser usados por um invasor para violar essa confiança por meio da injeção de código malicioso. Se um invasor injetar _qualquer_ código
, é praticamente o fim: os dados da sessão do usuário serão comprometidos e
informações que deferiam ser confidenciais são obtidas pelos bandidos. É óbvio
que gostaríamos de evitar isso, se possível.

Este resumo destaca uma defesa que pode reduzir consideravelmente o risco e o
impacto dos ataques de XSS em navegadores modernos: a política de segurança de conteúdo (CSP).

### TL;DR {: .hide-from-toc }
* Use listas de permissão para informar o cliente do que é permitido e do que não é.
* Conheça as diretivas disponíveis.
* Conheça as palavras-chave que usam.
* Código embutido e `eval()` são considerados perigosos.
* Relate violações da política ao servidor antes de tomar alguma providência sobre elas.


## Lista de permissões de origem 


O problema explorado por ataques de XSS é a incapacidade do navegador de distinguir
script que compõe o aplicativo de script
injetado de forma maliciosa por um terceiro. Por exemplo, o botão +1 do Google no
fim desta página carrega e executa código de
`https://apis.google.com/js/plusone.js` considerando a origem da página. Confiamos
nesse código, mas não podemos esperar que o navegador descubra por conta própria que
códigos de `apis.google.com` são legais, enquanto que códigos de `apis.evil.example.com`
não devem ser. O navegador baixa e executa superalegre todo código que a página
solicita, sem considerar a fonte.

Em vez de confiar cegamente em _tudo_ que um servidor fornece, a CSP usa o
cabeçalho HTTP `Content-Security-Policy` para permitir que você crie uma lista de
fontes de conteúdo confiável permitidas e instrui o navegador a executar ou renderizar
recursos somente dessas fontes. Mesmo que um invasor consiga encontrar uma brecha para
injetar script, o script não passará da lista de permissões e, por isso, não
será executado.

Já que confiamos em `apis.google.com` e em nós
mesmos para fornecer código válido, vamos definir uma política que só permite a execução de script
quando ele vier de uma dessas duas fontes:

    Content-Security-Policy: script-src 'self' https://apis.google.com

Simples, não é? Como você já deve ter imaginado, `script-src` é uma diretiva que
controla um conjunto de privilégios relacionados a script de uma página específica. Especificamos
`'self'` como uma fonte válida de script e `https://apis.google.com` como
outra. Obedientemente, o navegador baixa e executa JavaScript de
`apis.google.com` e da origem da página atual por HTTPS.

<div class="attempt-right">
  <figure>
    <img src="images/csp-error.png" alt="Erro no console: Carregamento do script "http://evil.example.com/evil.js" negado por violar a seguinte diretiva da Política de segurança de conteúdo: script-src 'self' https://apis.google.com">
  </figure>
</div>

Com essa política definida, o navegador simplesmente exibe um erro, em vez de
carregar script de outra fonte. Quando um invasor inteligente consegue
injetar código no seu site, ele se depara precipitadamente com uma mensagem de erro, em vez
de conseguir fazer o que pretende.

### Política aplicável a diversos recursos

Enquanto que os recursos de script representam os riscos de segurança mais óbvios, o CSP oferece um amplo
conjunto de diretivas de política que proporcionam controle bem avançado dos recursos
que uma página pode carregar. Como você já viu `script-src`, o conceito
deve estar claro. Vamos dar uma breve pincelada sobre as outras diretivas de recurso:

* **`base-uri`** restringe os URLs que podem aparecer no elemento `<base>` de uma página.
* **`child-src`** lista os URLs para workers e conteúdos de quadro incorporados. Por
  exemplo: `child-src https://youtube.com` permitiria vídeos incorporados do
  YouTube, mas não de outras origens. Substitua a diretiva
  **`frame-src`**, que teve uso suspenso, por esse método.
* **`connect-src`** limita as origens a que você pode se conectar (via XHR,
  WebSockets e EventSource).
* **`font-src`** especifica as origens que podem oferecer fontes da web. As fontes web
do Google podem ser ativadas via `font-src https://themes.googleusercontent.com`.
* **`form-action`** lista pontos de extremidade válidos para envio pelas tags `<form>`.
* **`frame-ancestors`** especifica as fontes que podem incorporar a página atual.
Essa diretiva aplica-se às tags `<frame>`, `<iframe>`, `<embed>` e `<applet>`.
Ela ainda se aplica somente a recursos que não são de HTML e não pode ser usada em
tags `<meta>`.
* **`frame-src`** suspenso. Use **`child-src`** no lugar dele.
* **`img-src`** define as origens de onde as imagens podem ser carregadas.
* **`media-src`** restringe as origens que têm permissão para fornecer vídeo e áudio.
* **`object-src`** permite controlar Flash e outros plug-ins.
* **`plugin-types`** limita os tipos de plug-in que uma página pode invocar.
* **`report-uri`** especifica um URL pelo qual um navegador enviará relatórios quando uma
política de segurança de conteúdo for violada. Essa diretiva não pode ser usada em
tags `<meta>`.
* **`style-src`** é a cópia de `script-src` das folhas de estilo.
* **`upgrade-insecure-requests`** instrui os agentes do usuário a regravar esquemas de URL
alterando HTTP para HTTPS. Essa diretivas é para sites com muitas
URLs    antigas que precisam ser regravadas.

Por padrão, as diretivas são abertas. Se você não definir uma política específica como uma
diretiva, digamos, `font-src`, essa diretiva se comportará da forma padrão
como se você tivesse especificado `*` como a fonte válida (por exemplo, você pode carregar fontes de
qualquer local, sem restrições).

É possível anular esse comportamento padrão especificando uma diretiva
**`default-src`**. Essa diretiva define os padrões para a maioria
das diretivas que não forem especificadas. Em geral, isso se aplica a qualquer diretiva que
acabe com `-src`. Se `default-src` estiver definido como `https://example.com` e você não
especificar uma diretiva `font-src`, só será possível carregar fontes de
`https://example.com`. Especificamos somente `script-src` nos
exemplos anteriores, o que significa que é possível carregar imagens, fontes e outros
de qualquer origem.

As diretivas a seguir não usam `default-src` como um fallback. Lembre-se de que
não defini-las é o mesmo que permitir tudo.

* `base-uri`
* `form-action`
* `frame-ancestors`
* `plugin-types`
* `report-uri`
* `sandbox`

Você pode usar quantas diretivas quiser, de acordo com o apropriado
para o seu aplicativo: basta listar cada uma no cabeçalho HTTP, separando-as
por sinal de ponto e vírgula. Não deixe de listar _todos_
os recursos exigidos de tipo específico em uma _única_ diretiva. Se você gravou
algo como `script-src https://host1.com; script-src https://host2.com`, a
segunda diretiva seria simplesmente ignorada. O exposto a seguir
especificaria corretamente as duas origens como válidas:

    script-src https://host1.com https://host2.com

Se, por exemplo, você tiver um aplicativo que carrega todos os recursos a partir de uma
rede de fornecimento de conteúdo (digamos, `https://cdn.example.net`), e você sabe que
não precisa de conteúdo em quadros nem plug-ins, sua política deve ficar mais ou menos
da seguinte forma:

    Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'

### Detalhes da implementação

Você verá os cabeçalhos `X-WebKit-CSP` e `X-Content-Security-Policy` em diversos
tutoriais na web. Indo além, você deve ignorar esses cabeçalhos
prefixados. Navegadores modernos (com exceção do IE) oferecem suporte ao cabeçalho
`Content-Security-Policy` não prefixado. Esse é o cabeçalho que você deve usar.

Independentemente do cabeçalho que escolher, a política é definida para cada página:
você precisa enviar o cabeçalho HTTP junto com todas as respostas de que gostaria
para garantir a proteção. Isso dá muita flexibilidade, já que você pode
adaptar a política a páginas específicas de acordo com a necessidade. Talvez um conjunto de
páginas do site tenha um botão +1, enquanto outras, não: você pode permitir que
o código do botão seja carregado somente quando necessário.

A lista de fontes de cada diretiva é flexível. Você pode especificar fontes por
esquema (`data:`, `https:`) ou de acordo com a especificidade, desde apenas por nome de host
(`example.com`, que corresponde a qualquer origem desse host: qualquer esquema, qualquer porta) a um
URI totalmente qualificado (`https://example.com:443`, que corresponde a somente HTTPS, somente
`example.com` e somente a porta 443). Caracteres especiais são aceitos, mas somente como um esquema,
uma porta, ou à extrema esquerda do nome do host: `*://*.example.com:*` corresponderia
a todos os subdomínios de `example.com` (mas _não_ ao próprio `example.com`), usando
qualquer esquema em qualquer porta.

A lista de fontes também aceita quatro palavras-chave:

* **`'none'`**, como é de se esperar, não corresponde a nada.
* **`'self'`** corresponde à origem atual, mas não a seus subdomínios.
* **`'unsafe-inline'`** permite JavaScript e CSS embutidos (falaremos sobre isso
  em mais detalhes mais adiante).
* **`'unsafe-eval'`** permite mecanismos de texto para JavaScript, como o `eval`. (esse também será
  assunto mais para a frente).

Essas palavras-chave exigem aspas simples. Por exemplo, `script-src 'self'` (com aspas)
autoriza a execução de JavaScript no host atual, `script-src self`
(sem aspas) permite executar JavaScript de um servidor chamado "`self`" (e _não_ do
host atual), o que provavelmente não é o que você quer.

### Definição de área restrita

Há mais uma diretiva de que vale a pena falar: `sandbox`. Ela é um pouco
diferente das outras que vimos, já que coloca restrições em ações que
a página pode executar, em vez de em recursos que a página pode carregar. Se a
diretiva `sandbox` estiver presente, a página será tratada como se tivesse sido carregada
dentro de um `<iframe>` com um atributo `sandbox`. Isso pode gerar um monte de
efeitos na página: forçar a página em uma origem única, impedir
envio de formulários e outros. Está um pouco além do âmbito desse artigo, mas você
pode encontrar todos os detalhes sobre os atributos de definição de área restrita válidos na
[seção "Sandboxing" das especificações HTML5"](https://developers.whatwg.org/origin-0.html#sandboxing){: .external}.{: .external}.

### A tag "meta"

O mecanismo de fornecimento de CSPs preferido é um cabeçalho HTTP. Mas pode ser útil
definir uma política em uma página diretamente na marcação. Faça isso usando uma tag `<meta>` com
um atributo `http-equiv`:


    <meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">


Não é possível usar isso para "frame-ancestors", "report-uri" nem "sandbox".

## Código embutido é considerado perigoso

Deve ficar claro que a CSP é baseada em origens que constam em uma lista de permissão, já que essa é uma
forma direta, sem ambiguidade, de instruir o navegador a tratar conjuntos específicos de
recursos como aceitáveis e rejeitar o resto. Contudo, listas de permissão baseadas em origem não
resolvem a maior ameaça que os ataques de XSS representam: injeção de script embutido.
Se um invasor pode injetar uma tag "script" que contenha carga útil maliciosa
diretamente (`<script>sendMyDataToEvilDotCom();</script>`),
o navegador não tem mecanismos para distingui-la de uma tag
"script" embutida legítima. A CSP resolve esse problema banindo totalmente o script embutido:
é a única forma de garantir.


Esse banimento inclui não apenas scripts embutidos diretamente nas tags `script`, mas também
gerenciadores de eventos e URLs `javascript:` embutidos. Você precisará mover o conteúdo das tags
`script` para um arquivo externo e substituir os URLs `javascript:` e `<a ...
onclick="[JAVASCRIPT]">` por chamadas de `addEventListener()` apropriadas. Por exemplo,
você pode trocar isto:


    <script>
      function doAmazingThings() {
        alert('YOU AM AMAZING!');
      }
    </script>
    <button onclick='doAmazingThings();'>Am I amazing?</button>


Por isto:

    <!-- amazing.html -->
    <script src='amazing.js'></script>
    <button id='amazing'>Am I amazing?</button>

<div style="clear:both;"></div>


    // amazing.js
    function doAmazingThings() {
      alert('YOU AM AMAZING!');
    }
    document.addEventListener('DOMContentReady', function () {
      document.getElementById('amazing')
        .addEventListener('click', doAmazingThings);
    });


O código regravado tem diversas vantagens além de funcionar bem com
CSPs: é a melhor prática, use CSPs ou não. JavaScript
embutido combina estrutura e comportamento exatamente da forma que não deveria.
Recursos externos são mais fáceis de armazenar em cache pelos navegadores, mais entendíveis para
os desenvolvedores e propícios para compilação e minificação. Você escreverá código
melhor se der ao trabalho de mover o código para recursos externos.

O estilo embutido é tratado da mesma forma: o atributo `style` e as tags `style`
devem ser consolidados em folhas de estilo externas para aplicar proteção contra
diversos métodos [muito inteligentes](http://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html){: .external}
de extração de dados que o CSS permite.

Se você precisa ter script e estilo embutidos, pode ativá-los
adicionando `'unsafe-inline'` como uma fonte permitida em uma diretiva `script-src` ou `style-
src`. Você ainda pode usar um nonce ou hash (veja abaixo), mas isso não é o mais indicado. Banir script embutido é a melhor medida de segurança da CSP, e,
da mesma forma, banir estilo embutido aumenta a segurança do aplicativo. É preciso um pouco de esforço
no início para garantir que as coisas funcionem da forma correta após mover todo o código
para fora da linha, mas essa é uma medida que vale muito a pena tomar.

### Se for imprescindível para você usar...

A CSP de nível 2 oferece retrocompatibilidade com scripts embutidos ao permitir que você
coloque scripts embutidos específicos na lista de permissões usando um nonce (número
usado uma vez) ou um hash criptográfico. Embora possa ser pesado, é útil
como alternativa.

Para usar um nonce, dê à tag script um atributo "nonce". Seu valor deve ser igual a
um dos da lista de fontes confiáveis. Por exemplo:


    <script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
      //Some inline code I cant remove yet, but need to asap.
    </script>


Agora adicione o nonce à diretiva `script-src` ligado à palavra `nonce-`.

    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

Lembre-se de que é necessário gerar um nonce para cada solicitação da página, e eles não podem
ser adivinháveis.

Os hashes funcionam mais ou menos da mesma forma. Em vez de adicionar código à tag "script",
crie um hash SHA do próprio script e adicione-o à diretiva `script-src`.
Por exemplo, digamos que a sua página continha isto:


    <script>alert('Hello, world.');</script>


Sua política conteria isto:

    Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

Há algumas coisas que devem ser observadas aqui. O prefixo `sha*-` especifica o algoritmo
que gera o hash. No exemplo acima, usamos "sha256-". A CSP também
oferece suporte a "sha384-" e "sha512-". Ao gerar o hash, não inclua a
tag `<script>`. Além disso, letras maiúsculas e minúsculas e espaços fazem diferença, incluindo espaços no início e
no fim.

Uma busca no Google sobre geração de hashes SHA levará você a soluções em
diversas linguagens. Usando o Chrome 40 ou posterior, você pode abrir o DevTools e
recarregar a página. A guia "Console" terá mensagens de erro com o hash
sha256 correto para cada um dos scripts embutidos.

## Eval também

Mesmo quando um invasor não consegue injetar script diretamente, ele pode conseguir fazer
o aplicativo converter outro texto fixo em JavaScript executável
e executá-lo por conta própria.  `eval()`, `new
Function()`, `setTimeout([string], ...)`, e
`setInterval([string]...)` são vetores pelos quais o texto
injetado pode acabar executando algo malicioso inesperadamente. A resposta padrão
da CSP a esse risco é o bloqueio total desses vetores.


Isso gera alguns impactos na forma com que você desenvolve aplicativos:

*   Você deve analisar o JSON com o `JSON.parse` integrado em vez de depender de
    `eval`. Há operações JSON nativas
    totalmente seguras em
    [todos os navegadores desde o IE8](http://caniuse.com/#feat=json){: .external}.
*   Reescreva chamadas de `setTimeout` ou `setInterval` que você está fazendo no momento
   com funções embutidas em vez de strings. Por exemplo:

<div style="clear:both;"></div>

    setTimeout("document.querySelector('a').style.display = 'none';", 10);


funcionaria melhor se fosse:


    setTimeout(function () {
      document.querySelector('a').style.display = 'none';
    }, 10);


*   Evite geração de modelos embutida em tempo de execução: Muitas bibliotecas de modelo usam `new
    Function()` amplamente para acelerar a geração de modelo em tempo de execução. É uma
    aplicação inteligente de programação dinâmica, mas traz consigo o risco de
    avaliar texto malicioso. Alguns frameworks oferecem suporte a CSP de forma inovadora:
    usando fallback para um analisador robusto na ausência de `eval`.
    A [diretiva ng-csp do AngularJS](https://docs.angularjs.org/api/ng/directive/ngCsp){: .external} é um bom exemplo disso.

No entanto, uma escolha melhor seria uma linguagem-modelo que ofereça
pré-compilação, com a que o
[Handlebar oferece](http://handlebarsjs.com/precompilation.html){: .external}. Pré-compilar modelos pode deixar a experiência do usuário mais
rápida até do que a implementação em tempo de execução mais rápida possível, além de ser mais segura.  Se eval e
seu semelhante de "texto para JavaScript" forem essenciais para o aplicativo, você pode
ativá-los adicionando `'unsafe-eval'` como uma fonte permitida na diretiva `script-src`,
mas recomendamos não fazer isso. Excluir a capacidade de executar
strings dificulta muito a execução de código
não autorizado no site.

## Relatórios 


A capacidade da CSP de bloquear fontes não confiáveis no cliente é um benefício excepcional para os
usuários, mas seria muito útil enviar algum tipo de notificação
de volta ao servidor para que você possa identificar e aparar erros que possam permitir
injeção de código malicioso. Para tanto, você pode instruir o
navegador a `POST` relatórios de violação formatados em JSON a um local
especificado na diretiva `report-uri`.


    Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

Esses relatórios ficarão mais ou menos assim:


    {
      "csp-report": {
        "document-uri": "http://example.org/page.html",
        "referrer": "http://evil.example.com/",
        "blocked-uri": "http://evil.example.com/evil.js",
        "violated-directive": "script-src 'self' https://apis.google.com",
        "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
      }
    }



Isso contém bastantes informações que ajudarão você a encontrar a
causa específica da violação, incluindo a página em que ela
ocorreu (`document-uri`), o referenciador dessa página (observe que, diferentemente do campo de cabeçalho
HTTP, a chave _não_ foi escrita incorretamente), o recurso que violou a
política da página (`blocked-uri`), a diretiva específica violada
(`violated-directive`) e a política completa da página (`original-policy`).

### Somente relatório

Se você está só começando a usar CSP, faz sentido avaliar o estado
atual do aplicativo antes de implementar uma política muito rígida aos usuários.
Para auxiliar em uma implantação completa, você pode pedir que o navegador monitore
uma política, relatando violações, mas sem aplicar as restrições. Em vez de
enviar um cabeçalho `Content-Security-Policy`, envie um cabeçalho
`Content-Security-Policy-Report-Only`.

    Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

A política especificada no modo somente relatório não bloqueia recursos restringidos, mas
envia relatórios de violação ao local que você especificar. Você ainda pode enviar
_ambos_ os cabeçalhos, aplicando uma política e monitorando outra ao mesmo tempo. Essa é uma ótima
forma de avaliar o efeito das mudanças na CSP do seu aplicativo: ativar
os relatórios para uma nova política, monitorar os relatórios de violação e consertar os erros
que aparecerem. Quando você considerar o efeito satisfatório, é só começar a impor a nova política.



## Uso no mundo real 

A CSP 1 é bem útil no Chrome, Safari e Firefox, mas tem suporte
muito limitado no IE 10. Você pode <a href="http://caniuse.com/#feat=contentsecuritypolicy">
ver as especificidades em canisue.com</a>. A CSP de nível 2 está disponível para Chrome
desde a versão 40. Sites de massa, como o Twitter e o Facebook, implementaram o cabeçalho
(vale a pena ler<a href="https://blog.twitter.com/2011/improving-browser-security-with-csp">o estudo de caso
do Twitter</a>), e o padrão já é ótimo
para você começar a implementar nos seus sites.

O primeiro passo para se criar uma política para o aplicativo é avaliar os
recursos que se carrega atualmente. Quando você achar que entende como
as coisas se relacionam no seu aplicativo, defina uma política com base nesses
requisitos. Vamos falar sobre alguns casos de uso comuns e determinar qual seria
a melhor forma de oferecer suporte a eles dentro do campo de proteção da CSP.

### Caso de uso 1: widgets de redes sociais

* O [botão +1](/+/web/+1button/){: .external}
do Google contém um script de `https://apis.google.com` e tem `<iframe>` de
`https://plusone.google.com` embutido. Você precisa de uma política que contemple as
duas origens para incorporar o botão. A política mínima seria: `script-src
https://apis.google.com; child-src https://plusone.google.com`. Você também precisa
garantir que o fragmento de JavaScript que o Google forneceu seja extraído em
um arquivo JavaScript externo. Se você tem uma política que usa `child-src`,
precisa mudá-la para `child-src`.

* O [botão de Curtir](//developers.facebook.com/docs/plugins/like-button){: .external } do Facebook

tem diversas opções de implementação. Recomendamos trabalhar com a versão
`<iframe>`, já que é isolada com segurança do resto do site. Ele
precisa de uma diretiva `child-src https://facebook.com` para funciona corretamente. Observe
que, por padrão, o código de `<iframe>` que o Facebook fornece carrega um URL
relativo: `//facebook.com`. Altere-o para especificar HTTPS explicitamente:
`https://facebook.com`. Não tem motivo para usar HTTP se não for necessário.

* O [botão de Tuíte](https://publish.twitter.com/#)
do Twitter funciona com acesso a um script e um frame, ambos hospedados em
`https://platform.twitter.com` (novamente, o Twitter também fornece um URL relativo por
padrão: edite o código para especificar HTTPS ao copiar/colar o URL localmente).
Com `script-src https://platform.twitter.com; child-src
https://platform.twitter.com`, estará tudo pronto, desde que você mova o fragmento de JavaScript
que o Twitter forneceu em um arquivo JavaScript externo.

* Outras plataformas têm requisitos similares e podem ser endereçadas de forma parecida.
Sugerimos definir um `default-src` como `'none'` e observar o console para 
determinar que recursos serão necessários para poder fazer os widgets funcionarem.

Incluir diversos widgets é bem simples: basta combinar as diretivas
de política, lembrando de agrupar todos os recursos do mesmo tipo em uma única
diretiva. Se você quiser os widgets das três redes sociais, a política teria que
ficar assim:

    script-src https://apis.google.com https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com

### Caso de uso 2: bloqueio

Imagine por um momento que você administra o site de um banco e quer garantir que somente
os recursos que você mesmo desenvolveu sejam carregados. Nesse cenário,
comece com uma política padrão que bloqueie absolutamente tudo (`default-src
'none'`) e parta daí.

Digamos que o banco carregue todas as imagens, estilo e scripts de um CDN em
`https://cdn.mybank.net` e conecte-se a `https://api.mybank.com/` via XHR
para extraia diversos bits de dados. Os frames são usados, mas somente para páginas locais do
site (sem origem de terceiros). Não há Flash, fontes nem
extras no site. O cabeçalho CSP mais restritivo que poderíamos enviar seria:

    Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'

### Caso de uso 3: somente SSL

O administrador de um fórum de discussão sobre anéis de casamento quer garantir que todos os recursos sejam
carregados somente por canais seguros, mas não escreve muito código. Reescrever
grandes quantidades de software de fórum de terceiros, cheio até a última gota de scripts e estilo embutidos,
está além de suas habilidades. A política a seguir funcionaria
bem:

    Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'

Embora `https:` seja especificado em `default-src`, as diretivas de script
e estilo não herdam essa fonte automaticamente. Cada diretiva troca
a padrão completamente pelo tipo específico de recurso que abrange.

## O futuro


A Política de segurança de conteúdo de nível 2 é uma <a href="http://www.w3.org/TR/CSP2/">
Candidata a recomendação</a>. O Web Application Security Working Group, da W3C,
já começou a trabalhar na próxima iteração da especificação: a
[Política de segurança de conteúdo de nível 3](https://www.w3.org/TR/CSP3/){: .external }. 


Se tiver interesse na discussão sobre esses recursos futuros,
[dê uma olhada nos arquivo de lista de e-mails de public-webappsec@](http://lists.w3.org/Archives/Public/public-webappsec/)
ou inscreva-se.


{# wf_devsite_translation #}
