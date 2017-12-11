project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Otimizar o caminho crítico de renderização é priorizar a exibição do conteúdo relacionado à ação atual do usuário.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Caminho crítico de renderização {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


_Otimizar o caminho crítico de renderização_ é priorizar a exibição do
conteúdo relacionado à ação atual do usuário.

A entrega de uma experiência rápida de web exige muito trabalho do navegador. A maior parte
desse trabalho não aparece para nós, desenvolvedores web: escrevemos a marcação e uma página
bonita é exibida na tela. Mas como exatamente o navegador transforma o
consumo do HTML, CSS e JavaScript em pixels renderizados na tela?

A otimização do desempenho é baseada no entendimento do que acontece nessas
etapas intermediárias entre o recebimento de bytes de HTML, CSS e JavaScript e
o processamento necessário para transformá-los em pixels renderizados. Esse é
o **caminho crítico de renderização**.

<img src="images/progressive-rendering.png"  alt="renderização progressiva da página">

A otimização do caminho crítico de renderização permite reduzir consideravelmente o
tempo da primeira renderização das páginas. Além disso, entender o caminho crítico
de renderização também serve como base para criar aplicativos
interativos com bom desempenho. Na verdade, o processo para as atualizações interativas é o mesmo, mas é feito em loop contínuo e, idealmente, a 60 quadros por segundo. Mas primeiro, vamos ver um resumo de como o navegador exibe uma página mais simples.

<a href="constructing-the-object-model" class="gc-analytics-event"
    data-category="CRP" data-label="Next / Constructing the Object Model">
  <button>A seguir: Desenvolvimento do modelo de objeto</button>
</a>

{% include "web/_shared/udacity/ud884.html" %}


{# wf_devsite_translation #}
