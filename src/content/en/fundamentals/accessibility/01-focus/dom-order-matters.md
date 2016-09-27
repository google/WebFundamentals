project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: The importance of the default DOM order

{# wf_review_required #}
{# wf_updated_on: 2016-02-29 #}
{# wf_published_on: 2016-02-29 #}

# DOM Order Matters {: .page-title }

{% include "_shared/contributors/megginkearney.html" %}
{% include "_shared/contributors/dgash.html" %}



Working with native elements is a great way to learn about focus behavior because they are automatically inserted into the tab order based on their position in the DOM.

For example, you might have three button elements, one after the other in the DOM. Pressing `Tab` focuses each button in order. Try clicking the code block below to move the focus navigation start point, then press `Tab` to move focus through the buttons.

    <button>I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button>I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

However, it's important to note that, using CSS, it's possible to have things exist in one order in the DOM but appear in a different order on screen. For example, if you use a CSS property like `float` to move one button to the right, the buttons appear in a different order on screen. But, because their order in the DOM remains the same, so does their tab order. When the user tabs through the page, the buttons gain focus in a non-intuitive order. Try clicking on the code block below to move the focus navgation start point, then press `Tab` to move focus through the buttons.

    <button style="float: right">I Should</button>
    <button>Be Focused</button>
    <button>Last!</button>

{% framebox height="80px" %}
<button style="float: right;">I Should</button>
<button>Be Focused</button>
<button>Last!</button>
{% endframebox %}

Be careful when changing the visual position of elements on screen using CSS. This can cause the tab order to jump around, seemingly at random, confusing users who rely on the keyboard. For this reason, the Web AIM checklist states [in section 1.3.2](http://webaim.org/standards/wcag/checklist#sc1.3.2) that the reading and navigation order, as determined by code order, should be logical and intuitive.

As a rule, try tabbing through your pages every so often just to make sure you haven't accidentally messed up the tab order. It's a good habit to adopt, and one that doesn't require much effort.