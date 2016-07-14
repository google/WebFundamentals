---
title: "正確標記和命名輸入"
description: "手機上很難填寫表單。 最好的表單是輸入量最少的表單。"
updated_on: 2015-03-27
key-takeaways:
  label-and-name:
    - 一律在表單輸入使用 <code>label</code>，並確定當欄位處於焦點狀態時，可看見標籤。
    - 使用 <code>placeholder</code>，為您所期望的事提供引導。
    - 要協助瀏覽器自動完成表單，針對元素使用已建立的 <code>name</code>，並納入 <code>autocomplete</code> 屬性。
notes:
  use-placeholders:
    - 一旦使用者在元素中開始輸入時，預留位置就會消失，因此預留位置不可取代標籤。  預留位置應該當做輔助工具，協助指導使用者使用所需的格式和內容。
  recommend-input:
    - 僅使用 <code>street-address</code> 或同時使用 <code>address-line1</code>  和 <code>address-line2</code>
    - <code>address-level1</code> 和 <code>address-level2</code> 只有在您的地址格式需要時，才會成為必填項。
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
  手機上很難填寫表單。 最好的表單是輸入量最少的表單。 好的表單應該提供語意式輸入類型。 按鍵應該可以變更以符合使用者的輸入類型；使用者可在日曆中選擇日期。 讓您的使用者瞭若指掌。 驗證工具應該在提交表單之前就告知使用者應該做什麼。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.label-and-name %}

### 標籤的重要性

`label` 元素為使用者提供方向，
告之它們表單元素中需要什麼資訊。  每個 `label` 與一個輸入元素關聯，
方法是將之放在 `label` 元素內，或使用「`for`」屬性。
  套用標籤至表單元素也有助於改善輕觸目標的大小：
使用者可以輕觸標籤或輸入，以將焦點放在輸入元素上。


{% include_code src=_code/order.html snippet=labels %}

### 標籤調整大小和放置

標籤和輸入應該要夠大，以易於按下。  在直向視區中，
欄位標籤應該放在輸入元素之上，
橫向時則放在旁邊。  確保欄位標籤和相應的輸入方塊要同時可見。
  要小心自動捲動處理常式，它可能會捲動輸入元素至網頁頂端，隱藏了標籤；
或是置於輸入元素下的標籤可能會被虛擬鍵盤蓋住。


### 使用預留位置

預留位置屬性會對使用者提示輸入中可以預期的內容，通常會顯示值為淺色文字，
直到使用者在元素中開始打字。


<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

### 使用中繼資料來啟用自動完成

透過自動填寫如姓名、電子郵件地址和其他常用欄位等常見欄位，
使用者會喜歡網站幫他們節省時間；
再加上如此也可減少潛在的輸入錯誤 -- 尤其是在虛擬鍵盤與小型裝置上。


瀏覽器使用許多啟發法來判斷它們可以
(https://support.google.com/chrome/answer/142893)
[根據使用者先前指定的資料]
(https://support.google.com/chrome/answer/142893)[自動填入]哪些欄位 ，您可以提供提示給瀏覽器，
方法是在每一項輸入元素上提供 name 與 autocomplete 屬性。


例如要提示瀏覽器，它應該以使用者名稱、電子郵件地址和電話號碼自動完成表單時，
您應該使用：

{% include_code src=_code/order.html snippet=autocomplete %}


### 建議輸入 `name` 和 `autocomplete` 屬性值


`autocomplete` 屬性值是目前 [WHATWG HTML 標準](https://html.spec.whatwg.org/multipage/forms.html#autofill)的一部分。 最常用的 `autocomplete` 屬性如下所示：

`autocomplete` 屬性可以伴隨區段名稱，如 **`shipping `**`given-name` 或 **`billing `**`street-address`。 瀏覽器將個別自動完成不同的區段，而非視為連續的表單。

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
      <th data-th="Content type">內容類型</th>
      <th data-th="name attribute"><code>name</code> 屬性</th>
      <th data-th="autocomplete attribute"><code>autocomplete</code> 屬性</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">名稱</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>fname</code>
        <code>mname</code>
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code> (完整姓名)</li>
          <li><code>given-name</code> (名字)</li>
          <li><code>additional-name</code> (中間名)</li>
          <li><code>family-name</code> (姓氏)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">電子郵件</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">地址</td>
      <td data-th="name attribute">
        <code>address</code>
        <code>city</code>
        <code>region</code>
        <code>province</code>
        <code>state</code>
        <code>zip</code>
        <code>zip2</code>
        <code>postal</code>
        <code>country</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li>針對單行地址輸入：
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>針對兩行地址輸入：
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code> (州或省)</li>
          <li><code>address-level2</code> (城市)</li>
          <li><code>postal-code</code> (郵遞區號)</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">電話</td>
      <td data-th="name attribute">
        <code>phone</code>
        <code>mobile</code>
        <code>country-code</code>
        <code>area-code</code>
        <code>exchange</code>
        <code>suffix</code>
        <code>ext</code>
      </td>
      <td data-th="autocomplete attribute"><code>tel</code></td>
    </tr>
    <tr>
      <td data-th="Content type">信用卡</td>
      <td data-th="name attribute">
        <code>ccname</code>
        <code>cardnumber</code>
        <code>cvc</code>
        <code>ccmonth</code>
        <code>ccyear</code>
        <code>exp-date</code>
        <code>card-type</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>cc-name</code></li>
          <li><code>cc-number</code></li>
          <li><code>cc-csc</code></li>
          <li><code>cc-exp-month</code></li>
          <li><code>cc-exp-year</code></li>
          <li><code>cc-exp</code></li>
          <li><code>cc-type</code></li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

{% include shared/remember.liquid title="Remember" list=page.remember.recommend-input %}

### `autofocus` 屬性

在某些表單上，例如 Google 首頁上，您要使用者做的唯一一件事就是填寫特定欄位，
此時您可以新增 `autofocus`
 屬性。  當設定時，桌面瀏覽器會立即將焦點移動到輸入欄位，
便於使用者快速開始使用該表單。  行動瀏覽器會忽略 
`autofocus` 屬性，以防止鍵盤隨機出現。


要小心使用自動焦點屬性，
因為它可能偷走鍵盤焦點，
並防止倒退鍵字元用於導覽。

{% highlight html %}
<input type="text" autofocus ...>
{% endhighlight %}


