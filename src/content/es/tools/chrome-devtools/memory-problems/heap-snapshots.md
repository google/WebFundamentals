project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Aprende a registrar capturas de pantalla de montón con el generador de perfiles de montón de Chrome DevTools y a encontrar fugas de memoria.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-06-08 #}

# Cómo registrar capturas de pantalla de montón {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Aprende a registrar capturas de pantalla de montón con el generador de perfiles de montón de Chrome DevTools y a encontrar fugas de memoria.

El generador de perfiles de montón de Chrome DevTools muestra la distribución de la memoria
según los objetos de JavaScript de la página y los nodos del DOM relacionado
(consulta también [Árbol de retención de objetos](/web/tools/chrome-devtools/profile/memory-problems/memory-101#objects-retaining-tree)).
Úsalo para tomar capturas de pantalla de montón de JavaScript, analizar gráficos de memoria,
comparar capturas de pantalla y encontrar fugas de memoria.


## Tomar una captura de pantalla

En el panel Profiles, elige **Take Heap Snapshot** y haz clic en **Start** o presiona <span class="kbd">Cmd</span> + <span class="kbd">E</span> o <span class="kbd">Ctrl</span> + <span class="kbd">E</span>:

![Seleccionar el tipo de perfil](imgs/profiling-type.png)

Las **capturas de pantalla** se almacenan inicialmente en la memoria de proceso del representador.
Se las transfiere a DevTools a pedido, cuando haces clic en el ícono de la captura de pantalla para verla.

Cuando se finalizan la cargada de la captura de pantalla en DevTools y su análisis,
aparece un número debajo del título de la captura de pantalla que indica el tamaño total de los
[objetos de JavaScript que se pueden alcanzar](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes):

![Tamaño total de los objetos que se pueden alcanzar](imgs/total-size.png)

Note: En la captura de pantalla, solo se incluyen los objetos que se pueden alcanzar. Además, la toma de una captura de pantalla siempre comienza con una recolección de elementos no utilizados.

## Borrar capturas de pantalla

Quita capturas de pantalla (de DevTools y la memoria del representador) presionando el ícono Clear all profiles:

![Quitar capturas de pantalla](imgs/remove-snapshots.png)

Cerrar la ventana de DevTools no borrará los perfiles de la memoria del representador. Al volver a abrir DevTools, todas las capturas de pantalla tomadas previamente reaparecerán en la lista de capturas de pantalla.

<p class="note"><strong>Ejemplo:</strong> Consulta este ejemplo de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example3.html">objetos esparcidos</a> y genera un perfil con el generador de perfiles de montón. Debes ver una serie de asignaciones de elementos (objetos).</p>

## Ver capturas de pantalla

Puedes ver las capturas de pantalla desde diferentes perspectivas y para distintas tareas.

La vista **Summary** muestra los objetos agrupados por nombre del constructor. Úsala para encontrar objetos (y el empleo que hacen de la memoria) según el tipo agrupado por nombre de constructor. Es especialmente útil para
[localizar las fugas del DOM](/web/tools/chrome-devtools/profile/memory-problems/memory-diagnosis#narrow-down-causes-of-memory-leaks).

La vista **Comparison** muestra diferencias entre dos capturas de pantalla. Úsala para comparar dos (o más) capturas de pantalla de memoria antes y después de una operación. Inspeccionar el delta en la memoria libre y el recuento de referencias te permite confirmar la presencia y la causa de una fuga de memoria.

La vista **Containment** permite explorar el contenido del montón. Te brinda una mejor vista de la estructura de objetos, lo cual permite analizar los objetos a los que se hace referencia en el espacio de nombres general (ventana) para descubrir la razón por la cual no se borran. Úsala para analizar cierres y examinar los objetos en un nivel bajo.

La vista **Dominators** muestra
[el árbol del dominador](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators)
y puede ser útil para encontrar puntos de acumulación.
Esta vista ayuda a confirmar que no se siguen manteniendo referencias inesperadas a objetos y que la recolección o la eliminación de elementos no utilizados realmente funciona.

Para alternar entre las vistas, usa el selector que se encuentran en la parte inferior de la vista:

![Selector para cambiar de vista](imgs/switch-views.png)

Note: En el montón de JavaScript, no se guardan todas las propiedades. No se capturan las propiedades implementadas con captadores que ejecutan código nativo. Tampoco se capturan los valores que no son de cadena.

### Vista Summary

Inicialmente, una captura de pantalla se abre en la vista Summary y muestra los totales de los objetos, que se pueden expandir para mostrar las instancias:

![Vista Summary](imgs/summary-view.png)

Las entradas del nivel superior corresponden a las líneas de "totales". Muestran lo siguiente:

* En la columna **Constructor** se representan todos los objetos que se crearon con este constructor.
* La **cantidad de instancias de objetos** se muestra en la columna # .
* En la columna **Shallow Size** se muestra la suma de tamaños superficiales de todos los objetos creados por una función determinada del constructor. El tamaño superficial es el tamaño de la memoria que un objeto retiene (generalmente, las matrices y las strings tienen tamaños superficiales mayores). Consulta también [Tamaños de objetos](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes).
* En la columna **Retained Size** se muestra el tamaño retenido máximo en el mismo conjunto de objetos. Se denomina tamaño retenido al tamaño de la memoria que se puede liberar una vez borrado un objeto (y sus elementos dependientes que ya no se pueden alcanzar). Consulta también [Tamaños de objetos](/web/tools/chrome-devtools/profile/memory-problems/memory-101#object-sizes).
* En la columna **Distance** se muestra la distancia a la raíz con la ruta de acceso de nodos más corta y simple.

Después de expandir una línea de total en la vista superior, se muestran todas las instancias. Para cada instancia, se muestran los tamaños superficiales y retenidos en las columnas correspondientes. El número que figura después del carácter @ es el ID único del objeto, lo que te permite comparar capturas de pantalla de montón por objeto.

Recuerda que los objetos amarillos tienen referencias a JavaScript y que los objetos reales son nodos separados a los que se hace referencia desde otro con un fondo amarillo.

**¿A qué corresponden las diversas entradas en el constructor (grupo) en el perfilador de montón?**

![Grupos del constructor](imgs/constructor-groups.jpg)

* **(global property)**: objetos intermedios entre un objeto global (como “window”) y un objeto al que hace referencia. Si se crea un objeto con un constructor Person y este objeto es encapsulado por un objeto global, la ruta de acceso de retención tendría la siguiente apariencia: [global] > (global property) > Person. Esto va contra la norma, donde los objetos se hacen referencia directamente entre sí. Tenemos objetos intermedios por cuestiones de rendimiento. Las propiedades globales se modifican regularmente. Las optimizaciones de acceso a las propiedades son útiles porque los objetos que no son globales no se pueden utilizar para las propiedades globales.

* **(roots)**: las entradas de raíz de la vista del árbol de retención son las entidades que tienen referencias al objeto seleccionado. Estas también pueden ser referencias creadas por el motor para sus propios fines. El motor tiene cachés con objetos de referencia, pero todas estas referencias son débiles y no evitarán la recolección de un objeto, ya que las referencias no son realmente fuertes.

* **(closure)**: recuento de referencias a un grupo de objetos mediante cierres de funciones.

* **(array, string, number, regexp)**: lista de tipos de objetos con propiedades que hacen referencia a una matriz, una string, un número o una expresión regular.

* **(compiled code)**: en términos simples, todo lo relacionado con el código compilado. Script es similar a una función, pero corresponde a un cuerpo &lt;script&gt;. Los SharedFunctionInfos (SFI) son objetos que están entre las funciones y el código compilado. Las funciones suelen tener un contexto, mientras que los SFI no.

* **HTMLDivElement**, **HTMLAnchorElement**, **DocumentFragment**, etc.: referencias a elementos u objetos de documentos de un tipo particular a los que hace referencia tu código.


<p class="note"><strong>Ejemplo:</strong> Consulta esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-summary">página de demostración</a> para comprender cómo se puede usar la vista Summary.</p>

### Vista Comparison

Encuentra objetos filtrados comparando varias capturas de pantalla. Para verificar que determinada operación de la app no crea fugas (por ejemplo, usualmente un par de operaciones directas y reversas, como abrir un documento y luego cerrarlo, no debería dejar elementos no utilizados), puedes seguir este escenario:

1. Toma una captura de pantalla de montón antes de realizar la operación.
2. Realiza una operación (interactúa con una página de la manera que crees que genera una fuga).
3. Realiza una operación reversa (lleva a cabo la interacción opuesta y repítela varias veces).
4. Toma otra captura de pantalla de montón y cambia la vista de esta a Comparison, donde se la compara con la primera captura de pantalla.

En la vista Comparison, se muestra la diferencia entre dos capturas de pantalla. Cuando se expande una entrada de total, se muestran las instancias de los objetos agregados y borrados.

![Vista Comparison](imgs/comparison-view.png)

<p class="note"><strong>Ejemplo:</strong> Consulta esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-comparison">página de demostración</a> para tener una idea de cómo usar la comparación de capturas de pantalla para detectar fugas.</p>

### Vista Containment

La vista Containment es, básicamente, una vista general de la estructura de objetos de tu app. Te permite ver dentro de cierres de funciones, observar objetos internos de las VM que constituyen los objetos de JavaScript y comprender cuánta memoria usa tu app en un nivel muy bajo.

La vista proporciona varios puntos de entrada:

* Los **objetos DOMWindow** son objetos considerados “globales” para el código JavaScript.
* Las **raíces de GC** son las raíces de GC reales empleadas por los elementos no usados de VM. Las raíces de GC pueden constar de mapas de objetos, tablas de símbolos, pilas de subprocesos de VM, cachés de compilación, alcances de controladores y controladores globales integrados.
* Los **objetos nativos** son objetos del navegador que se insertan en la máquina virtual de JavaScript para permitir la automatización, por ejemplo, nodos del DOM, reglas de las CSS.

![Vista Containment](imgs/containment-view.png)

<p class="note">
  <strong>Ejemplo:</strong> Consulta esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-containment">página de demostración</a> para descubrir cómo explorar cierres y controladores de eventos con esta vista.
</p>

<strong>Una sugerencia sobre cierres</strong>

Resulta muy útil nombrar las funciones para poder distinguir fácilmente entre cierres y capturas de pantalla. En este caso, por ejemplo, no se usan funciones con nombre:


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function() { // this is NOT a named function
        return largeStr;
      };
    
      return lC;
    }
    

En este, se usan:


    function createLargeClosure() {
      var largeStr = new Array(1000000).join('x');
    
      var lC = function lC() { // this IS a named function
        return largeStr;
      };
    
      return lC;
    }
    

![Nombras las funciones para distinguir cierres](imgs/domleaks.png)

<p class="note">
    <strong>Ejemplos:</strong>
    Consulta este ejemplo de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example7.html">por qué eval es maligna</a> para analizar el impacto de los cierres en la memoria. También te puede interesar consultar después este ejemplo que te lleva por la grabación de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example8.html">asignaciones del montón</a>.
</p>

### Vista Dominators

La vista [Dominators](/web/tools/chrome-devtools/profile/memory-problems/memory-101#dominators) muestra el árbol del dominador para el gráfico del montón.
Es similar a la vista Containment, pero no incluye los nombre de las propiedades.
Esto de debe a que un dominador de un objeto puede no tener referencias directas al objeto;
el árbol del dominador no es una árbol de expansión del gráfico.
Pero esto es muy útil,
ya que nos ayuda a identificar puntos de acumulación de memoria con rapidez.

<p class="note"><strong>Nota:</strong> En Chrome Canary, la vista Dominators se puede habilitar yendo a Settings > Show advanced heap snapshot properties y reiniciando DevTools.</p>

![Vista Dominators](imgs/dominators-view.png)

<p class="note">
    <strong>Ejemplos:</strong>
    Consulta esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-dominators">demostración</a> para entrenarte en la detección de puntos de acumulación. Después lee este ejemplo de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example10.html">retención de rutas de acceso y dominadores</a>.
</p>

## Codificación por color de la búsqueda

Las propiedades y los valores de las propiedades de los objetos tienen colores diferentes y
están codificados por color según corresponda. Cada propiedad tiene uno de cuatro tipos:

* **a: property**: propiedad regular con nombre, a la que se accede mediante el operador “.” (punto) o una anotación en [ ] (corchetes), p. ej., [“foo bar”].
* **0: element**: propiedad regular con un índice numérico, a la que se accede mediante una anotación con [ ] (corchetes).
* **a: context var**: variable en el contexto de una función, a la que se accede con su nombre desde el interior del cierre de una función.
* **a: system prop**: propiedad agregada por la VM de JavaScript, a la que no se puede acceder desde el código JavaScript.

Los objetos designados como `System `no tienen un tipo de JavaScript correspondiente. Son parte de la implementación del sistema de objetos del VM de JavaScript. V8 asigna la mayoría de sus objetos internos en el mismo montón que los objetos JS del usuario; Estos tan solo son objetos internos de V8.

## Encontrar un objeto específico

Para encontrar un objeto en el montón recopilado, puedes buscarlo con <kbd><kbd class="kbd">Ctrl</kbd> + <kbd class="kbd">F</kbd></kbd> e indicar el ID del objeto.

## Descubrir fugas del DOM

El generador de perfiles de montón puede reflejar dependencias bidireccionales
entre objetos nativos del navegador (nodos del DOM y reglas de las CSS) y los objetos de JavaScript.
Esto ayuda a descubrir fugas que, de otro modo, serían invisibles y que se producen
debido a subárboles del DOM separados que quedan dando vueltas.

Las fugas del DOM pueden ser más grandes de lo que piensas.
Analiza el siguiente ejemplo: ¿cuándo se realiza la recolección de elementos no utilizados de #tree?


      var select = document.querySelector;
      var treeRef = select("#tree");
      var leafRef = select("#leaf");
      var body = select("body");
    
      body.removeChild(treeRef);
    
      //#tree can't be GC yet due to treeRef
      treeRef = null;
    
      //#tree can't be GC yet due to indirect
      //reference from leafRef
    
      leafRef = null;
      //#NOW can be #tree GC
    

`#leaf` conserva una referencia al nodo principal (parentNode) y recursivamente hacia arriba
hasta `#tree`; por lo tanto, solo cuando se anula leafRef, se puede realizar la recolección de elementos no utilizados de TODO el árbol debajo de
`#tree`.

![Subárboles del DOM](imgs/treegc.png)

<p class="note">
    <strong>Ejemplos:</strong>
    Consulta este ejemplo de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example6.html">nodos del DOM con fuga</a> para comprender dónde se pueden fugar los nodos del DOM y cómo detectarlo. Puedes darle seguimiento a este tema con este ejemplo de <a href="https://github.com/GoogleChrome/devtools-docs/blob/master/docs/demos/memory/example9.html">las fugas del DOM que son más grandes de lo esperado</a>.
</p>

Para acceder a más datos sobre aspectos básicos de fugas del DOM y análisis de memoria, consulta
[Cómo encontrar y depurar fugas con Chrome DevTools](http://slid.es/gruizdevilla/memory) de Gonzalo Ruíz de Villa.

<p class="note">
    <strong>Ejemplo:</strong>
    Consulta esta <a href="https://developer.chrome.com/devtools/docs/heap-profiling-dom-leaks">demostración</a> para jugar con árboles del DOM separados.
</p>




{# wf_devsite_translation #}
