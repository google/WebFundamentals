project_path: /web/_project.yaml
book_path: /web/{{section}}/_book.yaml
full_width: true

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

# {{ title }} {: .page-title }

<section class="kd-tabbed-vert" id="vertTab">
  <article>
    <header id="africa">Africa</header>

{{#each articles}}
{{#eq region 'africa'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="asia">Asia</header>

{{#each articles}}
{{#eq region 'asia'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="europe">Europe</header>

{{#each articles}}
{{#eq region 'europe'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="middle-east">Middle East</header>

{{#each articles}}
{{#eq region 'middle-east'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="north-america">North America</header>

{{#each articles}}
{{#eq region 'north-america'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
  <article>
    <header id="south-america">South America</header>

{{#each articles}}
{{#eq region 'south-america'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>{{{description}}}</p>
<p>
  {{datePublishedPretty}} 
  {{#if tags}} | {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
{{/eq}}
{{/each}}

  </article>
</section>
