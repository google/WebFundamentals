project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Organiza recursos por marco, dominio, tipo u otros criterios.

{# wf_updated_on: 2016-07-28 #}
{# wf_published_on: 2015-04-13 #}

# Inspeccionar recursos {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Organiza recursos por marco, dominio, tipo u otros
criterios.


### TL;DR {: .hide-from-toc }
- Usa el subpanel <strong>Frames</strong> del panel <strong>Application</strong> para organizar los recursos por marcos.
- También puedes ver recursos por marcos desde el panel <strong>Sources</strong> inhabilitando la opción <strong>group by folder</strong>.
- Para visualizar recursos por dominio y carpeta, usa el panel <strong>Sources</strong>.
- Filtra recursos por nombre u otros criterios en el panel <strong>Network</strong>.


## Organizar recursos por marco {:#frames}

Usa el subpanel **Frames** en el panel **Application** para obtener una representación organizada
por marcos de los recursos de la página.

![detalles de marcos][frames]

* El nivel superior (`top` en la captura de pantalla precedente) corresponde al documento principal.
* Debajo de ese nivel (p. ej., `widget2` en la captura de pantalla precedente) se encuentran submarcos del
  documento principal. Expande uno de estos submarcos para ver los recursos
  que se originan de ese marco.
* Debajo de los submarcos, se encuentran las imágenes, las secuencias de comandos y otros recursos del
  documento principal.
* El documento principal en sí se encuentra en el último lugar.

Haz clic en un recurso para obtener una vista previa de él.

Haz clic con el botón secundario en un recurso para verlo en el panel **Network**, abrirlo en una
pestaña nueva, copiar su URL o guardarlo.

![ver un recurso][resource]

También puedes ver recursos por marco en el panel **Sources** haciendo clic en el
menú ampliado del navegador e inhabilitando la opción **Group by folder**
para detener la agrupación de los recursos por carpeta.

![opción group by folder](imgs/group-by-folder.png)

Los recursos se ordenarán por marco solamente.

![sin carpetas](imgs/no-folders.png)

[frames-pane]: /web/tools/chrome-devtools/manage-data/imgs/frames-pane.png
[marcos]: /web/tools/chrome-devtools/manage-data/imgs/frames.png
[recurso]: /web/tools/chrome-devtools/manage-data/imgs/resource.png

## Organizar recursos por dominio y carpeta {:#sources}

Para ver recursos organizados por dominio y directorio, usa el panel **Sources**.


![panel sources](imgs/sources.png)

## Filtrar recursos por nombre, tipo u otros criterios {:#filter}

Usa el panel **Network** para filtrar recursos por nombre, tipo y una amplia variedad de
otros criterios. Consulta la guía a continuación para obtener más información.

{# include shared/related_guides.liquid inline=true list=page.related-guides.filter #}


{# wf_devsite_translation #}
