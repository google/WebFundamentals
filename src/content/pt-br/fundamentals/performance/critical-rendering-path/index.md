project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Como otimizar o caminho de processamento essencial ao priorizar a exibição de conteúdo relacionado à ação principal que o usuário deseja realizar em uma página.

{# wf_updated_on: 2014-04-27 #}
{# wf_published_on: 2014-03-31 #}

# Caminho de processamento essencial {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


Otimizar o caminho de processamento essencial é muito importante para melhorar o desempenho de nossas páginas: a meta é priorizar e exibir o conteúdo relacionado à ação primária que o usuário deseja realizar na página.

Fornecer uma experiência de Web rápida requer muito trabalho por parte do navegador. A maior parte desse trabalho não aparece para nós, desenvolvedores de Web: escrevemos a marcação e uma bela página aparece na tela. Mas como, exatamente o navegador passa da adoção do HTML, CSS e JavaScript aos pixels renderizados na tela?

Otimizar para o desempenho requer uma compreensão sobre o que acontece nessas etapas intermediárias entre o recebimento dos bytes de HTML, CSS e JavaScript e o processamento necessário para transformá-los em pixels renderizados: esse é o **caminho de processamento essencial**.

<img src="images/progressive-rendering.png" class="center" alt="renderização progressiva da página">

Ao otimizar o caminho de processamento essencial, é possível melhorar significativamente o tempo da primeira renderização das páginas. Além disso, entender o caminho de processamento essencial também serve como base para criar aplicativos interativos com bom desempenho. Acontece que o método para o processamento de atualizações interativas permanece o mesmo, apenas feito em um ciclo contínuo e idealmente em 60 frames por segundo. Mas não vamos nos adiantar. Primeiro, vejamos rápida e detalhadamente como o navegador exibe uma página simples.


## Website Performance Optimization
<div class="attempt-right">
  <figure>
    <img src="images/crp-udacity.png">
  </figure>
</div>

Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages.

[View Course](https://udacity.com/ud884){: .external }




