project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: CSS 및 JS 전처리기를 설정하여 더욱 효율적으로 코드를 작성하는 방법을 알아봅니다.

{# wf_updated_on: 2015-08-03 #}
{# wf_published_on: 2015-08-03 #}

# CSS 및 JS 전처리기 설정 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Saas와 같은 CSS 전처리기와 JS 전처리기 및 트랜스파일러(transpiler)는 올바르게 사용하기만 하면 개발 속도를 대폭 높일 수 있는 도구입니다. 설정 방법을 알아봅시다.


### TL;DR {: .hide-from-toc }
- 전처리기를 사용하면 브라우저에서 기본적으로 지원하지 않는 CSS 및 자바스크립트 기능(예: CSS 변수)을 사용할 수 있습니다.
- 전처리기를 사용하면 소스 맵을 사용하여 원본 소스 파일을 렌더링된 출력으로 매핑할 수 있습니다.
- 웹 서버가 소스 맵을 제공할 수 있어야 합니다.
- 지원되는 전처리기를 사용하여 자동으로 소스 맵을 생성합니다.


## 전처리기란?

전처리기는 임의의 소스 파일을 가져와서 브라우저가 이해할 수 있는 것으로 변환시켜주는 도구입니다. 

CSS를 출력으로 사용하며, (아직) 존재하지 않는 기능을 추가하는 데 사용됩니다. 즉 CSS 변수, 중첩 등이 대표적이며 이외에도 많은 가능성이 있습니다. 이 범주에서 특히 눈에 띄는 예로 [Saas](http://sass-lang.com/), [Less](http://lesscss.org/){: .external } 및 [Stylus](https://learnboost.github.io/stylus/) 등이 있습니다.

자바스크립트가 출력되는 경우, 이는 완전히 다른 언어로부터 변환(컴파일)하거나 언어 상위 집합 또는 새로운 언어 기준을 오늘날의 기준에 맞춰 변환(트랜스파일)해주는 역할을 합니다. 이 범주에서 특히 눈에 띄는 예는 [CoffeeScript](http://coffeescript.org/){: .external }와 ES6([Babel](https://babeljs.io/) 사용) 등입니다.

## 전처리된 콘텐츠 디버그 및 편집

브라우저에 들어와 DevTools를 사용하여 [CSS를 편집](/web/tools/chrome-devtools/inspect-styles/edit-styles)하거나 자바스크립트를 디버그하기 시작하면 곧바로 한 가지 문제가 매우 명확해집니다. 바로 개발자의 눈에 보이는 것이 소스를 제대로 반영하지 않으며, 문제를 해결하는 데에도 별 도움이 되지 않는다는 사실입니다.

이를 해결하기 위해 대부분의 최신 전처리기는 일명 <b>소스 맵</b>이라고 불리는 기능을 지원합니다.

### 소스 맵이란?

소스 맵이란 일종의 JSON 기반 매핑 형식으로, 축소된 파일과 그 소스 사이의 관계를 만들어주는 역할을 합니다. 프로덕션용으로 빌드하면 자바스크립트 파일을 축소하고 조합하는 작업 외에도 원본 파일에 대한 정보를 담은 소스 맵을 만들게 됩니다.

### 소스 맵의 작동 원리

CSS 전처리기는 CSS 파일을 만들 때마다 컴파일된 CSS에 더하여 소스 맵 파일(.map)도 생성합니다. 이 소스 맵 파일은 JSON 파일로 각각의 생성된 CSS 선언과 소스 파일에서 해당 줄 사이의 매핑을 정의합니다.

각 CSS 파일에는 자신의 소스 맵 파일을 지정하는 주석이 포함되어 있고, 이는 파일의 마지막 줄에 달린 특별 주석(special comment)에 포함됩니다.

    /*# sourceMappingURL=<url> */

예를 들어 일명 **styles.scss**라고 하는 Saas 소스 파일이 있다고 가정해 봅시다.

    %$textSize: 26px;
    $fontColor: red;
    $bgColor: whitesmoke;
    h2 {
        font-size: $textSize;
        color: $fontColor;
        background: $bgColor;
    }

Sass가 **styles.css**라는 CSS 파일을 만들고, 여기에 sourceMappingURL 주석이 지정됩니다.

    h2 {
      font-size: 26px;
      color: red;
      background-color: whitesmoke;
    }
    /*# sourceMappingURL=styles.css.map */

아래는 소스 맵 파일의 예시입니다.

    {
      "version": "3",
      "mappings":"AAKA,EAAG;EACC,SAAS,EANF,IAAI;EAOX,KAAK"
      "sources": ["sass/styles.scss"],
      "file": "styles.css"
    }

## 웹 서버가 소스 맵을 제공할 수 있는지 확인

Google App Engine과 같은 일부 웹 서버의 경우 제공되는 각 파일 유형에 맞는 분명한 구성이 필요합니다. 이 경우, 소스 맵을 `application/json`의 MIME 유형으로 제공하는 것이 좋지만 Chrome은 사실 [모든 콘텐츠 유형을 용인](https://stackoverflow.com/questions/19911929/what-mime-type-should-i-use-for-source-map-files)합니다. 예를 들어 `application/octet-stream`도 괜찮습니다.

### 보너스: 사용자설정 헤더를 통한 소스 매핑 

파일에 추가 주석을 덧붙이고 싶지 않다면, 축소된 자바스크립트 파일에 있는 HTTP 헤더 필드를 사용하여 DevTools에 소스 맵을 찾을 수 있는 위치를 알려주면 됩니다. 이렇게 하려면 웹 서버를 구성하거나 사용자설정해야 하며 이 내용은 본문에서 다루는 범위를 벗어납니다.

    X-SourceMap: /path/to/file.js.map

이렇게 하면 주석을 추가한 것과 마찬가지로 DevTools 및 다른 도구에게 자바스크립트 파일과 연관된 소스 맵을 찾으려면 어디를 찾아야 하는지 알려줍니다. 이 헤더는 한 줄 주석을 지원하지 않는 언어에서 소스 맵을 참조하는 문제도 해결할 수 있게 해줍니다.

## 지원되는 전처리기

Coffeescript, TypeScript, JSX 등을 비롯하여 자바스크립트 언어로 컴파일된 것은 거의 무엇이든 소스 맵을 생성하는 옵션을 제공합니다. 또한 노드 내 서버측에서 소스 맵을 사용할 수도 있습니다. Google의 CSS에는 Sass, Less 및 More 등을 통해 browserify 기능을 사용할 수 있는데, 이렇게 하면 노드 스타일에 필요한 기능을 제공하고 uglify-js와 같은 최소화 도구를 사용하여 다단계 소스 맵을 생성하는 깔끔한 기능도 추가해줍니다.

### 자바스크립트

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">컴파일러</th>
      <th width="40%" data-th="Command">명령어</th>
      <th data-th="Instructions">안내</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://coffeescript.org/#source-maps">CoffeeScript</a></td>
      <td data-th="Command"><code>$ coffee -c square.coffee -m</code></td>
      <td data-th="Instructions">컴파일러에서 소스 맵을 출력하려면 m(--map) 플래그만 있으면 됩니다. 이렇게 하면 sourceMapURL comment pragma를 출력된 파일에 추가하는 작업도 처리해줍니다.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://www.typescriptlang.org/">TypeScript</a></td>
      <td data-th="Command"><code>$ tsc -sourcemap square.ts</code></td>
      <td data-th="Instructions">-sourcemap 플래그는 맵을 생성하고 comment pragma를 추가합니다.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/google/traceur-compiler/wiki/SourceMaps">Traceur</a></td>
      <td data-th="Command"><code>$ traceur --source-maps=[file|inline]</code></td>
      <td data-th="Instructions"> <code>--source-maps=file</code>을 사용하면  <code>.js</code>로 끝나는 모든 출력 파일에  <code>.map</code>으로 끝나는 소스 맵 파일이 생성되고  <code>source-maps='inline'</code>을 사용하면  <code>.js</code>로 끝나는 모든 출력 파일이  <code>data:</code> URL로 인코딩된 소스 맵을 포함하는 주석으로 끝나게 됩니다.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://babeljs.io/docs/usage/cli/#compile-with-source-maps">Babel</a></td>
      <td data-th="Command"><code>$ babel script.js --out-file script-compiled.js --source-maps</code></td>
      <td data-th="Instructions">--source-maps 또는 -s를 사용하여 소스 맵을 생성합니다. 인라인 소스 맵의 경우  <code>--source-maps inline</code>을 사용합니다.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/mishoo/UglifyJS2">UglifyJS</a></td>
      <td data-th="Command"><code>$ uglifyjs file.js -o file.min.js --source-map file.min.js.map</code></td>
      <td data-th="Instructions">이는 'file.js'의 소스 맵을 만드는 데 필요한 매우 기본적인 명령입니다. 이 명령은 출력 파일에 comment pragma도 추가합니다.</td>
    </tr>
  </tbody>
</table>

### CSS

<table>
  <thead>
    <tr>
      <th width="20%" data-th="Compiler">컴파일러</th>
      <th width="40%" data-th="Command">명령어</th>
      <th data-th="Instructions">안내</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Compiler"><a href="http://sass-lang.com">Sass</a></td>
      <td data-th="Command"><code>$ scss --sourcemap styles.scss styles.css</code></td>
      <td data-th="Instructions">Sass에서 소스 맵은 Sass 3.3 이후부터 지원됩니다.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://lesscss.org/">Less</a></td>
      <td data-th="Command"><code>$ lessc styles.less > styles.css --source-map styles.css.map</code></td>
      <td data-th="Instructions">1.5.0 버전에서 구현되었습니다. 자세한 내용과 사용 패턴은 <a href="https://github.com/less/less.js/issues/1050#issuecomment-25566463">issue #1050</a>을 참조하세요.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://learnboost.github.io/stylus/">Stylus</a></td>
      <td data-th="Command"><code>$ stylus --sourcemaps styles.style styles.css</code></td>
      <td data-th="Instructions">이 명령은 소스 맵을 출력 파일에 직접 base64로 인코딩된 문자열 형식으로 삽입합니다.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="http://compass-style.org/">Compass</a></td>
      <td data-th="Command"><code>$ sass --compass --sourcemap --watch scss:css</code></td>
      <td data-th="Instructions">또는 config.rb 파일에 `sourcemap: true`를 추가할 수도 있습니다.</td>
    </tr>
    <tr>
      <td data-th="Compiler"><a href="https://github.com/postcss/autoprefixer">Autoprefixer</a></td>
      <td data-th="Command"><code></code></td>
      <td data-th="Instructions">링크를 따라가면 이를 사용하는 방법과 입력 소스 맵을 포함하는 방법을 확인할 수 있습니다.</td>
    </tr>
  </tbody>
</table>

## 소스 맵과 DevTools

이제 소스 맵이 올바로 설정되었으며, DevTools가 CSS 및 JS 기반 소스 맵을 기본적으로 지원한다는 사실을 알고 반가울 것입니다.

### 전처리된 CSS 편집

DevTools 내에서 직접 소스 맵으로 연결된 스타일을 편집하고 새로 고치는 방법에 대해 자세히 알아보려면 [Sass, Less 또는 Stylus 편집](/web/tools/chrome-devtools/inspect-styles/edit-styles)을 참조하세요.

### 전처리된 자바스크립트 편집 및 디버그

Sources 패널에서 최소화, 컴파일 또는 트랜스파일된 자바스크립트를 디버그하는 방법을 자세히 알아보려면 [전처리된 코드를 소스 코드에 매핑](/web/tools/chrome-devtools/debug/readability/source-maps)을 참조하세요.


{# wf_devsite_translation #}
