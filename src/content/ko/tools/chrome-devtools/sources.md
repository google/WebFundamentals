project_path: /web/tools/chrome-devtools/_project.yaml
book_path: /web/tools/chrome-devtools/_book.yaml
description: Chrome DevTools의 Sources 패널에서 파일 보기 및 편집, 스니펫 만들기, 자바스크립트 디버깅 및 작업공간 설정 등을 수행합니다.

{# wf_blink_components: Platform>DevTools #}
{# wf_updated_on: 2020-07-10 #}
{# wf_published_on: 2018-01-09 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Sources 패널 개요 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome DevTools의 **Sources** 패널을 사용하여 다음을 수행합니다.

* [파일 보기](#files).
* [CSS 및 자바스크립트 편집](#edit).
* 모든 페이지에서 실행할 수 있는 [자바스크립트의 **스니펫** 생성 및 저장](#snippets)
  **스니펫**은 북마크릿과 비슷합니다.
* [자바스크립트 디버깅](#debug).
* [작업공간 설정](#workspace). 이를 통해 DevTools에서 변경한 사항을 파일 시스템에
  저장합니다.

## 파일 보기 {: #files }

**Network** 패널을 사용해 페이지가 로드한 모든 리소스를 봅니다.

<figure>
  <img src="images/sources-network-pane.png"
       alt="Network 창"/>
  <figcaption>
    <b>그림 1</b>. <b>Network</b> 창
  </figcaption>
</figure>

**Network** 창은 다음과 같이 정렬되어 있습니다.

* <b>그림 1</b>의 `top`과 같은 최상위는 [HTML 프레임][frame]을 나타냅니다.
  방문한 모든 페이지에서 `top`을 찾을 수 있습니다. `top`은 기본 문서
  프레임을 나타냅니다.
* <b>그림 1</b>의 `developers.google.com`과 같은 차상위는
 [출발지][origin]를 나타냅니다.
* 그 다음 세 번째, 네 번째 등은 출발지에서 로드된
  디렉토리 및 리소스를 나타냅니다. 예를 들어, <b>그림 1</b>에서
  `devsite-googler-button` 리소스의 전체 경로는
  `developers.google.com/_static/f6e16de9fa/css/devsite-googler-button`입니다.

[frame]: https://www.w3.org/TR/html401/present/frames.html
[origin]: https://www.w3.org/TR/2011/WD-html5-20110525/origin-0.html

**Network** 창의 파일을 클릭하여 **Editor** 창에서 콘텐츠를 봅니다. 모든 파일 유형을
볼 수 있습니다. 이미지의 경우, 미리보기를 볼 수 있습니다.

<figure>
  <img src="images/sources-editor-pane.png"
       alt="Editor 창에서 파일 보기"/>
  <figcaption>
    <b>그림 2</b>. <b>Editor</b> 창에서 <code>jquery-bundle.js</code>의
    콘텐츠 보기
  </figcaption>
</figure>

## CSS 및 자바스크립트 편집 {: #edit }

**Editor** 창을 사용하여 CSS 및 자바스크립트를 편집합니다.  DevTools는
페이지를 업데이트하여 새로운 코드를 실행합니다. 예를 들어, 요소의 `background-color`를 편집하면 즉시 변경이 적용된 것을 볼 수
있습니다.

<figure>
  <img src="images/edit-css.gif"
       alt="Editor 창에서 CSS 편집"/>
  <figcaption>
    <b>그림 3</b>. <b>Editor</b> 창에서
    CSS를 편집하여 요소의 배경 색상을 파란색에서 빨간색으로 변경
  </figcaption>
</figure>

CSS 변경 사항은 즉시 적용되며 저장이 필요하지 않습니다. 자바스크립트의 변경 사항을 적용하려면
<kbd>Cmmd</kbd>+<kbd>S</kbd>(Mac)를 누르거나 <kbd>Ctrl</kbd>+<kbd>S</kbd>(Windows, Linux)를 누릅니다.
DevTools는 스크립트를 재실행하지 않으므로 적용되는 자바스크립트 변경 사항은 함수 내의 변경만이
해당됩니다. 예를 들어, <b>그림 4</b>에서 `console.log('A')`는 실행되지
않는 반면 `console.log('B')`는 실행됩니다. DevTools가 변경 후 전체 스크립트를
재실행하면 텍스트 `A`가 **Console**에 로깅되었을 것입니다.

<figure>
  <img src="images/edit-js.gif"
       alt="Editor 창에서 자바스크립트 편집하기"/>
  <figcaption>
    <b>그림 5</b>. <b>Editor</b> 창에서 자바스크립트 편집하기
  </figcaption>
</figure>

DevTools는 페이지를 새로고침하면 CSS와 자바스크립트 변경 사항을 삭제합니다. 
[작업공간 설정](#workspace)을 참조하여 변경 사항을 파일
시스템에 저장하는 방법을 알아보세요.

## 스니펫 생성, 저장, 실행 {: #snippets }

스니펫은 어떤 페이지에서나 실행할 수 있는 스크립트입니다. jQuery 라이브러리를 페이지에
삽입하여 jQuery 명령을 **Console**에서 실행하기 위해 다음 코드를 반복적으로 **Console**에 입력한다고
상상해 보세요.

    let script = document.createElement('script');
    script.src = 'https://code.jquery.com/jquery-3.2.1.min.js';
    script.crossOrigin = 'anonymous';
    script.integrity = 'sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=';
    document.head.appendChild(script);

그 대신 이 코드를 **스니펫**에 저장하여 필요할 때마다
버튼을 몇 번 클릭하는 것만으로 실행할 수 있습니다. DevTools는 **스니펫**을 파일 시스템에 저장합니다.

<figure>
  <img src="images/snippet.png"
       alt="jQuery 라이브러리를 페이지에 삽입하는 스니펫"/>
  <figcaption>
    <b>그림 6</b>. jQuery 라이브러리를 페이지에 삽입하는 <b>스니펫</b>
  </figcaption>
</figure>

**스니펫**을 실행하려면 다음을 수행합니다.

* **Snippets** 창으로 파일을 연 다음 **Run** ![실행 버튼][run]을 클릭합니다{:.cdt-inl}.
* [**Command Menu**][CM]를 열고 `>` 문자를 삭제한 다음 `!`와
  **Snippet**의 이름을 입력하고 <kbd>Enter</kbd>를 누릅니다.

[CM]: /web/tools/chrome-devtools/ui#command-menu
[run]: images/run-snippet.png

[모든 페이지에서 스니펫 실행][snip]을 참조하여 자세히 알아보세요.

[snip]: /web/tools/chrome-devtools/snippets

## 자바스크립트 디버깅 {: #debug }

자바스크립트에 문제가 생긴 곳을 찾기 위해 `console.log()`을 사용하기 보다,
Chrome DevTools 디버깅 도구를 사용하는 것을 고려해 보세요. 기본 개념은 코드의 의도적인 중단 지점인
중단점을 설정한 다음 코드 실행을
한 번에 한 줄씩 단계별로 살펴보는 것입니다. 코드를 단계별로 살펴보면서 모든
현재 정의된 속성과 변수의 값을 보고 변경할 수 있으며, 자바스크립트를 **Console**에서 실행하는 등의 작업을 할 수 있습니다.

[자바스크립트 디버깅 시작하기](/web/tools/chrome-devtools/javascript/)를 참조하여 DevTools의 디버깅 기본을 자세히
알아보세요.

<figure>
  <img src="images/debugging.png"
       alt="자바스크립트 디버깅"/>
  <figcaption>
    <b>그림 7</b>. 자바스크립트 디버깅
  </figcaption>
</figure>

## 작업공간 설정하기 {: #workspace }

기본적으로 **Source** 패널에서 파일을 편집하면 이러한 변경 사항은
페이지를 새로 고치면 사라집니다. **Workspaces**를 이용하여 DevTools에서 변경한 사항을
파일 시스템에 저장할 수 있습니다. 이 기능 덕분에 DevTools을 코드 편집기로 사용할 수 있습니다.

[DevTools 작업공간을 사용하여 지속성 설정][WS]을 참조하여 시작해 보세요.

[WS]: /web/tools/chrome-devtools/workspaces/

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
