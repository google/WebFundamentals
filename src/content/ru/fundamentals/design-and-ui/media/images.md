project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Изображение - важный элемент любой веб-страницы, ведь одна картинка может заменить собой тысячу слов. Проблема в том, что изображения означают дополнительные байты в загруженных файлах.  Отзывчивый веб-дизайн предполагает, что в зависимости от параметров устройства могут меняться не только шаблоны страниц, но и сами изображения.

{# wf_review_required #}
{# wf_updated_on: 2014-04-29 #}
{# wf_published_on: 2000-01-01 #}

# Изображения {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



Изображение - важный элемент любой веб-страницы, ведь одна картинка может заменить собой тысячу слов. Проблема в том, что изображения означают дополнительные байты в загруженных файлах.  Отзывчивый веб-дизайн предполагает изменение в соответствии с параметрами устройства не только для шаблонов страниц, но и для самих изображений.


### Отзывчивые изображения

Отзывчивый веб-дизайн предполагает, что в зависимости от параметров устройства могут меняться не только шаблоны страниц, но и контент.  Например, чтобы на экранах с высоким разрешением (2x) не страдала четкость изображения, требуется графика высокого разрешения.  Изображение с заданной шириной 50% будет корректно отображаться на экране при ширине браузера не менее 800 пикс. Однако на узком экране смартфона это же изображение будет занимать слишком много полезного пространства. При масштабировании такого изображения количество потребляемых им ресурсов не изменится.

### Art direction

<img class="center" src="img/art-direction.png" alt="Пример"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

В некоторых случаях вам может понадобится радикально оптимизировать изображение: изменить его пропорции, обрезать по краям или даже заменить целиком.  Здесь вам поможет техника art direction.  Больше примеров вы найдете на этом сайте: [responsiveimages.org/demos/](http://responsiveimages.org/demos/).


## Responsive Images
<!-- TODO: Verify Udacity course fits here -->
<div class="attempt-right">
  <figure>
    <img src="img/udacity-ri.jpg">
  </figure>
</div>

Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow.

[View Course](https://udacity.com/ud882){: .external }





