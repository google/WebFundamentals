project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: モバイル Web における動画再生フロントエンドのベストプラクティスを紹介します

{# wf_published_on: 2017-04-07 #}
{# wf_updated_on: 2017-06-01 #}

# モバイル Web における動画再生 {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

モバイル Web で最高の視聴体験を提供するにはどうすればよいでしょう。答えは簡単で、それはひとえに、ユーザの没入感を損なわないこと、そして開発者がどれだけ動画に重きを置くかにかかっています。とくに動画を売りにしている Web サイトは、没入感を高めることで、ユーザの再訪を促すことに注力すべきです。

<figure>
  <img src="/web/fundamentals/media/images/mobile-web-video-playback-hero.png">
</figure>

ここでのゴールは、プログレッシブなアプローチで動画の視聴体験を改善する方法、および様々な Web API を使ってユーザの没入感を向上させる方法を紹介することです。そのために、ここでは簡単なプレイヤーを実装します。このプレイヤーは、カスタムコントロール、フルスクリーン再生、バックグラウンド再生等の機能を備えます。先に実際に動く[サンプル]{: .external}と[コード]{: .external}を提示しておきます。

## カスタムコントロール

<div class="attempt-right">
  <figure>
    <img src="/web/fundamentals/media/images/html-layout.jpg">
    <figcaption>
      <b>Figure 1.</b>HTML レイアウト
    </figcaption>
  </figure>
</div>

以下はプレイヤーのマークアップです。ご覧の通り、ルートの`<div>`が`<video>`およびコントロールの`<div>`を含むという、ごくシンプルな作りになっています。

ここでコントロールと言っているのは、再生／一時停止ボタン、フルスクリーンボタン、早戻し／早送りボタン、現在再生時間、尺長時間、などの UI パーツ群を指します。

<div class="clearfix"></div>

    <div id="videoContainer">
      <video id="video" src="file.mp4"></video>
      <div id="videoControls"></div>
    </div>

### メタデータの読み込み

まず最初に、動画の尺長や、現在再生時刻などのメタデータがロードされるのを待ってから、プログレスバーを初期化します。`secondsToTimeCode()` は、秒を表す数値を "hh:mm:ss" の形式の文字列に変換するための自作のユーティリティ関数です。

<pre class="prettyprint lang-html">
&lt;div id="videoContainer">
  &lt;video id="video" src="file.mp4">&lt;/video&gt;
  &lt;div id="videoControls">
    <strong>&lt;div id="videoCurrentTime">&lt;/div>
    &lt;div id="videoDuration">&lt;/div>
    &lt;div id="videoProgressBar">&lt;/div></strong>
  &lt;/div>
&lt;/div>
</pre>

    video.addEventListener('loadedmetadata', function() {
      videoDuration.textContent = secondsToTimeCode(video.duration);
      videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
      videoProgressBar.style.transform = `scaleX(${video.currentTime / video.duration})`;
    });

<figure>
  <img src="/web/fundamentals/media/images/video-metadata-only.png">
  <figcaption>
    <b>Figure 2.</b> 再生時間などのメタデータの表示
  </figcaption>
</figure>

### 再生と一時停止

さて、動画のメタデータがロードされたので、最初のボタン、つまり再生／一時停止の操作をおこなうためのボタンを追加してみましょう。このボタンを押下することで、再生状態によって、`video.play()` もしくは `video.pause()` が呼び出されます。

<pre class="prettyprint lang-html">
&lt;div id="videoContainer">
  &lt;video id="video" src="file.mp4">&lt;/video&gt;
  &lt;div id="videoControls">
    <strong>&lt;button id="playPauseButton">&lt;/button></strong>
    &lt;div id="videoCurrentTime">&lt;/div>
    &lt;div id="videoDuration">&lt;/div>
    &lt;div id="videoProgressBar">&lt;/div>
  &lt;/div>
&lt;/div>
</pre>

    playPauseButton.addEventListener('click', function(event) {
      event.stopPropagation();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    });

注：イベントリスナー内で `event.stopPropagation()` を呼び出すことで、親要素のリスナーに `click` イベントが伝播するのを抑止しています。

ボタンの外観を操作するのは、`click` イベントリスナーではなく、`play` および `pause` イベントリスナーでおこないます。そうすることで、たとえブラウザが再生に介入しても、それに追随することができるため、設計が柔軟になります。再生が開始された場合、ボタンの状態を "paused" に変更し、再生が一時停止された場合、ボタンの状態を元に戻しています。

    video.addEventListener('play', function() {
      playPauseButton.classList.add('paused');
    });

    video.addEventListener('pause', function() {
      playPauseButton.classList.remove('paused');
    });

つぎに、`video` 要素の `currentTime` 属性が変更された場合、`timeupdate` イベントが発生するので、そこでカスタムコントロールの現在時刻表示を更新します。

    video.addEventListener('timeupdate', function() {
      if (videoControls.classList.contains('visible')) {
        videoCurrentTime.textContent = secondsToTimeCode(video.currentTime);
        videoProgressBar.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
    }

最後に、動画が末尾まで再生された場合、ボタンの状態をリセットし、`currentTime`を 0 に戻しています。ここでは別の実装、たとえばユーザがオートプレイ機能を有効にしていれば、自動的に次の動画をロードする、といった実装をおこなうことも可能です。

    video.addEventListener('ended', function() {
      playPauseButton.classList.remove('paused');
      video.currentTime = 0;
    });

### 早戻しと早送り

つぎに、早戻しと早送りのボタンを追加しましょう。このボタンにより、ユーザは 10 秒前もしくは 10 秒後に再生位置をスキップさせることができます。

<pre class="prettyprint lang-html">
&lt;div id="videoContainer">
  &lt;video id="video" src="file.mp4">&lt;/video&gt;
  &lt;div id="videoControls">
    &lt;button id="playPauseButton">&lt;/button>
    <strong>&lt;button id="seekForwardButton">&lt;/button>
    &lt;button id="seekBackwardButton">&lt;/button></strong>
    &lt;div id="videoCurrentTime">&lt;/div>
    &lt;div id="videoDuration">&lt;/div>
    &lt;div id="videoProgressBar">&lt;/div>
  &lt;/div>
&lt;/div>
</pre>

    var skipTime = 10; // 再生をスキップさせる間隔（秒）

    seekForwardButton.addEventListener('click', function(event) {
      event.stopPropagation();
      video.currentTime = Math.min(video.currentTime + skipTime, video.duration);
    });

    seekBackwardButton.addEventListener('click', function(event) {
      event.stopPropagation();
      video.currentTime = Math.max(video.currentTime - skipTime, 0);
    });

さきほどと同様に、外観を操作するのは、`click` イベントリスナーではなく、`seeking` および `seeked` イベントリスナーでおこないます。ここでは `video` 要素に対して　`seeking`　というクラスをセットしていますが、これは独自に定義された CSS クラスであり、単純に `filter: brightness(0);` を設定することで要素の明度を変更しています。

    video.addEventListener('seeking', function() {
      video.classList.add('seeking');
    });

    video.addEventListener('seeked', function() {
      video.classList.remove('seeking');
    });

ここまでで、以下のようなカスタムコントロールが出来上がりました。つぎに、フルスクリーンボタンを実装しましょう。

<video controls controlsList="nodownload" muted playsinline>
  <source src="/web/fundamentals/media/videos/video-play-pause-seek.webm"
          type="video/webm">
  <source src="/web/fundamentals/media/videos/video-play-pause-seek.mp4"
          type="video/mp4">
</video>

## フルスクリーン再生

ここでは、たくさんの Web API を使用して、完璧にシームレスなフルスクリーンの操作体験を実装します。まずは実際に動く[サンプル]{: .external }を見てください。

もちろん、ここで紹介するすべての機能を実装する必要はありません。ご自身のニーズに合わせて適宜取捨選択してください。

<video controls controlsList="nodownload" muted playsinline>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/perfect-fullscreen.webm"
          type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/perfect-fullscreen.mp4"
          type="video/mp4">
</video>

### 自動フルスクリーンの抑止

iOS では動画の再生開始時に、`video` 要素は自動的にフルスクリーンで表示されます。しかしながら、すべてのモバイルブラウザにおいて、なるべく均一なカスタマイズされた動画再生体験を提供するために、この機能を無効化することをおすすめします。iPhone で `video` 要素に `playsinline` 属性を付加することで、自動的にフルスクリーンモードに遷移せず、インライン再生されるようになります。なお、他のブラウザにおいてはこの記述は無視されるため、悪影響を及ぼす心配はありません。

<pre class="prettyprint lang-html">
&lt;div id="videoContainer"&gt;
  &lt;video id="video" src="file.mp4" <strong>playsinline</strong>&gt;&lt;/video&gt;
  &lt;div id="videoControls"&gt;...&lt;/div&gt;
&lt;/div&gt;
</pre>

注：`playsinline` 属性を付加する場合は、かならずカスタムコントロールを実装するか、デフォルトコントロール（`<video controls>`）を有効にしてください。さもなければ、ユーザーは再生操作をおこなえません。

### フルスクリーンボタンによるトグル操作

さて、iPhoneで自動的にフルスクリーンモードになる機能を抑止したので、つぎは [Fullscreen API]{: .external} を使って、フルスクリーンボタンを実装する番です。このボタンを押すことにより、すでにフルスクリーンで再生している場合は、`document.exitFullscreen()` が呼び出され、通常再生モードに戻ります。一方、通常再生時にこのボタンが押された場合は、フルスクリーンモードに遷移します。ここでは、親要素において `requestFullscreen()` メソッドがサポートされているかチェックして、サポートされている場合はそのメソッドを呼び出し、そうでない場合は `video` 要素の `webkitEnterFullscreen()` メソッド（iOSでのみ実装されている）を呼び出しています。

注：Fullscreen API は、まだブラウザベンダーによって実装にムラがあるため、ここでは簡単な[ポリフィル]を実装して使用していますが、[screenfull.js]のようなライブラリを使用することも可能です。

<pre class="prettyprint lang-html">
&lt;div id="videoContainer">
  &lt;video id="video" src="file.mp4">&lt;/video&gt;
  &lt;div id="videoControls">
    &lt;button id="playPauseButton">&lt;/button>
    &lt;button id="seekForwardButton">&lt;/button>
    &lt;button id="seekBackwardButton">&lt;/button>
    <strong>&lt;button id="fullscreenButton">&lt;/button></strong>
    &lt;div id="videoCurrentTime">&lt;/div>
    &lt;div id="videoDuration">&lt;/div>
    &lt;div id="videoProgressBar">&lt;/div>
  &lt;/div>
&lt;/div>
</pre>

    fullscreenButton.addEventListener('click', function(event) {
      event.stopPropagation();
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        requestFullscreenVideo();
      }
    });

    function requestFullscreenVideo() {
      if (videoContainer.requestFullscreen) {
        videoContainer.requestFullscreen();
      } else {
        video.webkitEnterFullscreen();
      }
    }

    document.addEventListener('fullscreenchange', function() {
      fullscreenButton.classList.toggle('active', document.fullscreenElement);
    });

<video controls controlsList="nodownload" muted playsinline>
  <source src="/web/fundamentals/media/videos/toggle-fullscreen-on-button-click.webm"
          type="video/webm">
  <source src="/web/fundamentals/media/videos/toggle-fullscreen-on-button-click.mp4"
          type="video/mp4">
</video>

### スクリーンの向きによるトグル操作

ユーザがデバイスを横方向に傾けた際には、気を利かせて自動的に動画をフルスクリーンで表示してあげましょう。それによって、没入体験を作り出すことができます。[Screen Orientation API]{: .external} を使うことでこれが実現できます。この API はまだすべてのブラウザでサポートされておらず、いくつかのブラウザでは今でもプリフィックスが付いた状態です。こういうときは、プログレッシブエンハンスメントの出番です。

具体的には、スクリーンの方向が変化するとともに、フルスクリーンのモードを変更します。処理としては簡単で、スクリーンがランドスケープ（横表示）に遷移する際にフルスクリーンモードに遷移し、ポートレート（縦表示）に遷移する際に通常表示に戻します。

    if ('orientation' in screen) {
      screen.orientation.addEventListener('change', function() {
        // ユーザがデバイスを横方向に持ち直したときにフルスクリーンモードへ遷移
        if (screen.orientation.type.startsWith('landscape')) {
          requestFullscreenVideo();
        } else if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      });
    }

注：[`orientation change` イベントでフルスクリーンモードへ遷移することを許可](https://github.com/whatwg/fullscreen/commit/e5e96a9)していないブラウザにおいては、上記のコードは動作しませんが、エラーが生じることもなく無視されます。

### スクリーンの向きを固定する

デバイスを横方向に傾けて、フルスクリーンで動画を視聴することが、よりよい視聴体験なのであれば、ユーザがフルスクリーンボタンを押したときに、スクリーンをランドスケープ（横表示）の状態に固定してやるのはどうでしょうか。これを実現するには、さきほどの [Screen Orientation API]{: .external } と [メディアクエリ]{: .external } を併用します。

スクリーンの向きを固定すること自体は、`screen.orientation.lock('landscape')` を呼び出すことで簡単に実現できますが、これをタブレットのような片手で持てないようなデバイスでやっても、あまり良い体験は生み出せません。片手で持てて、かつスクリーンがポートレート（縦表示）のデバイスかどうか、検出するにはどうすればよいでしょうか。ここではそれぞれ、`matchMedia('(orientation: portrait)')` および `matchMedia('(orientation: portrait)')` といったメディアクエリを発行することで実現しています。

<pre class="prettyprint">
fullscreenButton.addEventListener('click', function(event) {
  event.stopPropagation();
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    requestFullscreenVideo();
    <strong>lockScreenInLandscape();</strong>
  }
});
</pre>

    function lockScreenInLandscape() {
      if (!('orientation' in screen)) {
        return;
      }
      // スクリーンがポートレート（縦表示）で、かつ片手で持てるデバイスの場合のみ、スクリーンの向きを横方向に固定する
      if (matchMedia('(orientation: portrait) and (max-device-width: 768px)').matches) {
        screen.orientation.lock('landscape');
      }
    }

<video controls controlsList="nodownload" muted playsinline>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/lock-screen-in-landscape-on-button-click.webm"
          type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/lock-screen-in-landscape-on-button-click.mp4"
          type="video/mp4">
</video>

### デバイスの傾きによりスクリーンの固定を解除する

これでスクリーンを固定できるようになりましたが、この状態では `orientation change` イベントも配信されなくなります。スクリーンの固定状態をふたたび解除するなんらかの手段が必要です。

これを実現するには、[Device Orientation API]{: .external } を使います。この API は、もしデバイスがサポートしていれば、ジャイロスコープと地磁気センサーおよび加速度センサーからの情報をもとに、デバイスの位置および移動速度を計測して提供します。ここでは、ユーザがデバイスを横から縦に持ち替えた場合にスクリーンの固定を解除しています。

<pre class="prettyprint">
function lockScreenInLandscape() {
  if (!('orientation' in screen)) {
    return;
  }
  // スクリーンがポートレート（縦表示）で、かつ片手で持てるデバイスの場合のみ、スクリーンの向きを横方向に固定する
  if (matchMedia('(orientation: portrait) and (max-device-width: 768px)').matches) {
    screen.orientation.lock('landscape')
    <strong>.then(function() {
      listenToDeviceOrientationChanges();
    })</strong>;
  }
}
</pre>

    function listenToDeviceOrientationChanges() {
      if (!('DeviceOrientationEvent' in window)) {
        return;
      }
      var previousDeviceOrientation, currentDeviceOrientation;
      window.addEventListener('deviceorientation', function onDeviceOrientationChange(event) {
        // event.beta はデバイスの表面から背面の方向への移動を表す
        // event.gamma はデバイスの左側から右側の方向への移動を表す
        if (Math.abs(event.gamma) > 10 || Math.abs(event.beta) < 10) {
          previousDeviceOrientation = currentDeviceOrientation;
          currentDeviceOrientation = 'landscape';
          return;
        }
        if (Math.abs(event.gamma) < 10 || Math.abs(event.beta) > 10) {
          previousDeviceOrientation = currentDeviceOrientation;
          // ユーザがデバイスを横方向から縦方向へ持ち直した場合、スクリーンのロックを解除する
          if (previousDeviceOrientation == 'landscape') {
            screen.orientation.unlock();
            window.removeEventListener('deviceorientation', onDeviceOrientationChange);
          }
        }
      });
    }

これで、求めていたシームレスなフルスクリーンの視聴体験が実装できました。改めて[サンプル]{: .external }を実際に試してみてください。

<video controls controlsList="nodownload" muted playsinline>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/perfect-fullscreen.webm"
          type="video/webm; codecs=vp8">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/perfect-fullscreen.mp4"
          type="video/webm; codecs=mp4">
</video>

## バックグラウンド再生

たとえば動画のインプレッションを計測する場合、Web ページもしくはそのページに含まれる `video` 要素が非表示になったタイミングで、アナリティクスにそれを反映させるでしょう。UI に関しても同様の配慮が求められます。たとえば、動画が非表示になった場合に、再生を一時停止したり、他のトラックを選択可能にしたり、カスタムボタンを表示したりといった、UI上の気配りが必要です。

### ページ非表示時に再生を一時停止する

[Page Visibility API] を使うことで、現在のページが表示されているかどうか知ることが可能です。以下のコードでは、ページが非表示になったタイミングで再生を一時停止しています。`visibilitychange` イベントは、ユーザが他のタブを選択したり、スクリーンをロックした場合に発生します。

ほとんどのモバイルデバイスでは、ブラウザ以外のUIでも動画を一時停止したり再開したりできるので、ユーザはページをふたたび表示しなくても再生を再開できます。ユーザがそのようなバックグラウンド再生を許可されている場合にのみ、以下の機能を実装することをおすすめします。

    document.addEventListener('visibilitychange', function() {
      // ページが非表示の場合は再生を一時停止する
      if (document.hidden) {
        video.pause();
      }
    });

注：Chrome for Android はページが非表示になると自動的に再生を一時停止します。

### スクロールアウト時にミュートボタンを表示する

さらに [Intersection Observer API] を使うことで、より細かい制御をおこなうことが可能です。この API を使えば、ある要素が画面の領域外に（スクロール等の操作により）押し出されたことを検出することが可能です。

では、`video` 要素が画面の領域から外に出た場合に、ミュートボタンを表示してみましょう。ここでは、`IntersectionObserver` のハンドラ内で、動画再生中かつ要素が領域外の場合に、画面右下にミュートボタンを表示しています。これにより、ユーザーはスクロールアウトした動画の音声を止めることが可能になります。ミュートボタンの外観の更新は、`video` 要素の `volumechange` イベントリスナーでおこなっています。

注：ページ内にたくさんの `video` 要素が存在する場合、ミュートボタンを表示するよりも、単純に `video.src = null` でリセットした方がよいかもしれません。とくに無限スクロールの場合、この手法によりリソースを大幅に節約できます。

    <button id="muteButton"></button>

<div class="clearfix"></div>

    if ('IntersectionObserver' in window) {
      // video 要素が画面の領域外に出た場合、ミュートボタンを表示する
      function onIntersection(entries) {
        entries.forEach(function(entry) {
          muteButton.hidden = video.paused || entry.isIntersecting;
        });
      }
      var observer = new IntersectionObserver(onIntersection);
      observer.observe(video);
    }

    muteButton.addEventListener('click', function() {
      // ミュートボタンが押されたときの処理
      video.muted = !video.muted;
    });

    video.addEventListener('volumechange', function() {
      muteButton.classList.toggle('active', video.muted);
    });

<video controls controlsList="nodownload" muted playsinline>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/video-visibility.webm"
          type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/video-visibility.mp4"
          type="video/mp4">
</video>

### メディア通知のカスタマイズ

[Media Session API]{: .external} を使えば、モバイルデバイスのメディア通知トレイの振る舞いをカスタマイズできます。また、通知やハードウェアキー経由で、早送りや曲送り等の操作を行った場合の、イベントハンドラを定義することが可能です。じっさいに[サンプル]{: .external }をモバイルブラウザで実行して試してみてください。

Web ページで音声や動画を再生している場合、通知トレイにメディア通知が表示されると思います。Android の Chrome は、Web ページのタイトルや一番大きなアイコンを用いて、なるべく現在再生中のメディアと関連性のある情報をここに表示しようとします。

[Media Session API]{: .external } を使えば、メディア通知をカスタマイズすることが可能です。タイトルやアーティスト名、アルバム名、アートワーク等のメタデータを、メディア通知上に表示させることができます。

<pre class="prettyprint">
playPauseButton.addEventListener('click', function() {
  event.stopPropagation();
  if (video.paused) {
    video.play()
    <strong>.then(function() {
      setMediaSession();
    });</strong>
  } else {
    video.pause();
  }
});
</pre>

    function setMediaSession() {
      if (!('mediaSession' in navigator)) {
        return;
      }
      navigator.mediaSession.metadata = new MediaMetadata({
        title: 'Never Gonna Give You Up',
        artist: 'Rick Astley',
        album: 'Whenever You Need Somebody',
        artwork: [
          { src: 'https://dummyimage.com/96x96',   sizes: '96x96',   type: 'image/png' },
          { src: 'https://dummyimage.com/128x128', sizes: '128x128', type: 'image/png' },
          { src: 'https://dummyimage.com/192x192', sizes: '192x192', type: 'image/png' },
          { src: 'https://dummyimage.com/256x256', sizes: '256x256', type: 'image/png' },
          { src: 'https://dummyimage.com/384x384', sizes: '384x384', type: 'image/png' },
          { src: 'https://dummyimage.com/512x512', sizes: '512x512', type: 'image/png' },
        ]
      });
    }

ひとたび再生が完了すれば、メディア通知は自動的に非表示となるため、セッションを明示的に解放する必要はありません。ただし、つぎに再生が開始されると、ふたたび `navigator.mediaSession.metadata` が参照されるため、再生が始まるたびに正しいメタデータでこのオブジェクトを更新しなければいけません。

もしプレイリストを実装するのであれば、メディア通知からも曲送りができるようにしてあげるべきです。以下のコードでは、Media Session API を使って、`previoustrack` と `nexttrack` のアクションハンドラを設定しています。

    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('previoustrack', function() {
        // ユーザがメディア通知のUI経由で一曲前にスキップした
        playPreviousVideo(); // load and play previous video
      });
      navigator.mediaSession.setActionHandler('nexttrack', function() {
        // ユーザがメディア通知のUI経由でつぎの曲にスキップした
        playNextVideo(); // load and play next video
      });
    }

ここで、設定されたアクションハンドラは曲送り後も残ることに注意してください。これは、`addEventListener` と同じ振る舞いですが、一点違いを挙げるとすれば、アクションハンドラはブラウザのデフォルトの動作を無効化することです。アクションハンドラがひとつでも設定されることで、ブラウザは Web アプリがメディア操作に責任を持つとみなし、すべてのデフォルトの動作を止めてしまいます。したがって、アクションハンドラを設定しないかぎり、メディア通知上に該当するコントロールが表示されません。

ちなみに、いったん設定したアクションハンドラを無効化して、ふたたびブラウザのデフォルト動作に戻したい場合は、単純に `null` を設定してください。

さらに、Media Session API を使うことで、メディア通知の早戻し／早送りの振る舞いをカスタマイズすることができます。以下のコードでは、10秒間隔で再生をスキップしています。

    if ('mediaSession' in navigator) {
      let skipTime = 10; // Time to skip in seconds

      navigator.mediaSession.setActionHandler('seekbackward', function() {
        // ユーザがメディア通知のUIで早戻し操作をおこなった
        video.currentTime = Math.max(video.currentTime - skipTime, 0);
      });
      navigator.mediaSession.setActionHandler('seekforward', function() {
        // ユーザがメディア通知のUIで早送り操作をおこなった
        video.currentTime = Math.min(video.currentTime + skipTime, video.duration);
      });
    }

再生／一時停止のアイコンは常にメディア通知上に表示され、操作イベントはブラウザのデフォルトハンドラにて処理されます。もちろん、独自のハンドラを定義して、[メディア通知の再生／一時停止イベントを処理する]ことも可能です。

Media Session API の素晴らしいところは、通知トレイだけではなく、ロックされたスクリーン上にメタデータとコントロールを表示させたり、また、ウェアラブルデバイスと自動的に同期される点です。

<video controls controlsList="nodownload" muted playsinline>
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/media-session.webm"
          type="video/webm">
  <source src="https://storage.googleapis.com/webfundamentals-assets/videos/media-session.mp4"
          type="video/mp4">
</video>

[サンプル]: https://googlesamples.github.io/web-fundamentals/fundamentals/media/mobile-web-video-playback.html
[コード]: https://github.com/googlesamples/web-fundamentals/tree/gh-pages/fundamentals/media/mobile-web-video-playback.html
[ポリフィル]: https://github.com/googlesamples/web-fundamentals/tree/gh-pages/fundamentals/media/tiny-fullscreen-shim.js
[screenfull.js]: https://github.com/sindresorhus/screenfull.js
[メディア通知の再生／一時停止イベントを処理する]: /web/updates/2017/02/media-session?hl=ja#play_pause
[Fullscreen API]: https://fullscreen.spec.whatwg.org/
[Screen Orientation API]: https://w3c.github.io/screen-orientation/
[メディアクエリ]: https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries
[Device Orientation API]: https://w3c.github.io/deviceorientation/spec-source-orientation.html
[Page Visibility API]: https://www.w3.org/TR/page-visibility/
[Intersection Observer API]: /web/updates/2016/04/intersectionobserver?hl=ja
[Media Session API]: /web/updates/2017/02/media-session?hl=ja
