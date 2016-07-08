---
description: "O Chrome DevTools é um conjunto de ferramentas de desenvolvimento web embutidas no Google Chrome."
title: "Chrome DevTools"
translation_priority: 1
translators:
  - alan
---

<div class="wf-devtools-wrapper">

  <div class="wf-subheading wf-devtools-header">
    <div class="page-content">
        <h1><img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/chrome_devtools.svg" alt="Logo do Chrome DevTools">Chrome DevTools</h1>
    </div>

    <div class="page-content mdl-grid">
      <div class="mdl-cell mdl-cell--6-col">
        <p>O Chrome DevTools é um conjunto de ferramentas de desenvolvimento web embutidas no Google Chrome. Utilize o DevTools para percorrer, depurar e testar o seu site.</p>
        <div class="note">
          O <a href="https://tools.google.com/dlpage/chromesxs">Chrome Canary</a> sempre tem o DevTools mais atualizado.
        </div>
      </div>
      <div class="mdl-cell mdl-cell--6-col">
        <ul>
          <li>Selecione <strong>More Tools &gt; Developer Tools</strong> a partir do menu no Chrome.</li>
          <li>Clique com o botão direito no elemento de uma página e selecione Inspect</li>
          <li>
            Utilize <a href="/web/tools/chrome-devtools/iterate/inspect-styles/shortcuts">os atalhos</a>
            <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows)
            ou <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>I</kbd> (Mac)
          </li>
        </ul>
      </div>
    </div>
  </div>

  {% include page-structure/site-promo-banner.liquid %}

  <div class="wf-devtools-panels">

    <h2 class="page-content mdl-typography--font-light">Descubra os Painéis</h2>

    <div class="mdl-tabs mdl-js-tabs page-content">

      <div class="mdl-tabs__tab-bar">
          <a href="#elements" class="mdl-tabs__tab is-active">Elements</a>
          <a href="#console" class="mdl-tabs__tab">Console</a>
          <a href="#sources" class="mdl-tabs__tab">Sources</a>
          <a href="#network" class="mdl-tabs__tab">Network</a>
          <a href="#timeline" class="mdl-tabs__tab">Timeline</a>
          <a href="#profiles" class="mdl-tabs__tab">Profiles</a>
          <a href="#resources" class="mdl-tabs__tab">Resources</a>
          <a href="#security" class="mdl-tabs__tab">Security</a>
          <a href="#devicemode" class="mdl-tabs__tab wf-devtools-tabdivider">Device Mode</a>
          <a href="#remotedebugging" class="mdl-tabs__tab">Remote Debugging</a>
          <a href="#settings" class="mdl-tabs__tab">Settings</a>
      </div>

      <div class="mdl-tabs__panel" id="settings">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/settings.png" alt="Device Mode">
        <p>Aprenda a customizar o DevTools para ele se adequar ao seu fluxo de trabalho.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/shortcuts">Atalhos de teclado</a></li>
          <li><a href="/web/tools/chrome-devtools/settings">Configurações</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="remotedebugging">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/remotedebugging.png" alt="Remote Debugging">
        <p>O Remote Debugging te permite remotamente depurar e capturar a tela de qualquer dispositivo rodando o Chrome no seu Desktop.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/debug/remote-debugging/remote-debugging">Dispositivos de Depuração Remota</a></li>
          <li><a href="/web/tools/chrome-devtools/debug/remote-debugging/local-server">Acesso Remoto ao Seu Site Local</a></li>
          <li><a href="/web/tools/chrome-devtools/debug/remote-debugging/webviews">Depuração Remota de WebViews</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="devicemode">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/devicemode.png" alt="Device Mode">
        <p>Use o Device Mode para construir experiências web totalmente responsivas e mobile-first.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/iterate/device-mode/">Device Mode</a></li>
          <li><a href="/web/tools/chrome-devtools/iterate/device-mode/emulate-mobile-viewports">Teste Viewports Responsivas e Específicas de Dispositivos</a></li>
          <li><a href="/web/tools/chrome-devtools/iterate/device-mode/device-input-and-sensors">Emule Sensores: Geolocalização &amp; Acelerômetro</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel is-active" id="elements">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/elements.png" alt="Elements Panel">
        <p>Use o painel Elements para percorrer o layout e design do seu site manipulando o DOM e o CSS livremente.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/">Inspecione e Ajuste Suas Páginas</a></li>
          <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/edit-styles">Edite os Estilos</a></li>
          <li><a href="/web/tools/chrome-devtools/iterate/inspect-styles/edit-dom">Edite o DOM</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="console">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/console.png" alt="Console Panel">
        <p>Utilize o Console para registrar informações de diagnósticos durante o desenvolvimento ou use-o como uma casca para interagir com o JavaScript na página.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/debug/console/">Utilizando o Console</a></li>
          <li><a href="/web/tools/chrome-devtools/debug/command-line/">Interaja a Partir da Linha de Comando</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="sources">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/sources.png" alt="Sources Panel">
        <p>Depure o seu JavaScript usando breakpoints no painel Sources ou conecte seus arquivos locais via Workspaces para usar o editor do DevTools em tempo real.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/debug/breakpoints/">Debugando com Breakpoints</a></li>
          <li><a href="/web/tools/chrome-devtools/debug/readability/">Debug Código Obfuscado</a></li>
          <li><a href="/web/tools/setup/setup-workflow">Configure a Persistência com Workspaces no DevTools</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="network">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/network.png" alt="Network Panel">
        <p>Use o painel Network para obter conhecimento sobre recursos solicitados e baixados e otimize a performance de carregamento da sua página.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/profile/network-performance/resource-loading">Básicos Sobre o Painel Network</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/network-performance/understanding-resource-timing">Compreendendo o Tempo de Recurso</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/network-performance/network-conditions">Simulando a Velocidade da Conexão</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="timeline">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/timeline.png" alt="Timeline Panel">
        <p>Use o painel Timeline para melhorar a performance do tempo de execução da sua página gravando e explorando vários eventos que acontecem durante o ciclo de vida de um site.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/profile/evaluate-performance/">Como Olhar o Desempenho</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime">Analise o Desempenho do Tempo de Execução</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/forced-synchronous-layouts">Avaliando Layouts Síncronos Forçados</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="profiles">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/profiles.png" alt="Profiles Panel">
        <p>Use o painel Profiles se você precisar de mais informações além do que é oferecido pela Timeline, como por exemplo, para rastrear vazamentos de memória.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/profile/rendering-tools/js-execution">Perfilador de Consumo de CPU do JavaScript</a></li>
          <li><a href="/web/tools/chrome-devtools/profile/memory-problems">Heap Profiler</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="resources">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/resources.png" alt="Resources Panel">
        <p>Use o painel Resources para inspecionar todos os recursos que são carregados, incluindo IndexedDB ou banco de dados Web SQL, local storage e session storage, cookies, cache da aplicação, imagens, fontes, e folhas de estilo.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/iterate/manage-data/">Gerencie dados</a></li>
        </ul>
      </div>

      <div class="mdl-tabs__panel" id="security">
        <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/security.png" alt="Security Panel">
        <p>Use o painel Security para investigar problemas de conteúdo misturado, problemas com certificado e mais.</p>
        <ul>
          <li><a href="/web/tools/chrome-devtools/security/">Security</a></li>
        </ul>
      </div>

    </div>

  </div>


  <div class="wf-devtools-alternate wf-secondaryheading">
    <div class="page-content">
      <h2 class="mdl-typography--font-light">Soluções para o seu Workflow</h2>
      <div class="mdl-grid">
      {% for subdirectory in page.context.subdirectories %}
        {% if subdirectory.subdirectories.size > 0 %}
        <div class="mdl-cell mdl-cell--4-col wf-tools-guide">
          <h3 class="wf-tools-guide__title"><a href="{{subdirectory.index.relative_url}}">{{subdirectory.index.title}}</a></h3>
          <p class="wf-tools-guide__description">{{subdirectory.index.description}}</p>
          {% if subdirectory.subdirectories %}
              {% for sub in subdirectory.subdirectories %}
                <p class="wf-tools-guide__section-link"><a href="{{sub.index.relative_url}}">{{sub.index.title}}</a></p>
              {% endfor %}
          {% endif %}
        </div>
        {% endif %}
      {% endfor %}
      </div>
    </div>
  </div>



  <div class="wf-devtools-alternate">
    <div class="page-content">
      <h2 class="mdl-typography--font-light">Hot Off the Press</h2>

        <div class="android-card-container mdl-grid">
            <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
                <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/teaser1.png" alt="DevTools Tonight">
              </div>
              <div class="mdl-card__title">
                 <h4 class="mdl-card__title-text">DevTools Tonight</h4>
              </div>
              <div class="mdl-card__supporting-text">
                <span class="mdl-typography--font-light mdl-typography--subhead">Assista ao episódio piloto do nosso late-night show e aprenda tudo sobre cores.</span>
              </div>
              <div class="mdl-card__actions">
                 <a class="mdl-button mdl-js-button mdl-typography--text-uppercase" href="https://www.youtube.com/watch?v=nLpNHNlonMs">
                   Assista
                 </a>
              </div>
            </div>

            <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
                <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/teaser2.png" alt="Inspect Devices">
              </div>
              <div class="mdl-card__title">
                 <h4 class="mdl-card__title-text">Inspect Devices</h4>
              </div>
              <div class="mdl-card__supporting-text">
                <span class="mdl-typography--font-light mdl-typography--subhead">Inspecione dispositivos diretamente de dentro do DevTools com a nossa UI renovada.</span>
              </div>
              <div class="mdl-card__actions">
                 <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="/web/updates/2016/02/devtools-digest-supercharged-remote-debugging">
                   Saiba mais
                 </a>
              </div>
            </div>

            <div class="mdl-cell mdl-cell--4-col mdl-card mdl-shadow--3dp">
              <div class="mdl-card__media">
                <img src="{{site.WFBaseUrl}}/tools/chrome-devtools/images/teaser3.png" alt="Class Toggles">
              </div>
              <div class="mdl-card__title">
                 <h4 class="mdl-card__title-text">Class Toggles</h4>
              </div>
              <div class="mdl-card__supporting-text">
                <span class="mdl-typography--font-light mdl-typography--subhead">Desabilite, habilite ou adicione novas Classes aos elementos rapidamente.</span>
              </div>
              <div class="mdl-card__actions">
                 <a class="android-link mdl-button mdl-js-button mdl-typography--text-uppercase" href="/web/updates/2016/02/devtools-digest-supercharged-remote-debugging">
                   Comece agora
                 </a>
              </div>
            </div>

          </div>

    </div>

  </div>

  <div class="wf-devtools-alternate wf-secondaryheading">
    <div class="page-content">
      <h2 class="mdl-typography--font-light">Se Envolva</h2>

      <div class="mdl-grid wf-devtools-getinvolved">

        <div class="mdl-cell--4-col mdl-cell">
          <h3>Connect</h3>
          <ul>
            <li><a href="https://twitter.com/ChromeDevTools">Twitter</a></li>
            <li><a href="https://stackoverflow.com/questions/tagged/google-chrome-devtools">StackOverflow</a></li>
            <li><a href="https://plus.google.com/+GoogleChromeDevelopers">Google+</a></li>
            <li><a href="https://www.youtube.com/user/ChromeDevelopers">YouTube</a></li>
            <li><a href="https://chromiumdev.slack.com/messages/devtools/">Slack</a></li>
          </ul>
        </div>

        <div class="mdl-cell--4-col mdl-cell">
          <h3>Contribua</h3>
          <ul>
            <li><a href="https://crbug.com/new">Reporte um bug</a></li>
            <li><a href="https://developer.chrome.com/devtools/docs/contributing">Como Contribuir</a></li>
          </ul>
        </div>

        <div class="mdl-cell--4-col mdl-cell">
          <h3>Amplie</h3>
          <ul>
            <li><a href="https://developer.chrome.com/devtools/docs/integrating">Integração com DevTools e Chrome</a></li>
            <li><a href="https://developer.chrome.com/extensions/devtools">API de Extensões do DevTools</a></li>
            <li><a href="https://developer.chrome.com/devtools/docs/debugger-protocol">Protocolo do Depurador</a></li>
          </ul>
        </div>
      </div>

    </div>

  </div>

</div>


