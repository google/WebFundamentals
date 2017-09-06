project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Depure WebViews nos seus aplicativos Android usando o Chrome Developer Tools.

{# wf_updated_on: 2015-07-29 #}
{# wf_published_on: 2015-04-13 #}

# Depuração remota de WebViews {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}

Depure WebViews nos seus aplicativos Android usando o Chrome Developer Tools.

No Android 4.4 (KitKat) ou posterior,
use o DevTools para depurar o conteúdo do WebView em aplicativos nativos do Android.


### TL;DR {: .hide-from-toc }
- Ative a depuração de WebView no seu aplicativo Android nativo. Depure WebViews no Chrome DevTools.
- Acesse a lista de WebViews depuráveis via <strong>chrome://inspect</strong>.
- Depurar WebViews é a mesma coisa que depurar uma página da Web por <a href='/web/tools/chrome-devtools/debug/remote-debugging'>depuração remota</a>.


## Configurar WebViews para depuração

A depuração por WebView deve ser ativada a partir do aplicativo. Para ativar a depuração de WebView, chame o método estático [setWebContentsDebuggingEnabled](https://developer.android.com/reference/android/webkit/WebView.html#setWebContentsDebuggingEnabled(boolean)) na classe WebView.


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        WebView.setWebContentsDebuggingEnabled(true);
    }
    

Esta configuração aplica-se a todas as WebViews do aplicativo.

**Dica**: A depuração de WebView **não** é afetada pelo estado do sinalizador `debuggable` no manifesto do aplicativo. Se quiser ativar a depuração de WebView somente quando `debuggable` for `true`, teste o sinalizador em tempo de execução.


    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        if (0 != (getApplicationInfo().flags & ApplicationInfo.FLAG_DEBUGGABLE))
        { WebView.setWebContentsDebuggingEnabled(true); }
    }
    

## Abra uma WebView no DevTools

A página **chrome://inspect** exibe uma lista de WebViews depuráveis no seu dispositivo.

Para começar a depuração, clique em **inspect** abaixo da WebView que deseja depurar. Use o DevTools como se fosse uma guia de navegador remota.

![Inspeção de elementos em uma WebView](imgs/webview-debugging.png)

Os gráficos cinza listados com a WebView representam seu tamanho e sua posição em relação à tela do dispositivo. Se suas WebViews tiverem títulos, eles também serão listados.

## Solução de problemas

Não consegue ver suas WebViews na **página chrome://inspect**?

* Verifique se a depuração de WebView está ativa no aplicativo.
* No dispositivo, abra o aplicativo com a WebView que deseja depurar. Em seguida, atualize a página **chrome://inspect**.


{# wf_devsite_translation #}
