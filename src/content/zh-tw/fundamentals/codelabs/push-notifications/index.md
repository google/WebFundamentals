project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:在此代碼實驗室中，您將學習如何向網絡應用添加推送通知。

{# wf_updated_on: 2018-07-23 #}
{# wf_published_on: 2016-01-01 #}


# 向網絡應用添加推送通知 {: .page-title }

{% include "web/_shared/contributors/mattgaunt.html" %}



## 概覽




推送消息提供了重新吸引用戶的簡單有效方式，在此代碼實驗室中，您將學習如何向網絡應用添加推送通知。

### 您將學習的內容

* 如何爲用戶訂閱或取消訂閱推送消息
* 如何處理進入的推送消息
* 如何顯示通知
* 如何響應通知點擊

### 您需具備的條件

* Chrome 52 或更高版本
*  [Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)，或者使用您自己選擇的網絡服務器
* 文本編輯器
* 對 HTML、CSS、JavaScript 和 Chrome DevTools 的基本瞭解
* 示例代碼，請參見“設置”


## 設置




### 下載示例代碼

您可以通過以下其中一種方式獲取此代碼實驗室的示例代碼：下載 zip 文件：

[鏈接](https://github.com/googlechrome/push-notifications/archive/master.zip)

或者克隆此 Git 存儲區：

    git clone https://github.com/GoogleChrome/push-notifications.git

如果以 zip 文件形式下載源代碼，解壓後是一個根文件夾 `push-notifications-master`。

### 安裝並驗證網絡服務器

儘管您可以使用自己的網絡服務器，但此代碼實驗室的設計只有與 Chrome Web Server 結合使用時才能正常運行。如果您尚未安裝此應用，可以從 Chrome 網上應用店安裝。

[鏈接](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)

安裝 Web Server for Chrome 後，點擊書籤欄上的 Apps 快捷方式：

![a80b29d5e878df22.png](img/a80b29d5e878df22.png)

在隨後出現的窗口中，點擊 Web Server 圖標：

![dc07bbc9fcfe7c5b.png](img/dc07bbc9fcfe7c5b.png)

接下來您將看到此對話框，您可以在其中配置本地網絡服務器：

![433870360ad308d4.png](img/433870360ad308d4.png)

點擊 __choose folder__ 按鈕，然後選擇 app 文件夾。這樣您就可以通過網絡服務器對話框（在 __Web Server URL(s)__ 部分）中突出顯示的網址爲正在進行的工作提供支持。

在 Options 下，選中“Automatically show index.html”旁邊的框，如下所示：

![39b4e0371e9703e6.png](img/39b4e0371e9703e6.png)

然後將標記爲“Web Server:STARTED”的切換按鈕向左滑動，然後向右滑動，停止並重啓服務器。

![daefd30e8a290df5.png](img/daefd30e8a290df5.png)

現在，在您的網絡瀏覽器中訪問您的網站（通過點擊突出顯示的 Web Server URL），然後您會看到如下頁面：

![4525ec369fc2ae47.png](img/4525ec369fc2ae47.png)

### 始終更新服務工作線程

在開發的過程中，非常有必要確保您的服務工作線程始終保持最新狀態並擁有最新更改。

要在 Chrome 中進行設置，請打開 DevTools（點擊右鍵 > Inspect）並轉至 __Application__ 面板。點擊 __Service Workers__ 標籤，然後選中 __Update on Reload__ 複選框。如果啓用此複選框，服務工作線程會在每次頁面重新加載時強制更新。

![6b698d7c7bbf1bc0.png](img/6b698d7c7bbf1bc0.png)


## 註冊服務工作線程




在您的 `app` 目錄中，請注意有一個名稱爲 `sw.js` 的空文件。這個文件是您的服務工作線程，目前此文件爲空，我們稍後會向其添加代碼。

首先，我們需要將此文件註冊爲服務工作線程。

我們的 `app/index.html` 頁面會加載 `scripts/main.js`，它位於我們將註冊服務工作線程的 JavaScript 文件中。

將以下代碼添加到 `scripts/main.js`：

```
if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}
```

此代碼會檢查當前的瀏覽器是否支持服務工作線程和推送消息，如果支持，它便會註冊我們的 `sw.js` 文件。

#### 試一試

請在瀏覽器中打開網址 __127.0.0.1:8887__ 以檢查所做更改。

打開 Chrome DevTools 以檢查 `Service Worker is registered` 的控制檯，如下所示：

![de3ceca91043d278.png](img/de3ceca91043d278.png)

### 獲取應用服務器密鑰

如需使用此代碼實驗室，您需要生成一些應用服務器密鑰，我們可以使用此配套網站執行這一操作：[https://web-push-codelab.glitch.me/](https://web-push-codelab.glitch.me/)

您可以在這裏生成一個公私密鑰對。

![a1304b99e7b981dd.png](img/a1304b99e7b981dd.png)

將公鑰複製到 `scripts/main.js` 替換 `<Your Public Key>` 值：

```
const applicationServerPublicKey = '<Your Public Key>';
```

Note: 決不能將私鑰放在網絡應用中！


## 初始化狀態




目前，網絡應用的按鈕處於禁用狀態，無法點擊。因爲默認情況下最好禁用推送按鈕，在瞭解推送受支持並且知道用戶當前是否訂閱後，再啓用此按鈕。

我們將在 `scripts/main.js` 中創建兩個函數，一個稱爲 `initialiseUI`，會檢查用戶當前有沒有訂閱，另一個稱爲 `updateBtn`，將啓用我們的按鈕，以及更改用戶是否訂閱的文本。

我們希望 `initialiseUI` 函數如下所示：

```
function initialiseUI() {
  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

我們的新方法使用之前步驟中的 `swRegistration`，在其 `pushManager` 上調用 `getSubscription()`。`getSubscription()` 方法可以在存在訂閱時返回可使用當前訂閱解析的 promise，否則，返回 `null`。這樣我們就能檢查用戶是否已經訂閱，設置特定的狀態，然後調用 `updateBtn()`，以便啓用按鈕，並附帶有用的文本。

添加以下代碼以實現 `updateBtn()` 函數。

```
function updateBtn() {
  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

此函數會根據用戶是否訂閱而簡單地更改文本，然後啓用按鈕。

最後就是在註冊服務工作線程時調用 `initialiseUI()`。

```
navigator.serviceWorker.register('sw.js')
.then(function(swReg) {
  console.log('Service Worker is registered', swReg);

  swRegistration = swReg;
  initialiseUI();
})
```

#### 試一試

打開網絡應用，您會看到“‘Enable Push Messaging”按鈕現已啓用（您可以點擊了），並且您會在控制檯中看到“User is NOT subscribed.”。

![15f6375617c11974.png](img/15f6375617c11974.png)

在我們繼續學習此代碼實驗室的過程中，您會看到按鈕文本會在用戶訂閱/取消訂閱時發生更改。


## 訂閱用戶




目前我們的“Enable Push Messaging”按鈕未執行太多的操作，讓我們來修復這個問題。

向 `initialiseUI()` 函數中的按鈕添加點擊偵聽器，如下所示：

```
function initialiseUI() {
  pushButton.addEventListener('click', function() {
    pushButton.disabled = true;
    if (isSubscribed) {
      // TODO: Unsubscribe user
    } else {
      subscribeUser();
    }
  });

  // Set the initial subscription value
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    isSubscribed = !(subscription === null);

    updateSubscriptionOnServer(subscription);

    if (isSubscribed) {
      console.log('User IS subscribed.');
    } else {
      console.log('User is NOT subscribed.');
    }

    updateBtn();
  });
}
```

當用戶點擊推送按鈕時，我們會首先禁用按鈕，這僅僅是爲了確保用戶無法在我們正在訂閱推送消息時（這需要一些時間）第二次點擊此按鈕。

然後我們會在知道用戶當前沒有訂閱時調用 `subscribeUser()`，因此複製以下代碼並將其粘貼到 `scripts/main.js`。

```
function subscribeUser() {
  const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
  swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: applicationServerKey
  })
  .then(function(subscription) {
    console.log('User is subscribed:', subscription);

    updateSubscriptionOnServer(subscription);

    isSubscribed = true;

    updateBtn();
  })
  .catch(function(err) {
    console.log('Failed to subscribe the user: ', err);
    updateBtn();
  });
}
```

我們來看看此代碼執行什麼操作，以及它如何爲用戶訂閱推送消息。

首先我們獲取應用服務器的公鑰（base64 網址安全編碼），然後將其轉換爲 `UInt8Array`（這是訂閱調用的預期輸入）。我們已經在 `scripts/main.js` 頂部爲您提供 `urlB64ToUint8Array` 函數。

轉換此值後，我們對調用服務工作線程的 `pushManager` 調用 `subscribe()` 方法，傳遞應用服務器的公鑰和值 `userVisibleOnly: true`。

```
const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
```

`userVisibleOnly` 參數基本上就表示承認您會在發送推送時顯示通知。此時必須編寫此值並且此值必須爲 true。

調用 `subscribe()` 會返回在執行以下操作後解析的 promise：

1. 用戶已授權顯示通知。
2. 瀏覽器已向推送服務發送網絡請求，以便獲取詳細信息來生成 PushSubscription。

如果這些步驟成功執行，`subscribe()` promise 將通過 `PushSubscription` 解析。如果用戶未授權，或者如果訂閱用戶存在任何問題，promise 將會拒絕，並顯示錯誤。這會在我們的代碼實驗室中向我們提供以下 promise 鏈：

```
swRegistration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: applicationServerKey
})
.then(function(subscription) {
  console.log('User is subscribed:', subscription);

  updateSubscriptionOnServer(subscription);

  isSubscribed = true;

  updateBtn();

})
.catch(function(err) {
  console.log('Failed to subscribe the user: ', err);
  updateBtn();
});
```

如此一來，我們就可以收到訂閱，並將用戶視爲已訂閱用戶，或者收到錯誤並將其打印到控制檯。在這兩種情況下，我們調用 `updateBtn()` 都是爲了確保按鈕已重新啓用並且有合適的文本。

我們可以在實際應用中使用 `updateSubscriptionOnServer` 方法將訂閱發送到後端，但我們的代碼實驗室會使用此方法打印 UI 中的訂閱，這將在稍後爲我們提供幫助。將此方法添加到 `scripts/main.js`：

```
function updateSubscriptionOnServer(subscription) {
  // TODO: Send subscription to application server

  const subscriptionJson = document.querySelector('.js-subscription-json');
  const subscriptionDetails =
    document.querySelector('.js-subscription-details');

  if (subscription) {
    subscriptionJson.textContent = JSON.stringify(subscription);
    subscriptionDetails.classList.remove('is-invisible');
  } else {
    subscriptionDetails.classList.add('is-invisible');
  }
}
```

#### 試一試

如果您返回到網絡應用，並嘗試點擊此按鈕，會看到如下所示的權限提示：

![227cea0abe03a5b4.png](img/227cea0abe03a5b4.png)

如果您進行授權，則會看到控制檯使用 `PushSubscription` 打印 `User is subscribed:`，按鈕的文本會更改爲“Disable Push Messaging”，並且您將能夠在頁面底部以 JSON 形式查看訂閱。

![8fe2b1b110f87b34.png](img/8fe2b1b110f87b34.png)


## 處理拒絕的權限




我們目前爲止還沒有解決的事情是，如果用戶阻止權限請求會怎麼樣。這需要考慮一些特殊的注意事項，因爲如果用戶阻止權限，我們的網絡應用將無法重新顯示權限提示，也不能訂閱用戶，因此，我們需要至少停用推送按鈕，以便用戶知道無法使用此按鈕。

很明顯，我們需要在 `updateBtn()` 函數中處理這個情況。我們只需要檢查 `Notification.permission` 值，如下所示：

```
function updateBtn() {
  if (Notification.permission === 'denied') {
    pushButton.textContent = 'Push Messaging Blocked.';
    pushButton.disabled = true;
    updateSubscriptionOnServer(null);
    return;
  }

  if (isSubscribed) {
    pushButton.textContent = 'Disable Push Messaging';
  } else {
    pushButton.textContent = 'Enable Push Messaging';
  }

  pushButton.disabled = false;
}
```

我們知道，如果權限爲 `denied`，就無法訂閱用戶，並且我們無法執行其他操作，因此，停用此按鈕是最好的做法。

#### 試一試

因爲我們已經在之前的步驟中爲網絡應用授權，我們需要點擊網址欄的圓圈中的 __i__，將通知權限更改爲  *Use global default (Ask)* 。

![8775071d7fd66432.png](img/8775071d7fd66432.png)

更改此設置後，請刷新頁面，然後點擊 *Enable Push Messaging* 按鈕，這次在權限對話框中選擇 *Block*。按鈕的文本現在爲 *Push Messaging Blocked*，並且已停用。

![2b5314607196f4e1.png](img/2b5314607196f4e1.png)

進行此更改後，我們現在就可以訂閱用戶了，我們會考慮可能的權限情景。


## 處理推送事件




在我們介紹如何從後端發送推送消息之前，我們需要考慮在訂閱用戶收到推送消息後實際會發生什麼。

在我們觸發推送消息後，瀏覽器會收到推送消息，弄明白推送的服務工作線程，然後再喚醒相應的服務線程並分配推送事件。我們需要偵聽此事件，顯示通知作爲結果。

將以下代碼添加到 `sw.js` 文件：

```
self.addEventListener('push', function(event) {
  console.log('[Service Worker] Push Received.');
  console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

  const title = 'Push Codelab';
  const options = {
    body: 'Yay it works.',
    icon: 'images/icon.png',
    badge: 'images/badge.png'
  };

  event.waitUntil(self.registration.showNotification(title, options));
});
```

我們來了解一下這個代碼。我們通過向服務工作線程添加事件偵聽器來偵聽服務工作線程中的推送事件，代碼如下所示：

```
self.addEventListener('push', ...... );
```

如果您之前沒有使用過 Web Workers，`self` 就是新內容。`self` 會引用服務工作線程本身，以便我們向服務工作線程添加事件偵聽器。

收到推送消息後，會觸發我們的事件偵聽器，我們通過在註冊時調用 `showNotification()` 來創建通知。`showNotification()` 期望使用 `title`，我們可以提供 `options` 對象。現在我們來看看選項中的消息正文、圖標和標誌（標誌僅在寫入時在 Android 上使用）。

```
const title = 'Push Codelab';
const options = {
  body: 'Yay it works.',
  icon: 'images/icon.png',
  badge: 'images/badge.png'
};
self.registration.showNotification(title, options);
```

我們在推送事件中要介紹的最後一個內容是 `event.waitUntil()`。此方法帶有 promise ，並且瀏覽器會保持服務工作線程處於活動狀態並運行，直到傳入的 promise 已進行解析。

爲了簡化上述代碼，使其易於理解，我們可以重新編寫代碼，如下所示：

```
const notificationPromise = self.registration.showNotification(title, options);
event.waitUntil(notificationPromise);
```

處理完推送事件後，我們來測試一下。

#### 試一試

通過使用服務工作線程中的推送事件，我們可以使用 DevTools 觸發虛假的推送事件，測試收到消息後會發生什麼。

在您的網絡應用中，訂閱推送消息（確保控制檯中有 *User IS subscribed*），然後轉至 DevTools 中的 *Application*  面板，並在 *Service Workers* 選項卡下，點擊相應服務工作線程下的 *Push*  鏈接。

![2b089bdf10a8a945.png](img/2b089bdf10a8a945.png)

點擊後，您會看到類似於如下的通知：

![eee7f9133a97c1c4.png](img/eee7f9133a97c1c4.png)

Note: 如果這個步驟不管用，請通過 DevTools Application 面板中的 *Unregister* 鏈接取消註冊服務工作線程，等待服務工作線程停止，然後重新加載頁面。


## 通知點擊




如果您點擊以下其中一個通知，會發現沒有發生任何事情。我們可以通過偵聽服務工作線程中的 `notificationclick` 事件，處理通知點擊。

開始在 `sw.js` 中添加 `notificationclick` 偵聽器，如下所示：

```
self.addEventListener('notificationclick', function(event) {
  console.log('[Service Worker] Notification click Received.');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('https://developers.google.com/web/')
  );
});
```

當用戶點擊通知時，會調用 `notificationclick` 事件偵聽器。

在此代碼實驗室中，我們首先關閉點擊過的通知：

```
event.notification.close();
```

然後，打開新窗口/標籤加載網址 [developers.google.com](/web/)，您可以隨意更改此網址：）

```
clients.openWindow('https://developers.google.com/web/')
```

我們重新調用 `event.waitUntil()`，確保瀏覽器不會在顯示新窗口前終止服務工作線程。

#### 試一試

嘗試重新在 DevTools 中觸發推送消息，然後點擊通知。您現在會看到通知關閉，並打開了新標籤。


## 發送推送消息




我們已經看到網絡應用能夠使用 DevTools 顯示通知，並且瞭解瞭如何通過點擊關閉通知，接下來是發送實際的推送消息。

一般情況下，這個過程就是從網頁向後端發送訂閱，然後後端通過對訂閱中的端點實施 API 調用，進而觸發推送消息。

這超出了此代碼實驗室的討論範圍，但您可以使用此代碼實驗室的配套網站 ( [https://web-push-codelab.glitch.me/](https://web-push-codelab.glitch.me/)) 來觸發實際的推送消息。複製粘貼頁面底部的訂閱：

![cf0e71f76cb79cc4.png](img/cf0e71f76cb79cc4.png)

然後將此內容粘貼到配套網站的 *Subscription to Send To*  文本區域：

![a12fbfdc08233592.png](img/a12fbfdc08233592.png)

然後，您可以在 *Text to Send* 下添加您想要與推送消息一起發送的任意字符串，最後點擊 *Send Push Message* 按鈕。

![2973c2b818ca9324.png](img/2973c2b818ca9324.png)

然後，您就能收到推送消息，其中包含的文本也將打印到控制檯。

![75b1fedbfb7e0b99.png](img/75b1fedbfb7e0b99.png)

這可讓您測試發送和接收數據，並最終操作通知。

配套應用其實就是使用  [web-push 庫](https://github.com/web-push-libs/web-push) 發送消息的節點服務器。非常有必要查看  [Github 上的 web-push-libs org](https://github.com/web-push-libs/)，看看有哪些庫可以向您發送推送消息（這樣可以瞭解觸發推送消息的詳細信息）。


## 取消訂閱用戶




我們到現在還沒介紹如何取消用戶的推送消息訂閱。爲此，我們需要對 `PushSubscription` 調用 `unsubscribe()`。

返回到我們的 `scripts/main.js` 文件，將 `initialiseUI()` 中 `pushButton` 的點擊偵聽器更改爲以下內容：

```
pushButton.addEventListener('click', function() {
  pushButton.disabled = true;
  if (isSubscribed) {
    unsubscribeUser();
  } else {
    subscribeUser();
  }
});
```

請注意，我們現在準備調用新函數 `unsubscribeUser()`。在此方法中，我們會獲取當前的訂閱，並對其調用取消訂閱。將以下代碼添加到 `scripts/main.js`：

```
function unsubscribeUser() {
  swRegistration.pushManager.getSubscription()
  .then(function(subscription) {
    if (subscription) {
      return subscription.unsubscribe();
    }
  })
  .catch(function(error) {
    console.log('Error unsubscribing', error);
  })
  .then(function() {
    updateSubscriptionOnServer(null);

    console.log('User is unsubscribed.');
    isSubscribed = false;

    updateBtn();
  });
}
```

我們來了解一下這個函數。

首先，我們通過調用 `getSubscription()` 獲取當前的訂閱：

```
swRegistration.pushManager.getSubscription()
```

這會返回使用 `PushSubscription` 進行解析的 promise（如果存在），否則返回 `null`。如果存在訂閱，我們會對其調用 `unsubscribe()`，這會使 `PushSubscription` 無效。

```
swRegistration.pushManager.getSubscription()
.then(function(subscription) {
  if (subscription) {
    // TODO: Tell application server to delete subscription
    return subscription.unsubscribe();
  }
})
.catch(function(error) {
  console.log('Error unsubscribing', error);
})
```

調用 `unsubscribe()` 會返回一個 promise（因爲這需要一些時間才能完成），因此我們返回該 promise，以便完成鏈中等待 `unsubscribe()` 的下一個 `then()`。同時，我們還添加了抓取處理程序，以防調用 `unsubscribe()` 導致錯誤。然後，我們就可以更新 UI 了。

```
.then(function() {
  updateSubscriptionOnServer(null);

  console.log('User is unsubscribed.');
  isSubscribed = false;

  updateBtn();
})
```

#### 試一試

您應能夠按網絡應用中的 *Enable Push Messaging*  /  *Disable Push Messaging*，日誌會向用戶顯示已經訂閱或取消訂閱的用戶。

![33dd89c437c17c97.png](img/33dd89c437c17c97.png)


## 完成




恭喜您完成此代碼實驗室！

此代碼實驗室向您介紹瞭如何設置和運行向網絡應用中添加推送的過程。如果您想要了解有關網絡通知可以執行的操作的詳細信息，[請查看這些文檔](/web/fundamentals/push-notifications)。

如果您準備在自己的網站上部署推送，可能會有興趣瞭解爲使用 GCM 的舊版/非標準合規瀏覽器添加支持，[在此處瞭解詳細信息](https://web-push-book.gauntface.com/chapter-06/01-non-standards-browsers/)。

### 深入閱讀

*  Web__Fundamentals__ 上的[網絡推送通知](/web/fundamentals/push-notifications)文檔
*  [網絡推送庫](https://github.com/web-push-libs/) - 網絡推送庫包括 Node.js、PHP、Java 和 Python。

#### 相關博文

*  [網絡推送負載加密](/web/updates/2016/03/web-push-encryption)
*  [應用服務器密鑰和網絡推送](/web/updates/2016/07/web-push-interop-wins)
*  [通知操作](/web/updates/2016/01/notification-actions)
*  [圖標、關閉事件、重新通知首選項和時間戳](/web/updates/2016/03/notifications)





## 發現問題，或者有反饋？ {: .hide-from-toc }
立即提交[問題](https://github.com/googlechrome/push-notifications/issues)，幫助我們讓代碼實驗室更加強大。謝謝！

{# wf_devsite_translation #}
