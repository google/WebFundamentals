project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: There are two types of app install banners: web app install banners and native app install banners. They give you the ability to let users quickly and seamlessly add your web or native app to their home screens without leaving the browser.

{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# Web App Install Banners {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="Web app install banner">
  </figure>
</div>

There are two types of app install banners: **web** app install banners and
[**native**](#native_app_install_banners) app install banners. They let users quickly and seamlessly
add your web or native app to their home screens without leaving the browser.

Adding app install banners is easy; Chrome handles most of the heavy 
lifting for you. You need to include a web app manifest file in your site
with details about your app.

Chrome then uses a set of criteria and visit-frequency heuristics to determine
when to show the banner. Read on for more details.

Note: Add to Homescreen (sometimes abbreviated as A2HS) is another name for Web App Install Banners. The two terms are equivalent.

### What are the criteria?

Chrome automatically displays the banner when your app meets the following
criteria:

* Has a [web app manifest](../web-app-manifest/) file with:
    - a `short_name` (used on the home screen)
    - a `name` (used in the banner)
    - a 144x144 png icon (the icon declarations must include a mime type of `image/png`)
    - a `start_url` that loads
* Has a [service worker](/web/fundamentals/getting-started/primers/service-workers)
  registered on your site.
* Is served over [HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https)
  (a requirement for using service worker).
* Is visited at least twice, with at least five minutes between visits.

Note: Web App Install Banners are an emerging technology. The criteria for displaying app install banners may change in the future. See [What, Exactly, Makes Something a Progressive Web App?](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/) for a canonical reference (that will be updated over time) on the latest web app install banner criteria.

### Testing the app install banner {: #test }

Once you've got your web app manifest set up, you'll want to validate
that it's defined correctly. You've got two approaches at your disposal. One
is manual, and the other is automated.

To manually trigger the app install banner:

1. Open Chrome DevTools.
2. Go to the **Application** panel.
3. Go to the **Manifest** tab.
4. Click **Add to homescreen**, highlighted in red in the screenshot below.

![Add to homescreen button on DevTools](images/devtools-a2hs.png)

See [Simulate Add to Homescreen
events](/web/tools/chrome-devtools/progressive-web-apps#add-to-homescreen)
for more help.

For automated testing of your app install banner, use Lighthouse. Lighthouse
is a web app auditing tool. You can run it as a Chrome Extension or as a
NPM module. To test your app, you provide Lighthouse with a specific page
to audit. Lighthouse runs a suite of audits against the page and then
provides the page's results in a report.

The two suites of Lighthouse audits in the screenshot below represent all
of the tests that your page needs to pass to display an app install banner.

![Lighthouse's app install audits](images/lighthouse-a2hs.png)

See [Audit Web Apps with Lighthouse](/web/tools/lighthouse/) to get started
with Lighthouse.

## App install banner events

Chrome provides an easy mechanism to determine how the user responded to the
app install banner and even cancel or defer it until a more convenient time.

### Did a user install the app?

The `beforeinstallprompt` event returns a promise called `userChoice` 
that resolves when the user acts on the prompt.  The promise 
returns an object with a value of `dismissed` on the `outcome`
attribute or `accepted` if the user added the web page to the home screen.

    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired
      
      // e.userChoice will return a Promise. 
      // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
      e.userChoice.then(function(choiceResult) {
        
        console.log(choiceResult.outcome);
        
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });
    

This is a good tool for understanding how your users interact with the app 
install prompt.


### Deferring or cancelling the prompt

Chrome manages when to trigger the prompt but for some sites this might not 
be ideal. You can defer the prompt to a later time in the app's usage or 
even cancel it. 

When Chrome decides to prompt the user to install the app you 
can prevent the default action and store the event for later. Then when 
the user has a positive interaction with your site you can then re-trigger 
the prompt by calling `prompt()` on the stored event. 

This causes Chrome to show the banner and all the Promise attributes 
such as `userChoice` will be available to bind to so that you can understand 
what action the user took.
    
    var deferredPrompt;
    
    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      
      return false;
    });
    
    btnSave.addEventListener('click', function() {
      if(deferredPrompt !== undefined) {
        // The user has had a postive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();
      
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {
      
          console.log(choiceResult.outcome);
          
          if(choiceResult.outcome == 'dismissed') {
            console.log('User cancelled home screen install');
          }
          else {
            console.log('User added to home screen');
          }
          
          // We no longer need the prompt.  Clear it up.
          deferredPrompt = null;
        });
      }
    });
    

Alternatively, you can cancel the prompt by preventing the default.

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    
## Native app install banners

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif" alt="Native app install banner" style="max-height: 500px">
  </figure>
</div>

Native App install banners are similar to [Web app install banners](.), but
instead of adding to the home screen, they will let the user install your
native app without leaving your site.

### Criteria to show the banner

The criteria is similar to the Web App install banner except for the need of
a service worker. Your site must:

* Have a [web app manifest](../web-app-manifest/) file with:
    - a `short_name`
    - a `name` (used in the banner prompt)
    - a 144x144 png icon, your icon declaration's should include a mime type of `image/png`
    - a `related_applications` object with information about the app
* Be served over [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https)
* Be visited by the user twice, over two separate days during the course
  of two weeks.

### Manifest requirements

To integrate into any manifest, add a `related_applications` array with the
platforms of `play` (for Google Play) and the App Id.


    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

If just want to offer the user the ability to install your Android
application, and not show the web app install banner, then add
`"prefer_related_applications": true`. For example:


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
