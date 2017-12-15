project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools 中的 Styles 窗格可以檢查和修改與元素關聯的 CSS 樣式。

{# wf_updated_on: 2016-02-25 #}
{# wf_published_on: 2015-04-13 #}

# 編輯樣式 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

使用 <strong>Styles</strong> 窗格可以修改與元素關聯的 CSS 樣式。


![Styles 窗格](imgs/styles-pane.png)


### TL;DR {: .hide-from-toc }
- 利用 Styles 窗格，您可以在本地以儘可能多的方法更改 CSS，包括修改現有樣式、添加新樣式，以及爲樣式添加規則。
- 如果您希望樣式可以保持（不會在重新加載後消失），則需要將其保存到您的開發工作區中。


## 檢查應用到元素的樣式

[選擇一個元素](edit-dom#inspect-an-element)以檢查其樣式。
**Styles** 窗格可以顯示應用到選定元素的 CSS 規則，優先級從高到低：


* 頂端爲 `element.style`。這些樣式要麼直接使用樣式屬性（例如 `<p style="color:green">`）直接應用到元素，要麼在 DevTools 中應用。



* 下方是與元素匹配的任何 CSS 規則。例如，在下面的屏幕截圖中，選定元素從 `tools.css` 中定義的規則接收 `line-height:24px`。



* 再下方是繼承的樣式，其中包括與選定元素的祖先實體匹配的任何可繼承樣式規則。
例如，在下面的屏幕截圖中，選定元素從 `user agent stylesheet` 繼承 `display:list-item`。



下圖上的標籤與其下方帶編號的項目對應。

![帶標註的 Styles 窗格](/web/tools/chrome-devtools/inspect-styles/imgs/styles-annotated.png)

1. 與元素匹配的選擇器的關聯樣式。
2. [User Agent 樣式表](http://meiert.com/en/blog/20070922/user-agent-style-sheets/)清晰標記，並且在網頁上經常被 CSS 替換。
3. 已被**級聯規則**替換的規則將顯示爲帶刪除線的文本。
4. **繼承的**樣式將在“Inherited from `<NODE>`”標頭下顯示爲一組。點擊標頭中的 DOM 節點可以導航到其在 DOM 樹視圖中的位置。
（[CSS 2.1 屬性表](http://www.w3.org/TR/CSS21/propidx.html)顯示了哪些屬性是可以繼承的。）
5. 灰色的條目不是已定義的規則，而是**在運行時計算的**規則。




瞭解級聯和繼承的原理對於調試樣式至關重要。
級聯與 CSS 聲明被賦予的權重有關，權重用於確定規則在與其他規則重疊時哪些規則的優先級更高。
繼承與 HTML 元素如何從其所屬元素（祖先實體）繼承 CSS 屬性有關。
如需瞭解詳情，請參閱[有關級聯的 W3C 文檔](http://www.w3.org/TR/CSS2/cascade.html)。


## 檢查受選擇器影響的元素

在 **Styles** 窗格中將鼠標懸停在 CSS 選擇器上可以查看受該選擇器影響的所有元素。
例如，在下面的屏幕截圖中，鼠標懸停在選擇器 `.wf-tools-guide__section-link a` 上。在實時頁面中，您可以看到受選擇器影響的所有 `<a>` 元素。
 

![查看受選擇器影響的元素](imgs/selector-hover.png)

Note：此功能僅突出顯示視口中的元素；視口以外的其他元素也可能受選擇器影響。
 

## 添加、啓用和停用 CSS 類 {: #classes }

點擊 **.cls** 按鈕可以查看與當前選定元素關聯的所有 CSS 類。
從這裏，您可以執行以下操作：

* 啓用或停用當前與元素關聯的類。
* 向元素添加新類。 

![classes 窗格](imgs/classes.png)

## 編輯現有屬性名稱或值

點擊 CSS 屬性名稱或值可以對其進行編輯。在名稱或值突出顯示時，按 <kbd>Tab</kbd> 可以向前移動到下一個屬性、名稱或選擇器。

按 <kbd>Shift</kbd>+<kbd>Tab</kbd> 可以向後移動。

編輯數字式 CSS 屬性值時，可以使用下面的鍵盤快捷鍵增大和減小值：


* 使用<kbd>向上鍵</kbd>和<kbd>向下鍵</kbd>能夠以 1 爲增量增大和減小值（如果當前值介於 -1 和 1 之間，則增量爲 0.1）。
* 使用 <kbd>Alt</kbd>+<kbd>向上鍵</kbd>和 <kbd>Alt</kbd>+<kbd>向下鍵</kbd>能夠以 0.1 爲增量增大和減小值。
* 使用 <kbd>Shift</kbd>+<kbd>向上鍵</kbd>能夠以 10 爲增量增大值；使用 <kbd>Shift</kbd>+<kbd>向下鍵</kbd>能夠以 10 爲增量減小值。
* 使用 <kbd>Shift</kbd>+<kbd>Page Up</kbd>（Windows、Linux）或 <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>向上鍵</kbd> (Mac) 能夠以 100 爲增量增大值。使用 <kbd>Shift</kbd>+<kbd>Page Down</kbd>（Windows、Linux）或 <kbd>Shift</kbd>+<kbd>Function</kbd>+<kbd>向下鍵</kbd> (Mac) 能夠以 100 爲增量減小值。

 

## 添加新屬性聲明

點擊可編輯 CSS 規則中的空白處可以創建一個新聲明。
鍵入，或者將 CSS 粘貼到 **Styles** 窗格中。屬性及其值將解析並輸入到正確的字段中。


Note: 要啓用或停用樣式聲明，請選中或取消選中旁邊的複選框。

## 添加樣式規則

點擊 **New Style Rule** (![New Style Rule 按鈕](imgs/new-style-rule.png){:.inline}) 按鈕可以添加一個新的 CSS 規則。

 

點擊並按住按鈕可以選擇要向哪一個樣式表添加規則。 

## 添加或移除動態樣式（僞類）{:#pseudo-classes}

您可以在元素上手動設置動態僞類選擇器（例如 `:active`、`:focus`、`:hover` 和 `:visited`）。
 

可以通過兩種方式在元素上設置動態狀態：

* 在 **Elements** 面板內右鍵點擊某個元素，然後從菜單中選擇目標僞類，將其啓用或停用。
![右鍵點擊元素以啓用僞類選擇器](imgs/pseudoclass-rightclick.png)
  



* 在 **Elements** 面板中選擇元素，然後在 **Styles** 窗格中點擊 **:hov** 按鈕，使用複選框啓用或停用當前選定元素的選擇器。



  ![:hov 窗格](imgs/hov.png)

## 向樣式規則添加背景色或顏色

**Styles** 窗格提供了一個用於向樣式規則添加 `color` 和 `background-color` 聲明的快捷方式。


樣式規則的右下角有一個由三個點組成的圖標。您需要將鼠標懸停到樣式規則上才能看到這個圖標。


![規則集中的三點圖標](imgs/rule-set-three-dots-icon.png)

將鼠標懸停到此圖標上可以調出用於添加 `color` 聲明 (![添加 color 聲明](imgs/add-color.png){:.inline}) 或 `background-color` 聲明 (![添加 background-color 聲明](imgs/add-background-color.png){:.inline}) 的按鈕。點擊這些按鈕之一可以將聲明添加到樣式規則中。
 

## 使用 Color Picker 修改顏色 {: #color-picker }

要打開 **Color Picker**，請在 **Styles** 窗格中查找一個定義顏色的 CSS 聲明（例如 `color: blue`）。
聲明值的左側有一個帶顏色的小正方形。
正方形的顏色與聲明值匹配。
點擊小正方形可以打開 **Color Picker**。

![打開 Color Picker](imgs/open-color-picker.jpg)

您可以通過多種方式與 **Color Picker** 交互：

1. **取色器**。請參閱[取色器](#eyedropper)瞭解更多信息。
2. **當前顏色**。**當前值**的可視表示。
3. **當前值**。**當前顏色**的十六進制、RGBA 或 HSL 表示。
4. **調色板**。請參閱[調色板](#color-palettes)瞭解更多信息。
5. **着色和陰影選擇器**。
6. **色調選擇器**。
7. **不透明度選擇器**。
8. **顏色值選擇器**。點擊可以在 RGBA、HSL 和十六進制之間切換。
9. **調色板選擇器**。點擊可以選擇不同的模板。

![帶標註的 Color Picker](imgs/annotated-color-picker.jpg)

[md]: https://www.google.com/design/spec/style/color.html

### 取色器 {: #eyedropper }

點擊**取色器**按鈕將其啓用 (![啓用的取色器](imgs/eyedropper-enabled.png){:.inline})，在實時頁面上將鼠標懸停到某種顏色上，然後點擊，將當前選定的聲明值設置爲您懸停的顏色。




![取色器實例](imgs/eyedropper.jpg)

### 調色板 {: #color-palettes }

**Color Picker** 提供了下列調色板：

* **Page Colors**。一組從頁面的 CSS 自動生成的顏色。
* **Material Design**。一組符合 [Material Design 規範][md]的顏色。
* **Custom**。您選擇的任意一組顏色。DevTools 可以保存您的自定義調色板（甚至在不同的頁面間），直至您將其刪除。
 

#### 修改自定義調色板 {: #custom-color-palette }

按**加號**按鈕可以將當前顏色添加到調色板中。
點擊並按住顏色可以將其拖動到不同的位置，或者將其拖動到**垃圾桶**圖標進行刪除。
右鍵點擊顏色並選擇 **Remove color** 可以將其刪除。
選擇 **Remove all to the right** 可以刪除當前選定顏色右側的所有顏色。
右鍵點擊調色板區域中的任何位置，然後選擇 **Clear template** 可以刪除模板的所有顏色。



## 查看和編輯 CSS 自定義屬性（CSS 變量）{: #custom-properties }

您可以查看和編輯定義或使用 [CSS 自定義屬性][intro]（之前稱爲 CSS 變量）的聲明，就像查看和編輯任何其他聲明一樣。

 

自定義屬性通常在 `:root` 選擇器中[定義][def]。
要查看在 `:root` 中定義的自定義屬性，請檢查 `html` 元素。


![:root 上定義的自定義屬性](imgs/css-var-defined-on-root.png)

不過，並不一定要在 `:root` 選擇器上定義自定義屬性。如果您在其他地方定義，請在定義元素的地方檢查元素以查看定義。



您可以查看和編輯使用自定義屬性的聲明值，就像查看和編輯任何其他聲明值一樣。
 

如果您看到一個像 `var(--main-color)` 一樣的聲明值（如下面的屏幕截圖所示），則表示聲明正在使用自定義屬性。
可以像編輯任何其他聲明值一樣編輯這些值。
目前，沒有辦法跳轉到自定義屬性定義。


![使用自定義屬性](imgs/css-var-in-use.png)

[intro]: /web/updates/2016/02/css-variables-why-should-you-care
[def]: https://drafts.csswg.org/css-variables/#defining-variables

## 編輯 Sass、Less 或 Stylus

如果您在使用 Sass、Less、Stylus 或任何其他 CSS 預處理器，則在 Styles 編輯器中編輯生成的 CSS 輸出文件不會有任何作用，因爲它們不會映射到您的源代碼。

藉助 CSS 源映射，DevTools 可以將生成的文件自動映射到源代碼文件，這樣，您可以在 Sources 面板中實時編輯這些文件並查看結果，而不用離開 DevTools 或刷新頁面。 

### 預處理器工作流

在檢查樣式由生成的 CSS 文件提供的元素時，Elements 面板會顯示原始的源文件而不是生成的 CSS 文件的鏈接。

![顯示 .scss 樣式表的 Elements 面板](imgs/sass-debugging.png)

要跳轉到源文件，請執行以下操作：

1. 點擊鏈接，在 Sources 面板中打開（可編輯）源文件。
2. <kbd class="kbd">Ctrl</kbd> + **點擊**（或 <kbd class="kbd">Cmd</kbd> + **點擊**）任何 CSS 屬性名稱或值，打開源文件並跳轉到相應行。

![顯示 .scss 文件的 Sources 面板](imgs/sass-sources.png)

在 DevTools 中保存對 CSS 預處理器文件的更改時，CSS 預處理器應重新生成 CSS 文件。然後，DevTools 將重新加載新生成的 CSS 文件。

### 啓用/停用 CSS 源映射和自動重新加載

**默認情況下，CSS 源映射處於啓用狀態**。您可以選擇啓用生成的 CSS 文件的自動重新加載。要啓用 CSS 源映射和 CSS 重新重新加載，請執行以下操作：

1. 打開 DevTools 的 Settings 面板並點擊 **General**。
2. 開啓 **Enable CSS source maps** 和 **Auto-reload generated CSS**。

### 要求和問題

- DevTools 無法檢測到**在外部編輯器中進行的更改**，直至包含關聯的源文件的 Sources 標籤重新獲得焦點。
- **手動修改 Sass/LESS/其他編譯器生成的 CSS 文件**將中斷源映射關聯，直至頁面重新加載。
- **使用<a href="/web/tools/setup/setup-workflow">工作區</a>？**確保生成的 CSS 文件同時映射到工作區中。爲此，您可以查看 Sources 面板右側樹，確定 CSS 是從您的本地文件夾提供。
- **要使 DevTools 在您更改源文件時自動重新加載樣式**，必須將您的預處理器設置爲在源文件每次發生更改時都重新生成 CSS 文件。否則，您必須手動重新生成 CSS 文件並重新加載頁面才能看到更改。
- **您必須從網絡服務器訪問您的網站或應用**（不是從 **file://** 網址），服務器必須提供 CSS 文件，以及源映射 (.css.map) 和源文件 (.scss, etc.)。
- 如果您_未_使用“工作區”功能，網絡服務器還必須提供 `Last-Modified` 標頭。

在[設置 CSS 與 JS 預處理器](/web/tools/setup/setup-preprocessors)中瞭解如何設置源映射。




{# wf_devsite_translation #}
