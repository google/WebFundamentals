project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: tabindex로 DOM 순서 변경

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# tabindex 사용 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}

네이티브 요소의 DOM 위치가 제공하는 기본 탭 순서가
편리하기는 하지만 탭 순서를 수정하고 싶은 경우도 있을 것입니다.
HTML에서 요소를 물리적으로 이동하는 것은 때로 적합하지 못하거나 심지어
실현 불가능할 수도 있습니다. 이런 경우에는 `tabindex` HTML 속성을 사용하여
요소의 탭 위치를 설정합니다.

`tabindex`는 어떤 요소에든 적용할 수 있습니다. 그러나
모든 요소에서 반드시 필요한 것은 아니며 다양한 정수값 범위를 취합니다.
`tabindex`를 사용하면 포커스 가능한 요소에 대해 명시적 순서를 지정하고
포커스 불가능한 요소를 탭 순서에 삽입하고 탭 순서에서
요소를 제거합니다. 예를 들면 다음과 같습니다.

`tabindex="0"`: 일반적인 탭 순서에 요소를 삽입합니다. `Tab` 키를 누르거나
`focus()` 메서드를 호출하는 방식으로 요소에 포커스를
맞출 수 있습니다.

```
<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
```

{% framebox height="60px" %}

<style>
  custom-button {
    margin: 10px;
  }
</style>

<custom-button tabindex="0">Press Tab to Focus Me!</custom-button>
{% endframebox %}

`tabindex="-1"`: 일반적인 탭 순서에서 요소를 삭제하더라도
`focus()` 메서드를 호출하여 계속 요소에 포커스를 맞출 수 있습니다.

```
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
```

{% framebox height="80px" %}
<button id="foo" tabindex="-1">I'm not keyboard focusable</button>
<button onclick="foo.focus();">Focus my sibling</button>
{% endframebox %}

`tabindex="5"`: tabindex가 0보다 크면 요소가 일반적인 탭 순서 앞으로
점프합니다. tabindex가 0보다 큰
요소가 여러 개 있다면 탭 순서는 0보다 크고 가장 낮은 값부터 시작해서
계속 높은 값으로 이동합니다. 0보다 큰 tabindex를 사용하는 것은
**안티패턴**으로 간주됩니다.

```
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
```

{% framebox height="80px" %}
<button>I should be first</button>
<button>And I should be second</button>
<button tabindex="5">But I jumped to the front!</button>
{% endframebox %}

헤더, 이미지 또는 문서 제목과 같은 비입력
요소에는 더욱 그렇습니다. 이런 종류의 요소에 `tabindex`를 추가하면 오히려 역효과를 낳습니다. 가능하면
DOM 시퀀스가 논리적인 탭 순서를 제공하도록 소스 코드를 적절히 배치하는 것이
좋습니다. `tabindex`를 사용한다면 버튼, 탭, 드롭다운, 텍스트 필드와
같이 사용자가 입력을 제공할 것으로 예상되는 요소인 사용자설정 대화형 컨트롤로 제한하세요.

스크린 리더에는
`tabindex`가 없으므로 사용자가 중요한 콘텐츠를 놓치지 않을까 걱정하지 마세요. 이미지와 같이 매우 중요한 콘텐츠라도
사용자가 상호작용할 수 있는 대상이 아니라면 포커스 가능하게 만들 이유가 없습니다.
스크린 리더 사용자는 적절한 `alt` 속성 지원을 제공하기만 한다면
이미지 콘텐츠를 이해하는 데는 문제가 없습니다. 이 속성 지원에 대해서는 잠시 후 다룰 것입니다.

## 페이지 수준에서 포커스 관리

`tabindex`가 단순히 유용할 뿐 아니라 꼭 필요할 때가 있습니다. 다 표시할 수는 없지만
여러 가지 다른 콘텐츠 섹션을 한 페이지에 통합하는 강력한
기능을 구현할 수 있습니다. 이 페이지에서는 내비게이션 링크를 클릭하면
페이지 새로고침을 수행하지 않고도 화면에 표시되는 콘텐츠를 변경할 수 있습니다.

이 경우, 여러분은 아마도 선택한 콘텐츠 영역을 식별하고
`tabindex`를 -1로 부여해서 일반적인 탭 순서에 나타나지 않게 한 다음
`focus` 메서드를 호출할 것입니다. 이 기술은 *포커스 관리*라고 하는데
사용자가 인지한 컨텍스트를 사이트의 시각적 콘텐츠와 일치된 상태로 유지할 수 있습니다.

## 구성 요소에서 포커스 관리

페이지에서 무언가를 변경할 때 포커스를 관리하는 것은 중요합니다. 그러나 때로는
컨트롤 수준에서 포커스를 관리해야 할 경우도 있습니다. 예를 들어,
사용자설정 구성 요소를 빌드하는 경우가 이에 해당합니다.

네이티브 `select` 요소를 생각해 보세요. 이 요소는 기본적인 포커스를 받을 수 있지만,
포커스를 받으면 화살표 키를 사용하여 추가적인 기능(선택 가능한 옵션)을
노출할 수 있습니다. 사용자설정 `select` 요소를 빌드한다면
주로 키보드를 사용하는 사용자가 여전히 컨트롤과 상호작용할 수 있도록 이와 동일한 유형의 동작을
노출하고 싶을 것입니다.

```
<!-- Focus the element using Tab and use the up/down arrow keys to navigate -->
<select>
  <option>Aisle seat</option>
  <option>Window seat</option>
  <option>No preference</option>
</select>
```

<select>
  <option>Aisle seat</option>
  <option>Window seat</option>
  <option>No preference</option>
</select>

어떤 키보드 동작을 구현할지 알기 어려울 수 있지만
참조하면 도움이 될 만한 문서가 있습니다.
[Accessible Rich Internet Applications(ARIA) Authoring Practices](https://www.w3.org/TR/wai-aria-practices/){: .external }
가이드는 구성 요소 유형과 이들이 지원하는 키보드 동작 유형을 보여줍니다.
나중에 ARIA에 대해서는 더욱 상세히 설명하겠지만 지금 이 가이드는
새로운 구성 요소에 키보드 지원을 추가하는 데 활용하겠습니다.

라디오 버튼 모음과 비슷하지만 개발자 자신의 고유한 모양과 동작을 구현하는 [사용자설정
요소](/web/fundamentals/getting-started/primers/customelements)를
만들고 고유한 외형과
동작을 적용할 수 있습니다.

```
<radio-group>
  <radio-button>Water</radio-button>
  <radio-button>Coffee</radio-button>
  <radio-button>Tea</radio-button>
  <radio-button>Cola</radio-button>
  <radio-button>Ginger Ale</radio-button>
</radio-group>
```

어떤 종류의 키보드 지원이 필요할지 결정하려면
[ARIA Authoring Practices 가이드](https://www.w3.org/TR/wai-aria-practices/){: .external }를 참조하세요.
섹션 2에는 디자인 패턴 목록이 있으며, 이 목록에는
[라디오 그룹의 특성표](https://www.w3.org/TR/wai-aria-practices/#radiobutton){: .external }가 있습니다.
이들은 새로운 요소에 가장 근접하게 일치하는 기존 구성 요소입니다.

표에 나와 있듯이, 공통적으로 지원해야 할 키보드 동작 중에
위쪽/아래쪽/왼쪽/오른쪽 화살표 키가 있습니다. 새로운 구성 요소에 이 동작을 추가할 때는
*이동 tabindex*라는 기술을 사용할 것입니다.

![W3C 사양에서 라디오 버튼에 대한 부분 발췌](imgs/radio-button.png)

현재 활성 상태인 하위 항목을 제외한 모든 하위 항목에 대해 `tabindex`를 -1로 설정하면
이동 tabindex가 작동합니다.

```
<radio-group>
  <radio-button tabindex="0">Water</radio-button>
  <radio-button tabindex="-1">Coffee</radio-button>
  <radio-button tabindex="-1">Tea</radio-button>
  <radio-button tabindex="-1">Cola</radio-button>
  <radio-button tabindex="-1">Ginger Ale</radio-button>
</radio-group>
```

이 구성 요소는 키보드 이벤트 리스너를 사용하여 사용자가 어느 키를 눌렀는지 확인합니다.
이때 이전에 포커스를 맞춘 하위 항목의
`tabindex`를 -1로 설정하고 포커스를 맞출 하위 항목의 `tabindex`를 0으로 설정한 다음
여기에 포커스 메서드를 호출합니다.

```
<radio-group>
  // Assuming the user pressed the down arrow, we'll focus the next available child
  <radio-button tabindex="-1">Water</radio-button>
  <radio-button tabindex="0">Coffee</radio-button> // call .focus() on this element
  <radio-button tabindex="-1">Tea</radio-button>
  <radio-button tabindex="-1">Cola</radio-button>
  <radio-button tabindex="-1">Ginger Ale</radio-button>
</radio-group>
```

사용자가 마지막(또는 첫 번째, 포커스 이동 방향에 따라 달라짐)
하위 요소에 도달하면 첫 번째(또는 마지막)
하위 요소로 다시 루프를 실행하여 포커스를 맞춥니다.

아래에서 완성된 예시를 실행해 볼 수 있습니다. DevTools에서 이 요소를
검사해 보면서 tabindex가 라디오 버튼 사이를 이동하는지 살펴보세요.

{% framebox height="130px" %}

<style>
  .demo {
    margin-left: 80px;
  }
  radio-button {
    position: relative;
    display: block;
    font-size: 18px;
  }
  radio-button:focus {
    outline: none;
  }
  radio-button::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    border: 1px solid black;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
  radio-button:focus::before {
    box-shadow: 0 0 3px 3px #83BEFF;
  }
  radio-button[aria-checked="true"]::before {
    content: '';
    display: block;
    width: 10px;
    height: 10px;
    background: red;
    position: absolute;
    left: -18px;
    top: 7px;
    border-radius: 50%;
  }
</style>

<div class="demo">
  <radio-group>
    <radio-button>Water</radio-button>
    <radio-button>Coffee</radio-button>
    <radio-button>Tea</radio-button>
    <radio-button>Cola</radio-button>
    <radio-button>Ginger Ale</radio-button>
  </radio-group>
</div>

<script src="https://cdn.rawgit.com/webcomponents/custom-elements/master/custom-elements.min.js"></script>

<script>
  class RadioButton extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radio');
      this.setAttribute('tabindex', -1);
      this.setAttribute('aria-checked', false);
    }
  }

  window.customElements.define('radio-button', RadioButton);

  // Define values for keycodes
  const VK_LEFT       = 37;
  const VK_UP         = 38;
  const VK_RIGHT      = 39;
  const VK_DOWN       = 40;

  class RadioGroup extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.setAttribute('role', 'radiogroup');
      this.radios = Array.from(this.querySelectorAll('radio-button'));

      // Setup initial state
      if (this.hasAttribute('selected')) {
        let selected = this.getAttribute('selected');
        this._selected = selected;
        this.radios[selected].setAttribute('tabindex', 0);
        this.radios[selected].setAttribute('aria-checked', true);
      } else {
        this._selected = 0;
        this.radios[0].setAttribute('tabindex', 0);
      }

      this.addEventListener('keydown', this.handleKeyDown.bind(this));
      this.addEventListener('click', this.handleClick.bind(this));
    }

    handleKeyDown(e) {
      switch(e.keyCode) {

        case VK_UP:
        case VK_LEFT: {
          e.preventDefault();

          if (this.selected === 0) {
            this.selected = this.radios.length - 1;
          } else {
            this.selected--;
          }
          break;

        }

        case VK_DOWN:
        case VK_RIGHT: {
          e.preventDefault();

          if (this.selected === this.radios.length - 1) {
            this.selected = 0;
          } else {
            this.selected++;
          }
          break;
        }

      }
    }

    handleClick(e) {
      const idx = this.radios.indexOf(e.target);
      if (idx === -1) {
        return;
      }
      this.selected = idx;
    }

    set selected(idx) {
      if (isFinite(this.selected)) {
        // Set the old button to tabindex -1
        let previousSelected = this.radios[this.selected];
        previousSelected.tabIndex = -1;
        previousSelected.removeAttribute('aria-checked', false);
      }

      // Set the new button to tabindex 0 and focus it
      let newSelected = this.radios[idx];
      newSelected.tabIndex = 0;
      newSelected.focus();
      newSelected.setAttribute('aria-checked', true);

      this.setAttribute('selected', idx);
      this._selected = idx;
    }

    get selected() {
      return this._selected;
    }
  }

  window.customElements.define('radio-group', RadioGroup);
</script>

{% endframebox %}

GitHub에서
[이 요소의 전체 소스](https://gist.github.com/robdodson/85deb2f821f9beb2ed1ce049f6a6ed47){: .external }를
확인할 수 있습니다.

## 모달 및 키보드 트랩

포커스를 관리할 때 때로는 피할 수 없는 상황에 직면할 수
있습니다. 포커스를 관리하고 탭 동작을 캡처하면서
이를 완료할 때까지 사용자가 떠나지 못하게 하는 자동완성 위젯을 생각해봅시다.
이것을 *키보드 트랩*이라고 하고 이는 사용자에게 매우 불만스러울 수 있습니다.
Web AIM 검사 목록의 섹션 2.1.2에서는 이 문제에 대해
[키보드 포커스는 특정 페이지 요소에서 잠그거나 트랩되어서는 안 됩니다](http://webaim.org/standards/wcag/checklist#sc2.1.2){: .external }라고 되어 있습니다.
사용자는 키보드만 사용하여 모든 페이지 요소를 이동할 수
있어야 합니다.

이상한 점은, 모달 창에서처럼 이 동작이 실제로 바람직할 때가 있다는
것입니다. 보통은 모달이 표시될 때 사용자가 모달 이면의 콘텐츠에
액세스할 수 있도록 하지는 않습니다. 오버레이를 추가하여 페이지를 시각적으로 덮을 수는 있지만
키보드 포커스가 우연히 모달 밖으로 나가지 못하게 막지는 못합니다.

![사용자에게 작업을 저장할지 묻는 모달 창](imgs/modal-example.png)

이 경우, 임시 키보드 트랩을 구현하여
모달이 표시되는 동안만 포커스를 트랩하고
모달이 닫히면 이전에 포커스를 받았던 항목으로 다시 포커스가 돌아가게 할 수 있습니다.

> 개발자 입장에서 이 작업을 더욱 쉽게 처리할 수 있게 해주는 방법이 있지만(예:
> `<dialog>` 요소), 브라우저에서 아직은 널리 지원되지 않습니다.
> 이 [MDN 기사](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog){: .external }에서
> `<dialog>`에 대한 추가 정보를 얻을 수 있고
> [모달 예시](https://github.com/gdkraus/accessible-modal-dialog){: .external }에서
> 모달 창에 대한 추가 정보를 얻을 수 있습니다.

몇몇 요소를 포함한 `div`와 배경 오버레이를 나타내는
또 다른 `div`로 표시되는 모달 대화상자를 생각해 봅시다. 이 상황에서 임시 키보드 트랩 구현에
필요한 기본적인 단계를 수행해 봅시다.

1. `document.querySelector`를 사용하여 모달 및 오버레이 div를 선택하고관련 참조를 저장합니다.
2. 모달이 열렸을 때 포커스가 주어졌던 요소에 대한 참조를 저장하여모달이 열릴 때 그 요소로 포커스를 되돌릴 수 있도록 합니다.
3. *keydown listener*를 사용하여 모달이 열려 있는 동안 키를 누를 때 키를 인식하도록합니다. 배경 오버레이에서 클릭 동작을 수신하여사용자가 배경 오버레이를 클릭하면 모달을 닫을 수도 있습니다.
4. 다음으로, 모달 내에서 포커스 가능한 요소 모음을 가져옵니다. 첫 번째와마지막의 포커스 가능한 요소는 포커스를 앞뒤로 루프 순환하면서 모달 내에 머무르도록할 시점을 알 수 있게 해주는 '센티널' 역할을 합니다.
5. 모달 창을 표시하고 포커스 가능한 첫 번째 요소를 포커스합니다.
6. 사용자가 `Tab` 또는 `Shift+Tab`을 누를 때 포커스를 앞이나 뒤로 이동하면서마지막 요소나 첫 번째 요소에서 적절히 루프를 수행하도록 합니다.
7. 사용자가 `Esc` 키를 누르면 모달을 닫습니다. 이렇게 하면 사용자가 닫기 버튼을 찾지 않고도모달을 닫을 수 있으므로 매우 유용합니다.이는 마우스를 사용할 때도 유용한 기능입니다.
8. 모달이 닫힐 때 모달과 배경 오버레이를 숨기고앞서 저장한 이전에 포커스를 받던 요소로 포커스를 복원합니다.

이 절차에 따르면 모든 사용자가 유용하고 쉽게 효과적으로 사용할 수 있는
모달 창을 제공할 수 있습니다.

더 자세한 내용은 이 [샘플 코드](https://github.com/udacity/ud891/blob/gh-pages/lesson2-focus/07-modals-and-keyboard-traps/solution){: .external }를
살펴보고
[완료된 페이지](http://udacity.github.io/ud891/lesson2-focus/07-modals-and-keyboard-traps/solution/index.html){: .external }의 라이브 예시를 살펴보세요.
