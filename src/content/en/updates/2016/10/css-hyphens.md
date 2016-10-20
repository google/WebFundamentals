project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2016-10-20 #}
{# wf_published_on: 2016-10-20 #}
{# wf_featured_snippet: TBD #}

# Manage Hyphens with CSS {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

In many written languages, it's possible to break lines between syllables as well as between words. This is often done so that more characters may be placed on a line of text with the goal of having fewer lines in a text area, and thus saving space. In such languages the break is indicated visually with a hyphen ('-').

The [CSS Text Module Level 3](https://drafts.csswg.org/css-text-3) defines a hyphens property to control when hyphens are shown to users and how they behave when shown. Per the specification, the hyphens property has three values: `none`, `manual`, and `auto`. To illustrate this we need to use a soft hyphen (&amp;shy;) as in the following example.

    Google ipsum dolor sit amet, consectetur adipiscing e&amp;shy;lit.

A soft hyphen is one that will only be shown when it occurs at the trailing margin. How this hyphen renders in Chrome 55 or later depends on the value of the CSS `hypens` property.

    -webkit-hyphens: manual;
    hyphens: manual;
    
Combining these gives a result like this:

<img src="/web/updates/images/2016/10/css-hyphen/single-line.png">

Notice that the soft hyphen isn't visible. In all cases, when a word containing the soft hyphen fits on a single line, the hypen will be invisible. 

# Using none

In the first example, the hyphens property is set to none. This prevents the soft hyphen from ever being displayed. You can confirm this by adjusting the window size so that the word 'elit' will not fit in the visible line of text.

# Using manual

In the second example, the hyphens property is set to manual meaning the soft hyphen will only appear when the margin breaks the word 'elit'. Again, you can confirm this by adjusting the window size.

# Using auto

In the third example, the hyphens property is set to auto. In this case, no soft hyphen is needed since the user agent will determine hyphen locations automatically. If you resize the window, you'll see that the browser hyphenates the third example in the same place as in the second example, though no soft hyphen is present. If you continue to shrink the window, you'll see that your browser is able to break lines between any two syllables in the text.
