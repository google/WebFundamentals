project_path: /web/feedback/_project.yaml
book_path: /web/feedback/_book.yaml

{# wf_updated_on: 2016-10-24 #}
{# wf_published_on: 2016-10-24 #}

# How to File a Good Bug {: .page-title }

Filing a good bug isn’t hard, but takes a little work. The goal is to make it
easy to find what's broken, reach the root cause and, most importantly, find a
way to fix it. Bugs that make fast progress tend to be easy to reproduce with a
clear expected behavior.


## Are others seeing the same problem?

If you’re experiencing problems, there’s a good chance other developers are too.
Try searching for the bug on [Stack Overflow](http://stackoverflow.com/). This
might help you translate an abstract problem into a specific broken API. It
might also give you a workaround for the short term.

Once you have an idea of what the bug is, search for it on the
[browser bug searcher](/web/feedback/).
If you find an existing bug that describes the problem, it’s much more useful
to add your support by starring, favoriting, or commenting on that bug.
If not, it's time to file a bug.

## What's the correct behavior?

The first step is to figure out what the "correct" behavior should be.

Check the relevant API docs on [MDN](https://developer.mozilla.org/) or try to
find related specs. This information can help you decide which API is actually
broken, where it’s broken, and what the expected behavior is.

### Is the behavior different in other browsers?

Behavior that differs between browsers is generally prioritized higher as an
interoperability issue, especially when the browser containing the bug is the
odd one out. Try to test on the latest versions of Chrome, Firefox, Safari and
Edge, possibly using a tool like [BrowserStack](https://www.browserstack.com/).

If possible, check that the page isn't intentionally behaving differently due to
 user agent sniffing. Try setting the user agent string to another browser in
 Dev Tools > Menu > More Tools > Network conditions. Note: don’t forget to set
 it back to Select automatically.


### Is it a regression?

Did this work as expected in the past, but broke in a recent browser release?
Such "regressions" can be acted upon much quicker, especially if you supply a
version number where it worked and a version where it failed. Tools like
[BrowserStack](https://www.browserstack.com/) can make it easy to check old browser versions.

If an issue is a regression and can be reproduced, the root cause can usually be
 found and fixed quickly.

## Create a minimized test case

Mozilla has a great article on how to create a minimized test case. To make a
long story short, while a description of the problem is a great start, nothing
beats providing a link (for example, to [jsbin.com](https://jsbin.com/)) in the
bug that demonstrates the problem. To maximize the chance of fast progress the
example should contain the minimum possible code needed to demonstrate the
problem. A minimal code sample is the number one thing you can do to increase
the odds of your bug getting fixed.

Here are a few tips for minimizing a test case:

* Download the web page, add `<base href="http://original.url">` and verify that
the bug exists locally. This may require a live HTTPS server if the URL uses
HTTPS.
* Test the local files on the latest builds of as many browsers as you can.
* Try to condense everything into 1 file.
* Remove code (starting with things you know to be unnecessary) until the bug
goes away.
* Use version control so that you can save your work and undo things that go
wrong.


### Hosting a minified test case

If you're looking for a good place to host your minified test case, there are several good places available:

* [JSBin](https://jsbin.com)
* [JSFiddle](https://jsfiddle.net)
* [CodePen](https://codepen.io)

### Include details of the environment

Some bugs are reproducible only on certain operating systems, or only on
specific kinds of displays (for example, low-dpi or high-dpi). Be sure to
include the details of any test environments you used.

## Filing your issue

Once you’ve got your minimized test case, you’re ready to file that bug.
Head over to the right bug tracking site.

* [Chromium bugs](https://crbug.com)
* [Edge bugs](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/)
* [Mozilla bugs](https://bugzilla.mozilla.org/)
* [WebKit bugs](https://bugs.webkit.org/)
