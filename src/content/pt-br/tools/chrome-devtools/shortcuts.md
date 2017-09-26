project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Uma referência de todos os atalhos de teclado presentes no Chrome DevTools.

{# wf_updated_on: 2016-11-28 #}
{# wf_published_on: 2015-04-29 #}

# Referência de atalhos de teclado {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Esta página é uma referência dos atalhos de teclado presentes no Chrome DevTools.
Apesar de alguns atalhos estarem disponíveis globalmente, outros são válidos apenas em
painéis específicos.

Os atalhos também estão explicados nas dicas. Passe o cursor sobre um elemento da IU do DevTools
para ver a dica relacionada. Se o elemento tiver um atalho, isso será indicado na dica.

## Acessar o DevTools

<table>
  <thead>
      <th>Acesso ao DevTools</th>
      <th>No Windows</th>
      <th>No Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Launch DevTools">Abrir ferramentas para desenvolvedor</td>
      <td data-th="Windows"><kbd class="kbd">F12</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">I</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">I</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Abrir ou alternar entre o modo de inspeção de elemento e a janela do navegador</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Abrir ferramentas para desenvolvedor e transferir foco para o console</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">J</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">J</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Inspecionar o Inspector (desacople o primeiro e pressione)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">I</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">I</kbd></td>
    </tr>
  </tbody>
</table>

## Atalhos de teclado globais

Os atalhos de teclado a seguir estão disponíveis em todos os painéis do DevTools:

<table>
  <thead>
      <th>Atalho global</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Global Shortcuts">Exibir caixa de diálogo General Settings</td>
      <td data-th="Windows"><kbd class="kbd">?</kbd>, <kbd class="kbd">F1</kbd></td>
      <td data-th="Mac"><kbd class="kbd">?</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Próximo painel</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">]</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">]</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Painel anterior</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">[</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">[</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Voltar no painel History</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">[</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">[</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Avançar no painel History</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">]</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">]</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Alterar local de ancoragem</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Abrir Device Mode</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">M</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">M</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Alternar console / fechar configurações quando abertas</td>
      <td data-th="Windows"><kbd class="kbd">Esc</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Esc</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Atualizar página</td>
      <td data-th="Windows"><kbd class="kbd">F5</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">R</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">R</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Atualizar página ignorando conteúdo em cache</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F5</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">R</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">R</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Pesquisa de texto no arquivo ou painel atual</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">F</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Pesquisa de texto em todas as fontes</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">F</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">F</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Pesquisar por nome de arquivo (exceto no Timeline)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Aumentar zoom (com foco no DevTools)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">+</kbd></td>
      <td data-th="Mac"><kbd>Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">+</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Diminuir zoom</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">-</kbd></td>
      <td data-th="Mac"><kbd>Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">-</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Restaurar tamanho de texto padrão</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">0</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">0</kbd></td>
    </tr>
  </tbody>
</table>

## Atalhos de teclado por painel

### Elementos

<table>
  <thead>
      <th>Painel Elements</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Elements Panel">Desfazer alteração</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Z</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Z</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Refazer alteração</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Y</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Y</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Z</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Navegar</td>
      <td data-th="Windows"><kbd class="kbd">Seta para cima</kbd>, <kbd class="kbd">seta para baixo</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Seta para cima</kbd>, <kbd class="kbd">seta para baixo</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expandir/recolher nó</td>
      <td data-th="Windows"><kbd class="kbd">Seta para direita</kbd>, <kbd class="kbd">Seta para esquerda</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Seta para direita</kbd>, <kbd class="kbd">seta para esquerda</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expandir nó</td>
      <td data-th="Windows"><kbd class="kbd">Clique único na seta</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Clique único na seta</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Expandir/recolher nó e todos os seus secundários</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">clique no ícone da seta</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">clique no ícone da seta</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Editar atributo</td>
      <td data-th="Windows"><kbd class="kbd">Enter</kbd>, <kbd class="kbd">clique duplo no atributo</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Enter</kbd>, <kbd class="kbd">clique duplo no atributo</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Ocultar elemento</td>
      <td data-th="Windows"><kbd class="kbd">H</kbd></td>
      <td data-th="Mac"><kbd class="kbd">H</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">Alternar edição como HTML</td>
      <td data-th="Windows"><kbd class="kbd">F2</kbd></td>
      <td data-th="Mac"></td>
    </tr>
  </tbody>
</table>

#### Barra lateral Styles

Atalhos disponíveis na barra lateral Styles:

<table>
  <thead>
      <th>Barra lateral Styles</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Styles Sidebar">Editar regra</td>
      <td data-th="Windows"><kbd class="kbd">Clique único</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Clique único</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Inserir nova propriedade</td>
      <td data-th="Windows"><kbd class="kbd">Clique único no espaço em branco</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Clique único no espaço em branco</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Acessar linha da declaração da propriedade da regra de estilo na fonte</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">clique na propriedade</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">clique na propriedade</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Acessar linha de declaração do valor de propriedade na fonte</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">clique no valor da propriedade</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">clique no valor da propriedade</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Percorrer valor de definição da cor</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">clique na caixa do Color Picker</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">clique na caixa do Color Picker</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Editar propriedade seguinte/anterior</td>
      <td data-th="Windows"><kbd class="kbd">Tab</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Tab</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Tab</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Tab</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Aumentar/reduzir valor</td>
      <td data-th="Windows"><kbd class="kbd">Seta para cima</kbd>, <kbd class="kbd">seta para baixo</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Seta para cima</kbd>, <kbd class="kbd">seta para baixo</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Aumentar/reduzir valor em 10</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">seta para cima</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">seta para baixo</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">seta para cima</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">seta para baixo</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Aumentar/reduzir valor em 10</td>
      <td data-th="Windows"><kbd class="kbd">PgUp</kbd>, <kbd class="kbd">PgDown</kbd></td>
      <td data-th="Mac"><kbd class="kbd">PgUp</kbd>, <kbd class="kbd">PgDown</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Aumentar/reduzir valor em 100</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgUp</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgDown</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgUp</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgDown</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">Aumentar/reduzir valor em 0,1</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">seta para cima</kbd>, <kbd class="kbd">Alt</kbd> + <kbd class="kbd">seta para baixo</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">seta para cima</kbd>, <kbd class="kbd">Opt</kbd> + <kbd class="kbd">seta para baixo</kbd></td>
    </tr>
  </tbody>
</table>

### Sources

<table>
  <thead>
      <th>Painel Sources</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Sources Panel">Pausar/retomar execução do script</td>
      <td data-th="Windows"><kbd class="kbd">F8</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">\</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F8</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">\</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Pular para a próxima chamada de função</td>
      <td data-th="Windows"><kbd class="kbd">F10</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">'</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F10</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">'</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Entrar na próxima chamada de função</td>
      <td data-th="Windows"><kbd class="kbd">F11</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">;</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F11</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">;</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Sair da função atual</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">F11</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">;</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">F11</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">;</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Selecionar próximo frame de chamada</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">.</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">.</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Selecionar frame de chamada anterior</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">,</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">,</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Alternar condição de interrupção</td>
      <td data-th="Windows"><kbd class="kbd">Clique no número da linha</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">B</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Clique no número da linha</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">B</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Editar condição de interrupção</td>
      <td data-th="Windows"><kbd class="kbd">Clique direito no número da linha</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Clique direito no número da linha</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Excluir palavras individuais</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Delete</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">Delete</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Deixar comentário em linha ou texto selecionado</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">/</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">/</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Salvar alterações em modificações locais</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Salvar todas as alterações</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Acessar linha</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">G</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">G</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Pesquisar por nome de arquivo</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Pular para número da linha</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>número</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>número</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Pular para coluna</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>número</i></span> + <span class="kbd">:<i>número</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>número</i></span> + <span class="kbd">:<i>número</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Acessar membro</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Fechar guia ativa</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">W</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">W</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">Executar snippet</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Enter</kbd></td>
    </tr>
  </tbody>
</table>

#### No editor de código

<table>
  <thead>
      <th>Editor de código</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Code Editor">Acessar colchetes correspondentes</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">M</kbd></td>
      <td data-th="Mac"><span class="kbd"></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Pular para número da linha</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>número</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>número</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Pular para coluna</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>número</i></span> + <span class="kbd">:<i>número</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>número</i></span> + <span class="kbd">:<i>número</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Alterar comentário</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">/</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">/</kbd></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Selecionar próxima ocorrência</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="Code Editor">Desfazer última seleção</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">U</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">U</kbd></td>
    </tr>
  </tbody>
</table>

### Timeline

<table>
  <thead>
      <th>Painel Timeline</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Timeline Panel">Iniciar/parar gravação</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">Salvar dados da linha do tempo</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">Carregar dados da linha do tempo</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
  </tbody>
</table>

### Perfis

<table>
  <thead>
      <th>Painel Profiles</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Profiles Panel">Iniciar/parar gravação</td>
	  <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd></td>
	  <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd></td>
    </tr>
  </tbody>
</table>

### Console

<table>
  <thead>
      <th>Atalhos do console</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Console Shortcuts">Aceitar sugestão</td>
      <td data-th="Windows"><kbd class="kbd">Seta para direita</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Seta para direita</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Comando/linha anterior</td>
      <td data-th="Windows"><kbd class="kbd">Seta para cima</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Seta para cima</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Próximo comando/linha</td>
      <td data-th="Windows"><kbd class="kbd">Seta para baixo</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Seta para baixo</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Focar no console</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">`</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">`</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Apagar console</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">L</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">K</kbd>, <kbd class="kbd">Opt</kbd> + <kbd class="kbd">L</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Inserção de várias linhas</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Return</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">Executar</td>
      <td data-th="Windows"><kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Return</kbd></td>
    </tr>
  </tbody>
</table>

### Device mode

<table>
  <thead>
      <th>Atalhos do Device Mode</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Emulation Shortcuts">Aumentar e diminuir zoom com gesto de pinça</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Scroll</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Scroll</kbd></td>
    </tr>
  </tbody>
</table>

#### Com transmissão de tela

<table>
  <thead>
      <th>Atalhos da transmissão de tela</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Screencasting Shortcuts">Aumentar e diminuir zoom com gesto de pinça</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">Scroll</kbd>,<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">clicar e arrastar com dois dedos</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">Scroll</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">clicar e arrastar com dois dedos</kbd></td>
    </tr>
    <tr>
      <td data-th="Screencasting Shortcuts">Ferramenta de inspeção de elemento</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
    </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
