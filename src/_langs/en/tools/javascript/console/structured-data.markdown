---
rss: false
layout: article
title: "View Structured Data in Console"
seotitle: "View Structured Data in Chrome DevTools Console"
description: "Compare data objects using the `table()` method."
introduction: "Compare data objects using the `table()` method."
article:
  written_on: 2015-04-14
  updated_on: 2015-04-14
  order: 3
authors:
  - megginkearney
priority: 0
collection: console
key-takeaways:
  console:
    - Compare similar data objects using `table()`.
    - Build an array to define property strings.
remember:
  note-tbd:
    - TBD note.
---
{% wrap content %}

{% include modules/takeaway.liquid list=page.key-takeaways.console %}

## Viewing Structured Data

The `table()` method provides an easy way to view similar data objects. This will take the properties of an object and create a header. Row data comes from each indexes' properties value.

### A table in the console using two arrays.

Example code:

    console.table([{a:1, b:2, c:3}, {a:"foo", b:false, c:undefined}]);
    console.table([[1,2,3], [2,3,4]]);
  
The output of the example code:

![console table display](images/table-arrays.png)

The second parameter to table() is optional. You may define an array containing the property strings you wish to display.

### A console table using a collection of objects.

Example code:

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

The output of the example code:

![console output with table objects](images/table-people-objects.png)

{% include modules/nextarticle.liquid %}

{% endwrap %}
