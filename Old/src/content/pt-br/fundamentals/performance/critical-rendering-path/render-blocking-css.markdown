---
title: "CSS bloqueador de renderização"
description: "Por padrão, o CSS é tratado como um recurso bloqueador de renderização. Isso significa que o navegador contém a renderização de todo o conteúdo processado até que o CSSOM seja construído. Mantenha seu CSS enxuto, entregue-o o mais rápido possível e use tipos de mídia e consultas para desbloquear a renderização."
updated_on: 2014-09-18
related-guides:
  media-queries:
    -
      title: Use consultas de mídia de CSS para aumentar a capacidade de resposta
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        title: "Web design responsivo"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
key-takeaways:
  render-blocking-css:
    - "Por padrão, o CSS é tratado como um recurso bloqueador de renderização."
    - "Os tipos de mídia e consultas de mídia permitem marcar alguns recursos do CSS como não bloqueadores de renderização."
    - "Todos os recursos do CSS, independentemente do comportamento bloqueador ou não bloqueador, são transferidos pelo navegador."
---

<p class="intro">
  Por padrão, o CSS é tratado como um recurso bloqueador de renderização. Isso significa que o navegador contém a renderização de todo o conteúdo processado até que o CSSOM seja construído. Mantenha seu CSS enxuto, entregue-o o mais rápido possível e use tipos de mídia e consultas para desbloquear a renderização.
</p>

Na seção anterior, vimos que o caminho de processamento essencial exige que tenhamos o DOM e o CSSOM para construir a árvore de renderização. Isso gera uma consequência importante para o desempenho: **tanto HTML quanto CSS são recursos bloqueadores.** O HTML é óbvio, já que sem o DOM não teríamos nada para renderizar, mas a necessidade do CSS pode ser menos óbvia. O que aconteceria se tentássemos renderizar uma página típica sem bloquear a renderização de CSS?

{% include shared/takeaway.liquid list=page.key-takeaways.render-blocking-css %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6--col">
    <b>NYTimes com CSS</b>
    <img class="center" src="images/nytimes-css-device.png" alt="NYTimes com CSS">

  </div>

  <div class="mdl-cell mdl-cell--6--col">
    <b>NYTimes sem CSS (FOUC)</b>
    <img src="images/nytimes-nocss-device.png" alt="NYTimes sem CSS">

  </div>
</div>

{% comment %}
<table class="mdl-data-table mdl-js-data-table">
<tr>
<td>NYTimes com CSS</td>
<td>NYTimes sem CSS (FOUC)</td>
</tr>
<tr>
<td><img src="images/nytimes-css-device.png" alt="NYTimes com CSS" class="center"></td>
<td><img src="images/nytimes-nocss-device.png" alt="NYTimes sem CSS" class="center"></td>
</tr>
</table>
{% endcomment %}

O exemplo acima, mostrando o site do NYTimes com e sem CSS, demonstra por que a renderização é bloqueada até que o CSS esteja disponível: sem o CSS a página é efetivamente inutilizável. Na verdade, a experiência da direita é chamada de `Flash of Unstyled Content` (FOUC). Como resultado, o navegador bloqueará a renderização até ter o DOM e o CSSOM.

> **_CSS é um recurso bloqueador de renderização, informe o cliente o mais rápido possível para otimizar o tempo da primeira renderização._**

Mas, e se tivermos alguns estilos de CSS que só são utilizados em certas circunstâncias, por exemplo, quando a página está sendo impressa ou projetada em um grande monitor? Seria bom se não tivéssemos que bloquear a renderização nesses recursos.

Os "tipos de mídia" e "consultas de mídia" do CSS permitem abordar estes casos de uso:

{% highlight html %}
<link href="style.css" rel="stylesheet">
<link href="print.css" rel="stylesheet" media="print">
<link href="other.css" rel="stylesheet" media="(min-width: 40em)">
{% endhighlight %}

Uma [consulta de mídia]({{site.fundamentals}}/layouts/rwd-fundamentals/use-media-queries.html) consiste em um tipo de mídia e zero ou mais expressões que verifiquem as condições dos recursos dessa mídia específica. Por exemplo, nossa primeira declaração da folha de estilo não fornece tipos ou consultas de mídia, portanto se aplica em todos os casos, ou seja, é sempre bloqueadora de renderização. Por outro lado, a segunda folha de estilos se aplica apenas quando o conteúdo está sendo impresso. Talvez você queira reorganizar o layout, alterar as fontes etc. por isso, essa planilha não precisa bloquear a renderização da página quando é carregada pela primeira vez. Finalmente, a última declaração da folha de estilos proporciona uma `consulta de mídia`, que é executada pelo navegador: se as condições forem correspondentes, o navegador bloqueará a renderização até que a folha de estilos seja transferida e processada.

Usando consultas de mídia, nossa apresentação pode ser ajustada a casos de uso específicos no lugar da impressão e também para dinamizar as condições, como alterações na orientação da tela, redimensionar eventos e muito mais. **Ao fazer a declaração de seus recursos da folha de estilo, preste atenção no tipo de mídia e nas consultas, pois elas têm um grande impacto sobre o desempenho do caminho de processamento essencial.**

{% include shared/related_guides.liquid inline=true list=page.related-guides.media-queries %}

Analisaremos alguns exemplos práticos:

{% highlight html %}
<link href="style.css"    rel="stylesheet">
<link href="style.css"    rel="stylesheet" media="all">
<link href="portrait.css" rel="stylesheet" media="orientation:portrait">
<link href="print.css"    rel="stylesheet" media="print">
{% endhighlight %}

* A primeira declaração é de um bloqueador de renderização e se encaixa em todas as descrições.
* A segunda declaração também é um bloqueador de renderização: `all` é o tipo padrão e, se você não especificar um tipo, fica configurado automaticamente como `all`. Portanto, a primeira e a segunda declarações são equivalentes.
* A terceira declaração tem uma consulta de mídia dinâmica que será avaliada quando a página estiver sendo carregada. Dependendo da orientação do dispositivo quando a página estiver sendo carregada, portrait.css pode ser bloqueador de renderização (ou não).
* A última declaração se aplica apenas quando a página está sendo impressa, portanto, não bloqueia a renderização quando a página é carregada no navegador pela primeira vez.

Finalmente, observe que `bloqueio de renderização` se refere apenas a se o navegador terá que manter a renderização inicial da página sobre esse recurso. Qualquer que seja o caso, o recurso do CSS é transferido pelo navegador, mas com uma prioridade mais baixa que a dos recursos não bloqueadores.



