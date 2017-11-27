project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 最初の HTML が安全な HTTPS 接続で読み込まれ、その他のリソースが安全ではない HTTP 接続で読み込まれると、混合コンテンツが発生します。

{# wf_updated_on:2016-08-24 #}
{# wf_published_on:2015-09-25 #}

# 混合コンテンツとは {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

最初の HTML が安全な HTTPS 接続で読み込まれ、その他のリソース（画像、動画、スタイルシート、スクリプトなど）が安全ではない HTTP 接続で読み込まれると、**混合コンテンツ**が発生します。
これが混合コンテンツと呼ばれるのは、同じページを表示するために HTTP と HTTPS 両方のコンテンツが読み込まれているためで、最初のリクエストは HTTPS で保護されています。
最新のブラウザでは、この種のコンテンツに関する警告が表示され、このページに安全でないリソースが含まれていることがユーザーに示されます。



### TL;DR {: .hide-from-toc }

* HTTPS は、サイトとユーザーの両方を攻撃から保護するために重要です。
* 混合コンテンツは、HTTPS サイトのセキュリティとユーザー エクスペリエンスを低下させます。

##  リソース リクエストとウェブブラウザ

ブラウザがウェブサイト ページにアクセスすると、ブラウザは HTML リソースをリクエストします。これに対してウェブサーバーは HTML コンテンツを返し、ブラウザはこれを解析して、ユーザーに表示します。多くの場合、完全なページを表示するには単一の HTML ファイルでは不十分です。このため、HTML ファイルにはその他のリソースへの参照が含まれますが、これをブラウザがリクエストする必要があります。これらのサブリソースには、画像、動画、追加の HTML、CSS、JavaScript などがあり、それぞれ個別のリクエストを使用して取得されます。 

## HTTPS のメリット

ブラウザは HTTPS（HTTP Secure の略）でリソースをリクエストする場合、暗号化された接続を使用してウェブサーバーと通信します。


HTTPS を使用すると、主に次の 3 つのメリットがあります。

* 認証
* データの整合性
* 秘密保護

### 認証

アクセスしているウェブサイトは、本当に相手が名乗っているとおりのウェブサイトでしょうか。 

HTTPS を使用する場合、ブラウザは、正しいウェブサイトを開いており、悪意のあるサイトにリダイレクトされていないことを確認します。
銀行のウェブサイトにアクセスした場合、ブラウザはそのウェブサイトを認証し、攻撃者が銀行になりすましてログイン認証情報を盗むことを防ぎます。

 

### データの整合性

送受信しているコンテンツをだれかが改ざんしていないでしょうか。 

HTTPS を使用する場合、ブラウザは、受信したデータが攻撃者によって変更されている場合はこれを検出します。
これにより、銀行のウェブサイトを使って送金する場合に、リクエストの送信中に宛先の口座番号が攻撃者によって変更されることが防止されます。

 

### 秘密保護

送受信しているコンテンツを誰かに見られないでしょうか。

HTTPS によって、攻撃者は、ブラウザのリクエストを盗聴したり、アクセス先のウェブサイトを追跡したり、送受信された情報を盗んだりすることができなくなります。
 

### HTTPS、TLS、および SSL

HTTPS は、HTTP Secure、つまり Hyper(t)ext Transfer Protocol Secure の略です。この **secure**（安全）の部分は、ブラウザによって送受信されるリクエストが暗号化されることを意味します。
現在、ほとんどのブラウザは TLS プロトコルを使用して暗号化を提供しています。**TLS** は SSL と呼ばれることもあります。
 

HTTPS、TLS、および SSL の詳細についてはこの記事では取り上げませんが、詳細を知りたい場合は、以下のリソースから始めるとよいでしょう。


* [Wikipedia HTTPS](https://en.wikipedia.org/wiki/HTTPS){: .external}
* [Wikipedia TLS](https://en.wikipedia.org/wiki/Transport_Layer_Security){: .external}
* [Khan Academy の暗号コース](https://www.khanacademy.org/computing/computer-science/cryptography){: .external}
* [『High Performance Browser Networking』](http://chimera.labs.oreilly.com/books/1230000000545){: .external}の [TLS の章](http://chimera.labs.oreilly.com/books/1230000000545/ch04.html){: .external}（Ilya Grigorik 著） 

## 混合コンテンツにより HTTPS の効果が弱まる

安全でない HTTP プロトコルを使用してサブリソースをリクエストすると、ページ全体のセキュリティが低下します。これは、このようなリクエストが **man-in-the-middle 攻撃**に対して脆弱であるためです。この攻撃では、攻撃者がネットワーク接続を盗聴して、2 人の関係者間の通信を表示または変更します。
多くの場合、攻撃者はこれらのリソースを使用することにより、侵害されたリソースだけでなく、ページ全体を制御できるようになります。

 

多くのブラウザでユーザーに混合コンテンツの警告が報告されますが、報告されたときには手遅れです。安全でないリクエストは既に実行され、ページのセキュリティが侵害されています。
このような状況は、残念なことにウェブでは非常によく見られます。この理由から、すべての混合リクエストを単にブロックすることはできません。ブロックすると多数のサイトの機能が制限されてしまいます。



<figure>
  <img src="imgs/image-gallery-warning.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でない画像がリクエストされました。このコンテンツも HTTPS 経由で提供する必要があります。">
  <figcaption>
    アプリケーションで混合コンテンツの問題を解決するかは、デベロッパーの判断に委ねられています。
</figcaption>
</figure>

### 単純な例

HTTPS ページから安全でないスクリプトを読み込みます。

このサンプルページを **HTTPS**&mdash; 経由で表示すると（[**https**://googlesamples.github.io/web-fundamentals/.../simple-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: .external}&mdash;）、混合コンテンツを読み込もうとする **HTTP** スクリプトタグが含まれています。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/simple-example.html" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/simple-example.html){: target="_blank" .external }

この例では、スクリプト `simple-example.js` が **HTTP** URL で読み込まれます。これが混合コンテンツの最も単純な例です。ブラウザが `simple-example.js` ファイルをリクエストすると、攻撃者は返されたコンテンツにコードを注入して、ページ全体を制御できるようになります。
 

幸いなことに、ほとんどの最新ブラウザでは、この種の危険なコンテンツは既定でブロックされます。
[混合コンテンツに対するブラウザの動作](#browser-behavior-with-mixed-content){: .external}を参照してください。

<figure>
  <img src="imgs/simple-mixed-content-error.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でないスクリプトがリクエストされました。このリクエストはブロックされました。コンテンツは HTTPS 経由で提供する必要があります。">
  <figcaption>Chrome により安全でないスクリプトがブロックされます。</figcaption>
</figure>

### XMLHttpRequest の例

XMLHttpRequest で安全でないデータを読み込みます。

このサンプルページを **HTTPS**&mdash; 経由で表示すると（[**https**://googlesamples.github.io/web-fundamentals/.../xmlhttprequest-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: .external}）、混合コンテンツの `JSON` データを取得する **HTTP** 経由の `XMLHttpRequest` が含まれています。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/xmlhttprequest-example.html" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/xmlhttprequest-example.html){: target="_blank" .external }

この場合、**HTTP** URL が JavaScript で動的に作成され、最終的に `XMLHttpRequest` によって安全でないリソースを読み込むために使用されます。
上記の単純な例のように、ブラウザが `xmlhttprequest-data.js` ファイルをリクエストすると、攻撃者は返されたコンテンツにコードを注入して、ページ全体を制御できるようになります。

ほとんどの最新ブラウザでは、このような危険なリクエストもブロックされます。

<figure>
  <img src="imgs/xmlhttprequest-mixed-content-error.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でない XMLHttpRequest エンドポイントがリクエストされました。このリクエストはブロックされました。コンテンツは HTTPS 経由で提供する必要があります。">
  <figcaption>Chrome により安全でない XMLHttpRequest がブロックされます。</figcaption>
</figure>

### 画像ギャラリーの例

jQuery ライトボックスに安全でない画像を読み込みます。

このサンプルページを **HTTPS**&mdash; 経由で表示すると（[**https**://googlesamples.github.io/web-fundamentals/.../image-gallery-example.html](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: .external}&mdash;）、最初は混合コンテンツの問題はありませんが、サムネイル画像がクリックされたときに、フルサイズの混合コンテンツの画像が **HTTP** 経由で読み込まれます。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/image-gallery-example.html" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html){: target="_blank" .external }

画像ギャラリーでは一般に、`<img>` タグの `src` 属性を利用してページにサムネイル画像を表示し、ギャラリーにオーバーレイ表示するフルサイズの画像を読み込むためにはアンカー（`<a>`）タグの `href` 属性が使用されます。
通常は `<a>` タグによって混合コンテンツが生じることはありませんが、この場合は、jQuery コードによって新しいページに移動するという既定のリンク動作がオーバーライドされ、代わりにこのページに **HTTP** 画像が読み込まれます。


 

<figure>
  <img src="imgs/image-gallery-warning.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でない画像がリクエストされました。このコンテンツも HTTPS 経由で提供する必要があります。">
</figure>

安全でない画像はサイトのセキュリティを低下させますが、その他の種類の混合コンテンツほど危険ではありません。
最新ブラウザでは混合コンテンツの画像は引き続き読み込まれますが、ユーザーへの警告も表示されます。
 

## 混合コンテンツの種類と関連するセキュリティ上の脅威

混合コンテンツには、アクティブとパッシブの 2 種類があります。 

**パッシブな混合コンテンツ**とは、ページの残りの部分と対話しないコンテンツのことです。そのため man-in-the-middle 攻撃は、攻撃者がそのコンテンツを傍受または変更した場合に実行できる操作に限定されます。
パッシブな混合コンテンツには、画像、動画、音声コンテンツと、ページの残りの部分と対話できないその他のリソースが含まれます。

  

**アクティブな混合コンテンツ**は、ページ全体に関係するため、攻撃者はそのページに対してほぼあらゆる操作を実行できます。
アクティブな混合コンテンツには、スクリプト、スタイルシート、iframe、Flash リソースと、ブラウザがダウンロードして実行できるその他のコードが含まれます。



### パッシブな混合コンテンツ

パッシブな混合コンテンツであっても、サイトとそのユーザーにセキュリティ上の脅威をもたらします。
たとえば、攻撃者はサイトの画像に対する HTTP リクエストを傍受して、それらの画像を入れ替えたり、置き換えたりすることができます。攻撃者が保存ボタンと削除ボタンの画像を入れ替えた場合、ユーザーは意図せずコンテンツを削除することになります。製品の図をわいせつなコンテンツや性的なコンテンツで置き換えた場合、サイトの評判が損なわれます。製品の写真を別のサイトや製品の広告で置き換えることもあります。



 

攻撃者がサイトのコンテンツを改ざんしなくても、攻撃者が混合コンテンツ リクエストを使用してユーザーを追跡できるという、重大なプライバシーの問題があります。
攻撃者は、ブラウザにより読み込まれる画像などのリソースに基づいて、ユーザーがアクセスしたページや表示した製品を知ることができます。


次に、パッシブな混合コンテンツの例を示します。 

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/passive-mixed-content.html" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){: target="_blank" .external }

ほとんどのブラウザでは、まだこの種の混合コンテンツがユーザーに表示されますが、これによってサイトとユーザーにセキュリティとプライバシーのリスクが生じるため、警告も表示されます。

 

<figure>
  <img src="imgs/passive-mixed-content-warnings.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でない動画がリクエストされました。このコンテンツも HTTPS 経由で提供する必要があります。">
  <figcaption>Chrome JavaScript コンソールからの混合コンテンツの警告。</figcaption>
</figure>

### アクティブな混合コンテンツ

アクティブな混合コンテンツは、パッシブな混合コンテンツより大きな脅威をもたらします。攻撃者はアクティブなコンテンツを傍受して書き換えることができるため、ページや場合によってはウェブサイト全体を完全に制御できるようになります。
これにより攻撃者は、ページに関するあらゆるものを変更できます。たとえば、まったく異なるコンテンツを表示したり、ユーザーのパスワードやその他のログイン認証情報を盗んだり、ユーザーのセッション Cookie を盗んだり、ユーザーをまったく異なるサイトにリダイレクトしたりすることができます。


 

この脅威の深刻さから、多くのブラウザがユーザーを保護するためにこの種のコンテンツを既定でブロックしていますが、その機能はブラウザのベンダーとバージョンによって異なります。



以下に、アクティブな混合コンテンツの例を示します。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/security/prevent-mixed-content/_code/active-mixed-content.html" adjust_indentation="auto" %}
</pre>

[サンプルを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){: target="_blank" .external }

<figure>
  <img src="imgs/active-mixed-content-errors.png" alt="混合コンテンツ:ページは HTTPS 経由で読み込まれましたが、安全でないリソースがリクエストされました。このリクエストはブロックされました。コンテンツは HTTPS 経由で提供する必要があります。">
  <figcaption>Chrome JavaScript コンソールからの混合コンテンツのエラー。</figcaption>
</figure>

## 混合コンテンツに対するブラウザの動作

前述した脅威があるため、ブラウザですべての混合コンテンツをブロックすることが理想的です。
ただし、そうすると、何百万人ものユーザーが毎日利用している多数のウェブサイトが台無しになってしまいます。
現時点の妥協点は、最も危険な種類の混合コンテンツをブロックし、危険性が少ないものについては引き続きリクエストを許可するというものです。

 

最新のブラウザは、[混合コンテンツの仕様](https://w3c.github.io/webappsec/specs/mixedcontent/){: .external }に従っています。この仕様では、[**任意でブロック可能なコンテンツ**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-optionally-blockable){: .external}と[**ブロック可能なコンテンツ**](https://w3c.github.io/webappsec/specs/mixedcontent/#category-blockable){: .external}のカテゴリが定義されています。 

仕様から、リソースが任意でブロック可能なコンテンツと見なされるのは、「混合コンテンツとしての使用を許可するリスクよりも、ウェブの大部分が損なわれるリスクの方が大きい場合」です。これは、前述した[パッシブな混合コンテンツ](#passive-mixed-content) カテゴリのサブセットです。
この記事の執筆時には、画像、動画、音声リソースとプリフェッチされたリンクのみが、任意でブロック可能なコンテンツに含まれるリソースの種類です。
このカテゴリは、時間の経過とともに縮小すると考えられます。


**任意でブロック可能**でないすべてのコンテンツは**ブロック可能**であると見なされ、ブラウザによりブロックされます。
 

### ブラウザのバージョン

ウェブサイトにアクセスするすべてのユーザーが最新のブラウザ使用しているとは限らないと認識しておくことが重要です。
ブラウザ ベンダーやバージョンごとに、混合コンテンツに対する動作がそれぞれ異なっています。
混合コンテンツをまったくブロックないブラウザとバージョンもあります。これはユーザーにとって非常に危険です。
 

各ブラウザの具体的な動作は絶えず変化しているので、ここでは詳細に説明しません。
特定のブラウザの動作を知りたい場合は、そのベンダーが公開している情報を直接ご覧ください。
 

注: ウェブサイトにアクセスする際、ユーザーは、サイトの運営者による保護を期待しています。古いブラウザを使用しているユーザーも含め、<b>すべて</b>の訪問者を保護するためには、混合コンテンツの問題を解決することが重要です。




{# wf_devsite_translation #}
