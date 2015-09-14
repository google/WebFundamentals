---
title: "Make Intra-Site URLs Relative"
description: "HTTP と HTTPS の両方でサイトにサービスを提供している場合、プロトコルに係わらず、できるだけスムーズに動作させる必要があります。"
updated_on: 2015-03-27
key-takeaways:
  - イントラサイト URL と外部 URL はプロトコルに依存しないようにします。 相対パスを使用するか、あるいは//example.com/something.js のようなプロトコルを除外します
---

<p class="intro">
  HTTP と HTTPS の両方でサイトにサービスを提供している場合、プロトコルに係わらず、できるだけスムーズに動作させる必要があります。
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

しかし、HTTP リソースを含む
 HTTPS 経由でページを提供するときに、問題が発生します [mixed
content](http://www.w3.org/TR/mixed-content/)。ブラウザは、HTTPS の完全な利点が失われたことを
ユーザーに警告します。

実際、アクティブな混合コンテンツの場合 (スクリプト、プラグイン、CSS、iframe）、
ブラウザはコンテンツを全く読み込まないか、実行もせず、
壊れたページを表示します。

**注:** HTTP ページに HTTPS リソースを含めることは全く問題ありません。

さらに、サイト内の他のページにリンクすると、ユーザーは
 HTTPS から HTTP にダウングレードされます。

*http://* スキームを使用する完全修飾のイントラサイト URL 
がページに含まれている場合、これらの問題が発生します。 このようなコンテンツは変更する必要があります。

		<h1>Example.com へようこそ</h1>
		<script src="http://example.com/jquery.js"></script>
		<link rel="stylesheet" href="http://assets.example.com/style.css"/>
		<img src="http://img.example.com/logo.png"/>;
		<p>この素敵な <a href="http://example.com/2014/12/24/">新しい
		投稿をお読みください!</a></p>
		<p>このクールなサイト <a href="http://foo.com/">をチェック
		してください。</a></p>

to something like this:

		<h1>Example.com へようこそ</h1>
		<script src="//example.com/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>この素敵な <a href="//example.com/2014/12/24/">新しい
		投稿をお読みください!</a></p>
		<p>このクールなサイト <a href="http://foo.com/">をチェック
		してください。</a></p>

or this:

		<h1>Example.com へようこそ</h1>
		<script src="/jquery.js"></script>
		<link rel="stylesheet" href="//assets.example.com/style.css"/>
		<img src="//img.example.com/logo.png"/>;
		<p>この素敵な <a href="/2014/12/24/">新しい
		投稿をお読みください!</a></p>
		<p>このクールなサイト <a href="http://foo.com/">をチェック
		してください。</a></p>

つまり、イントラサイト URL をできるだけ相対的にします。プロトコル相対
 （//example.com で始まるプロトコルのないもの）、
またはホスト相対 (/jquery.js のようなパスのみで始まるもの) のいずれかを使用します。

**注:** 手動ではなく、スクリプトを使用してこれを行ってください。 サイトのコンテンツがデータベースにある場合、
データベースの開発コピーで
スクリプトをテストすることがあります。 サイトのコンテンツが単純なファイルである場合、ファイルの開発コピーで
スクリプトをテストしてください。 通常通り、変更は QA に合格した場合にのみ、
実稼働環境にプッシュしてください。 [Bram van Damme's
script](https://github.com/bramus/mixed-content-scan) または類似のものを使用して、サイト内の
混合コンテンツを検出します。

**注:** 他のサイトにリンクする場合 (それらの
リソースを含む場合とは対照的に)、プロトコルを変更しないでください。
他のサイトの動作方法は制御できません。

**注:** 大規模なサイトの移行をスムーズにするためには、
プロトコル相対 URL を推奨します。 HTTPS を完全に展開できるかどうか分からない場合、サイトで
すべてのサブリソースに HTTPS を使用させると、裏目に出る可能性があります。 HTTPS は新しく違和感を覚えることがありますが、
HTTP サイトもこれまでと
同様に利用価値が高いものです。 やがて移行を完了すると、HTTPS で
ロックインすることができます (次の 2 つのセクションを参照)。

サイトが CDN、jquery.com など、サードパーティから
提供されたスクリプト、画像、その他のリソースに依存している場合、次の 2 つのオプションがります。

* これらのリソースのためのプロトコル相対 URL を使用します。 サードパーティが HTTPS サービスを提供して
いない場合は、各社にお尋ねください。 Jquery.com など、ほとんどの会社はこのサービスを提供しています。
* 制御するサーバーから、HTTP と HTTPS の両方に
リソースを提供します。 これにより、サイトの外観、パフォーマンス、
セキュリティをより適切に制御できるので、多くの場合は得策となります。
サードパーティに頼る必要はありません。

HTML ページだでなく、スタイルシート、JavaScript、リダイレクト
のルール、&lt;link …&gt; タグ、および CSP 宣言でも、イントラサイト URL を
変更する必要があることを覚えておいてください。

