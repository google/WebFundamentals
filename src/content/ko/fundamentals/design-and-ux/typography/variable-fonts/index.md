project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 우리는 가변 글꼴이 무엇이며, 이를 작업에서 어떻게 사용할 수 있는지 살펴볼 것입니다.

{# wf_updated_on: 2019-02-21 #} {# wf_published_on: 2018-02-19 #} {# wf_blink_components: Blink>Fonts #}

# 웹에서의 가변 글꼴에 대한 소개 {: .page-title}

{% include "web/_shared/contributors/mustafa.html" %}

이 기사에서는 가변 글꼴(variable fonts)이 무엇이고 이를 작업에서 어떻게 사용할 수 있는지와 함께 가변 글꼴의 잠재적 가능성을 살펴볼 것입니다. 그러나 가변 글꼴을 제대로 이해하기 위해서는, 우선 현재 웹에서 타이포그래피와 글꼴 로딩이 어떻게 작동하는지에 대해 알아보아야합니다.

## 소개

글꼴(font)과 서체(typeface)라는 용어는 개발 업계에서 비슷한 의미로 사용됩니다. 하지만 서체는 [Roboto](https://fonts.google.com/specimen/Roboto)와 같은 전체 디자인 모음이 포함되는 반면, 글꼴은 "Roboto Bold"나 "Roboto Italic"처럼 해당 제품군의 디지털 파일 중 하나를 일컫습니다. 다시 말해서, 서체는 당신이 *보는* 것이고, 폰트는 당신이 *사용*하는 것입니다.

<div class="attempt-left">
  <figure>
    <img src="images/robot-specimen.png" alt="A specimen of Roboto">
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/roboto-family.png" alt="Different members of the Roboto family">
  </figure>
</div>
<div class="clearfix"></div>

위 사진은 Christian Robertson이 디자인하고 개발한 Roboto입니다. 왼쪽에는 Roboto 서체의 예시가 있고, 오른쪽에는 Roboto의 글꼴 모음에 포함된 다른 글꼴들이 있습니다.

### 디자이너와 개발자를 향한 도전

그래픽 디자이너는 작업을 준비할 때 일반적으로 사용된 모든 글꼴을 포함하는 방식으로 최종 아트워크를 내보내거나, 일반적인 웹 사이트처럼 사용된 모든 리소스들을 별도로 포함하는 방식으로 아카이브를 제공합니다. 렌더링되는 서체의 적합성(예 : 작은 사이즈일 때 읽을 수 있는가) 및 글꼴 사용에 관한 라이센스에 따라 디자이너가 들여야 하는 노력이 달라집니다.

웹에서는 이 두 가지 측면과 함께 관련된 네트워크 지연과 관련된 비용을 모두 고려해야 합니다. 사용자가 해당 텍스트를 보려면, 디자인에 사용된 서체 모음의 모든 구성 요소가 포함된 글꼴 파일을 다운로드해야 했습니다. 기본 글꼴과 함께 볼드체, 이탤릭체가 포함되어 있는 것만으로도 용량은 쉽게 500k 를 넘어서게 됩니다. 타이포그래피 경험을 풍부하게 만들기 위해서는 비용이 발생하기 때문에, 이것은 웹 디자이너와 개발자들에게 걸림돌이 되었습니다. 이것은 폰트가 어떻게 렌더링되는지, 그리고 우리가 사용할 폴백 또는 지연 로딩 패턴을 다루기 전입니다. (예 : ["FOIT" 및 "FOUT"](https://www.zachleat.com/web/fout-vs-foit/){: .external}).)

## 가변 글꼴의 분석

가변 글꼴은 일반적으로 '기본'이 되는 글꼴 스타일이 중앙 마스터가 되고, 중앙 마스터에 다른 마스터가 연결된 여러 개의 "축"이 있는 마스터 스타일의 집합입니다. 예를 들어 **두께(Weight)** 축은 얇은 스타일에서 시작하여 기본 스타일을 거쳐 굵은 스타일까지를 연결할 수 있습니다. 이 축을 따라 위치할 수있는 개별 스타일을 인스턴스(instance)라고 합니다.

예를 들어, 가변 글꼴인 [Amstelvar](https://github.com/TypeNetwork/Amstelvar){: .external}에는 **두께**축에 대한 세 가지 마스터가 있습니다. 기본 스타일의 두께는 축의 중심에 있으며, 축의 양쪽 끝으로 갈수록 두께가 얇아지거나 두꺼워집니다. 이 사이에는 디자이너 또는 개발자가 선택할 수 있는 200개의 인스턴스가 있습니다.

<figure>
  <img src="images/Amstelvar-Alpha-example.png" alt="Example of the Weight Axes for the typeface Amstelvar">
  <figcaption>Font Bureau의 활자 디자이너이자 타이포그래피 작가인 David Berlow가 디자인한 서체인 Amstelvar</figcaption>
</figure>

[OpenType 사양](https://docs.microsoft.com/en-gb/typography/opentype/spec/dvaraxisreg){: .external}에서는 **너비(Width)**, **광학 크기(Optical Size)**, **이탤릭체**, 및 **기울기**와 같은 다른 축을 지정합니다. 이 모든 축은 동일한 기본 마스터를 공유하며, 각 축들을 조합해서 기하급수적으로 많은 개수의 스타일을 찾아볼 수 있습니다.

Amstelvar는 또한 너비(Width)축에 3개의 마스터를 가지고 있습니다: 기본 스타일의 값은 축의 중심에 있으며, 축의 양쪽 끝으로 갈수록 너비가 좁아지거나 넓어집니다. 이것들은 기본 스타일의 모든 너비뿐만 아니라 모든 너비와 가중치를 결합하여 제공합니다.

Amstelvar의 등록된 축(너비, 무게 및 광학 크기)으로 수천 가지 스타일을 만들 수 있습니다. 이것은 과도하게 많아 보일 수도 있지만, Amstelvar는 라틴어 시스템만 지원한다는 점을 고려하십시오. 전 세계 모든 언어들과 오늘날의 타이포그래피 응용 프로그램의 필요성을 고려한다면 글꼴 내에서 다양한 유형의 스타일을 사용하여 읽기 환경의 품질을 크게 향상시킬 수 있습니다. 또한 디자인에 따라 다르긴 하지만, 성능 저하가 없는 경우 사용자는 원하는 만큼 스타일을 사용할 수 있습니다.

### 이탤릭체는 약간 다릅니다

가변 글꼴에서 기울임이 처리되는 방식은 두 가지 접근 방법이 있습니다. Helvetica 또는 Roboto와 같은 서체는 보간이 호환되는 윤곽을 가지므로,  로마체 및 이탤릭체 스타일 사이를 보간할 수 있기 때문에 **기울기(Slant)** 축을 사용하여 로마체에서 이탤릭체로 변환할 수 있습니다.

Garamond, Baskerville 또는 Bodoni와 같은 다른 서체에는 보간법과 호환되지 않는 로마체 및 이탤릭 문자 모양 윤곽선이 있습니다. 예를 들어, 로마체 소문자 "n"을 정의하는 윤곽선은 기울임 꼴 소문자 "n"을 정의하는 데 사용된 윤곽선과 일치하지 않습니다. 한 윤곽을 다른 윤곽으로 보간하는 대신 기울임 꼴 축은 로마체에서 **기울임 꼴**로 전환됩니다.

<figure>
  <img src="images/Amstelvar-Ital-axis.png" alt="Example of the Weight Axes for the typeface Amstelvar">
  <figcaption>기울임 꼴 (12 포인트, 일반 두께, 일반 너비) 및 로마체로 표시된 Amstelvar의 "n" 윤곽. Font Bureau의 타이프 그래프 디자이너이자 David Berlow가 제공한 이미지.</figcaption>
</figure>

문자 집합이 같아야하는 것처럼, 기울임 꼴로 전환 하더라도 사용자가 조절할 수 있는 축은 로마체와 동일해야합니다.

글리프(glyph, 글자의 모양) 대체 기능은 각 글자에서 찾아 볼 수 있으며, 가변 글꼴의 디자인 공간 어디에서나 사용할 수 있습니다. 예를 들어 큰 포인트 크기에서는 두 개의 세로줄이 있는 달러 기호 디자인이 잘 보이지만, 작은 포인트 크기에서는 세로줄이 하나만 있는 디자인이 더 좋습니다. 글리프를 렌더링 할 픽셀이 더 적을 경우에는 두 개의 세로줄 디자인이 읽기 어렵기 때문입니다. 이탤릭 축과 마찬가지로, 이 문제를 해결하기 위해 글꼴 디자이너가 결정한 지점에서 **광학 크기** 축을 따라 특정 글리프를 다른 글리프로 대체할 수 있습니다.

요약하면 윤관석이 허용되는 한, 글꼴 디자이너는 다차원 디자인 공간에서 다양한 마스터 간에 보간되는 글꼴을 만들 수 있습니다. 이를 통해 타이포그래피와 함께 풍부한 기능들을 섬세하게 제어할 수 있습니다.

## 축(Axes)의 정의

글꼴 개발자가 글꼴에서 사용할 수 있는 축을 정의하기 때문에, 글꼴 설명서에서 어떤 항목들이 사용 가능한지를 확인해야합니다. 예를 들어 Christoph Koeberlin이 디자인 한 Gingham 가변 글꼴에는 너비와 무게 이 두 개의 축이 있습니다. Amstelvar 변수 글꼴에는 경사 축이 포함되어 있지 않지만 그레이드(Grade)를 호출하는 축과 더 많은 축이 있습니다.

그레이드 축은 너비를 변경하지 않고 글꼴의 두께를 변경하므로 줄 바꿈에 영향을 끼치지 않기 때문에 흥미롭습니다. 그레이드 축을 조절함으로써 글꼴의 두께 변경이 전체 글자들의 너비, 두께에 영향을 끼칠 수 있을지에 대해 신경쓰지 않아도 됩니다. 이는 Amstelvar 기본 스타일이 '검은 색 또는 양수 모양', '흰색 또는 음수 모양', 'x값' 및 'y값'의 네 가지 기본 형태로 해체 되었기 때문에 가능합니다. 원색들을 혼합하여 다양한 색을 만들 수 있듯이, 이 네 가지 측면들 역시 너비 축과 두께 축 같은 다른 스타일과 혼합하여 새로운 스타일을 만들 수 있습니다.

<figure>
  <img src="images/amstel-grade-e.gif" alt="Amstelvar font's Grade being changed on the fly.">
  <figcaption>그레이드 축이 변경되는 모습입니다.</figcaption>
</figure>

위의 샘플에 대한 실제 예제와 소스 코드를 [이 곳](https://variable-font-experiments.glitch.me){: .external}에서 볼 수 있습니다.

CSS에서 값을 설정하기 위해, 5개의 등록된 축과 그레이드는 4글자의 태그를 갖고 있습니다.

<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">축 이름 및 CSS 값</th>
    </tr>
    <tr>
      <td>두께(Weight)</td>
      <td>
        <code>wght</code>
      </td>
    </tr>
      <tr>
      <td>너비(Width)</td>
      <td>
        <code>wdth</code>
      </td>
    </tr>
          <tr>
      <td>기울기(Slant)</td>
      <td>
        <code>slnt</code>
      </td>
    </tr>
          <tr>
      <td>광학 사이즈(Optical Size)</td>
      <td>
        <code>opsz</code>
      </td>
    </tr>
          <tr>
      <td>이탤릭(Italics)</td>
      <td>
        <code>ital</code>
      </td>
    </tr>
          <tr>
      <td>그레이드(Grade)</td>
      <td>
        <code>GRAD</code>
      </td>
    </tr>
  </tbody>
</table>

가변 글꼴을 먼저 추가하려면, 다른 사용자 정의 글꼴과 마찬가지로 폰트 소스를 입력해야 합니다.

```
@font-face {
  font-family: 'AmstelvarAlpha';
  src: url('../fonts/AmstelvarAlpha-VF.ttf');
}
```

축 값을 정의하는 방법은 축 태그와 인스턴스 위치를 하나의 쌍으로 지정할 수 있는 CSS 속성인 `font-variations`를 사용하는 것입니다.

```
#font-amstelvar {
  font-family: 'AmstelvarAlpha';
  font-variation-settings: 'wdth' 400, 'wght' 98;
}
```

<figure>
  <img src="images/gingham-weight-e.gif" alt="Ginghams font's Weight and Width being changed on the fly.">
  <figcaption>이 예시에서는 두께 및 너비 축이 즉시 변경되는 것을 볼 수 있습니다.</figcaption>
</figure>

위의 샘플에 대한 실제 예제와 소스 코드를 [이 곳](https://variable-font-experiments.glitch.me){: .external}에서 볼 수 있습니다.

## 제작자의 책임

축의 값을 설정하면 개인 취향에 따라 좋은 사례를 적용할 수 있습니다. 하지만 새로운 기술로 인한 위험은 오용이 될 수 있으며, 지나치게 예술적이거나 탐구적인 설정은 실제 텍스트의 가독성을 떨어뜨릴 수 있습니다. 글의 제목에 축 값을 설정하여 훌륭한 예술적 디자인을 만드는 것은 흥미로울 수 있지만, 글의 본문의 경우 텍스트를 가독성을 떨어뜨릴 수 있는 위험이 있습니다.

<figure>
  <img src="images/grass-mandy.png" alt="Grass example by Mandy Michael">
</figure>

위는 예술적 표현의 훌륭한 예시로, Mandy Michael이 제작한 [Decovar](https://www.typenetwork.com/brochure/decovar-a-decorative-variable-font-by-david-berlow){: .external}라는 서체입니다.

위의 샘플에 대한 실제 예제와 소스 코드를 [이 곳](https://codepen.io/mandymichael/pen/YYaWop){: .external}에서 볼 수 있습니다

<figure>
  <img src="images/axis-praxis.gif" alt="Typeface Zycon, designed for animation by David Berlow, type designer and
    typographer at Font Bureau.">
</figure>

가변 글꼴로 애니메이션 캐릭터를 탐색할 수도 있습니다. 위는 Zycon 서체에서 사용되는 축들의 예입니다. [Axis Praxis의 라이브 애니메이션 예제](https://www.axis-praxis.org/specimens/zycon){: .external}를 참조하십시오

## 가변 글꼴 성능 향상

OpenType 변수 글꼴을 사용하면 여러 유형의 변형을 하나의 글꼴 파일에 저장할 수 있습니다. [Monotype](https://goo.gl/9gonHT){: .external}은 3개의 너비와 8개의 두께, 이탤릭 및 로마 스타일을 생성하여 총 12개의 스타일을 설정할 수 있는 실험을 실행했습니다. 이 때 단일 가변 글꼴 파일에 48개의 개별 글꼴을 저장하면 **파일 크기가 88%나 감소**했습니다.

반대로, 설정으로 글꼴의 애니메이션을 조정하는 경우 브라우저 성능 문제를 일으킬 수 있습니다. [Surma의 Supercharged](https://www.youtube.com/watch?v=B42rUMdcB7c)에서 이에 대해 자세히 알아보십시오.

가변 글꼴을 사용하여, 앱 및 웹 사이트 제작자는 네트워크 지연 및 대기시간 없이 각 브랜드를 표현하는 풍부한 타이포그래피 경험을 제공 할 수 있습니다. 그러나 Roboto Regular와 같은 단일 글꼴을 사용하고 있는 경우, 축이 많은 가변 글꼴로 전환하면 글꼴 크기가 크게 증가 할 수 있습니다. 하지만 이는 항상 그렇듯, 사용 사례에 따라 다릅니다.

## 폴백 및 브라우저 지원

가변 글꼴의 지원은 제한적이지만, Chrome 및 Safari에서 지원하고 있으며 Edge 17 및 Firefox에서도 곧 지원할 예정입니다. 자세한 소식은 [caniuse.com](https://caniuse.com/#search=font-variation-settings){: .external}에서 확인할 수 있습니다.

여러분의 CSS코드에 @supports를 사용해 변수의 폴백을 만드는 것이 가능합니다.

```
@supports (font-variations-settings: 'wdth' 200) {
  @font-face {
    /* https://github.com/TypeNetwork/Amstelvar */
    font-family: AmstelvarAlpha;
    src: url('../fonts/AmstelvarAlpha-VF.ttf');
    font-weight: normal;
    font-style: normal;
  }

  #font-amstelvar {
    font-family: AmstelvarAlpha;
    font-variation-settings: 'wdth' 400, 'wght' 98;
  }
}
```

## 감사인사 {: .hide-from-toc }

이 글은 다음 분들의 도움이 없었으면 불가능했을 것입니다.

- [Font Bureau](https://fontbureau.typenetwork.com/){: .external}의 디자이너 겸 타이포그래퍼, David Berlow
- [axis-praxis.org](https://axis-praxis.org){: .external}의 개발자, Laurence Penney
- [Mandy Michael](https://twitter.com/Mandy_Kerr){: .external}
- 구글 폰트, 프로그램 관리자, Dave Crossland

## 피드백 {: #feedback }

{% include "web/_shared/helpful.html" %}
