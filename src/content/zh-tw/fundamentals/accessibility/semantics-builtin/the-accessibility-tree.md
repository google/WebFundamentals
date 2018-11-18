project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:無障礙樹簡介


{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# 無障礙樹 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



試想您要構建一個*屏幕閱讀器用戶專用*的界面。在這種情況下，您根本不需要創建任何視覺 UI，只需提供足夠屏幕閱讀器使用的信息。



您將要創建的是一種說明頁面結構的 API，與 DOM API 類似，但好在信息和節點數量較少，因爲其中有許多信息只對視覺呈現有用。其結構可能與下圖類似。


![屏幕閱讀器 DOM API 模型](imgs/treestructure.jpg)

這基本上就是瀏覽器實際呈現給屏幕閱讀器的內容。瀏覽器獲取 DOM 樹，並將其修改成適用於輔助技術的形式。我們將這個修改後的樹稱爲*無障礙樹*。


您可以將無障礙樹想像成有點類似於 20 世紀 90 年代的舊式網頁：幾張圖片、大量鏈接，或許還有一個字段和一個按鈕。


![一個 20 世紀 90 年代風格的網頁](imgs/google1998.png)

目視向下瀏覽上例這樣的網頁得到的體驗與屏幕閱讀器用戶獲得的體驗類似。
界面就在那裏，但簡單而又直接，與無障礙樹界面很像。


無障礙樹就是大多數輔助技術的交互對象。交互流程與以下所述類似：


 1. 一個應用（瀏覽器或其他應用）通過某個 API 將其 UI 的一個語義版本向輔助技術公開。

 1. 輔助技術可以利用其通過 API 讀取的信息爲用戶創建一個替代性界面呈現。
例如，屏幕閱讀器可以創建一個能讓用戶聽到應用語音表示的界面。


 1. 輔助技術還可以允許用戶以不同方式與應用進行交互。
例如，大多數屏幕閱讀器都提供了鉤子，讓用戶能夠輕鬆地模擬鼠標點擊或手指點按。

 1. 輔助技術通過無障礙 API 將用戶意圖（例如“點擊”）傳送回應用。
應用隨即負責在原始 UI 上下文中對操作進行相應解讀。


對於網絡瀏覽器，在每個方向都要額外執行一個步驟，因爲瀏覽器實際上是在其內運行的網絡應用的平臺。
因此，瀏覽器需要將網絡應用轉換成無障礙樹，並且必須確保根據來自輔助技術的用戶操作在 JavaScript 中觸發相應事件。




但那全都是瀏覽器的責任。作爲網絡開發者，我們所要做的不過是明瞭這一進行中的情況，以及讓所開發的網頁能夠充分利用此過程來爲用戶打造無障礙體驗。



我們通過確保正確表達頁面語義，亦即確保頁面中的重要元素具有正確的無障礙角色、狀態和屬性並確保指定無障礙名稱和說明，來實現這一目的。然後，瀏覽器便可讓輔助技術獲取該信息以打造自定義體驗。


## 原生 HTML 中的語義

瀏覽器可以將 DOM 樹轉變成無障礙樹，因爲 DOM 的大部分內容具有*隱式*語義含義。
也就是說，DOM 採用的原生 HTML 元素能夠被瀏覽器識別，並且可以預測其在各類平臺上的工作方式。因此，鏈接或按鈕等原生 HTML 元素的無障礙功能可自動得到處理。
我們可以通過編寫表達頁面元素語義的 HTML 來充分利用這一內置無障礙功能。


但有時我們採用的元素雖然看上去像原生元素，實際卻並非如此。例如，以下這個“按鈕”就根本不是按鈕。


{% framebox height="60px" %}
<style>
    .fancy-btn {
        display: inline-block;
        background: #BEF400;
        border-radius: 8px;
        padding: 10px;
        font-weight: bold;
        user-select: none;
        cursor: pointer;
    }
</style>
<div class="fancy-btn">Give me tacos</div>
{% endframebox %}

可在 HTML 中通過許多方式構建該按鈕；以下所示爲其中一種方式。


    <div class="button-ish">Give me tacos</div>


當我們不使用實際按鈕元素時，屏幕閱讀器無從知曉其讀取的內容。
此外，我們還需要額外完成[添加 tabindex](/web/fundamentals/accessibility/focus/using-tabindex) 的工作，以便只使用鍵盤的用戶能夠使用它，因爲按照現有編碼，它只能使用鼠標操作。




使用普通 `button` 元素替代 `div` 便可輕鬆地解決這個問題。使用原生元素的另一個好處是，它能爲我們處理鍵盤交互。而且別忘了，並不是說您使用原生元素就得放棄漂亮的視覺效果；您可以通過爲原生元素設置樣式來讓它們具有您想要的外觀，同時仍保留隱式語義和行爲。




之前我們曾指出，屏幕閱讀器將述說元素的角色、名稱、狀態和值。
通過使用合適的語義元素，可以覆蓋角色、狀態和值，但我們還必須確保讓元素的名稱可檢測到。



一般來說，名稱分爲兩種類型：

 - *可見標籤*：所有用戶都使用它們將含義與元素關聯起來；

 - *文本替代項*：僅在不需要視覺標籤時使用。


對於文本級元素，我們什麼都不用做，因爲按照定義它們將包含一些文本內容。
不過，對於輸入或控件元素以及圖像之類的視覺內容，我們需要確保爲其指定名稱。
事實上，爲任何非文本內容提供文本替代項是 [WebAIM 檢查清單上的第一項](http://webaim.org/standards/wcag/checklist#g1.1)。



實現該目的的一種方法是遵循他們的建議“表單輸入有關聯的文本標籤”。
將標籤與表單元素（例如複選框）關聯有兩種方法。
無論採用哪一種方法，都會使標籤文本同時成爲複選框的點擊目標，這對鼠標或觸摸屏用戶同樣有幫助。要將標籤與元素關聯，請執行下列任一操作：

 - 將 input 元素置於 label 元素內

<div class="clearfix"></div>

    <label>
      <input type="checkbox">Receive promotional offers?</input>
    </label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <label style="font-size: 16px; color: #212121;">
        <input type="checkbox">Receive promotional offers?</input>
    </label>
</div>
{% endframebox %}


或

 - 使用 label 的 `for` 屬性並引用元素的 `id`

<div class="clearfix"></div>

    <input id="promo" type="checkbox"></input>
    <label for="promo">Receive promotional offers?</label>


{% framebox height="60px" %}
<div style="margin: 10px;">
    <input id="promo" type="checkbox"></input>
    <label for="promo">Receive promotional offers?</label>
</div>
{% endframebox %}


正確標示覆選框後，屏幕閱讀器便可報告元素角色爲 checkbox，處於 checked 狀態，名稱爲“Receive promotional offers?”。



![VoiceOver 產生的顯示覆選框朗讀標籤的屏幕文本輸出](imgs/promo-offers.png)

Success: 您實際上可以使用屏幕閱讀器，通過按 Tab 鍵在頁面上循環跳轉並驗證朗讀的角色、狀態和名稱來找到關聯不正確的標籤。






{# wf_devsite_translation #}
