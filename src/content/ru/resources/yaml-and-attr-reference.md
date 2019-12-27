project_path: /web/_project.yaml
book_path: /web/resources/_book.yaml
description: YAML Front Matter & Другие атрибуты.

{# wf_updated_on: 2017-12-06 #}
{# wf_published_on: 2017-12-06 #}
{# wf_blink_components: N/A #}

<style>
  .required {
    color: #d50000;
    font-weight: bold;
  }
</style>

# YAML Front Matter и Справочник атрибутов {: .page-title }

Warning: Эти атрибуты НИКОГДА не должны переноситься на  новую строку.

## YAML front matter

YAML front matter всегда должен быть в начале документа.

<table class="responsive">
  <tr>
    <th colspan="2"><h3><code>book_path</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>
Указывает расположение <code>_book.yaml</code>, используемого для
формирования оглавления.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>book_path: /web/section/_book.yaml</code>
    </td>
  </tr>
</table>

<table class="responsive">
  <tr>
    <th colspan="2"><h3><code>description</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
<td>Нет</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Вы можете добавить описание страницы в YAML front matter, которое
используется как `meta` описание для страницы. Описание должно быть коротким
(<450 символов), и давать лишь краткий обзор страницы.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>description: Lorem ipsum</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>
      Не добавляйте никаких HTML или Markdown в поле <code>описание</code>.
    </td>
  </tr>
</table>

<table class="responsive">
  <tr>
    <th colspan="2"><h3><code>full_width</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
<td>Нет</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Отменяет контроль над раскладкой для области ниже заголовка сайта и
панели проекта и над футером.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>full_width: true</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Не поддерживается в development окружении.</td>
  </tr>
</table>

<table class="responsive">
  <tr>
    <th colspan="2"><h3><code>hide_last_updated</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
<td>Нет</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Скрывает автоматически сгенерированный блок последних обновлений внизу
страницы.</td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>hide_last_updated: true</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Не поддерживается в development окружении.</td>
  </tr>
</table>

<table class="responsive" id="project-path">
  <tr>
    <th colspan="2"><h3><code>project_path</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Описывает расположение файла <code>_project.yaml</code>, который
указывает DevSite на текущий проект.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>project_path: /web/_project.yaml</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
<td>Если путь не будет найден, то страница не будет содержать панель
навигации слева, а верхние вкладки не будут правильно выделены.
    </td>
  </tr>
</table>

## Специальные атрибуты

<table class="responsive" id="wf_auto_generated">
  <tr>
    <th colspan="2"><h3><code>wf_auto_generated</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
<td>Нет</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>К автосгенерированным markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Автоматически добавляется к файлам, которые генерируются через некую
систему сборки. Изменяет типы тестов, выполняемых для файла.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_auto_generated #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_blink_components">
  <tr>
    <th colspan="2"><h3><code>wf_blink_components</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Разделенный через запятую список <a
href="https://blinkcomponents-b48b5.firebaseapp.com/">Blink компонентов</a>.
Используется для указания Blink компонентов, на которые ссылается статья.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>
        {# wf_blink_components: Blink>CSS,Blink>JavaScript>API #}
      </code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Если нет blink компонентов, используйте:
    <br>
    <code>
      {# wf_blink_components: N/A #}
    </code>
</td>
  </tr>
</table>

<table class="responsive" id="wf_devsite_translation">
  <tr>
    <th colspan="2"><h3><code>wf_devsite_translation</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td>Нет</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Markdown страницам, переведенным DevSite</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Автоматически добавляется в файлы, которые были переведены командой
переводов DevSite. Изменяет типы тестов, выполняемых для файла.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      
    </td>
  </tr>
</table>

<table class="responsive" id="wf_featured_date">
  <tr>
    <th colspan="2"><h3><code>wf_featured_date</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td>Нет</td>
  </tr>
  <tr>
    <td>Применяется</td>
<td>Только к markdown страницам в <b>обновлениях</b> and
<b>демонстрациях</b>
</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Используется для сортировки статьи в примерах или обновлениях, чтобы
держать определенные статьи в ТОП.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_featured_date: 2017-12-06 #}</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Формат даты: YYYY-MM-DD</td>
  </tr>
</table>

<table class="responsive" id="wf_featured_image">
  <tr>
    <th colspan="2"><h3><code>wf_featured_image</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
<td>Только к markdown страницам в <b>обновлениях</b> and
<b>демонстрациях</b>
</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Чтобы указать изображение, используемое в списках страниц и в ленте,
добавьте тэг <code>wf_featured_image</code>. Чтобы убедиться, что это работает в
ленте, предоставленный URL-адрес должен быть абсолютной страницей на DevSite.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_featured_image: /web/updates/images/weird.jpg #}</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>
      <ul>
        <li>Изображения должны быть 16x9, в идеале 800px на 450px.</li>
<li>Ищите типовое изображение? Проверьте папку <a
href="https://github.com/google/WebFundamentals/tree/master/src/content/en/updates/images/generic">типовые
изображения</a>.
        </li>
    </ul>
</td>
  </tr>
</table>

<table class="responsive" id="wf_featured_snippet">
  <tr>
    <th colspan="2"><h3><code>wf_featured_snippet</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
<td>Только к markdown страницам в <b>обновлениях</b> and
<b>демонстрациях</b>
</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Featured snippet (ознакомительный фрагмент) используется как фрагмент в
списке страниц. Это некий крючок, чтобы привлечь людей читать ваши статьи.
Фрагмент не ограничен по длине и <b>может</b> содержать HTML.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>
        {# wf_featured_snippet: Use <kbd class='kbd'>Cmd + ]</kbd>... #}
      </code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td></td>
  </tr>
</table>

<table class="responsive" id="wf_md_include">
  <tr>
    <th colspan="2"><h3><code>wf_md_include</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Только к markdown файлам, включаемым в другие markdown файлы</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Указывает, что файл предназначен только для включения в другой markdown
файл, изменяет типы тестов, выполняемых с файлом.</td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_md_include #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_podcast_audio">
  <tr>
    <th colspan="2"><h3><code>wf_podcast_audio</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Только markdown файлам эпизода подкаста</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>Ссылка на скачивание MP3 файла.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>
        {# wf_podcast_audio: https://example.com/path/episode.mp3 #}
      </code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_podcast_duration">
  <tr>
    <th colspan="2"><h3><code>wf_podcast_duration</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Только markdown файлам эпизода подкаста</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>Длительность подкаста (HH:MM:SS)
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_podcast_duration: 00:30:37 #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_podcast_fileSize">
  <tr>
    <th colspan="2"><h3><code>wf_podcast_fileSize</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Только markdown файлам эпизода подкаста</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>Размер MP3 файла (в байтах) для скачивания
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_podcast_fileSize: 29803546 #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_podcast_subtitle">
  <tr>
    <th colspan="2"><h3><code>wf_podcast_subtitle</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Только markdown файлам эпизода подкаста</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>Подзаголовок подкаста </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_podcast_subtitle: Paul and Jake talk about CORS. #}</code>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_published_on">
  <tr>
    <th colspan="2"><h3><code>wf_published_on</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Определяет исходную дату, когда статья была написана и предназначена для
публикации. Она используется системой сборки для сортировки статей и
показывается только пользователям в каналах RSS/ATOM.</td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_published_on: 2017-12-06 #}</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Формат даты YYYY-MM-DD.</td>
  </tr>
</table>

<table class="responsive" id="wf_region">
  <tr>
    <th colspan="2"><h3><code>wf_region</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Только к markdown страницам в <b>демонстрациях</b>
</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Разделенный запятой список регионов, в которых должна быть показана
демонстрация.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_region: asia,europe #}</code>
    </td>
  </tr>
  <tr>
    <td>Допустимые регионы</td>
    <td>
      <ul>
        <li>africa</li>
        <li>asia</li>
        <li>europe</li>
        <li>middle-east</li>
        <li>north-america</li>
        <li>south-america</li>
      </ul>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_tags">
  <tr>
    <th colspan="2"><h3><code>wf_tags</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
<td>Только к markdown страницам в <b>обновлениях</b> and
<b>демонстрациях</b>
</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>Разделенный запятой список тэгов, относящихся к статье.</td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>
        {# wf_tags: devtools,geolocation,gulp,getusermedia #}
      </code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Если тэга нет в текущем списке, добавьте его в 
<a
href="https://github.com/google/WebFundamentals/blob/master/src/data/commonTags.json">
      <code>commonTags.json</code></a>
    </td>
  </tr>
</table>

<table class="responsive" id="wf_updated_on">
  <tr>
    <th colspan="2"><h3><code>wf_updated_on</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Определяет, когда статья была обновлена. Используется системой сборки
для сортировки статей и показывается только пользователям в каналах RSS/ATOM.
Также используется для определения какая локализованная статья требует
обновления.</td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_updated_on: 2017-12-06 #}</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Формат даты YYYY-MM-DD.</td>
  </tr>
</table>

<table class="responsive" id="wf_vertical">
  <tr>
    <th colspan="2"><h3><code>wf_vertical</code></h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Только к markdown страницам в <b>демонстрациях</b>
</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>Используется для определения vertical showcase.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>{# wf_vertical: education,media #}</code>
    </td>
  </tr>
  <tr>
    <td>Допустимые verticals</td>
    <td>
      <ul>
        <li>education</li>
        <li>entertainment</li>
        <li>media</li>
        <li>real-estate</li>
        <li>retail</li>
        <li>transportation</li>
        <li>travel</li>
      </ul>
    </td>
  </tr>
</table>

## Другие

<table class="responsive" id="wf-page-title">
  <tr>
    <th colspan="2"><h3>Page title</h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td class="required">Да</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
<td>Заголовок страницы определяется первым тэгом H1 с классом
<code>.page-title</code>.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>&num; Writing an Article {: .page-title }</code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Заголовок страницы не должен содержать markdown или HTML тэги.</td>
  </tr>
</table>

<table class="responsive" id="author-attribution">
  <tr>
    <th colspan="2"><h3>Author attribution</h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td>Настоятельно рекомендуется</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>Показывает имя автора в начале страницы
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <code>
        {% include "web/_shared/contributors/petelepage.html" %}
      </code>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Информация об авторе должна располагаться в начале страницы.</td>
  </tr>
</table>

<table class="responsive" id="translator-attribution">
  <tr>
    <th colspan="2"><h3>Translator attribution</h3></th>
  </tr>
  <tr>
    <td>Обязательный</td>
    <td>Настоятельно рекомендуется</td>
  </tr>
  <tr>
    <td>Применяется</td>
    <td>Ко всем переведенным markdown страницам</td>
  </tr>
  <tr>
    <td>Описание</td>
    <td>Предоставляет информацию о переводчике статьи.
    </td>
  </tr>
  <tr>
    <td>Пример</td>
    <td>
      <pre class="prettyprint html"><code>
Translated by:
{% include "web/_shared/contributors/petelepage.html" %}
      </code></pre>
    </td>
  </tr>
  <tr>
    <td>Примечание</td>
    <td>Информация о переводчике должна располагаться в конце страницы.</td>
  </tr>
</table>
