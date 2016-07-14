---
title: "賦予網站靈活回應的能力"
description: "無論是小螢幕手機或是大螢幕電視，使用者都能透過各式各類的裝置造訪網站。 快來瞭解如何打造適用於所有裝置的網站。"
key-takeaways:
  make-responsive:
    - 務必使用檢視區。
    - 務必從窄檢視區開始，然後再陸續擴展。
    - 視需要依據中斷點調整內容。
    - 在每個主要中斷點建立版面配置概覽。
translators:
related-guides:
  responsive:
    -
      title: 設定檢視區
      href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
      section:
        title: "回應式網頁設計"
        href: fundamentals/layouts/rwd-fundamentals/set-the-viewport
    -
      title: 依照檢視區大小調整內容
      href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
      section:
        id: rwd-fundamentals
        title: "回應式網頁設計"
        href: fundamentals/layouts/rwd-fundamentals/size-content-to-the-viewport
  first-break-point:
    -
      title: 使用媒體查詢
      href: fundamentals/layouts/rwd-fundamentals/use-media-queries
      section:
        id: rwd-fundamentals
        title: "回應式網頁設計"
        href: fundamentals/layouts/rwd-fundamentals/use-media-queries
    -
      title: 版面配置模式
      href: fundamentals/layouts/rwd-patterns/
      section:
        id: rwd-patterns
        title: "版面配置模式"
        href: fundamentals/layouts/rwd-patterns/
    -
      title: 最流暢版面配置
      href: fundamentals/layouts/rwd-patterns/mostly-fluid
      section:
        id: rwd-patterns
        title: "回應式網頁設計"
        href: fundamentals/layouts/rwd-patterns/mostly-fluid
  images:
    -
      title: "運用 srcset 提升 img 以在高 DPI 裝置顯示"
      href: fundamentals/media/images/images-in-markup.html#enhance-imgs-with-srcset-for-high-dpi-devices
      section:
        id: images
        title: "圖片"
        href: media/images/
    -
      title: "使用媒體查詢以提供高解析度圖片或美學指導"
      href: fundamentals/media/images/images-in-css.html#use-media-queries-for-conditional-image-loading-or-art-direction
      section:
        id: images
        title: "圖片"
        href: media/images/

notes:
  styling:
    - 我們採用了一系列符合品牌規範的顏色、補空和字型樣式。
  not-all-at-once:
    - 您不需要一次移動所有元素，可視情況進行微幅調整。
updated_on: 2014-04-23
---

<p class="intro">
  無論是小螢幕手機或是大螢幕電視，使用者都能透過各式各類的裝置造訪網站。 不過，每種裝置都各有優點和限制。 網站開發人員的職責就是確保網站可以在所有裝置上正常運作。
</p>

{% include shared/toc.liquid %}

我們正在打造適用於多種螢幕大小和裝置類型的網站。 在[previous article]({{page.previousPage.relative_url}})中，我們已擬妥網頁的資訊架構並建立了基本架構。
在這份指南中，我們將沿用包含內容的基本架構，著手將網頁改造為可依多數螢幕大小靈活調整的萬人迷。

<div class="mdl-grid">
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/content.png" alt="內容">
    <figcaption>{% link_sample _code/content-without-styles.html %} 內容和架構 {% endlink_sample %} </figcaption>
  </figure>
  <figure class="mdl-cell mdl-cell--6--col">
    <img  src="images/narrowsite.png" alt="Designed site">
    <figcaption>{% link_sample _code/content-with-styles.html %} 完成後的網站 {% endlink_sample %} </figcaption>
  </figure>
</div>

秉持「行動裝置優先」的網站開發原則，我們先從窄檢視區 (例如手機) 著手打造優異體驗。
接下來，我們才進一步擴充到較大的裝置類別。
我們可以透過增加檢視區寬度的方式，仔細判斷設計和版面配置是否正常顯示。

稍早前，我們建立了一些高解析度的設計，做為評斷內容是否正常顯示的標準。 現在我們需要讓網頁依照不同版面配置自動調整，
方法是依據內容判斷我們應在哪裡設置中斷點 (版面配置和樣式需要變更的點)。

{% include shared/takeaway.liquid list=page.key-takeaways.make-responsive %}

## 添加一個檢視區

即使是簡易網頁，您也**必須**納入檢視區中繼標記。
在打造多裝置體驗時，檢視區是最關鍵的一環。
如果沒有檢視區，您的網站將無法在行動裝置上正常顯示。

檢視區的作用是告知瀏覽器依據螢幕大小縮放網頁。您可以透過多項檢視區設定來控制網頁的顯示方式。我們建議您採用下列預設設定：

{% include_code src=_code/viewport.html snippet=viewport %}

檢視區位於文件的開頭，而且只需要宣告一次。

{% include shared/related_guides.liquid inline=true list=page.related-guides.responsive %}

## 運用簡單的樣式

我們的樣式指南對於產品和公司的品牌和字型都有詳盡規範。

### 樣式指南

透過樣式指南，開發人員對於網頁視覺呈現的規定即可一目瞭然，並可確保整體設計的一致性。

#### 顏色

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

### 添加美觀圖片

在前一份指南中，我們新增了「內容圖片」。這些圖片可襯托產品的描述內容，因此非常重要。美觀圖片則是為了吸引使用者注意特定內容區塊所加入的圖片。雖然這不是主要內容的必要項目，但可讓內容增色不少。

位於「不需捲動位置」內容的標題圖片就是一個很好的例子。 這類圖片的用意是吸引使用者進一步閱讀產品內容。

<div class="mdl-cell mdl-cell--6--col">
  <img  src="images/narrowsite.png" alt="經過設計的網站">
</div>

您可輕鬆加入這類圖片。 就我們的例子來說，我們會透過簡單的 CSS 將圖片設為標題的背景。

{% highlight css %}
#headline {
  padding: 0.8em;
  color: white;
  font-family: Roboto, sans-serif;
  background-image: url(backgroundimage.jpg);
  background-size: cover;
}
{% endhighlight %}

為了避免圖片喧賓奪主，我們選擇了模糊處理的簡約背景圖片，然後將圖片設為 `cover` 整個元素。如此一來，每當圖片需要放大時，仍然可以保持正確的長寬比。

<br style="clear: both;">

## 設置你的第一個中斷點

當寬度為 600px 時，整個設計就開始走樣了。就我們的例子來說，每行文字的長度超過了 10 個字 (最佳閱讀的上限)，因此必須修正。

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>很抱歉，您的瀏覽器不支援影片。
     <a href="videos/firstbreakpoint.mov">下載影片</a>。
  </p>
</video>

對我們來說，600px 看來很適合建立第一個中斷點，因為我們可以藉此獲得理想範圍重新安排各項元素，以便更加符合螢幕大小。我們可以透過名為 [Media Queries]({{site.fundamentals}}/layouts/rwd-fundamentals/#use-css-media-queries-for-responsiveness)的技術輕鬆完成修正。

{% highlight css %}
@media (min-width: 600px) {

}
{% endhighlight %}

較大的螢幕擁有更充裕的空間，因此顯示網頁時也會有較大的彈性。

{% include shared/remember.liquid title="Note" list=page.notes.not-all-at-once %}

就我們的產品網頁來說，看來我們需要：

*  限制設計的寬度上限
*  修改元素間隙並縮小文字大小
*  移動表單，以便讓表單隨標題內容浮動。
*  讓影片隨內容浮動。
*  縮減圖片大小，以便顯示在更美觀的範圍內。

{% include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point %}

## 限制設計的寬度上限

我們僅選擇了兩種主要的版面配置 (窄檢視區和寬檢視區)，因此大幅簡化了建構程序。

此外，我們也決定在窄檢視區建立全出血區段，以便在寬檢視區也可維持全出血顯示。這表示我們必須限制螢幕的寬度上限，如此文字和段落在超寬螢幕顯示時，才不會變成連綿冗長的單行文字。我們選擇的中斷點是 800px。

為達成這項要求，我們必須限制寬度並將元素置中。我們需要在每個主要區段周圍建立容器，並套用 `margin:
auto`。 如此一來，即使螢幕變大，內容仍會維持在螢幕中心位置，且大小也不會超過 800px。

容器其實就是簡單的 `div`，格式如下:

{% highlight html %}<div class="container">...</div>{% endhighlight %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=containerhtml lang=html %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=container lang=css %}

## 修改間隙並縮小文字大小

在窄檢視區中，我們沒有太多空間可顯示內容。因此，為了讓內容符合螢幕大小，通常會縮減字型的大小和粗細。

對於寬檢視區來說，我們則必須考量使用者通常會在較遠的距離觀看大螢幕的內容。為了方便使用者閱讀內容，我們可以增加字型的大小和粗細，或是修改間隙讓重要區域更加醒目。

在我們的產品網頁中，我們會將間隙保持在寬度的 5%，藉此增加區段元素之間的空隙。我們也會增加每個區段標題的大小。

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

## 依照寬檢視區調整元素

我們的窄檢視區是透過線性堆疊的方式顯示。每個主要區段和其中的內容都是從上到下依序顯示。

因為寬檢視區提供充裕的空間，我們可以透過最有效益的方式顯示內容。就我們的產品網頁來說，這表示我們可以依據 IA：

*  將表單移動到標題資訊周圍。
*  將影片放置在主要重點的右側。
*   拼貼圖片。
*   擴充表格。

### 讓表單元素靈活浮動

因為窄檢視區的水平空間有限，我們無法隨心所欲地在螢幕上放置元素。

為了妥善運用水平螢幕空間，我們需要打破標題中的線性流程，並將表單和清單放在一起。

{% include_code src=_code/fixingfirstbreakpoint.html snippet=formfloat lang=css %}

{% include_code src=_code/fixingfirstbreakpoint.html snippet=padding lang=css %}

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>很抱歉，您的瀏覽器不支援影片。
     <a href="videos/floatingform.mov">下載影片</a>。
  </p>
</video>

### 讓影片元素靈活浮動

在窄檢視區中，影片介面的設計是與螢幕同寬，並位於主要功能之後。 在寬檢視區中，影片則會過大，並且在功能清單旁邊會顯得放錯地方了。

影片元素必須從窄檢視區的垂直流程移出，並與寬檢視區中的內容項目符號列表放在一起。

{% include_code src=_code/fixingfirstbreakpoint.html snippet=floatvideo lang=css %}

### 拼貼圖片

在窄檢視區 (通常是行動裝置 ) 中，圖片介面會設為與螢幕同寬並垂直堆疊。但是，這樣的設計無法在寬檢視區正常顯示。

為了讓圖片在寬檢視區正常顯示，圖片必須縮放為容器寬度的 30%，並採水平放置 (有別於窄檢視區的垂直堆疊)。 我們也會新增邊框半徑和方塊陰影，讓圖片更具吸引力。

<img src="images/imageswide.png" style="width:100%">

{% include_code src=_code/fixingfirstbreakpoint.html snippet=tileimages lang=css %}

### 讓圖片回應 DPI

使用圖片時，請考量檢視區大小和螢幕解析度。

網站原本是針對 96dpi 螢幕所設計。隨著行動裝置問世，我們發現螢幕解析度大幅提升，更別說筆記型電腦配備的 Retina 等級的顯示器了。因此在高 DPI 裝置上，以 96dpi 編碼的圖片通常都慘不忍睹。

我們有一個還不是廣為人知的解決方法。
對於支援高 DPI 的瀏覽器，您可以在高解析度螢幕中顯示高解析度的圖片。

{% highlight html %}
<img src="photo.png" srcset="photo@2x.png 2x">
{% endhighlight %}

{% include shared/related_guides.liquid inline=true list=page.related-guides.images %}

### 表格

就具備窄檢視區的裝置來說，想要正確顯示表格並不容易，因此需要考量其他因素。

針對窄檢視區，我們建議您將表格分為兩列，讓標題和儲存格儲垂直排列。

<video controls poster="images/responsivetable.png" style="width: 100%;">
  <source src="videos/responsivetable.mov" type="video/mov"></source>
  <source src="videos/responsivetable.webm" type="video/webm"></source>
  <p>很抱歉，您的瀏覽器不支援影片。
     <a href="videos/responsivetable.mov">下載影片</a>。
  </p>
</video>

在我們的網站中，我們特地為表格內容設定了一個中斷點。
當您優先為行動裝置打造網站時，比較難以將套用的樣式復原，因此我們必須將窄檢視區和寬檢視區的表格 CSS 加以區隔。
如此一來，該中斷的地方都會精確一致。

{% include_code src=_code/content-with-styles.html snippet=table-css lang=css %}

## 總結

**恭喜！** 當您讀到這裡，您已經建立了第一個簡易的產品到達網頁，可用於多種裝置、機型和螢幕大小。

如果您遵照這些規範，就可順利踏出成功的第一步：

1.  撰寫程式碼之前，請先建立基本 IA 並瞭解您的內容。
2.  務必設定檢視區
3.  秉持行動裝置優先的原則基準體驗
4.  完成行動裝置體驗後，請增加顯示器寬度，直到版面走樣了，再設置中斷點。
5.  繼續不斷嘗試上述步驟。
