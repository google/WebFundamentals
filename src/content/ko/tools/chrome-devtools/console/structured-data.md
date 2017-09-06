project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: table() 메서드를 사용하여 유사한 데이터 객체를 비교합니다.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# 유사한 데이터 객체 비교 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
Table() 메서드를 사용하여 구조적 데이터를 보고 데이터 객체를 비교합니다.

`table()` 메서드를 사용하면 유사한 데이터를 포함하는 객체와 배열을 간편하게 볼 수 있습니다. 이 메서드를 호출하면 객체의 속성을 취하여 헤더를 생성합니다. 이때 행 데이터는 각 색인의 속성 값에서 가져옵니다.


## 기본 예시: 객체 배열 로깅

가장 기본적인 형태에서 동일한 속성을 가진 일련의 객체와 배열만 있으면 `table()` 명령이 나머지를 알아서 처리합니다.


    console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
    console.table([[1,2,3], [2,3,4]]);
    
  
출력 결과:

![console table 표시](images/table-arrays.png)

## 고급 예시: 특정 속성 로깅

`table()`에 대한 두 번째 매개변수를 사용하여 더 많은 고급 객체를 로깅할 수 있습니다. 표시할 속성 문자열을 포함하는 배열을 다음과 같이 정의합니다.


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
    

다음이 출력됩니다.

![table 객체로 콘솔 출력](images/table-people-objects.png)




{# wf_devsite_translation #}
