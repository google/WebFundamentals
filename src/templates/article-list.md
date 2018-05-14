project_path: /web/_project.yaml
book_path: /web/{{section}}/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# {{{ title }}} {: .page-title }

{{#each articles}}

## {{ title }}
<div class="attempt-right">
  {{#if image}}
    <img src="{{image}}">
  {{else}}
    <img src="/web/updates/images/generic/star.png">
  {{/if}}
</div>
{{{description}}}

[Read more]({{url}})

{{#if author}}
[{{author}}](/web/resources/contributors#{{author}})
{{/if}}
{{published}}

{{#if tags}}
Tags: {{#each tags}}[{{this}}](/web/{{../../section}}/tags/{{this}}) {{/each}}
{{/if}}

<div style="clear:both"></div>

{{/each}}

<a href="https://developers.google.com/web/{{section}}/rss.xml">
  <img src="/web/images/md-icons/ic_rss_feed_black_48dp.svg" style="height:36px;">
  <span style="position:relative;top:-6px;">Subscribe</span>
  <link rel="alternate" type="application/rss+xml" title="RSS" href="https://developers.google.com/web/{{section}}/rss.xml">
  <link rel="alternate" type="application/atom+xml" title="ATOM" href="https://developers.google.com/web/{{section}}/atom.xml">
</a>
