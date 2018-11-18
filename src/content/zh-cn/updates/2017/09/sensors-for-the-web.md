project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Generic Sensor API从Chrome 63开始作为原始试用版（Origin Trials）.

{# wf_updated_on: 2018-03-21 #}
{# wf_published_on: 2017-09-18 #}
{# wf_tags: sensors,origintrials,chrome63,news #}
{# wf_blink_components: Blink>Sensor #}
{# wf_featured_image: /web/updates/images/generic/screen-rotation.png #}
{# wf_featured_snippet: 许多原生应用程序使用传感器来支持高级功能。如果能有一个Web传感器API去缩小原生和Web应用程序之间的差距是不是很棒？现在，你可以使用Generic Sensor API, 目前已经在Chrome63中作为原始试验版（Origin Trials）. #}

# Web传感器! {: .page-title }

{% include "web/_shared/contributors/alexshalamov.html" %}
{% include "web/_shared/contributors/pozdnyakov.html" %}

今天，传感器数据被用于许多原生应用程序，以实现诸如沉浸式游戏，健身追踪，AR，VR等用例。如果能有一个Web传感器API去缩小原生和Web应用程序之间的差距是不是很酷？[Generic Sensor API](https://www.w3.org/TR/generic-sensor/)，就是为Web而诞生的！

## 什么是Generic Sensor API? {: #what-is-generic-sensor-api }

[Generic Sensor API](https://www.w3.org/TR/generic-sensor/)提供了一套接口把传感器设备暴露到Web平台。该API由基础[Sensor](https://w3c.github.io/sensors/#the-sensor-interface)接口和一组构建于上方的具体传感器类组成。拥有基础接口可以简化具体传感器类的实现和规范流程。比如你可以看一下[Gyroscope](https://w3c.github.io/gyroscope/#gyroscope-interface)类，它非常的简短！核心功能由基础Sensor接口提供，Gyroscope类仅用了三个代表角速度的属性扩展它。

通常，具体的传感器类代表平台上的实际传感器，例如加速计或陀螺仪。但是，在某些情况下，传感器类的实现会[融合](https://w3c.github.io/sensors/#sensor-fusion)来自多个平台传感器的数据，并以便捷的方式向用户展示结果。例如，[AbsoluteOrientation](https://www.w3.org/TR/orientation-sensor/#absoluteorientationsensor)传感器基于从加速度计，陀螺仪和磁力计获得的数据提供即用型4x4旋转矩阵。

您可能认为Web平台已经提供了一些传感器数据接口，例如，[DeviceMotion](/web/fundamentals/native-hardware/device-orientation/)和[DeviceOrientation](/web/fundamentals/native-hardware/device-orientation/)事件暴露运动传感器数据，还有一些其他实验性API提供来自环境传感器的数据。那么，为什么我们还需要这个新的API呢？

与现有传感器接口相比，Generic Sensor API有许多优势：

- Generic Sensor API是一个传感器框架，可以使用新的传感器类轻松扩展，并且每个类都将保留通用接口。为一种传感器类型编写的客户端代码可以重新用于另一种，只需很少的修改！
- 您可以配置传感器，例如，设置适合您应用需求的采样频率。
- 您可以检测平台上是否有对应传感器。
- 传感器读数具有高精度时间戳，可以更好地与应用程序中的其他活动同步。
- 传感器数据模型和坐标系统明确定义，允许浏览器供应商实现可互操作的解决方案。
- Generic Sensor 的基础接口没有绑定到DOM（Navigator和Window对象），为将来在Service Workers中使用相同的API或在Headless JS运行时实现Generic Sensor API（例如在嵌入式设备上）开辟了的机会。
- 与传统的传感器API相比，[安全性和隐私](#privacy-and-security)方面是Generic Sensor API的首要任务，并且提供了更好的安全级别。目前已经集成了Permissions API。
- 自动的[屏幕坐标同步](#synchronization-with-screen-coordinates)目前可于Accelerometer，Gyroscope，LinearAccelerationSensor，AbsoluteOrientationSensor，RelativeOrientationSensor和Magnetometer。

## Chrome中的Generic Sensor API {: #generic-sensor-api-in-chrome }

在撰写本文时，Chrome支持以下几种传感器。

**运动传感器（Motion sensors）：**

- 加速度计（Accelerometer）
- 陀螺仪（Gyroscope）
- 线性加速度传感器（LinearAccelerationSensor）
- 绝对方向传感器（AbsoluteOrientationSensor）
- 相对方向传感器（RelativeOrientationSensor）

**环境传感器（Environmental sensors）：**

- 环境光传感器（AmbientLightSensor）
- 磁力计（Magnetometer）

您可以通过打开功能标志来启用通用传感器API以用于开发目的。访问 [chrome://flags/#enable-generic-sensor](chrome://flags/#enable-generic-sensor)启用运动传感器或访问[chrome://flags/#enable-generic-sensor-extra-classes](chrome://flags/#enable-generic-sensor-extra-classes)启用环境传感器。重新启动Chrome，您就可以开始体验Generic Sensor API。

<iframe width="100%" height="320" src="https://www.chromestatus.com/feature/5698781827825664?embed" style="border: 1px solid #CCC" allowfullscreen>
</iframe>

如需了解浏览器实现状态的更多信息，请访问[chromestatus.com](https://www.chromestatus.com/features/5698781827825664?embed)。

## 运动传感器原始试验版（Origin Trials） {: #motion-sensors-origin-trials }

为了获得宝贵的反馈意见，Generic Sensor API从Chrome 63开始作为[原始试用版](https://bit.ly/OriginTrials)。您需要[请求令牌](http://bit.ly/OriginTrialSignup)，以便该功能可以自动启用在您的Chrome上，而无需启用Chrome标志。

## 这些传感器是什么？我们如何使用它们？{: #what-are-sensors-how-to-use-them }

传感器是一个相当特殊的领域，可能需要简单介绍。如果您熟悉传感器，则可以直接跳到[开始编码章节](#lets-code)。否则，我们来详细了解每个支持的传感器。

### 加速度和线性加速度 {: #acceleration-and-linear-accelerometer-sensor }

<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2017/09/sensors/accelerometer.gif" alt="Accelerometer sensor measurements">
    <figcaption><b>图1</b>: 测量加速度传感器</figcaption>
  </figure>
</div>

[加速度](https://www.w3.org/TR/accelerometer/#intro)传感器测量三个轴（X，Y和Z）上承载传感器的设备的加速度。这个传感器是一个惯性传感器，这意味着当设备处于线性自由落体时，总测得的加速度为0m/s<sup>2</sup>，当一个设备平躺在桌子上时，向上方向（Z轴）的加速度将会等于地球的重力，即g≈+9.8m/s<sup>2</sup>，因为它测量的是桌子向上推动设备的力。如果将设备推向右侧，则X轴上的加速度为正，如果设备从右侧加速至左侧，则加速度为负。

<div class="clearfix"></div>

加速度计可用于如下步骤：步数计算，动作感应或简单的设备定向。通常情况下，加速度计测量结合其他来源的数据，以创建融合传感器，如方向传感器。

[线性加速度传感器](https://w3c.github.io/accelerometer/#linearaccelerationsensor-interface)测量装置传感器的设备的加速度，不包括的重力的作用。例如，当设备处于静止状态时，传感器在三个轴上测量的加速度≈0m/<sup>2</sup>。

### 陀螺仪 {: #gyroscope-sensor }

<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2017/09/sensors/gyroscope.gif" alt="Gyroscope sensor measurements">
    <figcaption><b>图2</b>: 测量陀螺仪传感器</figcaption>
  </figure>
</div>

[陀螺仪](https://w3c.github.io/gyroscope/#intro)传感器测量设备在偏转，倾斜时相对于X，Y和Z轴的角速度（rad/s）。大多数消费类设备都有机械（[MEMS](https://en.wikipedia.org/wiki/Microelectromechanical_systems)）陀螺仪，它们是基于[惯性科里奥利力](https://en.wikipedia.org/wiki/Coriolis_force)来测量旋转速率的惯性传感器。MEMS陀螺仪容易产生漂移，这是由传感器的重力灵敏度引起的，这会使传感器的内部机械系统变形。陀螺仪以相对高的频率振荡，例如10kHz，因此与其他传感器相比可能消耗更多的功率。

<div class="clearfix"></div>

### 方向传感器 {: #orientation-sensors }

<div class="attempt-right">
  <figure>
    <img src="/web/updates/images/2017/09/sensors/orientation.gif" alt="AbsoluteOrientation sensor measurements">
    <figcaption><b>图3</b>: 测量绝对方向传感器</figcaption>
  </figure>
</div>

[绝对方向传感器](https://w3c.github.io/orientation-sensor/#orientationsensor-interface)是一种的融合传感器，测量设备相对于地球坐标系的旋转，而[相对方向传感器](https://w3c.github.io/orientation-sensor/#relativeorientationsensor-interface)则提供设备相对于固定的参考坐标系统的旋转数据。

所有现代3D JavaScript框架均支持四元数和旋转矩阵来表示旋转。但是，如果你直接使用WebGL，[方向传感器](https://w3c.github.io/orientation-sensor/#orientationsensor-populatematrix)接口提供了便捷的方法用于WebGL兼容的旋转矩阵。这里有几个代码示例：

<div class="clearfix"></div>

**[three.js](https://threejs.org/docs/index.html#api/core/Object3D.quaternion)**

```
let torusGeometry = new THREE.TorusGeometry(7, 1.6, 4, 3, 6.3);
let material = new THREE.MeshBasicMaterial({ color: 0x0071C5 });
let torus = new THREE.Mesh(torusGeometry, material);
scene.add(torus);

// 使用四元数更新网格旋转。
const sensorAbs = new AbsoluteOrientationSensor();
sensorAbs.onreading = () => torus.quaternion.fromArray(sensorAbs.quaternion);
sensorAbs.start();

//使用旋转矩阵更新网格旋转。
const sensorRel = new RelativeOrientationSensor();
let rotationMatrix = new Float32Array(16);
sensor_rel.onreading = () => {
    sensorRel.populateMatrix(rotationMatrix);
    torus.matrix.fromArray(rotationMatrix);
}
sensorRel.start();
```

**[BABYLON](http://doc.babylonjs.com/classes/3.0/abstractmesh#rotationquaternion-quaternion-classes-3-0-quaternion-)**

```
const mesh = new BABYLON.Mesh.CreateCylinder("mesh", 0.9, 0.3, 0.6, 9, 1, scene);
const sensorRel = new RelativeOrientationSensor({frequency: 30});
sensorRel.onreading = () => mesh.rotationQuaternion.FromArray(sensorRel.quaternion);
sensorRel.start();
```

**[WebGL](https://www.khronos.org/registry/webgl/specs/latest/2.0/)**

```
// 当有新的读数时，初始化传感器和更新模型矩阵。
let modMatrix = new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
const sensorAbs = new AbsoluteOrientationSensor({frequency: 60});
sensorAbs.onreading = () => sensorAbs.populateMatrix(modMatrix);
sensorAbs.start();

// Somewhere in rendering code, update vertex shader attribute for the model
gl.uniformMatrix4fv(modMatrixAttr, false, modMatrix);
```

方向传感器支持各种用例，如沉浸式游戏，AR和VR。

如果你想了解运动传感器的更多信息，比如高级用例和需求说明等，请参考[运动传感器解释](https://www.w3.org/TR/motion-sensors/)文档。

## 屏幕坐标系同步 {: #synchronization-with-screen-coordinates }

默认情况下，[空间传感器](https://w3c.github.io/sensors/#spatial-sensor)的读数将在绑定到设备的本地坐标系中解析，并且不考虑屏幕方向。

<figure>
  <img src="/web/updates/images/2017/09/sensors/device_coordinate_system.png" alt="Device coordinate system">
  <figcaption><b>图4</b>: 设备坐标系</figcaption>
</figure>

但是，许多使用案例（如游戏，AR和VR）都需要传感器读数在绑定于屏幕方向的坐标系中解析。

<figure>
  <img src="/web/updates/images/2017/09/sensors/screen_coordinate_system.png" alt="Screen coordinate system">
  <figcaption><b>图5</b>: 屏幕坐标系</figcaption>
</figure>

以前，传感器读数重新映射到屏幕坐标必须在JavaScript中实现。这种方法效率低下，并且也极大地增加了Web应用程序代码的复杂性：Web应用程序必须监视屏幕方向更改并执行传感器读数的坐标转换，这对欧拉角或四元数来说并不是简单的事情。

Generic Sensor API提供了更简单可靠的解决方案！本地坐标系对于所有定义的空间传感器类都是可配置的：Accelerometer、Gyroscope、LinearAccelerationSensor、AbsoluteOrientationSensor、RelativeOrientationSensor和Magnetometer。通过将`referenceFrame`选项传递给传感器对象构造函数，用户可以定义返回的读数是否将在[设备](https://w3c.github.io/accelerometer/#device-coordinate-system)或[屏幕](https://w3c.github.io/accelerometer/#screen-coordinate-system)坐标中解析。

```
// 当有新的读数时，初始化传感器和更新模型矩阵。
// 或者,可以写成 RelativeOrientationSensor({referenceFrame: "device"}).
const sensorRelDevice = new RelativeOrientationSensor();

// 传感器读数在屏幕坐标系统中得到解析。不需要手动重新映射！
const sensorRelScreen = new RelativeOrientationSensor({referenceFrame: "screen"});
```

Note: 该`referenceFrame`选项支持在Chrome 66或更高版本。

## 开始编码! {: #lets-code }

Generic Sensor API非常容易上手！Sensor接口提供了[`start()`](https://w3c.github.io/sensors/#sensor-start)和[`stop()`](https://w3c.github.io/sensors/#sensor-stop)方法来控制传感器状态和事件处理用于接收传感器状态，错误和新的可用的读数的通知。具体的传感器类通常将其特定的读取属性添加到基类里。

### 开发环境

在开发过程中，您可以通过`localhost`去使用Sensor接口，最简单的方法是使用[Web Server for Chrome](https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb)来为您的Web应用程序提供服务。如果您是在移动设备上开发，需要为本地服务器设置[端口转发](/web/tools/chrome-devtools/remote-debugging/local-server)，然后你就可以开始编码了！

当您的代码准备好后，将其部署在支持HTTPS的服务器上。[GitHub Pages](https://pages.github.com/)可以提供HTTPS服务，将是您分享Demo的好地方。

Note: 不要忘记在Chrome中启用[Generic Sensor API](#generic-sensor-api-in-chrome)。

### 3D模型旋转

在下列简单的例子中，我们使用绝对方向传感器的数据来修改3D模型的旋转四元数。代码中的`model`是three.js的[`Object3D`](https://threejs.org/docs/index.html#api/core/Object3D)类的一个实例，具有[`quaternion`](https://threejs.org/docs/index.html#api/core/Object3D.quaternion)属性。[手机定向](https://github.com/intel/generic-sensor-demos/tree/master/orientation-phone)demo中的以下代码片段解释了绝对定位传感器如何用于旋转3D模型。

```
function initSensor() {
    sensor = new AbsoluteOrientationSensor({frequency: 60});
    sensor.onreading = () => model.quaternion.fromArray(sensor.quaternion);
    sensor.onerror = event => {
        if (event.error.name == 'NotReadableError') {
            console.log("Sensor is not available.");
        }
    }
    sensor.start();
}
```

设备的方向将反映在`model`的3D旋转的WebGL场景内。

<figure align="center">
  <img src="/web/updates/images/2017/09/sensors/orientation_phone.png" alt="Sensor updates 3D model's orientation">
  <figcaption><b>图6</b>: 传感器更新3D模型的方向</figcaption>
</figure>

### Punchmeter

下面的代码片段是从[punchmeter demo](https://github.com/intel/generic-sensor-demos/tree/master/punchmeter)提取出来的，解释了如何使用线性加速度传感器来计算设备在初始化为静止状态的最大速度。

```
this.maxSpeed = 0;
this.vx = 0;
this.ax = 0;
this.t = 0;

function onreading() {
    let dt = (this.accel.timestamp - this.t) * 0.001; // In seconds.
    this.vx += (this.accel.x + this.ax) / 2 * dt;

    let speed = Math.abs(this.vx);

    if (this.maxSpeed < speed) {
        this.maxSpeed = speed;
    }

    this.t = this.accel.timestamp;
    this.ax = this.accel.x;
}

....

this.accel.addEventListener('reading', onreading);
```

当前速度计算为近似加速度函数的积分。

<figure align="center">
  <img src="/web/updates/images/2017/09/sensors/punchmeter.png" alt="Demo web application for punch speed measurement">
  <figcaption><b>图7</b>: 测量冲压速度</figcaption>
</figure>

## 隐私和安全 {: #privacy-and-security }

传感器读数是敏感数据，可能受到来自恶意网页的各种攻击。Chrome对Generic Sensor API的实现做了一些限制，以减轻潜在的安全和隐私风险。打算使用Generic Sensor API​的开发人员必须考虑到这些限制，下面让我们简单地列出它们。

### 只允许运行在HTTPS

由于Generic Sensor API是一项强大的功能，因此Chrome只允许在安全的情况下使用。实际上，这意味着要使用Generic Sensor API，您需要通过HTTPS访问您的页面。在开发过程中，您可以通过http://localhost进行此操作，但对于最终产品，您需要在服务器上部署HTTPS，可以参考这个[HTTPS文章](/web/fundamentals/security/)。

### Feature Policy集成

Generic Sensor API集成了[Feature Policy](https://w3c.github.io/sensors/#feature-policy-api)用于控制在frame上访问传感器数据。

默认情况下，`Sensor`对象只允许在主frame或同一个域的子frame内创建，从而防止未经授权的跨域iframe读取传感器数据。您还可以通过明确地启用或禁用相应的[策略控制功能](https://wicg.github.io/feature-policy/#policy-controlled-feature)来修改此默认行为。

下面的代码片段说明了如何授予加速度计数据访问跨域iframe的权限，这意味着`Accelerometer`或`LinearAccelerationSensor`对象可以在跨域iframe里创建。

`<iframe src="https://third-party.com" allow="accelerometer"/>`

Note: Feature Policy集成在Chrome 65或更高版本中。在早期版本的Chrome中，`Sensor`对象只能在主frame内创建。

### 传感器读数传送可以被暂停

传感器读数只能通过可见网页访问，即用户实际上正在与之交互时。而且，如果用户聚焦到跨域子frame传感器读数传送将会在父页面上被暂停，以防止在跨域子frame中的第三方软件窃取到用户信息。

## 下一步是什么？ {: #whats-next }

在近期将有一些已有的Sensor类被实现，例如[距离传感器（Proximity）](https://w3c.github.io/proximity/)和[重力传感器（GravitySensor）](https://w3c.github.io/accelerometer/#gravitysensor-interface)。而且，由于Generic Sensor框架具有很强的可扩展性，我们可以预见更多代表各种传感器类型的新类的出现。

未来工作的另一个重要领域是改进Generic Sensor API本身，Generic Sensor API规范目前是一个草案，意味着还有时间进行修复并为开发人员提供所需的新功能。

## 您可以帮忙！

传感器规范文档正在积极开发中，我们需要您的反馈以确保项目朝着正确的方向发展。您可以尝试这个API通过在Chrome中启用运行时[标志](#generic-sensor-api-in-chrome)或在启动时参与[原始试验（origin trial）](#motion-sensors-origin-trials)并分享您的体验。让我们知道还有哪些好的功能可以加进来，或者现有的API还有哪些可以改进的地方。

请填写[调查表](https://docs.google.com/forms/d/e/1FAIpQLSdGKPzubbOaDSgjpre9Pxw6Hr1xwYIwgZEsuUOmbs6JPwvcBQ/viewform)。也可随时提交[规范问题](https://github.com/w3c/sensors/issues/new)和Chrome实现的[bugs](https://bugs.chromium.org/p/chromium/issues/entry)。

## 资源

- Demo项目: [https://intel.github.io/generic-sensor-demos/](https://intel.github.io/generic-sensor-demos/)
- Generic Sensor API规范文档: [https://w3c.github.io/sensors/](https://w3c.github.io/sensors/)
- 规范问题: [https://github.com/w3c/sensors/issues](https://github.com/w3c/sensors/issues)
- W3C工作组邮件列表: [public-device-apis@w3.org](mailto:public-device-apis@w3.org)
- Chrome功能状态: [https://www.chromestatus.com/feature/5698781827825664](https://www.chromestatus.com/feature/5698781827825664)
- 实现Bugs: [http://crbug.com?q=component:Blink>Sensor](http://crbug.com?q=component:Blink%3ESensor)
- Google Sensors-dev小组: [https://groups.google.com/a/chromium.org/forum/#!forum/sensors-dev](https://groups.google.com/a/chromium.org/forum/#!forum/sensors-dev)

Translated by {% include "web/_shared/contributors/wmlin.html" %}

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}
