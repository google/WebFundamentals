project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Option 1

{# wf_updated_on: 2017-02-01 #}
{# wf_published_on: 2016-03-28 #}

# Chrome DevTools {: .page-title }

Chrome DevTools는 Google Chrome에 내장되어있는 웹 저작 및 디버깅 도구셋입니다.
DevTools를 이용하여 사이트를 반복하고, 디버깅하고, 프로파일링할 수 있습니다.

Note: 많은 DevTools 문서는 최신 Chrome 피쳐를 제공하는 [Chrome Canary][canary]를 기반으로 작성했습니다.

[canary]: https://www.google.com/intl/en/chrome/browser/canary.html

## Chrome DevTools 열기 {: #open }

* Chrome 메뉴에서 **도구 더보기** > **개발자 도구** 선택
* 페이지 요소를 오른 클릭하고 검사를 선택
* [키보드 단축키](/web/tools/chrome-devtools/inspect-styles/shortcuts)
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>I</kbd> (Windows)나 <kbd>Cmd</kbd>+<kbd>Opt</kbd>+<kbd>I</kbd> (Mac)를 사용할 수 있습니다.

## DevTools 더 알아보기

### 기기 모드

<img src="images/device-mode.png" alt="Device Mode" class="attempt-right">
완전히 반응하는 모바일 우선 웹 경험을 만드세요.</p>

* [기기 모드](/web/tools/chrome-devtools/device-mode/)
* [반응형 및 기기별 뷰포트 테스트](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)
* [센서 에뮬레이션: Geolocation &amp; Accelerometer](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)

<div style="clear:both;"></div>

### Elements 패널

<img src="images/panels/elements.png" alt="Elements Panel" class="attempt-right">
DOM과 CSS를 자유롭게 조작하여 사이트의 레이아웃과 디자인을 반복하십시오.

* [페이지 검사 및 조정](/web/tools/chrome-devtools/inspect-styles/)
* [스타일 수정](/web/tools/chrome-devtools/inspect-styles/edit-styles)
* [DOM 수정](/web/tools/chrome-devtools/inspect-styles/edit-dom)
* [애니메이션 검사](/web/tools/chrome-devtools/inspect-styles/animations)

<div style="clear:both;"></div>

### Console 패널 

<img src="images/panels/console.png" alt="Console Panel" class="attempt-right">
개발 중 진단 정보를 남기고 페이지의 자바스크립트와 상호작용합니다.

* [Console 사용하기](/web/tools/chrome-devtools/console/)
* [커맨드 라인으로 상호작용하기](/web/tools/chrome-devtools/console/command-line-reference)

<div style="clear:both;"></div>

### Sources 패널 

<img src="images/panels/sources.png" alt="Sources Panel" class="attempt-right">
브레이크 포인트를 사용해 자바스크립트를 디버깅하거나 Workspace를 로컬파일에 연결하여 DevTools를 코드 에디터로 사용하세요.

* [자바스크립트 디버깅 시작하기](/web/tools/chrome-devtools/javascript)
* [브레이크 포인트를 사용한 디버깅](/web/tools/chrome-devtools/javascript/add-breakpoints)
* [DevTools Workspace로 지속성 설정](/web/tools/setup/setup-workflow)
* [모든 페이지에서 코드 스니펫 실행](/web/tools/chrome-devtools/snippets)

<div style="clear:both;"></div>

### Network 패널 

<img src="images/panels/network.png" alt="Network Panel" class="attempt-right">

요청 관련 문제의 디버깅과 페이지 로딩 성능을 최적화하세요.

* [시작하기](/web/tools/chrome-devtools/network-performance/)
* [네트워크 이슈 가이드](/web/tools/chrome-devtools/network-performance/issues)
* [Network 패널 참조](/web/tools/chrome-devtools/network-performance/reference)

<div style="clear:both;"></div>

### Performance 패널 (이전의 Timeline 패널)

Note: Chrome 57부터 Timeline 패널이 Performance 패널로 이름이 바뀌었습니다.

<img src="images/panels/performance.png" alt="Timeline Panel" class="attempt-right">
사이트의 라이프사이클 동안 발생한 다양한 이벤트를 기록하고 탐색하여 페이지의 런타임 성능을 향상합니다.

* [성능 보는 법](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)
* [런타임 성능 분석](/web/tools/chrome-devtools/rendering-tools/)
* [강제 동기 레이아웃 분석](/web/tools/chrome-devtools/rendering-tools/forced-synchronous-layouts)

<div style="clear:both;"></div>

### Memory 패널 (이전의 Profiles 패널)

Note: Chrome 57부터 Profile 패널이 Memory 패널로 이름이 바뀌었습니다.

<img src="images/panels/memory.png" alt="Profiles Panel" class="attempt-right">
메모리 사용 행태를 작성하고, 누수를 탐색합니다.

* [메모리 문제 해결](/web/tools/chrome-devtools/memory-problems/)
* [자바스크립트 CPU 프로파일러](/web/tools/chrome-devtools/rendering-tools/js-execution)

<div style="clear:both;"></div>

### Application 패널 (이전의 Resources 패널)

Note: Chrome 52부터 Resources 패널이 Application 패널로 이름이 바뀌었습니다.

<img src="images/panels/application.png" alt="Application Panel" class="attempt-right">
IndexedDB와 웹 SQL 데이터베이스, 로컬 및 세션 스토리지, 쿠키, 어플리케이션 캐시, 이미지, 폰트, 스타일시트를 포함한 로딩된 모든 리소스를 검사합니다.

* [프로그레시브 웹 앱 디버깅](/web/tools/chrome-devtools/progressive-web-apps)
* [스토리지, 데이터베이스, 캐시 관리 및 검사](/web/tools/chrome-devtools/manage-data/local-storage)
* [쿠키 삭제 및 검사](/web/tools/chrome-devtools/manage-data/cookies)
* [리소스 검사](/web/tools/chrome-devtools/manage-data/page-resources)

<div style="clear:both;"></div>

### Security 패널 

<img src="images/panels/security.png" alt="Security Panel" class="attempt-right">
Mixed content 이슈, 인증서 문제 등을 디버깅합니다.

* [보안 이슈 이해하기](/web/tools/chrome-devtools/security)

<div style="clear:both;"></div>

## 참여하기 

DevTools(나 이 문서)에 대한 피드백이나 질문은 아래 채널들에서 할 수 있습니다.

<a class="button button-white gc-analytics-event"
   data-category="DevTools" data-label="Home / Twitter"
   href="https://twitter.com/ChromeDevTools">Twitter</a>

<a class="button button-white gc-analytics-event"
   href="https://groups.google.com/forum/#!topic/google-chrome-developer-tools"
   data-category="DevTools" data-label="Home / Mailing List">Mailing List</a>

<a class="button button-white gc-analytics-event"
   href="https://stackoverflow.com/questions/tagged/google-chrome-devtools"
   data-category="DevTools" data-label="Home / Stack Overflow">
  Stack Overflow
</a>

<a class="button button-white gc-analytics-event"
   href="https://chromiumdev.slack.com/messages/devtools/"
   data-category="DevTools" data-label="Home / Slack">Slack</a>

<a class="button button-white gc-analytics-event"
   href="https://github.com/google/webfundamentals/issues/new"
   data-category="DevTools" data-label="Home / GitHub">GitHub</a>
