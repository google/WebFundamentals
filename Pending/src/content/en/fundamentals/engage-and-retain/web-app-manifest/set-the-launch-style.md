project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Use the web app manifest to control the display type and page orientation.

Use the web app manifest to control the display type and page orientation.



## Customize the Display Type

You make your web app hide the browser's UI by setting the `display` type to `standalone`.

<div class="highlight"><pre><code class="language-json" data-lang="json"><span class="s2">&quot;display&quot;</span><span class="err">:</span> <span class="s2">&quot;standalone&quot;</span></code></pre></div>

Don't worry, if you think users would prefer to view your page as a normal 
site in a browser. You can set the `display` type to `browser`.

<div class="highlight"><pre><code class="language-json" data-lang="json"><span class="s2">&quot;display&quot;</span><span class="err">:</span> <span class="s2">&quot;browser&quot;</span></code></pre></div>

<figure>
  <img src="images/manifest-display-options.png" alt="web-app-capable">
  <figcaption>Manifest Display Options</figcaption>
</figure>

## Specify the Initial Orientation of the Page

You can enforce a specific orientation, which is advantageous for use cases 
that work in only one orientation, like games for example. Use this 
selectively. Users prefer selecting the orientation.

<div class="highlight"><pre><code class="language-json" data-lang="json"><span class="s2">&quot;orientation&quot;</span><span class="err">:</span> <span class="s2">&quot;landscape&quot;</span></code></pre></div>

<figure>
  <img src="images/manifest-orientation-options.png" alt="Web App Manifest Orientation Options">
  <figcaption>Web App Manifest Orientation Options</figcaption>
</figure>


