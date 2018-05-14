project_path: /web/tools/_project.yaml
book_path: /web/tools/_book.yaml
description:在开发计算机网络服务器上托管网站，然后从 Android 设备访问内容。

{# wf_updated_on:2016-04-07 #}
{# wf_published_on:2015-04-13 #}

# 访问本地服务器 {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}
{% include "web/_shared/contributors/megginkearney.html" %}

在开发计算机网络服务器上托管网站，然后从 Android 设备访问内容。


使用 USB 电缆和 Chrome DevTools，您可以从开发计算机运行网站，然后在 Android 设备上查看网站。
 


### TL;DR {: .hide-from-toc }
- 利用端口转发，您可以在 Android 设备上查看开发计算机网络服务器中的内容。
- 如果您的网络服务器正在使用自定义域名，您可以将 Android 设备设置为访问位于具有自定义域名映射的网域中的内容。


## 设置端口转发{:#port-forwarding}

端口转发使您的 Android 设备可以访问在开发计算机网络服务器上托管的内容。
端口转发通过在映射到开发计算机上 TCP 端口的 Android 设备上创建侦听 TCP 端口的方式工作。端口之间的流量通过 Android 设备与开发计算机之间的 USB 连接传输，所以连接并不取决于您的网络配置。



要启用端口转发，请执行以下操作：

1. 在您的开发计算机与 Android 设备之间设置[远程调试](.)。
完成后，您应在 **Inspect Devices** 对话框的左侧菜单中看到 Android 设备，还应看到 **Connected** 状态指示器。


1. 在 DevTools 的 **Inspect Devices** 对话框中，启用 **Port forwarding**。
1. 点击 **Add rule**。

   ![添加端口转发规则](imgs/add-rule.png)
1. 在左侧的 **Device port** 文本字段中，输入 Android 设备上您想要从其访问网站的 `localhost` 端口号。例如，如果您想要从 `localhost:5000` 访问网站，则应输入 `5000`。
1. 在右侧的 **Local address** 文本字段中，输入开发计算机网络服务器上运行的您的网站的 IP 地址或主机名，后面紧跟端口号。例如，如果您的网站在 `localhost:7331` 上运行，则应输入 `localhost:7331`。

1. 点击 **Add**。

端口转发已设置完毕。您可以在该设备位于 **Inspect Devices** 对话框内的标签上看到端口转发的状态指示器。


![端口转发状态](imgs/port-forwarding-status.png)

要查看内容，请在您的 Android 设备上打开 Chrome，然后转至您在 **Device port** 中指定的 `localhost` 端口。
例如，如果您在字段中输入了 `5000`，则应转至 `localhost:5000`。

 

## 映射到自定义本地域名{:#custom-domains}

利用自定义域名映射，您可以在 Android 设备上查看当前使用自定义域名的开发计算机上网络服务器中的内容。


例如，假设您的网站使用仅在白名单网域 `chrome.devtools` 上运行的第三方 JavaScript 库。
因此，您可以在开发计算机上的 `hosts` 文件中创建条目，将此网域映射到 `localhost`（如 `127.0.0.1 chrome.devtools`）。设置自定义域名映射和端口转发后，您将能够在 Android 设备上查看网站，网址为 `chrome.devtools`。

 

### 为代理服务器设置端口转发

要映射自定义域名，您必须在开发计算机上运行代理服务器。
代理服务器示例包括 [Charles][charles]、[Squid][squid] 和 [Fiddler][fiddler]。


要为代理设置端口转发，请执行以下操作：

1. 运行代理服务器并记下其正在使用的端口。**注**：代理服务器和您的网络服务器必须在不同的端口上运行。
1. 为您的 Android 设备设置[端口转发](#port-forwarding)。在 **local address** 字段中，输入 `localhost:`，后面紧跟运行代理服务器的端口。例如，如果代理服务器在端口 `8000` 上运行，您应输入 `localhost:8000`。
在 **device port** 字段中，输入您想要使 Android 设备在其上面侦听的端口号，如 `3333`。


[charles]: http://www.charlesproxy.com/
[squid]: http://www.squid-cache.org/
[fiddler]: http://www.telerik.com/fiddler

### 在您的设备上配置代理设置

接下来，您需要配置 Android 设备，以便与代理服务器进行通信。
 

1. 在您的 Android 设备上，转至 **Settings** > **Wi-Fi**。
1. 长按您当前连接到的网络的名称。
   **注**：代理设置的适用范围为单个网络。
3. 点按 **Modify network**。
4. 点按 **Advanced options**。将会显示代理设置。
5. 点按 **Proxy** 菜单，然后选择 **Manual**。
6. 在 **Proxy hostname** 字段中，输入 `localhost`。
7. 在 **Proxy port** 字段中，输入您在前一部分中为 **device port** 输入的端口号。
8. 点按 **Save**。

进行这些设置后，您的设备会将所有请求转发给开发计算机上的代理。
代理会代表您的设备发出请求，这样就可以正确解析对自定义本地域名的请求。


现在，您可以在 Android 设备上访问自定义域名，就像您在开发计算机上访问一样。
 

如果您的网络服务器正在非标准端口上运行，从 Android 设备请求内容时请务必指定端口。例如，如果网络服务器正在端口 `7331` 上使用自定义域名 `chrome.devtools`，您从 Android 设备上查看网站时应使用网址 `chrome.devtools:7331`。

 

**提示**：要恢复正常浏览，与开发计算机断开连接后请务必在您的 Android 设备上还原代理设置。



{# wf_devsite_translation #}
