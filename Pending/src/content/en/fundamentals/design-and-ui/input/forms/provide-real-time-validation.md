project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Real-time data validation doesn't just help to keep your data clean, but it also helps improve the user experience.  Modern browsers have several built-in tools to help provide real-time data validation and may prevent the user from submitting an invalid form.  Visual cues should be used to indicate whether a form has been completed properly.

<p class="intro">
  Real-time data validation doesn't just help to keep your data clean, but it also helps improve the user experience.  Modern browsers have several built-in tools to help provide real-time data validation and may prevent the user from submitting an invalid form.  Visual cues should be used to indicate whether a form has been completed properly.
</p>



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Use these attributes to validate input

### The `pattern` attribute

The `pattern` attribute specifies a [regular
expression](https://en.wikipedia.org/wiki/Regular_expression) used to validate an
input field. For example, to validate a US Zip code (5 digits, sometimes
followed by a dash and an additional 4 digits), we would set the `pattern` like
this:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;text&quot;</span> <span class="na">pattern=</span><span class="s">&quot;^\d{5,6}(?:[-\s]\d{4})?$&quot;</span> <span class="err">...</span><span class="nt">&gt;</span></code></pre></div>

#### Common regular expression patterns

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Description">Description</th>
      <th data-th="Regular expression">Regular expression</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">Postal address</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">Zip Code (US)</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP Address (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP Address (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP Address (both)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Credit Card Number</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">Social Security Number</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">North American Phone Number</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

### The `required` attribute

If the `required` attribute is present, then the field must contain a value before
the form can be submitted. For example, to make the zip code required, we'd
simply add the required attribute:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;text&quot;</span> <span class="na">required</span> <span class="na">pattern=</span><span class="s">&quot;^\d{5,6}(?:[-\s]\d{4})?$&quot;</span> <span class="err">...</span><span class="nt">&gt;</span></code></pre></div>

### The `min`, `max` and `step` attributes

For numeric input types like number or range as well as date/time inputs, you
can specify the minimum and maximum values, as well as how much they should each
increment/decrement when adjusted by the slider or spinners.  For example, a
shoe size input would set a minumum size of 1 and a maximum size 13, with a step
of 0.5

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;number&quot;</span> <span class="na">min=</span><span class="s">&quot;1&quot;</span> <span class="na">max=</span><span class="s">&quot;13&quot;</span> <span class="na">step=</span><span class="s">&quot;0.5&quot;</span> <span class="err">...</span><span class="nt">&gt;</span></code></pre></div>

### The `maxlength` attribute

The `maxlength` attribute can be used to specify the maximum length of an input or
textbox and is useful when you want to limit the length of information that the
user can provide. For example, if you want to limit a filename to 12 characters,
you can use the following.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;text&quot;</span> <span class="na">id=</span><span class="s">&quot;83filename&quot;</span> <span class="na">maxlength=</span><span class="s">&quot;12&quot;</span> <span class="err">...</span><span class="nt">&gt;</span></code></pre></div>

### The `minlength` attribute

The `minlength` attribute can be used to specify the minimum length of an input or
textbox and is useful when you want to specify a minimum length the user must
provide. For example, if you want to specify that a file name requires at least
8 characters, you can use the following.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;text&quot;</span> <span class="na">id=</span><span class="s">&quot;83filename&quot;</span> <span class="na">minlength=</span><span class="s">&quot;8&quot;</span> <span class="err">...</span><span class="nt">&gt;</span></code></pre></div>

### The `novalidate` attribute

In some cases, you may want to allow the user to submit the form even if it
contains invalid input. To do this, add the `novalidate` attribute to the form
element, or individual input fields. In this case, all pseudo classes and
JavaScript APIs will still allow you to check if the form validates.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;form</span> <span class="na">role=</span><span class="s">&quot;form&quot;</span> <span class="na">novalidate</span><span class="nt">&gt;</span>
  <span class="nt">&lt;label</span> <span class="na">for=</span><span class="s">&quot;inpEmail&quot;</span><span class="nt">&gt;</span>Email address<span class="nt">&lt;/label&gt;</span>
  <span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;email&quot;</span> <span class="err">...</span><span class="nt">&gt;</span>
<span class="nt">&lt;/form&gt;</span></code></pre></div>





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Use JavaScript for more complex real-time validation

When the built-in validation plus regular expressions aren't enough, you can use
the [Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation),
a powerful tool for handling custom validation.  The API allows you to do things
like set a custom error, check whether an element is valid, and determine the
reason that an element is invalid:

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="API">API</th>
      <th data-th="Description">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">Sets a custom validation message and the <code>customError</code> property of the <code>ValidityState</code> object to <code>true</code>.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">Returns a string with the reason the input failed the validation test.</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">Returns <code>true</code> if the element satisfies all of its constraints, and <code>false</code> otherwise. Deciding how the page responds when the check returns <code>false</code> is left up to the developer.</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">Returns <code>true</code> if the element satisfies all of its constraints, and <code>false</code> otherwise. When the page responds <code>false</code>, constraint problems are reported to the user.</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">Returns a <code>ValidityState</code> object representing the validity states of the element.</td>
    </tr>
  </tbody>
</table>

### Set custom validation messages

If a field fails validation, use `setCustomValidity()` to mark the field invalid
and explain why the field didn't validate.  For example, a sign up form might
ask the user to confirm their email address by entering it twice.  Use the blur
event on the second input to validate the two inputs and set the appropriate
response.  For example:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="k">if</span> <span class="p">(</span><span class="nx">input</span><span class="p">.</span><span class="nx">value</span> <span class="o">!=</span> <span class="nx">primaryEmail</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// the provided value doesn&#39;t match the primary email address</span>
  <span class="nx">input</span><span class="p">.</span><span class="nx">setCustomValidity</span><span class="p">(</span><span class="s1">&#39;The two email addresses must match.&#39;</span><span class="p">);</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s2">&quot;E-mail addresses do not match&quot;</span><span class="p">,</span> <span class="nx">primaryEmail</span><span class="p">,</span> <span class="nx">input</span><span class="p">.</span><span class="nx">value</span><span class="p">);</span>
<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
  <span class="c1">// input is valid -- reset the error message</span>
  <span class="nx">input</span><span class="p">.</span><span class="nx">setCustomValidity</span><span class="p">(</span><span class="s1">&#39;&#39;</span><span class="p">);</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/forms/order.html">Try full sample</a>
      </p>
  </div>



### Prevent form submission on invalid forms

Because not all browsers will prevent the user from submitting the form if there
is invalid data, you should catch the submit event, and use the `checkValidity()`
on the form element to determine if the form is valid.  For example:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nx">form</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&quot;submit&quot;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="k">if</span> <span class="p">(</span><span class="nx">form</span><span class="p">.</span><span class="nx">checkValidity</span><span class="p">()</span> <span class="o">===</span> <span class="kc">false</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">evt</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>
    <span class="nx">alert</span><span class="p">(</span><span class="s2">&quot;Form is invalid - submission prevented!&quot;</span><span class="p">);</span>
    <span class="k">return</span> <span class="kc">false</span><span class="p">;</span>
  <span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
    <span class="c1">// To prevent data from being sent, we&#39;ve prevented submission</span>
    <span class="c1">// here, but normally this code block would not exist.</span>
    <span class="nx">evt</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>
    <span class="nx">alert</span><span class="p">(</span><span class="s2">&quot;Form is valid - submission prevented to protect privacy.&quot;</span><span class="p">);</span>
    <span class="k">return</span> <span class="kc">false</span><span class="p">;</span>
  <span class="p">}</span>
<span class="p">});</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/forms/order.html">Try full sample</a>
      </p>
  </div>



## Show feedback in real-time

It's helpful to provide a visual indication on each field that indicates whether
the user has completed the form properly before they've submitted the form.
HTML5 also introduces a number of new pseudo-classes that can be used to style
inputs based on their value or attributes.

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Pseudo-class">Pseudo-class</th>
      <th data-th="Use">Use</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">Explicitly sets the style for an input to be used when the value meets all of the validation requirements.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">Explicitly sets the style for an input to be used when the value does not meet all of the validation requirements.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">Explicitly sets the style for an input element that has the required attribute set.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">Explicitly sets the style for an input element that does not have the required attribute set.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">Explicitly sets the style for a number input element where the value is in range.</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">Explicitly sets the style for a number input element where the value is out of range.</td>
    </tr>
  </tbody>
</table>

Validation happens immediately which means that when the page is loaded, fields
may be marked as invalid, even though the user hasn't had a chance to fill them
in yet.  It also means that as the user types, and it's possible they'll see the
invalid style while typing. To prevent this, you can combine the CSS with
JavaScript to only show invalid styling when the user has visited the field.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">input</span><span class="nc">.dirty</span><span class="nd">:not</span><span class="o">(</span><span class="nd">:focus</span><span class="o">)</span><span class="nd">:invalid</span> <span class="p">{</span>
  <span class="k">background-color</span><span class="o">:</span> <span class="m">#FFD9D9</span><span class="p">;</span>
<span class="p">}</span>
<span class="nt">input</span><span class="nc">.dirty</span><span class="nd">:not</span><span class="o">(</span><span class="nd">:focus</span><span class="o">)</span><span class="nd">:valid</span> <span class="p">{</span>
  <span class="k">background-color</span><span class="o">:</span> <span class="m">#D9FFD9</span><span class="p">;</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/forms/order.html">Try full sample</a>
      </p>
  </div>



  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="kd">var</span> <span class="nx">inputs</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">getElementsByTagName</span><span class="p">(</span><span class="s2">&quot;input&quot;</span><span class="p">);</span>
<span class="kd">var</span> <span class="nx">inputs_len</span> <span class="o">=</span> <span class="nx">inputs</span><span class="p">.</span><span class="nx">length</span><span class="p">;</span>
<span class="kd">var</span> <span class="nx">addDirtyClass</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">evt</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">sampleCompleted</span><span class="p">(</span><span class="s2">&quot;Forms-order-dirty&quot;</span><span class="p">);</span>
  <span class="nx">evt</span><span class="p">.</span><span class="nx">srcElement</span><span class="p">.</span><span class="nx">classList</span><span class="p">.</span><span class="nx">toggle</span><span class="p">(</span><span class="s2">&quot;dirty&quot;</span><span class="p">,</span> <span class="kc">true</span><span class="p">);</span>
<span class="p">};</span>
<span class="k">for</span> <span class="p">(</span><span class="kd">var</span> <span class="nx">i</span> <span class="o">=</span> <span class="mi">0</span><span class="p">;</span> <span class="nx">i</span> <span class="o">&lt;</span> <span class="nx">inputs_len</span><span class="p">;</span> <span class="nx">i</span><span class="o">++</span><span class="p">)</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">input</span> <span class="o">=</span> <span class="nx">inputs</span><span class="p">[</span><span class="nx">i</span><span class="p">];</span>
  <span class="nx">input</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&quot;blur&quot;</span><span class="p">,</span> <span class="nx">addDirtyClass</span><span class="p">);</span>
  <span class="nx">input</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&quot;invalid&quot;</span><span class="p">,</span> <span class="nx">addDirtyClass</span><span class="p">);</span>
  <span class="nx">input</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s2">&quot;valid&quot;</span><span class="p">,</span> <span class="nx">addDirtyClass</span><span class="p">);</span>
<span class="p">}</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/input/forms/order.html">Try full sample</a>
      </p>
  </div>























# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue








