project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# Retrieve Credentials {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

To sign the user in, retrieve the credentials from the browser's password
manager and use those to log the user in.

To retrieve a user's credential, use `navigator.credentials.get()`, which
returns a promise that resolves with a
credential object as an argument. The obtained credential object can be either
[`PasswordCredential`](#authenticate_with_a_server) or
[`FederatedCredential`](#authenticate_with_an_identity_provider). If no
credential information exists, `null` gets returned.

    navigator.credentials.get({
      password: true,
      unmediated: false,
      federated: {
        providers: [
          'https://account.google.com',
          'https://www.facebook.com'
        ]
      }
    }).then(function(cred) {
      if (cred) {
        // Use provided credential to sign user in  
      }
    });


### `navigator.credentials.get` Parameters {: .hide-from-toc }

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>Parameters</th>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>Boolean</code><br>
        Set to <code>true</code> to retrieve <code>PasswordCredentials</code>.
        Defaults to <code>false</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>federated</code>
      </td>
      <td>
        <code>Object</code><br>
        Object that accepts <code>provider</code> or <code>protocol</code> as
        keys, which has an array of params. Object <code>provider</code>
        accepts an array of strings that identify providers. Currently, no 
        browsers implement <code>protocol</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>unmediated</code>
      </td>
      <td>
        <code>Boolean</code><br>
        Set to <code>true</code> to avoid showing account chooser UI.
      </td>
    </tr>
  </tbody>
</table>

## Get a credential

### Get a credential automatically

To sign a user in automatically, request a credential object with
`unmediated: true`, as soon as they land on your website, for example:

<pre class="prettyprint">
navigator.credentials.get({
  password: true,
  <strong>unmediated: true,</strong> // request a credential without user mediation
  federated: {
    providers: [
      'https://account.google.com',
      'https://www.facebook.com'
    ]
  }
})
</pre>

<figure class="attempt-right">
  <img src="imgs/auto-sign-in.png">
  <figcaption>Notification for auto signed-in user</figcaption>
</figure>

This request resolves immediately with a credential object and won't display
an account chooser. When the browser obtains credential information,
a notification pops up:

<div class="clearfix"></div>


### Get a credential via the account chooser

<figure class="attempt-right">
  <img src="imgs/account-chooser.png">
  <figcaption>Account chooser UI</figcaption>
</figure>

If a user requires mediation, or has multiple accounts, use the account
chooser to let the user sign-in, skipping the ordinary sign-in form.

The account chooser typically gets invoked when the user taps the
"Sign-In" button. The user can select an account to sign-in, for example:

<div class="clearfix"></div>


To enable the account chooser,
set `unmediated` property to `false`:

<pre class="prettyprint">
navigator.credentials.get({
  password: true,
  <strong>unmediated: false,</strong> // request a credential with user mediation
  federated: {
    providers: [
      'https://account.google.com',
      'https://www.facebook.com'
    ]
  }
});
</pre>

Once the user has selected the account they want to use, the promise resolves
with either a `PasswordCredential` or `FederatedCredential` based on their
selection. Then, [determine the credential type](#determine-credential-type)
and authenticate the user with the provided credential.

If the users cancels the account chooser, or there are no credentials stored,
the promise resolves with an `undefined` value. In that case, fall back
to the sign in form experience.




## Determine credential type {: #determine-credential-type }

When the `navigator.credentials.get()` resolves, it will return either 
`undefined` or a Credential object. To determine whether it is a 
`PasswordCredential` or a `FederatedCredential`, simply look at the
`.type` property of the object, which will be either `password` or
`federated`. 

If the `.type` is `federated`, the `.provider` property is a string that
represents the identity provider.

For example:

    if (cred) {
      switch (cred.type) {
        case 'password':
          // authenticate with a server
          break;
        case 'federated':
          switch (cred.provider) {
            case 'https://accounts.google.com':
              // run google identity authentication flow
              break;
            case 'https://www.facebook.com':
              // run facebook identity authentication flow
              break;
          }
          break;
      }
    } else {
      // auto sign-in not possible
    }


In the case of a `undefined` value, continue with the user in signed out state.

A `undefined` value is passed when:

* The user has not acknowledged the automatic sign-in feature (once per
  browser instance).
* The user has either no credentials or more than two credential objects
  stored on the origin.
* The user has requested to require user mediation to the origin.




## Authenticate the user


### Authenticate with a username and password

To authenticate the user with your server, POST the provided 
`PasswordCredential` to the server using `fetch()`.

When POST'ed, `fetch` automaticlly converts the `PasswordCredential` object
to a `FormData` object encoded as `multipart/form-data`:

    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="id"

    chromedemojp@gmail.com
    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="password"

    testtest
    ------WebKitFormBoundaryOkstjzGAv8zab97W--

Note: You cannot use `XMLHttpRequest` to POST the `PasswordCredential` 
to your server.

#### `PasswordCredential` parameters

An obtained `PasswordCredential` object includes following parameters:

<table class="responsive properties">
  <tbody>
    <tr>
      <th colspan=2>Parameters</th>
    </tr>
    <tr>
      <td>
        <code>id</code>
      </td>
      <td>
        <code>String</code><br>
        User identifier string.
      </td>
    </tr>
    <tr>
      <td>
        <code>password</code>
      </td>
      <td>
        <code>String</code><br>
        Opaque password which you can't obtain using JavaScript.
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>String</code><br>
        User name string.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>String</code><br>
        User icon image url string.
      </td>
    </tr>
  </tbody>
</table>

#### Change parameters

In some cases, it may be necessary to add additional data to the
authentication POST.

Change the param keys by assigning a string to `.idName` or `.passwordName`.

You can also add extra parameters such as a cross-site request forgery (CSRF)
token by assigning `.additionalData` to the `FormData` and append 
key-values to it.

Once you get the credential object:

    if (cred) {
      if (cred.type == 'password') {
        // Use `email` instead of `id` for the id
        cred.idName = 'email';

        // Append CSRF Token
        var csrf_token = document.querySelector('#csrf_token').value;
        var form = new FormData();
        form.append('csrf_token', csrf_token);

        // Append additional credential data to `.additionalData`
        cred.additionalData = form;

        // `POST` the credential object.
        // id, password and the additional data will be encoded and
        // sent to the url as the HTTP body.
        fetch(url, {           // Make sure the URL is HTTPS
          method: 'POST',      // Use POST
          credentials: cred    // Add the password credential object
        }).then(function() {
          // continuation
        });
      }
    }

You can do a similar thing by assigning a `URLSearchParams` object instead of
a `FormData` to `.additionalData`. In this case, the whole credential object 
is encoded using `application/x-www-form-urlencoded`.

### Authenticate with an identity provider

To authenticate the user with an identity provider, simply use the 
specific authentication flow with the `FederatedCredential`.

For example, if the provider is Google, use the
[Google Sign-In JavaScript library](/identity/sign-in/web/):

    // Instantiate an auth object
    var auth2 = gapi.auth2.getAuthInstance();

    // Is this user already signed in?
    if (auth2.isSignedIn.get()) {
      var googleUser = auth2.currentUser.get();
      
      // Same user as in the credential object?
      if (googleUser.getBasicProfile().getEmail() === id) {
        // Continue with the signed-in user.
        return Promise.resolve(googleUser);
      }
    }
    
    // Otherwise, run a new authentication flow.
    return auth2.signIn({
      login_hint: id || ''
    });


Google Sign-In results in an id token as a proof of authentication which
you send to the server to create a session.

For additional identity providers, please refer to respective documentation:

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Twitter](https://dev.twitter.com/web/sign-in/implementing)
* [GitHub](https://developer.github.com/v3/oauth/)



## Sign out {: #sign-out }

When a user signs out of your website, it's your responsibility to ensure
that the user is not automatically signed in on their next visit. To turn off
auto sign-in, call
[`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation):

    // After a user signing out...
    navigator.credentials.requireUserMediation();

Then, if `navigator.credentials.get()` is called with `unmediated: true`, it
will return `undefined` and the user will not be signed in. This is only 
remembered for the current browser instance for this origin.

To resume auto sign-in, a user can choose to intentionally sign-in, by
choosing the account they wish to sign in with, from the account chooser. Then,
the user is always signed back in, until they explictly sign out.

