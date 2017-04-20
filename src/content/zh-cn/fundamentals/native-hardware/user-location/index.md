project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:大多数浏览器和设备都可访问用户的地理位置。了解如何在您的网站和应用中使用用户的位置。

{# wf_updated_on:2016-08-22 #}
{# wf_published_on:2014-01-01 #}

# 用户位置 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Geolocation API 使您能够在征得用户同意的情况下发现用户的位置。可在某些情况下使用此功能，比如指引用户到达目的地以及给用户创建的内容加上地理标记（例如标记照片的拍摄地点）。

Geolocation API 还能让您了解用户位置并密切注意他们的动向，这一切都要征得用户同意（并且只有在页面打开时有效）。
这会令人想到许多值得关注的用例，例如与后端系统集成，当用户在附近时为订单做好收款准备。


使用 Geolocation API 时有许多需要注意的事项，本指南将指引您了解常见的用例和解决方案。

注：从 Chrome 50 开始，[Geolocation API 只能在安全环境 (HTTPS) 上工作](/web/updates/2016/04/geolocation-on-secure-contexts-only)。如果网站托管在一个不安全的来源（如 `HTTP`）上，获取用户位置的请求将**无法再**正常工作。

### TL;DR {: .hide-from-toc }

* 对用户有利时使用地理定位。
* 通过请求权限来明确响应用户手势。 
* 使用功能检测以防用户的浏览器不支持地理定位。
* 不要只是学习如何实现地理定位；还要学习地理定位的最佳使用方式。
* 测试网站的地理定位功能。

## 使用地理定位的时机

*  查找用户最接近哪个具体的物理位置，以定制用户体验。

*  根据用户的位置定制信息（例如新闻）。
*  在地图上显示用户的位置。
*  给应用内创建的数据标记用户的位置（即给照片标记地理位置）。


## 以负责任的方式请求权限

最近的用户调查[表明](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf)，用户不信任那些在页面加载时就提示用户提供其位置的网站。那么最佳做法是什么？

### 假定用户不将其位置提供给您

许多用户不想将其位置提供给您，因此需要采用防御性的开发方式。


1.  处理 Geolocation API 产生的所有错误，以便让您的网站适应这种情况。
2.  清晰明白地表达出您为什么需要位置信息。
3.  必要时使用备用解决方法。


### 在需要地理定位时使用备用方法

我们建议网站或应用不要求获取用户的当前位置。
但如果网站或应用的确需要用户的当前位置信息，可通过第三方解决方案来获得用户当前位置的最佳猜测结果。



这些解决方法通常是查看用户的 IP 地址并将其对应到在 RIPE 数据库注册的物理地址。
这些位置通常不太准确，一般提供的是离用户最近的电信枢纽中心或移动电话基站的位置。不过在很多情况下，返回的地理位置甚至都达不到这样的精确，特别是在用户使用 VPN 或某些其他代理服务时。



### 始终在手势操作时请求用户的位置

确保用户了解您为何需要其位置，以及这对他们有什么好处。
在网站加载首页时立即请求提供位置会导致不好的用户体验。


<div class="attempt-left">
  <figure>
    <img src="images/sw-navigation-good.png">
    <figcaption class="success">
      <b>宜</b>：始终在手势操作时请求获取用户的位置。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sw-navigation-bad.png">
    <figcaption class="warning">
      <b>忌</b>：在网站加载首页时请求提供位置会导致用户体验不佳。
    </figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

应改为向用户提出明确的操作请求，或指出某项操作需要获取其位置。
这样更便于用户将获取位置的系统提示与刚刚发起的操作联系起来。


### 明确指出某项操作将请求其位置信息

[在 Google 广告团队进行的一项调查中](http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf)，一位用户受命在某个酒店预订网站上预订波士顿的一间酒店客房，以便参加即将在那里举行的一次会议，在其点击首页的“Find and Book”操作按钮之后，系统立即提示共享其 GPS 位置。




在某些情况下，用户会觉得失望，因为他们不明白为何在他们想预订波士顿的客房时，显示的却是一些旧金山的酒店。



确保用户了解要求其提供位置的原因可提升用户体验。
加入一个常见于各种设备上的熟知记号，例如测距仪图标，或者提供意思明确的操作按钮，例如“Find Near Me”。



<div class="attempt-left">
  <figure>
    <img src="images/indication.png">
    <figcaption>
      使用测距仪图标</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure id="fig1">
    <img src="images/nearme.png">
    <figcaption>
      在我附近查找的明确操作请求</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

### 温和地请求用户授权访问其位置

您无权获取用户所执行操作的任何信息。您可以确切知道用户何时不允许获取其位置，但您不知道他们何时授予您获取权限；您只有在出现结果时才知道获得了信息获取权限。




如果您需要用户完成操作，最好“取悦”他们，让其心甘情愿地完成操作。


我们建议： 

1.  设置一个在短时间后触发的计时器 - 5 秒是个不错的值。
2.  如果收到错误消息，则向用户显示消息。
3.  如果收到积极回应，则停用计时器并处理结果。
4.  如果在超时之后还没有收到积极回应，则向用户显示通知。
5.  如果稍后有回应并且通知仍在显示，则从屏幕上移除通知。




<div style="clear:both;"></div>

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

## 浏览器支持

现在，大部分浏览器均支持 Geolocation API，但最好在执行任何操作之前始终检查是否支持。


可以通过测试是否存在 geolocation 对象，轻松检查兼容性：


    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS.');
    }


## 确定用户的当前位置

Geolocation API 提供一种简单的“一次性”方法来获取用户的位置：`getCurrentPosition()`。
调用此方法将以异步方式报告用户的当前位置。


    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };


如果这是该网域的应用首次请求权限，浏览器一般会检查用户是否同意。
根据浏览器的不同，可能还有始终允许（或不允许）权限查询的首选项，在这种情况下，将会绕过确认过程。


根据浏览器所使用定位设备的不同，位置对象实际包含的信息可能远不止纬度和经度，举例来说，可能还包括海拔高度或方向。在位置系统实际返回数据之前，您无从知晓它使用了哪些额外信息。



## 监测用户的位置

Geolocation API 使您通过单次调用 `getCurrentPosition()` 即可获取用户的位置（经用户同意）。
  

如果希望持续监测用户的位置，可以使用 Geolocation API 的 `watchPosition()` 方法。
其运行方式与 `getCurrentPosition()` 类似，但它会在定位软件出现以下情况时多次触发：



1.  更准确地锁定用户。
2.  确定用户的位置发生了变化。
 

    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });

### 使用地理定位监测用户位置的时机

*  您希望更准确地锁定用户位置。
*  您的应用需要根据新的位置信息来更新用户界面。
*  应用需要更新用户进入某个定义区域时的业务逻辑。



## 使用地理定位时的最佳做法

### 务必清理和节省电量

监测地理定位变化不能是随意操作。尽管操作系统可能正在引入各种平台功能来让应用连接地理子系统，但您作为网络开发者并不了解用户的设备对用户位置监测的支持情况，并且当您监测位置时，会使设备参与大量额外的处理。





如果不再需要追踪用户位置，可以调用 `clearWatch` 来关闭地理定位系统。


###  妥善处理错误

遗憾的是，并非所有位置查找均能成功。可能是 GPS 无法定位，或用户突然停用了位置查找。
在出现错误时，系统将调用 `getCurrentPosition()` 的第二个可选参数，以便您可以在回调内通知用户：


    window.onload = function() {
      var startPos;
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
      navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    };


### 减少启动地理定位硬件的必要性

对于许多用例，并不需要用户最新的位置信息，粗略估算的位置信息即可满足需要。


使用 `maximumAge` 可选属性来告诉浏览器使用最近获取的地理定位结果。
如果用户之前请求过数据，这不仅能更快返回数据，还能防止浏览器启动其地理定位硬件接口，例如 WiFi 三角测量或 GPS。



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


### 请勿让用户持续等待，设置一个超时值

除非设置了超时，否则您获取当前位置的请求可能永远不会返回信息。


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


### 优先采用粗略位置，而不是精确位置

如果您要查找离用户最近的商店，不太可能需要达到 1 米的精度。
此 API 旨在提供一个尽快返回的粗略位置。


如果真的需要高度精确，可以用 `enableHighAccuracy` 选项替换默认设置。
谨慎使用该选项：解析速度会下降，并且电池耗电会增加。


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


## 通过 Chrome DevTools 模拟地理定位 {: #devtools }

<div class="attempt-right">
  <figure id="fig1">
    <img src="images/sensors-drawer.png" class="screenshot">
  </figure>
</div>

地理定位设置完毕后，您需要：

* 测试应用在不同地理定位下的工作情况。
* 验证应用在无法使用地理定位时是否可妥善降级。

这两项工作均可通过 Chrome DevTools 完成。

[打开 Chrome DevTools](/web/tools/chrome-devtools/#open)，然后[打开 Console Drawer](/web/tools/chrome-devtools/console/#open_as_drawer)。


[打开 Console Drawer 菜单](/web/tools/chrome-devtools/settings#drawer-tabs)，然后点击 **Sensors** 选项以显示 Sensors Drawer。


可以在此处替换某个预设大城市的位置，输入自定义位置，或通过将替换设置为 **Location unavailable** 停用地理定位。




{# wf_devsite_translation #}
