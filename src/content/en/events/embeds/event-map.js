function EventMap(mapElement, endpoint) {
  var tags = mapElement.getAttribute('data-tags');
  var endpoint = 'https://web-events-feed.appspot.com/feeds?tags=' + tags;
  this.map = this.createMap(mapElement);
  this.fetchData(endpoint, this.createMarkers.bind(this, this.map));
}

EventMap.prototype.createMap = function(mapElement) {
  // Create a map object and specify the DOM element for display.
  return new google.maps.Map(mapElement, {
    center: {lat: 10, lng: 0},
    scrollwheel: false,
    zoom: 2
  });
}

EventMap.prototype.fetchData = function(endpoint, cb) {
  // Fetch marker data
  var req = new XMLHttpRequest();
  req.addEventListener('load', function() {
    var data;
    try {
      data = JSON.parse(req.responseText);
    } catch(err) {
      // TODO: Track an error to analytics?
      return;
    }
    cb(data);
  });
  req.open('GET', endpoint);
  req.send();
}

EventMap.prototype.createMarkers = function(map, markerData) {
  markerData.forEach(function(event) {
    if (!event.latlng.lat || !event.latlng.lat) {
      // TODO: Track an error to notify the event organizers
      return;
    }

    if (!event.defaultEventUrl) {
      // TODO: Track an error to notify the event organizers
      return;
    }

    // Not all events are hosted on devsite (Google run PWA roadshows link out
    // to DefJam). But events coming from the GDG Dashboard always start
    // with '/'
    if (event.defaultEventUrl.substring(0, 1) === '/') {
      event.defaultEventUrl = 'https://developers.google.com' + event.defaultEventUrl;
    }

    // Create a marker on the map
    var marker = new google.maps.Marker({
      position: {
        lat: event.latlng.lat,
        lng: event.latlng.lng,
      },
      map: map,
      title: event.name,
      icon: this.getIconByType(event)
    });
    // Create an InfoWindow for the marker
    var contentString = '<h3 class="event-title">' +
                          '<a target="_blank" href="'+event.defaultEventUrl+'">'+event.name+'</a>' +
                        '</h3>' +
                        '<p class="event-location">'+event.location+'</p>';
    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  }.bind(this));
}

EventMap.prototype.getIconByType = function(event) {
  return '/web/events/images/' + event.iconType + '-marker.png';
}

function initMap() {
  new EventMap(document.getElementById('map'));
}
