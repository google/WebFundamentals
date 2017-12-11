project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: El registro por consola es un poderoso método para inspeccionar el comportamiento de tu página o app. Empecemos por console.log() y exploremos otros usos avanzados.

{# wf_updated_on: 2015-05-11 #}
{# wf_published_on: 2015-04-13 #}

# Diagnosticar y registrar por consola {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/flaviocopes.html" %}
El registro por consola es un poderoso método para inspeccionar el comportamiento de tu página o app. Empecemos por console.log() y exploremos otros usos avanzados.


### TL;DR {: .hide-from-toc }
- Usa <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-''>console.log()</a> para registros básicos
- Usa <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleerrorobject--object-''>console.error()</a> y <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolewarnobject--object-''>console.warn()</a> para cosas atractivas
- Usa <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupobject-object-''>console.group()</a> y <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consolegroupend''>console.groupEnd()</a> para agrupar mensajes relacionados y evitar el desorden
- Usa <a href=''/web/tools/chrome-devtools/debug/console/console-reference#consoleassertexpression-object''>console.assert()</a> para mostrar mensajes de error condicional


## Escribir en la consola

Usa el método <a href="/web/tools/chrome-devtools/debug/console/console-reference#consolelogobject--object-">console.log()</a> para registros básicos en consola. Esta toma una o más expresiones como parámetros y sus valores actuales en la consola. Concatena varios parámetros en una línea separada por espacios.

Por ejemplo, ejecuta esta línea de código en tu JavaScript:


    console.log("Node count:", a.childNodes.length, "and the current time is:", Date.now());
    

Como resultado, se obtendrá lo siguiente en la consola:
![Registro múltiple](images/console-write-log-multiple.png)

## Autocompletar comandos {:#autocomplete}

Cuando escribes en la consola, en esta se muestra automáticamente un 
menú desplegable con métodos relevantes autocompletados que coinciden con texto 
ya ingresado. También se incluyen comandos que hayas ejecutado anteriormente.

![ejemplo de autocompletar](images/autocomplete.png)

## Organizar la salida de la consola {:#organizing}

### Agrupa los mensajes

Con los comandos de grupo, puedes agrupar las salidas relacionadas. El comando [`console.group()`](./console-reference#consolegroupobject-object-) recibe un solo parámetro de string para establecer el nombre del grupo. Cuando lo llames en tu JavaScript, la consola comenzará a agrupar todas las salidas posteriores.

Para finalizar con la agrupación, solo debes llamar a [`console.groupEnd()`](./console-reference#consolegroupend) cuando hayas terminado.

Ejemplo de entrada:


    var user = "jsmith", authenticated = false;
    console.group("Authentication phase");
    console.log("Authenticating user '%s'", user);
    // authentication code here...
    if (!authenticated) {
        console.log("User '%s' not authenticated.", user)
    }
    console.groupEnd();
    

Ejemplo de salida:
![Salidas simples agrupadas en consola](images/console-write-group.png)

#### Grupos anidados

Los grupos de registro también se pueden anidar. Esto resulta útil cuando necesitas ver un grupo grande en partes más pequeñas.

En este ejemplo, se muestra un grupo de registros para la etapa de autenticación de un proceso de acceso:


    var user = "jsmith", authenticated = true, authorized = true;
    // Top-level group
    console.group("Authenticating user '%s'", user);
    if (authenticated) {
        console.log("User '%s' was authenticated", user);
        // Start nested group
        console.group("Authorizing user '%s'", user);
        if (authorized) {
            console.log("User '%s' was authorized.", user);
        }
        // End nested group
        console.groupEnd();
    }
    // End top-level group
    console.groupEnd();
    console.log("A group-less log trace.");
    

Aquí se muestra la salida de los grupos anidados en la consola:
![Salidas simples agrupadas en consola](images/console-write-nestedgroup.png)

#### Grupos con contracción automática

Si usas mucho los grupos, puede resultarte muy útil evitar que se muestre todo a medida que sucede. Cuando esto ocurra, podrás contraer automáticamente los grupos llamando a [`console.groupCollapsed()`](./console-reference#consolegroupcollapsedobject-object-) en lugar de `console.group()`:


    console.groupCollapsed("Authenticating user '%s'", user);
    if (authenticated) {
        ...
    }
    console.groupEnd();
    

Salida de groupCollapsed():
![Grupo contraído inicialmente](images/console-write-groupcollapsed.png)

## Errores y advertencias

Los errores y las advertencias se comportan del mismo modo que los registros normales. La única diferencia es que `error()` y `warn()` tienen estilos para poder destacarse.

### console.error()

El método [`console.error()`](./console-reference#consoleerrorobject--object-) muestra un ícono rojo y el texto del mensaje en el mismo color:


    function connectToServer() {
        console.error("Error: %s (%i)", "Server is  not responding",500);
    }
    connectToServer();
    

Se obtiene lo siguiente:

![Salida de ejemplo de un error](images/console-write-error-server-not-resp.png)

### console.warn()

El método [`console.warn()`](./console-reference#consolewarnobject--object-) muestra un ícono de advertencia amarillo con el texto del mensaje:


    if(a.childNodes.length < 3 ) {
        console.warn('Warning! Too few nodes (%d)', a.childNodes.length);
    }
    

Se obtiene lo siguiente:

![Ejemplo de advertencia](images/console-write-warning-too-few-nodes.png)

## Aserciones

El método [`console.assert()`](./console-reference#consoleassertexpression-object) muestra, de forma condicional, una string de error (su segundo parámetro) solo si el primer parámetro se avalúa como `false`.

### Una aserción simple y su visualización

El siguiente código generará un mensaje de error en la consola solo si la cantidad de nodos secundarios correspondiente al elemento `list` es superior a 500.


    console.assert(list.childNodes.length < 500, "Node count is > 500");
    

Así se muestra una falla de aserción en la consola:
![Falla de aserción](images/console-write-assert-failed.png)

## Dar formato a las strings y sustituirlas

El primer parámetro que se pasa a cualquier método de registro puede contener uno o más especificadores de formato. Un especificador de formato consta de un símbolo `%` seguido de una letra que indica el formato que recibirá el valor. Los parámetros que siguen a la string corresponden a los marcadores de posición en orden.

En el siguiente ejemplo, se usan formateadores de strings y dígitos para insertar valores en la string de salida. En la consola, aparecerá “Sam tiene 100 puntos”.

    console.log("%s has %d points", "Sam", 100);

A continuación, se proporciona toda la lista de especificadores de formato:

| Especificador | Salida                                                                            |
|-----------|:----------------------------------------------------------------------------------|
| %s        | Da al valor el formato de una string.                                                     |
| %i o %d  | Da al valor el formato de un entero.                                                   |
| %f        | Da al valor el formato de un punto flotante.                                        |
| %o        | Da al valor el formato de un elemento DOM expandible. Tal como se ve en el panel Elements,     |
| %O        | Da al valor el formato de un objeto JavaScript expandible.                              |
| %c        | Aplica reglas de estilo CSS a la string de salida según la especificación del segundo parámetro. |

En este ejemplo, se usa el especificador de dígito para dar formato al valor de `document.childNodes.length`. También se usa el especificador de punto flotante para dar formato al valor de `Date.now()`.

Código:


    console.log("Node count: %d, and the time is %f.", document.childNodes.length, Date.now());
    

Salida del ejemplo del código anterior:
![Salida de sustitución de ejemplo](images/console-write-log-multiple.png)

### Aplicar estilos a la consola con CSS

El especificador de formato CSS te permite personalizar la pantalla de la consola.
Inicia la string con el especificador y aplica el estilo que desees como segundo parámetro.

Prueba con este código:


    console.log("%cThis will be formatted with large, blue text", "color: blue; font-size: x-large");
    

La salida del registro se verá con tamaño grande y en azul:

![String con formato](images/console-write-format-string.png)

### Dar a elementos DOM formato de objetos JavaScript

De forma predeterminada, los elementos DOM se registran en la consola como representaciones de sus HTML, pero a veces te convendrá acceder al elemento DOM como un objeto JavaScript e inspeccionar sus propiedades. Para hacer esto, puedes usar el especificador de string `%o` (ver arriba) o `console.dir`: 

![Registrar un elemento con dir()](images/dir-element.png)




{# wf_devsite_translation #}
