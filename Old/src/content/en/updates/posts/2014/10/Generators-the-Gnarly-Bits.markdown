---
layout: updates/post
title: "Generators: the Gnarly Bits"
description: "An exploration of ES6 Generators."
published_on: 2014-10-07
updated_on: 2014-10-07
authors:
  - jeffposnick
tags:
  - news
  - iterators
  - generators
  - es6
---

The [ECMAScript 6 draft specification](http://people.mozilla.org/~jorendorff/es6-draft.html) has already yielded many sources of joy for the modern JavaScript developer. We covered some new collections classes and `for..of` iteration loops in a [previous post](http://updates.html5rocks.com/2014/08/Collecting-and-Iterating-the-ES6-Way). In this post, we’re going to talk about something that goes hand-in-hand with `for..of` loops: [generator functions](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generator-function-definitions).

There’s a [host](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*) of [great material](http://www.2ality.com/2013/06/iterators-generators.html) out there already that covers the why and how of using generators. In a nutshell, generators are special functions which create [iterators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/The_Iterator_protocol), and iterators are objects that have a `next()` method, which can be called to obtain a value. Within a generator function, the keyword `yield` provides the value for `next()`. Using `yield` _suspends_ execution of the generator function, preserving the state until `next()` is called again, at which point the code starts back up and continues, until it `yield`s another value (or until the generator function terminates). There are several canonical use cases for generator functions, like [using them](http://wiki.ecmascript.org/doku.php?id=harmony:generators) to iterate over the numbers in the [Fibonacci sequence](http://en.wikipedia.org/wiki/Fibonacci_number).

With the basics out of the way, let’s go in-depth with a JavaScript sample that covers some of the gotchas, or “gnarly bits”, of working with generators. There are extensive comments throughout, and you can play around with the [live version](https://googlechrome.github.io/samples/generators/index.html) of the code before reading through it:

{% comment %}
include_code generators code-block
{% endcomment %}

So what are some big takeaways from the code?

First, constructing a generator results in a unique iterator with it’s own distinct state, and you can pass in parameters to the generator constructor that can control behavior.

Second, you can pass in a parameter when calling an iterator’s `next()` method, and that value will be assigned to whatever’s on the left-hand side of the `yield` statement from the previous iterator invocation. This is a great way to vary the output of the iterator—here, we use it to control whether the word that’s yielded is in uppercase or not. If you want to influence the very first value that’s yielded, do it via a parameter to the generator’s constructor.

Finally, generators can produce either finite or infinite iterators. If you’re working with an infinite iterator, make sure that you have some sort of terminal condition based on the value `yield`ed—it’s very easy to accidentally write infinite loops, especially when using `for..of` for iteration. If you’re working with a finite iterator via calls to `next()`, then the `.done` property of the object that’s returned signals whether iteration is complete.

We hope this sample, along with the other resources available on the web, yields some excitement and gets you thinking about how you can use generators in your own code. Versions of Firefox starting with 31 and Chrome starting with 39 support generators natively. The Regenerator project offers generator support for other browsers, and using Traceur is an option as well.

_Thanks to [Erik Arvidsson](https://twitter.com/ErikArvidsson) for his help reviewing this article._
