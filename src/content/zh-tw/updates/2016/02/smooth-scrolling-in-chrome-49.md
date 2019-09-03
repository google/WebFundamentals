project_path: "/web/_project.yaml"
book_path: "/web/updates/_book.yaml"
description: 厭倦了抖動滾動？太棒了，因為Chrome 49開箱即用了新的平滑捲軸！

{# wf_updated_on: 2019-09-03 #} {# wf_published_on: 2016-02-01 #} {# wf_tags: scroll,chrome49 #} {# wf_blink_components: Blink>Scroll #} {# wf_featured_image: /web/updates/images/2016/02/smooth-scrolling-in-chrome-49/smooth-scroll.png #}

# Chrome瀏覽器中的平滑滾動49 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

如果人們真的想要滾動一件事，那就是它是順暢的。從歷史上看，Chrome在某些地方進行了平滑滾動，例如 - 當用戶使用其觸控板滾動或在移動設備上投放頁面時。但是如果用戶插入了鼠標，那麼他們就會得到一種更加緊張的“階梯式”滾動行為，這在美學上並不那麼令人愉悅。這一切都將在Chrome 49中發生變化。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="QtpEpXYEbao" data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

對於許多開發人員來說，步進本機，輸入驅動滾動行為的解決方案一直是使用庫，其目標是將其重新映射到更平滑，更好的眼睛。用戶也可以通過擴展來執行此操作。但是，改變滾動的庫和擴展都有缺點：

- **一種神秘的山谷風情。**這表現在兩個方面：首先，一個站點可能具有平滑的滾動行為，但另一個站點可能沒有，因此用戶最終會因不一致而感到迷失方向。其次，圖書館的平滑物理不一定與平台的那些相匹配。因此，儘管動作可能是平滑的，但它可能會感覺錯誤或不可思議。
- **主線爭用和jank的傾向增加。**與添加到頁面的任何JavaScript一樣，CPU負載會增加。這不一定是災難，取決於頁面正在做什麼，但如果在主線程上有一些長時間運行的工作，並且滾動已經耦合到主線程，則最終結果可能是卡住滾動和抖動。
- **為開發人員提供更多維護，為用戶下載更多代碼。**擁有一個平滑滾動的庫將是必須保持最新和維護的東西，它將增加網站的整體頁面權重。

這些缺點通常也適用於處理滾動行為的許多庫，無論是視差效果還是其他滾動耦合動畫。它們經常觸發jank，妨礙可訪問性，並且通常會破壞用戶體驗。滾動是網絡的核心交互，應該非常謹慎地使用圖書館進行更改。

在Chrome 49中，默認滾動行為將改變Windows，Linux和Chrome操作系統。舊的，逐步滾動的行為將消失，默認情況下滾動將是平滑的！不需要對代碼進行任何更改，除非您使用它們，否則可能會刪除任何平滑的滾動庫。

## 更滾動的好東西

還有其他與捲軸相關的好東西也值得一提。我們很多人想滾動耦合效應，像parallaxing，平滑滾動的文檔片段（如example.com/ **#somesection）。**正如我之前提到的，今天使用的方法通常對開發人員和用戶都是有害的。有兩種平台標準可以幫助：Compositor Worklet和`scroll-behavior` CSS屬性。

### 胡迪尼

Compositor Worklets是[Houdini的](https://wiki.css-houdini.org/)一部分，尚未完全規範和實施。也就是說， [當補丁登陸時](http://crbug.com/436952) ，它們將允許您編寫作為合成器管道的一部分運行的JavaScript，這通常意味著像parallaxing這樣的滾動耦合效果將與當前滾動位置保持完美同步。考慮到今天處理滾動的方式，滾動事件僅定期發送到主線程（並且可以被其他主線程工作阻止），這將代表一個巨大的飛躍。如果您對Compositor Worklets或Houdini帶來的任何其他令人興奮的新功能感興趣，請查看[Surma](https://dassur.ma/things/houdini-intro/)的[Houdini](https://drafts.css-houdini.org/) [簡介](https://dassur.ma/things/houdini-intro/) ， [Houdini規範](https://drafts.css-houdini.org/) ，並將您的想法貢獻給[Houdini郵件列表](https://lists.w3.org/Archives/Public/public-houdini/) ！

### 滾動行為

當涉及基於片段的滾動時， [`scroll-behavior` CSS屬性](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior)是可以幫助的其他東西。如果您想嘗試一下，您會很高興知道它已經在Firefox中提供，您可以使用**“啟用實驗性Web平台功能”**標記在Chrome Canary中啟用它。如果你設置 - 比如說 - `<body>`元素`scroll-behavior: smooth` ，所有由片段更改或`window.scrollTo`觸發的滾動都將動畫生動！這比使用和維護試圖做同樣事情的庫中的代碼更好。有了像滾動一樣基本的東西，避免打破用戶期望是非常重要的，所以當這些功能不斷變化時，仍然值得採用漸進增強方法，並刪除任何試圖填充這些行為的庫。

## 出去滾動

從Chrome 49開始，滾動越來越順暢。但這還不是全部：通過Houdini和CSS屬性（如`smooth-scroll`可能會有更多潛在的改進。嘗試使用Chrome 49，讓我們知道您的想法，最重要的是， **讓瀏覽器盡可能地滾動！**
