project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml


{# wf_published_on: 2018-11-26 #}
{# wf_updated_on: 2018-11-26 #}
{# wf_featured_image: /web/updates/images/generic/audio.png #}
{# wf_tags: autoplay,news,media,games #}
{# wf_featured_snippet: A recap of our Web Audio autoplay policy changes which are rolling out soon in Chrome. #}
{# wf_blink_components: Blink>Media #}

# Web Audio, Autoplay Policy and Games {: .page-title }

{% include "web/_shared/contributors/tomgreenaway.html" %}
{% include "web/_shared/contributors/mlamouri.html" %}
{% include "web/_shared/contributors/hongchanchoi.html" %}

<div class="clearfix"></div>

In September 2017 we announced an upcoming change to how audio would be handled with autoplay behavior policy in Chrome. The policy change was released with Chrome 66 Stable in May 2018.

After feedback from the Web Audio development community we delayed the release of the Web Audio portion of the autoplay policy to give developers more time to update their websites. We’ve also made some changes to the implementation of the policy for Web Audio which will reduce the number of websites that need to adjust their code – especially web games – and therefore provide a better experience for our users.

This policy change is now scheduled to roll out with <b>Chrome 71 in December 2018</b>.

## What does the policy change do exactly? {: #policy-change}

Autoplay is the name given to a piece of content which immediately plays upon the loading of a webpage. For websites which expected to be able to autoplay their content, this change will prevent playback by default. In most cases, the playback will be resumed but in others, a small adjustment to the code will be needed. Specifically, developers must add code which resumes their content if the user interacts with the webpage.

However, if the user arrives on a page with autoplay content and they navigated to that page from a page of the same origin, then that content will never be blocked. Read our earlier blog post on the autoplay policy for [more detailed examples].

Additionally, we added a heuristic to learn from users’ past behavior with regard to websites that autoplay audio. We detect when users regularly let audio play for more than 7 seconds during most of their visits to a website, and enable autoplay for that website.

We do this with an index that is stored locally per Chrome profile on a device – it is not synced across devices and is only shared as part of the anonymized user statistics. We call this index the Media Engagement Index (MEI) and you can view it via chrome://media-engagement.

MEI keeps track of how many visits to a site include audio playback that is more than 7 seconds long. Based on a user’s MEI, we believe we can understand whether a user expects audio from a particular website or not – and anticipate the user's intent in the future.

If the user often lets a website’s domain play audio for more than 7 seconds then we assume in future that the user is expecting this website to have the right to autoplay audio. Therefore, we grant that website the right to autoplay audio without requiring the user to interact with a tab from that domain.

However, this right is not guaranteed indefinitely. If the user’s behavior switches – e.g. stopping audio playback or closing the tab within the 7 seconds threshold over the course of several visits – then we remove the website’s right to autoplay.

Both usage of media HTML elements (video and audio) and Web Audio (JavaScript instantiated AudioContext objects) will contribute to the MEI. In preparation for the rollout of this policy user behavior in relation to Web Audio will start contributing to the MEI from Chrome 70 and onwards. This will ensure we are already able to anticipate the user’s desired intent with regard to autoplay and the websites they commonly visit.

It should be noted that iframes can only gain the right to autoplay without user interaction if the parent webpage that embeds the iframe [extends that right to the given iframe].

## Delaying change to support the community  {: #policy-delay}

The Web Audio developer community – particularly the web game developer and WebRTC developer portions of this community – took notice when this change appeared in the Chrome Stable channel.

The community feedback was that many web games and web audio experiences would be affected negatively by this change – specifically, many sites which were not updated would no longer play audio to users. As a result, our team decided it was worth delaying this change to give web audio developers more time to update their websites.

Additionally, we took this time to:

* Seriously consider whether this policy change was the best course of action or not.
* Explore ways we could help reduce the number of websites with audio that would be impacted.

For the former, we ultimately decided that the policy change is indeed necessary to improve the user experience for the majority of our users. More detail on what problem the policy change is solving can be read in the next section of this article.

For the latter, we have made an adjustment to our implementation for Web Audio which will reduce the number of websites that were originally impacted. Of the sites we knew were broken by the change – many of which were provided as examples by the web game development community – this adjustment meant that more than 80% of them would work automatically. Our analysis and testing of [these example sites can be viewed here]. This new adjustment is described in more detail below.

We also made a change to support WebRTC applications; while there is an active capture session, autoplay will be allowed.

## What problem is this behavior change aiming to solve? {: #policy-purpose}

Browsers have historically been poor at helping the user manage sound. When users open a webpage and receive sound they did not expect or want, they have a poor user experience. This poor user experience is the problem we are trying to solve. Unwanted noise is the primary reason that users do not want their browser to autoplay content. 

However, sometimes users want content to autoplay, and a meaningful number of blocked autoplays in Chrome are subsequently played by the user.

Therefore, we believe by learning from the user – and anticipating their intention on a per website basis – we can create the best user experience. If users tend to let content play from a website, we will autoplay content from that site in the future. Conversely, if users tend to stop autoplay content from a given website, we will prevent autoplay for that content by default.

One proposal put forward by the community has been to mute the audio of a tab instead of pausing the autoplay. However, we believe it’s better to halt the autoplay experience so that the website is aware that the autoplay was blocked, and allow the website developer to react to this. For example, while some developers may wish to simply mute audio, other developers might prefer their audio content be paused until the user actively engages with the content – otherwise the user might miss part of the audio experience.

## New adjustments to help web game developers {: #policy-adjustments}

The most common way developers use the Web Audio API is by creating two types of objects to play audio:

* An [AudioContext]
* And [AudioNodes], which are attached to a context

Web audio developers will create an AudioContext for playing audio. In order to resume their audio after the autoplay policy has automatically suspended their AudioContext, they need to call the resume() function on this object after the user interacts with the tab:

    const context = new AudioContext();

    // Setup an audio graph with AudioNodes and schedule playback.
    ...

    // Resume AudioContext playback when user clicks a button on the page.
    document.querySelector('button').addEventListener('click', function() {
      context.resume().then(() => {
        console.log('AudioContext playback resumed successfully');
      });
    });

There are many interfaces which inherit from AudioNode, one of which is the [AudioScheduledSourceNode] interface. AudioNodes that implement the AudioScheduledSourceNode interface are commonly referred to as <b>source nodes</b> (such as AudioBufferSourceNode, ConstantSourceNode, and OscillatorNode). Source nodes implement a start() method.

Source nodes commonly represent individual audio snippets that games play, for example: the sound that is played when a player collects a coin or the background music that plays in the current stage. Game developers are very likely to be calling the start() function on source nodes whenever any of these sounds are necessary for the game. 

Once we recognized this common pattern in web games we decided to adjust our implementation to the following:

<i>An AudioContext will be resumed automatically when two conditions are met:

* The user has interacted with a page.
* The start() method of a source node is called.</i>

Due to this change, most web games will now resume their audio when the user starts playing the game.

## Moving the web forward {: #moving-forward}

In order to move the web platform forward it’s sometimes necessary to make changes which can break compatibility. Unfortunately, audio autoplay is complex and falls into this category of change. But making this shift is critical to ensure that the web doesn’t stagnate or lose its innovative edge.

Nonetheless, we recognize that applying fixes for websites is not always feasible in the short term for various reasons:

* Web developers might be focused on a new project and maintenance to an older website is not immediately possible.
* Web game portals may not have control over the implementation of the games in their catalog and updating hundreds – if not thousands – of games can be time consuming and expensive for publishers.
* Some websites may simply be very old and – for one reason or another – are no longer maintained but still hosted for historical purposes.

Here is a short JavaScript code snippet which intercepts the creation of new AudioContext objects and will autotrigger the resume function of these objects when the user performs various user interactions. This code should be executed before the creation of any AudioContext objects in your webpage – for example, you could add this code to the <head> tag of your webpage:

    (function () {
      // An array of all contexts to resume on the page
      const audioContextList = [];

      // An array of various user interaction events we should listen for
      const userInputEventNames = [
          'click', 'contextmenu', 'auxclick', 'dblclick', 'mousedown',
          'mouseup', 'pointerup', 'touchend', 'keydown', 'keyup'
      ];

      // A proxy object to intercept AudioContexts and
      // add them to the array for tracking and resuming later
      self.AudioContext = new Proxy(self.AudioContext, {
        construct(target, args) {
          const result = new target(...args);
          audioContextList.push(result);
          return result;
        }
      });

      // To resume all AudioContexts being tracked
      function resumeAllContexts(event) {
        let count = 0;

        audioContextList.forEach(context => {
          if (context.state !== 'running') {
            context.resume()
          } else {
            count++;
          }
        });

        // If all the AudioContexts have now resumed then we
        // unbind all the event listeners from the page to prevent
        // unnecessary resume attempts
        if (count == audioContextList.length) {
          userInputEventNames.forEach(eventName => {
            document.removeEventListener(eventName, resumeAllContexts); 
          });
        }
      }

      // We bind the resume function for each user interaction
      // event on the page
      userInputEventNames.forEach(eventName => {
        document.addEventListener(eventName, resumeAllContexts); 
      });
    })();

It should be noted that this code snippet will not assist with resuming AudioContexts that are instantiated within an iframe, unless this code snippet is included within the scope of the content of the iframe itself.

## Serving our users better {: #our-users}

To accompany the policy change we are also introducing a mechanism for users to disable the autoplay policy to cover the cases where the automatic learning isn’t working as expected, or for websites that are rendered unusable by the change. This change will be rolling out with the new policy in Chrome 71 and can be found in the Sound Settings; sites where the user wants to allow autoplay can be added to the Allow list.

## How is the MEI constructed for new users? {: #how-the-mei-works}

As mentioned earlier, we build the MEI automatically over time based on the user’s behavior to anticipate their desired intent with regard to a given website with autoplay content. Each website has a score between zero and one in this index. Higher scores indicate the user expects content to play from that website.

However, for new user profiles or if a user clears their browsing data, instead of blocking autoplay everywhere, a pre-seed list based on anonymized user aggregated MEI scores is used to determine which websites can autoplay. This data only determines the initial state of the MEI at the creation of the user profile. As the user browses the web and interacts with websites with autoplay content their personal MEI overrides the default configuration.

The pre-seeded site list is algorithmically generated, rather than manually curated, and any website is eligible to be included. Sites are added to the list if enough users who visit that site permit autoplay on that site. This threshold is percentage-based so as not to favor larger sites.

## Finding balance {: #conclusion}

We have posted new documentation to give more insight into our [decision making process and the design rationale] behind this policy. As well as new documentation on [how the pre-seeded site list works].

We always put our users first but we also don’t want to let down the web development community. Sometimes being the browser means that these two goals must be carefully balanced. We believe that with our adjustments to the implementation of the policy, and the additional time we provided for web audio developers to update their code, that we will achieve this balance with Chrome 71.

{% include "web/_shared/rss-widget-updates.html" %}

## Feedback {: .hide-from-toc }

{% include "web/_shared/helpful.html" %}

<div class="clearfix"></div>

[more detailed examples]: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#example_scenarios
[extends that right to the given iframe]: https://developers.google.com/web/updates/2017/09/autoplay-policy-changes#iframe
[these example sites can be viewed here]: https://docs.google.com/spreadsheets/d/1JDyGFK44q3DfnOFXMsubNeC2MI-pE5rwfERomDi2lJg/view
[AudioContext]: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
[AudioNodes]: https://developer.mozilla.org/en-US/docs/Web/API/AudioNode
[AudioScheduledSourceNode]: https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode
[decision making process and the design rationale]: https://sites.google.com/a/chromium.org/dev/audio-video/autoplay/autoplay-policy-design-rationale
[how the pre-seeded site list works]: https://sites.google.com/a/chromium.org/dev/audio-video/autoplay/autoplay-pre-seeding-in-chrome
