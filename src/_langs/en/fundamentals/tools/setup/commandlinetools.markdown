---
layout: article
title: "Set Up Command Line Shortcuts"
description: "Set up shortcuts for the command line tasks you use over and over again. If you find yourself typing the same thing in your command line repeatedly, this will alleviate that."
introduction: "Set up shortcuts for the command line tasks you use over and over again. If you find yourself typing the same thing in your command line repeatedly, this will alleviate that."
article:
  written_on: 2014-09-25
  updated_on: 2014-10-23
  order: 2
collection: set-up
authors:
  - megginkearney
  - mattgaunt
key-takeaways:
  commandlinetools:
    - Make the command line work for you; create aliases that are easy to remember and fast to type.
    - Give Github dotfiles a try to save, share and sync up your command line shortcuts.
notes:
  alias:
    - Check out this list of <a href="http://tjholowaychuk.tumblr.com/post/26904939933/git-extras-introduction-screencast"> Git aliases</a>.
  windows:
    - See these <a href="http://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx">instructions for setting up Windows aliases</a>.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.commandlinetools %}

## How to Set Them Up

The easiest way create command-line shortcuts is to add aliases for common
commands to your bashrc file. On Mac or Linux:

1. From the command line anywhere, type:

        open -a 'Sublime Text' ~/.bashrc

2. Add a new alias, for example:

        alias master='git checkout master'

3. Anytime you are in a directory with a git repo, you can run the command
   `master` and it will checkout the master branch for you.

Note: See these instructions for [setting up Windows
aliases](http://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx).

## Shortcuts We Recommend

These are a few commands that you may find useful.

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="Command">Command</th>
      <th data-th="Alias">Alias</th>
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


## Save, Share and Sync Your Shortcuts

Store your shortcuts and dot files on Github. The major gain with this is
your shortcuts can be shared across devices and they are always backed up.

Github even created a [dedicated page for dotfiles](http://dotfiles.github.io/)
and quite a few of the Chrome Team have forked
[Mathias Bynens' dotfiles](https://github.com/mathiasbynens/dotfiles).

{% include modules/nextarticle.liquid %}

{% endwrap %}
