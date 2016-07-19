project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: The Geolocation API lets you watch where the user is and keep tabs on them as they move around, always with the user's consent.

<p class="intro">
  The Geolocation API lets you watch where the user is and keep tabs on them as they move 
  around, always with the user's consent.
</p>

**Note**: [As of Chrome 50, the Geolocation API will only work on secure contexts such as HTTPS](/web/updates/2016/04/geolocation-on-secure-contexts-only).
If your site is hosted on an non-secure origin (such as `HTTP`) the requests to get the users.
location will no longer function.



The API is device-agnostic; it doesn't care how the browser determines
location, so long as clients can request and receive location data in a
standard way. The underlying mechanism might be via GPS, wifi. Since any of
these lookups is going to take some time, the API is asynchronous; you pass it
a callback method whenever you request a location.

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## When to use Geolocation to watch the user's location

*  You want to obtain a more precise lock on the user location.
*  Your application needs to update the user interface based on new location 
   information.
*  You applications needs to update business logic when the user enters a certain
   defined zone.

## Watching the users location

The Geolocation API allows you to obtain the user's location (with user
consent) with a single call to `getCurrentPosition()`.  

If you want to continually monitor the location of the user, the geolocation
API has a method called `watchPosition()`. It operates in a similar way to
`getCurrentPosition()` yet it will fire multiple times as the positioning
software:

1.  Gets a more accurate lock on the user.
2.  The user's position changes.
 
<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">watchId</span> <span class="o">=</span> <span class="nx">navigator</span><span class="p">.</span><span class="nx">geolocation</span><span class="p">.</span><span class="nx">watchPosition</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">position</span><span class="p">)</span> <span class="p">{</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s1">&#39;currentLat&#39;</span><span class="p">).</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">position</span><span class="p">.</span><span class="nx">coords</span><span class="p">.</span><span class="nx">latitude</span><span class="p">;</span>
  <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s1">&#39;currentLon&#39;</span><span class="p">).</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">position</span><span class="p">.</span><span class="nx">coords</span><span class="p">.</span><span class="nx">longitude</span><span class="p">;</span>
<span class="p">});</span></code></pre></div>

## Always clear up and conserve battery

Watching for changes to a geolocation is not a free operation.  Whilst
operating systems might be introducing platform features to let applications
hook in to the geo subsystem, you as a web developer have no idea what support
the user's device has for monitoring the user's location and whilst you are watching
a position you are engaging the device in a lot of extra processing

Once you have no need to track the user's position call `clearWatch` to turn
off the geolocation systems.

## Always Handle Errors

Unfortunately, not all location lookups are successful. Perhaps a GPS could
not be located or the user has suddenly disabled location lookups. A second,
optional, argument to getCurrentPosition() will be called in the event of an
error, so you can notify the user inside the callback:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="nb">window</span><span class="p">.</span><span class="nx">onload</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">startPos</span><span class="p">;</span>
  <span class="kd">var</span> <span class="nx">geoSuccess</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">position</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">startPos</span> <span class="o">=</span> <span class="nx">position</span><span class="p">;</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s1">&#39;startLat&#39;</span><span class="p">).</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">startPos</span><span class="p">.</span><span class="nx">coords</span><span class="p">.</span><span class="nx">latitude</span><span class="p">;</span>
    <span class="nb">document</span><span class="p">.</span><span class="nx">getElementById</span><span class="p">(</span><span class="s1">&#39;startLon&#39;</span><span class="p">).</span><span class="nx">innerHTML</span> <span class="o">=</span> <span class="nx">startPos</span><span class="p">.</span><span class="nx">coords</span><span class="p">.</span><span class="nx">longitude</span><span class="p">;</span>
  <span class="p">};</span>
  <span class="kd">var</span> <span class="nx">geoError</span> <span class="o">=</span> <span class="kd">function</span><span class="p">(</span><span class="nx">position</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">console</span><span class="p">.</span><span class="nx">log</span><span class="p">(</span><span class="s1">&#39;Error occurred. Error code: &#39;</span> <span class="o">+</span> <span class="nx">error</span><span class="p">.</span><span class="nx">code</span><span class="p">);</span>
    <span class="c1">// error.code can be:</span>
    <span class="c1">//   0: unknown error</span>
    <span class="c1">//   1: permission denied</span>
    <span class="c1">//   2: position unavailable (error response from location provider)</span>
    <span class="c1">//   3: timed out</span>
  <span class="p">};</span>
  <span class="nx">navigator</span><span class="p">.</span><span class="nx">geolocation</span><span class="p">.</span><span class="nx">watchPosition</span><span class="p">(</span><span class="nx">geoSuccess</span><span class="p">,</span> <span class="nx">geoError</span><span class="p">);</span>
<span class="p">};</span></code></pre></div>



