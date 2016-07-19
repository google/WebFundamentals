project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: يعد أسلوب الطباعة أمرًا أساسيًا للحصول على تصميم رائع وكذلك علامة تجارية وسهولة قراءة ووصول. تمكِّن خطوط الويب جميع ما سبق وأكثر أيضًا: يكون النص قابلاً للتحديد والبحث والتكبير/التصغير ومناسبًا للعرض مع نسبة DPI مرتفعة، مما يوفر عرضًا متناسقًا وحادًا للنص بغض النظر عن حجم الشاشة والدقة. تمثل خطوط الويب أهمية كبيرة للحصول على تصميم جيد، وانطباع مستخدم وأداء رائع.

<p class="intro">
  Typography is fundamental to good design, branding, readability, and accessibility. Webfonts enable all of the above and more: the text is selectable, searchable, zoomable, and high-DPI friendly, providing consistent and sharp text rendering regardless of the screen size and resolution. Webfonts are critical to good design, UX, and performance.
</p>

Webfont optimization is a critical piece of the overall performance strategy. Each font is an additional resource, and some fonts may block rendering of the text, but just because the page is using webfonts doesn't mean that it has to render slower. To the contrary, an optimized font, combined with a judicious strategy for how they are loaded and applied on the page can help reduce the total page size, and improve page rendering times.



## Anatomy of a webfont

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






A webfont is a collection of glyphs, and each glyph is a vector shape that describes a letter or symbol. As a result, the size of a particular font file is determined by two simple variables: the complexity of the vector paths of each glyph and the number of glyphs in a particular font. For example, Open Sans, which is one of the most popular webfonts, contains 897 glyphs, which include Latin, Greek, and Cyrillic characters.

<img src="images/glyphs.png" class="center" alt="Font glyph table">

When picking a font, it is important to consider which character sets are supported. If you need to localize your page content to multiple languages, you should use a font that can deliver a consistent look and experience to your users. For example, [Google's Noto font family](https://www.google.com/get/noto/) aims to support all the world's languages. However, note that the total size of Noto, with all languages included, results in a 130MB+ ZIP download! 

Clearly, using fonts on the web requires some careful engineering to ensure that the typography does not stand in the way of performance. Thankfully, the web platform provides all the necessary primitives, and in the rest of this guide we'll take a hands-on look at how to get the best of both worlds.

### Webfont formats

Today there are four font container formats in use on the web: [EOT](https://en.wikipedia.org/wiki/Embedded_OpenType), [TTF](https://en.wikipedia.org/wiki/TrueType), [WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format), and [WOFF2](https://www.w3.org/TR/WOFF2/). Unfortunately, despite the wide range of choices, there isn't a single universal format that works across all old and new browsers: EOT is [IE only](http://caniuse.com/#feat=eot), TTF has [partial IE support](http://caniuse.com/#search=ttf), WOFF enjoys widest support but is [not available in some older browsers](http://caniuse.com/#feat=woff), and WOFF 2.0 support is a [work in progress for many browsers](http://caniuse.com/#feat=woff2).

So, where does that leave us? There isn't a single format that works in all browsers, which means that we need to deliver multiple formats to provide a consistent experience:

* Serve WOFF 2.0 variant to browsers that support it
* Serve WOFF variant to majority of browsers
* Serve TTF variant to old Android (below 4.4) browsers
* Serve EOT variant to old IE (below IE9) browsers
^





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






### Reducing font size with compression

A font is a collection of glyphs, each of which is a set of paths describing the letter form. The individual glyphs are, of course, different, but they nonetheless contain a lot of similar information that can be compressed with GZIP, or a compatible compressor: 

* EOT, and TTF formats are not compressed by default: ensure that your servers are configured to apply [GZIP compression](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip) when delivering these formats.
* WOFF has built-in compression - ensure that your WOFF compressor is using optimal compression settings. 
* WOFF2 uses custom preprocessing and compression algorithms to deliver ~30% filesize reduction over other formats - see [report](http://www.w3.org/TR/WOFF20ER/).

Finally, it is worth noting that some font formats contain additional metadata, such as [font hinting](https://en.wikipedia.org/wiki/Font_hinting) and [kerning](https://en.wikipedia.org/wiki/Kerning) information that may not be necessary on some platforms, which allows for further filesize optimization. Consult your font compressor for available optimization options, and if you take this route, ensure that you have the appropriate infrastructure to test and deliver these optimized fonts to each particular browser - e.g. Google Fonts maintains 30+ optimized variants for each font and automatically detects and delivers the optimal variant for each platform and browser.





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Defining font family with @font-face

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






The @font-face CSS at-rule allows us to define the location of a particular font resource, its style characteristics, and the Unicode codepoints for which it should be used. A combination of such @font-face declarations can be used to construct a "font family", which the browser will use to evaluate which font resources need to be downloaded and applied to the current page. Let's take a closer look at how this works under the hood.

### Format selection

Each @font-face declaration provides the name of the font family, which acts as a logical group of multiple declarations, [font properties](http://www.w3.org/TR/css3-fonts/#font-prop-desc) such as style, weight, and stretch, and the [src descriptor](http://www.w3.org/TR/css3-fonts/#src-desc) that specifies a prioritized list of locations for the font resource.

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="k">@font-face</span> <span class="p">{</span>
  <span class="nt">font-family</span><span class="o">:</span> <span class="s1">&#39;Awesome Font&#39;</span><span class="o">;</span>
  <span class="nt">font-style</span><span class="o">:</span> <span class="nt">normal</span><span class="o">;</span>
  <span class="nt">font-weight</span><span class="o">:</span> <span class="nt">400</span><span class="o">;</span>
  <span class="nt">src</span><span class="o">:</span> <span class="nt">local</span><span class="o">(</span><span class="s1">&#39;Awesome Font&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome.woff2&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff2&#39;</span><span class="o">),</span> 
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome.woff&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome.ttf&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;ttf&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome.eot&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;eot&#39;</span><span class="o">);</span>
<span class="p">}</span>

<span class="k">@font-face</span> <span class="p">{</span>
  <span class="nt">font-family</span><span class="o">:</span> <span class="s1">&#39;Awesome Font&#39;</span><span class="o">;</span>
  <span class="nt">font-style</span><span class="o">:</span> <span class="nt">italic</span><span class="o">;</span>
  <span class="nt">font-weight</span><span class="o">:</span> <span class="nt">400</span><span class="o">;</span>
  <span class="nt">src</span><span class="o">:</span> <span class="nt">local</span><span class="o">(</span><span class="s1">&#39;Awesome Font Italic&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-i.woff2&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff2&#39;</span><span class="o">),</span> 
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-i.woff&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-i.ttf&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;ttf&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-i.eot&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;eot&#39;</span><span class="o">);</span>
<span class="p">}</span></code></pre></div>

First, note that the above examples defines a single _Awesome Font_ family with two styles (normal and _italic_), each of which points to a different set of font resources. In turn, each `src` descriptor contains a prioritized, 
comma-separated list of resource variants: 

* `local()` directive allows us to reference, load, and use locally installed fonts.
* `url()` directive allows us to load external fonts, and are allowed to contain an optional `format()` hint indicating the format of the font referenced by the provided URL.

^




















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






When the browser determines that the font is needed, it iterates through the provided resource list in the specified order and tries to load the appropriate resource. For example, following the example above:

1. Browser performs page layout and determines which font variants are required to render specified text on the page.
1. For each required font the browser checks if the font is available locally.
1. If the file is not available locally, it iterates over external definitions:
  * If a format hint is present the browser checks if it supports it before initiating the download, and otherwise advances to the next one.
  * If no format hint is present, the browser downloads the resource.

The combination of local and external directives with appropriate format hints allows us to specify all of the available font formats and let the browser handle the rest: the browser figures out which resources are required and will select the optimal format on our behalf.





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






### Unicode-range subsetting

In addition to font properties such as style, weight, and stretch, the 
@font-face rule allows us to define a set of Unicode codepoints supported by 
each resource. This enables us to split a large Unicode font into smaller 
subsets (e.g. Latin, Cyrillic, Greek subsets) and only download the glyphs required to render the text on a particular page.

The [unicode-range descriptor](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range) allows us to specify a comma-delimited list of range values, each of which can be in one of three different forms:

* Single codepoint (e.g. U+416)
* Interval range (e.g. U+400-4ff): indicates the start and end codepoints of a range
* Wildcard range (e.g. U+4??): '?' characters indicate any hexadecimal digit

For example, we can split our _Awesome Font_ family into Latin and Japanese 
subsets, each of which will be downloaded by the browser on as-needed basis: 

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="k">@font-face</span> <span class="p">{</span>
  <span class="nt">font-family</span><span class="o">:</span> <span class="s1">&#39;Awesome Font&#39;</span><span class="o">;</span>
  <span class="nt">font-style</span><span class="o">:</span> <span class="nt">normal</span><span class="o">;</span>
  <span class="nt">font-weight</span><span class="o">:</span> <span class="nt">400</span><span class="o">;</span>
  <span class="nt">src</span><span class="o">:</span> <span class="nt">local</span><span class="o">(</span><span class="s1">&#39;Awesome Font&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l.woff2&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff2&#39;</span><span class="o">),</span> 
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l.woff&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l.ttf&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;ttf&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l.eot&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;eot&#39;</span><span class="o">);</span>
  <span class="nt">unicode-range</span><span class="o">:</span> <span class="nt">U</span><span class="o">+</span><span class="nt">000-5FF</span><span class="o">;</span> <span class="c">/* Latin glyphs */</span>
<span class="p">}</span>

<span class="k">@font-face</span> <span class="p">{</span>
  <span class="nt">font-family</span><span class="o">:</span> <span class="s1">&#39;Awesome Font&#39;</span><span class="o">;</span>
  <span class="nt">font-style</span><span class="o">:</span> <span class="nt">normal</span><span class="o">;</span>
  <span class="nt">font-weight</span><span class="o">:</span> <span class="nt">400</span><span class="o">;</span>
  <span class="nt">src</span><span class="o">:</span> <span class="nt">local</span><span class="o">(</span><span class="s1">&#39;Awesome Font&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-jp.woff2&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff2&#39;</span><span class="o">),</span> 
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-jp.woff&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-jp.ttf&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;ttf&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-jp.eot&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;eot&#39;</span><span class="o">);</span>
  <span class="nt">unicode-range</span><span class="o">:</span> <span class="nt">U</span><span class="o">+</span><span class="nt">3000-9FFF</span><span class="o">,</span> <span class="nt">U</span><span class="o">+</span><span class="nt">ff</span><span class="o">??;</span> <span class="c">/* Japanese glyphs */</span>
<span class="p">}</span></code></pre></div>





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






The use of unicode range subsets, and separate files for each stylistic variant of the font allows us to define a composite font family that is both faster and more efficient to download - the visitor will only download the variants and subsets it needs, and they are not forced to download subsets that they may never see or use on the page. 

That said, there is one small gotcha with unicode-range: [not all browser 
support it](http://caniuse.com/#feat=font-unicode-range), yet. Some browsers 
simply ignore the unicode-range hint and will download all variants, while 
others may not process the @font-face declaration at all. To address this, we need to fallback to "manual subsetting" for older browsers.

Because old browsers are not smart enough to select just the necessary subsets and cannot construct a composite font, we have to fallback to providing a single font resource that contains all necessary subsets, and hide the rest from the browser. For example, if the page is only using Latin characters, then we can strip other glyphs and serve that particular subset as a standalone resource. 

1. **How do we determine which subsets are needed?** 
  - If unicode-range subsetting is supported by the browser, then it will automatically select the right subset. The page just needs to provide the subset files and specify appropriate unicode-ranges in the @font-face rules.
  - If unicode-range is not supported then the page needs to hide all unnecessary subsets - i.e. the developer must specify required subsets.
1. **How do we generate font subsets?**
  - Use the open-source [pyftsubset tool](https://github.com/behdad/fonttools/) to subset and optimize your fonts.
  - Some font services allow manual subsetting via custom query parameters, which you can use to manually specify the required subset for your page - consult the documentation of your font provider.


### Font selection and synthesis

Each font family is composed of multiple stylistic variants (regular, bold, italic) and multiple weights for each style, each of which, in turn, may contain very different glyph shapes - e.g. different spacing, sizing, or a different shape altogether. 

<img src="images/font-weights.png" class="center" alt="Font weights">

For example, the above diagram illustrates a font family that offers three 
different bold weights: 400 (regular), 700 (bold), and 900 (extra bold). All 
other in-between variants (indicated in gray) are automatically mapped to the 
closest variant by the browser. 


<blockquote>
  When a weight is specified for which no face exists, a face with a nearby  weight is used. In general, bold weights map to faces with heavier weights and light weights map to faces with lighter weights.
  <p><a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">CSS3 font matching algorithm</a></p>
</blockquote>


Similar logic applies to _italic_ variants. The font designer controls which 
variants they will produce, and we control which variants we will use on the 
page - since each variant is a separate download, it's a good idea to keep the 
number of variants small! For example, we can define two bold variants for our 
_Awesome Font_ family: 

<div class="highlight"><pre><code class="language-css" data-lang="css"><span class="k">@font-face</span> <span class="p">{</span>
  <span class="nt">font-family</span><span class="o">:</span> <span class="s1">&#39;Awesome Font&#39;</span><span class="o">;</span>
  <span class="nt">font-style</span><span class="o">:</span> <span class="nt">normal</span><span class="o">;</span>
  <span class="nt">font-weight</span><span class="o">:</span> <span class="nt">400</span><span class="o">;</span>
  <span class="nt">src</span><span class="o">:</span> <span class="nt">local</span><span class="o">(</span><span class="s1">&#39;Awesome Font&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l.woff2&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff2&#39;</span><span class="o">),</span> 
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l.woff&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l.ttf&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;ttf&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l.eot&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;eot&#39;</span><span class="o">);</span>
  <span class="nt">unicode-range</span><span class="o">:</span> <span class="nt">U</span><span class="o">+</span><span class="nt">000-5FF</span><span class="o">;</span> <span class="c">/* Latin glyphs */</span>
<span class="p">}</span>

<span class="k">@font-face</span> <span class="p">{</span>
  <span class="nt">font-family</span><span class="o">:</span> <span class="s1">&#39;Awesome Font&#39;</span><span class="o">;</span>
  <span class="nt">font-style</span><span class="o">:</span> <span class="nt">normal</span><span class="o">;</span>
  <span class="nt">font-weight</span><span class="o">:</span> <span class="nt">700</span><span class="o">;</span>
  <span class="nt">src</span><span class="o">:</span> <span class="nt">local</span><span class="o">(</span><span class="s1">&#39;Awesome Font&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l-700.woff2&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff2&#39;</span><span class="o">),</span> 
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l-700.woff&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;woff&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l-700.ttf&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;ttf&#39;</span><span class="o">),</span>
       <span class="nt">url</span><span class="o">(</span><span class="s1">&#39;/fonts/awesome-l-700.eot&#39;</span><span class="o">)</span> <span class="nt">format</span><span class="o">(</span><span class="s1">&#39;eot&#39;</span><span class="o">);</span>
  <span class="nt">unicode-range</span><span class="o">:</span> <span class="nt">U</span><span class="o">+</span><span class="nt">000-5FF</span><span class="o">;</span> <span class="c">/* Latin glyphs */</span>
<span class="p">}</span></code></pre></div>

The above example declares the _Awesome Font_ family that is composed of two resources that cover the same set of Latin glyphs (U+000-5FF) but offer two different "weights": normal (400), and bold (700). However, what happens if one of our CSS rules specifies a different font weight, or sets the font-style 
property to italic?

* If an exact font match is not available the browser will substitute the closest match.
* If no stylistic match is found (e.g. we did not declare any italic variants in example above), then the browser will synthesize its own font variant. 

<img src="images/font-synthesis.png" class="center" alt="Font synthesis">

<blockquote>
  Authors should also be aware that synthesized approaches may not be suitable for scripts like Cyrillic, where italic forms are very different in shape. It is always better to use an actual italic font rather than rely on a synthetic version.
  <p><a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">CSS3 font-style</a></p>
</blockquote>

The example above illustrates the difference between the actual vs. synthesized font results for Open-Sans - all synthesized variants are generated from a single 400-weight font. As you can tell, there is a noticeable difference in the results. The details of how to generate the bold and oblique variants are not specified. Hence, the results will vary from browser to browser, and will also be highly dependent on the font.





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Optimizing loading and rendering

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






A "full" webfont that includes all stylistic variants, which we may not need, plus all the glyphs, which may go unused, can easily result in a multi-megabyte download. To address this, the @font-face CSS rule is specifically designed to allow us to split the font family into a collection of resources: unicode subsets, distinct style variants, and so on. 

Given these declarations the browser figures out the required subsets and variants and downloads the minimal set required to render the text. This behavior is very convenient, but if we're not careful, it can also create a performance bottleneck in the critical rendering path and delay text rendering - something that we would certainly like to avoid! 

### Webfonts and the Critical Rendering Path

Lazy loading of fonts carries an important hidden implication that may delay text rendering: the browser must [construct the render tree](/web/fundamentals/performance/critical-rendering-path/render-tree-construction), which is dependent on the DOM and CSSOM trees, before it will know which font resources it will need to render the text. As a result, font requests are delayed well after other critical resources, and the browser may be blocked from rendering text until the resource is fetched.

<img src="images/font-crp.png" class="center" alt="Font critical rendering path">

1. Browser requests HTML document
1. Browser begins parsing HTML response and constructing the DOM
1. Browser discovers CSS, JS and other resources and dispatches requests
1. Browser constructs the CSSOM once all CSS content is received and combines it with the DOM tree to construct the render tree
  * Font requests are dispatched once render tree indicates which font variants are needed to render the specified text on the page
1. Browser performs layout and paints content to the screen
  * If the font is not yet available the browser may not render any text pixels
  * Once the font is available the browser paints text pixels

The "race" between the first paint of page content, which can be done shortly 
after the render tree is built, and the request for the font resource is what 
creates the "blank text problem" where the browser may render page layout but 
omits any text. The actual behavior differs between various browsers:

* Safari hold text rendering until the font download is complete.
* Chrome and Firefox hold font rendering for up to 3 seconds, after which they use a fallback font, and once the font download has finished they re-render the text once more with the downloaded font.
* IE immediately renders with the fallback font if the request font is not yet available, and re-renders it once the font download is complete.

There are good arguments for and against the different rendering strategies: some people find re-rendering jarring while others prefer to see immediate results and don't mind the page reflow once the font download has finished - we won't get into this argument here. The important point is that lazyloading 
reduces the number of bytes, but also has the potential to delay text rendering. Next, let's take a look at how we can optimize this behavior.

### Optimizing font rendering with the Font Loading API

[Font Loading API](http://dev.w3.org/csswg/css-font-loading/) provides a scripting interface to define and manipulate CSS font faces, track their download progress, and override their default lazyload behavior. For example, if we're certain that a particular font variant will be required, we can define it and tell the browser to initiate an immediate fetch of the font resource:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">font</span> <span class="o">=</span> <span class="k">new</span> <span class="nx">FontFace</span><span class="p">(</span><span class="s2">&quot;Awesome Font&quot;</span><span class="p">,</span> <span class="s2">&quot;url(/fonts/awesome.woff2)&quot;</span><span class="p">,</span> <span class="p">{</span>
  <span class="nx">style</span><span class="o">:</span> <span class="s1">&#39;normal&#39;</span><span class="p">,</span> <span class="nx">unicodeRange</span><span class="o">:</span> <span class="s1">&#39;U+000-5FF&#39;</span><span class="p">,</span> <span class="nx">weight</span><span class="o">:</span> <span class="s1">&#39;400&#39;</span>
<span class="p">});</span>

<span class="nx">font</span><span class="p">.</span><span class="nx">load</span><span class="p">();</span> <span class="c1">// don&#39;t wait for render tree, initiate immediate fetch!</span>

<span class="nx">font</span><span class="p">.</span><span class="nx">ready</span><span class="p">().</span><span class="nx">then</span><span class="p">(</span><span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="c1">// apply the font (which may rerender text and cause a page reflow)</span>
  <span class="c1">// once the font has finished downloading</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">fonts</span><span class="p">.</span><span class="nx">add</span><span class="p">(</span><span class="nx">font</span><span class="p">);</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">body</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">fontFamily</span> <span class="o">=</span> <span class="s2">&quot;Awesome Font, serif&quot;</span><span class="p">;</span>

  <span class="c1">// OR... by default content is hidden, and rendered once font is available</span>
  <span class="kd">var</span> <span class="nx">content</span> <span class="o">=</span> <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s2">&quot;content&quot;</span><span class="p">);</span>
  <span class="nx">content</span><span class="p">.</span><span class="nx">style</span><span class="p">.</span><span class="nx">visibility</span> <span class="o">=</span> <span class="s2">&quot;visible&quot;</span><span class="p">;</span>

  <span class="c1">// OR... apply own render strategy here... </span>
<span class="p">});</span></code></pre></div>

Further, because we can check font status (via [check()](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check)) method and track its download progress, we can also define a custom strategy for rendering text on our pages: 

* We can hold all text rendering until the font is available.
* We can implement a custom timeout for each font.
* We can use the fallback font to unblock rendering and inject a new style that uses desired font once the font is available.

Best of all, we can also mix and match above strategies for different content on the page - e.g. hold text rendering on some sections until font is available, use a fallback and then rerender once the font download has finished, specify different timeouts, and so on. 





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






### Optimizing font rendering with inlining

A simple alternative strategy to using the Font Loading API to eliminate the "blank text problem" is to inline the font contents into a CSS stylesheet:

* CSS stylesheets with matching media queries are automatically downloaded by the browser with high priority as they are required to construct the CSSOM.
* Inlining the font data into CSS stylesheet forces the browser to download the font with high priority and without waiting for the render tree - i.e. this acts as a manual override to the default lazyload behavior.

The inlining strategy is not as flexible and does not allow us to define custom timeouts or rendering strategies for different content, but it is a simple and robust solution that works across all browsers. For best results, separate inlined fonts into standalone stylesheet and serve them with a long max-age - this way, when you update your CSS you are not forcing your visitors to redownload the fonts. 





















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






### Optimizing font reuse with HTTP Caching

Font resources are, typically, static resources that don't see frequent updates. As a result, they are ideally suited for a long max-age expiry - ensure that you specify both a [conditional ETag header](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags), and an [optimal Cache-Control policy](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control) for all font resources.   
    
There is no need to store fonts in localStorage or via other mechanisms - each 
of those has their set of performance gotchas. The browser's HTTP cache, in 
combination with Font Loading API or the webfontloader library, provides the 
best and most robust mechanism to deliver font resources to the browser.


## Optimization checklist

Contrary to popular belief, use of webfonts does not need to delay page rendering or have negative impact on other performance metrics. Well optimized use of fonts can deliver a much better overall user experience: great branding, improved readability, usability, and searchability, all the while delivering a scalable multi-resolution solution that adapts well to all screen formats and resolutions. Don't be afraid to use webfonts! 

That said, a naive implementation may incur large downloads and unnecessary delays. This is where we need to dust off our optimization toolkit and assist the browser by optimizing the font assets themselves and how they are fetched and used on our pages. 

1. **Audit and monitor your font use:** do not use too many fonts on your pages, and for each font, minimize the number of used variants. This will assist in delivering a more consistent and a faster experience for your users.
1. **Subset your font resources:** many fonts can be subset, or split into multiple unicode-ranges to deliver just the glyphs required by a particular page - this reduces the filesize and improves download speed of the resource. However, when defining the subsets be careful to optimize for font re-use - e.g. you don't want to download a different but overlapping set of characters on each page. A good practice is to subset based on script - e.g. Latin, Cyrillic, and so on.
1. **Deliver optimized font formats to each browser:** each font should be provided in WOFF2, WOFF, EOT, and TTF formats. Make sure to apply GZIP compression to EOT and TTF formats, as they are not compressed by default.
1. **Specify revalidation and optimal caching policies:** fonts are static resources that are infrequently updated. Make sure that your servers provide a long-lived max-age timestamp, and a revalidation token, to allow for efficient font re-use between different pages.
1. **Use Font Loading API to optimize the Critical Rendering Path:** default lazyloading behavior may result in delayed text rendering. Font Loading API allows us to override this behavior for particular fonts, and to specify custom rendering and timeout strategies for different content on the page. For older browsers that do not support the API, you can use the webfontloader JavaScript library or use the CSS inlining strategy.

