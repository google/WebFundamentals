---
title: "让用户同意位置分享"
description: ""
updated_on: 2014-10-21
key-takeaways:
  geo: 
    -  假定用户不将其位置提供给您。
    -  讲清楚您为何需要访问用户的位置。
    -  请勿在页面加载时立即提示访问位置。
comments:
  # 注如果分区标题或 URL 有更改，则必须更新以下短链接
  - g.co/mobilesiteprinciple25
---

<p class="intro">
  作为 Web 开发者，访问用户的位置可产生大量机会，例如根据用户的当前位置进行高级筛选、在地图上标出用户、以及就用户可以做的事项主动提出建议。
</p>

作为用户，您的实际位置是您要保护的信息
，并且只提供给您信任的人。  这就是网站在请求您的位置时
浏览器显示提示的原因。

{% include shared/toc.liquid %}

最近的用户调查 <a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">表明，</a>
用户不信任那种在页面加载时就提示用户提供其
位置的网站。 那么最佳做法是什么？

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

## 假定用户不将其位置提供给您

这可能令人头疼，但许多用户不想将其
位置提供给您，因此您需要采用防御性的开发方式。

1.  处理地理位置 API 产生的所有错误，以便让您的网站
适应这种情况。
2.  清晰明白地表达出您为什么需要位置信息。
3.  必要时使用备用解决方法。

## 在需要地理位置时使用备用方法

我们建议不要让网站或应用程序持续请求
用户的位置，但如果您的应用程序或网站
绝对需要此信息，则有第三方解决方案，可允许您获得
用户当前位置的最佳猜测结果。

这些解决方法通常是查看用户的 IP 地址并将其
对应到在 RIPE 数据库注册的物理地址。  这些地址
通常不太准确，一般是为您提供离用户最近的
电信枢纽中心或最近的移动电话基站的位置。  不过在很多
情况下，返回的地理位置甚至都达不到这样的精确，特别是在用户使用 VPN
或某些其他代理服务时。

## 始终在手势操作时请求用户的位置

确保用户了解您为何需要其位置，以及这
对他们有什么好处。  在网站加载首页时立即请求提供位置
会导致不好的用户体验。

<div class="clear g-wide--pull-1">
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-bad.png" srcset="images/sw-navigation-bad.png 1x, images/sw-navigation-bad-2x.png 2x" alt="">
      <figcaption>在网站加载首页时立即请求提供位置会导致不好的用户体验。</figcaption>
    </figure>
  </div>
  <div class="mdl-cell mdl-cell--6--col">
    <figure class="fluid">
      <img src="images/sw-navigation-good.png" srcset="images/sw-navigation-good.png 1x, images/sw-navigation-good-2x.png 2x" alt="">
      <figcaption> 始终在手势操作时请求用户的位置。</figcaption>
      </figure>
  </div>
</div>

相反，应当为用户提供明确的操作请求或指示
，说明某操作将需要访问其位置。  然后用户能够
更容易地将系统访问提示与他们刚刚使用的手势联系
起来。

## 提供明确指示，说明某操作将需要其位置

<a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf"> Google 广告团队进行的一项调查表明</a>，当要求用户预订波士顿的酒店客房，准备参加在一个特定酒店举行的会议时，在点击主页的“查找并预订”操作按钮之后，系统立即提示共享其 GPS 位置。

在某些情况下，用户会觉得失望，因为他们难以理解为何
在他们想预订波士顿的客房时，显示的却是一些旧金山的
酒店。

更好的做法是确保用户了解您为何要他们
提供位置。 加入一个在各种设备上常见的
熟知的记号，例如测距仪图标。

<img src="images/indication.png">

或者考虑采用非常明确的操作请求，例如“查找附近”。

<img src="images/nearme.png">

## 温和地请求用户授权访问其位置

您无法访问用户所执行操作的任何步骤。  您可以确切知道
用户何时不允许访问其位置，但您不知道
他们何时授权您访问；您只有在出现结果时才知道获得了访问权限。

如果您需要用户完成操作，则“取悦”他们是一个好做法。

我们建议： 

1.  设置一个在短时间后触发的计时器 - 5 秒是个不错的值。
2.  如果收到错误消息，则向用户显示消息。
3.  如果收到积极回应，则禁用计时器并处理结果。
4.  如果在超时之后还没有收到积极回应，则向用户显示通知。
5.  如果稍后有回应并且通知仍在显示，则从屏幕上移除通知。

{% highlight javascript %}
button.onclick = function() {
  var startPos;
  var element = document.getElementById("nudge");

  var showNudgeBanner = function() {
    nudge.style.display = "block";
  };

  var hideNudgeBanner = function() {
    nudge.style.display = "none";
  };

  var nudgeTimeoutId = setTimeout(showNudgeBanner, 5000);

  var geoSuccess = function(position) {
    hideNudgeBanner();
    // We have the location, don't display banner
    clearTimeout(nudgeTimeoutId); 

    // Do magic with location
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    switch(error.code) {
      case error.TIMEOUT:
        // The user didn't accept the callout
        showNudgeBanner();
        break;
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

