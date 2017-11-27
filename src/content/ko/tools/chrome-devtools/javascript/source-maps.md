project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 클라이언트측 코드를 결합하거나 최소화하거나 컴파일한 후에도 읽을 수 있고 디버그할 수 있게 합니다.

{# wf_updated_on: 2015-04-21 #}
{# wf_published_on: 2015-04-13 #}

# 전처리된 코드를 소스 코드에 매핑 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}

클라이언트측 코드를 결합하거나 최소화하거나 컴파일한 후에도 읽을 수 있고 디버그할 수 있게 합니다. 소스 맵을 사용하여 소스 코드를 컴파일된 코드에 매핑합니다.


### TL;DR {: .hide-from-toc }
- 소스 맵을 사용하여 최소화된 코드를 소스 코드로 매핑합니다. 그러면 원본에서 컴파일된 코드를 읽고 디버그할 수 있습니다.
- <a href=''/web/tools/setup/setup-preprocessors?#supported-preprocessors''>소스 맵을 생성할 수 있는 전처리기</a>만 사용합니다.
- 웹 서버가 소스 맵을 제공할 수 있는지 확인합니다.


## 전처리기 시작하기

이 문서에서는 DevTools Sources 패널에서 자바스크립트 소스 맵과 상호작용하는 방법에 대해 설명합니다. 전처리기의 정의 및 용도와 소스 맵의 작동 방식에 대한 첫 번째 개요는 [CSS 및 JS 전처리기 설정](/web/tools/setup/setup-preprocessors?#debugging-and-editing-preprocessed-content)을 참조하세요.

## 지원되는 전처리기 사용

소스 맵을 만들 수 있는 최소화기(minifier)를 사용해야 합니다. 가장 인기 있는 옵션을 보려면 [전처리기 지원](/web/tools/setup/setup-preprocessors?#supported-preprocessors) 섹션을 참조하세요. 전체를 살펴보려면 [소스 맵: 언어, 도구 및 기타 정보](https://github.com/ryanseddon/source-map/wiki/Source-maps:-languages,-tools-and-other-info) 위키 페이지를 참조하세요.

일반적으로 다음 유형의 전처리기를 소스 맵과 함께 사용합니다.

* 트랜스파일러([Babel](https://babeljs.io/){: .external }, [Traceur](https://github.com/google/traceur-compiler/wiki/Getting-Started))
* 컴파일러([Closure Compiler](https://github.com/google/closure-compiler), [TypeScript](http://www.typescriptlang.org/){: .external }, [CoffeeScript](http://coffeescript.org), [Dart](https://www.dartlang.org))
* 최소화기([UglifyJS](https://github.com/mishoo/UglifyJS))

## DevTools Sources 패널의 소스 맵

전처리기의 소스 맵을 사용하는 경우 DevTools가 최소화된 파일뿐만 아니라 원본 파일을 로드합니다. 이때 사용자는 원본을 사용하여 중단점을 설정하고 코드를 단계별로 처리합니다. 그동안 Chrome은 실제로 최소화된 코드를 실행합니다. 이는 제작 중인 개발 사이트를 실행하고 있다는 착각을 일으킵니다.

DevTools에서 소스 맵을 실행 중인 경우 사용자는 자바스크립트가 컴파일되지 않음을 알게 되고 참조하는 모든 개별 자바스크립트 파일을 볼 수 있습니다. 이는 소스 매핑을 사용 중이지만 실제로 컴파일된 코드를 배후에서 실행합니다. 강력한 디버깅을 위해 모든 오류, 로그 및 중단점이 개발 코드로 매핑됩니다. 따라서 실제로 사용자는 제작 중인 개발 사이트를 실행하고 있다는 착각을 하게 됩니다.

### 설정에서 소스 맵 활성화

설정에서 소스 맵 활성화소스 맵은 기본적으로 활성화되지만(Chrome 39의 경우), 다시 확인하거나 활성화하려면 먼저 DevTools를 열고 설정 cog ![gear](imgs/gear.png){:.inline}를 클릭합니다. **Sources** 아래에서 **Enable JavaScript Source Maps**를 선택합니다. **Enable CSS Source Maps**도 선택할 수 있습니다.

![소스 맵 활성화](imgs/source-maps.jpg)

### 소스 맵으로 디버깅

[코드 디버깅](/web/tools/chrome-devtools/debug/breakpoints/step-code) 및 소스 맵을 활성화한 경우 다음 두 위치에 소스 맵이 표시됩니다.

1. 콘솔 내(소스에 대한 링크는 생성된 파일이 아니라 원본 파일임)
2. 코드를 단계별로 처리하는 도중(호출 스택의 링크는 원본 파일을 엶)

## @sourceURL 및 displayName

`@sourceURL`은 소스 맵 사양의 일부가 아니지만 eval 사용 시 훨씬 쉽게 개발할 수 있습니다. 이 도우미는 `//# sourceMappingURL` 속성과 매우 유사하며 실제로 Source Map V3 사양에 언급되어 있습니다.

코드에 eval 처리될 다음과 같은 특별 주석을 포함하여 DevTools에서 훨씬 논리적 이름으로 표시되도록 eval 및 인라인 스크립트와 스타일의 이름을 지정할 수 있습니다.

`//# sourceURL=source.coffee`

이
**[데모](http://www.thecssninja.com/demo/source_mapping/compile.html)**로 이동한 후 다음을 수행합니다.

* DevTools를 열고 **Sources** 패널로 이동합니다.
* _Name your code:_ 입력 필드에 파일 이름을 입력합니다.
* **compile** 버튼을 클릭합니다.
* CoffeeScript 소스에서 산출된 합계와 함께 경고가 표시됩니다.

_Sources_ 하위 패널을 확장하면 이전에 입력한 사용자설정 파일 이름이 있는 새로운 파일이 표시됩니다. 이 파일을 두 번 클릭하여 보면 원본에 대해 컴파일된 자바스크립트가 포함되어 있습니다. 그러나 마지막 줄에 원본 파일을 나타내는 `// @sourceURL` 주석이 있습니다. 이는 언어 추상화 사용 시 디버깅하는 데 큰 도움이 될 수 있습니다.

![sourceURL 사용](imgs/coffeescript.jpg)




{# wf_devsite_translation #}
