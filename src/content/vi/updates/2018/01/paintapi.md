project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# CSS Sơn API {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

## Các khả năng mới trong API sơn Chrome 65 của Chrome (còn được gọi là "CSS Custom Paint" hoặc "Worklet sơn của Houdini") sắp được bật theo mặc định trong Chrome Stable. Nó là gì? bạn có thể làm gì với nó? Và làm như thế nào? Vâng, đọc tiếp, sẽ ya '...


CSS Paint API cho phép bạn lập trình một hình ảnh bất cứ khi nào một thuộc tính CSS mong đợi một hình ảnh. Các thuộc tính như `background-image` hoặc `border-image` thường được sử dụng với `url()` để tải một tệp hình ảnh hoặc với các hàm dựng sẵn CSS như `linear-gradient()` . Thay vì sử dụng chúng, bây giờ bạn có thể sử dụng `paint(myPainter)` để tham chiếu một tệp _paint worklet_.

### Viết một worklet sơn

Để xác định một worklet paint gọi là `myPainter` , chúng ta cần load một tệp worklet CSS bằng `CSS.paintWorklet.addModule('my-paint-worklet.js')` . Trong tập tin đó, chúng ta có thể sử dụng hàm `registerPaint` để đăng ký một lớp công việc sơn:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

Bên trong `paint()` gọi lại, chúng ta có thể sử dụng `ctx` giống như cách chúng ta sẽ là `CanvasRenderingContext2D` như chúng ta biết từ `<canvas>` . Nếu bạn biết làm thế nào để vẽ trong một `<canvas>` , bạn có thể vẽ trong một worklet sơn! `geometry` cho chúng ta biết chiều rộng và chiều cao của canvas theo ý của chúng tôi. `properties` Tôi sẽ giải thích sau trong bài này.

Note: Ngữ cảnh của một worklet sơn không phải là 100% giống với ngữ cảnh `<canvas>` . Hiện tại, phương thức hiển thị văn bản bị thiếu và vì lý do bảo mật, bạn không thể đọc lại pixel từ canvas.

Như một ví dụ giới thiệu, hãy viết một worklet sơn bàn cờ và sử dụng nó làm hình nền của một `<textarea>` . (Tôi đang sử dụng vùng văn bản vì nó có thể thay đổi kích thước theo mặc định.):

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

Nếu trước đây bạn đã sử dụng `<canvas>` , mã này sẽ trông quen thuộc. Xem [demo] trực tiếp (0) tại đây.

Note: Giống như hầu hết các API mới, API CSS Paint chỉ khả dụng trên HTTPS (hoặc `localhost` ).

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="Textarea với mẫu bàn cờ làm hình nền.">

Sự khác biệt khi sử dụng hình nền chung ở đây là mẫu sẽ được vẽ lại theo yêu cầu, bất cứ khi nào người dùng thay đổi kích thước vùng văn bản. Điều này có nghĩa là hình nền luôn chính xác lớn như nó cần, bao gồm cả mức bù cho các màn hình có mật độ cao.

Điều đó khá tuyệt, nhưng nó cũng khá tĩnh. Chúng ta có muốn viết một worklet mới mỗi khi chúng ta muốn cùng một khuôn mẫu nhưng với các ô vuông có kích thước khác nhau? Câu trả lời là không!

### Tham số công việc của bạn

May mắn thay, công việc sơn có thể truy cập các thuộc tính CSS khác, đó là nơi tham số bổ sung `properties` đi vào hoạt động. Bằng cách cung cấp cho lớp một thuộc tính `inputProperties` tĩnh, bạn có thể đăng ký các thay đổi đối với bất kỳ thuộc tính CSS nào, bao gồm các thuộc tính tùy chỉnh. Các giá trị sẽ được cung cấp cho bạn thông qua tham số `properties` .

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

Bây giờ chúng ta có thể sử dụng cùng một mã cho tất cả các loại bàn cờ khác nhau. Nhưng thậm chí tốt hơn, bây giờ chúng ta có thể đi vào DevTools và [fiddle với các giá trị](https://googlechromelabs.github.io/houdini-samples/paint-worklet/parameter-checkerboard/) cho đến khi chúng ta tìm thấy cái nhìn đúng đắn.

<div style="display: flex; justify-content: center">  <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</div>

Note: Nó sẽ là tuyệt vời để tham số hóa màu sắc, phải không? Đặc tả cho phép chức năng `paint()` lấy danh sách các đối số. Tính năng này chưa được triển khai trong Chrome, vì nó phụ thuộc rất nhiều vào API và Giá trị của Houdini, vẫn cần một số công việc trước khi có thể vận chuyển.

## Các trình duyệt không hỗ trợ công việc sơn Tại thời điểm viết, chỉ Chrome đã triển khai công việc sơn. Mặc dù có các tín hiệu tích cực từ tất cả các nhà cung cấp trình duyệt khác, nhưng không có nhiều tiến bộ. Để cập nhật, hãy kiểm tra [Houdini Ready Yet?](https://ishoudinireadyyet.com) thường xuyên. Trong thời gian chờ đợi, hãy đảm bảo sử dụng cải tiến nâng cao để giữ cho mã của bạn chạy ngay cả khi không có hỗ trợ cho công việc sơn. Để đảm bảo mọi thứ hoạt động như mong đợi, bạn phải điều chỉnh mã của mình ở hai nơi: CSS và JS.

Phát hiện hỗ trợ cho công việc sơn trong JS có thể được thực hiện bằng cách kiểm tra đối tượng `CSS` :

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

Đối với phía CSS, bạn có hai tùy chọn. Bạn có thể sử dụng `@supports` :

    @supports (background: paint(id)) {
      /* ... */
    }

Một mẹo nhỏ gọn hơn là sử dụng thực tế là CSS bị vô hiệu hóa và sau đó bỏ qua toàn bộ tuyên bố thuộc tính nếu có một hàm không xác định trong đó. Nếu bạn chỉ định một thuộc tính hai lần - trước tiên không có công việc sơn, và sau đó với công việc sơn - bạn sẽ nhận được tăng cường tiến bộ:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

Trong trình duyệt _with_ hỗ trợ cho công việc sơn, lần khai báo thứ hai của `background-image` sẽ ghi đè lên tệp đầu tiên. Trong trình duyệt _without_ hỗ trợ cho công việc sơn, khai báo thứ hai là không hợp lệ và sẽ bị loại bỏ, để lại tuyên bố đầu tiên có hiệu lực.

### CSS Paint Polyfill

Đối với nhiều công dụng, cũng có thể sử dụng [CSS Paint Polyfill](https://github.com/GoogleChromeLabs/css-paint-polyfill), bổ sung thêm CSS Custom Paint và Paint Worklets hỗ trợ cho các trình duyệt hiện đại.

## Trường hợp sử dụng Có nhiều trường hợp sử dụng cho các công việc sơn, một số trong số chúng rõ ràng hơn so với các máy khác. Một trong những điều rõ ràng hơn là sử dụng công cụ vẽ để giảm kích thước của DOM của bạn. Thông thường, các yếu tố được thêm hoàn toàn để tạo ra các phần tô điểm bằng cách sử dụng CSS. Ví dụ, trong [Material Design Lite](https://getmdl.io), nút có hiệu ứng gợn chứa 2 phần tử `<span>` bổ sung để thực hiện chính gợn. Nếu bạn có nhiều nút, điều này có thể thêm tối đa một số phần tử DOM và có thể dẫn đến hiệu suất bị suy giảm trên thiết bị di động. Nếu bạn [thực hiện hiệu ứng gợn bằng cách sử dụng công việc sơn](https://googlechromelabs.github.io/houdini-samples/paint-worklet/ripple/) thay vào đó, bạn kết thúc với 0 phần tử bổ sung và chỉ một công việc sơn. Ngoài ra, bạn có một cái gì đó dễ dàng hơn nhiều để tùy chỉnh và tham số hóa.

Một ưu điểm khác của việc sử dụng công cụ vẽ là ở chỗ - trong hầu hết các kịch bản - một giải pháp sử dụng công việc sơn nhỏ về mặt byte. Tất nhiên, có sự cân bằng: mã sơn của bạn sẽ chạy bất cứ khi nào kích thước của canvas hoặc bất kỳ thông số nào thay đổi. Vì vậy, nếu mã của bạn là phức tạp và mất nhiều thời gian, nó có thể giới thiệu jank. Chrome đang làm việc để di chuyển các worklet sơn ra khỏi sợi chính để thậm chí các worklet sơn dài hạn cũng không ảnh hưởng đến độ nhạy của sợi chính.

Với tôi, triển vọng thú vị nhất là công việc sơn cho phép tính năng lấp đầy hiệu quả các tính năng CSS mà trình duyệt chưa có. Một ví dụ sẽ là polyfill [conic gradients](https://lab.iamvdo.me/houdini/conic-gradient) cho đến khi chúng rơi vào Chrome một cách tự nhiên. Một ví dụ khác: trong một cuộc họp CSS, nó đã được quyết định rằng bây giờ bạn có thể có nhiều màu đường viền. Trong khi cuộc họp này vẫn tiếp diễn, đồng nghiệp của tôi Ian Kilpatrick [đã viết một polyfill](https://twitter.com/malyw/status/934737334494429184) cho hành vi CSS mới này bằng cách sử dụng công việc sơn.

## Suy nghĩ bên ngoài “ô” Hầu hết mọi người bắt đầu nghĩ về hình ảnh nền và hình ảnh biên giới khi họ tìm hiểu về công việc sơn. Một trường hợp sử dụng ít trực quan hơn cho công việc sơn là `mask-image` để làm cho các phần tử DOM có các hình dạng tùy ý. Ví dụ: [kim cương](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/):

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="Một phần tử DOM trong hình dạng của một viên kim cương.">

`mask-image` chụp một hình ảnh có kích thước của phần tử. Các khu vực có hình ảnh mặt nạ trong suốt, phần tử trong suốt. Các khu vực có hình ảnh mặt nạ mờ đục, yếu tố mờ đục.

## Hiện có trong Chrome

Paint Worklet đã có trong Chrome Canary trong một thời gian. Với Chrome 65, Chrome được bật theo mặc định. Hãy tiếp tục và thử những khả năng mới mà công việc sơn sẽ mở ra và cho chúng tôi thấy những gì bạn đã xây dựng! Để có thêm cảm hứng, hãy xem [bộ sưu tập của Vincent De Oliveira](https://lab.iamvdo.me/houdini/).

Note: Điểm ngắt hiện không được hỗ trợ trong CSS Paint API, nhưng sẽ được bật trong bản phát hành sau của Chrome.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}