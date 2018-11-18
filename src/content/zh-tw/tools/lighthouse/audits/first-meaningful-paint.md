project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:“首次有效繪製”Lighthouse 審查的參考文檔。

{# wf_updated_on: 2016-10-05 #}
{# wf_published_on: 2016-10-05 #}

# 首次有效繪製 {: .page-title }

## 爲什麼說此審查非常重要 {: #why }

頁面加載對用戶如何看待對您的頁面性能起着關鍵作用。
如需瞭解詳細信息，請參閱[使用 RAIL 方法測量性能](/web/fundamentals/performance/rail)。

此審查可確定用戶感覺到頁面主要內容處於可見狀態的時間。


## 如何通過此審查 {: #how }

“首次有效繪製”分數越低，頁面顯示其主要內容的速度就越快。


[優化關鍵渲染路徑](/web/fundamentals/performance/critical-rendering-path/)對於實現更快的首次有效繪製非常有幫助。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

首次有效繪製至關重要，在該繪製後，將發生最重大的首屏佈局變更，並加載網絡字體。
請參閱以下規範以瞭解更多信息：[首次有效繪製：一個基於佈局的方法](https://docs.google.com/document/d/1BR94tJdZLsin5poeet0XoTW60M0SjvOJQttKT-JK8HI/view)。


{# wf_devsite_translation #}
