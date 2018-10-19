project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Local Overrides, accessibility tools, performance and SEO audits, and more.
{% include "web/_shared/translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-17 #}
{# wf_tags: chrome65,devtools,devtools-whatsnew #}
{# wf_featured_image: /web/updates/images/generic/chrome-devtools.png #}
{# wf_featured_snippet: Local Overrides, accessibility tools, performance and SEO audits, and more. #}
{# wf_blink_components: Platform>DevTools #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# DevTools இல் புதியது (குரோம் 65) {: .page-title }

{% include "web/_shared/contributors/kaycebasques.html" %}

Chrome 65 இல் DevTools க்கு வரும் புதிய அம்சங்கள் பின்வருமாறு:

* [** உள்ளூர் மீறல்கள் **](#overrides)
* [புதிய அணுகக்கூடிய கருவிகள்](#a11y)
* [தி ** மாற்றங்கள் ** தாவல்](#changes)
* [புதிய எஸ்சிஓ மற்றும் செயல்திறன் தணிக்கை](#audits)
* * பல பதிவுகள் ** செயல்திறன் ** பேனல்] (0)
* [நம்பகமான குறியீடு தொழிலாளர்கள் மற்றும் ஒத்திசைவான குறியீடு நுழைவதை](#stepping)

கீழே, இந்த வெளியீட்டு குறிப்புகளின் வீடியோ பதிப்பைப் படிக்கவும் அல்லது பார்க்கவும்.

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="D1pV7ermy6w"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</Span>

SPCLCLRTS0 நீங்கள் `chrome://version` இல் இயங்கும் Chrome இன் எந்த பதிப்பைச் சரிபார்க்கவும். முந்தைய பதிப்பு இயங்கினால், இந்த அம்சங்கள் இருக்காது. நீங்கள் பின்னர் பதிப்பு இயங்கும் என்றால், இந்த அம்சங்கள் மாறி இருக்கலாம். ஒவ்வொரு 6 வாரங்களுக்கும் ஒரு புதிய முக்கிய பதிப்பிற்கு Chrome தானியங்கு புதுப்பிப்புகள்.

## உள்ளூர் மேலிருக்கும் {: #overrides }

** உள்ளூர் மீறல்கள் ** நீங்கள் DevTools இல் மாற்றங்களைச் செய்து, பக்கங்களை ஏற்றுவதில் அந்த மாற்றங்களை வைத்துக்கொள்ளவும். முன்னதாக, DevTools இல் நீங்கள் செய்த மாற்றங்கள் பக்கத்தை மீண்டும் ஏற்றும்போது இழக்கப்படும்.
** உள்ளூர் மீறல்கள் ** பெரும்பாலான கோப்பு வகைகளுக்கு வேலை, விதிவிலக்குகள் ஒரு ஜோடி. பார்க்க [வரம்புகள்](#overrides-limitations).

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/overrides.gif"
       alt="Persisting a CSS change across page loads with Local Overrides."/>
  <figcaption>
    <b>Figure 1</b>. Persisting a CSS change across page loads with <b>Local Overrides</b>
  </figcaption>
</எண்ணிக்கை>

எப்படி இது செயல்படுகிறது:

* DevTools மாற்றங்களை சேமிக்க வேண்டும் என்ற ஒரு அடைவை நீங்கள் குறிப்பிடுகிறீர்கள்.
நீங்கள் DevTools இல் மாற்றங்களை செய்யும்போது, ​​DevTools உங்கள் கோப்பகத்தின் திருத்தப்பட்ட கோப்பின் நகலை சேமிக்கிறது.
* நீங்கள் பக்கத்தை மீண்டும் ஏற்றும்போது, ​​DevTools வலையமைப்பு ஆதாரத்தை விட உள்ளூர், திருத்தப்பட்ட கோப்புக்கு உதவுகிறது.

** உள்ளூர் மேலெழுதல்களை அமைக்க **:

1. ** ஆதாரங்கள் ** குழு திறக்க. 1. ** மீறல்களை ** தாவலை திறக்கவும்.

     <figure>
       <img src="/web/updates/images/2018/01/overrides.png"
            alt="The Overrides tab"/>
       <figcaption>
         <b>Figure 2</b>. The <b>Overrides</b> tab
       </figcaption>
     </figure>

1. சொடுக்க * * அமைப்பு மீறுதல் **. 1. உங்கள் மாற்றங்களை சேமிக்க விரும்பும் அடைவு தேர்ந்தெடுக்கவும். 1. உங்கள் காட்சி காட்சியின் மேல், கிளிக் செய்யவும் ** DevTools கொடுக்க அனுமதிக்க ** அனுமதி மற்றும் அடைவு அணுகல் அணுக. 1. உங்கள் மாற்றங்களை செய்யுங்கள்.

### வரம்புகள் {: #overrides-limitations }

* ** கூறுகள் ** குழுவின் ** DOM மரம் ** செய்யப்பட்ட மாற்றங்களை DevTools சேமிக்காது. ** ஆதாரங்கள் ** குழுவில் HTML ஐத் திருத்தவும்.
* நீங்கள் CSS ஐ ** பாங்குகள் ** பலகத்தில் திருத்தினால், அந்த CSS இன் மூல HTML கோப்பாகும், DevTools மாற்றத்தை சேமிக்காது. அதற்கு பதிலாக ** ஆதாரங்கள் ** பேனலில் HTML கோப்பை திருத்தவும்.

### தொடர்புடைய அம்சங்கள் {: #overrides-related }

* [பணியிடங்கள்][WS]. DevTools தானாக நெட்வொர்க் வளங்களை ஒரு உள்ளூர் களஞ்சியமாக இணைக்கிறது. நீங்கள் DevTools இல் மாற்றத்தை எடுக்கும்போது, ​​அந்த மாற்றம் உங்கள் உள்ளூர் களஞ்சியத்திற்கு சேமிக்கப்படும்.

[WS]: /web/updates/2017/10/devtools-release-notes#workspaces

## மாற்றங்கள் தாவலை {: #changes }

நீங்கள் DevTools இல் உள்ள புதிய மாற்றங்களை ** மாற்றங்கள் ** தாவலை வழியாக மாற்றங்களை மாற்றலாம்.

<figure>  <img src="/web/updates/images/2018/01/changes.png"
       alt="The Changes tab"/>
  <figcaption>
    <b>Figure 3</b>. The <b>Changes</b> tab
  </figcaption>
</எண்ணிக்கை>

## புதிய அணுகக்கூடிய கருவிகள் {: #a11y }

ஒரு உறுப்பு அணுகல் பண்புகளை ஆய்வு செய்ய புதிய ** அணுகல்தன்மை ** பலகத்தைப் பயன்படுத்தவும், ** வண்ணத் தேர்வியில் உள்ள உரை கூறுகளின் மாறுபாட்டு விகிதத்தை ஆய்வு செய்யவும் ** குறைந்த பார்வை குறைபாடுகள் அல்லது வண்ணம் -பகுதி குறைபாடுகள்.

### அணுகல் தன்மை {: #a11y-pane }

தற்போது தேர்ந்தெடுக்கப்பட்ட உறுப்பு அணுகல் பண்புகளை ஆய்வு செய்ய ** கூறுகள் ** குழு மீது ** அணுகல் ** பலகத்தை பயன்படுத்தவும்.

<figure>  <img src="/web/updates/images/2018/01/a11y-pane.png"
       alt="The Accessibility pane shows the ARIA attributes and computed
            properties for the element that's currently selected in the DOM Tree of
            the Elements panel, as well as its position in the accessibility tree."/>
  <figcaption>
    <b>Figure 4</b>. The <b>Accessibility</b> pane shows the ARIA attributes
    and computed properties for the element that's currently selected in the <b>DOM Tree</b> on
    the <b>Elements</b> panel, as well as its position in the accessibility tree
  </figcaption>
</எண்ணிக்கை>

நடவடிக்கை ** அணுகல் ** பேனலைப் பார்க்க கீழே உள்ள பெயரிடலில் ராப் டோட்ஸனின் A11ycast ஐப் பார்க்கவும்.

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="8dCUzOiMRy4"
          data-autohide="1" data-showinfo="0" frameborder="0"
          data-start="350" allowfullscreen>
  </iframe>
</Span>

### தேர்வி விகிதம் {: #contrast } இல் உள்ள வேறுபாடு விகிதம்

[கலர் பிக்சர்][CP] இப்பொழுது உரை கூறுகளின் மாறுபட்ட விகிதத்தை உங்களுக்கு காட்டுகிறது. உரை உறுப்புகளின் மாறுபட்ட விகிதத்தை அதிகரிப்பது உங்கள் தளத்தை குறைவான பார்வை குறைபாடுகள் அல்லது வண்ண பார்வை குறைபாடுகளுடன் பயனர்களுக்கு மிகவும் அணுகக்கூடியதாக இருக்கிறது. வேறுபாடு விகிதம் அணுகலை எவ்வாறு பாதிக்கிறது என்பதைப் பற்றி மேலும் அறிய [வண்ணம் மற்றும் மாறாக][contrast] பார்க்கவும்.

உங்கள் உரை உறுப்புகளின் வண்ண மாறுதலை மேம்படுத்துதல் உங்கள் தளத்தை <i>அனைத்து</i> பயனர்களுக்கும் மேலும் பொருந்தக்கூடியதாக்குகிறது. வேறு வார்த்தைகளில் கூறுவதானால், உங்கள் உரை வெள்ளை பின்னணியுடன் சாம்பல் நிறமாக இருந்தால், அது யாரையும் படிக்க கடினமாக உள்ளது.

<figure>  <img src="/web/updates/images/2018/01/contrast-ratio-collapsed.png"
       alt="Inspecting the contrast ratio of the highlighted H1 element."/>
  <figcaption>
    <b>Figure 5</b>. Inspecting the contrast ratio of the highlighted <code>h1</code> element
  </figcaption>
</எண்ணிக்கை>

** படம் 5 ** ல், ** 4.61 * க்கு அடுத்திருக்கும் இரண்டு சரிபார்ப்புகள், இந்த உறுப்பு [மேம்பட்ட பரிந்துரைக்கப்பட்ட வேறுபாடு விகிதம் (AAA)][enhanced]{:.external} ஐ சந்திக்கிறது என்பதாகும். ஒரே ஒரு சோதனைச் சாவரம் மட்டுமே இருந்தால், அது குறைந்தபட்ச பரிந்துரைக்கப்பட்ட வேறுபாடு விகிதம் (AA)] [1] PRGMS1 ஐ சந்தித்ததாக அர்த்தம்.

[enhanced]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast7
[minimum]: https://www.w3.org/WAI/WCAG20/quickref/#qr-visual-audio-contrast-contrast

கிளிக் செய்யவும் ** மேலும் காட்டு ** ![மேலும் காண்க][SM]] {:.cdt-inl} ** கான்ஸ்ட்ராஸ்ட் விகிதம் ** பிரிவு விரிவாக்க. ** கலர் ஸ்பெக்ட்ரம் ** பெட்டியில் உள்ள வெள்ளைக் கோடு பரிந்துரைக்கப்பட்ட நிற வேறுபாட்டிற்கான வண்ணங்களைக் கொண்டிருக்கும் எல்லைகளுக்கு இடையேயான எல்லையைக் குறிக்கிறது, அதன்படி செய்யாதவை. உதாரணமாக, சாம்பல் நிறம் என்பதால்
** படம் 6 ** பரிந்துரையைச் சந்திக்கிறது, அதாவது வெள்ளைக் கோட்டிற்கு கீழே நிறங்கள் அனைத்தும் பரிந்துரையைச் சந்திக்கின்றன.

<figure>  <img src="/web/updates/images/2018/01/contrast-ratio-expanded.png"
       alt="The expanded Contrast Ratio section."/>
  <figcaption>
    <b>Figure 6</b>. The expanded <b>Contrast Ratio</b> section
  </figcaption>
</எண்ணிக்கை>

[CP]: /web/tools/chrome-devtools/css/reference#color-picker
[contrast]: /web/fundamentals/accessibility/accessible-styles#color_and_contrast
[SM]: /web/updates/images/2018/01/show-more.png

#### தொடர்புடைய அம்சங்கள் {: #contrast-related }

** ஆடிட்ஸ் ** பேனல் ஒரு தானியங்கு அணுகல்தன்மை தணிக்கை என்று உறுதிப்படுத்துகிறது
* ஒரு பக்கத்தில் உள்ள ஒவ்வொரு * உரை உறுப்புக்கும் போதுமான மாறுபாடு விகிதம் உள்ளது.

பார்க்கவும் [Chrome DevTools இல் லைட்ஹவுஸ்][audit], அல்லது கீழே உள்ள A11ycast ஐ பார்க்கவும், அணுகல்தன்மை சோதிக்க ** Audits ** பேனலை எவ்வாறு பயன்படுத்த வேண்டும் என்பதை அறிய.

<div class="video-wrapper-full-width">  <iframe class="devsite-embedded-youtube-video" data-video-id="b0Q5Zp_yKaU"
          data-autohide="1" data-showinfo="0" frameborder="0"
          allowfullscreen>
  </iframe>
</Span>

[audit]: /web/tools/lighthouse/#devtools

## {: #audits } புதிய தணிக்கை

ஒரு புதிய வகை எஸ்சிஓ தணிக்கைகள் மற்றும் பல புதிய செயல்திறன் தணிக்கைகள் கொண்ட Chrome 65 கப்பல்கள்.

Note: ** ஆடிட்ஸ் ** பேனல் [Lighthouse][LH] மூலம் இயக்கப்படுகிறது. குரோம் 64 லைட்ஹவுஸ் பதிப்பு 2.5 இயங்குகிறது. குரோம் 65 லைட்ஹவுஸ் பதிப்பு 2.8. எனவே இந்த பகுதி வெறுமனே 2.6, 2.7, மற்றும் 2.8 இலிருந்து லைட்ஹவுஸ் மேம்படுத்தல்களின் சுருக்கம் ஆகும்.

### புதிய எஸ்சிஓ தணிக்கை {: #seo }

உங்கள் பக்கங்களின் புதிய பதிவுகள் ஒவ்வொன்றிலும் புதுப்பிக்கும் ** எஸ்சிஓ ** பிரிவில் உங்கள் தேடல் இயந்திரத்தின் தரவரிசைகளை மேம்படுத்த உதவுகிறது என்பதை உறுதிப்படுத்துகிறது.

<figure>  <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category of audits."/>
  <figcaption>
    <b>Figure 7</b>. The new <b>SEO</b> category of audits
  </figcaption>
</எண்ணிக்கை>

### புதிய செயல்திறன் தணிக்கை {: #performance }

பல புதிய செயல்திறன் தணிக்கைகள் கொண்ட Chrome 65 மேலும் கப்பல்கள்:

* ஜாவாஸ்கிரிப்ட் துவக்க நேரம் அதிகமானது
* நிலையான சொத்துகளில் திறமையற்ற கேச் கொள்கையை பயன்படுத்துகிறது
* பக்கம் வழிமாற்றுகளைத் தவிர்க்கிறது
* ஆவணம் கூடுதல் பயன்படுத்துகிறது
* CSS ஐ சிறிதாக்கு
* JavaScript ஐ சிறிதாக்கு

<aside class="key-point"> <b>பெரிய விஷயங்கள்!</b> Mynet 4X ஆல் அவர்களின் பக்கம் சுமை வேகத்தை மேம்படுத்திய பின்னர், பயனர்கள் தளத்தில் 43% அதிக நேரம் செலவழித்தனர், 34% அதிகமான பக்கங்களை பார்வையிட்டனர், பவுன்ஸ் வீதங்கள் 24% வீழ்ச்சியடைந்தன, மற்றும் வருவாய் ஒரு பார்வை பக்க பார்வைக்கு 25% அதிகரித்தது. <a href="/web/showcase/2017/mynet">மேலும் அறிக</a> . </aside>

<aside class="success"> <b>எனபதைக்!</b> நீங்கள் உங்கள் பக்கங்களின் சுமை செயல்திறனை மேம்படுத்த விரும்பினால், ஆனால் எங்கு தொடங்க வேண்டும் என்று தெரியவில்லை, <b>ஆடிட்ஸ்</b> குழுவை முயற்சிக்கவும். நீங்கள் ஒரு URL ஐ கொடுக்கிறீர்கள், அந்த பக்கத்தை மேம்படுத்தும் பல வழிகளில் இது விரிவான அறிக்கையை அளிக்கிறது. <a href="/web/tools/lighthouse/#devtools">தொடங்குக</a> . </aside>

### பிற மேம்படுத்தல்கள் {: #audits-other }

* [புதிய, கையேடு அணுகல் தணிக்கை](/web/updates/2018/01/lighthouse#a11y)
* அடுத்த பிற தலைமுறை பட வடிவமைப்புகளை உள்ளடக்கியது [WebP தணிக்கைக்கு புதுப்பிப்புகள்][webp]
* [அணுகல்தன்மை மதிப்பெண்களின் மறுமதிப்பீடு][a11yscore]
* ஒரு அணுகல்தன்மை தணிக்கை ஒரு பக்கத்திற்கு பொருந்தாது என்றால், அந்த தணிக்கை அணுகல் மதிப்பை நோக்கி இனி கணக்கிடாது
* செயல்திறன் இப்போது அறிக்கைகளில் மேல் பகுதி

[seoaudits]: /web/updates/2018/01/lighthouse#seo
[webp]: /web/updates/2018/01/lighthouse#webp
[a11yscore]: /web/updates/2017/12/lighthouse#a11y
[LH]: /web/tools/lighthouse
[2.6]: /web/updates/2017/12/lighthouse
[2.7]: /web/updates/2018/01/lighthouse

## தொழிலாளர்கள் மற்றும் ஒத்திசைவான குறியீடு {: #stepping } உடன் நம்பகமான குறியீடு நுழைகிறது

குரோம் 65 புதுப்பிப்புகளை ** Step intoto ** ![Step Into][into]] {:.cdt-inl} பொத்தானை நூல்களுக்கு இடையில் செய்திகளை அனுப்பும் குறியீட்டை நுழைக்கும் போது, ​​மற்றும் ஒத்திசைவற்ற குறியீடு. நீங்கள் முந்தைய படிநிலை நடத்தை விரும்பினால், புதிய ** படி ** ஐப் பயன்படுத்தலாம் ![படி][step]] PRGMS1 பொத்தானைப் பயன்படுத்தவும்.

[into]: /web/tools/chrome-devtools/javascript/imgs/step-into.png
[step]: /web/tools/chrome-devtools/javascript/imgs/step.png

### பதிவுகள் {: #workers } க்கும் இடையே செய்திகளை அனுப்பும் குறியீட்டில் படிப்பது

நீங்கள் நூல்களுக்கு இடையே செய்திகளை அனுப்பும் குறியீட்டில் நுழைகையில், DevTools இப்போது ஒவ்வொரு நூலிலும் என்ன நடக்கிறது என்பதைக் காட்டுகிறது.

உதாரணமாக, ** படம் 8 ** இல் உள்ள பயன்பாடு முக்கிய நூல் மற்றும் தொழிலாளி நூல் ஆகியவற்றுக்கு இடையில் ஒரு செய்தியை அனுப்புகிறது. முக்கிய நூலில் `postMessage()` அழைப்புக்கு நுழைந்த பிறகு, DevTools பணியாளர் நூலில் `onmessage` கையாளுதலில் இடைநிறுத்துகிறது. `onmessage` கையாளுபவர் தன்னை முக்கிய செய்தியை மீண்டும் ஒரு செய்தியை இடுகிறார். * அழைப்புக்கு Stepout DevTools ஐ மீண்டும் பிரதான த்ரெட்டிற்கு இடைநிறுத்துகிறது.

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 65."/>
  <figcaption>
    <b>Figure 8</b>. Stepping into message-passing code in Chrome 65
  </figcaption>
</எண்ணிக்கை>

Chrome இன் முந்தைய பதிப்புகளில் இதைப் போன்ற குறியீட்டில் நீங்கள் நுழைந்ததும், குறியீட்டின் பிரதான-நூல் பக்கத்தைக் காட்டியது, நீங்கள் ** படம் 9 ** இல் காணலாம்.

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-worker-stepping.gif"
       alt="Stepping into message-passing code in Chrome 63."/>
  <figcaption>
    <b>Figure 9</b>. Stepping into message-passing code in Chrome 63
  </figcaption>
</எண்ணிக்கை>

### ஒத்திசைவு குறியீடு {: #async } க்குள் நுழைதல்

ஒத்திசைவான குறியீடுக்குள் நுழைகையில், DevTools இப்போது நீங்கள் இயங்கும் ஒத்தியங்கா குறியீட்டில் இடைநிறுத்தம் செய்ய வேண்டும் என்று கருதுகிறது.

உதாரணமாக, ** படம் 10 ** `setTimeout()` க்குள் நுழைந்த பின், DevTools திரைக்கு பின்னால் உள்ள எல்லாவற்றையும் இயக்கும் அனைத்து குறியீடும் இயங்குகிறது, பின்னர் `setTimeout()` க்கு அனுப்பப்படும் செயல்பாட்டில் இடைநிறுத்துகிறது.

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/new-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 65."/>
  <figcaption>
    <b>Figure 10</b>. Stepping into asynchronous code in Chrome 65
  </figcaption>
</எண்ணிக்கை>

Chrome 63 இல் இதைப் போன்ற குறியீட்டில் நீங்கள் நுழைந்தவுடன், DevTools குறியீட்டில் இடைநிறுத்தப்பட்டது, இது காலவரிசைப்படி ஓடியதால், ** படம் 11 ** இல் காணலாம்.

<figure>  <img src="https://storage.googleapis.com/webfundamentals-assets/updates/2018/01/old-async-stepping.gif"
       alt="Stepping into asynchronous code in Chrome 63."/>
  <figcaption>
    <b>Figure 11</b>. Stepping into asynchronous code in Chrome 63
  </figcaption>
</எண்ணிக்கை>

## செயல்திறன் குழு {: #recordings } பல பதிவுகள்

** செயல்திறன் ** குழு இப்போது தற்காலிகமாக 5 பதிவுகளை சேமிக்க அனுமதிக்கிறது. நீங்கள் உங்கள் DevTools சாளரத்தை மூடும்போது பதிவுகள் அழிக்கப்படும். ** செயல்திறன் ** பேனலுடன் வசதியாக [0] இயக்க [செயல்திறன் பகுப்பாய்வு தொடங்குவதன் மூலம் தொடங்குக].

[runtime]: /web/tools/chrome-devtools/evaluate-performance/

<figure>  <img src="/web/updates/images/2018/01/recordings.png"
       alt="Selecting between multiple recordings in the Performance panel."/>
  <figcaption>
    <b>Figure 12</b>. Selecting between multiple recordings in the <b>Performance</b> panel
  </figcaption>
</எண்ணிக்கை>

## போனஸ்: Puppeteer 1.0 {: #puppeteer } உடன் DevTools செயல்களை தானியங்க

Note: இந்த பிரிவு Chrome உடன் தொடர்பு இல்லை 65.

Chrome DevTools குழுவால் நிர்வகிக்கப்படும் உலாவி தானியங்கு கருவி, Puppeteer இன் பதிப்பு 1.0, இப்போது வெளியே உள்ளது. திரைப்பலகங்களை கைப்பற்றுதல் போன்ற DevTools வழியாக முன்னர் கிடைக்கக்கூடிய பல பணிகளைத் தானாகவே தானியக்கமாகப் பயன்படுத்தலாம்.

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://example.com');
      await page.screenshot({path: 'example.png'});
      await browser.close();
    })();

PDF களை உருவாக்குவது போன்ற பொதுவாக பயனுள்ள தானியங்கு பணிகளை நிறைய API கள் உள்ளன:

    const puppeteer = require('puppeteer');
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
      await page.pdf({path: 'hn.pdf', format: 'A4'});
      await browser.close();
    })();

மேலும் அறிய [விரைவு தொடக்க][quickstart] காண்க.

[quickstart]: /web/tools/puppeteer/get-started

DevTools அம்சங்களை வெளிப்படையாக வெளிப்படாமல் உலாவும்போது உலாவும்போது, ​​நீங்கள் Puppeteer ஐப் பயன்படுத்தலாம். ஒரு உதாரணம் [[DevTools திறத்தல் DevTools இல்லாமல் [DevTools அம்சங்களைப் பயன்படுத்துதல்][பார்க்க].

[without]: /web/updates/2018/01/devtools-without-devtools

## DevTools குழுவிலிருந்து ஒரு கோரிக்கை: கேனரி {: #canary } ஐ கருதுங்கள்

நீங்கள் Mac அல்லது Windows இல் இருந்தால், உங்கள் இயல்புநிலை மேம்பாட்டு உலாவியாக [Chrome][canary] பயன்படுத்துங்கள். கேனரி பக்கத்தில் இருக்கும்போது நீங்கள் பிடிக்காத ஒரு பிழை அல்லது மாற்றத்தை நீங்கள் புகாரளித்தால், DevTools குழு உங்கள் கருத்துக்களை குறிப்பிடத்தக்க வேகத்துடன் தொடர்புகொள்ள முடியும்.

Note: கேனரி Chrome இன் இரத்தப்போக்கு-விளிம்பில் பதிப்பு. இது சோதனை இல்லாமல், விரைவில் அதன் கட்டப்பட்டது என வெளியிடப்பட்டது. இதன் பொருள், கேனரி ஒரு முறை ஒரு மாதத்திற்கு ஒரு முறையும், ஒரு நாளுக்குள் வழக்கமாக சரி செய்யப்படுவதால், அவ்வப்போது இடைவெளியை உடைக்கிறது. கேனரி இடைவேளைக்குப் பின் Chrome ஸ்டாப்பில் பயன்படுத்த நீங்கள் மீண்டும் செல்லலாம்.

[canary]: https://www.google.com/chrome/browser/canary.html

## கருத்துரை {: #feedback }

இங்கே காணும் எந்த அம்சங்களையும் அல்லது மாற்றங்களையும் விவாதிக்க சிறந்த இடம் [google-chrome-developer-tools@googlegroups.com அஞ்சல் பட்டியலில்][ML]. நீங்கள் சிறிது நேரமாக இருந்தால் [@ChromeDevTools](https://twitter.com/chromedevtools) இல் ட்வீட் செய்யலாம். நீங்கள் DevTools இல் பிழை ஒன்றை எதிர்கொண்டிருக்கிறீர்கள் எனில், தயவுசெய்து [1] திறக்கவும்.

[ML]: https://groups.google.com/forum/#!forum/google-chrome-developer-tools

## முந்தைய வெளியீடு குறிப்புகள் {: #links }

எல்லா முந்தைய DevTools வெளியீட்டு குறிப்புகளுடனான இணைப்புகளுக்கான [devtools-whatsnew][tag] குறியைப் பார்க்கவும்.

[tag]: /web/updates/tags/devtools-whatsnew

{% include "web/_shared/rss-widget-updates.html" %}

{% include "web/_shared/translation-end.html" %}