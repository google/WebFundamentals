project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: マルチデバイス サイトをゼロから構築します。ここでは、一連のビルドプロセス ツールを使用して、開発をスピードアップしたり、高速読み込みサイトを作成したりする方法について説明します。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-09-24 #}

# ビルドツールのセットアップ {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}
マルチデバイス サイトをゼロから構築します。ここでは、一連のビルドプロセス ツールを使用して、開発をスピードアップしたり、高速読み込みサイトを作成したりする方法について説明します。どのサイトにも開発バージョンと本番向けバージョンがあります。<br /><br />開発バージョンには、作業しやすいクリーン形式のサイトを構成する HTML、CSS、JS、および画像ファイルが含まれています。<br /><br />本番向けバージョンでは、これらのファイルを取得したり、縮小化したり、結合または統合したり、画像のように最適化したりします。

ウェブ デベロッパーは一度に多くのことを考える必要があり、ビルドステップは最も重要ですが、始めるのが面倒なものです。
画像圧縮、CSS の縮小化、JavaScript の結合、レスポンシブ テスト、単体テストなどを自動化
するために必要なすべてのタスクを処理する必要があります。



このガイドに従って、作成済みのサイトが開始時からすべてのベスト プラクティスに従うようにワークフローを構築するための最良の方法を習得してください。




### TL;DR {: .hide-from-toc }
- ビルドプロセス ツールは、パフォーマンスを最適化するものである必要があります。つまり、JavaScript、CSS、HTML、および画像を自動的に縮小化および結合する必要があります。
- LiveReload などのツールを使用して、開発プロセスをスムーズにします。


コーディングを始める前に、サイトの本番向けバージョンを最適化および構築する方法を検討する必要があります。
このワークフローを最初から設定すると、プロジェクトの終了時に予期しない状況になるのを防ぐことができます。また、単調なタスクを自動で実行して開発をスピードアップするツールをワークフローに追加できます。




##  ビルドプロセスとは

ビルドプロセスは、プロジェクト ファイルに対して実行される一連のタスクで、開発中にサイトの開発バージョンを作成するために使用されるコードをコンパイルしたりテストしたりします。
ビルドプロセスでは、開発ワークフローの終了時に実行する一連のタスクを実行しないでください。


ビルドプロセスを実装するための最も一般的なツールは [Gulp](http://gulpjs.com/){: .external } と [Grunt](http://gruntjs.com/) で、両方ともコマンドライン ツールです。
どちらも使用経験がない場合は、[Web Starter Kit](/web/tools/starter-kit/) で Gulp が使用されているため、Gulp を使用することをお勧めします。



GUI を備えていて、取り組みやすいツールがありますが、柔軟性は低くくなります。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">サポートされているプラットフォーム &amp; ツール名</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Supported Platforms">OS X / Windows</td>
      <td data-th="Gulp"><a href="http://alphapixels.com/prepros/">Prepros</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="https://incident57.com/codekit/">CodeKit</a></td>
    </tr>
    <tr>
      <td data-th="Supported Platforms">OS X</td>
      <td data-th="Gulp"><a href="http://hammerformac.com/">HammerForMac</a></td>
    </tr>
  </tbody>
</table>


##  ビルドプロセスに必要なタスク

次のセクションでは、ビルドプロセスに必要な最も一般的なタスクについて説明し、Grunt と Gulp での対応するタスクを説明します。


思いどおりの設定を実現するには多くの試行錯誤が必要であり、ビルドプロセスがはじめての場合は厄介な作業になることがあります。


ビルドプロセスの良い例については、[Web Starter Kit でサイトをスタート](/web/fundamentals/getting-started/web-starter-kit/)をご覧ください。Web Starter Kit の使用方法と Gulp ファイル内の各コマンドの実行内容が説明されています。この方法を使用して、セットアップを手っ取り早く完了し、後から必要に応じて変更を加えることができます。


独自のビルドプロセスを作成する予定があり、Gulp または Grunt をはじめて使用する場合は、クイック スタート ガイドを参考にすると、最初のビルドプロセスのインストールや実行の方法がわかります。



* [Grunt Getting Started](http://gruntjs.com/getting-started)
* [Gulp Getting Started](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started)


###  連結と圧縮の使用によるサイトの高速化

連結および圧縮という用語に詳しくない方のために説明すると、連結とは、単純に複数のファイルを統合する、つまり、複数のファイルをコピーして 1 つのファイルに貼り付けることです。
これを行うのは、ブラウザでは多くの小さいファイルよりも 1 つのファイルを取得する方が効率的だからです。


圧縮は、ファイルを取得し、コードの動作を変えることなく全体の文字数を少なくするプロセスです。
良い例として、コメントの削除、長い変数名の短縮などがあります。
これにより、ファイルサイズが小さくなり、ダウンロードも速くなります。


圧縮には次を使用します。

<table>
  <thead>
    <tr>
      <th data-th="Type of File">ファイルの種類</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS</td>
      <td data-th="Gulp"><a href="https://github.com/ben-eb/gulp-csso">gulp-csso</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-cssmin">grunt-contrib-cssmin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/terinjokes/gulp-uglify/">gulp-uglify</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-uglify">grunt-contrib-uglify</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">HTML</td>
      <td data-th="Gulp"><a href="https://www.npmjs.com/package/gulp-minify-html">gulp-minify-html</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-htmlmin">grunt-contrib-htmlmin</a></td>
    </tr>
  </tbody>
</table>

連結には次を使用します。

<table>
  <thead>
    <tr>
      <th data-th="Type of File">ファイルの種類</th>
      <th data-th="Gulp">Gulp</th>
      <th data-th="Grunt">Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Type of File">CSS（Sass）</td>
      <td data-th="Gulp"><a href="https://github.com/dlmanning/gulp-sass">gulp-sass</a> または <a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-sass">grunt-contrib-sass</a> または <a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a></td>
    </tr>
    <tr>
      <td data-th="Type of File">JS</td>
      <td data-th="Gulp"><a href="https://github.com/jonkemp/gulp-useref">gulp-useref</a></td>
      <td data-th="Grunt"><a href="https://github.com/yeoman/grunt-usemin">grunt-usemin</a> または <a href="https://github.com/fatso83/grunt-codekit">grunt-codekit</a></td>
    </tr>
  </tbody>
</table>

**注**: 「インポート」機能を利用すると Sass を使用できます（例は [Web Starter
Kit](https://github.com/google/web-starter-kit/blob/master/app/styles/main.scss) を参照）。

###  画像の最適化

画像の最適化は、サイトの高速化に役立つ重要なステップです。画像は、画質を落とすことなく驚くほど縮小できます。
メタデータは、ブラウザで画像の表示に必要ないため削除されます。たとえば、写真の撮影に使用されたカメラに関する情報などです。



画像を最適化するには、次のモジュールを使用できます。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp &amp; Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-imagemin">gulp-imagemin</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-imagemin">grunt-contrib-imagemin</a></td>
    </tr>
  </tbody>
</table>

###  ベンダー プレフィックスを省略しない

使用する CSS にすべてのベンダー プレフィックスを含めるのは、面倒になることがよくあります。
必要なプレフィックスを自動的に追加する自動プレフィクサーを使用してください。


<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp と Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="https://github.com/sindresorhus/gulp-autoprefixer">gulp-autoprefixer</a></td>
      <td data-th="Grunt"><a href="https://github.com/nDmitry/grunt-autoprefixer">grunt-autoprefixer</a></td>
    </tr>
  </tbody>
</table>

**注**: 
[プレフィックスを自動的に追加する Sublime パッケージ](/web/tools/setup/setup-editor#autoprefixer)を追加することもできます。


###  テキスト エディタを LiveReload のままにしない

LiveReload は、変更が行われるたびにブラウザのサイトをアップデートします。一度使用すると、それなしの生活は考えられなくなります。


Web Starter Kit では、LiveReload をサポートするために browser-sync を使用しています。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Gulp と Grunt</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Gulp"><a href="http://www.browsersync.io/docs/gulp/">browser-sync</a></td>
      <td data-th="Grunt"><a href="https://github.com/gruntjs/grunt-contrib-connect">grunt-contrib-connect</a> および <a href="https://github.com/gruntjs/grunt-contrib-watch">grunt-contrib-watch</a></td>
    </tr>
  </tbody>
</table>

注: LiveReload の考えは好きでもビルドプロセスが不要な場合は、[Addy Osmani の HTML5Rocks に関する記事](http://www.html5rocks.com/en/tutorials/tooling/synchronized-cross-device-testing/)をご覧ください。さまざまな代替手段が記載されています。


{# wf_devsite_translation #}
