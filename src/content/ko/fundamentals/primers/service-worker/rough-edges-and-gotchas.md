project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 아래에 나와 있는 몇가지 이슈들은 최신 정보들입니다.

{# wf_review_required #}
{# wf_updated_on: 2016-01-18 #}
{# wf_published_on: 2000-01-01 #}

# 다듬어지지 않은 부분들과 배울점 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/captainpangyo.html" %}



아래에 나와 있는 몇가지 이슈들은 최신 정보들입니다. 아래 내용이 빨리 없어졌으면 좋겠지만 일단 지금으로선 알아놓으면 도움이 될 것입니다.


## 설치가 실패해도 알기가 힘듭니다

서비스워커가 등록되더라도 `chrome://inspect/#service-workers` 또는 `chrome://serviceworker-internals` 에 표시되지 않습니다.
주로 던져진 에러나 `event.waitUntil()`에 rejected promise 가 들어오는 경우 설치에 실패합니다.

이 문제를 해결하기 위해서는 `chrome://serviceworker-internals` 로 가서 "Open
DevTools window and pause JavaScript execution on service worker startup for
debugging." 를 체크합니다. 그리고 설치 이벤트의 시작 부분에 디버깅 로그를 추가합니다. (이 옵션은 크롬 47 이하 버전에서는 다른 이름을 가지고 있습니다.)

## fetch() 디폴트 옵션

### 자격증명 미 포함

`fetch`를 사용할 때 디폴트 요청은 쿠키와 같은 자격증명을 포함하지 않습니다. 그러나 만약 자격증명을 포함하고 싶다면 아래와 같이 구현합니다:


    fetch(url, {
      credentials: 'include'
    })
    

이 구현방식은 의도적이고 URL이 같은 오리진일 경우에, 확실히 XHR의 더 복잡한 자격증명 송신 방식보다 낫습니다.
Fetch 동작은 `<img crossorigin="use-credentials">`을 추가하지 않는 이상 절대 쿠키를 보내지 않는 `<img crossorigin>` 종류의 CORS 요청과 흡사합니다.

### Non-CORS 미 허용

기본적으로 CORS를 지원하지 않는 3rd 파티 URL 에서 리소스를 페치하면 실패합니다.
이 문제를 해결하려면 요청에 `no-CORS` 옵션을 추가하는 방법이 있지만 이는 'opaque' 응답을 야기합니다.
'opaque'는 응답이 성공인지 실패인지 식별이 불가능합니다.


    cache.addAll(urlsToPrefetch.map(function(urlToPrefetch) {
      return new Request(urlToPrefetch, { mode: 'no-cors' });
    })).then(function() {
      console.log('All resources have been fetched and cached.');
    });
    

### 반응형 이미지 다루기

`srcset` 속성과 `<picture>` 요소는 런타임시에 가장 적절한 이미지를 선택하고 네트워크 요청을 보냅니다.

서비스워커 사용시 설치 과정에서 이미지를 캐쉬하려면 아래의 옵션을 사용합니다:

1. `<picture>` 요소와 `srcset` 속성이 요청할 모든 이미지를 설치
2. 낮은 해상도 이미지 이용
3. 높은 해상도 이미지 이용

모든 이미지를 다운로드 하면 저장공간이 낭비되므로 현실적인 옵션 2 나 3을 골라야 합니다.

설치 시에 낮은 해상도 이미지 를 사용한다고 하면 페이지가 로딩될 때 높은 해상도 이미지들을 받아와야 합니다. 하지만 만약 높은 해상도 이미지가 실패할 경우 낮은 해상도로 시도하게 됩니다.
이 방법이 괜찮아 보이지만 한가지 문제점이 있습니다.

아래와 같이 2개의 이미지가 있다고 합시다:

| Screen Density | Width | Height |
| -------------- | ----- | ------ |
| 1x             | 400   | 400    |
| 2x             | 800   | 800    |

이미지에 `srcset` 에 다음과 같은 마크업을 갖게 될 것입니다:


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x" />
    

만약 2x display 를 이용하면 브라우저가 `image-2x.png` 를 다운로드할 것이고,
오프라인이라면 `.catch()` 를 이용하여 이 요청을 처리할 수 있게 됩니다.
이 때 `image-2x.png` 대신에 캐쉬가 되어 있다면 `image-src.png` 를 반환해줍니다.
여기서 브라우저는 2x 화면에 맞는 이미지를 예상할 것이고, 결국 이미지는 400x400 CSS 픽셀 대신에 200x200 CSS 픽셀로 표현됩니다. 이를 해결하는 방법은 이미지의 높이와 너비를 고정하는 것입니다.


    <img src="image-src.png" srcset="image-src.png 1x, image-2x.png 2x"
    style="width:400px; height: 400px;" />
    

`<picture>` 요소의 경우에 너비와 폭 고정이 이미지를 어떻게 생성하고 사용하는 것에 달려 있기 때문에 상당히 어렵습니다.
하지만 srcset 의 경우에는 위와 비슷한 방법으로 접근하면 될 것입니다.
