project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Chrome の Device Mode の仮想端末を使用して、モバイル ファーストのウェブサイトを構築します。

{# wf_updated_on:2016-03-07 #}
{# wf_published_on:2015-04-13 #}

# Device Mode でのモバイル端末のシミュレート {: .page-title }

{% include "web/_shared/contributors/pbakaus.html" %}

Chrome DevTools の Device Mode を使用して、モバイル ファーストの非常にレスポンシブなウェブサイトを構築します。ここでは、Device Mode を使用してさまざまな端末やその機能をシミュレートする方法について説明します。

警告:Device Mode では、モバイル端末でサイトがどのように見えるか、実際に近い見た目で確認できますが、全体像を把握するには、常に実際の端末を使ってテストする必要があります。
たとえば、DevTools ではモバイル端末のパフォーマンス特性はエミュレートできません。



##  要約

* Retina ディスプレイを含め、[さまざまな画面サイズや解像度](/web/tools/chrome-devtools/device-mode/emulate-mobile-viewports)でサイトをエミュレートします。
* CSS メディアクエリのビジュアル化や[調査](/web/tools/chrome-devtools/iterate/device-mode/media-queries)により、応答性が高くなるように設計します。
* 他のタブへのトラフィックに影響を与えずに、[ネットワーク エミュレータ](/web/tools/chrome-devtools/network-performance/network-conditions)を使用してサイトのパフォーマンスを評価します。
* タップイベント、位置情報、端末の向きについて正確に[端末入力をシミュレート](/web/tools/chrome-devtools/device-mode/device-input-and-sensors)します。

##  Device Mode の切り替え{: #toggle }

[**Device Mode**] ボタンで Device Mode をオンまたはオフに切り替えます。

![Device Mode を最初に開始](imgs/device-mode-initial-view.png)

Device Mode がオンのときは、アイコンは青色です（![Device Mode オン](imgs/device-mode-on.png)）。


そしてオフのときは、アイコンは灰色です（![Device Mode オフ](imgs/device-mode-off.png)）。


Device Mode はデフォルトでは有効になっています。 

また、<kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>（Mac）または <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>M</kbd>（Windows、Linux）を押して Device Mode を切り替えることもできます。このショートカットを使用するには、マウスのフォーカスが DevTools ウィンドウにある必要があります。フォーカスがビューポートにある場合は、[Chrome のユーザー切り替えショートカット](https://support.google.com/chrome/answer/157179)がトリガーされます。










{# wf_devsite_translation #}
