project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Fast first loads with Progressive Web Apps and the App Shell model.

<p class="intro">
Progressive Web Apps should start fast and be usable immediately. In its 
current state, our Weather App starts quickly, but it's not useable. There's no 
data. We could make an AJAX request to get that data, but that results in an 
extra request and makes the initial load longer. Instead, provide real data in 
the first load.
</p>



## Inject the weather forecast data

For this code lab, we'll statically inject a weather forecast, but in a 
production app, the latest weather forecast data would be injected by the server 
based on the IP address geolocation of the user. 

Add the following inside the immediately invoked function expression:

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="kd">var</span> <span class="nx">initialWeatherForecast</span> <span class="o">=</span> <span class="p">{</span>  
  <span class="nx">key</span><span class="o">:</span> <span class="s1">&#39;newyork&#39;</span><span class="p">,</span>  
  <span class="nx">label</span><span class="o">:</span> <span class="s1">&#39;New York, NY&#39;</span><span class="p">,</span>  
  <span class="nx">currently</span><span class="o">:</span> <span class="p">{</span>  
    <span class="nx">time</span><span class="o">:</span> <span class="mi">1453489481</span><span class="p">,</span>  
    <span class="nx">summary</span><span class="o">:</span> <span class="s1">&#39;Clear&#39;</span><span class="p">,</span>  
    <span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;partly-cloudy-day&#39;</span><span class="p">,</span>  
    <span class="nx">temperature</span><span class="o">:</span> <span class="mf">52.74</span><span class="p">,</span>  
    <span class="nx">apparentTemperature</span><span class="o">:</span> <span class="mf">74.34</span><span class="p">,</span>  
    <span class="nx">precipProbability</span><span class="o">:</span> <span class="mf">0.20</span><span class="p">,</span>  
    <span class="nx">humidity</span><span class="o">:</span> <span class="mf">0.77</span><span class="p">,</span>  
    <span class="nx">windBearing</span><span class="o">:</span> <span class="mi">125</span><span class="p">,</span>  
    <span class="nx">windSpeed</span><span class="o">:</span> <span class="mf">1.52</span>  
  <span class="p">},</span>  
  <span class="nx">daily</span><span class="o">:</span> <span class="p">{</span>  
    <span class="nx">data</span><span class="o">:</span> <span class="p">[</span>  
      <span class="p">{</span><span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;clear-day&#39;</span><span class="p">,</span> <span class="nx">temperatureMax</span><span class="o">:</span> <span class="mi">55</span><span class="p">,</span> <span class="nx">temperatureMin</span><span class="o">:</span> <span class="mi">34</span><span class="p">},</span>  
      <span class="p">{</span><span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;rain&#39;</span><span class="p">,</span> <span class="nx">temperatureMax</span><span class="o">:</span> <span class="mi">55</span><span class="p">,</span> <span class="nx">temperatureMin</span><span class="o">:</span> <span class="mi">34</span><span class="p">},</span>  
      <span class="p">{</span><span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;snow&#39;</span><span class="p">,</span> <span class="nx">temperatureMax</span><span class="o">:</span> <span class="mi">55</span><span class="p">,</span> <span class="nx">temperatureMin</span><span class="o">:</span> <span class="mi">34</span><span class="p">},</span>  
      <span class="p">{</span><span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;sleet&#39;</span><span class="p">,</span> <span class="nx">temperatureMax</span><span class="o">:</span> <span class="mi">55</span><span class="p">,</span> <span class="nx">temperatureMin</span><span class="o">:</span> <span class="mi">34</span><span class="p">},</span>  
      <span class="p">{</span><span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;fog&#39;</span><span class="p">,</span> <span class="nx">temperatureMax</span><span class="o">:</span> <span class="mi">55</span><span class="p">,</span> <span class="nx">temperatureMin</span><span class="o">:</span> <span class="mi">34</span><span class="p">},</span>  
      <span class="p">{</span><span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;wind&#39;</span><span class="p">,</span> <span class="nx">temperatureMax</span><span class="o">:</span> <span class="mi">55</span><span class="p">,</span> <span class="nx">temperatureMin</span><span class="o">:</span> <span class="mi">34</span><span class="p">},</span>  
      <span class="p">{</span><span class="nx">icon</span><span class="o">:</span> <span class="s1">&#39;partly-cloudy-day&#39;</span><span class="p">,</span> <span class="nx">temperatureMax</span><span class="o">:</span> <span class="mi">55</span><span class="p">,</span> <span class="nx">temperatureMin</span><span class="o">:</span> <span class="mi">34</span><span class="p">}</span>  
    <span class="p">]</span>  
  <span class="p">}</span>  
<span class="p">};</span></code></pre></div>

Next, remove the `fakeForecast` data that we created earlier for testing as we 
won't be using it any more.

## Differentiating the first run

But, how do we know when to display this information, which may not be relevant 
on future loads when the weather app is pulled from the cache? When the user 
loads the app on subsequent visits, they may have changed cities, so we need to 
load the information for those cities, not necessarily the first city they ever 
looked up.

User preferences, like the list of cities a user has subscribed to, should be 
stored locally using IndexedDB or other fast storage mechanism. To simplify this 
sample as much as possible, we've used `localStorage`, which is not ideal for 
production apps because it is a blocking, synchronous storage mechanism that is 
potentially very slow on some devices.


















<div class="wf-highlight-list wf-highlight-list--note" markdown="1">
  <h3 class="wf-highlight-list__title">Note</h3>

  
  <ul class="wf-highlight-list__list">
    
    <li>For extra credit, replace the <code>localStorage</code> implementation with <a href='https://www.npmjs.com/package/idb'>idb</a></li>
    
  </ul>
  
</div>



First, let's add the code required to save user preferences within `app.js`:  

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="c1">// Save list of cities to localStorage, see note below about localStorage.</span>
<span class="nx">app</span><span class="p">.</span><span class="nx">saveSelectedCities</span> <span class="o">=</span> <span class="kd">function</span><span class="p">()</span> <span class="p">{</span>
  <span class="kd">var</span> <span class="nx">selectedCities</span> <span class="o">=</span> <span class="nx">JSON</span><span class="p">.</span><span class="nx">stringify</span><span class="p">(</span><span class="nx">app</span><span class="p">.</span><span class="nx">selectedCities</span><span class="p">);</span>
  <span class="c1">// IMPORTANT: See notes about use of localStorage.</span>
  <span class="nx">localStorage</span><span class="p">.</span><span class="nx">selectedCities</span> <span class="o">=</span> <span class="nx">selectedCities</span><span class="p">;</span>
<span class="p">};</span></code></pre></div>

Next, let's add the startup code to check if the user has any subscribed cities 
and render those, or use the injected data. Add the following code to your 
`app.js`:  

<div class="highlight"><pre><code class="language-javascript" data-lang="javascript"><span class="cm">/****************************************************************************   </span>
<span class="cm"> *</span>
<span class="cm"> * Code required to start the app</span>
<span class="cm"> *</span>
<span class="cm"> * NOTE: To simplify this getting started guide, we&#39;ve used localStorage.</span>
<span class="cm"> *   localStorage is a synchronous API and has serious performance</span>
<span class="cm"> *   implications. It should not be used in production applications!</span>
<span class="cm"> *   Instead, check out IDB (https://www.npmjs.com/package/idb) or</span>
<span class="cm"> *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)</span>
<span class="cm"> *</span>
<span class="cm"> ****************************************************************************/</span>

<span class="nx">app</span><span class="p">.</span><span class="nx">selectedCities</span> <span class="o">=</span> <span class="nx">localStorage</span><span class="p">.</span><span class="nx">selectedCities</span><span class="p">;</span>
<span class="k">if</span> <span class="p">(</span><span class="nx">app</span><span class="p">.</span><span class="nx">selectedCities</span><span class="p">)</span> <span class="p">{</span>
  <span class="nx">app</span><span class="p">.</span><span class="nx">selectedCities</span> <span class="o">=</span> <span class="nx">JSON</span><span class="p">.</span><span class="nx">parse</span><span class="p">(</span><span class="nx">app</span><span class="p">.</span><span class="nx">selectedCities</span><span class="p">);</span>
  <span class="nx">app</span><span class="p">.</span><span class="nx">selectedCities</span><span class="p">.</span><span class="nx">forEach</span><span class="p">(</span><span class="kd">function</span><span class="p">(</span><span class="nx">city</span><span class="p">)</span> <span class="p">{</span>
    <span class="nx">app</span><span class="p">.</span><span class="nx">getForecast</span><span class="p">(</span><span class="nx">city</span><span class="p">.</span><span class="nx">key</span><span class="p">,</span> <span class="nx">city</span><span class="p">.</span><span class="nx">label</span><span class="p">);</span>
  <span class="p">});</span>
<span class="p">}</span> <span class="k">else</span> <span class="p">{</span>
  <span class="nx">app</span><span class="p">.</span><span class="nx">updateForecastCard</span><span class="p">(</span><span class="nx">initialWeatherForecast</span><span class="p">);</span>
  <span class="nx">app</span><span class="p">.</span><span class="nx">selectedCities</span> <span class="o">=</span> <span class="p">[</span>
    <span class="p">{</span><span class="nx">key</span><span class="o">:</span> <span class="nx">initialWeatherForecast</span><span class="p">.</span><span class="nx">key</span><span class="p">,</span> <span class="nx">label</span><span class="o">:</span> <span class="nx">initialWeatherForecast</span><span class="p">.</span><span class="nx">label</span><span class="p">}</span>
  <span class="p">];</span>
  <span class="nx">app</span><span class="p">.</span><span class="nx">saveSelectedCities</span><span class="p">();</span>
<span class="p">}</span></code></pre></div>

Finally, don't forget to save the list of cities when the user adds a new one by 
adding: `app.saveSelectedCities();` to the `butAddCity` event handler.

## Test it out

* When first run, your app should immediately show the user the forecast from 
  `initialWeatherForecast`.
* Add a new city and verify that two cards are shown.
* Refresh the browser and verify that the app loads both forecasts and shows the 
  latest information.

<a href="https://weather-pwa-sample.firebaseapp.com/step-05/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Try it</a>

