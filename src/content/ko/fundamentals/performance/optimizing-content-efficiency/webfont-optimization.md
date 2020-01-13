project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 입력 체계는 좋은 디자인, 브랜딩, 가독성 및 접근성에 있어 기본적인 요소입니다. 웹폰트를 사용하면 위의 모든 기능과 그 이상의 것들을 구현할 수 있습니다. 텍스트는 선택, 검색 및 확대/축소가 가능하고 높은 DPI에서도 잘 작동하며 화면 크기 및 해상도에 상관없이 일관되고 선명한 텍스트 렌더링을 제공합니다.

{# wf_updated_on: 2019-02-06 #}
{# wf_published_on: 2014-09-19 #}
{# wf_blink_components: Blink>CSS #}

# 웹폰트 최적화 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

입력 체계는 좋은 디자인, 브랜딩, 가독성 및 접근성에 있어 기본적인 요소입니다. 웹폰트를 사용하면
위의 모든 기능과 그 이상의 것들을 구현할 수 있습니다.
텍스트는 선택, 검색 및 확대/축소가 가능하고 높은 DPI에서도 잘 작동하며 화면 크기 및 해상도에 상관없이 일관되고 선명한 텍스트 렌더링을 제공합니다. 웹폰트는
좋은 디자인, UX 및 성능을 실현하는 데 중요합니다.

웹폰트 최적화는 전반적인 성능 전략에 중요한 부분입니다. 각 글꼴은
추가 리소스이며, 일부 글꼴은 텍스트 렌더링을 차단할 수 있지만 페이지가
웹폰트를 사용하는 것만으로 렌더링 속도가 느려진다고는 볼 수 없습니다. 반대로, 글꼴이 페이지에 로드되고 적용되는 방법에 대한
적절한 전략과 함께 최적화된 글꼴을 사용하면 총
페이지 크기를 줄이고 페이지 렌더링 시간을 향상시키는 데 도움이 될 수 있습니다.


## 웹폰트에 대한 분석

### 짧은 요약 {: .hide-from-toc }
* 유니코드 글꼴은 수천 개의 글리프를 포함할 수 있습니다.
* 글꼴에는 네 가지 형식, 즉 WOFF2, WOFF, EOT 및 TTF가 있습니다.
* 일부 글꼴 형식은 GZIP 압축을 사용해야 합니다.


*웹폰트*는 글리프로 구성된 모음이며, 각 글리프는 문자나
기호를 설명하는 벡터 모양입니다. 그 결과, 두 가지 단순한 변수가 특정 글꼴 파일의 크기를 결정합니다. 이 두 변수는 각 글리프의 벡터 경로에 대한
복잡성과 특정 글꼴에 포함된 글리프 수입니다. 예를
들어, 가장 인기 있는 웹폰트 중 하나인 Open Sans에는
라틴어, 그리스어 및 키릴어 문자를 포함하는 897개의 글리프가 들어 있습니다.

<img src="images/glyphs.png"  alt="글꼴 글리프 표">

특정 글꼴을 선택할 때에는 어떤 문자 집합이 지원되는지를 고려해야 합니다. 페이지 콘텐츠를 여러 언어로
현지화해야 할 경우 사용자에게 일관된 모양과 환경을
제공할 수 있는 글꼴을 선택해야 합니다. 예를 들어, [Google의 Noto
글꼴 모음](https://www.google.com/get/noto/){: .external }은 전 세계 모든 언어를 지원하는 것을 목표로 합니다.
하지만, 모든 언어가 포함된 Noto의 총 크기는 1.1GB 이상의 ZIP 다운로드를
생성한다는 사실에 유의해야 합니다.

분명한 점은, 웹에 글꼴을 사용하려면 서체가 성능을 방해하지 않도록
세심한 엔지니어링이 필요하다는 것입니다. 고맙게도, 웹 플랫폼은 필요한 모든 원시 유형을 제공합니다. 이 가이드의
나머지 부분에서는 이 두 개념을 가장 잘 활용하는 방법을 다루는 실습을 제공합니다.

### 웹폰트 형식

오늘날, 웹에서는 네 가지 글꼴 컨테이너 형식인
[EOT](https://en.wikipedia.org/wiki/Embedded_OpenType),
[TTF](https://en.wikipedia.org/wiki/TrueType),
[WOFF](https://en.wikipedia.org/wiki/Web_Open_Font_Format),
[WOFF2](https://www.w3.org/TR/WOFF2/){: .external }가 사용됩니다. 안타깝게도, 광범위한 옵션이
있음에도 불구하고 이전 브라우저와 최신 브라우저 모두에서 작동하는 단일 범용 형식은 없습니다. EOT는
[IE 전용](http://caniuse.com/#feat=eot)이고, TTF에는 [부분적인 IE
지원 기능](http://caniuse.com/#search=ttf)이 포함되어 있으며, WOFF는 지원 범위가 가장 넓지만 [몇몇
이전 브라우저에서는 사용할 수 없습니다](http://caniuse.com/#feat=woff). 또한, WOFF 2.0 지원은 [많은 브라우저에서
현재 진행 중입니다](http://caniuse.com/#feat=woff2).

그렇다면, 우리에게 남는 건 뭔가요? 모든 브라우저에서 작동하는 단일한 형식은 없습니다. 이는 일관된 환경을 제공하려면
여러 형식을 제공해야 함을 의미합니다.

* WOFF 2.0 버전을 지원하는 브라우저에 이 글꼴을 제공합니다.
* 대부분의 브라우저에 WOFF 버전을 제공합니다.
* 이전 버전의 Android(4.4 이전) 브라우저에 TTF를 제공합니다.
* 이전 버전의 IE(IE9 이전) 브라우저에 EOT 버전을 제공합니다.

참고: 기술적으로는, 또 다른 컨테이너 형식인 <a href='http://caniuse.com/svg-fonts'>SVG
글꼴 컨테이너</a>가 있지만, IE와 Firefox는 이것을 지원하지 않았으며 Chrome에서도 이제는 지원이 중단되었습니다. 따라서,
제한적인 사용으로 인해 이 가이드에서 의도적으로 생략되었습니다.

### 압축을 통해 글꼴 크기 줄이기

글꼴은 글리프의 모음이며, 각각 문자 형태를 설명하는 경로 집합입니다. 개별
글리프는 각각 다르지만, GZIP 또는 호환되는 압축 프로그램을 통해
압축될 수 있는 유사한 정보가 많이 들어 있습니다.

* EOT 및 TTF 형식은 기본적으로 압축되지 않습니다. 서버가 이러한 형식을 제공할 때
[GZIP 압축](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip)
을 적용하도록 구성되었는지 확인하세요.
* WOFF는 압축이 기본 제공됩니다. WOFF 압축 프로그램이 최적의 압축
설정을 사용하고 있는지 확인하세요.
* WOFF2는 맞춤형 처리 및 압축 알고리즘을 사용하여 다른 형식에 비해 30% 정도 파일 크기를
절감합니다. 자세한 내용은
[WOFF 2.0 평가 보고서](http://www.w3.org/TR/WOFF20ER/){: .external }를 참조하세요.

마지막으로, 일부 글꼴 형식에 특정 플랫폼에서 필요하지 않을 수 있는 [글꼴
힌트](https://en.wikipedia.org/wiki/Font_hinting) 및
[커닝](https://en.wikipedia.org/wiki/Kerning) 정보와 같은 추가적인 메타데이터가 들어 있다는
사실에 주목할 필요가 있습니다. 따라서 추가적인 파일 크기 최적화가 가능합니다. 사용하는 글꼴 압축 프로그램에
사용 가능한 최적화 옵션에 대해 문의하고, 이 방법을 택할 경우 이러한 최적화된 글꼴을 테스트하고 각 브라우저에 제공하는 데 적합한
인프라를 갖추고 있는지 확인하세요. 예를 들어, [Google
Fonts](https://fonts.google.com/)는 각 글꼴에 대해 30개 이상의 최적화된 버전을 유지하고, 각 플랫폼 및 브라우저에 최적의 버전을 자동으로
검색하여 제공합니다.

참고: EOT,
TTF 및 WOFF 형식에 <a href='http://en.wikipedia.org/wiki/Zopfli'>Zopfli 압축</a>을 사용해 보세요. Zopfli는 gzip을 통해 약 5%까지의 파일 크기
절감 효과를 제공하는 zlib 호환 압축 프로그램입니다.

## @font-face로 글꼴 모음 정의하기

### 짧은 요약 {: .hide-from-toc }
* `format()` 힌트를 사용하여 여러 글꼴 형식을 지정합니다.
* 성능 향상을 위해 큰 유니코드 글꼴을 서브세팅합니다. 유니코드 범위 서브세팅을 사용하고 이전 브라우저에 대해
수동 서브세팅 대안을 제공합니다.
* 페이지 및 텍스트 렌더링 성능을 향상시키기 위해 스타일 글꼴 버전 수를 줄입니다.


`@font-face` CSS at-rule을 사용하면 특정 글꼴 리소스의 위치, 해당
스타일 특징 및 이 글꼴이 사용되는 유니코드 코드 포인트를 정의할 수 있습니다. 이러한
`@font-face 선언의 조합은 '글꼴 모음'을 생성하는 데 사용될 수 있으며, 브라우저는 이 글꼴 모음을 사용하여
어떠한 글꼴 리소스를 다운로드하여 현재 페이지에 적용해야 할지를 평가합니다.

### 형식 선택

각 `@font-face` 선언은
여러 선언의 논리적 그룹으로 작용하는 글꼴 모음의 이름, [글꼴 속성](http://www.w3.org/TR/css3-fonts/#font-prop-desc)(예:
style, weight 및 stretch) 그리고 글꼴 리소스의 위치에 대해 우선순위가 지정된
목록을 지정하는 [src 설명자](http://www.w3.org/TR/css3-fonts/#src-desc)를 제공합니다.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'),
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('truetype'),
           url('/fonts/awesome.eot') format('embedded-opentype');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'),
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('truetype'),
           url('/fonts/awesome-i.eot') format('embedded-opentype');
    }


우선, 위의 예시에서는 두 가지 스타일(normal
및 _italic_)을 가지는 단일 _Awesome Font_ 모음을 정의합니다. 이러한 스타일은 각각 다른 글꼴 리소스 집합을 가리킵니다. 각각의 `src`
설명자에는 우선순위가 지정되고, 쉼표로 구분된 리소스 버전 목록이 포함되어 있습니다.

* `local()` 지시문을 사용하면 로컬로 설치된 글꼴을 참조, 로드하고 사용할 수 있습니다.
* `url()` 지시문을 사용하면 외부 글꼴을 로드할 수 있으며, 이 지시문은 제공된 URL에서 참조하는 글꼴의 형식을 나타내는
`format()` 힌트(선택 항목)를 포함할 수 있습니다.


참고: 기본 시스템 글꼴 중 하나를 참조하지 않을 경우, 사용자가 글꼴을
로컬로 설치하는 경우는 드물며, 특히 추가 글꼴을 '설치'하는 것이 사실상 불가능한 휴대기기에서
더 그렇습니다. '만약을 대비하여' 항상 `local()` 엔트리로 시작하고, `url()` 엔트리
목록을 제공해야 합니다.

브라우저가 글꼴이 필요한지 여부를 결정할 때에는 지정된 순서대로 제공된 리소스 목록의
항목에 대해 확인 절차를 반복하여 적절한 리소스를 로드하려고 시도합니다. 예를 들어, 위의
예시를 실행한 후에는 다음 작업이 수행됩니다.

1. 브라우저가 페이지 레이아웃을 수행하고 페이지에
지정된 텍스트를 렌더링하는 데 필요한 글꼴 버전을 결정합니다.
1. 각 필요한 글꼴에 대해 브라우저가 이 글꼴을 로컬로 사용할 수 있는지 여부를 확인합니다.
1. 파일을 로컬로 사용할 수 없으면 브라우저는 외부 정의에서 이 과정을 반복합니다.
    * 형식 힌트가 존재하면 브라우저는
    다운로드를 시작하기 전에 이 힌트를 지원하는지 여부를 확인합니다. 브라우저가 힌트를 지원하지 않을 경우 그 다음 항목으로 진행합니다.
    * 형식 힌트가 없을 경우 브라우저가 리소스를 다운로드합니다.

로컬 및 외부 지시문을 적절한 형식 힌트와 함께 사용하면,
모든 사용 가능한 글꼴 형식을 직접 지정할 수 있으며 나머지는 브라우저가 처리하도록 맡길 수 있습니다. 브라우저는 필요한
리소스를 파악하고 최적의 형식을 선택합니다.

참고: 글꼴 버전이 지정되는 순서는 중요합니다. 브라우저는 지원하는 형식
중 첫 번째 형식을 선택합니다. 따라서, 최신 브라우저가 WOFF2를 사용하도록 하려면 WOFF2
선언을 WOFF 위에 추가해야 하는 식입니다.

### 유니코드 범위 서브세팅

style, weight 및 stretch와 같은 글꼴 속성 외에도,
`@font-face` 규칙을 사용하면
각 리소스에서 지원되는 유니코드 코드 포인트 집합을 정의할 수 있습니다. 이를 통해 대규모 유니코드 글꼴을 더 작은
하위 집합(예: 라틴어, 키릴어 및 그리스어 하위 집합)으로 분할하여 특정 페이지에서 텍스트를
렌더링하는 데 필요한 글리프만 다운로드할 수 있습니다.

[유니코드 범위 설명자](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range)를 사용하면 쉼표로 구분된
범위 값 목록을 지정할 수 있습니다. 각 범위 값은 다음 세 가지
형식 중 하나일 수 있습니다.

* 단일 코드 포인트(예: `U+416`)
* 간격 범위(예: `U+400-4ff`): 범위의 시작 및 끝 코드 포인트를 나타냅니다.
* 와일드 카드 범위(예: `U+4??`): `?` 문자는 임의의 16진수를 나타냅니다.

예를 들어, _Awesome Font_ 모음을 라틴어 및 일본어
하위 집합으로 분할할 수 있으며, 브라우저가 필요에 따라 이 하위 집합을 각각 다운로드합니다.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'),
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'),
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('truetype'),
           url('/fonts/awesome-jp.eot') format('embedded-opentype');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }


참고: 아시아 언어에서는 유니코드 범위 서브세팅이 특히 중요합니다. 여기서는
글리프 수가 서양 언어보다 훨씬 더 많고, 일반적인 '전체' 글꼴은 대개 수십 KB가 아니라
MB로 측정됩니다.

유니코드 범위 하위 집합과 글꼴의 각 스타일 버전에 대해 별도의 파일을 사용하면
다운로드하기에 더욱 빠르면서도 더욱 효율적인 합성 글꼴 모음을 정의할 수 있습니다. 방문자는
필요한 버전과 하위 집합만 다운로드하면 되고, 페이지에서 절대로 보거나
사용하지 않을 하위 집합은 다운로드할 필요가 없습니다.

하지만, 유니코드 범위에는 한 가지 사소한 문제가 있습니다. 아직 [일부 브라우저가 이를
지원하지 않습니다](http://caniuse.com/#feat=font-unicode-range). 일부 브라우저는
유니코드 범위 힌트를 무시하고 모든 버전을 다운로드하는 반면,
이외의 다른 브라우저는 `@font-face` 선언을 전혀 처리하지 않을 수 있습니다. 이를 해결하려면 이전 브라우저의 경우
'수동 서브세팅'으로 돌아가야 합니다.

이전 브라우저는 필요한 하위 집합만 선택할 만큼 지능적이지 않고 합성 글꼴을
생성할 수 없으므로 필요한
모든 하위 집합을 포함하는 단일 글꼴 리소스를 제공하는 것으로 환원해야 하며, 브라우저에서 나머지 글꼴 리소스는 숨겨야 합니다. 예를 들어, 페이지가 라틴어
문자만 사용할 경우 다른 글리프를 제거하고 해당 특정 하위 집합을 독립형
리소스로 제공할 수 있습니다.

1. **필요한 하위 집합은 어떻게 판별할까요?**
    * 브라우저가 유니코드 범위 하위 집합을 지원하는 경우 올바른
    하위 집합을 자동으로 선택합니다. 페이지는 하위 집합 파일을 제공하고 `@font-face` 규칙에 적절한 유니코드 범위만
    지정하면 됩니다.
    * If the browser doesn't support unicode-range subsetting, then the page needs to hide all
      unnecessary subsets; that is, the developer must specify the required subsets.
1. **글꼴 하위 집합은 어떻게 생성할까요?**
   - 오픈소스 [pyftsubset 도구](https://github.com/behdad/fonttools/){: .external }를 사용하여 글꼴을
   서브세팅하고 최적화합니다.
    - 일부 글꼴 서비스에서는 페이지에 필요한 하위 집합을
   수동으로 지정하는 데 사용할 수 있는 사용자설정 쿼리 매개변수를 통한 수동 서브세팅을 허용합니다. 글꼴
   제공업체의 문서를 참조하세요.


### 글꼴 선택 및 합성

각 글꼴 모음은 여러 스타일 버전(일반, 굵은꼴, 기울임꼴)과 각 스타일에 대한 여러
두께로 구성됩니다. 각 스타일에는 서로 아주 다른
글리프 모양(예: 공백, 크기 또는 모양이 서로 다름)이 포함될 수 있습니다.

<img src="images/font-weights.png"  alt="글꼴 두께">

예를 들어, 위에 나와 있는 다이어그램은 세 가지
서로 다른 두께, 즉 400(일반), 700(굵은꼴) 및 900(아주 굵은꼴)을 제공하는 글꼴 모음을 보여줍니다. 그 사이에 있는 기타 모든
버전(회색으로 표시되어 있음)은 브라우저에 의해
가장 가까운 버전으로 자동으로 매핑됩니다.



> 글꼴이 존재하지 않는 상태에서 두께가 지정되면 가까운 두께를 가진 글꼴이 사용됩니다. 일반적으로,
굵은 두께는 두꺼운 두께를 가진 글꼴에 매핑되고, 얇은 두께는 얇은
두께를 가진 글꼴에 매핑됩니다.
> > <a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">CSS3 글꼴 일치
알고리즘</a>



유사한 논리가 _기울임꼴_ 버전에도 적용됩니다. 글꼴 디자이너는 생성되는
버전을 제어하고, 개발자는
페이지에 사용할 버전을 제어합니다. 버전은 각각 개별적인 다운로드이므로
버전 수를 적게 유지하는 것이 좋습니다. 예를 들어,
_Awesome Font_ 모음에 대해 두 가지 굵은 글꼴 버전을 정의할 수 있습니다.


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'),
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('truetype'),
           url('/fonts/awesome-l.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'),
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('truetype'),
           url('/fonts/awesome-l-700.eot') format('embedded-opentype');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }


위의 예시에서는
동일한 라틴어 글리프 집합(`U+000-5FF`)을 포함하되, 두 가지 다른 '두께', 즉 일반(400) 및
굵은꼴(700)를 제공하는 두 가지 리소스로 구성된 _Awesome Font_ 모음을 선언합니다. 하지만, CSS 규칙 중 하나가 다른 글꼴 두께를 지정하거나
font-style속성을 italic으로 설정하면 어떻게 될까요?

- 정확한 글꼴 일치를 사용할 수 없는 경우 브라우저는 가장 가까운 일치 항목을 대신 사용합니다.
- 스타일 일치 항목이 없으면(예: 위의
예에서는 기울임꼴 버전이 선언되지 않음) 브라우저가 자체 글꼴 버전을 합성합니다.

<img src="images/font-synthesis.png"  alt="글꼴 합성">


Warning: 작성자는 또한 기울임꼴 형식이 모양 면에서 상당히 다른
키릴어와 같은 스크립트에는 합성 방식이 적합하지 않을 수 있다는 점을 인식하고 있어야 합니다. 스크립트의 적절한 충실도를 위해
기울임 글꼴을 사용하세요.

위의 예시에서는 Open-Sans에 대한 실제 글꼴 결과와 합성 글꼴 결과 사이의
차이점을 보여줍니다. 모든 합성 버전은 단일한 400 두께 글꼴을 기반으로 생성되었습니다. 보시다시피,
결과가 눈에 띄게 차이가 납니다. 굵은 글꼴 버전과 기울임꼴
글꼴 버전을 생성하는 방법에 대한 세부정보는 명시되어 있지 않습니다. 따라서, 결과는 브라우저마다 달라지며 글꼴에 따라서도 상당히
달라집니다.

참고: 최상의 일관성 및 시각적 효과를 얻기 위해서는 글꼴 합성을 사용하지 마세요. 대신, 사용되는 글꼴 버전의
수를 최소화하고 해당 위치를 지정하세요. 그러면 브라우저가 페이지에서 글꼴이 사용될 때
이러한 글꼴을 다운로드할 수 있습니다. 하지만, 일부 경우 합성된 버전이 <a
href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>사용 가능한
옵션일 수 있으므로</a> 합성된 버전을 사용할 때 주의하세요.

## 로드 및 렌더링 최적화

### 짧은 요약 {: .hide-from-toc }
* 기본적으로 글꼴 요청은 텍스트 렌더링을 지연시킬 수 있으므로
렌더링 트리가 생성될 때까지 지연됩니다.
* `<link rel="preload">`, CSS `font-display` 속성, Font Loading
API는 사용자설정 글꼴 로딩 및 렌더링 전략 구현에 필요
후크를 제공하며, 기본 동작을 재정의합니다.


필요하지 않을 수 있는 모든 스타일 버전과
사용되지 않을 수 있는 모든 글리프를 포함하는 '전체' 웹폰트는 수 메가바이트 크기의 다운로드를 쉽게 발생시킬 수 있습니다. 이 문제를 해결하기 위해
`@font-face` CSS 규칙은 글꼴 모음을 유니코드 하위 집합, 개별 스타일 버전 등의 리소스
모음으로 분할할 수 있도록 특별히 설계되었습니다.

이러한 선언을 고려하여 브라우저는 필요한 하위 집합 및 버전을 파악하고 텍스트를 렌더링하는 데 필요한 최소 집합만
다운로드하는 편리한 방식을 사용합니다. 그러나 주의하지
않으면, 주요 렌더링 경로에서 성능 병목 현상이 발생할 수도 있고 텍스트
렌더링이 지연될 수도 있습니다.

### 동작 기본값

글꼴의 지연 로드에는 중요한 함축이 숨겨져 있습니다. 즉, 텍스트 렌더링을 지연시킬 수 있다는 것입니다.
브라우저는 텍스트를 렌더링하는 데 필요한 글꼴 리소스가 무엇인지 인식하기 전에 [렌더링
트리를 생성](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)해야 하며, 이
렌더링
트리는 DOM 및 CSSOM 트리에 종속됩니다. 따라서, 글꼴 요청은 다른 주요 리소스 훨씬 후로 지연되며,
브라우저는 리소스를 가져올 때까지 텍스트를 렌더링하지 못하도록 차단될 수 있습니다.

<img src="images/font-crp.png"  alt="글꼴 주요 렌더링 경로">

1. 브라우저가 HTML 파일을 요청합니다.
1. 브라우저가 HTML 응답 파싱과 DOM 구성을 시작합니다.
1. 브라우저가 CSS, JS 및 기타 리소스를 발견하고 요청을 발송합니다.
1. 브라우저가 모든 CSS 콘텐츠가 수신된 후 CSSOM을 생성하고 이를
DOM 트리와 결합하여 렌더링 트리를 생성합니다.
    - 렌더링 트리가 페이지에 지정된 텍스트를
   렌더링하는 데 필요한 글꼴 버전이 무엇인지 나타내면 글꼴 요청이 발송됩니다.
1. 브라우저가 레이아웃을 수행하고 콘텐츠를 화면에 페인팅합니다.
    - 글꼴을 아직 사용할 수 없으면, 브라우저가 텍스트 픽셀을 렌더링할 수 없습니다.
    - 글꼴을 사용할 수 있게 되면, 브라우저가 텍스트 픽셀을 페인팅합니다.

렌더링 트리가 빌드된 후 곧바로 수행될 수 있는
첫 번째 페이지 콘텐츠 페인트와 글꼴 리소스에 대한 요청 사이의 '경합'으로 인해
'빈 텍스트 문제'가 생성됩니다.
이 경우 브라우저가 페이지 레이아웃을 렌더링할 수는 있지만 모든 텍스트를 생략합니다.

다음 섹션은 이 동작 기본값의 여러 사용자설정 옵션을 설명합니다.

### 웹폰트 리소스 미리 로드

사전에 알고 있는 URL에서 호스팅되는 특정 웹폰트가 페이지에 필요할 가능성이 높은 경우,
새로운 웹 플랫폼
기능의 이점을 이용할 수 있습니다: [`<link rel="preload">`](/web/fundamentals/performance/resource-prioritization).

이 방식은 보통 HTML에
`<head>`의 일부로 요소를 포함시킬 수 있으며, CSSOM 생성을 기다릴 필요 없이 중요한
렌더링 경로의 초반에 웹폰트 요청을 트리거합니다.

`<link rel="preload">`는 주어진 리소스가
곧 필요하다는 것을 브라우저에 '암시'하지만, *어떻게* 사용해야 하는지는 전달하지 않습니다.
미리 로드를 적절한 CSS `@font-face`
정의와 함께 사용하여 브라우저가 주어진 웹폰트 URL을 어떻게 해야 하는지 지시합니다.

```html
<head>
  <!-- Other tags... -->
  <link rel="preload" href="/fonts/awesome-l.woff2" as="font">
</head>
```

```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
```

모든 브라우저가 [`<link rel="preload">`를 지원](https://caniuse.com/#feat=link-rel-preload)하는 것은 아니며,
이러한 브라우저에서는 `<link rel="preload">`가 무시됩니다. 그러나 미리 로드를 지원하는
모든 브라우저는 WOFF2도 지원하기 때문에, 이
형식을 언제나 미리 로드해야 합니다.

Caution: `<link rel="preload">`를 사용하면 최종적으로 페이지에서 실제로
필요한지와 무관하게 웹폰트의 URL에 대한 조건 없는 높은 우선 순위
요청을 생성합니다. `@font-face` 정의에
Roboto와 같은 흔한 글꼴에 대한 `local()` 엔트리가
포함되는 등, 웹폰트의 원격 사본이 필요하지 않은 합리적인 경우에는
`<link rel="preload">` 사용으로 요청이 낭비됩니다. 일부 브라우저는 리소스가 미리 로드되었으나
실제로 사용되지 않는 경우에
Developer Tools의 콘솔에 경고를 표시합니다.

###텍스트 렌더링 지연 맞춤 설정

미리 로드로 인해
페이지의 콘텐츠가 렌더링되었을 때 웹폰트를 이용할 수 있게 될 수 있지만, 이것을 보장하지는 않습니다. 사용자는 여전히
아직 이용할 수 없는 `font-family`를 사용하는 텍스트를 렌더링할 때의
브라우저 동작을 고려해야 합니다.

#### 브라우저 동작

렌더링 트리가 빌드된 후 곧바로 수행될 수 있는
첫 번째 페이지 콘텐츠 페인트와 글꼴 리소스에 대한 요청 사이의 '경합'으로 인해
'빈 텍스트 문제'가 생성됩니다.
이 경우 브라우저가 페이지 레이아웃을 렌더링할 수는 있지만 모든 텍스트를 생략합니다. 대부분의 브라우저는 폴백 글꼴이 사용된 후
웹폰트 다운로드를 기다리는 최대 제한시간을 구현합니다. 안타깝게도,
브라우저마다 다르게 구현되어 있습니다.

<table>
  <thead>
    <tr>
      <th data-th="Browser">브라우저</th>
      <th data-th="Timeout">시간 초과</th>
      <th data-th="Fallback">폴백</th>.
      <th data-th="Swap">스왑</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser">
        <strong>Chrome 35+</strong>
      </td>
      <td data-th="Timeout">
        3초
      </td>
      <td data-th="Fallback">
        지원
      </td>
      <td data-th="Swap">
        지원
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Opera</strong>
      </td>
      <td data-th="Timeout">
        3초
      </td>
      <td data-th="Fallback">
        지원
      </td>
      <td data-th="Swap">
        지원
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Firefox</strong>
      </td>
      <td data-th="Timeout">
        3초
      </td>
      <td data-th="Fallback">
        지원
      </td>
      <td data-th="Swap">
        지원
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Internet Explorer</strong>
      </td>
      <td data-th="Timeout">
        0초
      </td>
      <td data-th="Fallback">
        지원
      </td>
      <td data-th="Swap">
        지원
      </td>
    </tr>
    <tr>
      <td data-th="Browser">
        <strong>Safari</strong>
      </td>
      <td data-th="Timeout">
        시간 초과 없음
      </td>
      <td data-th="Fallback">
        해당 없음
      </td>
      <td data-th="Swap">
        해당 없음
      </td>
    </tr>
  </tbody>
</table>

- Chrome 및 Firefox는 텍스트가 폴백 글꼴로
나타난 후 3초간 제한시간이 있습니다. 글꼴이 다운로드되면, 결국에는 스왑이
발생하며, 텍스트가 의도한 글꼴로 다시 렌더링됩니다.
- Internet Explore의 제한시간은 0초이며, 즉각적인 텍스트
렌더링을 발생시킵니다. 요청된 글꼴을 아직 이용할 수 없는 경우, 폴백이 사용되며
일단 요청된 글꼴을 사용할 수 있게 되면 텍스트가 다시 렌더링됩니다.
- Safari에는 제한시간 동작이 없습니다(또는 최소한 기준 네트워크
제한시간을 초과하는 동작 없음).

일관성을 계속 유지하기 위해 CSS Working Group이 새로운
`@font-face` 설명자,
[`font-display`](https://drafts.csswg.org/css-fonts-4/#font-display-desc) 및 다운로드
가능한 글꼴이 로드되기 전에 어떻게 렌더링하는지 제어하는 관련 속성을
제안했습니다.

#### font-display 타임라인

일부 브라우저가 오늘날 구현하는 기존 글꼴 제한시간 동작과
유사하게, `font-display`는 글꼴 다운로드 수명을 세 개의 주요
기간으로 구분합니다.

1. 첫 번째 기간은 **글꼴 차단 기간**입니다. 이 기간에는
글꼴이 로드되지 않으면 사용을 시도하는 모든 요소가 대신 보이지 않는
폴백 글꼴로 렌더링해야 합니다. 차단 기간에 글꼴이
성공적으로 로드되면, 글꼴이 정상적으로 사용됩니다.
2. 글꼴 차단 기간 직후에 **글꼴 스왑 기간**이 일어납니다. 이
기간에 글꼴이 로드되지 않으면, 글꼴 사용을 시도하는 모든 요소가
폴백 글꼴을 대신 렌더링해야 합니다. 스왑 기간에 글꼴이
성공적으로 로드되면, 글꼴이 정상적으로 사용됩니다.
3. 글꼴 스왑 기간 직후에
**글꼴 실패 기간**이 일어납니다. 이 기간이 시작할 때 글꼴이 아직 로드되지 않았다면
실패한 로드로 표시되어 정상 글꼴 폴백을 일으킵니다. 그렇지 않으면 글꼴이
정상적으로 사용됩니다.

이러한 기간을 이해하면 `font-display`를 이용하여 글꼴의 다운로드 여부와 시점에 따라 글꼴을 렌더링하는
방법을 결정할 수 있습니다.

#### font-display 사용

`font-display` 속성으로 작업하려면 `@font-face` 규칙에 다음을 추가하세요.

```css
@font-face {
  font-family: 'Awesome Font';
  font-style: normal;
  font-weight: 400;
  font-display: auto; /* or block, swap, fallback, optional */
  src: local('Awesome Font'),
       url('/fonts/awesome-l.woff2') format('woff2'), /* will be preloaded */
       url('/fonts/awesome-l.woff') format('woff'),
       url('/fonts/awesome-l.ttf') format('truetype'),
       url('/fonts/awesome-l.eot') format('embedded-opentype');
  unicode-range: U+000-5FF; /* Latin glyphs */
}
```

`font-display`는 현재 다음 범위의 값을 지원합니다.
`auto | block | swap | fallback | optional`

- **`auto`**는 사용자-에이전트가 사용하는 글꼴 표시 전략을 사용합니다. 대부분의 브라우저에는
현재 `block`과 유사한 전략 기본값이 있습니다.

- **`block`**은 글꼴에 짧은 차단 기간(대부분의 경우 3초 권장)과
무한 스왑 기간을 부여합니다. 다시 말하면, 글꼴이 로드되지 않으면 브라우저가 처음에 '보이지 않는' 텍스트를
그리지만, 로드되는 즉시
글꼴로 스왑합니다. 이를 위해 브라우저가 선택한 글꼴과
유사하지만 모든 글리프가 '잉크'를 포함하지 않는 측정항목의 익명 글꼴을 생성합니다.
이 값은 페이지를 사용하려면 특정 서체로
텍스트를 렌더링하는 것이 필요할 때만 사용해야 합니다.

- **`swap`**은 글꼴에 0초의 차단 기간과 무한 스왑 기간을 부여합니다.
글꼴이
로드되지 않으면 브라우저는 바로 폴백으로 텍스트를 그리지만, 로드되는 즉시 글꼴로 스왑합니다. `block`과 유사하게
이 값은 텍스트를 특정 글꼴로 렌더링하는 것이
페이지에 중요하지만, 다른 글꼴로 렌더링하더라도 여전히 올바른
메시지를 얻을 수 있는 경우에만 사용해야 합니다. 적절한 폴백을 사용하여
회사의 이름을 표시하면 메시지를 얻을 수 있지만,
결국에는 공식 글꼴을 이용하게 되므로 로고 텍스트는 훌륭한 **스왑** 후보입니다.

- **`fallback`**은 글꼴에 극도로 짧은 차단 기간(대부분의 경우 100ms 미만이
권장됨)과 짧은 스왑 기간(대부분의 경우 3초가
권장됨)을 제공합니다. 다시 말하면, 글꼴이
처음에 로드되지 않았을 때 폴백으로 렌더링되지만 로드된 직후에는 글꼴이 스왑됩니다. 그러나,
너무 많은 시간이 지나면 남은 페이지
수명 동안 폴백이 사용됩니다. `fallback`은 사용자가
가능한 한 빠르게 읽어야 하고 새로운 글꼴이 로드될 때 텍스트가 변경되어 사용자 경험을
방해하는 것을 원치 않는 본문과 같은 곳에 적합한 후보입니다.

- **`optional`**은 글꼴에 극도로 짧은 차단 기간(대부분의 경우 100ms 미만이
권장됨)과 0초의 스왑 기간을 제공합니다. `fallback`과 마찬가지로,
이 값은 글꼴 다운로드가 "있으면 더 좋지만"
경험에 중요하지는 않은 정도인 경우 적합한 선택입니다. `optional` 값은 글꼴 다운로드 개시 여부를
브라우저가 결정하도록 하며, 브라우저는 사용자에게 가장 적합하다고 생각하는 것에 따라
다운로드하지 않거나 낮은 우선순위로
다운로드합니다. 이 방식은 사용자의
연결이 약하고 글꼴을 표시하는 것이 가장 적합한 리소스 사용 방법이 아닌 상황에서 도움이 됩니다.

`font-display`는 많은 최신 브라우저에서
[적용되기 시작하고 있습니다](https://caniuse.com/#feat=css-font-rendering-controls). 이 속성이 폭넓게 구현됨에 따라
앞으로 일관된 브라우저 동작을 기대할 수 있을 것입니다.


### The Font Loading API

`<link rel="preload">`와 CSS `font-display`는 함께 사용하면 많은 오버헤드를 추가하지 않고도
개발자가 글꼴 로딩 및 렌더링을 상당 부분
제어할 수 있습니다. 그러나 추가적인 사용자맞춤이 필요하며 실행 중인 자바스크립트로 도입된
오버헤드를 발생시키고자 한다면 다른 선택지가 있습니다.

[Font Loading API](https://www.w3.org/TR/css-font-loading/)는 CSS 글꼴을
정의하고 조작하며, 해당 다운로드 진행 상황을 추적하고, 해당 기본
지연 로드 동작을 재정의할 수 있는 스크립팅 인터페이스를 제공합니다. 예를 들어, 특정 글꼴 버전이 필요하다고 확신할 경우 이 글꼴 버전을
정의하고 브라우저에 글꼴 리소스에 대한 즉각적인 가져오기를 시작하도록 지시할 수 있습니다.


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });

    // don't wait for the render tree, initiate an immediate fetch!
    font.load().then(function() {
      // apply the font (which may re-render text and cause a page reflow)
      // after the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";

      // OR... by default the content is hidden,
      // and it's rendered after the font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";

      // OR... apply your own render strategy here...
    });


또한 [check()](https://www.w3.org/TR/css-font-loading/#font-face-set-check) 메서드를
통해 글꼴 상태를 확인하고 해당
다운로드 진행 상황을 추적할 수 있으므로, 텍스트를 페이지에 렌더링하기 위한 맞춤형 전략을 정의할 수도 있습니다.

- 글꼴을 사용할 수 있게 될 때까지 모든 텍스트 렌더링을 보류할 수 있습니다.
- 각 글꼴별로 맞춤형 제한 시간을 구현할 수 있습니다.
- 글꼴을 사용할 수 있게 되면 원하는
글꼴을 사용하는 폴백 글꼴을 사용하여 렌더링이 차단되지 않도록 하고 새로운 스타일을 삽입할 수 있습니다.

무엇보다도, 위에 설명된 전략을 페이지의 서로 다른 콘텐츠에 맞게 적절히 혼합할 수도 있습니다. 예를
들어, 글꼴을 사용할 수 있게 될 때까지 일부 섹션에서 텍스트 렌더링을 지연시킬 수 있고, 대체
글꼴을 사용한 후 글꼴 다운로드가 완료된 후 다시 렌더링할 수 있으며, 각각 다른 제한시간을 지정할 수가
있습니다.

참고: Font Loading API는 <a href='http://caniuse.com/#feat=font-loading'>몇몇 브라우저에서
여전히 개발 중에 있습니다</a>. 추가 자바스크립트 종속성으로 인한 오버헤드가 더 많기는 하지만 유사한 기능을 제공하려면 <a
href='https://github.com/bramstein/fontloader'>FontLoader 폴리필</a> 또는 <a
href='https://github.com/typekit/webfontloader'>webfontloader 라이브러리</a>를 사용해
보세요.

### 적절한 캐싱은 필수

글꼴 리소스는 일반적으로 자주 업데이트되지 않는 정적 리소스입니다. 따라서, 긴
max-age 만료에 적합합니다. 모든 글꼴 리소스에 [조건부 ETag
헤더](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags) 및
[최적의 Cache-Control
정책](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)을 지정해야
합니다.

웹 애플리케이션이 [서비스 워커](/web/fundamentals/primers/service-workers/)를 이용한다면,
대부분의 사용 사례에서 [캐시 우선
전략](/web/fundamentals/instant-and-offline/offline-cookbook/#cache-then-network)으로
글꼴 리소스를 제공하는 것이 적합합니다.

[`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)이나
[IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)를
사용하여 글꼴을 보관하지 말아야 합니다.
이들은 자체적인 성능 문제가 있습니다. 브라우저의 HTTP 캐시는
글꼴 리소스를
브라우저에 제공하는 최고이자 가장 강력한 메커니즘을 제공합니다.


## 최적화 검사 목록

일반적인 믿음과는 달리, 웹폰트를 사용할 경우 페이지 렌더링을 지연시킬 필요가 없고 다른 성능 메트릭에
부정적인 영향을 미치지도 않습니다. 글꼴 사용을 제대로 최적화하면,
모든 화면 형식 및 해상도에 잘 맞는 확장 가능한 다중 해상도 솔루션과 더불어 뛰어난 브랜딩, 가독성,
사용성 및 검색 가능성 향상 등 전반적으로 훨씬 더 나은 사용자 환경을 제공할 수
있습니다. 웹폰트를 사용하는 것을 두려워하지 마세요.

하지만, 아무것도 모르는 상태에서 구현하면 대규모의 다운로드 및 불필요한 지연이 발생할 수 있습니다. 글꼴 자산을 최적화하고
글꼴 자산을 가져와서 페이지에 사용하는 방법을 최적화하여 브라우저를 도와야
합니다.

- **글꼴 사용 감사 및 모니터링:** 페이지에 너무 많은 글꼴을 사용하지 말고, 각 글꼴마다 사용된 글꼴 버전의 수를
최소화하세요. 이렇게 하면 사용자에게 더욱 일관되고 빠른 경험을
제공할 수 있습니다.
- **글꼴 리소스 서브세팅:** 많은 글꼴을 서브세팅하거나 여러 유니코드
범위로 분할하면 특정 페이지에 필요한 글리프만 제공할 수 있습니다. 그러면 파일 크기가 줄어들고 리소스의
다운로드 속도가 향상됩니다. 하지만 하위 집합을 정의할 때 글꼴
재사용을 위해 최적화하도록 주의를 기울이세요. 예를 들어, 각 페이지에서 서로 다르지만 겹치는 문자 집합은 다운로드하지 마세요. 좋은
방법은 스크립트(예: 라틴어, 키릴어 등)를 기반으로 서브세팅하는 것입니다.
- **각 브라우저에 최적화된 글꼴 형식 제공:** 각 글꼴을 WOFF2, WOFF, EOT 및 TTF
형식으로 제공합니다. GZIP 압축을 EOT 및 TTF 형식에 적용해야 합니다. 이들 형식은 기본적으로
압축되지 않기 때문입니다.
- **`local()`을 `src` 목록의 상위로 부여:** `local('Font Name')`을
`src` 목록의 처음에 나열하면 이미 설치된 글꼴에 대한 HTTP 요청이 생성되지 않습니다.
- **`<link rel="preload">`, `font-display` 또는 Font
Loading API를 이용하여 글꼴 로딩 및 렌더링 사용자설정:** 기본 지연 로드 동작이 텍스트 렌더링의 지연을 일으킬 수 있습니다. 이러한 웹 플랫폼
기능을 이용하면 특정 글꼴에 대한 이러한 동작을 재정의하고 페이지의 다양한 콘텐츠에 대한 사용자설정 렌더링과
제한시간 전략을 지정할 수 있습니다.
- **유효성 재검사 및 최적의 캐싱 정책 지정:** 글꼴은 자주 업데이트되지 않는
정적 리소스입니다. 여러 페이지 간에 효율적인 글꼴 재활용이 가능하도록, 수명이 긴 max-age 타임스탬프와 유효성
재검사 토큰을 서버가 제공해야 합니다. 서비스
워커를 이용하는 경우 캐시 우선 전략이 적합합니다.

*이 글은 [Monica Dinculescu](https://meowni.ca/posts/web-fonts/),
[Rob Dodson](/web/updates/2016/02/font-display) 및 Jeff Posnick의 기여로 작성되었습니다.*

## 의견 {: #feedback }

{% include "web/_shared/helpful.html" %}
