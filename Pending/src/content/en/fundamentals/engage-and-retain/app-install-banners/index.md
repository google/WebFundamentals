project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: There are two types of app install banners: <i>web</i> app install banners and <i>native</i> app install banners. They give you the ability to let users quickly and seamlessly add your web or native app to their home screens without leaving the browser.

{# wf_review_required #}
{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# Using App Install Banners {: .page-title }

{% include "_shared/contributors/mattgaunt.html" %}

{% include "_shared/contributors/paulkinlan.html" %}

<div class="mdl-grid">
  <div class="mdl-cell mdl-cell--6-col">
    There are two types of app install banners: <i>web</i> app install 
banners and <i>native</i> app install banners. They give you the ability 
to let users quickly and seamlessly add your web or native app to their 
home screens without leaving the browser.

    <p>
      <i>"This looks great, I want it on my site!"</i>
    </p>
    <p>
      <i>"Please tell me how to add it!"</i>
    </p>
    <p>
      Adding app install banners is easy, and Chrome handles most of the heavy
      lifting for you. You'll need to include a web app manifest file in
      your site with details about your app.
    </p>
    <p>
      Chrome then uses a set of criteria and visit frequency heuristics to 
      determine when to show the banner. Read on for more details.
    </p>
  </div>
  <figure class="mdl-cell mdl-cell--6-col">
    <img src="images/add-to-home-screen.gif" alt="Web app install banner">
    <figcaption>Web app install banner flow</figcaption>
  </figure>
</div>
