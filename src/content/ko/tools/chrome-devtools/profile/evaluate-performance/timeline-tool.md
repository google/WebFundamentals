project_path: /web/_project.yaml
book_path: /web/tools/_book.yaml
description: 크롬 데브툴의 타임라인 패널로 어플리케이션의 모든 활동들을 레코딩하고 분석할 수 있습니다. 타임라인 패널은 어플리케이션에서 감지된 성능 이슈들을 조사하는데 가장 최적의 장소입니다.

{# wf_review_required #}
{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-06-08 #}

# 타임라인 툴 사용하기 {: .page-title }

{% include "_shared/contributors/kaycebasques.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



크롬 데브툴의 <em>타임라인 패널</em>로 어플리케이션의 모든 활동들을 레코딩하고 분석할 수 있습니다.
타임라인 패널은 어플리케이션에서 감지된 성능 이슈들을 조사하는데 가장 최적의 장소입니다.

![Timeline tool](imgs/timeline-panel.png)


## TL;DR {: .hide-from-toc }
- 페이지 로드나 유저 인터렉션 후 일어나는 모든 이벤트를 분석하기 위해 타임라인 레코딩을 사용할 수 있다.
- 'Overview 칸에서 FPS, CPU, 네트워크 요청을 볼 수 있다.'
- Flame Chart의 이벤트를 클릭하면 상세 정보를 확인할 수 있다.
- 빠른 분석을 위해 레코딩의 부분을 확대할 수 있다.


## 타임라인 패널 개요 {#timeline-overview}

타임라인 패널은 4개의 구역으로 구성되어 있습니다:

1. **Controls**. 레코딩을 시작하고 중단할 수 있으며 어떤 정보를 저장할지 세팅이 가능합니다.
2. **Overview**. 페이지 성능을 높은 레벨에서 요약이 가능합니다. 아래에서 자세히 다룹니다.
3. **Flame Chart**. CPU 스택 트레이스를 가시화합니다.

   아마 한개에서 세개의 점과 수직 선들을 볼 수 있을 것입니다.
   파란색은 `DOMContentLoaded` 이벤트를 나타냅니다.
   초록색은 처음 페인트 하는 시간을 나타냅니다.
   빨갠색은 `load` 이벤트를 의미합니다.

4. **Details**. 이벤트가 선택되면, 이 구역에서 이벤트 관련한 더 많은 정보를 보여줍니다.
   이벤트가 선택되지 않으면, 선택된 타임프레임에 대한 정보를 보여줍니다.

![annotated timeline panel](imgs/timeline-annotated.png)

### 칸(Pane) 개요

**Overview** 는 세개의 그래프로 구성됩니다:

1. **FPS**. 초당 프레임 (Frames Per Second).
   초록색 바가 높을수록 FPS가 높음을 의미합니다.
   FPS 그래프 위의 빨간색 블록은 긴 프레임을 나타내고 이 부분은 [jank][jank]가 될 확률이 높습니다. (jank : 프레임 제한시간을 충족하지 못하여 프)
2. **CPU**. CPU 리소스. 이 [area chart][ac]는 CPU 리소스가 어떤 이벤트를 사용했는지 나타냅니다.
3. **NET**. 각 색깔의 바는 리소스를 의미합니다.
   바가 길수록 리소스를 회수하는데 시간이 오래걸립니다. 각 바의 연한 부분은 대기 시간을 의미합니다 (리소스를 요청한 시간과 첫 바이트가 다운로드 된 시간 사이를 의미)
   어두운 부분은 전송 시간을 나타냅니다 (첫번째 바이트와 마지막 바이트의 시간 사이)

   바의 각 색깔은 다음 코드를 의미합니다:
   <!-- source: https://goo.gl/eANVFf -->
   * HTML files are **<span style="color:hsl(214, 67%, 66%)">blue</span>**.
   * Scripts are **<span style="color:hsl(43, 83%, 64%)">yellow</span>**.
   * Stylesheets are **<span style="color:hsl(256, 67%, 70%)">purple</span>**.
   * Media files are **<span style="color:hsl(109, 33%, 55%)">green</span>**.
   * Miscellaneous resources are
     **<span style="color:hsl(0, 0%, 70%)">grey</span>**.

![overview pane, annotated](imgs/overview-annotated.jpg)

[ac]: https://en.wikipedia.org/wiki/Area_chart
[jank]: /web/fundamentals/performance/rendering/

## 레코딩 하기

*page load*를 레코딩하려면 Timeline 패널을 열고나서 페이지를 엽니다. 그리고 페이지를 리로딩합니다.
페이지를 리로당하면 **Timeline** 패널에서 자동으로 레코딩 합니다.

*page interaction* 레코딩도 마찬가지로 Timeline 패널을 열고나서
**Record** 버튼을 누르거나 <kbd>Cmd</kbd>+<kbd>E</kbd> (Mac) 또는
<kbd>Ctrl</kbd>+<kbd>E</kbd> (Windows / Linux) 를 이용하여 레코딩을 시작합니다.
**Record** 버튼은 레코딩 중에 빨간색으로 변합니다. 페이지 인터렉션을 수행하고 **Record** 버튼이나
키보드 단축키를 이용하여 레코딩을 중단해보세요.

레코딩이 끝나면 DevTools이 레코딩의 어느부분이 가장 페이지에 영향도가 있는지 자동으로 줌해서 알려줍니다.

### 레코딩 팁

* **레코딩은 가능한한 짧게**. 짧은 레코딩은 일반적으로 분석을 더 쉽게합니다.
* **불필요한 동작 피하기**. 마우스 클릭, 네트워크 로드 같이 불필요한 동작들을 피합니다.
  예를 들어, 로그인 버튼을 누른후에 발생하는 이벤트를 레코딩 한다고 했을 때,
  이와 관계 없는 페이지 스크롤, 이미지 로드, 등등을 피합니다.
* **브라우저 캐쉬 기능 막기**. 네트워크 동작을 레코딩할 때, DevTools 세팅이나 [**Network conditions**][nc]을 이용하여
  브라우저 캐쉬 기능을 막는 것이 좋습니다.
* **크롬브라우저 확장 플러그인 막기**. 크롬 확장 플러그인은 앱 타임라인 레코딩에 불필요한 활동을 추가할 수 있습니다.
  크롬 윈도우를 [incognito mode][incognito]로 열고, [Chrome user profile][new chrome profile]을 새로 생성하여
  확장 플러그인이 돌아가지 않는 환경으로 세팅합니다.

[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions
[incognito]: https://support.google.com/chrome/answer/95464
[new chrome profile]: https://support.google.com/chrome/answer/142059

## 레코딩 정보 보기

**Flame Chart** 에서 이벤트를 선택하면 이벤트에 대한 추가정보를 보여줍니다.

![details pane](imgs/details-pane.png)

**Summary** 같은 탭들은 모든 이벤트 형태를 표시합니다.
다른 탭들은 특정 이벤트 형태만 보여줍니다. [Timeline event reference][event reference] 에서 자세한 정보를 확인하세요.

[event reference]: /web/tools/chrome-devtools/profile/evaluate-performance/performance-reference

## 레코딩 중 스크린샷 캡쳐하기 {#filmstrip}

**Timeline** 패널은 페이지 로딩중에 스크린샷을 캡쳐할 수 있습니다.
이 기능은 **Filmstrip** 라고 합니다.

레코딩 중 스크린샷 캡쳐를 하기 전에 **Controls** 영역에서 **Screenshots** 체크 박스를 활성화 하면,
스크린 샷이 **Overview** 영역에 표시됩니다.

![timeline recording with filmstrip](imgs/timeline-filmstrip.png)

레코딩에서 캡쳐한 스크린샷을 확대해서 보려면 **Screenshots** 또는 **Overview** 영역에 커서를 위치합니다.
마우스를 왼쪽 오른쪽으로 움직여 레코딩 애니메이션을 시뮬레이션 합니다.

{% animation animations/hover.mp4 %}

## Javascript 프로파일링 {#profile-js}

Javascript 스택 캡쳐를 위한 레코딩을 하기 전에 타임라인 레코딩에서 **JS Profile** 체크박스를 활성화합니다.
JS 프로파일러가 활성화 되면, 프레임 차트가 호출된 모든 Javascript 함수를 표시합니다.

![flame chart with JS profile enabled](imgs/js-profile.png)

## 프로파일 페인팅 {#profile-painting}

**Paint** 이벤트에 대해 더 많이 알고 싶으면 레코딩하기 전에 **Paint** 체크박스를 활성화합니다.
페인트 프로파일링이 활성화되고 **Paint** 이벤트를 클릭하면, **Paint Profiler** 탭이 **Details** 칸에 나타납니다.
여기서 이벤트에 대한 더 자세한 정보들을 확인할 수 있습니다.

![paint profiler](imgs/paint-profiler.png)

### 렌더링 설정 {#rendering-settings}

DevTool 메인 메뉴를 열고 **More tools** > **Rendering settings** 를 선택하여
페인팅 이슈를 디버깅 할 때 도움이 되는 렌더링 세팅에 접근합니다.
렌더링 세팅탭은 **Console** 창 옆에 위치합니다. (만약 안보이면 <kbd>esc</kbd> 를 눌러 엽니다)

![rendering settings](imgs/rendering-settings.png)

## 레코드 찾기

이벤트를 확인할 때 한가지 이벤트에 집중해야 하는 경우가 있습니다
예를 들어, `Parse HTML` 이벤트 세부정보를 확인해야 한다고 합시다.

**Timeline** 이 선택되었을 때 <kbd>Cmd</kbd>+<kbd>F</kbd> (Mac) 나 <kbd>Ctrl</kbd>+<kbd>F</kbd>
(Windows / Linux) 를 누릅니다. `Event`와 같은 이벤트 이름을 입력하여 검색합니다.

이 툴바는 현재 선택된 타임프레임에만 적용됩니다. 선택되지 않은 타임프레임의 이벤트는 결과에 나타나지 않습니다.

위 아래 화살표는 결과 값을 일어난 순서대로 접근하게 해줍니다. 그리고, 첫번째 결과는 선택된 타임프레임에서
가장 빠른 이벤트를, 마지막 결과는 가장 마지막 이벤트를 의미합니다.
위 아래 화살표를 누를 때 마다 새로운 이벤트가 선택되고 **Details** 칸에서 자세한 정보를 확인할 수 있습니다.
위 아래 화살표가 **Flame Chart** 에서 이벤트를 클릭하는 것과 동일합니다.

![find toolbar](imgs/find-toolbar.png)

## 타임 라인 영역에서 줌하기 {#zoom}

레코딩의 부분을 확대해서 분석을 더 쉽게 할 수 있습니다. **Overview** 영역을 사용하면 레코딩의 일부분을 확대할 수 있습니다.
확대 후에는 **Flame Chart** 가 자동으로 해당 부분을 맞춰서 보여줍니다.

![zoom in on a section of a timeline recording](imgs/zoom.png)

타임라인 부분 확대하려면:

* **Overview** 칸에서 타임라인의 보고 싶은 영역을 마우스 드래깅 합니다.
* 룰러 영역의 회색 슬라이더를 조절합니다.

일단 확대하고 싶은 영역을 선택하고나면 <kbd>W</kbd>,<kbd>A</kbd>,
<kbd>S</kbd>, <kbd>D</kbd> 키를 이용하여 선택을 조정할 수 있습니다.
<kbd>W</kbd> 와 <kbd>S</kbd> 는 각각 확대 축소를 의미합니다.
<kbd>A</kbd> 와 <kbd>D</kbd> 는 왼쪽 오른쪽 이동을 의미합니다.

## 레코딩 저장하고 로드하기

**Overview** 또는 **Flame Chart** 에서 오른쪽 클릭하면 레코딩을 저장하거나 열 수 있습니다.

![save and open recordings](imgs/save-open.png)
