project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 알림을 사용하는 올바른 방법과 더 잘 사용하는 방법이 있습니다. 좋은 알림이란 어떤 것인지 알아봅니다. 그저 여러분이 할 일을 보여주기만 하는 것이 아니라, 그 방법을 알려드리겠습니다.

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# 좋은 알림이란 어떤 것입니까? {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/tpnr.png" alt="시기 적절, 섬세함, 관련성">
  <figcaption>시기 적절, 섬세함, 관련성</figcaption>
</figure>

사용자를 귀찮게 하지 마세요. 아니면 영원히 사용자를 잃을 수 있습니다. 다른 무슨 말이
더 필요하겠습니까? 말보다 행동으로 옮기는 것이 더 중요합니다. 

푸시 알림은 네이티브 앱의 가장 중요한 기능 중 하나이며, 
이제 웹에서 이 기능을 사용할 수 있습니다. 푸시 알림을
최대한 활용하려면, 알림이 시기 적절하고 관련성 있고 섬세해야 합니다.

**시기 적절**—시기 적절한 알림은 사용자가 알림을 원할 때와 알림이 필요할 때
나타나는 알림입니다.

**섬세함**—섬세한 알림은 즉시 활용이 가능한 구체적 정보가 있는
알림입니다.

**관련성**—관련성 있는 메시지는 사용자가 관심을 가지는 사람이나
주제에 관한 메시지입니다.

<div style="clear:both;"></div>


## 시기 적절 {: #timely }

시기 적절한 알림은 사용자가 알림을 원할 때와 알림이 필요할 때
나타나는 알림입니다. 시기 적절이란 여러분이 아니라 사용자에게 시기 적절하다는 것을
의미합니다.

### 연결에 상관없이 알림을 제공하세요{: #make-it-available }

여러분은 대부분의 알림을 즉시 보여주기를 원할 것입니다. 알림을 표시하기 전에
알림을 보류해야 하는 이유들이 있으며, 그중 하나는 일부 플랫폼에서
푸시 페이로드가 지원되지 않을 수도 있다는 점입니다.
따라서 알림을 표시하기 전에 중요한 정보를 가져와야 하는 경우가 있을 수 있습니다.

최근까지만 해도 모바일 앱에서만 이것이 가능했습니다. 서비스 워커를 사용하면 사용자가
알림을 원할 때까지 알림을 보관할 수 있습니다. 사용자가 알림을 클릭할 때
네트워크의 상태는 무관합니다.


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
    

### 진동을 적절히 사용{: #vibrate-judiciously }

진동이 시기 적절 아래에 나오는 것이 이상해 보일 수도 있지만, 사실 긴밀한 관련이 있으며
여러 가지 문제점이 있습니다.

첫째로, 진동은 사용자에게 새 알림을 알리기 위한 이상적인 방법처럼
보일 수 있습니다. 그러나 일부 사용자는 진동을 끄고 있으며 일부 기기는
진동 기능이 없습니다. 결과적으로, 긴급하게 소통해야 하는 경우에는
진동이 문제가 될 수 있습니다.

둘째로, 모든 알림을 진동으로 만든다면, 정작 긴급한 경우에는
소용이 없을 수도 있습니다. 사용자는 자신에게 별로 중요하지 않은 알림을 귀찮아 하며,
진동을 아예 꺼버릴 수 있습니다.

요약하면, 진동 사용 방법을 사용자가 결정하도록 하세요. 어떤 알림에 진동을 사용할지, 그리고
진동 사용 여부를 모두 사용자가 선택하도록 하세요. 다양한
알림 범주가 있는 경우에는, 그에 맞는 다른 진동 패턴을
사용자가 선택할 수 있도록 하세요.

마지막으로, 휴대기기를 진동시키려면 모터를 구동해야 하는데
모터는 화면 알림보다 더 많은 전원을 소모합니다.

## 섬세함 {: #precise }

섬세한 알림은 즉시 반응할 수 있는 구체적 정보가 있는
알림입니다. 분석 과정에서의 이미지를 다시 살펴봅시다.

![섬세한 알림에는 구체적 정보가 있습니다.](images/flight-delayed-good.png){:width="316px"}

한눈에 알아야 할 모든 것을 알려줍니다.

* 메시지를 보낸 사람 - 항공사.
* 무슨 일이 발생했는가 - 새 항공편이 지연되었습니다.
* 기타 정보 - 새 항공편 시간.


### 사용자가 여러분의 사이트를 방문할 필요가 없도록 충분한 정보를 제공 {: #offer-enough }

모든 경우에 적절치는 않겠지만,
작은 공간으로 충분히 전달될 만큼 간단한 정보인 경우에는 사용자가 여러분의 웹사이트를 열지 않고
이 정보를 읽을 수 있도록 하세요. 예를 들어, 여러분이 어떤 사용자에게 다른 사용자의 승인을 알리려는 경우에는
'새 알림'이라는 메시지를 표시하지 말고, '피트가 "아니요"라고 말했어'라는
메시지를 표시하세요.

<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>권장:</b> 사용자가 방문할 필요가 없도록
       충분한 정보를 제공하세요.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>금지:</b> 메시지를 모호하거나 이해하기
    어렵게 만들지 마세요.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

이 지침은 중요한 정보인 경우 특히 중요합니다.

<div class="attempt-left">
  <figure>
    <img src="images/extreme-danger.png">
    <figcaption class="success"><b>권장:</b> 사용자가 방문할 필요가 없도록
       충분한 정보를 제공하세요.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/suggestion.png">
    <figcaption class="warning"><b>금지:</b> 메시지를 모호하거나 이해하기
    어렵게 만들지 마세요.</figcaption>
  </figure>
</div>

<div style="clear:both;"></div>

### 액션을 알림에 바로 넣으세요{: #offer-actions }

이에 대해서는 우리가 이미 여러 번 살펴봤으며, 분석 과정에서도
액션을 알림에 추가하는 방법을 보여줬습니다. 서비스 워커는 이러한 액션을 처리해야 합니다.
이 작업은 `notificationclick` 이벤트에서 수행합니다.


    self.addEventListener('notificationclick', event => {
      var messageId = event.notification.data;
      
      event.notification.close();
    
      if (event.action) {
        // Send the response directly to the server.
      } else {
        // Open the app.
      }
    }, false);
    

### 제목과 콘텐츠를 구체적으로 만드세요{: #specific-title }

해당 메시지의 문맥과 관련된 제목을 만들고, 메시지의 구체적인 내용을
포함하세요. 앱 이름 등 수신인이 이미 알고 있는
내용은 별로 도움이 안 됩니다. 메시지 전송에 사용되는 기술 등 수신인이 모르는
정보도 도움이 안 됩니다.

<div class="attempt-left">
  <figure>
    <img src="images/flight-delayed-good.png">
    <figcaption class="success"><b>권장:</b> 메시지의 구체적인
    내용을 포함하도록 제목을 만드세요.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/cc-bad.png">
    <figcaption class="warning"><b>금지:</b> 사용자가 이미
    알고 있거나 이해하지 못하는 정보는 포함하지 마세요.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

### 중요한 정보는 앞에 넣으세요

즉, 사용자에게 중요한 정보를
알림의 가장 눈에 띄는 위치에 넣으세요. 예를 들어, 서양 언어에서는
텍스트를 왼쪽에서 오른쪽으로, 위에서 아래로 표시하므로 메시징 앱에서 보낸 사람의 이름을 왼쪽 위에 배치합니다.


<div class="attempt-left">
  <figure>
    <img src="images/pete-replied.png">
    <figcaption class="success"><b>권장:</b> 보낸 사람 이름이
    왼쪽 위에 있습니다.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/new-missive.png">
    <figcaption class="warning"><b>금지:</b> 왼쪽 위의 정보는
    불필요한 내용입니다.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

### 메시지를 짧게 유지하세요{: #keep-it-short }

알림은 이메일이 아닙니다. 알림의 목적은 사용자가 여러분의 앱을
열도록 사용자에게 조르는 것입니다. `PushMessageData` 객체를 사용하여
사용자에게 데이터를 즉시 보낼 수 있지만, 일부 데이터는 사용자에게 표시하고
싶지 않을 수도 있습니다(특히, 알림이 전송된 후에 서버에 추가적인 데이터가
쌓일 수 있는 경우).

## 관련성 {: #relevant }

관련성 있는 메시지는 사용자가 관심을 가지는 사람이나 주제에 관한 메시지입니다.

### 로그인된 사용자를 선호{: #prefer-logged }

로그인된 사용자로부터만 알림 권한을 요청하세요.
사용자가 누구인지 모른다면 관련성 있는 알림을 해당 사용자에게 보내기
어렵습니다. 또한 알림이 무관한 경우 사용자가 이 알림을 스팸으로 간주할 수도
있습니다.

### 정보를 반복하지 마세요{: #dont-repeat }

많은 정보를 전달하기에는 공간이 부족합니다. 알림 부분에 중복 정보를
반복하여 공간을 낭비하지 마세요. 중복 정보가 관련된
정보일 수도 있지만, 중복 정보를 제거하고 다른 정보를
더 넣을 수 있습니다. 예를 들어, 제목에 요일이 표시된 경우 본문에는
요일을 나열하지 마세요.

<div class="attempt-left">
  <figure>
    <img src="images/notification-no-dup-content.png">
    <figcaption class="success"><b>권장:</b> 제목의 정보가
    반복되지 않습니다.</figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/notification-dup-content.png">
    <figcaption class="warning"><b>금지:</b> 메시지 본문에서 제목의 내용이 반복됩니다.</figcaption>
  </figure>
</div>
<div style="clear:both;"></div>

또한 앱이 열려 있는 경우, 새로운 정보가 화면에
이미 있을 수 있습니다. 이 경우 알림 대신에 애플리케이션 UI를 사용하여 사용자에게 알리세요.

### 네이티브 앱을 광고하지 마세요{: #dont-advertise-native }

푸시 알림 이면의 기술인 서비스 워커의 측면에서,
여러분은 웹사이트와 별도로 애플리케이션을 작성하는 시간과 비용을 피할 수
있습니다. 사용자가 여러분의 서비스 워커와 네이티브 앱을 둘 다 가지고 있는 경우,
중복 알림을 차단하는 서버측 코드를 작성하지 않으면 해당 사용자가 중복 알림을 받을 수도 있습니다. 이 문제를
완전히 피할 수 있습니다. 사용자가 둘 다 실행하지 않도록 하세요.

### 광고하지 마세요{: #dont-advertise }

사용자가 여러분의 앱에 들어오면, 사용자 환경으로부터 수익을
창출할 기회가 있을 것입니다. 사용자에게 스팸 광고를 보내서 기회를 날려버리지 마세요. 알림으로 사용자에게
스팸 광고를 보낸다면, 사용자를 모두 잃을 수도 있습니다.

### 웹사이트 이름이나 도메인을 포함하지 마세요{: #no-website }

알림에는 이미 도메인 이름이 포함되어 있으며, 공간이 부족합니다.

<div class="attempt-left">
  <figure>
    <img src="images/chrome-notification.png" alt="Chrome 알림의 도메인 이름.">
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/firefox-notification.png" alt="Firefox 알림의 도메인 이름.">
  </figure>
</div>
<div style="clear:both;"></div>

### 상황별 아이콘을 만드세요{: #contextual-icon }

<figure class="attempt-right">
  <img src="images/still-up.png">
  <figcaption class="warning"><b>금지:</b> 일반 아이콘 사용.
    </figcaption>
</figure>

아이콘은 메시지에 관한 내용을 전달해야 합니다. 다음
예시를 살펴봅시다.

이 예시는 누가 메시지를 보냈는지 정확히 알려줍니다. 그러나 대부분의 알림에서
사이트나 앱 로고를 나타내는 아이콘은 아무런 의미가 없습니다.

<div style="clear:both;"></div>

그 대신, 보낸 사람의 프로필 이미지를 사용해 보겠습니다.

<figure class="attempt-right">
  <img src="images/contextual-icon.png">
  <figcaption class="success"><b>권장:</b> 메시지에 관한
상황별 정보를 제공하는 아이콘을 사용하세요.</figcaption>
</figure>




그러나 아이콘은 단순하게 유지하세요. 너무 복잡하면 사용자가 혼란스러울 수 있습니다.


{# wf_devsite_translation #}
