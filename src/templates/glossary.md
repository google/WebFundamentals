project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml

{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# Glossary {: .page-title }

{{#each terms}}

## {{ term }}

{{{description}}}

{{#if acronyms}}**Acronyms:** {{#each acronyms}}`{{this}}` {{/each}}{{/if}}

{{#if primaryLink}}[Read more]({{primaryLink}}){{/if}}

<div style="clear:both"></div>

{{/each}}


