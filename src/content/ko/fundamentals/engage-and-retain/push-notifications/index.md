project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 푸시 알림은 네이티브 앱의 가장 중요한 기능 중 하나이며, 이제 웹에서 이 기능을 사용할 수 있습니다. 푸시 알림을 최대한 활용하려면, 알림이 시기 적절하고 관련성 있고 섬세해야 합니다.

{# wf_updated_on: 2016-06-30 #}
{# wf_published_on: 2016-06-30 #}

# 웹 푸시 알림: 시기 적절, 관련성, 섬세함 {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}


<img src="images/cc-good.png" alt="예시 알림" class="attempt-right">

개발자들에게 휴대기기 기능 중 웹에서 사용할 수 없는 것이 무엇인지 묻는다면
언제나 푸시 알림이라는 답이 우선적으로 나옵니다.

웹 푸시 알림을 사용하면 사용자는 자신이 좋아하는 사이트에서 시기 적절하게 업데이트를 받도록 옵트인할 수 있고
개발자는 사용자설정된 관련 콘텐츠를 이용하여 사용자를 효과적으로
다시 참여시킬 수 있습니다. 

Push API와 Notification API는 사용자를 다시 참여시킬 수 있는
완전히 새로운 가능성을 열어줍니다.

## 서비스 워커가 관련됩니까? {: #service-worker-involved }

예. 서비스 워커는 백그라운드에서 작동하기 때문에 푸시는 서비스 워커를
기반으로 합니다. 사용자가 알림을 클릭하거나 닫는 방식으로 알림과 상호작용할 때는 푸시 알림에서 타임 코드만 실행됩니다(
즉, 배터리가 사용되는 시간만).
   여기에 친숙하지 않다면
[서비스 워커 소개][service-worker-primer]를 참조하세요. 나중에 우리가 푸시 및 알림의
구현 방법을 보여줄 때 서비스 워커 코드를
사용할 것입니다.

## 두 가지 기술{: #two-technologies }

푸시와 알림은 서로 다르지만 보완적인 API를 사용합니다.
[**푸시**](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)는
서비스가 서비스 워커에 정보를 제공할 때 호출되고
[**알림**](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)은
 사용자에게 정보를 보여주는 서비스 워커 또는 웹 페이지 스크립트의
액션입니다.

## 간단한 알림 분석 {: #anatomy }

다음 섹션에서는 여러 장의 사진을 보여줄 것입니다.
그 전에 우리가 약속했던 코드가 여기에 있습니다. 서비스 워커 등록을 사용하여
등록 객체에서 `showNotification`을 호출합니다.


    serviceWorkerRegistration.showNotification(title, options);
    

`title` 인수는 알림에서 표제로 나타납니다. `options`
인수는 알림의 다른 속성을 설정하는 객체 리터럴입니다.
일반적인 옵션 객체는 다음과 같습니다.


    {
      "body": "Did you make a $1,000,000 purchase at Dr. Evil...",
      "icon": "images/ccard.png",
      "vibrate": [200, 100, 200, 100, 200, 100, 400],
      "tag": "request",
      "actions": [
        { "action": "yes", "title": "Yes", "icon": "images/yes.png" },
        { "action": "no", "title": "No", "icon": "images/no.png" }
      ]
    }
    
<img src="images/cc-good.png" alt="Example Notification" class="attempt-right">

이 코드는 이미지에 나오는 것처럼 알림을 생성합니다. 일반적으로
네이티브 애플리케이션과 같은 기능을 제공합니다. 이 기능을 구현하는 자세한 방법을
살펴보기 전에 이 기능을 효과적으로 사용하는 방법을
보여드리겠습니다.   권한 및 구독 처리, 메시지 보내기, 메시지에 응답하기 등 푸시 알림을 구현하는
메커니즘에 대해
계속 설명합니다.

## 푸시 알림 체험 방법

이 기능을 시험 삼아 여러 가지 방법으로 사용하여 이 기능의 작동 방식을 완벽히 이해하거나 구현할 수 있습니다. 먼저 [샘플](https://github.com/GoogleChrome/samples/tree/gh-pages/push-messaging-and-notifications)을 확인하세요. Peter Beverloo의 [Notification Generator](https://tests.peter.sh/notification-generator/)와 Chris Mills의 [push-api-demo](https://github.com/chrisdavidmills/push-api-demo)도 참조할 수 있습니다.

참고: 로컬 호스트를 사용하지 않는다면 Push API에 HTTPS를 사용해야 합니다.

<<../../../_common-links.md>>


{# wf_devsite_translation #}
