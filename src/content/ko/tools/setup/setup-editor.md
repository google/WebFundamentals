project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 코드 편집기는 개발자의 주된 개발 도구입니다. 코드를 작성하고 저장하는 데 쓰입니다. 편집기의 단축키를 익히고 주요 플러그인을 설치하면 더 우수한 코드를 더욱 빠르게 작성할 수 있습니다.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2014-05-28 #}

# 편집기 설정 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

코드 편집기는 개발자의 주된 개발 도구입니다. 코드를 작성하고 저장하는 데 쓰입니다. 편집기의 단축키를 익히고 주요 플러그인을 설치하면 더 우수한 코드를 더욱 빠르게 작성할 수 있습니다.


### TL;DR {: .hide-from-toc }
- 단축키를 맞춤설정할 수 있고 더 나은 코드를 작성할 수 있게 도와주는 유용한 플러그인이 많은 편집기를 선택하세요.
- 패키지 관리자를 사용하면 플러그인을 검색, 설치하고 업데이트하는 과정이 한결 간편해집니다.
- 개발 과정 중 생산성을 유지하는 데 유용한 플러그인을 설치하세요. 우선 이 가이드에 소개된 권장 항목부터 시작하세요.


## Sublime 텍스트 편집기 설치

[Sublime](http://www.sublimetext.com/){: .external }은 강력한 기능을 제공하는 우수한 편집기로,
코드 작성을 즐겁게 만들어줍니다. 패키지 관리자를 설치하면
손쉽게 플러그인을 설치하고 새 기능을 추가할 수 있습니다.

현재 Sublime Text에는 두 가지 다운로드 옵션이 있습니다. 하나는 [버전 2](http://www.sublimetext.com/2)이고 다른 하나는 [버전 3](http://www.sublimetext.com/3)입니다. 버전 3도 제법 안정적이고 Sublime Text 2에서는 이용할 수 없었던 패키지에 액세스할 수 있지만, 버전 2가 더 신뢰할 수 있습니다.

참고: Sublime을 익히고 애용하는 방법에 관한 Rob Dodson의 <a href='http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/'>블로그 게시물</a>은 편집기를 최대한 활용하는 데 도움이 되는 훌륭한 참조 자료입니다. 여기서 다루는 개념은 Sublime뿐만 아니라 모든 텍스트 편집기에 관련됩니다.

## 패키지 관리자를 사용하는 이유

패키지 관리자를 사용하면 패키지와 플러그인을 간편하게 검색, 설치하고 최신 상태로
유지할 수 있습니다.

<img src="imgs/package_control.png" class="center" alt="Sublime 텍스트 편집기 패키지 컨트롤의 스크린샷"/>

Sublime용 패키지 관리자를 설치하려면 [https://packagecontrol.io/installation](https://packagecontrol.io/installation)의
지침을 따르면 됩니다.

이 작업은 한 번만 하면 됩니다. 작업을 마치면 아래에 기재된 권장 플러그인 목록을
참조하세요.

## 플러그인 설치

플러그인은 더욱 생산적으로 작업하는 데 도움이 됩니다. 작업을 수행하려면 다른 도구로 계속 다시 돌아가게 만드는 작업에는
어떤 것이 있을까요?

Linting - 이를 위한 플러그인이 있습니다. 커밋되지 않은 변경 사항이 무엇인지 표시
- 이를 위한 플러그인도 있습니다. 다른 도구(예: Github)와 통합해야 한다면, 
이에 필요한 플러그인도 제공됩니다.

패키지 관리자는 플러그인을 검색, 설치 및 업데이트하는 작업을 매우 용이하게 해줍니다.

1. Sublime 텍스트 편집기에서 패키지 관리자를 엽니다(ctrl+shift+p). 
2. 'Install Package'를 입력합니다. 
3. 찾고자 하는 플러그인의 이름을 입력합니다. (아니면 모든 
플러그인을 검색할 수도 있습니다.)

다음 [인기 Sublime Text
 플러그인 목록](https://packagecontrol.io/browse)을 둘러보세요. 다음은 개발 속도를 높이는 데 도움이 되기 때문에 
여러분에게 설치하도록 권장하고 싶은 플러그인입니다.

### Autoprefixer

CSS에 공급업체 접두사를 추가할 신속한 방안을 원하신다면, 이 
편리한 플러그인이 제격입니다.

공급업체 접두사를 무시하고 CSS를 작성한 다음 이를 추가하려면 
`ctrl+shift+p`를 누르고 `Autoprefix CSS`를 입력하면 됩니다.

[이 작업을 빌드 프로세스에서 자동화하는 방법도 다루고
있습니다](/web/tools/setup/setup-buildtools).
이렇게 하면 CSS를 간결하게 유지할 수 있으며
`ctrl+shift+p`를 눌러야 한다는 사실을 기억하지 않아도 됩니다.

<img src="imgs/sublime-autoprefixer.gif" alt="Sublime Autoprefixer 플러그인 예시" />

### ColorPicker

색상표에서 아무 색이나 선택하고 `ctrl+shift+c`를 사용하여 CSS에 추가합니다.

<img src="imgs/sublime-color-picker.png" alt="Sublime Color Picker 플러그인" />

### Emmet

텍스트 편집기에 몇 가지 유용한 키보드 단축키와 스니펫을 추가할 수 있습니다. 
[Emmet.io](http://emmet.io/){: .external }의 동영상에서는 이 플러그인의 다양한 기능을 간략하게 소개합니다. (개인적으로
마음에 드는 기능은 'Toggle Comment' 명령입니다.)

<img src="imgs/emmet-io-example.gif" alt="Emmet.io 플러그인 데모" />

### HTML-CSS-JS prettify

이 확장 프로그램은 HTML, CSS 및 JS의 서식을 지정하는 명령을 제공합니다. 파일을 저장할 때 
언제든지 파일을 꾸밀(prettify) 수도 있습니다.

<img src="imgs/sublime-prettify.gif" alt="Sublime Prettify 플러그인의 gif 파일" />

### Git Gutter

파일에 변경이 적용될 때마다 여백에 마커를 추가할 수 있습니다.

<img src="imgs/sublime-git-gutter.png" alt="Git Gutter 플러그인의 스크린샷" />

### Gutter Color

참고: 이것은 Sublime Text 3에서만 이용할 수 있습니다.

Gutter Color는 CSS 옆에 작은 색 샘플을 표시합니다.

<img src="imgs/sublime-gutter-color.png" alt="Sublime Gutter Color 스크린샷" />

이 플러그인은 ImageMagick이 필요합니다. Mac OS X를 사용하는 경우, 
[CactusLabs](http://cactuslab.com/imagemagick/){: .external }에서 제공하는 설치 프로그램을 사용해보도록 권장합니다. (이 프로그램을 실행하려면 컴퓨터를 
다시 시작해야 할 수도 있습니다.)





{# wf_devsite_translation #}
