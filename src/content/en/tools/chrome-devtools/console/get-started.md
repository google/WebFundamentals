project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: TODO

{# wf_updated_on: 2018-02-06 #}
{# wf_published_on: 2018-02-06 #}
{# wf_blink_components: Platform>DevTools #}

# Get Started with the Console {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

TODO

## View messages {: #view }

TODO

### View messages from the page's JavaScript {: #javascript }

Developers often use the **Console** to give themselves information about how a page is running.

1. Press <kbd>Command</kbd>+<kbd>Option</kbd>+<kbd>J</kbd> (Mac) or
   <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>J</kbd> (Windows, Linux, Chrome OS) to open the
   **Console**.
1. Click **Log a message**. In the **Console**, you should see a message get logged to the
   screen.

     {% framebox width="auto" height="auto" enable_widgets="true" %}
       <button>Log a message</button>
       <script>
         document.querySelector('button').addEventListener('click', () => {
           console.log('coffee');
         });
       </script>
     {% endframebox %}

1. Enter the text that you saw in the **Console** into the **Message** text box. After you
   enter the correct text, you'll see a confirmation below the text box.

     {% include "web/tools/chrome-devtools/console/_message.html" %}

### View messages from the browser {: #browser }

Sometimes, the browser logs messages to the Console, too.

1. Press 

{% framebox width="auto" height="auto" enable_widgets="true" %}
  <button>Cause the browser to log a message</button>
  <script>
    document.querySelector('button').addEventListener('click', () => {
      document.querySelector('p').textContent =
          'this will fail because there is no p element.';
    });
  </script>
{% endframebox %}
