project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:使用 Chrome DevTools CPU 分析器識別開銷大的函數。

{# wf_updated_on:2016-03-30 #}
{# wf_published_on:2015-04-13 #}

# 加速執行 JavaScript {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

使用 Chrome DevTools CPU 分析器識別開銷大的函數。


![CPU 分析](imgs/cpu-profile.png)


### TL;DR {: .hide-from-toc }
- 使用 CPU 分析器準確地記錄調用了哪些函數和每個函數花費的時間。
- 將您的配置文件可視化爲火焰圖。


## 記錄 CPU 分析 {:#record-profile}

如果您在 JavaScript 中注意到出現卡頓，請收集 JavaScript CPU 分析。CPU 分析會顯示執行時間花費在頁面中哪些函數上。


1. 轉到 DevTools 的 **Profiles** 面板。
2. 選擇 **Collect JavaScript CPU Profile** 單選按鈕。
3. 按 **Start**。
4. 根據您要分析的內容不同，可以重新加載頁面、與頁面交互，或者只是讓頁面運行。
5. 完成後，按 **Stop** 按鈕。
 

您也可以使用 [Command Line API][profile] 對命令行產生的分析進行記錄和分組。


[profile]: /web/tools/chrome-devtools/debug/command-line/command-line-reference#profilename-and-profileendname

## 查看 CPU 分析 {:#view-profile}

完成記錄後，DevTools 會使用記錄的數據自動填充 Profile 面板。
 

默認視圖爲 **Heavy (Bottom Up)**。此視圖讓您可以看到哪些函數對性能影響最大並能夠檢查這些函數的調用路徑。

 

### 更改排序順序 {:#sort}

要更改排序順序，請點擊 **focus selected function** 圖標 (![focus selected function 圖標](imgs/focus.png){:.inline}) 旁的下拉菜單，然後選擇下列選項中的一項：




**Chart**。顯示記錄按時間順序排列的火焰圖。

![火焰圖](imgs/flamechart.png)

**Heavy (Bottom Up)**。按照函數對性能的影響列出函數，讓您可以檢查函數的調用路徑。
這是默認視圖。 

![大型圖表](imgs/heavy.png)

**Tree (Top Down)**。顯示調用結構的總體狀況，從調用堆棧的頂端開始。
 

![樹狀圖](imgs/tree.png)

### 排除函數{:#exclude}

要從您的 CPU 分析中排除函數，請點擊以選擇該函數，然後按 **exclude selected function** 圖標 (![exclude function 圖標](imgs/exclude.png){:.inline})。

已排除函數的調用方由排除函數的總時間管理。


點擊 **restore all functions** 圖標 (![restore all functions 圖標](imgs/restore.png){:.inline}) 可以將所有排除的函數恢復到記錄中。



## 以火焰圖形式查看 CPU 分析 {:#flame-chart}

火焰圖視圖直觀地表示了一段時間內的 CPU 分析。


[記錄 CPU 分析](#record-profile)後，[更改排序順序](#sort)爲 **Chart**，以便以火焰圖形式查看記錄。


![Flamechart 視圖](imgs/flamechart.png)

火焰圖分爲以下兩部分：

1. **概覽**。整個記錄的鳥瞰圖。
   條的高度與調用堆棧的深度相對應。
所以，欄越高，調用堆棧越深。 

2. **調用堆棧**。這裏可以詳細深入地查看記錄過程中調用的函數。
橫軸是時間，縱軸是調用堆棧。
堆棧由上而下組織。所以，上面的函數調用它下面的函數，以此類推。
 

   函數的顏色隨機，與其他面板中使用的顏色無關。
不過，函數的顏色在調用過程中始終保持一致，以便您瞭解執行的模式。
 

![帶標註的火焰圖](imgs/annotated-cpu-flame.png)

高調用堆棧不一定很重要，只是表示調用了大量的函數。
但寬條表示調用需要很長時間完成。
這些需要優化。 

### 在記錄的特定部分上放大 {:#zoom}

在概覽中點擊、按住並左右拖動鼠標，可放大調用堆棧的特定部分。
縮放後，調用堆棧會自動顯示您選定的記錄部分。


![縮放過的火焰圖](imgs/benchmark-zoom.png)

### 查看函數詳情 {:#flame-chart-function-details}

點擊函數可在 **Sources** 面板中查看其定義。

將鼠標懸停在函數上可顯示其名稱和計時數據。提供的信息如下：
 

*  **Name**。函數的名稱。
*  **Self time**。完成函數當前的調用所需的時間，僅包含函數本身的聲明，不包含函數調用的任何函數。
*  **Total time**。完成此函數和其調用的任何函數當前的調用所需的時間。
*  **URL**。形式爲 `file.js:100` 的函數定義的位置，其中 `file.js` 是定義函數的文件名稱，`100` 是定義的行號。
*  **Aggregated self time**。記錄中函數所有調用的總時間，不包含此函數調用的函數。
*  **Aggregated total time**。函數所有調用的總時間，不包含此函數調用的函數。
*  **Not optimized**。如果分析器已檢測出函數存在潛在的優化，會在此處列出。


![在火焰圖中查看函數詳情](imgs/details.png)


{# wf_devsite_translation #}
