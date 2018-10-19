project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Houdini’s CSS Paint API allows you to programmatically draw CSS images.
<span lang="ta-x-mtfrom-en">

{# wf_updated_on: 2018-05-21 #}
{# wf_published_on: 2018-01-18 #}
{# wf_tags: css,style,houdini,javascript,chrome65 #}
{# wf_featured_image: /web/updates/images/2018/01/paintapi/houdinidiamond.png #}
{# wf_featured_snippet: Houdini’s CSS Paint API allows you to programmatically draw CSS images. #}
{# wf_blink_components: Blink>CSS #}


# CSS பெயிண்ட் API {: .page-title }

{% include "web/_shared/contributors/surma.html" %}

Chrome இல் புதிய சாத்தியக்கூறுகள் 65 CSS பெயிண்ட் API ("CSS தனிபயன் பெயிண்ட்" அல்லது "ஹவுடைனின் பெயிண்ட் பெயிண்ட்" என்றும் அறியப்படுகிறது) Chrome நிலைத்தன்மையில் இயல்புநிலையாக செயல்பட இயலும். அது என்ன? அதை நீங்கள் என்ன செய்ய முடியும்? அது எப்படி வேலை செய்கிறது? சரி, படிக்க ...


CSS பெயிண்ட் ஏபிஐ ஒரு CSS சொத்து ஒரு படத்தை எதிர்பார்க்கும் போதெல்லாம் நீங்கள் நிரல் படத்தை உருவாக்க அனுமதிக்கிறது. `background-image` அல்லது `border-image` போன்ற பண்புகள் வழக்கமாக `url()` ஐப் பயன்படுத்தி ஒரு படக் கோப்பை ஏற்ற அல்லது CSS உள்ளமைக்கப்பட்ட செயல்பாடுகளை `linear-gradient()` உடன் பயன்படுத்தப்படுகின்றன. அவற்றைப் பயன்படுத்துவதற்கு பதிலாக, இப்போது `paint(myPainter)` ஐ _paint worklet_ ஐப் பயன்படுத்தலாம்.

### ஒரு வண்ணப்பூச்சு பணித்தாள் எழுதுதல்

`myPainter` என்று பெயரிடப்பட்ட ஒரு ஓவியத்தை வரையறுக்க, நாங்கள் `CSS.paintWorklet.addModule('my-paint-worklet.js')` ஐ பயன்படுத்தி ஒரு CSS பெயிண்ட் பணியிடத்தை ஏற்ற வேண்டும். அந்த கோப்பில் நாம் ஒரு வண்ணப்பூச்சுத் தொழிலாள வர்க்கத்தை பதிவு செய்ய `registerPaint` செயல்பாட்டை பயன்படுத்தலாம்:

    class MyPainter {
      paint(ctx, geometry, properties) {
        // ...
      }
    }

    registerPaint('myPainter', MyPainter);

`paint()` கோரிக்கைக்கு உட்பட்டால், `ctx` இலிருந்து நாம் தெரிந்து கொள்ளும் அதே வழியில் `CanvasRenderingContext2D` ஐப் பயன்படுத்தலாம். நீங்கள் `<canvas>` இல் எப்படி வரைய வேண்டும் என்பது உங்களுக்கு தெரிந்தால், நீங்கள் ஒரு வண்ணப்பூச்சு வேலைத்திட்டத்தில் வரையலாம்! `<canvas>` எங்கள் அகலத்தில் இருக்கும் கேன்வாஸின் அகலத்தையும் உயரத்தையும் நமக்கு சொல்கிறது. `geometry` இந்த கட்டுரையில் நான் பின்னர் விளக்கலாம்.

குறிப்பு: ஒரு பெயிண்ட் பணிச்சூழலின் சூழல் 100% `<canvas>` சூழல் போல அல்ல. இப்போது வரை, உரை ஒழுங்கமைவு முறைகள் காணவில்லை மற்றும் பாதுகாப்பு காரணங்களுக்காக நீங்கள் கேன்வாஸ் இருந்து பிக்சல்கள் மீண்டும் படிக்க முடியாது.

ஒரு அறிமுக உதாரணம், நாம் ஒரு செக்கர்போர்டு வண்ணப்பூச்சு பணித்தொகுப்பை எழுதி, ஒரு `<textarea>` இன் பின்னணி படத்தைப் பயன்படுத்துவோம். (இயல்புநிலையால் மறுஅளவாக்குவதால் நான் ஒரு உரைச்செயலை பயன்படுத்துகிறேன்.):

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      paint(ctx, geom, properties) {
        // Use `ctx` as if it was a normal canvas
        const colors = ['red', 'green', 'blue'];
        const size = 32;
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            const color = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.fillStyle = color;
            ctx.rect(x * size, y * size, size, size);
            ctx.fill();
          }
        }
      }
    }

    // Register our class under a specific name
    registerPaint('checkerboard', CheckerboardPainter);

நீங்கள் கடந்த காலத்தில் `<canvas>` ஐப் பயன்படுத்தினீர்கள் என்றால், இந்த குறியீடு நன்கு தெரிந்திருக்க வேண்டும். நேரடி [டெமோ](https://googlechromelabs.github.io/houdini-samples/paint-worklet/checkerboard/) இங்கே காண்க.

குறிப்பு: கிட்டத்தட்ட அனைத்து புதிய API களையும் போலவே, CSS Paint API HTTPS (அல்லது `localhost`) இல் மட்டுமே கிடைக்கும்.

<img src="/web/updates/images/2018/01/paintapi/checkerboard1.png" alt="ஒரு பின்னணி படத்தை ஒரு செக்கர்போர்டு வடிவத்துடன் கூடிய Textarea.">

இங்கு ஒரு பொது பின்னணி படத்தை பயன்படுத்துவது வித்தியாசம் என்பது, டெஸ்க்டாவிற்கான பயனர் மறுபயன்பாட்டின் போதெல்லாம், தேவைக்கேற்ப மீண்டும் மாற்றியமைக்கப்படும். இது பின்னணி படத்தை எப்பொழுதும் பெரிய அடர்த்தி காட்சிகளுக்கான இழப்பீடு உட்பட, எப்போதுமே பெரியதாக இருக்க வேண்டும் என்பதாகும்.

அது மிகவும் அருமையாக இருக்கிறது, ஆனால் இது மிகவும் நிலையானது. ஒவ்வொரு முறையும் ஒரே மாதிரியை நாம் விரும்பினோம், ஆனால் மாறுபட்ட சதுரங்களுடனான ஒரு புதிய பணியிடத்தை எழுத வேண்டுமா? பதில் இல்லை!

### உங்கள் பணியிடத்தை சரிசெய்தல்

அதிர்ஷ்டவசமாக, பெயிண்ட் பணியிடம் மற்ற CSS பண்புகளை அணுகலாம், இது கூடுதல் அளவுரு `properties` நாடகத்தில் வருகிறது. வர்க்கம் ஒரு நிலையான `inputProperties` பண்புகளை வழங்குவதன் மூலம், தனிப்பயன் பண்புகளை உள்ளடக்கிய எந்த CSS சொத்துக்கும் மாற்றங்களை நீங்கள் பதிவு செய்யலாம். `properties` அளவுருவின் மூலம் மதிப்புகள் உங்களுக்கு வழங்கப்படும்.

    <!-- index.html -->
    <!doctype html>
    <style>
      textarea {
        /* The paint worklet subscribes to changes of these custom properties. */
        --checkerboard-spacing: 10;
        --checkerboard-size: 32;
        background-image: paint(checkerboard);
      }
    </style>
    <textarea></textarea>
    <script>
      CSS.paintWorklet.addModule('checkerboard.js');
    </script>

<div class="clearfix"></div>

    // checkerboard.js
    class CheckerboardPainter {
      // inputProperties returns a list of CSS properties that this paint function gets access to
      static get inputProperties() { return ['--checkerboard-spacing', '--checkerboard-size']; }

      paint(ctx, geom, properties) {
        // Paint worklet uses CSS Typed OM to model the input values.
        // As of now, they are mostly wrappers around strings,
        // but will be augmented to hold more accessible data over time.
        const size = parseInt(properties.get('--checkerboard-size').toString());
        const spacing = parseInt(properties.get('--checkerboard-spacing').toString());
        const colors = ['red', 'green', 'blue'];
        for(let y = 0; y < geom.height/size; y++) {
          for(let x = 0; x < geom.width/size; x++) {
            ctx.fillStyle = colors[(x + y) % colors.length];
            ctx.beginPath();
            ctx.rect(x*(size + spacing), y*(size + spacing), size, size);
            ctx.fill();
          }
        }
      }
    }

    registerPaint('checkerboard', CheckerboardPainter);

இப்போது நாம் அனைத்து வெவ்வேறு வகையான checkerboards க்கும் ஒரே குறியீட்டைப் பயன்படுத்தலாம். ஆனால் இன்னும் சிறப்பாக, நாம் இப்போது DevTools மற்றும் [0 மதிப்பைக் கொண்டு செல்லலாம்] நாம் சரியான தோற்றத்தைக் கண்டுபிடிக்கும் வரை காத்திருக்கலாம்.

<div style="display: flex; justify-content: center">   <video loop muted controls>
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_vp8.webm"
      type="video/webm; codecs=vp8">
    <source
      src="https://storage.googleapis.com/webfundamentals-assets/paintapi/checkercast_x264.mp4"
      type="video/mp4; codecs=h264">
  </video>
</Span>

குறிப்பு: வண்ணங்கள் அளவுருவமாக்குவது மிகவும் நல்லது, இல்லையா? `paint()` செயல்பாடு வாதங்களின் பட்டியலை எடுக்க அனுமதிக்கிறது. இந்த அம்சம் இன்னும் Chrome இல் நடைமுறைப்படுத்தப்படவில்லை, ஏனென்றால் ஹுடினியின் பண்புகள் மற்றும் மதிப்புகள் ஏபிஐ மீது அது பெரிதும் நம்பியுள்ளது, அது கப்பல் செல்லும் முன் இன்னும் சில பணிகள் தேவை.

வண்ணப்பூச்சு பணியகத்தை ஆதரிக்காத உலாவிகள் # 1 எழுதும் நேரத்தில், குரோம் ஓபராவை மட்டுமே செயல்படுத்தப்படுகிறது. பிற உலாவி விற்பனையாளர்களிடமிருந்து நேர்மறையான சமிக்ஞைகள் இருப்பினும், அதிக முன்னேற்றம் இல்லை. தேதி வரை வைத்திருக்க, சரிபார்க்கவும் [ஹூடினி ரெடி?](https://ishoudinireadyyet.com) வழக்கமாக. இதற்கிடையில், உங்கள் குறியீட்டு ஓவியத்தை எந்தவொரு ஆதரவையும் வழங்காவிட்டாலும் முற்போக்கான விரிவாக்கத்தைப் பயன்படுத்த வேண்டும். எதிர்பார்த்தபடி விஷயங்களைச் செய்வதை உறுதிப்படுத்த, உங்கள் குறியீடு இரண்டு இடங்களில் சரிசெய்ய வேண்டும்: CSS மற்றும் JS.

`CSS` பொருள் சோதனை மூலம் JS இல் வண்ணப்பூச்சு பணித்தொகுப்புக்கான ஆதரவைக் கண்டறிய முடியும்:

    if ('paintWorklet' in CSS) {
      CSS.paintWorklet.addModule('mystuff.js');
    }

CSS பக்கத்திற்கு, உங்களுக்கு இரண்டு விருப்பத்தேர்வுகளும் உள்ளன. நீங்கள் `@supports` ஐப் பயன்படுத்தலாம்:

    @supports (background: paint(id)) {
      /* ... */
    }

இன்னும் குறைவான தந்திரம் என்பது CSS தவறானது மற்றும் அதனுடன் ஒரு தெரியாத செயல்பாடு இருந்தால், முழு சொத்து அறிவிப்புகளையும் புறக்கணித்துவிடும். நீங்கள் ஒரு சொத்து இருமுறை குறிப்பிடுகிறீர்கள் என்றால் - முதல் வண்ணப்பூச்சு வேலை இல்லாமலே, பின்னர் பெயிண்ட் வண்ணப்பூச்சுடன் - நீங்கள் முற்போக்கான விரிவாக்கம் பெறுவீர்கள்:

    textarea {
      background-image: linear-gradient(0, red, blue);
      background-image: paint(myGradient, red, blue);
    }

உலாவியின் பெயிண்டட் பணிக்கு _with_ ஆதரவு, `background-image` இன் இரண்டாம் அறிவிப்பு முதன் முதலில் மேலெழுதப்படும். வண்ணப்பூச்சு பணித்தொகுப்பிற்கான உலாவிகளில் _without_ ஆதரவு, இரண்டாவது அறிவிப்பு தவறானது மற்றும் நிராகரிக்கப்படும், முதல் அறிவிப்பு நடைமுறையில் விட்டுவிடும்.

### CSS பெயிண்ட் Polyfill

பல பயன்பாடுகளுக்காக, CSS பட்டன் Polyfill (0) ஐப் பயன்படுத்தவும் முடியும், இது CSS Custom Paint மற்றும் Paint Worklets நவீன உலாவிகளுக்கு ஆதரவு தருகிறது.

## வழக்கைப் பயன்படுத்துதல் வண்ணப்பூச்சு பணியிடங்களுக்கான பல பயன்பாடு வழக்குகள் உள்ளன, அவற்றில் சில மற்றவர்களை விட மிகவும் வெளிப்படையானவை. உங்கள் DOM அளவைக் குறைப்பதற்காக இன்னும் தெளிவான ஒன்றை பெயிண்ட் ஓட்டைகளை பயன்படுத்துகிறது. பெரும்பாலும், கூறுகள் CSS பயன்படுத்தி அலங்காரங்களை உருவாக்க முற்றிலும் சேர்க்கப்படும். உதாரணமாக, [மெட்டீரியல் டிசைன் லைட்] இல் (0) சிற்றலை விளைவு கொண்ட பொத்தானை அழுத்தவும் 2 கூடுதல் `<span>` உறுப்புகள் கொண்டிருக்கும். உங்களிடம் நிறைய பொத்தான்கள் இருந்தால், இது பல DOM உறுப்புகள் வரை சேர்க்கலாம் மற்றும் மொபைலில் தரமற்ற செயல்திறன் ஏற்படலாம். அதற்கு பதிலாக, (1) வண்ணப்பூச்சு வேலைநிறுத்தத்தை பயன்படுத்தி [சிற்றலை விளைவை செயல்படுத்தினால்], நீங்கள் 0 கூடுதல் உறுப்புகள் மற்றும் ஒரே வண்ணப்பூச்சு பணித்தாள் முடிவடையும். கூடுதலாக, தனிப்பயனாக்க மற்றும் அளவுருவாக்கம் செய்ய மிகவும் எளிதான ஒன்று உள்ளது.

வண்ணப்பூச்சு பணியினைப் பயன்படுத்தி மற்றொரு தலைகீழாக இருக்கிறது - பெரும்பாலான காட்சிகள் - பைட்டுகள் அடிப்படையில் வண்ணப்பூச்சு பணிபுரியும் ஒரு தீர்வு. நிச்சயமாக, ஒரு வர்த்தக ஆஃப்: கேன்வாஸ் அளவு அல்லது அளவுருக்கள் எந்த மாற்ற போது உங்கள் பெயிண்ட் குறியீடு இயக்க வேண்டும். எனவே உங்கள் குறியீடு சிக்கலானது மற்றும் நீண்ட நேரம் எடுக்கும்போது அது ஜங்லை அறிமுகப்படுத்தலாம். முக்கிய நூல் மூலம் நகரும் வண்ணப்பூச்சு பணிபுரியல்களில் Chrome இயங்குகிறது, இதனால் நீண்ட ஓராண்டு பெயிண்ட் தொழிற்சாலைகள் பிரதான நூலின் அக்கறையை பாதிக்காது.

எனக்கு மிகவும் உற்சாகமான வாய்ப்பு, வண்ணப்பூச்சு வேலைநிறுத்தம் ஒரு உலாவி இன்னும் இல்லை என்று CSS அம்சங்கள் திறமையான polyfilling அனுமதிக்கிறது என்று ஆகிறது. ஒரு உதாரணம், கொரில்லாவில் தரையிறக்கும் வரை, polyfill [conic gradients](https://lab.iamvdo.me/houdini/conic-gradient) இருக்கும். மற்றொரு எடுத்துக்காட்டு: ஒரு CSS கூட்டத்தில் நீங்கள் இப்போது பல எல்லை நிறங்கள் இருக்க முடியும் என்று முடிவு செய்யப்பட்டது. இந்த கூட்டம் இன்னும் நடந்துகொண்டிருந்தபோது, ​​என் சக இயன் கில்பாட்ரிக் (polyfill எழுதினார்) (1) இந்த புதிய CSS நடத்தை வண்ணப்பூச்சு பணியினைப் பயன்படுத்தி.

## "பெட்டிக்கு வெளியே" நினைத்துப் பெரும்பாலானவர்கள் பின்னணித் தொழில்களைப் பற்றி சிந்திக்க ஆரம்பித்துவிடுகிறார்கள், மேலும் பெயிண்ட் ஓட்டுநரைப் பற்றி தெரிந்துகொள்வதால் எல்லைப் படங்கள். DOM உறுப்புகள் தன்னிச்சையான வடிவங்களை உருவாக்குவதற்கு `mask-image` வண்ணப்பூச்சு பணிக்கு ஒரு குறைந்த உள்ளுணர்வு பயன்பாடு வழக்கு. உதாரணமாக ஒரு [வைர](https://googlechromelabs.github.io/houdini-samples/paint-worklet/diamond-shape/):

<img src="/web/updates/images/2018/01/paintapi/houdinidiamond.png" alt="வைரம் வடிவத்தில் ஒரு DOM உறுப்பு.">

`mask-image` உறுப்புகளின் அளவு என்று ஒரு படத்தை எடுக்கிறது. முகமூடி படத்தை வெளிப்படையான பகுதிகளில், உறுப்பு வெளிப்படையானது. முகமூடியின் படத்தை ஒளிபுகாவாக இருக்கும் பகுதிகள், உறுப்பு ஒளிபுகும்.

## இப்போது Chrome இல்

சிறிது நேரம் Chrome Canary இல் பெயிண்ட் வேலைசெய்து வருகிறது. Chrome 65 இல், இயல்பாக இயக்கப்பட்டது. முன்னோக்கி சென்று, ஓவியத்தை திறக்கும் புதிய சாத்தியக்கூறுகளைத் திறந்து, நீங்கள் கட்டியதை எங்களுக்குக் காட்டவும்! மேலும் உத்வேகம் பெறுவதற்காக, [வின்செண்ட் டி ஒலிவீரா சேகரிப்பில்](https://lab.iamvdo.me/houdini/) பாருங்கள்.

குறிப்பு: Breakpoints தற்போது CSS Paint API இல் ஆதரிக்கப்படவில்லை, ஆனால் Chrome இன் வெளியீட்டில் வெளியிடப்படும்.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

</span>