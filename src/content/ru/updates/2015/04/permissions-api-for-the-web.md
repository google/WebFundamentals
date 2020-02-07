project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Permissions API дает вам главную роль в проверке статуса разрешений API.

{# wf_updated_on: 2019-03-22 #}
{# wf_published_on: 2015-04-04 #}
{# wf_tags: news,permissions #}
{# wf_blink_components: N/A #}

# Permissions API для веба {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}

If you've worked with the [Geolocation
API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)
before, chances are you've wanted to check if you had permission to use
Geolocation without causing a prompt. This simply wasn't possible. You had to
request the current position and this would indicate the permission state or
cause a prompt to be shown to the user.

Not all APIs work this way. The Notifications API has its own way of allowing
you to check the current permission state via
[Notification.permission](https://notifications.spec.whatwg.org/#permission).

As the web platform grows in API's, there needs to be a single, standard way for
developers to check the status of a permission rather than having to remember
how each and every API works. The [Permission
API](https://w3c.github.io/permissions/){: .external }, available in [Chrome
version 43](https://www.chromestatus.com/feature/6376494003650560), is
intended to be this single, standard way to check the permission status of an
API.

## permissions.query()

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

### Supported PermissionDescriptors

In the above example, we highlight how to query the permission state for
geolocation with the following permission descriptor: `{name:'geolocation'}`.

The Notification permission descriptor is similar in that it only requires a
name attribute: `{name:'notifications'}`.

[Push](https://w3c.github.io/permissions/#h-push) and
[midi](https://w3c.github.io/permissions/#h-midi) each have an additional
parameter that is specific to that API.

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

## Requesting Permissions

Requesting permission from the user depends on the specific API. For example,
geolocation would show a permission prompt when you call `getCurrentPosition()`.

```
navigator.geolocation.getCurrentPosition(function(position) {
  console.log('Geolocation permissions granted');
  console.log('Latitude:' + position.coords.latitude);
  console.log('Longitude:' + position.coords.longitude);
});
```

Whereas notifications would prompt the user when you call `requestPermission()`.

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

The point here is that the Permission API allows a consistent way to monitor the
status of permissions while being able to support the range of APIs currently on
the web.

The big advantage of this is that it allows you to build better experiences for
your users, only prompting when it's obvious to the user why you need extra
privileges and taking full advantage of these APIs when you know you have been
granted permission.

[You can find a full set of examples
here](https://googlechrome.github.io/samples/permissions/){: .external }.

## Поддержка браузером

Chrome is the first browser to implement this, Mozilla are planning on shipping
this, and Microsoft have shown interest in the API.

## Известные проблемы

- Geolocation не будет отображать запрос, если пользователь отклонит запрос на
разрешение. Однако статус разрешения остается «prompt». [
[bugs.chromium.org](https://bugs.chromium.org/p/chromium/issues/detail?id=476509)
]
