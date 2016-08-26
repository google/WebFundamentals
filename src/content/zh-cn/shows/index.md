project_path: /web/_project.yaml
book_path: /web/shows/_book.yaml

{# wf_review_required #}
{# wf_published_on: 2015-02-23 #}

# 节目 {: .page-title }




<div class="wf-subheading">
  <div class="page-content">
    <h2>Watch &amp; learn</h2>
    <p class="mdl-typography--font-light">
      从Chrome团队中学习及了解最新的资讯。
    </p>
  </div>
</div>

{% include page-structure/site-promo-banner.liquid %}

<div class="page-content">
  <div class="mdl-grid">
    {% for subdirectory in page.context.subdirectories %}
      {% capture image %}/web/shows/imgs/{{subdirectory.index.key_img}}{% endcapture %}
      {% include shared/base_card.liquid imgUrl=image text=subdirectory.index.description linkHref=subdirectory.index.relative_url linkText=subdirectory.index.title %}
    {% endfor %}
  </div>
</div>
