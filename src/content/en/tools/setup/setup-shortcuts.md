project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Set up shortcuts for the command line tasks you use over and over again. If you find yourself typing the same thing in your command line repeatedly, this will alleviate that.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2014-09-24 #}

# Set Up Command Line Shortcuts {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

Set up shortcuts for the command line tasks you use over and over again. If you find yourself typing the same thing in your command line repeatedly, this will alleviate that.


### TL;DR {: .hide-from-toc }
- Make the command line work for you; create aliases that are easy to remember and fast to type.
- Give Github dotfiles a try to save, share and sync up your command line shortcuts.


## How to set them up

The easiest way to create command-line shortcuts is to add aliases for common
commands to your bashrc file. On Mac or Linux:

1. From the command line anywhere, type:

        open -a 'Sublime Text' ~/.bashrc

2. Add a new alias, for example:

        alias master='git checkout master'

3. Anytime you are in a directory with a git repo, you can run the command
   `master` and it will checkout the master branch for you.

Note: See these instructions for [setting up Windows
aliases](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx).

## Shortcuts we recommend

These are a few commands that you may find useful.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2" data-th="Command">Command &amp; Alias</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Command">Open your editor</td>
      <td data-th="Alias"><code>alias st='open -a "Sublime Text"'</code></td>
    </tr>
    <tr>
      <td data-th="Command">Launch a server</td>
      <td data-th="Alias"><code>alias server="python -m SimpleHTTPServer"</code></td>
    </tr>
    <tr>
      <td data-th="Command">Go to a directory you commonly work in</td>
      <td data-th="Alias"><code>alias p="cd ~/projects"</code></td>
    </tr>
  </tbody>
</table>


## Save, share and sync your shortcuts

Store your shortcuts and dot files on Github. The major gain with this is
your shortcuts can be shared across devices and they are always backed up.

Github even created a [dedicated page for dotfiles](https://dotfiles.github.io/){: .external }
and quite a few of the Chrome Team have forked
[Mathias Bynens' dotfiles](https://github.com/mathiasbynens/dotfiles).


