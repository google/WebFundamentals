project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description: Lighthouse の監査項目「ビューポートのサイズに適合したコンテンツ」のリファレンス ドキュメント。

{# wf_updated_on: 2016-10-04 #}
{# wf_published_on: 2016-10-04 #}

#  ビューポートのサイズに適合したコンテンツ {: .page-title }

##  監査が重要である理由 {: #why }

この監査では、ページ上のコンテンツの幅と、ビューポートの幅が等しいかがチェックされます。
コンテンツの幅がビューポートよりも小さいまたは大きい場合、そのページはモバイル画面向けに最適化されていないとみなされます。



##  監査に合格する方法 {: #how }

この監査によって、モバイル端末向けにページが最適化されているかを確認するのは遠回りになります。
これからサイトを最適化する場合は、まず[レスポンシブ ウェブデザインの基本](/web/fundamentals/design-and-ux/responsive/)をご覧ください。



以下の場合、この監査について考慮する必要はありません。

* サイトをモバイル画面向けに最適化する必要はない。
* 意図的にページのコンテンツ幅をビューポート幅よりも小さく、または大きくしている。


{% include "web/tools/lighthouse/audits/implementation-heading.html" %}

`window.innerWidth === window.outerWidth` であれば、監査に合格します。


{# wf_devsite_translation #}
