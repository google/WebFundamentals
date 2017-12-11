project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: WebVR

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2016-12-12 #}

# WebVR {: .page-title }

Warning: WebVR todavía es experimental y se encuentra sujeta a modificaciones.

WebVR es una JavaScript API que utiliza las gafas de RV y un dispositivo con capacidad para RV que tengan tus usuarios, como unas [gafas Daydream](https://vr.google.com/daydream/) y un teléfono Pixel, para crear experiencias 3D completamente envolventes en el navegador.

<img src="img/getting-started-with-webvr.jpg" alt="Primeros pasos con WebVR" />

## Compatibilidad y disponibilidad

Actualmente, la WebVR API se encuentra disponible en:

* Chrome Beta (M56+), a través de un [Origin Trial](https://github.com/jpchase/OriginTrials/blob/gh-pages/developer-guide.md).
* Firefox Nightly.
* Samsung Internet Browser for Gear VR. (Ten en cuenta que actualmente es compatible con una versión antigua de la especificación de WebVR).

Para los navegadores que no admiten WebVR, o que tal vez tengan versiones anteriores de las API, puedes recurrir a [WebVR Polyfill](https://github.com/googlevr/webvr-polyfill). Sin embargo, ten en cuenta que la RV es *extremadamente sensible al rendimiento* y los polyfills normalmente suponen un costo de rendimiento relativamente elevado. Por lo tanto, tal vez debas considerar si realmente quieres usar el polyfill para un usuario que no tiene compatibilidad nativa para WebVR.

Cuando tengas la duda, ¡evita provocar mareos por movimiento a la gente a causa de experiencias con mal rendimiento!

[Consulta el estado más reciente de WebVR](./status/)

## Creación de contenido de WebVR

Para crear contenido de WebVR, necesitarás usar algunas API nuevas y tecnologías existentes, como [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/Tutorial) y [WebAudio](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API), además de abarcar distintos tipos de entradas y gafas.

<div class="attempt-left">
  <h3>Primeros pasos con WebVR</h3>
  <a href="./getting-started-with-webvr/">
    <img src="img/getting-started-with-webvr.jpg" alt="Primeros pasos con WebVR" />
  </a>
  <p>
    Comienza de la mejor forma con WebVR tomando una escena de WebGL y agregando distintas API de RV.<br>
    <a href="./getting-started-with-webvr/">Más información</a>
  </p>
</div>
<div class="attempt-right">
  <h3>Agrega entrada a una escena de WebVR</h3>
  <a href="./adding-input-to-a-webvr-scene/">
    <img src="img/adding-input-to-a-webvr-scene.jpg" alt="Agrega entrada a una escena de WebVR" />
  </a>
  <p>
    La interacción es un elemento esencial para proporcionar una experiencia atractiva y envolvente.<br>
    <a href="./adding-input-to-a-webvr-scene/">Primeros pasos</a>
  </p>
</div>

<div class="clearfix"></div>

### Más recursos

Comienzan a aparecer algunos recursos excelentes de WebVR en la web.

* [Conoce más sobre las WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API)
* [Consulta los ejemplos de WebVR](https://webvr.info/samples/)
* [Diseñar para Google Cardboard](https://www.google.com/design/spec-vr/designing-for-google-cardboard/a-new-dimension.html)

## Lleva registro de tu rendimiento

<img src="img/oce.png" class="attempt-right" alt="Rendimiento de WebVR" />

Para minimizar el malestar para la gente que usa las experiencias de WebVR, deben mantener un índice de fotogramas constante (y alto). Si se falla en esto, ¡los usuarios pueden sufrir mareos por movimiento!

En dispositivos móviles, la frecuencia de actualización es normalmente de 60 Hz, lo que significa que el objetivo es 60 fps (o 16 ms por fotograma *incluida* la sobrecarga por fotograma del navegador). En escritorio, el objetivo es normalmente 90 Hz (11 ms incluida la sobrecarga).

Para llegar a esos objetivos, necesitarás probar [regularmente en tus dispositivos de destino](/web/tools/chrome-devtools/remote-debugging/), y deberías [usar la función Timeline de Chrome DevTools para medir tus costos por fotograma](/web/tools/chrome-devtools/evaluate-performance/timeline-tool).

## Adopta la mejora progresiva

<img src="img/touch-input.png" class="attempt-right" alt="Usa mejora progresiva para maximizar el alcance" />

¿Qué puedes hacer si tus usuarios no cuentan con gafas de realidad ("HMD") u otro dispositivo con capacidad para RV? La mejor respuesta es usar mejora progresiva.

1. Debes suponer que el usuario usa entradas tradicionales, como teclado, mouse o pantalla táctil sin acceso a gafas de RV.
2. Debes poder adaptarte a los cambios en la disponibilidad de entradas y gafas durante el tiempo de ejecución.

Afortunadamente las [WebVR API](https://developer.mozilla.org/en-US/docs/Web/API/WebVR_API) hacen posible detectar cambios en el entorno de RV para que podamos descubrir y adaptarnos a los cambios en las opciones de entrada y visualización del dispositivo del usuario.

Al considerar un entorno que no sea de RV, en primer lugar puedes maximizar el alcance de tus experiencias y asegurarte de que ofreces la mejor experiencia posible sin importar con qué equipo cuenten tus usuarios.

Para obtener más información, lee nuestra guía sobre [agregar entrada a una escena de WebVR](./adding-input-to-a-webvr-scene/).


{# wf_devsite_translation #}
