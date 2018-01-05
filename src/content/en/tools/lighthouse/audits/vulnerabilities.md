project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Reference documentation for the "Includes Front-End JavaScript Libraries With Known Security Vulnerabilities" Lighthouse audit.

{# wf_updated_on: 2017-12-21 #}
{# wf_published_on: 2017-12-21 #}
{# wf_blink_components: N/A #}

# Includes Front-End JavaScript Libraries With Known Security Vulnerabilities  {: .page-title }

## Overview {: #overview }

Intruders have automated web crawlers that can scan your site for known security vulnerabilities.
When the web crawler detects a vulnerability, it alerts the intruder. From there, the intruder
just needs to figure out how to exploit the vulnerability on your site.

## Recommendations {: #recommendations }

Stop using each of the libraries that Lighthouse flags. If the library has released a
newer version that fixes the vulnerability, upgrade to that version, or consider using a
different library.

See [Snyk's Vulnerability DB][DB]{:.external} to learn more about each library's vulnerability.

## More information {: #more-info }

To detect vulnerable libraries, Lighthouse:

* Runs [Library Detector For Chrome][detector]{:.external}.
* Checks the list of detected libraries against [Snyk's Vulnerability DB][DB]{:.external}.

[detector]: https://www.npmjs.com/package/js-library-detector
[DB]: https://snyk.io/vuln?packageManager=all

An intruder can scan your entire site using the process above and a web crawler.

[Audit source][src]{:.external}

[src]: https://github.com/GoogleChrome/lighthouse/blob/master/lighthouse-core/audits/dobetterweb/no-vulnerable-libraries.js
