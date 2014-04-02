---
layout: article
title: "Getting Started"
description: ""
---

{% comment %}
NOTE: Within each section, articles should be in defined order
(newest on top).
{% endcomment %}

# {{page.title}}

{% for article in page.articles.getting-started %}
   {{article.title}} <br />
{% endfor %}

Building for multi-screen experiences is not as hard as it sounds. In this 
guide, we are going to create a simple landing page that shows you the basics of 
how to build using "Mobile First"(link to mobile first) design principles that 
will enable you to easily scale your experiences up from a mobile device through 
to a TV.  We will show you best practices for interacting with touch and mice, 
structuring your content across screen sizes.

Our goal in this guide is to build a product landing page for our new Smiles 
product.

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

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Key Learnings
Use a viewport with the correct configuration</td>
</tr>
</table>

It is really simple.  We create a basic page and add a "viewport".  The viewport 
is the most critical[link to viewport doc] component you need for building 
mobile-first experiences.  Without it, your site will not work well on a mobile 
device.

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

There are a lot of configurations that you can specify for your viewport.  The 
one we recommend is:

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><meta name="viewport" content="width=device-width, initial-scale=1.0"></td>
</tr>
</table>

This works well across all mobile and tablet devices and orientations.

# Test your page

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Key Learnings
</td>
</tr>
</table>

Testing your page is one of the most important things you can do to ensure you 
offer a great experience across all the devices your user will access your 
content on. There are a number of tools that you can use in each browser that 
can help you.  Firefox has its inspector [link], IE has it's DevTools and Chrome 
has Developer tools.

We are going to concentrate on using Chrome Developer tools in this guide.

1. Find your page
1. Open the inspector
1. Goto emulation
1. Pick your device and refresh the page.

Using this flow really helps you in the early stages of your project as you can 
quickly see how it will look across devices.  

If you have  real device even better, you can ... [todo]

# Flesh out the page with content

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Key Learnings
</td>
</tr>
</table>

Especially for sites, we believe that the content is the most important aspect 
of any site.  So let's design for the content and not let the design dictate the 
content.

Lets create our structure for the content.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>TODO: CODE</td>
</tr>
</table>

Lets add in some accessibility features to help users that need to use assistive 
technology.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>TODO: CODE</td>
</tr>
</table>

As you can see, it is just content, it is not interactive and it doesn't scale 
across devices yet.

## Create a great form

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Key Learnings
Use labels to let the user quickly focus on the field
Use placeholders to give an indication about the data to enter in the field
Use common names to help the user auto fill their forms
Use semantic types to help the user enter data quickly</td>
</tr>
</table>

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

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><form method="post" id="register"> 
     <h2>Sign up for more smiles</h2>
     <label for="name">Name</label>
     <input type="text" name="name" id="name" placeholder="Thomas A Anderson" />
     <label for="email">Email address</label>
     <input type="text" name="email" id="email" placeholder="neo@example.com"/>
     <label for="tel">Telephone</label>
     <input type="text" name="tel" id="tel" placeholder="(555) 555 5555"/>
     <label for="time">Best time to contact</label>
     <input type="text" name="time" id="time" placeholder="4pm"/>
     <input type="submit" value="Sign up">
</form></td>
</tr>
</table>

Every field is mandatory so we will add the required attribute 

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><form method="post" id="register"> 
     <h2>Sign up for more smiles</h2>
     <label for="name">Name</label>
     <input type="text" name="name" id="name" placeholder="Thomas A Anderson" required />
     <label for="email">Email address</label>
     <input type="text" name="email" id="email" placeholder="neo@example.com" required />
     <label for="tel">Telephone</label>
     <input type="text" name="tel" id="tel" placeholder="(555) 555 5555" required />
     <label for="time">Best time to contact</label>
     <input type="text" name="time" id="time" placeholder="4pm" required />
     <input type="submit" value="Sign up">
</form></td>
</tr>
</table>

We will add semantic types to make it quick and simple for users to be able to 
enter content on a mobile device.  For example when entering a telephone number 
the user should just see a dial pad.

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td><form method="post" id="register"> 
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
</form></td>
</tr>
</table>

We have a more detailed guide to creating amazing forms in our forms tutorial.

# Make your page responsive

<!-- TODO: Fix formatting of cells -->
<table>
<tr>
<td>Key Learnings
</td>
</tr>
</table>

Our page right now is very plain.  I can't imagine anyone buying anything from 
this site.

Many developers choose their breakpoints (where the content and styles change) 
based on traffic to existing sites, i.e, I will create styles for an iPhone, 
Nexus 7 and Desktop.  **This is the wrong way to do it**.  Speaking from 
experience you will be constantly battling with your styles as new screen sizes 
and form-factors come into the market.

Instead choose your breakpoints based on when the content needs flow to cater 
for the screen real-estate.

To make our page responsive we use media queries to allow us to group styles 
based on factors such screen width or viewport width.

    style.css

    index.html
    <!doctype html>
    <html>
      <head>
         <meta name="viewport" content="width=device-width">
         <title>My second page</title>
      </head>
      <body>       
        <div id=headline>
          <h1>Widgets Incorporated</h1>
          <p>Some blurb.</p>
          <form action="POST" method="#">  <!--  to the side -->
          </form>
        </div>

        <div id="section1">
          <h2>Section 1</h2>
          <ul>
    	  <li>We aim to be the best</li>
      <li>never bettered</li>
          </ul>
        </div>

        <div id="section2">
          <h2>Section 2</h2>
          <img src="">
          <p></p>
        </div>

        <div id="section3">
          <h2>Section 3</h2>
          <table>
            <tr></tr>
      <tr></tr>
      <tr></tr>
          </table>
        </div>

        <div id="footer">

        </div>
      </body>

</html>

## Add images to site

TBD.

## Background images

    <body>       
        <div id=headline>
          <!-- add a background image -->
          <h1>Widgets Incorporated</h1>
          <p>Some blurb.</p>
          <form action="POST" method="#">  <!--  to the side -->
          </form>
        </div>

        <div id="section1">
          <h2>Section 1</h2>
          <ul>
    		<li>We aim to be the best</li>
    <li>never bettered</li>
          </ul>
        </div>

        <div id="section2">
          <h2>Section 2</h2>
          <img src="">
          <p></p>
        </div>

        <div id="section3">
          <h2>Here is some data we want to show you</h2>
          <table>
            <tr></tr>
      <tr></tr>
      <tr></tr>
          </table>
        </div>

        <div id="footer">

        </div>
      </body>

</html>

## Content images

TBD.

# Add a video to your site

TBD.

# Get user input

TBD.

# Respond to touch

TBD.


