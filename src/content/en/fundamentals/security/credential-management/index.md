project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# The Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

The [Credential Management API](https://www.w3.org/TR/credential-management/)
is a standards-based browser API that provides a programmatic interface
between the site and the browser for seamless sign-in across devices.

<!--Todo: replace this image with something much better.
<div class="attepmt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>User Sign-in Flow</figcaption>
  </figure>
</div>-->

The Credential Management API:

* **Removes friction from sign-in flows** - Users can automatically sign back into a 
  site, even if their session has expired.
* **Allows one tap sign in with account chooser** - Users can choose an account in a native account chooser, for example Google account chooser, eliminating the sign-in form.
* **Stores credentials** - Your application can easily store account details, either federated account details, username & password, or a combination of both.
* **Secures credentials** - When users sign out or disable automatic sign-in, they won't be automatically signed in.

Key Point: Using the Credential Management API requires the page be served
from a secure origin.

Want to see it in action? Try the
[Credential Management API Demo](https://credential-management-sample.appspot.com)
and take a look at the
[code](https://github.com/GoogleChrome/credential-management-sample).

<div class="clearfix"></div>

### Sign in user

To sign the user in, retrieve the credentials from the browser's password
manager and use those to log the user in.

For example:

1. When a user lands on your site and they are not signed in, 
   call [`navigator.credential.get()`](/web/fundamentals/security/credential-management/reference#navigatorcredentialsget).
2. Use the retrieved credentials to sign the user in.
3. Update the UI to indicate the user has been signed in.

Learn more in
[Sign In User](/web/fundamentals/security/credential-management/retrieve-credentials#auto-sign-in).

### Save or update user credentials

If the user signed in with a federated identity provider such as Google
Sign-In, Facebook, GitHub, etc:

1. After the user successfully signs in, creates an account or changes a
   password, create the [`FederatedCredential`](/web/fundamentals/security/credential-management/reference#federatedcredential) with the user's email address as
   the ID and specify the identity provider with `.provider`.
2. Save the credential object using [`navigator.credentials.store()`](/web/fundamentals/security/credential-management/reference#navigatorcredentialsstorecred).

Learn more in
[Sign In User](/web/fundamentals/security/credential-management/retrieve-credentials#federated-login).

If the user signed in with a username and password:

1. After the user successfully signs in, creates an account or changes a
   password, create the [`PasswordCredential`](/web/fundamentals/security/credential-management/reference#passwordcredential) with the user ID and
   the password.
2. Save the credential object using [`navigator.credentials.store()`](/web/fundamentals/security/credential-management/reference#navigatorcredentialsstorecred).

Learn more in
[Save Credentials from Forms](/web/fundamentals/security/credential-management/save-forms).

### Sign out

When the user signs out, call [`navigator.credentials.requireUserMediation()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/requireUserMediation)
to prevent the user from being automatically signed back in.

Disabling auto-sign-in also enables users to switch between accounts easily,
for example, between work and personal accounts, or between accounts on
shared devices, without having to re-enter their sign-in information.

Learn more in
[Sign out](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out).
