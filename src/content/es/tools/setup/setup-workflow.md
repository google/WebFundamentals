project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Configura la autoría persistente en Chrome DevTools para poder ver los cambios inmediatamente y guardarlos en el disco.

{# wf_updated_on: 2015-07-30 #}
{# wf_published_on: 2015-07-08 #}

# Configura la persistencia con los espacios de trabajo de DevTools {: .page-title }

{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Configura la autoría persistente en Chrome DevTools para poder ver los cambios inmediatamente y guardarlos en el disco.

Chrome DevTools te permite cambiar elementos y estilos
en una página web, y ver los cambios de inmediato.
De manera predeterminada, si actualizas el navegador, los cambios desaparecen
a menos que los copies y los pegues en un editor externo.

Los espacios de trabajo te permiten conservar esos cambios en el disco
sin tener que salir de Chrome DevTools.
Asigna los recursos proporcionados desde un servidor web local a archivos en un disco
y mira los cambios realizados en esos archivos como si estuvieran en curso.


### TL;DR {: .hide-from-toc }
- No copies manualmente los cambios a archivos locales. Usa espacios de trabajo para conservar los cambios realizados en DevTools en tus recursos locales.
- Monta los archivos locales en el navegador. Asigna archivos a URL.
- Cuando se hayan configurado los espacios de trabajo persistentes, los cambios de estilo que se realicen en el panel Elements se conservan automáticamente; no así los cambios de DOM. En su lugar, conserva los cambios de los elementos en el panel Sources.


## Agregar archivos de origen locales a un espacio de trabajo

Para que los archivos de origen de una carpeta local se puedan editar en el panel Sources:

1. Haz clic con el botón secundario en el panel izquierdo.
2. Selecciona **Add Folder to Workspace**.
3. Elige la ubicación de la carpeta local a la que desees realizar la asignación.
4. Haz clic en **Allow** para otorgar a Chrome acceso a la carpeta. 

![Add Folder to Workspace](imgs/addfolder.png)

Por lo general, la carpeta local contiene los archivos de origen originales del sitio que se usaron para completar el sitio en el servidor. Si no deseas modificar esos archivos originales por medio del espacio de trabajo, copia la carpeta y especifica la copia como la carpeta del espacio de trabajo.

## Preparar los cambios persistentes para el navegador

Ya has asignado la carpeta local a tu espacio de trabajo,
pero el navegador sigue proporcionando el contenido de la carpeta de la red.
Para asignar automáticamente los cambios persistentes al navegador,
asigna los archivos locales de la carpeta a una URL:

1. Haz clic con el botón secundario o presiona Control y haz clic en un archivo en el panel izquierdo Sources.
2. Selecciona **Map to File System Resource**.
3. Selecciona el archivo local en el espacio de trabajo persistente.
4. Vuelve a cargar la página en Chrome.

![Asignar el archivo al URL](imgs/maptoresource.png)

En adelante,
Chrome carga el URL al que se realizó la asignación y
muestra el contenido del espacio de trabajo
en lugar del contenido de la red.
Trabaja directamente en los archivos locales sin
tener que cambiar reiteradamente entre Chrome y un editor externo.

## Limitaciones

A pesar de su gran capacidad, los espacios de trabajo tienen algunas limitaciones que debes conocer.

* Solo se conservan los cambios de estilo realizados en el panel Elements; los cambios en el DOM se descartan.

* Se pueden guardar únicamente los estilos definidos en un archivo CSS externo. No se conservan los cambios en `element.style` ni en los estilos insertados. (Si hay estilos insertados, los puedes cambiar en el panel Sources).

* Los cambios de estilo realizados en el panel Elements se conservan de inmediato; no es necesario guardarlos explícitamente 
(<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">S</kbd> o <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">S</kbd> (Mac)) si el recurso CSS se asigna a un archivo local.

* Si asignas archivos desde un servidor remoto y no desde un servidor local, cuando actualizas la página Chrome la actualiza desde el servidor remoto. Los cambios se mantienen en el disco y se vuelven a aplicar si continúas realizando ediciones en los espacios de trabajo.

* En el navegador, debes usar la ruta de acceso completa a un archivo al que se realice la asignación. Incluso tus archivos de índice deben incluir .html en el URL para ver la versión preparada.

## Administrar archivos locales

Además de editar archivos existentes,
también puedes agregar y borrar archivos
en el directorio al cual se realice la asignación y que uses para los espacios de trabajo.

### Agregar un archivo

Para agregar un archivo:

1. Haz clic con el botón secundario en el subpanel izquierdo Sources.
2. Selecciona **New File**.
3. Escribe el nombre del archivo nuevo, incluida la extensión (p. ej., `newscripts.js`) y presiona **Intro**; el archivo se agregará a la carpeta local.

### Borrar archivos

Para borrar un archivo:

1. Haz clic con el botón secundario en el subpanel izquierdo Sources.
2. Selecciona **Delete** y haz clic en **Yes** para confirmar.

### Crear una copia de seguridad de un archivo

Antes de realizar cambios importantes en un archivo,
será útil duplicar el original para producir una copia de seguridad.

Para duplicar un archivo:

1. Haz clic con el botón secundario en el subpanel izquierdo Sources.
2. Selecciona **Make a Copy...**.
3. Escribe el nombre del archivo nuevo, incluida la extensión (p. ej., `mystyles-org.css`) y presiona **Intro**.

### Actualizar

Cuando creas o borras archivos directamente en los espacios de trabajo,
el directorio de Sources se actualiza de manera automática para mostrar los cambios en el archivo.
Para forzar una actualización en cualquier momento, haz clic con el botón secundario en una carpeta y elige **Refresh**.

También resulta útil si modificas archivos que están abiertos actualmente en un editor externo y deseas que los cambios se muestren en DevTools. Por lo general, DevTools detecta esos cambios automáticamente, pero si quieres estar seguro simplemente actualiza la carpeta siguiendo la descripción anterior.

### Buscar archivos o texto

Para buscar un archivo cargado en DevTools,
presiona <kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">O</kbd> o <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">O</kbd> (Mac)
a fin de abrir un diálogo de búsqueda.
Puedes hacer esto en los espacios de trabajo,
pero la búsqueda se ampliará e incluirá los archivos remotos cargados
y los archivos locales en la carpeta del espacio de trabajo.

Para buscar una cadena en varios archivos:

1. Abre la ventana de búsqueda: haz clic en el botón **Show Drawer** ![Show drawer](imgs/show_drawer_button.png){:.inline} y, a continuación, haz clic en **Search** o presiona
<kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">Mayús</kbd> + <kbd class="kbd">F</kbd> o <kbd class="kbd">Cmd</kbd> + <kbd class="kbd">Opt</kbd> + <kbd class="kbd">F</kbd> (Mac).
2. Escribe una cadena en un campo de búsqueda y presiona **Intro**.
3. Si la cadena es una expresión regular o en ella deben distinguirse mayúsculas y minúsculas, haz clic en la casilla correspondiente.

![Buscar cadenas en varios archivos](imgs/searchacross.png)

Los resultados de búsqueda se muestran en el panel lateral de Console, ordenados por nombre de archivo. Además, se indica la cantidad de coincidencias en cada archivo. Usa las flechas para **expandir** ![Expandir](imgs/expand_button.png){:.inline} y **contraer** ![Contraer](imgs/collapse_button.png){:.inline} a fin de aplicar estas acciones a los resultados para un archivo determinado.



{# wf_devsite_translation #}
