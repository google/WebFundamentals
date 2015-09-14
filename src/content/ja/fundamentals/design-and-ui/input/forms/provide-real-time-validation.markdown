---
title: "リアルタイム検証の実施"
description: "リアルタイム データ検証は、データを明確に保つだけではなく、ユーザ経験を改善するのにも役立ちます。  最近のブラウザにはリアルタイム データ検証の実施に役立つ複数のツールが組み込まれており、ユーザが無効なフォームを送信するのを回避することができます。  フォームが正しく記入されたかどうかを示すには、視覚的な指示を使用する必要があります。"
updated_on: 2014-10-21
key-takeaways:
  provide-real-time-validation:
    - "次のようなブラウザの組み込み検証属性を活用します。<code>pattern</code>、<code>required</code>、<code>min</code>、<code>max</code>、その他。"
    - より複雑な検証要件には、JavaScript と Constraints Validation API を使用します。
    - リアルタイムで検証エラーを表示し、ユーザが無効なフォームを送信しようとすると、修正する必要のあるすべてのフィールドを示します。
notes:
  use-placeholders:
    - プレースホルダーは、フォーカスが要素内に配置されるとすぐに消えます。つまり、ラベルの交換はありません。 これらは、必要な形式とコンテンツについてユーザーを支援するための補助として使用します。
  recommend-input:
    - オートコンプリートは、フォームのメソッドが POST である場合にのみ機能します。
  use-datalist:
    - <code>datalist</code> の値は候補として提供され、ユーザは提供された提案に限定されるものではありません。
  provide-real-time-validation:
    - クライアント側の入力検証においても、データの一貫性とセキュリティを確保するためにサーバー上のデータを検証することは常に重要です。
  show-all-errors:
    - ユーザーに問題を 1 つずつ表示するよりも、フォーム上にすべての問題を一度に表示する必要があります。
  request-auto-complete-flow:
    - 個人情報やクレジット カードなどのデータを求められた場合 ページが SSL で保存されることを確認してください。  そうでない場合、ダイアログは、情報が安全ではない可能性があることをユーザに警告します。
comments:
  # 注:セクション タイトルまたは URL を変更した場合、以下のショートリンクを更新する必要があります
  - g.co/mobilesiteprinciple17b
---
<p class="intro">
  リアルタイム データ検証は、データを明確に保つだけではなく、ユーザ経験を改善するのにも役立ちます。  最近のブラウザにはリアルタイム データ検証の実施に役立つ複数のツールが組み込まれており、ユーザが無効なフォームを送信するのを回避することができます。  フォームが正しく記入されたかどうかを示すには、視覚的な指示を使用する必要があります。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.provide-real-time-validation %}

### これらの属性を使用して、入力を検証します。

#### `pattern` 属性

`pattern` 属性は、
入力フィールドの検証に使用される [正規
表現](http://en.wikipedia.org/wiki/Regular_expression) を指定します。 たとえば、米国の郵便番号 (5 桁の後に
ダッシュと追加の 4 桁が続く場合がある) を検証するには、`pattern` を
次のように設定します。

{% highlight html %}
<input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

##### 一般的な正規表現パターン

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="Description">説明</th>
      <th data-th="Regular expression">正規表現</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">住所</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">郵便番号 (US)</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP アドレス (IPv4)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">IP アドレス (IPv6)</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
<tr>
      <td data-th="Description">IP アドレス (両方)</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)|(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    
    <tr>
      <td data-th="Description">クレジット カード番号</td>
      <td data-th="Regular expression"><code>^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$</code></td>
    </tr>
    <tr>
      <td data-th="Description">社会保障番号</td>
      <td data-th="Regular expression"><code>^\d{3}-\d{2}-\d{4}$</code></td>
    </tr>
    <tr>
      <td data-th="Description">北米電話番号</td>
      <td data-th="Regular expression"><code>^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$</code></td>
    </tr>
  </tbody>
</table>

#### `required` 属性

`required` 属性が存在する場合は、
フォームを送信する前に、フィールドに値が含まれている必要があります。 たとえば、郵便番号を必須にするには、
単に必須属性を追加します。

{% highlight html %}
<input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
{% endhighlight %}

#### `min`、`max` および `step` 属性

数値や範囲のような数値入力タイプ、および日付/時刻の入力については、
最小値と最大値を指定できるほか、
スライダまたはスピンボールによって調整されるときの増減刻み値を設定することができます。  たとえば、
靴のサイズの入力については、最小サイズを 1、最大サイズを 13、
刻み値を 0.5 に設定します。

{% highlight html %}
<input type="number" min="1" max="13" step="0.5" ...>
{% endhighlight %}

#### `maxlength` 属性

`maxlength` 属性を使用すると、入力または
テキストボックスの最大長を指定できます。この属性は、
ユーザが指定できる情報の長さを制限する場合に便利です。 たとえば、ファイル名の長さを 12 文字に制限する場合は、
次のように使用できます。

{% highlight html %}
<input type="text" id="83filename" maxlength="12" ...>
{% endhighlight %}

#### `minlength` 属性

`minlength` 属性を使用すると、入力または
テキストボックスの最小長を指定できます。この属性は、
ユーザが入力する必要のある最小長を指定する場合に便利です。 たとえば、ファイル名の最小長を 
8 文字と指定する場合は、次のように使用できます。

{% highlight html %}
<input type="text" id="83filename" minlength="8" ...>
{% endhighlight %}

#### `novalidate` 属性

フォームに無効な入力が
含まれている場合でも、フォームの送信をユーザに許可したい場合があります。 そうするには、フォーム
要素、または個々の入力フィールドに `novalidate` 属性を追加します。 その場合、すべての疑似クラスと 
JavaScript API では、依然としてフォームが正しいかどうかをチェックできます。

{% highlight html %}
<form role="form" novalidate>
  <label for="inpEmail">Email address</label>
  <input type="email" ...>
</form>
{% endhighlight %}

{% include shared/remember.liquid title="Remember" list=page.notes.provide-real-time-validation %}

### JavaScript を使用した複雑なリアルタイム検証

組み込みの検証機能と正規表現で十分でない場合は、
[Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation) を使用できます。
これは独自の検証を制御するための強力なツールです。  この API を使用すると、
独自のエラーの設定や、要素が有効かどうかのチェックなどの処理を実行でき、
要素が無効である理由を判定できます。

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="API">API</th>
      <th data-th="Description">説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">カスタム検証メッセージ、および <code>ValidityState</code> オブジェクトの<code>customError</code> プロパティを <code>true</code>に設定します。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">入力が検証テストに失格した理由を示す文字列を返します。</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">要素がすべての制約を満たす場合は <code>true</code> を返し、それ以外の場合は <code>false</code> を返します。 チェックから <code>false</code> が返されたときにページがどのように応答するかを決めるのは、開発者に任されています。</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">要素がすべての制約を満たす場合は <code>true</code> を返し、それ以外の場合は <code>false</code> を返します。 ページから <code>false</code> が返される場合は、制約の問題点がユーザに報告されます。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">要素の有効性状態を表す <code>ValidityState</code> オブジェクトを返します。</td>
    </tr>
  </tbody>
</table>

#### カスタム検証メッセージの設定

フィールドが検証で失格になった場合は、`setCustomValidity()` を使用してフィールドを無効
とマークし、フィールドがエラーになった理由を説明します。  たとえば、サインアップ フォームでは、
ユーザに電子メール アドレスを 2 回入力させることで、そのアドレスが正しいことを確認させます。  2 回目の入力時に blur
 イベントを使用して 2 つの入力を検証し、適切な
応答メッセージを設定します。  例： 

{% include_code src=_code/order.html snippet=customvalidation lang=javascript %}

#### 無効なフォームの送信の禁止

フォームに
無効なデータが入力されている場合に、すべてのブラウザがユーザによるフォームの送信を禁止するわけではないため、送信イベントを捕捉し、フォーム要素で `checkValidity()`
 を使用して、フォームが有効かどうかを判定する必要があります。  例： 

{% include_code src=_code/order.html snippet=preventsubmission lang=javascript %}

### フィードバックのリアルタイム表示

ユーザがフォームを送信する前に、
フォームが正しく入力されたかどうかを示す視覚的指示を各フィールドで提供するのが有用です。
HTML5 には複数の新しい疑似クラスも用意されています。これらのクラスを使用すると、入力値または属性に基づいて
入力をスタイル化できます。

<table class="table-2 tc-heavyright">
  <thead>
    <tr>
      <th data-th="Pseudo-class">疑似クラス</th>
      <th data-th="Use">使用</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">入力値がすべての検証要件を満たすときに、入力のスタイルが使用されるよう明示的に設定します。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">入力値がすべての検証要件を満たさないときに、入力のスタイルが使用されるよう明示的に設定します。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">必須属性が設定された入力要素のスタイルを明示的に設定します。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">必須属性が設定されていない入力要素のスタイルを明示的に設定します。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:in-range</code></td>
      <td data-th="Use">値が範囲内にある数値入力要素のスタイルを明示的に設定します。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:out-of-range</code></td>
      <td data-th="Use">値が範囲外にある数値入力要素のスタイルを明示的に設定します。</td>
    </tr>
  </tbody>
</table>

検証を即座に実行します。つまり、ページがロードされたとき、
ユーザがフィールドに入力する機会がなくても、
フィールドが無効とマークされる可能性があります。  また、ユーザが入力しているときに、
無効なスタイルが示されることがあります。 これを避けるために、CSS と
 JavaScript を組み合わせて、ユーザがフィールドを操作したときのみ、無効なスタイルを示すことができます。

{% include_code src=_code/order.html snippet=invalidstyle lang=css %}
{% include_code src=_code/order.html snippet=initinputs lang=javascript %}

{% include shared/remember.liquid title="Important" list=page.remember.show-all-errors %}


