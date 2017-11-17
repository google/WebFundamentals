project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: easing in, easing out 및 easing in out 중에 프로젝트에 적합한 easing을 선택합니다. 더 많은 재미를 원하시면 바운스를 사용하세요!

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# 적합한 Easing 선택 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

애니메이션에 사용할 수 있는 다양한 easing 옵션을 살펴보고 프로젝트에 어떤 종류를 사용하고 애니메이션에 어떤 종류의 기간을 사용해야 하는지 설명합니다.

### TL;DR {: .hide-from-toc }
* UI 요소에 ease-out 애니메이션을 사용합니다. Quintic ease-out은 빠르고 매우 멋진 ease입니다.
* 애니메이션 기간을 사용합니다. ease-out 및 ease-in은 200ms - 500ms여야 하며, 바운스 및 elastic ease는 800ms - 1200ms여야 합니다.


<img src="images/quintic-ease-out-markers.png" alt="Quintic ease-out 애니메이션 곡선" style="max-width: 300px" class="attempt-right"/>

일반적으로, **ease-out**은 적합한 호출이며 훌륭한 기본값입니다. 빠른 시작으로, 애니메이션에 바람직한 반응성을 제공한 후에 끝에서 감속합니다.

CSS에서 `ease-out` 키워드로 지정된 방정식을 넘어, '공격성'의 범위에 드는 잘 알려진 ease-out 방정식 그룹이 있습니다. 빠른 ease-out 효과를 내려면 [Quintic ease-out](http://easings.net/#easeOutQuint)을 고려하세요.


[Quintic ease-out 애니메이션 참조](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-quintic-ease-out.html){: target="_blank" .external }

다른 easing 방정식, 특히 바운스 또는 elastic ease는 프로젝트에 적합한 경우에만 드물게 사용해야 합니다. 불편한 애니메이션만큼 거슬리는 것도 없습니다. 프로젝트가 재미를 위한 것이 아닌 경우에는, 요소가 UI 주변에 바운드되지 않도록 하세요. 반대로, 경쾌한 사이트를 만드는 중이면 바운스를 사용하세요!

다양한 ease를 시도해 보고 어느 것이 프로젝트의 개성과 일치하는지 확인하는 작업부터 시작하세요. easing 유형의 전체 목록과 데모에 대해서는 [easings.net](http://easings.net)을 참조하세요.

## 정확한 애니메이션 기간 선택

프로젝트에 추가한 애니메이션이 정확한 기간을 갖는 것은 중요합니다. 너무 짧으면 애니메이션이 공격적이고 날카로운 느낌을 주고 너무 길면 방해가 되고 성가시게 됩니다.

* **Ease-out: 약 200ms-500ms**. 애니메이션을 눈으로 볼 수 있지만 방해가 되지 않습니다.
* **Ease-in: 약 200ms-500ms**. 종료 시 흔들립니다. 타이밍에 변화가 없으면 그 효과가 완화됩니다.
* **바운스 또는 탄성 효과: 약 800ms-1200ms**. 탄성 또는 바운스 효과가 '완화'될 시간을 허용해야 합니다. 이 추가 시간이 없으면 애니메이션의 탄성 바운스 부분이 눈에 거슬리고 공격적인 느낌을 줍니다.

물론, 이는 가이드라인에 불과합니다. 다양한 ease를 시도해 보고 프로젝트에 적합한 것을 선택하세요.




{# wf_devsite_translation #}
