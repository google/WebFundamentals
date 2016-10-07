project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Segurança é uma parte importante da Web para proteger os usuários e para usar as novas e incríveis APIs no futuro será necessário avançar com o suporte TLS.

{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2000-01-01 #}

# Security with HTTPS {: .page-title }

{% include "web/_shared/contributors/chrispalmer.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}


## Generating Keys and Certificate Signing Requests 


Esta seção usa o programa da linha de comando openssl, que é fornecido com a maioria dos sistemas Linux, BSD e Mac OS X, para gerar chaves públicas/privadas e um CSR.

### TL;DR {: .hide-from-toc }
- Você precisa criar um par de chaves pública e privada do RSA de 2048 bits.
- Gere uma solicitação de assinatura de certificado (CSR) que integra sua chave pública.
- Compartilhe sua CSR com sua Autoridade de Certificado (CA) para receber um certificado final ou uma cadeia de certificados.
- Instale seu certificado final em um local não acessível na Web como /etc/ssl (Linux e Unix) ou no local onde o IIS desejar (Windows).



### Gere um Par de Chaves Pública/Privada

Neste exemplo, iremos gerar um par de chaves RSA de 2048 bits. (Uma chave menor, como
1024 bits, não tem resistência suficiente contra ataques de força bruta. Uma
chave maior, como a de 4096 bits, é um exagero. Com o tempo, o tamanho da chave aumenta conforme
o processamento do computador fica mais barato. Atualmente, o mais adequado é de 2048.)

O comando para gerar o par de chaves RSA é:

    openssl genrsa -out www.example.com.key 2048

Isso fornecerá a seguinte saída:

    Generating RSA private key, 2048 bit long modulus
    .+++
    .......................................................................................+++
    e is 65537 (0x10001)

### Gere uma CSR

Nesta etapa, você integra sua chave pública e informações sobre sua organização
e seu site da Web em uma solicitação de assinatura de certificado. *openssl* solicitará interativamente
 esses metadados.

Executar o seguinte comando:

    openssl req -new -sha256 -key www.example.com.key -out
www.example.com.csr

Resultará no seguinte:

    You are about to be asked to enter information that will be incorporated
    into your certificate request

    What you are about to enter is what is called a Distinguished Name or a DN.
    There are quite a few fields but you can leave some blank
    For some fields there will be a default value,
    If you enter '.', the field will be left blank.
    -----
    Country Name (2 letter code) [AU]:CA
    State or Province Name (full name) [Some-State]:California
    Locality Name (eg, city) []:Mountain View
    Organization Name (eg, company) [Internet Widgits Pty Ltd]:Example, Inc.
    Organizational Unit Name (eg, section) []:Webmaster Help Center Example
    Team
    Common Name (e.g. server FQDN or YOUR name) []:www.example.com
    Email Address []:webmaster@example.com

    Please enter the following 'extra' attributes
    to be sent with your certificate request
    A challenge password []:
    An optional company name []:

Agora, certifique-se de que a CSR está correta. Você pode criar esse comando:

    openssl req -text -in www.example.com.csr -noout

E a resposta deverá ser a seguinte:

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

### Envie sua CSR para uma CA

Dependendo de qual CA você deseja usar, haverá diferentes formas de enviar
sua CSR: usando um formulário no site da Web, enviando por email ou alguma
outra forma. Algumas CAs (ou seu revendedores) podem até mesmo automatizar alguns ou todos os processos
(em alguns casos incluindo o par de chaves e a geração da CSR).

Envie sua CSR para a CA e siga as instruções para receber seu certificado
final ou cadeia de certificados.

Diferentes CAs cobrarão valores diferentes pelo serviço de confirmação
de sua chave pública.

Também há opções para mapear sua chave para mais de 1 nome DNS, incluindo
vários nomes distintos (por exemplo, todos de exemplo.com, www.exemplo.com, exemplo.net,
e www.example.net) ou nomes “curinga&quot; como \*.exemplo.com.

Por exemplo, 1 CA atualmente custa:

* Padrão: $16/ano, válido para exemplo.com e www.exemplo.com.
* Curinga: $150/ano, válido para exemplo.com e \*.exemplo.com.

Com esses preços, os certificados curinga são econômicos quando você tem mais de 9
subdomínios; caso contrário, você pode comprar apenas 1 ou mais certificados de nome único. (Se
você tem mais do que 5 subdomínios, por exemplo, você pode encontrar um certificado curinga
mais conveniente quando você habilitar HTTPS em seus servidores.)

Note: lembre-se de que nos certificados curinga, o curinga é aplicado a
apenas 1 etiqueta DNS. Um bom certificado para \*.exemplo.com funciona para
foo.exemplo.com e bar.exemplo.com, mas _não_ para foo.bar.exemplo.com.

Copie os certificados para todos os seus servidores de front-end em um local não acessível pela Web
como /etc/ssl (Linux e Unix) ou no local onde o IIS desejar (Windows).



## Enable HTTPS On Your Servers 




Você está pronto para todas as etapas importantes da habilitação do HTTPS em seus servidores.

### TL;DR {: .hide-from-toc }
- Use a ferramenta Configuração de Servidor do Mozilla para definir seu servidor para suporte HTTPS.
- Teste seu site regularmente com o prático Teste do Servidor SSL da Qualys e garanta pelo menos um A ou A+.



Nesta etapa, você deve tomar uma decisão de operação fundamental:

* dedicar um endereço IP exclusivo para cada hostname que seu servidor da Web fornece conteúdo
; ou
* usar uma hospedagem virtual baseada em nome.

Se você estiver usando endereços IP diferentes para cada hostname, ótimo! Você 
suporta facilmente HTTP e HTTPS para todos os clientes.

No entanto, a maioria dos operadores de site usam hospedagem virtual baseada em nome para conservar endereços
IP porque é geralmente mais conveniente. O problema com o IE no
Windows XP e Android anterior ao 2.3 é que eles não compreendem a [Indicação
de Nome de Servidor](https://en.wikipedia.org/wiki/Server_Name_Indication) (SNI),
que é fundamental para a hospedagem virtual baseada em nome HTTPS.

Algum dia — esperamos que em breve — todos os clientes que não suportam SNI serão substituídos
por um software moderno. Monitore a cadeia de caracteres do agente do usuário nos seus logs de solicitação para saber
quando um número suficiente da população de usuários migrou para o software moderno. (Você pode
decidir qual é seu limite; talvez &lt; 5%, &lt; 1% ou algo parecido.)

Se você ainda não tem o serviço HTTPS disponível em seus servidores, habilite-o agora
(sem redirecionar HTTP para HTTPS; veja abaixo). Configure seu servidor da Web para usar
os certificados comprados e instalados. Você pode achar o [prático gerador de
configurações
do Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
útil.

Se você tem muitos hostnames/subdomínios, cada um deles precisará usar o certificado
correto.

Note: muitos operadores de site já concluíram as etapas que abordamos, mas estão usando HTTPS apenas para fins de redirecionamento de clientes de volta para HTTP. Se você estiver fazendo isso, pare agora mesmo. Veja a próxima seção para garantir que HTTPS e HTTP funcionem corretamente.

Note: por fim, você deve redirecionar solicitações HTTP para HTTPS e usar HSTS (Segurança de Transporte Restrita HTTP). Esta não é a etapa correta no processo de migração para fazer isso; veja “Redirecionar HTTP para HTTPS" e “Ativar a Segurança de Transporte Restrita e Cookies Seguros".

Agora, e durante o tempo de duração do seu site, verifique sua configuração HTTPS com o
[prático Teste do Servidor SSL da Qualys](https://www.ssllabs.com/ssltest/){: .external }. Seu site
deve obter A ou A+; trate tudo que causa notas menores como erro.
(O A de hoje é o B de amanhã, porque os ataques contra algoritmos e protocolos
sempre melhoram!)



## Make Intra-Site URLs Relative 




Agora que você está disponibilizando seu site em HTTP e HTTPS, ele precisa funcionar o mais tranquilamente possível independente do protocolo.

### TL;DR {: .hide-from-toc }
- Certifique-se de que as URLs entre sites e URLs externas são independentes do protocolo, isto é, certifique-se de usar caminhos relativos ou deixar o protocolo de fora, como em //exemplo.com/algo.js



Mas, um problema surge quando você disponibiliza uma página via HTTPS
que inclui recursos HTTP: [conteúdo
misto](http://www.w3.org/TR/mixed-content/), os navegadores avisarão o usuário de que a força total
do HTTPS foi perdida.

De fato, no caso de conteúdo misto ativo (script, plug-ins, CSS, iframes),
muitas vezes os navegadores simplesmente não carregam ou executam o conteúdo — resultando em uma
página quebrada.

Note: é perfeitamente aceitável incluir recursos HTTPS em uma página HTTP.

Além disso, quando você vincular para outras páginas em seu site, os usuários podem ser
rebaixados de HTTPS para HTTP.

Esses problemas ocorrem quando suas páginas incluem URLs totalmente qualificadas entre sites
que usam o esquema *http://*. Você deve alterar o conteúdo da seguinte forma:

		<h1>Bem-vindo a Exemplo.com</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>Leia esse novo<a href="http://example.com/2014/12/24/">
		post sobre gatos!</a></p>
		<p>Veja esse <a href="http://foo.com/">outro site
		interessante.</a></p>

para algo como:

		<h1>Bem-vindo a Exemplo.com</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Leia esse<a href="//example.com/2014/12/24/">novo
		post sobre gatos!</a></p>
		<p>Veja esse <a href="http://foo.com/">outro site
		interessante.</a></p>

ou:

		<h1>Bem-vindo a Exemplo.com</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>Leia esse<a href="/2014/12/24/">novo
		post sobre gatos!</a></p>
		<p>Veja esse <a href="http://foo.com/">outro site
		interessante.</a></p>

Isto é, torne as URLs entre sites o mais relacionadas possível: relacionadas por protocolo
(em um protocolo, começando com //exemplo.com) ou relacionada ao host (começando
 apenas com o caminho, como /jquery.js).

Note: Use um script, não faça o procedimento manualmente. Se o conteúdo do seu site está em um banco de dados, é recomendável testar seu script em uma cópia de desenvolvimento do seu banco de dados. Se o seu site é composto por arquivos simples, teste seu script em uma cópia de desenvolvimento dos arquivos. Apenas envie as alterações para produção depois que elas passarem por um Controle de Qualidade, como sempre. Você pode usar [o script de Bram van Damme](https://github.com/bramus/mixed-content-scan) ou algo parecido para detectar o conteúdo misto em seu site.

Note: ao vincular com outros sites (ao invés de incluir seus  recursos), não altere o protocolo, pois você não tem controle sobre o funcionamento desses sites.

Note: Recomendo URLs relacionadas ao protocolo para fazer uma migração mais tranquila para grandes sites. Se você não tem certeza se pode implantar totalmente o HTTPS, forçar seu site a usar HTTPS para todos os subrrecursos pode não dar certo. Provavelmente por algum tempo você não estará completamente familiarizado com o HTTPS e o site HTTP ainda deverá estar funcionando normalmente. Com o tempo, você concluirá a migração e poderá bloquear o HTTPS (veja as duas próximas seções).

Se seu site depende de script, imagem ou de outros recursos disponibilizados por
terceiros, como CDN, jquery.com ou similares, você tem 2 opções:

* Usar URLs relacionadas ao protocolo também para esses recursos. Se o terceiro
 não disponibilizar HTTPS, solicite que o faça. A maioria já fornece, incluindo o jquery.com.
* Disponibilize recursos de um servidor que você controla e que oferece HTTP e
 HTTPS. Este procedimento é recomendável, porque você terá melhor controle
 sobre a aparência, desempenho e segurança do seu site — você não precisa
 confiar em um terceiro, o que é sempre bom.

Lembre-se que você também precisará alterar URLs entre sites nas suas
folhas de estilo, JavaScript, regras de redirecionamento, &lt;link …&gt; tags e declarações 
CSP — não apenas nas páginas HTML!



## Redirect HTTP to HTTPS 




### TL;DR {: .hide-from-toc }
- Você precisa colocar um link canônico no cabeçalho da sua página para dizer aos mecanismos de pesquisa qual https é a melhor forma de chegar ao seu site.


Defina tags &lt;link rel="canonical" href="https://…"/&gt; em suas páginas. [Isso
ajuda os mecanismos de pesquisa](https://support.google.com/webmasters/answer/139066)
a conhecer a melhor forma de chegar ao seu site.

A maioria dos servidores da Web oferecem um recurso de redirecionamento simples. Use 301 (Movido Permanentemente) para
indicar aos mecanismos de pesquisa e navegadores que a versão HTTPS é canônica e redirecione seus usuários para a versão HTTPS do seu site de HTTP.



## Turn On Strict Transport Security And Secure Cookies 




### TL;DR {: .hide-from-toc }
- Você precisa usar HSTS (HTTP Strict Transport Security) para evitar o custo do redirecionamento 301.
- Verifique se você sempre define o sinalizador Seguro nos cookies.



Neste ponto, você está pronto para “bloquear" o uso do HTTPS. Primeiro, use [Strict Transport Security](https://en.wikipedia.org/wiki/HTTP_Strict_Transport_Security) para avisar os
clientes de que eles devem sempre se conectar ao seu servidor via HTTPS, mesmo ao
seguir uma referência http://. Isso evita ataques como [Retirada SSL](http://www.thoughtcrime.org/software/sslstrip/){: .external } e também evita o
custo da viagem de ida e volta do redirecionamento 301 que habilitamos em “Redirecionar HTTP para HTTPS".

Note: os clientes que tiverem marcado seu site como um Host HSTS conhecido provavelmente terão uma [alha grave](https://tools.ietf.org/html/rfc6797#section-12.1) [se o seu](https://tools.ietf.org/html/rfc6797#section-12.1) [site tiver um erro em sua configuração TLS](https://tools.ietf.org/html/rfc6797#section-12.1) (como um certificado expirado). Essa é uma escolha de projeto expecífica do HSTS; ajuda a garantir que os invasores de rede não possam enganar os clientes para acessar o site sem HTTPS. Não habilite o HSTS até que você tenha certeza de que a operação do seu site esteja forte o suficiente para evitar a implantação do HTTPS com erros de validação do certificado.

Ative o HSTS (HTTP Strict Transport Security) definindo o cabeçalho Strict-Transport-Security. [A página HSTS do OWASP tem links para instruções](https://www.owasp.org/index.php/HTTP_Strict_Transport_Security) para vários softwares de servidor.

A maioria dos servidores da Web oferecem uma capacidade semelhante para adicionar cabeçalhos personalizados.

Note: a idade máxima é medida em segundos. Você pode começar com valores baixos e
aumentar gradualmente a idade máxima conforme se familiariza com a operação de um
site somente em HTTPS.

Também é importante garantir que os clientes nunca enviem cookies (para
autenticação ou preferências do site) por HTTP. Por exemplo, se um cookie
de autenticação do usuário for ser exposto em texto não encriptado, a garantia de segurança de
toda sessão seria destruída — mesmo se você tiver feito todo o resto
corretamente!

Portanto, altere seu aplicativo da Web para sempre definir o sinalizador Seguro nos cookies
que ele define. [Esta página OWASP explica como definir o sinalizador Seguro](https://www.owasp.org/index.php/SecureFlag) em várias estruturas de
aplicativo. Cada estrutura de aplicativo tem uma forma de definir o sinalizador.



## Migration Concerns 




Esta seção discute preocupações que os operadores podem ter sobre a migração para HTTPS.


### Classificação de Busca

[O Google está usando HTTPS como um indicador positivo de qualidade de  pesquisa](https://googlewebmastercentral.blogspot.com/2014/08/https-as-ranking-signal.html). O Google também publica um guia sobre [como transferir, mover ou migrar seu site](https://support.google.com/webmasters/topic/6029673) enquanto mantém sua classificação de pesquisa. O Bing também publica [orientações para webmasters](http://www.bing.com/webmaster/help/webmaster-guidelines-30fba23a).

### Desempenho

Quando as camadas de conteúdo e aplicativo estão bem ajustadas (consulte os [livros de Steve Souders](https://stevesouders.com/){: .external } para obter ótimas dicas), as demais preocupações de desempenho do
TLS são geralmente pequenas em relação ao custo geral do aplicativo. Além disso, você pode reduzir e amortizar os custos. (Para receber boas dicas sobre a otimização e generalização do TLS, consulte _[Rede do Navegador de Alto Desempenho](http://chimera.labs.oreilly.com/books/1230000000545)_[ por Ilya
Grigorik](http://chimera.labs.oreilly.com/books/1230000000545).) Veja também o
[OpenSSL Cookbook](https://www.feistyduck.com/books/openssl-cookbook/)  de Ivan Ristic e _[Bulletproof SSL e TLS](https://www.feistyduck.com/books/bulletproof-ssl-and-tls/)_.

Em alguns casos, o TLS pode _melhorar_ o desempenho, principalmente como resultado da criação do
HTTP/2 possível. Chris Palmer deu 
[uma palestra sobre o desempenho do HTTPS e HTTP/2 no Chrome Dev Summit 2014](/web/shows/cds/2014/tls-all-the-things).

### Cabeçalhos de Referência

Os agentes do usuário não enviarão o cabeçalho de Referência quando os usuários seguem links do seu
site HTTPS para outros sites HTTP. Se isso for um problema, há várias formas de
resolver:

* Os outros sites devem migrar para HTTPS. Esse guia pode ser bastante
 útil! :) Se os sites de referência podem concluir a seção “Habilitar HTTPS em seus servidores" deste guia, você pode alterar
 links no seu site de http:// para https://, ou pode usar
 links relacionados ao protocolo.
* Você pode usar o novo [padrão da
 Política de Referência](http://www.w3.org/TR/referrer-policy/#referrer-policy-delivery-meta)
 para resolver uma série de problemas com cabeçalhos de Referência.

Como os mecanismos de pesquisa estão migrando para HTTPS, você provavelmente verá _mais_ cabeçalhos
de referência ao migrar para HTTPS do que vê agora.

> Os clientes NÃO DEVEM incluir um campo do cabeçalho de referência em uma solicitação HTTP (não segura) se a página de referência foi transferida com um protocolo seguro.
> > <a href="https://tools.ietf.org/html/rfc2616#section-15.1.3">De acordo com o RFC HTTP</a>


### Receita com Anúncios

Os operadores de site que lucram com seu site mostrando anúncios querem garantir que
migrar para HTTPS não irá reduzir as impressões dos anúncios. Mas, devido a preocupações de segurança
de conteúdo misto, um iframe HTTP não funcionará em uma página HTTPS. Há um
problema de ação coletiva difícil aqui: até que os anunciantes publiquem por HTTPS,
os operadores do site não podem migrar para HTTPS sem perder receita com anúncios; mas até que os operadores do
site migrem para HTTPS, os anunciantes não terão muita motivação para publicar HTTPS.

Os anunciantes devem pelo menos oferecer o serviço de anúncio via HTTPS (como por exemplo, concluindo o
“Habilitar HTTPS em seus servidores”, incluso neste guia). Muitos já fazem isso. Você deve pedir aos anunciantes que não
disponibilizam HTTPS, que ao menos começem. Talvez seja uma boa ideia adiar a conclusão de “Relacionar URLs entre sites” apresentada neste
guia até que um número suficiente de anunciantes comecem a operem corretamente.

