project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Событие 'изменение ориентации устройства' возвращает данные о повороте, такие как угол наклона устройства вперед-назад, из стороны в сторону и, если в телефоне или ноутбуке имеется компас, сведения о том, куда направлена лицевая сторона устройства.

{# wf_review_required #}
{# wf_updated_on: 2014-10-20 #}
{# wf_published_on: 2000-01-01 #}

# Ориентация устройства {: .page-title }

{% include "web/_shared/contributors/TODO.html" %}



Событие 'изменение ориентации устройства' возвращает данные о повороте, такие как угол наклона устройства вперед-назад, из стороны в сторону и, если в телефоне или ноутбуке имеется компас, сведения о том, куда направлена лицевая сторона устройства.


## TL;DR {: .hide-from-toc }
- Не используйте это событие слишком часто.
- Проверьте наличие поддержки.
- Не обновляйте интерфейс при каждом событии. Вместо этого выполняйте синхронизацию с <code>requestAnimationFrame</code>.


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

<pre class="prettyprint">
{% includecode content_path="web..//fundamentals/capabilities/native-hardware/device-orientation/_code/dev-orientation.html" region_tag="devori" lang=javascript %}
</pre>

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


