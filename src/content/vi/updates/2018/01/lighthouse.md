project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New SEO audits and manual accessibility audits, and updates to the WebP audit.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-05 #}
{# wf_tags: lighthouse,accessibility,images #}
{# wf_featured_image: /web/progressive-web-apps/images/pwa-lighthouse.png #}
{# wf_featured_snippet: New SEO audits and manual accessibility audits, and updates to the WebP audit. #}
{# wf_blink_components: N/A #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Lighthouse 2.7 Cập nhật {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

[CDT]: /web/tools/lighthouse/#devtools
[Node]: https://github.com/GoogleChrome/lighthouse#using-programmatically
[CLI]: /web/tools/lighthouse/#cli
[CE]: /web/tools/lighthouse/#extension

Ngọn hải đăng 2.7 đã hết! Điểm nổi bật bao gồm:

* [New SEO audits](#seo) .
* [New, manual accessibility audits](#a11y) .
* [Updates to the WebP audit](#webp) .

Xem [2.7 release notes][RN] để biết danh sách đầy đủ các tính năng mới, thay đổi và sửa lỗi.

[RN]: https://github.com/GoogleChrome/lighthouse/releases/tag/v2.7.0

## Cách cập nhật lên 2.7 {: #update }

* NPM. Run `npm update lighthouse` , hoặc `npm update lighthouse -g` cờ nếu bạn cài đặt Ngọn hải đăng trên toàn cầu.
* Tiện ích mở rộng của Chrome. Tiện ích sẽ tự động cập nhật nhưng bạn có thể cập nhật tiện ích theo cách thủ công qua `chrome://extensions` .
* Những công cụ của nhà phát triển. Ngọn hải đăng 2.7 đang giao hàng trong Chrome 65. Bạn có thể kiểm tra phiên bản Chrome nào bạn đang chạy qua `chrome://version` . Chrome cập nhật lên phiên bản mới khoảng 6 tuần một lần. Bạn có thể chạy mã Chrome mới nhất bằng cách tải xuống [Chrome Canary][Canary] .

[Canary]: https://www.google.com/chrome/browser/canary.html

## Kiểm tra SEO mới {: #seo }

Danh mục SEO mới cung cấp các kiểm tra giúp cải thiện thứ hạng trang của bạn trong các kết quả của công cụ tìm kiếm.

Note: Nhiều yếu tố ảnh hưởng đến xếp hạng của công cụ tìm kiếm của trang. Ngọn hải đăng không kiểm tra tất cả các yếu tố này. Một điểm số 100 hoàn hảo trong Lighthouse không đảm bảo một vị trí hàng đầu trên bất kỳ công cụ tìm kiếm nào!

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category. New audits include: Document uses legible font sizes,
            Has a meta viewport tag with width or initial-scale attribute,
            Document has a title element, Document has a meta description, Page has
            successful HTTP code, Links have descriptive text, Page isn't blocked from indexing,
            and Document has a valid hreflang."/>
  <figcaption>
    <b>Figure 1</b>. The new <b>SEO</b> category
  </figcaption>
</figure>

## Kiểm tra khả năng truy cập {: #a11y }

Kiểm tra khả năng truy cập thủ công mới, thông báo cho bạn về những điều bạn có thể làm để cải thiện khả năng truy cập trang của bạn. &quot;Thủ công&quot; ở đây có nghĩa là Ngọn hải đăng không thể tự động hóa các kiểm tra này, vì vậy bạn cần tự mình kiểm tra chúng.

<figure>
  <img src="/web/updates/images/2018/01/a11y.png"
       alt="The new, manual accessibility audits, which includes: The page has a logical tab order,
            Interactive controls are keyboard focusable, The user's focus is directed to new
            content added to the page, User focus is not accidentally trapped in a region,
            Custom controls have associated labels, Custom controls have ARIA roles, Visual order
            on the page follows DOM order, Offscreen content is hidden from assistive technology,
            Headings don't skip levels, and HTML5 landmark elements are used to improve
            navigation."/>
  <figcaption>
    <b>Figure 2</b>. The new, manual <b>Accessibility</b> audits
  </figcaption>
</figure>

## Cập nhật cho kiểm toán WebP {: #webp }

Nhờ có một số [community feedback][feedback] , [WebP audit][webp] bây giờ đã bao gồm nhiều định dạng hình ảnh hiệu suất cao, thế hệ tiếp theo khác, như JPEG 2000 và JPEG XR.

[feedback]: https://www.reddit.com/r/webdev/comments/75w7t0/so_exactly_what_do_i_do_google_put_my_css_in_js/doatllq/
[webp]: /web/tools/lighthouse/audits/webp

<figure>
  <img src="/web/updates/images/2018/01/webp.png"
       alt="The new WebP audit."/>
  <figcaption>
    <b>Figure 3</b>. The new WebP audit
  </figcaption>
</figure>

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}