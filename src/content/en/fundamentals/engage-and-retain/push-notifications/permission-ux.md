project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-03-03 #}
{# wf_published_on: 2016-06-30 #}

# Permission UX {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



The natural step after getting a `PushSubscription` and saving it our server is to trigger a
 push message, but there is one thing I flagrantly glossed over. The user experience when
 asking for permission from the user to send them push messages.

Sadly, very few sites give much consideration as to how they ask their user for permission, so
 lets take a brief aside to look at both good and bad UX.

## Common Patterns

There have been a few common patterns emerging that should guide / help you when deciding what
 is best for your users and use case.

### Value Proposition

Encouraging a user to subscribe to push messaging at a time where the benefit
is obvious given the current context is a fantastic way to get users to grant
permission.

For example, a user has just bought an item on an online store and finished the checkout flow,
 the site can then offer updates on the delivery status.

There are a range of situations where this pattern / approach works:
- A particular item is out of stock, would you like to notified when it's next available?
- This breaking news story will be regularly updated, would you like to be notified as the
 story develops?
- You're the highest bidder, would you like to be notified if you are outbid?

These are all points where the user has invested in your service and there
is a clear value proposition for them to enable push notifications.

[Owen Campbell-Moore](https://twitter.com/owencm) created a mock site for an airline that
 demonstrates this approach.

After the user has booked a flight asks if the user would like notifications in case of flight
 delays.

![Owen Campbell-Moore's example of good UX for
 push.](./images/ux-examples/owen/owen-good-example.png){: .device-image .center-image }

Note that this isn't the browser UI as well, this is a custom UI in the web site asking the
 user, allowing the site full control over the messaging to the user.

Another nice touch to Owen's demo is that if the user does click to enable notification, the
 site adds a semi-transparent overlay over the entire page when it shows the permission prompt.
 This helps draw the users attention to the permission prompt.

![Owen Campbell-Moore's example of good UX for the permission
 prompt.](./images/ux-examples/owen/owen-permission-prompt.png){: .device-image .center-image }

The alternative to this example, the **bad UX** for asking permission, is to  request
 permission as soon as a user lands on the airline's site.

![Owen Campbell-Moore's example of bad UX for
 push.](./images/ux-examples/owen/owen-bad-ux.png){: .device-image .center-image }

No context as to what the notifications are for, if the user wanted to get a task done (i.e.
 check a flight or book a flight), this permission prompt gets in the way of that and secondly
 it's not a good look having a pop-up over the site.

### Double Permission

You may feel that your site has a clear need for push messaging and as a result want to ask the
 user for permission as soon as possible. An example of this sites that fit into this category
 are messaging sites or email clients. You receiving a message or email, show a notification.

In these cases, it's worth considering the double permission UX.

With this approach you display a custom permission prompt in your web app which asks the user
 to enable notifications. By doing this the user can say enable or disable without risk of
 being permanently blocked. If the user selects enable on the custom UI, display the actual
 permission prompt, otherwise hide your custom pop-up and ask some other time.

A good example of this is [Slack](https://slack.com/). They show a prompt at
the top of their page once you've signed in asking if you'd like to enable notifications.



### Settings Panel

You can move notifications into a settings panel, giving users an easy way
to enable and disable push messaging, without the need of cluttering your
web app's UI.

A good example of this is [Google I/O's 2016 site](https://events.google.com/io2016/). When you
 first load up the Google I/O site, you aren't asked to do anything,
the user is left to explore the site.

![When you first load the page, no prompt, just calm on Google
 IO.](./images/ux-examples/google-io/google-io-first-load.png){: .device-image .center-image }

After a few visits of clicking the menu item on the right, a settings panel is reveal to the
 user, allowing them to set up and manage notifications.

![Settings panel on Google IO's web app for push
 messaging.](./images/ux-examples/google-io/google-io-settings-panel.png){: .device-image
 .center-image }

Clicking on the checkbox displays the permission prompt, no hidden surprises.

![Google IO's web app displaying the permission
 prompt.](./images/ux-examples/google-io/google-io-permission-prompt.png){: .device-image
 .center-image }

After the permission has been granted the checkbox is checked and the user is good to go. The
 great thing about this UX is that the location to sign up for push is the same location to
 disable push.



### Passive Approach

One of the easiest ways to offer push to a user is to have a button
or toggle switch that enables / disables push messages in a location
on the page that is consistent throughout a site.

This doesn't drive users to enable push notifications, but consistency and allowing users to
 opt in and out easily without constant nudging gives users a way to engage with a site /
 service / brand if and when they want to. For sites like blogs that might have some regular
 viewers as well as high bounce rates, this is a solid option as it targets regular viewers
 without annoying drive-by visitors.

On my personal site I have a toggle switch for push messaging in the footer.

![Example of Gauntface.com push notification toggle in
 footer.](./images/ux-examples/gauntface/gauntface-intro.png)

It's fairly out of the way, but for regular visitors it should get enough attention from
 readers wanting to get updates. People landing on my site to get some information and leave
 are completely unaffected, I doubt they even notice the the toggle switch.

If you grant permission the state of the toggle switch changes and remains in the same location
 through the pages.

![Example of Gauntface.com with notifications
 enabled.](./images/ux-examples/gauntface/gauntface-enabled.png)

### The Bad UX

Those are some of the common practices I've noticed on the web. Sadly there is one very common
 bad practice.

The worst thing you can do is instantly show the permission dialog to a user as soon as they
 land on your site.

They have zero context on why they are being asked for a permission, they may not even know
 what your website is for, what it does or what it offers. Blocking permissions at this point
 out of frustration is not uncommon, this pop-up is getting in the way of what they are trying
 to do.

Remember, if the user *blocks* the permission request, your web app can't ask for permission
 again. To get permission after being blocked the user has to change the permission in the
 browsers UI and it is not easy, obvious or fun for the user.

No matter what, don't ask for permission as soon as the user opens your site, consider some
 other UI or approach that has an incentive for the user to grant permission.

### Offer a Way Out

Aside from considering the UX to subscribe a user to push, **please** consider how a user
 should unsubscribe / opt out of push messaging.

The number of sites that ask for permission as soon as the page load and then offer no UI for
 disabling push notifications is astounding.



Your site should explain to your users how they can disable push. If you don't, users are
 likely to take the nuclear option and block permission permanently.
