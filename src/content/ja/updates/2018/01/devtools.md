project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-10-30 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# DevTools（Chrome 65）の新 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome 65のDevToolsには次の新機能が含まれています。

* [**Local Overrides**](#overrides)
* [New accessibility tools](#a11y)
* [The **Changes** tab](#changes)
* [New SEO and performance audits](#audits)
* [Multiple recordings in the **Performance** panel](#recordings)
* [Reliable code stepping with workers and asynchronous code](#stepping)

以下のリリースノートを読んだり、ビデオ版をご覧ください。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: `chrome://version`実行しているChromeのバージョンを確認してください。以前のバージョンを使用している場合、これらの機能は存在しません。それ以降のバージョンを使用している場合は、これらの機能が変更されている可能性があります。 Chromeは6週間ごとに新しいメジャーバージョンに自動的に更新されます。

## ローカルオーバーライド{: #overrides }

**ローカルオーバーライド**を使用すると、DevToolsで変更を加え、それらの変更をページ読み込み全体に保持できます。以前は、DevToolsで行った変更は、ページを再読み込みすると失われていました。
**ローカルオーバーライド**は、ほとんどのファイルタイプで動作しますが、いくつかの例外があります。 [Limitations](#overrides-limitations)参照してください。

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</figure>

使い方:

* DevToolsが変更を保存するディレクトリを指定します。
DevToolsを変更すると、DevToolsは変更されたファイルのコピーをディレクトリに保存します。
*ページをリロードすると、DevToolsはネットワークリソースではなくローカルの変更されたファイルを提供します。

**ローカルオーバーライド**を設定するには:

1. **ソース**パネルを開きます。 1. **上書き**タブを開きます。

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. **設定の上書き**をクリックします。 1.変更を保存するディレクトリを選択します。 1.ビューポートの上部で、**許可**をクリックしてDevToolsにディレクトリへの読み書きアクセスを許可します。 1.変更を加えます。

### 制限{: #overrides-limitations }

* DevToolsは、**Elements** パネルの **DOM Tree** の変更を保存しません。代わりに**ソース**パネルでHTMLを編集してください。
* **スタイル**ペインでCSSを編集し、そのCSSのソースがHTMLファイルの場合、DevToolsは変更を保存しません。代わりに**ソース**パネルでHTMLファイルを編集してください。

### 関連機能{: #overrides-related }

* [Workspaces][WS] 。 DevToolsは自動的にネットワークリソースをローカルリポジトリにマップします。 DevToolsを変更すると、その変更もローカルリポジトリに保存されます。

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## [変更]タブ{: #changes }

DevToolsでローカルで行った変更を新しい**変更**タブで追跡します。

<figure>
  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</figure>

## 新しいアクセシビリティツール{: #a11y }

新しい**アクセシビリティ**ペインを使用して、要素のアクセシビリティプロパティを検査し、**カラーピッカー**のテキスト要素のコントラスト比を調べて、低視力障害または色のあるユーザーがアクセシビリティにアクセスできるようにします - 欠陥の欠陥。

### アクセシビリティペイン{: #a11y-pane }

**Elements** パネルの **Accessibility** ペインを使用して、現在選択されている要素のアクセシビリティプロパティを調べます。

<figure>
  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</figure>

下のラベリングのRob DodsonのA11ycastをチェックして、**アクセシビリティ**ペインを実際に見てください。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</div>

### カラーピッカーでのコントラスト比{: #contrast }

[Color Picker][CP]はテキスト要素のコントラスト比を表示します。テキスト要素のコントラスト比を増やすと、視覚障害や色覚障害のあるユーザーがサイトにアクセスしやすくなります。コントラスト比がアクセシビリティにどのように影響するかについては、 [Color and contrast][contrast]を参照してください。

テキスト要素の色のコントラストを改善すると、 <i>すべての</i>ユーザーがサイトをより使いやすくすることができます。言い換えれば、テキストが白い背景で灰色である場合、誰にでも読むことは難しいです。

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</figure>

**図5 **では、** 4.61 **の隣にある2つのチェックマークは、この要素が[enhanced recommended contrast ratio (AAA)][enhanced]{:.external}満たすことを意味します。チェックマークが1つしかない場合は、それが[minimum recommended contrast ratio (AA)][minimum]{:.external}に会ったことを意味します。

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

**もっと見る**をクリックしてください！ **コントラスト比**セクションを拡大するには[Show More][SM]{:.cdt-inl}を[Show More][SM]{:.cdt-inl}ます。 ** Color Spectrum **ボックスの白い線は、推奨されるコントラスト比を満たす色と、そうでない色との境界を表します。例えば、
**図6 **は推奨を満たしています。つまり、白線の下のすべての色も推奨値を満たしています。

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</figure>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### 関連機能{: #contrast-related }

**監査**パネルには、自動アクセシビリティ監査機能があります。
*ページ上のすべての*テキスト要素は十分なコントラスト比を持っています。

参照[Run Lighthouse in Chrome DevTools][audit] 、またはアクセス可能性をテストするために**監査**パネルを使用する方法については、下記のA11ycastを見ます。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</div>

[audit]: /web/tools/lighthouse/#devtools

## 新しい監査{: #audits }

Chrome 65には、全く新しいカテゴリのSEO監査と多くの新しいパフォーマンス監査が付属しています。

Note: ** [Lighthouse][LH] **パネルは[Lighthouse][LH]によって強化されてい[Lighthouse][LH] 。 Chrome 64はLighthouseバージョン2.5を実行します。 Chrome 65はLighthouseバージョン2.8を実行します。したがって、このセクションは、2.6,2.7、および2.8からLighthouseのアップデートをまとめたものです。

### 新しいSEO監査{: #seo }

ページが新しい **SEO** カテゴリの各監査に合格するようにすることで、検索エンジンのランキングが向上する場合があります。

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</figure>

### 新しいパフォーマンス監査{: #performance }

Chrome 65には、多くの新しいパフォーマンス監査が付属しています。

* JavaScriptの起動時間が長い
静的資産に対する非効率なキャッシュポリシーを使用
*ページリダイレクトを避ける
*ドキュメントはプラグインを使用します
* CSSの縮小
* JavaScriptを縮小する

<aside class="key-point">
  <b>Perf matters!</b> After Mynet improved their page load speed by 4X, users spent 43% more time
  on the site, viewed 34% more pages, bounce rates dropped 24%, and revenue increased 25% per
  article pageview. <a href="/web/showcase/2017/mynet">Learn more</a>.
</aside>

<aside class="success">
  <b>Tip!</b> If you want to improve the load performance of your pages, but don't know where
  to start, try the <b>Audits</b> panel. You give it a URL, and it gives you a detailed report
  on many different ways you can improve that page. <a href="/web/tools/lighthouse/#devtools">Get
  started</a>.
</aside>

### その他の更新{: #audits-other }

* [New, manual accessibility audits](/web/updates/2018/01/lighthouse#a11y)
* [Updates to the WebP audit][webp]は他の次世代画像フォーマットをより包括的にする
* [A rehaul of the accessibility score][a11yscore]
*アクセシビリティ監査がページに適用されない場合、その監査はアクセシビリティスコアにカウントされなくなります
*パフォーマンスはレポートの一番上のセクションになりました

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## ワーカーと非同期コードによる信頼性の高いコードステッピング{: #stepping }

Chrome 65は**ステップイン**へのアップデートをもたらします。スレッド間でメッセージを渡すコードにステップ[Step Into][into]{:.cdt-inl}際の[Step Into][into]{:.cdt-inl}ボタン、および非同期コード。以前のステップ動作をしたい場合は、新しい**ステップ**を使用することができます！代わりに[Step][step]{:.cdt-inl}ボタンを押します。

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### スレッド間でメッセージを渡すコードへのステップ{: #workers }

スレッド間でメッセージを渡すコードに入ると、DevToolsは各スレッドで何が起きたかを表示します。

たとえば、**図8 **のアプリは、メインスレッドとワーカースレッドの間にメッセージを渡します。メインスレッドで`postMessage()`呼び出しを実行すると、 `onmessage`はワーカースレッドの`onmessage`ハンドラで一時停止します。 `onmessage`ハンドラ自体は、メインスレッドにメッセージを戻します。 *その*への呼び出しは、DevToolsをメインスレッドに戻します。

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</figure>

以前のバージョンのChromeでこのようなコードを使用した場合、**図9 **に示すように、Chromeはコードのメインスレッド側のみを表示しました。

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</figure>

### 非同期コード{: #async }へのステップ{: #async }

非同期コードにステップインすると、DevToolsは最終的に実行される非同期コードで一時停止することを前提とします。

例えば、**図10に**に足を踏み入れる後`setTimeout()` 、デベロッパーツールは舞台裏で、その点に至るまでのすべてのコードを実行し、その後に渡された機能で一時停止します`setTimeout()` 。

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</figure>

Chrome 63でこのようなコードを実行したとき、DevToolsは**図11 **に示すように、時系列的にコードを一時停止しました。

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</figure>

## パフォーマンスパネル{: #recordings }での複数録音

**パフォーマンス**パネルで、最大5つの録音を一時的に保存できます。 DevToolsウィンドウを閉じると、録画が削除されます。 **パフォーマンス**パネルを快適に使用するには、 [Get Started with Analyzing Runtime Performance][runtime]を参照してください。

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>
  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</figure>

## ボーナス:Puppeteer 1.0 {: #puppeteer } DevToolsアクションを自動化

Note:このセクションはChrome 65とは関係ありません。

Chrome DevToolsチームが管理するブラウザ自動化ツールPuppeteerのバージョン1.0がリリースされました。 Puppeteerを使用すると、以前はDevToolsでしか利用できなかった、スクリーンショットのキャプチャなど、多くのタスクを自動化できます。

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

また、PDFの生成など、一般的に有用な自動化タスク用のAPIも備えています。

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

詳細は、 [Quick Start][quickstart]を参照してください。

[quickstart]: /web/tools/puppeteer/get-started

また、DevToolsを明示的に開いていなくても、Puppeteerを使用してブラウズ中にDevToolsの機能を公開することもできます。例については[Using DevTools Features Without Opening DevTools][without]を参照してください。

[without]: /web/updates/2018/01/devtools-without-devtools

## DevToolsチームからの要請:Canary {: #canary }検討する

MacまたはWindowsの場合は、 [Chrome Canary][canary]をデフォルトの開発ブラウザとして使用することを検討してください。 Canaryに残っている間に好きではないバグや変更を報告した場合、DevToolsチームはフィードバックを大幅に早く解決できます。

Note: CanaryはChromeの最先端バージョンです。テストなしでビルドされるとすぐにリリースされます。これは、Canaryが時々、約1ヶ月に1回壊れてしまうことを意味し、通常は1日以内に修正されます。 Canaryが壊れたときにChrome Stableを使用することに戻ることができます。

[canary]: https://www.google.com/chrome/browser/canary.html

## フィードバック{: #feedback }

あなたがここに見られる機能や変化を議論する最も良い場所は、 [google-chrome-developer-tools@googlegroups.com mailing list][ML]です。あなたが短時間であれば、 [@ChromeDevTools](https://twitter.com/chromedevtools)ツイートすることもできます。 DevToolsでバグが発生したと確信できる場合は、WORDS1をご[open an issue](https://crbug.com/new)ください。

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## 以前のリリースノート{: #links }

以前のすべてのDevToolsリリースノートへのリンクについては、 [devtools-whatsnew][tag]タグを参照してください。

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
