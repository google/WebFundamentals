project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia para la auditoría de Lighthouse "La página no solicita automáticamente los permisos de notificación cuando se carga".

{# wf_updated_on: 2016-12-05 #}
{# wf_published_on: 2016-12-05 #}

# La página no solicita automáticamente los permisos de notificación cuando se carga  {: .page-title }

## Por qué es importante la auditoría {: #why }

Según se explicó en [¿Qué aspectos componen una buena notificación?][good], las notificaciones adecuadas son
oportunas, relevantes y precisas. Si tu página solicita permiso para enviar
notificaciones cuando se carga, estas notificaciones pueden no ser relevantes para los
usuarios ni precisas para sus necesidades. Para proporcionar una mejor experiencia de usuario, ofrece enviar a
los usuarios un tipo específico de notificación y presenta las solicitudes de permisos
después de que acepten la notificación.

[good]: /web/fundamentals/push-notifications/

## Cómo aprobar la auditoría {: #how }

En **URLs**, Lighthouse informa los números de línea y columna donde
el código solicita permiso para enviar notificaciones. Quita estas llamadas
y, en cambio, vincula las solicitudes con los gestos del usuario.

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Si los permisos de notificación de una página fueron aceptados o rechazados antes de la
auditoría de Lighthouse, Lighthouse no puede determinar si la página solicita
permisos de notificación al cargarse. Restablece los permisos y ejecuta
Lighthouse de nuevo. Consulta [Cambiar los permisos del sitio web][help] para obtener más información.

Lighthouse recolecta el código JavaScript que se ejecutó al cargar la página. Si este
código contiene llamadas a `notification.requestPermission()` y todavía no se otorgó el
permiso de notificación, esto significa que se solicitó permiso de notificación.

[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
