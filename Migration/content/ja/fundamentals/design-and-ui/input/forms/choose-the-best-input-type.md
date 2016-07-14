---
title: "Choose the best input type"
description: "正しい入力タイプを使用して情報の入力を効率化します。 ユーザーは、電話番号を入力する際に自動的にナンバー パッドが表示されるか、入力するにつれて自動的に現在のフィールドを進めるウェブサイトを評価します。 フォーム上でで無駄なタップを排除するようにしてください。"
updated_on: 2014-10-21
key-takeaways:
  choose-best-input-type:
    - データ入力を簡単にするための最も適切な入力タイプを選択します。
    - <code>datalist</code> 要素でユーザーが入力できる提案をします。
notes:
  use-placeholders:
    - プレースホルダーは、フォーカスが要素内に配置されるとすぐに消えます。つまり、ラベルの交換はありません。  これらは、必要な形式とコンテンツについてユーザーを支援するための補助として使用します。
  recommend-input:
    - オートコンプリートは、フォームのメソッドが POST である場合にのみ機能します。
  use-datalist:
    - <code>datalist</code> の値は候補として提供され、ユーザーは提供された提案に限定されるものではありません。
  provide-real-time-validation:
    - クライアント側の入力検証においても、データの一貫性とセキュリティを確保するためにサーバー上のデータを検証することは常に重要です。
  show-all-errors:
    - ユーザーに問題を 1 つずつ表示するよりも、フォーム上にすべての問題を一度に表示する必要があります。
  request-auto-complete-flow:
    - 個人情報やクレジット カードなどのデータを求められた場合 ページが SSL で保存されることを確認してください。  そうでない場合、ダイアログは、情報が安全ではない可能性があることをユーザーに警告します。
comments:
  # 注:セクション タイトルまたは URL を変更した場合、以下のショートリンクを更新する必要があります
  - g.co/mobilesiteprinciple14
  - g.co/mobilesiteprinciple15
---
<p class="intro">
  正しい入力タイプを使用して情報の入力を効率化します。 ユーザーは、電話番号を入力する際に自動的にナンバー パッドが表示されるか、入力するにつれて自動的に現在のフィールドを進めるウェブサイトを評価します。 フォーム上でで無駄なタップを排除するようにしてください。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.choose-best-input-type %}

### HTML5 入力タイプ

HTML5 は多くの新しい入力タイプを導入しました。 これらの新しい入力タイプは、
画面上のキーボードに表示するキーボード レイアウトの
種類について、ブラウザにヒントを与えます。  ユーザーはキーボードを変更せず、
入力タイプの適切なキーを見るだけで、
必要な情報をより簡単に入力することができます。

<table class="table-2 inputtypes">
  <thead>
    <tr>
      <th data-th="Input type">入力 <code>タイプ</code></th>
      <th data-th="Typical keyboard">一般的なキーボード</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> URL を入力します。 これは有効な URI スキームで始まる必要があります。
        たとえば<code>http://</code>、 <code>ftp://</code> または <code>mailto:</code>.
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>電話番号を入力します。 これは、検証のために特定の構文を強制<b>しません</b>。
        したがって、特定の形式を確認したい場合は、
パターンを使用することができます。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>メールアドレスを入力します。
        @ がデフォルトでキーボードに表示されます。 複数のメールアドレスが提供される場合は、
複数の属性を追加することができます。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>テキスト入力フィールドが、
プラットフォームの検索フィールドと一致するスタイルです。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>数字を入力します。
有理整数または浮動小数点値です。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>数字を入力しますが、番号入力とは異なります。
        タイプ、値は重要ではありません。 これは、スライダ コントロールとしてユーザーに
表示されます。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>日付と時刻の値を入力します。
        ここで提供されるタイムゾーンは現地時間です。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>タイムゾーンなし
で日付 (のみ) を入力します。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>タイムゾーンなし
で時間 (のみ) を入力します。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>タイムゾーンなし
で週 (のみ) を入力します。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>タイムゾーンなし
で月 (のみ) を入力します。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/month-ios.png" srcset="imgs/month-ios.png 1x, imgs/month-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>color</code><br>色を選択します。
      </td>
      <td data-th="Typical keyboard">
        <img src="imgs/color-android.png" srcset="imgs/color-android.png 1x, imgs/color-android-2x.png 2x">
      </td>
    </tr>
  </tbody>
</table>

### データリストで入力中に候補を示す

`datalist` 要素は入力タイプではなく、入力値の候補のリストであり、
フォーム フィールドに関連付けられています。 これによって、ブラウザがユーザー タイプとして
オートコンプリートのオプションを提案することができます。 ユーザーが値を見つけるために長いリストを
スキャンしなければならないような選択要素とは異なり、`datalist` 
要素はユーザー タイプに応じてヒントを提要します。

{% include_code src=_code/order.html snippet=datalist %}

{% include shared/remember.liquid title="Remember" list=page.notes.use-datalist %}


