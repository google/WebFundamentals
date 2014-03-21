function loadAndDisplayPosts() {
  var container = document.getElementById("feed-posts");
  var feed = new google.feeds.Feed("http://news.dartlang.org/feeds/posts/default");
	var MAX_POSTS = 1;
  feed.load(function(result) {
    if (!result.error) {
      for (var i = 0; i < result.feed.entries.length && i < MAX_POSTS; i++) {
        var entry = result.feed.entries[i];
        // var li = document.createElement("li");
        var a = document.createElement("a");
        a.setAttribute('href', entry.link);
        a.appendChild(document.createTextNode(entry.title));
        var p = document.createElement("p");
        p.appendChild(document.createTextNode("news.dartlang.org"));
        p.innerHTML+="&nbsp;&nbsp;&nbsp;";
        p.appendChild(a);
        container.appendChild(p);
      }
    }
  });
}

function loadGoogleApis() {
  google.load("feeds", "1", {"callback" : loadAndDisplayPosts});
}

document.addEventListener('DOMContentLoaded', function () {
  var script = document.createElement("script");
  script.src = "https://www.google.com/jsapi?callback=loadGoogleApis";
  script.type = "text/javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
});