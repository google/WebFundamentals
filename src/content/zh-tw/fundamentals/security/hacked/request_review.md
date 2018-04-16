project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2018-03-14 #}
{# wf_published_on:2015-01-01 #}
{# wf_blink_components:N/A #}

# 申請審核 {: .page-title }

您必須向 Google 申請審核，Google 才不會將您的頁面或網站標記為危險或可能欺騙使用者的頁面或網站。


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## 您將需要

* 瞭解殼層/終端機命令

## 處理方式

### 1. 先決條件

申請審核前，請確認您已經完成以下步驟：

* 在 [Search Console] 中驗證過您的網站擁有權
* 確認網站未遭駭客攻擊
* 修正漏洞
* 讓不含惡意軟體的網站重新上線

### 2. 確認頁面正常且不含惡意軟體

為安全起見，請使用 Wget 或 cURL 檢視網站頁面，例如首頁和駭客改造過的 URL；現在應該已經沒有這些疑慮。
 若確定沒有問題，
而您有自信網站中的其他頁面也一樣正常，就可以開始申請審核了。


附註：Googlebot 必須能夠檢索您的頁面，
才能確認頁面是否不含惡意軟體。 確認 `noindex` 魁儡程式 META 標記或指示詞不會排除或封鎖這些頁面，而無法建立索引。


### 3. 申請審核

申請審核之前：

* **請務必修正所有問題**，
若未修復問題即申請審核，只會延長網站遭標記為危險網站的時間。


* **確認需要申請審核之處**；審核流程會根據網站發生問題的點，以指定工具進行。
請參考下列頻道。


#### A. 遭駭網站

*您在 
[Search Console] 的 
[**Manual Actions report**](https://www.google.com/webmasters/tools/manual-action) 中收到了遭駭網站通知：*

1. 完成清理程序的後續步驟後，
您可以再次進入 [Manual Actions](https://www.google.com/webmasters/tools/manual-action)
 報告，瞭解問題是發生在整個網站或是網站中的部分區域。
2. 選擇 **[Request a review]**。

    提交審核時，我們會請您針對清理網站的步驟提供詳細資訊。
 您可以將每一種入侵的垃圾內容分類，
分別撰寫一個句子，說明您清理網站的方式 (例如
「處理被插入內容的遭駭 URL 時，我的做法是
移除垃圾內容並修正漏洞：更新過時的外掛程式。」)。


#### B. 垃圾軟體 (包括惡意軟體)

*您在
 [Search Console] 的 
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues) 中收到了惡意軟體或垃圾軟體通知：*

1. 再次開啟 
[Search Console] 中的 [**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
。 報告仍然可能會顯示您之前看到過的警告和遭駭 URL 範例。
2. 選擇 **[Request a review]**。

    提交審核時，我們會請您針對如何移除違反網站政策的內容提供詳細資訊。
 例如，
「我移除了在網站中散佈惡意軟體的第三方程式碼，
並以更符合現代版本的程式碼取代。」


*您在 [Search Console] 的 
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
 中並沒有收到惡意軟體或垃圾軟體通知，但您的 AdWords 帳戶收到了通知：*

1. 經由 
[AdWords support center](https://support.google.com/adwords/contact/site_policy) 申請審核。


#### C. 網路釣魚或社交工程

*您在 [Search Console] 的 
[**Security Issues report**](https://www.google.com/webmasters/tools/security-issues) 
中收到了網路釣魚通知：*

1. 再次開啟 
[Search Console] 中的 [**Security Issues report**](https://www.google.com/webmasters/tools/security-issues)
。 報告仍然可能會顯示您之前看到過的警告和遭駭 URL 範例。
2. 選擇 **[Request a review]**。

    提交審核時，我們會請您針對如何移除違反網站政策的內容提供詳細資訊。例如：「我移除了要求使用者輸入個人資訊的頁面」。

3. 您也可以至 
[google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/) 申請審核。
  這份報告除了可供認為自己的頁面
遭誤標為網路釣魚頁面的網站擁有者當成通報工具，還可以通知我們開始審核
已經清除警訊的網路釣魚網頁。

### 4. 等審核流程結束

* **遭垃圾內容入侵的審核處理時間：** 審核遭垃圾內容入侵的網站時，約需花上數週的作業時間。
 這是因為垃圾
內容審核可能需要交由人工調查，或者需要完全
重新處理遭駭頁面。 一旦審核獲准，[Security Issues] 就不會再顯示遭駭的類型或遭駭 URL 範例。
* **惡意軟體審核處理時間：**審核遭惡意軟體感染的網站時，約需花上數天的作業時間。
 審核完畢後，您可在 [Search Console] 的 **[Messages]** 中看見回覆。
* **網路釣魚審核處理時間：**網路釣魚審核處理時間
約需一天。 一旦成功，就會移除使用者看得見的網路釣魚警告，您的網頁也會再次出現在搜尋結果中。


若 Google 發現您的網站已經不含惡意軟體，會在 72 小時內移除瀏覽器和搜尋結果中的警告。


若 Google 認定您尚未修復問題，[Search Console] 中的 [Security
 Issues] 報告可能會顯示更多遭感染
 URL 的範例，協助您再次調查範例。 搜尋結果和/或瀏覽器中仍然會顯示惡意
軟體、網路釣魚或遭垃圾內容入侵的網站警告，這是
保護使用者的措施。

### 最終步驟

* **若審核通過，**請檢查網站是否能正常運作：
  能正確載入頁面且可以點選連結。 為確保網站安全，
我們鼓勵所有網站擁有者實作在 [Clean and maintain your site](clean_site) 中擬定的維護與安全
方案。

    如需詳細資訊，請參閱 
[StopBadware](https://www.stopbadware.org) 的下列資源：

      * [Preventing badware: basics](https://www.stopbadware.org/prevent-badware-basics)
      * [Additional resources: hacked sites](https://www.stopbadware.org/hacked-sites-resources)

* **若您申請未獲准，**請重新評估網站中的
 [malware](hacked_with_malware) 或 [spam](hacked_with_spam)，或者檢查駭客進行的任何
修改或建立的任何新檔案。 或者，您
可以考慮請 
[specialists in your support team](support_team) 提供更多協助。
