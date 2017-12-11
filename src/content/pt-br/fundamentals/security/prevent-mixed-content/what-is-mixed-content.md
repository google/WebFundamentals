project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O conteúdo misto aparece quando o HTML inicial é carregado por uma conexão HTTPS protegida, mas outros recursos são carregados por uma conexão HTTP desprotegida.

{# wf_updated_on: 2016-08-24 #}
{# wf_published_on: 2015-09-25 #}

# O que é conteúdo misto? {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

**Conteúdo misto** surge quando o HTML inicial é carregado por uma conexão
HTTPS protegida, mas outros recursos (como imagens, vídeos, folhas de estilo, scripts e outros)
são carregados por uma conexão HTTP desprotegida. O nome desse fenômeno é conteúdo misto
porque são carregados conteúdos em HTTP e HTTPS para exibir a mesma página,
e a solicitação inicial estava protegida por HTTPS. Os navegadores modernos exibem advertências
sobre esse tipo de conteúdo para indicar ao usuário que essa página contém
recursos que apresentam risco.

### TL;DR {: .hide-from-toc }

* O HTTPS é importante para proteger o seu site e os usuários de ataques e invasões.
* O conteúdo misto reduz o nível de segurança e a experiência do usuário oferecidos pelo seu site HTTPS.

## Solicitações de recurso e navegadores web

Quando um navegador _acessa_ uma página de um site, ele está solicitando um recurso HTML. Por isso, o servidor web retorna o conteúdo HTML, que o navegador analisa e exibe aos usuários. Muitas vezes, um único arquivo HTML não é suficiente para exibir a página inteira. Para compensar isso, o arquivo HTML inclui referências a outros recursos que o navegador precisa solicitar. Estes sub-recursos podem ser imagens, vídeos, HTML extra, CSS ou JavaScript, e são obtidos por meio de solicitações individuais. 

## Benefícios do HTTPS

Quando um navegador solicita recursos por HTTPS &mdash; que significa HTTP seguro &mdash;, ele 
usa uma conexão criptografada para se comunicar com o servidor web.

Usar HTTPS tem três principais benefícios:

* Authentication
* Integridade de dados
* Confidencialidade

### Autenticação

_O site com quem estou me comunicando é quem afirma ser?_ 

O HTTPS permite que o navegador verifique se abriu o site correto e não 
foi redirecionado a um site malicioso. Ao navegar para o site do seu banco, 
seu navegador _autentica_ o site, evitando, assim, que um invasor 
 atue como o seu banco e roube suas credenciais de acesso. 

### Integridade de dados

_Alguém adulterou o conteúdo que estou enviando ou recebendo?_ 

O HTTPS permite que o navegador detecte se um invasor alterou algum dado que o navegador 
recebeu. Ao transferir dinheiro usando o site do seu banco, isto evita que um 
invasor altere o número da conta de destino enquanto a solicitação está 
sendo processada. 

### Confidencialidade

_Alguém consegue acessar o conteúdo que estou enviando ou recebendo?_

O HTTPS impede que um invasor espione as solicitações do navegador, 
controle os sites acessados ou roube informações enviadas ou recebidas. 

### HTTPS, TLS e SSL

HTTPS significa HTTP seguro, protocolo de transferência de hipertexto seguro. A 
parte **segura** aqui vem da criptografia adicionada às solicitações enviadas 
e recebidas pelo navegador. Atualmente, a maioria dos navegadores usa o protocolo TLS para 
fornecer criptografia. O **TLS** também é chamado de SSL. 

Os detalhes de HTTPS, TLS e SSL estão além do objetivo deste artigo, mas, se 
quiser saber mais, ler os materiais a seguir é um bom começo:

* [Wikipédia HTTPS](https://en.wikipedia.org/wiki/HTTPS){: .external}
* [Wikipédia TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security){: .external}
* [Curso de criptografia da Khan Academy](https://www.khanacademy.org/computing/computer-science/cryptography){: .external}
* [Capítulo sobre TLS](http://chimera.labs.oreilly.com/books/1230000000545/ch04.html){: .external} de [High Performance Browser Networking](http://chimera.labs.oreilly.com/books/1230000000545){: .external}, de Ilya Grigorik 

## Conteúdo misto enfraquece HTTPS

Solicitar sub-recursos usando o protocolo HTTP desprotegido enfraquece a segurança de 
toda a página, já que essas solicitações são vulneráveis a **ataques 
indiretos**, em que um invasor espiona uma conexão de rede e visualiza ou 
modifica a comunicação entre duas partes. Usando estes recursos, um 
invasor pode, muitas vezes, controlar completamente a página, e não apenas o recurso 
comprometido. 

Embora muitos navegadores comuniquem advertências de conteúdo misto ao usuário, quando isso 
acontece, é tarde demais: as solicitações desprotegidas já foram realizadas 
e a segurança da página está comprometida. Infelizmente, esse cenário é 
muito comum na web, por isso os navegadores não conseguem simplesmente bloquear todas as solicitações 
mistas sem restringir o funcionamento de muitos sites.

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou uma imagem não confiável. Este conteúdo também deve ser fornecido por HTTPS.">
  <figcaption>
    Cabe a você, desenvolvedor, consertar problemas de conteúdo misto do seu aplicativo.
  </figcaption>
</figure>

### Um exemplo simples

Carregar um script não confiável de uma página HTTPS.

A exibição desta página de exemplo por **HTTPS**&mdash; [**https**://googlesamples.github.io/web-fundamentals/.../simple-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: .external}&mdash; contém uma tag de script **HTTP** que tenta carregar conteúdo misto. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/simple-example.html" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: target="_blank" .external }

Neste exemplo, o script `simple-example.js` é carregado com um URL **HTTP**. Este é o caso mais simples de conteúdo misto. Quando o navegador solicita o arquivo `simple-example.js`, um invasor pode injetar código no conteúdo retornado 
e assumir o controle de toda a página. 

Felizmente, os navegadores mais modernos bloqueiam este tipo de conteúdo perigoso por 
padrão. Acesse [como o navegador lida com conteúdo misto](#browser-behavior-with-mixed-content){: .external}.

<figure>
  <img src="imgs/simple-mixed-content-error.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou um script não confiável. Esta solicitação foi bloqueada. O conteúdo deve ser fornecido por HTTPS.">
  <figcaption>O Chrome bloqueia script não confiável.</figcaption>
</figure>

### Um exemplo de XMLHttpRequest

Carregar dados não confiáveis com XMLHttpRequest.

A exibição desta página de exemplo por **HTTPS**&mdash; [**https**://googlesamples.github.io/web-fundamentals/.../xmlhttprequest-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: .external}&mdash; contém uma `XMLHttpRequest` por **HTTP** para recuperar dados `JSON` do conteúdo misto.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/xmlhttprequest-example.html" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: target="_blank" .external }

Aqui, o URL **HTTP** é construído dinamicamente em JavaScript e, eventualmente, 
é usado por `XMLHttpRequest` para carregar um recurso desprotegido. Como no exemplo simples 
acima, quando o navegador solicita o arquivo `xmlhttprequest-data.js`, um 
invasor pode injetar código no conteúdo retornado e assumir o controle de 
toda a página.

A maioria dos navegadores modernos bloqueia essas solicitações perigosas.

<figure>
  <img src="imgs/xmlhttprequest-mixed-content-error.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou um ponto de extremidade XMLHttpRequest não confiável. Esta solicitação foi bloqueada. O conteúdo deve ser fornecido por HTTPS.">
  <figcaption>O Chrome bloqueia XMLHttpRequest não confiável.</figcaption>
</figure>

### Um exemplo de galeria de imagens

Carregar imagens não confiáveis com lightbox jQuery.

A exibição desta página de exemplo por **HTTPS**&mdash; [**https**://googlesamples.github.io/web-fundamentals/.../image-gallery-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: .external} &mdash; inicialmente não tem problemas com conteúdo misto, mas, quando a imagem em miniatura recebe um clique, uma imagem de conteúdo misto de tela cheia é carregada por **HTTP**. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

As galerias de imagens com frequência dependem do atributo `src` da tag `<img>` para exibir 
imagens em miniatura na página, o atributo `href` da tag de âncora (`<a>`), em seguida, é 
usado para carregar a imagem de tela cheia para a sobreposição da galeria. Normalmente, 
as tags `<a>` não geram conteúdo misto, mas, neste caso, o código jQuery 
neutraliza o comportamento padrão do link &mdash; navegar para uma nova página &mdash; e 
carrega a imagem **HTTP** nesta página. 

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou uma imagem não confiável. Este conteúdo também deve ser fornecido por HTTPS.">
</figure>

Imagens não confiáveis prejudicam a segurança do seu site, mas não são tão perigosas 
quanto outros tipos de conteúdo misto. Os navegadores modernos ainda carregam imagens 
de conteúdo misto, mas também exibem advertências ao usuário. 

## Tipos de conteúdo misto e riscos à segurança associados

Os dois tipos de conteúdo misto são: o ativo e o passivo. 

O **conteúdo misto passivo** refere-se ao conteúdo que não interage com o resto 
da página e, portanto, um ataque indireto é restringido em relação a o que podem 
fazer se interceptarem ou alterarem o conteúdo. O conteúdo misto passivo inclui 
imagens, vídeos e áudios, junto com outros recursos que não interagem 
com o resto da página.  

O **conteúdo misto ativo** interage com a página como um todo e permite que 
um invasor faça praticamente o que quiser com ela. Conteúdo misto ativo inclui 
scripts, folhas de estilo, iframes, recursos em flash e outros códigos que o navegador pode  
baixar e executar.

### Conteúdo misto passivo

O conteúdo misto passivo também representa uma ameaça à segurança do site e dos usuários.
Por exemplo, um invasor pode interceptar solicitações HTTP de imagens do site e 
trocar ou substituí-las, pode inverter a imagem dos botões de _salvar_
 e _apagar_, fazendo com que os usuários excluam conteúdo equivocadamente, 
substitui os diagramas do seu produto por conteúdo pornográfico ou lascivo, distorcendo o seu 
site, ou até substitui as imagens do seu produto por anúncios de um site ou produto diferente. 

Mesmo que o invasor não altere o conteúdo do site, você ainda terá um 
grande problema de privacidade, já que o invasor pode rastrear usuários usando solicitações 
de conteúdo misto. O invasor consegue determinar que páginas os usuários acessam e que produtos 
visualizam com base em imagens ou outros recursos que o navegador carrega.

Veja a seguir um exemplo de conteúdo misto passivo: 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/passive-mixed-content.html" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

A maioria dos navegadores ainda renderiza este tipo de conteúdo misto ao usuário, no entanto, uma 
advertência também é exibida, uma vez que representa um risco à privacidade e à segurança do site e 
dos usuários. 

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou um vídeo não confiável. Este conteúdo também deve ser fornecido por HTTPS.">
  <figcaption>Advertências de conteúdo misto do console do JavaScript no Chrome.</figcaption>
</figure>

### Conteúdo misto ativo

O conteúdo misto ativo representa um maior risco em relação ao passivo. Um invasor pode 
interceptar e modificar o conteúdo ativo e, com isso, assumir controle total sobre a página ou 
até mesmo sobre todo o site. Isso permite que o invasor altere qualquer coisa na 
página, incluindo a exibição de conteúdo totalmente diferente, roubo de senhas do usuário 
ou outras credenciais de acesso, roubo de cookies da sessão do usuário ou redirecionamento do 
usuário para um site totalmente diferente. 

Devido à gravidade dessa ameaça, muitos navegadores bloqueiam esse tipo de conteúdo por 
padrão para proteger os usuários, mas o funcionamento varia entre provedores e versões 
de navegador.

Veja a seguir alguns exemplos de conteúdo misto ativo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/active-mixed-content.html" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou um recurso não confiável. Esta solicitação foi bloqueada. O conteúdo deve ser fornecido por HTTPS.">
  <figcaption>Erros de conteúdo misto do console do JavaScript no Chrome.</figcaption>
</figure>

## Comportamento do navegador com conteúdo misto

Devido às ameaças descritas acima, o ideal seria os navegadores bloquearem todo 
o conteúdo misto. No entanto, isto prejudicaria diversos sites que milhões 
de usuários usam e confiam todos os dias. O compromisso, no momento, é bloquear os tipos 
mais perigosos de conteúdo misto e permitir que tipos menos perigosos ainda possam ser 
solicitados. 

Os navegadores modernos seguem as [especificações de conteúdo misto](https://w3c.github.io/webappsec/specs/mixedcontent/){: .external }, que definem as categorias de [**conteúdo opcionalmente bloqueável**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-optionally-blockable){: .external} e [**conteúdo bloqueável**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-blockable){: .external}. 

De acordo com as especificações, os recursos se qualificam como conteúdo opcionalmente bloqueável "quando o risco 
de permitir seu uso como conteúdo misto é menor que o risco de prejudicar 
partes importantes da web". Este é um subconjunto da categoria [conteúdo 
misto passivo](#passive-mixed-content) descrita acima. No momento desta gravação, recursos de imagem, 
vídeo e áudio, assim como links pré-fornecidos são os únicos 
tipos de recurso incluídos em conteúdo opcionalmente bloqueável. Esta categoria provavelmente 
ficará menor com o tempo.

Todo conteúdo que não é **opcionalmente bloqueável** é considerado **bloqueável** 
e é bloqueado pelo navegador. 

### Versões do navegador

É importante lembrar que nem todo visitante do seu site usa 
os navegadores com a atualização mais recente. Cada versão de cada provedor de navegador 
se comporta de forma diferente com conteúdo misto. Na pior das hipóteses, alguns navegadores e versões 
não bloqueiam nenhum conteúdo misto, o que é muito prejudicial ao usuário. 

O exato comportamento de cada navegador muda constantemente, por isso não incluiremos 
especificidades aqui. Se tiver interesse em saber como um navegador específico se comporta, busque 
informações publicadas diretamente pelo provedor. 

Observação: seus usuários contam com você para mantê-los protegidos enquanto acessam seu site. É importante consertar os problemas de conteúdo misto para proteger <b>todos</b> os visitantes, incluindo os que usam navegadores antigos ou desatualizados.




{# wf_devsite_translation #}
