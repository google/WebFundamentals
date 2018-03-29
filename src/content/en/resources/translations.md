project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: "If you want to translate Web Fundamentals to other languages, anyone can contribute."

{# wf_updated_on: 2017-10-10 #}
{# wf_published_on: 2016-09-13 #}

# Translations {: .page-title }

<!--div class="attempt-right">
  <figure>
    <img src="/web/images/gitlocalize_image0.png">
  </figure>
</div-->
We are experimenting with a translation tool called
[GitLocalize](https://gitlocalize.com/). Follow the steps to get started with
your contribution:

1. Go to [GitLocalize's Web Fundamentals repository](https://gitlocalize.com/repo/107).
1. Sign up using your GitHub account.
1. Find the document you are going to translate.
1. Start translating.
1. When you are done, send the translation for reviews.
1. Reviewed translation will be sent as a Pull Request by language moderator in
the community.

To learn more about how GitLocalize works, visit
[their help page](https://docs.gitlocalize.com/).

If you find any issues or feature requests, please file them in
[GitLocalize's issue tracker](https://github.com/gitlocalize/feedback/issues).

To chat with other translation contributors, [register to the ChromiumDev
Slack](https://join.slack.com/t/chromiumdev/shared_invite/enQtMzM3NjYwNjI0MDM4LTk2NjEyYTIxODk1MDYxMmNjNWYzMGMxZGVhMDNhY2I1ZjBhMjdlYTg0MTg4ZGE0OTQ0ZmYwNTRiMGJlYzVjOTE) and join #l10n channel.

Note: It's important you find someone to review your translation. Try finding a
reviewer in the Slack's #l10n channel if [no one is assigned as a language
moderator yet](https://gitlocalize.com/repo/107/roles). If you are interested in
becoming a moderator, ping @agektmr in #l10n.

Our supported languages include: Arabic (AR), German (DE), Spanish (ES),
French (FR), Hebrew (HE), Bahasa Indonesia (ID), Italian (IT), Japanese (JA),
Korean (KO), Dutch (NL), Polish (PL), Portuguese (PT-BR), Russian (RU),
Turkish (TR), Chinese Traditional (ZH-TW) and Chinese Simplified (ZH-CN).

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

Also, make sure to append your credit to the bottom of the article. Because in
GitLocalize you can't add a new section, add your credit after multiple empty
lines in the existing last section like following screenshot:

![](/web/images/gitlocalize_image1.png)


## License

All of our content is Creative Commons 3.0.  Contributions and translations are
very much appreciated, however you must sign our
[Contributor License Agreement](https://github.com/google/WebFundamentals/blob/master/CONTRIBUTING.md)
for the code to be pulled back in to the repository.
