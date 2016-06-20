---  
layout: shared/narrow  
title: "What makes a good notification?"  
description: "There are right ways of using notifications, and ways of using 
them better. Learn what makes a good notification. We won't just show you what 
to do. We'll show you how to do it."  
published_on: 2016-06-20  
updated_on: 2016-06-20  
order: 10  
translation_priority: 0  
authors:  
  - josephmedley  
---

<p class="intro">
  You've no doubt implemented some form of notification before. Maybe you've 
used them in a native application. Perhaps you've created your own web 
notifications from scratch. Maybe you've never done anything like them. 
Regardless, there are right ways of using them, and ways of using them better. 
Let's start our review of notifications by demonstrating what makes a good 
notification. We won't just show you what to do. We'll show you how to do it.  
</p>

## Timely {#timely}

A timely notification is a notification that appears when users want it and  
when it matters to them. Timely means timely to the user, not necessarily timely 
to you.

### Make it available regardless of connectivity {#make-it-available}

You'll want to show most notices right away. There are reasons to hold on to a 
notice before showing it, the least of which is that push payloads may not be 
supported on all platforms, so you may need to fetch the critical information 
before displaying it. 

Until recently only mobile apps could do this. With service workers you can  
store a notification until a user wants it. When the user clicks it, the status  
of the network is irrelevant. 

{% highlight javascript %}  
self.addEventListener('push', event =&gt; {  
  var dataPromise;  
  if (data in event) {  
    dataPromise = Promise.resolve(event.data.json());  
  } else {  
    dataPromise = fetch('notification/end/point/data.json')  
      .then(response =&gt; {  
        return response.json();  
      });  
  }  
  
  event.waitUntil(  
    dataPromise  
    .then(msgData =&gt; {  
      // Now tell the user.  
      return self.registration.showNotification(data.title, {  
        // Whether you show data and how much you show depends on  
        // content of the data itself.  
        body: event.data.body,  
        icon: 'images/icon.png'  
      });  
    })  
  );  
});  
{% endhighlight %}

### Use vibration judiciously {#vibrate-judiciously}

Vibration may seem like an odd thing to list under timely. In fact, it's closely 
related and there are several issues.

First, vibration may seem like the ideal way to make users aware of new 
notifications. But not all users have vibrations turned on and some devices 
can't vibrate. Consequently, any urgency that you intend to communicate with 
vibration can be lost. 

Second, making every notification vibrate can create a false sense of urgency. 
If users  
are being nagged by notifications that aren't as important as they seem, they 
may  
turn off notifications entirely.

In short, let the user decide how to use vibrations. Give them the ability to 
select which notifications use vibrations or whether to use them at all. If you 
have different categories of notifications, you could even let them select 
different vibration patterns.

Finally, remember that to vibrate a mobile device has to run a motor and motors 
use more power than an on-screen notification.

## Precise {#precise}

A precise notification is one that has specific information that can be acted on 
immediately. Consider the image from the anatomy lesson again.

<img src="images/joe-asked.png" width="300" height="109" />

It tells you:

* Who sent the message.
* An image so that you don't confuse the sender with any old average Joe.
* Since the notification is a question, you can turn him down with as little 
  effort as is humanly possible.

### Offer enough information that the user doesn't need to visit your site {#offer-enough}

This may not be appropriate in every case, but if the information is simple 
enough to convey in a small space, don't make users open your web site to read 
it. For example, if you wanted to notify one user of acknowledgment by another, 
then don't show a message that says, "New notification". Show one that says, 
"Pete said, 'no'."

Good:  
<img src="images/pete-replied.png" width="298" height="69" />

Bad:  
<img src="images/new-missive.png" width="297" height="70" />

This is especially important for critical information.

Good:  
<img src="images/extreme-danger.png" width="304" height="70" />

Bad:  
<img src="images/suggestion.png" width="301" height="70" />

### Put actions right in the notification {#offer-actions}

We've seen this a few times already and the anatomy lesson even showed how to 
add them to a notification. The service worker needs to process those actions. 
Do this in the notificationclick event.

{% highlight javascript %}
self.addEventListener('notificationclick', event =&gt; {    
  var messageId = event.notification.data;  
  
  event.notification.close();

  if (event.action) {  
    // Send the response directly to the server.  
  } else {  
    // Open the app.  
  }    
}, false);
{% endhighlight %}

### Make the title and content specific {#specific-title}

Make the title relevant to the context of the message and include something  
specific from the message.

Good:  
<img src="images/joe-asked.png" width="300" height="109" />

Bad:  
<img src="images/sms-call.png" width="305" height="110" />

### Put important information up front

This means putting information important to your user in the part of the 
notification that gets the most attention. For example, in western languages 
text is read from left to right and from top to bottom. So a messaging app would 
might put the name of the sender at the top and left.

Good:  
<img src="images/pete-replied.png" width="316" height="73" />

Bad:  
<img src="images/new-missive.png" width="316" height="76" />

### Keep the message short {#keep-it-short}

Notifications aren't emails. The intent of notifications is to tease users so  
they'll open your app. The `PushMessageData` object lets you send data to the 
user immediately, but  
you may not want to show all of that data to the user, especially if additional  
data could accumulate on the server after the notification is sent. 

## Relevant {#relevant}

A relevant message is one about people or subjects the user cares about.

### prefer logged-in users {#prefer-logged}

Only ask for notification permissions from users who are logged in.  
If you don't know who your users are it's hard to send them relevant  
notifications. And if notifications aren't relevant, users might  call them  
spam. 

### Don't repeat information {#dont-repeat}

You have little space to convey much information. Don't waste it by duplicating  
information between parts of the notification. The duplicate information may be  
relevant information, but removing duplication gives you extra room for other 
information. For example if your title contains the day of the week,  
don't also list it in the body.

Good:  
<img src="images/notification-no-dup-content.png" width="316" height="73" />

Bad:  
<img src="images/notification-dup-content.png" width="317" height="85" />

Also, if the app is open, it's possible the new information is already on the 
screen. Instead of a notification, use the application UI to notify the user.

### Don't advertise your native app {#dont-advertise-native}

The point of service workers, the technology behind push notifications, is that  
you can avoid the time and expense of writing an application separate from your  
website. A user who has both your service worker and your native app may get  
duplicate notifications unless you write server-side code to prevent it. You can  
avoid the problem completely; don't encourage users to run both.

### Don't advertise {#dont-advertise}

You'll have opportunities to monetize the user experience once they're in your  
app. Don't blow it by spamming your users when they're not. If you spam your  
users with notifications, you may loose them altogether.

### Don't Include your Website Name or Domain {#no-website}

Notifications already contain your domain name, and space is tight anyway. 

![Domain name in a Chrome notification.]()  
![Domain name in a Firefox notification.]()

### Make the icon contextual {#contextual-icon}

Icons should convey something about the message they accompany. Consider this 
example.

<img src="images/contextual-icon.png" width="324" height="117" />

It tells us exactly who sent the message. The icon, which in many notifications 
is the site or app logo, tells us nothing. 

Instead, let's use the sender's profile image. (Granted, the world has more 
Paul's than it *really* knows what to do with. )

<img src="images/still-up.png" width="321" height="117" />

But please keep the icon simple. Too much nuance may be lost on the user. 