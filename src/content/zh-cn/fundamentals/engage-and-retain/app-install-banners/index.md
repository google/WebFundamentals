project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:应用安装横幅有两种：网络应用安装横幅和本机应用安装横幅。这两种应用安装横幅让您的用户可以快速无缝地将您的网络或本机应用添加到他们的主屏幕，无需退出浏览器。

{# wf_updated_on:2016-02-11 #}
{# wf_published_on:2014-12-16 #}

# 网络应用安装横幅 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="网络应用安装横幅">
  </figure>
</div>

应用安装横幅有两种：**网络**应用安装横幅和[**本机**](native-app-install)应用安装横幅。
这两种应用安装横幅让您的用户可以快速无缝地将您的网络或本机应用添加到他们的主屏幕，无需退出浏览器。

添加应用安装横幅很轻松，Chrome 会为您处理大部分的繁重工作。
您需要在您的网站中添加一个包含您的应用详细信息的网络应用清单文件。


然后，Chrome 使用一组条件和访问频率启发式算法来确定何时显示横幅。
请继续阅读以了解更多详情。

注：Add to Homescreen（有时缩写为 A2HS）是网络应用安装横幅的另一个名称。两个术语相等同。

### 条件有哪些？

Chrome 将在您的应用符合以下条件时自动显示横幅：


* 拥有一个[网络应用清单](../web-app-manifest/)文件，该文件具有：
    - 一个 `short_name`（用于主屏幕）
    - 一个 `name`（用于横幅中）
    - 一个 144x144 png 图标（图标声明必须包含一个 mime 类型的 `image/png`）
    - 一个加载的 `start_url`
* 拥有一个在您的网站上注册的[服务工作线程](/web/fundamentals/getting-started/primers/service-workers)。
* 通过 [HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https) 提供（这是使用服务工作线程的一项要求）。
* 被访问至少两次，这两次访问至少间隔五分钟。

注：网络应用安装横幅是一种新兴技术。显示应用安装横幅的条件将来可能会有所变化。请参阅[究竟是什么造就了 Progressive Web App？](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/)，了解最新网络应用安装横幅条件中的规范引用（将随时间推移不断更新）。

### 测试应用安装横幅 {: #test }

设置网络应用清单后，您会想要验证它是否已正确定义。
有两种方法供您选择。一种是手动，另一种是自动。


要手动触发应用安装横幅，请执行以下操作：

1. 打开 Chrome DevTools。
2. 转到 **Application** 面板。
3. 转到 **Manifest** 标签。
4. 点击下面屏幕截图中红色突出显示部分的 **Add to homescreen**。

![DevTools 上的“Add to homescreen”按钮](images/devtools-a2hs.png)

请参阅[模拟“Add to Homescreen”事件](/web/tools/chrome-devtools/progressive-web-apps#add-to-homescreen)，获取更多帮助。



要实现应用安装横幅的自动化测试，请使用 Lighthouse。Lighthouse 是一个网络应用审核工具。
您可以将其作为 Chrome 扩展程序或 NPM 模块运行。
要测试您的应用，您需要为 Lighthouse 提供要审核的特定页面。
Lighthouse 会对此页面运行一套审核，然后以报告形式显示结果。


下面屏幕截图中的两套 Lighthouse 审核显示了您的页面需要通过才能显示应用安装横幅的所有测试。


![Lighthouse 的应用安装审核](images/lighthouse-a2hs.png)

请参阅[使用 Lighthouse 审查网络应用](/web/tools/lighthouse/)，开始使用 Lighthouse。


## 应用安装横幅事件

Chrome 提供一个简单的机制，用于确定用户如何响应应用安装横幅，甚至可以取消或延迟应用安装横幅以等待一个更方便的时间。


### 用户是否安装了此应用？

`beforeinstallprompt` 事件返回一个名为 `userChoice` 的 promise，并当用户对提示进行操作时进行解析。
promise 会对 `outcome` 属性返回一个值为 `dismissed` 或 `accepted` 的对象，如果用户将网页添加到主屏幕，则返回后者。



    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired
      
      // e.userChoice will return a Promise. 
      // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
      e.userChoice.then(function(choiceResult) {
        
        console.log(choiceResult.outcome);
        
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });
    

利用此工具，可以很好地了解您的用户如何与应用安装提示进行互动。



### 延迟或取消提示

Chrome 可管理触发提示的时间，但对于部分网站而言，这可能不是理想的做法。
您可以在应用使用中延迟触发提示的时间，或甚至取消它。
 

当 Chrome 决定提示用户安装应用时，您可以阻止默认操作，并存储此事件以便稍后使用。
然后，当用户与您的网站进行积极互动时，您可以通过对存储的事件调用 `prompt()` 重新触发提示。

 

这将使 Chrome 显示横幅和所有 Promise 属性，例如，您可绑定到 `userChoice`，以便您可以了解用户进行的操作。
    var deferredPrompt;
    window.addEventListener('beforeinstallprompt', function(e) {
    
      console.log('beforeinstallprompt Event fired');
    
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      
      return false;
    });
      
    btnSave.addEventListener('click', function() {
      if(deferredPrompt !== undefined) {
    
        // The user has had a postive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {
      
          console.log(choiceResult.outcome);
          if(choiceResult.outcome == 'dismissed') {
      
            console.log('User cancelled home screen install');
          
          }
          else {
            console.log('User added to home screen');
          }
          // We no longer need the prompt.  Clear it up.
          deferredPrompt = null;
        });
      }
    });
    

或者，您可以通过阻止默认值取消提示框。

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    
## Native app install banners

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif" alt="本机应用安装横幅" style="max-height: 500px">
  </figure>
</div>

本机应用安装横幅类似于[网络应用安装横幅](.)，它们可以让用户无需离开网站即可安装您的本机应用，而不用将应用添加到主屏幕。



### 显示横幅的条件

除了需要服务工作线程外，条件类似于网络应用安装横幅。
您的网站必须满足以下条件：

* 拥有一个[网络应用清单](../web-app-manifest/)文件，该文件具有：
  - 一个 `short_name`
  - 一个 `name`（用于横幅提示中）
  - 一个 144x144 png 图标，您的图标声明应包括 mime 类型的 `image/png`
  - 一个包含应用相关信息的 `related_applications` 对象
* 通过 [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https) 提供
* 在两周课程期间，由用户在两天访问两次。


### 清单要求

要集成到任何清单中，请添加一个包含 `play` 平台（针对 Google Play）和应用 ID 的 `related_applications` 数组。



    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

如果只是想要用户可以安装您的 Android 应用，而不显示网络应用安装横幅，那么请添加 `"prefer_related_applications": true`。

例如：


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]


{# wf_devsite_translation #}
