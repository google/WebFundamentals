---
layout: updates/post
title: "Yo Polymer – A Whirlwind Tour Of Web Component Tooling"
description: "A whirlwind tour of Web Components, Polymer and front-end tooling for them."
published_on: 2014-01-20
updated_on: 2014-01-20
authors:
  - addyosmani
tags:
  - news
  - frontend
  - polymer
  - webcomponents
  - tools
---
[Web Components](http://www.w3.org/TR/components-intro/) are going to change everything you think you know about building for the web. For the first time, the web will have low level APIs allowing us to not only create our own HTML tags but also encapsulate logic and CSS. No more global stylesheet soup or boilerplate code! It’s a brave new world where everything is an element.

In my talk from [DotJS](http://dotjs.eu), I walk through what Web Components have to offer and how to build them using modern tooling. I’ll show you [Yeoman](http://yeoman.io), a workflow of tools to streamline creating web-apps using [Polymer](http://dotjs.eu), a library of polyfills and sugar for developing apps using Web Components in modern browsers today.

{% ytvideo booRxAJblwM %}

## Create custom elements & install elements created by others

**In this talk you will learn:**

* About the four different specs composing Web Components: [Custom Elements](http://www.polymer-project.org/platform/custom-elements.html), [Templates](http://www.polymer-project.org/platform/template.html), [Shadow DOM](http://www.polymer-project.org/platform/shadow-dom.html) and [HTML imports](http://www.polymer-project.org/platform/html-imports.html).
* How to define your own custom elements and install elements created by others using [Bower](http://bower.io)
* Spend less time writing JavaScript and more time constructing pages
* Use modern front-end tooling ([Yeoman](http://yeoman.io)) to scaffold an application using Polymer with [generator-polymer](github.com/yeoman/generator-polymer)
* How Polymer super changes creating web components.

For example, to install Polymer's Web Component polyfills and the library itself, you can run this one liner:

{% highlight HTML %}
bower install --save Polymer/platform Polymer/polymer
{% endhighlight %}

This adds a `bower_components` folder and adds the above packages. `--save` adds them to your app's bower.json file.

Later, if you wanted to install Polymer's accordion element you could run:

{% highlight HTML %}
bower install --save Polymer/polymer-ui-accordion
{% endhighlight %}

and then import it into your application:

{% highlight HTML %}
<link rel="import" href="bower_components/polymer-ui-accordion/polymer-ui-accordion.html">
{% endhighlight %}

To save time, scaffolding out a new Polymer app with all the dependencies you need, boilerplate code and tooling for optimizing your app can be done with Yeoman with this other one liner:

{% highlight HTML %}
yo polymer
{% endhighlight %}

## Bonus walkthrough

I also recorded a 30 minute bonus walkthrough of the Polymer Jukebox app I show in the talk.

{% ytvideo Yd6Q4Wwvpd0 %}

**Covered in the bonus video:**

* What the “everything is an element” mantra means
* How to use Bower to install Polymer’s Platform polyfills and elements
* Scaffolding our Jukebox app with the Yeoman generator and sub-generators
* Understanding the platform features scaffolded out via boilerplate
* How I functionally ported over an [Angular](https://github.com/jgthms/juketube) app over to Polymer.

We also make use of Yeoman sub-generators for scaffolding our new Polymer elements. e.g to create the boilerplate for an element `foo` we run:

{% highlight HTML %}
yo polymer:element foo
{% endhighlight %}

which will prompt us for whether we would like the element automatically imported, whether a constructor is required and for a few other preferences.

The latest sources for the app shown in both talks are now up on [GitHub](https://github.com/addyosmani/yt-jukebox). I’ve refactored it a little further to be more organized and a little more easy to read.

Preview of the app:

<img src="{{site.WFBaseUrl}}/updates/images/2014/01/yo-polymer/RzEgWhd.png" width="90%"/>

## Further reading

In summary, Polymer is a JavaScript library that enables Web Components now in modern web browsers as we wait for them to be implemented natively. Modern tooling can help improve your workflow using them and you might enjoy trying out Yeoman and Bower when developing your own tags.

A few other articles that are worth checking out on the subject:

* [Building WebApps With Yeoman and Polymer](http://www.html5rocks.com/en/tutorials/webcomponents/yeoman/)
* [Concatenating Web Components With Vulcanize](http://www.polymer-project.org/articles/concatenating-web-components.html)
* [Chrome Dev Summit: Polymer declarative, encapsulated, reusable components](http://updates.html5rocks.com/2014/01/Chrome-Dev-Summit-Polymer-declarative-encapsulated-reusable-components)
* [The Landscape Of Development Automation](http://updates.html5rocks.com/2013/11/The-Landscape-Of-Front-end-Development-Automation-Slides)
* [Web Components: the future of web development](http://html5-demos.appspot.com/static/cds2013/index.html#26)
* [Building Apps With The Yeoman Workflow](http://net.tutsplus.com/tutorials/javascript-ajax/building-apps-with-the-yeoman-workflow/)
