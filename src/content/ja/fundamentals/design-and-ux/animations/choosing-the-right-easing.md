project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: イーズイン、イーズアウト、またはその併用など、プロジェクトに合ったイージング タイプを選択します。バウンスも使用すると、さらに楽しい画面に仕上がるはずです。

{# wf_updated_on: 2016-08-23 #}
{# wf_published_on: 2014-08-08 #}

# 適切なイージングの選択 {: .page-title }

{% include "web/_shared/contributors/paullewis.html" %}

これまでにアニメーションのイージングで使用できるオプションを複数紹介してきました。次は、その中のどれをプロジェクトで使用するか、またアニメーションの継続時間について考慮する必要があります。

### TL;DR {: .hide-from-toc }
* UI 要素にイーズアウト アニメーションを適用します。Quintic の ease-out は非常に使いやすく、高速かつ滑らかに動きます。
* アニメーションの継続時間は、ease-out と ease-in は 200 ～ 500 ミリ秒に、bounce と elastic ease は、800 ～ 1200 ミリ秒に設定します。


<img src="images/quintic-ease-out-markers.png" alt="Quintic ease-out のアニメーション曲線" style="max-width: 300px" class="attempt-right"/>

一般的には **ease-out** を使うのが正しい判断で、デフォルトとしても最適です。ease-out は動き始めが速いため、アニメーションが迅速に応答している印象を与え、最後には効果的に減速します。

CSS の `ease-out` キーワードでは規定されていませんが、他にも有名な ease-out 方程式が複数あります。これらは、かなりインパクトの強いアニメーションの部類に入ります。高速な ease-out 効果が必要な場合は、[Quintic ease-out](http://easings.net/#easeOutQuint) の使用を検討してください。


[Quintic ease-out のアニメーションを見る](https://googlesamples.github.io/web-fundamentals/fundamentals/design-and-ux/animations/box-move-quintic-ease-out.html){: target="_blank" .external }

他のイージング方程式、特に bounce や elastic ease は、プロジェクトで適切な場合にのみ、慎重に使用してください。ユーザーに不快感を与えるアニメーションが表示されないようにするために、注意すべきポイントがあります。楽しい雰囲気を出したいサイトを除いて、UI 上で要素をバウンスさせないようにしてください。逆に、楽しいサイトを作る場合は、積極的に bounce を使ってください。

まずは気軽にいろいろと試し、自身のプロジェクトの雰囲気と合っているかを確認することから始めてください。イージング タイプの完全なリストとデモについては、[easings.net](http://easings.net) を参照してください。

##  アニメーションの適切な継続時間を選択

プロジェクトに追加するアニメーションの持続時間は、必ず適切な値に設定します。短すぎるとアニメーションが攻撃的でシャープな感じになり、長すぎると目障りで邪魔になります。

* **Ease-out: 200 ～ 500 ミリ秒**。アニメーションが目に入りますが、目障りに感じることはありません。
* **Ease-in: 200 ～ 500 ミリ秒**。最後に動きを大きくする場合、そのインパクトを和らげる時間がなくなる点に注意してください。
* **Bounce または elastic 効果: 800 ～ 1200 ミリ秒**。Elastic や bounce 効果では、「落ち着かせる」ための時間が必要です。この時間の余裕がないと、アニメーションで elastic や bounce の部分が悪目立ちしてしまいます。

上記の内容は、もちろんガイドラインにすぎません。自身で自由に実験し、プロジェクトに適した効果を選んでください。




{# wf_devsite_translation #}
