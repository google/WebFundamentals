project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: When a user visits your webpage, the browser tries to fetch an icon from the HTML. The icon may show up in many places, including the browser tab, recent app switch, the new (or recently visited) tab page, and more.

<p class="intro">
When a user visits your webpage, the browser tries to fetch an icon from the HTML. The icon may show up in many places, including the browser tab, recent app switch, the new (or recently visited) tab page, and more.</p>

Providing a high quality image will make your site more recognizable, making it
easier for users to find your site. 



## Add support for icons to your website
To fully support all browsers, you'll need to add a few tags to the `<head>`
element of each page.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="c">&lt;!-- icon in the highest resolution we need it for --&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;icon&quot;</span> <span class="na">sizes=</span><span class="s">&quot;192x192&quot;</span> <span class="na">href=</span><span class="s">&quot;icon.png&quot;</span><span class="nt">&gt;</span>

<span class="c">&lt;!-- reuse same icon for Safari --&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;apple-touch-icon&quot;</span> <span class="na">href=</span><span class="s">&quot;ios-icon.png&quot;</span><span class="nt">&gt;</span>

<span class="c">&lt;!-- multiple icons for IE --&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;msapplication-square310x310logo&quot;</span> <span class="na">content=</span><span class="s">&quot;icon_largetile.png&quot;</span><span class="nt">&gt;</span></code></pre></div>

### Chrome & Opera

Chrome and Opera uses `icon.png`, which is scaled to the necessary size by 
the device. To prevent automatic scaling, you can also provide additional 
sizes by specifying the `sizes` attribute.





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






### Safari

Safari also uses the `<link>` tag with the `rel` attribute: `apple-touch-icon`.

You can specify [explicit sizes](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27) 
by providing a separate link tag for each icon, preventing the OS from 
having to resize the icon:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;apple-touch-icon&quot;</span> <span class="na">href=</span><span class="s">&quot;touch-icon-iphone.png&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;apple-touch-icon&quot;</span> <span class="na">sizes=</span><span class="s">&quot;76x76&quot;</span> <span class="na">href=</span><span class="s">&quot;touch-icon-ipad.png&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;apple-touch-icon&quot;</span> <span class="na">sizes=</span><span class="s">&quot;120x120&quot;</span> <span class="na">href=</span><span class="s">&quot;touch-icon-iphone-retina.png&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;apple-touch-icon&quot;</span> <span class="na">sizes=</span><span class="s">&quot;152x152&quot;</span> <span class="na">href=</span><span class="s">&quot;touch-icon-ipad-retina.png&quot;</span><span class="nt">&gt;</span></code></pre></div>

### Internet Explorer & Windows Phone

Windows 8's new home screen experience supports four different layouts for 
pinned sites, and requires four icons. You can leave out the relevant meta 
tags if you don't want to support a specific size.

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;msapplication-square70x70logo&quot;</span> <span class="na">content=</span><span class="s">&quot;icon_smalltile.png&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;msapplication-square150x150logo&quot;</span> <span class="na">content=</span><span class="s">&quot;icon_mediumtile.png&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;msapplication-wide310x150logo&quot;</span> <span class="na">content=</span><span class="s">&quot;icon_widetile.png&quot;</span><span class="nt">&gt;</span></code></pre></div>

## Tiles in Internet Explorer

Microsoft’s "Pinned Sites" and rotating "Live Tiles" go far beyond other
implementations and is beyond the scope of this guide. You can learn more
at MSDN's
[how to create live tiles](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).

