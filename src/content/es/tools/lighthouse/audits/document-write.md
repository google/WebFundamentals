project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El sitio no usa document.write()".

{# wf_updated_on: 2016-12-01 #}
{# wf_published_on: 2016-12-01 #}

# El sitio no usa document.write() {: .page-title }

## Por qué es importante la auditoría {: #why }

Para los usuarios con conexiones lentas como 2G, 3G o Wi-Fi lento, las secuencias de comandos
externas inyectadas dinámicamente a través de `document.write()` pueden demorar la exhibición del
contenido de la página principal en decenas de segundos.

Para más información, consulta [Intervenir contra `document.write()`][blog].

[blog]: /web/updates/2016/08/removing-document-write

## Cómo aprobar la auditoría {: #how }

En tu informe, Lighthouse enumera cada llamada a `document.write()`.
Revisa esta lista y observa todas las llamadas que inyectan una secuencia de comandos de forma dinámica.
Si la secuencia de comandos cumple con los criterios establecidos en la introducción de
[Intervenir contra `document.write()`][blog], Chrome no ejecutará la
secuencia de comandos inyectada. Estas son las llamadas a `document.write()` que deseas
cambiar. Consulta [¿Cómo lo soluciono?][fix] para conocer las posibles soluciones. 

[fix]: /web/updates/2016/08/removing-document-write#how_do_i_fix_this

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse informa cada instancia de `document.write()` que se encuentra.
Ten en cuenta que la intervención de Chrome contra `document.write()` solo se aplica a
secuencias de comandos inyectadas dinámicamente y que bloquean la representación. Se pueden aceptar otros usos de `document.write()`.



{# wf_devsite_translation #}
