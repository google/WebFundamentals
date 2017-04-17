project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:有两个服务器参与消息发送：您的服务器和第三方消息传送服务器。您负责跟踪所发送消息的接收人。第三方服务器负责处理路由。


{# wf_updated_on:2016-06-30 #}
{# wf_published_on:2016-06-30 #}

# 发送消息 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

实际上有两个服务器参与消息发送：您的服务器和第三方消息传送服务器。
您负责跟踪两个对象：收件人和消息传送服务器上的收件人专属端点。
消息传送服务器负责处理路由。


## 更广的上下文{: #the-broader-context }

我们已经了解如何在网络应用内订阅推送。该过程包括将一个公钥（名称为 `applicationServerKey`）传入 Subscription API。



下图显示了操作顺序。

![发送消息](images/push-flow.gif)

1. 设备下载您包含已创建 publicKey（在脚本中称为 `applicationServerKey`）的网络应用。
网络应用安装服务工作线程。
1. 在订阅流期间，浏览器联系消息服务器来创建新的订阅并将其返回应用。



    <aside class="note"><b>注：</b>您不需要知道消息服务器的网址。每个浏览器厂商都为旗下浏览器管理自有的消息服务器。</aside>

1. 在订阅流后，您的应用会将订阅对象传回您的应用服务器。
1. 在稍后的某个时间，您的应用服务器会向消息服务器发送一条消息，后者会将其转发至接收方。



## 生成 applicationServerKey {: #generating-the-key }

关于 `applicationServerKey`，您需要了解多个方面：

* 它是您的应用服务器上所生成公钥/私钥对的公钥部分。
* 密钥对应当可与符合 P-256 曲线的椭圆曲线数字签名算法 (ECDSA) 结合使用。
* 您的应用应将公钥作为 8 位不带符号的整型传递至消息服务器。
* 它在一个名称为网络推送自主应用服务器标识 (VAPID) 的规范中定义，我们将在[发送消息](sending-messages)部分讨论此规范。


您可以在 [web-push 节点库](https://github.com/web-push-libs/web-push/)中找到生成示例。
类似于下面所示：



    function generateVAPIDKeys() {
      var curve = crypto.createECDH('prime256v1');
      curve.generateKeys();

      return {
        publicKey: curve.getPublicKey(),
        privateKey: curve.getPrivateKey(),
      };
    }


## 订阅对象详解 {: #subscription-anatomy }

我们早些时候说过订阅对象必须在转换成字符串后传递至服务器，但我们没有告诉大家订阅对象中包含哪些内容。
这是因为客户端不会对它进行任何处理。
但是服务器却会。  

订阅对象如下所示：  


    {  
      "endpoint": "https://example.com/push-service/send/dbDqU8xX10w:APA91b...",  
      "keys": {  
        "auth": "qLAYRzG9TnUwbprns6H2Ew==",  
        "p256dh": "BILXd-c1-zuEQYXH\\_tc3qmLq52cggfqqTr\\_ZclwqYl6A7-RX2J0NG3icsw..."  
      }  
    }


其中包含了哪些内容？  

**endpoint** - 包含两部分：订阅浏览器使用的消息传送服务的网址及其后的用户唯一标识符。


**keys** - 用于对传递至服务工作线程消息的数据进行加密的加密密钥。
它包含以下内容：

* **auth** - 浏览器生成的一个 16 字节身份验证密钥。
* **p256dh** - 65 字节，其中包含一个来自浏览器的公钥，开发者在对他们想要发送到该推送服务的消息进行加密时，需要使用此公钥。



注：在很多相关规范中，字节都称为八位字节。之所以使用字节这一术语是因为，在旧系统和通信系统中，字节并不总是 8 位长。

## 创建消息{: #creating-the-message }

从这里开始，事情变得有点令人抓狂了。在本部分中，我们的焦点已离开您的客户端应用。
我们来到应用服务器，将在这里创建一条消息并将其发送到客户端。
其中有很多方面需要跟踪。

继续之前，我们先来回顾一下拥有的内容及其来源。

* **订阅对象** - 来自客户端。它包含消息服务器的端点、公钥的副本，以及一个由客户端生成的身份验证密钥。从这里开始，我们将停止谈论订阅对象，仅会提到**端点**、**公钥**和**身份验证密钥**。
* **私钥** - 对应于 VAPID 公钥的 VAPID 私钥。
  这是您应用服务器的一个私钥。

我们将分三部分了解消息创建过程。首先，我们将创建一些 HTTP 标头，然后会为消息创建负载，最后会将它们组合并发送到消息服务器。



### 关于代码示例的说明{: #a-note-about-samples }

本部分中提供的代码示例选取自 [web-push 节点库](https://github.com/web-push-libs/web-push)。


### 结果{: #the-product }

我们来看一下最后会获得什么，然后我们将讨论如何构建它。


<pre class="prettyprint">POST /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1  
Host: push.example.net  
Push-Receipt: https://push.example.net/r/3ZtI4YVNBnUUZhuoChl6omU  
TTL: 43200  
Content-Type: text/plain;charset=utf8  
Content-Length: 36  
Authorization:WebPush
eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL3B1c2guZXhhbXBsZS5uZXQiLCJleHAiOjE0NTM1MjM3NjgsInN1YiI6Im1haWx0bzpwdXNoQGV4YW1wbGUuY29tIn0.i3CYb7t4xfxCDquptFOepC9GAu\_HLGkMlMuCGSK2rpiUfnK9ojFwDXb1JrErtmysazNjjvW2L9OkSSHzvoD1oA  
Crypto-Key:
p256ecdsa=BA1Hxzyi1RUM1b5wjxsn7nGxAszw2u61m164i3MrAIxHF6YK5h4SDYic-dRuU\_RCPCfA5aq9ojSwk5Y2EmClBPsiChYuI3jMzt3ir20P8r\_jgRR-dSuN182x7iB</pre>

请注意，此请求将发送到订阅对象中包含的端点。
我们将对授权、Crypto-Key 和 TTL 标头进行说明。
先来看一下最简单的。

## HTTP 标头{: #http-headers }

### TTL {: #ttl }

消息服务器可能需要一段时间才可以传输您的应用服务器发送的消息。
消息服务没有永久保留消息的义务。坦率地讲，为了保证时效性，应用服务器绝不应发送可以永久生存的消息。这就是需要包含一个 TTL 标头的原因，TTL 顾名思义为“生存时间”。


TTL 标头是一个以秒为单位的值，用于向消息服务器建议应将消息保留多长时间后再尝试发送。如果选择，消息服务器可以缩短它希望保留消息的时间。
如果缩短保留时间，那么在对消息请求的响应中，消息服务器必须在 TTL 标头中返回缩短后的时间。
如果 TTL 的值为 0，那么在 User Agent 可用时，消息服务器应立即传输消息。
如果 User Agent 不可用，消息将立即过期并且永远不会传输。


### Crypto-Key 标头{: #crypto-key-header }

要验证应用服务器发送的消息，消息服务器需要公钥。
您在 Crypto-Key 标头中发送公钥。Crypto-Key 标头包含两个部分。
  

<pre class="prettyprint">dh=<i>publicKey</i>,p256ecdsa=<i>applicationServerKey</i></pre>  

例如：  

<pre class="prettyprint">dh=BGEw2wsHgLwzerjvnMTkbKrFRxdmwJ5S\_k7zi7A1coR\_sVjHmGrlvzYpAT1n4NPbioFlQkIrT  
NL8EH4V3ZZ4vJE,p256ecdsa=BDd3\_hVL9fZi9Ybo2UUzA284WG5FZR30\_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6\_LFTeZaN</pre>

第一部分 (`dh=publicKey`) 是公钥，即我们在“请求权限和订阅用户”中创建的一个密钥。
第二部分 (`p256ecdsa=applicationServerKey`) 是您的应用服务器创建的公钥。两个公钥都必须采用网址 base64 格式进行编码。请注意，Crypto-Key 采用逗号分隔两个部分。

注：Chrome 52 中的一个错误要求使用分号而不是逗号分隔 Cyrpto-Key 的两个部分。

### 授权标头{: #authorization-header }

要发送消息，您需要授权标头。它包含四个部分：  

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

WebPush 一词是一个字面量，后面必须紧跟一个空格。剩余部分（加密并使用句点级联）将组成一个有符号的 JSON 网络令牌 (JWT)。JWT 是一种与第二方分享 JSON 对象的方式，通过这种方式，发送方可以对其进行签署，而接收方则可以验证签名是否来自期望的发送方。

   

我们来详细看一下令牌的各个部分。

#### JWT 标头{: #jwt-header }

JWT 标头包含两种标准信息：`typ` 属性，表示消息类型（此例中为 JWT 消息）；`alg` 属性，表示用于签署消息的算法。这些详情随后应使用网址 base64 格式进行编码。





    {  
      "typ": "JWT",  
      "alg": "ES256"  
    }


#### JWT 负载{: #jwt-payload }

JWT 将此部分称为负载。它并不是存储消息负载的地方。
我们很快就会讲到这一点。负载是另一种 JSON 对象，具有以下成员：
**aud**  
其中包含推送服务端点的来源，您应从订阅对象提取此来源。它并不是您的网站来源。    
**exp**  
以毫秒为单位指定 JWT 请求过期的时间（并非消息自身的过期时间）。
此时间必须在 24 小时以内。将当前日期转换成毫秒，然后加上持续时间可以计算此时间。例如，在 Node.js 中，您可以进行以下计算：




    Math.floor((Date.now() / 1000) + 12 * 60 * 60)


**sub**  
指定主题，VAPID 规范将其作为推送服务联系消息发送方的方式。
可以是网址或收件人地址（请参阅下面的示例）。
  

完整的 JWT 负载如下所示：


    {  
      "aud": "http://push.example.net",  
      "exp": "1469618703",  
      "sub": "mailto: my-email@some-url.com"  
    }


#### 签名{: #signature }

签名是 JWT 的最后一部分。

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

首先使用点将 JWT 标头与负载级联，创建签名。
例如：

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;</pre>

使用您在[生成 applicationServerKey](#generating-the-key) 部分中创建的私钥将其加密。


现在，您已经拥有组成 JWT 的全部三个部分，这三个部分使用点连接起来。


<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

我们不会介绍如何进行签名加密，不过，您可以利用多种库。
一个不错的选择是 [jwt.io](https://jwt.io/){: .external } 的库部分。


最后，请在前面加上“WebPush”和一个空格。结果将如下所示：


<pre class="prettyprint">WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A</pre>

### 消息负载{: #message-payload }

实现服务器代码时，有两种发送消息的方法可以考虑。


* 带有数据负载的消息。
* 不带数据负载的消息，通常称作操作消息 (tickle)。

如果是操作消息 (tickle)，服务工作线程会使用消息作为信号从端点获取数据。
“处理消息”部分包含的示例代码展示了服务工作线程如何执行这项操作。


您为何会发送不带负载的消息？有两个原因。

* 您需要发送的内容超过了规范设定的 4k 负载限值
* 客户端需要获得比推送中更新的数据。

从技术上讲，还有另一个原因，即浏览器能力可能发生暂时性变化，但两个主要原因可能始终存在。
如果浏览器不支持负载，订阅对象将不包含密钥。


不管您如何将负载传输到客户端，都必须将其加密。加密系统只要是专用产品便足以满足需要，即便是在软件开发中，我们也不建议自行编写加密系统。幸运的是，可以使用一系列推送库。


对于通过消息服务器发送的负载，您必须使用 publicKey 和身份验证密钥将其加密。
还必须使用对消息唯一的 16 个随机字节处理负载。
最后，负载会添加到发送至消息服务器的请求正文中。


### 以独特方式发送{: #sending-it-on-its-way }

在 web-push 节点库中，可以使用内置 https 库中的一个请求对象实例完成此操作。



    const https = require('https');


请求会在某个时间点发送至消息服务器。web-push 节点库将此代码包裹进一个 promise（带有相应的解析和拒绝调用）中，以便可以异步发生。下面的代码示例（选取自 [web-push 节点库](https://github.com/web-push-libs/web-push)）对此进行了说明。



请注意，消息服务器会立即响应网络请求，意味着此过程与向客户端应用发送消息是异步的。



    const pushRequest = https.request(options, function(pushResponse) {  
      let body = '';    
      // Allow the payload to be sent out in chunks.  
      pushResponse.on('data', function(chunk) {  
        body += chunk;  
      });    
      // Check to see if the push is successful.  
      pushResponse.on('end', function() {  
        if (pushResponse.statusCode !== 201) {  
          reject(new WebPushError('Received unexpected response code',  
            pushResponse.statusCode, pushResponse.headers, body));  
        } else {  
          // Do something with the response body.  
        }  
     });  
    });  

    if (requestPayload) {  
      pushRequest.write(requestPayload);  
    }  

    pushRequest.end();  

    pushRequest.on('error', function(e) {  
      console.error(e);  
    });


{# wf_devsite_translation #}
