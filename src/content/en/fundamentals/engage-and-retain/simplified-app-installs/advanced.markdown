---
layout: shared/narrow
title: "Do more with app install banners"
description: "You can defer or cancel the app install banner, and understand how the user responded to the banner."
published_on: 2014-12-17
updated_on: 2015-09-30
authors:
  - mattgaunt
  - paulkinlan
translation_priority: 1
order: 4
---

<p class="intro">
Chrome provides an easy mechanism to determine how the user responded to the
app install banner and even cancel or defer it until a more convenient time.
</p>

{% include shared/toc.liquid %}

## Did a user install the app

The `beforeinstallprompt` event will return a promise called `userChoice` 
that will resolve when the user actions the prompt.  The promise will 
return an object with a value of `dismissed` on the `outcome`
attribute or `accepted` if the user added the web page to the home screen.

{% highlight javascript %}
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
{% endhighlight %}

This is a good tool for understanding how your users interact with the app 
install prompt.


## Deferring or cancelling the prompt

Chrome manages when to trigger the prompt and for some sites this might not 
be ideal. You to defer the prompt to a later time in the apps usage or 
even cancel it. 

When Chrome decides to prompt the user to install the app you 
can prevent the default action and store the event for later. Then when 
the user has a positive interaction with your site you can then re-trigger 
the prompt by calling `prompt()` on the stored event. 

This will then cause Chrome to show the banner and all the Promise attributes 
such as `userChoice` will be available to bind to so that you can understand 
what action the user took.

{% highlight javascript %}

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
{% endhighlight %}

Alternatively, you can cancel the prompt by preventing the default.

{% highlight javascript %}
window.addEventListener('beforeinstallprompt', function(e) {
  console.log('beforeinstallprompt Event fired');
  e.preventDefault();
  return false;
});
{% endhighlight %}

## Testing the app install banner

The app install banner is only shown after the user has visited the 
page at least twice over two different days, making testing difficult. You can
disable the visit frequency check by enabling the Chrome flag 
`#bypass-app-banner-engagement-checks`.

Then, as long as you have a manifest (configured correctly), are on HTTPS 
and have a service worker, you should see the install prompt.

