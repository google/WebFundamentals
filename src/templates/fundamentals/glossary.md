project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# Glossary {: .page-title }

{{#each sortedTerms}}

## {{ @key }}

{{#each this}}
<dl itemscope="" itemType="http://schema.org/Thing">
  <dt>
    <h3 {{~#if acronym}} id="{{ acronym }}"{{/if}}>
      <span itemprop="name">{{ term }}</span>{{~#if acronym}}
      (<abbr title="{{ term }}" itemprop="alternateName">{{ acronym }}</abbr>){{/if}}
    </h3>
  </dt>
  <dd>{{~#if description}}
    <p itemprop="description">
      {{{description}}}
    </p>{{/if}}{{~#if see}}
    <p>
      <b>See</b>
      <a href="{{see.link}}" itemprop="mainEntityOfPage">
        {{see.title}}
      </a>
    </p>{{/if}}{{~#if links}}
    <ul>
      {{#each links}}<li><a href="{{link}}">{{title}}</a></li>{{/each}}
    </ul>{{/if}}
  </dd>
</dl>

{{/each}}

{{/each}}
