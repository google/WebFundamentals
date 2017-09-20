project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 手機上很難填寫表單。 最好的表單是輸入量最少的表單。

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-30 #}

# 建立令人驚艷的表單 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}



手機上很難填寫表單。 最好的表單是輸入量最少的表單。 好的表單應該提供語意式輸入類型。 按鍵應該可以變更以符合使用者的輸入類型；使用者可在日曆中選擇日期。 讓您的使用者瞭若指掌。 驗證工具應該在提交表單之前就告知使用者應該做什麼。

有關建立令人驚歎表單的這些指南總覽，請查看以下影片。

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>



## 設計高效率表單 




要設計高效率表單，請避免重複行為、只要求必要資訊，並向使用者展示其在多部分表單中的進度以引導使用者。


### TL;DR {: .hide-from-toc }
- 使用現有資料預先填入欄位，並確保啟用自動填寫。
- 使用標記清楚的進度列，以協助使用者完成多部分表單。
- 提供視覺化日曆，讓使用者無需離開您的網站，以跳至智慧手機上的日曆應用程式。


### 儘量減少重複行為和欄位

請確保您的表單沒有重複行為、
只加入必要的欄位數目，
並善用 [自動填寫](/web/fundamentals/input/form/#use_metadata_to_enable_auto-complete)，以便使用者可以利用預先填入資料，
輕鬆完成表單。

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分表單中顯示進度">
  <figcaption>
    在 Progressive.com 網站上，會先要求使用者提供 ZIP 郵遞區號，然後區號會預先填入到表單的下一部分。
  </figcaption>
</figure>

尋找機會預先填寫您已知或預期的資訊，
讓使用者省掉提供資訊的必要性。  例如，以使用者提供的上一次交貨地址，
預先填入交貨地址。


### 向使用者顯示已完成的進度

進度列和功能表應該透過多步驟表單和程序，
精確傳達整體進度。

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分表單中顯示進度">
  <figcaption>
    使用標記清楚的進度列，以協助使用者完成多部分表單。
  </figcaption>
</figure>

如果您將一個不成比例的複雜表單放在初期步驟，
使用者更有可能在完成整個程序之前，就放棄您的網站。 


### 在選擇日期時提供視覺化日曆

排程約會和旅行日期時，
使用者經常需要更多的前後文資訊。要簡化過程，
並避免使用者離開您的網站以查看其日曆應用程式，請提供一個帶有明確標籤的視覺化日曆，
以選擇開始和結束日期。 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="具有易用日曆的旅館網站">
  <figcaption>
    具有易用日曆小工具的旅館預約網站，方便選擇日期。
  </figcaption>
</figure>




## 選擇最佳輸入類型 



使用正確的輸入類型，簡化資訊輸入。 使用者會喜歡自動呈現數字按鍵，以供輸入電話號碼的網站，或是在輸入號碼時自動移至下個欄位。 在您的表單中尋找剔除多餘點選動作的機會。


### TL;DR {: .hide-from-toc }
- 為您的資料選擇最合適的輸入類型，以簡化輸入。
- 當使用者以 <code>datalist</code> 元素輸入時，提供建議。


#### HTML5 輸入類型

HTML5 導入了數種新輸入類型。 這些新的輸入類型可以提示瀏覽器，
有關應為螢幕小鍵盤，
顯示哪種類型的鍵盤。  無需變更鍵盤，
並只看到該輸入類型所需的適當按鍵時，
使用者能更輕鬆地輸入所需的資訊。

<table>
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

#### 以 datalist 輸入時提供建議

`datalist` 元素不是一種輸入類型，
而是關聯表單欄位的建議輸入值之清單。 它可以在使用者輸入時，
讓瀏覽器顯示自動完成選項。 使用者在選取元素時必須掃描一長串清單尋找值，
並限制只能使用清單上的項目，與其不同的是，
`datalist` 元素會在使用者輸入時提供提示。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

Note: <code>datalist</code> 值是以建議項目的方式提供，而使用者並不侷限於所提供的建議。



手機上很難填寫表單。 最好的表單是輸入量最少的表單。 好的表單應該提供語意式輸入類型。 按鍵應該可以變更以符合使用者的輸入類型；使用者可在日曆中選擇日期。 讓您的使用者瞭若指掌。 驗證工具應該在提交表單之前就告知使用者應該做什麼。



#### 標籤的重要性

`label` 元素為使用者提供方向，
告之它們表單元素中需要什麼資訊。  每個 `label` 與一個輸入元素關聯，
方法是將之放在 `label` 元素內，或使用「`for`」屬性。
  套用標籤至表單元素也有助於改善輕觸目標的大小：
使用者可以輕觸標籤或輸入，以將焦點放在輸入元素上。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

#### 標籤調整大小和放置

標籤和輸入應該要夠大，以易於按下。  在直向視區中，
欄位標籤應該放在輸入元素之上，
橫向時則放在旁邊。  確保欄位標籤和相應的輸入方塊要同時可見。
  要小心自動捲動處理常式，它可能會捲動輸入元素至網頁頂端，隱藏了標籤；
或是置於輸入元素下的標籤可能會被虛擬鍵盤蓋住。


#### 使用預留位置

預留位置屬性會對使用者提示輸入中可以預期的內容，通常會顯示值為淺色文字，
直到使用者在元素中開始打字。


<input type="text" placeholder="MM-YYYY">

    <input type="text" placeholder="MM-YYYY" ...>


一旦焦點放在元素中時，預留位置就會消失，因此預留位置不可取代標籤。  預留位置應該當做輔助工具，協助指導使用者使用所需的格式和內容。

#### 使用中繼資料來啟用自動完成

透過自動填寫如姓名、電子郵件地址和其他常用欄位等常見欄位，
使用者會喜歡網站幫他們節省時間；
再加上如此也可減少潛在的輸入錯誤 -- 尤其是在虛擬鍵盤與小型裝置上。


瀏覽器使用許多啟發法來判斷它們可以
(https://support.google.com/chrome/answer/142893){: .external}
[根據使用者先前指定的資料]
(https://support.google.com/chrome/answer/142893){: .external}[自動填入]哪些欄位 ，您可以提供提示給瀏覽器，
方法是在每一項輸入元素上提供 name 與 autocomplete 屬性。


例如要提示瀏覽器，它應該以使用者名稱、電子郵件地址和電話號碼自動完成表單時，
您應該使用：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

#### 建議輸入 `name` 和 `autocomplete` 屬性值


`autocomplete` 屬性值是目前 [WHATWG HTML 標準](https://html.spec.whatwg.org/multipage/forms.html#autofill){: .external}的一部分。 最常用的 `autocomplete` 屬性如下所示：

`autocomplete` 屬性可以伴隨區段名稱，如 **`shipping `**`given-name` 或 **`billing `**`street-address`。 瀏覽器將個別自動完成不同的區段，而非視為連續的表單。

<table>
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

當表單方法為 post 時，自動完成才有效。

#### `autofocus` 屬性

在某些表單上，例如 Google 首頁上，您要使用者做的唯一一件事就是填寫特定欄位，
此時您可以新增 `autofocus`
 屬性。  當設定時，桌面瀏覽器會立即將焦點移動到輸入欄位，
便於使用者快速開始使用該表單。  行動瀏覽器會忽略 
`autofocus` 屬性，以防止鍵盤隨機出現。


要小心使用自動焦點屬性，
因為它可能偷走鍵盤焦點，
並防止倒退鍵字元用於導覽。

    <input type="text" autofocus ...>


---
title: "提供即時驗證"
updated_on: 2014-10-21
key-takeaways:
  provide-real-time-validation:
    - 利用瀏覽器的內建驗證屬性，如<code>pattern</code>、<code>required</code>、<code>min</code>、<code>max</code>等。
    - 使用 JavaScript 和 Constraints Validation API 於更複雜的驗證要求上。
    - 以即時方式顯示驗證錯誤，而且如果使用者嘗試提交無效的表單，就顯示他們必須修正的所有欄位。
notes:
  use-placeholders:
    -一旦焦點放在元素中時，預留位置就會消失，因此預留位置不可取代標籤。  預留位置應該當做輔助工具，協助指導使用者使用所需的格式和內容。
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
  即時資料驗證不但能協助保持您的資料乾淨，還有助於改善使用者體驗。  最新瀏覽器具有幾個內建工具，可協助提供即時資料驗證，以防止使用者提交無效的表單。  應使用視覺提示，以表明一張表單是否已正確完成。
</p>

即使以用戶端輸入驗證，需記得一件非常重要的事，請驗證伺服器上的資料，以確保您資料的一致性和安全性。

#### 使用這些屬性來驗證輸入

##### `pattern` 屬性

`pattern` 屬性會指定
 [規則運算式](http://en.wikipedia.org/wiki/Regular_expression){: .external}，
以用來驗證輸入欄位。 例如，若要驗證美國郵遞區號
 (5 位數，有時候是再加一個短破折號與額外的 4 位數字)，我們會設定 `pattern` 如下：


    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>

###### 常見的規則運算式模式

<table>
  <thead>
    <tr>
      <th data-th="Description">描述</th>
      <th data-th="Regular expression">規則運算式</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">郵政地址</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">郵遞區號 (美國)</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP 位址 (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">IP 位址 (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">IP 位址 (兩種)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
    <tr>
      <td data-th="Description">信用卡號</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">社會安全號碼</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">北美電話號碼</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

##### `required` 屬性

如果 `required` 屬性存在，
則提交表單之前，欄位必須包含一個值。 例如，要讓郵遞區號成為必要條件，
我們只要新增必要的屬性：

    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>

##### `min`、`max`和`step`屬性

對於數字或範圍等數字輸入類型，
以及日期/時間輸入，您可以指定最小值和最大值，
以及被滑桿或微調按鈕調整時的增/減量。  例如，鞋子大小輸入會設定最小值為 1 ，
最大值為 13，級距為 0.5


    <input type="number" min="1" max="13" step="0.5" ...>

##### `maxlength` 屬性

`maxlength` 屬性可以用於指定輸入或文字方塊的最大長度，
而且當您想要限制使用者可以提供的資訊長度時，非常實用。
 例如，如果您想要限制檔案名稱為最多 12 個字元之內，
您可以使用以下。

    <input type="text" id="83filename" maxlength="12" ...>

##### `minlength` 屬性

`minlength` 屬性可以用於指定輸入或文字方塊的最小長度，
而且當您想要指定使用者必須提供的最小長度時，非常實用。
 例如，如果您想要指定檔案名稱為至少需要 8 個字元時，
您可以使用以下。

    <input type="text" id="83filename" minlength="8" ...>

##### `novalidate` 屬性

在某些情況下，您可能想在表單含有不正確輸入資料時，
允許使用者提交表單。 為此，將 `novalidate` 屬性新增到表單元素中，
或個別輸入欄位中。 在這種情況下，
所有虛擬類別與 JavaScript API 將仍然可讓您檢查表單是否通過驗證。

    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>

即使以用戶端輸入驗證，需記得一件非常重要的事，請驗證伺服器上的資料，以確保您資料的一致性和安全性。

#### 針對更複雜的即時驗證，請使用 JavaScript

當內建的驗證再加上規則運算式還不夠用的時候，
您可以用 [Constraints Validation API] (http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation){: .external}這項強大的工具，以處理自訂驗證。
  此 API 可讓您執行如設定自訂錯誤、
檢查元素是否有效，
並判斷元素無效的原因等動作：

<table>
  <thead>
    <tr>
      <th data-th="API">API</th>
      <th data-th="Description">描述</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">將自訂驗證訊息和 <code>ValidityState</code> 物件的 <code>customError</code> 屬性設定為 <code>true</code>。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">傳回一個字串與輸入未能通過驗證測試的原因。</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">如果元素滿足所有限制，則傳回 <code>true</code>，否則傳回 <code>false</code>。 決定當檢查傳回 <code>false</code> 時網頁如何回應的問題，將交由開發人員處理。</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">如果元素滿足所有限制，則傳回 <code>true</code>，否則傳回 <code>false</code>。 當網頁回應 <code>false</code> 時，限制問題會回報給使用者。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">傳回一個 <code>ValidityState</code> 物件，代表元素的有效狀態。</td>
    </tr>
  </tbody>
</table>

##### 設定自訂驗證訊息

如果一個欄位驗證失敗，請使用 `setCustomValidity()` ，以標記欄位為無效，
並解釋欄位為何無法通過驗證。  例如，註冊表單可能會要求使用者輸入兩次，
以確認電子郵件地址是否正確。  對第二個輸入使用模糊
事件，以驗證這兩個輸入，並設定適當的
回應。  例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

##### 避免無效表單的表單提交

因為並非所有瀏覽器都會在資料無效時，
避免使用者提交表單，您應該擷取提交事件，並對表單元素使用 `checkValidity()`
，以確定表單是否有效。  例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

#### 即時顯示回饋

針對每個欄位提供視覺指示，以在使用者提交表單之前指明使用者是否已正確完成表單，
將非常有幫助。
HTML5 還導入了數個虛擬類別，
可根據其值或屬性用在樣式輸入上。

<table>
  <thead>
    <tr>
      <th data-th="Pseudo-class">虛擬類別</th>
      <th data-th="Use">使用</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">當值滿足所有驗證要求時，明確設定要使用的輸入之樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">當值未滿足所有驗證要求時，明確設定要使用的輸入之樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">針對設定了必要屬性的輸入元素，明確設定樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">針對未設定必要屬性的輸入元素，明確設定樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">針對值在範圍內的數字輸入元素，明確設定樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">針對值不在範圍內的數字輸入元素，明確設定樣式。</td>
    </tr>
  </tbody>
</table>

驗證會立刻發生，這代表當網頁載入時，
即使使用者尚無機會填寫欄位，
欄位也可能被標記為無效。  這也代表，有可能當使用者打字時，
就會看到無效的樣式。 為了避免這種情況，您可以結合 CSS 與 JavaScript，
以在使用者造訪該欄位後，僅顯示無效樣式。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

您應該向使用者一次性顯示表單上的所有問題，而非一次展示一個問題。




## 以 requestAutocomplete API 簡化結帳 



雖然 <code>requestAutocomplete</code> 原始設計是為了協助使用者填寫任何表單，但時下最常見的用途是在電子商務中，當行動網路上 <a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'> 放棄購物車商品率可高達 97% 之際</a>。 想像一下超市中有 97% 的人推著滿滿商品的購物車，突然就把車翻倒並走出門。


### TL;DR {: .hide-from-toc }
- <code>requestAutocomplete</code> 可大大簡化結帳過程，並改善使用者體驗。
- 如果 <code>requestAutocomplete</code> 可供使用，請隱藏結帳表單，並將人們直接移往確認頁。
- 確保輸入欄位包含適當的自動完成的屬性。


網站不必依賴特定的付款服務提供者，
`requestAutocomplete` 會向瀏覽器要求付款詳細資料 (如姓名、地址和信用卡資訊)；
這些資訊很像其他自動完成欄位一樣，是由瀏覽器選擇性儲存。


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="ljYeHwGgzQk"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

#### `requestAutocomplete` 流程

最理想的體驗是顯示 `requestAutocomplete` 對話方塊，
而非載入顯示結帳表單的網頁。 如果一切順利，
使用者應該不會看到任何表單。  您可以輕鬆新增 `requestAutocomplete` 至現有表單，
而不必變更任何欄位名稱。  只需以適當的值，將 `autocomplete`
 屬性新增至每個表單元素，並在表單元素上加入 
`requestAutocomplete()` 函數。 瀏覽器將處理剩下的操作。


<img src="imgs/rac_flow.png" class="center" alt="請求自動完成流程">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/rac.html" region_tag="rac"   adjust_indentation="auto" %}
</pre>

`form` 元素上的 `requestAutocomplete` 函數向瀏覽器指示，
它應填入表單。  作為安全目的，
函數必須透過輕觸或滑鼠按一下等使用者手勢來呼叫。 然後會顯示對話方塊，
向使用者要求填入欄位的權限，以及要以哪些詳細資料來填入欄位。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/rac.html" region_tag="handlerac"   adjust_indentation="auto" %}
</pre>

在 `requestAutocomplete` 完成的同時，此函數將觸發 
`autocomplete` 事件 (如果它成功完成)，或 `autocompleteerror` (如果未能完成表單)。
  如果它成功完成，而表單也驗證您的需求，
只要提交表單並繼續到最終確認步驟即可。


Note: 如果您要求任何種類的個人資訊或信用卡資料，確保是透過 SSL 提供頁面。  否則對話方塊中將警告使用者，他們的資訊可能不安全。


