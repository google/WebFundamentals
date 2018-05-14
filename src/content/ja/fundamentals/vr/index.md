project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR

{# wf_updated_on:2016-12-12 #}
{# wf_published_on:2016-12-12 #}

#  WebVR {: .page-title }

警告:WebVR はまだ試験運用版であり、仕様変更の可能性があります。

WebVR は、[Daydream ヘッドセット](https://vr.google.com/daydream/)や Pixel スマートフォンなど、ユーザーが所有している VR ヘッドセットや VR 対応端末を利用して、ブラウザに臨場感あふれる 3D エクスペリエンスを表示できるようにする JavaScript API です。

<img src="img/getting-started-with-webvr.jpg" alt="WebVR を使ってみる" />

##  サポートと利用

現在、WebVR API は次のブラウザで利用可能です。

* Chrome ベータ版（M56+）（[オリジン トライアル](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)によって）
* Firefox Nightly
* Samsung Internet Browser for Gear VR（注: 現在、このブラウザは古いバージョンの WebVR 仕様をサポートしています）

WebVR をサポートしていないブラウザまたは古いバージョンの API を使用しているブラウザの場合は、[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill) にフォールバックできます。ただし、VR は*パフォーマンスの影響を非常に受けやすく*、Polyfill は基本的にパフォーマンスのコストが大きいため、WebVR をネイティブでサポートしていないブラウザのユーザーに対しては、Polyfill を使用するかどうかを検討する必要があることに留意してください。

不安がある場合は、低品質の 3D エクスペリエンスを避けて、ユーザーが乗り物酔いのような状態にならないようにしてください。

[WebVR の最新のステータスをご確認ください。](./status/)

##  WebVR のコンテンツを作成する

WebVR のコンテンツを作成するには、いくつかの最新の API に加えて、[WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) や [Web Audio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) などの既存のテクノロジーを活用し、さまざまな入力タイプとヘッドセットについて理解する必要があります。

<div class="attempt-left">
  <h3>WebVR を使ってみる</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="WebVR を使ってみる" />
  </a>
  <p>
    WebGL シーンを用意して VR API を追加し、WebVR をさっそく使用してみましょう。<br>
    <a href="./getting-started-with-webvr/">詳細を見る</a>
  </p>
</div>
<div class="attempt-right">
  <h3>WebVR シーンに入力機能を追加する</h3>
  <a href="./adding-input-to-a-webvr-scene/">
    <img src="img/adding-input-to-a-webvr-scene.jpg" alt="WebVR シーンに入力機能を追加する" />
  </a>
  <p>
    魅力的な没入型のエクスペリエンスを提供するには、インタラクションが不可欠です。<br>
    <a href="./adding-input-to-a-webvr-scene/">スタートガイド</a>
  </p>
</div>

<div class="clearfix"></div>

###  その他のリソース

最近は、優れた WebVR のリソースがウェブで見つかるようになってきています。

* [WebVR API について学習する](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
* [WebVR のサンプルを見る](https://webvr.info/samples/)
* [Google Cardboard 向けのデザイン](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

##  パフォーマンスをトラッキングする

<img src="img/oce.png" class="attempt-right" alt="WebVR のパフォーマンス" />

WebVR を使用するユーザーが不快に感じないようにするには、一貫した（高い）フレームレートを維持する必要があります。フレームレートが安定していないと、見ているユーザーは乗り物酔いのような状態になる場合があります。

モバイル端末では、通常、リフレッシュ レートは 60Hz です。つまりターゲットは 60fps です（フレームごとのブラウザのオーバーヘッドを*含めて*、1 フレームあたり 16ms）。PC では、通常、ターゲットは 90Hz です（オーバーヘッドを含めて 1 フレームあたり 11ms）。

これらの目標値を達成するには、[ターゲット端末で定期的に](/web/tools/chrome-devtools/remote-debugging/)テストを実施し、[Chrome DevTools の Timeline を使用してフレームごとの負荷を測定](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)する必要があります。

##  プログレッシブ エンハンスメントの原則を順守する

<img src="img/touch-input.png" class="attempt-right" alt="プログレッシブ エンハンスメントに基づいてユーザー数を増やす" />

ユーザーがヘッドマウント ディスプレイ（HMD）や VR 対応端末を所有していない場合は、プログレッシブ エンハンスメントの概念を採用するのが最善策です。

1. ユーザーが、VR ヘッドセットを使用せずに、キーボード、マウス、タッチスクリーンなどの従来の入力装置を使用していると想定します。
2. 実行時の入力とヘッドセットの使用可能状況の変化に対応します。

幸い、[WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API) を使用すると、VR 環境の変化を検出して、入力とユーザー端末の表示オプションの変化に対応することができます。

最初に非 VR 環境を想定することで、対象ユーザー数を最大限にし、ユーザーの設定に関係なく、可能な限り最高の 3D エクスペリエンスを提供できるようになります。

詳細については、[WebVR シーンに入力を追加する](./adding-input-to-a-webvr-scene/)のガイドをご覧ください。


{# wf_devsite_translation #}
