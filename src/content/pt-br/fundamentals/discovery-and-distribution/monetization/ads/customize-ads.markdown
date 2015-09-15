---
title: "Personalize seus anúncios"
description: "Os melhores anúncios podem aprimorar a experiência do usuário. Embora o conteúdo real do anúncio seja criado por anunciantes, você tem controle sobre o tipo de conteúdo, a cor, o tamanho e a posição desses anúncios."
updated_on: 2014-08-12
key-takeaways:
  tldr: 
    - "Nunca coloque anúncios que possam interferir com a experiência pretendida que o usuário tenha no seu site. Garanta que os anúncios acima da dobra não cubram conteúdo importante."
    - "Sempre use unidades de anúncios ágeis. Se a dimensão inteligente não for o suficiente, alterne para o modo avançado."
    - "Procure oportunidades para integrar anúncio com conteúdo a fim de evitar a invisibilidade de anúncios."
    - "Escolha os estilos de texto que mesclam ou complementam seu site, ou fazem contraste com ele."
notes:
  targeting:
    - "Os anúncios são segmentados com base no conteúdo geral do site, não com base em palavras-chave ou categorias. Se você deseja exibir anúncios relacionados a tópicos específicos, inclua frases e parágrafos completos sobre esses tópicos."
  testing:
    - "Sempre teste seus anúncios em dispositivos e telas diferentes para certificar-se de que o comportamento ágil está funcionamento corretamente."
  images:
    - "Os anunciantes têm controle completo sobre a maneira como seus anúncios são exibidos. Também é possível influenciar os tipos de exibição de anúncio que aparecem no seu site usando a dimensão e o posicionamento de anúncios. No entanto, não é possível controlar o conteúdo da imagem."
---

<p class="intro">
  Os melhores anúncios podem aprimorar a experiência do usuário. Embora o conteúdo real do anúncio seja criado por anunciantes, você tem controle sobre o tipo de conteúdo, a cor, o tamanho e a posição desses anúncios.
</p>


{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## Coloque anúncios nos locais mais benéficos aos usuários

Quando se trata de decidir onde colocar os anúncios no seu site
e quantos anúncios incluir, sempre pense primeiro no usuário.

* Use anúncios para aumentar o conteúdo do site, não o contrário.
* Páginas com excesso de anúncios, anúncios que enviam conteúdo importante para baixo da dobra, anúncios agrupados que dominam o espaço visível ou anúncios sem um rótulo claro resultam em baixa satisfação do usuário e são contra as políticas do Google AdSense.
* Garanta que os anúncios forneçam valor aos usuários. Se você tiver blocos de anúncios que geram receitas significantemente menores ou que impulsionam a diminuição de cliques e visualizações, é provável que eles não estejam fornecendo valor aos usuários.

Amostra de opções de posicionamento para anúncios de dispositivos móveis:

<img src="images/mobile_ads_placement.png" class="center" alt="Amostra de anúncio de imagem de dispositivo móvel">

Para saber mais informações, analise as 
[práticas recomendadas para posicionamento de anúncios] (https://support.google.com/adsense/answer/1282097) do Google AdSense.


## E se o dimensionamento ágil não for suficiente?
Em alguns casos, não basta simplesmente usar anúncios ágeis. Talvez você precise de mais controle sobre o modo como seus anúncios são exibidos.  Nesse caso, alterne para o modo avançado e substitua o dimensionamento inteligente no seu código de unidade de anúncio ágil. 
Por exemplo, controle o tamanho exato dos anúncios usando [media queries]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html):

1. Siga as instruções para [criar uma unidade de anúncio ágil]({{site.fundamentals}}/monetization/ads/include-ads.html#create-ad-units).
2. Na caixa `Código do anúncio`, selecione <strong>Avançado (é necessária a modificação do código)</strong> a partir do menu suspenso `Modo`.
3. Modifique o código do anúncio para definir os tamanhos exatos dos seus anúncios com base no dispositivo do usuário:

{% highlight html %}
<ins class="adsbygoogle adslot_1"
    style="display:block;"
    data-ad-client="ca-pub-1234"
    data-ad-slot="5678"></ins>
<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
{% endhighlight %}

{% link_sample _code/customize.html %}
  Tente
{% endlink_sample %}

Consulte [recursos avançados](https://support.google.com/adsense/answer/3543893) na ajuda do Google AdSense para ver mais informações.

{% include shared/remember.liquid title="Important" list=page.notes.testing %}

## Escolha os estilos que complementam seu site

A [maioria dos anúncios de sucesso](https://support.google.com/adsense/answer/17957) mesclam os estilos do seu site ou contrastam com eles. O Google AdSense oferece um grupo de [estilos de anúncio predefinidos](https://support.google.com/adsense/answer/6002585). Escolha o estilo que melhor combina com seu site ou crie um estilo próprio.

### O que pode ser personalizado

Personalize qualquer dos estilos a seguir em anúncios de texto:

* Cor da borda
* Cor do plano de fundo
* Fonte de texto e o tamanho da fonte
* Cor de texto padrão
* Cor do texto específico para o título do anúncio
* Cor do texto para URLs específicos

### Como aplicar estilos

Ao criar uma nova unidade, aplique um estilo diferente aos anúncios de texto expandindo a propriedade <strong>Estilo do anúncio de texto</strong>:

<img src="images/customize.png" class="center" alt="Estilos de anúncio de texto">

Todos os anúncios de texto usam o estilo <strong>Padrão</strong> do Google AdSense.  É possível usar qualquer um dos estilos predefinidos do jeito que estão, realizar pequenas mudanças no estilo ou criar um estilo personalizado.

Assim que você tiver salvado um novo estilo, é possível aplicá-lo a um já existente ou 
a novos blocos de anúncios:

1. Navegue até [Estilos de anúncio](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES).
2. Selecione o estilo de anúncio que deseja alterar a partir da lista de <strong>Estilos de anúncios disponíveis para todos os seus produtos ativos</strong>.
3. Faça as alterações e <strong>Salve o estilo de anúncio</strong>.

Quando você alterar um estilo existente de anúncio, todos os blocos de anúncios ativos com esse estilo são atualizados automaticamente.

{% include shared/remember.liquid title="Note" list=page.notes.images %}


