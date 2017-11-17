project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: モバイルでのフォーム入力は大変な作業です。最高のフォームとは、入力内容を最小限にしたフォームです。

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-04-30 #}

# 最適なフォームの作成 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

モバイルでのフォーム入力は大変な作業です。最高のフォームとは、入力内容を最小限にしたフォームです。良いフォームは意味のある入力タイプを提供します。ユーザーの入力タイプに応じて表示するキーボードを変え、シーンによってはユーザーがカレンダー上の日付を選択できるようにします。ユーザーへの通知も必要です。検証ツールを使用して、フォームを送信する前に必要なことをユーザーに伝えましょう。


##  効率的なフォームを設計する


効率的なフォームを設計するには、繰り返しのアクションを避けて、必要な情報のみを要求します。さらにマルチパート フォームのどの段階まで入力しているのかを示すことによって、ユーザーをガイドします


### TL;DR {: .hide-from-toc }
- フィールドに既存のデータをあらかじめ設定し、自動入力を有効にします。
- ユーザーがマルチ パート フォームを活用できるよう、明確にラベル付けされたプログレス バーを使用します。
- カレンダーを表示することで、ユーザーがサイトを離れてスマートフォンのカレンダー アプリを開く手間を省きます。


###  繰り返しのアクションとフィールドを最小限に抑える

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="マルチパート フォームに進捗を表示">
  <figcaption>
    Progressive.com のウェブサイトでは、ユーザーは最初に郵便番号の入力を要求されます。その内容が、フォームの次の部分に事前に設定されます。
</figcaption>
</figure>

フォームに繰り返しのアクションがないことを確認し、フィールドの使用は必要最低限にとどめてください。[自動入力](/web/fundamentals/design-and-ux/input/forms/#use-metadata-to-enable-auto-complete)を活用すると、あらかじめデータが設定されるため、ユーザーは簡単にフォームの入力を完了できます。




取得済みの情報を事前入力することで、ユーザーがその情報を入力する手間を省ける箇所がないか探します。
たとえば、ユーザーによって入力された最新の配送先住所を事前に設定します。



<div style="clear:both;"></div>

###  ユーザーに進捗状況を示す

<figure class="attempt-right">
  <img src="imgs/forms-multipart-good.png" srcset="imgs/forms-multipart-good.png 1x, imgs/forms-multipart-good-2x.png 2x" alt="マルチパート フォームに進捗を表示">
  <figcaption>
    ユーザーがマルチパート フォームを活用できるよう、明確にラベル付けされたプログレス バーを使用します。
</figcaption>
</figure>

プログレス バーとメニューを使い、マルチステップのフォームやプロセスおける全体的な進捗状況を正確に伝える必要があります。


前のステップで不相応に複雑なフォームを配置した場合、ユーザーは全体のプロセスを終える前に、サイトを離れる可能性が高くなります。
 

<div style="clear:both;"></div>

###  日付を選択するためのカレンダーを表示

<figure class="attempt-right">
  <img src="imgs/forms-calendar-good.png" srcset="imgs/forms-calendar-good.png 1x, imgs/forms-calendar-good-2x.png 2x" alt="使いやすいカレンダーを使用するホテル予約サイト">
  <figcaption>
    ホテル予約サイトでは、日付を簡単に選ぶためのカレンダー ウィジェットを使用しています。
</figcaption>
</figure>

ユーザーは旅行の予定や日程をスケジュールするときに、より多くのコンテキストを必要とする傾向があります。ユーザーがカレンダーをチェックするためにサイトを離れることを防止し、操作を容易にするために、開始日と終了日を選択するための明確なラベルがついたカレンダーを表示します。


 

<div style="clear:both;"></div>

##  最適な入力タイプを選ぶ

正しい入力タイプを使用して情報の入力を効率化します。ユーザーは、電話番号を入力する際に自動的に数字キーパッドが表示されたり、入力後に自動的に次のフィールドへ遷移したりするウェブサイトを好みます。

できるだけ無駄なタップ操作を省いたフォームにしましょう。



### TL;DR {: .hide-from-toc }
- データを簡単に入力できるよう、最適な入力タイプを選択します。
-  <code>datalist</code> 要素を使用して、ユーザーの入力時に候補を表示します。


###  HTML5 入力タイプ

HTML5 では多くの新しい入力タイプが導入されています。これらの新しい入力タイプは、画面上のキーボードとして表示するキーボード レイアウトの種類をブラウザに伝えます。

ユーザーはキーボードを変更しなくても、入力タイプに合った適切なキーが表示されるため、必要な情報をより簡単に入力することができます。



<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">入力 <code>type</code></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Input type">
        <code>url</code><br> URL を入力します。これは有効な URI スキームで始まる必要があります。たとえば <code>http://</code>、 <code>ftp://</code> または  <code>mailto:</code>mailto: などです。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/url-ios.png" srcset="imgs/url-ios.png 1x, imgs/url-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>tel</code><br>電話番号を入力します。tel では、特定の構文に従った入力は必須<b>ではありません</b>。
        したがって、特定の形式で入力されるようにしたい場合は、pattern 属性を使用します。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/tel-android.png" srcset="imgs/tel-android.png 1x, imgs/tel-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>email</code><br>メールアドレスを入力します。@ がデフォルトでキーボードに表示されます。
multiple 属性を追加すると、複数のメールアドレスが入力可能になります。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/email-android.png" srcset="imgs/email-android.png 1x, imgs/email-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>search</code><br>プラットフォームの検索フィールドとスタイルを合わせたテキスト入力フィールドです。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/plain-ios.png" srcset="imgs/plain-ios.png 1x, imgs/plain-ios-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>number</code><br>数字を入力します。有理整数または浮動小数点値です。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/number-android.png" srcset="imgs/number-android.png 1x, imgs/number-android-2x.png 2x" class="keybimg">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>range</code><br>数字を入力しますが、number の入力タイプとは違い、数値自体は重要ではありません。
これは、スライダ コントロールとしてユーザーに表示されます。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/range-ios.png">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>datetime-local</code><br>日付と時刻の値を入力します。ここで提供されるタイムゾーンは現地時間です。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/datetime-local-ios.png" srcset="imgs/datetime-local-ios.png 1x, imgs/datetime-local-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>date</code><br>タイムゾーンなしで日付（のみ）を入力します。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/date-android.png" srcset="imgs/date-android.png 1x, imgs/date-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>time</code><br>タイムゾーンなしで時間（のみ）を入力します。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/time-ios.png" srcset="imgs/time-ios.png 1x, imgs/time-ios-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>week</code><br>タイムゾーンなしで週（のみ）を入力します。
</td>

      <td data-th="Typical keyboard">
        <img src="imgs/week-android.png" srcset="imgs/week-android.png 1x, imgs/week-android-2x.png 2x">
      </td>
    </tr>
    <tr>
      <td data-th="Input type">
        <code>month</code><br>タイムゾーンなしで月（のみ）を入力します。
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

Warning: 入力タイプを選択する際は、ローカライズについても考慮してください。地域によっては、セパレータにカンマ（,）ではなく、ドット（.）を使用することもあります。


###  データリストで入力中に候補を表示する

`datalist` 要素は入力タイプではなく、フォーム フィールドに関連付けられた入力値の候補リストです。
これによってブラウザは、ユーザーの入力時に、オートコンプリート機能で入力候補を表示できます。
ユーザーが値を見つけるために長いリストをスキャンしなければならず、さらに入力内容が限定される選択要素とは異なり、`datalist` 要素ではユーザーの入力に応じて候補を表示できます。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

注:  <code>datalist</code> の値は候補として表示されますが、ユーザーは提示された内容以外も入力できます。

##  入力項目に適切なラベルと名前を付ける

モバイルでのフォーム入力は大変な作業です。最高のフォームとは、入力内容を最小限にしたフォームです。良いフォームは意味のある入力タイプを提供します。ユーザーの入力タイプに応じて表示するキーボードを変え、シーンによってはユーザーがカレンダー上の日付を選択できるようにします。ユーザーへの通知も必要です。検証ツールを使用して、フォームを送信する前に必要なことをユーザーに伝えましょう。


### TL;DR {: .hide-from-toc }
- フォームの入力項目には必ず  <code>label</code> を使用して、フォーカスが当たってる項目が見えるようにします。
-  <code>placeholder</code> を使用して、期待する入力する内容を例示します。
- ブラウザでフォームを自動補完するために、要素に既定の  <code>name</code> を使用し、 <code>autocomplete</code> 属性を含めます。


###  ラベルの重要性

`label` 要素は、フォーム要素で必要な情報をユーザに伝えます。
各 `label` は `label` 要素の内部に配置されることによって、あるいは 「`for`」属性を使用することによって、入力要素と関連付けられます。要素を形成するためにラベルを適用すると、タッチ ターゲットのサイズを改善するのに役立ちます。ユーザーがラベルまたは入力要素のいずれかをタッチすること、入力項目にフォーカスが当たります。



<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

###  ラベルのサイズと配置

ラベルと入力項目は、押しやすいように十分大きくなければなりません。縦向きのビューポートでは、フィールド ラベルは入力要素の上にあり、横向きのビューポートでは横に配置されます。フィールド ラベルと対応する入力ボックスが同時に表示されることを確認してください。カスタム スクロール ハンドラに注意してください。入力要素をページの先頭にスクロールしてラベルを隠したり、入力要素の下に配置されたラベルが仮想キーボードによって覆われることがあります。



###  プレースホルダの使用

プレースホルダ属性は、期待される入力内容をユーザーに示唆します。通常、ユーザーが入力を開始するまで、明るい色のテキストで値が表示されます。



<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


Warning: プレースホルダは、ユーザーが要素に入力を始めるとすぐに消えるため、ラベルの代わりにはなりません。プレースホルダは、入力すべき内容とその形式をユーザーに示すためのヒントとして使用してください。

###  オートコンプリートを有効にするためにメタデータを使用

ウェブ サイトで、名前、メールアドレス、その他の頻繁に使用されるフィールドに自動的に入力することによって、ユーザーの時間を節約します。これは潜在的な入力ミスを減らすのに役立ち、特に仮想キーボードや小さな端末で便利です。




ブラウザではヒューリスティクスを多用し、[ユーザーが以前に指定したデータに基づいて](https://support.google.com/chrome/answer/142893)[自動入力](https://support.google.com/chrome/answer/142893)が可能な項目を判断します。また、そのための情報として、各入力要素の
`name`
属性と `autocomplete`
属性をブラウザに伝えることができます。


注: Chrome では、自動入力を有効にするために、`input` 要素を `<form>` タグで囲む必要があります。
`form` タグで囲まれていない場合、Chrome によって候補は提示されますが、フォーム入力は完了**しません**。


たとえば、ユーザー名、電子メールアドレス、電話番号を使用してフォームをオートコンプリートするようブラウザに伝えるには、次のようにします。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }



###  推奨入力 `name` および `autocomplete` 属性値

`autocomplete` 属性値は現在の [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/forms.html#autofill) の一部です。一般に使用される `autocomplete` 属性は以下のとおりです。

`autocomplete` 属性は **`shipping `**`given-name` または **`billing `**`street-address` などのセクション名を伴うことができます。ブラウザは、異なるセクションを継続的なフォームとしてではなく、個別にオートコンプリートします。

<table>
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
        <code>lname</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>name</code>（姓名）</li>
          <li><code>given-name</code>（名）</li>
          <li><code>additional-name</code>（ミドルネーム）</li>
          <li><code>family-name</code>（姓）</li>
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
          <li>アドレスを 1 つ入力:
<ul>
              <li><code>street-address</code></li>
            </ul>
          </li>
          <li>アドレスを 2 つ入力:
<ul>
              <li><code>address-line1</code></li>
              <li><code>address-line2</code></li>
            </ul>
          </li>
          <li><code>address-level1</code>（州または県）</li>
          <li><code>address-level2</code>（市）</li>
          <li><code>postal-code</code>（郵便番号）</li>
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
    <tr>
      <td data-th="Content type">ユーザー名</td>
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
      <td data-th="Content type">パスワード</td>
      <td data-th="name attribute">
        <code>password</code>
      </td>
      <td data-th="autocomplete attribute">
        <ul>
          <li><code>current-password</code>（サインイン フォーム）</li>
          <li><code>new-password</code>（サインアップおよびパスワード変更フォーム）</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>


注:  <code>street-address</code> のみ、または  <code>address-line1</code> と  <code>address-line2</code> の両方を使用します。 <code>address-level1</code> と  <code>address-level2</code> は、住所形式に必要な場合にのみ使用します。


###  `autofocus` 属性

Google のホームページなどのフォームで、ユーザーが特定のフィールドだけを入力する場合などは、`autofocus` 属性を追加できます。設定した場合、デスクトップ ブラウザはすぐに入力フォールドにフォーカスを移動し、ユーザーが簡単にすばやくフォームの使用を開始できるようにします。モバイル ブラウザは `autofocus` 属性を無視し、キーボードがランダムに表示されるのを防止します。



オートフォーカス属性を使用する際には注意してください。キーボード フォーカスを妨げ、ナビゲーションにバックスペース文字が使用されるのを潜在的に防止するためです。




    <input type="text" autofocus ...>
    


##  リアルタイム検証のサポート

リアルタイム データ検証は、データを明確に保つだけではなく、ユーザー エクスペリエンスを改善するのにも役立ちます。最近のブラウザにはリアルタイム データ検証の実施に役立つ複数のツールが組み込まれており、ユーザーが無効なフォームを送信するのを回避することができます。フォームが正しく記入されたかどうかを示すには、視覚的な指示を使用する必要があります。


### TL;DR {: .hide-from-toc }
-  <code>pattern</code>、 <code>required</code>、 <code>min</code>、 <code>max</code> などのブラウザに組み込まれた検証属性を活用します。
- より複雑な検証要件には、JavaScript と Constraints Validation API を使用します。
- リアルタイムで検証エラーを表示し、ユーザーが無効なフォームを送信しようとした際は、修正が必要な項目をすべて表示します。


###  入力内容の検証に使用する属性

####  `pattern` 属性

`pattern` 属性で、入力項目の検証に使用する[正規表現](https://en.wikipedia.org/wiki/Regular_expression)を指定します。
たとえば、米国の郵便番号（5 桁の数字。そのあとにダッシュと 4 桁の数字が続く場合もある）を検証するには、`pattern`
を次のように指定します。



    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

#####  一般的な正規表現パターン

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">正規表現</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Description">住所</td>
      <td data-th="Regular expression"><code>[a-zA-Z\d\s\-\,\#\.\+]+</code></td>
    </tr>
    <tr>
      <td data-th="Description">郵便番号（US）</td>
      <td data-th="Regular expression"><code>^\d{5,6}(?:[-\s]\d{4})?$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP アドレス（IPv4）</td>
      <td data-th="Regular expression"><code>^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP アドレス（IPv6）</td>
      <td data-th="Regular expression"><code>^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]).){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$</code></td>
    </tr>
    <tr>
      <td data-th="Description">IP アドレス（両方）</td>
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

####  `required` 属性

`required` 属性が存在する場合は、フォームを送信する前に、フィールドに値が含まれている必要があります。
たとえば、郵便番号を必須にするには、単純に required 属性を追加します。



    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>
    

####  `min`、`max` および `step` 属性

数値や範囲のような数値入力タイプ、および日付や時刻の入力については、最小値と最大値を指定できるほか、スライダまたはスピンボールで調整されるときの増減刻み値を設定することができます。たとえば、靴のサイズの入力については、最小サイズを 1、最大サイズを 13、刻み値を 0.5 に設定します。




    <input type="number" min="1" max="13" step="0.5" ...>
    

####  `maxlength` 属性

`maxlength` 属性を使用すると、入力またはテキストボックスの最大長を指定できます。この属性は、ユーザが入力できる情報の長さを制限する場合に便利です。たとえば、ファイル名の長さを 12 文字に制限する場合は、次のようにします。



    <input type="text" id="83filename" maxlength="12" ...>
    

####  `minlength` 属性

`minlength` 属性を使用すると、入力またはテキストボックスの最小長を指定できます。この属性は、ユーザが入力する必要のある最小長を指定する場合に便利です。たとえば、ファイル名の最小長を 8 文字と指定する場合は、次のようにします。



    <input type="text" id="83filename" minlength="8" ...>
    

####  `novalidate` 属性

フォームに無効な入力が含まれている場合でも、フォームの送信をユーザに許可したい場合があります。
その場合は、フォーム要素、または個々の入力フィールドに `novalidate` 属性を追加します。
その場合、すべての疑似クラスと JavaScript API では、依然としてフォームが正しいかどうかをチェックできます。



    <form role="form" novalidate>
      <label for="inpEmail">メールアドレス</label>
      <input type="email" ...>
    </form>
    


ポイント: データの一貫性とセキュリティを確保するために、クライアント側の入力検証においても、必ずサーバ側でデータを検証を行うことが重要です。

###  JavaScript を使用した複雑なリアルタイム検証

組み込みの検証機能と正規表現で十分でない場合は、[Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation) を使用できます。これは独自の検証を制御するための強力なツールです。この API を使用すると、独自のエラーの設定や、要素が有効かどうかのチェックなどの処理を実行でき、要素が無効である理由を判定できます。



<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">制約の検証</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="API"><code>setCustomValidity()</code></td>
      <td data-th="Description">カスタム検証メッセージ、および  <code>ValidityState</code> オブジェクトの  <code>customError</code> プロパティを  <code>true</code> に設定します。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validationMessage</code></td>
      <td data-th="Description">入力内容が検証テストに通らなかった理由を示す文字列を返します。</td>
    </tr>
    <tr>
      <td data-th="API"><code>checkValidity()</code></td>
      <td data-th="Description">要素がすべての制約を満たす場合は  <code>true</code> を返し、それ以外の場合は  <code>false</code> を返します。チェックで  <code>false</code> が返されたときにページがどのように応答するかを決めるのは、デベロッパーの作業です。</td>
    </tr>
    <tr>
      <td data-th="API"><code>reportValidity()</code></td>
      <td data-th="Description">要素がすべての制約を満たす場合は  <code>true</code> を返し、それ以外の場合は  <code>false</code> を返します。ページから  <code>false</code> が返される場合は、制約上の問題点がユーザーに報告されます。</td>
    </tr>
    <tr>
      <td data-th="API"><code>validity</code></td>
      <td data-th="Description">要素の有効性を表す  <code>ValidityState</code> オブジェクトを返します。</td>
    </tr>
  </tbody>
</table>



###  カスタム検証メッセージの設定

フィールドの検証でエラーが出た場合は、`setCustomValidity()` を使用してフィールドを無効とマークし、フィールドがエラーになった理由を説明します。
たとえば、サインアップ フォームでは、ユーザーに電子メールアドレスを 2 回入力させることで、そのアドレスが正しいことを確認させます。
2 回目の入力時に blur イベントを使用して 2 つの入力内容を検証し、適切な応答メッセージを設定します。次に例を示します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

###  無効なフォームの送信禁止

フォームに無効なデータが入力されている場合に、すべてのブラウザがユーザによるフォームの送信を禁止するわけではないため、送信イベントを捕捉し、フォーム要素で `checkValidity()` を使用して、フォームが有効かどうかを判定する必要があります。

次に例を示します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }

###  フィードバックのリアルタイム表示

ユーザがフォームを送信する前に、フォームが正しく入力されたかどうかを示す視覚的指示を各フィールドで提示すると便利です。HTML5 には複数の新しい疑似クラスも用意されています。これらのクラスを使用すると、入力値または属性に基づいて入力をスタイル化できます。




<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">リアルタイムのフィードバック</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Pseudo-class"><code>:valid</code></td>
      <td data-th="Use">入力値がすべての検証要件を満たすときに、入力要素に使用するスタイルを明示的に設定します。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:invalid</code></td>
      <td data-th="Use">入力値がすべての検証要件を満たさないときに、入力要素に使用するスタイルを明示的に設定します。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:required</code></td>
      <td data-th="Use">required 属性が設定された入力要素のスタイルを明示的に設定します。</td>
    </tr>
    <tr>
      <td data-th="Pseudo-class"><code>:optional</code></td>
      <td data-th="Use">required 属性が設定されていない入力要素のスタイルを明示的に設定します。</td>
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

検証は即座に実行されます。つまり、ページがロードされた直後で、ユーザーがまだフィールドに入力する機会がなくても、フィールドが無効とマークされる可能性があります。また、ユーザーが入力している最中に、無効なスタイルだと表示されることがあります。これを避けるために、CSS と JavaScript を組み合わせて、ユーザーがフィールドを操作したときのみ、無効なスタイルであることを表示することができます。


<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ux/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/input/forms/order.html){: target="_blank" .external }


ポイント: 問題点は 1 つずつ表示せずに、フォーム上のすべての問題をまとめてユーザーに表示してください。




{# wf_devsite_translation #}
