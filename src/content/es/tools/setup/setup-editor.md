project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: El editor de código es tu principal herramienta de programación; se usa para escribir y guardar líneas de código. Escribe código más eficaz y de manera más rápida aprendiendo las combinaciones de teclas de tu editor e instalando complementos claves.

{# wf_updated_on: 2017-07-12 #}
{# wf_published_on: 2014-05-28 #}

# Configura tu editor {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/mattgaunt.html" %}

El editor de código es tu principal herramienta de programación; se usa para escribir y guardar líneas de código. Escribe código más eficaz y de manera más rápida aprendiendo las combinaciones de teclas de tu editor e instalando complementos claves.


### TL;DR {: .hide-from-toc }
- Elige un editor que te permita personalizar las combinaciones de teclas y cuente con muchísimos complementos para que puedas escribir mejor código.
- Aprovecha el administrador de paquetes para facilitar la detección, instalación y actualización de los complementos.
- Instala complementos que te ayuden a sostener la productividad durante la programación. Comienza con las recomendaciones de esta guía.


## Instalar el editor de texto Sublime

[Sublime](http://www.sublimetext.com/){: .external } es un gran editor, equipado con una base sólida
de funcionalidad que transforma la redacción de código en una actividad placentera. Puedes instalar un administrador
de paquetes que facilita la instalación de complementos y la adición de funcionalidad nueva.

Actualmente, se ofrecen dos opciones de descarga para Sublime Text: la [versión 2](http://www.sublimetext.com/2) o la [versión 3](http://www.sublimetext.com/3). La versión 3 es bastante estable y te brindará acceso a los paquetes que no están disponibles en Sublime Text 2; no obstante, la versión 2 puede ser más confiable.

Note: La <a href='http://robdodson.me/blog/2012/06/23/sublime-text-2-tips-and-shortcuts/'>entrada del blog</a> de Rob Dodson sobre cómo familiarizarse con Sublime y apreciarlo es una gran referencia para aprovechar tu editor al máximo. Los conceptos son relevantes para cualquier editor de texto, no solo Sublime.

## ¿Por qué usar un administrador de paquetes?

Los administradores de paquetes simplifican la detección, instalación y actualización de los paquetes y
los complementos.

<img src="imgs/package_control.png" class="center" alt="Captura de pantalla de Package Control de los editores Sublime Text"/>

Si deseas instalar un administrador de paquetes para Sublime, sigue estas instrucciones:
[https://packagecontrol.io/installation](https://packagecontrol.io/installation).

Solo debes hacer esto una vez; luego consulta, a continuación, nuestra lista de complementos
recomendados.

## Instalar complementos

Los complementos te ayudan a ser más productivo. ¿Cuáles son las tareas por las cuales
aún tienes que recurrir a otras herramientas?

Aplicación de lint: existe un complemento para realizarla. Se muestran los cambios que no se guardaron:
- Existen complementos para ello. Integración con otras herramientas, como GitHub;
existen complementos para realizarla.

Los administradores de paquetes simplifican mucho la detección, instalación y actualización de los complementos:

1. En el editor Sublime Text, abre el administrador de paquetes (Ctrl + Mayús + P).
2. Escribe “Install Package”.
3. Escribe el nombre del complemento que buscas (o explora todos los
   complementos).

Consulta estas [listas de tendencias de los complementos de Sublime
Text](https://packagecontrol.io/browse). Estos son los complementos que más nos gustan, y
te recomendamos que los instales porque pueden ayudarte a acelerar la programación.

### Autoprefixer

Si deseas contar con un método rápido para agregar prefijos de proveedores a tu CSS, puedes hacerlo
con este complemento práctico.

Escribe CSS e ignora los prefijos de proveedores. Cuando desees agregarlos, presiona
`ctrl+shift+p` y escribe `Autoprefix CSS`.

[Se trata la manera en que puedes automatizar esto en el proceso de
compilación](/web/tools/setup/setup-buildtools);
así, tu CSS conserva su eficiencia y no es necesario que recuerdes presionar
`ctrl+shift+p`.

<img src="imgs/sublime-autoprefixer.gif" alt="Ejemplo del complemento Autoprefixer de Sublime" />

### ColorPicker

Selecciona cualquier color de la paleta y agrégalo a la CSS con `ctrl+shift+c`.

<img src="imgs/sublime-color-picker.png" alt="Complemento ColorPicker de Sublime" />

### Emmet

Agrega algunas combinaciones de teclas y fragmentos útiles al editor de texto. Mira el
video sobre [Emmet.io](http://emmet.io/){: .external } para acceder a una presentación de lo que puede hacer (uno de
mis favoritos es el comando “Toggle Comment”).

<img src="imgs/emmet-io-example.gif" alt="Demostración del complemento Emmet.io" />

### Mejorar el aspecto de HTML-CSS-JS

Esta extensión te brinda un comando para dar formato a tus elementos HTML, CSS y JS. Puedes, incluso,
mejorar el aspecto de los archivos al guardarlos.

<img src="imgs/sublime-prettify.gif" alt="Gif del complemento Prettify de Sublime" />

### Git Gutter

Agrega un marcador al medianil cuando se realice un cambio en el archivo.

<img src="imgs/sublime-git-gutter.png" alt="Captura de pantalla del complemento Git Gutter de Sublime" />

### Gutter Color

Note: Solo está disponible en Sublime Text 3.

Gutter Color exhibe una muestra pequeña del color junto a tu CSS.

<img src="imgs/sublime-gutter-color.png" alt="Captura de pantalla de Gutter Color de Sublime" />

Este complemento requiere ImageMagick. Si usas Mac OS X, te recomendamos probar el
instalador de [CactusLabs](http://cactuslab.com/imagemagick/){: .external } (es posible que
debas reiniciar tu equipo para que funcione).





{# wf_devsite_translation #}
