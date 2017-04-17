project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 메시지 보내기에는 두 대의 서버, 즉 여러분의 서버와 타사 메시징 서버가 관련됩니다. 여러분은 누구에게 메시지를 보낼지 추적합니다. 타사 서버는 라우팅을 처리합니다.


{# wf_updated_on: 2016-06-30 #}
{# wf_published_on: 2016-06-30 #}

# 메시지 보내기 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

실제로 메시지 보내기에는 두 대의 서버, 즉 여러분의 서버와 타사 메시징 서버가
관련됩니다. 여러분은 메시징 서버에서 두 가지를
추적합니다(수신인과 수신인별 엔드포인트). 메시징 서버는 라우팅을
처리합니다.

## 광범위한 컨텍스트 {: #the-broader-context }

웹 애플리케이션에서 푸시를 구독하는 방법을 살펴보았습니다. 이 과정에는
`applicationServerKey`라는 공개 키를
구독 API에 전달하는 작업이 포함됩니다.

다음 다이어그램은 동작 순서를 보여줍니다.

![메시지 보내기](images/push-flow.gif)

1. 기기가 사전에 생성된 공개 키를 포함하여 웹 앱을 다운로드합니다.
스크립트에서 공개 키는 `applicationServerKey`로 나타냅니다. 웹 앱이
서비스 워커를 설치합니다.
1. 구독 흐름에서 브라우저가 메시징 서버에 연결하여
새로운 구독을 생성하고 앱에 반환합니다.

    <aside class="note"><b>참고:</b> 메시지 서버의 URL은 몰라도 됩니다. 각 브라우저 공급업체가 브라우저의 메시지 서버를 관리합니다.</aside>

1. 구독 흐름 후에 앱이 구독 객체를 다시
앱 서버에 전달합니다.
1. 나중에 앱 서버가 메시징 서버에 메시지를 전송하고,
메시징 서버는 이를 수신자에게 전달합니다.

## applicationServerKey 생성 {: #generating-the-key }

`applicationServerKey`에 대해 알아두어야 할 점이 몇 가지 있습니다.

* 애플리케이션 서버에서 생성된 공개/비공개 키 중에서
비공개 키 부분입니다.
* 키 쌍은 P-256 커브에서 ECDSA(Elliptic Curve Digital Signature)와 함께
사용할 수 있어야 합니다.
* 앱은 8비트 무서명 정수 배열로 공개 키를
메시징 서버에 전달해야 합니다.
* VAPID(Voluntary Application Server Identification
for Web Push)라는 사양에서 정의되는데, 이와 관련된 내용은 [메시지 보내기](sending-messages) 섹션에서 논의할 것입니다.


[웹-푸시 노드 라이브러리](https://github.com/web-push-libs/web-push/)에서 키 생성 예시를 참조할 수 있습니다. 코드는
다음과 같습니다.


    function generateVAPIDKeys() {
      var curve = crypto.createECDH('prime256v1');
      curve.generateKeys();

      return {
        publicKey: curve.getPublicKey(),
        privateKey: curve.getPrivateKey(),
      };
    }


## 구독 객체에 대한 분석{: #subscription-anatomy }

앞서 구독 객체를 문자열화해서 서버에 전달한다는 것은 말씀드렸지만,
구독 객체에 있다는 것은 언급하지 않았습니다. 클라이언트가
구독 객체로 아무것도 하지 않기 때문입니다. 하지만 서버는 구독 객체를 사용합니다.  

구독 객체는 다음과 같은 형태를 취합니다.  


    {  
      "endpoint": "https://example.com/push-service/send/dbDqU8xX10w:APA91b...",  
      "keys": {  
        "auth": "qLAYRzG9TnUwbprns6H2Ew==",  
        "p256dh": "BILXd-c1-zuEQYXH\\_tc3qmLq52cggfqqTr\\_ZclwqYl6A7-RX2J0NG3icsw..."  
      }  
    }


이 안에는 무엇이 있을까요?  

**endpoint**—두 부분으로 구성됩니다. 구독하는 브라우저가 사용하는 메시징 서비스의 URL 뒤에
사용자의 고유 식별자가 붙습니다.

**keys**—서비스 워커 메시지로 전달되는 데이터를 암호화하기 위한
암호화 키입니다. 여기에는 다음이 포함되어 있습니다.

* **auth**-브라우저가 생성한 16바이트 인증 비밀.
* **p256dh**-푸시 서비스에 전송하고자 하는
메시지를 암호화할 때 개발자가 사용해야 하는 브라우저의 공개 키가 포함된
65바이트.

참고: 관련 사양 대부분에서 바이트는 옥텟으로 부릅니다. 레거시 및 통신 시스템에서는 바이트 길이가 8비트가 아닐 때도 있기 때문에 이 용어를 사용합니다.

## 메시지 생성 {: #creating-the-message }

여기서부터 일이 복잡해지기 시작합니다. 이 섹션부터는
클라이언트 앱을 벗어납니다. 이제 앱 서버로 들어가서
메시지를 생성하고 클라이언트에 전송할 것입니다. 여기서는 기억할 것이 많습니다.

설명을 계속하기 전에 어떤 내용을 살펴보았고 어디까지 설명했는지 정리하겠습니다.

* **구독 객체** - 클라이언트에서 왔습니다. 메시징 서버의 엔드포인트와
공개 키 사본, 클라이언트가 생성한 인증 비밀이
포함됩니다. 여기서부터는
구독 객체에 대해서 언급하지 않고 **엔드포인트**, **공개
키**, **인증 비밀**만 설명할 것입니다.
* **비공개 키** - VAPID 공개 키에 대응하는 VAPID 비공개 키입니다.
  애플리케이션 서버에 사용하는 비공개 키입니다.

메시지 생성은 세 부분으로 구성됩니다. 먼저
HTTP 헤더를 생성한 다음 메시지의 페이로드를 생성합니다. 마지막으로
그 두 가지를 결합하여 메시징 서버에 전송합니다.

### 코드 샘플 관련 참고 사항 {: #a-note-about-samples }

이 섹션의 코드 샘플은 [웹-푸시 노드
라이브러리](https://github.com/web-push-libs/web-push)에서 발췌하였습니다.

### 제품 {: #the-product }

먼저 어떤 제품을 만들지 이야기하고, 그 다음에 제작 방법을
설명하겠습니다.

<pre class="prettyprint">POST /push-service/send/dbDqU8xX10w:APA91b... HTTP/1.1  
Host: push.example.net  
Push-Receipt: https://push.example.net/r/3ZtI4YVNBnUUZhuoChl6omU  
TTL: 43200  
Content-Type: text/plain;charset=utf8  
Content-Length: 36  
Authorization: WebPush
eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL3B1c2guZXhhbXBsZS5uZXQiLCJleHAiOjE0NTM1MjM3NjgsInN1YiI6Im1haWx0bzpwdXNoQGV4YW1wbGUuY29tIn0.i3CYb7t4xfxCDquptFOepC9GAu\_HLGkMlMuCGSK2rpiUfnK9ojFwDXb1JrErtmysazNjjvW2L9OkSSHzvoD1oA  
Crypto-Key:
p256ecdsa=BA1Hxzyi1RUM1b5wjxsn7nGxAszw2u61m164i3MrAIxHF6YK5h4SDYic-dRuU\_RCPCfA5aq9ojSwk5Y2EmClBPsiChYuI3jMzt3ir20P8r\_jgRR-dSuN182x7iB</pre>

이 요청은 구독 객체에 포함된 엔드포인트로
전송됩니다. Authorization, Crypto-Key 및 TTL 헤더는 약간
설명이 필요합니다. 가장 간단한 것부터 먼저 설명하겠습니다.

## HTTP 헤더 {: #http-headers }

### TTL {: #ttl }

메시지 서버가 앱 서버에서 전송된 메시지를 전달할 수 있기까지는
다소 시간이 걸릴 수 있습니다. 메시지 서비스는 영구적으로 메시지를 보관할 의무가 없습니다.
솔직히 시기 적절함을 위해서는 앱 서버가 영구적으로 존속될 수 있는 메시지를
전송해서는 안 됩니다. 그래서
'존속 시간(time to live)'을 뜻하는 TTL 헤더를 포함해야 합니다.

TTL 헤더는 초 단위의 값으로,
서버가 메시지를 보관했다가 전달을 시도해야 하는 시간을 메시지 서버에 제안하는 것입니다.
 원한다면 메시지 서버는 메시지 보관 시간을
줄일 수 있습니다. 메시지 보관 시간을 단축하면 메시지 요청에 응답하여 TTL 헤더로
단축된 시간을 반환해야 합니다. TTL 값이 0일 경우,
사용자 에이전트를 사용할 수 있다면 메시지 서버는 메시지를 즉시 전달해야 합니다. 사용자 에이전트를
사용할 수 없다면 메시지는 즉시 만료되고 전달되지 않습니다.

### Crypto-Key 헤더 {: #crypto-key-header }

앱 서버에서 전송한 메시지를 검증하려면 메시지 서버에
공개 키가 필요합니다. Crypto-Key 헤더의 공개 키를 전송합니다. Crypto-Key
헤더는 여러 부분으로 구성됩니다.  

<pre class="prettyprint">dh=<i>publicKey</i>,p256ecdsa=<i>applicationServerKey</i></pre>  

예:  

<pre class="prettyprint">dh=BGEw2wsHgLwzerjvnMTkbKrFRxdmwJ5S\_k7zi7A1coR\_sVjHmGrlvzYpAT1n4NPbioFlQkIrT  
NL8EH4V3ZZ4vJE,p256ecdsa=BDd3\_hVL9fZi9Ybo2UUzA284WG5FZR30\_95YeZJsiApwXKpNcF1rRPF3foIiBHXRdJI2Qhumhf6\_LFTeZaN</pre>

첫 번째 부분(`dh=publicKey`)은 공개 키입니다. 권한 요청과 사용자 구독에서 생성했던
키입니다. 두 번째 부분
(`p256ecdsa=applicationServerKey`)은 앱 서버에서 생성한 공개 키입니다.
모두 base64 url 인코딩되어야 합니다. Crypto-Key의 두 부분은 쉼표로 구분합니다.

참고: Chrome 52의 버그로 인해 Cyrpto-Key 부분을 구분할 때 쉼표 대신 세미콜론을 사용해야 합니다.

### Authorization 헤더 {: #authorization-header }

메시지를 전송하려면 Authorization 헤더가 필요합니다. 이 헤더는 네 부분으로 구성됩니다.  

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

WebPush라는 단어는 리터럴이고 뒤에 공백이 한 칸 있어야 합니다. 나머지 부분은
암호화되고 마침표로 연결되는데, 서명된 JSON
웹 토큰(JWT)을 형성합니다. JWT는 JSON 객체를 두 번째 당사자와 공유하는 방법으로,
전송하는 당사자가 서명하고 수신하는 당사자는 예상한 발신자가 서명하였는지
확인할 수 있습니다.   

토큰의 각 부분을 자세히 살펴보겠습니다.

#### JWT 헤더 {: #jwt-header }

JWT 헤더는 두 개의 표준 정보가 포함됩니다. `typ` 속성은
메시지 유형을 나타냅니다. 이 경우에는 JWT 메시지입니다. `alg`
속성은 메시지 서명에 사용한 알고리즘을 나타냅니다.
이 상세정보는 base64 url 인코딩됩니다.


    {  
      "typ": "JWT",  
      "alg": "ES256"  
    }


#### JWT 페이로드 {: #jwt-payload }

JWT는 이 부분을 페이로드라고 부릅니다. 여기는 메시지 페이로드가
저장되는 곳이 아닙니다. 이 이야기는 잠시 후 설명하겠습니다. 페이로드는 다음 멤버가 포함된 또 다른 JSON 객체입니다.
    
**aud**  
푸시 서비스 엔드포인트의 출발지가 포함되어 있으며
구독 객체에서 추출해야 합니다. 이는 여러분 사이트의 출발지가 아닙니다.    
**exp**  
JWT 요청이 만료되는 시간을 밀리초(ms)로 지정합니다(메시지 자체의
만료는 아님). 24시간 이내로 지정해야 합니다. 현재 데이터를 밀리초로 변환하고
기간을 더해서 계산할 수 있습니다.
예를 들어, Node.js에서는 다음과 같이 계산합니다.


    Math.floor((Date.now() / 1000) + 12 * 60 * 60)


**sub**  
제목을 지정합니다. VAPID 사양이 푸시 서비스가 메시지 발신자에게 접촉하는 방법을
정의합니다. URL 또는 mailto 주소일 수 있습니다(아래 예시
참조).  

완전한 JWT 페이로드는 다음과 같습니다.


    {  
      "aud": "http://push.example.net",  
      "exp": "1469618703",  
      "sub": "mailto: my-email@some-url.com"  
    }


#### 서명 {: #signature }

서명은 JWT의 마지막 부분을 구성합니다.

<pre class="prettyprint">WebPush &lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

먼저 JWT 헤더와 페이로드를 점으로 연결하여
서명을 생성합니다. 예를 들면 다음과 같습니다.

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;</pre>


[applicationServerKey 생성](#generating-the-key)에서 만들었던 비공개 키로 이 서명을 암호화합니다.

이제 JWT를 구성하는 세 부분이 모두 준비되었고,
각각을 점으로 연결합니다.

<pre class="prettyprint">&lt;JWTHeader&gt;.&lt;Payload&gt;.&lt;Signature&gt;</pre>

서명 암호화 방법을 보여드리지는 않겠지만
이용할 수 있는 라이브러리가 여러 가지 있습니다. 
[jwt.io](https://jwt.io/){: .external }의 라이브러리 섹션을 참조하면 좋습니다.

마지막으로 'WebPush'라는 단어를 앞에 붙이고 뒤에 공백을 한 칸 넣습니다. 결과는
다음과 같습니다.

<pre class="prettyprint">WebPush eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NiJ9.eyJhdWQiOiJodHRwczovL2ZjbS5nb29nbGVhcGlzLmNvbSIsImV4cCI6MTQ2NjY2ODU5NCwic3ViIjoibWFpbHRvOnNpbXBsZS1wdXNoLWRlbW9AZ2F1bnRmYWNlLmNvLnVrIn0.Ec0VR8dtf5qb8Fb5Wk91br-evfho9sZT6jBRuQwxVMFyK5S8bhOjk8kuxvilLqTBmDXJM5l3uVrVOQirSsjq0A</pre>

### 메시지 페이로드 {: #message-payload }

서버 코드를 구현할 때 두 가지 방법의 메시지 보내기를
고려할 수 있습니다.

* 데이터 페이로드가 있는 메시지.
* 데이터 페이로드가 없는 메시지(대개 Tickle이라고 부름).

Tickle의 경우, 서비스 워커는 이 메시지를 신호로 사용하여
엔드포인트에서 데이터를 가져옵니다. 메지지 처리 섹션에는 서비스 워커가 이 작업을 수행하는 방법을
보여주는 샘플 코드가 있습니다.

페이로드가 없는 메시지를 보내는 이유는 무엇일까요? 다음의 두 가지 이유가 있습니다.

* 사양에 의해 설정된 4k 페이로드 제한보다 크게 보내야 합니다
* 클라이언트는 푸시에 있는 데이터보다 더 새로운 데이터를 필요로 합니다.

기술적으로는, 브라우저 기능이 달라질 수도 있는 또 다른 이유가
있을 수 있지만, 위의 두 가지 주요 이유는 항상 적용됩니다. 브라우저가
페이로드를 지원하지 않으면 구독 객체에는 키가 포함되지 않습니다.

페이로드는 어떤 방식으로 클라이언트에게 전달하든 암호화해야 합니다.
암호화는 매우 전문적인 분야이며 소프트웨어 개발에서는 더욱 그렇기 때문에,
저희는 여러분만의 암호화 시스템 작성을 권장하지 않습니다. 다행히 이용할 수 있는 푸시 라이브러리가
여러 가지 있습니다.

메시지 서버를 통해 전송하는 페이로드의 경우
공개 키와 인증 비밀을 사용하여 암호화해야 합니다. 또한, 메시지에 고유한 16 랜덤
바이트를 추가해야 합니다. 마지막으로 메시지 서버에 전송한 요청의 본문을
추가해야 합니다.

### 전송 {: #sending-it-on-its-way }

웹-푸시 노드 라이브러리에서는 내장
https 라이브러리의 요청 객체 인스턴스로 이를 수행합니다.


    const https = require('https');


어떤 시점에 이르면 요청이 메시지 서버로 전송됩니다. 웹-푸시 노드 라이브러리는
이 코드를 프라미스 안에 넣어서(분석 및 거절을 위한 적절한 호출 포함
) 비동기식으로 전송합니다. 
[웹-푸시 노드 라이브러리](https://github.com/web-push-libs/web-push)에서
가져온 아래의 예시를 보면 자세히 알 수 있습니다.

메시지 서버는 네트워크 요청에 즉시 응답합니다.
즉, 클라이언트 앱에 메시지를 비동기식으로 전송합니다.


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
