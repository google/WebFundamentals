project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

# Web Updates for {{year}}

{{#each articles}}

## {{title}}
<div class="attempt-right">
  {{#if image}}
    <img src="{{image}}">
  {{else}}
    <img src="https://placehold.it/350x150">
  {{/if}}
</div>
{{description}}

[Read more]({{path}})

{{#if author}}
[{{authorName author}}](/web/resources/contributors#{{author}})
{{/if}}
{{momentFormat published}}

{{#if tags}}
Tags: {{#each tags}}[{{this}}](#) {{/each}}
{{/if}}

<div style="clear:both"></div>

{{/each}}
