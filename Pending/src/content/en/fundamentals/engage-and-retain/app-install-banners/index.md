project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: There are two types of app install banners: <i>web</i> app install banners and <i>native</i> app install banners. They give you the ability to let users quickly and seamlessly add your web or native app to their home screens without leaving the browser.

{# wf_review_required #}
{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# Using App Install Banners {: .page-title }

{% include "_shared/contributors/mattgaunt.html" %}
{% include "_shared/contributors/paulkinlan.html" %}


<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="Web app install banner">
  </figure>
</div>

There are two types of app install banners: **web** app install banners and
[**native**](native-app-install) app install banners. They give you the ability 
to let users quickly and seamlessly add your web or native app to their 
home screens without leaving the browser.

Adding app install banners is easy, and Chrome handles most of the heavy 
lifting for you. You'll need to include a web app manifest file in your site
with details about your app.

Chrome then uses a set of criteria and visit frequency heuristics to determine
when to show the banner. Read on for more details.

## What are the Criteria?

Chrome will automatically display the banner when your app meets the following
criteria:

* Has a [web app manifest](../web-app-manifest/) file with:
    - a `short_name` (used on the home screen)
    - a `name` (used in the banner)
    - a 144x144 png icon (the icon declarations must include a mime type of `image/png`)
    - a `start_url` that loads
* Has a [service worker](/web/fundamentals/primers/service-worker/)
  registered on your site.
* Is served over [HTTPS](/web/fundamentals/security/encrypt-in-transit/)
  (a requirement for using Service Worker).
* Is visited at least twice, with at least five minutes between visits.

## Testing the App Install Banner

The app install banner is only shown after the user has visited the page at least
twice within 5 minutes. You can disable the visit frequency check by enabling
the Chrome flag `#bypass-app-banner-engagement-checks`. You can also enable the
Chrome flag `#enable-add-to-shelf` to test on desktop Chrome.

Then, as long as you have a manifest (configured correctly), are on HTTPS (or `localhost`)
and have a service worker, you should see the install prompt.
