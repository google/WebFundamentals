project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# Glossary {: .page-title }

{{#each sortedTerms }}
## {{ @key }}

{{#each this}}

### {{#if link}}<a href="{{ link }}">{{/if}}{{ term }} {{#if acronym}}(<abbr title="{{ term }}">{{ acronym }}</abbr>){{/if}}{{#if link}}</a>{{/if}}

{{{description}}}

{{#if links}}
<ul>
{{#each links}}
<li><a href="{{ link }}">{{ title }}</a></li>
{{/each}}
</ul>
{{/if}}

{{/each}}
{{/each}}
