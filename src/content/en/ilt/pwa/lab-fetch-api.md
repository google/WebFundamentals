project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_blink_components: N/A #}
{# wf_updated_on: 2019-04-26 #}
{# wf_published_on: 2016-01-01 #}


# Lab: Fetch API {: .page-title }
{% include "web/ilt/pwa/_shared/update.html" %}




<div id="overview"></div>


## Overview




This lab walks you through using the  [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API), a simple interface for fetching resources, and an improvement over the  [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) API.

#### What you will learn

* How to use the Fetch API to request resources
* How to make GET, HEAD, and POST requests with fetch
* How to read & set custom headers
* The usage and limitations of CORS

#### What you should know

* Basic JavaScript and HTML
* Familiarity with the concept and basic syntax of ES2015  [Promises](http://www.html5rocks.com/en/tutorials/es6/promises/)

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* A browser that supports  [Fetch](http://caniuse.com/#feat=fetch)
* A text editor
*  [Node](https://nodejs.org/en/) and  [npm](https://www.npmjs.com/)

Note: Although the Fetch API is  [not currently supported in all browsers](http://caniuse.com/#feat=fetch), there is a  [polyfill](https://github.com/github/fetch).

<div id="get-set-up"></div>


## 1. Get set up




If you have not downloaded the repository and installed the  [LTS version of Node.js](https://nodejs.org/en/), follow the instructions in [Setting up the labs](setting-up-the-labs).

Open your computer's command line. Navigate into the `fetch-api-lab/app/` directory and start a local development server:

    cd fetch-api-lab/app
    npm install
    node server.js

You can terminate the server at any time with `Ctrl-c`.

Open your browser and navigate to `localhost:8081/`. You should see a page with buttons for making requests (they won't work yet).

Note: [Unregister](tools-for-pwa-developers#unregister) any service workers and [clear all service worker caches](tools-for-pwa-developers#clearcache) for localhost so that they do not interfere with the lab. In Chrome DevTools, you can achieve this by clicking __Clear site data__ from the __Clear storage__ section of the __Application__ tab.

Open the `fetch-api-lab/app/` folder in your preferred text editor. The `app/` folder is where you will be building the lab.

This folder contains:

* `echo-servers/` contains files that are used for running test servers
* `examples/` contains sample resources that we use in experimenting with fetch
* `js/main.js` is the main JavaScript for the app, and it is where you will write all your code
* `index.html` is the main HTML page for our sample site/application
* `package-lock.json` and `package.json` are configuration  files for our development server and echo server dependencies
* `server.js` is a node development server

<div id="fetching-a-resource"></div>


## 2. Fetching a resource




The Fetch API has a relatively simple interface. This section explains how to write a basic HTTP request using fetch.

### 2.1 Fetch a JSON file

In `js/main.js`, the app's __Fetch JSON__ button is attached to the `fetchJSON` function.

Update the `fetchJSON` function to request the `examples/animals.json` file and log the response:

```
function fetchJSON() {
  fetch('examples/animals.json')
    .then(logResult)
    .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch JSON__. The console should log the fetch response.

#### Explanation

The `fetch` method accepts the path for the resource we want to retrieve as a parameter, in this case `examples/animals.json`. `fetch` returns a promise that resolves to a  [Response object](https://developer.mozilla.org/en-US/docs/Web/API/Response). If the promise resolves, the response is passed to the `logResult` function. If the promise rejects, the `catch` takes over and the error is passed to the `logError` function.

Response objects represent the response to a request. They contain the response body and also useful properties and methods.

### 2.2 Test invalid responses

Examine the logged response in the console. Note the values of the `status`, `url`, and `ok` properties.

Replace the `examples/animals.json` resource in `fetchJSON` with `examples/non-existent.json`. The updated `fetchJSON` function should now look like:

```
function fetchJSON() {
  fetch('examples/non-existent.json')
    .then(logResult)
    .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch JSON__ again to try and fetch this non-existent resource.

Observe that the fetch completed successfully, and didn't trigger the `catch` block. Now find the `status`, `URL`, and `ok` properties of the new response.

The values should be different for the two files (do you understand why?). If you got any console errors, do the values match up with the context of the error?

#### Explanation

Why didn't a failed response activate the `catch` block? This is an important note for fetch and promises—bad responses (like 404s) still resolve! A fetch promise only rejects if the request was unable to complete, so you must always check the validity of the response. We will validate responses in the next section.

#### For more information

*  [Response objects](https://developer.mozilla.org/en-US/docs/Web/API/Response)

### 2.3 Check response validity

We need to update our code to check the validity of responses.

In `main.js`, add a function to validate responses:

```
function validateResponse(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
```

Then replace `fetchJSON` with the following code:

```
function fetchJSON() {
  fetch('examples/non-existent.json')
    .then(validateResponse)
    .then(logResult)
    .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch JSON__. Check the console. Now the response for `examples/non-existent.json` should trigger the `catch` block.

Replace `examples/non-existent.json` in the `fetchJSON` function with the original `examples/animals.json`. The updated function should now look like:

```
function fetchJSON() {
  fetch('examples/animals.json')
    .then(validateResponse)
    .then(logResult)
    .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch JSON__. You should see that the response is being logged successfully as before.

#### Explanation

Now that we have added the `validateResponse` check, bad responses (like 404s) throw an error and the `catch` takes over. This allows us to handle failed responses and prevents unexpected responses from propagating down the fetch chain.

### 2.4 Read the response

Fetch responses are represented as  [ReadableStreams](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) ( [streams spec](https://streams.spec.whatwg.org/)) and must be read in order to access the body of the response. Response objects have  [methods](https://developer.mozilla.org/en-US/docs/Web/API/Response) for doing this.

In `main.js`, add a `readResponseAsJSON` function with the following code:

```
function readResponseAsJSON(response) {
  return response.json();
}
```

Then replace the `fetchJSON` function with the following code:

```
function fetchJSON() {
  fetch('examples/animals.json') // 1
  .then(validateResponse) // 2
  .then(readResponseAsJSON) // 3
  .then(logResult) // 4
  .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch JSON__. Check the console to see that the JSON from `examples/animals.json` is being logged (instead of the Response object).

#### Explanation

Let's review what is happening.

Step 1. Fetch is called on a resource, `examples/animals.json`. Fetch returns a promise that resolves to a Response object. When the promise resolves, the response object is passed to `validateResponse`.

Step 2. `validateResponse` checks if the response is valid (is it a 200?). If it isn't, an error is thrown, skipping the rest of the `then` blocks and triggering the `catch` block. This is particularly important. Without this check bad responses are passed down the chain and could break later code that may rely on receiving a valid response. If the response is valid, it is passed to `readResponseAsJSON`.

Step 3. `readResponseAsJSON` reads the body of the response using the  [Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) method. This method returns a promise that resolves to JSON. Once this promise resolves, the JSON data is passed to `logResult`. (If the promise from `response.json()` rejects, the `catch` block is triggered.)

Step 4. Finally, the JSON data from the original request to `examples/animals.json` is logged by `logResult`.

#### For more information

*  [Response methods](https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods)
*  [Promise chaining](/web/fundamentals/getting-started/primers/promises#chaining)
*  [ReadableStreams](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream) ( [streams spec](https://streams.spec.whatwg.org/))

<div id="fetch-an-image"></div>


## 3. Fetch an image




Fetch is not limited to JSON. In this example we will fetch an image and append it to the page.

In `main.js`, write a `showImage` function with the following code:

```
function showImage(responseAsBlob) {
  const container = document.getElementById('img-container');
  const imgElem = document.createElement('img');
  container.appendChild(imgElem);
  const imgUrl = URL.createObjectURL(responseAsBlob);
  imgElem.src = imgUrl;
}
```

Then add a `readResponseAsBlob` function that reads responses as a  [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob):

```
function readResponseAsBlob(response) {
  return response.blob();
}
```

Update the `fetchImage` function with the following code:

```
function fetchImage() {
  fetch('examples/fetching.jpg')
    .then(validateResponse)
    .then(readResponseAsBlob)
    .then(showImage)
    .catch(logError);
}
```

Save the script and refresh the page. Click __Fetch image.__ You should see an adorable dog  *fetching*  a stick on the page (it's a fetch joke!).

#### Explanation

In this example an image is being fetched, `examples/fetching.jpg`. Just like in the previous exercise, the response is validated with `validateResponse`. The response is then read as a  [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) (instead of JSON as in the previous section). An image element is created and appended to the page, and the image's `src` attribute is set to a data URL representing the Blob.

Note: The  [URL object's](https://developer.mozilla.org/en-US/docs/Web/API/URL)  [`createObjectURL()` method](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) is used to generate a data URL representing the Blob. This is important to note. You cannot set an image's source directly to a Blob. The Blob must be converted into a data URL.

#### For more information

*  [Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
*  [Response.blob()](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob)
*  [URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL)

<div id="optional-fetch-text"></div>


## 4. Optional: Fetch text




This section is an optional challenge.

Update the `fetchText` function to

1. fetch `/examples/words.txt`
2. validate the response with `validateResponse`
3. read the response as text (hint: see  [Response.text()](https://developer.mozilla.org/en-US/docs/Web/API/Body/text))
4. and display the text on the page

You can use this `showText` function as a helper for displaying the final text:

```
function showText(responseAsText) {
  const message = document.getElementById('message');
  message.textContent = responseAsText;
}
```

Save the script and refresh the page. Click __Fetch text__. If you've implemented `fetchText` correctly, you should see added text on the page.

Note: While it may be tempting to fetch HTML and append it using the `innerHTML` attribute, be careful. This can expose your site to  [cross-site scripting attacks](https://en.wikipedia.org/wiki/Cross-site_scripting)!

#### For more information

*  [Response.text()](https://developer.mozilla.org/en-US/docs/Web/API/Body/text)

<div id="using-head-requests"></div>


## 5. Using HEAD requests




By default, fetch uses the  [GET method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), which retrieves a specific resource. But fetch can also use other HTTP methods.

### 5.1 Make a HEAD request

Replace the `headRequest` function with the following code:

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

Save the script and refresh the page. Click __HEAD request__. Observe that the logged text content is empty.

#### Explanation

The `fetch` method can receive a second optional parameter, `init`. This parameter enables the configuration of the fetch request, such as the  [request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), cache mode, credentials,  [and more](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch).

In this example we set the fetch request method to HEAD using the `init` parameter. HEAD requests are just like GET requests, except the body of the response is empty. This kind of request can be used when all you want is metadata about a file but don't need to transport all of the file's data.

### 5.2 Optional: Find the size of a resource

Let's look at the  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) of the fetch response for `examples/words.txt` to determine the size of the file.

Update the `headRequest` function to log the `content-length` property of the response `headers` (hint: see the  [headers](https://developer.mozilla.org/en-US/docs/Web/API/Response/headers) documentation and  [get](https://developer.mozilla.org/en-US/docs/Web/API/Headers/get) method).

After you have updated the code, save the file and refresh the page. Click __HEAD request__. The console should log the size (in bytes) of `examples/words.txt`.

#### Explanation

In this example, the HEAD method is used to request the size (in bytes) of a resource (represented in the `content-length` header) without actually loading the resource itself. In practice this could be used to determine if the full resource should be requested (or even how to request it).

__Optional__: Find out the size of `examples/words.txt` using another method and confirm that it matches the value from the response header (you can look up how to do this for your specific operating system—bonus points for using the command line!).

#### For more information

*  [HTTP methods](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods)
*  [Fetch method signature](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch)
*  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)

<div id="using-post-requests"></div>


## 6. Using POST requests




Fetch can also send data with POST requests.

### 6.1 Set up an echo server

For this example you need to run an echo server. From the `fetch-api-lab/app/` directory run the following command (if you command line is blocked by the `localhost:8081` server, open a new command line window or tab):

    node echo-servers/cors-server.js

This command starts up a simple server at `localhost:5000/` that echoes back the requests sent to it.

You can terminate this server at any time with `ctrl+c`.

### 6.2 Make a POST request

Replace the `postRequest` function with the following code (make sure you have defined the `showText` function from section 4 if you didn't complete the section):

```
function postRequest() {
  fetch('http://localhost:5000/', {
    method: 'POST',
    body: 'name=david&message=hello'
  })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
```

Save the script and refresh the page. Click __POST request__. Observe the sent request echoed on the page. It should contain the name and message (note that we are not yet getting data from the form).

#### Explanation

To make a POST request with fetch, we use the `init` parameter to specify the method (similar to how we set the HEAD method in the previous section). This is also where we set the __body__ of the request, in this case a simple string. The body is the data we want to send.

Note: In production, remember to always encrypt any sensitive user data.

When data is sent as a POST request to `localhost:5000/`, the request is echoed back as the response. The response is then validated with `validateResponse`, read as text, and displayed on the page.

In practice, this server would represent a 3rd party API.

### 6.3 Optional: Use the FormData interface

You can use the  [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData) interface to easily grab data from forms.

In the `postRequest` function, instantiate a new `FormData` object from the `msg-form` form element:

```
const formData = new FormData(document.getElementById('msg-form'));
```

Then replace the value of the `body` parameter with the `formData` variable.

Save the script and refresh the page. Fill out the form (the __Name__ and __Message__ fields) on the page, and then click __POST__ request. Observe the form content displayed on the page.

#### Explanation

The  [`FormData`](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) constructor can take in an HTML  [`form`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form), and create a `FormData` object. This object is populated with the form's keys and values.

#### For more information

*  [POST requests](https://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
*  [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

<div id="optional-cors-and-custom-headers"></div>


## 7. Optional: CORS and custom headers




### 7.1 Start a non-cors echo server

Stop the previous echo server (by pressing `ctrl+c` from the command line) and start a new echo server from the `fetch-lab-api/app/` directory by running the following command:

    node echo-servers/no-cors-server.js

This command sets up another simple echo server, this time at `localhost:5001/`. This server, however, is not configured to accept  [cross origin requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS).

### 7.2 Fetch from the new server

Now that the new server is running at `localhost:5001/`, we can send a fetch request to it.

Update the `postRequest` function to fetch from `localhost:5001/` instead of `localhost:5000/`. After you have updated the code, save the file, refresh the page, and then click __POST Request__.

You should get an error in the console indicating that the cross-origin request is blocked because the CORS `Access-Control-Allow-Origin` header is missing.

Update the `fetch` in the `postRequest` function with the following code, which uses  [no-cors](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) mode (as the error log suggests), and removes the calls to `validateResponse` and `readResponseAsText` (see explanation below):

```
function postRequest() {
  const formData = new FormData(document.getElementById('msg-form'));
  fetch('http://localhost:5001/', {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
    .then(logResult)
    .catch(logError);
}
```

Save the script and refresh the page. Then fill out the message form and click __POST Request__.

Observe the response object logged in the console.

#### Explanation

Fetch (and XMLHttpRequest) follow the  [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). This means that browsers restrict cross-origin HTTP requests from within scripts. A cross-origin request occurs when one domain (for example `http://foo.com/`) requests a resource from a separate domain (for example `http://bar.com/`).

Note: Cross-origin request restrictions are often a point of confusion. Many resources like images, stylesheets, and scripts are fetched across domains (i.e., cross-origin). However, these are exceptions to the same-origin policy. Cross-origin requests are still restricted from  *within scripts* .

Since our app's server has a different port number than the two echo servers, requests to either of the echo servers are considered cross-origin. The first echo server, however, running on `localhost:5000/`, is configured to support  [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) (you can open `echo-servers/cors-server.js` and examine the configuration). The new echo server, running on `localhost:5001/`, is not (which is why we get an error).

Using `mode: no-cors` allows fetching an  [opaque response](https://stackoverflow.com/questions/39109789/what-limitations-apply-to-opaque-responses). This allows use to get a response, but prevents accessing the response with JavaScript (which is why we can't use `validateResponse`, `readResponseAsText`, or `showResponse`). The response can still be  [consumed by other API's](https://jakearchibald.com/2015/thats-so-fetch/#no-cors-and-opaque-responses) or cached by a service worker.

### 7.3 Modify request headers

Fetch also supports modifying request headers. Stop the `localhost:5001` (no CORS) echo server and restart the `localhost:5000` (CORS) echo server from section 6:

    node echo-servers/cors-server.js

Restore the previous version of the `postRequest` function that fetches from `localhost:5000/`:

```
function postRequest() {
  const formData = new FormData(document.getElementById('msg-form'));
  fetch('http://localhost:5000/', {
    method: 'POST',
    body: formData
  })
    .then(validateResponse)
    .then(readResponseAsText)
    .then(showText)
    .catch(logError);
}
```

Now use the  [Header interface](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers) to create a Headers object inside the `postRequest` function called `messageHeaders` with the `Content-Type` header equal to `application/json`.

Then set the `headers` property of the `init` object to be the `messageHeaders` variable.

Update the `body` property to be a stringified JSON object, such as:

```
JSON.stringify({ lab: 'fetch', status: 'fun' })
```

After you have updated the code, save the file and refresh the page. Then click __POST Request__.

Observe that the echoed request now has a `Content-Type` of `application/json` (as opposed to `multipart/form-data` as it had previously).

Now add a custom `Content-Length` header to the `messageHeaders` object and give the request an arbitrary size.

After you have updated the code, save the file, refresh the page, and click __POST Request__. Observe that this header is not modified in the echoed request.

#### Explanation

The  [Header interface](https://developer.mozilla.org/en-US/docs/Web/API/Headers/Headers) enables the creation and modification of  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) objects. Some headers, like `Content-Type` can be modified by fetch. Others, like `Content-Length`, are  [guarded](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Guard) and can't be modified (for security reasons).

### 7.4 Set custom request headers

Fetch supports setting custom headers.

Remove the `Content-Length` header from the `messageHeaders` object in the `postRequest` function. Add the custom header `X-Custom` with an arbitrary value (for example '`X-CUSTOM': 'hello world'`).

Save the script, refresh the page, and then click __POST Request__.

You should see that the echoed request has the `X-Custom` property that you added.

Now add a `Y-Custom` header to the Headers object. Save the script, refresh the page, and click __POST Request__.

You should get an error similar to this in the console:

    Fetch API cannot load http://localhost:5000/. Request header field y-custom is not allowed by Access-Control-Allow-Headers in preflight response.

#### Explanation

Like cross-origin requests, custom headers must be supported by the server from which the resource is requested. In this example, our echo server is configured to accept the `X-Custom` header but not the `Y-Custom` header (you can open `echo-servers/cors-server.js` and look for `Access-Control-Allow-Headers` to see for yourself). Anytime a custom header is set, the browser performs a  [preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests) check. This means that the browser first sends an OPTIONS request to the server, to determine what HTTP methods and headers are allowed by the server. If the server is configured to accept the method and headers of the original request, then it is sent, otherwise an error is thrown.

#### For more information

*  [Cross Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)
*  [That's so fetch!](https://jakearchibald.com/2015/thats-so-fetch/)

#### Solution code

To get a copy of the working code, navigate to the __solution__ folder.

<div id="congratulations"></div>


## Congratulations!




You now know how to use the Fetch API!

### Resources

*  [Fetch API Concepts](working-with-the-fetch-api)
*  [Learn more about the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
*  [Get an Introduction to Fetch](/web/updates/2015/03/introduction-to-fetch)
*  [David Walsh's blog on fetch](https://davidwalsh.name/fetch)
*  [Jake Archibald's blog on fetch](https://jakearchibald.com/2015/thats-so-fetch/)


