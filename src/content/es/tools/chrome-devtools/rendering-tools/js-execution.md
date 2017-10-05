project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Identifica funciones pesadas con el generador de perfiles de CPU de Chrome DevTools.

{# wf_updated_on: 2016-03-30 #}
{# wf_published_on: 2015-04-13 #}

# Acelerar la ejecución de JavaScript {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Identifica funciones pesadas con el generador de perfiles de CPU de Chrome 
DevTools.

![Generador de perfiles de CPU](imgs/cpu-profile.png)


### TL;DR {: .hide-from-toc }
- Registra exactamente las funciones llamadas y el tiempo que tardó cada una con el generador de perfiles de CPU.
- Visualiza tus perfiles con un gráfico de llamas.


## Grabar un perfil de CPU {:#record-profile}

Si observas bloqueos en JavaScript, genera un perfil de CPU de JavaScript.
Los perfiles de CPU muestran los puntos en los cuales se invierte el tiempo de ejecución en las funciones de tu página.

1. Ve al panel **Profiles** de DevTools.
2. Activa el botón de selección **Collect JavaScript CPU Profile**.
3. Presiona **Start**.
4. Según lo que intentes analizar, puedes volver a cargar la 
   página, interactuar con ella o simplemente dejar que se ejecute.
5. Presiona el botón **Stop** cuando finalices. 

También puedes usar la [Command Line API][profile] para grabar y agrupar perfiles 
desde la línea de comandos.

[profile]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#profilename-and-profileendname

## Ver el perfil de CPU {:#view-profile}

Cuando terminas la grabación, DevTools completa automáticamente el panel Profile
con los datos de esta. 

La vista predeterminada es **Heavy (Bottom Up)**. Esta vista te permite ver 
las funciones que tuvieron el mayor impacto en el rendimiento y examinar las rutas de acceso de las
llamadas a esas funciones. 

### Cambiar el criterio de ordenamiento {:#sort}

Para cambiar el criterio de ordenamiento, haz clic en el menú desplegable junto al ícono de 
**enfoque de la función seleccionada**
(![ícono de enfoque de la función seleccionada](imgs/focus.png){:.inline}) 
y luego elige una de las siguientes opciones:

**Chart**. Muestra un gráfico de llamas cronológico de la grabación.

![Gráfico de llamas](imgs/flamechart.png)

**Heavy (Bottom Up)**. enumera las funciones por el efecto en el rendimiento y te permite
examinar las rutas de acceso de las llamadas a esas funciones. Esta es la vista predeterminada. 

![Gráfico pesado](imgs/heavy.png)

**Tree (Top Down)**. Muestra una imagen general de la estructura de llamadas, 
y comienza en la parte superior de la pila de llamadas. 

![Gráfico de la vista “tree”](imgs/tree.png)

### Excluir funciones {:#exclude}

Si deseas excluir una función del perfil de CPU, haz clic en la función para seleccionarla y 
luego presiona el ícono de **exclusión de función seleccionada**
(![ícono de exclusión de función seleccionada](imgs/exclude.png){:.inline}). Se asigna al emisor de la 
función excluida el tiempo total de la función excluida.

Haz clic en el ícono de **restauración de todas las funciones**
(![Ícono de restauración de todas las funciones](imgs/restore.png){:.inline})
para restaurar todas las funciones excluidas en la grabación.

## Ver el perfil de CPU como un gráfico de llamas {:#flame-chart}

La vista de gráfico de llama brinda una representación visual del perfil de CPU en el
tiempo.

Después de [grabar un perfil de CPU](#record-profile), mira la grabación como un 
gráfico de llamas [cambiando el criterio de ordenamiento](#sort) a **Chart**.

![Vista de gráfico de llamas](imgs/flamechart.png)

El gráfico de llamas se divide en dos partes:

1. **Overview**: vista general de toda la grabación.
   La altura de las barras corresponde al volumen de 
   la pila de llamadas. Esto significa que cuanto más alta es la barra, mayor es el volumen de la pila de llamadas. 

2. **Call Stacks**: esta es una vista detallada de las funciones que se llamaron 
   durante la grabación. El eje horizontal representa el tiempo y el vertical 
   la pila de llamadas. Las pilas están organizadas de arriba abajo. De esta manera, la función en la parte superior
   es la que llamó a la función que está debajo de ella, y así sucesivamente. 

   Los colores de las funciones se asignan aleatoriamente. No existe una correlación con los colores que se usan
   en los otros paneles. Sin embargo, el color de las funciones es el mismo
   en las invocaciones para que puedas ver los patrones de ejecución. 

![Gráfico de llama anotado](imgs/annotated-cpu-flame.png)

Una pila de llamadas alta no es necesariamente importante; simplemente implica que se llamó
a una gran cantidad de funciones. No obstante, una barra ancha implica que una llamada tardó mucho tiempo en 
completarse. Este tipo de llamadas pueden someterse a optimizaciones. 

### Ampliar partes específicas de una grabación {:#zoom}

Haz clic, mantén el botón presionado y arrastra el mouse de izquierda a derecha en la vista general para ampliar
secciones específicas de la pila de llamadas. Después de realizar la ampliación, en la pila de llamadas 
se muestra automáticamente la parte de la grabación que seleccionaste.

![Gráfico de llamas ampliado](imgs/benchmark-zoom.png)

### Ver detalles de una función {:#flame-chart-function-details}

Haz clic en una función para ver su definición en el panel **Sources**.

Desplázate sobre una función para ver su nombre y datos de sincronización. Se proporciona la
siguiente información: 

*  **Name**: nombre de la función.
*  **Self time**: tiempo que tardó en completarse la invocación actual de la 
   función. Solo se incluyen las declaraciones de la propia función y se 
   excluyen las funciones a las que llamó.
*  **Total time**: tiempo que tardaron en completarse la invocación actual de 
   esta función y las funciones a las que llamó.
*  **URL**: ubicación de la definición de la función con el formato 
   `file.js:100`, donde `file.js` es el nombre del archivo en el cual está definida
   la función y `100` el número de línea de la definición.
*  **Aggregated self time**: tiempo total de todas las invocaciones de la 
   función en toda la grabación, sin incluir las funciones a las que esta función 
   llamó.
*  **Aggregated total time**: tiempo total de todas las invocaciones de la 
  función, incluidas las funciones a las que esta función llamó.
*  **Not optimized**: Si el generador de perfiles detectó una posible optimización
   para la función, la indica aquí.

![Visualización de detalles de una función en el gráfico de llamas](imgs/details.png)


{# wf_devsite_translation #}
