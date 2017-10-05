project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 table() 方法比较类似的数据对象。

{# wf_updated_on:2015-05-11 #}
{# wf_published_on:2015-04-13 #}

# 比较类似的数据对象 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
使用 table() 方法查看结构化的数据和比较数据对象。

使用 `table()` 方法，您可以轻松地查看包含类似数据的对象和数组。调用时，此方法将提取对象的属性并创建一个标头。行数据则来自每个索引的属性值。


## 基本示例：记录对象数组

在最基本的形式中，您只需要一个由具有相同属性的多个对象组成的数组，`table()` 命令将执行剩余操作：


    console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
    console.table([[1,2,3], [2,3,4]]);
    
  
这将输出：

![控制台表格显示](images/table-arrays.png)

## 高级示例：记录特定的属性

可以使用 `table()` 的第二个参数记录更多高级对象。定义一个包含您希望显示的属性字符串的数组，如下所示：


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
    

这将输出以下内容：

![包含表格对象的控制台输出](images/table-people-objects.png)




{# wf_devsite_translation #}
