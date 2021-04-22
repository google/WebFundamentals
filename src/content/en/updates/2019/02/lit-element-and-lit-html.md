project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: "lit-html and LitElement bring fast, lightweight templates and interoperable components to the modern web."

{# wf_updated_on: 2019-02-05 #}
{# wf_published_on: 2019-02-05 #}
{# wf_tags: news,webcomponents,polymer,lit-element,lit-html #}
{# wf_featured_image: /web/updates/images/2019/02/lit-element.jpg #}
{# wf_featured_snippet: lit-html and LitElement are two new libraries for building fast, interoperable components. lit-html provides lightning-fast templating. LitElement is a lightweight base class for building Web Components with lit-html templates. #}
{# wf_blink_components: N/A #}

# Lightning-fast templates & Web Components: lit-html & LitElement {: .page-title }

{% include "web/_shared/contributors/justinfagnani.html" %}

Today we're excited to announce the first stable releases of our two next-generation web 
development libraries: [lit-html](https://lit-html.polymer-project.org) and 
[LitElement](https://lit-element.polymer-project.org/).

lit-html is a tiny, fast, expressive library for HTML templating. LitElement is a simple base
class for creating Web Components with lit-html templates.

If you've been following the projects, you probably know what lit-html and LitElement are all
about (and you can [skip to the end](#get-started) if you like). If you're new to lit-html and
LitElement, read on for an overview.

## lit-html: a tiny, fast library for HTML templating

lit-html is a tiny (just over 3k bundled, minified, and gzipped) and fast JavaScript library for
HTML templating. lit-html works well with functional programming approaches, letting you express
your application's UI declaratively, as a function of its state.

```js
const myTemplate = (name) => html`
    <div>
      Hi, my name is ${name}.
    </div>
`;
```

It's simple to render a lit-html template:

```js
render(myTemplate('Ada'), document.body);
```

Re-rendering a template only updates the data that's changed:

```js
render(myTemplate('Grace'), document.body);
```

lit-html is efficient, expressive, and extensible:

*   **Efficient**. lit-html is lightning fast. When data changes, lit-html doesn't need to do any
    diffing; instead, it remembers where you inserted expressions in your template and only
    updates these dynamic parts.
*   **Expressive**. lit-html gives you the full power of JavaScript, declarative UI, and
    functional programming patterns. The expressions in a lit-html template are just JavaScript,
    so you don't need to learn a custom syntax and you have all the expressiveness of the language
    at your disposal. lit-html supports many kinds of values natively: strings, DOM nodes, arrays
    and more. Templates themselves are values that can be computed, passed to and from functions,
    and nested.
*   **Extensible**: lit-html is also customizable and extensible—your very own template
    construction kit. Directives customize how values are handled, allowing for asynchronous
    values, efficient keyed-repeats, error boundaries, and more. lit-html includes several
    ready-to-use directives and makes it easy to define your own.

A number of libraries and projects have already incorporated lit-html. You can find a list of some 
of these libraries in the [awesome-lit-html](https://github.com/web-padawan/awesome-lit-html) repo 
on GitHub.

If templating is all you need, you can get started now with the 
[lit-html docs](https://lit-html.polymer-project.org/). If you'd like to build components to use 
in your app or share with your team, read on to learn more.

## LitElement: a lightweight Web Component base class

LitElement is a lightweight base class that makes it easier than ever to build and share Web
Components.

LitElement uses lit-html to render components and adds APIs to declare reactive properties and
attributes. Elements update automatically when their properties change. And they update _fast_,
without diffing.

Here's a simple LitElement component in TypeScript:

```typescript
@customElement('name-tag')
class NameTag extends LitElement {
  @property()
  name = 'a secret';

  render() {
    return html`<p>Hi, my name is ${this.name}!</p>`;
  }
}
```

(We have a great vanilla JavaScript API also.)

This creates an element you can use anywhere you'd use a regular HTML element:

`<name-tag name="Ida"></name-tag>`

If you use Web Components already, you'll be happy to hear that they're now natively supported in
Chrome, Safari and Firefox. Edge support is coming soon, and polyfills are only needed for legacy
browser versions. 

If you're new to Web Components, you should give them a try! Web Components let you extend HTML in
a way that interoperates with other libraries, tools, and frameworks. This makes them ideal for
sharing UI elements within a large organization, publishing components for use anywhere on the web,
or building UI design systems like Material Design.

You can use custom elements anywhere you use HTML: in your main document, in a CMS, in Markdown, or
in views [built with frameworks](https://custom-elements-everywhere.com/) like React and Vue. You
can also mix and match LitElement components with other Web Components, whether they've been
written using vanilla web technologies or made with the help of tools like
[Salesforce Lightning Web Components](https://developer.salesforce.com/blogs/2018/12/introducing-lightning-web-components.html), 
Ionic's [Stencil](https://stenciljs.com/), [SkateJS](https://skatejs.netlify.com/) or the 
[Polymer library](https://polymer-library.polymer-project.org).

## Get started {: #get-started }

Want to try lit-html and LitElement? A good starting point is the LitElement tutorial:

* [Try LitElement](https://lit-element.polymer-project.org/try)

If you're interested in using lit-html by itself, or integrating lit-html templating into another
project, see the lit-html docs:

* [lit-html docs](https://lit-html.polymer-project.org/)

As always, let us know what you think. You can reach us on [Slack](https://join.slack.com/t/polymer/shared_invite/enQtNTAzNzg3NjU4ODM4LTkzZGVlOGIxMmNiMjMzZDM1YzYyMzdiYTk0YjQyOWZhZTMwN2RlNjM5ZDFmZjMxZWRjMWViMDA1MjNiYWFhZWM)
or [Twitter](https://twitter.com/buildWithLit). Our projects are open source (of course!) and you can
report bugs, file feature requests or suggest improvements on GitHub:

* [lit-html on GitHub](https://github.com/Polymer/lit-html)
* [LitElement on GitHub](https://github.com/Polymer/lit-element)

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
