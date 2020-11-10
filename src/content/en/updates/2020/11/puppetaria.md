project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Puppetaria: accessibility-first Puppeteer scripts. The Chrome DevTools engineering blog - by the developers who build the DevTools.

{# wf_updated_on: 2020-11-10 #}
{# wf_published_on: 2020-11-10 #}
{# wf_tags: devtools-blog #}
{# wf_featured_image: /web/updates/images/2020/11/puppetaria/puppetaria.png #}
{# wf_featured_snippet: Puppetaria: accessibility-first Puppeteer scripts. #}
{# wf_blink_components: N/A #}

# Puppetaria: accessibility-first Puppeteer scripts {: .page-title }

{% include "web/_shared/contributors/jobay.html" %}


## Puppeteer and its approach to selectors {: .intro }

Puppeteer is a browser automation library for Node: it lets you control a browser using a simple and modern JavaScript API.

The most prominent browser task is, of course, browsing web pages. Automating this task essentially amounts to automating interactions with the webpage. 

In Puppeteer, this is achieved by querying for DOM elements using string-based selectors and performing actions such as clicking or typing text on the elements. For example, a script that opens opens [developer.google.com], finds the search box, and searches for `puppetaria` could look like this:

```javascript
(async () => {
   const browser = await puppeteer.launch({ headless: false });
   const page = await browser.newPage();
   await page.goto('https://developers.google.com/', { waitUntil: 'load' });
   // Find the search box using a suitable CSS selector.
   const search = await page.$('devsite-search > form > div.devsite-search-container');
   // Click to expand search box and focus it.
   await search.click();
   // Enter search string and press Enter.
   await search.type('puppetaria');
   await search.press('Enter');
 })();
```

How elements are identified using query selectors is therefore a defining part of the Puppeteer experience. Until now, selectors in Puppeteer have been limited to CSS and XPath selectors which, albeit expressionally very powerful, can have drawbacks for persisting browser interactions in scripts. 


### Syntactic vs. semantic selectors {: .selectors }
CSS selectors are syntactic in nature; they are tightly bound to the inner workings of the textual representation of the DOM tree in the sense that they reference IDs and class names from the DOM. As such, they provide an integral tool for web developers for modifying or adding styles to an element in a page, but in that context the developer has full control over the page and its DOM tree. 

On the other hand, a Puppeteer script is an external observer of a page, so when CSS selectors are used in this context, it introduces hidden assumptions about how the page is implemented which the Puppeteer script has no control over.

The effect is that such scripts can be brittle and susceptible to source code changes. Suppose, for example, that one uses Puppeteer scripts for automated testing for a web application containing the node `<button>Submit</button>` as the third child of the `body` element. One snippet from a test case might look like this:

```javascript
const button = await page.$('body:nth-child(3)'); // problematic selector
await button.click();
```

Here, we are using the selector `'body:nth-child(3)'` to find the submit button, but this is tightly bound to exactly this version of the webpage. If an element is later added above the button, this selector no longer works!

This is not news to test writers: Puppeteer users already attempt to pick selectors that are robust to such changes. With Puppetaria, we give users a new tool in this quest.

Puppeteer now ships with an **alternative query handler based on querying the accessibility tree rather than relying on CSS selectors**. The underlying philosophy here is that if the concrete element we want to select has not changed, then the corresponding accessibility node should not have changed either. 

We name such selectors “[ARIA](https://w3c.github.io/aria/) selectors” and support querying for the computed accessible name and role of the accessibility tree. Compared to the CSS selectors, these properties are semantic in nature. They are not tied to syntactic properties of the DOM but instead descriptors for how the page is observed through assistive technologies such as screen readers.

In the test script example above, we could instead use the selector `aria/Submit[role="button"]` to select the wanted button, where `Submit` refers to the accessible name of the element:


```javascript
const button = await page.$('aria/Submit[role="button"]');
await button.click();
```

Now, if we later decide to change the text content of our button from `Submit` to `Done` the test will again fail, but in this case that is desirable; by changing the name of the button we change the page's content, as opposed to its visual presentation or how it happens to be structured in the DOM. Our tests should warn us about such changes to ensure that such changes are intentional.

Going back to the larger example with the search bar, we could leverage the new `aria` handler and replace

```javascript
const search = await page.$('devsite-search > form > div.devsite-search-container');
```

with 

```javascript
const search = await page.$('aria/Open search[role="button"]');
```
to locate the search bar!

More generally, we believe that using such ARIA selectors can provide the following benefits to Puppeteer users:

- Make selectors in test scripts more resilient to source code changes.
- Make test scripts more readable (accessible names are semantic descriptors).
- Motivate good practices for assigning accessibility properties to elements.

The rest of this article dives into the details on how we implemented the Puppetaria project.

## The design process {: .design-process }

### Background
As motivated above, we want to enable querying elements by their accessible name and role.
These are properties of the [accessibility tree](https://chromium.googlesource.com/chromium/src/+/master/docs/accessibility/overview.md#concepts), a dual to the usual DOM tree, that is used by devices such as screen readers to show webpages.

From looking at the specification for [computing the accessible name](https://w3c.github.io/accname/#mapping_additional_nd_te), it is clear that computing the name for an element is a non-trivial task, so from the beginning we decided that we wanted to reuse Chromium’s existing infrastructure for this.

### How we approached implementing it
Even limiting ourselves to using Chromium’s accessibility tree, there are quite a few ways that we could implement ARIA querying in Puppeteer. To see why, let’s first see how Puppeteer controls the browser.

The browser exposes a debugging interface via a protocol called the [Chrome DevTools Protocol (CDP)](https://chromedevtools.github.io/devtools-protocol/). This exposes functionality such as "reload the page" or "execute this piece of JavaScript in the page and hand back the result" via a language-agnostic interface.

Both the DevTools front-end and Puppeteer are using CDP to talk to the browser. To implement CDP commands, there is DevTools infrastructure inside all components of Chrome: in the browser, in the renderer, and so on. CDP takes care of routing the commands to the right place.

Puppeteer actions such as querying, clicking, and evaluating expressions are performed by leveraging CDP commands such as `Runtime.evaluate` that evaluates JavaScript directly in the page context and hands back the result. Other Puppeteer actions such as emulating color vision deficiency, taking screenshots, or capturing traces use CDP to communicate directly with the Blink rendering process.

![CDP](/web/updates/images/2020/11/puppetaria/puppetaria-01.jpg)


This already leaves us with two paths for implementing our querying functionality; we can:

- Write our querying logic in JavaScript and have that injected into the page using `Runtime.evaluate`, or 
- Use a CDP endpoint that can access and query the accessibility tree directly in the Blink process. 

We implemented 3 prototypes:

- **JS DOM traversal** - based on injecting JavaScript into the page
- **Puppeteer AXTree traversal** - based on using the existing CDP access to the accessibility tree
- **CDP DOM traversal** - using a new CDP endpoint purpose-built for querying the accessibility tree

#### JS DOM traversal
This prototype does a full traversal of the DOM and uses `element.computedName` and `element.computedRole`, gated on the [`ComputedAccessibilityInfo` launch flag](https://www.chromestatus.com/feature/5530552681627648), to retrieve the name and role for each element during the traversal.
#### Puppeteer AXTree traversal
Here, we instead retrieve the full accessibility tree through CDP and traverse it in Puppeteer. The resulting accessibility nodes are then mapped to DOM nodes.
#### CDP DOM traversal
For this prototype, we implemented a new CDP endpoint specifically for querying the accessibility tree. This way, the querying can happen on the back-end through a C++ implementation instead of in the page context via JavaScript.

### Unit test benchmark
The following figure compares the total runtime of querying four elements 1000 times for the 3 prototypes. The benchmark was executed in 3 different configurations varying the page size and whether or not caching of accessibility elements was enabled.

![Benchmark: Total runtime of querying four elements 1000 times](/web/updates/images/2020/11/puppetaria/puppetaria-02.jpg)

It is quite clear that there is a considerable performance gap between the CDP-backed querying mechanism and the two others implemented solely in Puppeteer, and the relative difference seems to increase dramatically with the page size. It is somewhat interesting to see that the JS DOM traversal prototype responds so well to enabling accessibility caching. With caching disabled, the  accessibility tree is computed on demand and discards the tree after each interaction if the domain is diabled. Enabling the domain makes Chromium cache the computed tree instead.

For the JS DOM traversal we ask for the accessible name and role for every element during the traversal, so if caching is disabled, Chromium computes and discards the accessibility tree for every element we visit. For the CDP based approaches, on the other hand, the tree is only discarded between each call to CDP, i.e. for every query. These approaches also benefit from enabling caching, as the accessibility tree is then persisted across CDP calls, but the performance boost is therefore comparatively smaller. 

Even though enabling caching looks desirable here, it does come with a cost of additional memory usage. For Puppeteer scripts that e.g [records trace files](https://pptr.dev/#?product=Puppeteer&version=v5.4.1&show=api-class-tracing), this could be problematic. We therefore decided not to enable accessibility tree caching per default. Users can turn on caching themselves by enabling the CDP [Accessibility domain](https://chromedevtools.github.io/devtools-protocol/tot/Accessibility/#method-enable).


### DevTools test suite benchmark {: .benchmark }
The previous benchmark showed that implementing our querying mechanism at the CDP layer gives a performance boost in a clinical unit-test scenario.

To see if the difference is pronounced enough to make it noticeable in a more realistic scenario of running a full test suite, we [patched the DevTools end-to-end test suite](https://chromium-review.googlesource.com/c/devtools/devtools-frontend/+/2360013) to make use of the JavaScript and CDP-based prototypes and compared the runtimes. In this benchmark, we changed a total of 43 selectors from `[aria-label=…]` to a custom query handler `aria/…`, which we then implemented using each of the prototypes.

Some of the selectors are used multiple times in test scripts, so the actual number of executions of the `aria` query handler was 113 per run of the suite. The total number of query selections was 2253, so only a fraction of the query selections happened through the prototypes.


![Benchmark: e2e test suite](/web/updates/images/2020/11/puppetaria/puppetaria-03.jpg)

As seen in the figure above, there is a discernible difference in the total runtime. The data is too noisy to conclude anything specific, but it is clear that the performance gap between the two prototypes shows in this scenario as well.
### A new CDP endpoint
In light of the above benchmarks, and since the launch flag-based approach was undesirable in general, we decided to move forward with implementing a new CDP command for querying the accessibility tree. Now, we had to figure out the interface of this new endpoint.

For our use case in Puppeteer, we need the endpoint to take so-called [`RemoteObjectIds`](https://chromedevtools.github.io/devtools-protocol/tot/Runtime/#type-RemoteObjectId) as argument and, to enable us to find the corresponding DOM elements afterwards, it should return a list of objects that contains the [`backendNodeIds`](https://chromedevtools.github.io/devtools-protocol/tot/DOM/#type-BackendNodeId) for the DOM elements. 

As seen in the chart below, we tried quite a few approaches satisfying this interface. From this, we found that the size of the returned objects, i.e whether or not we returned full accessibility nodes or only the `backendNodeIds` made no discernible difference. On the other hand, we found that using the existing [`NextInPreOrderIncludingIgnored`](codesearch link) was a poor choice for implementing the traversal logic here, as that yielded a noticeable slow-down.

![benchmark](/web/updates/images/2020/11/puppetaria/puppetaria-04.jpg)

### Wrapping it all up {: .wrapping-up }
Now, with the CDP endpoint in place, we implemented the query handler on [the Puppeteer side](https://github.com/puppeteer/puppeteer/issues/6307). The grunt of the work here was to restructure the query handling code to enable queries to resolve directly through CDP instead of querying through JavaScript evaluated in the page context.

## What’s next? {: .whats-next }
The new `aria` handler shipped with [Puppeteer v5.4.0](https://github.com/puppeteer/puppeteer/releases/tag/v5.4.0) as a built-in query handler. We are looking forward to seeing how users adopt it into their test scripts, and we cannot wait to hear your ideas on how we can make this even more useful!


<<../../_shared/devtools-feedback.md>>

<<../../_shared/discover-devtools-blog.md>>

{% include "web/_shared/rss-widget-updates.html" %}
