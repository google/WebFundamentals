project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2013-03-24 #}
{# wf_published_on: 2013-03-24 #}
{# wf_tags: news,webgl,shaders,css,filters #}

# Introduction to Custom Filters (aka CSS Shaders) {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="WmwZqVFLRoA"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Custom Filters, or CSS Shaders as they used to be called, allow you to use the power of WebGL's shaders with your DOM content. Since in the current implementation the shaders used are virtually the same as those in WebGL, you need to take a step back and understand some 3D terminology and a little bit of the graphics pipeline.

I've included a recorded version of a presentation I recently delivered to LondonJS. In the video I step through an overview of the 3D terminology you need to understand, what the different variable types are that you'll encounter, and how you can start playing with Custom Filters today. You should also <a href="//goo.gl/e3KMp">grab the slides</a> so you can play with the demos yourself.

## Introduction to Shaders

<p>I've previously written an <a href="http://www.html5rocks.com/en/tutorials/webgl/shaders/">introduction to shaders</a> which will give you a good breakdown of what shaders are and how you can use them from a WebGL point of view. If you've never dealt with shaders it's something of a required read before you go much further, because many of the Custom Filters concepts and language hinges on the existing WebGL shader terminology.</p>

<p>So with that said, let's enable Custom Filters and plough on!</p>

## Enabling Custom Filters

<p>Custom Filters are available in both Chrome and Canary as well as Chrome for Android. Simply head over to <code>about:flags</code> and search for "CSS Shaders", enable them and restart the browser. Now you're good to go!</p>

## The syntax

<p>Custom Filters expands on the set of filters that you can already apply, like <code>blur</code> or <code>sepia</code>, to your DOM elements. Eric Bidelman wrote a great <a href="http://html5-demos.appspot.com/static/css/filters/index.html">playground tool</a> for those, which you should check out.</p>

<p>To apply a Custom Filter to a DOM element you use the following syntax:</p>


    .customShader {
      -webkit-filter:
    
        custom(
          url(vertexshader.vert)
          mix(url(fragment.frag) normal source-atop),
    
        /* Row, columns - the vertices are made automatically */
        4 5,
    
        /* We set uniforms; we can't set attributes */
        time 0)
    }
    

<p>You'll see from this that we declare our vertex and fragment shaders, the number of rows and columns we want our DOM element to get broken down into, and then any uniforms we want to pass through.</p>

<p>A final thing to point out here is that we use the <code>mix()</code> function around the fragment shader with a blend mode (<code>normal</code>), and a composite mode (<code>source-atop</code>). Let's take a look at the fragment shader itself to see why we even need a <code>mix()</code> function.</p>

## Pixel Pushing

<p>If you're familiar with WebGL's shaders you'll notice that in Custom Filters things are a little different. For one we don't create the texture(s) that our fragment shader uses to fill in the pixels. Rather the DOM content that has the filter applied gets mapped to a texture automatically, and that means two things:</p>

1. For security reasons we can't query individual pixel color values of the DOM's texture
1. We don't (at least in current implementations) set the final pixel color ourselves, i.e. <code>gl_FragColor</code> is off limits. Rather, it's assumed that you will want to render the DOM content, and what you get to do is manipulate its pixels indirectly through <code>css_ColorMatrix</code> and <code>css_MixColor</code>.

<p>That means our Hello World of fragment shaders looks more like this:</p>


    void main() {
      css_ColorMatrix = mat4(1.0, 0.0, 0.0, 0.0,
                             0.0, 1.0, 0.0, 0.0,
                             0.0, 0.0, 1.0, 0.0,
                             0.0, 0.0, 0.0, 1.0);
    
      css_MixColor = vec4(0.0, 0.0, 0.0, 0.0);
    
      // umm, where did gl_FragColor go?
    }
    

<p>Each pixel of the DOM content is multiplied by the <code>css_ColorMatrix</code>, which in the above case does nothing as its the <a href="http://en.wikipedia.org/wiki/Identity_matrix">identity matrix</a> and changes none of the RGBA values. If we did want to, say, just keep the red values we would use a <code>css_ColorMatrix</code> like this:</p>


    // keep only red and alpha
    css_ColorMatrix = mat4(1.0, 0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0, 0.0,
                           0.0, 0.0, 0.0, 1.0);
    

<p>You can hopefully see that as you multiply the 4D (RGBA) pixel values by the matrix that you get a manipulated pixel value out of the other side, and in this case one that zeros out the green and blue components.</p>

<p>The <code>css_MixColor</code> is mainly used as a base color that you want to, well, mix in with your DOM content. The mixing is done through the blend modes that you'll be familiar with from art packages: overlay, screen, color dodge, hard light and so on.</p>

<p>There are plenty of ways that these two variables can manipulate the pixels, and included in <a href="//goo.gl/e3KMp">my presentation</a> is a <a href="http://aerotwist.com/presentations/custom-filters/demos/demo2.html">demo that you can play around with</a>. You should check out the <a href="https://dvcs.w3.org/hg/FXTF/raw-file/tip/filters/index.html#shader-processing-model">Custom Filters specification</a> to get a better handle on how the blend and composite modes interact.</p>

## Vertex Creation

<p>In WebGL we take full responsibility for the creation of our mesh's 3D points, but in Custom Filters all you have to do is specify the number of rows and columns that you want and the browser will automatically break down your DOM content into a bunch of triangles:</p>

<p><figure><img src="/web/updates/images/2013/03/custom-filters/rowscols.png" alt="Vertex creation" />
<figcaption>An image being broken down into rows and columns</figcaption>
</figure>
</p>

<p>Each one of those vertices then gets passed through to our vertex shader for manipulation, and that means we can start moving them around in 3D space as we need. It's not long before you can make some pretty crazy effects!</p>

<p><figure><img src="/web/updates/images/2013/03/custom-filters/weird.jpg" alt="An accordion effect" />
<figcaption>An image being warped by an accordion effect</figcaption>
</figure></p>

## Animating with Shaders

<p>Bringing in animations to your shaders is what makes them fun and engaging. To do that you simply use a transition (or animation) in your CSS to update uniform values:</p>


    .shader {
      /* transition on the filter property */
      -webkit-transition: -webkit-filter 2500ms ease-out;
    
      -webkit-filter: custom(
        url(vshader.vert)
        mix(url(fshader.frag) normal source-atop),
        1 1,
        time 0);
    }
    
     .shader:hover {
      -webkit-filter: custom(
        url(vshader.vert)
        mix(url(fshader.frag) normal source-atop),
        1 1,
        time 1);
    }
    

<p>So the thing to notice in the code above is that time is going to ease from <code>0</code> to <code>1</code> during the transition. Inside the shader we can declare the uniform <code>time</code> and use whatever its current value is:</p>


    uniform float time;
    
    uniform mat4 u_projectionMatrix;
    attribute vec4 a_position;
    
    void main() {
      // copy a_position to position - attributes are read only!
      vec4 position = a_position;
    
      // use our time uniform from the CSS declaration
      position.x += time;
    
      gl_Position = u_projectionMatrix * position;
    }
    

## Get Playing!

<p>Custom Filters are great fun to play with, and the amazing effects you can create are difficult (and in some cases impossible) without them. It is still early days, and things are changing quite a bit, but adding them will add a little bit of showbiz to your projects, so why not give them a go?</p>

## Additional Resources

<ul>
<li><a href="https://github.com/WebGLTools/GL-Shader-Validator">GL Shader Validator</a></li>
<li><a href="http://www.html5rocks.com/en/tutorials/webgl/shaders/">Intro to Shaders</a></li>
<li><a href="http://alteredqualia.com/css-shaders/article/">Getting Started with CSS Custom Filters</a></li>
<li><a href="http://learningwebgl.com/blog/?page_id=1217">Learning WebGL</a></li>
<li><a href="http://html.adobe.com/webstandards/csscustomfilters/cssfilterlab/">Adobe CSS Filter Lab</a></li>
</ul>


{% include "comment-widget.html" %}
