project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools의 모든 단축키에 대한 참조입니다.

{# wf_updated_on: 2016-11-28 #}
{# wf_published_on: 2015-04-29 #}

# 단축키 참조 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

이 페이지는 Chrome DevTools의 단축키에 대한 참조입니다.
일부 단축키는 전역적으로 사용 가능하지만 일부 단축키는
단일 패널에서만 사용 가능합니다.

단축키는 도움말에서 찾을 수도 있습니다. DevTools의 UI 요소 위에
마우스를 가져가면 해당 도움말이 표시됩니다. UI 요소의 단축키는 도움말에 포함되어 있습니다.

## DevTools 액세스

<table>
  <thead>
      <th>DevTools 액세스</th>
      <th>Windows의 경우</th>
      <th>Mac의 경우</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Launch DevTools">Developer Tools 열기</td>
      <td data-th="Windows"><kbd class="kbd">F12</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">I</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">I</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">요소 검사 모드 및 브라우저 창에서 열기/전환</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Developer Tools를 열고 콘솔에 포커스 두기</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">J</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">J</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Inspector 검사(첫 번째 항목 도킹 해제 후 누름)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">I</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">I</kbd></td>
    </tr>
  </tbody>
</table>

## 전역 키보드 단축키

다음 단축키는 모든 DevTools 패널에서 사용할 수 있습니다.

<table>
  <thead>
      <th>전역 단축키</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Global Shortcuts">일반 설정 대화상자 표시</td>
      <td data-th="Windows"><kbd class="kbd">?</kbd>, <kbd class="kbd">F1</kbd></td>
      <td data-th="Mac"><kbd class="kbd">?</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">다음 패널</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">]</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">]</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">이전 패널</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">[</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">[</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">패널 기록 뒤로</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">[</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">[</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">패널 기록 앞으로</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">]</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">]</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">도킹 위치 변경</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Device Mode 열기</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">M</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">M</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">콘솔 전환 / 열 때 설정 대화상자 닫기</td>
      <td data-th="Windows"><kbd class="kbd">Esc</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Esc</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">페이지 새로고침</td>
      <td data-th="Windows"><kbd class="kbd">F5</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">R</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">R</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">캐시된 콘텐츠를 무시하고 페이지 새로고침</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F5</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">R</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">R</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">현재 파일 또는 패널 내에서 텍스트 검색</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">F</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">모든 소스에서 텍스트 검색</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">F</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">F</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">파일 이름으로 검색(타임라인 제외)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">확대(DevTools에 포커스를 둔 상태에서)</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">+</kbd></td>
      <td data-th="Mac"><kbd>Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">+</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">축소</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">-</kbd></td>
      <td data-th="Mac"><kbd>Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">-</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">기본 텍스트 크기 복원</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">0</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">0</kbd></td>
    </tr>
  </tbody>
</table>

## 패널별 단축키

### Elements

<table>
  <thead>
      <th>Elements 패널</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Elements Panel">변경 취소</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Z</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Z</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">변경 다시 실행</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Y</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Y</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Z</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">탐색</td>
      <td data-th="Windows"><kbd class="kbd">위쪽 화살표</kbd>, <kbd class="kbd">아래쪽 화살표</kbd></td>
      <td data-th="Mac"><kbd class="kbd">위쪽 화살표</kbd>, <kbd class="kbd">아래쪽 화살표</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">노드 확장/축소</td>
      <td data-th="Windows"><kbd class="kbd">오른쪽 화살표</kbd>, <kbd class="kbd">왼쪽 화살표</kbd></td>
      <td data-th="Mac"><kbd class="kbd">오른쪽 화살표</kbd>, <kbd class="kbd">왼쪽 화살표</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">노드 확장</td>
      <td data-th="Windows"><kbd class="kbd">화살표 한 번 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">화살표 한 번 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">노드 및 모든 자식 노드 확장/축소</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">화살표 아이콘 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">화살표 아이콘 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">속성 편집</td>
      <td data-th="Windows"><kbd class="kbd">Enter</kbd>, <kbd class="kbd">속성 두 번 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Enter</kbd>, <kbd class="kbd">속성 두 번 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">요소 숨기기</td>
      <td data-th="Windows"><kbd class="kbd">H</kbd></td>
      <td data-th="Mac"><kbd class="kbd">H</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">HTML로 편집 전환</td>
      <td data-th="Windows"><kbd class="kbd">F2</kbd></td>
      <td data-th="Mac"></td>
    </tr>
  </tbody>
</table>

#### Styles 사이드바

Styles 사이드바에서 사용할 수 있는 단축키:

<table>
  <thead>
      <th>Styles 사이드바</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Styles Sidebar">규칙 편집</td>
      <td data-th="Windows"><kbd class="kbd">한 번 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">한 번 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">새 속성 삽입</td>
      <td data-th="Windows"><kbd class="kbd">공백 한 번 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">공백 한 번 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">소스에서 스타일 규칙 속성 선언 줄로 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">속성 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">속성 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">소스에서 속성 값 선언 줄로 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">속성 값 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">속성 값 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">색 정의 값 순환</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">색 선택 상자 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">색 선택 상자 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">다음/이전 속성 편집</td>
      <td data-th="Windows"><kbd class="kbd">Tab</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Tab</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Tab</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">Tab</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">값 증가/감소</td>
      <td data-th="Windows"><kbd class="kbd">위쪽 화살표</kbd>, <kbd class="kbd">아래쪽 화살표</kbd></td>
      <td data-th="Mac"><kbd class="kbd">위쪽 화살표</kbd>, <kbd class="kbd">아래쪽 화살표</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">10씩 값 증가/감소</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">위쪽 화살표</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">아래쪽 화살표</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">위쪽 화살표</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">아래쪽 화살표</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">10씩 값 증가/감소</td>
      <td data-th="Windows"><kbd class="kbd">PgUp</kbd>, <kbd class="kbd">PgDown</kbd></td>
      <td data-th="Mac"><kbd class="kbd">PgUp</kbd>, <kbd class="kbd">PgDown</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">100씩 값 증가/감소</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgUp</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgDown</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgUp</kbd>, <kbd class="kbd">Shift</kbd> + <kbd class="kbd">PgDown</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">0.1씩 값 증가/감소</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">위쪽 화살표</kbd>, <kbd class="kbd">Alt</kbd> + <kbd class="kbd">아래쪽 화살표</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">위쪽 화살표</kbd>, <kbd class="kbd">Opt</kbd> + <kbd class="kbd">아래쪽 화살표</kbd></td>
    </tr>
  </tbody>
</table>

### Sources

<table>
  <thead>
      <th>Sources 패널</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Sources Panel">스크립트 실행 일시 중지/계속</td>
      <td data-th="Windows"><kbd class="kbd">F8</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">\</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F8</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">\</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">다음 함수 호출 Step Over</td>
      <td data-th="Windows"><kbd class="kbd">F10</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">'</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F10</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">'</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">다음 함수 호출 Step Into</td>
      <td data-th="Windows"><kbd class="kbd">F11</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">;</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F11</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">;</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">현재 함수에서 Step Out</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">F11</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">;</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">F11</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">;</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">다음 호출 프레임 선택</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">.</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">.</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">이전 호출 프레임 선택</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">,</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">,</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">중단점 조건 전환</td>
      <td data-th="Windows"><kbd class="kbd">줄 번호 클릭</kbd>, <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">B</kbd></td>
      <td data-th="Mac"><kbd class="kbd">줄 번호 클릭</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">B</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">중단점 조건 편집</td>
      <td data-th="Windows"><kbd class="kbd">마우스 오른쪽 버튼으로 줄 번호 클릭</kbd></td>
      <td data-th="Mac"><kbd class="kbd">마우스 오른쪽 버튼으로 줄 번호 클릭</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">개별 단어 삭제</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Delete</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">Delete</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">줄 또는 선택한 텍스트에 주석 달기</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">/</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">/</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">로컬 수정에 변경 내용 저장</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">변경 내용 모두 저장</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Alt</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">줄 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">G</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">G</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">파일 이름으로 검색</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">줄 번호로 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>번호</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>번호</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">열로 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>번호</i></span> + <span class="kbd">:<i>번호</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>번호</i></span> + <span class="kbd">:<i>번호</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">멤버로 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">활성 탭 닫기</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">W</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">W</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">스니펫 실행</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Enter</kbd></td>
    </tr>
  </tbody>
</table>

#### 코드 편집기 내부

<table>
  <thead>
      <th>코드 편집기</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Code Editor">짝을 이루는 대괄호로 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">M</kbd></td>
      <td data-th="Mac"><span class="kbd"></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">줄 번호로 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>번호</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">P</kbd> + <span class="kbd">:<i>번호</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">열로 이동</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>번호</i></span> + <span class="kbd">:<i>번호</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> + <span class="kbd">:<i>번호</i></span> + <span class="kbd">:<i>번호</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">주석 전환</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">/</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">/</kbd></td>
    </tr>
    <tr>
      <td data-th="Code Editor">다음 항목 선택</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="Code Editor">마지막 선택 실행 취소</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">U</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">U</kbd></td>
    </tr>
  </tbody>
</table>

### Timeline

<table>
  <thead>
      <th>Timeline 패널</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Timeline Panel">기록 시작/중지</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">타임라인 데이터 저장</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">타임라인 데이터 로드</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd></td>
    </tr>
  </tbody>
</table>

### Profiles

<table>
  <thead>
      <th>Profiles 패널</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Profiles Panel">기록 시작/중지</td>
	  <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">E</kbd></td>
	  <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">E</kbd></td>
    </tr>
  </tbody>
</table>

### 콘솔

<table>
  <thead>
      <th>콘솔 단축키</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Console Shortcuts">제안 수락</td>
      <td data-th="Windows"><kbd class="kbd">오른쪽 화살표</kbd></td>
      <td data-th="Mac"><kbd class="kbd">오른쪽 화살표</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">이전 명령/줄</td>
      <td data-th="Windows"><kbd class="kbd">위쪽 화살표</kbd></td>
      <td data-th="Mac"><kbd class="kbd">위쪽 화살표</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">다음 명령/줄</td>
      <td data-th="Windows"><kbd class="kbd">아래쪽 화살표</kbd></td>
      <td data-th="Mac"><kbd class="kbd">아래쪽 화살표</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">콘솔에 포커스 두기</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">`</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">`</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">콘솔 지우기</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">L</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">K</kbd>, <kbd class="kbd">Opt</kbd> + <kbd class="kbd">L</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">여러 줄 입력</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Return</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">실행</td>
      <td data-th="Windows"><kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Return</kbd></td>
    </tr>
  </tbody>
</table>

### Device Mode

<table>
  <thead>
      <th>Device Mode 단축키</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Emulation Shortcuts">손가락으로 확대/축소</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">스크롤</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd> + <kbd class="kbd">스크롤</kbd></td>
    </tr>
  </tbody>
</table>

#### 스크린캐스팅 시

<table>
  <thead>
      <th>스크린캐스팅 단축키</th>
      <th>Windows</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Screencasting Shortcuts">손가락으로 확대/축소</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd> + <kbd class="kbd">스크롤</kbd>,<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">두 손가락으로 클릭하여 드래그하기</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd> + <kbd class="kbd">스크롤</kbd>, <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">두 손가락으로 클릭하여 드래그하기</kbd></td>
    </tr>
    <tr>
      <td data-th="Screencasting Shortcuts">요소 검사 도구</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Shift</kbd> + <kbd class="kbd">C</kbd></td>
    </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
