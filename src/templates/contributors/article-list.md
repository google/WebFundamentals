project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml

{# wf_auto_generated #}
{# wf_template: src/templates/contributors/article-list.md #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

<style>
  .wf-icon-width {width: 32px;}
  .wf-homepage {
    background-color: #CFD8DC;
    border-radius: 50%;
    color: black;
    height: 32px;
    padding-top: 4px;
    text-align: center;
    vertical-align: top !important;
  }
</style>

# Articles by {{{ contributor.name.given }}} {{{ contributor.name.family }}} {: .page-title }

{{#if contributor.description.en}}{{contributor.description.en}}
{{~else}}{{contributor.name.given}} is a contributor to Web<b>Fundamentals</b>{{/if}}

{{#if contributor.homepage}}<a href="{{contributor.homepage}}">
  <i class="material-icons wf-icon-width wf-homepage">http</i>
</a>
{{/if}}
{{#if contributor.github}}<a href="https://github.com/{{contributor.github}}">
  <img class="wf-icon-width" src="/site-assets/logo-github.svg">
</a>
{{/if}}
{{#if contributor.twitter}}<a href="https://twitter.com/{{contributor.twitter}}">
  <img class="wf-icon-width" src="/site-assets/logo-twitter.svg">
</a>
{{/if}}
{{#if contributor.google}}<a href="https://plus.google.com/{{contributor.google}}">
  <img class="wf-icon-width" src="/site-assets/logo-google-plus.svg">
</a>
{{/if}}


{{#each articles}}

## [{{ title }}]({{url}})
{{#if image}}

<div class="attempt-right">
  <a href="{{url}}">
    <img src="{{image}}">
  </a>
</div>

{{/if}}

{{{description}}}

<div style="clear:both"></div>

{{/each}}
