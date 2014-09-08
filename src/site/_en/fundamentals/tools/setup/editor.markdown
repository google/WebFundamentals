---
layout: article
title: "Choose a Good Editor"
description: "Your code editor is your main development tool; you use it to write and save lines of code. Write better code faster by learning your editor's shortcuts and installing key plugins."
introduction: "Your code editor is your main development tool; you use it to write and save lines of code. Write better code faster by learning your editor's shortcuts and installing key plugins."
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 1
collection: set-up
authors:
  - megginkearney
key-takeaways:
  editor:
    - Choose an editor that lets you customize shortcuts and has lots of plugins to help you write better code.
    - Consider installing a package manager to make it easier to discover, install, and update plugins.
    - Use the package manager to install plugins that help keep you productive during development; start with the recommendations in this guide.
notes:
  blog:
    - Rob Dodson's <a href="http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/">blog post</a> on how to get to know and love Sublime is a great reference for getting the most out of your editor. The concepts are relevant to any text editor, not just Sublime.
---
{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.editor %}

## Truly learn to use your editor

Code editors are the quintessential development tool.
But what makes an editor more than a simple word processor
are its shortcuts that get you working faster.

You know you've truly learned to use your editor
when you are able to quickly move around your code
using a range of keyboard shortcuts and editor commands.
It's always good to keep a cheatsheet handy for editor commands.
Top editors also let you customize commands and keyboard shortcuts
so that you only have to remember your own implementations.

<a href="http://www.sublimetext.com/">Sublime Text</a> is a great editor with tons
of plugins to help you write better code faster. It also has a package manager
that makes it easy to install new plugins. Though Sublime Text costs money, you can
try it for free and this guide assumes Sublime Text as the default editor of
choice.

{% include modules/remember.liquid title="Note" list=page.notes.blog %}

## Install the package manager

Package managers make it easy to find, install, and keep packages / plugins up-to-date.

Here's a sneak peak at what you can do with the
<a href="https://sublime.wbond.net/">Sublime Text package manager</a>.

<img src="imgs/package_control.png" class="center" alt="project files in dist directory">

## There's a plugin for that

Plugins help you stay more productive.
What are the things you keep having to
go back out to other tools to do?

Linting - there's a plugin for that.
Showing what changes haven't been committed -
there are plugins for that.
Integration with other tools,
such as GitHub,
there are plugins for that.

Package managers make it very easy to find, install, and update plugins.

- In the Sublime Text editor, open your package manager (`ctrl+shift+p`).
- Enter 'Install Package'.
- Enter the name of the plugin you are looking for (or else browse all plugins).

Check out these
<a href="https://sublime.wbond.net/browse">trending lists of Sublime Text plugins</a>.
Here are the plugins we love and recommend you install because they help you speed up your development:

<table class="table-2 tc-heavyright">
  <colgroup>
    <col span="1" />
    <col span="1" />
  </colgroup>
  <thead>
    <tr>
      <th data-th="plugin">Plugin</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="plugin"><a href="https://github.com/sindresorhus/sublime-autoprefixer">Autoprefixer</a></td>
      <td data-th="Description">Uses <a href="https://github.com/ai/autoprefixer">Autoprefixer library</a> to prefix properties and values according to the <a href="http://caniuse.com/">Can I Use database</a>.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="http://weslly.github.io/ColorPicker/">ColorPicker</a></td>
      <td data-th="Description">Pick any color from the palette.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="http://emmet.io/">Emmet</a></td>
      <td data-th="Description">Web developer toolkit.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="https://sublime.wbond.net/packages/GitGutter">GitGutter</a></td>
      <td data-th="Description">Shows an icon in the gutter area indicating whether a line has been inserted, modified or deleted.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="https://sublime.wbond.net/packages/HTML-CSS-JS%20Prettify">HTML-CSS-JS Prettify</a></td>
      <td data-th="Description">Formats your HTML, CSS, JavaScript and JSON code so it looks pretty.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="https://github.com/dz0ny/LiveReload-sublimetext2">LiveReload</a></td>
      <td data-th="Description">Live reloading browser support. If you're using the Web Starter Kit, you don't need this plugin.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="https://github.com/robdodson/PolymerSnippets">PolymerSnippets</a></td>
      <td data-th="Description">Keyboard shortcuts to create <a href="http://www.polymer-project.org/">Polymer</a> and Web Component snippets fast.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="https://github.com/bgreenlee/sublime-github">sublime-github</a></td>
      <td data-th="Description">Useful GitHub commands like opening and editing files in GitHub.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="http://www.sublimelinter.com/en/latest/">SublimeLinter</a></td>
      <td data-th="Description">Code linter to help you write cleaner and bug-free code.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="https://github.com/SublimeText/Tag">Tag</a></td>
      <td data-th="Description">Set of utilities to work with HTML/XML tags.</td>
    </tr>
    <tr>
      <td data-th="plugin"><a href="http://buymeasoda.github.io/soda-theme/">Theme - Soda</a></td>
      <td data-th="Description">Dark and light custom UI themes.</td>
    </tr>
  </tbody>
</table>

{% include modules/nextarticle.liquid %}

{% endwrap %}
