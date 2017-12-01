project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:應用安裝橫幅有兩種：網絡應用安裝橫幅和本機應用安裝橫幅。這兩種應用安裝橫幅讓您的用戶可以快速無縫地將您的網絡或本機應用添加到他們的主屏幕，無需退出瀏覽器。

{# wf_updated_on:2017-09-27 #}
{# wf_published_on:2014-12-16 #}

# 網絡應用安裝橫幅 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}
{% include "web/_shared/contributors/paulkinlan.html" %}

<div class="attempt-right">
  <figure>
    <img src="images/add-to-home-screen.gif" alt="網絡應用安裝橫幅">
  </figure>
</div>

應用安裝橫幅有兩種：**網絡**應用安裝橫幅和[**本機**](native-app-install)應用安裝橫幅。
這兩種應用安裝橫幅讓您的用戶可以快速無縫地將您的網絡或本機應用添加到他們的主屏幕，無需退出瀏覽器。

添加應用安裝橫幅很輕鬆，Chrome 會爲您處理大部分的繁重工作。
您需要在您的網站中添加一個包含您的應用詳細信息的網絡應用清單文件。


然後，Chrome 使用一組條件和訪問頻率啓發式算法來確定何時顯示橫幅。
請繼續閱讀以瞭解更多詳情。

注：Add to Homescreen（有時縮寫爲 A2HS）是網絡應用安裝橫幅的另一個名稱。兩個術語相等同。

### 條件有哪些？

Chrome 將在您的應用符合以下條件時自動顯示橫幅：


* 擁有一個[網絡應用清單](../web-app-manifest/)文件，該文件具有：
    - 一個 `short_name`（用於主屏幕）
    - 一個 `name`（用於橫幅中）
    - 一個 192x192 png 圖標（圖標聲明必須包含一個 mime 類型的 `image/png`）
    - 一個加載的 `start_url`
* 擁有一個在您的網站上註冊的[服務工作線程](/web/fundamentals/getting-started/primers/service-workers)。
* 通過 [HTTPS](/web/fundamentals/security/encrypt-in-transit/why-https) 提供（這是使用服務工作線程的一項要求）。
* 被訪問至少兩次，這兩次訪問至少間隔五分鐘。

注：網絡應用安裝橫幅是一種新興技術。顯示應用安裝橫幅的條件將來可能會有所變化。請參閱[究竟是什麼造就了 Progressive Web App？](https://infrequently.org/2016/09/what-exactly-makes-something-a-progressive-web-app/)，瞭解最新網絡應用安裝橫幅條件中的規範引用（將隨時間推移不斷更新）。

### 測試應用安裝橫幅 {: #test }

設置網絡應用清單後，您會想要驗證它是否已正確定義。
有兩種方法供您選擇。一種是手動，另一種是自動。


要手動觸發應用安裝橫幅，請執行以下操作：

1. 打開 Chrome DevTools。
2. 轉到 **Application** 面板。
3. 轉到 **Manifest** 標籤。
4. 點擊下面屏幕截圖中紅色突出顯示部分的 **Add to homescreen**。

![DevTools 上的“Add to homescreen”按鈕](images/devtools-a2hs.png)

請參閱[模擬“Add to Homescreen”事件](/web/tools/chrome-devtools/progressive-web-apps#add-to-homescreen)，獲取更多幫助。



要實現應用安裝橫幅的自動化測試，請使用 Lighthouse。Lighthouse 是一個網絡應用審覈工具。
您可以將其作爲 Chrome 擴展程序或 NPM 模塊運行。
要測試您的應用，您需要爲 Lighthouse 提供要審覈的特定頁面。
Lighthouse 會對此頁面運行一套審覈，然後以報告形式顯示結果。


下面屏幕截圖中的兩套 Lighthouse 審覈顯示了您的頁面需要通過才能顯示應用安裝橫幅的所有測試。


![Lighthouse 的應用安裝審覈](images/lighthouse-a2hs.png)

請參閱[使用 Lighthouse 審查網絡應用](/web/tools/lighthouse/)，開始使用 Lighthouse。


## 應用安裝橫幅事件

Chrome 提供一個簡單的機制，用於確定用戶如何響應應用安裝橫幅，甚至可以取消或延遲應用安裝橫幅以等待一個更方便的時間。


### 用戶是否安裝了此應用？

`beforeinstallprompt` 事件返回一個名爲 `userChoice` 的 promise，並當用戶對提示進行操作時進行解析。
promise 會對 `outcome` 屬性返回一個值爲 `dismissed` 或 `accepted` 的對象，如果用戶將網頁添加到主屏幕，則返回後者。



    window.addEventListener('beforeinstallprompt', function(e) {
      // beforeinstallprompt Event fired
      
      // e.userChoice will return a Promise. 
      // For more details read: https://developers.google.com/web/fundamentals/getting-started/primers/promises
      e.userChoice.then(function(choiceResult) {
        
        console.log(choiceResult.outcome);
        
        if(choiceResult.outcome == 'dismissed') {
          console.log('User cancelled home screen install');
        }
        else {
          console.log('User added to home screen');
        }
      });
    });
    

利用此工具，可以很好地瞭解您的用戶如何與應用安裝提示進行互動。



### 延遲或取消提示

Chrome 可管理觸發提示的時間，但對於部分網站而言，這可能不是理想的做法。
您可以在應用使用中延遲觸發提示的時間，或甚至取消它。
 

當 Chrome 決定提示用戶安裝應用時，您可以阻止默認操作，並存儲此事件以便稍後使用。
然後，當用戶與您的網站進行積極互動時，您可以通過對存儲的事件調用 `prompt()` 重新觸發提示。

 

這將使 Chrome 顯示橫幅和所有 Promise 屬性，例如，您可綁定到 `userChoice`，以便您可以瞭解用戶進行的操作。
    var deferredPrompt;
    window.addEventListener('beforeinstallprompt', function(e) {
    
      console.log('beforeinstallprompt Event fired');
    
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      
      return false;
    });
      
    btnSave.addEventListener('click', function() {
      if(deferredPrompt !== undefined) {
    
        // The user has had a postive interaction with our app and Chrome
        // has tried to prompt previously, so let's show the prompt.
        deferredPrompt.prompt();
        // Follow what the user has done with the prompt.
        deferredPrompt.userChoice.then(function(choiceResult) {
      
          console.log(choiceResult.outcome);
          if(choiceResult.outcome == 'dismissed') {
      
            console.log('User cancelled home screen install');
          
          }
          else {
            console.log('User added to home screen');
          }
          // We no longer need the prompt.  Clear it up.
          deferredPrompt = null;
        });
      }
    });
    

或者，您可以通過阻止默認值取消提示框。

    window.addEventListener('beforeinstallprompt', function(e) {
      console.log('beforeinstallprompt Event fired');
      e.preventDefault();
      return false;
    });
    
## Native app install banners

<div class="attempt-right">
  <figure>
     <img src="images/native-app-install-banner.gif" alt="本機應用安裝橫幅" style="max-height: 500px">
  </figure>
</div>

本機應用安裝橫幅類似於[網絡應用安裝橫幅](.)，它們可以讓用戶無需離開網站即可安裝您的本機應用，而不用將應用添加到主屏幕。



### 顯示橫幅的條件

除了需要服務工作線程外，條件類似於網絡應用安裝橫幅。
您的網站必須滿足以下條件：

* 擁有一個[網絡應用清單](../web-app-manifest/)文件，該文件具有：
  - 一個 `short_name`
  - 一個 `name`（用於橫幅提示中）
  - 一個 192x192 png 圖標，您的圖標聲明應包括 mime 類型的 `image/png`
  - 一個包含應用相關信息的 `related_applications` 對象
* 通過 [HTTPS](/web/fundamentals/security/encrypt-in-transit/enable-https) 提供
* 在兩週課程期間，由用戶在兩天訪問兩次。


### 清單要求

要集成到任何清單中，請添加一個包含 `play` 平臺（針對 Google Play）和應用 ID 的 `related_applications` 數組。



    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]
    

如果只是想要用戶可以安裝您的 Android 應用，而不顯示網絡應用安裝橫幅，那麼請添加 `"prefer_related_applications": true`。

例如：


    "prefer_related_applications": true,
    "related_applications": [
      {
      "platform": "play",
      "id": "com.google.samples.apps.iosched"
      }
    ]


{# wf_devsite_translation #}
