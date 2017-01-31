project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 앱 설치 배너를 지연시키거나 취소할 수 있습니다. 사용자가 배너에 어떻게 응답하는지 이해합니다.

{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2000-01-01 #}

# 앱 설치 배너 추가작업 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}



크롬은 사용자가 앱 설치 배너에 어떻게 응답하는지에 관한 쉬운 메커니즘을 제공하고, 배너를 지연시키거나 취소할 수 있습니다.


## 사용자가 앱을 설치 했나요?

사용자가 실행 창에서 반응을 할 때 `beforeinstallprompt` 이벤트는 `userChoice` 라는 promise 를 반환합니다. 이 promise는 `outcome`속성에서 `dismissed` 라는 값을 반환하거나 유저가 웹 페이지를 홈 스크린에 추가하면 `accepted`를 반환합니다.


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
    

위는 사용자가 어떻게 앱 설치 실행창에 반응하는지 이해할 수 있는 좋은 예제입니다.

## 실행창 지연시키거나 취소하기

일반적으로 크롬에서 실행창 실행 타이밍을 관리하지만 몇몇 사이트의 경우 바람직 하지 않을 수 있습니다.
실행창을 앱 사용도에 따라 나중에 실행하도록 지연하거나 취소할 수 있습니다.

크롬이 사용자에게 앱의 설치 여부를 묻는 실행창을 띄울 때, default 액션을 잠시 보류 했다가 나중에 사용할 수 있습니다. 사용자가 당신의 사이트에 호감을 가졌다고 생각했을 때, 저장해놨던 `prompt()` 이벤트를 호출해서 앱 설치 여부를 다시 물을 수 있습니다.

크롬이 설치 배너를 표시하면 `userChoice` 같은 모든 Promise 속성들을 바인딩 할 수 있게 됩니다.
이렇게 하면 사용자가 어떤 동작을 취했는지 알 수 있습니다.


    
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
    

아니면, default 값을 막아 실행창을 취소할 수도 있습니다.


    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });

Translated By:    
{% include "web/_shared/contributors/captainpangyo.html" %}
