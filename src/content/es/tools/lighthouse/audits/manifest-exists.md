project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "El manifiesto existe".

{# wf_updated_on: 2016-09-20 #}
{# wf_published_on: 2016-09-20 #}

# El manifiesto existe  {: .page-title }

## Por qué es importante la auditoría {: #why }

El manifiesto de apps web es la tecnología web que te permite agregar tu app web
a la pantalla de inicio de un usuario. A esta función se la suele llamar "Add to
Homescreen (A2HS)".

## Cómo aprobar la auditoría {: #how }

Para obtener una guía práctica y paso a paso sobre la adición de compatibilidad con A2HS en una
app existente, consulta el siguiente codelab: [Agregar tu app web a la pantalla de
inicio de un usuario](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

Para obtener una guía menos estructurada que analiza más detalladamente los manifiestos de apps
web, consulta [Mejorar la experiencia del usuario con el manifiesto de apps
web](/web/fundamentals/engage-and-retain/web-app-manifest).

Aplica lo que aprendiste en estas guías para agregar compatibilidad con A2HS a tu
app web.

Puedes emular y probar los eventos A2HS en Chrome DevTools. Consulta la siguiente
sección para obtener más ayuda: [Manifiesto de
apps web](/web/tools/chrome-devtools/debug/progressive-web-apps/#manifest).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Lighthouse obtiene el manifiesto y verifica que tenga datos. El manifiesto que
Lighthouse obtiene no es el que Chrome usa en la página, lo que puede dar
resultados imprecisos.


{# wf_devsite_translation #}
