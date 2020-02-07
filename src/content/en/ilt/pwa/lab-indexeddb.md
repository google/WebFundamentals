project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_blink_components: N/A #}
{# wf_updated_on: 2019-04-26 #}
{# wf_published_on: 2016-01-01 #}


# Lab: IndexedDB {: .page-title }
{% include "web/ilt/pwa/_shared/update.html" %}




Concepts:  [Working with IndexedDB](working-with-indexeddb)

<div id="overview"></div>


## Overview




This lab guides you through the basics of the  [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) using Jake Archibald's  [IndexedDB Promised](https://github.com/jakearchibald/indexeddb-promised) library. The IndexedDB Promised library is very similar to the IndexedDB API, but uses promises rather than events. This simplifies the API while maintaining its structure, so anything you learn using this library can be applied to the IndexedDB API directly.

This lab builds a furniture store app,  *Couches-n-Things* , to demonstrate the basics of IndexedDB.

#### What you will learn

* How to create object stores and indexes
* How to create, retrieve, update, and delete values (or CRUD)
* How to use cursors
* (Optional) How to use the `getAll()` method

#### What you should know

* Basic JavaScript and HTML
*  [JavaScript Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

#### What you will need

* Computer with terminal/shell access
*  [Chrome](https://www.google.com/chrome/browser/desktop/) (the unit tests have a Chrome dependency)

<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository and installed the  [LTS version of Node.js](https://nodejs.org/en/), follow the instructions in [Setting up the labs](setting-up-the-labs).

If you don't have a preferred local development server, install the Node.js `http-server` package:

    npm install http-server -g

Navigate into the `indexed-db-lab/app/` directory and start the server:

    cd indexed-db-lab/app
    http-server -p 8080 -a localhost -c 0

You can terminate the server at any time with `Ctrl-c`.

Open your browser and navigate to `localhost:8080/`.

Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.

If you have a text editor that lets you open a project, open the `indexed-db-lab/app/` folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The `app/` folder is where you will be building the lab.

This folder contains:

* `js/main.js` is where we will write the scripts to interact with the database
* `js/idb.js` is the IndexedDB Promised library
* `test/test.html` is a QUnit test page
* `index.html` is the main HTML page for our sample site/application, and which contains some forms for interacting with our IndexedDB database

<div id="2"></div>


## 2. Check for support




Because IndexedDB isn't supported by all browsers, we need to check that the user's browser supports it before using it.

Replace TODO 2 in `app/js/main.js` with the following code:

```
if (!('indexedDB' in window)) {
  console.log('This browser doesn\'t support IndexedDB');
  return;
}
```

<div id="3"></div>


## 3. Creating the database and adding items




### 3.1 Open a database

Create the database for your app.

In `js/main.js`, replace `var dbPromise;` with the following code:

```
var dbPromise = idb.open('couches-n-things', 1);
```

Save the file and refresh the page in the browser. [Open IndexedDB](tools-for-pwa-developers#indexeddb) in the developer tools and confirm that your database exists.

Note: The IndexedDB UI in DevTools doesn't always accurately reflect what's in the database. In Chrome, if you don't see your changes, try right-clicking on __IndexedDB__ in the __Application__ tab and then click __Refresh IndexedDB__. If it still doesn't update, then try closing and re-opening DevTools.

#### Explanation

`idb.open` takes a database name, version number, and optional callback function for performing database updates (not included in the above code). The version number determines whether the upgrade callback function is called. If the version number is greater than the version number of the database existing in the browser, then the upgrade callback is executed.

Note: If at any point in the codelab your database gets into a bad state, you can delete it in Chrome DevTools by going to the __Application__ tab, clicking on the database name under IndexedDB, and clicking the __Delete database__ button. Alternatively, you can click __Clear storage__ (in the Application tab) and then click the __Clear site data__ button. In all browsers you can also delete the database from the console with the following command: `indexedDB.deleteDatabase('couches-n-things');`.

### 3.2 Create an object store

Let's create an object store in the database to hold the furniture objects.

Replace `var dbPromise = idb.open('couches-n-things', 1);` in `main.js` with the following:

```
var dbPromise = idb.open('couches-n-things', 2, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      // a placeholder case so that the switch block will
      // execute when the database is first created
      // (oldVersion is 0)
    case 1:
      console.log('Creating the products object store');
      upgradeDb.createObjectStore('products', {keyPath: 'id'});

    // TODO 4.1 - create 'name' index

    // TODO 4.2 - create 'price' and 'description' indexes

    // TODO 5.1 - create an 'orders' object store

  }
});
```

Save the code and reload the page in the browser. [Open IndexedDB](tools-for-pwa-developers#indexeddb) in your browser's developer tools and expand the `couches-n-things` database. You should see the empty `products` object store.

Open the QUnit test page, `localhost:8080/test/test.html`, in another browser tab. This page contains several tests for testing our app at each stage of the codelab. Passed tests are blue and failed tests are red. Your app should pass the first test that checks whether the `products` object store exists in the database. Note that you may not be able to delete the database while the testing page is open.

#### Explanation

To ensure database integrity, object stores and indexes can only be created during database upgrades. This means they are created inside the upgrade callback function in `idb.open`, which executes only if the version number (in this case it's `2`) is greater than the existing version in the browser, or if the database doesn't exist. The callback is passed the `UpgradeDB` object (see the  [documentation](https://github.com/jakearchibald/idb#idbopenname-version-upgradecallback) for details), which is used to create the object stores.

Inside the callback, we include a switch block that executes its cases based on the version of the database already existing in the browser. `case 0` executes if the database doesn't yet exist. The database already exists for us, but we need a `case 0` in case we delete the database, or in case someone else uses our app on their own machine.

We have specified the `id` property as the `keyPath` for the object store. Objects added to this store must have an `id` property and the value must be unique.

Note: We are deliberately not including `break` statements in the switch block to ensure all of the cases after the starting case will execute.

#### For more information

*  [`idb` - Github](https://github.com/jakearchibald/idb)
*  [`createObjectStore` method](https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/createObjectStore)

### 3.3 Add objects to the object store

Add some sample furniture items to the object store.

Replace TODO 3.3 in `main.js` with the following code:

```
dbPromise.then(function(db) {
  var tx = db.transaction('products', 'readwrite');
  var store = tx.objectStore('products');
  var items = [
    {
      name: 'Couch',
      id: 'cch-blk-ma',
      price: 499.99,
      color: 'black',
      material: 'mahogany',
      description: 'A very comfy couch',
      quantity: 3
    },
    {
      name: 'Armchair',
      id: 'ac-gr-pin',
      price: 299.99,
      color: 'grey',
      material: 'pine',
      description: 'A plush recliner armchair',
      quantity: 7
    },
    {
      name: 'Stool',
      id: 'st-re-pin',
      price: 59.99,
      color: 'red',
      material: 'pine',
      description: 'A light, high-stool',
      quantity: 3
    },
    {
      name: 'Chair',
      id: 'ch-blu-pin',
      price: 49.99,
      color: 'blue',
      material: 'pine',
      description: 'A plain chair for the kitchen table',
      quantity: 1
    },
    {
      name: 'Dresser',
      id: 'dr-wht-ply',
      price: 399.99,
      color: 'white',
      material: 'plywood',
      description: 'A plain dresser with five drawers',
      quantity: 4
    },
    {
      name: 'Cabinet',
      id: 'ca-brn-ma',
      price: 799.99,
      color: 'brown',
      material: 'mahogany',
      description: 'An intricately-designed, antique cabinet',
      quantity: 11
    }
  ];
  return Promise.all(items.map(function(item) {
      console.log('Adding item: ', item);
      return store.add(item);
    })
  ).catch(function(e) {
    tx.abort();
    console.log(e);
  }).then(function() {
    console.log('All items added successfully!');
  });
});
```

Save the file and reload the page in the browser. Click __Add Products__ and refresh the page. Confirm that the objects display in the `products` object store under `couches-n-things` in the developer tools. Remember you may need to refresh IndexedDB to see the changes by right clicking __IndexedDB__ and clicking __Refresh IndexedDB__. If that doesn't work, then try collapsing IndexedDB and closing and re-opening DevTools.

Reload the test page. The app should now pass the next test that checks whether the objects have been added to the `products` object store.

#### Explanation

All database operations must be carried out within a  [transaction](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction). In the code we just wrote, we first open the transaction on the database object and then open the object store on the transaction. Now when we call `store.add` on that object store, the operation happens inside the transaction.

We add each object to the store inside a `Promise.all`. This way if any of the `add` operations fail, we can catch the error and abort the transaction. Aborting the transaction rolls back all the changes that happened in the transaction so that if any of the events fail to add, none of them will be added to the object store. This ensures the database is not left in a partially updated state.

Note: Specify the transaction mode as `readwrite` when making changes to the database (that is, for changes that use the `add`, `put`, or `delete` methods).

#### For more information

*  [Transactions - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction)
*  [Add method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/add)

<div id="4"></div>


## 4. Searching the database




### 4.1 Create indexes on the object store

Create some indexes on your object store.

Close the test page. The database version can't be changed while another page is using the database.

Replace TODO 4.1 in `main.js` with the following code:

```
case 2:
  console.log('Creating a name index');
  var store = upgradeDb.transaction.objectStore('products');
  store.createIndex('name', 'name', {unique: true});
```

Change the version number to 3 in the call to `idb.open`. The full `idb.open` method should look like this:

```
var dbPromise = idb.open('couches-n-things', 3, function(upgradeDb) {
  switch (upgradeDb.oldVersion) {
    case 0:
      // a placeholder case so that the switch block will
      // execute when the database is first created
      // (oldVersion is 0)
    case 1:
      console.log('Creating the products object store');
      upgradeDb.createObjectStore('products', {keyPath: 'id'});
    case 2:
      console.log('Creating a name index');
      var store = upgradeDb.transaction.objectStore('products');
      store.createIndex('name', 'name', {unique: true});

    // TODO 4.2 - create 'price' and 'description' indexes

    // TODO 5.1 - create an 'orders' object store

  }
});
```

Note: We did not include break statements in the switch block so that all of the latest updates to the database will execute even if the user is one or more versions behind.

Save the file and reload the page in the browser. Confirm that the `name` index displays in the `products` object store in the developer tools. You may need to refresh IndexedDB to see your changes.

Open the test page. The app should now pass the next test that checks whether the `name` index exists.

#### Explanation

In the example, we create an index on the `name` property, allowing us to search and retrieve objects from the store by their name. The optional `unique` option ensures that no two items added to the `products` object store use the same name.

#### For more information

*  [`IDBIndex` - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IDBIndex)
*  [`createIndex` method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/createIndex)

### 4.2 Create `price` and `description` indexes

This step is for you to complete on your own. In `main.js`, write a `case 3` in `idb.open` to add `price` and `description` indexes to the `products` object store. Do not include the optional `{unique: true}` argument since these values do not need to be unique. The code should be very similar to the code in the previous step. Remember to change the version number of the database to 4 before testing the code.

Before testing your code, close the unit test page in the browser. Save your changes to the code and refresh the page in the browser. Confirm that the `price` and `description` indexes display in the `products` object store in the developer tools. You may need to clear the database for the changes to appear in DevTools. Otherwise, you can just re-open the unit test page. If your app is passing the next two tests which check if the `price` and `description` indexes exist, you've done this step correctly.

### 4.3 Use the get method

Use the indexes you created in the previous sections to retrieve items from the store.

Add the following code to the `getByName` function in `main.js`:

```
return dbPromise.then(function(db) {
  var tx = db.transaction('products', 'readonly');
  var store = tx.objectStore('products');
  var index = store.index('name');
  return index.get(key);
});
```

Save the code and refresh the page in the browser.

Note: Make sure the items we added to the database in the previous step are still in the database. If the database is empty, click __Add Products__ to populate it. Don't worry about adding things twice. IndexedDB will throw errors in the console if you try to add items that already exist and won't add them to the store.

Enter an item name from step 3.3 (try "Chair") into the __By Name__ field and click __Search__ next to the text box. The corresponding furniture item should display on the page.

Refresh the test page. The app should pass the next test, which checks if the `getByName` function returns a database object.

Note: The `get` method (and consequently `getByName`) is case sensitive.

#### Explanation

The __Search__ button calls the `displayByName` function, which passes the user input string to the `getByName` function. The code we just added calls the `get` method on the `name` index to retrieve an item by its `name` property.

#### For more information

*  [`Get` method - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/get)

### 4.4 Use a cursor object

Use a cursor object to get items from your store within a price range.

Replace TODO 4.4a in `main.js` with the following code:

```
var lower = document.getElementById('priceLower').value;
var upper = document.getElementById('priceUpper').value;
var lowerNum = Number(document.getElementById('priceLower').value);
var upperNum = Number(document.getElementById('priceUpper').value);

if (lower === '' && upper === '') {return;}
var range;
if (lower !== '' && upper !== '') {
  range = IDBKeyRange.bound(lowerNum, upperNum);
} else if (lower === '') {
  range = IDBKeyRange.upperBound(upperNum);
} else {
  range = IDBKeyRange.lowerBound(lowerNum);
}
var s = '';
dbPromise.then(function(db) {
  var tx = db.transaction('products', 'readonly');
  var store = tx.objectStore('products');
  var index = store.index('price');
  return index.openCursor(range);
}).then(function showRange(cursor) {
  if (!cursor) {return;}
  console.log('Cursored at:', cursor.value.name);
  s += '<h2>Price - ' + cursor.value.price + '</h2><p>';
  for (var field in cursor.value) {
    s += field + '=' + cursor.value[field] + '<br/>';
  }
  s += '</p>';
  return cursor.continue().then(showRange);
}).then(function() {
  if (s === '') {s = '<p>No results.</p>';}
  document.getElementById('results').innerHTML = s;
});
```

Save the code and refresh the page in the browser. Enter some prices into the 'price' text boxes (without a currency symbol; try 200 and 500) and click __Search__. Items should appear on the page ordered by price.

__Optional__: On your own time, replace TODO 4.4b in the `getByDesc()` function with the code to get the items by their descriptions. The first part is done for you. The function uses the `only` method on `IDBKeyrange` to match all items with exactly the provided description. To test your code, try putting "A light, high-stool" into the __By Description__ input and clicking __Search__.

#### Explanation

After getting the price values from the page, we determine which method to call on `IDBKeyRange` to limit the cursor. We open the cursor on the `price` index and pass the cursor object to the `showRange` function in `.then`. This function adds the current object to the html string, moves on to the next object with `cursor.continue()`, and calls itself, passing in the cursor object. `showRange` loops through each object in the object store until it reaches the end of the range. Then the cursor object is `undefined` and `if (!cursor) {return;}` breaks the loop.

#### For more information

*  [`IDBCursor` - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor)
*  [`IDBKeyRange` - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange)
*  [`cursor.continue()` - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IDBCursor/continue)

#### Solution code

The solution code for the lab up to this point can be found in the `04-4-get-data/` directory.

<div id="5"></div>


## 5. Optional: Processing orders




In this section we create an `orders` object store to contain a user's orders. We take a sample order and check if the quantity of each item in the `products` object store is enough to fulfill the order. If we have enough in stock, we process the orders, subtracting the amount ordered from the quantity of each corresponding item in the `products` object store.

### 5.1 Create an orders object store

This step is for you to complete on your own. Create an object store to hold pending orders.

To complete TODO 5.1 in `main.js`, write a case 4 that adds an `orders` object store to the database. Make the `keyPath` the `id` property. This is very similar to creating the `products` object store in `case 1`. Remember to change the version number of the database to 5 so the callback executes.

Before testing your code, close the unit test page. Save the code and refresh the page in the browser. Confirm that the object store displays in the developer tools.

Open the test page. Your app should pass the next test which tests if the `orders` object store exists.

### 5.2 Add sample orders

This step is for you to complete on your own. In the `addOrders` function in `main.js`, write the code to add the following items to the `orders` object store. This code will be very similar to the `addProducts` function that we wrote at the start of the lab:

```
var items = [
  {
    name: 'Cabinet',
    id: 'ca-brn-ma',
    price: 799.99,
    color: 'brown',
    material: 'mahogany',
    description: 'An intricately-designed, antique cabinet',
    quantity: 7
  },
  {
    name: 'Armchair',
    id: 'ac-gr-pin',
    price: 299.99,
    color: 'grey',
    material: 'pine',
    description: 'A plush recliner armchair',
    quantity: 3
  },
  {
    name: 'Couch',
    id: 'cch-blk-ma',
    price: 499.99,
    color: 'black',
    material: 'mahogany',
    description: 'A very comfy couch',
    quantity: 3
  }
];
```

Save the code and refresh the page in the browser. Click __Add Orders__ and refresh the page again. Confirm that the objects show up in the `orders` store in the developer tools.

Refresh the test page. Your app should now pass the next test which checks if the sample orders were added to the `orders` object store.

### 5.3 Display orders

This step is for you to complete on your own. To complete TODO 5.3 in `main.js`, write the code to display all of the objects in the `orders` object store on the page. This is very similar to the `getByPrice` function except you don't need to define a range for the cursor and you should display the name instead of the price. The code to insert the `s` variable into the HTML is already written.

Save the code and refresh the page in the browser. Click __Show Orders__ to display the orders on the page.

### 5.4 Get all orders

This step is for you to complete on your own. To complete TODO 5.4 in the `getOrders` function in `main.js`, write the code to get all objects from the `orders` object store. You must use the  [getAll() method](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll) on the object store. This returns an array containing all the objects in the store, which is then passed to the `processOrders` function in in the `fulfillOrders` function.

__Hint:__ Return the call to `dbPromise` otherwise the orders array will not be passed to the `processOrders` function.

Refresh the test page. Your app should now pass the next test, which checks if the `getOrders` function gets objects from the `orders` object store.

### 5.5 Process the orders

This step processes the array of orders passed to the `processOrders` function.

Replace TODO 5.5 in `main.js` with the following code:

```
return dbPromise.then(function(db) {
  var tx = db.transaction('products');
  var store = tx.objectStore('products');
  return Promise.all(
    orders.map(function(order) {
      return store.get(order.id).then(function(product) {
        return decrementQuantity(product, order);
      });
    })
  );
});
```

#### Explanation

This code gets each object from the `products` object store with an id matching the corresponding order, and passes it and the order to the `decrementQuantity` function.

#### For more information

*  [Promise.all() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)
*  [Array.map() - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

### 5.6 Decrement quantity

Now we need to check if there are enough items left in the `products` object store to fulfill the order.

Replace TODO 5.6 in `main.js` with the following code:

```
return new Promise(function(resolve, reject) {
  var item = product;
  var qtyRemaining = item.quantity - order.quantity;
  if (qtyRemaining < 0) {
    console.log('Not enough ' + product.id + ' left in stock!');
    document.getElementById('receipt').innerHTML =
    '<h3>Not enough ' + product.id + ' left in stock!</h3>';
    throw 'Out of stock!';
  }
  item.quantity = qtyRemaining;
  resolve(item);
});
```

Refresh the test page. Your app should now pass the next test, which checks if the `decrementQuantity` function subtracts the quantity ordered from the quantity available.

#### Explanation

Here we are subtracting the quantity ordered from the quantity left in the `products` store. If this value is less than zero, we reject the promise. This causes `Promise.all` in the `processOrders` function to fail so that the whole order is not processed. If the quantity remaining is not less than zero, then we update the quantity and return the object.

#### For more information

*  [new `Promise` - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 5.7 Update the `products` object store

Finally, we must update the `products` object store with the new quantities of each item. This step is for you to complete on your own.

Replace TODO 5.7 in `main.js` with the code to update the items in the `products` objects store with their new quantities. We already updated the values in the `decrementQuantity` function and passed the array of updated objects into the `updateProductsStore` function. All that's left to do is use  [ObjectStore.put](https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put) to update each item in the store. A few hints:

* Remember to make the transaction mode `'readwrite'`
* Remember to return `tx.complete` after putting the items into the store

Save the code and refresh the page in the browser. Check the quantity property of the cabinet, armchair, and couch items in the products object store. Click __Fulfill__ in the page, refresh, and check the quantities again. They should be reduced by the amount of each product that was ordered.

Refresh the test page. Your app should now pass the last test, which checks whether the `updateProductsStore` function updates the items in the `products` object store with their reduced quantities.

#### Solution code

The solution code can be found in the `solution/` directory.

<div id="6"></div>


## Congratulations!




You have learned the basics of working with IndexedDB.

#### What we've covered

* How to create, read, update and delete data in the database
* The `getAll` method
* How to use cursors to iterate over the data


