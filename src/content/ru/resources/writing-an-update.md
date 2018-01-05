project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: Это описание страницы, размещенное в head.

{# wf_updated_on: 2017-12-06 #}
{# wf_published_on: 2016-09-13 #}
{# wf_blink_components: N/A #}

# Как писать обновления или исследования {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Обновления и Исследования используют те же [стили и markdown](markdown-syntax),
что и [статьи](writing-an-article), но имеют несколько дополнительных атрибутов,
которые вы можете использовать, чтобы посмотреть, как они изменяются в разных
частях сайта. Вам так же придется [создавать связанные](#build-related) файлы,
такие как listing page, feeds, `book.yaml` и страницы тегов, использующие
`gulp`.

## Быстрый старт

Для начала скопируйте шаблон.

1. Скопируйте шаблон
([демо](https://github.com/google/WebFundamentals/blob/master/src/templates/showcase/_template.md)
или
[обновление](https://github.com/google/WebFundamentals/blob/master/src/templates/updates/_template.md))
и поместите в соответствующую директорию.
2. Обновите ключевые поля: 
    - `book_path`
    - `description`
- `wf_updated_on` & `wf_published_on` используйте формат YYYY-MM-DD
(2016-12-31)
    - `wf_featured_image` & `wf_featured_snippet`
    - Обновите блок контрибьютора
3. Запустите `gulp build` чтобы ваш шаблон появился в списке страниц и в
оглавлении.
4. Напишите обновление или демо
5. Перед отсылкой pull request, запустите `gulp test`, чтобы проверить что все
хорошо
6. Отошлите ваш PR.

Note: См. [YAML Front Matter and Attribute
Reference](/web/resources/yaml-and-attr-reference)
для ознакомления со всем YAML Front Matter и другими атрибутами, которые вы
можете или должны использовать.

## YAML Front Matter & Специальные атрибуты

Обратитесь к разделу [YAML Front Matter](writing-an-article#yaml_front_matter)
для полного описания требований YAML front matter.

Note: Вы не можете добавить HTML атрибут описание. Если вы хотите включить HTML
в сниппет, добавьте `wf_featured_snippet`.

### Тэги

Чтобы упростить поиск и группировку сообщений, [/web/updates/](/web/updates/)
поддерживает тэги. Просто добавьте блок wf_tags block со списком тэгов, через
запятую.

<pre class="prettyprint">
{# wf_tags: devtools,geolocation,gulp,getusermedia #}
</pre>

Note: Посмотрите список [общих
тэгов](https://github.com/google/WebFundamentals/blob/master/src/data/commonTags.json)
и используйте его, если это возможно. Если вы используете тэг, которого нет в
этом списке, процесс сборки вызовет предупреждение.

### Популярные изображения

Чтобы указать изображение, используемое на списках страниц и в ленте, добавьте
тэг `wf_featured_image`. Чтобы это работало в ленте, URL страницы должен быть
абсолютным.

<pre class="prettyprint">
{# wf_featured_image: /web/updates/images/weird.jpg #}
</pre>

Изображение должно быть 16x9, в идеале 800px на 450px.

**Ищете типовое изображение?** Проверьте папку [типовых
изображений](https://github.com/google/WebFundamentals/tree/master/src/content/en/updates/images/generic).

### Популярные сниппеты

Популярные сниппеты используются, как сниппет для списка страниц. Если его нет,
мы попробуем использовать описание. Сниппет не ограничен по длине и **может**
включать HTML.

<pre class="prettyprint">
{# wf_featured_snippet: Use <kbd class='kbd'>Cmd + ]</kbd>... #}
</pre>

### Блоки комментариев

Блоки комментариев не добавляются автоматически на страницы обновлений. Чтобы
разрешить пользователям комментировать ваш документ, вам нужно добавить виджет
комментариев внизу страницы. Например:

<pre class="prettyprint">
{% include "comment-widget.html" %}
</pre>

Note: виджет комментариев **не** отображается в staging и development среде, и
будет отображаться только на опубликованной на DevSite странице.

## Генерация связанных файлов {: #build-related }

Как только вы создали свое обновление, вам нужно сформировать связанные файлы,
как на странице описания, обновить `_book.yaml`, и т.д. Чтобы сделать это,
запустите:

```
gulp build

```



Translated by
{% include "web/_shared/contributors/dmitryskripunov.html" %}
