project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Có gì mới trong DevTools (Chrome 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Các tính năng mới sắp tới với DevTools trong Chrome 65 bao gồm:

* [**Local Overrides**](#overrides)
* [New accessibility tools](#a11y)
* [The **Changes** tab](#changes)
* [New SEO and performance audits](#audits)
* [Multiple recordings in the **Performance** panel](#recordings)
* [Reliable code stepping with workers and asynchronous code](#stepping)

Đọc tiếp hoặc xem phiên bản video của các ghi chú phát hành này bên dưới.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

Note: Kiểm tra xem bạn đang chạy phiên bản Chrome nào tại `chrome://version` . Nếu bạn đang chạy phiên bản cũ hơn, các tính năng này sẽ không tồn tại. Nếu bạn đang chạy phiên bản mới hơn, các tính năng này có thể đã thay đổi. Chrome tự động cập nhật lên phiên bản chính mới khoảng 6 tuần một lần.

## Ghi đè {: #overrides }

**Ghi đè cục bộ** cho phép bạn thực hiện thay đổi trong DevTools và giữ những thay đổi đó trên các lần tải trang. Trước đây, mọi thay đổi bạn đã thực hiện trong DevTools sẽ bị mất khi bạn tải lại trang.
**Ghi đè cục bộ** hoạt động đối với hầu hết các loại tệp, với một vài ngoại lệ. Xem [Limitations](#overrides-limitations) .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</figure>

Làm thế nào nó hoạt động:

* Bạn chỉ định thư mục nơi DevTools lưu các thay đổi.
* Khi bạn thực hiện thay đổi trong DevTools, DevTools lưu một bản sao của tệp đã sửa đổi vào thư mục của bạn.
* Khi bạn tải lại trang, DevTools phục vụ tệp được sửa đổi cục bộ, chứ không phải tài nguyên mạng.

Để thiết lập **Ghi đè cục bộ**:

1. Mở bảng **Nguồn**. 1. Mở tab **Ghi đè**.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. Nhấp vào **Ghi đè thiết lập**. 1. Chọn thư mục bạn muốn lưu thay đổi. 1. Ở đầu chế độ xem của bạn, nhấp vào **Cho phép** để cấp cho DevTools khả năng đọc và ghi vào thư mục. 1. Thực hiện thay đổi của bạn.

### Giới hạn {: #overrides-limitations }

* DevTools không lưu các thay đổi được thực hiện trong **DOM Tree** của bảng điều khiển **Elements**. Chỉnh sửa HTML trong bảng **Nguồn** thay thế.
* Nếu bạn chỉnh sửa CSS trong khung **Kiểu** và nguồn của CSS đó là một tệp HTML, DevTools sẽ không lưu thay đổi. Thay vào đó, hãy chỉnh sửa tệp HTML trong bảng **Nguồn**.

### Các tính năng liên quan {: #overrides-related }

* [Workspaces][WS] . DevTools tự động ánh xạ tài nguyên mạng tới một kho lưu trữ cục bộ. Bất cứ khi nào bạn thực hiện thay đổi trong DevTools, thay đổi đó cũng được lưu vào kho lưu trữ cục bộ của bạn.

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## Tab Thay đổi {: #changes }

Theo dõi các thay đổi bạn thực hiện cục bộ trong DevTools thông qua tab **Thay đổi** mới.

<figure>
  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</figure>

## Công cụ trợ năng mới {: #a11y }

Sử dụng ngăn **Trợ năng mới** để kiểm tra các thuộc tính trợ năng của một phần tử và kiểm tra tỷ lệ tương phản của các phần tử văn bản trong Bộ chọn màu ** để đảm bảo chúng có thể truy cập được với người dùng bị khiếm thị hoặc màu sắc kém hình dung thiếu sót.

### năng {: #a11y-pane }

Sử dụng ngăn **Accessibility** trên bảng điều khiển **Elements** để điều tra thuộc tính trợ năng của phần tử hiện được chọn.

<figure>
  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</figure>

Hãy xem A11ycast của Rob Dodson trên nhãn bên dưới để xem cửa sổ **Accessibility** đang hoạt động.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</div>

Tỷ lệ tương phản ### trong Bộ chọn màu {: #contrast }

[Color Picker][CP] bây giờ cho bạn thấy tỷ lệ tương phản của các phần tử văn bản. Việc tăng tỷ lệ tương phản của các yếu tố văn bản làm cho trang web của bạn dễ truy cập hơn đối với người dùng bị khiếm thị kém hoặc thiếu thị lực. Xem [Color and contrast][contrast] để tìm hiểu thêm về cách tỷ lệ tương phản ảnh hưởng đến khả năng truy cập.

Cải thiện độ tương phản màu của các yếu tố văn bản làm cho trang web của bạn dễ sử dụng hơn cho <i>tất cả</i> người dùng. Nói cách khác, nếu văn bản của bạn có màu xám với nền màu trắng thì thật khó để mọi người đọc.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</figure>

Trong **Hình 5**, hai dấu kiểm bên cạnh **4.61** có nghĩa là phần tử này đáp ứng [enhanced recommended contrast ratio (AAA)][enhanced]{:.external} . Nếu nó chỉ có một dấu kiểm, điều đó có nghĩa là nó đã đáp ứng được [minimum recommended contrast ratio (AA)][minimum]{:.external} .

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

Nhấp vào **Hiển thị thêm**! [Show More][SM]{:.cdt-inl} để mở rộng **Tỷ lệ tương phản**. Đường màu trắng trong hộp **Color Spectrum** đại diện cho ranh giới giữa các màu thỏa mãn tỷ lệ tương phản được khuyến nghị và các màu không phù hợp. Ví dụ: vì màu xám trong
**Hình 6** đáp ứng các khuyến nghị, điều đó có nghĩa là tất cả các màu bên dưới đường màu trắng cũng đều đáp ứng các khuyến nghị.

<figure>
  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</figure>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### Các tính năng liên quan {: #contrast-related }

Bảng điều khiển **Kiểm tra** có kiểm tra khả năng truy cập tự động để đảm bảo rằng
*mọi phần tử* văn bản trên một trang có tỷ lệ tương phản đủ.

Xem [Run Lighthouse in Chrome DevTools][audit] hoặc xem A11ycast bên dưới để tìm hiểu cách sử dụng bảng điều khiển **Kiểm tra** để kiểm tra khả năng truy cập.

<div class="video-wrapper-full-width">
  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</div>

[audit]: /web/tools/lighthouse/#devtools

## mới {: #audits }

Chrome 65 mang đến một danh mục kiểm toán SEO hoàn toàn mới và nhiều kiểm tra hiệu suất mới.

Note: Bảng điều khiển **Kiểm tra** được cung cấp bởi [Lighthouse][LH] . Chrome 64 chạy phiên bản Lighthouse 2.5. Chrome 65 chạy phiên bản Lighthouse 2.8. Vì vậy, phần này chỉ đơn giản là một bản tóm tắt các cập nhật Lighthouse từ 2.6, 2.7 và 2.8.

### Kiểm tra SEO mới {: #seo }

Đảm bảo rằng các trang của bạn vượt qua mỗi lần kiểm tra trong danh mục **SEO** mới có thể giúp cải thiện thứ hạng công cụ tìm kiếm của bạn.

<figure>
  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</figure>

### Kiểm tra hiệu suất mới {: #performance }

Chrome 65 cũng có nhiều kiểm tra hiệu suất mới:

* Thời gian khởi động JavaScript cao
* Sử dụng chính sách bộ đệm không hiệu quả trên tài sản tĩnh
* Tránh chuyển hướng trang
* Tài liệu sử dụng plugin
* Giảm bớt CSS
* Giảm bớt JavaScript

<aside class="key-point">
  <b>Perf matters!</b> After Mynet improved their page load speed by 4X, users spent 43% more time
  on the site, viewed 34% more pages, bounce rates dropped 24%, and revenue increased 25% per
  article pageview. <a href="/web/showcase/2017/mynet">Learn more</a>.
</aside>

<aside class="success">
  <b>Tip!</b> If you want to improve the load performance of your pages, but don't know where
  to start, try the <b>Audits</b> panel. You give it a URL, and it gives you a detailed report
  on many different ways you can improve that page. <a href="/web/tools/lighthouse/#devtools">Get
  started</a>.
</aside>

### Các cập nhật khác {: #audits-other }

* [New, manual accessibility audits](/web/updates/2018/01/lighthouse#a11y)
* [Updates to the WebP audit][webp] để làm cho nó bao gồm các định dạng hình ảnh thế hệ tiếp theo khác
* [A rehaul of the accessibility score][a11yscore]
* Nếu kiểm tra khả năng truy cập không áp dụng cho một trang, việc kiểm tra đó không còn được tính vào điểm truy cập
* Hiệu suất hiện là phần trên cùng trong báo cáo

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## Mã đáng tin cậy với công nhân và mã không đồng bộ {: #stepping }

Chrome 65 mang đến các cập nhật cho **Bước vào**! Nút [Step Into][into]{:.cdt-inl} khi bước vào mã chuyển các thông điệp giữa các luồng và mã không đồng bộ. Nếu bạn muốn hành vi bước trước đó, bạn có thể sử dụng **Bước** mới! Nút [Step][step]{:.cdt-inl} , thay vào đó.

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### Bước vào mã chuyển các thông điệp giữa các chủ đề {: #workers }

Khi bạn bước vào mã chuyển các thông điệp giữa các luồng, DevTools sẽ hiển thị cho bạn những gì xảy ra trong mỗi luồng.

Ví dụ, ứng dụng trong **Hình 8** truyền một thông điệp giữa chủ đề chính và chuỗi công nhân. Sau khi bước vào cuộc gọi `postMessage()` trên chủ đề chính, DevTools tạm dừng trong trình xử lý `onmessage` trong luồng công nhân. Trình xử lý `onmessage` tự đăng một thông điệp trở lại luồng chính. Bước vào cuộc gọi *đó* sẽ tạm dừng DevTools trở lại trong chuỗi chính.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</figure>

Khi bạn bước vào mã như thế này trong các phiên bản trước của Chrome, Chrome chỉ hiển thị cho bạn dòng chính của mã, như bạn có thể thấy trong **Hình 9**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</figure>

### Bước vào mã không đồng bộ {: #async }

Khi bước vào mã không đồng bộ, DevTools bây giờ giả định rằng bạn muốn tạm dừng trong mã không đồng bộ mà cuối cùng chạy.

Ví dụ, trong **Hình 10** sau khi bước vào `setTimeout()` , DevTools chạy tất cả các mã dẫn đến điểm đó đằng sau hậu trường, và sau đó tạm dừng trong hàm được chuyển đến `setTimeout()` .

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</figure>

Khi bạn bước vào mã như thế này trong Chrome 63, DevTools tạm dừng trong mã khi nó chạy theo thứ tự thời gian, như bạn có thể thấy trong **Hình 11**.

<figure>
  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</figure>

## Nhiều bản ghi trong bảng Hiệu suất {: #recordings }

Bảng điều khiển **Hiệu suất** hiện cho phép bạn lưu tạm thời tối đa 5 bản ghi. Bản ghi âm sẽ bị xóa khi bạn đóng cửa sổ DevTools. Xem [Get Started with Analyzing Runtime Performance][runtime] để cảm thấy thoải mái với bảng điều khiển **Hiệu suất**.

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>
  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</figure>

Tiền thưởng ## : Tự động hóa các hành động DevTools với Puppeteer 1.0 {: #puppeteer }

Note: Phần này không liên quan đến Chrome 65.

Phiên bản 1.0 của Puppeteer, một công cụ tự động hóa trình duyệt được duy trì bởi nhóm Chrome DevTools, hiện đã hết. Bạn có thể sử dụng Puppeteer để tự động hóa nhiều tác vụ trước đây chỉ có sẵn thông qua DevTools, chẳng hạn như chụp ảnh màn hình:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

Nó cũng có API cho rất nhiều nhiệm vụ tự động hóa hữu ích nói chung, chẳng hạn như tạo tệp PDF:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

Xem [Quick Start][quickstart] để tìm hiểu thêm.

[quickstart]: /web/tools/puppeteer/get-started

Bạn cũng có thể sử dụng Puppeteer để trưng ra các tính năng của DevTools trong khi duyệt mà không bao giờ mở DevTools một cách rõ ràng. Xem [Using DevTools Features Without Opening DevTools][without] để biết ví dụ.

[without]: /web/updates/2018/01/devtools-without-devtools

## Một yêu cầu từ nhóm DevTools: xem xét Canary {: #canary }

Nếu bạn đang sử dụng Mac hoặc Windows, hãy xem xét sử dụng [Chrome Canary][canary] làm trình duyệt phát triển mặc định của bạn. Nếu bạn báo cáo lỗi hoặc thay đổi mà bạn không thích trong khi vẫn còn trong Canary, nhóm DevTools có thể giải quyết phản hồi của bạn nhanh hơn đáng kể.

Note: Canary là phiên bản Chrome độc ​​nhất. Nó được phát hành ngay sau khi được xây dựng, mà không cần thử nghiệm. Điều này có nghĩa là Canary thường xuyên chia tay, khoảng một lần mỗi tháng và thường cố định trong vòng một ngày. Bạn có thể quay lại sử dụng Chrome Stable khi Canary ngừng hoạt động.

[canary]: https://www.google.com/chrome/browser/canary.html

## Phản hồi {: #feedback }

Nơi tốt nhất để thảo luận về bất kỳ tính năng hoặc thay đổi nào bạn thấy ở đây là [google-chrome-developer-tools@googlegroups.com mailing list][ML] . Bạn cũng có thể tweet chúng tôi tại [@ChromeDevTools](https://twitter.com/chromedevtools) nếu bạn thiếu thời gian. Nếu bạn chắc chắn rằng bạn đã gặp lỗi trong DevTools, hãy [open an issue](https://crbug.com/new) .

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## Ghi chú phát hành trước {: #links }

Xem thẻ [devtools-whatsnew][tag] để biết các liên kết đến tất cả các ghi chú phát hành DevTools trước đó.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}
