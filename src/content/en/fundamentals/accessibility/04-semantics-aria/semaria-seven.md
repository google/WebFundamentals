project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Using aria-live to call attention to page updates

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# Introducing aria-live {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



`aria-live` lets developers mark a part of the page as "live" in the sense that updates should be communicated to users immediately regardless of the page position, rather than if they just happen to explore that part of the page. When an element has an `aria-live` attribute, the part of the page containing it and its descendants is called a *live region*.

![ARIA live establishes a live region](imgs/live-region.png)

For example, a live region might be a status message that appears as a result of a user action. If the message is important enough to grab a sighted user's attention, it is important enough to direct an assistive technology user's attention to it by setting its `aria-live` attribute. Compare this plain `div`


    <div class="status">Your message has been sent.</div>
    

with its "live" counterpart.


    <div class="status" aria-live="polite">Your message has been sent.</div>
    

`aria-live` has three allowable values: `polite`, `assertive`, and `off`. 

 - `aria-live="polite"` tells assistive technology to alert the user to this change when it has finished whatever it is currently doing. It's great to use if something is important but not urgent, and accounts for the majority of `aria-live` use.
 - `aria-live="assertive"` tells assistive technology to interrupt whatever it's doing and alert the user to this change immediately. This is only for important and urgent updates, such as a status message like "There has been a server error and your changes are not saved; please refresh the page", or updates to an input field as a direct result of a user action, such as buttons on a stepper widget.
 - `aria-live="off"` tells assistive technology to temporarly suspend `aria-live` interruptions.

There are some tricks to making sure your live regions work correctly.

First, your `aria-live` region should probably be set in the initial page load. This is not a hard-and-fast rule, but if you're having difficulty with an `aria-live` region, this might be the issue.

Second, different screen readers react differently to different types of changes. For example, it's possible to trigger an alert on some screen readers by toggling a descendant element's `hidden` style from true to false. 

Other attributes that work with `aria-live` help you fine-tune what is communicated to the user when the live region changes.

`aria-atomic` indicates whether the entire region should be considered as a whole when communicating updates. For example, if a date widget consisting of a day, month, and year has `aria-live=true` and `aria-atomic=true`, and the user uses a stepper control to change the value of just the month, the full contents of the date widget would be read out again. `aria-atomic`'s value may be `true` or `false` (the default).

`aria-relevant` indicates what types of changes should be presented to the user. There are some options that may be used separately or as a token list.

 - *additions*, meaning that any element being added to the live region is significant. For example, appending a span to an existing log of status messages would mean that the span would be announced to the user (assuming that `aria-atomic` was `false`).
 - *text*, meaning that text content being added to any descendant node is relevant. For example, modifying a custom text field's `textContent` property would read the modified text to the user.
 - *removals*, meaning that the removal of any text or descendant nodes should be conveyed to the user.
 - *all*, meaning that all changes are relevant. However, the default value for `aria-relevant` is `additions text`, meaning that if you don't specify `aria-relevant` it will update the user for any addition to the element, which is what you are most likely to want.

Finally, `aria-busy` lets you notify assistive technology that it should temporarily ignore changes to an element, such as when things are loading. Once everything is in place, `aria-busy` should be set to false to normalize the reader's operation.
