project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Add code to your service worker's push handler to show a notification.

{# wf_review_required #}
{# wf_updated_on: 2015-09-27 #}
{# wf_published_on: 2000-01-01 #}

# Show a notification {: .page-title }

{% include "_shared/contributors/TODO.html" %}




A completed version of this step is in the completed/step9 directory.

In this step you will add code to your service worker's push handler to show a
notification.

### 1. Add showNotification() code

Update _sw.js_ to look like this, replacing the _TODO_ comment:


    console.log('Started', self);
    self.addEventListener('install', function(event) {
      self.skipWaiting();
      console.log('Installed', event);
    });
    self.addEventListener('activate', function(event) {
      console.log('Activated', event);
    });
    self.addEventListener('push', function(event) {
      console.log('Push message', event);
      var title = 'Push message';
      event.waitUntil(
        self.registration.showNotification(title, {
          body: 'The Message',
          icon: 'images/icon.png',
          tag: 'my-tag'
        }));
    });
    // TODO
    

The `event.waitUntil()` method takes a promise and extends the lifetime of the event handler until, in this case, the promise returned by `showNotification()` is resolved.

One notification will be shown for each tag value: if a new push message is received, the old notification will be replaced. To show multiple notifications, use a different tag value for each showNotification() call, or no tag at all.

### 2. Make a request to GCM to send a notification

Run the cURL command or the XHR request from the previous steps.

You should see a notification like this:

<img src="images/image19.png" width="394" height="114" alt="Screenshot of Push Notification" />
