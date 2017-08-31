project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# {{{ title }}} {: .page-title }

{{#each articles}}

## [{{ title }}]({{url}})
{{#if image}}
<div class="attempt-right">
    <img src="{{image}}">
</div>
{{/if}}
{{{description}}}

<div style="clear:both"></div>

{{/each}}
