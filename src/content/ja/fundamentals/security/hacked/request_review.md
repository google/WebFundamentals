project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_updated_on:2018-03-14 #}
{# wf_published_on:2015-01-01 #}
{# wf_blink_components:N/A #}

# 再審査をリクエストする {: .page-title }

ユーザーにとって危険または不正なページやサイトであるという表示を解除してもらうには、Google に再審査をリクエストする必要があります。


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="lc3UjnDcMxo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div>

## 必要なもの

*   シェルまたはターミナルのコマンドの知識

## 実施する対策

### 1. 前提条件

再審査をリクエストする前に、以下の手順を行ったことを確認します。

* Search Console でサイトの所有権を確認した
* サイトからハッカーによる被害をクリーンアップした
* 脆弱性を修正した
* 正常なサイトをオンラインに戻した

### 2. ページが利用可能で正常であることを再確認する

念のため、Wget または cURL を使って、サイトのページ（ホームページやハッカーによって改ざんされた URL など）を表示し、現在は正常であることを確認します。
 正常であり、サイトの他のページも同様であるとの確信があれば、再審査をリクエストできます。



注: ページが正常であることを確認するには、ページが Googlebot によってクロールできる状態になっている必要があります。
 `noindex` robots メタタグやディレクティブによってロボットのアクセスやインデックス登録がブロックされていないか確認してください。


### 3. 再審査をリクエストする

再審査をリクエストする前に:

* **問題が本当に修正されていることを確認します**。
問題が残っているのに再審査をリクエストした場合、サイトが危険であると表示される期間がさらに長くなってしまいます。


* **どの問題について再審査をリクエストするのかを再確認します**。再審査は、サイトに起きている問題に応じた特定のツールで行われます。以下のチャネルをご確認ください。


#### A. ハッキングされたサイト

*Search Console の
[**Manual Actions レポート**](https://www.google.com/webmasters/tools/manual-action)にハッキングされたサイトについての通知が表示された場合:*


1. クリーンアップが完了したら再度 [Manual Actions](https://www.google.com/webmasters/tools/manual-action) レポートを開き、問題がサイト全体の一致または部分一致のどちらであるのかを確認します。
2. [**Request a review**] を選択します。

    リクエストを送信するには、サイトをクリーンアップするために行ったことの詳細情報を入力する必要があります。
 ハッキングによるスパムの各カテゴリについて、サイトをどのようにクリーンアップしたかを説明する文を入力できます（例: 「コンテンツ インジェクション タイプのハッキング URL については、スパム コンテンツを削除し、古くなったプラグインを更新して脆弱性を修正しました」）。





#### B. 望ましくないソフトウェア（マルウェアを含む）

*Search Console の
[**Security Issues レポート**](https://www.google.com/webmasters/tools/security-issues)にマルウェアまたは望ましくないソフトウェアについての通知が表示された場合:*


1. Search Console の
[**Security Issues レポート**](https://www.google.com/webmasters/tools/security-issues)を再度開きます。
 このレポートには、以前に確認した警告と感染した URL のサンプルが引き続き表示されている場合があります。
2. [**Request a review**] を選択します。

    リクエストを送信するには、サイトからポリシー違反を削除した方法についての詳細情報を入力する必要があります
 （例: 「ウェブサイトをマルウェアに感染させた第三者のコードを削除し、最新版のコードに置き換えました」）。




*Search Console の
[**Security Issues レポート**](https://www.google.com/webmasters/tools/security-issues)にはマルウェアまたは望ましくないソフトウェアについての通知が表示されなかったが、AdWords アカウントに通知が表示された場合:*


1. [AdWords サポート センター](https://support.google.com/adwords/contact/site_policy)から再審査をリクエストします。



#### C. フィッシングまたはソーシャル エンジニアリング

*Search Console の
[**Security Issues レポート**](https://www.google.com/webmasters/tools/security-issues)にフィッシングについての通知が表示された場合:*


1. Search Console の
[**Security Issues レポート**](https://www.google.com/webmasters/tools/security-issues)を再度開きます。
 このレポートには、以前に確認した警告と感染した URL のサンプルが引き続き表示されている場合があります。
2. [**Request a review**] を選択します。

    リクエストを送信するには、サイトからポリシー違反を削除した方法についての詳細情報を入力する必要があります
 （例: 「ユーザーに個人情報の入力を求めるページを削除しました」）。

3. [google.com/safebrowsing/report_error/](https://www.google.com/safebrowsing/report_error/) でも再審査をリクエストできます。
  このレポートでは、自分のページが誤ってフィッシングと報告されたと思われる場合にサイト所有者が報告できるのに加えて、フィッシング ページをクリーンアップした後、警告を解除するための審査も依頼できます。



### 4. 再審査が行われるまで待つ

* **スパムを含むハッキングの場合の再審査所要時間:** ハッキングされてスパムを含むサイトの再審査には、数週間かかることがあります。
 スパムの場合の再審査には、手動による調査やハッキングされたページの完全な再処理が含まれるためです。
 審査に合格すると、[Security Issues] には、ハッキング カテゴリのタイプやハッキングされた URL のサンプルは表示されなくなります。
* **マルウェアの場合の再審査所要時間:** マルウェアに感染したサイトの再審査には、数日かかります。
 再審査が完了すると、Search Console の **メッセージ** に回答が表示されます。
* **フィッシングの場合の再審査所要時間:** フィッシングの場合の再審査には 1 日ほどかかります。
 審査に合格した場合は、ユーザーに表示されるフィッシング警告が削除され、ページが再び検索結果に表示されるようになります。


サイトが正常であることが Google で確認されると、72 時間以内にブラウザや検索結果から警告が削除されます。


問題が解決していないと Google が判断した場合は、調査を続ける上で役立つように、Search Console のセキュリティの問題レポートに感染した URL のサンプルがさらに表示されます。
 マルウェアやハッキングされてスパムを含むサイトの警告は、ユーザーを保護するための注意として、検索結果やブラウザに表示されたままになります。



### 最終ステップ

* **審査に合格した場合、**サイトが想定どおり機能すること
  （ページが正しく読み込まれ、リンクがクリックできること）を確認します。 サイトの安全性を保つため、[サイトの問題を修正して管理する](clean_site)のステップで作成した管理計画とセキュリティ計画を実施することを、すべてのサイト所有者におすすめします。



    詳細については、[StopBadware](https://www.stopbadware.org) の以下の情報をご検討ください。


      * [Preventing badware: basics](https://www.stopbadware.org/prevent-badware-basics)
      * [Additional resources: hacked sites](https://www.stopbadware.org/hacked-sites-resources)

* **審査に合格しなかった場合、** サイトに[マルウェア](hacked_with_malware)や[スパム](hacked_with_spam)がないかどうか、またはハッカーによる変更や新たに作成されたファイルがないかどうかを再度確認してください。
 または、[サポートチームの専門家](support_team)にサポートを依頼することをご検討ください。


