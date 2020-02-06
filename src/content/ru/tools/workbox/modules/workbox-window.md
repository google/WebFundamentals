project_path: /web/tools/workbox/_project.yaml
book_path: /web/tools/workbox/_book.yaml
description: The module guide for workbox-routing.

{# wf_published_on: 2019-02-24 #} {# wf_updated_on: 2020-01-15 #} {#
wf_blink_components: N/A #}

# Workbox Window {: .page-title }

## Что такое workbox-window?

Пакет `workbox-window` - это набор модулей, которые предназначены для работы в
[контексте окна](https://developer.mozilla.org/en-US/docs/Web/API/Window), то
есть внутри ваших веб-страниц. Они являются дополнением к другим пакетам рабочих
пакетов, которые выполняются в сервис-воркере (service worker).

Ключевые особенности/цели `workbox-window` :

- Упростить процесс регистрации и обновления сервис-воркера, помогая
разработчикам определять [наиболее критические моменты в жизненном цикле
сервис-воркера](#important_service_worker_lifecycle_moments) и упрощая
реагирование на эти моменты.
- Помочь разработчикам не совершать [самые распространенные
ошибки](#avoiding_common_mistakes) .
- Для [упрощения связи](#window_to_service_worker_communication) между кодом,
работающим в сервис-воркере, и кодом, работающим в окне.

## Импорт и использование workbox-window

Основной точкой входа для пакета `workbox-window` является класс `Workbox`, и вы
можете импортировать его в свой код либо из нашей CDN, либо с помощью любого из
популярных инструментов связывания JavaScript.

### Using our CDN

The easiest way to import the `Workbox` class on your site is from our CDN:

```html
<script type="module">
import {Workbox} from 'https://storage.googleapis.com/workbox-cdn/releases/{% include "web/tools/workbox/_shared/workbox-latest-version.html" %}/workbox-window.prod.mjs';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.register();
}
</script>
```

Обратите внимание, что в этом примере используется [`<script type="module">` и
оператор `import`](/web/fundamentals/primers/modules) для загрузки класса
`Workbox` . Хотя вы можете подумать, что вам нужно транспилировать этот код,
чтобы он работал в старых браузерах, на самом деле это не обязательно.

Все основные браузеры, которые [поддерживают
сервис-воркеры](https://caniuse.com/#feat=serviceworkers), также [поддерживают
собственные модули JavaScript](https://caniuse.com/#feat=es6-module), поэтому
совершенно нормально предоставлять этот код любым браузерам (старые браузеры
просто игнорируют его).

### Loading Workbox with JavaScript bundlers

Хотя для использования `workbox-window` совершенно не требуется никаких
инструментов, если ваша инфраструктура разработки уже включает в себя такой
упаковщик (bundler) как [webpack](https://webpack.js.org/) или
[Rollup](https://rollupjs.org), который работает с зависимостями
[npm](https://www.npmjs.com/), их можно использовать для загрузки
`workbox-window` .

The first step is to
[install](https://docs.npmjs.com/downloading-and-installing-packages-locally)
`workbox-window` as a dependency of your application:

```
npm install workbox-window
```

Then, in one of your application's JavaScript files, `import` workbox by
referencing the `workbox-window` package name:

```javascript
import {Workbox} from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');

  wb.register();
}
```

Если ваш пакет поддерживает [разделение кода с помощью динамических операторов
импорта](/web/fundamentals/performance/optimizing-javascript/code-splitting/#splitting_code_dynamically),
вы также можете условно загрузить `workbox-window`, что должно помочь уменьшить
размер основного пакета вашей страницы.

Несмотря на то, что `workbox-window` довольно маленький (1 КБ в сжатом виде),
нет причин, по которым его нужно загружать основной логикой приложения вашего
сайта, поскольку сервис-воркеры по своей природе являются прогрессивным
улучшением.

```javascript
if ('serviceWorker' in navigator) {
  const {Workbox} = await import('workbox-window');

  const wb = new Workbox('/sw.js');
  wb.register();
}
```

### Advanced bundling concepts

В отличие от пакетов Workbox, которые запускаются в сервис-воркере, файлы
сборки, на которые ссылаются `workbox-window` поля
[`main`](https://docs.npmjs.com/files/package.json#main) и
[`module`](https://github.com/rollup/rollup/wiki/pkg.module) в файле
`package.json`, транспилируются в ES5. Это делает их совместимыми с современными
инструментами сборки, некоторые из которых не позволяют разработчикам
транспилировать что-либо из своих `node_module` зависимостей.

Если ваша система сборки *действительно* позволяет вам транспилировать ваши
зависимости (или, если вам не нужно транспилировать ваш код), то лучше
импортировать определенный исходный файл, а не сам пакет.

Вот несколько способов импорта `Workbox`, а также объяснение того, что каждый из
них вернет:

```javascript
// Импортирует UMD версию в синтаксисе ES5
// (pkg.main: "build/workbox-window.prod.umd.js")
const {Workbox} = require('workbox-window');

// Импортирует модульную версию в синтаксисе ES5
// (pkg.module: "build/workbox-window.prod.es5.mjs")
import {Workbox} from 'workbox-window';

//Импортирует исходные файлы модульной версии в синтаксисе ES2015+
import {Workbox} from 'workbox-window/Workbox.mjs';
```

<aside class="caution"><strong>Важно!</strong> Если вы импортируете исходный
файл напрямую, вам также понадобится настроить процесс сборки так, чтобы
минимизировать файл и удалить код только для разработки при развертывании его в
рабочей среде. См. Руководство <a
href="/web/tools/workbox/guides/using-bundlers">Использование упаковщиков
(webpack/Rollup) с Workbox</a> для более подробной информации.</aside>

### Examples

После того, как вы импортировали класс `Workbox`, вы можете использовать его для
регистрации и взаимодействия с сервис-воркером. Вот несколько примеров того, как
вы можете использовать `Workbox` в своем приложении:

<h4 id="example-first-active" class="hide-from-toc">Зарегистрируйте
сервис-воркер и уведомите пользователя в самый первый раз, когда сервис-воркер
активен:</h4>

Многие веб-приложения работают с сервис-воркерами для предварительного
кэширования ресурсов, поэтому их приложение работает в автономном режиме при
последующих загрузках страниц. В некоторых случаях имеет смысл сообщить
пользователю, что приложение теперь доступно в автономном режиме.

```javascript
const wb = new Workbox('/sw.js');

wb.addEventListener('activated', (event) => {
  // `event.isUpdate` будет true если другая версия сервис-воркера
  // управляла страницой когда эта версия была зарегистрирована.
  if (!event.isUpdate) {
    console.log('Service worker activated for the first time!');

    // Если ваш сервис-воркер сконфигурирован для прекэширования ресурсов, эти ресурсы должны быть доступны.
  }
});

// После того как слушатель событий был добавлен - регистрируем сервис-воркер.
wb.register();
```

<h4 id="example-waiting" class="hide-from-toc">Уведомить пользователя, если
сервис-воркер установлен, но завис в ожидании активации</h4>

Когда страница, контролируемая существующим сервис-воркером, регистрирует новый
сервис-воркер, по умолчанию этот сервис-воркер не активируется до тех пор, пока
все клиенты, находящиеся под контролем первоначального сервис-воркер, не будут
полностью выгружены.

Это распространенный источник путаницы для разработчиков, особенно в тех
случаях, когда [перезагрузка текущей страницы не приводит к активации нового
сервис-воркер](/web/fundamentals/primers/service-workers/lifecycle#waiting) .

To help minimize confusion and make it clear when this situation is happening,
the `Workbox` class provides a `waiting` event that you can listen for:

```javascript
const wb = new Workbox('/sw.js');

wb.addEventListener('waiting', (event) => {
  console.log(`Новый сервис-воркер был установлен, но не может быть активирован` +
      `пока все вкладки с текущей версией не будут полностью выгружены.`);
});

// После того как слушатель событий был добавлен - регистрируем сервис-воркер.
wb.register();
```

<h4 id="example-broadcast-updates" class="hide-from-toc">Notify the user of
cache updates from the <code>workbox-broadcast-update</code> package</h4>

The [`workbox-broadcast-update`
package](/web/tools/workbox/modules/workbox-broadcast-update) is a great

way to be able to serve content from the cache (for fast delivery) while also
being able to inform the user of updates to that content (using the
[stale-while-revalidate
strategy](/web/tools/workbox/modules/workbox-strategies#stale-while-revalidate)).

To receive those updates from the window, you can listen to `message` events of
type `CACHE_UPDATED`:

```javascript
const wb = new Workbox('/sw.js');

wb.addEventListener('message', (event) => {
  if (event.data.type === 'CACHE_UPDATED') {
    const {updatedURL} = event.data.payload;

    console.log(`Доступна новая версия ${updatedURL}!`);
  }
});

// После того как слушатель событий был добавлен - регистрируем сервис-воркер.
wb.register();
```

<h4 id="example-cache-urls" class="hide-from-toc">Отправьте сервис-воркеру
список URL в кеш</h4>

For some applications, it's possible to know all the assets that need to be
precached at build time, but some applications serve completely different pages,
based on what URL the user lands on first.

Для приложений последней категории может иметь смысл кэшировать только те
ресурсы, которые нужны пользователю для конкретной страницы, которую они
посетили. При использовании [пакета
`workbox-routing`](/web/tools/workbox/modules/workbox-routing) вы можете
отправить маршрутизатору список URL-адресов для кэширования, и он будет
кэшировать эти URL-адреса в соответствии с правилами, определенными на самом
маршрутизаторе.

Этот пример отправляет список URL-адресов, загруженных страницей, в
маршрутизатор каждый раз, когда активируется новый сервис-воркер. Обратите
внимание, что *все* URL-адреса можно отправлять, потому что будут кэшироваться
только те URL-адреса, которые соответствуют определенному маршруту в
сервис-воркере:

```javascript
const wb = new Workbox('/sw.js');

wb.addEventListener('activated', (event) => {
  // Получить текущий URL страницы + все загруженные ресурсы.
  const urlsToCache = [
    location.href,
    ...performance.getEntriesByType('resource').map((r) => r.name),
  ];
  // Послать этот список URL'ов маршрутизатору вашего сервис-воркера.
  wb.messageSW({
    type: 'CACHE_URLS',
    payload: {urlsToCache},
  });
});

// После того как слушатель событий был добавлен - регистрируем сервис-воркер.
wb.register();
```

<aside>   <strong>Обратите внимание:</strong> Подход выше работает для любого
маршрута, определённого через метод <a
href="/web/tools/workbox/reference-docs/latest/module-workbox-routing#.registerRoute"><code>registerRoute()</code></a>
в маршрутизаторе по умолчанию. If you're creating your own <code>Router</code>
instance, you'll need to call   <a
href="/web/tools/workbox/reference-docs/latest/module-workbox-routing.Router#addCacheListener">
<code>addCacheListener()</code></a> manually.</aside>

## Важные моменты из жизненного цикла сервис-воркера

[Жизненный цикл
сервис-воркера](/web/fundamentals/primers/service-workers/lifecycle) является
сложным и может быть проблемным для понимания. Одна из причин, по которой он
настолько сложен, заключается в том, что он должен обрабатывать все крайние
случаи для всех возможных использований сервис-воркера (например, регистрация
более одного сервис-воркера, регистрация разных сервис-воркера в разных кадрах,
регистрация сервис-воркеров с разными именами и т.д.).

Но большинству разработчиков, внедряющих сервис-воркеры, не нужно беспокоиться
обо всех этих крайних случаях, потому что их использование довольно просто.
Большинство разработчиков регистрируют только одного сервис-воркера на загрузку
страницы, и они [не меняют название файла сервис-воркера]
(/web/fundamentals/primers /service-workers/lifecycle#avoid-url-change), который
они деплоят на свой сервер.

Класс `Workbox` охватывает это более простое представление жизненного цикла
сервис-воркера, разбивая все регистрации сервис-воркера на две категории:
собственный, зарегистрированный сервис-воркер экземпляра и внешний
сервис-воркер:

<ul>
  <li>
<strong id="def-registered-service-worker">Зарегистрированный
сервис-воркер</strong> : сервис-воркер, который начал установку в результате
вызова <code>register()</code> экземпляра <code>Workbox</code> или уже активный
сервис-воркер, если вызов <code>register()</code> не вызвал событие <a
href="https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/onupdatefound"><code>updatefound</code></a>
для регистрации.</li>
  <li>
<strong id="def-external-service-worker">Внешний сервис-воркер:</strong>
сервис-воркер, который начал установку независимо от <code>Workbox</code> вызова
<code>register()</code> . Обычно это происходит, когда пользователь открывает
новую версию вашего сайта в другой вкладке.</li>
</ul>

Идея состоит в том, что все события жизненного цикла, исходящие от
зарегистрированного сервис-воркера, являются событиями, которых должен ожидать
ваш код, тогда как все события жизненного цикла, исходящие от внешнего
сервис-воркера, следует рассматривать как потенциально опасные, а пользователей
следует предупреждать соответствующим образом.

Имея в виду эти два типа сервис-воркера, ниже приводится разбивка всех важных
моментов жизненного цикла сервис-воркеров, а также рекомендации для
разработчиков по их обработке:

### Самый первый раз, когда сервис-воркер установлен

Вы, вероятно, захотите относиться к самому первому случаю установки
сервис-воркера иначе, чем к будущим обновлениям.

In `workbox-window`, you can differentiate between the version first
installation and future updates by checking the `isUpdate` property on any of
the following events. For the very first installation, `isUpdate` will be
`false`.

```javascript
const wb = new Workbox('/sw.js');

wb.addEventListener('installed', (event) => {
  if (!event.isUpdate) {
    // Первая установка обрабатывается здесь
  }
});

wb.register();
```

<table class="green">
  <tr>
    <th style="width: 25%">Момент</th>
    <th>Event</th>
    <th>Recommended action</th>
  </tr>
  <tr>
    <td>Установлен новый сервис-воркер (впервые)</td>
    <td><code>installed</code></td>
    <td>
<p>При первой установке сервис-воркера обычно происходит предварительное
кэширование всех ресурсов, необходимых для работы сайта в автономном режиме. Вы
можете сообщить пользователю, что его сайт теперь может работать в автономном
режиме.</p>
<p>Кроме того, поскольку при первой установке сервис-воркера у него не
будет перехваченных событий извлечения для загрузки этой страницы, вы можете
также рассмотреть кэширование уже загруженных ресурсов (хотя это не требуется,
если эти ресурсы уже были предварительно кэшированы). Пример как <a
href="#cache-urls">послать сервис-воркеру список URL-адресов для
кэширования,</a> приведенный выше, показывает, как это сделать.</p>
    </td>
  </tr>
  <tr>
    <td>Сервис-воркер начал контролировать страницу</td>
    <td><code>controlling</code></td>
    <td>
<p>Как только новый сервис-воркер установлен и начинает контролировать
страницу, все последующие события выборки будут проходить через этот
сервис-воркер. Если ваш сервис-воркер добавляет любую специальную логику для
обработки определенного события извлечения, это тот момент, когда вы знаете, что
логика будет работать.</p>
<p>Обратите внимание, что в самый первый раз, когда вы устанавливаете
сервис-воркер, он <em>не</em> начнет управлять текущей страницей, если этот
сервис-воркер не вызывает <a
href="/web/fundamentals/primers/service-workers/lifecycle#clientsclaim"><code>clients.claim()</code></a>
в своем событии активации. Поведение по умолчанию заключается в ожидании
загрузки следующей страницы, чтобы начать управление.</p>
<p>С точки зрения <code>workbox-window</code> это означает, что
<code>controlling</code> событие отправляется только в тех случаях, когда
сервис-воркер вызывает {code3}clients.claim(){/code3} . Это событие не
отправляется, если страница уже контролировалась до регистрации.</p>
   </td>
  </tr>
  <tr>
    <td>Сервис-воркер закончил активацию.</td>
    <td><code>activated</code></td>
    <td>
<p>Как упомянуто выше, самый первый раз, когда сервис-воркер заканчивает
активацию, он может (или не может) начать контролировать страницу.</p>
<p>По этой причине не следует прослушивать событие активации, чтобы узнать,
когда работник службы контролирует страницу. Однако, если вы запускаете логику в
активном событии (в сервис-воркере) и вам необходимо знать, когда эта логика
завершена, активированное событие сообщит вам об этом.</p>
   </td>
  </tr>
</table>

### Когда найдена обновленная версия сервис-воркера

Когда новый сервис-воркер начинает установку, но в настоящее время страница
управляет существующей версией, свойство `isUpdate` всех следующих событий будет
иметь значение `true` .

How you react in this situation is typically different from the very first
installation because you have to manage when and how the user gets this update.

<table class="cyan">
  <tr>
    <th style="width: 25%">Момент</th>
    <th>Event</th>
    <th>Recommended action</th>
  </tr>
  <tr>
    <td>Установлен новый сервис-воркер (обновляется предыдущий)</td>
    <td><code>installed</code></td>
    <td>
<p>Если это не самая первая установка сервис-воркера (
<code>event.isUpdate === true</code> ), это означает, что была найдена и
установлена более новая версия сервис-воркер (то есть версия, отличная от той,
которая в настоящее время контролирует страницу).</p>
      <p>This typically means a newer version of the site has been deployed to
      your server, and new assets may have just finished precaching.</p>
<p>Примечание. Некоторые разработчики используют <code>installed</code>
событие для информирования пользователей о доступности новой версии их сайта.
Однако, в зависимости от того, вызываете ли вы <a
href="/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase"><code>skipWaiting()</code></a>
у устанавливающего сервис-воркера, этот установленный сервис-воркер может или не
может сразу стать активным. Если <em>вы</em> вызываете
<code>skipWaiting()</code>, то это лучше всего информировать пользователей о
обновлении после того, как новый сервис-воркер активировал, и если вы
<em>не</em> вызываете <code>skipWaiting</code> лучше информировать их о
предстоящем обновлении в случае ожидания (см ниже более подробности).</p>
   </td>
  </tr>
  <tr>
    <td>Сервис-воркер установлен, но завис в фазе ожидания</td>
    <td><code>waiting</code></td>
    <td>
<p>Если обновленная версия вашего сервис-воркера не вызывает <a
href="/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase">
<code>skipWaiting()</code></a> во время установки не будет активировать до тех
пор, пока все страницы контролируемые активным сервис-воркером не будут
выгружены. Вы можете сообщить пользователю, что доступно обновление и оно будет
применено в следующий раз, когда они посетят страницу.</p>
<p><strong>Предупреждение!</strong> Разработчики часто предлагают
пользователям перезагрузить компьютер, чтобы получить обновление, но во многих
случаях <a
href="/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase">обновление
страницы не активирует установленного сервис-воркера</a>. Если пользователь
обновляет страницу, а сервис-воркер <em>все еще</em> ждет, событие
<code>waiting</code> вызовется снова и свойство
<code>event.wasWaitingBeforeRegister</code> будет иметь значение true. Обратите
внимание, мы планируем улучшить это в будущем. Следите за обновлениями в <a
href="https://github.com/GoogleChrome/workbox/issues/1848">ишью № 1848</a>.</p>
<p>Другой вариант - запросить у пользователя и спросить, хотят ли они
получить обновление или продолжить ожидание. Если вы хотите получить обновление,
вы можете использовать <code>postMessage()</code> чтобы сообщить сервис-воркеру
запустить <code>skipWaiting()</code>. Посмотрите продвинутый рецепт, <a
href="/web/tools/workbox/guides/advanced-recipes#offer_a_page_reload_for_users">предлагающий
перезагрузку страницы для пользователей</a> для примера.</p>
   </td>
  </tr>
  <tr>
    <td>Сервис-воркер начал контролировать страницу</td>
    <td><code>controlling</code></td>
    <td>
<p>Когда обновленный сервис-воркер начинает контролировать страницу, это
означает, что версия вашего сервис-воркера, контролируемая в настоящее время,
отличается от версии, которая контролировала, когда страница была загружена. В
некоторых случаях это может быть хорошо, но это также может означать, что
некоторые ресурсы, на которые ссылается текущая страница, больше не находятся в
кэше (и, возможно, также не на сервере). Возможно, вы захотите сообщить
пользователю, что некоторые части страницы могут работать некорректно.</p>
<p><strong>Примечание:</strong> <code>controlling</code> событие не
сработает, если вы не вызвали <code>skipWaiting()</code> в своем
сервис-воркере.</p>
   </td>
  </tr>
  <tr>
    <td>Сервис-воркер закончил активацию</td>
    <td><code>activated</code></td>
<td>Когда обновлённый сервис-воркер закончил активацию, это означает что
любая логика, которую вы описали в <code>activate</code> сервис-воркера,
завершена. Если вам нужно что-то отложить до завершения этой логики, самое время
запустить это.</td>
  </tr>
</table>

### При обнаружении неожиданной версии сервис-воркера

Sometimes users will keep your site open in a background tab for a very long
time. They might even open a new tab and navigate to your site without realizing
they already have your site open in a background tab. In such cases it's
possible to have two versions of your site running at the same time, and that
can present some interesting problems for you as the developer.

Consider a scenario where you have tab A running v1 of your site and tab B
running v2. When tab B loads, it'll be controlled by the version of your service
worker that shipped with v1, but the page returned by the server (if using a
[network-first caching
strategy](/web/tools/workbox/modules/workbox-strategies#network_first_network_falling_back_to_cache)
for your navigation requests) will contain all your v2 assets.

This is generally not a problem for tab B though, since when you wrote your v2
code, you were aware of how your v1 code worked. **However, it could be a
problem for tab A,** since your v1 code could not have possibly predicted what
changes your v2 code might introduce.

Чтобы помочь справиться с этими ситуациями, `workbox-window` также отправляет
события жизненного цикла, когда обнаруживает обновление от «внешнего»
сервис-воркера, где external означает любую версию, которая не является версией,
зарегистрированной текущим экземпляром `Workbox` .

<table class="orange">
  <tr>
    <th style="width: 25%">Момент</th>
    <th>Event</th>
    <th>Recommended action</th>
  </tr>
  <tr>
    <td>Установлен внешний сервис-воркер</td>
    <td><code>externalinstalled</code></td>
    <td>
<p>Если установлен внешний сервис-воркер, это, скорее всего, означает, что
пользователь запускает более новую версию вашего сайта на другой вкладке.</p>
      <p>How to respond likely depends on whether the installed service enters
      the waiting or active phase.</p>
   </td>
  </tr>
  <tr>
    <td>Внешний сервис-воркер установлен в ожидании активации</td>
    <td><code>externalwaiting</code></td>
    <td>
<p>Если внешний сервис-воркер ожидает активации, это, вероятно, означает,
что пользователь пытается получить новую версию вашего сайта на другой вкладке,
но он заблокирован, потому что эта вкладка все еще открыта.</p>
      <p>If this happens, you may consider showing showing a notification to the
      user asking them to close this tab. In extreme cases, you may even
      consider calling <code>window.reload()</code> if doing so won't cause the
      user to lose any saved state.</p>
   </td>
  </tr>
  <tr>
    <td>Внешний сервис-воркер активирован</td>
    <td><code>externalactivated</code></td>
<td>Если активирован внешний сервис-воркер, есть большая вероятность, что
текущая страница не будет функционировать должным образом. Возможно, вы захотите
показать пользователю уведомление о том, что он запускает более старую версию
страницы, и что-то может сломаться.</td>
  </tr>
</table>

## Avoiding common mistakes

Одна из самых полезных функций, предоставляемых Workbox - ведение журнала
разработчика. И это особенно актуально для `workbox-window` .

Мы знаем, что разработка с сервис-воркером часто может привести к путанице, и
когда всё происходит вопреки тому, что вы ожидаете, может быть трудно понять,
почему.

Например, когда вы вносите изменения в сервис-воркер и перезагружаете страницу,
вы можете не увидеть это изменение в своем браузере. Наиболее вероятная причина
этого - ваш сервис-воркер все еще ждет активации.

Но при регистрации сервис-воркер с классом `Workbox` вы будете получать
информацию обо всех изменениях состояния жизненного цикла в консоли
разработчика, что должно помочь с отладкой, почему всё не так, как вы ожидаете.

! [предупреждение консоли окна рабочего окна для ожидающего воркера]
(../images/modules/workbox-window/logs-stuck-waiting.png)

Кроме того, разработчики часто делают ошибку при первом использовании
сервис-воркера, чтобы зарегистрировать сервис-воркера в [неправильной
области](/web/ilt/pwa/introduction-to-service-worker#registration_and_scope) .

Чтобы предотвратить это, класс `Workbox` предупредит вас, если страница,
регистрирующая сервис-воркера, не входит в область действия этого
сервис-воркера. Он также предупредит вас в тех случаях, когда ваш сервис-воркер
активен, но еще не контролирует страницу:

! [предупреждение консоли окна рабочего окна для неконтролирующего воркера]
(../images/modules/workbox-window/logs-not-controlling.png)

## Общение между окном и сервис-воркером

Наиболее сложное использование сервис-воркера включает в себя много сообщений
между сервис-воркером и окном. Класс `Workbox` помогает в этом, предоставляя
метод `messageSW()`, который отправит `postMessage()` зарегистрированному
сервис-воркеру экземпляра и ожидает ответа.

Хотя вы можете отправлять данные сервис-воркеру в любом формате, формат, общий
для всех пакетов Workbox, представляет собой объект с тремя свойствами
(последние два являются необязательными):

<table>
  <tr>
    <th>Свойство</th>
    <th>Обязательное?</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><strong><code>type</code></strong></td>
    <td><strong>Yes</strong></td>
    <td><code>string</code></td>
    <td>
      <p>A unique string, identifying this message.</p>
      <p>By convention, types are all uppercase with underscores separating
      words. If a type represents an action to be taken, it should be a command
      in present tense (e.g. <code>CACHE_URLS</code>), if type represent
      information being reported, it should be in past tense (e.g.
      <code>URLS_CACHED</code>).</p>
   </td>
  </tr>
  <tr>
    <td><strong><code>meta</code></strong></td>
    <td>no</td>
    <td><code>string</code></td>
    <td>In Workbox this is always the name of the Workbox package sending the
    message. When sending message yourself, you can either omit this property or
    set it to whatever you like.</td>
  </tr>
  <tr>
    <td><strong><code>payload</code></strong></td>
    <td>no</td>
    <td><code>*</code></td>
    <td>The data being sent. Usually this is an object, but it does not have to
    be.</td>
  </tr>
</table>

Сообщения, отправленные с помощью `messageSW()` используют `MessageChannel`
чтобы получатель мог на них ответить. Чтобы ответить на сообщение, вы можете
вызвать `event.ports[0].postMessage(response)` в слушателе событий вашего
сообщения. Метод `messageSW()` возвращает Promise, которое разрешается для
любого вашего `response`.

Вот пример отправки сообщений из окна сервис-воркеру и получения ответа обратно.
Первый блок кода - это слушатель сообщений в сервис-воркере, а второй блок
использует класс `Workbox` для отправки сообщения и ожидания ответа:

**Code in sw.js:**

```javascript
const SW_VERSION = '1.0.0';

addEventListener('message', (event) => {
  if (event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage(SW_VERSION);
  }
});
```

**Code in main.js (running in the window):**

```javascript
const wb = new Workbox('/sw.js');
wb.register();

const swVersion = await wb.messageSW({type: 'GET_VERSION'});
console.log('Service Worker version:', swVersion);
```

### Managing version incompatibilities

В приведенном выше примере показано, как можно реализовать проверку версии
сервис-воркера из окна. Этот пример используется потому, что когда вы
отправляете сообщения назад и вперед между окном и сервис-воркером, важно знать,
что ваш сервис-воркер может не использовать ту версию вашего сайта, на которой
работает код вашей страницы, и решение для решения этой проблемы различается в
зависимости от того, обслуживаете ли вы свои страницы по сети или сначала по
кешу.

<h4 class="hide-from-toc">Network first</h4>

When serving your pages network first, your users will always be getting the
latest version of your HTML from your server. However, the first time a user
revisits your site (after you've deployed an update) the HTML they get will be
for the latest version, but the service worker running in their browser will be
a version installed previously (possibly many versions old).

Важно понимать эту возможность, потому что, если JavaScript, загруженный текущей
версией вашей страницы, отправляет сообщение более старой версии вашего
сервис-воркера, эта версия может не знать, как ответить (или может отвечать
несовместимым форматом).

В результате, это хорошая идея - всегда проверять версию вашего сервис-воркера и
проверять наличие совместимых версий, прежде чем выполнять какую-либо
критическую работу.

Например, в приведенном выше коде, если версия сервис-воркера, возвращаемая этим
`messageSW()` старше ожидаемой версии, было бы разумно дождаться, когда будет
найдено обновление (что должно произойти, когда вы вызываете `register()` ). В
этот момент вы можете либо уведомить пользователя или сделать обновление, или вы
можете вручную [пропустить этап
ожидания,](/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase)
чтобы сразу активировать нового сервис-воркера.

<h4 class="hide-from-toc">Cache first</h4>

В отличие от того, когда вы обслуживаете страницы по сети, во время обслуживания
кеша страниц, во-первых, вы знаете, что изначально ваша страница всегда будет
иметь ту же версию, что и ваш сервис-воркер (потому что это то, что обслуживало
ее). И в результате, безопасно использовать `messageSW()` сразу.

Однако, если обновленная версия вашего сервис-воркер найдена и активируется,
когда ваша страница вызывает `register()` (то есть вы намеренно [пропускаете
фазу
ожидания](/web/fundamentals/primers/service-workers/lifecycle#skip_the_waiting_phase)
), отправка сообщений на нее может оказаться небезопасной.

Одной из стратегий управления этой возможностью является использование схемы
управления версиями, которая позволяет вам различать разрывные обновления и
непрерывные обновления, и в случае критического обновления вы знаете, что
отправлять сообщения сервис-воркеру небезопасно. Вместо этого вы хотели бы
предупредить пользователя, что он запускает старую версию страницы, и предложить
перезагрузить его, чтобы получить обновление.
