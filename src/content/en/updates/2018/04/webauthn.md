project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Chrome 67 beta ships with WebAuthn (Web Authentication API). It empowers browser to interact and handle public-key based credentials and enables stronger authentication using security keys, fingerprints, etc.

{# wf_updated_on: 2018-04-26 #}
{# wf_published_on: 2018-04-12 #}
{# wf_tags: webauthn, credentials, sign-in, chrome67 #}
{# wf_featured_image: /web/updates/images/generic/security.png #}
{# wf_featured_snippet: Chrome 67 beta ships with WebAuthn (Web Authentication API). It empowers browser to interact and handle public-key based credentials and enables stronger authentication using security keys, fingerprints, etc. #}
{# wf_blink_components: Blink>WebAuthentication #}

# Enabling standard second factor with WebAuthn {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

On the Internet, there are [three authentication factors](https://en.wikipedia.org/wiki/Multi-factor_authentication#Authentication_factors) for online users to prove their identity.

**Knowledge factors**: A user can authenticate by supplying a secret text that is shared between a user and a website. The secret is usually called a password.

**Possession factors**: A user can authenticate by proving a predefined physical possession of an item. This is like a key to a lock; "security key" is the modern computing equivalent.

**Inherence factors**: A user can authenticate by digitally asserting pre-registered biometric characteristics through fingerprints, facial recognition, retina scanners, voice recognition, etc.

The knowledge factor is obviously the most commonly used factor. Since passwords are usually memorized by a human, they tend to be short, easy to remember, and repeatedly used -- and thus vulnerable to attacks like phishing or social hacks.

The problem is once the secret is leaked, the account can be easily compromised.

## 2 factor authentication

That's why we came up with the idea of 2 factor authentication -- enhancing the security by requiring 2 factors to authenticate a user:

-   knowledge (password) + possession/knowledge (OTP)
-   knowledge (password) + possession (security key)
-   knowledge (password) + possession/knowledge (SMS)
-   knowledge (password) + inherence (facial recognition)

This combination method works well and was typically seen and widely recommended in critical services like banks or other situations where security incidents occurred.

But the adoption of 2 factor authentication by developers and users still remains limited for several reasons:

-   Building 2 factor authentication requires custom implementation.
-   User experience with 2 factor authentication drastically varies depending on implementations.
-   No standard exists that is effectively available throughout platforms.

WebAuthn is here to help.

## What is WebAuthn?

[WebAuthn (Web Authentication)](https://www.w3.org/TR/webauthn/) is an open web standard (Candidate Recommendation as of April 2018) based on the [FIDO 2.0](https://fidoalliance.org/fido2/) specification by [FIDO Alliance](https://fidoalliance.org/). It's coming to Chrome, Firefox, Edge (older implementation in place), and more.

WebAuthn abstracts communication between a browser and an authenticator and is used to do two things:

1.  Allow a user to register a security key to a website.
2.  Authenticate the user to the website using the registered security key.

WebAuthn is used via [the Credential Management API](https://w3c.github.io/webappsec-credential-management/) and adds a new credential type called a "PublicKey Credential".

TODO: Insert an image of an authenticator

Authenticators are devices that are capable of generating private/public key pairs and signing with them can be done with a simple tap switch, a fingerprint reader, a facial recognition device, or whatever device as long as it complies with FIDO 2.0 (there's [a certification program for authenticators by FIDO Alliance](https://fidoalliance.org/certification/fido-certified-products/)) and through USB, Bluetooth, or NFC. How the authenticator operates is completely opaque to the user agent.

## How it works
### Creating a key pair and registering a user
When a user wants to register a security key (authenticator) to a website (relying party):

1.  The relying party generates a challenge.
2.  The browser asks the authenticator to generate a new credential for this relying party.
3.  After the authenticator obtains the user consent (granted by a tap, in the case of security keys), the authenticator generates a key pair and returns the public key and signed attestation.
4.  The browser forwards the public key and signed attestation to the server, where the relying party verifies the attestation.
5.  Once verified, the website stores the public key coupled with the user identity to remember the credential for future authentications.

```
let credential = await navigator.credentials.create({ publicKey: {
  challenge: Uint8Array(32) [117, 61, 252, 231, 191, 241,…]
  rp: { id: "acme.com", name: "ACME Corporation" },
  user: {
    id: Uint8Array(8) [79, 252, 83, 72, 214, 7, 89, 26]
    name: "jamiedoe",
    displayName: "Jamie Doe"
  },
  pubKeyCredParams: [ {type: "public-key", alg: -7} ],
  authenticatorSelection: { requireResidentKey: true },
}});
```

### Authenticating a user
When a user later wants to authenticate with a security key:

1.  The relying party generates a challenge and supplies the browser with a list of credentials that it knows are registered to the user.
2.  The browser asks the authenticator to sign the challenge.
3.  If the authenticator contains one of the given credentials, the authenticator returns a signed assertion after receiving user consent.
4.  The browser forwards the signed assertion to the server so that the relying party can verify the assertion.
5.  Once verified, the website lets the user sign in.

```
let credential = await navigator.credentials.get({ publicKey: {
  challenge: Uint8Array(32) [139, 66, 181, 87, 7, 203,…]
  rpId: "acme.com",
  allowCredentials: [{
    type: "public-key",
    id: Uint8Array(80) [64, 66, 25, 78, 168, 226, 174,…]
  }],
  userVerification: "required",
}});
```

Try how WebAuthn works yourself at [https://webauthndemo.appspot.com/](https://webauthndemo.appspot.com/).

TODO: Chrome's roadmap?

We are working to provide more detailed documentation.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
