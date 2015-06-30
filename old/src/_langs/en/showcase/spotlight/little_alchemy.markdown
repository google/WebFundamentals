---
id: little_alchemy
layout: spotlight
collection: spotlight
type: spotlight
published: true

date: 2015-04-08
article:
  written_on: 2015-04-08
  updated_on: 2015-04-08

authors:
  - pbakaus

tags: 
- games
scores:
  pagespeed:
      speed: 66
      ux: 100
  webpagetest:
      value: 4720
      result: http://www.webpagetest.org/result/150408_NM_D2H/

title: "Little Alchemy"
link: http://littlealchemy.com/
developer: Jakub Koziol

description: "A fun, mobile-friendly combination game inspired by its bigger brother Alchemy."
pros: |
  Little Alchemy is a prime example of using all of the web platform's latest abilities to its full advantage. It uses the [web app manifest](/web/fundamentals/device-access/stickyness/web-app-manifest.html) to launch fullscreen when installed and blends in with Android with the help of [theme-color](/web/fundamentals/device-access/stickyness/additional-customizations.html).

  The first time load is extremely responsive and shows the preloader right away. In addition, it can be played entirely offline through its use of AppCache. Well done.
cons: |
  On Desktop, blocking right clicking is usually considered no-no (but it allowed me to find the secret cheat code by mistyping the Chrome DevTools shortcut :)). Not a terribly big deal for a game though.

  UI-wise, a grid might improve the "all-over-the-place" feel, and when dragging elements on mobile, shifting them slightly to the top so that you can see what you're moving below your finger could improve visibility.

interview:
  - question: Why the web?
    answer: |
      Instant access, truly cross-platform and the most convenient way of sharing on top of that. If that doesn’t sound good I don’t know what does.

      Little Alchemy started as an experiment for Chrome Web Store a few years back. Over time we expanded to other platforms but the web version remains our main focus. Right now all of our native apps are directly based on the web app. It cuts a lot of work and streamlines the process of updating the game, which is incredibly important for a tiny team like ours.
  - question: What worked really well during development?
    answer: |
      With the current iteration of Little Alchemy we focused a lot on the mobile web. During the development we worked with many physical devices and remote Chrome DevTools helped us to significantly speed up the process.

      We also really enjoyed the work on performance and responsive design. Current set of tools in Chrome allows for very efficient work on these aspects of the app. 
  - question: If you could have any API to improve your app, what would it be?
    answer: |
      Games are usually heavily dependent on images. For example we have a library of over 500 images that need to be scalable and for the optimal experience they should be loaded before the player starts the game. It requires different logic than your typical web app where you can lazy load and use atlases. Having a way to deal with that in an efficient way would save us a lot of work and would make for a better experience for our players.

      Also monetization of web games is still problematic. It’s almost impossible to implement payments without going straight into free to play and there aren’t many elegant ways to support HTML5 games with ads. It’s an issue that informs the types and quality of games on the web platform.

related:
-
    title: "Web App Manifest"
    href: fundamentals/device-access/stickyness/web-app-manifest.html
    section:
      id: stickyness
      title: "Add To Home Screen"
      href: fundamentals/device-access/stickyness/
-
    title: "Theme Color"
    href: fundamentals/device-access/stickyness/additional-customizations.html
    section:
      id: stickyness
      title: "Add To Home Screen"
      href: fundamentals/device-access/stickyness/
---