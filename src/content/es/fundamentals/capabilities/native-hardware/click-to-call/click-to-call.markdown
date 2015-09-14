---
title: "Clic para llamar"
description: "En los dispositivos con capacidades de telefonía, permita que los usuarios se comuniquen directamente con usted de una forma fácil que consiste en hacer clic en un número de teléfono. Esta función, a menudo, se conoce como clic para llamar."
updated_on: 2014-10-21
translation_priority: 1
key-takeaways:
  c2c: 
    - "Agrupe todos los números telefónicos en hipervínculos con el esquema <code>tel:</code>."
    - "Utilice siempre el formato internacional de marcación."
comments: 
  # NOTE: If the section titles or URL changes the following shortlinks must be updated
  - g.co/mobilesiteprinciple12
---

<p class="intro">
  En los dispositivos con capacidades de telefonía, permita que los usuarios se comuniquen directamente con usted de una forma fácil que consiste en hacer clic en un número de teléfono. Esta función, a menudo, se conoce como clic para llamar.
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.c2c %}

## Vinculación de números telefónicos para clic para llamar

Aunque en muchos navegadores móviles modernos se detectan automáticamente los números telefónicos 
y se los convierte en vínculos, le recomendamos que lo haga directamente en su código.
Si coloca etiquetas de forma manual en cada número telefónico, podrá asegurarse de que los números telefónicos estén siempre
habilitados para la función clic para llamar y que tengan el mismo estilo que su sitio.

Para marcar un número telefónico como un vínculo, utilice el esquema `tel:`.  La sintaxis es 
simple:

{% highlight html %}
NIST Telephone Time-of-Day Service <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>
{% endhighlight %}

El resultado es el siguiente:

Servicio telefónico de la hora del día del NIST <a href="tel:+1-303-499-7111">+1 (303) 499-7111</a>

<img src="images/click-to-call_framed.jpg" class="center" alt="Click to call example.">

En la mayoría de los dispositivos con capacidades telefónicas, el usuario recibirá una
confirmación antes de que se marque el número, con el fin de garantizar que no se engañe a los usuarios 
para que realicen llamadas costosas a números telefónicos prémium o de larga distancia. 
Si el dispositivo no puede hacer llamadas telefónicas, a los usuarios se les mostrará un
menú en el que podrán elegir cómo se debe utilizar el número en el navegador.

En los exploradores de escritorio que no son compatibles con las llamadas de voz, se abrirá la aplicación de telefonía predeterminada
en la computadora; por ejemplo, Google Voice o Microsoft
Communicator.

## Uso del formato internacional de marcación

Cada vez que deba proporcionar su número telefónico, utilice el formato internacional de marcación: 
signo más (+), código del país, código de área y número.  Aunque no es absolutamente
necesario, se recomienda separar cada segmento del número con un
guión (-) para que se pueda leer más fácilmente y detectar mejor de forma automática.

Si utiliza el formato internacional de marcación con guiones, se asegurará de que, independientemente del lugar
desde donde llame el usuario, ya sea un lugar que está a unos metros o a miles
de kilómetros, la llamada se pueda llevar a cabo.

## Deshabilitación de la detección automática cuando sea necesario

Los navegadores móviles modernos detectan automáticamente los números telefónicos y habilitan la función
clic para llamar.  Mobile Safari convierte automáticamente los números telefónicos en vínculos
con los estilos de hipervínculos asociados.  Chrome para Android detecta automáticamente
los números telefónicos y les permite a los usuarios hacer clic para llamar, pero no los agrupa
en hipervínculos ni aplica estilos especiales.

Si no desea que Mobile Safari detecte automáticamente los números telefónicos, agregue la
siguiente etiqueta META en la parte superior de la página:

{% highlight html %}
<meta name="format-detection" content="telephone=no">
{% endhighlight %}

## Otras características de la función clic para llamar

Además del esquema `tel:`, algunos navegadores modernos también son compatibles con los esquemas `sms:`
y `mms:`, aunque la compatibilidad no es constante, y algunas
funciones como la configuración del cuerpo del mensaje no siempre funcionan.  

