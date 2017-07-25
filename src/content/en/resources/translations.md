project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: "If you want to translate Web Fundamentals to other languages, anyone can contribute."

{# wf_updated_on: 2017-07-25 #}
{# wf_published_on: 2016-09-13 #}

# Translations {: .page-title }

All article sources are in `src/content`. The base content is in English
under the `en` directory. Add translations by following the same structure
with either a two letter or composite language code: e.g. `es`, `pt-br`.

Our supported languages include: Arabic (AR), German (DE), Spanish (ES),
French (FR), Hebrew (HE), Bahasa Indonesia (ID), Italian (IT), Japanese (JA),
Korean (KO), Dutch (NL), Polish (PL), Portuguese (PT-BR), Russian (RU),
Turkish (TR), Chinese Traditional (ZH-TW) and Chinese Simplified (ZH-CN).


## Adding a translation

1.  Find the article in the original source language
1.  Create the root language code in `src/content` if it does not exist for the
    language you are translating.  For example create `src/content/es` for
    Spanish.
1.  Create the article in the same directory hierarchy but under this new
    directory.
1.  Translate the article
1.  Give yourself credit by adding your details to the contributors file
    (`src/data/_contributors.yaml`)
1.  Add your name as described below with `- translator` property.


## License

All of our content is Creative Commons 3.0.  Contributions and translations are
very much appreciated, however you must sign our
[Contributor License Agreement](https://github.com/google/WebFundamentals/blob/master/CONTRIBUTING.md)
for the code to be pulled back in to the repository.

## Credit

We want to make sure that you get the credit for the articles that you
translate.

Add your details to `src/data/_contributors.yaml` and add `- translator` to
the `role` attribute.  We use this information to populate our
[contributors page](/web/resources/contributors) and also to attach your name
to each article.  For example:

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



