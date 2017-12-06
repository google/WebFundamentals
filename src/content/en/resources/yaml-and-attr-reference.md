project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: YAML Front Matter & Other Attributes.

{# wf_updated_on: 2017-12-06 #}
{# wf_published_on: 2017-12-06 #}
{# wf_blink_components: N/A #}

<style>
  .required {
    color: #d50000;
    font-weight: bold;
  }
</style>

# YAML Front Matter and Attribute Reference {: .page-title }

Warning: These attributes should NEVER wrap across lines.


## YAML front matter

YAML front matter must always be at the top of the document.

<table class="responsive">
  <tr>
    <th colspan="2"><h3><code>book_path</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Specifies the location of the <code>_book.yaml</code> used to generate
      the table of contents.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>book_path: /web/section/_book.yaml</code>
    </td>
  </tr>
</table>

<table class="responsive">
  <tr>
    <th colspan="2"><h3><code>description</code></h3></th>
  </tr>
  <tr>
    <td>Required</td><td>No</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      You can provide a page description in the YAML front matter that is
      used as the `meta` description for the page. The description should be
      short (&lt;450 char), and only provide a brief synopsis of the page.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>description: Lorem ipsum</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>
      Do not include any HTML or Markdown in the <code>description</code> field.
    </td>
  </tr>
</table>

<table class="responsive">
  <tr>
    <th colspan="2"><h3><code>full_width</code></h3></th>
  </tr>
  <tr>
    <td>Required</td><td>No</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Relinquishes control over the layout for the area below the site header
      and project bar and above the site footer.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>full_width: true</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>Not supported in the development environment.</td>
  </tr>
</table>

<table class="responsive">
  <tr>
    <th colspan="2"><h3><code>hide_last_updated</code></h3></th>
  </tr>
  <tr>
    <td>Required</td><td>No</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Hides the automatically generated last updated field at the bottom of
      the page.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>hide_last_updated: true</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>Not supported in the development environment.</td>
  </tr>
</table>

<table class="responsive" id="project-path">
  <tr>
    <th colspan="2"><h3><code>project_path</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Specifies the location of the <code>_project.yaml</code> used to tell
      DevSite about the current project.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>project_path: /web/_project.yaml</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>
      If the path book cannot be found, the page will not include the left
      nav and the upper tabs will not be properly highlighted.
    </td>
  </tr>
</table>


## Special attributes

<table class="responsive" id="wf_auto_generated">
  <tr>
    <th colspan="2"><h3><code>wf_auto_generated</code></h3></th>
  </tr>
  <tr>
    <td>Required</td><td>No</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Auto-generated markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Automatically added to files that are generated through some build system.
      Changes the types of tests that are run against the file.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_auto_generated #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_blink_components">
  <tr>
    <th colspan="2"><h3><code>wf_blink_components</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Comma separated list of
      <a href="https://blinkcomponents-b48b5.firebaseapp.com/">Blink
      components</a>. Used to specify which Blink components the article
      references.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>
        &#123;# wf_blink_components: Blink>CSS,Blink>JavaScript>API #}
      </code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>If no blink components are relevant, use <code>N/A</code>.</td>
  </tr>
</table>

<table class="responsive" id="wf_devsite_translation">
  <tr>
    <th colspan="2"><h3><code>wf_devsite_translation</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Markdown pages translated by DevSite</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Automatically added to files that are translated by the DevSite
      translation team. Changes the types of tests that are run against the
      file.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_devsite_translation #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_featured_date">
  <tr>
    <th colspan="2"><h3><code>wf_featured_date</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td>No</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only markdown pages in <b>updates</b> and <b>showcase</b></td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Used to sort article on showcase and updates to keep certain articles at
      or near the top.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_featured_date: 2017-12-06 #}</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>Date format is YYYY-MM-DD</td>
  </tr>
</table>

<table class="responsive" id="wf_featured_image">
  <tr>
    <th colspan="2"><h3><code>wf_featured_image</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only markdown pages in <b>updates</b> and <b>showcase</b></td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      To specify a featured image used on listing pages and within the feeds,
      add a <code>wf_featured_image</code> tag. To ensure this works in feeds,
      the URL provided should be an absolute page on DevSite.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_featured_image: /web/updates/images/weird.jpg #}</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>
      <ul>
        <li>Images should be 16x9, ideally 800px by 450px.</li>
        <li>Looking for a generic image? Check out the
          <a href="https://github.com/google/WebFundamentals/tree/master/src/content/en/updates/images/generic">
          generic images</a> folder.
        </li>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_featured_snippet">
  <tr>
    <th colspan="2"><h3><code>wf_featured_snippet</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only markdown pages in <b>updates</b> and <b>showcase</b></td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      The featured snippet is used as the snippet for listing pages. It is
      your hook to get people to read your article. The snippet is not limited
      by length, and <b>can</b> include HTML.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>
        &#123;# wf_featured_snippet: Use &lt;kbd class='kbd'>Cmd + ]&lt;/kbd>... #}
      </code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td></td>
  </tr>
</table>

<table class="responsive" id="wf_md_include">
  <tr>
    <th colspan="2"><h3><code>wf_md_include</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only markdown files that are included in other markdown files</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Indicates that a file is only meant to be included in another markdown
      file, changes the types of tests run against the file.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_md_include #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_podcast_audio">
  <tr>
    <th colspan="2"><h3><code>wf_podcast_audio</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only podcast episode markdown files</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Link to the actual MP3 download.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>
        &#123;# wf_podcast_audio: https://example.com/path/episode.mp3 #}
      </code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_podcast_duration">
  <tr>
    <th colspan="2"><h3><code>wf_podcast_duration</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only podcast episode markdown files</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Duration of the podcast (HH:MM:SS)
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_podcast_duration: 00:30:37 #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_podcast_fileSize">
  <tr>
    <th colspan="2"><h3><code>wf_podcast_fileSize</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only podcast episode markdown files</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      File size (in bytes) of the MP3 download
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_podcast_fileSize: 29803546 #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_podcast_subtitle">
  <tr>
    <th colspan="2"><h3><code>wf_podcast_subtitle</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only podcast episode markdown files</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Podcast subtitle
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_podcast_subtitle: Paul and Jake talk about CORS. #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_published_on">
  <tr>
    <th colspan="2"><h3><code>wf_published_on</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Identifies the original date the article was written and meant for
      publication. It is used by the build system for sorting articles, and
      is only ever shown to users in the RSS/ATOM feeds.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_published_on: 2017-12-06 #}</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>Format for the date is YYYY-MM-DD.</td>
  </tr>
</table>

<table class="responsive" id="wf_region">
  <tr>
    <th colspan="2"><h3><code>wf_region</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only markdown pages in <b>showcase</b></td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      A comma separated list of regions that the showcase should be listed in.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_region: asia,europe #}</code>
    </td>
  </tr>
  <tr>
    <td>Valid regions</td>
    <td>
      <ul>
        <li>africa</li>
        <li>asia</li>
        <li>europe</li>
        <li>middle-east</li>
        <li>north-america</li>
        <li>south-america</li>
      </ul>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_tags">
  <tr>
    <th colspan="2"><h3><code>wf_tags</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only markdown pages in <b>updates</b> and <b>showcase</b></td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      A comma separated list of tags related to the article.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>
        &#123;# wf_tags: devtools,geolocation,gulp,getusermedia #}
      </code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>
      If the tag doesn't exist in the current list, add it to
      <a href="https://github.com/google/WebFundamentals/blob/master/src/data/commonTags.json">
      <code>commonTags.json</code></a>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_updated_on">
  <tr>
    <th colspan="2"><h3><code>wf_updated_on</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Identifies the when the article was last updated. It is used by the
      build system for sorting articles, and is only ever shown to users in
      the RSS/ATOM feeds. It is also used for helping identify which
      localized articles need to be updated.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_updated_on: 2017-12-06 #}</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>Format for the date is YYYY-MM-DD.</td>
  </tr>
</table>

<table class="responsive" id="wf_vertical">
  <tr>
    <th colspan="2"><h3><code>wf_vertical</code></h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>Only markdown pages in <b>showcase</b></td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Used to identify which vertical a showcase should be listed in.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&#123;# wf_vertical: education,media #}</code>
    </td>
  </tr>
  <tr>
    <td>Valid verticals</td>
    <td>
      <ul>
        <li>education</li>
        <li>entertainment</li>
        <li>media</li>
        <li>real-estate</li>
        <li>retail</li>
        <li>transportation</li>
        <li>travel</li>
      </ul>
    </td>
  </tr>
</table>



## Other

<table class="responsive" id="wf-page-title">
  <tr>
    <th colspan="2"><h3>Page title</h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td class="required">Yes</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      The page title is defined by the first H1-like tag with the
      <code>.page-title</code> class.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>&num; Writing an Article &#123;: .page-title }</code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>Page titles should not include any markdown or HTML tags.</td>
  </tr>
</table>

<table class="responsive" id="author-attribution">
  <tr>
    <th colspan="2"><h3>Author attribution</h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td>Strongly encouraged</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Defines the name of the author at the top of the page
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <code>
        &#123;% include "web/_shared/contributors/petelepage.html" %}
      </code>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>Author attribution should go at the top of the page.</td>
  </tr>
</table>

<table class="responsive" id="translator-attribution">
  <tr>
    <th colspan="2"><h3>Translator attribution</h3></th>
  </tr>
  <tr>
    <td>Required</td>
    <td>Strongly encouraged</td>
  </tr>
  <tr>
    <td>Applies to</td>
    <td>All translated markdown pages</td>
  </tr>
  <tr>
    <td>Description</td>
    <td>
      Provides credit to the person who translated the article.
    </td>
  </tr>
  <tr>
    <td>Example</td>
    <td>
      <pre class="prettyprint html"><code>
Translated by:
&#123;% include "web/_shared/contributors/petelepage.html" %}
      </code></pre>
    </td>
  </tr>
  <tr>
    <td>Notes</td>
    <td>Translator attribution should go at the end of the page.</td>
  </tr>
</table>
