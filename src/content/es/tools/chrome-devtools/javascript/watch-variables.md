project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome DevTools te permite ver fácilmente diferentes variables en toda tu aplicación.

{# wf_published_on: 2016-02-11 #}
{# wf_updated_on: 2016-02-11 #}

# Controla las variables en Sources {: .page-title }

{% include "web/_shared/contributors/jonathangarbee.html" %}

Chrome DevTools te permite ver fácilmente diferentes variables en toda tu app.
Ver variables en Sources te mantiene alejado de la consola y concentrado en mejorar el código.

El panel Sources brinda la capacidad de ver variables en tu app.
Se encuentra en la sección Watch de la barra lateral del depurador.
Si aprovechas esta funcionalidad, no tendrás que registrar reiteradamente objetos en la consola.

![Sección Watch del depurador](imgs/sources-watch-variables-location.png)

## Agrega variables

Para agregar una variable a la lista de Watch, usa el ícono de adición que se encuentra a la derecha del título de la sección.
Esto abrirá una entrada integrada donde tienes que indicar el nombre de la variable que deseas ver.
Cuando finalices, presiona la tecla <kbd>Entrar</kbd> para agregarla a la lista.

![Botón para agregar a la lista de Watch](imgs/add-variable-to-watch.png)

El controlador mostrará el valor actual de la variable tal como se la agregó.
Si la variable no está definida o no es posible hallarla, se mostrará <samp>&lt;Not Available&gt;</samp> en el valor.

![Variable no definida en la lista de Watch](imgs/undefined-variable-in-watch.png)

## Actualiza las variables

Los valores de las variables pueden cambiar mientras una app sigue funcionando.
La lista de Watch no es una vista en tiempo real de las variables, a menos que estés recorriendo la ejecución.
Cuando recorres la ejecución con [puntos de interrupción](add-breakpoints), los valores que se ven se actualizarán automáticamente.
Para volver a controlar de manera manual las variables de la lista, presiona el botón de actualización que se encuentra a la derecha del título de la sección.

![Botón de actualización de las variables de visualización](imgs/refresh-variables-being-watched.png)

Cuando se solicita la actualización, el estado de la app actual se vuelve a verificar.
Cada elemento de la lista de visualización se actualizará con los valores actuales.

![Variable actualizada que se está visualizando](imgs/updated-variable-being-watched.png)

## Elimina variables

Para minimizar la cantidad de elementos que se muestra a fin de trabajar más rápido, es posible que tengas que eliminar variables de la lista de Watch.
Para hacerlo, desplaza el cursor sobre la variable y haz clic en el ícono de eliminación que aparece a la derecha.

![desplazamiento sobre la variable para eliminarla de la lista Watch](imgs/hover-to-delete-watched-variable.png)


{# wf_devsite_translation #}
