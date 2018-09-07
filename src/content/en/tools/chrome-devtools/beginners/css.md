project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml

{# wf_updated_on: 2018-09-07 #}
{# wf_published_on: 2018-09-05 #}
{# wf_blink_components: Platform>DevTools #}

[HTML]: /web/tools/chrome-devtools/beginners/html

# DevTools For Beginners: Get Started with CSS {: .page-title }

{% include "web/_shared/contributors/katjackson.html" %}

In this tutorial, you learn how to use CSS to style a web page. You also learn how to
use Chrome DevTools to experiment with CSS changes.

This is the second tutorial in a series of tutorials that teaches you the basics of web
development and Chrome DevTools. You gain hands-on experience by actually building your own
website. 

Note: You don't have to complete the first tutorial before doing this one. 
You can start here. [Set up your code](#setup) shows you how to get set up.

Currently your site looks like this: 

<figure>
  <img src="imgs/css/intro1.png"
       alt="What your site currently looks like."/>
  <figcaption>
    <b>Figure X</b>. What your site currently looks like
  </figcaption>
</figure>

After completing the tutorial, it will look like this: 

<figure>
  <img src="imgs/css/intro2.png"
       alt="What your site will look like at the end of the tutorial."/>
  <figcaption>
    <b>Figure X</b>. What your site will look like at the end of the tutorial
  </figcaption>
</figure>

## Goals {: #goals }

By the end of this tutorial, you will understand:

* How to use CSS to style a web page.
* How to use Chrome DevTools to experiment with CSS.
* The difference between CSS and CSS frameworks.

You'll also have a real website!

## Prerequisites {: #prerequisites }

Before attempting this tutorial, complete the following prerequisites:

* Complete [Get Started with HTML and the DOM][HTML] 
  or make sure that you have an understanding
  of HTML and the DOM similar to what's taught in that tutorial.
* Download the [Google Chrome][chrome]{: .external } web browser. This tutorial uses a set of
  web development tools, called Chrome DevTools, that are built into Google Chrome. 

[chrome]: https://www.google.com/chrome/

## Set up your code {: #setup }

In order to start creating your site, you need to set up your code:

1. **If you have already completed the first tutorial in this series, skip this section! 
   Continue using your code from the last tutorial, 
   [Get Started with HTML and the DOM](/web/tools/chrome-devtools/beginners/html).**
2. Open the <a class="external gc-analytics-event" target="_blank" rel="noopener"
   data-category="CTA" data-label="/web/tools/chrome-devtools/beginners/css"
   href="https://glitch.com/edit/#!/dfb2?path=index.html">source code</a>. This tab of your
   browser will be called the **editing tab**.

     <figure>
       <img src="imgs/css/setup1.png"
            alt="The editing tab."/>
       <figcaption>
         <b>Figure X</b>. The editing tab
       </figcaption>
     </figure>

2. Click **dfb2**. A menu pops up.

     <figure>
       <img src="imgs/css/setup2.png"
            alt="The Project Options menu."/>
       <figcaption>
         <b>Figure X</b>. The Project Options menu
       </figcaption>
     </figure>

3. Click **Remix This**. Glitch creates a copy of the project that you can 
   edit. Note that Glitch generates a random name for the new project.
4. Click **Show Live**. Another tab opens with a live view of your site.
   This tab of your browser will be called the **live tab**.

     <figure>
       <img src="imgs/css/setup3.png"
            alt="The live tab."/>
       <figcaption>
         <b>Figure X</b>. The live tab
       </figcaption>
     </figure>

## Understand CSS {: #add }

**CSS** is a computer language that determines the layout and styling of web pages. For
example, here is a paragraph with a border:

<p style="border:1px dashed red; padding:5px">This has been styled with CSS.</p> 

Here is the HTML and CSS code used to create that paragraph:

```
<p style="border: 1px dashed red; padding: 5px;">
  This has been styled with CSS.
</p> 
```

`style="border: 1px dashed red; padding: 5px;"` probably looks new to you.
The rest should look familiar. If not, complete [Get Started with HTML and the DOM][HTML]
before attempting this tutorial.

## Add inline styles {: #inline }

Use **inline styles** when you want to apply styles to a single element. 
Try it now:

1. Go back to the editing tab and open `index.html`.

     <figure>
       <img src="imgs/css/inline1.png"
            alt="index.html."/>
       <figcaption>
         <b>Figure X</b>. <code>index.html</code>
       </figcaption>
     </figure>

1. Add `style="background-color: aliceblue;"` to your `<nav>`. In the code block below,
   the bold line of code is the one you need to change. The rest is just there so you
   can be sure that you're putting the new code in the right place.

    <pre class="prettyprint lang-html">{% htmlescape %}...
    <header>
      <p>Welcome to my site!</p>
    </header>{% endhtmlescape %}<strong>
    {% htmlescape %}<nav style="background-color: aliceblue;">{% endhtmlescape %}</strong>{% htmlescape %}
    <ul>
      <li><a href="/">Home</a></li>
      ...
    {% endhtmlescape %}</pre>

1. Go to the **live tab** to see the changes! 
   The background of the `<nav>` section is now blue.

     <figure>
       <img src="imgs/css/inline2.png"
            alt="The background color behind the Home and Contact links is now blue."/>
       <figcaption>
         <b>Figure X</b>. The background color behind the Home and Contact links is now blue
       </figcaption>
     </figure>

## Re-use styles on a single page with internal stylesheets {: #internal }

Earlier, you saw an inline style that applied a style to a single `<p>` tag like this:

```
<p style="border: 1px dashed red; padding: 5px;">
  This has been styled with CSS.
</p>
```

What if you wanted all of the `<p>` elements on your webpage to be styled the same way? 
You'd have to copy and paste the code into every single `<p>` tag on your site. 
That's a lot of time and effort. And, if you needed to make an edit, you'd have to change every tag again. 
**Internal stylesheets** allow you to write your CSS once so that it applies to multiple elements.
Try it now:

1. In the live tab, click **Contact** to go to the contact page. Notice the font of **Home** and **Contact**.

     <figure>
       <img src="imgs/css/internal1.png"
            alt="The Contact page."/>
       <figcaption>
         <b>Figure X</b>. The Contact page
       </figcaption>
     </figure>

1. In the **editor tab**, go to `contact.html`.

1. Add the following code to `contact.html`. Remember, the bold code is what you need to add. The
   other code is just there so you know where to put the new code.

    <pre class="prettyprint lang-html">{% htmlescape %}...
    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">{% endhtmlescape %}<strong>
    {% htmlescape %}  <style>
        li a {
          font-family: 'Courier New', Courier, Serif;
        }
      </style>{% endhtmlescape %}</strong>{% htmlescape %}
    </head>
    ...
    {% endhtmlescape %}</pre>

1. Go back to the **live tab**. 
1. Click **Contact** to go back to the contact page. The font of **Home** and **Contact** has changed.

     <figure>
       <img src="imgs/css/internal2.png"
            alt="The font of the Home and Contact links has changed."/>
       <figcaption>
         <b>Figure X</b>. The font of the Home and Contact links has changed
       </figcaption>
     </figure>

### Understand internal stylesheets {: #internal-overview }

Internal stylesheets apply styles using **selectors**. 
Selectors are patterns that may apply to one or more HTML elements.
For example, in the previous code:

```
<style>
  li a {
    font-family: 'Courier New', Courier, serif;
  }
</style>
```

`li a` is a selector that translates to "any list item that contains a link". 
The browser changes the font of the **Home** and **Contact** links 
because they match this pattern. 

```
<li><a href="/">Home</a></li>
<li><a href="/contact.html">Contact</a></li>
```

`font-family: 'Courier New', Courier, serif` is a **declaration**. 
A declaration is made of two parts: a **property** and a **value**. 
`font-family` is the property, and `'Courier New', Courier, serif` is the value
of that property. The property describes a general way that you can change the element's style,
and the value says how exactly it should change.
For example, `font-family: 'Courier New', Courier, serif` gives the browser this instruction:
"Set the font of elements that match the pattern `li a` to `'Courier New'`. If that font
isn't available, use `Courier`. If that isn't available, use `serif`."

### Add multiple selectors to a ruleset {: #multiple }

A block of CSS code like what you see below is called a **ruleset**.

```
li a {
  font-family: 'Courier New', Courier, monospace;
}
```

Use commas to add multiple selectors to a ruleset. Try it now:

1. In the **editor tab**, open `contact.html`.
1. After `li a` type `, h1`.

    <pre class="prettyprint lang-html">{% htmlescape %}...
    <style>
      li a{% endhtmlescape %}<strong>{% htmlescape %}, h1{% endhtmlescape %}</strong>{% htmlescape %} {
        font-family: 'Courier New', Courier, Serif;
      }
    </style>{% endhtmlescape %}</strong>{% htmlescape %}
    ...
    {% endhtmlescape %}</pre>

    This tells the browser to style `<h1>` elements the same way that it styles
    elements that match the pattern `li a`.

1. Go to the **live tab**. 
1. Click the **Contact** link to go back to the contact page. 
   Now, **Contact Me!** has the same font as the navigation links.

     <figure>
       <img src="imgs/css/multiple1.png"
            alt="The text 'Contact Me!' now has the same font as the Home and Contact links."/>
       <figcaption>
         <b>Figure X</b>. The text "Contact Me!" now has the same font as the Home and Contact links
       </figcaption>
     </figure>

## Experiment with DevTools {: #experiment }

As you continue your journey to master web development, you'll find that CSS can be tricky.
You'll write some CSS and expect it to display one way, but the browser does something completely
different. Chrome DevTools makes it easy to experiment with changes and immediately see how
those changes affect the page.

### Add a declaration to an existing rulest in DevTools {: #add }

When you want to iterate on the style of an existing element, add a declaration
to an existing ruleset. Try it now:

1. Right-click the **Home** link and select **Inspect**.

     <figure>
       <img src="imgs/css/add1.png"
            alt="Inspecting the Home link."/>
       <figcaption>
         <b>Figure X</b>. Inspecting the Home link
       </figcaption>
     </figure>

    DevTools opens up alongside your page. The code that represents the Home link,
    `<nav href="/">Home</a>` is highlighted blue in the DOM Tree. This should be familiar from
    [Get Started with HTML and the DOM](html). In the **Styles** tab below the DOM Tree you can see the
    `font-family: 'Courier New', serif` declaration that you added to `contact.html` earlier.

     <figure>
       <img src="imgs/css/add2.png"
            alt="The Styles tab is below the DOM Tree."/>
       <figcaption>
         <b>Figure X</b>. The Styles tab is below the DOM Tree
       </figcaption>
     </figure>

    If your DevTools window is wide, the Styles tab is to the right of the DOM Tree.

     <figure>
       <img src="imgs/css/add3.png"
            alt="The Styles tab is to the right of the DOM Tree."/>
       <figcaption>
         <b>Figure X</b>. The Styles tab is to the right of the DOM Tree
       </figcaption>
     </figure>

1. Click the whitespace below `font-family: 'Courier New', Courier, Serif` to add a new declaration.

     <figure>
       <img src="imgs/css/add4.png"
            alt="Adding a new declaration."/>
       <figcaption>
         <b>Figure X</b>. Adding a new declaration
       </figcaption>
     </figure>

1. Type `color` and then press <kbd>Enter</kbd>. The autocomplete UI suggests options as you type.

     <figure>
       <img src="imgs/css/add5.png"
            alt="Typing 'color'."/>
       <figcaption>
         <b>Figure X</b>. Typing <code>color</code>
       </figcaption>
     </figure>

1. Type `magenta` and then press <kbd>Enter</kbd> again. All of the text on the contact page is now magenta.

     <figure>
       <img src="imgs/css/add6.png"
            alt="Typing 'magenta'."/>
       <figcaption>
         <b>Figure X</b>. Typing <code>magenta</code>
       </figcaption>
     </figure>

### Edit a declaration in DevTools {: #edit-declaration }

You can also edit existing declarations in DevTools. Try it now:

1. Click the magenta square next to `magenta`. A color picker pops up.
1. Use the color picker to change the font text to a color that you like.

### Add a new ruleset in DevTools {: #add-ruleset }

You can also add new rulesets in DevTools. Try it now:

1. Click **New Style Rule**. An empty ruleset appears with `a` as the selector.
1. Replace `a` with `a:hover`.


    `:hover` is a **pseudo-class**. Use pseudo-classes to
    style elements when they enter special states. For example, the `a:hover` style
    only takes effect when you're hovering over an `<a>` element.

1. Click between the brackets to add a new declaration.
1. Type `background-color` for the declaration name and then press <kbd>Enter</kbd>.
1. Type `green` for the declaration value and then press <kbd>Enter</kbd>.
1. Hover your mouse over the **Home** link. The background of the link turns green.

You can use DevTools to preview CSS changes you make in real time, 
much like you did with HTML and the DOM.

### Delete your changes {: #delete }

Remember that changes you make in DevTools are lost when you reload the page. Try it now:

1. Click **Reload**.

## Re-use styles across pages with external stylesheets {: #external}

Earlier you added this internal stylesheet to `contact.html`:

```
<style>
  li a, h1 {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
```

What if you wanted to style `index.html` the same way? 
What if you had a *thousand* pages and you wanted to apply these styles to all of them?
You'd have to copy and paste this internal stylesheet into every single web page on your site. 
**External stylesheets** allow you to write your CSS once yet apply it to multiple pages.
Try it now:

1. Go back to the **editor tab** and open `contact.html`.
1. Delete everything between `<style>` and `</style>`, including `<style>` and `</style>`.
1. Go to `index.html` and remove the inline style, `style="background-color: aliceblue;"`,
   from the `<nav>` tag.

    You have now removed all of the CSS that you previously added to your site.

1. Click **New File**.
1. Replace `cool-file.js` with `style.css` and then click **Add File**.
1. Paste this code into `styles.css`:

    <pre class="prettyprint lang-css">
    li a, h1 {
      font-family: 'Courier New', Courier, Serif;
    }
    a:hover {
      background-color: green;
    }
    nav {
      background-color: aliceblue;
    }
    </pre>

    At this point, you have created an external stylesheet, but your HTML doesn't know that it exists, yet.

1. Open `index.html`.
1. Add `<link rel="stylesheet" href="style.css">` to your HTML.

    <pre class="prettyprint lang-html">{% htmlescape %}...
    <head>
      ...
      <meta name="viewport" content="width=device-width, initial-scale=1">{% endhtmlescape %}<strong>
    {% htmlescape %}  <link rel="stylesheet" href="styles.css">{% endhtmlescape %}</strong>{% htmlescape %}
    </head>
    ...
    {% endhtmlescape %}</pre>

1. Go back to `contact.html`. Above the `</head>` tag, paste the code you copied. 
   The stylesheet is now linked to `contact.html`.
1. Go to the **live tab**. The home page now has the same font 
   from the last section and a blue navigation section.
1. Click the **Contact** link to go to the contact page. 
   The contact page has the same formatting as the home page.

## Use a CSS framework {: #framework }

**CSS frameworks** are collections of styles built by other developers that make it easier
to create attractive web sites. Instead of defining styles yourself, a framework gives you
a collection of styles that you can use on your page elements.

1. Copy the following code: 
   `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">` 
   This code tells the browser to import a framework called **Bootstrap**.
1. In the `contact.html` file, paste the code you copied directly above the `</head>` tag.
1. Go to `index.html`.
1. Paste the code you copied above the `</head>` tag.
1. Go to the **live tab**. While the background color of the `<nav>` 
   and the font of the `li a` elements are the same, 
   the font of the other elements has changed.
1. Click the `Contact` link to go to the contact page. 
   The same changes are present. 

### Use a class {: #class }
 
In the last section, you added Bootstrap to your web pages, 
which changed the fonts of some of the elements on your site. 
CSS frameworks can help you make major changes to your page with very little code. 
For example, you are going to take your header from this: 

To this:

With a single line of code.  

1. Copy this code: `class="jumbotron jumbotron-fluid"`
1. Go to **the editor tab**.
1. In `index.html`, paste the code you copied into the `<header>` tag. 
   This tells the browser that the `<header>` tag should have the attributes of a jumbotron,
   which tells Bootstrap to apply a certain ruleset to the tag.
1. Go to the **live tab**. Now, there is a big gray box around 
   the elements that were in the `<header>` tag.
1. Go back to the **editor tab**.
1. In `contact.html`, paste the code you copied into the `<header>` tag. 
1. Go back to the **live tab**.
1. Click the **Contact** link to go to the contact page. 
   The contact page has the same formatting as the home page.

### Align elements {: #align }

Bootstrap has other exclusive classes that align elements:

1. Copy this code: `class="container-fluid"` .
1. Go to the **editor tab**.
1. In `index.html`, wrap your `<nav>` and `<main>` elements in a `<div>`.

    <pre class="prettyprint lang-html">{% htmlescape %}...
    <body class="container-fluid">
      <header class="jumbotron jumbotron-fluid">
        <p>Welcome to my site!</p>
      </header>{% endhtmlescape %}
    <strong>{% htmlescape %}  <div class="row">{% endhtmlescape %}</strong>{% htmlescape %}
        <nav class="col-3">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/contact.html">Contact</a></li>
          </ul>
        </nav>
        <main class="col-9">
          <h1>About Me</h1>
          <p>I am learning web development. Recent accomplishments:</p>
          <ul>
            <li>Learned how to set up my code in Glitch.</li>
            <li>Added content to my HTML.</li>
            <li>Learned how to use Chrome DevTools to experiment with content changes.</li>
            <li>Learned the difference between HTML and the DOM.</li>
          </ul>
        </main>{% endhtmlescape %}
    <strong>{% htmlescape %}  </div>{% endhtmlescape %}</strong>{% htmlescape %}
    </body>
    ...
    {% endhtmlescape %}</pre>




1. Above the `<nav>`, type `<div class= "row">`. 
   This adds a **row** to your site. However, 
   nothing will be visible until you assign elements to **columns**.

1. Below `</main>`, close the `<div>` with `</div>`. Now the `<nav>` section and the 
   `<main>` section are in the same row.

1. In the `<nav>` tag, insert the following code: `class= "col-2"` 
   This assigns the `<nav>` section to a column that is 2 units wide. 

1. In the `<main>` tag, insert the following code: `class= "col-10"` 
   This assigns the `<nav>` section to a column that is 10 units wide.

1. Go to the **live tab**. The `<nav>` section should be a sidebar on the left side 
   of the screen. Note that on some mobile devices, 
   the placement of your content may not reflect your changes, 
   as your site is not mobile optimized.

1. Repeat the previous steps for `contact.html`.

### Understand classes {: #classes-overview }

You've just used your first **HTML class**. A class is an HTML attribute that defines a 
**CSS selector**. As mentioned in [a previous section](#internal), CSS selectors are 
patterns that may apply to one or more HTML elements. 

For example, setting the `<header>'s` class to `jumbotron` applied this ruleset:

```
.jumbotron {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  background-color: #e9ecef;
  border-radius: .3rem;
}
```

In this case, the selector `.jumbotron` means "all HTML elements with the 
class `jumbotron`". 

While any HTML element can have a **class** attribute, 
a class like `jumbotron` will not format 
in the way you see on your site unless you have Bootstrap linked to your web page.

## Next steps {: #next-steps }

Now that you've got HTML and CSS down, there's one more language you'll need
to put in your web development toolkit: JavaScript. Soon, there will be a
tutorial that will focus on how DevTools can help you create and fix your
JavaScript code.

### Resources

* [CSS Guide](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS)
* [Bootstrap's Documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction/)
* [More Information on DevTools and CSS](/web/tools/chrome-devtools/css/)

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
