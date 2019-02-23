project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2019-02-22 #}
{# wf_published_on: 2012-09-25 #}
{# wf_tags: news,graphics,shaders,css #}
{# wf_blink_components: N/A #}

# Interactive Globe with CSS shaders & Google Maps {: .page-title }

{% include "web/_shared/contributors/paulirish.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="NZRqnohI3m4"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Recently, I have read <a href="https://www.wired.com/2012/09/adobes-css-shaders-now-an-official-web-standard/" title="" target="_blank">news on Webmonkey</a> that Adobe’s CSS Shaders proposal, which will bring high-quality cinematic effects to the web through some new CSS tools, has been accepted by the W3C. If you haven't seen it yet, watch the video.


<!--The Web is developing so quickly, it surprises me.-->

<p>Google Chrome's latest Canary added support for CSS shaders, so I decided to experiment with them.</p>

<p>In this experiment, I used custom vertex shader (<code>spherify.vs</code>) and fragment shader (<code>spherify.fs</code>) to create a globe with Google Maps.</p>


    <iframe
      class="globe"
      src="https://maps.google.com/?ie=UTF8&amp;amp;ll=14.597042,-15.625&amp;amp;spn=158.47027,316.054688&amp;amp;t=h&amp;amp;z=2&amp;amp;output=embed"
      scrolling="no"></iframe>


    .globe {
      width: 550px;
      height: 550px;
      border: 0;
      -webkit-filter: contrast(1.4) custom(url(shaders/spherify.vs) mix(url(shaders/spherify.fs) multiply source-atop),
        50 50 border-box,
        amount 1,
        sphereRadius 0.5,
        sphereAxis -0.41 1 0.19,
        sphereRotation 43.5,
        ambientLight 0.15,
        lightPosition 1 0.87 0.25,
        lightColor 1 1 1 1,
        transform perspective(500));
    }


<p>
Here, we're applying a vertex shader (<code>spherify.vs</code>) which will operate on a mesh that has 50 lines and 50 columns (<code>50 50 border-box</code>). Feel free to read the source of the vertex shader: <a href="http://is.gd/spherifyvs">spherify.vs</a>. It's written in <a href="https://en.wikipedia.org/wiki/OpenGL_Shading_Language">GLSL</a> but you can probably follow along.
</p>
<p>The <code>mix()</code> function provides basic functionalities for color manipulation like blending and alpha compositing on a fragment shader. </p>

<p>We can change the shere's radius, axis, rotation right in the CSS. In this example we set the value of the <code>sphereRadius: 0.5 </code>and it gives original sphere size.</p>

### Enjoy the demo!

<p>Below is a video of the effect. If you've got shaders enabled you can play with the real thing right below!</p>


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="5TG6TK2nueo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

<iframe class="globe" src="https://maps.google.com/?ie=UTF8&amp;ll=14.597042,-15.625&amp;spn=158.47027,316.054688&amp;t=h&amp;z=2&amp;output=embed" scrolling="no"></iframe>

<p><small>If you just see a flat google maps above, you can enable it with the instructions below</small></p>

### Browsers support: CSS shaders
<p>This is currently cutting-edge, so it's only available in the latest <a href="https://www.google.com/intl/en/chrome/canary/" title="Download Google Chrome Canary" target="_blank">Google Chrome Canary</a> and WebKit nightly. To enjoy the full experience you'll need to turn a few knobs.
</p>
#### Chrome Canary steps:
<ul>
	<li>Type <code>about:flags</code> in the browser's navigation bar</li>
        <li>Find "Enable CSS Shaders". Enable it
	<li>Relaunch the browser</li>
</ul>
#### WebKit nightly steps
<ul>
	<li>Download and install <a href="https://webkit.org/build-archives/" title="Download WebKit nightly build for Mac" target="_blank">WebKit nightly</a> for Mac OSX</li>
	<li>Open the browser's preferences panel. Go to <b>Advanced</b> tab and tick to show <b>Develop > Enable WebGL</b> menu in the menu bar.</li>
	<li>In the browser's menu bar select <b>Develop </b></li>
</ul>



<aside class="bio clearfix" style="border: 3px double #CCC;
padding: 10px;">

Avaz Bokiev is a web developer in NYC. Check out his recent experiments (including CSS Shader) <a href="/web/updates/2012/09/Interactive-Globe-with-CSS-shaders-Google-Maps">here</a> and his blog at <a href="https://avaz.me/">avaz.me</a>.

</aside>

