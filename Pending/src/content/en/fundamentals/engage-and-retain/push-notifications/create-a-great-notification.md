


## Always use a title, description, and icon

A notification takes a number of options. To be minimally user-friendly you
should always include a title, description, and icon. Do this with the options
parameter of the `showNotification()` method. For example:

{% highlight javascript %} 
  self.addEventListener('push', function(event) {
    console.log('Received a push message', event);

    var title = 'Yay a message.';
    var body = 'We have received a push message.';
    var icon = '/images/icon-192x192.png';
    var tag = 'simple-push-demo-notification-tag';

    event.waitUntil(
      self.registration.showNotification(title, {
        body: body,
        icon: icon,
        tag: tag
      })
    );
  });
{% endhighlight %}

## Make the title relevant and specific

Make the title relevant to the context of the message and include something
specific from the message.

**BAD:** Notifcation from facebook.com

**GOOD:** Paul Kinlan sent you a message

## Make the icon contextual

Just as with titles, icons should convey something about the message. In the
previous instance where 'Paul Kinlan sent you a message', use an
icon specific to messages rather than your app or site logo.

## Use vibration judiciously

To vibrate a mobile device has to run a tiny motor. Consequently it's a larger
battery drain than an on-screen notification. Be courteous of the user and use
vibration judiciously. Give users the ability to select which notifications
use vibrate, or to turn them off completely.

## Combine similar notifications

Even though you're not spamming users, you might still have a reason to send
multiple, similar notifications back to back.  For example, if a messaging app
receives two messages back to back, instead of stacking the messages you might
do something like this:

![Combined notifications](images/combined-notifications.png)

Notice that this message has also pluralized the text to make it clear that
more than one update is available.



