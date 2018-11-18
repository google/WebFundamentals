project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on: 2018-03-14 #}
{# wf_published_on: 2015-01-01 #}
{# wf_blink_components: N/A #}

# Yêu cầu xem xét {: .page-title }

Bạn phải yêu cầu Google xem xét để trang hoặc trang web của bạn không bị gắn cờ là
nguy hiểm hoặc có khả năng lừa đảo người dùng.

<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## Bạn sẽ cần

*   Kiến thức về lệnh shell/terminal

## Những việc bạn sẽ làm

### 1. Điều kiện tiên quyết

Trước khi yêu cầu xem xét, hãy xác nhận rằng bạn đã thực hiện các bước sau:

* Xác minh quyền sở hữu trang web của bạn trong Search Console
* Làm sạch trang web của bạn sau hành động phá hoại của tin tặc
* Vá lỗ hổng bảo mật
* Đưa trang web sạch của bạn hoạt động trực tuyến trở lại

### 2. Kiểm tra kỹ để đảm bảo các trang của bạn có sẵn và sạch

Để an toàn, hãy sử dụng Wget hoặc cURL để xem các trang trên trang web của bạn, chẳng hạn như
trang chủ của bạn và một URL đã bị tin tặc sửa đổi. Các trang này bây giờ cần phải sạch. Nếu đúng như vậy
và bạn tin chắc rằng điều này cũng đúng với các trang còn lại trên trang web, thì
đã đến lúc bạn yêu cầu xem xét.

Lưu ý: Googlebot phải có thể thu thập dữ liệu trang của bạn để đảm bảo
trang đã sạch. Đảm bảo rằng trang không bị chặn bởi tệp robots.txt hay bị chặn
lập chỉ mục bằng lệnh hay thẻ META robot `noindex`.

### 3. Yêu cầu xem xét

Trước khi yêu cầu xem xét:

* **hãy đảm bảo rằng vấn đề đã được khắc phục thực sự**.
Việc yêu cầu xem xét khi vấn đề vẫn còn tồn tại sẽ chỉ kéo dài khoảng
thời gian mà trang web của bạn bị gắn cờ là nguy hiểm.

* **kiểm tra kỹ nơi bạn sẽ yêu cầu xem xét**. Quá trình xem xét sẽ
diễn ra trong một công cụ cụ thể, tùy theo vấn đề mà trang web của bạn đang gặp phải.
Vui lòng tham khảo các kênh dưới đây.


#### A. Trang web bị tấn công

*Bạn nhận được thông báo trang web bị tấn công trong
[**Báo cáo Hành động thủ công**](https://www.google.com/webmasters/tools/manual-action)
của Search Console:*

1. Bạn đã trải qua các bước liên tiếp của quy trình làm sạch,
  giờ đây bạn có thể truy cập lại vào báo cáo [Hành động thủ công](https://www.google.com/webmasters/tools/manual-action)
  rồi tìm vấn đề dưới dạng kết quả khớp toàn trang web hoặc dưới dạng kết quả khớp
  một phần.
2. Chọn **Yêu cầu xem xét**.

    Để gửi yêu cầu xem xét, chúng tôi đề nghị bạn cung cấp thêm thông tin về hành động
    mà bạn đã thực hiện để làm sạch trang web. Đối với mỗi loại spam của tin tặc, bạn có thể viết một
    câu giải thích cách làm sạch trang web (ví dụ như "Đối với URL bị tấn công bằng cách
    Đưa vào nội dung, tôi đã xóa nội dung spam và vá
    lỗ hổng bảo mật: cập nhật một plugin lỗi thời.").


#### B. Phần mềm không mong muốn (bao gồm cả phần mềm độc hại)

*Bạn nhận được thông báo về phần mềm độc hại hoặc phần mềm không mong muốn trong 
[**Báo cáo Vấn đề bảo mật**](https://www.google.com/webmasters/tools/security-issues)
của Search Console:*

1. Mở lại 
  [**Báo cáo Vấn đề bảo mật**](https://www.google.com/webmasters/tools/security-issues)
  trong Search Console. Báo cáo có thể vẫn hiển thị các cảnh báo và ví dụ về
  URL bị nhiễm phần mềm độc hại mà bạn đã thấy trước đó.
2. Chọn **Yêu cầu xem xét**.

    Để gửi yêu cầu xem xét, chúng tôi đề nghị bạn cung cấp thêm thông tin về
    hành động mà bạn đã thực hiện để khắc phục tình trạng vi phạm chính sách trên trang web của bạn. Ví dụ:
    "Tôi đã xóa mã của bên thứ ba đang phát tán mềm độc hại trên
    trang web của tôi và thay mã này bằng một phiên bản mã hiện đại hơn".


*Bạn không nhận được thông báo về phần mềm độc hại hoặc phần mềm không mong muốn trong
[**Báo cáo Vấn đề bảo mật**](https://www.google.com/webmasters/tools/security-issues)
của Search Console, nhưng bạn nhận được thông báo trong tài khoản AdWords của mình:*

1. Yêu cầu xem xét thông qua
  [Trung tâm trợ giúp AdWords](https://support.google.com/adwords/contact/site_policy).


#### C. Nội dung lừa đảo hay kỹ thuật lừa đảo qua mạng

*Bạn nhận được thông báo về hành vi lừa đảo trong 
[**Báo cáo Vấn đề bảo mật**](https://www.google.com/webmasters/tools/security-issues)
của Search Console:*

1. Mở lại 
  [**Báo cáo Vấn đề bảo mật**](https://www.google.com/webmasters/tools/security-issues)
  trong Search Console. Báo cáo có thể vẫn hiển thị các cảnh báo và ví dụ về
  URL bị nhiễm phần mềm độc hại mà bạn đã thấy trước đó.
2. Chọn **Yêu cầu xem xét**.

    Để gửi yêu cầu xem xét, chúng tôi đề nghị bạn cung cấp thêm thông tin về
    hành động mà bạn đã thực hiện để khắc phục tình trạng vi phạm chính sách trên trang web của bạn. Ví dụ:
    "Tôi đã xóa trang yêu cầu người dùng nhập thông tin cá nhân".

3. Bạn cũng có thể yêu cầu xem xét tại
  [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/).
  Ngoài việc phân phối dưới dạng công cụ báo cáo cho những chủ sở hữu trang web tin rằng trang
  của họ bị gắn cờ là trang lừa đảo do nhầm lẫn, báo cáo này sẽ kích hoạt việc xem xét các
  trang lừa đảo đã bị xóa để đưa ra cảnh báo.

### 4. Đợi yêu cầu xem xét được xử lý

* **Thời gian xử lý yêu cầu xem xét trường hợp bị tấn công bằng spam:** Có thể cần đến vài tuần để xử lý yêu cầu xem xét trang web bị tấn công bằng
  spam. Điều này là do quá trình xem xét spam
   có thể bao gồm hoạt động điều tra thủ công hoặc xử lý lại hoàn toàn
  các trang bị tấn công. Nếu yêu cầu xem xét được chấp thuận thì báo cáo Vấn đề bảo mật sẽ không
  còn hiển thị các loại danh mục bị tấn công hoặc ví dụ về URL bị tấn công.
* **Thời gian xử lý yêu cầu xem xét phần mềm độc hại:** Yêu cầu xem xét các trang web bị nhiễm
  phần mềm độc hại cần vài ngày để xử lý. Sau khi quá trình xem xét hoàn tất,
  phản hồi sẽ có trong mục **Thông báo** của Search Console.
* **Thời gian xử lý yêu cầu xem xét hành vi lừa đảo:** Yêu cầu xem xét hành vi lừa đảo cần khoảng một ngày để
  xử lý. Nếu thành công, cảnh báo lừa đảo hiển thị cho người dùng sẽ bị
  xóa và trang của bạn có thể xuất hiện lại trong kết quả tìm kiếm.

Nếu Google nhận thấy rằng trang web của bạn đã sạch thì cảnh báo sẽ bị xóa khỏi các trình duyệt và
kết quả tìm kiếm trong vòng 72 giờ.

Nếu Google xác định rằng bạn chưa khắc phục được vấn đề, thì báo cáo Vấn đề
bảo mật trong Search Console có thể hiển thị nhiều ví dụ về
URL bị nhiễm phần mềm độc hại hơn để hỗ trợ bước điều tra tiếp theo của bạn. Cảnh báo phần mềm độc hại, trang web lừa đảo hoặc bị tấn công
bằng spam sẽ vẫn hiển thị trong kết quả tìm kiếm và/hoặc trình duyệt để nhắc nhở
người dùng nên thận trọng.

### Các bước cuối cùng

* **Nếu yêu cầu của bạn được chấp thuận,** hãy xác minh rằng trang web của bạn hoạt động như mong đợi:
  các trang tải đúng cách và các liên kết có thể nhấp được. Để giữ an toàn cho trang web của bạn,
  tất cả các chủ sở hữu trang web nên thực hiện kế hoạch bảo trì và bảo mật
  được tạo trong mục [Làm sạch và bảo trì trang web của bạn](clean_site).

    Để biết thêm thông tin, hãy xem xét các tài nguyên sau từ 
    [StopBadware](https://www.stopbadware.org):

      * [Ngăn chặn phần mềm độc hại: những điều cơ bản](https://www.stopbadware.org/prevent-badware-basics)
      * [Tài nguyên bổ sung: trang web bị tấn công](https://www.stopbadware.org/hacked-sites-resources)

* **Nếu yêu cầu của bạn không được chấp thuận,** hãy đánh giá lại trang web của bạn về
  [phần mềm độc hại](hacked_with_malware) hoặc [spam](hacked_with_spam) hoặc về bất kỳ
  sửa đổi hay tệp mới nào do tin tặc tạo. Ngoài ra, bạn
  có thể cân nhắc việc yêu cầu trợ giúp thêm từ
  [các chuyên gia trong nhóm hỗ trợ của bạn](support_team).
