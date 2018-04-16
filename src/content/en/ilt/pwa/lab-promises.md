project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2018-04-12 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Promises {: .page-title }




Concepts:  [Working with Promises](working-with-promises)

<div id="overview"></div>


## Overview




This lab teaches you how to use JavaScript  [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

#### What you will learn

* How to create promises
* How to chain promises together
* How to handle errors in promises
* How to use Promise.all and Promise.race

#### What you should know

* Basic JavaScript and HTML
* The concept of an  [Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (IIFE)
* How to enable the developer console

#### What you will need

* A browser that supports  [Promises](http://caniuse.com/#feat=promises) and  [Fetch](http://caniuse.com/#feat=fetch)
* A text editor
* Computer with terminal/shell access
* Connection to the internet

<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs).

Open your browser and navigate to __localhost:8080/promises-lab/app__.



Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.



If you have a text editor that lets you open a project, open the __promises-lab/app__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __app__ folder is where you will be building the lab.

This folder contains:

* __flags/chile.png__, __flags/peru.png__, __flags/spain.png__ - sample resources that we use to experiment
* __js/main.js__ is the main JavaScript file for the app
* __test/test.html__ is a file for testing your progress
* __index.html__ is the main HTML page for our sample site/application

<div id="2"></div>


## 2. Using promises




This step uses  [Promises](/web/fundamentals/getting-started/primers/promises) to handle asynchronous code in JavaScript.

### 2.1 Create a promise

Let's start by creating a simple promise.

Complete the <code>getImageName</code> function by replacing TODO 2.1 in <strong>js/main.js</strong> with the following code:

#### main.js

```
country = country.toLowerCase();
var promiseOfImageName = new Promise(function(resolve, reject) {
  setTimeout(function() {
    if (country === 'spain' || country === 'chile' || country === 'peru') {
      resolve(country + '.png');
    } else {
      reject(Error('Didn\'t receive a valid country name!'));
    }
  }, 1000);
});
console.log(promiseOfImageName);
return promiseOfImageName;
```

Save the script and refresh the page.

Enter "Spain" into the app's __Country Name__ field. Then, click __Get Image Name__. You should see a  [Promise object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) logged in the console.

Now enter "Hello World" into the __Country Name__ field and click __Get Image Name__. You should see another Promise object logged in the console, followed by an error.



Note: Navigate to <strong>app/test/test.html</strong> in the browser to check your function implementations. Functions that are incorrectly implemented or unimplemented show red errors. Be sure to open the test page using the localhost address so that it opens from the server and not directly from the file system.



#### Explanation

The `getImageName` function creates a  [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise). A promise represents a value that might be available now, in the future, or never. In effect, a promise lets an asynchronous function such as `getImageName` (the `setTimeout` method is used to make `getImageName` asynchronous) return a value much like a synchronous function. Rather than returning the final value (in this case, "Spain.png"), `getImageName` returns a promise of a future value (this is what you see in the console log). Promise construction typically looks like  [this example at developers.google.com](/web/fundamentals/getting-started/primers/promises#promises_arrive_in_javascript):

#### main.js

```
var promise = new Promise(function(resolve, reject) {
  // do a thing, possibly async, then...

  if (/* everything turned out fine */) {
    resolve("Stuff worked!");
  }
  else {
    reject(Error("It broke"));
  }
});
```

Depending on the outcome of an asynchronous operation, a promise can either  [resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve) with a value or  [reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) with an error. In the `getImageName` function, the `promiseOfImageName` promise either resolves with an image filename, or rejects with a custom error signifying that the function input was invalid.

__Optional__: Complete the `isSpain` function so that it takes a string as input, and returns a new promise that resolves if the function input is "Spain", and rejects otherwise. You can verify that you implemented `isSpain` correctly by navigating to __app/test/test.html__ and checking the `isSpain` test. Note that this exercise is optional and is not used in the app.

### 2.2. Use the promise

This section uses the promise we just created.

Replace TODO 2.2 inside the <code>flagChain</code> function in <strong>js/main.js</strong> with the following code:

#### main.js

```
return getImageName(country)
.then(logSuccess, logError);
```

Save the script and refresh the page.

Enter "Spain" into the app's __Country Name__ field again. Now click __Flag Chain__. In addition to the promise object, "Spain.png" should now be logged.

Now enter "Hello World" into the __Country Name__ text input and click __Flag Chain__ again. You should see another promise logged in the console, followed by a custom error message.

#### Explanation

The `flagChain` function returns the result of `getImageName`, which is a promise. The  [then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then) method lets us implicitly pass the settled (either resolved or rejected) promise to another function. The `then` method takes two arguments in the following order:

1. The function to be called if the promise resolves.
2. The function to be called if the promise rejects.

If the first function is called, then it is implicitly passed the resolved promise value. If the second function is called, then it is implicitly passed the rejection error.



Note: We used named functions inside <code>then</code> as good practice, but we could use <a href="https://en.wikibooks.org/wiki/JavaScript/Anonymous_functions">anonymous functions</a> as well.



### 2.3 Use catch for error handling

Let's look at the `catch` method, which is a clearer alternative for error handling.

Replace the code inside the `flagChain` function with the following:

#### main.js

```
return getImageName(country)
.then(logSuccess)
.catch(logError);
```

Save the script and refresh the page. Repeat the experiments from section 2.2 and note that the results are identical.

#### Explanation

The  [catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch) method is similar to `then`, but deals only with rejected cases. It behaves like `then(undefined, onRejected)`. With this new pattern, if the promise from `getImageName` resolves, then `logSuccess` is called (and is implicitly passed the resolved promise value). If the promise from `getImageName` rejects, then `logError` is called (and implicitly passed the rejection error).

This code is not quite equivalent to the code in section 2.2, however. This new code also triggers `catch` if `logSuccess` rejects, because `logSuccess` occurs before the `catch`. This new code would actually be equivalent to the following:

#### main.js

```
return getImageName(country)
.then(logSuccess)
.then(undefined, logError);
```

The difference is subtle, but extremely useful. Promise rejections skip forward to the next `then` with a rejection callback (or `catch`, since they're equivalent). With `then(func1, func2)`, `func1` or `func2` will be called, never both. But with `then(func1).catch(func2)`, both will be called if `func1` rejects, as they're separate steps in the chain.

__Optional__: If you wrote the optional `isSpain` function in section 2.1, complete the `spainTest` function so that it takes a string as input and returns a promise using an `isSpain` call with the input string. Use `then` and `catch` such that `spainTest` returns a value of true if the `isSpain` promise resolves and false if the `isSpain` promise rejects (you can use the `returnTrue` and `returnFalse` helper functions). You can verify that you have implemented `spainTest` correctly by navigating to __app/test/test.html__ and checking the `spainTest` test.

#### For more information

*  [Promise object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
*  [Promises introduction](/web/fundamentals/getting-started/primers/promises)
*  [Resolve](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)
*  [Reject](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)
*  [Then](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)
*  [Catch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

#### Solution code

To get a copy of the working code, navigate to the __02-basic-promises__ folder.

<div id="3"></div>


## 3. Chaining promises




The `then` and `catch` methods also return promises, making it possible to chain promises together.

### 3.1 Add asynchronous steps

Replace the code in the `flagChain` function with the following:

#### main.js

```
return getImageName(country)
.then(fetchFlag)
.then(processFlag)
.then(appendFlag)
.catch(logError);
```

Save the script and refresh the page.

Enter "Spain" into the app's __Country Name__ text input. Now click __Flag Chain__. You should see the Spanish flag display on the page.

Now enter "Hello World" into the __Country Name__ text input and click __Flag Chain__. The console should show that the error is triggering `catch`.

#### Explanation

The updated `flagChain` function does the following:

1. As before, `getImageName` returns a promise. The promise either resolves with an image file name, or rejects with an error, depending on the function's input.
2. If the returned promise resolves, then the image file name is passed to `fetchFlag` inside the first `then`. This function requests the corresponding image file asynchronously, and returns a promise (see  [fetch](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) documentation).
3. If the promise from `fetchFlag` resolves, then the resolved value (a  [response](https://developer.mozilla.org/en-US/docs/Web/API/Response) object) is passed to `processFlag` in the next `then`. The `processFlag` function checks if the response is ok, and throws an error if it is not. Otherwise, it processes the response with the `blob` method, which also returns a promise.
4. If the promise from `processFlag` resolves, the resolved value (a  [blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob)), is passed to the `appendFlag` function. The `appendFlag` function creates an image from the value and appends it to the DOM.

If any of the promises reject, then all subsequent `then` blocks are skipped, and `catch` executes, calling `logError`. Throwing an error in the `processFlag` function also triggers the `catch` block.

### 3.2 Add a recovery catch

The `flagChain` function does not add a flag to the page if an invalid country is used as input (`getImageName` rejects and execution skips to the `catch` block).

Add a `catch` to the promise chain that uses the `fallbackName` function to supply a fallback image file name to the `fetchFlag` function if an invalid country is supplied to `flagChain`. To verify this was added correctly, navigate to __app/test/test.html__ and check the `flagChain` test.



Note: This test is asynchronous and may take a few moments to complete.



Save the script and refresh the page. Enter "Hello World" in the __Country Name__ field and click __Flag Chain__. Now the Chilean flag should display even though an invalid input was passed to `flagChain`.

#### Explanation

Because `catch` returns a promise, you can use the `catch` method inside a promise chain to  *recover*  from earlier failed operations.

#### For more information

*  [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch)

#### Solution code

To get a copy of the working code, navigate to the __03-chaining-promises__ folder.

<div id="4"></div>


## 4. Optional: Using Promise.all and Promise.race




### 4.1 Promise.all

Often we want to take action only after a collection of asynchronous operations have completed successfully.

Complete the `allFlags` function such that it takes a list of promises as input. The function should use  [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all) to evaluate the list of promises. If all promises resolve successfully, then `allFlags` returns the values of the resolved promises as a list. Otherwise, `allFlags` returns `false`. To verify that you have done this correctly, navigate to __app/test/test.html__ and check the `allFlags` test.

Test the function by replacing TODO 4.1 in <strong>js/main.js</strong> with the following code:

#### main.js

```
var promises = [
  getImageName('Spain'),
  getImageName('Chile'),
  getImageName('Peru')
];

allFlags(promises).then(function(result) {
  console.log(result);
});
```

Save the script and refresh the page. The console should log each promise object and show `["spain.png", "chile.png", "peru.png"]`.



Note: In this example we are using an <a href="https://en.wikibooks.org/wiki/JavaScript/Anonymous_functions">anonymous function</a> inside the <code>then</code> call. This is not related to <code>Promise.all</code>.



Change one of the inputs in the `getImageName` calls inside the `promises` variable to "Hello World". Save the script and refresh the page. Now the console should log `false`.

#### Explanation

`Promise.all` returns a promise that resolves if all of the promises passed into it resolve. If any of the passed-in promises reject, then `Promise.all` rejects with the reason of the first promise that was rejected. This is very useful for ensuring that a group of asynchronous actions complete (such as multiple images loading) before proceeding to another step.



Note: <code>Promise.all</code> would not work if the promises passed in were from <code>flagChain</code> calls because <code>flagChain</code> uses <code>catch</code> to ensure that the returned promise always resolves.





Note: Even if an input promise rejects, causing <code>Promise.all</code> to reject, the remaining input promises still settle. In other words, the remaining promises still execute, they simply are not returned by <code>Promise.all</code>.



#### For more information

*  [Promise.all documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

### 4.2 Promise.race

Another promise method that you may see referenced is  [Promise.race](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race).

Replace TODO 4.2 in <strong>js/main.js</strong> with the following code:

#### main.js

```
var promise1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 500, 'one');
});

var promise2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2])
.then(logSuccess)
.catch(logError);
```

Save the script and refresh the page. The console should show "two" logged by `logSuccess`.

Change `promise2` to reject instead of resolve. Save the script and refresh the page. Observe that "two" is logged again, but this time by `logError`.

#### Explanation

`Promise.race` takes a list of promises and settles as soon as the first promise in the list settles. If the first promise resolves, `Promise.race` resolves with the corresponding value, if the first promise rejects, `Promise.race` rejects with the corresponding reason.

In this example, if `promise2` resolves before `promise1` settles, the `then` block executes and logs the value of the `promise2`. If `promise2` rejects before `promise1` settles, the `catch` block executes and logs the reason for the `promise2` rejection.



Note: Because <code>Promise.race</code> rejects immediately if one of the supplied promises rejects (even if another supplied promise resolves later) <code>Promise.race</code> by itself can't be used to reliably return the first promise that resolves. See the <a href="working-with-promises#race">concepts section</a> for more details.



#### For more information

*  [Promise.race documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

#### Solution code

To get a copy of the working code, navigate to the __solution__ folder.

<div id="congrats"></div>


## Congratulations!




You have learned the basics of JavaScript Promises!

### Resources

*  [Promises introduction](/web/fundamentals/getting-started/primers/promises)
*  [Promise - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


