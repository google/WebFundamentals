project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Aloja un sitio en un servidor web de un equipo de desarrollo y accede al contenido desde un dispositivo Android.

{# wf_updated_on: 2016-04-07 #}
{# wf_published_on: 2015-04-13 #}

# Acceder a servidores locales {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

Aloja un sitio en un servidor web de un equipo de desarrollo y 
accede al contenido desde un dispositivo Android.

Con un cable USB y Chrome DevTools, puedes ejecutar un sitio desde un equipo de
desarrollo y ver el sitio en un dispositivo Android. 


### TL;DR {: .hide-from-toc }
- La redirección de puertos te permite ver el contenido del servidor web de tu equipo de desarrollo en tu dispositivo Android.
- Si el servidor web usa un dominio personalizado, puedes configurar tu dispositivo Android para tener acceso al contenido del dominio mediante la asignación de dominios personalizados.


## Configurar la redirección de puertos {:#port-forwarding}

Con la redirección de puertos, tu dispositivo Android puede acceder al contenido
alojado en el servidor web de tu equipo de desarrollo. La redirección de puertos
crea en tu dispositivo Android un puerto TCP de recepción que realiza una asignación al puerto TCP
del equipo de desarrollo. El tráfico entre los puertos viaja a través de la conexión
USB que conecta tu dispositivo Android al equipo de desarrollo. De esta forma, la
conexión no depende de la configuración de red.

Para habilitar la redirección de puertos, realiza lo siguiente:

1. Configura [la depuración remota](.) entre el equipo de desarrollo
   y tu dispositivo Android. Cuando hayas terminado, tu dispositivo
   Android debería aparecer en el menú izquierdo del diálogo **Inspect Devices** junto con un indicador de estado 
   **Connected**.
1. En el diálogo **Inspect Devices** de DevTools, habilita **Port forwarding**.
1. Haz clic en **Add rule**.

   ![Agregar una regla de redirección de puertos](imgs/add-rule.png)
1. En el campo de texto **Device port** de la izquierda, ingresa el número de puerto de `localhost` a través del cual 
   deseas tener acceso al sitio con tu dispositivo 
   Android. Por ejemplo, si deseas acceder al sitio desde `localhost:5000`, debes 
   ingresar `5000`.
1. En el campo de texto **Local address** de la derecha, ingresa la dirección IP o el nombre de host 
  desde los cuales se ejecuta tu sitio en el servidor
   web del equipo de desarrollo, y agrega el número del puerto. Por ejemplo, si tu sitio se ejecuta 
   en `localhost:7331`, ingresarás `localhost:7331`.
1. Haz clic en **Add**.

La redirección de puertos ya está configurada. En la pestaña del dispositivo, en el
diálogo **Inspect Devices**, podrás ver un indicador con el estado de la redirección de puertos.

![Estado de la redirección de puertos](imgs/port-forwarding-status.png)

Para ver el contenido, abre Chrome en tu dispositivo Android y ve 
al puerto `localhost` que especificaste en el campo **Device port**. Por 
ejemplo, si ingresaste `5000` en el campo, accederás a 
`localhost:5000`. 

## Asignar a dominios locales personalizados {:#custom-domains}

La asignación a dominios personalizados te permite ver en un dispositivo Android
el contenido de un servidor web de tu equipo de desarrollo con dominio personalizado.

Por ejemplo, supongamos que en tu sitio se usa una biblioteca JavaScript de terceros
que solo funciona en el dominio `chrome.devtools` incluido en la lista blanca. Crearás
una entrada en el archivo `hosts` de tu equipo de desarrollo para asignar este dominio 
a `localhost` (es decir, `127.0.0.1 chrome.devtools`). Tras configurar la asignación de dominios 
personalizados y la redirección de puertos, podrás ver el sitio en tu
dispositivo Android en la URL `chrome.devtools`. 

### Fijar la redirección de puertos a un servidor proxy

Para la asignación a un dominio personalizado, debes ejecutar un servidor proxy en el equipo de 
desarrollo. [Charles][charles], [Squid][squid] 
y [Fiddler][fiddler] son ejemplos de servidores proxy.

Para fijar la redirección de puertos a un proxy, realiza lo siguiente:

1. Ejecuta el servidor proxy y anota el puerto que usa. **Nota**: El 
   servidor proxy y tu servidor web deben funcionar en puertos diferentes.
1. Establece la [redirección de puertos](#port-forwarding) hacia tu dispositivo Android. En
   el campo **Local address**, ingresa `localhost:` seguido del puerto de tu
   servidor proxy. Por ejemplo, si se ejecuta en el puerto `8000`,
 debes ingresar `localhost:8000`. En el campo **Device port**, ingresa 
   el número en el cual deseas que realice la recepción el dispositivo Android; por ejemplo, `3333`.

[charles]: http://www.charlesproxy.com/
[squid]: http://www.squid-cache.org/
[fiddler]: http://www.telerik.com/fiddler

### Establece la configuración del proxy en tu dispositivo

A continuación, debes configurar tu dispositivo Android para que se comunique con el 
servidor proxy. 

1. En tu dispositivo Android, ve a **Settings** > **Wi-Fi**.
1. Mantén presionado el nombre de la red a la que estás actualmente conectado.
   **Nota**: Los ajustes de proxy son por cada red.
3. Presiona **Modify network**.
4. Presiona **Advanced options**. Se mostrará la configuración del proxy.
5. Presiona el menú **Proxy** y selecciona **Manual**.
6. En el campo **Proxy hostname**, ingresa `localhost`.
7. En el campo **Proxy port**, ingresa el número de puerto que escribiste
   en **Device port**, en la sección anterior.
8. Presiona **Save**.

Con esta configuración, el dispositivo redireccionará todas las solicitudes al proxy de 
tu equipo de desarrollo. El proxy realiza solicitudes en nombre de tu dispositivo. 
De esta forma, las solicitudes a tu dominio local personalizado se efectúan correctamente.

Ahora podrás acceder a dominios personalizados en tu dispositivo Android como lo 
harías en el equipo de desarrollo. 

Si tu servidor web se ejecuta en un puerto no estándar,
no olvides especificar el puerto cuando solicites contenido desde tu dispositivo
Android. Por ejemplo, si en tu servidor web se usa el dominio personalizado 
`chrome.devtools` en el puerto `7331`, debes
emplear la URL `chrome.devtools:7331` cuando veas el sitio desde tu dispositivo Android. 

**Sugerencia**: Para volver a la navegación normal, no olvides revertir los ajustes del proxy en 
tu dispositivo Android al desconectarte del equipo de desarrollo.


{# wf_devsite_translation #}
