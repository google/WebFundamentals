---
layout: shared/narrow
title: "YAML Front Matter"
description: "This is a list of valid YAML front matter (The text at the top of each markdown file)."
order: 6
---
# Valid Front Matter

This doc will outline the valid data you can use at the top of your markdown
files.

**Please help maintain this and correct issues / add missing fields as you
spot them.**

{% include shared/toc.liquid %}

## Valid YAML Attributes

### layout

The layout is used by Jekyll to determine the file to use as the layout for the
current page.

    layout: shared/narrow-subdirectories-list

The layout files have to live in the `_layouts` directory.

    src/jekyll/_layouts

### title

The title of the page is used in a few places.

1. It may be used by other pages linking to this doc as a way to explain to the
user what is going to be in the link. /web/styleguide/ displays the `title` and
`description` meta data in a list for each section.
2. You can also use it inside the page itself, but this isn't common and
isn't common

    title: "Development Phases"

### description

The description of the page is used in a few places.

1. It's used in the head of the HTML. I.e. it will be used to describe the page
in Google Search Results.
2. It may be used by other pages linking to this doc as a way to explain to the
user what is going to be in the link. /web/styleguide/ displays the `title` and
`description` meta data in a list for each section.
3. You can also use it inside the page itself if you wish, but don't feel
that you **have** to

    description: "Every developer will go through various phases during the
      development of a project. Web Starter Kit makes you more productive and
      simplifies a range of tasks for each phase."

**NOTE:** Do not insert line breaks as this breaks some YAML parsers, leave as
a single line.

### translation_priority

The translation priority is a number a represents how important the document
is to get translated.

**0** is highest priority. **>= 1** is less vital

    translation_priority: 0

### published_on

The date that the content was originally published.

    published_on: 2015-07-21

### updated_on

This is the date of the last time the post was updated. This is useful
for tracking whether a translation is up-to-date with the English doc.

    updated_on: 2015-07-21

### authors

Authors is the list of people who wrote the content / edited.

    authors:
      - mattgaunt

**NOTE:** Please ensure the authors details are added to the
`contributors.yaml` file.

    src/content/_contributors.yaml

### translators

Translators defines the list of authors who have translated the original English
markdown file.

    translators:
      - mattgaunt

**NOTE:** Please ensure the translator details are added to the
`contributors.yaml` file.

    src/content/_contributors.yaml

### published

This has to be a boolean.

If it's set to false, you'll be able to view the page on the server, but it
want be linked to or included in any of the feeds.

    published: false

**NOTE:** If no published value is provided, it is assumed to be true.

### tags

Used in Updates **ONLY**.

This is used to create a list of tags relevant to the article.

Tags should be lower case, must not contain spaces and cannot include the
reserved word *index*.

    tags:
      - audio
      - codec
      - MediaSourceExtensions
      - MSE

### permalink

Permalink can be used anywhere on Web Fundamentals, but it's primarily used
in updates to define the URL of a blog post.

    permalink: /updates/2015/06/mse-gapless-audio.html

**AVOID** if at all possible.

### key-takeaways, notes, related-guides (optional)

Used in Web Fundamentals for generating
[key takeaways](/web/styleguide/useful-and-common-tags#takeaways), notes
(similar to take aways) and
[related guides](/web/styleguide/useful-and-common-tags#related-guides)
sections.

### order

Some sections are written with a particular reading order in mind. This
variable is used to determine the order of pages in the nextPage and
previousPage.

It's also used to order the navigation drawer items. This is based on the
order variables in the index pages of sections.

    order: 1

### youtubeid

Used for shows to indicate the YouTube video the show refers to.

### comments

Used to provide comments within the file that may be helpful to future editors,
translators, etc.

    comments:
      # blah, blah blah
      # more blah
      # even more blah!

### html_head_social_img

This tag allows you to define the social image which is referenced in the
head of the document.

## Renamed YAML Attributes

Some YAML attributes have been renamed for consistency, please use the new ones
instead.

* `priority` use `translation_priority` instead
* `remember` use `notes` instead
* `related` use `related-guides` instead

## Translated Pages

Translated pages only require a small subset of the typical yaml frontmatter
as they'll inherit the rest from the English source.

* `title`
* `description`
* `updated_on`
* `translators`
* `key-takeaways`
* `notes`

## Deprecated YAML Attributes

Do not use the following attributes, they no longer provide any functionality
and clutter up the YAML.

* `id`
* `collection`
* `article`
* `date`
* `introduction`
* `snippet`

# How to Add Front Matter

The original version of Web Fundamentals had an issue of YAML that did nothing
so in an attempt to prevent this from happening again a list has been defined
of valid data.

To add new front matter, you need to add it to this list.

Go to `src/jekyll/_plugins/wf/WFPage.rb` and look for the `validKeys` variable
which is an array of keys.

Just add your desired YAML key to this array and you should fix any issues.

Then add a section to this page @
`src/content/styleguide/yaml-front-matter.markdown` :)
