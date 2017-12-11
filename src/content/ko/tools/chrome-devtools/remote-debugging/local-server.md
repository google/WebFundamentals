project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 개발용 컴퓨터 웹 서버에서 사이트를 호스팅한 다음 Android 기기에서 콘텐츠에 액세스합니다.

{# wf_updated_on: 2016-04-07 #}
{# wf_published_on: 2015-04-13 #}

# 로컬 서버 액세스 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

개발용 컴퓨터 웹 서버에서 사이트를 호스팅한 다음 
Android 기기에서 콘텐츠에 액세스합니다.

USB 케이블과 Chrome DevTools를 사용하여 개발용
컴퓨터에서 사이트를 실행한 다음 Android 기기에서 사이트를 볼 수 있습니다. 


### TL;DR {: .hide-from-toc }
- 포트 전달을 사용하여 Android 기기에서 개발용 컴퓨터의 웹 서버에 있는 콘텐츠를 볼 수 있습니다.
- 웹 서버가 사용자설정 도메인을 사용 중인 경우, 사용자설정 도메인 매핑을 사용하여 해당 도메인의 콘텐츠에 액세스하도록 Android 기기를 설정할 수 있습니다.


## 포트 전달 설정 {:#port-forwarding}

포트 전달을 사용하여 Android 기기에서 개발용 컴퓨터 웹 서버에서 호스팅 중인
콘텐츠에 액세스할 수 있습니다. 포트 전달은
 Android 기기에서 개발용 컴퓨터의 TCP 포트에 매핑되는 수신 대기 TCP 포트를
만드는 방식으로 작동합니다. 포트 간 트래픽은 Android 기기와 개발용 컴퓨터 사이에 USB
연결을 통해 이동하므로
해당 연결은 네트워크 구성에 의존하지 않습니다.

포트 전달을 활성화하려면:

1. 개발용 컴퓨터와
Android 기기 사이에 [원격 디버깅](.)을 설정합니다. 설정을 완료하면 **Inspect Devices** 대화상자의 왼쪽 메뉴에 Android
기기와
**Connected** 상태 표시기가 표시됩니다.
1. DevTools의 **Inspect Devices** 대화상자에서 **Port forwarding**을 활성화합니다.
1. **Add rule**을 클릭합니다.

   ![포트 전달 규칙 추가](imgs/add-rule.png)
1. Android
기기에서 사이트에 액세스할 `localhost` 포트
번호를 왼쪽 **Device port** 텍스트 필드에 입력합니다. 예를 들어, `localhost:5000`에서 
   사이트에 액세스하려면 `5000`을 입력합니다.
1. 오른쪽의 **Local address** 텍스트 필드에 개발용 컴퓨터 웹 서버에서 실행 중인 사이트의 IP 주소 또는 
   호스트 이름과
   포트 번호를 입력합니다. 예를 들어, 사이트가
`localhost:7331`에서 실행 중인 경우 `localhost:7331`을 입력합니다.
1. **Add**를 클릭합니다.

이제 포트 전달이 설정되었습니다. **Inspect Devices** 대화상자 안의
기기 탭에 포트 전달 상태 표시기가 표시됩니다.

![포트 전달 상태](imgs/port-forwarding-status.png)

콘텐츠를 보려면 Android 기기에서 Chrome을 열고
**Device port** 필드에서 지정한 `localhost`로 이동합니다. 예를 들어, 
해당 필드에 `5000`을 입력한 경우 
`localhost:5000`으로 이동합니다. 

## 사용자설정 로컬 도메인에 매핑 {:#custom-domains}

사용자설정 로컬 도메인 매핑을 통해 사용자설정 도메인을 사용 중인
개발용 컴퓨터 웹 서버의 콘텐츠를 Android 기기에서 볼 수 있습니다.

예를 들어,
사이트가 허용 목록 도메인 `chrome.devtools`에서만 작동하는 타사 자바스크립트 라이브러리를 이용하는 경우를 가정합시다. 개발용 컴퓨터의 
`hosts` 파일에 이 도메인을 `localhost`(즉, `127.0.0.1 chrome.devtools`)에
매핑할 항목을 만듭니다. 사용자설정 
도메인 매핑 및 포트 전달을 설정한 후에 URL `chrome.devtools`에서
Android 기기의 사이트를 볼 수 있습니다. 

### 포트 전달을 프록시 서버로 설정

사용자설정 도메인을 매핑하려면 개발용 컴퓨터에서 프록시 서버를 실행해야
합니다. 프록시 서버의 예로는 [Charles][charles], [Squid][squid]
및 [Fiddler][fiddler] 등이 있습니다.

포트 전달을 프록시로 설정하려면:

1. 프록시 서버를 실행하고 프록시 서버가 사용 중인 포트를 주목합니다. **참고**: 프록시 서버와
웹 서버는 서로 다른 포트에서 실행되어야 합니다.
1. [포트 전달](#port-forwarding)을 Android 기기로 설정합니다. 
   **local address** 필드에 `localhost:`와
   프록시 서버가 실행 중인 포트를 차례로 입력합니다. 예를 들어, 포트 `8000`에서 실행 중인 경우
   `localhost:8000`을 입력합니다. **device port** 필드에
Android 기기가 수신할 번호(예:`3333`)를 입력합니다.

[charles]: http://www.charlesproxy.com/
[squid]: http://www.squid-cache.org/
[fiddler]: http://www.telerik.com/fiddler

### 기기에 프록시 설정 구성

이제 프록시 서버와 통신할 Android 기기를 구성해야
합니다. 

1. Android 기기에서 **Settings** > **Wi-Fi**로 이동합니다.
1. 현재 연결된 네트워크의 이름을 길게 누릅니다.
   **참고**: 프록시 설정은 네트워크별로 적용됩니다.
3. **Modify network**를 누릅니다.
4. **Advanced options**를 누릅니다. 프록시 설정이 표시됩니다.
5. **Proxy** 메뉴를 누르고 **Manual**을 선택합니다.
6. **Proxy hostname** 필드에 `localhost`를 입력합니다.
7. **Proxy port** 필드에 이전 섹션의
   **device port**에 입력한 포트 번호를 입력합니다.
8. **Save**를 누릅니다

이렇게 설정하면 기기가 모든 요청을 개발용 컴퓨터의 프록시로
전달합니다. 프록시가 여러분의 기기를 대신하여 요청하므로
사용자설정 로컬 도메인에 대한 요청이 적절히 처리됩니다.

이제 개발용 컴퓨터에서와 마찬가지로 Android 기기에서 사용자설정 도메인에
액세스할 수 있습니다. 

웹 서버가 비표준 포트로 실행 중인 경우
Android
기기에서 콘텐츠를 요청할 때 포트를 지정해야 합니다. 예를 들어, 웹 서버가 포트 `7331`에서 사용자설정 도메인 
`chrome.devtools`를 사용 중인 경우, Android
기기에서 사이트를 볼 때 URL `chrome.devtools:7331`을 사용해야 합니다. 

**팁**: 일반 탐색을 계속하려면 개발용 컴퓨터와 연결을 끊은 후에 
Android 기기에서 프록시 설정을 되돌려야 합니다.


{# wf_devsite_translation #}
