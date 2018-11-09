project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Learn how to design and implement reauth UX in your website using WebAuthn standard and a fingerprint sensor.

{# wf_updated_on: 2018-11-09 #}
{# wf_published_on: 2018-11-09 #}
{# wf_tags: webauthn, credentials, sign-in #}
{# wf_featured_image: /web/updates/images/2018/11/webauthn-reauth-ux.png #}
{# wf_featured_snippet: Learn how to design and implement reauth UX in your website using WebAuthn standard and a fingerprint sensor. #}
{# wf_blink_components: Blink>WebAuthentication #}

# Implementing fingerprint reauthentication UX with WebAuthn {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

<style>
  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 226px;
    text-align: center;
  }
</style>

## Introduction

[WebAuthn (Web Authentication API)](https://www.w3.org/TR/webauthn/) is a new
web standard that enables developers to provide stronger authentication on the
web. It's [shipped in
Chrome](/web/updates/2018/05/webauthn), Firefox,
and Edge. Webkit is also
[actively](https://webkit.org/status/#feature-web-authentication)  [implementing
it](https://webkit.org/status/#feature-web-authentication).

WebAuthn defines a JavaScript API in web browsers to handle credentials from
authenticators.  Authenticators are hardware devices that can generate a
cryptographic key pair for a user and the origin of a website. They have various
form factors and transports to exchange data with a client app like a browser.
One form factor of authenticators is a security key.

<img src="/web/updates/images/2018/11/webauthn-security-keys.jpg" />

The security keys shown above are [Google Titan Security
Keys](https://cloud.google.com/titan-security-key/) which support NFC, BLE, and
USB transports.

With security keys, a website can ensure that the user trying to sign in
possesses a particular device and is physically present with it (via a 'tap').
Along with a password (what you know), security keys (what you have) can provide
one factor in two-factor authentication scenarios.

<img src="/web/updates/images/2018/11/webauthn-fingerprint.png" width="344" height="295">

Other authenticator examples include fingerprint sensors that are built into
devices. While security keys require consumers to purchase separate pieces of
hardware, owners of fingerprint-enabled devices can more quickly become a
potential customer of your WebAuthn-enabled website.

Key Point: This article highlights fingerprint sensor specifically; however,
authenticators can support other biometric form factors such as facial
recognition. For example, Windows Hello provides a facial recognition
authenticator for Microsoft Edge (support in Chrome is in development). This
article will use the term "biometric" instead of fingerprint.

WebAuthn can help you with various scenarios. In this article, we'll guide you
through how to design and implement a reauthentication scenario using WebAuthn
with a biometric sensor on Android or macOS.

## What is reauthentication?
Reauthentication is the process of re-verifying a user’s identity on a website
where they have signed in before. This might be done when a user returns to a
sensitive site (a bank for example) after some time, or when the user attempts
to perform a financial transaction or access/change sensitive information, like
a password or shipping address.

With WebAuthn and biometrics, we can simplify reauthentication so it’s as easy
as a tap of a finger, promoting better security by reducing password usage.

Let's start by seeing how a biometric-based reauth experience might look.

## User experience
### Credential registration
Users have to enroll their credentials to get started. Let’s look at a mobile
banking example:

<table class="centered-table">
<tr>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-1.png" width="226"
height="404" />
1. The user visits the bank website
</div></td>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-2.png" width="226"
height="404" />
2. The sign-in process starts with the user’s account identifier
</div></td>
</tr>
<tr>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-3.png" width="226"
height="404" />
3. The user is prompted for their password (and optionally a second factor)
</div></td>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-4.png" width="226"
height="404" />
4. After signing in, the site shows a promo to enable future sign-ins with a fingerprint
</div></td>
</tr>
<tr>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-5.png" width="226"
height="404" />
5. Accepting the prompt opens a browser dialog
</div></td>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-6.png" width="226"
height="404" />
6. The user taps on a fingerprint sensor on their device, the dialog closes, and fingerprint reauth is enabled
</div></td>
</tr>
</table>

Note: Your biometric information like fingerprint data won't leave the device.
It's securely stored in an area that software can't access directly. This means
users can only register their biometric info and use it in a device-specific
manner, and must enroll each device separately.

### Reauthentication:

After registering a credential, any future authentication can be performed with
a fingerprint.

<table>
<tr>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-1.png" width="226"
height="404" />
1. The user comes back to the website
</div></td>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-5.png" width="226"
height="404" />
2. A browser dialog is triggered to verify the user’s identity with a fingerprint instead of password 
</div></td>
</tr>
<tr>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-7.png" width="226"
height="404" />
3. The user taps on the fingerprint sensor
</div></td>
<td>
<div class="centered">
<img src="/web/updates/images/2018/11/webauthn-flow-6.png" width="226"
height="404" />
4. The user is successfully signed-in. (When fingerprint reauth is not successful, you may fallback to sign-in with a password)
</div></td>
</tr>
</table>


Note: In this banking example, users need to reauthenticate every time they
visit. Some sites permanently sign in users and only require them to
reauthenticate when stricter security is required. For example ecommerce
websites may want to implement this design, so users can explore the shop
already signed in to maintain state like a shopping basket, and only request
reauthentication when they proceed to make a sensitive purchase.

Now, let's dive into the implementation details of biometric reauthentication.

Warning: The following sections are targeted at developers who already
understand the basics of how WebAuthn works. If you are new, [this
tutorial](https://slides.com/fidoalliance/jan-2018-fido-seminar-webauthn-tutorial)
will be a great start.

## Registering a credential

Before performing reauthentication, a user must register a credential using a
biometric-enabled authenticator.

## Request a credential creation options

We start by creating an object that will be passed to the Credential Management
API's `create()` function as an option. A `PublicKeyCredentialCreationOptions`
looks something like this.

```js
const options = {
  rp: ...,
  user: ...,
  challenge: ... 
  pubKeyCredParams: ...,
  // excludeCredentials: [],
  authenticatorSelection: {
    authenticatorAttachment: 'platform',
    // requireResidentKey: false,
    userVerification: 'required'
  },
  attestation: 'none'
};
```

Let's have a look at key properties specific to biometric reauth.

`authenticatorSelection.authenticatorAttachment` should be '`platform`' as we
expect users to use a platform authenticator. Platform authenticators are so
named because they are built into the platform itself. This includes fingerprint
sensors attached to Android or macOS devices and facial recognition mechanisms
through cameras on Windows devices. If you choose '`cross-platform`', users may
use authenticators that are detachable from the platform they are using.

`authenticatorSelection.userVerification` should be '`required`'. "**User
Verification**" requests an authenticator to verify the user identity using
methodologies such as fingerprint, facial recognition, PIN, etc. This makes an
authentication stronger by adding "who you are" in addition to "what you have",
which can prove "**User Presence**". Simple tap-based security key should be
sufficient to attest "User Presence".

![](/web/updates/images/2018/11/webauthn-three-factors.png)

Note: User verification with a PIN in Chrome in development as of ver. 71.

Note: You can check in advance whether a user has a platform UV (User Verifying)
authenticator by calling
`PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()`. It
returns a promise that resolves to `true` if available.

`excludeCredentials` is used to prevent creating multiple credentials for the
same origin using the same authenticator by providing a list of already
registered credentials. In reauth case, you don't have to worry about
duplication so you can pass an empty array or simply not include
`excludeCredentials` at all.

`attestation` should be '`none`'. Attestation is data that describes the
authenticator device model and provides a preference if you want to receive one
or not. A server can use returned attestations to make sure that the user is
using a valid authenticator.

We discourage using attestations unless you are using WebAuthn for an enterprise audience.

We recommend constructing this object server-side and passing it to a browser
base64url encoded.

Browser side:
```js
  // Request a credential creation options
  const options = await this._fetch('/makeCred');
```

Server side:
```js
router.post('/makeCred', sessionCheck, async (req, res) => {
  const profile = req.session.profile;

  const response = {};
  response.rp = {
    id: req.host,
    name: 'Example'
  };
  response.user = {
    displayName: profile.displayName,
    // Randomly generate a user id and BASE64URL encode it
    id: createBase64Random(),
    name: profile.name
  };
  response.pubKeyCredParams = [{
    type: 'public-key', alg: -7
  }, {
    type: 'public-key', alg: -257
  }];
  response.timeout = 1000 * 30;
  // Randomly generate a challenge and BASE64URL encode it
  response.challenge = createBase64Random();
  req.session.challenge = response.challenge;

  const as = {}; // authenticatorSelection
  as.authenticatorAttachment = 'platform';
  as.userVerification = 'required';

  response.authenticatorSelection = as;
  response.attestation = 'none';

  res.json(response);
});
```

### Create a credential

Based on the object you just received from the server, call the Credential
Management API's `create()` function to create a public key after decoding it.

```js
  options.user.id = base64url.decode(options.user.id);
  options.challenge = base64url.decode(options.challenge);

  const cred = await navigator.credentials.create({
    publicKey: options
  });
```

This should prompt the user to verify their identity using a fingerprint, etc.

<img src="/web/updates/images/2018/11/webauthn-fingerprint.png" width="344" height="295">

Once a user verifies their identity, you’ll receive a public-key credential.

### Register the credential
The public-key credential should be verified and stored for future use. The
resultant `PublicKeyCredential` looks like this:

```js
{
  id: ...,
  rawId: ...,
  type: 'public-key',
  response: {
    clientDataJSON: ...,
    attestationObject: ...,
    signature: ...,
    userHandle: ...
  }
}
```

Encode the necessary part of it with base64url and pass it back to a server to
verify.

```js
  // Encode the credential
  const encodedCred = {};
  if (cred.id)    encodedCred.id =     cred.id;
  if (cred.type)  encodedCred.type =   cred.type;
  if (cred.rawId) encodedCred.rawId =  base64url.encode(cred.rawId);

  const clientDataJSON =
    base64url.encode(cred.response.clientDataJSON);
  const attestationObject =
    base64url.encode(cred.response.attestationObject);
  const signature =
    base64url.encode(cred.response.signature);
  const userHandle =
    base64url.encode(cred.response.userHandle);
  encodedCred.response = {
    clientDataJSON,
    attestationObject,
    signature,
    userHandle
  };

  const profile = await this._fetch('/regCred', encodedCred);
```

On the server, verify the credential by

-   Checking if the `challenge` in `clientDataJSON` matches the one you left in
    the session
-   Checking if the `origin` in `clientDataJSON` matches your serving origin

The server side code would look like this:

```js
router.post('/regCred', sessionCheck, async (req, res) => {
  const profile = req.session.profile;
  const challenge = req.session.challenge;
  const origin = `${req.protocol}://${req.get('host')}`;

  const credId = req.body.id;
  const type = req.body.type;
  const response = req.body.response;
  if (!credId || !type || !response) {
    res.status(400).send('`response` missing in request');
    return;
  }

  try {
    const clientDataJSON = response.clientDataJSON;
    const clientData = JSON.parse(base64url.decode(clientDataJSON));

    // Verify challenge
    if (clientData.challenge !== challenge)
      throw 'Wrong challenge code.';

    // Verify origin
    if (clientData.origin !== origin)
      throw 'Wrong origin.';

    const credentialData = {
      credId: credId,
      type: type,
      transports: ['internal'],
      created: (new Date()).getTime(),
      last_used: null
    };

    const store = new CredentialStore();
    const _profile = await store.get(profile.id);
    if (!_profile.reauthKeys) {
      _profile.reauthKeys = [];
    }
    _profile.reauthKeys.push(credentialData);

    // Ignore authenticator for the moment
    await store.save(profile.id, _profile);

    res.json(profile);
  } catch (e) {
    res.status(400).send(e);
  }
});
```

Note: In this code `transports` is hardcoded with `internal` as it's a platform
authenticator, however you should use `getTransports()` function of
`PublicKeyCredential` to obtain one once [it's
standardized](https://github.com/w3c/webauthn/pull/1050) and implemented in
browsers.

After verification is done, register the credential by storing the credential
id. Store the credential both to a server and to a browser's local storage, as
it is strongly tied to the device with the platform authenticator. Don't worry
about leaking the credential; it's a public key.

```js
  localStorage.setItem('reauth_key', credId);
```

Now the user's credential is registered and you are ready to perform reauth.

Here's the complete code of frontend.

```js
async registerReauthKey() {
  // Feature detection
  if (!window.PublicKeyCredential)
    throw 'WebAuthn not supported on this browser.';

  // If reauth key is already registered, no need to register
  const credId = localStorage.getItem('reauth_key');
  if (credId !== null)
    throw 'Reauth key already registered.';

  // Request credential creation options
  const options = await this._fetch('/makeCred');

  // Decode the options
  options.user.id = base64url.decode(options.user.id);
  options.challenge = base64url.decode(options.challenge);

  // Create a public key credential
  const cred = await navigator.credentials.create({
    publicKey: options
  });

  const encodedCred = {};
  if (cred.id)    encodedCred.id =     cred.id;
  if (cred.type)  encodedCred.type =   cred.type;
  if (cred.rawId) encodedCred.rawId =  base64url.encode(cred.rawId);

  const clientDataJSON =
    base64url.encode(cred.response.clientDataJSON);
  const attestationObject =
    base64url.encode(cred.response.attestationObject);
  const signature =
    base64url.encode(cred.response.signature);
  const userHandle =
    base64url.encode(cred.response.userHandle);
  encodedCred.response = {
    clientDataJSON,
    attestationObject,
    signature,
    userHandle
  };

  // Verify the credential
  const profile = await this._fetch('/regCred', encodedCred);

  // Store the credential id locally
  localStorage.setItem('reauth_key', parsedCred.id);;

  return parsedCred.id;
}
```

## Performing reauthentication
When reauthentication is required, before calling WebAuthn, make sure that

-   The user has a locally stored and registered credential
-   The device has a user verifying platform authenticator

Warning: Always fallback to username/password entry form if reauthentication
using WebAuthn is not possible. Since reauthentication adds friction to user
flows, you should only reauthenticate the user when it’s essential to do so.

### Request a credential request options

We start by creating an object that will be passed to the Credential Management
API's `get()` function as an option. A `PublicKeyCredentialRequestOptions` looks
something like this.

```js
const options = {
  challenge: ...,
  allowCredentials: [{
    id: ..., // credential id
    type: 'public-key',
    transports: ['internal'] // platform authenticator
  }],
  userVerification: 'required'
};
```

Let's have a look at key properties specific to the reauth use case.

`userVerfiication` should be '`required`' to limit the request to user verifying
authenticator.

`allowCredentials` lists the authenticators that have been previously
registered. In a reauth case, you are supposed to provide a single credential
descriptor that matches the one stored locally.

Browser side:
```js
  // If reauth key is not registered, abort
  const credId = localStorage.getItem('reauth_key');
  if (credId === null)
    throw 'Reauth key not registered.';

  // Request credential request options
  const url =`/reauth?key=${encodeURIComponent(credId)}`;
  const options = await this._fetch(url);
```

Server side:
```js
router.get('/reauth', sessionCheck, async (req, res) => {
  const key = req.query.key;

  const response = {};
  response.userVerification = 'required';
  response.challenge = createBase64Random();

  req.session.challenge = response.challenge;

  response.allowCredentials = [{
    id: key,
    type: 'public-key',
    transports: ['internal']
  }];

  res.json(response);
});
```

### Get a credential

Based on the object you just received from the server, call the Credential
Management API's `get()` function to get a public key after decoding it.

```js
  // Decode the options
  options.challenge = base64url.decode(options.challenge);

  if (options.allowCredentials) {
    for (let cred of options.allowCredentials) {
      cred.id = base64url.decode(cred.id);
    }
  }

  // Get a public key credential
  const cred = await navigator.credentials.get({
    publicKey: options
  });
```

This should prompt a user to verify the identity using fingerprint, etc.

<img src="/web/updates/images/2018/11/webauthn-fingerprint.png" width="344" height="295">

Once a user verifies identity, you will receive a public-key credential.

### Verify the credential and authenticate

The public-key credential should be verified before authenticating the user.
This looks very similar to the object you received when registering an
authenticator, except that `response.attestationObject` is replaced with
`response.authenticatorData`.

```js
{
  id: ...,
  rawId: ...,
  type: 'public-key',
  response: {
    clientDataJSON: ...,
    authenticatorData: ...,
    signature: ...,
    userHandle: ...
  }
}
```

Encode the necessary part of it with base64url and pass it back to a server to
verify.

```js
  // Encode the credential
  const encodedCred = {};
  if (cred.id)    encodedCred.id =     cred.id;
  if (cred.type)  encodedCred.type =   cred.type;
  if (cred.rawId) encodedCred.rawId =  base64url.encode(cred.rawId);

  const clientDataJSON =
    base64url.encode(cred.response.clientDataJSON);
  const authenticatorData =
    base64url.encode(cred.response.authenticatorData);
  const signature =
    base64url.encode(cred.response.signature);
  const userHandle =
    base64url.encode(cred.response.userHandle);
  encodedCred.response = {
    clientDataJSON,
    authenticatorData,
    signature,
    userHandle
  };

  // Verify the credential
  return await this._fetch('/verifyReauth', encodedCred);
```

On the server, verify the credential by
-   Checking if the challenge in clientDataJSON matches the one you left in the
    session
-   Checking if the origin in clientDataJSON matches your serving origin
-   Checking that the credential id matches the one stored to database

You can use almost identical code as registering a credential, except checking
whether the credential id is stored in the database.

Server side:
```js
router.post('/verifyReauth', sessionCheck, async (req, res) => {
  const profile = req.session.profile;
  const challenge = req.session.challenge;
  const origin = `${req.protocol}://${req.get('host')}`;

  const credId = req.body.id;
  const type = req.body.type;
  const response = req.body.response;
  if (!credId || !type || !response) {
    res.status(400).send('`response` missing in request');
    return;
  }

  try {
    const clientDataJSON = response.clientDataJSON;
    const clientData = JSON.parse(base64url.decode(clientDataJSON));

    // Verify challenge
    if (clientData.challenge !== challenge)
      throw 'Wrong challenge code.';

    // Verify origin
    if (clientData.origin !== origin)
      throw 'Wrong origin.';

    const store = new CredentialStore();
    const _profile = await store.get(profile.id);
    let authr = null;
    if (_profile.reauthKeys) {
      for (let _authr of _profile.reauthKeys) {
        if (_authr.credId === credId) {
          authr = _authr;
          break;
        }
      }
    }
    if (!authr) {
      res.status(400).send('Matching authenticator not found');
      return;
    }

    // Update timestamp
    const now = (new Date()).getTime();
    authr.last_used = now;
    profile.last_auth = now;

    // Ignore authenticator for the moment
    store.save(profile.id, _profile);

    res.json(profile);
  } catch (e) {
    res.status(400).send(e);
  }
});
```

After verification is done, you can let the user sign in.

Here's the complete code of frontend:

```js
async reauth() {
  // Feature detection
  if (!window.PublicKeyCredential)
    throw 'WebAuthn not supported on this browser.';

  // If reauth key is not registered, abort
  const credId = localStorage.getItem('reauth_key');
  if (credId === null)
    throw 'Reauth key not registered.';

  // Request credential request options
  const url =`/reauth?key=${encodeURIComponent(credId)}`;
  const options = await this._fetch(url);

  // Decode the options
  options.challenge = base64url.decode(options.challenge);

  if (options.allowCredentials) {
    for (let cred of options.allowCredentials) {
      cred.id = base64url.decode(cred.id);
    }
  }

  // Get a public key credential
  const cred = await navigator.credentials.get({
    publicKey: options
  });

  // Encode the credential
  const encodedCred = {};
  if (cred.id)    encodedCred.id =     cred.id;
  if (cred.type)  encodedCred.type =   cred.type;
  if (cred.rawId) encodedCred.rawId =  base64url.encode(cred.rawId);

  const clientDataJSON =
    base64url.encode(cred.response.clientDataJSON);
  const authenticatorData =
    base64url.encode(cred.response.authenticatorData);
  const signature =
    base64url.encode(cred.response.signature);
  const userHandle =
    base64url.encode(cred.response.userHandle);
  encodedCred.response = {
    clientDataJSON,
    authenticatorData,
    signature,
    userHandle
  };

  // Verify the credential
  return await this._fetch('/verifyReauth', parsedCred);
}
```

## Summary

You have learned several important concepts specifically needed for
biometric-based reauthentication in this article.

-   **Platform authenticators** are authenticators built into a client device
    running the browser. By making
    `authenticatorSelection.authenticatorAttachment` to '`platform`', you can
    restrict users to use platform authenticators only.
-   Authenticators such as security keys prove user presence (**User Present**).
    Other authenticators with biometric sensors can additionally verify a user
    (**User Verification**). By setting
    `authenticatorSelection.userVerification` to '`required`', you can restrict
    users to use user verifying authenticators only.
-   To check if user verifying and platform authenticators are available on the
    browser, you can use
    `PublicKeyCredentials.isUserVerifyingPlatformAuthenticatorAvailable()`.
-   Using `attestation` is discouraged in consumer scenarios. By setting
    attestation to '`none`', you can request an authenticator to not return an
    attestation.
-   As reauthentication is specific to the same device, a credential or an
    identifier for it should be stored locally.

With these points in mind, I hope you'll build a great reauthentication UX on
your website.

## Feedback {: #feedback .hide-from-toc }

{% include "web/_shared/helpful.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
