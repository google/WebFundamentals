project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: 類似したデータ オブジェクトを比較するには、table() メソッドを使用します。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

#  類似データ オブジェクトの比較 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
構造化データを表示してデータ オブジェクトを比較するには、table() メソッドを使用します。

`table()` メソッドを使用すると、類似データを含むオブジェクトや配列を簡単に表示できます。このメソッドを呼び出すと、オブジェクトのプロパティが取得され、ヘッダーが作成されます。その後、行データが各インデックスのプロパティ値から取得されます。


##  基本的な例:オブジェクト配列のログ出力

最も基本的な形では、同じプロパティを持つ一連のオブジェクトを含む配列が 1 つあれば、後は `table()` コマンドが処理します。


    console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
    console.table([[1,2,3], [2,3,4]]);
    
  
出力結果は次のようになります。

![コンソールでの表の表示](images/table-arrays.png)

##  高度な例:特定のプロパティのログ出力

`table()` の 2 番目のパラメータを使用して、さらに高度なオブジェクトをログ出力することができます。次のように、表示するプロパティ文字列を含む配列を定義します。


    function Person(firstName, lastName, age) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.age = age;
    }
    
    var family = {};
    family.mother = new Person("Susan", "Doyle", 32);
    family.father = new Person("John", "Doyle", 33);
    family.daughter = new Person("Lily", "Doyle", 5);
    family.son = new Person("Mike", "Doyle", 8);
    
    console.table(family, ["firstName", "lastName", "age"]);
    

出力結果は次のようになります。

![表オブジェクトを含むコンソール出力](images/table-people-objects.png)




{# wf_devsite_translation #}
