project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Announcing the release of a new country dimension in the Chrome User Experience Report.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-10-30 #}
{# wf_published_on: 2018-01-24 #}
{# wf_tags: ux #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Announcing the release of a new country dimension in the Chrome User Experience Report. #}

# Báo cáo trải nghiệm người dùng Chrome nguyên quốc gia mới {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome User Experience Report](/web/tools/chrome-user-experience-report/) (CrUX) là tập dữ liệu công khai về dữ liệu hiệu suất của người dùng thực. Vì chúng tôi [announced](https://blog.chromium.org/2017/10/introducing-chrome-user-experience-report.html) báo cáo, một trong những bổ sung được yêu cầu nhiều nhất là khả năng hiểu rõ hơn về sự khác biệt về trải nghiệm người dùng trên các vị trí. Dựa trên phản hồi này, chúng tôi đang mở rộng tập dữ liệu CrUX hiện có –– cung cấp chế độ xem toàn cầu trên tất cả các vùng địa lý –– cũng bao gồm một bộ sưu tập các tập dữ liệu riêng cho quốc gia cụ thể!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

Ví dụ: trong ảnh chụp màn hình ở trên, chúng tôi thấy truy vấn so sánh mật độ tổng hợp cho các loại kết nối hiệu quả 4G và 3G trên một số quốc gia. Điều thú vị là để xem tốc độ 4G phổ biến ở Nhật Bản, trong khi tốc độ 3G vẫn còn rất phổ biến ở Ấn Độ. Thông tin chi tiết như thế này có thể được thực hiện nhờ vào thứ nguyên quốc gia mới.

Để bắt đầu, hãy [CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) vào [CrUX project](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) trên BigQuery và bạn sẽ thấy danh sách các tập dữ liệu được tổ chức bởi [country code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) từ `country_ae` (United Arab Emirates) đến `country_za` (Nam Phi). Bộ dữ liệu `all` quen thuộc vẫn ở đó để nắm bắt dữ liệu hiệu suất tổng thể toàn cầu. Trong mỗi tập dữ liệu có các bảng hàng tháng bắt đầu với báo cáo gần đây nhất, `201712` . Để có hướng dẫn chi tiết về cách bắt đầu, vui lòng tham khảo [CrUX documentation](/web/tools/chrome-user-experience-report/) được cập nhật của chúng tôi.

Chúng tôi rất vui được chia sẻ dữ liệu mới này với bạn và hy vọng sẽ thấy bạn sử dụng dữ liệu này theo các cách để cải thiện trải nghiệm người dùng trên web. Để được trợ giúp, đặt câu hỏi, cung cấp phản hồi hoặc chia sẻ kết quả từ phân tích của riêng bạn, hãy tham gia thảo luận trên [CrUX forum](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) . Và nếu cấp miễn phí trên BigQuery không đủ để chứa sự nhiệt tình truy vấn của bạn, chúng tôi vẫn đang chạy chương trình khuyến mãi để cung cấp cho bạn một [extra 10 TB free](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) , vì vậy hãy lấy tín dụng của bạn trong khi nguồn cung cấp cuối cùng!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
