project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: "Las promesas simplifican cómputos diferidos y asincrónicos. Una promesa representa una operación que aún no se completó."

{# wf_published_on: 2013-12-16 #}
{# wf_updated_on: 2017-07-12 #}

# Promesas de JavaScript: introducción {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Damas y caballeros, prepárense para un momento esencial de la historia del
desarrollo web.

<em>[Redoble de tambores]</em>

¡Las promesas han llegado a JavaScript de manera nativa!

<em>[Fuegos artificiales, lluvia de papeles y exaltación de la multitud]</em>

En este momento, te encuentras ante una de estas situaciones:

* La gente festeja a tu alrededor, pero no conoces el motivo del alboroto. Tal vez ni siquiera sepas qué es una “promesa”. Te encoges de hombros, pero el peso de la lluvia de papeles se siente. Si este es el caso, no te preocupes. Me tomó años descubrir por qué todo esto debería importarme. Probablemente te convenga empezar por el [principio](#whats-all-the-fuss-about).
* Te embarga la alegría. Era hora, ¿no es así? Ya has usado estas promesas, pero te molesta que todas las implementaciones usen API con pequeñas diferencias. ¿Cuál es la API para la versión oficial de JavaScript? Probablemente te convenga empezar por la [terminología](#promise-terminology).
* Ya sabías todo esto y te burlas de los que están saltando de felicidad porque recién se enteran. Tomate un momento para disfrutar de tu propia superioridad, luego dirígete a la [referencia de API](#promise-api-reference).

## ¿Por qué tanto escándalo? {: #whats-all-the-fuss-about }

JavaScript es de un solo hilo, es decir, dos porciones de secuencia de comandos no se pueden ejecutar al mismo tiempo, tienen que ejecutarse uno después del otro. En navegadores, JavaScript comparte un hilo con una carga de otras cosas que difiere de navegador en navegador. Pero, generalmente, JavaScript se encuentra en la misma cola que la pintura, la actualización de estilos y el control de acciones de usuario (como destacar texto e interactuar con controles de formulario). La actividad en uno de estos elementos retarda a los otros.

Como ser humano, tienes capacidades de multiproceso. Puedes escribir con varios dedos; también conducir y hablar al mismo tiempo. La única función que nos bloquea es el estornudo: toda actividad en desarrollo se debe suspender durante un estornudo. Bastante molesto, en especial al conducir y tratar de llevar una conversación. No te convendrá escribir código que produzca estornudos.

Probablemente hayas usado eventos y callbacks para evitarlo. Estos son algunos eventos:

    var img1 = document.querySelector('.img-1');

    img1.addEventListener('load', function() {
      // woo yey image loaded
    });

    img1.addEventListener('error', function() {
      // argh everything's broken
    });


No hay estornudos. Obtenemos la imagen y agregamos algunos de receptores. JavaScript puede detenerse hasta que se llame a alguno de estos receptores.

Por desgracia, en el ejemplo anterior, es posible que los eventos ocurran antes de que comencemos a escucharlos. Por eso, debemos solucionar este problema usando la propiedad “complete” de las imágenes:

    var img1 = document.querySelector('.img-1');

    function loaded() {
      // woo yey image loaded
    }

    if (img1.complete) {
      loaded();
    }
    else {
      img1.addEventListener('load', loaded);
    }

    img1.addEventListener('error', function() {
      // argh everything's broken
    });

Esto no captura imágenes que generaron n error antes de que pudiéramos escucharlas. Lamentablemente, el DOM no nos brinda una forma de hacerlo. Además, en este ejemplo, solo intentamos cargar una imagen. La complejidad aumenta aún más cuando deseamos saber cuándo se cargó un conjunto de imágenes.


## Los eventos no son siempre la mejor solución

Los eventos son excelentes para cosas que pueden suceder varias veces en el mismo objeto: keyup, touchstart, etc. En estos eventos, no interesa saber realmente lo que ocurrió antes de adjuntar el receptor. Pero si se trata de éxito/fallo asincrónico, idealmente, querrás algo así:

    img1.callThisIfLoadedOrWhenLoaded(function() {
      // loaded
    }).orIfFailedCallThis(function() {
      // failed
    });

    // and…
    whenAllTheseHaveLoaded([img1, img2]).callThis(function() {
      // all loaded
    }).orIfSomeFailedCallThis(function() {
      // one or more failed
    });

Las promesas hacen eso, aunque con una mejor nomenclatura. Si los elementos de imagen HTML tuviesen un método "listo" que mostrara una promesa, podríamos hacer lo siguiente:

    img1.ready().then(function() {
      // loaded
    }, function() {
      // failed
    });

    // and…
    Promise.all([img1.ready(), img2.ready()]).then(function() {
      // all loaded
    }, function() {
      // one or more failed
    });


Fundamentalmente, las promesas se parecen un poco a los receptores de eventos, a excepción de lo siguiente:

* Una promesa solo puede completarse con éxito o fallar una vez. No puede completarse con éxito o fallar dos veces, ni puede pasar de exitoso a fallido ni viceversa.
* Si una promesa se ha completado con éxito o ha fallado y luego agregas un callback de exitoso/fallido, se llamará al callback correcto, a pesar de que el evento haya sucedido antes.

Esto es extremadamente útil para el éxito o fracaso de procesos asincrónicos porque es menos importante el momento exacto de la disponibilidad que la reacción ante el resultado.


## Terminología de promesa {: #promise-terminology }

[Domenic Denicola](https://twitter.com/domenic) corrigió el primer borrador de este artículo y obtuve un “Desaprobado” en terminología. Me puso en penitencia, me obligó a copiar [States y Fates](https://github.com/domenic/promises-unwrapping/blob/master/docs/states-and-fates.md) cien veces y escribió una nota con preocupación para mis padres. A pesar de todo esto, sigo confundiendo la terminología, pero estos son los conceptos básicos:

Una promesa puede ser de estas clases:

* **fulfilled (cumplida)**: la acción relacionada con la promesa se completa con éxito.
* **rejected (rechazada)**: la acción relacionada con la promesa no se completa con éxito.
* **pending (pendiente)**: aún no se completa ni se rechaza.
* **settled (finalizada)**: se completa o se rechaza.


En [las especificaciones](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-promise-objects), también aparece el término **thenable** para describir un objeto parecido a una promesa porque tiene un método `then`. Este término me recuerda a [Terry Venables](https://en.wikipedia.org/wiki/Terry_Venables), un ex entrenador de fútbol de Inglaterra, así que lo usaré lo menos posible.


## ¡Llegaron las promesas a JavaScript!

Hace tiempo que las promesas existen en forma de bibliotecas. Las siguientes son algunas:

* [Q](https://github.com/kriskowal/q)
* [when](https://github.com/cujojs/when)
* [WinJS](https://msdn.microsoft.com/en-us/library/windows/apps/br211867.aspx)
* [RSVP.js](https://github.com/tildeio/rsvp.js)

Estas bibliotecas y las promesas de JavaScript tienen en común un comportamiento estandarizado llamado [Promises/A+](https://github.com/promises-aplus/promises-spec). Si usas jQuery, encontrarás algo similar llamado [Deferred](https://api.jquery.com/category/deferred-object/). Sin embargo, Deferred no cumple con Promise/A+, por lo cual [es un tanto diferente y menos útil](https://thewayofcode.wordpress.com/tag/jquery-deferred-broken/), así que ten cuidado. jQuery también tiene un [tipo Promise](https://api.jquery.com/Types/#Promise), pero solo se trata de un subconjunto de Deferred y no funciona muy bien.

Si bien las implementaciones de las promesas cumplen con un comportamiento estandarizado, las API generales son diferentes. Las API de las promesas de JavaScript son similares a las de RSVP.js. Así se crea una promesa:

    var promise = new Promise(function(resolve, reject) {
      // do a thing, possibly async, then…

      if (/* everything turned out fine */) {
        resolve("Stuff worked!");
      }
      else {
        reject(Error("It broke"));
      }
    });


El constructor de la promesa recibe un argumento: un callback con dos parámetros (resolve y reject). A continuación, se hace algo con el callback (tal vez un proceso asincrónico) y se llama a resolve si todo funciona bien o a reject si esto no sucede.

Como en `throw` del JavaScript que todos conocemos, es costumbre (aunque no obligación) aplicar reject con un objeto Error. La ventaja de los objetos Error es que capturan un seguimiento de pila; de esta forma, las herramientas de depuración son más útiles.

Así se usa esta promesa:

    promise.then(function(result) {
      console.log(result); // "Stuff worked!"
    }, function(err) {
      console.log(err); // Error: "It broke"
    });


`then()` recibe dos argumentos: un callback para cuando se tiene éxito y otro para cuando sucede lo contrario. Ambos son opcionales; puedes agregar un callback solo para cuando se tiene éxito o se produce una falla.

Las promesas de JavaScript empezaron en DOM como “Future”, se les cambió el nombre a “Promise” y, finalmente, se trasladaron a JavaScript. Es fabuloso contar con ellas en lugar del DOM en JavaScript porque estarán disponibles en contextos de JS sin navegador, como Node.js (si se usan en sus API centrales, es otra cuestión).

Si bien son una funcionalidad de JavaScript, el DOM las usa sin problemas cuando las necesita. De hecho, todas las nuevas API de DOM con métodos de éxito o falla asincrónicos usan promesas. Esto ya ocurre en la [gestión de cuotas](https://dvcs.w3.org/hg/quota/raw-file/tip/Overview.html#idl-def-StorageQuota), los [eventos de carga de fuentes](http://dev.w3.org/csswg/css-font-loading/#font-face-set-ready), [ServiceWorker](https://github.com/slightlyoff/ServiceWorker/blob/cf459d473ae09f6994e8539113d277cbd2bce939/service_worker.ts#L17), [Web MIDI](https://webaudio.github.io/web-midi-api/#widl-Navigator-requestMIDIAccess-Promise-MIDIOptions-options), las [transmisiones](https://github.com/whatwg/streams#basereadablestream) y más.


## Compatibilidad con navegadores y polyfill

En la actualidad, ya existen implementaciones de promesas en los navegadores.

A partir de Chrome 32, Opera 19, Firefox 29, Safari 8 y Microsoft Edge, las promesas vienen habilitadas de forma predeterminada.

Consulta [el polyfill](https://github.com/jakearchibald/ES6-Promises#readme) (archivo gzip de 2 KB) si deseas que los navegadores sin implementaciones completas de promesas cumplan con las especificaciones, o si quieres agregar promesas a otros navegadores y Node.js.


## Compatibilidad con otras bibliotecas

La API de las promesas de JavaScript tratará a todos los elementos con un método `then()` como si fueran promesas (o `thenable`, si se usa el _idioma_ de las promesas). Por lo tanto, no habrá problema si usas una biblioteca que muestra una promesa Q; funcionará bien con las nuevas promesas de JavaScript.

A pesar de que, como mencioné, los Deferreds de jQuery son un poco… inútiles. Afortunadamente, puedes transmitirlos a las promesas convencionales. Vale la pena hacerlo lo más pronto posible.


    var jsPromise = Promise.resolve($.ajax('/whatever.json'))


En este caso, `$.ajax` de jQuery muestra un elemento Deferred. Ya que tiene un método `then()`, `Promise.resolve()` puede convertirlo en una promesa de JavaScript. Sin embargo, algunos deferreds pasan varios argumentos a sus callbacks, por ejemplo:

    var jqDeferred = $.ajax('/whatever.json');

    jqDeferred.then(function(response, statusText, xhrObj) {
      // ...
    }, function(xhrObj, textStatus, err) {
      // ...
    })



En cambio, las promesas de JS ignoran todos menos el primero:


    jsPromise.then(function(response) {
      // ...
    }, function(xhrObj) {
      // ...
    })



Afortunadamente, esto suele ser lo que quieres o, al menos, te brinda acceso a lo que quieres. Además, ten en cuenta que jQuery no sigue la convención de pasar objetos Error a rechazos.


## Código asincrónico complejo más simple

Comencemos a escribir algo de código. Supongamos que deseamos hacer lo siguiente:

1. Iniciar un indicador de carga para indicar que esta se encuentra en curso
1. Obtener algunos JSON para una historia, que nos proporciona el título y URL para cada capítulo
1. Agregar un título a la página
1. Obtener cada capítulo
1. Agregar la historia a la página
1. Detener el indicador de carga.

...pero también dile al usuario si algo salió mal en el camino. También deberemos detener el indicador de carga en ese momento. De lo contrario, seguirá girando, experimentará errores y finalmente fallará en otra UI.

Por supuesto que no usarías JavaScript para proporcionar una historia, considerando que el lenguaje [HTML es más rápido](https://jakearchibald.com/2013/progressive-enhancement-is-faster/), pero este patrón es bastante común cuando se trabaja con diferentes API: realizar varias búsquedas de datos y hacer algo cuando se termine.

Para comenzar, analicemos la obtención de datos desde la red:

## Promesas en XMLHttpRequest

Las API anteriores se actualizarán para usar promesas y si es posible, se hará de forma que sean compatibles con versiones anteriores. `XMLHttpRequest` es una gran candidata. Mientras tanto, no obstante, redactaremos una función simple para realizar una solicitud GET:



    function get(url) {
      // Return a new promise.
      return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
          // This is called even on 404 etc
          // so check the status
          if (req.status == 200) {
            // Resolve the promise with the response text
            resolve(req.response);
          }
          else {
            // Otherwise reject with the status text
            // which will hopefully be a meaningful error
            reject(Error(req.statusText));
          }
        };

        // Handle network errors
        req.onerror = function() {
          reject(Error("Network Error"));
        };

        // Make the request
        req.send();
      });
    }


Ahora la usaremos:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.error("Failed!", error);
    })


[Haz clic aquí para ver eso en acción](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }, consulta la consola en DevTools para ver el resultado. Ahora podemos hacer solicitudes HTTP sin escribir `XMLHttpRequest` de forma manual. Esto es fabuloso, porque mientras menos tenga que ver la exasperante tipografía de `XMLHttpRequest` más feliz seré.


## Encadenamiento

`then()` no es el final del camino. Puedes encadenar varios `then` para transformar valores o ejecutar acciones asincrónicas adicionales una tras otra.


### Transformar valores
Puedes transformar valores mostrando simplemente el nuevo valor:

    var promise = new Promise(function(resolve, reject) {
      resolve(1);
    });

    promise.then(function(val) {
      console.log(val); // 1
      return val + 2;
    }).then(function(val) {
      console.log(val); // 3
    })


A modo de ejemplo práctico, volvamos al código anterior:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    })



La respuesta es un JSON, pero lo recibimos como texto sin formato. Podríamos alterar la función GET para que use el [`responseType`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest#responseType) de JSON, pero también podríamos resolverlo en el ámbito de las promesas:

    get('story.json').then(function(response) {
      return JSON.parse(response);
    }).then(function(response) {
      console.log("Yey JSON!", response);
    })



Dado que `JSON.parse()` recibe un solo argumento y muestra un valor transformado, podemos crear un método abreviado:

    get('story.json').then(JSON.parse).then(function(response) {
      console.log("Yey JSON!", response);
    })


[Observa eso en acción aquí](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/story.json){: target="_blank" .external }, consulta la consola en DevTools para ver el resultado. De hecho, sería muy fácil hacer una función `getJSON()`:


    function getJSON(url) {
      return get(url).then(JSON.parse);
    }

`getJSON()` sigue mostrando una promesa; se trata de una promesa que obtiene una URL y, a continuación, analiza la respuesta como un JSON.


### Poner en cola acciones asíncronas

También puedes encadenar los `then` para ejecutar acciones asincrónicas en secuencia.

Cuando muestras algo de un callback `then()`, sucede algo mágico. Si muestras un valor, el siguiente `then()` se llama con ese valor. Sin embargo, si muestras algo parecido a una promesa, el siguiente `then()` lo espera, y solo se lo llama cuando esa promesa se detiene (se completa con éxito/falla). Por ejemplo:

    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      console.log("Got chapter 1!", chapter1);
    })



En este ejemplo, se realiza una solicitud asincrónica a `story.json`, que nos proporciona un conjunto de URL que podemos solicitar. A continuación, se solicita la primera URL. En este momento, las promesas realmente comienzan a destacarse frente a los patrones de callbacks simples.

Puedes, incluso, crear un método abreviado para obtener capítulos:

    var storyPromise;

    function getChapter(i) {
      storyPromise = storyPromise || getJSON('story.json');

      return storyPromise.then(function(story) {
        return getJSON(story.chapterUrls[i]);
      })
    }

    // and using it is simple:
    getChapter(0).then(function(chapter) {
      console.log(chapter);
      return getChapter(1);
    }).then(function(chapter) {
      console.log(chapter);
    })


No descargaremos `story.json` hasta que se llame a `getChapter`, pero las próximas veces que se llame a `getChapter`, reutilizaremos la promesa de la historia, por lo cual `story.json` solo se obtendrá una sola vez. ¡Vivan las promesas!


## Administración de errores

Como vimos antes, `then()` toma dos argumentos: uno por éxito y uno por falla (o completado y rechazado, hablando de promesas):

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }, function(error) {
      console.log("Failed!", error);
    })


También puedes usar `catch()`:


    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).catch(function(error) {
      console.log("Failed!", error);
    })


`catch()` no tiene nada especial, es un recubrimiento para `then(undefined, func)`, pero es más razonable. Ten en cuenta que los dos ejemplos de códigos anteriores no se comportan de la misma manera; el último equivale a lo siguiente:

    get('story.json').then(function(response) {
      console.log("Success!", response);
    }).then(undefined, function(error) {
      console.log("Failed!", error);
    })


La diferencia es sutil, pero extremadamente útil. Los rechazos de promesas avanzan al siguiente `then()` con un callback de rechazo (o `catch()`, ya que es equivalente). Con `then(func1, func2)`, se llamará a `func1` o a `func2`, nunca a los dos elementos. Sin embargo, con `then(func1).catch(func2)` se llamará a ambos si se rechaza `func1`, ya que son pasos separados de la cadena. Supongamos lo siguiente:


    asyncThing1().then(function() {
      return asyncThing2();
    }).then(function() {
      return asyncThing3();
    }).catch(function(err) {
      return asyncRecovery1();
    }).then(function() {
      return asyncThing4();
    }, function(err) {
      return asyncRecovery2();
    }).catch(function(err) {
      console.log("Don't worry about it");
    }).then(function() {
      console.log("All done!");
    })



El flujo anterior es muy similar al try/catch de JavaScript normal, los errores que suceden dentro de un "try" van inmediatamente al bloque `catch()`. A continuación, explico lo anterior en un diagrama de flujo (porque me encantan estos diagramas):


<div style="position: relative; padding-top: 93%;">
  <iframe style="position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden" src="imgs/promise-flow.svg" frameborder="0" allowtransparency="true"></iframe>
</div>


Sigue las líneas azules para las promesas que se cumplan o las rojas para las que se rechacen.

### Promesas y excepciones de JavaScript
Los rechazos se producen cuando se rechaza a una promesa de forma explícita, pero también de forma implícita si aparece un error en el callback del constructor:

    var jsonPromise = new Promise(function(resolve, reject) {
      // JSON.parse throws an error if you feed it some
      // invalid JSON, so this implicitly rejects:
      resolve(JSON.parse("This ain't JSON"));
    });

    jsonPromise.then(function(data) {
      // This never happens:
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })


Esto significa que resulta útil realizar todo el trabajo relacionado con las promesas dentro del callback del constructor de la promesa para que los errores se detecten automáticamente y se conviertan en rechazos.

Lo mismo sucede con los errores arrojados en callbacks `then()`.

    get('/').then(JSON.parse).then(function() {
      // This never happens, '/' is an HTML page, not JSON
      // so JSON.parse throws
      console.log("It worked!", data);
    }).catch(function(err) {
      // Instead, this happens:
      console.log("It failed!", err);
    })



### Administración de errores en la práctica

En nuestro ejemplo de historia y capítulos, podemos usar catch para mostrar un error al usuario.



    getJSON('story.json').then(function(story) {
      return getJSON(story.chapterUrls[0]);
    }).then(function(chapter1) {
      addHtmlToPage(chapter1.html);
    }).catch(function() {
      addTextToPage("Failed to show chapter");
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })



Si la obtención de `story.chapterUrls[0]` falla (p. ej., http 500 o el usuario están sin conexión), omitirá los siguientes callbacks exitosos, lo que incluye el de `getJSON()` que intenta analizar la respuesta como JSON, y también omite el callback que agrega chapter1.html a la página. Como alternativa, se trasladará al callback de catch. Como resultado, se agregará “Failed to show chapter” (no se pudo mostrar el capítulo) a la página si falla alguna de las acciones anteriores.

Como Try/Catch de JavaScript, se detecta el error y continúa el código siguiente; el indicador de carga está siempre oculto. Esto es lo que deseamos. Lo anterior se convierte en una versión asincrónica y sin bloqueo de lo siguiente:

    try {
      var story = getJSONSync('story.json');
      var chapter1 = getJSONSync(story.chapterUrls[0]);
      addHtmlToPage(chapter1.html);
    }
    catch (e) {
      addTextToPage("Failed to show chapter");
    }
    document.querySelector('.spinner').style.display = 'none'


Tal vez quieras `catch()` sencillamente con fines de registro, sin recuperar del error. Para hacer esto, solo debes reproducir el error. Podríamos hacer esto en nuestro método `getJSON()`:



    function getJSON(url) {
      return get(url).then(JSON.parse).catch(function(err) {
        console.log("getJSON failed for", url, err);
        throw err;
      });
    }


Hemos logrado obtener un capítulo, pero deseamos obtenerlos a todos. Hagámoslo.


## Paralelismo y secuencia: sacar lo mejor de ambos


No es fácil aplicar un razonamiento asincrónico. Si tienes problemas para dar el primer paso, intenta escribir el código como si fuera sincrónico. En este caso, sería así:

    try {
      var story = getJSONSync('story.json');
      addHtmlToPage(story.heading);

      story.chapterUrls.forEach(function(chapterUrl) {
        var chapter = getJSONSync(chapterUrl);
        addHtmlToPage(chapter.html);
      });

      addTextToPage("All done");
    }
    catch (err) {
      addTextToPage("Argh, broken: " + err.message);
    }

    document.querySelector('.spinner').style.display = 'none'

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external }


Eso funciona (consulta el [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/sync-example.html){: target="_blank" .external })
Pero es sincrónico y bloquea el navegador durante las descargas. Para hacer que este
trabajo sea asincrónico usamos `then()` para que las cosas sucedan una tras otra.

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // TODO: for each url in story.chapterUrls, fetch &amp; display
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })



¿Cómo podemos, no obstante, recorrer todas las URL de los capítulos y obtenerlas en orden? Esto **no funciona**:

    story.chapterUrls.forEach(function(chapterUrl) {
      // Fetch chapter
      getJSON(chapterUrl).then(function(chapter) {
        // and add it to the page
        addHtmlToPage(chapter.html);
      });
    })



`forEach` no sirve para procesos asincrónicos: los capítulos aparecerían en el orden en que se descargaron; básicamente, de la misma manera en que se redactó el guión de Pulp Fiction). Esto no es Pulp Fiction, así que solucionémoslo.


### Creación de una secuencia
Debemos convertir nuestra matriz de `chapterUrls` en una secuencia de promesas. Podemos hacerlo usando `then()`:

    // Start off with a promise that always resolves
    var sequence = Promise.resolve();

    // Loop through our chapter urls
    story.chapterUrls.forEach(function(chapterUrl) {
      // Add these actions to the end of the sequence
      sequence = sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    })


Esta es la primera vez que vemos `Promise.resolve()`: crea una promesa que se resuelva al valor proporcionado. Si le pasas una instancia de `Promise`, simplemente se devolverá (**nota:** se trata de un cambio en las especificaciones que aún no aplican algunas implementaciones). Si le pasas algo similar a una promesa (tiene un método `then()`), crea una `Promise` genuina que se cumple/rechaza de la misma forma. Si le pasas otro valor, p. ej., `Promise.resolve('Hello')`, crea una promesa que se cumple con ese valor. Si la llamas sin ningún valor, como lo hicimos antes, se cumple con “undefined”.


También existe `Promise.reject(val)`, que crea una promesa que se rechaza con el valor proporcionado (o “undefined”).

Podemos ordenar el código anterior con [`array.reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce):



    // Loop through our chapter urls
    story.chapterUrls.reduce(function(sequence, chapterUrl) {
      // Add these actions to the end of the sequence
      return sequence.then(function() {
        return getJSON(chapterUrl);
      }).then(function(chapter) {
        addHtmlToPage(chapter.html);
      });
    }, Promise.resolve())



Cumple la misma función que el ejemplo anterior, pero no requiere la otra variable “sequence”.ׅ Llamamos al callback “reduce” para cada elemento de la matriz. “sequence” se resuelve con `Promise.resolve()` la primera vez, pero en el resto de las llamadas, tendrá el valor que hayamos obtenido en la llamada anterior. `array.reduce` es realmente útil para reducir una matriz a un solo valor: en este caso, una promesa.

Juntemos todo:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      return story.chapterUrls.reduce(function(sequence, chapterUrl) {
        // Once the last chapter's promise is done…
        return sequence.then(function() {
          // …fetch the next chapter
          return getJSON(chapterUrl);
        }).then(function(chapter) {
          // and add it to the page
          addHtmlToPage(chapter.html);
        });
      }, Promise.resolve());
    }).then(function() {
      // And we're all done!
      addTextToPage("All done");
    }).catch(function(err) {
      // Catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      // Always hide the spinner
      document.querySelector('.spinner').style.display = 'none';
    })

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }

Y allí la tenemos (consulta el [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-example.html){: target="_blank" .external }), una versión totalmente asincrónica de la versión sincrónica. Pero podemos obtener un resultado mejor. En este momento, nuestra página realiza descargas de la siguiente forma:


<figure>
  <img src="imgs/promise1.gif">
</figure>

Los navegadores son bastante buenos para descargar varias cosas al mismo tiempo. Si descargamos los capítulos uno tras otro, significa que estamos perdiendo rendimiento. Lo ideal es descargarlos al mismo tiempo y procesarlos cuando todos hayan terminado de descargarse. Afortunadamente, existe una API que permite hacerlo:


    Promise.all(arrayOfPromises).then(function(arrayOfResults) {
      //...
    })



`Promise.all` recibe una matriz de promesas y crea una promesa que se cumple cuando todas se completan con éxito. Se obtiene una matriz de resultados (independientemente de lo que se usó para cumplir con la promesa) en el mismo orden que las promesas que pasaste.



    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Take an array of promises and wait on them all
      return Promise.all(
        // Map our array of chapter urls to
        // an array of chapter json promises
        story.chapterUrls.map(getJSON)
      );
    }).then(function(chapters) {
      // Now we have the chapters jsons in order! Loop through…
      chapters.forEach(function(chapter) {
        // …and add to the page
        addHtmlToPage(chapter.html);
      });
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened so far
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }

Según la conexión, esto puede ser algunos segundos más rápido que cargar uno por uno (consulta el [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-all-example.html){: target="_blank" .external }), y tiene menos código que nuestro primer intento. Los capítulos se pueden descargar en cualquier orden, pero aparecen en la pantalla en el orden adecuado.


<figure>
  <img src="imgs/promise2.gif">
</figure>

Sin embargo, podemos mejorar aún más el rendimiento percibido. Cuando llega el capítulo uno, se debe agregar a la página. De esta forma, el usuario puede comenzar a leer antes de que llegue el resto de los capítulos. Cuando llega el capítulo tres, no lo agregamos a la página porque es posible que el usuario no se dé cuenta de que falta el capítulo dos. Cuando llega el capítulos dos, se pueden agregar el capítulo dos, tres, etc.

Para poder hacerlo, se obtiene el JSON de todos los capítulos al mismo tiempo. Después, se crea una secuencia para agregarlos al documento:

    getJSON('story.json').then(function(story) {
      addHtmlToPage(story.heading);

      // Map our array of chapter urls to
      // an array of chapter json promises.
      // This makes sure they all download parallel.
      return story.chapterUrls.map(getJSON)
        .reduce(function(sequence, chapterPromise) {
          // Use reduce to chain the promises together,
          // adding content to the page for each chapter
          return sequence.then(function() {
            // Wait for everything in the sequence so far,
            // then wait for this chapter to arrive.
            return chapterPromise;
          }).then(function(chapter) {
            addHtmlToPage(chapter.html);
          });
        }, Promise.resolve());
    }).then(function() {
      addTextToPage("All done");
    }).catch(function(err) {
      // catch any error that happened along the way
      addTextToPage("Argh, broken: " + err.message);
    }).then(function() {
      document.querySelector('.spinner').style.display = 'none';
    })

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }

Y allí vamos (consulta el [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-best-example.html){: target="_blank" .external }), ¡el mejor de ambos! Se tarda lo mismo en entregar todo el contenido, pero el usuario obtiene la primera parte de este antes.


<figure>
  <img src="imgs/promise3.gif">
</figure>

En este ejemplo trivial, todos los capítulos llegan casi al mismo tiempo, pero el beneficio de mostrar uno a la vez se potenciará cuando haya más cantidad de capítulos o estos sean más extensos.


Si hacemos lo mismo con [eventos o callbacks al estilo Node.js](https://gist.github.com/jakearchibald/0e652d95c07442f205ce), necesitaremos casi el doble de código y, lo que es más importante, no será tan fácil de seguir. Sin embargo, ese no es el fin de la historia de las promesas, cuando se combinan con otras funciones de ES6 se hacen más fáciles aun.


## Ronda extra: promesas y generadores


En la sección que sigue aparecen muchas funciones nuevas de ES6, pero no hace falta que las entiendas ahora para poder usar promesas en tu código. Considérala como un avance cinematográfico de las próximas funciones que serán un éxito de taquilla.

ES6 también nos brinda [generadores](http://wiki.ecmascript.org/doku.php?id=harmony:generators), que les permiten a las funciones salir en un punto en especial, como "mostrar", pero luego reanudan desde el mismo punto y estado, por ejemplo:



    function *addGenerator() {
      var i = 0;
      while (true) {
        i += yield i;
      }
    }


Observa el asterisco antes del nombre de la función. El asterisco indica que es un generador. La palabra clave yield es nuestro punto de retorno o reanudación. Podemos usarla de la siguiente manera:

    var adder = addGenerator();
    adder.next().value; // 0
    adder.next(5).value; // 5
    adder.next(5).value; // 10
    adder.next(5).value; // 15
    adder.next(50).value; // 65


¿Pero qué significa todo esto para las promesas? Puedes usar este comportamiento que hace posible el retorno o la reanudación para escribir código asíncrono que parezca código sincrónico y sea igual de fácil de seguir. No te preocupes demasiado por comprenderlo línea por línea, pero hay una función de ayuda que nos permite usar `yield` para esperar que las promesas se detengan:

    function spawn(generatorFunc) {
      function continuer(verb, arg) {
        var result;
        try {
          result = generator[verb](arg);
        } catch (err) {
          return Promise.reject(err);
        }
        if (result.done) {
          return result.value;
        } else {
          return Promise.resolve(result.value).then(onFulfilled, onRejected);
        }
      }
      var generator = generatorFunc();
      var onFulfilled = continuer.bind(continuer, "next");
      var onRejected = continuer.bind(continuer, "throw");
      return onFulfilled();
    }


…que yo [tomé literalmente de Q](https://github.com/kriskowal/q/blob/db9220d714b16b96a05e9a037fa44ce581715e41/q.js#L500), pero adapté para promesas de JavaScript. Ahora, podemos tomar nuestro mejor ejemplo de los capítulos, combinarlo con muchísimos beneficios de ES6 y convertirlo en lo siguiente:

    spawn(function *() {
      try {
        // 'yield' effectively does an async wait,
        // returning the result of the promise
        let story = yield getJSON('story.json');
        addHtmlToPage(story.heading);

        // Map our array of chapter urls to
        // an array of chapter json promises.
        // This makes sure they all download parallel.
        let chapterPromises = story.chapterUrls.map(getJSON);

        for (let chapterPromise of chapterPromises) {
          // Wait for each chapter to be ready, then add it to the page
          let chapter = yield chapterPromise;
          addHtmlToPage(chapter.html);
        }

        addTextToPage("All done");
      }
      catch (err) {
        // try/catch just works, rejected promises are thrown here
        addTextToPage("Argh, broken: " + err.message);
      }
      document.querySelector('.spinner').style.display = 'none';
    })

[Pruébalo](https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }

Esto funciona exactamente como antes, pero es más fácil de leer. Esto funciona en Chrome y Opera hoy (consulta el [código](https://github.com/googlesamples/web-fundamentals/blob/gh-pages/fundamentals/getting-started/primers/async-generators-example.html){: target="_blank" .external }), y funciona en Microsoft Edge recurriendo a `about:flags` y activando la configuración **Enable experimental JavaScript features**. Será una configuración predeterminada en próximas versiones.


Se combinan varios elementos nuevos de ES6: promesas, generadores, let, for-of, etc. Cuando producimos una promesa, el asistente de spawn espera a que se resuelva y muestra el valor final. Si se rechaza la promesa, spawn provoca una excepción en nuestra instrucción yield. Podemos detectar esta excepción con try y catch de JavaScript convencional. ¡Codificación asincrónica increíblemente simple!


Este patrón es tan útil que se incorporará a ES7 bajo la forma de [funciones asincrónicas](https://jakearchibald.com/2014/es7-async-functions/). Básicamente, es igual al código anterior, aunque no hay necesidad de usar un método `spawn`.


## Referencia de la API de promesa {: #promise-api-reference }

Todos los métodos funcionan en Chrome, Opera, Firefox, Microsoft Edge y Safari a menos que se indique lo contrario. [El polyfill](https://github.com/jakearchibald/ES6-Promises#readme) proporciona lo siguiente para todos los navegadores.


### Métodos estáticos

<table class="responsive methods">
<tr>
<th colspan="2">Resúmenes del método</th>
</tr>
<tr>
  <td><code>Promise.resolve(promise);</code></td>
  <td>Muestra una promesa (solo si <code>promise.constructor == Promise</code>)</td>
</tr>
<tr>
  <td><code>Promise.resolve(thenable);</code></td>
  <td>Crea una nueva promesa desde el thenable. Un thenable es similar a las promesas en el sentido en que tiene un método `then()`.</td>
</tr>
<tr>
  <td><code>Promise.resolve(obj);</code></td>
  <td>Haz una promesa que cumpla el <code>obj</code>. en esta situación.</td>
</tr>
<tr>
  <td><code>Promise.reject(obj);</code></td>
  <td>Haz una promesa que rechace el <code>obj</code>. Para lograr consistencia y depuración (p. ej., seguimiento de pila), <code>obj</code> debería ser un <code>instanceof Error</code>.</td>
</tr>
<tr>
  <td><code>Promise.all(array);</code></td>
  <td>Crea una promesa que se cumple cuando se cumplen todos los elementos de la matriz y se rechaza si esto sucede con alguno de ellos (el rechazo ocurre cuando se rechaza alguno de los elementos). Cada artículo de la matriz se pasa a <code>Promise.resolve</code>, para que la matriz pueda ser una mezcla de objetos estilo promesa y otros objetos. El valor de cumplimiento es una matriz (ordenada) de valores de cumplimiento. El valor de rechazo es el primero valor de rechazo.</td>
</tr>
<tr>
  <td><code>Promise.race(array);</code></td>
  <td>Haz una promesa que se cumpla tan pronto como se cumple cualquier artículo, o se rechace tan pronto como se rechaza cualquier artículo, lo que suceda primero.</td>
</tr>
</table>

Note: No me convence la utilidad de `Promise.race`, preferiría tener un opuesto de `Promise.all` que solo rechace si todos los artículos rechazan.

### Constructor

<table class="responsive constructors">
<tr>
<th colspan="2">Constructor</th>
</tr>
<tr>
  <td><code>new Promise(function(resolve, reject) {});</code></td>
  <td>
    <p>
      <code>resolve(thenable)</code><br>
      Tu promesa se cumplirá/rechazará con el resultado de <code>thenable</code>
    </p>

    <p>
      <code>resolve(obj)</code><br>
      Tu promesa se cumple con <code>obj</code>
    </p>

    <p>
      <code>reject(obj)</code><br>
      Tu promesa se rechaza con <code>obj</code>. Para lograr consistencia y
 depuración (p. ej., seguimiento de pila), obj debería ser un <code>instanceof Error</code>.
      Todos los errores que aparezcan en el callback del constructor se pasarán implícitamente
 a  <code>reject()</code>.
    </p>
  </td>
</tr>
</table>
    
### Métodos de instancias

<table class="responsive methods">
<tr>
<th colspan="2">Métodos de instancias</th>
</tr>
<tr>
  <td><code>promise.then(onFulfilled, onRejected)</code></td>
  <td>
    Se llama <code>onFulfilled</code> cuando/si la "promesa" se resuelve. Se llama 
    <code>onRejected</code> cuando/si la "promesa" se rechaza. Ambos son
    opcionales, si alguno/ambos se omiten se llama al siguiente 
    <code>onFulfilled</code>/<code>onRejected</code> de la cadena.
    Ambos callbacks tienen un único parámetro, el valor de cumplimiento o 
    motivo de rechazo. <code>then()</code> muestra una nueva promesa equivalente al 
    valor que muestras de <code>onFulfilled</code>/<code>onRejected</code>
    después de que se pasa por <code>Promise.resolve</code>. Si se arroja un error
    en el callback, la promesa que se muestra se rechaza con ese error.
  </td>
</tr>
<tr>
  <td><code>promise.catch(onRejected)</code></td>
  <td>Recubrimiento para <code>promise.then(undefined, onRejected)</code></td>
</tr>
</table>



Muchas gracias a Anne van Kesteren, Domenic Denicola, Tom Ashworth, Remy Sharp, Addy Osmani, Arthur Evans y Yutaka Hirano, quienes editaron este artículo, y realizaron correcciones y recomendaciones.

También, gracias a [Mathias Bynens](https://mathiasbynens.be/){: .external } por [actualizar varias partes](https://github.com/html5rocks/www.html5rocks.com/pull/921/files) del artículo.


{# wf_devsite_translation #}
