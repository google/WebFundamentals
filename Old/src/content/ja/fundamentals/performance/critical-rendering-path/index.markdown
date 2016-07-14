---
title: "クリティカル レンダリング パス"
description: "ユーザーがページ上で行う中核的操作に関係するコンテンツを優先して表示させることで、クリティカル レンダリング パスを最適化します。"
updated_on: 2014-04-28
udacity:
  id: ud884
  title: Website Performance Optimization
  description: "Interested in taking a deep dive into the Critical Rendering Path? Check out or companion course and learn how the browser converts HTML, CSS, and JavaScript to pixels on the screen, how to use DevTools to measure performance, and how to optimize the Critical Rendering Path of your pages."
  image: images/crp-udacity.png
---
<p class="intro">
  クリティカル レンダリング パスの最適化は、ページのパフォーマンスを高める上で極めて重要な意味を持ちます。目標は、ユーザーがページ上で行う中核的操作に関係するコンテンツを優先して表示させることです。
</p>

高速のウェブ エクスペリエンスを実現するには、ブラウザが大量の処理を行う必要があります。この処理の大半は、ウェブ デベロッパーの見えないところで行われます。ウェブ デベロッパーがマークアップを記述すると、すてきなページが画面に現れます。ただし、HTML や CSS、JavaScript を基にブラウザが画面上にピクセルをレンダリングする仕組みを理解しておくことは重要です。

パフォーマンスの最適化とは、結局、HTML や CSS、JavaScript のバイトの取得からピクセルとしてレンダリングする必須処理までの間の中間段階で何が起きているのか理解することとほぼ同義です。この中間段階を「**クリティカル レンダリング パス**」と呼びます。

<img src="images/progressive-rendering.png" class="center" alt="ページ レンダリングのプロセス">

クリティカル レンダリング パスを最適化することで、最初にページがレンダリングされる時間を大幅に改善することができます。また、クリティカル レンダリング パスに対する理解は、優れたインタラクティブ アプリケーションを構築する基盤にもなります。インタラクティブ アップデートの処理プロセスも結局同じことであり、連続的なループの中で、理想的には 60 fps で実行されます。ただし、まだ先を急ぐのはやめておきましょう。まず、ブラウザがシンプルなページを表示する仕組みについて、ごく基本的な概要を確認します。

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title image=page.udacity.image description=page.udacity.description %}


