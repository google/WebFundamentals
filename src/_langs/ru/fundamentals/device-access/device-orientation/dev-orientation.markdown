---
layout: article
title: "Ориентация устройства"
description: "Событие 'изменение ориентации устройства' возвращает данные о повороте, такие как угол наклона устройства вперед-назад, из стороны в сторону и, если в телефоне или ноутбуке имеется компас, сведения о том, куда направлена лицевая сторона устройства."
introduction: "Событие 'изменение ориентации устройства' возвращает данные о повороте, такие как угол наклона устройства вперед-назад, из стороны в сторону и, если в телефоне или ноутбуке имеется компас, сведения о том, куда направлена лицевая сторона устройства."
article:
  written_on: 2014-06-17
  updated_on: 2014-10-21
  order: 1
priority: 1
id: device-orientation
authors:
  - petelepage
collection: device-orientation
key-takeaways:
  devorientation: 
    - Не используйте это событие слишком часто.
    - Проверьте наличие поддержки.
    - Не обновляйте интерфейс при каждом событии. Вместо этого выполняйте синхронизацию с requestAnimationFrame.
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.devorientation %}

## Ситуации, в которых следует использовать события "изменение ориентации устройства"

Существует несколько ситуаций, в которых можно использовать события "изменение ориентации устройства".  Например:

<ul>
  <li>Обновление карты по мере перемещения пользователя.</li>
  <li>Тонкая настройка интерфейса, например добавление эффектов параллакса.</li>
  <li>В сочетании с возможностями геолокации можно использовать для пошаговой навигации.</li>
</ul>

## Проверка наличия поддержки и прием событий

Чтобы принимать события `DeviceOrientationEvent`, сначала проверьте, поддерживаются ли эти события
в браузере.  Затем подключите приемник событий к объекту `window`,
принимающему события `deviceorientation`. 

{% include_code _code/dev-orientation.html devori javascript %}

## Обработка событий "изменение ориентации устройства"

Событие "изменение ориентации устройства" запускается при перемещении или изменении
ориентации устройства.  Событие возвращает данные об изменении текущего положения
устройства по отношению к <a href="index.html#earth-coordinate-frame">
системе земных координат</a>.

Обычно событие возвращает три свойства:
<a href="index.html#rotation-data">`alpha`</a>, 
<a href="index.html#rotation-data">`beta`</a> и
<a href="index.html#rotation-data">`gamma`</a>.  В браузере для мобильных устройств Mobile Safari возвращается
дополнительный параметр <a href="https://developer.apple.com/library/safari/documentation/SafariDOMAdditions/Reference/DeviceOrientationEventClassRef/DeviceOrientationEvent/DeviceOrientationEvent.html">`webkitCompassHeading`</a> с заголовком
"компас".


{% endwrap %}
