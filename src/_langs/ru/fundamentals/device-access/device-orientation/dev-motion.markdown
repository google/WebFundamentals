---
layout: article
title: "Движение устройства"
description: "Движение устройства дает информацию о силе ускорения, приложенной к устройству в данный момент, и о скорости вращения"
introduction: "Движение устройства дает информацию о силе ускорения, приложенной к устройству в данный момент, и о скорости вращения"
article:
  written_on: 2014-06-17
  updated_on: 2014-10-21
  order: 1
id: device-orientation
authors:
  - petelepage
priority: 1
collection: device-orientation
key-takeaways:
  devmotion: 
    - Используйте движение устройства для случаев, когда требуется знать текущие характеристики перемещения устройства.
    - значение скорости вращения <code>rotationRate</code> выражено в &deg;/сек.
    - значения <code>acceleration</code> и <code>accelerationWithGravity</code> измеряются в м/сек<sup>2</sup>.
    - Помните о разнице между вариантами браузеров.
---

{% wrap content %}

{% include modules/toc.liquid %}

{% include modules/takeaway.liquid list=page.key-takeaways.devmotion %}

## Ситуации, в которых следует использовать события "движение устройства"

Существует несколько ситуаций, в которых можно использовать события "движение устройства".  Например:

<ul>
  <li>Жест встряхивания для обновления данных.</li>
  <li>В играх, чтобы заставить персонажей прыгнуть или переместиться.</li>
  <li>В приложениях для здоровья и фитнеса</li>
</ul>

## Проверка поддержки и приема событий

Чтобы принимать события `DeviceMotionEvent`, сначала проверьте, поддерживаются ли эти события
в браузере.  Затем подключите приемник событий к объекту `window`,
принимающему события `devicemotion`. 

{% include_code _code/jump-test.html devmot javascript %}

## Обработка событий "движение устройства"

Событие "движение устройства" запускается через регулярные интервалы и возвращает данные о
вращении (в &deg; в секунду) и ускорении (в м в секунду<sup>2</sup>)
, которые характеризуют перемещение устройства в данный момент времени.  В некоторых устройствах нет компонентов, которые позволяют 
не учитывать воздействие силы тяжести.

Событие возвращает четыре свойства, 
<a href="index.html#device-frame-coordinate">`accelerationIncludingGravity`</a>, 
<a href="index.html#device-frame-coordinate">`acceleration`</a>, 
в котором не учитывается воздействие силы тяжести, 
<a href="index.html#rotation-data">`rotationRate`</a> и `interval`.

Например, рассмотрим телефон, лежащий на горизонтальном столе
экраном вверх.

<table class="table-4">
  <colgroup>
    <col span="1">
    <col span="1">
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="State">Состояние</th>
      <th data-th="Rotation">Вращение</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Ускорение (м/с<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Ускорение с учетом силы тяжести (м/с<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Состояние покоя</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 0, 9,8]</td>
    </tr>
    <tr>
      <td data-th="State">Движение вверх</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 5]</td>
      <td data-th="Acceleration with gravity">[0, 0, 14,81]</td>
    </tr>
    <tr>
      <td data-th="State">Движение только вправо</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 0, 9,81]</td>
    </tr>
    <tr>
      <td data-th="State">Движение вверх и вправо</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 0, 5]</td>
      <td data-th="Acceleration with gravity">[5, 0, 14,81]</td>
    </tr>
  </tbody>
</table>

В отличие от этого, если экран телефона расположен перпендикулярно к земле
и виден наблюдателю:

<table class="table-4">
  <colgroup>
    <col span="1">
    <col span="1">
    <col span="1">
    <col span="1">
  </colgroup>
  <thead>
    <tr>
      <th data-th="State">Состояние</th>
      <th data-th="Rotation">Вращение</th>
      <th data-th="Acceleration (m/s<sup>2</sup>)">Ускорение (м/с<sup>2</sup>)</th>
      <th data-th="Acceleration with gravity (m/s<sup>2</sup>)">Ускорение с учетом силы тяжести (м/с<sup>2</sup>)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-th="State">Состояние покоя</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 0, 0]</td>
      <td data-th="Acceleration with gravity">[0, 9,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Движение вверх</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[0, 5, 0]</td>
      <td data-th="Acceleration with gravity">[0, 14,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Движение только вправо</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[3, 0, 0]</td>
      <td data-th="Acceleration with gravity">[3, 9,81, 0]</td>
    </tr>
    <tr>
      <td data-th="State">Движение вверх и вправо</td>
      <td data-th="Rotation">[0, 0, 0]</td>
      <td data-th="Acceleration">[5, 5, 0]</td>
      <td data-th="Acceleration with gravity">[5, 14,81, 0]</td>
    </tr>
  </tbody>
</table>

### Пример. Расчет максимального ускорения объекта

Один из способов использовать события "движение устройства" — вычисление максимального
ускорения объекта.  Например, можно рассчитать максимальное ускорение
человека в прыжке.

{% include_code _code/jump-test.html devmothand javascript %}

После касания кнопки Go! пользователю предлагается подпрыгнуть!  В течение этого времени
на странице сохраняются значения максимального (и минимального) ускорения, а после прыжка
 сообщается максимальное ускорение пользователя.

{% endwrap %}
