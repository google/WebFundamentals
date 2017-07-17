project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: La Política de seguridad de contenido puede reducir considerablemente el riesgo e impacto de ataques por secuencias de comandos en sitios cruzados en los navegadores modernos.

{# wf_published_on: 2012-06-15 #}
{# wf_updated_on: 2017-07-17 #}

# Política de seguridad de contenido {: .page-title }

{% include "web/_shared/contributors/mikewest.html" %}
{% include "web/_shared/contributors/josephmedley.html" %}

El modelo de seguridad de la web tiene su base en la
[_política del mismo origen_](//en.wikipedia.org/wiki/Same-origin_policy){: .external}. El código
de `https://mybank.com` solo debería tener acceso a los datos
de `https://mybank.com`, y a `https://evil.example.com` jamás se le debería permitir el acceso.
Cada origen se mantiene aislado del resto de la web para brindar a los desarrollares una zona de pruebas
segura en la cual desarrollar y jugar. En teoría, esta solución es brillante. En
la práctica, los atacantes han encontrado formas inteligentes de subvertir el sistema.

Los ataques por [secuencias de comandos en sitios cruzados (XSS)](//en.wikipedia.org/wiki/Cross-site_scripting){: .external},
por ejemplo, omiten la política del mismo origen al engañar a un sitio para que
entregue código malicioso junto con el contenido esperado. Se trata de un
problema grave, ya que los navegadores consideran confiable todo el código que aparece en una página como si
fuera una parte legítima del origen de seguridad de dicha página. La
[hoja de referencia de XSS](https://www.owasp.org/index.php/XSS_Filter_Evasion_Cheat_Sheet){: .external} es una muestra antigua pero representativa de los métodos que un atacante podría usar para engañar esa confianza al insertar código malicioso. Si un atacante logra insertar _cualquier_ clase de código, no
habrá vuelta atrás: los datos de la sesión del usuario se verán comprometidos y
la información que debería ser secreta quedará expuesta a la acción de quienes tengan malas intenciones. Por supuesto que nos
gustaría evitarlo tanto como sea posible.

Esta información general destaca una defensa que puede reducir de manera significativa el riesgo e
impacto de un ataque XSS en navegadores modernos: la política de seguridad de contenido (CSP).

### TL;DR {: .hide-from-toc }
* Usa listas blancas para comunicarle al cliente qué se permite y qué no.
* Aprende qué directivas se encuentran disponibles.
* Aprende las palabras clave que llevan.
* El código integrado y `eval()` se consideran perjudiciales.
* Denuncia incumplimientos de la política de tus servidores antes de implementarlas.


## Listas blancas de fuentes de contenido 


La vulnerabilidad que aprovechan los ataques por XSS es la incapacidad de los navegadores para distinguir
entre una secuencia de comandos que es parte de tu app y una secuencia de comandos insertada
maliciosamente por un tercero. Por ejemplo, el botón de +1 de Google al
final de esta página carga y ejecuta código de
`https://apis.google.com/js/plusone.js` en el contexto del origen de esta página. Confiamos
en ese código, pero no podemos pretender que el navegador determine por sí mismo que el
código de `apis.google.com` es genial, mientras que el código de `apis.evil.example.com`
probablemente no lo sea. El navegador descarga y ejecuta tranquilamente cualquier código que una página
solicite, sin importar la fuente.

En lugar de confiar ciegamente en _todo_ lo que entrega un servidor, la CSP define el encabezado HTTP
`Content-Security-Policy` que te permite crear una lista blanca de
fuentes de contenido confiables, y ordena al navegador que solo ejecute o muestre
recursos de esas fuentes. Incluso si un atacante puede encontrar un hueco a través del cual
insertar una secuencia de comandos, esta no concordará con la lista blanca, y por lo tanto no se
ejecutará.

Ya que confiamos en que `apis.google.com` entrega código válido, y confiamos en que nosotros
también lo hacemos, definamos una política que solo permita que se ejecute una secuencia de comandos cuando
provenga de una de esas dos fuentes:

    Content-Security-Policy: script-src 'self' https://apis.google.com

Sencillo, ¿no? Como probablemente adivinaste, `script-src` es una directiva que
controla un grupo de privilegios relacionados con las secuencias de comandos para una página específica. Especificamos
`'self'` como una fuente válida de secuencias de comandos, y `https://apis.google.com` como
otra. El navegador, como se le ordenó, descarga y ejecuta JavaScript de
`apis.google.com` a través de HTTPS, como también del origen de la página actual.

<div class="attempt-right">
  <figure>
    <img src="images/csp-error.png" alt="Error en la consola: No se cargará la secuencia de comandos 'http://evil.example.com/evil.js' porque incumple la siguiente directiva de la Política de seguridad de contenido: script-src 'self' https://apis.google.com">
  </figure>
</div>

Cuando esta política está definida, el navegador simplemente muestra un error en vez de
cargar la secuencia de comandos de cualquier otra fuente. Cuando un atacante inteligente logra
insertar código en tu sitio, se encontrará con un mensaje de error en vez
del resultado exitoso que esperaban.

### La política se aplica a una amplia variedad de recursos

Mientras que los recursos de secuencias de comandos suponen los riesgos de seguridad más obvios, la CSP ofrece un importante
conjunto de directivas de políticas que permiten un control bastante granular sobre los recursos
que una página puede cargar. Ya conoces `script-src`, así que el concepto
debería estar claro. Analicemos rápidamente el resto de las directivas de recursos:

* **`base-uri`** restringe las URL que pueden aparecer en el elemento `<base>` de la página.
* **`child-src`** enumera las URL para los trabajadores y contenidos en marcos incorporados. Por
ejemplo: `child-src https://youtube.com` habilitaría la incorporación de videos desde
YouTube, pero no de otros orígenes. Usa esto en vez de la directiva
**`frame-src`** obsoleta.
* **`connect-src`** limita los orígenes que puedes conectar (a través de XHR,
WebSockets y EventSource).
* **`font-src`** especifica los orígenes que pueden proveer fuentes para web. Las fuentes
para web de Google pueden habilitarse a través de `font-src https://themes.googleusercontent.com`.
* **`form-action`** enumera los terminales para envíos a partir de etiquetas `<form>`.
* **`frame-ancestors`** especifica los recursos que pueden incorporar a la página actual.
Esta directiva se aplica a las etiquetas `<frame>`, `<iframe>`, `<embed>` y `<applet>`.
Esta directiva no puede usarse en etiquetas `<meta>` y se aplica solo a recursos
que no sean HTML.
* **`frame-src`** es obsoleta. En cambio, usa **`child-src`**.
* **`img-src`** define los orígenes desde los cuales pueden cargarse las imágenes.
* **`media-src`** restringe los orígenes permitidos para proveer video y audio.
* **`object-src`** permite controlar Flash y otros complementos.
* **`plugin-types`** limita los tipos de complementos que puede invocar una página.
* **`report-uri`** especifica una URL a la que un navegador enviará informes cuando se incumpla una
política de seguridad de contenido. Esta directiva no puede usarse en etiquetas `<meta>`.

* **`style-src`** es el equivalente de `script-src` para las hojas de estilo.
* **`upgrade-insecure-requests`** indica a los usuario-agentes que modifiquen los esquemas de URL,
cambiando HTTP por HTTPS. Esta directiva es para sitios web con grandes cantidades de
URL antiguas que necesitan modificarse.

De manera predeterminada, las directivas son muy abiertas. Si no estableces una política específica para una
directiva, como `font-src`, por ejemplo, entonces esa directiva tiene un comportamiento predeterminado como
si indicaras `*` como un origen válido (por ejemplo, podrías cargar fuentes de
cualquier lugar, sin restricciones).

Puedes anular este comportamiento predeterminado si especificas una directiva
**`default-src`**. Esta directiva define los valores predeterminados para la mayoría de las
directivas que dejas sin especificar. En general, esto se aplica a todas las directivas que
terminen con `-src`. Si `default-src` se configura en `https://example.com`, y no
especificas una directiva `font-src`, entonces puedes cargar fuentes desde
`https://example.com` y de ningún otro lado. En nuestros
ejemplos anteriores, solo especificamos `script-src`, lo que significa que las imágenes, fuentes y otros elementos pueden cargarse desde
cualquier origen.

Las siguientes directivas no usan `default-src` como reserva. Recuerda que
no establecerlas equivale a permitir todo.

* `base-uri`
* `form-action`
* `frame-ancestors`
* `plugin-types`
* `report-uri`
* `sandbox`

Puedes usar la cantidad de estas directivas que quieras, ya sean pocas o muchas, según las necesidades
específicas de tu app. Simplemente tienes que enumerar cada una en el encabezado HTTP y separar las
directivas con punto y coma. Asegúrate de enumerar _todos_
los recursos necesarios de un tipo específico en una _única_ directiva. Si escribes
algo como `script-src https://host1.com; script-src https://host2.com`, la
segunda directiva simplemente se ignorará. Algo como lo siguiente especificaría
correctamente que ambos orígenes son válidos:

    script-src https://host1.com https://host2.com

Si tienes, por ejemplo, una app que carga todos sus recursos desde una
red de distribución de contenido (por ejemplo, `https://cdn.example.net`), y sabes que
no necesitas complementos o contenido dentro de marcos, entonces tu política podría ser
similar a la siguiente:

    Content-Security-Policy: default-src https://cdn.example.net; child-src 'none'; object-src 'none'

### Detalles de implementación

Verás los encabezados `X-WebKit-CSP` y `X-Content-Security-Policy` en varios
tutoriales en la web. En adelante, deberías ignorar estos encabezados
con prefijos. Los navegadores modernos (a excepción de IE) admiten el encabezado
`Content-Security-Policy` sin prefijo. Ese es el encabezado que deberías usar.

Sin importar qué encabezado uses, la política se define página por página:
necesitarás enviar el encabezado HTTP junto con cada respuesta que quieras
garantizar que esté protegida. Esto te ofrece mucha flexibilidad, ya que puedes configurar en detalle
la política para páginas específicas según sus necesidades particulares. Tal vez un grupo de
páginas en tu sitio tenga un botón de +1, mientras que otras no; entonces podrías permitir que el
código del botón se cargue solo cuando sea necesario.

La lista de fuentes de contenido en cada directiva es flexible. Puedes especificar las fuentes por
esquema (`data:`, `https:`) o variando en especificidad desde solo el nombre del host
(`example.com`, que incluye a todos los orígenes en ese host: todos los esquemas y todos los puertos) hasta
un URI completo (`https://example.com:443`, que solo incluye HTTPS, solo de
`example.com` y solo del puerto 443). Se aceptan los comodines, pero únicamente como un esquema,
un puerto o en la posición de más a la izquierda del nombre del host: `*://*.example.com:*` incluiría a
todos los subdominios de `example.com` (pero _no_ al propio `example.com`), que usen
cualquier esquema, en cualquier puerto.

La lista de fuentes de contenido acepta cuatro palabras clave:

* **`'none'`**, como es de esperarse, no incluye nada.
* **`'self'`** incluye al origen actual, pero no a sus subdominios.
* **`'unsafe-inline'`** permite JavaScript y CSS integrados. (Más adelante trataremos esto con
más detalle)
* **`'unsafe-eval'`** permite mecanismos de texto a JavaScript como `eval`. (Ya discutiremos
esto también).

Estas palabras clave requieren comillas simples. Por ejemplo, `script-src 'self'` (con comillas)
autoriza la ejecución de JavaScript desde el host actual; `script-src self`
(sin comillas) permite JavaScript desde un servidor llamado "`self`" (y _no_ desde el host
actual), lo cual probablemente no sea tu intención.

### Zona de pruebas

Hay una directiva más que vale la pena mencionar: `sandbox`. Es un poco
diferente de otras que hemos visto, ya que restringe acciones que
la página puede realizar en vez de recursos que la página puede cargar. Si se encuentra la directiva
`sandbox`, la página se trata como si se cargara
dentro de un `<iframe>` con un atributo `sandbox`. Esto puede producir una variedad de
efectos en la página: forzar la página a un único origen y evitar el envío de
formularios, entre otros. Esto se sale un poco del tema de este artículo, pero puedes
encontrar información más detallada sobre los atributos de zonas de pruebas válidos en la
[sección "Sandboxing" de la especificación de HTML5](https://developers.whatwg.org/origin-0.html#sandboxing){: .external}.

### La metaetiqueta

El mecanismo de entrega preferido de la CSP es un encabezado HTTP. Sin embargo, puede resultar útil
establecer una política para una página directamente en el lenguaje de marcado. Hazlo mediante una etiqueta `<meta>` con
un atributo `http-equiv`:


    <meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">


Esto no puede usarse para frame-ancestors, report-uri o sandbox.

## El código integrado se considera perjudicial

Debería quedar claro que la CSP se basa en incluir orígenes en la lista blanca, ya que esa es una
forma no ambigua de indicar al navegador que considere
aceptables a grupos específicos de recursos y que rechace al resto. Sin embargo, una lista blanca basada en el origen no
resuelve la mayor amenaza que suponen los ataques por XSS: la inserción de secuencias de comandos integradas.
Si un atacante puede insertar una etiqueta de secuencia de comandos que contenga directamente alguna carga
maliciosa (`<script>sendMyDataToEvilDotCom()</script>`),
el navegador no cuenta con un mecanismo para distinguirla de una etiqueta de secuencia de comandos integrada
legítima. La CSP resuelve este problema al rechazar completamente las secuencias de comandos integradas:
es la única manera de asegurarse.


Este rechazo no solo incluye secuencias de comandos incorporadas directamente en las etiquetas `script`, sino también
controladores de eventos integrados y las URL de `javascript:`. Necesitarás mover el contenido de las etiquetas
`script` a un archivo externo y reemplazar las URL de `javascript:` y `<a ...
onclick="[JAVASCRIPT]">` por llamadas a `addEventListener()` pertinentes. Por ejemplo,
podrías reescribir lo siguiente:


    <script>
      function doAmazingThings() {
        alert('YOU AM AMAZING!');
      }
    </script>
    <button onclick='doAmazingThings();'>Am I amazing?</button>


de una forma como esta:

    <!-- amazing.html -->
    <script src='amazing.js'></script>
    <button id='amazing'>Am I amazing?</button>

<div style="clear:both;"></div>


    // amazing.js
    function doAmazingThings() {
      alert('YOU AM AMAZING!');
    }
    document.addEventListener('DOMContentReady', function () {
      document.getElementById('amazing')
        .addEventListener('click', doAmazingThings);
    });


El código reescrito tiene varias ventajas más allá de que funciona bien con la
CSP; ya es una práctica recomendada, sin importar qué uso hagas de la CSP. El código JavaScript
integrado mezcla la estructura y el comportamiento exactamente como no se debe hacer.
Los recursos externos son más fáciles de almacenar en caché para los navegadores, más fáciles de entender para los
programadores y contribuyen a la compilación y minificación. Escribirás mejor
código si te tomas el trabajo de mover el código a recursos externos.

El estilo integrado se trata de la misma manera: tanto el atributo `style` como las etiquetas `style`
deberían consolidarse en hojas de estilo externas para la protección contra una
variedad de métodos [sorprendentemente astutos](http://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html){: .external}
de exfiltración de datos que CSS permite.

Si necesitas tener secuencias de comandos y estilos integrados, puedes habilitarlos
agregando `'unsafe-inline'` como una fuente de contenido permitida en una directiva `script-src` o `style-
src`. También puedes usar un nonce o un hash (ver a continuación), pero realmente no deberías hacerlo. Rechazar secuencias de comandos integradas es la mayor victoria de seguridad que puede conseguir la CSP, y
rechazar el estilo integrado también refuerza tu app. Asegurarse de que todo funcione correctamente luego de cambiar el orden del código
requiere un poco de
esfuerzo por adelantado, pero el sacrificio realmente vale la pena.

### Si debes usarlo sí o sí...

La CSP nivel 2 ofrece compatibilidad con versiones anteriores para secuencias de comandos integradas al permitirte que
incluyas secuencias de comandos incluidas específicas en una lista blanca, mediante un nonce (un número
usado una sola vez) criptográfico o un hash. Aunque esto puede resultar engorroso, es útil
como sustituto.

Para usar un nonce, dale a tu etiqueta de secuencia de comandos un atributo nonce. Su valor debe coincidir con un
elemento de la lista de fuentes de contenido confiables. Por ejemplo:


    <script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
      //Some inline code I cant remove yet, but need to asap.
    </script>


Ahora, agrega el nonce a tu directiva `script-src` como sufijo de la palabra clave `nonce-`.

    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'

Recuerda que los nonces deben regenerarse para cada solicitud de página y deben ser
indescifrables.

Los hash funcionan de manera muy similar. En vez de agregar código a la etiqueta de la secuencia de comandos,
crea un hash SHA de la propia secuencia de comandos y agrégala a la directiva `script-src`.
Por ejemplo, supongamos que tu página contiene lo siguiente:


    <script>alert('Hello, world.');</script>


Tu política contendría:

    Content-Security-Policy: script-src 'sha256-qznLcsROx4GACP2dm0UCKCzCG-HiZ1guq6ZZDob_Tng='

Hay algunas cosas que analizar en este ejemplo. El prefijo `sha*-` especifica el algoritmo
que genera el hash. En el ejemplo anterior, se usa sha256-. La CSP también
es compatible con sha384- y sha512-. Cuando se genera el hash, no incluyas las etiquetas
`<script>`. Además, el uso de mayúsculas y espacios en blanco es importante, inclusive los espacios en blanco al principio o
al final.

Una búsqueda de Google sobre cómo generar un hash SHA te proveerá soluciones en
muchos idiomas. Con Chrome 40 o versiones posteriores, puedes abrir DevTools y luego
volver a cargar tu página. La pestaña "Console" contendrá un mensaje de error con el hash sha256
correcto para cada una de tus secuencias de comandos integradas.

## Eval también

Incluso si los atacantes no pudieran insertar una secuencia de comandos directamente, podrían engañar a
tu app para que convierta texto que normalmente sería inerte en JavaScript ejecutable
y que lo ejecutara por ellos. `eval()`, `new
Function()`, `setTimeout([string], ...)`, y
`setInterval([string], ...)` son vectores a través de los cuales un texto
insertado podría llegar a ejecutar algo inesperadamente malicioso. La respuesta
predeterminada de la CSP a este riesgo es el bloqueo completamente todos estos vectores.


Esto afecta de varias formas la manera en la que compilas las apps:

*   Debes analizar JSON a través del `JSON.parse` incorporado, en vez de depender de
 `eval`. Las operaciones nativas de JSON se encuentran disponibles en
 [todos los navegadores a partir de IE8](http://caniuse.com/#feat=json){: .external} y son
 totalmente seguras.
*   Vuelve a escribir cualquier llamada a `setTimeout` o `setInterval` que estés haciendo
 con funciones integradas en vez de con secuencias de comandos. Por ejemplo:

<div style="clear:both;"></div>

    setTimeout("document.querySelector('a').style.display = 'none';", 10);


quedaría mejor escrito de la siguiente manera:


    setTimeout(function () {
      document.querySelector('a').style.display = 'none';
    }, 10);


*   Evita el uso de plantillas integradas durante el tiempo de ejecución: Muchas bibliotecas para plantillas usan `new
    Function()` libremente para acelerar la generación de plantillas durante el tiempo de ejecución. Es una
excelente app de programación dinámica, pero implica el riesgo de
 evaluar texto malicioso. Algunos frameworks admiten CSP de manera predeterminada,
 por lo que tienen que retroceder a un analizador robusto ante la ausencia de `eval`.
Un buen ejemplo de esto es [la directiva ng-csp de AngularJS](https://docs.angularjs.org/api/ng/directive/ngCsp){: .external}.

Sin embargo, una mejor opción sería usar plantillas para un lenguaje que ofrezca
precompilación ([como Handlebars](http://handlebarsjs.com/precompilation.html){: .external},
por ejemplo). Precompilar tus plantillas puede acelerar
la experiencia de usuario aun más que la implementación más rápida en tiempo de ejecución; además, es más rápida.  Si eval y
su hermano de texto a JavaScript son esenciales para tu app, puedes
habilitarlos agregando `'unsafe-eval'` como una fuente de contenido permitida en una directiva `script-src`,
pero no es nada recomendable. Rechazar la capacidad de ejecutar
strings hace que ejecutar código
no autorizado en tu sitio sea más difícil para un atacante.

## Informes 


La capacidad de la CSP para bloquear recursos del lado del cliente que no sean de confianza es una gran ventaja para tus
usuarios, pero sería bastante útil contar con algún tipo de notificación
que se envíe de vuelta al servidor para que puedas identificar y arreglar cualquier error que permita
insertar código malicioso en primer lugar. Para esto, puedes ordenar al
navegador que envíe mediante `POST` informes de incumplimiento con formato JSON a una ubicación
especificada en una directiva `report-uri`.


    Content-Security-Policy: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

Esos informes se verán más o menos de la siguiente manera:


    {
      "csp-report": {
        "document-uri": "http://example.org/page.html",
        "referrer": "http://evil.example.com/",
        "blocked-uri": "http://evil.example.com/evil.js",
        "violated-directive": "script-src 'self' https://apis.google.com",
        "original-policy": "script-src 'self' https://apis.google.com; report-uri http://example.org/my_amazing_csp_report_parser"
      }
    }



Esto contiene bastante información que te ayudará a rastrear la
causa específica del incumplimiento, incluida la página en la cual ocurrió
el incumplimiento (`document-uri`), la referencia de esa página (ten en cuenta que, a diferencia del campo del encabezado
HTTP, la clave _no_ está mal escrita), el recurso que incumplió la
política de la página (`blocked-uri`), la directiva específica que incumplió
(`violated-directive`) y la política completa de la página (`original-policy`).

### Modo informativo

Si recién comienzas con CSP, es recomendable que evalúes el estado
actual de tu app antes de introducir una política muy rigurosa para tus usuarios.
Como un escalón hacia una implementación completa, puedes pedir al navegador que supervise
una política y que informe los incumplimientos, pero sin imponer las restricciones. En lugar de
enviar un encabezado `Content-Security-Policy`, envía un encabezado
`Content-Security-Policy-Report-Only`.

    Content-Security-Policy-Report-Only: default-src 'self'; ...; report-uri /my_amazing_csp_report_parser;

La política especificada en el modo informativo no bloqueará los recursos restringidos, pero
enviará informes de incumplimiento a la ubicación que especifiques. Incluso puedes enviar
_ambos_ encabezados, para imponer una política mientras se supervisa otra. Esta es una forma
excelente de evaluar el efecto de los cambios en la CSP de tu app: activa los
informes para una nueva política, supervisa los informes de incumplimiento y corrige los errores que
aparezcan. Cuando estés conforme con este efecto, comienza a imponer la nueva política.



## Uso en el mundo real 

CSP 1 es bastante usable en Chrome, Safari y Firefox, pero tiene una
compatibilidad muy limitada en IE 10. Puedes <a href="http://caniuse.com/#feat=contentsecuritypolicy">
ver los detalles en canisue.com</a>. La CSP nivel 2 está disponible en Chrome desde la
versión 40. Los sitios enormes como Twitter y Facebook implementaron el encabezado
(te recomendamos leer <a href="https://blog.twitter.com/2011/improving-browser-security-with-csp">el caso de éxito
de Twitter</a>) y el estándar está bastante listo
para que lo comiences a implementar en tus propios sitios.

El primer paso hacia la confección de una política para tu app es evaluar los
recursos que cargas actualmente. Cuando creas que tienes claro cómo se organizan
las cosas en tu app, configura una política que se base en esos
requerimientos. Analicemos algunos casos de uso y determinemos la
mejor forma en la que podríamos admitirlos dentro de los límites de protección de la CSP.

### Caso de uso #1: widgets de redes sociales

* El [botón de +1](/+/web/+1button/){: .external}
de Google incluye una secuencia de comandos de `https://apis.google.com` e incorpora un `<iframe>` de
`https://plusone.google.com`. Necesitas una política que incluya a estos dos
orígenes para incorporar el botón. Una política mínima sería `script-src
https://apis.google.com; child-src https://plusone.google.com`. También necesitas
asegurarte de que el fragmento de JavaScript que Google provee se extraiga y se incluya en
un archivo JavaScript externo. Si actualmente tienes una política que use `child-src`,
 necesitas cambiarlo a `child-src`.

* Botón [Me gusta](//developers.facebook.com/docs/plugins/like-button){: .external } de Facebook

tiene varias opciones de implementación. Recomendamos quedarse con la versión
`<iframe>`, ya que puede aislarse como zona de pruebas del resto de tu sitio de forma segura. Requiere
una directiva `child-src https://facebook.com` para funcionar correctamente. Ten en cuenta
que, de manera predeterminada, el código del `<iframe>` que provee Facebook carga una URL
relativa, `//facebook.com`. Cambia eso para especificar explícitamente HTTPS:
`https://facebook.com`. No hay razones para usar HTTP si no es necesario.

* El [botón Twittear](https://publish.twitter.com/#)
de Twitter depende del acceso a una secuencia de comandos y un marco, ambos hospedados en
`https://platform.twitter.com`. Twitter también provee una URL relativa de manera
predeterminada; edita el código para especificar HTTPS al copiar y pegarla localmente.
Con `script-src https://platform.twitter.com; child-src
https://platform.twitter.com` será suficiente mientras muevas el fragmento de código JavaScript
que provee Twitter a un archivo JavaScript externo.

* Otras plataformas tienen requisitos semejantes, y puedes tratarlos de manera similar.
Te sugerimos que simplemente configures `default-src` en `'none'` y que revises tu consola para
determinar qué recursos necesitarás habilitar para que funcionen los widgets.

Incluir varios widgets es sencillo: simplemente combina las directivas
de la política y recuerda fusionar todos los recursos de un mismo tipo en una única
directiva. Si quisieras los widgets de las tres redes sociales, la política se vería
de la siguiente manera:

    script-src https://apis.google.com https://platform.twitter.com; child-src https://plusone.google.com https://facebook.com https://platform.twitter.com

### Caso de uso #2: bloqueo

Imagina por un instante que gestionas el sitio de un banco y quieres asegurarte de que
solo puedan ejecutarse aquellos recursos escritos por ti. En este escenario,
comienza con una política predeterminada que bloquee absolutamente todo (`default-src
'none'`) y continúa desde ahí.

Digamos que el banco carga todas las imágenes, estilos y secuencias de comandos desde una CDN en
`https://cdn.mybank.net`, y se conecta por medio de XHR a `https://api.mybank.com/` para
obtener varios datos. Se usan marcos, pero solo para páginas locales del
sitio (nada que provenga de terceros). En el sitio no hay Flash, fuentes o
extras. El encabezado de CSP más restrictivo que podríamos enviar sería el siguiente:

    Content-Security-Policy: default-src 'none'; script-src https://cdn.mybank.net; style-src https://cdn.mybank.net; img-src https://cdn.mybank.net; connect-src https://api.mybank.com; child-src 'self'

### Caso de uso #3: solo SSL

El administrador de un foro de discusión sobre anillos de boda quiere asegurarse de que todos los recursos se
carguen únicamente a través de canales seguros, pero no tiene los conocimientos para escribir mucho código; por lo que reescribir
secciones extensas del software externo para foros, que está colmado de
estilos y secuencias de comandos integrados, sobrepasa sus capacidades. La siguiente política sería
eficaz:

    Content-Security-Policy: default-src https:; script-src https: 'unsafe-inline'; style-src https: 'unsafe-inline'

A pesar de que se especifica `https:` en `default-src`, las directivas
de secuencia de comandos y estilo no heredan automáticamente esa fuente. Cada directiva anula
completamente el valor predeterminado para ese tipo específico de recurso.

## El futuro


La Política de seguridad de contenido nivel 2 es una <a href="http://www.w3.org/TR/CSP2/">
recomendación candidata</a>. El Grupo de trabajo de seguridad en apps web del W3C
ya comenzó a trabajar en la siguiente iteración de la especificación,
[Política de seguridad de contenido nivel 3](https://www.w3.org/TR/CSP3/){: .external }. 


Si te interesa participar en la discusión de estas próximas características,
[hecha un vistazo a los archivos de la lista de distribución public-webappsec@](http://lists.w3.org/Archives/Public/public-webappsec/),
o únete tú mismo.


{# wf_devsite_translation #}
