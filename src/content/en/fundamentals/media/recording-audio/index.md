project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: Most browsers can get access to the user's microphone.

{# wf_updated_on: 2017-07-24 #}
{# wf_published_on: 2016-08-23 #}
{# wf_blink_components: Blink>GetUserMedia #}

# Recording Audio from the User {: .page-title }

{% include "web/_shared/contributors/paulkinlan.html" %}

Many browsers now have the ability to access video and audio input from the
user. However, depending on the browser it might be a full dynamic and inline
experience, or it could be delegated to another app on the user's device.

## Start simple and progressively

The easiest thing to do is simply ask the user for a pre-recorded
file. Do this by creating a simple file input element and adding
an `accept` filter that indicates we can only accept audio files and ideally we
will get them directly from the microphone.

    <input type="file" accept="audio/*" capture="microphone">

This method works on all platforms. On desktop it will prompt the user to
upload a file from the file system (ignoring `capture="microphone"`). In Safari
on iOS it will open up the microphone app, allowing you to record audio and
then send it back to the web page; on Android it will give the user the
choice of which app to use record the audio in before sending it back to the web
page.

Once the user has finished recording and they are back in the website, you
need to somehow get ahold of the file data. You can get quick access by
attaching an `onchange` event to the input element and then reading
the `files` property of the event object.

    <input type="file" accept="audio/*" capture="microphone" id="recorder">
    <audio id="player" controls></audio>
    <script>
      var recorder = document.getElementById('recorder');
      var player = document.getElementById('player')'

      recorder.addEventListener('change', function(e) {
        var file = e.target.files[0];
        // Do something with the audio file.
        player.src =  URL.createObjectURL(file);
      });
    </script>

Once you have access to the file you can do anything you want with it. For
example, you can:

* Attach it directly to an `<audio>` element so that you can play it
* Download it to the user's device
* Upload it to a server by attaching to an `XMLHttpRequest`
* Pass it through the Web Audio API and apply filters on to it

Whilst using the input element method of getting access to audio data is
ubiquitous, it is the least appealing option. We really want to get access to
the microphone and provide a nice experience directly in the page.

## Access the microphone interactively

Modern browsers can have a direct line to the microphone allowing us to build
experiences that are fully integrated with the web page and the user will never
leave the browser.

### Acquire access to the microphone

We can directly access the Microphone by using an API in the WebRTC
specification called `getUserMedia()`. `getUserMedia()` will prompt the user for
access to their connected microphones and cameras.

If successful the API will return a `Stream` that will contain the data from
either the camera or the microphone, and we can then either attach it to
an `<audio>` element, attach it to an Web Audio `AudioContext`, or save it using
the `MediaRecorder` API.

To get data from the microphone we just set `audio: true` in the constraints
object that is passed to the `getUserMedia()` API


    <audio id="player" controls></audio>
    <script>
      var player = document.getElementById('player');

      var handleSuccess = function(stream) {
        if (window.URL) {
          player.src = window.URL.createObjectURL(stream);
        } else {
          player.src = stream;
        }
      };

      navigator.mediaDevices.getUserMedia({ audio: true, video: false })
          .then(handleSuccess)
    </script>

By itself, this isn't that useful. All we can do is take the audio data and play
it back.

### Access the raw data from the microphone

To access the raw data from the microphone we have to take the stream created by
`getUserMedia()` and then use the Web Audio API to process the data. The
Web Audio API is a simple API that takes input sources and connects those
sources to nodes which can process the audio data (adjust Gain etc) and
ultimately to a speaker so that the user can hear it.

One of the nodes that you can connect is a `ScriptProcessorNode`. This node will
emit an `onaudioprocess` event every time the audio buffer is filled and you
need to process it. At this point you could save the data into your own buffer
and save it for later use.

<pre class="prettyprint">
&lt;script>
  var handleSuccess = function(stream) {
    <strong>var context = new AudioContext();
    var input = context.createMediaStreamSource(stream)
    var processor = context.createScriptProcessor(1024,1,1);

    source.connect(processor);
    processor.connect(context.destination);

    processor.onaudioprocess = function(e){
      // Do something with the data, i.e Convert this to WAV
      console.log(e.inputBuffer);
    };</strong>
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess)
&lt;/script>
</pre>

The data that is held in the buffers is the raw data from the microphone and
you have a number of options with what you can do with the data:

* Upload it straight to the server
* Store it locally
* Convert to a dedicated file format, such as WAV, and then save it to your
  servers or locally

### Save the data from the microphone

The easiest way to save the data from the microphone is to use the
`MediaRecorder` API.

The `MediaRecorder` API will take the stream created by `getUserMedia` and then
progressively save the data that is on the stream in to you preferred
destination.

<pre class="prettyprint">
&lt;a id="download">Download</a>
&lt;button id="stop">Stop</button>
&lt;script>
  let shouldStop = false;
  let stopped = false;
  const downloadLink = document.getElementById('download');
  const stopButton = document.getElementById('stop');

  stopButton.addEventListener('click', function() {
    shouldStop = true;
  })

  var handleSuccess = function(stream) {
    const options = {mimeType: 'video/webm;codecs=vp9'};
    const recordedChunks = [];
    <strong>const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener('dataavailable', function(e) {
      if (e.data.size > 0) {
        recordedChunks.push(e.data);
      }

      if(shouldStop === true && stopped === false) {
        mediaRecorder.stop();
        stopped = true;
      }
    });

    mediaRecorder.addEventListener('stop', function() {
      downloadLink.href = URL.createObjectURL(new Blob(recordedChunks));
      downloadLink.download = 'acetest.wav';
    });

    mediaRecorder.start();</strong>
  };

  navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);

&lt;/script>
</pre>

In our case we are saving the data directly into an array that we can later turn
in to a `Blob` which can be then used to save to our Web Server or directly in
storage on the user's device.

## Ask permission to use microphone responsibly

If the user has not previously granted your site access to the microphone then
the instant that you call `getUserMedia` the browser will prompt the user to
grant your site permission to the microphone.

User's hate getting prompted for access to powerful devices on their machine and
they will frequently block the request, or they will ignore it if they don't
understand the context of which the prompt has been created. It is best practice
to only ask to access the microphone when first needed. Once the user has
granted access they won't be asked again, however, if they reject access,
you can't get access again to ask the user for permission.

Warning: Asking for access to the microphone on page load will result in most of your users rejecting access to the mic.

### Use the permissions API to check if you already have access

The `getUserMedia` API provides you with no knowledge of if you already have
access to the microphone. This presents you with a problem, to provide a nice UI
to get the user to grant you access to the microphone, you have to ask for
access to microphone.

This can be solved in some browsers by using the Permission API. The
`navigator.permission` API allows you to query the state of the ability to
access specific API's without having to prompt again.

To query if you have access to the user's microphone you can pass in
`{name: 'microphone'}` into the query method and it will return either:

*  `granted` &mdash; the user has previously given you access to the microphone;
*  `prompt` &mdash; the user has not given you access and will be prompted when
    you call `getUserMedia`;
*  `denied` &mdash; the system or the user has explicitly blocked access to the
    microphone and you won't be able to get access to it.

And you can now check quickly check to see if you need to alter your user
interface to accommodate the actions that the user needs to take.

    navigator.permissions.query({name:'microphone'}).then(function(result) {
      if (result.state == 'granted') {

      } else if (result.state == 'prompt') {

      } else if (result.state == 'denied') {

      }
      result.onchange = function() {

      };
    });
