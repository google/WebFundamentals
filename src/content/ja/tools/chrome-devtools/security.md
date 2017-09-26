project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: サイト上のすべてのリソースが HTTPS で保護されていることを確認するには、[Security] パネルを使用します。

{# wf_updated_on:2016-03-09 #}
{# wf_published_on:2015-12-21 #}

# セキュリティの問題を理解する {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

ウェブサイトと、ウェブサイトに個人情報の管理を任せているユーザーの両方にとって、HTTPS は[重要なセキュリティとデータ整合性][why-https]を与えるものです。
セキュリティの問題をデバッグしたり、ウェブサイトに HTTPS が正しく実装されていることを確認したりするには、Chrome DevTools の [Security] パネルを使用します。




### TL;DR {: .hide-from-toc }
- 現在のページが安全であるかをすぐに確認するには、[Security Overview] を使用します。
- 個々のオリジンを調べ、安全なオリジンの場合は接続や証明書の詳細を表示し、安全ではないオリジンの場合はどのリクエストが保護されていないかを正確に把握します。


##  セキュリティの概要

ページの全体的なセキュリティを表示するには、DevTools を開いて [Security] パネルに移動します。
 

最初に表示されるのは [Security Overview] です。[Security Overview] では、ページが安全かどうかを一目で確認できます。
安全なページの場合は、「`This page is secure (valid HTTPS).`」というメッセージが表示されます。


![[Security Overview]、安全なページ](images/overview-secure.png)

[**View certificate**] をクリックして、[メインオリジン][same-origin-policy]のサーバー証明書を表示します。
 

![証明書の表示](images/view-certificate.png)

安全ではないページの場合は、「`This page is not secure.`」というメッセージが表示されます。

[Security] パネルでは、安全ではないページについて 2 つのタイプで区別しています。
リクエストされたページが HTTP を介して提供されている場合、メインオリジンには非セキュアのフラグが付けられます。
 

![[Security Overview]、セキュアでないメインオリジン](images/overview-non-secure.png)

リクエストされたページが HTTPS を介して取得され、次にそのページが HTTP を使用して他のオリジンからコンテンツを取得する場合も、ページに非セキュアのフラグが付けられます。
これは、[混合コンテンツ][mixed-content] ページと呼ばれています。
混合コンテンツ ページは、HTTP コンテンツが盗聴者からアクセス可能で、man-in-the-middle 攻撃に対して脆弱であるため、部分的にしか保護されていません。
 

![[Security Overview]、混合コンテンツ](images/overview-mixed.png)

[**View request in Network Panel**] をクリックして [Network] パネルのフィルタされたビューを開き、HTTP で提供されているリクエストを正確に把握します。
ここでは、すべてのオリジンからの保護されていないリクエストがすべて表示されます。
 

![[Network] パネル、安全ではないリソース、すべてのオリジン](images/network-all.png)

##  オリジンの調査

安全なオリジンまたは安全ではないオリジンを個別に調べるには、左側のパネルを使用します。 

安全なオリジンをクリックし、そのオリジンの接続と証明書の詳細を表示します。


![オリジンの詳細、安全](images/origin-detail-secure.png)

安全ではないオリジンをクリックすると、[Security] パネルに [Network] パネルのフィルタされたビューへのリンクが表示されます。 

![オリジンの詳細、安全ではない](images/origin-detail-non-secure.png)

このリンクをクリックすると、そのオリジンからのリクエストのうち、HTTP で提供されたものを正確に把握できます。
 

![[Network] パネル、安全ではないリソース、1 つのオリジン](images/network-one.png)





[mixed-content]: https://developers.google.com/web/fundamentals/security/prevent-mixed-content/what-is-mixed-content
[same-origin-policy]: https://en.wikipedia.org/wiki/Same-origin_policy
[why-https]: https://developers.google.com/web/fundamentals/security/encrypt-in-transit/why-https


{# wf_devsite_translation #}
