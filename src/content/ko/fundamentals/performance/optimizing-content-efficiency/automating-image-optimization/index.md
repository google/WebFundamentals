project_path: /web/fundamentals/_project.yaml
book_path: /web/fundamentals/_book.yaml
description: 이미지 형식!

{# wf_updated_on: 2019-02-06#}
{# wf_published_on: 2017-11-16 #}
{# wf_blink_components: Blink>Image,Internals>Images,Internals>Images>Codecs #}

# 이미지 최적화 자동화하기 {: .page-title }

{% include "web/_shared/contributors/addyosmani.html" %}

**이미지 압축 자동화는 필수입니다.**

2017년에는 이미지 최적화가 자동화되어야 합니다. 모범
사례가 변경되면 빌드 파이프라인을 거치지 않는 콘텐츠가
손쉽게 빠져나간다는 것을 잊어버리기 십상입니다. 자동화하려면 다음을 수행합니다. 빌드 프로세스에 [imagemin](https://github.com/imagemin/imagemin)나
 [libvps](https://github.com/jcupitt/libvips)를 사용해 보세요. 다양한
대체재가 있습니다.

대부분의 CDN(예:
[Akamai](https://www.akamai.com/us/en/solutions/why-akamai/image-management.jsp))
및 [Cloudinary](https://cloudinary.com),
[imgix](https://imgix.com), [Fastly's Image
Optimizer](https://www.fastly.com/io/), [Instart Logic's
SmartVision](https://www.instartlogic.com/technology/machine-learning/smartvision)
또는 [ImageOptim API](https://imageoptim.com/api)와 같은 타사 솔루션은 종합적인 자동화 
이미지 최적화 솔루션을 제공합니다.

블로그 게시물을 읽거나 구성을 변경하는 데 소모하는 시간이 서비스의 월 정액보다
훨씬 큽니다(Cloudinary에는 [무료](http://cloudinary.com/pricing)
단계가 있습니다). 비용이나 지연 시간에 대한 우려
때문에 이러한 작업을 아웃소싱하고 싶지 않다면, 위의 오픈소스 옵션이 도움이 됩니다.
[Imageflow](https://github.com/imazen/imageflow)나
[Thumbor](https://github.com/thumbor/thumbor)와 같은 프로젝트는 자체 호스팅 대체재를 사용할 수 있게 해 줍니다.

**누구나 이미지를 효율적으로 압축해야 합니다.**

최소한 [ImageOptim](https://imageoptim.com/)을 사용하세요. 시각적 품질은 유지하면서도 이미지 크기를 크게
줄여줍니다. Windows 및 Linux
[대체재](https://imageoptim.com/versions.html)도 이용할 수 있습니다.

더 구체적으로는,
JPEG는 [MozJPEG](https://github.com/mozilla/mozjpeg)(웹 콘텐츠는 `q=80` 이하도
적절합니다)를 이용하고, [Progressive
JPEG](http://cloudinary.com/blog/progressive_jpegs_and_green_martians) 지원을 고려하거나,
PNG는 [pngquant](https://pngquant.org/),
SVG는 [SVGO](https://github.com/svg/svgo)를 이용하세요. 명시적으로 메타데이터를 제거(pngquant의 경우 `--strip`)하여
몸집을 줄이세요. 엄청나게 거대한 애니메이션 GIF대신,
[H.264](https://en.wikipedia.org/wiki/H.264/MPEG-4_AVC) 동영상(또는 Chrome, Firefox 및 Opera의 경우
[WebM](https://www.webmproject.org/))을 제공하세요! 그럴 수
없다면 적어도 [Giflossy](https://github.com/pornel/giflossy)를 사용하세요. CPU
사이클에 여유가 있고 평균적인 웹 보다 높은 품질이 필요하며,
느린 인코딩 시간이 괜찮다면
[Guetzli](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html)를 사용해 보세요.

일부 브라우저는 Accept 요청 헤더를 통한 이미지 형식 지원을 내세웁니다.
이 방식은 조건부 제공 형식에
사용할 수 있습니다. 예: Chrome과 같은 블링크 기반 브라우저의 경우 손실
[WebP](/speed/webp/), 기타 브라우저의 경우 JPEG/PNG와 같은 폴백.

언제나 더 많은 것을 할 수 있습니다. 도구는 `srcset`
중단점을 생성 및 제공하기 위해 존재합니다. 리소스 선택은 블링크 기반 브라우저에서
[클라이언트 힌트](/web/updates/2015/09/automating-resource-selection-with-client-hints)로
자동화할 수 있으며,
[Save-Data](/web/updates/2016/02/save-data) 힌트에 주의를 기울임으로써 브라우저 내에서
'데이터 저장'을 사용 중인 사용자에게 더 적은 바이트를 전달할 수 있습니다.


이미지의 파일 크기를 더 작게 만들수록 사용자에게 더 나은 네트워크
환경(특히 모바일)을 제공할 수 있습니다. 이 글에서는
품질에 대한 영향을 최소화한 최신 압축 기술을 통해
이미지 크기를 줄이는 방법을 알아봅니다.

## 소개 {: #introduction }

**이미지는 여전히 웹의 몸집을 키우는 주요 요인입니다.**

이미지 파일은
크기가 큰 경우가 많으므로 방대한 양의 인터넷 대역폭을 차지합니다. [HTTP Archive](http://httparchive.org/)에 따르면, 웹페이지를 가져오기 위해 전송되는 데이터의 60%가
JPEG, PNG,
GIF로 구성된 이미지입니다. 2017년 7월 시점에서, 이미지는 3.0MB의 평균적인 사이트에 로드된 콘텐츠의
[1.7MB](http://httparchive.org/interesting.php#bytesperpage)를
차지했습니다.

Tammy Everts에 따르면, 이미지를 페이지에 추가하거나 기존 이미지를 더 크게 만들면 전환율이 증가한다는
사실이
[입증](https://calendar.perfplanet.com/2014/images-are-king-an-image-optimization-checklist-for-everyone-in-your-organization/)
되었습니다. 이미지가 사라질 것 같지 않으므로,
효율적인 압축 전략에 투자하여 몸집을 최소화하는 것이
중요해집니다.


<img src="images/Modern-Image00.jpg" alt="페이지당 이미지가 적을수록 더
      많은 전환을 일으킵니다. 이미지가 페이지당 평균 19개면, 페이지당 평균 31개의
        이미지보다 더 전환이 잘 되었습니다." />

2016년 [Soasta/Google
research](https://www.thinkwithgoogle.com/marketing-resources/experience-design/mobile-page-speed-load-time/)에
따르면, 이미지는 전환을 2번째로 정확하게 예측하는 항목입니다. 최고의
페이지는 38% 더 적은 이미지를 보유합니다.


이미지 최적화는 이미지의
파일 크기를 줄일 수 있는 여러 가지 방법으로 이루어집니다. 이것은 궁극적으로 이미지에 필요한
시각적 충실도가 무엇인지에 따라 달라집니다.


<img src="images/image-optimisation.jpg" alt="이미지 최적화는 수많은
        기법을 아우릅니다." /> <strong>이미지 최적화:</strong> 올바른
형식을 선택하고, 주의 깊게 압축하여 지연 로딩할 수 있는 이미지보다
중요한 이미지에 우선 순위를 매깁니다.


흔한 이미지 최적화에는 압축,

[`<picture>`](/web/fundamentals/design-and-ux/responsive/images)/[`<img
srcset>`](/web/fundamentals/design-and-ux/responsive/images)
을 사용하여 화면 크기에 따른 정확한 제공,이미지 디코딩 비용을 감소하기 위한 크기 조정이 포함됩니다.


<img src="images/chart_naedwl.jpg" alt="HTTP Archive의 잠재적인 이미지 절약의 히스토그램은
95 백분위에서 30KB의 잠재적 이미지 절약이
유효하다는 것을 보여줍니다." /> [HTTP
       Archive](http://jsfiddle.net/rviscomi/rzneberp/embedded/result/)에 따르면,
       95 백분위에서 이미지당(누적
       분포 함수 참조) 30KB가 절약됩니다!</strong>


전체적으로 이미지를 한층 더 최적화할 수 있는 여지는 충분합니다.


<img src="images/image-optim.jpg" alt="Mac에서 50% 이상 절약하여 압축된 여러
        이미지를 사용 중인 ImageOptim" />

ImageOptim는 무료이며, 최신 압축 기술과
불필요한 EXIF 메타데이터 제거를 통해 이미지 크기를 줄입니다.



여러분이 디자이너라면, 내보낼 때 자산을 최적화하는 [Sketch용
ImageOptim 플러그인](https://github.com/ImageOptim/Sketch-plugin)도
있습니다. 저도 이 플러그인으로 시간을 많이 절약할 수 있었습니다.

### 이미지에 최적화가 필요한지 어떻게 알 수 있나요? {: #do-my-images-need-optimization }

[WebPageTest.org](https://www.webpagetest.org/)를 통해 사이트 감사를 수행하면
이미지를 한층 최적화할 수 있는 부분을 강조표시합니다("Compress
Images" 참조).


<img src="images/Modern-Image1.jpg" alt="WebPage 테스트는
        압축 이미지 섹션을 통해 이미지 압축에 대한 감사를 지원합니다." />

WebPageTest 보고서의 "Compress Images" 섹션은
더 효율적으로 압축할 수 있는 이미지와 압축 시의 예상 파일 크기 절약량을 나열합니다.

<img src="images/Modern-Image2.jpg" alt="webpagetest의
        이미지 압축 권장 사항" />



[Lighthouse](/web/tools/lighthouse/)는 성능 모범 사례에 대한 감사를 제공합니다. 이미지 최적화에 대한 감사를 포함하고 있으며,
더 압축할 수 있는
이미지에 대한 제안을 제공하거나 화면 밖에 있는
이미지를 지적하여 지연 로드할 수 있게 해 줍니다.

Chrome 60부터 Lighthous가 이제 Chrome
DevTools에 [Audits
패널](/web/updates/2017/05/devtools-release-notes#lighthouse)을 제공합니다.


<img src="images/hbo.jpg" alt="이미지 최적화 권장 사항을 표시한
        HBO.com에 대한 Lighthouse 감사" /> Lighthouse는
        웹 성능, 모범 사례, 프로그레시브 웹 앱 기능에 관한
        감사를 수행할 수 있습니다.



[PageSpeed
Insights](/speed/pagespeed/insights/)나 세부적인 이미지 분석 감사를 제공하는 Cloudinary의 [Website Speed
Test](https://webspeedtest.cloudinary.com/)와 같은
다른 성능 감사 도구도 들어본 적이 있을 것입니다.

## <a id="choosing-an-image-format" href="#choosing-an-image-format">이미지 형식은 어떻게 골라야 하나요?</a>

Ilya Grigorik이 훌륭한 [이미지 최적화
가이드](/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)에서 강조했듯이,
이미지의 "올바른 형식"이란 원하는 시각적 결과물과
기능적 요건의 결합입니다. 래스터나 벡터 이미지로 작업하고 계신가요?


<img src="images/rastervvector.png" alt="벡터 이미지와 래스터 이미지 비교"
         />



[래스터 그래픽](https://en.wikipedia.org/wiki/Raster_graphics)은 사각형 그리드 내에서 각 픽셀의 개별 값을 인코딩함으로써
이미지를 나타냅니다.
이 이미지는 해상도나 확대/축소에 종속적입니다. WebP나 광범위하게 지원되는
JPEG 또는 PNG와 같은 형식은 포토리얼리즘이 필수인 이러한 그래픽을 잘 처리합니다.
Guetzli, MozJPEG 및 논의했던 기타 개념은 래스터 그래픽에 잘 맞습니다.

[벡터 그래픽](https://en.wikipedia.org/wiki/Vector_graphics)은 선, 점 및 폴리곤을 사용하여 이미지를 나타내며,
단순한 기하학적 형태(예: 로고)를 이용하여
SVG와 같은 고해상도와 확대/축소를 제공하는 형식이 이러한 사용 사례를
더 잘 처리합니다.

올바르지 않은 형식은 비용을 초래할 수 있습니다. 올바른 형식을 선택하는 논리적인 흐름은
위험할 수 있으므로, 신중하게 다른 형식으로 절약할 수 있는 것을 실험해
보세요.

Jeremy Wagner는 이미지 최적화 강연에서 형식을 평가할 때 고려해볼 만한 
[트레이드 오프](http://jlwagner.net/talks/these-images/#/2/2)를 다뤘습니다.


## 겸손한 JPEG {: #the-humble-jpeg }

[JPEG](https://en.wikipedia.org/wiki/JPEG)는 아마도 세계에서 가장
폭넓게 사용되는 이미지 형식일 것입니다. 이전에 언급했듯이, HTTP
Archive가 크롤링한 바에 따르면 사이트에서 보이는 [이미지의
45%](http://httparchive.org/interesting.php)는 JPEG입니다. 여러분의 전화, DSLR, 구형 웹캠 - 대부분이
이 코덱을 지원합니다. 또한 이것은 처음 출시된 시점이 무려
1992년까지 거슬러 올라가는 아주 오래된 형식이기도 합니다. 그 오랜 세월 동안 JPEG가 제공하는 기능을 향상하기 위해
엄청난 양의 연구가 이루어졌습니다.

JPEG는 손실 허용 압축 알고리즘으로 정보를
삭제하여 공간을 절약하는 방식이며, 이후에 나타난 형식은 대부분 시각적
충실도를 보전하면서 파일 크기는 가능한 한 작게 유지하는 데 주력했습니다.

**여러분의 사용 사례에 적합한 이미지 품질은 무엇인가요?**

JPEG와 같은 형식은 색상 영역이
많은 사진이나 이미지에 가장 적합합니다. 대부분의 최적화 도구에서는
여러분이 선호하는 압축 수준을 설정할 수 있습니다. 높은 압축은 파일 크기를 줄이지만
아티팩트, 헤일로, 블록 열화가 발생할 수 있습니다.


<img src="images/Modern-Image5.jpg" alt="JPEG 압축 아티팩트는
        최고 품질에서 최저 품질로 이동할 때 크게 눈에 띕니다" />

JPEG: 눈에 띄는 JPEG 압축 아티팩트는 최고
품질에서 최저 품질로 이동할 때 증가합니다. 다만 이미지 품질 점수는 도구에 따라서
크게 차이가 날 수 있다는 점을 유의해야 합니다.


어떤 품질 선택을 선택할지 고를 때, 이미지가
어느 품질 유형에 해당하는지 고려해야 합니다.

*   **최고 품질** - 대역폭보다 품질이 중요할 때. 이미지가 디자인에서 크게 두드러지거나 전체
  해상도로 표시되는 경우일
수 있습니다.
*   **양호한 품질** - 더 작은 파일 크기 전송을 중시하지만
    이미지 품질에 너무 큰 부정적인 영향을 미치고 싶지 않은 경우. 사용자가
   여전히 일정 수준의 이미지 품질을 중시합니다.
*   **낮은 품질** - 대역폭을 크게 중시하여
    이미지 열화를 용인할 수 있을 때. 이러한 이미지는 끊기거나/불량한 네트워크
    환경에 적합합니다.
*   **최저 품질** - 대역폭 절약이 최우선일 때. 사용자가
    괜찮은 수준의 환경을 원하지만
    더 빠른 페이지 로딩의 이점을 위해 상당히 열화된 경험을 용납합니다.

다음으로, 인지 성능에 큰 영향을 미칠 수 있는
JPEG의 압축 모드에 대해 이야기해 봅시다.

참고: 사용자에게
필요한 이미지 품질을 과대평가할 수 있습니다. 이미지 품질이 이상적인
무압축 소스와 거리가 있다고 생각할 수 있습니다. 또한, 이는 주관적일 수 있습니다.

## JPEG 압축 모드 {: #jpeg-compression-modes }

JPEG 이미지 형식에는 수많은 [압축
모드](http://cs.haifa.ac.il/~nimrod/Compression/JPEG/J5mods2007.pdf)가 있습니다. 세
가지 유명한 모드는 베이스라인(순차적), 프로그레시브 JPEG(PJPEG) 및 무손실입니다.


**베이스라인(또는 순차적) JPEG 및 프로그레시브 JPEG의 차이는 무엇인가요?**

베이스라인 JPEG(대부분의 이미지 편집 및 최적화 도구의 기본값)는
위에서 아래라는 상대적으로 단순한 방식으로 인코딩 및 디코딩됩니다. 베이스라인
JPEG가 느리거나 끊김이 있는 연결에서 로드되면 사용자는 이미지가 로드될 때 이미지 상단을
먼저 보게 됩니다. 무손실 JPEG는 유사하지만
압축 비율이 더 작습니다.



<img src="images/Modern-Image6.jpg" alt="베이스라인 JPEG는 위에서 아래로 로딩됩니다" />
        베이스라인 JPEG는 위에서 아래로 로드되지만, 프로그레시브 JPEG는
   흐린 이미지에서 선명한 이미지로 로드합니다.


프로그레시브 JPEG는 이미지를 여러 스캔으로 나눕니다. 첫 번째 스캔은
흐리거나 낮은 품질 설정으로 이미지를 보여주며, 그 다음 스캔은 이미지 품질이
향상됩니다. '점진적으로(Progressively)' 정제된다고 생각하면 됩니다. 각 이미지 '스캔'은
훨씬 더 높은 수준의 세부 사항을 추가합니다. 이것을 결합하면 완전한 품질의
이미지를 생성합니다.


<img src="images/Modern-Image7.jpg" alt="프로그레시브 JPEG는
        저해상도에서 고해상도로 로드됩니다" /> </picture> 베이스라인 JPEG는
        이미지를 위에서 아래로 로드합니다. PJPEG는 저해상도(흐림)에서
        고해상도로 로드합니다. Pat Meenan은 프로그레시브 JPEG 스캔을 테스트하고 이에 관해 배우고자 [대화식
        도구](http://www.patrickmeenan.com/progressive/view.php?img=https%3A%2F%2Fwww.nps.gov%2Fplanyourvisit%2Fimages%2FGrandCanyonSunset_960w.jpg)를
        작성했습니다.


무손실 JPEG 최적화는 디지털 카메라나 에디터에서 추가된 [EXIF
데이터를 삭제](http://www.verexif.com/en/)하고, 
이미지의 [Huffman
표](https://en.wikipedia.org/wiki/Huffman_coding)를 최적화하거나 이미지를 재스캔하여 얻을 수 있습니다.
[jpegtran](http://jpegclub.org/jpegtran/)과 같은 도구는 이미지 열화 없이 압축 데이터를 재배열하여 무손실
압축을 이루어냈습니다.
[jpegrescan](https://github.com/kud/jpegrescan),
[jpegoptim](https://github.com/tjko/jpegoptim) 및
[mozjpeg](https://github.com/mozilla/mozjpeg)(아래에서 다룹니다) 또한
무손실 JPEG 압축을 지원합니다.


### 프로그레시브 JPEG의 이점 {: #the-advantages-of-progressive-jpegs }

이미지 로드 중 저해상도 '미리보기'를 제공하는 PJPEG의 능력은
인지 성능을 향상합니다. 사용자는 적응형 이미지에 비해 이 이미지가 더 빠르게
로딩된다고 느낍니다.

느린 3G 연결에서 이 방법은 파일의 일부분만 수신되었을 때
사용자가 (대략적으로) 어떤 이미지인지 보고 완전히 로드되는 것을
기다릴 지 결정할 수 있게 해 줍니다. 이 방식은 베이스라인 JPEG의 위에서 아래로 표시되는
이미지 표시 방식보다 더 좋을 수 있습니다.


<img src="images/pjpeg-graph.png" alt="프로그레시브 JPEG로 변경했을 때
        대기 시간에 미치는 영향" /> 2015년에 [Facebook은 PJPEG(iOS
앱 한정)](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/)로
        변경 후 데이터 사용량의 10%가 감소한 것을 발견했습니다. 위의 그림에 나타난 것처럼, 이전보다 15% 더 빠르게
        좋은 품질의 이미지를 표시할 수 있었으며, 인지 로딩
        시간을 최적화했습니다.


PJPEG는 압축을 향상하여 10KB 이상의 베이스라인/단순 JPEG 이미지에 비해 대역폭을 
[2-10%](http://www.bookofspeed.com/chapter5.html) 더 적게 소비합니다.
 한층 높은 압축 비율은
JPEG가 각 스캔에 자체 전용 옵션
[Huffman 표](https://en.wikipedia.org/wiki/Huffman_coding)를 보유할 수 있는 덕분입니다. 최신 JPEG
인코더(예: [libjpeg-turbo](http://libjpeg-turbo.virtualgl.org/), MozJPEG,
등)은 데이터를 잘 담기 위해 PJPEG가 가진 유연성의 이점을 활용합니다.

참고: PJPEG의 압축이 더 우수한 이유는 무엇인가요? 베이스라인 JPEG 블록은 한 번에
하나만 인코딩됩니다. PJPEG를 이용하면 하나 이상의 블록에서 유사한 [이산 코사인
변환](https://en.wikipedia.org/wiki/Discrete_cosine_transform) 계수가
함께 인코딩되어
우수한 압축을 이뤄냅니다.

### 어떤 사람이 프로덕션에서 프로그레시브 JPEG를 사용하나요? {: #whos-using-progressive-jpegs-in-production }

*   [Twitter.com은 프로그레시브
    JPEG](https://www.webpagetest.org/performance_optimization.php?test=170717_NQ_1K9P&run=2#compress_images)를
    85% 품질의 베이스라인으로 제공합니다. Twitter는 사용자 인지 지연
    시간(첫 번째 스캔 및 전체 로드까지의 시간)을 측정하고 전반적으로 PJPEG가
    작은 파일 크기, 허용 가능한
    트랜스코딩 및 디코딩 시간이라는 요건을 충족하는 데 경쟁력이 있다는 것을 발견했습니다.
*   [Facebook은 iOS 앱에 프로그레시브 JPEG를
    전송합니다](https://code.facebook.com/posts/857662304298232/faster-photos-in-facebook-for-ios/).
    Facebook은 이 방식이 데이터 사용량을 15% 줄이고 좋은
    품질의 이미지를 15% 더 빠르게 표시할 수 있다는 것을 발견했습니다.
*   [Yelp는 프로그레시브
    JPEG로 변경](https://engineeringblog.yelp.com/2017/06/making-photos-smaller.html)
    후 이 방식이 이미지 크기 감소로
    절감한 것의 최대 4.5%를 차지한다는 것을 발견했습니다. 또한, Yelp는 MozJPEG를 사용하여 추가로 13.8%를 절약했습니다.

### 프로그레시브 JPEG의 단점 {: #the-disadvantages-of-progressive-jpegs }

PJPEG는 베이스라인 JPEG보다 느리게 디코딩될 수 있으며, 때로는 3배까지도
더 걸립니다. 강력한 CPU를 탑재한 데스크탑 컴퓨터에서는 문제없지만,
리소스가 제한적인 성능이 떨어지는 휴대기기에서는 문제가 될 수 있습니다. 불완전한
레이어 표시에는 기본적으로 이미지를 여러 번 디코딩하는 것이므로 품이 듭니다. 이러한
다중 패싱은 CPU 사이클을 좀먹을 수 있습니다.

또한, 프로그레시브 JPEG가 *언제나* 더 작은 것은 아닙니다. 매우 작은 이미지(예:
썸네일 이미지)의 경우, 프로그레시브 JPEG는 베이스라인 JPEG보다 더 클 수 있습니다.
이러한 썸네일 이미지가 얼마나 작든, 프로그레시브 렌더링이
큰 이점을 제공하지 못할 수 있습니다.

즉, PJPEG의 전송 여부를 결정할 때
실험을 하여 파일 크기, 네트워크 지연 시간, CPU
사이클 사용의 적절한 밸런스를 찾아야 한다는 것을 의미합니다.

참고: PJPEG(및 모든 JPEG)는 때때로 휴대기기에서
하드웨어 디코딩이 가능할 수 있습니다. RAM에 대한 영향을 개선하지는 않지만 CPU에 관한
우려를 다소 없앨 수 있습니다. 모든 Android 기기에 하드웨어 가속화가 지원되는 것은 아니지만, 고성능
기기와 모든 iOS 기기에서는 지원됩니다.

일부 사용자는 프로그레시브 로딩은
언제 이미지가 완전히 로드되었는지 알기 어려우므로 좋지 않다고 생각할 수 있습니다. 이것은 잠재고객에 따라
크게 다르므로, 여러분의 사용자에게 알맞은 것이 무엇인지 평가해야 합니다.

### 프로그레시브 JPEG는 어떻게 생성하나요? {: #how-to-create-progressive-jpegs }

[ImageMagick](https://www.imagemagick.org/),
[libjpeg](http://libjpeg.sourceforge.net/),
[jpegtran](http://jpegclub.org/jpegtran/),[
jpeg-recompress](http://jpegclub.org/jpegtran/) 및
[imagemin](https://github.com/imagemin/imagemin)과 같은 도구와 라이브러리가 프로그레시브
JPEG 내보내기를 지원합니다. 기존의 이미지 최적화 파이프라인이 있다면, 프로그레시브
로딩 지원을 추가하는 것이 수월할 수 있습니다.

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('images', function () {
    return gulp.src('images/*.jpg')
        .pipe(imagemin({
            progressive: true

        }))
        .pipe(gulp.dest('dist'));
});
```

대부분의 이미지 편집 도구는 기본적으로 이미지를 베이스라인 JPEG로 저장합니다.


<img src="images/photoshop.jpg" alt="Photoshop은 파일 내보내기 메뉴에서 프로그레시브
        jpeg 내보내기를 지원합니다" /> 대부분의 이미지 편집 도구는
        기본적으로 이미지를 베이스라인 JPEG로 저장합니다. Photoshop에서 생성한 모든 이미지를
        Progressive JPEG로 저장할 수 있습니다. File -> Export -> Save for
        Web(legacy)로 이동한 다음 프로그레시브 옵션을 클릭하면 됩니다. Sketch도
        프로그레시브 JPEG 내보내기를 지원합니다. JPG로 내보내고 이미지를 저장할 때
        ‘Progressive’ 체크박스를 선택하면 됩니다.

### 크로마(또는 색상) 서브샘플링 {: #chroma-subsampling }

사람의 눈은 휘도(또는 루마라고 하는, 밝기의 척도)보다 이미지의 세부 색상(크로마)의
손실에 더 관대합니다. [크로마
서브샘플링](https://en.wikipedia.org/wiki/Chroma_subsampling)은 루마를 우선하여 신호에서 색상의 정확도를 감소시키는 압축
방식입니다.
이 방식은 이미지 품질에 악영향을 미치지 않고 일부 경우 파일 크기를 최대
[15~17%](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/)까지
감소시키며, JPEG
이미지에 사용할 수 있는 옵션입니다. 서브샘플링은 이미지의 메모리 사용도 감소시킵니다.



<img src="images/luma-signal.jpg" alt="신호 = 크로마 + 루마" />


콘트라스트가 이미지에서 우리가 보는 형태를 형성한다면, 루마는
이것을 정제하는 중요한 역할을 합니다. 오래되고 필터링된 흑백 사진에는
색이 없지만 루마 덕분에 컬러 사진만큼이나
디테일합니다. 크로마(색상)은 시각 인지에 더 적은 영향을 미칩니다.


<img src="images/no-subsampling.jpg"
     alt="JPEG에는 수많은 서브샘플링 유형(없음, 수평, 수평 및 수직)이 지원됩니다." />

JPEG는 무수히 다양한 서브샘플링 유형(없음, 수평,
수평 및 수직)을 지원합니다. 도표 출처: Frédéric Kayser의 [JPEGs for the horseshoe
crabs](http://frdx.free.fr/JPEG_for_the_horseshoe_crabs.pdf)


서브샘플링에 관해서는 수많은 일반 샘플이 논의되었습니다.
일반적으로는 `4:4:4`, `4:2:2`, `4:2:0`입니다. 그런데 이것은 무엇을 의미하는 걸까요? 서브샘플이 A:B:C의 형식을 따랐다고
가정합시다. A는 행의 픽셀 수이며
JPEG의 경우 이것은 보통 4입니다. B는 첫 번째 행의 색상의 양을 나타내며,
C는 초당 색상을 나타냅니다.

* `4:4:4`는 무압축이므로, 색상과 루마가 온전하게 전송됩니다.
* `4:2:2`는 수평으로 절반 샘플링되며 수직으로 완전히 샘플링됩니다.
* `4:2:0`는 첫 번째 행의 픽셀 절반에서 색상을 샘플링하고
  두 번째 행은 무시합니다.

참고: jpegtran 및 cjpeg는 휘도 및
크로마의 개별 품질 구성을 지원합니다. 이렇게 하려면 `-sample` 플래그를 추가하면 됩니다(예: `-sample 2x1`).

몇 가지 좋은 일반 규칙:  서브샘플링(`-sample 2x2`)은 사진에 적합합니다.
비서브샘플링(`-sample 1x1`)은 스크린샷, 배너, 버튼에 가장 적합합니다.
마지막으로 타협(`2x1`)은 무엇을 사용해야 할 지 확신할 수 없을 때 사용합니다.</aside>

크로마 구성 요소의 픽셀을 줄임으로써
색상 구성 요소의 크기를 크게 줄이고 궁극적으로는 바이트 크기를 감소시킬 수 있습니다.


<img src="images/subsampling.jpg" alt="80 품질의 JPEG를 위한
        크로마 서브샘플링 구성." /> 80 품질의 JPEG를 위한
        크로마 서브샘플링 구성.


크로마 서브샘플링은 대부분의 이미지 유형에서 고려할 가치가 있습니다. 그러나
몇 가지 확실한 예외가 있습니다. 서브샘플링이 우리의 눈의 한계에 의존하므로,
세부 색상이 휘도만큼이나 중요한 이미지(예: 의료용 이미지)를 압축하는 데는
좋지 않습니다.

글씨가 담긴 이미지도 불량한 텍스트 서브샘플링이
가독성을 저해할 수 있으므로 문제를 겪을 수 있습니다. JPEG는 전환이 부드러운 풍경 사진을 더 잘 처리하도록 고안되었기 때문에
선명한 가장자리는 JPEG로 압축하기 어렵습니다.



<img src="images/Screen_Shot_2017-08-25_at_11.06.27_AM.jpg" alt="텍스트가 담긴 이미지에
        과도한 서브샘플링을 이용할 때는 주의를 기울여야 합니다" /> [JPEG의
        이해](http://compress-or-die.com/Understanding-JPG/)는
        텍스트가 담긴 이미지를 작업할 때 4:4:4(1x1) 서브샘플링을 고수할 것을
        권장합니다.


트리비아: 크로마 서브샘플링의 정확한 메서드는 JPEG
사양에 설명되어 있지 않으므로, 여러 디코더가 각기 다른 메서드로 처리합니다. MozJPEG 및
libjpeg-turbo는 같은 확장 메서드를 사용합니다. 이전 버전의 libjpeg는
색상에 링 아티팩트를 추가하는 다른 메서드를 사용합니다.

참고: Photoshop은 ‘Save for
web’ 기능을 사용하면 자동으로 크로마 서브샘플링을 설정합니다. 이미지 품질이 51~100으로 설정되면 서브샘플링이
전혀(`4:4:4`) 이루어지지 않습니다. 품질이 이것보다 낮으면 `4:2:0` 서브샘플링이
대신 사용됩니다. 이것이 품질을 51에서 50으로 변경했을 때
파일 크기 감소가 훨씬 더 크게 관찰되는 이유입니다.

참고: 서브샘플링 논의에서
[YCbCr](https://en.wikipedia.org/wiki/YCbCr)라는 용어가 종종 언급됩니다. 이것은
감마 교정된
[RGB](https://en.wikipedia.org/wiki/RGB_color_model) 색상 공간을 나타낼 수 있는 모델입니다. Y는
감마 교정된 휘도이며, Cb는 파란색의 크로마 구성 요소, Cr은
빨간색 크로마 구성 요소입니다. ExifData를 보면 샘플링 수준 옆에 YCbCr가
보일 것입니다.

크로마 서브샘플링에 관해 더 읽어보려면 [Why aren’t your images using
Chroma
subsampling?](https://calendar.perfplanet.com/2015/why-arent-your-images-using-chroma-subsampling/)을 참조하세요.

### JPEG에서 얼마나 많이 발전했나요? {: #how-far-have-we-come-from-the-jpeg }

**현재 웹의 이미지 형식 상황은 이렇습니다.**

*짧은 요약 - 단편화가 많아졌습니다. 최신 기술의 이점을 이용하기 위해
서로 다른 브라우저에 서로 다른 형식을 조건부로 제공해야 할 때가 있습니다.*


<img src="images/format-comparison.jpg" alt="품질을 기준으로
        비교한 최신 이미지 형식." /> 26KB의 대상 파일 크기에서 가능한 것을 시험하기 위해
        여러 최신 이미지 형식(및 최적화 도구)을 사용했습니다. 

[SSIM](https://en.wikipedia.org/wiki/Structural_similarity)(구조적
        유사성) 또는 [Butteraugli](https://github.com/google/butteraugli)를        사용하여 품질을        비교할 수 있습니다.
        이 내용은 추후에 더 자세히 다루겠습니다.


*   **[JPEG 2000](https://en.wikipedia.org/wiki/JPEG_2000) (2000)** - 이산 코사인 기반 변환에서
    웨이브렛(wavelet) 기반 메서드로의 변경을 통한 JPEG
    향상. **브라우저 지원: Safari 데스크탑 + iOS**
*   **[JPEG XR](https://en.wikipedia.org/wiki/JPEG_XR)(2009)** - 
    [HDR](http://wikivisually.com/wiki/High_dynamic_range_imaging) 및 폭넓은
    [gamut](http://wikivisually.com/wiki/Gamut) 색상 공간을    지원하는 JPEG    및 JPEG 2000의 대체재. 다소 느린 인코딩/디코딩 속도로 JPEG보다
   더 작은 파일을 생성합니다. **브라우저 지원:
    Edge, IE.**
*   **[WebP](https://en.wikipedia.org/wiki/WebP) (2010)** - 손실 허용 및 무손실 압축을 지원하는 Google의 블록 예측
    기반 형식.
    JPEG 관련 바이트 절약 및 바이트 크기가 큰 PNG에서 종종 사용되는 투명도 지원
    제공. 크로마 서브샘플링 구성 및
 프로그레시브 로딩이 없습니다. 디코딩 시간 또한 JPEG 디코딩보다 느립니다.
    **브라우저 지원: Chrome, Opera. Safari 및 Firefox에서 실험되었습니다.**
*   **[FLIF](https://en.wikipedia.org/wiki/Free_Lossless_Image_Format) (2015)**
    - 압축률을 기반으로 PNG, 무손실 WebP, 무손실
    BPG, 무손실 JPEG 2000보다 뛰어나다고 주장하는 무손실 이미지 형식. **브라우저 지원:
    없음.**
*   **HEIF 및 BPG.** 압축이라는 관점에서는 동일하나
    래퍼가 다릅니다.
*   **[BPG](https://en.wikipedia.org/wiki/Better_Portable_Graphics) (2015)** -
    JPEG의 한층 압축 효율적인 대체제를 목적으로 하며,
    HEVC([고효율 동영상
    코딩](http://wikivisually.com/wiki/High_Efficiency_Video_Coding))를 기반으로 합니다. MozJPEG나 WebP에 비해 더 나은 파일 크기를 제공하는 것으로
    보입니다. 라이선스 문제로 인해
   폭넓은 인기를 얻을 것 같지 않습니다. **브라우저 지원: 없음. *참고
:    [JS 브라우저 내 디코더](https://bellard.org/bpg/)가 있습니다.***
*   **[HEIF](https://en.wikipedia.org/wiki/High_Efficiency_Image_File_Format)
    (2015)** - 이미지 및 제약 상호 예측이 적용된 HEVC 인코딩
    이미지 저장을 위한 이미지 시퀀스용 형식입니다. Apple은
    [WWDC](https://www.cnet.com/news/apple-ios-boosts-heif-photos-over-jpeg-wwdc/)에서
    iOS의 JPEG를 HEIF로 변경하는 것을 시도해 볼 것이라 말하며, 최대 2배의
    파일 크기 절약을 인용했습니다. **브라우저 지원: 현재 작정 시점에서는 없음.
    나중에 Safari 데스크탑 및 iOS 11에서 지원될 수 있습니다.**

시각을 중시하는 분이라면 상기한 일부에 대한
[이들](http://xooyoozoo.github.io/yolo-octo-bugfixes/#cologne-cathedral&jpg=s&webp=s)
중 [하나](https://people.xiph.org/~xiphmont/demo/daala/update1-tool2b.shtml)
의 시각적 비교 도구를 유용하게 사용할 수 있을 것입니다.

**브라우저 지원이 단편화**되었으며, 위 형식의 이점을 이용하려면
조건부로 각 대상 브라우저에 대한 폴백을 제공해야
할 수 있습니다. Google은 WebP에서 희망을 보았으므로
이에 대해 깊게 다루도록 하겠습니다.

브라우저가 이미지를 렌더링하고 미디어 유형을 결정할 수 있으므로 이미지 형식(예: WebP, JPEG 2000)을 .jpg 확장자(또는
기타)로도 제공할 수 있습니다. 이 방법을
통해 서버측 [콘텐츠 유형
협상](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)
이 HTML을 전혀 변경하지 않고도 어떤 이미지를 보낼 것인지 결정할 수 있게 됩니다.
Instart Logic과 같은 서비스는 고객에게
이미지를 전달할 때 이러한 접근 방식을 이용합니다.

다음으로는 조건부로 여러 이미지 형식을 제공할 수 없을 때의
옵션에 대해 이야기해 봅시다. **JPEG 최적화 인코더**.


### JPEG 최적화 인코더 {: #optimizing-jpeg-encoders }

최신 JPEG 인코더는 기존의 브라우저 및 이미지 처리 앱과의 호환성을 유지하면서
더 작고 충실도는 더 높은 JPEG 파일을 만들려고
합니다. 이들은 압축 이득을 얻기 위해 새로운 이미지 형식을 도입하거나
이 생태계를 변경할 필요성을 피합니다. 이러한 두 인코더는
MozJPEG와 Guetzli입니다.

***짧은 요약: 어떤 JPEG 최적화 인코더를 사용해야 하나요?***

* 일반 웹 자산: MozJPEG
* 품질을 가장 중시하며 인코딩 시간이 길어도 괜찮은 경우: Guetzli를 사용하세요.
* 설정성이 필요한 경우:
 * [JPEGRecompress](https://github.com/danielgtaylor/jpeg-archive)(내부에서
   MozJPEG 사용)
 * [JPEGMini](http://www.jpegmini.com/). Guetzli와 유사하며 최고의
   품질을 자동으로 선택합니다. 기술적으로는 Guetzli만큼 세련되지 않았지만
  더 빠르며 웹에 더 적절한 범위의 품질을 목표로 합니다.
 * [ImageOptim API](https://imageoptim.com/api)(무료 온라인 인터페이스는
   [여기](https://imageoptim.com/online)) - 독특한 방식으로
   색상을 처리합니다. 전반적인 품질에서 색상 품질을 따로 선택할 수 있습니다. 스크린샷에서는
   고해상도 색상을 유지하면서도 자연 사진에서 매끄러운 색상의 바이트를 낭비하지 않도록
   자동으로 크로마 서브샘플링 수준을 선택합니다.

### MozJPEG는 무엇입니까? {: #what-is-mozjpeg }

Mozilla는
[MozJPEG](https://github.com/mozilla/mozjpeg)의 형식으로 현대적인 JPEG 인코더를 제공합니다. [Mozilla에
따르면](https://research.mozilla.org/2014/03/05/introducing-the-mozjpeg-project/)
JPEG 파일의 최대 10%를 다듬을 수 있습니다. MozJPEG로 압축된 파일은
브라우저 간에 이용할 수 있으며, 프로그레시브 스캔 최적화,
[격자 양자화](https://en.wikipedia.org/wiki/Trellis_quantization)
(가장 압축률이 적은 것을 삭제) 및 한층 매끄러운 고 DPI 이미지를 생성하는 데 도움이 되는 몇 가지 양호한 [양자화
표 사전 설정 값](https://calendar.perfplanet.com/2014/mozjpeg-3-0/)(XML 구성을 거칠 의향이 있다면 ImageMagick으로도
가능)과 같은 기능이
포함되어 있습니다.

MozJPEG는
[ImageOptim](https://github.com/ImageOptim/ImageOptim/issues/45) 모두에서 지원되며, 이를 위한 비교적 신뢰할 수 있는
구성 가능 [imagemin
플러그인](https://github.com/imagemin/imagemin-mozjpeg)이 있습니다. Gulp를 이용한 샘플 구현은
다음과 같습니다.

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');

gulp.task('mozjpeg', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([imageminMozjpeg({
        quality: 85

    })]))
    .pipe(gulp.dest('dist'))
);
```


<img src="images/Modern-Image10.jpg" alt="명령줄에서
        실행 중인 mozjpeg" />




<img src="images/Modern-Image11.jpg" alt="여러 품질에서의
        mozjpeg 압축. q=90에서 841KB. q=85에서 562KB. q=75에서 324KB. 마찬가지로,
     Butteraugli 및 SSIM 점수도 품질을 낮출 수록 조금씩 나빠집니다." />

MozJPEG: 여러
품질에서의 파일 크기 및 시각적 유사성 점수 비교.

소스 이미지의 SSIM(구조적 유사성) 점수 계산을 위해 [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive) 프로젝트
의[jpeg-compress](https://github.com/imagemin/imagemin-jpeg-recompress)
를 사용했습니다.
SSIM은 두 이미지의 유사성을 측정하는 방법으로, SSIM
점수는 한 이미지가 '완벽'하다고 고려했을 때 다른 하나의 이미지에 대한 품질 측정값입니다.

저의 경험에 따르면 MozJPEG는 파일 크기를 줄이면서도
높은 시각적 품질로 웹에 사용할 이미지를 압축하는 데 훌륭한 선택지입니다. 작거나
중간 크기의 이미지의 경우, MozJPEG(품질=80~85일 때)가 허용 가능한 SSIM을 유지하면서도 파일 크기를 30~40% 절약하여
jpeg-turbo에서 5~6%의
개선을 제공한다는 점을 발견했습니다. 베이스라인 JPEG보다 [더 느린
인코딩 비용](http://www.libjpeg-turbo.org/About/Mozjpeg)으로 제공되기는 하지만, 장애로 느껴질
정도는 아닙니다.

참고: 추가 구성 지원을 갖춘 MozJPEG 지원 도구 및 이미지 비교를 위한
몇 가지 무료 유틸리티가 필요하다면
[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive)를 살펴보세요. Web Performance in Action의 저자
 Jeremy Wagner가
[이](https://twitter.com/malchata/status/884836650563579904) 구성을 사용하여 소정의 성공을 거두었습니다.


### Guetzli는 무엇인가요? {: #what-is-guetzli }

[Guetzli](https://github.com/google/guetzli)는 사람의 눈으로 원본과 구분할 수
없는 가장 작은 JPEG를 찾는 Google의 인지
JPEG 인코더이며, 느리지만 유망합니다. 이 인코더는 일련의
실험을 수행하여 최종 JPEG에 대한 제안을 생성하고,
각 제안의 정신시각적 오류를 기록합니다. 이 중에서 점수가
가장 높은 제안을 최종 출력으로 선택합니다.

이미지의 차이를 측정하기 위해 Guetzli는 인간의 지각을 기반으로 이미지의 차이를 측정하는 모델인
[Butteraugli](https://github.com/google/butteraugli)(아래에서 논함)를 사용합니다.
 Guetzli는
다른 JPEG 인코더가 제공하지 않는 몇 가지 시각 속성을 고려할 수 있습니다. 예를
들어, 보이는 초록색의 양과 파란색에 대한 민감도에는 관련이 있으므로,
초록색 인근의 파란색에 대한 변경 사항이
덜 정확하게 인코딩될 수 있습니다.

참고: 이미지 파일 크기는 **코덱** 선택보다
**품질**선택에 **훨씬** 종속적입니다. 저품질과 고품질 JPEG의
파일 크기 차이는 코덱을 바꾸어 절약한 파일 크기에 비해
훨씬 더 큽니다. 허용되는 가장 낮은 품질을 사용하는 것이
매우 중요합니다. 주의를 기울이지 않고 너무 높은 품질을 설정하지 않도록 하세요.

Guetzli에
[따르면](https://research.googleblog.com/2017/03/announcing-guetzli-new-open-source-jpeg.html
) 주어진 Butteraugli 점수의 이미지의 데이터 크기를
다른 압축 프로그램보다 20~30% 감소할 수 있다고 합니다. Guetzli 사용에 주의해야 할 점은 이 프로그램이
매우 매우 느리며 현재는 정적 콘텐츠에만 적합하다는 점입니다.
README에서 Guetzli에는 대용량의 메모리가 필요하다는 것을 강조했습니다. 이 프로그램은
메가픽셀당 1분이 소요되고 200MB RAM을 차지합니다. Guetzli의 실제 사용
경험에 관한 좋은 스레드가 [이 Github
스레드](https://github.com/google/guetzli/issues/50)에 있습니다. 정적 사이트
빌드 프로세스의 일환으로 이미지를 최적화할 때는 이상적이지만,
온디맨드를 수행할 때는 적합하지 않습니다.

참고: Guetzli는 정적 사이트
빌드 프로세스의 일환으로 이미지를 최적화할 때나, 이미지 최적화가 온디맨드로 수행되지
않는 상황에 더 적합합니다.

ImageOptim과 같은 도구는 Guetzli 최적화([최신
버전](https://imageoptim.com/)에서)를 지원합니다.

```js
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminGuetzli = require('imagemin-guetzli');

gulp.task('guetzli', () =>
    gulp.src('src/*.jpg')
    .pipe(imagemin([
        imageminGuetzli({
            quality: 85
        })
    ]))
    .pipe(gulp.dest('dist'))

);
```


<img src="images/Modern-Image12.jpg" alt="최적화를 위해 Gulp에서 실행 중인
        Guetzli" />


다양한 절약 옵션으로
Guetzli로 3 x 3MP 이미지를 인코딩하는 데 거의 7분(및 높은 CPU 사용)이 소요됩니다. 고해상도 사진을 얻고자 할 때는
어느 정도의 이점이 있습니다.


<img src="images/Modern-Image13.jpg" alt="여러 품질에서 Guetzli
        비교. q=100, 945KB. q=90, 687KB. q=85, 542KB." /> Guetzli: 여러
        품질에서의 파일 크기 및
        시각적 유사성 점수 비교.



참고: 고품질 이미지에 Guetzli를 실행하는 것이 권장됩니다(예: 압축 해제된
입력 이미지, PNG 원본 또는 100% 품질 또는 이에 근사한 JPEG). 다른 이미지(예: 84 이하 품질의 JPEG)에도 사용할 수 있지만,
결과물이 좋지 않을 수 있습니다.

Guetzli로 이미지를 압축하는 것은 매우 (매우) 시간 소모가 크고 오랜 컴퓨터 가동이
필요하지만, 큰 이미지에 경우에는 감수할 만 합니다. 저는 시각적
충실도를 유지하면서도 파일 크기를 최대 40%까지
절약한 여러 사례를 보았습니다. 따라서 사진을 보관 처리할 때 완벽한 방법입니다. 작거나 중간 크기의
이미지에서도 약간의 절감(10~15KB)를 확인할 수 있지만, 크게 두각을 나타내지는
않습니다. Guetzli는 작은 이미지를 압축할 때
다소 픽셀 유동화스러운 왜곡을 일으킵니다.

효율성에 관한 여러 데이터 포인트에 대해 Guetzli를 Cloudinary의 자동 압축과 
[비교한](https://cloudinary.com/blog/a_closer_look_at_guetzli) Eric Portis의 연구가 
여러분의 흥미를 일으킬지도 모릅니다.

### MozJPEG는 Guetzli에 비해 어떤가요? {: #mozjpeg-vs-guetzli }

서로 다른 JPEG 인코더를 비교하는 것은 복잡합니다. 압축된 이미지의
품질과 충실도뿐만 아니라 파일 크기도 비교해야 하기 때문입니다. 이미지
압축 전문가 Kornel Lesi&#x144;ski는 이러한 측면 모두가 아니라
하나만 기준으로 삼으면 [잘못된](https://kornel.ski/faircomparison)
결론으로 이어질 수 있다고 지적했습니다.

Guetzli는 MozJPEG에 비해 어떤가요? - Kornel의 의견:

* Guetzli는 고품질 이미지에 적합하도록 고안되었습니다(`q=90` 이상에
  대해서는 butteraugli가 최고이며, MozJPEG의 가장 적절한 품질은 약 `q=75`)
* Guetzli는 압축하는 데 훨씬 더 오래 걸립니다(두 가지 모두 표준 JPEG를 생성하므로 디코딩은
  언제나처럼 빠릅니다)
* MozJPEG는 마법처럼 품질 설정을 선택하지 않지만
  다음과 같은 외부 도구를 이용하여 최적의 품질을 찾을 수 있습니다.
  [jpeg-archive](https://github.com/danielgtaylor/jpeg-archive)

압축된 이미지가 원본과 시각적으로 유사한지
아니면 유사하게 인지되는 것인지를 결정하기 위한 수많은 방법이 존재합니다. 이미지 품질 연구에서는 종종
[SSIM](https://en.wikipedia.org/wiki/Structural_similarity)(구조적
유사성) 방법을 사용합니다. Guetzli는 어떤 방식으로든 Butteraugli에 최적화합니다.

### Butteraugli {: #butteraugli }

[Butteraugli](https://github.com/google/butteraugli)는 Google의 프로젝트이며,
사람이 두 이미지의 시각적 이미지 열화(정신시각적
유사성)를 인지할 수 있는 지점을 추정합니다. 거의 눈치채지 못할 만큼의
차이 영역에서 신뢰할 수 있는 이미지에 대한 점수를 제공합니다. Butteraugli는 스칼라 점수를
제공할 뿐만 아니라, 차이 수준의 공간 지도를
계산합니다. SSIM이 이미지의 오류 전체를 본다면,
Butteraugli는 최악의 부분만을 봅니다.


<img src="images/Modern-Image14.jpg" alt="앵무새의 이미지를 검사하는
        Butteraugli" /> 위는 시각적 열화가 너무 심해서 사용자가 선명하지 않다고 느끼기 전의 최소
        JPEG 품질 임계값을 찾기 위해
        Butteraugli를 이용한 예입니다. 그 결과 총 파일 크기의
        65% 감소가 나타났습니다.



실제로는
파일 크기와 수준에 대한 최적의 밸런스에 맞는 것을 선택하기 전에,
시각적 품질의 목표를 정의한 다음 여러 이미지 최적화 전략을 거치고
Butteraugli 점수를 볼 것입니다.


<img src="images/Modern-Image15.jpg"
        alt="명령 줄에서 실행 중인 Butteraugli" /> Bazel을 설치하고 올바르게 Mac에 컴파일하기 위한 C++ 소스의 빌드를 받은 후,
        로컬에 Butteraugli를 설치하는 데 전반적으로
        약 30분이 소요되었습니다. 그 후에는 사용은 상대적으로
        간단합니다. 비교할 두 개의 이미지(원본과 압축 버전)를
        지정하면 사용할 수 있는 점수를
        제공합니다.


**Butteraugli는 시각적 유사성을 비교하는 다른 방법과 무엇이 다른가요?**

Guetzli 프로젝트 멤버의 [이
의견](https://github.com/google/guetzli/issues/10#issuecomment-276295265)
은 Guetzli가 Butteraugli에서는 최고의 점수를 내고,
SSIM에는 최악의 점수를 얻으며, MozJPEG도 두 가지에 대체로 비슷한 점수를 받는다고 합니다. 이 의견은
제가 자체 이미지 최적화 전략에 기울인 연구와도 일치합니다. 저는 이미지에 대해 Butteraugli 및
[img-ssim](https://www.npmjs.com/package/img-ssim)와 같은 노드 모듈을 실행하여 Guetzli 및
MozJPEG 전/후의 SSIM 점수를
원본과 비교했습니다.

**인코더 결합하기?**

큰 이미지의 경우 Guetzli와
MozJPEG의 **무손실 압축**(Guetzli로 작업한 것을 유지하기 위해 cjpeg이 아닌 jpegtran으로)을 결합하면 근소한
SSIM의 감소만으로 10~15%의 파일
크기(전체 55%)를 추가로 줄일 수 있다는 발견했습니다. 이것은 실험과
분석에 주의가 필요하지만, 해당 분야에 있는
[Ariya Hidayat](https://ariya.io/2017/03/squeezing-jpeg-images-with-guetzli)과 같은 다른 사람들도 시도하여
의미 있는 결과를 얻었습니다.

MozJPEG는 비교적 빠르고
양호한 품질의 이미지를 생성하는 웹 자산을 위한 초심자 친화적인 인코더입니다. Guetzli는 리소스 집중적이고
대형 고품질 이미지에 가장 적합하기 때문에
중급자에서 상급자를 위해 남겨둘 만한 선택지입니다.


## WebP란 무엇인가요? {: #what-is-webp }

[WebP](/speed/webp/)는
Google의 최신 이미지 형식으로, 허용되는 시각적 품질에서
무손실 및 손실 압축을 위한 더 작은 파일 크기를 제공하는 것을 목적으로 합니다. 이 형식에는 알파 채널 투명도
및 애니메이션에 대한 지원도 포함됩니다.

작년에 WebP는 손실 및
무손실 모드의 압축면에서 수 퍼센트를 차지했으며,
속도 면에서 이 알고리즘은 두 배 빨랐고 압축 해제는 10% 개선되었습니다.  WebP가 범용 도구는 아니지만,
이미지 압축 커뮤니티에서 일부 지지와 사용자층의 증가를 보이고 있습니다. 그 이유를
살펴봅시다.


<img src="images/Modern-Image16.jpg" alt="여러 품질 설정에서
      WebP 비교 q=90, 646KB. q=80= 290KB. q=75, 219KB. q=70, 199KB" />
       WebP: 여러 품질에서의
       파일 크기 및 시각적 유사성 점수 비교.


### WebP는 어떻게 작동합니까? {: #how-does-webp-perform }

**손실 압축**

WebP팀은 다양한 VP8이나 VP9 동영상 키 프레임
인코딩을 사용한 WebP 손실 파일이
JPEG 파일보다
평균적으로 [25~34%](/speed/webp/docs/webp_study) 더 작다고 말합니다.

저품질 범위(0~50)에서
WebP는 보기 흉한 블록 아티팩트를 희미하게 할 수 있으므로 JPEG에 비해 더 큰 이점을 가집니다. 중간 품질 환경(-m 4 -q 75)은
속도/파일 크기 밸런싱 기본값입니다. 높은 범위(80~99)에서 WebP의 이점은
감소합니다. WebP는 품질보다 속도가 중요한 경우에
권장됩니다.

**무손실 압축**

[WebP 무손실 파일은
PNG 파일보다 26% 더 작습니다](/speed/webp/docs/webp_lossless_alpha_study).
무손실 로드 시간은 PNG에 비해 3% 감소합니다. 하지만 보통은 웹에서
사용자에게 무손실 파일을 전송하고 싶지 않을 것입니다. 무손실과
선명함은 다릅니다(예: 비JPEG). 무손실 WebP는
보관용 콘텐츠에 더 적합할 수 있습니다.

**투명도**

WebP에는 PNG보다
단 22% 더 용량이 큰 무손실 8비트 투명도 채널이 있습니다. 또한, 손실 RGB 투명도도 지원합니다. 이것은 WebP만의 고유한 기능입니다.

**메타데이터**

WebP 파일 형식은 EXIF 사진 메타데이터 및 XMP 디지털 문서
메타데이터를 지원합니다. 또한, ICC 색상 프로필도 담고 있습니다.

WebP는 비용을 CPU에 집중하여 더 나은 압축을 제공합니다. 2013년에는
WebP의 압축 속도가 JPEG보다 최대 10배 느렸지만, 이제는
무시할 수 있는 수준이 되었습니다(일부 이미지는 2배 느릴 수 있음). 빌드의 일환으로
처리된 정적 이미지의 경우, 이것이 큰 문제가 되지 않습니다. 동적으로 생성된
이미지는 눈에 띄는 CPU 오버헤드를 일으키므로
재고해야 할 수 있습니다.

참고: WebP 손실 품질 상황은 JPEG와 직접 비교할 수 없습니다. WebP는
더 많은 데이터를 삭제하여 파일 크기를 더 작게 하기 때문에,
'70% 품질'의 JPEG는 '70% 품질'의 WebP와는 상당히 다릅니다.


### 어떤 사람이 프로덕션에서 WebP를 사용하나요? {: #whos-using-webp-in-production }

많은 대형 회사에서 비용을 줄이고
웹페이지 로드 시간을 감소시키기 위해 프로덕션에서 WebP를 사용하고 있습니다.

Google은 다른 손실 압축 시스템에 비해 WebP 사용이 30~35%를 절감하며,
하루에 430억 개의 이미지 요청을 제공하고 그 중 26%는 무손실 압축이었다고 보고했습니다.
정말 많은 요청이자 상당한 절감입니다. 
[브라우저 지원](http://caniuse.com/#search=webp)이 더 좋았거나 
더 광범위했다면 절감은 의심할 여지 없이 더 컸을 것입니다. 또한, Google은 Google Play나
YouTube와 같은 프로덕션 사이트에도 이것을 이용합니다.

Netflix, Amazon, Quora, Yahoo, Walmart, Ebay, The Guardian, Fortune, 및 USA
Today는 모두 WebP를 지원하는 브라우저에 이미지를 WebP로 압축하여 제공합니다.
VoxMedia는 Chrome 사용자에 대해 WebP로 전환함으로써
The Verge의 [로드
시간을 1~3초 줄였습니다](https://product.voxmedia.com/2015/8/13/9143805/performance-update-2-electric-boogaloo).
[500px](https://iso.500px.com/500px-color-profiles-file-formats-and-you/)는 Chrome 사용자에게
WebP 제공으로 전환함으로써 비슷하거나 더 나은 품질로
평균 25%의 이미지 파일 크기 감소를 경험했습니다.

이 샘플 목록에 나타난 것 보다 더 많은 회사가 이용 중입니다.


<img src="images/webp-conversion.jpg" alt="Google의 WebP 통계: 일일 430억 개 이상의 이미지
        요청" /> Google의 WebP 사용량: 일일 430억 개의 WebP 이미지 요청이
        YouTube, Google Play, Chrome Data Saver 및 G+ 전역에서 제공됩니다.

### WebP 인코딩은 어떻게 작동하나요? {: #how-does-webp-encoding-work }

WebP의 손실 인코딩은 정지 이미지에서 JPEG와 경쟁하기 위해 고안되었습니다. WebP의 손실 인코딩에는 세 가지 주요 단계가
있습니다.

**매크로 차잔** - 이미지를 16x16(매크로) 루마 픽셀 블록과,
두 개의 8x8 크로마 픽셀 블록으로 분할합니다. 이 내용은 JPEG의
색상 공간 전환, 크로마 채널 다운샘플링, 이미지
세분화 개념과 유사하게 들릴 수 있습니다.


<img src="images/Modern-Image18.png" alt="Google
        기념일 로고의
        매크로 차단(여러 픽셀을 루마 및 크로마 블록으로 나눔) 예시."/>



**예측** - 매크로 블록의 모든 4x4 하위 블록에는
효율적인 필터링을 위해 적용된 예측 모델이 있습니다. 이 모델은
단일 블록 주변의 두 픽셀 집단을 정의합니다. A는 바로 위 행이며, L은 왼쪽의 열입니다.
이 두 가지를 사용하여 인코더는 테스트 블록을 4x4 픽셀로 채우고 원본 블록에 가장 가까운 값을 생성하는 것을
결정합니다. Colt McAnlis는
[How WebP lossy mode
works](https://medium.com/@duhroach/how-webp-works-lossly-mode-33bd2b1d0670)에서 이 내용에 대해 더 깊게 이야기했습니다.



<img src="images/Modern-Image19.png" alt="예측 모델을 고려했을 때의
       행, 대상 블록, L 열을 표시한
       Google 기념일 로고의 세그먼트 예."/>



이산 코사인 변환(DCT)이 JPEG
인코딩과 유사하게 몇 가지 단계로 적용됩니다. 주요 차이는 JPEG의 Huffman과 달리 [산술
압축 프로그램](https://www.youtube.com/watch?v=FdMoL3PzmSA&index=7&list=PLOU2XLYxmsIJGErt5rrCqaSGTMyyqNt2H)을
사용한다는 점입니다.

깊게 알아보고자 한다면 Google Developer의 [WebP 압축
기술](/speed/webp/docs/compression) 글이 이 주제를
심도 있게 다루고 있습니다.


### WebP 브라우저 지원 {: #webp-browser-support }

모든 브라우저가 WebP를 지원하는 것은
아니지만, [CanIUse.com에 따르면](http://caniuse.com/webp) 글로벌 사용자 지원이 약 74%입니다.
Chrome과 Opera에서는 기본적으로 지원합니다. Safari, Edge, 및 Firefox는
이것을 테스트했지만 아직 공식 릴리스까지 이어지지는 않았습니다. 이로 인해
WebP 이미지를 사용자에게 가져오는 작업이 웹 개발자에 달리게 됩니다.
이에 대해서는 뒷부분에서 더 자세히 다루도록 하겠습니다.

주요 브라우저 및 각각에 대한 지원 정보는 다음과 같습니다.

* Chrome: Chrome은 23에서부터 완전히 지원을 시작했습니다.
* Android용 Chrome: Chrome 50 이후부터
* Android: Android 4.2 이후부터
* Opera: 12.1 이후부터
* Opera Mini: 모든 버전
* Firefox: 일부 베타 지원
* Edge: 일부 베타 지원
* Internet Explorer: 지원 없음
* Safari: 일부 베타 지원

WebP에도 단점이 있습니다. 전체 해상도 색상 공간 옵션이 없으며,
프로그레시브 디코딩을 지원하지 않습니다. 그럼에도 불구하고, WebP 도구 사용은 좋은 선택이며,
글 작성 시점에서는 Chrome과 Opera만으로 제한되지만 브라우저가 지원되며,
사용자를 충분히 커버하므로 폴백과 함께 고려해 볼만
합니다.

### 이미지를 WebP로 변환하려면 어떻게 해야 하나요? {: #how-do-i-convert-to-webp }

몇 가지 상용 및 오픈소스 이미지 편집 및 처리 패키지가
WebP를 지원합니다. 특히 유용한 애플리케이션은 XnConvert입니다. 무료이며, 플랫폼 간 지원과
일괄 이미지 처리 변환기가 제공됩니다.

참고: 낮은 품질이나 보통 품질의 JPEG를 WebP로 변환하지 않는 것이 중요합니다.
이는 흔히 일어나는 실수이며, JPEG 압축
아티팩트가 있는 WebP 이미지를 생성할 수 있습니다. 이로 인해 WebP가
이미지를 덜 효율적으로 절감하고_아울러_JPEG에서 더해진 왜곡으로 인해
품질이 두 배 손상됩니다. 변환 앱에 가능한 한 최고 품질의 소스 파일(가능하면
원본)을 이용하세요.

**[XnConvert](http://www.xnview.com/en/xnconvert/)**

XnConvert는 일괄 이미지 처리 기능을 제공하며 500가지 이상의 이미지
형식과 호환됩니다. 80가지 이상의 동작을 결합하여 다양한 방식으로 이미지를 변환하거나
편집할 수 있습니다.


<img src="images/Modern-Image20.png" alt="수 많은 이미지가 WebP로 변환된
        Mac의 XNConvert 앱"
         />
XnConvert는 일괄 이미지 최적화를 지원하며, 직관적으로 소스 파일에서
WebP 및 기타 형식으로 변환할 수 있습니다. 압축과 더불어
XnConvert는 메타데이터 스트립, 잘라내기, 색상
깊이 사용자 설정 및 기타 변환도 도울 수 있습니다.


xnview 웹사이트에 나열된 이러한 옵션의 일부는 다음을 포함합니다.

*   메타데이터: 편집
*   변환: 회전, 잘라내기, 크기 조절
*   조정: 밝기, 대비, 채도
*   필터: 흐림, 엠보스, 선명
*   효과: 마스킹, 워터마크, 비네팅

작업 결과물은 약 70가지의 WebP를 비롯한 다양한 파일
형식으로 내보낼 수 있습니다. XnConvert는 Linux, Mac, Windows에서 무료로 사용할 수 있습니다.
XnConvert는 특히 소규모 비즈니스에 권장됩니다.

**노드 모듈**

[Imagemin](https://github.com/imagemin/imagemin)는 유명한 이미지 최소화
모듈이며, 이미지를 WebP로 변환하는 부가기능이 있습니다
([imagemin-webp](https://github.com/imagemin/imagemin-webp)). 이 모듈은
손실 및 무손실 모드를 모두 지원합니다.

imagemin 및 imagemin-webp 설치하려면 다음을 실행합니다.

```
> npm install --save imagemin imagemin-webp
```

그 후에는 양쪽 모듈에 require()을 적용하고 프로젝트 디렉토리 내의
어떤 이미지에나(예: JPEG) 실행할 수 있습니다. 아래는 60 품질의 WebP 인코더로
손실 인코딩을 사용한 것입니다.


```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg}'], 'images', {
    use: [
        imageminWebp({quality: 60})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


JPEG와 유사하게, 출력에서 압축 아티팩트를 볼 수 있습니다.
어떤 품질 설정이 여러분의 이미지에 올바른지 평가하세요. Imagemin-webp도
무손실 품질 WebP 이미지를 인코딩하는 데 사용할 수 있습니다(24비트 색상 및
전체 투명도 지원). 이 경우 `lossless: true`를 옵션에 전달하면 됩니다.


```js
const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');

imagemin(['images/*.{jpg,png}'], 'build/images', {
    use: [
        imageminWebp({lossless: true})
    ]
}).then(() => {
    console.log('Images optimized');
});
```


Sindre
Sorhus의 [Gulp용 WebP 플러그인](https://github.com/sindresorhus/gulp-webp)은 imagemin-webp에 빌드되었으며 [WebPack용
WebP 로더](https://www.npmjs.com/package/webp-loader)도 이용할 수 있습니다. 이 Gulp
플러그인은 imagemin 부가기능이 수행하는 모든 옵션을 허용합니다.

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        quality: 80,
        preset: 'photo',
        method: 6
    }))
    .pipe(gulp.dest('dist'))
);
```

또는 무손실의 경우 다음과 같습니다.

```js
const gulp = require('gulp');
const webp = require('gulp-webp');

gulp.task('webp-lossless', () =>
    gulp.src('src/*.jpg')
    .pipe(webp({
        lossless: true
    }))
    .pipe(gulp.dest('dist'))
);
```

**Bash를 사용한 일괄 이미지 최적화**

XNConvert는 일괄 이미지 압축을 지원하지만 앱이나 빌드 시스템 사용을
피하고자 한다면, Bash 및 이미지 최적화 바이너리로
단순하게 작업할 수 있습니다.


[cwebp](/speed/webp/docs/cwebp)를 사용하여 대량의 이미지를 WebP로 한꺼번에 변환할 수 있습니다.

```
find ./ -type f -name '*.jpg' -exec cwebp -q 70 {} -o {}.webp \;
```


[jpeg-recompress](https://github.com/danielgtaylor/jpeg-archive)를 사용하여 대량의 이미지 소스를 MozJPEG로 최적화할 수 있습니다.

```
find ./ -type f -name '*.jpg' -exec jpeg-recompress {} {} \;
```

또한, [svgo](https://github.com/svg/svgo)를 이용하여 SVG를 다듬을 수 있습니다(이에 관해서는
추후에 다룹니다).

```
find ./ -type f -name '*.svg' -exec svgo {} \;
```

Jeremy Wagner는 [Bash를
이용한 이미지 최적화](https://jeremywagner.me/blog/bulk-image-optimization-in-bash)에 관한 한층 종합적인 게시물과
이 작업에 대해
[함께](https://jeremywagner.me/blog/faster-bulk-image-optimization-in-bash)
 읽어볼 만한 다른 글을 보유하고 있습니다.

**기타 WebP 이미지 처리 및 편집 앱에는 다음과 같은 것이 있습니다.**

   * Leptonica — 오픈소스 이미지 처리 및 분석
     앱에 관한 전체 웹사이트.

*   Sketch는 WebP로의 직접 출력을 지원합니다.
    * GIMP — 무료, 오픈소스 Photoshop 대체재. 이미지 편집기.
    * ImageMagick — 비트맵 이미지의 생성, 구성, 변환, 편집. 무료.
      명령 줄 앱.
    * Pixelmator — Mac용 상용 이미지 편집기.
    * Photoshop WebP 플러그인 — 무료. 이미지 가져오기 및 내보내기. Google에서.

**Android:** Android Studio를 이용하여 기존 BMP, JPG, PNG 또는 정적 GIF 이미지를 WebP
형식으로 변환할 수 있습니다. 더 자세한 정보는 [Android Studio를 이용하여 WebP 이미지
생성하기](https://developer.android.com/studio/write/convert-webp.html)를 참조하세요.

### <a id="how-do-i-view-webp-on-my-os" href="#how-do-i-view-webp-on-my-os">내 OS에서 WebP 이미지를 보려면 어떻게 해야 하나요?</a>

WebP 이미지를 블링크 기반 브라우저(Chrome, Opera,
Brave)에 드래그 앤 드롭하여 미리보기를 표시할 수 있지만, Mac이나 Windows의 부가기능을 이용하여 OS에서
직접 미리보기를 표시할 수도 있습니다.

[Facebook의
WebP 실험](https://www.cnet.com/news/facebook-tries-googles-webp-image-format-users-squawk/)
수 년 전, 사진을 오른쪽 클릭하여 디스크에 저장하려던
사용자들은 이러한 사진이 WebP이기 때문에 브라우저 바깥에서는
표시되지 않는다는 것을 알게 되었습니다. 여기에는 세 가지 주요 문제점이 있었습니다.

<ul> <li>'다른 이름으로 저장'을 사용했지만 WebP 파일을 로컬에서 볼 수 없습니다. 이 문제는
Chrome이 자체적으로 '.webp' 핸들러를 등록하여 수정되었습니다.</li> <li> '다른 이름으로 저장' 후
이미지를 이메일에 첨부하거나 Chrome이 없는 사용자에게 공유합니다.
Facebook은 UI에 '다운로드' 버튼을 도입하여 사용자가 다운로드를 요청했을 때
JPEG를 반환하는 것으로 이 문제를 해결했습니다.</li> <li>Right click >
URL 복사 -> 웹에서 URL 공유. 이 문제는 [콘텐츠 유형
협상](https://www.igvita.com/2012/12/18/deploying-new-image-formats-on-the-web/)으로 해결되었습니다.</li>
</ul>

이러한 문제는 사용자에게 별로 중요하지 않을 수 있지만,
사회적 공유성을 가볍게 지적하는 것도 흥미롭습니다. 다행히도 오늘날에는 여러 운영체제에서
WebP를 보고 작업하기 위한 유틸리티가 존재합니다.

Mac에서는 [WebP용
Quick Look 플러그인](https://github.com/Nyx0uf/qlImageSize)(qlImageSize)을 시도해 보세요. 상당히
잘 작동합니다.


<img src="images/Modern-Image22.jpg" alt="WebP용 Quick Look 플러그인을 이용하여
      WebP 파일 미리보기를 보여주는 Mac의 바탕화면"
         />



Windows에서 [WebP 코덱
패키지](https://storage.googleapis.com/downloads.webmproject.org/releases/webp/WebpCodecSetup.exe)도 다운로드하여
WebP 이미지를 파일 탐색기나 Windows 사진
뷰어에서 미리볼 수 있습니다.

### WebP를 어떻게 제공해야 하나요? {: #how-do-i-serve-webp }

WebP를 지원하지 않는 브라우저는 이미지를 전혀 표시하지 않을 수 있으며, 이는
이상적인 일이 아닙니다. 이러한 일을 방지하기 위해 브라우저 지원에 따라 조건부로
WebP를 제공할 수 있는 몇 가지 전략이 있습니다.


<img src="images/play-format-webp.jpg" alt="WebP가 제공되는 Chrome의
        Play 스토어에 대한 워터폴을 표시한
        Chrome DevTools Network 패널."
         />
Chrome DevTools Network 패널은 "Type" 열 아래에서 블링크 기반 브라우저에 조건부로 제공되고 있는 WebP 파일을
강조표시합니다.




<img src="images/play-format-type.jpg" alt="Play 스토어가 WebP를 블링크에
        전달하는 동안, Firefox와 같은 브라우저에서는 JPEG로 다시 돌아갑니다."
         />
Play 스토어가 WebP를 블링크에
전달하는 동안, Firefox와 같은 브라우저에서는 JPEG로 다시 돌아갑니다.



서버에서 사용자로
WebP 이미지를 가져오는 몇 가지 옵션은 다음과 같습니다.

**.htaccess를 사용하여 WebP 사본 제공**

JPEG/PNG 파일과 일치하는 .webp 버전이 서버에 존재할 때
.htaccess 파일을 이용하여 WebP 파일을 지원되는 브라우저에 제공하는 방법은 다음과 같습니다.

Vincent Orback는 다음과 같은 접근 방식을 권장했습니다.

브라우저는 [Accept
헤더](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept)를 통해
[WebP 지원을
명시적으로 알릴 수 있습니다](http://vincentorback.se/blog/using-webp-images-with-htaccess/). 백엔드를
제어하는 경우, 이미지가 JPEG나 PNG와 같은 형식이 아닌
WebP 버전으로 디스크에 존재한다면 WebP 버전을 반환할 수 있습니다. 그러나, 이 방법을 언제나 사용할 수 있는 것이 아니므로(예:
GitHub 페이지나 S3와 같은 정적 호스트의 경우) 이 옵션을
고려하기 전에 반드시 확인해야 합니다.

Apache 웹 서버용 샘플 .htaccess 파일은 다음과 같습니다.

```
<IfModule mod_rewrite.c>

  RewriteEngine On

  # Check if browser support WebP images
  RewriteCond %{HTTP_ACCEPT} image/webp

  # Check if WebP replacement image exists
  RewriteCond %{DOCUMENT_ROOT}/$1.webp -f

  # Serve WebP image instead
  RewriteRule (.+)\.(jpe?g|png)$ $1.webp [T=image/webp,E=accept:1]

</IfModule>

<IfModule mod_headers.c>

    Header append Vary Accept env=REDIRECT_accept

</IfModule>

AddType  image/webp .webp
```

페이지에 나타나는 .webp 이미지에 문제가 있다면,
해당 이미지/webp MIME 유형이 서버에서 사용 설정되었는지 확인합니다.

Apache: 다음 코드를 .htaccess 파일에 추가합니다.

```
AddType image/webp .webp
```

Nginx: 다음 코드를 mime.types 파일에 추가합니다.

```
image/webp webp;
```

참고: Vincent Orback은 레퍼런스용 WebP 제공을 위한 샘플 [htaccess
config](https://github.com/vincentorback/WebP-images-with-htaccess)를 보유하고 있으며, Ilya Grigorik는
유용한 [WebP 제공을 위한
스크립트](https://github.com/igrigorik/webp-detect) 컬렉션을
보유하고 있습니다.


**`<picture>` 태그 사용**

브라우저가 자체적으로 어떤 이미지 형식을 표시할지 선택할 수 있습니다. 이때
`<picture>` 태그를 사용합니다. `<picture>` 태그는 단일 `<img>`
태그가 있는 여러 `<source>` 요소를 활용합니다. 이것은 
이미지가 담긴 실제 DOM 요소입니다. 브라우저는 해당 소스를 순환하고 첫 번째로 매칭되는 것을 가져옵니다.
`<picture>` 태그가 사용자의 브라우저에서 지원되지 않는다면, `<div>`가
렌더링되고 `<img>` 태그가 사용됩니다.

참고: 순서상 `<source>`의 위치에 주의해야 합니다. 이미지/webp
소스를 레거시 형식 뒤에 두어서는 안되며, 그 앞에 두어야 합니다. 이것을 이해하는 브라우저는
이를 사용하고, 그렇지 않은 브라우저는 더욱 폭넓게 지원되는
프레임워크로 이동합니다. 만약 이미지의 물리적 크기가 모두 동일하다면 이미지를
파일 크기 순으로 배치해도 됩니다(`media` 속성을 이용하지 않을 때).
일반적으로 레거시를 마지막에 놓는 것과 동일한 순서입니다.

다음은 몇 가지 샘플 HTML입니다.

```html
<picture>
  <source srcset="/path/to/image.webp" type="image/webp">
  <img src="/path/to/image.jpg" alt="">
</picture>

<picture>
    <source srcset='paul_irish.jxr' type='image/vnd.ms-photo'>
    <source srcset='paul_irish.jp2' type='image/jp2'>
    <source srcset='paul_irish.webp' type='image/webp'>
    <img src='paul_irish.jpg' alt='paul'>
</picture>

<picture>
   <source srcset="photo.jxr" type="image/vnd.ms-photo">
   <source srcset="photo.jp2" type="image/jp2">
   <source srcset="photo.webp" type="image/webp">
   <img src="photo.jpg" alt="My beautiful face">
</picture>
```

**WebP로의 자동 CDN 변환**

일부 CDN은 WebP로의 자동 변환을 지원하며, WebP 이미지를
제공하기 위해 [언제든지
가능하다면](http://cloudinary.com/documentation/responsive_images#automating_responsive_images_with_client_hints) 클라이언트힌트를 사용할 수 있습니다.
여러분의 CDN를 확인하여 WebP 지원이 서비스에 포함되어 있는지 알아보세요. 쉬운 해결책이
기다리고 있을지도 모릅니다.

**WordPress WebP 지원**

Jetpack — 유명한 WordPress 플러그인인 Jetpack에는
[Photon](https://jetpack.com/support/photon/)이라는 이름의 CDN 이미지 서비스가 포함되어 있습니다. Photon을 이용하면
매끄러운 WebP 이미지 지원을 받을 수 있습니다. Photon CDN는 Jetpack의 무료 단계에 포함되어 있으므로
좋은 가격이며 구현도 자동으로 이루어집니다. 단점은
Photon이 이미지의 크기를 조정하고, URL에 쿼리 문자열을 추가하며, 각 이미지에 추가
DNS 룩업이 필요합니다.

**Cache Enabler 및 Optimizer** — WordPress를 사용하고 있다면
적어도 절반은 오픈소스인 옵션이 있습니다. 이 오픈소스 플러그인 [Cache
Enabler](https://wordpress.org/plugins/cache-enabler/)에는 WebP 이미지를 사용할 수 있으며
현재 사용자의 브라우저가 지원하는 경우 이를 캐싱하는 메뉴 체크박스
옵션이 있습니다. 덕분에 WebP 이미지 제공이 쉬워집니다. 단점은 다음과 같습니다.
Cache Enabler는 Optimizer라고 하는 자매 프로그램을 사용해야 합니다. 이 프로그램은
연간 요금이 있습니다. 이것은 순수한 오픈소스 솔루션으로서 적합하지 않아 보입니다.


**ShortPixel** — 단독으로 혹은 Cache
Enabler와 함께 사용할 수 있는 다른 옵션으로는 ShortPixel이 있습니다(유료). 단독으로 사용할 때 [ShortPixel](https://shortpixel.com)는 
브라우저에 따라 올바른 유형의 이미지를 제공하는 `<picture>` 태그를 
추가할 수 있습니다. 한 달에 최대 100개의 이미지를 무료로 최적화할 수 있습니다.

**애니메이션 GIF 압축 및 `<video>`가 더 나은 이유**

애니메이션 GIF는 매우 제한적인
형식에도 불구하고 여전히 광범위하게 사용되고 있습니다. 소셜 네트워크부터 인기 있는 미디어 사이트까지
상당한 양의 애니메이션 GIF가 삽입되어 있지만, 이 형식은 동영상 저장이나
애니메이션을 위해 고안된 적이 *없습니다*. 실제로, [GIF89a
spec](https://www.w3.org/Graphics/GIF/spec-gif89a.txt)는 "GIF는 애니메이션을 위한
플랫폼으로 제작된 것이 아니다"라고 지적합니다. [색상의 수, 프레임 수
그리고
수치](http://gifbrewery.tumblr.com/post/39564982268/can-you-recommend-a-good-length-of-clip-to-keep-gifs)
모두가 애니메이션 GIF 크기에 영향을 미칩니다. 동영상으로 변경하는 것이 커다란 절감을 제공할 수 있습니다.



<img src="images/animated-gif.jpg" alt="애니메이션 GIF와 동영상의 비교: 서로 다른 형식에 대한 동일한 품질에서의
        파일 크기 비교."
         />
애니메이션 GIF와 동영상의 비교: 서로 다른 형식에 대한 동일한 품질에서의
파일 크기 비교.


**동일한 파일을 MP4 동영상으로 제공하면 보통 파일 크기의
80% 이상을 감소할 수 있습니다.** GIF는 대역폭을 크게 낭비할 뿐만 아니라,
로드하는 데 더 오래 걸리며, 더 적은 색상이 포함되고, 일반적으로 나쁜 사용자
환경을 제공합니다. 여러분은 아마도 Twitter에 업로드한 애니메이션 GIF가 다른 웹사이트보다
더 잘 작동한다는 것을 눈치채셨을 것입니다. [Twitter의 애니메이션 GIF는
사실 GIF가 아닙니다](http://mashable.com/2014/06/20/twitter-gifs-mp4/#fiiFE85eQZqW).
사용자 환경을 향상하고 대역폭 소비를 줄이기 위해, Twitter에 업로드된
애니메이션 GIF는 사실 동영상으로 변환됩니다. 마찬가지로, [Imgur도
GIF가 업로드되면
동영상으로 변환](https://thenextweb.com/insider/2014/10/09/imgur-begins-converting-gif-uploads-mp4-videos-new-gifv-format/)하여
, 여러분을 위해 조용히 MP4로 변환합니다.

왜 GIF는 훨씬 더 큰가요? 애니메이션 GIF는 각 프레임을 무손실 GIF
이미지로 저장합니다. 우리가 종종 경험하는 열화된 품질은 GIF의
색상 팔레트가 256색으로 제한되어 있기 때문입니다. 이 형식은 H.264와 같은 동영상 코덱과 달리 인근 프레임을 압축 대상으로
고려하지 않기 때문에 크기가 큽니다. MP4
동영상은 각 키 프레임을 손실 JPEG로 저장합니다. 손실 JPEG는
원본 데이터의 일부를 삭제하여 더 나은 압축을 달성합니다.

**동영상으로 변경할 수 있다면**

*   [ffmpeg](https://www.ffmpeg.org/)를 이용하여 애니메이션 GIF(또는
    소스)를 H.264 MP4로 변환하세요. 이 한 줄 코드는 [
    Rigor](http://rigor.com/blog/2015/12/optimizing-animated-gifs-with-html5-video)에서 가져온 것입니다.
    `ffmpeg -i animated.gif -movflags faststart -pix_fmt yuv420p -vf
    "scale=trunc(iw/2)*2:trunc(ih/2)*2" video.mp4`
*   ImageOptim API도 [애니메이션 gif에서 WebM/H.264
    동영상으로의 변환](https://imageoptim.com/api/ungif)을 지원하며 [GIF에서 디더링을
    제거](https://github.com/pornel/undither#examples)하여 동영상
    코덱이 더욱 압축할 수 있도록 도와줍니다.

**반드시 애니메이션 GIF를 사용해야 한다면**

*   Gifsicle과 같은 도구로 메타데이터, 사용되지 않은 팔레트 엔트리를 제거하고
    프레임 간 변화를 최소화할 수 있습니다.
*   손실 GIF 인코더를 고려해 보세요. Gifsicle의
 포크인 [Giflossy](https://github.com/pornel/giflossy)가
    `—lossy` 플래그로 이것을 지원하며    크기를 최대 60~65% 줄일 수 있습니다. 이를 기반으로 한
    [Gifify](https://github.com/vvo/gifify)라는 좋은 도구도 있습니다. 비애니메이션 GIF는
    PNG나 WebP로 변환하세요.

더 많은 정보는 Rigor의 [Book of
GIF](https://rigor.com/wp-content/uploads/2017/03/TheBookofGIFPDF.pdf)를 참조하세요.

## SVG 최적화 {: #svg-optimization }

SVG를 가볍게 유지하려면 불필요한 것을 삭제해야 합니다. 편집기로 생성된 SVG 파일은
보통 대량의 불필요한 정보(메타데이터,
주석, 숨겨진 레이아웃 등)를 담고 있습니다. 이 콘텐츠는
렌더링된 최종 SVG에 영향을 미치지 않고도
안전하게 제거하거나 더 미니멀한 양식으로 전환할 수 있습니다.


<img src="images/Modern-Image26.jpg" alt="svgo"
         />
Jake Archibald의 [SVGOMG](https://jakearchibald.github.io/svgomg/)는 최적화를 선택하여 SVG를 원하는 대로 최적화할 수 있는 GUI
인터페이스이며,
출력된 마크업의 라이브 미리보기를 제공합니다.


**SVG 최적화의 몇 가지 일반 규칙(SVGO):**

*   SVG 파일을 최소화하고 Gzip으로 압축하세요. SVG는 CSS, HTML, 자바스크립트처럼
    사실 그저 XML로 표현된 텍스트 자산에 지나지 않으며, 성능 향상을 위해
    최소화하고 Gzip으로 압축해야  합니다.
* 경로 대신 `<rect>`, `<circle>`,
  `<ellipse>`, `<line>`, `<polygon>`와 같은 사전 정의된 SVG 도형을 사용하세요. 사전 정의된 도형을 우선적으로 사용하면
  최종 이미지를 생산하는 데 필요한 마크업이 감소하고, 따라서 브라우저가 파싱
  및 래스터링할 코드가 감소합니다. SVG 복잡성을 감소시키면 브라우저가
  더 빠르게 표시할 수 있게 됩니다.
*   반드시 경로를 사용해야 한다면, 커브와 경로를 줄이려고 노력해 보세요. 가능한 경우에는 단순화하고
   결합하세요. Illustrator의 [단순화
    도구](http://jlwagner.net/talks/these-images/#/2/10)는 복잡한 아트워크에서도
    불규칙한 부분을 매끄럽게 하면서 불필요한 지점을 삭제하는
     데 능숙합니다.
*   그룹 사용을 피하세요. 그럴 수 없다면 간소화하세요.
*   보이지 않는 레이어를 삭제하세요.
*   Photoshop이나 Illustrator 효과를 피하세요. 이러한 효과는 큰
   래스터 이미지로 변환됩니다.
*   SVG 친화적이지 않은 모든 삽입된 래스터 이미지를 두 번 클릭하세요
* 도구를 사용하여 SVG를 최적화하세요.
  [SVGOMG](https://jakearchibald.github.io/svgomg/)는 매우 편리한 웹 기반
  GUI로, Jake Archibald가 [SVGO](https://github.com/svg/svgo)용으로 만든 것입니다. 실로 대단히
  귀중한 가치가 있습니다. Sketch를 사용한다면 파일 크기를 줄이기 위해 내보낼 때 SVGO 압축기 플러그인([SVGO 실행용
  Sketch 플러그인](https://www.sketchapp.com/extensions/plugins/svgo-compressor/))을
  사용할 수 있습니다.


<img src="images/svgo-precision.jpg" alt="svgo 정확도 감소는
        때때로 크기에 긍정적인 영향을 미칠 수 있습니다"
         />
고정밀 모드(크기
29% 향상)와 저정밀 모드(크기 38% 향상)에서 SVGO를 통한 SVG 소스 실행 비교 예.



[SVGO](https://github.com/svg/svgo)는 SVG 최적화를 위한 노드 기반 도구입니다.
SVGO는 <path> 정의 내 숫자의 *정밀도*를 낮추어 파일 크기를 줄일 수
있습니다. 점 뒤의 각 숫자는 1바이트를 추가하기 때문에
정밀도(숫자 개수)를 변경하는 것이 파일 크기에 크게 영향을 미칩니다. 형태가 어떻게 보이는가에 영향을 미칠 수 있으므로
정밀도를 변경할 때는
매우 매우 주의해야 합니다.


<img src="images/Modern-Image28.jpg" alt="경로와 아트워크를 너무 단순화시킴으로써
        svgo에 문제가 생길 수 있음"
         />
이전의 예시에서 SVGO는 과도하게 단순화한 경로 및 형태 없이 잘 작동했지만,
그렇지 않은 수 많은 경우가 있다는 것을 알아두어야
합니다. 위 로켓의 빛 스트립이 낮은 정밀도에서 어떻게 왜곡되는지
관찰해 보세요.


**명령 줄에서 SVGO 사용하기:**

SVGO는 [글로벌 npm CLI](https://www.npmjs.com/package/svgo)로 설치할 수 있으며
GUI보다 이것을 사용하는 것이 좋습니다.

```
npm i -g svgo
```

이렇게 하면 로컬 SVG 파일에 대해 다음과 같이 실행됩니다.

```
svgo input.svg -o output.svg
```

이것은 플로팅 지점
정확도와 같은 예상하는 모든 옵션을 지원합니다.

```
svgo input.svg --precision=1 -o output.svg
```

SVGO [readme](https://github.com/svg/svgo)를 확인하여 지원되는 옵션의
전체 목록을 확인하세요.

**SVG 압축을 잊지 마세요!**


<img src="images/before-after-svgo.jpg" alt="이미지를 SVGO에
        실행시키기 전과 후"
         />
이전의 예시에서 SVGO는 과도하게 단순화한 경로 및 형태 없이 잘 작동했지만,
그렇지 않은 수 많은 경우가 있다는 것을 알아두어야
합니다. 위 로켓의 빛 스트립이 낮은 정밀도에서 어떻게 왜곡되는지
관찰해 보세요.


또한, [SVG
자산을 Gzip으로 압축](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)하거나
Brotli를 사용하여 제공하는 것도 잊지 마세요. 텍스트 기반이기 때문에
정말 잘 압축됩니다(원본 소스의 최대 50%까지)

Google이 새 로고를 제공했을 때,
[가장 작은](https://twitter.com/addyosmani/status/638753485555671040) 버전이
단 305바이트 크기라고 발표했습니다.


<img src="images/Modern-Image30.jpg" alt="새 google
        로고의 가장 작은 버전은 단 305바이트 크기였습니다"
         />


더욱 크기를 절감할 수 있는(146바이트까지) [수많은 고급 SVG
방법](https://www.clicktorelease.com/blog/svg-google-logo-in-305-bytes/)이
있습니다! 도구든 메뉴얼
클린업이든, *조금*이라도 더 SVG에서 절감할 수 있는 부분이
있을 것이라고만 말해두겠습니다.

**SVG 스프라이트**

SVG는
아이콘 폰트에 필요한
[유별난](https://www.filamentgroup.com/lab/bulletproof_icon_fonts.html)
해결 방법 없이도 스프라이트로 시각화를 나타내는 방법을 제공하기 때문에 아이콘에 [강력](https://css-tricks.com/icon-fonts-vs-svg/)합니다. 아이콘 폰트(SVG 스트로크 속성)보다 더 세부적인 CSS 스타일링 제어를 보유하며,
위치 지정 제어에 더 우수하고(의사 요소
및 CSS `display`에 편법을 사용할 필요가 없음), SVG에 훨씬 더
[접근하기 쉽습니다](http://www.sitepoint.com/tips-accessible-svg/).

[svg-sprite](https://github.com/jkphl/svg-sprite) 및
[IcoMoon](https://icomoon.io/)과 같은 도구는 SVG와 스프라이트 결합을 자동화할
수 있으며, 이는 [CSS 스프라이트](https://css-tricks.com/css-sprites/), [기호
스프라이트](https://css-tricks.com/svg-use-with-external-reference-take-2) 또는
[스택된 스프라이트](http://simurai.com/blog/2012/04/02/svg-stacks)를 통해 이용할 수 있습니다. Una Kravetz는
SVG 스프라이트 워크플로에 gulp-svg-sprite를 이용하는 방법에 관해 읽어볼 만한 실용적인 [기사](https://una.im/svg-icons/#💁)
를 보유하고 있습니다. Sara Soudein도 블로그에서
[아이콘 글꼴에서
SVG로 전환](https://www.sarasoueidan.com/blog/icon-fonts-to-svg/)하는 방법을 다루고 있습니다.

**추가 자료:**

Sara Soueidan의 [tips for optimizing SVG delivery for the
web](https://calendar.perfplanet.com/2014/tips-for-optimising-svg-delivery-for-the-web/)
및 Chris Coyier의 [Practical SVG
book](https://abookapart.com/products/practical-svg)은 훌륭한 글입니다. 또한,
Andreas Larsen의 SVG 최적화 게시물([part
1](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-1-67e8f2d4035),[part
2](https://medium.com/larsenwork-andreas-larsen/optimising-svgs-for-web-use-part-2-6711cc15df46))도 도움이 됩니다. [Preparing
and exporting SVG icons in
Sketch](https://medium.com/sketch-app-sources/preparing-and-exporting-svg-icons-in-sketch-1a3d65b239bb)도
 훌륭한 글입니다.

## 손실 코덱으로 이미지 재압축 삼가기 {: #avoid-recompressing-images-lossy-codecs }

언제나 원본 이미지에서 압축하는 것이 권장됩니다. 이미지 재압축에는
대가가 따릅니다. 이미 60 품질로 압축된
JPEG를 예로 들어보겠습니다. 이 이미지를 손실
인코딩으로 재압축한다면 훨씬 더 나쁘게 보일 것입니다. 압축을 한 번 더 할 때마다
세대 손실이 발생하게 됩니다. 정보가 사라지고 압축 아티팩트가
쌓이기 시작합니다. 고품질 설정으로 재압축을 하는 경우라도 마찬가지입니다.

이러한 함정을 피하려면, **처음부터 납득할 수 있는 가장 낮은 수준의
좋은 품질을 설정**해야 최대 파일 절감을 얻을 수 있습니다. 이렇게 하면
이 함정을 피할 수 있는 까닭은 품질 저하만으로 인한 파일 크기 감소는
항상 보기에 좋지 않기 때문입니다.

손실 허용 파일을 다시 인코딩하면 항상 파일 크기가 작아지는 결과를 보장하지만
그렇다고 생각한 만큼의 품질을 얻을 수 있다는 의미는 아닙니다.


<img src="images/generational-loss.jpg" alt="여러 차례 이미지를 재인코딩할 때 발생하는
        세대 손실"
         />
위의 글과 이 [훌륭한 동영상](https://www.youtube.com/watch?v=w7vXJbLhTyI),
그리고 Jon
Sneyers의 [동반
기사](http://cloudinary.com/blog/why_jpeg_is_like_a_photocopier)에서 여러
형식을 사용한 재압축의 세대 손실 영향을 확인할 수 있습니다. 이것은 소셜 네트워크에서 (이미 압축된) 이미지를 저장하고 다시 업로드(재압축 발생)하는
경우에 마주할 수 있는 문제입니다.
품질 손실은 축적됩니다.



MozJPEG는 (아마도 의도치 않게) 격자 양자화 덕분에 재압축
열화에 대해 더 나은 저항성을 보유합니다. 지금 그대로 모든 DCT
값을 압축하는 대신, +1/-1 범위의 근사값을 확인하여
유사한 값이 더 작은 비트로 압축되었는지 확인합니다. 손실 FLIF는
(재)압축 이전에 데이터를 보고 무엇을 삭제할 지 결정한다는 점에서
손실 PNG와 방법이 유사합니다. 재압축된 PNG는 감지할 수 있는 '구멍'이 있어
데이터를 더 변경하는 것을 방지합니다.

**소스 파일을 편집할 때는 PNG나
TIFF와 같은 무손실 형식으로 저장하여 가능한 한 최고의 품질을 유지해야 합니다.** 빌드 도구나 이미지
압축 서비스는
그 후 최소한의 품질 손실으로 사용자에게 제공하는 압축된 버전 출력을 처리합니다.

## 불필요한 이미지 디코딩 및 크기 조정 비용 절감 {: #reduce-unnecessary-image-decode-costs }

우리 모두가 이전에 사용자에게 필요한 것보다 더 크고 더 높은 해상도의 이미지를
전송한 적이 있습니다. 여기에는 비용이 따릅니다. 이미지 디코딩 및 크기 조절은 평균적인 모바일 하드웨어의 브라우저에게는 비용이 많이 드는
작업입니다. 큰
이미지를 전송하고 CSS나 너비/높이 속성을 이용하여 스케일을 조정하면, 이 문제가
발생하는 것을 볼 수 있으며 성능에 영향을 미칩니다.


<img src="images/image-pipeline.jpg" alt="브라우저가 태그에서 지정된
 이미지를 가져와 이를 화면에 
표시하는 데에는 여러 단계가 관련되어 있습니다. 여기에는 요청, 디코딩, 크기 조절, GPU에 복사, 표시가 포함됩니다."
         />

브라우저가 이미지를 가져올 때 메모리에 비트맵으로 포맷된 원본
소스(예: JPEG)에서 이미지를 디코딩해야 합니다. 이 이미지는 대체로
크기 조절이 필요합니다(예: 너비가 컨테이너의 백분율로 설정됨). 이미지 디코딩
및 크기 조절은 비용이 많이 들고 이미지가
표시되기까지의 시간을 지연시킵니다.


브라우저가 전혀 크기 조절을 할 필요 없이 렌더링할 수 있는 이미지를 전송하는 것이
이상적입니다. 따라서, 대상 화면 크기 및
 해상도에 대해 가장 작은 이미지를 제공하여 [`srcset` 및
`sizes`](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
의 이점을 누려보세요. `srcset`에 대해서는 곧 다루겠습니다.

이미지에서 `width` 또는 `height` 속성을 생략하는 것도 성능에
부정적인 영향을 미칠 수 있습니다. 이런 속성이 없으면 브라우저는 충분한 바이트가 도착하여 올바른
수치를 알 수 있을 때까지
이미지에 대해 작은 자리표시자 영역을 할당합니다. 이때, 비용이 많이 드는 리플로우라는
단계에서 문서 레이아웃이 반드시 업데이트되어야 합니다.


<img src="images/devtools-decode.jpg" alt="chrome devtools에 표시된
        이미지 디코딩 비용"
         />
브라우저는 이미지를 화면에 표시하기까지 수많은 단계를 거쳐야 합니다. 이미지를
가져오는 것뿐만 아니라 디코딩하고 때로는 크기 조절도 해야 합니다. 이러한
이벤트는 Chrome DevTools의
[Timeline](/web/tools/chrome-devtools/evaluate-performance/performance-reference)에서 감사할 수 있습니다.



큰 이미지는 메모리 크기 비용 상승도 발생시킵니다. 디코딩된 이미지는
픽셀당 최대 4바이트입니다. 주의하지 않으면 문자 그대로 브라우저를
다운시킬 수 있습니다. 저사양 기기에서 메모리 스와핑을 시작하는 데 그렇게 오래 걸리지 않습니다.
따라서 이미지 디코딩, 크기 조절, 메모리 비용에 주의하세요.


<img src="images/image-decoding-mobile.jpg" alt="이미지 디코딩은
        저사양이나 평균 수준의 모바일 하드웨어에서 매우 비용을 많이 소모할 수 있습니다."
         />
이미지 디코딩은 저사양이나 평균 수준의 모바일 전화에서 매우 비용을 많이 소모할 수 있습니다.
일부 경우, 디코딩이 5배 더 느릴 수 있습니다(더 길어지지 않는 한).


새로운 [모바일 웹
환경](https://medium.com/@paularmstrong/twitter-lite-and-high-performance-react-progressive-web-apps-at-scale-d28a00e780a3)을 빌드할 때, Twitter는 적절하게
크기가 조절된 이미지를 사용자에게
제공함으로써 디코딩 성능을 향상했습니다. 이 방법은
Twitter 타임라인의 여러 이미지를 디코딩하는 데 걸리는 시간을 최대 400ms에서 최대 19까지 줄였습니다!


<img src="images/image-decoding.jpg" alt="Twitter Lite가
        이미지 파이프라인을 최적화하기 전과 후의 디코딩 시간을 강조표시한 Chrome DevTools Timeline/Performance
        패널. 전이 더 높았습니다."
         />
Twitter Lite가 이미지 파이프라인을 최적화하기 전과 후의 디코딩 시간을
강조표시(초록색)한 Chrome DevTools Timeline/Performance 패널.

### `srcset`를 이용한 HiDPI 이미지 전달 {: #delivering-hidpi-with-srcset }

사용자는 여러분의 사이트에 다양한 모바일 및 고해상도
화면이 있는 데스크탑 기기로 접근할 수 있습니다. [기기 픽셀
비율](https://stackoverflow.com/a/21413366)(DPR)('CSS 픽셀
비율'이라고도 함)은 CSS가 기기 화면 해상도를 해석하는 방법을 결정합니다. DPR은
요소가 너무 작게 보이지 않으면서 모바일 화면의 해상도와
선명도를 향상하기 위해 전화 제조사에서 만든 것입니다.

사용자가 기대하는 이미지 품질에 맞추기 위해, 사용자의 기기에 가장 적절한
해상도의 이미지를 전달합니다. 선명한 고DPR 이미지(예: 2배, 3배)는
이를 지원하는 기기에 제공됩니다. 2배 이상의 이미지는
상당히 더 많은 용량을 차지하므로 낮은 DPR이나 표준 DPR 이미지는
고해상도 화면이 없는 사용자에게 제공되어야 합니다.


<img src="images/device-pixel-ratio.jpg" alt="1배, 2배 및 3배에서 기기 픽셀 비율의
        도표. 이미지 품질은 DPR이 증가하면 선명하게 보입니다.
        그림은 기기 픽셀과 CSS 픽셀 비교를 나타낸 것입니다."
         />
기기 픽셀 비율: 
[material.io](https://material.io/devices/) 및
[mydevice.io](https://mydevice.io/devices/)을 비롯한 여러 사이트가 인기있는 기기의 DPR을 추적합니다.



[srcset](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)를 이용하면
브라우저가 기기에 사용할 수 있는 최고의 이미지를 선택합니다. 예를 들어, 2배의 모바일 화면에는
2배의 이미지를 선택합니다. `srcset`을 지원하지 않는 브라우저는
`<img>` 태그에 지정된 기본 `src`로 돌아갈 수 있습니다.

```
<img srcset="paul-irish-320w.jpg,
             paul-irish-640w.jpg 2x,
             paul-irish-960w.jpg 3x"
     src="paul-irish-960w.jpg" alt="Paul Irish cameo">
```


[Cloudinary](http://cloudinary.com/blog/how_to_automatically_adapt_website_images_to_retina_and_hidpi_devices)
및 [Imgix](https://docs.imgix.com/apis/url/dpr)와 같은 이미지 CDN은 모두 사용자에게 단일 인증 소스에서 최고의 밀도를 제공하기 위한 이미지
밀도 제어를 지원합니다.

참고: 기기 픽셀 비율과 반응형 이미지에 대한 자세한 내용은 이
무료 [Udacity](https://www.udacity.com/course/responsive-images--ud882) 코스
및 [이미지](/web/fundamentals/design-and-ui/responsive/images) 가이드(웹
기본 사항에 있음)를 참조하시기 바랍니다.

[클라이언트
힌트](https://www.smashingmagazine.com/2016/01/leaner-responsive-images-client-hints/)도
반응형 이미지 마크업 내 각 픽셀 밀도 및 형식을 지정하는 대체재를
제공할 수 있다는 것을 알려드립니다. 대신, 클라이언트 힌트는 이 정보를 HTTP 요청에
추가하여 웹 서버가 현재 기기의
화면 밀도에 가장 알맞은 것을 선택할 수 있도록 합니다.

### 아트 디렉션 {: #art-direction }

사용자에게 올바른 해상도를 전달하는 것이 중요하긴 하지만, 일부 사이트에서는
**[아트
디렉션](http://usecases.responsiveimages.org/#art-direction)**에 대해 생각해야 합니다. 사용자가
작은 화면을 사용한다면 잘라내거나, 확대하거나, 제목을 표시하여 이용 가능한 공간을 최대한
활용해야 합니다. 아트 디렉션은
이 글의 범위에 해당하지 않지만,[
Cloudinary](http://cloudinary.com/blog/automatically_art_directed_responsive_images%20)와
같은 서비스는 이것을 가능한 한 자동화하는 API를 제공합니다.


<img src="images/responsive-art-direction.jpg" alt="기기에 따라 잘라내기로
        이미지를 더 보여주거나 더 적게 보여주는 방식을 채택한
        작동 중의 반응형 아트 디렉션"
         />
아트 디렉션: Eric Portis는 반응형 이미지를 아트 디렉션에 사용하는 방법에 대한 훌륭한
[샘플](https://ericportis.com/etc/cloudinary/)을 한데
모았습니다. 이 예는 기본 히어로 이미지의 시각적
특징을 서로 다른 중단점에 적용하여 이용 가능한
공간을 최대한 활용합니다.

## 색상 관리 {: #color-management }

색상에는 최소한 생물학, 물리,
인쇄라는 세 가지의 관점이 있습니다. 생물학에서 색상이란 [지각
현상](http://hubel.med.harvard.edu/book/ch8.pdf)입니다. 물체는 빛을
다양한 파장의 조합으로 반사합니다. 우리 눈의 빛 수용체가
이러한 파장을 우리가 알고 있는 색상이라는 감각으로 해석합니다. 물리학에서 중요한 것은
빛입니다. 빛 주파수와 밝기가 중요합니다. 인쇄에는
색상환, 잉크, 예술적인 모델이 더 중요합니다.

이 세상의 모든 화면과 웹브라우저가 완전히 동일한
색상을 표시하는 것이 이상적입니다. 안타깝게도, 내재된
수많은 불일치로 인해 그렇지 않습니다. 색상 관리를 이용하면 색상 모델, 공간, 프로필을 통해 색상 표시에 대한
타협에 도달할 수 있습니다.

#### 색상 모델 {: #color-models }

[색상 모델](https://en.wikipedia.org/wiki/Gamma_correction)은 적은 수의
원색에서 완전한 범위의 색을 만들어내는 시스템을 말합니다.
여러 유형의 색상 공간이 있으며, 각각은 색상 제어에 다른 매개변수를
사용합니다. 일부 색상 공간은 다른 것에 비해 더 적은 제어 매개변수를 가지고 있습니다.
예를 들어, 그레이스케일은
검은색과 흰색의 명도를 제어하는 단일 매개변수만을 보유합니다.

두 가지의 일반적인 모델은 가산 모델과 감산 모델입니다. 가산 색상
모델(예: RGB. 디지털 표시에 사용됨)은 색상을 나타내는 데 빛을 사용하는 반면, 감산
색상 모델(예: CMYK. 인쇄에 사용됨)은 빛을 제거함으로써 작동합니다.



<img src="images/colors_ept6f2.jpg" alt="sRGB, Adobe RGB 및 ProPhoto RGB" /> 
        RGB에서는 빨간색, 초록색, 파란색 빛이 여러 조합으로 더해져서
        넓은 색상의 스펙트럼을 만들어 냅니다. CYMK(파란색, 빨간색, 노란색
        검은색)은 흰색 종이에서 명도를 감소시키는 여러 색상의
        잉크를 통해 작동합니다.


[색상 모델 및 부분 색상
시스템](https://www.designersinsights.com/designer-resources/understanding-color-models/)에는
HSL, HSV 및
LAB과 같은 다른 색상 모델이나 모드에 대한 우수한 설명이 제공됩니다.

#### 색상 공간 {: #color-spaces }

[색상
공간](http://www.dpbestflow.org/color/color-space-and-color-profiles#space)은
주어진 이미지를 나타낼 수 있는 특정 범위의 색상입니다. 예를 들어,
이미지가 최대 1,670만 가지의 색을 담고 있다면, 다른 색상 공간은
이러한 색상을 더 좁거나 더 넓은 범위로 사용할 수 있도록 합니다. 일부 개발자는 색상 모델과 색상 공간을
동일한 것으로 말합니다.

[sRGB](https://en.wikipedia.org/wiki/SRGB)는 웹을 위한 
[표준](https://www.w3.org/Graphics/Color/sRGB.html) 색상 공간으로 고안되었으며
RGB를 기반으로 합니다. 이것은 일반적으로
가장 작은 공통 분모라고 보는 작은 색상 공간이며, 브라우저 간
색상 관리에 가장 안전한 옵션입니다. 기타 색상 공간(예: Photoshop
및 Lightroom에서 사용되는 [Adobe
RGB](https://en.wikipedia.org/wiki/Adobe_RGB_color_space) 또는 [ProPhoto
RGB](https://en.wikipedia.org/wiki/ProPhoto_RGB_color_space))은 sRGB보다 더 생동감 있는 색상을 표현할 수 있지만
후자는 웹브라우저, 게임, 모니터 어디에서나 사용할 수 있기 때문에
여기에 주로 중점을 둡니다.



<img src="images/color-wheel_hazsbk.jpg" alt="sRGB, Adobe RGB 및 ProPhoto RGB"
        /> 위에서 Gamut(색상 공간이 정의할 수 있는
        색상 범위)의 시각화를 확인할 수 있습니다.


색상 공간은 세 개의 채널로 이루어져 있습니다(빨간색, 초록색, 파란색). 8비트 모드의
각 채널에서 이용할 수 있는 색상은 255가지이며, 총 1,670만 가지의
색상을 제공합니다. 16비트 이미지는 삼 조 가지의 색상을 나타낼 수 있습니다.


<img src="images/srgb-rgb_ntuhi4.jpg" alt="sRGB, Adobe RGB 및 ProPhoto RGB" />
        
[Yardstick](https://yardstick.pictures/tags/img%3Adci-p3)의 이미지를 이용한        sRGB, Adobe RGB 및 ProPhoto RGB의 비교. 이 개념을
        sRGB로 나타내는 것은 매우 어렵습니다. 보이지 않는 색상을 보여줄 수
        없기 때문입니다. sRGB와 넓은 색상 범위에서의 일반 사진은
        가장 채도가 높은 '풍부한' 색상을 제외한 모든 것이 같아야 합니다.


색상 공간의 차이(예: sRGB, Adobe RGB 및 ProPhoto RGB)는
Gamut(색조로 재현할 수 있는 색상의 범위), 광원 및
[감마](http://blog.johnnovak.net/2016/09/21/what-every-coder-should-know-about-gamma/)
곡선입니다. sRGB는 Adobe RGB보다 최대 20% 더 작으며, ProPhoto RGB는 Adobe
RGB보다 최대 [50%
더 큽니다](http://www.petrvodnakphotography.com/Articles/ColorSpace.htm). 위 이미지 소스의 출처는 [Clipping
Path](http://clippingpathzone.com/blog/essential-photoshop-color-settings-for-photographers)입니다.

[Wide-gamut](http://www.astramael.com/)은 sRGB보다 큰 Gamut의
색상 공간을 나타내는 용어입니다. 이러한 유형의 디스플레이는 더욱 흔해지고 있습니다. 그러나
여전히 많은 디지털 디스플레이는 sRGB보다 훨씬 더 좋은 색상 프로필을
표시할 수 없습니다. Photoshop에서 웹용으로 저장할 때
대상 사용자가
고사양의 Wide-gamut 화면을 보유하고 있지 않은 한 'Convert to sRGB’ 이용을 고려해 보세요.

<aside class="key-point"><b>참고:</b>원본 사진으로 작업할 때는
sRGB를 주 색상 공간으로 사용하지 마세요. 대부분의 카메라가 지원하는 색상 공간보다
작으며, 클리핑을 발생시킬 수 있습니다. 대신, 더 큰 색상
공간(예: ProPhoto RGB)에서 작업하고 웹용으로 내보낼 때는 sRGB로 출력하세요.</aside>

**Wide-gamut이 웹 콘텐츠에 적절한 사례가 있나요?**

예. 이미지가 매우 높은 채도의/풍부한/생동감 있는 색상을 담고 있고,
이러한 색상을 지원하는 화면에서 아름답게 보이게 하고 싶은 경우가 해당됩니다. 그러나 실제 사진에서는
이런 일이 거의 일어나지 않습니다. 보통은
sRGB Gamut을 실제로는 벗어나지 않으면서 색상을 변경하여 더 생동감 있게 보이게 하는 것이 쉽습니다.

이것은 사람의 색상 인지가 절대적인 것이 아니라 주변에
상대적이며, 속기 쉽기 때문입니다. 이미지가 형광색
하이라이터 색상을 담고 있다면, Wide-gamut을 사용하는 것이 더 간편합니다.

#### 감마 교정 및 압축 {: #gamma-correction }

[감마 교정](https://en.wikipedia.org/wiki/Gamma_correction)(또는 그냥
감마)은 이미지의 전반적인 명도를 제어합니다. 감마를 변경하면
빨간색에 대한 초록색과 파란색의 비율도 변경됩니다. 감마 교정이 되지 않은 이미지는
색상이 하얗게 바래거나 너무 어둡게 보일 수 있습니다.

동영상 및 컴퓨터 그래픽에서 감마는 데이터
압축과 유사하게 압축에 이용됩니다. 이를 통해 더 적은
비트(12나 16이 아닌 8비트)로 유용한 수준의 명도를 이끌어낼 수 있습니다. 인간의 명도 인지는
물리적 빛의 양에 선형적으로 비례하지 않습니다. 색상을
실제 물리적 모습으로 나타내는 것은 사람의 눈에 대해 이미지를 인코딩할 때는 낭비입니다. 감마
압축은 인간
인지에 근접한 스케일로 명도를 인코딩하는 데 사용됩니다.

감마 압축을 사용하면 유용한 명도 스케일이 8비트 정밀도로
제공됩니다(대부분 RGB 색상에서 0~255 사용). 이것은 색상이
물리와 1:1 관계인 단위를 사용한다면
RGB 값은 1에서 백만이며 0~1,000까지의 값은 구분이 가능하지만
999,000~1,000,000의 값은 동일하게 보일 것이라는 점에서 기인합니다. 어두운 방 안에 촛불 1개만
켜놓고 있다고 상상해봅시다. 두 번째 촛불을 밝히면
방 안이 상당히 밝아지는 것을 느낄 수 있을 것입니다. 세 번째 촛불을 밝히면 더 밝아집니다.
이제 100개의 촛불이 있는 방을 상상해 보세요. 101개, 102개 촛불을 켜더라도,
밝기의 변화를 느끼지 못할 것입니다.

두 경우, 물리적으로는 완전이 동일한 양의 빛이
더해졌는데도 그렇습니다. 눈은 빛이 밝을 때 덜 민감하므로, 감마
압축은 밝기 값을 '압축'하여 물리적으로는 밝기 수준이
덜 정확하지만 사람에 맞추어 스케일이 조정되었기 때문에
사람의 관점에서는 모든 값이 동일하게 정확합니다.

<aside class="key-point"><b>참고:</b> 여기서의 감마 압축/교정은
Photoshop에서 구성하는 이미지 감마 커브와는 다릅니다. 감마
압축이 제대로 작동하면, 전혀 다르게 보입니다.</aside>

#### 색상 프로필 {: #color-profiles }

색상 프로필은 기기의 색상 공간이 무엇인지 설명하는
정보입니다. 이 정보는 여러 색상 공간을 변환하는 데 사용됩니다. 프로필은 이미지가 서로 다른 종류의
화면과 매체에서 가능한 한 동일하게 보이도록
합니다.

[국제
컬러 협회](http://www.color.org/icc_specs2.xalter)(ICC)에서 설명했듯이, 이미지에는 삽입된 색상 프로필이 있어
정확하게 색상이 어떻게 보여야 하는지 나타냅니다. 이것은 다양한 형식(
예: JPEG, PNG, SVG 및
[WebP](/speed/webp/docs/riff_container))에서 지원되며 대부분의
주요 브라우저는 삽입된 ICC 프로필을 지원합니다. 이미지가 앱에서 표시되었을 때
모니터의 성능을 안다면, 이러한 색상은 색상
프로필을 기반으로 조정될 수 있습니다.

<aside class="key-point"><b>참고:</b> 일부 모니터는
sRGB와 유사한 색상 프로필을 보유하여 더 나은 프로필을 표시할 수 없으므로, 대상
사용자의 화면에 따라 이를 삽입하는 것이 의미가 없을 수 있습니다. 여러분의
대상 사용자가 누구인지 확인하세요.</aside>

삽입된 색상 프로필은 이미지의 크기를 과도하게 증가(때때로 100KB 이상)시킬
수 있으므로 삽입에 주의해야 합니다. ImageOptim과 같은 도구는
색상 프로필을 찾으면 실제로 [자동으로](https://imageoptim.com/color-profiles.html) 색상
프로필을 삭제합니다. 반면, ICC 프로필이 파일 크기 감소라는 명목으로
삭제되면 브라우저는 모니터의
색상 공간으로 이미지를 표시하도록 강제되며, 이로 인해 기대한 채도나
대비와 달라질 수 있습니다. 여러분의 사례에 적합하도록 트레이드오프를 평가하세요.

[Nine Degrees Below](https://ninedegreesbelow.com/photography/articles.html)
에 ICC 프로필 색상 관리에 대한 훌륭한 일련의 리소스가 있으니 프로필에 관해
자세히 알아보려면 참조하시기 바랍니다.

#### 색상 프로필 및 웹브라우저 {: #color-profiles }

Chrome의 이전 버전에는 우수한 색상 관리 지원이 없었지만,
2017년에 [색상 교정
렌더링](https://groups.google.com/a/chromium.org/forum/#!topic/blink-dev/ptuKdRQwPAo)을 통해 향상되었습니다.
sRGB가 아닌 화면(신형 Macbook Pro)은 색상을 sRGB에서
화면 프로필로 변환합니다. 즉, 색상이 여러 시스템과 브라우저에서 유사하게
보일 수 있다는 것을 의미합니다. Safari, Edge 및 Firefox도 이제 ICC
프로필을 고려하므로, 다른 색상 프로필을 가진 이미지(예: ICC)도
화면이 Wide-gamut인지와 무관하게 이제 올바르게 표시할 수 있습니다.

참고: 색상이 우리가 웹에서 작업하는 방식의 더 넓은 스펙트럼에
어떻게 적용되는지에 관한 훌륭한 가이드는 [nerd’s guide to color on the web](https://css-tricks.com/nerds-guide-color-web/)(Sarah
Drasner 글)을 참조하세요.

## 이미지 스프라이팅 {: #image-sprites }

[이미지
스프라이트](/web/fundamentals/design-and-ui/responsive/images#use_image_sprites)(또는 CSS 스프라이트)
는 웹에서 오랜 역사를 갖고 있으며,
모든 브라우저에서 지원되고,
슬라이스된 하나의 커다란 이미지로 결합하여 페이지가 로드하는 이미지의 수를 감소시키는 인기 있는 방법이었습니다.


<img src="images/i2_2ec824b0_1.jpg" alt="이미지 스프라이트는 여전히
        많은 프로덕션 사이트에서 사용되며 Google 홈페이지도 마찬가지입니다."
         />
이미지 스프라이트는 여전히 많은 프로덕션 사이트에서 사용되며
Google 홈페이지도 마찬가지입니다.


HTTP/1.x에서 일부 개발자는 HTTP 요청을 줄이기 위해 스프라이팅을 사용했습니다. 이 방법은
수많은 이점이 있지만, 곧
캐시 무효화 문제에
직면할 수 있으므로 주의가 필요합니다. 이미지 스프라이트의 작은 부분이라도 변경하면 사용자 캐시의 전체 이미지가 무효화됩니다.

스프라이팅은 이제 어떤 식으로든 [HTTP/2](https://hpbn.co/http2/) 안티 패턴일 수 있습니다.
HTTP/2에서는
이제 단일 연결 내 다중 요청이 가능해졌으므로 [개별 이미지를
로드](https://deliciousbrains.com/performance-best-practices-http2/)하는 것이 가장 좋을 수 있습니다. 이것이 자신의 네트워크 설정에 맞는지
측정하고 평가하세요.

## 중요하지 않은 이미지 지연 로드 {: #lazy-load-non-critical-images }

지연 로딩은 사용자가 이미지를 봐야 할 때까지 브라우저 내 이미지 로딩을
지연하는 웹 성능 패턴입니다. 한 예로, 스크롤을 하면
이미지가 온디맨드로 비동기 로드됩니다. 이 방식은 이미지 압축 전략의
바이트 절감을 한층 향상할 수 있습니다.



<img src="images/scrolling-viewport.jpg" alt="이미지 지연 로딩"
         />


반드시 '첫 화면에서' 보여야 하거나 웹페이지가 처음 나타냈을 때의 이미지는
바로 로드됩니다. '스크롤을 내려야 보이는' 이미지는
아직 사용자가 볼 수 없습니다. 이러한 이미지는 즉시 브라우저에
로드되지 않습니다. 사용자가
스크롤을 내려 표시해야 할 때만 추후에 로드(지연 로드)됩니다.

지연 로딩은 아직 브라우저 자체에서 기본 지원되지 않습니다(과거에
이에 관한
[논의](https://discourse.wicg.io/t/a-standard-way-to-lazy-load-images/1153/10)는
있었습니다). 대신, 자바스크립트를 이용하여 이 성능을 추가합니다.

**지연 로딩이 유용한 이유는 무엇인가요?**

필요할 때만 이미지를 '지연' 로딩하는 것에는 여러 이점이 있습니다.

* **데이터 소비 감소**: 사용자가 모든
  이미지를 사전에 가져와야 할 것이라고 가정하지 않으므로, 최소한의 리소스만
  로딩합니다. 이것은 특히 제한적인 데이터 요금을 사용하는
  모바일에서 언제나 좋은 일입니다.
* **배터리 소모 감소**: 사용자 브라우저의 작업 부하가 더 적어
  배터리 수명을 절감할 수 있습니다.
* **향상된 다운로드 속도**: 이미지가 많은
  웹사이트의 전체 페이지 로드 시간을 수 초에서 거의 순식간으로 감소시키면
  사용자 환경을 엄청나게 향상합니다. 사실상, 이것은 여러분의
  웹 사이트에 머물며 즐거운 시간을 보내는 사용자와 또 하나의 이탈 통계치를 가르는 것입니다.

**그러나 다른 모든 도구처럼, 커다란 힘에는 커다란 책임이 따릅니다.**

**첫 화면에 표시되는 이미지의 지연 로딩을 삼가세요** 긴 이미지 목록(예: 제품)이나
사용자 아바타 목록에 사용하세요. 기본 페이지의 히어로
이미지에 사용하지 마세요. 첫 화면에 나타나는 이미지의 지연 로딩은 기술적으로나
인지적으로나 로딩을 눈에 띄게 느리게 할 수 있습니다. 이렇게 하면 브라우저의 프리로더가 중지되어
프로그레시브 로딩과 자바스크립트가 브라우저에 추가 작업을 생성합니다.

**스크롤링 시 이미지 지연 로딩에 유의하세요.** 사용자가 스크롤할 때까지
기다리면, 이전에 스크롤한 적이 없는 경우 자리표시자가 표시된 다음 나중에 이미지를
가져옵니다. 첫 화면의 이미지가 로드된 후
지연 로딩을 시작하여 사용자 상호작용과는
독립적으로 모든 이미지를 로딩하는 것이 권장됩니다.

**어떤 사람이 지연 로딩을 사용하나요?**

지연 로딩의 예는 많은 이미지를
호스팅하는 대부분의 주요 사이트에서 볼 수 있습니다. 몇 가지 주목할만한 사이트는 [Medium](https://medium.com/)과
[Pinterest](https://www.pinterest.com/)입니다.


<img src="images/Modern-Image35.jpg" alt="medium.com의
        이미지에 대한 인라인 미리보기"
         />
medium.com의 이미지에 대한 가우시안 블러 인라인 미리보기 예시


많은 사이트(예: Medium)는 작은 가우시안 블러 인라인
미리보기(수 백 바이트)를 표시합니다. 일단 전체 품질의 이미지를 가져오면 이것으로
변환(지연 로드)됩니다.

José M. Pérez는 [CSS
필터](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)를 사용하여
Medium 효과를 구현하는 방법을 작성하고, 이러한 자리표시자를 지원하기 위해 [여러
이미지 형식](https://jmperezperez.com/webp-placeholder-images/)을
실험했습니다. Facebook 또한
[커버
사진](https://code.facebook.com/posts/991252547593574/the-technology-behind-preview-photos/)의
 이러한 자리표시자를 위한 유명한 200바이트 접근 방식에 관해 읽어볼 만한 글을 작성했습니다. Webpack 사용자라면 [LQIP
로더](https://lqip-loader.firebaseapp.com/)가 이러한 작업을
일부 자동화하는 데 도움을 줄 것입니다.

사실상, 가장 좋아하는 고해상도 사진 소스를 검색하고
페이지를 스크롤할 수 있습니다. 거의 대부분의 경우, 웹사이트가
한 번에 단 몇 개의 전체 해상도 이미지만을 로드하며 나머지는
자리표시자 색상이나 이미지인 것을 경험할 것입니다. 계속 스크롤하면, 자리표시자 이미지가
전체 해상도 이미지로 대체됩니다. 지연 로딩이 작동한 것입니다.

**페이지에 지연 로딩을 적용하려면 어떻게 해야 하나요?**

지연 로딩에 이용할 수 있는 수많은 기술과 플러그인이 있습니다. 저는
Alexander Farkas의 [lazysizes](https://github.com/aFarkas/lazysizes)를
추천합니다. 우수한 성능, 기능,
[Intersection Observer](/web/updates/2016/04/intersectionobserver)로의 선택적 통합,
플러그인 지원을 갖추고 있기 때문입니다.

**Lazysizes로 무엇을 할 수 있나요?**

Lazysizes는 자바스크립트 라이브러리입니다. 구성이 필요하지 않습니다. 최소화된
js 파일을 다운로드하고 웹페이지에 포함시키세요.


다음은 README 파일에서 가져온 몇 가지 예시 코드입니다.

data-src
및/또는 data-srcset 속성과 함께 'lazyload' 클래스를 image/iframes에 추가하세요.

선택적으로 저품질의 이미지에 src 속성을 추가할 수도 있습니다.

```html
<!-- non-responsive: -->
<img data-src="image.jpg" class="lazyload" />

<!-- responsive example with automatic sizes calculation: -->
<img
    data-sizes="auto"
    data-src="image2.jpg"
    data-srcset="image1.jpg 300w,
    image2.jpg 600w,
    image3.jpg 900w" class="lazyload" />

<!-- iframe example -->

<iframe frameborder="0"
    class="lazyload"
    allowfullscreen=""
    data-src="//www.youtube.com/embed/ZfV-aYdU4uE">
</iframe>
```

이 책의 웹 버전을 위해 온디맨드 반응형 이미지에 대해 Lazysizes(다른 대체재를 사용해도
됩니다)와 Cloudinary를 쌍으로 묶었습니다. 그 덕분에 여러 스케일 값, 품질, 형식,
최소한의 노력으로
프로그레시브 로드가 가능한지 자유롭게 실험할 수 있었습니다.


<img src="images/cloudinary-responsive-images.jpg" alt="Cloudinary는
        이미지 품질, 형식, 여러 다른 기능의 온디맨드 제어를 지원합니다."
         />


**Lazysizes 기능에는 다음이 포함됩니다.**

* 자동으로 현재 및 향후 지연 로드
  요소의 가시성 변화 검색
* 표준 반응형 이미지 지원(picture 및 srcset) 포함
* 미디어 쿼리 기능에 자동 크기 계산 및 별명 추가
* CSS 및 JS가 많이 포함된 페이지나 웹
  앱에서 수백 개의 image/iframe 사용 가능
* 확장 가능: 플러그인 지원
* 가벼우면서도 노련한 솔루션 제공
* SEO 향상: 크롤러에서 이미지/자산을 숨기지 않음

**더 많은 지연 로딩 옵션**

Lazysizes가 유일한 선택지는 아닙니다. 다음은 더 많은 지연 로딩 라이브러리입니다.

*   [Lazy Load XT](http://ressio.github.io/lazy-load-xt/)
*   [BLazy.js](https://github.com/dinbror/blazy)(또는 [Be]Lazy)
*   [Unveil](http://luis-almeida.github.io/unveil/)
*   [yall.js (Yet Another Lazy Loader)](https://github.com/malchata/yall.js)
    최대 1KB이며 지원되는 경우에는 Intersection Observer 사용.

**지연 로딩의 문제는 무엇인가요?**

*   스크린 리더, 일부 검색봇, 자바스크립트를 사용하지 않는 모든 사용자는
   자바스크립트로 로드된 이미지를 볼 수 없습니다. 그러나 이 문제는
   `<noscript>` 폴백으로 우회할 수 있습니다.
*   이미지를 언제 로드할 지 결정하는 데 사용하는 스크롤 리스너는
   브라우저 스크롤 성능에 악영향을 미칠 수 있습니다. 브라우저가
   여러 번 다시 그리게 하거나, 크롤에 대한 프로세스를 느리게 할 수 있습니다.
   그러나, 스마트 지연 로딩 라이브러리가 스로틀링을 이용해 이 문제를 완화합니다.
    가능한 해결 방법 중 하나는
    lazysizes에서 지원되는 Intersection Observer입니다.

이미지 지연 로딩은 대역폭 감소, 비용
감소, 사용자 환경 향상을 위해 널리 사용되는 패턴입니다. 여러분의
환경에 적합한지 평가해 보세요. 더 읽어보려면 [이미지
지연 로딩](https://jmperezperez.com/lazy-loading-images/) 및[Medium의
프로그레시브
로딩 구현](https://jmperezperez.com/medium-image-progressive-loading-placeholder/)을 확인하세요.

## display:none의 함정 피하기 {: #display-none-trap }

이전 반응형 이미지 솔루션은 CSS `display` 속성을 설정할 때 브라우저가 이미지
요청을 처리하는 방법을 잘못 이해하고 있었습니다. 이로 인해 예상한 것보다 훨씬 더 많은
이미지가 요청됩니다. 이것이
`<picture>` 및 `<img srcset>`가 반응형 이미지 로딩에 선호되는 이유입니다.

특정 중단점에서 이미지를 `display:none`로
설정하는 미디어 쿼리를 작성한 적이 있나요?

```html
<img src="img.jpg">
<style>
@media (max-width: 640px) {
    img {
        display: none;
    }
}
</style>
```

또는 `display:none`클래스를 사용하여 숨길 이미지를 설정/해제한 적이 있습니까?

```html
<style>
.hidden {
  display: none;
}
</style>
<img src="img.jpg">
<img src=“img-hidden.jpg" class="hidden">
```

Chrome DevTools Network 패널에 대한 빠른 확인을 통해,
이러한 접근 방식을 사용하는 숨겨진 이미지를 가져올 것이라고 예상하지 않을 때에도 가져오는지
확인할 수 있습니다. 이 동작은 사실 삽입된 리소스 사양에 따라 교정됩니다.


<img src="images/display-none-images.jpg" alt="여전히 가져오기 작업이 이루어지는
        display:none으로 숨겨진 이미지"
         />


**`display:none`이 image `src`에 대한 요청 트리거를 회피하나요?**

```html
<div style="display:none"><img src="img.jpg"></div>
```

아닙니다. 이 지정된 이미지는 여전히 요청을 받습니다. 자바스크립트가 src를
변경하기 전에 이미지가 요청되므로 여기서 라이브러리는
display:none에 의존할 수 없습니다.

**`display:none`이 `background: url()`에 대한 요청 트리거를 회피하나요?**

```html
<div style="display:none">
  <div style="background: url(img.jpg)"></div>
</div>
```

예. 요소가 파싱되자마자 CSS 백그라운드를 불러오지 않습니다. `display:none`이 있는 하위 요소에 대한
CSS 스타일 연산은 이 문서의 렌더링에 영향을 미치지 않으므로
유용성이 떨어집니다. 하위 요소의 배경 이미지는
연산되거나 다운로드되지 않습니다.

Jake Archibald의 [Request Quest](https://jakearchibald.github.io/request-quest/)에는
반응형 이미지 로딩에 `display:none`을 사용하는
함정에 관한 훌륭한 퀴즈가 담겨있습니다. 특정 브라우저의 이미지 요청 로딩 처리에
의심이 들면, DevTools을 열고 직접 확인해 보세요.

또한, 가능하면
`display:none`에 의존하기보다 `<picture>` 및 `<img srcset>`를 사용하세요.

## 이미지 처리 CDN이 적합합니까? {: #image-processing-cdns }

*자체적인 이미지 처리
파이프라인을 설정하기 위해 블로그 게시물을 읽거나 구성을 변경하는 데 소요하는 시간이 서비스 요금보다 더 클 수 있습니다. 
[Cloudinary](http://cloudinary.com/)에서 무료 서비스를 제공하고,
[Imgix](https://www.imgix.com/) 무료 체험판과
[Thumbor](https://github.com/thumbor/thumbor)가 OSS 대체재 역할을 할 수 있으니
자동화에 이용할 수 있는 선택지는 많은 편입니다.*

최적의 페이지 로드 시간을 달성하기 위해 이미지 로딩을 최적화해야 합니다.
이러한 최적화에는
반응형 이미지 전략이 필요하며, 온서버 이미지 압축, 최적의 형식 자동 선택, 반응형
크기 조정의 이점을 누릴 수 있습니다. 중요한 것은 올바르게 크기가 조정된 이미지를 적절한 기기에
적절한 해상도로 가능한 한 빠르게 전달하는 것입니다. 이것은 생각보다
쉬운 일이 아닙니다.

**자체 서버와 CDN 사용 비교**

이미지 조작의 복잡성과 끊임없이 진화하는 특성으로 인해,
이 분야에 숙련된 분의 말을 인용한 다음
제안으로 넘어가보려 합니다.

"이미지 조작을 판매하는 것이 아니라면 직접 하지 마세요.
Cloudinary[편집자주: 또는 imgix]와 같은 서비스가 더 효율적으로
여러분보다 더 잘 수행하니, 이를 이용하세요. 비용이 걱정된다면
이것이 개발과 유지, 호스팅, 저장용량,
전달에 얼마나 많은 비용이 들지 생각해 보세요." — [Chris
Gmyr](https://medium.com/@cmgmyr/moving-from-self-hosted-image-service-to-cloudinary-bd7370317a0d)


현재로서는 여기에 동의하고
이미지 처리에 CDN 사용을 고려하도록 제안할 겁니다. 두 가지 CDN을 검토하여
이전에 언급했던 작업 목록에 대해 어떤 차이가 있는지 확인해 보겠습니다.

**Cloudinary 및 imgix**

[Cloudinary](http://cloudinary.com/) 및 [imgix](https://www.imgix.com/)는
입지를 굳힌 두 가지 이미지 처리 CDN입니다. Netflix와 Red Bull을 비롯한
전 세계 수 천 수 백만의 개발자와 회사가 이것을 선택했습니다. 더 자세히
살펴보겠습니다.

**기본은 무엇인가요?**

이런 서비스처럼 서버 네트워크를 소유하고 있지 않는 한, 여러분의 자체 해결 방법을 실행하는 것 보다 훨씬 큰 첫 번째 이점은
사용자에게 근접한 이미지의 사본을 가져오는 분산 글로벌
네트워크 시스템을 이용한다는 것입니다. 또한, CDN은
손쉽게 트렌드 변화에 맞추어 이미지 로딩 전략을 
'향후 사용에 알맞도록' 할 수 있습니다. 이것을 직접 하려면 유지관리, 떠오르는 형식에 대한 브라우저 지원 추적, 이미지 압축 커뮤니티
팔로잉이 필요합니다.

두 번째로, 각 서비스는 단계별 요금제가 있습니다. Cloudinary는 [무료
단계](http://cloudinary.com/pricing)를 제공하며, imgix는 기본 단계를
고용량 프리미엄 요금제에 비해 비싸지 않은 가격으로 제공합니다. Imgix는 서비스에 신용카드를 등록하면 무료
[체험판](https://www.imgix.com/pricing)을 제공하므로
무료 단계와 거의 같은 수준입니다.

세 번째로, 두 서비스 모두 API 액세스를 제공합니다. 개발자는 프로그래밍 방식으로
CDN에 접근하고 처리를 자동화할 수 있습니다. 클라이언트 라이브러리, 프레임워크
플러그인, API 문서도 이용할 수 있습니다(일부 기능은
더 높은 유료 단계로 제한됩니다).

**이미지 처리를 해 봅시다**

잠시 논점을 정적 이미지로 제한해 봅시다. Cloudinary와 Imgix
모두 다양한 이미지 조작 방법을 제공하며, 기본 및 무료 요금제에서
압축, 크기 조정, 잘라내기, 썸네일 이미지 생성과 같은
기본 기능을 지원합니다.


<img src="images/Modern-Image36.jpg" alt="cloudinary 미디어 라이브러리"
         />
Cloudinary 미디어 라이브러리 기본적으로 Cloudinary는 [비 프로그레시브
JPEG](http://cloudinary.com/blog/progressive_jpegs_and_green_martians)를 인코딩합니다. 이 형식을 생성하려면
'More options'의 'Progressive' 옵션을 선택하거나
'fl_progressive' 플래그를 전달합니다.


Cloudinary는 [7가지 방대한 이미지
변환](http://cloudinary.com/documentation/image_transformations)
범주를 제공하며 그 안에 총 48가지의 하위 카테고리가 있습니다. Imgix는 
[100가지 이상의 이미지 처리
작업](https://docs.imgix.com/apis/url?_ga=2.52377449.1538976134.1501179780-2118608066.1501179780)을 내세웁니다.

**기본값은 무엇입니까?**

*   Cloudinary는 다음의 최적화를 기본값으로 수행합니다.
*   [MozJPEG를 이용하여 JPEG
    인코딩](https://twitter.com/etportis/status/891529495336722432)(기본으로
    Guetzli에 대해)
*   변환된 이미지 파일에서 모든 관련 메타데이터 제거(원본
    이미지는 그대로). 이 동작을 재정의하고
   메타데이터가 변형되지 않은 변환된 이미지를 전달하려면, `keep_iptc` 플래그를 추가합니다.
*   자동 품질로 WebP, GIF, JPEG, 및 JPEG-XR 생성 가능. 이
   기본 조정을 재정의하려면, 변형 시
   품질 매개변수를 설정하세요.
*   
    [최적화](http://cloudinary.com/documentation/image_optimization#default_optimizations)
    알고리즘    실행을 통해 PNG, JPEG 또는 GIF 형식으로    이미지 생성 시 시각적 품질에
대한 최소한의 영향으로 파일 크기 최소화.

Imgix에는 Cloudinary와 같은 최적화 기본값이 없습니다. 그러나
설정이 가능한 이미지 품질 기본값은 있습니다. imgix의 경우,
자동 매개변수가 이미지 카탈로그 전체의 최적화 수준의 기준선을 자동화하는 데 도움을 줍니다.

현재 [네 가지
방법](https://docs.imgix.com/apis/url/auto)이 있습니다.

*   압축
*   시각적 개선
*   파일 형식 변환
*   적목 현상 제거

Imgix는 다음의 이미지 형식을 지원합니다. JPEG, JPEG2000, PNG, GIF, 애니메이션
GIF, TIFF, BMP, ICNS, ICO, PDF, PCT, PSD, AI

Cloudinary는 다음의 이미지 형식을 지원합니다. JPEG, JPEG 2000, JPEG XR, PNG,
GIF, 애니메이션 GIF, WebP, 애니메이션 WebP, BMPs, TIFF, ICOs, PDF, EPS, PSD, SVG, AI,
DjVu, FLIF, TARGA.

**성능은 어떤가요?**

CDN 제공 성능은 대부분
[지연 시간](https://docs.google.com/a/chromium.org/viewer?a=v&pid=sites&srcid=Y2hyb21pdW0ub3JnfGRldnxneDoxMzcyOWI1N2I4YzI3NzE2)과
속도에 관한 것입니다.

지연 시간은 언제나 전혀 캐시되지 않은 이미지에서 다소 증가합니다. 그러나
일단 이미지가 캐시되고 네트워크 전역에 배포되면,
글로벌 CDN이 사용자로 이어지는 가장 짧은 길을 찾을 수 있다는 사실과 적절하게 처리된 이미지의 용량 절감 덕분에,
불량하게 처리된 이미지나 전 지구에 도달하려고 노력하는 단독 서버에 비해
거의 항상 지연 시간 문제를
완화할 수 있습니다.

두 서비스 모두 빠르고 넓은 CDN을 이용합니다. 이 구성은 지연 시간을 감소시키고
다운로드 속도를 향상합니다. 다운로드 속도는 페이지 로드 시간에 영향을 미치며, 사용자 환경과 전환 모두에 가장 중요한
측정항목 중 하나입니다.

**그래서 어떤 점이 다릅니까?**

Cloudinary는 Netflix, eBay, Dropbox를 비롯한 [16만 고객](http://cloudinary.com/customers)을
보유하고 있습니다. Imgix는 얼마나 많은 고객을 보유하는지 보고하지 않지만,
Cloudinary보다는 적습니다. 그렇다고 하더라도, imgix의
기반층은 Kickstarter, Exposure, unsplash, Eventbrite와 같은 무거운 이미지를 이용하는 사용자를 포함합니다.

이미지 조작에는 제어할 수 없는 너무 많은 변수가 있으므로
성능이 막상막하인 두 서비스의 비교는 어렵습니다. 따라서,
최종 출력물에 필요한 크기와 해상도(속도와 다운로드 시간에 영향 미침)는 무엇인지 등, 이미지 처리에
필요한 방법에 따라 많은 것이 달라집니다. 여기에 소요되는 시간은
크게 다를 수 있습니다. 비용은 궁극적으로 여러분에게 가장 중요한
요인일 수 있습니다.

CDN은 비용이 듭니다. 트래픽이 높고 이미지가 많은 사이트는 CDN 요금으로
한 달에 미화 수백 달러가 들 수 있습니다. 이 서비스를 최대한 이용하려면 일정 수준의 사전
지식과 프로그래밍 능력이 필요합니다.
너무 멋진 것을 할 생각이 아니라면 아무
문제도 없을 것입니다.

그러나 이미지 처리 도구나 API로 작업하는 것이 불편하다면,
약간의 학습이 필요합니다. CDN
서버 위치를 수용하려면, 로컬 링크의 일부 URL을 변경해야 합니다. 올바르고
성실하게 해 보세요 :)

**결론**

자체 이미지를 제공 중이거나 그럴 계획이라면, CDN을 고려해보는 것이
좋습니다.

## 이미지 자산 캐싱 {: #caching-image-assets }

리소스는 [HTTP 캐시
헤더](/web/fundamentals/performance/optimizing-content-efficiency/http-caching#cache-control)를 이용하여 캐싱 정책을 지정할 수 있습니다.
구체적으로는, 누가 캐시 응답을 얼마나 오랫동안 할 것인지 `Cache-Control`로 정의할 수
있습니다.

여러분이 사용자에게 전달하는 대부분의 이미지는 미래에 [변하지
않을](http://kean.github.io/post/image-caching) 정적 자산입니다. 이러한 자산의 가장 좋은
캐싱 전략은 공격적 캐싱입니다.

HTTP 캐싱 헤더를 설정할 때,
Cache-Control을 max-age로 설정하세요(예: `Cache-Control:public; max-age=31536000`). 이러한 유형의 공격적
캐싱은 대부분의 이미지 유형에서 잘 작동되며, 특히 아바타나 이미지 헤더와 같은
긴 수명의 이미지에 좋습니다.

참고: PHP를 사용하여 이미지를 제공하면
기본
[session_cache_limiter](http://php.net/manual/en/function.session-cache-limiter.php)
설정으로 인해 캐싱을 파괴할 수 있습니다. 이것은 이미지 캐싱 입장에서는 재난에 가까우며 이를 [우회
](https://stackoverflow.com/a/3905468)하려면
session_cache_limiter('public')를 설정하여 `public, max-age=`를 설정하는 것이 좋습니다. 사용자설정
cache-control 헤더를 설정하거나 중지하는 것도 좋습니다.

## 주요 이미지 자산 미리 로딩 {: #preload-critical-image-assets }

주요 이미지 자산은 [`<link
rel=preload>`](https://www.w3.org/TR/preload/)를 이용하여 미리 로드할 수 있습니다.

`<link rel=preload>`는 선언적 가져오기이며, 브라우저가 문서의 `onload` 이벤트를 차단하지 않고 리소스에 대한 요청을 생성하도록
강제할 수 있습니다.
추후 문서 파싱 프로세스에 이르러서야 발견되는 리소스에 대한
요청 우선순위를 상승시킬 수 있습니다.

이미지는 `image`의 `as` 값을 지정하여 미리 로드할 수 있습니다.

```html
<link rel="preload" as="image" href="logo.jpg"/>
```

`<img>`, `<picture>`, `srcset` 및 SVG에 대한 이미지 리소스는 모두
이 최적화의 이점을 누릴 수 있습니다.

참고: `<link rel="preload">`는 Chrome 및 Opera, [Safari Tech
Preview](https://developer.apple.com/safari/technology-preview/release-notes/)
와 같은 블링크 기반 브라우저에서 [지원](http://caniuse.com/#search=preload)
되며 Firefox에서 [구현](https://bugzilla.mozilla.org/show_bug.cgi?id=1222633)
되었습니다.

[Philips](https://www.usa.philips.com/),
[FlipKart](https://www.flipkart.com/) 및 [Xerox](https://www.xerox.com/)와 같은 사이트는
`<link rel=preload>`를 사용하여 주 로고 자산을 미리 로드합니다(문서 초반에
주로 사용됨). [Kayak](https://kayak.com/)도 preload를 사용하여 헤더의 히어로
이미지가 가능한 한 빠르게 로드되도록 합니다.


<img src="images/preload-philips.jpg" alt="Philips는 link rel=preload를 이용하여
        로고 이미지를 사전로드합니다"
         />


**Link preload 헤더란 무엇인가요?**

미리 로드 링크는 HTML 태그나 [HTTP Link
헤더](https://www.w3.org/wiki/LinkHeader) 중 하나를 이용하여 지정할 수 있습니다. 어느 쪽이든, 미리 로드 링크는
브라우저가 메모리 캐시에 리소스 로딩을 시작하도록 지시합니다. 즉, 이 페이지는 높은 신뢰도로 리소스를 사용할 것이 예상되며,
미리 로드 스캐너나 파서가 발견할 때까지 기다리고 싶지 않다는 것을
의미합니다.

이미지의 Link preload 헤더는 다음과 유사합니다.

```
Link: <https://example.com/logo-hires.jpg>; rel=preload; as=image
```

Financial Times는 Link preload 헤더를 사이트에 도입하고
마스트헤드 이미지를 표시하는 데 걸리는 시간을 [1초 감소](https://twitter.com/wheresrhys/status/843252599902167040)
시켰습니다.


<img src="images/preload-financial-times.jpg" alt="미리 로드를 사용하는 Financial Times.
        표시된 내용은 향상을 나타내는 트레이스
        전과 후의 WebPageTest입니다."
         />
하단: `<link rel=preload>`사용, 상단: 사용하지 않음. 3G에서
Moto G4를
이용한 [전](https://www.webpagetest.org/result/170319_Z2_GFR/)과
[후](https://www.webpagetest.org/result/170319_R8_G4Q/)의 WebPageTest비교.


이와 마찬가지로 Wikipedia에서도 Link preload
헤더를 사용하여 로고 로딩 성능을 개선하였습니다. 이 내용은 해당 웹사이트의 [우수
사례](https://phabricator.wikimedia.org/phame/post/view/19/improving_time-to-logo_performance_with_preload_links/)에서 다루었습니다.

**최적화를 사용할 때 주의해야 할 점은 무엇인가요?**

이미지 자산을 미리 로드할 필요가 있는지 확신이 있어야 합니다. 이것이 사용자 환경에
필수적이지 않다면, 빠른 로딩에 노력을 기울일만한
페이지의 다른 콘텐츠가 있을 수 있습니다. 이미지 요청의
우선순위를 지정함으로써 다른 리소스를 큐의 한참 아래로 밀어내게 될 수 있습니다.

폭넓은 브라우저 지원(예: WebP)없이 이미지 형식 미리 로드에 `rel=preload`를 사용하는 것을
피해야 합니다. 또한, 기기 조건에 따라
가져온 소스가 다양할 수 있으므로 `srcset`에 정의된 반응형 이미지에 대해
미리 로드를 피하는 것이 좋습니다.

미리 로딩에 자세히 알아보려면 [Preload, Prefetch and Priorities in
Chrome](https://medium.com/reloading/preload-prefetch-and-priorities-in-chrome-776165961bbf)
및 [Preload: What Is It Good
For?](https://www.smashingmagazine.com/2016/02/preload-what-is-it-good-for/)을 확인해 보세요.

## 이미지를 위한 웹 성능 예산 {: #performance-budgets }

성능 예산은 웹페이지를 위한 '예산'이며, 팀에서는 이를 초과하지 않으려
노력합니다. 예를 들어, '모든 페이지에서 이미지가 200KB를 초과하지 않는다' 혹은 '사용자
환경이 반드시 3초 이내에 사용할 수 있어야 한다'가 여기에 해당합니다. 예산에
맞지 않으면, 그 이유와 다시 목표로 돌아갈 수 있는 방법을 탐색해 보세요.

예산은 투자자와 성능을 논의할 때 유용한 프레임워크를 제공합니다.
디자인이나 비즈니스 결정이 사이트 성능에 영향을 미칠 수 있다면, 예산을
참고하세요. 사이트의 사용자 환경을 저해할 수 있는
변경 사항을 되돌리거나 재고하는 데 참고가 됩니다.

저는 팀이 성능 예산 모니터링을 자동화할 때
가장 큰 성공을 거둔다는 것을 발견했습니다. 예산
회귀에 대한 네트워크 워터폴의 수동 점검보다, 자동화를 사용하여 예산을 초과했을 때 플래그를 제공할 수 있습니다. 서비스 예산 추적에 유용한
두 가지 서비스로는
[Calibre](https://calibreapp.com/docs/metrics/budgets)와
[SpeedCurve](https://speedcurve.com/blog/tag/performance-budgets/)가 있습니다.

일단 이미지 크기에 대한 성능 예산이 정의되면, SpeedCurve가
모니터링을 시작하고 예산이 초과되면 알림을 보냅니다.


<img src="images/F2BCD61B-85C5-4E82-88CF-9E39CB75C9C0.jpg" alt="SpeedCurve 이미지
        크기 모니터링."
         />


Calibre도 목표로 하는 각
기기 클래스에 대한 예산 설정을 지원하는 유사한 기능을 제공합니다. 이것은 WiFi로 연결된 데스크탑의
이미지 크기에 대한 예산이 모바일의 예산과 크게 다를 수 있으므로 유용합니다.


<img src="images/budgets.jpg" alt="Calibre는 이미지 크기에 대한 예산을 지원합니다."
         />

## 마지막 권장 사항 {: #closing-recommendations }

궁극적으로, 이미지 최적화 전략을 선택하는 것은 사용자에게
제공하는 이미지로 귀결되며,
여러분이 결정하는 것은 합리적인 평가 기준입니다. SSIM이나 Butteraugli를 이용할 수도 있고,
혹은 사람의 인지를 벗어난 충분히 작은 이미지 집합이라면
가장 적합한 것을 사용할 수도 있습니다.

**마지막 권장 사항은 다음과 같습니다.**

브라우저
지원에 따른 조건부 제공 형식에 투자할 수 **없다면:**


* Guetzli + MozJPEG의 jpegtran이 90 이상 품질의 JPEG에 좋은 형식입니다.
    * 웹의 경우 `q=90`는 너무 높습니다. `q=80`으로도 충분하며,
      2배 화면에는 `q=50`도 괜찮습니다. Guetzli는 그 정도로 낮은 설정이 안 되므로
      웹의 경우에는 MozJPEG를 사용할 수 있습니다.
    * Kornel Lesi&#x144;ski는 최근에
      mozjpeg의 Chrome이 Wide-gamut에서 자연 색상을 표시하는 것을 돕는 작은 sRGB 프로필을 더함으로써
      cjpeg 명령을 향상했습니다.
* PNG pngquant + advpng은 상당히 양호한 속도/압축 비율을 갖추고 있습니다
* 조건부 제공이 **가능하다면**(`<picture>`, [Accept
  헤더](https://www.igvita.com/2013/05/01/deploying-webp-via-accept-content-negotiation/)
  또는 [Picturefill](https://scottjehl.github.io/picturefill/) 사용):
    * WebP를 지원하는 브라우저에 WebP를 제공하세요
        * 원본 100% 품질 이미지에서 WebP 이미지를 생성하세요. 그렇지 않으면
          WebP를 지원하는 브라우저에 JPEG
          왜곡 *및* WebP 왜곡이 있는 매우 나쁜 품질의 이미지를 제공하게 됩니다! WebP를 이용하여 압축되지 않은
          소스 이미지를 압축하면 WebP 왜곡이 덜 눈에 띄고
          압축도 더 잘 됩니다.
        * WebP 팀이 사용하는 `-m 4 -q 75` 기본 설정은 속도/비율을 최적화하는 대부분의
          경우에 적합합니다.
        * WebP에는 무손실용 특수 모드(`-m 6 -q 100`)도 있어서
 가능한 모든 매개변수 조합을 탐색함으로써 파일을 가장 작은 크기로
 줄일 수 있습니다. 상당히 느리긴 하지만
          정적 자산에는 사용할 가치가 있습니다.
    *   폴백으로 다른
        브라우저에 Guetzli/MozJPEG 압축 소스를 제공하세요.

즐거운 압축이 되길 바랍니다!

