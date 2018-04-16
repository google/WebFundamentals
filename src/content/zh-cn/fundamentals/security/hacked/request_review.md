project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2018-03-14 #}
{# wf_published_on:2015-01-01 #}
{# wf_blink_components:N/A #}

# 请求审核 {: .page-title }

要想使您的网页或网站不再被标记为危险网站或有欺诈嫌疑的网站，您必须请求 Google 审核您的网站。


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## 所需知识

*   shell/terminal 命令的知识

## 您应执行的操作

### 1. 先决条件

在请求审核之前，请确认您已完成以下步骤：

* 已在 Search Console 中验证您对网站的所有权
* 已清除黑客对您网站造成的破坏
* 已修复漏洞
* 已将您清除危害的网站恢复上线

### 2. 复查您的网页，确保其可访问并且安全无害

为安全起见，请使用 Wget 或 cURL 查看您网站上的网页，例如首页以及曾被黑客篡改过的网址，这些网页现在应该是安全无害的。
 倘若如此，并且您确信您网站上的其他网页也是安全无害的，即可请求审核。



注：您的网页必须可被 Googlebot 抓取，才能确保它们是安全无害的。
 请确保您没有使用 `noindex` 漫游器元标记或指令将这些网页排除在抓取范围之外或禁止将其编入索引。


### 3. 请求审核

请求审核之前：

* **确保问题确实得到解决**；
若在问题仍存在的情况下请求审核，只会延长您的网站被标记为危险网站的时间。


* **复查您应在何处请求审核**；审核流程将在某个专用工具中执行，具体取决于您的网站面临的问题。请参考下面的渠道。


#### A. 被黑客入侵的网站

*您在 Search Console 的 [**Manual Actions 报告**](https://www.google.com/webmasters/tools/manual-action)中收到了网站被黑客入侵的通知：*



1. 现在，您已完成连续的清理步骤，可以重新进入 [Manual Actions](https://www.google.com/webmasters/tools/manual-action) 报告，以全站匹配或部分匹配形式查找问题。
2. 选择 **Request a review**。

    要提交审核请求，我们会要求您详细说明您采取了哪些措施来清理网站。对于遭到网络垃圾入侵的每一个类别，您都可以用一句话来说明您是如何清理网站的（例如，“For Content injection hacked URLs, I removed the spammy content and corrected the vulnerability: updating an out-of-date plugin.”。





#### B. 垃圾软件（包括恶意软件）

*您在 Search Console 的 [**Security Issues 报告**](https://www.google.com/webmasters/tools/security-issues)中收到了恶意软件或垃圾软件通知：*



1. 在 Search Console 中再次打开 [**Security Issues 报告**](https://www.google.com/webmasters/tools/security-issues)。
 报告可能仍然显示您之前看到过的警告和受感染网址示例。
2. 选择 **Request a review**。

    要提交审核请求，我们会要求您详细说明您采取了哪些措施从网站中清除违反政策的内容。
 例如，“I removed the 3rd-party code that was distributing malware on my website and replaced it with a more modern version of the code”。




*您在 Search Console 的 [**Security Issues 报告**](https://www.google.com/webmasters/tools/security-issues)中没有收到恶意软件或垃圾软件通知，但是您在自己的 AdWords 帐号中收到了通知：*



1. 通过 [AdWords 支持中心](https://support.google.com/adwords/contact/site_policy)提交审核请求。



#### C. 网上诱骗或社交工程

*您在 Search Console 的 [**Security Issues 报告**](https://www.google.com/webmasters/tools/security-issues)中收到了网上诱骗通知：*



1. 在 Search Console 中再次打开 [**Security Issues 报告**](https://www.google.com/webmasters/tools/security-issues)。
 报告可能仍然显示您之前看到过的警告和受感染网址示例。
2. 选择 **Request a review**。

    要提交审核请求，我们会要求您详细说明您采取了哪些措施从网站中清除违反政策的内容。
 例如，“I removed the page that was asking users to enter personal information”。


3. 您也可以在 [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/) 提交审核请求。
  除了作为网站所有者的报告工具用于报告他们的网页被错误标记为网上诱骗网页之外，此报告还会触发对已清理的网上诱骗网页的审核以解除警告。



### 4. 等待 Google 处理审核请求

* **网络垃圾入侵的审核处理时间：**对于遭到网络垃圾入侵的网站，审核流程可能需要长达数周的时间。
 这是因为在进行网络垃圾审核时，可能需要进行人工调查或彻底重新处理被黑网页。
 网站通过审核后，Security Issues 将不会再显示入侵类别类型或被黑网址示例。
* **恶意软件审核处理时间：**对于感染恶意软件的网站，审核流程需要几天的时间。
 审核完毕后，您将会在 Search Console 的 **Messages** 中收到回复。
* **网上诱骗审核处理时间：**网上诱骗的审核流程大约需要一天的时间。
 网站通过审核后，我们将会移除向用户显示的网上诱骗警告，您的网页可以重新出现在搜索结果中。

如果 Google 发现您的网站是安全无害的，会在 72 小时内从浏览器和搜索结果中移除相关警告。


如果 Google 判定您并未解决相关问题，Search Console 中的 Security Issues 报告内通常会显示更多受感染网址示例，以便您展开后续调查。
 为了保护用户，搜索结果和/或浏览器中仍会显示您的网站存在恶意软件、网上诱骗或遭到网络垃圾入侵的警告。



### 最后步骤

* **如果您的网站通过了审核**，请验证网站的运行是否符合预期：
  网页能正常加载，链接可点击。 为了维持网站的安全，我们建议每位网站所有者都实施[清理并维护网站](clean_site)中制定的维护和安全计划。



    如需了解更多信息，请参阅 [StopBadware](https://www.stopbadware.org) 中的以下资源：


      * [防范有害软件：基础知识](https://www.stopbadware.org/prevent-badware-basics)
      * [其他资源：被黑网站](https://www.stopbadware.org/hacked-sites-resources)

* **如果您的网站未通过审核**，请重新评估您的网站是否存在[恶意软件](hacked_with_malware)或[网络垃圾](hacked_with_spam)，或者是否存在黑客作出的篡改或创建的新文件。您也可以考虑向[支持团队中的专家](support_team)寻求更多帮助。


