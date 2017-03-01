project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Romper la simetría proporciona contraste a tus proyectos y los hace atractivos. Aprende cuándo y cómo aplicar esto en sus proyectos.

{# wf_updated_on: 2014-10-21 #}
{# wf_published_on: 2014-08-08 #}

# Sincronización asimétrica de animaciones {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

La sincronización asimétrica de animaciones mejora la experiencia del usuario ya que te permite expresar personalidad y, al mismo tiempo, responder rápidamente a las interacciones del usuario. Además, se genera un contraste en la experiencia. Esto hace más atractiva la interfaz.

### TL;DR {: .hide-from-toc }
* Usa la sincronización asimétrica de animaciones para agregar personalidad y contraste a tus trabajos.
* Siempre debes priorizar la interacción del usuario. Para ello, usa duraciones más cortas para los casos en que respondas a toques o clics, y reserva las más prolongadas para casos contrarios.


Al igual que la mayoría de las “reglas” de animación, deberías experimentar para determinar qué se adapta mejor a tu app; pero cuando se trata de la experiencia de los usuarios, está a la vista que estos son impacientes. La regla de oro es que **siempre brindar una respuesta rápida a la interacción del usuario**. Dicho esto, en la mayoría de los casos, la acción del usuario es asimétrica y, por lo tanto, lo mismo puede suceder con la animación.

Por ejemplo, cuando un usuario pulsa para mostrar una barra lateral, deberías mostrarla lo más rápido posible, con una duración aproximada de 100 ms. No obstante, cuando el usuario descarta el menú, puedes permitirte animar la vista un poco más lentamente; por ejemplo, al rededor de 300 ms.

Por el contrario, al mostrarse una vista modal, normalmente esta usará para mostrar un error o algún otro mensaje importante. En estos casos, es mejor que muestres la vista con un poco más de lentitud; una vez más, aproximadamente 300 ms, pero el descarte, activado por el usuario, debe producirse muy rápido.

Por lo tanto, la regla de oro general es la siguiente:

* En el caso de las animaciones de la IU activadas a partir de la interacción del usuario, como las transiciones de vistas o la visualización de un elemento, realiza una introducción rápida (duración corta) y un cierre lento (duración más larga).
* En el caso de las animaciones de la IU que se activen a partir de tu código, como los errores o las vistas modales, realiza introducción más lenta (duración más larga) y un cierre rápido (duración corta).


{# wf_devsite_translation #}
