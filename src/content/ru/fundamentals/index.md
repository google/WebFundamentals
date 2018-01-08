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
  <p>Суть основ восхитительного web'a это...</p>
  <img src="/web/images/hero-2x.png" class="attempt-right">
  <ul>
    <li><span class="compare-yes"></span> <b><a href="#fast">Быстрота</a></b> - Он быстро реагирует на действия 
    пользователей с шелковистой плавной анимацией и без дерганной прокрутки.</li>
    <li><span class="compare-yes"></span> <b><a href="#integrated">Интеграция</a></b> - Пользователь не обязан 
        видеть и использовать браузер, он использует все возможности устройства, чтобы пользоваться интерфейсом, 
         соответствующим устройству.</li>
    <li><span class="compare-yes"></span> <b><a href="#reliable">Надежность</a></b> - Загружает контент мгновенно 
        и надежно, никогда не показывает downasaur, даже при неопределённой сети.</li>
    <li><span class="compare-yes"></span> <b><a href="#engaging">Привлекательность</a></b> - Заставляет пользователя 
       вернуться в приложение с красиво спроектированным интерфейсом, который выглядит и ощущается естесственно.</li>
  </ul>
</div>

<h2 class="nope">Восхитительный web это...</h2>

<section class="devsite-landing-row devsite-landing-row-2-up devsite-landing-row-cards">
  <div class="devsite-landing-row-group">
    <div class="devsite-landing-row-item" id="fast">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-f-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Быстрота</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Пользователи не ожидают дёрганой прокрутки или медленной загрузки. Процесс убыстрения вашего сайта 
            начинается с понимания того <a href="performance/rail">как RAIL влияет на производительность</a> вашего
            сайта как использовать это для измерения и улучшения вашей производительности. 
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
        <h3>Интеграция</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Пользователь должен чувствовать web как часть устройства; должно быть ощущение, что взаимодействие 
            происходит с устройством, а не с окном браузера.
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
            Пользователи не ожидают, что web работает без соединения с сетью, и часто даже не пытаются, если
             это медленное или нестабильное соединение.
            <i>Нам нужно изменить такое восприятие</i>. Web <b>должен</b> быть надежным.
          </p>
          <ul>
            <li><span class="compare-yes"></span> Используйте <a href="instant-and-offline/offline-cookbook/">Offline Cookbook</a> для повышения надежности.</li>
            <li><span class="compare-yes"></span> Что вы должны учитывать, когда <a href="instant-and-offline/offline-ux">проектируете для медленных или нестабильных сетей?</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="devsite-landing-row-item" id="engaging">
      <figure class="devsite-landing-row-item-image">
        <img src="/web/images/pwa-e-16x9.gif">
      </figure>
      <div class="devsite-landing-row-item-description">
        <h3>Привлекательность</h3>
        <div class="devsite-landing-row-item-description-content">
          <p>
            Привлекательное приложение выходит за рамки функциональности, но гарантирует, что весь интерфейс восхитительно
            помогает пользователю делать то, что ему нужно делать. Используя такие функции как Web Push, он всегда остается 
            в курсе событий, а Notifications информируют пользователей. Он использует правильные возможности, 
            в нужное время, красивым способом.
          </p>
          <ul>
            <li><span class="compare-yes"></span> Используйте <a href="push-notifications/">Web Push &amp; Notifications</a> для взаимодействия с пользователем.</li>
            <li><span class="compare-yes"></span> Проектирование <a href="design-and-ux/ux-basics/">прекрасных пользовательских интерфейсов</a>.</li>
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
        <h3><a href="web-components/">Web Компоненты</a></h3>
        <div class="devsite-landing-row-item-description-content">
          Web Компоненты это новый набор стандартов, которые позволяют вам создавать ваши собтвенные HTML элементы.
           Вы можете использовать их для того, чтобы построить что угодно, от простых UI элементов, до целых приложений.
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
          Payment Request API это кандидат в стандарты W3C предназначенный для устранения кассовых форм. 
          Он улучшает процесс оплаты, предоставляет более однородный пользовательский интерфейс и 
          позволяет вам легко использовать различные способы оплаты.
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
        <h3><a href="/web/fundamentals/security/credential-management/">API Учетных данных</a></h3>
        <div class="devsite-landing-row-item-description-content">
          API Учетных данных это основанный на стандартах браузерный API, который предоставляет
           программный интерфейс между сайтом и браузером для беспрепятственной авторизации между устройствами.
        </div>
        <div class="devsite-landing-row-item-buttons">
          <a href="/web/fundamentals/security/credential-management/" class="button button-white">Узнать больше</a>
        </div>
      </div>
    </div>
  </div>
</section>
