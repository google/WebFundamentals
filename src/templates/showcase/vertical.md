project_path: /web/_project.yaml
book_path: /web/{{section}}/_book.yaml
full_width: true

{# wf_auto_generated #}
{# wf_updated_on: 1900-01-01 #}
{# wf_published_on: 1900-01-01 #}

<style>
  .kd-tabbed-vert article h3 {
    margin-bottom: 0;
  }
  .kd-tabbed-vert article h3 + p {
    margin-top: 0;
  }
  .kd-tabbed-vert article img {
    max-width: 128px;
    max-height: 128px;
    float: left;
    margin: 0 40px 40px 0;
    max-width: calc((100% - 40px) / 2);
  }
</style>

# {{ title }} {: .page-title }

<div class="clearfix"></div>

<section class="kd-tabbed-vert" id="vertTab">
  <article>
    <header id="entertainment">Entertainment</header>
{{#each articles}}
{{#eq vertical 'entertainment'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>
  {{{description}}}
</p>
<p>
  {{ formatDatePretty datePublishedMoment }} 
  {{#if tags}} <br> {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
</p>
<div class="clearfix"></div>
{{/eq}}
{{/each}}
  </article>
  <article>
    <header id="media">Media</header>
{{#each articles}}
{{#eq vertical 'media'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>
  {{{description}}}
</p>
<p>
  {{ formatDatePretty datePublishedMoment }}
  {{#if tags}} <br> {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
</p>
<div class="clearfix"></div>
{{/eq}}
{{/each}}
  </article>
  <article>
    <header id="real-estate">Real Estate</header>
{{#each articles}}
{{#eq vertical 'real-estate'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>
  {{{description}}}
</p>
<p>
  {{ formatDatePretty datePublishedMoment }}
  {{#if tags}} <br> {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
</p>
<div class="clearfix"></div>
{{/eq}}
{{/each}}
  </article>
  <article>
    <header id="retail">Retail</header>
{{#each articles}}
{{#eq vertical 'retail'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>
  {{{description}}}
</p>
<p>
  {{ formatDatePretty datePublishedMoment }}
  {{#if tags}} <br> {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
</p>
<div class="clearfix"></div>
{{/eq}}
{{/each}}
  </article>
  <article>
    <header id="travel">Travel</header>

{{#each articles}}
{{#eq vertical 'travel'}}
<h3><a href="{{url}}">{{ title }}</a></h3>
<p>
  {{{description}}}
</p>
<p>
  {{ formatDatePretty datePublishedMoment }}
  {{#if tags}} <br> {{#each tags}}<a href="/web/{{../../section}}/tags/{{this}}">#{{this}}</a> {{/each}}{{/if}}
</p>
<div class="clearfix"></div>
{{/eq}}
{{/each}}

  </article>
</section>
