project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Learn how to view, edit, and delete a page's HTTP cookies using Chrome DevTools.

{# wf_updated_on: 2019-03-12 #}
{# wf_published_on: 2015-04-13 #}
{# wf_blink_components: Platform>DevTools #}

# View, Edit, And Delete Cookies With Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[MDN]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies

[HTTP Cookies][MDN]{: .external } are mainly used to manage user sessions, store user
personalization preferences, and track user behavior. They are also the cause of all of those
annoying "this page uses cookies" consent forms that you see across the web. This guide teaches
you how to view, edit, and delete a page's cookies with Chrome DevTools.

## Open the Cookies pane {: #open }

1. [Open Chrome DevTools](/web/tools/chrome-devtools/open).
1. Click the **Application** tab to open the **Application** panel. The **Manifest**
   pane will probably open.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/manifest.png"
            alt="The Manifest pane"/>
       <figcaption>
         <b>Figure 1</b>. The Manifest pane
       </figcaption>
     </figure>

1. Under **Storage** expand **Cookies**, then select an origin.

     <figure>
       <img src="/web/tools/chrome-devtools/storage/imgs/cookies.png"
            alt="The Cookies pane"/>
       <figcaption>
         <b>Figure 2</b>. The Cookies pane
       </figcaption>
     </figure>

## Fields {: #fields }

The **Cookies** table contains the following fields:

[scope]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Scope_of_cookies
[permanent]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Permanent_cookies
[session]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Session_cookies
[secure]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#Secure_and_HttpOnly_cookies
[samesite]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#SameSite_cookies

* **Name**. The cookie's name.
* **Value**. The cookie's value.
* **Domain**. The hosts that are allowed to receive the cookie. See [Scope of cookies][scope]{: .external }.
* **Path**. The URL that must exist in the requested URL in order to send the `Cookie` header.
  See [Scope of cookies][scope]{: .external }.
* **Expires / Max-Age**. The cookie's expiration date or maximum age. See
  [Permanent cookies][permanent]{: .external }. For [session cookies][session]{: .external }
  this value is always `Session`.
* **Size**. The cookie's size, in bytes.
* **HTTP**. If true, this field indicates that the cookie should only be used over HTTP, and
  JavaScript modification is not allowed. See [HttpOnly cookies][secure]{: .external }.
* **Secure**. If true, this field indicates that the cookie can only be sent to the server
  over a secure, HTTPS connection. See [Secure cookies][secure]{: .external }.
* **SameSite**. Contains `strict` or `lax` if the cookie is using the experimental
  [SameSite][samesite]{: .external } attribute.

## Filter cookies {: #filter }

Use the **Filter** text box to filter cookies by **Name** or **Value**. Filtering by other
fields is not supported.

<figure>
  <img src="/web/tools/chrome-devtools/storage/imgs/filtercookies.png"
       alt="Filtering out any cookies that don't contain the text 'NID'"/>
  <figcaption>
    <b>Figure 3</b>. Filtering out any cookies that don't contain the text <code>NID</code>
  </figcaption>
</figure>

## Edit a cookie {: #edit }

The **Name**, **Value**, **Domain**, **Path**, and **Expires / Max-Age** fields are editable.
Double-click a field to edit it.

<figure>
  <img src="/web/tools/chrome-devtools/storage/imgs/editcookie.png"
       alt="Setting the name of a cookie to 'DEVTOOL!'"/>
  <figcaption>
    <b>Figure 4</b>. Setting the name of a cookie to <code>DEVTOOLS!</code>
  </figcaption>
</figure>

## Delete cookies {: #delete }

[delete]: /web/tools/chrome-devtools/images/shared/delete.png

Select a cookie and then click **Delete Selected** ![Delete Selected][delete]{: .inline-icon } to delete that one cookie.

<figure>
  <img src="/web/tools/chrome-devtools/storage/imgs/deletecookie.png"
       alt="Deleting a selected cookie"/>
  <figcaption>
    <b>Figure 5</b>. Deleting a selected cookie
  </figcaption>
</figure>

[clear]: /web/tools/chrome-devtools/images/shared/clear.png

Click **Clear All** ![Clear All][clear]{: .inline-icon } to delete all cookies.

<figure>
  <img src="/web/tools/chrome-devtools/storage/imgs/clearallcookies.png"
       alt="Clearing all cookies"/>
  <figcaption>
    <b>Figure 6</b>. Clearing all cookies
  </figcaption>
</figure>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}