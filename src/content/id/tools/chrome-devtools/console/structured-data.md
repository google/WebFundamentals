project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Membandingkan objek data serupa menggunakan metode table().

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Membandingkan Objek Data Serupa {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/pbakaus.html" %}
Menampilkan data terstruktur dan membandingkan objek data menggunakan metode table().

Metode `table()` memberikan cara mudah untuk melihat objek dan larik yang berisi data serupa. Bila dipanggil, maka properti objek akan dipanggil dan membuat header. Data baris berasal dari setiap nilai properti indeks.


## Contoh dasar: Mencatat larik objek dalam log

Dalam bentuknya yang paling dasar, Anda hanya perlu sebuah larik berisi sekumpulan objek yang memiliki properti sama, dan selebihnya akan dilakukan oleh perintah `table()`:


    console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
    console.table([[1,2,3], [2,3,4]]);
    
  
Ini akan menghasilkan keluaran:

![tampilan tabel konsol](images/table-arrays.png)

## Contoh lanjutan: Mencatat properti spesifik dalam log

Parameter kedua untuk `table()` bisa digunakan untuk mencatat objek yang lebih canggih ke log. Definisikan larik berisi string properti yang ingin Anda tampilkan, seperti:


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
    

Keluarannya akan seperti berikut ini:

![keluaran konsol dengan objek tabel](images/table-people-objects.png)




{# wf_devsite_translation #}
