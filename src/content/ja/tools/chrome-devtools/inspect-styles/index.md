project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: ページの HTML と CSS を調査して編集します。

{# wf_updated_on:2016-01-28 #}
{# wf_published_on:2015-04-13 #}

# ページとスタイルの調査と編集 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome DevTools の [Elements] パネルを使用して、ページの HTML と CSS を調査してライブ編集します。


![Chrome DevTools の [Elements] パネル](imgs/elements-panel.png)


### TL;DR {: .hide-from-toc }
- [Elements] パネルで、DOM ツリーの任意の要素を調査し、その場で編集します。
- [Styles] ペインで、選択された任意の要素に適用された CSS ルールを表示して変更します。
- [Computed] ペインで、選択された要素のボックスモデルを表示して編集します。
- [Sources] パネルで、ページに対してローカルで行われた変更を表示します。


##  DOM ノードのライブ編集

DOM ノードをライブ編集するには、単純に[選択された要素](#inspect-an-element)をダブルクリックして、変更を行います。


<video src="animations/edit-element-name.mp4" style="max-width:100%;"
       loop muted autoplay controls></video>

DOM ツリービューには、ツリーの現在の状態が表示されます。これは、別の理由で最初に読み込まれた HTML とは一致しないことがあります。
たとえば、ユーザーは JavaScript を使用して DOM ツリーを変更できます。ブラウザ エンジンがユーザーが作成した無効なマークアップを修正し、その結果予期しない DOM が生成されることがあります。



##  スタイルのライブ編集

[**Styles**] ペインで、スタイルのプロパティ名と値をライブ編集します。（ユーザー エージェント スタイルシートと同様に）グレー表示されているスタイルを除き、すべてのスタイルを編集できます。



名前または値を編集するには、その名前または値をクリックして変更を加え、<kbd class="kbd">Tab</kbd> キーまたは <kbd class="kbd">Enter</kbd> キーを押して変更を保存します。


![プロパティ名の編集](imgs/edit-property-name.png)

既定では、CSS の変更は永続的ではなく、ページを再読み込みすると変更内容が失われます。
ページが読み込まれた後も変更を保持するには、[永続的に作成](/web/tools/setup/setup-workflow)できるように設定します。

 

##  ボックスモデル パラメータの調査と編集

**[Computed] ペイン**を使用して、現在の要素のボックスモデル パラメータを調査して編集します。
ボックスモデルのすべての値は、値をクリックするだけで編集できます。


![[Computed] ペイン](imgs/computed-pane.png)

同心の長方形には、現在の要素の **padding**、**border**、**margin** プロパティの **top**、**bottom**、**left**、**right** の値が表示されます。

 

位置が非静的に決定される要素の場合は、**position** の長方形も表示されます。これには、**top**、**right**、**bottom**、および **left** プロパティの値が含まれます。



![非静的に計算される要素](imgs/computed-non-static.png)

`position: fixed` と `position: absolute` 要素の場合は、中央のフィールドに、選択された要素の実際の **offsetWidth × offsetHeight** ピクセル寸法が表示されます。
すべての値は、[Styles] ペインのプロパティ値と同様に、ダブルクリックするだけで変更できます。
ただし、これは具象要素の位置指定の仕様に従うため、変更が有効になるとは限りません。



![修正後の計算された要素](imgs/computed-fixed.png)

##  ローカル変更の表示

<video src="animations/revisions.mp4" style="max-width:100%;"
       autoplay loop muted controls></video>

ページに加えたライブ編集の履歴を表示するには、次のようにします。

1. [**Styles**] ペインで、変更したファイルをクリックします。DevTools で [**Sources**] パネルが表示されます。
1. ファイルを右クリックします。
1. [**Local modifications**] を選択します。

変更内容を詳しく調べるには、次のようにします。

* 変更が行われた時間 ![変更が行われた時間](imgs/image_25.png){:.inline}を表示するには、最上位のファイル名を展開します。
* 変更に対応する [diff](https://en.wikipedia.org/wiki/Diff)（変更前と変更後）を表示するには、第 2 レベルの項目を展開します。背景がピンク色の行は削除を示し、緑色の行は追加を示します。


##  変更を元に戻す

[永続的に作成できるように設定](/web/tools/setup/setup-workflow)していない場合は、ページを再読み込みするたびに、すべてのライブ編集が失われます。


永続的に作成できるように設定している場合、変更を元に戻すには、次のようにします。

* [Elements] パネルで DOM またはスタイルに加えた細かな変更をすばやく元に戻す場合は、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd> キー（Windows）または <kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd> キー（Mac）を使用します。



* ファイルに加えたローカル変更をすべて元に戻すには、[**Sources**] パネルを開き、ファイル名の隣にある [**revert**] を選択します。


[inspect]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#inspect


{# wf_devsite_translation #}
