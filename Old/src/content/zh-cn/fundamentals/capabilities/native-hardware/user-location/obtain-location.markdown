---
title: "获取用户的当前位置"
description: "地理位置 API 使您能够找出用户在何处，此操作始终须经用户同意。"
updated_on: 2014-10-21
key-takeaways:
  geo: 
    -  使用此 API 之前请检查兼容性。
    -  优先采用粗略位置，而不是精确位置。
    -  务必处理错误。
    -  请勿太频繁查询数据，以节省用户设备的电量。

---

<p class="intro">
  地理位置 API 使您能够找出用户在何处，此操作始终须经用户同意。 此功能可以作为用户查询的一部分，例如指引某人到达目的地。 它还可以用于给用户创建的内容“加上地理标签”，例如标记照片拍摄地点。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

此 API 与设备无关；它不关心浏览器如何确定
位置，只要客户端可以按标准方式请求和
接收位置数据。 其基础机制可能是通过 GPS、WiFi，或只是
请求用户手动输入其位置。 由于所有这些查找
都要花时间，此 API 为异步执行；每次请求位置时，通过回调
方法来传递。

## 何时使用地理位置

*  查找用户最接近您的哪个实际地点，以定制
用户体验。
*  根据用户的位置定制信息（例如新闻）。
*  在地图上显示用户的位置。
*  给您的应用程序内创建的数据标记用户的位置
（如给照片标记地理位置）。


## 检查兼容性

现在，主要浏览器均支持地理位置 API，但有一个好做法：
在操作之前始终检查是否支持。

可以通过测试是否存在
地理位置对象，轻松检查兼容性：

{% highlight javascript %}
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
{% endhighlight %}

## 确定用户的当前位置

地理位置 API 提供一种简单的“一次性”方法来获取用户的
位置  `getCurrentPosition()`。  调用此方法将以异步方式报告
用户的当前位置。

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
{% endhighlight %}

如果这是该域的应用程序首次请求
权限，浏览器一般将检查用户是否同意。 根据
不同浏览器，可能还有始终允许（或不允许）
查找的首选项，这样将绕开确认过程。

根据浏览器所使用的定位设备，位置对象
实际上可能不只包含纬度和经度，而且还包含更多信息，例如可能包括海拔高度或方向。  在位置系统实际返回数据之前，您无法知道它将使用哪些额外信息。

## 测试网站的地理位置功能

在应用程序中使用 HTML5 地理位置支持时，调试
在使用不同的经度
和纬度值时接收的输出可能很有用。

DevTools 支持取代 navigator.geolocation
的位置值，以及模拟不能通过取代菜单得到的地理位置。

<img src="images/emulategeolocation.png">

1. 在 DevTools 中打开取代菜单。
2. 选中“取代地理位置”，然后输入 Lat = 41.4949819 和 Lon = -0.1461206。
3. 刷新页面，它现在将使用您取代的位置作为地理位置。

## 务必处理错误

遗憾的是，并非所有位置查找均能成功。 可能是 GPS 无法
定位，或用户突然禁用了位置查找。 在出现错误时，将调用
`getCurrentPosition()` 的第二个可选参数，
因此您可以在回调内通知用户：

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

## 减少启动地理位置硬件的必要性

对于许多用例，不需要使用用户的最新位置，
只需粗略的估计。

使用 `maximumAge` 可选属性来告诉浏览器使用最近
获取的地理位置结果。  如果用户在此之前已
请求数据，这不仅能更快返回数据，还能阻止浏览器
启动其地理位置硬件接口，例如 WiFi 三角测量或 GPS。

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
  	maximumAge: 5 * 60 * 1000,
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## 请勿让用户持续等待，设置一个超时值

除非设置了超时，否则您获取当前位置的请求可能永远不会返回信息。

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
     timeout: 10 * 1000
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## 优先采用粗略位置，而不是精确位置

如果您要查找离用户最新的商店，不可能需要
1 米的精度来得到结果。  此 API 旨在提供一个
尽快返回的粗略位置。

如果需要高度精确，则可以
用 `enableHighAccuracy` 选项取代默认设置。  谨慎使用：处理将变慢
，并且使用更多电量。

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
    enableHighAccuracy: true
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}


