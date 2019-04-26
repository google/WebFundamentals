project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Primeiros passos com a análise do desempenho de rede.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2017-01-17 #}
{# wf_blink_components: Platform>DevTools #}

<style>
.devtools-inline {
  max-height: 1em;
  vertical-align: middle;
}
figcaption {
  text-align: center;
}
</style>

# Primeiros passos com a análise do desempenho de rede no Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Note: consulte [Otimizar a velocidade de sites](/web/tools/chrome-devtools/speed/get-started) para uma
abordagem mais abrangente em relação à melhoria da velocidade de carregamento. Este tutorial contém o fluxo de trabalho recomendado
para análise de desempenho do carregamento.

Aprenda a usar o painel Network do Chrome DevTools para entender em um tutorial interativo passo a passo por que uma página
tem carregamento mais lento.

## Etapa 1: configurar o DevTools {: #set-up }

Suponha que usuários de dispositivos móveis informem que uma página específica do seu site
esteja lenta. Seu trabalho é fazer com que essa página fique rápida.

1. Clique em **Open Slow Page**. A página será aberta em uma nova guia.

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v1.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Slow Page Opened">
       <button>Open Slow Page</button>
     </a>

1. Com a página ainda em foco, pressione
   <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>I</kbd> (Mac) ou
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows, Linux) para
   abrir o DevTools na página.

1. No DevTools clique na guia **Network**.

     <figure>
       <img src="imgs/get-started-network-panel.png"
         alt="O painel Network do Chrome DevTools aberto sobre a
              página lenta a ser diagnosticada.">
       <figcaption>
         <b>Imagem 1</b>. O painel Network do Chrome DevTools aberto ao lado da
         página lenta a ser diagnosticada.
       </figcaption>
     </figure>

     <aside class="note">
       <b>Note:</b> no restante das capturas de tela, o DevTools estará <a
       href="/web/tools/chrome-devtools/ui#placement" target="_blank">
       desancorado em uma janela diferente</a>. Dessa forma, será mais fácil visualizar
       o conteúdo.
     </aside>

1. Ative a função **Capture Screenshots** ![Capture
   Screenshots][screenshots]{:.devtools-inline}. Ela fica na cor azul ao ser ativada.
   O DevTools faz capturas de tela durante o carregamento da página.

## Etapa 2: emular a experiência de um usuário de dispositivo móvel {: #emulate }

O teste de desempenho em laptops ou em computadores desktop pode causar enganos. Sua
conexão com a internet é muito mais rápida do que a de um usuário de dispositivo móvel e seu navegador
armazena informações de visitas anteriores em cache.

1. Marque a caixa de seleção **Disable Cache**. Quando essa
   caixa de seleção está ativada, o DevTools não disponibiliza nenhum recurso do cache.
   Isso emula com mais precisão a experiência dos usuários que acessam sua página
   pela primeira vez.

1. No menu suspenso onde há a informação **No Throttling**, selecione a opção
   **Regular 2G**. O DevTools limita a conexão de rede para simular uma
   experiência 2G comum. Essa é a experiência que usuários de dispositivos móveis têm
   ao acessar seu site em locais de conexão fraca.

<figure>
  <img src="imgs/get-started-setup.svg"
    alt="O painel Network do Chrome DevTools após a configuração de capturas de tela,
         a desativação de cache e a limitação.">
  <figcaption>
    <b>Imagem 2</b>. O painel Network do Chrome DevTools configurado para emular
    a experiência de um usuário de dispositivo móvel. As capturas de tela, a desativação do cache
   e a limitação estão contornadas de azul, respectivamente
 da esquerda pra direita.
  </figcaption>
</figure>

Essa é uma configuração no pior dos casos. Se você conseguir fazer com que sua página
tenha um rápido carregamento nesse tipo de configuração, isso garantirá que ela seja rápida para todos os usuários.

[screenshots]: imgs/capture-screenshots.png

## Etapa 3: analisar as solicitações {: #analyze }

Verifique os motivos que estão causando lentidão. Recarregue a página e analise
as solicitações que aparecerem.

### Parte A: encontre scripts bloqueadores de renderização

Ao encontrar uma tag `<script>`, o navegador precisa pausar a renderização e
executar o script imediatamente. Encontre scripts que não são necessários para o carregamento da página
e marque-os como assíncronos ou postergue a execução deles para carregar mais rapidamente.

1. Pressione <kbd>Command</kbd>+<kbd>R</kbd> (Mac) ou
   <kbd>Control</kbd>+<kbd>R</kbd> (Windows, Linux) para recarregar a página.
   Em uma conexão Wi-Fi de qualidade a página leva mais de 10 segundos para carregar
   completamente.

     <figure>
       <img src="imgs/get-started-post-load.png"
         alt="O painel Network do Chrome DevTools após recarregar a página.">
       <figcaption>
         <b>Imagem 3</b>. O painel Network do Chrome DevTools após recarregar
         a página.
       </figcaption>
     </figure>

1. Verifique o valor de [`DOMContentLoaded`][DOMContentLoaded] no [painel Summary
   ](reference#summary) na parte inferior do painel Network.
   Você verá um valor de pelo menos quatro segundos. Ao visualizar o evento
   com esse atraso no acionamento, procure pelos scripts que estão atrasando
   o carregamento e a análise do documento principal.

1. Clique em **main.js** para continuar investigando essa solicitação. O DevTools exibe um
   conjunto de novas guias que fornece mais informações sobre a solicitação.

1. Clique na guia **Preview** para visualizar o código-fonte da solicitação. Perceba
   que o script trava por apenas 4.000 ms.
   Ao marcar o script com o atributo `async` e movê-lo
   para a parte inferior do `<body>` do documento, a página
 pode ser carregada sem precisar aguardar o script.

     <figure>
       <img src="imgs/get-started-preview.png"
         alt="Visualização do código-fonte para o main.js no painel Preview.">
       <figcaption>
         <b>Imagem 4</b>. Visualização do código-fonte para o <code>main.js</code> no
         painel Preview.
       </figcaption>
     </figure>

Veja [Bloqueio de analisador versus JavaScript assíncrono][async] para saber mais
sobre scripts bloqueadores de renderização.

### Parte B: encontre solicitações extensas

Você percebeu que após o carregamento da página o logotipo do DevTools levou bastante
tempo para carregar? Não há bloqueio do carregamento, mas isso faz com que a página *apareça*
lentamente. Os usuários gostam quando as páginas *aparecem* rapidamente.

1. Clique em **Close** ![Close][close]{:.devtools-inline} para visualizar
   o [**painel Requests**](reference#requests) novamente.

1. Clique duas vezes na captura de tela no canto superior esquerdo.

1. Pressione a tecla direcional à direita para explorar o conjunto de capturas de tela. O
   tempo abaixo da captura de tela indica o momento em que ela foi feita. A
   captura de tela leva alguns segundos para carregar. Isso significa que provavelmente
   se trata de um arquivo muito extenso.

1. Clique em qualquer local fora da captura de tela para minimizá-la.

1. Passe o cursor sobre [Waterfall](reference#waterfall) para a solicitação
   `logo-1024px.png`. A solicitação leva grande parte do tempo
   fazendo o download da imagem. Isso confirma que a imagem é muito grande.

     <figure>
       <img src="imgs/get-started-waterfall.png"
         alt="A cascata para logo-1024px.png.">
       <figcaption>
         <b>Imagem 5</b>. A cascata para <code>logo-1024px.png</code>.
       </figcaption>
     </figure>

[DOMContentLoaded]: https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded

[async]: /web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript#parser_blocking_versus_asynchronous_javascript

[close]: imgs/close.png

## Etapa 4: verificar correções na página atualizada {: #verify }

Você está quase terminando. Suponha agora que você já tenha feito duas mudanças
na página:

* Movimentou o script para o inferior do `<body>` e marcou como `async`
 para evitar que haja bloqueio de carregamento da página.
* Converteu o logotipo para SVG, reduzindo seu tamanho.

Só falta testar a página atualizada para verificar que suas
correções tornam o carregamento de fato mais rápido.

1. Clique em **Open Fast Page**. A página corrigida é aberta em uma nova guia.

     <a href="https://googlechrome.github.io/devtools-samples/network/gs/v2.html"
       target="devtools" class="gc-analytics-event" rel="noopener noreferrer"
       data-category="DevTools / Network / Get Started"
       data-label="Fast Page Opened">
       <button>Open Fast Page</button>
     </a>

1. Configure o DevTools da mesma forma que antes. A captura de tela e a desativação de cache devem
   estar habilitadas e a limitação de rede deve estar configurada como **Regular 2G**.
1. Recarregue a página. A página é carregada muito mais rapidamente.

     <figure>
       <img src="imgs/get-started-post-fix.png"
         alt="Gravação do carregamento da página após a aplicação das correções.">
       <figcaption>
         <b>Imagem 6</b>. Gravação do carregamento da página após a aplicação das
         correções. A página costumava levar cerca de 10 segundos para aparecer visualmente
         completa. Agora leva apenas cerca de um segundo.
       </figcaption>
     </figure>

<aside class="note">
  <b>Observação</b>: embora o carregamento da página esteja muito mais rápido, ela ainda fica inutilizável durante
 aproximadamente cinco segundos. Isso acontece porque ela ainda executa o script que trava
 o thread principal da página.
</aside>

## Próximas etapas {: #next-steps }

Bom trabalho! Agora você é um verdadeiro expert no
painel Network do Chrome DevTools. Bom... talvez um expert ainda não. No entanto, você tem um excelente embasamento
de habilidades e conhecimentos.

* Consulte <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / CRP"
  href="/web/fundamentals/performance/critical-rendering-path">Caminho crítico de
 renderização</a> para saber mais sobre a teoria do carregamento de página extremamente
 rápido.
* Consulte <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Issues Guide" href="issues">Guia de problemas
 de rede</a> para saber como identificar outros problemas de rede.
* Consulte <a class="gc-analytics-event" data-category="DevTools / Network /
  Get Started" data-label="Next Steps / Reference" href="reference">Referência do painel
 Network</a> para uma lista abrangente dos recursos desse painel.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
