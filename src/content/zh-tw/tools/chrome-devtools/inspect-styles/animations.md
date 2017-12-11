project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools 動畫檢查器檢查和修改動畫。

{# wf_updated_on: 2016-05-02 #}
{# wf_published_on: 2016-05-02 #}

# 檢查動畫 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

使用 Chrome DevTools 動畫檢查器檢查和修改動畫。


![動畫檢查器](imgs/animation-inspector.png)


### TL;DR {: .hide-from-toc }
- 通過打開動畫檢查器捕捉動畫。檢查器會自動檢測動畫並將它們分類爲多個組。
- 通過慢速播放、重播或查看動畫源代碼來檢查動畫。
- 通過更改動畫時間、延遲、持續時間或關鍵幀偏移修改動畫。


## 概覽 {: #overview }

Chrome DevTools 動畫檢查器有兩個主要用途。 

* 檢查動畫。您希望慢速播放、重播或檢查動畫組的源代碼。
 
* 修改動畫。您希望修改動畫組的時間、延遲、持續時間或關鍵幀偏移。
當前不支持編輯貝塞爾曲線和關鍵幀。
 

動畫檢查器支持 CSS 動畫、CSS 過渡和網絡動畫。當前不支持 `requestAnimationFrame` 動畫。



### 什麼是動畫組？

動畫組是一組*看上去*彼此相關的動畫。
當前，網頁沒有真正概念的組動畫，動畫設計師和開發者必須編排和設置各個動畫的時間，讓它們看上去有一種連貫的視覺效果。動畫檢查器會根據開始時間（不包括延遲等等）預測哪些動畫相關並將它們並排分組。也就是說，全部在同一腳本塊中觸發的一組動畫被分爲一組，但如果是異步的，它們將單獨分組。

 

## 使用入門

可以通過兩種方式打開動畫檢查器：

* 轉到 **Styles** 窗格（位於 **Elements** 面板上），然後按 **Animations** 按鈕（![Animations 按鈕](imgs/animations-button.png){:.inline}）。
* 打開 Command Menu，鍵入 `Drawer: Show Animations`。 

動畫檢查器將在 Console 抽屜旁作爲標籤打開。由於檢查器是一個是抽屜式導航欄標籤，您可以從任何 DevTools 面板打開它。
 

![空的動畫檢查器](imgs/empty-ai.png)

動畫檢查器分爲四個主要部分（或窗格）。本指南使用以下名稱指代各個窗格：


1. **Controls**。從這裏，您可以清除所有當前捕捉的動畫組，或者更改當前選定動畫組的速度。
2. **Overview**。在這裏選擇動畫組，然後在 **Details** 窗格中進行檢查和修改。
3. **Timeline**。
從這裏暫停和開始動畫，或者跳到動畫中的特定點。
4. **Details**。
檢查和修改當前選定的動畫組。
 

![註解動畫檢查器](imgs/annotated-animation-inspector.png)

要捕捉動畫，只需在動畫檢查器打開時執行可以觸發動畫的交互。
如果動畫在頁面加載時觸發，您可以重新加載頁面，幫助動畫檢查器檢測動畫。

 

<video src="animations/capture-animations.mp4"
       autoplay loop muted controls></video>

## 檢查動畫 {: #inspect }

捕捉動畫後，可以通過以下幾種方式重播動畫：

* 在 **Overview** 窗格中將鼠標懸停在動畫的縮略圖上方，查看它的預覽。
* 從 **Overview** 窗格中選擇動畫組（這樣，動畫組就會顯示在 **Details** 窗格中），然後按 **replay** 按鈕（![replay 按鈕](imgs/replay-button.png){:.inline}）。動畫會在視口中重播。點擊 **animation speed** 按鈕（![animation speed 按鈕](imgs/animation-speed-buttons.png){:.inline}）更改當前選定動畫組的預覽速度。您可以使用紅色的垂直條更改當前位置。
* 點擊並拖動紅色的垂直條以拖拽視口動畫。 

### 查看動畫詳細信息

捕捉動畫組後，在 **Overview** 窗格點擊動畫組可以查看其詳細信息。
在 **Details** 窗格中，每個動畫會單獨成行。
 

![動畫組詳情](imgs/animation-group-details.png)

將鼠標懸停在動畫上可以在視口中突出顯示該動畫。點擊動畫，在 **Elements** 面板中將其選中。
 

![將鼠標懸停在動畫上，使其在視口中突出顯示](imgs/highlight-animation.png)


動畫最左側的深色部分是其定義。右側的淺色部分表示重複。
例如，在下方的屏幕截圖中，第二和第三部分表示第一部分的重複。
 

![動畫重複示意圖](imgs/animation-iterations.png)

如果兩個元素應用了同一個動畫，動畫檢查器會給它們分配相同的顏色。
顏色本身是隨機的且沒有意義。例如，在下方的屏幕截圖中，兩個元素 `div.eye.left::after` 和 `div.eye.right::after` 已應用了同一個動畫 (`eyes`)，`div.feet::before` 和 `div.feet::after` 元素也同樣如此。



 

![帶有彩色編碼的動畫](imgs/color-coded-animations.png)

## 修改動畫 {: #modify }

可以通過以下三種方式使用動畫檢查器修改動畫：

* 動畫持續時間。
* 關鍵幀時間。
* 開始時間延遲。

對於本部分，假設下面的屏幕截圖代表原始動畫：


![修改之前的原始動畫](imgs/modify-original.png)

要更改動畫的持續時間，請點擊並拖動第一個或最後一個圓圈。


![修改的持續時間](imgs/modify-duration.png)

如果動畫定義了任何關鍵幀規則，那麼這些將表示爲白色內圈。
點擊並拖動其中一個以更改關鍵幀的時間。


![修改的關鍵幀](imgs/modify-keyframe.png)

要爲動畫添加延遲，請點擊並將其拖動至圓圈以外的任何位置。
 

![修改的延遲](imgs/modify-delay.png)


{# wf_devsite_translation #}
