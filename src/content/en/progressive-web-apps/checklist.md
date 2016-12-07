project_path: /web/_project.yaml
book_path: /web/progressive-web-apps/_book.yaml
description: A checklist which breaks down all the things we think it takes to be a Baseline PWA, and how to take that a step further with an Exemplary PWA. 

{# wf_updated_on: 2016-11-07 #}
{# wf_published_on: 2016-11-07 #}

# Progressive Web App Checklist {: .page-title }

Progressive Web Apps (PWA) are reliable, fast, and engaging, although there are 
many things that can take a PWA from a baseline to exemplary experience.

To help teams create the best possible experiences we've put together this 
checklist which breaks down all the things we think it takes to be a [Baseline](#baseline) 
PWA, and how to take that a step further with an [Exemplary](#exemplary) PWA by providing a 
more meaningful offline experience, reaching interactive even faster and taking 
care of many more important details.

The [Lighthouse tool](https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk) 
is able to automatically verify many items on the [Baseline](#baseline) list and may prove 
helpful in easily testing sites.

## Baseline PWA checklist {: #baseline }

The following tests are verifiable with the Lighthouse tool.

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Site is served over HTTPS</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>Use Lighthouse to verify "Served over HTTPS"</td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Implement HTTPS - check out 
        <a href="https://letsencrypt.org/">letsencrypt.org</a> to get started.
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Pages are responsive on tablets &amp; mobile devices</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        <ul>
          <li>Use Lighthouse to verify: Yes to all of "Design is mobile-friendly", although manually checking can also be helpful.</li>
          <li>Check the <a href="https://www.google.com/webmasters/tools/mobile-friendly/">Mobile Friendly Test</a></li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Look at implementing a 
        <a href="/web/fundamentals/design-and-ui/responsive/fundamentals/">
        responsive design</a>, or adaptively serving a viewport-friendly site.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>The start URL (at least) loads while offline</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Use Lighthouse to verify: "URL responds with a 200 when offline".
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Use a <a href="/web/fundamentals/primers/service-worker/">Service Worker</a>.
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Metadata provided for Add to Home screen</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Use Lighthouse to verify "User can be prompted to Add to Home screen"
        is all Yes.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Add a <a href="/web/fundamentals/engage-and-retain/web-app-manifest/">
        Web App Manifest</a> file to your project.
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>First load fast even on 3G</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Use Lighthouse on a Nexus 5 (or similar) to verify time to interactive
        &lt;10s for first visit on a simulated 3G network.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        <ul>
          <li>There are <a href="/web/fundamentals/performance/">many ways to improve performance</a>.</li>
          <li>
            You can understand your performance better by using
            <a href="/speed/pagespeed/insights/">Pagespeed Insights</a>
            (aim for score &gt;85) and SpeedIndex on 
            <a href="https://www.webpagetest.org/">WebPageTest</a>
            (aim for &lt;4000 first view on Mobile 3G Nexus 5 Chrome)
          </li>
          <li>
            A few tips are to focus on loading less script, make sure as much 
            script is loaded asynchronously as possible using <code>&lt;script
            async&gt;</code> and make sure
            <a href="/web/fundamentals/performance/critical-rendering-path/render-blocking-css">
            render blocking CSS is marked as such.</a>
          </li>
          <li>
            You can also look into using the
            <a href="/web/fundamentals/performance/prpl-pattern/">PRPL pattern</a>
            and tools like <a href="/speed/pagespeed/module/">modepagespeed</a>
            on the server.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Site works cross-browser</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Test site in Chrome, Edge, Firefox and Safari
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Fix issues that occur when running the app cross-browser
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2>
        <h3>Page transitions don't feel like they block on the network</h3>
      </th>
    </tr>
    <tr>
      <td colspan="2" class="alt">
        Transitions should feel snappy as you tap around, even on a slow
        network, a key to perceived performance.
      </td>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Open the app on a simulated very slow network. Every time you tap 
        a link/button in the app the page should respond immediately, either by:
        <ul>
          <li>
            Transitioning immediately to the next screen and showing a
            placeholder loading screen while waiting for content from the
            network.
          </li>
          <li>
            A loading indicator is shown while the app waits for a response
            from the network.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>        
        If using a single-page-app (client rendered), transition the user to 
        the next page immediately and show a
        <a href="http://hannahatkin.com/blog/tag/skeleton-screens/">
        skeleton screen</a> and use any content such as title or
        thumbnail already available while content loads.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Each page has a URL</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Ensure individual pages are deep linkable via the URLs and that URLs 
        are unique for the purpose of shareability on social media by
        testing with individual pages can be opened and directly accessed
        via new browser windows.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        If building a single-page app, make sure the client-side router can 
        re-construct app state from a given URL.
      </td>
    </tr>
  </tbody>
</table>


## Exemplary PWA Checklist {: #exemplary }

Note: All of these checks currently must be performed manually as they
are not yet implemented in Lighthouse

### Indexability & social {: .hide-from-toc }

Note: for general tips see our guide to
[social optimization](/web/fundamentals/discovery-and-monetization/search-optimization/) 
and [social discovery](/web/fundamentals/discovery-and-monetization/social-discovery/).

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Site's content is indexed by Google</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Use the <a href="https://support.google.com/webmasters/answer/6066468">
        Fetch as Google<a/> tool to preview how Google will see your site when
        it is crawled.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        <a href="https://webmasters.googleblog.com/2014/05/understanding-web-pages-better.html">
        Google's indexing system does run JavaScript</a> but some issues 
        may need to be fixed to make content accessible. For example,
        if you are using new browser features like the Fetch API, ensure that they are
        polyfilled in browsers without support.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Schema.org metadata is provided where appropriate</h3></th>
    </tr>
    <tr>
      <td colspan="2">
        <a href="https://schema.org">Schema.org</a> metadata can help improve
        the appearance of your site in search engines.
      </td>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Use the <a href="https://search.google.com/structured-data/testing-tool">
        testing tool</a> to ensure title, image, description etc. are available.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Markup the content. For example:
        <ul>
          <li>
            A recipe app should have the <a href="/search/docs/data-types/recipes">
            Recipe type markup</a> for Rich Cards.
          </li>
          <li>
            A news app should have the <a href="/search/docs/data-types/articles">
            NewsArticle type markup</a> for Rich Cards and/or 
            <a href="https://www.ampproject.org/docs/reference/spec.html">
            AMP support</a>.
          </li>
          <li>
            An ecommerce app should have the
            <a href="/search/docs/data-types/products">Product type markup</a>
            for Rich Cards.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Social metadata is provided where appropriate</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        <ul>
          <li>
            Open a representative page in
            <a href="https://developers.facebook.com/tools/debug/">Facebook's crawler</a>
            and ensure it looks reasonable.
          </li>
          <li>
            Check that <a href="https://dev.twitter.com/cards/overview">Twitter
            Cards meta data</a> is present (for example <code>&lt;meta 
            name="twitter:card" content="summary" /&gt;</code>) if you feel
            it would be appropriate.
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Mark up content with <a href="http://ogp.me/">Open Graph</a> tags and as
        advised by <a href="https://dev.twitter.com/cards/overview">Twitter</a>.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Canonical URLs are provided when necessary</h3></th>
    </tr>
    <tr>
      <td colspan="2">
        This is only necessary if your content is available at multiple URLs.
      </td>
    <tr>
      <td><b>To Test</b></td>
      <td>
        <ul>
          <li>
            Determine whether any piece of content is available at two
            different URLs.
          </li>
          <li>
            Open both of these pages and ensure they use <code>&lt;link
            rel=canonical&gt;</code> tags in the head to indicate the 
            canonical version
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Mark up content with <a href="http://ogp.me/">Open Graph</a>
        and as advised by <a href="https://dev.twitter.com/cards/overview">
        Twitter</a>.
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Pages use the History API</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        For single page apps, ensure the site doesn't use fragment
        identifiers. For example everything after the <code>#!</code>
        in <code>https://example.com/#!user/26601</code>.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/History_API">
        History API</a> instead of page fragments.
      </td>
    </tr>
  </tbody>
</table>


### User Experience {: .hide-from-toc }

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Content doesn't jump as the page loads</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Load various pages in the PWA and ensure content or UI doesn't 
        "jump" as the page loads.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Ensure all content, especially images and ads, have fixed sizing in
        CSS  or inline on the element. Before the image loads you may want
        to show a grey square or blurred/small version (if available) as
        a placeholder.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Pressing back from a detail page retains scroll position on the previous list page</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Find a list view in the app. Scroll down. Tap an item to enter the 
        detail page. Scroll around on the detail page. Press back and ensure 
        the list view is scrolled to the same place it was at before the 
        detail link/button was tapped.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Restore the scroll position in lists when the user presses 'back'. 
        Some routing libraries have a feature to do this for you.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>When tapped, inputs aren't obscured by the on screen keyboard</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Find a page with text inputs. Scroll to put the text input as low on 
        the screen as you can make it. Tap the input and verify it is not 
        covered when the keyboard appears.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Explore using features like 
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView"><code>Element.scrollIntoView()</code></a>
        and
        <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoViewIfNeeded"><code>Element.scrollIntoViewIfNeeded()</code></a> 
        to ensure the input is visible when tapped.
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Content is easily sharable from 'standalone'/'full screen' mode</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Ensure from standalone mode (after adding the app to your home screen) 
        that you are able to share content, if appropriate, from within the 
        app's UI.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Provide social share buttons, or a generic share button within your 
        UI. If a generic button, you may want to directly copy the URL to the 
        user's clipboard when tapped, offer them social networks to share to, 
        or try out the new <a href="/web/updates/2016/10/navigator-share">Web Share API</a> 
        to integrate with the native sharing system on Android.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Site is responsive across phone, tablet and desktop screen sizes</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        View the PWA on small, medium and large screens and ensure it 
        works reasonably on all.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Review our guide on <a href="/web/fundamentals/design-and-ui/responsive/">
        implementing responsive UIs</a>.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Any app install prompts are not used excessively</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Check the PWA doesn't use an app install interstitial when loaded
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        <ul>
          <li>There should only be one top/bottom app install banner</li>
          <li>
            After the PWA is added to the user's home screen, any top/bottom 
            banners should be removed
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>



### Performance {: .hide-from-toc }

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>First load very fast even on 3G</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Use Lighthouse on a Nexus 5 (or similar) to verify time to interactive 
        &lt;5s for first visit on a simulated 3G network (as opposed to the 
        10s goal for <a href="#baseline">baseline</a> PWAs)
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        <ul>
          <li>
            Review the <a href="/web/fundamentals/performance/">performance</a>
            section of WebFundamentals and ensure you're following the best
            practices.
          </li>
          <li>
            You can understand your performance better by using 
            <a href="/speed/pagespeed/insights/">Pagespeed Insights</a>
            (aim for a score &gt;85) and <b>SpeedIndex</b> on
            <a href="https://www.webpagetest.org">WebPageTest</a>
            (aim for a score &lt;3000 on the first view on Mobile 3G Nexus 
            5 Chrome).
          </li>
          <li>
            A few tips are to focus on loading less script, make sure as much 
            script is loaded asynchronously as possible using <code>&lt;script
            async&gt;</code> and make sure
            <a href="/web/fundamentals/performance/critical-rendering-path/render-blocking-css">
            render blocking CSS</a> is marked as such. 
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

### Caching {: .hide-from-toc }

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Site uses cache-first networking</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        <ul>
          <li>
            Set the network emulation to the slowest setting and browse around 
            the app.
          </li>
          <li>
            Then, set the network emulation to offline and browse around. The
            app should not feel faster when offline than on a slow connection.
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Use cache-first responses wherever possible. Also review our set of 
        <a href="/web/tools/service-worker-libraries/">service worker libraries</a> 
        that make implementing these kinds of patterns easier.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Site appropriately informs the user when they're offline</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Emulate an offline network and verify the PWA provides an 
        indication that you are offline.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Use the [Network Information API](https://developer.mozilla.org/en-US/docs/Web/API/Network_Information_API)
        to show the user an indication when they're offline.
      </td>
    </tr>
  </tbody>
</table>

### Push Notifications (Optional) 

Note: This check list only applies if notifications are implemented

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Provide context to the user about how notifications will be used.</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        <ul>
          <li>Visit the site, and find the push notifications opt-in flow</li>
          <li>
            When you are shown the permission request by Chrome, ensure
            that context has been provided explaining what the site wants 
            the permission for.
          </li>
          <li>
            If the site is requesting for the permission on page load, ensure it 
            provides very clear context simultaneously for why the user should 
            enable push notifications.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        See our guide to <a href="https://docs.google.com/document/d/1WNPIS_2F0eyDm5SS2E6LZ_75tk6XtBSnR1xNjWJ_DPE/view">
        creating user-friendly Notifications permissions flows.</a>
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Ensure that the UI encouraging users to turn on Push Notifications isn't overly aggressive</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Visit the site and find the push notifications opt in flow. Ensure 
        that if you dismiss or decline to turn on push notifications that the 
        site does not re-prompt in the same way within the same session.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        If users say they don't want a certain kind of notification, do not 
        reprompt for at least a few days (for example, one week).
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Ensure the site 'dims' the screen when Chrome's permission is showing</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Visit the site and find the push notifications opt-in flow. When
        Chrome is showing the permission request, ensure that the page is
        "dimming" (placing a dark overlay over) all content not relevant to 
        explaining why the site needs push notifications.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        When calling <a href="https://developer.mozilla.org/en-US/docs/Web/API/Notification/requestPermission">
        <code>Notification.requestPermission</code></a> dim the screen.
        Undim it when the promise resolves.
      </td>
    </tr>
  </tbody>
</table>

<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Ensure any push notifications sent are timely, precise and relevant</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Enable push notifications from the site and ensure the use cases 
        they're using the push notifications for are:
        <ul>
          <li>
            <b>Timely</b> — A timely notification is one that appears 
            when users want it and when it matters to them.
          </li>
          <li>
            <b>Precise</b> — A precise notification is one that has specific
            information that can be acted on immediately.
          </li>
          <li>
            <b>Relevant</b> — A relevant message is one about people or
            subjects that the user cares about.
          </li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        See our guide on <a href="/web/fundamentals/engage-and-retain/push-notifications/good-notification">
        creating great push notifications</a> for advice. If your content is
        not timely and relevant to this user, consider using email instead.
      </td>
    </tr>
  </tbody>
</table>


<table class="responsive">
  <tbody>
    <tr>
      <th colspan=2><h3>Ensure the site provides controls to enable/disable notifications</h3></th>
    </tr>
    <tr>
      <td><b>To Test</b></td>
      <td>
        Enable push notifications from the site. Ensure there is some place on 
        the site that allows you to manage your notifications permissions or 
        disable them.
      </td>
    </tr>
    <tr>
      <td><b>To Fix</b></td>
      <td>
        Create a UI that allows users to manage their notification preferences.
      </td>
    </tr>
  </tbody>
</table>
