你是否曾思考过(在页面布局中)CSS所承载的工作量？(紧接着)你修改了某个CSS属性的属性值，然后你整个网站瞬间以不同的layout展示在我们面前。CSS在页面布局方面确实有点魔力。(谁能告诉我，拥有这些魔力我们今后的道路将如何走?)到目前为止，身在web开发者社区的我们才能见证以及体验这些魔力。如果我们想提出自己的魔力该怎么办？如果我们想变成魔法师该怎么办？加入Houdini工作小组！  

Houdini工作小组聚齐了来自Mozilla，Apple，Opera，Microsoft，HP，Intel以及Google工程师,工作小组的意图旨在把CSS引擎的部分模块暴露给web开发者。Houdini工作小组正在制订能够被W3C组织认可从而逐渐成为web标准的草案集。Houdini工作小组给他们自己定下了更高的目标，要将(由他们制订的)草案集变成规范草案，反过来，(由他们制订的)草案将会变成低层次且带有辅助性质的草案集。当有人谈论到"Houdini"时通常就表示他们谈论的是草案集。在我们写(自己筹备的)草案集的那段时间，草案列表都是处于未完成状态，甚至(草案列表中的)一些草案仅仅还是处于计划阶段。可见我们Houdini工作小组的准备工作是有多么的早啊。  

![Houdini Compositor Worklet for transitions](http://7xl614.com1.z0.glb.clouddn.com/20160607095542.png)  

免责声明：我想先放出Houdini草案的预览版，所以你可能会想Houdini工作小组究竟想解决哪些问题。只要目前制定的规范能够被浏览器部分支持，我会试着给出代码实例。请记住这些规范还是只是草案，而且很不稳定。所以不能保证这些代码案例在不久的将来能够完全正确，否则只有等这些草案变成现实中的标准,这样才能保证代码案例完全正确。
##规范###
###Worklets([规范](http://https://drafts.css-houdini.org/worklets/))###
Worklets对自己本身来说用处不大。因为Worklets只是尽可能的为以后的草案提供内容介绍的支持。在你阅读"worklet"的同时想到Web Workers，就会发现你(前面的论述)是正确的。因为他们之间有太多的概念交叉。因此我们可能会有这个疑问，在我们已经有web workers的前提下为什么还要有Worklet？Houdini旨在暴露新的API给web开发者，让他们可以将自己的代码挂载在CSS引擎或者外围环境。假定fragments中的一些片段必须运行所有单帧的想法是不现实的。有些代码片段是需要被定义。引用[Web Worker规范：](https://www.w3.org/TR/workers/)
>Workers[...]，相对来说比较笨重，以及在处理大数方面不推荐使用。例如针对含有四百万像素的图片中的每个像素都开启一个线程的类似做法是不可取的。  

这就意味着web workers跟Houdini要做的事情不匹配。因此worklets就应运而生。Worklets使用ES2015的class来定义一个包含方法的集合，通过使用worklet的数据类型提前定义方法的签名。而且Worklets具有轻量以及生存周期短的特点。  
##Paint Worklet([规范](https://drafts.css-houdini.org/css-paint-api/))  
正是因为Paint Worklets介绍的新概念少，所以我才开始研究Paint Worklets。下面内容是从Paint Worklets的规范草案摘抄出来的  
>CSS的paint脚手架主要是负责背景的绘制以及在元素的几何结构(用来产生layout脚手架)和样式基础上来绘制内容和实现高亮。  

Paint Worklet不但可以让你定义元素如何画它本身(可以考虑结合使用[Web Components]())而且可以让你修改已存在元素的外观。这里就没必要使用类似在按钮上添加DOM元素产生波纹效果的hack技巧。这样做的话对于常见的视图来说可以显著减少DOM节点数。另外使用`<canvas>`元素然后在元素绘制期间运行代码的另一个好处就是你可以知道你正在绘制的元素的尺寸并且能够了解以及合理应用fragments。  
###等下，什么是fragments？
###fragments
我会把DOM树中的元素看作能够被CSS引擎展示的盒子模型，接着通过使用盒子模型来建站。当行内元素开始起作用的时候，这个模型是有瑕疵的。`<span>`标签的内容会折行。因此当(会被折行的)行内元素是唯一的DOM节点时，该行内元素被分成2个fragments。[规范](https://www.w3.org/TR/css3-break/)把2 fragments的边界框称为fragmentainer。(我不是开玩笑的)![](http://7xl614.com1.z0.glb.clouddn.com/fragment.png)  

回到Paint Worklet:实际上，你的代码会被每个fragment调用而且你的代码也可以像API一样访问原始的`<canvas>`，另外样式也会被应用到元素上。(除视图审查情况)Paint Worklet还是允许你画fragment，你甚至可以要求使用"overflow"的外边距来让你实现在元素边界画效果，和`box-shadow`效果类似。  

    class {
      static get inputProperties() {
    return ['border-color', 'border-size'];
      }
      paint(ctx, geom, inputProperties) {
    /*定义了inputProperties的get操作，调用inputProperties返回一个数组，所以对inputProperties['border-size']不是很理解*/
    var offset = inputProperties['border-size']
    var colors = inputProperties['border-color'];
    self.drawFadingEdge(
      ctx,
      0-offset[0], 0-offset[0],
      geom.width+offset[0], 0-offset[0],
      color[0]);
    self.drawFadingEdge(
      ctx,
      geom.width+offset[1], 0-offset[1],
      geom.width+offset[1], geom.height+offset[1],
      color[1]);
    self.drawFadingEdge(
      ctx, 0-offset[2],
      geom.height+offset[2], geom.width+offset[2],
      geom.height+offset[2],
      color[2]);
    self.drawFadingEdge(
      ctx,
      0-offset[3], 0-offset[3],
      0-offset[3], geom.height+offset[3],
      color[3]);
      }
      drawFadingEdge(ctx, x0, y0, x1, y1, color) {
    var gradient =
      ctx.createLinearGradient(x0, y0, x1, y1);
    gradient.addColorStop(0, color);
    var colorCopy = new ColorValue(color);
    colorCopy.opacity = 0;
    gradient.addColorStop(0.5, colorCopy);
    gradient.addColorStop(1, color);
      }
      overflow(inputProperties) {
    // Taking a wild guess here. The return type
    // of overflow() is currently specified
    // as `void`, lol.
    return {
      top: inputProperties['border-size'][0],
      right: inputProperties['border-size'][1],
      bottom: inputProperties['border-size'][2],
      left: inputProperties['border-size'][3],
    };
      }
    }; 
###Compositor Worklet
在Houdini工作小组编写草案集的那段时间，compositor worklet还没有合适的提案，所以这件事情非常鼓舞我。正如你所知道的那样，CSS引擎会把一些绘图操作外包给你电脑的显卡，一般来说，CSS引擎是否会那样做，取决于你电脑的显卡以及你的设备。浏览器通常会拿到DOM树，然后基于特定的准则，给出分支以及子树对应的[layer](http://www.html5rocks.com/en/tutorials/speed/layers/)。这些子树会在自己所对应的layer中进行自我绘制(也许在不久的将来会使用paint worklet)。走到最后一步，相互独立且已绘制过(子树)的layers会被放入堆栈的顶部位置，综合考虑z-indices，3D变换以及其它因素，最后会在屏幕上显示最终绘制完成的图片。这个过程被叫做"compositing"，通过"compositor"来运行这个compositing。compositing的优势在于当你页面只滚动一小段距离的时候，你完全没有必要重绘所有的元素，你可以从先前的frame中重用这些layer，然后在改变滚动距离的同时重新运行compositor。这样做可以让动画更快，可以达到60fps。[Paul Lewis](https://twitter.com/aerotwist)对此非常开心。
![](http://7xl614.com1.z0.glb.clouddn.com/compworklet_small.png)  

正如名字所暗示的那样，compositor worklet会允许你绑定compositor以及影响(已绘制且定位于其它layers顶部的)元素layer方式。为了获取更多具体的信息，你可以为特定的DOM节点绑定compositing线程，然后请求访问类似滚动位置，变换或者透明度等属性，最后将这些事情告知浏览器。这种做法会迫使元素放弃自己的layer，然后在每个frame中调用你写的代码。你可以通过操作layers变换来移动layer，然后通过改变layer的属性(例如透明度)来让你做一些只能在60fps情况下才感觉炫酷的事情。这是使用compositor worklet实现并行滚动的完整事例。  

    // main.js
    window.compositorWorklet.import('worklet.js')
      .then(function() {
    var animator = new CompositorAnimator('parallax');
    animator.postMessage([
      new CompositorProxy($('.scroller'), ['scrollTop']),
      new CompositorProxy($('.parallax'), ['transform']),
    ]);
      });  
###
    // worklet.js
    registerCompositorAnimator('parallax', class {
      tick(timestamp) {
    var t = self.parallax.transform;
    t.m42 = -0.1 * self.scroller.scrollTop;
    self.parallax.transform = t;
      }
    
      onmessage(e) {
    self.scroller = e.data[0];
    self.parallax = e.data[1];
      };
    });  

我的同事Robert Flack已经为compositor worklet写一个[polyfill](https://github.com/googlechrome/houdini-samples)，所以你可以抱着体验性能的目的来尝试使用一下compositor worklet 。  

###Layout Worklet([规范](https://drafts.css-houdini.org/css-layout-api/))
虽然Layout Worklet的规范几乎是空的，但是Layout Worklet的想法非常吸引人:写你自己的layout！layout worklet可以让你这样使用display属性(`display:layout('myLayout')`)以及允许运行你的JavaScript代码从而来管理节点盒子模型中子节点。当然，直接运行(用来实现CSS的`flex-box`布局的)JavaScript代码的速度肯定比运行(原生实现相同功能的)JavaScript代码慢，但是很容易想到这样的一个情景：砍掉这些代码就又会引起性能问题。试想一下，一个网站上面只有(Windows 10系统自带的)tiles或者直接用[Masonry](http://masonry.desandro.com/)布局，不再使用绝对/固定位置，也没有使用`z-index`，也不存在元素之间的重叠甚至没有任何边界以及溢出。而且能够跳过针对重绘操作的所有检查(ps:重绘操作会导致性能问题)。  

    registerLayout('random-layout', class {
    static get inputProperties() {
      return [];
    }
    static get childrenInputProperties() {
      return [];
    }
    layout(children, constraintSpace, styleMap) {
    Const width = constraintSpace.width;
    Const height =constraintSpace.height;
    for (let child of children) {
    const x = Math.random()*width;
    const y = Math.random()*height;
    const constraintSubSpace = new ConstraintSpace();
    constraintSubSpace.width = width-x;
    constraintSubSpace.height = height-y;
    const childFragment = child.doLayout(constraintSubSpace);
    childFragment.x = x;
    childFragment.y = y;
    }
    
    return {
    minContent: 0,
    maxContent: 0,
    width: width,
    height: height,
    fragments: [],
    unPositionedChildren: [],
    breakToken: null
    };
    }
    });  

###Typed CSSOM([规范](https://drafts.css-houdini.org/css-typed-om/))
Typed CSSOM(CSS对象模型或者可重叠样式模型)可以定位我们可能遇到的所有需要忍受的问题。让我们用一行JavaScript代码来阐述这个问题吧  

    $('#someDiv').style.height = getRandomInt() + 'px';  

我们需要实现一个返回结果为数字的函数，然后将数字转换成字符串，最后将单位追加到字符串后面。(我们的任务完成后)浏览器只需要解析出字符串中的数字，然后将数字返回给CSS引擎。当你使用[JavaScript代码操作变换](https://aerotwist.com/blog/flip-your-animations/#got-code)时，这样写出的代码甚至有可能不美观。再也不用担心这个问题啦！因为CSS即将会支持动态输入！  

Typed CSSOM草案只是成熟草案的一个，并且[polyfill](https://github.com/css-typed-om/typed-om)已经完成了。(免责声明：使用这个polyfill明显会增添更多的计算开销。这个polyfill旨在表明使用Typed CSSOM中的API是多么的方便。)  

你可以使用元素中的`StylePropertyMap`属性来代替字符串，StylePropertyMap中的CSS属性都有自己的键名以及相应的值类型。`width`属性就把`LengthValue`作为它的值类型。`LengthValue`就好像是一个包含所有如`em`，`rem`，`px`，`percent`等CSS单位的字典。通过设置`height:calc(5px+5%)`也会生成一个`LengthValue{px:5,percent:5}`。另外像`box-sizing`属性仅仅是接受特定的关键词，因此`box-sizing`拥有`KeywordValue`值类型。在运行时会检查这些属性的有效性。  

    <div style="width: 200px;" id="div1"></div>
    <div style="width: 300px;" id="div2"></div>
    <div id="div3"></div>
    <div style="margin-left: calc(5em + 50%);" id="div4"></div>
    var w1 = $('#div1').styleMap.get('width');
    var w2 = $('#div2').styleMap.get('width');
    $('#div3').styleMap.set('background-size',
      [new SimpleLength(200, 'px'), w1.add(w2)])
    $('#div4')).styleMap.get('margin-left')
      // => {em: 5, percent: 50}  

###Properties and Values([规范](https://drafts.css-houdini.org/css-properties-values-api/))
你知道[CSS有哪些常见的属性](https://developers.google.com/web/updates/2016/02/css-variables-why-should-you-care)(或者CSS Variables有哪些非正式的别名)？CSS Variables甚至还有数据类型的概念！到目前为止，CSS变量只能被赋值为字符串类型而且被经常用作关于搜索以及替换的解决方案。Properties and Values草案不仅允许你为CSS变量指定类型，而且允许你为CSS变量设置默认值以及允许你使用JavaScript API来影响CSS变量之间的继承关系。从技术上来讲，Properties and Values也允许常见的属性通过使用标准CSS过渡以及动画来实现动画效果，对于这种想法我们还是可以实现的。  

    ["--scale-x", "--scale-y"].forEach(function(name) {
    document.registerProperty({
        name: name,
        syntax: "<number>",
        inherits: false,
        initialValue: "1"
        });
    });  

###Font Metrics
Font metrics和名字所描述的一样。当我们通过使用字体大小为Z的Y字体来渲染X字符串或者我们要字符折行时，我们就要问自己什么是边界框？如果存在这种情景：你喜欢使用[ruby注释](https://en.wikipedia.org/wiki/Ruby_character)而我要在你的代码上执行所有的unicode编码，那我们该怎么办？这种情况解决需要很多条件，最后我觉得Houdini工作小组应该可以将这些愿望变成现实。  

###But wait, there’s more!
虽然Houdini的草案列表中有很多规范，但是我们也不能预测这些规范的未来，而且就拿提案来说，这些规范就不多于placeholders。这些案例(针对常见溢出，针对CSS语法扩展的API，针对原生滚动扩展)现在都可以运行在目前的web平台，但是在以前这些案例都是不能运行的。  

###Gimme!
到目前为止，Chrome没有实现Houdini工作小组制定的任何规范。然而在不久将来Chrome Canary可能会部分实现了Houdini工作小组制定的规范Beta版。  
不管怎么样，我已经开源了相关[代码](https://github.com/GoogleChrome/houdini-samples)(关于如何使用polyfill写案例)以及录制了与此相关的[视频案例](https://googlechrome.github.io/houdini-samples/twitter-header)，好让你们直观感受一下worklets。  
如果你想更深入了解，这里有[Houdini工作小组的邮件列表](https://lists.w3.org/Archives/Public/public-houdini/)