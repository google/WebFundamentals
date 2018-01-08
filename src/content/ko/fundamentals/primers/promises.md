project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: '프라미스(promise)는 지연된 비동기 계산을 단순화합니다. 프라미스는 아직 완료되지 않은 작업을 나타냅니다.'

{# wf_published_on: 2013-12-16 #}
{# wf_updated_on: 2014-01-29 #}

# 자바스크립트 프라미스: 소개 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

웹 개발 역사에서 매우 중요한 순간을
준비하세요.

<em>[드럼롤이 울리기 시작합니다.]</em>

프라미스가 자바스크립트에 기본적으로 도입되었습니다!

<em>[불꽃이 터지고 반짝이는 종이가 하늘에서 내리고 사람들이 흥분합니다.]</em>

이때 다음 범주 중 하나가 됩니다.

* 사람들이 당신 주변에서 환호하고 있지만 당신은 그 호들갑이 무엇을 의미하는지 모릅니다. 아마도 당신은 '프라미스'가 무엇인지도 모릅니다. 어깨를 으쓱하지만 반짝이는 종이가 어깨를 짓누릅니다. 그런 경우 걱정하지 마세요. 이런 것에 관심을 가져야 하는 이유를 이해하는 데 저도 오랜 시간이 걸렸습니다. 당신은 아마도 [처음](#whats-all-the-fuss-about)부터 시작하길 원할 것입니다.
* 당신은 기뻐하며 주먹을 들어올립니다! 적절한 시간일까요? 당신은 이러한 프라미스를 사용했지만 모든 구현 관련 API가 약간 달라 성가십니다. 정식 자바스크립트 버전에 대한 API는 무엇입니까? 당신은 아마도 [용어](#promise-terminology)부터 시작하길 원할 것입니다.
* 당신은 해당 정보에 대해 이미 알고 있고 새로운 것인 양 흥분한 사람들을 비웃습니다. 잠시 우쭐함을 느낀 후에 곧장 [API 참조](#promise-api-reference)를 보세요.

## 무슨 호들갑입니까? {: #whats-all-the-fuss-about }

자바스크립트는 단일 스레드이므로 두 스크립트를 동시에 실행할 수 없고 차례로 실행해야 합니다. 브라우저에서 자바스크립트는 스레드를 브라우저마다 차이가 있는 다른 항목 로드와 공유합니다. 하지만 일반적으로 자바스크립트는 그리기, 스타일 업데이트 및 사용자 작업 처리(예: 텍스트 강조표시, 양식 컨트롤 상호작용)와 동일한 큐에 있습니다. 이런 개별 작업은 다른 작업을 지연시킵니다.

인간은 다중 스레드입니다. 여러 손가락으로 입력할 수 있으며, 운전하면서 동시에 대화할 수 있습니다. 처리해야 할 유일한 차단 기능은 재채기이며, 재채기를 하는 동안 모든 현재 활동이 일시 중지됩니다. 이는 특히 운전하면서 대화할 때 매우 성가십니다. 재채기와 같은 코드를 작성하고 싶지 않습니다.

아마도 이벤트와 콜백을 사용하여 이를 피할 수 있습니다. 다음은 이벤트입니다.

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


이는 재채기와 전혀 다릅니다. 이미지를 가져오고 두 리스너를 추가하면 자바스크립트가 해당 리스너 중 하나를 호출할 때까지 실행을 중지할 수 있습니다.

불행히도 위의 예에서 이벤트 수신을 시작하기 전에 이벤트가 발생했을 가능성이 있으므로 이미지의 'complete' 속성을 사용하여 이를 해결해야 합니다.

    var img1 = document.querySelector('.img-1');

    function loaded() {
      // woo yey image loaded
    }

    if (img1.complete) {
      loaded();
    }
    else {
      img1.addEventListener('load', loaded);
    }

    img1.addEventListener('error', function() {
      // argh everything's broken
    });

이는 이벤트를 수신하기 전에 오류가 발생한 이미지를 포착하지 않으며, 불행히도 DOM은 그런 방법을 제공하지 않습니다. 또한 이는 단일 이미지를 로드하므로 이미지 집합이 로드된 시간을 알고자 하면 훨씬 복잡해집니다.


## 이벤트가 최선의 방법이 아님

이벤트는 동일한 객체에 여러 번 발생할 수 있는 작업(예: keyup, touchstart)을 수행할 때 좋습니다. 해당 이벤트를 사용하면 리스너를 추가하지 전에 발생한 것에 대해 걱정하지 않아도 됩니다. 그러나 비동기 성공/실패의 경우 이상적으로 다음과 같은 작업을 해야 합니다.

    img1.callThisIfLoadedOrWhenLoaded(function() {
      // loaded
    }).orIfFailedCallThis(function() {
      // failed
    });

    // and…
    whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
      // all loaded
    }).orIfSomeFailedCallThis(function() {
      // one or more failed
    });

이는 프라미스가 수행하는 작업이지만 더 나은 성과를 보입니다. HTML 이미지 요소에 프라미스를 반환하는 'ready' 메서드가 있는 경우 다음을 수행할 수 있습니다.

    img1.ready().then(function() {
      // loaded
    }, function() {
      // failed
    });

    // and…
    Promise.all([img1.ready(), img2.ready()]).then(function() {
      // all loaded
    }, function() {
      // one or more failed
    });


가장 기본적인 프라미스는 다음을 제외하면 이벤트 리스너와 약간 유사합니다.

* 프라미스는 한 번만 성공 또는 실패할 수 있습니다. 두 번 성공 또는 실패할 수 없으며, 성공을 실패로 전환하거나 실패를 성공으로 전환할 수도 없습니다.
* 프라미스가 성공 또는 실패한 후에 성공/실패 콜백을 추가하면 이벤트가 더 일찍 발생한 경우에도 올바른 콜백이 호출됩니다.

이는 비동기 성공/실패에 매우 유용합니다. 여러분은 무언가 사용 가능해진 정확한 시간에 관심이 적고 결과에 대한 응답에 관심이 많기 때문입니다.


## 프라미스 용어 {: #promise-terminology }

내가 작성한 이 글의 초안을 교정본 [Domenic Denicola](https://twitter.com/domenic)는 용어와 관련하여 'F'점을 매겼습니다. 그는 나를 붙잡아 [States and Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md)를 100번 베껴 쓰게 했으며 나의 부모에게 걱정 편지를 보냈습니다. 그럼에도 불구하고 나는 여전히 많은 용어가 혼동됩니다. 여하튼 기본적인 용어는 다음과 같습니다.

프라미스는 처리, 거부, 보류 또는 해결될 수 있습니다.

* **처리됨(fulfilled)** - 프라미스 관련 작업이 성공했습니다.
* **거부됨(rejected)** - 프라미스 관련 작업이 실패했습니다.
* **보류됨(pending)** - 처리되거나 거부되지 않았습니다.
* **해결됨(settled)** - 처리되거나 거부되었습니다.


[사양](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects)에서도 **thenable**라는 용어를 사용하여, `then` 메서드를 포함한다는 점에서 프라미스와 유사한 객체를 설명합니다. 이 용어를 보면 영국 축구 감독을 역임한 [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables)가 떠올라서 가급적 이 용어를 사용하지 않을 것입니다.


## 프라미스를 자바스크립트에 도입!

프라미스는 다음과 같이 한동안 라이브러리 형식으로 있었습니다.

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

상기 프라미스 및 자바스크립트 프라미스는 [Promises/A+](https://github.com/promises-aplus/promises-spec)라는 일반적인 표준화된 동작을 공유합니다. jQuery 사용자는 [Deferreds](https://api.jquery.com/category/deferred-object/)라는 유사한 것을 사용합니다. 그러나 Deferreds는 Promise/A+와 호환되지 않아 [미묘하게 다르고 덜 유용하므로](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/) 주의해야 합니다. jQuery에는 [프라미스 유형](https://api.jquery.com/Types/#Promise)이 있지만 이는 단지 Deferred의 하위 집합이며 동일한 문제가 있습니다.

프라미스 구현은 표준화된 동작을 따르지만 전체 API는 다릅니다. 자바스크립트 프라미스의 API는 RSVP.js와 유사합니다. 프라미스를 만드는 방법은 다음과 같습니다.

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


프라미스 생성자는 resolve 및 reject 등 두 매개변수를 가진 콜백인 단일 인수를 취합니다. 콜백 내에서 어떤 작업(예: 비동기 작업)을 수행하는 경우 모든 것이 순조롭게 작동하면 resolve가 호출되고 그렇지 않으면 reject가 호출됩니다.

오래된 일반 자바스크립트의 `throw`처럼 Error 객체를 사용하여 거부하는 것이 관례이지만 필수는 아닙니다. Error 객체는 스택 추적을 캡처하므로 디버깅 도구를 훨씬 유익하게 만든다는 장점이 있습니다.

다음은 해당 프라미스를 사용하는 방법입니다.

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()`은 성공 사례에 대한 콜백과 실패 사례에 대한 콜백 등 두 인수를 취합니다. 둘 다 선택 사항이므로 성공 사례에 대한 콜백과 실패 사례에 대한 콜백 중 하나만 추가할 수 있습니다.

자바스크립트 프라미스는 DOM에서 'Futures'로 시작하고 'Promises'로 이름을 바꾸고 마지막으로 자바스크립트로 이동합니다. DOM이 아닌 자바스크립트의 프라미스는 비 브라우저 JS 컨텍스트(예: Node.js)에서 사용 가능하므로 바람직합니다(핵심 API에서 프라미스 사용 여부는 별개의 문제).

프라미스는 자바스크립트 기능이지만 DOM은 프라미스를 사용하는 것을 두려워하지 않습니다. 실제로 비동기 성공/실패 메서드를 사용하는 모든 새 DOM API는 프라미스를 사용합니다. 이는 [Quota Management](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota), [Font Load Events](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready), [ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17), [Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options), [Streams](https://github.com/whatwg/streams#basereadablestream) 등에서 이미 발생하고 있습니다.


## 브라우저 지원 및 폴리필

현재 브라우저에서 프라미스가 이미 구현되고 있습니다.

Chrome 32, Opera 19, Firefox 29, Safari 8 및 Microsoft Edge에서 프라미스를 기본적으로 사용합니다.

완전한 프라미스 구현이 없는 브라우저를 사양을 준수하게 하거나 프라미스를 다른 브라우저 및 Node.js에 추가하려면 [폴리필](https://github.com/jakearchibald/ES6-Promises#readme)(2k gzip)을 확인하세요.


## 다른 라이브러리와의 호환성

자바스크립트 프라미스 API는 `then()` 메서드를 사용하는 모든 것을 프라미스와 유사한 것(또는 promise-speak _sigh_에서 `thenable`)으로 취급하므로 Q 프라미스를 반환하는 라이브러리를 사용하는 것은 바람직하며 새 자바스크립트 프라미스와 잘 작동합니다.

그러나 언급했듯이 jQuery의 Deferreds는 다소 유용하지 않습니다. 고맙게도 이를 표준 프라미스로 캐스팅할 수 있으며, 가급적 빨리 그렇게 하는 것이 좋습니다.


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


여기서 jQuery의 `$.ajax`가 Deferred를 반환합니다. `then()` 메서드를 포함하므로 `Promise.resolve()`가 그것을 자바스크립트 프라미스로 바꿀 수 있습니다. 그러나 다음과 같이 deferred가 복수의 인수를 콜백에 전달하는 경우도 있습니다.

    var jqDeferred = $.ajax('/whatever.json');

    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    })



반면에 JS 프라미스는 첫 번째를 제외한 모든 것을 무시합니다.


    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    })



고맙게도 이는 일반적으로 개발자가 원하는 것이거나, 적어도 원하는 것에 대한 액세스 권한을 개발자에게 제공합니다. 또한 jQuery는 Error 객체를 거부로 전달하는 규칙을 따르지 않습니다.


## 복잡한 비동기 코드를 쉽게 만들기

어떤 것을 코드로 만들어 봅시다. 다음을 수행하길 원한다고 가정합니다.

1. 회전자를 시작하여 로드를 나타냅니다.
1. 스토리에 대한 몇몇 JSON을 가져옵니다. 이는 제목과 각 장에 대한 URL을 제공합니다.
1. 페이지에 제목을 추가합니다.
1. 각 장을 가져옵니다.
1. 페이지에 스토리를 추가합니다.
1. 회전자를 중지합니다.

…또한 도중에 오류가 발생하면 사용자에게 알려줍니다. 그때 회전자를 중지하는 것이 좋습니다. 그렇지 않으면 회전자가 계속 회전하고 현기증이 나서 다른 UI에 충돌할 것입니다.

물론 스토리는 [HTML로 제공하는 것이 더 빠르므로](https://jakearchibald.com/2013/progressive-enhancement-is-faster/) 자바스크립트를 사용하여 전달하지 않겠지만 이 패턴은 API를 처리할 때 매우 일반적으로 사용됩니다. 즉, 다중 데이터 가져오기가 완료되면 무언가를 합니다.

시작하려면 네트워크에서 데이터 가져오기를 처리합시다.

## XMLHttpRequest 프라미스화

오래된 API는 이전 버전과 호환되는 방식으로 가능한 경우 프라미스를 사용하도록 업데이트됩니다. `XMLHttpRequest`가 주요 후보자이지만 그동안 GET 요청을 하는 간단한 함수를 작성합시다.



    function get(url) {
      // Return a new promise.
      return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.response);
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function() {
          reject(Error("Network Error"));
        };

        // Make the request
        req.send();
      });
    }


이제 이를 사용해 봅시다.

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    })


[작동하는 것을 보려면 여기를 클릭하고](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }, 결과를 보려면 DevTools 콘솔을 확인하세요. 이제 `XMLHttpRequest`를 수동으로 입력하지 않고 HTTP 요청을 수행할 수 있습니다. 이 방식은 `XMLHttpRequest`의 격앙된 듯한 카멜식 대소문자 표기를 봐야 하는 횟수가 적을수록 좋기 때문에 바람직합니다.


## 연결

`then()`은 스토리의 끝이 아닙니다. 여러 `then`을 함께 연결하여 값을 변환하거나 추가 비동기 작업을 차례로 실행할 수 있습니다.


### 값 변환
단순히 새 값을 반환하여 값을 변환할 수 있습니다.

    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });

    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    })


실례로 다음으로 돌아갑시다.

    get('story.json').then(function(response) {
      console.log("Success!", response);
    })



응답은 JSON이지만 현재 일반 텍스트로 응답을 수신하고 있습니다. Get 함수를 변경하여 JSON [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType)을 사용할 수 있지만 프라미스로 해결할 수도 있습니다.

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



`JSON.parse()`는 단일 인수를 취하고 변환된 값을 반환하므로 단축키를 만들 수 있습니다.

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


[여기서 작동하는 것을 볼 수 있고](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }, 결과를 보려면 DevTools 콘솔을 확인하세요. 실제로 `getJSON()` 함수를 쉽게 만들 수 있습니다.


    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()`은 url을 가져오면 응답을 JSON으로 파싱하는 프라미스를 여전히 반환합니다.


### 비동기 작업을 큐에 저장

또한 여러 `then`을 연결하여 비동기 작업을 순서대로 실행할 수 있습니다.

`then()` 콜백에서 어떤 것을 반환하는 것은 마술과 약간 비슷합니다. 값을 반환하면 해당 값을 사용하여 그 다음 `then()`이 호출됩니다. 그러나 프라미스와 유사한 것을 반환하는 경우에는 그 다음 `then()`은 계속 대기하고 프라미스가 해결(성공/실패)되는 경우에만 호출됩니다. 예를 들면 다음과 같습니다.

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



여기서 `story.json`에 비동기 요청을 하여 요청할 URL 집합이 제공되면 그 첫 번째 URL을 요청합니다. 이는 프라미스가 간단한 콜백 패턴에서 실제로 눈에 띄기 시작하는 때입니다.

심지어 단축키 메서드를 사용하여 장을 가져올 수도 있습니다.

    var storyPromise;

    function getChapter(i) {
      storyPromise = storyPromise || getJSON('story.json');

      return storyPromise.then(function(story) {
        return getJSON(story.chapterUrls[i]);
      })
    }

    // and using it is simple:
    getChapter(0).then(function(chapter) {
      console.log(chapter);
      return getChapter(1);
    }).then(function(chapter) {
      console.log(chapter);
    })


`getChapter`가 호출될 때까지 `story.json`을 다운로드하지 않지만 다음에 `getChapter`가 호출될 때 스토리 프라미스를 다시 사용하므로 `story.json`은 한 번만 가져옵니다. 약속합니다!


## 오류 처리

앞서 살펴 봤듯이 `then()`은 성공에 대한 인수와 실패에 대한 인수(또는 promise-speak에서 처리 및 거부) 등 두 인수를 취합니다.

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })


다음과 같이 `catch()`를 사용할 수도 있습니다.


    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })


`catch()`에 대한 특별한 것은 없습니다. `then(undefined, func)`의 보완에 불과하지만 가독성은 훨씬 높습니다. 상기 두 코드 예시는 동일하게 동작하지 않습니다. 후자는 다음과 같습니다.

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


차이는 미묘하지만 매우 유용합니다. 프라미스 거부는 거부 콜백(또는 동일하게 기능하는 `catch()`)을 사용하여 다음 `then()`으로 건너뜁니다. `then(func1, func2)`를 사용하는 경우 `func1`와 `func2` 중에 하나만 호출되며, 둘이 동시에 호출되지 않습니다. 그러나 `then(func1).catch(func2)`를 사용하는 경우 둘은 체인에서 개별적인 단계이므로 `func1`이 거부하면 둘 다 호출됩니다. 다음을 봅시다.


    asyncThing1().then(function() {
      return asyncThing2();
    }).then(function() {
      return asyncThing3();
    }).catch(function(err) {
      return asyncRecovery1();
    }).then(function() {
      return asyncThing4();
    }, function(err) {
      return asyncRecovery2();
    }).catch(function(err) {
      console.log("Don't worry about it");
    }).then(function() {
      console.log("All done!");
    })



위의 흐름은 일반 자바스크립트 try/catch와 매우 유사하며, 'try'를 사용하여 발생하는 오류는 즉시 `catch()` 블록으로 이동합니다. 다음은 이를 흐름도로 만든 것입니다.


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden" src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


프라미스 처리 시에는 청색선을 따르고 프라미스 거부 시에는 적색선을 따르면 됩니다.

### 자바스크립트 예외 및 프라미스
프라미스가 명시적으로 거부될 때 거부가 발생하며, 생성자 콜백에서 오류가 발생하는 경우 프라미스가 묵시적으로 거부되더라도 거부가 발생합니다.

    var jsonPromise = new Promise(function(resolve, reject) {
      // JSON.parse throws an error if you feed it some
      // invalid JSON, so this implicitly rejects:
      resolve(JSON.parse("This ain't JSON"));
    });

    jsonPromise.then(function(data) {
      // This never happens:
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })


즉, 프라미스 생성자 콜백 내에서 프라미스 관련 모든 작업을 수행하는 것이 유용하므로 오류는 자동으로 포착되고 거부가 됩니다.

`then()` 콜백에서 발생한 오류도 마찬가지입니다.

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



### 실제 오류 처리

스토리(story) 및 장(chapter)과 함께 catch를 사용하여 사용자에게 오류를 표시할 수 있습니다.



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



`story.chapterUrls[0]` 가져오기가 실패하면(예: http 500 또는 사용자가 오프라인임) 그 후의 모든 성공 콜백(응답을 JSON으로 파싱하려고 시도하는 `getJSON()`의 성공 콜백 포함)을 건너뛰며 페이지에 chapter1.html 을 추가하는 콜백도 건너뜁니다. 대신 catch 콜백으로 이동합니다. 그 결과, 이전 동작 중 어느 하나가 실패하는 경우 'Failed to show chapter'가 페이지에 추가됩니다.

자바스크립트 try/catch처럼 해당 오류는 포착되고 후속 코드는 계속 실행되므로 회전자는 바라던 대로 항상 숨겨집니다. 상기 버전이 다음의 비차단 비동기 버전이 됩니다.

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


오류 복구 없이 단순히 로깅 목적으로 `catch()`하길 원할 수 있습니다. 이를 위해서는 오류를 다시 발생시키면 됩니다. 다음과 같이 `getJSON()` 메서드에서 이를 수행할 수 있습니다.



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


이렇게 장 하나를 가져왔는데 모든 장을 가져오도록 시도해 봅시다.


## 병렬 처리 및 시퀀싱 - 둘을 최대한 이용하기


비동기는 쉽지 않다고 생각합니다. 착수하려고 노력하고 있다면 동기 코드인 듯한 코드를 작성해 보세요. 이 경우에는 다음과 같이 합니다.

    try {
      var story = getJSONSync('story.json');
      addHtmlToPage(story.heading);

      story.chapterUrls.forEach(function(chapterUrl) {
        var chapter = getJSONSync(chapterUrl);
        addHtmlToPage(chapter.html);
      });

      addTextToPage("All done");
    }
    catch (err) {
      addTextToPage("Argh, broken: " + err.message);
    }

    document.querySelector('.spinner').style.display = 'none'

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }


위 코드는 잘 작동합니다([코드](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external } 참조)!
그러나 이는 동기 코드이고 다운로드하는 동안 브라우저를 잠급니다. 이를 비동기로 작동하게
하려면 `then()`을 사용하여 순서대로 발생하게 합니다.

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // TODO: for each url in story.chapterUrls, fetch &amp; display
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })



그러나 어떻게 하면 장 url을 반복하고 순서대로 가져올 수 있을까요? 다음은 제대로 **작동하지 않습니다.**

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach`는 비동기를 인식하지 않으므로 장은 다운로드 순서대로 표시되며 이는 기본적으로 펄프 픽션이 작성된 방식입니다. 펄프 픽션이 아니므로 수정합시다.


### 시퀀스 만들기
`chapterUrls` 배열을 프라미스 시퀀스로 바꾸려고 합니다. `then()`을 사용하여 이를 수행할 수 있습니다.

    // Start off with a promise that always resolves
    var sequence = Promise.resolve();

    // Loop through our chapter urls
    story.chapterUrls.forEach(function(chapterUrl) {
      // Add these actions to the end of the sequence
      sequence = sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    })


여기서는 처음으로 소개한 `Promise.resolve()`는 주어진 값이 무엇이든지 상관없이 분석하는 프라미스를 만듭니다. `Promise` 인스턴스에 이를 전달하면 이를 반환합니다(**참고:** 이는 일부 구현이 아직 준수하지 않는 사양에 대한 변경임). 프라미스와 유사(`then()` 메서드가 있음)한 것을 전달하면 동일한 방식으로 처리/거부하는 진짜 `Promise`가 생성됩니다. `Promise.resolve('Hello')`와 같은 다른 값을 전달하면 해당 값을 사용하여 처리하는 프라미스가 생성됩니다. 위와 같이 어떤 값도 제공하지 않고 호출하면 'undefined'를 사용하여 처리합니다.


제공된 값(또는 undefined)을 사용하여 거부하는 프라미스를 만드는 `Promise.reject(val)`도 있습니다.

[`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)를 사용하여 위의 코드를 정리할 수 있습니다.



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



이 예시는 이전 예시와 동일한 작업을 하지만 개별 'sequence' 변수가 필요하지 않습니다. 배열의 각 항목에 대해 reduce 콜백을 호출합니다. 'sequence'는 처음에는 `Promise.resolve()`이지만 나머지 호출에서는 이전 호출에서 반환된 것입니다. `array.reduce`는 배열을 단일 값(이 예시에서는 프라미스)으로 축소하는 데 매우 유용합니다.

이를 모두 합쳐 봅시다.

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      return story.chapterUrls.reduce(function(sequence, chapterUrl) {
        // Once the last chapter's promise is done…
        return sequence.then(function() {
          // …fetch the next chapter
          return getJSON(chapterUrl);
        }).then(function(chapter) {
          // and add it to the page
          addHtmlToPage(chapter.html);
        });
      }, Promise.resolve());
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }

그리고 거기에 동기 버전의 완전 비동기 버전([코드](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external } 참조)이 있습니다. 그러나 더 나은 것을 만들 수 있습니다. 이때 페이지는 다음과 같이 다운로드 중입니다.


<figure>
  <img src="imgs/promise1.gif">
</figure>

브라우저는 복수의 항목을 한 번에 잘 다운로드하므로 장을 차례로 다운로드하게 하면 성능이 저하됩니다. 모든 장을 동시에 다운로드하려면 모든 장이 도착했을 때 처리합니다. 고맙게도 이를 위한 API가 있습니다.


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all`은 프라미스 배열을 취하고 모든 것이 성공적으로 완료되었을 때 처리하는 프라미스를 만듭니다. 전달된 프라미스와 동일한 순서대로 결과 배열(프라미스가 처리한 것)을 받게 됩니다.



    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Take an array of promises and wait on them all
      return Promise.all(
        // Map our array of chapter urls to
        // an array of chapter json promises
        story.chapterUrls.map(getJSON)
      );
    }).then(function(chapters) {
      // Now we have the chapters jsons in order! Loop through…
      chapters.forEach(function(chapter) {
        // …and add to the page
        addHtmlToPage(chapter.html);
      });
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened so far
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }

연결에 따라 이는 하나씩 로드하는 것보다 몇 초 빠를 수 있으며([코드](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external } 참조) 첫 번째 시도한 것보다 코드가 적습니다. 장은 어떤 순서로든 다운로드할 수 있지만 화면에는 올바른 순서로 표시됩니다.


<figure>
  <img src="imgs/promise2.gif">
</figure>

그러나 인식되는 성능을 여전히 개선할 수 있습니다. 1장이 도착하면 그것을 페이지에 추가해야 합니다. 그러면 사용자는 나머지 장이 도착하기 전에 읽기 시작할 수 있습니다. 3장이 도착하면 사용자가 2장이 누락되었음을 인식할 수 없기 때문에 페이지에 추가하지 않습니다. 2장이 도착하면 2장, 3장 등을 추가할 수 있습니다.

이를 위해 모든 장에 대한 JSON을 동시에 가져온 다음 그것을 문서에 추가할 시퀀스를 만듭니다.

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Map our array of chapter urls to
      // an array of chapter json promises.
      // This makes sure they all download parallel.
      return story.chapterUrls.map(getJSON)
        .reduce(function(sequence, chapterPromise) {
          // Use reduce to chain the promises together,
          // adding content to the page for each chapter
          return sequence.then(function() {
            // Wait for everything in the sequence so far,
            // then wait for this chapter to arrive.
            return chapterPromise;
          }).then(function(chapter) {
            addHtmlToPage(chapter.html);
          });
        }, Promise.resolve());
    }).then(function() {
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }

모두 최상입니다([코드](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external } 참조)! 모든 콘텐츠를 전달하는 데 동일한 시간이 소요되지만 사용자는 첫 번째 콘텐츠를 더 빨리 가져옵니다.


<figure>
  <img src="imgs/promise3.gif">
</figure>

이 예시에서 모든 장이 거의 동시에 도착하지만 한 번에 하나를 표시하는 것의 이점은 더 많고 더 큰 장에서 과장됩니다.


[Node.js-style 콜백 또는 이벤트](https://gist.github.com/jakearchibald/0e652d95c07442f205ce)를 사용하여 위의 코드를 수행하면 코드가 거의 두 배이지만 이해하는 것이 쉽지 않습니다. 그러나 이는 프라미스 스토리의 끝이 아닙니다. 다른 ES6 기능과 결합하면 훨씬 쉬워집니다.


## 보너스: 프라미스 및 생성기


여기서는 새로운 ES6 기능 전체에 대해 설명하지만 오늘 몰라도 코드에 프라미스를 사용할 수 있습니다. 곧 개봉할 블록버스터 영화의 예고편과 유사하다고 보면 됩니다.

ES6도 [생성기](http://wiki.ecmascript.org/doku.php?id=harmony:generators)를 제공하는데 이는 'return'처럼 특정 지점에서 끝내는 기능을 허용하지만 나중에 동일한 지점과 상태에서 재개(resume)할 수 있습니다. 예를 들면 다음과 같습니다.



    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


함수 이름 앞의 별표는 함수를 생성기로 만듭니다. yield 키워드는 return/resume 지점입니다. 이를 다음과 같이 사용할 수 있습니다.

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


그러나 이것이 프라미스와 무슨 상관이 있습니까? 이 return/resume 동작을 사용하여 동기 코드와 유사한(그리고 이해하기 쉬운) 비동기 코드를 작성할 수 있습니다. 그것을 처음부터 끝까지 모두 이해하려고 할 필요가 없습니다. `yield`를 사용하여 프라미스 해결을 기다리게 하는 도우미 함수가 있습니다.

    function spawn(generatorFunc) {
      function continuer(verb, arg) {
        var result;
        try {
          result = generator[verb](arg);
        } catch (err) {
          return Promise.reject(err);
        }
        if (result.done) {
          return result.value;
        } else {
          return Promise.resolve(result.value).then(onFulfilled, onRejected);
        }
      }
      var generator = generatorFunc();
      var onFulfilled = continuer.bind(continuer, "next");
      var onRejected = continuer.bind(continuer, "throw");
      return onFulfilled();
    }


…[Q에서 축어적으로 상당히 들어냈지만](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500), 자바스크립트 프라미스에 적용했습니다. 이를 사용하여 최적의 최종 장 예시를 취하고 새 ES6 기능의 로드와 혼합하고 다음과 같이 바꿀 수 있습니다.

    spawn(function *() {
      try {
        // 'yield' effectively does an async wait,
        // returning the result of the promise
        let story = yield getJSON('story.json');
        addHtmlToPage(story.heading);

        // Map our array of chapter urls to
        // an array of chapter json promises.
        // This makes sure they all download parallel.
        let chapterPromises = story.chapterUrls.map(getJSON);

        for (let chapterPromise of chapterPromises) {
          // Wait for each chapter to be ready, then add it to the page
          let chapter = yield chapterPromise;
          addHtmlToPage(chapter.html);
        }

        addTextToPage("All done");
      }
      catch (err) {
        // try/catch just works, rejected promises are thrown here
        addTextToPage("Argh, broken: " + err.message);
      }
      document.querySelector('.spinner').style.display = 'none';
    })

[체험해 보기](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }

이는 이전과 정확히 동일하게 작동하지만 훨씬 읽기 쉽습니다. 이는 `about:flags`로 이동하여 **Enable experimental JavaScript features** 설정을 켜면 현재 Chrome 및 Opera([코드](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external } 참조)에서 작동하고 Microsoft Edge에서 작동합니다. 이는 곧 나올 버전에 기본적으로 활성화됩니다.


이는 수많은 새로운 ES6 항목(프라미스, 생성기, let, for-of)을 함께 제공합니다. 프라미스를 산출하면 spawn 도우미가 프라미스 해결을 기다리고 최종 값을 반환합니다. 프라미스가 거부되면 spawn이 yield 문 예외를 발생하게 하는데, 일반 자바스크립트 try/catch를 사용하여 해당 예외를 포착할 수 있습니다. 놀라울 정도로 간단한 비동기 코딩입니다.


이 패턴은 매우 유용하며, [비동기 함수](https://jakearchibald.com/2014/es7-async-functions/)의 형식으로 ES7에 지원되고 있습니다. 위와 상당히 동일하지만 `spawn` 메서드에 대해서는 필요없습니다.


## 프라미스 API 참조 {: #promise-api-reference }

모든 메서드는 다른 설명이 없는 한 Chrome, Opera, Firefox, Microsoft Edge 및 Safari에서 작동합니다. [폴리필](https://github.com/jakearchibald/ES6-Promises#readme)은 모든 브라우저에 다음을 제공합니다.


### 정적 메서드

<table class="responsive methods">
<tr>
<th colspan="2">메서드 요약</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td>프라미스를 반환합니다( <code>promise.constructor == Promise</code>인 경우에만).</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td>thenable에서 새 프라미스를 만듭니다. thenable은 `then()` 메서드가 있다는 점에서 프라미스와 유사합니다.</td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td>이 상황에서  <code>obj</code>에 대해 수행되는 프라미스를 만듭니다.</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td> <code>obj</code>에 대해 거부되는 프라미스를 만듭니다. 일관성 및 디버깅(예: 스택 추적)을 위해  <code>obj</code>는  <code>instanceof Error</code>여야 합니다.</td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td>배열의 모든 항목이 처리될 때 처리되고 어떤 항목이 거부될 때 거부되는 프라미스를 만듭니다. 각 배열 항목이  <code>Promise.resolve</code>에 전달되므로 해당 배열은 프라미스 유사 객체와 다른 객체의 혼합일 수 있습니다. 처리 값은 배열 값의 (순서대로) 배열입니다. 거부 값은 첫 번째 거부 값입니다.</td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td>어떤 항목이 처리되자마자 처리되거나 거부되자마자 거부되는 프라미스를 발생 순서에 상관없이 만듭니다.</td>
</tr>
</table>

참고: 나는 `Promise.race`가 유용한지 잘 모르겠습니다. 나는 오히려 모든 항목이 거부되는 경우에만 거부되는 `Promise.all`의 반대의 것을 가지겠습니다.

### 생성자

<table class="responsive constructors">
<tr>
<th colspan="2">생성자</th>
</tr>
<tr>
  <td><code>new Promise(function(resolve, reject) {});</code></td>
  <td>
    <p>
      <code>resolve(thenable)</code><br>
       <code>thenable</code>의 결과를 사용하여 프라미스가 처리/거부됩니다.
    </p>

    <p>
      <code>resolve(obj)</code><br>
      프라미스가  <code>obj</code>를 사용하여 처리됩니다.
    </p>

    <p>
      <code>reject(obj)</code><br>
      프라미스가  <code>obj</code>를 사용하여 거부됩니다. 일관성 및 
      디버깅(예: 스택 추적)을 위해 obj는  <code>instanceof Error</code>여야 합니다.
      생성자 콜백에서 발생한 오류는 묵시적으로
       <code>reject()</code>로 전달됩니다.
    </p>
  </td>
</tr>
</table>
    
### 인스턴스 메서드

<table class="responsive methods">
<tr>
<th colspan="2">인스턴스 메서드</th>
</tr>
<tr>
  <td><code>promise.then(onFulfilled, onRejected)</code></td>
  <td>
    <code>onFulfilled</code>는 '프라미스'가 분석되는 경우 호출됩니다. 
    <code>onRejected</code>는 '프라미스'가 거부되는 경우 호출됩니다. 둘 다
    선택 사항입니다. 둘 중 하나 또는 모두가 
   생략되면 체인에서 그 다음  <code>onFulfilled</code>/<code>onRejected</code>가 호출됩니다.
    두 콜백은 단일 매개변수, 처리 값 또는 
    거부 이유를 가집니다.  <code>then()</code>은  <code>onFulfilled</code>/<code>onRejected</code>에서 
    반환한 값과 동일한 새 프라미스를 반환합니다
    ( <code>Promise.resolve</code>를 통해 전달된 후). 콜백에서 오류가
    발생하면 반환된 프라미스가 해당 오류와 함께 거부됩니다.
  </td>
</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td> <code>promise.then(undefined, onRejected)</code>의 보완</td>
</tr>
</table>



이 글을 읽고 교정 또는 충고해 주신 Anne van Kesteren, Domenic Denicola, Tom Ashworth, Remy Sharp, Addy Osmani, Arthur Evans 및 Yutaka Hirano에게 감사드립니다.

또한 이 글의 [많은 부분을 업데이트](https://github.com/html5rocks/www.html5rocks.com/pull/921/files)해 주신 [Mathias Bynens](https://mathiasbynens.be/){: .external }에게도 감사드립니다.


{# wf_devsite_translation #}
