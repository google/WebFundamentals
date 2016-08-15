---
title: "翻訳手順"
description: "Web Fundamentals を日本語化したい人は、誰でも Contribute することができます。"
updated_on: 2016-07-05
---

# Web Fundamentals の日本語翻訳手順
すべての記事のソースコードは `src/content` にあります。 ベースとなるコンテンツは英語で、 `src/content/en` ディレクトリにあります。翻訳は `src/content/ja` 以下に同じ構造で配置して下さい。

## 翻訳記事の追加と Pull Request の送信
1. レポジトリを fork する。
1. `src/content/en` から翻訳したい記事を探す。
1. `src/content/ja` の一致するディレクトリに記事を作成、もしくは翻訳済みの記事を編集する。
1. 記事内容およびメタデータを翻訳する。
    * タイトル (`title`)
    * 概要 (`description`)
    * 導入 (`introduction`)
    * メモ (`notes`)
    * 主な成果 (`key-takeaways`)
1. `translators:` に `id` を追加する。(id に対応するプロフィールは `src/content/_contributors.yaml` に追加すること。[クレジット](#section)参照)
1. [google/WebFundamentals](https://github.com/google/WebFundamentals) の master ブランチに対して Pull Request を送る。
その際、`type-Content-Translation` というラベルをつける。

{% highlight yaml %}
title: "はじめてのプログレッシブ ウェブアプリ"
description: "プログレッシブ ウェブアプリはウェブとアプリの両方の利点を兼ね備えたアプリです。このステップバイステップガイドでは、あなた自身のプログレッシブ ウェブアプリを構築し、そしてプログレッシブウェブアプリの開発で必要とされる基礎を学ぶことになります。それは、App Shellモデルや、App ShellやあなたのアプリケーションのキーデータなどをキャッシュするためのService Workerの使い方を含みます。"
updated_on: 2016-04-07
translators:
  - yoichiro
notes:
  devsummit-video: "さらに詳しくは、2015 年の Chrome Dev Summit で Alex Russell が行った、<a href='https://www.youtube.com/watch?v=MyQ8mtR9WxI'>プログレッシブ ウェブアプリ</a>についての講演内容をご覧ください。"
{% endhighlight %}

## クレジット
`src/content/_contributors.yaml` にあなたのプロフィールを記入し、`role` 属性に - `translator` を追加して下さい。[contributors ページ](/web/resources/contributors)はこの情報を元に作成され、記事にはあなたの名前が掲載されます。例：

{% highlight yaml %}
paulkinlan:
  name:
    given: Paul
    family: Kinlan
  org:
    name: Google
    unit: Developer Relations
  country: UK
  role:
    - author
    - engineer
    - translator
  homepage: http://paul.kinlan.me
  google: +PaulKinlan
  twitter: paul_kinlan
  email: paulkinlan@google.com
  description:
  en: "Paul is a Developer Advocate"
{% endhighlight %}

## 表記ルール
* 日本語の文中に英単語が入る場合、その英単語の前後に半角空白を入れてください。
* カタカナ表記が連続する場合、言葉の間に半角空白を入れてください。ただし、一般的に一つの言葉とみなされる場合は、空白を入れる必要はありません。  
（例）プログレッシブ [空白] ウェブアプリ
* コードは、文章中でもリンク文字列内でも、&#096;...&#096; で囲ってください。

## ライセンス
全てのコンテンツは、クリエイティブコモンズ3.0です。Web Fundamentals のレポジトリに初めて Pull Request 出すと、自動的に [Contributor License Agreement](https://github.com/google/WebFundamentals/blob/master/CONTRIBUTING.md) に Sign するようにコメントで促されます。指示に従って Sign してください。  

## コミュニティ
Web Fundamentals の翻訳作業について何かわからないことがあれば、Slack の [chromiumdev.slack.com](https://chromiumdev.slack.com/) にある #l10n チャネルで質問してください。  
（ [https://chromiumdev-slack.herokuapp.com/](https://chromiumdev-slack.herokuapp.com/) から参加できます）  
