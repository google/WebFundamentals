project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Encontrar e consertar conteúdo misto é uma tarefa importante, mas pode ser demorado. Este guia aborda algumas ferramentas que foram disponibilizadas para ajudar no processo.

{# wf_published_on: 2015-09-28 #}
{# wf_updated_on: 2017-07-17 #}

# Como evitar conteúdo misto {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

Success: oferecer suporte a HTTPS no seu site é um passo importante para garantir proteção contra ataques, mas o conteúdo misto pode tornar essa proteção inútil. Para proteger seu site e os usuários, é muito importante encontrar e resolver problemas de conteúdo misto.

Encontrar e consertar conteúdo misto é uma tarefa importante, mas pode ser demorado. Este guia discuta algumas ferramentas e técnicas disponíveis para ajudar no processo. Para saber mais sobre conteúdo misto em si, consulte [O que é conteúdo misto?](./what-is-mixed-content).

### TL;DR {: .hide-from-toc }

* Sempre use URLs https:// ao carregar recursos na página.
* Use o cabeçalho `Content-Security-Policy-Report-Only` para monitorar erros de conteúdo misto no site.
* Use a diretiva CSP `upgrade-insecure-requests` para proteger seus visitantes de conteúdo desprotegido.

## Encontrar e consertar conteúdos mistos 

Encontrar conteúdo misto manualmente pode demorar muito dependendo da quantidade de problemas. O processo descrito neste documento usa o navegador Chrome, no entanto, a maioria dos navegadores modernos oferecem ferramentas semelhantes para ajudar nesse processo.

### Encontrar conteúdo misto acessando o site

Ao acessar uma página HTTPS no Google Chrome, o navegador identifica (com alertas) conteúdos 
mistos na forma de erros e advertências no console JavaScript.

Para ver esses alertas, acesse a nossa página de exemplos de conteúdo misto passivo ou ativo e abra o console JavaScript do Chrome. Você pode abrir o console pelo menu View (_View_ -&gt; _Developer_ -&gt; _JavaScript Console_) ou clicando com o botão direito na página, selecionando "_Inspecionar_" e selecionando "_Console_".

O [exemplo de conteúdo misto passivo](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: .external} da página [O que é conteúdo misto?](what-is-mixed-content#passive-mixed-content){: .external} gera a exibição de advertências de conteúdo misto, como as demonstradas abaixo:

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou um vídeo não confiável. Este conteúdo também deve ser fornecido por HTTPS.">
</figure>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

Enquanto que o exemplo de conteúdo misto ativo gera erros de conteúdo misto a 
serem exibidos:

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou um recurso não confiável. Esta solicitação foi bloqueada. O conteúdo deve ser fornecido por HTTPS.">
</figure>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }


Você precisa consertar os URLs http:// identificados nesses erros e advertências, no código-fonte do seu site. Vale a pena fazer uma lista desses URLs, registrando também a página em que os encontrou para facilitar na hora de consertá-los. 

Observação: Erros e advertências de conteúdo misto só são exibidos para a página em exibição no momento, e o console JavaScript é apagado sempre que se navega para uma nova página. Isso significa que será necessário visualizar todas as páginas do seu site individualmente para encontrar esses erros. Alguns erros podem aparecer somente depois de você interagir com parte da página. Veja o exemplo de conteúdo misto na galeria de imagens do nosso guia anterior.

### Encontrar conteúdo misto no código-fonte

Você pode procurar conteúdo misto diretamente no seu código-fonte. Procure 
`http://` no código e tags que contenham atributos de URL HTTP.
Especificamente, procure tags listadas na seção [tipos de conteúdo misto e seus riscos à segurança](what-is-mixed-content#mixed-content-types--security-threats-associated){: .external} do nosso guia anterior.
Observe que ter `http://` no atributo href de tags de âncora (`<a>`)
muitas vezes não é um problema de conteúdo misto, com algumas notáveis exceções abordadas depois. 

Se você tem uma lista de URLs HTTP de erros e advertências de conteúdo misto do Chrome, 
você também pode procurar essas URLs completas no código para descobrir onde elas 
foram incluídas no seu site. 

### Consertar conteúdo misto

Depois de descobrir onde o conteúdo misto está no código do site, 
siga estas etapas para consertá-lo.

Veja o erro de conteúdo misto no Chrome como exemplo:

<figure>
  <img src="imgs/image-gallery-warning.png" alt="Conteúdo misto: A página foi carregada por HTTPS, mas solicitou uma imagem não confiável. Este conteúdo também deve ser fornecido por HTTPS.">
</figure>

Que você encontrou no código aqui:
 
    <img src="http://googlesamples.github.io/web-fundamentals/.../puppy.jpg">. 

#### Etapa 1

Abra uma nova guia no navegador, insira o URL na barra de endereços 
e troque `http://` por `https://` para verificar se o URL foi disponibilizado via HTTPS.

Se o recurso exibido for o mesmo para **HTTP** e **HTTPS**, está tudo certo.
Siga para a [Etapa 2](#step-2).

<div class="attempt-left">
  <figure>
    <img src="imgs/puppy-http.png">
    <figcaption class="success">
      Imagem HTTP carrega sem erro.
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/puppy-https.png">
    <figcaption class="success">
      Imagem HTTPS carrega sem erro, e é a mesma para HTTP. Siga para a <a href="#step-2">etapa 2</a>!
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Se vir uma advertência de certificado, ou se o conteúdo não puder ser exibido por
**HTTPS**, significa que o recurso não foi disponibilizado de forma segura.

<div class="attempt-left">
  <figure>
    <img src="imgs/https-not-available.png">
    <figcaption class="warning">
      Recurso indisponível por HTTPS
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/https-cert-warning.png">
    <figcaption class="warning">
      Advertência de certificado ao tentar exibir recurso por HTTPS.
     </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Neste caso, você deve considerar uma das seguintes opções:

* Incluir o recurso por um host diferente, se houver um disponível.
* Baixar e hospedar o conteúdo diretamente no seu site, se estiver legalmente apto a fazê-lo.
* Excluir o recurso completamente do site.

#### Etapa 2

Troque o URL de `http://` para `https://`, salve o arquivo-fonte e implemente o arquivo atualizado, se necessário.

#### Etapa 3

Abra a página em que você encontrou o erro e verifique se o erro continua aparecendo.

### Cuidado com o uso de tags fora do padrão

Cuidado com o uso de tags fora do padrão no seu site. Por exemplo, URLs de tag de âncora (`<a>`)
não geram conteúdo misto por si próprios, já que fazem com que o navegador 
siga para uma nova página. Isso significa que normalmente não precisam de conserto. No entanto, 
alguns scripts de galeria de imagens neutralizam o funcionamento da tag `<a>` e 
carregam o recurso HTTP especificado pelo atributo `href` em uma tela de lightbox 
na página, o que gera um problema de conteúdo misto. 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" region_tag="snippet1" adjust_indentation="auto" %}
</pre>

[Experimente](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

No código acima, pode parecer seguro deixar as tags `<a>` href como `http://`, 
no entanto, se você vir o exemplo e clicar na imagem, vai perceber que 
um recurso de conteúdo misto é carregado e exibido na página. 

## Lidar com conteúdo misto em escala

As etapas manuais acima funcionem bem para sites pequenos, mas para grandes 
ou aqueles que têm diversas equipes de desenvolvimento, pode ser difícil controlar 
todo o conteúdo carregado. Para ajudar nisso, você pode usar a política 
de segurança de conteúdo para instruir o navegador a notificar você sobre conteúdo misto e 
garantir que as páginas nunca carreguem recursos não confiáveis inesperadamente.

### Política de segurança de conteúdo

[**Política de segurança de conteúdo**](/web/fundamentals/security/csp/) (CSP, na sigla em inglês) é um
recurso de navegador que atende a diversos fins e que pode ser usado para gerenciar conteúdo misto em 
escala. O mecanismo de comunicação da CSP pode ser usado para controlar o conteúdo misto do
seu site, e a política de aplicação, para proteger usuários por meio da atualização ou
do bloqueio do conteúdo misto. 

Você pode ativar estes recursos em uma página incluindo o cabeçalho 
`Content-Security-Policy` ou `Content-Security-Policy-Report-Only` na 
resposta enviada pelo seu servidor. Além disso, você pode ativar `Content-Security-Policy` (mas 
**não** `Content-Security-Policy-Report-Only`) usando uma tag `<meta>` 
na seção `<head>` da página. Veja exemplos nas seções 
a seguir.

A CSP é útil em muitos casos externos ao uso de conteúdo misto. Você pode encontrar informações sobre outras diretivas CSP nos seguintes materiais de apoio:

* [Introdução à CSP do Mozilla](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy){: .external}
* [Introdução à CSP do HTML5 Rocks](//www.html5rocks.com/en/tutorials/security/content-security-policy/){: .external}
* [CSP playground](http://www.cspplayground.com/){: .external }
* [Especificações da CSP](//www.w3.org/TR/CSP/){: .external }

Observação: Os navegadores impõem <b>todas</b> as políticas de segurança de conteúdo que recebem.
Os diversos valores do cabeçalho CSP recebidos pelo navegador no cabeçalho de resposta ou em elementos
`<meta>` são combinados e impostos juntos, como uma única política.
As políticas de denúncia são combinadas da mesma forma. A interseção das políticas forma a
combinação, ou seja, cada política após a primeira só pode restringir
mais o conteúdo permitido, não ampliá-lo.

### Encontrar conteúdo misto com a política de segurança de conteúdo 

Você pode usar a política de segurança de conteúdo para coletar relatórios de conteúdo misto do seu 
site. Para ativar este recurso, ative a diretiva `Content-Security-Policy-Report-Only` 
adicionando-a como cabeçalho de resposta no seu site. 

Cabeçalho de resposta:  

    Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint 


Sempre que um usuário acessar uma página do seu site, o navegador enviará relatórios com 
formato JSON sobre tudo que violar a política de segurança de conteúdo para 
`https://example.com/reportingEndpoint`. Neste caso, sempre que um 
sub-recurso for carregado por HTTP, um relatório será enviado. Estes relatórios incluem o 
URL da página em que a violação da política ocorreu e o URL do sub-recurso que 
violou a política. Se você configurar seu ponto de extremidade de comunicação para registrar estes 
relatórios, será possível controlar o conteúdo misto do seu site sem precisar acessar cada 
página. 

As duas ressalvas disso são:

* Os usuários precisam acessar a página em um navegador que entenda o cabeçalho CSP.
  Isso ocorre na maioria dos navegadores modernos.
* Você só recebe relatórios de páginas acessadas pelos usuários. Então, se houver páginas 
  que não têm muito tráfego, isso pode ocorrer algum tempo antes de você receber os relatórios do 
  site todo.

Para obter mais informações sobre o formato do cabeçalho CSP, veja a [especificação da Política de segurança de conteúdo](https://w3c.github.io/webappsec/specs/content-security-policy/#violation-reports){: .external}. 

Se não quiser configurar um ponto de extremidade de comunicação por conta própria, 
o [https://report-uri.io/](https://report-uri.io/){: .external} é uma boa 
alternativa.

### Atualizar solicitações não confiáveis

Uma das ferramentas mais novas e melhores para consertar conteúdo 
misto automaticamente é a diretiva CSP 
[**`upgrade-insecure-requests`**](//www.w3.org/TR/upgrade-insecure-requests/){: .external}. Esta diretiva instrui o navegador a atualizar URLs não confiáveis 
antes de fazer solicitações de rede.

Como exemplo, se uma página contiver uma tag de imagem com um URL HTTP:

 
    <img src="http://example.com/image.jpg"> 


O navegador cria uma solicitação confiável para 
<code><b>https:</b>//example.com/image.jpg</code>, logo, protegendo o usuário de conteúdo
misto.

Você pode ativar este comportamento enviando um cabeçalho `Content-Security-Policy` 
com esta diretiva:


    Content-Security-Policy: upgrade-insecure-requests  


Ou incorporando essa mesma diretiva em linha na seção `<head>` 
do documento usando um elemento `<meta>`:

  
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">  


Vale ressaltar que, se o recurso não for disponibilizado por HTTPS, a 
solicitação atualizada falhará e o recurso não será carregado. Isto mantém a 
segurança da sua página. 

A diretiva `upgrade-insecure-requests` opera em cascata nos documentos `<iframe>`, 
garantindo proteção para toda a página.

### Bloquear todos os conteúdos mistos

Nem todos os navegadores oferecem suporte à diretiva upgrade-insecure-requests, então uma 
alternativa para 
proteger os usuários é a diretiva CSP
[**`block-all-mixed-content`**](http://www.w3.org/TR/mixed-content/#strict-checking){: .external}. Esta diretiva instrui o navegador a nunca carregar conteúdo misto. 
Toda solicitação de recurso de conteúdo misto é bloqueada, incluindo conteúdo misto ativo 
e passivo. Esta opção também opera em cascata em documentos `<iframe>`, 
garantindo que toda a página não tenha conteúdo misto.

Uma página pode optar por este comportamento enviando um 
 cabeçalho `Content-Security-Policy` com esta diretiva:

  
    Content-Security-Policy: block-all-mixed-content  


Ou incorporando essa mesma diretiva em linha na seção `<head>` 
do documento usando um elemento `<meta>`:

  
    <meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">


A desvantagem de usar `block-all-mixed-content` é que, talvez obviamente, todo
conteúdo é bloqueado. Esta é uma melhoria de segurança, mas faz com que estes 
 recursos não fiquem mais disponíveis na página. Isto pode comprometer os recursos e 
conteúdos que os usuários esperam que estejam disponíveis. 

### Alternativas à CSP

Se o site for hospedado por uma plataforma como o Blogger, você pode não ter 
acesso para modificar cabeçalhos e adicionar uma CSP.
Uma alternativa viável pode ser usar 
um rastreador de sites, como o [HTTPSChecker](https://httpschecker.net/how-it-works#httpsChecker){: .external } 
ou o [Mixed Content Scan](https://github.com/bramus/mixed-content-scan){: .external } para encontrar 
problemas 
no seu site.


{# wf_devsite_translation #}
