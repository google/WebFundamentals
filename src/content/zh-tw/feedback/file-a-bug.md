project_path: /web/feedback/_project.yaml
book_path: /web/feedback/_book.yaml

{# wf_updated_on: 2016-10-24 #}
{# wf_published_on: 2016-10-24 #}

# 如何提交一個好的漏洞 {: .page-title }

回報一個好的漏洞並不難，但是需要花點功力。回報漏洞的目的是為了快速找出壞掉的地方，找出根本的原因，最重要的找出修復的方法。容易修復的漏洞通常可以簡單地重現，並且有明確的行為。


## 其他人也有一樣的問題嗎？

如果你遇到問題，很有可能其他開發者也會遇到。試著在 [Stack Overflow](http://stackoverflow.com/) 上面搜尋看看漏洞，也許可以幫助你把抽象的問題描述成具體壞掉的 API，甚至可能可以找到暫時的解決方案。

當你發現漏洞是什麼的時候，到 [browser bug searcher](/web/feedback/) 上面搜尋。如果你發現有已經存在的漏洞和你遇到的問題相同，按下關注、喜歡、或是在下面留言會更有幫助。
如果你沒有找到一樣的問題，那就是回報漏洞的時間了。

## 正確的行為是什麼？

第一步要做的是找出「正確」的行為應該是什麼。

試著在 [MDN](https://developer.mozilla.org/) 上面找尋相關的 API 文件，或是找尋相關的規範。尋找到的資訊可以幫助你確定哪個 API 是壞掉的、壞在哪裡、以及原先正常的行為是什麼。

### 這個行為在其他瀏覽器上面一樣嗎？

在不同瀏覽器上面的行為不同通常被視為互通性的優先問題。試著在最新版的 Chrome、Firefox、Safari 和 Edge 上面測試，可以考慮使用 [BrowserStack](https://www.browserstack.com/) 之類的工具輔助測試。

如果可能的話，檢查頁面是否刻意透過用戶代理嗅探產生不同的行為。試著在 Dev Tools > Menu > More Tools > Network conditions 把用戶代理的字串修改成其他的瀏覽器。注意：不要忘了把用戶代理設定回 Select automatically。


### 這是個退步嗎？

這個問題在以前是否是正常的，但在最近的瀏覽器發行版本壞掉了呢？
如此的「退步」可以更快速地採取行動，尤其當你提供了可以運行的版本號和壞掉的版本號。
[BrowserStack](https://www.browserstack.com/) 之類的工具可以輕鬆的檢查舊的瀏覽器版本。

如果一個問題是個退步而且可以被重現，通常照成這個問題的原因可以被快速的發掘並修復。

## 創立一個最小化的測試用例

Mozilla 有一篇很好的文章記載了如何創立一個最小化的測試用例。長話短說，雖然對問題的描述是個很棒的開始，但是能夠在錯誤裡提供演示問題連結（例如 [jsbin.com](https://jsbin.com/) 的連結更好。為了盡可能加速修復進度，演示問題的範例應該盡可能包含最短的程式碼。最短的程式碼範例是你可以爲增加你的錯誤被修復的第一件事

以下是一些最小化測試用例的技巧：

* 下載網頁，加上 `<base href="http://original.url">` 並確定錯誤在本地也存在。如果 URL 使用了 HTTPS，你可能需要一個 HTTPS 伺服器。
* 盡你所能的在各種最新版本的瀏覽器上測試本地檔案。
* 試著把所以的東西集結成一個檔案。
* 刪除程式碼（從你知道是不必要的東西開始）直到錯誤消失為止。
* 利用版本控制以便你可以保存你的進度並復原任何差錯。


### 寄存一個最小化的測試用例

如果你在找一個好的地方寄存你的最小化測試用例，下面有不少很好的選擇：

* [JSBin](https://jsbin.com)
* [JSFiddle](https://jsfiddle.net)
* [CodePen](https://codepen.io)

### 附上環境的細節

某些錯誤只能在特定的作業系統或是特定的顯示（例如低像素密度或高像素密度）上重現。務必附上任何你測試時的環境細節。

## 提交你的問題

當你有了你的最小化測試用例的時候，你已經準備好提交問題了。
前往正確的錯誤追蹤系統。

* [Chromium bugs](https://crbug.com)
* [Edge bugs](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/)
* [Mozilla bugs](https://bugzilla.mozilla.org/)
* [WebKit bugs](https://bugs.webkit.org/)
