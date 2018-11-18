project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Solicitar una revisión {: .page-title }

Debes solicitar una revisión de Google para que tu página o sitio ya no se señale como
peligroso o posiblemente engañoso para los usuarios.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Necesitarás

*   Conocimientos sobre comandos shell/de terminal

## Lo que harás

### 1. Requisitos previos

Antes de solicitar una revisión, confirma que hayas realizado los siguientes pasos:

* Verificar la propiedad de tu sitio en Search Console
* Limpiar tu sitio de hechos de vandalismo de hackers 
* Corregir la vulnerabilidad
* Volver a activar tu sitio limpio en línea

### 2. Comprobar que tus páginas estén disponibles y limpias

A fin de preservar la seguridad, usa Wget o cURL para ver páginas en tu sitio, como tu
página de inicio y una URL modificada por el hacker; a esta altura tendrían que estar limpias. Si así fuera,
y estás seguro de que ocurre lo mismo con el resto de las páginas de tu sitio,
es hora de solicitar una revisión.

Nota: Tus páginas deben estar disponibles para que Googlebot pueda rastrearlas, a fin de garantizar que
estén limpias. Asegúrate de que no se les quiten robots ni se excluyan de la
indexación a través de directivas o etiquetas META de robots `noindex`.

### 3. Solicitar una revisión

Antes de solicitar una revisión:

* **Asegúrate de corregir correctamente el problema**;
solicitar una revisión cuando el problema aún exista solo prolongará el tiempo
durante el cual tu sitio se marcará como peligroso.

* **Comprueba si necesitas solicitar una revisión**; el proceso de revisión se
llevará a cabo en una herramienta específica, según el problema que presente tu sitio.
Consulta los siguientes canales.


#### A: Sitio pirateado

*Recibiste una notificación de sitio pirateado en el
[**informe Manual Actions**](https://www.google.com/webmasters/tools/manual-action)
de la Search Console:*

1. Ahora que has realizado los pasos sucesivos del proceso de limpieza,
  puedes acceder nuevamente al informe [Manual Actions](https://www.google.com/webmasters/tools/manual-action)
  y buscar el problema, ya sea como una coincidencia en todo el sitio o como una coincidencia
  parcial.
2. Selecciona **Request a review**.

    Para enviar una revisión, te solicitamos que proporciones más información sobre lo que
    hiciste para limpiar el sitio. Para cada categoría de spam pirateado, puedes escribir una
    oración explicando cómo se limpió el sitio (por ejemplo, “Para las URL pirateadas mediante
    inyección de contenido, eliminé el contenido no deseado y corregí la
    vulnerabilidad actualizando un complemento obsoleto”).


#### B. Software no deseado (incluido el software malicioso)

*Recibiste una notificación de software malicioso o software no deseado en el
[**informe Security Issues**](https://www.google.com/webmasters/tools/security-issues)
de la Search Console:*

1. Abre el
  [**informe Security Issues**](https://www.google.com/webmasters/tools/security-issues)
  nuevamente en la Search Console. Es posible que en el informe se sigan mostrando las advertencias y los ejemplos de
  URL infectadas que viste antes.
2. Selecciona **Request a review**.

    Para enviar una revisión, te solicitamos proporcionar más información sobre lo que
    hiciste para eliminar el incumplimiento de política de tu sitio. Por ejemplo,
    “Eliminé el código externo que distribuía software malicioso en mi
    sitio web y lo reemplacé por una versión más moderna del código”.


*No recibiste una notificación de software malicioso o software no deseado en el
[**informe Security Issues**](https://www.google.com/webmasters/tools/security-issues)
de la Search Console, pero recibiste una notificación en tu cuenta de AdWords:*

1. Solicita una revisión a través del
  [Centro de asistencia de AdWords](https://support.google.com/adwords/contact/site_policy).


#### C. Suplantación de identidad o ingeniería social

*Recibiste una notificación de suplantación de identidad en el
[**informe Security Issues**](https://www.google.com/webmasters/tools/security-issues)
de la Search Console:*

1. Abre el
  [**informe Security Issues**](https://www.google.com/webmasters/tools/security-issues)
  nuevamente en la Search Console. Es posible que en el informe se sigan mostrando las advertencias y los ejemplos de
  URL infectadas que viste antes.
2. Selecciona **Request a review**.

    Para enviar una revisión, te solicitamos proporcionar más información sobre lo que
    hiciste para eliminar el incumplimiento de política de tu sitio. Por ejemplo,
    “Eliminé la página que solicitaba a los usuarios que ingresen información personal”.

3. También puedes solicitar la revisión en
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Además de servir como herramienta de informe para propietarios de sitios que creen que su página
  se marcó incorrectamente como página de suplantación de identidad, este informe activará una revisión de
  páginas de suplantación de identidad que se han limpiado para levantar las advertencias.

### 4. Espera que se procese la revisión

* **Tiempo de procesamiento de la revisión de piratería con contenido no deseado**: el procesamiento de las revisiones de los sitios pirateados con
  contenido no deseado puede tardar varias semanas. Esto se debe a que las
  revisiones de contenido no deseado pueden incluir la investigación manual o un reprocesamiento completo
  de las páginas afectadas. Si se aprueba esta revisión, en Security Issues dejarán de
  mostrarse tipos de categorías de piratería o ejemplos de URL pirateadas.
* **Tiempo de procesamiento de la revisión de software malicioso**: el procesamiento de las revisiones de sitios infectados con
  software malicioso tarda algunos días. Una vez que finalice la revisión, la
  respuesta estará disponible en tu sección **Messages** de la Search Console.
* **Tiempo de procesamiento de la revisión de suplantación de identidad**: el procesamiento de las revisiones de suplantación de identidad tarda aproximadamente
  un día. Si la revisión es exitosa, desaparecerá la advertencia de suplantación
  de identidad y tu página podrá aparecer nuevamente en los resultados de búsqueda.

Si Google determina que tu sitio está limpio, las advertencias en navegadores y en los
resultados de búsqueda deben desaparecer en un plazo de 72 horas.

Si Google determina que no has solucionado el problema, en el informe Security
Issues de la Search Console podrían mostrarse más ejemplos de
URL infectadas para ayudarte en la próxima investigación. Las advertencias de software malicioso, suplantación de identidad
o sitios pirateados con contenido no deseado continuarán apareciendo en los
resultados de búsqueda o en los navegadores como precaución para proteger a los usuarios.

### Últimos pasos

* **Si se aprobó tu solicitud,** verifica que tu sitio funcione como esperabas:
  las páginas se cargan correctamente y puedes hacer clic en los vínculos. Para mantener protegido el sitio,
  recomendamos a todos los propietarios de sitios implementar el plan de
  mantenimiento y seguridad creado en [Limpiar y mantener limpio el sitio web](clean_site).

    Para obtener más información, considera los siguientes recursos de
    [StopBadware](https://www.stopbadware.org):

      * [Prevención de software malicioso: aspectos básicos](https://www.stopbadware.org/prevent-badware-basics)
      * [Recursos adicionales: sitios pirateados](https://www.stopbadware.org/hacked-sites-resources)

* **Si no se aprobó tu solicitud,** vuelve a revisar tu sitio en busca de
  [software malicioso](hacked_with_malware) o [spam](hacked_with_spam), o de
  modificaciones o archivos nuevos creados por el hacker. También
  puedes solicitar más ayuda a los
  [especialistas de tu equipo de asistencia](support_team).
