project_path: /web/_project.yaml
book_path: /web/showcase/_book.yaml

{# wf_published_on: 2015-10-16 #}
{# wf_updated_on: 2015-10-16 #}
{# wf_author: paulkinlan #}
{# wf_featured_image: /web/showcase/2015/images/airhorner/card.jpg #}
{# wf_featured_snippet: AirHorner is a simple but powerful Progressive Web App that shows the power of Service Workers and the Web Audio API to give you your very own air horn. Use it to annoy your friends or co-workers, no matter whether you're online, offline or on a flaky 2G network. #}
{# wf_tags: spotlight,serviceworker,offline,addtohomescreen #}

# AirHorner.com {: .page-title }

<img src="images/airhorner/screenshot.png" class="attempt-right">

### TL;DR {: .hide-from-toc }

[AirHorner](https://airhorner.com/){: .external } is a simple air horn.

### What we like?

There is a little bit of bias here, the author of this post wrote the app.  But in summary, it is installable and works offline.

### Possible Improvements

Is the fact that it is incredibly annoying not enough?

## Q & A with Paul Kinlan

### Why the web?

I built this app because I wanted to show users and developers that not
every single app needs to be a native app, and for an experience such as
this where it is only meant to be used once in while, but feel like it should
be installed. The web is an ideal distribution platform for this.

### Are you worried that service worker is not yet in all browsers?

No. I made this app to load quickly irrespective of the browser being used,
service worker for installability and offline is an added bonus that should
delight users. My thought at the time was that if a user adds this app to the
home screen then it *must* work where ever the user is irrespective of the
conncetivity.

### If you could have any API to improve your app, what would it be?

**Web Intents** but everyone knows that.  Actually, Web Intents wouldn't have
been useful for this app.  One area that I would love to see expanded is
Payments, I could quite easily see that having a quick way to buy new sounds
etc would be quite nice.

