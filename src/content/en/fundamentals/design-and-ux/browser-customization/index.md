project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Modern browsers make it easy to customize certain components, like icons, the address bar color, and even add things like custom tiles. These simple tweaks can increase engagement and bring users back to your site.


{# wf_updated_on: 2015-09-21 #}
{# wf_published_on: 2015-09-21 #}

# Icons & Browser Colors {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Modern browsers make it easy to customize certain components, like icons, the address bar color, and even add things like custom tiles. These simple tweaks can increase engagement and bring users back to your site.


## Provide great icons & tiles 

When a user visits your webpage, the browser tries to fetch an icon from the HTML. The icon may show up in many places, including the browser tab, recent app switch, the new (or recently visited) tab page, and more.

Providing a high quality image will make your site more recognizable, making it
easier for users to find your site. 

To fully support all browsers, you'll need to add a few tags to the `<head>`
element of each page.


    <!-- icon in the highest resolution we need it for -->
    <link rel="icon" sizes="192x192" href="icon.png">
    
    <!-- reuse same icon for Safari -->
    <link rel="apple-touch-icon" href="ios-icon.png">
    
    <!-- multiple icons for IE -->
    <meta name="msapplication-square310x310logo" content="icon_largetile.png">
    

### Chrome & Opera

Chrome and Opera uses `icon.png`, which is scaled to the necessary size by 
the device. To prevent automatic scaling, you can also provide additional 
sizes by specifying the `sizes` attribute.


Note: Icons sizes should be based on 48px, for example 48px, 96px, 144px and 192px

### Safari

Safari also uses the `<link>` tag with the `rel` attribute: `apple-touch-icon`.

You can specify [explicit sizes](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix.html#//apple_ref/doc/uid/TP40006556-CH27) 
by providing a separate link tag for each icon, preventing the OS from 
having to resize the icon:


    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    

### Internet Explorer & Windows Phone

Windows 8's new home screen experience supports four different layouts for 
pinned sites, and requires four icons. You can leave out the relevant meta 
tags if you don't want to support a specific size.


    <meta name="msapplication-square70x70logo" content="icon_smalltile.png">
    <meta name="msapplication-square150x150logo" content="icon_mediumtile.png">
    <meta name="msapplication-wide310x150logo" content="icon_widetile.png">
    

### Tiles in Internet Explorer

Microsoft’s "Pinned Sites" and rotating "Live Tiles" go far beyond other
implementations and is beyond the scope of this guide. You can learn more
at MSDN's
[how to create live tiles](//msdn.microsoft.com/en-us/library/ie/dn455115(v=vs.85).aspx).


## Color browser elements

Using different `meta` elements, you can customize the browser and 
even elements of the platform. Keep in mind that some may only work on certain
platforms or browsers, but they can greatly enhance the experience. 

Chrome, Firefox OS, Safari, Internet Explorer and Opera Coast allow you to define 
colors for elements of the browser, and even the platform using meta tags.

### Meta Theme Color for Chrome and Opera

To specify the theme color for Chrome on Android, use the meta theme color.

    <!-- Chrome, Firefox OS and Opera -->
    <meta name="theme-color" content="#4285f4">
    

<img src="imgs/theme-color.png" alt="Theme colors styling the address bar in Chrome">

### Safari specific styling

Safari allows you to style the status bar and specify a startup image.

#### Specify a startup image

By default, Safari shows a blank screen during load time and after multiple
loads a screenshot of the previous state of the app. You can prevent this by
telling Safari to show an explicit startup image, by adding a link tag, with
`rel=apple-touch-startup-image`. For example:


    <link rel="apple-touch-startup-image" href="icon.png">
    

The image has to be in the specific size of the target device's screen or it
won't be used. Refer to
[Safari Web Content Guidelines](//developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html)
for further details.

While Apple's documentation is sparse on this topic, the developer community
has figured out a way to target all devices by using advanced media queries to
select the appropriate device and then specify the correct image. Here's a
working solution, courtesy of [tfausak's gist](//gist.github.com/tfausak/2222823)

#### Change the status bar appearance

You can change the appearance of the default status bar to either `black` or
`black-translucent`. With `black-translucent`, the status bar floats on top
of the full screen content, rather than pushing it down. This gives the layout
more height, but obstructs the top.  Here’s the code required:


    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
<div class="attempt-left">
  <figure>
    <img src="imgs/status-bar-translucent.png" srcset="imgs/status-bar-translucent.png 1x, imgs/status-bar-translucent-2x.png 2x" alt="black-translucent">
    <figcaption>Screenshot using <code>black-translucent</code></figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/status-bar-black.png" srcset="imgs/status-bar-black.png 1x, imgs/status-bar-black-2x.png 2x" alt="black-black">
    <figcaption>Screenshot using <code>black</code></figcaption>
  </figure>
</div>

<div style="clear:both;"></div>


