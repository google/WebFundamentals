project_path: /web/_project.yaml
book_path: /web/{{section}}/_book.yaml
full_width: true

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# {{ title }} {: .page-title }

<section class="kd-tabbed-vert" id="vertTab">
  <article>
    <header id="education">Education</header>

{{#each articles}}
{{#eq vertical 'education'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="entertainment">Entertainment</header>

{{#each articles}}
{{#eq vertical 'entertainment'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="media">Media</header>

{{#each articles}}
{{#eq vertical 'media'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="real-estate">Real Estate</header>

{{#each articles}}
{{#eq vertical 'real-estate'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="retail">Retail</header>

{{#each articles}}
{{#eq vertical 'retail'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="transportation">Transportation</header>

{{#each articles}}
{{#eq vertical 'transportation'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="travel">Travel</header>

{{#each articles}}
{{#eq vertical 'travel'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
</section>
