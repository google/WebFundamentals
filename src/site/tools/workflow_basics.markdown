---
layout: article
title: "Developer Workflow Basics"
description: "If your existing developer workflow wasn't created with multiple devices in mind, change is inevitable. Start with the basics."
introduction: "It's easy to get overwhelmed when you're trying to figure out how to adjust your workflow to cover the wide range of platforms and devices. The goal of these docs and the Web Starter Kit is to recommend a workflow, starting point, and set of tools that you can use to developer for the multi-device web."
key-takeaways:
  workflow-basics:
    - Performance and style must be considered at all stages in your workflow.
    - Choose scaffolding or boilerplate built with multi-device in mind.
    - Use tools that make it easy to debug, build, and test across lots of form factors.
notes:
  tbd: 
    - TBD.
article:
  written_on: 2014-05-29
  updated_on: 2014-05-29
  order: 1
#collection: multi-device-tools
---
{% wrap content %}

Don't expect to slightly modify your existing desktop workflow to cater for multiple devices. If you aren't covering the basics, start over.

{% include modules/takeaway.liquid list=page.key-takeaways.workflow-basics %}

{% include modules/toc.liquid %}

##  Consider performance and style at every stage in workflow

Mobile devices have slower CPUs and GPUs than their desktop counterparts and there are many unknowns such as how poor network connectivity or latency might be. It makes it even more important for the experiences we deliver to be as light-weight as possible. Data plans are still very expensive and you don’t want to be the person that cost your users an arm and a leg just to view your site. Performance has to be part of the development conversation from the start.

Need to think about how the basics for mobile development are incorporated
into developer workflow, particularly style.
Have a boilerplate that is responsive and performant.
Have a set of style patterns for devices,
that you then test.
Boilerplate that covers very basic touch patterns, e.g. navigation.

What is a build process?
What types of tasks should you use it to automate?
How should the build process be used in your workflow? 
during iteration
during optimization / deployment
Lots and lots of options. Gulp. Grunt. Brocolli. Make.
Key thing is that regardless of whether you’re using a build *system* vs a GUI like CodeKit is that you’re optimizing what you’ve got
You should be optimizing images/js/css/html, keeping things concatenated and minified where possible. Considering continuous integration performance testing. Have your build system automate finding out whether you’ve regressed on mobile (e.g using visual regression testing tools). Basically, they’re there to help you automate keeping your page small in size. If you aren’t using one, you have to take care of that yourself which is difficult and unpredictable.

## Boilerplate, scaffolding, or blank canvas?

Quick recap of what a boilerplate is
Do you have a boilerplate? If not, you’ll need to choose one
How much opinion are you looking for? 

When initially working on your app, you may find yourself searching for a boilerplate to use for your prototypes. A number of UI frameworks with a mobile focus have appeared over the past few years including Twitter Bootstrap 3, Foundation, Pure and TopCoat.

Pure focuses on components that are as minimalist as possible in size whilst TopCoat maintain a benchmarking suite to test rendering performance regressions so that their components paint to the screen as quickly as possible.

Bootstrap 3 is also very interest as they released moved away from heavily using linear-gradients to a more flat UI design aesthetic. The result of this was a 100% faster increase in paint times meaning that a page using Bootstrap 3 would have components render to glass more quickly than those using Bootstrap 2.x. This is because linear-gradients are (currently) one of those CSS properties that are particularly expensive to draw to the screen. 

Note: whilst boilerplate frameworks can be useful for quickly getting started, keep an eye on how much of their CSS you actually end up using. There are many cases where developers end up using less than 10% of what Bootstrap gives them and you may find it simpler to just roll your own styles.

What are you looking for in a boilerplate? Size + Perf!
Good things to keep an eye out for as you’re building for mobile
Probably need a boilerplate or start from scratch (Designers like Brad Frost opt for PatternLab.io - it’s good but requires you to be aware of a design system). Need to be careful of boilerplates as some are overly minimal and some overly prescriptive without focusing on perf. Web Starter Kit could be that opinionated point for us.
You likely need something mobile-first with rendering performance considerations to keep on the fast-path. Take care to use JS frameworks where they add value rather than getting in the mindset of “you have to, because”.
Mobile-driven framework. CSS, JavaScript? Something like Ionic helps if you’re building with Angular, but again, keep performance in mind. Theres a delicate trade-off of having a framework help with structure and animations/transitions but they’re often optimized for desktop rather than mobile. 
Performance (render, page load) focused is probably the key ingredient for anyone building for the multi-screen web. It can be hard to find boilerplates that are not large. People don’t usually use all of what they get.

What is scaffolding?
From Yeoman: 
Scaffolding, in the Yeoman sense of the word, means generating files for your web app based on your specific configuration requests. In this step, you'll see how Yeoman can generate files specifically for Angular apps — with options for using other external libraries like SASS and Twitter Bootstrap — with minimal effort.
When should you consider using it?
Types of things that can be scaffolded
When you need to use a customized setup. When you generally don’t always start with the exact same baseline every time. 
Yeoman is good for this. Sometimes you might be building something using Angular, sometimes Ember. Or a particular back-end stack. It helps you hit the ground running quickly regardless. Use tools like it if you have a lot of variance in how you start projects, otherwise go for a boilerplate. 

The Web Starter Kit provides recommendations on boilerplate and tooling
for building an experience that works great across multiple devices.
The kit includes defaults for responsive layout and styling.
It's not as formal as a framework;
it's very easy to strip out boilerplate and use something else.

## What's in the Web Starter Kit?

Boilerplate includes: 

* Analytics
* Optional Gulp-based build tooling including:
** LiveReload
** Cross-device syncronization of clicks, scrolls, navigation, form filling.
** Image optimization
** JavaScript minification and optimization
** CSS optimization
* UX pattern samples in a visual style guide
* Performance:
** Out-of-the-box: 60fps experience and 100% PageSpeed score
** Employing PageSpeed Insights and the Chromium Telemetry tools for helping us stay on top of this

## Multi-device testing and tools

Types of testing
Real device
Emulators
Simulators
Cloud testing
Explain the pros and cons of each approach
Simulators and emulators are pretty well captured in http://www.mobilexweb.com/emulators 
http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/ cross device testing is important. We probably want to say something about the general concepts here rather than specific tools. Like, being able to sync clicks, scrolls, navigation between devices is important because you can see exactly what breaks and what visually needs improvement in your RWD design instead of after the fact.

{% include modules/nextarticle.liquid %}

{% endwrap %}
