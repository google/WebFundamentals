project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Use Puppeteer to launch Chromium with DevTools features enabled.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-22 #}
{# wf_tags: devtools #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Use Puppeteer to launch Chromium with DevTools features enabled. #}
{# wf_blink_components: Platform>DevTools, Internals>Headless #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# Sử dụng các tính năng DevTools mà không cần mở DevTools {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Tôi thường thấy các câu hỏi dọc theo dòng &quot;Tôi thực sự thích tính năng X của DevTools, nhưng nó ngừng hoạt động khi tôi đóng DevTools. Làm cách nào để giữ cho tính năng X chạy ngay cả khi DevTools bị đóng?&quot;

Câu trả lời ngắn gọn là: bạn có thể không thể.

Tuy nhiên, bạn * có thể * tấn công cùng nhau một tập lệnh [Puppeteer][puppeteer]{:.external} khởi chạy Chromium, mở một máy khách gỡ lỗi từ xa, sau đó bật tính năng DevTools mà bạn thích (qua [Chrome DevTools Protocol][CDP]{:.external} ), mà không bao giờ mở DevTools một cách rõ ràng.

[puppeteer]: https://github.com/GoogleChrome/puppeteer
[CDP]: https://chromedevtools.github.io/devtools-protocol/

Ví dụ: tập lệnh bên dưới cho phép tôi che phủ [FPS Meter][FPS] trên cùng bên phải của chế độ xem, mặc dù DevTools không bao giờ mở ra, như bạn có thể thấy trong video bên dưới.

[FPS]: /web/tools/chrome-devtools/evaluate-performance/reference#fps-meter

    // Node.js version: 8.9.4
    const puppeteer = require('puppeteer'); // version 1.0.0

    (async () => {
      // Prevent Puppeteer from showing the "Chrome is being controlled by automated test
      // software" prompt, but otherwise use Puppeteer's default args.
      const args = await puppeteer.defaultArgs().filter(flag => flag !== '--enable-automation');
      const browser = await puppeteer.launch({
        headless: false,
        ignoreDefaultArgs: true,
        args
      });
      const page = await browser.newPage();
      const devtoolsProtocolClient = await page.target().createCDPSession();
      await devtoolsProtocolClient.send('Overlay.setShowFPSCounter', { show: true });
      await page.goto('https://developers.google.com/web/tools/chrome-devtools');
    })();

<style>
  video { width: 100%; }
</style>

<video controls>
  <source src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/devtools.mp4">
</video>

Đây chỉ là một trong nhiều tính năng của DevTools mà bạn có thể truy cập thông qua Giao thức Chrome DevTools.

Một gợi ý chung: kiểm tra [Puppeteer API][API]{:.external} trước khi sử dụng để tạo một trình khách giao thức DevTools. Puppeteer đã có các API chuyên dụng cho nhiều tính năng của DevTools, chẳng hạn như [code coverage][coverage]{:.external} và [intercepting **Console** messages][console]{:.external} .

[API]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md
[coverage]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#class-coverage
[console]: https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#event-console

Nếu bạn cần trợ giúp truy cập tính năng DevTools thông qua Puppeteer, [ask a question on Stack Overflow][SO]{:.external} .

Nếu bạn muốn thể hiện một kịch bản Puppeteer sử dụng Giao thức DevTools, hãy tweet chúng tôi tại [@ChromeDevTools][twitter]{:.external} .

[SO]: https://stackoverflow.com/questions/ask?tags=google-chrome-devtools,puppeteer
[twitter]: https://twitter.com/chromedevtools

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}