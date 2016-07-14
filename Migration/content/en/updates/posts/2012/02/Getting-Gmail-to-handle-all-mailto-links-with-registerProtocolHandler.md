---
layout: updates/post
title: "Getting Gmail to handle all mailto: links with registerProtocolHandler"
published_on: 2012-02-08
updated_on: 2012-02-08
tags:
  - news
  - registerprotocolhandler
  - mailto
authors:
  - paulirish
---
<p>If you use Gmail you may become frustrated when you click a <code>mailto:</code> link by accident and now your desktop client of Outlook or Mail starts up.

Thanks to <code>navigator.registerProtocolHandler()</code> (<a href="http://updates.html5rocks.com/2011/06/Registering-a-custom-protocol-handler">which we've covered here before</a>) you can wire up Gmail as your default mail client for all <code>mailto:</code> links in Chrome  and Firefox.
</p>

<img alt="Screenshot of registerProtocolHandler prompt" src="{{site.WFBaseUrl}}/updates/images/2012-02-08-getting-gmail-to-handle-all-mailto-links-with-registerprotocolhandler/registerprotocolhandler-prompt.jpg" style="display:block; margin: 10px auto; border: 3px solid #999; box-shadow: 2px 2px 5px #ccc">

Here's how: 

<ol>
<li>First, open up a Gmail tab. You <em>must</em> do this from the Gmail tab, not your html5rocks one. :)
<li>Open your javascript console (<kbd>cmd-opt-j</kbd> on Mac, <kbd>ctrl-shift-j</kbd> on Windows) and enter:
<li><pre>navigator.registerProtocolHandler("mailto",
                                  "https://mail.google.com/mail/?extsrc=mailto&url=%s",
                                  "Gmail");</pre>
<li>Accept the confirmation from the browser.
<li>Click <a href="mailto:yourbestfriend@example.com?subject=registerProtocolHandler()%20FTW!&amp;body=Check%20out%20what%20I%20learned%20at%20http%3A%2F%2Fupdates.html5rocks.com%2F2012%2F02%2FGetting-Gmail-to-handle-all-mailto-links-with-registerProtocolHandler%0A%0APlus%2C%20flawless%20handling%20of%20the%20subject%20and%20body%20parameters.%20Bonus%20from%20RFC%202368!" target="_blank">this mailto: link</a> to test out your new Gmail mailto hookup!
</ol>

<p>Boom. Enjoy.</p>

<p>If you ever need to removing this setting, you can do that at <code>chrome://settings/handlers</code> in Chrome and <kbd>Preferences->Applications->mailto</kbd> in Firefox.</p>

<br>
