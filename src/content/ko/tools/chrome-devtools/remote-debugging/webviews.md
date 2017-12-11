project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome 개발자 도구를 사용하여 네이티브 Android 앱에서 WebView를 디버그합니다.

{# wf_updated_on: 2015-07-29 #}
{# wf_published_on: 2015-04-13 #}

# WebView 원격 디버깅 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Chrome 개발자 도구를 사용하여 네이티브 Android 앱에서 WebView를 디버그합니다.

Android 4.4 (KitKat) 이상에서
DevTools를 사용하여 네이티브 Android 애플리케이션에서 WebView 콘텐츠를 디버그합니다.


### TL;DR {: .hide-from-toc }
- 네이티브 Android 앱에서 WebView 디버깅을 활성화합니다. Chrome DevTools에서 WebView를 디버그합니다.
- <strong>chrome://inspect</strong>를 통해 디버그 지원 WebView 목록에 액세스합니다.
- WebView 디버깅은 <a href='/web/tools/chrome-devtools/debug/remote-debugging'>원격 디버깅</a>을 통한 웹 페이지 디버깅과 동일합니다.


## 디버깅용 WebView 구성

애플리케이션 내에서 WebView 디버깅이 활성화되어 있어야 합니다. WebView 디버깅을 활성화하려면 WebView 클래스에서 정적 메서드 [setWebContentsDebuggingEnabled](https://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean))를 호출합니다.


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true);
    }
    

이 설정은 애플리케이션의 모든 WebView에 적용됩니다.

**팁**: WebView 디버깅은 애플리케이션 매니페스트의 `debuggable` 플래그 상태에 영향을 받지 **않습니다**. `debuggable`이 `true`인 경우에만 WebView 디버깅을 활성화하려면 런타임에 플래그를 테스트합니다.


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE))
        { WebView.setWebContentsDebuggingEnabled(true); }
    }
    

## DevTools에서 WebView 열기

**chrome://inspect** 페이지는 기기에 디버그 지원 WebView 목록을 표시합니다.

디버깅을 시작하려면 디버그하려는 WebView 아래에서 **inspect**를 클릭합니다. 원격 브라우저 탭에서와 마찬가지로 DevTools를 사용합니다.

![WebView에서 요소 검사](imgs/webview-debugging.png)

WebView와 함께 나열된 회색 그래픽은 기기 화면에 상대적인 크기와 위치를 나타냅니다. WebView가 제목을 설정한 경우 해당 제목도 나열됩니다.

## 문제 해결

**chrome://inspect 페이지**에서 WebView를 볼 수 없나요?

* 앱에 대해 WebView 디버깅이 활성화되었는지 확인하세요.
* 기기에서 WebView를 사용하여 디버그할 앱을 엽니다. 그런 다음 **chrome://inspect** 페이지를 새로 고칩니다.


{# wf_devsite_translation #}
