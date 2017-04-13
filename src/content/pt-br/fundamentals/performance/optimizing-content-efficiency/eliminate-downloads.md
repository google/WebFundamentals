project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Você deve auditar seus recursos periodicamente para garantir que cada recurso esteja ajudando a proporcionar uma experiência melhor ao usuário.

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2014-03-31 #}

# Eliminar Downloads Desnecessários {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

### TL;DR {: .hide-from-toc }
* Faça um inventário de todos os ativos próprios e de terceiros em suas páginas.
* Meça o desempenho de cada ativo: seu valor e seu desempenho técnico.
* Determine se os recursos fornecem valor suficiente.

O recurso mais rápido e melhor otimizado é o recurso que não é enviado. Você deve eliminar recursos desnecessários do seu aplicativo. É uma boa prática questionar e, periodicamente, rever as suposições implícitas e explícitas com sua equipe. Eis alguns exemplos:

* Você sempre incluiu o recurso X em suas páginas. Será que o custo de baixar e exibir esse curso é compensado pelo valor oferecido ao usuário? Você pode medir e provar seu valor?
* O recurso (particularmente se for um recurso de terceiros) oferece desempenho consistente? Esse recurso está no caminho crítico, ou precisa estar? Se o recurso estiver no caminho crítico, ele pode ser um ponto único de falha para o site? Ou seja, se o recurso não estiver disponível, o desempenho e a experiência do usuário de suas páginas serão afetados?
* Esse recurso precisa ou tem um SLA? Esse recurso segue as práticas recomendadas de desempenho: compressão, armazenamento em cache e assim por diante?

Muitas frequentemente, páginas contêm recursos que são desnecessários, ou pior, que dificultam o desempenho da página sem entregar muito valor para o visitante ou para o site onde está hospedada. Isso se aplica igualmente a recursos e widgets próprios e de terceiros.

* O site A decidiu exibir um carrossel de fotografias na página inicial para permitir que o visitante veja várias fotografias com um clique rápido. Todas as fotografias são carregadas quando a página é carregada e são percorridas pelo usuário.
    * **Pergunta:** Você já mediu quantos usuários visualizam várias fotos no carrossel? Você pode estar gerando uma sobrecarga alta com o download de recursos desnecessários que nunca são visualizados pela maioria dos visitantes.
* O site B decidiu instalar um widget de terceiros para exibir conteúdo relacionado, aprimorar a interação social ou fornecer algum outro serviço.
    * **Pergunta:** Você rastreou quantos visitantes usam o widget ou clicam no conteúdo fornecido pelo widget? O engajamento que este widget gera é suficiente para justificar a sua sobrecarga?

Determinar a eliminação ou não de downloads desnecessários muitas vezes requer um muita consideração e medição cuidadosas. Para obter os melhores resultados, você deve fazer periodicamente um inventário e refazer essas perguntas para todos os ativos em suas páginas.


{# wf_devsite_translation #}
