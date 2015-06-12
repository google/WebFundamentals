---
layout: section
title: "新增至主螢幕"
description: "幾乎所有主要瀏覽器廠商都允許使用者釘選或安裝您的網頁應用程式。 所謂的「stickyness」是原生應用程式的常見引數，只要稍微調校您的標記即可達成目的。"
introduction: "幾乎所有主要瀏覽器廠商都允許使用者釘選或安裝您的網頁應用程式。 所謂的「stickyness」是原生應用程式的常見引數，只要稍微調校您的標記即可達成目的。"
article:
  written_on: 2014-09-22
  updated_on: 2014-12-17
  order: 1
id: stickyness
collection: device-access
authors:
  - pbakaus
priority: 1
---
{% wrap content%}

對使用者而言，「新增至主螢幕」的運作類似於一個超級書籤：
不過當使用者從主螢幕啟動您的網頁應用程式時，
它不會指示瀏覽器如何顯示您的應用程式，
行動瀏覽器會針對書籤，取得您頁面的網頁圖示 (favicon) 或螢幕擷取畫面，並顯示瀏覽器的預設 UI。
 讓我們看您可以如何
改進此內建行為。

Chrome 和 Safari 支援非常相似的語法，方法是使用 `<meta>` 與 `<link>`
 標籤於您頁面的 `<head>` 中，並保持整體功能的相對精簡。


Internet Explorer 10 導入了「釘選網站」功能；
這項概念提供了額外功能，例如變更圖示與通知的呈現方式，
而且它雖然支援常見的 `<meta>` 標籤樣式，但它偏好做為設定之用的連結化 XML 檔案。


注意：Firefox OS 獨家的 Firefox API 非在此討論之列，
請參閱官方 [Firefox OS文件](https://developer.mozilla.org/en-US/Apps/Quickstart)。

{% include modules/nextarticle.liquid %}

{% endwrap %}
