project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 상당히 많은 웹들이 여러 디바이스 사용성을 고려하여 최적화 되어 있지 않다. 당신의 사이트를 모바일, 데스크탑 또는 어떠한 스크린에서도 동작할 수 있도록 기본을 배워보자.

{# wf_review_required #}
{# wf_updated_on: 2014-10-28 #}
{# wf_published_on: 2000-01-01 #}

# viewport 세팅하기 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}


다양한 기기들에 최적화 된 페이지는 다큐멘트 헤더에 meta viewport 요소를 포함하고 있어야 합니다. meta viewport 태그는 어떻게 브라우저가 페이지 스케일링과 크기를 제어할 수 있도록 가이드 합니다.

## TL;DR {: .hide-from-toc }
- meta viewport 태그를 사용하여 브라우저 뷰포트의 너비와 스케일링을 조절합니다.
- <code>width=device-width</code> 를 이용하여 기기 너비에 맞춰 화면의 크기를 맞춥니다.
- '<code>initial-scale=1</code> 를 이용하여 CSS 픽셀과 기기 종속적인 픽셀 간의 1:1 관계를 형성합니다.'
- 당신의 페이지는 사용자가 크기를 조정할 수 있도록 해야합니다.


사용자에게 더 나은 경험을 제공하기 위해서, 모바일 브라우저는 (대개 980px 정도, 기기 따라 다양함) 데스크탑 화면 너비로 페이지를 표시할 것입니다. 그리고 폰트 크기를 늘리고 화면에 맞게 컨텐츠를 조정함으로써 페이지 내용을 보기 좋게 합니다. 사용자들에게는 이것이 폰트 크기가 일정하지 않거나 컨텐츠를 보기 위해서 더블 터치 또는 줌인을 해야하는 것을 의미합니다.


    <meta name="viewport" content="width=device-width, initial-scale=1">
    


meta viewport의 `width=device-width` 값은 페이지가 특정 기기 크기에 맞춰 화면의 너비를 조정하게 합니다. 이것은 또한 페이지가 작은 모바일 폰이든 큰 데스크탑 모니터든 화면 크기에 따라 컨텐츠를 다시 그릴 수 있게 합니다.

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp-no.html %}
      <img src="imgs/no-vp.png" class="smaller-img" srcset="imgs/no-vp.png 1x, imgs/no-vp-2x.png 2x" alt="Page without a viewport set">
      See example
    {% endlink_sample %}
  </div>

  <div class="mdl-cell mdl-cell--6-col">
    {% link_sample _code/vp.html %}
      <img src="imgs/vp.png" class="smaller-img"  srcset="imgs/vp.png 1x, imgs/vp-2x.png 2x" alt="Page with a viewport set">
      See example
    {% endlink_sample %}
  </div>
</div>

몇몇 브라우저는 landscape 모드로 전환할 때 페이지 너비를 일정하게 하고, 화면 크기를 맞추기 위해 다시 그리기 보다 줌을 합니다. `initial-scale=1` 속성은 브라우저가 CSS 픽셀과 기기 오리엔테이션과 관계 없는 특정 기기 사이즈와의 1:1 관계를 맺게합니다. 또한, 페이지가 landscape 시에도 꽉찬 화면을 사용할 수 있도록 합니다.

<!-- TODO: Verify note type! -->
Note: 콤마를 사용하여 attributes를 분리하고, 오래된 브라우저들이 적절하게 그 attributes를 파싱할 수 있도록 하세요.

## 접근 가능한 viewport 설정

`initial-scale` 설정과 함께, 아래 속성들을 viewport에서 설정할 수 있습니다:

* `minimum-scale`
* `maximum-scale`
* `user-scalable`

위에 속성들이 설정되면, 사용자가 viewport를 줌하지 못하고 접근성에 있어 문제를 야기할 수 있습니다.
