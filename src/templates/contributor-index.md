project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml


<style>
.wf-byline h3 {margin: 0;}
.wf-byline .attempt-left {margin: 0 16px 16px 0;}
.wf-byline img {border-radius: 100%; width: 64px;}
.wf-byline .wf-byline-desc {font-size: smaller;}
.wf-byline .wf-byline-social {font-size: smaller;}
</style>

# Contributors to WebFundamentals {: .page-title }

<table class="columns responsive">
  <tr>
    {{#each contributors}}
    <td class="wf-byline" id="{{@key}}">
      <div class="attempt-left">
        <figure>
          {{#if noPhoto}}
            <img src="/web/images/contributors/no-photo.jpg" alt="{{name.given}} {{name.family}}">
          {{else}}
            <img src="/web/images/contributors/{{@key}}.jpg" alt="{{name.given}} {{name.family}}">
          {{/if}}
        </figure>
      </div>
      <section class="wf-byline-meta">
        <h3>{{name.given}} {{name.family}}</h3>
        <div class="wf-byline-desc">
          {{#if description.en}}
            {{description.en}}
          {{else}}
            {{name.given}} is a contributor to Web<b>Fundamentals</b>
          {{/if}}
        </div>
        <!--
        <div class="wf-roles">
          Roles:
          {{#inArray role "engineer"}}<span class="material-icons">bug report</span>{{/inArray}}
          {{#inArray role "author"}}<span class="material-icons">create</span>{{/inArray}}
          {{#inArray role "contributor"}}<span class="material-icons">feedback</span>{{/inArray}}
          {{#inArray role "translator"}}<span class="material-icons">language</span>{{/inArray}}
        </div>
        -->
        <div class="wf-byline-social">
          {{#if homepage}}<a href="{{homepage}}" class="wf-homepage">{{homepage}}</a>{{/if}}
          {{#if github}}<a href="https://github.com/{{github}}" class="wf-homepage">https://github.com/{{github}}</a>{{/if}}
          {{#if twitter}}<a href="https://twitter.com/{{twitter}}" class="wf-twitter">@{{twitter}}</a>{{/if}}
          {{#if google}}<a href="https://plus.google.com/{{google}}" class="wf-googleplus">Google+</a>{{/if}}
        </div>
      </section>
    </td>
    {{#ifNth 2 @index}}
    </tr>
    <tr>
    {{/ifNth}}
    {{/each}}
</table>
