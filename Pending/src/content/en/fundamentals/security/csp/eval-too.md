project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Even when an attacker can't inject script directly, she might be able to trick your application into converting otherwise inert text into executable JavaScript and executing it on her behalf.

<p class="intro">
Even when an attacker can't inject script directly, she might be able to trick
your application into converting otherwise inert text into executable JavaScript
and executing it on her behalf. <code>eval()</code>, <code>new
Function()</code>, <code>setTimeout([string], ...)</code>, and
<code>setInterval([string], ...)</code> are all vectors through which injected
text might end up executing something unexpectedly malicious. CSP's default
response to this risk is, unsurprisingly, to block all of these vectors
completely.
</p>

This has more than a few impacts on the way you build applications:

*   You must parse JSON via the built-in `JSON.parse`, rather than relying on
    `eval`. Native JSON operations are available in
    [every browser since IE8](http://caniuse.com/#feat=json), and they're
    completely safe.
*   Rewrite any `setTimeout` or `setInterval` calls you're currently making
    with inline functions rather than strings. For example:
    <div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">setTimeout</span><span class="p">(</span><span class="s2">&quot;document.querySelector(&#39;a&#39;).style.display = &#39;none&#39;;&quot;</span><span class="p">,</span> <span class="mi">10</span><span class="p">);</span></code></pre></div>

would be better written as:

    <div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nx">setTimeout</span><span class="p">(</span><span class="kd">function</span> <span class="p">()</span> <span class="p">{</span>
      <span class="nb">document</span><span class="p">.</span><span class="nx">querySelector</span><span class="p">(</span><span class="s1">&#39;a&#39;</span><span class="p">).</span><span class="nx">style</span><span class="p">.</span><span class="nx">display</span> <span class="o">=</span> <span class="s1">&#39;none&#39;</span><span class="p">;</span>
    <span class="p">},</span> <span class="mi">10</span><span class="p">);</span></code></pre></div>

*   Avoid inline templating at runtime: Many templating libraries use `new
    Function()` liberally to speed up template generation at runtime. It's a
    nifty application of dynamic programming, but comes at the risk of
    evaluating malicious text. Some frameworks support CSP out of the box,
    falling back to a robust parser in the absence of `eval`.
    [AngularJS's ng-csp directive](http://docs.angularjs.org/api/angular.module.ng.$compileProvider.directive.ngCsp)
    is a good example of this.

You're even better off, however, if your templating language of choice offers
precompilation ([Handlebars does](http://handlebarsjs.com/precompilation.html),
for instance). Precompiling your templates can make the user experience even
faster than the fastest runtime implementation, and it's safer too. Win, win!
If eval and its text-to-JavaScript brethren are completely essential to your
application, you can enable them by adding `'unsafe-eval'` as an allowed source
in a `script-src` directive. But, again, please don't. Banning the ability to
execute strings makes it much more difficult for an attacker to execute
unauthorized code on your site.

