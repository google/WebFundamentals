---
title: "以 requestAutocomplete API 簡化結帳"
description: "雖然 <code>requestAutocomplete</code> 原始設計是為了協助使用者填寫任何表單，但時下最常見的用途是在電子商務中，當行動網路上 <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'> 放棄購物車商品率可高達 97% 之際</a>。"
updated_on: 2014-10-21
key-takeaways:
  use-request-auto-complete:
    - <code>requestAutocomplete</code> 可大大簡化結帳過程，並改善使用者體驗。
    - 如果 <code>requestAutocomplete</code> 可供使用，請隱藏結帳表單，並將人們直接移往確認頁。
    - 確保輸入欄位包含適當的自動完成的屬性。
notes:
  use-placeholders:
    - 一旦焦點放在元素中時，預留位置就會消失，因此預留位置不可取代標籤。  預留位置應該當做輔助工具，協助指導使用者使用所需的格式和內容。
  recommend-input:
    - 當表單方法為 post 時，自動完成才有效。
  use-datalist:
    - <code>datalist</code> 值是以建議項目的方式提供，而使用者並不侷限於所提供的建議。
  provide-real-time-validation:
    - 即使以用戶端輸入驗證，需記得一件非常重要的事，請驗證伺服器上的資料，以確保您資料的一致性和安全性。
  show-all-errors:
    - 您應該向使用者一次性顯示表單上的所有問題，而非一次展示一個問題。
  request-auto-complete-flow:
    - 如果您要求任何種類的個人資訊或信用卡資料，確保是透過 SSL 提供頁面。  否則對話方塊中將警告使用者，他們的資訊可能不安全。
---
<p class="intro">
  雖然 <code>requestAutocomplete</code> 原始設計是為了協助使用者填寫任何表單，但時下最常見的用途是在電子商務中，當行動網路上 <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'> 放棄購物車商品率可高達 97% 之際</a>。 想像一下超市中有 97% 的人推著滿滿商品的購物車，突然就把車翻倒並走出門。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.use-request-auto-complete %}

網站不必依賴特定的付款服務提供者，
`requestAutocomplete` 會向瀏覽器要求付款詳細資料 (如姓名、地址和信用卡資訊)；
這些資訊很像其他自動完成欄位一樣，是由瀏覽器選擇性儲存。


{% ytvideo ljYeHwGgzQk %}

### `requestAutocomplete` 流程

最理想的體驗是顯示 `requestAutocomplete` 對話方塊，
而非載入顯示結帳表單的網頁。 如果一切順利，
使用者應該不會看到任何表單。  您可以輕鬆新增 `requestAutocomplete` 至現有表單，
而不必變更任何欄位名稱。  只需以適當的值，將 `autocomplete`
 屬性新增至每個表單元素，並在表單元素上加入 
`requestAutocomplete()` 函數。 瀏覽器將處理剩下的操作。


<img src="imgs/rac_flow.png" class="center" alt="請求自動完成流程">

{% include_code src=_code/rac.html snippet=rac lang=javascript %}

`form` 元素上的 `requestAutocomplete` 函數向瀏覽器指示，
它應填入表單。  作為安全目的，
函數必須透過輕觸或滑鼠按一下等使用者手勢來呼叫。 然後會顯示對話方塊，
向使用者要求填入欄位的權限，以及要以哪些詳細資料來填入欄位。


{% include_code src=_code/rac.html snippet=handlerac lang=javascript %}

在 `requestAutocomplete` 完成的同時，此函數將觸發 
`autocomplete` 事件 (如果它成功完成)，或 `autocompleteerror` (如果未能完成表單)。
  如果它成功完成，而表單也驗證您的需求，
只要提交表單並繼續到最終確認步驟即可。


{% include shared/remember.liquid title="Remember" list=page.notes.request-auto-complete-flow %}


