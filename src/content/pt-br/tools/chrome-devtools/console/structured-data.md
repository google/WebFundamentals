project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Compare objetos de dados similares usando o método table().

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Comparar objetos de dados similares {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
Visualize dados estruturados e compare objetos de dados usando o método table().

O método `table()` oferece um modo fácil de visualizar objetos e matrizes que contêm dados similares. Quando chamado, ele assume as propriedades de um objeto e cria um cabeçalho. Em seguida, os dados brutos vêm do valor das propriedades de cada índice.


## Exemplo básico: Registrar uma matriz de objetos

Na sua forma mais básica, tudo de que você precisa é uma matriz com diversos de objetos que tenham as mesmas propriedades, e o comando `table()` fará o resto:


    console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
    console.table([[1,2,3], [2,3,4]]);
    
  
A saída será a seguinte:

![Exibição da tabela do console](images/table-arrays.png)

## Exemplo avançado: Registrar propriedades específicas

O segundo parâmetro de `table()` pode ser usado para registrar objetos mais avançados. Defina uma matriz que contenha as strings de propriedade que deseja exibir, algo assim:


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
    

A saída será a seguinte:

![Saída do console com objetos table](images/table-people-objects.png)




{# wf_devsite_translation #}
