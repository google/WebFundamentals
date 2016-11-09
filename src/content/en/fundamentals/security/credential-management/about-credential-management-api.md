project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2015-11-08 #}

# About Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Add the following features to your site using the
[Credential Management API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API):

* <strong>Show an account chooser when signing in:</strong>
Show a native account chooser UI when a user taps "Sign In".
* <strong>Store and update credentials:</strong>
Upon successful sign-in, offer to store credential information to the browser's password manager for later use. Also check for changes to existing credentials, and store updates.
* <strong>Let the user automatically sign back in:</strong>
Let the user sign back in if a session has expired.
* <strong>Disable auto sign-in:</strong>
Once a user signs out, disable automatic sign-in for the user's next visit.

<aside class="note"><b>Note:</b>This API must be used on secure origins
on top level context.</aside>

## User sign-in flow

Watch the user sign-in flow for a
[demo website](https://credential-management-sample.appspot.com) 
that uses the Credential Management API
(see also the
[sample code](https://github.com/GoogleChrome/credential-management-sample)).
With the Credential Management API,
users can sign-in using a third-party credential
(for example, Google or Facebook account),
register a new account, or sign-in using a previously registered account.

<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" autoplay muted loop controls></video>
    <figcaption>User Sign-in Flow</figcaption>
  </figure>
</div>

Existing user credentials are saved to the browser, so users are immediately signed-in.
Users that have multiple credentials saved or that have disabled automatic-sign in,
will need to sign back in.

While there are many ways to successfully integrate the Credential Management API,
and the specifics of an integration depend on the structure and user experience of the site,
sites that use this flow have these user experience advantages:

* Existing users of your service that have a single credential saved to the browser are immediately signed in, and they are redirected to the signed-in page as soon as authentication finishes.
* Users that have multiple credentials saved or that have disabled automatic sign-in need to respond to one dialog before they go to the website's signed-in page.
* When users sign out, the website ensures they are not automatically signed back in.

## Steps to implement Credential Management

The three main steps to implement credential management are:

1. Retrieve user credentials.
2. Save user credentials.
3. Disable auto sign-in when user signs out.

### Retrieve user credentials

To retrieve user credentials:

1. When a user lands on your site and no signed in sessions are available,
call `navigator.credential.get()` with `unmediated: true`.
2. If auto sign-in didn't happen,
try sign-in upon user tapping on "Sign-In" button by calling
`navigator.credential.get()` with `unmediated: false`.
3. Once a credential is retrieved,
authenticate depending on the credential type:
[PasswordCredential](/web/fundamentals/security/credential-management/retrieve-credentials#authenticate_with_a_server) or
[FederatedCredential](/web/fundamentals/security/credential-management/retrieve-credentials#authenticate_with_an_identity_provider).

Learn more in
[Retrieve Credentials](/web/fundamentals/security/credential-management/retrieve-credentials).

### Save user credentials

To save user credentials:

1. After the user successfully signs in,
creates an account or changes a password via AJAX,
create the `PasswordCredential` with the user ID and the password.
2. Save the credential object using `navigator.credentials.store()`.
3. If the user signed in with a federated identity provider such as Google Sign-In,
create the `FederatedCredential` with the user's email address as the ID and
specify the identity provider with `.provider` and store the object instead.

Learn more in
[Store Credentials](/web/fundamentals/security/credential-management/store-credentials).

### Disable auto sign-in

When the user signs out, call `navigator.credentials.requireUserMediation()`
to prevent the user from automatically signing back in.

Disabling auto-sign-in also enables users to switch between accounts easily,
for example, between work and personal accounts, or between accounts on shared devices,
without having to re-enter their sign-in information.

Learn more in
[Disable auto sign-in](/web/fundamentals/security/credential-management/retrieve-credentials#disable_auto_sign-in).
