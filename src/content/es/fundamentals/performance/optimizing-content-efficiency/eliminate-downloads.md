project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Deberías auditar tus recursos periódicamente, para garantizar que cada recurso ayude a proporcionar una mejor experiencia del usuario.

{# wf_updated_on: 2016-08-29 #}
{# wf_published_on: 2014-03-31 #}

# Eliminación de descargas innecesarias {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}

### TL;DR {: .hide-from-toc }
* Haz un inventario de tus propios recursos y los de terceros en tus páginas.
* Mide el rendimiento de cada recurso: su valor y su rendimiento técnico.
* Determina si los recursos proporcionan suficiente valor.

Los recursos más rápidos y más optimizados son aquellos que no se envían. Debes eliminar los recursos innecesarios en tu app. Te recomendamos que cuestionar y volver a visitar periódicamente las suposiciones implícitas y explícitas con tu equipo. He aquí algunos ejemplos:

* Siempre incluiste el recurso X en tus páginas; pero, ¿el valor que ofrece al usuario compensa el costo de su descarga y visualización? ¿Puedes calcular y probar su valor?
* ¿El recurso (en especial si es de terceros) proporciona un rendimiento uniforme? ¿Se encuentra, o debe encontrarse, este en la ruta de acceso crítica? Si el recurso se encuentra en la ruta de acceso crítica, ¿podría ser un único punto de error para el sitio? Es decir, si el recurso no está disponible, ¿afectará el rendimiento y la experiencia del usuario en tus páginas?
* ¿Tiene o necesita este recurso un SLA? ¿Sigue este recurso las prácticas recomendadas de rendimiento (compresión, almacenamiento en caché, etc.)?

Con frecuencia, las páginas contienen recursos que son innecesarios, o lo que es peor, afectan al rendimiento de la página sin brindar demasiado valor al visitante o al sitio en el que se alojan. Esto se aplica de la misma manera para recursos y widgets propios y de terceros:

* Para el sitio A se decidió mostrar un carrusel de fotos en la página principal a fin de permitir que el visitante obtenga una vista previa de varias fotos con un clic rápido. Todas las fotos se cargan cuando se carga la página y el usuario pasa las fotos.
    * ** Pregunta:** ¿mediste la cantidad de usuarios que visualizan varias fotos en el carrusel? Podrías generar una gran sobrecarga al descargar recursos que la mayoría de los visitantes nunca ven.
* Para el sitio B se decidió instalar un widget de terceros a fin de mostrar contenido relacionado, mejorar la participación social o proporcionar algún otro servicio.
    * **Pregunta:**¿realizaste un seguimiento de la cantidad de visitantes que usan el widget o hacen clic en el contenido proporcionado por este? ¿El atractivo generado por este widget es suficiente como para justificar su sobrecarga?

Determinar si se eliminan las descargas innecesarias por lo general requiere de mucho tiempo de análisis cuidadoso y mediciones. Para obtener mejores resultados, realiza un inventario y repasa periódicamente estas preguntas correspondientes a cada recurso en tus páginas.


{# wf_devsite_translation #}
