project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome Developer Tools を使用して、ネイティブ Android アプリの WebView をデバッグします。

{# wf_updated_on:2015-07-29 #}
{# wf_published_on:2015-04-13 #}

# WebView のリモート デバッグ {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Chrome Developer Tools を使用して、ネイティブ Android アプリの WebView をデバッグします。

Android 4.4（KitKat）以降では、DevTools を使用してネイティブ Android アプリの WebView コンテンツをデバッグします。



### TL;DR {: .hide-from-toc }
- ネイティブ Android アプリで WebView のデバッグを有効にし、Chrome DevTools で WebView をデバッグします。
- デバッグが有効な WebView のリストにアクセスするには、<strong>chrome://inspect</strong> を使用します。
- WebView のデバッグは、<a href='/web/tools/chrome-devtools/debug/remote-debugging'>リモート デバッグ</a>によるウェブページのデバッグと同じです。


##  デバッグのための WebView の設定

WebView のデバッグは、アプリ内から有効にする必要があります。WebView のデバッグを有効にするには、WebView クラスの静的メソッド [setWebContentsDebuggingEnabled](https://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean)) を呼び出します。


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true);
    }
    

この設定は、アプリの WebView すべてに適用されます。

**使い方**:WebView のデバッグは、アプリのマニフェスト内の `debuggable` フラグの状態に**影響されません**。`debuggable` が `true` の場合にのみ WebView のデバッグを有効にする場合は、実行時にフラグをテストしてください。


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE))
        { WebView.setWebContentsDebuggingEnabled(true); }
    }
    

##  DevTools で WebView を開く

**chrome://inspect** ページには、端末上のデバッグが有効な WebView のリストが表示されます。

デバッグを開始するには、デバッグする WebView の下にある [**inspect**] をクリックします。リモートのブラウザのタブの場合と同様に DevTools を使用します。

![WebView 内の要素の調査](imgs/webview-debugging.png)

WebView とともに表示されているグレーのグラフィックは、端末の画面を基準にしたサイズと位置を表します。WebView にタイトルが設定されている場合、タイトルも表示されます。

## トラブルシューティング

**chrome://inspect ページ**に WebView が表示されない場合は、次の解決方法をお試しください。

* WebView のデバッグがアプリで有効になっていることを確認します。
* 端末で、デバッグする WebView を使用しているアプリを開きます。その後、**chrome://inspect** ページを更新します。


{# wf_devsite_translation #}
