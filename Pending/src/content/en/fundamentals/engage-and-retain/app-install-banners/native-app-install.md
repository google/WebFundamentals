project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Native App install banners are similar to Web app install banners, but instead of adding to the home screen will let the user install your native app without leaving your site.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    <p class="intro">
    Native App install banners are similar to Web app install banners, but
    instead of adding to the home screen will let the user install your
    native app without leaving your site.
    </p>
  </div>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/native-app-install-banner.gif" alt="Native app install banner">
    <figcaption>Native app install banner flow</figcaption>
  </figure>
</div>

## Criteria to Show the Banner

The criteria is similar to the Web App install banner except for the need of
a service worker. Your site must:

* Have a [web app manifest](.) file with:
  - a `short_name`
  - a `name` (used in the banner prompt)
  - a 144x144 png icon, your icon declaration's should include a mime type of `image/png`
  - a `related_applications` object with information about the app
* Be served over [HTTPS](/web/fundamentals/security/encrypt-in-transit/)
* Be visited by the user twice, over two separate days during the course
  of two weeks.

## Manifest Requirements

To integrate into any manifest, add a `related_applications` array with the
platforms of `play` (for Google Play) and the App Id.

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="s2">&quot;related_applications&quot;</span><span class="o">:</span> <span class="p">[</span>
  <span class="p">{</span>
  <span class="s2">&quot;platform&quot;</span><span class="o">:</span> <span class="s2">&quot;play&quot;</span><span class="p">,</span>
  <span class="s2">&quot;id&quot;</span><span class="o">:</span> <span class="s2">&quot;com.google.samples.apps.iosched&quot;</span>
  <span class="p">}</span>
<span class="p">]</span></code></pre></div>

If just want to offer the user the ability to install your Android
application, and not show the web app install banner, then add
`"prefer_related_applications": true`. For example:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="s2">&quot;prefer_related_applications&quot;</span><span class="o">:</span> <span class="kc">true</span><span class="p">,</span>
<span class="s2">&quot;related_applications&quot;</span><span class="o">:</span> <span class="p">[</span>
  <span class="p">{</span>
  <span class="s2">&quot;platform&quot;</span><span class="o">:</span> <span class="s2">&quot;play&quot;</span><span class="p">,</span>
  <span class="s2">&quot;id&quot;</span><span class="o">:</span> <span class="s2">&quot;com.google.samples.apps.iosched&quot;</span>
  <span class="p">}</span>
<span class="p">]</span></code></pre></div>

