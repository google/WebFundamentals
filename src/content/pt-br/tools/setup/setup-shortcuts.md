project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Configure atalhos para tarefas da linha de comando que você usa com frequência. Se perceber que está digitando várias vezes a mesma coisa na linha de comando, isso ajudará você.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2014-09-24 #}

# Configurar atalhos para a linha de comando {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

Configure atalhos para tarefas da linha de comando que você usa com frequência. Se perceber que está digitando várias vezes a mesma coisa na linha de comando, isso ajudará você.


### TL;DR {: .hide-from-toc }
- Faça a linha de comando trabalhar para você: crie alias fáceis de lembrar e rápidos de digitar.
- Teste os arquivos dot do Github para salvar, compartilhar e sincronizar com os seus atalhos da linha de comando.


## Como configurá-los

O modo mais fácil de criar atalhos para a linha de comando é adicionar alias para comandos
comuns ao arquivo bashrc. Em Mac ou Linux:

1. Em qualquer lugar da linha de comando, digite:

        open -a 'Sublime Text' ~/.bashrc

2. Adicione um novo alias, por exemplo:

        alias master='git checkout master'

3. Sempre que estiver em uma pasta com o repositório git, poderá executar o comando
   `master` e ele verificará o ramo mestre para você.

Observação: Veja estas instruções para [configurar alias no
Windows](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx).

## Atalhos que recomendamos

Estes são alguns dos comandos que você pode achar úteis.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2" data-th="Command">Comando &amp; alias</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Command">Abrir o editor</td>
      <td data-th="Alias"><code>alias st='open -a "Sublime Text"'</code></td>
    </tr>
    <tr>
      <td data-th="Command">Inicializar um servidor</td>
      <td data-th="Alias"><code>alias server="python -m SimpleHTTPServer"</code></td>
    </tr>
    <tr>
      <td data-th="Command">Acessar uma pasta em que você trabalha regularmente</td>
      <td data-th="Alias"><code>alias p="cd ~/projects"</code></td>
    </tr>
  </tbody>
</table>


## Salvar, compartilhar e sincronizar os atalhos

Armazene seus atalhos e arquivos dot no Github. O maior benefício disso é
que seus atalhos podem ser armazenados em diversos dispositivos e sempre têm uma cópia de segurança.

O Github ainda criou uma [página dedicada para arquivos dot](https://dotfiles.github.io/){: .external }
e muitas pessoas da Equipe do Chrome usaram os
[arquivos dot de Mathias Bynens](https://github.com/mathiasbynens/dotfiles).




{# wf_devsite_translation #}
