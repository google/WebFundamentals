project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Usar HTTPS nos servidores é fundamental para proteger páginas da web.

{# wf_updated_on: 2018-02-12 #}
{# wf_published_on: 2015-03-27 #}

# Como usar o HTTPS nos servidores {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

### TL;DR {: .hide-from-toc }

* Crie um par de chaves pública/privada RSA de 2.048 bits.
* Gere um solicitação de assinatura de certificado (CSR, na sigla em inglês) que contenha sua chave pública.
* "Envie a CSR para a autoridade certificadora (CA, na sigla em inglês) para receber um certificado ou uma cadeia de certificados final.
* Instale o certificado final em um local não acessível pela web, como `/etc/ssl` (Linux e Unix) ou no local indicado pelo IIS (Windows)."

## Gerar chaves e solicitações de assinatura de certificado

Esta seção usa o programa de linha de comando openssl, que vem com a maioria dos sistemas
Linux, BSD e Mac OS X, para gerar chaves pública/privada e uma CSR.


### Gerar um par de chaves pública/privada

Vamos começar gerando um par de chaves RSA de 2.048 bits. Uma chave menor, como
com 1.024 bits, não tem resistência suficiente contra ataques de força bruta. Uma
chave maior, como a de 4.096 bits, é um exagero. Com o tempo, o tamanho da chave aumenta conforme
o processamento computacional fica mais barato. Atualmente, o tamanho mais adequado é 2.048.

O comando para gerar o par de chaves RSA é:

    openssl genrsa -out www.example.com.key 2048

Isso gera o seguinte resultado:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### Gerar uma solicitação de assinatura de certificado

Nesta etapa, você insere sua chave pública e informações sobre a sua organização
e seu site em uma solicitação de assinatura de certificado, ou CSR. O comando
*openssl* solicita, de forma interativa, os metadados necessários.

A execução do comando:

    openssl req -new -sha256 -key www.example.com.key -out www.example.com.csr

Produz o seguinte:

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (for example, city) []:Mountain View
    Organization Name (for example, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (for example, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

Para garantir a validez da CSR, execute este comando:

    openssl req -text -in www.example.com.csr -noout

E a resposta deve ser parecida com esta:

    Certificate Request:
        Data:
            Version: 0 (0x0)
            Subject: C=CA, ST=California, L=Mountain View, O=Google, Inc.,
    OU=Webmaster Help Center Example Team,
    CN=www.example.com/emailAddress=webmaster@example.com
            Subject Public Key Info:
                Public Key Algorithm: rsaEncryption
                    Public-Key: (2048 bit)
                    Modulus:
                        00:ad:fc:58:e0:da:f2:0b:73:51:93:29:a5:d3:9e:
                        f8:f1:14:13:64:cc:e0:bc:be:26:5d:04:e1:58:dc:
                        ...
                    Exponent: 65537 (0x10001)
            Attributes:
                a0:00
        Signature Algorithm: sha256WithRSAEncryption
             5f:05:f3:71:d5:f7:b7:b6:dc:17:cc:88:03:b8:87:29:f6:87:
             2f:7f:00:49:08:0a:20:41:0b:70:03:04:7d:94:af:69:3d:f4:
             ...

### Envie a CSR a uma autoridade certificadora

Cada autoridade certificadora (CA) tem o próprio método de envio de
CSRs. Os métodos podem incluir usar um formulário no site, enviar a CSR
por e-mail ou outro. Algumas CAs (ou seus revendedores) podem até mesmo automatizar alguns ou
todos os processos (inclusive, em alguns casos, incluir o par de chaves e a geração
da CSR).

Envie sua CSR à CA e siga as instruções para receber o certificado
ou a cadeia de certificados final.

Cada CA cobra um valor pelo serviço de confirmar
sua chave pública.

Também há opções para mapear sua chave para mais de 1 nome DNS, incluindo
vários nomes distintos (por exemplo, example.com, www.example.com, example.net,
e www.example.net) ou nomes com "caractere especial" como \*.example.com.

Por exemplo, uma CA no momento oferece os seguintes preços:

* Padrão: US$ 16/ano, válido para example.com e www.example.com.
* Caractere curinga: US$ 150/ano, válido para example.com e \*.example.com.

Com esses preços, os certificados com caractere especial são econômicos quando se tem mais de 9
subdomínios, em outros casos, é possível comprar apenas 1 ou mais certificados de nome único (se
você tiver mais do que 5 subdomínios, por exemplo, poderá encontrar um certificado com caractere especial
mais conveniente se usar HTTPS nos servidores).

Observação: Lembre-se de que nesse tipo de certificado, o caractere especial se aplica somente a um rótulo de DNS. Um bom certificado para \*.example.com funciona para foo.example.com e bar.example.com, mas _não_ para foo.bar.example.com.

Copie os certificados para todos os servidores de front-end em um local não acessível pela web
, como `/etc/ssl` (Linux e Unix) ou no local indicado pelo IIS (Windows).

## Usar HTTPS nos servidores

O uso do HTTPS nos servidores é uma etapa essencial para proporcionar segurança às páginas da web.

* Use a ferramenta de configuração de servidor do Mozilla para fazer o servidor oferecer suporte a HTTPS.
* Teste seu site regularmente com o teste de servidor SSL da Qualys e busque obter pelo menos um A ou A+.

Nesse momento, você deve tomar uma decisão operacional crucial: Escolha uma das seguintes opções:

* Dedicar um endereço IP exclusivo para cada nome de host pelo qual o servidor web fornece
  conteúdo.
* Use hospedagem virtual baseada em nome.

Se você está usando endereços IP distintos para cada nome de host, é
fácil oferecer suporte a HTTP e HTTPS a todos os clientes.

No entanto, a maioria dos operadores de site usam hospedagem virtual baseada em nome para economizar endereços
IP porque isso é geralmente mais conveniente. O problema do IE no
Windows XP e do Android nas versões anteriores à 2.3 é que eles não entendem a [indicação
de nome de servidor](https://en.wikipedia.org/wiki/Server_Name_Indication){: .external} (SNI),
que é essencial para a hospedagem virtual baseada em nome do HTTPS.

Algum dia — esperamos que em breve — todos os clientes incompatíveis com SNI serão substituídos
por software moderno. Monitore a string de user-agent nos registros de solicitações para saber
quando uma parte suficiente da população de usuários migrou para software moderno. (você pode
escolher o limite: talvez &lt; 5% ou &lt; 1%).

Se você ainda não tem o serviço HTTPS disponível nos servidores, ative-o agora
(sem redirecionar o HTTP para o HTTPS; veja abaixo). Configure o servidor da Web para usar
os certificados comprados e instalados. O [prático gerador de
configurações
do Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/){: .external}
pode ser útil para você.

Se você tem muitos nomes de host/subdomínios, eles precisam usar o certificado
correto individualmente.

Aviso: Se você já passou por essas etapas, mas está usando HTTPS pura e simplesmente para redirecionar clientes ao HTTP, pare de fazer isso agora. Leia a próxima seção para garantir que HTTPS e HTTP funcionem corretamente.

Observação: Em última análise, você deve redirecionar solicitações HTTP para HTTPS e usar a segurança de transporte estrita do HTTP (HSTS, na sigla em inglês). Porém, nesse caso, essa não é a etapa adequada do processo de migração. Consulte "Redirecionar HTTP para HTTPS" e "Ativar segurança de transporte estrita e cookies seguros".

Agora e durante todo o tempo de atividade do seu site, verifique a configuração HTTPS com o
[teste de servidor SSL da Qualys](https://www.ssllabs.com/ssltest/){: .external }. O site
deve obter pontuação A ou A+. Tudo que gerar uma avaliação inferior deve ser tratado como erro
(o A de hoje é o B de amanhã, pois os ataques contra algoritmos e protocolos
estão cada vez mais eficazes).

## Torne relativos os URLs internos do site

Agora que você está disponibilizando o site em HTTP e HTTPS, ele precisa funcionar
da forma mais fluida possível, qualquer que seja o protocolo usado. Um fator importante é usar
URLs relativos para links internos do site.

Confirme que os URLs internos e externos do site independem do protocolo. Ou seja, use caminhos relativos ou remova o protocolo. Por exemplo: `//example.com/something.js`.

Surge um problema quando se disponibiliza via HTTPS uma página que contém recursos
HTTP, conhecidos como [conteúdo misto](/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content). Os navegadores alertam os usuários que toda a força do HTTPS foi perdida. Na verdade, no caso de conteúdo misto ativo (scripts, plug-ins, CSS, iframes), muitas vezes os navegadores simplesmente não carregam nem executam o conteúdo, o que gera uma página inválida.

Observação: É perfeitamente aceitável incluir recursos HTTPS em uma página HTTP.

Além disso, quando você criar vínculos para outras páginas no site, os usuários podem ser
sofrer downgrade de HTTPS para HTTP.

Esses problemas acontecem quando as páginas contêm URLs internos do site totalmente qualificados
que usam o esquema *http://*.

<p><span class="compare-worse">Não recomendado</span> — Não recomendamos usar URLs internos do site totalmente qualificados.</p>

    <h1>Welcome To Example.com</h1>
    <script src="http://example.com/jquery.js"></script>
    <link rel="stylesheet" href="http://assets.example.com/style.css"/>
    <img src="http://img.example.com/logo.png"/>;
    <p>Read this nice <a href="http://example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

Em outras palavras, torne os URLs internos do site os mais relativos possível: relativos ao protocolo (sem protocolo, começando com `//example.com`) ou relativos ao host (começando apenas com o caminho, como com `/jquery.js`).

<p><span class="compare-better">Recomendado</span> — Recomendamos usar URLs internos do site relativos ao protocolo.</p>

    <h1>Welcome To Example.com</h1>
    <script src="//example.com/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="//example.com/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

<p><span class="compare-better">Recomendado</span> — Recomendamos usar URLs internos do site relativos.</p>

    <h1>Welcome To Example.com</h1>
    <script src="/jquery.js"></script>
    <link rel="stylesheet" href="//assets.example.com/style.css"/>
    <img src="//img.example.com/logo.png"/>;
    <p>Read this nice <a href="/2014/12/24/">new
    post on cats!</a></p>
    <p>Check out this <a href="http://foo.com/">other cool
    site.</a></p>

Faça isso com um script, não manualmente. Se o conteúdo do site está em um banco de dados,
teste o script em uma cópia de desenvolvimento do banco de dados.
Se o conteúdo do site só contém arquivos simples, teste o script em uma cópia de desenvolvimento dos arquivos. Implemente as alterações na produção somente depois de aprovadas em teste de controle de qualidade, como sempre. Você pode usar o [script do Bram van Damme](https://github.com/bramus/mixed-content-scan) ou algo parecido para detectar conteúdo misto no site.

Ao oferecer links para outros sites (em vez de incluir os recursos deles),
como você não tem controle sobre o funcionamento deles,
não altere o protocolo.

Success: para fazer migrações mais suaves de sites grandes, recomendamos usar URLs relativos a protocolo. Se você não tem certeza de que já consegue implantar o HTTPS totalmente, forçar o site a usar HTTPS para todos os recursos secundários pode não dar certo. É provável que o HTTPS seja algo novo e estranho para você por algum tempo. Enquanto isso, o site HTTP deverá funcionar normalmente como sempre. Com o tempo, você vai concluir a migração e poder forçar o uso do HTTPS (veja as duas próximas seções).

Se o site depende de scripts, imagens ou outros recursos fornecidos por
terceiros, como CDN, jquery.com, você tem duas opções:

* Usar URLs relativos a protocolo para esses recursos. Se o terceiro não
oferecer HTTPS, peça que o faça. A maioria faz isso, incluindo o jquery.com.
* Fornecer os recursos a partir de um servidor que você controle e que oferece HTTP
e HTTPS. Na maioria dos casos, essa é uma boa ideia, porque assim você tem maior
controle sobre o visual, o desempenho e a segurança do seu site. Além disso,
você não precisará confiar em terceiros, o que é ótimo.

Observação: Não se esqueça de que você também precisa alterar os URLs internos do site nas folhas de estilo, no JavaScript, nas regras de redirecionamento, nas tags `<link>`, nas declarações de CSP, não só nas páginas HTML.

## Redirecionar HTTP para HTTPS

Você precisa colocar um [link canônico](https://support.google.com/webmasters/answer/139066) no cabeçalho da página para informar aos mecanismos de pesquisa que a melhor forma de chegar ao site é via HTTPS.

Insira as tags `<link rel="canonical" href="https://…"/>` nas páginas. Isso
ajuda os mecanismos de pesquisa a determinar a melhor forma de chegar ao seu site.

## Ativar a segurança de transporte estrita e cookies seguros

Neste ponto, você está pronto para “bloquear" o uso do HTTPS.

* Use a segurança de transporte estrita do HTTP (HSTS) para evitar o custo do redirecionamento 301.
* Sempre ative o sinalizador Secure para os cookies.

Primeiro, use [StrictTransportSecurity](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security)
para informar os clientes de que eles devem sempre se conectar ao servidor via HTTPS, mesmo
ao seguir uma referência `http://`. Isso evita ataques como
[SSLStrip](http://www.thoughtcrime.org/software/sslstrip/){: .external } e também
evita o custo de ida e volta do `301 redirect` que ativamos em
[Redirecionar HTTP para HTTPS](#redirect-http-to-https).

Observação: Os clientes que marcaram seu site como host HSTS conhecido provavelmente passarão por uma <a href="https://tools.ietf.org/html/rfc6797#section-12.1"><i>falha grave</i> se o site tiver um erro na configuração do TLS</a> (como um certificado expirado). O HSTS foi desenvolvido explicitamente dessa forma para garantir que os invasores de rede não consigam enganar os clientes e fazê-los acessar o site sem HTTPS. Não ative o HSTS até ter certeza de que o funcionamento do site está suficientemente sólido para impedir a implantação de HTTPS com erros de validação de certificado.

Ative a segurança de transporte estrita do HTTP (HSTS) configurando o cabeçalho `Strict-Transport-Security`. A [página de HSTS do OWASP contém links para instruções](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security) de diversas versões de software do servidor.

A maioria dos servidores da Web oferece recursos semelhantes para adicionar cabeçalhos personalizados.

Observação: `max-age` é medido em segundos. Você pode começar com valores baixos para `max-age` e aumentar gradualmente à medida que se familiarizar com a operação de um site exclusivamente em HTTPS.

Também é importante garantir que os clientes nunca enviem cookies (para
autenticação ou preferências do site) por HTTP. Por exemplo, se o
cookie de autenticação de um usuário for exposto em texto simples, a garantia de segurança
de toda a sessão será destruída, mesmo que todo resto esteja
correto!

Portanto, altere seu aplicativo da Web para sempre aplicar o sinalizador Secure aos cookies
que ele define. [Essa página da OWASP explica como aplicar o sinalizador Secure](https://www.owasp.org/index.php/SecureFlag) em diversos frameworks de aplicativo. Cada framework de aplicativo tem uma maneira de ativar o sinalizador.

A maioria dos servidores da Web oferece um recurso simples de redirecionamento. Use `301 (Moved Permanently)` para
indicar aos mecanismos de pesquisa e navegadores que a versão HTTPS é canônica, e redirecione os usuários da versão HTTP para a versão HTTPS do site.

## Questões da migração

Muitos desenvolvedores têm preocupações válidas sobre a migração de HTTP para HTTPS.
A equipe de webmasters do Google tem [orientações excelentes](https://plus.google.com/+GoogleWebmasters/posts/eYmUYvNNT5J) disponíveis.

### Classificação das pesquisas

O Google usa [HTTPS como um indicador de qualidade positivo para a pesquisa](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html) e,
além disso, publica um guia sobre
[como transferir, mover ou migrar um site](https://support.google.com/webmasters/topic/6029673)
sem alterar sua classificação nas pesquisas. O Bing também publica
[orientações para webmasters](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

### Desempenho

Quando as camadas de conteúdo e aplicativo estão bem ajustadas (leia o
[livro de Steve Souders](https://stevesouders.com/){: .external } para obter ótimas dicas), as
demais preocupações com o desempenho do TLS geralmente são pequenas em relação
ao custo geral do aplicativo. Além disso, você pode reduzir e aliviar
esses custos (para ver ótimos conselhos sobre otimização do TLS e em termos globais, leia
[High performance Browser Networking](https://hpbn.co/), de Ilya Grigorik). Leia também o [OpenSSL Cookbook](https://www.feistyduck.com/books/openssl-cookbook/) e [Bulletproof SSL And TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/), de Ivan Ristic.

Em alguns casos, o TLS pode _melhorar_ o desempenho, principalmente como resultado de possibilitar o
HTTP/2. Chris Palmer deu uma palestra sobre o [desempenho do HTTPS e do HTTP/2 no Chrome Dev Summit 2014](/web/shows/cds/2014/tls-all-the-things).

### Cabeçalhos "referer"

Quando o usuário segue links do site HTTPS para outros sites HTTP, os agentes do usuário não enviam o cabeçalho Referer. Se isso for um problema, há várias formas de
resolver:

* Os outros sites devem migrar para HTTPS. Se os sites referidos puderem concluir a seção [Usar HTTPS nos servidores](#enable-https-on-your-servers) deste guia, você poderá alterar os links deles que seu site oferece de `http://` para `https://` ou usar links relativos a protocolo.
* Para encontrar solução para diversos problemas com os cabeçalhos Referer, use o novo [padrão da Política dos referenciadores](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta).

Como os mecanismos de pesquisa estão migrando para HTTPS, no futuro, você provavelmente verá _mais_ cabeçalhos Referer quando migrar para HTTPS.

Warning: De acordo com a [RFC do HTTP](https://tools.ietf.org/html/rfc2616#section-15.1.3), os clientes **NÃO DEVEM** incluir um campo de cabeçalho Referer em uma solicitação HTTP (desprotegida) se a página referida tiver sido transferida por meio de um protocolo seguro.

### Receita com anúncios

Os operadores de site que lucram com seu site mostrando anúncios querem ter certeza de que
a migração para  HTTPS não reduzirá as impressões dos anúncios. Mas, devido a questões
de segurança envolvendo o conteúdo misto, um `<iframe>` HTTP não funciona em uma página HTTPS. Aqui, temos um
problema complexo de ação coletiva: até que os anunciantes publiquem via HTTPS,
os operadores do site não poderão migrar para HTTPS sem perder receita com anúncios. No entanto, até que os operadores do
site migrem para HTTPS, os anunciantes não terão muita motivação para publicar via HTTPS.

Os anunciantes devem, no mínimo, oferecer serviço de anúncio via HTTPS (como na conclusão
da seção "Usar HTTPS nos servidores" desta página. Muitos já fazem isso. Você
deve pedir aos anunciantes que não fornecem HTTPS em nenhuma hipótese que, pelo menos comecem a fornecer.
Talvez seja uma boa ideia adiar a conclusão da seção [Tornar relativos os URLs internos do site](#make-intrasite-urls-relative) deste guia até que haja anunciantes suficientes operando adequadamente entre si.


{# wf_devsite_translation #}
