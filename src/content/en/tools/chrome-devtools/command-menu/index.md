project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: A guide on how to open the Command Menu, run commands, see other actions, and more.

{# wf_updated_on: 2019-04-09 #}
{# wf_published_on: 2019-04-09 #}
{# wf_blink_components: Platform>DevTools #}

# Run Commands With The Chrome DevTools Command Menu {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

[VS]: https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette

The Command Menu provides a fast way to navigate the Chrome DevTools UI and accomplish common tasks,
such as [disabling JavaScript](/web/tools/chrome-devtools/javascript/disable).
You may be familiar with a similar feature in Visual Studio Code called the [Command Palette][VS]{: .external },
which was the original inspiration for the Command Menu.

<figure>
  <img src="/web/tools/chrome-devtools/javascript/imgs/disable-javascript.png"
       alt="Using the Command Menu to disable JavaScript."/>
  <figcaption>
    <b>Figure 1</b>. Using the Command Menu to disable JavaScript.
  </figcaption>
</figure>

## Open the Command Menu {: #open }

[mainmenu]: /web/tools/chrome-devtools/images/shared/main-menu.png

Press <kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> or
<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>P</kbd> (Mac). Or, click **Customize And
Control DevTools** ![Customize And Controls DevTools][mainmenu]{: .inline-icon } and
then select **Run Command**.

<figure>
  <img src="/web/tools/chrome-devtools/command-menu/imgs/runcommand.png"
       alt="Run Command."/>
  <figcaption>
    <b>Figure 2</b>. Run Command.
  </figcaption>
</figure>

## See other available actions {: #help }

If you use the workflow outlined in [Open the Command Menu](#open), the Command Menu opens
with a `>` character prepended to the Command Menu text box.

<figure>
  <img src="/web/tools/chrome-devtools/command-menu/imgs/commandcharacter.png"
       alt="The command character."/>
  <figcaption>
    <b>Figure 3</b>. The command character.
  </figcaption>
</figure>

Delete the `>` character and type `?` to see other actions that are available from the Command Menu.

<figure>
  <img src="/web/tools/chrome-devtools/command-menu/imgs/actions.png"
       alt="Other available actions."/>
  <figcaption>
    <b>Figure 4</b>. Other available actions.
  </figcaption>
</figure>

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
