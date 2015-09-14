---
title: "Design efficient forms"
description: "繰り返しのアクションを回避し、必要な情報のみを要求し、どこまでマルチ パート フォームに沿うかを示すことによってユーザーをガイドすることにより、効率的なフォームを設計します。"
updated_on: 2014-10-21
key-takeaways:
  tldr:
    - 既存のデータを使用して、フィールドに事前設定し、オートフィルを有効にします。
    - ユーザーがマルチ パート フォームを活用できるよう、明確にラベル付けされたプログレス バーを使用します。
    - 視覚的なカレンダーを提供し、ユーザーがサイトから離れてスマートフォンのカレンダー アプリにジャンプする必要をなくします。
comments:
  # 注:セクション タイトルまたは URL を変更した場合、以下のショートリンクを更新する必要があります
  - g.co/mobilesiteprinciple16
  - g.co/mobilesiteprinciple18
---

<p class="intro">
  繰り返しのアクションを回避し、必要な情報のみを要求し、どこまでマルチ パート フォームに沿うかを示すことによってユーザーをガイドすることにより、効率的なフォームを設計します。
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## 繰り返しアクションとフィールドを最小限に抑える

フォームに繰り返しのアクションがないことを確認してください。
必要なだけのフィールドに留め、
[autofill](/web/fundamentals/input/form/label-and-name-inputs.html#use-metadata-to-enable-auto-complete)を活用するようにしてください。
これによって、ユーザーは事前設定されたデータで簡単にフォームを完了できます。

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="マルチ パート フォームに進捗を表示">
  <figcaption>
    Progressive.com のウェブサイトで、ユーザーは最初に郵便番号の入力を要求されます。その後、事前設定されたフォームの次の部分に進みます。
  </figcaption>
</figure>

既に知っている情報を事前入力する機会を探したり、ユーザーが提供する
情報を保存することができます。  たとえば、
ユーザーによって供給された最新の配送先住所を
事前設定します。

## ユーザーに進捗状況を示す

マルチ ステップ フォームとプロセスを介して、プログレス バーとメニューで
正確に全体的な進捗状況を伝える必要があります。

<figure>
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="マルチ パート フォームに進捗を表示">
  <figcaption>
    - ユーザーがマルチ パート フォームを活用できるよう、明確にラベル付けされたプログレス バーを使用します。
  </figcaption>
</figure>

前のステップで不相応に複雑なフォームを配置した場合、
ユーザーは全体のプロセスを終える前に、サイトを離れる可能性が高くなります。 


## 日付を選択するための視覚的カレンダーを提供

旅行の予定や日程をスケジュールするときに、ユーザーは多くの場合、
より多くのコンテキストを必要とします。ユーザーがカレンダーをチェックするためにサイトを離れることを防止し
、手続きを容易にするために、開始日と終了日を選択するための明確な標識との
視覚的なカレンダーを提供します。 

<figure>
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="使いやすいカレンダーを使用するホテル予約サイト">
  <figcaption>
    ホテル予約サイトは、日付を簡単に選ぶためのカレンダー·ウィジェットを使用しています。
  </figcaption>
</figure>


