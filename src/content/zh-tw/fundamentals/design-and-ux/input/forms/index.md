project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在移動設備上填寫表單很困難。輸入操作最少的表單就是最好的表單。

{# wf_updated_on:2014-10-21 #}
{# wf_published_on:2014-04-30 #}

# 創建出色的表單 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

在移動設備上填寫表單很困難。輸入操作最少的表單就是最好的表單。出色的表單提供有語義的輸入類型。按鍵應變爲與用戶的輸入類型匹配；用戶在日曆中選取日期。讓用戶瞭解最新信息。驗證工具應告訴用戶，在提交表單之前他們需要做什麼。


## 設計高效的表單


通過避免重複操作、只請求必要的信息來設計高效的表單，並通過向用戶顯示他們在多部分表單中的操作進度來指引用戶。


### TL;DR {: .hide-from-toc }
- 使用現有數據來預填充各字段，並且一定要啓用自動填充。
- 使用清楚標示的進度條來幫助用戶完成多部分的表單。
- 提供可視化日曆，讓用戶不必離開您的網站，並跳轉到其智能手機上的日曆應用。


### 最大程度減少重複的操作和字段

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分的表單中顯示進度">
  <figcaption>
    在 Progressive.com 網站上，首先要求用戶輸入郵編，然後郵編會被預填充到表單的下一部分。
</figcaption>
</figure>

確保表單沒有重複操作，只設置必要的字段數量，並利用[自動填充](/web/fundamentals/design-and-ux/input/forms/#use-metadata-to-enable-auto-complete)，使用戶能借助預填充的數據輕鬆填寫表單。




尋找機會預先填充您已知道或可以預判的信息，使用戶無需手動輸入。
例如，給收貨地址預先填充用戶上次提供的收貨地址。



<div style="clear:both;"></div>

### 向用戶顯示他們的操作進度

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="在多部分的表單中顯示進度">
  <figcaption>
    使用清楚標示的進度條來幫助用戶完成多部分的表單。
</figcaption>
</figure>

進度條和菜單應準確傳達多步驟表單和流程的總體進度。


如果在早期步驟中設置了異常複雜的表單，用戶更可能放棄您的網站，而不會完成整個流程。
 

<div style="clear:both;"></div>

### 在選擇日期時提供可視化日曆

<figure class="attempt-right">
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="帶易用日曆的酒店網站">
  <figcaption>
    酒店預訂網站，有易用的日曆小工具供選擇日期。
</figcaption>
</figure>

用戶在安排約會和旅行日期時往往需要更多上下文，如要使操作更容易，並防止他們離開您的網站去查看其日曆應用，就應提供一個可視化日曆，設置清楚的標籤以便選擇開始和結束日期。


 

<div style="clear:both;"></div>

## 選擇最佳輸入類型

使用正確的輸入類型來簡化信息輸入操作。用戶喜歡在輸入電話號碼時網站自動顯示數字鍵盤，或隨着輸入信息自動跳換字段。尋找機會消除表單中的多餘點擊。



### TL;DR {: .hide-from-toc }
- 選擇最適合數據的輸入類型，以簡化輸入操作。
- 通過  <code>datalist</code> 元素在用戶輸入時提供建議值。


### HTML5 輸入類型

HTML5 引入了大量新的輸入類型。這些新輸入類型可以提示瀏覽器，屏幕鍵盤應顯示什麼類型的鍵盤佈局。用戶無需切換鍵盤，就能更輕鬆地輸入所需信息，並且只看到該輸入類型的相應按鍵

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">輸入 <code>type</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> 用於輸入網址。其開頭必須是有效的 URI 架構，例如  <code>http://</code>、 <code>ftp://</code> 或  <code>mailto:</code>。</td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>用於輸入電話號碼。它<b>不</b>
        執行特定的驗證語法，因此，如果要確保特定的格式，可以使用模式屬性。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>用於輸入電子郵件地址，並提示鍵盤上應默認顯示 @。
如果需要用戶提供多個電子郵件地址，則可以添加 multiple 屬性。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>一個文本輸入字段，其樣式與平臺的搜索字段一致。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>用於數字輸入，可以是任意合理的整數或浮點值。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>用於數字輸入，但與 number 輸入類型不同，其值沒那麼重要。
它以滑塊控件的形式顯示給用戶。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>用於輸入日期和時間值，提供的時區爲本地時區。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>用於只輸入日期，不提供時區。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>用於只輸入時間，不提供時區。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>用於只輸入星期，不提供時區。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>用於只輸入月份，不提供時區。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>用於選取顏色。
</td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

注意：請謹記在選擇輸入類型時要牢記本地化，有些語言區域使用點 (.)，而不使用逗號 (,) 來作爲分隔符。


### 使用 datalist 在輸入時提供建議值

`datalist` 元素不是輸入類型，而是與一個表單字段關聯的建議輸入值的列表。
它允許瀏覽器在用戶輸入時建議自動填充選項。
`datalist` 元素與 select 元素不同，它無需用戶瀏覽長列表來找出所需的值，也不限制用戶只能選擇這些選項，此元素在用戶輸入時提供提示。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

注： <code>datalist</code> 值是提供的建議值，並不意味着用戶只能選擇所提供的建議值。

## 正確地爲輸入設置標籤和命名

在移動設備上填寫表單很困難。輸入操作最少的表單就是最好的表單。出色的表單提供有語義的輸入類型。按鍵應變爲與用戶的輸入類型匹配；用戶在日曆中選取日期。讓用戶瞭解最新信息。驗證工具應告訴用戶，在提交表單之前他們需要做什麼。


### TL;DR {: .hide-from-toc }
- 務必對錶單輸入使用  <code>label</code>，並確保字段處於焦點時標籤可見。
- 使用  <code>placeholder</code> 來提供有關預期輸入內容的指導。
- 爲幫助瀏覽器自動填充表單，爲各元素使用既定的  <code>name</code> 幷包括  <code>autocomplete</code> 屬性。


### 標籤的重要性

`label` 元素爲用戶提供指引，告訴他們表單元素中需要什麼信息。
將輸入元素放在 `label` 元素內，或通過使用“`for`”屬性，可使每個 `label` 與一個輸入元素關聯。爲表單元素設置標籤還能幫助增大觸摸目標的大小：用戶可以觸摸標籤或輸入框，以將焦點置於輸入元素中。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 標籤大小和放置

標籤和輸入框應足夠大，以便點擊。在縱向視口中，字段標籤應在輸入元素上方，在橫向視口中則在輸入元素旁邊。確保字段標籤和對應的輸入框同時可見。要注意自定義的滾動處理程序，可能會把輸入元素滾動到頁面頂端而隱藏了標籤，或者放在輸入元素下方的標籤可能會被虛擬鍵盤所遮擋。



### 使用佔位符

佔位符屬性可提示用戶應在輸入框中輸入什麼內容，通常以淺色文本顯示其值，直到用戶開始在元素中輸入。



<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


注意：當用戶開始輸入元素時，佔位符立即消失，因此它們不能代替標籤。應使用佔位符作爲輔助，引導用戶注意所需的格式和內容。

### 使用元數據來實現自動填充

當網站自動填寫一些常見字段（如姓名、電子郵件地址和其他常用字段）爲用戶節省時間時，用戶會很喜歡，並且這樣還能幫助減少潛在的輸入錯誤，尤其是在使用虛擬鍵盤和很小的設備時。




瀏覽器使用許多啓發方法，[根據用戶之前指定的數據](https://support.google.com/chrome/answer/142893)來確定可以[自動填充](https://support.google.com/chrome/answer/142893)哪些字段，並且您可以爲每個輸入元素提供 `name` 屬性和 `autocomplete` 屬性來提示瀏覽器。





注：Chrome 需要將 `input` 元素包含在 `<form>` 標記中才能啓用自動完成。
如果它們不包含在 `form` 標籤中，Chrome 將提供建議值，但是**不會**完成表單。


例如，要提示瀏覽器應給表單自動填寫用戶名、電子郵件地址和電話號碼，應當使用：


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }



### 建議的輸入 `name` 和 `autocomplete` 屬性值

`autocomplete` 屬性值是當前 [WHATWG HTML 標準](https://html.spec.whatwg.org/multipage/forms.html#autofill)的一部分。下面顯示了最常用的 `autocomplete` 屬性。

`autocomplete` 屬性可以附帶分區名稱，例如 **`shipping `**`given-name` 或 **`billing `**`street-address`。瀏覽器將單獨自動填充不同的分區，而不是將其作爲一個連續表單。

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
          <li><code>name</code>（全名）</li>
          <li><code>given-name</code>（名字）</li>
          <li><code>additional-name</code>（中間名）</li>
          <li><code>family-name</code>（姓氏）</li>
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
          <li>用於單個地址輸入框：
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>用於兩個地址輸入框：
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code>（州或省）</li>
          <li><code>address-level2</code>（城市）</li>
          <li><code>postal-code</code>（郵編）</li>
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
    <tr>
      <td data-th="Content type">用戶名</td>
      <td data-th="name attribute">
        <code>username</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>username</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">密碼</td>
      <td data-th="name attribute">
        <code>password</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>current-password</code>（用於登錄表單）</li>
          <li><code>new-password</code>（用於註冊和更改密碼錶單）</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


注：僅在您的地址格式需要時，才需要使用  <code>street-address</code> 或者  <code>address-line1</code> 和  <code>address-line2</code>  <code>address-level1</code> 和  <code>address-level2</code>。


###  `autofocus` 屬性

在某些表單上，例如 Google 首頁，需要用戶做的唯一操作是填寫一個特定字段，則可以加上 `autofocus` 屬性。在設置了此屬性時，桌面瀏覽器會立即將焦點移到輸入字段，使用戶可以輕鬆快速地開始填寫表單。
移動瀏覽器會忽略 `autofocus` 屬性，以防止鍵盤隨機顯示。



要小心使用 autofocus 屬性，因爲它將侵佔鍵盤焦點，並且可能阻止使用退格符來進行導航。




    <input type="text" autofocus ...>
    


## 提供實時驗證

實時數據驗證不僅有助於保持數據清潔，還能改善用戶體驗。現代瀏覽器有多種內置工具可提供實時驗證，並且能防止用戶提交無效的表單。應使用可視化線索來指示表單是否已正確填寫。


### TL;DR {: .hide-from-toc }
- 利用瀏覽器的內置驗證屬性，例如  <code>pattern</code>、 <code>required</code>、 <code>min</code>、 <code>max</code> 等。
- 使用 JavaScript 和 Constraints Validation API 來滿足更復雜的驗證要求。
- 實時顯示驗證錯誤，如果用戶嘗試提交無效的表單，則顯示他們需要修正的所有字段。


### 使用以下屬性來驗證輸入值

####  `pattern` 屬性

`pattern` 屬性指定一個用於驗證輸入字段的[正則表達式](https://en.wikipedia.org/wiki/Regular_expression)。 
例如，要驗證美國郵編（5 位數，有時後面有一個破折號和另外 4 位數），我們將 `pattern` 設置如下：




    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

##### 常用的正則表達式模式

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">正則表達式</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">郵寄地址</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">郵編（美國）</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP 地址 (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP 地址 (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP 地址（兩種）</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">信用卡號</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">社會保障號</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">北美電話號碼</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

####  `required` 屬性

如果提供 `required` 屬性，則此字段必須包含值，才能提交表單。
例如，要使郵編爲必填值，只需加上 required 屬性：



    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

####  `min`、`max` 和 `step` 屬性

對於數字輸入類型，如數字或範圍以及日期/時間輸入，可以指定最小值和最大值，以及在通過滑塊或微調框進行調整時的每個增量/減量。例如，鞋碼輸入將設置最小碼 1 和最大碼 13，遞增或遞減單位爲 0.5




    <input type="number" min="1" max="13" step="0.5" ...>
    

####  `maxlength` 屬性

`maxlength` 屬性可用於指定輸入值或文本框的最大長度，當您要限制用戶可提供信息的長度時，此屬性很有用。例如，如果要將文件名限制爲 12 個字符，可以使用以下方法。



    <input type="text" id="83filename" maxlength="12" ...>
    

####  `minlength` 屬性

`minlength` 屬性可用於指定輸入值或文本框的最小長度，當您要指定用戶必須提供的最小長度時，此屬性很有用。例如，如果要指定文件名需要至少 8 個字符，可以使用以下方法。



    <input type="text" id="83filename" minlength="8" ...>
    

####  `novalidate` 屬性

在某些情況下，即使表單包含無效的輸入，您也可能想允許用戶提交表單。
爲此，可給表單元素或單獨的輸入字段加上 `novalidate` 屬性。
在這種情況下，所有僞類和 JavaScript API 仍將允許您檢查表單是否通過驗證。



    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>
    


成功：即使客戶端有輸入驗證，也務必在服務器上驗證數據，以確保數據的一致性和安全性。

###  使用 JavaScript 實現更復雜的實時驗證

當內置驗證加上正則表達式還不夠時，可以使用 [Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)，這是一個用於處理自定義驗證的強大工具。此 API 使您能夠進行各種驗證，例如設置自定義錯誤，檢查一個元素是否有效，並確定元素無效的原因：



<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Constraint Validation</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">設置自定義驗證消息，並將  <code>ValidityState</code> 對象的  <code>customError</code> 屬性設置爲  <code>true</code>。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">返回一個字符串，說明輸入值未通過驗證測試的原因。</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">如果元素滿足其所有約束條件，則返回  <code>true</code>，否則返回  <code>false</code>。由開發者決定在檢查返回  <code>false</code> 時頁面如何響應。</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">如果元素滿足其所有約束條件，則返回  <code>true</code>，否則返回  <code>false</code>。當頁面響應  <code>false</code> 時，向用戶報告約束問題。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">返回一個表示元素有效狀態的  <code>ValidityState</code> 對象。</td>
    </tr>
  </tbody>
</table>



### 設置自定義驗證消息

如果字段未通過驗證，可使用 `setCustomValidity()` 來將字段標記爲無效並解釋字段未通過驗證的原因。
例如，註冊表單可能要求用戶通過輸入兩次來確認其電子郵件地址。
對第二個輸入使用 blur 事件，以驗證兩個輸入值，並設置相應的響應。例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 阻止提交無效的表單

由於並非所有瀏覽器都會在表單存在無效數據時阻止用戶提交，因此您應當捕獲提交事件，並對錶單元素使用 `checkValidity()` 以確定表單是否有效。

例如：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

### 實時顯示反饋

在用戶提交表單之前，就在每個字段提供可視指示，提示用戶是否已正確填寫表單，這樣做很有幫助。HTML5 也引入了很多新的僞類，可以用於根據輸入值或屬性來設置輸入的樣式。




<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">實時反饋</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">明確地設置當輸入值符合所有驗證要求時，要使用的輸入值樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">明確地設置當輸入值不符合所有驗證要求時，要使用的輸入值樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">明確地設置已設定 required 屬性的輸入元素的樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">明確地設置未設定 required 屬性的輸入元素的樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">明確地設置在輸入值處於範圍內時數字輸入元素的樣式。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">明確地設置在輸入值超出範圍時數字輸入元素的樣式。</td>
    </tr>
  </tbody>
</table>

驗證是立即進行的，意味着當頁面加載時，即使用戶尚無機會填寫各字段，字段就可能被標記爲無效。它還意味着，用戶正在輸入時就可能看到提示樣式無效。
爲防止此問題，可以將 CSS 與 JavaScript 結合，只在用戶已訪問此字段時才顯示無效的樣式。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

[試一下](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }


成功：應一次性向用戶顯示錶單上的所有問題，而不是一次顯示一個問題。




{# wf_devsite_translation #}
