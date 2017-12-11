project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Compara objetos que tienen datos similares con el método table().

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Comparar objetos que tienen datos similares {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
Visualiza datos estructurados y compara objetos de datos con el método table().

El método `table()` proporciona una manera simple de ver objetos y matrices que incluyen datos similares. Cuando recibe una llamada, toma las propiedades de un objeto y crea un encabezado. Los datos sin procesar provienen del valor de las propiedades de cada índice.


## Ejemplo básico: Carga de una matriz de objetos

En su forma más básica, todo lo que necesitas es una matriz con un grupo de objetos que tengan las mismas propiedades y el comando `table()` hará el resto:


    console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
    console.table([[1,2,3], [2,3,4]]);
    
  
Esto mostrará lo siguiente:

![Visualización de la tabla de la consola](images/table-arrays.png)

## Ejemplo avanzado: Registro de propiedades específicas

El segundo parámetro de `table()` se puede usar para registrar objetos más avanzados. Define una matriz que contenga las strings de propiedades que desees mostrar, como se describe a continuación:


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
    

Esto mostrará lo siguiente:

![Resultado de la consola con objetos de la tabla](images/table-people-objects.png)




{# wf_devsite_translation #}
