---
title: "Label and name inputs properly"
description: "フォームをモバイルに記入するのは困難です。 最高のフォームは入力の数が最も少ないものです。"
updated_on: 2015-03-27
key-takeaways:
  label-and-name:
    - 常に<code>label</code> をフォーム入力に使用し、フィールトがフォーカスされているときに 見えるようにしてください。
    - <code>placeholder</code> を使用して、期待するものについてのガイダンスを提供します。
    - ブラウザがフォームをオートコンプリートできるようにするために、要素に確立された<code>name</code> を使用し、<code>autocomplete</code> 属性を含めてください。
notes:
  use-placeholders:
    - プレースホルダーは、ユーザーが要素内に入力を開始するとすぐに消えます。つまり、ラベルの交換はありません。  これらは、必要な形式とコンテンツについてユーザーを支援するための 補助として使用します。
  recommend-input:
    - <code>street-address</code> のみか、 <code>address-line1</code> と
      <code>address-line2</code> の両方を使用してください
    - <code>address-level1</code> および <code>address-level2</code> は、アドレス形式に必要な場合にのみ使用します。
  use-datalist:
    - <code>datalist</code> の値は候補として提供され、ユーザは提供された提案に限定されるものではありません。
  provide-real-time-validation:
    - クライアント側の入力検証においても、データの一貫性とセキュリティを確保するためにサーバー上のデータを検証することは常に重要です。
  show-all-errors:
    - ユーザーに問題を 1 つずつ表示するよりも、フォーム上にすべての問題を一度に表示する必要があります。
  request-auto-complete-flow:
    - 個人情報やクレジット カードなどのデータを求められた場合 ページが SSL で保存されることを確認してください。 そうでない場合、ダイアログは、情報が安全ではない可能性があることをユーザーに警告します。
comments:
  # 注:セクション タイトルまたは URL を変更した場合、以下のショートリンクを更新する必要があります
  - g.co/mobilesiteprinciple17a
---
<p class="intro">
  フォームをモバイルに記入するのは困難です。 最高のフォームは入力の数が最も少ないものです。 良いフォームは意味のある入力タイプを提供します。 キーはユーザーの入力タイプと一致するように変更する必要があります。ユーザーはカレンダー上の日付を選択します。 ユーザーに通知してください。 検証ツールは、フォームを送信する前に必要なことをユーザーに伝える必要があります。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.label-and-name %}

### ラベルの重要性

`label` 要素は、フォーム要素で
必要な情報をユーザに提供します。  各 `label` は`label` 要素の内部に配置されることによって、あるいは"`for`"
属性を使用することによって、
入力要素と関連付けられます。  要素を形成するためにラベルを適用すると、タッチ目標のサイズを
改善するのに役立ちます。
tユーザーは、入力要素にフォーカスを配置するためにラベルまたは入力のいずれかをtタッチすることができます。

{% include_code src=_code/order.html snippet=labels %}

### ラベルのサイズと配置

ラベルと入力はにプレスを簡単にできるように十分大きくなければなりません。  縦向きのビューポートでは、
フィールド ラベルは入力要素の上にあり
横向きでは横に配置されます。  フィールド ラベルと対応する入力ボックスが同時に表示されることを
確認してください。  カスタム スクロール ハンドラに注意してください。入力要素をページの
先頭にスクロールしてラベルを隠したり、入力要素の下に
配置されたラベルがが仮想キーボードによって覆われることがあります。

### プレースホルダの使用

プレースホルダー属性は、入力に期待されているものについてユーザーにヒントを提供します。
通常、ユーザーが入力を開始するまで、
明るいテキストで値を表示します。

<input type="text" placeholder="MM-YYYY">

{% highlight html%}
<input type="text" placeholder="MM-YYYY" ...>
{% endhighlight %}


{% include shared/remember.liquid title="Remember" list=page.notes.use-placeholders %}

### オートコンプリートを有効にするためにメタデータを使用

ウェブ サイトで、名前、メールアドレス、その他の頻繁に使用されるフィールドに
自動的に入力することによって、ユーザーの時間を節約します。
これは潜在的な入力ミスを減らすのに役立ち、
特に仮想キーボードや小さな端末で便利です。

ブラウザは、[auto-populate](https://support.google.com/chrome/answer/142893) [based on
previously specified data by the
user](https://support.google.com/chrome/answer/142893) 
を判断するために多くのヒューリスティックを使用します。
また、属性と各入力要素のオートコンプリート属性の両方を提供することで、
ブラウザにヒントを与えることができます。

たとえば、ユーザー名、電子メールアドレス、電話番号を使用してフォームを
オートコンプリートするブラウザにヒントを与えるには、次のように使用します。

{% include_code src=_code/order.html snippet=autocomplete %}


### 推奨入力`name` および `autocomplete` 属性値


`autocomplete` 属性値は現在の [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/forms.html#autofill) の一部です。 一般に使用される `autocomplete` 属性は以下のとおりです。

`autocomplete` 属性は**`shipping `**`given-name` または **`billing `**`street-address`などのセクション名を伴うことができます。 ブラウザは、継続的なフォームではなく、異なるセクションを個別にオートコンプリートします。

<table class="table-3 autocompletes">
    <thead>
    <tr>
      <th data-th="Content type">コンテンツの種類</th>
      <th data-th="name attribute"><code>name</code> 属性</th>
      <th data-th="autocomplete attribute"><code>autocomplete</code> 属性</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Content type">名前</td>
      <td data-th="name attribute">
        <code>name</code>
        <code>fname</code>
        <code>mname</code>
        <code>name</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code> (姓名)</li>
          <li><code>given-name</code> (名)</li>
          <li><code>additional-name</code> (ミドルネーム)</li>
          <li><code>family-name</code> (姓)</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">メールアドレス</td>
      <td data-th="name attribute"><code>email</code></td>
      <td data-th="autocomplete attribute"><code>email</code></td>
    </tr>
    <tr>
      <td data-th="Content type">住所</td>
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
          <li>1 アドレス入力:
            <ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>2 アドレス入力:
            <ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code> (州または県)</li>
          <li><code>address-level2</code> (市)</li>
          <li><code>postal-code</code> (郵便番号)</li>
          <li><code>country</code></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td data-th="Content type">電話番号</td>
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
      <td data-th="Content type">クレジットカード</td>
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

### `autofocus` 属性

Google のホームページなどのフォームで、ユーザーが特定の
フィールドだけを入力する場合など、`autofocus` 
属性を追加できます。  設定した場合、デスクトップ ブラウザはすぐに入力フォールドにフォーカスを移動し、
ユーザーが簡単にすばやくフォームの使用を開始できるようにします。  モバイル ブラウザは
 `autofocus` 属性を無視し、キーボードがランダムに
表示されるのを防止します。

オートフォーカス属性を使用する際には注意してください。
キーボード フォーカスを妨げ、ナビゲーションに使用されるのバックスペース文字
を潜在的に防止するためです。

{% highlight html %}
<input type="text" autofocus ...>
{% endhighlight %}


