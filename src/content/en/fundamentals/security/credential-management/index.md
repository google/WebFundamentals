project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2016-11-08 #}
{# wf_published_on: 2016-11-08 #}

# The Credential Management API {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

The [Credential Management API](https://www.w3.org/TR/credential-management/)
is a standards-based browser API that provides a programmatic interface
between the site and the browser for seamless sign-in, across devices, and
removes friction from your sign-in flows.

<div class="attempt-right">
  <figure>
    <video src="animations/credential-management-smaller.mov" style="max-height: 400px;" autoplay muted loop controls></video>
    <figcaption>User Sign-in Flow</figcaption>
  </figure>
</div>

The Credential Management API:

* **Makes sign-in flow simple** - Users can be automatically signed back into a 
  site, even if their session has expired.
* **Allows one tap sign in with account chooser** - A native account chooser is shown
  eliminating the sign in form.
* **Stores credentials** - Can store either a username & password combination
  or even federated account details.

Want to see it in action? Try the
[Credential Management API Demo](https://credential-management-sample.appspot.com)
and take a look at the
[code](https://github.com/GoogleChrome/credential-management-sample).

<div class="clearfix"></div>


## Steps to implement Credential Management

While there are many ways to successfully integrate the Credential Management
API, and the specifics of an integration depend on the structure and user
experience of the site, sites that use this flow have these user experience
advantages:

* Existing users of your service that have a single credential saved to the
  browser are immediately signed in, and they are redirected to the signed-in
  page as soon as authentication finishes.
* Users that have multiple credentials saved or that have disabled automatic
  sign-in need to respond to one dialog before they go to the website's
  signed-in page.
* When users sign out, the website ensures they are not automatically
  signed back in.

Key Point: Using the Credential Management API requires the page be served
from a secure origin.

### Retrieve user credentials and sign in

To sign the user in, retrieve the credentials from the browser's password
manager and use those to log the user in.

For example:

1. When a user lands on your site and they are not signed in, 
   call `navigator.credential.get()`
2. Use the retrieved credentials to sign the user in.
3. Update the UI to indicate the user has been signed in.

Learn more in
[Retrieve Credentials](/web/fundamentals/security/credential-management/retrieve-credentials).

### Save or update user credentials

If the user signed in with a username and password:

1. After the user successfully signs in, creates an account or changes a
   password, create the `PasswordCredential` with the user ID and
   the password.
2. Save the credential object using `navigator.credentials.store()`.


If the user signed in with a federated identity provider such as Google
Sign-In, Facebook, GitHub, etc:

1. After the user successfully signs in, creates an account or changes a
   password, create the `FederatedCredential` with the user's email address as
   the ID and specify the identity provider with `.provider` 
2. Save the credential object using `navigator.credentials.store()`.

Learn more in
[Store Credentials](/web/fundamentals/security/credential-management/store-credentials).

### Sign out

When the user signs out, call `navigator.credentials.requireUserMediation()`
to prevent the user from being automatically signed back in.

Disabling auto-sign-in also enables users to switch between accounts easily,
for example, between work and personal accounts, or between accounts on
shared devices, without having to re-enter their sign-in information.

Learn more in
[Sign out](/web/fundamentals/security/credential-management/retrieve-credentials#sign-out).


## Additional References

[Credential Management API on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)
