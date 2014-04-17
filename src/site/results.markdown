---
layout: default
title: Home
class: home
---

{% wrap content%}

# Search Results
{% comment %}

<!-- Removing this until I get approval for JS on the site -->

<script>
 (function() {
   var cx = '011588373892979326516:ouhmnwdeclc';
   var gcse = document.createElement('script');
   gcse.type = 'text/javascript';
   gcse.async = true;
   gcse.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') +
       '//www.google.com/cse/cse.js?cx=' + cx;
   var s = document.getElementsByTagName('script')[0];
   s.parentNode.insertBefore(gcse, s);
 })();
 </script>

<gcse:search enableHistory="true" autoCompleteMaxCompletions="5" autoCompleteMatchType="any"></gcse:search>

{% endcomment %}

{% endwrap %}
