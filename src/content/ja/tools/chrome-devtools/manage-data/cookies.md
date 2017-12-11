project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Cookie は、[Application] パネルで調査および削除します。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# Cookie の調査と削除 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Cookie は、[<strong>Application</strong>] パネルで調査および削除します。


![[Cookies] ペイン](imgs/cookies.png)


### TL;DR {: .hide-from-toc }
- Cookie の名前、値、ドメイン、サイズなどの詳細情報を表示します。
- 単一の Cookie、選択したドメインの複数の Cookie、またはすべてのドメインのすべての Cookie を削除します。


##  概要{:#cookies}

Cookie を表示および削除するには、[**Cookies**] ペインを使用します。Cookie の値は変更できません。


![[Cookies] ペイン][cookies]

Cookie は、ドメインごとに表示されます。これには、メイン ドキュメントやすべてのネストされたフレームが含まれます。
これらの「フレーム グループ」のいずれかを選択すると、すべてのリソース、そのグループ内のすべてのフレームの Cookie がすべて表示されます。
このようにグループ化することには、注意が必要な 2 つの影響があります。


* さまざまなドメインの Cookie が同じフレーム グループに表示される場合があります。
* 同じ Cookie が複数のフレーム グループに表示される場合があります。

[cookies]: /web/tools/chrome-devtools/manage-data/imgs/cookies.png

##  項目{:#fields}

各 Cookie に次の項目があります。

<table class="responsive">
  <thead>
    <tr>
      <th colspan="2">Cookie の項目と説明</th>
    </tr>
  </thead>
  <tbody>
        <tr>
      <td data-th="Cookie Field">Name</td>
      <td data-th="Description">Cookie の名前。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Value</td>
      <td data-th="Description">Cookie の値。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Domain</td>
      <td data-th="Description">Cookie のドメイン。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Path</td>
      <td data-th="Description">Cookie のパス。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Expires / Maximum Age</td>
      <td data-th="Description">Cookie の有効期限または残存期間。セッション Cookie の場合、この項目は常に "Session" です。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Size</td>
      <td data-th="Description">Cookie のサイズ（バイト）。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">HTTP</td>
      <td data-th="Description">存在する場合は、Cookie を HTTP でのみ使用する必要があり、JavaScript の変更は許可されないことを示します。</td>
    </tr>
    <tr>
      <td data-th="Cookie Field">Secure</td>
      <td data-th="Description">存在する場合は、この Cookie の通信を暗号化された送信でのみ行う必要があることを示します。</td>
    </tr>
  </tbody>
</table>

##  Cookie の削除{:#delete}

Cookie を削除する方法はいくつかあります。

* Cookie を選択し、**削除**ボタン（![削除ボタン][delete]{:.inline}）をクリックしてその Cookie のみを削除します。
* **消去**ボタン（![消去ボタン][cos]{:.inline}）をクリックして、指定したフレーム グループのすべての Cookie を削除します。
* Cookie の [**Domain**] 値を右クリックし、[**Clear all from "..."**]（**"..."** はドメイン名）を選択して、そのドメインからすべての Cookie を削除します。



[delete]: imgs/delete.png
[cos]: imgs/clear-object-store.png


{# wf_devsite_translation #}
