project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 無論是小螢幕手機或是大螢幕電視，使用者都能透過各式各類的裝置造訪網站。 快來瞭解如何打造適用於所有裝置的網站。

{# wf_updated_on: 2014-01-05 #}
{# wf_published_on: 2013-12-31 #}

# 您的第一個多裝置網站 {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}



其實，打造適用於多種裝置的網站並不困難。 我們將會依照這份指南，為 <a href='https://www.udacity.com/course/mobile-web-development--cs256'>CS256 行動網站開發課程</a>打造適用於所有不同裝置類型的產品到達網頁示例。

<img src="images/finaloutput-2x.jpg" alt="多種裝置顯示專案完成後的樣貌">

說到要為多種裝置打造功能多樣、可隨螢幕大小調整並具備互動方法的網站，不僅讓人眼冒金星，而且第一步似乎無法跨越。

其實，要打造功能完善的回應式網站並沒有想像中那麼困難。為了證明這一點，這份指南會帶您逐漸邁出成功的第一步。  我們將整個程序分為兩個步驟：

1.  定義資訊架構 (通常簡稱為 IA) 和網頁架構  
2.  加入設計元素，讓網頁在所有裝置上都能靈活回應並讓人目不轉睛。




## 建立內容和架構 




對任何網站來說，內容絕對是最重要的一環。 在設計網站時，我們必須秉持內容至上的原則，而不是讓設計喧賓奪主。 在這份指南中，首先我們會找出所需的內容，並依據內容建立網頁架構，然後再以寬窄檢視區都適用的簡單線性版面配置呈現網頁。


### 建立網頁結構

我們已確定所需內容：

1.  簡介「CS256：行動網路開發」課程的區域
2.  收集對我們產品感興趣的使用者資訊的表單
3.  深入說明和影片
4.  產品實際運作的圖片
5.  包含可驗證相關要求資訊的資料表

### TL;DR {: .hide-from-toc }
- 先找出所需的內容。
- 草擬寬窄檢視區都適用的資訊架構 (IA)。
- 建立網頁內容骨架圖 (還不需加上樣式)。


我們也已草擬一份寬窄檢視區都適用的資訊架構和版面配置。

<div class="attempt-left">
  <figure>
    <img src="images/narrowviewport.png" alt="Narrow Viewport IA">
    <figcaption>
      Narrow Viewport IA
     </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img src="images/wideviewport.png" alt="Wide Viewport IA">
    <figcaption>
      Wide Viewport IA
     </figcaption>
  </figure>
</div>

這份文件可輕鬆轉換成網頁骨架中的粗略區段，後續在這個專案中都會用到。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addstructure.html" region_tag="structure" adjust_indentation="auto" %}
</pre>

### 將內容新增到網頁

網站的基本架構已完成。 我們知道所需的區段、其中要顯示的內容，以及內容在整體資訊架構中的位置。 現在就讓我們著手打造網站吧！

Note: 樣式以後還會來

#### 建立標題和表單

對於我們的網頁來說，標題和要求通知表單是不可或缺的要素， 因此必須立即向使用者顯示。

在標題中，請簡單描述課程內容：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addheadline.html" region_tag="headline" adjust_indentation="auto" %}
</pre>

我們也需要填寫表單。
這份簡易表單必須收集使用者姓名、電話號碼和方便我們回電的時間等資訊。

所有表單都必須具備標籤和預留位置，方便使用者聚焦於表單元素、瞭解應填入何種資訊，並可讓協助工具瞭解扁擔架構。名稱屬性不僅會將表單值傳送給伺服器，也可為瀏覽器提供重要提示，說明如何自動為使用者填寫表單資訊。

為方便使用者在行動裝置上輕鬆快速地輸入內容，我們會新增語意類型。舉例來說，當使用者輸入電話號碼時，應會看到撥號鍵盤。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addform.html" region_tag="form" adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.create-amazing-forms #}

#### 建立影片和資訊區段

內容的影片和資訊區段會包含較深入的資訊。
其中會顯示產品功能的項目符號列表，也會包含影片預留位置，讓使用者觀看產品實際運作的情形。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section1" adjust_indentation="auto" %}
</pre>

我們通常會透過影片以互動的方式說明內容，也常常使用影片示範產品使用方式或概念。

只要依照下列最佳作法，您也可輕鬆將影片整合到網站中:

*  新增 `controls` 屬性，方便使用者播放影片。
*  新增 `poster` 圖片讓使用者預覽內容。
*  依照支援的影片格式，新增多個 `<source>` 元素。
*  新增備用文字告知使用者，當無法在視窗中播放影片時，可自行下載。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addvideo.html" region_tag="video"   adjust_indentation="auto" %}
</pre>

{# include shared/related_guides.liquid inline=true list=page.related-guides.video #}

#### 建立圖片區段

沒有圖片的網站會顯得乏味。 圖片類型共有兩種：

*  內容圖片 &mdash; 穿插在內容當中的圖片，通常用來傳達額外的資訊。
*  美觀圖片 &mdash; 這類圖片的用途是美化網站，通常是背景圖片、花樣和漸層。我們將在[下一篇文章](#)詳細說明。

在我們的網頁中，圖片區段匯集了許多內容圖片。

如要有效傳達網頁涵義，絕對少不了內容圖片。 想想報紙中的圖片就不難瞭解這類圖片的重要性。 我們使用的是專案教練 Chris Wilson、Peter Lubbers 和 Sean Bennet 的圖片。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addimages.html" region_tag="images"   adjust_indentation="auto" %}
</pre>

這些圖片都已設為可放大成螢幕寬度。 這項設定非常適合檢視區較窄的裝置，但在檢視區較寬的裝置 (例如桌上型電腦)上效果較差。在探討回應式設計時，我們將會處理這項問題。

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

許多視障使用者無法看到圖片，通常需要借助螢幕閱讀器等輔助技術剖析網頁資料，才可藉由語音解讀網頁。請確認所有的內容圖片都具有包含描述字詞的 `alt` 標記，方便螢幕閱讀器為使用者朗讀。

新增 `alt` 標記時，請儘可能以最精簡的說明文字完整描述圖片。舉例來說，我們在示範中僅針對這個屬性使用了簡單的「姓名：角色」格式，但這些資訊已足以讓使用者瞭解這個區段主要是介紹作者和職務。

#### 新增製表資料區段

最後一個區段就是用來顯示特定產品數據的簡表。

請在需要顯示表列式資料時 (例如格狀資訊) 才使用表格。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="section3" adjust_indentation="auto" %}
</pre>

#### 新增頁尾

大多數網站都需要頁尾來顯示不必出現在主要導覽或網業主要內容區域的資訊，例如《條款及細則》、免責聲明和其他內容。

在我們的網站中，我們會提供《條款及細則》、聯絡資訊網頁和社交媒體個人資料頁面的連結。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/addcontent.html" region_tag="footer" adjust_indentation="auto" %}
</pre>

### 摘要

到目前為止，我們已建立了網站的雛型，並確定了所有的主要架構元素。此外，我們也確認所有相關內容都已就緒，可符合我們的業務需求。

<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="Content">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html">Content and structure</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html">Final site</a>
    </figcaption>
  </figure>
</div>

您也許注意到網頁外觀目前有些慘不忍睹，但我們是刻意的。 
對任何網站來說，內容絕對是最重要的一環。因此，我們必須先確認網站的資訊架構穩固且紮實。 這份指南協助我們打好了地基。 在下一份指南中，我們將要為內容好好包裝一番。





## 賦予網站靈活回應的能力 




無論是小螢幕手機或是大螢幕電視，使用者都能透過各式各類的裝置造訪網站。 不過，每種裝置都各有優點和限制。 網站開發人員的職責就是確保網站可以在所有裝置上正常運作。


我們正在打造適用於多種螢幕大小和裝置類型的網站。 在[previous article](#)中，我們已擬妥網頁的資訊架構並建立了基本架構。
在這份指南中，我們將沿用包含內容的基本架構，著手將網頁改造為可依多數螢幕大小靈活調整的萬人迷。

<div class="attempt-left">
  <figure>
    <img src="images/content.png" alt="Content">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-without-styles.html">Content and structure</a>
    </figcaption>
  </figure>
</div>
<div class="attempt-right">
  <figure>
    <img  src="images/narrowsite.png" alt="Designed site" style="max-width: 100%;">
    <figcaption>
      <a href="https://googlesamples.github.io/web-fundamentals/fundamentals/getting-started/your-first-multi-screen-site/content-with-styles.html">Final site</a>
    </figcaption>
  </figure>
</div>

秉持「行動裝置優先」的網站開發原則，我們先從窄檢視區 (例如手機) 著手打造優異體驗。
接下來，我們才進一步擴充到較大的裝置類別。
我們可以透過增加檢視區寬度的方式，仔細判斷設計和版面配置是否正常顯示。

稍早前，我們建立了一些高解析度的設計，做為評斷內容是否正常顯示的標準。 現在我們需要讓網頁依照不同版面配置自動調整，
方法是依據內容判斷我們應在哪裡設置中斷點 (版面配置和樣式需要變更的點)。

### TL;DR {: .hide-from-toc }
- 務必使用檢視區。
- 務必從窄檢視區開始，然後再陸續擴展。
- 視需要依據中斷點調整內容。
- 在每個主要中斷點建立版面配置概覽。


### 添加一個檢視區

即使是簡易網頁，您也**必須**納入檢視區中繼標記。
在打造多裝置體驗時，檢視區是最關鍵的一環。
如果沒有檢視區，您的網站將無法在行動裝置上正常顯示。

檢視區的作用是告知瀏覽器依據螢幕大小縮放網頁。您可以透過多項檢視區設定來控制網頁的顯示方式。我們建議您採用下列預設設定：

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/viewport.html" region_tag="viewport" adjust_indentation="auto" %}
</pre>

檢視區位於文件的開頭，而且只需要宣告一次。

{# include shared/related_guides.liquid inline=true list=page.related-guides.responsive #}

### 運用簡單的樣式

我們的樣式指南對於產品和公司的品牌和字型都有詳盡規範。

#### 樣式指南

透過樣式指南，開發人員對於網頁視覺呈現的規定即可一目瞭然，並可確保整體設計的一致性。

##### 顏色

<div class="styles" style="font-family: monospace;">
  <div style="background-color: #39b1a4">#39b1a4</div>
  <div style="background-color: white">#ffffff</div>
  <div style="background-color: #f5f5f5">#f5f5f5</div>

  <div style="background-color: #e9e9e9">#e9e9e9</div>
  <div style="background-color: #dc4d38">#dc4d38</div>
</div>

#### 添加美觀圖片

在前一份指南中，我們新增了「內容圖片」。這些圖片可襯托產品的描述內容，因此非常重要。美觀圖片則是為了吸引使用者注意特定內容區塊所加入的圖片。雖然這不是主要內容的必要項目，但可讓內容增色不少。

位於「不需捲動位置」內容的標題圖片就是一個很好的例子。 這類圖片的用意是吸引使用者進一步閱讀產品內容。

<img  src="images/narrowsite.png" alt="Designed site"  class="attempt-right" />

您可輕鬆加入這類圖片。 就我們的例子來說，我們會透過簡單的 CSS 將圖片設為標題的背景。


    #headline {
      padding: 0.8em;
      color: white;
      font-family: Roboto, sans-serif;
      background-image: url(backgroundimage.jpg);
      background-size: cover;
    }
    

為了避免圖片喧賓奪主，我們選擇了模糊處理的簡約背景圖片，然後將圖片設為 `cover` 整個元素。如此一來，每當圖片需要放大時，仍然可以保持正確的長寬比。

<br style="clear: both;">

### 設置你的第一個中斷點

當寬度為 600px 時，整個設計就開始走樣了。就我們的例子來說，每行文字的長度超過了 10 個字 (最佳閱讀的上限)，因此必須修正。

<video controls poster="images/firstbreakpoint.png" style="width: 100%;">
  <source src="videos/firstbreakpoint.mov" type="video/mov"></source>
  <source src="videos/firstbreakpoint.webm" type="video/webm"></source>
  <p>很抱歉，您的瀏覽器不支援影片。
     <a href="videos/firstbreakpoint.mov">下載影片</a>。
  </p>
</video>

對我們來說，600px 看來很適合建立第一個中斷點，因為我們可以藉此獲得理想範圍重新安排各項元素，以便更加符合螢幕大小。我們可以透過名為 [Media Queries](/web/fundamentals/design-and-ux/responsive/#use-css-media-queries-for-responsiveness)的技術輕鬆完成修正。


    @media (min-width: 600px) {
    
    }
    

較大的螢幕擁有更充裕的空間，因此顯示網頁時也會有較大的彈性。

Note: 您不需要一次移動所有元素，可視情況進行微幅調整。

就我們的產品網頁來說，看來我們需要：

*  限制設計的寬度上限
*  修改元素間隙並縮小文字大小
*  移動表單，以便讓表單隨標題內容浮動。
*  讓影片隨內容浮動。
*  縮減圖片大小，以便顯示在更美觀的範圍內。

{# include shared/related_guides.liquid inline=true list=page.related-guides.first-break-point #}

### 限制設計的寬度上限

我們僅選擇了兩種主要的版面配置 (窄檢視區和寬檢視區)，因此大幅簡化了建構程序。

此外，我們也決定在窄檢視區建立全出血區段，以便在寬檢視區也可維持全出血顯示。這表示我們必須限制螢幕的寬度上限，如此文字和段落在超寬螢幕顯示時，才不會變成連綿冗長的單行文字。我們選擇的中斷點是 800px。

為達成這項要求，我們必須限制寬度並將元素置中。我們需要在每個主要區段周圍建立容器，並套用 `margin:
auto`。 如此一來，即使螢幕變大，內容仍會維持在螢幕中心位置，且大小也不會超過 800px。

容器其實就是簡單的 `div`，格式如下:

    <div class="container">
    ...
    </div>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="containerhtml"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="container"   adjust_indentation="auto" %}
</pre>

### 修改間隙並縮小文字大小

在窄檢視區中，我們沒有太多空間可顯示內容。因此，為了讓內容符合螢幕大小，通常會縮減字型的大小和粗細。

對於寬檢視區來說，我們則必須考量使用者通常會在較遠的距離觀看大螢幕的內容。為了方便使用者閱讀內容，我們可以增加字型的大小和粗細，或是修改間隙讓重要區域更加醒目。

在我們的產品網頁中，我們會將間隙保持在寬度的 5%，藉此增加區段元素之間的空隙。我們也會增加每個區段標題的大小。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

### 依照寬檢視區調整元素

我們的窄檢視區是透過線性堆疊的方式顯示。每個主要區段和其中的內容都是從上到下依序顯示。

因為寬檢視區提供充裕的空間，我們可以透過最有效益的方式顯示內容。就我們的產品網頁來說，這表示我們可以依據 IA：

*  將表單移動到標題資訊周圍。
*  將影片放置在主要重點的右側。
*   拼貼圖片。
*   擴充表格。

#### 讓表單元素靈活浮動

因為窄檢視區的水平空間有限，我們無法隨心所欲地在螢幕上放置元素。

為了妥善運用水平螢幕空間，我們需要打破標題中的線性流程，並將表單和清單放在一起。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="formfloat"   adjust_indentation="auto" %}
</pre>

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="padding"   adjust_indentation="auto" %}
</pre>

<video controls poster="images/floatingform.png" style="width: 100%;">
  <source src="videos/floatingform.mov" type="video/mov"></source>
  <source src="videos/floatingform.webm" type="video/webm"></source>
  <p>很抱歉，您的瀏覽器不支援影片。
     <a href="videos/floatingform.mov">下載影片</a>。
  </p>
</video>

#### 讓影片元素靈活浮動

在窄檢視區中，影片介面的設計是與螢幕同寬，並位於主要功能之後。 在寬檢視區中，影片則會過大，並且在功能清單旁邊會顯得放錯地方了。

影片元素必須從窄檢視區的垂直流程移出，並與寬檢視區中的內容項目符號列表放在一起。

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="floatvideo"   adjust_indentation="auto" %}
</pre>

#### 拼貼圖片

在窄檢視區 (通常是行動裝置 ) 中，圖片介面會設為與螢幕同寬並垂直堆疊。但是，這樣的設計無法在寬檢視區正常顯示。

為了讓圖片在寬檢視區正常顯示，圖片必須縮放為容器寬度的 30%，並採水平放置 (有別於窄檢視區的垂直堆疊)。 我們也會新增邊框半徑和方塊陰影，讓圖片更具吸引力。

<img src="images/imageswide.png" style="width:100%">

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/fixingfirstbreakpoint.html" region_tag="tileimages"   adjust_indentation="auto" %}
</pre>

#### 讓圖片回應 DPI

使用圖片時，請考量檢視區大小和螢幕解析度。

網站原本是針對 96dpi 螢幕所設計。隨著行動裝置問世，我們發現螢幕解析度大幅提升，更別說筆記型電腦配備的 Retina 等級的顯示器了。因此在高 DPI 裝置上，以 96dpi 編碼的圖片通常都慘不忍睹。

我們有一個還不是廣為人知的解決方法。
對於支援高 DPI 的瀏覽器，您可以在高解析度螢幕中顯示高解析度的圖片。


    <img src="photo.png" srcset="photo@2x.png 2x">
    

{# include shared/related_guides.liquid inline=true list=page.related-guides.images #}

#### 表格

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

<pre class="prettyprint">
{% includecode content_path="web/fundamentals/codelabs/your-first-multi-screen-site/_code/content-with-styles.html" region_tag="table-css"   adjust_indentation="auto" %}
</pre>

### 總結

**恭喜！** 當您讀到這裡，您已經建立了第一個簡易的產品到達網頁，可用於多種裝置、機型和螢幕大小。

如果您遵照這些規範，就可順利踏出成功的第一步：

1.  撰寫程式碼之前，請先建立基本 IA 並瞭解您的內容。
2.  務必設定檢視區
3.  秉持行動裝置優先的原則基準體驗
4.  完成行動裝置體驗後，請增加顯示器寬度，直到版面走樣了，再設置中斷點。
5.  繼續不斷嘗試上述步驟。
