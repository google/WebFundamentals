---
layout: article
title: "Set Up Your Editor"
description: "Your code editor is your main development tool; you use it to write and save lines of code. Write better code faster by learning your editor's shortcuts and installing key plugins."
introduction: "Your code editor is your main development tool; you use it to write and save lines of code. Write better code faster by learning your editor's shortcuts and installing key plugins."
article:
  written_on: 2014-05-29
  updated_on: 2014-09-25
  order: 1
collection: set-up
authors:
  - megginkearney
  - mattgaunt
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

## Install Sublime Text Editor

[Sublime](http://www.sublimetext.com/) is a great editor with a solid base level
of functionality which makes writing code a pleasure. You can install a package
manager that makes it easy to install plugins and add new functionality.

**Note**  
Rob Dodson's [blog
post](http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/) on
how to get to know and love Sublime is a great reference for getting the most
out of your editor. The concepts are relevant to any text editor, not just
Sublime.

## Why Use a Package Manager?

Package managers make it easy to find, install, and keep packages & plugins
up-to-date.

<img src="imgs/package_control.png" class="center" alt="Screenshot of Sublime Text Editors Package Control"/>

You can install a Package Manager for Sublime  by following these instructions
[https://sublime.wbond.net/installation](https://sublime.wbond.net/installation).

You only need to do this once, after which see below for our recommended list of
plugins.

## Install Plugins

Plugins help you stay more productive. What are the things you keep having to go
back out to other tools to do?

Linting - there's a plugin for that. Showing what changes haven't been committed
- there are plugins for that. Integration with other tools, such as GitHub,
there are plugins for that.

Package managers make it very easy to find, install, and update plugins:

1. In the Sublime Text editor, open your package manager (ctrl+shift+p).
2. Enter 'Install Package'.
3. Enter the name of the plugin you are looking for (or else browse all
   plugins).

Check out these [trending lists of Sublime Text
plugins](https://sublime.wbond.net/browse). Here are the plugins we love and
recommend you install because they help you speed up your development:

### Autoprefixer

If you want a quick way to add vendor prefixes to your CSS, you can do so with
this handy plugin.

Write CSS, ignoring vendor prefixes and when you want to add them, hit
\`ctrl+shift+p\` and type \`Autoprefix CSS\`.

[We cover how you can automate this in your build
process](https://docs.google.com/a/google.com/document/d/1LdIDK-AsBEuoCz-q5JjlNNJax16kGjtgse-VgoHuyO8/edit#heading=h.fpo2ow8ffilz),
that way your CSS stays lean and you don't need to remember to hit
'ctrl+shift+p\`.

<img src="imgs/sublime-autoprefixer.gif" alt="Sublime Autoprefixer Plugin Example" />

### Gutter Color

Gutter Color shows you a small color sample next to your CSS.

<img src="imgs/sublime-gutter-color.png" alt="Sublime Gutter Color Screenshot" />

The plugin requires ImageMagick. If you are an Mac OS X, we recommend trying the
installer from [CactusLabs](http://cactuslab.com/imagemagick/) (you may need to
restart your machine to get it working).

#### ColorPicker

Pick any color from the palette and add it to your CSS with \`ctrl+shift+c\`.

<img src="imgs/sublime-color-picker.png" alt="Sublime Color Picker Plugin" />

#### Emmet

Adds some useful keyboard shortcuts and snippets to your text editor. Check out
the video on [Emmet.io](http://emmet.io/) for an intro into what it can do (a
personal favorite is the 'Toggle Comment' command).

<img src="imgs/emmet-io-example.gif" alt="Demo of the Emmet.io Plugin" />

#### Git Gutter

Adds a marker in the gutter wherever there is a change made to the file.

<img src="imgs/sublime-git-gutter.png" alt="Screenshot of the Sublime Git Gutter Plugin" />

#### HTML-CSS-JS Prettify

This extension gives you a command to format your HTML, CSS and JS. You can even
prettify your files whenever your save a file.

<img src="imgs/sublime-prettify.gif" alt="Gif of the Sublime Prettify Plugin" />

{% include modules/nextarticle.liquid %}

{% endwrap %}
