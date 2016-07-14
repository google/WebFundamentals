---
description: "網頁基礎提供你多設備網頁開發的綜合資源。"
title: 網頁基礎
updated_on: 2016-05-14
translators:
 - henrylim
---

<div class="wf-subheading wf-fundamentals-landing">
  <div class="page-content">
    {% include svgs/fundamentals.svg %}
    <p class="mdl-typography--font-thin">

      網頁<b>基礎</b> 提供你網頁開發最佳實踐, 能幫助你的網絡項目添加正確的功能，讓用戶有更好的體驗。
      若你是網絡開發新手或是想讓你的網頁變得更好, 這裏包含了全部你所需要的。
    </p>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content mdl-grid wf-fundamentals-cta">

  {% include shared/base_card.liquid text="什麽是<b>Progressive Web App</b>？你必須知道什麽才能開始建立Progressive Web App呢？ 在這個指南引導，你將會建立你自己的Progressive Web App以及學到建立Progressive Web App的基礎。" linkHref="/web/fundamentals/getting-started/your-first-progressive-web-app/" linkText="開始" imgUrl="/web/fundamentals/imgs/vm-pwa.png" %}

  {% include shared/base_card.liquid text="學習如何將<b>推送通知</b>加進你的web應用程序，並利用新內容的最新新聞和信息來吸引更多用戶。" linkHref="/web/fundamentals/getting-started/push-notifications/" linkText="更多" imgUrl="/web/fundamentals/imgs/notif-example.png" %}

</div>

<div class="wf-secondaryheading">
  <div class="page-content">
    <h3>準備，預備，編碼!</h3>
    <p>
      心中已經有了主意了嗎？讓我們開始吧!
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
