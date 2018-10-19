project_path: /web/_project.yaml
book_path: /web/updates/_book.yaml
description: New SEO audits and manual accessibility audits, and updates to the WebP audit.
<span lang="ta-x-mtfrom-en">

{# wf_updated_on: 2018-03-05 #}
{# wf_published_on: 2018-01-05 #}
{# wf_tags: lighthouse,accessibility,images #}
{# wf_featured_image: /web/progressive-web-apps/images/pwa-lighthouse.png #}
{# wf_featured_snippet: New SEO audits and manual accessibility audits, and updates to the WebP audit. #}
{# wf_blink_components: N/A #}

{% include "web/tools/chrome-devtools/_shared/styles.html" %}

# கலங்கரை விளக்கு 2.7 புதுப்பிப்புகள் {: .page-title }

{% include "web/_shared/contributors/vinamratasingal.html" %}
{% include "web/_shared/contributors/patrickhulce.html" %}
{% include "web/_shared/contributors/kaycebasques.html" %}

____DEFS__ 0
____DEFS__ 0
____DEFS__ 0
____DEFS__ 0

கலங்கரை விளக்கம் 2.7 வெளியே உள்ளது! முக்கிய அம்சங்கள் பின்வருமாறு:

* [புதிய எஸ்சிஓ தணிக்கை](#seo).
* [புதிய, கையேடு அணுகல் தணிக்கை](#a11y).
* [WebP தணிக்கைக்கு புதுப்பிப்புகள்](#webp).

புதிய அம்சங்கள், மாற்றங்கள் மற்றும் பிழைத் திருத்தங்களின் முழு பட்டியல் [2.7 வெளியீட்டு குறிப்புகள்][RN] ஐப் பார்க்கவும்.

____DEFS__ 0

## 2.7 {: #update } க்கு புதுப்பிப்பது எப்படி

* NPM. உலகளாவிய லைட்ஹவுஸ் நிறுவப்பட்டால் `npm update lighthouse`, அல்லது `npm update lighthouse -g` இயக்கவும்.
* Chrome நீட்டிப்பு. நீட்டிப்பு தானாக புதுப்பிக்கப்பட வேண்டும், ஆனால் நீங்கள் அதை `chrome://extensions` வழியாக கைமுறையாக புதுப்பிக்கலாம்.
* DevTools. லைட்ஹவுஸ் 2.7 Chrome இல் 65 வது கப்பல் ஆகும். நீங்கள் இயங்கும் Chrome இன் பதிப்பை `chrome://version` வழியாக சரிபார்க்கலாம். ஒவ்வொரு 6 வாரங்களுக்கும் ஒரு புதிய பதிப்புக்கான Chrome புதுப்பிப்புகள். [Chrome கேனரி][Canary] பதிவிறக்குவதன் மூலம் சமீபத்திய Chrome குறியீட்டை இயக்கலாம்.

____DEFS__ 0

## புதிய எஸ்சிஓ தணிக்கை {: #seo }

புதிய எஸ்சிஓ வகை தேடுபொறி முடிவுகளில் உங்கள் பக்கத்தின் தரவரிசை மேம்படுத்த உதவும் தணிக்கைகளை வழங்குகிறது.

Note: பல காரணிகள் ஒரு பக்கம் தேடுபொறி தரவரிசையை பாதிக்கின்றன. கலங்கரை விளக்கம் இந்த காரணிகளை சோதிக்காது. லைட்ஹவுஸில் ஒரு சரியான 100 ஸ்கோர் எந்த தேடுபொறிகளில் ஒரு சிறந்த தரவரிசைக்கு உத்தரவாதம் அளிக்காது!

<figure>   <img src="/web/updates/images/2018/01/seo.png"
       alt="The new SEO category. New audits include: Document uses legible font sizes,
            Has a meta viewport tag with width or initial-scale attribute,
            Document has a title element, Document has a meta description, Page has
            successful HTTP code, Links have descriptive text, Page isn't blocked from indexing,
            and Document has a valid hreflang."/>
  <figcaption>
    <b>Figure 1</b>. The new <b>SEO</b> category
  </figcaption>
</எண்ணிக்கை>

## புதிய, கையேடு அணுகல் சரிபார்ப்பு {: #a11y }

புதிய, கையேடு அணுகல் தணிக்கை உங்கள் பக்கத்தின் அணுகலை மேம்படுத்துவதற்கு நீங்கள் செய்யக்கூடிய விஷயங்களை உங்களுக்கு தெரிவிக்கின்றது. இங்கே "கையேடு" என்பது கலங்கரை விளக்கம் இந்த தணிக்கைகளை தானாகவே தானியக்கமாக்க முடியாது என்பதால், அவற்றை நீங்கள் கைமுறையாக சோதனை செய்ய வேண்டும்.

<figure>   <img src="/web/updates/images/2018/01/a11y.png"
       alt="The new, manual accessibility audits, which includes: The page has a logical tab order,
            Interactive controls are keyboard focusable, The user's focus is directed to new
            content added to the page, User focus is not accidentally trapped in a region,
            Custom controls have associated labels, Custom controls have ARIA roles, Visual order
            on the page follows DOM order, Offscreen content is hidden from assistive technology,
            Headings don't skip levels, and HTML5 landmark elements are used to improve
            navigation."/>
  <figcaption>
    <b>Figure 2</b>. The new, manual <b>Accessibility</b> audits
  </figcaption>
</எண்ணிக்கை>

## WebP தணிக்கை {: #webp } க்கான புதுப்பிப்புகள்

சில [சமூக கருத்து] நன்றி [0], [WebP audit][feedback] இப்போது JPEG 2000 மற்றும் JPEG XR போன்ற பிற அடுத்த தலைமுறை, உயர் செயல்திறன் பட வடிவமைப்புகளை உள்ளடக்கியது.

____DEFS__ 0
____DEFS__ 0

<figure>   <img src="/web/updates/images/2018/01/webp.png"
       alt="The new WebP audit."/>
  <figcaption>
    <b>Figure 3</b>. The new WebP audit
  </figcaption>
</எண்ணிக்கை>

{% include "web/_shared/rss-widget-updates.html" %}

</span>