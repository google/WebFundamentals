---
layout: article
title: "Старайтесь не использовать изображения"
description: "Картинка совсем не обязательно должна быть именно изображением. Иногда нужного эффекта можно добиться с помощью встроенных параметров браузера."
introduction: "Картинка совсем не обязательно должна быть именно изображением. Иногда нужного эффекта можно добиться с помощью встроенных параметров браузера.  Браузер создает визуальный ряд там, где раньше требовались изображения.   Таким образом, ему больше не нужно скачивать отдельные файлы изображений и корректировать ошибки масштабирования.  Чтобы добавить на страницу значки, воспользуйтесь символами Unicode или специальными иконочными шрифтами."
authors:
  - petelepage
article:
  written_on: 2014-04-30
  updated_on: 2014-06-10
  order: 5
collection: images
key-takeaways:
  старайтесь-images:
    - Старайтесь не использовать изображения. Добавить на страницу графические эффекты (тени, градиенты, скругленные углы и т. д.) можно с помощью функций браузера.
---

{% wrap content%}

<style>
  img, video, object {
    max-width: 100%;
  }

  img.center {
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>

{% include modules/toc.liquid %}


{% include modules/takeaway.liquid list=page.key-takeaways.avoid-images %}

##Не размещайте текстовую информацию внутри картинок 

По возможности текст должен быть представлен в виде текста и не встраиваться в изображение. Например, мы не советуем использовать изображения в колонтитулах или размещать внутри картинок контактную информацию (телефоны, адрес а).  Такие данные невозможно скопировать, они недоступны для программ чтения с экрана, а также неадаптивны.  Вместо этого поместите текст в разметку и при необходимости используйте веб-шрифты, чтобы задать нужные стили.

## Используйте CSS для замещения изображений

Современные браузеры используют стили CSS в тех случаях, для которых ранее требовались изображения.  Например, комплексный градиент можно создать с помощью группы свойств <code>background</code>, тени - с помощью <code>box-shadow</code>, а для скругленных углов есть свойство <code>border-radius</code>.

<style>
  p#noImage {
    margin-top: 2em;
    padding: 1em;
    padding-bottom: 2em;
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
  
  p#noImage code {
    color: rgb(64, 64, 64);
  }
</style>
<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>

{% highlight html %}
<style>
  div#noImage {
    color: white;
    border-radius: 5px;
    box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
    background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
  }
</style>
{% endhighlight %}

Обратите внимание, что для перечисленных техник требуется визуализация Cycles (это может быть важно при работе с мобильными устройствами).  Их неадекватное использование приведет к потере положительных результатов и снижению эффективности.

{% include modules/nextarticle.liquid %}

{% endwrap %}

