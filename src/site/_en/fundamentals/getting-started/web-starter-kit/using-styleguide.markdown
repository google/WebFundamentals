---
layout: article
title: "Using the Web Starter Kit Style Guide"
description: ""
introduction: ""
notes:
article:
  written_on: 2014-04-17
  updated_on: 2014-04-23
  order: 3
id: using-wsk-styleguide
#collection: web-starter-kit
rel:
  gplusauthor: https://plus.google.com/+MattGaunt
  twitterauthor: "@Gauntface"
key-takeaways:
---

{% wrap content %}

{% include modules/toc.liquid %}

## Making the Most of the Styleguide

Web Starter Kit comes with a styleguide which is a quick and easy way to view
all the styles your site can use.

Go and check it out by running `gulp serve` and clicking the styleguide link

The reason we've included a styleguide, is that by thinking of your CSS in
a generic way and breaking up your styles and classes into components, you
get a clean structure for your styles and you can how all your components look
when placed together.

### Viewing the Styleguide HTML

To see what HTML and class names are needed to add an element to your HTML page
you can click the 'Toggle Code Snippets' button at the top of the page.

![Showing Where on the Web Starter Kit Styleguide the Toggle Code Snippets
Button Is](images/wsk-code-sample-toggle.jpg)

After which you'll see a code example below each element with example HTML
that you can copy, paste and alter into your normal pages.

![Example of the Web Starter Kit Code Snippets](images/wsk-styleguide-code-snippets.jpg)

## Extending the Styleguide

Whenever you are creating a new element for your site and it's going to appear
across your site is various places, then it's be a prime candidate for adding it
to the Styleguide.

### The Steps

1. Open *app/styleguide/index.html* and just after the last element, add the HTML
   for your new element.

   In this example let's add a footer element and swap out the old footer with the
   back to top link

2. Inside *app/styles/components/* create a new Sass file with an appropriate
   name for your component.

   Here we'll create _footer.scss and add some really basic styles to get us
   started.

       .Footer {
           background-color: #404040;
       }


   The underscore in the filename *_footer.scss* indicates that the file is
   designed to be imported, rather than be used to create a separate CSS file
   and your filename should be the same.

3. Open *app/styles/components.scss* and at the bottom of the file, import your
   new Sass file like so.

       // New Styles
       @import "_components/_footer";

4. Test out how it looks on localhost:<Port Number>/styleguide/ and make sure
   it's working, if it is then add feel free to add some more styles if you
   want to.

       .Footer {
         height: 180px;

         color: white;
         background-color: #404040;

         a {
           text-decoration: none;
           color: white;
         }
       }

5. Use it in your pages, maybe add a title and link to the element at the top
   of the page.

       // Footer Link
       <li class="summary-header__anchors-item"><a href="#footer">Footer</a></li>

       .......

       // Footer Title
       <div class="container">
          <a name="footer"></a>
          <h2 class="subsection-title"><strong class="subsection-number">#21</strong> Footer</h2>
       </div>
       <footer class="Footer">
         <div class="container">
           <p><a href="#"><i class="icon icon-chevron-up"></i> Back to top</a></p>
         </div>
       </footer>

6. Done :)

    ![A new footer for the Web Starter Kit styleguide](images/wsk-footer.jpg)

Once you've altered the Styleguide, run `gulp` or `gulp serve` and the styleguides
Sass will be compiled down into CSS for you and included in any page which has
the components.css file inside it (like the *app/index.html* file).

    <!-- build:css styles/components/main.min.css -->
    <link rel="stylesheet" href="styles/h5bp.css">
    <link rel="stylesheet" href="styles/components/components.css">
    <link rel="stylesheet" href="styles/main.css">
    <!-- endbuild -->

{% include modules/nextarticle.liquid %}

{% endwrap %}
