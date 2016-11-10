project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# Retrieve Credentials {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

When a user lands on your site, retrieve the user's credentials. Use these
credentials to authenticate and sign in the user. Make it as easy a possible
for returning users to sign in, but once a user signs out, disable auto sign-in.

### TL;DR {: .hide-from-toc }

* Authenticate a user's credentials based on the credential type: either
  `PasswordCredential` or `FederatedCredential`.
* Determine the credential type using the credential `.type` property.
* Attempt to auto sign-in a user by requesting a credential object with
  `unmediated:true`.
* When a user signs out, disable auto sign-in by calling
  `navigator.credentials.requireUserMediation()`.

## Get user credentials

To retrieve a user's credential, use `navigator.credentials.get()`: 

    navigator.credentials.get({
      password: true,
      unmediated: true,
      federated: {
        providers: [
          'https://account.google.com',
          'https://www.facebook.com'
        ]
      }
    }).then(function(cred) {
      // examine the credential object
    });

`navigator.credentials.get()` returns a promise that resolves with a
credential object as an argument. The obtained credential object can be either
[`PasswordCredential`](#authenticate_with_a_server) or
[`FederatedCredential`](#authenticate_with_an_identity_provider). If no
credential information exists, `null` gets returned.

### Parameters

A credential includes the following parameters:

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

## Determine credential type

Examine the `.type` property, to determine whether to authenticate via your
server, or through an identity provider.

If the `.type` is federated, examine the `.provider` property to determine
which identity provider. The value in `.provider` must match saved value when
[storing the credential](/web/fundamentals/security/credential-management/store-credentials).

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

## Authenticate with a server

To authenticate the user with a server, obtain and POST the 
`PasswordCredential` to your server using `fetch()`, verify the credential,
then let the user sign in.

POST it directly as if it is a `FormData` object using `fetch()`, including 
`id` and `password`. (`XMLHttpRequest` cannot be used.) The payload is 
`multipart/form-data` encoding by default and looks something like this:

    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="id"

    chromedemojp@gmail.com
    ------WebKitFormBoundaryOkstjzGAv8zab97W
    Content-Disposition: form-data; name="password"

    testtest
    ------WebKitFormBoundaryOkstjzGAv8zab97W--

### Parameters

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

### Change parameters

Change the param keys by assigning a string to `.idName` or `.passwordName`.

You can also add extra parameters such as a CSRF token by assigning a
`FormData` as `.additionalData` property and append key-values to it.

For example:

    }).then(function(cred) {
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
        } else if (cred.type == 'federated') {
          // continuation


You can do a similar thing by assigning a `URLSearchParams` object instead of
a `FormData` to `.additionalData`. In this case, the whole credential object 
is encoded using `application/x-www-form-urlencoded`.

## Authenticate with an identity provider

To authenticate the user with an identity provider, obtain the
`FederatedCredential` and run an identity provider specific authentication
flow. For example, if the provider is Google, use the
[Google Sign-In JavaScript library](/identity/sign-in/web/).

For example:

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


Google Sign-In results in an `id` token as a proof of authentication which
you send to the server to create a session, but it depends on how you want to
manage sessions.

For additional identity providers, please refer to respective documentation:

* [Facebook](https://developers.facebook.com/docs/facebook-login)
* [Twitter](https://dev.twitter.com/web/sign-in/implementing)
* [GitHub](https://developer.github.com/v3/oauth/)

## Auto sign-in a user

To auto sign-in a user, request a credential object with `unmediated: true`,
as soon as they land on your website, for example:

    navigator.credentials.get({
      password: true,
      unmediated: true, // request a credential without user mediation
      federated: {
        providers: [
          'https://account.google.com',
          'https://www.facebook.com'
        ]
      }
    }).then(function(cred) {
      // ...
    });

<figure class="attempt-right">
  <img src="imgs/auto-sign-in.png">
  <figcaption>Notification for auto signed-in user</figcaption>
</figure>

This request resolves immediately with a credential object and won't display
an account chooser. When the browser obtains credential information,
a notification pops up:

<div class="clearfix"></div>


In the case of a `null` value, continue with the user in signed out state.

A `null` value is passed when:

* The user has not acknowledged the automatic sign-in feature (once per
  browser instance).
* The user has either no credentials or more than two credential objects
  stored on the origin.
* The user has requested to require user mediation to the origin.

## Sign in a user via account chooser

If a user requires mediation, or has multiple accounts, use the account
chooser to let the user sign-in, skipping the ordinary sign-in form.

<figure class="attempt-right">
  <img src="imgs/account-chooser.png">
  <figcaption>Account chooser UI</figcaption>
</figure>

The account chooser typically gets invoked when the user taps the
"Sign-In" button. The user can select an account to sign-in, for example:

<div class="clearfix"></div>


To enable the account chooser,
set `unmediated` property to `true`:

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
}).then(function(cred) {
  // ...
});
</pre>

This request resolves with a credential object when the user chooses one of
the accounts.

A `null` value is passed when the user cancels the account chooser.
In the case of a `null` value, proceed to a sign-in form so that the user
can sign in using a different account.

## Disable auto sign-in

When a user signs out of your website, it's your responsibility to ensure
that the user does not automatically get signed back in. To disable auto
sign-in, call
[`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation):

    // After a user signing out...
    navigator.credentials.requireUserMediation();

This lets `navigator.credentials.get()` with `unmediated: true` return a `null`
so auto sign-in won't happen. The status is for the same origin and is stored
to the browser instance.

To resume auto sign-in, a user can choose to intentionally sign-in, for
example, by tapping the "Sign-In" button. In this case, call
`navigator.credentials.get()` with `unmediated: false`.

Moving forward, unless signing out again, the user is always signed back in
whenever they return to the same website.

