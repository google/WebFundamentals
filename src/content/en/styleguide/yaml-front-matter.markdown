---
layout: shared/plain
title: "YAML Front Matter"
description: "This is a list of valid YAML front matter (The text at the top
  of each markdown file)."
order: 5
---
# Valid Front Matter

This doc will outline the valid data you can use at the top of your markdown
files.

**Please help maintain this and correct issues / add missing fields as you
spot them.**

## 'date'

This is *Unknown*

## 'layout' (required)

The layout is used by Jekyll to determine the file to use as the layout for the
current page.

    layout: fundamentals/list-subdirectories

The layout files have to live in the `_layouts` directory.

    src/jekyll/_layouts

## 'title' (required)

The title of the page is used in a few places.

1. It may be used by other pages linking to this doc as a way to explain to the
user what is going to be in the link. /web/styleguide/ displays the `title` and
`description` meta data in a list for each section.
2. You can also use it inside the page itself, but this isn't common and
isn't common

    title: "Development Phases"

## 'description' (optional)

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

## 'translation_priority' (optional)

The translation priority is a number a represents how important the document
is to get translated.

**0** is highest priority. **>= 1** is less vital

    translation_priority: 0

## 'written_on' (required)

Written on is the original date the document was written.

    written_on: 2015-07-21

## 'updated_on' (required)

This is the date of the last time the post was updated. This is useful
for tracking whether a translation is up-to-date with the English doc.


    updated_on: 2015-07-21

## 'authors' (required)

Authors is the list of people who wrote the content / edited.

    authors:
      - mattgaunt

If you can, please ensure the authors details are added to the
_contributors.yaml file.

    src/content/_contributors.yaml

## 'translators' (optional)

Translators defines the list of authors who have translated the original English
markdown file.

    translators:
      - mattgaunt

If you can, please ensure the translators details are added to the
_contributors.yaml file.

    src/content/_contributors.yaml

## 'published' (optional)

This has to be a boolean.

If it's set to false, you'll be able to view the page on the server, but it
want be linked to or included in any of the feeds.

    published: true

## 'tags' (see below)

Used in Updates **ONLY**.

This is used to create a list of tags relevant to the article.

    tags:
      - audio
      - codec
      - MediaSourceExtensions
      - MSE

## 'permalink'

Permalink can be used anywhere on Web Fundamentals, but it's primarily used
in updates to define the URL of a blog post.

    permalink: /updates/2015/06/mse-gapless-audio.html

## 'introduction'

This is *Unknown*

## 'key-takeaways', 'notes', 'related-guides' (optional)

Used in Web Fundamentals for generating 
[key takeaways](/web/styleguide/useful-and-common-tags#takeaways), notes 
(similar to take aways) and 
[related guides](/web/styleguide/useful-and-common-tags#related-guides)
sections.

## 'pageNav' (optional)

**NOTE:** This may change!

Some sections are written with a particular reading order in mind. If this 
is the case you may want to reference the next and previous page which you can 
do with the `pageNav` variable.

    pageNav:
      previous:
        title: "the article before this"
        href: /path/to/file/you/previous
      next:
        title: "the article after this"
        href: /path/to/file/you/next

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
