project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 반응형 웹 디자인 패턴은 빠르게 진화하고 있지만, 데스크톱 및 휴대기기에서 잘 작동하는 확립된 패턴은 소수입니다.

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-29 #}

# 반응형 웹 디자인 패턴 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

반응형 웹 디자인 패턴은 빠르게 진화하고 있지만, 데스크톱 및 모바일 장치에서 잘 작동하는 확립된 패턴은 소수입니다.

반응형 웹 페이지에 사용되는 대부분의 레이아웃은 유동형,
열 끌어놓기, 레이아웃 시프터, 미세 조정 및 오프 캔버스라는 5가지 패턴 중
하나로 분류될 수 있습니다. 일부 경우에 페이지에 패턴 조합(예: 열 끌어놓기 +
오프 캔버스)을 사용할 수 있습니다.  [Luke
Wroblewski](http://www.lukew.com/ff/entry.asp?1514)가 처음으로 식별한 이러한 패턴은 모든 반응형
페이지에 강력한 시작점을 제공합니다.

### 패턴

간단하고 쉽게 이해할 수 있도록, [`flexbox`](https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Flexible_boxes)를 사용하여
아래의 각 샘플을 생성했습니다. 이때 일반적으로 기본 컨테이너 `div` 내에
3개의 콘텐츠 `div`가 포함됩니다.
 각 샘플은 먼저 가장 작은 뷰부터 작성되고 필요한 경우 중단점을
추가했습니다.  최적의 지원을 위해 공급업체 프리픽스가 필요할 수도 있지만 최신 브라우저에서 [flexbox 레이아웃 모드가 잘 지원됩니다](http://caniuse.com/#search=flexbox).



## 유동형(Mostly Fluid)

유동형 패턴은 주로 유동형 그리드로 구성됩니다.  더 넓은 화면에서는
여백만 조정하므로, 대형 화면이나 중형 화면에서
이 패턴은 일반적으로 동일한 크기를 유지합니다.

더 작은 화면에서는 열이 수직 방향으로 쌓이면서 기본 콘텐츠가 재배치됩니다.
  이 패턴의 한 가지 주요 이점은 대개 소형 화면과 대형 화면에서 하나의 중단점만 필요하다는 것입니다.



<img src="imgs/mostly-fluid.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/mostly-fluid.html" class="button button-primary">체험해 보기</a>

가장 작은 뷰에서 각 콘텐츠 `div`가 수직으로 쌓입니다.  화면 너비가 600px에 도달하면
기본 콘텐츠 `div`가 `width: 100%`로 유지되지만 보조 `div`는 기본 `div` 아래
2열로 나타납니다.  800px를
넘으면 컨테이너 `div`는 너비가 고정되고 화면 중앙에 배치됩니다.

다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [A List Apart](http://mediaqueri.es/ala/){: .external }
 * [Media Queries](http://mediaqueri.es/){: .external }
 * [SimpleBits](http://simplebits.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/mostly-fluid.html" region_tag="mfluid" adjust_indentation="auto" %}
</pre>

## 열 끌어놓기(Column Drop) 

전체 너비가 가득 찬 다중 열 레이아웃의 경우, 열 끌어놓기는
창 너비가 콘텐츠에 비해 너무 좁아지면 열을 수직으로 쌓습니다.

결국 모든 열이 수직으로 쌓이게 됩니다.  이 레이아웃 패턴의 중단점 선택은 콘텐츠에 따라 다르며 디자인에 따라 변할 수 있습니다.



<img src="imgs/column-drop.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/column-drop.html" class="button button-primary">체험해 보기</a>

유동형 샘플처럼 콘텐츠는 가장 작은 뷰에서 수직으로 쌓이지만, 화면이 600px 이상으로 커지면 기본 및 보조 콘텐츠 `div`가 화면의 전체 너비를 차지합니다.

  `div`의 순서는 order CSS 속성을 사용하여 설정됩니다.
  800px에서는 전체 화면 너비에 3개의 콘텐츠 `div`가 모두 표시됩니다.


다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [Modernizr](https://modernizr.com/){: .external }
 * [Wee Nudge](http://weenudge.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/column-drop.html" region_tag="cdrop" adjust_indentation="auto" %}
</pre>

## 레이아웃 시프터(Layout shifter)

레이아웃 시프터 패턴은 반응성이 가장 뛰어난 패턴이며,
여러 화면 너비에 복수의 중단점이 있습니다.

이 레이아웃의 핵심은 다른 열 아래로 이동 및 재배치하는 방식이 아니라 콘텐츠의 자리 이동 방식에 있습니다.
  각 주요 중단점 간의 현저한 차이로 인해 유지 관리하기가 훨씬 복잡하고 전체 콘텐츠 레이아웃뿐만 아니라 요소 내의 변경도 포함합니다.



<img src="imgs/layout-shifter.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/layout-shifter.html" class="button button-primary">체험해 보기</a>

이 간단한 레이아웃 시프터 패턴의 예를 보면 작은 화면에서 콘텐츠가 수직으로 쌓이지만 화면이 커짐에 따라 한 `div`는 왼쪽에, 두 `div`는 오른쪽에 쌓이게 되는 큰 변화가 일어납니다.



다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [Food Sense](http://foodsense.is/){: .external }
 * [Seminal Responsive Design
  Example](http://alistapart.com/d/responsive-web-design/ex/ex-site-FINAL.html)
 * [Andersson-Wise Architects](http://www.anderssonwise.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/layout-shifter.html" region_tag="lshifter" adjust_indentation="auto" %}
</pre>

## 미세 조정(Tiny tweaks)

미세 조정은 글꼴 크기 미세 조정, 이미지 크기 미세 변경 또는
콘텐츠 미세 이동 등과 같이 레이아웃을 약간 변경합니다.

이 패턴은 1페이지 선형 웹사이트, 텍스트가 많은 문서 등 단일 열 레이아웃에서 잘 작동합니다.

<img src="imgs/tiny-tweaks.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/tiny-tweaks.html" class="button button-primary">체험해 보기</a>

이름에서 알 수 있듯이 이 샘플은 화면 크기의 변화에 비해 변화가 많지 않습니다.
화면 너비가 커질수록 글꼴 크기와 여백도 커집니다.

다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [Ginger Whale](http://gingerwhale.com/){: .external }
 * [Future Friendly](http://futurefriendlyweb.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/tiny-tweaks.html" region_tag="ttweaks" adjust_indentation="auto" %}
</pre>


## 오프 캔버스(Off canvas)

오프 캔버스 패턴은 콘텐츠를 수직으로 쌓지 않고
사용 빈도가 낮은 콘텐츠(예: 탐색 또는 앱 메뉴)를 화면 밖에 배치하고,
화면 크기가 충분히 커지면 표시하고, 작은 화면에서는
클릭했을 때만 보여줍니다.

<img src="imgs/off-canvas.svg">
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/responsive/off-canvas.html" class="button button-primary">체험해 보기</a>

이 샘플은 콘텐츠를 수직으로 쌓지 않고 `transform: translate(-250px, 0)` 선언을 사용하여 두 개의 콘텐츠 `div`를 화면에서 숨깁니다.  자바스크립트를 사용하여 공개 클래스를 요소에 추가하여 보이게 만들어서 div를 표시할 수 있습니다.
  화면이 넓어짐에 따라 요소의 화면 밖 위치가 없어지고 가시적인 뷰포트 내에 요소가 표시됩니다.



이 샘플에서 Safari for iOS 6 및 Android Browser는 `flexbox`의 `flex-flow: row nowrap` 기능을 지원하지 않으므로, 절대 위치로 대체해야 했습니다.



다음은 이 패턴을 사용하는 사이트의 예입니다.

 * [HTML5Rocks 문서](http://www.html5rocks.com/en/tutorials/developertools/async-call-stack/)
 * [Google Nexus](https://www.google.com/nexus/){: .external }
 * [Facebook의 모바일 사이트](https://m.facebook.com/){: .external }

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/off-canvas.html" region_tag="ocanvas" adjust_indentation="auto" %}
</pre>


{# wf_devsite_translation #}
