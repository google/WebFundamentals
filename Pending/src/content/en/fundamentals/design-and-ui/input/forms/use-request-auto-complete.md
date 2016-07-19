project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: While <code>requestAutocomplete</code> was designed to help users fill out any form, today its most common use is in eCommerce where shopping cart abandonment on the mobile web <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>can be as high as 97%</a>.

<h2>requestAutocomplete is being deprecated and should not be implemented.</h2>
<p>We recommend instead annotating your checkout form fields with autocomplete attributes to <a href="https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill">leverage autofill.</a>
</p>

---
<p class="intro">
  While <code>requestAutocomplete</code> was designed to help users fill out any form, today its most common use is in eCommerce where shopping cart abandonment on the mobile web <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>can be as high as 97%</a>. Imagine 97% of people in a supermarket, with a cart brimming full of things that they want, flipping their cart over and walking out.
</p>
















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li><code>requestAutocomplete</code> can greatly simplify the checkout process and improve the user experience.</li>
    
    <li>If <code>requestAutocomplete</code> is available, hide the checkout form and move people directly to the confirmation page.</li>
    
    <li>Ensure input fields include the appropriate autocomplete attribute.</li>
    
  </ul>
  
</div>



Rather than the site relying on a particular payment provider,
`requestAutocomplete` requests payment details (such as name, address and credit
card information) from the browser, which are optionally stored by the browser
much like other auto-complete fields.

<div class="video-wrapper"><iframe src="https://www.youtube.com/embed/ljYeHwGgzQk?controls=2&amp;modestbranding=1&amp;showinfo=0&amp;utm-source=crdev-wf" class="devsite-embedded-youtube-video" allowfullscreen data-video-id="ljYeHwGgzQk" data-autohide="1" data-modestbranding="1" data-controls="2" data-utm-source="crdev-wf" data-showinfo="0" frameborder="0"></iframe></div>

### `requestAutocomplete` flow

The ideal experience will show the `requestAutocomplete` dialog instead of loading the
page that displays the checkout form. If all goes well, the user shouldn't see
the form at all.  You can easily add `requestAutocomplete` to existing forms
without having to change any field names.  Simply add the `autocomplete`
attribute to each form element with the appropriate value and add the
`requestAutocomplete()` function on the form element. The browser will handle
the rest.

<img src="imgs/rac_flow.png" class="center" alt="Request autocomplete flow">


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="kd">var</span> <span class="nx">doRAC</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s2">&quot;doRAC&quot;</span><span class="p">);</span>
<span class="nx">doRAC</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&quot;click&quot;</span><span class="p">,</span> <span class="nx">doRequestAutocomplete</span><span class="p">);</span>

<span class="nx">form</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s2">&quot;usrForm&quot;</span><span class="p">);</span>
<span class="nx">form</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&quot;autocompleteerror&quot;</span><span class="p">,</span> <span class="nx">requestAutocompleteError</span><span class="p">);</span>
<span class="nx">form</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&quot;autocomplete&quot;</span><span class="p">,</span> <span class="nx">requestAutocompleteCompleted</span><span class="p">);</span>

<span class="k">if</span> <span class="p">(</span><span class="nx">form</span><span class="p">.</span><span class="nx">requestAutocomplete</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">isRACSupported</span><span class="p">(</span><span class="kc">true</span><span class="p">,</span> <span class="s2">&quot;&quot;</span><span class="p">);</span>
<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
  <span class="nx">isRACSupported</span><span class="p">(</span><span class="kc">false</span><span class="p">,</span> <span class="s2">&quot;Please complete the form manually.&quot;</span><span class="p">);</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/forms/rac.html">Try full sample</a>
      </p>
  </div>



The `requestAutocomplete` function on the `form` element indicates to the
browser that it should populate the form.  As a security feature, the function
must be called via a user gesture like a touch or mouse click. A dialog is then
displayed asking the user permission to populate the fields and which details
they want to populate it with.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="kd">function</span> <span class="nx">requestAutocompleteCompleted</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;requestAutocomplete Completed&quot;</span><span class="p">,</span> <span class="nx">evt</span><span class="p">);</span>
  <span class="nx">form</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">toggle</span><span class="p">(</span><span class="s2">&quot;hidden&quot;</span><span class="p">,</span> <span class="kc">false</span><span class="p">);</span>
<span class="p">}</span>

<span class="kd">function</span> <span class="nx">requestAutocompleteError</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;requestAutocomplete Error&quot;</span><span class="p">,</span> <span class="nx">evt</span><span class="p">);</span>
  <span class="nx">isRACSupported</span><span class="p">(</span><span class="kc">false</span><span class="p">,</span> <span class="s2">&quot;An error occured attempting to autocomplete the form.&quot;</span><span class="p">);</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/forms/rac.html">Try full sample</a>
      </p>
  </div>



Upon completion of `requestAutocomplete`, the function will either fire the
`autocomplete` event if it finished successfully, or `autocompleteerror` if
it was unable to complete the form.  If it completed successfully and the form
validates to your needs, simply submit the form and proceed to the final
confirmation.




















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Remember</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>If you're asking for any kind of personal information or credit card data, ensure the page is served via SSL.  Otherwise the dialog will warn the user their information may not be secure.</li>
    
  </ul>
  
</div>





