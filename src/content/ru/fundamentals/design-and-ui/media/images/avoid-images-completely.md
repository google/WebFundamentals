project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Картинка совсем не обязательно должна быть именно изображением. Иногда нужного эффекта можно добиться с помощью встроенных параметров браузера.

{# wf_review_required #}
{# wf_updated_on: 2014-06-09 #}
{# wf_published_on: 2000-01-01 #}

# Старайтесь не использовать изображения {: .page-title }

{% include "_shared/contributors/TODO.html" %}



Картинка совсем не обязательно должна быть именно изображением. Иногда нужного эффекта можно добиться с помощью встроенных параметров браузера.  Браузер создает визуальный ряд там, где раньше требовались изображения.   Таким образом, ему больше не нужно скачивать отдельные файлы изображений и корректировать ошибки масштабирования.  Чтобы добавить на страницу значки, воспользуйтесь символами Unicode или специальными иконочными шрифтами.




## TL;DR {: .hide-from-toc }
{# wf_TODO #}
Warning: A tag here did NOT convert properly, please fix! ''


##Не размещайте текстовую информацию внутри картинок 

По возможности текст должен быть представлен в виде текста и не встраиваться в изображение. Например, мы не советуем использовать изображения в колонтитулах или размещать внутри картинок контактную информацию (телефоны, адрес а).  Такие данные невозможно скопировать, они недоступны для программ чтения с экрана, а также неадаптивны.  Вместо этого поместите текст в разметку и при необходимости используйте веб-шрифты, чтобы задать нужные стили.

## Используйте CSS для замещения изображений

Современные браузеры используют стили CSS в тех случаях, для которых ранее требовались изображения.  Например, комплексный градиент можно создать с помощью группы свойств <code>background</code>, тени - с помощью <code>box-shadow</code>, а для скругленных углов есть свойство <code>border-radius</code>.

<p id="noImage">
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque sit 
amet augue eu magna scelerisque porta ut ut dolor. Nullam placerat egestas 
nisl sed sollicitudin. Fusce placerat, ipsum ac vestibulum porta, purus 
dolor mollis nunc, pharetra vehicula nulla nunc quis elit. Duis ornare 
fringilla dui non vehicula. In hac habitasse platea dictumst. Donec 
ipsum lectus, hendrerit malesuada sapien eget, venenatis tempus purus.
</p>


    <style>
      div#noImage {
        color: white;
        border-radius: 5px;
        box-shadow: 5px 5px 4px 0 rgba(9,130,154,0.2);
        background: linear-gradient(rgba(9, 130, 154, 1), rgba(9, 130, 154, 0.5));
      }
    </style>
    

Обратите внимание, что для перечисленных техник требуется визуализация Cycles (это может быть важно при работе с мобильными устройствами).  Их неадекватное использование приведет к потере положительных результатов и снижению эффективности.



