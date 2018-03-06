project_path: /web/_project.yaml

book_path: /web/fundamentals/_book.yaml

description：Payment Request API 是用於在網路上進行快速，簡單的付款。


{# wf_published_on: 2016-07-25 #}
{# wf_updated_on: 2018-03-03 #}
{# wf_blink_components: Blink>Payments #}

# Payment Request (付款要求) API 介紹 {: .page-title }

{% include "web/_shared/contributors/agektmr.html" %}

{% include "web/_shared/contributors/dgash.html" %}

{% include "web/_shared/contributors/zkoch.html" %}

在網路上購買商品是一種方便但經常令人沮喪的體驗，特別是在行動裝置上。雖然行動裝置流量繼續增加，但行動裝置轉化僅佔所有已完成購買的三分之一。換句話說，使用者在行動裝置上放棄購買的數量，是在桌機 (非行動裝置) 上放棄購買的兩倍 (前提：行動裝置跟桌機的使用者流量大約相同)。為什麼？

![](images/1_why_users_abandon.png)

*為什麼使用者在行動裝置上放棄購買*

線上購買表單通常是使用者密集 (user-intensive)，難以使用，載入速度和刷新速度慢，而且需要多個步驟才能完成。這是因為線上付款的兩個主要組成部分 - 安全性和便利性 - 作用通常是背道而馳的；某方更多通常意味著另一方更少。

導致放棄購買的大多數問題可以直接追溯到購買表單。每個應用程式或網站都有自己的數據輸入和驗證流程，使用者通常會發現他們必須在每個應用程式的購買畫面輸入相同的資訊。此外，應用程式開發人員必須費盡心力 (struggle 掙扎) 建立購買流程，才能讓程式或網站支援多種不同的付款方式；即使付款方式要求的細微差異也會使填寫購買表單和送出表單的流程複雜化。

如果有任何系統能改進或解決這些問題中的一個或多個部分，所有人都會樂於接受改變。我們已經開始使用 [Autofill](/web/updates/2015/06/checkout-faster-with-autofill) 解決問題，但現在我們想談一個更全面的解決方案。

## Payment Request API 介紹 {: #introducing}

Payment Request API 是 [W3C標準](https://www.w3.org/TR/payment-request/) 候選人，旨在*消除結帳表單* 。它極大地改善了購買過程中使用者的操作流程，提供了更加一致的使用者體驗，並使網路商家能夠輕鬆地提供不同的付款方式。

Payment Request API 被設計成與供應商無關 (vendor-agnostic)，意味著它不需要使用特定的付款系統。這不是一種新的付款方式，也不是直接與付款處理系統串接整合 (integrate)；相反地，它是用來將使用者的付款和送貨資訊傳送到網路商家，具有以下目標：

- 用瀏覽器做為商家，使用者和付款方式的中介
- 盡可能標準化付款的溝通流程
- 無縫支持不同的安全付款方式
- 支援任何瀏覽器、設備、行動裝置平台或其他平台

Payment Request API 是一個開放的跨瀏覽器標準，目標是取代傳統的結賬流程，允許網路商家在單一次 API 呼叫中要求和接受任何付款。在使用者允許或拒絕商家的付款要求前，此 API 允許網頁在使用者輸入資料時與 user-agent (user-agent 通常是瀏覽器) 交換資訊。

最重要的是，以瀏覽器作為中介，快速結賬所需的所有資訊都可以儲存在瀏覽器中，使用者只需點擊一下即可確認並付款。

### 付款交易流程{: ＃transaction-process}

對使用者和網路商家來說，使用 Payment Request API 可以讓交易流程盡可能地無縫順暢 (seamless)。

![](images/4_the_payment_transaction_process.png)

*付款交易流程*

流程開始於，當商家網站創建一個新的 `PaymentRequest` 並傳遞給瀏覽器所需的所有購買資訊：付款金額，期望付款的貨幣，以及網站接受的付款方式。瀏覽器會判斷網站接受的付款方式與使用者在目標設備上安裝的付款方式是否彼此相容。

然後瀏覽器會將付款 UI 顯示給使用者看，讓使用者選擇付款方式並授權交易。付款方式可以非常簡單例如使用瀏覽器已儲存的信用卡資料，也可以深奧複雜例如另外呼叫專門為處理網站付款而編寫的第三方應用程式。

註：您可以用 "Pay with Google" 此付款方式從使用者的 Google 帳戶取得卡片資訊和取得設備上的付款 tokens 。要了解更多資訊，請閱讀 [Google Pay API 文件](/pay/api/web/paymentrequest/tutorial)。

<div class="attempt-right">
  <figure>
    <img src="images/5_9_payment_request_ui.png">
    <figcaption>Payment Request 介面</figcaption>
  </figure>
</div>

在使用者授權交易後，所有必要的付款細節將直接發送回該網站。例如，對於信用卡付款，網站將取回卡號，持卡人姓名，到期日期和 CVC。

Payment Request 還可以擴展用來返回其他資訊，例如送貨地址和選項、付款人電子郵件、和付款人電話。這樣您就可以獲得完成付款所需的所有資訊，從而無需向使用者顯示結帳表單。

新流程的美麗之處有三個層面：從使用者的角度來看，以前所有乏味的互動流程：付款要求、授權、進行付款和結果，現在都在一個步驟中進行；從網站的角度來看，它只需要呼叫一次 JavaScript API；從付款方式的角度來看，沒有任何流程改變。

要開始熟悉API本身，請查看我們的[深入](/web/fundamentals/payments/deep-dive-into-payment-request)了解。

Translated by
{% include "web/_shared/contributors/lukechi.html" %}

<div style="clear:both;"></div>
