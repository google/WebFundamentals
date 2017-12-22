{# wf_md_include #}

Look for any other malicious or compromised files left. You might have
already removed all malicious files in the previous two steps, but it’s
best to work through these next few steps in case there are more files
on your site that have been compromised.

Don’t get overwhelmed by thinking that you need to open and look
through every PHP file. Start by creating a list of suspicious PHP
files that you want to investigate. Here are a few ways to determine
which PHP files are suspicious:

* If you’ve already reloaded your CMS files, look only at files that are
  not part of your default CMS files or folders. This should rule out a
  large number of PHP files and leave you with a handful of files to look at.
* Sort the files on your site by the date they were last modified. Look for
  files that were modified within a few months of the time that you first
  discovered your site was hacked.
* Sort the files on your site by size. Look for any unusually large files.

Note: Attackers commonly inject scripts into the following files:
`index.php`, `wp-load.php`, `404.php`, and `view.php`.
