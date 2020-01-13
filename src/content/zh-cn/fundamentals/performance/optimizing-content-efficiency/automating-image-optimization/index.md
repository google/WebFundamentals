project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description:图像格式！

{# wf_updated_on: 2019-02-06#}
{# wf_published_on: 2017-11-16 #}
{# wf_blink_components: Blink>Image,Internals>Images,Internals>Images>Codecs #}

# 自动优化图像 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**我们都应该自动压缩图像。**

2017 年，图像优化应该实现自动化。 我们很容易忘记，最佳做法会发生改变，而且没有通过构建管道的内容很容易丢失。
 若要实现自动化：请在构建过程中使用 [imagemin](https://github.com/imagemin/imagemin)
或 [libvps](https://github.com/jcupitt/libvips)。 当然，这不是唯一的方法，还有许多替代方案可供使用。


大多数 CDN（例如，[Akamai](https://www.akamai.com/us/en/solutions/why-akamai/image-management.jsp)）和 [Cloudinary](https://cloudinary.com)、[imgix](https://imgix.com)、[Fastly Image
Optimizer](https://www.fastly.com/io/)、[Instart Logic
SmartVision](https://www.instartlogic.com/technology/machine-learning/smartvision)
或 [ImageOptim API](https://imageoptim.com/api) 等第三方解决方案可提供全面的自动化图像优化解决方案。





您在阅读博文和调整配置上投入的时间成本超过每月的服务费（Cloudinary 提供
[免费的](http://cloudinary.com/pricing)服务计划）。
 如果您因为成本或延迟问题不想外包该项工作，那么上文提到的开源项目是不错的选择。
[Imageflow](https://github.com/imazen/imageflow) 或
[Thumbor](https://github.com/thumbor/thumbor) 等项目可启用自托管替代方案。

**所有人都应该高效压缩图像。**

至少可以使用 [ImageOptim](https://imageoptim.com/)。 该工具可以大大减小图像大小，同时保持视觉质量。
 此外，您也可以使用 Windows 和 Linux
[替代方案](https://imageoptim.com/versions.html)。

更具体地说，就是通过
[MozJPEG](https://github.com/mozilla/mozjpeg) 运行
JPEG（`q=80` 或更低，适用于网页内容）并考虑支持[渐进式
JPEG](http://cloudinary.com/blog/progressive_jpegs_and_green_martians)，PNG 通过 [pngquant](https://pngquant.org/)，SVG 则通过 [SVGO](https://github.com/svg/svgo) 进行优化。
 通过明确地删除元数据（对于 pngquant，使用 `--strip`）来缩小文件的体积。
 不要提供体积巨大的动画 GIF，而是提供
[H.264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) 视频（或者，Chrome、Firefox 和 Opera 支持的
[WebM](https://www.webmproject.org/)）！如果无法做到这一点，请至少使用 [Giflossy](https://github.com/pornel/giflossy)。
 如果您可以分出额外的 CPU 周期，需要高于网络平均质量的品质并且能够忍受过慢的编码时间，则可尝试
[Guetzli](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html)。



某些浏览器通过 Accept 请求标头展示其对不同格式图像的支持。
我们可借此有条件地提供格式：例如，为基于 Blink 的浏览器（如 Chrome）提供有损
[WebP](/speed/webp/)，为其他浏览器提供 JPEG/PNG 等回退方案。


您还可以执行更多操作。 您可以使用现有工具生成并提供 `srcset`
断点， 结合
[client-hints](/web/updates/2015/09/automating-resource-selection-with-client-hints)
在基于 Blink 的浏览器中自动化选择资源，并且注意
[Save-Data](/web/updates/2016/02/save-data) 提示向在浏览器中选择“节省数据”的用户发送更少的数据。



图像文件的大小越小，用户的网络体验越好，在移动设备上尤其如此。
 在本文中，我们将探讨如何通过现代压缩技术减小图像大小，同时最大限度降低对图像质量的影响。



## 简介 {: #introduction }

**图像仍然是网络膨胀的首要原因。**

图像文件通常较大，因此会占用大量的互联网带宽。
 根据 [HTTP Archive](http://httparchive.org/) 的数据显示，传输用于提取网页的 60% 的数据都是由 JPEG、PNG
和 GIF 组成的图像。
 截至 2017 年 7 月，网站的平均加载内容为 3.0MB，而其中
[1.7MB](http://httparchive.org/interesting.php#bytesperpage) 为图像。


根据 Tammy Everts 的研究，[已证明](https://calendar.perfplanet.com/2014/images-are-king-an-image-optimization-checklist-for-everyone-in-your-organization/)将图像添加到页面或使现有图像变大可以提高转换率。
 图像不可能消失，因此投资有效的图像压缩策略以最大限度减少膨胀变得非常重要。




<img src="images/Modern-Image00.jpg" alt="每页图像越少转换率越高。
 平均每页 19 个图像的转换率高于平均每页 31 个图像的转换率。" />


根据 [Soasta/Google
Research](https://www.thinkwithgoogle.com/marketing-resources/experience-design/mobile-page-speed-load-time/)
2016 年的统计，图像是预测转换率的第二高指标，且最佳页面的图像数要少 38%。



图像优化包含可以减小图像文件大小的不同措施，
 而这最终取决于图像所需的视觉保真度。



<img src="images/image-optimisation.jpg" alt="图像优化涉及多种不同的技术" /> <strong>图像优化：
</strong>选择正确的图像格式、高效压缩图像并优先处理关键图像，而非可延迟加载的图像。




常见的图像优化方法包括压缩，使用
[`<picture>`](/web/fundamentals/design-and-ux/responsive/images)/[`<img
srcset>`](/web/fundamentals/design-and-ux/responsive/images) 根据屏幕大小响应减小图像大小，以及调整图像大小以降低图像解码成本。




<img src="images/chart_naedwl.jpg" alt="HTTP Archive 提供的潜在图像节省柱状图，确认第 95 个百分位的潜在图像节省为 30KB。" /> 根据 [HTTP
Archive](http://jsfiddle.net/rviscomi/rzneberp/embedded/result/) 统计，第 95 个百分位（查看累积分布函数）的每个图像节省 30KB！</strong>




我们在更好地统一优化图像方面还有很大的空间。


<img src="images/image-optim.jpg" alt="在 Mac 上使用 ImageOptim 压缩多个图像，节省超过 50%" />


ImageOptim 是一款免费工具，可以通过现代压缩技术和去除不必要的 EXIF 元数据减小图像大小。




如果您是设计师，还可以使用 [ImageOptim plugin for
Sketch](https://github.com/ImageOptim/Sketch-plugin) 在导出时优化资产，
 如此可节省大量时间。

### 如何判断我的图像是否需要优化？ {: #do-my-images-need-optimization }

您可以通过 [WebPageTest.org](https://www.webpagetest.org/) 审核网站，其将突出显示能够更好地优化图像的机会（请参阅“压缩图像”）。




<img src="images/Modern-Image1.jpg" alt="WebPageTest 支持通过压缩图像部分审核图像压缩情况" />


WebPageTest 报告的“图像压缩”部分列出可以更有效压缩的图像以及估计压缩能够节省的文件大小。


<img src="images/Modern-Image2.jpg" alt="WebPageTest 的图像压缩建议" />




[Lighthouse](/web/tools/lighthouse/) 审核性能最佳做法， 包括审核图像优化情况，并建议可以进一步压缩的图像，或者指出屏幕外可以延迟加载的图像。




从 Chrome 60 开始，Lighthouse 现在支持 Chrome
DevTools 中的 [Audits
面板](/web/updates/2017/05/devtools-release-notes#lighthouse)：


<img src="images/hbo.jpg" alt="Lighthouse 审核 HBO.com，并显示图像优化建议" /> Lighthouse 可以审核网络性能、最佳做法和渐进式网页应用功能。






您可能还熟悉其他性能审核工具，如 [PageSpeed
Insights](/speed/pagespeed/insights/) 或 Cloudinary 的 [Website Speed
Test](https://webspeedtest.cloudinary.com/)（包含详细的图像分析审核）。


## <a id="choosing-an-image-format" href="#choosing-an-image-format">如何选择图像格式？</a>

正如 Ilya Grigorik 在其出色的[图像优化指南](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)中所指出，图像的“正确格式”需要兼顾所需的视觉效果及功能要求。
 您是使用光栅图像还是矢量图像？


<img src="images/rastervvector.png" alt="矢量图像与光栅图像"/>



[光栅图形](https://en.wikipedia.org/wiki/Raster_graphics)通过对矩形像素网格内的每个像素的值编码来表示图像。
这些图像不具备与分辨率或缩放无关的属性。 在必须保持照片写实感的情况下，可以使用 WebP 或广泛支持的格式（如 JPEG 或 PNG）很好地处理这些图形。
Guetzli、MozJPEG 以及我们讨论的其他工具均非常适用于光栅图形。

[矢量图形](https://en.wikipedia.org/wiki/Vector_graphics)使用点、线和多边形来表示图像和格式，从而使用简单的几何形状（如徽标）提供高分辨率和缩放（如 SVG）更好地处理此使用案例。




如果格式选择错误会为您造成损失。 选择正确图像格式的逻辑流程可能存在风险，因此可以谨慎地尝试其他格式，了解相应的节省情况。



Jeremy Wagner 在其图像优化演讲中提到评估格式时需考虑的[利弊](http://jlwagner.net/talks/these-images/#/2/2)。



## 低调的 JPEG {: #the-humble-jpeg }

[JPEG](https://en.wikipedia.org/wiki/JPEG) 可能是世界上使用最广泛的图像格式。
 如前所述，HTTP
Archive 抓取的网站上有 [45% 的图像](http://httparchive.org/interesting.php)都是 JPEG。
 手机、数码单反相机以及旧式网络摄像头等基本上都支持此编解码器。
 这是一种古老的格式，于
1992 年首次发布。 当时业界已就此进行大量的研究，试图改进其所提供的各种功能。


JPEG 是一种有损压缩算法，通过舍弃信息来节省空间，而研究的主要方向在于尝试保持视觉保真度的同时尽量缩减文件大小。



**您的使用案例可以接受什么样的图像质量？**

JPEG 等格式最适合有多个颜色区域的照片或图像。
 大多数优化工具能让您设置满意的压缩级别；压缩级别越高越容易缩减文件大小，但也可能会产生伪像、光晕或块状降级问题。




<img src="images/Modern-Image5.jpg" alt="从最高质量转向最低质量时，更能感知到 JPEG 压缩伪像" />


JPEG：从最高质量转向最低质量时，可感知的 JPEG 压缩伪像会增加。
 请注意，不同工具中的图像质量分数可能存在很大的差异。



在设置所需的质量时，请考虑图像所属的质量范围：


*   **最高质量** — 质量比带宽更重要。 这可能是因为图像在您的设计中非常重要或者以全分辨率显示。
*   **高质量** — 想要传送较小的文件，但不希望对图像质量产生过多负面影响。
 用户在一定程度上仍然注重图像质量。
*   **低质量** — 很注重带宽，可以接受图像退化。
 网络条件不理想/不好时，可以使用这类图像。
*   **最低质量** — 节省带宽至关重要。 虽然用户希望获得良好的体验，但为了更快地加载页面，也会接受相当糟糕的体验。



接下来，我们将探讨 JPEG 压缩模式，其会对感知性能产生很大的影响。


注：我们有时可能会高估用户所需的图像质量。
 我们可以将图像质量看作与理想的未压缩源存在偏差。
 此外，图像质量也具有主观性。

## JPEG 压缩模式 {: #jpeg-compression-modes }

JPEG 图像格式具有多种不同的[压缩模式](http://cs.haifa.ac.il/~nimrod/Compression/JPEG/J5mods2007.pdf)，
 其中三种较为流行的模式是基线（顺序）、渐进式 JPEG (PJPEG) 及无损。



**基线（或顺序）JPEG 与渐进式 JPEG 有何不同？**

基线 JPEG（大多数图像编辑和优化工具的默认设置）以相对简单的方式进行编码和解码：从上到下。
 在连接速度缓慢或不稳定的情况下加载基线
JPEG 时，用户会先看到图像的顶部，然后随着图像加载逐渐看到图像的其他部分。
 无损 JPEG 与此类似，但压缩率较低。




<img src="images/Modern-Image6.jpg" alt="基线 JPEG 从上到下加载" />
        基线 JPEG 的加载方式是从上到下，而渐进式 JPEG 是从模糊到清晰。



渐进式 JPEG 将图像分成多次扫描， 第一次扫描以模糊或低质量设置显示图像，后续扫描逐步提高图像质量。
 我们可以将这个过程看作“渐进式”提高图像质量。 每次“扫描”图像都会增加图像细节的清晰程度，
 最后合并为全画质图像。



<img src="images/Modern-Image7.jpg" alt="渐进式 JPEG
从低分辨率到高分辨率加载图像" /> </picture> 基线 JPEG
从上到下加载图像 PJPEG 从低分辨率（模糊）到高分辨率加载图像。
 Pat Meenan 还编写了一个[交互式工具](http://www.patrickmeenan.com/progressive/view.php?img=https%3A%2F%2Fwww.nps.gov%2Fplanyourvisit%2Fimages%2FGrandCanyonSunset_960w.jpg)，用于测试和了解渐进式 JPEG 扫描。




无损 JPEG 可以通过[移除 EXIF
数据](http://www.verexif.com/en/)（由数码相机或编辑器添加）、优化图像的[霍夫曼表](https://en.wikipedia.org/wiki/Huffman_coding)或重新扫描图像来优化图像。
[jpegtran](http://jpegclub.org/jpegtran/) 等工具通过在不降低图像质量的同时重新排列压缩数据来实现无损压缩。
[jpegrescan](https://github.com/kud/jpegrescan)、[jpegoptim](https://github.com/tjko/jpegoptim) 和
[mozjpeg](https://github.com/mozilla/mozjpeg)（我们将在稍后介绍）也支持无损 JPEG 压缩。




### 渐进式 JPEG 的优点 {: #the-advantages-of-progressive-jpegs }

PJPEG 能够在加载时提供图像的低分辨率“预览”，从而提高感知性能，与自适应图像相比，用户可以感觉到更快的图像加载速度。



如果使用速度缓慢的 3G 连接，用户可以在只接收到部分文件时了解图像的（大致）内容，并决定是否要等待图像完全加载。
 相比基线 JPEG 从上到下显示图像，这种模式能够提升用户体验。



<img src="images/pjpeg-graph.png" alt="转用渐进式 JPEG 后对等待时间的影响" /> 2015 年，[Facebook 针对其 iOS
应用转用 PJPEG](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)，使得流量消耗量减少 10%。
 此外，Facebook 能够以比以前快 15% 的速度显示高质量图像，从而优化感知加载时间，如上图所示。




对于超过 10KB 的图像，与基线/简单 JPEG 相比，PJPEG 不但可以提高压缩率，而且还可以将带宽使用量减少
[2% 至 10%](http://www.bookofspeed.com/chapter5.html)。
 PJPEG 之所以拥有较高的压缩率是因为 JPEG 中的每次扫描都有其专用的可选[霍夫曼表](https://en.wikipedia.org/wiki/Huffman_coding)。
 现代 JPEG
编码器（例如，[libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/)、MozJPEG
等）可以利用 PJPEG 的灵活性更好地打包数据。

注：为什么 PJPEG 压缩效果更好？基线 JPEG 一次编码一个块。
 而使用 PJPEG，可以将跨多个块的相似[离散余弦变换](https://en.wikipedia.org/wiki/Discrete_cosine_transform)系数一起编码，从而实现更好的压缩效果。




### 谁在生产环境中使用渐进式 JPEG？ {: #whos-using-progressive-jpegs-in-production }

*   [Twitter.com 发布渐进式
JPEG](https://www.webpagetest.org/performance_optimization.php?test=170717_NQ_1K9P&run=2#compress_images)，基线图像质量为 85%。
 其测量用户的感知延迟（第一次扫描的时间和加载总时间）后发现，从整体上而言，PJPEG 在满足低文件大小、可接受转码和解码时间要求方面更具有竞争优势。
*   [Facebook 为其 iOS
应用发布渐进式 JPEG](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)。
    其发现流量消耗量因此减少 15%，并且显示高质量图像的速度加快 15%。
*   [Yelp 转用渐进式
JPEG](https://engineeringblog.yelp.com/2017/06/making-photos-smaller.html)
并发现图像大小因此减小约 4.5%。
 此外，Yelp 还使用 MozJPEG 另外节省 13.8% 的空间。

### 渐进式 JPEG 的缺点 {: #the-disadvantages-of-progressive-jpegs }

PJPEG 的解码速度比基线 JPEG 慢，有时需要长达 3 倍的时间。
 在具有强大 CPU 的台式机上，这个问题可能并不明显，但在性能和资源有限的移动设备上问题会比较突出。
 显示不完整的图层费工费时，因为基本上需要对图像进行多次解码。
 而多次传递可能会占用 CPU 周期。


渐进式 JPEG 也不*总是*更小。 对于非常小的图像（如缩略图），渐进式 JPEG 图像可能比基线图像大。
但是，对于此类小型缩略图，渐进式渲染的效果可能并不太理想。


这意味着在决定是否发布 PJPEG 时，您需要尝试并在文件大小、网络延迟和
CPU 周期的使用之间取得平衡。


注：有时，PJPEG（和所有 JPEG）可以在移动设备上进行硬件解码。
 虽然这不会改善 RAM 影响，但可以排除一些 CPU
问题。 并非所有 Android 设备都支持硬件加速，但高端设备和所有 iOS 设备均支持硬件加速。


某些用户可能会认为渐进式加载是一种缺点，因为很难确定图像是否已经完成加载。
 由于每位受众在这方面的感受可能会大不相同，因此应该评估对您用户有意义的内容。


### 如何创建渐进式 JPEG？ {: #how-to-create-progressive-jpegs }

[ImageMagick](https://www.imagemagick.org/)、[libjpeg](http://libjpeg.sourceforge.net/)、[jpegtran](http://jpegclub.org/jpegtran/)、[jpeg-recompress](http://jpegclub.org/jpegtran/) 和
[imagemin](https://github.com/imagemin/imagemin) 等工具和库都支持导出渐进式
JPEG。
 如果您有现成的图像优化管道，可以直接添加渐进式图像加载支持：


```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true

        }))
        .pipe(gulp.dest('dist'));
});
```

大多数图像编辑工具默认将图像另存为基线 JPEG 文件。


<img src="images/photoshop.jpg" alt="Photoshop 支持从文件导出菜单导出到渐进式
jpeg" /> 大多数图像编辑工具默认将图像另存为基线 JPEG 文件。
 您可以通过转到 File -> Export -> Save for
Web（旧版），然后单击 Progressive 选项，将在 Photoshop 中创建的
所有图像另存为渐进式 JPEG。 Sketch 也支持导出渐进式 JPEG，导出为 JPG 并在保存图像时勾选“Progressive”复选框。



### 色度（或颜色）子采样 {: #chroma-subsampling }

比起亮度（亮度的衡量标准）丢失，人眼更不易察觉图像（色度）中的颜色细节丢失。
 [色度子采样](https://en.wikipedia.org/wiki/Chroma_subsampling)是一种压缩形式，可以降低信号中颜色精度，以助提高亮度。
如此可缩减文件大小（在某些情况下最多可缩减
[15% 至 17%](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/)）而不会对图像质量产生任何负面影响，并且该选项可用于 JPEG
图像。
 此外，子采样还可以减少图像内存使用量。



<img src="images/luma-signal.jpg" alt="信号 = 色度 + 亮度" />


由于对比度负责形成我们在图像中看到的形状，因此定义它的亮度显得非常重要。
 老旧或过滤后的黑白照片可能不包含颜色，但由于亮度，这些照片可以像彩色照片一样呈现细节。
 色度（颜色）对视觉感知的影响较小。


<img src="images/no-subsampling.jpg"
     alt="JPEG 支持多种子采样类型：无、水平以及水平且垂直。" />

JPEG 支持多种不同的子采样类型：无、水平以及水平且垂直。
 此图表来自 Frédéric Kayser 的[马蹄蟹 JPEG 图](http://frdx.free.fr/JPEG_for_the_horseshoe_crabs.pdf)。



就子采样而言，我们已经讨论过多个常见样本。
通常为 `4:4:4`、`4:2:2` 和 `4:2:0`。 但是，这些又表示什么？假设子样本采用格式 A:B:C。
 A 是一行中的像素数，对于
JPEG，此数字通常为 4。B 表示第一行中的颜色数，C
表示第二行中的颜色数。

* `4:4:4` 表示未进行任何压缩，因此完整传输颜色和亮度。
* `4:2:2` 表示进行水平半采样，以及垂直全采样。
* `4:2:0` 表示对第一行像素的一半进行颜色采样，并忽略第二行。


注：jpegtran 和 cjpeg 支持对亮度和色度进行单独的质量配置。
 可以通过添加 `-sample` 标记（例如，`-sample 2x1`）来完成该操作。

以下是一些通用规则：子采样 (`-sample 2x2`) 适用于照片。
无子采样 (`-sample 1x1`) 最适用于屏幕截图、横幅和按钮。
最后，在无法确定时，可以使用折衷方案 (`2x1`)。</aside>

通过减少色度分量中的像素可以明显减少颜色分量的大小，最终减少字节大小。



<img src="images/subsampling.jpg" alt="图像质量为 80 的 JPEG 的色度子采样配置。" /> 图像质量为 80 的 JPEG 的色度子采样配置。



大多数类型的图像都可以考虑采用色度子采样。 不过也有一些例外：由于子采样依赖的是人眼的限制，因此其不适用于颜色细节与亮度同样重要的压缩图像（例如，医学图像）。




由于对文本的子采样不充分可能会降低可读性，因此包含字体的图像也会受到影响。
 使用 JPEG 很难压缩清晰度很高的边缘，因为 JPEG 旨在更好地处理具有柔和过渡效果的摄影场景。




<img src="images/Screen_Shot_2017-08-25_at_11.06.27_AM.jpg" alt="对包含文本的图像重子采样时要谨慎小心" /> [了解
JPEG](http://compress-or-die.com/Understanding-JPG/) 建议在处理包含文本的图像时采用子采样 4:4:4 (1x1)。





冷知识：JPEG
规范中没有指定色度子采样的确切方法，因此不同解码器的处理方法并不相同。 MozJPEG 和
libjpeg-turbo 使用相同的缩放方法。 旧版 libjpeg 使用不同的方法在颜色中增添边缘振荡效应。


注：使用“Save for
Web”功能时，Photoshop 会自动设置色度子采样。 当将图像质量设置为介于 51 至 100 之间时，根本不需要使用子采样 (`4:4:4`)。
 当图像质量低于此值时，则将使用 `4:2:0` 子采样。
 这就是将图像质量从 51 切换到 50 时文件大小大幅缩小的一个原因。


注：提及子采样时经常会提到术语
[YCbCr](https://en.wikipedia.org/wiki/YCbCr)。 这个模型可以表示伽玛校正
[RGB](https://en.wikipedia.org/wiki/RGB_color_model) 颜色空间。
 Y
是伽玛校正亮度，Cb 是蓝色的色度分量，Cr 是红色的色度分量。
 查看 ExifData 时您会看到 YCbCr 就在采样级别的旁边。


有关色度子采样的更多信息，请参阅[为何您的图像不使用色度子采样？](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/)。



### JPEG 已经发展到何种程度？ {: #how-far-have-we-come-from-the-jpeg }

**以下是网络上图像格式的现状：**

*tl;dr — 存在许多碎片。 我们经常需要有条件地为不同浏览器提供不同的图像格式，以充分利用现代化的技术。*



<img src="images/format-comparison.jpg" alt="基于质量对比现代图像格式。
" /> 使用不同的现代图像格式（和优化器）演示大小为 26KB 的目标文件可呈现的效果。
 我们可以使用
[SSIM](https://en.wikipedia.org/wiki/Structural_similarity)（结构相似性）或 [Butteraugli](https://github.com/google/butteraugli) 比较图像质量，稍后我们将详细介绍这部分内容。





*   **[JPEG 2000](https://en.wikipedia.org/wiki/JPEG_2000) (2000)** — JPEG 改进版，从离散余弦变换切换到基于小波的方法。
 **支持的浏览器：Safari 桌面版及 iOS 版**
*   **[JPEG XR](https://en.wikipedia.org/wiki/JPEG_XR) (2009)** — JPEG 和 JPEG 2000 的替代方案，支持
[HDR](http://wikivisually.com/wiki/High_dynamic_range_imaging) 和宽[色域](http://wikivisually.com/wiki/Gamut)颜色空间。
 以较慢的编码/解码速度生成比 JPEG 更小的文件。
 **支持的浏览器：
    Edge、IE。**
*   **[WebP](https://en.wikipedia.org/wiki/WebP) (2010)** — 谷歌发布的基于块预测的格式，支持有损和无损压缩。
    提供与 JPEG 相关的字节节省能力，并且支持透明度的字节重量级
PNG 经常被用于 WebP。 缺乏色度子采样配置和渐进式加载。
 此外，解码时间也比 JPEG 解码慢。
    **支持的浏览器：Chrome、Opera。 Safari 和 Firefox 实验性支持。**
*   **[FLIF](https://en.wikipedia.org/wiki/Free_Lossless_Image_Format) (2015)**
    — 无损图像格式，声称压缩率优于 PNG、无损 WebP、无损
BPG 和无损 JPEG 2000。 **支持的浏览器：
    无。**
*   **HEIF 和 BPG。** 从压缩角度来看，两者并无差别，但具有不同的包装器：
*   **[BPG](https://en.wikipedia.org/wiki/Better_Portable_Graphics) (2015)** —
旨在于
HEVC（[高效率视频编码](http://wikivisually.com/wiki/High_Efficiency_Video_Coding)）方面替换 JPEG 并提高压缩效率。
 与 MozJPEG 和 WebP 相比，似乎可以更好地优化文件大小。
 由于许可问题，可能无法获得广泛应用。
 **支持的浏览器：无。 *请注意，可以使用 [JS 浏览器内解码器](https://bellard.org/bpg/)。***
*   **[HEIF](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)
    (2015)** — 图像和图像序列格式，用于存储已应用约束帧间预测的 HEVC 编码图像。
 Apple 在
[WWDC](https://www.cnet.com/news/apple-ios-boosts-heif-photos-over-jpeg-wwdc/)
上宣布其将探索在 iOS 上使用 HEIF 取代 JPEG，并引证此举最多可将文件大小缩减 2 倍。
 **支持的浏览器：撰写本文时无支持的浏览器，
    不过最终会支持 Safari 桌面版和 iOS 11**

如果您想获得更直观的体验，可以使用[这些](http://xooyoozoo.github.io/yolo-octo-bugfixes/#cologne-cathedral&jpg=s&webp=s)视觉比较工具[之一](https://people.xiph.org/~xiphmont/demo/daala/update1-tool2b.shtml)，了解上述部分图像格式的效果。




根据上文我们可以看出，**浏览器支持并不全面**。如果您想利用上述任何格式，可能需要有条件地为每个目标浏览器提供回退方案。
 在 Google，我们已经见证使用 WebP 取得的成就，因此我们很快会对其进行深入研究。


您还可以提供扩展名为 .jpg（或任何其他扩展名）的图像格式（例如，WebP、JPEG 2000），因为浏览器可以渲染其能够决定媒体类型的图像。
 如此即可在服务器端进行[内容类型协商](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)，以决定要发送的图像，而完全不需要更改 HTML。
Instart Logic 等服务在向客户提供图像时便是使用此方法。


接下来，我们将探讨无法有条件地提供不同图像格式时的选项：**优化 JPEG 编码器**。



### 优化 JPEG 编码器 {: #optimizing-jpeg-encoders }

现代 JPEG 编码器尝试生成更小且更高保真度的 JPEG 文件，同时保持与现有浏览器和图像处理应用的兼容性。
 这类编码器不需要通过在生态系统中推出新图像格式或进行更改来实现压缩增益。
 其中两种编码器便是
MozJPEG 和 Guetzli。

***tl;dr 您应该使用哪种优化 JPEG 编码器？***

* 一般网络资产：MozJPEG
* 如果您主要关注质量，而不介意编码时间过长，可以使用 Guetzli
* 如果您想根据需要进行配置：
 * [JPEGRecompress](https://github.com/danielgtaylor/jpeg-archive)（在后台使用
MozJPEG）
 * [JPEGMini](http://www.jpegmini.com/)。 与 Guetzli 相似，可以自动选择最高质量。
 虽然在技术层面上，JPEGMini 不如 Guetzli 成熟，但其速度更快，并且目标质量范围更适合网页。
 * [ImageOptim API](https://imageoptim.com/api)（[此处](https://imageoptim.com/online)提供免费在线界面），其处理颜色的方式独一无二。
 您可以在整体质量中单独选择颜色质量。 该编码器会自动选择色度子采样级别以保留屏幕截图中的高分辨率颜色，但会避免在自然照片中的平滑颜色上浪费字节。



### 什么是 MozJPEG？ {: #what-is-mozjpeg }

Mozilla 以
[MozJPEG](https://github.com/mozilla/mozjpeg) 形式提供现代化的 JPEG 编码器， [声称](https://research.mozilla.org/2014/03/05/introducing-the-mozjpeg-project/)最多可以将 JPEG 文件缩减 10%。
 使用 MozJPEG 压缩的文件可跨浏览器运行。MozJPEG 的部分功能包括逐行扫描优化、[栅格量化](https://en.wikipedia.org/wiki/Trellis_quantization)（舍弃压缩最少的细节）以及一些合适的[量化表预设](https://calendar.perfplanet.com/2014/mozjpeg-3-0/)，这些预设有助于创建更流畅的高 DPI 图像（如果您愿意费力进行 XML 配置，也可以使用 ImageMagick 实现此目的）。



[ImageOptim](https://github.com/ImageOptim/ImageOptim/issues/45) 支持 MozJPEG，并且存在相对可靠的可配置 [imagemin
插件](https://github.com/imagemin/imagemin-mozjpeg)。
 以下是 Gulp 的实现示例：


```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('mozjpeg', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality:85

    })]))
    .pipe(gulp.dest('dist'))
);
```


<img src="images/Modern-Image10.jpg" alt="MozJPEG 从命令行运行" />





<img src="images/Modern-Image11.jpg" alt="不同质量下的 MozJPEG 压缩。
 在 q=90 时，为 841KB。 在 q=85 时，为 562KB。 在 q=75 时，为 324KB。 同样，由于我们降低质量，因此 Butteraugli 和 SSIM 分数略有下降。" />


MozJPEG：不同质量下的文件大小和视觉相似性分数比较。


我使用 [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)
项目中的 [jpeg-compress](https://github.com/imagemin/imagemin-jpeg-recompress)
计算源图像的 SSIM（结构相似性）分数。
SSIM 是一种用于测量两个图像之间相似性的方法，其中 SSIM
分数是一个图像的质量评价，前提是另一个图像被视为“完美”。

根据我的经验，MozJPEG 是以高视觉质量压缩网络图像同时缩减文件大小的不错选择。
 我发现，对中小型图像使用 MozJPEG（质量为 80 至 85 时）可将文件大小缩小 30% 至 40%，同时可保持可接受的 SSIM，并在
jpeg-turbo 方面获得 5% 至 6% 的提升。
 MozJPEG 相比基线 JPEG [编码速度更慢](http://www.libjpeg-turbo.org/About/Mozjpeg)，不过这可能不会成为您拒绝它的原因。



注：如果您需要为 MozJPEG 提供额外配置支持的工具，以及用于图像比较的免费实用程序，请参阅
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive)。
 《Web Performance in Action》的作者 Jeremy Wagner 使用[此](https://twitter.com/malchata/status/884836650563579904)配置已经取得一些成功。




### 什么是 Guetzli？ {: #what-is-guetzli }

[Guetzli](https://github.com/google/guetzli) 是 Google 开发的一款前景无限（若速度慢）的感知
JPEG 编码器，试图找到在感知上人眼无法区分的最小 JPEG。
 该编码器执行一系列实验，为最终 JPEG 生成提议，并解释每个提议的心理视觉错误。
 除此之外，它还会选择分数最高的提议作为最终输出。


为测量图像之间的差异，Guetzli 使用
[Butteraugli](https://github.com/google/butteraugli)，一种基于人类感知测量图像差异的模型（下文讨论）。
 Guetzli
可以考虑其他 JPEG 编码器不会考虑的一些视觉属性。 例如，由于所见绿光量和蓝色敏感度之间存在关系，因此在对绿色附近的蓝色变化进行编码时不必做到非常精确。




注：图像文件的大小**更多**是取决于所选的**质量**，而不是**编解码器**。
 与通过切换编解码器可以缩小的文件大小相比，最低质量和最高质量 JPEG 之间的文件大小存在更大的差异。
 务必使用可接受的最低质量，
 而不要将质量设置过高，却不加以关注。

与其他压缩程序相比，在给定 Butteraugli
分数的情况下，Guetzli
[声称](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html)可将图像的数据大小减小 20% 至 30%。 使用 Guetzli 需要注意的是其运行速度极其缓慢，并且目前仅适用于静态内容。
查看 README 可知，Guetzli 需要大量内存，每百万像素就需要 1 分钟以及超过 200MB 的 RAM。
 [此 Github
线程](https://github.com/google/guetzli/issues/50)中提供实际应用 Guetzli 的一个好线程。
 在构建静态网站的过程中优化图像时，Guetzli 是理想的选择；但是在按需执行图像优化时，Guetzli 可能不太适合。



注：在构建静态网站的过程中优化图像时，或者在不按需执行图像优化的情况下，Guetzli 可能更适合。



ImageOptim 等工具支持 Guetzli 优化（在[最新版本中](https://imageoptim.com/)）。


```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');

gulp.task('guetzli', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist'))

);
```


<img src="images/Modern-Image12.jpg" alt="Guetzli 从 gulp 运行以进行优化" />



使用
Guetzli 对 3 x 3MP 图像进行编码需时约七分钟（以及高 CPU 使用率），可实现不同程度的节省。 若要存档更高分辨率的照片，可以考虑使用 Guetzli。



<img src="images/Modern-Image13.jpg" alt="不同质量下的 Guetzli 对比。
 在 q=100 时，为 945KB。 在 q=90 时，为 687KB。 在 q=85 时，为 542KB。" /> Guetzli：不同质量的文件大小和视觉相似性分数比较。





注：建议在高质量图像上运行 Guetzli（例如，未压缩输入图像、PNG 源或者质量为 100% 或接近 100% 的 JPEG）。
 尽管也可以在其他图像上运行 Guetzli（例如，质量为 84 或更低的 JPEG），但效果可能较差。


虽然使用 Guetzli 压缩图像非常耗时且 CPU 使用率较高，但对于大型图像，Guetzli 却更为合适。
 在很多情况下，它可以将文件大小缩小高达 40%，同时保持视觉保真度，
 因而非常适合存档照片。 在中小型图像中，Guetzli 也可以缩小文件大小（10KB 至 15KB），但不是很明显。
 压缩时，Guetzli 可以在较小的图像上引入更多液化失真。


您可能还对 Eric Portis 的研究感兴趣，其将 Guetzli 与
Cloudinary 的自动压缩进行[比较](https://cloudinary.com/blog/a_closer_look_at_guetzli)，以获得不同的有效性数据点。


### MozJPEG 相比 Guetzli 如何？ {: #mozjpeg-vs-guetzli }

将不同的 JPEG 编码器进行比较的过程较为复杂，不但要比较压缩图像的质量和保真度，还要比较最终的文件大小。
 正如图像压缩专家 Kornel Lesi&#x144;ski 所指出，若不对所有方面进行基准测试可能会得出[无效的](https://kornel.ski/faircomparison)结论。




MozJPEG 相比 Guetzli 如何？— Kornel 的看法：

* Guetzli 侧重于获得更高质量的图像（Butteraugli 据称最适合
`q=90`+，而 MozJPEG 的最有效点大约为 `q=75`）
* Guetzli 的压缩速度较慢（两者都生成标准 JPEG，所以解码像往常一样快）
* MozJPEG 不会自动选择质量设置，但您可以使用外部工具找到最佳质量，例如
  [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)

您可以使用许多现有方法确定压缩图像在视觉或可感知性方面是否与其源图像相似。
 图像质量研究通常采用 [SSIM](https://en.wikipedia.org/wiki/Structural_similarity)（结构相似性）等方法。
 但是，Guetzli 针对 Butteraugli 进行优化。

### Butteraugli {: #butteraugli }

[Butteraugli](https://github.com/google/butteraugli) 是 Google 的一个项目，用于估计用户注意到两个图像存在视觉图像退化的点（心理视觉相似性）。
 Butteraugli 会在几乎没有明显差异方面，为图像打出可靠的分数。
 Butteraugli 不仅可以给出标量分数，而且还可以计算差异级别的空间图。
 虽然使用 SSIM 可以查看图像的错误汇总，但使用
Butteraugli 可以查看最糟糕的部分。


<img src="images/Modern-Image14.jpg" alt="Butteraugli 验证鹦鹉图像" /> 以上示例使用 Butteraugli 寻找最小的 JPEG 质量阈值，以免图像质量过度降低，以至于用户发现图像不清晰。
 该步骤最终使文件总大小减小 65%。

在实际操作中，您可以定义视觉质量的目标，然后运行一系列不同的图像优化策略，接着查看
Butteraugli 分数，之后再选择在文件大小和级别之间取得最佳平衡的图像。




<img src="images/Modern-Image15.jpg"
        alt="Butteraugli 从命令行运行" /> 总而言之，在安装 Bazel 并获得 C++ 源代码构件以便在 Mac 上正确编译后，我在本地设置 Butteraugli 时大约用了 30 分钟。
 然后再使用 Butteraugli 就变得相对简单：只需要指定要比较的两个图像（源图像和压缩图像），Butteraugli 便会给出相应的分数。





**Butteraugli 与其他视觉相似性比较方法有何不同？**

Guetzli 项目成员提供的[评论](https://github.com/google/guetzli/issues/10#issuecomment-276295265)表明，Guetzli 在 Butteraugli 上分数最高，在 SSIM 上分数最低，而 MozJPEG 在两者中的分数相差不大。
 这与我对自己的图像优化策略所做的研究结果相符。
 我在图像上运行 Butteraugli 和类似 [img-ssim](https://www.npmjs.com/package/img-ssim) 的节点模块，将源图像与使用 Guetzli 和
MozJPEG 之前/之后获得 SSIM 分数的图像进行比较。



**结合使用编码器？**

我发现在优化大型图像时，结合使用 Guetzli 与
MozJPEG（jpegtran，而不是 cjpeg，以避免丢弃 Guetzli 产生的效果）的**无损压缩**，可进一步将文件大小缩小 10% 至 15%（总体为 55%），而 SSIM 只会下降
一点点。
 我认为有必要对此进行实验和分析，不过业界中的
[Ariya Hidayat](https://ariya.io/2017/03/squeezing-jpeg-images-with-guetzli) 等其他人也尝试过此方法，结果都很理想。



MozJPEG 是一款适合初学者的网络资产编码器，速度相对较快，并且可以生成高质量的图像。
 由于 Guetzli 是资源密集型工具，并且在大型高质量图像上运行效果最佳，因此我认为中高级用户适合使用该工具。




## 什么是 WebP？ {: #what-is-webp }

[WebP](/speed/webp/) 是
Google 最新开发的新图像格式，旨在以可接受的视觉质量为无损和有损压缩提供较小的文件大小。
 WebP 支持 Alpha 通道透明度和动画。


在过去的一年，WebP 在一定程度上提高有损和无损模式下的压缩率，将算法速度提高两倍，并且将解压缩率提高 10%。
  WebP 工具虽然不适用于所有目的，但却在图像压缩社区拥有固定的用户群且用户群数量不断增长。
 接下来，我们来了解这背后的原因。



<img src="images/Modern-Image16.jpg" alt="不同质量设置下的 WebP 比较。
 在 q=90 时，为 646KB。 在 q=80 时，为 290KB。 在 q=75 时，为 219KB。 在 q=70 时，为 199KB" />
       WebP：不同质量的文件大小和视觉相似性分数比较。



### WebP 的执行方式为何？ {: #how-does-webp-perform }

**有损压缩**

WebP 团队通常认为使用 VP8 或 VP9 视频关键帧编码变体的 WebP 有损文件比
JPEG 文件小
[25% 至 34%](/speed/webp/docs/webp_study)。


在低质量范围 (0-50) 中，WebP 较 JPEG 有很大的优势，因为 WebP 可以消除模糊难看的块效应伪影。
 中等质量设置 (-m 4 -q 75)
是默认的速度/文件大小平衡设置。 在较高质量范围 (80-99) 中，WebP 的优势降低。
 若速度重于质量，则建议使用 WebP。


**无损压缩**

[WebP 无损文件比 PNG
文件小 26%](/speed/webp/docs/webp_lossless_alpha_study)。
与 PNG 相比，无损加载时间减少 3%。 即便如此，您一般也不希望在网络上为用户提供无损服务。
 无损边缘与锐利边缘（例如，非 JPEG）存在差别。
 无损 WebP 可能更适用于存档内容。


**透明度**

WebP 具有无损 8 位透明度通道，而字节数仅比
PNG 多 22%。 此外，WebP 还支持有损 RGB 透明度，这是只有 WebP 才拥有的特点。

**元数据**

WebP 文件格式支持 EXIF 照片元数据和 XMP 数字文档元数据，
 并且还包含 ICC 颜色配置文件。

WebP 可以提供更好的压缩效果，但会占用更多的 CPU 资源。 在
2013 年时，WebP 的压缩速度比 JPEG 慢大约 10 倍，但现在两者的差距可以忽略不计（某些图像可能会慢 2 倍）。
 对于在构建过程中处理的静态图像而言，这应该不是什么大问题。
 动态生成的图像可能会导致可感知的 CPU 消耗，并且您需要对其进行评估。



注：WebP 有损质量设置无法与 JPEG 直接比较。 “质量为 70%”的 JPEG 与“质量为 70%”的 WebP 图像完全不同，因为
WebP 是通过舍弃更多数据来缩减文件大小。



### 谁在生产环境中使用 WebP？ {: #whos-using-webp-in-production }

许多大公司在生产环境中使用 WebP 来降低成本并缩短网页加载时间。


Google 报告称使用 WebP 代替其他有损压缩方案实现了 30% 至 35% 的节省量，而且每天能够处理 430 亿次图像请求，其中 26% 是无损压缩。
这说明 WebP 有助于处理大量请求，并实现大幅节省。 毫无疑问，如果提供更好、更广泛的[浏览器支持](http://caniuse.com/#search=webp)，节省的量自然也会更大。
 此外，Google 也在 Google Play 和
YouTube 等生产网站上使用 WebP。

Netflix、Amazon、Quora、Yahoo、Walmart、Ebay、The Guardian、Fortune 以及 USA
Today 均使用 WebP 为支持其的浏览器压缩和提供图像。
VoxMedia 通过为 Chrome 用户切换到 WebP，为 The Verge [节省 1 至 3 秒的加载时间](https://product.voxmedia.com/2015/8/13/9143805/performance-update-2-electric-boogaloo)。
[500px](https://iso.500px.com/500px-color-profiles-file-formats-and-you/) 自从为 Chrome 用户切换到 WebP 后，图像文件大小平均缩小 25%，而且图像质量相似或更好。


除以下样本列表中指出的公司外，还有很多公司也采用 WebP。


<img src="images/webp-conversion.jpg" alt="Google 的 WebP 统计数据：每天超过 430 亿次图像请求" /> Google 的 WebP 使用情况：
每天在 YouTube、Google Play、Chrome Data Saver 和 G+ 上处理 430 亿次 WebP 图像请求。


### WebP 编码如何运作？ {: #how-does-webp-encoding-work }

WebP 的有损编码旨在于静止图像方面与 JPEG 一较高下。 WebP 的有损编码包括三个关键阶段：


**宏块** — 将图像分成 16x16 亮度像素（宏）块和两个 8x8 色度像素块。
 这听起来可能与
JPEG 的颜色空间转换、色度通道下采样以及图像细分相似。



<img src="images/Modern-Image18.png" alt="Google
Doodle 的宏块示例，在该示例中我们将一系列像素分解为亮度块和色度块。"/>




**预测** — 宏块的每个 4x4 子块均应用预测模型，以有效地进行过滤。
 这可以定义块周围的两组像素：A（正上方的行）和 L（左边的列）。
编码器使用这两组像素以 4x4 像素填充测试块，并确定哪组像素能创造最接近原始块的值。
 Colt McAnlis 在 [WebP 有损模式的工作原理](https://medium.com/@duhroach/how-webp-works-lossly-mode-33bd2b1d0670)中对此进行更深入的探讨。





<img src="images/Modern-Image19.png" alt="考虑预测模型的 Google Doodle 片段示例，显示行、目标块和 L 列。"/>





应用离散余弦变换 (DCT) 的几个步骤与 JPEG
编码相似， 主要区别在于使用[算述压缩器](https://www.youtube.com/watch?v=FdMoL3PzmSA&index=7&list=PLOU2XLYxmsIJGErt5rrCqaSGTMyyqNt2H)还是 JPEG 的霍夫曼表。



如果您想进一步了解相关信息，可以查看 Google 开发者的文章 [WebP
压缩技术](/speed/webp/docs/compression)，其中对此主题进行了深入探讨。



### WebP 浏览器支持 {: #webp-browser-support }

并非所有浏览器都支持 WebP，但[根据
CanIUse.com](http://caniuse.com/webp) 统计数据表明，WebP 的全球用户支持率大约为 74%。
Chrome 和 Opera 对 WebP 提供原生支持。 Safari、Edge 和 Firefox 已经试用 WebP，但尚未在官方版本中进行使用。
 如此一来，获取 WebP 图像的任务通常就留给了用户，乃至网络开发者。
稍后我们将详细介绍这部分内容。

以下是主要浏览器及各自的支持信息：

* Chrome：Chrome 自 Chrome 23 版开始全面支持。
* Chrome（Android 版）：自 Chrome 50 开始
* Android：自 Android 4.2 开始
* Opera：自 12.1 开始
* Opera Mini：所有版本
* Firefox：部分测试版本支持
* Edge：部分测试版本支持
* Internet Explorer：不支持
* Safari：部分测试版本支持

WebP 也存在缺点， 不但缺乏全分辨率颜色空间选项，而且不支持逐行解码。
 即便如此，WebP 也是一个功能强大的工具且受浏览器支持。虽然在撰写本文时，WebP 仅受 Chrome 和 Opera 的支持，但其可能会涵盖足够多的用户，以至于可以考虑将其作为后备。




### 如何将图像转换为 WebP？ {: #how-do-i-convert-to-webp }

多种商业和开源图像编辑及处理包支持
WebP。 其中一个特别有用的应用是 XnConvert：一款跨平台的免费批量图像处理转换器。


注：切勿将低质量或平均质量的 JPEG 转换为 WebP。
出现的常见错误是生成带 JPEG 压缩伪像的 WebP 图像。
 这可能会导致 WebP 效率降低，因为 WebP 必须保存图像_以及_ JPEG 添加的失真，从而导致质量下降两倍。
 为转换应用馈送最佳质量的源文件，最好是原件。


**[XnConvert](http://www.xnview.com/en/xnconvert/)**

XnConvert 支持批量图像处理，与超过 500 种图像格式兼容。
 您可以组合超过 80 个单独的操作，以多种方式转换或编辑图像。



<img src="images/Modern-Image20.png" alt="Mac 上的 XNConvert 应用，其中许多图像已转换为 WebP"/>
XnConvert 支持批量图像优化，允许从源文件直接转换为 WebP 和其他格式。
 除压缩以外，XnConvert 还有助于去除元数据、裁剪、颜色深度定制和其他转换。




XnView 网站上列出的部分选项包括：

*   元数据：编辑
*   转换：旋转、裁剪、调整大小
*   调整：亮度、对比度、饱和度
*   过滤：模糊、浮雕、锐化
*   效果：遮蔽、水印、渐晕

操作之后，可以将结果导出为大约 70 种不同的文件格式，包括 WebP。
 Linux、Mac 和 Windows 可免费使用 XnConvert。
强烈建议使用 XnConvert，尤其是小型企业。

**节点模块**

[Imagemin](https://github.com/imagemin/imagemin) 是流行的图像缩小模块，还具有用于将图像转换为 WebP
([imagemin-webp](https://github.com/imagemin/imagemin-webp)) 的插件，
 而且支持有损模式和无损模式。


若要安装 imagemin 和 imagemin-webp，请运行：

```
> npm install --save imagemin imagemin-webp
```

然后，可以在两个模块中使用 require()，并针对项目目录中的所有图像（例如，JPEG）运行该命令。
 以下是使用质量为 60 的 WebP 编码器进行有损编码的示例：



```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg}'], 'images', {
    use: [
        imageminWebp({quality: 60})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


与 JPEG 相似，输出结果中可能出现压缩伪像。
评估适用于自己图像的质量设置。 Imagemin-webp
也可用于通过将 `lossless: true` 传递到各选项对无损质量 WebP 图像进行编码（支持 24 位颜色和完全透明度）：



```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    use: [
        imageminWebp({lossless: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


此外，也提供 Sindre
Sorhus 基于 imagemin-webp 构建的[适用于 Gulp 的 WebP 插件](https://github.com/sindresorhus/gulp-webp)，以及[适用于 WebPack 的 WebP 加载器](https://www.npmjs.com/package/webp-loader)。
 Gulp
插件接受 imagemin 插件执行的所有选项：

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        quality: 80,
        preset: 'photo',
        method: 6
    }))
    .pipe(gulp.dest('dist'))
);
```

或者，执行无损压缩：

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp-lossless', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        lossless: true
    }))
    .pipe(gulp.dest('dist'))
);
```

**使用 Bash 批量优化图像**

XNConvert 支持批量压缩图像，但如果您不想使用应用或构建系统，可以使用 Bash 和图像优化二进制文件确保简单操作。



您可以使用
[cwebp](/speed/webp/docs/cwebp) 将图像批量转换为 WebP：

```
find ./ -type f -name '*.jpg' -exec cwebp -q 70 {} -o {}.webp \;
```

或者，使用
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive) 通过 MozJPEG 批量优化图像源：

```
find ./ -type f -name '*.jpg' -exec jpeg-recompress {} {} \;
```

然后，使用 [svgo](https://github.com/svg/svgo)（我们将稍后介绍）裁减这些 SVG：


```
find ./ -type f -name '*.svg' -exec svgo {} \;
```

Jeremy Wagner 发表了关于[使用
Bash 优化图像](https://jeremywagner.me/blog/bulk-image-optimization-in-bash)的更全面的博文，以及
[并行](https://jeremywagner.me/blog/faster-bulk-image-optimization-in-bash)执行此操作的另一篇文章，值得您阅读一番。



**其他 WebP 图像处理和编辑应用包括：**

   * Leptonica — 整个网站提供开源图像处理和分析应用。


    * Sketch 支持直接输出到 WebP
    * GIMP — 用于替代 Photoshop 的免费开源软件， 也是图像编辑器。
    * ImageMagick — 用于创建、创作、转换或编辑位图图像， 也是免费的
      命令行应用。
    * Pixelmator — 适用于 Mac 的商用图像编辑器。
    * Photoshop WebP Plugin — Google 开发的免费插件， 用于导入和导出图像 。

**Android：**您可以使用 Android Studio 将现有 BMP、JPG、PNG 或静态 GIF 图像转换为 WebP 格式。
 有关更多信息，请参阅[使用
Android Studio 创建 WebP 图像](https://developer.android.com/studio/write/convert-webp.html)。

### <a id="how-do-i-view-webp-on-my-os" href="#how-do-i-view-webp-on-my-os">如何在操作系统中查看 WebP 图像？</a>

虽然您可以将 WebP 图像拖放到基于 Blink 的浏览器（Chrome、Opera、Brave）进行预览，但也可以使用适用于 Mac 或 Windows 的插件直接在操作系统中预览图像。



几年前，[Facebook 尝试使用
WebP](https://www.cnet.com/news/facebook-tries-googles-webp-image-format-users-squawk/)，并发现用户在右键点击图片并将其保存到磁盘时，由于图片为 WebP 格式，因此无法在所用浏览器以外的地方显示。
 其中存在三个主要问题：

<ul> 
	<li>选择“Save as”，但无法在本地查看 WebP 文件。 Chrome
已通过将自己注册为“.webp”处理程序，解决该问题。</li> <li>选择“Save as”，然后将图像附加到电子邮件并与不使用 Chrome 的某人分享。
Facebook 已通过在用户界面中推出醒目的“download”按钮并在用户请求下载时返回 JPEG，解决该问题。</li> 
	<li> Right click >
复制网址 -> 在网络上共享网址。 已通过[内容类型协商](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)解决该问题。
	</li>
</ul>

这些问题对用户来说可能不是很重要，但对于传递的社交可分享性来说却很有趣。
 幸运的是，我们现在拥有用于在不同操作系统中查看和处理 WebP 图像的实用程序。


您可以尝试在 Mac 上使用[适用于
WebP 的 Quick Look 插件](https://github.com/Nyx0uf/qlImageSize) (qlImageSize)， 效果非常好：



<img src="images/Modern-Image22.jpg" alt="Mac 上的桌面，显示使用适用于 WebP 文件的 Quick Look 插件预览的 WebP 文件"/>



如果使用 Windows，您也可以下载 [WebP
编解码器软件包](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/WebpCodecSetup.exe)，以便在 File Explorer 和 Windows Photo
Viewer 中预览 WebP 图像。


### 如何提供 WebP 图像？ {: #how-do-i-serve-webp }

不支持 WebP 的浏览器最终可能根本无法显示图像，这并不是理想的情况。
 若要避免此问题，我们可以使用几个策略，在浏览器支持的情况下，有条件地提供 WebP 图像。



<img src="images/play-format-webp.jpg" alt="Chrome DevTools 的 Network 面板，显示 Chrome 中 Play Store 的瀑布图，其中提供了 WebP 图像。"/>
Chrome DevTools 的 Network 面板，在 "Type" 列下突出显示有条件地为基于 Blink 的浏览器提供的 WebP 文件。





<img src="images/play-format-type.jpg" alt="虽然 Play Store 可以向基于 Blink 的浏览器提供 WebP
图像，但对于 Firefox 等浏览器，其会回退为 JPEG。"/>
虽然 Play Store 可以向基于 Blink 的浏览器提供 WebP 图像，但对于 Firefox 等浏览器，其会回退为 JPEG。




以下是从服务器向用户提供 WebP 图像的一些选项：


**使用 .htaccess 提供 WebP 副本**

下文介绍当服务器上存在与 JPEG/PNG 文件匹配的 .webp 版本时，如何使用 .htaccess 文件向支持的服务器提供 WebP 文件。


Vincent Orback 建议使用以下方法：

浏览器可以通过 [Accept
标头](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)[显式发出 WebP 支持信号](http://vincentorback.se/blog/using-webp-images-with-htaccess/)。
 如果控制后端，您可以返回 WebP 版图像（若磁盘上有图像）而不是 JPEG 或 PNG 等格式。
 但是，这种方法不一定可行（例如，对于 GitHub 页面或 S3 等静态主机），因此在考虑使用此选项之前，请务必仔细检查。



以下是 Apache 网络服务器的 .htaccess 文件示例：

```
<IfModule mod_rewrite.c>

  RewriteEngine On

  # Check if browser support WebP images
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Check if WebP replacement image exists
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

  # Serve WebP image instead
  RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1]

</IfModule>

<IfModule mod_headers.c>

    Header append Vary Accept env=REDIRECT_accept

</IfModule>

AddType  image/webp .webp
```

如果页面上出现的 .webp 图像存在问题，请确保在服务器上启用 image/webp MIME 类型。


Apache：将以下代码添加到 .htaccess 文件：

```
AddType image/webp .webp
```

Nginx：将以下代码添加到 mime.types 文件：

```
image/webp webp;
```

注：Vincent Orback 提供用于提供
WebP 的 [htaccess
配置](https://github.com/vincentorback/WebP-images-with-htaccess)示例可供参考，而 Ilya Grigorik 维护一系列有用的[用于提供 WebP 的配置脚本](https://github.com/igrigorik/webp-detect)。




**使用 `<picture>` 标记**

浏览器本身能够通过使用 `<picture>` 标记选择要显示的图像格式。
 `<picture>` 标记使用多个 `<source>`
元素，并且包括一个 `<img>` 标记，而该标记是真正的 DOM 元素，包含图像。
 浏览器循环切换源代码并检索第一个匹配项。
如果用户的浏览器不支持 `<picture>` 标记，则会呈现 `<div>` 并使用 `<img>` 标记。


注：请注意 `<source>` 的位置，务必确保顺序正确。 不要将
image/webp 源放置在旧格式后面，而是放在前面。 理解 image/webp 源的浏览器会对其加以使用，而不理解的浏览器会移动到支持更为广泛的框架。
 如果图像的实际大小完全相同（不使用 `media` 属性时），您也可以按文件大小顺序放置图像。

一般来说，这与将旧图像放置在最后的顺序相同。

以下是一些 HTML 示例：

```html
<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="">
</picture>

<picture>
    <source srcset='paul_irish.jxr' type='image/vnd.ms-photo'>
    <source srcset='paul_irish.jp2' type='image/jp2'>
    <source srcset='paul_irish.webp' type='image/webp'>
    <img src='paul_irish.jpg' alt='paul'>
</picture>

<picture>
   <source srcset="photo.jxr" type="image/vnd.ms-photo">
   <source srcset="photo.jp2" type="image/jp2">
   <source srcset="photo.webp" type="image/webp">
   <img src="photo.jpg" alt="My beautiful face">
</picture>
```

**CDN 自动转换为 WebP**

部分 CDN 支持自动转换为 WebP，并且可以根据客户端提示[尽可能地](http://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_client_hints)提供 WebP 图像。
查询 CDN，了解其服务是否提供 WebP 支持。 若提供支持，您便可使用此简单的解决方案。


**WordPress WebP 支持**

Jetpack — Jetpack 是一个流行的 WordPress 插件，包含名为 [Photon](https://jetpack.com/support/photon/) 的 CDN 图像服务。
 使用 Photon，可获得无缝的 WebP 图像支持。
 Photon CDN 包含在 Jetpack 的免费服务中，因此这是一个经济实惠的自动实现功能。
 其缺点是
Photon 会调整图像大小，在网址中放置查询字符串以及每个图像都需要额外的
DNS 查找。

**Cache Enabler 和 Optimizer** — 如果使用 WordPress，至少需要一个中途开源选项。
 开源插件 [Cache Enabler](https://wordpress.org/plugins/cache-enabler/) 提供菜单复选框选项，用于缓存要提供的 WebP 图像（若有且受用户当前的浏览器支持）。
 这使得提供 WebP 图像变得更容易。 缺点是：
Cache Enabler 需要使用名为 Optimizer 的同类型程序，而该程序要收取年费。
 对于真正的开源解决方案而言，这似乎不适合。


**ShortPixel** — ShortPixel 可以单独使用，也可与 Cache
Enabler 结合使用，不过同样也需要支付年费。 单独使用 [ShortPixel](https://shortpixel.com)
时，可以添加 `<picture>` 标记，这通常能够根据浏览器提供正确的图像类型。
 您每月最多可以免费优化 100 张图像。

**压缩动画 GIF 以及 `<video>` 更好的原因**

尽管动画 GIF 格式非常有限，但仍然被广泛使用。
 虽然从社交网络到流行媒体网站的所有内容都已大量嵌入动画 GIF，但设计此格式*从来不是*用于视频存储和动画。
 事实上，[GIF89a
规范](https://www.w3.org/Graphics/GIF/spec-gif89a.txt)指出“GIF 的目的不是用作动画平台”。
 [颜色数量、帧数和维度](http://gifbrewery.tumblr.com/post/39564982268/can-you-recommend-a-good-length-of-clip-to-keep-gifs)都会影响动画 GIF 的大小。
 切换到视频可以最大程度地节省文件大小。



<img src="images/animated-gif.jpg" alt="动画 GIF 与 视频：不同格式约等质量下的文件大小比较。"/>
动画 GIF 与 视频：不同格式约等质量下的文件大小比较。



**以 MP4 视频形式提供相同的文件通常可以将文件大小减小 80% 或更多。**GIF 不仅经常浪费大量带宽，而且加载时间更长、包括的颜色更少、提供的用户体验也欠佳。
 您可能已经注意到上传到 Twitter 平台的动画 GIF 在 Twitter 上比在其他网站上的效果更好。
 [Twitter 上的动画 GIF 实际上不是
GIF](http://mashable.com/2014/06/20/twitter-gifs-mp4/#fiiFE85eQZqW)。
为了改善用户体验并减少带宽消耗量，上传到 Twitter 的动画 GIF 实际上已转换为视频。
 同样地，在上传时，[Imgur 会将
GIF
转换为视频](https://thenextweb.com/insider/2014/10/09/imgur-begins-converting-gif-uploads-mp4-videos-new-gifv-format/)，默默地为您将其转换为 MP4 视频。


为什么 GIF 要大许多倍？动画 GIF 将每帧存储为无损 GIF
图像。 质量下降通常是由于将 GIF
限于 256 色调色板所导致。 这种格式大小通常很大，因为与 H.264 等视频编解码器不同，它不考虑用于压缩的相邻帧。
MP4
视频将每个关键帧存储为有损 JPEG，以丢弃一些原始数据，从而更好地进行压缩。


**如果可以切换到视频**

*   使用 [ffmpeg](https://www.ffmpeg.org/) 将动画 GIF（或源）转换为 H.264 MP4。
 我使用的是[
Rigor](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video) 的以下单行代码编程：
    `ffmpeg -i animated.gif -movflags faststart -pix_fmt yuv420p -vf
    "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.mp4`
*   ImageOptim API 也支持[将动画 GIF 转换为 WebM/H.264
视频](https://imageoptim.com/api/ungif)、[从
GIF 中删除抖动](https://github.com/pornel/undither#examples)，以帮助视频编解码器进一步压缩。


**如果必须使用动画 GIF**

*   Gifsicle 等工具可以去除元数据和未使用的调色板条目，并最大限度减少帧之间的变化
*   考虑使用有损 GIF 编码器。
 Gifsicle 的
[Giflossy](https://github.com/pornel/giflossy) 分支使用 `—lossy` 标记支持此编码器，可以将文件大小缩小约 60% 至 65%。
 您也可以使用基于其构建的另一个名为 [Gifify](https://github.com/vvo/gifify) 的工具。
 对于非动画 GIF，将其转换为 PNG 或 WebP。


有关更多信息，请参阅 Rigor 的[
GIF 手册](https://rigor.com/wp-content/uploads/2017/03/TheBookofGIFPDF.pdf)。

## SVG 优化 {: #svg-optimization }

保持 SVG 精简意味着去除所有不必要的内容。 使用编辑器创建的 SVG 文件通常包含大量冗余信息（元数据、注释和隐藏图层等）。
 通常可以安全删除此类内容或将其转换为极小形式，而不会影响最终呈现的
SVG。



<img src="images/Modern-Image26.jpg" alt="SVGO"/>
[SVGOMG](https://jakearchibald.github.io/svgomg/) 是 Jake Archibald 开发的 GUI
界面，允许通过选择优化及根据自己的喜好来优化 SVG，而且可以实时预览输出标记。



**SVG 优化 (SVGO) 的一些通用规则：**

*   缩小并压缩 SVG 文件。 SVG 实际上只是以 XML 表示的文本资产（如 CSS、HTML 和 JavaScript），应该通过缩小和压缩来提高性能。
* 使用预定义的 SVG 形状（如 `<rect>`、`<circle>`、`<ellipse>`、`<line>` 和 `<polygon>`）来代替路径。
 首选预定义形状会减少生成最终图像所需的标记数量，这意味着浏览器解析和光栅化的代码更少。
 降低 SVG 复杂性意味着浏览器可以更快地进行显示。
*   如果必须使用路径，请尝试减少曲线和路径。 尽可能地简化并组合曲线和路径。
 Illustrator 的[简化工具](http://jlwagner.net/talks/these-images/#/2/10)擅长删除复杂图像中的多余点，同时消除不规则性。
*   避免使用组。 如果无法避免使用组，请尝试尽量简化组。
*   删除看不见的图层。
*   避免使用任何 Photoshop 或 Illustrator 效果， 其可以转换为大型光栅图像。
*   仔细检查不支持 SVG 的任何嵌入式光栅图像
* 使用工具优化 SVG。
  [SVGOMG](https://jakearchibald.github.io/svgomg/) 是 Jake Archibald 为 [SVGO](https://github.com/svg/svgo) 开发的超级方便的基于网络的 GUI，非常实用。如果使用 Sketch，可以在导出时使用 SVGO Compressor 插件（[运行 SVGO 的 Sketch 插件](https://www.sketchapp.com/extensions/plugins/svgo-compressor/)），以缩小文件大小。




<img src="images/svgo-precision.jpg" alt="SVGO 精度降低有时会对文件大小产生正面影响"/>
通过 SVGO 以高精度模式（将文件大小缩小 29%）和
 低精度模式运行 SVG 源（将文件大小缩小 38%）的示例。



[SVGO](https://github.com/svg/svgo) 是一个基于节点、用于优化 SVG 的工具。
SVGO 可以通过降低您 <path> 定义中的数字*精度*
来缩小文件大小。 点后面的每个数字都会增加一个字节，这就是为什么更改精度（位数）会严重影响文件大小的原因。
 但是，更改精度要慎重，因为这可能会给形状外观带来直观的影响。




<img src="images/Modern-Image28.jpg" alt="SVGO 可能出错的地方，过度简化路径和图像"/>
请务必注意，尽管在之前没有过度简化路径和形状的情况下，SVGO 表现出色，但在很多情况下可能并非如此。
 观察上图火箭的光带如何在低精度的状态下失真。



**在命令行中使用 SVGO：**

如果相比 GUI，您更喜欢 SVGO，则可安装其作为 [global npm CLI](https://www.npmjs.com/package/svgo)：


```
npm i -g svgo
```

然后，可以针对本地 SVG 文件运行此工具，如下所示：

```
svgo input.svg -o output.svg
```

该工具支持您期望的所有选项，包括调整浮点精度：


```
svgo input.svg --precision=1 -o output.svg
```

有关支持选项的完整列表，请参阅 SVGO [README 文件](https://github.com/svg/svgo)。


**请不要忘记压缩 SVG！**


<img src="images/before-after-svgo.jpg" alt="通过 SVGO 运行图像之前和之后"/>
请务必注意，尽管在之前没有过度简化路径和形状的情况下，SVGO 表现出色，但在很多情况下可能并非如此。
 观察上图火箭的光带如何在低精度的状态下失真。



此外，请不要忘记 [Gzip 压缩 SVG
资产](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)或使用 Brotli 提供这些资产。
 由于这些资产是以文本为基础，因此压缩效果非常好（大约为原始源文件的 50%）。


当 Google 发布新徽标时，我们揭晓其[最小](https://twitter.com/addyosmani/status/638753485555671040)版本只有 305 字节。




<img src="images/Modern-Image30.jpg" alt="Google
新徽标的最小版本只有 305 字节"/>


您可以使用[许多高级的 SVG
技巧](https://www.clicktorelease.com/blog/svg-google-logo-in-305-bytes/)进一步缩小文件大小（直至 146 字节）！
可以说，无论是通过工具还是手动清理，SVG 都存在缩小的*空间*。



**SVG Sprite**

SVG 对于图标功能[非常强大](https://css-tricks.com/icon-fonts-vs-svg/)，可提供一种将可视化表示为精灵的方法，而无需图标字体所需的[奇怪的](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html)解决方法。
 SVG 具有比图标字体（SVG 笔画属性）更精细的 CSS 样式控制、更好的定位控制（无需破解伪元素和 CSS `display`），并且 SVG 更容易[访问](http://www.sitepoint.com/tips-accessible-svg/)。



[svg-sprite](https://github.com/jkphl/svg-sprite) 和
[IcoMoon](https://icomoon.io/) 等工具可以自动将 SVG 组合成精灵，而该精灵可以通过 [CSS Sprite](https://css-tricks.com/css-sprites/)、[Symbol
Sprite](https://css-tricks.com/svg-use-with-external-reference-take-2) 或
[Stacked Sprite](http://simurai.com/blog/2012/04/02/svg-stacks) 进行使用。
 Una Kravetz 就如何将
gulp-svg-sprite 用于 SVG Sprite 工作流撰写了一篇实用的[文章](https://una.im/svg-icons/#💁)，值得您请仔细阅读。
 此外，Sara Soudein 还在博客中介绍了[从图标字体过渡到
SVG](https://www.sarasoueidan.com/blog/icon-fonts-to-svg/)。


**深入阅读**

Sara Soueidan 的[优化用于网络的 SVG
文件的提示](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)和 Chris Coyier 的[实用 SVG
手册](https://abookapart.com/products/practical-svg)皆值得一读。
 此外，Andreas Larsen 的优化 SVG 博文也发人深省（[第
1 部分](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-1-67e8f2d4035)、[第
2 部分](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-2-6711cc15df46)）。[在
Sketch 中准备和导出 SVG 图标](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb)也值得详细阅读。




## 避免使用有损编解码器重新压缩图像 {: #avoid-recompressing-images-lossy-codecs }

建议始终从原始图像开始进行压缩。 重新压缩图像会产生相应的后果。
 假设您拍摄一张 JPEG 图像，该图像已经以质量 60 进行压缩。
如果使用有损编码重新压缩此图像，图像看起来会更糟糕。
 每一轮额外的压缩都将产生生成损失，如此一来，信息将丢失，而且压缩伪影将开始累积。
 即使在高质量设置下进行重新压缩也是如此。

若要避免陷入这种困境，**首先就要设置您愿意接受的最低高质量**，如此从一开始，您便可以最大程度地缩小文件大小。
 然后，您就可以避免陷入这种困境，因为只通过降低质量来缩小文件大小的效果并不理想。



对有损文件进行重新编码几乎总会生成更小的文件，但这并不意味着您可以获得所需的质量。



<img src="images/generational-loss.jpg" alt="多次对图像进行重新编码造成的生成损失"/>
根据 Jon
Sneyers 的[精彩视频](https://www.youtube.com/watch?v=w7vXJbLhTyI)和[随附文章](http://cloudinary.com/blog/why_jpeg_is_like_a_photocopier)，我们可以从上图中看到使用多种格式进行重新压缩造成的生成损失影响。
 如果保存社交网络上的（已压缩）图像并重新上传（导致重新压缩），则可能会遇到此问题。
同时，质量损失将会累积。



由于栅格量化，MozJPEG（可能偶然）能够很好地防止重新压缩质量下级。
 MozJPEG 并不是精确地压缩所有 DCT
值，而是检查 +1/-1 范围内的接近值，以了解类似的值是否压缩为更少位数的值。
 有损 FLIF 在进行（重新）压缩之前会进行与有损 PNG 相似的修改，如此即可查看数据并决定要舍弃的内容。
 重新压缩的 PNG 具有可以检测到的“洞”，以避免进一步更改数据。


**在编辑源文件时，请以 PNG 或
TIFF 等无损格式存储文件，从而尽可能地保持质量。**然后，您的构建工具或图像压缩服务将输出您为用户提供的压缩版本，同时最大限度减少质量损失。



## 减少不必要的图像解码及调整大小的成本 {: #reduce-unnecessary-image-decode-costs }

我们都曾发送过超出用户需求的大型高分辨率图像，
 而这需要付出代价。 对于普通移动硬件上的浏览器，解码和调整图像大小的操作都需要支付昂贵的成本。
 如果使用 CSS 或宽度/高度属性发送大型图像并调整大小，便可能会发生这种情况并且影响性能。




<img src="images/image-pipeline.jpg" alt="浏览器抓取标记中指定的图像并将其显示在屏幕上需要执行多个步骤。这些步骤包括请求、解码、调整大小、复制到 GPU 以及显示。"/>

浏览器在提取图像时，必须将原始源格式的图像（例如，JPEG）解码为内存中的位图。
 这通常需要对图像大小进行调整（例如，已将宽度设置为容器的百分比）。
 解码和调整图像大小都需要支付昂贵的成本，而且可能会延迟显示图像所需的时间。




而理想情况是发送浏览器可以呈现的图像，而无需调整图像大小。
 因此，可以利用 [`srcset` 和 `sizes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)，提供符合目标屏幕尺寸和分辨率的最小图像。我们稍后将介绍 `srcset`。


省略图像的 `width` 或 `height` 属性也会对性能产生负面影响。
 如果没有这些属性，浏览器会为图像分配一个较小的占位符区域，直至达到足够的字节才能知道正确的尺寸。
 此时，必须在称为自动重排的步骤（成本非常高）中更新文档布局。



<img src="images/devtools-decode.jpg" alt="Chrome DevTools 中显示的图像解码成本"/>
浏览器必须执行一系列步骤才能在屏幕上绘制图像。 除提取图像以外，还需要解码并经常调整图像大小。
 可以通过 Chrome DevTools
[时间线](/web/tools/chrome-devtools/evaluate-performance/performance-reference)审核这些事件。




较大的图像也会增加内存大小的成本。 解码的图像大约为每像素 4 字节。
 如果不小心，您真的可能会使浏览器崩溃；在低端设备上，启动内存交换并不需要很多字节。
因此，请密切注意图像解码、调整大小和内存成本。


<img src="images/image-decoding-mobile.jpg" alt="在普通及低端移动硬件上解码图像的成本非常高"/>
在普通及低端手机上解码图像的成本非常高。
在某些情况下，解码速度可能会慢 5 倍（甚至更长）。


在构建新的[移动网络体验](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)时，Twitter 通过确保为用户提供适当大小的图像来提高图像解码性能。
 这使得
Twitter Timeline 上的许多图像的解码时间从大约 400 毫秒一直减少到大约 19 毫秒！


<img src="images/image-decoding.jpg" alt="Chrome DevTools Timeline/Performance
面板突出显示 Twitter Lite
优化图像管道之前和之后的图像解码时间。 之前更高。"/>
Chrome DevTools Timeline/Performance 面板突出显示 Twitter Lite 优化图像管道之前和之后的图像解码时间（绿色）。


### 使用 `srcset` 提供 HiDPI 图像 {: #delivering-hidpi-with-srcset }

用户可以通过一系列具有高分辨率屏幕的移动和桌面设备访问您的网站。
 [设备像素率](https://stackoverflow.com/a/21413366) (DPR)（也称为“CSS 像素率”）确定 CSS 如何解读设备屏幕的分辨率。
 DPR
由手机制造商所创造，用于提高移动设备屏幕的分辨率和清晰度，而不会使元素显得太小。


若要符合用户期望的图像质量，请为用户设备提供最合适的分辨率图像。
 可以向支持的设备提供清晰的高 DPR 图像（例如，2x、3x）。
 如果用户没有高分辨率屏幕，则应向其提供低 DPR 和标准 DPR 图像，因为 2x 以上的图像通常会大幅增加字节数。




<img src="images/device-pixel-ratio.jpg" alt="设备像素率为 1x、2x 和 3x 的图。
 图像随着 DPR
增加而变得更加清晰，并且显示设备像素与 CSS 像素比较的视觉效果。"/>
设备像素率：许多网站会跟踪热门设备的 DPR，包括
[material.io](https://material.io/devices/) 和
[mydevice.io](https://mydevice.io/devices/)。

[srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
允许浏览器为每个设备选择最佳图像，例如为 2x 移动显示器选择
2x 图像。 不支持 `srcset` 的浏览器会回退到 `<img>` 标记中指定的默认 `src`。


```
<img srcset="paul-irish-320w.jpg,
             paul-irish-640w.jpg 2x,
             paul-irish-960w.jpg 3x"
     src="paul-irish-960w.jpg" alt="Paul Irish cameo">
```

[Cloudinary](http://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices)
和 [Imgix](https://docs.imgix.com/apis/url/dpr) 等图像 CDN 都支持控制图像密度，以便从单一权威源为用户提供最佳密度。



注：您可以在此免费 [Udacity](https://www.udacity.com/course/responsive-images--ud882) 课程和 Web
Fundamentals 上的[图像](/web/fundamentals/design-and-ui/responsive/images)指南中了解有关设备像素率和响应式图像的更多信息。



友情提示：[Client
Hints](https://www.smashingmagazine.com/2016/01/leaner-responsive-images-client-hints/) 也可提供一种替代方法，以指定响应式图像标记中每个可能的像素密度和格式。
 不过，Client Hints 将此信息附加到 HTTP 请求，以便网络服务器选择最适合当前设备屏幕密度的选项。



### 艺术指导 {: #art-direction }

尽管为用户提供适合的分辨率非常重要，但部分网站还需要从**[艺术指导](http://usecases.responsiveimages.org/#art-direction)**方面考虑这一点。
 如果用户使用较小的屏幕，您可能需要裁剪或放大并显示图像，以充分利用可用的空间。
 虽然艺术指导并不在本文所讨论的范围内，但[
Cloudinary](http://cloudinary.com/blog/automatically_art_directed_responsive_images%20)
等服务提供 API 以尽可能地尝试自动实现此目的。



<img src="images/responsive-art-direction.jpg" alt="响应式艺术指导的实际应用，根据设备调整，以裁剪方式显示或多或少的图像"/>
艺术指导：Eric Portis 汇集了如何将响应式图像用于艺术指导的出色[示例](https://ericportis.com/etc/cloudinary/)。
 此示例在不同的断点调整主角图像的视觉特征，以充分利用可用的空间。



## 颜色管理 {: #color-management }

至少有三种不同的颜色视角：生物学、物理学和印刷学。
 在生物学中，颜色是一种[感性现象](http://hubel.med.harvard.edu/book/ch8.pdf)。
 物体以不同的波长组合反射光。
 我们眼中的光受体将这些波长转化为我们称之为颜色的感觉。
 在物理学中，关键在于光 — 光频率和亮度。
 印刷学则更侧重于色轮、墨水和艺术模型。


在理想情况下，世界上的每个屏幕和网络浏览器都会显示完全相同的颜色。
 不幸的是，由于一些固有的不一致性，它们无法显示完全相同的颜色。
 颜色管理使我们能够通过颜色模型、空间和配置文件在显示颜色方面取得妥协。


#### 颜色模型 {: #color-models }

[颜色模型](https://en.wikipedia.org/wiki/Gamma_correction)是用于从较小的一组三原色生成完整颜色范围的系统。
不同类型的颜色空间使用不同的参数来控制颜色。
 某些颜色空间的控制参数比其他颜色空间少，例如灰度只有一个用于控制黑白色之间亮度的参数。



两种常见的颜色模型是加色和减色。 加色模型（如 RGB，用于数字显示）使用光来显示颜色，而减色模型（如 CMYK，用于打印）通过消光来发挥作用。





<img src="images/colors_ept6f2.jpg" alt="sRGB、Adobe RGB 和 ProPhoto RGB" /> 在
RGB 中，以不同的组合加入红色光、绿色光和蓝色光，从而生成广泛的色谱。
 CYMK（青色、品红色、黄色和黑色）通过使用不同颜色的墨水从白纸中减去亮度来发挥作用。


[了解颜色模型和专色系统](https://www.designersinsights.com/designer-resources/understanding-color-models/)详细介绍了其他颜色模型和模式，例如 HSL、HSV 和
LAB。



#### 颜色空间 {: #color-spaces }

[颜色空间](http://www.dpbestflow.org/color/color-space-and-color-profiles#space)是可以为给定图像表示的特定颜色范围。
 例如，如果图像包含多达 1,670 万种颜色，则不同的颜色空间允许在更窄或更宽范围内使用这些颜色。
 一些开发者认为颜色模型与颜色空间相同。


[sRGB](https://en.wikipedia.org/wiki/SRGB) 基于 RGB，旨在成为网络[标准](https://www.w3.org/Graphics/Color/sRGB.html)颜色空间。
 sRGB 是小型颜色空间，通常被视为最低标准，同时也是跨浏览器管理颜色最安全的方法。
 其他颜色空间（例如，[Adobe
RGB](https://en.wikipedia.org/wiki/Adobe_RGB_color_space) 或 [ProPhoto
RGB](https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space) — 用于 Photoshop
和 Lightroom）可以表示比 sRGB 更鲜艳的颜色，但由于后者普遍应用于大多数网络浏览器、游戏和显示器，因此通常成为关注的对象。





<img src="images/color-wheel_hazsbk.jpg" alt="sRGB、Adobe RGB 和 ProPhoto RGB"/> 上图直观地显示出色域 — 颜色空间可以定义的颜色范围。



颜色空间包含三个通道（红色、绿色和蓝色）。 在 8 位模式下，每个通道有 255 种颜色，能够提供总计 1,670 万种颜色。
 16 位图像可以显示数万亿种颜色。


<img src="images/srgb-rgb_ntuhi4.jpg" alt="sRGB、Adobe RGB 和 ProPhoto RGB" />
        使用
[Yardstick](https://yardstick.pictures/tags/img%3Adci-p3) 图像比较 sRGB、Adobe RGB 和 ProPhoto RGB。 如果无法显示看不到的颜色，则要在 sRGB 中展示此概念非常困难。
 除大多数饱和的丰富颜色以外，sRGB 与宽色域中的普通照片应该具有相同的颜色。



颜色空间（如 sRGB、Adobe RGB 和 ProPhoto RGB）的区别在于色域（可使用阴影再显的颜色范围）、光源和[伽玛](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)曲线
 sRGB 比 Adobe RGB 约小 20%，ProPhoto RGB 比 Adobe
RGB [约大 50%](http://www.petrvodnakphotography.com/Articles/ColorSpace.htm)。
 上述图像资源来自 [Clipping
Path](http://clippingpathzone.com/blog/essential-photoshop-color-settings-for-photographers)。

[宽色域](http://www.astramael.com/)是用于描述色域大于 sRGB 的颜色空间的术语。
 这类显示器越来越普遍。 即便如此，许多数字显示器仍然无法显示明显优于 sRGB 的颜色配置文件。
 在 Photoshop 中保存用于网页的图像时，请考虑使用 "Convert to sRGB" 选项，除非目标用户拥有高端宽色域屏幕。



<aside class="key-point"><b>注：</b>处理原始照片时，避免将 sRGB 用作原色空间。
 sRGB 比大多数相机支持的颜色空间小，并且可能导致需要裁剪。
 相反，在导出用于网页的图像时，请使用更大的颜色空间（如 ProPhoto RGB）并输出到 sRGB。</aside>


**宽色域是否可能适用于网页内容？**

是。 如果图像包含非常饱和/丰富/鲜艳的颜色，而且您希望能够在支持的屏幕上完全呈现图像的丰富颜色，即可使用宽色域。
 但是，在真实的照片中很少会这样。
 通常通过调整来呈现鲜艳的颜色很容易，但实际上不会超过 sRGB 色域。


这是因为人类的色觉不是绝对的，而是相对于我们周围的环境，而且也很容易被欺骗。
 如果图像包含荧光笔颜色，您便可轻松使用宽色域。


#### 伽玛校正和压缩 {: #gamma-correction }

[伽玛校正](https://en.wikipedia.org/wiki/Gamma_correction)（或伽玛）用于控制图像的整体亮度。
 更改伽玛还可以改变红色与绿色和蓝色的比率。
 未经过伽玛校正的图像颜色看起来像经过漂白或太暗。


伽玛在视频或计算机图形中用于压缩，与数据压缩类似，
 让您可以较少的位（8 位，而不是 12 位或 16 位）压缩有用的亮度级别。
 人类对亮度的感知与物理光量不成线性比例。
 在针对人眼编码图像时，以真实的物理形态表示颜色有点浪费。
 伽玛压缩用于在更接近人类感知的等级上对亮度进行编码。



使用伽玛压缩时，采用 8 位精度（大多数 RGB 颜色使用 0 至 255 位）可产生有用的亮度等级。
 这是因为如果颜色使用与实物呈 1:1 关系的单位，则 RGB 值介于 1 至 1000000 万之间，其中 0 至 1000 的值看起来不同，但介于
999000 至 1000000 之间的值看起来却相同。
 想像一下，在一间黑暗的房间中只有一支蜡烛。
 点亮第二支蜡烛后，您会注意到房间灯光的亮度明显增加。
 点亮第三支蜡烛后，房间灯光看起来更加明亮。
现在想像一下，如果房间中有 100 支蜡烛。 点亮第 101 支蜡烛，然后点亮第 102 支蜡烛。
您不会注意到房间灯光亮度的变化。

不过在这两种情况下，实际增加的光量完全相同。
 由于在明亮的光线下人眼不太敏感，而伽玛压缩“压缩”的是亮度值，因此在物理层面上，虽然亮度级别不太精确，但是却针对人眼调整等级，因而从人类角度来看所有值都同样精确。




<aside class="key-point"><b>注：</b>此处的伽玛压缩/校正与您在 Photoshop 中配置的图像伽玛曲线不同。
 如果玛伽压缩按预期运作，则看起来什么都不像。</aside>


#### 颜色配置文件 {: #color-profiles }

颜色配置文件是描述设备颜色空间的信息，
 用于在不同的颜色空间之间实现转换。 配置文件试着确保图像在不同类型的屏幕和媒介上看起来尽可能相似。



图像可能具有如[国际色彩联盟](http://www.color.org/icc_specs2.xalter) (ICC) 所述的嵌入式颜色配置文件，以精确地表示颜色的显示方式。
 不同的格式（包括 JPEG、PNG、SVG 和
[WebP](/speed/webp/docs/riff_container)）都支持这一点，并且大多数主要浏览器都支持嵌入式 ICC 配置文件。
 如果图像显示在应用中且了解显示器的功能，则可根据颜色配置文件调整这些颜色。



<aside class="key-point"><b>注：</b>某些显示器具有与 sRGB 类似的颜色配置文件，并且无法显示更好的配置文件，因此根据目标用户的显示器，嵌入配置文件的作用可能有限。
 了解目标用户。</aside>


嵌入式颜色配置文件也会大大增加图像的大小（有时超过 100KB），因此嵌入时要小心。
 ImageOptim 等工具实际上会在找到颜色配置文件后，[自动](https://imageoptim.com/color-profiles.html)将其移除。
 相比之下，若因缩小图像大小而移除 ICC 配置文件，浏览器则会强制以您显示器的颜色空间显示图像，进而导致预期饱和度和对比度出现差异。
 此时评估利弊有益于您的用例。

如果您有兴趣了解有关配置文件的更多信息，不妨查看 [Nine Degrees Below](https://ninedegreesbelow.com/photography/articles.html)，其中提供一套完整的 ICC 配置文件颜色管理资源。



#### 颜色配置文件和网络浏览器 {: #color-profiles }

早期版 Chrome 无法很好地支持颜色管理，但已在 2017 年通过[颜色校正渲染](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ptuKdRQwPAo)进行了改进。
非 sRGB 显示器（新的 Macbook Pro）会将颜色从 sRGB 转换为显示器配置文件。
 这意味着在不同的系统和浏览器中，颜色看起来应该更相似。
 现在，Safari、Edge 和 Firefox 也可以考虑 ICC
配置文件，因此无论您的屏幕是否有宽色域，具有不同颜色配置文件（例如，ICC）的图像都可以正确地显示颜色。


注：有关如何将颜色应用于网络上使用的广泛方法的指南，请参阅 Sarah
Drasner 的[网络颜色技术指南](https://css-tricks.com/nerds-guide-color-web/)。


## 图像精灵 {: #image-sprites }

[图像精灵](/web/fundamentals/design-and-ui/responsive/images#use_image_sprites)（或 CSS 精灵）应用于网络的历史由来已久，不但受到所有浏览器的支持，而且已成为通过将图像组合成单个大型切片图像来减少页面加载图像数量的一种流行方式。


<img src="images/i2_2ec824b0_1.jpg" alt="图像精灵仍然广泛用于大型生产网站，包括 Google 主页。"/>
图像精灵仍然广泛用于大型生产网站，包括 Google 主页。



在 HTTP/1.x 环境中，一些开发者使用图像精灵来减少 HTTP 请求。 虽然此方法可以带来许多好处，但是当您突然遇到缓存失效问题时要格外小心，因为对图像精灵任何小部分的更改都会使用户缓存中的整个图像无效。




然而，图像精灵现在可能是 [HTTP/2](https://hpbn.co/http2/) 反面模式。
使用 HTTP/2 时，最好是[加载单个图像](https://deliciousbrains.com/performance-best-practices-http2/)，因为现在可以在单个连接中进行多次请求。
 衡量并评估此方法是否适合您的网络设置。


## 延迟加载非关键图像 {: #lazy-load-non-critical-images }

延迟加载是一种网络性能模式，可延迟加载浏览器中的图像，直到用户需要查看图像为止。
 例如，当用户向下滚动页面时，图像会根据需要异步加载。
 如此可进一步补充通过图像压缩策略节省的字节。




<img src="images/scrolling-viewport.jpg" alt="延迟加载图像"/>


立刻加载必须出现在“首屏”或网页首次显示时必须显示的图像。
 不过，用户尚无法看到“首屏线下”的图像。
 没必要将这些图像立即加载到浏览器中，
 可稍后加载或延迟加载这些图像，即只在用户向下滚动并且有必要显示时才进行加载。


浏览器本身尚未对延迟加载提供原生支持（尽管之前进行过[讨论](https://discourse.wicg.io/t/a-standard-way-to-lazy-load-images/1153/10)），
 而我们使用 JavaScript 来添加此功能。

**延迟加载为何有用？**

这种只有在必要时延迟加载图像的方法有很多好处：

* **减少数据消耗**：假设用户并不需要提前提取每个图像，那么您只需加载最少数量的资源即可。
 这非常有用，尤其是在数据流量有限的移动设备上更是如此。
* **降低电池消耗**：减少用户浏览器的工作负载可以延长电池的使用寿命。
* **提高下载速度**：将包含大量图像的网站的页面加载总时间从几秒减少到几乎为零，可显著改善用户体验。
 事实上，这可能就是用户留在您的网站与又一次弹跳的差别所在。

**但是，像所有工具一样，功能越大责任越大。**

**避免延迟加载首屏的图像。**延迟加载长串图像（例如产品）或用户头像列表。
 请不要延迟加载主页的主角图像。
 无论是在技术层面上还是从人类感知角度来看，延迟加载首屏上的图像会明显减慢加载速度。
 如此不但会中止浏览器的预加载程序和渐进式加载，而且 JavaScript 会为浏览器带来额外的工作负载。


**在滚动时延迟加载图像需要格外小心。**如果您等到用户滚动查看图像时才加载图像，那么用户可能会看到占位符，而如果用户尚未滚过图像，那么最终可能会看到图像。
 建议加载完首屏图像后即开始延迟加载，加载所有图像时不考虑用户互动。



**谁会延迟加载图像？**

有关延迟加载图像的示例，请查看大多数托管大量图像的主要网站。
i 一些重要的网站包括 [Medium](https://medium.com/) 和
[Pinterest](https://www.pinterest.com/)。


<img src="images/Modern-Image35.jpg" alt="medium.com 上图像的内联预览"/>
Medium.com 上图像的高斯模糊内联预览示例


许多网站（例如 Medium）显示小型高斯模糊内联预览（几百字节），提取后其将转换（延迟加载）为全质量图像。



José M. Pérez 撰写了有关如何使用 [CSS
过滤器](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)实现 Medium 效果的文章，并尝试使用[不同的图像格式](https://jmperezperez.com/webp-placeholder-images/)来支持此类占位符。
 此外，Facebook 也针对其[封面照片](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/)的此类占位符撰写了有关著名的 200 字节方法的文章，值得详细阅读。
 如果您使用 Webpack，[LQIP
加载程序](https://lqip-loader.firebaseapp.com/)有助于自动完成部分延迟加载工作。


事实上，您可以搜索自己喜欢的高分辨率照片资源，然后向下滚动页面。
 几乎在所有情况下，您都会发现网站一次只加载少量全分辨率图像，其余为占位符颜色或图像。
 如果继续滚动，占位符图像将被替换为全分辨率图像。
 这就是延迟加载的实际应用。

**如何将延迟加载应用到页面？**

您可以使用许多技术和插件实现延迟加载。 推荐使用 Alexander Farkas
 的 [Lazysizes](https://github.com/aFarkas/lazysizes)，因为 Lazysizes 具有良好的性能、强大的功能，还提供与
[Intersection Observer](/web/updates/2016/04/intersectionobserver) 集成的选项，并且支持其他插件。



**使用 Lazysizes 可以做什么？**

Lazysizes 是一个 JavaScript 库， 不需进行任何配置， 只需下载缩小的 js 文件并将其纳入网页中即可。



以下是摘自 README 文件的一些示例代码：

将 "lazyload" 类连同 data-src
和/或 data-srcset 属性添加到 image/iframe 中。

您也可以选择为低质图像添加 src 属性：

```html
<!-- non-responsive: -->
<img data-src="image.jpg" class="lazyload" />

<!-- responsive example with automatic sizes calculation: -->
<img
    data-sizes="auto"
    data-src="image2.jpg"
    data-srcset="image1.jpg 300w,
    image2.jpg 600w,
    image3.jpg 900w" class="lazyload" />

<!-- iframe example -->

<iframe frameborder="0"
    class="lazyload"
    allowfullscreen=""
    data-src="//www.youtube.com/embed/ZfV-aYdU4uE">
</iframe>
```

在本手册的网络版本中，我将 Lazysizes（可以使用任何库替代）与 Cloudinary 配对，以按需提供响应式图像。
 这让我能够自由地尝试不同的等级值、质量、格式，以及是否轻松地进行渐进式加载：




<img src="images/cloudinary-responsive-images.jpg" alt="Cloudinary 支持按需控制图像质量、格式和几项其他功能。"/>


**Lazysizes 功能包括：**

* 自动检测当前和未来延迟加载
元素的可见性变更
* 包括标准响应式图像支持（picture 和 srcset）
* 为媒体查询功能添加自动大小计算和别名
* 可以与 CSS 和 JS 重量级页面或网页应用上的数百个 image/iframe 结合使用
* 可扩展：
支持插件
* 轻量但成熟的解决方案
* SEO 改进：不会隐藏抓取工具的图像/资产

**更多延迟加载选项**

Lazysizes 不是唯一的选择。 以下提供更多延迟加载库：

*   [Lazy Load XT](http://ressio.github.io/lazy-load-xt/)
*   [BLazy.js](https://github.com/dinbror/blazy)（或 [Be]Lazy）
*   [Unveil](http://luis-almeida.github.io/unveil/)
*   [yall.js（另一种延迟加载器）](https://github.com/malchata/yall.js)，大约 1KB，在支持的情况下使用 Intersection Observer。


**延迟加载存在的问题是什么？**

*   屏幕阅读器、部分搜索自动程序和禁用 JavaScript 的所有用户将无法查看使用 JavaScript 延迟加载的图像。
 不过，我们可以使用 `<noscript>` 回退解决此问题。
*   滚动侦听器（例如，用于确定何时加载延迟加载图像）可能会对浏览器滚动性能产生负面影响。
 滚动侦听器可能会导致浏览器多次重绘，从而减缓抓取进程，但智能延迟加载库可以使用限制来缓解这种情况。
    一种可能的解决方案是使用 Lazysizes 支持的 Intersection Observer。


延迟加载图像是一种用于减少带宽、降低成本和改善用户体验的普遍模式。
 您可以评估延迟加载图像是否有助于改善您的体验。
 有关更多信息，请参阅[延迟加载图像](https://jmperezperez.com/lazy-loading-images/)和[实现
Medium 的渐进式加载](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)。



## 避免 display:none 问题 {: #display-none-trap }

早期的响应式图像解决方案弄错了浏览器在设置 CSS `display` 属性时处理图像请求的方式。
 这可能导致请求的图像明显超过预期，也是
`<picture>` 和 `<img srcset>` 成为加载响应式图像首选的另一个原因。


您是否曾经编写过用于在特定断点将图像设置为 `display:none` 的媒体查询？


```html
<img src="img.jpg">
<style>
@media (max-width: 640px) {
    img {
        display: none;
    }
}
</style>
```

或者使用 `display:none` 类切换隐藏的图像？

```html
<style>
.hidden {
  display: none;
}
</style>
<img src="img.jpg">
<img src=“img-hidden.jpg" class="hidden">
```

快速核对 Chrome DevTools Network 面板将验证是否仍然可以提取使用这些方法隐藏的图像，即使我们预计无法提取。
 根据嵌入式资源规范，此行为实际上是正确的。


<img src="images/display-none-images.jpg" alt="仍然可以提取使用 display:none
隐藏的图像"/>


**`display:none` 是否可以避免触发图像 `src` 请求？**

```html
<div style="display:none"><img src="img.jpg"></div>
```

否。 仍然可以请求指定的图像。 在本示例中，库无法依赖
display:none，因为只有在发出图像请求之后，JavaScript 才可以修改
src。

**`display:none` 是否可以避免触发 `background: url()` 请求？**

```html
<div style="display:none">
  <div style="background: url(img.jpg)"></div>
</div>
```

是。 解析元素后无法提取 CSS 背景。 使用 `display:none` 计算元素子级的 CSS 样式作用不大，因为其不会影响文档的呈现。
 既不会计算也不会下载子元素的背景图像。


Jake Archibald 的[请求任务](https://jakearchibald.github.io/request-quest/)
针对使用 `display:none` 进行响应式图像加载的缺陷提供很好的测验。
 如果对特定浏览器如何处理图像请求加载有疑问，请打开其 DevTools 并自行验证。


再次强调，如果可能，请使用 `<picture>` 和 `<img srcset>`，而不是依赖于
`display:none`。

## 图像处理 CDN 是否适用于您？ {: #image-processing-cdns }

*您在阅读博文以设置自己的图像处理管道和调整配置上投入的时间成本通常超过每月的服务费。
 目前，[Cloudinary](http://cloudinary.com/)
提供免费服务、[Imgix](https://www.imgix.com/) 可供免费试用，而
[Thumbor](https://github.com/thumbor/thumbor) 成为 OSS 的替代方案，这为您实现自动化提供多种选项。



若要实现最佳页面加载时间，您需要优化图像加载。
优化图像加载需要具备响应式图像策略，并且可以从服务器上的图像压缩、自动选择最佳格式和响应式调整大小功能中获得好处。
 重要的是您可以尽可能快地以适当的分辨率向适合的设备传送大小正确的图像。
 而这个过程并不像您想象中那么简单。


**使用服务器与 CDN**

由于图像处理非常复杂且不断变化，我们会先引用该领域中经验人士的话语，然后再提供建议。



“如果图像处理并非您要提供的产品，则不要自己处理图像。
相较于您而言，Cloudinary [或 Imgix、Ed.] 能够更有效且更好地处理图像，您不妨加以使用。
 如果您担心成本问题，可以算算开发、维护、托管、存储和交付所需的成本”— [Chris
Gmyr](https://medium.com/@cmgmyr/moving-from-self-hosted-image-service-to-cloudinary-bd7370317a0d)




目前，我们将认同并建议您考虑使用 CDN
处理图像。 接下来，我们将检验两个 CDN，比较并了解相对于我们之前提出的任务列表两者的表现。


**Cloudinary 和 Imgix**

[Cloudinary](http://cloudinary.com/) 和 [Imgix](https://www.imgix.com/) 是两个已确立的图像处理 CDN，
 是全球数十万开发者和公司的理想选择，其中包括 Netflix 和 Red Bull。
 接下来，我们将对此进行详细介绍。


**需要了解的基本信息是什么？**

第一，除非您像他们一样，拥有自己的服务器网络，否则与推出自己的解决方案相比，他们的第一个巨大优势是能够使用分布式全球网络系统让您的图像更贴近于用户。
 随着趋势的变化，CDN 还能够更轻松地确保您的图像加载策略符合未来需求，而如果您自己处理这项任务，不但需要进行维护、跟踪浏览器对新兴格式的支持，还需要关注图像压缩社区。




第二，每项服务都推出分层定价计划，相对于其高额高级计划，Cloudinary 提供[免费服务](http://cloudinary.com/pricing)，而 Imgix 以低廉的价格提供标准服务。
 Imgix 提供免费[试用](https://www.imgix.com/pricing)服务，这与免费服务几乎无异。



第三，两种服务都可以提供 API 访问权限。 开发者能够以编程方式访问 CDN
并自动化处理流程。 此外，两种服务还提供客户端库、框架插件和 API 文档，其中部分功能仅限于高级付费服务。



**接下来介绍图像处理**

现在，我们只讨论静态图像。 Cloudinary 和 Imgix
均提供一系列图像处理方法，并且都在标准和免费计划中支持压缩、调整大小、裁剪和缩略图创建等主要功能。




<img src="images/Modern-Image36.jpg" alt="Cloudinary Media Library"/>
Cloudinary Media Library：默认情况下，Cloudinary 对[非渐进式
JPEG](http://cloudinary.com/blog/progressive_jpegs_and_green_martians) 进行编码。 若要选择生成 JPEG 图像，请勾选“More options”中的“Progressive”选项或传递“fl_progressive”标记。




Cloudinary 列出[七大图像转换](http://cloudinary.com/documentation/image_transformations)类别，其中包含总共 48 个子类别。
 Imgix 推出超过
[100 个图像处理操作](https://docs.imgix.com/apis/url?_ga=2.52377449.1538976134.1501179780-2118608066.1501179780)。


**默认情况下会发生什么？**

*   Cloudinary 默认执行以下优化：
*   [使用 MozJPEG
编码 JPEG](https://twitter.com/etportis/status/891529495336722432)（默认不选择 Guetzli）
*   从转换的图像文件中去除所有关联的元数据（原始图像保持不变）。若要替换此行为并提供其元数据完整的转换后图像，可以添加 `keep_iptc` 标记。
*   可以自动质量生成 WebP、GIF、JPEG 和 JPEG-XR 格式。 若要替换默认调整值，可以在转换中设置质量参数。
*   在生成 PNG、JPEG 或 GIF 格式的图像时，运行[优化](http://cloudinary.com/documentation/image_optimization#default_optimizations)算法以最大限度缩小文件大小，同时将对视觉质量的影响降至最低。




Imgix 没有 Cloudinary 拥有的此类默认优化设置， 不过却有可设置的默认图像质量。
 在 Imgix 中，自动参数有助于在整个图像目录中自动设置基线优化级别。


目前，Imgix 拥有[四种不同的方法](https://docs.imgix.com/apis/url/auto)：

*   压缩
*   视觉增强
*   文件格式转换
*   去除红眼

Imgix 支持以下图像格式：JPEG、JPEG2000、PNG、GIF、动画
GIF、TIFF、BMP、ICNS、ICO、PDF、PCT、PSD、AI

Cloudinary 支持以下图像格式：JPEG、JPEG 2000、JPEG XR、PNG、GIF、动画 GIF、WebP、动画 WebP、BMP、TIFF、ICO、PDF、EPS、PSD、SVG、AI、DjVu、FLIF、TARGA。



**性能如何？**

CDN 交付性能主要在于[延迟](https://docs.google.com/a/chromium.org/viewer?a=v&pid=sites&srcid=Y2hyb21pdW0ub3JnfGRldnxneDoxMzcyOWI1N2I4YzI3NzE2)和速度。



对于完全未缓存的图像，延迟总会有所增加。 但是相比处理不当的图像或试图在全局范围内进行访问的单独服务器，只要图像得以缓存并在网络服务器之间分发，全局 CDN 便可找到最快为用户提供图像的方式，再加上经过正确处理的图像能够节省不少字节，如此一来延迟问题几乎总是能够得以缓解。






两种服务均使用快速且广泛的 CDN。 此配置可以降低延迟并提高下载速度。
i 下载速度会影响页面加载时间，而这又是衡量用户体验和转换的最重要指标之一。


**两种服务的比较结果如何？**

Cloudinary 拥有 [16 万位客户](http://cloudinary.com/customers)，其中包括
Netflix、eBay 和 Dropbox。 Imgix 虽然没有公布其客户数量，但数量应该比 Cloudinary 少。
 即便如此，Imgix 的用户群包括重量级图像用户，如 Kickstarter、Exposure、unsplash 和 Eventbrite。


图像处理中存在许多不受控制的可变因素，因此很难正面比较这两种服务的性能。
 两种服务的性能在很大程度上取决于图像所需的处理程度（造成所需时间不同），以及最终需要输出的图像大小和分辨率（影响速度和下载时间）。
 最后，成本可能是影响决定的最重要因素。


使用 CDN 的成本较高。 拥有大量网络流量及图像的网站每月在 CDN 上的花费可能就需要数百美元。
 为了充分利用这些服务，您需要具备一定程度的必备知识和编程技能。
如果不过分追求奇特效果，那么您或许不会遇到任何问题。


但是，如果您不习惯使用图像处理工具或 API，就需要学习一些新知识。
 为了适应 CDN
服务器位置，您需要更改本地链接中的某些网址。 请尽自己最大的努力！:)


**结论**

如果您目前正在或计划自行提供图像，也许应该考虑使用 CDN。


## 缓存图像资产 {: #caching-image-assets }

资源可以使用 [HTTP
缓存标头](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)指定缓存策略。
具体来说，`Cache-Control` 可以定义缓存响应的用户及持续时间。


您为用户提供的大多数图像都是静态资产，这一点将来也[不会改变](http://kean.github.io/post/image-caching)。
 适用于此类资产的最佳缓存策略是激进缓存。


设置 HTTP 缓存标头时，设置 max-age 为一年的 Cache-Control（例如 `Cache-Control:public; max-age=31536000`）。
 这类激进缓存非常适用于大多数类型的图像，尤其是长期使用的图像，如头像和图像标题。



注：如果您使用 PHP 提供图像，则可能因为默认的
[session_cache_limiter](http://php.net/manual/en/function.session-cache-limiter.php)
设置，使缓存遭到破坏。
 如此将严重影响图像缓存，不过您可以通过设置
session_cache_limiter('public') 来设置 `public, max-age=`，以[解决](https://stackoverflow.com/a/3905468)该问题。
 停用并设置自定义 cache-control 标头同样也可以解决该问题。


## 预加载关键图像资产 {: #preload-critical-image-assets }

您可以使用 [`<link
rel=preload>`](https://www.w3.org/TR/preload/) 预加载关键图像资产。

`<link rel=preload>` 是声明性提取，允许您强制浏览器在不阻止文档的 `onload` 事件的情况下请求资源。
其可提高资源请求的优先级，否则这些资源可能会在之后的文档解析过程中才会出现。


您可通过指定 `image` 的 `as` 值来预加载图像：

```html
<link rel="preload" as="image" href="logo.jpg"/>
```

`<img>`、`<picture>`、`srcset` 和 SVG 的图像资源都可以利用此优化策略。


注：`<link rel="preload">` 受到 Chrome 和基于 Blink 的浏览器（如 Opera、[Safari Tech
Preview](https://developer.apple.com/safari/technology-preview/release-notes/)）的[支持](http://caniuse.com/#search=preload)，并且已在 Firefox 中[实施](https://bugzilla.mozilla.org/show_bug.cgi?id=1222633)。



[Philips](https://www.usa.philips.com/)、[FlipKart](https://www.flipkart.com/) 和 [Xerox](https://www.xerox.com/) 等网站使用
`<link rel=preload>` 预加载主要徽标资产（早期通常在文档中使用）。
 此外，[Kayak](https://kayak.com/) 也使用预加载来确保尽快加载其标头的主角图像。



<img src="images/preload-philips.jpg" alt="Philips 使用 link rel=preload
预加载其徽标图像"/>


**什么是 Link 预加载标头？**

预加载链接可以使用 HTML 标记或 [HTTP Link
标头](https://www.w3.org/wiki/LinkHeader)进行指定。 无论哪种情况，预加载链接都会指示浏览器开始将资源加载到内存缓存中，这表明页面肯定会使用资源，并且不希望等待预加载扫描程序或解析程序发现资源。


图像的 Link 预加载标头类似如下：

```
Link: <https://example.com/logo-hires.jpg>; rel=preload; as=image
```

《金融时报》在其网站上推出 Link 预加载标头后，将显示刊头图像所需的时间缩短了 [1 秒](https://twitter.com/wheresrhys/status/843252599902167040)：




<img src="images/preload-financial-times.jpg" alt="《金融时报》使用预加载。
        显示的内容是跟踪记录显示改进之前和之后的 WebPageTest 测试结果。"/>
底部：使用 `<link rel=preload>`；顶部：未使用。 使用 3G 的 Moto G4 在使用预加载[之前](https://www.webpagetest.org/result/170319_Z2_GFR/)和[之后](https://www.webpagetest.org/result/170319_R8_G4Q/)于 WebPageTest 的测试结果比较。



同样地，维基百科在其[案例研究](https://phabricator.wikimedia.org/phame/post/view/19/improving_time-to-logo_performance_with_preload_links/)中介绍其通过 Link 预加载标头改进徽标显示时间性能。



**使用此优化策略时应该考虑哪些注意事项？**

确认图像资源是否值得预加载，因为如果这些资源对提高用户体验而言不是很重要，则您可能需要专注于提前加载页面上的其他内容。
 优先处理图像请求，则表示您可能会将其他资源往后推。


若没有广泛的浏览器（例如 WebP）支持，则务必避免使用 `rel=preload` 预加载图像格式。
 此外，也必须避免将它用于 `srcset` 中定义的响应式图像，其中检索到的源可能会根据设备条件而有所不同。



若要了解有关预加载的更多信息，请参阅[在
Chrome 中预加载、预提取和优先处理](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)以及[预加载：
有何好处？](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)。


## 图像的网页性能预算 {: #performance-budgets }

性能预算是团队尝试不超过的网页性能的“预算”。
 例如，“任何页面上的图像都不超过 200KB”或“必须在 3 秒内提供用户体验”。
 如果不符合预算，请探究原因以及如何重新实现目标。


预算为与利益相关者的性能讨论提供有用的框架。
如果设计或业务决策可能会影响网站性能，请查看预算要求。
 如果网站的用户体验可能受到影响，则可参考预算要求推迟或重新考虑变更。


我发现自动进行监控时，团队在性能预算方面取得了最大的成功。
 自动化技术可以在超出预算时进行标记，而不是通过手动检查网络瀑布来实现预算回归。
 您可使用
[Calibre](https://calibreapp.com/docs/metrics/budgets) 和
[SpeedCurve](https://speedcurve.com/blog/tag/performance-budgets/) 两种服务跟踪性能预算。


定义图像大小的性能预算后，SpeedCurve
便开始监控并在超出预算时提醒您：


<img src="images/F2BCD61B-85C5-4E82-88CF-9E39CB75C9C0.jpg" alt="SpeedCurve 图像大小监控。"/>


Calibre 提供类似功能，支持为您的每个目标 device-class 设置预算。
 该功能非常有用，因为使用 WiFi 的桌面设备上的图像大小预算可能与移动设备上的预算存在很大差异。



<img src="images/budgets.jpg" alt="Calibre 支持图像大小预算。"/>

## 建议总结 {: #closing-recommendations }

最后，选择图像优化策略实际上就是您为用户提供何种类型的图像，而您的决定则是一套合理的评估标准。
 您可以使用 SSIM 或 Butteraugli，或者如果是一组足够小的图像，您可以脱离人类感知，选择最适合的策略。



**以下是我的建议总结：**

如果您**无法**根据浏览器支持有条件地提供图像格式：


* Guetzli 加 MozJPEG 的 jpegtran 格式非常适合质量大于 90 的 JPEG。
    * 在网页中使用 `q=90` 是极大的浪费。 您可以使用 `q=80`，而在 2x 显示器上，您甚至可以使用 `q=50`。
 由于 Guetzli 不提供如此低的质量，因此您可以在网页中使用 MozJPEG。
    * Kornel Lesi&#x144;ski 最近已改进 mozjpeg 的 cjpeg 命令，可添加小型 sRGB 配置文件来帮助 Chrome 在宽色域显示器上显示自然色
* PNG pngquant 加 advpng 提供出色的速度/压缩比率
* 如果您**可以**有条件地提供图像（使用 `<picture>`、[Accept
 标头](https://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/)或 [Picturefill](https://scottjehl.github.io/picturefill/)）：
    * 向支持的浏览器提供 WebP
        * 从原始 100% 质量的图像创建 WebP 图像。 否则，您将会为支持的浏览器提供包含 JPEG
失真*和* WebP 失真的糟糕图像！
如果使用 WebP 压缩未压缩的源图像，WebP 失真将不会太明显，而且您也可以获得更好的压缩效果。
        * WebP 团队使用的 `-m 4 -q 75` 默认设置通常适用于针对速度/比率进行优化的大多数情况。
        * WebP 还提供适用于无损 (`-m 6 -q 100`) 的特殊模式，可通过探索所有参数组合将文件减小至最小大小。虽然 WebP 的速度要慢一个数量级，但非常适用于静态资产。
    * 作为后备方案，您可以向其他浏览器提供 Guetzli/MozJPEG 压缩资源


祝您轻松压缩！

