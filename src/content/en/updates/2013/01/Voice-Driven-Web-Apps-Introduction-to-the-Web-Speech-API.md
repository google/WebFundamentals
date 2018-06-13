project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml

{# wf_updated_on: 2013-01-13 #}
{# wf_published_on: 2013-01-13 #}
{# wf_tags: news,voice,multimedia,webspeech #}
{# wf_blink_components: N/A #}

# Voice Driven Web Apps: Introduction to the Web Speech API {: .page-title }

{% include "web/_shared/contributors/glenshires.html" %}



<p>The new JavaScript <a href="http://dvcs.w3.org/hg/speech-api/raw-file/tip/speechapi.html">Web Speech API</a> makes it easy to add speech recognition to your web pages. This API allows fine control and flexibility over the speech recognition capabilities in Chrome version 25 and later. Here's an example with the recognized text appearing almost immediately while speaking.</p>


<div class="video-wrapper">
  <iframe class="devsite-embedded-youtube-video" data-video-id="qRolXPWqCSo"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</div> 

<figure>
<a href="https://www.google.com/intl/en/chrome/demos/speech.html"><img src="/web/updates/images/2013-01-14-voice-driven-web-apps-introduction-to-the-web-speech-api/web-speech-api-demo.jpg" alt="Web Speech API demo" class="demopreview" /></a>
<figcaption><p><a href="https://www.google.com/intl/en/chrome/demos/speech.html">DEMO</a> / <a href="https://github.com/GoogleChrome/webplatform-samples/tree/master/webspeechdemo">SOURCE</a></p></figcaption>
</figure>

<p>Let’s take a look under the hood. First we check to see if the browser supports the Web Speech API by checking if the <code>webkitSpeechRecognition</code> object exists. If not, we suggest the user upgrades their browser. (Since the API is still experimental, it's currently vendor prefixed.) Lastly, we create the <code>webkitSpeechRecognition</code> object which provides the speech interface, and set some of its attributes and event handlers.</p>


    if (!('webkitSpeechRecognition' in window)) {
      upgrade();
    } else {
      var recognition = new webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
    
      recognition.onstart = function() { ... }
      recognition.onresult = function(event) { ... }
      recognition.onerror = function(event) { ... }
      recognition.onend = function() { ... }
      ...
    

<p>The default value for <code>continuous</code> is false, meaning that when the user stops talking, speech recognition will end. This mode is great for simple text like short input fields. In this <a href="https://www.google.com/intl/en/chrome/demos/speech.html">demo</a>, we set it to true, so that recognition will continue even if the user pauses while speaking.</p>

<p>The default value for <code>interimResults</code> is false, meaning that the only results returned by the recognizer are final and will not change. The demo sets it to true so we get early, interim results that may change. Watch the demo carefully, the grey text is the text that is interim and does sometimes change, whereas the black text are responses from the recognizer that are marked final and will not change.</p>

<p>To get started, the user clicks on the microphone button, which triggers this code:</p>


    function startButton(event) {
      ...
      final_transcript = '';
      recognition.lang = select_dialect.value;
      recognition.start();
    

<p>We set the spoken language for the speech recognizer "lang" to the BCP-47 value that the user has selected via the selection drop-down list, for example “en-US” for English-United States. If this is not set, it defaults to the lang of the HTML document root element and hierarchy. Chrome speech recognition supports numerous languages (see the “<code>langs</code>” table in the demo source), as well as some right-to-left languages that are not included in this demo, such as he-IL and ar-EG.</p>

<p>After setting the language, we call <code>recognition.start()</code> to activate the speech recognizer. Once it begins capturing audio, it calls the <code>onstart</code> event handler, and then for each new set of results, it calls the <code>onresult</code> event handler.</p>


      recognition.onresult = function(event) {
        var interim_transcript = '';
    
        for (var i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            final_transcript += event.results[i][0].transcript;
          } else {
            interim_transcript += event.results[i][0].transcript;
          }
        }
        final_transcript = capitalize(final_transcript);
        final_span.innerHTML = linebreak(final_transcript);
        interim_span.innerHTML = linebreak(interim_transcript);
      };
    }
    

<p>This handler concatenates all the results received so far into two strings: <code>final_transcript</code> and  <code>interim_transcript</code>.  The resulting strings may include "\n", such as when the user speaks “new paragraph”, so we use the <code>linebreak</code> function to convert these to HTML tags <code>&lt;br&gt;</code> or <code>&lt;p&gt;</code>. Finally it sets these strings as the innerHTML of their corresponding <code>&lt;span&gt;</code> elements: <code>final_span</code> which is styled with black text, and <code>interim_span</code> which is styled with gray text.</p>

<p><code>interim_transcript</code> is a local variable, and is completely rebuilt each time this event is called because it’s possible that all interim results have changed since the last <code>onresult</code> event. We could do the same for <code>final_transcript</code> simply by starting the for loop at 0.  However, because final text never changes, we’ve made the code here a bit more efficient by making <code>final_transcript</code> a global, so that this event can start the for loop at <code>event.resultIndex</code> and only append any new final text. </p>

<p>That’s it! The rest of the code is there just to make everything look pretty. It maintains state, shows the user some informative messages, and swaps the GIF image on the microphone button between the static microphone, the mic-slash image, and mic-animate with the pulsating red dot. </p>

<p>The mic-slash image is shown when <code>recognition.start()</code> is called, and then replaced with mic-animate when <code>onstart</code> fires. Typically this happens so quickly that the slash is not noticeable, but the first time speech recognition is used, Chrome needs to ask the user for permission to use the microphone, in which case  <code>onstart</code> only fires when and if the user allows permission. <b>Pages hosted on HTTPS do not need to ask repeatedly for permission, whereas HTTP hosted pages do.</b></p>

<p>So make your web pages come alive by enabling them to listen to your users!</p>

<p>We’d love to hear your feedback...</p>

<ul>
<li>For comments on the W3C Web Speech API specification: <a href="mailto:public-speech-api@w3.org">email</a>, <a href="http://lists.w3.org/Archives/Public/public-speech-api/">mailing archive</a>, <a href="http://www.w3.org/community/speech-api/">community group</a></li>
<li>For comments on Chrome’s implementation of this spec: <a href="mailto:chromium-html5@chromium.org?subject=Web%20Speech%20API">email</a>, <a href="https://groups.google.com/a/chromium.org/forum/?fromgroups#!forum/chromium-html5">mailing archive</a></li>
</ul>

<p>Please refer to the <a href="https://www.google.com/chrome/privacy/whitepaper.html#speech">Chrome Privacy Whitepaper<a/> to learn how Google is handling voice data from this API.</p>

{% include "comment-widget.html" %}
