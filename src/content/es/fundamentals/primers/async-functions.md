project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Las funciones asincrónicas te permiten escribir un código basado en promesas como si fuese sincrónico

{# wf_published_on: 2016-10-20 #}
{# wf_updated_on: 2017-07-12 #}

# Funciones asincrónicas - hacen promesas amigablemente {: .page-title }

{% include "web/_shared/contributors/jakearchibald.html" %}

Las funciones asincrónicas están habilitadas de manera predeterminada en Chrome 55 y son, honestamente,
maravillosas. Te permite escribir un código basado en promesas como si fuese sincrónico,
pero sin bloquear el hilo principal. Hacen a tu código asincrónico menos
"inteligente" y más legible.

Las funciones asincrónicas funcionan de la siguiente manera:

    async function myFirstAsyncFunction() {
      try {
        const fulfilledValue = await promise;
      }
      catch (rejectedValue) {
        // …
      }
    }

Si usas la palabra clave `async` antes de una definición de función, luego puedes usar
`await` dentro de la función. Cuando `await` una promesa, la función se pausa
de una forma que no bloquea hasta que la promesa se detenga. Si la promesa se completa,
recibes de vuelta el valor. Si la promesa rechaza, se arroja el valor rechazado.

Note: Si no conoces bien las promesas, consulta [nuestra
guía de promesas](/web/fundamentals/getting-started/primers/promises).

## Ejemplo: Registro de un fetch

Supongamos que queremos obtener una URL y registrar la respuesta como texto. Así se ve
el uso de promesas:

    function logFetch(url) {
      return fetch(url)
        .then(response => response.text())
        .then(text => {
          console.log(text);
        }).catch(err => {
          console.error('fetch failed', err);
        });
    }

Y aquí se ve lo mismo con el uso de funciones asincrónicas:

    async function logFetch(url) {
      try {
        const response = await fetch(url);
        console.log(await response.text());
      }
      catch (err) {
        console.log('fetch failed', err);
      }
    }

Es la misma cantidad de líneas, pero desaparecen todos los callbacks. Esto hace que sea más
sencillo leer, especialmente para quienes conocen menos las promesas.

Note: Todo lo que `await` se pasa por `Promise.resolve()`, de modo que puedes
`await` promesas no nativas con seguridad.

## Valores de retorno asincrónicos

Las funciones asincrónicas *siempre* muestran una promesa, ya sea si usas `await` o no. Esa
promesa resuelve con lo que sea que muestre la función asincrónica o rechaza con
lo que sea que arroje la función asincrónica. De modo que

    // wait ms milliseconds
    function wait(ms) {
      return new Promise(r => setTimeout(r, ms));
    }

    async function hello() {
      await wait(500);
      return 'world';
    }

...llamar a `hello()` muestra una promesa que *se completa* con `"world"`.

    async function foo() {
      await wait(500);
      throw Error('bar');
    }

...llamar a `foo()` muestra una promesa que *se rechaza* con `Error('bar')`.

## Ejemplo: Transmisión de una respuesta

El beneficio de las funciones asincrónicas se incrementa en ejemplos más complejos. Supongamos que queremos
transmitir una respuesta mientras quitamos del registro los fragmentos, y mostrar el tamaño final.

Note: La frase "quitamos del registro los fragmentos" me dio asco.

Así es con promesas:

    function getResponseSize(url) {
      return fetch(url).then(response => {
        const reader = response.body.getReader();
        let total = 0;

        return reader.read().then(function processResult(result) {
          if (result.done) return total;

          const value = result.value;
          total += value.length;
          console.log('Received chunk', value);

          return reader.read().then(processResult);
        })
      });
    }

Mira, Jake "poseedor de promesas" Archibald. ¿Ves cómo llamo al
`processResult` dentro de sí mismo para configurar un bucle asincrónico? Escribir eso me
hizo sentir *muy inteligente*. Pero como con la mayoría de los códigos "inteligentes", tienes que mirarlos fijamente durante
años para descubrir qué hace, como esas imágenes estilo "ojo mágico" de
los 90.

Intentémoslo nuevamente con funciones asincrónicas:

    async function getResponseSize(url) {
      const response = await fetch(url);
      const reader = response.body.getReader();
      let result = await reader.read();
      let total = 0;

      while (!result.done) {
        const value = result.value;
        total += value.length;
        console.log('Received chunk', value);
        // get the next result
        result = await reader.read();
      }

      return total;
    }

Todo lo "inteligente" desapareció. El bucle asincrónico que me hizo tan presumido está
reemplazado por un confiable y aburrido bucle while. Mucho mejor. En el futuro, colocaremos
[iteradores asincrónicos](https://github.com/tc39/proposal-async-iteration){: .external},
que
[reemplazarían el bucle `while` con un bucle for-of](https://gist.github.com/jakearchibald/0b37865637daf884943cf88c2cba1376){: .external}, haciéndolo más prolijo todavía.

Note: Estoy casi enamorado de los flujos. Si no conoces bien los flujos,
[consulta mi guía](https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api){: .external}.

## Otra sintaxis de función asincrónica

Ya hemos visto la `async function() {}`, pero la palabra clave `async` se puede usar
con otra sintaxis de función:

### Funciones de flecha

    // map some URLs to json-promises
    const jsonPromises = urls.map(async url => {
      const response = await fetch(url);
      return response.json();
    });

Note: a `array.map(func)` no le interesa que le otorgué una función asincrónica, solo
la ve como una función que muestra una promesa. No esperará a que la primera
función se complete para llamar a la segunda.

### Métodos de objeto

    const storage = {
      async getAvatar(name) {
        const cache = await caches.open('avatars');
        return cache.match(`/avatars/${name}.jpg`);
      }
    };

    storage.getAvatar('jaffathecake').then(…);

### Métodos de clase

    class Storage {
      constructor() {
        this.cachePromise = caches.open('avatars');
      }

      async getAvatar(name) {
        const cache = await this.cachePromise;
        return cache.match(`/avatars/${name}.jpg`);
      }
    }

    const storage = new Storage();
    storage.getAvatar('jaffathecake').then(…);

Note: Los constructores de clases y los captadores/configuradores no pueden ser asincrónicos.

## ¡Cuidado! Evita generar demasiadas secuencias

A pesar de estar escribiendo un código que luce sincrónico, asegúrate de no perder la
oportunidad de hacer cosas en paralelo.

    async function series() {
      await wait(500);
      await wait(500);
      return "done!";
    }

Completar lo anterior lleva 1000 ms, mientras que

    async function parallel() {
      const wait1 = wait(500);
      const wait2 = wait(500);
      await wait1;
      await wait2;
      return "done!";
    }

...completar lo anterior lleva 500 ms, porque ambas esperas suceden al mismo tiempo.
Veamos un ejemplo práctico...

### Ejemplo: Salida de fetch en orden

Supongamos que queremos obtener la URL de una serie y registrarla lo antes posible, en el
orden correcto.

*Respira profundo*, así luce eso con promesas:

    function logInOrder(urls) {
      // fetch all the URLs
      const textPromises = urls.map(url => {
        return fetch(url).then(response => response.text());
      });

      // log them in order
      textPromises.reduce((chain, textPromise) => {
        return chain.then(() => textPromise)
          .then(text => console.log(text));
      }, Promise.resolve());
    }

Sí, así es, estoy usando `reduce` para encadenar una secuencia de promesas. Soy *tan
inteligente*. Pero esta es una codificación *tan inteligente* sin la cual estamos mejor.

Sin embargo, cuando convertimos lo anterior en la función asincrónica, es tentador generar
*demasiadas secuencias*:

<span class="compare-worse">No recomendado</span> - demasiadas secuencias

    async function logInOrder(urls) {
      for (const url of urls) {
        const response = await fetch(url);
        console.log(await response.text());
      }
    }

Luce más prolijo, pero mi segundo fetch no comienza hasta que mi primer fetch se
haya leído por completo, y así sucesivamente. Esto es mucho más lento que el ejemplo de promesas que
realiza los fetch en paralelo. Afortunadamente, hay un punto intermedio:

<span class="compare-better">Recomendado</span> - agradable y paralelo

    async function logInOrder(urls) {
      // fetch all the URLs in parallel
      const textPromises = urls.map(async url => {
        const response = await fetch(url);
        return response.text();
      });

      // log them in sequence
      for (const textPromise of textPromises) {
        console.log(await textPromise);
      }
    }

En este ejemplo, las URLs se obtienen y se leen en paralelo, pero la parte
`reduce` "inteligente" está reemplazada con un estándar y aburrido bucle for legible.

## Soporte para navegadores y métodos alternativos

Al momento de escribir, las funciones asincrónicas se habilitan de manera predeterminada en Chrome 55, pero
se están desarrollando en todos los principales navegadores.

* Edge - [En compilación 14342+ detrás de una marca](https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/)
* Firefox - [desarrollo activo](https://bugzilla.mozilla.org/show_bug.cgi?id=1185106)
* Safari - [desarrollo activo](https://bugs.webkit.org/show_bug.cgi?id=156147)

### Método alternativo - Generadores

Si apuntas a un perfil de navegadores que soportan generadores (que incluye
[la última versión de todos los navegadores importante](http://kangax.github.io/compat-table/es6/#test-generators){:.external}
) puedes casi usar polyfill para funciones asincrónicas.

[Babel](https://babeljs.io/){: .external} lo hará por ti,
[este es un ejemplo a través de Babel REPL](https://goo.gl/0Cg1Sq){: .external}
- fíjate cuán similar es el código transpilado. Esta transformación forma parte del 
[valor preestablecido es2017 de Babel](http://babeljs.io/docs/plugins/preset-es2017/){: .external}.

Note: Es divertido decir Babel REPL. Inténtalo.

Recomiendo el enfoque transpilado, porque puedes apagarlo una vez que tus
navegadores objetivo soportan las funciones asincrónicas, pero, si *realmente* no quieres usar un
transpilador, puedes tomar el
[polyfill de Babel](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}
y usarlo por tu cuenta. En lugar de lo siguiente:

    async function slowEcho(val) {
      await wait(1000);
      return val;
    }

...incluirías [el polyfill](https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25){: .external}
y escribirías:

    const slowEcho = createAsyncFunction(function*(val) {
      yield wait(1000);
      return val;
    });

Ten en cuenta que tienes que pasar un generador (`function*`) para `createAsyncFunction`,
y usar `yield` en lugar de `await`. Aparte de eso, funciona de la misma forma.

### Método alternativo - regenerador

Si apuntas a un perfil de navegadores viejos, Babel también puede transpilar generadores,
permitiéndote usar funciones asincrónicas hasta IE8. Para hacer esto, necesitas
[valor preestablecido es2017 de Babel](http://babeljs.io/docs/plugins/preset-es2017/){: .external}
*y* el [valor preestablecido es2015](http://babeljs.io/docs/plugins/preset-es2015/){: .external}.

El [resultado no es tan bonito](https://goo.gl/jlXboV), así que presta atención en caso de
abultamiento de código.

## ¡Haz todo asincrónico!

Una vez que las funciones asincrónicas llegan a todos los navegadores, ¡úsalas en todas las
funciones que muestran promesas! No solo hacen que tu código sea más prolijo, sino que se
aseguran de que a función *siempre* muestre una promesa.

Me emocionaron mucho las funciones asincrónicas [en
2014](https://jakearchibald.com/2014/es7-async-functions/){: .external} y
es excelente ver que se implementan, de verdad, en los navegadores. ¡Guau!


{# wf_devsite_translation #}
