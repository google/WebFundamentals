---
title: "設定 Web Starter Kit"
description: "如果您是 Web Starter Kit 新手，那麼本指南適合你。它會一步步教您如何儘快啟動並執行 Web Starter Kit。"
notes:
  nosudo: "如果您看到像 <code>EPERM</code> 的權限或存取錯誤 或 <code>EACCESS</code>，請不要使用 <code>sudo</code> 作為變通辦法。請參閱此頁，<a href='https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md'>取得更強固的解決方案。</a>"
updated_on: 2015-04-01
---

<p class="intro">
  Web Starter Kit 依賴 NodeJS、NPM、& Sass 運作，只要您電腦上擁有這些東西，就擁有了在您專案中開始使用 Web Starter Kit 的所有必要之一切。
</p>

{% include shared/toc.liquid %}

## 安裝這些一次性的依賴關係

在您能夠以 Web Starter Kit 打造網站之前，
電腦上必須安裝兩項工具：NodeJS、NPM、& Sass。

### NodeJS & NPM

Web Starter Kit 建置工具需要 Node 和 NPM。 Node 用於執行任務執行程式 Gulp。
 NPM 用來下載在 Gulp 中執行特定任務的模組。


如果您不能確定是否有 NodeJS 和 NPM，
檢查方式為開啟命令提示字元並執行 `node -v`。 如果 Node 回應，查看版本是否相符 NodeJS.org 上的目前版本。


如果您得不到回應，或者擁有舊版本，
那麼請前往 NodeJS.org 並按下大大的綠色「安裝」按鈕。 NPM 將連同 NodeJS 自動安裝。


## 設定您的 Web Starter Kit 專案

第一步是前往 [https://developers.google.com/web/starter-kit/](https://developers.google.com/web/starter-kit/)
 並下載並解壓該 zip 檔。 這將是您專案的基礎，因此請重命名資料夾，並將之它放在您電腦上的某個地方。 針對本指南的其餘部分，我們將稱此資料夾為 `my-project`

接下來，您需要為 Web Starter Kit 安裝本機相依性。 開啟命令提示字元視窗、將目錄變更至您的專案資料夾，
執行以下 npm 安裝指令碼。


    cd my-project
    npm install
    npm install gulp -g

好了！您現在已擁有所有必要的條件，
以在 Web Starter Kit 中使用 Gulp 工具

{% include shared/remember.liquid title="Errors?" list=page.notes.nosudo %}

本指南的下一節將討論如何使用 Gulp，
但如果您想知道剛剛完成的外觀，嘗試執行本機伺服器，請鍵入 `gulp serve`。

<img src="images/wsk-on-pixel-n5.png">


