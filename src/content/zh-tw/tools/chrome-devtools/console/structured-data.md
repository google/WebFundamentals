project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 table() 方法比較類似的數據對象。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

# 比較類似的數據對象 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
使用 table() 方法查看結構化的數據和比較數據對象。

使用 `table()` 方法，您可以輕鬆地查看包含類似數據的對象和數組。調用時，此方法將提取對象的屬性並創建一個標頭。行數據則來自每個索引的屬性值。


## 基本示例：記錄對象數組

在最基本的形式中，您只需要一個由具有相同屬性的多個對象組成的數組，`table()` 命令將執行剩餘操作：


    console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
    console.table([[1,2,3], [2,3,4]]);
    
  
這將輸出：

![控制檯表格顯示](images/table-arrays.png)

## 高級示例：記錄特定的屬性

可以使用 `table()` 的第二個參數記錄更多高級對象。定義一個包含您希望顯示的屬性字符串的數組，如下所示：


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
    

這將輸出以下內容：

![包含表格對象的控制檯輸出](images/table-people-objects.png)




{# wf_devsite_translation #}
