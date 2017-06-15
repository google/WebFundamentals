project_path: /web/_project.yaml
book_path: /web/shows/_book.yaml
description: With the introduction of a Chromium powered WebView in Android 4.4 (KitKat) developers now have a huge range of new tools at their disposal to build great native apps using the WebView.

{# wf_updated_on: 2015-02-23 #}
{# wf_published_on: 2015-02-23 #}
{# wf_youtube_id: BTlzw5UAjQs #}

# Build Mobile Apps with the Chrome WebView {: .page-title }


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="BTlzw5UAjQs"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>


We all know the problems that developers have had in the past building for WebView:  Limited HTML5 features, no debugging tools, no build tools.  With the introduction of a [Chromium powered WebView](/chrome/mobile/docs/webview/overview) in Android 4.4 (KitKat) developers now have a huge range of new tools at their disposal to build great native apps using the WebView.

The WebView supports full [remote debugging](/chrome-developer-tools/docs/remote-debugging#debugging-webviews) with the same tools you use for Chrome. You can also take your trusted web development workflow with Grunt and integrate that into your native stack tooling via Gradle.  Further merging worlds, there's a clever trick to use the Chrome DevTools to test your native code from JavaScript.

[Slides: Build Mobile Apps using the Chrome WebView](https://gauntface.com/presentations/chrome-dev-summit-2013/chrome-webview/)

## Effective WebView development takeaways

+  It’s not the new features that are important, its the tooling that you can now use to speed up your workflow
+  Don’t try to emulate the native UI.  But make sure to remove some of the tells that it is Web Content.
+  Use native implementations of features when appropriate.  i.e, use the DownloadManager rather than XHR for large files.


