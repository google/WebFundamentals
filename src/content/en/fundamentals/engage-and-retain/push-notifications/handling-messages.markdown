---  
layout: shared/narrow
title: "Handling messages"
description: "You've seen what makes a good notification. Now let's see how to implement them."
published_on: 2016-07-01
updated_on: 2016-07-01
order: 40
translation_priority: 0
authors:
  - josephmedley
notes:
  truncation: "From here on, the code samples start to get a little large. We're
  going to truncate them for the sake of space. But, don't worry. We'll show you
  the whole thing at the end."
---

<p class="intro">Way back at the <a href="index#anatomy">beginning of this section</a>, we
showed a notification that looks like this and the code that goes with it.<br/><br/>

<img src="images/joe-asked.png" alt="The example notification." width="316" /><br/><br/>

While we showed you a little bit about how this is coded, we really didn't give
you enough information for it to be useful. That's what this section is about.
</p>

{% include shared/toc.liquid %}

## More notification anatomy {#more-anatomy}

When a notification is received from the server, it's intercepted by a service
worker using the push event. It's basic structure is this.

{% highlight javascript %}
self.addEventListener('push', event => {
  event.waitUntil(
    // Process the event and display a notification.
  );
});
{% endhighlight %}

Somewhere inside `waitUntil()`, we're going to call `showNotification()` on a
service worker registration object.

{% highlight javascript %}
self.registration.showNotification(title, {
    body: 'Are you free tonight?',
    icon: 'images/joe.png',
    vibrate: [200, 100, 200, 100, 200, 100, 400],
    tag: 'request',
    actions: [
      { action: 'yes', title: 'Yes!', icon: 'images/thumb-up.png' },
      { action: 'no', title: 'No', icon: 'images/thumb-down.png' }
    ]
  })
{% endhighlight %}

Technically, the only required parameter for `showNotification()` is the title.
Practically speaking, you should include a body and an icon.

Finally, we'll process the user's response using the `notificationclick` and
`notificationclose` methods.

{% highlight javascript %}
self.addEventListener('notificationclick', event => {  
  // Do something with the event  
  event.notification.close();  
});

self.addEventListener('notificationclose', event => {  
  // Do something with the event  
});
{% endhighlight %}

Everything else is just an elaboration of these basic ideas.

## Preparing message content {#preparing-messages}

As we said earlier, your server sends two kinds of messages. 

* Messages with a data payload.
* Messages without a data payload, often called a tickle.

Your push handler needs to account for both. For messages without a payload you 
want to provide a good user experience by getting the data before you tell the 
user it's available.

Let's start with our basic push event handler with a call to
`event.waitUntil()`.  This method can only take a Promise or something that
resolves to a promise.

{% highlight javascript %}
self.addEventListener('push', event => {
  event.waitUntil(() => {
    // Do something with the event.
  });
});
{% endhighlight %}

Next, if you find data in the event object, get it.

{% highlight javascript %}
self.addEventListener('push', event => {
  event.waitUntil(() => {
    if (event.data) {
      return Promise.resolve(event.data);
    }
    // No data, so do something else.  
  });  
});
{% endhighlight %}

If there's no data in the object, call `fetch()` to get it from the server. 
Otherwise, just return the data.

{% highlight javascript %}
self.addEventListener('push', event => {
  event.waitUntil(() => {
    if (event.data) {
      return Promise.resolve(event.data);
    }
    return fetch('some/data/endpoint.json')
      .then(response => response.json());
  });
});
{% endhighlight %}

In both cases we end up with a JSON object. Now it's time to show a
notification to the user.

{% highlight javascript %}
self.addEventListener('push', event => {
  event.waitUntil(() => {
    if (event.data) {
      return Promise.resolve(event.data);
    }
    return fetch('some/data/endpoint.json')
        .then(response => response.json());
    })
    .then(data => {
      return self.registration.showNotification(data.title, {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/icon-192x192.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: data.tag
       })
    }))
});
{% endhighlight %}

## Combine similar notifications {#combine-similar-notes}

Sometimes it's useful to combine multiple notifications into a single one. For
example, a social networking app might want to avoid messaging users for every
post from a particular person, and instead combine them.

![Combine messages from the same sender.](images/combined-notes-mobile.png){:width="316px"}

Combining similar notifications comes down to three things.

* A call to `getNotifications()`.
* reusing an existing `tag` value.
* Setting the `renotify` flag in the call to `showNotification()`.

Let's look at an example that shows all three.

The following examples, we're going to assume that you've already received or
retrieved message data  as described in the last section. Now let's look at what
to do with it. Start with a basic push event handler.

{% highlight javascript %}
self.addEventListener('push', function(event) {
  event.waitUntil(
    // Get the message data somehow and return a Promise.
  )
  .then(data => {
    // Do something with the data.
  })
});
{% endhighlight %}

Check for notifications that match `data.tag` with a call to `getNotifications()`.

{% highlight javascript %}
self.addEventListener('push', function(event) {
  event.waitUntil(
    // Get the message data somehow and return a Promise.
  )
  .then(data => {
    return self.registration.getNotifications({tag: data.tag});
  })
  .then(notifications => {
    //Do something with the notifications.
  })
});
{% endhighlight %}

In other examples, we've instantiated our `options` object right in the call  to
`showNotification()`. For this scenario, the `options` object needs to change
based on the results of `getNotifications()`.  So instantiate a notification
`options` object.

Notice that we've also attached the notification data to the notification
options. We're doing this to ensure that it's available to `notificationclick`,
which we'll look at in a later section. To tell the browser we're combining
notifications, we need to reuse the `tag` (line 6) and set `renotify` to `true`
(line 17).

{% highlight javascript linenos %}
self.addEventListener('push', function(event) {
  event.waitUntil(
    // Get the message data somehow and return a Promise.
  )
  .then(data => {
    return self.registration.getNotifications({tag: data.tag})
  })
  .then( notifications => {
  	var noteOptions = {
      body: data.body,
      icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
      vibrate: [200, 100, 200, 100, 200, 100, 400],
      tag: data.tag,
      data: data
  	}
    if (notifications.length > 0) {
      noteOptions.renotify = true;
      // Configure other options for combined notifications.
    }
  })  
});
{% endhighlight %}

When we fill out the remaining properties for the new notifications we're also
going to add two action buttons to the notification (lines 21 through 24). One
will open the application. The other will dismiss the notification without
taking action. Neither of those actions is handled by the push event. We'll look
at that in the next section. Finally, show the notification (line 26).

{% highlight javascript linenos %}
self.addEventListener('push', function(event) {
  event.waitUntil(
    // Get the message data somehow and return a Promise.
  )
  .then(data => {
    return self.registration.getNotifications({tag: data.tag})
  })
  .then( notifications => {
    var noteOptions = {
      body: data.body,
      icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
      vibrate: [200, 100, 200, 100, 200, 100, 400],
      tag: data.tag,
      data: data
    };

    if (notifications.length > 0) {
      data.title = "Flight Updates";
      noteOptions.body = "There are several updates regarding your flight, 5212 to Kansas City.";
      noteOptions.renotify = true;
      noteOptions.actions = [
        {action: 'view', title: 'View updates'},
        {action: 'notNow', title: 'Not now'}
      ]
    }
    self.registration.showNotification(data.title, noteOptions);
  })  
});
{% endhighlight %}

## Put actions on the notification {#notification-actions}

We've already seen examples of notifications with actions built into them. Let's 
look at how they're implemented and how to respond to them.

Recall that `showNotification()` takes an options argument with one or more 
optional actions.

{% highlight javascript %}
ServiceWorkerRegistration.showNotification(title, {  
  body: data.body,  
  icon: (data.icon ? data.icon : '/images/i_face_black_24dp_2x.png'),  
  vibrate: [200, 100, 200, 100, 200, 100, 400],  
  tag: data.tag,  
  actions: [  
    {action: 'change', title: 'Ask for reschedule'},  
    {action: 'confirm', title: 'Confirm'}  
  ],  
  data: data  
})
{% endhighlight %}

The image below shows what this looks like. The notification says that Stacy has
confirmed an appointment for 3:00 PM. The recipient can either respond with
their own confirmation or ask for the appointment to be rescheduled. For the
former we will send a message directly to the server. For the later we will open
the application to an appropriate interface.

![A notification with actions.](images/confirmation.png){:width="316px"}

First, let's add a `notificationclick` event handler to the service worker. Also, 
close the notification.

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {  
  event.notification.close();  
  // Process the user action.  
});
{% endhighlight %}

Next, we need some logic to figure out where the notification was clicked. Did
the user click Confirm, Reschedule, or neither?

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm') {
    // Send the confirmation to the server.
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }
});
{% endhighlight %}

If the user clicked confirm, we can send that straight back to the server
without opening the application (lines 3 through 13). Notice that we're
returning from the `notificationclick` event immediately after sending the
confirmation to the server. This prevents app from opening.

{% highlight javascript linenos %}
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm')
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }
});
{% endhighlight %}

If the recipient clicked change, we want to open to a confirmation page. If the
user clicks somewhere other than an action button, we just want to open the app
(lines 14 through 19). In both cases, we'll create an appropriate URL.

{% highlight javascript linenos %}
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm') {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.
  } else if (event.action === 'change') {
    var appUrl = '/?confirmation_id=' +
      event.notification.data.confirmation_id + '#reschedule';
  } else {
    var appUrl = '/';
  }
  // Navigate to appUrl.
});
{% endhighlight %}

{% include shared/note.liquid list=page.notes.truncation %}

Regardless of URL, we'll call `clients.matchAll()` to get a client window we can
navigate with.

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
  // Content excerpted
  
  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    })
  );
});
{% endhighlight %}

Finally, we need to take different navigation paths depending on whether a
client is open.

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
  // Content excerpted

  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    }).then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].navigate(appUrl);
        activeClients[0].focus();
      } else {
        clients.openWindow(appUrl);
      }
    })
  );
});
{% endhighlight %}

Here's the entire `notificationclick` handler from end to end.

{% highlight javascript %}
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'confirm') {
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.
  } else if (event.action === 'change') {
    var appUrl = '?confirmation_id=' +
      event.notification.data.confirmation_id + '#reschedule';
  } else {
    var appUrl = '/';
  }
  
  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    }).then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].navigate(appUrl);
        activeClients[0].focus();
      } else {
        clients.openWindow(appUrl);
      }
    })
  );
});
{% endhighlight %}
