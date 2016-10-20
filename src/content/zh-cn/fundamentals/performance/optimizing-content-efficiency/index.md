project_path: /web/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 每个应用所下载的数据数量不断增加。为了提供卓越的性能，我们需要优化每一个字节的交付！

{# wf_updated_on: 2014-04-28 #}
{# wf_published_on: 2014-03-31 #}

# 优化内容效率 {: .page-title }

{% include "web/_shared/contributors/ilyagrigorik.html" %}



我们的网络应用在范围、目标和功能上都在不断增长。这是件好事！ 但是向着更丰富的网络无情进军的过程也推动了另一种趋势：每个应用所需下载的数据量也在持续稳步增长。为了提供卓越的性能，我们需要优化每一个字节数据的交付！


现代网络应用是什么样子呢？ [HTTP 归档](http://httparchive.org/){: .external } 可以帮助我们回答此问题。此项目跟踪网络是如何构建的，具体方法如下：定期抓取最受欢迎的网站（Alexa 百万热门网站列表中的前 30 万个）， 并记录和汇总每个单独目标的数字资源、内容类型和其他元数据的分析数据。

<img src="images/http-archive-trends.png" class="center" alt="HTTP 归档趋势">

<table>
<thead>
  <tr>
    <th></th>
    <th>第 50 百分位</th>
    <th>第 75 百分位</th>
    <th>第 90 百分位</th>
  </tr>
</thead>
<tr>
  <td data-th="类型">HTML</td>
  <td data-th="50%">13 KB</td>
  <td data-th="75%">26 KB</td>
  <td data-th="90%">54 KB</td>
</tr>
<tr>
  <td data-th="类型">图片</td>
  <td data-th="50%">528 KB</td>
  <td data-th="75%">1213 KB</td>
  <td data-th="90%">2384 KB</td>
</tr>
<tr>
  <td data-th="类型">JavaScript</td>
  <td data-th="50%">207 KB</td>
  <td data-th="75%">385 KB</td>
  <td data-th="90%">587 KB</td>
</tr>
<tr>
  <td data-th="类型">CSS</td>
  <td data-th="50%">24 KB</td>
  <td data-th="75%">53 KB</td>
  <td data-th="90%">108 KB</td>
</tr>
<tr>
  <td data-th="类型">其他</td>
  <td data-th="50%">282 KB</td>
  <td data-th="75%">308 KB</td>
  <td data-th="90%">353 KB</td>
</tr>
<tr>
  <td data-th="类型"><strong>总计</strong></td>
  <td data-th="50%"><strong>1054 KB</strong></td>
  <td data-th="75%"><strong>1985 KB</strong></td>
  <td data-th="90%"><strong>3486 KB</strong></td>
</tr>
</table>

以上数据呈现了 2013 年 1 月到 2014 年 1 月间，热门网站所需加载的数据字节数的增长趋势。当然，并非每个网站都以相同的速率增长，也并非每个网站都需要相同数量的数据，我们也因此重点标出了分布范围内几个不同的分位数：第 50（中位数）、第 75 和第 90。

2014 年初，处于中位数的网站需要进行 75 次请求，传输共 1054 KB 字节的数据，这一需要传输的数据量（以及请求数）在上一年中稳步增长。这本身并不值得意外，但它确实带来了重要的性能影响：的确，互联网速度是越来越快了，但在不同国家/地区的增长速度并不一样，而许多用户仍受制于数据流量瓶颈和昂贵的流量套餐价格，尤其在移动设备上。

与桌面设备上的应用不同，网络应用不需要单独的安装过程：输入网址，然后就会被启动和运行了。这是网络的一个关键特征。但是，要做到这一步，**我们通常需要加载几十个、有时是几百个不同的资源，它们加起来可达几兆字节的数据量，并且必须在几百毫秒内汇聚起来，以实现我们想要的即搜即得的网络体验。**

实现以这些要求为前提的即搜即得网络体验是个不小的壮举，这就是为什么优化内容效率是至关重要的：消除不必要的下载，通过各种压缩技术来优化资源的传输编码，并利用缓存来消除多余的下载。


