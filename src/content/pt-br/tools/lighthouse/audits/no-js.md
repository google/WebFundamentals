project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse “A página apresenta conteúdo quando seus scripts não estão disponíveis”.

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# A página apresenta conteúdo quando seus scripts não estão disponíveis  {: .page-title }

## Por que a auditoria é importante {: #why }

O [aprimoramento progressivo](https://en.wikipedia.org/wiki/Progressive_enhancement)
é uma estratégia de desenvolvimento Web que garante que seu site possa ser acessado pelo
maior público possível. A definição mais comum de aprimoramento
progressivo é a seguinte:

O conteúdo básico e a funcionalidade da página devem depender apenas
das tecnologias Web mais fundamentais para garantir que a página possa
ser utilizada em todas as condições de navegação. Experiências avançadas, como estilos
sofisticados que usam CSS ou interatividade usando JavaScript, podem ser distribuídas em camadas superiores
para os navegadores compatíveis com essas tecnologias. No entanto, o conteúdo básico e a funcionalidade
da página não devem depender de CSS ou JavaScript.

## Como ser aprovado na auditoria {: #how }

O aprimoramento progressivo é um tópico amplo e polêmico. Um grupo afirma que,
para aderir à estratégia do aprimoramento progressivo, as páginas devem ser
dispostas em camadas para que o conteúdo básico e a funcionalidade da página exijam apenas HTML. Consulte
[Aprimoramento progressivo: o que é e como usá-lo](https://www.smashingmagazine.com/2009/04/progressive-enhancement-what-it-is-and-how-to-use-it/)
para obter um exemplo dessa abordagem.

Outro grupo acredita que essa abordagem rígida é inviável ou desnecessária
para muitos aplicativos da Web modernos de grande escala, e sugere o uso de
CSS de caminho essencial em linha no documento `<head>` para os estilos de página mais importantes.
Consulte [Caminho de renderização crítico](/web/fundamentals/performance/critical-rendering-path/) para saber mais sobre essa abordagem.

Tendo isso em mente, essa auditoria do Lighthouse faz uma verificação simples para
garantir que sua página não fique em branco quando o JavaScript é desativado. O quão estritamente seu
aplicativo adere ao aprimoramento progressivo é controverso, mas há uma
concessão geral de que todas as páginas devem exibir pelo menos *alguma* informação
quando o JavaScript é desativado, mesmo que esse conteúdo seja apenas um alerta ao usuário
de que o JavaScript é necessário para usar a página.

Para páginas que absolutamente precisem depender do JavaScript, uma possível abordagem é usar um elemento
[`<noscript>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript)
para alertar o usuário de que o JavaScript é necessário para exibir a página. Isso é
melhor do que uma página em branco, pois isso deixaria os usuários na dúvida
sobre se há um problema na página, em seus navegadores ou em seus
computadores.

Para verificar a aparência e o desempenho do seu site quando o JavaScript é desativado, use
o recurso [Disable
JavaScript](/web/tools/chrome-devtools/settings#disable-js) do Chrome DevTools.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

O Lighthouse desativa o JavaScript na página e inspeciona seu HTML. Se
o HTML estiver vazio, a auditoria será reprovada. Se o HTML não estiver vazio, a auditoria será
aprovada.


{# wf_devsite_translation #}
