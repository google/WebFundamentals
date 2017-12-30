project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:ARIA 和非原生 HTML 語義簡介


{# wf_updated_on:2016-10-04 #}
{# wf_published_on:2016-10-04 #}

# ARIA 簡介 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}



迄今爲止，我們一直在鼓勵使用原生 HTML 元素，因爲它們可爲您提供焦點、鍵盤支持和內置語義，但有時簡單佈局和原生 HTML 達不到目的。例如，彈出式菜單這個很常見的 UI 構件目前尚無相應的標準化 HTML 元素。
也沒有提供“用戶需要儘快瞭解與此有關的信息”之類語義特性的 HTML 元素。



因此，在本節課中，我們將探究如何表達 HTML 無法自行表達的語義。


[無障礙網絡倡議的無障礙豐富互聯網應用規範](https://www.w3.org/TR/wai-aria/){: .external }（WAI-ARIA，簡稱 ARIA）適用於跨越某些領域的障礙，這些領域存在的無障礙問題無法通過原生 HTML 進行管理。它通過允許您指定某些屬性來發揮作用，這些屬性可以修改元素轉換成無障礙樹的方式。
下面我們來看一個示例。


在以下代碼段中，我們使用列表項作爲一種自定義複選框。CSS "checkbox" 類爲元素提供了所需的視覺特性。



    <li tabindex="0" class="checkbox" checked>
      Receive promotional offers
    </li>
    

儘管這適合視力正常的用戶，屏幕閱讀器卻不會給予任何指示來說明該元素旨在作爲複選框使用，因此弱視用戶可能會完全錯過該元素。



如果使用 ARIA 屬性，我們就可以爲元素提供缺少的信息，以便屏幕閱讀器能正確解讀它。
我們在以上代碼中添加了 `role` 和 `aria-checked` 屬性，將該元素顯式標識爲一個複選框，並指定它在默認情況下處於選中狀態。該列表項現在將添加到無障礙樹中，屏幕閱讀器將把它正確地報告爲一個複選框。



    <li tabindex="0" class="checkbox" role="checkbox" checked aria-checked="true">
      Receive promotional offers
    </li>
    

Note: 我們將[稍後](#what-can-aria-do)介紹 ARIA 屬性列表以及它們的使用時機。

ARIA 通過更改和補充標準 DOM 無障礙樹來發揮作用。

![標準 DOM 無障礙樹](imgs/acctree1.jpg){: .attempt-right }

![ARIA 補充後的無障礙樹](imgs/acctree2.jpg){: .attempt-right }

儘管 ARIA 允許我們爲任何頁面元素對無障礙樹進行細微（乃至徹底的）修改，但那卻是其唯一更改之處。**ARIA 不會補充元素的任何固有行爲**；它不會使元素可獲焦點，也不會爲其提供鍵盤事件偵聽器。那仍舊是我們開發任務的組成部分。


必須要了解的是，不需要重新定義默認語義。
無論如何使用，標準 HTML `<input type="checkbox">` 元素都不需要額外的 `role="checkbox"` ARIA 屬性就能正確聲明。



同樣值得注意的是，某些 HTML 元素上可以使用的 ARIA 角色和屬性會受到限制。
例如，不得對標準 `<input type="text">` 元素應用任何額外角色/屬性。


>請參閱 [ARIA in HTML 規範](https://www.w3.org/TR/html-aria/#sec-strong-native-semantics){: .external }，瞭解詳細信息。


讓我們看一看 ARIA 還能提供哪些其他功能。

## ARIA 可以做什麼？

正如您在複選框示例中所見，ARIA 可以修改現有元素語義，也可以向不存在原生語義的元素添加語義。
它還可以表達 HTML 中根本不存在的語義模式，例如菜單或標籤面板。

ARIA 允許我們創建的小部件型元素通常無法通過普通 HTML 實現。


 - 例如，ARIA 可以添加只向輔助技術 API 公開的附加標籤和說明文本。<br>


<div class="clearfix"></div>
      
    <button aria-label="screen reader only label"></button>


 - ARIA 表達的元素間語義關係能夠擴展標準父項/子項聯繫，例如控制特定區域的自定義滾動條。



<div class="clearfix"></div>

    <div role="scrollbar" aria-controls="main"></div>
    <div id="main">
    . . .
    </div>

    

 - 並且 ARIA 可以使頁面的某些部分具有“實時性”，讓它們在發生變化時立即通知輔助技術。


<div class="clearfix"></div>

    <div aria-live="true">
      <span>GOOG: $400</span>
    </div>

    
ARIA 系統的其中一個核心層面是其*角色*集。在無障礙術語中，角色是指特定 UI 模式的簡略指示器。我們可以通過任意 HTML 元素上的 `role` 屬性使用 ARIA 提供的模式詞彙表。


我們在上例中應用 `role="checkbox"` 時，是指示輔助技術，元素應遵循 "checkbox" 模式。
也就是說，我們可以保證它具有選中狀態（選中或未選中），並且這一狀態可使用鼠標或空格鍵進行切換，就像切換標準 HTML 複選框元素那樣。




事實上，由於鍵盤交互在屏幕閱讀器使用中的作用極其重要，因此必須確保在創建自定義小部件時，始終在同一位置應用 `role` 屬性和 `tabindex` 屬性；這可以確保鍵盤事件發生在正確的位置，並且當某個元素獲得焦點時，其角色能得到準確傳遞。





[ARIA 規範](https://www.w3.org/TR/wai-aria/){: .external } 分類介紹了 `role` 屬性以及可與這些角色聯用的關聯 ARIA 屬性的可接受值。這是最佳的權威信息來源，其中包含 ARIA 角色和屬性如何協作，以及如何以瀏覽器和輔助技術支持的方式使用它們。




![所有可用 ARIA 角色的列表](imgs/aria-roles.jpg)

不過，該規範非常深奧；一個更爲淺顯的入門讀物是 [ARIA 製作實踐文檔](https://www.w3.org/TR/wai-aria-practices-1.1/){: .external }，該文檔探究了使用可用 ARIA 角色和屬性的最佳做法。




ARIA 還提供了可對 HTML5 中提供的選項進行擴展的地標角色。請參閱[地標角色設計模式](https://www.w3.org/TR/wai-aria-practices-1.1#kbd_layout_landmark_XHTML){: .external }規範，瞭解詳細信息。






{# wf_devsite_translation #}
