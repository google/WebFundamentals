project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

<style>
  .contributor-container {
    display: flex;
    flex-direction: flow;
    flex-wrap: wrap;
  }
  .contributor {
    flex-grow: 1;
    width: 100%;
    margin-bottom: 1em;
  }
  @media (min-width: 999px) {
      .contributor {
        width: 50%;
        padding-right: 16px;
      }
    }
  .contributor h3 {margin: 0;}
  .contributor img.person {
    border-radius: 100%;
    width: 64px;
    float: left;
    margin: 0 16px 16px 0;
  }

  .contributor .wf-byline-desc,
  .contributor .wf-byline-social {
    margin-left: 80px;
    font-size: smaller;
  }
  .contributor .wf-byline-desc i {
    color: #757575;
  }
  .contributor .wf-byline-social img {
    width: 2em;
  }
</style>

# Contributors to WebFundamentals {: .page-title }

<div class="contributor-container">
  {{#each contributors}}
  <div class="contributor" id="{{id}}" itemscope itemtype="http://schema.org/Person">
    <img class="person" itemprop="image" src="/web/images/contributors/{{photo}}.jpg" alt="{{name.given}} {{name.family}}">
    <section class="wf-byline-meta">
      <h3 itemprop="name">
        {{#if homepage}}<a itemprop="url" href="{{homepage}}">{{/if~}}
        <span itemprop="givenName">{{name.given}}</span> <span itemprop="familyName">{{name.family}}</span>
        {{~#if homepage}}</a>{{/if}}
      </h3>
      <div class="wf-byline-desc">
        {{#if description.en}}{{description.en}}
        {{~else}}{{name.given}} is a contributor to Web<b>Fundamentals</b>{{/if}}
        <a href="/web/resources/contributors/{{id}}">
          <i class="material-icons">description</i>
        </a>
      </div>
      <div class="wf-byline-social">
        {{#if github}}
        <a href="https://github.com/{{github}}">
          <img src="/site-assets/logo-github.svg">
        </a>
        {{/if}}
        {{#if twitter}}<a itemprop="sameAs" href="https://twitter.com/{{twitter}}">
          <img src="/site-assets/logo-twitter.svg">
        </a>
        {{/if}}
        {{#if google}}
        <a itemprop="sameAs" href="https://plus.google.com/{{google}}">
          <img src="/site-assets/logo-google-plus.svg">
        </a>
        {{/if}}
      </div>
    </section>
  </div>
  {{/each}}
</div>
