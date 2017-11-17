project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "Caché contiene start_url del manifiesto".

{# wf_updated_on: 2016-09-15 #}
{# wf_published_on: 2016-09-15 #}

# Caché contiene start_url del manifiesto  {: .page-title }

## Por qué es importante la auditoría {: #why }

Asegura que una app web progresiva se inicie de manera adecuada desde la pantalla de inicio del
dispositivo móvil mientras está sin conexión.

## Cómo aprobar la auditoría {: #how }

1. Define una propiedad `start_url` en tu archivo `manifest.json` .
2. Asegúrate de que tu service worker almacene adecuadamente en caché un recurso que coincida con
   el valor de `start_url`.

Para conocer los conceptos básicos sobre agregar apps a las pantallas de inicio,
consulta [Agrega tu app web a la pantalla de inicio de un
usuario](https://codelabs.developers.google.com/codelabs/add-to-home-screen).
Se trata de un codelab práctico paso a paso en el cual agregas la funcionalidad "add to
homescreen" en una app existente. Aplica lo que aprendiste en
este codelab para integrar la funcionalidad "add to homescreen" en tu propia app.

Para obtener más ayuda sobre cómo almacenar en caché a archivos con service workers para uso sin conexión,
consulta la sección "Cómo aprobar la auditoría" del siguiente documento de Lighthouse:
[La URL responde con 200 cuando está sin conexión](http-200-when-offline#how)

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Cuando una app web progresiva se inicia desde la pantalla de inicio de un dispositivo
móvil, la app se abre en una URL específica. La URL se define en el archivo
`manifest.json` de la app como la propiedad `start_url` .

Esta auditoría analiza el valor de `start_url` desde `manifest.json` y luego
asegura que un recurso coincidente se almacene en la caché del service worker.

**Si tu service worker redirecciona las solicitudes** `start_url` **, esta auditoría
puede producir resultados incorrectos**.

Una deficiencia de esta auditoría es que inspecciona directamente el contenido almacenado en caché
, en lugar de pedir al service worker que resuelva la solicitud `start_url`
. Esto puede producir un resultado falso negativo si tu caché carece de
un recurso que coincida con el valor exacto de `start_url`, pese a que en
escenarios reales la solicitud se resuelve de manera exitosa debido a que el service
worker redirecciona a otro recurso en la caché. Por el contrario, la auditoría puede
producir un resultado falso positivo si tu caché contiene un recurso que
coincide con `start_url`, pero tu service worker redirecciona la solicitud a
un recurso inexistente.


{# wf_devsite_translation #}
