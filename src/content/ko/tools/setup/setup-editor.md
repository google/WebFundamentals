project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: Your code editor is your main development tool; you use it to write and save lines of code. Write better code faster by learning your editor's shortcuts and installing key plugins.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2014-05-28 #}

# Set Up Your Editor {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

Code editor는 개발의 메인 툴입니다.</br> 당연한 이야기지만 editor를 이용해서 코드를 쓰고 저장하곤 하죠. 코드를 보다 빨리, 보다 좋게 작성하는 방법중에 하나는 editor의 단축키와 키 플러그인을 설치해서 활용하는 방법이 있습니다. </br>그래서 여기서는 editor와 플러그인에 대한 소개가 주를 이룹니다.


### TL;DR {: .hide-from-toc }
- 단축키를 직접 설정할 수 있고 플러그인이 많은 editor를 선택하는 것도 좋은 코드를 작성하는 방법 중에 하나다.
- Package manager를 사용하면 이러한 플러그인을 쉽게 찾고 설치하고 업데이트 할 수 있다.
- 플러그인을 설치하는 것은 당신의 개발 생산성을 높이면 높였지 낮아지도록 만들지는 않을겁니다. 그러니 이 가이드의 추천에 따라 해보시는 걸 권장합니다.


## Install Sublime text editor
[Sublime](http://www.sublimetext.com/){: .external } 은 코드 작성 자체를 즐겁게 느끼게 해줄 정도로 탄탄한 기본 기능을 가진 좋은 editor입니다.
package manager를 통해서 플러그인 설치와 새로운 기능(functionality)의 추가를 손 쉽게 할 수 있는 것이 장점이죠.

sublime의 다운로드 가능한 버전은 2가지([version 2](http://www.sublimetext.com/2), [version 3](http://www.sublimetext.com/3))가 있습니다.
Version 2가 Version 3 보다는 stable합니다. 하지만 그렇다고해서 Version 3가 stable하지 않은 것은 아닙니다. 또한 Version 3는 Version2에서 제공되지 않는 패키지에 대한 접근 권한을 제공하는 이점이 있습니다.

Note: Rob Dodson의 <a href='http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/'>blog post</a> 를 보면 sublime이 **왜, 어떻게** 수많은 editor중에서 가장 매력적인 editor로 꼽혔는지를 알 수 있습니다.
이는 단순히 sublime 뿐만 아니라 다른 text editor와도 관련된 컨셉입니다.

## Why use a package manager?

Package manager는 패키지와 플러그인을 찾거나 설치, 업데이트할 때에 도움을 줍니다.

<img src="imgs/package_control.png" class="center" alt="Screenshot of Sublime Text Editors Package Control"/>

아래 링크의 설명을 따라하면 sublime을 위한 Package manager를 설치할 수 있습니다.
[https://packagecontrol.io/installation](https://packagecontrol.io/installation).

위 링크를 따라 한 번만 따라하면 Package manager 설치는 완료됩니다.</br>
추가적으로 추천하는 플러그인 리스트를 아래 항목에서 확인하실 수 있습니다.

## Install plugins

적절하고 좋은 플러그인은 당신의 생산성을 끌어올려 줍니다. </br>플러그인들이 어떤 일을 하는지 궁금한가요?

예를 들자면, Linting 관련 플러그인은 commit한 과거이력들의 변경사항을 보여줍니다.
또한 여타 다른 플러그인들을 통해서 다른 툴, Github와 연계해서 쓰는 것도 가능합니다.

그래서 Package manager는 적절한 플러그인을 찾아서 설치하고, 업데이트 하는 작업이 좀 더 쉽게 이루어질 수 있도록 당신을 도와주는 역할을 합니다. 아래 순서를 따라서 플러그인을 한 번 설치해보세요.

1. Sublime을 열고 package manager 메뉴을 선택합니다.(혹은 단축키 ctrl+shift+p).
2. 'Install Package' 항목을 선택합니다.
3. 당신이 찾고자 하는 플러그인의 이름을 입력하여 찾습니다.(혹은 설치가능한 모든 플러그인을 볼 수도 있습니다)

이런 플러그인들을 처음 접한다면 어떤 플러그인이 당신에게 적절할 지 모를 수도 있습니다. 그럴 땐 Sublime Text Plugin 의 [Trend List](https://packagecontrol.io/browse)를 한 번 보시는 건 어떨까요? 이 리스트에 있는 플러그인들은 우리가 즐겨쓰고 추천하는 것으로 당신의 개발 생산성을 향상시킬 수 있을 것입니다.


### Autoprefixer

CSS를 작성할 때 일일이 vendor prefixes를 설정하는 게 귀찮다면 이 플러그인을 추천합니다.
이 플러그인을 설치하고 CSS를 작성할 때 `ctrl+shift+p`를 누르면 나오는 항목 중 Autoprefix CSS를 선택하면 vendor prefixes가 추가 되게 됩니다.

이것 마저 불편하다면 `ctrl+shift+p`를 입력하지 않고도 자동화하는 방법을 [빌드과정에서 설정](/web/tools/setup/setup-buildtools) 하실 수 있습니다


<img src="imgs/sublime-autoprefixer.gif" alt="Sublime Autoprefixer Plugin Example" />

### ColorPicker

`ctrl+shift+c` 단축키를 통해서 아래 그림과 같은 palette를 띄우고 원하는 색을 Pick 할 수 있다.

<img src="imgs/sublime-color-picker.png" alt="Sublime Color Picker Plugin" />

### Emmet

유용한 키보드 단축키와 스니펫을 text editor에 추가할 수 있는 플러그인입니다. [Emmet.io](http://emmet.io/){: .external }의 인트로 영상을 확인해보면 어떤 플러그인인지 감을 잡으실 수 있을 겁니다('Toggle Comment' 기능을 사용하는 사람을 보실 수 있습니다)

<img src="imgs/emmet-io-example.gif" alt="Demo of the Emmet.io Plugin" />

### HTML-CSS-JS prettify

이 기능은 HTML, CSS 그리고 JS 코드의 보여지는 형태를 좀 더 이쁘게 만들어준다.
</br>(아래 그림을 보면 라인이 들쑥날쑥하고 엉망진창이던 줄바꿈이 간결하게 정리되는 것을 확인할 수 있다.)

<img src="imgs/sublime-prettify.gif" alt="Gif of the Sublime Prettify Plugin" />

### Git Gutter

gutter를 추가하면 코드의 수정사항들에 대해서 marker가 추가된다.

<img src="imgs/sublime-git-gutter.png" alt="Screenshot of the Sublime Git Gutter Plugin" />

### Gutter Color

Note: Gutter Color는 Sublime Text 3 에만 있습니다.

Gutter Color는 CSS에 정의한 색깔에 대해서 작은 샘플의 형태로 표시해준다.

<img src="imgs/sublime-gutter-color.png" alt="Sublime Gutter Color Screenshot" />

이 플러그인은 [ImageMagick](https://en.wikipedia.org/wiki/ImageMagick)을 필요로 합니다. <br/>만약 당신의 OS가 Mac OS X라면 [CactusLabs](http://cactuslab.com/imagemagick/){: .external } 를 설치하기를 권장합니다(설치후엔 재시작해주세요).
