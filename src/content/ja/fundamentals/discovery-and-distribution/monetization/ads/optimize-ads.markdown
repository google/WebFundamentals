---
title: "広告を最適化する"
description: "サイトの最適化や表示する広告の最適化を行うと、配信される広告の質が高まり、収益が増大する可能性があります。"
updated_on: 2014-08-12
key-takeaways:
  tldr:
    - AdSense <b>スコアカード</b>を定期的に確認し、<b>アドバイス</b>を実践します。
    - <b>パフォーマンス レポート</b>を確認して、自分やユーザーに対して最も価値のある広告を把握します。
    - サイトで最も優れた掲載結果を挙げた広告を選択します。
    - <code>robots.txt</code> で AdSense クローラーをブロックすることのないようにします。
---

<p class="intro">
  広告とサイトの最適化は、目標達成を目指す上で極めて重要な意味を持ちます。最適化を通じて、広告収入の増加や、サイトの使いやすさの改善、トラフィックの増加など、さまざまな目標を達成することができます。
</p>

AdSense 広告の成果を高め、自分の望むものを手に入れつつ、ユーザーが望むものを提供したい場合や、何かインスピレーションが必要な場合、
これまでさまざまな規模のサイト運営者に協力してきた AdSense のスペシャリストがおすすめする方法を実践してみましょう。

<b>注:</b> このトピックでは AdSense に焦点を当てていますが、コンセプトはどのプロバイダでも当てはまります。

{% include shared/toc.liquid %}

{% include shared/takeaway.liquid list=page.key-takeaways.tldr %}

## スコアカードとアドバイスを確認する

アカウントの<b>[ホーム](https://www.google.com/adsense/app#home)</b> タブにあるスコアカードを利用して、自分の広告設定やウェブページ、コンテンツが他のサイト運営者と比べてどのような成果を挙げているか確認します。

スコアカードは、カテゴリごとに分類されており（収益、最適化、サイトの状況など）、1～5 個の青色のドットでスコアが示されます。各スコアは、該当カテゴリ内の他のサイト運営者と比較したランキングを示します。カテゴリ内でスコアが低い場合、改善の余地があることを意味します。特に赤色や黄色の感嘆符マークが付いた項目に注意していください。

<figure>
<img src="images/optimization_score.png" alt="収益最適化スコアカード">
<figcaption>収益最適化スコアカード</figcaption>
</figure>

<figure>
<img src="images/multiscreen_score.png" alt="マルチスクリーン スコアカード">
<figcaption>マルチスクリーン スコアカード</figcaption>
</figure>

<figure>
<img src="images/site_score.png" alt="サイト状況スコアカード">
<figcaption>サイト状況スコアカード</figcaption>
</figure>



[ホーム](https://www.google.com/adsense/app#home) タブの<b>提案ボックス</b>には、収益を増やすにはサイトをどのように修正すればよいのか、アドバイスが示されます。
このアドバイスは、最近他の AdSense サイト運営者が実践したアドバイスの成果の分析結果に基づいており、掲載結果の改善に効果があると強く信頼できるものしか提示されません。

{% include shared/remember.liquid title="Learn more" text="AdSense ヘルプの<a href='https://support.google.com/adsense/answer/3006004'>スコアカードについて</a>と<a href='https://support.google.com/adsense/answer/1725006'>提案ボックス</a>をご覧ください。" %}

## パフォーマンス レポートを使用する

Google AdSense の<b>[パフォーマンス レポート](https://www.google.com/adsense/app#viewreports)</b> タブを使用すると、収益の額、収益に影響した要素、時系列変化を示したグラフが表示されます。

最初は下記のレポートを活用してください。

<table class="mdl-data-table mdl-js-data-table">
    <thead>
    <tr>
<th>レポート</th>
<th>説明</th>
    </tr>
  </thead>
  <tbody>
    <tr>
<td data-th="レポート">
<a href="https://support.google.com/adsense/answer/3540509">クリエイティブ サイズ</a>
      </td>
<td data-th="説明">
サイトで配信した広告の表示サイズが示されます。このレポートを活用すると、レスポンシブ広告を使用している際の広告サイズの傾向が把握できます。
      </td>
    </tr>
    <tr>
<td data-th="レポート">
広告ユニット
      </td>
<td data-th="説明">
カスタマイズした各広告ユニットの掲載結果が表示されます。どの広告ユニットの掲載結果が良いか分析し、そのユニットタイプを他の場所にも配置できるか判断できます。また、掲載結果が良い理由についても把握できるため、他のユニットにも適用することができます。
      </td>
    </tr>
    <tr>
<td data-th="レポート"> <a href="https://support.google.com/adsense/answer/1407511">サイト</a>
      </td>
<td data-th="説明">
複数のサイトを所有している場合、このレポートによって、掲載結果が良いサイトはどれか、そのサイトのやり方を残りのサイトにも適用できるか把握できます。
      </td>
    </tr>
  </tbody>
</table>

### カスタムヘルプやパフォーマンス アドバイスの登録を行う

パフォーマンス レポートに加え、AdSense では、状況に応じたカスタムヘルプやパフォーマンス レポートに関するアドバイスをメールで提供しています。登録するには、[個人設定](https://www.google.com/adsense/app#personalSettings)のメールアドレスが正しいか確認し、[*メール設定*] の [*個別の提案や最適化のヒント*] チェックボックスをオンにします。

<figure>
<img src="images/adsense-emails.jpg" srcset="images/adsense-emails.jpg 1x, images/adsense-emails-2x.jpg 2x" alt="AdSense [個人設定] ページ">
<figcaption>カスタムヘルプとパフォーマンス アドバイスのメールを有効にします。</figcaption>
</figure>

{% include shared/remember.liquid title="Learn more" text="詳細については、AdSense ヘルプの<a href='https://support.google.com/adsense/answer/160562'>パフォーマンス レポート</a>をご覧ください。" %}

## 入札見込みを最大化する

競争が激しくなり、いわゆる「オークション プレッシャー」が強まれば、広告主たちは、サイト上の広告の表示やクリックに対する支払いを増加させます。入札見込みを最大化するには:

* [テキスト広告](https://support.google.com/adsense/answer/185665)と[ディスプレイ広告](https://support.google.com/adsense/answer/185666)を両方とも許可します。どちらか一方でも広告タイプを排除すると、潜在的な広告主の数を制限することになります。
* 広告主が利用しやすい一般的な広告サイズを使用します。[広告サイズガイド](https://support.google.com/adsense/answer/6002621)をご覧ください。
* 広告によっては、サイトとうまく適合しないものもありますが、潜在的な収益を下げることになるので、あまり多くのカテゴリをブロックしないように注意します。

<b>注:</b> この情報は、サイト運営者スコアカードにも含まれており、広告の掲載結果を高める上で極めて重要なポイントです。

## AdSense クローラーをブロックしない

サイトの [robots.txt](https://support.google.com/webmasters/answer/6062608) ファイルが [AdSense クローラーをブロックすることのないように](https://support.google.com/adsense/answer/10532)設定する必要があります。
AdSense では、ウェブページ コンテンツの処理とインデックス化を行うことが必要とされており、AdSense クローラーをサイトにアクセスさせて、コンテンツを判断しています。これにより、AdSense から適切な広告が配信されるようになります。

AdSense クローラーがページにアクセスできるように robots.txt ファイルを更新するには、robots.txt から次の 2 つの行を*削除*します。

    User-agent: Mediapartners-Google
    Disallow: /




