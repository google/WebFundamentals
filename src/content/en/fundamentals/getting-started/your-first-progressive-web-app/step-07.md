project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Use Add to Home Screen and integrate your Progressive Web App with the native platform.

<p class="intro">
Nobody likes to have to type in long URLs on a mobile keyboard if they
don’t need to. With the Add To home screen feature, your users can choose to
add a shortcut link to their device just as they would install a native app
from a store, but with a lot less friction.
</p>



## Web App Install Banners and Add to Homescreen for Chrome on Android

Web app install banners give you the ability to let your users quickly and
seamlessly add your web app to their home screen, making it easy to launch and
return to your app.  Adding app install banners is easy, and Chrome handles most
of the heavy lifting for you. We simply need to include a web app manifest file
with details about the app.

Chrome then uses a set of criteria including the use of a service worker, SSL
status and visit frequency heuristics to determine when to show the banner. In
addition a user can manually add it via the "Add to Home Screen" menu button in
Chrome.

### Declare an app manifest with a manifest.json file

The web app manifest is a simple JSON file that gives you, the
developer, the ability to control how your app appears to the user in the areas
that they would expect to see apps (for example the mobile home screen), direct
what the user can launch and more importantly how they can launch it.

Using the web app manifest, your web app can:

* Have a rich presence on the user's Android home screen
* Be launched in full-screen mode on Android with no URL bar
* Control the screen orientation for optimal viewing
* Define a "splash screen" launch experience and theme color for the site
* Track whether you're launched from the home screen or URL bar

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="p">{</span>
  <span class="s2">&quot;name&quot;</span><span class="o">:</span> <span class="s2">&quot;Weather&quot;</span><span class="p">,</span>
  <span class="s2">&quot;short_name&quot;</span><span class="o">:</span> <span class="s2">&quot;Weather&quot;</span><span class="p">,</span>
  <span class="s2">&quot;icons&quot;</span><span class="o">:</span> <span class="p">[{</span>
    <span class="s2">&quot;src&quot;</span><span class="o">:</span> <span class="s2">&quot;images/icons/icon-128x128.png&quot;</span><span class="p">,</span>
      <span class="s2">&quot;sizes&quot;</span><span class="o">:</span> <span class="s2">&quot;128x128&quot;</span><span class="p">,</span>
      <span class="s2">&quot;type&quot;</span><span class="o">:</span> <span class="s2">&quot;image/png&quot;</span>
    <span class="p">},</span> <span class="p">{</span>
      <span class="s2">&quot;src&quot;</span><span class="o">:</span> <span class="s2">&quot;images/icons/icon-144x144.png&quot;</span><span class="p">,</span>
      <span class="s2">&quot;sizes&quot;</span><span class="o">:</span> <span class="s2">&quot;144x144&quot;</span><span class="p">,</span>
      <span class="s2">&quot;type&quot;</span><span class="o">:</span> <span class="s2">&quot;image/png&quot;</span>
    <span class="p">},</span> <span class="p">{</span>
      <span class="s2">&quot;src&quot;</span><span class="o">:</span> <span class="s2">&quot;images/icons/icon-152x152.png&quot;</span><span class="p">,</span>
      <span class="s2">&quot;sizes&quot;</span><span class="o">:</span> <span class="s2">&quot;152x152&quot;</span><span class="p">,</span>
      <span class="s2">&quot;type&quot;</span><span class="o">:</span> <span class="s2">&quot;image/png&quot;</span>
    <span class="p">},</span> <span class="p">{</span>
      <span class="s2">&quot;src&quot;</span><span class="o">:</span> <span class="s2">&quot;images/touch/icon-192x192.png&quot;</span><span class="p">,</span>
      <span class="s2">&quot;sizes&quot;</span><span class="o">:</span> <span class="s2">&quot;192x192&quot;</span><span class="p">,</span>
      <span class="s2">&quot;type&quot;</span><span class="o">:</span> <span class="s2">&quot;image/png&quot;</span>
    <span class="p">},</span> <span class="p">{</span>
      <span class="s2">&quot;src&quot;</span><span class="o">:</span> <span class="s2">&quot;images/touch/icon-256x256.png&quot;</span><span class="p">,</span>
      <span class="s2">&quot;sizes&quot;</span><span class="o">:</span> <span class="s2">&quot;256x256&quot;</span><span class="p">,</span>
      <span class="s2">&quot;type&quot;</span><span class="o">:</span> <span class="s2">&quot;image/png&quot;</span>
    <span class="p">}],</span>
  <span class="s2">&quot;start_url&quot;</span><span class="o">:</span> <span class="s2">&quot;/index.html&quot;</span><span class="p">,</span>
  <span class="s2">&quot;display&quot;</span><span class="o">:</span> <span class="s2">&quot;standalone&quot;</span><span class="p">,</span>
  <span class="s2">&quot;background_color&quot;</span><span class="o">:</span> <span class="s2">&quot;#3E4EB8&quot;</span><span class="p">,</span>
  <span class="s2">&quot;theme_color&quot;</span><span class="o">:</span> <span class="s2">&quot;#2F3BA2&quot;</span>
<span class="p">}</span></code></pre></div>

An easy way to track how the app is launched is to add a query string to the
`start_url` parameter and then use an analytics suite to track the query string.
If you use this method, remember to update the list of files cached by the App
Shell to ensure that the file with the query string is cached.

### Tell the browser about your manifest file

Add the following to the `<head>` of your `index.html` file:
`<link rel="manifest" href="/manifest.json">`

### Best Practices

* Place the manifest link on all your site's pages, so it will be retrieved by
  Chrome right when the user first visits, no matter what page they land on.
* The `short_name` is preferred on Chrome and will be used if present over the
  `name` field.
* Define icon sets for different density screens. Chrome will attempt to use the
  icon closest to 48dp, for example, 96px on a 2x device or 144px for a 3x
  device.
* Remember to include an icon with a size that is sensible for a splash screen
  and don't forget to set the `background_color`.

Further Reading:
[Using app install
banners](https://developers.google.com/web/fundamentals/engage-and-retain/simplified-app-installs/)

## Add to Homescreen elements for Safari on iOS

In your `index.html`, add the following to the `<head>`:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="c">&lt;!-- Add to home screen for Safari on iOS --&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;apple-mobile-web-app-capable&quot;</span> <span class="na">content=</span><span class="s">&quot;yes&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;apple-mobile-web-app-status-bar-style&quot;</span> <span class="na">content=</span><span class="s">&quot;black&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;apple-mobile-web-app-title&quot;</span> <span class="na">content=</span><span class="s">&quot;Weather App&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;apple-touch-icon&quot;</span> <span class="na">href=</span><span class="s">&quot;images/icons/icon-152x152.png&quot;</span><span class="nt">&gt;</span></code></pre></div>

## Tile Icon for Windows

In your `index.html`, add the following to the `<head>`:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;msapplication-TileImage&quot;</span> <span class="na">content=</span><span class="s">&quot;images/icons/icon-144x144.png&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;msapplication-TileColor&quot;</span> <span class="na">content=</span><span class="s">&quot;#2F3BA2&quot;</span><span class="nt">&gt;</span></code></pre></div>

## Test it out

* Try adding the app to the home screen in Chrome on Android and verify the
launch screen appears properly and the right icons are used.
* Check Safari and Internet Explorer to make sure the icons appear properly.

<a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Try it</a>


