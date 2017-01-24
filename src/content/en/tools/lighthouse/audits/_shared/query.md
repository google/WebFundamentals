{# wf_md_include #}

Below the audit, Lighthouse displays something like `1 element fails
this test`. The number varies depending on how many elements are failing.
Click this label to expand the list. You can find each element in your
DOM by running the [`$()`][qs], [`$$()`][qsa], and [`$x()`][xp] functions
from the Chrome DevTools Console.

You can also use [ChromeLens][ChromeLens] to find the elements. See
[Background And Foreground Colors Have Sufficient Contrast
Ratio][ChromeLens Example] for an example.

[qs]: /web/tools/chrome-devtools/console/command-line-reference#queryselector
[qsa]: /web/tools/chrome-devtools/console/command-line-reference#queryselectorall
[xp]: /web/tools/chrome-devtools/console/command-line-reference#xpath
[ChromeLens]: http://chromelens.xyz/
[ChromeLens Example]: /web/tools/lighthouse/audits/contrast-ratio#how
