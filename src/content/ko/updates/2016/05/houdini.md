project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini is a collection of APIs that expose the CSS engine’s internals to developers

{# wf_updated_on: 2019-04-17 #}
{# wf_published_on: 2016-05-19 #}
{# wf_tags: houdini,css #}
{# wf_featured_image: /web/updates/images/2016/05/houdini/compworklet_small.png #}

# Houdini: Demystifying CSS {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

참고: 본 글의 내용들은 연관 표준의 최신 내용으로 업데이트하고 있습니다.

CSS가 할 수 있는 일들을 생각해본 적이 있나요? 여러분이 하나의 CSS 속성을 바꾸면 전체 웹 페이지를 완전히 다른 레이아웃으로
 변경할 수 있습니다. 그런 점에 있어서 *마법*과도 같죠. (앞으로 제가 무슨 말을 할 지 감이 오시나요?!) 지금까지 우리 웹 개발자들은
이러한 마법을 바라보기만 했었습니다. 만약 여러분만의 마법을 부리고 싶다면요? 만약 우리가 *마법사가 되고 싶다면요*?
Houdini를 시작해보세요!

Houdini 프로젝트는 Mozilla, Apple, Opera, Microsoft, HP, Intel 그리고 Google의 엔지니어들로 구성되어 (번역자: LG도 있습니다!)
CSS 엔진의 일부분에 웹 개발자들이 접근할 수 있도록 협업하고 있습니다. 이 프로젝트는 공식 W3C 표준으로 채택되기 위한
*표준 초안*들을 작성하고 있습니다. 프로젝트의 구성원들은 표준안에 대한 몇 가지 높은 수준의 목표를 세워 표준 초안을 작성하였으며 이를 기반으로
하위 수준 사양의 표준 문서들이 개발되었습니다. 결국, “Houdini”라하면 이 표준 문서들의 내용을 의미합니다.
표준안 개발 작업이 진행되는 동안 [Houdini 표준안 초안][Houdini Drafts]들은 미완성 단계이며 일부 초안은 다소 가안입니다.
이것이 Houdini를 개발하는 초기 단계입니다.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="EUlIxr8mk7s"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

주의: 저는 Houdini 표준안에 대한 간단한 개요를 통해 Houdini에서 어떠한 문제를 풀고자 하는지 알려드리고 싶었습니다.
현재의 표준안이 지원 가능한 수준에서, 코드 샘플 또한 공유드립니다. 표준안들은 계속 수정되고 있음을 유념하시길 바랍니다.
향후에 본 글에서 설명하고 있는 코드의 결과는 정확하지 않을 수 있고, 일부 표준안의 내용은 공식 표준이 되지 않을 수 있습니다.

## 표준안

### Worklets
([spec][Worklets spec])

Worklets 자체는 큰 의미가 있지 않습니다. Worklets는 다른 연관 표준안을 가능하게 하기 위해 도입된 개념입니다.
“Worklet”을 접했을 때 Web Workers가 생각난다면 틀린 것이 아닙니다. 이 둘은 많은 개념적인 유사성을 가지고 있습니다.
그렇다면 이미 Workers가 있는데 왜 새로운 개념이 생겼을까요? Houdini의 목표는 웹 개발자가 자신의 코드를 CSS 엔진과
주변 시스템에 연결할 수 있도록 새로운 API를 제공하는 것입니다.  아마도 이러한 코드의 일부를 모든 단일 프레임에서
실행한다고 가정해보는 것은 비현실적이지는 않습니다. 어쩌면 그렇게 되는 것이 당연합니다.
[Web Worker 표준]에는 다음과 같은 내용이 있습니다.:

> Workers [...] 는 상대적으로 무거우며 한 페이지에 많은 수의 Workers 사용은 권장하지 않습니다. 예를 들어 4 mega pixel
이미지의 각 pixel마다 하나의 Worker를 생성하는 것은 적절하지 않습니다.

이는 곧 web workers가 Houdini가 하려고 했던 것을 하기에는 무리라는 의미입니다. 따라서 worklets이 만들어졌습니다.
Worklets은 ES2015의 class들을 써서 method 집합들, worklet의 미리 정의된 타입인 signature들을 정의합니다.
그렇기 때문에 Worklet은 보다 경량화가 되었으며 수명 주기가 짧습니다.

### CSS Paint API
([spec][Paint Worklet spec])

**Status update:** Paint API는 Chrome 65의 기본 기능으로 제공됩니다. 자세한 내용은 [여기](/web/updates/2018/01/paintapi)를 참고해주세요.

### Compositor worklet

참고: 이 곳에 서술된 API는 더 이상 사용되지 않습니다. Compositor worklet 는 현재 “Animation Worklet”으로
새로 디자인되었습니다. 해당 API에 대한 더 자세한 사항은
[여기](https://dassur.ma/things/animworklet/)에서 찾아보실 수 있습니다.

Compositor Worklet이 WICG로 옮겨졌고 계속 내용이 바뀌고 있지만, 저에게는 가장 흥미로운 표준안입니다. 아시다시피 일부 작업은 CSS 엔진에 의해 그래픽 카드로 아웃소싱되며 일반적으로 그래픽 카드와 장치 모두에 의존합니다. 브라우저는 일반적으로 DOM 트리를 사용하고 특정 기준에 따라 일부 branch 혹은 하위 트리에 자체 [레이어][HTML5Rocks layers]를 공개합니다.
이러한 하위 트리는 스스로 해당 레이어에 그립니다. (향후에는 paint worklet을 사용하여 그릴 수도 있겠죠!) 마지막 단계로, 페인트 과정이 완료된 모든 개별 레이어는 z-index, 3D Transform등을 고려하여 서로 중첩이 되어 화면에 보이는 최종 이미지를 완성합니다. 이 프로세스를 “컴포지팅 (Compositing)”이라고 하며 컴포지터(Compositor)가 실행합니다. 이 프로세스의 장점은 페이지가 조금 스크롤될 때 *모든* 요소를 다시 그릴 필요가 없다는 것입니다. 대신, 이전 프레임에서 레이어를 재사용하고 변경된 스크롤 위치로 컴포지터를 다시 실행할 수 있습니다. 이로 인하여 빠른 처리가 가능합니다. 이는 60fps를 맞출수 있게 해줍니다. 이런 성능 개선은 [Paul Lewis]를 행복하게 해줍니다!

<img src="/web/updates/images/2016/05/houdini/compworklet_small.png">

이름에서 알 수 있듯이 compositor worklet을 사용하면 컴포지션에 연결하여 이미 그린 레이어의 요소 레이어를 다른 레이어 위에 배치하고 레이어에 적용하는 방식에 영향을 줄 수 있습니다. 좀 더 구체적으로 설명하면, 특정 DOM 노드의 컴포지팅 과정에 연결하고 스크롤 위치, `transform` 또는 `opacity`와 같은 특정 속성에 대한 액세스를 요청할 수 있다고 브라우저에 알릴 수 있습니다. 이러한 방법으로 해당 요소는 자체의 레이어에서, 또한 여러분의 코드는 *각 프레임*에서 실행되게 해줍니다. 여러분은 레이어 변환을 조작하여 레이어를 이동시킬 수 있고 레이어의 속성 (`opacity` 같은)을 변경하여 60fps에서 실행되는 무엇인가 매우 멋진 것들을 구현할 수 있습니다. 다음 예제는 compositor worklet을 사용하여 parallax scrolling을 구현한 *전체* 코드입니다.

    // main.js
    window.compositorWorklet.import('worklet.js')
      .then(function() {
        var animator = new CompositorAnimator('parallax');
        animator.postMessage([
          new CompositorProxy($('.scroller'), ['scrollTop']),
          new CompositorProxy($('.parallax'), ['transform']),
        ]);
      });

    // worklet.js
    registerCompositorAnimator('parallax', class {
      tick(timestamp) {
        var t = self.parallax.transform;
        t.m42 = -0.1 * self.scroller.scrollTop;
        self.parallax.transform = t;
      }

      onmessage(e) {
        self.scroller = e.data[0];
        self.parallax = e.data[1];
      };
    });


저의 동료 Robert Flack이 Compositor Worklet을 위한 [polyfill][CompWorklet polyfill]을
구현했으니 사용해보세요 - 확실히 성능이 향상된 것을 볼 수 있습니다.

### Layout worklet
([spec][Layout Worklet spec])

참고: 첫 공식 표준안이 제안되었음 표준안의 구현도 상당히 진행되었습니다.

다시 말하지만, 본 표준안의 실질적인 내용은 그리 많지는 않으나, 개념은 흥미롭습니다.: 여러분만의 레이아웃을 작성해보세요!
Layout Worklet은 여러분이 `display: layout('myLayout')`와 같은 자바스크립트를 코드를 작성하면
이를 실행하여 구현 내용에 따라 특정 노드의 box안에 해당 노드의 자식 요소들을 배치합니다.
물론, CSS `flex-box` Layout을 모두 자바스크립트로 구현하는 것은 동일한 기능을 native에서
실행하는 것보다 느리겠지만 성능 상의 이득을 얻을 수 있는 지름길을 택하는 시나리오를 생각해볼 수 있습니다.
 Windows 10 또는  [Masonry] 스타일의 레이아웃으로 구성된 웹 페이지를 상상해보세요. absolute/fixed positioning은 사용되지 않으며,
`z-index` 나 요소가 겹치거나 어떤 종류의 border 혹은 overflow도 없습니다. 재 레이아웃 시 이러한 모든 검사를 건너뛸 수 있으면 성능이 향상될 수 있습니다.


    registerLayout('random-layout', class {
        static get inputProperties() {
          return [];
        }
        static get childrenInputProperties() {
          return [];
        }
        layout(children, constraintSpace, styleMap) {
            Const width = constraintSpace.width;
            Const height =constraintSpace.height;
            for (let child of children) {
                const x = Math.random()*width;
                const y = Math.random()*height;
                const constraintSubSpace = new ConstraintSpace();
                constraintSubSpace.width = width-x;
                constraintSubSpace.height = height-y;
                const childFragment = child.doLayout(constraintSubSpace);
                childFragment.x = x;
                childFragment.y = y;
            }

            return {
                minContent: 0,
                maxContent: 0,
                width: width,
                height: height,
                fragments: [],
                unPositionedChildren: [],
                breakToken: null
            };
        }
    });


### Typed CSSOM
([spec][Typed CSSOM spec])

참고: Chrome Canary에서 “Experimental Web Platform features” 플래그를 설정하시면
 “거의 완성된” 구현을 사용해볼 수 있습니다.

Typed CSSOM (CSS 객체 모델 혹은 계층 스타일 시트 객체 모델)은 아마 이제까지 우리들 모두가 마주했으며
참아왔었던 문제들을 다룹니다. 자바스크립트 코드로 설명해보겠습니다:


    $('#someDiv').style.height = getRandomInt() + 'px';


위의 코드에서는 덧셈 연산이 이루어지며 숫자를 문자열 형식으로 변환한 뒤 단위에 해당하는
문자열도 더하여 해당 문자열을 브라우저가 파싱하고 그것을 다시 숫자로 변환하여 CSS 엔진이 처리하도록 합니다.
이 과정은 여러분이 [자바스크립트로 변형 속성을 변경하려 할 때][Aerotwist FLIP] 더 복잡해집니다.
더 이상 이런 일은 없습니다! CSS로 타이핑을 할 수 있습니다!

이 표준안은 Houdini 표준안 중에서 완성도가 높은 표준안이며 [polyfill][Typed CSSOM polyfill]은 이미 작업 중입니다.
(주의 사항: polyfill을 사용하면 분명히 *더 많은* 계산 오버헤드가 들 것입니다.
  요점은 API가 얼마나 편리한지 보여주는 것입니다.)

여러분은 문자열 대신에 요소의 `StylePropertyMap`에서 작업 하게 됩니다. `StylePropertyMap`에서
 각 CSS 속성은 자체의 키와 그에 해당하는 값 유형을 가집니다.
 `width`와 같은 속성의 값 유형으로는 `LengthValue`가 있습니다. `LengthValue`는
`em`, `rem`, `px`, `percent` 등과 같은 모든 CSS 단위를 의미합니다.
`height: calc(5px + 5%)`로 명시하는 것은 `LengthValue{px: 5, percent: 5}`와 동일한 의미입니다.
`box-sizing`과 같은 일부 속성은 특정 키워드를 값으로 가지므로 `KeywordValue`를 값 유형로 가집니다.
이러한 해당 속성들의 유효성은 런타임에 확인할 수 있습니다.


    <div style="width: 200px;" id="div1"></div>
    <div style="width: 300px;" id="div2"></div>
    <div id="div3"></div>
    <div style="margin-left: calc(5em + 50%);" id="div4"></div>
    var w1 = $('#div1').styleMap.get('width');
    var w2 = $('#div2').styleMap.get('width');
    $('#div3').styleMap.set('background-size',
      [new SimpleLength(200, 'px'), w1.add(w2)])
    $('#div4')).styleMap.get('margin-left')
      // => {em: 5, percent: 50}


### Properties and values
([spec][Properties and Values spec])

참고: 표준안은 상당히 완성되었습니다. 하지만 아직 사용 가능한 구현은 없습니다.

[CSS Custom Properties] (비공식적으로는 “CSS Variables”로도 불립니다.) 를 아시나요?
이것은 타입이 있는 변수입니다! 지금까지, 변수들은 string 값들 만을 가지거나
간단한 검색 및 교체 방식을 사용했습니다. 이 표준안은 여러분이 변수에 대한 유형을 정의할 수 있게 해줄 뿐만 아니라 기본값을 정의하고
자바스크립트 API를 이용해서 상속 과정에도 영향을 줍니다. 이론적으로, 이를 이용하면
표준 CSS 전환을 사용하여 사용자 정의 속성에 애니메이션을 적용할 수 있고
비슷하게 애니메이션 표준에 응용하는 것도 논의되고 있습니다.


    ["--scale-x", "--scale-y"].forEach(function(name) {
    document.registerProperty({
        name: name,
        syntax: "<number>",
        inherits: false,
        initialValue: "1"
      });
    });


### Font metrics

Font metrics는 들리는 바로 그대로를 의미합니다. 만일 제가 문자열 X를 Y폰트의 Z크기로 렌더한다면
bounding box(혹은 다수의 bounding box들)은 어떻게 될까요? 만약 제가 [ruby annotations]로
복잡한 unicode를 사용한다면요? 이러한 기능은 예전부터 요청되었는데, 드디어 Houdini에서 현실화되었습니다.

### 잠시만요, 아직 끝이 아닙니다!

Houdini의 초안 목록에는 더 많은 사양이 있습니다. 해당 내용들이 앞으로 지원 가능할지는
다소 불확실하지만 아이디어는 무궁무진합니다. 예를 들면, 사용자 정의 overflow 동작,
CSS 구문 확장 API, 네이티브 스크롤 동작 확장 그리고 이와 유사하게 이제까지
웹 플랫폼이 하지 못했던 것을 가능하게 하는 야심찬 아이디어들이 있습니다.

## 데모

제가 만든 [데모 코드][Houdini Samples]와 (polyfill을 사용한 [live demo][Houdini Demo]) 비디오를 공개하였으니
실제로 worklet이 어떻게 동작하는지 살펴보세요. 앞으로도 Canary에서 지원 가능한 새로운 API들을 기반으로 새로운 데모들을 업데이트할 것입니다.

함께 참여하고 싶으시다면 언제든지 [Houdini 메일링 리스트]에 문의하세요.

[Houdini Drafts]: http://dev.w3.org/houdini/
[Worklets spec]: https://drafts.css-houdini.org/worklets/
[Web Worker spec]: https://www.w3.org/TR/workers/
[Paint Worklet spec]: https://drafts.css-houdini.org/css-paint-api/
[Fragmentation spec]: https://www.w3.org/TR/css3-break/
[HTML5Rocks layers]: http://www.html5rocks.com/en/tutorials/speed/layers/
[Paul Lewis]: https://twitter.com/aerotwist
[Layout Worklet spec]: https://drafts.css-houdini.org/css-layout-api/
[Masonry]: http://masonry.desandro.com/
[Typed CSSOM spec]: https://drafts.css-houdini.org/css-typed-om/
[Aerotwist FLIP]: https://aerotwist.com/blog/flip-your-animations/#got-code
[Typed CSSOM polyfill]: https://github.com/css-typed-om/typed-om
[ruby annotations]: https://en.wikipedia.org/wiki/Ruby_character
[Properties and Values spec]: https://drafts.css-houdini.org/css-properties-values-api/
[Houdini Samples]: https://github.com/GoogleChrome/houdini-samples
[Houdini 메일링 리스트]: https://lists.w3.org/Archives/Public/public-houdini/
[CompWorklet Polyfill]: https://github.com/googlechrome/houdini-samples
[Web Components]: http://webcomponents.org/
[parallax scrolling]: https://en.wikipedia.org/wiki/Parallax_scrolling
[CSS Custom Properties]: https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care
[Houdini Demo]: https://googlechrome.github.io/houdini-samples/animation-worklet/twitter-header/
[Paint Worklet demo]: http://googlechrome.github.io/houdini-samples/paint-worklet/ripple/
[Paint Worklet source]: https://github.com/GoogleChrome/houdini-samples/tree/master/paint-worklet/ripple


Translated By:
{% include "web/_shared/contributors/jihyerish.html" %}
