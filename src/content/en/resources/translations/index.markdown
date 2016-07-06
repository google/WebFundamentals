---
layout: shared/narrow
title: "Translations"
description: "If you want to translate Web Fundamentals to other languages, anyone can contribute."
published_on: 2016-07-05
updated_on: 2016-07-05
order: 1
---

# Translations

All article sources are in `src/content`. The base content is in English under the `en` directory. Add translations by following the same structure with either a two letter or composite language code: e.g. `es`, `pt-br`.

Update the build to include the language code in the `langs_available` variable in `config/common.yml`. For example, to add French:
{% highlight yaml %}
    langs_available: ["fr"]
{% endhighlight %}

## Adding a translation

1.  Find the article in the original source language
2.  Create the root language code in `src/content` if it does not exist for the language you
    are translating.  For example create `src/content/es` for Spanish.
3.  Create the article in the same directory hierarchy but under this new directory.
4.  Translate the article
5.  Translate the article YAML metadata
	1.  Localize the title
	2.  Localize the description
	3.  Localize the introduction
	4.  Localize the notes (if present)
	5.  Localize the key-takeaways (the TLDR's if present).
6.  Give yourself some credit by adding your details to the contributors file and add your
    name to the `translators:` property.


## Licence

All of our content is Creative Commons 3.0.  Contributions and translations are very much appreciated, however you must sign our [Contributor License Agreement](https://github.com/google/WebFundamentals/blob/master/CONTRIBUTING.md) for the code to be pulled back in to the repository.

## Credit

We want to make sure that you get the credit for the articles that you translate.

Add your details to `/src/content/_contributors.yaml` and add `- translator` to the `role` attriute.  We use this information to populate our [contributors page](/web/resources/contributors) and also to attach your name to each article.  For example:

{% highlight yaml %}
paulkinlan:
  name:
    given: Paul
    family: Kinlan
  org:
    name: Google
      unit: Developer Relations
  country: UK
    role:
    - author
    - engineer
    - translator
  homepage: http://paul.kinlan.me
  google: +PaulKinlan
  twitter: paul_kinlan
  email: paulkinlan@google.com
  description:
    en: "Paul is a Developer Advocate"
{% endhighlight %}

For each article that you translate add your id to `translators:` property.  For example

{% highlight yaml %}
  translators:
    - paulkinlan
    - petelepage
{% endhighlight %}
