project_path: /web/_project.yaml
book_path: /web/ilt/pwa/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 2017-02-24T20:02:49Z #}
{# wf_published_on: 2016-01-01 #}


# Lab: Responsive Design {: .page-title }




<div id="overview"></div>


## Overview




This lab shows you how to style your content to make it responsive. 

#### What you will learn

* How to style your app so that it works well in multiple form factors
* How to use Flexbox to easily organize your content into columns
* How to use media queries to reorganize your content based on screen size

#### What you should know

* Basic HTML and CSS

#### What you will need

* Computer with terminal/shell access
* Connection to the internet
* Text editor

<div id="1"></div>


## 1. Get set up




If you have not downloaded the repository, installed Node, and started a local server, follow the instructions in [Setting up the labs](setting-up-the-labs).

Open your browser and navigate to __localhost:8080/responsive-design-lab/app__.



Note: If you have installed a service worker on localhost before, <a href="tools-for-pwa-developers#unregister">unregister it</a> so that it doesn't interfere with the lab. 



If you have a text editor that lets you open a project, open the __responsive-design-lab/app__ folder. This will make it easier to stay organized. Otherwise, open the folder in your computer's file system. The __app__ folder is where you will be building the lab. 

This folder contains:

* __index.html__ is the main HTML page for our sample site/application
* __modernizr-custom.js__ is a feature detection tool that simplifies testing for Flexbox support
* __styles/main.css__ is the cascading style sheet for the sample site

Return to your browser. Try resizing the window and notice that the content doesn't respond well. Our goal in this lab is to fix this.

<div id="2"></div>


## 2. Set the visual viewport




Replace TODO 2 in <strong>index.html</strong> with the following tag: 

#### index.html

```
<meta name="viewport" content="width=device-width, initial-scale=1">
```

#### Explanation

A meta viewport tag gives the browser instructions on how to control the page's dimensions and scaling. The `width` property controls the size of the viewport. It can be set to a specific number of pixels (for example, `width=500`) or to the special value `device-width,` which is the width of the screen in CSS pixels at a scale of 100%. (There are corresponding `height` and `device-height` values, which can be useful for pages with elements that change size or position based on the viewport height.)

The initial-scale property controls the zoom level when the page is first loaded. 

#### For more information

*  [Set the viewport](/web/fundamentals/design-and-ui/responsive/fundamentals/set-the-viewport) - Responsive Web Design Basics 
*  [Using the viewport meta tag to control layout on mobile browsers](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag) - MDN

<div id="3"></div>


## 3. Style the page




Replace TODO 3 in <strong>styles/main.css</strong> with the following CSS code:

#### styles/main.css

```
body {
    font-family: Verdana, sans-serif;
    font-size: 100%; /* Base Font Size */
    line-height: 1.4; 
}

h1 {
    font-family: cursive;
    font-size: 4rem;
}

h2 {
    font-family: cursive;
    font-size: 2.5rem;
}

.container {
    margin: 0 3rem;
    overflow: hidden;
}
```

To test your content, save the code and refresh __index.html__ in your web browser. The fonts should be stylized and there should be space in the margins.

#### Explanation

While all the other values in the stylesheet are and will be written using rems and other  [font-relative length units](https://developer.mozilla.org/en-US/docs/Web/CSS/length#Font-relative_lengths), we use 100% as our base font size. This is the default in most, if not all, browsers and takes into account any changes the user may have made to the default font size on their browsers.

<div id="4"></div>


## 4. Using web fonts




### 4.1 Include Google web fonts

Replace TODO 4.1 in <strong>index.html</strong> with the following tag: 

#### index.html

```
<link href="https://fonts.googleapis.com/css?family=Lobster|Raleway:400,400i"rel="stylesheet">
```

#### Explanation

This loads two web fonts,  *Lobster*  and  *Raleway* , from Google Fonts. 



Note: Loading fonts like this increases the load time of your page and may cause strange visual effects for your users when the font finishes loading and takes over from the fallback font. See <a href="/web/fundamentals/performance/critical-rendering-path/render-blocking-css">Render blocking CSS</a> in Web Fundamentals for more information on this and other elements that block rendering of your web content. 



### 4.2 Apply web fonts to the page

Replace the existing rules in <strong>styles/main.css</strong> with the following code that includes the <em>Lobster</em> and <em>Raleway</em> fonts:

#### main.css

```
body {
    font-family: Raleway, Verdana, sans-serif;
    font-size: 100%; 
    line-height: 1.4; 
}

h1 {
    font-family: Lobster, cursive;
    font-size: 4rem;
}

h2 {
    font-family: Lobster, cursive;
    font-size: 2.5rem;
}

.container {
    margin: 0 3rem;
    overflow: hidden;
}
```

Save the file and refresh __index.html__ in your browser. The fonts should be different.

In __styles/main.css__, try the following experiments:

* Change the value of `line-height` in the body element. Does it make the text look different?
* Change the value of margin in `.container` from `0 3rem` to `0 6rem` (space is intentional). How does it change the way the text looks?
* In __index.html__, comment out the link to __styles/main.css__. How different does your site look?

<div id="5"></div>


## 5. Using responsive layout




### 5.1 Organize content into divs

To complete TODO 5.1 in <strong>index.html</strong>, uncomment each `div` in the body. There should be three <code>div</code> entries with <code>class="col"</code>.

### 5.2 Add first responsive layout

Replace TODO 5.2 in <strong>styles/main.css</strong> with the following code:

#### main.css

```
.container .col {
    width: 27%;
    padding: 30px 3.15% 0;
    float: left;
    margin-bottom: -999px;
    padding-bottom: 999px;
}

.container .col:nth-child(1) {
    margin-left: 33.3%; 
    background: #eee;
}

.container .col:nth-child(2) {
    margin-left: -66.3%;
    background: #eee;
}

.container .col:nth-child(3) {
    left: 0;
    background: #eee; 
}

.container p {
    margin-bottom: 30px;
}
```

To test the new layout, save the file and refresh __index.html__ in your browser. The page should display in a 3-column layout.

#### Explanation

Here we give the first div a `margin-left` of 33.3%. This places the first `div` in the center of the page, because each of the three `div`s takes up a third of the page. We pull the second `div` to the left by 66.3% (see the link in __For more information__ below), placing it on the far left. The last column is pushed to the right.



Note: We give the columns positive <code>padding-bottom</code> and negative <code>margin-bottom</code> values that cancel out in order to push the bottom border of the columns out by <code>999px</code>. This stretches the column backgrounds to the bottom of the screen (see <strong>For more information</strong> below). 



#### For more information

*  [The Definitive Guide to Using Negative Margins](https://www.smashingmagazine.com/2009/07/the-definitive-guide-to-using-negative-margins/) - Smashing Magazine
*  [Negative Margin, Positive Padding](https://pankajparashar.com/posts/negative-margin-positive-padding/)

#### Solution code

The solution code can be found in the __05-2-responsive-layout__ directory.

<div id="6"></div>


## 6. Using Flexbox




The  [Flexible Box Layout Module](https://www.w3.org/TR/css-flexbox-1/) (Flexbox) is a way of structuring layouts in CSS.

### 6.1 Comment out .container rules in CSS

Now in <strong>styles/main.css</strong>, comment out all rules that start with <code>.container</code> by wrapping them in `/*` and `*/`. We will make these our fallback rules for when Flexbox is not supported in the  [Flexbox as progressive enhancement](#7) section.

### 6.2 Add Flexbox layout

Flexbox lets us get a similar result as step 5 (with some improvements), but with a fraction of the code.

In <strong>styles/main.css</strong> replace TODO 6.2 with the following code:

#### main.css

```
.container {
  display: -webkit-box;  /* OLD - iOS 6-, Safari 3.1-6 */
  display: -ms-flexbox;  /* TWEENER - IE 10 */
  display: flex;         /* NEW, Spec - Firefox, Chrome, Opera */
  margin: 3rem;
  overflow: hidden;
}

.container .col {
  flex: 1;
  padding: 1rem;
}
```

Save the code and refresh __index.html__ in your browser. If you make your browser window narrower, the columns grow thinner until only one of them remains visible. We'll fix this with media queries in the next exercise.

#### Explanation

The first rule defines the `div` with the `container` class as the flex container. It enables a flex context for all its direct children. We are mixing old and new syntax for including Flexbox to get broader support (see __For more information__ for details).

The second rule uses the `.col` class to create our equal width flex children.

#### For more information

*  [CSS Flexible Box Layout Module Level 1](https://www.w3.org/TR/css-flexbox-1/) - W3C
*  [A Complete Guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - CSS Tricks
*  [What CSS to prefix?](http://shouldiprefix.com/#flexbox)
*  [Using Flexbox](https://css-tricks.com/using-flexbox/) - CSS Tricks

### 6.3 Use media queries with Flexbox

In <strong>styles/main.css</strong>, replace TODO 6.3 with the code below:

#### main.css

```
@media screen and (max-width: 48rem) {
    .container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-flow: column;
    }

    .container .col:nth-child(1) {
        order: 1;
        color: rebeccapurple;
    }

    .container .col:nth-child(2) {
        order: 3;
        color: slategrey;
    }

    .container .col:nth-child(3) {
        color: cornflowerblue;
        order: 2;
    }
}
```

Save the code and refresh __index.html__ in your browser. Now if you make the browser window very narrow, the content reorganizes into one column.

#### Explanation

To make sure that the text is readable we use a media query when the browser's width becomes 48rem (768 pixels at browser's default font size or 48 times the default font size in the user's browser).

When the media query is triggered we change the layout from horizontal to vertical by changing the `flex-flow` property from `row` to `column`. 

We've also used the media query to play with placements of the columns (rows) and add color to the text based on the position it appears in the document. This __does not__ change the  `div` order in the DOM or the way the content is read by assistive technology. 

<div id="7"></div>


## 7. Using Flexbox as a progressive enhancement




As Flexbox is a relatively new technology, we should include fallbacks in our CSS.

### 7.1 Add Modernizr

Modernizr is a feature detection tool that simplifies testing for Flexbox support.

Replace TODO 7.1 in <strong>index.html</strong> with the code to include the custom Modernizr build:

#### index.html

```
<script src="modernizr-custom.js"></script>
```

#### Explanation

We include a  [Modernizr build](https://modernizr.com/download) at the top of __index.html__, which tests for Flexbox support. This runs the test on page-load and appends the class `flexbox` to the <code>&lt;html&gt;</code> element if the browser supports Flexbox. Otherwise, it appends a `no-flexbox` class to the <code>&lt;html&gt;</code> element. In the next section we add these classes to the CSS.



Note: If we were using the <code>flex-wrap</code> property of Flexbox, we would need to add a separate Modernizr detector just for this feature. Older versions of some browsers partially support Flexbox, and do not include this feature.



### 7.2 Use Flexbox progressively

Let's use the `flexbox` and `no-flexbox` classes in the CSS to provide fallback rules when Flexbox is not supported.

Now in <strong>styles/main.css</strong>, add <code>.no-flexbox</code> in front of each rule that we commented out in step 6.1 and uncomment them:

#### main.css

```
.no-flexbox .container {
    margin: 0 3rem;
    overflow: hidden;
}

.no-flexbox .container .col {
  width: 27%;
  padding: 30px 3.15% 0;
  float: left;
  margin-bottom: -999px;
  padding-bottom: 999px;
}

.no-flexbox .container .col:nth-child(1) {
    margin-left: 33.3%;
    background: #eee;
}

.no-flexbox .container .col:nth-child(2) {
    margin-left: -66.3%;
    background: #eee;
}

.no-flexbox .container .col:nth-child(3) {
    left: 0;
    background: #eee;
}

.no-flexbox .container p {
    margin-bottom: 30px;
}
```

In the same file, add <code>.flexbox</code> in front of the rest of the rules that start with <code>.container</code>:

#### main.css

```
.flexbox .container {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  margin: 3rem;
  overflow: hidden;
}

.flexbox .container .col {
  flex: 1;
  padding: 1rem;
}

@media screen and (max-width: 48rem) {
    .flexbox .container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        flex-flow: column;
    }

    .flexbox .container .col:nth-child(1) {
        order: 1;
        color: rebeccapurple;
    }

    .flexbox .container .col:nth-child(2) {
        order: 3;
        color: slategrey;
    }

    .flexbox .container .col:nth-child(3) {
        color: cornflowerblue;
        order: 2;
    }
}
```

Save the code and refresh __index.html__ in the browser. The page should look the same as before. If you have a  [browser that doesn't support Flexbox](http://caniuse.com/#search=flexbox), you can test the fallback rules by opening __index.html__ in that browser.

#### For more information

*  [Migrating to Flexbox](https://www.sitepoint.com/migrating-flexbox-cutting-mustard/) - Cutting the Mustard
*  [Modernizr Documentation](https://modernizr.com/docs)

<div id="8"></div>


## Congratulations!




You have learned to style your content to make it responsive. Using media queries, you can change the layout of your content based on the window or screen size of the user's device.

### What we've covered

* Setting the visual viewport
* Web fonts
* Flexbox
* Media queries

### Resources

#### Learn more about the basics of responsive design

*  [Responsive Web Design Basics - Set the viewport](/web/fundamentals/design-and-ui/responsive/#set-the-viewport) 
*  [A tale of two viewports](http://www.quirksmode.org/mobile/viewports2.html)

#### Learn more about Flexbox as a progressive enhancement

*  [Progressive Enhancement: Start Using CSS Without Breaking Older Browsers](http://blog.formkeep.com/progressive-enhancement-start-using-css-without-breaking-older-browsers/)
*  [Migrating to Flexbox by Cutting the Mustard](https://www.sitepoint.com/migrating-flexbox-cutting-mustard/)
*  [Modernizr](https://modernizr.com/)

#### Learn about libraries for responsive CSS

*  [Bootstrap](http://getbootstrap.com/)
*  [Sass](http://sass-lang.com/)
*  [Less](http://lesscss.org/)
*  [Material Design](https://material.google.com/)

#### Learn more about using media queries

*  [Using Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries) 


