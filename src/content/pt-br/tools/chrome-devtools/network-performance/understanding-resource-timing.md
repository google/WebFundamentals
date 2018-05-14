project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: É fundamental entender as fases em que os recursos são coletados pela rede. Esta é a base para consertar problemas de carregamento.

{# wf_published_on: 2016-02-03 #}
{# wf_updated_on: 2016-02-03 #}

# Como entender Resource Timing {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

É fundamental entender as fases em que os recursos são coletados pela rede. Esta é a base para consertar problemas de carregamento.


### TL;DR {: .hide-from-toc }
- Entenda as fases da sincronização de recursos.
- Saiba o que cada fase fornece à Resource Timing API.
- Gere diferentes indicadores de problemas de desempenho no gráfico da linha do tempo, como séries de barras transparentes ou blocos grandes verdes.


Todas as solicitações de rede são consideradas recursos.
Como foram recuperados na rede, os recursos têm ciclos de vida distintos expressos em termos de sincronização.
O painel Network usa a mesma [Resource Timing API](http://www.w3.org/TR/resource-timing) que está disponível para desenvolvedores de aplicativo.

Observação: quando usar a Resource Timing API com recursos de diversas origens, certifique-se
de que todos os recursos tenham cabeçalhos CORS.

A Resource Timing API fornece riqueza de detalhes sobre o tempo de cada ativo a ser recebido.
As fases principais do ciclo de vida da solicitação são:

* Redirecionamento
  * Inicia `startTime` imediatamente.
  * Se um redirecionamento estiver acontecendo, `redirectStart` inicia também.
  * Se um redirecionamento estiver ocorrendo no fim desta fase, `redirectEnd` será obtido.
* Cache do aplicativo
  * Se o cache do aplicativo estiver realizando a solicitação, um tempo de `fetchStart` será obtido.
* DNS
  * O tempo de `domainLookupStart` é obtido no início da solicitação de DNS.
  * O tempo de `domainLookupEnd` é obtido no fim da solicitação de DNS.
* TCP
  * `connectStart` é obtido quando se conecta inicialmente ao servidor.
  * Se TLS ou SSL estiverem em uso, `secureConnectionStart` iniciará quando o handshake começar para proteger a conexão.
  * `connectEnd` é obtido quando a conexão com o servidor é concluída.
* Solicitação
  * `requestStart` é obtido quando a solicitação de um recurso é enviada ao servidor.
* Resposta
  * `responseStart` é o tempo em que o servidor responde inicialmente à solicitação.
  * `responseEnd` é o tempo em que a solicitação encerra e os dados são recuperados.

![Diagrama da Resource Timing API](imgs/resource-timing-api.png)

## Como visualizar no DevTools

Você tem três opções para visualizar as informações de sincronização completas de uma estrada específica do painel Network.

1. Passar o cursor sobre o gráfico de sincronização abaixo da coluna da linha do tempo. Isto apresentará uma janela pop-up que exibe os dados de sincronização completos.
2. Clicar em qualquer entrada e abrir guia Timing dessa entrada.
3. Usar a Resource Timing API para recuperar os dados brutos do JavaScript.

![Informações da Resource Timing](imgs/resource-timing-data.png)

<figure>
<figcaption>
<p>
  Este código pode ser executado no console do DevTools.
  Ele usará a API de sincronização de rede para recuperar todos os recursos.
  Em seguida, filtrará as entradas para buscar uma com um nome que contenha "style.css".
  Se esse nome for encontrado, ele será retornado.
</p>
<code>
  performance.getEntriesByType('resource').filter(item => item.name.includes("style.css"))
</code>
</figcaption>
<img src="imgs/resource-timing-entry.png" alt="Entrada da Resource Timing">
</figure>

<style>
dt:before {
  content: "\00a0\00a0\00a0";
}
dt strong {
  margin-left: 5px;
}
dt.stalled:before, dt.proxy-negotiation:before {
  background-color: #cdcdcd;
}
dt.dns-lookup:before {
  background-color: #1f7c83;
}
dt.initial-connection:before, dt.ssl:before {
  background-color: #e58226;
}
dt.request-sent:before, dt.ttfb:before {
  background-color: #5fdd5f;
}
dt.content-download:before {
  background-color: #4189d7;
}
</style>

<dl>

  <dt class="queued"><strong>Enfileiramento</strong></dt>
  <dd>
    A solicitação de uma fila indica que:
      <ul>
        <li>
        A solicitação foi adiada pelo mecanismo de renderização porque é considerada de baixa prioridade, e não recurso crítico (como scripts/estilos).
        Isso geralmente acontece com imagens.
        </li>
        <li>
        A solicitação foi colocada em espera para aguardar a liberação de um soquete TCP indisponível.
        </li>
        <li>
        A solicitação foi colocada em espera porque o navegador só permite <a href="https://crbug.com/12066">seis conexões TCP</a> por origem em HTTP 1.
        </li>
        <li>
        Tempo gasto realizando entradas no cache do disco (normalmente muito rápido).
        </li>
      </ul>
  </dd>

  <dt class="stalled"><strong> Paralisado/bloqueio</strong></dt>
  <dd>
    Tempo que a solicitação gastou em espera antes de poder ser enviada.
    Ela pode aguardar por qualquer um dos motivos descritos em Enfileiramento.
    Além disso, esse tempo inclui todo tempo gasto em negociação de proxy.
  </dd>

  <dt class="proxy-negotiation"><strong> Negociação de proxy</strong></dt>
  <dd>Tempo gasto na negociação de conexão com um servidor proxy.</dd>

  <dt class="dns-lookup"><strong>Análise de <abbr title="Domain Name System">DNS</abbr></strong></dt>
  <dd>
    Tempo gasto realizando a análise de DNS.
    Cada novo domínio de uma página requer uma viagem de ida e volta completa para realizar a análise de DNS.
  </dd>

  <dt class="initial-connection"><strong> Conexão inicial/conectando</strong></dt>
  <dd>Tempo levado para estabelecer uma conexão, incluindo handshakes/novas tentativas de <abbr title="Transmission Control Protocol">TCP</abbr> e negociação de um <abbr title="Secure Sockets Layer">SSL</abbr>.</dd>

  <dt class="ssl"><strong> SSL</strong></dt>
  <dd>Tempo gasto para concluir um handshake de SSL.</dd>

  <dt class="request-sent"><strong> Solicitação enviada/em envio</strong></dt>
  <dd>
    Tempo gasto emitindo a solicitação de rede.
    Normalmente uma fração de milissegundo.
  </dd>

  <dt class="ttfb"><strong> Aguardando (<abbr title="Time To First Byte">TTFB</abbr>)</strong></dt>
  <dd>
    Tempo gasto aguardando a resposta inicial, também conhecido como Tempo para o primeiro byte.
    Esse tempo captura a latência de uma viagem de ida e volta ao servidor, além do tempo gasto na espera do fornecimento da resposta pelo servidor.
  </dd>

  <dt class="content-download"><strong> Download de conteúdo/baixando</strong></dt>
  <dd>Tempo gasto no recebimento dos dados da resposta.</dd>
</dl>


## Diagnosticar problemas de rede

Há diversos problemas possíveis que podem ser descobertos pelo painel Network.
Poder encontrá-los requer uma boa compreensão de como os clientes e servidores se comunicam e das limitações impostas pelos protocolos.

### Série enfileirada ou paralisada

O problema mais comum visto é uma série de itens enfileirados ou paralisados.
Isso indica que muitos recursos estão sendo recuperados por um único cliente.
Em conexões HTTP 1.0/1.1, o Chrome aplica um máximo de seis conexões TCP por host.
Se você estiver solicitando doze itens de uma vez, os primeiros seis começarão e os outros serão enfileirados.
Quando um do primeiro grupo for finalizado, o primeiro item da fila começará seu processo de solicitação.

![Série paralisada de solicitações](imgs/stalled-request-series.png)

Para consertar este problema de tráfego HTTP 1 tradicional, você precisaria implementar [fragmentação de domínio](https://www.maxcdn.com/one/visual-glossary/domain-sharding-2/).
Isso significa criar diversos subdomínios no seu aplicativo para fornecer recursos a partir deles.
Em seguida, divida os recursos que são fornecidos uniformemente entre os subdomínios.

O reparo para conexões HTTP 1 **não** se aplica a conexões HTTP 2.
Na verdade, ele as prejudica. Se você tem HTTP 2 implementado, não fragmente os domínios dos seus recursos, já que isso trabalha de forma contrária ao modo como HTTP 2 foi desenvolvido para operar.
Em HTTP 2, há uma única conexão TCP com o servidor que atua como uma conexão multiplexada.
Isso elimina o limite de seis conexões do HTTP 1 e diversos recursos podem ser transferidos por uma única conexão simultaneamente.

### Tempo lento para primeiro byte

<small>Também conhecido como: um monte de verde</small>

![Indicador TTFB alto](imgs/indicator-of-high-ttfb.png)

Um tempo lento para o primeiro byte (TTFB) é reconhecido por um alto tempo de espera.
Recomenda-se ter este valor [menor que 200 ms](/speed/docs/insights/Server).
Um TTFB alto revela um de dois principais problemas. Uma das possibilidades:

1. Condições ruins de rede entre cliente e servidor, ou
2. Aplicativo em um servidor de resposta lenta

Para corrigir um TTFB alto, corte o máximo de rede possível.
O ideal é hospedar o aplicativo localmente e ver se ainda há um TTFB alto.
Se houver, o aplicativo precisa ser otimizado quanto a velocidade de resposta.
Isso pode significar otimizar consultas ao banco de dados, implementar cache para determinadas partes do conteúdo ou modificar a configuração do servidor Web.
Há muitos motivos para a lentidão de um back-end.
Você precisará analisar o seu software e descobrir o que não está atendendo a sua meta de desempenho.

Se o TTFB for baixo localmente, as redes entre o cliente e o servidor são o problema.
O percurso da rede pode estar obstruído por diversas coisas.
Há vários pontos entre clientes e servidores, e cada um deles tem suas próprias limitações de conexão que podem causar um problema.
O método mais simples para testar a atenuação desse problema é colocar o aplicativo em outro host e ver se o TTFB melhora.

### Como obter capacidade de transferência

<small>Também conhecido como: um monte de azul</small>

![Indicador de capacidade de transferência](imgs/indicator-of-large-content.png)

Se você perceber muito tempo sendo gasto nas fases de Download de conteúdo, melhorar a resposta ou a concatenação do servidor não ajudará.
A principal solução é enviar menos bytes.


{# wf_devsite_translation #}
