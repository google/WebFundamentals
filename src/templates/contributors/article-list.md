project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml

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

{{#if tags}}
Tags: {{#each tags}}[{{this}}](/web/{{../../section}}/tags/{{this}}) {{/each}}
{{/if}}

<div style="clear:both"></div>

{{/each}}
