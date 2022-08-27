project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 스크롤은 모바일 웹사이트에서 유저의 행위라고 부를 수 있는 동작들에게 중요한 문제입니다. 그러나 {code0}wheel{/code0} 이벤트 리스너는 심각한 스크롤 성능 문제를 야기합니다. 저희가 어떻게 개발자들이 이러한 문제를 해결할 수 있게 도와주고 있는지 확인해보세요.

{# wf_updated_on: 2019-02-01 #}
{# wf_published_on: 2019-02-07 #}
{# wf_tags: interventions,chrome73 #}
{# wf_featured_image: /web/updates/images/generic/warning.png #}
{# wf_featured_snippet: 스크롤은 모바일 웹사이트에서 유저의 행위라고 부를 수 있는 동작들에게 중요한 문제입니다. 그러나 <code>wheel</code> 이벤트 리스너는 심각한 스크롤 성능 문제를 야기합니다. 저희가 어떻게 개발자들이 이러한 문제를 해결할 수 있게 도와주고 있는지 확인해보세요. #}
{# wf_blink_components: N/A #}

# 휠 스크롤 속도를 향상시키기 {: .page-title }

{% include "web/_shared/contributors/sahel.html" %}

`wheel` 스크롤 / 확대 / 축소 성능을 향상 시키려면 `addEventListener()`에게 `{passive: true}` 옵션을 전달하여 `wheel` 및 `mousewheel` [이벤트 리스너를 수동](/web/updates/2016/06/passive-event-listeners) 으로 등록하는 것이 좋습니다. 이벤트 리스너를 수동으로 등록하면 브라우저에서 wheel 리스너가 `preventDefault()` 호출하지 않으며 브라우저가 리스너를 차단하지 않고 스크롤 및 확대 / 축소를 안전하게 수행 할 수 있음을 알립니다.

문제는 대부분 주로 휠 이벤트 리스너들은 태생적으로 수동이긴 하지만(`preventDefault()`를 호출하지 않습니다) 명시적으로 어떤 건 어떻다라고 정해지지 않아 브라우저는 굳이 기다릴 필요가 없는데도 자바스크립트 이벤트를 모두 처리할 때 까지 스크롤 / 확대 / 축소를 실행하지 않습니다. Chrome 56 버전에선 [touchStart와 touchMove 기능을 위해 이러한 문제점을 해결](/web/updates/2017/01/scrolling-intervention)했고, 사파리와 파이어폭스에서도 얼마 후에 이 기능을 탑재했습니다. 이 문제가 거론될 당시에 저희가 게시했던 영상에서 확인하실 수 있듯이, 스크롤 응답이 지연되어야 하는 상황인데도 불구하고 독립적으로 스크롤이 작동하고 있습니다. 현재 Chrome 73 버전에서 저희는 이러한 일종의 중재 기능을 `wheel`과 `mousewheel` 이벤트에도 탑재시켰습니다.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="65VMej8n23A" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## 중재

저희가 추구하는 바는 개발자들이 코드를 따로 수정하지 않더라도 사용자가 터치패드나 마우스 휠로 스크롤을 했을 때 다음 화면이 나타나는 시간을 단축시키는 것입니다. 저희 통계 지표로는 75%의 `wheel`과 `mousewheel` 이벤트 리스너는 패시브 옵션에 아무런 값도 할당하지 않은 최상위 객체에 등록이 되어있었고(window, document, body 등) 이러한 리스너들의 98%는 preventDefault()를 호출하지 않는 것으로 확인됐습니다. Chrome 73 버전에서는 `wheel`과 `mousewheel` 리스너를 최상위 객체(window, document, body 등)에 등록하되, 기본적으로 패시브 옵션이 적용될 수 있도록 수정했습니다. 이제 이벤트 리스너는 다음과 같은 맥락으로 볼 수 있습니다:

```js
window.addEventListener("wheel", func);
```

는 다음와 같습니다.

```js
window.addEventListener("wheel", func, {passive: true} );
```

또한 리스너내에서 `preventDefault()`를 호출하는 것은 아래의 개발자도구 경고 메시지와 함께 무시될 것입니다.

```
[Intervention] Unable to preventDefault inside passive event listener due
to target being treated as passive.See https://www.chromestatus.com/features/6662647093133312
```

## 피해 안내

대부분의 경우엔 어떠한 사이드 이펙트라고 부를만한 피해도 발견되지 않을 것입니다. 아주 일부의 경우에(지표상에는 0.3% 미만으로 예측하고 있습니다) 패시브가 기본 값으로 설정되서 `preventDefault()` 메소드 호출을 무시하는 리스너들이 의도하지 않았던 스크롤 / 확대 / 축소 기능에서 문제를 일으킬 것으로 보고 있습니다. 여러분들이 사용중인 어플리케이션에선 이러한 문제가 `preventDefault()`를 호출하는 것이 defaultPrevented 프로퍼티에 대한 어떤 사이드 이펙트를 야기하는지를 확인하는 것으로 문제의 해답을 판단할 수 있습니다. 관련된 케이스들을 위한 해결책은 상대적으로 간단합니다. `addEventListener`에게 `{passive: false}` 옵션을 전달해 기본 동작을 덮어쓰고 이벤트 리스너가 블로킹되는 것을 예방하세요.

## 피드백 {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
