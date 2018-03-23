project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 59 中添加到 DevTools 的新功能和變更。

{# wf_updated_on: 2017-04-19 #}
{# wf_published_on: 2017-04-12 #}
{# wf_tags: chrome59,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Chrome 59 中添加到 DevTools 的新功能和變更。 #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# DevTools 更新點 (Chrome 59) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

歡迎來到新一期的 DevTools 更新日誌。以下是 Chrome 59 中的新功能。

Note: 你可以訪問 `chrome://help` 來查看當前使用的 Chrome 版本。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="4mx1m7UbBR0" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## 亮點 {: #highlights }

- [**CSS 和 JS 代碼覆蓋率**](#coverage)。通過新增的覆蓋率面板來發現未使用的 CSS 與 JS。
- [**完整的页面截图**](#screenshots)。截取一张从视图最顶端到最底端的页面快照。
- [**禁用請求**](#block-requests)。在網絡面板中可以手動禁用某條請求。
- [**調試 async await**](#async)。連貫地調試 async await。
- [**統一的命令面板**](#command-menu)。將命令執行與文件打開的菜單面板進行了整合。

## 新功能 {: #new-features }

### CSS 和 JS 代碼覆蓋率 {: #coverage }

通過新增的**覆蓋率**面板來發現未使用的 CSS 與 JS 代碼。頁面或代碼加載後，此面板內會告訴你哪些代碼未使用，哪些又是使用了的。這樣可以精簡掉未使用的代碼來減小頁面的大小。

<figure>
  <img src="/web/updates/images/2017/04/coverage.png" alt="The Coverage tab">
  <figcaption><b>圖 1 </b>。代碼覆蓋率面板
  </figcaption>
</figure>

在URL上點擊將會在**源代碼面板**中顯示哪些代碼行被使用。

<figure>
  <img src="/web/updates/images/2017/04/coverage-breakdown.png" alt="A breakdown of code coverage in the Sources panel">
  <figcaption><b>圖 2</b>. <b>源代碼面板</b>中代碼覆蓋率的分析
  </figcaption>
</figure>

每行代碼都是有顏色的：

- 青色代表那代碼已使用。
- 紅色代表那代碼未使用。
- A line of code that is both red and green, such as line 3 in **Figure 2**,means that only some code on that line executed. For example, a ternaryexpression like `var b = (a > 0) ? a : 0` is colored both red and green.

Note: 這代碼的顏色可能將在未來的Chrome更新做出改變。

要打開**覆蓋率面板**：

1. 呼出[命令面板](/web/tools/chrome-devtools/ui#command-menu)。
2. 輸入 `Coverage` 然後選擇 **Show Coverage**。

### 完整的頁面截圖 {: #screenshots }

觀看以下視頻來了解如何截取頁面的完整快照，從頂部一直滾動到頁面最底那種截圖。

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="r_6_9eFPhxI" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

### 禁用請求 {: #block-requests }

想看看當某些腳本、樣式文件缺少或者其他資源加載失敗時，網頁的樣子嗎？在**網絡面闆**對某條請求右擊選擇 **Block Request URL**。一個新的 **禁用請求** 面板會被呼出，在這裡可以管理被禁用的請求。

<figure>
  <img src="/web/updates/images/2017/04/block-request-url.png" alt="Block Request URL">
  <figcaption><b>圖 3</b>。禁用請求
  </figcaption>
</figure>

### 調試 async await {: #async }

一直以來，想要調試類似下面這樣的代碼是件很頭疼的事。當你斷在 `test()` 裡面時，繼續調試，會被 `setInterval()` 而打斷。在新版中再來調試 `test()` 就不一樣了，可以一口氣從第一行連續地斷到最後一行。

```
function wait(ms) {
  return new Promise(r => setTimeout(r, ms)).then(() => "Yay");
}

// 在後台做一些工作
setInterval(() => 42, 200);

async function test() {
  debugger;
  const hello = "world";
  const response = await fetch('index.html');
  const tmp = await wait(1000);
  console.log(tmp);
  return hello;
}

async function runTest() {
  let result = await test();
  console.log(result);
}
```

PS：想提高調試水平嗎？看看這些資源：

- [Get Started With Debugging JS](/web/tools/chrome-devtools/javascript/)
- [Pause Your Code With Breakpoints](/web/tools/chrome-devtools/javascript/breakpoints)
- [JS Debugging Reference](/web/tools/chrome-devtools/javascript/reference)

## 變更點 {: #changes }

### 統一的命令面板 {: #command-menu }

現在打開[命令面板 ](/web/tools/chrome-devtools/ui#command-menu)，你會發現輸入框中自動添加了一個大於號 (`>`)。這是因為命令面板與通過 <kbd>Command</kbd>+<kbd>O</kbd> (Mac) 或者 <kbd>Control</kbd>+<kbd>O</kbd>
(Windows, Linux) 呼出的**文件打開**菜單面板進行了合併。
