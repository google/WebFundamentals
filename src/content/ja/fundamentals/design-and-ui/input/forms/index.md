project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: フォームをモバイルに記入するのは困難です。 最高のフォームは入力の数が最も少ないものです。

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-04-30 #}

# Create Amazing Forms {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="iYYHRwLqrKM"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

フォームをモバイルに記入するのは困難です。 最高のフォームは入力の数が最も少ないものです。 良いフォームは意味のある入力タイプを提供します。 キーはユーザーの入力タイプと一致するように変更する必要があります。ユーザーはカレンダー上の日付を選択します。 ユーザーに通知してください。 検証ツールは、フォームを送信する前に必要なことをユーザーに伝える必要があります。

見栄えの良いフォームの作成について説明したこれらのガイドの概要については、下のビデオをチェックしてください。

<div class="clearfix"></div>

## Design efficient forms 


繰り返しのアクションを回避し、必要な情報のみを要求し、どこまでマルチ パート フォームに沿うかを示すことによってユーザーをガイドすることにより、効率的なフォームを設計します。


### TL;DR {: .hide-from-toc }
- 既存のデータを使用して、フィールドに事前設定し、オートフィルを有効にします。
- ユーザーがマルチ パート フォームを活用できるよう、明確にラベル付けされたプログレス バーを使用します。
- 視覚的なカレンダーを提供し、ユーザーがサイトから離れてスマートフォンのカレンダー アプリにジャンプする必要をなくします。


### 繰り返しアクションとフィールドを最小限に抑える

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

### ユーザーに進捗状況を示す

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


### 日付を選択するための視覚的カレンダーを提供

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




## Choose the best input type 



正しい入力タイプを使用して情報の入力を効率化します。 ユーザーは、電話番号を入力する際に自動的にナンバー パッドが表示されるか、入力するにつれて自動的に現在のフィールドを進めるウェブサイトを評価します。 フォーム上でで無駄なタップを排除するようにしてください。


### TL;DR {: .hide-from-toc }
- データ入力を簡単にするための最も適切な入力タイプを選択します。
- <code>datalist</code> 要素でユーザーが入力できる提案をします。


#### HTML5 入力タイプ

HTML5 は多くの新しい入力タイプを導入しました。 これらの新しい入力タイプは、
画面上のキーボードに表示するキーボード レイアウトの
種類について、ブラウザにヒントを与えます。  ユーザーはキーボードを変更せず、
入力タイプの適切なキーを見るだけで、
必要な情報をより簡単に入力することができます。

<table>
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

#### データリストで入力中に候補を示す

`datalist` 要素は入力タイプではなく、入力値の候補のリストであり、
フォーム フィールドに関連付けられています。 これによって、ブラウザがユーザー タイプとして
オートコンプリートのオプションを提案することができます。 ユーザーが値を見つけるために長いリストを
スキャンしなければならないような選択要素とは異なり、`datalist` 
要素はユーザー タイプに応じてヒントを提要します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="datalist" adjust_indentation="auto" %}
</pre>

Note: <code>datalist</code> の値は候補として提供され、ユーザーは提供された提案に限定されるものではありません。

## Label and name inputs properly

フォームをモバイルに記入するのは困難です。 最高のフォームは入力の数が最も少ないものです。 良いフォームは意味のある入力タイプを提供します。 キーはユーザーの入力タイプと一致するように変更する必要があります。ユーザーはカレンダー上の日付を選択します。 ユーザーに通知してください。 検証ツールは、フォームを送信する前に必要なことをユーザーに伝える必要があります。

#### ラベルの重要性

`label` 要素は、フォーム要素で
必要な情報をユーザに提供します。  各 `label` は`label` 要素の内部に配置されることによって、あるいは"`for`"
属性を使用することによって、
入力要素と関連付けられます。  要素を形成するためにラベルを適用すると、タッチ目標のサイズを
改善するのに役立ちます。
tユーザーは、入力要素にフォーカスを配置するためにラベルまたは入力のいずれかをtタッチすることができます。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="labels" adjust_indentation="auto" %}
</pre>

#### ラベルのサイズと配置

ラベルと入力はにプレスを簡単にできるように十分大きくなければなりません。  縦向きのビューポートでは、
フィールド ラベルは入力要素の上にあり
横向きでは横に配置されます。  フィールド ラベルと対応する入力ボックスが同時に表示されることを
確認してください。  カスタム スクロール ハンドラに注意してください。入力要素をページの
先頭にスクロールしてラベルを隠したり、入力要素の下に
配置されたラベルがが仮想キーボードによって覆われることがあります。

#### プレースホルダの使用

プレースホルダー属性は、入力に期待されているものについてユーザーにヒントを提供します。
通常、ユーザーが入力を開始するまで、
明るいテキストで値を表示します。

<input type="text" placeholder="MM-YYYY">


    <input type="text" placeholder="MM-YYYY" ...>


Note: プレースホルダーは、ユーザーが要素内に入力を開始するとすぐに消えます。つまり、ラベルの交換はありません。  これらは、必要な形式とコンテンツについてユーザーを支援するための 補助として使用します。


#### オートコンプリートを有効にするためにメタデータを使用

ウェブ サイトで、名前、メールアドレス、その他の頻繁に使用されるフィールドに
自動的に入力することによって、ユーザーの時間を節約します。
これは潜在的な入力ミスを減らすのに役立ち、
特に仮想キーボードや小さな端末で便利です。

ブラウザは、[auto-populate](https://support.google.com/chrome/answer/142893) [based on previously specified data by the user](https://support.google.com/chrome/answer/142893) 
を判断するために多くのヒューリスティックを使用します。
また、属性と各入力要素のオートコンプリート属性の両方を提供することで、
ブラウザにヒントを与えることができます。

たとえば、ユーザー名、電子メールアドレス、電話番号を使用してフォームを
オートコンプリートするブラウザにヒントを与えるには、次のように使用します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="autocomplete" adjust_indentation="auto" %}
</pre>

#### 推奨入力`name` および `autocomplete` 属性値


`autocomplete` 属性値は現在の [WHATWG HTML Standard](https://html.spec.whatwg.org/multipage/forms.html#autofill) の一部です。 一般に使用される `autocomplete` 属性は以下のとおりです。

`autocomplete` 属性は**`shipping `**`given-name` または **`billing `**`street-address`などのセクション名を伴うことができます。 ブラウザは、継続的なフォームではなく、異なるセクションを個別にオートコンプリートします。

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

Success: <code>street-address</code> のみか、 <code>address-line1</code> と <code>address-line2</code> の両方を使用してください <code>address-level1</code> および <code>address-level2</code> は、アドレス形式に必要な場合にのみ使用します。

#### `autofocus` 属性

Google のホームページなどのフォームで、ユーザーが特定の
フィールドだけを入力する場合など、`autofocus` 
属性を追加できます。  設定した場合、デスクトップ ブラウザはすぐに入力フォールドにフォーカスを移動し、
ユーザーが簡単にすばやくフォームの使用を開始できるようにします。  モバイル ブラウザは
 `autofocus` 属性を無視し、キーボードがランダムに
表示されるのを防止します。

オートフォーカス属性を使用する際には注意してください。
キーボード フォーカスを妨げ、ナビゲーションに使用されるのバックスペース文字
を潜在的に防止するためです。


    <input type="text" autofocus ...>

## リアルタイム検証の実施

#### これらの属性を使用して、入力を検証します。

##### `pattern` 属性

`pattern` 属性は、
入力フィールドの検証に使用される [正規
表現](http://en.wikipedia.org/wiki/Regular_expression) を指定します。 たとえば、米国の郵便番号 (5 桁の後に
ダッシュと追加の 4 桁が続く場合がある) を検証するには、`pattern` を
次のように設定します。

    <input type="text" pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>

###### 一般的な正規表現パターン

<table>
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

##### `required` 属性

`required` 属性が存在する場合は、
フォームを送信する前に、フィールドに値が含まれている必要があります。 たとえば、郵便番号を必須にするには、
単に必須属性を追加します。


    <input type="text" required pattern="^\d{5,6}(?:[-\s]\d{4})?$" ...>


##### `min`、`max` および `step` 属性

数値や範囲のような数値入力タイプ、および日付/時刻の入力については、
最小値と最大値を指定できるほか、
スライダまたはスピンボールによって調整されるときの増減刻み値を設定することができます。  たとえば、
靴のサイズの入力については、最小サイズを 1、最大サイズを 13、
刻み値を 0.5 に設定します。


    <input type="number" min="1" max="13" step="0.5" ...>


##### `maxlength` 属性

`maxlength` 属性を使用すると、入力または
テキストボックスの最大長を指定できます。この属性は、
ユーザが指定できる情報の長さを制限する場合に便利です。 たとえば、ファイル名の長さを 12 文字に制限する場合は、
次のように使用できます。


    <input type="text" id="83filename" maxlength="12" ...>


##### `minlength` 属性

`minlength` 属性を使用すると、入力または
テキストボックスの最小長を指定できます。この属性は、
ユーザが入力する必要のある最小長を指定する場合に便利です。 たとえば、ファイル名の最小長を 
8 文字と指定する場合は、次のように使用できます。


    <input type="text" id="83filename" minlength="8" ...>


##### `novalidate` 属性

フォームに無効な入力が
含まれている場合でも、フォームの送信をユーザに許可したい場合があります。 そうするには、フォーム
要素、または個々の入力フィールドに `novalidate` 属性を追加します。 その場合、すべての疑似クラスと 
JavaScript API では、依然としてフォームが正しいかどうかをチェックできます。


    <form role="form" novalidate>
      <label for="inpEmail">Email address</label>
      <input type="email" ...>
    </form>

Note: クライアント側の入力検証においても、データの一貫性とセキュリティを確保するためにサーバー上のデータを検証することは常に重要です。

#### JavaScript を使用した複雑なリアルタイム検証

組み込みの検証機能と正規表現で十分でない場合は、
[Constraint Validation API](http://dev.w3.org/html5/spec-preview/constraints.html#constraint-validation) を使用できます。
これは独自の検証を制御するための強力なツールです。  この API を使用すると、
独自のエラーの設定や、要素が有効かどうかのチェックなどの処理を実行でき、
要素が無効である理由を判定できます。

<table>
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

##### カスタム検証メッセージの設定

フィールドが検証で失格になった場合は、`setCustomValidity()` を使用してフィールドを無効
とマークし、フィールドがエラーになった理由を説明します。  たとえば、サインアップ フォームでは、
ユーザに電子メール アドレスを 2 回入力させることで、そのアドレスが正しいことを確認させます。  2 回目の入力時に blur
 イベントを使用して 2 つの入力を検証し、適切な
応答メッセージを設定します。  例： 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="customvalidation" adjust_indentation="auto" %}
</pre>

##### 無効なフォームの送信の禁止

フォームに
無効なデータが入力されている場合に、すべてのブラウザがユーザによるフォームの送信を禁止するわけではないため、送信イベントを捕捉し、フォーム要素で `checkValidity()`
 を使用して、フォームが有効かどうかを判定する必要があります。  例： 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="preventsubmission" adjust_indentation="auto" %}
</pre>

#### フィードバックのリアルタイム表示

ユーザがフォームを送信する前に、
フォームが正しく入力されたかどうかを示す視覚的指示を各フィールドで提供するのが有用です。
HTML5 には複数の新しい疑似クラスも用意されています。これらのクラスを使用すると、入力値または属性に基づいて
入力をスタイル化できます。

<table>
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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="invalidstyle" adjust_indentation="auto" %}
</pre>
<pre class="prettyprint">
{% includecode content_path="web/fundamentals/design-and-ui/input/forms/_code/order.html" region_tag="initinputs" adjust_indentation="auto" %}
</pre>
Note: ユーザーに問題を 1 つずつ表示するよりも、フォーム上にすべての問題を一度に表示する必要があります。


