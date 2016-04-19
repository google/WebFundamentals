---
layout: updates/post
title: "Streamlining sign-in flow using Credential Management API"
description: ""
published_on: 2016-04-19
updated_on: 2016-04-19
authors:
  - agektmr
tags:
  - credentials
  - sign-in
---

To provide a sophisticated user experience, it's important to help users 
authenticate themselves to your website. Authenticated users can interact with 
each other using a dedicated profile, sync data across devices, or process data 
while offline; the list goes on and on. But creating, remembering and typing 
passwords tends to be cumbersome for end users, especially on mobile screens 
which leads them to re-using same passwords on different sites. This of course 
is a security risk.

The latest version of Chrome (M51) supports the **[Credential Management 
API](http://w3c.github.io/webappsec-credential-management/)**. It's a 
standards-track proposal at the W3C that gives developers programmatic access to 
a browser's credential manager and helps users to sign in more easily.

# What is the Credential Management API?

The Credential Management API enables developers to store and retrieve password 
credentials and federated credentials and it provides 3 functions:

* `navigator.credentials.get()`
* `navigator.credentials.store()`
* `navigator.credentials.requireUserMediation()`

By using these simple APIs, developers can do powerful things like:

* Enable users to sign in with just one tap.
* Remember the federated account the user has used to sign in with.
* Sign users back in without explicit action when session is expired.

**INSERT A SCREENCAST HERE**

In Chrome's implementation, credentials will be stored in Chrome's password 
manager. If a user is signed into Chrome, it can sync the user's passwords 
across devices. Those synced passwords can also be shared with Android apps 
which have integrated the [Smart Lock for Passwords API for 
Android](https://developers.google.com/identity/smartlock-passwords/android/) 
[for a seamless cross-platform 
experience](https://developers.google.com/identity/smartlock-passwords/android/).

# Integrating Credential Management API to your site

The way you use the Credential Management API with your website can vary 
depending on its architecture. Is it a single page app? Is it a legacy 
architecture with page transitions? Is the sign-in form located only at the top 
page? Are sign-in buttons located everywhere? Can users meaningfully browse your 
website without signing in? Does federation work within popup window? Or does it 
require interaction across multiple pages?

It's nearly impossible to cover all those cases, but let's have a look at a 
typical single page app.

* Top page is a registration form
* By tapping on "Sign In" button, users will be navigated to a sign-in form
* Both registration and sign-in form have typical options of id/password 
  credentials and federation, e.g. with Google Sign-In and Facebook Sign-In.

By using Credential Management API, you will be able to add following 
functionalities to the site, for example:

* **Show account chooser when signing in:** Shows a native account chooser UI 
  when a user taps "Sign In".
* **Store credentials:** Upon _successful_ sign-in, store the credential 
  information to the browser's password manager for later use.
* **Let the user automatically sign back in:** Let the user sign back in if a 
  session is expired.
* **Mediate auto sign-in:** Once a user signs out, disable automatic sign-in.

You can experience these features implemented in [a demo 
site](https://credential-management-sample.appspot.com) with [its sample 
code](https://github.com/GoogleChrome/credential-management-sample).

**Note that this API needs to be used on secure origins such as HTTPS domains 
or localhost.**

## Show account chooser when signing in

When a user taps on a "Sign In" button, before navigating to a sign-in form, you 
can use 
[navigator.credentials.get()](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get) 
to get credential information. Chrome will show an account chooser UI from which 
the user can pick an account with which to sign in.

<img src="/web/updates/images/2016/04/credential-management-api/image00.png" />  
_An account chooser UI pops up for user to select an account to sign-in_

### Getting a password credential object:

To show password credentials as account options, use password: true.

{% highlight javascript %}
navigator.credentials.get({  
  password: true, // `true` to obtain password credentials  
}).then(function(cred) {  
  // continuation  
  ...
  
{% endhighlight %}

### Using a password credential to sign in:

Once the user made an account selection, the resolving function will receive a 
password credential. You can send it to the server using fetch():

{% highlight javascript %}
  // continuation from previous example  
}).then(function(cred) {  
  if (cred) {  
    if (cred.type == 'password') {  
      // Construct FormData object  
      var form = new FormData();

      // Append CSRF Token  
      var csrf_token = document.querySelector('csrf_token').value;  
      form.append('csrf_token', csrf_token);

      // You can append additional credential data to `.additionalData`  
      cred.additionalData = form;

      // `POST` the credential object as `credentials`.  
      // id, password and the additional data will be encoded and  
      // sent to the url as HTTP body.  
      fetch(url, {           // Make sure the URL is HTTPS  
        method: 'POST',      // Use POST  
        credentials: cred    // Add the password credential object  
      }).then(function() {  
        // continuation  
      });  
    } else if (cred.type == 'federated') {  
      // continuation

{% endhighlight %}

### Using a federated credential to sign in:

By adding federated with an array of identity providers to options, you can show 
federated accounts to a user to choose.

<img src="/web/updates/images/2016/04/credential-management-api/image01.png" />  
_When multiple accounts are stored in the password manager_

{% highlight javascript %}
navigator.credentials.get({  
  password: true, // `true` to obtain password credentials  
  federated: {  
    providers: [  // Specify an array of IdP strings  
      'https://account.google.com',  
      'https://www.facebook.com'  
    ]  
  }  
}).then(function(cred) {  
  // continuation  
  ...
{% endhighlight %}


You can examine .type of the credential object to see if it's PasswordCredential 
(.type == 'password') or FederatedCredential (.type == 'federated').  
If the credential is a 
[FederatedCredential](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential), 
you can conduct a federation using information it contains.

{% highlight javascript %}
      });  
    } else if (cred.type == 'federated') {  
      // `.provider` contains identity provider string  
      switch (cred.provider) {  
        case 'https://accounts.google.com':  
          // Federated login using Google Sign-In  
          var auth2 = gapi.auth2.getAuthInstance();

          // In Google Sign-In library, you can specify an account  
          // attempt to sign in with by using `login_hint`  
          return auth2.signIn({  
            login_hint: cred.id || ''  
          }).then(function(profile) {  
            // continuation  
          });  
          break;

        case 'https://www.facebook.com':  
          // Federated login using Facebook Login  
          // continuation  
          break;

        default:  
          // show form  
          break;  
      }  
    }  
  // if the credential is `undefined`  
  } else {  
    // show form
{% endhighlight %}

<img src="/web/updates/images/2016/04/credential-management-api/image02.png" />

## Store credentials

When a user signs in to your website using a form, you can use 
[navigator.credentials.store()](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/store) 
to store the credential. The user will be prompted to store it or not. Depending 
on the type of the credential, use [new 
PasswordCredential()](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) 
or [new 
FederatedCredential()](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential) 
to create a credential object you'd like to store.

<img src="/web/updates/images/2016/04/credential-management-api/image03.png" />  
_Chrome asks users if they want to store the credential (or a federation 
provider)_

### Creating and storing a password credential from a form element:

HTML
{% highlight html %}  
<form id="form" method="post"> 
  <input type="text" name="id" autocomplete="username" />  
  <input type="password" name="password" autocomplete="current-password" />  
  <input type="hidden" name="csrf_token" value="******" /> 
</form>
{% endhighlight  %}

JavaScript

{% highlight javascript %}  
var form = document.querySelector('\#form');  
var cred = new PasswordCredential(form);  
// Store it  
navigator.credentials.store(cred)  
.then(function() {  
  // continuation  
});
{% endhighlight %}

By providing autocomplete attributes, the form element's contents will be 
automatically 
[mapped](http://w3c.github.io/webappsec-credential-management/#passwordcredential-form-constructor) 
to 
[PasswordCredential](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) 
object parameters.

### Creating and storing a federated credential:

{% highlight javascript %}  
// After a federation, create a FederatedCredential object using   
// information you have obtained  
var cred = new FederatedCredential({  
  id: id,                                  // The id for the user  
  name: name,                              // Optional user name  
  provider: '[https://account.google.com](https://account.google.com/)',  // A 
string that represents the identity provider  
  iconURL: iconUrl                         // Optional user avatar image url  
});  
// Store it  
navigator.credentials.store(cred)  
.then(function() {  
  // continuation  
});
{% endhighlight %}  

<img src="/web/updates/images/2016/04/credential-management-api/image04.png" />

## Let the user automatically sign back in

When a user leaves your website and comes back later, it's possible that the 
session is expired. Don't bother the user to type their password every time they 
come back. Let the user automatically sign back in.

<img src="/web/updates/images/2016/04/credential-management-api/image05.png" />  
_When a user is automatically signed in, a notification will pop up._

### Getting a credential object:

{% highlight javascript %}  
navigator.credentials.get({  
  password: true, // Obtain password credentials or not  
  federated: {    // Obtain federation credentials or not  
    providers: [  // Specify an array of IdP strings  
      'https://account.google.com',  
      'https://www.facebook.com'  
    ]  
  },  
  unmediated: true // `unmediated: true` lets the user automatically sign in  
}).then(function(cred) {  
  if (cred) {  
    // auto sign-in possible  
    ...  
  } else {  
    // auto sign-in not possible  
    ... 
  }  
});
{% endhighlight %}  

The code should look very similar to what you've seen in "Show account chooser 
when signing in" section. The only difference is "unmediated: true".

This resolves the function immediately and gives you the credential to 
automatically sign the user in. There are a few conditions:

* The user has chosen to allow automatic sign-in
* The user has signed in to the website using Credential Management API before
* The user has only one credential information stored for the origin
* The user did not explicitly sign out in previous session

If any of these conditions are not met, the function will be rejected.

<img src="/web/updates/images/2016/04/credential-management-api/image06.png" />

## Mediate auto sign-in

When a user signs out from your website, **it's your responsibility to ensure 
****that**** the user will not be automatically signed back in**. To ensure 
this, the Credential Management API provides a mechanism called **mediation**. 
You can enable mediation mode by calling 
[navigator.credentials.requireUserMediation()](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation). 
As long as the user's mediation status for the origin is turned on, the 
navigator.credentials.get() with unmediated: true call will resolve with 
undefined.

### Mediating auto sign-in:

{% highlight javascript %}  
navigator.credentials.requireUserMediation();
{% endhighlight %}  

<img src="/web/updates/images/2016/04/credential-management-api/image07.png" />

# FAQ

**Is it possible for JavaScript on the ****website**** to retrieve a raw 
password?**  
No. You can only obtain passwords as a part of PasswordCredential and it's not 
exposable by any means.

**Any plans to support FIDO?**  
No plans at the moment though the API is designed generic enough to support 
things like U2F.

**Is it possible to ****store 3 set of digits for an id**** using Credential 
Management API?**  
Not currently. Your [feedback to the 
specification](https://github.com/w3c/webappsec-credential-management) will be 
highly appreciated.

**Can I use the Credential Management API inside an iframe?**  
The API is restricted to top-level contexts. Calls to `.get()` or `.store()` 
will simply resolve immediately in a frame without any effect.

**Can I integrate my password management Chrome extension with the Credential 
Management API?**  
You may override navigator.credentials and hook it with your Chrome Extension to 
`.get()` / `.store()` credentials.