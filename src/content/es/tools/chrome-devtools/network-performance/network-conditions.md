project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Fácilmente pueden pasarse por alto las condiciones de red que tus usuarios experimentarán en los dispositivos móviles. Usa DevTools para emular diferentes condiciones de red. Si solucionas los problemas de tiempo de carga, los usuarios te lo agradecerán.

{# wf_updated_on: 2015-07-20 #}
{# wf_published_on: 2015-04-13 #}

# Optimizar el rendimiento en condiciones de red cambiantes {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/jonathangarbee.html" %}

Fácilmente pueden pasarse por alto las condiciones de red que tus usuarios experimentarán en los dispositivos móviles. Usa DevTools para emular diferentes condiciones de red. Si solucionas los problemas de tiempo de carga, los usuarios te lo agradecerán.


### TL;DR {: .hide-from-toc }
- Sin afectar el tráfico a otras pestañas, evalúa el rendimiento del sitio con el emulador de red de Chrome DevTools.
- Usa perfiles personalizados que sean específicos para las condiciones de red de tu público.


## Emular la conectividad de red

El condicionamiento de la red te permite probar el sitio en diferentes conexiones de red; por ejemplo, Edge, 3G e, incluso, sin conexión.
Limita el procesamiento máximo de descarga y carga (índice de transferencia de datos).
La manipulación de la latencia aplica un retraso mínimo al tiempo de ida y vuelta (RTT) de la conexión.

El condicionamiento de la red se activa en el panel Network.
Selecciona una conexión de la lista desplegable para aplicar el límite de la red y la manipulación de la latencia.

![Selección del límite de la red](imgs/throttle-selection.png)

**Sugerencia**: también puedes establecer el límite de la red por medio del panel lateral 
[Network conditions](#network-conditions).

Cuando se habilite un límite, el indicador del panel mostrará un ícono de advertencia.
La finalidad de esto es recordarte que el límite está habilitado cuando te encuentres en otros paneles.

![Selector de panel Network con indicador de advertencia](imgs/throttling-enabled.png)

## Límites personalizados

DevTools ofrece una base sólida de condiciones predeterminadas.
Es posible que debas agregar condiciones personalizadas para abarcar las condiciones principales de tu público.

Para agregar una condición, abre la lista desplegable a fin de aplicar una condición.
En el encabezado **custom**, busca y selecciona la opción **Add...**.
De esta manera, se abrirá el cuadro de diálogo de configuración de DevTools con la pestaña "Throttling" abierta.

![Índice de configuración de límite](imgs/throttle-index.png)

Primero, haz clic en el botón **Add custom profile**.
Se abrirá un formulario insertado para indicar las condiciones del perfil.
Completa correctamente el formulario y presiona el botón **Add** cuando hayas incluido la información necesaria.

![Agregado de un límite personalizado en la configuración de límites](imgs/add-custom-throttle.png)

Puedes modificar un perfil personalizado existente desplazándote sobre la entrada.
Al hacer esto, se muestran los íconos **Edit** y **Delete** a la derecha de la entrada.

![Modificación de entrada personalizada en la configuración de límites](imgs/hover-to-modify-custom-throttle.png)

Ahora puedes cerrar el cuadro de diálogo de configuración.
Los perfiles personalizados nuevos aparecerán debajo del encabezado **custom** para seleccionar una condición.

## Abrir el panel lateral de condiciones de red {:#network-conditions}

Puedes acceder a las funciones de red mientras otros paneles laterales de DevTools están abiertos mediante el
panel lateral **Network conditions**. 

![Panel lateral Network conditions](imgs/network-drawer.png)

Accede al panel lateral desde el menú principal de DevTools (**Main Menu** > **More Tools** >
**Network Conditions**).

![Apertura del panel lateral Network conditions](imgs/open-network-drawer.png)


{# wf_devsite_translation #}
