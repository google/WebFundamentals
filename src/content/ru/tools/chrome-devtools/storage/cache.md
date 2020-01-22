project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Как просмотреть данные кэша с панели приложений Chrome DevTools.

{# wf_updated_on: 2019-09-03 #}
{# wf_published_on: 2019-03-25 #}
{# wf_blink_components: Platform>DevTools #}

# Просмотр данных кэша с помощью Chrome DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

В этом руководстве показано, как использовать [Chrome
DevTools](/web/tools/chrome-devtools) для проверки данных
[кэша](https://developer.mozilla.org/en-US/docs/Web/API/Cache) {: .external }.

If you're trying to inspect [HTTP
cache](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching){: .external }
data, this is not the guide you want.
The **Size** column of the **Network Log** has the information you're looking
for. See [Log network activity](/web/tools/chrome-devtools/network/#load).

## Просмотр данных кэша {: #view }

1. Click the **Application** tab to open the **Application** panel. The
**Manifest** pane usually opens
    by default.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/manifest.png" alt="The
Manifest pane.">
        <figcaption>
          <b>Figure 1</b>. The Manifest pane.
        </figcaption>
      </figure>
    

2. Expand the **Cache Storage** section to view available caches.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/cache.png"
alt="Available caches.">
        <figcaption><b>Рисунок 2</b> Доступные кеши.</figcaption>
      </figure>
    

3. Нажмите на кеш, чтобы просмотреть его содержимое.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/cacheview.png"
alt="Viewing a cache's contents.">
<figcaption><b>Рисунок 3</b> Просмотр кеша <b>airhorner-0.6.11</b>
.</figcaption>
      </figure>
    

4. Нажмите на ресурс, чтобы просмотреть его заголовки HTTP в разделе под
таблицей.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/viewcacheresource.png"
alt="Viewing a resource's HTTP headers.">
<figcaption><b>Рисунок 4</b> Просмотр заголовков HTTP ресурса
<b>/index.html</b> .</figcaption>
      </figure>
    

5. Click **Preview** to view a resource's content.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/cachecontent.png"
alt="Viewing a resource's content.">
        <figcaption>
<b>Figure 5</b>. Viewing the content of the
<b>/scripts.comlink.global.js</b> resource.
        </figcaption>
      </figure>
    

## Обновить ресурс {: #refresh }

1. [Просмотр данных кеша](#view) .

2. Нажмите на ресурс, который вы хотите обновить. DevTools выделяет его синим
цветом, чтобы указать, что он выбран.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/cacheselected.png"
alt="Selecting a resource.">
<figcaption><b>Рисунок 6</b> Выбор ресурса <b>/styles/main.css</b>
.</figcaption>
      </figure>
    

3. Нажмите **Обновить**
![Refresh](/web/tools/chrome-devtools/images/shared/reload.png) {: .inline-icon
}.

## Фильтровать ресурсы {: #filter }

1. [Просмотр данных кеша](#view) .

2. Use the **Filter by Path** text box to filter out any resources that do not
match the path that you provide.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/cachefilter.png"
alt="Filtering out resources that do not match the specified path.">
<figcaption><b>Рисунок 7</b> Фильтрация ресурсов, которые не
соответствуют пути <code>/script</code> .</figcaption>
      </figure>
    

## Удалить ресурс {: #deleteresource }

1. [Просмотр данных кеша](#view) .

2. Нажмите на ресурс, который вы хотите удалить. DevTools выделяет его синим
цветом, чтобы указать, что он выбран.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/cacheselected.png"
alt="Selecting a resource.">
<figcaption><b>Рисунок 8</b> Выбор ресурса <b>/styles/main.css</b>
.</figcaption>
      </figure>
    

3. Нажмите **Удалить выбранное** ![Delete
Selected](/web/tools/chrome-devtools/images/shared/delete.png) {: .inline-icon
}.

## Удалить все данные кэша {: #deletecache }

1. Откройте **Приложение** > **Очистить хранилище** .

2. Убедитесь, что флажок **Cache Storage** включен.

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/cachecheckbox.png"
alt="The Cache Storage checkbox.">
        <figcaption><b>Рисунок 9</b> Флажок <b>Cache Storage</b> .</figcaption>
      </figure>
    

3. Нажмите **Очистить данные сайта** .

      <figure>
<img src="/web/tools/chrome-devtools/storage/imgs/cacheclearsite.png"
alt="The Clear Site Data button.">
<figcaption><b>Рисунок 10</b> Кнопка <b>Очистить данные сайта</b>
.</figcaption>
      </figure>
    

## Обратная связь {: #feedback }

{% include "web/_shared/helpful.html" %}
