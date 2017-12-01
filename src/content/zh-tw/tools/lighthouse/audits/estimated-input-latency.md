project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“預計輸入延遲時間”Lighthouse 審查的參考文檔。

{# wf_updated_on:2016-10-05 #}
{# wf_published_on:2016-10-05 #}

# 預計輸入延遲時間 {: .page-title }

## 爲什麼說此審查非常重要{: #why }

輸入響應能力對用戶如何看待您應用的性能起着關鍵作用。
應用有 100 毫秒的時間響應用戶輸入。如果超過此時間，用戶就會認爲應用反應遲緩。
如需瞭解詳細信息，請參閱[使用 RAIL 模型測量性能](/web/fundamentals/performance/rail)。


有關爲什麼此審查測試的目標得分是 50 毫秒（而不是 RAIL 模型建議的 100 毫秒）的解釋，請參閱本文檔的[此審查測試的目的](#what)部分。



## 如何通過此審查{: #how }

要使您的應用更快地響應用戶輸入，您需要優化您的代碼在瀏覽器中的運行方式。
請查看[渲染性能](/web/fundamentals/performance/rendering/)文檔中列出的一系列技巧。這些技巧包括將計算轉移到網絡工作線程以騰出主線程、重構 CSS 選擇器以執行較少的計算，以及使用 CSS 屬性，其可將瀏覽器密集型的操作數降至最低。




對於此審查，需要特別注意的一點是它不能完整測量輸入延遲時間。
正如本文檔的[此審查測試的目的](#what)部分所述，此審查不會測量您的應用真正花了多少時間來響應用戶輸入。換句話說，它不會測量您的應用對用戶輸入的響應在視覺上是否完整。


要手動對此進行測量，請使用 Chrome DevTools Timeline 進行錄音。
請參閱[如何使用 Timeline 工具](/web/tools/chrome-devtools/evaluate-performance/timeline-tool)以獲取更多幫助。

基本思路是啓動一個錄製、執行您要測量的用戶輸入、停止錄製，然後分析火焰圖以確保[像素管道](/web/fundamentals/performance/rendering/#the_pixel_pipeline)的所有階段都在 50 毫秒內完成。





{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

RAIL 性能模型建議應用在 100 毫秒內響應用戶輸入，而 Lighthouse 的目標得分是 50 毫秒。
爲什麼呢？

原因是 Lighthouse 使用一個代理指標來測量您的應用在響應用戶輸入方面的表現：主線程的可用性。
Lighthouse 假定您的應用需要 50 毫秒的時間來完全響應用戶的輸入（從實現任意 JavaScript 執行到以物理方式將新像素繪製到屏幕）。


如果主線程的不可用時間達 50 毫秒或更長，那麼，您的應用將沒有足夠的時間完成響應。


用戶遇到 Lighthouse 報告的輸入延遲時間的可能性爲 90% 或以下。
10% 的用戶會出現額外的延遲。



{# wf_devsite_translation #}
