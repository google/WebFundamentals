project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 스니펫은 Chrome DevTools의 Sources 패널 내에서 작성하고 실행할 수 있는 소형 스크립트입니다. 이들은 어느 페이지에서나 액세스하고 실행할 수 있습니다. 스니펫을 실행하면 현재 열려 있는 페이지의 맥락에 따라 실행됩니다.

{# wf_updated_on: 2016-06-26 #}
{# wf_published_on: 2015-10-12 #}

# 모든 페이지에서 코드 스니펫 실행 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

스니펫은 Chrome DevTools의 Sources 패널 내에서 작성하고 실행할 
수 있는 소형 스크립트입니다. 이들은 어느 페이지에서나 
액세스하고 실행할 수 있습니다. 스니펫을 실행하면 현재 열려 있는 페이지의 맥락에 
따라 실행됩니다.

여러 페이지에서 반복적으로 사용하는 소형 유틸리티 또는 디버깅 스크립트가 있는 경우, 
그러한 스크립트를 스니펫으로 저장해두는 방안을 고려해보세요.
또한 스니펫을 
[북마크릿](https://en.wikipedia.org/wiki/Bookmarklet)의 대안으로 사용할 수도 있습니다.


### TL;DR {: .hide-from-toc }
- 스니펫은 어느 페이지에서나 실행할 수 있는 소형 스크립트입니다(북마크릿과 유사함).
- 콘솔에서 스니펫 부분을 실행하려면 'Evaluate in Console' 기능을 사용합니다.
- 중단점과 같은 Sources 패널에서 제공하는 인기 기능에서도 스니펫을 사용할 수 있습니다.


## 스니펫 만들기

스니펫을 만들려면 **Sources** 패널을 열고 **Snippets** 탭을 클릭하고
탐색기 내에서 마우스 오른쪽 버튼을 클릭한 다음 **New**를 선택합니다.

![스니펫 만들기](images/create-snippet.png)

편집기에 코드를 입력합니다. 저장되지 않은 변경 내용이 있을 경우
아래의 스크린샷과 같이 스크립트 이름 옆에 별표가 표시됩니다.
변경 내용을 저장하려면 <kbd>Command</kbd>+<kbd>S</kbd> (Mac) 또는 <kbd>Ctrl</kbd>+<kbd>S</kbd>
(Windows, Linux)를 누릅니다. 

![저장하지 않은 스니펫](images/unsaved-snippet.png)

## 스니펫 실행

다음 세 가지 방식으로 스니펫을 실행할 수 있습니다. 

* (모든 스니펫이 나열된 왼쪽 창에서) 스니펫 파일 이름을
 마우스 오른쪽 버튼으로 클릭한 다음 **Run**을 선택합니다.
* **Run** 버튼(![스니펫 실행 
  버튼](images/run.png){:.inline})을 클릭합니다.
* <kbd>Command</kbd>+<kbd>Enter</kbd>(Mac) 또는 
  <kbd>Ctrl</kbd>+<kbd>Enter</kbd>(Windows, Linux)를 누릅니다.

콘솔에서 스니펫의 일부분을 평가하려면, 해당 부분을 
강조표시하고 편집기에서 아무 곳이나 마우스 오른쪽 버튼으로 클릭한 다음 
**Evaluate in Console**을 선택하거나 단축키 
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>(Mac) 또는
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>(Windows, Linux)를 사용합니다.

![콘솔에서 평가](images/evaluate-in-console.png)

## 로컬 수정 보기

<!-- TODO apply revision content doesn't really work... -->

스니펫 수정 사항 차이점을 보려면 (스니펫이 표시된 상태에서) 
편집기에서 마우스 오른쪽 버튼을 클릭하고 **Local Modifications**를 선택합니다.

![로컬 수정](images/local-modifications.png)

**History**라는 새 탭이 콘솔 창에 팝업됩니다.

![스니펫 기록](images/snippet-history.png)

각 타임 스탬프는 수정을 나타냅니다. 타임스탬프 옆에 있는 캐럿을 펼치면
 해당 시점의 수정 사항 차이점을 볼 수 있습니다. 
**revert** 링크는 수정 기록을 제거합니다. 2016년 6월 27일 현재
**apply revision content**와 **apply original content** 링크가
원래 의도한 대로 작동하지 않는 것 같습니다.

## 중단점 설정

다른 스크립트와 마찬가지로 스니펫에도 중단점을 설정할 수 있습니다. **Sources**
패널 내에서 중단점을 추가하는 방법은
[중단점 추가](/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints)를 참조하세요.


{# wf_devsite_translation #}
