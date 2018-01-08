project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: En esta sección se describen términos comunes que se usan en el análisis de memoria y que se pueden aplicar a una variedad de herramientas de generación de perfiles de memoria para diferentes idiomas.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2015-05-18 #}

# Terminología de memoria {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

En esta sección se describen términos comunes que se usan en el análisis de memoria y que se pueden aplicar a una variedad de herramientas de generación de perfiles de memoria para diferentes idiomas.

Los términos y las nociones que se describen aquí se refieren al
[generador de perfiles de montón de Chrome DevTools](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots).
Si ya has trabajado con el generador de perfiles de memoria de Java, .NET o algún otro, esto puede ser un repaso.


## Tamaños de los objetos

Piensa en la memoria como un gráfico con tipos primitivos (como números y cadenas) y objetos (matrices asociativas). Se la puede presentar como un gráfico con diversos puntos interconectados, como se muestra aquí:

![Representación visual de una memoria](imgs/thinkgraph.png)

Un objeto puede retener memoria de dos maneras:

* Directamente, por el objeto en sí mismo.

* Implícitamente reteniendo referencias a otros objetos, lo que evita que el recolector de elementos no utilizados (**GC**) elimine estos objetos automáticamente.

Cuando trabajes con el generador de perfiles en DevTools (una herramienta para investigar problemas de memoria que se encuentra en "Profiles"), seguramente verás unas cuantas columnas con información. Dos que sobresalen son <strong>Shallow Size</strong> y <strong>Retained Size</strong>, ¿pero qué representan?

![Shallow Size y Retained Size](imgs/shallow-retained.png)

### Shallow Size

Este es el tamaño de la memoria que retiene el objeto en sí mismo.

Los objetos típicos de JavaScript tienen determinada cantidad de memoria reservada para su descripción y para almacenar valores inmediatos. Por lo general, solo las matrices y las cadenas pueden tener un tamaño superficial considerable. Sin embargo, las cadenas y las matrices externas tienen el almacenamiento principal en la memoria del representador y solo exponen un objeto contenedor pequeño en el montón de JavaScript.

La memoria del representador es en su totalidad memoria del proceso donde se representa una página inspeccionada: la memoria nativa más la memoria del montón de JavaScript de la página más la memoria del montón de JavaScript de todos los trabajadores dedicados iniciados por esta página. No obstante, incluso un objeto pequeño puede retener una gran cantidad de memoria indirectamente, lo que evita que el proceso automático de recolección de elementos no utilizados elimine otros objetos.

### Retained Size

Este es el tamaño de la memoria que queda libre después de la eliminación de un objeto y los objetos que dependen de él a los que no se podía llegar desde las **raíces del GC**.

Las **raíces del GC** constan de *controladores* (locales o globales) que se crean cuando se hace referencia desde el código nativo a un objeto de JavaScript fuera de V8. Todos estos controladores se pueden encontrar en una captura de pantalla del montón en **GC roots** > **Handle scope** y **GC roots** > **Global handles**. Describir los controladores en esta documentación sin entrar en detalles de la implementación del navegador puede ser confuso. No tienes que preocuparte por las raíces del GC ni los controladores.

Existen muchas raíces internas del GC, la mayoría de las cuales no son interesantes para los usuarios. Desde el punto de vista de las aplicaciones, se pueden encontrar los siguientes tipos de raíces:

* Objeto global de la ventana (en cada iframe). Las capturas de pantalla del montón cuentan con un campo de distancia, que es la cantidad de referencias a propiedades en la ruta de acceso de retención más corta desde la ventana.

* Árbol del DOM del documento que consiste en todos los nodos del DOM nativos que se pueden alcanzar recorriendo el documento. Es posible que no todos tengan contenedores JS, pero si los tienen existirán mientras el documento exista.

* A veces, el contexto del depurador y la consola de DevTools pueden retener los objetos (p. ej., después de la evaluación de la consola). Crea capturas de pantalla con una consola vacía y sin puntos de interrupción activos en el depurador.

El gráfico de la memoria comienza con una raíz, que puede ser el objeto `window` del navegador o el objeto `Global` de un módulo de Node.js. No controlas la manera en que el GC elimina este objeto raíz.

![El objeto raíz no se puede controlar.](imgs/dontcontrol.png)

El GC elimina todo aquello que la raíz no puede alcanzar.

Note: Las columnas Shallow Size y Retained Size representan datos en bytes.

## Árbol de retención de objetos

El montón es una red de objetos interconectados. En el mundo matemático, esta estructura se denomina *gráfico* o “gráfico de memoria”. Un gráfico se construye a partir de *nodos* conectados por medio de *bordes*. A ambos se les asignan etiquetas.

* Los **nodos** (*u objetos*) se etiquetan con el nombre de la función *constructor* empleada para compilarlos.
* Los **bordes** se etiquetan con el nombre de *propiedades*.

Aprende [cómo registrar un perfil con el generador de perfiles de montón](/web/tools/chrome-devtools/profile/memory-problems/heap-snapshots).
Entre algunas cosas que llaman la atención
en el generador de perfiles del siguiente registro, se incluye la distancia:
la distancia desde la raíz del GC.
Si casi todos los objetos del mismo tipo están a la misma distancia,
pero unos pocos están a una distancia mayor, eso es algo que vale la pena investigar.

![Distancia desde la raíz](imgs/root.png)

## Dominadores

Los objetos dominadores constan de una estructura de árbol porque cada objeto tiene exactamente un denominador. Un denominador de un objeto puede no tener referencias directas a un objeto que domina; es decir, el árbol del dominador no es un árbol de expansión del gráfico.

En el siguiente diagrama:

* El nodo 1 domina al 2.
* El nodo 2 domina al 3, al 4 y al 6.
* El nodo 3 domina al 5.
* El nodo 5 domina al 8.
* El nodo 6 domina al 7.

![Estructura del árbol del dominador](imgs/dominatorsspanning.png)

En el siguiente ejemplo, el nodo `#3` es el dominador del nodo `#10`, pero el nodo `#7` aparece en todas las rutas de acceso desde el GC al nodo `#10`. Por lo tanto, un objeto B es un dominador de un objeto A si B aparece en todas las rutas de acceso desde la raíz al objeto A.

![Ilustración animada del dominador](imgs/dominators.gif)

## Información específica de V8

Cuando se realiza un perfil de una memoria, es útil comprender por qué las capturas de pantalla del montón se ven de determinada manera. Esta sección describe algunos temas sobre la memoria relacionados específicamente con la **máquina virtual de JavaScript V8** (VM de V8 o VM).

### Representación de los objetos de JavaScript

Existen tres tipos primitivos:

* números (p. ej., 3.14159...);
* booleanos (true o false);
* cadenas (p. ej., “Werner Heisenberg”)

No pueden hacer referencia a otros valores y siempre son hojas o nodos finales.

Los **números** se pueden almacenar de las siguientes maneras:

* Un valor entero inmediato de 31 bits denominado **valor entero pequeño** (*SMI*).
* Objetos del montón, a los que se hace referencia como **números del montón**. Los números del montón se usan para guardar valores que no se adecúan a la forma del SMI, como *valores dobles*, o cuando un valor necesita que se lo *encuadre*, por ejemplo, asignándole propiedades.

Las **cadenas** se pueden almacenar de las siguientes maneras:

* En el **montón de VM**.
* Externamente, en la **memoria del representador**. Un *objeto contenedor* se crea y usa para acceder a almacenamiento externo donde, por ejemplo, se guardan códigos de secuencias de comandos y otro contenido que se recibe desde la Web, en lugar de copiar el contenido en el montón de la VM.

La memoria para los objetos de JavaScript nuevos se asigna de un montón de JavaScript dedicado (o **montón de VM**). Estos objetos son controlados por el GC de V8 y, por lo tanto, permanecerán activos mientras haya, por lo menos, una referencia fuerte a ellos.

Los **objetos nativos** son todo lo demás que no está en el montón de JavaScript. Un objeto nativo, a diferencia de un objeto del montón, no es controlado por el GC de V8 durante su tiempo de vigencia, y solo se puede acceder a él desde JavaScript con el objeto contenedor de JavaScript.

**Cons string** es un objeto que consiste de pares de cadenas almacenadas y posteriormente unidas, cuyo resultado es una concatenación. La unión del contenido del objeto *cons string* solo se produce cuando es necesario. Un ejemplo sería cuando se debe construir una subcadena de una cadena unida.

Por ejemplo, si concatenas **a** y **b**, obtienes la cadena (a, b) que representa el resultado de la concatenación. Si posteriormente concatenas **d** con el resultado, obtienes otra cons string ((a, b), d).

**Matrices**: una matriz es un objeto con claves numéricas. Estos se usan ampliamente en el VM de V8 para almacenar grandes cantidades de datos. Las matrices realizan copias de seguridad de conjuntos de pares de clave-valor que se usan como diccionarios.

Un objeto típico de JavaScript puede ser uno de dos tipos de matrices que se usan para almacenamiento:

* propiedades con nombre; y
* elementos numéricos

Cuando hay una cantidad muy pequeña de propiedades, se la puede almacenar internamente en el objeto de JavaScript.

**Map**: un objeto que describe el tipo de objeto y su diseño. Por ejemplo, los objetos map se usan para describir jerarquías de objetos implícitas para [acceso rápido a las propiedades](/v8/design.html#prop_access).

### Grupos de objetos

Cada grupo de objetos nativos consta de objetos que tienen referencias manuales entre sí. Considera, por ejemplo, un árbol del DOM en el cual cada nodo tiene un vínculo a su nodo primario y vínculos al siguiente nodo secundario y al siguiente nodo del mismo nivel. De esta manera, se forma un gráfico conectado. Ten en cuenta que los objetos nativos no se representan en el montón JavaScript; por ello, no tienen tamaño. En cambio, se crean objetos contenedores.

Cada objeto contenedor tiene una referencia al objeto nativo correspondiente para redireccionarle comandos. A su vez, un grupo de objetos tiene objetos contenedores. Sin embargo, esto no crea un ciclo que no se pueda recolectar, ya que el GC es suficientemente inteligente para liberar grupos de objetos a cuyos contenedores ya no se hace referencia. Sin embargo, si se olvida liberar un contenedor se mantendrán todo el grupo y los contenedores asociados.



{# wf_devsite_translation #}
