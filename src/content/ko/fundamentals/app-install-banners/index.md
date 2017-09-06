project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 앱 설치 배너는 웹 앱 설치 배너와 네이티브 앱 설치 배너의 두 종류가 있습니다. 앱 설치 배너를 통해 사용자는 브라우저를 떠나지 않고서도 자신의 홈 화면에 여러분의 웹 앱이나 네이티브 앱을 빠르고 정확하게 추가할 수 있습니다.

{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# 웹 앱 설치 배너 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="웹 앱 설치 배너">
  </figure>
</div>

앱 설치 배너는 **웹** 앱 설치 배너와
[**네이티브**](native-app-install) 앱 설치 배너의 두 종류가 있습니다. 앱 설치 배너를 통해 사용자는 브라우저를 떠나지 않고서도 자신의 홈 화면에 여러분의 웹 앱이나 네이티브 앱을 빠르고 정확하게 추가할 수 있습니다.

앱 설치 배너는 추가하기가 쉬우며, Chrome이 대부분의 힘든 작업을
대신 처리해 줍니다. 앱에 대한 상세정보와 함께 웹 앱 매니페스트 파일을 여러분의 사이트에 포함해야 합니다.


그러면 Chrome은 일련의 기준과 방문 빈도 추론을 사용하여
언제 배너를 표시할지 판별합니다. 자세한 내용을 더 읽어보세요.

참고: Add to Homescreen(약자: A2HS)은 웹 앱 설치 배너를 일컫는 또 다른 이름입니다. 이 두 용어는 같은 뜻입니다.

### 어떤 기준이 있습니까?

앱이 다음 기준을 충족하면 Chrome이 배너를 자동으로
표시합니다.

* [웹 앱매니페스트](../web-app-manifest/) 파일에 다음이 포함됨:
    - `short_name`(홈 화면에 사용)
    - `name`(배너에 사용)
    - 144x144 png 아이콘(아이콘 선언에 mime 유형의 `image/png`이 포함되어야 함)
    - `start_url` 로드
* [서비스 워커](/web/fundamentals/getting-started/primers/service-workers)가
여러분 사이트에 등록됨.
* [HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https)를 통해 서비스가 제공됨
(서비스 워커를 사용하기 위한 요구사항).
* 최소 두 번 방문하고, 각 방문 간에 최소 5분의 간격이 있음.

참고: 웹 앱 설치 배너는 새로운 기술입니다. 앱 설치 배너를 표시하는 기준은 향후 변경될 수 있습니다. 최신 웹 앱 설치 배너 기준에 대한 자세한 내용은 [What, Exactly, Makes Something a Progressive Web App?](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/)을 참조하세요(추후 추가 업데이트).

### 앱 설치 배너 테스트 {: #test }

웹 앱 매니페스트 설정이 완료되면 올바르게 정의되었는지
검증하고 싶을 것입니다. 사용할 수 있는 방법은 두 가지입니다. 하나는
수동이고 다른 하나는 자동입니다.

앱 설치 배너를 수동으로 트리거하려면:

1. Chrome DevTools를 엽니다.
2. **Application** 창으로 이동합니다.
3. **Manifest** 탭으로 이동합니다.
4. 아래 스크린샷에서 빨간색으로 강조 표시된 **Add to homescreen**을 클릭합니다.

![DevTools의 Add to homescreen 버튼](images/devtools-a2hs.png)

자세한 도움말은 [Add to Homescreen
이벤트 시뮬레이션](/web/tools/chrome-devtools/progressive-web-apps#add-to-homescreen)을
참조하세요.

앱 설치 배너를 자동 테스트할 때는 Lighthouse를 사용합니다. Lighthouse는
웹 앱 감사 도구입니다. Chrome 확장 프로그램이나
NPM 모듈로 실행할 수 있습니다. 앱을 테스트하려면 Lighthouse에
감사할 페이지를 입력합니다. Lighthouse는 해당 페이지에 대해 감사 스위트를 실행하고
이 페이지의 감사 결과를 보고서로 제공합니다.

아래 스크린샷에서 2개의 Lighthouse 감사 스위트는
페이지에 앱 설치 배너를 표시하기 위해 통과해야 하는 모든 테스트를 의미합니다.

![Lighthouse의 앱 설치 감사](images/lighthouse-a2hs.png)

Lighthouse를 시작하려면 [Lighthouse로 웹 앱 감사](/web/tools/lighthouse/)를
참조하세요.

## 앱 설치 배너 이벤트

Chrome에서 여러분은 사용자가 앱 설치 배너에 반응하는 방식을
쉽게 이해할 수 있고, 더욱 편리한 시간이 될 때까지 앱 설치 배너를 연기하거나 취소할 수 있습니다.

### 사용자가 앱을 설치했나요?

`beforeinstallprompt` 이벤트는 사용자가 프롬프트에서 작업을 수행할 때 
분석되는 `userChoice`라고 불리는 프라미스(promise)를 반환합니다.  프라미스는 `outcome` 속성에서 `dismissed` 값을 가진
객체를 반환하거나,
사용자가 웹페이지를 홈 화면에 추가한 경우 `accepted`를 반환합니다.

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
    

이는 사용자가 앱 설치 프롬프트와 어떻게 상호작용하는지
이해하기 위한 좋은 방법입니다.


### 프롬프트 연기 또는 취소

Chrome은 프롬프트를 트리거하는 시기를 관리하지만 일부 사이트에는
이것이 바람직하지 않을 수 있습니다. 앱 사용 시에 프롬프트를 나중으로 연기할 수 있으며,
심지어 취소할 수도 있습니다. 

Chrome이 사용자에게 앱을 설치하라는 프롬프트를 표시하는 경우,
여러분이 기본 동작을 차단하고 나중을 위해 이벤트를 저장할 수 있습니다. 그런 다음,
사용자가 여러분의 사이트와 긍정적인 상호작용을 한다면,
저장된 이벤트에서 `prompt()`를 호출하여 프롬프트를 다시 트리거할 수 있습니다. 

이 경우 Chrome이 배너를 표시하며, `userChoice`와 같은
모든 Promise 속성을 바인딩에 사용할 수 있으므로, 사용자가
어떤 동작을 취했는지 알 수 있습니다.
    
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
    

또는, 기본값을 차단하여 프롬프트를 취소할 수 있습니다.

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    
## 네이티브 앱 설치 배너

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif" alt="네이티브 앱 설치 배너" style="max-height: 500px">
  </figure>
</div>

네이티브 앱 설치 배너는 [웹 앱 설치 배너](.)와 유사하지만
홈 화면에 추가하는 대신 사용자가
사이트를 떠나지 않고 네이티브 앱을 설치합니다.

### 배너 표시 기준

이 기준은 서비스 워커가 필요하다는 점을 제외하고는 웹 앱 설치 배너와
유사합니다. 사이트는 다음을 충족해야 합니다.

* [웹 앱 매니페스트](../web-app-manifest/) 파일에 다음이 포함되어야 합니다.
  - `short_name`
  - `name`(배너 프롬프트에 사용)
  - 144x144 png 아이콘. 아이콘 선언에 MIME 유형의 `image/png`가 포함되어야 합니다.
  - 앱 정보가 포함된 `related_applications` 객체
* [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)를 통해 서비스되어야 합니다.
* 2주 간의 교육과정 동안 사용자가 각각 다른 날짜에 두 번 방문해야 합니다.


### 매니페스트 요구사항

매니페스트에 통합하려면
`play` 플랫폼(Google Play용)과 앱 ID가 있는 `related_applications` 배열을 추가합니다.


    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

사용자에게 Android 애플리케이션 설치 기능만 제공하고
웹 앱 설치 배너를 표시하지 않으려면
`"prefer_related_applications": true`를 추가합니다. 예를 들면 다음과 같습니다.


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]


{# wf_devsite_translation #}
