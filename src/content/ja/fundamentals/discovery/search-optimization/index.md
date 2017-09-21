project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ウェブサイトには、人間だけでなく、検索エンジンのウェブクローラもアクセスします。ここでは、検索の精度とウェブサイトのランキングを向上させる方法について説明します。

{# wf_updated_on:2015-10-05 #}
{# wf_published_on:2014-08-30 #}

# 検索の最適化 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

ウェブサイトには、人間だけでなく、検索エンジンのウェブクローラもアクセスします。ここでは、検索の精度とウェブサイトのランキングを向上させる方法について説明します。

### TL;DR {: .hide-from-toc }
- ウェブページの URL 構造を決定します。
- 最も推奨されるのはレスポンシブ デザインです。
- PC 向けサイトとモバイル向けサイトのそれぞれ対して、 <code>rel='canonical'</code> と  <code>rel='alternate'</code> を使用します。
- PC 向け HTML とモバイル向け HTML をそれぞれ動的に配信する 1 つの URL に対して、 <code>Vary HTTP</code> ヘッダーを使用します。
- URL を知っているユーザーのみがアクセスできるページに対して、 <code>noindex</code> を使用します。
- 非公開にしたいページに対しては適切な認証メカニズムを使用します。

##  検索エンジンにサイト構造を示す

マルチデバイス サイトのデザインでは、ウェブサイトが検索結果にどのように表示されるかが重要になります。このガイドでは、ウェブサイトの URL 構造に基づいて、検索エンジン向けにウェブサイトを最適化する方法について説明します。

レスポンシブ ウェブページの構築を計画していますか？URL の異なるモバイル専用サイトがありますか？
または、同じ URL で PC 版とモバイル版の両方を配信していますか？
これらのすべてのケースにおいて、検索エンジン向けにウェブサイトを最適化する方法が存在します。


###  サイトの URL 構造を決定する

異なる端末にコンテンツを配信する方法は複数あります。最も一般的な方法は次の 3 つです。


**レスポンシブ ウェブデザイン:** 1 つの URL から同じ HTML を配信し、CSS メディアクエリを使用して、クライアント側でのコンテンツのレンダリング方法を決定します。たとえば、PC とモバイルに共通の URL（http://www.example.com/）を使用します。



**別個のモバイルサイト:** ユーザー エージェントに応じて、異なる URL にユーザーをリダイレクトします。
たとえば、PC の場合は http://www.example.com/ にリダイレクトし、モバイルの場合は http://m.example.com/ にリダイレクトします。


**動的な配信:** ユーザー エージェントに応じて、1 つの URL で HTML の出し分けをします。
たとえば、PC とモバイルに共通の URL（http://www.example.com/）を使用します。

最適なアプローチは**レスポンシブ ウェブデザイン**を採用することですが、多くのウェブサイトでは他の方法が使用されています。
 
自身のウェブページに適した URL 構造を採用してください。構造を決定したら、それぞれのベスト プラクティスを検討して、検索エンジン向けにウェブサイトを最適化します。


###  推奨: レポンシブ ウェブデザイン

ウェブサイトをレスポンシブにするメリットは次のとおりです。

<img class="attempt-right" src="imgs/responsive-2x.png" srcset="imgs/responsive.png 1x, imgs/responsive-2x.png 2x" >

* ユーザーによる共有が簡単。
* リダイレクトが不要で、ページをすばやく読み込める。
* 1 つの URL で検索結果に表示される。

<div style="clear:both;"></div>
  
レスポンシブ ウェブデザインを採用したウェブサイトの構築方法については、[レスポンシブ ウェブデザインの基本](/web/fundamentals/design-and-ux/responsive/)をご覧ください。

###  各 URL での配信に `link[rel=canonical]` と `link[rel=alternate]` を使用する

異なる URL で、PC 用とモバイル用に類似したコンテンツを配信すると、それらのコンテンツが同一のものか判断が難しくなり、ユーザーと検索エンジンの両方において混乱を招く可能性があります。そのため、以下を明示する必要があります。

* 2 つの URL のコンテンツが同一であること。
* どちらがモバイル版か。
* どちらが PC 版（正規）か。

これらの情報を明示すると、検索エンジンでコンテンツが適切にインデックス登録されるようになり、ユーザーは使用端末に対応した形式で、求めるコンテンツを見つけることができます。


####  PC 版での alternate 属性の使用

PC 版を配信するときは、rel="alternate" 属性を指定した `link` タグ（`href` 属性でモバイル版を示唆する）を追加して、別の URL にモバイル版が存在することを示します。



[http://www.example.com/](http://www.example.com/){: .external } HTML


    <title>...</title>
    <link rel="alternate" media="only screen and (max-width: 640px)" href="http://m.example.com/">
    

####  モバイル版での canonical 属性の使用

モバイル版を配信するときは、`rel="canonical"` 属性を指定した
`link` タグ（`href` 属性で PC 版を示唆する）を追加して、別の URL に PC 版（正規）が存在することを示します。
`media` 属性を追加して `"only screen and (max-width: 640px)"` を値として指定し、モバイル版が小さな画面専用であることを検索エンジンが認識できるようにします。


[http://m.example.com/](http://m.example.com/){: .external } HTML


    <title>...</title>
    <link rel="canonical" href="http://www.example.com/">
    
  
<img src="imgs/different_url-2x.png" srcset="imgs/different_url.png 1x, imgs/different_url-2x.png 2x" >

###  Vary HTTP ヘッダーの使用

端末の種別に応じて異なる HTML を配信すると、不要なリダイレクトが減少し、最適化された HTML が配信され、検索エンジンに単一の URL が提供されます。
ただし、次のようなデメリットもあります。


* ユーザーのブラウザとサーバーの間に中間プロキシがある場合があります。そのため、ユーザー エージェントによってコンテンツが異なることをプロキシ側が認識していないと、予期しない結果が生じる可能性があります。


* ユーザー エージェントに応じてコンテンツを出し分けると、「[クローキング](https://support.google.com/webmasters/answer/66355)」であると見なされるリスクがあります。クローキングは、Google のウェブマスター向けガイドラインに違反しています。



コンテンツがユーザー エージェントによって異なることを検索エンジンに示すことで、クエリを送信するユーザー エージェントに対して、検索結果を最適化することができます。


ユーザー エージェントに応じて、URL から別々の HTML を配信することを示すには、HTTP ヘッダーに `Vary: User-Agent` を追加します。
これにより、検索インデックス処理で PC 版とモバイル版が別々に扱われ、中間プロキシがこれらのコンテンツを適切にキャッシュできるようになります。



[http://www.example.com/](http://www.example.com/){: .external } HTTP Header


    HTTP/1.1 200 OK
    Content-Type: text/html
    Vary: User-Agent
    Content-Length: 5710
    

<img src="imgs/same_url-2x.png" srcset="imgs/same_url.png 1x, imgs/same_url-2x.png 2x" >

PC およびモバイル向けの URL 構造を構築する詳細な方法については、[スマートフォン向けに最適化されたウェブサイトの構築](/webmasters/smartphone-sites/)をご覧ください。


##  検索エンジンのクロールとインデックス登録を制御する

検索エンジンに適切にリストアップされることは、ウェブサイトを世界中に配信するうえで重要ですが、設定が不適切であると、検索結果に予期しないコンテンツが含まれる可能性があります。このセクションでは、このような問題を回避するために、クローラの動作とウェブサイトのインデックス登録の仕組みについて説明します。


ウェブは情報共有に最適な場所です。ドキュメントを公開すると、世界中でそのドキュメントが即座に利用可能になります。
URL を知っている誰もがそのページを閲覧できるようになります。
そこで必要になるのが、検索エンジンです。検索エンジンはウェブサイトを検出できる必要があります。

ただし、ドキュメントをウェブページに掲載したいけれども、一般のユーザーにはそのドキュメントを公開したくない場合があります。
たとえば、ブログの管理ページなどには、特定のユーザーにアクセスを制限する必要があります。
他のユーザーが検索エンジンによって、そのようなページを見つけることができたとしても、何のメリットもありません。


このセクションでは、検索結果に特定のページを表示しないようにする方法についても説明します。


### 「クロール」と「インデックス登録」の違い

検索結果を制御する方法を学ぶ前に、検索エンジンによるウェブページの処理方法を理解する必要があります。サイト側から見ると、検索エンジンはサイトに対して、主にクロールとインデックス登録の 2 つの処理を行います。  

**クロール**とは、検索エンジンのボットがウェブページの情報を収集して、そのコンテンツを分析することです。コンテンツは検索エンジンのデータベースに保存され、検索結果の詳細を表示したり、ページをランク付けしたり、リンクを経由して新しいページを検出したりするために使用されます。  

**インデックス登録**とは、検索エンジンがそのデータベースにウェブサイトの URL や関連情報を保存して、検索結果として配信できるようにすることです。 

注: 多くの人がクロールとインデックス登録を混同しています。クロールを禁止したとしても、ページが検索結果に表示されなくなるわけではありません。たとえば、任意のウェブページがクロールからブロックされていたとしても、別のウェブサイトにそのウェブページへのリンクがあれば、そのページはインデックス登録される可能性があります。この場合、検索結果に詳細な説明は表示されません。

###  robots.txt でクロールを制御する

`robots.txt` というテキスト ファイルを使用して、適切に動作するクローラがウェブページにアクセスする方法を制御することができます。`Robots.txt` は、検索ボットがサイトをクロールする方法を記述したシンプルなテキスト ファイルです
（すべてのクローラが `robots.txt` に従うわけではありません。
悪意のあるクローラが作成される可能性もあります）。

ウェブサイトのホストのルート ディレクトリに `robots.txt` を配置します。たとえば、サイトのホストが `http://pages.example.com/` である場合は、`robots.txt` を `http://pages.example.com/robots.txt`
に配置する必要があります。
ドメインに別のスキーマ、サブドメイン、またはその他のポートがある場合、これらは異なるホストであると見なされるため、それぞれのルート ディレクトリに `robots.txt` を配置する必要があります。




簡単な例を次に示します。  

**http://pages.example.com/robots.txt**

    User-agent: *
    Disallow: /
    

これで、すべてのボットに対して、ウェブサイト全体のクロールが禁止されます。


別の例を次に示します。

**http://pages.example.com/robots.txt**

    User-agent:Googlebot
    Disallow: /nogooglebot/
    

ユーザー エージェントの名前を明示すると、ボット（ユーザー エージェント）ごとに動作を指定することができます。
上記の例では、`Googlebot` というユーザー エージェントが `/nogooglebot/` とそのディレクトリの配下にあるすべてのコンテンツをクロールすることを禁止しています。
  

各検索エンジンのボットの詳細については、各検索エンジンのヘルプページをご覧ください。

* [Google](/webmasters/control-crawl-index/docs/robots_txt)
* [Bing](http://www.bing.com/webmaster/help/how-to-create-a-robots-txt-file-cb7c31ec)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/robots-txt.xml)


注: サイトがクロールされる方法を**制御する必要がある場合にのみ**、`robots.txt` が必要です。url: `/robots.txt` に対してレスポンス コード 500 を返さないでください。このコードを返すと、ホスト全体に対する以降のクロールがすべて終了され、検索結果の詳細が空になります。

####  robots.txt をテストする

robots.txt で対象とするクローラによっては、`robots.txt` のテスト用ツールが検索エンジン プロバイダーから提供されている場合があります。
たとえば、Google の[ウェブマスター ツール](https://www.google.com/webmasters/tools/robots-testing-tool)には、robots.txt のテストに使用できる検証ツールが付属しています。




<img src="imgs/robots-txt-validator.png" srcset="imgs/robots-txt-validator-2x.png 2x, imgs/robots-txt-validator.png 1x">

Yandex でも、[同様のツール](https://webmaster.yandex.com/tools/robotstxt/)が提供されています。  

###  メタタグで検索インデックス処理を制御する

ウェブページを検索結果に表示したくない場合、robots.txt は解決策になりません。
ウェブページのクロールは許可して、ウェブページのインデックス登録は禁止することを明示的に示す必要があります。
ソリューションは 2 つあります。

HTML ページのインデックス登録を禁止することを示すには、属性として `name="robots"` および `content="noindex"` を指定した特別な `<meta>` タグを使用します。  


    <!DOCTYPE html>
    <html><head>
    <meta name="robots" content="noindex" />
    

`name` 属性の値を特定のユーザー エージェント名に変更すると、スコープを絞り込むことができます。たとえば、`name="googlebot"`（大文字と小文字は区別されない）は、ページのインデックス登録を Googlebot に許可しないことを示します。  


    <!DOCTYPE html>
    <html><head>
    <meta name="googlebot" content="noindex" />
    

robots メタタグには、次のようなオプションもあります。  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/which-robots-metatags-does-bing-support-5198d240)
* [Yandex](https://help.yandex.com/webmaster/controlling-robot/html.xml)

####  X-Robots-Tag

画像、スタイルシート、スクリプト ファイルなどのリソースのインデックス登録を禁止することを示すには、HTTP ヘッダーに `X-Robots-Tag: noindex` を追加します。



    HTTP/1.1 200 OK
    X-Robots-Tag: noindex
    Content-Type: text/html; charset=UTF-8
    

スコープを特定のユーザー エージェントに絞り込む場合は、`noindex` の前にユーザー エージェント名を記載します。  


    HTTP/1.1 200 OK
    X-Robots-Tag: googlebot: noindex
    Content-Type: text/html; charset=UTF-8
    

X-Robots-Tag の詳細については、以下をご覧ください。  

* [Google](/webmasters/control-crawl-index/docs/robots_meta_tag)
* [Bing](http://www.bing.com/webmaster/help/how-can-i-remove-a-url-or-page-from-the-bing-index-37c07477)

注: `robots.txt` を使用してクロールを禁止すると、ページのインデックス登録を望んでいない場合でも、検索ボットがページを引き続きインデックス登録する可能性があります。この理由は、次のとおりです。<ul><li>検索ボットが他のウェブサイトにあるリンクを経由してウェブページを見つける可能性がある。</li><li>クロールできない検索エンジンは  <code>noindex</code> を検出できない。</li></ul>

`robots.txt` では検索インデックスを制御できないと考えてください。

###  コンテンツ タイプごとの例

クロールとインデックス登録を制御するための最適なソリューションを見つけましょう。以下に、ページタイプ別のソリューションの例を紹介します。

####  誰でもアクセスおよび検索できるページ

ウェブ上の大半のページはこのタイプです。  

* `robots.txt` は不要。
* robots メタタグは不要。

####  URL を知っているユーザーのみがアクセスできるページ

たとえば以下のようなページです。  

* ブログの管理者コンソールのログインページ。
* URL を渡すことで共有される、インターネット初心者向けのプライベート コンテンツ。

このようなページの場合、検索エンジンによるインデックス登録を禁止する必要があります。  

* `robots.txt` は不要。
* HTML ページに `noindex` メタタグを使用。
* 非 HTML リソース（画像や PDF など）に `X-Robots-Tag: noindex` を使用。

注: JavaScript やスタイルシート ファイルのクロールを禁止する必要があるのでしょうか。AJAX などの最新テクノロジーを活用したコンテンツを検索エンジンで検出できるようにするために、<a href='http://googlewebmastercentral.blogspot.com/2014/05/understanding-web-pages-better.html' target='_blank'>Google は最善を尽くしています</a>。検出対象にするには、もちろんクローラによる JavaScript のクロールを許可する必要があります。

####  承認されたユーザーのみがアクセスできるページ

この場合、誰かが URL を見つけたとしても、適切な認証情報がない限り、サーバーはその結果を表示することを拒否します。次に例を示します。  

* ソーシャル ネットワークで私的に共有されるコンテンツ。
* 企業の出納システム

これらのタイプのページでは、検索エンジンによるページクロールとインデックス登録を禁止する必要があります。  

* 適切な認証情報がないアクセスに対しては、レスポンス コード 401 "Unauthorized" を返す（または、ユーザーをログインページにリダイレクトする）。
* これらのページのクロールを禁止するために `robots.txt` を使用しないでください。使用した場合、401 エラーが検出されません。

この場合の制限メカニズムは、IP アドレス、Cookie、基本認証、OAuth などです。
こうした認証および承認機能を実装する方法はインフラストラクチャによって異なるため、この記事では扱いません。


###  検索エンジンからのページの削除をリクエストする

検索結果を削除する必要があるのは、次のようなケースです。  

* ページが存在しなくなった。
* 機密情報が含まれるページが誤ってインデックス登録された。


主要な検索エンジンには、このようなページの削除リクエストを送信する方法が用意されています。通常、次のような手順でリクエストを送信します。  

1. 削除するページが次の状態であることを確認します。
    * サーバーから既に削除されていて、404 エラーが返される
    * インデックス登録されないように設定されている（例: noindex）

1. 各検索エンジンのリクエスト ページに移動します（Google と Bing の場合、ウェブサイトの登録と所有権の確認が必要です）。
1. リクエストを送信します。

<img src="imgs/remove-urls.png" srcset="imgs/remove-urls-2x.png 2x, imgs/remove-urls.png 1x">

詳細な手順については、各検索エンジンのヘルプページをご覧ください。  

* [Google](https://support.google.com/webmasters/answer/1663419)
* [Bing](http://www.bing.com/webmaster/help/bing-content-removal-tool-cb6c294d)
* [Yandex](https://help.yandex.com/webmaster/yandex-indexing/removing-from-index.xml)

###  付録: クローラのユーザー エージェントのリスト

* [Google](https://support.google.com/webmasters/answer/1061943)
* [Bing](http://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)
* [Yandex](https://help.yandex.com/search/robots/logs.xml)



{# wf_devsite_translation #}
