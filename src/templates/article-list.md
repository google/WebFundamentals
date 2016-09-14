project_path: /web/_project.yaml
book_path: /web/{{section}}/_book.yaml

{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# {{{ title }}} {: .page-title }

{{#each articles}}

## {{ title }}
<div class="attempt-right">
  {{#if image}}
    <img src="{{image}}">
  {{else}}
    <img src="https://placehold.it/350x150">
  {{/if}}
</div>
{{{description}}}

[Read more]({{url}})

{{#if author}}
[{{author}}](/web/resources/contributors#{{author}})
{{/if}}
{{published}}

{{#if tags}}
Tags: {{#each tags}}[{{this}}](/web/updates/tags/{{this}}) {{/each}}
{{/if}}

<div style="clear:both"></div>

{{/each}}
