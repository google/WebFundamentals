project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Promise.prototype.finally allows registering a callback to be invoked when a promise is settled.

{# wf_updated_on: 2017-10-23 #}
{# wf_published_on: 2017-10-23 #}
{# wf_tags: javascript #}
{# wf_featured_image: /web/updates/images/2017/07/v8.png #}
{# wf_featured_snippet: `Promise.prototype.finally` allows registering a callback to be invoked when a promise is settled. #}
{# wf_blink_components: Blink>JavaScript>Language #}

# Promise.prototype.finally {: .page-title }

{% include "web/_shared/contributors/mathiasbynens.html" %}

[`Promise.prototype.finally`](https://tc39.github.io/proposal-promise-finally/)
is enabled by default in V8 v6.3.165+ and Chrome 63+. It allows registering a
callback to be invoked when a promise is settled (i.e. either fulfilled, or
rejected).

Imagine you want to fetch some data to show on the page. Oh, and you want to
show a loading spinner when the request starts, and hide it when the request
completes. When something goes wrong, you show an error message instead.

```js
const fetchAndDisplay = ({ url, element }) => {
  showLoadingSpinner();
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      element.textContent = text;
      hideLoadingSpinner();
    })
    .catch((error) => {
      element.textContent = error.message;
      hideLoadingSpinner();
    });
};

fetchAndDisplay({
  url: someUrl,
  element: document.querySelector('#output')
});

```

If the request succeeds, we display the data. If something goes wrong, we
display an error message instead.

In either case we need to call `hideLoadingSpinner()`. Until now, we had no
choice but to duplicate this call in both the `then()` and the `catch()`
block. With `Promise.prototype.finally`, we can do better:

```js
const fetchAndDisplay = ({ url, element }) => {
  showLoadingSpinner();
  fetch(url)
    .then((response) => response.text())
    .then((text) => {
      element.textContent = text;
    })
    .catch((error) => {
      element.textContent = error.message;
    })
    .finally(() => {
      hideLoadingSpinner();
    });
};
```

Not only does this reduce code duplication, it also separates the succes/error
handling phase and the cleanup phase more clearly. Neat!

Currently, the same thing is possible with `async`/`await`, and without
`Promise.prototype.finally`:

```js
const fetchAndDisplay = async ({ url, element }) => {
  showLoadingSpinner();
  try {
    const response = await fetch(url);
    const text = await response.text();
    element.textContent = text;
  } catch (error) {
    element.textContent = error.message;
  } finally {
    hideLoadingSpinner();
  }
};
```

Since [`async` and `await` are strictly
better](https://mathiasbynens.be/notes/async-stack-traces), my recommendation
remains to use them instead of vanilla promises. That said, if you prefer
vanilla promises for some reason, `Promise.prototype.finally` can help make
your code simpler and cleaner.

{% include "comment-widget.html" %}
