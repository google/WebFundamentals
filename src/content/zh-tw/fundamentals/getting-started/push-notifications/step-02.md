project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 設置和運行本地Web服務器

{# wf_review_required #}
{# wf_updated_on: 2016-05-13 #}
{# wf_published_on: 2000-01-01 #}

# 運行本地Web服務器 {: .page-title }

{% include "_shared/contributors/TODO.html" %}


Translated By: 

{% include "_shared/contributors/henrylim.html" %}



**在localhost1開啟一個Web服務器**

在這個codelab中，你需要運行一個本地Web服務器。你或許已經自己設置了。若沒有，開啟命令提示符,
導航至 **_push-notifications_** 文件夾。運行以下的Python命令以啟動服務器:


    $ python -m SimpleHTTPServer
    

這將會在默認的HTTP端口開啟一個Web服務器。
從你的遊覽器，導航到[localhost](http://localhost)。
你將會看到 **_push-notifications_** 的頂層目錄。

導航到[localhost/app](http://localhost/app)以查看在 **_app_** 文件夾裏自己的代碼。
導航到[localhost/completed](http://localhost/completed)以查看這codelab每個步驟的完整的代碼。

如果你沒有安裝Python,你可以在[這裏](https://www.python.org/downloads/)下載。如果在啟動服務器時遇到問題，[請檢查](https://www.google.com/search?q=what+is+using+port) 是不是有其他的服務在使用SimpleHTTPServer的端口。

這codelab裏的命令行示例都使用 bash shell。

Windows用戶需使用命令提示符裏的MS-DOS命令: 檢查這指南裏相等的DOS / bash命令。要不然，你可能需要使用Cygwin環境。

另外，你也可以使用: [XAMPP](https://www.apachefriends.org/index.html) or [MAMP](https://www.mamp.info/en/).
