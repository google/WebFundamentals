project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: You can defer or cancel the app install banner, and understand how the user responded to the banner.

{# wf_updated_on: 2016-02-11 #}
{# wf_published_on: 2014-12-16 #}

# App Install Banner Events {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

Chrome provides an easy mechanism to determine how a user responds to the
app install banner and even cancel or defer it until a more convenient time.

## Did a user install the app?

The `beforeinstallprompt` event returns a promise called `userChoice` 
that resolves when the user acts on the prompt.  The promise 
returns an object with a value of `dismissed` on the `outcome`
attribute or `accepted` if the user added the web page to the home screen.

    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired
      
      // e.userChoice will return a Promise. 
      // For more details read: http://www.html5rocks.com/en/tutorials/es6/promises/
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


## Deferring or cancelling the prompt

Chrome manages when to trigger the prompt but for some sites this might not 
be the ideal time. You can defer the prompt to a later time in the app's usage or 
even cancel it. 

When Chrome decides to prompt the user to install the app, you 
can prevent the default action and store the event for later. Then, when 
the user has a positive interaction with your site, you can re-trigger 
the prompt by calling `prompt()` on the stored event. 

This causes Chrome to show the banner, and all the promise attributes&mdash;such as `userChoice`&mdash;are available to bind to so that you can understand 
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
    
