project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Components are the building blocks of modern web applications. What best practices should you follow when building your own components so they can stand the test of time?

{# wf_updated_on: 2017-08-14 #}
{# wf_published_on: 2017-08-14 #}
{# wf_blink_components: Blink>DOM #}

<style>
nav.devsite-page-nav, .devsite-rating-container {display:none;}
</style>

# Building Components {: .page-title }

Components are the building blocks of modern web applications. What best
practices should you follow when building your own components so they can stand
the test of time?

<div class="attempt-left">
  <h2><a href="./customelements">Custom Elements</a></h2>
  <a href="./customelements">
    <img width="48" src="/web/images/md-icons/ic_code_black_24px.svg"
      class="attempt-right">
  </a>
  <p>
    Custom elements give developers the ability to extend HTML and create their
    own tags. Because custom elements are standards based they benefit from the
    Web's built-in component model. The result is more modular code that can be
    reused in many different contexts.
  </p>
  <a href="./customelements" class="button button-primary">Learn more</a>
</div>

<div class="attempt-right">
  <h2><a href="./shadowdom">Shadow DOM</a></h2>
  <a href="./shadowdom">
    <img width="48" src="/web/images/md-icons/ic_border_style_black_24px.svg"
      class="attempt-right">
  </a>
  <p>
    Shadow DOM is a web standard that offers component style and markup
    encapsulation. It is a critically important piece of the Web Components
    story as it ensures that a component will work in any environment 
    even if other CSS or JavaScript is at play on the page.
  </p>
  <a href="./shadowdom" class="button button-primary">Learn more</a>
</div>

<div style="clear:both;"></div>

<div class="attempt-left">
  <h2><a href="./best-practices">Best Practices</a></h2>
  <a href="./best-practices">
    <img width="48" src="/web/images/md-icons/ic_done_black_24px.svg"
      class="attempt-right">
  </a>
  <p>
    Because custom elements and shadow DOM are low-level primitives, it's not
    always clear how best to combine them to create a component that is robust
    and works well in many different environments. While you really can do just
    about anything with these APIs, here are a few best practices to help ensure
    your components work well anywhere.
  </p>
  <a href="./best-practices" class="button button-primary">Learn more</a>
</div>

<div class="attempt-right">
  <h2><a href="./examples/">Examples</a></h2>
  <a href="./examples/">
    <img width="48" src="/web/images/md-icons/ic_explore_black_24px.svg"
      class="attempt-right">
  </a>
  <p>
    HowTo-Components are a set of elements which demonstrate Custom Element
    and Shadow DOM best practices. These elements are not intended to be used
    in production, but are instead presented as a teaching aide to help map
    best practice suggestions to actual implementations.
  </p>
  <a href="./examples/" class="button button-primary">Learn more</a>
</div>

<div style="clear:both;"></div>
