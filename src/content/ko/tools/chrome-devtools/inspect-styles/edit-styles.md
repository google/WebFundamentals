project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools의 Styles 창을 사용하여 요소와 연관된 CSS 스타일을 검사하고 수정합니다.

{# wf_updated_on: 2016-02-25 #}
{# wf_published_on: 2015-04-13 #}

# 스타일 편집 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

요소에 연관된 CSS 스타일을 수정하려면 <strong>Styles</strong> 창을 사용합니다.


![Styles 창](imgs/styles-pane.png)


### TL;DR {: .hide-from-toc }
- Styles 창을 사용하면 가능한 가장 많은 방법으로 CSS를 로컬에서 변경할 수 있습니다. 여기에는 기존 스타일 편집, 새 스타일 추가 및 스타일 규칙 추가 등이 포함됩니다.
- 스타일이 지속되기를 원한다면(새로고침 실행 후 없어져 버리지 않도록) 개발 작업 영역에 지속적으로 유지해야 합니다.


## 요소에 적용된 스타일 검사

[요소를 선택](edit-dom#inspect-an-element)하여 그 스타일을 검사합니다.
**Styles** 창에는 선택한 요소에 적용된 CSS 규칙이 
우선순위가 가장 높은 것부터 가장 낮은 순서로 표시됩니다.

* 맨 위에 `element.style`이 있습니다. 이들은 
스타일 속성(예: 
`<p style="color:green">`)을 사용하여 요소에 직접 적용한 스타일이거나 DevTools에서 적용된 스타일입니다.

* 그 아래에 해당 요소에 일치하는 모든 CSS 규칙이 나열됩니다. 예를 들어
아래의 스크린샷을 보면 선택한 요소가 `tools.css`에서 정의된 규칙으로부터 
`line-height:24px`를 수신합니다.

* 그 아래는 상속한 스타일로, 여기에 선택한 요소의 상위 항목과 일치하는 
상속 가능한 스타일이 모두 포함됩니다. 예를 들어
아래 스크린샷에서 선택한 요소는 `user agent stylesheet`로부터
`display:list-item`을 상속합니다.

아래 이미지의 레이블은 그 아래 번호가 매겨진 항목에 해당합니다.

![주석이 달린 Styles 창](/web/tools/chrome-devtools/inspect-styles/imgs/styles-annotated.png)

1. 요소와 일치하는 선택기와 연관된 스타일입니다.
2. [사용자 에이전트 스타일시트](http://meiert.com/en/blog/20070922/user-agent-style-sheets/)는
명확하게 레이블이 지정되어 있으며, 대개 웹 페이지의 CSS에 의해 재정의됩니다.
3. **cascading 규칙**으로 재정의된 규칙은
취소선 텍스트가 표시됩니다.
4. **상속된** 스타일은 'Inherited
from `<NODE>`' 헤더 아래에 그룹으로 표시됩니다. 헤더에서 DOM 노드를 클릭하면 DOM 트리 뷰에서 
해당 노드의 위치로 이동합니다. ([CSS 2.1
속성표](http://www.w3.org/TR/CSS21/propidx.html)를 보면 상속 가능한 속성이
무엇인지 표시되어 있습니다.)
5. 회색으로 처리된 항목은 정의되지 않았지만 그 대신
**런타임에 계산된** 규칙입니다.

cascading 및 상속이 어떤 식으로 작용하는지 이해하는 것이 스타일 디버깅에
대단히 중요합니다. cascade는 CSS 선언에 가중치를 
부여하는 방식과 관련되어 있습니다. 이를 통해 규칙이 또 다른 규칙과 중첩될 때 어느 쪽에 우선순위를 둬야 하는지 결정합니다. 상속은 HTML 요소가 각자의 포함 요소(상위 항목)로부터 
CSS 속성을 상속하는 방법과 관련이 있습니다. 자세한 내용은
[cascading에 대한 W3C  문서](http://www.w3.org/TR/CSS2/cascade.html)를 참조하세요.

## 선택기에 의해 영향을 받은 요소 검사

**Styles** 창에서 CSS 선택기 위로 마우스를 가져가면 해당 선택기에 의해 영향을 받은 모든
요소를 볼 수 있습니다. 예를 들어 아래 스크린샷에서는 
마우스를 선택기 
`.wf-tools-guide__section-link a`로 가져간 상태입니다. 실제 페이지에서는 이 선택기에 의해 영향을 받은
`<a>` 요소가 모두 표시됩니다. 

![선택기에 의해 영향을 받은 요소 보기](imgs/selector-hover.png)

**참고**: 이 기능은 요소를 뷰포트에서 강조표시할 뿐입니다. 뷰포트 외부의 다른 요소도
해당 선택기에 의해 영향을 받을 가능성이 있습니다. 

## CSS 클래스 추가, 활성화 및 비활성화{:#classes}

**.cls** 버튼을 클릭하면 현재 선택한 요소와 관련된 CSS 클래스를
모두 볼 수 있습니다. 그러면 다음과 같은 작업을 할 수 있게 됩니다.

* 현재 해당 요소와 연관된 클래스를 활성화 또는 비활성화합니다.
* 요소에 새 클래스를 추가합니다. 

![클래스 창](imgs/classes.png)

## 기존 이름 또는 값 편집

CSS 속성 이름 또는 값을 클릭하여 해당 항목을 편집합니다. 이름이나 값이 강조표시되어 있는 동안 
<kbd>Tab</kbd> 키를 누르면 다음 속성, 이름 또는 
선택기로 넘어갑니다. <kbd>Shift</kbd> 키를 누른 채로 <kbd>Tab</kbd> 키를 누르면 뒤로 이동합니다.

숫자로 된 CSS 속성 값을 편집하는 경우에는 다음과 같은 단축키를 사용하여
숫자를 증감합니다.

* <kbd>Up</kbd> 및 <kbd>Down</kbd>은 값을 1씩 증감합니다.
또는 현재 값이 -1과 1 사이인 경우 .1씩 증감합니다.
* <kbd>Alt</kbd>+<kbd>Up</kbd> 및 <kbd>Alt</kbd>+<kbd>Down</kbd>을 사용하여 
값을 0.1씩 증감합니다.
* <kbd>Shift</kbd>+<kbd>Up</kbd>은 10씩 증분하고 
<kbd>Shift</kbd>+<kbd>Down</kbd>은 10씩 감소합니다.
* <kbd>Shift</kbd>+<kbd>Page Up</kbd>(Windows, Linux) 또는 
<kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>Up</kbd>(Mac)을 사용하면 값을 
100씩 증분합니다. <kbd>Shift</kbd>+<kbd>Page Down</kbd>(Windows, Linux) 또는 
<kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>Down</kbd>(Mac)은 값을 
100씩 감소합니다. 

## 새 속성 선언 추가

편집할 수 있는 CSS 규칙 내에서 빈 공간을 클릭하여 새 선언을 만듭니다.
타이핑해서 입력하거나 CSS를 **Styles** 창에 붙여넣습니다. 속성과 그 값은
파싱되어 정확한 필드에 입력됩니다.

참고: 스타일 선언을 활성화 또는 비활성화하려면 그 옆에 있는 확인란을 선택하거나 선택 취소합니다.

## 스타일 규칙 추가

**New Style Rule**
(![새 스타일 규칙 버튼](imgs/new-style-rule.png){:.inline}) 버튼을 클릭하여
새 CSS 규칙을 추가합니다. 

이 버튼을 길게 클릭하면 해당 규칙을 어느 스타일시트에 추가할지 선택할 수 있습니다. 

## 동적 스타일(의사 클래스) 추가 또는 삭제{:#pseudo-classes}

동적 의사 클래스 선택기(예: `:active`, 
`:focus`, `:hover` 및 `:visited`)를 요소에 수동으로 설정할 수 있습니다. 

요소에 이러한 동적 상태를 설정하는 두 가지 방법이 있습니다.

* **Elements** 패널 내에서 요소를 마우스 오른쪽 버튼으로 클릭한 다음
메뉴에서 대상 의사 클래스를 선택하여 활성화 또는 비활성화합니다.
  
![요소를 마우스 오른쪽 버튼으로
클릭하여 의사클래스 선택기 활성화](imgs/pseudoclass-rightclick.png)

* **Elements** 패널에서 요소를 선택하고
**Styles** 창에서 **:hov** 버튼을 클릭한 다음, 확인란을 사용하여 현재 선택된 요소의 선택기를
활성화 또는 비활성화합니다.

  ![:hov 창](imgs/hov.png)

## 스타일 규칙에 배경색 또는 색상 추가

**Styles** 창에서는 스타일 규칙에 `color` 및
`background-color`선언을 추가하는 단축키를 제공합니다.

스타일 규칙의 오른쪽 아래에 세 점 아이콘이 있습니다. 스타일 규칙을 
보려면 해당 규칙 위로 마우스를 가져가야 합니다.

![규칙 집합 내의 세 점 아이콘](imgs/rule-set-three-dots-icon.png)

이 아이콘 위로 마우스를 가져가면 `color` 선언
(![색 선언 추가](imgs/add-color.png){:.inline})
또는 `background-color` 선언(![배경색 추가
선언](imgs/add-background-color.png){:.inline})을 추가할 수 있는 버튼이 나타납니다. 이들 버튼 중 하나를 클릭하면 
스타일 규칙에 선언을 추가할 수 있습니다. 

## Color Picker로 색 수정 {:#color-picker}

**Color Picker**를 열려면 색(예: `color: blue`)을
정의하는 **Styles** 창에서 CSS 선언을 찾습니다. 선언 값의 왼쪽에 
색이 지정된 작은 정사각형이 있습니다. 이 정사각형의 색은 
선언 값과 일치합니다. 이 작은 정사각형을 클릭하면 **Color Picker**가 열립니다.

![Color Picker 열기](imgs/open-color-picker.jpg)

**Color Picker**와 여러 가지 방식으로 상호작용할 수 있습니다.

1. **Eyedropper**. 자세한 내용은 [Eyedropper](#eyedropper)를 참조하세요. 
2. **현재 색**. **현재 값**을 시각적으로 표현한 것입니다.
3. **현재 값**. 
**현재 색**을 16진법, RGBA 또는 HSL 형식으로 표현한 것입니다.
4. **색상표**. 자세한 내용은 [색상표](#color-palettes)를
참조하세요.
5. **색조 및 음영 선택기**.
6. **색상(Hue) 선택기**.
7. **투명도 선택기**.
8. **색상 값 선택기**. 클릭하면 RGBA, HSL 및
16진법 사이를 전환합니다.
9. **색상표 선택기**. 클릭하면 여러 가지 템플릿을 선택할 수 있습니다.

![주석이 달린 Color Picker](imgs/annotated-color-picker.jpg)

[md]: https://www.google.com/design/spec/style/color.html

### Eyedropper {:#eyedropper}

**eyedropper** 버튼을 클릭하여
활성화합니다(![활성화된 eyedropper](imgs/eyedropper-enabled.png){:.inline}). 실제 페이지에서
색 위로 마우스를 가져간 뒤 클릭하면 현재 선택한
선언 값이 마우스를 가져간 색으로 설정됩니다.

![eyedropper 실행](imgs/eyedropper.jpg)

### 색상표 {:#color-palettes}

**Color Picker**는 다음과 같은 색상표를 제공합니다.

* **페이지 색**. 해당 페이지의 
CSS에서 일련의 색이 자동으로 생성됩니다.
* **머티리얼 디자인**. 
[머티리얼 디자인 사양][md]과 일치하는 일련의 색입니다. 
* **사용자설정**. 사용자가 선택한 모든 색의 집합입니다. DevTools는 사용자가 삭제할 때까지 사용자설정 
색상표를 여러 페이지에 걸쳐서 저장합니다. 

#### 사용자설정 색상표 수정 {:#custom-color-palette}

**더하기 기호** 버튼을 눌러 현재 색을 색상표에 추가합니다.
색을 길게 클릭하여 다른 위치로 끌어오거나 
**휴지통** 아이콘으로 끌어와서 삭제합니다. 색을 마우스 오른쪽 버튼으로 클릭한 다음 
**Remove color**를 선택하여 삭제합니다. **Remove all to the right**을 선택하면 
현재 선택한 색의 오른쪽에 있는 모든 색을 삭제합니다. 색상표 영역 내
아무 곳이나 마우스 오른쪽 버튼으로 클릭한 다음 **Clear template**을 선택하면
템플릿의 색이 모두 삭제됩니다.

## CSS 사용자설정 속성(CSS 변수) 보기 및 편집 {:#custom-properties}

[CSS 사용자설정
속성][intro](흔히 CSS 변수라고 부름)을 정의하거나 사용하는 선언도 다른 모든 선언과 마찬가지로 보고 편집할 수
있습니다. 

사용자설정 속성은 대체로 `:root` 
선택기에서 [정의][def]됩니다. `:root`에서 정의된 사용자설정 속성을 보려면, `html`
요소를 검사합니다.

![:root에서 정의된 사용자설정 속성](imgs/css-var-defined-on-root.png)

다만, 사용자설정 속성은 꼭 `:root` 선택기에서 정의해야만 하는 것은 아닙니다.
이를 다른 곳에서 정의하는 경우, 해당 속성이 지정된 요소를 검사해야
정의를 볼 수 있습니다.

사용자설정 속성을 사용하는 선언 값도 다른 모든 선언 값과 똑같이
보고 편집할 수 있습니다. 

아래의 스크린샷처럼 `var(--main-color)`와 같은 선언 값이 표시되는 경우, 
이는 해당 선언이 사용자설정 속성을 사용한다는 의미입니다. 이러한 
값도 다른 모든 선언 값과 마찬가지로 편집할 수 있습니다. 현재로서는 사용자설정 정의로
점프할 방법이 없습니다.

![사용자설정 속성 사용](imgs/css-var-in-use.png)

[intro]: /web/updates/2016/02/css-variables-why-should-you-care
[def]: https://drafts.csswg.org/css-variables/#defining-variables

## Sass, Less 또는 Stylus 편집

Sass, Less, Stylus 또는 기타 CSS 전처리기를 사용하는 경우, 생성된 CSS 출력 파일을 스타일 편집기에서 편집해도 별 도움이 되지 않습니다. 이들은 원래 소스에 매핑되지 않기 때문입니다.

CSS 소스 맵의 경우, DevTools가 생성된 파일을 원래 소스 파일에 자동으로 매핑할 수 있습니다. 따라서 이를 Sources 패널에서 실시간으로 편집할 수 있고, DevTools를 나가거나 페이지를 새로 고치지 않고도 결과를 볼 수 있습니다. 

### 전처리기 워크플로

생성된 CSS 파일이 스타일을 제공한 요소를 검사하는 경우, Elements 패널에는 생성된 CSS 파일이 아니라 원래 소스 파일로 연결되는 링크가 표시됩니다.

![.scss 스타일시트를 보여주는 Elements 패널](imgs/sass-debugging.png)

소스 파일로 점프하려면:

1. 링크를 클릭하면 Sources 패널에서 (편집 가능한) 소스 파일이 열립니다.
2. 아무 CSS 속성 이름 또는 값이나 <kbd class="kbd">Ctrl</kbd> + **클릭**(또는 <kbd class="kbd">Cmd</kbd> + **클릭**)하면 소스 파일이 열리고 해당 줄로 점프합니다.

![scss 파일을 보여주는 Sources 패널](imgs/sass-sources.png)

DevTools에서 CSS 전처리기 파일에 변경 내용을 저장하면 CSS 전처리기가 CSS 파일을 다시 생성합니다. 그런 다음 DevTools가 새로 생성된 CSS 파일을 다시 로드합니다.

### CSS 소스 맵 및 자동 새로고침 활성화/비활성화

**CSS 소스 맵은 기본적으로 활성화되어 있습니다**. 생성된 CSS 파일의 자동 새로고침을 활성화하도록 선택할 수 있습니다. CSS 소스 맵 및 CSS 새로고침을 활성화하려면:

1. DevTools 설정을 열고 **General**을 클릭합니다.
2. **Enable CSS source maps** 및 **Auto-reload generated CSS**를 활성화합니다.

### 요구사항 및 잠재적 문제

- **외부 편집기에서 변경한 내용**은 연관된 소스 파일을 포함한 Sources 탭에 다시 포커스를 맞출 때까지 DevTools에서 감지되지 않습니다.
- Sass/LESS/기타 컴파일러로 생성한 **CSS 파일을 수동 편집**하면 페이지를 새로 고칠 때까지 소스 맵과의 연관 관계가 끊어집니다.
- **<a href="/web/tools/setup/setup-workflow">작업 영역</a>을 사용하는 경우** 생성된 CSS 파일도 해당 작업 영역에 매핑되도록 해야 합니다. 이것이 제대로 되었는지 확인하려면 Sources 패널 오른쪽 트리를 보고 CSS가 로컬 폴더에서 제공되는지 보면 됩니다.
- 소스 파일을 변경했을 때 **DevTools가 자동으로 스타일을 새로 고치도록 하려면** 전처리기를 소스 파일이 변경될 때마다 CSS 파일을 재생성하도록 설정해야 합니다. 그렇지 않으면 CSS 파일을 수동으로 재생성하여 페이지를 새로 고쳐야 변경 내용을 확인할 수 있습니다.
- **사이트에는 앱 또는 웹 서버에서 액세스해야 하며**(**file://** URL이 아니라), 해당 서버가 소스 맵(.css.map)과 소스 파일(.scss 등)은 물론 CSS 파일도 제공해야 합니다.
- Workspaces 기능을 사용하지 _않는_ 경우, 웹 서버가 `Last-Modified` 헤더도 제공해야 합니다.

소스 맵을 설정하는 방법을 알아보려면 [CSS 및 JS 전처리기 설정](/web/tools/setup/setup-preprocessors)을 참조하세요.




{# wf_devsite_translation #}
