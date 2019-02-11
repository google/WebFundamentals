project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-09 #}
{# wf_published_on: 2012-04-04 #}
{# wf_tags: news,offline,filesystem #}
{# wf_blink_components: N/A #}

# Taking an Entire Page Offline using the HTML5 FileSystem API {: .page-title }

{% include "web/_shared/contributors/ericbidelman.html" %}


Let's face it, AppCache is annoying and has problems [[1](https://paul.kinlan.me/app-cache-and-html5-history/), [2](https://www.w3.org/2011/web-apps-ws/papers/Facebook.html), [3](https://paul.kinlan.me/dear-appcache/)]. One big limitation is the fact that it's impossible to dynamically cache assets on demand. Essentially, this makes it an all or nothing thing when it comes to taking an app offline. Either everything in the manifest is cached up front, or nothing is cached.

The HTML5 [FileSystem API](https://www.html5rocks.com/en/tutorials/file/filesystem/){: .external } becomes an attractive solution for AppCache's shortcomings. One can programmatically store files and folder hierarchies in the local (sandboxed) filesystem and subsequently add/update/remove individual resources as necessary. My colleague, Boris Smus, even wrote a [nice library](https://github.com/borismus/game-asset-loader) to manage this type of offline caching in the context of games. The same idea can be extrapolated to work with any type of web app.

[crbug.com/89271](http://crbug.com/89271) is an important fix for the FileSystem API which makes relative [filesystem: URL](https://www.html5rocks.com/en/tutorials/file/filesystem/#toc-filesystemurls) paths work like a charm.

Let's say for example, I've saved index.html in the filesystem's root folder (`fs.root`), created an img folder, and saved "test.png" in it. The `filesystem:` URL for those two files would be `filesystem:http://example.com/temporary/index.html` and `filesystem:http://example.com/temporary/img/test.png`, respectively. Then, if I wanted to use "test.png" for an `img.src`, I needed to use its full absolute path: `<img src="filesystem:http://example.com/temporary/img/test.png">`. That meant rewriting all of the relative urls in index.html to point to corresponding file's `filesystem:` URL. Not cool! Now, with this bug fix, I can keep the relative path to the file (`<img src="img/test.png">`) as they will resolve correctly to a filesystem origin.

This feature makes it trivial to pull down a page and save all of its resources offline, while still preserving the exact same folder structure as the online version.


