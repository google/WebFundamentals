project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 如要打造出優異的設計、品牌宣傳、可讀性和無障礙程度，絕對不能忽視字型編排。選用網頁字型即可達成上述各項目標，甚至還有更多優點，例如文字可供使用者選取、搜尋及縮放，而且支援高 DPI。無論螢幕大小和解析度為何，都能呈現一致且清晰銳利的文字。網頁字型對於良好的設計、使用者體驗和效能是非常關鍵的一環。

{# wf_updated_on: 2014-09-29 #}
{# wf_published_on: 2014-09-19 #}

# 網頁字型最佳化 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



如要打造出優異的設計、品牌宣傳、可讀性和無障礙程度，絕對不能忽視字型編排。選用網頁字型即可達成上述各項目標，甚至還有更多優點，例如文字可供使用者選取、搜尋及縮放，而且支援高 DPI。無論螢幕大小和解析度為何，都能呈現一致且清晰銳利的文字。網頁字型對於良好的設計、使用者體驗和效能是非常關鍵的一環。


網頁字型最佳化是整體效能策略的一個關鍵部分。每個字型都是一個附加的資源，而且某些字型可能會禁止轉譯文字。不過，使用了網頁字型的網頁不一定會轉譯得比較慢。相反地，經過最佳化的字型再加上審慎的策略，明確指定在網頁上載入及套用字型的規範，即可縮減總網頁大小，並縮短網頁轉譯時間。

## 網頁字型解析

### TL;DR {: .hide-from-toc }
- Unicode 字型可包含數千種字符
- 有四種字型格式：WOFF2、WOFF、EOT、TTF
- 某些字型格式需要使用 GZIP 壓縮


網頁字型是一個字符集合，而每個字符是描述字母或字元的一個向量形狀。因此，某個特定字型檔的大小取決於兩個簡單的變數：每個字符向量路徑的複雜程度和特定字型中字符的數量。例如，Open Sans 是其中一種最流行的網頁字型，包含 897 個字符，其中包括拉丁文、希臘文、西里爾文字元。

<img src="images/glyphs.png" class="center" alt="字型字符表">

選取一種字型之後，千萬別忘了考慮哪些字元集受到支援。如果您需要將網頁內容當地語系化為多種語言，那麼您應使用可以向您的使用者提供一致的外觀和體驗的字型。例如，[Google 的 Noto 字型系列](https://www.google.com/get/noto/)就是為了支援全世界的語言所設計的。但是，請注意 Noto 的總大小 (包含所有語言在內) 達到 130 MB 以上 ZIP 下載！ 

在網路上使用字型需要細心調教的工程，以確保字型設計不會影響效能。幸好，網路平台提供了所有必要的原型，在這份指南的剩餘部分中，我們將以實際操作讓您看到如何兩全其美。

### 網頁字型格式

現在網路上使用的字型容器格式有四種：[EOT](http://en.wikipedia.org/wiki/Embedded_OpenType)、[TTF](http://en.wikipedia.org/wiki/TrueType)、[WOFF](http://en.wikipedia.org/wiki/Web_Open_Font_Format) 和 [WOFF2](http://www.w3.org/TR/WOFF2/)。不過，無論選擇的範圍多廣泛，都找不到在所有舊瀏覽器和新瀏覽器上都可以使用的單一通用格式：EOT [僅 IE 支援](http://caniuse.com/#feat=eot)，TTF 具有[部分 IE 支援](http://caniuse.com/#search=ttf)，WOFF 的支援最廣泛，但[它在許多較舊的瀏覽器中無法使用](http://caniuse.com/#feat=woff)，WOFF 2.0 支援 [對於許多瀏覽器來說還未實現](http://caniuse.com/#feat=woff2)。

那我們該怎麼辦？ 沒有在所有瀏覽器中都可以使用的單一格式，這表示我們需要交付多種格式才能提供一致的體驗：

* 將 WOFF 2.0 變體提供給支援的瀏覽器
* 將 WOFF 變體提供給大多數瀏覽器
* 將 TTF 變體提供給舊版 Android (4.4 版以下) 瀏覽器
* 將 EOT 變體提供給舊版 IE (IE9 之下) 瀏覽器
^

Note: 就技術方面來說，其實還有<a href='http://caniuse.com/svg-fonts'>SVG 字型容器</a>，但 IE 和 Firefox 從未提供支援，現在 Chrome 也不再提供支援了。因為用途不大，我們在這份指南並未加以說明。

### 透過壓縮縮減字型大小

字型是字符集合，其中每個字符是描述字母形狀的一組路徑。各個字符當然是各不相同，但儘管如此，其中仍包含可以使用 GZIP 或某個相容壓縮工具進行壓縮的許多相似資訊： 

* EOT 和 TTF 格式在預設情況下不會進行壓縮：提供這些格式時，請確認您的伺服器已設定為套用 [GZIP 壓縮](/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer#text-compression-with-gzip)。
* WOFF 具有內建壓縮，請確認您的 WOFF 壓縮工具正在使用最佳壓縮設定。
* WOFF2 使用自訂預先處理和壓縮演算法，與其他格式相較可多縮減 ~30% 的檔案大小，詳情請參閱[報告](http://www.w3.org/TR/WOFF20ER/)。

最後，值得注意的是某些字型格式包含額外的中繼資料，例如 [字型提示](http://en.wikipedia.org/wiki/Font_hinting)和[字距調整](http://en.wikipedia.org/wiki/Kerning)資訊，這些資訊在某些平台上可能不是必要的，這樣就可以進一步最佳化檔案大小。查詢您的字型壓縮工具是否有可用的最佳化選項，而如果您這樣做了，請確保您有適合的基礎架構來測試這些最佳化的字型並提供給每個特定瀏覽器，例如 Google 字型為每個字型保留 30 種以上的 最佳化變體，並會自動偵測及提供適合每種平台和瀏覽器的最佳變體。

Note: 請考慮使用 <a href='http://en.wikipedia.org/wiki/Zopfli'>Zopfli 壓縮</a>處理 EOT、TTF 和 WOFF 格式。Zopfli 是與 zlib 相容的壓縮工具，可透過 gzip 提供 ~5% 的檔案大小縮減。

## 使用 @font-face 定義字型系列

### TL;DR {: .hide-from-toc }
- 使用 format () 提示指定多種字型格式
- 對大型 unicode 字型進行子集擷取以提高效能：使用 unicode-range 子集擷取，並為較舊的瀏覽器提供手動子集擷取備援功能
- 減少風格字型變體的數量以改進網頁和文字顯示效能


使用 @font-face CSS at-rule，我們可以定義某個特定字型資源的位置、樣式特徵和應該用於哪些 Unicode 代碼點。這樣的 @font-face 聲明組合可用於建構「字型系列」，而瀏覽器將使用該系列來評估哪些字型資源需要下載並套用到目前網頁。讓我們仔細看一下具體細節。

### 格式選擇

每個 @font-face 聲明提供了字型系列的名稱，可當做多個聲明、[字型屬性](http://www.w3.org/TR/css3-fonts/#font-prop-desc) (例如樣式、粗細和延伸)，以及為字型資源指定位置優先順序清單的 [src 描述元](http://www.w3.org/TR/css3-fonts/#src-desc)的邏輯群組。


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome.woff2') format('woff2'), 
           url('/fonts/awesome.woff') format('woff'),
           url('/fonts/awesome.ttf') format('ttf'),
           url('/fonts/awesome.eot') format('eot');
    }

    @font-face {
      font-family: 'Awesome Font';
      font-style: italic;
      font-weight: 400;
      src: local('Awesome Font Italic'),
           url('/fonts/awesome-i.woff2') format('woff2'), 
           url('/fonts/awesome-i.woff') format('woff'),
           url('/fonts/awesome-i.ttf') format('ttf'),
           url('/fonts/awesome-i.eot') format('eot');
    }


首先，請注意上述示例使用兩種樣式 (normal 和 _italic_) 定義單個 _Awesome Font_ 系列，分別指向一個不同的字型資源集。同樣地，每個 `src` 描述元包含一個已排定優先順序的逗號分隔資源變體清單： 

* 透過 `local ()` 指令，我們可以參照、載入及使用本機安裝的字型。
* 透過 `url ()` 指令，我們可以載入外部字型，而且該指令可以包含一個可選的 `format ()` 提示，指示由提供的網址所參照的字型格式。

^
Note: 除非您要參照其中一種預設系統字型，使用者實際上很少將其安裝在本機，特別是行動裝置，因為使用者根本無法在行動裝置上「安裝」附加的字型。因此，請務必提供一份外部字型位置清單。

當瀏覽器確定需要的字型之後，就會依照指定的順序在提供的資源清單中反覆運算，並嘗試載入適合的資源。例如，接著上面的示例：

1. 瀏覽器執行網頁版面配置，並確定需要哪些字型變體在網頁上呈現指定的文字。
2. 對於每種需要的字型，瀏覽器會檢查本機是否可使用這個字型。
3. 如果檔案無法在本機使用，就會在外部定義上反覆運算：
  * 如果有格式提示，那麼瀏覽器會在啟動下載之前檢查是否支援格式提示，否則會跳到下一個格式提示。
  * 如果沒有任何格式提示，那麼瀏覽器將下載資源。

使用具有適當格式提示的本地和外部指令的組合，我們只要指定所有可用的字型格式，其他的事務就交給瀏覽器處理：瀏覽器會確定需要哪些資源，並代表我們選擇最佳格式。

Note: 指定的字型變體的順序很重要。瀏覽器將選取支援的第一種格式。因此，如果您希望較新的瀏覽器使用 WOFF2，那麼您應該將 WOFF2 聲明置於 WOFF 之上，以此類推。

### Unicode-range 子集擷取

除了樣式、粗細和延伸等字型屬性之外，我們可以使用 @font-face 規則，定義每個資源支援的一組 Unicode 代碼點。這使我們能夠將一個大型 Unicode 字型劃分為較小的子集 (例如，拉丁文、西里爾文、希臘文子集)，並且僅下載在特定網頁上呈現文字所需的字符。

使用 [unicode-range 描述元](http://www.w3.org/TR/css3-fonts/#descdef-unicode-range)，我們可以指定一個範圍值的逗號分隔清單，每個值可以採用以下其中一種不同的形式：

* 單一代碼點 (例如 U+416)
* 間隔範圍 (例如 U+400-4ff)：指示範圍的開始代碼點和結束代碼點
* 萬用字元範圍 (例如 U+4??): '?' 字元指示任何十六進位數位

例如，我們可以將我們的 _Awesome Font_ 系列劃分為拉丁文和日文子集，瀏覽器會視需要下載其中的子集： 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-jp.woff2') format('woff2'), 
           url('/fonts/awesome-jp.woff') format('woff'),
           url('/fonts/awesome-jp.ttf') format('ttf'),
           url('/fonts/awesome-jp.eot') format('eot');
      unicode-range: U+3000-9FFF, U+ff??; /* Japanese glyphs */
    }
    

Note: Unicode-range 子集內嵌對於亞洲語言特別重要，在亞洲語言中，字符的數量要比西方語言中多得多，一種典型的「完整」字型經常以 MB 來衡量，而不是數十 KB！

透過使用 unicode range 子集以及為字型的每種樣式變體使用單獨的檔案，我們可以定義一個複合字型系列，該系列下載起來更快、更有效。訪客只需要下載變體及變體所需的子集，系統不會強制他們下載網頁上不會看到或使用的子集。

話說回來，unicode-range 也有一個小缺點：[目前並非所有瀏覽器都支援](http://caniuse.com/#feat=font-unicode-range)。某些瀏覽器會直接忽略 unicode-range 提示並下載所有變體，而其他瀏覽器可能根本不會處理 @font-face 聲明。要解決此問題，對於舊版瀏覽器，我們需要退一步採用「手動子集擷取」的方式。

因為舊版瀏覽器還不夠聰明，無法單單選擇必要的子集，並且無法建構複合字型，我們必須改為提供包含所有必要子集的單一字型資源，並從瀏覽器隱藏剩餘子集。例如，如果網頁僅使用拉丁文字元，那麼我們可以除去其他字符並將該特定子集當做一個獨立資源提供。

1. **我們如何確定需要哪些子集？** 
  - 如果瀏覽器支援 unicode-range 子集擷取，那麼瀏覽器將自動選擇正確的子集。該網頁僅需要提供子集檔並在 @font-face 規則中指定相應的 unicode-range。
  - 如果不支援 unicode-range，那麼網頁需要隱藏所有不必要的子集，這表示開發人員必須指定需要的子集。
2. **我們如何產生字型子集？**
  - 使用 open-source [pyftsubset 工具] (https://github.com/behdad/fonttools/blob/master/Lib/fontTools/subset.py#L16)  對您的字型進行子集擷取和最佳化。
  - 某些字型服務允許透過自訂查詢參數進行手動子集擷取，您可以使用這些參數手動指定您的網頁需要的子集。詳情請參閱字型供應商的文件。


### 字型選擇與合成

總之，每個字型系列由多個樣式變體 (正常、粗體、傾斜) 和適用於每個樣式的多個粗細組成，其中每個粗細可能包含非常不同的字符形狀，例如不同的間距、大小調整或一個不同的形狀。

<img src="images/font-weights.png" class="center" alt="字型粗細">

舉例來說，上述示意圖說明了提供三種不同粗細的一個字型系列：400 (正常)、700 (粗體) 和 900 (特粗體)。所有其他中間變體 (以灰色指示) 會由瀏覽器自動映射到最近的變體。

<div class="quote">
  <div class="container">
    <blockquote>如果指定的某個粗細不存在任何字型，則會使用相近粗細的字型。通常，加粗粗細會對應到較粗的字型，而較細粗細會對應到較細的字型。
    <p><a href="http://www.w3.org/TR/css3-fonts/#font-matching-algorithm">CSS3 字型比對演算法</a></p>
    </blockquote>
  </div>
</div>

相似的邏輯適用於 _italic_ 變體。字型設計師決定他們要產生哪些變體，而我們則可以控制要在網頁上使用哪些變體。由於每個變體是一個單獨的下載，所以盡量保持較少的變體數量比較好！ 例如，我們可以為 _Awesome Font_ 系列定義兩種加粗變體： 


    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 400;
      src: local('Awesome Font'),
           url('/fonts/awesome-l.woff2') format('woff2'), 
           url('/fonts/awesome-l.woff') format('woff'),
           url('/fonts/awesome-l.ttf') format('ttf'),
           url('/fonts/awesome-l.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    
    @font-face {
      font-family: 'Awesome Font';
      font-style: normal;
      font-weight: 700;
      src: local('Awesome Font'),
           url('/fonts/awesome-l-700.woff2') format('woff2'), 
           url('/fonts/awesome-l-700.woff') format('woff'),
           url('/fonts/awesome-l-700.ttf') format('ttf'),
           url('/fonts/awesome-l-700.eot') format('eot');
      unicode-range: U+000-5FF; /* Latin glyphs */
    }
    

上面的示例聲明了 _Awesome Font_ 系列，該系列由兩個資源組成，這兩個資源涵蓋同一組拉丁文字符 (U+000-5FF) 但提供兩種不同的「粗細」：正常 (400) 和粗體 (700)。但是，如果我們的其中一個 CSS 規則指定了一種不同的字型粗細，或者將字型樣式屬性設定為斜體，那麼會怎麼樣？

* 如果找不到精確相符的字型，瀏覽器將以最相近的字型代替。
* 如果找不到任何樣式相符的結果 (例如，我們沒有在上面的示例中聲明任何傾斜變體)，那麼瀏覽器將自行合成字型變體。

<img src="images/font-synthesis.png" class="center" alt="字型合成">

<div class="quote">
  <div class="container">
    <blockquote>字型建立者也應該知道西里爾文這類的文字並不適合透過合成的過程產生，因為在這些文字中，斜體形式非常與眾不同。使用某種實際的傾斜字型總是比依賴某個合成版本還要理想。
    <p><a href="http://www.w3.org/TR/css3-fonts/#propdef-font-style">CSS3 font-style</a></p>
    </blockquote>
  </div>
</div>

上面的示例說明了 Open-Sans 的實際字型與合成字型結果之間的不同，所有合成變體都是從單個 400 粗細字型產生的。您也可以看出來，結果存在顯著差異。此處並未詳細說明如何產生加粗和傾斜變體。因此，瀏覽器不同，結果將會有差異，而且結果還會與字型高度相關。

Note: 為獲得最好的一致性和視覺效果，請勿依賴字型合成。相反地，請儘量使用最少的字型變體並指定其位置，這樣當網頁使用這些字型時，瀏覽器才可以下載。話說回來，在某些情況下，某個合成的變體<a href='https://www.igvita.com/2014/09/16/optimizing-webfont-selection-and-synthesis/'>可能是可行的選擇</a>，但請小心使用。


## 最佳化載入和轉譯

### TL;DR {: .hide-from-toc }
- 轉譯樹狀結構建構完成之前，會先延遲字型請求，這可能會導致文字延遲顯示
- 透過 Font Loading API，我們可以執行自訂字型載入和轉譯策略，覆寫預設的延遲載入字型機制
- 透過字型內嵌，我們可以覆寫舊版瀏覽器的延遲載入字型機制


一個「完整」網頁字型包括我們可能並不需要的所有樣式變體，加上可能不會使用的所有字符，這很容易就會產生一好幾 MB 的下載檔案。@font-face CSS 規則是專為解決這個問題而設計的。我們可以使用該規則將字型系列劃分為一個資源集合：unicode 子集、不同的樣式變體等。

有了這些聲明後，瀏覽器即可瞭解所需子集和變體，並下載轉譯文字所需的最小子集。這個行為非常方便，但如果我們不小心，它也可能會在關鍵轉譯路徑中產生效能瓶頸並延遲文字轉譯，我們當然希望避免這類情況。

### 網頁字型和關鍵轉譯路徑

字型的延遲載入蘊藏可能會延遲文字轉譯的重要隱藏含義：瀏覽器必須 [建構轉譯樹狀結構](/web/fundamentals/performance/critical-rendering-path/render-tree-construction)，而這有賴於 DOM 和 CSSOM 樹狀結構，在此之後，它將知道需要哪些字型資源來呈現文字。因此，字型請求會延遲到其他關鍵資源之後，並且在取回資源之前可能會禁止瀏覽器轉譯文字。

<img src="images/font-crp.png" class="center" alt="字型關鍵轉譯路徑">

1. 瀏覽器請求 HTML 文件
2. 瀏覽器開始解析 HTML 回應並構造 DOM
3. 瀏覽器發現 CSS、JS 和其他資源並分派請求
4. 收到所有 CSS 內容之後，瀏覽器會立即構造 CSSOM，並將其與 DOM 樹狀結構組合到一起來構造轉譯樹狀結構
  * 在轉譯樹狀結構指明需要哪些字型變體來呈現網頁上的指定文字之後，會立即分派字型請求
5. 瀏覽器執行版面配置，並將內容繪製到螢幕上
  * 如果字型還不可用，瀏覽器可能不會呈現任何文字像素
  * 字型可用之後，瀏覽器會立即繪製文字像素

網頁內容的首次繪製 (在建構轉譯樹狀結構之後可以迅速完成) 和字型資源請求之間的「比賽」產生了「空白文字問題」，這種情況下瀏覽器可能會呈現網頁版面配置而忽略任何文字。在不同瀏覽器之間實際的行為會有所不同：

* Safari 在字型下載完成之前會暫停文字呈現。
* Chrome 和 Firefox 會暫停字型呈現最多 3 秒鐘，3 秒鐘之後就會使用備用字型。字型下載完成之後，會立即使用下載的字型重新轉譯文字。
* 如果請求字型還無法使用，IE 會立即使用備用字型轉譯，並在字型下載完成之後馬上重新轉譯。

對於不同的轉譯策略，正反雙方都有很好的理由：有些人認為重新轉譯很惱人，有些人則喜歡看到即時結果，而且不介意在字型下載完成之後重新編排網頁。我們在這裡就不多加爭論了。重要的是延遲載入減少了位元組數量，而且還有可能延遲文字呈現。接下來，讓我們看一下如何可以最佳化這個行為：

### 使用 Font Loading API 將字型轉譯最佳化

[Font Loading API](http://dev.w3.org/csswg/css-font-loading/) 提供指令碼編寫介面，以定義及操控 CSS 字型外觀、追蹤其下載進度，並覆寫預設延遲載入行為。例如，如果我們確定將需要某個特定字型變體，我們可以定義並告訴瀏覽器啟動字型資源的立即擷取功能：


    var font = new FontFace("Awesome Font", "url(/fonts/awesome.woff2)", {
      style: 'normal', unicodeRange: 'U+000-5FF', weight: '400'
    });
    
    font.load(); // don't wait for render tree, initiate immediate fetch!
    
    font.ready().then(function() {
      // apply the font (which may rerender text and cause a page reflow)
      // once the font has finished downloading
      document.fonts.add(font);
      document.body.style.fontFamily = "Awesome Font, serif";
    
      // OR... by default content is hidden, and rendered once font is available
      var content = document.getElementById("content");
      content.style.visibility = "visible";
    
      // OR... apply own render strategy here... 
    });
    

而且，因為我們可以檢查字型狀態 (透過 [check () ](http://dev.w3.org/csswg/css-font-loading/#font-face-set-check) 方法) 並追蹤其下載進度，所以我們也可以為網頁上呈現的文字定義自訂策略： 

* 我們可以在字型可用之前暫停所有文字呈現。
* 我們可以為每種字型設定一個自訂逾時。
* 我們可以使用備用字型取消禁止轉譯，並在字型可用之後立即注入使用所需字型的新樣式。

最重要的是，我們還可以為網頁上的不同內容混合及比對上述策略，例如，在字型可用之前在某些部分暫停文字呈現，使用備用字型然後在字型下載完成之後重新呈現，指定不同的逾時，等等。

Note: 在某些瀏覽器中，Font Loading API <a href='http://caniuse.com/#feat=font-loading'>仍處於開發階段</a>。請考慮使用 <a href='https://github.com/bramstein/fontloader'>FontLoader polyfill</a> 或 <a href='https://github.com/typekit/webfontloader'>webfontloader 程式庫</a>以提供相似的功能，雖然這樣會因為依賴 JavaScript 而產生額外間接成本。

### 使用內嵌方式將字型轉譯最佳化

使用字型載入 API 消除「空白文字問題」的一個簡單的替代策略是將字型內容內嵌到某個 CSS 樣式表中：

* 瀏覽器會使用高優先順序自動下載具有相符媒體查詢的 CSS 樣式表，因為需要這些樣式表來構造 CSSOM。
* 將字型資料內嵌到 CSS 樣式表中會強制瀏覽器使用高優先順序下載該字型，而無需等待轉譯樹狀結構，也就是說，這可算是手動覆寫預設延遲載入行為的做法。

內嵌策略不是很靈活，不允許我們定義自訂逾時或為不同的內容呈現策略，但該策略是在所有瀏覽器上都可以使用的一個簡單而可靠的解決方案。為獲得最佳效果，請將內嵌字型分成獨立的樣式表並提供較長的 max-age。如此一來，更新 CSS 時，就不會強制訪客重新下載字型。

Note: 請謹慎使用內嵌方法！ 回想一下，@font-face 使用延遲載入行為是為了避免下載不必要的字型變體和子集。另外，透過主動式內嵌增加您的 CSS 的大小將對您的<a href='/web/fundamentals/performance/critical-rendering-path/'>關鍵轉譯路徑</a>產生負面影響 - 瀏覽器必須首先下載所有 CSS，然後才可以構造 CSSOM，建構轉譯樹狀結構，並將網頁內容呈現到螢幕。

### 使用 HTTP 快取將字型重複使用最佳化

字型資源通常是不會頻繁更新的靜態資源。因此，它們非常適合設定較長的 max-age 期限。請務必為所有字型資源同時指定[條件 ETag 標題](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#validating-cached-responses-with-etags)和[最佳 Cache-Control 策略](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)。
    
您不需要在 localStorage 中或透過其他機制儲存字型，因為每種字型都有個別的效能缺陷。當瀏覽器的 HTTP 快取與 Font Loading API 或 webfontloader 程式庫相結合時，可提供最優異可靠的機制來為瀏覽器傳送字型資源。


## 最佳化檢查表

與普遍的看法相反，網頁字型的使用不需要延遲網頁呈現，也不會對其他效能指標有負面影響。字型的最佳化使用可以提供一種整體更好的使用者體驗：良好的品牌塑造，改進的可讀性、可用性和可搜尋性，始終提供一種可擴展的多解析度解決方案，該解決方案可以很好地適應所有螢幕格式和解析度。不要害怕使用網頁字型！ 

這就是說，缺乏經驗的實施可能會招致大的下載和不必要的延遲。這是我們需要清理我們的最佳化工具包並幫助瀏覽器之處，方法是透過最佳化字型資產本身及在我們的網頁上取回和使用它們的方式。

1. **查核及監控您的字型使用情況：** 請勿在您的網頁上使用過多字型。對於每種字型，也請儘量使用最少的變體。這有助您為使用者提供更加一致且快速的體驗。
2. **對您的字型資源進行子集擷取：** 許多字型可以進行子集擷取或劃分為多個 unicode-range，方便只交付某個特定網頁需要的字符，如此即可縮減檔案大小並加快資源的下載速度。但是，在定義子集時，請小心最佳化字型重新使用，例如，您不需要在每個網頁上下載一種不同但重疊的字元集。一個比較好的做法是根據指令碼進行子集擷取，例如拉丁文、西里爾文等。
3. **為每個瀏覽器交付最佳化的字型格式：** 每種字型都應以 WOFF2、WOFF、EOT 和 TTF 格式提供。請務必向 EOT 和 TTF 格式套用 GZIP 壓縮，因為在預設情況下並不會進行壓縮。
4. **指定重新驗證和最佳快取策略：** 字型是不經常更新的靜態資源。確保您的伺服器提供一個較長的 max-age 時間戳記和一個重新驗證權杖，以允許在不同網頁之間有效的字型重複使用。
5. **使用 Font Loading API 來最佳化關鍵轉譯路徑：** 預設延遲載入行為可能會導致文字呈現延遲。對於特定字型，我們可以透過 Font Loading API 覆寫這個行為，並為網頁上不同的內容指定自訂轉譯和逾時策略。對於不支援 API 的較舊瀏覽器，您可以使用 webfontloader JavaScript 程式庫或使用 CSS 內嵌策略。


