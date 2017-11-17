project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-07-13 #}
{# wf_published_on: 2016-11-08 #}

# The Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

The [Credential Management API](https://www.w3.org/TR/credential-management/)
is a standards-based browser API that provides a programmatic interface
between the site and the browser for seamless sign-in across devices.

The Credential Management API:

* **Removes friction from sign-in flows** - Users can be automatically signed back into a site even if their session has expired or they saved credentials on another device.
* **Allows one tap sign in with account chooser** - Users can choose an account in a native account chooser.
* **Stores credentials** - Your application can store either a username and password combination or even federated account details. These credentials can be synced across devices by the browser.

Key Point: Using the Credential Management API requires the page be served
from a secure origin.

Want to see it in action? Try the
[Credential Management API Demo](https://credential-management-sample.appspot.com)
and take a look at the
[code](https://github.com/GoogleChrome/credential-management-sample).

<div class="clearfix"></div>

### Check Credential Management API browser support

Before using the Credential Management API,
first check the API is supported,
and that the version of the API is compatible with your code.

[Updates to the Credential Management API](/web/updates/2017/06/credential-management-updates)
landed in Chrome 60.
These updates contain backward incompatible changes.
To check that your implementation isn't triggered in older versions of the API,
see if `preventSilentAccess exists`:

    if (navigator.credentials && navigator.credentials.preventSilentAccess) {
      // The new Credential Management API is available
    }

For more information, see the
[Chrome 60 migration guide](https://docs.google.com/document/d/154cO-0d5paDFfhN79GNdet1VeMUmELKhNv3YHvVSOh8).

### Sign in user

To sign in the user, retrieve the credentials from the browser's password
manager and use them to log in the user.

For example:

1. When a user lands on your site and they are not signed in, 
   call [`navigator.credentials.get()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get).
2. Use the retrieved credentials to sign in the user.
3. Update the UI to indicate the user has been signed in.

Learn more in
[Sign In Users](/web/fundamentals/security/credential-management/retrieve-credentials#auto-sign-in).

### Save or update user credentials

If the user signed in with a federated identity provider such as Google
Sign-In, Facebook, GitHub:

1. After the user successfully signs in or creates an account, create the [`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential) with the user's email address as
   the ID and specify the identity provider with `FederatedCredentials.provider`.
2. Save the credential object using [`navigator.credentials.store()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/store).

Learn more in
[Sign In Users](/web/fundamentals/security/credential-management/retrieve-credentials#federated-login).

If the user signed in with a username and password:

1. After the user successfully signs in or creates an account, create the [`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) with the user ID and
   the password.
2. Save the credential object using [`navigator.credentials.store()`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/store).

Learn more in
[Save Credentials from Forms](/web/fundamentals/security/credential-management/save-forms).

### Sign out

When the user signs out, call [`navigator.credentials.preventSilentAccess()`](/web/fundamentals/security/credential-management/retrieve-credentials#turn_off_auto_sign-in_for_future_visits)
to prevent the user from being automatically signed back in.

Disabling auto-sign-in also enables users to switch between accounts easily,
for example, between work and personal accounts, or between accounts on
shared devices, without having to re-enter their sign-in information.

Learn more in
[Sign out](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out).
