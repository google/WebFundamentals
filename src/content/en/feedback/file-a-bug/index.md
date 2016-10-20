project_path: /web/_project.yaml
book_path: /web/feedback/_book.yaml

{# wf_updated_on: 2016-10-20 #}
{# wf_published_on:  #}

# How to file a good bug {: .page-title }

## Decide on the expected behavior

Are there any browsers that implement the feature correctly as a reference? What did you think would happen?

Optionally, you may read about the relevant APIs on [MDN](https://developer.mozilla.org/en-US/) or try to find related specs. This information can help to decide which API is actually broken, where it’s broken, and what the correct behavior should be.

## Write clear reproduction steps

Bugs that get traction tend to be easy to reproduce (i.e. click this link) and easy to understand the expected outcome (eg. screenshots for pass / fail).

## Check behavior on different browsers

Behavior that differs between browsers is generally prioritized higher as an interoperability issue, especially when the browser where the bug is being filed is the odd one out. Try to test on the latest versions of Chrome, Firefox, Safari and Edge, possibly using a tool like [BrowserStack](http://browserstack.com).  


If possible, check that the page isn't intentionally behaving differently due to user agent sniffing. Try setting the user agent string to another browser in Dev Tools > Menu > More Tools > Network conditions.

## Check for a regression

Indicate whether you think the behavior may have changed from a previous version of the browser. Such "regressions" can be acted upon much quicker, especially if you supply a version number where it worked and a version where it failed. Tools like [BrowserStack](http://browserstack.com) can make it easy to check old browser versions.

If an issue is a regression and can be reproduced, the root cause can usually be found and fixed quickly.

## Create a minimized test case

Mozilla has a great [overview on how to minimize a test case](https://developer.mozilla.org/en-US/docs/Mozilla/QA/Reducing_testcases). Long story short, while a description of the problem is a great start, nothing beats providing a link (eg. to jsbin.com) in the bug that demonstrates the problem. To maximize the chance of fast progress it should be the minimum possible amount needed to demonstrate the problem. For issues that aren't regressions, a minimal code sample is the number one thing you can do to increase the odds of your bug getting fixed.  For regressions, a minimized test case may still be helpful but isn't necessary.

To minimize a test case, there are a few common tips:

* Download the web page, add <base href=”http://original.url”> and verify the bug exists locally. This may require a live HTTPS server if the URL uses HTTPS.
* Test the local files on the latest builds of as many browsers as you can
* Try to condense everything into 1 file
* Remove code (starting with things you know to be unnecessary) until the bug goes away
* Use version control so that you can back up if things go wrong

Once you’ve got your minimized test case, you’re ready to file that bug! Head over to our feedback page to find the right browser issue tracker.

## Include details of the environment

Some bugs reproduce only on certain operating systems, or only on a low-dpi or high-dpi display.  Be sure to include such details of any test environments.

## Look for existing bugs

If you’re experiencing problems, there’s a good chance other developers are too. Try searching for the bug on Stack Overflow. This might help you translate an abstract problem into a specific broken API. It might also give you a workaround for the short term.

Once you have a concrete idea of what the bug is, search for it on the [browser bug tracker](https://developer-feedback.appspot.com/web/feedback/). If you find an existing bug that describes the problem, it’s much more useful to add your support by starring, favoriting, or commenting on that bug. Filing duplicate bugs wastes time and effort for all parties.
