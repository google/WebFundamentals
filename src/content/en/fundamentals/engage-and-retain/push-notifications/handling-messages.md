project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: You've seen what makes a good notification. Now let's see how to implement them.

{# wf_updated_on: 2016-09-12 #}
{# wf_published_on: 2016-06-30 #}

# Handling Messages {: .page-title }

{% include "web/_shared/contributors/josephmedley.html" %}

<figure class="attempt-right">
  <img src="images/cc-good.png" alt="The example notification.">
</figure>

Way back at the [beginning of this article](#anatomy), we
showed a notification that looks like the image and the code that goes with it.

While we showed you a little bit about how this is coded, we really didn't give
you enough information for it to be useful. That's what this section is about.

<div style="clear:both;"></div>

## Service workers, again

Let's talk about service workers again. Handling message involves code that
lives exclusively in a service worker. If you need a little background,
[here's the introduction again](service-worker-primer). We've also got some
handy instructions for [debugging service workers](/web/tools/chrome-devtools/debug/progressive-web-apps/#service-workers)
using DevTools.

## More notification anatomy {: #more-anatomy }

When a notification is received from the server, it's intercepted by a service
worker using the push event. Its basic structure is this:


    self.addEventListener('push', event => {
      event.waitUntil(
        // Process the event and display a notification.
      );
    });


Somewhere inside `waitUntil()`, we're going to call `showNotification()` on a
service worker registration object.


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


Technically, the only required parameter for `showNotification()` is the title.
Practically speaking, you should include at least a body and an icon. As you can
see notifications have quite a few options. You can find a complete
[list of them at MDN](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification).

Finally, we'll process the user's response using the `notificationclick` and
`notificationclose` methods.


    self.addEventListener('notificationclick', event => {  
      // Do something with the event  
      event.notification.close();  
    });

    self.addEventListener('notificationclose', event => {  
      // Do something with the event  
    });


Everything else is just an elaboration of these basic ideas.

Note: Earlier versions of the [Notification API spec](https://notifications.spec.whatwg.org/){: .external } contained a `notificationclose`. You should avoid this even though it may be supported on some browsers.

## Choosing not to show a notification {: #choosing-not-to-show }

There may be times when it's not necessary to show a notification when a push
message is received. For example, if the app is already open and the push's
content is already visible to the user.

Fortunately, service workers have a way to test whether the application is open.
Service workers support an interface called
[`clients`](https://developer.mozilla.org/en-US/docs/Web/API/Clients) is a list
of all active clients controlled by the current service worker. To find out if
any clients are active, call `clients.length`. If this property returns `0`
show a notification. Otherwise do something else.

<pre class="prettyprint">
self.addEventListener('push', event => {
  const promiseChain = clients.matchAll()
  .then(clients => {
    <strong>let mustShowNotification = true;
    if (clients.length > 0) {
      for (let i = 0; i < clients.length; i++) {
        if (clients[i].visibilityState === 'visible') {
          mustShowNotification = false;
          return;
        }
      }
    }

    if (mustShowNotification) {
      // Show the notification.
      event.waitUntil(
        self.registration.showNotification('Push notification')
      );
    } else {
      // Send a message to the page to update the UI.
      console.log('The application is already open.');
    }</strong>
  });

  event.waitUntil(promiseChain);
});
</pre>

## Preparing message content {: #preparing-messages }

As we said earlier, your server sends two kinds of messages:

* Messages with a data payload.
* Messages without a data payload, often called a tickle.

Your push handler needs to account for both. For messages without a payload you
want to provide a good user experience by getting the data before you tell the
user it's available.

Let's start with our basic push event handler with a call to
`event.waitUntil()`.  This method can only take a promise or something that
resolves to a promise. This method extends the lifetime of the `push` event
until certain tasks are accomplished. As you'll see shortly, we'll be holding
the `push` event until after we've shown a notification.

    self.addEventListener('push', event => {
      const promiseChain = someFunction();
      event.waitUntil(promiseChain);
    });

Next, if you find data in the event object, get it.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>
  let data = null;
  if (event.data) {
    // We have data - lets use it
    data = event.data.json();
  }</strong>
  let promiseChain = someFunction(data);
  event.waitUntil(promiseChain);
});
</pre>


If there's no data in the object, call `fetch()` to get it from the server.
Otherwise, just return the data.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      // Now we have data we can show a notification.
    });
  event.waitUntil(promiseChain);
});
</pre>

In both cases we end up with a JSON object. Now it's time to show a
notification to the user.

<pre class="prettyprint">
self.addEventListener('push', event => {
  <strong>let promiseChain;
  if (event.data) {
    // We have data - lets use it
    promiseChain = Promise.resolve(event.data.json());
  } else {
    promiseChain = fetch('/some/data/endpoint.json')
      .then(response => response.json());
  }</strong>

  promiseChain = promiseChain.then(data => {
      return self.registration.showNotification(data.title, {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/icon-192x192.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        tag: data.tag
      });
    });
  event.waitUntil(promiseChain);
});
</pre>

## Combine similar notifications {: #combine-similar-notes }

<figure class="attempt-right">
  <img src="images/combined-notes-mobile.png" alt="Combine messages from the same sender.">
</figure>

Sometimes it's useful to combine multiple notifications into a single one. For
example, a social networking app might want to avoid messaging users for every
post from a particular person, and instead combine them.

Combining similar notifications has a lot of moving parts. But I like to think
of it as elaborations on the following steps.

1. A message arrives in the `push` event handler.
2. You call `self.registration.getNotifications()` to see if there are any
   notifications you want to combine. This is commonly done by checking the tag
   of the nofication.
3. Finally show your new notification by calling `self.registration.showNotification()`
   making sure you set the renotify parameter to true in the options (See below
   for an example).

Look for these things as we go through another example. We're going to assume
that you've already received or retrieved message data as described in the last
section. Now let's look at what to do with it.

Start with a basic push event handler. The `waitUntil()` method returns a
Promise that resolves to the notification data.


    self.addEventListener('push', function(event) {
      const promiseChain = getData(event.data)
      .then(data => {
        // Do something with the data
      });
      event.waitUntil(promiseChain);
    });


Once we have the message data, call `getNotifications()` using `data.tag`.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag});
  })
  .then(notifications => {
    //Do something with the notifications.
  })</strong>;
  event.waitUntil(promiseChain);
});
</pre>

In other examples, we've instantiated our `options` object right in the call to
`showNotification()`. For this scenario, the `options` object needs to change
based on the results of `getNotifications()`, so we instantiate a notification
`options` object.

Notice that we've also attached the notification data to the notification
options. We're doing this to ensure that it's available to `notificationclick`,
which we'll look at in a later section. To tell the browser we're combining
notifications, we need to reuse the `tag` and set `renotify` to `true`. Both are highlighted below.

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        <strong>noteOptions.renotify = true;</strong>
        // Configure other options for combined notifications.
      }
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

When we fill out the remaining properties for the new notifications we'll also
add two action buttons to the notification. One
opens the application; the other dismisses the notification without
taking action. Neither of these actions is handled by the push event. We'll look
at that in the next section. Finally, show the notification (line 26).

<pre class="prettyprint">
self.addEventListener('push', function(event) {
  const promiseChain = getData(event.data)
  .then(data => {
    <strong>return self.registration.getNotifications({tag: data.tag})
    .then(notifications => {
      var noteOptions = {
        body: data.body,
        icon: (data.icon ? data.icon : '/images/ic_flight_takeoff_black_24dp_2x.png'),
        vibrate: [200, 100, 200, 100, 200, 100, 400],
        <strong>tag: data.tag,</strong>
        data: data
    	};

      if (notifications.length > 0) {
        data.title = "Flight Updates";
        noteOptions.body = "There are several updates regarding your flight, 5212 to Kansas City.";
        noteOptions.renotify = true;
        <strong>noteOptions.actions = [
          {action: 'view', title: 'View updates'},
          {action: 'notNow', title: 'Not now'}
        ];
      }

      return self.registration.showNotification(data.title, noteOptions);
    })</strong>;
  });
  event.waitUntil(promiseChain);
});
</pre>

## Put actions on the notification {: #notification-actions }

We've already seen examples of notifications with actions built into them. Let's
look at how they're implemented and how to respond to them.

Recall that `showNotification()` takes an options argument with one or more
optional actions.


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

<figure class="attempt-right">
  <img src="images/confirmation.png" alt="A notification with actions.">
</figure>

The notification says that Stacy has
confirmed an appointment for 3:00 PM. The recipient can either respond with
their own confirmation or ask for the appointment to be rescheduled. For the
former, we send a message directly to the server. For the latter, we open
the application to an appropriate interface.

<div style="clear:both;"></div>

First, let's add a `notificationclick` event handler to the service worker. Also,
close the notification.


    self.addEventListener('notificationclick', function(event) {  
      event.notification.close();  
      // Process the user action.  
    });


Next, we need some logic to figure out where the notification was clicked. Did
the user click Confirm, Ask for Reschedule, or neither?

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm') {
    // Send the confirmation to the server.
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }</strong>
});
</pre>

If the user clicked Confirm, we can send that straight back to the server
without opening the application (lines 3 through 13). Notice that we're
returning from the `notificationclick` event immediately after sending the
confirmation to the server. This prevents the app from opening.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  <strong>if (event.action === 'confirm')
    var fetchOptions = {
      method: 'post',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: event.notification.data.confirmation_id
    };
    var confirmation = new Request('/back/end/system/confirm');
    event.waitUntil(fetch(confirmation, fetchOptions));
    return; // So we don't open the page when we don't need to.</strong>
  } else if (event.action === 'change') {
    // Open the application to a place where the user can reschedule.
  } else {
    // Just open the app.
  }
});
</pre>

If the recipient clicked Ask for Reschedule, we want to open to a confirmation page. If the user clicks somewhere other than an action button, we just want to open the app.
In both cases, we create an appropriate URL.

<pre class="prettyprint">
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
  <strong>} else if (event.action === 'change') {
    var appUrl = '/?confirmation_id=' +
      event.notification.data.confirmation_id + '#reschedule';
  } else {
    var appUrl = '/';
  }
  // Navigate to appUrl.</strong>
});
</pre>

Note: From here on, the code samples start to get a little large. We're going to truncate them for the sake of space. But, don't worry. We'll show you the whole thing at the end.

Regardless of URL, we'll call `clients.matchAll()` to get a client window we can
navigate with.


    self.addEventListener('notificationclick', function(event) {
      // Content excerpted

      event.waitUntil(clients.matchAll({
        includeUncontrolled: true,
        type: 'window'
        })
      );
    });


Finally, we need to take different navigation paths depending on whether a
client is open.

<pre class="prettyprint">
self.addEventListener('notificationclick', function(event) {
  // Content excerpted

  event.waitUntil(clients.matchAll({
    includeUncontrolled: true,
    type: 'window'
    <strong>}).then( activeClients => {
      if (activeClients.length > 0) {
        activeClients[0].navigate(appUrl);
        activeClients[0].focus();
      } else {
        clients.openWindow(appUrl);
      }</strong>
    })
  );
});
</pre>


Here's the entire `notificationclick` handler from end to end.


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
