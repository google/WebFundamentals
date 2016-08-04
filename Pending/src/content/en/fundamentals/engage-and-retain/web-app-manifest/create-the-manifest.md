project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Before diving into details of a web app manifest, let's create a basic manifest and link a web page to it.

{# wf_review_required #}
{# wf_updated_on: 2015-02-11 #}
{# wf_published_on: 2014-12-16 #}

# Create the Manifest {: .page-title }

{% include "_shared/contributors/mattgaunt.html" %}
{% include "_shared/contributors/paulkinlan.html" %}

Before diving into details of a web app manifest, let's create a basic manifest and link a web page to it.


## Create the Manifest

You can call the manifest whatever you want. Most people will probably just
use `manifest.json`. An example is given below.


    {
      "short_name": "AirHorner",
      "name": "Kinlan's AirHorner of Infamy",
      "icons": [
        {
          "src": "launcher-icon-1x.png",
          "type": "image/png",
          "sizes": "48x48"
        },
        {
          "src": "launcher-icon-2x.png",
          "type": "image/png",
          "sizes": "96x96"
        },
        {
          "src": "launcher-icon-4x.png",
          "type": "image/png",
          "sizes": "192x192"
        }
      ],
      "start_url": "index.html?launcher=true"
    }
    

You should include a `short_name` as this will get used for the text on the users home screen
and a `name` as that will be used in the Web App Install banner..

## Set a Start URL

If you don't provide a `start_url`, then the current page will be used, which is
unlikely to be what your users want. But that's not the only reason to include it. Because you can now define how your app is launched, add a query string parameter to the `start_url` that indicates how it was launched. For example:


    "start_url": "/index.html?homescreen=1"
    

## Tell the Browser about your Manifest

Once you have the manifest created and and on your site, all you need to do is add
a `link` tag to all the pages that encompass your web app as follows:


    <link rel="manifest" href="/manifest.json">
    
