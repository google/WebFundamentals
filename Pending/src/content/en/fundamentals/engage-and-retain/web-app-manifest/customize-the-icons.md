project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: When a user adds your site to their home screen, you can define a set of icons for the browser to use.

When a user adds your site to their home screen, you can define a set of icons for the 
browser to use. The icons for your web app can be defined as shown below, with a type, size, and optional
density.

<div class="highlight"><pre><code class="language-json" data-lang="json"><span class="s2">&quot;icons&quot;</span><span class="err">:</span> <span class="p">[{</span>
    <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;images/touch/icon-128x128.png&quot;</span><span class="p">,</span>
    <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/png&quot;</span><span class="p">,</span>
    <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;128x128&quot;</span>
  <span class="p">},</span> <span class="p">{</span>
    <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;images/touch/apple-touch-icon.png&quot;</span><span class="p">,</span>
    <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/png&quot;</span><span class="p">,</span>
    <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;152x152&quot;</span>
  <span class="p">},</span> <span class="p">{</span>
    <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;images/touch/ms-touch-icon-144x144-precomposed.png&quot;</span><span class="p">,</span>
    <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/png&quot;</span><span class="p">,</span>
    <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;144x144&quot;</span>
  <span class="p">},</span> <span class="p">{</span>
    <span class="nt">&quot;src&quot;</span><span class="p">:</span> <span class="s2">&quot;images/touch/chrome-touch-icon-192x192.png&quot;</span><span class="p">,</span>
    <span class="nt">&quot;type&quot;</span><span class="p">:</span> <span class="s2">&quot;image/png&quot;</span><span class="p">,</span>
    <span class="nt">&quot;sizes&quot;</span><span class="p">:</span> <span class="s2">&quot;192x192&quot;</span>
  <span class="p">}]</span><span class="err">,</span></code></pre></div>


















<div class="wf-highlight-list wf-highlight-list--note" markdown="1">
  <h3 class="wf-highlight-list__title">Note</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>When saving an icon to the home screen, Chrome first looks for icons that match the density of the display and are sized to 48dp * screen density. If none are found it searches for the icon that most closely matches the device characteristics. If, for whatever reason, you want be specific about targetting an icon at a particular-pixel density, you can use the optional <code>density</code> member which takes a number. When you don’t declare density, it defaults to 1.0. This means “use this icon for screen densities 1.0 and up”, which is normally what you want.</li>
    
  </ul>
  
</div>



<figure>
  <img src="images/homescreen-icon.png" alt="Add to Home Screen Icon">
  <figcaption>Add to Home Screen Icon</figcaption>
</figure>

