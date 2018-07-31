project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Fetch API {: .page-title }




Concepts:  [Working with the Fetch API](working-with-the-fetch-api)

<div id="overview"></div>


## Overview




This lab walks you through using the  [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), a simple interface for fetching resources, as an improvement over the  [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) API.

#### What you will learn

* How to use the Fetch API to request resources
* How to make GET, HEAD, and POST requests with fetch

#### What you should know

* Basic JavaScript and HTML
* Familiarity with the concept and basic syntax of ES2015  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)
* The concept of an  [Immediately Invoked Function Expression](https://en.wikipedia.org/wiki/Immediately-invoked_function_expression) (IIFE)
* How to enable the developer console
* Some familiarity with  [JSON](http://www.json.org/)

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* A browser that supports  [Fetch](http://caniuse.com/#feat=fetch)
* A text editor
*  [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/)



Note: Although the Fetch API is <a href="http://caniuse.com/#feat=fetch">not currently supported in all browsers</a>, there is a <a href="https://github.com/github/fetch">polyfill</a> (but see the readme for important caveats).



<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs).

Open your browser and navigate to __localhost:8080/fetch-api-lab/app__.



Note: <a href="tools-for-pwa-developers#unregister">Unregister</a> any service workers and <a href="tools-for-pwa-developers#clearcache">clear all service worker caches</a> for localhost so that they do not interfere with the lab.



If you have a text editor that lets you open a project, open the __fetch-api-lab/app__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __app__ folder is where you will be building the lab.

This folder contains:

* __echo-servers__ contains files that are used for running echo servers
* __examples__ contains sample resources that we use in experimenting with fetch
* __index.html__ is the main HTML page for our sample site/application
* __js/main.js__ is the main JavaScript for the app, and where you will write all your code
* __test/test.html__ is a file for testing your progress
* __package.json__ is a configuration file for node dependencies

<div id="2"></div>


## 2. Fetching a resource




### 2.1 Fetch a JSON file

Open __js/main.js__ in your text editor.

Replace the TODO 2.1a comment with the following code:

#### main.js

```
if (!('fetch' in window)) {
  console.log('Fetch API not found, try including the polyfill');
  return;
}
```

In the `fetchJSON` function, replace TODO 2.1b with the following code:

#### main.js

```
fetch('examples/animals.json')
.then(logResult)
.catch(logError);
```

Save the script and refresh the page. Click __Fetch JSON__. The console should log the fetch response.



Note: We are using the <a href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#modulepatternjavascript">JavaScript module pattern</a> in this file. This is just to help keep the code clean and allow for easy testing. It is not related to the Fetch API.



__Optional__: Open the site on an  [unsupported browser](http://caniuse.com/#search=fetch) and verify that the support check conditional works.

#### Explanation

The code starts by checking for fetch support. If the browser doesn't support fetch, the script logs a message and fails immediately.

We pass the path for the resource we want to retrieve as a parameter to fetch, in this case __examples/animals.json__. A promise that resolves to a  [Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response) is returned. If the promise resolves, the response is passed to the `logResult` function. If the promise rejects, the `catch` takes over and the error is passed to the `logError` function.

Response objects represent the response to a request. They contain the response body and also useful properties and methods.

### 2.2 Examine response properties

Find the values of the `status`, `url`, and `ok` properties of the response for the fetch we just made. What are these values? Hint: Look in the console.

In the `fetchJSON` function we just wrote in section 2.1, replace the __examples/animals.json__ resource with __examples/non-existent.json__. So the `fetchJSON` function should now look like:

#### main.js

```
function fetchJSON() {
  fetch('examples/non-existent.json')
  .then(logResult)
  .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch JSON__ again to try and fetch this new resource.

Now find the `status`, `URL`, and `ok` properties of the response for this new fetch we just made. What are these values?

The values should be different for the two files (do you understand why?). If you got any console errors, do the values match up with the context of the error?

#### Explanation

Why didn't a failed response activate the `catch` block? This is an important note for fetch and promises—bad responses (like 404s) still resolve! A fetch promise only rejects if the request was unable to complete, so you must always check the validity of the response.

#### For more information

*  [Response objects](https://developer.mozilla.org/en-US/docs/Web/API/Response)

### 2.3 Check response validity

We need to update our code to check the validity of responses.

Complete the function called `validateResponse` in TODO 2.3. The function should accept a response object as input. If the response object's <code>ok</code> property is false, the function should throw an error containing <code>response.statusText</code>. If the response object's <code>ok</code> property is true, the function should simply return the response object.

You can confirm that you have written the function correctly by navigating to __app/test/test.html__. This page runs tests on some of the functions you write. If there are errors with your implementation of a function (or you haven't implemented them yet), the test displays in red. Passed tests display in blue. Refresh the __test.html__ page to retest your functions.



Note: Be sure to open the test page using the localhost address so that it opens from the server and not directly from the file system.



Once you have successfully written the function, replace `fetchJSON` with the following code:

#### main.js

```
function fetchJSON() {
  fetch('examples/non-existent.json')
  .then(validateResponse)
  .then(logResult)
  .catch(logError);
}
```

This is  [promise chaining](/web/fundamentals/getting-started/primers/promises#chaining).

Save the script and refresh the page. Click __Fetch JSON__. Now the response for __examples/non-existent.json__ should trigger the `catch` block, unlike in section 2.2. Check the console to confirm this.

Now replace __examples/non-existent.json__ resource in the `fetchJSON` function with the original __examples/animals.json__ from section 2.1. The function should now look like:

#### main.js

```
function fetchJSON() {
  fetch('examples/animals.json')
  .then(validateResponse)
  .then(logResult)
  .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch JSON__. You should see that the response is being logged successfully like in section 2.1.

#### Explanation

Now that we have added the `validateResponse` check, bad responses (like 404s) throw an error and the `catch` takes over. This prevents bad responses from propagating down the fetch chain.

### 2.4 Read the response

Responses must be read in order to access the body of the response. Response objects have  [methods](https://developer.mozilla.org/en-US/docs/Web/API/Response) for doing this.

To complete TODO 2.4, replace the `readResponseAsJSON` function with the following code:

#### main.js

```
function readResponseAsJSON(response) {
  return response.json();
}
```

(You can check that you have done this correctly by navigating to __app/test/test.html__.)

Then replace the `fetchJSON` function with the following code:

#### main.js

```
function fetchJSON() {
  fetch('examples/animals.json') // 1
  .then(validateResponse) // 2
  .then(readResponseAsJSON) // 3
  .then(logResult) // 4
  .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch JSON__. Check the console to see that the JSON from __examples/animals.json__ is being logged.

#### Explanation

Let's review what is happening.

Step 1. Fetch is called on a resource, __examples/animals.json__. Fetch returns a promise that resolves to a Response object. When the promise resolves, the response object is passed to `validateResponse`.

Step 2. `validateResponse` checks if the response is valid (is it a 200?). If it isn't, an error is thrown, skipping the rest of the `then` blocks and triggering the `catch` block. This is particularly important. Without this check bad responses are passed down the chain and could break later code that may rely on receiving a valid response. If the response is valid, it is passed to `readResponseAsJSON`.

Step 3. `readResponseAsJSON` reads the body of the response using the  [Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) method. This method returns a promise that resolves to JSON. Once this promise resolves, the JSON data is passed to `logResult`. (Can you think of what would happen if the promise from `response.json()` rejects?)

Step 4. Finally, the JSON data from the original request to __examples/animals.json__ is logged by `logResult`.

#### For more information

*  [Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json)
*  [Response methods](https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods)
*  [Promise chaining](/web/fundamentals/getting-started/primers/promises#chaining)

#### Solution code

To get a copy of the working code, navigate to the __02-fetching-a-resource__ folder.

<div id="3"></div>


## 3. Fetch an image




Fetch is not limited to JSON. In this example we will fetch an image and append it to the page.

To complete TODO 3a, replace the `showImage` function with the following code:

#### main.js

```
function showImage(responseAsBlob) {
  var container = document.getElementById('container');
  var imgElem = document.createElement('img');
  container.appendChild(imgElem);
  var imgUrl = URL.createObjectURL(responseAsBlob);
  imgElem.src = imgUrl;
}
```

To complete TODO 3b, finish writing the `readResponseAsBlob` function. The function should accept a response object as input. The function should return a promise that resolves to a <a href="https://developer.mozilla.org/en-US/docs/Web/API/Blob">Blob</a>.



Note: This function will be very similar to `readResponseAsJSON`. Check out the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Body/blob">`blob()`</a> method documentation).



(You can check that you have done this correctly by navigating to __app/test/test.html__.)

To complete TODO 3c, replace the `fetchImage` function with the following code:

#### main.js

```
function fetchImage() {
  fetch('examples/kitten.jpg')
  .then(validateResponse)
  .then(readResponseAsBlob)
  .then(showImage)
  .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch image.__ You should see an adorable kitten on the page.

#### Explanation

In this example an image is being fetched, __examples/kitten.jpg__. Just like in the previous exercise, the response is validated with `validateResponse`. The response is then read as a  [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) (instead of JSON as in section 2). An image element is created and appended to the page, and the image's `src` attribute is set to a data URL representing the Blob.



Note: The <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL">URL object's</a> <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL">createObjectURL() method</a> is used to generate a data URL representing the Blob. This is important to note. You cannot set an image's source directly to a Blob. The Blob must be converted into a data URL.



#### For more information

*  [Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
*  [Response.blob()](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob)
*  [URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL)

#### Solution code

To get a copy of the working code, navigate to the __03-fetching-images__ folder.

<div id="4"></div>


## 4. Fetch text




In this example we will fetch text and add it to the page.

To complete TODO 4a, replace the `showText` function with the following code:

#### main.js

```
function showText(responseAsText) {
  var message = document.getElementById('message');
  message.textContent = responseAsText;
}
```

To complete TODO 4b, finish writing the `readResponseAsText` function.. This function should accept a response object as input. The function should return a promise that resolves to text.



Note: This function will be very similar to `readResponseAsJSON` and `readResponseAsBlob`. Check out the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Body/text">`text()`</a> method documentation).



(You can check that you have done this correctly by navigating to __app/test/test.html__.)

To complete TODO 4c, replace the `fetchText` function with the following code:

```
function fetchText() {
  fetch('examples/words.txt')
  .then(validateResponse)
  .then(readResponseAsText)
  .then(showText)
  .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch text__. You should see a message on the page.

#### Explanation

In this example a text file is being fetched, __examples/words.txt__. Like the previous two exercises, the response is validated with `validateResponse`. Then the response is read as text, and appended to the page.



Note: While it may be tempting to fetch HTML and append it using the `innerHTML` attribute, be careful. This can expose your site to <a href="https://en.wikipedia.org/wiki/Cross-site_scripting">cross-site scripting attacks</a>!



#### For more information

*  [Response.text()](https://developer.mozilla.org/en-US/docs/Web/API/Body/text)

#### Solution code

To get a copy of the working code, navigate to the __04-fetching-text__ folder.



Note: Note that the methods used in the previous examples are actually methods of <a href="https://developer.mozilla.org/en-US/docs/Web/API/Body">Body</a>, a Fetch API <a href="https://developer.mozilla.org/en-US/docs/Glossary/mixin">mixin</a> that is implemented in the Response object.



<div id="5"></div>


## 5. Using HEAD requests




By default, fetch uses the  [GET method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), which retrieves a specific resource. But fetch can also use other HTTP methods.

### 5.1 Make a HEAD request

To complete TODO 5.1, replace the `headRequest` function with the following code:

#### main.js

```
function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
  .then(validateResponse)
  .then(readResponseAsText)
  .then(logResult)
  .catch(logError);
}
```

Save the script and refresh the page. Click __HEAD request__. What do you notice about the console log? Is it showing you the text in __examples/words.txt__, or is it empty?

#### Explanation

`fetch()` can receive a second optional parameter, `init`. This enables the creation of custom settings for the fetch request, such as the  [request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), cache mode, credentials,  [and more](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch).

In this example we set the fetch request method to HEAD using the `init` parameter. HEAD requests are just like GET requests, except the body of the response is empty. This kind of request can be used when all you want is metadata about a file but don't need to transport all of the file's data.

### 5.2 Optional: Find the size of a resource

Let's look at the  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) of the fetch response from section 5.1 to determine the size of __examples/words.txt__.

Complete the function called `logSize` in TODO 5.2. The function accepts a response object as input. The function should log the `content-length` of the response. To do this, you need to access the  [headers](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers) property of the response, and use the headers object's  [get](https://developer.mozilla.org/en-US/docs/Web/API/Headers/get) method. After logging the the `content-length` header, the function should then return the response.

Then replace the `headRequest` function with the following code:

```
function headRequest() {
  fetch('examples/words.txt', {
    method: 'HEAD'
  })
  .then(validateResponse)
  .then(logSize)
  .then(readResponseAsText)
  .then(logResult)
  .catch(logError);
}
```

Save the script and refresh the page. Click __HEAD request__. The console should log the size (in bytes) of __examples/words.txt__ (it should be 74 bytes).

#### Explanation

In this example, the HEAD method is used to request the size (in bytes) of a resource (represented in the `content-length` header) without actually loading the resource itself. In practice this could be used to determine if the full resource should be requested (or even how to request it).

__Optional__: Find out the size of __examples/words.txt__ using another method and confirm that it matches the value from the response header (you can look up how to do this for your specific operating system—bonus points for using the command line!).

#### For more information

*  [HTTP methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
*  [Fetch method signature](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch)
*  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)

#### Solution code

To get a copy of the working code, navigate to the __05-head-requests__ folder.

<div id="6"></div>


## 6. Using POST requests




Fetch can also send data with POST requests.

### 6.1 Set up an echo server

For this example you need to run an echo server. From the __fetch-api-lab/app__ directory run the following commands:

    npm install
    node echo-servers/echo-server-cors.js

You can check that you have successfully started the server by navigating to __app/test/test.html__ and checking the 'echo server #1 running (with CORS)' task. If it is red, then the server is not running.

#### Explanation

In this step we install and run a simple server at __localhost:5000/__ that echoes back the requests sent to it.



Note: If you need to, you can stop the server by pressing __Ctrl+C__ from the command line.



### 6.2 Make a POST request

To complete TODO 6.2, replace the `postRequest` function with the following code:

#### main.js

```
function postRequest() {
  // TODO 6.3
  fetch('http://localhost:5000/', {
    method: 'POST',
    body: 'name=david&message=hello'
  })
  .then(validateResponse)
  .then(readResponseAsText)
  .then(logResult)
  .catch(logError);
}
```

Save the script and refresh the page. Click __POST request__. Do you see the sent request echoed in the console? Does it contain the name and message?

#### Explanation

To make a POST request with fetch, we use the `init` parameter to specify the method (similar to how we set the HEAD method in section 5). This is also where we set the __body__ of the request. The body is the data we want to send.



Note: In production, remember to always encrypt any sensitive user data.



When data is sent as a POST request to __localhost:5000/__, the request is echoed back as the response. The response is then validated with `validateResponse`, read as text, and logged to the console.

In practice, this server would be a 3rd party API.

### 6.3 Use the FormData interface

You can use the  [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) interface to easily grab data from forms.

In the `postRequest` function, replace TODO 6.3 with the following code:

#### main.js

```
var formData = new FormData(document.getElementById('myForm'));
```

Then replace the value of the `body` parameter with the `formData` variable.

Save the script and refresh the page. Fill out the form (the __Name__ and __Message__ fields) on the page, and then click __POST__ request. Do you see the form content logged in the console?

#### Explanation

The  [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) constructor can take in an HTML  [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form), and create a `FormData` object. This object is populated with the form's keys and values.

#### For more information

*  [POST requests](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
*  [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

#### Solution code

To get a copy of the working code, navigate to the __06-post-requests__ folder.

<div id="7"></div>


## 7. Optional: CORS and custom headers




### 7.1 Start a new echo server

Stop the previous echo server (by pressing __Ctrl+C__ from the command line) and start a new echo server from the __fetch-lab-api/app__ directory by running the following command:

    node echo-servers/echo-server-no-cors.js

You can check that you have successfully started the server by navigating to __app/test/test.html__ and checking the 'echo server #2 running (without CORS)' task. If it is red, then the server is not running.

#### Explanation

The application we run in this step sets up another simple echo server, this time at __localhost:5001/__. This server, however, is not configured to accept  [cross origin requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).



Note: You can stop the server by pressing __Ctrl+C__ from the command line.



### 7.2 Fetch from the new server

Now that the new server is running at __localhost:5001/__, we can send a fetch request to it.

Update the `postRequest` function to fetch from __localhost:5001/__ instead of __localhost:5000/__. Save the script, refresh the page, and then click __POST Request__.

You should get an error indicating that the cross-origin request is blocked due to the CORS `Access-Control-Allow-Origin` header being missing.

Update fetch in the `postRequest` function to use  [no-cors](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) mode (as the error log suggests). Comment out the `validateResponse` and `readResponseAsText` steps in the fetch chain. Save the script and refresh the page. Then click __POST Request__.

You should get a response object logged in the console.

#### Explanation

Fetch (and XMLHttpRequest) follow the  [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). This means that browsers restrict cross-origin HTTP requests from within scripts. A cross-origin request occurs when one domain (for example __http://foo.com/__) requests a resource from a separate domain (for example __http://bar.com/__).



Note: Cross-origin request restrictions are often a point of confusion. Many resources like images, stylesheets, and scripts are fetched across domains (i.e., cross-origin). However, these are exceptions to the same-origin policy. Cross-origin requests are still restricted from  *within scripts* .



Since our app's server has a different port number than the two echo servers, requests to either of the echo servers are considered cross-origin. The first echo server, however, running on __localhost:5000/__, is configured to support  [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS). The new echo server, running on __localhost:5001/__, is not (which is why we get an error).

Using `mode: no-cors` allows fetching an opaque response. This prevents accessing the response with JavaScript (which is why we comment out `validateResponse` and `readResponseAsText`), but the response can still be  [consumed by other API's](https://jakearchibald.com/2015/thats-so-fetch/#no-cors-and-opaque-responses) or cached by a service worker.

### 7.3 Modify request headers

Fetch also supports modifying request headers. Stop the __localhost:5001__ (no CORS) echo server and restart the __localhost:5000__ (CORS) echo server from section 6  (`node echo-servers/echo-server-cors.js`).

Update the `postRequest` function to fetch from __localhost:5000/__ again. Remove the `no-cors` mode setting from the `init` object or update the mode to `cors` (these are equivalent, as `cors` is the default mode). Uncomment the `validateResponse` and `readResponseAsText` steps in the fetch chain.

Now use the  [Header interface](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers) to create a Headers object inside the `postRequest` function called `customHeaders` with the `Content-Type` header equal to `text/plain`. Then add a headers property to the `init` object and set the value to be the `customHeaders` variable. Save the script and refresh the page. Then click __POST Request__.

You should see that the echoed request now has a `Content-Type` of `plain/text` (as opposed to `multipart/form-data` as it had previously).

Now add a custom `Content-Length` header to the `customHeaders` object and give the request an arbitrary size. Save the script, refresh the page, and click __POST Request__. Observe that this header is not modified in the echoed request.

#### Explanation

The  [Header interface](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers) enables the creation and modification of  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) objects. Some headers, like `Content-Type` can be modified by fetch. Others, like `Content-Length`, are  [guarded](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Guard) and can't be modified (for security reasons).

### 7.4 Set custom request headers

Fetch supports setting custom headers.

Remove the `Content-Length` header from the `customHeaders` object in the `postRequest` function. Add the custom header `X-Custom` with an arbitrary value (for example '`X-CUSTOM': 'hello world'`). Save the script, refresh the page, and then click __POST Request__.

You should see that the echoed request has the `X-Custom` that you added.

Now add a `Y-Custom` header to the Headers object. Save the script, refresh the page, and click __POST Request__.

You should get an error similar to this in the console:

```
Fetch API cannot load http://localhost:5000/. Request header field y-custom is not allowed by Access-Control-Allow-Headers in preflight response.
```

#### Explanation

Like cross-origin requests, custom headers must be supported by the server from which the resource is requested. In this example, our echo server is configured to accept the `X-Custom` header but not the `Y-Custom` header (you can open __echo-servers/echo-server-cors.js__ and look for `Access-Control-Allow-Headers` to see for yourself). Anytime a custom header is set, the browser performs a  [preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests) check. This means that the browser first sends an OPTIONS request to the server, to determine what HTTP methods and headers are allowed by the server. If the server is configured to accept the method and headers of the original request, then it is sent, otherwise an error is thrown.

#### For more information

*  [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
*  [That's so fetch!](https://jakearchibald.com/2015/thats-so-fetch/)

#### Solution code

To get a copy of the working code, navigate to the __solution__ folder.

<div id="8"></div>


## Congratulations!




You now know how to use the Fetch API to request resources and post data to servers.

<div id="9"></div>

### Resources

*  [Fetch API Concepts](working-with-the-fetch-api)
*  [Learn more about the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
*  [Learn more about Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
*  [Learn more about GlobalFetch.fetch()](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch)
*  [Get an Introduction to Fetch](/web/updates/2015/03/introduction-to-fetch)
*  [David Walsh's blog on fetch](https://davidwalsh.name/fetch)
*  [Jake Archibald's blog on fetch](https://jakearchibald.com/2015/thats-so-fetch/)


