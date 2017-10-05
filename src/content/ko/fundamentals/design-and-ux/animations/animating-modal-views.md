project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 앱에서 모달 뷰에 애니메이션을 적용하는 방법을 알아봅니다.

{# wf_updated_on: 2016-08-24 #}
{# wf_published_on: 2014-08-08 #}

# 모달 뷰 애니메이션 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/dont-press.gif" alt="모달 뷰 애니메이션" />
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/modal-view-animation.html" target="_blank" class="external">체험해 보기</a>
    </figcaption>
  </figure>
</div>

모달 뷰는 중요한 메시지를 전달하고 사용자 인터페이스를 차단해야 하는 경우에 적합합니다. 이 뷰는 남용할 경우 사용자에게 방해가 되고 쉽게 거부감을 줄 수 있으므로 사용 시 주의해야 합니다. 하지만 일부 경우에는 이 뷰를 사용하는 것이 합리적이고 애니메이션을 추가하면 생명력을 불어넣을 수 있습니다.

### TL;DR {: .hide-from-toc }
* 모달 뷰는 드물게 사용해야 하며, 불필요한 방해는 사용자를 성가시게 만들 수 있습니다.
* 애니메이션에 배율을 추가하면 멋진 '낙하' 효과가 발생합니다.
* 사용자가 모달 뷰를 해제할 때 재빨리 모달 뷰를 제거합니다. 하지만 사용자가 놀라지 않도록 약간 더 느리게 모달 뷰를 화면으로 가져옵니다.

<div class="clearfix"></div>

모달 오버레이는 뷰포트에 정렬해야 하므로, `position`을 `fixed`로 설정합니다.


    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    
      pointer-events: none;
      opacity: 0;
    
      will-change: transform, opacity;
    }
    

초기 `opacity`가 0이므로 뷰에서 숨겨지지만, 클릭과 터치가 통과하도록 `pointer-events`를 `none`으로 설정해야 합니다. 그렇지 않으면 모든 상호작용이 차단되고 전체 페이지가 응답하지 않습니다. 마지막으로, `opacity` 및 `transform`에 애니메이션을 적용하기 때문에 `will-change`에 의한 변경으로 표시되어야 합니다([will-change 속성 사용](animations-and-performance#using-the-will-change-property) 참조).

뷰가 표시되면 상호작용을 허용해야 하며 `opacity`가 1이어야 합니다.


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

이제 모달 뷰가 필요할 때마다 자바스크립트를 사용하여 'visible' 클래스를 전환할 수 있습니다.


    modal.classList.add('visible');
    

이 시점에서 모달 뷰는 애니메이션이 없이 나타나므로 이제 추가가 가능합니다
([사용자설정 Easing](custom-easing) 참조).


    .modal {
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    
      -webkit-transition:
        -webkit-transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

`scale`을 transform에 추가하면 뷰가 화면에 약간 낙하하듯이 보이는 멋진 효과가 연출됩니다. 기본 전환은 transform 및 opacity 속성에 모두 적용되며 사용자설정 곡선을 가지며 기간은 0.1초입니다.

기간은 아주 짧지만, 사용자가 뷰를 종료하고 앱으로 돌아가려는 경우에 적합합니다. 단점은 모달 뷰가 나타날 때 너무 공격적이라는 점입니다. 이를 해결하려면 `visible` 클래스의 전환 값을 재정의합니다.


    .modal.visible {
    
      -webkit-transform: scale(1);
      transform: scale(1);
    
      -webkit-transition:
        -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

이제 모달 뷰가 화면에 표시되는 데 0.3초가 걸리고 덜 공격적이지만 빠르게 해제되므로, 사용자가 높이 평가할 것입니다.





{# wf_devsite_translation #}
