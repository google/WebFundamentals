project_path: /web/_project.yaml
book_path: /web/shows/_book.yaml
description: We're connected with our laptops, phones and tablets, and probably soon enough with personal devices and accessories. We access the internet from untrusted and sometimes even hostile networks. With so much of our lives moving online, it's imperative we take steps to protect our data and our users' data.

{# wf_updated_on: 2015-02-23 #}
{# wf_published_on: 2015-02-23 #}
{# wf_youtube_id: sJ8EX61fFWQ #}

# Got SSL? {: .page-title }


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="sJ8EX61fFWQ"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


More people are connected to the web today than ever before – and from more places.

We're connected with our laptops, phones and tablets, and probably soon enough with personal devices and accessories. We access the internet from untrusted and sometimes even hostile networks. With so much of our lives moving online, it's imperative we take steps to protect our data and our users' data.

Above all, as developers we need to understand the necessity and practicality of SSL.

What's SSL? It stands for Secure Sockets Layer, and it's a cryptographic protocol designed to provide communication security over the internet. It guarantees privacy, via encryption and integrity, to prevent snooping or tampering with your internet connection. SSL has it's flaws, but it's the leading way – and really the only way – to ensure any kind of data communication security on the internet.

According to [SSL Pulse](https://www.trustworthyinternet.org/ssl-pulse/), a year ago we had about just under 15% of SSL adoption; we're now over 50% adoption.

Two acronyms:

* **TLS:** for most intents and purposes the same as SSL. To be precise, SSL 3.1 was renamed to TLS, and TLS is the IETF Standard name. But they're interchangeable!

* **HTTPS:** this is HTTP over SSL, just the layering of the security capabilities of SSL and standard HTTP. First the client–server handshake, using public/private key cryptography to create a shared key – which is used by the second part of the SSL protocol to encrypt communication.

Networking on the internet may feel safe, immediate and fast. It feels like we're talking directly to the website. But in reality, it's not a direct connection. Our communications go via a wifi router, an ISP, and potentially other intermediary proxies between your device and the website. Without HTTPS, all our communications is in plain text.

Trouble is, users rarely type in a full URL specifying HTTPS – or they click a link using HTTP. Worse, it's possible to mount a (wo)man-in-the-middle attack and replace HTTPS with HTTP. A tool called SSLstrip introduced in 2009 does just that. Firesheep, from 2010, just listened to opened wifi networks for cookies being sent in the clear: that meant you could listen in on chat, or log in to someone's Facebook account.

But SSL is (relatively) cheap, fast and easy to deploy (check out [ssllabs.com](https://ssllabs.com/){: .external } and Ilya Grigorik's book High Performance Browser Networking). For non-commercial use, you can even get free certificates from [startssl.com](https://startssl.com/)! [Public Key Pinning](https://www.imperialviolet.org/2011/05/04/pinning.html) is designed to give website operators a means to restrict which certificate authorities can actually issue certificates for their sites.

"In January this year (2010), Gmail switched to using HTTPS for everything by default. .. In order to do this we had to deploy no additional machines and no special hardware. On our production frontend machines, SSL accounts for < 1% of the CPU load, < 10 KB of memory per connection, and < 2% of network overhead…

If you stop reading now you only need to remember one thing: SSL is not computationally expensive any more.”

– [Overclocking SSL](https://www.imperialviolet.org/2010/06/25/overclocking-ssl.html), Adam Langley (Google)


Lastly, a couple of bugs we see most commonly:

+ **Mixed content:** sites that use HTTP as well as HTTPS. Your user will get annoyed because they have to click a permission button to load content. (Chrome and Firefox actually bar mixed content from iframes.) Make sure that all of your resources on an HTTPS page are loaded by HTTPS, by using relative or scheme-relative URLs for example `<style src="//foo.com/style.css">`
+ **Insecure cookies:** sent in the clear via an HTTP connection.  Avoid this by setting the secure attribute on cookie headers. You can also use a new "Strict Transport Security" header to require SSL
Transport Security (HSTS).

## Takeaways

+ If you care about the privacy and integrity of your users' data, you need to be using SSL. It's faster, easier, and cheaper than ever.
+ Avoid common implementation gotchas, like mixed content bugs or not setting the right HTTP header bits.
+ Use relative or scheme relative URLs.
+ Check out some of the new cool stuff, like HSTS and cert pinning

**Slides:** [Got SSL?](https://goo.gl/y9KIw2)
