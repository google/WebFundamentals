project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
page_type: landing

{# wf_updated_on: 2017-09-10 #}
{# wf_published_on: 2016-09-27 #}

<style>
  .wf-hot {padding-top: 0 !important;}
  .nope {display:none;}
  .wf-hero ul,
  .devsite-landing-row-item-description-content ul {list-style: none; padding-left: 0}
  .wf-hero > p {font-size: 2em; line-height: 1.2em; margin-top: 0}
</style>

<div class="wf-hero">
  <p>Потрясающий пользовательский опыт в вебе основывается на четырех столпах:</p>
  <img src="/web/images/hero-2x.png" class="attempt-right">
  <ul>
    <li><span class="compare-yes"></span> <b><a href="#fast">Скорость</a></b> - Сайт быстро реагирует на действия 
    пользователей, анимированные объескты не тормозят, а страница не дергается при прокрутке.</li>
    <li><span class="compare-yes"></span> <b><a href="#integrated">Интегрированность</a></b> - Пользователю не приходится 
        излишне полагаться браузер, сайт использует все возможности устройства и обеспечивает максимально привычный на нем 
        опыт.</li>
    <li><span class="compare-yes"></span> <b><a href="#reliable">Надежность</a></b> - Контент загружается мгновенно 
        и без ошибок, вместо него никогда не отображается downasaur, даже когда условия в сети ненадежны.</li>
    <li><span class="compare-yes"></span> <b><a href="#engaging">Вовлеченность</a></b> - Подталкивает пользователя 
       возвращаться в приложение при помощи продуманных и воспринимающихся естесственно механизмов.</li>
  </ul>
</div>

<h2 class="nope">Потрясающий веб состоит из:</h2>

<section class="devsite-landing-row devsite-landing-row-2-up devsite-landing-row-cards">
  <div class="devsite-landing-row-group">
    <div class="devsite-landing-row-item" id="fast">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-f-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Скорость</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Пользователи не ждут, что страница будет дёргаться при прокрутке или грузиться медленно. Ускорение сайта 
            начинается с понимания того, <a href="performance/rail">как RAIL влияет на производительность</a>
            сайта, и как использовать эту структуру для измерения и улучшения производительности. 
          </p>
          <ul>
            <li><span class="compare-yes"></span> <a href="performance/critical-rendering-path/">Процесс рендеринга</a></li>
            <li><span class="compare-yes"></span> <a href="performance/rendering/">Производительность рендеринга</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="devsite-landing-row-item" id="integrated">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-i-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Интегрированность</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Действия на веб-странцице должны вызывать ощущение полной интеграции с устройством. Пользователь должен не
            полагаться на браузер, а продолжать взаимодействовать с сайтом, как с любым приложением на устройстве.
          </p>
          <ul>
            <li><span class="compare-yes"></span> Получите <a href="app-install-banners/">место на домашнем экране пользователя</a>.</li>
            <li><span class="compare-yes"></span> Упростите платежи с <a href="payments/">Payment Request API</a>.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="devsite-landing-row devsite-landing-row-2-up devsite-landing-row-cards">
  <div class="devsite-landing-row-group">
    <div class="devsite-landing-row-item" id="reliable">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-r-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Надежность</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Пользователи не ожидают, что веб-сайт будет работать без подключения к сети, и часто даже не пытаются 
            открыть сайт в медленной или нестабильной сети.
            <i>Нам нужно изменить это восприятие</i>. Веб <b>должен</b> быть надежным.
          </p>
          <ul>
            <li><span class="compare-yes"></span> Используйте <a href="instant-and-offline/offline-cookbook/">Offline Cookbook</a> для повышения надежности.</li>
            <li><span class="compare-yes"></span> Что нужно учитывать при <a href="instant-and-offline/offline-ux">проектировании для медленных или нестабильных сетей?</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="devsite-landing-row-item" id="engaging">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-e-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Вовлеченность</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Вовлекающее приложение не просто обеспечивает функциональность, но и гарантирует, что весь интерфейс 
            привлекателен и помогает пользователю совершать желаемые действия. При помощи такого функционала как Web Push
            пользователя можно всегда держать в курсе событий. Вовлекающий сайт элегантно  использует нужный функционал 
            в нужное время.
          </p>
          <ul>
            <li><span class="compare-yes"></span> Используйте <a href="push-notifications/">Web Push и уведомления</a> для взаимодействия с пользователем.</li>
            <li><span class="compare-yes"></span> Проектирование <a href="design-and-ux/ux-basics/">элегантных пользовательских интерфейсов</a>.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</section>

## Что нового?

{% include "web/_shared/latest_show.html" %}

{% include "web/_shared/latest_articles.html" %}


## Горячие темы?

<section class="wf-hot devsite-landing-row devsite-landing-row-3-up devsite-landing-row-cards">
  <div class="devsite-landing-row-group">
    <div class="devsite-landing-row-item" id="fast">
      <figure class="devsite-landing-row-item-image">
        <img src="images/web-comp.png">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3><a href="web-components/">Веб-компоненты</a></h3>
        <div class="devsite-landing-row-item-description-content">
          Веб-компоненты – это новый набор стандартов, позволяющих создавать собственные HTML элементы.
          Их можно использовать для создания чего угодно: от простых UI элементов до целых приложений.
        </div>
        <div class="devsite-landing-row-item-buttons">
          <a href="web-components/" class="button button-white">Узнать больше</a>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="devsite-landing-row-item" id="integrated">
      <figure class="devsite-landing-row-item-image">
        <img src="images/pay-req.png">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3><a href="payments/">Payment Request API</a></h3>
        <div class="devsite-landing-row-item-description-content">
          Payment Request API – кандидат в стандарты W3C предназначенный для устранения кассовых форм. 
          Он улучшает процесс оплаты, предоставляет более однородный пользовательский интерфейс и 
          позволяет легко использовать различные способы оплаты.
        </div>
        <div class="devsite-landing-row-item-buttons">
          <a href="payments/" class="button button-white">Узнать больше</a>
        </div>
      </div>
    </div>
    <!-- -->
    <div class="devsite-landing-row-item" id="fast">
      <figure class="devsite-landing-row-item-image">
        <img src="images/cred-mgt.png">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3><a href="/web/fundamentals/security/credential-management/">Credential Management API</a></h3>
        <div class="devsite-landing-row-item-description-content">
          Credential Management API – основанный на стандартах браузерный API, обеспечивающий
           программный интерфейс между сайтом и браузером для беспрепятственной авторизации на любых устройствах.
        </div>
        <div class="devsite-landing-row-item-buttons">
          <a href="/web/fundamentals/security/credential-management/" class="button button-white">Узнать больше</a>
        </div>
      </div>
    </div>
  </div>
</section>
