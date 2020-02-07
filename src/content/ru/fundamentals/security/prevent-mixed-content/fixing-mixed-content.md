project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Поиск и исправление смешанного контента - важная задача, но она может занимать много времени. В этом руководстве обсуждаются некоторые инструменты, которые могут помочь с процессом.

{# wf_published_on: 2015-09-28 #}
{# wf_updated_on: 2019-12-10 #}
{# wf_blink_components: Blink>SecurityFeature #}

# Предотвращение смешанного содержимого {: .page-title }

{% include "web/_shared/contributors/johyphenel.html" %}

Success: Supporting HTTPS for your website is an important step to protecting
your site and your users from attack, but mixed content can render that
protection useless. To protect your site and your users, it is very important to
find and fix mixed content issues.

Поиск и исправление смешанного контента - важная задача, но она может занимать
много времени. В этом руководстве обсуждаются некоторые инструменты и методы,
которые могут помочь в этом процессе. Для получения дополнительной информации о
самом смешанном контенте см. [Что такое смешанный
контент](./what-is-mixed-content) .

### TL; DR {: .hide-from-toc }

- Всегда используйте https: // URL при загрузке ресурсов на вашей странице.
- Используйте заголовок `Content-Security-Policy-Report-Only` для мониторинга
ошибок смешанного содержимого на вашем сайте.
- Используйте директиву CSP `upgrade-insecure-requests` reports для защиты ваших
посетителей от небезопасного контента.

## Найти и исправить смешанный контент

Поиск смешанного контента вручную может занять много времени, в зависимости от
количества проблем. Процесс, описанный в этом документе, использует браузер
Chrome; однако большинство современных браузеров предоставляют подобные
инструменты, чтобы помочь с этим процессом.

### Finding mixed content by visiting your site

При посещении страницы HTTPS в Google Chrome браузер предупреждает вас о
смешанном контенте в виде ошибок и предупреждений в консоли JavaScript.

To view these alerts, go to our passive mixed content or active mixed content
sample page and open the Chrome JavaScript console. You can open the console
either from the View menu: *View* -> *Developer* -> *JavaScript Console*, or by
right-clicking the page, selecting *Inspect Element*, and then selecting
*Console*.

The [passive mixed content
example](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){:
.external} on the [What Is Mixed
Content](what-is-mixed-content#passive-mixed-content){: .external} page causes
mixed content warnings to be displayed, like the ones below:

<figure>
<img src="imgs/passive-mixed-content-warnings.png" alt="Mixed Content: The
page was loaded over HTTPS, but requested an insecure video. This content should
also be served over HTTPS.">
</figure>
[Try
it](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/passive-mixed-content.html){:
target="_blank" .external }
While the active mixed content example causes mixed content errors to be
displayed:
<figure>
<img src="imgs/active-mixed-content-errors.png" alt="Mixed Content: The page
was loaded over HTTPS, but requested an insecure resource. This request has been
blocked; the content must be served over HTTPS.">
</figure>
[Try
it](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/active-mixed-content.html){:
target="_blank" .external }
You need to fix the http:// URLs listed in these errors and warnings, in your
site's source. It's helpful to make a list of these URLs, along with the page
you found them on, for use when you fix them.
Note: Mixed content errors and warnings are only shown for the page you are
currently viewing, and the JavaScript console is cleared every time you navigate
to a new  page. This means you will have to view every page of your site
individually to find these errors. Some errors may only show up after you
interact with part of the page, see the image gallery mixed content example from
our previous guide.
### Finding mixed content in your source code
You can search for mixed content directly in your source code. Search for
`http://` in your source and look for tags that include HTTP URL attributes.
Specifically, look for tags listed in the [mixed content types & security
threats
associated](what-is-mixed-content#mixed-content-types--security-threats-associated){:
.external} section of our previous guide.
Note that having `http://` in the `href` attribute of anchor tags (`<a>`)
is often not a mixed content issue, with some notable exceptions discussed
later.
If you have a list of HTTP URLs from Chrome mixed content errors and warnings,
you can also search for these complete URLs in your source to find where they
are included in your site.
### Fixing mixed content
Once you've found where the mixed content is included in your site's source,
follow these steps to fix it.
Using the following mixed content error in Chrome as an example:
<figure>
<img src="imgs/image-gallery-warning.png" alt="Mixed Content: The page was
loaded over HTTPS, but requested an insecure image. This content should also be
served over HTTPS.">
</figure>
Which you found in source here:
    <img src="http://googlesamples.github.io/web-fundamentals/.../puppy.jpg">
#### Step 1
Check that the URL is available over HTTPS by opening a new tab in
your browser, entering the URL in the address bar, and changing `http://` to
`https://`.
If the resource displayed is the same over **HTTP** and **HTTPS**, everything is
OK.
Proceed to [Step 2](#step-2).
<div class="attempt-left">
  <figure>
    <img src="imgs/puppy-http.png">
    <figcaption class="success">
      HTTP image loads without error.
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="imgs/puppy-https.png">
    <figcaption class="success">
HTTPS image loads without error, and image is the same as HTTP. Go to <a
href="#step-2">step 2</a>!
     </figcaption>
  </figure>
</div>
</a>

[Попробуй
это](https://googlesamples.github.io/web-fundamentals/fundamentals/security/prevent-mixed-content/image-gallery-example.html)
{: target="_blank" .external }

In the code above, it may seem safe to leave the `<a>` tag's `href` as
`http://`;
however if you view the sample and click the image, you'll see that it loads
a mixed content resource and displays it on the page.

## Handle mixed content at scale

Шаги, описанные выше, хорошо подходят для небольших сайтов; но для крупных
веб-сайтов или сайтов с множеством отдельных групп разработчиков может быть
сложно отслеживать весь загружаемый контент. Чтобы справиться с этой задачей, вы
можете использовать политику безопасности содержимого, чтобы дать браузеру
указание уведомлять вас о смешанном содержимом и гарантировать, что ваши
страницы никогда не будут неожиданно загружать небезопасные ресурсы.

### Политика безопасности контента

[**Content security policy**](/web/fundamentals/security/csp/) (CSP) is a
multi-purpose browser feature that you can use to manage mixed content at
scale. The CSP reporting mechanism can be used to track the mixed content on
your site; and the enforcement policy, to protect users by upgrading or
blocking mixed content.

Вы можете включить эти функции для страницы, включив заголовок
`Content-Security-Policy` или `Content-Security-Policy-Report-Only` в ответ,
отправленный с вашего сервера. Кроме того, вы можете установить
`Content-Security-Policy` (но **не** `Content-Security-Policy-Report-Only` ),
используя `<meta>` в разделе `<head>` вашей страницы. Смотрите примеры в
следующих разделах.

CSP is useful for many things outside of its mixed content uses. Information
about other CSP directives is available at the following resources:

- [Mozilla's intro to
CSP](https://developer.mozilla.org/en-US/docs/Web/Security/CSP/Introducing_Content_Security_Policy){:
.external}
- [HTML5 Rocks' intro to
CSP](//www.html5rocks.com/en/tutorials/security/content-security-policy/){:
.external}
- [CSP playground](http://www.cspplayground.com/){: .external }
- [CSP spec](//www.w3.org/TR/CSP/){: .external }

Note: Browsers enforce <b>all</b> content security policies that they receive.
Multiple CSP header values received by the browser in the response header or
<code><meta></code> elements are combined and enforced as a single policy;
reporting policies are likewise combined. Policies are combined by taking the
intersection of the policies; that is to say, each policy after the first can
only further restrict the allowed content, not broaden it.

### Поиск смешанного контента с политикой безопасности контента

Вы можете использовать политику безопасности контента для сбора отчетов о
смешанном контенте на вашем сайте. Чтобы включить эту функцию, установите
директиву `Content-Security-Policy-Report-Only` , добавив ее в качестве
заголовка ответа для вашего сайта.

Заголовок ответа:

```
Content-Security-Policy-Report-Only: default-src https: 'unsafe-inline' 'unsafe-eval'; report-uri https://example.com/reportingEndpoint
```

Whenever a user visits a page on your site, their browser sends JSON-formatted
reports regarding anything that violates the content security policy to
`https://example.com/reportingEndpoint`. In this case, anytime a
subresource is loaded over HTTP, a report is sent. These reports include the
page URL where the policy violation occurred and the subresource URL that
violated the policy. If you configure your reporting endpoint to log these
reports, you can  track the mixed content on your site without visiting each
page yourself.

The two caveats to this are:

- Пользователи должны посетить вашу страницу в браузере, который понимает
заголовок CSP. Это верно для большинства современных браузеров.
- Вы получаете отчеты только для страниц, посещенных вашими пользователями. Так
что если у вас есть страницы, которые не получают много трафика, может пройти
некоторое время, прежде чем вы получите отчеты по всему сайту.

For more information on CSP header format, see the [Content Security Policy
specification](https://w3c.github.io/webappsec/specs/content-security-policy/#violation-reports){:
.external}.

If you don't want to configure a reporting endpoint yourself,
[https://report-uri.io/](https://report-uri.io/){: .external} is a reasonable
alternative.

### Обновление небезопасных запросов

Одним из новейших и лучших инструментов для автоматического исправления
смешанного контента является директива CSP
[**`upgrade-insecure-requests`**](//www.w3.org/TR/upgrade-insecure-requests/) {:
.external}. Эта директива указывает браузеру обновить небезопасные URL-адреса
перед выполнением сетевых запросов.

Например, если страница содержит тег изображения с URL-адресом HTTP:

```
<img src="http://example.com/image.jpg">
```

The browser instead makes a secure request for
<code><b>https:</b>//example.com/image.jpg</code>, thus saving the user from
mixed
content.

Вы можете включить это поведение, отправив заголовок `Content-Security-Policy` с
этой директивой:

```
Content-Security-Policy: upgrade-insecure-requests
```

Или путем встраивания той же самой директивы inline в раздел `<head>` документа
с использованием элемента `<meta>` :

```
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
```

Стоит отметить, что если ресурс недоступен по HTTPS, обновленный запрос
завершается неудачно и ресурс не загружается. Это поддерживает безопасность
вашей страницы.

Директива `upgrade-insecure-requests` каскадно переходит в документы `<iframe>`
, обеспечивая защиту всей страницы.

### Блокировка всего смешанного контента

Not all browsers support the `upgrade-insecure-requests` directive, so an
alternative for protecting users is the
[**`block-all-mixed-content`**](http://www.w3.org/TR/mixed-content/#strict-checking){:
.external}
CSP directive. This directive instructs the browser to never load mixed content;
all mixed content resource requests are blocked, including both active and
passive mixed content. This option also cascades into `<iframe>` documents,
ensuring the entire page is mixed content free.

Страница может присоединиться к этому поведению, отправив заголовок
`Content-Security-Policy` с этой директивой:

```
Content-Security-Policy: block-all-mixed-content
```

Или путем встраивания той же самой директивы inline в раздел `<head>` документа
с использованием элемента `<meta>` :

```
<meta http-equiv="Content-Security-Policy" content="block-all-mixed-content">
```

The downside of using `block-all-mixed-content` is, perhaps obviously, that all
content is blocked. This is a security improvement, but it means that these
resources are no longer available on the page. This might break features and
content that your users expect to be available.

### Альтернативы CSP

If your site is hosted for you by a platform such as Blogger, you may not have
access to modify headers & add a CSP.
Instead, a viable alternative could be to use a website crawler to find issues
across your site for you, such as
[HTTPSChecker](https://httpschecker.net/how-it-works#httpsChecker){: .external }
or
[Mixed Content Scan](https://github.com/bramus/mixed-content-scan){: .external
}.

## Обратная связь {: #feedback }

{% include "web/_shared/helpful.html" %}
