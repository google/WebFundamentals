project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Relevant and appropriate ads can actually improve the user experience. While the actual ad content comes from advertisers, you have control over the content type, color, size, and placement of the ads.

<p class="intro">
  Relevant and appropriate ads can actually improve the user experience. While the actual ad content comes from advertisers, you have control over the content type, color, size, and placement of the ads.
</p>



















<div class="wf-highlight-list wf-highlight-list--learning" markdown="1">
  <h3 class="wf-highlight-list__title">TL;DR</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Never place ads where they might interfere with a user's intended experience on your site; ensure ads above the fold don't push important content below it.</li>
    
    <li>Always use responsive ad units; if smart sizing isn't enough, switch to advanced mode.</li>
    
    <li>Look for opportunities to integrate ads throughout the content to avoid ad blindness.</li>
    
    <li>Choose text styles that blend, compliment, or contrast your site.</li>
    
  </ul>
  
</div>



## Place ads where users benefit the most

When it comes to deciding where to place ads on your site,
and how many ads to include, always put the user first!

* Use ads to augment site content; not the other way around.
* Pages with excessive ads, ads that push important content down below the fold, 
ads clustered together that dominate the viewable space or ads without clear 
labeling lead to lower user satisfaction and are against AdSense policies.
* Ensure ads provide value to users. If you have ad units that generate 
significantly less revenue or drive less clicks or views, it’s likely they 
are not providing value to users.

Sample placement options for mobile ads:

<img src="images/mobile_ads_placement.png" class="center" alt="Sample mobile image ad">

For more information, review the AdSense 
[best practices for ads placement](https://support.google.com/adsense/answer/1282097).


## What if responsive sizing isn't enough?
In some cases, you may need more control over the way your ads are displayed
than simply using responsive ads.  In this case, you can switch 
to advanced mode and override smart sizing in your responsive ad unit code. 
For example, you can control the exact sizing of ads using
[media queries](/web/fundamentals/design-and-ui/responsive/fundamentals/use-media-queries):

1. Follow the instructions to [create a responsive ad unit](/web/fundamentals/discovery-and-monetization/monetization-with-ads/include-ads#create-ad-units).
2. In the Ad code box, select the <strong>Advanced (code modification required)</strong>
from the Mode drop-down.
3. Modify the ad code to set the exact sizes of your ads based on the user's device:

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;ins</span> <span class="na">class=</span><span class="s">&quot;adsbygoogle adslot_1&quot;</span>
    <span class="na">style=</span><span class="s">&quot;display:block;&quot;</span>
    <span class="na">data-ad-client=</span><span class="s">&quot;ca-pub-1234&quot;</span>
    <span class="na">data-ad-slot=</span><span class="s">&quot;5678&quot;</span><span class="nt">&gt;&lt;/ins&gt;</span>
<span class="nt">&lt;script </span><span class="na">async</span> <span class="na">src=</span><span class="s">&quot;//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js&quot;</span><span class="nt">&gt;&lt;/script&gt;</span>
<span class="nt">&lt;script&gt;</span><span class="p">(</span><span class="nx">adsbygoogle</span> <span class="o">=</span> <span class="nb">window</span><span class="p">.</span><span class="nx">adsbygoogle</span> <span class="o">||</span> <span class="p">[]).</span><span class="nx">push</span><span class="p">({});</span><span class="nt">&lt;/script&gt;</span></code></pre></div>

<a href="/web/resources/samples/fundamentals/discovery-and-monetization/monetization-with-ads/customize.html">
  Try it
</a>

See [advanced features](https://support.google.com/adsense/answer/3543893) in the AdSense help for more information.




















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Important</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Always test your ads on different devices and screens to make sure that the responsive behavior is working correctly.</li>
    
  </ul>
  
</div>



## Choose styles that compliment your site

The [most successful ads](https://support.google.com/adsense/answer/17957)
blend or contrast your site's styles. Google AdSense provides a set of 
[predefined ad styles](https://support.google.com/adsense/answer/6002585);
choose the style that best fits your site or create your own.

### What's customizable

You can customize any of the following styles in text ads:

* Border color
* Background color
* Text font family and font size
* Default text color
* Text color specific for the ad title
* Text color specific for URLs

### How to apply styles

When creating a new unit, you can apply a different style to text ads by 
expanding the <strong>Text ad style</strong> property:

<img src="images/customize.png" class="center" alt="Text ad styles">

All text ads use the Google AdSense <strong>Default</strong> style.  You can 
use any of the predefined style as is, make slight changes to the style,
or create, your own custom style.

Once you've saved a new style, you can apply it to any of your existing or 
new ad units:

1. Navigate to [Ad Styles](https://www.google.com/adsense/app#myads-springboard/view=AD_STYLES).
2. Select the ad style you want to change from the list of 
<strong>Ad styles available for all your active products</strong>.
3. Make changes and <strong>Save ad style</strong>.

When you change an existing ad style, any active ad units using that style 
are automatically updated.




















<div class="wf-highlight-list wf-highlight-list--remember" markdown="1">
  <h3 class="wf-highlight-list__title">Note</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>Advertisers have full control over how their display ads look. You can influence the types of display ads that appear on your site using ad placement and sizing, but you can't actually control the image content.</li>
    
  </ul>
  
</div>




