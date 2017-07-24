project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: En los dispositivos con capacidades de telefonía, permite que los usuarios se conecten directamente contigo con solo tocar un número de teléfono, un método conocido más comúnmente como “Clic para llamar”.

{# wf_updated_on: 2017-07-17 #}
{# wf_published_on: 2014-06-17 #}

# Hacer clic para llamar {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

En los dispositivos con capacidades de telefonía, permite que los usuarios se conecten
directamente contigo con solo tocar un número de teléfono, un método conocido más comúnmente como “Clic para llamar”.

### TL;DR {: .hide-from-toc }

* Agrupa todos los números de teléfono en hipervínculos con el esquema de `tel:`.
* Usa siempre el formato de marcación internacional.


## Vincula números de teléfono para clic para llamar

Si bien muchos navegadores móviles modernos detectan automáticamente números de teléfono 
y los convierten en vínculos, te recomendamos hacer esto directamente en tu código.
Etiquetando manualmente cada número de teléfono, puedes asegurarte de que los números de teléfono estén siempre
habilitados para la función “Clic para llamar” y que tengan un estilo que coincida con tu sitio.

Para marcar un número de teléfono como un vínculo, usa el esquema `tel:`.  La sintaxis es 
simple:


    NIST Telephone Time-of-Day Service 
	<a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

Tu navegador muestra esta sintaxis de la siguiente manera:

NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

<div class="attempt-right">
  <figure>
    <img src="images/click-to-call_framed.jpg" >
    <figcaption>Ejemplo de clic para llamar.</figcaption>
  </figure>
</div>

En la mayoría de los dispositivos con capacidades telefónicas, el usuario recibirá una
confirmación antes de que se marque el número, a fin de garantizar que no se engañe a los usuarios
para que realicen llamadas costosas a números de teléfono premium o de larga distancia.
Si el dispositivo no admite llamadas telefónicas, a los usuarios se les mostrará un
menú en el que podrán elegir cómo se debe usar el número en el navegador.

En los navegadores de escritorio que no sean compatibles con llamadas de voz, se abre la
app de telefonía predeterminada en la computadora; por ejemplo, Google Voice o Microsoft
Communicator.

## Usa el formato de marcación internacional

Proporciona siempre el número de teléfono en formato de marcación internacional: 
el signo más (`+`), el código de país, el código de área y el número.  Si bien no es absolutamente
necesario, te recomendamos separar cada segmento del número con un
guión (`-`) para facilitar la lectura y mejorar la detección automática.

El uso del formato de marcación internacional con guiones garantizará que se pueda realizar la llamada, independientemente del lugar
desde el cual llame el usuario (ya sea desde unos cientos de metros o desde miles
de kilómetros de distancia).

## Inhabilita la detección automática cuando sea necesario

Los navegadores móviles modernos detectan automáticamente los números de teléfono y habilitan la función
“clic para llamar”. Mobile Safari convierte automáticamente los números de teléfono en vínculos
con los estilos de hipervínculos asociados. Chrome para Android detecta automáticamente
los números de teléfono y permite a los usuarios hacer clic para llamar, pero no los agrupa
en hipervínculos ni aplica estilos especiales.

Si no deseas que Mobile Safari detecte automáticamente los números de teléfono, agrega la
siguiente metaetiqueta en la parte superior de la página:


    <meta name="format-detection" content="telephone=no">


## Otras características de la función “Clic para llamar”

Además del esquema `tel:`, algunos navegadores modernos también admiten los esquemas `sms:`
y `mms:`, aunque la compatibilidad no es constante y algunas
funciones, como la configuración del cuerpo del mensaje, no siempre funcionan. 


{# wf_devsite_translation #}
