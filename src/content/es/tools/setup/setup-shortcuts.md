project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Configura combinaciones de teclas para las tareas de la línea de comandos que usas continuamente. Si tienes que escribir lo mismo en la línea de comandos reiteradamente, esto reducirá el esfuerzo.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-09-24 #}

# Configura combinaciones de teclas para la línea de comandos {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

Configura combinaciones de teclas para las tareas de la línea de comandos que usas continuamente. Si tienes que escribir lo mismo en la línea de comandos reiteradamente, esto reducirá el esfuerzo.


### TL;DR {: .hide-from-toc }
- Deja que la línea de comandos haga todo el esfuerzo; crea alias que puedas recordar fácilmente y escribas rápido.
- Prueba los dotfiles de GitHub para guardar, compartir y sincronizar las combinaciones de teclas de tu línea de comandos.


## Cómo configurarlas

La manera más sencilla para crear combinaciones de teclas de la línea de comandos consiste en agregar alias para comandos
comunes al archivo bashrc. En Mac o Linux:

1. Desde la línea de comandos, en cualquier parte, escribe lo siguiente:

        open -a 'Sublime Text' ~/.bashrc

2. Agrega un alias nuevo; por ejemplo, el siguiente:

        alias master='git checkout master'

3. Cada vez que estés en el directorio con un repositorio de git, podrás ejecutar el comando
   `master` y este se encargará de controla la rama principal.

Note: Consulta estas instrucciones para [configurar alias de
Windows](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx).

## Combinaciones de teclas que recomendamos

Estos son algunos comandos que pueden serte útiles.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2" data-th="Command">Comando y alias</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Command">Abrir el editor.</td>
      <td data-th="Alias"><code>alias st='open -a "Sublime Text"'</code></td>
    </tr>
    <tr>
      <td data-th="Command">Iniciar un servidor.</td>
      <td data-th="Alias"><code>alias server="python -m SimpleHTTPServer"</code></td>
    </tr>
    <tr>
      <td data-th="Command">Ir a un directorio en el que trabajas comúnmente.</td>
      <td data-th="Alias"><code>alias p="cd ~/projects"</code></td>
    </tr>
  </tbody>
</table>


## Guardar, compartir y sincronizar las combinaciones de teclas

Almacena las combinaciones de teclas y los dotfiles en Github. La principal ventaja de esto
es que las combinaciones de teclas se pueden compartir entre dispositivos y siempre se realizan copias de seguridad de ellas.

GitHub incluso creó una [página dedicada para dotfiles](https://dotfiles.github.io/){: .external }
y varios miembros del equipo de Chrome han realizado bifurcaciones de los
[dotfiles de Mathias Bynens](https://github.com/mathiasbynens/dotfiles).




{# wf_devsite_translation #}
