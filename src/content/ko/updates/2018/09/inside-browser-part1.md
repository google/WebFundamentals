project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: 브라우저에서 사용자 코드를 하이레벨 아키텍처부터 렌더링 파이프라인 세부 기능에 이르는 기능성 웹사이트로 전환하는 방법

{# wf_published_on: 2018-09-05 #} {# wf_updated_on: 2018-09-21 #} {# wf_featured_image: /web/updates/images/inside-browser/cover.png #} {# wf_featured_snippet: Learn how browser turn your code into functional website from high-level architecture to the specifics of the rendering pipeline. In part 1, we’ll take a look at core computing terminology and Chrome’s multi-process architecture. #} {# wf_blink_components: N/A #}

<style>
  figcaption {
    font-size:0.9em;
  }
</style>

# 모던 웹 브라우저 들여다보기 (파트 1) {: .page-title }

{% include "web/_shared/contributors/kosamari.html" %}

## CPU, GPU, Memory 그리고 멀티 프로세스 아키텍쳐

앞으로 4개의 글에서 우리는 상위 레벨의 아키텍쳐부터 렌더링 파이프라인의 세부적인 부분까지 크롬 브라우저의 내부를 조명할 예정입니다.  브라우저가 어떻게 여러분의 코드를 잘 돌아가는 웹사이트로 변환하는지 궁금해 본적이 있거나 퍼포먼스를 향상시키기 위해 특정한 테크닉들이 왜 필요한지 잘 모르겠다면, 이어질 글들을 꼭 읽어 보세요.

첫 번째 글에서는 주요한 컴퓨팅 용어들과 크롬의 멀티 프로세스 아키텍쳐에 대해 알아보겠습니다.

Note: CPU/GPU의 구조나 프로세스/스레드에 박식하다면  [브라우저 아키텍쳐](#browser-architecture)로 넘어가셔도 됩니다.

## 컴퓨터의 중심에서 CPU와 GPU를 외치다.

브라우저가 동작하는 환경을 이해하기 위해서 먼저 컴퓨터의 일부분이 어떻게 동작하는지 알 필요가 있습니다.

### CPU

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part1/CPU.png" alt="CPU">
  
  <figcaption>     Figure 1: 업무를 수행하는 사무 기기의 핵심인 4개의 CPU 코어</figcaption>
</figure>

첫번째는 **C**entral **P**rocessing **U**nit - **CPU**입니다. CPU는 컴퓨터의 뇌라고 볼 수 있죠. 이 그림에서 한 명의 회사원으로 그려진 CPU 코어는 매우 다양한 작업들을 들어올 때마다 하나씩 처리할 수 있습니다. 고객이 요청하기만 한다면 수학부터 그림까지 못하는게 없죠. 과거에는 대부분의 CPU가 하나의 칩이였습니다. 이 당시 코어란 같은 칩에 들어 있을 뿐 다른 CPU라 볼 수 있었습니다(역주:이 부분의 뉘앙스가 노스브릿지를 경유하던 시절의 멀티코어 CPU를 의미하는 것인지 모호합니다.). 최근에는 스마트폰이나 노트북에서도 높은 성능을 발휘하는 멀티코어를 흔히 볼 수 있게 되었죠.

<div class="clearfix"></div>

### GPU

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part1/GPU.png" alt="GPU">
  <figcaption>     Figure 2: 제한적인 작업을 처리하는 렌치를 갖춘 여러 대의 GPU 코어</figcaption>
</figure>

**G**raphics **P**rocessing **U**nit - **GPU** 는 또 하나의 중요한 부분입니다. CPU와는 달리 GPU는 간단한 작업을 수 많은 코어에서 동시에 처리하는데 특화되어 있습니다. 이름에서 알 수 있듯이 원래는 그래픽을 처리하기 위해 개발되었습니다. 컴퓨터 그래픽에서 "GPU 사용" 또는 "GPU 보조"라는 용어가 고속 렌더링과 자연스러운 처리를 의미하는 이유입니다. 최근에는 GPU 가속 연산 덕분에 GPU 혼자서 더 많은 종류의 연산을 처리 가능하도록 발전하고 있습니다.

<div class="clearfix"></div>

컴퓨터나 스마트폰에서 어플리케이션을 시작하면 CPU와 GPU가 앱을 실행합니다. 보통은 운영체제가 제시하는 메카니즘에 따라 CPU와 GPU가 동작하죠.

<figure>
  <img src="/web/updates/images/inside-browser/part1/hw-os-app.png" alt="Hardware, OS, Application">
  <figcaption>    Figure 3: 컴퓨터 아키텍처 3개 레이어. 하단부의 Machine Hardware, 중앙부의 운영 체제, 상단부의 어플리케이션.</figcaption>
</figure>

## 프로스세와 스레드에서 프로그램 실행

<figure class="attempt-right">
  <img src="/web/updates/images/inside-browser/part1/process-thread.png" alt="process and threads">
  <figcaption>    Figure 4: 프로세스 - 테두리 상자, 스레드 - 프로세스 내부의 추상적 물고기 수영 경로</figcaption>
</figure>

브라우저 아키텍처를 파악하기 전에 프로스세와 스레드 원리를 이해해야 합니다. 프로세스는 어플리케이션의 실행 프로그램이며, 스레드는 프로세스 내부에 있으며 프로세스의 프로그램을 실행하는 주체입니다.

어플리케이션을 시작하면 프로세스가 생성됩니다. 프로그램은 작업을 위해 스레드(들)을 생성할 수도 있습니다. OS는 프로세스에 메모리 한 "조각"을 줘서 어플리케이션의 모든 상태 정보를 고유 메모리 공간에 저장할 수 있게 합니다. 어플리케이션을 종료하면 프로세스도 사라지고 OS가 메모리를 해제합니다.

<div class="clearfix"></div>

<figure>
  <a href="/web/updates/images/inside-browser/part1/memory.svg">
    <img src="/web/updates/images/inside-browser/part1/memory.png" alt="process and memory">
  </a>
  <b><span class="material-icons">play_circle_outline</span> 애니메이션을 보려면 이미지를 클릭하십시오</b>
  <figcaption>     Figure 5: 메모리 공간을 사용하여 어플리케이션 데이터를 저장하는 프로세스 도식도</figcaption>
</figure>

프로세스는 다른 프로세스를 돌려서 별도의 작업을 수행하도록 OS에 요청할 수 있습니다. 이렇게 되면 OS는 별도의 메모리 공간을 새 프로세스에 할당하죠. 두 프로세스간 통신이 필요하다면 **I**nter **P**rocess **C**ommunication (**IPC**)을 이용합니다. 많은 어플리케이션들이 이 방식을 채택하고 있어 워커 프로세스가 무응답 상태에 빠지더라도 어플리케이션의 다른 부분을 수행하고 있는 프로세스들을 종료할 필요 없이 해당 프로세스만 재시작할 수 있습니다.

<figure>
  <a href="/web/updates/images/inside-browser/part1/workerprocess.svg">
    <img src="/web/updates/images/inside-browser/part1/workerprocess.png" alt="worker process and IPC">
  </a>
  <b><span class="material-icons">play_circle_outline</span> 애니메이션을 보려면 이미지를 클릭하십시오</b>
  <figcaption>     Figure 6: IPC 상에서 커뮤니케이션을 수행하는 분리된 프로세스 도식도</figcaption>
</figure>

## 브라우저 아키텍쳐 {: #browser-architecture }

그래서 웹 브라우저는 프로스세와 스레드를 이용해 어떻게 동작할까요? 뭐, 한 프로세스가 스레드를 왕창 들고 있거나 스레드 몇 개 가진 다수의 프로세스들이 IPC를 통해 통신하겠죠.

<figure>
  <img src="/web/updates/images/inside-browser/part1/browser-arch.png" alt="browser architecture">
  <figcaption>    Figure 7: 프로세스/스레드 도식도의 다른 브라우저 아키텍처</figcaption>
</figure>

여기서 언급할 중요한 점은 이 두가지 아키텍쳐가 세부 구현일 뿐이라는 것입니다. 웹 브라우저가 어떻게 작동해야 한다는 표준은 없습니다. 한 브라우저의 접근 방식이 다른 것들과 완전히 다를 수도 있습니다.

이 블로그 연작에서는 아래 도식도에서 묘사된 크롬의 최근 아키텍쳐를 기반으로 설명할 예정입니다.

최상위의 브라우저 프로세스는 어플리케이션의 다른 부분을 담당하는 프로세스들을 조율합니다. 렌더 프로세스는 다수의 프로세스가 생성되어 각 탭마다 할당됩니다. 극히 최근까지 크롬은 가능하면 각 탭마다 별도의 프로세스를 할당하였습니다. 이제는 iframe을 포함하여 각 사이트 별로 프로세스를 가지도록 변경되었습니다([사이트 격리](#site-isolation) 참조).

<figure>
  <img src="/web/updates/images/inside-browser/part1/browser-arch2.png" alt="browser architecture">
  <figcaption>    Figure 8: Chrome의 멀티프로세스 아키텍처 도식도. 복수의 계층은 렌더러 프로세스에 표시되며 각 탭의 여러 렌더러 프로세스를 구동하는 Chrome을 대표합니다.</figcaption>
</figure>

## 어떤 프로세스가 무엇을 하나요?

아래 표는 크롬의 각 프로세스들이 어떤 역할을 하는지 설명합니다:

<table class="responsive">
  <tr>
    <th colspan="2">프로세스 및 제어 방법</th>
  </tr>
  <tr>
    <td>브라우저</td>
    <td>주소 창, 뒤로 및 앞으로 이동 버튼을 포함한 어플리케이션의 "chrome" 부분을 제어합니다. <br>또한 네트워크 요청 및 파일 액세스와 같은 웹 브라우저의 권한이 부여된 보이지 않는 부분을 제어합니다.</td>
  </tr>
  <tr>
    <td>렌더러</td>
    <td>웹사이트가 디스플레이 될 때 탭 안의 모든 것 담당.</td>
  </tr>
  <tr>
    <td>플러그인</td>
    <td>플래시와 같은 웹사이트가 사용하는 모든 플러그인 담당.</td>
  </tr>
  <tr>
    <td>GPU</td>
    <td>다른 프로세스와 분리된 GPU 작업을 제어합니다. GPU는 여러 앱의 요청을 제어하고 동일한 표면에 표시하기 때문에 다른 프로세스로 분리됩니다.</td>
  </tr>
</table>

<figure>
  <img src="/web/updates/images/inside-browser/part1/browserui.png" alt="Chrome processes">
  <figcaption>    Figure 9: 브라우저 UI의 다른 부분을 포인트하는 다른 프로세스</figcaption>
</figure>

확장 프로세스나 유틸리티 프로세스등 몇몇 프로세스가 더 있습니다. 크롬에서 실행중인 프로세스를 보고 싶으시면 우측 상단의 옵션 메뉴 아이콘 <span class="material-icons">more_vert</span> 를 클릭하여 도구 더보기를 선택, 작업 관리자를 선택하세요. 실행 중인 프로세스 목록과 CPU/Memory를 얼마나 사용하고 있는지 보여줍니다.

## 크롬의 멀티 프로세스 아키텍쳐의 장점

앞서 크롬이 여러 개의 렌더러 프로세스를 사용한다고 언급했습니다. 대부분 간단한 경우 각 탭이 하나의 프로세스를 가진다고 볼 수 있죠. 탭 3개가 열려있고 각 탭이 별개의 렌더러 프로세스로 돌아간다고 가정해 봅시다. 한 탭이 무응답 상태가 되더라도 그냥 닫아버리고 살아있는 다른 탭으로 이동하면 됩니다. 만약 모든 탭이 하나의 프로세스에서 실행 된다면 탭 하나만 무응답 상태에 빠져도 모든 탭이 정지하겠죠. 비극이죠.

<figure>
  <a href="/web/updates/images/inside-browser/part1/tabs.svg">
    <img src="/web/updates/images/inside-browser/part1/tabs.png" alt="multiple renderer for tabs">
  </a>
  <b><span class="material-icons">play_circle_outline</span> 애니메이션을 보려면 이미지를 클릭하십시오</b>
  <figcaption>Figure 10: 개별 탭에서 실행되는 여러 프로세스 도식도</figcaption>
</figure>

브라우저 작업을 여러 프로세스로 분리하는 또 다른 이점은 보안 및 샌드 박싱입니다. 운영 체제는 프로세스의 권한을 제한하는 방법을 제공하므로 브라우저는 특정 기능에서 특정 프로세스를 샌드박스 할 수 있습니다. 예를 들어 Chrome 브라우저는 렌더러 프로세스와 같은 임의의 사용자 입력을 처리하는 프로세스에 대한 임의의 파일 액세스를 제한합니다.

프로세스들은 개별 메모리 공간을 소유하므로 공통 인프라스트럭쳐는 보통 복사본을 가지고 있습니다. 동일한 프로세스 내의 스레드처럼 메모리를 공유할 수 없기에 이 말은 즉 메모리 사용량이 더 많아지는 것을 의미하죠. 메모리를 절약하기 위해 크롬은 돌 수 있는 프로세스 개수에 제한을 두었습니다. 제한 개수는 여러분의 장치가 CPU와 메모리를 얼마만큼 지니고 있는지에 따라 변하지만 한계에 다다를 경우 크롬은 한 프로세스에서 동일한 사이트를 오픈하는 여러 탭들을 실행하기 시작합니다.

## 메모리 더 절약하기 - 크롬의 서비스화

The same approach is applied to the browser process브라우저 프로세스에도 동일한 방식을 적용할 수 있습니다. 크롬은 현재 브라우저 프로그램의 각 부분들을 서비스 형태로 여러 개로 분리하거나 하나로 합치기 쉽게 구조를 변경중에 있습니다.

기본 아이디어는 크롬이 고성능 장치에서 실행될 때에는 안정성을 위해 각 서비스를 별개의 프로세스로 분리하고, 자원이 부족한 장치에서는 서비스를 하나의 프로세스로 합쳐 메모리 점유를 낮추는 것입니다. 이렇게 변경하기 전부터 이미 안드로이드와 같은 플랫폼에서는 유사하게 프로세스를 합쳐 메모리 점유를 줄이는 방식을 사용하고 있었습니다.

<figure>
  <a href="/web/updates/images/inside-browser/part1/servicfication.svg">
    <img src="/web/updates/images/inside-browser/part1/servicfication.png" alt="Chrome servicfication">
  </a>
  <b><span class="material-icons">play_circle_outline</span> 애니메이션을 보려면 이미지를 클릭하십시오</b>
  <figcaption>    Figure 11: 크롬이 여러 서비스를 개별 프로세스로 분리하거나 브라우저 프로세스로 통합하는 방식 도식도</figcaption>
</figure>

## 프레임별 렌더러 프로세스 - 사이트 격리 {: #site-isolation }

[사이트 격리](/web/updates/2018/07/site-isolation) 는 각 교차 사이트 iframe에 대해 별도의 렌더러 프로세스를 실행하는 Chrome에 최근 도입된 기능입니다. 우리는 다른 사이트 간에 메모리 공간을 공유하면서 크로스 사이트 iframe이 단일 렌더러 프로세스에서 실행될 수 있도록 탭 모델당 하나의 렌더러 프로세스에 대해 설명합니다. 동일한 렌더러 프로세스에서 a.com 및 b.com을 실행하면 문제가 없는 것으로 나타납니다. [동일한 출처 정책](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy)은 웹의 핵심 보안 모델입니다. 한 사이트가 동의 없이 다른 사이트의 데이터에 액세스 할 수 없습니다. 이 정책을 바이패스하는 것이 보안 공격의 주 목표입니다. 프로세스 격리는 사이트를 분리하는 가장 효과적인 방법입니다. [Meltdown과 Specter를](/web/updates/2018/02/meltdown-spectre) 사용하면 프로세스를 사용하여 사이트를 분리해야 한다는 것이 더욱 확실해집니다. Chrome 67부터 기본적으로 데스크톱에서 사이트 격리를 사용하도록 설정하면 탭의 각 사이트 간 iframe에 별도의 렌더러 프로세스가 적용됩니다.

<figure>
  <img src="/web/updates/images/inside-browser/part1/isolation.png" alt="site isolation">
  <figcaption> Figure 12: 사이트 격리 도식도. 한 사이트 내의 iframe을 여러 렌더러 프로세스가 가리키고 있는 모습</figcaption>
</figure>

사이트 격리를 적용하기 위해 수 년간의 공학적 노력이 필요했습니다. 사이트 격리는 단순히 별개의 렌더러 프로세스를 할당하는 게 아닙니다; 이는 iframe들이 통신하는 방식을 근본부터 변경합니다. 별개의 프로세스들이 iframe들을 실행하는 한 페이지에서 개발자 도구를 실행하는 것만 해도 기존과 차이를 전혀 느끼지 못하도록 개발자 도구가 백단에서 자연스럽게 구현해야 한다는 의미입니다. 그저 Ctrl+F로 페이지에서 단어 하나 찾는 것도 전혀 다른 렌더러 프로세스를 뛰어 넘어야 하는거죠. 브라우저 개발자들이 왜 사이트 격리를 메이저 마일스톤으로 릴리즈한 지 아시겠죠!

## 마무리

이 글에서 브라우저 아키텍쳐의 상위 구조를 설명하고 멀티 프로세스 아키텍쳐에 장점에 대해 알아 보았습니다. 또한 크롬의 멀티 프로세스 아키텍쳐와 밀접한 서비스화와 사이트 격리에 대해서도 살펴 보았죠. 다음 글에서는 웹사이트를 디스플레이하기 위해 프로세스와 스레드간에 어떤 일이 일어나는지 깊이 살펴 볼 예정입니다.

재밌으셨나요? 궁금한 점이나 이어질 글에 의견이 있으시다면, 아래 코멘트란이나 트위터 [@kosamari](https://twitter.com/kosamari)로 언제든지 연락 주세요.

<a class="button button-primary gc-analytics-event attempt-right" href="/web/updates/2018/09/inside-browser-part2" data-category="InsideBrowser" data-label="Part1 / Next">다음 : 탐색에서 발생하는 사항</a>

<div class="clearfix"></div>

## 피드백 {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

{% include "web/_shared/rss-widget-updates.html" %}
