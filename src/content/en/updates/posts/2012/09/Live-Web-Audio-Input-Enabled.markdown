---
layout: updates/post
title: "Live Web Audio Input Enabled!"
published_on: 2012-09-19
updated_on: 2012-09-19
authors:
  - chriswilson
tags:
  - news
  - webaudio
  - multimedia
  - getusermedia
  - audio
---
<p>I'm really excited by a new feature that went in to yesterday's Chrome Canary build (23.0.1270.0) - the ability to get low-latency access to live audio from a microphone or other audio input on OSX!  (This has not yet been enabled on Windows - but don't worry, we're working on it!)</p>

<p>[UPDATE Oct 8, 2012: live audio input is now enabled for Windows, as long as the input and output device are using the same sample rate!]</p>

<p>To enable this, you need to go into <a href="chrome://flags/">chrome://flags/</a> and enable the "Web Audio Input" item near the bottom, and relaunch the browser; now you're ready to roll!  <b>Note: If you're using a microphone, you may need to use headphones for any output in order to avoid feedback.  If you are using a different audio source, such as a guitar or external audio feed, or there's no audio output from the demo, this may not be a problem.</b>  You can test out live audio input by checking out the spectrum of your input using the <a href="http://chromium.googlecode.com/svn/trunk/samples/audio/visualizer-live.html">live input visualizer</a>.</p>

<p>For those Web Audio coders among you, here's how to request the audio input stream, and get a node to connect to any processing graph you like!</p>

{% highlight javascript %}
// success callback when requesting audio input stream
function gotStream(stream) {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    var audioContext = new AudioContext();

    // Create an AudioNode from the stream.
    var mediaStreamSource = audioContext.createMediaStreamSource( stream );

    // Connect it to the destination to hear yourself (or any other node for processing!)
    mediaStreamSource.connect( audioContext.destination );
}

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
navigator.getUserMedia( {audio:true}, gotStream );
{% endhighlight %}

<p>There are many rich possibilities for low-latency audio input, particularly in the musical space.  You can see a quick example of how to make use of this in a <a href="http://webaudiodemos.appspot.com/pitchdetect/index.html">simple pitch detector</a> I threw together - try plugging in a guitar, or even just whistling into the microphone.</p>

<p>And, as promised, I've added live audio as an input source to the <a href="http://webaudiodemos.appspot.com/Vocoder/index.html">Vocoder I wrote for Google IO</a> - just select "live input" under modulator.  You may need to adjust the Modulator Gain and the Synth Level.  There's a slight lag due to processing (not due to input latency).  Now that I have live audio input, it's time for another round of tweaking!</p>

<p>Finally, you may want to take a look at the <a href="http://webaudiodemos.appspot.com/">collection of my web audio demos</a> - by the time you read this, I may have some more live audio demos up!</p>
