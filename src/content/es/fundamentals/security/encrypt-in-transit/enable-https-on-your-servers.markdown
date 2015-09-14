---
title: "Habilitación de HTTPS en sus servidores"
description: "Ya se encuentra preparado para el paso importantísimo de habilitar HTTPS en sus servidores."
updated_on: 2015-03-27
translation_priority: 0
key-takeaways:
  - "Utilice la herramienta Configuración del servidor de Mozilla para configurar su servidor para que sea compatible con HTTPS."
  - "Pruebe regularmente su sitio con la práctica herramienta SSL Server Test de Qualys y asegúrese de obtener el puntaje A o A+ como mínimo."
---

<p class="intro">
  Ya se encuentra preparado para el paso importantísimo de habilitar HTTPS en sus servidores.
</p>

{% include shared/takeaway.liquid list=page.key-takeaways %}

{% include shared/toc.liquid %}

En este punto, debe tomar una decisión crucial sobre las operaciones:

* dedicar una dirección IP diferente para cada nombre de host del que obtenga contenido su servidor
 web, o
* utilizar el alojamiento virtual basado en nombres.

Si ha estado utilizando una dirección IP diferente para cada nombre de host, ¡fantástico! Esto le permitirá
brindar compatibilidad fácilmente con HTTP y HTTPS para todos los clientes.

Sin embargo, la mayoría de los operadores utilizan alojamiento virtual basado en nombres para conservar las direcciones 
IP y porque, en general, resulta más conveniente. El problema con IE en
Windows XP y las versiones de Android anteriores a 2.3 es que este navegador no comprende la SNI [Indicación
de nombre de servidor](https://en.wikipedia.org/wiki/Server_Name_Indication),
que es fundamental para los alojamientos virtuales HTTPS basados en nombres.

En el futuro, y esperamos que sea un futuro cercano, los clientes que no posean compatibilidad con la SNI serán reemplazados
por el software moderno. Controle la cadena de agente de usuario en sus registros de solicitudes para saber
cuándo una cantidad suficiente de la población de usuarios migró hacia un software moderno. (Usted puede
decidir cuál es su límite; tal vez el &lt; 5 % o el &lt; 1 %, o el valor que prefiera).

Si el servicio HTTPS aún no está disponible en sus servidores, habilítelo ahora mismo
(sin redireccionar HTTP a HTTPS; consulte la información a continuación). Configure su servidor web para utilizar
los certificados que compró e instaló. La herramienta [práctico generador de 
configuraciones
de Mozilla](https://mozilla.github.io/server-side-tls/ssl-config-generator/)
puede resultarle útil.

Si posee muchos nombres de host o subdominios, en cada uno deberá utilizar el 
certificado adecuado.

**NOTA:** Muchos operadores de sitios ya realizaron los pasos que mencionamos, pero están
utilizando HTTPS con el único fin de redirigir a los clientes nuevamente a HTTP. Si
está haciendo esto, deje de hacerlo ahora mismo. Consulte la próxima sección para asegurarse de que HTTPS y HTTP
funcionan correctamente.

**NOTA:** En última instancia, debe redirigir las solicitudes de HTTP a HTTPS y utilizar la HSTS (seguridad de
 transporte HTTP estricta). Esta no es la etapa adecuada del proceso de migración para hacerlo
. Consulte "Redireccionamiento de HTTP a HTTPS" y "Activación de la seguridad de transporte estricta y cookies de seguridad".

Ahora mismo, y durante el tiempo que dure su sitio, verifique la configuración de HTTPS a través de la
[práctica herramienta SSL Server Test de Qualys](https://www.ssllabs.com/ssltest/). Su sitio
debe obtener una puntuación de A o A+. Considere como error todo lo que haga bajar este puntaje.
(Una A hoy equivale a una B en el futuro, ya que los ataques en contra de los algoritmos y los protocolos
son cada vez más eficientes).

