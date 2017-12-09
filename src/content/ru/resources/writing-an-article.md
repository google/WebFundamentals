project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: Это описание страницы, расположенное в мета тэгах.

{# wf_updated_on: 2016-09-13 #}
{# wf_published_on: 2016-09-13 #}

# Как писать статьи {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

Это вводный параграф. Это все равно что старый yaml атрибут `introduction`, но
вместо того, чтобы быть в YAML, он теперь находится в документе.

Чтобы написать совершенно новую статью, следуйте этим шагам. Или просто
скопируйте этот markdown файл, разместите его в нужной вам директории, и
отредактируйте.

## YAML Front Matter

Все документы должны иметь минимальный набор YAML front matter включающий ссылку
на `_project.yaml`, и еще одну на `_book.yaml`.

```
project_path: /web/_project.yaml
book_path: /web/section/_book.yaml
```

Note: If the path to the project or book cannot be found, the page will not
include the left nav and the upper tabs will not be properly highlighted.

### Описание (необязательный)

Вы можете добавить описание страницы в блоке YAML front matter, которое
используется в `meta` описания страницы. Описание должно быть коротким (<450
символов), и представлять собой лишь краткое описание страницы.

```
description: Lorem ipsum
```

Внимание: Не добавляйте блоки <code> (или `) поле описания.

### Другие YAML атрибуты

<table class="responsive">
  <tbody>
    <tr>
      <th colspan="2">Other Attributes</th>
    </tr>
    <tr>
      <td><code>full_width: true</code></td>
      <td>
        Relinquishes control over the layout for the area below the site
        header and project bar and above the site footer. Not supported in
        the development environment.
      </td>
    </tr>
    <tr>
      <td><code>hide_last_updated: true</code></td>
      <td>
        Hides the automatically generated last updated field at the bottom of
        the page. Not supported in the development environment.
      </td>
    </tr>
  </tbody>
</table>

## Заголовок страницы (обязательный)

Заголовок страницы определяется первым H1-подобным тэгом с классом
`.page-title`.
Например:

<pre class="prettyprint">
&num; Writing an Article {: .page-title }
</pre>

Внимание: Заголовки страниц не должны включать никакие markdown или HTML тэги.

## Автор и переводчик

Чтобы добавить автора и переводчика используйте:

<pre class="prettyprint">
{% include "web/_shared/contributors/petelepage.html" %}
</pre>

## Написать свой контент

Теперь пришло время добавить ваш контент. Подробные сведения о стилях, которые
вы можете использовать смотрите в [руководство по стилю письма](/style/) и
руководство по [markdown синтаксису](markdown-syntax). А так же о том как
сделать, чтобы все выглядело красиво.

## Добавить статью в меню

Чтобы ваша статья появилась в соответствующем блоке навигации нужно обновить
`_book.yaml` или  `_toc.yaml`. Каждый раздел (обновления, демо, основы),
имеет их собственный `_book.yaml`, а также связан с индивидуальным `_toc.yaml`.
Вы, скорее всего, захотите добавить свою статью в один из `_toc.yaml`.

## Испытайте и отправьте свой PR

Когда будете готовы, запустите `gulp test`, чтобы убедиться, что нет проблем с
вашим контентом, а затем посылайте ваш pull request.
