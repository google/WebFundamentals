---
description: "Dasar-Dasar Web (Web Fundamentals) adalah sumber daya komprehensif untuk pengembangan web multi-perangkat."
title: Dasar-Dasar Web (Web Fundamentals)
---

<div class="wf-subheading wf-fundamentals-landing">
  <div class="page-content">
    {% include svgs/fundamentals.svg %}
    <p class="mdl-typography--font-thin">

      Dasar-Dasar Web (<b>WebFundamentals</b>) adalah sumber komprehensif untuk
      pengembangan web, dirancang untuk membantu Anda menambahkan fitur yang tepat
      untuk proyek web Anda. Jika Anda masih baru dalam pengembangan web
      atau sedang berusaha untuk membuat proyek Anda lebih baik, kami bisa membantu Anda.
    </p>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content mdl-grid wf-fundamentals-cta">

  {% include shared/base_card.liquid text="Apakah <b>Progressive Web App</b> dan apa yang Anda perlu ketahui untuk mulai membuatnya? Dalam panduan langkah-demi-langkah ini, Anda akan membuat Progressive Web App Anda sendiri dan mempelajari dasar-dasar yang diperlukan untuk membangun Progressive Web App." linkHref="/web/fundamentals/getting-started/your-first-progressive-web-app/" linkText="Mulai" imgUrl="/web/fundamentals/imgs/vm-pwa.png" %}

  {% include shared/base_card.liquid text="Belajar bagaimana menambahkan <b>Push Notification</b> untuk aplikasi web Anda untuk mengajak pengguna dengan berita-berita terbaru dan informasi tentang konten baru." linkHref="/web/fundamentals/engage-and-retain/push-notifications/" linkText="Belajar lagi" imgUrl="/web/fundamentals/imgs/notif-example.png" %}

</div>

<div class="wf-secondaryheading">
  <div class="page-content">
    <h3>Sedia, Siap, Koding!</h3>
    <p>
      Telah memiliki sesuatu dalam pikiran? Buruan masuk!
    </p>
    <div class="mdl-grid mdl-typography--text-center wf-fundamentals-areas">
      {% for pageInSection in page.context.subdirectories %}
      {% if pageInSection.index.published != false %}
      {% if pageInSection.id != 'getting-started' and pageInSection.id != 'primers' %}
      {% capture icon %}svgs/{{pageInSection.id}}.svg{% endcapture %}
        <div class="mdl-cell mdl-cell--4-col">
          <div class="icon">
            <a href="{{pageInSection.index.canonical_url }}">
              {% include {{icon}} %}
            </a>
          </div>
          <h3>
            <a href="{{pageInSection.index.canonical_url }}">
            {{pageInSection.index.title}}
            </a>
          </h3>
          <p>{{pageInSection.index.description}}</p>
        </div>
      {% endif %}
      {% endif %}
      {% endfor %}
    </div>
  </div>
</div>
