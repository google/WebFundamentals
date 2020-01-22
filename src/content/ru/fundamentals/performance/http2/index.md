project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: HTTP/2 (или h2) - это двоичный протокол, который обеспечивает передачу, мультиплексирование потоков и управление кадрами в web.

{# wf_updated_on: 2019-09-01 #} {# wf_published_on: 2016-09-29 #} {#
wf_blink_components: Blink>Network,Internals>Network>HTTP2 #}

# Введение в HTTP/2 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %} {% include
"web/_shared/contributors/surma.html" %}

Примечание. Следующее содержимое является выдержкой из [Высокопроизводительная
Браузерная Сеть](http://shop.oreilly.com/product/0636920028048.do) (О'Рейли,
Илья Григорик). Полную версию и связанный контент смотрите на
[hpbn.co](https://hpbn.co/) {: .external }.

HTTP/2 сделает наши приложения быстрее, проще и надежнее - редкая комбинация -
благодаря тому, что мы можем отменить многие из обходных путей HTTP / 1.1,
которые ранее делались в наших приложениях, и решить эти проблемы на
транспортном уровне. Более того, он также открывает ряд совершенно новых
возможностей для оптимизации наших приложений и повышения производительности!

Основными целями для HTTP/2 являются снижение задержки за счет обеспечения
полного мультиплексирования запросов и ответов, минимизации накладных расходов
протокола посредством эффективного сжатия полей заголовков HTTP и добавления
поддержки приоритизации запросов и отправки на сервер. Для реализации этих
требований существует большое число других улучшений протокола, таких как новые
механизмы управления потоками, обработки ошибок и обновления, но это наиболее
важные функции, которые каждый веб-разработчик должен понимать и использовать в
своих приложениях.

HTTP/2 никак не изменяет семантику приложения HTTP. Все основные понятия, такие
как методы HTTP, коды состояния, URI и поля заголовка, остаются на месте. Вместо
этого HTTP/2 изменяет способ форматирования (кадрирования) данных и их
транспортировки между клиентом и сервером, которые управляют всем процессом, и
скрывает всю сложность наших приложений в новом слое кадрирования. В результате
все существующие приложения могут быть доставлены без изменений.

*Почему не HTTP/1.2?*

Для достижения целей производительности, установленных рабочей группой HTTP, в
HTTP/2 вводится новый уровень двоичного кадрирования, который обратно не
совместим с предыдущими серверами и клиентами HTTP/1.x - отсюда и основной
прирост версии протокола до HTTP/2.

Тем не менее, если вы не реализуете веб-сервер (или пользовательский клиент),
работая с необработанными сокетами TCP, вы не увидите никакой разницы: все новое
низкоуровневое кадрирование выполняется клиентом и сервером от вашего имени.
Единственными заметными различиями будут улучшенная производительность и
доступность новых возможностей, таких как расстановка приоритетов запросов,
управление потоком и продвижение сервера.

## Краткая история SPDY и HTTP/2

SPDY был экспериментальным протоколом, разработанным в Google и анонсированным в
середине 2009 года, основной задачей которого было попытаться уменьшить задержку
загрузки веб-страниц путем устранения некоторых известных ограничений
производительности HTTP/1.1. В частности, намеченные цели проекта были
установлены следующим образом:

- Сокращение времени загрузки страницы (PLT) на 50%.
- Отсутствие необходимости каких-либо изменений содержания со стороны авторов
сайта.
- Минимизация сложности развертывания и избежание изменений в сетевой
инфраструктуре.
- Разработка этого нового протокола в партнерстве с open-source сообществом.
- Сбор реальных данных о производительности для проверки экспериментального
протокола.

Примечание. Чтобы добиться улучшения PLT на 50%, SPDY стремился более эффективно
использовать базовое TCP-соединение, вводя новый уровень двоичного кадрирования,
чтобы обеспечить мультиплексирование запросов и ответов, расстановку приоритетов
и сжатие заголовков; см. [Задержка, как узкое место в
производительности](https://hpbn.co/primer-on-web-performance/#latency-as-a-performance-bottleneck)
{: .external}.

Not long after the initial announcement, Mike Belshe and Roberto Peon, both
software engineers at Google, shared their first results, documentation, and
source code for the experimental implementation of the new SPDY protocol:

> So far we have only tested SPDY in lab conditions. The initial results are
> very encouraging: when we download the top 25 websites over simulated home
> network connections, we see a significant improvement in performance—pages
> loaded up to 55% faster.
> [*(Chromium Blog)*](https://blog.chromium.org/2009/11/2x-faster-web.html)

Fast-forward to 2012 and the new experimental protocol was supported in Chrome,
Firefox, and Opera, and a rapidly growing number of sites, both large (for
example,
Google, Twitter, Facebook) and small, were deploying SPDY within their
infrastructure. In effect, SPDY was on track to become a de facto standard
through growing industry adoption.

Наблюдая за этой тенденцией, Рабочая группа HTTP (HTTP-WG) извлекла уроки из
SPDY, собрала и улучшила его, а также предоставила официальный стандарт
«HTTP/2». Был составлен новый устав, был проведен открытый конкурс предложений
HTTP/2, и после большого обсуждения в рабочей группе спецификация SPDY была
принята в качестве отправной точки для нового протокола HTTP/2.

В течение следующих нескольких лет SPDY и HTTP/2 продолжали параллельно
развиваться, причем SPDY выступал в качестве экспериментальной ветви, которая
использовалась для тестирования новых функций и предложений по стандарту HTTP/2.
То, что хорошо выглядит на бумаге, может не сработать на практике, и наоборот, и
SPDY предложила маршрут для тестирования и оценки каждого предложения до его
включения в стандарт HTTP/2. В итоге этот процесс занял три года и привел к
созданию более десятка промежуточных проектов:

- Март 2012: запрос предложений для HTTP/2
- Ноябрь 2012: первый проект HTTP/2 (на основе SPDY)
- Август 2014: опубликованы черновик HTTP/2 и черновик HPACK-12
- Август 2014 года: последний звонок Рабочей группы по HTTP/2
- Февраль 2015: IESG утвердил черновики HTTP/2 и HPACK
- Май 2015: опубликованы RFC 7540 (HTTP/2) и RFC 7541 (HPACK)

В начале 2015 года IESG рассмотрела и одобрила новый стандарт HTTP/2 для
публикации. Вскоре после этого команда Google Chrome объявила о своем намерении
отказаться от расширений SPDY и NPN для TLS:

> Основные изменения HTTP/2 по сравнению с HTTP/1.1 направлены на повышение
производительности. Некоторые ключевые функции, такие как мультиплексирование,
сжатие заголовков, расстановка приоритетов и согласование протоколов, возникли в
результате работы, выполненной в ранее открытом, но нестандартном протоколе с
именем SPDY. Chrome поддерживает SPDY начиная с Chrome 6, но, поскольку
большинство преимуществ присутствует в HTTP/2, пришло время попрощаться. Мы
планируем отменить поддержку SPDY в начале 2016 года, а также одновременно
отменить поддержку расширения TLS с именем NPN в пользу ALPN в Chrome.
Разработчикам серверов настоятельно рекомендуется перейти на HTTP/2 и ALPN.
> Мы рады, что внесли свой вклад в процесс открытых стандартов, который привел к
созданию HTTP/2, и надеемся увидеть широкое распространение, учитывая широкое
участие отрасли в стандартизации и реализации. [*(Chromium
Blog)*](https://blog.chromium.org/2015/02/hello-http2-goodbye-spdy.html)

Совместная разработка SPDY и HTTP/2 позволила разработчикам серверов, браузеров
и сайтов получить реальный опыт работы с новым протоколом в процессе его
разработки. В результате стандарт HTTP/2 является одним из лучших и наиболее
тщательно протестированных стандартов. К тому времени, когда IESG утвердил
HTTP/2, было множество проверенных и готовых к внедрению клиентских и серверных
реализаций. Фактически, всего через несколько недель после утверждения
окончательного протокола многие пользователи уже воспользовались его
преимуществами, поскольку несколько популярных браузеров (и многие сайты)
развернули полную поддержку HTTP/2.

## Design and technical goals

Ранние версии протокола HTTP были специально разработаны для простоты
реализации: HTTP/0.9 был однострочным протоколом для начальной загрузки World
Wide Web; HTTP/1.0 документировал популярные расширения HTTP/0.9 в
информационном стандарте; HTTP/1.1 ввел официальный стандарт IETF; смотрите
[краткую историю HTTP](https://hpbn.co/brief-history-of-http/) {: .external}.
Таким образом, HTTP/0.9-1.x предоставил именно то, что намеревался сделать: HTTP
является одним из наиболее распространенных прикладных протоколов в Интернете.

К сожалению, простота реализации также привела к снижению производительности
приложений: клиентам HTTP/1.x необходимо использовать несколько соединений для
достижения параллелизма и уменьшения задержки; HTTP/1.x не сжимает заголовки
запроса и ответа, вызывая ненужный сетевой трафик; HTTP/1.x не позволяет
эффективно расставлять приоритеты ресурсов, что приводит к плохому использованию
основного TCP-соединения; и так далее.

Эти ограничения не были фатальными, но поскольку веб-приложения продолжали расти
в своих масштабах, сложности и важности в нашей повседневной жизни, они налагали
растущее бремя как на разработчиков, так и на пользователей Интернета, что
является именно тем разрывом, разрешить который и был разработан HTTP/2:

> HTTP/2 позволяет более эффективно использовать сетевые ресурсы и уменьшить
восприятие задержки, внедряя сжатие полей заголовка и позволяя несколько
одновременных обменов по одному и тому же соединению… В частности, это позволяет
чередовать сообщения запроса и ответа по одному и тому же соединению и
использует эффективное кодирование полей заголовка HTTP. Это также позволяет
назначать приоритеты запросам, позволяя более важным запросам выполняться
быстрее, что еще больше повышает производительность.
> Полученный протокол более дружественен для сети, поскольку можно использовать
меньше TCP-соединений по сравнению с HTTP/1.x. Это означает меньшую конкуренцию
с другими потоками и более долговечные соединения, что, в свою очередь, приводит
к лучшему использованию доступной емкости сети. Наконец, HTTP/2 также
обеспечивает более эффективную обработку сообщений за счет использования
двоичного фрейма сообщения. [*(Протокол передачи гипертекста, версия 2, проект
17)*](https://tools.ietf.org/html/draft-ietf-httpbis-http2-17)

Важно отметить, что HTTP/2 расширяет, а не заменяет предыдущие стандарты HTTP.
Семантика приложения HTTP одинакова, и не было внесено никаких изменений в
предлагаемую функциональность или основные понятия, такие как методы HTTP, коды
состояния, URI и поля заголовка. Эти изменения явно вышли за рамки возможностей
HTTP/2. Тем не менее, хотя высокоуровневый API остается неизменным, важно
понимать, как низкоуровневые изменения устраняют ограничения производительности
предыдущих протоколов. Давайте кратко рассмотрим бинарный слой кадрирования и
его особенности.

## Двоичный кадровый слой

В основе всех улучшений производительности HTTP/2 лежит новый уровень двоичного
кадрирования, который определяет, как HTTP-сообщения инкапсулируются и
передаются между клиентом и сервером.

![HTTP/2 binary framing layer](images/binary_framing_layer01.svg)

«Слой» относится к выбору проекта для введения нового оптимизированного
механизма кодирования между интерфейсом сокета и более высоким HTTP API,
предоставляемым нашим приложениям: семантика HTTP, такая как глаголы, методы и
заголовки, не затрагивается, но способ, которым они закодированы в то время как
в пути отличается. В отличие от открытого текста HTTP/1.x протокола с
разделителями новой строки, вся связь HTTP/2 разделена на меньшие сообщения и
кадры, каждое из которых кодируется в двоичном формате.

В результате и клиент, и сервер должны использовать новый механизм двоичного
кодирования, чтобы понимать друг друга: клиент HTTP/1.x не будет понимать сервер
только HTTP/2, и наоборот. К счастью, наши приложения блаженно не знают обо всех
этих изменениях, так как клиент и сервер выполняют всю необходимую работу по
созданию кадров от нашего имени.

## Streams, messages, and frames

Введение нового бинарного механизма кадрирования меняет способ обмена данными
между клиентом и сервером. Чтобы описать этот процесс, давайте ознакомимся с
терминологией HTTP/2:

- *Stream*: A bidirectional flow of bytes within an established connection,which
may carry one or more messages.
- *Message*: A complete sequence of frames that map to a logical request or
response message.
- *Кадр* : наименьшая единица связи в HTTP/2, каждая из которых содержит
заголовок кадра, который как минимум идентифицирует поток, которому принадлежит
кадр.

The relation of these terms can be summarized as follows:

- All communication is performed over a single TCP connection that can carry any
number ofbidirectional streams.
- Each stream has a unique identifier and optional priority information that is
used to carrybidirectional messages.
- Each message is a logical HTTP message, such as a request, or response, which
consists ofone or more frames.
- The frame is the smallest unit of communication that carries a specific type
of data—e.g.,HTTP headers, message payload, and so on. Frames from different
streams may be interleavedand then reassembled via the embedded stream
identifier in the header of each frame.

![HTTP/2 streams, messages, and frames](images/streams_messages_frames01.svg)

Короче говоря, HTTP/2 разбивает связь по протоколу HTTP на обмен
двоично-закодированными кадрами, которые затем сопоставляются с сообщениями,
которые принадлежат конкретному потоку, и все они мультиплексируются в одном
TCP-соединении. Это основа, которая обеспечивает все другие функции и
оптимизации производительности, предоставляемые протоколом HTTP/2.

## Request and response multiplexing

В HTTP/1.x, если клиент хочет сделать несколько параллельных запросов для
повышения производительности, необходимо использовать несколько соединений TCP
(см. [Использование нескольких соединений
TCP](https://hpbn.co/http1x/#using-multiple-tcp-connections) ). Такое поведение
является прямым следствием модели доставки HTTP/1.x, которая гарантирует, что за
один раз может быть доставлен только один ответ (очередь ответов) для каждого
соединения. Хуже того, это также приводит к блокировке заголовка строки и
неэффективному использованию основного TCP-соединения.

Новый уровень двоичного кадрирования в HTTP/2 устраняет эти ограничения и
обеспечивает полное мультиплексирование запросов и ответов, позволяя клиенту и
серверу разбивать HTTP-сообщение на независимые кадры, чередовать их, а затем
повторно собирать их на другом конце.

![HTTP/2 request and response multiplexing within a shared
connection](images/multiplexing01.svg)

The snapshot captures multiple streams in flight within the same connection. The
client is transmitting a `DATA` frame (stream 5) to the server, while the server
is transmitting an interleaved sequence of frames to the client for streams 1
and 3. As a result, there are three parallel streams in flight.

Возможность разбивать HTTP-сообщение на независимые кадры, чередовать их, а
затем повторно собирать их на другом конце - единственное наиболее важное
усовершенствование HTTP/2. Фактически, он дает волнообразный эффект от
многочисленных преимуществ производительности во всем стеке всех веб-технологий,
что позволяет нам:

- Чередовать несколько запросов параллельно, не блокируя ни один.
- Чередовать несколько ответов параллельно, не блокируя ни один.
- Использовать одно соединение для одновременной доставки нескольких запросов и
ответов.
- Удалить ненужные обходные пути HTTP/1.x (см. [Оптимизация для
HTTP/1.x](https://hpbn.co/optimizing-application-delivery/#optimizing-for-http1x),
например, связанные файлы, спрайты изображений и шардинг домена).
- Снизить время загрузки страницы, устраняя ненужные задержки и улучшая
использование доступной емкости сети.
- *And much more…*

Новый уровень двоичного кадрирования в HTTP/2 решает проблему блокировки
заголовка строки, обнаруженную в HTTP/1.x, и устраняет необходимость в
нескольких соединениях для обеспечения параллельной обработки и доставки
запросов и ответов. В результате это делает наши приложения быстрее, проще и
дешевле в развертывании.

## Stream prioritization

Как только HTTP-сообщение может быть разделено на множество отдельных кадров, и
мы допускаем мультиплексирование кадров из нескольких потоков, порядок, в
котором кадры чередуются и доставляются как клиентом, так и сервером, становится
критическим фактором производительности. Чтобы облегчить это, стандарт HTTP/2
позволяет каждому потоку иметь связанный вес и зависимость:

- Each stream may be assigned an integer weight between 1 and 256.
- Each stream may be given an explicit dependency on another stream.

The combination of stream dependencies and weights allows the client to
construct and communicate a "prioritization tree" that expresses how it would
prefer to receive responses. In turn, the server can use this information to
prioritize stream processing by controlling the allocation of CPU, memory, and
other resources, and once the response data is available, allocation of
bandwidth to ensure optimal delivery of high-priority responses to the client.

![HTTP/2 stream dependencies and weights](images/stream_prioritization01.svg)

Зависимость потока в HTTP/2 объявляется путем ссылки на уникальный идентификатор
другого потока в качестве его родителя; если идентификатор опущен, говорят, что
поток зависит от «корневого потока». Объявление потоковой зависимости означает,
что, если это возможно, родительскому потоку должны быть выделены ресурсы перед
его зависимостями. Другими словами: «Пожалуйста, обработайте и доставьте ответ D
до ответа C».

Streams that share the same parent (in other words, sibling streams) should be
allocated
resources in proportion to their weight. For example, if stream A has a weight
of 12 and its one sibling B has a weight of 4, then to determine the proportion
of the resources that each of these streams should receive:

1. Sum all the weights: `4 + 12 = 16`
2. Divide each stream weight by the total weight: `A = 12/16, B = 4/16`

Thus, stream A should receive three-quarters and stream B should receive one-
quarter of available resources; stream B should receive one-third of the
resources allocated to stream A. Let’s work through a few more hands-on examples
in the image above. From left to right:

1. Neither stream A nor B specifies a parent dependency and are said to be
dependenton the implicit "root stream"; A has a weight of 12, and B has a weight
of 4.Thus, based on proportional weights: stream B should receive one-third of
theresources allocated to stream A.
2. Stream D is dependent on the root stream; C is dependent on D. Thus, D
shouldreceive full allocation of resources ahead of C. The weights are
inconsequentialbecause C’s dependency communicates a stronger preference.
3. Stream D should receive full allocation of resources ahead of C; C should
receivefull allocation of resources ahead of A and B; stream B should receive
one-third ofthe resources allocated to stream A.
4. Stream D should receive full allocation of resources ahead of E and C; E and
Cshould receive equal allocation ahead of A and B; A and B should receive
proportionalallocation based on their weights.

Как показывают вышеприведенные примеры, комбинация потоковых зависимостей и
весов обеспечивает выразительный язык для определения приоритетов ресурсов, что
является критической функцией для повышения производительности просмотра, когда
у нас есть много типов ресурсов с различными зависимостями и весами. Более того,
протокол HTTP/2 также позволяет клиенту обновлять эти настройки в любой момент,
что обеспечивает дальнейшую оптимизацию в браузере. Другими словами, мы можем
изменять зависимости и перераспределять веса в ответ на взаимодействие с
пользователем и другие сигналы.

Note: Stream dependencies and weights express a transport preference, not a
requirement, and as such do not guarantee a particular processing or
transmission order. That is, the client cannot force the server to process the
stream in a particular order using stream prioritization. While this may seem
counterintuitive, it is in fact the desired behavior. We do not want to block
the server from making progress on a lower priority resource if a higher
priority resource is blocked.

## One connection per origin

Благодаря новому механизму двоичного кадрирования HTTP/2 больше не требует
нескольких TCP-соединений для параллельного мультиплексирования потоков; каждый
поток разбивается на множество кадров, которые могут чередоваться и
расставляться по приоритетам. В результате все соединения HTTP/2 являются
постоянными, и для каждого источника требуется только одно соединение, что дает
многочисленные преимущества в производительности.

> Как для SPDY, так и для HTTP/2, функцией-убийцей является произвольное
мультиплексирование в одном канале, контролируемом заторами. Меня поражает,
насколько это важно и насколько хорошо это работает. Одна большая метрика вокруг
того, что мне нравится, это доля созданных соединений, которые переносят только
одну HTTP-транзакцию (и, следовательно, делают эту транзакцию несущей все
накладные расходы). Для HTTP/1 74% наших активных соединений несут только одну
транзакцию - постоянные соединения не так полезны, как все мы хотим. Но в HTTP/2
это число падает до 25%. Это огромная победа для сокращения накладных расходов.
[*(HTTP/2 - Жить в Firefox, Патрик
МакМанус)*](http://bitsup.blogspot.co.uk/2015/02/http2-is-live-in-firefox.html)

Большинство передач HTTP короткие и импульсные, тогда как TCP оптимизирован для
длительных объемных передач данных. Повторно используя одно и то же соединение,
HTTP/2 может более эффективно использовать каждое TCP-соединение, а также
значительно снизить общие издержки протокола. Кроме того, использование меньшего
количества соединений уменьшает объем памяти и объем обработки по всему пути
соединения (другими словами, клиент, посредники и серверы происхождения). Это
снижает общие эксплуатационные расходы и улучшает использование сети и
пропускную способность. В результате переход на HTTP/2 должен не только
уменьшить задержку в сети, но и помочь повысить пропускную способность и снизить
эксплуатационные расходы.

Note: Reduced number of connections is a particularly important feature for
improving performance of HTTPS deployments: this translates to fewer expensive
TLS handshakes, better session reuse, and an overall reduction in required
client and server resources.

## Flow control

Flow control is a mechanism to prevent the sender from overwhelming the receiver
with data it may not want or be able to process: the receiver may be busy, under
heavy load, or may only be willing to allocate a fixed amount of resources for a
particular stream. For example, the client may have requested a large video
stream with high priority, but the user has paused the video and the client now
wants to pause or throttle its delivery from the server to avoid fetching and
buffering unnecessary data. Alternatively, a proxy server may have fast
downstream and slow upstream connections and similarly wants to regulate how
quickly the downstream delivers data to match the speed of upstream to control
its resource usage; and so on.

Напоминают ли вышеупомянутые требования об управлении потоком TCP? Они должны,
так как проблема фактически идентична (см. [Контроль
потока](https://hpbn.co/building-blocks-of-tcp/#flow-control) ). Однако
поскольку потоки HTTP/2 мультиплексируются в одном TCP-соединении, управление
потоками TCP не является достаточно детализированным и не обеспечивает
API-интерфейсы уровня приложения, необходимые для регулирования доставки
отдельных потоков. Для решения этой проблемы HTTP/2 предоставляет набор простых
строительных блоков, которые позволяют клиенту и серверу реализовывать свои
собственные средства управления потоками на уровне потоков и соединений:

- Flow control is directional. Each receiver may choose to set any window
sizethat it desires for each stream and the entire connection.
- Flow control is credit-based. Each receiver advertises its initial
connectionand stream flow control window (in bytes), which is reduced whenever
thesender emits a `DATA` frame and incremented via a `WINDOW_UPDATE` frame
sentby the receiver.
- Управление потоком невозможно отключить. Когда установлено соединение HTTP/2,
клиент и сервер обмениваются кадрами `SETTINGS`, которые устанавливают размеры
окна управления потоком в обоих направлениях. Значение по умолчанию окна
управления потоком установлено в 65 535 байт, но получатель может установить
большой максимальный размер окна ( `2^31-1` байт) и поддерживать его, отправляя
кадр `WINDOW_UPDATE` при получении любых данных.
- Flow control is hop-by-hop, not end-to-end. That is, an intermediary can use
itto control resource use and implement resource allocation mechanisms based
onown criteria and heuristics.

HTTP/2 не определяет какой-либо конкретный алгоритм для реализации управления
потоком. Вместо этого он предоставляет простые строительные блоки и переносит
реализацию на клиент и сервер, которые могут использовать его для реализации
пользовательских стратегий для регулирования использования и распределения
ресурсов, а также для реализации новых возможностей доставки, которые могут
помочь улучшить как реальную, так и воспринимаемую производительность. (см.
[Скорость, производительность и восприятие
человеком](https://hpbn.co/primer-on-web-performance/#speed-performance-and-human-perception)
) наших веб-приложений.

For example, application-layer flow control allows the browser to fetch only a
part of a particular resource, put the fetch on hold by reducing the stream flow
control window down to zero, and then resume it later. In other words, it allows
the browser to fetch a preview or first scan of an image, display it and allow
other high priority fetches to proceed, and resume the fetch once more critical
resources have finished loading.

## Server push

Еще одна мощная новая функция HTTP/2 - возможность сервера отправлять несколько
ответов на один клиентский запрос. То есть, в дополнение к ответу на исходный
запрос, сервер может отправить клиенту дополнительные ресурсы (рис. 12-5), при
этом клиенту не нужно явно запрашивать каждый из них.

![Server initiates new streams (promises) for push resources
](images/push01.svg)

Примечание: HTTP/2 отрывается от строгой семантики запроса-ответа и обеспечивает
рабочие процессы push-to-one-on-server, инициируемые сервером, которые открывают
мир новых возможностей взаимодействия как внутри, так и вне браузера. Это
полезная функция, которая будет иметь важные долгосрочные последствия как для
того, как мы думаем о протоколе, так и где и как он используется.

Why would we need such a mechanism in a browser? A typical web application
consists of dozens of resources, all of which are discovered by the client by
examining the document provided by the server. As a result, why not eliminate
the extra latency and let the server push the associated resources ahead of
time? The server already knows which resources the client will require; that’s
server push.

На самом деле, если вы когда-либо вставляли CSS, JavaScript или любой другой
ресурс через URI данных (см. [Раздел «Внедрение
ресурсов»](https://hpbn.co/http1x/#resource-inlining) ), то у вас уже есть
практический опыт работы с сервером. Внедряя ресурс в документ вручную, мы, по
сути, передаем этот ресурс клиенту, не дожидаясь, пока клиент запросит его. С
HTTP/2 мы можем достичь тех же результатов, но с дополнительными преимуществами
производительности. Push-ресурсы могут быть:

- Кэшируемые клиентом
- Повторно используемые на разных страницах
- Multiplexed alongside other resources
- Приоритезированы сервером
- Отклонены клиентом

### PUSH_PROMISE 101

Все push-потоки сервера инициируются через кадры `PUSH_PROMISE`, которые
сигнализируют о намерении сервера передать описанные ресурсы клиенту и должны
быть доставлены раньше данных ответа, которые запрашивают отправленные ресурсы.
Этот порядок доставки имеет решающее значение: клиент должен знать, какие
ресурсы сервер намерен использовать, чтобы избежать дублирования запросов для
этих ресурсов. Самая простая стратегия для удовлетворения этого требования -
отправить все кадры `PUSH_PROMISE` , которые содержат только заголовки HTTP
обещанного ресурса, перед ответом родителя (другими словами, кадрами `DATA` ).

Как только клиент получает кадр `PUSH_PROMISE` у него есть возможность отклонить
поток (через кадр `RST_STREAM` ), если он этого хочет. (Это может произойти,
например, потому что ресурс уже находится в кеше.) Это важное улучшение по
сравнению с HTTP/1.x. Напротив, использование встраивания ресурсов, которое
является популярной «оптимизацией» для HTTP/1.x, эквивалентно «принудительному
выталкиванию»: клиент не может отказаться, отменить его или обработать
встроенный ресурс индивидуально.

С HTTP/2 у клиента остается полный контроль над тем, как используется
push-запрос сервера. Клиент может ограничить количество одновременно
передаваемых потоков; настроить начальное окно управления потоком, чтобы
контролировать объем данных, передаваемых при первом открытии потока; или
полностью отключить принудительное использование сервера. Эти предпочтения
передаются через кадры `SETTINGS` в начале соединения HTTP/2 и могут быть
обновлены в любое время.

Each pushed resource is a stream that, unlike an inlined resource, allows it to
be individually multiplexed, prioritized, and processed by the client. The only
security restriction, as enforced by the browser, is that pushed resources must
obey the same-origin policy: the server must be authoritative for the provided
content.

## Header compression

Каждая HTTP передача содержит набор заголовков, которые описывают переданный
ресурс и его свойства. В HTTP/1.x эти метаданные всегда отправляются в виде
простого текста и добавляют от 500 до 800 байтов служебных данных на передачу, а
иногда и больше килобайт, если используются файлы cookie HTTP. (См. [Измерение и
управление](https://hpbn.co/http1x/#measuring-and-controlling-protocol-overhead)
издержками {a1}протокола{/a1} .) Чтобы уменьшить эти издержки и повысить
производительность, HTTP/2 сжимает метаданные заголовка запроса и ответа,
используя формат сжатия HPACK, который использует два простых, но мощных метода:

1. Позволяет кодировать передаваемые поля заголовка через статический код
Хаффмана, что уменьшает их индивидуальный размер передачи.
2. Требует, чтобы и клиент, и сервер поддерживали и обновляли индексированный
список ранее просматриваемых полей заголовка (другими словами, он устанавливает
общий контекст сжатия), который затем используется в качестве ссылки для
эффективного кодирования ранее переданных значений.

Huffman coding allows the individual values to be compressed when transferred,
and the indexed list of previously transferred values allows us to encode
duplicate values by transferring index values that can be used to efficiently
look up and reconstruct the full header keys and values.

![HPACK: Header Compression for HTTP/2](images/header_compression01.svg)

As one further optimization, the HPACK compression context consists of a static
and dynamic table: the static table is defined in the specification and
provides a list of common HTTP header fields that all connections are likely to
use (e.g., valid header names); the dynamic table is initially empty and is
updated based on exchanged values within a particular connection. As a result,
the size of each request is reduced by using static Huffman coding for values
that haven’t been seen before, and substitution of indexes for values that are
already present in the static or dynamic tables on each side.

Примечание. Определения полей заголовка запроса и ответа в HTTP/2 остаются
неизменными, за исключением нескольких незначительных исключений: все имена
полей заголовка строчные, а строка запроса теперь разделена на отдельные поля
псевдо-заголовка `:method` `:scheme` `:authority` и `:path`.

### Security and performance of HPACK

Ранние версии HTTP/2 и SPDY использовали zlib со специальным словарем для сжатия
всех заголовков HTTP. Это позволило сократить размер передаваемых данных
заголовка на 85-88% и значительно сократить время загрузки страницы:

> На канале DSL с низкой пропускной способностью, в котором ссылка на загрузку
составляет всего 375 Кбит/с, сжатие заголовка запроса, в частности, привело к
значительному увеличению времени загрузки страницы для определенных сайтов
(иными словами, для тех, которые отправляли большое количество запросов
ресурсов). Мы обнаружили сокращение времени загрузки страницы на 45–1142 мс
просто из-за сжатия заголовка. [*(Техническая статья SPDY,
chromium.org)*](https://www.chromium.org/spdy/spdy-whitepaper)

However, in the summer of 2012, a "CRIME" security attack was published against
TLS and SPDY compression algorithms, which could result in session hijacking. As
a result, the zlib compression algorithm was replaced by HPACK, which was
specifically designed to: address the discovered security issues, be efficient
and simple to implement correctly, and of course, enable good compression of
HTTP header metadata.

For full details of the HPACK compression algorithm, see
[IETF HPACK - Header Compression for
HTTP/2](https://tools.ietf.org/html/draft-ietf-httpbis-header-compression).

## Further reading:

- [“HTTP/2”](https://hpbn.co/http2/){: .external }– The full article by Ilya
Grigorik
- [«Настройка HTTP / 2»](https://dassur.ma/things/h2setup/) {: .external } - Как
настроить HTTP/2 в разных бэкэндах от Surma
- [«HTTP/2 здесь, давайте
оптимизировать!»](https://docs.google.com/presentation/d/1r7QXGYOLCh4fcUq0jDdDwKJWNqWK1o4xMtYpKZCJYjM/edit#slide=id.p19)
- презентация Ильи Григорика из Velocity 2015
- [«Полезные правила для HTTP/2
Push»](https://docs.google.com/document/d/1K0NykTXBbbbTlv60t5MyJvXjqKGsCVNYHyLEXIxYMv0/edit)
- анализ Тома Бергана, Саймона Пелчата и Майкла Бюттнера о том, когда и как
использовать push.

## Feedback {: #feedback }

{% include "web/_shared/helpful.html" %}
