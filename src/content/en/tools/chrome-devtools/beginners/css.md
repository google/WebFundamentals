project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml

{# wf_updated_on: 2018-08-27 #}
{# wf_published_on: 2018-07-30 #}
{# wf_blink_components: Platform>DevTools #}

TODO 
# DevTools For Beginners: Getting Started with CSS {: .page-title }

This is the second in a series of tutorials that teach you the basics of web
development. 
You are going to learn web development by actually building your own website.
In this particular tutorial, you learn about CSS, another of the core
technologies of web development. CSS controls the style of of webpages. 

Currently your site looks like this: 

`(TODO: A screenshot of the basic HTML site)`

After completing the tutorial, it will look like this: 

`(TODO: A screenshot of the basic CSS site)`


## Goals {: #goals }

By the end of this tutorial, you will understand:

* How CSS can be used to style webpages.
* How Chrome DevTools can help you when you're working CSS.
* The difference between CSS and CSS Frameworks.

You'll also have a real website!

## Prerequisites {: #prerequisites }

Before attempting this tutorial, complete the following prerequisites:

* Complete the previous tutorial on HTML and DOM or complete *Setup* below.
* Download the [Google Chrome][chrome]{: .external } web browser. This tutorial uses a set of web development tools, 
called Chrome DevTools, that are built into Google Chrome. 
[chrome]: https://www.google.com/chrome/

## Set up your code {: #setup }

 

In order to start creating your site, you need to set up your code:

1. **If you have already completed the first tutorial in this series, skip this section! 
   Continue using your code from the last tutorial, 
   [Getting Started with HTML and the DOM](/web/tools/chrome-devtools/beginners/html).**
2. Open the [source code](https://glitch.com/edit/#!/dfb2). A code editor called 
   Glitch shows a page called `index.html`. This will be called the editing tab.

`(TODO: A screenshot showing the action.)`

2. Click **dfb2**. A menu pops up.

`(TODO: A screenshot showing the menu)`

3. Click **Remix This**. Glitch creates a copy of the project that you can 
   edit. Note that the name of the new project will be randomly generated
   and not dfb2. The content is the same, but the name on the top-left has changed.
4. Click **Show Live**. Another tab opens with view of what your site 
   currently looks like. This will be called the **live tab**.

`(TODO: A screenshot showing the result.)`



## Add CSS {: #add-css }

CSS is a language that determines the layout and visual elements of your web site's content 
(which is controlled by HTML). Here is a paragraph with a border:

<p style="border:1px dashed red; padding:5px">This has been styled with CSS.</p> 

**TODO: Explain the two broad categories of css declarations: layout and visual. Explain rulesets**

And here is the HTML and CSS code used to create that paragraph:

```
<p style="border:1px dashed red; padding:5px">
  This has been styled with CSS.
</p> 
```

The code that you haven't seen before is `style="border:1px dashed red; padding:5px"`. 
The rest should look familiar. If not, complete 
[Get Started with HTML and the DOM](html) before attempting this tutorial.


### Add inline styles {: #inline }
TODO: DevTools workflow at end of this section. Box model?

Inline styles are used to define styles for a single element. 
For example, to add a background color to your page's navigational menu:

1. Copy the following code: 

     style="background-color: aliceblue"

1. Add the code that you just copied to your `<nav>`.

       TODO add code here

1. Go to the **live tab** to see the changes! The background of the `<nav>` section is now blue.

As mentioned above, inline styles only apply to a single element,
so only your `<nav>` section is affected. 
In the next section, you learn about how to add styling to multiple elements.


### Re-use styles with internal stylesheets {: #internal }

TODO: DevTools workflow at end of this section

Earlier, you used inline styles to apply a style to a `<p>` tag like this:

```
<p style="border:1px dashed red; padding:5px">
  This has been styled with CSS.
</p>
```

But what if you wanted all of the `<p>` elements on your webpage to be styled the same? 
You'd have to copy and paste the code into every single `<p>` tag on your site. 
That's a lot of time and effort, and if you need to make an edit, 
you'll have to change every tag again. **Internal stylesheets** allow you to write your CSS once so that applies to multiple elements. Try it now:

1. Go to the **live tab**. 
1. Click **Contact** to go to the contact page. Notice the font of **Home** and **Contact**.
1. Copy the following code:
```
<style>
  li a {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
```
1. In the **editor tab**, go to `contact.html`.
1. Add the code that you just copied just before the `</head>` tag.

TODO: Add code sample with highlighting the new code.

1. Go back to the **live tab**. 
1. Click **Contact** to go back to the contact page. 
   The font of **Home** and **Contact** has changed.

Internal stylesheets apply styles using **CSS selectors**. 
CSS selectors are patterns that may apply to one or more HTML elements. 
For example, in the previous code:

```
<style>
  li a {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
```
**li a** is a CSS selector that translates to "any list item that contains a link". 
The browser changed the font of the **Home** and **Contact** links because they matched this pattern. 

```
<li><a href="/">Home</a></li>
<li><a href="/contact.html">Contact</a></li>
```

`font-family: 'Courier New', Courier, monospace;` is a CSS **declaration**. A declaration is made of two parts: a property and a value. In the example above, `font-family` is a property that has a value of `'Courier New', Courier, monospace`. If Courier New isn't available, the browser will choose Courier, and if Courier isn't available, the browser will choose monospace. So, in plain English, the code above reads: 
"Change the font of any list item that contains a link to Courier New, and if Courier New isn't available use Courier, and if Courier isn't available, use monospace". A CSS selector combined with a declaration is called a **ruleset**. 

CSS selectors are also flexible, meaning that multiple CSS selectors can be 
assigned to a style definition. For example, to add the same font to the `<h1>`
elements on your contact page:

1. Go to the **editor tab**.
1. Go to `contact.html`.
1. Go to the internal stylesheet you added before.
1. After `li a`, type `, h1`. This tells the browser you want to apply the style to
   "any list item that contains a link **and** any item that is an h1". 
   Your code should look like this:

```
<style>
  li a, h1 {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
```

1. Go to the **live tab**. 
1. Click the **Contact** link to go back to the contact page. 
   Now, **Contact Me** has the same font as the navigation links.

Now that you understand internal stylesheets, you can use DevTools to add new styles:

1. Right-click the **Home** link.
1. Select **Inspect Element**. This opens up DevTools' **Elements Panel** with the **Home** link highlighted.
1. On the bottom left, there is a panel called the **Styles Pane**. In that pane, you can see the internal stylesheet you made. Under ` font-family: 'Courier New', Courier, monospace;`, type `color:gray` This tells the browser to change the font color to gray.
1. Press <kbd>Enter</kbd>. All of the text on the contact page is now gray.

You can also directly edit existing styles:

1. Copy this number: `#28a78c` This is a **Hexadecimal Color Code**, a different way of representing colors.
1. Click on the gray square next to `gray`. A color picker pops up.
1. In the box that says **Hex**, paste in the number you copied. The color of the font on the contact page will change.

You can use DevTools to preview CSS changes you make in real time, much like you did with HTML and the DOM.



### Re-use styles with external stylesheets {: #external}

Earlier, you used internal stylesheets to apply styles to `li a` and `h1` elements in `contact.html` like this:

```
<style>
  li a, h1 {
    font-family: 'Courier New', Courier, monospace;
  }
</style>
```

What if you wanted to style the elements in `index.html` the same way? What if you had a thousand pages and you wanted them to all be styled the same way?
You'd have to copy and paste the stylesheet into every single web page on your site. 
 **External stylesheets** allow you to write your CSS once so that applies to multiple web pages. Try it now:

1. Copy this code:

```
li a, h1 {
   font-family: 'Courier New', Courier, monospace;
}

nav {
  background-color: aliceblue;
}
```
 You've seen the first ruleset already. 
 The second ruleset represents the **inline style** you applied to the `<nav>` in the 
 *[Add inline styles](#inline)* section. It turns the background color of the `<nav>` section blue.

1. Go to the **editor tab**.
1. In `contact.html`, delete everything between `<style>` and `</style>`, 
   including the `<style>` and `</style>` tags. This removes the internal stylesheet.
1. Go to `index.html` and remove the inline style (`style="background-color: aliceblue"`) 
   from the `<nav>` tag.
1. Click the **New File** button on the left-hand side.
1. Replace `cool-file.js` with `style.css` and click **Add File**. 
   You've now created a blank external stylesheet.
1. In `style.css`, paste in the code you copied. 
1. Copy this code: `<link rel="stylesheet" href="style.css">`. 
1. Go back to `index.html`. Above the `</head>` tag, paste the code you copied. 
   The stylesheet is now linked to  `index.html`.
1. Go back to `contact.html`. Above the `</head>` tag, paste the code you copied. 
   The stylesheet is now linked to  `contact.html`.
1. Go to the **live tab**. The home page now has the same font 
   from the last section and a blue navigation section.
1. Click the **Contact** link to go to the contact page. 
   The contact page has the same formatting as the home page.

TODO: DevTools CSS exploration/ Pseudo-state selector 

#### Use CSS frameworks {: #frameworks}

CSS frameworks are collections of styles built by other developers that make it easier to create attractive web sites. Instead of defining styles yourself, a framework gives you consistent fonts, spacing, and so on for your elements. This probably doesn't make complete sense yet, but it will after you complete this section and the next. Complete the steps below to begin to understand how frameworks work:


1. Copy the following code: 
   `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">` 
   This code tells the browser to import a framework called Bootstrap.
1. In the `contact.html` file, paste the code directly under the `</style>` tag. 
   Make sure the link is under the the internal spreadsheet. 
1. Go to `index.html`.
1. Paste the code you copied above the `</head>` tag.
1. Go to the **live tab**. While the background color of the `<nav>` 
  and the font of the `li a` elements are the same, the font of the other elements has changed.
1. Click the `Contact` link to go to the contact page. 
   The same changes are present. 
  
This is a CSS property called 
**cascading**. If you have multiple rulesets for an element, 
the browser will choose to display the ruleset from the newest stylesheet. 
The Bootstrap style sheet has a ruleset for `<h1>` elements, so your original ruleset was 
overwritten. However, Bootstrap *doesn't* have any rulesets for `li a` or `nav` elements,
so those rulesets carried over. 
Cascading applies to all types of stylesheets, as well as inline styles.

**TODO** Use DevTools to explain how cascading works.

### Use Bootstrap CSS {: #bootstrap }

In the last section, you added Bootstrap to your web pages, which changed the fonts of some of the elements on your site. CSS frameworks can help you make major changes to your page with very little code. For example, you are going to take your header from this: 

TODO: Screenshot

To this:

TODO: Screenshot

With a single line of code.  

1. Copy this code: `class="jumbotron jumbotron-fluid"`
1. Go to **the editor tab**.
1. In `index.html`, paste the code you copied into the `<header>` tag. This tells the browser that the `<header>` tag should have the attributes of a jumbotron, which tells Bootstrap to apply a certain ruleset to the tag.
1. Go to the **live tab**. Now, there is a big gray box around the elements that were in the `<header>` tag.
1. Go back to the **editor tab**.
1.  In `contact.html`, paste the code you copied into the `<header>` tag. Now, the `contact.html` page has the same formatting as `index.html`.
1. Go back to the **live tab**.
1. Click the **Contact** link to go to the contact page. The contact page has the same formatting as the home page.

TODO: Paragraph on classes. Define concept generally, boils down to rulesets, copy some of jumbotron's code.

You can also align content with Bootstrap classes:

1. Copy this code: `class="container-fluid"` .
1. Go to the **editor tab**.
1. In `index.html`, paste the code you copied into the `<body>` class.
1. Above the `<nav>`, type `<div class= "row">`. This adds a **row** to your site. However, nothing will be visible until you assign elements to **columns**.
1. Below `</main>`, close the `<div>` with `</div>`. Now the `<nav>` section and the `<main>` section are in the same row.
1. In the `<nav>` tag, insert the following code: `class= "col-2"` This assigns the `<nav>` section to a column that is 2 units wide. 
1. In the `<main>` tag, insert the following code: `class= "col-10"` This assigns the `<nav>` section to a column that is 10 units wide.
1. Go to the **live tab**. The `<nav>` section should be a sidebar on the left side of the screen. Note that on some mobile devices, the placement of your content may not reflect your changes, as your site is not mobile optimized.
1. Repeat the previous steps for `contact.html`.


Bootstrap's default CSS has given you a more polished site, but there are still some issues you'll need to fix. The spacing of the content both inside and outside of the `<nav>` section and the jumbotron section looks off. DevTools can help change that:

1. Go to the **live tab**. 
1. Right click on the jumbotron (the big gray box) and click **Inspect**.

Next to the **Styles Pane**, there is a diagram called the **Box Model Diagram**. The **Box Model** is a set of properties that control the positioning of elements. 
Each box has four elements: content, padding, border, and margin:

1. Click on the left `-` in the **padding** box.   
2. Type `25`. 
3. Press <kbd>Enter</kbd>. 
This moves the text in the jumbotron to the right so that it isn't so close to the edge.

Do the same thing to the `<nav>` section:

1. Right-click the `<nav>` section (the blue box) and click **Inspect**. The `<nav>` node should be highlighted.
1. Click the top `-` in the **padding box**. 
1. Type `10`.
1. Press <kbd>Enter</kbd>. This changes the padding on the top of the `<nav>` section from `0` pixels to `10` pixels.

Put these changes in the external stylesheet you made earlier to save them:

1. Copy `padding-top:10px` from the **element.style{}** ruleset. 
1. Go to the **editor tab**.
1. Go to `style.css`.
1. Paste the code you copied into the **nav{}** ruleset.
1. Go back to the **live tab**.
1. Right click on the jumbotron (the big gray box) and click **Inspect**.
1. Copy everything in the **element.style{}** ruleset.
1. Paste the element.style{} ruleset into `style.css`
1. Replace element.style{} with `.jumbotron jumbotron-fluid`.

The **Box Model Diagram** can be used to edit other properties related to spacing and layout. It can also change the size of an element, the element's **margins** (the space around the element), and the element's **border** (the space around an element's padding and content).

## Next Steps {: #next-steps }

Now that you've got HTML and CSS down, there's one more language you'll need
to put in your web development toolkit: JavaScript. Soon, there will be a
tutorial that will focus on how DevTools can help you create and fix your
JavaScript code.

## Feedback {: #feedback }
{% include "web/_shared/helpful.html" %}
