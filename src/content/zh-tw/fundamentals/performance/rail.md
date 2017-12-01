project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:RAIL 是一種以用戶爲中心的性能模型。每個網絡應用均具有與其生命週期有關的四個不同方面，且這些方面以非常不同的方式影響着性能：響應 (Response)、動畫 (Animation)、空閒 (Idle) 和加載 (Load)。

{# wf_updated_on:2015-06-07 #}
{# wf_published_on:2015-06-07 #}

# 使用 RAIL 模型評估性能 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

RAIL 是一種以用戶爲中心的性能模型。每個網絡應用均具有與其生命週期有關的四個不同方面，且這些方面以不同的方式影響着性能：

![RAIL 性能模型](images/rail.png)


### TL;DR {: .hide-from-toc }

- 以用戶爲中心；最終目標不是讓您的網站在任何特定設備上都能運行很快，而是使用戶滿意。
- 立即響應用戶；在 100 毫秒以內確認用戶輸入。
- 設置動畫或滾動時，在 10 毫秒以內生成幀。
- 最大程度增加主線程的空閒時間。
- 持續吸引用戶；在 1000 毫秒以內呈現交互內容。


## 以用戶爲中心

讓用戶成爲您的性能工作的中心。用戶花在網站上的大多數時間不是等待加載，而是在使用時等待響應。瞭解用戶如何評價性能延遲：




<table class="responsive">
  <thead>
      <th colspan="2">延遲與用戶反應</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 - 16 毫秒</td>
      <td data-th="User Reaction">人們特別擅長跟蹤運動，如果動畫不流暢，他們就會對運動心生反感。
用戶可以感知每秒渲染 60 幀的平滑動畫轉場。也就是每幀 16 毫秒（包括瀏覽器將新幀繪製到屏幕上所需的時間），留給應用大約 10 毫秒的時間來生成一幀。


    </tr>
    <tr>
      <td data-th="Delay">0 - 100 毫秒</td>
      <td data-th="User Reaction">在此時間窗口內響應用戶操作，他們會覺得可以立即獲得結果。時間再長，操作與反應之間的連接就會中斷。</td>
    </tr>
    <tr>
      <td data-th="Delay">100 - 300 毫秒</td>
      <td data-th="User Reaction">用戶會遇到輕微可覺察的延遲。</td>
    </tr>
    <tr>
      <td data-th="Delay">300 - 1000 毫秒</td>
      <td data-th="User Reaction">在此窗口內，延遲感覺像是任務自然和持續發展的一部分。對於網絡上的大多數用戶，加載頁面或更改視圖代表着一個任務。</td>
    </tr>
    <tr>
      <td data-th="Delay">1000+ 毫秒</td>
      <td data-th="User Reaction">超過 1 秒，用戶的注意力將離開他們正在執行的任務。</td>
    </tr>
    <tr>
      <td data-th="Delay">10,000+ 毫秒</td>
      <td data-th="User Reaction">用戶感到失望，可能會放棄任務；之後他們或許不會再回來。</td>
    </tr>
  </tbody>
</table>

## 響應：在 100 毫秒以內響應

在用戶注意到滯後之前您有 100 毫秒的時間可以響應用戶輸入。這適用於大多數輸入，不管他們是在點擊按鈕、切換表單控件還是啓動動畫。但不適用於觸摸拖動或滾動。


如果您未響應，操作與反應之間的連接就會中斷。用戶會注意到。

儘管很明顯應立即響應用戶的操作，但這並不總是正確的做法。使用此 100 毫秒窗口執行其他開銷大的工作，但需要謹慎，以免妨礙用戶。如果可能，請在後臺執行工作。




對於需要超過 500 毫秒才能完成的操作，請始終提供反饋。

## 動畫：在 10 毫秒內生成一幀

動畫不只是奇特的 UI 效果。例如，滾動和觸摸拖動就是動畫類型。


如果動畫幀率發生變化，您的用戶確實會注意到。您的目標就是每秒生成 60 幀，每一幀必須完成以下所有步驟：


![幀渲染步驟](images/render-frame.png)

從純粹的數學角度而言，每幀的預算約爲 16 毫秒（1000 毫秒 / 60 幀 = 16.66 毫秒/幀）。
但因爲瀏覽器需要花費時間將新幀繪製到屏幕上，**只有 10 毫秒來執行代碼**。

 

在像動畫一樣的高壓點中，關鍵是不論能不能做，什麼都不要做，做最少的工作。
如果可能，請利用 100 毫秒響應預先計算開銷大的工作，這樣您就可以儘可能增加實現 60fps 的可能性。



如需瞭解詳細信息，請參閱[渲染性能](/web/fundamentals/performance/rendering/)。


## 空閒：最大程度增加空閒時間

利用空閒時間完成推遲的工作。例如，儘可能減少預加載數據，以便您的應用快速加載，並利用空閒時間加載剩餘數據。

推遲的工作應分成每個耗時約 50 毫秒的多個塊。如果用戶開始交互，優先級最高的事項是響應用戶。 

要實現小於 100 毫秒的響應，應用必須在每 50 毫秒內將控制返回給主線程，這樣應用就可以執行其像素管道、對用戶輸入作出反應，等等。



以 50 毫秒塊工作既可以完成任務，又能確保即時的響應。

## 加載：在 1000 毫秒以內呈現內容

在 1 秒鐘內加載您的網站。否則，用戶的注意力會分散，他們處理任務的感覺會中斷。


側重於[優化關鍵渲染路徑](/web/fundamentals/performance/critical-rendering-path/)以取消阻止渲染。



您無需在 1 秒內加載所有內容以產生完整加載的感覺。啓用漸進式渲染和在後臺執行一些工作。將非必需的加載推遲到空閒時間段（請參閱此[網站性能優化 Udacity 課程](https://www.udacity.com/course/website-performance-optimization--ud884)，瞭解更多信息）。

## 關鍵 RAIL 指標彙總

要根據 RAIL 指標評估您的網站，請使用 Chrome DevTools [Timeline 工具](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool)記錄用戶操作。然後根據這些關鍵 RAIL 指標檢查 Timeline 中的記錄時間。

<table>
  <thead>
      <th>RAIL 步驟</th>
      <th>關鍵指標</th>
      <th>用戶操作</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>響應</strong></td>
      <td data-th="Key Metric">輸入延遲時間（從點按到繪製）小於 100 毫秒。</td>
      <td data-th="User Test">用戶點按按鈕（例如打開導航）。</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>動畫</strong></td>
      <td data-th="Key Metric">每個幀的工作（從 JS 到繪製）完成時間小於 16 毫秒。</td>
      <td data-th="User Test">用戶滾動頁面，拖動手指（例如，打開菜單）或看到動畫。
拖動時，應用的響應與手指位置有關（例如，拉動刷新、滑動輪播）。

此指標僅適用於拖動的持續階段，不適用於開始階段。</td>


    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>空閒</strong></td>
      <td data-th="Key Metric">主線程 JS 工作分成不大於 50 毫秒的塊。</td>
      <td data-th="User Test">用戶沒有與頁面交互，但主線程應足夠用於處理下一個用戶輸入。</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>加載</strong></td>
      <td data-th="Key Metric">頁面可以在 1000 毫秒內就緒。</td>
      <td data-th="User Test">用戶加載頁面並看到關鍵路徑內容。</td>
    </tr>
  </tbody>
</table> 




{# wf_devsite_translation #}
