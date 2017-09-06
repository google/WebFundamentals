project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Documentación de referencia de la auditoría de Lighthouse sobre “La página no solicita automáticamente la ubicación geográfica cuando se carga”.

{# wf_updated_on: 2016-11-30 #}
{# wf_published_on: 2016-11-30 #}

# La página no solicita automáticamente la ubicación geográfica cuando se carga  {: .page-title }

## Por qué es importante la auditoría {: #why }

Los usuarios desconfían de páginas que les solicitan su
ubicación cuando se carga la página, o se desconciertan cuando lo hacen. En lugar de solicitar automáticamente la ubicación
del usuario cuando se carga la página, vincula la solicitud a un gesto del usuario, como a un botón
“Buscar tiendas cercanas”. Asegúrate de que el gesto expresa, de forma clara y
explícita, que necesita la ubicación del usuario.

## Cómo aprobar la auditoría {: #how }

Mediante distintas **URL**, Lighthouse informa el número de línea y columna donde tu
código solicita la ubicación del usuario. Quita estas llamadas y vincula
las solicitudes a gestos del usuario. 

Consulta [Pedir permiso de modo responsable][ask] para conocer una lista de las prácticas recomendadas
cuando necesites solicitar la ubicación del usuario.

[ask]: /web/fundamentals/native-hardware/user-location/#ask_permission_responsibly

{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

Si la página ya obtuvo permisos de ubicación geográfica antes de la auditoría de
Lighthouse, la herramienta no puede determinar si la página solicita la ubicación del usuario
cuando se carga la página. Restablece los permisos y ejecuta Lighthouse de nuevo. Consulta
[Cambiar permisos del sitio web][help] para recibir ayuda.

Lighthouse recolecta el código JavaScript que se ejecutó al cargar la página. Si este
código llama a `geolocation.getCurrentPosition()` o
`geolocation.watchPosition()`, y el permiso de ubicación geográfica todavía no se
había otorgado, significa que se solicitó la ubicación del usuario.

[help]: https://support.google.com/chrome/answer/6148059


{# wf_devsite_translation #}
