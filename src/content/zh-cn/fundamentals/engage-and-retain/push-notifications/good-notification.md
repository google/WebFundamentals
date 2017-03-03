project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:通知有正确的使用方式，也有更理想的使用方式。了解怎样才算好的通知。我们不会只是向您展示该做什么。我们会向您展示该怎么做。

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# 怎样才算好的通知？ {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/tpnr.png" alt="及时、精确且相关">
  <figcaption>及时、精确且相关</figcaption>
</figure>

不要惹恼您的用户，否则您将永远失去他们。我们还需要多说些什么吗？
是的，之所以要多说几句，是因为说时容易做时难。 

推送通知是本机应用最具价值的功能之一，并且此功能现已在网站上提供。
要想加以充分利用，通知必须及时、精确并且相关。


**及时** - 及时通知是指在用户需要以及对用户很重要时出现的通知。


**精确** - 精确通知是指包含可立即采取行动的具体信息的通知。


**相关** - 相关消息是指有关用户关心的人或主题的消息。


<div style="clear:both;"></div>


## 及时 {: #timely }

及时通知是指在用户需要以及对用户很重要时出现的通知。
及时意味着对用户而言及时，对您而言则不一定及时。


### 在任何连接状况下通知均可用 {: #make-it-available }

对于大多数通知，您需要立即显示。有一些原因会令您暂不显示通知，其中至少存在这样的原因：可能并非所有平台都支持推送负载，因此您可能需要先获取关键信息，然后再显示通知。




直到最近，也只有移动应用才能做到这一点。您可以通过服务工作线程存储通知，直至用户需要时为止。
用户只需点击即可，网络状态无关紧要。



    self.addEventListener('push', event => {
      var dataPromise;
      if (data in event) {
        dataPromise = Promise.resolve(event.data.json());
      } else {
        dataPromise = fetch('notification/end/point/data.json')
          .then(response => {
            return response.json();
          });
      }
    
      event.waitUntil(
        dataPromise
        .then(msgData => {
          // Now tell the user.
          return self.registration.showNotification(data.title, {
            // Whether you show data and how much you show depends on
            // content of the data itself.
            body: event.data.body,
            icon: 'images/icon.png'
          });
        })
      );
    }); 
    

### 谨慎使用振动 {: #vibrate-judiciously }

将振动列于“及时”部分中可能看似有点奇怪。但事实上，它与及时通知关系密切，也存在若干问题。


首先，振动可能看似是让用户获悉新通知的理想方式。
但并非所有用户都开启了振动，并且一些设备无法振动。
因此，您打算通过振动传达的任何紧急信息都可能丢失。


其次，收到每个通知时都发出振动可能令人产生紧迫的错觉。如果用户对并非看上去那般重要的通知感到厌烦，可能会将通知完全关闭。



简言之，要让用户决定如何使用振动。让他们能够选择哪些通知使用振动，或者是否使用振动。
如果您有不同的通知类别，您甚至可以让他们选择不同的振动模式。



最后，别忘了一点：要想振动，移动设备需要运行电机，而电机的功耗超过屏幕通知。


## 精确 {: #precise }

精确通知是指包含可立即采取行动的具体信息的通知。
再次回想一下详解课上的图像。

![精确通知包含具体信息。](images/flight-delayed-good.png){:width="316px"}

它可以一目了然地告诉您需要了解的任何信息：

* 消息的发送者 - 航空公司。
* 发生了什么 - 您的新航班已经延误。
* 其他信息 - 您的新航班时间。


### 提供足够的信息，让用户不必访问您的网站 {: #offer-enough }

这可能并不适合所有情况，但如果信息简单到只需使用较小空间便可传达，就不要让用户打开您的网站进行阅读。例如，如果您想将他人的确认通知某位用户，则不要显示内容为“新通知”的消息，
而要显示内容为“Pete 说，‘不’”的消息。


<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>宜：</b> 提供足够的信息，让用户不必访问网站。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>忌：</b> 不要让您的消息模糊不清、含义不明。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

这对关键信息尤其重要。

<div class="attempt-left">
  <figure>
    <img src="images/extreme-danger.png">
    <figcaption class="success"><b>宜：</b> 提供足够的信息，让用户不必访问网站。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/suggestion.png">
    <figcaption class="warning"><b>忌：</b> 不要让您的消息模糊不清、含义不明。</figcaption>

  </figure>
</div>

<div style="clear:both;"></div>

### 直接将操作包含在通知内 {: #offer-actions }

我们已经几次见过这种情况，详解课甚至展示了如何向通知添加操作。
服务工作线程需要处理这些操作。请在 `notificationclick` 事件中执行此操作。



    self.addEventListener('notificationclick', event => {
      var messageId = event.notification.data;
      
      event.notification.close();
    
      if (event.action) {
        // Send the response directly to the server.
      } else {
        // Open the app.
      }
    }, false);
    

### 让标题和内容具体 {: #specific-title }

使标题与消息的上下文相关，并包含消息中的某些具体信息。
收件人已知的内容（如您的应用的名称）并无帮助。
发送消息所使用的技术等收件人不熟悉的信息同样没有帮助。


<div class="attempt-left">
  <figure>
    <img src="images/flight-delayed-good.png">
    <figcaption class="success"><b>宜：</b> 让标题包含消息中的某些具体信息。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/cc-bad.png">
    <figcaption class="warning"><b>忌：</b> 不要包含用户已知或不了解的信息。</figcaption>

  </figure>
</div>
<div style="clear:both;"></div>

### 在显要位置放置重要信息

这意味着，要将对用户比较重要的信息放在最受关注的通知部分。
例如，在西方语言中，文本的阅读顺序是从左至右、从上到下，因此短信应用需要将发送者的姓名置于左上角。



<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>宜：</b> 发送者姓名位于左上角。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>忌：</b> 左上角信息为多余信息。</figcaption>

  </figure>
</div>
<div style="clear:both;"></div>

### 让消息保持简短 {: #keep-it-short }

通知并不是电子邮件，其意图是诱导用户打开您的应用。
您可以通过 `PushMessageData` 对象立即向用户发送数据，但您可能并不想向用户显示所有数据，尤其是在发送通知后其他数据会积聚在服务器上的情况下。




## 相关 {: #relevant }

相关消息是指有关用户关心的人或主题的消息。

### 已登录用户优先 {: #prefer-logged }

只向已登录用户请求通知许可。如果您不知道您的用户是谁，就难以向他们发送相关的通知。然而，如果通知不相关，用户可能将其视为垃圾信息。


### 不要重复信息 {: #dont-repeat }

您的空间很小，无法传递大量信息。不要在通知的不同部分包含重复信息以致浪费空间。
尽管重复信息可能是相关信息，但去除重复信息可为您腾出空间来容纳其他信息。例如，如果您的标题包含星期几，就请不要在正文中列出。


<div class="attempt-left">
  <figure>
    <img src="images/notification-no-dup-content.png">
    <figcaption class="success"><b>宜：</b> 不重复标题中的信息。</figcaption>

  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/notification-dup-content.png">
    <figcaption class="warning"><b>忌：</b> 消息内容重复标题中的信息。</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

此外，如果应用处于打开状态，可能新信息已显示在屏幕上。
此时可以不使用通知，而是改用应用 UI 来通知用户。

### 不要为您的本机应用做广告 {: #dont-advertise-native }

推送通知背后的技术是服务工作线程，其作用是让您可以避免投入时间和金钱脱离网站开发应用。同时拥有您的服务工作线程和本机应用的用户可能会收到重复通知，除非您编写服务器端代码加以阻止。
您可以完全避免这一问题；不要鼓励用户同时运行这两者。


### 不要做广告 {: #dont-advertise }

一旦用户进入您的应用，您就有机会从用户体验中获利。
不要因向用户发送他们不需要的垃圾信息而把事情搞砸。如果您通过通知向用户发送垃圾信息，可能会彻底失去用户。


### 不要包括您的网站名称或域名 {: #no-website }

通知已经包含了您的域名，并且空间也实在紧张。

<div class="attempt-left">
  <figure>
    <img src="images/chrome-notification.png" alt="Chrome 通知中的域名。">
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/firefox-notification.png" alt="Firefox 通知中的域名。">
  </figure>
</div>
<div style="clear:both;"></div>

### 让图标具有上下文相关性 {: #contextual-icon }

<figure class="attempt-right">
  <img src="images/still-up.png">
  <figcaption class="warning"><b>忌：</b> 使用通用图标。
  </figcaption>
</figure>

图标应传递有关其随同的消息的信息。请考虑以下示例。


它明确告诉我们是谁发送的消息。但图标（在许多通知中都是网站或应用徽标）却没有告诉我们任何信息。


<div style="clear:both;"></div>

让我们改用发送者的个人资料图像。

<figure class="attempt-right">
  <img src="images/contextual-icon.png">
  <figcaption class="success"><b>宜：</b> 使用能够提供有关消息的一些上下文信息的图标。</figcaption>

</figure>




但请让图标保持简单。用户不会注意太多的细微之处。


{# wf_devsite_translation #}
