project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Conoce los factores clave para la optimización de la ruta de representación crítica.

{# wf_updated_on: 2015-10-05 #}
{# wf_published_on: 2014-03-31 #}

# Optimización de la ruta de representación crítica {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}


  Para proporcionar la mayor rapidez posible en la primera representación, debemos 
  minimizar tres variables:

  <ul>
    <li>La cantidad de recursos críticos</li>
    <li>La longitud de la ruta crítica</li>
    <li>La cantidad de bytes críticos</li>
  </ul>

Un recurso crítico es un recurso que podría bloquear la representación inicial de la página. Mientras menos recursos haya de este tipo, menor trabajo deberá realizar el navegador, la CPU y otros recursos.

Asimismo, la extensión de la ruta crítica depende del gráfico de dependencias entre los recursos críticos y el tamaño en bytes: algunas descargas de recursos solo pueden iniciarse una vez que termina de procesarse el recurso anterior, y cuanto más grande sea el recurso, más recorridos se requerirán para descargarlo.

Por último, cuantos menos bytes críticos deba descargar el navegador, más rápido se podrá procesar el contenido y exhibirlo en la pantalla. Para reducir la cantidad de bytes, podemos disminuir la cantidad de recursos (eliminarlos o hacer que no sean críticos), y asegurarnos de minimizar el tamaño de la transferencia mediante la compresión y la optimización de cada recurso.

**La secuencia general de pasos para optimizar la ruta de acceso de representación crítica es la siguiente:**

1. Analizar y caracterizar tu ruta crítica: cantidad de recursos, bytes y extensión.
1. Minimizar la cantidad de recursos críticos: eliminarlos, diferir su descarga, marcarlos como asincrónicos, etc.
1. Optimizar la cantidad de bytes críticos para reducir el tiempo de descarga (cantidad de recorridos).
1. Optimizar el orden en el que se cargan los recursos críticos restantes: descarga todos los recursos críticos lo más rápido posible para reducir la longitud de la ruta crítica.

<a href="page-speed-rules-and-recommendations" class="gc-analytics-event"
    data-category="CRP" data-label="Next / PageSpeed">
  <button>A continuación: Reglas y recomendaciones de PageSpeed</button>
</a>


{# wf_devsite_translation #}
