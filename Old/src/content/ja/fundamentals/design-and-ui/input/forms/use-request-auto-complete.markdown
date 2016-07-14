---
title: "Simplify checkout with requestAutocomplete API"
description: "<code>requestAutocomplete</code> はユーザーが任意のフォームに必要事項を入力するために設計されましたが、現在では主に eCommerce で使用されます。モバイル ウェブ上のショッピングカートなどで、<a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>97%</a> ほどの高い使用率があります。"
updated_on: 2014-10-21
key-takeaways:
  use-request-auto-complete:
    - <code>requestAutocomplete</code> はチェックアウト処理を大幅に簡略化し、ユーザー エクスペリエンスを向上させます。
    - <code>requestAutocomplete</code> が利用可能な場合は、チェックアウト フォームを非表示にし、確認ページに直接人を移動します。
    - 入力フィールドには適切なオートコンプリート属性が含まれていることを確認してください。
notes:
  use-placeholders:
    - プレースホルダーは、フォーカスが要素内に配置されるとすぐに消えます。つまり、ラベルの交換はありません。  これらは、必要な形式とコンテンツについてユーザーを支援するための 補助として使用します。
  recommend-input:
    - オートコンプリートは、フォームのメソッドが POST である場合にのみ機能します。
  use-datalist:
    - <code>datalist</code> の値は候補として提供され、ユーザは提供された提案に限定されるものではありません。
  provide-real-time-validation:
    - クライアント側の入力検証においても、データの一貫性とセキュリティを確保するためにサーバー上のデータを検証することは常に重要です。
  show-all-errors:
    - ユーザーに問題を 1 つずつ表示するよりも、フォーム上にすべての問題を一度に表示する必要があります。
  request-auto-complete-flow:
    - 個人情報やクレジット カードなどのデータを求められた場合 ページが SSL で保存されることを確認してください。  そうでない場合、ダイアログは、情報が安全ではない可能性があることをユーザーに警告します。
---
<p class="intro">
  <code>requestAutocomplete</code> はユーザーが任意のフォームに必要事項を入力するために設計されましたが、現在では主に eCommerce で使用されます。モバイル ウェブ上のショッピングカートなどで、<a href='http://seewhy.com/97-shopping-cart-abandonment-rate-mobile-devices-concern-you/'>97%</a> ほどの高い使用率があります。」 スーパーマーケットにいる 97% の人を想像してみてください。ほしいもので満たされたカートを引きずり満足げな人々です。
</p>


{% include shared/takeaway.liquid list=page.key-takeaways.use-request-auto-complete %}

特定の支払プロバイダに頼るサイトよりも、
`requestAutocomplete` はブラウザから支払いの詳細を要求します (氏名、住所、クレジット
 カード情報など）。これらは他のオートコンプリート フィールドと同様に、必要に応じてブラウザによって
保存されています。

{% ytvideo ljYeHwGgzQk %}

### `requestAutocomplete` フロー

チェックアウト フォームを表示するページをロードする代わりに、
理想的な経験が `requestAutocomplete` ダイアログに表示されます。 うまくいった場合は、ユーザーは他の
フォームを目にしません。  既存のフォームに `requestAutocomplete` を容易に追加でき、
フィールド名を変える必要はありません。  各フォームに適切な値の `autocomplete` 属性を追加し
、フォーム要素に 
`requestAutocomplete()` 関数を追加します。 ブラウザは
残りの部分を処理します。

<img src="imgs/rac_flow.png" class="center" alt="オートコンプリート リクエストのフロー">

{% include_code src=_code/rac.html snippet=rac lang=javascript %}

`requestAutocomplete` 要素上の `form` 関数は、ブラウザに
フォームを設定することを示します。  セキュリティ機能として、
関数はタッチやマウスクリックなどのユーザー ジェスチャーを介して呼び出す必要があります。 次にダイアログが表示され、
フィールドを設定するためのユーザー権限がリクエストされ、
詳細を設定する内容を指定します。

{% include_code src=_code/rac.html snippet=handlerac lang=javascript %}

`requestAutocomplete` が完了したら、正常な場合は
`autocomplete` が起動し、失敗した場合は `autocompleteerror` 
が起動します。  正常に終了した場合、
フィームは必要事項を検証し、フォームを送信して、
最終確認に進みます。

{% include shared/remember.liquid title="Remember" list=page.notes.request-auto-complete-flow %}


