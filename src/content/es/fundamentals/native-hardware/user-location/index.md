project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La mayoría de los navegadores y dispositivos tienen acceso a la ubicación geográfica de los usuarios. Aprenda a utilizar la ubicación del usuario en su sitio y sus aplicaciones.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Ubicación del usuario {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



La API (Interfaz de programación de aplicaciones) de geolocalización le permite averiguar dónde se encuentra el usuario, siempre con su consentimiento. Esta funcionalidad se puede utilizar como parte de las consultas del usuario; p. ej., para guiar a una persona hacia un punto de destino. También se puede utilizar para 'etiquetar geográficamente' contenido que creó el usuario; p. ej., para marcar dónde se tomó una fotografía.

La API de geolocalización también le permite ver dónde se encuentra el usuario y mantenerse informado a medida
que este se desplaza, siempre con su consentimiento (y solo cuando la página está abierta). Esto genera muchos casos de uso interesantes, como la integración con sistemas de respaldo para preparar un pedido para que lo retire el usuario si se encuentra cerca del lugar.

Debe estar al tanto de muchos aspectos al utilizar la API de geolocalización, y en esta guía, le presentaremos los casos de uso y las soluciones comunes.

