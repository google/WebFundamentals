project_path: /web/_project.yaml
book_path: /web/{{section}}/_book.yaml

{# wf_auto_generated #}
{# wf_template: src/templates/article-list.md #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# {{{ title }}} {: .page-title }

{{#each articles}}

## [{{ title }}]({{url}})

<div class="attempt-right">
  <a href="{{url}}">
    {{#if image}}
      <img src="{{image}}">
    {{else}}
      <img src="/web/updates/images/generic/star.png">
    {{/if}}
  </a>
</div>

{{{description}}}

{{#if author}}
[{{author}}](/web/resources/contributors#{{author}})
{{/if}}
{{published}}

{{#if tags}}
<span class="material-icons">local_offer</span>
{{#each tags}}[`{{this}}`](/web/{{../../section}}/tags/{{this}}) {{/each}}
{{/if}}

[Read article]({{url}}){: .button .button-primary }

<div style="clear:both"></div>

{{/each}}

<a href="https://developers.google.com/web/{{section}}/rss.xml">
  <img src="/web/images/md-icons/ic_rss_feed_black_48dp.svg" style="height:36px;">
  <span style="position:relative;top:-6px;">Subscribe</span>
  <link rel="alternate" type="application/rss+xml" title="RSS" href="https://developers.google.com/web/{{section}}/rss.xml">
  <link rel="alternate" type="application/atom+xml" title="ATOM" href="https://developers.google.com/web/{{section}}/atom.xml">
</a>
