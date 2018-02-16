project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Document Does Not Have A Meta Description" Lighthouse audit.

{# wf_updated_on: 2018-02-16 #}
{# wf_published_on: 2018-02-16 #}
{# wf_blink_components: Platform>DevTools #}

# Document Does Not Have A Meta Description  {: .page-title }

## Overview {: #overview }

Descriptions can be displayed in Google's search results. High-quality, unique descriptions
can make your results more relevant to search users and can increase your search traffic.

## Recommendations {: #recommendations }

* Add a description tag to the `<head>` of each of your pages.

    <pre class="prettyprint">
    &lt;meta name="Description" content="Put your description here."&gt;
    </pre>

* Make sure that every page has a description.
* Use different descriptions for different pages.
* Include clearly-tagged facts in the descriptions. The descriptions don't have to be in
  sentence format. They can contain structured data.

    <pre class="prettyprint">
    &lt;meta name="Description" content="Author: A.N. Author, 
        Illustrator: P. Picture, Category: Books, Price: $17.99, 
        Length: 784 pages"&gt;
    </pre>

* Use quality descriptions. High-quality descriptions can be displayed in Google's search
  results, and can go a long way to improving your search traffic.

See [Create good meta descriptions][help]{:.external} for more guidance.

[help]: https://support.google.com/webmasters/answer/35624#1

## More information {: #more-info }

This audit fails if your page doesn't have a description, or if the `content` attribute of the
description is empty. Lighthouse doesn't evaluate the quality of your description.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/seo/meta-description.js
