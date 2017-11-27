project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: ARIA ラベルを使用してアクセス可能な要素の説明を作成する


{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

# ARIA ラベルと関係性 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/aliceboxhall.html" %}

##  ラベル

ARIA は要素にラベルと説明を加える複数の仕組みを提供します。実際に、ARIA はユーザー補助のサポートや説明テキストを追加できる唯一の方法です。読み取り可能なラベルを作成する際に ARIA が使用するプロパティを見てみましょう。


###  aria-label

`aria-label` によって、アクセス可能なラベルに使用する文字列を指定できます。これは `label` 要素など、その他のネイティブのラベル付けの仕組みよりも優先されます。たとえば、`button` にテキスト コンテンツと `aria-label` の両方が存在する場合、`aria-label` の値のみが使用されます。




テキストの代わりに画像だけで目的を示しているボタンがあるとします。この視覚的なマークを見ることができないユーザー向けに目的を明確に示したい場合、`aria-label` 属性を使用することがあります。





![aria-label を使用して画像のみのボタンを識別](imgs/aria-label.jpg)

###  aria-labelledby

`aria-labelledby` によって、DOM 内の別の要素の ID を要素のラベルとして指定できます。


![aria-labelledby を使用してラジオグループを識別](imgs/aria-labelledby.jpg)

`label` 要素を使用した場合と似ていますが、いくつか重要な違いがあります。

 1. `aria-labelledby` はどの要素でも使用でき、ラベル付けが可能な要素に限定されません。
 1. `label` 要素はラベルを付ける対象を参照しますが、`aria-labelledby` の場合はその関係が反対になります。つまり、ラベルを付けられる側からラベルを付ける側を参照します。
 1. label 要素は 1 つのラベル付け可能な要素とのみ関連付けることができますが、`aria-labelledby` では IDREF のリストを受け取り、複数の要素からラベルを作成できます。
ラベルは IDREF で指定された順序で連結されます。
 1. `aria-labelledby` を使用すると、非表示またはアクセシビリティ ツリーに存在しない要素も参照できます。たとえば、ラベルを付けたい要素の横に非表示の `span` を追加し、`aria-labelledby` でその要素を参照できます。
 1. ただし、ARIA はアクセシビリティ ツリーのみに影響するため、`aria-labelledby` には、`label` 要素を使用したときのおなじみのラベルクリック動作はありません。



重要な点として、要素のその他**すべての**名前ソースよりも `aria-labelledby` が優先されます。たとえば、`aria-labelledby` と `aria-label`、または `aria-labelledby` とネイティブ HTML `label` の両方が要素に指定されていると、`aria-labelledby` ラベルが常に優先されます。



##  関係性

`aria-labelledby` は、*関係性属性*の一例です。関係性属性は、DOM の関係にかかわらず、ページ上の要素間でセマンティックな関係を構築します。`aria-labelledby` の場合、「この要素は、あの要素によってラベルが付けられる」という関係になります。


ARIA の仕様では、[8 つの関係性属性](https://www.w3.org/TR/wai-aria/states_and_properties#attrs_relationships){: .external } があげられています。そのうちの 6 つ、`aria-activedescendant`、`aria-controls`、`aria-describedby`、`aria-labelledby`、`aria-owns` は、1 つ以上の要素への参照を受け取り、ページ上の要素間に新たな関連付けを作成します。各ケースの違いは、リンクの意味とユーザーに対する表示方法です。


###  aria-owns

`aria-owns` は、最も幅広く使用されている ARIA 関係性の 1 つです。この属性を使用すると、DOM 内の独立した要素を現在の要素の子として扱うように、または既存の子要素を別の順序で並べ替えるように、支援技術に対して指定できます。たとえば、ポップアップ サブメニューが親メニューの近くに配置されており、外観に影響するためその親の DOM の子にはできない場合、`aria-owns` を使用すれば、スクリーン リーダーに対してサブメニューを親メニューの子として指定できます。





![aria-owns を使用してメニューとサブメニュー間の関係を確立](imgs/aria-owns.jpg)

###  aria-activedescendant

`aria-activedescendant` は関連付けられた役割を果たします。ページのアクティブ要素はフォーカスを持つ要素であるのと同様に、要素のアクティブな子孫を設定すると、実際には親にフォーカスが存在するときに、その子孫要素をフォーカスのある要素としてユーザーに提供するように支援技術に指定できます。例としてリストボックスで説明します。リストボックスのコンテナにページ フォーカスを残しつつ、その `aria-activedescendant` 属性は、現在選択されているリスト項目に更新する場合があります。これにより、選択された項目はフォーカスのある項目として支援技術に認識されます。


![aria-activedescendant を使用してリストボックス内の関係を構築](imgs/aria-activedescendant.jpg)

###  aria-describedby

`aria-describedby` は、`aria-labelledby` によるラベルの提供と同様に、アクセス可能な説明を提供します。`aria-labelledby` と同様に `aria-describedby` は、DOM で非表示であれ、支援技術のユーザーに対して非表示であれ、そのような非表示の要素を参照できます。追加の説明テキストが必要な場合、そのテキストの対象が支援技術のユーザーのみか全ユーザーかにかかわらず、これは便利な技術です。



この典型的な例は、パスワードの最小要件に関する説明テキストを伴うパスワード入力フィールドです。ラベルとは異なり、この説明は必ず表示されるとは限りません。アクセスするかどうかを選択可能にする、その他すべての情報の後に表示する、他の情報より先に表示する、などのケースが考えられます。たとえば、ユーザーが情報を入力すると、その入力内容がエコーバックされ、要素の説明の妨げになる場合があります。説明は補足情報を伝える優れた手段ですが、基本的に不可欠な情報ではないため、より重要な情報（要素の役割などの）を妨げてはいけません。



![aria-describedby を使用してパスワード フィールドとの関係を確立](imgs/aria-describedby.jpg)

###  aria-posinset と aria-setsize

残りの関係性属性はやや異なり、2 つ合わせて機能します。`aria-posinset`（「セット内の配置」）と `aria-setsize`（セットのサイズ）は、リストなど、セットに含まれる子要素間の関係を定義する際に使用します。



DOM 内に存在する要素でセットのサイズを判断できない場合、たとえば DOM 内のサイズの大きいリストをすべて一度に読み込まないよう遅延レンダリングが使用されている場合などは、`aria-setsize` で実際のセットのサイズを指定し、`aria-posinset` でセット内の要素の配置を指定できます。たとえば要素数が 1,000 個のセットがあるとします。特定の要素が DOM 内で最初に表示されたとしても、`aria-posinset` で位置を 857 と指定できます。さらに動的 HTML の技術を使用すれば、ユーザーはオンデマンドで完全なリストを見ることができます。





![aria-posinset と aria-setsize を使用してリスト内の関係を確立](imgs/aria-posinset.jpg)


{# wf_devsite_translation #}
