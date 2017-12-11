project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 비동기 함수를 사용하여 마치 동기 함수인 것처럼 프라미스 기반 코드 작성 가능

{# wf_published_on: 2016-10-20 #}
{# wf_updated_on: 2016-10-20 #}

# 비동기 함수 - 프라미스에 친숙해질 수 있게 해주는 함수 {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

비동기 함수는 Chrome 55에서 기본적으로 활성화되어 있는데, 솔직히 꽤 놀라운
함수입니다. 비동기 함수를 사용하면 메인 스레드를 차단하지 않고도 마치 동기 함수인 것처럼
프라미스 기반 코드를 작성할 수 있습니다. 이 함수를 통해 비동기 코드를 덜
'똑똑'하고 더 읽기 쉽게 만들 수 있습니다.

비동기 함수는 다음과 같은 식으로 작동합니다.

    async function myFirstAsyncFunction() {
      try {
        const fulfilledValue = await promise;
      }
      catch (rejectedValue) {
        // …
      }
    }

함수 정의 앞에 `async` 키워드를 사용하면 함수 내에
`await`를 사용할 수 있습니다. 프라미스를 `await`할 때 함수는 프라미스가 결정될 때까지
방해하지 않는 방식으로 일시 중지됩니다. 프라미스가 이행되면 값을
돌려받습니다. 프라미스가 거부되면 거부된 값이 반환(throw)됩니다.

참고: 프라미스에 익숙하지 않다면 [프라미스
가이드](/web/fundamentals/getting-started/primers/promises)를 살펴보세요.

## 예: 가져오기 로깅

URL을 가져와서 응답을 텍스트로 로그하려는 경우를 생각해봅시다. 다음은 프라미스를 사용하는
방법을 나타낸 것입니다.

    function logFetch(url) {
      return fetch(url)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        }).catch(err => {
          console.error('fetch failed', err);
        });
    }

다음은 똑같은 결과를 내지만 비동기 함수를 사용할 때의 예입니다.

    async function logFetch(url) {
      try {
        const response = await fetch(url);
        console.log(await response.text());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

줄 개수는 같지만 콜백이 전부 사라졌습니다. 따라서 특히 프라미스에 익숙하지 않은
사람으로서는 훨씬 더 읽기 쉬워집니다.

참고: `await`하는 것은 전부 `Promise.resolve()`를 통해 전달되므로,
기본 프라미스가 아닌 프라미스를 안전하게 `await`할 수 있습니다.

## 비동기 반환 값

`await` 사용 여부와는 상관없이, 비동기 함수는 *항상* 프라미스를 반환합니다. 해당 프라미스는
무엇이든 비동기 함수가 반환하는 것과 함께 해결되거나 비동기 함수가
발생시키는 것과 함께 거부됩니다. 따라서 다음과 같이

    // wait ms milliseconds
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function hello() {
      await wait(500);
      return 'world';
    }

…`hello()`를 호출하면 `"world"`와 함께 *이행*되는 프라미스가 반환됩니다.

    async function foo() {
      await wait(500);
      throw Error('bar');
    }

…`foo()`를 호출하면 `Error('bar')`와 함께 *거부*되는 프라미스가 반환됩니다.

## 예: 응답 스트리밍

비동기 함수의 이점은 복잡한 예시에서 더욱 두드러집니다. 청크를 로그아웃하는 동안
응답을 스트리밍하고 최종 크기를 반환하려는 경우를 생각해봅시다.

참고: 실은 '청크를 로그아웃한다'는 문구가 거슬리는군요.

프라미스를 사용하는 다음 예를 살펴봅시다.

    function getResponseSize(url) {
      return fetch(url).then(response => {
        const reader = response.body.getReader();
        let total = 0;

        return reader.read().then(function processResult(result) {
          if (result.done) return total;

          const value = result.value;
          total += value.length;
          console.log('Received chunk', value);

          return reader.read().then(processResult);
        })
      });
    }

제 이름이 제이크 아치볼드인데요. 제이크 '프라미스 행사자' 아치볼드라고나 할까요. 제가
비동기 루프를 설정하기 위해 `processResult` 자체 내부에서 이를 호출하는 방식을 확인해보세요. 그런 식으로 작성하면서
제 스스로 *무척 스마트하다*고 느껴졌답니다. 하지만 대부분의 '스마트한' 코드와 마찬가지로,
다른 사람의 입장에서는 그 코드가 무슨 일을 하는지 알아내려면 한참이나 두 눈 부릅뜨고 살펴봐도 알 수 있을까 말까 합니다. 마치 90년대에 한창 유행했던 매직아이 그림을
보는 기분이랄까요.

위 코드를 비동기 함수를 이용해 다시 작성해봅시다.

    async function getResponseSize(url) {
      const response = await fetch(url);
      const reader = response.body.getReader();
      let result = await reader.read();
      let total = 0;

      while (!result.done) {
        const value = result.value;
        total += value.length;
        console.log('Received chunk', value);
        // get the next result
        result = await reader.read();
      }

      return total;
    }

'스마트함'이 모두 사라졌습니다. 자기 만족감을 느끼게 해줬던 비동기 루프가
다소 따분해 보이지만 믿음직한 while 루프로 바뀌었죠. 훨씬 더 낫습니다. 앞으로 우리는
[비동기 반복기](https://github.com/tc39/proposal-async-iteration){: .external}를 이용할 겁니다.
[`while` 루프를
for-of 루프로 바꿔줄 것](https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376){: .external}이며, 훨씬 더 깔끔해 보이게 해줄 겁니다.

참고: 전 스트림을 정말 좋아한답니다. 스트리밍에 익숙하지 않은 분은
[제 가이드를 확인해보세요](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api){: .external}.

## 다른 비동기 함수 구문

`async function() {}`을 이미 살펴봤지만, `async` 키워드는 다음과 같이 다른 함수 구문과 함께
사용할 수 있습니다.

### 화살표 함수

    // map some URLs to json-promises
    const jsonPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });

참고: `array.map(func)`은 비동기 함수를 썼다는 사실에 개의치 않고 그저
프라미스를 반환하는 함수로 볼 뿐입니다. 첫 번째 함수가
완료되기를 기다리지 않고 두 번째 함수를 호출합니다.

### 객체 메서드

    const storage = {
      async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
      }
    };

    storage.getAvatar('jaffathecake').then(…);

### 클래스 메서드

    class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }

      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }

    const storage = new Storage();
    storage.getAvatar('jaffathecake').then(…);

참고: 클래스 생성자와 getter/setting은 비동기일 수 없습니다.

## 주의할 점! 너무 순차적으로 작성하지는 말 것

동기 함수처럼 보이는 코드를 작성하는 중이지만, 병렬로 처리할 수 있는 기회를
놓치진 마세요.

    async function series() {
      await wait(500);
      await wait(500);
      return "done!";
    }

위 코드를 완료하는 데는 1,000ms 이상 걸립니다.

    async function parallel() {
      const wait1 = wait(500);
      const wait2 = wait(500);
      await wait1;
      await wait2;
      return "done!";
    }

반면에, 위 코드는 500ms밖에 걸리지 않습니다. 왜냐하면 둘 다 동시에 일어나길 기다리기 때문이죠.
실용적 예시를 살펴봅시다.

### 예: 가져오기(fetch)를 순서대로 출력

예컨대, 일련의 URL을 가져와서 최대한 빨리 올바른 순서대로 로그에 기록하려는
경우를 생각해봅시다.

*심호흡을 하세요.* 프라미스를 사용하면 다음과 같은 형태가 됩니다.

    function logInOrder(urls) {
      // fetch all the URLs
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });

      // log them in order
      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise)
          .then(text => console.log(text));
      }, Promise.resolve());
    }

네, 생각하신 대로 프라미스의 순서를 체인으로 연결하려고 `reduce`를 사용하고 있어요. 전 *정말
스마트한* 것 같습니다. *스마트한* 코딩일지는 몰라도 실은 없는 게 더 낫습니다.

위 코드를 비동기 함수로 변환할 때는
*지나치게 순차적*으로 작성하고픈 유혹이 생길 것입니다.

<span class="compare-worse">권장되지 않음</span> - 너무 순차적임

    async function logInOrder(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
      }
    }

훨씬 더 깔끔해 보이지만 첫 번째 가져오기를 완전히 읽은 후에야 두 번째 가져오기가 시작되고 계속 그런 식으로 진행된다는 게
단점입니다. 이렇게 하면 병렬로 가져오기를 수행하는
프라미스 예시에 비해 훨씬 더 속도가 느려집니다. 그런데 고맙게도 그 중간에서 취할 수 있는 이상적인 방법이 있답니다.

<span class="compare-better">권장</span> - 훌륭하게 병렬 처리

    async function logInOrder(urls) {
      // fetch all the URLs in parallel
      const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      // log them in sequence
      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    }

이 예시에서는 URL을 병렬로 가져와서 읽습니다. 다만, '스마트한'
`reduce`가 쉽게 읽을 수 있지만 일반적이고 따분해 보이는 for 루프로 바뀌어 있죠.

## 브라우저 지원과 해결 방법

이 글을 작성하는 시점 기준으로, Chrome 55에서는 비동기 함수가 기본적으로 지원되지만
다음과 같이 모든 주요 브라우저에서도 개발 중입니다.

* Edge - [빌드 14342 이상에 적용 예정](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
* Firefox - [적극적으로 개발 중](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
* Safari - [적극적으로 개발 중](https://bugs.webkit.org/show_bug.cgi?id=156147)

### 해결 방법 - 제너레이터

제너레이터를 지원하는 브라우저([모든
주요 브라우저의 최신 버전](http://kangax.github.io/compat-table/es6/#test-generators){:.external}
포함)를 목표로 하는 경우 비동기 함수를 폴리필(polyfill)할 수 있습니다.

[Babel](https://babeljs.io/){: .external}이 이 작업을 대신 처리해 줄 것입니다.
[Babel REPL을 통한 예시를 참조하세요](https://goo.gl/0Cg1Sq){: .external}.
- 트랜스파일된 코드가 얼마나 비슷하지 유심히 살펴보세요. 이 정보는
[Babel의 es2017 프리셋](http://babeljs.io/docs/plugins/preset-es2017/){: .external}에서 발췌한 내용입니다.

참고: Babel REPL은 무척 흥미로운 대상입니다. 한번 직접 사용해 보세요.

전 트랜스파일 접근방식을 권장합니다. 왜냐하면 대상 브라우저가
비동기 함수를 지원한다면 그냥 쓰지 않으면 그뿐이지만, 트랜스파일러를 *정말로* 사용하고
싶지 않다면
[Babel의 폴리필](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}을
가져와 사용하면 되기 때문입니다. 즉, 다음과 같이 작성하는 대신

    async function slowEcho(val) {
      await wait(1000);
      return val;
    }

[폴리필](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}을
포함하여 다음과 같이 작성하면 됩니다.

    const slowEcho = createAsyncFunction(function*(val) {
      yield wait(1000);
      return val;
    });

참고로, 제너레이터(`function*`)를 `createAsyncFunction`으로 전달하고
`await` 대신 `yield`를 사용해야 합니다. 그 밖의 다른 것은 똑같이 작동합니다.

### 해결 방법 - 리제너레이터

다른 브라우저를 대상으로 할 경우 Babel은 제너레이터도 트랜스파일할 수 있으므로,
이전 버전인 IE8까지는 비동기 함수를 사용할 수 있습니다. 이를 위해서는
[Babel의 es2017 프리셋](http://babeljs.io/docs/plugins/preset-es2017/){: .external}과
[es2015 프리셋](http://babeljs.io/docs/plugins/preset-es2015/){: .external}이 *모두* 필요합니다.

[출력 결과가 깔끔해지지 않을 수 있으므로](https://goo.gl/jlXboV) 코드가
장황하게 늘어지지 않도록 주의하세요.

## 모든 것을 비동기화!

앞으로 모든 브라우저에서 비동기 함수가 지원되면 프라미스를 반환하는 모든 함수에
비동기 함수를 사용하세요! 그러면 코드가 더 깔끔해질 뿐 아니라
함수가 *항상* 프라미스를 반환하도록 할 수 있습니다.

저는
[2014년](https://jakearchibald.com/2014/es7-async-functions/){: .external}에 비동기 함수를 접하고서 정말 열광했답니다.
그런데 실제로 각종 브라우저에 안착하는 모습을 보니 감격스럽네요. 정말 굉장한 경험입니다!


{# wf_devsite_translation #}
