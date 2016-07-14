---
layout: shared/narrow
title: "Implement the App Shell"
description: "How do I use an an app shell within a Progressive Web App?"
published_on: 2016-02-04
updated_on: 2016-02-04
translation_priority: 1
order: 2
authors:
  - petelepage
notes:
  learn-about-wsk: "Learn more about the <a href='https://developers.google.com/web/tools/starter-kit/'>Web Starter Kit</a>"
  image-sprite: "Specifying each icon individually might seem less efficient compared to using an image sprite, but we'll cache those later as part of the app shell, ensuring that they're always available, without the need to make a network request."
  give-you: "We've given you the markup and styles to save you some time and make sure you're starting on a solid foundation. In the next section, you'll have an opportunity to write your own code."
---

<p class="intro">
There are multiple ways to get started with any project, and we generally 
recommend using Web Starter Kit. But, in this case, to keep our project as 
simple as possible and concentrate on Progressive Web Apps, we've provided you 
with all of the resources you'll need.
</p>

{% include shared/toc.liquid %}

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

{% highlight html %}
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Weather App</title>
  <!-- Insert link to styles.css here -->
</head>
<body>
  <header class="header">
    <h1 class="header__title">Weather App</h1>
    <button id="butRefresh" class="headerButton"></button>
    <button id="butAdd" class="headerButton"></button>
  </header>

  <main class="main" hidden>
    <!-- Insert forecast-card.html here -->
  </main>

  <div class="dialog-container">
    <!-- Insert add-new-city-dialog.html here -->
  </div>

  <div class="loader">
    <svg viewBox="0 0 32 32" width="32" height="32">
      <circle id="spinner" cx="16" cy="16" r="14" fill="none"></circle>
    </svg>
  </div>

  <!-- Insert link to app.js here -->
</body>
</html>
{% endhighlight %}

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
{% highlight html %} 
<link rel="stylesheet" type="text/css" href="styles/inline.css">
{% endhighlight %}

To save time, we've already created the 
[stylesheet](https://weather-pwa-sample.firebaseapp.com/styles/inline.css) for 
you to use. Take a few minutes to review it and customize it to make it more 
your own.

{% include shared/note.liquid list=page.notes.image-sprite %}

## Test things out and make adjustments

Now is a great time to test things out, see how they look and make any 
adjustments you want. Be sure to test the rendering of your forecast card by 
removing the `hidden` attribute from the `main` container, and adding some fake data 
to the card. 

{% include shared/remember.liquid list=page.notes.give-you %}

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
