project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Polymer Starter Kit.

{# wf_published_on: 2015-01-01 #}
{# wf_updated_on: 2016-09-12 #}

# Polymer Starter Kit {: .page-title }

[Descargar Polymer Starter Kit](https://github.com/polymerelements/polymer-starter-kit/releases){: .button .button-primary }

## ¿Qué es Polymer Starter Kit?

[Polymer Starter Kit](https://github.com/PolymerElements/polymer-starter-kit){: .external }
es un punto de inicio para compilar apps por medio de un diseño basado en paneles laterales. El diseño 
es suministrado por los elementos de `app-layout`.

Esta plantilla, junto con el conjunto de herramientas `polymer-cli`, también demuestra el uso
del "patrón PRPL". Este patrón permite una primera entrega y una interacción rápida
con el contenido en la ruta inicial solicitada por el usuario, junto con una
navegación posterior rápida, gracias al almacenamiento previo en caché de los componentes restantes requeridos por la app y
cargándolos progresivamente a demanda a medida que el usuario navega a través de la app.

El patrón PRPL, en resumen:

* **Push** de los componentes requeridos para la ruta inicial
* **Representación** de la ruta inicial a la mayor brevedad posible
* **Almacenamiento previo en caché** de los componentes para las rutas restantes
* **Carga diferida** y actualización progresiva de las siguientes rutas bajo demanda

### ¿Estás migrando desde Polymer Starter Kit v1?

[Consulta la publicación de nuestro blog sobre las novedades de PSK2 y cómo hacer una migración](https://www.polymer-project.org/1.0/blog/2016-08-18-polymer-starter-kit-or-polymer-cli.html){: .external }

## Configuración

### Requisitos previos

Instalar [polymer-cli](https://github.com/Polymer/polymer-cli){: .external }:

    npm install -g polymer-cli

### Inicializar el proyecto desde la plantilla

    mkdir my-app
    cd my-app
    polymer init starter-kit

### Iniciar el servidor de desarrollo

Este comando funciona con la app en `http://localhost:8080` y proporciona el enrutamiento URL básico
para la app:

    polymer serve --open


### Compilar

Este comando hace la reducción de HTML, CSS y JS en las dependencias
de la app, y genera un archivo service-worker.js con un código para almacenar previamente en caché las
dependencias según el punto de entrada y los fragmentos especificados en `polymer.json`.
Los archivos reducidos se envían a la carpeta `build/unbundled`, y son adecuados
para utilizarse desde un servidor HTTP/2+Push compatible.

Además, el comando crea una carpeta `build/bundled` de reserva,
generada por medio del agrupamiento de fragmentos, ideal para utilizarse desde servidores compatibles no
H2/push o para clientes que no admiten H2/Push.

    polymer build

### Vista previa de la compilación

Este comando se usa con la versión reducida de la app en `http://localhost:8080`
en estado no agrupado, como la usaría un servidor compatible con push.

    polymer serve build/unbundled

Este comando se usa con la versión reducida de la app en `http://localhost:8080`
generada por medio del agrupamiento de fragmentos:

    polymer serve build/bundled

### Ejecutar pruebas

Este comando ejecutará el
[Comprobador de componentes web](https://github.com/Polymer/web-component-tester){: .external } contra los
navegadores actualmente instalados en tu máquina.

    polymer test

### Agregar una vista nueva

Puedes extender la app mediante la incorporación de nuevas vistas que se cargarán a pedido;
p. ej., en base a una ruta, o para suministrar progresivamente secciones no críticas
de la app.  Cada fragmento nuevo cargado a pedido se debe agregar a la
lista de `fragments` del archivo `polymer.json` incluido.  De esta manera, se garantiza que
estos componentes y sus dependencias sean agregados a la lista de componentes
almacenados previamente en caché (y habrá nuevos grupos creados en la compilación `bundled` de reserva).

## Próximos pasos

Consulta la [guía de introducción](https://www.polymer-project.org/1.0/start/toolbox/set-up){: .external }

## Más información

Para obtener más información, ver el código, enviar un problema o participar, consulta
nuestro informe Git en [https://github.com/polymerelements/polymer-starter-kit](https://github.com/polymerelements/polymer-starter-kit){: .external }


{# wf_devsite_translation #}
