project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Os sites não são acessados só por humanos, mas também pelos rastreadores web dos mecanismos de pesquisa. Saiba como melhorar a precisão e a classificação do seu site nas buscas.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-08-30 #}

# Otimização para buscas {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

Os sites não são acessados só por humanos, mas também pelos rastreadores web dos mecanismos de pesquisa. Saiba como melhorar a precisão e a classificação do seu site nas buscas.

### TL;DR {: .hide-from-toc }
- Determine a estrutura de URLs da sua página.
- Design responsivo é a melhor escolha.
- Use <code>rel='canonical'</code> + <code>rel='alternate'</code> para sites para computador/dispositivo móvel separados.
- Use o cabeçalho <code>Vary HTTP</code> para um único URL que fornece HTMLs separados para computador/dispositivo móvel dinamicamente.
- Use <code>noindex</code> para páginas a que quer limitar o acesso a quem tem o URL.
- Use um bom mecanismo de autenticação para as páginas que quer manter privadas.

## Dê aos mecanismos de pesquisa a estrutura do seu site

Como o seu site aparece nos resultados de uma busca é importante para o design de um site multidispositivos. Esse guia vai ajudar você a otimizar o seu site para os mecanismos de pesquisa com base na sua estrutura de URLs.

Está pensando em criar uma página responsiva? Existe uma versão
específica para dispositivos móveis com um URL diferente? Você oferece a versão de computador e a
de dispositivo móvel com o mesmo URL? Não importa: sempre dá para melhorar
a otimização do seu site para os mecanismos de pesquisa.

### Dê aos mecanismos de pesquisa a estrutura do seu site

Há diversas formas de entregar conteúdo em diferentes dispositivos. Os três métodos mais
comuns são:

**Design web responsivo:** entrega o mesmo HTML por um URL e usa as consultas
de mídia CSS para determinar como o conteúdo é renderizado no cliente.
Por exemplo, se é um computador ou dispositivo móvel: http://www.example.com/

**Site para dispositivos móveis individual:** redireciona os usuários a um URL diferente dependendo do
user-agent. Por exemplo, computador: http://www.example.com/ -
Dispositivo móvel: http://m.example.com/

**Entrega dinâmica:** entre HTML diferente por um URL dependendo do agente
do usuário. Por exemplo, computador e dispositivo móvel: http://www.example.com/

A melhor abordagem é usar o **design web responsivo**, embora muitos sites usem outros métodos.
 
Determine que estrutura de URLs funciona melhor na sua página. Depois, tente aplicar as seguintes práticas
recomendadas para otimizá-la para os mecanismos de pesquisa.

### Recomendamos um design web responsivo

Os benefícios de tornar o seu site responsivo são:

<img class="attempt-right" src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

* Mais fácil de compartilhar para os usuários.
* Carregamento mais rápido sem redirecionamentos.
* URL único nos resultados das buscas.

<div style="clear:both;"></div>
  
Aprenda a criar sites com design web responsivo em [Conceitos básicos do design web responsivo](/web/fundamentals/design-and-ux/responsive/).

### Use `link[rel=canonical]` e `link[rel=alternate]` para fornecer URLs diferentes

Fornecer conteúdos parecidos em uma versão de computador e uma de dispositivo móvel em URLs
diferentes pode gerar confusão para os usuários e os mecanismos de pesquisa, porque não
fica óbvio para os visualizadores que a intenção é que eles sejam idênticos. Você deve indicar:

* Que o conteúdo dos dois URLs é idêntico.
* Qual é a versão para dispositivos móveis.
* Qual é a versão para computador (canônica).

Essas informações ajudam os mecanismos de pesquisa a indexar melhor o conteúdo e garantem que
os usuários encontrem o que procuram em um formato que funciona no dispositivo deles.

#### Use "alternate" para o computador

Ao entregar a versão para computador, indique que há uma versão para dispositivo móvel em
outro URL adicionando uma tag `link` com um atributo `rel="alternate" no atributo `href` que direcione
para a versão para dispositivo móvel.

[http://www.example.com/](http://www.example.com/){: .external } - HTML


    <title>...</title>
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    

#### Use canônico para dispositivos móveis

Ao entregar a versão para dispositivo móvel, indique que há uma versão para computador
(canônica) em outro URL adicionando uma tag `link` com um atributo `rel="canonical"` no atributo `href`
que direcione para a versão para computador. Adicione o atributo `media` com um valor de `"only screen and (max-width: 640px)"` para ajudar os mecanismos de pesquisa
a entender que a versão para dispositivo móvel é voltada explicitamente para telas pequenas.

[http://m.example.com/](http://m.example.com/){: .external } - HTML


    <title>...</title>
    <link rel="canonical" href="http://www.example.com/">
    
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

### Use "Vary" no cabeçalho HTTP

Entregar HTMLs diferentes com base no tipo de dispositivo reduz redirecionamentos desnecessários,
oferece HTML otimizado e fornece apenas um URL para os mecanismos de pesquisa. Mas isso
tem diversas desvantagens:

* Pode haver proxy intermediário entre os navegadores de um usuário e o servidor.
A menos que o proxy saiba que o conteúdo varia de acordo com o user-agent, pode entregar
resultados inesperados.
* Alterar conteúdos de acordo com os riscos do user-agent que estão sendo levados em conta 
["cloaking](https://support.google.com/webmasters/answer/66355)", o que é
uma violação das Diretrizes do Google Webmaster.

Ao fazer com que os mecanismos de pesquisa saibam que o conteúdo varia de acordo com o user-agent,
eles podem otimizar os resultados da pesquisa para o user-agent que está enviando consultas.

Para indicar que o URL entrega HTML diferente dependendo do user-agent, adicione um b
`Vary: User-Agent` no cabeçalho HTTP. Isso permite indexação de busca para tratar
as versões para computador e dispositivo móvel individualmente e intermediar os proxys a armazenar esses
conteúdos da melhor forma possível.

[http://www.example.com/](http://www.example.com/){: .external } - Cabeçalho HTTP


    HTTP/1.1 200 OK
    Content-Type: text/html
    Vary: User-Agent
    Content-Length: 5710
    

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

Para saber mais sobre como criar estrutura de URLs em computadores e dispositivos móveis, leia [criando sites otimizados para smartphones](/webmasters/smartphone-sites/).


## Controle o rastreamento e a indexação dos mecanismos de pesquisa

Estar bem listado nos mecanismos de pesquisa é fundamental para difundir seu site
no mundo, mas uma configuração ruim pode incluir conteúdo inesperado
nos resultados. Esta seção busca ajudar você a evitar esses problemas explicando como
os rastreadores funcionam e como indexam os sites.

Não há lugar melhor para compartilhar informações do que a web. Quando você publica um
documento, ele fica disponível imediatamente para o mundo todo. A página fica
visível para todos que têm o URL. E é aí que os mecanismos de pesquisa entram. Eles tem que conseguir encontrar o seu site.

Porém, há alguns casos em que você não quer que as pessoas encontrem esses
documentos, embora os tenha colocado na web. Por exemplo, só algumas pessoas devem ter acesso a página do administrador
de um blog. Não há
vantagem em deixar as pessoas encontrarem essas páginas nos mecanismos de pesquisa.

Esta seção também mostra como restringir certas páginas dos resultados da pesquisa.


### A diferença entre "rastrear" e "indexar"

Antes de aprender a controlar os resultados das buscas, você precisa entender como os mecanismos de pesquisa interagem com a sua página da web. Do ponto de vista do seu site, há basicamente duas coisas que os mecanismos de pesquisa fazem com o seu site: rastreamento e indexação.  

O **rastreamento** acontece quando um robô do mecanismo de pesquisa selecione a sua página da web para fazer uma análise de conteúdo. O conteúdo é armazenado no banco de dados do mecanismo de pesquisa e pode ser usado para oferecer detalhes dos resultados da busca, classificar páginas e descobrir novas páginas seguindo os links.  

A **indexação** acontece quando um mecanismo de pesquisa armazena o URL de um site e todas as informações associadas em um banco de dados e fica pronto para fornecê-los como o resultado de uma busca. 

Observação: muitas pessoas confundem rastreamento com indexação. Proibir o rastreamento não significa não mostrar a página nos resultados da pesquisa. Por exemplo, se um site qualquer contém um link para uma das suas páginas da web, ela ainda pode ser indexada, mesmo estando bloqueada para rastreamento. Nesse caso, o resultado da pesquisa não fornece uma descrição detalhada.

### Controle o rastreamento com robots.txt

Você pode usar um arquivo de texto chamado `robots.txt` para controlar como os rastreadores obedientes acessam sua página da web. `Robots.txt` é um arquivo de texto simples que descreve como você quer
que os robôs de busca rastreiem seu site. (nem todos os rastreadores necessariamente respeitam
`robots.txt`. Imagine que qualquer pessoa pode criar os próprios rastreadores renegados).

Coloque `robots.txt` no diretório-raiz do host do seu site. Por exemplo,
se o host do seu site é `http://pages.example.com/`, o arquivo `robots.txt`
deve ficar em `http://pages.example.com/robots.txt`. Se o domínio tiver
um esquema diferente, subdomínios ou outras portas, ele é considerado
um host diferente e deve ter um `robots.txt` para cada
diretório-raiz.

Veja um exemplo rápido:  

**http://pages.example.com/robots.txt**

    User-agent: *
    Disallow: /
    

Com isso, indicamos que você quer proibir todos os robôs de rastrear qualquer parte do seu
site.

Veja outro exemplo:

**http://pages.example.com/robots.txt**

    User-agent: Googlebot
    Disallow: /nogooglebot/
    

Você pode especificar o comportamento por robô (user-agent) indicando um nome para
user-agent. No caso acima, você está proibindo o user-agent chamado `Googlebot`
de rastrear `/nogooglebot/` e todo o conteúdo dentro desse diretório, incluindo os em nível inferior na hierarquia de pastas.  

Veja mais detalhes dos robôs de cada mecanismo de pesquisa na página de ajuda deles:

* [Google](/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)


Note: `robots.txt` só é necessário **se** você quiser controlar a forma de rastreamento do seu site. Não retorne o código de resposta 500 para o url: `/robots.txt`. Isso encerra todos os rastreamentos futuros para todo o host, gerando detalhes vazios nos resultados da pesquisa.

#### Teste o robots.txt

Dependendo de que rastreadores o robots.txt trata, os provedores
de mecanismo de pesquisa podem fornecer uma ferramenta para testar o `robots.txt`. Por exemplo, no Google, 
há um validador em
[Webmaster Tools](https://www.google.com/webmasters/tools/robots-testing-tool)
que você pode usar para testar o robots.txt.

<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

O Yandex oferece uma [ferramenta parecida](https://webmaster.yandex.com/tools/robotstxt/).  

### Controle a indexação da pesquisa com metatags

Se não quiser que a sua página web apareça nos resultados das buscas, o robots.txt não
é a solução. Você precisa permitir que essas páginas sejam rastreadas, além
de indicar explicitamente que não quer que elas sejam indexadas. Existem duas soluções:

Para indicar que você não quer que uma página HTML seja indexada, use um tipo específico de tag `<meta>`, uma com seus atributos definidos como `name="robots"` e `content="noindex"`.  


    <!DOCTYPE html>
    <html><head>
    <meta name="robots" content="noindex" />
    

Ao alterar o valor do atributo `name` para ao nome de um user-agent específico, você restringe o escopo. Por exemplo, `name="googlebot"` (não distingue letra maiúscula de minúscula) indica que você não quer que o Googlebot indexe a página.  


    <!DOCTYPE html>
    <html><head>
    <meta name="googlebot" content="noindex" />
    

Veja algumas outras opções para a metatag de robots:  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

#### X-Robots-Tag

Para indicar que você não quer que recursos como imagens, folhas de estilo ou arquivos
de script sejam indexados, adicione `X-Robots-Tag: noindex` em um cabeçalho HTTP.


    HTTP/1.1 200 OK
    X-Robots-Tag: noindex
    Content-Type: text/html; charset=UTF-8
    

Se quiser limitar o escopo a um user-agent específico, insira o nome do user-agent antes de `noindex`.  


    HTTP/1.1 200 OK
    X-Robots-Tag: googlebot: noindex
    Content-Type: text/html; charset=UTF-8
    

Para saber mais sobre a X-Robots-Tag:  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)

Observação: se você proibir os rastreadores de usar `robots.txt`, os robôs de pesquisa ainda poderão indexar essas páginas sem saber que você não quer que elas sejam indexadas. Isso pode acontecer porque:<ul><li>Os robôs de pesquisa podem achar suas páginas da web seguindo links de outros sites.</li><li>Os mecanismos de pesquisa que não podem rastrear não conseguem encontrar <code>noindex</code>.</li></ul>

Não espere que `robots.txt` controle as indexações de busca.

### Exemplos por tipo de conteúdo

Quais são as melhores soluções para controlar o rastreamento e a indexação? Veja alguns exemplos de solução para diferentes tipos de página.

#### Totalmente acessível e buscável por qualquer pessoa

A maioria das páginas da web se enquadram nesse tipo.  

* Não é preciso usar `robots.txt`.
* Não é preciso usar metatags de "robots".

#### Acesso limitado a pessoas que têm o URL

Exemplos:  

* Página de login do console do administrador de um blog.
* URL de conteúdo privado passado para usuários novatos da internet para fins de compartilhamento.

Nesse caso, o melhor é que os mecanismos de pesquisa não indexem essas páginas.  

* Não é preciso usar `robots.txt`.
* Use metatags `noindex` nas páginas HTML.
* Use `X-Robots-Tag: noindex` para recursos não HTML (imagens, PDF etc.)

Observação: pensando se deve proibir o rastreamento de arquivos JavaScript e de folha de estilo? <a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>O Google faz o que pode para entendê-los</a> para conseguir encontrar conteúdos disponibilizados por tecnologias modernas, como o AJAX. Com certeza você deve permitir que os rastreadores rastreiem JavaScript.

#### Acesso restrito a pessoas autorizadas

Nesse caso, mesmo que alguém encontre o URL, o servidor se recusa a apresentar o resultado sem uma credencial. Por exemplo:  

* conteúdo compartilhado de forma privada em uma rede social.
* Sistema de despesas empresarial.

Esses tipos de página, os mecanismos de pesquisa não devem nem rastrear nem indexar.  

* Retorne o código de resposta 401 "Acesso não autorizado" quando houver tentativa de acesso sem uma
credencial válida (ou redirecione o usuário para uma página de login).
* Não use `robots.txt` para proibir o rastreamento dessas páginas. Se não, não será possível excluir o 401.

Aqui, o mecanismo de restrição pode ser um endereço IP, um cookie, uma autenticação básica,
o OAuth e outros. A forma de implementar essa autenticação/autorização depende da sua
infraestrutura e foge ao objetivo desse artigo.

### Solicite a remoção de uma página dos mecanismos de pesquisa

Você pode querer remover o resultado de uma busca quando:  

* A página não existe mais.
* Uma página que contém informações confidenciais foi indexada por acidente.


Os grandes mecanismos de pesquisa oferecem uma forma de enviar uma solicitação para remover essas páginas. O processo normalmente acontece da seguinte forma:  

1. Verifique se a página que você quer remover:
    * Já foi excluída do seu servidor e retorna 404
    * Está configurada para não ser indexada (ex: noindex)

1. Acesse a página de solicitação de cada mecanismo de pesquisa. (o Google e o Bing exigem que você se registre e valide a posse do seu site.)
1. Envie uma solicitação.

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

Dê uma olhas no passo a passo detalhado nas páginas de ajuda de cada mecanismo de pesquisa:  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

### Anexo: Lista de user-agents de rastreador

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)



{# wf_devsite_translation #}
