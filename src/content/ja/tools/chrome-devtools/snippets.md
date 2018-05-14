project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: スニペットは、Chrome DevTools の [Sources] パネルで作成および実行できる小さいスクリプトです。どのページからもアクセスしたり実行したりできます。スニペットを実行すると、そのスニペットは現在開いているページのコンテキストから実行されます。

{# wf_updated_on:2016-06-26 #}
{# wf_published_on:2015-10-12 #}

# 任意のページからのコード スニペットの実行 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

スニペットは、Chrome DevTools の [Sources] パネルで作成および実行できる小さいスクリプトです。
どのページからもアクセスしたり実行したりできます。
スニペットを実行すると、そのスニペットは現在開いているページのコンテキストから実行されます。


複数のページで繰り返し使用している小さいユーティリティやデバッグ スクリプトに気付いたら、これらのスクリプトをスニペットとして保存することを考えてください。
スニペットを[ブックマークレット](https://en.wikipedia.org/wiki/Bookmarklet)の代わりに使用することもできます。



### TL;DR {: .hide-from-toc }
- スニペットは、（ブックマークレットと同様に）どのページからも実行できる小さいスクリプトです。
- スニペットの一部をコンソールで実行するには、[Evaluate in Console] 機能を使用します。
- ブレークポイントなど、[Sources] パネルでよく使われる機能もスニペットで動作します。


##  スニペットの作成

スニペットを作成するには、[**Sources**] パネルを開いて [**Snippets**] タブをクリックし、ナビゲータ内で右クリックして [**New**] を選択します。


![スニペットの作成](images/create-snippet.png)

エディタでコードを入力します。未保存の変更があるスクリプトには、次のスクリーンショットのように名前の横にアスタリスクが付きます。
<kbd>Command</kbd>+<kbd>S</kbd>（Mac）または <kbd>Ctrl</kbd>+<kbd>S</kbd>
（Windows、Linux）を押して変更を保存します。 

![未保存のスニペット](images/unsaved-snippet.png)

##  スニペットの実行

スニペットを実行するには 3 つの方法があります。 

* すべてのスニペットのリストが表示された左側のペインでスニペットのファイル名を右クリックし、[**Run**] を選択します。
* [**Run**] ボタン（![[run snippet] ボタン](images/run.png){:.inline}）をクリックします。
* <kbd>Command</kbd>+<kbd>Enter</kbd>（Mac）または <kbd>Ctrl</kbd>+<kbd>Enter</kbd>（Windows、Linux）を押します。


コンソールでスニペットの一部を評価するには、その部分をハイライト表示し、エディタ内の任意の場所を右クリックして [**Evaluate in Console**] を選択するか、キーボード ショートカット <kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>（Mac）または <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>（Windows、Linux）を使用します。





![コンソール内での評価](images/evaluate-in-console.png)

##  ローカルな変更の表示

<!-- TODO apply revision content doesn't really work... -->

スニペットに加えた変更の差分を表示するには、（スニペットが表示されている状態で）エディタ内を右クリックし、[**Local modifications**] を選択します。


![ローカルな変更](images/local-modifications.png)

[**History**] という名前の新しいタブが [Console] ドロワーに表示されます。

![スニペットの履歴](images/snippet-history.png)

タイムスタンプはそれぞれ変更を表します。タイムスタンプの横にあるカラットを展開すると、その時点の変更の差分が表示されます。[**revert**] リンクをクリックすると、改訂履歴が削除されます。
2016 年 6 月 27 日時点では、[**apply revision content**] と [**apply original content**] の各リンクは意図したとおりに動作しないようです。



##  ブレークポイントの設定

他のスクリプトと同様に、スニペットにもブレークポイントを設定できます。[**Sources**] パネル内からブレークポイントを追加する方法については、[ブレークポイントの追加](/web/tools/chrome-devtools/debug/breakpoints/add-breakpoints)を参照してください。




{# wf_devsite_translation #}
