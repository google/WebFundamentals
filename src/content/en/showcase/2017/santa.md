project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2017-03-26T18:00:00.000Z #}
{# wf_updated_on: 2017-03-26T18:00:00.000Z #}
{# wf_featured_image: /web/showcase/2017/images/santa/featured.png #}
{# wf_featured_snippet: Santa Tracker is a fun and educational experience for everyone—a holiday tradition here at Google. In 2016, we upgraded the Santa Tracker site to support offline via Service Worker. #}
{# wf_tags: pwa,polymer,casestudy #}


# Santa Tracker as a PWA {: .page-title }

*By Sam Thorogood, Chief Santaware Engineer, Google—with contributions from Philipp Legner, Software Engineer, Google*

<a class="button button-primary" href="https://santatracker.google.com/">
  View the site
</a>

## Results

* Santa is a PWA supporting Add To Home Screen (ATHS) and offline
* 10% of eligible sessions began via the ATHS icon
* 75% of users natively supported Custom Elements and Shadow DOM, two core parts of Web Components
* [Lighthouse score of 81](https://pwa-directory.appspot.com/pwas/5704513654620160)
* Offline through Service Worker is tied with lazy loading to only cache visited scenes and silently upgrading them on new releases

## Background

[Santa Tracker](https://santatracker.google.com) is a holiday tradition here at Google.
Every year, you can celebrate the season with games and educational experiences all throughout December.
And while Santa takes a well-deserved break, the elves work to release Santa Tracker as open-source—both on [the web](https://github.com/google/santa-tracker-web) and for [Android](https://github.com/google/santa-tracker-android).

On the web, Santa Tracker is a large, interactive site with many unique 'scenes'—written using Polymer—that supports most modern browsers.
This is determined through feature detection: Santa requires [`Set`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set) and the [Web Performance API](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now), among others.

In 2016, we upgraded the engine behind Santa Tracker to support an offline experience for most scenes.
This excludes scenes backed by YouTube videos or those that deal with Santa's live location—which is of course only available with a direct connection to the North Pole! 📶☃️

<figure>
  <img src="/web/showcase/2017/images/santa/phone.png" />
  <figcaption>
    Santa Tracker on an Android device
  </figcaption>
</figure>

## Challenges

Santa incorporates a responsive design that works well across phones, tablets and desktop.
The site delights with great multimedia, including stylized visuals and holiday-themed audio.
However, a regular build of Santa Tracker is several hundred mb (!).
This is for a few reasons-

* Santa is supported in over 35 languages, so many assets must be duplicated
* Different platforms have different media support (e.g., mp3 vs ogg)
* Multimedia files are sometimes provided in different sizes and resolutions.

Santa's elves are also hard at work throughout December, often releasing new, critical updates throughout the month.
This means that assets already cached by a user's browser may need to be refreshed ton repeat visits.

These challenges;

* Large multimedia resources for different 'scenes'
* Changes released throughout the month

...result in the unsuitability of a naïve offline strategy.

## Santa, built with Polymer

It's worth stepping back and talking about Santa's overall design before diving into how we upgraded it to an offline PWA.

Santa is a single-page application, originally written in Polymer 0.5, and now upgraded to Polymer 1.7.
Santa is made up of a shared set of code—the router, shared nav assets etc—but it also has many unique 'scenes'.

<figure class="attempt-right">
  <img src="/web/showcase/2017/images/santa/preloader.gif"  />
</figure>

Each scene is accessible through a different URL—`/village.html`, `/codelab.html` and `/boatload.html`—and is its own web component.
When a user opens a scene, we preload all its required HTML and assets (images, audio, css, js), which exist under `/scenes/[[sceneName]]` in the Santa Tracker repository.
While that happens, users see a friendly preloader that shows progress.

This approach means that we don't have to load unnecessary assets for scenes the user doesn't see (which is a lot of data!).
It also means that we need to keep an internal 'cache manifest' (keep this in mind—we'll refer to it later) of all the assets required for every scene.

### Load What You Use

This model saves bandwidth, only serving resources required for the scenes a user visits: rather than preloading the whole site at once.
Santa Tracker leverages Polymer's ability to upgrade custom elements at runtime, rather than at load time-

```html
<lazy-pages id="lazypages" selected-item="{{selectedScene}}" ... >
  <dorf-scene id="village" route="village" icon="1f384" permanent
      mode$="[[mode]]"
      path$="scenes/dorf/dorf-scene_[[language]].html"
      class="santa-scene" allow-page-scrolling></dorf-scene>

  <boatload-scene route="boatload" icon="26f5"
      path$="scenes/boatload/boatload-scene_[[language]].html"
      loading-bg-color="#8fd7f7"
      loading-src="scenes/boatload/img/loading.svg"
      logo="scenes/boatload/img/logo.svg"
      class="santa-scene"></boatload-scene>
```

When Santa Tracker first loads, all scenes are effectively treated as unknown elements by the browser.
The `lazy-pages` element—which inherits behavior from the framework's [`IronSelectableBehavior`](https://www.webcomponents.org/element/PolymerElements/iron-selector/Polymer.IronSelectableBehavior)—listens for a change in the selected page.
When it changes, it knows to resolve the `path` attribute of a scene, and use HTML imports to load it.

1. The element `<boatload-scene>` is unknown and is treated as a HTMLUnknownElement with some additional attributes
2. The `<lazy-pages>` element chooses the scene, loading the HTML import `scenes/boatload/boatload-scene_en.html`—this contains the Polymer element and its dependant elements
3. The friendly preloader is shown
4. Once the HTML import is loaded and executed, `<boatload-scene>` is transparently upgraded to a real Polymer element, full of holiday cheer 🎄🎉

This approach has its challenges—for example, we don't want to include duplicate web components.
If two scenes use a common element, e.g., `paper-button`, we strip it out as part of our build process and instead include it in Santa's shared code.

## Offline Design

Santa Tracker is already neatly segmented into scenes thanks to Polymer and `lazy-pages`; plus each scene has its own directory.
We designed Santa Tracker's Service Worker, the core piece that enables offline which runs on a user's browser, to be aware of the shared code vs 'scene' distinction.

What's the theory behind Service Worker? When a user on a supported browser loads your site, the frontend HTML can request that the Service Worker (SW) is installed.
For Santa Tracker, the SW lives at [`/sw.js`](https://santatracker.google.com/sw.js).
This then runs an 'install' event that will precache all of Santa's shared code, so nothing needs to be fetched at runtime.

<figure>
  <img src="/web/showcase/2017/images/santa/sw-flow.png"  />
</figure>

The Service Worker, once installed, is able to intercept all HTTP requests.
For Santa Tracker, the simplified decision flow looks like-

1. Is the request already cached?
  * Great! Return the cached response.
2. Does the request being made match a scene directory, like "scenes/boatload/boatload-scene_en.html"?
  * Perform a network request, and store the result in the cache before returning it to the user.
3. Otherwise, perform a regular network request.

Our flow and 'install' event allows Santa Tracker to load, even while a user is offline.
However, only the scenes a user has previously loaded will be available—perfect for replaying that one game and beating your high score.

Keen observers may note that our caching strategy doesn't allow for _changes_ in content.
Once a file is cached in a user's browser, it will never be changed.
More on that later!

### We'll Do It Live

As we mentioned, Santa's elves also hard at work throughout December, and they often have to release new updates throughout the month.
When a release of Santa Tracker is built, it is given a unique label—e.g., `v20161204112055`, the timestamp of the release (11:20:55 on the 4th of December, 2016).

For this labelled release, we generate a MD5 hash of every file and store this in our 'cache manifest'.
On a modern SSD, this only adds a few seconds.

Each release is deployed to a unique path on Google's static caching server—that is, older releases are never removed.
This means that after a new release, all assets will have a different URL—even if they didn't change—and anything cached by the browser or the service worker will be useless, unless we do some extra work.

We also deploy a new version of what we call the "prod" resources—Santa's index HTML and Service Worker, which live on [https://santatracker.google.com/](https://santatracker.google.com/)—this does overwrite the old version.

<figure>
  <img src="/web/showcase/2017/images/santa/static-prod.png"  />
</figure>

Whenever Santa Tracker is loaded, clients will always refetch the Service Worker, to see if there's an upgrade available.
In our case, each release generates a byte-different code—the browser sees this as an upgrade, and performs a new 'install' event.

At this point, a user's browsers will look at the new 'cache manifest'.
This will be compared with the user's existing cache and if assets have a different MD5 hash, we delete it from the cache—and ask the browser to refetch it.
However, in most cases, the cached content is largely the same or with only minor differences.

<figure>
  <img src="/web/showcase/2017/images/santa/cache-manifest.png"  />
</figure>

In Santa Tracker, upgrading the Service Worker also forces an immediate refresh of our clients—there's not too much state in a Santa game that a user risks losing—although this strategy is up to you.

### Offline Browsing Experience

Of course, we also had to make some changes to the UI to support an offline experience—and to make it easier to understand for users who might not expect that a website can work offline.

A small banner tells you when you're browsing offline.
All scenes that aren't cached are "frozen" and unclickable.
That way, users aren't able to access content that isn't available.

<figure class="attempt-right">
  <img src="/web/showcase/2017/images/santa/offline.png"  />
</figure>

Santa Tracker makes regular requests to Santa's API.
If these requests fail or timeout, we assume that the user is offline.
We use this API rather than the browser's built-in [`navigator.onLine` property](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine): this would only inform us whether the user is maybe online (this is also known as Lie-Fi).

### The International Connection

While the majority of our users are in English—followed by Japanese, Portuguese, Spanish and French—Santa is built and released in over 35 different languages.

When a user loads Santa Tracker, we use the [browser's language](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language) and other cues to choose a language to serve.
The majority of users never overwrite this language.
However, if a user chooses a new language through our picker, we treat this as if an upgrade is available—just as in the case above, when a new version of Santa Tracker is available.

<figure>
  <img src="/web/showcase/2017/images/santa/language.gif"  />
</figure>

To put it another way, the current version of Santa Tracker for the purposes of the Service Worker, is actually a tuple of _(build,language)_.

## Add To Home Screen

Because Santa works offline and provides a Service Worker, eligible users are prompted to install it to their home screen.
In 2016, around 10% of eligible loads were from this home screen icon.

## Conclusion

We were able to rapidly convert Santa Tracker into an offline PWA—enabling a reliable, engaging experience—thanks to our existing scene design, made easy through our existing use of Polymer and Web Components.
It also leverages our build system to perform efficient upgrades, invalidating changed assets only.

While Santa is largely a custom-built solution, many of its principles can be found in the Polymer Project's [App Toolbox](https://www.polymer-project.org/1.0/toolbox/).
We suggest you check it out if you're building a new PWA from scratch—or, if you're looking for a framework-agnostic approach, try the the [Service Worker Helpers Library](https://github.com/GoogleChrome/sw-helpers).