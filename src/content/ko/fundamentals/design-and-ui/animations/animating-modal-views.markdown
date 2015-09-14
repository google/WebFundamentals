---
title: "모달 보기 애니메이션"
description: "앱에서 모달 보기 애니메이션 방법을 알아봅니다."
updated_on: 2014-10-21
key-takeaways:
  code:
    - "모달 보기는 드물게 사용해야 합니다. 불필요한 방해는 성가실 수 있습니다."
    - "애니메이션에 배율을 추가하면 멋진 '낙하' 효과가 발생합니다."
    - "사용자가 모달 보기를 해제할 때 재빨리 모달 보기를 제거해야 하지만, 사용자가 놀라지 않도록 약간 더 느리게 화면으로 가져와야 합니다."
notes:
  pointerevents:
    - "이전 버전의 Internet Explorer는 <code>pointer-event</code> 속성을 지원하지 않으므로 해당 버전에서는 수동으로 표시 속성을 전환해야 합니다. 단점은 프레임 변경을 '보류'하므로 <code>requestAnimationFrame</code> 콜백을 사용하여 애니메이션을 시작해야 한다는 점입니다. 프레임을 기다리지 않으면 단순히 모달 오버레이가 나타납니다."

---
<p class="intro">
  모달 보기는 중요한 메시지를 전달하고 사용자 인터페이스를 차단해야 하는 경우에 적합합니다. 이 보기는 방해가 되고 남용할 경우 사용자에게 거부감을 쉽게 줄 수 있으므로 사용 시 주의해야 합니다. 하지만 일부 경우에는 이 보기를 사용하는 것이 합리적이고 애니메이션을 추가하면 생명력을 불어넣을 수 있습니다.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways.code %}

<img src="imgs/gifs/dont-press.gif" alt="모달 보기 애니메이션" />

{% link_sample _code/modal-view-animation.html %}샘플 보기{% endlink_sample %}

모달 오버레이는 뷰포트에 정렬해야 하므로 `position`을 `fixed`로 설정해야 합니다.

{% highlight css %}
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
{% endhighlight %}

초기 `opacity`가 0이므로 보기에서 숨겨지지만, 클릭과 터치가 통과하도록 `pointer-events`를 `none`으로 설정해야 합니다. 그렇지 않으면 모든 상호작용이 차단되고 전체 페이지가 응답하지 않습니다. 마지막으로, `opacity` 및 `transform`을 애니메이션하기 때문에 `will-change`로 변경으로 표시해야 합니다([will-change 속성 사용]({{site.fundamentals}}/look-and-feel/animations/animations-and-performance.html#using-the-will-change-property) 참조).

보기가 표시되면 상호작용을 허용해야 하며 `opacity`가 1이어야 합니다.

{% highlight css %}
.modal.visible {
  pointer-events: auto;
  opacity: 1;
}
{% endhighlight %}

이제 모달 보기가 필요할 때마다 JavaScript를 사용하여 "visible" 클래스를 전환할 수 있습니다.

{% highlight javascript %}
modal.classList.add('visible');
{% endhighlight %}

이때 모달 보기는 애니메이션 없이 나타나므로 추가할 수 있습니다([사용자 지정 Easing]({{site.fundamentals}}/look-and-feel/animations/custom-easing.html) 참조).


{% highlight css %}
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
{% endhighlight %}

`scale`을 변형(transform)에 추가하면 보기가 화면에 약간 낙하하는 듯이 나타나는 멋진 효과가 연출됩니다. 기본 전환은 transform 및 opacity 속성에 모두 적용되며 사용자 지정 곡선을 가지며 기간은 0.1초입니다.

기간은 아주 짧지만, 사용자가 보기를 종료하고 앱으로 돌아가려는 경우에 적합합니다. 단점은 모달 보기가 나타날 때 너무 공격적이라는 점입니다. 이를 해결하려면 `visible` 클래스의 전환 값을 재정의해야 합니다.

{% highlight css %}
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
{% endhighlight %}

이제 모달 보기가 화면에 표시되는 데 0.3초가 걸리므로 덜 공격적이고, 빠르게 해제되므로 사용자가 높이 평가합니다.



