project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Intro to the Full Screen API

{# wf_updated_on: 2019-01-21 #}
{# wf_published_on: 2011-10-25 #}
{# wf_tags: news,games,multimedia,fullscreen #}
{# wf_blink_components: N/A #}

# Let Your Content Do the Talking: Fullscreen API {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}


Most browsers have the ability to enter a fullscreen or kiosk mode for a while now. Basically, the browser's chrome UI gets out of the way, and the content takes over. For apps installed from the Chrome Web Store, it's even been possible for users to [manually configure](https://developer.chrome.com/webstore/faq?csw=1#faq-app-18) an app to run fullscreen when it's opened from the New Tab Page. Manual fullscreen is good. Programmatic fullscreen is better!

The [Fullscreen API](https://fullscreen.spec.whatwg.org/) allows web apps to programmatically tell any content on the page to enter the browser's fullscreen viewing mode, from JavaScript. This means WebGL and `<canvas>` games can finally become fully immersive, videos can feel like the silver screen, and online magazines can feel like the real deal. I love the browser, but we shouldn't be constrained by it :)

If you want to skip the details, here's a [demo](http://html5-demos.appspot.com/static/fullscreen.html):

<a href="http://html5-demos.appspot.com/static/fullscreen.html"><img src="/web/updates/images/2011-10-26-let-your-content-do-the-talking-fullscreen-api/fullscreen-demo.jpg"></a>

So how does the API work? If you wanted a `<div>`, for example, to go fullscreen, simple tell it to:


    div.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    div.mozRequestFullScreen();
    div.msRequestFullscreen();
    div.requestFullscreen(); // standard


Then to exit fullscreen, the `document` exposes a method for that:


    document.webkitExitFullscreen();
    document.mozCancelFullScreen();
    document.msExitFullscreen();
    document.exitFullscreen();


*Note*: the `exitFullscreen()` is the spec version. However, both FF and WebKit still expose prefixed `cancelFullScreen()`.

Content in fullscreen-mode is centered in the browsers viewport. It's left to the developer to style that content in the most appropriate way for viewing. Typically, you'll want your `<div>` to take up the entire screen real-estate. Good news is that the API includes new CSS pseudo-selectors for this:


    div:-webkit-full-screen {
      width: 100% !important;
    }
    div:-moz-full-screen {
      width: 100% !important;
    }
    div:-ms-fullscreen {
      width: 100% !important;
    }
    div:fullscreen {
      width: 100% !important;
    }

    /* While in fullscreen, hide any children with class 'tohide' */
    :-webkit-full-screen .tohide {
      display: none;
    }
    :-moz-full-screen .tohide {
      display: none;
    }
    :-ms-fullscreen .tohide {
      display: none;
    }
    :fullscreen .tohide {
      display: none;
    }


CSS pseudo-selectors make it very easy to style fullscreen content any way you want.

The Fullscreen API is [enabled](https://caniuse.com/#search=fullscreen) by default in Chrome 15, FF 14, IE 11 and Opera 12.1. For more information on the rest of the API, see [the spec](https://fullscreen.spec.whatwg.org/).

*Updated 2012-10-11*: to be inline with spec changes. Lowercased the "S" in `requestFullscreen()`  and changed `document.webkitCancelFullScreen()` to `document.webkitExitFullscreen()`. Updated browser compatibility comment.

*Updated 2014-02-11*: to include prefixes for IE, add the standard CSS syntax, and update the browser compatibility comment. Thanks [@dstorey](https://twitter.com/dstorey) and [@patrickkettner](https://twitter.com/patrickkettner).


