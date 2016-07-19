project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: When adding icons to your page, use SVG icons where possible or in some cases, unicode characters.

<p class="intro">
  When adding icons to your page, use SVG icons where possible or in some cases, unicode characters.
</p>


















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Use SVG or unicode for icons instead of raster images.</li>
    
  </ul>
  
</div>



## Replace simple icons with unicode

Many fonts include support for the myriad of unicode glyphs, which can be used
instead of images. Unlike images, unicode fonts scale well, and look good no
matter how small or large they appear on screen.

Beyond the normal character set, unicode may include symbols for number forms
(&#8528;), arrows (&#8592;), math operators (&#8730;), geometric shapes
(&#9733;), control pictures (&#9654;), braille patterns (&#10255;), music
notation (&#9836;), Greek letters (&#937;), even chess pieces (&#9822;).

Including a unicode character is done in the same way named entities are:
`&#XXXX`, where `XXXX` represents the unicode character number. For example:

<div class="highlight"><pre><code class="language-html" data-lang="html">You&#39;re a super <span class="ni">&amp;#9733;</span></code></pre></div>

You're a super &#9733;

## Replace complex icons with SVG

For more complex icon requirements, SVG icons are generally lightweight, 
easy to use and can be styled with CSS. SVG have a number of advantages over
raster images:

* They're vector graphics that can be infinitely scaled.
* CSS effects such as color, shadowing, transparency and animations are 
  straightforward.
* SVG images can be inlined right in the document.
* They are semantic.
* Provide better accessibility with the appropriate attributes.

&nbsp;


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre>With SVG icons, you can either add icons using inline SVG, like
this checkmark:
  <span class="nt">&lt;svg</span> <span class="na">version=</span><span class="s">&quot;1.1&quot;</span> <span class="na">xmlns=</span><span class="s">&quot;http://www.w3.org/2000/svg&quot;</span>
       <span class="na">xmlns:xlink=</span><span class="s">&quot;http://www.w3.org/1999/xlink&quot;</span>
       <span class="na">width=</span><span class="s">&quot;32&quot;</span> <span class="na">height=</span><span class="s">&quot;32&quot;</span> <span class="na">viewBox=</span><span class="s">&quot;0 0 32 32&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;path</span> <span class="na">d=</span><span class="s">&quot;M27 4l-15 15-7-7-5 5 12 12 20-20z&quot;</span> <span class="na">fill=</span><span class="s">&quot;#000000&quot;</span><span class="nt">&gt;&lt;/path&gt;</span>
  <span class="nt">&lt;/svg&gt;</span>
or by using an image tag, like this credit card icon:
<span class="nt">&lt;img</span> <span class="na">src=</span><span class="s">&quot;credit.svg&quot;</span><span class="nt">&gt;</span>.
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/media/images/icon-svg.html">Try full sample</a>
      </p>
  </div>



## Use icon fonts with caution

Icon fonts are popular, and can be easy to use, but have some drawbacks 
compared to SVG icons.

* They're vector graphics that can be infinitely scaled, but may be 
  anti-aliased resulting in icons that aren’t as sharp as expected.
* Limited styling with CSS.
* Pixel perfect positioning can be difficult, depending on line-height, 
  letter spacing, etc.
* Are not semantic, and can be difficult to use with screen readers or 
  other assistive technology.
* Unless properly scoped, can result in a large file size for only using a 
  small subset of the icons available. 


<a href="/web/resources/samples/fundamentals/design-and-ui/media/images/icon-font.html">
<img src="img/icon-fonts.png" class="center"
srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x"
alt="Example of a page that uses FontAwesome for its font icons.">
</a>

  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre>With Font Awesome, you can either add icons by using a unicode
entity, like this HTML5 logo (<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">&quot;awesome&quot;</span><span class="nt">&gt;</span><span class="ni">&amp;#xf13b;</span><span class="nt">&lt;/span&gt;</span>)
or by adding special classes to an <span class="ni">&amp;lt;</span>i<span class="ni">&amp;gt;</span> element like the CSS3
logo (<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">&quot;fa fa-css3&quot;</span><span class="nt">&gt;&lt;/i&gt;</span>).
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/design-and-ui/media/images/icon-font.html">Try full sample</a>
      </p>
  </div>



There are hundreds of free and paid icon fonts available including [Font
Awesome](https://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/) and [Glyphicons](https://glyphicons.com/).

Be sure to balance the weight of the additional HTTP request and file size with
the need for the icons. For example, if you only need a handful of icons, it
may be better to use an image or an image sprite.



