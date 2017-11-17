project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 繰り返し使用するコマンドライン タスクのショートカットを設定します。コマンドラインで同じ入力を繰り返している場合は、ショートカットを設定して入力を減らします。

{# wf_updated_on:2015-04-13 #}
{# wf_published_on:2014-09-24 #}

# コマンドライン ショートカットの設定 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

繰り返し使用するコマンドライン タスクのショートカットを設定します。コマンドラインで同じ入力を繰り返している場合は、ショートカットを設定して入力を減らします。


### TL;DR {: .hide-from-toc }
- コマンドラインを使いやすくします。覚えやすく簡単に入力できるエイリアスを作成します。
- Github ドットファイルを用意して、コマンドライン ショートカットを保存、共有、同期します。


## ショートカットの設定方法

コマンドライン ショートカットを最も簡単に作成するには、一般的なコマンドのエイリアスを bashrc ファイルに追加します。
Mac や Linux では、以下の手順を実行します。

1. コマンドラインの任意の場所で次のように入力します。

        open -a 'Sublime Text' ~/.bashrc

2. 新しいエイリアスを追加します。たとえば、次のように入力します。

        alias master='git checkout master'

3. git リポジトリのディレクトリ内で、コマンド `master` をいつでも実行できます。このコマンドは、マスター ブランチをチェックアウトします。


注: [Windows でのエイリアスの設定](https://msdn.microsoft.com/en-us/library/windows/desktop/ms682057(v=vs.85).aspx)についてはこちらの手順をご覧ください。


## お勧めショートカット

便利なコマンドをいくつか紹介します。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2" data-th="Command">コマンド &amp; エイリアス</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="Command">エディタを開く</td>
      <td data-th="Alias"><code>alias st='open -a "Sublime Text"'</code></td>
    </tr>
    <tr>
      <td data-th="Command">サーバーの起動</td>
      <td data-th="Alias"><code>alias server="python -m SimpleHTTPServer"</code></td>
    </tr>
    <tr>
      <td data-th="Command">よく使用するディレクトリへの移動</td>
      <td data-th="Alias"><code>alias p="cd ~/projects"</code></td>
    </tr>
  </tbody>
</table>


## ショートカットの保存、共有、および同期

ショートカットとドットファイルを Github に保管します。これは主に、ショートカットを端末間で共有でき、常にバックアップされるという点で役に立ちます。


Github では[ドットファイルの専用ページ](https://dotfiles.github.io/){: .external }も作成されています。また、かなりの数の Chrome チームが [Mathias Bynens 氏のドットファイル](https://github.com/mathiasbynens/dotfiles)を採用しています。






{# wf_devsite_translation #}
