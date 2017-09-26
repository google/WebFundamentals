project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools allows you to easily see multiple variables throughout your application.

{# wf_published_on: 2016-02-11 #}
{# wf_updated_on: 2016-02-11 #}

# Watch variables in Sources {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

<aside class="warning">
  <b>Warning:</b> This page is deprecated. See following section for up-to-date
  information: <a href="reference#watch">Watch the values of custom JavaScript
  expressions</a>
</aside>

Chrome DevTools allows you to easily see multiple variables throughout your application.
Watching variables within Sources keeps you out of the console and focused on improving your code.

The Sources panel provides the ability to watch variables within your application.
This is located in the watch section of the debugger sidebar.
By taking advantage of this functionality you will not need repeatedly log objects to the console.

![Watch section of debugger](imgs/sources-watch-variables-location.png)

## Adding variables

To add a variable to the watch list use the add icon to the right of the section heading.
This will open an inline input where you provide the variable name to watch.
Once it is filled in press your <kbd>Enter</kbd> key to add it to the list.

![Add to watch list button](imgs/add-variable-to-watch.png)

The watcher will show you the current value of the variable as it is added.
If the variable is not set or can't be found it will show <samp>&lt;Not Available&gt;</samp> for the value.

![Undefined variable in the watch list](imgs/undefined-variable-in-watch.png)

## Updating variables

Variable values may change as an application continues to operate.
The watch list is not a live view of the variables unless you are stepping through execution.
When you are stepping through execution using [breakpoints](breakpoints), the watched values will update automatically.
To manually recheck the variables in the list press the refresh button to the right of the section heading.

![Refresh watch variables button](imgs/refresh-variables-being-watched.png)

As the refresh is requested the current application state is rechecked.
Every watched item will be updated with the current values.

![Updated variable being watched](imgs/updated-variable-being-watched.png)

## Removing variables

To keep what you are looking at minimal for faster work you may need to remove variables from the watch list.
This can be done by hovering the variable and then clicking the removal icon that appears to the right.

![Hover variable to remove from watch list](imgs/hover-to-delete-watched-variable.png)
