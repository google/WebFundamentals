project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Latest Updates to the Credential Management API

{# wf_updated_on: 2017-06-07 #}
{# wf_published_on: 2017-06-07 #}
{# wf_tags: performance #}
{# wf_featured_image: /web/updates/images/2017/06/credentials.png #}
{# wf_featured_snippet: Latest updates to the Credential Management API in Chrome 57 and Chrome 60. #}

# Latest Updates to the Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
# Latest Updates to the Credential Management API

## Chrome 57

Chrome 57 introduced this important change to the [Credential Management API](https://developers.google.com/web/fundamentals/security/credential-management).

### Credentials can be shared from a different subdomain 

Chrome can now retrieve a credential stored in a different subdomain using the [Credential Management API](https://developers.google.com/web/fundamentals/security/credential-management).  

For example, if a password is stored in `login.example.com`, a script on `www.example.com` can show it as one of account items in account chooser dialog. When a user taps on the dialog, the password gets passed.

Explicitly store the password using `navigator.credentials.store()`. Once it's stored, the password is available as a credential in the exact same origin www.example.com onward.

In the following screenshot, credential information stored under `login.aliexpress.com` is visible to `m.aliexpress.com` and available for the user to choose from:

![image alt text](/web/updates/images/2017/06/credentials.png)

Important:  **You must explicitly store the credential to the origin. **Users choosing the credentials won’t copy them to the current origin.

**Coming soon: **

Sharing credentials between totally different domains is in development.

## Chrome 60

Chrome 60 introduces several important changes to the [Credential Management API](https://developers.google.com/web/fundamentals/security/credential-management):

* `PasswordCredential` object now includes a password.

* As the custom `fetch()` function is no longer required to fetch the password, it will be deprecated soon.

* `navigator.credentials.get()` now accepts an enum `mediation` instead of boolean flag `unmediated`.

* `requireUserMediation()` renamed to `preventSilentAccess()`.

* New method `navigator.credentials.create()` asynchronously creates credential objects.

Some of the updates described here are explained at Google I/O session - Secure and Seamless Sign-In: Keeping Users Engaged:


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="DBBFK7bvEQo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

### PasswordCredential object now includes password 

The Credential Management API took a conservative approach to handling passwords. It concealed passwords from JavaScript, requiring developers to send the PasswordCredential object directly to their server for validation via an extension to the fetch() API.

But this approach introduced a number of restrictions. We received feedback that developers could not use the API because:

* They had to send the password as part of a JSON object.

* They had to send the hash value of the password to their server.

After performing a security analysis and recognizing that concealing passwords from JavaScript did not prevent all attack vectors as effectively as we were hoping, we have decided to make a change.

The Credential Management API now includes a raw password in a returned credential object so you have access to it as plain text. You can use existing methods to deliver credential information to your server:

navigator.credentials.get({

  password: true,

  federated: {

    provider: [ 'https://accounts.google.com' ]

  },

  mediation: 'silent'

}).then(c => {

  if (c) {

    let form = new FormData();

    form.append('email', c.id);

    form.append('password', c.password);

    form.append('csrf_token', csrf_token);

    return fetch('/signin', {

      method: 'POST',

      credentials: 'include',

      body: form

    });

  } else {

    // Fallback to sign-in form

  }

}).then(res => {

  if (res.status === 200) {

    return res.json();

  } else {

    throw 'Auth failed';

  }

}).then(profile => {

  console.log('Auth succeeded', profile);

});

### Custom fetch will be deprecated soon

Now that passwords return in the PasswordCredential object,** **the custom fetch() function will stop functioning starting Chrome 62. All developers **MUST** make relevant changes to not use a custom fetch().

To determine if you are using a custom fetch() function, check if it uses a PasswordCredential object or a FederatedCredential object as a value of credentials property and remove it, for example:

fetch('/signin', {

  method: 'POST',

  **credentials: c**

})

### navigator.credentials.get() now accepts an enum mediation

Until Chrome 60, navigator.credentials.get() accepted an optional unmediated property with a boolean flag. For example:

navigator.credentials.get({

  password: true,

  federated: {

    provider: [ 'https://accounts.google.com' ]

  },

  unmediated: true

}).then(c => {

  // Sign-in

});

This positive flag instructs the browser to skip a user mediation. The user mediation could happen when:

* A user needs to choose an account to sign-in with.

* A user wants to explicitly sign-in after navigator.credentials.requireUseMediation() call.

The flag is now extended as mediation with 3 option enums:

* 'silent': Equals to unmediated: true. Skip an account chooser.

* 'optional': Equals to unmediated: false. Show an account chooser if needed.

* 'required': A new option. Always show an account chooser. Useful when you want to let a user to switch an account using the native account chooser dialog.

navigator.credentials.get({

  password: true,

  federated: {

    provider: [ 'https://accounts.google.com' ]

  },

  mediation: 'silent'

}).then(c => {

  // Sign-in

});

<table>
  <tr>
    <td></td>
    <td>Number of stored credentials for the origin</td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td>value of mediation</td>
    <td>0</td>
    <td>1</td>
    <td>2+</td>
  </tr>
  <tr>
    <td>'silent'
(unmediated: true)</td>
    <td>Ignored.</td>
    <td>Credential passed without showing an account chooser.</td>
    <td>Ignored.</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>Ignored if "preventSilentAccess()" is called previously.</td>
    <td></td>
  </tr>
  <tr>
    <td>'optional'
(unmediated: false)</td>
    <td>Ignored.</td>
    <td>Credential passed without showing an account chooser.</td>
    <td>Shows an account chooser.</td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td>Shows an account chooser if "preventSilentAccess()" is called previously.</td>
    <td></td>
  </tr>
  <tr>
    <td>'required'</td>
    <td>Ignored.</td>
    <td>Shows an account chooser.</td>
    <td>Shows an account chooser.</td>
  </tr>
</table>


* Technically speaking, "Ignored" resolves navigator.credentials.get() with an argument of undefined.

### requireUserMediation() renamed to preventSilentAccess()

To align nicely with the new mediation property offered in the get() call , the navigator.credentials.requireUserMediation() method has been renamed to navigator.credentials.preventSilentAccess(). 

See above diagram to understand how calling this function affects navigator.credentials.get().

The renamed method prevents passing a credential without a user mediation (showing an account chooser). This is useful when a user signs out of a website or unregisters from one and doesn't want to get signed back in automatically at the next visit.

signoutUser();

if (navigator.credentials) {

  navigator.credentials.preventSilentAccess();

}

### Create credential objects asynchronously with new method navigator.credentials.create()

You now have the option to create credential objects asynchronously with the new method, navigator.credentials.create(). Read on for a comparison between both the sync and async approaches.

#### Creating a PasswordCredential object

##### Sync approach

let c = new PasswordCredential(form);

#### Async approach (new)

let c = await navigator.credentials.create({

  password: form
});

or:

let c = await navigator.credentials.create({

  id: id,

  password: password

});

### Creating a FederatedCredential object

#### Sync approach

let c = new FederatedCredential({

  id:       'agektmr',

  name:     'Eiji Kitamura',

  provider: 'https://accounts.google.com',

  iconURL:  'https://*****'

});

#### Async approach (new)

let c = await navigator.credentials.create({

  id:       'agektmr',

  name:     'Eiji Kitamura',

  provider: 'https://accounts.google.com',

  iconURL:  'https://*****'

});