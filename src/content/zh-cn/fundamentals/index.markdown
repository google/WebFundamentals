---
description: "网页基础提供你多设备网页开发的综合资源。"
title: 网页基础
updated_on: 2016-05-14
translators:
 - henrylim
---

<div class="wf-subheading wf-fundamentals-landing">
  <div class="page-content">
    {% include svgs/fundamentals.svg %}
    <p class="mdl-typography--font-thin">

      网页<b>基础</b> 提供你网页开发最佳实践, 能帮助你的网络项目添加正确的功能，让用户有更好的体验。
      若你是网络开发新手或是想让你的网页变得更好, 这里包含了全部你所需要的。
    </p>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content mdl-grid wf-fundamentals-cta">

  {% include shared/base_card.liquid text="什么是<b>Progressive Web App</b>？你必须知道什么才能开始建立Progressive Web App呢？ 在这个指南引导，你将会建立你自己的Progressive Web App以及学到建立Progressive Web App的基础。" linkHref="/web/fundamentals/getting-started/your-first-progressive-web-app/" linkText="开始" imgUrl="/web/fundamentals/imgs/vm-pwa.png" %}

  {% include shared/base_card.liquid text="学习如何将<b>推送通知</b>加进你的web应用程序，并利用新内容的最新新闻和信息来吸引更多用户。" linkHref="/web/fundamentals/getting-started/push-notifications/" linkText="更多" imgUrl="/web/fundamentals/imgs/notif-example.png" %}

</div>

<div class="wf-secondaryheading">
  <div class="page-content">
    <h3>准备，预备，编码!</h3>
    <p>
      心中已经有了主意了吗？让我们开始吧!
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
