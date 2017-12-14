project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Prevents users from pasting into password fields" Lighthouse audit.

{# wf_updated_on: 2017-12-13 #}
{# wf_published_on: 2017-12-13 #}
{# wf_blink_components: N/A #}

# Prevents Users From Pasting Into Password Fields  {: .page-title }

## Overview {: #overview }

Some websites claim that preventing users from pasting passwords somehow improves security. In
[Let Them Paste Passwords][LTPP], the National Cyber Security Centre says that this claim is
unfounded.

[LTPP]: https://www.ncsc.gov.uk/blog-post/let-them-paste-passwords

Password pasting improves security because it enables users to use password managers. Password
managers typically generate strong passwords for users, store them securely, and then
automatically paste them into password fields whenever users need to log in.

See [The "Cobra Effect" That Is Disabling Paste On Password Fields][Cobra] for more on why
enabling pasting is a better security practice.

[Cobra]: https://www.troyhunt.com/the-cobra-effect-that-is-disabling/

## Recommendations {: #recommendations }

Remove the code that's preventing users from pasting into password fields. It's probably a call
to `preventDefault()` within the `paste` event listener that's associated to the password field
input element.

<pre class="prettyprint">let input = document.querySelector('input');
input.addEventListener('paste', (e) => {
  e.preventDefault(); // This is what prevents pasting.
});</pre>

### Find and inspect the code that's preventing pasting {: #inspecting }

To quickly find and inspect the code that's preventing pasting, try enabling the **Clipboard** >
`paste` checkbox in the [Event Listener Breakpoints][ELB] section of Chrome DevTools, then
pasting into the password field. DevTools should pause on the first line of code in the `paste`
event listener.

Note: If this method doesn't find the relevant code, the code that prevents pasting may be in a
different event listener. If you have a URL that reproduces the issue, you can [open a ticket
on the google/webfundamentals repository][ticket]. One of the teammates on the Google Web DevRel
team will research how it works, so that the method can be added to this reference.

[ELB]: /web/tools/chrome-devtools/javascript/breakpoints#event-listeners
[ticket]: https://github.com/google/WebFundamentals/issues/new?title=[lighthouse]%20preventing%20password%20pasting&body=@kaycebasques%20please%20investigate%20%3CYOUR_URL_HERE%3E

## More information {: #more-info }

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/dobetterweb/password-inputs-can-be-pasted-into.js
