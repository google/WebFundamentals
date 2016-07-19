project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Color browser elements like the address bar and more.

<p class="intro">
Using different <code>meta</code> elements, you can customize the browser and 
even elements of the platform. Keep in mind that some may only work on certain
platforms or browsers, but they can greatly enhance the experience. 
</p>



## Color the browser elements

Chrome, Firefox OS, Safari, Internet Explorer and Opera Coast allow you to define 
colors for elements of the browser, and even the platform using meta tags.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="c">&lt;!-- Chrome, Firefox OS and Opera --&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;theme-color&quot;</span> <span class="na">content=</span><span class="s">&quot;#4285f4&quot;</span><span class="nt">&gt;</span>
<span class="c">&lt;!-- Windows Phone --&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;msapplication-navbutton-color&quot;</span> <span class="na">content=</span><span class="s">&quot;#4285f4&quot;</span><span class="nt">&gt;</span>
<span class="c">&lt;!-- iOS Safari --&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;apple-mobile-web-app-capable&quot;</span> <span class="na">content=</span><span class="s">&quot;yes&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;apple-mobile-web-app-status-bar-style&quot;</span> <span class="na">content=</span><span class="s">&quot;black-translucent&quot;</span><span class="nt">&gt;</span></code></pre></div>

<img src="imgs/theme-color.png" alt="Theme colors styling the address bar in Chrome">

## Safari specific styling

Safari allows you to style the status bar and specify a startup image.

### Specify a startup image

By default, Safari shows a blank screen during load time and after multiple
loads a screenshot of the previous state of the app. You can prevent this by
telling Safari to show an explicit startup image, by adding a link tag, with
`rel=apple-touch-startup-image`. For example:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;apple-touch-startup-image&quot;</span> <span class="na">href=</span><span class="s">&quot;icon.png&quot;</span><span class="nt">&gt;</span></code></pre></div>

The image has to be in the specific size of the target device's screen or it
won't be used. Refer to
[Safari Web Content Guidelines](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
for further details.

While Apple's documentation is sparse on this topic, the developer community
has figured out a way to target all devices by using advanced media queries to
select the appropriate device and then specify the correct image. Here's a
working solution, courtesy of [tfausak's gist](//gist.github.com/tfausak/2222823)

### Change the status bar appearance

You can change the appearance of the default status bar to either `black` or
`black-translucent`. With `black-translucent`, the status bar floats on top
of the full screen content, rather than pushing it down. This gives the layout
more height, but obstructs the top.  Here’s the code required:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;apple-mobile-web-app-status-bar-style&quot;</span> <span class="na">content=</span><span class="s">&quot;black&quot;</span><span class="nt">&gt;</span></code></pre></div>

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption>Screenshot using <code>black-translucent</code></figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption>Screenshot using <code>black</code></figcaption>
  </figure>
</div>


