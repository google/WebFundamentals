---
title: "裝置定向"
description: "裝置動作和定位事件能存取行動裝置中內建的加速計、陀螺儀和羅盤。"
updated_on: 2014-10-21
notes:
  not-stable:
    - 決定要使裝置動作或裝置定向事件時，請<b>極為</b>謹慎。  遺憾的是，並非所有瀏覽器都使用相同的座標系統，並可能會在類似情況下回報不同的值。

---
<p class="intro">
  裝置動作和定位事件能存取行動裝置中內建的加速計、陀螺儀和羅盤。
</p>

這些事件可用於多種用途；
例如在遊戲中要控制角色的方向，或判斷角色應該跳多高。
 當用於 GeoLocation 時，它可以建立更精確的逐向式導航系統，
或提供有關商店所在的資訊。

{% include shared/remember.liquid title="Warning" list=page.notes.not-stable %}

## 哪一端朝上？

要使用裝置定向和動作事件所傳回的資料，
理解所提供的值很重要。  

### 地球座標視框。

以 `X`、`Y` 與 `Z` 值所描述的地球座標視框，
是根據重力和標準的磁性定向對準。

<ul>
  <li>
    <b>X：</b>代表東西方向 (其中東是正值)。
  </li>
    <li>
    <b>Y：</b>代表南北方向 (北是正值)。
  </li>
    <li>
    <b>Z：</b>表示上下方向，
垂直於地面 (其中上是正值)。
  </li>
</ul>

### 裝置座標框架的圖例

以 `x`、`y` 與 `z` 值所描述的裝置座標框架，
是根據裝置中心對準。

<img src="images/axes.png" alt="裝置座標框架的圖例">
<!-- 特別感謝 Sheppy (https://developer.mozilla.org/en-US/profiles/Sheppy) 
提供其公共版權的影像。 -->

<ul>
  <li>
    <b>x：</b>在螢幕平面上，往右為正值。
  </li>
    <li>
    <b>y：</b>在螢幕平面上，往上為正值。
  </li>
    <li>
    <b>z：</b>垂直於螢幕或鍵盤，
遠離為正值。
  </li>
</ul>

在手機或平板電腦上，
裝置定向是基於螢幕的典型定向。螢幕方向螢幕方向  對於手機和平板電腦而言，
它則是基於垂直模式下的裝置。 對於桌上型電腦或筆記型電腦，
定向是考慮與鍵盤的相對位置。

### 旋轉資料

旋轉資料會被傳回為 [尤拉角] (http://en.wikipedia.org/wiki/Euler_angles)，
代表裝置的座標框架與地球座標框架之間差異的角度數字。


<div>
  <div class="g--third">
    <img src="images/alpha.png"><br>
    <b>alpha:</b> 繞著 z 軸的旋轉角度，在裝置頂部直接指北時為 0&deg;。
  逆時針方向旋轉的設備價值就增加了。
`alpha`
  </div>
  <div class="g--third">
    <img src="images/beta.png"><br>
    <b>beta:</b> 繞著 x 軸的旋轉，在裝置頂部與底部和地球表面等距時為 0&deg;。
 裝置頂部倒向地球表面時，
此值會增加。
  </div>
  <div class="g--third g--last">
    <img src="images/gamma.png"><br>
    <b>gamma:</b> 繞著 y 軸的旋轉，當裝置左右側和地球表面等距時為 0&deg;。
  右側倒向地球表面時，
此值會增加。 
  </div>
</div>

<div style="clear:both;"></div>



