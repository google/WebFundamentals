project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Permissions API дает вам главную роль в проверке статуса разрешений API.

{# wf_updated_on: 2019-03-22 #} {# wf_published_on: 2015-04-04 #} {# wf_tags:
news,permissions #} {# wf_blink_components: N/A #}

# Permissions API для веба {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

Если вы уже работали с [Geolocation
API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
, скорее всего, вы хотели проверить, было ли у вас разрешение на использование
Geolocation, не вызывая подсказку. Это просто невозможно. Вы должны были
запросить текущую позицию, и это указывало бы на состояние разрешения или
приводило к отображению подсказки пользователю.

Не все API работают таким образом. API уведомлений имеет свой собственный
способ, позволяющий вам проверять текущее состояние разрешений через
[Notification.permission](https://notifications.spec.whatwg.org/#permission) .

По мере роста количества веб-платформ в API, разработчикам необходим единый
стандартный способ проверки статуса разрешения, а не необходимость помнить, как
работает каждый API. [API разрешений](https://w3c.github.io/permissions/) {:
.external }, доступный в [Chrome версии
43](https://www.chromestatus.com/feature/6376494003650560) , предназначен для
того, чтобы быть единственным стандартным способом проверки статуса разрешений
API.

## permissions.query ()

Проверьте статус разрешения с помощью метода `permissions.query()`. Он [вернет
статус](https://w3c.github.io/permissions/#h-status-of-a-permission) granted (у
вас есть разрешение), denied (у вас заблокирован доступ к API) или prompt
(пользователю необходимо запросить). Например:

```
// Check for Geolocation API permissions
navigator.permissions.query({name:'geolocation'})
  .then(function(permissionStatus) {
    console.log('geolocation permission state is ', permissionStatus.state);

    permissionStatus.onchange = function() {
      console.log('geolocation permission state has changed to ', this.state);
    };
  });
```

Метод запроса принимает объект
[PermissionDescriptor](https://w3c.github.io/permissions/#h-permission-descriptor)
, в котором вы определяете имя разрешения. Ответом является Promise, разрешающее
объект
[PermissionStatus](https://w3c.github.io/permissions/#idl-def-PermissionStatus)
. С помощью этого объекта вы можете проверить состояние с
`permissionStatus.state` на «granted», «denied» или «prompt». Кроме того, можно
также реализовать обработчик событий для `permissionStatus.onchange` и обработки
изменений состояния разрешения.

### Поддерживаемые PermissionDescriptors

В приведенном выше примере мы подчеркиваем, как запрашивать состояние разрешения
для геолокации с помощью следующего дескриптора разрешения:
`{name:'geolocation'}` .

Дескриптор разрешения уведомления аналогичен тем, что для него требуется только
атрибут имени: `{name:'notifications'}` .

[Push](https://w3c.github.io/permissions/#h-push) и
[midi](https://w3c.github.io/permissions/#h-midi) каждый имеют дополнительный
параметр, специфичный для этого API.

Для разрешения push вы можете указать параметр `userVisibleOnly`. Он указывает,
хотите ли вы показывать уведомление для каждого push-сообщения или иметь
возможность отправлять push-уведомления без вывода сообщений (в настоящий момент
Chrome поддерживает только push-сообщения с уведомлениями). Вы бы использовали
это так:

```
navigator.permissions.query({name:'push', userVisibleOnly:true})
```

Midi допускает параметр `sysex` . Это указывает, нужно ли вам и/или получать
системные эксклюзивные сообщения. Для миди это будет:

```
navigator.permissions.query({name:'midi', sysex:true})
```

## Запрос разрешений

Запрос разрешения от пользователя зависит от конкретного API. Например,
геолокация будет отображать запрос разрешения при вызове `getCurrentPosition()`
.

```
navigator.geolocation.getCurrentPosition(function(position) {
  console.log('Geolocation permissions granted');
  console.log('Latitude:' + position.coords.latitude);
  console.log('Longitude:' + position.coords.longitude);
});
```

Принимая во внимание, что уведомления будут запрашивать пользователя при вызове
`requestPermission()` .

```
Notification.requestPermission(function(result) {
  if (result === 'denied') {
    console.log('Permission wasn\'t granted. Allow a retry.');
    return;
  } else if (result === 'default') {
    console.log('The permission request was dismissed.');
    return;
  }
  console.log('Permission was granted for notifications');
});
```

Дело в том, что Permission API позволяет согласованно отслеживать состояние
разрешений, в то же время поддерживая диапазон API-интерфейсов, доступных в
настоящее время в сети.

Большим преимуществом этого является то, что он позволяет вам создавать более
удобные условия работы для ваших пользователей, предлагая только, когда для
пользователя очевидно, зачем вам нужны дополнительные привилегии, и в полной
мере использовать эти API, когда вы знаете, что получили разрешение.

[Вы можете найти полный набор примеров
здесь](https://googlechrome.github.io/samples/permissions/) {: .external }.

## Поддержка браузером

Chrome - первый браузер, который реализует это, Mozilla планирует выпустить его,
и Microsoft проявила интерес к API.

## Известные проблемы

- Geolocation не будет отображать запрос, если пользователь отклонит запрос на
разрешение. Однако статус разрешения остается «prompt». [
[bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/detail?id=476509)
]
