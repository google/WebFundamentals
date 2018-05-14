project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "Tiene un service worker registrado".

{# wf_updated_on: 2016-07-25 #}
{# wf_published_on: 2016-07-25 #}

# Tiene un service worker registrado {: .page-title }

## Por qué es importante la auditoría {: #why }

Registrar un service worker es el primer paso para habilitar las siguientes
funciones de la app web progresiva:

* Sin conexión
* Notificaciones push
* Add to homescreen

## Cómo aprobar la auditoría {: #how }

Registrar un service worker requiere solo unas pocas líneas de código, pero el único
motivo por el que usarías un service worker sería para implementar una de las funciones de app web progresiva
mencionadas más arriba. Para implementar estas funciones, se necesita más
trabajo.

Para obtener más ayuda sobre cómo almacenar en caché archivos para uso sin conexión, consulta la sección "Cómo aprobar
la auditoría" del siguiente documento de Lighthouse: [La URL responde con un 200 cuando está
sin conexión](http-200-when-offline#how).

Para habilitar las notificaciones push o "add to homescreen", completa los
siguientes instructivos paso a paso y luego usa lo que aprendiste para implementar
las funciones en tu propia app:

* [Habilitar las notificaciones push para tu app
  web](https://codelabs.developers.google.com/codelabs/push-notifications).
* [Agrega tu app web a la pantalla de inicio
  de un usuario](https://codelabs.developers.google.com/codelabs/add-to-home-screen).

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Verifica si el Depurador de Chrome devuelve una versión del service worker.


{# wf_devsite_translation #}
