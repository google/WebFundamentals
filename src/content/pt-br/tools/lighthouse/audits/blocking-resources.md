project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para as auditorias do Lighthouse "Site não usa tags de links que retardam a primeira pintura" e "Site não usa tags de script no cabeçalho que retardam a primeira pintura".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# Site não usa recursos que retardam a primeira pintura  {: .page-title }

## Por que a auditoria é importante {: #why }

Carregamentos de página mais rápidos resultam em maior envolvimento dos usuários, mais pageviews e
melhor conversão.

Você pode aumentar a velocidade de carregamento das páginas incluindo em linha os links e scripts
necessários para a primeira pintura e retardando os que não são necessários.

## Como ser aprovado na auditoria {: #how }

No relatório, o Lighthouse lista todos os links ou scripts bloqueadores de renderização
detectados. O objetivo é reduzir esse número.

Como mencionado em [Como a auditoria é implementada](#implementation), o Lighthouse
indica três tipos de links bloqueadores de renderização: importações de scripts, folhas de estilo e
HTML. A forma de otimização depende do tipo de recurso usado.

Observação: quando um recurso é mencionado abaixo como "crítico", isso significa que esse
recurso é necessário para a primeira pintura ou é essencial para a funcionalidade principal
da página.

* Considere a inclusão de scripts críticos em linha no HTML. Para scripts
  não críticos, considere marcá-los com os atributos `async` ou `defer`.
  Consulte [Adicionar interatividade com o JavaScript][js] para saber mais.
* Para folhas de estilo, considere a divisão dos estilos em arquivos diferentes,
  organizados por consulta de mídia e adicionado um atributo `media` a cada
  link da folha de estilo. No carregamento de uma página, o navegador bloqueia a primeira pintura
  somente para recuperar as folhas de estilo correspondentes ao dispositivo do usuário. Consulte
  [CSS bloqueador de renderização][css] para saber mais.
* Marque as importações de HTML não crítico com o atributo `async`. Como
  regra geral, `async` deve ser usado com importações HTML sempre que possível.

[js]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript
[css]: /web/fundamentals/performance/critical-rendering-path/render-blocking-css

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse identifica três tipos de recursos bloqueadores.

Uma tag `<script>` que:

* Está no `<head>` do documento.
* Não tem um atributo `defer`.
* Não tem um atributo `async`.

Uma tag `<link rel="stylesheet">` que:

* Não tem um atributo `disabled`. Quando esse atributo está presente,
  o navegador não baixa a folha de estilo.
* Não tem um atributo `media` correspondente ao dispositivo do usuário.

Uma tag `<link rel="import">` que:

* Não tem um atributo `async`.


{# wf_devsite_translation #}
