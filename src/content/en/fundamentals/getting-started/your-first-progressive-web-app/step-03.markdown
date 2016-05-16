---
layout: shared/narrow
title: "Start with a Fast First Load"
description: "Fast first loads with Progressive Web Apps and the App Shell model."
published_on: 2016-02-04
updated_on: 2016-02-04
translation_priority: 1
order: 3
authors:
  - petelepage
notes:
  extra-credit: "For extra credit, replace the <code>localStorage</code> implementation with <a href='https://www.npmjs.com/package/idb'>idb</a>"
---

<p class="intro">
Progressive Web Apps should start fast and be usable immediately. In its 
current state, our Weather App starts quickly, but it's not useable. There's no 
data. We could make an AJAX request to get that data, but that results in an 
extra request and makes the initial load longer. Instead, provide real data in 
the first load.
</p>

{% include shared/toc.liquid %}

## Inject the weather forecast data

For this code lab, we'll statically inject a weather forecast, but in a 
production app, the latest weather forecast data would be injected by the server 
based on the IP address geolocation of the user. 

Add the following inside the immediately invoked function expression:

{% highlight javascript %}  
var initialWeatherForecast = {  
  key: 'newyork',  
  label: 'New York, NY',  
  currently: {  
    time: 1453489481,  
    summary: 'Clear',  
    icon: 'partly-cloudy-day',  
    temperature: 52.74,  
    apparentTemperature: 74.34,  
    precipProbability: 0.20,  
    humidity: 0.77,  
    windBearing: 125,  
    windSpeed: 1.52  
  },  
  daily: {  
    data: [  
      {icon: 'clear-day', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'rain', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'snow', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'sleet', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'fog', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'wind', temperatureMax: 55, temperatureMin: 34},  
      {icon: 'partly-cloudy-day', temperatureMax: 55, temperatureMin: 34}  
    ]  
  }  
};
{% endhighlight %}

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

{% include shared/note.liquid list=page.notes.extra-credit %}

First, let's add the code required to save user preferences within `app.js`:  

{% highlight javascript %}
// Save list of cities to localStorage, see note below about localStorage.
app.saveSelectedCities = function() {
  var selectedCities = JSON.stringify(app.selectedCities);
  // IMPORTANT: See notes about use of localStorage.
  localStorage.selectedCities = selectedCities;
};
{% endhighlight %}

Next, let's add the startup code to check if the user has any subscribed cities 
and render those, or use the injected data. Add the following code to your 
`app.js`:  

{% highlight javascript %}
/****************************************************************************   
 *
 * Code required to start the app
 *
 * NOTE: To simplify this getting started guide, we've used localStorage.
 *   localStorage is a synchronous API and has serious performance
 *   implications. It should not be used in production applications!
 *   Instead, check out IDB (https://www.npmjs.com/package/idb) or
 *   SimpleDB (https://gist.github.com/inexorabletash/c8069c042b734519680c)
 *
 ****************************************************************************/

app.selectedCities = localStorage.selectedCities;
if (app.selectedCities) {
  app.selectedCities = JSON.parse(app.selectedCities);
  app.selectedCities.forEach(function(city) {
    app.getForecast(city.key, city.label);
  });
} else {
  app.updateForecastCard(initialWeatherForecast);
  app.selectedCities = [
    {key: initialWeatherForecast.key, label: initialWeatherForecast.label}
  ];
  app.saveSelectedCities();
}
{% endhighlight %}

Finally, don't forget to save the list of cities when the user adds a new one by 
adding: `app.saveSelectedCities();` to the `butAddCity` event handler.

## Test it out

* When first run, your app should immediately show the user the forecast from 
  `initialWeatherForecast`.
* Add a new city and verify that two cards are shown.
* Refresh the browser and verify that the app loads both forecasts and shows the 
  latest information.

<a href="https://weather-pwa-sample.firebaseapp.com/step-05/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Try it</a>
