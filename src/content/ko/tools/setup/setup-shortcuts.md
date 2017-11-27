project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 자주 사용하는 명령줄 작업의 단축키를 설정하세요. 명령줄에 같은 내용을 입력하는 일을 되풀이하고 있다면, 이렇게 해서 부담을 덜 수 있습니다.

{# wf_updated_on: 2015-04-13 #}
{# wf_published_on: 2014-09-24 #}

# 명령줄 단축키 설정 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

자주 사용하는 명령줄 작업의 단축키를 설정하세요. 명령줄에 같은 내용을 입력하는 일을 되풀이하고 있다면, 이렇게 해서 부담을 덜 수 있습니다.


### TL;DR {: .hide-from-toc }
- 명령줄을 유용하게 사용할 수 있습니다. 기억하기 쉽고 빨리 입력할 수 있는 별칭을 만드세요.
- Github dotfile에서 명령줄 단축키를 저장, 공유 및 동기화할 수 있습니다.


## 설정 방법

명령줄 단축키를 만드는 가장 간편한 방법은 보편적인 
명령어에 대한 별칭을 bashrc 파일에 추가하는 것입니다. Mac 또는 Linux의 경우 다음과 같이 합니다.

1. 명령줄(위치 무관)에 다음을 입력합니다.

        open -a 'Sublime Text' ~/.bashrc

2. 새 별칭을 추가합니다. 예를 들어 다음과 같습니다.

        alias master='git checkout master'

3. git repo가 있는 디렉토리에 위치했을 때면 언제든 이 명령어 
`master`를 실행하여 이것이 마스터 분기를 확인해주도록 할 수 있습니다.

참고: [Windows 
별칭 설정 방법](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx) 안내를 참조하세요.

## 권장 단축키

다음은 유용하게 사용할 수 있는 몇 가지 명령어입니다.

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2" data-th="Command">명령어 및 별칭</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Command">편집기 열기</td>
      <td data-th="Alias"><code>alias st='open -a "Sublime Text"'</code></td>
    </tr>
    <tr>
      <td data-th="Command">서버 시작</td>
      <td data-th="Alias"><code>alias server="python -m SimpleHTTPServer"</code></td>
    </tr>
    <tr>
      <td data-th="Command">주로 작업하는 디렉토리로 이동</td>
      <td data-th="Alias"><code>alias p="cd ~/projects"</code></td>
    </tr>
  </tbody>
</table>


## 단축키 저장, 공유 및 동기화

단축키와 dot 파일을 Github에 저장하세요. 이렇게 하면 얻을 수 있는 주된 이점은 
단축키를 여러 기기에 걸쳐 공유할 수 있으며 항상 백업된다는 사실입니다.

Github은 [dotfile 전용 페이지](https://dotfiles.github.io/){: .external }도
 만들었고, 많은 Chrome 팀에서도
[Mathias Bynens의 dotfile](https://github.com/mathiasbynens/dotfiles)을 이용하고 있습니다.




{# wf_devsite_translation #}
