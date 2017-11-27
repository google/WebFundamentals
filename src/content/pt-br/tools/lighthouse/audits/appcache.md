project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentação de referência para a auditoria do Lighthouse "Site não usa cache de aplicativos".

{# wf_updated_on: 2017-01-04 #}
{# wf_published_on: 2017-01-04 #}

# Site não usa cache de aplicativos  {: .page-title }

## Por que a auditoria é importante {: #why }

O cache de aplicativos, também conhecido como AppCache, está [obsoleto][deprecated].

[deprecated]: https://html.spec.whatwg.org/multipage/browsers.html#offline

## Como ser aprovado na auditoria {: #how }

Em vez disso, considere usar o service worker [Cache API][API].

Para ajudar a migrar do AppCache para service workers, considere a
biblioteca [sw-appcache-behavior][sw-appcache-behavior]. Essa biblioteca gera uma
implementação baseada em service workers do comportamento definido em um manifesto do
AppCache.

Consulte a referência de auditoria [URL responde com 200 quando off-line](http-200-when-offline)
para obter mais recursos sobre o uso de service workers para permitir que um site trabalhe
off-line.

[API]: https://developer.mozilla.org/en-US/docs/Web/API/Cache

[sw-appcache-behavior]: https://github.com/GoogleChrome/sw-appcache-behavior

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

A auditoria será aprovada se nenhum manifesto do AppCache for detectado.


{# wf_devsite_translation #}
