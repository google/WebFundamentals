---
title: "選擇最佳輸入類型"
description: "使用正確的輸入類型，簡化資訊輸入。 使用者會喜歡自動呈現數字按鍵，以供輸入電話號碼的網站，或是在輸入號碼時自動移至下個欄位。 在您的表單中尋找剔除多餘點選動作的機會。"
updated_on: 2014-10-21
key-takeaways:
  choose-best-input-type:
    - 為您的資料選擇最合適的輸入類型，以簡化輸入。
    - 當使用者以 <code>datalist</code> 元素輸入時，提供建議。
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
  使用正確的輸入類型，簡化資訊輸入。 使用者會喜歡自動呈現數字按鍵，以供輸入電話號碼的網站，或是在輸入號碼時自動移至下個欄位。 在您的表單中尋找剔除多餘點選動作的機會。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.choose-best-input-type %}

### HTML5 輸入類型

HTML5 導入了數種新輸入類型。 這些新的輸入類型可以提示瀏覽器，
有關應為螢幕小鍵盤，
顯示哪種類型的鍵盤。  無需變更鍵盤，
並只看到該輸入類型所需的適當按鍵時，
使用者能更輕鬆地輸入所需的資訊。

<table class="mdl-data-table mdl-js-data-table">
  <thead>
    <tr>
      <th data-th="Input type">輸入 <code>type</code></th>
      <th data-th="Typical keyboard">一般鍵盤</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> 用於輸入 URL。 它必須先以一個有效的 URI 配置開始，
例如 <code>http://</code>, <code>ftp://</code> 或 <code>mailto:</code>。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>用於輸入電話號碼。 它<b>不會</b>
        強制特定語法供驗證，
所以您若要確定特定格式，可以使用模式。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>用於輸入電子郵件地址，
並提示 @ 應該按預設在鍵盤上顯示。 如果將要提供多個電子郵件地址，
您可以新增多個屬性。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>文字輸入欄位，
其樣式和平臺的搜尋欄位一致。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>用於數字輸入，
可以是任何合理的整數或浮點值。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>用於數字輸入，但與數字輸入類型不同，
此值較不重要。 它是以滑桿控制的形式顯示給使用者。

      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>用於輸入一個日期和時間值，
而提供的時區為當地時區。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>用於輸入日期 (僅限)，
不提供時區。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>用於輸入時間 (僅限)，
不提供時區。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>用於輸入週 (僅限)，
不提供時區。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>用於輸入月份 (僅限)，
不提供時區。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>用於選擇一種顏色。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

### 以 datalist 輸入時提供建議

`datalist` 元素不是一種輸入類型，
而是關聯表單欄位的建議輸入值之清單。 它可以在使用者輸入時，
讓瀏覽器顯示自動完成選項。 使用者在選取元素時必須掃描一長串清單尋找值，
並限制只能使用清單上的項目，與其不同的是，
`datalist` 元素會在使用者輸入時提供提示。

{% include_code src=_code/order.html snippet=datalist %}

{% include shared/remember.liquid title="Remember" list=page.notes.use-datalist %}


