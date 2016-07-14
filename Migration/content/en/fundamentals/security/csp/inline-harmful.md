---
layout: shared/narrow
title: "Inline Code Considered Harmful"
description: "It should be clear that CSP is based on whitelisting origins, as that's an unambiguous way of instructing the browser to treat specific sets of resources as acceptable and to reject the rest. This ban includes not only scripts embedded directly in script tags, but also inline event handlers and javascript: URLs."
published_on: 2012-06-15
updated_on: 2016-02-19
authors:
  - mikewest
  - josephmedley
translation_priority: 2
order: 20
---

<p class="intro">
It should be clear that CSP is based on whitelisting origins, as that's an
unambiguous way of instructing the browser to treat specific sets of resources
as acceptable and to reject the rest. Origin-based whitelisting doesn't,
however, solve the biggest threat posed by XSS attacks: inline script injection.
If an attacker can inject a script tag that directly contains some malicious
payload (<code>&lt;script&gt;sendMyDataToEvilDotCom();&lt;/script&gt;</code>),
the browser has no mechanism by which to distinguish it from a legitimate
inline script tag. CSP solves this problem by banning inline script entirely:
<a href="https://www.youtube.com/watch?v=aCbfMkh940Q">it's the only way to be
sure</a>.
</p>

This ban includes not only scripts embedded directly in `script` tags, but also
inline event handlers and `javascript:` URLs. You'll need to move the content of
`script` tags into an external file, and replace `javascript:` URLs and `<a ...
onclick="[JAVASCRIPT]">` with appropriate `addEventListener()` calls. For example,
you might rewrite the following from:

{% highlight html %}
<script>
  function doAmazingThings() {
    alert('YOU AM AMAZING!');
  }
</script>
<button onclick='doAmazingThings();'>Am I amazing?</button>
{% endhighlight %}

to something more like:

{% highlight html %}
<!-- amazing.html -->
<script src='amazing.js'></script>
<button id='amazing'>Am I amazing?</button>
{% endhighlight %}

{% highlight javascript %}
// amazing.js
function doAmazingThings() {
  alert('YOU AM AMAZING!');
}
document.addEventListener('DOMContentReady', function () {
  document.getElementById('amazing')
    .addEventListener('click', doAmazingThings);
});
{% endhighlight %}

The rewritten code has a number of advantages above and beyond working well with
CSP; it's already best practice, regardless of your use of CSP. Inline
JavaScript mixes structure and behavior in exactly the way you shouldn't.
External resources are easier for browsers to cache, more understandable for
developers, and conducive to compilation and minification. You'll write better
code if you do the work to move code into external resources.

Inline style is treated in the same way: both the `style` attribute and `style`
tags should be consolidated into external stylesheets to protect against a
variety of [surprisingly clever](http://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html)
data exfiltration methods that CSS enables.

If you really, absolutely must have inline script and style, you can enable it
by adding `'unsafe-inline'` as an allowed source in a `script-src` or `style-
src` directive. You can also use a nonce or a hash (see below). But please
don't. Banning inline script is the biggest security win CSP provides, and
banning inline style likewise hardens your application. It's a little bit of
effort up front to ensure that things work correctly after moving all the code
out-of-line, but that's a tradeoff that's well worth making.

## If You Absolutely Must Use It...

CSP Level 2 offers backward compatibility for inline scripts by allowing you to
whitelist specific inline scripts using either a cryptographic nonce (number
used once) or a hash. Although this may be cumbersome in practice, it is useful
in a pinch.

To use a nonce, give your script tag a nonce attribute. Its value must match one
in the list of trusted sources. For example:

{% highlight html %}
<script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
  //Some inline code I cant remove yet, but need to asap.
</script>
{% endhighlight %}

Now, add the nonce to your `script-src` directive appended to the `nonce-` keyword.

    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

Remember that nonces must be regenerated for every page request and they must be
unguessable.

Hashes work in much the same way. Instead of adding code to the script tag,
create a SHA hash of the script itself and add it to the `script-src` directive.
For example, let's say your page contained this:

{% highlight javascript %}
  <script>alert('Hello, world.');</script>
{% endhighlight %}

Your policy would contain this:

    Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

There are a few things to note here. The `sha*-` prefix specifies the algorithm
used to generate the hash. In the example above, sha256- is used. CSP also
supports sha384- and sha512-. When generating the hash do not include the
`<script>` tags. Also capitalization and whitespace matter, including leading or
trailing whitespace.

A Google search on generating SHA hashes will lead you to solutions in any
number of languages. Using Chrome 40 or later you can open DevTools then reload
your page. The Console tab will contain error messages with the correct sha256
hash for each of your inline scripts.
