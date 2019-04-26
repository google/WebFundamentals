project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
{% include "web/_shared/machine-translation-start.html" %}

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-03-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# Mới trong Chrome 64 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

* Hỗ trợ cho [`ResizeObservers`](#resizeobserver) , sẽ thông báo cho bạn khi hình chữ nhật nội dung của phần tử đã thay đổi kích thước của nó.
* Các mô-đun hiện có thể truy cập để lưu trữ siêu dữ liệu cụ thể bằng [import.meta](#import-meta) .
* [pop-up blocker](#popup-blocker) trở nên mạnh mẽ.
* [`window.alert()`](#window-alert) không còn thay đổi tiêu điểm.

Và có [plenty more](#more) !

Tôi là Pete LePage. Hãy đi sâu vào và xem có gì mới cho các nhà phát triển trong Chrome 64!

<div class="clearfix"></div>

Note: Bạn muốn danh sách đầy đủ các thay đổi? Kiểm tra [Chromium source repository change list](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140) .

## `ResizeObserver` {: #resizeobserver }

Theo dõi khi thay đổi kích thước của một phần tử có thể là một chút đau. Nhiều khả năng, bạn sẽ đính kèm một người nghe vào sự kiện `resize` của tài liệu, sau đó gọi `getBoundingClientRect` hoặc `getComputedStyle` . Nhưng, cả hai đều có thể gây ra sự đổ vỡ bố cục.

Và điều gì sẽ xảy ra nếu cửa sổ trình duyệt không thay đổi kích thước, nhưng một phần tử mới đã được thêm vào tài liệu? Hoặc bạn đã thêm `display: none` vào một phần tử? Cả hai đều có thể thay đổi kích thước của các phần tử khác trong trang.

`ResizeObserver` thông báo cho bạn bất cứ khi nào kích thước của một phần tử thay đổi, và cung cấp chiều cao và chiều rộng mới của phần tử, giảm nguy cơ vỡ trang.

Giống như các nhà quan sát khác, việc sử dụng nó khá đơn giản, tạo ra một đối tượng `ResizeObserver` và chuyển một cuộc gọi lại đến hàm tạo. `ResizeOberverEntries` lại sẽ được đưa ra một mảng của `ResizeOberverEntries` - một mục nhập cho mỗi phần tử quan sát - có chứa các tham số mới cho phần tử.

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

Kiểm tra [`ResizeObserver`: It's like `document.onresize` for Elements](/web/updates/2016/10/resizeobserver) để biết thêm chi tiết và ví dụ thế giới thực.


## Trình chặn {: #popup-blocker } sổ bật lên được cải thiện {: #popup-blocker }

Tôi ghét tab-under. Bạn biết họ, đó là khi một trang mở một cửa sổ bật lên đến một số đích VÀ điều hướng trang. Thông thường một trong số đó là một quảng cáo hoặc một thứ gì đó mà bạn không muốn.

Bắt đầu từ Chrome 64, các loại điều hướng này sẽ bị chặn và Chrome sẽ hiển thị một số giao diện người dùng gốc cho người dùng - cho phép họ theo dõi chuyển hướng nếu họ muốn.


## `import.meta` {: #import-meta }

Khi viết các mô-đun JavaScript, bạn thường muốn truy cập vào siêu dữ liệu của máy chủ lưu trữ cụ thể về mô-đun hiện tại. Chrome 64 giờ đây hỗ trợ thuộc tính `import.meta` trong các mô đun và hiển thị URL cho mô-đun là `import.meta.url` .

Điều này thực sự hữu ích khi bạn muốn giải quyết tài nguyên liên quan đến tệp mô-đun trái ngược với tài liệu HTML hiện tại.


## Và hơn thế nữa! {: #more }

Đây chỉ là một vài thay đổi trong Chrome 64 dành cho nhà phát triển, tất nhiên, có nhiều thay đổi hơn.

* Chrome hiện hỗ trợ [named captures](/web/updates/2017/07/upcoming-regexp-features#named_captures) và [Unicode property  escapes](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) trong các biểu thức chính quy.
* Giá trị mặc định `preload` giá trị cho `<audio>` và `<video>` yếu tố tại là `metadata` . Điều này mang Chrome phù hợp với các trình duyệt khác và giúp giảm băng thông và sử dụng tài nguyên bằng cách chỉ tải siêu dữ liệu chứ không phải chính phương tiện.
* Bây giờ bạn có thể sử dụng `Request.prototype.cache` để xem chế độ cache của một `Request` và xác định xem yêu cầu có phải là một yêu cầu tải lại hay không.
* Sử dụng API quản lý tập trung, bây giờ bạn có thể tập trung một phần tử mà không cần cuộn đến phần tử có thuộc tính `preventScroll` .

## `window.alert()` {: #window-alert }

Oh, và một nữa! Mặc dù đây không thực sự là &#39;tính năng dành cho nhà phát triển&#39;, điều đó làm tôi hạnh phúc. `window.alert()` không còn mang đến một tab nền cho nền trước! Thay vào đó, cảnh báo sẽ được hiển thị khi người dùng chuyển sang quay lại tab đó.

Không có chuyển đổi tab ngẫu nhiên hơn bởi vì một cái gì đó bắn một `window.alert` vào tôi. Tôi đang xem bạn Lịch Google cũ.


Hãy chắc chắn để [subscribe](https://goo.gl/6FP1a5) để chúng tôi [YouTube channel](https://www.youtube.com/user/ChromeDevelopers/) , và bạn sẽ nhận được một thông báo qua email mỗi khi chúng ta khởi động một video mới, hoặc thêm chúng tôi [RSS feed](/web/shows/rss.xml) để feed reader của bạn.


Tôi là Pete LePage và ngay sau khi Chrome 65 được phát hành, tôi sẽ ở ngay đây để cho bạn biết - tính năng mới trong Chrome!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}