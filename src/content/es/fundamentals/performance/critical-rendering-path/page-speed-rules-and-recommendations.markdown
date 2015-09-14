---
title: "Reglas y recomendaciones de PageSpeed"
description: "Reglas de PageSpeed Insights en contexto: en qué centrarnos para optimizar la ruta de renderización importante y por qué"
updated_on: 2014-04-28
---
<p class="intro">
  Reglas de PageSpeed Insights en contexto: en qué centrarnos para optimizar la ruta de renderización importante y por qué
</p>

## Eliminar el JavaScript y el CSS que bloquea la renderización

Para acelerar la primera renderización, recomendamos reducir y eliminar, en la medida de lo posible, el número de recursos importantes de la página, reducir el número de descargas de bytes importantes y optimizar la longitud de la ruta importante.

## Optimizar el uso de JavaScript

Los recursos JavaScript bloquean el analizador de forma predeterminada, salvo que se marquen como `_async_` o se añadan a través de un fragmento específico de código JavaScript. Cuando se bloquea el analizador, el navegador tiene que esperar al CSSOM y detener la construcción del DOM, lo que puede retrasar bastante la primera renderización.

### **Usa recursos de JavaScript asíncronos**

Los recursos asíncronos desbloquen el analizador de documentos y permiten que el navegador evite el bloqueo del CSSOM antes de ejecutar la secuencia de comandos. A menudo, si la secuencia de comandos puede convertirse en asíncrona, también quiere decir que no es esencial para la primera renderización. Por lo tanto, recomendamos cargar las secuencias de comandos asíncronas después de la renderización inicial.

### **Retrasa el análisis del JavaScript**

Todas las secuencias de comandos que no sean importantes para construir el contenido visible deberían retrasarse para minimizar la cantidad de trabajo que debe realizar el navegador para mostrar la página.

### **Evita que el JavaScript se ejecute mucho tiempo**

El código JavaScript que se ejecuta durante mucho tiempo impide que el navegador construya el DOM y el CSSOM y que muestre la página. Por lo tanto, toda lógica de inicialización y cualquier función que no sea esencial para la primera renderización deberían retrasarse. Si es necesario ejecutar una secuencia de inicialización larga, recomendamos dividirla en varias etapas para permitir al navegador procesar otros eventos intermedios.

## Optimizar el uso de CSS

El código CSS es necesario para construir el árbol de visualización, aunque JavaScript, a menudo, bloquea el CSS mientras se construye la página por primera vez. Deberías asegurarte de marcar como no importante el código CSS que no sea esencial (por ejemplo `print` y otras consultas de medios) y de reducir al mínimo la cantidad de código CSS importante y el tiempo durante el que se activa.

### **Inserta estilos CSS en la cabecera del documento**

Todos los recursos de CSS deben especificarse lo antes posible en el documento HTML para que el navegador pueda detectar las etiquetas <link> y procesar la solicitud de CSS lo antes posible.

### **Evita importar estilos CSS**

La directiva de importación de CSS (@import) permite a una hoja de estilos importar las reglas de otro archivo de hoja de estilos. Sin embargo, estas directivas deberían evitarse porque alargan la ruta importante: los recursos CSS importados solo se detectan una vez que se haya recibido y procesado la hoja de estilos CSS con la regla @import.

### **Inserta el CSS que bloquea la renderización**

Para obtener un mejor rendimiento, te recomendamos incluir el CSS importante junto al contenido, en el mismo documento HTML. De este modo, se evitan procesos innecesarios en la ruta importante y, si se hace correctamente, se puede establecer una ruta importante de solo `un proceso` en la que el único recurso que pueda retrasar la visualización del contenido sea el HTML.



