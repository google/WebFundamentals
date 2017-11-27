project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 다중 기기 사이트를 처음부터 다시 빌드합니다. 빌드 프로세스 도구 집합을 사용하여 개발 속도를 높이고 빠르게 로드하는 사이트를 만드는 방법에 대해 알아봅니다.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2014-09-24 #}

# 빌드 도구 설정 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
다중 기기 사이트를 처음부터 다시 빌드합니다. 빌드 프로세스 도구 집합을 사용하여 개발 속도를 높이고 빠르게 로드하는 사이트를 만드는 방법에 대해 알아봅니다. 모든 사이트에는 개발 버전과 프로덕션 버전이 있어야 합니다.<br /><br />개발 버전에는 멋진 사이트를 완벽하게 구성하는 모든 HTML, CSS, JS 및 이미지 파일이 있습니다.<br /><br />프로덕션 버전에서는 이러한 파일을 가져와서 간소화 및 연결/병합하고 이미지와 같은 파일을 최적화합니다.

웹 개발자는 한 번에 100만 개를 고려해야 하며 빌드 단계는
가장 중요하지만 시작하기가 가장 성가신 단계입니다.  이미지
압축, CSS 최소화, 자바스크립트 연결, 응답
테스트, 단위 테스트 등
자동화에 필요한 모든 작업을 수행해야 합니다.

이 가이드에서는 작성하는 사이트가 처음부터 모든 모범 사례를
따르도록 워크플로를 구성하는 가장 좋은 방법에
대해서 알아봅니다.


### TL;DR {: .hide-from-toc }
- 빌드 프로세스 도구는 성능을 위해 최적화해야 합니다. 자바스크립트, CSS, HTML 및 이미지를 자동으로 최소화하고 연결해야 합니다.
- LiveReload와 같은 도구를 사용하여 개발 프로세스를 훨씬 원활하게 수행할 수 있습니다.


코딩을 시작하기 전에 사이트의 프로덕션 버전을 최적화 및
빌드하는 방법을 고려해야 합니다. 이 워크플로를 처음부터 설정하면
프로젝트가 끝날 때 불쾌한 일이 발생하는 것을 예방하고,
단조로운 작업을 대신 수행하고 개발 속도를 높이는 도구를 워크플로에
추가할 수 있습니다.

## 빌드 프로세스란?

빌드 프로세스는 프로젝트 파일을 실행하고 개발 중에
코드를 컴파일 및 테스트하며 사이트의 배포 버전을 만드는 데 사용되는
일련의 작업입니다.  빌드 프로세스는 개발 워크플로가 끝날 때 실행하는
일련의 작업이 아닙니다.

빌드 프로세스를 구현하는 데 가장 많이 사용되는 도구는
명령줄 도구에 해당하는 [Gulp](http://gulpjs.com/){: .external } 및
[Grunt](http://gruntjs.com/)입니다. 이 둘을 사용해 본 경험이 없는 경우 Gulp를 사용해 보세요.
우리처럼 Gulp를 [Web Starter Kit](/web/tools/starter-kit/)용으로
사용하도록 권장합니다.

다음은 GUI가 있고 이해하기가 훨씬 쉽지만 유연성이
떨어지는 도구입니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">지원되는 플랫폼 및 도구 이름</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://alphapixels.com/prepros/">Prepros</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="https://incident57.com/codekit/">CodeKit</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="http://hammerformac.com/">HammerForMac</a></td>
    </tr>
  </tbody>
</table>


## 빌드 프로세스에 수행해야 하는 작업은?

다음 절에서는 빌드 프로세스에서 수행해야 할
가장 일반적인 작업을 살펴보고 Grunt 및 Gulp 작업을 권장합니다.

빌드 프로세스를 잘 모를 경우에는 해당 작업이 어려울 수 있으며
각 항목을 원하는 방식으로 설정하는 데 많은 시행착오를 겪게 됩니다.

빌드 프로세스의 좋은 예로, Web Starter Kit 사용 방법을 안내하고 Gulp 파일의 각 명령이
수행하는 작업을 설명하는
[Web Starter Kit의 시작 가이드](/web/fundamentals/getting-started/web-starter-kit/)를
참조하세요. 빠르게 준비하는 방법으로 사용할 수 있으며
그 다음에 필요한 경우 변경할 수 있습니다.

Gulp 또는 Grunt에 대해 잘 모르는 상태에서 고유한
빌드 프로세스를 만들려면 빠른 시작 가이드를 참조하여 첫 번째 빌드 프로세스를
설치하고 실행하는 것이 가장 좋습니다.

* [Grunt 시작하기](http://gruntjs.com/getting-started)
* [Gulp
 시작하기](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)

### 사이트 속도를 높이기 위해 연결 및 최소화 사용

먼저 연결(concatenation) 및 최소화(minification)라는 용어에 대해 알아봅시다. 연결은
여러 파일을 하나로 병합하는 것, 즉 여러 파일을
복사하여 하나의 파일에 붙여넣는 것을 의미합니다. 이렇게 하는 이유는 브라우저가 하나의
파일을 가져오는 것이 다수의 작은 파일을 가져오는 것보다 훨씬 효율적이기 때문입니다.

최소화는 코드 작동 방식을 변경하지 않고 파일을 가져와서
전체 문자 수를 줄이는 과정입니다. 예를 들어 주석을 제거하거나
긴 변수 이름을 작게 만드는 과정이 이에 해당합니다. 이렇게 하면
파일 크기가 작아져서 다운로드 속도가 빨라집니다.

최소화를 위해 다음을 사용합니다.

<table>
  <thead>
    <tr>
      <th data-th="Type of File">파일 형식</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS</td>
      <td data-th="Gulp"><a href="https://github.com/ben-eb/gulp-csso">gulp-csso</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-cssmin">grunt-contrib-cssmin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/terinjokes/gulp-uglify/">gulp-uglify</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-uglify">grunt-contrib-uglify</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">HTML</td>
      <td data-th="Gulp"><a href="https://www.npmjs.com/package/gulp-minify-html">gulp-minify-html</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-htmlmin">grunt-contrib-htmlmin</a></td>
    </tr>
  </tbody>
</table>

연결을 위해 다음을 사용합니다.

<table>
  <thead>
    <tr>
      <th data-th="Type of File">파일 형식</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS (Sass)</td>
      <td data-th="Gulp"><a href="https://github.com/dlmanning/gulp-sass">gulp-sass</a> 또는 <a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-sass">grunt-contrib-sass</a> 또는 <a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a> 또는 <a href="https://github.com/fatso83/grunt-codekit">grunt-codekit</a></td>
    </tr>
  </tbody>
</table>

**참고**: Sass는 '가져오기' 기능을 통해 사용할 수 있습니다([예시는 Web Starter
Kit 참조](https://github.com/google/web-starter-kit/blob/master/app/styles/main.scss)).

### 이미지 최적화

이미지 최적화는 사이트 속도를 높일 수 있는 중요한 단계입니다.
품질을 손상하지 않고 이미지를 작게 만들 수 있습니다. 메타데이터는
브라우저에서 이미지를 표시할 필요가 없으므로 이미지에서
삭제됩니다(예: 사진을 촬영한 카메라에 대한 정보).

이미지를 최적화하기 위해 다음 모듈을 사용할 수 있습니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp와 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-imagemin">gulp-imagemin</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-imagemin">grunt-contrib-imagemin</a></td>
    </tr>
  </tbody>
</table>

### 공급업체 프리픽스 사용 안 함

사용하는 CSS에 대한 모든 공급업체 프리픽스를 포함하는 것은 약간 장황할 수
있습니다. auto-prefixer를 사용하여 포함할 프리픽스를 자동으로 추가할 수
있습니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp와 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-autoprefixer">gulp-autoprefixer</a></td>
      <td data-th="Grunt"><a href="https://github.com/nDmitry/grunt-autoprefixer">grunt-autoprefixer</a></td>
    </tr>
  </tbody>
</table>

**참고**  
원하는 경우 [Sublime 패키지를 추가하여 자동 프리픽싱을 수행할 수
있습니다](/web/tools/setup/setup-editor#autoprefixer).

### 텍스트 편집기에서 실시간 새로고침 사용 안 함

실시간 새로고침은 변경이 있을 때마다 브라우저에서 사이트를 업데이트합니다.
해당 기능의 사용을 중단하면 상당히 불편할 것입니다.

Web Starter Kit는 실시간 새로고침을 지원하기 위해 browser-sync를 사용합니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp와 Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="http://www.browsersync.io/docs/gulp/">browser-sync</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-connect">grunt-contrib-connect</a> 및 <a href="https://github.com/gruntjs/grunt-contrib-watch">grunt-contrib-watch</a></td>
    </tr>
  </tbody>
</table>

참고: 실시간 새로고침은 원하지만 빌드 프로세스는 원하지 않는 경우 [Addy Osmani가 HTML5Rocks에 게시한 글](http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/)을 참조하며 다양한 대안(무료 및 유료)을 검토하세요.


{# wf_devsite_translation #}
