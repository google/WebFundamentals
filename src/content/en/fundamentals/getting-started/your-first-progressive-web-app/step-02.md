project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: How do I use an an app shell within a Progressive Web App?

<p class="intro">
There are multiple ways to get started with any project, and we generally 
recommend using Web Starter Kit. But, in this case, to keep our project as 
simple as possible and concentrate on Progressive Web Apps, we've provided you 
with all of the resources you'll need.
</p>



## Download the code

You can [download all of the code for this progressive web app guide](pwa-weather.zip) in a
ZIP file for easy use. Each step and all of the resources you need are
available in the ZIP. 

## Create the HTML for the App Shell

To make sure that we're starting as cleanly as possible, we'll start with a 
brand new `index.html` file and add the core components we discussed in 
[Architect the App Shell](step-01).

Remember, the key components will consist of:

* Header with a title, and add/refresh buttons
* Container for forecast cards
* A forecast card template
* A dialog for adding new cities
* A loading indicator 

<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="cp">&lt;!DOCTYPE html&gt;</span>
<span class="nt">&lt;html&gt;</span>
<span class="nt">&lt;head&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">charset=</span><span class="s">&quot;utf-8&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">http-equiv=</span><span class="s">&quot;X-UA-Compatible&quot;</span> <span class="na">content=</span><span class="s">&quot;IE=edge&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;viewport&quot;</span> <span class="na">content=</span><span class="s">&quot;width=device-width, initial-scale=1.0&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;title&gt;</span>Weather App<span class="nt">&lt;/title&gt;</span>
  <span class="c">&lt;!-- Insert link to styles.css here --&gt;</span>
<span class="nt">&lt;/head&gt;</span>
<span class="nt">&lt;body&gt;</span>
  <span class="nt">&lt;header</span> <span class="na">class=</span><span class="s">&quot;header&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;h1</span> <span class="na">class=</span><span class="s">&quot;header__title&quot;</span><span class="nt">&gt;</span>Weather App<span class="nt">&lt;/h1&gt;</span>
    <span class="nt">&lt;button</span> <span class="na">id=</span><span class="s">&quot;butRefresh&quot;</span> <span class="na">class=</span><span class="s">&quot;headerButton&quot;</span><span class="nt">&gt;&lt;/button&gt;</span>
    <span class="nt">&lt;button</span> <span class="na">id=</span><span class="s">&quot;butAdd&quot;</span> <span class="na">class=</span><span class="s">&quot;headerButton&quot;</span><span class="nt">&gt;&lt;/button&gt;</span>
  <span class="nt">&lt;/header&gt;</span>

  <span class="nt">&lt;main</span> <span class="na">class=</span><span class="s">&quot;main&quot;</span> <span class="na">hidden</span><span class="nt">&gt;</span>
    <span class="c">&lt;!-- Insert forecast-card.html here --&gt;</span>
  <span class="nt">&lt;/main&gt;</span>

  <span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;dialog-container&quot;</span><span class="nt">&gt;</span>
    <span class="c">&lt;!-- Insert add-new-city-dialog.html here --&gt;</span>
  <span class="nt">&lt;/div&gt;</span>

  <span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;loader&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;svg</span> <span class="na">viewBox=</span><span class="s">&quot;0 0 32 32&quot;</span> <span class="na">width=</span><span class="s">&quot;32&quot;</span> <span class="na">height=</span><span class="s">&quot;32&quot;</span><span class="nt">&gt;</span>
      <span class="nt">&lt;circle</span> <span class="na">id=</span><span class="s">&quot;spinner&quot;</span> <span class="na">cx=</span><span class="s">&quot;16&quot;</span> <span class="na">cy=</span><span class="s">&quot;16&quot;</span> <span class="na">r=</span><span class="s">&quot;14&quot;</span> <span class="na">fill=</span><span class="s">&quot;none&quot;</span><span class="nt">&gt;&lt;/circle&gt;</span>
    <span class="nt">&lt;/svg&gt;</span>
  <span class="nt">&lt;/div&gt;</span>

  <span class="c">&lt;!-- Insert link to app.js here --&gt;</span>
<span class="nt">&lt;/body&gt;</span>
<span class="nt">&lt;/html&gt;</span></code></pre></div>

Notice the `main` content is `hidden` by default and the loader is visible. This 
ensures that the user sees the loader immediately as the page loads, giving them 
a clear indication that the content is loading.

Next, let's add the forecast card, and Add New City dialog. To save time, these 
are provided in the `resources` directory, so you can simply copy and paste them 
into the corresponding location.

## Add styles to the core UI components

It's now time to add the core styles. As part of our build and deployment 
process, we'll want to inline these core styles into the document body, but for 
now, let's put them into a separate CSS file.

In the `index.html` file, replace `<!-- Insert link to styles here -->` with: 
<div class="highlight"><pre><code class="language-html" data-lang="html"><span class="nt">&lt;link</span> <span class="na">rel=</span><span class="s">&quot;stylesheet&quot;</span> <span class="na">type=</span><span class="s">&quot;text/css&quot;</span> <span class="na">href=</span><span class="s">&quot;styles/inline.css&quot;</span><span class="nt">&gt;</span></code></pre></div>

To save time, we've already created the 
[stylesheet](https://weather-pwa-sample.firebaseapp.com/styles/inline.css) for 
you to use. Take a few minutes to review it and customize it to make it more 
your own.



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






## Test things out and make adjustments

Now is a great time to test things out, see how they look and make any 
adjustments you want. Be sure to test the rendering of your forecast card by 
removing the `hidden` attribute from the `main` container, and adding some fake data 
to the card. 



















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






This app is reasonably responsive right now, but it's not perfect. Try adding 
additional styles that will improve the responsiveness and make it really shine 
across different devices. Also, consider what you can do to make it more your 
own.

## Add the key JavaScript bootstrap code

Now that we have most of the UI ready, it's time to start hooking up the code to 
make everything work. Like the rest of the app shell, be conscious about what 
code is necessary as part of the key experience and what can be loaded later. 

In our bootstrap code, we've included:

* An `app` object that contains some of the key information necessary for the app.
* The event listeners for all of the buttons in the header (`add`/`refresh`) and in 
  the add city dialog (`add`/`cancel`).
* A method to add or update forecast cards (`app.updateForecastCard`).
* A method to get the latest weather forecast data from the Firebase Public 
  Weather API (`app.getForecast`).
* A method to iterate the current cards and call `app.getForecast` to get the 
  latest forecast data (`app.updateForecasts`).
* Some fake data (`fakeForecast`) you can use to quickly test how things render.

Add the JavaScript code

1. Copy `step3-app.js` from the `resources` directory to your `scripts` folder
   and rename it `app.js`
1. In the `index.html` file, add a link to the newly created `app.js`.<br/>
   `<script src="/scripts/app.js"></script>`

## Test it out

Now that you've added the core HTML, styles and JavaScript, it's time to test the 
app. While it may not do much yet, make sure it doesn't write errors to the
console.

To see how the fake weather data is rendered, add the line below to your `app.js` 
file:  
`app.updateForecastCard(fakeForecast);`

<a href="https://weather-pwa-sample.firebaseapp.com/step-04/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Try it</a>

