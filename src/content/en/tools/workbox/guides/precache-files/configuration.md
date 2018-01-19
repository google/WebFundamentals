project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: A guide on how to configure precache files with Workbox.

{# wf_blink_components: N/A #}
{# wf_updated_on: 2017-12-01 #}
{# wf_published_on: 2017-11-15 #}

It's fairly common to have an `index.html` file that is served when a
url ending in a `/` is request or support for `/about.html` being accessible
by `/about.html`.

By default, when a file is requested precaching will manipulate the URL
in several ways to attempt to match against a precache URL.

For example, `/?utm_=123` would be tested for the following URLs:

1. `/?utm_=123` (First it checks the URL as is)
1. `/` (Then it will check the URL with ignore URL Params)
1. `/index.html` (If the URL ends in a slash it will attempt the request
the `index.html`)
1. `/.html` (Lastly it checks the URL with .html on the end which is
useful for clean URLs such as `/about` matching `/about.html`)

These changes to the input URL can be altered and opted out of with
configuration like so:

```javascript
workbox.precaching.precacheAndRoute(
  [
    '/styles/index.0c9a31.css',
    '/scripts/main.0d5770.js',
    { url: '/index.html', revision: '383676' },
  ],
  {
    ignoreUrlParametersMatching: /.*/
    directoryIndex: null,
    cleanUrls: false,
    urlManipulaion: ({url}) => {
      ...
      return alteredUrl;
    }
  }
);
```

Below is a look at each of these options.

### Ignoring Search Parameters

By default Workbox will treat URL's as different if the search parameters are
different. This means that if you precached `/index.html` and someone made a
request for `/index.html?example=search`, Workbox **wouldn't** match the URL
with the precached file.

You can alter this behavior with the `ignoreUrlParametersMatching` option
which will remove any search parameters matching a regex in this option.

For example, if we wanted to convert the URL `/example.html?key1=1&key2=2`
such that `key1` wasn't a part of the URL, you set the
`ignoreURLParametersMatching` option to remove it, like so:

```javascript
workbox.precaching.precacheAndRoute(
  [
    { url: '/example.html?key2=2', revision: '6821e0' }
  ],
  {
    ignoreUrlParametersMatching:[/key1/],
  }
);
```

By default, this is set to `[/^utm_/]` to ensure tracking metrics don't
affect precaching. If you wanted to ignore all search parameters you use
the regex `[/./]`.

### Change the Directory Index

Precache will add `index.html` to URL's ending in `/` *if* no match
in the precache can be found. If you want to change the addition, you
can pass in a different string:

```javascript
workbox.precaching.precacheAndRoute(
  [
    { url: '/index.php', revision: '6821e0' }
  ],
  {
    directoryIndex: 'index.php',
  }
);
```

You can **disable this behaviour** by setting `directoryIndex` to `null`.

### Supporting Clean URLs

It's not uncommon for backends to support "pretty" or "clean" URL's where a
request like `/about` would be responded to with the contents of a static
file like `/about.html`. By default, Workbox precaching will do this when
checking for matches in the precache.

By default this logic is applied but you can turn if off like so:

```javascript
workbox.precaching.precacheAndRoute(
  [
    { url: '/index.php', revision: '6821e0' }
  ],
  {
    cleanUrls: false,
  }
);
```

### Custom URL to Precache Matching

If you need to customise the logic that matches a URL request
to the file in the precache, you can use the `urlManipulation`
callback to define what should be checked for in the precache
list.

```javascript
workbox.precaching.precacheAndRoute(
  [
    { url: '/index.php', revision: '6821e0' }
  ],
  {
    urlManipulation: ({url}) => {
      // TODO: Alter the URL some how.
      return alteredUrl;
    },
  }
);
```

**You can also return an array of URLs** if there are
multiple possible matches that you would like to match for.
