project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Você pode influenciar a forma com que o site é exibido quando compartilhado em redes sociais adicionando algumas linhas de código a cada página. Com isso, você pode oferecer prévias com informações mais valiosas do que as que normalmente disponibilizaria e atrair mais pessoas ao seu site.

{# wf_updated_on: 2014-11-08 #}
{# wf_published_on: 2014-10-07 #}

# Descoberta social {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

Você pode influenciar a forma com que o site é exibido quando compartilhado
em redes sociais adicionando algumas linhas de código a cada página. Com isso, você pode oferecer
prévias com informações mais valiosas do que as que normalmente disponibilizaria e atrair
mais pessoas ao seu site.


### TL;DR {: .hide-from-toc }
- Use os microdados do schema.org para fornecer o título da página, uma descrição e uma imagem para o Google+.
- Use o Protocolo Open Graph (OGP) para fornecer o título da página, uma descrição e uma imagem para o Facebook.
- Use cartões do Twitter para fornecer o título da página, uma descrição, uma imagem e um ID do Twitter para o Twitter.

Você pode influenciar a forma com que o site é exibido quando compartilhado
em redes sociais adicionando algumas linhas de código a cada página. Ajuda a gerar mais envolvimento
quando se oferece prévias com informações mais valiosas do que as normalmente oferecidas.
Sem isso, as redes sociais forneceriam apenas informações básicas, sem imagens ou
outras informações úteis. 

Qual dos dois você acha que tem mais chances de receber um clique? As pessoas são atraídas por imagens
e sentem-se mais confiantes de que vão gostar do conteúdo quando veem uma
prévia.

<div class="attempt-left">
  <figure>
    <img src="imgs/gplus-snippet-2.png" srcset="imgs/gplus-snippet-2.png 1x,
      imgs/gplus-snippet-2-2x.png 2x" />
    <figcaption class="success">
      Com a marcação apropriada: temos o título correto, uma descrição
      breve e uma imagem. Adicionar esses itens pode ajudar
      a aumentar o envolvimento.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/gplus-snippet-1.png" srcset="imgs/gplus-snippet-1.png 1x,
      imgs/gplus-snippet-1-2x.png 2x" />
    <figcaption class="warning">
      Sem a marcação correta, só o título da página é
      incluído.
      </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

Quando alguém em uma rede social quer compartilhar o seu site com amigos,
provavelmente escreveria alguma coisa que explicasse o quão incrível ele é antes de compartilhar.
Mas, descrever um site pode ser trabalhoso e pode destacar coisas diferentes em relação ao ponto de vista
do proprietário da página. Alguns serviços restringem o número de caracteres que os usuários
podem adicionar em uma nota.

Adicionando os metadados corretos à sua página, você consegue simplificar o processo
de compartilhamento para os usuários fornecendo um título, uma descrição e uma imagem
atrativa. Isso significa que eles não precisam gastar tempo valioso (nem caracteres)
descrevendo o link.

## Use schema.org + microdados para fornecer fragmentos ricos no Google+

Os rastreadores usam vários métodos para analisar uma página e entender seu conteúdo. Usando
[microdados](http://www.w3.org/TR/microdata/){: .external } e o vocabulário do
[schema.org](https://schema.org/){: .external }, você ajuda os sites sociais e mecanismos
de pesquisa a entender melhor os conteúdos de uma página.

Veja um exemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="microdata" adjust_indentation="auto" %}
</pre>

Embora a maior parte dos metadados esteja embutida na seção "<head>" de uma página web, os microdados
ficam onde há contexto.

### Adicione `itemscope` para definir o escopo dos microdados
Ao adicionar `itemscope`, você pode especificar a tag como um bloco de conteúdos sobre um
determinado item.

### Adicione `itemtype` para definir o tipo do seu site
Você pode especificar o tipo de item usando o atributo `itemtype` junto com o
`itemscope`. O valor de um `itemtype` pode ser determinado de acordo com o tipo
de conteúdo da sua página da web. Veja um exemplo relevante
[nesta página](https://schema.org/docs/full.html).

### Adicione `itemprop` para descrever cada item usando o vocabulário
`itemprop` define propriedades de `itemtype` no escopo. Para fornecer
metadados em sites sociais, os valores comuns para `itemprop` são `name`, `description`
e `image`.

### Saiba mais
Esses microdados fornecem informações semânticas aos rastreadores, normalmente do
[Google+](https://plus.google.com/){: .external } e da Pesquisa do Google. Para saber mais
sobre fragmentos e renderização no Google+, leia os documentos abaixo:

* [Renderização de artigo - Plataforma Google+](/+/web/snippet/article-rendering)
* [Fragmento - Plataforma Google+](/+/web/snippet/)

### Valide fragmentos ricos
Para validar fragmentos ricos no Google+, você pode usar ferramentas como:

* [Ferramenta de teste de dados estruturados](https://www.google.com/webmasters/tools/richsnippets) - Webmaster Tools  

<img src="imgs/webmaster-tools.png" srcset="imgs/webmaster-tools.png 1x, imgs/webmaster-tools-2x.png 2x" />

## Use o protocolo Open Graph (OGP) para oferecer fragmentos ricos pelo Facebook

O [protocolo Open Graph (OGP)](http://ogp.me/){: .external } fornece ao Facebook os
metadados necessários para permitir que as páginas da web tenham a mesma funcionalidade que outros
objetos do Facebook.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="ogp" adjust_indentation="auto" %}
</pre>

Quando incluídos na seção "<head>" da página, esses metadados fornecem
informações de fragmento valiosas quando a página é compartilhada.

### Use tags `meta` `og:` com namespace para descrever os metadados
Uma tag `meta` é composta por um atributo `property` e um atributo `content`.
As propriedades e os conteúdos podem ter os seguintes valores:

<table>
  <thead>
    <tr>
      <th data-th="Property">Propriedade</th>
      <th data-th="Content">Conteúdo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Property"><code>og:title</code></td>
      <td data-th="Content">O título da página da web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:description</code></td>
      <td data-th="Content">A descrição da página da web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:url</code></td>
      <td data-th="Content">O URL canônico da página da web.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:image</code></td>
      <td data-th="Content">URL de uma imagem vinculada à postagem publicada.</td>
    </tr>
    <tr>
      <td data-th="Property"><code>og:type</code></td>
      <td data-th="Content">Uma string que indica o tipo da página da web. Você pode achar uma solução mais indicada para a sua página web <a href="https://developers.facebook.com/docs/reference/opengraph/">aqui</a>.</td>
    </tr>
  </tbody>
</table>

Essas tags "meta" fornecem informações semânticas aos rastreadores dos sites sociais,
normalmente do [Google+](https://plus.google.com/){: .external } e
do [Facebook](https://www.facebook.com/){: .external }.

### Saiba mais
Para saber mais sobre que coisas você pode anexar a uma postagem do Facebook, acesse o site oficial
do protocolo Open Graph.

* [ogp.me](http://ogp.me/){: .external }

### Valide fragmentos ricos
Para validar a sua marcação no Facebook, você pode usar ferramentas como:

* [Depurador](https://developers.facebook.com/tools/debug/){: .external }

## Use cartões do Twitter para fornecer fragmentos ricos no Twitter
Os [cartões do Twitter](https://dev.twitter.com/docs/cards) são uma extensão do
protocolo [Open Graph para Twitter](https://twitter.com/){: .external }. Eles
permitem adicionar anexos de mídia, como imagens e vídeo, a tuítes com um link
para a sua página da web. Adicionando os metadados corretos, os tuítes com links da
sua página terão um cartão que contém os detalhes que você adicionou.

### Use tags "meta" `twitter:` com namespace para descrever os metadados
Para fazer um cartão do Twitter funcionar, [o seu domínio deve
ser aprovado](https://cards-dev.twitter.com/validator) e
conter uma tag "meta" que tenha `twitter:card` como o atributo `name` em vez de o atributo
`property`.
  
Veja um exemplo rápido:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites.html" region_tag="twitter" adjust_indentation="auto" %}
</pre>

Ao atribuir o ID do Twitter ao valor de twitter:site, o Twitter incorpora
essa informação na postagem compartilhada para que as pessoas se sintam mais envolvidas com o proprietário
da página.

<img src="imgs/twitter-card.png" srcset="imgs/twitter-card.png 1x, imgs/twitter-card-2x.png 2x" />

### Saiba mais
Para saber mais sobre os cartões do Twitter, acesse:

* [Site do desenvolvedor do Twitter](https://dev.twitter.com/docs/cards)

### Valide fragmentos ricos
Para validar sua marcação o Twitter disponibiliza:

* [Validador de cartões](https://cards-dev.twitter.com/validator)

## A prática recomendada
Com essas três opções, a melhor coisa que você pode fazer é incluir as três
na sua página da web. Veja um exemplo:

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/discovery/social-discovery/_code/social-sites2.html" region_tag="best_practice" adjust_indentation="auto" %}
</pre>

Observe que os microdados e o OGP compartilham parte da marcação:

* `itemscope` está na tag `head`
* `title` e `description` são compartilhadas entre microdados e OGP
* `itemprop="image"` está usando a tag `link` com o atributo `href` em vez de
reutilizar a tag `meta` com `property="og:image"`
  
Para fechar, não deixe de confirmar que sua página web é exibida como o esperado em cada
rede social antes de publicar.



{# wf_devsite_translation #}
