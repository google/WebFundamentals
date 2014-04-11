---
layout: article
title: "Getting Started"
description: ""
---
The web is accessible on a huge range of devices from small-screen phones 
through to huge screen televisions.  Each device presents its own unique 
benefits and also constraints and as a web developer you are expected to support 
all ranges of devices.

Building for multi-screen experiences is not as hard as it sounds. In this 
guide, we are going to create a simple landing page that shows you the basics of 
how to build using "Mobile First"(link to mobile first) design principles that 
will enable you to easily scale your experiences up from a mobile device through 
to a TV.  We will show you best practices for interacting with touch and mice, 
structuring your content across screen sizes.

Our goal in this guide is to build an example product landing page for our 
hypothetical Smiles product.  The end result will be a fully functioning page 
that covers many of the core prinicples of building experiences that work well 
across all different device types.

# Set up development workspace

Great news.  There is no need to set anything up.  You just need a text editor 
and 15 minutes to read this guide.

If you don't know what text editor to use here are some that we use:

* Textmate
* Sublime text
* Vim

We recommend that you have a device available to hand to be able to test your 
experiences on, however if you haven't got one this is not a problem there are 
tools that you can use to help you along the way.

# Create first multi-screen page

{% class key-takeaway %}  
**Key ****Takeaways**

* All pages must include a viewport and make sure it has the recommended 
  configuration.

{% endclass %}

Even for a basic page you must include a viewport meta tag.  The viewport is the 
most critical[link to viewport doc] component you need for building mobile-first 
experiences.  Without it, your site will not work well on a mobile device.  

    <!doctype html>
    <html>
      <head>
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>My first page</title>
      </head>
      <body>
        <h1>My first page</h1>
        <p>This is easy</p>
      </body>
    </html>

The viewport indicates to the browser that the page needs to be scaled to fit 
the screen, as such there  are a lot of configurations that you can specify for 
your viewport.  The one we recommend is:

<meta name="viewport" content="width=device-width, initial-scale=1.0">

This works well across all mobile and tablet devices and orientations as it 
tells the page to fit.....

# Test your page

{% class key-takeaway %}  
**Key Takeaways**

* Set up your environment to be able to easily test
* Use Chrome Dev Tools
{% endclass %}

Testing your page is one of the most important things you can do to ensure you 
offer a great experience across all the devices your user will access your 
content on. There are a number of tools that you can use in each browser that 
can help you.  Firefox has its inspector [link], IE has it's DevTools and Chrome 
has Developer tools.

We are going to concentrate on using Chrome Developer tools in this guide.  The 
Chrome Devtools let you inspect any aspect of a web-page in real-time and also 
make changes on the fly.  It also has mobile emulation built in so that you can 
rapidly test your layouts across a huge number of screen sizes without the need 
to touch a mobile device.

[todo: insert animated fit]

1. Find your page
1. Open the inspector
1. Goto emulation
1. Pick your device and refresh the page.

Using this flow really helps you in the early stages of your project as you can 
quickly see how it would look across devices.

If you have  real device even better, you can ... [todo]

# Flesh out the page with content

{% class key-takeaway %}  
**Key Takeaways**

* Before you start, understand the content you need to display (text, images, 
  tables and videos) 
* Start with the narrow viewport first (in many cases a mobile device) - often 
  this is called Mobile first development
{% endclass %}

Especially for sites, we believe that the content is the most important aspect.  
So let's design for the content and not let the design dictate the content.  In 
this lesson we will present a simple linear layout using Micro-reflow[link] 
concepts.

In this site, we have identified the need for a header that describes our 
product "Smiles", a form to collect information about the user.  We also need to 
show users that Smiles are great, so adding images and tables of data is an 
absolutely necessity.

Now that we know the content we will create, lets create our structure for the 
content.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>TODO: CODE</td>
</tr>
</table>

Like every site, we will have a lot of users who require assistive technology 
such as screen readers to use a site.  It is easy to get started with making 
sure our sites are accessible to all users.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>TODO: CODE</td>
</tr>
</table>

## Create a great form

{% class key-takeaway %}  
**Key ****Takeaways**

* Use labels to let the user quickly focus on the field
* Use placeholders to give an indication about the data to enter in the field
* Use common names to help the user auto fill their forms
* Use semantic types to help the user enter data quickly
{% endclass %}

We are creating a product landing page so it makes sense to be able to let the 
user pass us some of their details.

In the heading area we will create a section for the form.  It will be a simple 
form that collects the users names, their phone number and a good time to call 
them back.

We will add labels and placeholders to make it easy for users to focus elements, 
understand what is supposed to go in them and to also help accessibility tools 
understand the structure of the form.  The name attribute not only sends the 
form value to the server it is also used to give important hints to the browser 
about how to automatically fill the form for the user. 

[You can learn more]

We will add semantic types to make it quick and simple for users to be able to 
enter content on a mobile device.  For example when entering a telephone number 
the user should just see a dial pad.

    <form method="post" id="register"> 
         <h2>Sign up for more smiles</h2>
         <label for="name">Name</label>
         <input type="text" name="name" id="name" placeholder="Thomas A Anderson" required />
         <label for="email">Email address</label>
         <input type="email" name="email" id="email" placeholder="neo@example.com" required />
         <label for="tel">Telephone</label>
         <input type="tel" name="tel" id="tel" placeholder="(555) 555 5555" required />
         <label for="time">Best time to contact</label>
         <input type="time" name="time" id="time" placeholder="4pm" required />
         <input type="submit" value="Sign up">
    </form>

We have a more detailed guide to creating amazing forms in our forms tutorial.

Link to request AutoComplete

## Add images to site

{% class key-takeaway %}  
**Key ****Takeaways**

* Use the highest DPI possible for your source
* Each source image should be made for 2x DPI and 1x DPI
* Highly compress all your images

<!-- TODO: Fix formatting of cells -->
<table>
</table>

{% endclass %}

Sites without images can be a little boring.  There are two types of images:  
Content images and background images.  Content images are images that are inline 
in the document and are used to convey extra information about the content.  
Stylistic images are often used to make the site look better, often these are 
background images, patterns and gradients.

### Adding Stylistic images

[TODO]

### Adding Content Images

so lets add some in.

    <div id="images">
      <img src="">
      <img src="">
      <img src="">
      <img src="">

</div>

## Add a video to your site

{% class key-takeaway %}  
**Key ****Takeaways**

* Use the highest DPI possible for your source
* Each source image should be made for 2x DPI and 1x DPI
* Highly compress all your images
{% endclass %}

Videos are often used to describe content in a more interactive manner and are 
often used to show a demonstration of a product or a concept.  It can be hard to 
get them correct unless you know the best practices.

Lets add a video to the site.

    <div id="producttour">
       <video src=""></video>
    </div>

# Make your page responsive

{% class key-takeaway %}  
**Key Takeaways**

* Always start with a narrow viewport first and scale out
* Base your breakpoints off when you need to adapt the content
* Create a high-level vision of your layout across major breakpoints
{% endclass %}

Our page has all the content needed, but on different screen sizes it looks a 
little bland as we have simply created a linear site for a narrow viewport. 

We are using the principles of Mobile First web development, that is we start 
with a narrow viewport and build for that experience and then we make our 
viewport wider like you would start to expect to see on a tablet, desktop and 
TV.  At each point where the content doesn't look right we will add a 
breakpoint.

A breakpoint is a point in your design where you alter the layout in CSS to 
accomodate the screen dimensions.

To learn more about Micro-reflows see [link]

Choose breakpoints (where the content and styles change) based on your content.  
Using devices or basing it on traffic to existing sites can get very messy

Instead choose your breakpoints based on when the content needs flow to cater 
for the screen real-estate.

To make our page responsive we use media queries to allow us to group styles 
based on factors such screen width or viewport width.

