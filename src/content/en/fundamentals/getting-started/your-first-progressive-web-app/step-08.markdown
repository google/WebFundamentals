---
layout: shared/narrow
title: "Deploy to a Secure Host and Celebrate!"
published_on: 2016-02-04
updated_on: 2016-02-04
translation_priority: 1
order: 7
authors:
  - petelepage
---

<p class="intro">
The final step is to deploy our weather app to a server that supports HTTPS. If 
you don't already have one, the absolute easiest (and free) approach is to use
the static content hosting from Firebase. It's super easy to use, serves 
content over HTTPS and is backed by a global CDN.
</p>

{% include shared/toc.liquid %}

## Extra credit: minify and inline CSS

There's one more thing that you should consider, minifying the key styles and 
inlining them directly into `index.html`. 
[Page Speed Insights](https://developers.google.com/speed) recommends serving 
the above the fold content in the first 15k bytes of the request. 

See how small you can get the initial request with everything inlined. 

**Further Reading:** [PageSpeed Insight 
Rules](https://developers.google.com/speed/docs/insights/rules)

## Deploy to Firebase

If you're new to Firebase, you'll need to create your account and install some 
tools first.

1. Create a Firebase account at 
   [https://www.firebase.com/signup/](https://www.firebase.com/signup/)
1. Install the Firebase tools via npm:<br/>
   `npm install -g firebase-tools`

Once your account has been created and you've signed in, you're ready to 
deploy!

1. Create a new app at 
   [https://www.firebase.com/account/](https://www.firebase.com/account/)
1. If you haven't recently signed in to the Firebase tools, update your 
   credentials:<br/>
   `firebase login`
1. Initialize your app, and provide the directory where your completed app 
   lives:<br/>
   `firebase init`
1. Finally, deploy the app to Firebase:<br/>
   `firebase deploy`
1. Celebrate. You're done! Your app will be deployed to the domain:<br/> 
   `https://YOUR-FIREBASE-APP.firebaseapp.com`

**Further reading:** [Firebase Hosting 
Guide](https://www.firebase.com/docs/hosting/guide/)

## Test it out

* Try adding the app to your home screen then disconnect the network and
verify the app works offline as expected.

<a href="https://weather-pwa-sample.firebaseapp.com/final/" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">Try it</a>
