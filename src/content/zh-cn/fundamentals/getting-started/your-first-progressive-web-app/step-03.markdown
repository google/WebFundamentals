---
title: "从快速的首次加载开始"
description: "Progressive Web Apps 的快速的首次加载和应用外壳模式。"
updated_on: 2016-09-09
translation_priority: 1
translators:
  - wangyu
notes:
  extra-credit: "为了更好的性能, 可以使用这个 <code>localStorage</code> 的实现： <a href='https://www.npmjs.com/package/idb'>idb</a>"
---

<p class="intro">
Progressive Web Apps 应该能够快速启动并且立即可用。目前，我们的天气应用能够快速启动，但是还
不能使用，因为还没有数据。我们能够发起一个 AJAX 请求来获取数据，但是额外的请求会让初次加载时间
变长。取而代之的方法是，在初次加载时提供真实的数据。
</p>

{% include shared/toc.liquid %}

## 插入天气预报信息

在本实例中，我们将会静态地插入天气预报信息，但是在一个投入生产环境的应用中，最新的天气预报数据会
由服务器根据用户的 IP 位置信息插入。

将下面数据添加到立即调用函数表达式里：

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

接下来，移除我们之前创建的用于测试的 `fakeForecast`，因为我们再也用不到它了。

## 区分首次运行

但我们如何知道什么时候该展示这些信息，那些数据需要存入缓存供下次使用？当用户下次使用的时候，他们
所在城市可能已经发生了变动，所以我们需要加载目前所在城市的信息，而不是之前的城市。

用户首选项（比如用户订阅的城市列表），这类数据应该使用 indexDB 或者其他快速的存储方式存放在本地。
为了尽可能简化，这里我们使用 `localStorage` 进行存储，在生产环境下这并不是理想的选择，因为它是
阻塞型同步的存储机制，在某些设备上可能很缓慢。

{% include shared/note.liquid list=page.notes.extra-credit %}

首先，让我们在 `app.js` 中添加用来存储用户首选项的代码：

{% highlight javascript %}
// 将城市裂变存入 localStorage, 注意下面关于 localStorage 的说明
app.saveSelectedCities = function() {
  var selectedCities = JSON.stringify(app.selectedCities);
  // 注意: 注意下面关于 localStorage 的说明
  localStorage.selectedCities = selectedCities;
};
{% endhighlight %}

接下来，添加一些启动代码来检查用户是否已经订阅了某些城市，并渲染它们，或者使用插入的天气数据来渲
染。将下面这些代码添加入 `app.js`：


{% highlight javascript %}
/****************************************************************************   
 *
 * 用来启动应用的代码
 *
 * 注意: 为了简化入门指南, 我们使用了 localStorage。
 *   localStorage 是一个同步的 API，有严重的性能问题。它不应该被用于生产环节的应用中！
 *   应该考虑使用, IDB (https://www.npmjs.com/package/idb) 或者
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

最后哦，不要忘了在用户添加了新城市后将其存储起来，为此可以在 `butAddCity` 事件的处理函数中
添加 `app.saveSelectedCities();` 。

## 测试

* 在首次允许时，你的应用应该立刻向用户展示 `initialWeatherForecast` 中的天气数据。
* 添加一个新城市确保会展示两个卡片。
* 刷新浏览器并验证应用是否加载了天气预报并展示了最新的信息。

<a href="https://weather-pwa-sample.firebaseapp.com/step-05/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">试一试</a>
