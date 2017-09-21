project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Aprende a animar vistas modales en tus apps.

{# wf_updated_on: 2016-08-24 #}
{# wf_published_on: 2014-08-08 #}

# Animación de vistas modales {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/dont-press.gif" alt="Animación de una vista modal." />
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/modal-view-animation.html" target="_blank" class="external">Probar</a>
    </figcaption>
  </figure>
</div>

Las vistas modales se usan para mensajes importantes. Por ello, tienes muy buenos motivos para bloquear la interfaz del usuario. Úsalas con cuidado ya que, si se usan demasiado, pueden resultar molestas y arruinar la experiencia del usuario. Sin embargo, en algunos casos son las vistas adecuadas, y cobran vida cuando se les agrega algún tipo de animación.

### TL;DR {: .hide-from-toc }
* Usa las vistas modales con moderación. Los usuarios se molestan si interrumpes su experiencia sin necesidad.
* Se puede agregar una escala a la animación para lograr un agradable efecto de “aparición”.
* Quita rápidamente la vista modal cuando el usuario la descarte. Sin embargo, trae la vista modal a la pantalla de manera más lenta para que no sorprenda al usuario.

<div class="clearfix"></div>

La superposición modal debería estar alineada con la ventana de visualización; para ello, configura su `position` en `fixed`:


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
    

Posee un valor inicial de 0 de `opacity` y por ello está oculta, pero luego también deberá configurarse `pointer-events` en `none` para que los clics y los toques pasen a la capa inferior. Si esto no se realiza, se bloquearán todas las interacciones y toda la página dejará de responder. Finalmente, puesto que se animarán los atributos `opacity` y `transform`, estos deberán marcarse como modificaciones con `will-change` (consulta también [Uso de la propiedad will-change](animations-and-performance#using-the-will-change-property)).

Cuandvero la vista sea visible, deberá aceptar las interacciones y deberá tener un valor 1 de `opacity`:


    .modal.visible {
      pointer-events: auto;
      opacity: 1;
    }
    

Cada vez que se requiera la vista modal, podrás usar JavaScript para alternar la clase “visible”:


    modal.classList.add('visible');
    

En este momento, la vista modal aparece sin animación, por lo que ahora puedes agregar eso
(consulta también [Aceleración personalizada](custom-easing)):


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
    

Si agregas `scale` a la propiedad transform, la vista parecerá posarse en la pantalla suavemente, lo cual generará un efecto agradable. La transición predeterminada se aplica a las propiedades transform y opacity con una curva personalizada y una duración de 0,1 segundos.

La duración es bastante breve, pero resulta ideal para los casos en los cuales el usuario descarte la vista y desee regresar a tu app. El punto negativo es que esto probablemente sea demasiado agresivo para el momento en que aparezca la vista modal. Para solucionarlo, anula los valores de transición para la clase `visible`:


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
    

Ahora, la vista modal tarda 0.3 segundos en aparecer en pantalla. Esto es un poco menos agresivo, pero se descarta rápidamente y el usuario seguro lo valorará.





{# wf_devsite_translation #}
