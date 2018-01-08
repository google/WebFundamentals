project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools의 Device Mode를 사용하면 개발 사이트가 제작을 마친 뒤 다양한 기기에서 어떻게 보일지 흉내 낼 수 있습니다.

{# wf_updated_on: 2016-03-07 #}
{# wf_published_on: 2015-04-13 #}

# 응답형 및 기기별 뷰포트 테스트 {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

업데이트된 Device Mode(Chrome 49 이후)는 이제 모바일 중심 DevTools의 핵심 부분이며 기본 DevTools 도구 모음을 확장합니다. 이 모드의 컨트롤을 사용하여 광범위한 기기를 시뮬레이션하거나 완전한 응답형을 적용하는 방법을 배웁니다.


### TL;DR {: .hide-from-toc }
- Device Mode의 스크린 에뮬레이터를 사용하여 사이트의 응답성을 테스트해보세요.
- 사용자설정 기본 설정을 저장해두었다가 나중에 간편하게 액세스할 수 있습니다.
- Device Mode는 실제 기기 테스트를 대체할 수 있는 것은 아닙니다. 제한사항이 있다는 점에 유의하세요.


## 뷰포트 컨트롤 사용 {: #viewport-controls }

![Device Mode 활성화됨](imgs/device-mode.png)

뷰포트 컨트롤을 사용하면 다양한 기기에 대해 사이트를 테스트하고 응답성을 확인할 수 있습니다. 다음 두 가지 모드가 있습니다.

  1. **응답형**. 뷰포트 양쪽의 큰 핸들을 통해 뷰포트 크기를 자유자재로 조정할 수 있게 합니다.
  2. **특정 기기**. 뷰포트를 특정 기기의 정확한 뷰포트 크기로 잠그고 특정 기기 특성을 에뮬레이트합니다.

## 응답형 모드

기본 작업 모드로는 **응답형 모드**를 사용하는 것이 좋습니다. 대개 사이트와 앱을 적극적으로 개발하는 과정에서 이 모드를 사용하고 뷰포트 크기를 조정하여 알 수 없는 기기 유형이나 향후 출시될 기기 유형에도 적용되는 완벽한 응답형 디자인을 만들 수 있습니다.

응답형 모드의 장점을 최대한 활용하려면 [미디어 쿼리 모음](#media-queries)을 활성화합니다.

### 뷰포트 크기 사용자 설정

뷰포트에 있는 커다란 크기 조정 핸들을 드래그하거나 메뉴 모음의 값을 클릭하여 더욱 세밀하게 제어할 수 있습니다.

## 기기별 모드

적극적인 개발 단계가 거의 끝날 무렵 사이트가 특정 휴대기기(예: 특정 iPhone 또는 Nexus 모델)에서 나타나는 모습을 완벽하게 재현하고 싶은 경우 **기기별 모드**를 사용합니다.

### 기본 제공되는 기기 프리셋

<div class="wf-devtools-flex">
  <div>
  <p>기기 드롭다운 메뉴에 현재 가장 인기 있는 기기가 포함되어 있습니다. 기기를 선택하고 나면 각 프리셋이 특정 기기 특성의 에뮬레이션을 자동으로 구성합니다.</p>
  <ul>
    <li>정확한 'User Agent'(UA) 문자열을 설정합니다.</li>
    <li>기기 해상도와 DPI(기기 픽셀 비율)를 설정합니다.</li>
    <li>터치 이벤트를 에뮬레이트합니다(해당되는 경우).</li>
    <li>모바일 스크롤바 오버레이와 meta viewport를 에뮬레이트합니다.</li>
    <li>정의된 뷰포트 없이 페이지의 텍스트 크기를 자동으로 조정(확대)합니다.</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/select-device.png" alt="기기 선택">
  </div>
</div>

### 사용자설정 기기 프리셋 추가

Device Mode는 에뮬레이션을 위한 다양한 기기를 제공합니다. 여기에 포함되지 않은 특정 
사례나 기기를 발견하면 사용자설정 기기를 추가할 수 있습니다. 

<div class="wf-devtools-flex">
  <div>
  <p>사용자설정 기기를 추가하려면:</p>
  <ol>
    <li>DevTools Settings로 이동합니다.</li>
    <li><strong>Devices</strong> 탭을 클릭합니다.</li>
    <li><strong>Add custom device</strong>를 클릭합니다.</li>
    <li>기기 이름, 너비, 높이, 기기 픽셀 비율 및 
사용자 에이전트 문자열을 입력합니다.</li>
     <li><strong>Add</strong>를 클릭합니다.</li>
  </ol>
  <p>이제 이 사용자설정 기기를 <strong>Device</strong> 드롭다운 메뉴에서 이용할 수 있습니다.</p>
  </div>
  <div class="wf-devtools-flex-half">
    <img src="imgs/custom-device.png" alt="기기 선택">
  </div>
</div>

### 기기 상태 및 방향

![방향 전환](imgs/change-orientation.png)

특정 기기를 에뮬레이트할 때 Device Mode 툴바에 추가 컨트롤이 표시됩니다. 추가 컨트롤은 주로 가로 모드와 세로 모드 사이에서 기기 방향을 전환하는 역할을 합니다.

<div class="wf-devtools-flex">
  <div>
    <p>몇몇 기기에서 이 컨트롤은 단순한 방향 전환보다 더 많은 역할을 수행합니다. Nexus 5X와 같은 지원되는 기기의 경우, 다음과 같이 특정 기기 상태를 에뮬레이트할 수 있는 드롭다운 메뉴가 제공됩니다.</p>
    <ul>
      <li>기본 브라우저 UI</li>
      <li>Chrome 탐색 메뉴</li>
      <li>열린 키보드</li>
    </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/change-device-state.png" alt="기기 UI 변경">
  </div>
</div>

### 화면 크기에 맞춰 확대/축소  

<div class="wf-devtools-flex">
  <div>
  <p>때로는 브라우저 창에서 실제로 이용 가능한 공간보다 큰 해상도를 지닌 기기를 테스트하고 싶은 경우가 있습니다. 이런 경우 <strong>Zoom to Fit</strong> 옵션을 사용하면 편리합니다.</p>
  <ol>
    <li><strong>Fit to Window</strong>는 이용 가능한 최대 공간에 맞게 확대/축소 배율을 자동으로 설정합니다.</li>
    <li><strong>Explicit percentages</strong>는 예컨대 이미지에서 DPI를 테스트하고자 할 때 유용합니다.</li>
  </ol>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/zoom-to-fit.png" alt="화면 크기에 맞춰 확대/축소">
  </div>
</div>

## 옵션 컨트롤(터치, 미디어 쿼리, DPR 등)

<div class="wf-devtools-flex">
  <div>
  <p>기기 툴바의 오른쪽에 있는 세 개의 작은 점을 클릭하여 옵션 컨트롤을 변경하거나 활성화할 수 있습니다. 현재 제공되는 옵션에는 다음이 포함됩니다.</p>
  <ul>
    <li>사용자 에이전트 유형(UA 및 터치 이벤트 에뮬레이트)</li>
    <li>기기 픽셀 비율</li>
    <li>미디어 쿼리</li>
    <li>눈금자</li>
    <li>네트워크 구성(UA, 네트워크 제한)</li>
  </ul>
  </div>
  <div class="wf-devtools-flex-third">
    <img src="imgs/device-mode-dotmenu.png" alt="Device Mode 설정">
  </div>
</div>

본문을 계속 읽으면 특정 옵션에 대한 자세한 정보를 알 수 있습니다.

### 사용자 에이전트 유형

**User Agent Type** 또는 Device Type 설정을 이용하면 기기의 유형을
변경할 수 있습니다. 가능한 값은 다음과 같습니다.

  1. 모바일
  2. 데스크톱
  3. 터치스크린이 있는 데스크톱

이 설정을 변경하면 모바일 뷰포트와 터치 이벤트 에뮬레이션에 영향을 미치고 
UA 문자열이 변경됩니다. 따라서 데스크톱용 응답형 사이트를 만들고
마우스 오버 효과를 테스트하고자 하는 경우, 응답형 모드에서 '데스크톱'으로 전환하세요.

**팁**: [**Network conditions**][nc]
창에서 사용자 에이전트를 설정할 수도 있습니다.


### 기기 픽셀 비율(DPR)

Retina 디스플레이 기기를 Retina 디스플레이가 없는 장비에서 에뮬레이트하고자 하거나 그 반대의 경우,
**기기 픽셀 비율**을 조정하세요. **기기 픽셀 
비율**(DPR)은 논리적 픽셀과 물리적 픽셀 사이의 비율을 말합니다.
Nexus 6P와 같이 Retina 디스플레이가 탑재된 기기의 경우, 일반 기기보다 픽셀 밀도가
높습니다. 따라서 시각적인 콘텐츠의 선명도와 크기에 영향을 줄 수
있습니다.

다음은 웹에서 '기기 픽셀 비율'(DPI) 감도와 관련된 몇 가지 예입니다.

* CSS 미디어 쿼리의 예:

      @media (-webkit-min-device-pixel-ratio: 2), 
             (min-resolution: 192dpi) { ... }

* CSS [image-set](http://dev.w3.org/csswg/css-images/#image-set-notation) 
 규칙

* 이미지의 [srcset](/web/fundamentals/design-and-ux/media/images/images-in-markup)
 속성

* `window.devicePixelRatio` 속성

고유 Retina 디스플레이가 있는 경우, DPI가 높은 자산은 선명한 반면 '인치당 도트 수'(DPI)가
낮은 자산은 모자이크 형태로 나타나는 것을 확인할 수 있을 것입니다. 이 효과를 
일반 디스플레이에서 시뮬레이션하려면 DPR을 2로 설정하고 확대/축소 기능을 사용하여 뷰포트 배율을 
조정합니다. 2x 자산은 계속해서 선명하게 보이는 반면 1x 자산은 모자이크 처리될
것입니다.

### 미디어 쿼리 {: #media-queries }

[미디어 쿼리](/web/fundamentals/design-and-ux/responsive/fundamentals/use-media-queries)는
응답형 웹 디자인의 필수적인 부분입니다. 미디어 쿼리 검사기를 보려면
세 점 메뉴에서 **Show Media queries**를 클릭하세요. DevTools는 스타일시트의 미디어
쿼리를 감지하여 이를 상단의 눈금자에 컬러 막대로 표시합니다.

![미디어 쿼리 표시](imgs/show-media-queries.png)

![미디어 쿼리 검사기](imgs/media-query-inspector-ruler.png)

미디어 쿼리는 다음과 같이 색상 코드가 지정됩니다.

<style>#colortable { width: 60%; border: none; } #colortable td { border: none; } .max-width { background: #327ff2; width: 10%; } .max-and-min { background: #3b9903; width: 10%; } .min-width { background: #d4731f; width: 10%; }</style>

<table id="colortable">
  <tbody>
    <tr>
      <td class="max-width"></td>
      <td>최대 너비를 대상으로 하는 쿼리.</td>
    </tr>
    <tr>
      <td class="max-and-min"></td>
      <td>특정 범위 내의 너비를 대상으로 하는 쿼리.</td>
    </tr>
    <tr>
      <td class="min-width"></td>
      <td>최소 너비를 대상으로 하는 쿼리.</td>
    </tr>
  </tbody>
</table>

#### 빠르게 미디어 쿼리 미리보기

미디어 쿼리 막대를 클릭하여 뷰포트 크기를 조정하고 목표한 화면 크기에 맞춰
스타일을 미리 봅니다.

#### 연관된 CSS 보기

막대를 마우스 오른쪽 버튼으로 클릭하여 CSS에서 미디어 쿼리가 정의된 위치를 보고
소스 코드의 정의로 점프합니다.

![웹 기본 항목 미디어 쿼리 보기](imgs/reveal-source-code.png)

### 눈금자

이 옵션을 전환하여 픽셀 기반 눈금자를 뷰포트 옆에 표시합니다.

### 네트워크 구성(UA, 네트워크 제한)

이 옵션을 선택하면 Drawer에서 패널이 열리고 네트워크와 관련된 동작을
변경할 수 있습니다.

  1. **Disk Cache**: 디스크 캐시를 비활성화하면 DevTools가 열려 있는 동안 
페이지와 자산을 브라우저가 캐시하지 못하도록 차단합니다.
  2. **Network Throttling**: [네트워크 제한](/web/tools/chrome-devtools/network-performance/network-conditions)에 대해 자세히 알아봅니다.
  3. **User Agent**: 특정 UA(User Agent) 문자열
재정의를 설정할 수 있습니다.

**팁**: 또한 [기본 메뉴][nc]에서도 **Network conditions** 창을 
열 수 있습니다.

## 제한 사항

Device Mode에는 몇 가지 제한이 있습니다.

* **기기 하드웨어**
  * GPU 및 CPU 동작은 에뮬레이트되지 않습니다.
* **브라우저 UI**
  * 주소 표시줄과 같은 시스템 디스플레이 항목은 에뮬레이트되지 않습니다.
  * `<select>` 요소와 같은 네이티브 디스플레이는 모달 목록으로 에뮬레이트되지 않습니다.
  * 키패드를 여는 숫자 입력과 같은 일부 개선 기능의 경우 실제 기기의 동작과 다를 수 있습니다.
* **브라우저 기능**
  * WebGL은 에뮬레이터에서는 작동하지만 iOS 7 기기에서는 지원되지 않습니다.
  * MathML은 Chrome에서는 지원되지 않지만 iOS 7 기기에서는 지원됩니다.
  * [iOS 5 방향 지정 확대/축소 버그](https://github.com/scottjehl/device-bugs/issues/2)는 에뮬레이트되지 않습니다.
  * line-height CSS 속성은 에뮬레이터에서는 작동하지만 Opera Mini에서는 지원되지 않습니다.
  * [Internet Explorer](http://blogs.msdn.com/b/ieinternals/archive/2011/05/14/10164546.aspx)에서와 같은 CSS 규칙 제한은 에뮬레이트되지 않습니다.
* **AppCache**
  * 에뮬레이터는 AppCache [매니페스트 파일](https://code.google.com/p/chromium/issues/detail?id=334120) 또는 [소스 요청 보기](https://code.google.com/p/chromium/issues/detail?id=119767)에 대해 <abbr title="User Agent">UA</abbr>를 재정의하지 않습니다.

이러한 제한에도 불구하고, Device Mode는 대부분의 작업에서 강력한 기능을 발휘합니다.
실제 기기에서 테스트해야 하는 경우, 
[원격 디버깅](/web/tools/chrome-devtools/debug/remote-debugging)을 사용하여 
더욱 자세히 살펴볼 수 있습니다.


[nc]: /web/tools/chrome-devtools/profile/network-performance/network-conditions#network-conditions


{# wf_devsite_translation #}
