---
layout: case-study
collection: case-study
published: true

date: 2015-01-09
article:
  written_on: 2015-01-09
  updated_on: 2015-01-09

id: chrome-dev-summit
title: "Chrome Dev Summit 2014"
introduction: "Built in-house by our own Paul Lewis, the CDS website showed how to build a great mobile web experience for conference visitors."
link: https://developer.chrome.com/devsummit/

scores:
  pagespeed:
      speed: 73
      ux: 99
  webpagetest:
      value: 5810
      result: http://www.webpagetest.org/result/150306_X0_PQF/

overview:
  description: "The CDS site was the premier destination to read about all things Chrome Dev Summit, a two-day developer event about Chrome in 2014. It was used by attendees to get infos about the schedule, signup and more."
  audience: Offline and online attendees of the Chrome Dev Summit 2014.
  features:
    - Conference information
    - Livestream embed through YouTube
  webbyness:
    - title: Ephemeral (No install required)
      link: /web/choosing-the-web#ephemeral

behind_the_scenes:
  description: "Remarkable is the smoothness at which the site runs in various mobile browsers. It's utilizing the layout and paint cycles of the browser in the best way possible."
  owp:
    - Service Worker
    - Manifest
    - Theme Color
  patterns:
    - Expanding cards
    - Responsive Grid
    - Material Design
  source_code:
    - title: Github
      link: https://github.com/GoogleChrome/devsummit
  oss:
    - title: JS Signals
      link: http://millermedeiros.github.io/js-signals/
    - title: Service Worker Cache Polyfill
      link: https://github.com/coonsta/cache-polyfill

our_views:
  good:
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
  bad:
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
    - Showcase nunc nec urna fermentum fermentum. Curabitur a interdum lacus.
other_case_studies:
  - title: Case study number one
    description: Case study title
    link: /spotlights/example-showcase/
    image: ../../../imgs/image-example-2.jpg
  - title: Case study number two
    description: Case study title
    link: /spotlights/example-showcase/
    image: ../../../imgs/image-example-3.jpg
  - title: Case study number three
    description: Case study title
    link: /spotlights/example-showcase/
    image: ../../../imgs/image-example-4.jpg

---

<div class="container clear">

  <div class="content">
  <h2>Development</h2>
    <div class="divider divider--secondary">
      <span class="themed divider-icon"></span>
    </div>

    <div class="team-member">
      <a href="http://aerotwist.com/" target="_blank" title="Paul Lewis" class="themed">
        <span class="icon-circle--large themed--background" style="background-image: url(/web/imgs/contributors/paullewis.jpg); background-size: contain;"></span>
        <h3 class="large">Paul Lewis</h3>
      </a>
      <span>Primary developer</span>
    </div>

    <p class="quote__content-icononly">There were some key areas for me as I was building the site. Firstly, I wanted to build for small screens first, and build up to larger screens. Overall I found that requires just a bunch of media queries, but also a fair bit of freedom to eyeball small changes between the key breakpoints. Tracking back and forth between screen sizes gave me a sense of where content would break, and then I went about fixing it.</p>

    <p>I’m a big believer in Progressive Enhancement, but also being as backwards-compatible as possible. I chose to use floats over Flexbox because I felt it would increase the number of browsers that the site would work on, and actually for the layout of the site, it was no problem at all. If I needed Flexbox I would’ve use PE to add it on.</p>

    <p>A major challenge of the site was the card expand and collapse feature, which required thinking up a whole new way to do my animations work. I came up with a strategy I call <a href="http://aerotwist.com/blog/flip-your-animations">FLIP</a> which involves setting animating elements to their final state. From there you apply compositor-friendly properties like transforms and opacity to invert the changes and return the element to its start position. Finally, with that done, enable transitions on transforms and opacity, and remove those changes. This causes the elements to move to their final positions once more! It’s a little crazy, but it works super well, and it gives you a performance boost.</p>

  </div>

  <div class="content">
    <h2>Performance</h2>

    <div class="divider divider--secondary">
      <span class="themed divider-icon"></span>
    </div>

    <div class="team-member">
      <a href="http://aerotwist.com/" target="_blank" title="Paul Lewis" class="themed">
        <span class="icon-circle--large themed--background" style="background-image: url(/web/imgs/contributors/paullewis.jpg); background-size: contain;"></span>
        <h3 class="large">Paul Lewis</h3>
      </a>
      <span>Primary developer</span>
    </div>

    <p class="quote__content-icononly">I’d say that performance was a super important consideration for me.  I used <a href="http://webpagetest.org">WebPageTest</a> to get my Speed Index value as low as I could. I managed to get it less than 1,000, which meant that most of the users would get an initial render in under 1 second. Most of the work was in Grunt tasks to concatenate, minify, and compress images as much as possible. I also deferred non-essential images to after page load so that I could get content to screen more quickly.</p>

    <p>To make the page load time better, I dropped in a Service Worker, which meant that whether you were online or not, page visits could be served up from a cache, ensuring that you get to the content super fast! It was one of the first production sites to use Service Worker, which kind of meant I ran into a bunch of “early adopter issues”, but on balance I wouldn’t change a thing; it’s such a performance boost I’d personally love to have it on every site I build!</p>

    <p>Performance isn’t just how well a site loads, but also how well it runs. I knew the animations were going to be a challenge, which is why I came up with FLIP. Besides that I went out of my way to ensure that nothing got in the way of touch input or scrolling. Despite the fact that the site isn’t a hugely complex one, I adopted a modified <a href="https://developers.google.com/web/fundamentals/performance/rendering/use-the-rail-performance-model?hl=en">RAIL methodology</a> for the build (I didn’t really need much Idle time), and it helped a bunch!</p>

  </div>

  <div class="content">
    <h2>Design</h2>
    <div class="divider divider--secondary">
      <span class="themed divider-icon"></span>
    </div>

    <div class="team-member">
      <a href="http://aerotwist.com/" target="_blank" title="Paul Lewis" class="themed">
        <span class="icon-circle--large themed--background" style="background-image: url(/web/imgs/contributors/paullewis.jpg); background-size: contain;"></span>
        <h3 class="large">Paul Lewis</h3>
      </a>
      <span>Primary developer</span>
    </div>

    <p class="quote__content-icononly">I was lucky enough to be both the designer and developer on the project, which meant that both teams had unprecedented levels of understanding regarding each others’ concerns!</p>

    <p>I like to design desktop down, because it gives me a sense of what needs to go into the project, then I drop down to the mobile view, which allows me to refine things significantly, and make sure that the most important things are getting the most attention. That then informs the desktop version, because invariably information architecture and priority will need updating.</p>

    <p>I did make some mistakes here, though. The Material Design guidelines weren’t so clear about how to make a content site at the time I was designing, so I think there were definitely areas where I fell short. I also failed to account for the schedule and session information being related, and in the end the UX meant that people would go to the schedule and be frustrated that they couldn’t get straight to the session information. Ultimately neither of these problems were show-stoppers, but I’d say that if I had another go I would have done a much more thorough wireframing process up front to really ensure I was designing the right things.</p>

    <p>With all that said, I’m really pleased with the visuals and motion in the final site. I feel like it has a Material Design feel to it, and the information and look encourages interaction and hierarchy that I wanted from the outset.</p>

  </div>

  <div class="content">
    <h2>Success</h2>
    <div class="divider divider--secondary">
      <span class="themed divider-icon"></span>
    </div>

    <div class="team-member">
      <a href="http://aerotwist.com/" target="_blank" title="Paul Lewis" class="themed">
        <span class="icon-circle--large themed--background" style="background-image: url(/web/imgs/contributors/paullewis.jpg); background-size: contain;"></span>
        <h3 class="large">Paul Lewis</h3>
      </a>
      <span>Primary developer</span>
    </div>

    <p class="quote__content-icononly">This project had a bunch of success metrics attached to it.</p>

    <p>We wanted the source code to be shared with a much wider audience, and that worked out: the entire site is on 
    <a href="https://github.com/googlechrome/devsummit">GitHub</a> for everyone to benefit from. That includes the build tasks, the assets, everything.</p>

    <p>More than that we wanted it to be a place where we could include the latest and greatest from the web platform, so not only did the site have a Service Worker, but it also had a Web Manifest file and dynamic theme colors. The net effect is something that feels really integrated with the platform when run on Android devices. If added to the user’s homescreen, it feels very much like an app they would use, and that’s really cool.</p>

    <p>Last, but by no means least, we of course wanted people to use the site! And we got that in spades. There were x thousand page visits on the site, many of course during the conference itself.</p>

  </div>

  <div class="spotlight-content clear">
    <div class="indented-medium g--half">
      <h3>Data examples</h3>

      <ul>
        <li>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni, deleniti nemo inventore autem? Velit, laboriosam, voluptatibus, officia inventore.</li>
      </ul>

      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque, nostrum, a culpa sed perspiciatis voluptas alias eos quis. Quos, laboriosam, modi aliquam odit illo quam ut veritatis obcaecati autem reiciendis?</p>

    </div>

    <div class="centered g--half g--last">
      <h3>Key users</h3>
      <figure class="case-study__img-wrapper contained">
        <img src="../../../imgs/placeholder--square.png" alt="image placeholder" class="fluid">
        <figcaption>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, porro eius.</figcaption>
      </figure>
    </div>
  </div>

</div>