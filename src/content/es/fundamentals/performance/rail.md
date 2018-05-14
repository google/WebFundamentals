project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: RAIL es un modelo de rendimiento centrado en el usuario. Todas las aplicaciones web tienen estos cuatro aspectos distintivos en sus ciclos de vida, y el rendimiento se adapta a ellos de maneras muy diferentes: Respuesta, animación, inactividad, carga.

{# wf_updated_on: 2015-06-07 #}
{# wf_published_on: 2015-06-07 #}

# Mide el rendimiento con el modelo RAIL {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

RAIL es un modelo de rendimiento centrado en el usuario. Todas las apps web tienen estos cuatro aspectos distintivos en sus ciclos de vida, y el rendimiento se adapta a ellos de maneras diferentes:

![Modelo de rendimiento RAIL](images/rail.png)


### TL;DR {: .hide-from-toc }

- Enfócate en el usuario, el objetivo final no es hacer que tu sitio funcione rápidamente en un dispositivo específico, sino que es hacer a los usuarios felices.
- Responde a los usuarios inmediatamente, reconoce la entrada del usuario en menos de 100 ms.
- Cuando uses animaciones o desplazamiento, produce un fotograma en menos de 10 ms.
- Maximiza el tiempo de inactividad de la cadena principal.
- Mantén la atención de los usuarios , brinda contenido interactivo en menos de 1000 ms.


## Foco en el usuario

Haz de los usuarios el punto de foco de tu esfuerzo de rendimiento.
La mayor parte del tiempo que los usuarios pasan en tu sitio no se destina a esperar que cargue,
sino a esperar que responda mientras lo usan.
Comprende cómo perciben los usuarios las demoras de rendimiento:

<table class="responsive">
  <thead>
      <th colspan="2">Demora y reacción del usuario</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="Delay">0 a 16 ms</td>
      <td data-th="User Reaction">Las personas son excepcionalmente buenas para rastrear
      el movimiento, y les desagrada que las animaciones no sean fluidas. Los usuarios
      perciben las animaciones como fluidas, siempre y cuando se representen 60 nuevos fotogramas
      por segundo. Es decir, 16 ms por fotograma, incluido el tiempo que lleva que
      el navegador pinte el nuevo fotograma de la pantalla, dejándole a una app
      alrededor de 10 ms para producir un fotograma.</td>
    </tr>
    <tr>
      <td data-th="Delay">0 a 100 ms</td>
      <td data-th="User Reaction">Responde a una acción de usuario dentro de esta ventana de tiempo y los usuarios sentirán que el resultado es inmediato. Si demoras más tiempo, la conexión entre acción y reacción se romperá.</td>
    </tr>
    <tr>
      <td data-th="Delay">100 a 300 ms</td>
      <td data-th="User Reaction">Los usuarios experimentan una leve demora perceptible.</td>
    </tr>
    <tr>
      <td data-th="Delay">300 a 1000 ms</td>
      <td data-th="User Reaction">En esta ventana, todo parece parte de una progresión natural y continua de tareas. Para la mayoría de los usuarios de la Web, cargar páginas o cambiar las vistas constituye una tarea.</td>
    </tr>
    <tr>
      <td data-th="Delay">Más de 1000 ms</td>
      <td data-th="User Reaction">Después de 1 segundo, el usuario pierde el foco en la tarea que está realizando.</td>
    </tr>
    <tr>
      <td data-th="Delay">Más de 10 000 ms</td>
      <td data-th="User Reaction">El usuario está frustrado y probablemente abandone la tarea, puede ser que vuelva o no.</td>
    </tr>
  </tbody>
</table>

## Respuesta: responde en menos de 100 ms

Tienes 100 ms para responder a la entrada del usuario antes de que note una demora.
Esto se aplica a la mayoría de las entradas, como hacer clic en botones, alternar controles
de formularios o iniciar animaciones. Esto no se aplica a arrastrar o
desplazar en pantalla táctil.

Si no respondes, la conexión entre acción y reacción se romperá. Los usuarios lo notarán.

A pesar de que puede resultar obvio responder a las acciones del usuario inmediatamente,
esa no siempre es la decisión adecuada.
Usa esta ventana de 100 ms para hacer otros trabajos costosos, pero ten cuidado de no bloquear al usuario.
Si es posible, trabaja en segundo plano.

Para acciones que llevan más que 500 ms en completarse, siempre brinda comentarios.

## Animación: produce un fotograma en 10 ms

Las animaciones no son solo elegantes efectos de IU. Por ejemplo, desplazar y arrastrar
mediante táctil son tipos de animaciones.

Los usuarios notan cuando varía el índice de fotogramas de animación.
Tu objetivo es producir 60 fotogramas por segundo y cada fotograma tiene que pasar por todos estos pasos:

![Pasos para representar un fotograma](images/render-frame.png)

Desde un punto de vista puramente matemático, todos los fotogramas tienen un plazo de alrededor de 
16 ms (1000 ms/60 fotogramas por segundo = 16,66 ms por fotograma). Sin embargo, ya que
los navegadores necesitan tiempo para pintar el nuevo fotograma en la pantalla, **tu código
debería terminar de ejecutarse en menos de 10 ms**. 

En puntos de presión altos como animaciones, la clave es no hacer nada donde
puedes y lo mínimo donde no puedes. Cuando sea posible, usa la
respuesta de 100 ms para calcular por adelantado el trabajo largo para maximizar tus
posibilidades de llegar a 60 fps.

Para obtener más información, consulta
[Rendimiento de la representación](/web/fundamentals/performance/rendering/).

## Inhabilitado: maximiza el tiempo inhabilitado

Usa el tiempo inhabilitado para completar el trabajo pospuesto. Por ejemplo, mantén al mínimo los datos cargados previamente para que tu app se cargue rápido y usa el tiempo inhabilitado para cargar los datos restantes.

El trabajo pospuesto se debería agrupar en bloques de alrededor de 50 ms. Si un usuario comienza a interactuar, la principal prioridad es responder a eso. 

Para permitir una <respuesta de 100 ms,
la app tiene que darle el control de vuelta a la cadena principal cada <50 ms,
para que pueda ejecutar su canalización de píxeles, reaccionar a la entrada del usuario y más.

Trabajar en bloques de 50 ms permite que se termine la tarea mientras garantiza una respuesta instantánea.

## Carga: brinda contenido en menos de 1000 ms

Carga tu sitio en menos de 1 segundo. Si no lo haces, la atención del usuario se dispersa
y su percepción de lidiar con la tarea se quiebra.

Enfócate en
[optimizar la ruta de acceso de representación](/web/fundamentals/performance/critical-rendering-path/)
para desbloquear la representación.

No es necesario que cargues todo en menos de 1 segundo para producir la percepción de una carga completa. Habilita la representación progresiva y realiza parte del trabajo en segundo plano. Pospon las cargas que no son esenciales a periodos de tiempo inhabilitado (consulta este [curso de Udacity sobre Optimización de rendimiento de sitio web](https://www.udacity.com/course/website-performance-optimization--ud884) para obtener más información).

## Resumen de métricas clave de RAIL

Para evaluar tu sitio en relación con las métricas de RAIL, usa la [herramienta Timeline](/web/tools/chrome-devtools/profile/evaluate-performance/timeline-tool) de DevTools de Chrome para registrar las acciones del usuario. Luego controla los tiempos de registro en Timeline con estas métricas claves de RAIL:

<table>
  <thead>
      <th>Paso de RAIL</th>
      <th>Métrica clave</th>
      <th>Acciones del usuario</th>
  </thead>
  <tbody>
    <tr>
      <td data-th="RAIL Step"><strong>Respuesta</strong></td>
      <td data-th="Key Metric">Latencia de entrada (de presión a pintura) < 100 ms.</td>
      <td data-th="User Test">El usuario presiona un botón (por ejemplo, para abrir la navegación).</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Animación</strong></td>
      <td data-th="Key Metric">El trabajo de cada fotograma (de JS a pintura) completa < 16 ms.</td>
      <td data-th="User Test">El usuario desplaza la página, arrastra un dedo (para abrir
        un menú, por ejemplo) o ve una animación. Cuando el usuario arrastra en la app, la
        respuesta de esta está sujeta a la posición del dedo, por ejemplo, cuando arrastra hacia abajo para actualizar
        o se desliza un carrusel. Esta métrica se aplica solo a la fase continua
        de arrastres, no al principio.
      </td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Inhabilitado</strong></td>
      <td data-th="Key Metric">Trabajo de JS de cadena principal en trozos de no más de 50 ms.</td>
      <td data-th="User Test">El usuario no está interactuando con la página, pero la cadena principal debería estar lo suficientemente disponible como para controlar la siguiente entrada del usuario.</td>
    </tr>
    <tr>
      <td data-th="RAIL Step"><strong>Carga</strong></td>
      <td data-th="Key Metric">Página considerada lista para usar en 1000 ms.</td>
      <td data-th="User Test">El usuario carga la página y ve el contenido de la ruta de acceso crítica.</td>
    </tr>
  </tbody>
</table> 




{# wf_devsite_translation #}
