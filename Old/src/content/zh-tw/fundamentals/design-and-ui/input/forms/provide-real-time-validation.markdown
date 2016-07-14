---
title: "提供即時驗證"
description: "即時資料驗證不但能協助保持您的資料乾淨，還有助於改善使用者體驗。 最新瀏覽器具有幾個內建工具，可協助提供即時資料驗證，以防止使用者提交無效的表單。  應使用視覺提示，以表明一張表單是否已正確完成。"
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


{% include shared/takeaway.liquid list=page.key-takeaways.provide-real-time-validation %}

### 使用這些屬性來驗證輸入

#### `pattern` 屬性

`pattern` 屬性會指定
 [規則運算式](http://en.wikipedia.org/wiki/Regular_expression)，
以用來驗證輸入欄位。 例如，若要驗證美國郵遞區號
 (5 位數，有時候是再加一個短破折號與額外的 4 位數字)，我們會設定 `pattern` 如下：


{% highlight html %}
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

##### 常見的規則運算式模式

<table class="mdl-data-table mdl-js-data-table">
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

#### `required` 屬性

如果 `required` 屬性存在，
則提交表單之前，欄位必須包含一個值。 例如，要讓郵遞區號成為必要條件，
我們只要新增必要的屬性：

{% highlight html %}
<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

#### `min`、`max`和`step`屬性

對於數字或範圍等數字輸入類型，
以及日期/時間輸入，您可以指定最小值和最大值，
以及被滑桿或微調按鈕調整時的增/減量。  例如，鞋子大小輸入會設定最小值為 1 ，
最大值為 13，級距為 0.5


{% highlight html %}
<input type="number" min="1" max="13" step="0.5" ...>
{% endhighlight %}

#### `maxlength` 屬性

`maxlength` 屬性可以用於指定輸入或文字方塊的最大長度，
而且當您想要限制使用者可以提供的資訊長度時，非常實用。
 例如，如果您想要限制檔案名稱為最多 12 個字元之內，
您可以使用以下。

{% highlight html %}
<input type="text" id="83filename" maxlength="12" ...>
{% endhighlight %}

#### `minlength` 屬性

`minlength` 屬性可以用於指定輸入或文字方塊的最小長度，
而且當您想要指定使用者必須提供的最小長度時，非常實用。
 例如，如果您想要指定檔案名稱為至少需要 8 個字元時，
您可以使用以下。

{% highlight html %}
<input type="text" id="83filename" minlength="8" ...>
{% endhighlight %}

#### `novalidate` 屬性

在某些情況下，您可能想在表單含有不正確輸入資料時，
允許使用者提交表單。 為此，將 `novalidate` 屬性新增到表單元素中，
或個別輸入欄位中。 在這種情況下，
所有虛擬類別與 JavaScript API 將仍然可讓您檢查表單是否通過驗證。

{% highlight html %}
<form role="form" novalidate>
  <label for="inpEmail">Email address</label>
  <input type="email" ...>
</form>
{% endhighlight %}

{% include shared/remember.liquid title="Remember" list=page.notes.provide-real-time-validation %}

### 針對更複雜的即時驗證，請使用 JavaScript

當內建的驗證再加上規則運算式還不夠用的時候，
您可以用 [Constraints Validation API] (http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation)這項強大的工具，以處理自訂驗證。
  此 API 可讓您執行如設定自訂錯誤、
檢查元素是否有效，
並判斷元素無效的原因等動作：

<table class="mdl-data-table mdl-js-data-table">
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

#### 設定自訂驗證訊息

如果一個欄位驗證失敗，請使用 `setCustomValidity()` ，以標記欄位為無效，
並解釋欄位為何無法通過驗證。  例如，註冊表單可能會要求使用者輸入兩次，
以確認電子郵件地址是否正確。  對第二個輸入使用模糊
事件，以驗證這兩個輸入，並設定適當的
回應。  例如：

{% include_code src=_code/order.html snippet=customvalidation lang=javascript %}

#### 避免無效表單的表單提交

因為並非所有瀏覽器都會在資料無效時，
避免使用者提交表單，您應該擷取提交事件，並對表單元素使用 `checkValidity()`
，以確定表單是否有效。  例如：

{% include_code src=_code/order.html snippet=preventsubmission lang=javascript %}

### 即時顯示回饋

針對每個欄位提供視覺指示，以在使用者提交表單之前指明使用者是否已正確完成表單，
將非常有幫助。
HTML5 還導入了數個虛擬類別，
可根據其值或屬性用在樣式輸入上。

<table class="mdl-data-table mdl-js-data-table">
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

{% include_code src=_code/order.html snippet=invalidstyle lang=css %}
{% include_code src=_code/order.html snippet=initinputs lang=javascript %}

{% include shared/remember.liquid title="Important" list=page.remember.show-all-errors %}


