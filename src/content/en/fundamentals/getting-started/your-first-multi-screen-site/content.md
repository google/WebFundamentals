project_path: /web/_project.yaml
book_path: /web/_book.yaml
description: Content is the most important aspect of any site. In this guide, we will show how you can quickly plan to build your first multi-device site.

<p class="intro">
Content is the most important aspect of any site. So let’s design for the content and not let the design dictate the content. In this guide, we identify the content we need first, create a page structure based on this content, and then present the page in a simple linear layout that works well on narrow and wide viewports.
</p>



## Create the page structure

We have identified we need:

1.  An area that describes at a high-level our product "CS256: Mobile web development" course
2.  A form to collect information from users who are interested in our product
3.  An in depth description and video
4.  Images of the product in action
5.  A data table with information to back the claims up

















# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






We have also come up with a rough information architecture and layout for both
the narrow and wide viewports.

<div class="demo clear" style="background-color: white;">
  <img class="g-wide--1 g-medium--half" src="images/narrowviewport.png" alt="Narrow Viewport IA">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/wideviewport.png" alt="Wide Viewport IA">
</div>

This can be converted easily into the rough sections of a skeleton page that
we will use for the rest of this project.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="cp">&lt;!doctype html&gt;</span>
<span class="nt">&lt;html&gt;</span>
  <span class="nt">&lt;head&gt;</span>
     <span class="nt">&lt;meta</span> <span class="na">name=</span><span class="s">&quot;viewport&quot;</span> <span class="na">content=</span><span class="s">&quot;width=device-width, initial-scale=1&quot;</span><span class="nt">&gt;</span>
     <span class="nt">&lt;title&gt;</span>CS256: Mobile Web development - structure<span class="nt">&lt;/title&gt;</span>
  <span class="nt">&lt;/head&gt;</span>
  <span class="nt">&lt;body&gt;</span>
    <span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;headline&quot;</span><span class="nt">&gt;</span>
      <span class="nt">&lt;header&gt;</span>
        <span class="nt">&lt;h1&gt;&lt;/h1&gt;</span>
        <span class="nt">&lt;p&gt;&lt;/p&gt;</span>
      <span class="nt">&lt;/header&gt;</span>
      <span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;blurb&quot;</span><span class="nt">&gt;</span>
        <span class="nt">&lt;p&gt;&lt;/p&gt;</span>
        <span class="nt">&lt;ul&gt;</span>
          <span class="nt">&lt;li&gt;</span>
        <span class="nt">&lt;/ul&gt;</span>
      <span class="nt">&lt;/div&gt;</span>
      <span class="nt">&lt;form</span> <span class="na">method=</span><span class="s">&quot;post&quot;</span> <span class="na">id=</span><span class="s">&quot;register&quot;</span><span class="nt">&gt;</span>
      <span class="nt">&lt;/form&gt;</span>
    <span class="nt">&lt;/div&gt;</span>
    <span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;section1&quot;</span><span class="nt">&gt;</span>
      <span class="nt">&lt;h2&gt;&lt;/h2&gt;</span>
      <span class="nt">&lt;p&gt;&lt;/p&gt;</span>
      <span class="nt">&lt;ul&gt;</span>
        <span class="nt">&lt;li&gt;</span>
      <span class="nt">&lt;/ul&gt;</span>
      <span class="nt">&lt;video&gt;&lt;/video&gt;</span>
    <span class="nt">&lt;/div&gt;</span>
    <span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;section2&quot;</span><span class="nt">&gt;</span>
      <span class="nt">&lt;h2&gt;&lt;/h2&gt;</span>
      <span class="nt">&lt;p&gt;&lt;/p&gt;</span>
      <span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;images&quot;</span><span class="nt">&gt;</span>
        <span class="nt">&lt;img&gt;</span>
      <span class="nt">&lt;/div&gt;</span>
    <span class="nt">&lt;/div&gt;</span>
    <span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;section3&quot;</span><span class="nt">&gt;</span>
      <span class="nt">&lt;h2&gt;&lt;/h2&gt;</span>
      <span class="nt">&lt;p&gt;&lt;/p&gt;</span>
    <span class="nt">&lt;/div&gt;</span>
    <span class="nt">&lt;footer&gt;</span>
      <span class="nt">&lt;p&gt;&lt;/p&gt;</span>
    <span class="nt">&lt;/footer&gt;</span>
  <span class="nt">&lt;/body&gt;</span>
<span class="nt">&lt;/html&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/addstructure.html">Try full sample</a>
      </p>
  </div>



## Add content to the page

The basic structure of the site is complete. We know the sections we need, the
content to display in those sections, and where to position it in the overall
information architecture. We can now start to build out the site.























# WARNING: This page has an include that should be a callout (i.e. a highlight.liquid, but it has no text - please fix this)



# WARNING: This page has a highlight.liquid include that wants to show a list but it's not supported on devsite. Please change this to text and fix the issue






### Create the headline and form

The headline and request notification form are the critical components of
our page. These must be presented to the user immediately.

In the headline, add simple text to describe the course:


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;headline&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;container&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;header&gt;</span>
      <span class="nt">&lt;h1&gt;</span>Mobile Web Development<span class="nt">&lt;/h1&gt;</span>
      <span class="nt">&lt;p&gt;</span>Building Mobile Web Experiences<span class="nt">&lt;/p&gt;</span>
    <span class="nt">&lt;/header&gt;</span>
    <span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;blurb&quot;</span><span class="nt">&gt;</span>
      <span class="nt">&lt;p&gt;</span>So you&#39;ve heard mobile is kind of a big deal, and you&#39;re not
      sure how to transform your traditional desktop-focused web apps
      into fast, effective multi-device experiences.<span class="nt">&lt;/p&gt;</span>
      <span class="nt">&lt;p&gt;</span>This course is designed to teach web developers what
      they need to know to create great cross-device web
      experiences.<span class="nt">&lt;/p&gt;</span>
      <span class="nt">&lt;p&gt;</span>This course will focus on building mobile-first web apps,
      which will work across multiple platforms including:<span class="nt">&lt;/p&gt;</span>
      <span class="nt">&lt;ul&gt;</span>
        <span class="nt">&lt;li&gt;</span>Android,<span class="nt">&lt;/li&gt;</span>
        <span class="nt">&lt;li&gt;</span>iOS,<span class="nt">&lt;/li&gt;</span>
        <span class="nt">&lt;li&gt;</span>and others.<span class="nt">&lt;/li&gt;</span>
      <span class="nt">&lt;/ul&gt;</span>
    <span class="nt">&lt;/div&gt;</span>
    <span class="nt">&lt;form</span> <span class="na">method=</span><span class="s">&quot;post&quot;</span> <span class="na">id=</span><span class="s">&quot;register&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;/form&gt;</span>
  <span class="nt">&lt;/div&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/addheadline.html">Try full sample</a>
      </p>
  </div>



We need to also fill out the form.
It will be a simple form that collects the users' name, email address,
and phone number.

All forms should have labels and placeholders to make it easy for users to
focus elements, understand what is supposed to go in them, and to also help
accessibility tools understand the structure of the form.  The name attribute
not only sends the form value to the server, it is also used to give important
hints to the browser about how to automatically fill in the form for the user.

We will add semantic types to make it quick and simple for users to be able to
enter content on a mobile device.  For example, when entering a telephone
number, the user should just see a dial pad.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;form</span> <span class="na">method=</span><span class="s">&quot;post&quot;</span> <span class="na">id=</span><span class="s">&quot;register&quot;</span><span class="nt">&gt;</span>
   <span class="nt">&lt;h2&gt;</span>Register for the launch<span class="nt">&lt;/h2&gt;</span>
   <span class="nt">&lt;label</span> <span class="na">for=</span><span class="s">&quot;name&quot;</span><span class="nt">&gt;</span>Name<span class="nt">&lt;/label&gt;</span>
   <span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;text&quot;</span> <span class="na">name=</span><span class="s">&quot;name&quot;</span> <span class="na">id=</span><span class="s">&quot;name&quot;</span>
      <span class="na">placeholder=</span><span class="s">&quot;Thomas A Anderson&quot;</span> <span class="na">required</span><span class="nt">&gt;</span>
   <span class="nt">&lt;label</span> <span class="na">for=</span><span class="s">&quot;email&quot;</span><span class="nt">&gt;</span>Email address<span class="nt">&lt;/label&gt;</span>
   <span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;email&quot;</span> <span class="na">name=</span><span class="s">&quot;email&quot;</span> <span class="na">id=</span><span class="s">&quot;email&quot;</span>
      <span class="na">placeholder=</span><span class="s">&quot;neo@example.com&quot;</span> <span class="na">required</span><span class="nt">&gt;</span>
   <span class="nt">&lt;label</span> <span class="na">for=</span><span class="s">&quot;tel&quot;</span><span class="nt">&gt;</span>Telephone<span class="nt">&lt;/label&gt;</span>
   <span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;tel&quot;</span> <span class="na">name=</span><span class="s">&quot;tel&quot;</span> <span class="na">id=</span><span class="s">&quot;tel&quot;</span>
      <span class="na">placeholder=</span><span class="s">&quot;(555) 555 5555&quot;</span> <span class="na">required</span><span class="nt">&gt;</span>
   <span class="nt">&lt;input</span> <span class="na">type=</span><span class="s">&quot;submit&quot;</span> <span class="na">value=</span><span class="s">&quot;Sign up&quot;</span><span class="nt">&gt;</span>
<span class="nt">&lt;/form&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/addform.html">Try full sample</a>
      </p>
  </div>




<div class="wf-border-container">
  <div class="wf-border-container__content with-bottom-border">
    <h3 class="wf-highlight-list__title">Related guides</h3>
    <ul class="wf-highlight-list__list">
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/input/forms/"
            title="Forms">
            Forms
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/input/forms/">
          
          Create amazing forms
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/input/forms/"
            title="Forms">
            Forms
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/input/forms/label-and-name-inputs">
          
          Label and name inputs correctly
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/input/forms/"
            title="Forms">
            Forms
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/input/forms/choose-the-best-input-type">
          
          Choose the best input type
        </a>
      </li>
    
    </ul>

  </div>
</div>




### Create the Video and Information section

The Video and Information section of content will contain a little more depth.
It will have a bulleted list of features of our products and will also contain
a video placeholder that shows our product working for the user.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;section1&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;h2&gt;</span>What will I learn?<span class="nt">&lt;/h2&gt;</span>
  <span class="nt">&lt;p&gt;</span>After completing this class, you&#39;ll have built a web application with a first-class mobile experience.<span class="nt">&lt;/p&gt;</span>
  <span class="nt">&lt;p&gt;</span>You&#39;ll understand what it takes to:<span class="nt">&lt;/p&gt;</span>
  <span class="nt">&lt;ul&gt;</span>
    <span class="nt">&lt;li&gt;</span>build great web experiences on mobile devices<span class="nt">&lt;/li&gt;</span>
    <span class="nt">&lt;li&gt;</span>use the tools you need to test performance<span class="nt">&lt;/li&gt;</span>
    <span class="nt">&lt;li&gt;</span>apply your knowledge to your own projects in the future<span class="nt">&lt;/li&gt;</span>
  <span class="nt">&lt;/ul&gt;</span>
  <span class="nt">&lt;video</span> <span class="na">controls</span> <span class="na">poster=</span><span class="s">&quot;udacity.png&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;source</span> <span class="na">src=</span><span class="s">&quot;udacity.webm&quot;</span> <span class="na">type=</span><span class="s">&quot;video/webm&quot;</span><span class="nt">&gt;&lt;/source&gt;</span>
    <span class="nt">&lt;source</span> <span class="na">src=</span><span class="s">&quot;udacity.mov&quot;</span> <span class="na">type=</span><span class="s">&quot;video/mov&quot;</span><span class="nt">&gt;&lt;/source&gt;</span>
    <span class="nt">&lt;p&gt;</span>Sorry your browser doesn&#39;t support video.
       <span class="nt">&lt;a</span> <span class="na">href=</span><span class="s">&quot;udacity.mov&quot;</span><span class="nt">&gt;</span>Download the video<span class="nt">&lt;/a&gt;</span>.
    <span class="nt">&lt;/p&gt;</span>
  <span class="nt">&lt;/video&gt;</span>
  <span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html">Try full sample</a>
      </p>
  </div>



Videos are often used to describe content in a more interactive manner and are
frequently used to show a demonstration of a product or a concept.

By following the best practices, you can easily integrate video into your site:

*  Add a `controls` attribute to make it easy for people to play the video.
*  Add a `poster` image to give people a preview of the content.
*  Add multiple `<source>` elements based on supported video formats.
*  Add fall-back text to let people download the video if they can't play it in the window.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;video</span> <span class="na">controls</span> <span class="na">poster=</span><span class="s">&quot;udacity.png&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;source</span> <span class="na">src=</span><span class="s">&quot;udacity.webm&quot;</span> <span class="na">type=</span><span class="s">&quot;video/webm&quot;</span><span class="nt">&gt;&lt;/source&gt;</span>
  <span class="nt">&lt;source</span> <span class="na">src=</span><span class="s">&quot;udacity.mov&quot;</span> <span class="na">type=</span><span class="s">&quot;video/mov&quot;</span><span class="nt">&gt;&lt;/source&gt;</span>
  <span class="nt">&lt;p&gt;</span>Sorry your browser doesn&#39;t support video.
     <span class="nt">&lt;a</span> <span class="na">href=</span><span class="s">&quot;udacity.mov&quot;</span><span class="nt">&gt;</span>Download the video<span class="nt">&lt;/a&gt;</span>.
  <span class="nt">&lt;/p&gt;</span>
<span class="nt">&lt;/video&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/addvideo.html">Try full sample</a>
      </p>
  </div>




<div class="wf-border-container">
  <div class="wf-border-container__content with-bottom-border">
    <h3 class="wf-highlight-list__title">Related guides</h3>
    <ul class="wf-highlight-list__list">
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/media/"
            title="Video">
            Video
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/media/video/">
          
          Using video effectively
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/media/"
            title="Video">
            Video
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/media/video/add-a-video#specify-a-start-and-end-time">
          
          Change the starting position
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/media/"
            title="Video">
            Video
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/media/video/add-a-video#include-a-poster-image">
          
          Include a poster image
        </a>
      </li>
    
    </ul>

  </div>
</div>




### Create the Images Section

Sites without images can be a little boring. There are two types of images:

*  Content images &mdash; images that are in-line in the document and are used
   to convey extra information about the content.
*  Stylistic images &mdash; images that are used to make the site look
   better; often these are background images, patterns and gradients.  We will
   cover this in the [next article](/web/fundamentals/getting-started/your-first-multi-screen-site/responsive?hl=en).

The Images section in our page is a collection of content images.

Content images are critical to conveying the meaning of the page. Think of
them like the images used in newspaper articles.  The images we are using are
pictures of the tutors on the project:  Chris Wilson, Peter Lubbers and Sean
Bennet.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;section2&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;h2&gt;</span>Who will teach me?<span class="nt">&lt;/h2&gt;</span>
  <span class="nt">&lt;p&gt;</span>The world&#39;s leading mobile web developers.<span class="nt">&lt;/p&gt;</span>

  <span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;images&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;img</span> <span class="na">src=</span><span class="s">&quot;chriswilson.png&quot;</span> <span class="na">alt=</span><span class="s">&quot;Chris Wilson: Course Instructor&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;img</span> <span class="na">src=</span><span class="s">&quot;peterlubbers.png&quot;</span> <span class="na">alt=</span><span class="s">&quot;Peter Lubbers: Course Instructor&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;img</span> <span class="na">src=</span><span class="s">&quot;seanbennett.png&quot;</span> <span class="na">alt=</span><span class="s">&quot;Sean Bennet: Course Developer&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;/div&gt;</span>

  <span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/addimages.html">Try full sample</a>
      </p>
  </div>



The images are set to scale to 100% of the width of the screen. This works
well on devices with a narrow viewport, but less well on those with a
wide viewport (like desktop).  We will manage this in the responsive design
section.


<div class="wf-border-container">
  <div class="wf-border-container__content with-bottom-border">
    <h3 class="wf-highlight-list__title">Related guides</h3>
    <ul class="wf-highlight-list__list">
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/media/"
            title="Images">
            Images
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/media/images/">
          
          Using images effectively
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/media/"
            title="Images">
            Images
          </a></p>
        

        <a href="/web/fundamentals/design-and-ui/media/images/images-in-markup">
          
          Correct use of images in markup
        </a>
      </li>
    
      <li>
        
          <p class="wf-highlight-list__subtitle"><a
            href="/web/fundamentals/design-and-ui/media/"
            title="Images">
            Images
          </a></p>
        

        <a href="/web/fundamentals/performance/optimizing-content-efficiency/image-optimization">
          
          Image optimization
        </a>
      </li>
    
    </ul>

  </div>
</div>




Many people don't have the ability to view images and often use an assistive
technology such as a screen reader that will parse the data on the page and
relay that to the user verbally.  You should ensure that all your content
images  have a descriptive `alt` tag that the screen reader can speak out to
the user.

When adding `alt` tags make sure that you keep the alt text as concise as
possible to fully describe  the image.  For example in our demo we simply
format the attribute to be "Name: Role", this presents enough information
to the user to understand that this section is about the authors and what
their job is.

### Add the Tabulated Data Section

The final section is a simple table that is used to show specific product stats
about the product.

Tables should only be used for tabular data, i.e, matrices of information.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;div</span> <span class="na">id=</span><span class="s">&quot;section3&quot;</span><span class="nt">&gt;</span>
  <span class="nt">&lt;h2&gt;</span>Mobile. Why should I care?<span class="nt">&lt;/h2&gt;</span>
  <span class="nt">&lt;p&gt;</span>It is huge.  Everywhere.<span class="nt">&lt;/p&gt;</span>
  <span class="nt">&lt;table&gt;</span>
    <span class="nt">&lt;caption&gt;</span>
      <span class="nt">&lt;p&gt;</span>Data from <span class="nt">&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-ww-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>StatsCounter<span class="nt">&lt;/a&gt;&lt;/p&gt;</span>
    <span class="nt">&lt;/caption&gt;</span>
    <span class="nt">&lt;thead&gt;</span>
       <span class="nt">&lt;tr&gt;</span>
         <span class="nt">&lt;th&gt;</span>Country<span class="nt">&lt;/th&gt;</span>
         <span class="nt">&lt;th&gt;</span>Desktop share<span class="nt">&lt;/th&gt;</span>
         <span class="nt">&lt;th&gt;</span>Tablet share<span class="nt">&lt;/th&gt;</span>
         <span class="nt">&lt;th&gt;</span>Mobile share<span class="nt">&lt;/th&gt;</span>
       <span class="nt">&lt;/tr&gt;</span>
    <span class="nt">&lt;/thead&gt;</span>
    <span class="nt">&lt;colgroup&gt;</span>
       <span class="nt">&lt;col</span> <span class="na">span=</span><span class="s">&quot;1&quot;</span><span class="nt">&gt;</span>
       <span class="nt">&lt;col</span> <span class="na">span=</span><span class="s">&quot;1&quot;</span><span class="nt">&gt;</span>
       <span class="nt">&lt;col</span> <span class="na">span=</span><span class="s">&quot;1&quot;</span><span class="nt">&gt;</span>
       <span class="nt">&lt;col</span> <span class="na">span=</span><span class="s">&quot;1&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;/colgroup&gt;</span>
    <span class="nt">&lt;tbody&gt;</span>
     <span class="nt">&lt;tr&gt;</span>
        <span class="nt">&lt;td&gt;&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-IN-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>India<span class="nt">&lt;/a&gt;&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>32%<span class="nt">&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>1%<span class="nt">&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>67%<span class="nt">&lt;/td&gt;</span>
      <span class="nt">&lt;/tr&gt;</span>
      <span class="nt">&lt;tr&gt;</span>
        <span class="nt">&lt;td&gt;&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-GB-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>GB<span class="nt">&lt;/a&gt;&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>69%<span class="nt">&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>13%<span class="nt">&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>18%<span class="nt">&lt;/td&gt;</span>
      <span class="nt">&lt;/tr&gt;</span>
      <span class="nt">&lt;tr&gt;</span>
        <span class="nt">&lt;td&gt;&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-US-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>US<span class="nt">&lt;/a&gt;&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>69%<span class="nt">&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>9%<span class="nt">&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>22%<span class="nt">&lt;/td&gt;</span>
      <span class="nt">&lt;/tr&gt;</span>
      <span class="nt">&lt;tr&gt;</span>
        <span class="nt">&lt;td&gt;&lt;a</span> <span class="na">href=</span><span class="s">&quot;http://gs.statcounter.com/#desktop+mobile+tablet-comparison-CN-monthly-201303-201403&quot;</span><span class="nt">&gt;</span>China<span class="nt">&lt;/a&gt;&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>86%<span class="nt">&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>4%<span class="nt">&lt;/td&gt;</span>
        <span class="nt">&lt;td&gt;</span>10%<span class="nt">&lt;/td&gt;</span>
      <span class="nt">&lt;/tr&gt;</span>
    <span class="nt">&lt;/tbody&gt;</span>
  <span class="nt">&lt;/table&gt;</span>
  <span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/addtable.html">Try full sample</a>
      </p>
  </div>



### Add a Footer

Most sites need a footer to display content such as Terms and Conditions,
disclaimers, and other content that isn't meant to be in the main navigation
or in the main content area of the page.

In our site, we'll just create a simple placeholder footer.


  <div dir="ltr" class="highlight-module highlight-module--code highlight-module--right">
      <div class="highlight"><pre><span class="nt">&lt;footer&gt;</span>
  <span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">&quot;container&quot;</span><span class="nt">&gt;</span>
    <span class="nt">&lt;p&gt;</span>We always need a footer.<span class="nt">&lt;/p&gt;</span>
  <span class="nt">&lt;/div&gt;</span>
<span class="nt">&lt;/footer&gt;</span>
</pre></div>
      <p>
        <a class="highlight-module__cta mdl-button mdl-js-button mdl-button--raised mdl-button--colored" href="/web/resources/samples/fundamentals/getting-started/your-first-multi-screen-site/addcontent.html">Try full sample</a>
      </p>
  </div>



## Summary

We have created the outline of the site and we have identified all the main
structural elements.  We have also made sure that we have all the relevant
content ready and in-place to satisfy our business needs.

<div class="clear">
  <img class="g-wide--2 g-medium--half" src="images/content.png" alt="Content" style="max-width: 100%;">
  <img  class="g-wide--2 g-wide--last g-medium--half g--last" src="images/narrowsite.png" alt="" style="max-width: 100%;">
</div>

You will notice that the page looks terrible right now; this is intentional.
Content is the most important aspect of any site and we needed to make sure we
had a good solid information architecture and density. This guide has given us
an excellent base to build upon. We will style our content in the next guide.

