project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: This article is about me playing with the experimental WebGPU API and sharing my journey with web developers interested in performing data-parallel computations using the GPU.

{# wf_updated_on: 2019-12-13 #}
{# wf_published_on: 2019-08-28 #}
{# wf_tags: news,gpu,canvas,graphics #}
{# wf_blink_components: Blink>WebGPU #}
{# wf_featured_image: /web/updates/images/2019/08/matrix-execution.jpg #}
{# wf_featured_snippet: This article is about me playing with the experimental WebGPU API and sharing my journey with web developers interested in performing data-parallel computations using the GPU. #}

<style>figcaption { text-align: center; margin-bottom: 32px; }</style>

# Get started with GPU Compute on the Web {: .page-title }

{% include "web/_shared/contributors/beaufortfrancois.html" %}

_This article is about me playing with the experimental WebGPU API and sharing
my journey with web developers interested in performing data-parallel
computations using the GPU._

## Background

As you may already know, the Graphic Processing Unit (GPU) is an electronic
subsystem within a computer that was originally specialized for processing
graphics. However, in the past 10 years, it has evolved towards a more flexible
architecture allowing developers to implement many types of algorithms, not just
render 3D graphics, while taking advantage of the unique architecture of the
GPU. These capabilities are referred to as GPU Compute, and using a GPU as a
coprocessor for general-purpose scientific computing is called general-purpose
GPU (GPGPU) programming.

GPU Compute has contributed significantly to the recent machine learning boom,
as convolution neural networks and other models can take advantage of the
architecture to run more efficiently on GPUs. With the current Web Platform
lacking in GPU Compute capabilities, the W3C’s “GPU for the Web” Community Group
is designing an API to expose the modern GPU APIs that are available on most
current devices. This API is called [WebGPU].

WebGPU is a low-level API, like WebGL. It is very powerful and quite verbose, as
you’ll see. But that’s OK. What we’re looking for is performance.

In this article, I’m going to focus on the GPU Compute part of WebGPU and, to be
honest, I'm just scratching the surface, so that you can start playing on your
own. I will be diving deeper and covering WebGPU rendering (canvas, texture,
etc.) in forthcoming articles.

Dogfood: WebGPU is available for now in Chrome 78 for macOS behind an
experimental flag. You can enable it at `chrome://flags/#enable-unsafe-webgpu`. The
API is constantly changing and currently unsafe. As GPU sandboxing isn't
implemented yet for the WebGPU API, it is possible to read GPU data for other
processes! Don’t browse the web with it enabled.

## Access the GPU

Accessing the GPU is easy in WebGPU. Calling `navigator.gpu.requestAdapter()`
returns a JavaScript promise that will asynchronously resolve with a GPU
adapter. Think of this adapter as the graphics card. It can either be integrated
(on the same chip as the CPU) or discrete (usually a PCIe card that is more
performant but uses more power).

Once you have the GPU adapter, call `adapter.requestDevice()` to get a promise
that will resolve with a GPU device you’ll use to do some GPU computation.

```js
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();
```

Both functions take options that allow you to be specific about the kind of
adapter (power preference) and device (extensions, limits) you want. For the
sake of simplicity, we’ll use the default options in this article.

## Write buffer memory

Let’s see how to use JavaScript to write data to memory for the GPU. This
process isn’t straightforward because of the sandboxing model used in modern web
browsers.

The example below shows you how to write four bytes to buffer memory accessible
from the GPU. It calls `device.createBufferMapped()` which takes the size of
the buffer and its usage. Even though the usage flag `GPUBufferUsage.MAP_WRITE`
is not required for this specific call, let's be explicit that we want to write
to this buffer. It results in a GPU buffer object and its associated raw binary
data buffer.

Writing bytes is familiar if you’ve already played with `ArrayBuffer`; use a
`TypedArray` and copy the values into it.

```js
// Get a GPU buffer in a mapped state and an arrayBuffer for writing.
const [gpuBuffer, arrayBuffer] = device.createBufferMapped({
  size: 4,
  usage: GPUBufferUsage.MAP_WRITE
});

// Write bytes to buffer.
new Uint8Array(arrayBuffer).set([0, 1, 2, 3]);
```

At this point, the GPU buffer is mapped, meaning it is owned by the CPU, and
it’s accessible in read/write from JavaScript. So that the GPU can access it, it
has to be unmapped which is as simple as calling `gpuBuffer.unmap()`.

The concept of mapped/unmapped is needed to prevent race conditions where GPU
and CPU access memory at the same time.

## Read buffer memory

Now let’s see how to copy a GPU buffer to another GPU buffer and read it back.

Since we’re writing in the first GPU buffer and we want to copy it to a second
GPU buffer, a new usage flag `GPUBufferUsage.COPY_SRC` is required. The second
GPU buffer is created in an unmapped state with the synchronous
`device.createBuffer()`. Its usage flag is `GPUBufferUsage.COPY_DST |
GPUBufferUsage.MAP_READ` as it will be used as the destination of the first GPU
buffer and read in JavaScript once GPU copy commands have been executed.

```js
// Get a GPU buffer in a mapped state and an arrayBuffer for writing.
const [gpuWriteBuffer, arrayBuffer] = device.createBufferMapped({
  size: 4,
  usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
});

// Write bytes to buffer.
new Uint8Array(arrayBuffer).set([0, 1, 2, 3]);

// Unmap buffer so that it can be used later for copy.
gpuWriteBuffer.unmap();

// Get a GPU buffer for reading in an unmapped state.
const gpuReadBuffer = device.createBuffer({
  size: 4,
  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
});
```

Because the GPU is an independent coprocessor,  all GPU commands are executed
asynchronously. This is why there is a list of GPU commands built up and sent in
batches when needed. In WebGPU, the GPU command encoder returned by
`device.createCommandEncoder()`is the JavaScript object that builds a batch of
“buffered” commands that will be sent to the GPU at some point. The methods on
`GPUBuffer`, on the other hand, are “unbuffered”, meaning they execute atomically
at the time they are called.

Once you have the GPU command encoder, call `copyEncoder.copyBufferToBuffer()`
as shown below to add this command to the command queue for later execution.
Finally, finish encoding commands by calling `copyEncoder.finish()` and submit
those to the GPU device command queue. The queue is responsible for handling
submissions done via `device.defaultQueue.submit()` with the GPU commands as
arguments. This will atomically execute all the commands stored in the array in
order.

```js
// Encode commands for copying buffer to buffer.
const copyEncoder = device.createCommandEncoder();
copyEncoder.copyBufferToBuffer(
  gpuWriteBuffer /* source buffer */,
  0 /* source offset */,
  gpuReadBuffer /* destination buffer */,
  0 /* destination offset */,
  4 /* size */
);

// Submit copy commands.
const copyCommands = copyEncoder.finish();
device.defaultQueue.submit([copyCommands]);
```

At this point, GPU queue commands have been sent, but not necessarily executed.
To read the second GPU buffer, call `gpuReadBuffer.mapReadAsync()`. It returns a
promise that will resolve with an `ArrayBuffer` containing the same values as
the first GPU buffer once all queued GPU commands have been executed.

```js
// Read buffer.
const copyArrayBuffer = await gpuReadBuffer.mapReadAsync();
console.log(new Uint8Array(copyArrayBuffer));
```

You can [try out this sample].

In short, here’s what you need to remember regarding buffer memory operations:

- GPU buffers have to be unmapped to be used in device queue submission.
- When mapped, GPU buffers can be read and written in JavaScript.
- GPU buffers are mapped when `mapReadAsync()`, `mapWriteAsync()`, and
  `createBufferMapped()` are called.

## Shader programming

Programs running on the GPU that only perform computations (and don't draw
triangles) are called compute shaders. They are executed in parallel by hundreds
of GPU cores (which are smaller than CPU cores) that operate together to crunch
data. Their input and output are buffers in WebGPU.

To illustrate the use of compute shaders in WebGPU, we’ll play with matrix
multiplication, a common algorithm in machine learning illustrated below.

<figure>
  <img src="/web/updates/images/2019/08/matrix-multiplication-diagram.jpg"
      alt="Matrix multiplication diagram">
  <figcaption>
    <b>Figure 1.</b>
    Matrix multiplication diagram
  </figcaption>
</figure>

In short, here’s what we’re going to do:

1. Create three GPU buffers (two for the matrices to multiply and one for the
  result matrix)
2. Describe input and output for the compute shader
3. Compile the compute shader code
4. Set up a compute pipeline
5. Submit in batch the encoded commands to the GPU
6. Read the result matrix GPU buffer

### GPU Buffers creation

For the sake of simplicity, matrices will be represented as a list of floating
point numbers. The first element is the number of rows, the second element the
number of columns, and the rest is the actual numbers of the matrix.

<figure>
  <img src="/web/updates/images/2019/08/matrix-representation.jpg"
      alt="Simple representation of a matrix in JavaScript and it's equivalent in mathematical notation">
  <figcaption>
    <b>Figure 2.</b>
    Simple representation of a matrix in JavaScript and it's equivalent in mathematical notation
  </figcaption>
</figure>

The three GPU buffers are storage buffers as we need to store and retrieve data in
the compute shader. This explains why the GPU buffer usage flags include
`GPUBufferUsage.STORAGE` for all of them. The result matrix usage flag also has
`GPUBufferUsage.COPY_SRC` because it will be copied to another buffer for
reading once all GPU queue commands have all been executed.

```js
const adapter = await navigator.gpu.requestAdapter();
const device = await adapter.requestDevice();


// First Matrix

const firstMatrix = new Float32Array([
  2 /* rows */, 4 /* columns */,
  1, 2, 3, 4,
  5, 6, 7, 8
]);

const [gpuBufferFirstMatrix, arrayBufferFirstMatrix] = device.createBufferMapped({
  size: firstMatrix.byteLength,
  usage: GPUBufferUsage.STORAGE,
});
new Float32Array(arrayBufferFirstMatrix).set(firstMatrix);
gpuBufferFirstMatrix.unmap();


// Second Matrix

const secondMatrix = new Float32Array([
  4 /* rows */, 2 /* columns */,
  1, 2,
  3, 4,
  5, 6,
  7, 8
]);

const [gpuBufferSecondMatrix, arrayBufferSecondMatrix] = device.createBufferMapped({
  size: secondMatrix.byteLength,
  usage: GPUBufferUsage.STORAGE,
});
new Float32Array(arrayBufferSecondMatrix).set(secondMatrix);
gpuBufferSecondMatrix.unmap();


// Result Matrix

const resultMatrixBufferSize = Float32Array.BYTES_PER_ELEMENT * (2 + firstMatrix[0] * secondMatrix[1]);
const resultMatrixBuffer = device.createBuffer({
  size: resultMatrixBufferSize,
  usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_SRC
});
```

### Bind group layout and bind group

Concepts of bind group layout and bind group are specific to WebGPU. A bind
group layout defines the input/output interface expected by a shader, while a
bind group represents the actual input/output data for a shader.

In the example below, the bind group layout expects two readonly storage buffers at
numbered bindings `0`, `1`, and a storage buffer at `2` for the compute shader.
The bind group on the other hand, defined for this bind group layout, associates
GPU buffers to the bindings: `gpuBufferFirstMatrix` to the binding `0`,
`gpuBufferSecondMatrix` to the binding `1`, and `resultMatrixBuffer` to the
binding `2`.

```js
const bindGroupLayout = device.createBindGroupLayout({
  bindings: [
    {
      binding: 0,
      visibility: GPUShaderStage.COMPUTE,
      type: "readonly-storage-buffer"
    },
    {
      binding: 1,
      visibility: GPUShaderStage.COMPUTE,
      type: "readonly-storage-buffer"
    },
    {
      binding: 2,
      visibility: GPUShaderStage.COMPUTE,
      type: "storage-buffer"
    }
  ]
});

const bindGroup = device.createBindGroup({
  layout: bindGroupLayout,
  bindings: [
    {
      binding: 0,
      resource: {
        buffer: gpuBufferFirstMatrix
      }
    },
    {
      binding: 1,
      resource: {
        buffer: gpuBufferSecondMatrix
      }
    },
    {
      binding: 2,
      resource: {
        buffer: resultMatrixBuffer
      }
    }
  ]
});
```

### Compute shader code

The compute shader code for multiplying matrices is written in GLSL, a
high-level shading language used in WebGL, which has a syntax based on the C
programming language. Without going into detail, you should find below the three
storage buffers marked with the keyword `buffer`. The program will use
`firstMatrix` and `secondMatrix` as inputs (readonly) and `resultMatrix` as its
output.

Note that each storage buffer has a `binding` qualifier used that corresponds to
the same index defined in bind group layouts and bind groups declared above.

```js
const computeShaderCode = `#version 450

  layout(std430, set = 0, binding = 0) readonly buffer FirstMatrix {
      vec2 size;
      float numbers[];
  } firstMatrix;

  layout(std430, set = 0, binding = 1) readonly buffer SecondMatrix {
      vec2 size;
      float numbers[];
  } secondMatrix;

  layout(std430, set = 0, binding = 2) buffer ResultMatrix {
      vec2 size;
      float numbers[];
  } resultMatrix;

  void main() {
    resultMatrix.size = vec2(firstMatrix.size.x, secondMatrix.size.y);

    ivec2 resultCell = ivec2(gl_GlobalInvocationID.x, gl_GlobalInvocationID.y);
    float result = 0.0;
    for (int i = 0; i < firstMatrix.size.y; i++) {
      int a = i + resultCell.x * int(firstMatrix.size.y);
      int b = resultCell.y + i * int(secondMatrix.size.y);
      result += firstMatrix.numbers[a] * secondMatrix.numbers[b];
    }

    int index = resultCell.y + resultCell.x * int(secondMatrix.size.y);
    resultMatrix.numbers[index] = result;
  }
`;
```

### Pipeline setup

WebGPU in Chrome currently uses bytecode instead of raw GLSL code. This means we
have to compile `computeShaderCode` before running the compute shader. Luckily
for us, the [@webgpu/glslang] package allows us to compile `computeShaderCode`
in a format that WebGPU in Chrome accepts. This bytecode format is based on a
safe subset of [SPIR-V].

Note that the “GPU on the Web” W3C Community Group has still not decided at the
time of writing on the shading language for WebGPU.

```js
import glslangModule from 'https://unpkg.com/@webgpu/glslang@0.0.8/dist/web-devel/glslang.js';
```

The compute pipeline is the object that actually describes the compute operation
we're going to perform. Create it by calling `device.createComputePipeline()`.
It takes two arguments: the bind group layout we created earlier, and a compute
stage defining the entry point of our compute shader (the `main` GLSL function)
and the actual compute shader module compiled with `glslang.compileGLSL()`.

```js
const glslang = await glslangModule();

const computePipeline = device.createComputePipeline({
  layout: device.createPipelineLayout({
    bindGroupLayouts: [bindGroupLayout]
  }),
  computeStage: {
    module: device.createShaderModule({
      code: glslang.compileGLSL(computeShaderCode, "compute")
    }),
    entryPoint: "main"
  }
});
```

### Commands submission

After instantiating a bind group with our three GPU buffers and a compute
pipeline with a bind group layout, it is time to use them.

Let’s start a programmable compute pass encoder with
`commandEncoder.beginComputePass()`. We'll use this to encode GPU commands
that will perform the matrix multiplication. Set its pipeline with
`passEncoder.setPipeline(computePipeline)` and its bind group at index 0 with
`passEncoder.setBindGroup(0, bindGroup)`. The index 0 corresponds to the `set =
0` qualifier in the GLSL code.

Now, let’s talk about how this compute shader is going to run on the GPU. Our
goal is to execute this program in parallel for each cell of the result matrix,
step by step. For a result matrix of size 2 by 4 for instance, we’d call
`passEncoder.dispatch(2, 4)` to encode the command of execution. The first
argument “x” is the first dimension, the second one “y” is the second dimension,
and the latest one “z” is the third dimension that defaults to 1 as we don’t
need it here. In the GPU compute world, encoding a command to execute a kernel
function on a set of data is called dispatching.

<figure>
  <img src="/web/updates/images/2019/08/matrix-execution.jpg"
      alt="Execution in parallel for each result matrix cell">
  <figcaption>
    <b>Figure 3.</b>
    Execution in parallel for each result matrix cell
  </figcaption>
</figure>

In our code, “x” and “y” will be respectively the number of rows of the first
matrix and the number of columns of the second matrix. With that, we can now
dispatch a compute call with `passEncoder.dispatch(firstMatrix[0],
secondMatrix[1])`.

As seen in the drawing above, each shader will have access to a unique
`gl_GlobalInvocationID` object that will be used to know which result matrix
cell to compute.

```js
const commandEncoder = device.createCommandEncoder();

const passEncoder = commandEncoder.beginComputePass();
passEncoder.setPipeline(computePipeline);
passEncoder.setBindGroup(0, bindGroup);
passEncoder.dispatch(firstMatrix[0] /* x */, secondMatrix[1] /* y */);
passEncoder.endPass();
```

To end the compute pass encoder, call `passEncoder.endPass()`. Then, create a
GPU buffer to use as a destination to copy the result matrix buffer with
`copyBufferToBuffer`. Finally, finish encoding commands with
`copyEncoder.finish()` and submit those to the GPU device queue by calling
`device.defaultQueue.submit()` with the GPU commands.

```js
// Get a GPU buffer for reading in an unmapped state.
const gpuReadBuffer = device.createBuffer({
  size: resultMatrixBufferSize,
  usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ
});

// Encode commands for copying buffer to buffer.
commandEncoder.copyBufferToBuffer(
  resultMatrixBuffer /* source buffer */,
  0 /* source offset */,
  gpuReadBuffer /* destination buffer */,
  0 /* destination offset */,
  resultMatrixBufferSize /* size */
);

// Submit GPU commands.
const gpuCommands = commandEncoder.finish();
device.defaultQueue.submit([gpuCommands]);
```

### Read result matrix

Reading the result matrix is as easy as calling `gpuReadBuffer.mapReadAsync()`
and logging the `ArrayBuffer` returned by the resulting promise.

<figure>
  <img src="/web/updates/images/2019/08/matrix-multiplication-result.jpg"
      alt="Matrix multiplication result">
  <figcaption>
    <b>Figure 4.</b>
    Matrix multiplication result
  </figcaption>
</figure>

In our code, the result logged in DevTools JavaScript console is “2, 2, 50, 60,
114, 140”.

```js
// Read buffer.
const arrayBuffer = await gpuReadBuffer.mapReadAsync();
console.log(new Float32Array(arrayBuffer));
```

Congratulations! You made it. You can [play with the sample].

## One last trick

One way of making your code easier to read is to use the handy
`getBindGroupLayout` method of the compute pipeline to [infer the bind group
layout from the shader module]. This trick removes the need from creating a
custom bind group layout and specifying a pipeline layout in your compute
pipeline as you can see below.

An illustration of `getBindGroupLayout` for the previous sample is [available].

```
 const computePipeline = device.createComputePipeline({
-  layout: device.createPipelineLayout({
-    bindGroupLayouts: [bindGroupLayout]
-  }),
   computeStage: {
```

```
-// Bind group layout and bind group
- const bindGroupLayout = device.createBindGroupLayout({
-   bindings: [
-     {
-       binding: 0,
-       visibility: GPUShaderStage.COMPUTE,
-       type: "readonly-storage-buffer"
-     },
-     {
-       binding: 1,
-       visibility: GPUShaderStage.COMPUTE,
-       type: "readonly-storage-buffer"
-     },
-     {
-       binding: 2,
-       visibility: GPUShaderStage.COMPUTE,
-       type: "storage-buffer"
-     }
-   ]
- });
+// Bind group
  const bindGroup = device.createBindGroup({
-  layout: bindGroupLayout,
+  layout: computePipeline.getBindGroupLayout(0 /* index */),
   bindings: [
```

## Performance findings

So how does running matrix multiplication on a GPU compare to running it on a
CPU? To find out, I wrote the program just described for a CPU. And as you can
see in the graph below, using the full power of GPU seems like an obvious choice
when the size of the matrices is greater than 256 by 256.

<figure>
  <img src="/web/updates/images/2019/08/gpu-cpu-benchmark.jpg"
      alt="GPU vs CPU benchmark">
  <figcaption>
    <b>Figure 5.</b>
    GPU vs CPU benchmark
  </figcaption>
</figure>

This article was just the beginning of my journey exploring WebGPU. Expect more
articles soon featuring more deep dives in GPU Compute and on how rendering
(canvas, texture, sampler) works in WebGPU.

[WebGPU]: https://gpuweb.github.io/gpuweb/
[try out this sample]: https://glitch.com/edit/#!/gpu-compute-sample-1
[@webgpu/glslang]: https://www.npmjs.com/package/@webgpu/glslang
[SPIR-V]: https://www.khronos.org/spir/
[play with the sample]: https://glitch.com/edit/#!/gpu-compute-sample-2
[infer the bind group layout from the shader module]: https://github.com/gpuweb/gpuweb/issues/446
[available]: https://glitch.com/edit/#!/gpu-compute-sample-3

{% include "web/_shared/helpful.html" %}

{% include "web/_shared/rss-widget-updates.html" %}
