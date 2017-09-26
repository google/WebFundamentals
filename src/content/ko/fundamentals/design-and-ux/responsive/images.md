project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 하나의 그림은 1000단어의 가치가 있으며, 이미지는 모든 페이지에서 중요한 역할을 합니다. 그러나 이미지는 다운로드되는 바이트의 대부분을 차지하기도 합니다.  반응형 웹 디자인은 기기 특성에 따라 레이아웃을 변경할 뿐만 아니라 이미지도 변경할 수 있습니다.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-29 #}

# 이미지 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


반응형 웹 디자인이란 기기 특성에 따라 레이아웃을 변경할 뿐만 아니라
콘텐츠도 변경할 수 있음을 의미합니다.  예를 들어, 고해상도(2x) 화면에서
고해상도 그래픽은 선명도를 보장합니다. 50% 너비의
이미지는 브라우저가 너비 800px일 때는 올바로 작동할 수 있지만
좁은 휴대폰에서는 너무 많은 공간을 차지합니다.
또한 이 이미지를 작은 화면에 맞게 축소할 경우 동일한 대역폭 오버헤드가 필요합니다.

## 아트 디렉션

<img src="img/art-direction.png" alt="아트 디렉션의 예"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

때로는 이미지를 대폭 변경해야 하는 경우도 있습니다.
비율을 변경하고 전체 이미지를 잘라내거나 심지어 바꿀 수도 있습니다.  이 경우,
이미지를 변경하는 것을 일반적으로 아트 디렉션이라고 부릅니다.  자세한 예시는
[responsiveimages.org/demos/](https://responsiveimages.org/demos/){: .external }를
참조하세요.

{% include "web/_shared/udacity/ud882.html" %}

## 마크업의 이미지

<style>
  .side-by-side {
    display: inline-block;
    margin: 0 20px 0 0;
    width: 45%;
  }

  span#data_uri {
    background: url(data:image/svg+xml,%3C%3Fxml%20version%3D%221.0%22%20encoding%3D%22utf-8%22%3F%3E%0D%0A%3C%21--%20Generator%3A%20Adobe%20Illustrator%2016.0.0%2C%20SVG%20Export%20Plug-In%20.%20SVG%20Version%3A%206.00%20Build%200%29%20%20--%3E%0D%0A%3C%21DOCTYPE%20svg%20PUBLIC%20%22-%2F%2FW3C%2F%2FDTD%20SVG%201.1%2F%2FEN%22%20%22http%3A%2F%2Fwww.w3.org%2FGraphics%2FSVG%2F1.1%2FDTD%2Fsvg11.dtd%22%3E%0D%0A%3Csvg%20version%3D%221.1%22%20id%3D%22Layer_1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%0D%0A%09%20width%3D%22396.74px%22%20height%3D%22560px%22%20viewBox%3D%22281.63%200%20396.74%20560%22%20enable-background%3D%22new%20281.63%200%20396.74%20560%22%20xml%3Aspace%3D%22preserve%22%0D%0A%09%3E%0D%0A%3Cg%3E%0D%0A%09%3Cg%3E%0D%0A%09%09%3Cg%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23E44D26%22%20points%3D%22409.737%2C242.502%20414.276%2C293.362%20479.828%2C293.362%20480%2C293.362%20480%2C242.502%20479.828%2C242.502%20%09%09%09%0D%0A%09%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpath%20fill%3D%22%23E44D26%22%20d%3D%22M281.63%2C110.053l36.106%2C404.968L479.757%2C560l162.47-45.042l36.144-404.905H281.63z%20M611.283%2C489.176%0D%0A%09%09%09%09L480%2C525.572V474.03l-0.229%2C0.063L378.031%2C445.85l-6.958-77.985h22.98h26.879l3.536%2C39.612l55.315%2C14.937l0.046-0.013v-0.004%0D%0A%09%09%09%09L480%2C422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283%2C489.176z%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22480%2C192.833%20604.247%2C192.833%20603.059%2C206.159%20600.796%2C231.338%20599.8%2C242.502%20599.64%2C242.502%20%0D%0A%09%09%09%09480%2C242.502%20480%2C293.362%20581.896%2C293.362%20595.28%2C293.362%20594.068%2C306.699%20582.396%2C437.458%20581.649%2C445.85%20480%2C474.021%20%0D%0A%09%09%09%09480%2C474.03%20480%2C525.572%20611.283%2C489.176%20642.17%2C143.166%20480%2C143.166%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23F16529%22%20points%3D%22540.988%2C343.029%20480%2C343.029%20480%2C422.35%20535.224%2C407.445%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22414.276%2C293.362%20409.737%2C242.502%20479.828%2C242.502%20479.828%2C242.38%20479.828%2C223.682%20%0D%0A%09%09%09%09479.828%2C192.833%20355.457%2C192.833%20356.646%2C206.159%20368.853%2C343.029%20479.828%2C343.029%20479.828%2C293.362%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23EBEBEB%22%20points%3D%22479.828%2C474.069%20479.828%2C422.4%20479.782%2C422.413%20424.467%2C407.477%20420.931%2C367.864%20%0D%0A%09%09%09%09394.052%2C367.864%20371.072%2C367.864%20378.031%2C445.85%20479.771%2C474.094%20480%2C474.03%20480%2C474.021%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22343.784%2C50.229%20366.874%2C50.229%20366.874%2C75.517%20392.114%2C75.517%20392.114%2C0%20366.873%2C0%20366.873%2C24.938%20%0D%0A%09%09%09%09343.783%2C24.938%20343.783%2C0%20318.544%2C0%20318.544%2C75.517%20343.784%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22425.307%2C25.042%20425.307%2C75.517%20450.549%2C75.517%20450.549%2C25.042%20472.779%2C25.042%20472.779%2C0%20403.085%2C0%20%0D%0A%09%09%09%09403.085%2C25.042%20425.306%2C25.042%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22508.537%2C38.086%20525.914%2C64.937%20526.349%2C64.937%20543.714%2C38.086%20543.714%2C75.517%20568.851%2C75.517%20568.851%2C0%20%0D%0A%09%09%09%09542.522%2C0%20526.349%2C26.534%20510.159%2C0%20483.84%2C0%20483.84%2C75.517%20508.537%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20points%3D%22642.156%2C50.555%20606.66%2C50.555%20606.66%2C0%20581.412%2C0%20581.412%2C75.517%20642.156%2C75.517%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22480%2C474.021%20581.649%2C445.85%20582.396%2C437.458%20594.068%2C306.699%20595.28%2C293.362%20581.896%2C293.362%20%0D%0A%09%09%09%09480%2C293.362%20479.828%2C293.362%20479.828%2C343.029%20480%2C343.029%20540.988%2C343.029%20535.224%2C407.445%20480%2C422.35%20479.828%2C422.396%20%0D%0A%09%09%09%09479.828%2C422.4%20479.828%2C474.069%20%09%09%09%22%2F%3E%0D%0A%09%09%09%3Cpolygon%20fill%3D%22%23FFFFFF%22%20points%3D%22479.828%2C242.38%20479.828%2C242.502%20480%2C242.502%20599.64%2C242.502%20599.8%2C242.502%20600.796%2C231.338%20%0D%0A%09%09%09%09603.059%2C206.159%20604.247%2C192.833%20480%2C192.833%20479.828%2C192.833%20479.828%2C223.682%20%09%09%09%22%2F%3E%0D%0A%09%09%3C%2Fg%3E%0D%0A%09%3C%2Fg%3E%0D%0A%3C%2Fg%3E%0D%0A%3C%2Fsvg%3E%0D%0A) no-repeat;
    background-size: cover;
    height: 484px;
  }

  span#svg {
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' x='0px' y='0px' width='50%' height='560px' viewBox='281.63 0 396.74 560' enable-background='new 281.63 0 396.74 560' xml:space='preserve'><g><g><g><polygon fill='#E44D26' points='409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5'/><path fill='#E44D26' d='M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z'/><polygon fill='#F16529' points='480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2'/><polygon fill='#F16529' points='541,343 480,343 480,422.4 535.2,407.4'/><polygon fill='#EBEBEB' points='414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4'/><polygon fill='#EBEBEB' points='479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474'/><polygon points='343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5'/><polygon points='425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25'/><polygon points='508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5'/><polygon points='642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5'/><polygon fill='#FFFFFF' points='480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1'/><polygon fill='#FFFFFF' points='479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7'/></g></g></g></svg>") no-repeat;
    background-size: cover;
    height: 484px;
  }
</style>

`img` 요소는 성능이 뛰어나며 콘텐츠를 다운로드하고 디코딩하고 렌더링합니다. 최신 브라우저는 다양한 이미지 형식을 지원합니다.  여러 기기에서 작동하는
이미지를 포함시키는 것은 데스크톱의 경우와 마찬가지이며,
몇 가지 사소한 조정만으로도 뛰어난 환경을 만들 수 있습니다.


### TL;DR {: .hide-from-toc }

- 이미지에 대해 상대 크기를 사용하면 실수로 이미지가 컨테이너를 오버플로하는 것을 막을 수 있습니다.
- 기기 특성에 따라 다른 이미지를 지정(아트 디렉션)하려는 경우 `picture` 요소를 사용합니다.
- `srcset` 및 `x` 설명자를 `img` 요소에 사용하면, 다른 밀도를 선택할 때 사용할 최적의 이미지에 대한 힌트를 브라우저에 제공할 수 있습니다.
- 페이지에 이미지가 한두 개만 있고 이들 이미지가 사이트의 다른 곳에서는 사용되지 않는 경우, 파일 요청을 줄이려면 인라인 이미지의 사용을 고려해 보세요.


### 이미지에 상대 크기 사용

실수로 이미지가 뷰포트를 오버플로하는 것을 막으려면,
이미지의 너비를 지정할 때 상대 크기를 사용하세요.  예를 들어, `width: 50%;`는
이미지 너비가 포함 요소의 50%가 되도록 만듭니다(뷰포트의 50% 또는 실제
픽셀 크기의 50%가 아님).

CSS에서는 콘텐츠가 컨테이너를 오버플로하도록 허용하므로,
이미지와 기타 콘텐츠가 오버플로되는 것을 막으려면 max-width: 100%를 사용할 필요가 있습니다.  예를 들면
다음과 같습니다.


    img, embed, object, video {
      max-width: 100%;
    }
    

`img` 요소의 `alt` 속성을 통해 의미있는 설명을 제공하세요.
그러면 스크린 리더와 기타 보조 기술에 대한 컨텍스트를 제공하여,
사이트의 액세스 성능을 더욱 향상시킬 수 있습니다.


### 높은 DPI 기기에서 `srcset`로 `img` 개선

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="Pzc5Dly_jEM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

`srcset` 속성은 `img` 요소의 동작을
향상시켜주며, 다른 기기 속성에 대해 여러 가지 이미지 파일을
쉽게 제공할 수 있습니다. CSS 고유의 `image-set`
[CSS 함수](#use-image-set-to-provide-high-res-images)와
마찬가지로, `srcset`를 사용하면 브라우저가 기기 특성에
따라 최적의 이미지를 선택할 수 있습니다(예:
2x 디스플레이에서 2x 이미지를 사용하거나, 향후에 제한된 대역폭 네트워크의 경우
2x 디스플레이에서 1x 이미지를 사용).


<div style="clear:both;"></div>


    <img src="photo.png" srcset="photo@2x.png 2x" ...>
    

`srcset`를 지원하지 않는 브라우저에서는 `src` 속성에 의해 지정된
기본 이미지 파일을 사용합니다.  이러한 이유 때문에,
성능에 상관없이 모든 기기에 표시될 수 있는 1x 이미지를 항상 포함하는 것이
중요합니다.  `srcset`가 지원되는 경우 모든 요청을 수행하기 전에,
쉼표로 구분된 이미지/조건 목록이 분석되며, 가장 적절한 이미지만
다운로드되어 표시됩니다.

이 조건에는 픽셀 밀도, 너비, 높이 등의 모든 것이 포함될 수 있지만,
현재는 픽셀 밀도만이 제대로 지원됩니다.  현재의 동작과
미래의 기능 간에 균형을 이루려면, 속성에 2x 이미지를 포함하면
됩니다.

### `picture`가 있는 반응형 이미지에서의 아트 디렉션

<img class="attempt-right" src="img/art-direction.png" alt="아트 디렉션의 예"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

기기 특성에 따라 이미지를 변경하려면(아트 디렉션)
`picture` 요소를 사용합니다.  `picture`
요소는 다른 특성(예: 기기 크기, 기기 해상도,
방향 등)에 따라 여러 버전의 이미지를
제공하기 위한 선언적 솔루션을
정의합니다.

<div style="clear:both;"></div>

Dogfood: `picture` 요소가 브라우저에 들어가기 시작했습니다. 아직은 이 요소가 모든 브라우저에서 제공되지는 않지만, 뛰어난 이전 버전과의 호환성과 [Picturefill 폴리필](http://picturefill.responsiveimages.org/){: .external }의 잠재적 용도가 있기 때문에 이 요소를 사용하는 것이 좋습니다. 자세한 내용은 [ResponsiveImages.org](http://responsiveimages.org/#implementation) 사이트를 참조하세요.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QINlm3vjnaY"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

이미지 소스가 여러 가지 밀도로 존재하는 경우
또는 반응형 디자인에 따라 특정 유형의 화면에 약간 다른 이미지가
표시되는 경우  <code>picture</code> 요소를 사용하세요.  <code>video</code> 요소와 마찬가지로
여러  <code>source</code> 요소를 포함할 수 있으므로,
미디어 쿼리 또는 이미지 형식에 따라
다른 이미지 파일을 지정할 수 있습니다.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media.html){: target="_blank" .external }

위의 예시에서 브라우저 너비가 최소 800px 이상이면 기기 해상도에 따라
`head.jpg` 또는 `head-2x.jpg`가 사용됩니다.
브라우저가 450px 및 800px 사이이면 다시 기기 해상도에 따라 `head-small.jpg` 또는
`head-small-2x.jpg`가 사용됩니다.
450px 미만인 화면 너비의 경우
`picture` 요소가 지원되지 않는 이전 버전과의 호환성을 위해,
브라우저는 대신 `img` 요소를 렌더링해야 합니다.

#### 상대 크기의 이미지

이미지의 최종 크기를 알 수 없는 경우, 이미지 소스의
밀도 설명자를 지정하기 어려울 수 있습니다.  브라우저의
크기에 따라 브라우저의 비례 너비가 유동적으로 변하는 경우에는
특히 더 어렵습니다.

고정된 크기의 이미지와 밀도를 제공하는 대신, 이미지 요소 크기와 함께
너비 설명자를 추가하여 각 이미지의 크기를 지정할 수 있습니다.
이렇게 하면 브라우저가 자동으로 유효 픽셀 밀도를 계산하고
최적의 이미지를 선택하여 다운로드할 수 있습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/sizes.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/sizes.html){: target="_blank" .external }


위의 예에서는 브라우저 너비와 기기 픽셀 비율에 따라
뷰포트 너비의 절반(`sizes="50vw"`)인 이미지를 렌더링하므로, 브라우저
창의 크기에 상관없이 브라우저가 올바른 이미지를 선택할 수
있습니다. 예를 들어, 아래 표는 브라우저가
어떤 이미지를 선택하는지를 보여줍니다.

<table class="">
  <thead>
    <tr>
      <th data-th="Browser width">브라우저 너비</th>
      <th data-th="Device pixel ratio">기기 픽셀 비율</th>
      <th data-th="Image used">사용된 이미지</th>
      <th data-th="Effective resolution">유효 해상도</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>200.png</code></td>
      <td data-th="Effective resolution">1x</td>
    </tr>
    <tr>
      <td data-th="Browser width">400px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2x</td>
    </tr>
    <tr>
      <td data-th="Browser width">320px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>400.png</code></td>
      <td data-th="Effective resolution">2.5x</td>
    </tr>
    <tr>
      <td data-th="Browser width">600px</td>
      <td data-th="Device pixel ratio">2</td>
      <td data-th="Image used"><code>800.png</code></td>
      <td data-th="Effective resolution">2.67x</td>
    </tr>
    <tr>
      <td data-th="Browser width">640px</td>
      <td data-th="Device pixel ratio">3</td>
      <td data-th="Image used"><code>1000.png</code></td>
      <td data-th="Effective resolution">3.125x</td>
    </tr>
    <tr>
      <td data-th="Browser width">1100px</td>
      <td data-th="Device pixel ratio">1</td>
      <td data-th="Image used"><code>1400.png</code></td>
      <td data-th="Effective resolution">1.27x</td>
    </tr>
  </tbody>
</table>


#### 반응형 이미지에서 중단점 고려

많은 경우에, 사이트의 레이아웃 중단점에 따라 이미지 크기가
변경될 수 있습니다.  예를 들어, 작은 화면에서는 뷰포트의 전체 너비에 맞게
이미지가 확대되는 것이 좋지만, 큰 화면에서는 이미지가 작은 부분만을
차지해야 합니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/breakpoints.html" region_tag="picture" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/breakpoints.html){: target="_blank" .external }

위의 예에서 `sizes` 속성은 여러 개의 미디어 쿼리를 사용하여
이미지의 크기를 지정합니다. 브라우저 너비가 600px 이상인 경우
이미지는 뷰포트 너비의 25%가 되고, 500px - 600px 사이인 경우
이미지는 뷰포트 너비의 50%가 되며, 500px 미만인 경우 이미지는
전체 너비가 됩니다.


### 제품 이미지를 확대 가능하게 만들기

<figure class="attempt-right">
  <img src="img/sw-make-images-expandable-good.png" srcset="img/sw-make-images-expandable-good.png 1x, img/sw-make-images-expandable-good-2x.png 2x" alt="확대 가능한 제품 이미지가 있는 J. Crews 웹사이트">
  <figcaption class="success">
    확대 가능한 제품 이미지가 있는 J. Crews 웹사이트.
  </figcaption>
</figure>

고객은 자신이 구매하는 것을 보고 싶어 합니다.  소매점 사이트에서 사용자들은 제품을 고해상도로 확대하여
더 자세히 보고 싶어 하지만, 그럴 수 없다면
[연구조사 참가자](/web/fundamentals/getting-started/principles/#make-product-images-expandable)들은 실망할 것입니다.

누를 수 있는 확대 가능한 이미지의 좋은 예가 바로 J. Crew 사이트입니다.
사라지는 오버레이는 이 이미지가 누를 수 있는 이미지임을 나타내며,
상세하게 볼 수 있도록 확대된 이미지를 제공합니다.

<div style="clear:both;"></div>

### 기타 이미지 기법

#### 압축 이미지

[압축 이미지 기법](http://www.html5rocks.com/en/mobile/high-dpi/#toc-tech-overview)은
기기의 실제 성능에 상관없이 높은 압축율의 2x 이미지를
모든 기기에 제공합니다.  이미지 유형과 압축 수준에 따라
파일 크기가 상당히 줄어들지만 화질은 별차이가 없어 보일 수
있습니다.

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/compressive.html){: target="_blank" .external }

Caution: 압축 기법 사용 시 메모리가 늘어나고 디코딩 비용이 필요하므로 주의하세요. 작은 화면에 맞게 큰 이미지의 크기를 조정하는 것은 비용이 만이 들고, 메모리와 처리 성능이 모두 제한된 저사양 기기에서는 특히 손해가 클 수 있습니다.

#### 자바스크립트 이미지 대체

자바스크립트 이미지 대체는 기기의 성능을 확인하고
'올바른 작업을 수행합니다'. `window.devicePixelRatio`를 통해 기기 픽셀 비율을
결정하고, 화면 너비와 높이를 구할 수 있으며, 심지어 `navigator.connection`을
통해 일부 네트워크 연결 스니핑을 수행하거나 가짜 요청을 발급할 수도
있습니다. 이 모든 정보를 수집한 경우 이제 로드할 이미지를
결정할 수 있습니다.

이 접근방식의 큰 단점 중 하나는 자바스크립트를 사용한다는 것입니다.
즉, 적어도 예견(look-ahead) 파서가 완료될 때까지는 이미지 로딩이 지연됩니다. 즉,
`pageload` 이벤트가 실행되기 전까지는 이미지 다운로드조차 시작되지
않습니다. 또한, 대부분의 경우 브라우저가 1x 및 2x
이미지를 둘 다 다운로드하므로, 페이지 크기가 늘어나게 됩니다.


#### 이미지 인라인 처리: 래스터 및 벡터

완전히 다른 두 가지 방법으로 이미지를 만들고 저장할 수 있으며, 이는 반응형 이미지를 배포하는 방식에 영향을 미칩니다.

사진, 기타 이미지 등의 **래스터 이미지**는 색상의 개별 점들이 모인 그리드로 표현됩니다. 래스터 이미지는 카메라나 스캐너에서 가져올 수도 있고, HTML 캔버스 요소에서 만들어질 수도 있습니다. 래스터 이미지 저장에는 PNG, JPEG, WebP 등의 형식이 사용됩니다.

로고, 라인 아트 등의 **벡터 이미지**는 곡선, 선, 셰이프, 채우기 색상 및 그라데이션의 세트로 정의됩니다. 벡터 이미지는 Adobe Illustrator 또는 Inkscape와 같은 프로그램을 통해 만들거나, SVG와 같은 벡터 형식을 사용하여 코드로 작성할 수 있습니다.

##### SVG

SVG를 사용하면 반응형 벡터 그래픽을 웹페이지에 포함할 수 있습니다. 벡터 파일 형식이 래스터 파일 형식보다 더 나은 점은 브라우저가 벡터 이미지를 모든 크기로 렌더링할 수 있다는 것입니다. 벡터 형식은 이미지의 기하학적 형태(선, 곡선, 색상 등으로 구성된 이미지의 구조)를 표현합니다. 반대로 래스터 형식은 색상의 개별 점들에 대한 정보만을 제공하므로, 배율 조정 시에 공백을 어떻게 채울지 브라우저가 추측해야 합니다.

다음은 동일 이미지의 두 가지 버전입니다. 왼쪽은 PNG 이미지이고 오른쪽은 SVG 이미지입니다. SVG는 모든 크기에서 제대로 보이는 반면, 그 옆의 PNG는 화면이 커질수록 흐려지기 시작합니다.

<img class="side-by-side" src="img/html5.png" alt="HTML5 로고, PNG 형식" />
<img class="side-by-side" src="img/html5.svg" alt="HTML5 로고, SVG 형식" />

여러분의 페이지에서 수행되는 파일 요청 수를 줄이고 싶다면, SVG 또는 데이터 URI 형식을 사용하여 이미지를 인라인으로 코딩할 수 있습니다. 이 페이지의 소스를 보면, 데이터 URI 및 SVG라는 두 개 로고가 모두 인라인으로 선언된 것을 확인할 수 있습니다.

<img class="side-by-side" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
      BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW
      9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RUR
      CBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2
      ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8
      vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OT
      kveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzk2Ljc0cHgiIGhlaWdodD0iNTYwc
      HgiIHZpZXdCb3g9IjI4MS42MyAwIDM5Ni43NCA1NjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcg
      MjgxLjYzIDAgMzk2Ljc0IDU2MCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSINCgk+DQo8Zz4NCgk8Zz4
      NCgkJPGc+DQoJCQk8cG9seWdvbiBmaWxsPSIjRTQ0RDI2IiBwb2ludHM9IjQwOS43MzcsMjQyLj
      UwMiA0MTQuMjc2LDI5My4zNjIgNDc5LjgyOCwyOTMuMzYyIDQ4MCwyOTMuMzYyIDQ4MCwyNDIuN
      TAyIDQ3OS44MjgsMjQyLjUwMiAJCQkNCgkJCQkiLz4NCgkJCTxwYXRoIGZpbGw9IiNFNDREMjYi
      IGQ9Ik0yODEuNjMsMTEwLjA1M2wzNi4xMDYsNDA0Ljk2OEw0NzkuNzU3LDU2MGwxNjIuNDctNDU
    uMDQybDM2LjE0NC00MDQuOTA1SDI4MS42M3ogTTYxMS4yODMsNDg5LjE3Ng0KCQkJCUw0ODAsNT
    I1LjU3MlY0NzQuMDNsLTAuMjI5LDAuMDYzTDM3OC4wMzEsNDQ1Ljg1bC02Ljk1OC03Ny45ODVoM
    jIuOThoMjYuODc5bDMuNTM2LDM5LjYxMmw1NS4zMTUsMTQuOTM3bDAuMDQ2LTAuMDEzdi0wLjAw
    NA0KCQkJCUw0ODAsNDIyLjM1di03OS4zMmgtMC4xNzJIMzY4Ljg1M2wtMTIuMjA3LTEzNi44NzF
    sLTEuMTg5LTEzLjMyNWgxMjQuMzcxSDQ4MHYtNDkuNjY4aDE2Mi4xN0w2MTEuMjgzLDQ4OS4xNz
    Z6Ii8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjQ4MCwxOTIuODMzIDYwN
    C4yNDcsMTkyLjgzMyA2MDMuMDU5LDIwNi4xNTkgNjAwLjc5NiwyMzEuMzM4IDU5OS44LDI0Mi41
    MDIgNTk5LjY0LDI0Mi41MDIgDQoJCQkJNDgwLDI0Mi41MDIgNDgwLDI5My4zNjIgNTgxLjg5Niw
    yOTMuMzYyIDU5NS4yOCwyOTMuMzYyIDU5NC4wNjgsMzA2LjY5OSA1ODIuMzk2LDQzNy40NTggNT
    gxLjY0OSw0NDUuODUgNDgwLDQ3NC4wMjEgDQoJCQkJNDgwLDQ3NC4wMyA0ODAsNTI1LjU3MiA2M
    TEuMjgzLDQ4OS4xNzYgNjQyLjE3LDE0My4xNjYgNDgwLDE0My4xNjYgCQkJIi8+DQoJCQk8cG9s
    eWdvbiBmaWxsPSIjRjE2NTI5IiBwb2ludHM9IjU0MC45ODgsMzQzLjAyOSA0ODAsMzQzLjAyOSA
    0ODAsNDIyLjM1IDUzNS4yMjQsNDA3LjQ0NSAJCQkiLz4NCgkJCTxwb2x5Z29uIGZpbGw9IiNFQk
    VCRUIiIHBvaW50cz0iNDE0LjI3NiwyOTMuMzYyIDQwOS43MzcsMjQyLjUwMiA0NzkuODI4LDI0M
    i41MDIgNDc5LjgyOCwyNDIuMzggNDc5LjgyOCwyMjMuNjgyIA0KCQkJCTQ3OS44MjgsMTkyLjgz
    MyAzNTUuNDU3LDE5Mi44MzMgMzU2LjY0NiwyMDYuMTU5IDM2OC44NTMsMzQzLjAyOSA0NzkuODI
    4LDM0My4wMjkgNDc5LjgyOCwyOTMuMzYyIAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0VCRU
    JFQiIgcG9pbnRzPSI0NzkuODI4LDQ3NC4wNjkgNDc5LjgyOCw0MjIuNCA0NzkuNzgyLDQyMi40M
    TMgNDI0LjQ2Nyw0MDcuNDc3IDQyMC45MzEsMzY3Ljg2NCANCgkJCQkzOTQuMDUyLDM2Ny44NjQg
    MzcxLjA3MiwzNjcuODY0IDM3OC4wMzEsNDQ1Ljg1IDQ3OS43NzEsNDc0LjA5NCA0ODAsNDc0LjA
    zIDQ4MCw0NzQuMDIxIAkJCSIvPg0KCQkJPHBvbHlnb24gcG9pbnRzPSIzNDMuNzg0LDUwLjIyOS
    AzNjYuODc0LDUwLjIyOSAzNjYuODc0LDc1LjUxNyAzOTIuMTE0LDc1LjUxNyAzOTIuMTE0LDAgM
    zY2Ljg3MywwIDM2Ni44NzMsMjQuOTM4IA0KCQkJCTM0My43ODMsMjQuOTM4IDM0My43ODMsMCAz
    MTguNTQ0LDAgMzE4LjU0NCw3NS41MTcgMzQzLjc4NCw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWd
    vbiBwb2ludHM9IjQyNS4zMDcsMjUuMDQyIDQyNS4zMDcsNzUuNTE3IDQ1MC41NDksNzUuNTE3ID
    Q1MC41NDksMjUuMDQyIDQ3Mi43NzksMjUuMDQyIDQ3Mi43NzksMCA0MDMuMDg1LDAgDQoJCQkJN
    DAzLjA4NSwyNS4wNDIgNDI1LjMwNiwyNS4wNDIgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9
    IjUwOC41MzcsMzguMDg2IDUyNS45MTQsNjQuOTM3IDUyNi4zNDksNjQuOTM3IDU0My43MTQsMzg
    uMDg2IDU0My43MTQsNzUuNTE3IDU2OC44NTEsNzUuNTE3IDU2OC44NTEsMCANCgkJCQk1NDIuNT
    IyLDAgNTI2LjM0OSwyNi41MzQgNTEwLjE1OSwwIDQ4My44NCwwIDQ4My44NCw3NS41MTcgNTA4L
    jUzNyw3NS41MTcgCQkJIi8+DQoJCQk8cG9seWdvbiBwb2ludHM9IjY0Mi4xNTYsNTAuNTU1IDYw
    Ni42Niw1MC41NTUgNjA2LjY2LDAgNTgxLjQxMiwwIDU4MS40MTIsNzUuNTE3IDY0Mi4xNTYsNzU
    uNTE3IAkJCSIvPg0KCQkJPHBvbHlnb24gZmlsbD0iI0ZGRkZGRiIgcG9pbnRzPSI0ODAsNDc0Lj
    AyMSA1ODEuNjQ5LDQ0NS44NSA1ODIuMzk2LDQzNy40NTggNTk0LjA2OCwzMDYuNjk5IDU5NS4yO
    CwyOTMuMzYyIDU4MS44OTYsMjkzLjM2MiANCgkJCQk0ODAsMjkzLjM2MiA0NzkuODI4LDI5My4z
    NjIgNDc5LjgyOCwzNDMuMDI5IDQ4MCwzNDMuMDI5IDU0MC45ODgsMzQzLjAyOSA1MzUuMjI0LDQ
    wNy40NDUgNDgwLDQyMi4zNSA0NzkuODI4LDQyMi4zOTYgDQoJCQkJNDc5LjgyOCw0MjIuNCA0Nz
    kuODI4LDQ3NC4wNjkgCQkJIi8+DQoJCQk8cG9seWdvbiBmaWxsPSIjRkZGRkZGIiBwb2ludHM9I
    jQ3OS44MjgsMjQyLjM4IDQ3OS44MjgsMjQyLjUwMiA0ODAsMjQyLjUwMiA1OTkuNjQsMjQyLjUw
    MiA1OTkuOCwyNDIuNTAyIDYwMC43OTYsMjMxLjMzOCANCgkJCQk2MDMuMDU5LDIwNi4xNTkgNjA
    0LjI0NywxOTIuODMzIDQ4MCwxOTIuODMzIDQ3OS44MjgsMTkyLjgzMyA0NzkuODI4LDIyMy42OD
    IgCQkJIi8+DQoJCTwvZz4NCgk8L2c+DQo8L2c+DQo8L3N2Zz4NCg==">
<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg>

SVG에는 모바일 및 데스크톱에 대한 [뛰어난 지원](http://caniuse.com/svg-html5)이 있으며, [최적화 도구](https://sarasoueidan.com/blog/svgo-tools/)로 SVG 크기를 상당히 줄일 수 있습니다. 아래의 두 인라인 SVG 로고는 똑같아 보이지만, 하나는 약 3KB이고 다른 하나는 2KB입니다.

<svg class="side-by-side" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="396.74px" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.737,242.502 414.276,293.362 479.828,293.362 480,293.362 480,242.502 479.828,242.502"/><path fill="#E44D26" d="M281.63,110.053l36.106,404.968L479.757,560l162.47-45.042l36.144-404.905H281.63z M611.283,489.176 L480,525.572V474.03l-0.229,0.063L378.031,445.85l-6.958-77.985h22.98h26.879l3.536,39.612l55.315,14.937l0.046-0.013v-0.004 L480,422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283,489.176z"/><polygon fill="#F16529" points="480,192.833 604.247,192.833 603.059,206.159 600.796,231.338 599.8,242.502 599.64,242.502 480,242.502 480,293.362 581.896,293.362 595.28,293.362 594.068,306.699 582.396,437.458 581.649,445.85 480,474.021 480,474.03 480,525.572 611.283,489.176 642.17,143.166 480,143.166       "/><polygon fill="#F16529" points="540.988,343.029 480,343.029 480,422.35 535.224,407.445      "/><polygon fill="#EBEBEB" points="414.276,293.362 409.737,242.502 479.828,242.502 479.828,242.38 479.828,223.682 479.828,192.833 355.457,192.833 356.646,206.159 368.853,343.029 479.828,343.029 479.828,293.362       "/><polygon fill="#EBEBEB" points="479.828,474.069 479.828,422.4 479.782,422.413 424.467,407.477 420.931,367.864 394.052,367.864 371.072,367.864 378.031,445.85 479.771,474.094 480,474.03 480,474.021       "/><polygon points="343.784,50.229 366.874,50.229 366.874,75.517 392.114,75.517 392.114,0 366.873,0 366.873,24.938 343.783,24.938 343.783,0 318.544,0 318.544,75.517 343.784,75.517      "/><polygon points="425.307,25.042 425.307,75.517 450.549,75.517 450.549,25.042 472.779,25.042 472.779,0 403.085,0 403.085,25.042 425.306,25.042       "/><polygon points="508.537,38.086 525.914,64.937 526.349,64.937 543.714,38.086 543.714,75.517 568.851,75.517 568.851,0 542.522,0 526.349,26.534 510.159,0 483.84,0 483.84,75.517 508.537,75.517      "/><polygon points="642.156,50.555 606.66,50.555 606.66,0 581.412,0 581.412,75.517 642.156,75.517      "/><polygon fill="#FFFFFF" points="480,474.021 581.649,445.85 582.396,437.458 594.068,306.699 595.28,293.362 581.896,293.362 480,293.362 479.828,293.362 479.828,343.029 480,343.029 540.988,343.029 535.224,407.445 480,422.35 479.828,422.396 479.828,422.4 479.828,474.069       "/><polygon fill="#FFFFFF" points="479.828,242.38 479.828,242.502 480,242.502 599.64,242.502 599.8,242.502 600.796,231.338 603.059,206.159 604.247,192.833 480,192.833 479.828,192.833 479.828,223.682       "/></g></g></g></svg><svg class="side-by-side" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="50%" height="560px" viewBox="281.63 0 396.74 560" enable-background="new 281.63 0 396.74 560" xml:space="preserve"><g><g><g><polygon fill="#E44D26" points="409.7,242.5 414.3,293.4 479.8,293.4 480,293.4 480,242.5 479.8,242.5"/><path fill="#E44D26" d="M281.63 110.053l36.106 404.968L479.757 560l162.47-45.042l36.144-404.905H281.63z M611.283 489.2 L480 525.572V474.03l-0.229 0.063L378.031 445.85l-6.958-77.985h22.98h26.879l3.536 39.612l55.315 14.937l0.046-0.013v-0.004 L480 422.35v-79.32h-0.172H368.853l-12.207-136.871l-1.189-13.325h124.371H480v-49.668h162.17L611.283 489.176z"/><polygon fill="#F16529" points="480,192.8 604.2,192.8 603.1,206.2 600.8,231.3 599.8,242.5 599.6,242.5 480,242.5 480,293.4 581.9,293.4 595.3,293.4 594.1,306.7 582.4,437.5 581.6,445.9 480,474 480,474 480,525.6 611.3,489.2 642.2,143.2 480,143.2"/><polygon fill="#F16529" points="541,343 480,343 480,422.4 535.2,407.4"/><polygon fill="#EBEBEB" points="414.3,293.4 409.7,242.5 479.8,242.5 479.8,242.4 479.8,223.7 479.8,192.8 355.5,192.8 356.6,206.2 368.9,343 479.8,343 479.8,293.4"/><polygon fill="#EBEBEB" points="479.8,474.1 479.8,422.4 479.8,422.4 424.5,407.5 420.9,367.9 394.1,367.9 371.1,367.9 378,445.9 479.8,474.1 480,474 480,474"/><polygon points="343.8,50.2 366.9,50.2 366.9,75.5 392.1,75.5 392.1,0 366.9,0 366.9,24.9 343.8,24.9 343.8,0 318.5,0 318.5,75.5 343.8,75.5"/><polygon points="425.3,25 425.3,75.5 450.5,75.5 450.5,25 472.8,25 472.8,0 403.1,0 403.1,25 425.3,25"/><polygon points="508.5,38.1 525.9,64.9 526.3,64.9 543.7,38.1 543.7,75.5 568.9,75.5 568.9,0 542.5,0 526.3,26.5 510.2,0 483.8,0 483.8,75.5 508.5,75.5"/><polygon points="642.2,50.6 606.7,50.6 606.7,0 581.4,0 581.4,75.5 642.2,75.5"/><polygon fill="#FFFFFF" points="480,474 581.6,445.9 582.4,437.5 594.1,306.7 595.3,293.4 581.9,293.4 480,293.4 479.8,293.4 479.8,343 480,343 541,343 535.2,407.4 480,422.4 479.8,422.4 479.8,422.4 479.8,474.1"/><polygon fill="#FFFFFF" points="479.8,242.4 479.8,242.5 480,242.5 599.6,242.5 599.8,242.5 600.8,231.3 603.1,206.2 604.2,192.8 480,192.8 479.8,192.8 479.8,223.7"/></g></g></g></svg>

##### 데이터 URI

데이터 URI는 이미지와 같은 파일을 인라인으로 포함시키는 방법이며, 이를 위해  <code>img</code> src 요소를 다음 형식의 Base64 인코딩 문자열로 설정할 수 있습니다.


    <img src="data:image/svg+xml;base64,[data]">
    

HTML5 로고의 코드 시작은 다음과 같습니다.


    <img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiB
    BZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW ...">
    

(전체 버전은 길이가 5000자 이상입니다!)

[jpillora.com/base64-encoder](https://jpillora.com/base64-encoder)와 같은  드래그 앤 드롭 도구를 사용하여, 이미지 등의 바이너리 파일을 데이터 URI로 변환할 수 있습니다. SVG와 마찬가지로 데이터 URI도 모바일 및 데스크톱 브라우저에서 [잘 지원됩니다](http://caniuse.com/datauri).

##### CSS에서 인라인 처리

데이터 URI 및 SVG는 CSS에서도 인라인 처리될 수 있으며, 모바일 및 데스크톱에서 모두 지원됩니다. 다음은 CSS에서 백그라운드 이미지로 구현된 똑같은 모습의 이미지입니다. 하나는 데이터 URI이고, 또 하나는 SVG입니다.

<span class="side-by-side" id="data_uri"></span>
<span class="side-by-side" id="svg"></span>

##### 인라인 처리의 장점 및 단점

이미지의 인라인 코드는 장황할 수 있는데(특히 데이터 URI의 경우) 굳이 이것을 사용하는 이유는 무엇 때문인가요? HTTP 요청을 줄이기 위해서입니다! SVG 및 데이터 URI에서는 이미지, CSS, 자바스크립트를 비롯한 전체 웹페이지를 단 한번의 요청으로 검색할 수 있습니다.

단점:

* 모바일의 경우, 외부  <code>src</code>의 이미지에 비해 [매우 느리게](https://www.mobify.com/blog/data-uris-are-slow-on-mobile/) 데이터 URI가 표시될 수 있습니다.
* 데이터 URI는 HTML 요청의 크기를 상당히 증가시킬 수 있습니다.
* 또한 마크업과 워크플로도 더 복잡합니다.
* 데이터 URI 형식은 바이너리보다 훨씬 더 크므로(최대 30%), 전체 다운로드 크기는 줄어들지 않습니다.
* 데이터 URI는 캐시될 수 없으므로, 사용되는 모든 페이지에 대해 다운로드되어야 합니다.
* 또한 IE 6 및 7에서는 지원되지 않으며, IE8에서는 지원이 불완전합니다.
* HTTP/2에서는, 자산 요청 수를 줄이는 것이 그다지 급한 일은 아닙니다.

반응하는 모든 것 중에서 무엇이 가장 적합한지 테스트해야 합니다. 다운로드 파일 크기, 요청 수 및 전체 지연 시간을 측정하려면 개발자 도구를 사용하세요. 때로는 데이터 URI가 래스터 이미지에 유용할 경우도 있습니다(예: 홈페이지에 사진이 한두 개만 있고 이들 사진이 다른 곳에서는 사용되지 않는 경우). 벡터 이미지를 인라인 처리해야 하는 경우, SVG가 훨씬 더 나은 옵션입니다.



## CSS의 이미지

CSS `background` 속성은 복잡한 이미지를
요소에 추가하기 위한 강력한 도구로, 손쉽게 여러 이미지를 추가하거나 반복 작업 등을
수행할 수 있습니다.  미디어 쿼리와 결합될 경우 백그라운드 속성이 더욱 강력해지고
화면 해상도, 뷰포트 크기 등에 따라 조건부 이미지 로딩이
가능합니다.


### TL;DR {: .hide-from-toc }
- 디스플레이 특성에 맞는 최적의 이미지를 사용하고 화면 크기, 기기 해상도 및 페이지 레이아웃을 고려하세요.
- 미디어 쿼리를 사용하는 높은 DPI 디스플레이의 경우 CSS에서 `background-image` 속성을 `min-resolution` 및 `-webkit-min-device-pixel-ratio`로 변경하세요.
- 마크업에서 1x 이미지와 함께 고해상도 이미지를 제공하려면 srcset를 사용하세요.
- 자바스크립트 이미지 대체 기법을 사용하거나 고압축 고해상도 이미지를 저해상도 기기에 제공할 경우에는 성능 비용을 고려하세요.


### 조건부 이미지 로딩 또는 아트 디렉션에 미디어 쿼리 사용

미디어 쿼리는 페이지 레이아웃에 영향을 미칠 뿐만 아니라,
조건부로 이미지를 로드하거나 뷰포트 너비에 따라 아트 디렉션을 제공하기 위해 미디어 쿼리를
사용할 수도 있습니다.

아래 샘플의 예시에서는 화면이 작은 경우 `small.png`만
다운로드되어 콘텐츠 `div`에 적용되는 반면, 화면이 큰 경우
`background-image: url(body.png)`는 본문에 적용되고 'background-image:
url(large.png)'는 'div'에 적용됩니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/conditional-mq.html" region_tag="conditional" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/conditional-mq.html){: target="_blank" .external }

### image-set을 사용하여 고해상도 이미지 제공

CSS의 `image-set()` 함수는 동작 `background` 속성을 개선하여
다양한 기기 특성에 맞는 여러 이미지 파일을 쉽게
제공할 수 있게 합니다.  따라서 기기 특성에 따라 브라우저가 최적의 이미지를
선택할 수 있습니다(예: 2x 디스플레이에서 2x 이미지를 사용하거나, 제한된 대역폭
네트워크의 경우 2x 기기에서 1x 이미지를 사용).


    background-image: image-set(
      url(icon1x.jpg) 1x,
      url(icon2x.jpg) 2x
    );
    

브라우저는 정확한 이미지를 로드할 뿐만 아니라
그에 따라 배율도 조정합니다. 즉, 브라우저는 2x 이미지가 1x 이미지보다 두 배 더 크다고
가정하고 2의 배수 단위로 배율을 조정하므로, 해당 이미지가
동일한 크기로 페이지에 나타납니다.

`image-set()` 지원은 아직 새로운 기능이며
`-webkit` 공급업체 접두사가 있는 Chrome 및 Safari에서만 지원됩니다.  또한 `image-set()`이 지원되지 않는 경우
대체 이미지를 포함할 때 주의하세요. 예를 들면 다음과 같습니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-set.html" region_tag="imageset" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/image-set.html){: target="_blank" .external }

위에서는 image-set를 지원하는 브라우저에서 적절한 자산을 로드하며,
그렇지 않을 경우 1x 자산으로 폴백합니다. 주의할 점은
`image-set()` 브라우저 지원이 부족한 경우에는 대부분의 브라우저가 1x 자산을 취합니다.

### 미디어 쿼리를 사용하여 고해상도 이미지 또는 아트 디렉션 제공

미디어 쿼리는 [기기 픽셀 비율](http://www.html5rocks.com/en/mobile/high-dpi/#toc-bg)에 따라
규칙을 만들 수 있으며, 2x 및 1x 디스플레이에 대해
서로 다른 이미지를 지정할 수 있습니다.


    @media (min-resolution: 2dppx),
    (-webkit-min-device-pixel-ratio: 2)
    {
      /* High dpi styles & resources here */
    }
    

Chrome, Firefox 및 Opera는 모두 표준 `(min-resolution: 2dppx)`를
지원하는 반면, Safari 및 Android 브라우저는 `dppx` 단위가 없는
구버전의 공급업체 접두사 구문을 요구합니다.  유의할 점은, 이러한 스타일은 기기가 미디어 쿼리와 일치하는
경우에만 로드되며, 사용자가 기본 사례에 대한 스타일을 지정해야 합니다.  이 방식의
이점은, 브라우저가 해상도별 미디어 쿼리를 지원하지 않더라도
렌더링이 보장된다는 점입니다.

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/media-query-dppx.html" region_tag="mqdppx" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/media-query-dppx.html){: target="_blank" .external }

또한 min-width 구문을 사용하여 뷰포트 크기에 따라 대체 이미지를
표시할 수도 있습니다.  이 기법의 이점은, 미디어 쿼리가 일치하지 않으면
이미지가 다운로드되지 않는다는 것입니다.  예를 들어, 브라우저 너비가
500px 이상인 경우 `bg.png`만 다운로드되어 `body`에 적용됩니다.


    @media (min-width: 500px) {
      body {
        background-image: url(bg.png);
      }
    }
    


## 아이콘에 SVG 사용 

아이콘을 페이지에 추가할 때, 가능하면 SVG 아이콘을 사용하고
일부 경우에는 유니코드 문자를 사용합니다.


### TL;DR {: .hide-from-toc }
- 래스터 이미지 대신 SVG 또는 유니코드를 아이콘에 사용합니다.


### 간단한 아이콘을 유니코드로 대체

상당수 글꼴들은 수많은 유니코드 문자 모양을 지원하며,
이것을 이미지 대신 사용할 수 있습니다. 이미지와 달리 유니코드 글꼴은 큰 화면이든 작은 화면이든
상관없이 보기가 좋고 확장이 잘됩니다.

일반 문자 집합을 넘어서는 유니코드에는 
화살표(&#8592;), 수학 연산자(&#8730;), 기하학적 모양
(&#9733;), 컨트롤 사진(&#9654;), 음악 표기(&#9836;),
그리스 문자(&#937;), 심지어는 체스 말(&#9822;)에 대한 기호가 포함될 수 있습니다.

유니코드 문자 포함은 명명된 엔터티와 동일한 방식으로 수행됩니다(`&#XXXX`).
여기서 `XXXX`는 유니코드 문자 번호를 나타냅니다. 예를 들면 다음과 같습니다.


    You're a super &#9733;
    

You're a super &#9733;

### 복잡한 아이콘을 SVG로 대체

아이콘 요구사항이 더 복잡한 경우에는 SVG 아이콘이 일반적으로 경량이고,
사용이 쉽고, CSS로 스타일링이 가능합니다. SVG는
래스터 이미지에 비해 여러 이점이 있습니다.

* SVG는 무한 확장이 가능한 벡터 그래픽입니다.
* 색상, 음영, 투명도 및 애니메이션과 같은 CSS 효과는
간단합니다.
* SVG 이미지는 문서에서 바로 인라인 처리될 수 있습니다.
* 문맥적입니다.
* 적절한 속성으로 더 나은 접근성을 제공합니다.



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-svg.html" region_tag="iconsvg" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-svg.html){: target="_blank" .external }

### 주의해서 아이콘 글꼴 사용


<figure class="attempt-right"><img src="img/icon-fonts.png" class="center" srcset="img/icon-fonts.png 1x, img/icon-fonts-2x.png 2x" alt="글꼴 아이콘에 FontAwesome을 사용하는 페이지의 예.">
<figcaption>
<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html" target="_blank" class="external">
글꼴 아이콘에 FontAwesome을 사용하는 페이지의 예.
</a>
</figcaption>
</figure>

아이콘 글꼴은 널리 사용되고 사용이 쉽지만, SVG 아이콘에 비해
몇 가지 단점이 있습니다.

* 이 글꼴은 무한 확장이 가능한 벡터 그래픽이지만, 앤티앨리어싱으로
인해 예상보다 아이콘이 선명하지 않을 수 있습니다.
* CSS를 사용한 스타일 지정이 제한됩니다.
* 선 높이, 글자 간격 등에 따라 완벽한 픽셀 배치가
어려울 수 있습니다.
* 문맥적이 아니며, 스크린 리더 또는 기타 보조 기술과 함께
사용하기가 어려울 수 있습니다.
* 범위가 잘못 지정될 경우, 제공되는 아이콘의 일부만을
사용하기 위해 파일 크기가 커질 수 있습니다. 

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/icon-font.html" region_tag="iconfont" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media/icon-font.html){: target="_blank" .external }

수백 개의 유료 및 무료 아이콘 글꼴이 있습니다(예: [Font
Awesome](https://fortawesome.github.io/Font-Awesome/),
[Pictos](http://pictos.cc/){: .external } 및 [Glyphicons](https://glyphicons.com/)).

추가적인 HTTP 요청 및 파일 크기와 아이콘의 필요성 간에
균형을 맞추세요. 예를 들어, 아이콘이 조금만 필요한 경우에는
이미지 또는 image sprite를 사용하는 것이 더 나을 수 있습니다.


## 성능을 위해 이미지를 최적화

대개 이미지는 다운로드되는 바이트의 대부분을 차지하며,
또한 페이지에서 시각적 공간의 상당 부분을 차지합니다. 결과적으로,
이미지를 최적화하면 바이트를 최대한 절약할 수 있고 웹사이트에 맞게
성능을 개선할 수 있습니다. 또한 브라우저가 다운로드해야 하는
바이트가 줄어들고, 고객의 대역폭에 여유가 생기고, 브라우저가
모든 자산을 더 빨리 다운로드하고 표시할 수 있습니다.


### TL;DR {: .hide-from-toc }
- 이미지 형식을 함부로 선택하지 마세요. 어떤 형식이 사용 가능한지 이해하고 가장 적합한 형식을 사용하세요.
- 파일 크기를 줄여주는 이미지 최적화 및 압축 도구를 워크플로에 포함하세요.
- 자주 사용하는 이미지를 image sprite에 배치하면 http 요청 수를 줄일 수 있습니다.
- 초기 페이지 로드 시간을 개선하고 초기 페이지 크기를 줄이려면, 이미지가 뷰로 스크롤된 후에만 이미지를 로드하도록 하세요.


### 올바른 형식 선택

두 가지 유형의 이미지, 즉 [벡터 이미지](https://en.wikipedia.org/wiki/Vector_graphics)
및 [래스터 이미지](https://en.wikipedia.org/wiki/Raster_graphics)를 고려할 수 있습니다.
래스터 이미지의 경우에는 또한 올바른 압축 형식을 선택해야 합니다.
예: `GIF`, `PNG`, `JPG`.

사진, 기타 이미지와 같은 **래스터 이미지**는 개별 점 또는 픽셀들이 모인
그리드로 표현됩니다. 일반적으로 래스터 이미지는 카메라나
스캐너로부터 만들어지거나 브라우저에서 `canvas` 요소로 만들어질 수 있습니다.  이미지
크기가 더 커질수록 파일 크기도 커집니다.  원래 크기보다 더 크게
확대되는 경우에는, 누락된 픽셀을 어떻게 채울지 브라우저가
추측해야 하기 때문에 래스터 이미지가 흐려집니다.

로고, 라인 아트 등의 **벡터 이미지**는 곡선, 선, 셰이프 및 채우기
색상으로 정의됩니다. 벡터 이미지는
Adobe Illustrator 또는 Inkscape와 같은 프로그램으로 만들어져
[`SVG`](https://css-tricks.com/using-svg/)와 같은 벡터 형식으로 저장됩니다.  벡터 이미지는 단순 원시 유형을
기반으로 작성되므로, 파일 크기 변경이나 화질 손실 없이도 이미지의 배율을
조정할 수 있습니다.

적절한 형식을 선택할 때는 이미지 원본(래스터 또는 벡터)과
콘텐츠(색상, 애니메이션, 텍스트 등)를 둘 다 고려하는 것이 중요합니다.
한 형식이 모든 이미지 유형에 맞지는 않으며 각 형식은 고유의 장단점을
가지고 있습니다.

적절한 형식을 선택하려면 다음 지침에 따라 시작하세요.

* 사진 이미지에는 `JPG`를 사용합니다.
* 로고 및 라인 아트와 같은 벡터 아트 및 단색 그래픽에는 `SVG`를 사용합니다.
  벡터 아트를 사용할 수 없는 경우 `WebP` 또는 `PNG`를 사용해 보세요.
* 더 많은 색상을 허용하고 더 나은 압축율을 제공하므로,
`GIF` 대신 `PNG`를 사용하세요.
* 길이가 긴 애니메이션의 경우, `<video>`를 사용하면 화질이
더 향상되고 사용자가 재생을 제어할 수 있습니다.

### 파일 크기 줄이기

저장 후에 이미지를 '사후 처리'하여 파일 크기를 상당히
줄일 수 있습니다. 손실 및 무손실, 온라인, GUI, 명령줄 등 이미지 압축을 위한
다양한 도구들이 있습니다.  워크플로에서 최고의 이미지를 보장하려면, 가능한 경우
자동 이미지 최적화를 시도하는 것이 가장 좋습니다.

`JPG`
및 `PNG` 파일에 추가적인 무손실 압축을 수행하는 여러 가지 도구가 있으며 이들 도구는 화질에 영향을 미치지 않습니다. `JPG`의 경우,
[jpegtran](http://jpegclub.org/){: .external } 또는
[jpegoptim](http://freshmeat.net/projects/jpegoptim/){: .external }을 사용해 보세요(Linux에서만 사용 가능,
--strip-all 옵션으로 실행). `PNG`의 경우,
[OptiPNG](http://optipng.sourceforge.net/){: .external } 또는
[PNGOUT](http://www.advsys.net/ken/util/pngout.htm)을 사용해 보세요.

### image sprite 사용

<img src="img/sprite-sheet.png" class="attempt-right" alt="예시에서 사용된 image sprite 시트">

CSS sprite란 여러 이미지를 단일 'sprite 시트' 이미지에
결합하는 기법입니다. 그런 다음, 정확한 부분을 표시하는 오프셋과 함께
요소(sprite 시트)의 배경 이미지를 지정하여 개별 이미지들을
사용할 수 있습니다.

<div style="clear:both;"></div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/responsive/_code/image-sprite.html" region_tag="sprite" adjust_indentation="auto" %}
</pre>

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/media//image-sprite.html){: target="_blank" .external }

sprite는 여러 이미지를 가져오는 데 필요한 다운로드의 수를
줄여주면서도 여전히 캐싱이 가능하다는 이점이 있습니다.

### 지연 로딩 고려

지연 로딩은 필요할 때마다
페이지를 로딩하거나 기본 콘텐츠의 로딩과 렌더링이 완료될 때 페이지를 로딩하는 방식으로, 화면에 표시되지 않은 하단부에 많은 이미지가 포함된 긴 페이지에서 로딩 속도를
상당히 개선할 수 있습니다.  지연 로딩을 사용하면 성능이
향상될 뿐만 아니라 무한 스크롤 환경을 만들 수도 있습니다.

보이는 대로 콘텐츠가 로드되기 때문에 검색 엔진에 해당 콘텐츠가
나타나지 않을 수도 있으므로, 무한 스크롤 페이지를 만들 때 주의하세요.  또한 새 콘텐츠가
항상 로드되기 때문에, 하단에 나올 것으로 예상되는 정보를 찾는 사용자가
하단을 볼 수 없습니다.



## 이미지는 절대 피하세요

때로는 실제로 이미지가 아닌 것이 최고의 이미지일 수 있습니다. 가능하면,
브라우저의 기본 기능을 사용하여 동일하거나 유사한 기능을
제공하세요.  이전에는 이미지가 필요했을 수 있는 시각적 효과를 브라우저가
생성해 줍니다.   즉, 이제 브라우저는 별도의 이미지 파일을
다운로드할 필요가 없으므로 조악한 배율의 이미지를 차단합니다.  유니코드 또는 특수 아이콘 글꼴을 사용하여 아이콘을 렌더링할 수 있습니다.

### 이미지에 삽입하는 대신 마크업에 텍스트를 배치

가능하면, 텍스트는 그대로 사용해야 하며 이미지에 삽입해서는 안 됩니다. 예를 들어,
헤드라인에 이미지를 사용하는 경우나 전화번호, 주소 등의
연락처 정보를 이미지에 직접 넣는 경우, 사용자가 정보를 복사하여
붙여넣을 수 없고, 스크린 리더가 정보에 액세스할 수 없으며
반응하지 않습니다.  그 대신 텍스트를 마크업에 배치하고 필요한 경우
웹 글꼴을 사용하여 필요한 스타일을 얻으세요.

### CSS를 사용하여 이미지 대체

최신 브라우저에서 CSS 함수를 사용하면, 이전에는 이미지가
필요했던 스타일을 만들 수 있습니다.  예를 들어, 복잡한 그라데이션은
`background` 속성을 사용하여 만들 수 있고, 그림자는 `box-shadow` 속성을 사용하여 만들 수 있고,
둥근 모서리는 `border-radius` 속성을 사용하여 추가할 수 있습니다.

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }

  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

이러한 기법을 사용하려면 렌더링 주기가 필요하며
모바일에서 상당한 부담이 될 수 있다는 점에 유의하세요.  지나치게 사용할 경우, 얻을 수 있는 이점이 사라지고
성능이 떨어질 수 있습니다.


{# wf_devsite_translation #}
