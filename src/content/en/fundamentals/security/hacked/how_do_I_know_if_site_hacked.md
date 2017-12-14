project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-12-21 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# How do I know if my site is hacked? {: .page-title }

Follow these steps if:

*   You’ve been alerted by Google that your site is hacked
*   You see a warning in search that your site is hacked or compromised
*   You’re not sure if your site is actually hacked

If you’re unsure if your site is actually hacked, or if you think your site
was incorrectly flagged, start by registering your site in
[Search Console](https://www.google.com/webmasters/tools/home). Go to the
[Manual Actions](https://www.google.com/webmasters/tools/manual-action) or the
[Security Issues](https://www.google.com/webmasters/tools/security-issues)
sections of Search Console and look for example URLs where Google detected
that your site has been hacked.

If you’re unable to see hacked content on the URLs provided in Search Console,
the hacked content might be using a technique known as
[cloaking](//support.google.com/webmasters/answer/66355). Cloaking makes
cleaning a site more difficult by showing different content to different
types of users. For example, when you go to a page on your site like
www.example.com/cheap-drugs, you might see a page without any content.
This might lead you to believe that the hacked content on your site
doesn’t exist. However, when a search engine like Google accesses
www.example.com/cheap-drugs, it will see spammy words and links.

To check for cloaking, use the
[Hacked Sites Troubleshooter](https://support.google.com/webmasters/troubleshooter/6155978).
The troubleshooter will walk you through a few tools like the `site:`
search operator and
[Fetch as Google](https://www.google.com/webmasters/tools/googlebot-fetch)
that can help you uncover any cloaked hacked content.

After you’ve double checked your pages, if you still think think your site
was incorrectly flagged, please post in the
[Webmaster Help Forums](https://productforums.google.com/forum/#!forum/webmasters).
Otherwise, start building your [support team](support_team).
