project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools のすべてのキーボード ショートカットのリファレンス。

{# wf_updated_on:2016-11-28 #}
{# wf_published_on:2015-04-29 #}

# キーボード ショートカットのリファレンス {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

このページは、Chrome DevTools のキーボード ショートカットのリファレンスです。ショートカットにはグローバルに使用できるものと、1 つのパネルでしか使用できないものがあります。



ツールチップでショートカットを確認することもできます。ツールチップを表示するには、DevTools の UI 要素にカーソルを合わせます。
その要素にショートカットがあれば、ツールチップに表示されます。

##  DevTools へのアクセス

<table>
  <thead>
      <th>DevTools へのアクセス</th>
      <th>Windows の場合</th>
      <th>Mac の場合</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Launch DevTools">Developer Tools を開く</td>
      <td data-th="Windows"><kbd class="kbd">F12</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">I</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">I</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">[Inspect Element] モードとブラウザ ウィンドウを開く / 切り替える</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">C</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">C</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">Developer Tools を開き、コンソールにフォーカスを移動する</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">J</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">J</kbd></td>
    </tr>
    <tr>
      <td data-th="Launch DevTools">インスペクターを調べる（最初のものをドック解除してから次のキーを押す）</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">I</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">I</kbd></td>
    </tr>
  </tbody>
</table>

##  グローバル キーボード ショートカット

次のキーボード ショートカットは、すべての DevTools パネルで使用できます。

<table>
  <thead>
      <th>グローバル ショートカット</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Global Shortcuts">[General Settings] ダイアログの表示</td>
      <td data-th="Windows"><kbd class="kbd">?</kbd>、<kbd class="kbd">F1</kbd></td>
      <td data-th="Mac"><kbd class="kbd">?</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">次のパネル</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">]</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">]</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">前のパネル</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">[</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">[</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">パネル履歴を後ろに戻る</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Alt</kbd>+<kbd class="kbd">[</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">[</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">パネル履歴を前に進む</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Alt</kbd>+<kbd class="kbd">]</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">]</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">ドック位置の変更</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">Device Mode の開始</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">M</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">M</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">コンソールの切り替え / 設定ダイアログが開いている場合は閉じる</td>
      <td data-th="Windows"><kbd class="kbd">Esc</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Esc</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">ページの更新</td>
      <td data-th="Windows"><kbd class="kbd">F5</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">R</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">R</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">キャッシュされているコンテンツを無視してページを更新する</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">F5</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">R</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">R</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">現在のファイルまたはパネル内でテキストを検索する</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">F</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">F</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">すべてのソースでテキストを検索する</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">F</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">F</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">ファイル名で検索する（[Timeline] を除く）</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">O</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">P</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">O</kbd>、<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">P</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">ズームイン（DevTools にフォーカスがある場合）</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">+</kbd></td>
      <td data-th="Mac"><kbd>Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">+</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">ズームアウト</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">-</kbd></td>
      <td data-th="Mac"><kbd>Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">-</kbd></td>
    </tr>
    <tr>
      <td data-th="Global Shortcuts">既定のテキストサイズに戻す</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">0</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">0</kbd></td>
    </tr>
  </tbody>
</table>

##  パネル別のキーボード ショートカット

###  Elements

<table>
  <thead>
      <th>[Elements] パネル</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Elements Panel">変更を元に戻す</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Z</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Z</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">変更をやり直す</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Y</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Y</kbd>、<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">Z</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">ナビゲーション</td>
      <td data-th="Windows"><kbd class="kbd">上矢印</kbd>、<kbd class="kbd">下矢印</kbd></td>
      <td data-th="Mac"><kbd class="kbd">上矢印</kbd>、<kbd class="kbd">下矢印</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">ノードの展開 / 折りたたみ</td>
      <td data-th="Windows"><kbd class="kbd">右矢印</kbd>、<kbd class="kbd">左矢印</kbd></td>
      <td data-th="Mac"><kbd class="kbd">右矢印</kbd>、<kbd class="kbd">左矢印</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">ノードの展開</td>
      <td data-th="Windows"><kbd class="kbd">矢印を 1 回クリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">矢印を 1 回クリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">ノードとそのすべての子を展開 / 折りたたみ</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Alt</kbd>+<kbd class="kbd">矢印アイコンをクリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd>+<kbd class="kbd">矢印アイコンをクリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">属性の編集</td>
      <td data-th="Windows"><kbd class="kbd">Enter</kbd>、<kbd class="kbd">属性をダブルクリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Enter</kbd>、<kbd class="kbd">属性をダブルクリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">要素の非表示</td>
      <td data-th="Windows"><kbd class="kbd">H</kbd></td>
      <td data-th="Mac"><kbd class="kbd">H</kbd></td>
    </tr>
    <tr>
      <td data-th="Elements Panel">HTML としての編集に切り替え</td>
      <td data-th="Windows"><kbd class="kbd">F2</kbd></td>
      <td data-th="Mac"></td>
    </tr>
  </tbody>
</table>

####  [Styles] サイドバー

[Styles] サイドバーで使用可能なショートカットは次のとおりです。

<table>
  <thead>
      <th>[Styles] サイドバー</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Styles Sidebar">ルールの編集</td>
      <td data-th="Windows"><kbd class="kbd">1 回クリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">1 回クリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">新しいプロパティの挿入</td>
      <td data-th="Windows"><kbd class="kbd">スペースで 1 回クリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">スペースで 1 回クリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">ソースのスタイル ルール プロパティ宣言の行に移動</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">プロパティをクリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">プロパティをクリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">ソースのプロパティ値宣言の行に移動</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">プロパティ値をクリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">プロパティ値をクリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">色の定義値を順に表示</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">カラーピッカー ボックスをクリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">カラーピッカー ボックスをクリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">次または前のプロパティの編集</td>
      <td data-th="Windows"><kbd class="kbd">Tab</kbd>、<kbd class="kbd">Shift</kbd>+<kbd class="kbd">Tab</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Tab</kbd>、<kbd class="kbd">Shift</kbd>+<kbd class="kbd">Tab</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">値を増やす / 減らす</td>
      <td data-th="Windows"><kbd class="kbd">上矢印</kbd>、<kbd class="kbd">下矢印</kbd></td>
      <td data-th="Mac"><kbd class="kbd">上矢印</kbd>、<kbd class="kbd">下矢印</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">値を 10 ずつ増やす / 減らす</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">上矢印</kbd>、<kbd class="kbd">Shift</kbd>+<kbd class="kbd">下矢印</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">上矢印</kbd>、<kbd class="kbd">Shift</kbd>+<kbd class="kbd">下矢印</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">値を 10 ずつ増やす / 減らす</td>
      <td data-th="Windows"><kbd class="kbd">PgUp</kbd>、<kbd class="kbd">PgDown</kbd></td>
      <td data-th="Mac"><kbd class="kbd">PgUp</kbd>、<kbd class="kbd">PgDown</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">値を 100 ずつ増やす / 減らす</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">PgUp</kbd>、<kbd class="kbd">Shift</kbd>+<kbd class="kbd">PgDown</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">PgUp</kbd>、<kbd class="kbd">Shift</kbd>+<kbd class="kbd">PgDown</kbd></td>
    </tr>
    <tr>
      <td data-th="Styles Sidebar">値を 0.1 ずつ増やす / 減らす</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd>+<kbd class="kbd">上矢印</kbd>、<kbd class="kbd">Alt</kbd>+<kbd class="kbd">下矢印</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd>+<kbd class="kbd">上矢印</kbd>、<kbd class="kbd">Opt</kbd>+<kbd class="kbd">下矢印</kbd></td>
    </tr>
  </tbody>
</table>

### Sources

<table>
  <thead>
      <th>[Sources] パネル</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Sources Panel">スクリプト実行の一時停止 / 再開</td>
      <td data-th="Windows"><kbd class="kbd">F8</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">\</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F8</kbd>、<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">\</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">次の関数呼び出しのステップ オーバー</td>
      <td data-th="Windows"><kbd class="kbd">F10</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">'</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F10</kbd>、<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">'</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">次の関数呼び出しのステップイン</td>
      <td data-th="Windows"><kbd class="kbd">F11</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">;</kbd></td>
      <td data-th="Mac"><kbd class="kbd">F11</kbd>、<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">;</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">現在の関数のステップアウト</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">F11</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">;</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">F11</kbd>、<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">;</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">次の呼び出しフレームの選択</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">.</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd>+<kbd class="kbd">.</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">前の呼び出しフレームの選択</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">,</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd>+<kbd class="kbd">,</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">ブレークポイント条件の切り替え</td>
      <td data-th="Windows"><kbd class="kbd">行番号をクリック</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">B</kbd></td>
      <td data-th="Mac"><kbd class="kbd">行番号をクリック</kbd>、<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">B</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">ブレークポイント条件の編集</td>
      <td data-th="Windows"><kbd class="kbd">行番号を右クリック</kbd></td>
      <td data-th="Mac"><kbd class="kbd">行番号を右クリック</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">個別の単語の削除</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Delete</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd>+<kbd class="kbd">Delete</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">行または選択したテキストにコメントを付ける</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">/</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">/</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">ローカルな変更を保存</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">すべての変更を保存</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Alt</kbd>+<kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Opt</kbd>+<kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">行に移動</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">G</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">G</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">ファイル名で検索</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">O</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">行番号にジャンプ</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">P</kbd>+<span class="kbd">:<i>番号</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">P</kbd>+<span class="kbd">:<i>番号</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">列にジャンプ</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">O</kbd>+<span class="kbd">:<i>番号</i></span>+<span class="kbd">:<i>番号</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">O</kbd>+<span class="kbd">:<i>番号</i></span>+<span class="kbd">:<i>番号</i></span></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">メンバーに移動</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">O</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">アクティブなタブを閉じる</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd>+<kbd class="kbd">W</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd>+<kbd class="kbd">W</kbd></td>
    </tr>
    <tr>
      <td data-th="Sources Panel">スニペットの実行</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Enter</kbd></td>
    </tr>
  </tbody>
</table>

#### コードエディタ内

<table>
  <thead>
      <th>コードエディタ</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Code Editor">対応するかっこに移動</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">M</kbd></td>
      <td data-th="Mac"><span class="kbd"></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">行番号にジャンプ</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">P</kbd>+<span class="kbd">:<i>番号</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">P</kbd>+<span class="kbd">:<i>番号</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">列にジャンプ</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">O</kbd>+<span class="kbd">:<i>番号</i></span>+<span class="kbd">:<i>番号</i></span></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">O</kbd>+<span class="kbd">:<i>番号</i></span>+<span class="kbd">:<i>番号</i></span></td>
    </tr>
    <tr>
      <td data-th="Code Editor">コメントの切り替え</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">/</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">/</kbd></td>
    </tr>
    <tr>
      <td data-th="Code Editor">次のオカレンスの選択</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">D</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">D</kbd></td>
    </tr>
    <tr>
      <td data-th="Code Editor">最後の選択を元に戻す</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">U</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">U</kbd></td>
    </tr>
  </tbody>
</table>

### Timeline

<table>
  <thead>
      <th>[Timeline] パネル</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Timeline Panel">記録の開始 / 停止</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">E</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">E</kbd></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">タイムライン データの保存</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">S</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">S</kbd></td>
    </tr>
    <tr>
      <td data-th="Timeline Panel">タイムライン データの読み込み</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">O</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">O</kbd></td>
    </tr>
  </tbody>
</table>

### Profiles

<table>
  <thead>
      <th>[Profiles] パネル</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Profiles Panel">記録の開始 / 停止</td>
	  <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">E</kbd></td>
	  <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">E</kbd></td>
    </tr>
  </tbody>
</table>

### Console

<table>
  <thead>
      <th>[Console] のショートカット</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Console Shortcuts">候補の受け入れ</td>
      <td data-th="Windows"><kbd class="kbd">右矢印</kbd></td>
      <td data-th="Mac"><kbd class="kbd">右矢印</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">前のコマンド / 行</td>
      <td data-th="Windows"><kbd class="kbd">上矢印</kbd></td>
      <td data-th="Mac"><kbd class="kbd">上矢印</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">次のコマンド / 行</td>
      <td data-th="Windows"><kbd class="kbd">下矢印</kbd></td>
      <td data-th="Mac"><kbd class="kbd">下矢印</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">コンソールにフォーカス</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">`</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">`</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">コンソールのクリア</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">L</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">K</kbd>、<kbd class="kbd">Opt</kbd>+<kbd class="kbd">L</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">複数行入力</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Return</kbd></td>
    </tr>
    <tr>
      <td data-th="Console Shortcuts">実行</td>
      <td data-th="Windows"><kbd class="kbd">Enter</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Return</kbd></td>
    </tr>
  </tbody>
</table>

### Device Mode

<table>
  <thead>
      <th>Device Mode のショートカット</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Emulation Shortcuts">ピンチ ズームインとズームアウト</td>
      <td data-th="Windows"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">スクロール</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Shift</kbd>+<kbd class="kbd">スクロール</kbd></td>
    </tr>
  </tbody>
</table>

#### スクリーンキャスト中

<table>
  <thead>
      <th>スクリーンキャストのショートカット</th>
      <th>Windows の場合</th>
      <th>Mac</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Screencasting Shortcuts">ピンチ ズームインとズームアウト</td>
      <td data-th="Windows"><kbd class="kbd">Alt</kbd>+<kbd class="kbd">スクロール</kbd>、<kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">2 本指でクリックしてドラッグ</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Opt</kbd>+<kbd class="kbd">スクロール</kbd>、<kbd class="kbd">Cmd</kbd>+<kbd class="kbd">2 本指でクリックしてドラッグ</kbd></td>
    </tr>
    <tr>
      <td data-th="Screencasting Shortcuts">要素の調査ツール</td>
      <td data-th="Windows"><kbd class="kbd">Ctrl</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">C</kbd></td>
      <td data-th="Mac"><kbd class="kbd">Cmd</kbd>+<kbd class="kbd">Shift</kbd>+<kbd class="kbd">C</kbd></td>
    </tr>
  </tbody>
</table>


{# wf_devsite_translation #}
