project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: Announcing the release of a new country dimension in the Chrome User Experience Report.
{% include "web/_shared/machine-translation-start.html" %}

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-24 #}
{# wf_tags: ux #}
{# wf_blink_components: Blink #}
{# wf_featured_image: /web/updates/images/generic/timeline.png #}
{# wf_featured_snippet: Announcing the release of a new country dimension in the Chrome User Experience Report. #}

# Chrome பயனர் அனுபவம் அறிக்கை: புதிய நாடு பரிமாணம் {: .page-title }

{% include "web/_shared/contributors/rviscomi.html" %}

<div class="clearfix"></div>

[Chrome பயனர் அனுபவம் அறிக்கை](/web/tools/chrome-user-experience-report/) (CrUX) உண்மையான பயனர் செயல்திறன் தரவு பொது தரவுத்தளமாகும். நாம் அறிவித்ததிலிருந்து (1) அறிக்கையானது, பெரும்பாலான கோரிக்கைகளில் ஒன்று, இடங்களில் உள்ள பயனர் அனுபவங்களில் உள்ள வேறுபாடுகளை நன்கு புரிந்து கொள்ளும் திறன் ஆகும். இந்த கருத்தினை அடிப்படையாகக் கொண்டிருக்கும், நாம் ஏற்கனவே இருக்கும் CrUX தரவுத்தொகுதியை விரிவுபடுத்துகிறோம் - இது அனைத்து புவியியல் பிராந்தியங்களுக்கும் உலகளாவிய பார்வையை வழங்குகிறது - தனி நாடு-குறிப்பிட்ட தரவுதளங்களின் தொகுப்பை உள்ளடக்கியது!

<img src="/web/updates/images/2018/01/crux-countries.png"
    alt="Map of countries included in the CrUX dataset"/>

உதாரணமாக, மேலே உள்ள ஸ்கிரீன்ஷனில், 4G மற்றும் 3G ஆகியவற்றுக்கான ஒருங்கிணைந்த அடர்த்தியை ஒரு சில நாடுகளில் உள்ள சிறந்த இணைப்பு வகைகளை ஒப்பிடும் ஒரு வினவலை நாங்கள் காண்கிறோம். 4G வேகம் ஜப்பான் அளவில் எவ்வளவு அதிகமாக இருக்கும் என்பதைப் பார்ப்பது சுவாரஸ்யமானது, 3G வேகம் இன்னும் இந்தியாவில் மிகவும் பொதுவானது. இதுபோன்ற நுணுக்கங்கள் புதிய நாட்டின் பரிமாணத்திற்கு நன்றி தெரிவிக்கின்றன.

BigQuery இல் [CrUX திட்டம்](https://bigquery.cloud.google.com/dataset/chrome-ux-report:all) க்குத் தலைகீழாக ஆரம்பிக்க மற்றும் `country_ae` (ஐக்கிய அரபு எமிரேட்ஸ்) `country_za` (தென்னாப்பிரிக்கா) க்கு [நாட்டின் குறியீடு](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) ஏற்பாடு செய்யும் தரவுகளின் பட்டியலை நீங்கள் காண்பீர்கள். நன்கு அறியப்பட்ட `all` தரவுத்தளம் உலகளாவிய ஒட்டுமொத்த செயல்திறன் தரவை கைப்பற்றும். ஒவ்வொரு தரவுத்தொகுப்பிலும், சமீபத்திய அறிக்கையுடன், `201712` உடன் தொடங்கும் மாத அட்டவணைகள் உள்ளன. தொடங்குவதற்கான விரிவான வழித்தோன்றலுக்கு, எங்கள் மேம்படுத்தப்பட்ட [CrUX ஆவணங்களை](/web/tools/chrome-user-experience-report/) பார்க்கவும்.

இந்த புதிய தரவை உங்களுடன் பகிர்வதற்கு நாங்கள் உற்சாகமாக உள்ளோம், மேலும் இணையத்தில் பயனர் அனுபவத்தை மேம்படுத்துவதற்கான வழிகளில் அதைப் பயன்படுத்துவதைப் பார்க்க நம்புகிறோம். உதவியைப் பெற, கேள்விகளைக் கேட்கவும், கருத்துக்களை வழங்கவும் அல்லது உங்கள் சொந்த பகுப்பாய்விலிருந்து கண்டுபிடிப்புகள் பகிரவும், [CRUX மன்றத்தில்](https://groups.google.com/a/chromium.org/forum/#!forum/chrome-ux-report) விவாதத்தில் சேரவும். BigQuery இல் உள்ள இலவச அடுக்கு உங்களுடைய வினவலான உற்சாகத்தை கட்டுப்படுத்த போதாது என்றால், உங்களுக்கு இன்னும் ஒரு [கூடுதல் 10 TB இலவசம்](https://docs.google.com/forms/d/e/1FAIpQLSeMYnz93JQuO7rPewVrKpLfxO7JREOysti0CQyRo31bc7cXHA/viewform) கொடுப்பதற்காக ஒரு விளம்பரத்தை இயக்கி வருகிறோம்.

{% include "web/_shared/rss-widget-updates.html" %}

{% include "comment-widget.html" %}

{% include "web/_shared/translation-end.html" %}