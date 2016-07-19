project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: You can defer or cancel the app install banner, and understand how the user responded to the banner.

<p class="intro">
Chrome provides an easy mechanism to determine how the user responded to the
app install banner and even cancel or defer it until a more convenient time.
</p>



## Did a User Install the App?

The `beforeinstallprompt` event returns a promise called `userChoice` 
that resolves when the user acts on the prompt.  The promise 
returns an object with a value of `dismissed` on the `outcome`
attribute or `accepted` if the user added the web page to the home screen.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;beforeinstallprompt&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
  <span class="c1">// beforeinstallprompt Event fired</span>
  
  <span class="c1">// e.userChoice will return a Promise. </span>
  <span class="c1">// For more details read: http://www.html5rocks.com/en/tutorials/es6/promises/</span>
  <span class="nx">e</span><span class="p">.</span><span class="nx">userChoice</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">choiceResult</span><span class="p">)</span> <span class="p">{</span>
    
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">choiceResult</span><span class="p">.</span><span class="nx">outcome</span><span class="p">);</span>
    
    <span class="k">if</span><span class="p">(</span><span class="nx">choiceResult</span><span class="p">.</span><span class="nx">outcome</span> <span class="o">==</span> <span class="s1">&#39;dismissed&#39;</span><span class="p">)</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;User cancelled home screen install&#39;</span><span class="p">);</span>
    <span class="p">}</span>
    <span class="k">else</span> <span class="p">{</span>
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;User added to home screen&#39;</span><span class="p">);</span>
    <span class="p">}</span>
  <span class="p">});</span>
<span class="p">});</span></code></pre></div>

This is a good tool for understanding how your users interact with the app 
install prompt.


## Deferring or Cancelling the Prompt

Chrome manages when to trigger the prompt but for some sites this might not 
be ideal. You can defer the prompt to a later time in the app's usage or 
even cancel it. 

When Chrome decides to prompt the user to install the app you 
can prevent the default action and store the event for later. Then when 
the user has a positive interaction with your site you can then re-trigger 
the prompt by calling `prompt()` on the stored event. 

This causes Chrome to show the banner and all the Promise attributes 
such as `userChoice` will be available to bind to so that you can understand 
what action the user took.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">deferredPrompt</span><span class="p">;</span>

<span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;beforeinstallprompt&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;beforeinstallprompt Event fired&#39;</span><span class="p">);</span>
  <span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>
  
  <span class="c1">// Stash the event so it can be triggered later.</span>
  <span class="nx">deferredPrompt</span> <span class="o">=</span> <span class="nx">e</span><span class="p">;</span>
  
  <span class="k">return</span> <span class="kc">false</span><span class="p">;</span>
<span class="p">});</span>

<span class="nx">btnSave</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;click&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="k">if</span><span class="p">(</span><span class="nx">deferredPrompt</span> <span class="o">!==</span> <span class="kc">undefined</span><span class="p">)</span> <span class="p">{</span>
    <span class="c1">// The user has had a postive interaction with our app and Chrome</span>
    <span class="c1">// has tried to prompt previously, so let&#39;s show the prompt.</span>
    <span class="nx">deferredPrompt</span><span class="p">.</span><span class="nx">prompt</span><span class="p">();</span>
  
    <span class="c1">// Follow what the user has done with the prompt.</span>
    <span class="nx">deferredPrompt</span><span class="p">.</span><span class="nx">userChoice</span><span class="p">.</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">choiceResult</span><span class="p">)</span> <span class="p">{</span>
  
      <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="nx">choiceResult</span><span class="p">.</span><span class="nx">outcome</span><span class="p">);</span>
      
      <span class="k">if</span><span class="p">(</span><span class="nx">choiceResult</span><span class="p">.</span><span class="nx">outcome</span> <span class="o">==</span> <span class="s1">&#39;dismissed&#39;</span><span class="p">)</span> <span class="p">{</span>
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;User cancelled home screen install&#39;</span><span class="p">);</span>
      <span class="p">}</span>
      <span class="k">else</span> <span class="p">{</span>
        <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;User added to home screen&#39;</span><span class="p">);</span>
      <span class="p">}</span>
      
      <span class="c1">// We no longer need the prompt.  Clear it up.</span>
      <span class="nx">deferredPrompt</span> <span class="o">=</span> <span class="kc">null</span><span class="p">;</span>
    <span class="p">});</span>
  <span class="p">}</span>
<span class="p">});</span></code></pre></div>

Alternatively, you can cancel the prompt by preventing the default.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nb">window</span><span class="p">.</span><span class="nx">addEventListener</span><span class="p">(</span><span class="s1">&#39;beforeinstallprompt&#39;</span><span class="p">,</span> <span class="kd">function</span><span class="p">(</span><span class="nx">e</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;beforeinstallprompt Event fired&#39;</span><span class="p">);</span>
  <span class="nx">e</span><span class="p">.</span><span class="nx">preventDefault</span><span class="p">();</span>
  <span class="k">return</span> <span class="kc">false</span><span class="p">;</span>
<span class="p">});</span></code></pre></div>

