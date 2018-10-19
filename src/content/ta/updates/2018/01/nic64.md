project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: What's new in Chrome 64 for developers?
<span lang="ta-x-mtfrom-en">

{# wf_published_on: 2018-01-23 #}
{# wf_updated_on: 2018-03-05 #}
{# wf_featured_image: /web/updates/images/generic/new-in-chrome.png #}
{# wf_tags: chrome64,new-in-chrome,observers,ux,regex,media,modules,responsive #}
{# wf_featured_snippet: Chrome 64 adds support for ResizeObservers, which will notify you when an element’s content rectangle has changed its size. Modules can now access to host specific metadata with import.metadata The pop-up blocker gets strong and plenty more. Let’s dive in and see what’s new for developers in Chrome 64! #}
{# wf_blink_components: N/A #}

# 64 குரலில் 64 {: .page-title }

{% include "web/_shared/contributors/petelepage.html" %}

<div class="clearfix"></div>

<div class="video-wrapper">   <iframe class="devsite-embedded-youtube-video" data-video-id="y5sb-icqOyg"
          data-autohide="1" data-showinfo="0" frameborder="0" allowfullscreen>
  </iframe>
</Span>

* [`ResizeObservers`] க்கான ஆதரவு (0), ஒரு உறுப்பு உள்ளடக்க செவ்வகம் அதன் அளவு மாற்றப்பட்டால் உங்களுக்கு அறிவிக்கப்படும்.
* இப்போது [import.meta](#import-meta) உடன் குறிப்பிட்ட மெட்டாடேட்டாவை தொகுக்க அணுகலாம்.
* [பாப்-அப் பிளாக்கர்](#popup-blocker) வலுவாகிறது.
* [`window.alert()`](#window-alert) இனி கவனம் செலுத்தாது.

மேலும் நிறைய இருக்கிறது (0)!

நான் பீட் லேப்பேஜ். Chrome இல் டெவெலப்பர்களுக்கான புதியது என்ன என்று பார்க்கலாம்.

<div class="clearfix"></div>

Note: மாற்றங்களின் முழு பட்டியல் வேண்டுமா? [Chromium மூல களஞ்சியத்தின் மாற்றுப் பட்டியல்](https://chromium.googlesource.com/chromium/src/+log/63.0.3239.84..64.0.3282.140) என்பதைப் பார்க்கவும்.

## `ResizeObserver` {: #resizeobserver }

ஒரு உறுப்பு அளவு மாற்றங்கள் ஒரு வலிக்கு பிட் இருக்கும் போது கண்காணிப்பு. பெரும்பாலும், நீங்கள் ஆவணத்தின் `resize` நிகழ்வுக்கு ஒரு கேட்பவருக்கு இணைப்பீர்கள், பின்னர் `getBoundingClientRect` அல்லது `getComputedStyle` ஐ அழைக்கவும். ஆனால், அந்த இருவரும் அமைப்பை நொறுக்கலாம்.

உலாவி சாளரத்தை அளவு மாற்றவில்லை என்றால், ஆனால் புதிய உறுப்பு ஆவணம் சேர்க்கப்பட்டது? அல்லது நீங்கள் ஒரு உறுப்புக்கு `display: none` ஐ சேர்த்தீர்களா? அந்த இருவரும் பக்கம் உள்ள மற்ற கூறுகளை அளவு மாற்ற முடியும்.

`ResizeObserver` ஒரு உறுப்பு அளவு மாற்றங்கள் எப்போது வேண்டுமானாலும் தெரிவிக்கின்றது, உறுப்புகளின் புதிய உயரம் மற்றும் அகலத்தை வழங்குகிறது, அமைப்பைத் தாக்கியதால் ஏற்படும் அபாயத்தை குறைக்கிறது.

மற்ற பார்வையாளர்களைப் போல, அதைப் பயன்படுத்துவது மிகவும் எளிமையானது, ஒரு `ResizeObserver` பொருளை உருவாக்கி, உற்பத்தியாளருக்கு ஒரு கோரிக்கை அனுப்பவும். கோரிக்கைக்கு `ResizeOberverEntries` ஒரு வரிசை வழங்கப்படும் - அனுசரிக்கப்பட்ட உறுப்புக்கு ஒரு நுழைவு - உறுப்புக்கான புதிய பரிமாணங்களைக் கொண்டிருக்கும்.

```js
const ro = new ResizeObserver( entries => {
  for (const entry of entries) {
    const cr = entry.contentRect;
    console.log('Element:', entry.target);
    console.log(`Element size: ${cr.width}px × ${cr.height}px`);
    console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
  }
});

// Observe one or multiple elements
ro.observe(someElement);
```

[`ResizeObserver`: இது கூறுகளுக்கு `document.onresize` போன்றது](/web/updates/2016/10/resizeobserver) மேலும் விவரங்கள் மற்றும் உண்மையான உலக உதாரணங்கள்.


## மேம்பட்ட பாப்-அப் தடுப்பான் {: #popup-blocker }

நான் தாவ-அடுக்கை வெறுக்கிறேன். நீங்கள் அவர்களுக்கு தெரியும், ஒரு பக்கம் ஒரு இலக்கு பாப் அப் திறக்கும் போது மற்றும் பக்கம் செல்லவும் போது. பொதுவாக அவர்கள் ஒரு விளம்பரம் அல்லது நீங்கள் விரும்பவில்லை என்று ஒன்று உள்ளது.

Chrome 64 இல் தொடங்கி, இந்த வகையான வழிசெலுத்தல்கள் தடுக்கப்படும், மேலும் பயனர் சில சொந்த UI ஐ பயனர் காண்பிக்கும் - அவர்கள் விரும்பினால், திருப்பிவிட அனுமதிக்கலாம்.


## `import.meta` {: #import-meta }

ஜாவா தொகுதிகளை எழுதுகையில், தற்போதைய தொகுதியைப் பற்றி ஹோஸ்ட்-குறிப்பிட்ட மெட்டாடேட்டாவை நீங்கள் அணுக வேண்டும். கோப்பகங்களுக்குள் Chrome 64 இப்போது `import.meta` சொத்துக்களை ஆதரிக்கிறது, மேலும் URL ஐ `import.meta.url` எனும் URL ஐ அம்பலப்படுத்துகிறது.

நடப்பு HTML ஆவணத்தை எதிர்க்கும் தொகுதி கோப்பிற்கு தொடர்புடைய ஆதாரங்களைத் தீர்ப்பதற்கு இது மிகவும் உதவியாக இருக்கும்.


## இன்னமும் அதிகமாக! {: #more }

இது டெவலப்பர்களுக்கான குரோம் 64 இன் மாற்றங்களில் சில மட்டுமே, நிச்சயமாக, இன்னும் அதிகமாக உள்ளது.

* Chrome இப்போது வழக்கமான பெயரிடல்களில் [பெயரிடப்பட்ட கைப்பற்றல்கள்](/web/updates/2017/07/upcoming-regexp-features#named_captures) மற்றும் [யூனிகோட் சொத்து தப்பித்தல்கள்](/web/updates/2017/07/upcoming-regexp-features#unicode_property_escapes) ஆகியவற்றை ஆதரிக்கிறது.
`preload` மற்றும் `<audio>` கூறுகளுக்கான இயல்புநிலை `<video>` மதிப்பு இப்போது `metadata` ஆகும். இது பிற உலாவிகளுடன் இணங்குவதைக் கொண்டிருக்கிறது, மேலும் மெட்டாடேட்டாவை மட்டுமல்லாமல் மீடியாவை மட்டும் சேர்ப்பதன் மூலம் அலைவரிசை மற்றும் ஆதார பயன்பாட்டை குறைக்க உதவுகிறது.
* `Request.prototype.cache` இன் கேச் பயன்முறையைப் பார்க்க நீங்கள் இப்போது `Request` ஐப் பயன்படுத்தலாம் மற்றும் கோரிக்கை மீண்டும் கோரிக்கை என்பதை தீர்மானிக்கவும்.
* ஃபோகஸ் மேலாண்மை API ஐப் பயன்படுத்தி, நீங்கள் இப்போது `preventScroll` பண்புடன் ஸ்க்ரோலிங் செய்யாமல் ஒரு உறுப்பை கவனிக்க முடியும்.

## `window.alert()` {: #window-alert }

ஓ, இன்னும் ஒன்று! இது உண்மையில் 'டெவெலப்பர் அம்சம்' அல்ல, அது எனக்கு மகிழ்ச்சியைத் தருகிறது. `window.alert()` இனி ஒரு பின்னணி தாவலை முன்னணிக்கு கொண்டுவருவதில்லை! அதற்கு பதிலாக, பயனர் அந்த தாவலுக்கு திரும்புகிறார் போது எச்சரிக்கை காட்டப்படும்.

எனக்கு ஏதோ ஒரு `window.alert` எதையாவது எடுத்ததால், ஏறக்குறைய சீரற்ற தாவலை மாற்றுகிறது. நான் பழைய Google காலெண்டரைப் பார்க்கிறேன்.


எங்கள் [YouTube சேனல்](https://goo.gl/6FP1a5) க்கு ([] சந்தாதாரராகவும் (0) பதிவு செய்யவும், நாங்கள் ஒரு புதிய வீடியோவை துவக்கும் போதெல்லாம் மின்னஞ்சல் அறிவிப்பைப் பெறுவீர்கள், அல்லது உங்கள் ஜூன் வாசகருக்கு எங்கள் [RSS feed](https://www.youtube.com/user/ChromeDevelopers/) ஐ சேர்க்கவும்.


நான் பீட் லேபேஜ், மற்றும் விரைவில் Chrome 65 வெளியிடப்பட்டவுடன், நான் உங்களிடம் சொல்வது சரிதான் - Chrome இல் புதியது என்ன!

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

</span>