project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprenda a animar vistas modales en sus aplicaciones.

{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2014-08-08 #}

# Animación de las vistas modales {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}


Las vistas modales se utilizan para mensajes importantes, y se pueden utilizar para bloquear la interfaz del usuario. Se debe tener precaución al utilizarlas, ya que pueden ser perturbadoras y pueden arruinar fácilmente la experiencia del usuario si se las usa en exceso. Sin embargo, en algunos casos son las vistas adecuadas, ya que cobran vida cuando se les agrega algún tipo de animación.

### TL;DR {: .hide-from-toc }
- Las vistas modales se deben utilizar de forma moderada, ya que los usuarios se frustrarán si interrumpe su experiencia innecesariamente.
- Se puede agregar una escala a la animación para lograr un agradable efecto de 'colocación'.
- Asegúrese de hacer desaparecer rápidamente la vista modal cuando el usuario la descarta, pero debe hacerla aparecer en la pantalla un poco más lentamente para que el usuario no se sorprenda.


<img src="images/dont-press.gif" alt="Animating a modal view." />

<a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ui/animations/modal-view-animation.html">Ver el ejemplo</a>

La superposición modal debe estar alineada con la ventanilla, por lo que el atributo `position` debe configurarse en `fixed`:


    .modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    
      pointer-events: none;
      opacity: 0;
    
      will-change: transform, opacity;
    }
    

Este atributo posee un valor inicial de 0 de `opacity`, y por ello está oculto, pero luego también se deberá configurar `pointer-events` en `none` para que se puedan ejecutar los clics y los toques. Si esto no se realiza, se bloquearán todas las interacciones, y la página completa dejará de responder. Finalmente, puesto que se animarán los atributos `opacity` y `transform`, estos deberán marcarse con`will-change` como modificaciones (consulte también [Uso de la propiedad will-change](animations-and-performance#using-the-will-change-property)).

Cuando la vista esté visible, esta deberá aceptar las interacciones y deberá tener un valor de 1 de `opacity`:


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

Ahora bien, cada vez que se requiera la vista modal, podrá utilizar JavaScript para alternar la clase "visible":


    modal.classList.add('visible');
    

En este punto, la vista modal aparecerá sin ninguna animación, por lo que ahora se podrá agregar 
(consulte también [Aceleración personalizada](custom-easing)):


    .modal {
      -webkit-transform: scale(1.15);
      transform: scale(1.15);
    
      -webkit-transition:
        -webkit-transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.1s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

Si se agrega `scale` a la propiedad transform, la vista se colocará en la pantalla suavemente, el cual es un efecto agradable. La transición predeterminada se aplica a las propiedades transform y opacity con una curva personalizada y una duración de 0,1 segundos.

La duración es bastante breve, pero es ideal para los casos en los que el usuario descarta la vista y desea regresar a su aplicación. El punto negativo es que, probablemente, la aparición de la vista modal es demasiado agresiva. Para solucionarlo, debe anular los valores de transición para la clase `visible`:


    .modal.visible {
    
      -webkit-transform: scale(1);
      transform: scale(1);
    
      -webkit-transition:
        -webkit-transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
      transition:
        transform 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946),
        opacity 0.3s cubic-bezier(0.465, 0.183, 0.153, 0.946);
    
    }
    

Ahora, la vista modal demorará 0,3 segundos en aparecer en la pantalla, lo cual es un poco menos agresivo, pero se descartará rápidamente, que es algo que el usuario seguro valorará.



