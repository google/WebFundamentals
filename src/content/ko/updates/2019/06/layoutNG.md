project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chromium의 새로운 레이아웃 엔진

{# wf_published_on: 2019-06-06 #}
{# wf_updated_on: 2019-06-10 #}
{# wf_featured_image: /web/updates/images/2019/06/layoutNG-header.jpg #}
{# wf_tags: layout,performance,chrome76,layoutng #}
{# wf_featured_snippet: LayoutNG is a new layout engine for Chromium that has been designed for the needs of modern scalable web applications. It improves performance isolation, better supports scripts other than Latin, and fixes many float, margin, and web compatibility issues. #}
{# wf_blink_components: N/A #}

# LayoutNG {: .page-title }

{% include "web/_shared/contributors/emilaeklund.html" %}

Chrome76에 릴리즈 예정인 LayoutNG는 다년간의 노력을 기울이고 있는 새로운 레이아웃 엔진입니다. 몇가지 흥미로운 개선사항이 있으며, 추가적으로 성능 향상과 고급 레이아웃 기능이 제공될 예정입니다. 

## What's new?

1. 성능 격리를 향상시키다.
2. 로마자 외에 대한 **더 나은 지원**
3. floats, margins에 대한 **이슈 해결**
4. 웹 호환성 **이슈 해결**

LayoutNG는 **단계적으로 실행**된다는 점에 유의하세요. 
Chrome 76에서 LayoutNG는 inline, block 레이아웃에 적용됩니다. 그 외 레이아웃(table, flexbox, grid, block fragmentation 같은)은 후속 릴리스에서 제공할 예정입니다.

### 개발자가 확인할 수 있는 변경 사항

사용자가 알아볼 수 있는 영향은 최소화되어야 하지만, LayoutNG는 매우 미묘하게 동작을 변경하고 수백 가지 테스트를 수정하며, 다른 브라우저와의 호환성을 향상시킵니다. 우리 최선의 노력에도 불구하고, 일부 사이트와 애플리케이션들에서 약간 다르게 렌더링 하거나 동작할 수 있습니다.

성능 특성도 상당히 다릅니다. 전체적인 성능은 이전과 비슷하거나 약간 더 좋지만, 특정 사례에서는 성능이 개선될 가능성이 높은 반면, 그 외 사례에서는 단기적으로는 다소 후퇴할 것으로 예상됩니다.

## Floats

LayoutNG 재구성은 다른 콘텐츠와 연관된 플롯 배치의 정확성 문제를 해결하는 플로팅 요소(`float: left;`, `float: right;`)를 지원합니다.

#### 중첩된 콘텐츠

과거의 플롯 구현은 플로팅 요소 주변에 콘텐츠를 배치할 때 마진을 정확하게 계산하지 못하여, 플롯 자체를 부분적으로 또는 완전히 겹치게 했습니다. 이 버그는 일반적으로 이미지가 단락 옆에 위치할 때 나타납니다. 
이 버그는 일반적으로 회피 로직이 선의 높이를 계산하지 못하는 단락 옆에 이미지를 배치할 때 나타납니다.
([Chromium bug #861540](https://crbug.com/861540)를 참조하세요.)

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/legacy_float_margin.png" alt="top text line shown overlaying floated image">
  <figcaption>
    <small>Fig 1a, Legacy layout engine</small><br> 텍스트가 우측의 플롯된 이미지와 겹침
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/ng_float_margin.png" alt="proper text on left and floated image on right">
  <figcaption>
    <small>Fig 1b, LayoutNG</small><br> 텍스트는 우측의 플롯된 이미지 옆에 배치 </figcaption>
</figure>
<div class="clearfix"></div>

동일한 문제가 한 줄에서 발생할 수 있다. 다음 예제는 플롯 요소 다음에 음수 마진을 가진 요소([#895962](https://crbug.com/895962))를 보여줍니다. 텍스트는 플롯과 겹치지 않아야 합니다.

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/legacy_float_overlap.png" alt="text line shown overlaying an orange box">
  <figcaption>
    <small>Fig 2a, Legacy layout engine</small><br>
    텍스트가 플롯된 오렌지 요소와 겹침
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/ng_float_overlap.png" alt="proper text on right of orange box">
  <figcaption>
    <small>Fig 2b, LayoutNG</small><br>
    텍스트는 플롯된 오렌지 요소 옆에 배치
  </figcaption>
</figure>
<div class="clearfix"></div>

#### 컨텍스트 위치 구성 방식

블록 서식 컨텍스트를 형성하는 요소가 플롯된 다음에 크기를 설정할 때, 
레거시 레이아웃 엔진은 포기하기 전까지 고정된 횟수로 블록의 크기를 조정하려 시도합니다. 이 접근 방식은 예측할 수 없고 불안정한 행동으로 이어지며, 다른 동작과 일치하지 않습니다. LayoutNG에서는 블록의 크기를 조정할 때 모든 플롯을 고려합니다.
([Chromium bug #548033](https://crbug.com/548033)를 참조하세요.)

Absolute, fixed 배치는 W3C 사양을 보다 더 준수하며 다른 브라우저의 동작과 더 일치합니다. 두 경우에서 가장 두드러지는 두 가지 차이:

- **블록을 포함한 다중 라인의 인라인 요소** <br>absolute 배치의 경우, 다중 라인의 블록 span을 포함하면 레거시 엔진은 블록의 경계를 계산하기 위해 라인의 일부를 부정확하게 사용할 수 있다.
- **수직 쓰기 모드** <br>레거시 엔진은 수직 쓰기 모드에서 문서의 흐름을 벗어난 요소의 기본 위치에 많은 이슈가 있었습니다. 향상된 쓰기 모드 지원에 대한 자세한 내용은 다음 섹션에서 확인할 수 있습니다.

## Right-to-left (RTL) 언어 및 수직 쓰기 모드

LayoutNG는 처음부터 양방향 콘텐츠를 포함하여 수직 쓰기 모드와 RTL 언어를 지원하도록 설계되었습니다.

### 양방향 텍스트

LayoutNG는 [The Unicode Standard](https://unicode.org/standard/standard.html)에서 정의한 최신 양방향 알고리즘을 지원합니다.
이 업데이트는 다양한 렌더링 오류를 해결할 뿐 아니라, paired bracket 지원 등의 누락된 기능을 포함합니다.
([Chromium bug #302469](https://crbug.com/302469)를 참조하세요.)

#### 직교 흐름

LayoutNG는 수직 흐름 레이아웃의 정확도를 향상시킵니다. 예를 들어,
absolute 배치된 요소의 위치 및 직교 흐름 박스의 크기(특히 백분율을 사용하는 경우)를 조정하면,
W3C Test Suites의 1,258개 테스트 중 **과거의 레이아웃 엔진에서 실패한 103개의 테스트가 LayoutNG에서 통과합니다.**

#### 본질적인 크기 조정

직교 쓰기 모드의 하위에 블록을 포함하면 본질적인 크기가 올바르게 계산됩니다.

### 텍스트 레이아웃 및 줄바꿈

레거시 레이아웃 엔진은 텍스트 요소를 요소별, 행별로 배열했습니다.
이 접근 방식은 대부분 잘 작동했지만 스크립트를 지원하고 좋은 성능을 얻기 위해 많은 복잡성이 필요했습니다. 또한 측정 불일치가 발생하기 쉬워, 내용에 따라 크기가 조정되는 컨테이너의 크기 조정과 그 내용 또는 불필요한 줄바꿈에 미묘한 차이가 발생했습니다.

LayoutNG에서 텍스트는 단락 레벨에서 배열한 후 다음 행으로 분할합니다.
이를 통해 더 나은 성능, 고품질의 텍스트 렌더링 및 일관된 줄바꿈이 가능해집니다. 가장 눈에 띄는 차이는 아래에 자세히 설명합니다.

#### 요소 경계를 넘어서 결합

일부 스크립트에서는 인접한 특정 문자를 시각적으로 결합할 수 있습니다. 
아랍어에서 이 예제 확인해보세요:

LayoutNG에서 이제는 문자가 다른 요소에 있어도 결합합니다.
다양한 스타일이 적용될 때 결합은 유지됩니다.
([Chromium bug #6122](https://crbug.com/6122)를 참조하세요.)

> **낱글자**는 언어의 작문 시스템 중 가장 작은 단위입니다. 예를 들어, 영어와 알파벳을 사용하는 다른 언어에서 각각의 글자는 낱글자입니다.

아래 이미지는 레거시 레이아웃 엔진과 LayoutNG에서의 HTML 렌더링을 보여줍니다:

```html
<div>&#1606;&#1587;&#1602;</div>
<div>&#1606;&#1587;<span>&#1602;</span></div>
```

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/legacy_shape.png" alt="proper grapheme on left and separated improper rendering on right">
  <figcaption>
    <small>Fig 3a, Legacy layout engine</small><br>
두번째 글자의 모양이 어떻게 바뀌는지 주목하세요.
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/ng_shape.png" alt="proper combined graphemes shown">
  <figcaption>
    <small>Fig 3b, LayoutNG</small><br>
    두 버전은 이제 동일합니다.
  </figcaption>
</figure>
<div class="clearfix"></div>

### Chinese, Japanese, and Korean (CJK) 합자

비록 Chromium은 이미 합자를 지원하고 기본적으로 가능하지만,
약간의 제약이 있습니다: 여러 개의 CJK 코드포인트가 포함된 합자는 렌더링 최적화 때문에 레거시 레이아웃 엔진에서 지원하지 않습니다.
LayoutNG는 이 제약을 제거하고 문자에 관계없이 합자를 지원합니다.

아래의 예는 Adobe SourceHanSansJP 글꼴을 사용하는 3개의 임의 합자의 렌더링을 보여줍니다:

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/legacy_dlig_jp.png" alt="middle character combination not forming ligature">
  <figcaption>
    <small>Fig 4a, Legacy layout engine</small><br>
    MHz는 정확하게 합자를 형성합니다.<br>
    그러나 マンション, 10点는 그렇지 않습니다. 
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/ng_dlig_jp.png" alt="proper ligatures shown">
  <figcaption>
    <small>Fig 4b, LayoutNG</small><br>
 세 그룹 모두 합자를 예상대로 형성합니다.
  </figcaption>
</figure>
<div class="clearfix"></div>

### Size-to-content 요소

Size-to-content(인라인 블록 같은) 요소의 경우 현재 레이아웃 엔진은 먼저 블록의 크기를 계산한 다음 내용에 대한 레이아웃을 수행합니다.
글꼴이 적극적으로 커닝하는 경우, 
이로 인해 콘텐츠의 크기와 블록간의 부조화가 발생할 수 있습니다. LayoutNG에서 블록은 실제 내용에 따라 크기가 정해지기 때문에 이 장애 모드는 제거되었습니다.

아래의 예는 내용에 맞는 크기의 노란색 블록을 보여줍니다. 커닝을 사용하여 T와 - 사이의 간격을 조정하는 Lato 글꼴을 사용합니다. 
노란 상자의 경계는 텍스트의 경계와 일치해야합니다.

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/kern_legacy.png" alt="trailing whitespace shown at the end of the text container">
  <figcaption>
    <small>Fig 5a, Legacy layout engine</small><br>
마지막 T 후의 공백에 주목하세요.
  </figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/kern-ng.png" alt="text bounds have no extra space">
  <figcaption>
    <small>Fig 5b, LayoutNG</small><br>
    박스의 왼쪽, 오른쪽 가장자리가 문자의 경계와 일치하는 방식에 주목하세요.
  </figcaption>
</figure>
<div class="clearfix"></div>

#### 줄바꿈

위에서 설명한 문제와 마찬가지로, size-to-content 블록의 콘텐츠가 블록보다 더 큰(넓은) 경우, 콘텐츠가 불필요하게 줄바꿈 될 수 있습니다.
이것은 상당히 드물지만 때로는 혼합된 방향성 콘텐츠에서 발생합니다.

<figure class="attempt-left" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/legacy_ar_wrap.png" alt="premature line break shown causing extra space">
  <figcaption>
    <small>Fig 6a, Legacy layout engine</small><br>
불필요한 줄바꿈 및 오른쪽 여분의 공간을 주목하세요.</figcaption>
</figure>
<figure class="attempt-right" style="text-align:center;">
  <img loading="lazy" src="/web/updates/images/2019/06/ng_ar_wrap.png" alt="no unnecessary space or line breaks shown">
  <figcaption>
    <small>Fig 6b, LayoutNG</small><br>
    박스의 왼쪽, 오른쪽의 가장자리가 문자의 경계와 일치하는 방식에 주목하세요.
  </figcaption>
</figure>
<div class="clearfix"></div>

## 추가 정보

- [LayoutNG README](https://chromium.googlesource.com/chromium/src/+/master/third_party/blink/renderer/core/layout/ng/README.md)
- [Layout NG design document](https://docs.google.com/document/d/1uxbDh4uONFQOiGuiumlJBLGgO4KDWB8ZEkp7Rd47fw4/)
- [Master tracking bug](https://crbug.com/591099)

LayoutNG에서 수정한 특정 호환성 문제 및 버그에 대한 자세한 내용은 위의 링크를 참조하세요. 또는 Chromium Bug Database에서 [Fixed-In-LayoutNG](https://bugs.chromium.org/p/chromium/issues/list?can=1&q=label%3AFixed-In-LayoutNG)로 표시된 버그를 검색할 수 있습니다.

LayoutNG로 인해 웹 사이트가 중단된 것으로 의심되는 경우, [file a bug report](https://bugs.chromium.org/p/chromium/issues/entry?summary=%5BLayoutNG%5D+Enter+one-line+summary&labels=LayoutNG&components=Blink%3ELayout)를 제출하면 우리가 살펴보겠습니다.

## 피드백 {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
