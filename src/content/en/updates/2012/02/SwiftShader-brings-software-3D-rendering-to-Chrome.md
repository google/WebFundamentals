project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-01 #}
{# wf_published_on: 2012-02-17 #}
{# wf_tags: news,webgl,graphics #}
{# wf_blink_components: N/A #}

# SwiftShader brings software 3D rendering to Chrome {: .page-title }

{% include "web/_shared/contributors/ilmariheikkinen.html" %}


[SwiftShader](https://github.com/google/swiftshader) is a software 3D renderer used in Chrome 18 that lets you use CSS 3D and WebGL even on blacklisted GPUs. SwiftShader is available only on Windows and kicks in when you visit a site that uses 3D graphics features.

The first time you run Chrome, it checks if your GPU is blacklisted. In the unfortunate case that it is, Chrome downloads and installs the SwiftShader component in the background. After the component is installed, you can view 3D content. If you visit a 3D site before the component has finished installing, you may need to close and re-open the tab to view the site.

The performance of SwiftShader should be good enough to view simple 3D content.

To force-enable SwiftShader for testing purposes, start Chrome from the command line with the --blacklist-accelerated-compositing and --blacklist-webgl flags.

You can read more about Chrome 18's new graphics features (including GPU-accelerated 2D canvas) at the [Chromium Blog](https://blog.chromium.org/2012/02/gpu-accelerating-2d-canvas-and-enabling.html)


