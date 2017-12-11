project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Depura WebViews en tus apps Android nativas con las herramientas para desarrolladores de Chrome.

{# wf_updated_on: 2015-07-29 #}
{# wf_published_on: 2015-04-13 #}

# WebViews con depuración remota {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Depura WebViews en tus apps Android nativas con las herramientas para desarrolladores de Chrome.

En Android 4.4 (KitKat) o posteriores,
usa DevTools para depurar el contenido de WebView en las apps de Android nativas.


### TL;DR {: .hide-from-toc }
- Habilita la depuración de WebView en tu app Android nativa; depura WebViews en Chrome DevTools.
- Obtén acceso a una lista de WebViews habilitadas para depuración a través de <strong>chrome://inspect</strong>.
- Depurar WebViews es igual a depurar una página web a través de la <a href='/web/tools/chrome-devtools/debug/remote-debugging'>depuración remota</a>.


## Configurar WebViews para depuración

La depuración de WebView se debe habilitar desde dentro de la app. Para habilitar la depuración de WebView, llama al método estático [setWebContentsDebuggingEnabled](https://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean)) en la clase WebView.


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true);
    }
    

Esta configuración servirá para todas las WebViews de la app.

**Sugerencia**: La depuración de WebView **no** se ve afectada por el estado del indicador `debuggable` en el manifiesto de la aplicación. Si deseas habilitar la depuración de WebView solo cuando `debuggable` sea `true`, prueba el indicador durante el tiempo de ejecución.


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE))
        { WebView.setWebContentsDebuggingEnabled(true); }
    }
    

## Abre un WebView en DevTools

La página **chrome://inspect** muestra una lista de WebViews habilitadas para depuración en tu dispositivo.

Para comenzar a depurar, haz clic en **inspect**, debajo del WebView que quieres depurar. Usa DevTools como lo harías para una pestaña de un navegador remoto.

![Inspección de elementos en un WebView](imgs/webview-debugging.png)

Los gráficos en gris que se enumeran con WebView representan su tamaño y posición relativos a la pantalla del dispositivo. Si tus WebViews tienen títulos, también se mostrarán en la lista.

## Solución de problemas

¿No puedes ver tus WebViews en la página **chrome://inspect**?

* Verifica que la depuración de WebView esté habilitada para tu app.
* En tu dispositivo, abre la app con la WebView que desees depurar. Luego, actualiza la página **chrome://inspect**.


{# wf_devsite_translation #}
