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
to `preventDefault()` within the `paste` event listener that's associated to the password
input element.

<pre class="prettyprint">let input = document.querySelector('input');
input.addEventListener('paste', (e) => {
  e.preventDefault(); // This is what prevents pasting.
});</pre>

### Find and inspect the code that's preventing pasting {: #inspecting }

To quickly find and inspect the code that's preventing pasting, try enabling the **Clipboard** >
`paste` checkbox in the [Event Listener Breakpoints][ELB] section of Chrome DevTools, then
pasting into a password field. DevTools should pause on the first line of code in the `paste`
event listener.

[ELB]: /web/tools/chrome-devtools/javascript/breakpoints#event-listeners

## More information {: #more-info }

Lighthouse gathers all `<input type="password">` elements, pastes some text into each element,
and then verifies that the element's content has been set to the pasted text. If a page
doesn't use `<input type="password">` for its password input fields, Lighthouse does't detect
those elements. It's also possible to prevent pasting outside of a `paste` event listener.
Lighthouse doesn't detect that scenario, either.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/dobetterweb/password-inputs-can-be-pasted-into.js
