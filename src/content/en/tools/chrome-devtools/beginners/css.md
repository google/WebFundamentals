project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml

{# wf_updated_on: 2018-08-24 #}
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

CSS is a langauge that determines the style of your web site's content which 
is controlled by HTML. Here is a paragraph with a border:

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
TODO: DevTools workflow at end of this section

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

`font-family: 'Courier New', Courier, monospace;` is a CSS **declaration**. A declaration is made of two parts: a property and a value. In the example above, `font-family` is a property that has a value of `'Courier New', Courier, monospace`. If Courier New isn't availible, the broswer will choose Courier, and if Courier isn't availible, the browswer will choose monospace. So, in plain English, the code above reads: 
"Change the font of any list item that contains a link to Courier New, and if Courier New isn't availible use Courier, and if Courier isn't availible, use monospace". 

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

#### Use CSS Frameworks

CSS Frameworks are pre-built external stylesheets that 
automatically apply styles to your site. In this tutorial, 
you'll be using a CSS framework called Bootstrap so you can get a sense of how 
frameworks work:

1. Copy the following code: 
   `<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">` 
   This code tells the browser that you want to use Bootstrap's stylesheet.
1. In the `contact.html` file, paste the code directly under the `</style>` tag. 
   Make sure the link is under the the internal spreadsheet. 
   Now, you have told the browser to link Bootstrap's stylesheet to your content.
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


### Use Bootstrap CSS

When you use CSS frameworks, you may come across CSS components that are different than basic CSS rulesets. For example, Bootstrap relies on HTML **classes** to apply rulesets to elements:

1. Copy this code: `class="jumbotron jumbotron-fluid"`
1. Go to **the editor tab**.
1. In `index.html`, paste the code you copied into the `<header>` tag. This tells the browser that the `<header>` tag should have the attributes of a jumbotron, which tells Bootstrap to apply a certain ruleset to the tag.
1. Go to the **live tab**. Now, there is a big gray box around the elements that were in the `<header>` tag.
1. Go back to the **editor tab**.
1.  In `contact.html`, paste the code you copied into the `<header>` tag. Now, the `contact.html` page has the same formatting as `index.html`.
1. Go back to the **live tab**.
1. Click the **Contact** link to go to the contact page. The contact page has the same formatting as the home page.

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


HTML classes are another pattern you can use as a CSS selector for rulesets. However, if you used the `jumbotron` class in a file that didn't link to Bootstrap, nothing would happen unless you defined a ruleset for the class in a style or stylesheet.

---


## CSS with Devtools {: #css-dev }



### Inspect element review {: #inspect }

The **Inspect Element** feature allows for easy access to the Elements Panel, 
where the DevTools CSS tools lie. Here's a quick refresher on how to do that: 

1. Right click on the sidebar you created in the *Use Bootstrap CSS* section.

`(TODO: A screenshot showing someone right clicking on the sidebar.)`

2. Choose the **Inspect** option. The Elements Panel appears.

`(TODO: A screenshot showing the Elements Panel.)`




### The Styles Pane and the Box Model {: #styles-pane }

In the last tutorial, you looked at the DOM Tree in the Elements Panel. 
However, now you'll be focusing on the styles pane, 
located on the bottom of the Elements Panel. 
In this pane, you'll see two things: 
a readout of the selected element's CSS, and a Box Model Diagram.

`(TODO: A screenshot showing the styles pane and the BMD.)`



The box model states that a browser renders each HTML element as a box whose 
properties can be edited by CSS rulesets. 
Each box has four elements: content, padding, border, and margin. 
While this might seem complicated, 
a quick example will help you understand this CSS fundamental.

Note: Before you start this example, 
make sure you are viewing the CSS for `main`. 
It should be highlighed.

1. Double click on the first 5 in the padding box and replace the 5 with 50. 
You should see a change in the space around the content inside the sidebar.

`(TODO: A screenshot showing someone doing that action.)`

2. Repeat this for the other 5s in the padding box.

`(TODO: A screenshot showing the finished padding box.)`

3. Double click on the first dash in the margin box. Type in the number 10. 
You should see a change in the space around the sidebar.

`(TODO: A screenshot showing someone doing that action.)`

4. Repeat this for the other spaces in the margin box.

`(TODO: A screenshot showing the finished margin box.)`

5. Double click on the #_ in the blue box and change it to 800. 
The size of the sidebar will change.

`(TODO: A screenshot showing someone doing that action.)`

6. You may have noticed that an inline stylesheet 
was added to `main`. Copy every CSS declaration after `style="`.

`(TODO: A screenshot showing someone doing that action.)`

7. Paste the CSS in the `main` section of `style.css`.

The box model diagram is useful for editing the size and spacing of your HTML elements.


### Change Colors {: #colors }

The Styles Pane in DevTools can also be used to change 
the colors of elements on your web page. 

Note: CSS colors come in several forms, including RGB, Hex, 
and HTML Safe Color codes. 
For the following examples, you will be using hex colors. 
See [this resource](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value) for more information.

Since your website is mostly white and gray, 
it would be nice to add a pop of color to the top of the website:

1. Go to the viewing tab. 
2. In the Elements Panel, click on `<header>` to highlight it.

`(TODO: A screenshot showing someone doing that action.)`

3. In the part of the Styles Pane that says **header{}**, 
type `background-color: #c0d8e5`. 

`(TODO: A screenshot showing someone doing that action.)`

4. Copy the new `<header>` CSS and paste it into style.css.

`(TODO: A screenshot showing the result.)`

The color is now changed!

You can also change the color of an existing style definition 
by doing the following:

1. Click on the arrow next to the nav `<div>` to reveal the elements in it.

	`(TODO: A screenshot showing someone doing that action.)`

2. Click on the `<ul>` tag to highlight it.

	`(TODO: A screenshot showing someone doing that action.)`

3. Click on the gray square before the `background-color` code.
4. A menu pops up with several options to change the color.

	`(TODO: A screenshot showing the menu.)`

For now, click on the box color code and replace the current code with #c0d8e5.

5. Copy the code from the Styles Pane and paste it in the `ul{}` section in style.css.

`(TODO: A screenshot showing the result.)`

### Change Behavior (sort of) {: #behavior }

One thing you might notice about many websites 
is that links and buttons will change colors 
when you hover over them with your mouse. 
This is a CSS property called a pseudostate, 
which defines a special state of an element.

Changing a element's pseudostate is just as easy a changing an element's color:

1. Click on the first `<li>` tag inside the nav `<div>`. 

	`(TODO: A screenshot showing someone doing that action.)`

2. In the Styles Pane, click the gray plus in the center of the pane.

`(TODO: A screenshot showing someone doing that action.)`

3. Type `:hover` after li in the newly created style.

`(TODO: A screenshot showing someone doing that action.)`

4. In the new `li:hover{}` section, type `background-color: gray;`.

`(TODO: A screenshot showing someone doing that action.)`

5. Hover over the Home and Contact links to see the changes.

`(TODO: A screenshot showing the result.)`

6. Copy the code from the Styles Pane and paste it at the end 
  of the `li a` section in style.css.

Note: This behavior is *not* the same as having an event occur
when you click on a button. 
For that, you will need to utilize JavaScript, a different language.

You've successfully made yourself a much more polished website!

## Next Steps {: #next-steps }

Now that you've got HTML and CSS down, there's one more language you'll need
to put in your web development toolkit: JavaScript. Soon, there will be a
tutorial that will focus on how DevTools can help you create and fix your
JavaScript code.

## Feedback {: #feedback }
{% include "web/_shared/helpful.html" %}
