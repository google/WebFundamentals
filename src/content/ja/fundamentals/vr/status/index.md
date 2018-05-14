project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR のステータスに関する最新情報と WebVR エクスペリエンスを構築するときの考慮事項について説明します。

{# wf_updated_on:2016-12-12 #}
{# wf_published_on:2016-12-12 #}

# WebVR のステータスと考慮事項 {: .page-title }

警告:WebVR はまだ試験運用版であり、仕様変更の可能性があります。

##  WebVR の実装ステータス

現在、WebVR API は次のブラウザで利用可能です。

* Chrome ベータ版（M56+）（[オリジン トライアル](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md)によって）
* Firefox Nightly
* Samsung Internet Browser for Gear VR（注: 現在、このブラウザは古いバージョンの WebVR 仕様をサポートしています）

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/4532810371039232?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

ブラウザの実装ステータスの詳細については、[chromestatus.com](https://www.chromestatus.com/features/4532810371039232?embed) をご覧ください。

##  考慮事項

WebVR エクスペリエンスを構築するときの考慮事項を次に示します。

* **HTTPS を介して WebVR コンテンツを提供する必要があります**。そうしない場合、ブラウザによってユーザーに警告が表示されます。
    * 詳細については、[サーバーでの HTTPS の有効化](/web/fundamentals/security/encrypt-in-transit/enable-https)をご覧ください。
* **現在、Chrome では Android 上のネイティブ WebVR のみをサポートしています**。Daydream ヘッドセットと Pixel スマートフォンを使用する必要があります。
* **[WebVR Polyfill](https://github.com/googlevr/webvr-polyfill) は、仕様のネイティブ実装と完全に対応してるわけではありません**。Polyfill を使用する予定がある場合は、VR 対応端末と非 VR 端末の両方でチェックする必要があります。
* **ユーザーが VR コントローラ ボタンをクリックしてからでないと、コードで利用できません**。これをコードで明確にし、通常、VR エクスペリエンスの開始時にコントローラ ボタンを押すようユーザーに求めるメッセージを表示する必要があります。
* **ローカルで実行する場合は、Chrome 56 で Gamepad の姿勢情報を有効にする必要があります**。Chrome 56 で Gamepad 拡張機能のランタイム フラグを有効にしていない限り、localhost で実行するときに、Gamepad 情報には、姿勢（または位置）情報は含まれません。オリジン トライアルを利用している場合は、WebVR API で Gamepad 拡張機能が有効化されます。


{# wf_devsite_translation #}
