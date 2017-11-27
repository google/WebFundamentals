project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: リソースをフレーム、ドメイン、タイプなどの基準で整理します。

{# wf_updated_on:2016-07-28 #}
{# wf_published_on:2015-04-13 #}

# リソースの調査 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

リソースをフレーム、ドメイン、タイプなどの基準で整理します。



### TL;DR {: .hide-from-toc }
- リソースをフレームで整理するには、[<strong>Application</strong>] パネルの [<strong>Frames</strong>] ペインを使用します。
- [<strong>Sources</strong>] パネルで [<strong>group by folder</strong>] オプションを無効にしてリソースをフレームごとに表示することもできます。
- リソースをドメインまたはフォルダごとに表示するには、[<strong>Sources</strong>] パネルを使用します。
- リソースを名前または [<strong>Network</strong>] パネル内の他の基準でフィルタします。


##  フレームによるリソースの整理{:#frames}

ページのリソースをフレームで整理して表示するには、[**Application**] パネルの [**Frames**] ペインを使用します。


![フレームの詳細][frames]

* トップレベル（上記のスクリーンショットの `top`）は、メイン ドキュメントです。
* その下にメイン ドキュメントのサブフレーム（上記のスクリーンショットの `widget2` など）があります。
これらのサブフレームのいずれかを展開すると、そのフレームからのリソースが表示されます。
* サブフレームの下には、メイン ドキュメントの画像、スクリプト、およびその他のリソースがあります。
* 最後はメイン ドキュメント自体です。

リソースをクリックすると、そのプレビューが表示されます。

リソースを右クリックして、そのリソースを [**Network**] パネルに表示したり、新しいタブで開いたり、その URL をコピーしたり、保存したりできます。


![リソースの表示][resource]

リソースは、[**Sources**] パネルにフレームごとに表示することもできます。そのためには、ナビゲータのオーバーフローメニューをクリックし、[**Group by folder**] オプションを無効にしてフォルダによるリソースのグループ化を止めます。



![[Group by folder] オプション](imgs/group-by-folder.png)

リソースは、フレームごとにリストされます。

![フォルダなし](imgs/no-folders.png)

[frames-pane]: /web/tools/chrome-devtools/manage-data/imgs/frames-pane.png
[frames]: /web/tools/chrome-devtools/manage-data/imgs/frames.png
[resource]: /web/tools/chrome-devtools/manage-data/imgs/resource.png

##  ドメインとフォルダによるリソースの整理{:#sources}

ドメインとディレクトリごとに整理されたリソースを表示するには、[**Sources**] パネルを使用します。


![[Sources] パネル](imgs/sources.png)

##  名前、タイプなどの基準によるリソースのフィルタ{:#filter}

リソースを名前、タイプなどのさまざまな基準でフィルタするには、[**Network**] パネルを使用します。
詳細については、次のガイドを参照してください。

{# include shared/related_guides.liquid inline=true list=page.related-guides.filter #}


{# wf_devsite_translation #}
