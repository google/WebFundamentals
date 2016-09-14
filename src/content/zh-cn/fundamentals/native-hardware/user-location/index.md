project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 大多数浏览器和设备可访问用户的地理位置。 了解如何在您的网站和应用中使用用户的位置。

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# 用户位置 {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



地理位置 API 使您能够发现用户在何处，此操作始终 须经用户同意。 此功能可以作为用户查询的一部分，例如 指引某人到达目的地。 它还可以用于给用户创建的内容“加上 地理标签”，例如 标记照片 拍摄地点。

地理位置 API 还使您能够关注用户在何处，并且密切注意
他们的动向，此功能也始终须经用户同意（并且仅在页面打开时），这样就产生了很多有趣的用例，例如与后端系统集成，当用户在附近时准备托收单以收款。

在使用地理位置 API 时有许多需要注意的事情，本指南将指引您了解常见的用例和解决方案。



## 让用户同意位置分享 




作为 Web 开发者，访问用户的位置可产生大量机会，例如根据用户的当前位置进行高级筛选、在地图上标出用户、以及就用户可以做的事项主动提出建议。

作为用户，您的实际位置是您要保护的信息
，并且只提供给您信任的人。  这就是网站在请求您的位置时
浏览器显示提示的原因。


最近的用户调查 <a href="http://static.googleusercontent.com/media/www.google.com/en/us/intl/ALL_ALL/think/multiscreen/pdf/multi-screen-moblie-whitepaper_research-studies.pdf">表明，</a>
用户不信任那种在页面加载时就提示用户提供其
位置的网站。 那么最佳做法是什么？

### TL;DR {: .hide-from-toc }
- 假定用户不将其位置提供给您。
- 讲清楚您为何需要访问用户的位置。
- 请勿在页面加载时立即提示访问位置。


### 假定用户不将其位置提供给您

这可能令人头疼，但许多用户不想将其
位置提供给您，因此您需要采用防御性的开发方式。

1.  处理地理位置 API 产生的所有错误，以便让您的网站
适应这种情况。
2.  清晰明白地表达出您为什么需要位置信息。
3.  必要时使用备用解决方法。

### 在需要地理位置时使用备用方法

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

### 始终在手势操作时请求用户的位置

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

### 提供明确指示，说明某操作将需要其位置

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

### 温和地请求用户授权访问其位置

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
    



## 获取用户的当前位置 




地理位置 API 使您能够找出用户在何处，此操作始终须经用户同意。 此功能可以作为用户查询的一部分，例如指引某人到达目的地。 它还可以用于给用户创建的内容“加上地理标签”，例如标记照片拍摄地点。


### TL;DR {: .hide-from-toc }
- 使用此 API 之前请检查兼容性。
- 优先采用粗略位置，而不是精确位置。
- 务必处理错误。
- 请勿太频繁查询数据，以节省用户设备的电量。


此 API 与设备无关；它不关心浏览器如何确定
位置，只要客户端可以按标准方式请求和
接收位置数据。 其基础机制可能是通过 GPS、WiFi，或只是
请求用户手动输入其位置。 由于所有这些查找
都要花时间，此 API 为异步执行；每次请求位置时，通过回调
方法来传递。

### 何时使用地理位置

*  查找用户最接近您的哪个实际地点，以定制
用户体验。
*  根据用户的位置定制信息（例如新闻）。
*  在地图上显示用户的位置。
*  给您的应用程序内创建的数据标记用户的位置
（如给照片标记地理位置）。


### 检查兼容性

现在，主要浏览器均支持地理位置 API，但有一个好做法：
在操作之前始终检查是否支持。

可以通过测试是否存在
地理位置对象，轻松检查兼容性：


    // check for Geolocation support
    if (navigator.geolocation) {
      console.log('Geolocation is supported!');
    }
    else {
      console.log('Geolocation is not supported for this Browser/OS version yet.');
    }
    

### 确定用户的当前位置

地理位置 API 提供一种简单的“一次性”方法来获取用户的
位置  `getCurrentPosition()`。  调用此方法将以异步方式报告
用户的当前位置。


    window.onload = function() {
      var startPos;
      var geoSuccess = function(position) {
        startPos = position;
        document.getElementById('startLat').innerHTML = startPos.coords.latitude;
        document.getElementById('startLon').innerHTML = startPos.coords.longitude;
      };
      navigator.geolocation.getCurrentPosition(geoSuccess);
    };
    

如果这是该域的应用程序首次请求
权限，浏览器一般将检查用户是否同意。 根据
不同浏览器，可能还有始终允许（或不允许）
查找的首选项，这样将绕开确认过程。

根据浏览器所使用的定位设备，位置对象
实际上可能不只包含纬度和经度，而且还包含更多信息，例如可能包括海拔高度或方向。  在位置系统实际返回数据之前，您无法知道它将使用哪些额外信息。

### 测试网站的地理位置功能

在应用程序中使用 HTML5 地理位置支持时，调试
在使用不同的经度
和纬度值时接收的输出可能很有用。

DevTools 支持取代 navigator.geolocation
的位置值，以及模拟不能通过取代菜单得到的地理位置。

<img src="images/emulategeolocation.png">

1. 在 DevTools 中打开取代菜单。
2. 选中“取代地理位置”，然后输入 Lat = 41.4949819 和 Lon = -0.1461206。
3. 刷新页面，它现在将使用您取代的位置作为地理位置。

### 务必处理错误

遗憾的是，并非所有位置查找均能成功。 可能是 GPS 无法
定位，或用户突然禁用了位置查找。 在出现错误时，将调用
`getCurrentPosition()` 的第二个可选参数，
因此您可以在回调内通知用户：


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
    

### 减少启动地理位置硬件的必要性

对于许多用例，不需要使用用户的最新位置，
只需粗略的估计。

使用 `maximumAge` 可选属性来告诉浏览器使用最近
获取的地理位置结果。  如果用户在此之前已
请求数据，这不仅能更快返回数据，还能阻止浏览器
启动其地理位置硬件接口，例如 WiFi 三角测量或 GPS。


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

如果您要查找离用户最新的商店，不可能需要
1 米的精度来得到结果。  此 API 旨在提供一个
尽快返回的粗略位置。

如果需要高度精确，则可以
用 `enableHighAccuracy` 选项取代默认设置。  谨慎使用：处理将变慢
，并且使用更多电量。


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
    




## 监测用户的位置 




地理位置 API 使您能够关注用户在何处并且密切注意他们的动向，此操作始终须经用户同意。


此 API 与设备无关；它不关心浏览器如何确定
位置，只要客户端可以按标准方式请求和
接收位置数据。 其基础机制可能是通过 GPS、WiFi。 由于所有
这些查找都要花时间，此 API 为异步执行；每次请求位置时，
通过回调方法来传递。

### TL;DR {: .hide-from-toc }
- 使用此 API 之前请检查兼容性。
- 尽量少监测用户的位置以节省电量。
- 务必处理错误。


### 何时使用地理位置来关注用户的位置

*  您希望更准确地锁定用户位置。
*  您的应用程序需要根据新的位置信息
来更新用户界面。
*  在用户进入某个定义区域时，您的应用程序需要
更新业务逻辑。

### 关注用户位置

地理位置 API 使您通过单次调用 `getCurrentPosition()` 即可获取用户的位置（经用户
同意）。  

如果希望持续监测用户的位置，则地理位置
API 有一个称为 `watchPosition()` 的方法。 其运行方式与
`getCurrentPosition()` 类似，但它将在定位
软件出现以下情况下触发多次：

1.  更准确地锁定用户。
2.  在用户位置改变时。
 

    var watchId = navigator.geolocation.watchPosition(function(position) {
      document.getElementById('currentLat').innerHTML = position.coords.latitude;
      document.getElementById('currentLon').innerHTML = position.coords.longitude;
    });
    

### 务必清理和节省电量

监测地理位置变化不能是随意操作。  尽管
操作系统可能正在采用各种平台功能来让应用程序
连接位置子系统，但您作为 Web 开发者并不了解用户的设备
如何支持用户位置的监测，并且当您监测
位置时，会使设备进行大量额外的处理

在不需要跟踪用户位置时，调用 `clearWatch` 来关闭
地理位置系统。

### 务必处理错误。

遗憾的是，并非所有位置查找均能成功。 可能是 GPS 无法
定位，或用户突然禁用了位置查找。 在出现错误时，将调用
getCurrentPosition() 的第二个可选参数，
因此您可以在回调内通知用户：


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
    


