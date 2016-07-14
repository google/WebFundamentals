---
title: "Определение текущего местоположения пользователя"
description: "С помощью API геолокации можно узнать, в каком месте находится пользователь, – конечно, всегда с его согласия"
updated_on: 2014-10-21
key-takeaways:
  geo: 
    - "Перед тем как использовать API, всегда проверяйте совместимость."
    - "Приблизительное местоположение лучше точного."
    - "Всегда обрабатывайте ошибки."
    - "Чем реже выполняется опрос устройства пользователя, тем лучше – в целях экономии заряда аккумулятора."
---

<p class="intro">
  С помощью API геолокации можно узнать, в каком месте находится пользователь, – конечно, всегда с его согласия. Эту функциональную возможность можно использовать в запросах, например, для указания маршрута до пункта назначения. Также она будет полезна для добавления геотегов в созданный пользователем контент (например, для обозначения места съемки фотографии)
</p>

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.geo %}

Использование API не зависит от устройства; способ определения местоположения
браузером не имеет значения, поскольку клиенты могут запрашивать и получать данные
обычным способом. Для этого может использоваться GPS, Wi-Fi или
просто просьба вручную ввести свое местоположение. Поскольку на выполнение любого
такого запроса требуется некоторое время, API работает асинхронно; метод обратного вызова
отправляется ему каждый раз, когда вы запрашиваете данные о местоположении.

## Ситуации, в которых следует использовать геолокацию

* Поиск ближайших интересующих пользователя объектов
на основе данных о местоположении устройства пользователя.
* Предоставление информации в соответствии с местоположением пользователя (например, новостей).
* Указание местоположения пользователя на карте.
* Добавление тегов, созданных в приложении, с данными о местоположении пользователя
(т. е. добавление геотегов к изображениям).


## Проверка совместимости

API геолокации в настоящее время поддерживаются большинством браузеров, однако, прежде чем приступать к разработке,
всегда рекомендуется проверять, поддерживает ли устройство соответствующие функции.

Для этого достаточно проверить, имеется ли в коде
объект "geolocation":

{% highlight javascript %}
// check for Geolocation support
if (navigator.geolocation) {
  console.log('Geolocation is supported!');
}
else {
  console.log('Geolocation is not supported for this Browser/OS version yet.');
}
{% endhighlight %}

## Определение текущего местоположения пользователя

В API геолокации имеется простой однократный метод получения информации о местоположении 
пользователя – `getCurrentPosition()`.  При вызове этого метода выполняется
асинхронный запрос данных о текущем местоположении пользователя.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  navigator.geolocation.getCurrentPosition(geoSuccess);
};
{% endhighlight %}

Если разрешения запрашиваются приложением впервые в этом домене,
браузер обычно запрашивает у пользователя согласие на выполнение действия. В зависимости от браузера
в его настройках можно указать, что он будет всегда выдавать (или никогда не будет выдавать) 
запросы на получение разрешений, благодаря чему не будет требоваться подтверждение на отправку запроса.

Кроме того, в зависимости от устройства определения местоположения, используемого браузером, объект "position"
может содержать не просто данные о широте и долготе, а гораздо больше информации, например, – сведения о высоте над уровнем моря или направлении движения.  Узнать, какие дополнительные сведения используются системой определения местоположения, можно только после того, как она вернет данные.

## Тестирование поддержки геолокации на вашем сайте

При наличии в приложении поддержки геолокации HTML5 может оказаться полезным
выполнить отладку результата, полученного с использованием различных значений широты
и долготы.

С помощью инструментов для разработчиков можно как переопределять значения объекта "position" для параметра "navigator.geolocation",
так и имитировать данные геолокации, отсутствующие в меню "Overrides".

<img src="images/emulategeolocation.png">

1. В DevTools перейдите в меню "Overrides".
2. Установите флажок "Override Geolocation", затем введите в поле "Lat =" значение "41.4949819", а в поле "Lon =" – значение "-0.1461206".
3. Обновите страницу, после чего для нее будут использоваться переопределенные вами координаты для геолокации.

## Всегда обрабатывайте ошибки

К сожалению, не все попытки определить местоположение венчаются успехом. Причиной может послужить невозможность подключиться к системе GPS
или внезапное отключение пользователем функций определения местоположения. В случае ошибки вызывается второй,
дополнительный аргумент для метода `getCurrentPosition()`,
и вы можете добавить в обратный вызов соответствующее уведомление для пользователя:

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };
  navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
};
{% endhighlight %}

## Старайтесь пореже запускать оборудование для геолокации

Во многих случаях не требуется самая актуальная информация о местоположении пользователя,
обычно нужны лишь данные о приблизительном местонахождении.

С помощью дополнительного свойства `maximumAge` можно указать, чтобы браузер использовал
недавно полученные данные геолокации.  Это позволит не только ускорить получение ответа, если пользователь 
ранее уже запрашивал соответствующие данные, но и предотвратить запуск браузером интерфейсов оборудования для геолокации, 
таких как триангуляция Wi-Fi или модуль GPS.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
  	maximumAge: 5 * 60 * 1000,
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(position) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## Не заставляйте пользователя ждать, задайте тайм-аут

Если не задать тайм-аут, ответ на запрос местоположения может так и не прийти.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
     timeout: 10 * 1000
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}

## Приблизительное местоположение лучше точного

Если требуется найти магазины поблизости от пользователя, маловероятно,
что для этого вам потребуются данные с точностью до 1 метра.  API разработан таким образом, что он за кратчайшее время выдает приблизительную
информацию о местоположении пользователя.

Если высокая точность геопозиционирования не требуется, можно переопределить значение
параметра `enableHighAccuracy`, которое используется по умолчанию.  Однако использовать этот параметр следует с осторожностью, поскольку при этом увеличивается
время обработки и интенсивно используются ресурсы аккумулятора.

{% highlight javascript %}
window.onload = function() {
  var startPos;
  var geoOptions = {
    enableHighAccuracy: true
  }

  var geoSuccess = function(position) {
    startPos = position;
    document.getElementById('startLat').innerHTML = startPos.coords.latitude;
    document.getElementById('startLon').innerHTML = startPos.coords.longitude;
  };
  var geoError = function(error) {
    console.log('Error occurred. Error code: ' + error.code);
    // error.code can be:
    //   0: unknown error
    //   1: permission denied
    //   2: position unavailable (error response from location provider)
    //   3: timed out
  };

  navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
};
{% endhighlight %}


