---
title: "监测用户的位置"
description: "地理位置 API 使您能够关注用户在何处并且密切注意他们的动向，此操作始终须经用户同意。"
updated_on: 2014-10-21
key-takeaways:
  geo: 
    -  使用此 API 之前请检查兼容性。
    -  尽量少监测用户的位置以节省电量。
    -  务必处理错误。
---

<p class="intro">
  地理位置 API 使您能够关注用户在何处并且密切注意他们的动向，此操作始终须经用户同意。
</p>

{% include shared/toc.liquid %}

此 API 与设备无关；它不关心浏览器如何确定
位置，只要客户端可以按标准方式请求和
接收位置数据。 其基础机制可能是通过 GPS、WiFi。 由于所有
这些查找都要花时间，此 API 为异步执行；每次请求位置时，
通过回调方法来传递。

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## 何时使用地理位置来关注用户的位置

*  您希望更准确地锁定用户位置。
*  您的应用程序需要根据新的位置信息
来更新用户界面。
*  在用户进入某个定义区域时，您的应用程序需要
更新业务逻辑。

## 关注用户位置

地理位置 API 使您通过单次调用 `getCurrentPosition()` 即可获取用户的位置（经用户
同意）。  

如果希望持续监测用户的位置，则地理位置
API 有一个称为 `watchPosition()` 的方法。 其运行方式与
`getCurrentPosition()` 类似，但它将在定位
软件出现以下情况下触发多次：

1.  更准确地锁定用户。
2.  在用户位置改变时。
 
{% highlight javascript %}
var watchId = navigator.geolocation.watchPosition(function(position) {
  document.getElementById('currentLat').innerHTML = position.coords.latitude;
  document.getElementById('currentLon').innerHTML = position.coords.longitude;
});
{% endhighlight %}

## 务必清理和节省电量

监测地理位置变化不能是随意操作。  尽管
操作系统可能正在采用各种平台功能来让应用程序
连接位置子系统，但您作为 Web 开发者并不了解用户的设备
如何支持用户位置的监测，并且当您监测
位置时，会使设备进行大量额外的处理

在不需要跟踪用户位置时，调用 `clearWatch` 来关闭
地理位置系统。

## 务必处理错误。

遗憾的是，并非所有位置查找均能成功。 可能是 GPS 无法
定位，或用户突然禁用了位置查找。 在出现错误时，将调用
getCurrentPosition() 的第二个可选参数，
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
  navigator.geolocation.watchPosition(geoSuccess, geoError);
};
{% endhighlight %}


