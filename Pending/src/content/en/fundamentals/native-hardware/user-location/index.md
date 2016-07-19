


<p class="intro">
  The Geolocation API lets you find out, with the user's consent, where the user is located. 
  This functionality could be used as part of user queries; for example, to guide a user to a 
  destination, or for geo-tagging user-created content, such as marking where a photo was taken.
</p>

The Geolocation API also lets you watch where the user is and keep tabs on them as
they move around, always with the user's consent (and only whilst the page is open), this 
opens up a lot of interesting usecases - such as integrating with backend systems to prepare an 
order for collection if the user is close by.

There are a lot of things that you need to be aware of when using using the Geolocation API and 
this guide will walk you through the common use-cases and solutions.

**Note**: [As of Chrome 50, the Geolocation API will only work on secure contexts such as HTTPS](/web/updates/2016/04/geolocation-on-secure-contexts-only).
If your site is hosted on an non-secure origin (such as `HTTP`) the requests to get the users.
location will no longer function.



### Topics


  [Obtain the user's current location](/web/fundamentals/native-hardware/user-location/obtain-location?hl=en)

  [Monitor the user's location](/web/fundamentals/native-hardware/user-location/monitor-location?hl=en)

  [Getting the user to consent to location sharing](/web/fundamentals/native-hardware/user-location/user-consent?hl=en)

