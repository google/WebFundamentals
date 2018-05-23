project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Uso de estilo adecuado para mejorar la accesibilidad


{# wf_updated_on: 2018-05-23 #}
{# wf_published_on: 2016-10-04 #}

# Estilos accesibles {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/dgash.html" %}
{% include "web/_shared/contributors/robdodson.html" %}



Hemos explorado dos de los pilares cruciales de la accesibilidad: el foco y la semántica.
Ahora, analicemos un tercero: el estilo. Es un tema amplio que podemos tratar en
tres secciones.

 - Asegurarnos que los elementos tienen el estilo adecuado para respaldar nuestros esfuerzos de accesibilidad, al
   agregar estilos para lograr foco y varios estados de ARIA.
 - Crear un estilo para nuestras IU para que las mismas sean flexibles, y se les pueda hacer zoom o se puedan escalar para
   los usuarios con dificultad para leer texto con letra pequeña.
 - Seleccionar el contraste y los colores adecuados para evitar transmitir información solo con
   color.

## Estilo del foco

Generalmente, siempre que nos enfocamos en un elemento, dependemos del anillo de enfoque
incluido en el navegador (la propiedad CSS `outline`) para darle estilo al elemento. El anillo de enfoque es útil
porque, sin él, es imposible que un usuario que usa el teclado distinga qué elemento
tiene el foco. La [lista de comprobación
de WebAIM](http://webaim.org/standards/wcag/checklist){: .external } destaca
esto, solicitando que "Sea visualmente notable qué element de la página tiene
el foco actual del teclado (es decir, mientras navegas por la página presionan tab, puedes ver dónde
estás)".

![elementos de formulario con anillo de enfoque](imgs/focus-ring.png)

Sin embargo, a veces el anillo de enfoque puede lucir distorsionado o puede no adaptarse
al diseño de tu página. Algunos programadores quitan este estilo por completo configurando
el `outline` del elemento en `0` o `none`. Pero sin indicador de foco, ¿cómo puede
un usuario de teclado saber con qué artículo está interactuando?

Warning: Nunca configures el contorno en 0 ni none sin brindar una alternativa de foco.

Puede ser que conozcas cómo agregar estados de desplazamiento a tus controles con la *pseudoclase*
`:hover` del CSS. Por ejemplo, puedes usar `:hover` en un elemento vínculo
para modificarle el color o el fondo cuando tiene el mouse encima. Como con
`:hover`, puedes usar la pseudoclase `:focus` para seleccionar como objetivo un elemento cuando tiene
foco.

    /* At a minimum you can add a focus style that matches your hover style */
    :hover, :focus {
      background: #c0ffee;
    }

Una solución alternativa al problema de quitar el anillo de enfoque es darle
a tu elemento los mismos estilo de desplazamiento y foco, lo cual resuelve el problema de
"¿Dónde está el foco?" de los usuarios de teclado. Como siempre, mejorar la
experiencia de accesibilidad mejora la experiencia de todos.

### Modalidad de entrada

![un botón HTML nativo con anillo de enfoque](imgs/sign-up.png){: .attempt-right }

Para elementos nativos como `button`, los navegadores pueden detectar si la interacción de usuario
ocurrió mediante mouse o teclado, y suele solo mostrar el
anillo de enfoque para interacción de teclado. Por ejemplo, cuando haces clic en un
`button`  nativo con el mouse, no hay anillo de enfoque, pero, cuando llegas a él presionando tab con el
teclado, aparece el anillo de enfoque.

La lógica es que es menos probable que los usuarios de mouse necesiten el anillo de enfoque
porque saben en qué elemento hicieron clic. Lamentablemente, actualmente no existe
un sola solución para varios navegadores que responda con el mismo comportamiento. Como resultado, si
le das a cualquier elemento un estilo `:focus`, ese estilo aparecerá cuando el
usuario haga clic en el elemento o haga foco en el mismo con el teclado. Intenta hacer clic en este
botón falso y nota que el estilo `:focus` siempre está aplicado.

    <style>
      fake-button {
        display: inline-block;
        padding: 10px;
        border: 1px solid black;
        cursor: pointer;
        user-select: none;
      }

      fake-button:focus {
        outline: none;
        background: pink;
      }
    </style>
    <fake-button tabindex="0">¡Haz clic aquí!</fake-button>

{% framebox height="80px" %}
<style>
  fake-button {
    display: inline-block;
    padding: 10px;
    border: 1px solid black;
    cursor: pointer;
    user-select: none;
  }

  fake-button:focus {
    outline: none;
    background: pink;
  }
</style>
<fake-button tabindex="0">¡Haz clic aquí!</fake-button>
{% endframebox %}

Esto puede resultar molesto y a menudo el programador recurre al uso de
JavaScript con controles personalizados para ayudar a diferenciar entre foco de
mouse y teclado.

En Firefox, la pseudoclase `:-moz-focusring` de CSS te permite escribir un estilo
de foco que solo se aplique si ele elemento recibe foco mediante el teclado, una
característica útil. A pesar de que la pseudoclase actualmente solo funciona con Firefox,
[se está trabajando para convertirla en un
estándar](https://github.com/wicg/modality){: .external }.

También existe [este excelente artículo de Alice Boxhall y Brian
Kardell](https://www.oreilly.com/ideas/proposing-css-input-modality){: .external }
que explora el tema de modalidad y contiene un prototipo de código para
diferenciar entre entrada de mouse y de teclado. Puedes usar su solución
hoy e incluir la pseudoclase de anillo de enfoque más adelante, cuando tenga un
soporte más difundido.

## Estilo de estados con ARIA

Cuando creas componentes, es una práctica común reflejar su estado y también
su apariencia, usando clases de CSS controladas por JavaScript.

Por ejemplo, piensa en un botón de alternancia que entra en estado visual "presionado"
cuando se le hace clic y mantiene ese estado hasta que se le vuelve a hacer clic. Para darle estilo al
estado, tu JavaScript puede agregarle una clase `pressed` al botón. Y, ya que
quieres una buena semántica en todos tus controles, también configurarías el
 estado `aria-pressed` del botón como `true`.

Una técnica útil para emplear aquí es quitar la clase completa y
usar los atributos de ARIA para darle estilo al elemento. Ahora puedes actualizar el selector de
CSS para el estado presionado del botón de este


    .toggle.pressed { ... }
    

a este.


    .toggle[aria-pressed="true"] { ... }
    

Esto crea una relación lógica y semántica entre el estado ARIA
y la apariencia del elemento, y también reduce el código extra.

## Diseño adaptable multidispositivo

Sabemos que es buena idea diseñar en forma receptiva para brindar la mejor
experiencia multidispositivo, pero el diseño adaptable también proporciona un beneficio de
accesibilidad.

Piensa en un sitio como [Udacity.com](https://www.udacity.com/courses/all):

![Udacity.com con 100% de ampliación](imgs/udacity.jpg)

Un usuario de baja visión que tiene dificultad para leer letras pequeñas puede acercar la página,
tal vez hasta un 400%. Ya que el sitio está diseñado de forma receptiva, la IU
se reacomodará para la "ventana más pequeña" (en realidad para la página más grande),
lo cual es excelente para los usuarios de escritorio que requieren ampliación de la pantalla y para los usuarios
lectores de pantalla móvil. No hay lado negativo. Esta es la misma página ampliada a
400%:

![Udacity.com con 400% de ampliación](imgs/udacity-zoomed.jpg)

De hecho, mediante una designación responsable, estamos cumpliendo la [regla 1.4.4 de la lista de comprobación
de WebAIM](http://webaim.org/standards/wcag/checklist#sc1.4.4){: .external },
que indica que una página "...debería ser legible y funcional cuando se duplica el
tamaño del texto".

El repaso de todo el diseño adaptable está fuera del alcance de esta guía, pero
estas son algunas importantes decisiones que beneficiarán a tu experiencia receptiva
y les darán a tus usuarios mejor acceso a tu contenido.

 - Primero, asegúrate de usar siempre la metaetiqueta `viewport` adecuada.<br>
   `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
   <br>La configuración de `width=device-width`
   coincidirá con el ancho de la pantalla en píxeles independientes del dispositivo, y la configuración
   `initial-scale=1` establece una relación de 1:1 entre los píxeles de CSS y
   los píxeles independientes del dispositivo. Esto le indica al navegador que adapte tu
   contenido al tamaño de la pantalla, para que os usuarios no vean solamente un grupo de texto
   apretado.

![una pantalla de teléfono sin y con la metaetiqueta de ventana de visualización](imgs/scrunched-up.jpg)

Warning: Cuando uses la metaetiqueta de ventana de visualización, asegúrate de no configurar
la escala máxima=1 o establecer escalable por usuario=no. Permite que los usuarios amplíen si lo necesitan.

 - Otra técnica para tener en cuenta es el diseño con una planilla receptiva. Como
   viste con el sitio de Udacity, el diseño con planilla significa que tu contenido
   se reprocesará cuando cambie el tamaño de la página. A menudo estos diseños se producen usando
   unidades relativas como porcentajes, em o rem, en lugar de valores
   de píxel codificados en forma rígida. La ventaja de hacerlo de esta forma es que el texto y el contenido pueden
   agrandar y forzar a otros artículos a las que bajen en la página. Entonces el orden del DOM y el orden
   de lectura permanecen iguales, incluyo si el diseño cambia debido a una ampliación.

 - Además, piensa en usar unidades relativas como `em` o `rem` para cosas como tamaño
   de texto, en lugar de valores de píxel. Algunos navegadores soportan el cambio de tamaño del texto solo en
   preferencias de usuario, y si usas un valor de píxel para el texto, esta configuración
   no afectará a tu copia. Si, sin embargo, has usado unidades relativas
   en todo, la copia del sitio se actualizará para reflejar la preferencia del usuario.

 - Finalmente, cuando tu diseño aparece en un dispositivo móvil, deberías asegurarte
   de que los elementos interactivos como botones o vínculos sean lo suficientemente grandes y tengan
   suficiente espacio alrededor, para que sea sencillo presionarlos sin superponerse
   accidentalmente sobre otros elementos. Esto beneficia a todos los usuarios, pero es especialmente
   útil para quien tenga una discapacidad motriz.

El tamaño mínimo de objetivo táctil recomendado es de alrededor de 48 píxeles independientes del dispositivo
en un sitio con una ventana móvil establecida adecuadamente. Por ejemplo, a pesar de que un ícono puede
solo tener un ancho y un alto de 24 px, puedes usar relleno adicional para llevar
el tamaño de del objetivo de presión a hasta 48 px. El área de 48x48 píxeles corresponde a alrededor de 9 mm,
que es alrededor del tamaño del área de la yema del dedo.

![un diagrama que muestra un par de objetivos táctiles de 48 píxeles](imgs/touch-target.jpg)

Los objetivos táctiles también deberían tener un espacio de alrededor de 8 píxeles
de separación, en orientación horizontal y vertical, de manera que el dedo del usuario, al presionar un
objetivo de presión, no toque inintencionalmente otro objetivo de presión.

## Color y contraste

Si tienes buena visión, es fácil asumir que todas las personas perciben el color o
la legibilidad del texto de la misma manera que tú &mdash; pero, por supuesto, eso no es real.
Finalicemos viendo cómo podemos usar en forma efectiva el color y el contraste
para crear diseños agradables accesibles para todos.

Como puedes imaginar, algunas combinaciones de colores que a algunas personas les resultan fáciles de
leer les resultan difíciles o imposibles a otras. Esto se suele reducir a *color
contraste*, la relación entre la *luminosidad* de los colores
de primer plano y de segundo plano. Cuando los colores son similares, la relación de contraste es baja. Cuando son
diferentes, la relación de contraste es alta.

Las [pautas de WebAIM](http://webaim.org/standards/wcag/){: .external }
recomiendan una relación de contraste (mínima) AA de 4.5:1 para todo el texto. Se hace una excepción
para texto muy grande (120 a 150% más grande que el texto de cuerpo predeterminado), para el que
la relación puede disminuir a 3:1. Nota la diferencia de relaciones de contraste que se muestra
a continuación.

![comparación de varias relaciones de contraste](imgs/contrast-ratios.jpg)

La relación de contraste de 4:5:1 se escogió para el nivel AA porque compensa
la pérdida de sensibilidad de contraste que los usuarios con pérdida de visión
equivalente a una visión de aproximadamente 20/40 suelen experimentar. Se suele informar 20/40 como agudeza visual
típica de personas de alrededor de 80 años. Para usuarios con leves daños visuales
o deficiencias de colores, podemos incrementar el contraste hasta 7:1 en el texto del cuerpo.

Puedes usar la [extensión de accesibilidad
DevTools](https://chrome.google.com/webstore/detail/accessibility-developer-t/fpkknkljclfencbdbgkenhalefipecmb){: .external }
para Chrome, para identificar las relaciones de contraste. Uno de los beneficios del uso de Chrome Devtools
es que sugiere alternativas de AA y AAA (mejoradas) a tus colores
actuales, y puede hacer clic en los valores para obtener una vista previa en tu app.

Para auditar el color/contraste, sigue los siguientes pasos básicos.

 1. Después de la instalación de la extensión, haz clic en `Audits`
 1. Desmarca todo excepto `Accessibility`
 1. Haz clic en `Audit Present State`
 1. Ten en cuenta todas las advertencias de contraste

![el diálogo de auditoría de contraste de devtools](imgs/contrast-audit.png)

WebAIM brinda un útil [revisor
de contraste de color](http://webaim.org/resources/contrastchecker/){: .external } que puedes usar
para evaluar el contraste de cualquier par de colores.

### No transmitas información solo con color

Existen alrededor de 320 millones de usuarios con deficiencia de visión en color. Alrededor de 1 de 12
hombres y 1 de 200 mujeres tienen alguna forma de "daltonismo", lo que significa que alrededor de
1 de cada 20, o el 5%, de tus usuarios no verán tu sitio en la forma que deseas.
Cuando confiamos en el color para transmitir la información, movemos ese número hasta niveles
inaceptables.

Note: El término "daltonismo" se usa para describir una afección visual
debido a la que una persona tiene dificultades para distinguir los colores, pero muy pocas personas
realmente no distinguen ningún color. La mayoría de las personas que sufren deficiencias de color ven algunos o la mayorías de los
colores, pero tienen dificultades para diferenciar entre ciertos colores, tales como rojos
y verdes (lo más común), marrones y naranjas, y azules y violetas.

Por ejemplo, en un formulario de entrada, un número de teléfono puede estar subrayado en rojo para
demostrar que no es válido. Pero para alguien con deficiencias del color o un usuario lector de pantalla, esa
información no se transmite bien, si es que algo se transmite. A pesar de esto, siempre deberías intentar
brindar varios caminos para que el usuario acceda a información crítica.

![un formulario de entrada con un error subrayado en rojo](imgs/input-form1.png)

La [lista de comprobación de WebAIM indica en la sección
1.4.1](http://webaim.org/standards/wcag/checklist#sc1.4.1){: .external } que
"el color no debería ser el único método para transmitir contenido ni
para distinguir elementos visuales". También indica que "no se debería usar solo
el color para diferenciar vínculos del texto que los rodea" a menos que cumplan ciertos
requisitos de contraste. En cambio, la lista de comprobación recomienda agregar un indicador
adicional como un guión bajo (incluida la propiedad `text-decoration` de CSS) para
indicar cuando el vínculo está activo.

Una forma sencilla de solucionar el ejemplo anterior es agregarle un mensaje adicional al
campo, para explicar que no es válido y por qué.

![un formulario de entrada con un mensaje de error agregado con fines de claridad](imgs/input-form2.png)

Cuando construyas una app, ten estas cosas en mente y está atento
a áreas en las que puedas estar confiando demasiado en el color para transmitir información
importante.

Si te da curiosidad cómo luce tu sitio para distintas personas o si confías
demasiado en el uso del color en tu IU, puedes usar la [extensión
NoCoffee Chrome](https://chrome.google.com/webstore/detail/nocoffee/jjeeggmbnhckmgdhmgdckeigabjfbddl){: .external }
para simular varias formas de daños visuales, incluidos distintos tipos de
daltonismo.

### Modo de contraste alto

El modo de contraste alto le permite al usuario invertir los colores del primer plano y el segundo plano,
lo cual a menudo ayuda a que el texto se destaque mejor. Para alguien con un daño
visual leve, el modo de contraste alto puede facilitar mucho la navegación por el contenido
de la página. Existen varias formas de configurar un contraste alto en tu máquina.

Los sistemas operativos como Mac OSX y Windows ofrecen modos de contraste alto que se pueden
habilitar para todo al nivel del sistema. O los usuarios pueden instalar una extensión,
como la [extensión
Chrome High Contrast](https://chrome.google.com/webstore/detail/high-contrast/djcfdncoelnlbldjfhinnjlhdjlikmph){: .external }
para habilitar el contraste alto solo en esa app específica.

Un ejercicio útil es encender la configuración de contraste alto y verificar que todas las
IU de tu app sean visibles y usables.

Por ejemplo, una barra de navegación puede tener un color de fondo sutil para indicar
qué página está seleccionada. Si la ves en la extensión de contraste alto,
esa sutileza desaparece por completo y, con ella, se va la comprensión del lector
de qué página está activa.

![una barra de navegación en modo de contraste alto](imgs/tab-contrast.png)

De manera similar, si tienes en cuenta el ejemplo de la lección anterior, el subrayado
rojo del campo de número de teléfono no válido puede aparecer en un
color entre azul y verde difícil de distinguir.

![un formulario con campo de error en el modo de contraste alto](imgs/high-contrast.jpg)

Si alcanzas las relaciones de contraste cubiertas en las lecciones anteriores,
no deberías tener ningún problema a la hora de soportar el modo de contraste alto. Pero, para más
tranquilidad, piensa en instalar la extensión Chrome High Contrast y darle
a tu página una revisada para comprobar que todo funcione y luzca como
esperas.


{# wf_devsite_translation #}
