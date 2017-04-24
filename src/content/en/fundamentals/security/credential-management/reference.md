project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-04-14 #}
{# wf_published_on: 2017-04-14 #}

# API Reference {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

The following reference is a portion of the complete [Credential Management API Reference on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API).

## `navigator.credentials.get`

Invoke [`navigator.credentials.get`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/get) to get credential information.

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

## `PasswordCredential`

An obtained [`PasswordCredential`](https://developer.mozilla.org/en-US/docs/Web/API/PasswordCredential) object includes following parameters:

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

## `FederatedCredential`

An obtained [`FederatedCredential`](https://developer.mozilla.org/en-US/docs/Web/API/FederatedCredential) object includes following parameters:

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
        <code>string</code><br>
        User identifer when invoking the identity provider specific
        authentication flow, typically as a value for <code>login_hint</code>
        in OAuth.
      </td>
    </tr>
    <tr>
      <td>
        <code>provider</code>
      </td>
      <td>
        <code>string</code><br>
        ASCII serialization of the origin the provider uses for sign in. 
        For example, Facebook would be represented by 
        <code>https://www.facebook.com</code> and Google by 
        <code>https://accounts.google.com</code>.
      </td>
    </tr>
    <tr>
      <td>
        <code>name</code>
      </td>
      <td>
        <code>string</code> (optional)<br>
        Obtained from the identity provider.
      </td>
    </tr>
    <tr>
      <td>
        <code>iconURL</code>
      </td>
      <td>
        <code>string</code> (optional)<br>
        Obtained from the identity provider.
      </td>
    </tr>
  </tbody>
</table>

## `navigator.credentials.store(cred)`

The [`navigator.credentials.store(cred)`](https://developer.mozilla.org/en-US/docs/Web/API/CredentialsContainer/store) function accepts either the
[`PasswordCredential`](#passwordcredential) or
[`FederatedCredential`](#federatedcredential)
and returns a
[`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
which resolves once the object is persisted, for example: 

    // Get form's DOM object
    var f = document.querySelector('#signup');
    f.addEventListener('submit', e => {

      // Stop submitting form by itself
      e.preventDefault();

      // Try sign-in with AJAX
      fetch(/'signin', {
        method: 'POST',
        body: new FormData(e.target),
        credentials: 'include'
      }).then(res => {
        if (res.status == 200) {
          return Promise.resolve();
        } else {
          return Promise.reject('Sign in failed');
        }
      }).then(profile => {

        // Instantiate `PasswordCredential` with the form
        if (navigator.credentials) {
          var c = new PasswordCredential(e.target);
          return navigator.credentials.store(c);
        } else {
          return Promise.resolve(profile);
        }
      }).then(profile => {

        // Successful sign in
        if (profile) {
          updateUI(profile);
        }
      }).catch(error => {

        // Sign in failed
        showError('Sign-in Failed');
      });
    });


