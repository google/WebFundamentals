project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: O RAIL é um modelo de desempenho centrado no usuário. Todo app da Web tem estes quatro aspectos distintos no seu ciclo de vida, e o desempenho se relaciona com eles de maneiras muito diferentes: Resposta, animação, ociosidade e carregamento.

{# wf_updated_on: 2015-06-07 #}
{# wf_published_on: 2015-06-07 #}

# Medição do desempenho com o modelo RAIL {: .page-title }

{% include "web/_shared/translation-out-of-date.html" %}

{% include "web/_shared/contributors/megginkearney.html" %}

O RAIL é um modelo de desempenho centrado no usuário. Todo aplicativo web tem estes quatro aspectos distintos no seu ciclo de vida, e o desempenho se relaciona com eles de maneiras muito diferentes:

![Modelo de desempenho RAIL](images/rail.png)


### TL;DR {: .hide-from-toc }

- Foco no usuário, o objetivo final não é fazer o site ser rápido em dispositivos específicos, é deixar os usuários satisfeitos.
- Responder aos usuários imediatamente. Reconhecer o comando do usuário em menos de 100 ms.
- Durante animação ou rolagem, produzir um quadro em menos de 10 ms.
- Maximizar o tempo de ociosidade do encadeamento principal.
- Manter os usuários envolvidos, fornecer conteúdo interativo em menos de 1000 ms.


## Foco no usuário

Torne os usuários o ponto central das suas iniciativas de desempenho.
A maior parte do tempo que os usuários gastam no seu site não é esperando-o carregar,
mas esperando a resposta enquanto o usam.
Saiba como os usuários percebem a lentidão:

<table class="responsive">
  <thead>
      <th colspan="2">Lentidão &amp; Reação do usuário</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0–16 ms</td>
      <td data-th="User Reaction">As pessoas são muito boas em acompanhar
      movimentos e não gostam quando as animações não são fluidas. Os usuários
      consideram animações fluidas desde que 60 novos quadros sejam renderizados
      por segundo. Isso significa 16 ms por quadro, incluindo o tempo necessário para
      o navegador exibir o novo quadro na tela, deixando o aplicativo
      com cerca de 10 ms para produzi-lo.</td>
    </tr>
    <tr>
      <td data-th="Delay">0–100 ms</td>
      <td data-th="User Reaction">Responda a uma ação do usuário dentro dessa janela de tempo e os usuários sentirão que a resposta foi imediata. Qualquer tempo a mais faz com que a conexão entre ação e reação seja rompida.</td>
    </tr>
    <tr>
      <td data-th="Delay">100–300 ms</td>
      <td data-th="User Reaction">Os usuários notam um atraso leve.</td>
    </tr>
    <tr>
      <td data-th="Delay">300–1000 ms</td>
      <td data-th="User Reaction">Nesta janela, as coisas são percebidas como parte de uma progressão natural e contínua de tarefas. Para a maioria dos usuários da web, carregar páginas ou trocar vistas representa uma tarefa.</td>
    </tr>
    <tr>
      <td data-th="Delay">Mais de 1000 ms</td>
      <td data-th="User Reaction">Após 1 segundo, o usuário perde o foco na tarefa que está realizando.</td>
    </tr>
    <tr>
      <td data-th="Delay">Mais de 10.000 ms</td>
      <td data-th="User Reaction">O usuário fica frustrado e provavelmente abandona a tarefa. Pode ou não retornar no futuro.</td>
    </tr>
  </tbody>
</table>

## Resposta: responda em menos de 100 ms

Você tem 100 ms para responder à interação do usuário antes de ele perceber uma lentidão.
Isso se aplica à maioria das interações, como clicar em botões, ativar ou desativar controles
de formulário ou iniciar animações. Essa regra não se aplica a rolagem de toque ou
convencional.

Se você não responder, a conexão entre ação e reação será rompida. Os usuários percebem.

Embora pareça óbvio que responder às ações do usuário de forma imediata é o ideal,
nem sempre é a decisão mais certa.
Use essa janela de 100 ms para fazer outros trabalhos pesados, mas tome cuidado para não parar o usuário.
Se possível, faça o trabalho em segundo plano.

Para ações que precisam de mais de 500 ms para serem concluídas, sempre forneça feedback.

## Animação: produza um quadro em 10ms

As animações não são simplesmente efeitos de IU sofisticados. Por exemplo, rolagem e rolagem
de toque são tipos de animação.

Os usuários percebem quando a taxa de quadros da animação varia.
Seu objetivo é produzir 60 quadros por segundo, e todo quadro tem que passar pelas seguintes etapas:

![Etapas para se renderizar um quadro](images/render-frame.png)

De um ponto de vista puramente matemático, todo quadro tem um "orçamento" de cerca de
16 ms (1000 ms/60 quadros por segundo = 16,66 ms por quadro). Porém, como
os navegadores precisam de algum tempo para exibir o novo quadro na tela, **o seu código
deve finalizar a execução em até 10 ms**.

Em pontos de alta pressão, como as animações, a chave é não fazer nada
onde for possível e absolutamente o mínimo onde não for possível não fazer nada. Sempre que der, use a
resposta de 100 ms para pré-calcular trabalhos demorados para maximizar suas
chances de atingir 60 fps.

Para saber mais, acesse
[Desempenho de renderização](/web/fundamentals/performance/rendering/).

## Ociosidade: maximize o tempo de ociosidade

Use o tempo de ociosidade para concluir trabalhos adiados. Por exemplo, mantenha um mínimo de dados pré-carregados para que o aplicativo carregue rapidamente, e use o tempo de ociosidade para carregar os demais dados.

Os trabalhos adiados devem ser agrupados em blocos de cerca de 50 ms. Caso um usuário comece a interagir, a prioridade é responder a isso.

Para tornar possível uma <resposta de 100 ms,
o aplicativo deve devolver o controle ao encadeamento principal a cada <50 ms,
de forma que ele possa executar o funil de pixels, reagir à interação do usuário e outros.

Trabalhar com blocos de 50 ms permite tanto que a tarefa seja finalizada quanto resposta instantânea.

## Carregamento: entregue conteúdo em menos de 1000 ms

Carregue o site em menos de 1 segundo. Caso contrário, o usuário se dispersa
e a percepção dele de lidar com a tarefa é quebrada.

Concentre-se em
[otimizar o caminho crítico de renderização](/web/fundamentals/performance/critical-rendering-path/)
para desobstruir a renderização.

Você não precisa carregar tudo em menos de 1 segundo para produzir a percepção de um carregamento completo. Use a renderização progressiva e faça algumas coisas em segundo plano. Adie carregamentos não essenciais a períodos de tempo ocioso (veja mais sobre isso no [curso de otimização do desempenho de sites do Udacity](https://www.udacity.com/course/website-performance-optimization--ud884)).

## Resumo das principais métricas do RAIL

Para avaliar o seu site com base nas métricas do RAIL, use a [ferramenta "Timeline"](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) do Chrome DevTools para registrar as ações dos usuários. Em seguida, compare os tempos de registro da "Timeline" com as principais métricas do RAIL:

<table>
  <thead>
      <th>Etapa do RAIL</th>
      <th>Métrica</th>
      <th>Ações do usuário</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>Resposta</strong></td>
      <td data-th="Key Metric">Latência da interação (do toque à gravação) de menos de 100 ms.</td>
      <td data-th="User Test">O usuário toca em um botão (por exemplo, abre o navegador).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animação</strong></td>
      <td data-th="Key Metric">O trabalho de cada quadro (do JS à gravação) é concluído em menos de 16ms.</td>
      <td data-th="User Test">O usuário rola a página, arrasta o dedo (para abrir
        um menu, por exemplo) ou vê uma animação. Ao arrastar, a resposta
        do aplicativo é vinculada à posição do dedo, como puxar para atualizar
        ou arrastar um carrossel. Essa métrica se aplica somente à fase
        contínua de arrastos, não ao início.
      </td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Ociosidade</strong></td>
      <td data-th="Key Metric">Trabalho de JS do encadeamento principal dividido em partes não superiores a 50 ms.</td>
      <td data-th="User Test">O usuário não está interagindo com a página, mas o encadeamento principal deve estar suficientemente disponível para lidar com a próxima interação do usuário.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Carregamento</strong></td>
      <td data-th="Key Metric">Página considerada pronta para uso em 1000 ms.</td>
      <td data-th="User Test">O usuário carrega a página e vê o conteúdo do caminho crítico.</td>
    </tr>
  </tbody>
</table>




{# wf_devsite_translation #}
