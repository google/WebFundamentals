project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: About the Ecosystem page for the Web Payments doc set.

{# wf_published_on: 2018-08-11 #}
{# wf_updated_on: 2018-08-13 #}
{# wf_blink_components: Blink>Payments #}

# How the payment ecosystem works {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}
{% include "web/_shared/contributors/dgash.html" %}

Let's see how the new payment ecosystem looks from the developer's point of view.

## The APIs

Web Payments comprises multiple emerging web standards. The Payment Request API
and the Payment Handler API are the most important APIs.

*   **Payment Request API:** With the [Payment Request
    API](https://www.w3.org/TR/payment-request/), users can check out with just
    a few taps. The browser removes the need for users to enter shipping and
    payment information by storing it and providing it for checkouts. This
    removes the friction of going through a lengthy and difficult purchase flow
    and can result in higher conversion for merchants.
*   **Payment Handler API:** The [Payment Handler
    API](https://w3c.github.io/payment-handler/) opens up the ecosystem to
    payment providers by allowing their web-based payment applications to act as
    payment methods on merchant websites through the standard Payment Request
    API. In addition, there are several related specifications that make up Web
    Payments.
*   [Payment Method Identifiers](https://w3c.github.io/payment-method-id/)
    *   [Payment Method: Basic
        Card](https://w3c.github.io/payment-method-basic-card/)
        *   [Card Network Identifiers Approved for use with Payment Request
            API](https://www.w3.org/Payments/card-network-ids)
    *   [Credit Transfer
        Payment](https://w3c.github.io/payment-method-credit-transfer/)
    *   [Interledger Payment
        Method](https://w3c.github.io/webpayments/proposals/interledger/)
        (unofficial)
    *   [Tokenized Card
        Payment](https://w3c.github.io/webpayments-methods-tokenization/index.html)
        (unofficial)
*   [3-D Secure 2 with Payment Request API](https://w3c.github.io/3ds/)
    (unofficial)
*   [Payment Method Manifest](https://w3c.github.io/payment-method-manifest/)

## The Players

There are typically four participants in an online transaction.

<table>
  <tr>
   <td><strong>Players</strong>
   </td>
   <td><strong>Description</strong>
   </td>
   <td><strong>API usage</strong>
   </td>
  </tr>
  <tr>
   <td>Customers
   </td>
   <td>Users who go through a checkout flow to purchase item(s) online.
   </td>
   <td>None
   </td>
  </tr>
  <tr>
   <td>Merchants
   </td>
   <td>Businesses selling products on their website.
   </td>
   <td>Payment Request API
   </td>
  </tr>
  <tr>
   <td>Payment Service Providers (PSPs)
   </td>
   <td>Third-party companies that actually process payments which involves
   charging customers and crediting merchants.
   </td>
   <td>(Payment Request API)
   </td>
  </tr>
  <tr>
   <td>Payment Handlers
   </td>
   <td>Third-party companies which provide applications that typically store
   customers' payment credentials and on their authorization provide them to
   merchants to process a transaction.
   </td>
   <td>Payment Handler API
   </td>
  </tr>
</table>

## How the Payment Request Process Works

The typical sequence of events in processing a credit card payment on the web
looks like this:

1.  The Customer visits merchant's website, adds items to a shopping cart, and
    starts the checkout flow.
1.  The Merchant needs the customer's payment credentials to process the
    transaction. They present a payment request UI to the customer using **the
    Payment Request API**. The UI lists various methods of payment including
    credit card numbers saved in Autofill, third party payment apps like Google
    Pay, Samsung Pay, etc. The Merchant can optionally request the customer's
    shipping address and contact information.
1.  If the customer chooses an installed payment app like Google Pay, Chrome
    launches the app which might allow the customer to choose a card to pay with
    using **the Payment Handler API**. This step is completely up to the payment
    handler's implementation. In this example, if the customer authorizes the
    payment, Google Pay returns a token (payment credential) to the Payment
    Request API, which relays it to the merchant site.
1.  The merchant site sends the payment credential to a PSP to process the
    payment and initiate funds transfer. Usually, verifying the payment on the
    server side is also required.
1.  The PSP processes the payment, securely requesting a funds transfer from the
    customer's bank or credit card issuer to the merchant, and then returns a
    success or failure result to the merchant website.
1.  The merchant website notifies the customer of the success or failure of the
    transaction and displays next steps, e.g., shipping the purchased item.

<img src="../images/2-image1.png" />

## PSP Reliance

If you are a merchant and want to accept credit card payments, PSPs are an
important link in the payment processing chain. Implementing Web Payments does
not obviate the need for a PSP.

Merchants usually rely on a third-party PSP to perform payment processing for
convenience and expense reasons. This is primarily because most PSPs maintain
compliance with [PCI
DSS](https://en.wikipedia.org/wiki/Payment_Card_Industry_Data_Security_Standard),
an information security standard that regulates the safety of cardholder data.

Because achieving and maintaining strict PCI DSS compliance is expensive and
difficult, most merchants find that relying on a compliant PSP avoids going
through the certification process themselves. Some large and financially robust
companies, however, obtain their own PCI DSS certification specifically to avoid
such third-party reliance.

Thus, delegating payment processing to a PCI DSS-compliant PSP both simplifies
the merchant site's payment processing requirements and ensures payment
information integrity for the customer.

Ask your PSP if you can use the Payment Request API through their SDK; if not,
you can ask them to add support for it.

### List of supporting payment gateways

*   [Stripe](https://stripe.com/docs/stripe-js/elements/payment-request-button)
*   [Braintree](https://developers.braintreepayments.com/guides/payment-request/overview)

(Send [pull requests](https://github.com/google/WebFundamentals/pulls) to us if
your payment gateway supports Payment Request API but is not listed here.)

## Next Up

Learn about the Payment Request API's fields and methods in [How the Payment
Request API
Works](https://docs.google.com/document/d/1xlhsGaCB5jEiq0MMWPwg7ve4d6YcswW2_8jg6BWUMTI/edit).
