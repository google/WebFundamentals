project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2017-12-21 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Fixing the gibberish hack {: .page-title }

Note: Unsure whether or not your site is hacked? Start by reading our
[how to check if your site is hacked](how_do_I_know_if_site_hacked) guide.

This guide is created specifically for a type of hack that adds
keyword-heavy gibberish pages to your site which we’ll refer to as the
gibberish hack. It’s designed for users of popular
[Content Management Systems (CMSs)](https://en.wikipedia.org/wiki/Web_content_management_system#Notable_web_CMS),
but you’ll find this guide useful even if you don’t use a CMS.

We want to make sure this guide is really helpful to you. Please
[leave feedback](https://docs.google.com/a/google.com/forms/d/12iF45BaZuEgwn29A7DOW73rd1Hi_7NiAHCFWB3zMu0U/viewform)
to help us improve!

## Identifying this type of hack {: #identifying }

The gibberish hack automatically creates many pages with non-sensical
sentences filled with keywords on your site. These are pages that you
didn't create, but have URLs that might be compelling for users to click.
Hackers do this so the hacked pages show up in Google Search. Then, if
people try to visit these pages, they’ll be redirected to an unrelated
page, like a porn site. Hackers make money when people visit these
unrelated pages. Here are some examples of the type of files you might
see on a site affected by the gibberish hack:

* www.example.com/cheap-hair-styles-cool.html
* www.example.com/free-pictures-fun.html
* www.example.com/nice-song-download-file.php

Sometimes they appear in a folder composed of random characters and
use different languages:

* www.example.com/jfwoea/cheap-hair-styles-cool.html
* www.example.com/jfwoea/free-pictures-fun.html
* www.example.com/jfwoea/www-ki-motn-dudh-photo.php
* www.example.com/jfwoea/foto-cewe-zaman-sekarang.php

<img src="images/GibberishKeywordHackExampleSearch.png" class="attempt-right">

<<_fixing-identify.md>>


## Fixing the hack {: #fixing }

<<_fixing-fixing-intro.md>>

### Check your `.htaccess` file (2 steps)

The gibberish hack redirects visitors from your site using the `.htaccess` file.

#### Step 1

<<_fixing-htaccess-locate.md>>

#### Step 2

<<_fixing-htaccess-replace.md>>

### Finding and removing other malicious files (5 steps)

<<_fixing-find-remove-intro.md>>

#### Step 1

<<_fixing-reinstall-cms.md>>

#### Step 2

Now you need to look for any other malicious or compromised files left.
This is the most difficult and time-consuming part of the process,
but after this you’re almost done!

This hack typically leaves two types of files: `.txt` files and .php
files. The `.txt` files serve are template files, and the `.php` files
determine what type of non-sensical content to load onto your site.
Start by looking for the `.txt` files. Depending on how you’re connecting
to your site, you should see some type of search functionality for files
Search for ".txt" to pull up all the files with a `.txt` extension. Most
of these will be legitimate files of text like license agreements,
readme files, and so on. You’re looking for a particular set of `.txt`
files that contain HTML code used to create spammy templates. Below are
snippets of different pieces of code that you might find in these
malicious `.txt` files.

Hackers use keyword replacement to create the spammy pages. You’ll most
likely see some type of generic word that can be replaced throughout
the hacked file.

    <title>{keyword}</title>
    <meta name="description" content="{keyword}" />
    <meta name="keywords" content="{keyword}" />
    <meta property="og:title" content="{keyword}" />


Additionally, most of these files contain some type of code that positions
spammy links and spammy text off the visible page.

    <div style="position: absolute; top: -1000px; left: -1000px;">
      Cheap prescription drugs
    </div>


Remove these `.txt` files. If they’re all in the same folder you can remove
the entire folder.

#### Step 3

The malicious PHP files are a bit harder to track down. There could
be one or many malicious PHP files on your site. They could all be
contained in the same subdirectory or scattered around your site.

Don’t get overwhelmed by thinking that you need to open and look
through every PHP file. Start by creating a list of suspicious PHP
files that you want to investigate. Here are a few ways to determine
which PHP files are suspicious:

* Since you’ve already reloaded your CMS files, look only at files that
  are not part of your default CMS files or folders. This should eliminate
  a large number of PHP files and leave you with a handful of files to look at.
* Sort the files on your site by last modified date. Look for files that
  were modified within a few months of the time that you first discovered
  your site was hacked.
* Sort the files on your site by size. Look for any unusually large files.

#### Step 4

<<_fixing-scan-files-intro.md>>

First, scan through the suspicious files you’ve already identified to
look for large blocks of text with a combination of seemingly jumbled
letters and numbers. The large block of text is usually preceded by a
combination of PHP functions like `base64_decode`, `rot13`, `eval`,
`strrev`, `gzinflate`. Here is an example of what the block of code might
look like. Sometimes all this code will be stuffed into one long line
of text, making it look smaller than it actually is.

    // Hackers try to confuse webmasters by encoding malicious code into
    // blocks of texts. Be wary of unfamiliar code blocks like this.

    base64_decode(strrev("hMXZpRXaslmYhJXZuxWd2BSZ0l2cgknbhByZul2czVmckRWYgknYgM3ajFGd0FGIlJXd0Vn
    ZgknbhBSbvJnZgUGdpNHIyV3b5BSZyV3YlNHIvRHI0V2Zy9mZgQ3Ju9GRg4SZ0l2cgIXdvlHI4lmZg4WYjBSdvlHIsU2c
    hVmcnBydvJGblBiZvBCdpJGIhBCZuFGIl1Wa0BCa0l2dgQXdCBiLkJXYoBSZiBibhNGIlR2bjBycphGdgcmbpRXYjNXdmJ2b
    lRGI5xWZ0Fmb1RncvZmbVBiLn5WauVGcwFGagM3J0FGa3BCZuFGdzJXZk5Wdg8GdgU3b5BicvZGI0xWdjlmZmlGZgQXagU2ah
    1GIvRHIzlGa0BSZrlGbgUGZvNGIlRWaoByb0BSZrlGbgMnclt2YhhEIuUGZvNGIlxmYhRWYlJnb1BychByZulGZhJXZ1F3ch
    1GIlR2bjBCZlRXYjNXdmJ2bgMXdvl2YpxWYtBiZvBSZjVWawBSYgMXagMXaoRFIskGS"));


Sometimes the code isn’t jumbled and just looks like normal script. If you’re
not certain whether or not the code is bad, stop by our
[Webmaster Help Forums](https://productforums.google.com/forum/#!forum/webmasters)
where a group of experienced webmasters can help you look over the files.

#### Step 5

Now that you know which files are suspicious, create a backup or a local
copy by saving them onto your computer just in case it wasn’t malicious,
and delete the suspicious files.

<<_fixing-check-if-site-is-clean.md>>

<<_fixing-prevent.md>>

<<_fixing-additional-resources.md>>

