project_path: /web/_project.yaml
book_path: /web/{{section}}/_book.yaml

# Articles tags by `{{ title }}`

{{#each articles}}
### [{{title}}]({{url}})
{{{description}}} [Read more]({{url}})

{{ datePublishedPretty }} <br>
{{#if tags}}
Tags: {{#each tags}}[{{this}}](/web/updates/tags/{{this}}) {{/each}}
{{/if}}

<div style="clear:both"></div>
{{/each}}
