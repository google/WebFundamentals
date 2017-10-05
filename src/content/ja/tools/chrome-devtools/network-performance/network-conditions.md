project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: ユーザーがモバイル環境で直面するネットワーク状態を見落としてしまうことがよくあります。DevTools を使って、さまざまなネットワーク状態のエミュレーションを行います。ユーザーにとって大切なのは、読み込み時間の問題を解決することです。

{# wf_updated_on:2015-07-20 #}
{# wf_published_on:2015-04-13 #}

#  さまざまなネットワーク状態でのパフォーマンスの最適化 {: .page-title }

{% include "web/_shared/contributors/megginkearney.html" %}
{% include "web/_shared/contributors/jonathangarbee.html" %}

ユーザーがモバイル環境で直面するネットワーク状態を見落としてしまうことがよくあります。DevTools を使って、さまざまなネットワーク状態のエミュレーションを行います。ユーザーにとって大切なのは、読み込み時間の問題を解決することです。


### TL;DR {: .hide-from-toc }
- 他のタブへのトラフィックに影響を与えずに、Chrome DevTools ネットワーク エミュレーターを使用してサイトのパフォーマンスを評価します。
- 対象端末のネットワーク状態固有のカスタム プロファイルを使用します。


##  ネットワーク接続のエミュレーション

Network conditioning を使って、Edge、3G、オフラインなど、さまざまなネットワーク接続でサイトをテストできます。また、ダウンロードやアップロードの最大スループット（データ転送速度）を調整できます。遅延操作では、接続のラウンド トリップ時間（RTT）に最小限の遅延を適用します。



Network conditioning は、[Network] パネルから有効にします。ドロップダウンから接続を選択し、ネットワーク スロットルと遅延操作を適用します。


![ネットワーク スロットルの選択](imgs/throttle-selection.png)

**使い方**: [Network conditions](#network-conditions) ドロワーからネットワーク スロットルを設定することもできます。


スロットルを有効にすると、パネルのインジケーターに警告アイコンが表示されます。このアイコンにより、他のパネルを表示しているときもスロットルが有効になっていることが分かります。


![警告インジケーター付き [Network] パネル セレクター](imgs/throttling-enabled.png)

##  カスタム スロットル

DevTools には、既定の状態の強固な基盤が用意されています。対象端末の主な状態に対応するように、個別に状態の追加が必要になることがあります。


状態を追加するには、ドロップダウンを開いて状態を適用します。[**Custom**] という見出しの下にある [**Add...**] オプションを選択します。これにより、DevTools の [Settings] ダイアログが [Throttling] タブが表示された状態で開きます。



![スロットルの設定インデックス](imgs/throttle-index.png)

まず、[**Add custom profile**] ボタンをクリックします。これにより、プロファイル状態を指定するインライン フォームが開きます。ニーズを満たすよう、正確にフォームに入力したら [**Add**] ボタンをクリックします。



![スロットルの設定でカスタム スロットルを追加](imgs/add-custom-throttle.png)

エントリにカーソルを合わせると、既存のカスタム プロファイルを変更できます。カーソルを合わせたときに、エントリの右側に [**Edit**] アイコンと [**Delete**] アイコンが表示されます。


![スロットルの設定でカスタム エントリを変更](imgs/hover-to-modify-custom-throttle.png)

ここで、設定ダイアログを閉じます。状態を選択する [**Custom**] 見出しの下に、新しく設定したカスタム プロファイルが表示されます。


##  [Network conditions] ドロワーを開く {:#network-conditions}

[**Network conditions**] ドロワーと共に他の DevTools パネルが開いていても、ネットワーク機能にアクセスできます。
 

![[Network conditions] ドロワー](imgs/network-drawer.png)

DevTools のメインメニューからドロワーにアクセスします（**メインメニュー** > [**More Tools**] > [**Network Conditions**] の順にクリックします）。


![[Network conditions] ドロワーを開く](imgs/open-network-drawer.png)


{# wf_devsite_translation #}
