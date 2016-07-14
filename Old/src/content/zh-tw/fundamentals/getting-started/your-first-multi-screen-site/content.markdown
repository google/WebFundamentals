---
title: "建立內容和架構"
description: "對任何網站來說，內容絕對是最重要的一環。 在這份指南中，我們將會告訴您如何迅速規劃出第一個多裝置網站的建造計劃。"
notes:
  styling:
    - "樣式以後還會來" 
updated_on: 2014-04-23
translators:
related-guides:
  create-amazing-forms:
    -
      title: "建立方便好用的表單"
      href: fundamentals/input/form/
      section:
        id: user-input
        title: "表單"
        href: fundamentals/input/form/
    -
      title: "標籤和名稱都可正確輸入"
      href: fundamentals/input/form/label-and-name-inputs
      section:
        id: user-input
        title: "表單"
        href: fundamentals/input/form/
    -
      title: "選擇最佳的輸入類型"
      href: fundamentals/input/form/choose-the-best-input-type
      section:
        id: user-input
        title: "表單"
        href: fundamentals/input/form/
  video:
    -
      title: "有效使用影片"
      href: fundamentals/media/video/
      section:
        id: introduction-to-media
        title: "影片"
        href: fundamentals/media/
    -
      title: "變更開始位置"
      href: fundamentals/media/video/add-a-video#specify-a-start-and-end-time
      section:
        id: introduction-to-media
        title: "影片"
        href: fundamentals/media/
    -
      title: "納入海報圖片"
      href: fundamentals/media/video/add-a-video#include-a-poster-image
      section:
        id: introduction-to-media
        title: "影片"
        href: fundamentals/media/
  images:
    -
      title: "有效使用圖片"
      href: fundamentals/media/images/
      section:
        id: introduction-to-media
        title: "圖片"
        href: fundamentals/media/
    -
      title: "在標記中正確使用圖片"
      href: fundamentals/media/images/images-in-markup
      section:
        id: introduction-to-media
        title: "圖片"
        href: fundamentals/media/
    -
      title: "圖片最佳化"
      href: fundamentals/performance/optimizing-content-efficiency/image-optimization
      section:
        id: introduction-to-media
        title: "圖片"
        href: fundamentals/media/
key-takeaways:
  content-critical:
    - "先找出所需的內容。"
    - "草擬寬窄檢視區都適用的資訊架構 (IA)。"
    - "建立網頁內容骨架圖 (還不需加上樣式)。"
---

<p class="intro">
  對任何網站來說，內容絕對是最重要的一環。 在設計網站時，我們必須秉持內容至上的原則，而不是讓設計喧賓奪主。 在這份指南中，首先我們會找出所需的內容，並依據內容建立網頁架構，然後再以寬窄檢視區都適用的簡單線性版面配置呈現網頁。
</p>

{% include shared/toc.liquid %}

## 建立網頁結構

我們已確定所需內容：

1.  簡介「CS256：行動網路開發」課程的區域
2.  收集對我們產品感興趣的使用者資訊的表單
3.  深入說明和影片
4.  產品實際運作的圖片
5.  包含可驗證相關要求資訊的資料表

{% include shared/takeaway.liquid list=page.key-takeaways.content-critical %}

我們也已草擬一份寬窄檢視區都適用的資訊架構和版面配置。

<div class="demo clear" style="background-color: white;">
  <img class="mdl-cell mdl-cell--6--col" src="images/narrowviewport.png" alt="窄檢視區資訊架構">
  <img  class="mdl-cell mdl-cell--6--col" src="images/wideviewport.png" alt="寬檢視區資訊架構">
</div>

這份文件可輕鬆轉換成網頁骨架中的粗略區段，後續在這個專案中都會用到。

{% include_code src=_code/addstructure.html snippet=structure %}

## 將內容新增到網頁

網站的基本架構已完成。 我們知道所需的區段、其中要顯示的內容，以及內容在整體資訊架構中的位置。 現在就讓我們著手打造網站吧！

{% include shared/remember.liquid title="Note" inline="true" list=page.notes.styling %}

### 建立標題和表單

對於我們的網頁來說，標題和要求通知表單是不可或缺的要素， 因此必須立即向使用者顯示。

在標題中，請簡單描述課程內容：

{% include_code src=_code/addheadline.html snippet=headline %}

我們也需要填寫表單。
這份簡易表單必須收集使用者姓名、電話號碼和方便我們回電的時間等資訊。

所有表單都必須具備標籤和預留位置，方便使用者聚焦於表單元素、瞭解應填入何種資訊，並可讓協助工具瞭解扁擔架構。名稱屬性不僅會將表單值傳送給伺服器，也可為瀏覽器提供重要提示，說明如何自動為使用者填寫表單資訊。

為方便使用者在行動裝置上輕鬆快速地輸入內容，我們會新增語意類型。舉例來說，當使用者輸入電話號碼時，應會看到撥號鍵盤。

{% include_code src=_code/addform.html snippet=form %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms %}

### 建立影片和資訊區段

內容的影片和資訊區段會包含較深入的資訊。
其中會顯示產品功能的項目符號列表，也會包含影片預留位置，讓使用者觀看產品實際運作的情形。

{% include_code src=_code/addcontent.html snippet=section1 %}

我們通常會透過影片以互動的方式說明內容，也常常使用影片示範產品使用方式或概念。

只要依照下列最佳作法，您也可輕鬆將影片整合到網站中:

*  新增 `controls` 屬性，方便使用者播放影片。
*  新增 `poster` 圖片讓使用者預覽內容。
*  依照支援的影片格式，新增多個 `<source>` 元素。
*  新增備用文字告知使用者，當無法在視窗中播放影片時，可自行下載。

{% include_code src=_code/addvideo.html snippet=video lang=html %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.video %}

### 建立圖片區段

沒有圖片的網站會顯得乏味。 圖片類型共有兩種：

*  內容圖片 &mdash; 穿插在內容當中的圖片，通常用來傳達額外的資訊。
*  美觀圖片 &mdash; 這類圖片的用途是美化網站，通常是背景圖片、花樣和漸層。我們將在[下一篇文章]({{page.nextPage.relative_url}})詳細說明。

在我們的網頁中，圖片區段匯集了許多內容圖片。

如要有效傳達網頁涵義，絕對少不了內容圖片。 想想報紙中的圖片就不難瞭解這類圖片的重要性。 我們使用的是專案教練 Chris Wilson、Peter Lubbers 和 Sean Bennet 的圖片。

{% include_code src=_code/addimages.html snippet=images lang=html %}

這些圖片都已設為可放大成螢幕寬度。 這項設定非常適合檢視區較窄的裝置，但在檢視區較寬的裝置 (例如桌上型電腦)上效果較差。在探討回應式設計時，我們將會處理這項問題。

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

許多視障使用者無法看到圖片，通常需要借助螢幕閱讀器等輔助技術剖析網頁資料，才可藉由語音解讀網頁。請確認所有的內容圖片都具有包含描述字詞的 `alt` 標記，方便螢幕閱讀器為使用者朗讀。

新增 `alt` 標記時，請儘可能以最精簡的說明文字完整描述圖片。舉例來說，我們在示範中僅針對這個屬性使用了簡單的「姓名：角色」格式，但這些資訊已足以讓使用者瞭解這個區段主要是介紹作者和職務。

### 新增製表資料區段

最後一個區段就是用來顯示特定產品數據的簡表。

請在需要顯示表列式資料時 (例如格狀資訊) 才使用表格。

{% include_code src=_code/addcontent.html snippet=section3 %}

### 新增頁尾

大多數網站都需要頁尾來顯示不必出現在主要導覽或網業主要內容區域的資訊，例如《條款及細則》、免責聲明和其他內容。

在我們的網站中，我們會提供《條款及細則》、聯絡資訊網頁和社交媒體個人資料頁面的連結。

{% include_code src=_code/addcontent.html snippet=footer %}

## 摘要

到目前為止，我們已建立了網站的雛型，並確定了所有的主要架構元素。此外，我們也確認所有相關內容都已就緒，可符合我們的業務需求。

<div class="mdl-grid">
  <img class="mdl-cell mdl-cell--6--col" src="images/content.png" alt="內容">
  <img  class="mdl-cell mdl-cell--6--col" src="images/narrowsite.png" alt="">
</div>

您也許注意到網頁外觀目前有些慘不忍睹，但我們是刻意的。 
對任何網站來說，內容絕對是最重要的一環。因此，我們必須先確認網站的資訊架構穩固且紮實。 這份指南協助我們打好了地基。 在下一份指南中，我們將要為內容好好包裝一番。



