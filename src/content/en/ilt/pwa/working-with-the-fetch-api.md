project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_blink_components: N/A #}
{# wf_updated_on: 2021-11-16 #}
{# wf_published_on: 2016-01-01 #}


# Working with the Fetch API {: .page-title }
{% include "web/ilt/pwa/_shared/update.html" %}




Codelab:  [Fetch API](lab-fetch-api)

<div id="whatisfetch"></div>


## What is fetch?




The  [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) is a simple interface for fetching resources. Fetch makes it easier to make web requests and handle responses than with the older  [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest), which often requires additional logic (for example, for handling redirects).



Note: Fetch supports the <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS">Cross Origin Resource Sharing (CORS)</a>. Testing generally requires running a local server. Note that although fetch does not require HTTPS, service workers do and so using fetch in a service worker requires HTTPS. Local servers are exempt from this.



You can check for browser support of fetch in the window interface. For example:

#### main.js

```
if (!('fetch' in window)) {
  console.log('Fetch API not found, please upgrade your browser.');
  return;
}
// We can safely use fetch from now on
```

Fetch is supported across [all modern browsers](https://caniuse.com/fetch), but there is a  [polyfill](https://github.com/github/fetch) if you need to support older browsers.

The  [fetch() method](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) takes the path to a resource as input. The method returns a [promise](https://web.dev/promises/) that resolves to the  [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) of that request.

<div id="makerequest"></div>


## Making a request




Let's look at a simple example of fetching a JSON file:

#### main.js (with promise chaining)

```
fetch('examples/example.json')
.then(function(response) {
  // Do stuff with the response
})
.catch(function(error) {
  console.log('Looks like there was a problem: ', error);
});
```

We pass the path for the resource we want to retrieve as a parameter to fetch. In this example, this is __examples/example.json__. The fetch call returns a promise that resolves to a response object.

When the promise resolves, the response is passed to `.then`. This is where the response could be used. If the request does not complete, `.catch` takes over and is passed the corresponding error.

Note, the previous example uses [promise chaining](https://developers.google.com/web/ilt/pwa/working-with-promises#chaining), however [async/await](https://web.dev/async-functions/) can simplify your code. The remaining examples use async/await or [top-level await](https://v8.dev/features/top-level-await).

Here is the same example as before, but converted to use top-level await.

#### main.js (with top-level await)

```
try {
  const response = await fetch('examples/example.json');
} catch (error) {
  console.log('Looks like there was a problem: ', error);
}
```

Response objects represent the response to a request. They contain the requested resource and useful properties and methods. For example, `response.ok`, `response.status`, and `response.statusText` can all be used to evaluate the status of the response.

Evaluating the success of responses is particularly important when using fetch because bad responses (like 404s) still resolve. The only time a fetch promise will reject is if the request was unable to complete. The previous code segment would only error if there was no network connection, but not if the response was bad (like a 404). If the previous code were updated to validate responses it would look like:

#### main.js

```
try {
  const response = await fetch('examples/example.json');
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }
} catch (error) {
  console.log('Looks like there was a problem: ', error);
}
```

Now if the response object's `ok` property is false (indicating a [non 200-299 response](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)), the function throws an error containing `response.status` and `response.statusText` that is caught in the catch-block. This ensures that bad responses are caught early.

<div id="readresponse"></div>


## Reading the response object




Responses must be read in order to access the body of the response. Response objects have  [methods](https://developer.mozilla.org/en-US/docs/Web/API/Response) for doing this. For example,  [Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json) reads the response and returns a promise that resolves to JSON. Adding this step to the current example updates the code to:

#### main.js

```
try {
  const response = await fetch('examples/example.json');
  if (!response.ok) {
    throw Error(`${response.status} ${response.statusText}`);
  }
  // Read the response as json.
  const json = await response.json();
} catch (error) {
  console.log('Looks like there was a problem: ', error);
}
```

You can wrap the previous code into a function and use it as follows:

#### main.js

```
async function fetchResource(pathToResource) {
  try {
    const response = await fetch(pathToResource);
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.log('Looks like there was a problem: ', error);
  }
}

const response = await fetchResource('examples/example.json');
if (response) {
  // Read the response as json.
  console.log(await response.json())
}
```

Note: You can also handle any network status code using the `status` property of the `response` object. This lets you respond with custom pages for different errors or handle other responses that are not `ok` (i.e., not 200-299), but still usable (e.g., status codes in the 300 range). See  [Caching files with the service worker](caching-files-with-service-worker#generic-fallback) for an example of a custom response to a 404.

#### For more information

*  [Response interface](https://developer.mozilla.org/en-US/docs/Web/API/Response)
*  [Response.json()](https://developer.mozilla.org/en-US/docs/Web/API/Body/json)
*  [Promise chaining](working-with-promises#chaining)

### Example: fetching images

Let's look at an example of fetching an image and appending it to a web page.

#### main.js

```
function showImage(responseAsBlob) {
  const imgUrl = URL.createObjectURL(responseAsBlob);
  const imageEl = document.createElement('img');
  imageEl.src = imgUrl;
  document.body.appendChild(imageEl);
}

// Uses the same fetchResource function as shown in previous examples
const response = await fetchResource('examples/kitten.jpg');
if (response) {
  showImage(await response.blob());
}
```

In this example an image (__examples/kitten.jpg__) is fetched. Similar to the previous example, the response is validated with the `fetchResource` function. The response is then read as a  [Blob](https://developer.mozilla.org/en-US/docs/Web/API/Blob) (instead of as JSON), and an image element is created and appended to the page, and the image's `src` attribute is set to a data URL representing the Blob.



Note: The <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL">URL object's</a> <a href="https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL">createObjectURL() method</a> is used to generate a data URL representing the Blob. This is important to note as you cannot set an image's source directly to a Blob. The Blob must first be converted into a data URL.



#### For more information

*  [Blobs](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
*  [Response.blob()](https://developer.mozilla.org/en-US/docs/Web/API/Body/blob)
*  [URL object](https://developer.mozilla.org/en-US/docs/Web/API/URL)

### Example: fetching text

Let's look at another example, this time fetching some text and inserting it into the current page.

#### main.js

```
function showText(responseAsText) {
  document.body.textContent = responseAsText;
}

const response = await fetchResource('examples/words.txt');
if (response) {
  showText(await response.text());
}
```

In this example a text file is being fetched, __examples/words.txt__. Like the previous two examples, the response is validated with the `fetchResource` function. Then the response is read as text, and appended to the page.



Note: It may be tempting to fetch HTML and append that using the <code>innerHTML</code> attribute, but be careful -- this can expose your site to <a href="https://developer.mozilla.org/en-US/docs/Web/Security/Types_of_attacks#cross-site_scripting_xss">cross site scripting attacks</a>!



#### For more information

*  [Response.text()](https://developer.mozilla.org/en-US/docs/Web/API/Body/text)



Note: For completeness, the methods we have used are actually methods of <a href="https://fetch.spec.whatwg.org/#dom-body-body">Body</a>, a Fetch API <a href="https://developer.mozilla.org/en-US/docs/Glossary/mixin">mixin</a> that is implemented in the Response object.



<div id="makecustomrequest"></div>


## Making custom requests




`fetch()` can also receive a second optional parameter, `init`, that allows you to create custom settings for the request, such as the  [request method](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods), cache mode, credentials,  [and more](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch).

<div id="head"></div>

### Example: HEAD requests

By default fetch uses the GET method, which retrieves a specific resource, but other request HTTP methods can also be used.

HEAD requests are just like GET requests except the body of the response is empty. You can use this kind of request when all you want is the file's metadata, and you want or need the file's data to be transported.

To call an API with a HEAD request, set the method in the `init` parameter. For example:

#### main.js

```
fetch('examples/words.txt', {
  method: 'HEAD'
})
```

This will make a HEAD request for __examples/words.txt__. We can update the `fetchResource` function signature to receive an options object for the fetch API.

#### main.js

```
async function fetchResource(pathToResource, init) {
  try {
    // Pass `init` to fetch()
    const response = await fetch(pathToResource, init);
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}`);
    }
    return response;
  } catch (error) {
    console.log('Looks like there was a problem: ', error);
  }
}
```

Now, you could use a HEAD request to check the size of a resource. For example:

#### main.js

```
const response = await fetchResource('examples/words.txt', {
  method: 'HEAD'
});

if (response) {
  const size = response.headers.get('content-length');
}
```

Here the HEAD method is used to request the size (in bytes) of a resource (represented in the __content-length__ header) without actually loading the resource itself. In practice this could be used to determine if the full resource should be requested (or even how to request it).

### Example: POST requests

Fetch can also send data to an API with POST requests. The following code sends a "title" and "message" (as a string) to __someurl/comment__:

#### main.js

```
fetch('someurl/comment', {
  method: 'POST',
  body: 'title=hello&message=world'
})
```



Note: In production, remember to always encrypt any sensitive user data.



The method is again specified with the `init` parameter. This is also where the body of the request is set, which represents the data to be sent (in this case the title and message).

The body data could also be extracted from a form using the  [FormData](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) interface. For example, the above code could be updated to:

#### main.js

```
// Assuming an HTML <form> with id of 'myForm'
fetch('someurl/comment', {
  method: 'POST',
  body: new FormData(document.getElementById('myForm')
})
```

### Custom headers

The `init` parameter can be used with the  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) interface to perform various actions on HTTP request and response headers, including retrieving, setting, adding, and removing them. An example of reading response headers was shown in a  [previous section](#head). The following code demonstrates how a custom  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers) object can be created and used with a fetch request:

#### main.js

```
const myHeaders = new Headers({
  'Content-Type': 'text/plain',
  'X-Custom-Header': 'hello world'
});

fetch('/someurl', {
  headers: myHeaders
});
```

Here we are creating a Headers object where the `Content-Type` header has the value of `text/plain` and a custom `X-Custom-Header` header has the value of `hello world`.



Note: Only some headers, like <code>Content-Type</code> can be modified. Others, like <code>Content-Length</code> and <code>Origin</code> are <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch#Guard">guarded</a>, and cannot be modified (for security reasons).



Custom headers on [cross-origin](#cors) requests must be supported by the server from which the resource is requested. The server in this example would need to be configured to accept the `X-Custom-Header` header in order for the fetch to succeed. When a custom header is set, the browser performs a  [preflight](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS#Preflighted_requests) check. This means that the browser first sends an `OPTIONS` request to the server to determine what HTTP methods and headers are allowed by the server. If the server is configured to accept the method and headers of the original request, then it is sent. Otherwise, an error is thrown.

#### For more information

*  [Headers](https://developer.mozilla.org/en-US/docs/Web/API/Headers)
*  [Preflight checks](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)

<div id="cors"></div>


## Cross-origin requests




Fetch (and XMLHttpRequest) follow the  [same-origin policy](https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy). This means that browsers restrict  [cross-origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) HTTP requests from within scripts.  A cross-origin request occurs when one domain (for example __http://<span></span>foo.com/__) requests a resource from a separate domain (for example __http://<span></span>bar.com/__). This code shows a simple example of a cross-origin request:

#### main.js

```
// From https://foo.com/
const response = await fetch('https://bar.com/data.json');
// do something with the response
```



Note: Cross-origin request restrictions are often a point of confusion. Many resources like images, stylesheets, and scripts are fetched cross-origin. However, these are exceptions to the same-origin policy. Cross-origin requests are still restricted <em>from within scripts</em>.



There have been attempts to work around the same-origin policy (such as  [JSONP](http://stackoverflow.com/questions/2067472/what-is-jsonp-all-about)). The  [Cross Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS) (CORS) mechanism has enabled a standardized means of retrieving cross-origin resources. The CORS mechanism lets you specify in a request that you want to retrieve a cross-origin resource (in fetch this is enabled by default). The browser adds an `Origin` header to the request, and then requests the appropriate resource. The browser only returns the response if the server returns an `Access-Control-Allow-Origin` header specifying that the origin has permission to request the resource. In practice, servers that expect a variety of parties to request their resources (such as 3rd party APIs) set a wildcard value for the `Access-Control-Allow-Origin` header, allowing anyone to access that resource.

If the server you are requesting from doesn't support CORS, you should get an error in the console indicating that the cross-origin request is blocked due to the CORS `Access-Control-Allow-Origin` header being missing.

You can use  [`no-cors`](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch) mode to request opaque resources.  [Opaque responses](https://fetch.spec.whatwg.org/#concept-filtered-response-opaque) can't be accessed with JavaScript but the response can still be served or cached by a service worker. Using `no-cors` mode with fetch is relatively simple. To update the above example with `no-cors`, we pass in the `init` object with `mode` set to `no-cors`:

#### main.js

```
// From https://foo.com/
const response = await fetch('https://bar.com/data.json', {
  mode: 'no-cors' // 'cors' by default
})
// Do something with response
```

#### For more information

*  [Cross Origin Resource Sharing](https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS)

<div id="furtherreading"></div>


## Further reading




*  [Fetch API Codelab](lab-fetch-api)
*  [Learn more about the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
*  [Learn more about Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
*  [Learn more about GlobalFetch.fetch()](https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch)
*  [Get an Introduction to Fetch](/web/updates/2015/03/introduction-to-fetch)
*  [David Welsh's blog on fetch](https://davidwalsh.name/fetch)
*  [Jake Archibald's blog on fetch](https://jakearchibald.com/2015/thats-so-fetch/)


