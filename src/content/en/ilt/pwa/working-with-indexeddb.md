project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-01-01 #}


# Working with IndexedDB {: .page-title }




Codelab:  [IndexedDB](lab-indexeddb)

<div id="introduction"></div>


## Introduction




This text guides you through the basics of the  [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API). We are using Jake Archibald's  [IndexedDB Promised](https://github.com/jakearchibald/indexeddb-promised) library, which is very similar to the IndexedDB API, but uses promises rather than events. This simplifies the API while maintaining its structure, so anything you learn using this library can be applied to the IndexedDB API directly.

<div id="what"></div>


## What is IndexedDB?




IndexedDB is a large-scale, noSQL storage system. It lets you store just about anything in the user's browser. In addition to the usual search, get, and put actions, IndexedDB also supports transactions. Here is the definition of IndexedDB on MDN:

"IndexedDB is a low-level API for client-side storage of significant amounts of structured data, including files/blobs. This API uses indexes to enable high performance searches of this data. While DOM Storage is useful for storing smaller amounts of data, it is less useful for storing larger amounts of structured data. IndexedDB provides a solution."

Each IndexedDB database is unique to an origin (typically, this is the site domain or subdomain), meaning it cannot access or be accessed by any other origin.  [Data storage limits](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria) are usually quite large, if they exist at all, but different browsers handle limits and data eviction differently. See the  [Further reading](#resources) section for more information.

<div id="terms"></div>


## IndexedDB terms




[Database](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase) - This is the highest level of IndexedDB. It contains the object stores, which in turn contain the data you would like to persist. You can create multiple databases with whatever names you choose, but generally there is one database per app.

[Object store](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore) - An object store is an individual bucket to store data. You can think of object stores as being similar to tables in traditional relational databases. Typically, there is one object store for each 'type' (not JavaScript data type) of data you are storing. For example, given an app that persists blog posts and user profiles, you could imagine two object stores. Unlike tables in traditional databases, the actual JavaScript data types of data within the store do not need to be consistent (for example, if there are three people in the 'people' object store, their age properties could be 53, 'twenty-five', and  *unknown* ).

[Index](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex) - An Index is a kind of object store for organizing data in another object store (called the reference object store) by an individual property of the data. The index is used to retrieve records in the object store by this property. For example, if you're storing people, you may want to fetch them later by their name, age, or favorite animal.

Operation - An interaction with the database.

[Transaction](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction) - A transaction is wrapper around an operation, or group of operations, that ensures database integrity. If one of the actions within a transaction fail, none of them are applied and the database returns to the state it was in before the transaction began. All read or write operations in IndexedDB must be part of a transaction. This allows for atomic read-modify-write operations without worrying about other threads acting on the database at the same time.

[Cursor](https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor) - A mechanism for iterating over multiple records in database.

<div id="support"></div>


## Checking for IndexedDB support




Because IndexedDB isn't supported by all browsers, we need to check that the  [user's browser supports it](http://caniuse.com/#search=indexeddb) before using it. The easiest way is to check the window object:

```
if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
  return;
}
```

We simply place this function at the beginning of our scripts and we're ready to use IndexedDB.

<div id="open"></div>


## Opening a database




With IndexedDB you can create multiple databases with any names you choose. In general, there is just one database per app. To open a database, we use:

```
idb.open(name, version, upgradeCallback)
```

This method returns a promise that resolves to a database object. When using `idb.open`, you provide a name, version number, and an optional callback to set up the database. 

Here is an example of `idb.open` in context:

```
(function() {
  'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  var dbPromise = idb.open('test-db1', 1);

})();
```

We place our check for IndexedDB support at the top of the anonymous function. This exits out of the function if the browser doesn't support IndexedDB. We call `idb.open` to open a database named "test-db1". We have left out the optional callback function in this first example to keep things simple.

<div id="stores"></div>


## Working with object stores




### Creating object stores

A database typically contains one or more object stores. Object stores can be thought of as similar to tables in SQL databases and should contain objects of the same "type" (not JavaScript data type). For example, for a site persisting user profiles and notes, we can imagine a "people" object store containing "person" objects, and a "notes" object store. A well structured IndexedDB database should have one object store for each type of data you need to persist. 

To ensure database integrity, object stores can only be created and removed in the callback function in `idb.open`. The callback receives an instance of UpgradeDB, a special object in the IDB Promised library that is used to create object stores. Call the  [createObjectStore](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore) method on UpgradeDB to create the object store: 

```
upgradeDb.createObjectStore('storeName', options);
```

This method takes the name of the object store as well as a parameter object that lets us define various configuration properties for the object store.

Below is an example of the `createObjectStore` method:

```
(function() {
  'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  var dbPromise = idb.open('test-db2', 1, function(upgradeDb) {
    console.log('making a new object store');
    if (!upgradeDb.objectStoreNames.contains('firstOS')) {
      upgradeDb.createObjectStore('firstOS');
    }
  });

})();
```

Again, we first check the browser for IndexedDB support. This time we include the callback function in `idb.open` in order to create the object store. The browser throws an error if we try to create an object store that already exists in the database so we wrap the `createObjectStore` method in an `if` statement that checks if the object store exists. Inside the `if` block we call `createObjectStore` on the UpgradeDB object to create an object store named "firstOS".

### Defining primary keys

When you define object stores, you can define how data is uniquely identified in the store using the primary key. You can define a primary key by either defining a key path, or by using a key generator. 

A  *key path*  is a property that always exists and contains a unique value. For example, in the case of a "people" object store we could choose the email address as the key path. 

```
upgradeDb.createObjectStore('people', {keyPath: 'email'});
```

This example creates an object store called "people" and assigns the "email" property as the primary key. 

You could also use a key generator, such as `autoIncrement`. The key generator creates a unique value for every object added to the object store. By default, if we don't specify a key, IndexedDB creates a key and stores it separately from the data.

```
upgradeDb.createObjectStore('notes', {autoIncrement:true});
```

This example creates an object store called "notes" and sets the primary key to be assigned automatically as an auto incrementing number.

```
upgradeDb.createObjectStore('logs', {keyPath: 'id', autoIncrement:true});
```

This example is similar to the previous example, but this time the auto incrementing value is assigned to a property called "id". 

Choosing which method to use to define the key depends on your data. If your data has a property that is always unique, you can make it the keypath to enforce this uniqueness. Otherwise, using an auto incrementing value makes sense.

Let's look at an example:

```
function() {
  'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  var dbPromise = idb.open('test-db3', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('people')) {
      upgradeDb.createObjectStore('people', {keyPath: 'email'});
    }
    if (!upgradeDb.objectStoreNames.contains('notes')) {
      upgradeDb.createObjectStore('notes', {autoIncrement: true});
    }
    if (!upgradeDb.objectStoreNames.contains('logs')) {
      upgradeDb.createObjectStore('logs', {keyPath: 'id', autoIncrement: true});
    }
  });
})();
```

This code creates three object stores demonstrating the various ways of defining primary keys in object stores. 

### Defining indexes

Indexes are a kind of object store used to retrieve data from the reference object store by a specified property. An index lives inside the reference object store and contains the same data, but uses the specified property as its key path instead of the reference store's primary key. Indexes must be made when you create your object stores and can also be used to define a unique constraint on your data.

To create an index, call the  [createIndex](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex) method on an object store instance:

```
objectStore.createIndex('indexName', 'property', options);
```

This method creates and returns an index object. `createIndex` takes the name of the new index as the first argument, and the second argument refers to the property on the data you want to index. The final argument lets you define two options that determine how the index operates:  *unique*  and  *multiEntry* . If  *unique*  is set to true, the index does not allow duplicate values for a single key.  *multiEntry*  determines how `createIndex` behaves when the indexed property is an array. If it's set to true, `createIndex` adds an entry in the index for each array element. Otherwise, it adds a single entry containing the array.

Here is an example:

```
(function() {
  'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return;
  }

  var dbPromise = idb.open('test-db4', 1, function(upgradeDb) {
    if (!upgradeDb.objectStoreNames.contains('people')) {
      var peopleOS = upgradeDb.createObjectStore('people', {keyPath: 'email'});
      peopleOS.createIndex('gender', 'gender', {unique: false});
      peopleOS.createIndex('ssn', 'ssn', {unique: true});
    }
    if (!upgradeDb.objectStoreNames.contains('notes')) {
      var notesOS = upgradeDb.createObjectStore('notes', {autoIncrement: true});
      notesOS.createIndex('title', 'title', {unique: false});
    }
    if (!upgradeDb.objectStoreNames.contains('logs')) {
      var logsOS = upgradeDb.createObjectStore('logs', {keyPath: 'id',
        autoIncrement: true});
    }
  });
})();
```

In this example, the "people" and "notes" object stores have indexes. To create the indexes, we first assign the result of `createObjectStore` (which is an object store object) to a variable so we can call `createIndex` on it.



Note: Indexes are updated every time you write data to the reference object store. More indexes mean more work for IndexedDB.



<div id="data"></div>


## Working with data




In this section, we describe how to create, read, update, and delete data. These operations are all asynchronous, using promises where the IndexedDB API uses requests. This simplifies the API. Instead of listening for events triggered by the request, we can simply call `.then` on the database object returned from `idb.open` to start interactions with the database.

All data operations in IndexedDB are carried out inside a transaction. Each operation has this form:

1. Get database object
2. Open transaction on database
3. Open object store on transaction
4. Perform operation on object store

A transaction can be thought of as a safe wrapper around an operation or group of operations. If one of the actions within a transaction fail, all of the actions are rolled back. Transactions are specific to one or more object stores, which we define when we open the transaction. They can be read-only or read and write. This signifies whether the operations inside the transaction read the data or make a change to the database.

### Creating data

To create data, call the  [add](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add) method on the object store and pass in the data you want to add. Add has an optional second argument that lets you define the primary key for the individual object on creation, but it should only be used if you have not specified the key path in `createObjectStore`. Here is a simple example:

```
someObjectStore.add(data, optionalKey);
```

The data parameter can be data of any type: a string, number, object, array, and so forth. The only restriction is if the object store has a defined keypath, the data must contain this property and the value must be unique. The add method returns a promise that resolves once the object has been added to the store. 

Add occurs within a transaction, so even if the promise resolves successfully it doesn't necessarily mean the operation worked. Remember, if one of the actions in the transaction fails, all of the operations in the transaction are rolled back. To be sure that the add operation was carried out, we need to check if the whole transaction has completed using the `transaction.complete` method. `transaction.complete` is a promise that resolves when the transaction completes and rejects if the transaction errors. Note that this method doesn't actually close the transaction. The transaction completes on its own. We must perform this check for all "write" operations, because it is our only way of knowing that the changes to the database have actually been carried out.

Let's look at an example of the `add` method:

```
dbPromise.then(function(db) {
  var tx = db.transaction('store', 'readwrite');
  var store = tx.objectStore('store');
  var item = {
    name: 'sandwich',
    price: 4.99,
    description: 'A very tasty sandwich',
    created: new Date().getTime()
  };
  store.add(item);
  return tx.complete;
}).then(function() {
  console.log('added item to the store os!');
});
```

First, we get the database object. We call `.then` on `dbPromise`, which resolves to the database object, and pass this object to the callback function in `.then`. Because `dbPromise` (`idb.open`) is a promise, we can safely assume that when `.then` executes, the database is open and all object stores and indexes are ready for use. 

The next step is to open a transaction by calling the `transaction` method on the database object. This method takes a list of names of object stores and indexes, which defines the scope of the transaction (in our example it is just the "store" object store). The transaction method also has an optional second argument for the mode, which can be `readonly` or `readwrite`. This option is read-only by default.

We can then open the "store" object store on this transaction and assign it to the `store` variable. Now when we call `store.add`, the add operation occurs within the transaction. Finally, we return `tx.complete` and log a success message once the transaction has completed.

### Reading data

To read data, call the  [`get`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get) method on the object store. The `get` method takes the primary key of the object you want to retrieve from the store. Here is a basic example:

```
someObjectStore.get(primaryKey);
```

As with `add`, the `get` method returns a promise and must happen within a transaction.

Let's look at an example of the `get` method:

```
dbPromise.then(function(db) {
  var tx = db.transaction('store', 'readonly');
  var store = tx.objectStore('store');
  return store.get('sandwich');
}).then(function(val) {
  console.dir(val);
});
```

Once again, we start the operation by getting the database object and creating a transaction. Note that this time it is a read-only transaction because we are not writing anything to the database inside the transaction (that is, using `put`, `add`, or `delete`). We then open the object store on the transaction and assign the resulting object store object to the `store` variable. Finally, we return the result of `store.get` and log this object to the console. 



Note: If you try to get an object that doesn't exist, the success handler still executes, but the result is <code>undefined</code>.



### Updating data

To update data, call the  [`put`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put) method on the object store. The `put` method is very similar to the `add` method and can be used instead of `add` to create data in the object store. Like `add`, `put` takes the data and an optional primary key:

```
someObjectStore.put(data, optionalKey);
```

Again, this method returns a promise and occurs inside a transaction. As with `add`, we need to be careful to check `transaction.complete` if we want to be sure that the operation was actually carried out. 

Here is an example using the `put` method:

```
dbPromise.then(function(db) {
  var tx = db.transaction('store', 'readwrite');
  var store = tx.objectStore('store');
  var item = {
    name: 'sandwich',
    price: 99.99,
    description: 'A very tasty, but quite expensive, sandwich',
    created: new Date().getTime()
  };
  store.put(item);
  return tx.complete;
}).then(function() {
  console.log('item updated!');
});
```

To update an existing item in the object store, use the `put` method on an object containing the same primary key value as the object in the store. We are assuming the keyPath for the store object store is the "name" property and we are updating the price and description of our "sandwich" object. The database interaction has the same structure as the create and read operations: get the database object, create a transaction, open an object store on the transaction, perform the operation on the object store.

### Deleting data

To delete data, call the  [`delete`](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/delete) method on the object store.

```
someObjectStore.delete(primaryKey);
```

Once again, this method returns a promise and must be wrapped in a transaction. Here is a simple example:

```
dbPromise.then(function(db) {
  var tx = db.transaction('store', 'readwrite');
  var store = tx.objectStore('store');
  store.delete(key);
  return tx.complete;
}).then(function() {
  console.log('Item deleted');
});
```

The structure of the database interaction is the same as for the other operations. Note that we again check that the whole transaction has completed by returning the `tx.complete` method to be sure that the delete was carried out.

<div id="get"></div>


## Getting all the data




So far we have only retrieved objects from the store one at a time. We can also retrieve all of the data (or subset) from an object store or index using either the `getAll` method or using cursors. 

### Using the getAll method

The simplest way to retrieve all of the data is to call the `getAll` method on the object store or index, like this:

```
someObjectStore.getAll(optionalConstraint);
```

This method returns all the objects in the object store matching the specified key or key range (see  [Working with ranges and indexes](#ranges)), or all objects in the store if no parameter is given. As with all other database operations, this operation happens inside a transaction. Here is a short example:

```
dbPromise.then(function(db) {
  var tx = db.transaction('store', 'readonly');
  var store = tx.objectStore('store');
  return store.getAll();
}).then(function(items) {
  console.log('Items by name:', items);
});
```

Here we are calling `getAll` on the "store" object store. This returns all of the objects in the store ordered by the primary key.

### Using cursors

Another way to retrieve all of the data is to use a cursor. A cursor selects each object in an object store or index one by one, letting you do something with the data as it is selected. Cursors, like the other database operations, work within transactions.

We create the cursor by calling the  [openCursor](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/openCursor) method on the object store, like this:

```
someObjectStore.openCursor(optionalKeyRange, optionalDirection);
```

This method returns a promise for a cursor object representing the first object in the object store or `undefined` if there is no object. To move on to the next object in the object store, we call `cursor.continue`. This moves the cursor object onto the next object or returns `undefined` if there isn't another object. We put this inside a loop to move through all of the entries in the store one by one. The optional key range in the `openCursor` method limits `cursor.continue` to a subset of the objects in the store. The direction option can be `next` or `prev` specifying forward or backward traversal through the data.

The next example uses a cursor to iterate through all the items in the "store" object store and log them to the console:

```
dbPromise.then(function(db) {
  var tx = db.transaction('store', 'readonly');
  var store = tx.objectStore('store');
  return store.openCursor();
}).then(function logItems(cursor) {
  if (!cursor) {return;}
  console.log('Cursored at:', cursor.key);
  for (var field in cursor.value) {
    console.log(cursor.value[field]);
  }
  return cursor.continue().then(logItems);
}).then(function() {
  console.log('Done cursoring');
});
```

As usual, we start by getting the database object, creating a transaction, and opening an object store. We call the `openCursor` method on the object store and pass the cursor object to the callback function in `.then`. This time we name the callback function "logItems" so we can call it from inside the function and make a loop. The line `if (!cursor) return;` breaks the loop if `cursor.continue` returns `undefined` (that is, runs out of items to select). 

The cursor object contains a `key` property that represents the primary key for the item. It also contains a `value` property that represents the data. At the end of `logItems`, we return `cursor.continue().then(logItems)`. `cursor.continue` that resolves to a cursor object representing the next item in the store or `undefined` if it doesn't exist. This is passed to the callback function in `.then,` which we have chosen to be `logItems,`so that the function loops. `logItems` continues to call itself until `cursor.continue` runs out of objects.

<div id="ranges"></div>

### Working with ranges and indexes

We can get all the data in a couple of different ways, but what if we want only a subset of the data based on a particular property? This is where indexes come in. Indexes let us fetch the data in an object store by a property other than the primary key. We can create an index on any property (which becomes the keypath for the index), specify a range on that property, and get the data within the range using the `getAll` method or a cursor.

We define the range using the `IDBKeyRange` object. This object has four methods that are used to define the limits of the range: `upperBound`, `lowerBound`, `bound` (which means both), and `only`. As expected, the `upperBound` and `lowerBound` methods specify the upper and lower limits of the range. 

```
IDBKeyRange.lowerBound(indexKey);
```

Or

```
IDBKeyRange.upperBound(indexKey);
```

They each take one argument which is be the index's keypath value of the item you want to specify as the upper or lower limit.

The `bound` method is used to specify both an upper and lower limit, and takes the lower limit as the first argument:

```
IDBKeyRange.bound(lowerIndexKey, upperIndexKey);
```

The range for these functions is inclusive by default, but can be specified as exclusive by passing `false` in the second argument (or the third in the case of `bound`). An inclusive range includes the data at the limits of the range. An exclusive range does not.

Let's look at an example. For this demo, we have created an index on the "price" property in the "store" object store. We have also added a small form with two inputs for the upper and lower limits of the range. Imagine we are passing in the lower and upper bounds to the function as floating point numbers representing prices:

```
function searchItems(lower, upper) {
  if (lower === '' && upper === '') {return;}

  var range;
  if (lower !== '' && upper !== '') {
    range = IDBKeyRange.bound(lower, upper);
  } else if (lower === '') {
    range = IDBKeyRange.upperBound(upper);
  } else {
    range = IDBKeyRange.lowerBound(lower);
  }

  dbPromise.then(function(db) {
    var tx = db.transaction(['store'], 'readonly');
    var store = tx.objectStore('store');
    var index = store.index('price');
    return index.openCursor(range);
  }).then(function showRange(cursor) {
    if (!cursor) {return;}
    console.log('Cursored at:', cursor.key);
    for (var field in cursor.value) {
      console.log(cursor.value[field]);
    }
    return cursor.continue().then(showRange);
  }).then(function() {
    console.log('Done cursoring');
  });
}
```

The code first gets the values for the limits and checks if the limits exist. The next block of code decides which method to use to limit the range based on the values. In the database interaction, we open the object store on the transaction as usual, then we open the "price" index on the object store. The "price" index allows us to search for the items by price. We open a cursor on the index and pass in the range. The cursor now returns a promise representing the first object in the range, or `undefined` if there is no data within the range. `cursor.continue` returns a cursor a object representing the next object and so on through the loop until we reach the end of the range.

<div id="versioning"></div>


## Using database versioning




When we call `idb.open`, we can specify the database version number in the second parameter. If this version number is greater than the version of the existing database, the upgrade callback executes, allowing us to add object stores and indexes to the database. 



Note: The browser throws an error if we try to create object stores or indexes that already exist in the database. We can wrap the calls to <code>createObjectStore</code> in <code>if</code> statements checking if the object store already exists using <code>upgradeDb.objectStoreNames.contains('objectStoreName')</code>. We can also use a <code>switch</code> statement on the <code>oldVersion</code> property as in the next example.



The UpgradeDB object gets a special `oldVersion` method that returns the version number of the database existing in the browser. We can pass this version number into a `switch` statement to execute blocks of code inside the upgrade callback based on the existing database version number. Let's look at an example:

```
var dbPromise = idb.open('test-db7', 2, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('store', {keyPath: 'name'});
    case 1:
      var peopleStore = upgradeDb.transaction.objectStore('store');
      peopleStore.createIndex('price', 'price');
  }
});
```

In the example we have set the newest version of the database at 2. When this code first executes, since the database doesn't yet exist in the browser, `upgradeDb.oldVersion` is 0 and the `switch` statement starts at `case 0`. In our example, this results in a "store" object store being added to the database. Usually, in switch statements, there is a break after each case, but we are deliberately not doing that here. This way, if the existing database is a few versions behind (or if it doesn't exist), the code continues through the rest of the case blocks until it has executed all the latest changes. So in our example, the browser continues executing through `case 1`, creating a "price" index on the "store" object store. Once this has finished executing, the database in the browser is at version 2 and contains a "store" object store with a "price" index.

Let's say we now want to create a "description" index on the "store" object store. We need to update the version number and add a case, like this:

```
var dbPromise = idb.open('test-db7', 3, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      upgradeDb.createObjectStore('store', {keyPath: 'name'});
    case 1:
      var storeOS = upgradeDb.transaction.objectStore('store');
      storeOS.createIndex('price', 'price');
    case 2:
      var storeOS = upgradeDb.transaction.objectStore('store');
      storeOS.createIndex('description', 'description');
  }
});
```

Assuming the database we created in the previous example still exists in the browser, when this executes `upgradeDb.oldVersion` is 2. `case 0` and `case 1` are skipped and the browser executes the code in `case 2`, which creates a "description" index. Once all this has finished, the browser has a database at version 3 containing a "store" object store with "price" and "description" indexes.

<div id="resources"></div>


## Further reading




### IndexedDB Documentation

*  [Using IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB) - MDN
*  [Basic Concepts Behind indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Basic_Concepts_Behind_IndexedDB) - MDN
*  [Indexed Database API](https://www.w3.org/TR/IndexedDB/) - W3C

### Data storage limits

*  [Working with quota on mobile browsers](http://www.html5rocks.com/en/tutorials/offline/quota-research/)
*  [Browser storage limits and eviction criteria](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria)

<div id="appendix"></div>


## Appendix




### Comparison of IndexedDB API and IndexedDB Promised library

The IndexedDB Promised library sits on top of the IndexedDB API, translating its requests into promises. The overall structure is the same between the library and the API and, in general, the actual syntax for the database operations is the same and they will act the same way. But there are a few differences because of the differences between requests and promises, which we will cover here.

All database interactions in the IndexedDB API are requests and have associated `onsuccess` and `onerror` event handlers. These are similar to the `.then` and `.catch` promise functions. The `indexedDB.open` method in the raw API also gets a special event handler, `onupgradeneeded`, which is used to create the object stores and indexes. This is equivalent to the upgrade callback in `idb.open` in the Promised library. In fact, if you look through the Promised library, you will find the upgrade callback is just a convenient wrapper for the `onupgradeneeded` event handler.

Let's look at an example of the IndexedDB API. In this example we will open a database, add an object store, and add one item to the object store:

```
var db;

var openRequest = indexedDB.open('test_db', 1);

openRequest.onupgradeneeded = function(e) {
  var db = e.target.result;
  console.log('running onupgradeneeded');
  if (!db.objectStoreNames.contains('store')) {
    var storeOS = db.createObjectStore('store',
      {keyPath: 'name'});
  }
};
openRequest.onsuccess = function(e) {
  console.log('running onsuccess');
  db = e.target.result;
  addItem();
};
openRequest.onerror = function(e) {
  console.log('onerror!');
  console.dir(e);
};

function addItem() {
  var transaction = db.transaction(['store'], 'readwrite');
  var store = transaction.objectStore('store');
  var item = {
    name: 'banana',
    price: '$2.99',
    description: 'It is a purple banana!',
    created: new Date().getTime()
  };
 
 var request = store.add(item);
 
 request.onerror = function(e) {
    console.log('Error', e.target.error.name);
  };
  request.onsuccess = function(e) {
    console.log('Woot! Did it');
  };
}
```

This code does something very similar to previous examples in this tutorial except that it doesn't use the Promised library. We can see that the structure of the database interaction hasn't changed. Object stores are created on the database object in the upgrade event handler, and items are added to the object store in the same transaction sequence we've seen before. The difference is that this is done with requests and event handlers rather than promises and promise chains.

Here is a short reference of the differences between the IndexedDB API and the IndexedDB Promised library.

<table markdown="1">
<tr><td colspan="1" rowspan="1">
<p> </p>
</td><td colspan="1" rowspan="1">
<p>IndexedDB Promised</p>
</td><td colspan="1" rowspan="1">
<p>IndexedDB API</p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Open database</p>
</td><td colspan="1" rowspan="1">
<p><code>idb.open(name, version, upgradeCallback)</code></p>
</td><td colspan="1" rowspan="1">
<p><code>indexedDB.open(name, version)</code></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Upgrade database</p>
</td><td colspan="1" rowspan="1">
<p>Inside upgradeCallback</p>
</td><td colspan="1" rowspan="1">
<p><code>request.onupgradeneeded</code></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Success</p>
</td><td colspan="1" rowspan="1">
<p><code>.then</code></p>
</td><td colspan="1" rowspan="1">
<p><code>request.onsuccess</code></p>
</td>
</tr>
<tr><td colspan="1" rowspan="1">
<p>Error</p>
</td><td colspan="1" rowspan="1">
<p><code>.catch</code></p>
</td><td colspan="1" rowspan="1">
<p><code>request.onerror</code></p>
</td>
</tr></table>



