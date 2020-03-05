project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 스크롤 응답 성은 사용자가 모바일 웹 사이트에 참여하는 데 중요하지만 휠 이벤트 리스너는 종종 심각한 스크롤 성능 문제를 유발합니다. 기본적으로 사용자와 개발자가 빠른 속도를 유지하도록 돕는 방법에 대해 알아보십시오.

{# wf_updated_on: 2019-09-14 #} {# wf_published_on: 2019-02-07 #} {# wf_tags: interventions,chrome73 #} {# wf_featured_image: /web/updates/images/generic/warning.png #} {# wf_featured_snippet: Scrolling responsiveness is critical to the user's engagement with a website on mobile, yet <code>wheel</code> event listeners often cause serious scrolling performance problems. Learn how we are helping users and developers to be fast by default. #} {# wf_blink_components: N/A #}

# 휠 스크롤 속도를 향상시키기 {: .page-title }

{% include "web/_shared/contributors/sahel.html" %}

`wheel` 스크롤 / 줌 성능을 향상시키기 위해 개발자는 `{passive: true}` 옵션을 `addEventListener()` 에 전달하여 `wheel` 및 `mousewheel` [이벤트 리스너를 수동](/web/updates/2016/06/passive-event-listeners) 으로 등록하는 것이 좋습니다. 이벤트 리스너를 패시브로 등록하면 휠 리스너가 `preventDefault()` 호출하지 않으며 브라우저는 리스너를 차단하지 않고 스크롤 및 확대 / 축소를 안전하게 수행 할 수 있음을 브라우저에 알립니다.

문제는 휠 이벤트 리스너가 개념적으로 수동적이지만 `preventDefault()` 호출하지 않음 `preventDefault()` 명시 적으로 지정되지 않아 브라우저가 대기 중이지만 스크롤 / 확대를 시작하기 전에 JS 이벤트 처리가 완료되기를 기다려야한다는 것입니다 필요가 없습니다. Chrome 56에서는 [`touchstart` 및 `touchmove` 이 문제를 해결했으며](/web/updates/2017/01/scrolling-intervention) 나중에 Safari와 Firefox [`touchstart`](/web/updates/2017/01/scrolling-intervention) 변경 사항을 채택했습니다. 그 당시 우리가 만든 데모 비디오에서 알 수 있듯이 스크롤 응답에서 눈에 띄게 지연되는 동작은 그대로 두었습니다. 이제 Chrome 73에서는 `wheel` 및 `mousewheel` 이벤트에 동일한 개입을 적용했습니다.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="65VMej8n23A" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## 중재

이 변경의 목표는 개발자가 코드를 변경할 필요없이 휠 또는 터치 패드로 스크롤을 시작한 후 디스플레이를 업데이트하는 데 걸리는 시간을 줄이는 것입니다. 우리의 통계에 따르면 루트 대상 (창, 문서 또는 본문)에 등록 된 `wheel` 및 `mousewheel` 이벤트 리스너의 75 %가 수동 옵션에 값을 지정하지 않으며 이러한 리스너의 98 % 이상이 `preventDefault()` 호출하지 않습니다 . Chrome 73에서는 루트 대상 (창, 문서 또는 본문)에 등록 된 `wheel` 및 `mousewheel` 리스너가 기본적으로 수동으로 변경됩니다. 다음과 같은 이벤트 리스너를 의미합니다.

```js
window.addEventListener("wheel", func);
```

는 다음와 같습니다.

```js
window.addEventListener("wheel", func, {passive: true});
```

또한 리스너내에서 `preventDefault()`를 호출하는 것은 아래의 개발자도구 경고 메시지와 함께 무시될 것입니다.

```
[Intervention] Unable to preventDefault inside passive event listener due
to target being treated as passive. See https://www.chromestatus.com/features/6662647093133312
```

## 피해 안내

대부분의 경우 파손이 관찰되지 않습니다. 드문 경우지만 (Google 통계에 따라 페이지의 0.3 % 미만 `preventDefault()` 기본적으로 수동으로 처리되는 리스너 내에서 `preventDefault()` 호출이 무시되어 의도하지 않은 스크롤 / 줌이 발생할 수 있습니다. 응용 프로그램은 `defaultPrevented` 속성을 통해 `preventDefault()` 호출이 영향을 미쳤는지 확인하여이 오류가 발생했는지 확인할 수 있습니다. 영향을받는 경우에 대한 수정은 비교적 쉽습니다. `{passive: false}` 를 `addEventListener()` 전달하여 기본 동작을 대체하고 이벤트 리스너를 차단으로 유지하십시오.

## 피드백 {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
