---
title: "画像"
description: "1 枚の写真は 1000 語にも匹敵します。画像すべてのページにおいて不可欠です。一方で、ダウンロードされるデータ量のほとんどを画像が占めることも少なくありません。レスポンシブ ウェブデザインでは、レイアウトだけでなく画像もデバイスの特性に応じて変えることができます。"
updated_on: 2014-04-30
key-takeaways:
  use-right-image:
    - ディスプレイの特性に合った最適な画像を使用し、画面サイズ、デバイスの解像度、ページ レイアウトを考慮する。
    - メディア クエリで <code>min-resolution</code> と <code>-webkit-min-device-pixel-ratio</code> を使用し、高 DPI ディスプレイの場合は CSS の <code>background-image</code> プロパティを変更する。
    - マークアップ内の 1x の画像に加えて、srcset を使用して高解像度の画像を提供する。
    - JavaScript による画像置き換えを使用する場合や、低解像度のデバイスに高圧縮の高解像度画像を配信する場合は、パフォーマンスへの影響を検討する。
  avoid-images:
    - 可能な限り画像の使用を避け、ブラウザの機能を利用したり、画像の代わりに Unicode 文字を使用したり、複雑なアイコンをアイコン フォントに置き換える。
  optimize-images:
    - 画像形式は無作為に選択せず、利用可能な各形式を理解したうえで最適な形式を使用する。
    - ワークフローに画像最適化ツールと圧縮ツールを組み込み、ファイルのサイズを小さくする。
    - 利用頻度の高い画像をスプライト画像に置くことで、HTTP リクエストの回数を減らす。
    - ページの初期読み込み時間を短縮して初期のページ容量を削減するために、スクロールして画像がビューに表示された時点で読み込むようにすることを検討する。
notes:
  compressive:
    - 圧縮を使用する場合は、必要なメモリ容量やデコード処理が増加することに注意する。大きい画像をサイズ変更して小さい画面に収める処理は負荷が大きく、メモリと処理能力の両方が限られているローエンドのデバイスでは特にパフォーマンスが大きく低下する場合があります。
udacity:
  id: ud882
  title: Responsive Images
  description: "Learn how to work with images on the modern web, so that your images look great and load quickly on any device and pick up a range of skills and techniques to smoothly integrate responsive images into your development workflow."
  image: img/udacity-ri.jpg
---

<p class="intro">
  1 枚の写真は 1000 語にも匹敵します。画像すべてのページにおいて不可欠です。一方で、ダウンロードされるデータ量のほとんどを画像が占めることも少なくありません。レスポンシブ ウェブデザインでは、レイアウトだけでなく画像もデバイスの特性に応じて変えることができます。
</p>


### レスポンシブ画像

レスポンシブ ウェブデザインでは、レイアウトだけでなく、コンテンツもデバイスの特性に応じて変えることができます。たとえば、高解像度（2x）のディスプレイで鮮明な画像を表示するには、高解像度のグラフィックが必要です。幅が 50% の画像は、ブラウザの幅が 800px の場合は適切に表示されますが、画面幅が狭い携帯端末では画像が占めるスペースが大きすぎるほか、狭い画面に合わせてスケールダウンしても送信されるデータ量は変わりません。

### アート ディレクション

<img class="center" src="img/art-direction.png" alt="アート ディレクションの例"
srcset="img/art-direction.png 1x, img/art-direction-2x.png 2x">

サイズの変更、トリミング、画像全体の置き換えなど、画像の大幅な変更が必要となる場合もあります。このような画像の変更は通常、アート ディレクションと呼ばれます。詳しい例は、[responsiveimages.org/demos/](http://responsiveimages.org/demos/)（英語）をご覧ください。

{% include fundamentals/udacity_course.liquid uid=page.udacity.id title=page.udacity.title description=page.udacity.description image=page.udacity.image %}



