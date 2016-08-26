project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml

{# wf_review_required #}
{# wf_updated_on: 2015-03-26 #}
{# wf_published_on: 2000-01-01 #}

# Redirect HTTP to HTTPS {: .page-title }

{% include "_shared/contributors/TODO.html" %}





## TL;DR {: .hide-from-toc }
- ページの先頭に標準リンクを置いて、検索エンジンに、https がサイトを取得するための最良の方法であることを伝えます。


ページに &lt;link rel="canonical" href="https://…"/&gt; タグを設定します。 [This
helps search engines](https://support.google.com/webmasters/answer/139066?hl=en)
サイトを取得するための最良の方法を知っています。

ほとんどのウェブ サーバーは、単純なリダイレクト機能を提供しています。 301 (完全に移動) を使用して、
HTTPS のバージョンが標準であり、ユーザーを HTTP からサイトの HTTPS バージョンにリダイレクトすることを、検索エンジンやブラウに示します。

