{# wf_md_include #}

<p><span class="compare-better">When to use generateSW</span></p>

- You want to precache files.
- You have simple runtime configuration needs (e.g. the configuration allows
  you to define routes and strategies).

<p><span class="compare-worse">When NOT to use generateSW</span></p>

- You want to use other Service Worker features (i.e. Web Push).
- You want to import additional scripts or add additional logic.
