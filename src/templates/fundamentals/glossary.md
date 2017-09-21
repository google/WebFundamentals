project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# Glossary {: .page-title }

{{#each sortedTerms }}
## {{ @key }}
{{#each this}}
### {{ term }} {{#if acronym}}(<abbr title="{{ term }}">{{ acronym }}</abbr>){{/if}}

: {{{description}}}
{{#if link}}: [Learn more]({{ link }}){{/if}}

{{#each links}}
* [{{ title }}]({{ link }})
{{/each}}
{{/each}}
{{/each}}
