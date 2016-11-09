project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_published_on: 2015-09-28 #}
{# wf_updated_on: 2016-08-24 #}

# Store Credentials {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Keep credential information always sane and up-to-date
in the password manager so your users stay engaged.

### TL;DR {: .hide-from-toc }

* Call `navigator.credentials.store()` to store user credentials.
* To store user credentials from a log-in form, use `autocomplete`
in your input fields and then instatiate the `PasswordCredential` object.
* To store credentials from a user's federated account,
use the `FederatedCredential` object instead of the `PasswordCredential` object.

## Store a user's password credential

After a user successfully signs up,
signs in, or changes a password,
store or update the user's credential.

To do so,
instantiate a `PasswordCredential` based on submitted information and
call `navigator.credentials.store()` to store the credential:

<pre class="prettyprint">
// After a successful sign-in, sign-up or password change,
// Instantiate a `PasswordCredential` object
var c = new PasswordCredential({
  id:       id,
  password: password,
  name:     name,
  iconrURL: iconUrl
});


// Store the credential
navigator.credentials.store(c)
.then(function() {
  // done
});
</pre>

When the Chrome browser obtains credential information,
a notification pops up asking to store a credential
(or federation provider):

<figure>
  <img src="imgs/store-credential.png">
  <figcaption>Notification for auto signed-in user</figcaption>
</figure>

## Store a credential from a form element

Mapping form input values into a `PasswordCredential` is non-trivial.

In order to do so,
you must explicitly annotate input fields in a form and
then instantiate one directly from the form element.

Anotate the input fields, `id` and `password`,
using [autocomplete](https://html.spec.whatwg.org/multipage/forms.html#autofill) attributes
(`username` for `id`, `current-password` or `new-password` for `password`).

Example HTML:

    <form id="form" method="post">
      <input type="text" name="id" autocomplete="username" />
      <input type="password" name="password" autocomplete="current-password" />
      <input type="hidden" name="csrf_token" value="*****" />
    </form>

Then instantial the `PasswordCredential` object to auto-assign values.

Example JavaScript:

<pre class="prettyprint">
var form = document.querySelector('#form');
var cred = new PasswordCredential(form);
// Store it
navigator.credentials.store(cred)
.then(function() {
  // continuation
});
</pre>

<aside class="note"><b>Note:</b>`.additionalData` also gets added automatically.</aside>

## Store a credential for a federated account

Once a user successfully authenticates with an identity provider,
store the account information in the password manager.

Instead of a `PasswordCredential`,
instantiate a `FederatedCredential`
and store both the user's identifier and the provider's identifier.

Then call `navigator.credentials.store()` to store the credential.

For example:

<pre class="prettyprint">
// After a successful federation, instantiate a FederatedCredential
var cred = new FederatedCredential({
  id:       id,                           // id in IdP
  provider: 'https://account.google.com', // A string representing IdP
  name:     name,                         // name in IdP
  iconURL:  iconUrl                       // Profile image url
});


// Store it
navigator.credentials.store(cred)
.then(function() {
  // continuation
});
</pre>

Use the `id` string as a user identifer
when invoking the identity provider specific authentication flow,
typically as a value for `login_hint` in OAuth.

The `provider` string must be identified by the ASCII serialization of the origin
the provider uses for sign in.
For example, Facebook would be represented by https://www.facebook.com and
Google by https://accounts.google.com.

The `name` and `iconURL` are optional,
but it's highly likely you can obtain them from the identity provider,
so you should use them.
